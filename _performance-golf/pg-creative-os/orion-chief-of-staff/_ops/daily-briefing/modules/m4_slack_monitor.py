"""Module 4: Slack Monitor + Draft Responses
Scans Slack DMs, prioritizes by recency, and drafts 3 response options
per message using Wise Reply framework. Gate 3: read-only, NO chat:write."""

import json
from datetime import datetime
from pathlib import Path

from .base import BriefingModule, MODULES_DIR
from .prd_context import SCORECARD_CONTEXT

DAILY_BRIEFING_DIR = MODULES_DIR.parent
STATE_FILE = DAILY_BRIEFING_DIR / ".m4-state.json"

# Paths for Wise Reply context (same as skill)
# Note: STAKEHOLDER_MAP and WR_DIR are user-specific (~/.claude/projects/...) — each user's
# Claude projects directory has a different name based on their home path.
STAKEHOLDER_MAP = Path.home() / ".claude/projects/-Users-christopherogle/memory/stakeholder-map.md"
ORION_DIR = MODULES_DIR.parent.parent  # orion-chief-of-staff/
SESSION_LOG = ORION_DIR / "SESSION-LOG.md"
WR_DIR = Path.home() / ".claude/projects/-Users-christopherogle/memory/working-relationships"


def _load_stakeholder_map() -> str:
    if STAKEHOLDER_MAP.exists():
        return STAKEHOLDER_MAP.read_text(encoding="utf-8")[:4000]
    return "(Stakeholder map not found)"


def _load_session_context() -> str:
    if SESSION_LOG.exists():
        lines = SESSION_LOG.read_text(encoding="utf-8").splitlines()[:80]
        return "\n".join(lines)
    return "(Session log not found)"


def _load_working_relationship(user_name: str) -> str:
    """Load working-relationship file for sender if exists."""
    slug = user_name.lower().replace(" ", "-").split("-")[0]  # first name
    candidates = list(WR_DIR.glob("*.md")) if WR_DIR.exists() else []
    for f in candidates:
        if f.stem.lower().startswith(slug) or slug in f.stem.lower():
            return f.read_text(encoding="utf-8")[:2000]
    return "(No working-relationship file found)"


def _save_state(processed: list) -> None:
    STATE_FILE.write_text(
        json.dumps({
            "processed": processed,
            "last_run": datetime.now().isoformat(),
        }, indent=2),
        encoding="utf-8",
    )


class SlackMonitorModule(BriefingModule):
    name = "Slack Monitor"
    key = "m4_slack_monitor"
    setup_required = "Slack OAuth (read-only). Run: python3 auth/slack_auth.py"

    def fetch_data(self):
        mod_config = self.config.get("modules", {}).get(self.key, {})
        if not mod_config.get("dm_scan", True):
            return {"messages": [], "skipped": "dm_scan disabled"}

        token_path = self.env.get("SLACK_TOKEN_PATH", "auth/slack_token.json")
        if not (DAILY_BRIEFING_DIR / token_path).exists():
            return {"messages": [], "error": "Slack token not found. Run: python3 auth/slack_auth.py"}

        try:
            from .slack_helper import get_slack_client, fetch_unanswered_dms
            client = get_slack_client(self.env)
            lookback = mod_config.get("lookback_hours", 24)
            messages = fetch_unanswered_dms(client, self.logger, lookback_hours=lookback)
            return {"messages": messages, "error": None}
        except Exception as e:
            self.logger.warning(f"[{self.key}] Slack fetch failed: {e}")
            return {"messages": [], "error": str(e)}

    def analyze(self, data):
        if data.get("error"):
            return (
                f"_Slack not connected._ {data['error']}\n\n"
                "**Setup:** Run `python3 auth/slack_auth.py` and add `SLACK_TOKEN_PATH=auth/slack_token.json` to .env"
            )

        messages = data.get("messages", [])
        if not messages:
            return "_No DMs awaiting your reply in the last 24 hours._\n"

        stakeholder = _load_stakeholder_map()
        session_ctx = _load_session_context()
        mod_config = self.config.get("modules", {}).get(self.key, {})
        max_per_run = mod_config.get("max_messages_per_run", 5)

        processed = []
        lines = [
            f"**{len(messages)} DM(s)** awaiting reply. Showing up to {max_per_run} with draft responses.\n"
        ]

        for i, msg in enumerate(messages[:max_per_run]):
            user_name = msg.get("user_name", "Unknown")
            thread_ctx = msg.get("thread_context", msg.get("last_message", ""))
            wr_ctx = _load_working_relationship(user_name)

            drafts = self.call_anthropic(
                system_prompt=(
                    "You are Orion, a strategic Chief of Staff for Christopher Ogle, Interim Creative Lead "
                    "at Performance Golf. You draft Slack response options using the Wise Reply framework.\n\n"
                    f"{SCORECARD_CONTEXT}\n\n"
                    "STAKECHOLDER CONTEXT (use if sender is listed):\n" + stakeholder + "\n\n"
                    "ORION SESSION CONTEXT (30/60/90 pulse, P0 items):\n" + session_ctx + "\n\n"
                    "WORKING-RELATIONSHIP (patterns that work with this person):\n" + wr_ctx + "\n\n"
                    "Draft 3 response options: **Direct**, **Diplomatic**, **Strategic**. "
                    "Each should be 1-3 sentences, copy-paste ready. "
                    "No preamble — output ONLY the 3 options in this format:\n\n"
                    "**Option A — Direct**\n> [response text]\n\n"
                    "**Option B — Diplomatic**\n> [response text]\n\n"
                    "**Option C — Strategic**\n> [response text]"
                ),
                user_content=(
                    f"Sender: {user_name}\n"
                    f"Message/thread:\n{thread_ctx}\n\n"
                    "Draft 3 response options (Direct / Diplomatic / Strategic):"
                ),
                max_tokens=600,
            )

            lines.append(f"#### {user_name}\n")
            lines.append(f"> {msg.get('last_message', '')[:200]}{'...' if len(msg.get('last_message', '')) > 200 else ''}\n")
            lines.append(drafts)
            lines.append("")

            processed.append({
                "user_name": user_name,
                "user_id": msg.get("user_id"),
                "channel_id": msg.get("channel_id"),
                "last_message": msg.get("last_message", ""),
                "ts": msg.get("ts"),
                "drafts": drafts,
            })

        if len(messages) > max_per_run:
            lines.append(f"_+{len(messages) - max_per_run} more DM(s) not shown. Reply to these first._\n")

        _save_state(processed)

        return "\n".join(lines)
