#!/usr/bin/env python3
"""Production Calendar Notifier — Slack alerts when footage is ready for tagging.

Polls the ClickUp Production Calendar for subtask completions and posts
formatted notifications to the Production Calendar Slack channel.

URL-gated: notifications only fire when the parent task has an Iconik URL
in the description or "Raw Footage (URL)" custom field.

Architecture follows the intake_id_generator.py polling pattern.

Usage:
    python3 production_notifier.py --config config.yaml [--dry-run] [--once]
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

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    format="%(asctime)s %(levelname)-7s %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    level=logging.INFO,
)
log = logging.getLogger("prod-notifier")

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
CLICKUP_BASE = "https://api.clickup.com/api/v2"
ICONIK_URL_PATTERN = re.compile(r"https?://(?:app\.iconik\.io|icnk\.io)/\S+")
SUBTASK_TRIGGERS = {"ingest"}  # Subtask names that trigger notifications (lowercase)


# ---------------------------------------------------------------------------
# ClickUp Client (minimal, read-focused)
# ---------------------------------------------------------------------------
class ClickUpClient:
    """Minimal ClickUp API v2 client for production calendar monitoring."""

    def __init__(self, token: str):
        self._headers = {
            "Authorization": token,
            "Content-Type": "application/json",
        }

    def fetch_tasks(self, list_id: str, include_closed: bool = True) -> list[dict]:
        """Fetch all tasks from a list (paginated), including subtasks."""
        tasks = []
        page = 0
        while True:
            resp = requests.get(
                f"{CLICKUP_BASE}/list/{list_id}/task",
                headers=self._headers,
                params={
                    "include_closed": str(include_closed).lower(),
                    "page": page,
                    "subtasks": "true",
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

    def get_task(self, task_id: str) -> dict:
        """Fetch a single task by ID (with subtasks)."""
        resp = requests.get(
            f"{CLICKUP_BASE}/task/{task_id}",
            headers=self._headers,
            params={"include_subtasks": "true"},
            timeout=15,
        )
        resp.raise_for_status()
        return resp.json()

    @staticmethod
    def get_custom_field_value(task: dict, field_name: str) -> str | None:
        """Extract a custom field's display value from a task."""
        for cf in task.get("custom_fields", []):
            if cf.get("name") != field_name:
                continue
            value = cf.get("value")
            if value is None or value == "":
                return None
            cf_type = cf.get("type", "")
            if cf_type in ("text", "url", "short_text"):
                return str(value).strip()
            if cf_type == "labels":
                options = cf.get("type_config", {}).get("options", [])
                if isinstance(value, list) and value:
                    opt_map = {o.get("id"): o.get("label", o.get("name", "")) for o in options}
                    labels = [opt_map.get(uuid, "") for uuid in value if opt_map.get(uuid)]
                    return ", ".join(labels) if labels else None
                return None
            if cf_type == "drop_down":
                options = cf.get("type_config", {}).get("options", [])
                if isinstance(value, int) and 0 <= value < len(options):
                    return options[value].get("name", "").strip()
                for opt in options:
                    if str(opt.get("orderindex")) == str(value) or opt.get("id") == str(value):
                        return opt.get("name", "").strip()
                return str(value)
            return str(value).strip()
        return None


# ---------------------------------------------------------------------------
# Slack Poster
# ---------------------------------------------------------------------------
class SlackPoster:
    """Posts formatted messages to Slack channels via Bot API."""

    def __init__(self, bot_token: str):
        self._token = bot_token
        self._headers = {
            "Authorization": f"Bearer {bot_token}",
            "Content-Type": "application/json",
        }

    def post_message(self, channel: str, text: str, blocks: list | None = None) -> bool:
        """Post a message to a Slack channel."""
        payload = {"channel": channel, "text": text}
        if blocks:
            payload["blocks"] = blocks
        try:
            resp = requests.post(
                "https://slack.com/api/chat.postMessage",
                headers=self._headers,
                json=payload,
                timeout=15,
            )
            data = resp.json()
            if data.get("ok"):
                log.info("Slack message posted to %s", channel)
                return True
            log.error("Slack API error: %s", data.get("error", "unknown"))
            return False
        except Exception as e:
            log.error("Slack post failed: %s", e)
            return False


# ---------------------------------------------------------------------------
# State Manager
# ---------------------------------------------------------------------------
class StateManager:
    """Tracks which subtask completions have already been notified."""

    def __init__(self, state_path: Path):
        self._path = state_path
        self._state = self._load()

    def _load(self) -> dict:
        if self._path.exists():
            try:
                with open(self._path) as f:
                    return json.load(f)
            except (json.JSONDecodeError, IOError):
                log.warning("Corrupted state file, starting fresh")
        return {"notified_subtasks": {}, "last_run": None}

    def save(self):
        with open(self._path, "w") as f:
            json.dump(self._state, f, indent=2)
            f.write("\n")

    def is_notified(self, subtask_id: str) -> bool:
        return subtask_id in self._state["notified_subtasks"]

    def mark_notified(self, subtask_id: str, parent_task_name: str):
        self._state["notified_subtasks"][subtask_id] = {
            "parent_task": parent_task_name,
            "notified_at": datetime.now(timezone.utc).isoformat(),
        }

    def mark_pending(self, subtask_id: str, parent_task_name: str, reason: str):
        """Track subtasks waiting for URL gate."""
        key = f"pending:{subtask_id}"
        self._state.setdefault("pending_url_gate", {})[key] = {
            "parent_task": parent_task_name,
            "reason": reason,
            "first_seen": self._state.get("pending_url_gate", {}).get(key, {}).get(
                "first_seen", datetime.now(timezone.utc).isoformat()
            ),
            "last_checked": datetime.now(timezone.utc).isoformat(),
        }

    def clear_pending(self, subtask_id: str):
        key = f"pending:{subtask_id}"
        self._state.get("pending_url_gate", {}).pop(key, None)

    def update_last_run(self):
        self._state["last_run"] = datetime.now(timezone.utc).isoformat()

    def prune(self, max_entries: int = 500):
        """Keep state file from growing indefinitely."""
        notified = self._state.get("notified_subtasks", {})
        if len(notified) > max_entries:
            sorted_items = sorted(notified.items(), key=lambda x: x[1].get("notified_at", ""))
            self._state["notified_subtasks"] = dict(sorted_items[-max_entries:])


# ---------------------------------------------------------------------------
# Main Notifier
# ---------------------------------------------------------------------------
class ProductionNotifier:
    def __init__(self, config_path: str, dry_run: bool = False):
        import yaml
        with open(config_path) as f:
            self.cfg = yaml.safe_load(f)

        self.dry_run = dry_run

        # Init clients
        clickup_token = os.environ.get("CLICKUP_API_TOKEN", "")
        if not clickup_token:
            raise RuntimeError("CLICKUP_API_TOKEN not set")
        self.clickup = ClickUpClient(clickup_token)

        slack_token = os.environ.get("SLACK_BOT_TOKEN", "")
        if not slack_token:
            raise RuntimeError("SLACK_BOT_TOKEN not set")
        self.slack = SlackPoster(slack_token)

        # State
        state_dir = Path(config_path).parent
        self.state = StateManager(state_dir / ".production-notifier-state.json")

        # Config
        self.list_id = self.cfg["clickup"]["production_calendar_list_id"]
        self.slack_channel = os.environ.get("SLACK_PRODUCTION_CHANNEL") or self.cfg["slack"].get("production_channel", "")
        if not self.slack_channel or self.slack_channel == "REPLACE_WITH_CHANNEL_ID":
            raise RuntimeError(
                "Slack production channel not configured. "
                "Set SLACK_PRODUCTION_CHANNEL env var or update slack.production_channel in config.yaml."
            )
        self.footage_url_field = self.cfg["clickup"].get("footage_url_field_name", "Raw Footage (URL)")

    def run(self) -> dict:
        """Main entry point. Returns summary dict."""
        summary = {"checked": 0, "notified": 0, "pending_url": 0, "errors": 0}

        log.info("Fetching tasks from Production Calendar (list %s)...", self.list_id)
        all_tasks = self.clickup.fetch_tasks(self.list_id)
        log.info("Fetched %d tasks+subtasks", len(all_tasks))

        # Separate parent tasks and subtasks
        parent_tasks = {t["id"]: t for t in all_tasks if not t.get("parent")}
        subtasks = [t for t in all_tasks if t.get("parent")]

        log.info("Parent tasks: %d, Subtasks: %d", len(parent_tasks), len(subtasks))

        for subtask in subtasks:
            subtask_id = subtask["id"]
            subtask_name = subtask.get("name", "").strip().lower()
            subtask_status = subtask.get("status", {}).get("status", "").lower()
            parent_id = subtask.get("parent")

            # Only process trigger subtasks that are in a "done" state
            if not any(trigger in subtask_name for trigger in SUBTASK_TRIGGERS):
                continue

            if subtask_status not in ("closed", "complete", "done", "upload + ingest + tag"):
                continue

            summary["checked"] += 1

            # Already notified?
            if self.state.is_notified(subtask_id):
                continue

            # Get parent task
            parent = parent_tasks.get(parent_id)
            if not parent:
                log.warning("Parent task %s not found for subtask %s", parent_id, subtask_id)
                summary["errors"] += 1
                continue

            # URL Gate: check for Iconik URL
            iconik_url = self._find_iconik_url(parent)
            if not iconik_url:
                parent_name = parent.get("name", "unknown")
                log.info("URL gate: no Iconik URL for '%s' — holding notification", parent_name)
                self.state.mark_pending(subtask_id, parent_name, "no_iconik_url")
                summary["pending_url"] += 1
                continue

            # Build and send notification
            self.state.clear_pending(subtask_id)
            success = self._send_notification(parent, subtask, iconik_url)
            if success:
                self.state.mark_notified(subtask_id, parent.get("name", ""))
                summary["notified"] += 1
            else:
                summary["errors"] += 1

        self.state.update_last_run()
        self.state.prune()
        self.state.save()

        log.info(
            "Run complete: %d checked, %d notified, %d pending URL, %d errors",
            summary["checked"], summary["notified"], summary["pending_url"], summary["errors"],
        )
        return summary

    def _find_iconik_url(self, task: dict) -> str | None:
        """Check task for an Iconik URL in custom field or description."""
        # Check "Raw Footage (URL)" custom field first
        footage_url = self.clickup.get_custom_field_value(task, self.footage_url_field)
        if footage_url and ICONIK_URL_PATTERN.search(footage_url):
            return footage_url

        # Check task description
        description = task.get("description", "") or ""
        match = ICONIK_URL_PATTERN.search(description)
        if match:
            return match.group(0)

        # Check if the custom field has any URL (even non-Iconik, as it's the footage field)
        if footage_url and footage_url.startswith("http"):
            return footage_url

        return None

    def _send_notification(self, parent: dict, subtask: dict, iconik_url: str) -> bool:
        """Build and send the Slack notification."""
        task_name = parent.get("name", "Unknown Shoot")
        task_id = parent.get("id", "")
        task_url = parent.get("url", f"https://app.clickup.com/t/{task_id}")
        description = (parent.get("description", "") or "").strip()

        # Extract metadata
        shoot_type = self.clickup.get_custom_field_value(parent, "Shoot Type") or ""
        product = self.clickup.get_custom_field_value(parent, "Product Funnel(s)") or ""

        # Format shoot date from due_date
        due_date_ms = parent.get("due_date")
        shoot_date = ""
        if due_date_ms:
            try:
                dt = datetime.fromtimestamp(int(due_date_ms) / 1000, tz=timezone.utc)
                shoot_date = dt.strftime("%m/%d/%Y")
            except (ValueError, TypeError):
                pass

        # Build date + type line
        meta_parts = []
        if shoot_date:
            meta_parts.append(shoot_date)
        if shoot_type:
            meta_parts.append(shoot_type)
        if product:
            meta_parts.append(product)
        meta_line = " · ".join(meta_parts)

        # Build message text (fallback for non-block-kit clients)
        lines = [f":white_check_mark: *{task_name}*"]
        if meta_line:
            lines.append(f":calendar: {meta_line}")
        lines.append("")
        if description:
            # Truncate very long descriptions
            if len(description) > 1500:
                description = description[:1500] + "..."
            lines.append(description)
            lines.append("")
        lines.append("*Ready for tagging.*")
        lines.append(f"<{task_url}|View task in ClickUp>")

        message_text = "\n".join(lines)

        if self.dry_run:
            log.info("[DRY RUN] Would post to %s:\n%s", self.slack_channel, message_text)
            return True

        return self.slack.post_message(self.slack_channel, message_text)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(description="Production Calendar Notifier")
    parser.add_argument("--config", required=True, help="Path to config.yaml")
    parser.add_argument("--dry-run", action="store_true", help="Show notifications without posting to Slack")
    parser.add_argument("--once", action="store_true", help="Run once and exit (default: run once)")
    args = parser.parse_args()

    # File lock to prevent overlapping runs
    lock_path = "/tmp/production-notifier.lock"
    lock_fp = open(lock_path, "w")
    try:
        fcntl.flock(lock_fp, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        log.info("Another instance is running (lock held). Exiting.")
        sys.exit(0)

    try:
        notifier = ProductionNotifier(args.config, dry_run=args.dry_run)
        summary = notifier.run()
        print(json.dumps(summary, indent=2))
    finally:
        fcntl.flock(lock_fp, fcntl.LOCK_UN)
        lock_fp.close()


if __name__ == "__main__":
    main()
