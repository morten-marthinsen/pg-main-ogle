#!/usr/bin/env python3
"""Triage Decision Writer

Non-interactive CLI for persisting triage decisions from Claude Code sessions.
Writes to .kb-approvals.json, .kb-completed-registry.json, .kb-schedule.json,
and .kb-triage-history.json atomically.

Usage:
    # Reject items
    python3 triage_writer.py reject ai-abc ai-def --session S113

    # Complete items
    python3 triage_writer.py complete ai-abc ai-def --session S113

    # Schedule an item
    python3 triage_writer.py schedule ai-abc --date 2026-03-23 --priority B --session S113

    # Batch mode (preferred — single call for all decisions)
    python3 triage_writer.py batch --session S113 <<'EOF'
    {"reject": ["ai-xxx"], "complete": ["ai-yyy"], "schedule": [{"id": "ai-zzz", "date": "2026-03-23", "priority": "B"}]}
    EOF

    # Add a new manual item to KB
    python3 triage_writer.py add-task "Implement Faraz feedback on Figmas" --date 2026-03-20 --priority A --session S113
"""

import argparse
import json
import os
import shutil
import sys
import tempfile
from datetime import date
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
KB_PATH = SCRIPT_DIR / ".transcript-kb.json"
MANUAL_ITEMS_PATH = SCRIPT_DIR / ".kb-manual-items.json"
APPROVALS_PATH = SCRIPT_DIR / ".kb-approvals.json"
SCHEDULE_PATH = SCRIPT_DIR / ".kb-schedule.json"
REGISTRY_PATH = SCRIPT_DIR / ".kb-completed-registry.json"
PRIORITIES_PATH = SCRIPT_DIR / ".kb-priorities.json"
TRIAGE_HISTORY_PATH = SCRIPT_DIR / ".kb-triage-history.json"


def load_json(path: Path) -> dict:
    if path.exists():
        try:
            with open(path, encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            pass
    return {}


def atomic_write(path: Path, data: dict) -> None:
    """Write JSON atomically: backup + temp file + os.replace."""
    backup_path = path.with_suffix(".bak.json")
    if path.exists():
        try:
            shutil.copy2(str(path), str(backup_path))
        except OSError:
            pass

    fd, tmp_path = tempfile.mkstemp(
        dir=str(SCRIPT_DIR), suffix=".tmp", prefix=f".{path.stem}-"
    )
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        os.replace(tmp_path, str(path))
    except Exception:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass
        raise


def lookup_item_text(item_id: str) -> str:
    """Look up item text from transcript KB or manual items."""
    for path in [KB_PATH, MANUAL_ITEMS_PATH]:
        data = load_json(path)
        for ai in data.get("action_items", []):
            if ai.get("id") == item_id:
                return ai.get("text", "")
    return ""


def apply_rejections(item_ids: list, session: str) -> int:
    """Write rejection entries to .kb-approvals.json."""
    approvals = load_json(APPROVALS_PATH)
    if "approvals" not in approvals:
        approvals = {
            "version": "1.0",
            "description": "Christopher's approval decisions for pending review items.",
            "last_updated": "",
            "approvals": {},
        }

    count = 0
    for item_id in item_ids:
        approvals["approvals"][item_id] = "rejected"
        count += 1

    approvals["last_updated"] = f"{date.today().isoformat()}-{session}"
    atomic_write(APPROVALS_PATH, approvals)
    return count


def apply_completions(item_ids: list, session: str) -> int:
    """Write completed entries to .kb-completed-registry.json and .kb-approvals.json."""
    # Add to completed registry
    registry = load_json(REGISTRY_PATH)
    if "entries" not in registry:
        registry = {"version": 1, "entries": [], "last_updated": ""}

    existing_ids = {e.get("id") for e in registry.get("entries", [])}

    count = 0
    for item_id in item_ids:
        if item_id in existing_ids:
            continue  # idempotent
        text = lookup_item_text(item_id)
        registry["entries"].append({
            "id": item_id,
            "text": text,
            "completed_date": date.today().isoformat(),
            "source": f"triage-{session}",
        })
        count += 1

    registry["last_updated"] = date.today().isoformat()
    atomic_write(REGISTRY_PATH, registry)

    # Also mark as rejected in approvals so they don't show in pending
    approvals = load_json(APPROVALS_PATH)
    if "approvals" not in approvals:
        approvals = {
            "version": "1.0",
            "description": "Christopher's approval decisions for pending review items.",
            "last_updated": "",
            "approvals": {},
        }
    for item_id in item_ids:
        approvals["approvals"][item_id] = "rejected"
    approvals["last_updated"] = f"{date.today().isoformat()}-{session}"
    atomic_write(APPROVALS_PATH, approvals)

    return count


def apply_schedules(items: list, session: str) -> int:
    """Write scheduled entries to .kb-approvals.json + .kb-schedule.json."""
    approvals = load_json(APPROVALS_PATH)
    if "approvals" not in approvals:
        approvals = {
            "version": "1.0",
            "description": "Christopher's approval decisions for pending review items.",
            "last_updated": "",
            "approvals": {},
        }

    schedule = load_json(SCHEDULE_PATH)
    if "schedule" not in schedule:
        schedule = {
            "version": "1.0",
            "description": "Scheduled work days for action items.",
            "last_updated": "",
            "schedule": {},
        }

    priorities = load_json(PRIORITIES_PATH)
    if "priorities" not in priorities:
        priorities["priorities"] = {}

    count = 0
    for item in items:
        item_id = item["id"]
        sched_date = item["date"]
        priority = item.get("priority", "B")

        # Write to approvals
        approvals["approvals"][item_id] = {
            "status": "open",
            "scheduled_date": sched_date,
            "_priority_override": priority,
        }

        # Write to schedule
        schedule["schedule"][item_id] = sched_date

        # Write to priorities (bot reads from "priorities" key as simple strings)
        priorities["priorities"][item_id] = priority

        count += 1

    approvals["last_updated"] = f"{date.today().isoformat()}-{session}"
    schedule["last_updated"] = date.today().isoformat()
    atomic_write(APPROVALS_PATH, approvals)
    atomic_write(SCHEDULE_PATH, schedule)
    atomic_write(PRIORITIES_PATH, priorities)

    return count


def add_manual_task(text: str, sched_date: str, priority: str, session: str) -> str:
    """Add a new manual task to .kb-manual-items.json and schedule it."""
    manual = load_json(MANUAL_ITEMS_PATH)
    if "action_items" not in manual:
        manual = {"action_items": []}

    # Generate next mi-NNN ID
    existing_ids = [ai.get("id", "") for ai in manual.get("action_items", [])]
    max_num = 0
    for eid in existing_ids:
        if eid.startswith("mi-"):
            try:
                max_num = max(max_num, int(eid.split("-")[1]))
            except (ValueError, IndexError):
                pass
    new_id = f"mi-{max_num + 1:03d}"

    manual["action_items"].append({
        "id": new_id,
        "text": text,
        "status": "open",
        "category": "DO",
        "created_date": date.today().isoformat(),
        "source": f"session-{session}-confirmed",
    })
    atomic_write(MANUAL_ITEMS_PATH, manual)

    # Schedule it
    schedule = load_json(SCHEDULE_PATH)
    if "schedule" not in schedule:
        schedule = {"version": "1.0", "description": "Scheduled work days.", "last_updated": "", "schedule": {}}
    schedule["schedule"][new_id] = sched_date
    schedule["last_updated"] = date.today().isoformat()
    atomic_write(SCHEDULE_PATH, schedule)

    # Set priority (bot reads from "priorities" key as simple strings)
    priorities = load_json(PRIORITIES_PATH)
    if "priorities" not in priorities:
        priorities["priorities"] = {}
    priorities["priorities"][new_id] = priority
    atomic_write(PRIORITIES_PATH, priorities)

    return new_id


def record_triage_history(decisions: dict, session: str) -> None:
    """Append decisions to .kb-triage-history.json for pattern learning."""
    history = load_json(TRIAGE_HISTORY_PATH)
    if "decisions" not in history:
        history = {"version": "1.0", "decisions": []}

    timestamp = date.today().isoformat()

    for item_id in decisions.get("reject", []):
        history["decisions"].append({
            "item_id": item_id,
            "decision": "rejected",
            "session": session,
            "date": timestamp,
            "text": lookup_item_text(item_id)[:120],
        })

    for item_id in decisions.get("complete", []):
        history["decisions"].append({
            "item_id": item_id,
            "decision": "completed",
            "session": session,
            "date": timestamp,
            "text": lookup_item_text(item_id)[:120],
        })

    for item in decisions.get("schedule", []):
        history["decisions"].append({
            "item_id": item["id"],
            "decision": "scheduled",
            "session": session,
            "date": timestamp,
            "scheduled_to": item["date"],
            "priority": item.get("priority", "B"),
            "text": lookup_item_text(item["id"])[:120],
        })

    atomic_write(TRIAGE_HISTORY_PATH, history)


def cmd_reject(args):
    count = apply_rejections(args.ids, args.session)
    record_triage_history({"reject": args.ids}, args.session)
    print(f"Persisted: {count} rejected")


def cmd_complete(args):
    count = apply_completions(args.ids, args.session)
    record_triage_history({"complete": args.ids}, args.session)
    print(f"Persisted: {count} completed")


def cmd_schedule(args):
    items = [{"id": args.id, "date": args.date, "priority": args.priority}]
    count = apply_schedules(items, args.session)
    record_triage_history({"schedule": items}, args.session)
    print(f"Persisted: {count} scheduled → {args.date} as {args.priority}")


def cmd_batch(args):
    data = json.load(sys.stdin)

    reject_ids = data.get("reject", [])
    complete_ids = data.get("complete", [])
    schedule_items = data.get("schedule", [])
    add_tasks = data.get("add_tasks", [])

    session = args.session
    r_count = apply_rejections(reject_ids, session) if reject_ids else 0
    c_count = apply_completions(complete_ids, session) if complete_ids else 0
    s_count = apply_schedules(schedule_items, session) if schedule_items else 0

    new_ids = []
    for task in add_tasks:
        new_id = add_manual_task(
            text=task["text"],
            sched_date=task["date"],
            priority=task.get("priority", "B"),
            session=session,
        )
        new_ids.append(new_id)

    record_triage_history(data, session)

    parts = []
    if r_count:
        parts.append(f"{r_count} rejected")
    if c_count:
        parts.append(f"{c_count} completed")
    if s_count:
        parts.append(f"{s_count} scheduled")
    if new_ids:
        parts.append(f"{len(new_ids)} new tasks ({', '.join(new_ids)})")

    print(f"Persisted: {', '.join(parts) if parts else 'no changes'}")


def sync_today_priorities(priority_map: dict, session: str) -> tuple:
    """Sync all of today's priorities and clean up completed/rejected items from schedule.

    Args:
        priority_map: dict mapping item_id -> priority letter ("A"/"B"/"C")
                      for ALL items on today's final Action Items Tracker
        session: session ID for audit trail

    Returns:
        (synced_count, cleaned_count)
    """
    today_iso = date.today().isoformat()

    # 1. Write all priority overrides
    priorities = load_json(PRIORITIES_PATH)
    if "priorities" not in priorities:
        priorities["priorities"] = {}
    for item_id, prio in priority_map.items():
        priorities["priorities"][item_id] = prio
    atomic_write(PRIORITIES_PATH, priorities)

    # 2. Clean up completed/rejected items from today's schedule
    schedule = load_json(SCHEDULE_PATH)
    sched = schedule.get("schedule", {})
    registry = load_json(REGISTRY_PATH)
    completed_ids = {e.get("id") for e in registry.get("entries", [])}
    approvals = load_json(APPROVALS_PATH)
    rejected_ids = {k for k, v in approvals.get("approvals", {}).items() if v == "rejected"}
    done_ids = completed_ids | rejected_ids

    cleaned = []
    for item_id in list(sched.keys()):
        if sched[item_id] == today_iso and item_id in done_ids and item_id not in priority_map:
            del sched[item_id]
            cleaned.append(item_id)

    if cleaned:
        schedule["last_updated"] = today_iso
        atomic_write(SCHEDULE_PATH, schedule)

    return len(priority_map), len(cleaned)


def cmd_sync_today(args):
    data = json.load(sys.stdin)
    priority_map = data  # expects {"item_id": "B", ...}
    synced, cleaned = sync_today_priorities(priority_map, args.session)
    print(f"Synced: {synced} priorities written, {cleaned} completed items cleaned from schedule")


def cmd_add_task(args):
    new_id = add_manual_task(args.text, args.date, args.priority, args.session)
    print(f"Created: {new_id} — '{args.text}' → {args.date} as {args.priority}")


def main():
    parser = argparse.ArgumentParser(description="Triage Decision Writer")
    sub = parser.add_subparsers(dest="command", required=True)

    # reject
    p_reject = sub.add_parser("reject", help="Mark items as rejected")
    p_reject.add_argument("ids", nargs="+", help="Item IDs to reject")
    p_reject.add_argument("--session", required=True, help="Session ID (e.g., S113)")
    p_reject.set_defaults(func=cmd_reject)

    # complete
    p_complete = sub.add_parser("complete", help="Mark items as completed")
    p_complete.add_argument("ids", nargs="+", help="Item IDs to complete")
    p_complete.add_argument("--session", required=True, help="Session ID")
    p_complete.set_defaults(func=cmd_complete)

    # schedule
    p_sched = sub.add_parser("schedule", help="Schedule an item")
    p_sched.add_argument("id", help="Item ID to schedule")
    p_sched.add_argument("--date", required=True, help="Target date (YYYY-MM-DD)")
    p_sched.add_argument("--priority", default="B", help="Priority (A/B/C)")
    p_sched.add_argument("--session", required=True, help="Session ID")
    p_sched.set_defaults(func=cmd_schedule)

    # batch
    p_batch = sub.add_parser("batch", help="Batch mode — reads JSON from stdin")
    p_batch.add_argument("--session", required=True, help="Session ID")
    p_batch.set_defaults(func=cmd_batch)

    # sync-today
    p_sync = sub.add_parser("sync-today", help="Sync today's priorities from final Action Items Tracker")
    p_sync.add_argument("--session", required=True, help="Session ID")
    p_sync.set_defaults(func=cmd_sync_today)

    # add-task
    p_add = sub.add_parser("add-task", help="Add a new manual task")
    p_add.add_argument("text", help="Task description")
    p_add.add_argument("--date", required=True, help="Scheduled date (YYYY-MM-DD)")
    p_add.add_argument("--priority", default="B", help="Priority (A/B/C)")
    p_add.add_argument("--session", required=True, help="Session ID")
    p_add.set_defaults(func=cmd_add_task)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
