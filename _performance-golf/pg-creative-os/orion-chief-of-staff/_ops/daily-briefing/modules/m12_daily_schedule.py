"""Module 12: Daily Schedule Intelligence

Fetches today's Google Calendar events, identifies focus blocks and
back-to-back sequences, computes week-ahead load, and generates
AI schedule coaching tied to the 30/60/90 scorecard.

Requires: Google Calendar OAuth (run auth/calendar_auth.py first).
"""

from collections import defaultdict
from datetime import date, timedelta
from typing import Any

from .base import BriefingModule
from .calendar_helper import (
    get_calendar_service,
    fetch_events_for_date,
    fetch_events_range,
    parse_event,
    format_time,
    format_duration,
)
from .scorecard_context import current_day, get_scorecard_prompt

# Minimum gap (minutes) to count as a focus block
FOCUS_BLOCK_MIN = 60
# Maximum gap (minutes) to flag as back-to-back
BACK_TO_BACK_MAX = 15


class DailyScheduleModule(BriefingModule):
    name = "Daily Schedule Intelligence"
    key = "m12_daily_schedule"
    setup_required = "Google Calendar OAuth. Run: python3 auth/calendar_auth.py"

    def fetch_data(self) -> Any:
        mod_config = self.config.get("modules", {}).get("m12_daily_schedule", {})
        timezone = self.config.get("report", {}).get("display_timezone",
                   self.config.get("report", {}).get("timezone", "America/New_York"))
        include_tomorrow = mod_config.get("include_tomorrow", True)
        week_ahead_days = mod_config.get("week_ahead_days", 7)

        service = get_calendar_service(self.env)

        today = date.today()
        tomorrow = today + timedelta(days=1)
        week_end = today + timedelta(days=week_ahead_days - 1)

        # Fetch today's events
        raw_today = fetch_events_for_date(service, today, timezone)
        today_events = [parse_event(e, timezone) for e in raw_today]

        # Filter out cancelled and declined
        today_events = [
            e for e in today_events
            if e["status"] != "cancelled" and e["self_response"] != "declined"
        ]

        self.logger.info(f"[{self.key}] {len(today_events)} events today (after filtering)")

        # Tomorrow's events
        tomorrow_events = []
        if include_tomorrow:
            raw_tomorrow = fetch_events_for_date(service, tomorrow, timezone)
            tomorrow_events = [parse_event(e, timezone) for e in raw_tomorrow]
            tomorrow_events = [
                e for e in tomorrow_events
                if e["status"] != "cancelled" and e["self_response"] != "declined"
            ]

        # Week-ahead load analysis (uses range fetch — single API call)
        raw_week = fetch_events_range(service, today, week_end, timezone)
        week_events = [parse_event(e, timezone) for e in raw_week]
        week_events = [
            e for e in week_events
            if e["status"] != "cancelled" and e["self_response"] != "declined"
        ]

        # Split into timed vs all-day for today
        timed_today = [e for e in today_events if not e["is_all_day"]]
        allday_today = [e for e in today_events if e["is_all_day"]]

        # Sort timed events by start time
        timed_today.sort(key=lambda e: e["start_dt"] or "")

        # Compute total meeting time today
        total_minutes = sum(e["duration_minutes"] or 0 for e in timed_today)

        # Identify focus blocks (gaps >= FOCUS_BLOCK_MIN between meetings)
        focus_blocks = self._find_focus_blocks(timed_today)

        # Identify back-to-back sequences (gaps <= BACK_TO_BACK_MAX)
        back_to_back = self._find_back_to_back(timed_today)

        # Week load: count meetings per day
        week_load = self._compute_week_load(week_events, today, week_ahead_days)

        return {
            "today": today,
            "tomorrow": tomorrow,
            "timed_today": timed_today,
            "allday_today": allday_today,
            "tomorrow_events": tomorrow_events,
            "total_minutes": total_minutes,
            "focus_blocks": focus_blocks,
            "back_to_back": back_to_back,
            "week_load": week_load,
            "timezone": timezone,
        }

    def _find_focus_blocks(self, timed_events: list) -> list:
        """Find gaps >= FOCUS_BLOCK_MIN between consecutive timed events."""
        if len(timed_events) < 2:
            return []

        blocks = []
        for i in range(len(timed_events) - 1):
            end_curr = timed_events[i]["end_dt"]
            start_next = timed_events[i + 1]["start_dt"]
            if end_curr and start_next:
                gap = int((start_next - end_curr).total_seconds() / 60)
                if gap >= FOCUS_BLOCK_MIN:
                    blocks.append({
                        "start": end_curr,
                        "end": start_next,
                        "duration_minutes": gap,
                        "after": timed_events[i]["summary"],
                        "before": timed_events[i + 1]["summary"],
                    })
        return blocks

    def _find_back_to_back(self, timed_events: list) -> list:
        """Find sequences of events with gaps <= BACK_TO_BACK_MAX."""
        if len(timed_events) < 2:
            return []

        sequences = []
        current_seq = [timed_events[0]]

        for i in range(1, len(timed_events)):
            end_prev = timed_events[i - 1]["end_dt"]
            start_curr = timed_events[i]["start_dt"]
            if end_prev and start_curr:
                gap = int((start_curr - end_prev).total_seconds() / 60)
                if gap <= BACK_TO_BACK_MAX:
                    current_seq.append(timed_events[i])
                else:
                    if len(current_seq) >= 2:
                        sequences.append(current_seq)
                    current_seq = [timed_events[i]]
            else:
                if len(current_seq) >= 2:
                    sequences.append(current_seq)
                current_seq = [timed_events[i]]

        if len(current_seq) >= 2:
            sequences.append(current_seq)

        return sequences

    def _compute_week_load(self, week_events: list, start_date: date,
                           num_days: int) -> list:
        """Count timed meetings per day for the week ahead."""
        counts = defaultdict(int)
        minutes = defaultdict(int)

        for e in week_events:
            if e["is_all_day"]:
                continue
            if e["start_dt"]:
                day_key = e["start_dt"].date()
                counts[day_key] += 1
                minutes[day_key] += e["duration_minutes"] or 0

        load = []
        for i in range(num_days):
            d = start_date + timedelta(days=i)
            load.append({
                "date": d,
                "day_name": d.strftime("%a"),
                "meeting_count": counts.get(d, 0),
                "meeting_minutes": minutes.get(d, 0),
            })
        return load

    def analyze(self, data: Any) -> str:
        timed = data["timed_today"]
        allday = data["allday_today"]
        tomorrow_events = data["tomorrow_events"]
        total_minutes = data["total_minutes"]
        focus_blocks = data["focus_blocks"]
        back_to_back = data["back_to_back"]
        week_load = data["week_load"]
        timezone = data["timezone"]

        timed_tomorrow = [e for e in tomorrow_events if not e["is_all_day"]]
        allday_tomorrow = [e for e in tomorrow_events if e["is_all_day"]]
        total_events_today = len(timed) + len(allday)
        total_tomorrow = len(timed_tomorrow) + len(allday_tomorrow)
        week_total = sum(d["meeting_count"] for d in week_load)

        # Empty calendar fast path
        if total_events_today == 0:
            result = "No events today. Clear day for deep work.\n"
            if total_tomorrow > 0:
                result += f"\n**Tomorrow**: {total_tomorrow} event(s)\n"
                for e in (allday_tomorrow + sorted(timed_tomorrow, key=lambda x: x["start_dt"] or "")):
                    if e["is_all_day"]:
                        result += f"- All day: {e['summary']}\n"
                    else:
                        result += f"- {format_time(e['start_dt'])} — {e['summary']} ({format_duration(e['duration_minutes'])})\n"
            return result

        # Summary line
        hours = total_minutes // 60
        mins = total_minutes % 60
        time_str = f"{hours}h {mins}m" if mins else f"{hours}h"
        parts = [f"**{len(timed)} meeting(s) today** ({time_str} in meetings)"]
        parts.append(f"{total_tomorrow} tomorrow")
        parts.append(f"{week_total} this week")
        result = " | ".join(parts) + "\n\n"

        # All-day events
        if allday:
            result += "**All-Day**\n"
            for e in allday:
                result += f"- {e['summary']}\n"
            result += "\n"

        # Events table
        result += "| Time | Event | Duration | Attendees |\n"
        result += "|------|-------|----------|-----------|\n"
        for e in timed:
            time_str_col = format_time(e["start_dt"])
            dur_str = format_duration(e["duration_minutes"])
            att_names = [a["name"] for a in e["attendees"][:4]]
            att_str = ", ".join(att_names)
            if len(e["attendees"]) > 4:
                att_str += f" +{len(e['attendees']) - 4}"
            if not att_str:
                att_str = "Solo"
            result += f"| {time_str_col} | {e['summary']} | {dur_str} | {att_str} |\n"
        result += "\n"

        # Focus blocks
        if focus_blocks:
            result += "**Focus Blocks**\n"
            for fb in focus_blocks:
                result += (
                    f"- {format_time(fb['start'])}–{format_time(fb['end'])} "
                    f"({format_duration(fb['duration_minutes'])}) — "
                    f"between _{fb['after']}_ and _{fb['before']}_\n"
                )
            result += "\n"

        # Back-to-back warnings
        if back_to_back:
            result += "**Back-to-Back Warning**\n"
            for seq in back_to_back:
                names = [e["summary"] for e in seq]
                first_start = format_time(seq[0]["start_dt"])
                last_end = format_time(seq[-1]["end_dt"])
                result += f"- {first_start}–{last_end}: {' -> '.join(names)} ({len(seq)} consecutive)\n"
            result += "\n"

        # Week-ahead load
        result += "**Week Ahead**\n"
        for day in week_load:
            count = day["meeting_count"]
            mins_total = day["meeting_minutes"]
            if count == 0:
                label = "clear"
            elif count <= 2:
                label = "light"
            elif count <= 5:
                label = "moderate"
            else:
                label = "heavy"

            bar = "#" * count if count else "-"
            dur = f" ({format_duration(mins_total)})" if mins_total else ""
            marker = " **<-- today**" if day["date"] == data["today"] else ""
            result += f"- {day['day_name']} {day['date'].strftime('%m/%d')}: {bar} {count} mtg{'' if count == 1 else 's'} [{label}]{dur}{marker}\n"
        result += "\n"

        # AI schedule coaching — only when >= 2 timed events
        if len(timed) >= 2:
            scorecard_prompt = get_scorecard_prompt()
            day = current_day()

            events_summary = "\n".join(
                f"- {format_time(e['start_dt'])}–{format_time(e['end_dt'])}: "
                f"{e['summary']} ({format_duration(e['duration_minutes'])}, "
                f"{e['attendee_count']} attendees)"
                for e in timed
            )
            focus_summary = "\n".join(
                f"- {format_time(fb['start'])}–{format_time(fb['end'])} "
                f"({format_duration(fb['duration_minutes'])})"
                for fb in focus_blocks
            ) if focus_blocks else "None — fully booked"

            coaching = self.call_anthropic(
                system_prompt=(
                    "You are Orion, Christopher Ogle's Chief of Staff. Generate 3-5 "
                    "tactical schedule coaching bullets for today.\n\n"
                    f"{scorecard_prompt}\n\n"
                    "Rules:\n"
                    "- Each bullet must be specific and actionable (not generic time management advice)\n"
                    "- Tag bullets with which scorecard metric they advance (e.g., [Hiring], [RS1], [Delegation])\n"
                    "- If there are back-to-back meetings, suggest what to prep during the transition\n"
                    "- If there are focus blocks, suggest the highest-leverage scorecard task for each\n"
                    "- If meeting load is heavy (>4 meetings), flag delegation opportunities\n"
                    "- Keep each bullet to 1-2 sentences max\n"
                ),
                user_content=(
                    f"Day {day} of 90. Today's schedule:\n\n"
                    f"Events:\n{events_summary}\n\n"
                    f"Focus blocks:\n{focus_summary}\n\n"
                    f"Total meeting time: {format_duration(total_minutes)}\n"
                    f"Back-to-back sequences: {len(back_to_back)}"
                ),
                max_tokens=400,
            )

            if coaching:
                result += f"**Schedule Coaching**\n{coaching}\n"

        return result
