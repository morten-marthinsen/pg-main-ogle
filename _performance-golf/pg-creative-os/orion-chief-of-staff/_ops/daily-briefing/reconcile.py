#!/usr/bin/env python3
"""End-of-Day Reconciliation Tool

Interactive CLI for quickly marking today's tasks as done, rescheduling
incomplete tasks to tomorrow, or skipping. Saves results to KB + completed
registry. Designed to take ~2 minutes.

Usage:
    python3 reconcile.py          # Reconcile today's tasks
    python3 reconcile.py --date 2026-03-10  # Reconcile a specific day

Commands during reconciliation:
    d <#>           Mark task # as done (moves to completed registry)
    r <#> <day>     Reschedule task # (day = tomorrow, monday, tue, YYYY-MM-DD)
    s <#>           Skip (leave as-is)
    a               Mark all remaining as done
    q               Quit (saves changes made so far)
"""

import argparse
import json
import sys
from datetime import date, timedelta
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
KB_PATH = SCRIPT_DIR / ".transcript-kb.json"
MANUAL_ITEMS_PATH = SCRIPT_DIR / ".kb-manual-items.json"
SCHEDULE_PATH = SCRIPT_DIR / ".kb-schedule.json"
REGISTRY_PATH = SCRIPT_DIR / ".kb-completed-registry.json"
PRIORITIES_PATH = SCRIPT_DIR / ".kb-priorities.json"

DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
WEEKDAY_NAMES = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]


def load_json(path: Path) -> dict:
    if path.exists():
        try:
            with open(path, encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            pass
    return {}


def save_json(path: Path, data: dict) -> None:
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def parse_day(day_str: str, today: date) -> date:
    """Parse a day reference into a date."""
    day_lower = day_str.lower().strip()

    if day_lower == "tomorrow":
        d = today + timedelta(days=1)
        # Skip weekends
        while d.weekday() >= 5:
            d += timedelta(days=1)
        return d

    if day_lower == "monday" or day_lower == "mon":
        d = today
        while d.weekday() != 0:
            d += timedelta(days=1)
        if d == today:
            d += timedelta(days=7)
        return d

    # Try weekday names
    for i, name in enumerate(WEEKDAY_NAMES):
        if day_lower == name or day_lower == name[:3]:
            d = today + timedelta(days=1)
            while d.weekday() != i:
                d += timedelta(days=1)
            return d

    # Try ISO date
    try:
        return date.fromisoformat(day_str.strip())
    except ValueError:
        raise ValueError(f"Cannot parse '{day_str}' as a date")


def get_today_items(target_date: date) -> list:
    """Get all open items scheduled for the target date."""
    schedule = load_json(SCHEDULE_PATH)

    # Load KB items
    kb = load_json(KB_PATH)
    kb_items = {i.get("id"): i for i in kb.get("action_items", []) if i.get("status") == "open"}

    # Load manual items
    manual = load_json(MANUAL_ITEMS_PATH)
    manual_items = {i.get("id"): i for i in manual.get("action_items", []) if i.get("status") == "open"}

    all_items = {**kb_items, **manual_items}
    target_iso = target_date.isoformat()

    items = []
    for item_id, sched_date in schedule.items():
        if sched_date == target_iso and item_id in all_items:
            item = all_items[item_id]
            items.append(item)
        elif sched_date < target_iso and item_id in all_items:
            # Rolled over from previous day
            item = all_items[item_id]
            item["_rolled_from"] = sched_date
            items.append(item)

    return items


def mark_done(item: dict, schedule: dict, registry: dict) -> None:
    """Mark item as done: update status, remove from schedule, add to registry."""
    item_id = item.get("id", "")

    # Update status in KB or manual items
    for path in [KB_PATH, MANUAL_ITEMS_PATH]:
        data = load_json(path)
        for ai in data.get("action_items", []):
            if ai.get("id") == item_id:
                ai["status"] = "closed"
                save_json(path, data)
                break

    # Remove from schedule
    if item_id in schedule:
        del schedule[item_id]

    # Add to completed registry
    entries = registry.get("entries", [])
    entries.append({
        "id": item_id,
        "text": item.get("text", ""),
        "completed_date": date.today().isoformat(),
        "source": "reconcile",
    })
    registry["entries"] = entries


def reschedule(item: dict, new_date: date, schedule: dict) -> None:
    """Reschedule item to a new date."""
    item_id = item.get("id", "")
    schedule[item_id] = new_date.isoformat()


def main():
    parser = argparse.ArgumentParser(description="End-of-Day Task Reconciliation")
    parser.add_argument("--date", type=str, default=None,
                        help="Date to reconcile (YYYY-MM-DD, default: today)")
    args = parser.parse_args()

    today = date.today()
    target_date = date.fromisoformat(args.date) if args.date else today

    day_name = DAY_NAMES[target_date.weekday()]
    date_str = target_date.strftime("%b %d, %Y")
    print(f"\n{'='*50}")
    print(f"  End-of-Day Reconciliation — {day_name}, {date_str}")
    print(f"{'='*50}\n")

    items = get_today_items(target_date)

    if not items:
        print("No tasks scheduled for this day. Nothing to reconcile.")
        return

    schedule = load_json(SCHEDULE_PATH)
    registry = load_json(REGISTRY_PATH)
    changes_made = 0

    print(f"  {len(items)} task(s) to reconcile:\n")

    # Display all items
    for i, item in enumerate(items, 1):
        text = item.get("text", "?")
        rolled = f" (rolled from {item.get('_rolled_from', '')})" if item.get("_rolled_from") else ""
        deadline = item.get("deadline", "")
        deadline_str = f" [due: {deadline}]" if deadline else ""
        print(f"  {i}. {text}{deadline_str}{rolled}")

    print(f"\nCommands: d <#> (done) | r <#> <day> (reschedule) | s <#> (skip) | a (all done) | q (quit)")
    print(f"Day formats: tomorrow, monday, tue, 2026-03-15\n")

    remaining = set(range(len(items)))

    while remaining:
        try:
            cmd = input(f"  [{len(remaining)} remaining] > ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n  Saving and exiting...")
            break

        if not cmd:
            continue

        parts = cmd.split(maxsplit=2)
        action = parts[0].lower()

        if action == "q":
            break

        if action == "a":
            for idx in list(remaining):
                mark_done(items[idx], schedule, registry)
                print(f"  ✓ #{idx + 1} done")
                changes_made += 1
            remaining.clear()
            continue

        if action in ("d", "r", "s"):
            if len(parts) < 2:
                print("  Need a task number. Example: d 1")
                continue
            try:
                num = int(parts[1]) - 1
            except ValueError:
                print(f"  '{parts[1]}' is not a number")
                continue
            if num < 0 or num >= len(items):
                print(f"  Task #{num + 1} doesn't exist")
                continue
            if num not in remaining:
                print(f"  Task #{num + 1} already processed")
                continue

            if action == "d":
                mark_done(items[num], schedule, registry)
                remaining.discard(num)
                changes_made += 1
                print(f"  ✓ #{num + 1} marked done")

            elif action == "r":
                if len(parts) < 3:
                    print("  Need a day. Example: r 2 tomorrow")
                    continue
                try:
                    new_date = parse_day(parts[2], today)
                    reschedule(items[num], new_date, schedule)
                    remaining.discard(num)
                    changes_made += 1
                    day_label = f"{DAY_NAMES[new_date.weekday()]} {new_date.strftime('%b %d')}"
                    print(f"  → #{num + 1} rescheduled to {day_label}")
                except ValueError as e:
                    print(f"  {e}")

            elif action == "s":
                remaining.discard(num)
                print(f"  – #{num + 1} skipped")
        else:
            print(f"  Unknown command '{action}'. Use d, r, s, a, or q.")

    # Save changes
    if changes_made > 0:
        save_json(SCHEDULE_PATH, schedule)
        save_json(REGISTRY_PATH, registry)
        print(f"\n  Saved {changes_made} change(s).")
    else:
        print("\n  No changes made.")

    skipped = len(remaining)
    if skipped:
        print(f"  {skipped} task(s) left unchanged.")

    print()


if __name__ == "__main__":
    main()
