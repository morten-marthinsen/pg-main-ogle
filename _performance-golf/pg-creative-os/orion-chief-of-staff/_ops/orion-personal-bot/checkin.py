#!/usr/bin/env python3
from __future__ import annotations
"""Orion Hourly Check-in — builds and posts the scannable task pulse to Christopher's Slack DM.

Can be run two ways:
  1. Via launchd (scheduled, hourly 9am-6pm Mon-Fri local time)
  2. Via agent.py (manual trigger: Christopher says "check in")
  3. Pre-call nudge mode: python3 checkin.py --precall

Usage:
    python3 checkin.py           # hourly check-in (respects schedule guard)
    python3 checkin.py --force   # skip schedule guard (for manual agent trigger)
    python3 checkin.py --precall # pre-call nudge check (runs every 5 min via launchd)
"""

import argparse
import logging
import os
import sys
from datetime import date, datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

from dotenv import load_dotenv

# ── Path setup ────────────────────────────────────────────────────────────────
BOT_DIR = Path(__file__).resolve().parent
DAILY_BRIEFING_DIR = BOT_DIR.parent / "daily-briefing"
MODULES_DIR = DAILY_BRIEFING_DIR / "modules"

# Load .env from bot directory
load_dotenv(BOT_DIR / ".env")

# Add modules to path so we can import KB and calendar helpers
for p in [str(DAILY_BRIEFING_DIR), str(MODULES_DIR)]:
    if p not in sys.path:
        sys.path.insert(0, p)

from modules.calendar_helper import (  # noqa: E402
    fetch_events_for_date,
    format_time,
    get_calendar_service,
    parse_event,
)
from kb_ops import find_open_tasks, get_day_tasks  # noqa: E402
from checkin_state import (  # noqa: E402
    clear_suggestion,
    mark_precall_nudge_sent,
    record_checkin,
    was_precall_nudge_sent,
)
from delegation_engine import get_delegation_opportunity  # noqa: E402

logging.basicConfig(level=logging.INFO, format="%(asctime)s [checkin] %(levelname)s: %(message)s")
logger = logging.getLogger("checkin")

# ── Config ────────────────────────────────────────────────────────────────────
LOCAL_TZ = ZoneInfo(os.environ.get("ORION_TIMEZONE", "America/New_York"))
CHECKIN_HOUR_START = 9   # 9am local time
CHECKIN_HOUR_END = 18    # 6pm local time (last check-in fires AT 18:00)
WORK_WEEKDAYS = {0, 1, 2, 3, 4}  # Mon-Fri
OWNER_SLACK_ID = os.environ.get("OWNER_SLACK_ID", "")
SLACK_BOT_TOKEN = os.environ.get("SLACK_BOT_TOKEN", "")
CALENDAR_TZ = os.environ.get("ORION_TIMEZONE", "America/New_York")

# Calendar credentials from daily-briefing
CALENDAR_ENV = {
    "CALENDAR_CREDENTIALS_PATH": "auth/gmail_credentials.json",
    "CALENDAR_TOKEN_PATH": "auth/calendar_token.json",
}


# ── Schedule guard ────────────────────────────────────────────────────────────

def should_run() -> bool:
    """Return True if it's a weekday and within 9am-6pm local time."""
    now = datetime.now(LOCAL_TZ)
    if now.weekday() not in WORK_WEEKDAYS:
        return False
    if not (CHECKIN_HOUR_START <= now.hour <= CHECKIN_HOUR_END):
        return False
    return True


# ── Calendar helpers ──────────────────────────────────────────────────────────

def _get_upcoming_events(minutes_ahead: int = 120) -> list[dict]:
    """Fetch calendar events starting in the next N minutes."""
    try:
        service = get_calendar_service(CALENDAR_ENV)
        events_raw = fetch_events_for_date(service, date.today(), timezone=CALENDAR_TZ)
        now = datetime.now(LOCAL_TZ).replace(tzinfo=None)
        cutoff = now + timedelta(minutes=minutes_ahead)

        upcoming = []
        for raw in events_raw:
            ev = parse_event(raw, timezone=CALENDAR_TZ)
            if ev["is_all_day"] or not ev["start_dt"]:
                continue
            start = ev["start_dt"]
            if now <= start <= cutoff:
                upcoming.append(ev)
        return upcoming
    except Exception as e:
        logger.warning(f"Calendar fetch failed: {e}")
        return []


def _get_events_starting_in_window(min_minutes: int = 25, max_minutes: int = 35) -> list[dict]:
    """Return events starting within a specific minute window (for pre-call nudge)."""
    try:
        service = get_calendar_service(CALENDAR_ENV)
        events_raw = fetch_events_for_date(service, date.today(), timezone=CALENDAR_TZ)
        now = datetime.now(LOCAL_TZ).replace(tzinfo=None)
        window_start = now + timedelta(minutes=min_minutes)
        window_end = now + timedelta(minutes=max_minutes)

        matches = []
        for raw in events_raw:
            ev = parse_event(raw, timezone=CALENDAR_TZ)
            if ev["is_all_day"] or not ev["start_dt"]:
                continue
            if window_start <= ev["start_dt"] <= window_end:
                matches.append(ev)
        return matches
    except Exception as e:
        logger.warning(f"Pre-call calendar fetch failed: {e}")
        return []


# ── Task helpers ──────────────────────────────────────────────────────────────

def _get_open_today_tasks() -> list[dict]:
    """Load open tasks scheduled for today, sorted by priority."""
    try:
        tasks = get_day_tasks(date.today())
        return [t for t in tasks if t.get("status") != "closed"]
    except Exception as e:
        logger.warning(f"Task load failed: {e}")
        return []


# ── Message builder ───────────────────────────────────────────────────────────

def build_checkin_message(tasks: list[dict], upcoming_events: list[dict]) -> tuple[str, list[dict]]:
    """Build the scannable check-in message and return (message_text, suggestions_list).

    suggestions_list is what gets saved to checkin_state for code-based replies.
    """
    now = datetime.now(LOCAL_TZ)
    hour_label = now.strftime("%-I:%M %p")

    lines = [f"*Orion Check-in — {hour_label}*"]

    if not tasks:
        lines.append("\n✅ No open tasks for today. Clear board.")
        return "\n".join(lines), []

    # ── Upcoming calls ────────────────────────────────────────────────────────
    if upcoming_events:
        lines.append("\n*Coming up:*")
        for ev in upcoming_events[:3]:
            start_str = format_time(ev["start_dt"])
            lines.append(f"  • {start_str} — {ev['summary']}")

    # ── Task pulse + delegation ideas ─────────────────────────────────────────
    lines.append("\n*Open today:*")

    suggestions = []
    suggestion_lines = []

    for task in tasks:
        tier = task.get("_tier", task.get("_priority_override", "B"))
        rank = task.get("_tier_rank", "")
        pos = f"{tier}{rank}"
        title = task.get("text", "")
        short = title[:50] + "…" if len(title) > 50 else title

        opp = get_delegation_opportunity(task)

        if opp["type"] != "keep":
            code = f"{len(suggestions) + 1:02d}"
            suggestions.append({
                "task_id": task.get("id"),
                "task_text": title,
                "type": opp["type"],
                "target": opp["target"],
                "slack_id": opp.get("slack_id"),
                "proof": opp["proof"],
            })
            suggestion_lines.append(
                f"  *{pos}* — {short}\n"
                f"       → `{code}` {opp['one_liner']} — type *{code}* to run"
            )
        else:
            lines.append(f"  *{pos}* — {short} _(keep — your call)_")

    lines.extend(suggestion_lines)

    if not suggestions:
        lines.append("\n_No delegation opportunities this hour — all tasks need your judgment._")

    return "\n".join(lines), suggestions


# ── Slack poster ──────────────────────────────────────────────────────────────

def post_to_slack(message: str) -> bool:
    """Post message to Christopher's DM via Slack Web API."""
    if not SLACK_BOT_TOKEN or not OWNER_SLACK_ID:
        logger.error("SLACK_BOT_TOKEN or OWNER_SLACK_ID not set — cannot post check-in")
        return False
    try:
        from slack_sdk import WebClient
        client = WebClient(token=SLACK_BOT_TOKEN)
        client.chat_postMessage(channel=OWNER_SLACK_ID, text=message)
        logger.info("Check-in posted to Slack.")
        return True
    except Exception as e:
        logger.error(f"Slack post failed: {e}")
        return False


# ── Pre-call nudge ────────────────────────────────────────────────────────────

def run_precall_nudge() -> None:
    """Check for calls starting in ~30 min. If any A-task is open, send a nudge.

    Runs every 5 min via launchd. Uses state to avoid duplicate nudges per event.
    """
    if not should_run():
        return

    upcoming = _get_events_starting_in_window(min_minutes=25, max_minutes=35)
    if not upcoming:
        return

    tasks = _get_open_today_tasks()
    a_tasks = [t for t in tasks if t.get("_tier") == "A" or t.get("_priority_override") == "A"]

    for event in upcoming:
        event_id = event["id"]
        if was_precall_nudge_sent(event_id):
            continue

        start_str = format_time(event["start_dt"])
        summary = event["summary"]

        if a_tasks:
            task_lines = "\n".join(
                f"  • {t.get('text', '')[:60]}" for t in a_tasks[:3]
            )
            message = (
                f"⚠️ *{summary}* starts at {start_str} — 30 min away.\n\n"
                f"These A-tasks are still open:\n{task_lines}\n\n"
                f"Anything that needs to be done before this call?"
            )
        else:
            message = (
                f"📅 *{summary}* starts at {start_str} — 30 min away. "
                f"No open A-tasks. You're clear."
            )

        if post_to_slack(message):
            mark_precall_nudge_sent(event_id)


# ── Main ──────────────────────────────────────────────────────────────────────

def run_checkin(force: bool = False) -> str:
    """Build and post the hourly check-in. Returns the message text.

    Args:
        force: Skip the schedule guard (used when triggered manually by agent).
    """
    if not force and not should_run():
        logger.info("Outside check-in window or weekend — skipping.")
        return ""

    tasks = _get_open_today_tasks()
    upcoming = _get_upcoming_events(minutes_ahead=120)
    message, suggestions = build_checkin_message(tasks, upcoming)

    # Save suggestion state for code-based replies
    record_checkin(suggestions)

    # Post to Slack
    post_to_slack(message)
    return message


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Orion hourly check-in")
    parser.add_argument("--force", action="store_true", help="Skip schedule guard")
    parser.add_argument("--precall", action="store_true", help="Run pre-call nudge check instead")
    args = parser.parse_args()

    if args.precall:
        run_precall_nudge()
    else:
        run_checkin(force=args.force)
