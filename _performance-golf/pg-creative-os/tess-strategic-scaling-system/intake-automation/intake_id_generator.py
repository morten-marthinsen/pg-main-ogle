#!/usr/bin/env python3
"""Intake Auto-ID Generator — assigns next available Ad IDs to ClickUp backlog tasks.

Polls the ClickUp Ad Backlog Intake list for new tasks without valid Ad IDs,
reads Creative Performance (CP) spreadsheets to find the highest existing ID,
generates the next sequential one, and writes it back to the ClickUp task.

Usage:
    python3 intake_id_generator.py --config config.yaml [--dry-run] [--test-sheets] [--limit N]
"""

import argparse
import fcntl
import json
import logging
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import requests
import yaml
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    format="%(asctime)s %(levelname)-7s %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    level=logging.INFO,
)
log = logging.getLogger("intake-id")

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
CLICKUP_BASE = "https://api.clickup.com/api/v2"
SHEETS_SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

# Regex for a valid Full Ad ID (positions 1-3 of the naming convention)
# Matches: sf2-0008-v0001, sf2-i004-v0001, ossf-h012-v0003
VALID_AD_ID_RE = re.compile(r"^[a-z0-9]+-(?:[ih]?\d{3,4})-v\d{4}$")

# Regex to extract the numeric part from root angle IDs
VIDEO_RA_RE = re.compile(r"^([a-z0-9]+)-(\d{4})$")          # sf2-0007
STATIC_RA_RE = re.compile(r"^([a-z0-9]+)-i(\d{3})$")        # sf2-i003
HTML5_RA_RE = re.compile(r"^([a-z0-9]+)-h(\d{3})$")         # sf2-h200

# Regex to extract variation number from full variation IDs
VARIATION_RE = re.compile(r"^[a-z0-9]+-[a-z]?\d{3,4}-v(\d{4})$")

# Map form "Ad Format" values to sheet tab keys and regex patterns
FORMAT_MAP = {
    "video": {"tab_key": "video", "ra_re": VIDEO_RA_RE, "prefix": "", "width": 4},
    "static": {"tab_key": "static", "ra_re": STATIC_RA_RE, "prefix": "i", "width": 3},
    "static image": {"tab_key": "static", "ra_re": STATIC_RA_RE, "prefix": "i", "width": 3},
    "html5": {"tab_key": "html5", "ra_re": HTML5_RA_RE, "prefix": "h", "width": 3},
}

# Ad category values that mean "net new" (not an expansion)
NET_NEW_CATEGORIES = {"nn", "nn (net new)", "net new"}


# ---------------------------------------------------------------------------
# Google Sheets client
# ---------------------------------------------------------------------------
class SheetsClient:
    """Read-only Google Sheets client, reusing Orion's auth tokens."""

    def __init__(self, env: dict):
        # Auth paths in .env are relative to the daily-briefing directory.
        # This script lives at tess-strategic-scaling-system/intake-automation/,
        # and daily-briefing is at orion-chief-of-staff/_ops/daily-briefing/
        # (sibling of tess-strategic-scaling-system under pg-creative-os/).
        briefing_dir = (
            Path(__file__).resolve().parent.parent.parent
            / "orion-chief-of-staff" / "_ops" / "daily-briefing"
        )
        creds_path = briefing_dir / env.get("SHEETS_CREDENTIALS_PATH", "")
        token_path = briefing_dir / env.get("SHEETS_TOKEN_PATH", "")

        if not token_path.exists():
            raise RuntimeError(
                f"Sheets token not found at {token_path}. "
                "Run: python3 auth/sheets_auth.py from daily-briefing/"
            )

        creds = Credentials.from_authorized_user_file(str(token_path), SHEETS_SCOPES)
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            with open(token_path, "w") as f:
                f.write(creds.to_json())

        self._service = build("sheets", "v4", credentials=creds)

    def read_column(self, spreadsheet_id: str, tab_name: str, column: str = "B") -> list[str]:
        """Read all values from a single column in a sheet tab."""
        range_str = f"'{tab_name}'!{column}:{column}"
        try:
            result = (
                self._service.spreadsheets()
                .values()
                .get(spreadsheetId=spreadsheet_id, range=range_str)
                .execute()
            )
            # Flatten: each row is [value] or []
            return [row[0] for row in result.get("values", []) if row]
        except Exception as e:
            if "Unable to parse range" in str(e) or "not found" in str(e).lower():
                log.warning("Tab '%s' not found in spreadsheet %s", tab_name, spreadsheet_id)
                return []
            raise

    def read_two_columns(self, spreadsheet_id: str, tab_name: str) -> list[tuple[str, str]]:
        """Read columns A and B from a sheet tab. Returns list of (col_a, col_b) tuples."""
        range_str = f"'{tab_name}'!A:B"
        try:
            result = (
                self._service.spreadsheets()
                .values()
                .get(spreadsheetId=spreadsheet_id, range=range_str)
                .execute()
            )
            rows = result.get("values", [])
            return [(row[0] if len(row) > 0 else "", row[1] if len(row) > 1 else "") for row in rows]
        except Exception as e:
            if "Unable to parse range" in str(e) or "not found" in str(e).lower():
                log.warning("Tab '%s' not found in spreadsheet %s", tab_name, spreadsheet_id)
                return []
            raise

    def append_rows(self, spreadsheet_id: str, tab_name: str, rows: list[list[str]]) -> int:
        """Append rows to the bottom of a sheet tab. Returns number of rows written."""
        range_str = f"'{tab_name}'!A:D"
        try:
            result = (
                self._service.spreadsheets()
                .values()
                .append(
                    spreadsheetId=spreadsheet_id,
                    range=range_str,
                    valueInputOption="RAW",
                    insertDataOption="INSERT_ROWS",
                    body={"values": rows},
                )
                .execute()
            )
            updates = result.get("updates", {})
            num_rows = updates.get("updatedRows", 0)
            log.info("Appended %d rows to '%s' in %s", num_rows, tab_name, spreadsheet_id)
            return num_rows
        except Exception as e:
            log.error("Failed to append rows to '%s' in %s: %s", tab_name, spreadsheet_id, e)
            return 0


# ---------------------------------------------------------------------------
# ClickUp client
# ---------------------------------------------------------------------------
class ClickUpClient:
    """Minimal ClickUp API v2 client for intake list operations."""

    def __init__(self, token: str):
        self._headers = {
            "Authorization": token,
            "Content-Type": "application/json",
        }
        self._field_cache: dict | None = None

    def fetch_tasks(self, list_id: str, include_closed: bool = False) -> list[dict]:
        """Fetch all tasks from a list (paginated)."""
        tasks = []
        page = 0
        while True:
            resp = requests.get(
                f"{CLICKUP_BASE}/list/{list_id}/task",
                headers=self._headers,
                params={
                    "include_closed": str(include_closed).lower(),
                    "page": page,
                    "subtasks": "false",
                },
                timeout=30,
            )
            resp.raise_for_status()
            data = resp.json()
            batch = data.get("tasks", [])
            tasks.extend(batch)
            if not batch or data.get("last_page", True):
                break
            page += 1
        return tasks

    def get_custom_field_value(self, task: dict, field_name: str) -> str | None:
        """Extract a custom field's display value from a task.

        Handles text, URL, dropdown, and labels fields.
        For dropdowns, resolves the selected option index to the option label.
        For labels (multi-select), resolves UUIDs to option labels and returns
        the first selected label.
        """
        for cf in task.get("custom_fields", []):
            if cf.get("name") != field_name:
                continue

            cf_type = cf.get("type", "")
            value = cf.get("value")

            if value is None or value == "":
                return None

            # Text / URL / short_text — value is the string itself
            if cf_type in ("text", "url", "short_text"):
                return str(value).strip()

            # Dropdown — value is an integer index into type_config.options
            if cf_type == "drop_down":
                options = cf.get("type_config", {}).get("options", [])
                if isinstance(value, int) and 0 <= value < len(options):
                    return options[value].get("name", "").strip()
                # Sometimes value is already the option ID or orderindex
                for opt in options:
                    if str(opt.get("orderindex")) == str(value) or opt.get("id") == str(value):
                        return opt.get("name", "").strip()
                return str(value)

            # Labels (multi-select) — value is a list of option UUIDs
            if cf_type == "labels":
                options = cf.get("type_config", {}).get("options", [])
                if isinstance(value, list) and value:
                    # Resolve each UUID to its label, return the first one
                    opt_map = {o.get("id"): o.get("label", o.get("name", "")) for o in options}
                    for uuid in value:
                        label = opt_map.get(uuid)
                        if label:
                            return label.strip()
                    return str(value[0])
                return str(value)

            # People — return first user's username
            if cf_type == "users":
                if isinstance(value, list) and value:
                    return value[0].get("username", str(value[0].get("id", "")))
                return str(value)

            return str(value).strip()

        return None

    def update_task_name(self, task_id: str, name: str) -> bool:
        """Update a task's name via PUT /task/{id}."""
        resp = requests.put(
            f"{CLICKUP_BASE}/task/{task_id}",
            headers=self._headers,
            json={"name": name},
            timeout=15,
        )
        if resp.ok:
            log.info("Updated task %s name → '%s'", task_id, name)
            return True
        log.error("Failed to update task %s name: %s %s", task_id, resp.status_code, resp.text[:200])
        return False

    def set_custom_field(self, task_id: str, field_id: str, value: str) -> bool:
        """Set a custom field value on a task."""
        resp = requests.post(
            f"{CLICKUP_BASE}/task/{task_id}/field/{field_id}",
            headers=self._headers,
            json={"value": value},
            timeout=15,
        )
        if resp.ok:
            log.info("Set field %s on task %s → '%s'", field_id, task_id, value)
            return True
        log.error("Failed to set field on task %s: %s %s", task_id, resp.status_code, resp.text[:200])
        return False

    def add_comment(self, task_id: str, text: str) -> bool:
        """Add a comment to a task."""
        resp = requests.post(
            f"{CLICKUP_BASE}/task/{task_id}/comment",
            headers=self._headers,
            json={"comment_text": text},
            timeout=15,
        )
        return resp.ok

    def get_field_id(self, task: dict, field_name: str) -> str | None:
        """Get the field ID for a named custom field from a task's custom_fields array."""
        for cf in task.get("custom_fields", []):
            if cf.get("name") == field_name:
                return cf.get("id")
        return None


# ---------------------------------------------------------------------------
# ID Generation Logic
# ---------------------------------------------------------------------------
def find_max_root_angle(
    sheets: SheetsClient,
    spreadsheet_id: str,
    tab_name: str,
    funnel: str,
    ra_regex: re.Pattern,
) -> int:
    """Scan Column B of a CP sheet tab and return the highest root angle number.

    Returns 0 if no matching IDs found (so next will be 1).
    """
    values = sheets.read_column(spreadsheet_id, tab_name, column="B")
    max_num = 0
    for val in values:
        val = val.strip().lower()
        m = ra_regex.match(val)
        if m and m.group(1) == funnel:
            max_num = max(max_num, int(m.group(2)))
    return max_num


def find_max_variation(
    sheets: SheetsClient,
    spreadsheet_id: str,
    tab_name: str,
    root_angle_id: str,
) -> int:
    """Scan Column A of a CP sheet tab and return the highest variation number
    for a given root angle ID.

    Returns 0 if no matching variations found (so next will be 1).
    """
    rows = sheets.read_two_columns(spreadsheet_id, tab_name)
    max_var = 0
    ra_lower = root_angle_id.lower()
    for col_a, col_b in rows:
        # Match rows where Column B is the target root angle
        if col_b.strip().lower() != ra_lower:
            continue
        m = VARIATION_RE.match(col_a.strip().lower())
        if m:
            max_var = max(max_var, int(m.group(1)))
    return max_var


def determine_tab_for_root_angle(root_angle_id: str) -> str | None:
    """Given a root angle ID like sf2-0002 or sf2-i003, determine which tab to search."""
    parts = root_angle_id.split("-")
    if len(parts) < 2:
        return None
    ra_part = parts[-1]
    if ra_part.startswith("i"):
        return "static"
    if ra_part.startswith("h"):
        return "html5"
    if ra_part.isdigit():
        return "video"
    return None


# ---------------------------------------------------------------------------
# Main Generator
# ---------------------------------------------------------------------------
class IntakeIDGenerator:
    def __init__(self, config_path: str, dry_run: bool = False, limit: int = 0):
        with open(config_path) as f:
            self.cfg = yaml.safe_load(f)

        self.dry_run = dry_run
        self.limit = limit

        # Load env vars
        self.env = {k: v for k, v in os.environ.items()}

        # Init clients
        self.sheets = SheetsClient(self.env)
        self.clickup = ClickUpClient(self.env["CLICKUP_API_TOKEN"])

        # In-memory tracking of IDs assigned this run (prevents collisions
        # when multiple tasks for the same funnel are processed in one cycle)
        self._assigned_root_angles: dict[str, int] = {}   # key: "{funnel}:{type}" → max number
        self._assigned_variations: dict[str, int] = {}     # key: "{root_angle_id}" → max var number

        # Field name config
        self.fields = self.cfg["clickup"]["fields"]

    def run(self) -> dict:
        """Main entry point. Returns summary dict."""
        summary = {"processed": 0, "skipped": 0, "errors": 0, "no_cp_sheet": 0, "details": []}

        list_id = self.cfg["clickup"]["intake_list_id"]
        log.info("Fetching tasks from list %s ...", list_id)
        tasks = self.clickup.fetch_tasks(list_id)
        log.info("Found %d tasks in intake list", len(tasks))

        pending = [t for t in tasks if not self._is_processed(t)]
        log.info("%d tasks need ID assignment", len(pending))

        if self.limit > 0:
            pending = pending[: self.limit]
            log.info("Limiting to %d tasks", self.limit)

        for task in pending:
            try:
                result = self._process_task(task)
                summary["details"].append(result)
                if result.get("status") == "assigned":
                    summary["processed"] += 1
                elif result.get("status") == "no_cp_sheet":
                    summary["no_cp_sheet"] += 1
                elif result.get("status") == "skipped":
                    summary["skipped"] += 1
                else:
                    summary["errors"] += 1
            except Exception as e:
                log.error("Error processing task %s (%s): %s", task.get("id"), task.get("name"), e)
                summary["errors"] += 1
                summary["details"].append({
                    "task_id": task.get("id"),
                    "task_name": task.get("name"),
                    "status": "error",
                    "error": str(e),
                })

        log.info(
            "Run complete: %d assigned, %d skipped, %d no-CP-sheet, %d errors",
            summary["processed"],
            summary["skipped"],
            summary["no_cp_sheet"],
            summary["errors"],
        )
        return summary

    def _is_processed(self, task: dict) -> bool:
        """Check if a task already has a valid Ad ID (in Full Ad ID field or task name).

        A task is "processed" if:
        1. The "Full Ad ID" custom field has a valid ID, OR
        2. The task name starts with a pattern like "ossf-0466" or "sf2-i003"
           (indicating someone already assigned an ID manually)
        """
        # Check Full Ad ID field (may not exist on this list yet)
        full_id = self.clickup.get_custom_field_value(task, self.fields["full_ad_id"])
        if full_id and VALID_AD_ID_RE.match(full_id.strip().lower()):
            return True

        # Check task name — if it starts with a funnel-rootangle pattern, it's already assigned
        name = task.get("name", "").strip().lower()
        # Match patterns like: ossf-0466-v0329, sf2-0007-v0001, sf2-i003-v0001, etc.
        # Also match range patterns like: ossf-0466-v0329-v0333
        # Allow periods in funnel code (e.g., wdg.1-0010) and space/dash before variation
        if re.match(r"^[a-z0-9.]+[-][a-z]?\d{3,4}[\s-]v\d{4}", name):
            return True

        return False

    def _process_task(self, task: dict) -> dict:
        """Process a single task: determine ID, generate it, update ClickUp."""
        task_id = task["id"]
        task_name = task.get("name", "(unnamed)")
        log.info("Processing task %s: %s", task_id, task_name)

        # Extract form fields
        funnel_raw = self.clickup.get_custom_field_value(task, self.fields["product_funnels"])
        ad_category_raw = self.clickup.get_custom_field_value(task, self.fields["ad_category"])
        ad_format_raw = self.clickup.get_custom_field_value(task, self.fields["ad_format"])
        expansion_parent = self.clickup.get_custom_field_value(task, self.fields["expansion_ad_id"])

        if not funnel_raw:
            log.warning("Task %s has no Product Funnel(s) value — skipping", task_id)
            return {"task_id": task_id, "task_name": task_name, "status": "skipped", "reason": "no funnel"}

        # Parse funnel code from label format: "OSSF (One Shot Slice Fix)" → "ossf"
        funnel_match = re.match(r"^([A-Za-z0-9]+)", funnel_raw.strip())
        if not funnel_match:
            log.warning("Cannot parse funnel code from '%s' — task %s", funnel_raw, task_id)
            return {"task_id": task_id, "task_name": task_name, "status": "skipped", "reason": f"unparseable funnel: {funnel_raw}"}
        funnel = funnel_match.group(1).lower()
        ad_category = (ad_category_raw or "").strip().lower()
        ad_format = (ad_format_raw or "video").strip().lower()

        # Look up funnel config
        funnel_cfg = self.cfg["funnels"].get(funnel)
        if not funnel_cfg:
            log.warning("Unknown funnel code '%s' for task %s — skipping", funnel, task_id)
            return {"task_id": task_id, "task_name": task_name, "status": "skipped", "reason": f"unknown funnel: {funnel}"}

        spreadsheet_id = funnel_cfg.get("spreadsheet_id")
        if not spreadsheet_id:
            msg = f"[INTAKE-AUTO-ID] No Creative Performance sheet found for \"{funnel}\" ({funnel_cfg['name']}). Manual Ad ID assignment required."
            log.warning("No CP sheet for funnel '%s' — task %s", funnel, task_id)
            if not self.dry_run:
                self.clickup.add_comment(task_id, msg)
            return {"task_id": task_id, "task_name": task_name, "status": "no_cp_sheet", "funnel": funnel}

        # Determine if this is net new or expansion
        is_net_new = ad_category in NET_NEW_CATEGORIES or not ad_category

        if is_net_new:
            ad_id = self._generate_net_new_id(funnel, ad_format, spreadsheet_id)
        else:
            ad_id = self._generate_expansion_id(funnel, ad_format, spreadsheet_id, expansion_parent)

        if not ad_id:
            return {"task_id": task_id, "task_name": task_name, "status": "error", "reason": "could not generate ID"}

        if self.dry_run:
            log.info("[DRY RUN] Task '%s' → would assign %s", task_name, ad_id)
            return {"task_id": task_id, "task_name": task_name, "status": "assigned", "ad_id": ad_id, "dry_run": True}

        # Determine number of variations from Total # of Assets field
        total_assets_raw = self.clickup.get_custom_field_value(task, "Total # of Assets")
        num_variations = int(total_assets_raw) if total_assets_raw and total_assets_raw.strip().isdigit() else 1

        # Extract root angle ID and starting variation from ad_id
        # e.g., "dqfe1-0014-v0001" → root="dqfe1-0014", start_var=1
        root_angle_id = "-".join(ad_id.split("-")[:-1])
        var_match = VARIATION_RE.match(ad_id.strip().lower())
        start_var = int(var_match.group(1)) if var_match else 1

        # Build task name with variation range
        if num_variations > 1:
            end_var = start_var + num_variations - 1
            task_display_name = f"{root_angle_id}-v{start_var:04d}-v{end_var:04d}"
        else:
            task_display_name = ad_id

        # Write to ClickUp: update task name + set Full Ad ID field
        name_ok = self.clickup.update_task_name(task_id, task_display_name)

        field_id = self.clickup.get_field_id(task, self.fields["full_ad_id"])
        field_ok = False
        if field_id:
            field_ok = self.clickup.set_custom_field(task_id, field_id, task_display_name)
        else:
            log.warning("Could not find 'Full Ad ID' field ID on task %s", task_id)

        # Write to CP spreadsheet — reserve the IDs so no one else uses them
        if spreadsheet_id and name_ok:
            root_angle_name = self.clickup.get_custom_field_value(task, self.fields.get("root_angle_name", "Ad Root Angle Name")) or ""
            ad_cat_display = (ad_category_raw or "NN").strip()
            tab_key = FORMAT_MAP.get(ad_format, {}).get("tab_key", "video")
            tab_name = self.cfg["sheet_tabs"].get(tab_key, "Video Ads")

            rows = []
            for v in range(start_var, start_var + num_variations):
                rows.append([
                    f"{root_angle_id}-v{v:04d}",   # Column A: Full Variation ID
                    root_angle_id,                    # Column B: Root Angle ID
                    root_angle_name,                  # Column C: Root Angle Name
                    ad_cat_display,                   # Column D: Ad Category
                ])

            written = self.sheets.append_rows(spreadsheet_id, tab_name, rows)
            if written > 0:
                log.info("Reserved %d variation(s) in CP sheet for %s", written, root_angle_id)
            else:
                log.warning("Failed to write to CP sheet for %s — IDs may not be reserved", root_angle_id)

        status = "assigned" if name_ok else "error"
        return {"task_id": task_id, "task_name": task_name, "status": status, "ad_id": task_display_name}

    def _generate_net_new_id(self, funnel: str, ad_format: str, spreadsheet_id: str) -> str | None:
        """Generate the next net-new Ad ID for a funnel + format."""
        fmt = FORMAT_MAP.get(ad_format)
        if not fmt:
            log.error("Unknown ad format '%s'", ad_format)
            return None

        tab_name = self.cfg["sheet_tabs"][fmt["tab_key"]]
        tracking_key = f"{funnel}:{fmt['tab_key']}"

        # Check in-memory max first (from earlier assignments this run)
        mem_max = self._assigned_root_angles.get(tracking_key, 0)

        # Read CP sheet for current max
        sheet_max = find_max_root_angle(
            self.sheets, spreadsheet_id, tab_name, funnel, fmt["ra_re"]
        )

        next_num = max(mem_max, sheet_max) + 1
        self._assigned_root_angles[tracking_key] = next_num

        # Build the root angle ID
        prefix = fmt["prefix"]
        width = fmt["width"]
        root_angle_id = f"{funnel}-{prefix}{next_num:0{width}d}"
        ad_id = f"{root_angle_id}-v0001"

        log.info(
            "Net new: funnel=%s format=%s sheet_max=%d mem_max=%d → %s",
            funnel, ad_format, sheet_max, mem_max, ad_id,
        )
        return ad_id

    def _generate_expansion_id(
        self, funnel: str, ad_format: str, spreadsheet_id: str, parent_id: str | None
    ) -> str | None:
        """Generate the next expansion (variation) Ad ID."""
        if not parent_id:
            log.error("Expansion task has no 'Ad ID for Expansion' value")
            return None

        # Parse the parent ID to extract root angle
        parent_id = parent_id.strip().lower()

        # Accept both full IDs (sf2-0002-v0003) and root angle only (sf2-0002)
        parts = parent_id.split("-")
        if len(parts) >= 3 and parts[-1].startswith("v"):
            # Full ID — extract root angle (everything except last part)
            root_angle_id = "-".join(parts[:-1])
        elif len(parts) == 2:
            root_angle_id = parent_id
        else:
            log.error("Cannot parse expansion parent ID: '%s'", parent_id)
            return None

        # Determine which tab to search
        tab_type = determine_tab_for_root_angle(root_angle_id)
        if not tab_type:
            log.error("Cannot determine asset type from root angle ID: '%s'", root_angle_id)
            return None

        tab_name = self.cfg["sheet_tabs"][tab_type]

        # Check in-memory max first
        mem_max = self._assigned_variations.get(root_angle_id, 0)

        # Read CP sheet for current max variation
        sheet_max = find_max_variation(self.sheets, spreadsheet_id, tab_name, root_angle_id)

        next_var = max(mem_max, sheet_max) + 1
        self._assigned_variations[root_angle_id] = next_var

        ad_id = f"{root_angle_id}-v{next_var:04d}"

        log.info(
            "Expansion: root=%s sheet_max=%d mem_max=%d → %s",
            root_angle_id, sheet_max, mem_max, ad_id,
        )
        return ad_id

    # -------------------------------------------------------------------
    # Test mode: scan CP sheets and report max IDs
    # -------------------------------------------------------------------
    def test_sheets(self):
        """Read all configured CP sheets and print max IDs per funnel per type."""
        print("\n=== CP Sheet Max ID Report ===\n")
        for funnel_code, funnel_cfg in sorted(self.cfg["funnels"].items()):
            sid = funnel_cfg.get("spreadsheet_id")
            if not sid:
                print(f"  {funnel_code:8s}  (no CP sheet)")
                continue

            print(f"  {funnel_code:8s}  {funnel_cfg['name']}")
            for type_key, fmt in FORMAT_MAP.items():
                # Skip duplicate keys (e.g., "static" and "static image")
                if type_key != fmt["tab_key"] and type_key != "html5" and type_key != "video":
                    continue
                tab_name = self.cfg["sheet_tabs"].get(fmt["tab_key"])
                if not tab_name:
                    continue
                try:
                    max_num = find_max_root_angle(
                        self.sheets, sid, tab_name, funnel_code, fmt["ra_re"]
                    )
                    prefix = fmt["prefix"]
                    width = fmt["width"]
                    if max_num > 0:
                        current = f"{funnel_code}-{prefix}{max_num:0{width}d}"
                        next_id = f"{funnel_code}-{prefix}{max_num + 1:0{width}d}"
                        print(f"           {fmt['tab_key']:8s}  max = {current}  →  next = {next_id}")
                    else:
                        next_id = f"{funnel_code}-{prefix}{1:0{width}d}"
                        print(f"           {fmt['tab_key']:8s}  (empty)  →  next = {next_id}")
                except Exception as e:
                    print(f"           {fmt['tab_key']:8s}  ERROR: {e}")
            print()


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(description="Intake Auto-ID Generator")
    parser.add_argument("--config", required=True, help="Path to config.yaml")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be generated without writing")
    parser.add_argument("--test-sheets", action="store_true", help="Scan CP sheets and report max IDs")
    parser.add_argument("--limit", type=int, default=0, help="Max number of tasks to process (0 = all)")
    args = parser.parse_args()

    gen = IntakeIDGenerator(args.config, dry_run=args.dry_run, limit=args.limit)

    if args.test_sheets:
        gen.test_sheets()
        return

    # File lock to prevent overlapping runs
    lock_path = gen.cfg.get("lock_file", "/tmp/intake-id-generator.lock")
    lock_fp = open(lock_path, "w")
    try:
        fcntl.flock(lock_fp, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        log.info("Another instance is running (lock held). Exiting.")
        sys.exit(0)

    try:
        summary = gen.run()
        # Print summary as JSON for log parsing
        print(json.dumps(summary, indent=2))
    finally:
        fcntl.flock(lock_fp, fcntl.LOCK_UN)
        lock_fp.close()


if __name__ == "__main__":
    main()
