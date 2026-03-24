#!/usr/bin/env python3
"""Calendar Agenda Item Manager

Add agenda items to Google Calendar events without notifying attendees.

Usage:
    # List events for a date
    python3 calendar_agenda.py list --date 2026-03-23

    # Add agenda item by event name (fuzzy match)
    python3 calendar_agenda.py add --event "Monday Media" --date 2026-03-23 --item "Discuss SF2 page types"

    # Add agenda item by event ID (exact)
    python3 calendar_agenda.py add --event-id "abc123" --item "Discuss SF2 page types"
"""

import argparse
import sys
from datetime import date
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
ENV_PATH = SCRIPT_DIR / ".env"

# Add parent so modules/ is importable
sys.path.insert(0, str(SCRIPT_DIR))

from modules.calendar_helper import (
    get_calendar_service,
    fetch_events_for_date,
    parse_event,
    format_time,
    format_duration,
    append_agenda_item,
    find_event_by_name,
)


def load_env() -> dict:
    env = {}
    if not ENV_PATH.exists():
        return env
    with open(ENV_PATH) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                env[key.strip()] = val.strip()
    return env


def cmd_list(args):
    env = load_env()
    service = get_calendar_service(env)
    target = date.fromisoformat(args.date) if args.date else date.today()
    tz = args.timezone

    events = fetch_events_for_date(service, target, tz)
    if not events:
        print(f"No events on {target.isoformat()}")
        return

    print(f"\nEvents on {target.isoformat()} ({tz}):\n")
    for ev in events:
        parsed = parse_event(ev, tz)
        time_str = format_time(parsed["start_dt"])
        dur = format_duration(parsed["duration_minutes"])
        desc_preview = (parsed["description"] or "")[:80]
        print(f"  {time_str:>10s}  {parsed['summary']:<50s}  ({dur})")
        print(f"             ID: {parsed['id']}")
        if desc_preview:
            print(f"             Desc: {desc_preview}...")
        print()


def cmd_add(args):
    env = load_env()
    service = get_calendar_service(env)
    tz = args.timezone

    event_id = args.event_id

    if not event_id:
        # Find by name
        if not args.event or not args.date:
            print("Error: --event and --date required when not using --event-id")
            sys.exit(1)

        target = date.fromisoformat(args.date)
        raw_event = find_event_by_name(service, args.event, target, tz)
        if not raw_event:
            print(f"No event matching '{args.event}' on {args.date}")
            # Show available events to help
            events = fetch_events_for_date(service, target, tz)
            if events:
                print("\nAvailable events:")
                for ev in events:
                    print(f"  - {ev.get('summary', '?')} (ID: {ev.get('id', '?')})")
            sys.exit(1)

        event_id = raw_event["id"]
        print(f"Matched: {raw_event.get('summary', '?')}")

    result = append_agenda_item(service, event_id, args.item)
    print(f"Added agenda item: \"{args.item}\"")
    print(f"Updated description:\n{result.get('description', '')}")


def main():
    parser = argparse.ArgumentParser(description="Calendar Agenda Item Manager")
    parser.add_argument("--timezone", default="Europe/Lisbon", help="Timezone (default: Europe/Lisbon)")
    sub = parser.add_subparsers(dest="command", required=True)

    # list
    p_list = sub.add_parser("list", help="List events for a date")
    p_list.add_argument("--date", default=None, help="Date (YYYY-MM-DD, default: today)")
    p_list.set_defaults(func=cmd_list)

    # add
    p_add = sub.add_parser("add", help="Add agenda item to event")
    p_add.add_argument("--event", default=None, help="Event name (fuzzy match)")
    p_add.add_argument("--event-id", default=None, help="Event ID (exact)")
    p_add.add_argument("--date", default=None, help="Date to search (YYYY-MM-DD)")
    p_add.add_argument("--item", required=True, help="Agenda item text")
    p_add.set_defaults(func=cmd_add)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
