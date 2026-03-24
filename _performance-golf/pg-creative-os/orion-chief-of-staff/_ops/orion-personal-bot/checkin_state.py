"""Check-in State Manager — persists suggestion codes and strike counts across check-ins.

State file: daily-briefing/.checkin-state.json

Schema:
{
  "last_checkin": "2026-03-18T14:00:00",
  "current_suggestions": {
    "01": {
      "task_id": "mi-057",
      "task_text": "Review desktop & mobile checkout pages",
      "type": "agent",          // "agent" | "human" | "keep"
      "target": "Neco",         // agent name or person name
      "slack_id": null,         // set for human delegations
      "proof": "...",
    }
  },
  "strike_counts": {
    "mi-057": 2
  },
  "pre_call_nudges_sent": ["event-id-abc123"]
}
"""

from __future__ import annotations

import json
import logging
import os
import tempfile
from datetime import datetime
from pathlib import Path

logger = logging.getLogger(__name__)

BOT_DIR = Path(__file__).resolve().parent
DAILY_BRIEFING_DIR = BOT_DIR.parent / "daily-briefing"
STATE_PATH = DAILY_BRIEFING_DIR / ".checkin-state.json"

MAX_STRIKES = 3  # after this many ignored suggestions, stop pitching that task


def load_state() -> dict:
    """Load check-in state from disk. Returns empty state if missing."""
    if not STATE_PATH.exists():
        return _empty_state()
    try:
        with open(STATE_PATH) as f:
            data = json.load(f)
        # Ensure all expected keys exist
        data.setdefault("last_checkin", None)
        data.setdefault("current_suggestions", {})
        data.setdefault("strike_counts", {})
        data.setdefault("pre_call_nudges_sent", [])
        return data
    except Exception as e:
        logger.warning(f"Could not load checkin state: {e}")
        return _empty_state()


def save_state(state: dict) -> None:
    """Atomically write check-in state to disk."""
    fd, tmp_path = tempfile.mkstemp(
        dir=str(DAILY_BRIEFING_DIR), suffix=".tmp", prefix=".checkin-state-"
    )
    try:
        with os.fdopen(fd, "w") as f:
            json.dump(state, f, indent=2)
        os.replace(tmp_path, str(STATE_PATH))
    except Exception:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass
        raise


def _empty_state() -> dict:
    return {
        "last_checkin": None,
        "current_suggestions": {},
        "strike_counts": {},
        "pre_call_nudges_sent": [],
    }


def record_checkin(suggestions: list[dict]) -> dict:
    """Record a new check-in: update suggestion codes and increment strikes for
    any previously suggested tasks that were NOT resolved.

    Args:
        suggestions: list of suggestion dicts from delegation_engine, each with:
            task_id, task_text, type, target, slack_id, proof

    Returns:
        Updated state (also saved to disk).
    """
    state = load_state()

    # Increment strikes for any task in prior suggestions that is still open
    prior = state.get("current_suggestions", {})
    for code, suggestion in prior.items():
        task_id = suggestion.get("task_id")
        if task_id:
            state["strike_counts"][task_id] = state["strike_counts"].get(task_id, 0) + 1

    # Filter out tasks that have hit max strikes
    actionable = [
        s for s in suggestions
        if state["strike_counts"].get(s["task_id"], 0) < MAX_STRIKES
        and s["type"] != "keep"
    ]

    # Assign codes 01-99
    new_suggestions = {}
    for i, suggestion in enumerate(actionable, start=1):
        code = f"{i:02d}"
        new_suggestions[code] = suggestion

    state["current_suggestions"] = new_suggestions
    state["last_checkin"] = datetime.now().isoformat(timespec="seconds")
    save_state(state)
    return state


def resolve_suggestion(code: str) -> dict | None:
    """Look up a suggestion by its code (e.g., "01").

    Returns the suggestion dict or None if not found.
    """
    state = load_state()
    return state.get("current_suggestions", {}).get(code)


def clear_suggestion(task_id: str) -> None:
    """Remove a task from current suggestions and reset its strike count.
    Called when a task is completed, deferred, or delegation approved.
    """
    state = load_state()
    # Remove from current suggestions
    state["current_suggestions"] = {
        code: s for code, s in state.get("current_suggestions", {}).items()
        if s.get("task_id") != task_id
    }
    # Reset strikes
    state["strike_counts"].pop(task_id, None)
    save_state(state)


def get_strike_count(task_id: str) -> int:
    """Return the number of times a suggestion for this task has been ignored."""
    state = load_state()
    return state.get("strike_counts", {}).get(task_id, 0)


def mark_precall_nudge_sent(event_id: str) -> None:
    """Record that a pre-call nudge was sent for this calendar event."""
    state = load_state()
    nudges = state.get("pre_call_nudges_sent", [])
    if event_id not in nudges:
        nudges.append(event_id)
    # Keep only last 20 to avoid unbounded growth
    state["pre_call_nudges_sent"] = nudges[-20:]
    save_state(state)


def was_precall_nudge_sent(event_id: str) -> bool:
    """Return True if a pre-call nudge was already sent for this event."""
    state = load_state()
    return event_id in state.get("pre_call_nudges_sent", [])
