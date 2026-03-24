"""Capacity Engine — work block model, capacity calculation, and multi-factor ABC scoring.

This is a utility module (not a BriefingModule). Called by M0, M0b, and
triage_intelligence to compute available work capacity per day and score
items for ABC prioritization.

Key concepts:
- Work blocks: Focus (8:30-12, A-tasks), Afternoon (1-2pm, B-tasks), Comms (2pm+, meetings)
- Work week: Mon-Fri only. Sat/Sun = zero capacity, never scheduled.
- A-task cap: 3 per day (hard cap). Overflow becomes B.
- Priority scoring: multi-factor (launch proximity, overdue, deadline, scorecard, day-type fit).
"""

import json
import logging
from dataclasses import dataclass, field
from datetime import date, datetime, time, timedelta
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any, Optional

logger = logging.getLogger(__name__)

DAILY_BRIEFING_DIR = Path(__file__).resolve().parent.parent
PREFERENCES_PATH = DAILY_BRIEFING_DIR / ".kb-preferences.json"

# Days that are valid for PG task scheduling (0=Mon, 4=Fri)
WORK_WEEKDAYS = {0, 1, 2, 3, 4}  # Mon-Fri

DAY_TYPE_DEFAULTS = {
    "monday": "strategic",
    "tuesday": "execution",
    "wednesday": "execution",
    "thursday": "execution",
    "friday": "execution",
    "saturday": "off",
    "sunday": "off",
}

DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
WEEKDAY_NAMES = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]


# ── Data Models ──────────────────────────────────────────────────────────────


@dataclass
class WorkBlock:
    """A named time block in Christopher's day."""
    name: str
    start: time
    end: time
    task_types: list
    label: str

    @property
    def nominal_minutes(self) -> int:
        """Total minutes in this block without any meetings."""
        start_dt = datetime.combine(date.today(), self.start)
        end_dt = datetime.combine(date.today(), self.end)
        return max(0, int((end_dt - start_dt).total_seconds() / 60))


@dataclass
class DayCapacity:
    """Available work capacity for a single day."""
    day_date: date
    day_type: str
    is_work_day: bool
    focus_minutes: int = 0
    afternoon_minutes: int = 0
    meeting_minutes: int = 0
    meeting_count: int = 0

    @property
    def total_available(self) -> int:
        return self.focus_minutes + self.afternoon_minutes

    @property
    def a_task_slots(self) -> int:
        if not self.is_work_day:
            return 0
        return min(3, max(0, self.focus_minutes // 60))

    @property
    def b_task_slots(self) -> int:
        if not self.is_work_day:
            return 0
        return max(0, self.afternoon_minutes // 30)

    @property
    def is_full(self) -> bool:
        return self.a_task_slots == 0 and self.b_task_slots == 0


# ── Work Block Loading ───────────────────────────────────────────────────────


def load_preferences() -> dict:
    """Load .kb-preferences.json."""
    if PREFERENCES_PATH.exists():
        try:
            with open(PREFERENCES_PATH, encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            pass
    return {}


def load_work_blocks(preferences: dict = None) -> list:
    """Parse work blocks from preferences dict."""
    if preferences is None:
        preferences = load_preferences()

    blocks_raw = preferences.get("work_blocks", {})
    blocks = []
    for name, spec in blocks_raw.items():
        try:
            start_parts = spec["start"].split(":")
            end_parts = spec["end"].split(":")
            blocks.append(WorkBlock(
                name=name,
                start=time(int(start_parts[0]), int(start_parts[1])),
                end=time(int(end_parts[0]), int(end_parts[1])),
                task_types=spec.get("task_types", []),
                label=spec.get("label", name),
            ))
        except (KeyError, ValueError, IndexError) as e:
            logger.warning(f"Skipping malformed work block '{name}': {e}")

    if not blocks:
        # Defaults matching Christopher's rhythm
        blocks = [
            WorkBlock("focus_block", time(8, 30), time(12, 0), ["A"], "Focus Block"),
            WorkBlock("afternoon_work", time(13, 0), time(14, 0), ["B", "prep"], "Afternoon Work"),
            WorkBlock("comms_block", time(14, 0), time(18, 0), ["comms", "meetings"], "Meetings + Comms"),
        ]
    return blocks


# ── Capacity Calculation ─────────────────────────────────────────────────────


def _compute_overlap_minutes(block_start: time, block_end: time,
                             event_start: datetime, event_end: datetime) -> int:
    """Compute overlap in minutes between a work block and a calendar event."""
    block_start_dt = datetime.combine(event_start.date(), block_start)
    block_end_dt = datetime.combine(event_start.date(), block_end)

    overlap_start = max(block_start_dt, event_start)
    overlap_end = min(block_end_dt, event_end)

    if overlap_start >= overlap_end:
        return 0
    return int((overlap_end - overlap_start).total_seconds() / 60)


def compute_day_capacity(
    day_date: date,
    work_blocks: list,
    calendar_events: list,
    day_type_rules: dict = None,
) -> DayCapacity:
    """Compute available capacity for a single day.

    Args:
        day_date: The date to compute capacity for.
        work_blocks: List of WorkBlock objects.
        calendar_events: List of parsed calendar event dicts for this day.
            Each must have 'start_dt', 'end_dt', 'duration_minutes'.
        day_type_rules: Dict mapping weekday name to type string.
    """
    if day_type_rules is None:
        day_type_rules = DAY_TYPE_DEFAULTS

    weekday_name = WEEKDAY_NAMES[day_date.weekday()]
    day_type = day_type_rules.get(weekday_name, "execution")
    is_work_day = day_date.weekday() in WORK_WEEKDAYS

    if not is_work_day:
        return DayCapacity(
            day_date=day_date,
            day_type="off",
            is_work_day=False,
        )

    # Compute meeting load
    total_meeting_mins = 0
    meeting_count = 0
    for ev in calendar_events:
        dur = ev.get("duration_minutes") or 0
        if dur > 0:
            total_meeting_mins += dur
            meeting_count += 1

    # Compute available time per block
    focus_block = None
    afternoon_block = None
    for block in work_blocks:
        if "A" in block.task_types:
            focus_block = block
        elif "B" in block.task_types:
            afternoon_block = block

    focus_mins = focus_block.nominal_minutes if focus_block else 0
    afternoon_mins = afternoon_block.nominal_minutes if afternoon_block else 0

    # Subtract meeting overlaps from each block
    for ev in calendar_events:
        start_dt = ev.get("start_dt")
        end_dt = ev.get("end_dt")
        if not start_dt or not end_dt:
            continue

        if focus_block:
            overlap = _compute_overlap_minutes(focus_block.start, focus_block.end, start_dt, end_dt)
            focus_mins -= overlap

        if afternoon_block:
            overlap = _compute_overlap_minutes(afternoon_block.start, afternoon_block.end, start_dt, end_dt)
            afternoon_mins -= overlap

    return DayCapacity(
        day_date=day_date,
        day_type=day_type,
        is_work_day=True,
        focus_minutes=max(0, focus_mins),
        afternoon_minutes=max(0, afternoon_mins),
        meeting_minutes=total_meeting_mins,
        meeting_count=meeting_count,
    )


def compute_week_capacity(
    start_date: date,
    num_days: int,
    work_blocks: list,
    calendar_day_events: dict,
    day_type_rules: dict = None,
) -> dict:
    """Compute DayCapacity for each weekday in the range.

    Args:
        start_date: First date of the range.
        num_days: Number of days to compute (typically 7).
        work_blocks: List of WorkBlock objects.
        calendar_day_events: Dict mapping date ISO string to list of parsed events.
        day_type_rules: Dict mapping weekday name to type string.

    Returns:
        Dict mapping date ISO string to DayCapacity. Sat/Sun included but
        with is_work_day=False and zero capacity.
    """
    result = {}
    for i in range(num_days):
        d = start_date + timedelta(days=i)
        events = calendar_day_events.get(d.isoformat(), [])
        cap = compute_day_capacity(d, work_blocks, events, day_type_rules)
        result[d.isoformat()] = cap
    return result


# ── Priority Scoring ─────────────────────────────────────────────────────────


def next_weekday(d: date) -> date:
    """If d falls on Sat/Sun, return the following Monday."""
    while d.weekday() not in WORK_WEEKDAYS:
        d += timedelta(days=1)
    return d


class PriorityScorer:
    """Multi-factor ABC scoring engine.

    Weights:
        launch_proximity: 0.30 — task tied to launch due in <14 days
        overdue:          0.25 — days overdue (capped at 7)
        deadline:         0.20 — days until deadline
        scorecard:        0.15 — text matches scorecard keywords
        day_type_fit:     0.10 — strategic on Mon, execution Tue-Fri
    """

    W_LAUNCH = 0.30
    W_OVERDUE = 0.25
    W_DEADLINE = 0.20
    W_SCORECARD = 0.15
    W_DAY_TYPE = 0.10

    def __init__(self, launches: list = None, scorecard_keywords: list = None):
        self.launches = launches or []
        self.scorecard_keywords = [kw.lower() for kw in (scorecard_keywords or [])]

    def score(self, item: dict, day_date: date, day_type: str = "execution") -> float:
        """Return 0.0-1.0 priority score for an item on a given day."""
        scores = {}

        # 1. Launch proximity
        scores["launch"] = self._score_launch_proximity(item, day_date)

        # 2. Overdue factor
        scores["overdue"] = self._score_overdue(item, day_date)

        # 3. Deadline proximity
        scores["deadline"] = self._score_deadline(item, day_date)

        # 4. Scorecard alignment
        scores["scorecard"] = self._score_scorecard(item)

        # 5. Day-type fit
        scores["day_type"] = self._score_day_type_fit(item, day_type)

        total = (
            scores["launch"] * self.W_LAUNCH
            + scores["overdue"] * self.W_OVERDUE
            + scores["deadline"] * self.W_DEADLINE
            + scores["scorecard"] * self.W_SCORECARD
            + scores["day_type"] * self.W_DAY_TYPE
        )

        item["_priority_score"] = round(total, 3)
        item["_priority_factors"] = scores
        return total

    def _score_launch_proximity(self, item: dict, day_date: date) -> float:
        """Score based on whether item relates to a launch due within 14 days."""
        if not self.launches:
            return 0.0

        item_text = (item.get("text", "") or "").lower()
        best_score = 0.0

        for launch in self.launches:
            launch_name = (launch.get("name", "") or "").lower()
            due_ms = launch.get("due_date")
            if not due_ms or not launch_name:
                continue

            # Fuzzy match item text against launch name
            similarity = SequenceMatcher(None, item_text[:80], launch_name[:80]).ratio()
            if similarity < 0.35:
                continue

            try:
                launch_date = date.fromtimestamp(int(due_ms) / 1000)
            except (ValueError, TypeError, OSError):
                continue

            days_until = (launch_date - day_date).days
            if days_until < 0:
                # Launch is past — still important if item is overdue
                score = 0.8
            elif days_until <= 7:
                score = 1.0
            elif days_until <= 14:
                score = 0.6
            else:
                score = 0.2

            best_score = max(best_score, score * similarity)

        return min(1.0, best_score)

    def _score_overdue(self, item: dict, day_date: date) -> float:
        """Score based on how many days overdue (capped at 7)."""
        deadline_str = item.get("deadline", "")
        if not deadline_str:
            return 0.0
        try:
            dl = date.fromisoformat(deadline_str)
            days_overdue = (day_date - dl).days
            if days_overdue <= 0:
                return 0.0
            return min(1.0, days_overdue / 7.0)
        except (ValueError, TypeError):
            return 0.0

    def _score_deadline(self, item: dict, day_date: date) -> float:
        """Score based on proximity to deadline (closer = higher)."""
        deadline_str = item.get("deadline", "")
        if not deadline_str:
            return 0.1  # No deadline = low but non-zero (still needs doing)
        try:
            dl = date.fromisoformat(deadline_str)
            # Pull weekend deadlines to Friday
            dl = next_weekday(dl) if dl.weekday() not in WORK_WEEKDAYS else dl
            days_until = (dl - day_date).days
            if days_until <= 0:
                return 1.0  # Due today or overdue
            elif days_until <= 3:
                return 0.8
            elif days_until <= 7:
                return 0.5
            elif days_until <= 14:
                return 0.3
            else:
                return 0.1
        except (ValueError, TypeError):
            return 0.1

    def _score_scorecard(self, item: dict) -> float:
        """Score based on text matching scorecard keywords."""
        if not self.scorecard_keywords:
            return 0.0
        text = (item.get("text", "") or "").lower()
        matches = sum(1 for kw in self.scorecard_keywords if kw in text)
        if matches == 0:
            return 0.0
        return min(1.0, matches * 0.4)

    def _score_day_type_fit(self, item: dict, day_type: str) -> float:
        """Score based on whether item fits the day type."""
        text = (item.get("text", "") or "").lower()
        category = item.get("category", "")

        strategic_signals = ["strategy", "brixton", "john", "prd", "scorecard",
                             "hiring", "recruiting", "leadership", "delegation"]
        execution_signals = ["create", "build", "edit", "record", "write",
                             "figma", "automation", "setup", "deliver"]

        is_strategic = any(s in text for s in strategic_signals)
        is_execution = any(s in text for s in execution_signals)

        if day_type == "strategic" and is_strategic:
            return 1.0
        elif day_type == "strategic" and is_execution:
            return 0.3
        elif day_type == "execution" and is_execution:
            return 0.8
        elif day_type == "execution" and is_strategic:
            return 0.5

        return 0.5  # Neutral

    def explain_priority(self, item: dict) -> str:
        """Return a short reason string for why this item is prioritized."""
        factors = item.get("_priority_factors", {})
        reasons = []

        if factors.get("launch", 0) > 0.3:
            reasons.append("launch-linked")
        if factors.get("overdue", 0) > 0:
            deadline_str = item.get("deadline", "")
            try:
                dl = date.fromisoformat(deadline_str)
                days = (date.today() - dl).days
                reasons.append(f"overdue {days}d")
            except (ValueError, TypeError):
                reasons.append("overdue")
        elif factors.get("deadline", 0) >= 0.8:
            reasons.append("due soon")
        if factors.get("scorecard", 0) > 0:
            reasons.append("scorecard")

        return ", ".join(reasons) if reasons else ""


# ── ABC Classification ───────────────────────────────────────────────────────


def classify_day_items(
    items: list,
    day_date: date,
    day_type: str,
    scorer: PriorityScorer,
    a_cap: int = 3,
) -> dict:
    """Score all items for a day, assign A/B/C tiers with hard cap.

    Returns:
        {"A": [items], "B": [items], "C": [items]}
        Each item has _priority_score, _priority_factors, _tier, _tier_rank set.
    """
    # Score all items
    for item in items:
        # Respect manual priority overrides
        override = item.get("_priority_override")
        if override in ("A", "B", "C"):
            # ClickUp deadline tomorrow exception: B items with due-tomorrow can promote
            if override == "B" and _clickup_due_tomorrow(item, day_date):
                scorer.score(item, day_date, day_type)
                item["_priority_factors"]["clickup_promoted"] = True
            else:
                # Synthetic scores respect tier boundaries
                # B=0.34 (below A threshold 0.35), C=0.14 (below B threshold 0.15)
                scores = {"A": 0.95, "B": 0.34, "C": 0.14}
                item["_priority_score"] = scores[override]
                item["_priority_factors"] = {}
        else:
            scorer.score(item, day_date, day_type)

    # Sort by score descending
    items.sort(key=lambda x: x.get("_priority_score", 0), reverse=True)

    result = {"A": [], "B": [], "C": []}
    a_count = 0

    for item in items:
        override = item.get("_priority_override")

        if override == "A" and a_count < a_cap:
            tier = "A"
        elif override == "B":
            tier = "B"
        elif override == "C":
            tier = "C"
        elif override is None and a_count < a_cap and item.get("_priority_score", 0) >= 0.35:
            tier = "A"
        elif item.get("_priority_score", 0) >= 0.15:
            tier = "B"
        else:
            tier = "C"

        if tier == "A":
            a_count += 1
            # Note ClickUp-promoted items in the Why column
            if item.get("_priority_factors", {}).get("clickup_promoted"):
                item["_why_note"] = "ClickUp due tomorrow — auto-promoted from B"

        item["_tier"] = tier
        item["_tier_rank"] = len(result[tier]) + 1
        result[tier].append(item)

    return result


def _clickup_due_tomorrow(item: dict, day_date: date) -> bool:
    """Check if a ClickUp-sourced item has a deadline that is tomorrow."""
    deadline = item.get("deadline")
    has_clickup = bool(item.get("clickup_task_id")) or (
        item.get("source", "") or ""
    ).startswith("clickup")
    if not deadline or not has_clickup:
        return False
    tomorrow = day_date + timedelta(days=1)
    try:
        return deadline == tomorrow.isoformat()
    except (TypeError, ValueError):
        return False


# ── Schedule Helpers ─────────────────────────────────────────────────────────


def suggest_best_day(
    week_capacity: dict,
    day_type_preference: str = None,
    exclude_full: bool = True,
) -> Optional[str]:
    """Suggest the best weekday for a new task.

    Args:
        week_capacity: Dict of {date_iso: DayCapacity}.
        day_type_preference: If set, prefer days of this type (e.g., "strategic").
        exclude_full: Skip days where a_task_slots == 0.

    Returns:
        Date ISO string of suggested day, or None.
    """
    candidates = []
    for date_iso, cap in sorted(week_capacity.items()):
        if not cap.is_work_day:
            continue
        if exclude_full and cap.is_full:
            continue
        candidates.append((date_iso, cap))

    if not candidates:
        return None

    def score_candidate(pair):
        date_iso, cap = pair
        s = cap.total_available / 300.0  # Normalize: 300 min = full day
        if day_type_preference and cap.day_type == day_type_preference:
            s += 0.2
        return s

    candidates.sort(key=score_candidate, reverse=True)
    return candidates[0][0]


def format_capacity_header(cap: DayCapacity) -> str:
    """Format a day capacity as a header string.

    Example: 'Mon, Mar 09 (Strategic) -- 4h 45m meetings, 1h 45m focus'
    """
    day_name = DAY_NAMES[cap.day_date.weekday()]
    date_str = cap.day_date.strftime("%b %d")
    type_label = cap.day_type.capitalize()

    parts = [f"{day_name}, {date_str} ({type_label})"]

    if cap.meeting_minutes > 0:
        mh, mm = divmod(cap.meeting_minutes, 60)
        meeting_str = f"{mh}h {mm}m meetings" if mm else f"{mh}h meetings"
    else:
        meeting_str = "no meetings"

    fh, fm = divmod(cap.focus_minutes, 60)
    focus_str = f"{fh}h {fm}m focus" if fm else f"{fh}h focus"

    parts.append(f"{meeting_str}, {focus_str}")

    return " -- ".join(parts)
