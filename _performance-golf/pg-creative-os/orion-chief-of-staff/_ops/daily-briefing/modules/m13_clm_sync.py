"""M13 — CLM URL Sync Module (Multi-Offer).

Syncs Creative Launch Map URL registries from external sources:
- Google Sheets (GTM Launch Links — Jenny's master sheet)
- ClickUp (task URLs and comments) — future primary source
- Slack (channel messages with links)

Supports multiple offers (RS1, SF2, etc.) via config.yaml offers dict.
Each offer has its own registry, Slack channels, and ClickUp lists.

Lifecycle-aware: understands that funnel page URLs don't exist until
the build phase. Only actively syncs URLs whose phase matches the
current lifecycle_phase in the registry.

Reports updated, new, and stale URLs in the daily briefing.
Writes per-offer CLM summaries to shared_state for M00a rendering.
"""

import json
import re
from datetime import datetime
from pathlib import Path
from typing import Any

from .base import BriefingModule

# URL type detection patterns
URL_TYPE_PATTERNS = [
    (r"figma\.com", "figma"),
    (r"docs\.google\.com/document", "google_doc"),
    (r"docs\.google\.com/presentation", "google_slides"),
    (r"docs\.google\.com/spreadsheet", "google_sheets"),
    (r"app\.iconik\.io", "iconik"),
    (r"app\.clickup\.com", "clickup"),
    (r"loom\.com", "loom"),
    (r"performancegolf\.com", "web_page"),
    (r"secure\.performancegolf\.com", "web_page"),
]

# Lifecycle phase ordering — earlier phases are always active
PHASE_ORDER = ["pre-launch", "build", "post-launch"]


def detect_url_type(url: str) -> str:
    """Detect the type of a URL based on domain patterns."""
    for pattern, url_type in URL_TYPE_PATTERNS:
        if re.search(pattern, url, re.IGNORECASE):
            return url_type
    return "unknown"


def phase_is_active(entry_phase: str, current_phase: str) -> bool:
    """Check if an entry's phase is active given the current lifecycle phase.

    All phases up to and including the current phase are active.
    e.g., if current is "build", both "pre-launch" and "build" entries are active.
    """
    if entry_phase not in PHASE_ORDER or current_phase not in PHASE_ORDER:
        return True  # Unknown phases default to active
    return PHASE_ORDER.index(entry_phase) <= PHASE_ORDER.index(current_phase)


class CLMSyncModule(BriefingModule):
    name = "CLM URL Sync"
    key = "clm_sync"
    setup_required = "Google Sheets OAuth (python3 auth/sheets_auth.py)"

    def fetch_data(self) -> Any:
        """Fetch URLs from all configured sources for each offer."""
        mod_config = self.config.get("modules", {}).get(self.key, {})
        if not mod_config.get("enabled", False):
            return {"skipped": True}

        offers = mod_config.get("offers", {})

        # Backwards compatibility: if no offers dict, use flat config as single offer
        if not offers:
            registry_path_rel = mod_config.get("registry_path", "")
            if not registry_path_rel:
                return {"error": "No registry_path or offers in config"}
            offers = {
                "_default": {
                    "enabled": True,
                    "registry_path": registry_path_rel,
                    "slack_channels": mod_config.get("slack_channels", []),
                    "clickup_list_ids": mod_config.get("clickup_list_ids", []),
                    "auto_update_html": mod_config.get("auto_update_html", False),
                }
            }

        results = []
        for offer_key, offer_config in offers.items():
            if not offer_config.get("enabled", True):
                continue
            result = self._fetch_single_offer(offer_key, offer_config, mod_config)
            results.append(result)

        return {"offers_results": results}

    def _fetch_single_offer(self, offer_key: str, offer_config: dict, shared_config: dict) -> dict:
        """Fetch URLs for a single offer."""
        registry_path_rel = offer_config.get("registry_path", "")
        if not registry_path_rel:
            return {"offer_key": offer_key, "error": "No registry_path"}

        briefing_dir = Path(__file__).resolve().parent.parent
        registry_path = (briefing_dir / registry_path_rel).resolve()

        if not registry_path.exists():
            return {"offer_key": offer_key, "error": f"Registry not found: {registry_path}"}

        with open(registry_path) as f:
            registry = json.load(f)

        # Build per-offer config for source fetchers
        fetch_config = {
            "slack_channels": offer_config.get("slack_channels", []),
            "clickup_list_ids": offer_config.get("clickup_list_ids", []),
            "lookback_hours": shared_config.get("lookback_hours", 24),
        }

        fetched_urls = {}

        sheet_result = self._fetch_from_sheets(registry, fetch_config)
        fetched_urls["sheets"] = sheet_result.get("urls", {})
        tab_detected = sheet_result.get("tab_detected")

        clickup_urls = self._fetch_from_clickup(fetch_config)
        fetched_urls["clickup"] = clickup_urls

        slack_urls = self._fetch_from_slack(fetch_config)
        fetched_urls["slack"] = slack_urls

        return {
            "offer_key": offer_key,
            "offer_config": offer_config,
            "registry": registry,
            "registry_path": str(registry_path),
            "fetched_urls": fetched_urls,
            "tab_detected": tab_detected,
        }

    def _fetch_from_sheets(self, registry: dict, mod_config: dict) -> dict:
        """Fetch URLs from the GTM Launch Links Google Sheet.

        If gtm_sheet_tab is null but gtm_sheet_tab_pattern is set,
        scans all tab names for a match — this detects when Jenny
        creates a new tab for this product.
        """
        sheet_id = registry.get("gtm_sheet_id", "")
        if not sheet_id:
            return {"urls": {}}

        tab_name = registry.get("gtm_sheet_tab")
        tab_pattern = registry.get("gtm_sheet_tab_pattern", "")

        try:
            from .sheets_helper import get_sheets_service, fetch_sheet_values, extract_urls_from_rows
            service = get_sheets_service(self.env)
        except Exception as e:
            self.logger.warning(f"[{self.key}] Sheets service init failed: {e}")
            return {"urls": {}}

        # If no tab is set, try to auto-detect by scanning tab names
        tab_detected = None
        if not tab_name and tab_pattern:
            try:
                sheet_meta = service.spreadsheets().get(spreadsheetId=sheet_id).execute()
                sheets = sheet_meta.get("sheets", [])
                for s in sheets:
                    title = s.get("properties", {}).get("title", "")
                    if tab_pattern.lower() in title.lower():
                        tab_detected = title
                        tab_name = title
                        self.logger.info(
                            f"[{self.key}] GTM tab detected: '{title}' "
                            f"(matched pattern '{tab_pattern}')"
                        )
                        break

                if not tab_name:
                    self.logger.info(
                        f"[{self.key}] No GTM tab matching '{tab_pattern}' found yet — "
                        f"funnel page URLs not available (expected at this stage)"
                    )
                    return {"urls": {}, "tab_detected": None}
            except Exception as e:
                self.logger.warning(f"[{self.key}] GTM tab scan failed: {e}")
                return {"urls": {}}

        # Fetch data from the tab
        try:
            rows = fetch_sheet_values(service, sheet_id, tab_name)
            urls = extract_urls_from_rows(rows)
            self.logger.info(f"[{self.key}] Fetched {len(urls)} URLs from GTM sheet tab '{tab_name}'")
            return {"urls": urls, "tab_detected": tab_detected}
        except Exception as e:
            self.logger.warning(f"[{self.key}] Sheets fetch failed: {e}")
            return {"urls": {}}

    def _fetch_from_clickup(self, mod_config: dict) -> dict:
        """Fetch URLs from ClickUp task descriptions and comments."""
        list_ids = mod_config.get("clickup_list_ids", [])
        if not list_ids:
            return {}

        token = self.env.get("CLICKUP_API_TOKEN", "")
        if not token:
            self.logger.info(f"[{self.key}] No CLICKUP_API_TOKEN, skipping ClickUp source")
            return {}

        import requests
        from .clickup_helper import BASE_URL

        urls = {}
        for list_id in list_ids:
            try:
                headers = {"Authorization": token, "Content-Type": "application/json"}
                resp = requests.get(
                    f"{BASE_URL}/list/{list_id}/task",
                    headers=headers,
                    params={"include_closed": "false", "page": 0},
                    timeout=30,
                )
                resp.raise_for_status()
                tasks = resp.json().get("tasks", [])

                for task in tasks:
                    # Extract URLs from task description
                    desc = task.get("description", "") or ""
                    task_name = task.get("name", "")
                    for match in re.finditer(r'https?://\S+', desc):
                        url = match.group(0).rstrip(")")
                        urls[f"clickup:{task_name}:{url}"] = url

                    # Also capture the task URL itself
                    task_url = task.get("url", "")
                    if task_url:
                        urls[f"clickup_task:{task_name}"] = task_url

                self.logger.info(f"[{self.key}] Fetched {len(urls)} URLs from ClickUp list {list_id}")
            except Exception as e:
                self.logger.warning(f"[{self.key}] ClickUp fetch failed for list {list_id}: {e}")

        return urls

    def _fetch_from_slack(self, mod_config: dict) -> dict:
        """Fetch URLs from recent Slack channel messages."""
        channels = mod_config.get("slack_channels", [])
        if not channels:
            return {}

        try:
            from .slack_helper import get_slack_client
            client = get_slack_client(self.env)
        except Exception as e:
            self.logger.warning(f"[{self.key}] Slack client init failed: {e}")
            return {}

        from datetime import timedelta
        lookback_hours = mod_config.get("lookback_hours", 24)
        since_ts = str(int((datetime.now() - timedelta(hours=lookback_hours)).timestamp()))

        urls = {}
        for channel_name in channels:
            try:
                # Find channel by name
                channel_name_clean = channel_name.lstrip("#")
                convos = client.conversations_list(types="public_channel,private_channel", limit=200)
                channel_id = None
                for ch in convos.get("channels", []):
                    if ch.get("name") == channel_name_clean:
                        channel_id = ch["id"]
                        break

                if not channel_id:
                    self.logger.info(f"[{self.key}] Slack channel '{channel_name}' not found")
                    continue

                hist = client.conversations_history(
                    channel=channel_id, limit=50, oldest=since_ts
                )
                messages = hist.get("messages", [])

                for msg in messages:
                    text = msg.get("text", "")
                    user = msg.get("user", "unknown")
                    for match in re.finditer(r'<?(https?://[^\s>|]+)', text):
                        url = match.group(1)
                        urls[f"slack:{user}:{url}"] = url

                self.logger.info(
                    f"[{self.key}] Fetched {len(urls)} URLs from Slack #{channel_name_clean}"
                )
            except Exception as e:
                self.logger.warning(f"[{self.key}] Slack fetch failed for {channel_name}: {e}")

        return urls

    def _update_clm_files(self, registry_path: str) -> list:
        """Run sync_clm.py to inject live URLs into CLM markdown and HTML files."""
        registry_dir = Path(registry_path).parent
        sync_script = registry_dir / "sync_clm.py"

        if not sync_script.exists():
            self.logger.warning(f"[{self.key}] sync_clm.py not found at {sync_script}")
            return []

        import subprocess
        try:
            result = subprocess.run(
                ["python3", str(sync_script), "--apply"],
                capture_output=True, text=True, timeout=30,
                cwd=str(registry_dir),
            )
            output = result.stdout.strip()
            self.logger.info(f"[{self.key}] CLM file sync: {output}")

            # Parse changes from output
            changes = []
            for line in output.split("\n"):
                line = line.strip()
                if line.startswith(("MD ", "HTML ")):
                    changes.append(line)
            return changes
        except Exception as e:
            self.logger.warning(f"[{self.key}] CLM file sync failed: {e}")
            return []

    def analyze(self, data: Any) -> str:
        """Analyze all offers and produce combined report."""
        if data.get("skipped"):
            return "_CLM Sync disabled in config._"
        if data.get("error"):
            return f"**CLM Sync Error:** {data['error']}"

        offers_results = data.get("offers_results", [])
        if not offers_results:
            return "_No CLM offers configured._"

        sections = []
        clm_summaries = []

        for offer_data in offers_results:
            section, summary = self._analyze_single_offer(offer_data)
            sections.append(section)
            clm_summaries.append(summary)

        # Write CLM summaries to shared_state for M00a
        self.shared_state["clm_status"] = clm_summaries

        return "\n\n".join(sections)

    def _analyze_single_offer(self, data: dict) -> tuple:
        """Analyze a single offer. Returns (report_markdown, summary_dict)."""
        offer_key = data.get("offer_key", "unknown")
        offer_config = data.get("offer_config", {})

        if data.get("error"):
            summary = {
                "offer_key": offer_key,
                "launch_name": offer_key.upper(),
                "status": "error",
                "summary": data["error"],
            }
            return f"**{offer_key.upper()} CLM** — {data['error']}", summary

        registry = data["registry"]
        registry_path = data["registry_path"]
        fetched = data["fetched_urls"]
        tab_detected = data.get("tab_detected")

        current_phase = registry.get("lifecycle_phase", "pre-launch")
        launch_name = registry.get("launch", offer_key.upper())

        # Flatten all fetched URLs from sheets (primary source)
        sheet_urls = fetched.get("sheets", {})

        # Match fetched URLs to registry entries
        updates = []
        active_tbd = []
        future_tbd = []
        already_live = []

        for key, entry in registry.get("urls", {}).items():
            if entry["status"] == "live":
                already_live.append(entry)
                continue

            entry_phase = entry.get("phase", "pre-launch")
            is_active = phase_is_active(entry_phase, current_phase)

            matched_url = None
            if is_active:
                source_row_label = entry.get("source_row_label", "")

                if source_row_label and entry.get("source") in ("gtm_sheet", "clickup"):
                    for sheet_label, sheet_url in sheet_urls.items():
                        if (source_row_label.lower() in sheet_label
                                or sheet_label in source_row_label.lower()):
                            matched_url = sheet_url
                            break

                if not matched_url and entry.get("source") == "gtm_sheet" and sheet_urls:
                    entry_type = entry.get("type", "")
                    entry_label = entry.get("label", "").lower()
                    for sheet_label, sheet_url in sheet_urls.items():
                        if entry_type and entry_type != "web_page":
                            detected_type = detect_url_type(sheet_url)
                            if detected_type != entry_type:
                                continue
                        entry_words = set(w for w in entry_label.split() if len(w) > 2)
                        sheet_words = set(w for w in sheet_label.split() if len(w) > 2)
                        overlap = entry_words & sheet_words
                        if overlap and len(overlap) >= min(2, len(entry_words)):
                            matched_url = sheet_url
                            break

                if not matched_url and entry.get("source") == "clickup":
                    entry_type = entry.get("type", "")
                    for cu_label, cu_url in fetched.get("clickup", {}).items():
                        if entry_type:
                            detected_type = detect_url_type(cu_url)
                            if detected_type == entry_type:
                                matched_url = cu_url
                                break

            if matched_url:
                old_url = entry.get("url")
                if old_url != matched_url:
                    entry["url"] = matched_url
                    entry["status"] = "live"
                    entry["last_updated"] = datetime.now().isoformat()
                    updates.append({
                        "key": key,
                        "label": entry["label"],
                        "url": matched_url,
                        "was": old_url or "TBD",
                    })
            elif is_active:
                active_tbd.append(entry)
            else:
                future_tbd.append(entry)

        # If a new GTM tab was detected, update the registry and advance phase
        if tab_detected and not registry.get("gtm_sheet_tab"):
            registry["gtm_sheet_tab"] = tab_detected
            if current_phase == "pre-launch":
                registry["lifecycle_phase"] = "build"
                self.logger.info(
                    f"[{self.key}] {launch_name}: lifecycle advanced: pre-launch → build "
                    f"(GTM tab '{tab_detected}' detected)"
                )

        # Write updated registry back
        if updates or tab_detected:
            registry["last_synced"] = datetime.now().isoformat()
            with open(registry_path, "w") as f:
                json.dump(registry, f, indent=2)
            self.logger.info(f"[{self.key}] {launch_name}: updated registry with {len(updates)} new URLs")

        # Auto-update CLM files if config allows and there are updates
        clm_file_changes = []
        if updates and offer_config.get("auto_update_html", False):
            clm_file_changes = self._update_clm_files(registry_path)

        # Build report section
        lines = []
        lines.append(f"**{launch_name} CLM** — URL Sync Report")
        lines.append(f"**Phase:** {current_phase}\n")

        if tab_detected:
            lines.append(
                f"**NEW:** GTM tab `{tab_detected}` detected in Jenny's sheet — "
                f"funnel page URLs are now being tracked.\n"
            )

        if updates:
            lines.append(f"#### {len(updates)} URL(s) Updated\n")
            lines.append("| Asset | URL | Was |")
            lines.append("|-------|-----|-----|")
            for u in updates:
                short_url = u["url"][:60] + "..." if len(u["url"]) > 60 else u["url"]
                lines.append(f"| {u['label']} | [{short_url}]({u['url']}) | {u['was']} |")
            lines.append("")
        else:
            lines.append("No new URLs detected since last sync.\n")

        live_count = len(already_live) + len(updates)
        lines.append(
            f"**Status:** {live_count} live, "
            f"{len(active_tbd)} TBD (active), "
            f"{len(future_tbd)} TBD (awaiting build phase)\n"
        )

        if active_tbd:
            lines.append("<details><summary>Active TBD — expected to have URLs now</summary>\n")
            for entry in active_tbd:
                lines.append(f"- {entry['label']} ({entry.get('section', '')})")
            lines.append("\n</details>\n")

        if future_tbd and current_phase == "pre-launch":
            lines.append(
                f"_{len(future_tbd)} funnel page URL(s) awaiting build phase "
                f"(pages not yet built — this is expected)._"
            )

        if clm_file_changes:
            lines.append(f"\n**CLM files updated** ({len(clm_file_changes)} changes):")
            for c in clm_file_changes:
                lines.append(f"- {c}")

        external_url_count = sum(
            len(v) for v in [fetched.get("clickup", {}), fetched.get("slack", {})]
        )
        if external_url_count:
            lines.append(f"\n_Found {external_url_count} URL(s) in ClickUp/Slack for manual review._")

        # Build summary for M00a shared_state
        summary_parts = []
        if updates:
            summary_parts.append(f"{len(updates)} new URL(s) detected")
        else:
            summary_parts.append("no new URLs since last sync")
        if external_url_count:
            summary_parts.append(f"{external_url_count} URL(s) in ClickUp/Slack for manual review")

        summary = {
            "offer_key": offer_key,
            "launch_name": launch_name,
            "status": "synced",
            "live_count": live_count,
            "tbd_count": len(active_tbd) + len(future_tbd),
            "updates_count": len(updates),
            "summary": ". ".join(summary_parts) + ".",
        }

        return "\n".join(lines), summary
