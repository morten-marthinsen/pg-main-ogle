"""Data sources for the Orion Team Bot.

Provides read-only access to team-appropriate data:
- SSS Google Sheets (performance metrics, ROAS, top ads, spend)
- Google Docs (read/write/create documents for creative collaboration)
- ClickUp (pipeline status, active creative tasks)
- Agent status (Creative OS operational summary)

All functions return plain-text summaries suitable for inclusion
in Claude's system prompt or tool responses.
"""

from __future__ import annotations

import base64
import json
import logging
import os
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

import requests

logger = logging.getLogger(__name__)

# ── Cache ──────────────────────────────────────────────────────────────────

_cache: dict[str, tuple[float, str]] = {}
CACHE_TTL = 300  # 5 minutes


def _get_cached(key: str) -> Optional[str]:
    if key in _cache:
        ts, val = _cache[key]
        if time.time() - ts < CACHE_TTL:
            return val
    return None


def _set_cached(key: str, val: str):
    _cache[key] = (time.time(), val)


# ── Google API Credentials ─────────────────────────────────────────────────

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/drive.file",
]


def _get_credentials():
    """Build Google service account credentials with all required scopes.

    For server deployment, GOOGLE_SERVICE_ACCOUNT_JSON should contain
    the base64-encoded service account JSON key file.
    """
    from google.oauth2.service_account import Credentials

    sa_json = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON", "")
    if not sa_json:
        raise RuntimeError("GOOGLE_SERVICE_ACCOUNT_JSON not set")

    # Decode base64 to JSON dict
    try:
        sa_info = json.loads(base64.b64decode(sa_json))
    except Exception:
        # Maybe it's raw JSON, not base64
        sa_info = json.loads(sa_json)

    return Credentials.from_service_account_info(sa_info, scopes=SCOPES)


# ── SSS Google Sheets ──────────────────────────────────────────────────────


def _get_sheets_service():
    from googleapiclient.discovery import build
    return build("sheets", "v4", credentials=_get_credentials())


def _get_docs_service():
    from googleapiclient.discovery import build
    return build("docs", "v1", credentials=_get_credentials())


def _get_drive_service():
    from googleapiclient.discovery import build
    return build("drive", "v3", credentials=_get_credentials())


def _get_sheet_id():
    return os.environ.get(
        "SSS_SPREADSHEET_ID",
        "1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U",
    )


def _fetch_range(service, range_str: str) -> list:
    """Fetch a range from the SSS spreadsheet. Returns list of row lists."""
    result = service.spreadsheets().values().get(
        spreadsheetId=_get_sheet_id(),
        range=range_str,
    ).execute()
    return result.get("values", [])


def fetch_sss_performance_summary() -> str:
    """Fetch top-level performance metrics from SSS Insights tab.

    Includes: Total Assets, Total Spend, Overall ROAS, Win Rate, Winners,
    plus the top root angles by ROAS.
    """
    cached = _get_cached("sss_performance")
    if cached:
        return cached

    try:
        service = _get_sheets_service()

        # Insights tab: row 1 = title, row 2 = headers, row 3 = values,
        # row 5 = "BY ROOT ANGLE", row 6 = headers, row 7+ = data
        rows = _fetch_range(service, "Insights!A1:G30")

        if len(rows) < 3:
            return "No data found in SSS Insights."

        # Parse summary (rows 1-3)
        summary_headers = rows[1] if len(rows) > 1 else []
        summary_values = rows[2] if len(rows) > 2 else []

        lines = ["*SSS Performance Summary*\n"]
        for h, v in zip(summary_headers, summary_values):
            lines.append(f"  *{h}:* {v}")

        # Parse root angle breakdown (row 5+ = "BY ROOT ANGLE")
        angle_start = None
        for i, row in enumerate(rows):
            if row and "BY ROOT ANGLE" in row[0]:
                angle_start = i
                break

        if angle_start and len(rows) > angle_start + 2:
            angle_headers = rows[angle_start + 1]
            lines.append("\n*Top Root Angles by ROAS*")
            for row in rows[angle_start + 2 : angle_start + 12]:  # Top 10
                if not row:
                    continue
                padded = row + [""] * (len(angle_headers) - len(row))
                name = padded[0] if padded else "?"
                roas = padded[4] if len(padded) > 4 else "?"
                spend = padded[3] if len(padded) > 3 else "?"
                assets = padded[2] if len(padded) > 2 else "?"
                winners = padded[6] if len(padded) > 6 else "0"
                lines.append(f"  {name} — ROAS: {roas}, Spend: {spend}, Assets: {assets}, Winners: {winners}")

        summary = "\n".join(lines)
        _set_cached("sss_performance", summary)
        return summary

    except Exception as e:
        logger.error(f"SSS fetch failed: {e}")
        return f"Unable to fetch SSS data: {e}"


def fetch_sss_top_ads(limit: int = 10) -> str:
    """Fetch top-performing ads from SSS Ad Level Tracking.

    Filters to winners/active ads, sorted by spend.
    Columns: Funnel, Root Angle Name, Asset ID, Platform, Status, Spend, ROAS, Classification
    """
    cached = _get_cached(f"sss_top_ads_{limit}")
    if cached:
        return cached

    try:
        service = _get_sheets_service()

        # Ad Level Tracking (Current State) — header at row 1, data from row 2
        rows = _fetch_range(service, "'Ad Level Tracking (Current State)'!A1:U500")

        if len(rows) < 2:
            return "No ad performance data found."

        headers = rows[0]
        # Find column indices
        col = {h: i for i, h in enumerate(headers)}
        spend_idx = col.get("Spend", 16)
        roas_idx = col.get("ROAS", 18)
        status_idx = col.get("Status", 15)
        class_idx = col.get("Classification", 19)
        name_idx = col.get("Root Angle Name", 2)
        funnel_idx = col.get("Funnel", 0)
        asset_idx = col.get("Asset ID", 3)

        def _parse_currency(val: str) -> float:
            try:
                return float(val.replace("$", "").replace(",", ""))
            except (ValueError, AttributeError):
                return 0.0

        # Filter active ads and sort by spend descending
        data_rows = []
        for row in rows[1:]:
            padded = row + [""] * (len(headers) - len(row))
            status = padded[status_idx] if len(padded) > status_idx else ""
            if status.lower() not in ("active", "winner"):
                continue
            spend = _parse_currency(padded[spend_idx] if len(padded) > spend_idx else "0")
            data_rows.append((spend, padded))

        data_rows.sort(key=lambda x: x[0], reverse=True)

        lines = [f"*Top {limit} Ads by Spend*\n"]
        for spend, padded in data_rows[:limit]:
            name = padded[name_idx] if len(padded) > name_idx else "?"
            funnel = padded[funnel_idx] if len(padded) > funnel_idx else "?"
            roas = padded[roas_idx] if len(padded) > roas_idx else "?"
            classification = padded[class_idx] if len(padded) > class_idx else "?"
            spend_str = padded[spend_idx] if len(padded) > spend_idx else "?"
            lines.append(
                f"  *{name}* ({funnel}) — Spend: {spend_str}, ROAS: {roas}, Status: {classification}"
            )

        if not data_rows:
            lines.append("  _No active ads found._")

        summary = "\n".join(lines)
        _set_cached(f"sss_top_ads_{limit}", summary)
        return summary

    except Exception as e:
        logger.error(f"SSS top ads fetch failed: {e}")
        return f"Unable to fetch top ads: {e}"


def fetch_sss_by_funnel() -> str:
    """Fetch performance breakdown by funnel from SSS By Content tab."""
    cached = _get_cached("sss_by_funnel")
    if cached:
        return cached

    try:
        service = _get_sheets_service()
        rows = _fetch_range(service, "'By Content'!A1:F30")

        # Find the "BY FUNNEL" section (row with headers follows it)
        lines = ["*Performance by Funnel*\n"]
        header_row = None
        for i, row in enumerate(rows):
            if row and row[0] == "Funnel":
                header_row = i
                break

        if header_row is None:
            return "No funnel data found in By Content tab."

        for row in rows[header_row + 1 :]:
            if not row or not row[0]:
                break
            padded = row + [""] * 6
            lines.append(
                f"  *{padded[0]}* — Assets: {padded[1]}, Spend: {padded[2]}, "
                f"ROAS: {padded[3]}, Win Rate: {padded[4]}, Winners: {padded[5]}"
            )

        summary = "\n".join(lines)
        _set_cached("sss_by_funnel", summary)
        return summary

    except Exception as e:
        logger.error(f"SSS by funnel fetch failed: {e}")
        return f"Unable to fetch funnel data: {e}"


def fetch_sss_strategy() -> str:
    """Fetch Tess-generated creative strategy recommendations from SSS."""
    cached = _get_cached("sss_strategy")
    if cached:
        return cached

    try:
        service = _get_sheets_service()
        rows = _fetch_range(service, "'Creative Strategy'!A1:H30")

        if len(rows) < 3:
            return "No strategy recommendations found."

        lines = ["*Creative Strategy Recommendations*\n"]

        # Parse summary section (rows 4-9: key-value pairs)
        for row in rows[3:9]:
            if row and len(row) >= 2:
                lines.append(f"  {row[0]}: *{row[1]}*")

        # Parse expansion recommendations (find the header row)
        header_row = None
        for i, row in enumerate(rows):
            if row and row[0] == "Priority":
                header_row = i
                break

        if header_row and len(rows) > header_row + 1:
            lines.append("\n*Top Expansion Recommendations*")
            for row in rows[header_row + 1 : header_row + 11]:  # Top 10
                if not row:
                    continue
                padded = row + [""] * 8
                lines.append(
                    f"  [{padded[0]}] {padded[1]} ({padded[2]}) — {padded[4]}, "
                    f"ROAS: {padded[5]}, Spend: {padded[6]}"
                )
                if padded[7]:
                    lines.append(f"    _{padded[7]}_")

        summary = "\n".join(lines)
        _set_cached("sss_strategy", summary)
        return summary

    except Exception as e:
        logger.error(f"SSS strategy fetch failed: {e}")
        return f"Unable to fetch strategy data: {e}"


# ── Winning Angles ────────────────────────────────────────────────────────


def fetch_winning_angles(funnel: str | None = None) -> str:
    """Fetch root angles from SSS with win rates, spend, and ROAS.

    Aggregates from "Ad Level Tracking (Current State)" tab — groups by
    Root Angle Name, computes total spend, avg ROAS, win count, total assets.
    Optional funnel filter.
    """
    cache_key = f"winning_angles_{funnel or 'all'}"
    cached = _get_cached(cache_key)
    if cached:
        return cached

    try:
        service = _get_sheets_service()
        rows = _fetch_range(service, "'Ad Level Tracking (Current State)'!A1:U500")

        if len(rows) < 2:
            return "No ad data found for angle analysis."

        headers = rows[0]
        col = {h: i for i, h in enumerate(headers)}
        angle_idx = col.get("Root Angle Name", 2)
        funnel_idx = col.get("Funnel", 0)
        spend_idx = col.get("Spend", 16)
        roas_idx = col.get("ROAS", 18)
        class_idx = col.get("Classification", 19)

        def _parse_num(val: str) -> float:
            try:
                return float(val.replace("$", "").replace(",", "").replace("%", ""))
            except (ValueError, AttributeError):
                return 0.0

        # Aggregate by root angle
        angles: dict[str, dict] = {}
        for row in rows[1:]:
            padded = row + [""] * (len(headers) - len(row))
            angle_name = padded[angle_idx].strip() if len(padded) > angle_idx else ""
            if not angle_name:
                continue

            row_funnel = padded[funnel_idx].strip() if len(padded) > funnel_idx else ""
            if funnel and row_funnel.lower() != funnel.lower():
                continue

            spend = _parse_num(padded[spend_idx] if len(padded) > spend_idx else "0")
            roas = _parse_num(padded[roas_idx] if len(padded) > roas_idx else "0")
            classification = (
                padded[class_idx].strip().lower() if len(padded) > class_idx else ""
            )

            if angle_name not in angles:
                angles[angle_name] = {
                    "spend": 0.0,
                    "roas_sum": 0.0,
                    "count": 0,
                    "winners": 0,
                    "funnels": set(),
                }
            a = angles[angle_name]
            a["spend"] += spend
            a["roas_sum"] += roas
            a["count"] += 1
            if classification in ("winner", "champion"):
                a["winners"] += 1
            if row_funnel:
                a["funnels"].add(row_funnel)

        if not angles:
            msg = "No angle data found"
            if funnel:
                msg += f" for funnel '{funnel}'"
            return msg + "."

        # Sort by spend descending
        sorted_angles = sorted(
            angles.items(), key=lambda x: x[1]["spend"], reverse=True
        )

        filter_label = f" (funnel: {funnel})" if funnel else ""
        lines = [f"*Winning Angles{filter_label}*\n"]
        for name, data in sorted_angles[:15]:
            avg_roas = data["roas_sum"] / data["count"] if data["count"] else 0
            win_rate = (
                f"{data['winners']}/{data['count']}"
                if data["count"]
                else "0/0"
            )
            funnels_str = ", ".join(sorted(data["funnels"]))
            lines.append(
                f"  *{name}* — Spend: ${data['spend']:,.0f}, "
                f"Avg ROAS: {avg_roas:.2f}, Win Rate: {win_rate}, "
                f"Funnels: {funnels_str}"
            )

        summary = "\n".join(lines)
        _set_cached(cache_key, summary)
        return summary

    except Exception as e:
        logger.error(f"Winning angles fetch failed: {e}")
        return f"Unable to fetch winning angles: {e}"


# ── ClickUp Pipeline ──────────────────────────────────────────────────────


CLICKUP_BASE = "https://api.clickup.com/api/v2"

# Statuses that mean "done"
DONE_STATUSES = {"approved", "closed", "done", "complete", "live"}


def fetch_clickup_pipeline() -> str:
    """Fetch active creative tasks from ClickUp.

    Returns formatted pipeline status.
    """
    cached = _get_cached("clickup_pipeline")
    if cached:
        return cached

    token = os.environ.get("CLICKUP_API_TOKEN", "")
    workspace_id = os.environ.get("CLICKUP_WORKSPACE_ID", "")

    if not token or not workspace_id:
        return "ClickUp not configured (missing CLICKUP_API_TOKEN or CLICKUP_WORKSPACE_ID)."

    try:
        headers = {"Authorization": token, "Content-Type": "application/json"}

        # Get teams (workspaces) to find spaces
        resp = requests.get(
            f"{CLICKUP_BASE}/team/{workspace_id}/space",
            headers=headers,
            params={"archived": "false"},
            timeout=15,
        )
        resp.raise_for_status()
        spaces = resp.json().get("spaces", [])

        all_tasks = []
        for space in spaces[:5]:  # Cap at 5 spaces
            # Get lists in space (via folders)
            folders_resp = requests.get(
                f"{CLICKUP_BASE}/space/{space['id']}/folder",
                headers=headers,
                params={"archived": "false"},
                timeout=15,
            )
            folders_resp.raise_for_status()

            for folder in folders_resp.json().get("folders", [])[:5]:
                for lst in folder.get("lists", [])[:5]:
                    tasks_resp = requests.get(
                        f"{CLICKUP_BASE}/list/{lst['id']}/task",
                        headers=headers,
                        params={
                            "archived": "false",
                            "subtasks": "false",
                            "include_closed": "false",
                        },
                        timeout=15,
                    )
                    if tasks_resp.ok:
                        tasks = tasks_resp.json().get("tasks", [])
                        # Filter out done tasks
                        active = [
                            t for t in tasks
                            if t.get("status", {}).get("status", "").lower().strip()
                            not in DONE_STATUSES
                        ]
                        all_tasks.extend(active)

        if not all_tasks:
            return "No active creative tasks found in ClickUp."

        # Group by status
        by_status: dict[str, list] = {}
        for t in all_tasks:
            status = t.get("status", {}).get("status", "unknown")
            by_status.setdefault(status, []).append(t)

        lines = [f"*ClickUp Pipeline* ({len(all_tasks)} active tasks)\n"]
        for status, tasks in sorted(by_status.items()):
            lines.append(f"\n*{status}* ({len(tasks)})")
            for t in tasks[:8]:  # Cap per status
                name = t.get("name", "Untitled")
                assignees = ", ".join(
                    a.get("username", "?") for a in t.get("assignees", [])
                )
                due = t.get("due_date")
                due_str = ""
                if due:
                    try:
                        due_dt = datetime.fromtimestamp(int(due) / 1000, tz=timezone.utc)
                        due_str = f" (due {due_dt.strftime('%b %d')})"
                    except (ValueError, TypeError):
                        pass
                assignee_str = f" [{assignees}]" if assignees else ""
                lines.append(f"  - {name}{assignee_str}{due_str}")
            if len(tasks) > 8:
                lines.append(f"  _...and {len(tasks) - 8} more_")

        summary = "\n".join(lines)
        _set_cached("clickup_pipeline", summary)
        return summary

    except Exception as e:
        logger.error(f"ClickUp fetch failed: {e}")
        return f"Unable to fetch ClickUp data: {e}"


# ── Google Docs ───────────────────────────────────────────────────────────


import re as _re

_DOC_ID_PATTERN = _re.compile(
    r"(?:docs\.google\.com/document/d/|^)([a-zA-Z0-9_-]{20,})"
)


def _parse_doc_id(doc_id_or_url: str) -> str:
    """Extract a Google Doc ID from a full URL or bare ID."""
    m = _DOC_ID_PATTERN.search(doc_id_or_url.strip())
    if m:
        return m.group(1)
    # Assume it's already a bare ID
    return doc_id_or_url.strip()


def _extract_doc_text(doc: dict) -> str:
    """Extract plain text from a Google Docs API document response."""
    body = doc.get("body", {})
    content = body.get("content", [])
    parts: list[str] = []

    for element in content:
        paragraph = element.get("paragraph")
        if not paragraph:
            continue
        for pe in paragraph.get("elements", []):
            text_run = pe.get("textRun")
            if text_run:
                parts.append(text_run.get("content", ""))

    return "".join(parts).strip()


def read_google_doc(doc_id_or_url: str) -> str:
    """Read a Google Doc and return its plain text content.

    Args:
        doc_id_or_url: Google Doc ID or full URL

    Returns:
        Plain text content of the document, or error message.
    """
    doc_id = _parse_doc_id(doc_id_or_url)
    cache_key = f"gdoc_read_{doc_id}"
    cached = _get_cached(cache_key)
    if cached:
        return cached

    try:
        service = _get_docs_service()
        doc = service.documents().get(documentId=doc_id).execute()
        title = doc.get("title", "Untitled")
        text = _extract_doc_text(doc)

        if not text:
            result = f"*{title}*\n\n_(Document is empty)_"
        else:
            # Cap at ~4000 chars to avoid token bloat
            if len(text) > 4000:
                text = text[:4000] + "\n\n_(truncated — document continues)_"
            result = f"*{title}*\n\n{text}"

        _set_cached(cache_key, result)
        return result

    except Exception as e:
        logger.error(f"Google Docs read failed: {e}")
        return f"Unable to read Google Doc: {e}"


def write_to_google_doc(doc_id_or_url: str, text: str, append: bool = True) -> str:
    """Write text to a Google Doc.

    Args:
        doc_id_or_url: Google Doc ID or full URL
        text: Text to insert
        append: If True, append to end. If False, prepend after title.

    Returns:
        Success/error message.
    """
    doc_id = _parse_doc_id(doc_id_or_url)

    try:
        service = _get_docs_service()

        if append:
            # Get doc to find end index
            doc = service.documents().get(documentId=doc_id).execute()
            body = doc.get("body", {})
            content = body.get("content", [])
            end_index = 1
            if content:
                last = content[-1]
                end_index = last.get("endIndex", 1) - 1
            end_index = max(1, end_index)

            requests_body = [
                {
                    "insertText": {
                        "location": {"index": end_index},
                        "text": "\n" + text,
                    }
                }
            ]
        else:
            # Insert after first paragraph (title)
            requests_body = [
                {
                    "insertText": {
                        "location": {"index": 1},
                        "text": text + "\n\n",
                    }
                }
            ]

        service.documents().batchUpdate(
            documentId=doc_id,
            body={"requests": requests_body},
        ).execute()

        # Invalidate cache
        _cache.pop(f"gdoc_read_{doc_id}", None)

        return f"Successfully {'appended to' if append else 'inserted into'} document."

    except Exception as e:
        logger.error(f"Google Docs write failed: {e}")
        return f"Unable to write to Google Doc: {e}"


def create_google_doc(title: str, content: str = "") -> str:
    """Create a new Google Doc.

    Args:
        title: Document title
        content: Optional initial content

    Returns:
        Success message with document ID and URL, or error message.
    """
    try:
        drive = _get_drive_service()

        # Create empty doc via Drive API
        file_metadata = {
            "name": title,
            "mimeType": "application/vnd.google-apps.document",
        }
        file = drive.files().create(
            body=file_metadata,
            fields="id,webViewLink",
        ).execute()

        doc_id = file["id"]
        link = file.get("webViewLink", f"https://docs.google.com/document/d/{doc_id}")

        # Add content if provided
        if content:
            docs = _get_docs_service()
            docs.documents().batchUpdate(
                documentId=doc_id,
                body={
                    "requests": [
                        {
                            "insertText": {
                                "location": {"index": 1},
                                "text": content,
                            }
                        }
                    ]
                },
            ).execute()

        return f"Created document *{title}*\nID: `{doc_id}`\nLink: {link}"

    except Exception as e:
        logger.error(f"Google Docs create failed: {e}")
        return f"Unable to create Google Doc: {e}"


# ── Agent Status ──────────────────────────────────────────────────────────


def fetch_agent_status() -> str:
    """Get Creative OS agent operational status.

    When running locally, reads Build State from each agent's CLAUDE.md.
    When deployed to server (no local files), returns a static summary.
    """
    cached = _get_cached("agent_status")
    if cached:
        return cached

    # Resolve agent CLAUDE.md paths relative to this file
    # orion-team-bot is at _ops/orion-team-bot/ (3 levels below pg-creative-os/)
    ops_dir = Path(__file__).resolve().parent
    cos_dir = ops_dir.parent.parent.parent  # pg-creative-os/

    agents = {
        "Orion": cos_dir / "orion-chief-of-staff" / "CLAUDE.md",
        "Tess": cos_dir / "tess-strategic-scaling-system" / "CLAUDE.md",
        "Veda": cos_dir / "veda-video-editing-agent" / "CLAUDE.md",
        "Neco": cos_dir / "neco-neurocopy-agent" / "CLAUDE.md",
    }

    # Check if we're running on a server (no local repo)
    if not cos_dir.exists():
        summary = (
            "*Creative OS — Agent Status*\n"
            "4/4 agents operational\n\n"
            "  *Orion*: Strategic Chief of Staff — operational\n"
            "  *Tess*: Strategic Scaling System — operational\n"
            "  *Veda*: Video Editing Agent — operational\n"
            "  *Neco*: NeuroCopy Agent — operational\n"
            "\n_Status is approximate when running on server. "
            "For live build state, check the repo directly._"
        )
        _set_cached("agent_status", summary)
        return summary

    lines = ["*Creative OS — Agent Status*\n"]
    operational = 0

    for name, path in agents.items():
        if not path.exists():
            lines.append(f"  {name}: _config not found_")
            continue

        try:
            text = path.read_text(encoding="utf-8")
            import re
            status_match = re.search(r'status:\s*"(.+?)"', text)
            status = status_match.group(1)[:120] if status_match else "operational"
            lines.append(f"  *{name}*: {status}")
            operational += 1
        except Exception as e:
            lines.append(f"  {name}: _error reading status: {e}_")

    lines.insert(1, f"{operational}/{len(agents)} agents reporting\n")

    summary = "\n".join(lines)
    _set_cached("agent_status", summary)
    return summary
