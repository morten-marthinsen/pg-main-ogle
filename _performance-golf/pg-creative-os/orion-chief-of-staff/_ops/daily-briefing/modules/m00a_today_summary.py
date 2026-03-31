"""Module 00a: Today at a Glance — Executive Summary

Non-AI module. Synthesizes the entire briefing into a compact top-of-report
executive summary. Reads shared_state populated by Phase 1.5, M0, M0b, and M12.

Runs LAST in module execution order (needs all other modules' data in shared_state)
but is rendered FIRST in report output.

Includes:
- Day count + phase + checkpoint countdown
- Capacity warning (overloaded/tight days)
- A-tasks mapped to Focus Block time slots (Phase 2: work block allocation)
- B-tasks for Afternoon Block
- Today's meetings
- Launch countdowns (Phase 4)
- What Changed delta (Phase 6)
- PRD alignment tags on tasks (Phase 7)
- Alerts (Slack DMs, auto-approved items, rollover warnings)
"""

import json
from collections import defaultdict
from datetime import date, datetime, time, timedelta
from pathlib import Path
from typing import Any, Optional

from .base import BriefingModule, MODULES_DIR
from .scorecard_context import current_day, days_until, DAY_30_DATE, DAY_60_DATE, DAY_90_DATE
from .capacity_engine import (
    DayCapacity, WorkBlock, load_work_blocks, load_preferences,
    PriorityScorer, classify_day_items, format_capacity_header,
    DAY_NAMES, WEEKDAY_NAMES, WORK_WEEKDAYS,
)
from .transcript_kb import load_schedule
from .calendar_helper import format_time

DAILY_BRIEFING_DIR = MODULES_DIR.parent
KB_PATH = DAILY_BRIEFING_DIR / ".transcript-kb.json"
MANUAL_ITEMS_PATH = DAILY_BRIEFING_DIR / ".kb-manual-items.json"
PRIORITIES_PATH = DAILY_BRIEFING_DIR / ".kb-priorities.json"
SNAPSHOT_PATH = DAILY_BRIEFING_DIR / ".kb-daily-snapshot.json"


# ── Time Slot Allocation (Phase 2) ──────────────────────────────────────────


def _time_str(t: time) -> str:
    """Format time as '8:30am'."""
    hour = t.hour
    minute = t.minute
    ampm = "am" if hour < 12 else "pm"
    if hour > 12:
        hour -= 12
    elif hour == 0:
        hour = 12
    if minute:
        return f"{hour}:{minute:02d}{ampm}"
    return f"{hour}{ampm}"


def _estimate_duration(item: dict, default_minutes: int) -> int:
    """Estimate task duration in minutes.

    Uses explicit duration_min if set, otherwise uses tier-based defaults:
    A=60, B=30, C=15.
    """
    explicit = item.get("duration_min")
    if explicit and isinstance(explicit, (int, float)) and explicit > 0:
        return int(explicit)
    return default_minutes


def allocate_work_blocks(
    a_items: list,
    b_items: list,
    calendar_events: list,
    work_blocks: list,
) -> dict:
    """Allocate tasks to specific time slots within work blocks.

    Returns:
        {
            "focus_slots": [{"item": dict, "start": time, "end": time, "minutes": int}, ...],
            "afternoon_slots": [{"item": dict, "start": time, "end": time, "minutes": int}, ...],
            "overflow": [items that didn't fit],
        }
    """
    # Find focus and afternoon blocks
    focus_block = None
    afternoon_block = None
    for block in work_blocks:
        if "A" in block.task_types:
            focus_block = block
        elif "B" in block.task_types:
            afternoon_block = block

    focus_slots = []
    afternoon_slots = []
    overflow = []

    if focus_block:
        focus_slots = _fit_tasks_in_block(
            a_items, focus_block, calendar_events, default_minutes=60
        )
        # Items that didn't fit become overflow
        fitted_ids = {s["item"].get("id") for s in focus_slots}
        overflow.extend(i for i in a_items if i.get("id") not in fitted_ids)

    if afternoon_block:
        afternoon_slots = _fit_tasks_in_block(
            b_items, afternoon_block, calendar_events, default_minutes=30
        )

    return {
        "focus_slots": focus_slots,
        "afternoon_slots": afternoon_slots,
        "overflow": overflow,
    }


def _fit_tasks_in_block(
    items: list,
    block: WorkBlock,
    calendar_events: list,
    default_minutes: int,
) -> list:
    """Fit tasks into available gaps in a work block (between meetings).

    Returns list of {"item": dict, "start": time, "end": time, "minutes": int}.
    """
    # Build list of busy periods (meetings) within this block
    block_start = datetime.combine(date.today(), block.start)
    block_end = datetime.combine(date.today(), block.end)

    busy = []
    for ev in calendar_events:
        ev_start = ev.get("start_dt")
        ev_end = ev.get("end_dt")
        if not ev_start or not ev_end:
            continue
        # Clip to block boundaries
        overlap_start = max(block_start, ev_start)
        overlap_end = min(block_end, ev_end)
        if overlap_start < overlap_end:
            busy.append((overlap_start, overlap_end))

    # Sort busy periods
    busy.sort(key=lambda x: x[0])

    # Find free gaps
    gaps = []
    cursor = block_start
    for busy_start, busy_end in busy:
        if cursor < busy_start:
            gaps.append((cursor, busy_start))
        cursor = max(cursor, busy_end)
    if cursor < block_end:
        gaps.append((cursor, block_end))

    # Fit tasks into gaps
    slots = []
    gap_idx = 0
    gap_cursor = gaps[0][0] if gaps else block_end

    for item in items:
        duration = _estimate_duration(item, default_minutes)

        # Find a gap that fits
        while gap_idx < len(gaps):
            gap_start, gap_end = gaps[gap_idx]
            available = max(gap_start, gap_cursor)
            remaining = int((gap_end - available).total_seconds() / 60)

            if remaining >= duration:
                slot_start = available
                slot_end = slot_start + timedelta(minutes=duration)
                slots.append({
                    "item": item,
                    "start": slot_start.time(),
                    "end": slot_end.time(),
                    "minutes": duration,
                })
                gap_cursor = slot_end
                break
            else:
                # Move to next gap
                gap_idx += 1
                if gap_idx < len(gaps):
                    gap_cursor = gaps[gap_idx][0]
        else:
            # No more gaps — task doesn't fit
            break

    return slots


# ── Day Viability Check (Phase 3) ───────────────────────────────────────────


def check_day_viability(
    day_cap: DayCapacity,
    a_items: list,
    b_items: list,
    launches: list = None,
    rollover_count: int = 0,
) -> list:
    """Check if the day is viable. Returns list of alert strings.

    Alert levels:
    - 🔴 OVERLOADED: A-task time > focus time
    - 🟡 TIGHT: <30 min buffer
    - 🟡 ROLLOVER: items rolled from yesterday
    - 🔴 LAUNCH CRUNCH: launch in <3 days with open prerequisites
    """
    alerts = []

    # Estimate total A-task time
    total_a_minutes = sum(_estimate_duration(i, 60) for i in a_items)
    total_b_minutes = sum(_estimate_duration(i, 30) for i in b_items)

    # Check focus block capacity
    if total_a_minutes > day_cap.focus_minutes:
        deficit = total_a_minutes - day_cap.focus_minutes
        alerts.append(
            f"🔴 **OVERLOADED** — A-tasks need {total_a_minutes}m but only "
            f"{day_cap.focus_minutes}m focus time available ({deficit}m deficit). "
            f"Consider deferring 1 A-task."
        )
    elif day_cap.focus_minutes - total_a_minutes < 30 and total_a_minutes > 0:
        buffer = day_cap.focus_minutes - total_a_minutes
        alerts.append(
            f"🟡 **TIGHT** — Only {buffer}m buffer in focus block after A-tasks."
        )

    # Check afternoon capacity
    if total_b_minutes > day_cap.afternoon_minutes and day_cap.afternoon_minutes > 0:
        alerts.append(
            f"🟡 **AFTERNOON FULL** — B-tasks need {total_b_minutes}m but only "
            f"{day_cap.afternoon_minutes}m available."
        )

    # High meeting load warning
    if day_cap.meeting_minutes >= 300:  # 5+ hours
        mh, mm = divmod(day_cap.meeting_minutes, 60)
        fh, fm = divmod(day_cap.focus_minutes, 60)
        meeting_str = f"{mh}h {mm}m" if mm else f"{mh}h"
        focus_str = f"{fh}h {fm}m" if fm else f"{fh}h"
        alerts.append(
            f"🔴 **CAPACITY WARNING** — {meeting_str} meetings today, "
            f"only {focus_str} focus time available."
        )

    # Rollover warning
    if rollover_count >= 3:
        alerts.append(
            f"🟡 **ROLLOVER** — {rollover_count} items rolled from previous days. "
            f"Review whether workload is sustainable."
        )

    # Launch crunch
    if launches:
        today = date.today()
        for launch in launches:
            due_ms = launch.get("due_date")
            if not due_ms:
                continue
            try:
                launch_date = date.fromtimestamp(int(due_ms) / 1000)
                days_out = (launch_date - today).days
                if 0 < days_out <= 3:
                    name = launch.get("name", "Unknown launch")
                    alerts.append(
                        f"🔴 **LAUNCH CRUNCH** — {name}: {days_out} day{'s' if days_out != 1 else ''} out"
                    )
            except (ValueError, TypeError, OSError):
                continue

    return alerts


# ── Launch Countdown (Phase 4) ──────────────────────────────────────────────


def format_launch_countdown(launches: list) -> list:
    """Format launch countdown lines.

    Returns list of markdown lines showing each launch with days remaining.
    """
    if not launches:
        return []

    today = date.today()
    countdowns = []

    for launch in launches:
        due_ms = launch.get("due_date")
        name = launch.get("name", "Unknown")
        status = launch.get("status", "")

        if not due_ms:
            countdowns.append((999, f"- **{name}** — no due date | Status: {status}"))
            continue

        try:
            launch_date = date.fromtimestamp(int(due_ms) / 1000)
            days_out = (launch_date - today).days
            date_str = launch_date.strftime("%b %d")

            if days_out < 0:
                countdowns.append((days_out, f"- **{name}** — OVERDUE by {abs(days_out)}d | Status: {status}"))
            elif days_out == 0:
                countdowns.append((0, f"- **{name}** — **TODAY** | Status: {status}"))
            else:
                countdowns.append((days_out, f"- **{name}** — {days_out}d ({date_str}) | Status: {status}"))
        except (ValueError, TypeError, OSError):
            countdowns.append((999, f"- **{name}** — date error | Status: {status}"))

    # Sort by days out (most urgent first)
    countdowns.sort(key=lambda x: x[0])
    return [line for _, line in countdowns]


# ── What Changed Delta (Phase 6) ────────────────────────────────────────────


def load_previous_snapshot() -> dict:
    """Load previous day's snapshot for delta comparison."""
    if not SNAPSHOT_PATH.exists():
        return {}
    try:
        with open(SNAPSHOT_PATH, encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError):
        return {}


def save_snapshot(items: list, schedule: dict) -> None:
    """Save today's snapshot for tomorrow's delta comparison."""
    snapshot = {
        "date": date.today().isoformat(),
        "items": {},
        "schedule": {},
    }
    for item in items:
        item_id = item.get("id", "")
        if item_id:
            snapshot["items"][item_id] = {
                "text": item.get("text", "")[:80],
                "status": item.get("status", ""),
            }
    for item_id, sched_date in schedule.items():
        snapshot["schedule"][item_id] = sched_date

    try:
        with open(SNAPSHOT_PATH, "w", encoding="utf-8") as f:
            json.dump(snapshot, f, indent=2, ensure_ascii=False)
    except IOError:
        pass


def compute_delta(current_items: list, current_schedule: dict, prev_snapshot: dict) -> list:
    """Compute what changed since the previous snapshot.

    Returns list of markdown delta lines.
    """
    if not prev_snapshot:
        return []

    prev_items = prev_snapshot.get("items", {})
    prev_schedule = prev_snapshot.get("schedule", {})

    current_ids = {i.get("id", "") for i in current_items if i.get("id")}
    prev_ids = set(prev_items.keys())

    deltas = []

    # New items
    new_ids = current_ids - prev_ids
    if new_ids:
        deltas.append(f"- **+{len(new_ids)} new item{'s' if len(new_ids) != 1 else ''}** added")

    # Completed/removed items
    removed_ids = prev_ids - current_ids
    if removed_ids:
        removed_texts = [prev_items[rid].get("text", "?")[:40] for rid in list(removed_ids)[:3]]
        suffix = f" (+{len(removed_ids) - 3} more)" if len(removed_ids) > 3 else ""
        deltas.append(
            f"- **-{len(removed_ids)} item{'s' if len(removed_ids) != 1 else ''} completed/closed** "
            f"({', '.join(removed_texts)}{suffix})"
        )

    # Rescheduled items
    rescheduled = 0
    for item_id in current_ids & prev_ids:
        curr_sched = current_schedule.get(item_id, "")
        prev_sched = prev_schedule.get(item_id, "")
        if curr_sched and prev_sched and curr_sched != prev_sched:
            rescheduled += 1
    if rescheduled:
        deltas.append(f"- **{rescheduled} rescheduled** (moved to different day)")

    return deltas


# ── PRD Alignment Tags (Phase 7) ────────────────────────────────────────────


# Map scorecard keywords to 30/60/90 milestones
KEYWORD_MILESTONES = {
    "hiring": "Day 30: hiring",
    "romeo": "Day 30: hiring",
    "rs1": "Day 30: RS1 launch",
    "creative os": "Day 60: Creative OS",
    "spark book": "Day 60: Spark Book",
    "sf2": "Day 60: Spark Book",
    "figma": "Day 60: Creative OS",
    "automation": "Day 60: AI velocity",
    "ai tools": "Day 60: AI velocity",
    "delegation": "Day 30: team stability",
    "brand-paid": "Day 90: brand-paid",
    "speedtrack": "Day 60: Spark Book",
    "nate jones": "Day 30: hiring",
    "donny": "Day 30: team stability",
}


def get_alignment_tag(item: dict, scorecard_keywords: list = None) -> str:
    """Return PRD alignment tag for an item, e.g. '[Day 30: hiring]'.

    Returns empty string if no match.
    """
    text = (item.get("text", "") or "").lower()
    for kw, milestone in KEYWORD_MILESTONES.items():
        if kw in text:
            return f"[{milestone}]"
    return ""


# ── Main Module ──────────────────────────────────────────────────────────────


class TodaySummaryModule(BriefingModule):
    name = "Today at a Glance"
    key = "m00a_today_summary"
    setup_required = "---"

    def fetch_data(self) -> Any:
        today = date.today()

        # Load all open items (same logic as M0)
        kb_items = []
        if KB_PATH.exists():
            try:
                with open(KB_PATH, encoding="utf-8") as f:
                    kb = json.load(f)
                from .transcript_kb import apply_overrides, apply_approvals
                apply_overrides(kb)
                apply_approvals(kb)
                kb_items = kb.get("action_items", [])
            except (json.JSONDecodeError, KeyError):
                pass

        manual_items = []
        if MANUAL_ITEMS_PATH.exists():
            try:
                with open(MANUAL_ITEMS_PATH, encoding="utf-8") as f:
                    manual = json.load(f)
                manual_items = manual.get("action_items", [])
            except (json.JSONDecodeError, KeyError):
                pass

        # Priority overrides
        priority_overrides = {}
        if PRIORITIES_PATH.exists():
            try:
                with open(PRIORITIES_PATH, encoding="utf-8") as f:
                    pdata = json.load(f)
                priority_overrides = pdata.get("priorities", {})
            except (json.JSONDecodeError, KeyError):
                pass

        # Merge open items
        all_items = []
        open_items = []
        for item in kb_items + manual_items:
            all_items.append(item)
            if item.get("status", "open") == "open":
                open_items.append(item)

        # Load schedule
        schedule = load_schedule()

        # Attach scheduled dates, apply priority overrides, rollover
        rollover_count = 0
        for item in open_items:
            item_id = item.get("id", "")
            sched_str = schedule.get(item_id)
            if sched_str:
                try:
                    sched_date = date.fromisoformat(sched_str)
                    if sched_date < today:
                        sched_date = today
                        rollover_count += 1
                    item["_scheduled_date"] = sched_date
                except (ValueError, TypeError):
                    item["_scheduled_date"] = None
            else:
                item["_scheduled_date"] = None

            if item_id in priority_overrides:
                item["_priority_override"] = priority_overrides[item_id]

        # Today's items
        today_items = [i for i in open_items if i.get("_scheduled_date") == today]

        # Calendar events for today
        calendar_events = self.shared_state.get("calendar_day_events", {}).get(today.isoformat(), [])

        # Week capacity
        week_capacity = self.shared_state.get("week_capacity", {})
        today_cap = week_capacity.get(today.isoformat())

        # Launches
        launches = self.shared_state.get("launches", [])

        # M9 receipt (for auto-approved count from Phase 5)
        m9_receipt = self.shared_state.get("m9_receipt")

        # Auto-approved items (Phase 5)
        auto_approved = self.shared_state.get("auto_approved_items", [])

        # Slack DM count (from M4 if it ran)
        slack_pending = self.shared_state.get("slack_pending_count", 0)

        # Previous snapshot for delta
        prev_snapshot = load_previous_snapshot()

        return {
            "today": today,
            "today_items": today_items,
            "all_open_items": open_items,
            "all_items": all_items,
            "calendar_events": calendar_events,
            "today_cap": today_cap,
            "week_capacity": week_capacity,
            "launches": launches,
            "m9_receipt": m9_receipt,
            "auto_approved": auto_approved,
            "slack_pending": slack_pending,
            "rollover_count": rollover_count,
            "schedule": schedule,
            "prev_snapshot": prev_snapshot,
            "priority_overrides": priority_overrides,
        }

    def analyze(self, data: Any) -> str:
        today = data["today"]
        today_items = data["today_items"]
        calendar_events = data["calendar_events"]
        today_cap = data["today_cap"]
        launches = data["launches"]
        m9_receipt = data["m9_receipt"]
        auto_approved = data["auto_approved"]
        slack_pending = data["slack_pending"]
        rollover_count = data["rollover_count"]
        schedule = data["schedule"]
        prev_snapshot = data["prev_snapshot"]
        all_open = data["all_open_items"]
        all_items = data["all_items"]

        lines = []

        # ── Header with day count + phase ───────────────────────────────────
        day = current_day(today)
        if day <= 30:
            phase = "Stabilize & Establish"
            d_check = days_until(DAY_30_DATE, today)
            checkpoint = f"Day 30 in {d_check} day{'s' if d_check != 1 else ''}"
        elif day <= 60:
            phase = "Accelerate & Build"
            d_check = days_until(DAY_60_DATE, today)
            checkpoint = f"Day 60 in {d_check} day{'s' if d_check != 1 else ''}"
        else:
            phase = "Prove & Evaluate"
            d_check = days_until(DAY_90_DATE, today)
            checkpoint = f"Day 90 in {d_check} day{'s' if d_check != 1 else ''}"

        day_name = today.strftime("%A")
        date_str = today.strftime("%b %d")
        lines.append(f"**Day {day}/90** | Phase: {phase} | Next: {checkpoint}")
        lines.append("")

        # ── Capacity + Viability Alerts (Phase 3) ───────────────────────────
        # Classify today's items
        intel_config = self.config.get("intelligence", {})
        scorecard_kw = intel_config.get("scorecard_keywords", [])
        scorer = PriorityScorer(
            launches=launches,
            scorecard_keywords=scorecard_kw,
        )

        day_type_name = WEEKDAY_NAMES[today.weekday()]
        day_type = self.config.get("modules", {}).get(
            "triage_intelligence", {}
        ).get("day_type_rules", {}).get(day_type_name, "execution")

        classified = {"A": [], "B": [], "C": []}
        if today_items:
            classified = classify_day_items(
                list(today_items), today, day_type, scorer, a_cap=3
            )

        a_items = classified["A"]
        b_items = classified["B"]
        c_items = classified["C"]

        # Viability check
        if today_cap:
            viability_alerts = check_day_viability(
                today_cap, a_items, b_items,
                launches=launches,
                rollover_count=rollover_count,
            )
            for alert in viability_alerts:
                lines.append(f"> {alert}")
            if viability_alerts:
                lines.append("")

        # ── Work Block Allocation (Phase 2) ─────────────────────────────────
        prefs = load_preferences()
        work_blocks = load_work_blocks(prefs)
        allocation = allocate_work_blocks(
            a_items, b_items, calendar_events, work_blocks
        )

        # ── Task count summary (detail in M0 Action Items Tracker) ──────────
        task_total = len(a_items) + len(b_items) + len(c_items)
        if task_total:
            lines.append(f"**Tasks**: {len(a_items)}A / {len(b_items)}B / {len(c_items)}C — see Action Items Tracker below")
            lines.append("")

        # ── Meetings ────────────────────────────────────────────────────────
        if calendar_events:
            lines.append("### Meetings")
            # Sort by start time
            sorted_events = sorted(
                calendar_events,
                key=lambda e: e.get("start_dt") or datetime.min
            )
            for ev in sorted_events:
                start_dt = ev.get("start_dt")
                summary = ev.get("summary", "Untitled")
                duration = ev.get("duration_minutes", 0)

                if start_dt:
                    t = format_time(start_dt).lower().replace(" ", "")
                    dur_str = f" ({duration}m)" if duration else ""
                    lines.append(f"- {t} {summary}{dur_str}")
                else:
                    lines.append(f"- {summary}")
            lines.append("")

        # ── Launch Countdown (Phase 4) ──────────────────────────────────────
        launch_lines = format_launch_countdown(launches)
        if launch_lines:
            lines.append("### Launches")
            lines.extend(launch_lines)
            lines.append("")

        # ── What Changed (Phase 6) ──────────────────────────────────────────
        deltas = compute_delta(all_open, schedule, prev_snapshot)
        if deltas:
            lines.append("### What Changed Since Yesterday")
            lines.extend(deltas)
            lines.append("")

        # ── Fetch Status ─────────────────────────────────────────────────────
        fetch_data = self.shared_state.get("git_fetch", {})
        fetch_status = fetch_data.get("status", "disabled")
        if fetch_status != "disabled":
            lines.append("### Fetch Status")
            if fetch_status == "success":
                commits = fetch_data.get("new_commits", [])
                if commits:
                    lines.append(f"- ✅ Fetch successful — **{len(commits)} new commit{'s' if len(commits) != 1 else ''}** on pg-main/main since last merge")
                    for commit in commits[:10]:
                        lines.append(f"  - `{commit}`")
                    if len(commits) > 10:
                        lines.append(f"  - _...and {len(commits) - 10} more_")
                else:
                    lines.append("- ✅ Fetch successful — no new commits since last merge")
            elif fetch_status == "failed":
                reason = fetch_data.get("reason", "unknown")
                lines.append(f"- ❌ Fetch failed — {reason}")
            lines.append("")

        # ── CLM Status (from M13 shared_state) ─────────────────────────────
        clm_status = self.shared_state.get("clm_status", [])
        for clm in clm_status:
            name = clm.get("launch_name", "Unknown")
            status = clm.get("status", "unknown")
            summary = clm.get("summary", "")
            if status == "synced":
                lines.append(f"**{name} CLM**")
                lines.append(f"✅ Synced — {summary}")
            elif status == "error":
                lines.append(f"**{name} CLM**")
                lines.append(f"❌ Error — {summary}")
            lines.append("")

        # ── Alerts ──────────────────────────────────────────────────────────
        alert_lines = []

        if auto_approved:
            alert_lines.append(
                f"✅ {len(auto_approved)} item{'s' if len(auto_approved) != 1 else ''} "
                f"auto-approved from overnight transcripts"
            )

        if slack_pending:
            alert_lines.append(f"⚠️ {slack_pending} Slack DM{'s' if slack_pending != 1 else ''} awaiting reply (see M4)")

        if m9_receipt:
            overflow = m9_receipt.get("overflow", 0)
            if overflow:
                alert_lines.append(f"📋 {overflow} transcript{'s' if overflow != 1 else ''} queued for next run")

        if alert_lines:
            lines.append("### Alerts")
            for alert in alert_lines:
                lines.append(f"- {alert}")
            lines.append("")

        # ── Save snapshot for tomorrow's delta (Phase 6) ────────────────────
        save_snapshot(all_open, schedule)

        # ── Store summary data in shared_state for other modules ────────────
        self.shared_state["today_summary"] = {
            "a_count": len(a_items),
            "b_count": len(b_items),
            "c_count": len(c_items),
            "allocation": allocation,
            "viability_alerts": viability_alerts if today_cap else [],
        }

        return "\n".join(lines)

    def format_section(self) -> str:
        """H2 heading — rendered first in report."""
        today = date.today()
        day_name = today.strftime("%A")
        date_str = today.strftime("%b %d, %Y")
        day = current_day(today)

        if self._error:
            return (
                "<!-- M00a:START -->\n"
                f"## Today at a Glance — {day_name}, {date_str} (Day {day}/90)\n\n"
                f"> **MODULE ERROR**: {self._error}\n"
                f"> This module failed but others continued normally.\n"
                "<!-- M00a:END -->"
            )
        if self._analysis:
            return (
                "<!-- M00a:START -->\n"
                f"## Today at a Glance — {day_name}, {date_str} (Day {day}/90)\n\n"
                f"{self._analysis}\n"
                "<!-- M00a:END -->"
            )
        return (
            "<!-- M00a:START -->\n"
            f"## Today at a Glance — {day_name}, {date_str} (Day {day}/90)\n\n"
            "_No summary data available._\n"
            "<!-- M00a:END -->"
        )
