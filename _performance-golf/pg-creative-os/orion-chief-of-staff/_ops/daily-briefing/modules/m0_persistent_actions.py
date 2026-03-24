"""Module 0: Action Items Tracker (Christopher's Leadership View)

Non-AI module (pure data read + deterministic formatting) that renders
Christopher's action items grouped by **scheduled work day**.

Each day shows its item count. Items without a scheduled day go to
an "Unscheduled" section. Items scheduled for past days auto-roll to today.

TODAY's section uses ABC prioritization:
- A = Must do today (overdue, today's deadline). Ideally max 2.
- B = Good to do today, no consequences if it slips.
- C = Nice to have, delegation candidates.
Future days use flat numbered lists.
"""

import json
import logging
from collections import defaultdict
from datetime import date, timedelta
from pathlib import Path
from typing import Any

from .base import BriefingModule, MODULES_DIR
from .transcript_kb import apply_overrides, apply_approvals, load_schedule, save_schedule
from .capacity_engine import (
    PriorityScorer, DayCapacity, classify_day_items,
    load_work_blocks, load_preferences, compute_week_capacity,
    format_capacity_header, next_weekday,
    DAY_NAMES, WORK_WEEKDAYS, WEEKDAY_NAMES,
)
from .m00a_today_summary import get_alignment_tag

logger = logging.getLogger(__name__)

DAILY_BRIEFING_DIR = MODULES_DIR.parent
KB_PATH = DAILY_BRIEFING_DIR / ".transcript-kb.json"
MANUAL_ITEMS_PATH = DAILY_BRIEFING_DIR / ".kb-manual-items.json"
PRIORITIES_PATH = DAILY_BRIEFING_DIR / ".kb-priorities.json"

# Staleness threshold
STALE_DAYS = 7

# Name normalization — fuse duplicate owner names at display time
NAME_ALIASES = {
    "Christopher": "Christopher Ogle",
    "Chris F": "Chris Fleeks",
    "Chris Hibbett": "Chris Hibbert",
    "Fleeks": "Chris Fleeks",
    "Fatima": "Fatima Cantos",
    "Jenny": "Jenni Nagel",
    "Jenny Nagel": "Jenni Nagel",
    "Jeff": "Jeff Logue",
    "John": "John Hardesty",
}

# Category labels for the Type column
CAT_LABELS = {"my_action": "DO", "follow_up": "TRACK", "milestone": "DATE"}

# Day-of-week abbreviations
DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]


class PersistentActionsModule(BriefingModule):
    name = "Action Items Tracker"
    key = "m0_persistent_actions"
    setup_required = "—"

    def fetch_data(self) -> Any:
        today = date.today()

        # Load KB action items
        kb_items = []
        if KB_PATH.exists():
            try:
                with open(KB_PATH, encoding="utf-8") as f:
                    kb = json.load(f)
                apply_overrides(kb)
                apply_approvals(kb)
                kb_items = kb.get("action_items", [])
            except (json.JSONDecodeError, KeyError):
                pass

        # Load manual items
        manual_items = []
        if MANUAL_ITEMS_PATH.exists():
            try:
                with open(MANUAL_ITEMS_PATH, encoding="utf-8") as f:
                    manual = json.load(f)
                manual_items = manual.get("action_items", [])
            except (json.JSONDecodeError, KeyError):
                pass

        # Load priority overrides
        priority_overrides = {}
        if PRIORITIES_PATH.exists():
            try:
                with open(PRIORITIES_PATH, encoding="utf-8") as f:
                    pdata = json.load(f)
                priority_overrides = pdata.get("priorities", {})
            except (json.JSONDecodeError, KeyError):
                pass

        # Merge all open items
        open_items = []
        for item in kb_items + manual_items:
            if item.get("status", "open") == "open":
                open_items.append(item)

        # Load schedule and attach scheduled_date to each item
        schedule = load_schedule()
        rolled = False

        for item in open_items:
            item_id = item.get("id", "")
            sched_str = schedule.get(item_id)
            if sched_str:
                try:
                    sched_date = date.fromisoformat(sched_str)
                    # Auto-rollover: past dates move to today
                    if sched_date < today:
                        sched_date = today
                        schedule[item_id] = today.isoformat()
                        rolled = True
                    item["_scheduled_date"] = sched_date
                except (ValueError, TypeError):
                    item["_scheduled_date"] = None
            else:
                item["_scheduled_date"] = None

            # Compute age and overdue
            item["_age_days"] = self._compute_age(item, today)
            item["_is_overdue"] = self._is_overdue(item, today)

            # Apply priority override if present
            if item_id in priority_overrides:
                item["_priority_override"] = priority_overrides[item_id]

        # Persist rollover changes
        if rolled:
            save_schedule(schedule)

        # Group by scheduled date
        day_groups = defaultdict(list)
        unscheduled = []
        for item in open_items:
            sched = item.get("_scheduled_date")
            if sched:
                day_groups[sched].append(item)
            else:
                unscheduled.append(item)

        # Sort items within each day: overdue first, deadline soonest, age oldest
        sort_key = lambda x: (
            not x["_is_overdue"],
            self._deadline_sort_key(x),
            -x["_age_days"],
        )
        for day_date in day_groups:
            day_groups[day_date].sort(key=sort_key)
        unscheduled.sort(key=sort_key)

        total_open = len(open_items)
        today_count = len(day_groups.get(today, []))
        overdue_count = sum(1 for i in open_items if i["_is_overdue"])

        return {
            "day_groups": dict(day_groups),
            "unscheduled": unscheduled,
            "total_open": total_open,
            "today_count": today_count,
            "overdue_count": overdue_count,
            "unscheduled_count": len(unscheduled),
            "today": today,
        }

    def _compute_age(self, item: dict, today: date) -> int:
        date_str = (
            item.get("source_date")
            or item.get("created_date")
            or ""
        )
        if not date_str:
            return 0
        try:
            item_date = date.fromisoformat(date_str)
            return max(0, (today - item_date).days)
        except (ValueError, TypeError):
            return 0

    def _is_overdue(self, item: dict, today: date) -> bool:
        deadline = item.get("deadline", "")
        if not deadline:
            return False
        try:
            dl = date.fromisoformat(deadline)
            return today > dl
        except (ValueError, TypeError):
            return False

    def _classify_priority_simple(self, item: dict, today: date) -> str:
        """Classify an item as A, B, or C (simple fallback).

        Priority override takes precedence. Otherwise:
        - A: overdue, or deadline is today
        - B: deadline within 3 days, or scheduled for today with deadline
        - C: no deadline, no time pressure
        """
        override = item.get("_priority_override")
        if override in ("A", "B", "C"):
            return override

        deadline_str = item.get("deadline", "")
        is_overdue = item.get("_is_overdue", False)

        if is_overdue:
            return "A"
        if deadline_str:
            try:
                dl = date.fromisoformat(deadline_str)
                if dl == today:
                    return "A"
                if dl <= today + timedelta(days=3):
                    return "B"
            except (ValueError, TypeError):
                pass

        if deadline_str:
            return "B"

        return "C"

    def _classify_priority(self, item: dict, today: date) -> str:
        """Classify an item as A, B, or C.

        Uses multi-factor PriorityScorer when intelligence.multi_factor_abc
        is enabled, otherwise falls back to simple classification.
        Priority overrides always take precedence.
        """
        override = item.get("_priority_override")
        if override in ("A", "B", "C"):
            return override

        intel_config = self.config.get("intelligence", {})
        if not intel_config.get("multi_factor_abc", False):
            return self._classify_priority_simple(item, today)

        # Use cached tier if already classified by _render_week_view
        if "_tier" in item:
            return item["_tier"]

        return self._classify_priority_simple(item, today)

    def _deadline_sort_key(self, item: dict) -> str:
        """Return deadline string for sorting (items without deadlines sort last)."""
        return item.get("deadline") or "9999-99-99"

    def _format_deadline(self, item: dict) -> str:
        deadline = item.get("deadline", "")
        deadline_text = item.get("deadline_text", "")
        if deadline:
            try:
                dl = date.fromisoformat(deadline)
                return dl.strftime("%b %d")
            except (ValueError, TypeError):
                pass
        if deadline_text:
            return deadline_text
        return "—"

    def _format_source(self, item: dict) -> str:
        """Abbreviate source transcript to MM/DD stem."""
        source = item.get("source_transcript", item.get("source", "—"))
        if not source or source == "—":
            return "—"
        stem = Path(source).stem
        # e.g. "022326-donnie-prd-review" → "02/23 donnie-prd-review"
        if len(stem) >= 6 and stem[:6].isdigit():
            return f"{stem[:2]}/{stem[2:4]} {stem[7:]}" if len(stem) > 7 else stem
        return stem

    def _format_day_header(self, day_date: date, count: int, today: date) -> str:
        """Format: ### Fri, Feb 27 — 4 items (TODAY)"""
        day_name = DAY_NAMES[day_date.weekday()]
        date_str = day_date.strftime("%b %d")
        suffix = " (TODAY)" if day_date == today else ""
        item_word = "item" if count == 1 else "items"
        return f"### {day_name}, {date_str} — {count} {item_word}{suffix}"

    def _format_item_text(self, item: dict) -> str:
        """Format item text with overdue prefix and follow-up annotation."""
        text = item.get("text", "")
        if item["_is_overdue"]:
            text = f"OVERDUE: {text}"

        cat = item.get("category", "my_action")
        if cat == "follow_up" and item.get("depends_on"):
            depends = item["depends_on"]
            depends = NAME_ALIASES.get(depends, depends)
            text = f"{text} ← {depends}"

        return text

    def _render_items_table(self, items: list) -> list:
        """Render a flat numbered table of items (used for future days + unscheduled)."""
        lines = []
        lines.append("| # | Item | Type | Deadline | Source |")
        lines.append("|---|------|------|----------|--------|")
        for i, item in enumerate(items, 1):
            text = self._format_item_text(item)
            cat_label = CAT_LABELS.get(item.get("category", "my_action"), "DO")
            deadline = self._format_deadline(item)
            source = self._format_source(item)
            lines.append(f"| {i} | {text} | {cat_label} | {deadline} | {source} |")
        return lines

    def _render_abc_table(self, items: list, today: date) -> list:
        """Render today's items with ABC priority tiers."""
        # Classify each item
        for item in items:
            item["_abc"] = self._classify_priority(item, today)

        # Group by priority tier
        a_items = [i for i in items if i["_abc"] == "A"]
        b_items = [i for i in items if i["_abc"] == "B"]
        c_items = [i for i in items if i["_abc"] == "C"]

        # Sort within each tier: overdue first, deadline soonest, age oldest
        sort_key = lambda x: (
            not x["_is_overdue"],
            self._deadline_sort_key(x),
            -x["_age_days"],
        )
        a_items.sort(key=sort_key)
        b_items.sort(key=sort_key)
        c_items.sort(key=sort_key)

        lines = []

        # A-task warning if 3+
        if len(a_items) >= 3:
            lines.append(
                f"> **A-task warning:** {len(a_items)} must-do tasks today. "
                f"Review whether any can move to B.\n"
            )

        lines.append("| Priority | Item | Type | Deadline | Source |")
        lines.append("|----------|------|------|----------|--------|")

        # Render A items
        for i, item in enumerate(a_items, 1):
            text = self._format_item_text(item)
            cat_label = CAT_LABELS.get(item.get("category", "my_action"), "DO")
            deadline = self._format_deadline(item)
            source = self._format_source(item)
            lines.append(f"| **A{i}** | {text} | {cat_label} | {deadline} | {source} |")

        # Render B items
        for i, item in enumerate(b_items, 1):
            text = self._format_item_text(item)
            cat_label = CAT_LABELS.get(item.get("category", "my_action"), "DO")
            deadline = self._format_deadline(item)
            source = self._format_source(item)
            lines.append(f"| B{i} | {text} | {cat_label} | {deadline} | {source} |")

        # Render C items
        for i, item in enumerate(c_items, 1):
            text = self._format_item_text(item)
            cat_label = CAT_LABELS.get(item.get("category", "my_action"), "DO")
            deadline = self._format_deadline(item)
            source = self._format_source(item)
            lines.append(f"| C{i} | {text} | {cat_label} | {deadline} | {source} |")

        return lines, len(a_items), len(b_items), len(c_items)

    def _get_scorer(self) -> PriorityScorer:
        """Create a PriorityScorer from shared_state and config."""
        launches = self.shared_state.get("launches", [])
        scorecard_kw = self.config.get("intelligence", {}).get("scorecard_keywords", [])
        return PriorityScorer(launches=launches, scorecard_keywords=scorecard_kw)

    def _render_week_view(self, data: dict) -> list:
        """Render Mon-Fri week-ahead view with capacity headers and ABC tiers.

        Each day shows:
        - Capacity header (meetings, focus time)
        - A-tasks (max 3) with Why column
        - B-tasks
        - C-tasks

        3 A-task cap per day. Friday overflow → Monday.
        Sat/Sun never appear.
        """
        today = data["today"]
        day_groups = data["day_groups"]
        week_capacity = self.shared_state.get("week_capacity", {})

        scorer = self._get_scorer()
        lines = []

        # Collect all days Mon-Fri from the data + capacity
        all_dates = set()
        for d in day_groups:
            if d.weekday() in WORK_WEEKDAYS:
                all_dates.add(d)
        for iso in week_capacity:
            try:
                d = date.fromisoformat(iso)
                if d.weekday() in WORK_WEEKDAYS and d >= today:
                    all_dates.add(d)
            except (ValueError, TypeError):
                pass

        sorted_dates = sorted(all_dates)
        if not sorted_dates:
            return lines

        for day_date in sorted_dates:
            items = list(day_groups.get(day_date, []))
            if not items and day_date != today:
                # Skip empty future days unless it's today
                cap = week_capacity.get(day_date.isoformat())
                if not cap or cap.is_full:
                    continue

            # Get capacity header
            cap = week_capacity.get(day_date.isoformat())
            if cap:
                header = format_capacity_header(cap)
                suffix = " (TODAY)" if day_date == today else ""
                lines.append(f"### {header}{suffix}")
            else:
                lines.append(self._format_day_header(day_date, len(items), today))

            lines.append("")

            if not items:
                lines.append("_No items scheduled._\n")
                continue

            # Use multi-factor ABC classification
            day_type_name = WEEKDAY_NAMES[day_date.weekday()]
            day_type = self.config.get("intelligence", {}).get(
                "day_type_rules", {}
            ).get(day_type_name) or self.config.get(
                "modules", {}
            ).get("triage_intelligence", {}).get(
                "day_type_rules", {}
            ).get(day_type_name, "execution")

            classified = classify_day_items(items, day_date, day_type, scorer, a_cap=3)

            # Render table with Why column for A-tasks
            lines.append("| Priority | Item | Type | Deadline | Why |")
            lines.append("|----------|------|------|----------|-----|")

            for item in classified["A"]:
                text = self._format_item_text(item)
                cat_label = CAT_LABELS.get(item.get("category", "my_action"), "DO")
                deadline = self._format_deadline(item)
                why_parts = []
                alignment = get_alignment_tag(item)
                if alignment:
                    why_parts.append(alignment)
                priority_why = scorer.explain_priority(item)
                if priority_why:
                    why_parts.append(priority_why)
                why = " ".join(why_parts)
                lines.append(f"| **A{item['_tier_rank']}** | {text} | {cat_label} | {deadline} | {why} |")

            for item in classified["B"]:
                text = self._format_item_text(item)
                cat_label = CAT_LABELS.get(item.get("category", "my_action"), "DO")
                deadline = self._format_deadline(item)
                lines.append(f"| B{item['_tier_rank']} | {text} | {cat_label} | {deadline} | |")

            for item in classified["C"]:
                text = self._format_item_text(item)
                cat_label = CAT_LABELS.get(item.get("category", "my_action"), "DO")
                deadline = self._format_deadline(item)
                lines.append(f"| C{item['_tier_rank']} | {text} | {cat_label} | {deadline} | |")

            lines.append("")

        return lines

    def analyze(self, data: Any) -> str:
        if not data["total_open"]:
            return (
                "_No action items tracked yet. Items will appear here as "
                "transcripts are processed by M9._\n"
            )

        lines = []
        today = data["today"]
        intel_config = self.config.get("intelligence", {})
        use_week_view = intel_config.get("week_ahead_view", False) and intel_config.get("multi_factor_abc", False)

        # Compute ABC counts for today's items (for summary line)
        today_items = data["day_groups"].get(today, [])
        a_count = b_count = c_count = 0
        if today_items:
            for item in today_items:
                abc = self._classify_priority(item, today)
                if abc == "A":
                    a_count += 1
                elif abc == "B":
                    b_count += 1
                else:
                    c_count += 1

        # Summary line
        parts = [f"**{data['total_open']} open**"]
        if today_items:
            parts.append(f"Today: {a_count}A, {b_count}B, {c_count}C")
        else:
            parts.append("0 today")
        if data["overdue_count"]:
            parts.append(f"{data['overdue_count']} overdue")
        if data["unscheduled_count"]:
            parts.append(f"{data['unscheduled_count']} unscheduled")
        lines.append(f"> {' | '.join(parts)}\n")

        if use_week_view:
            # Week-ahead view with capacity headers + multi-factor ABC
            try:
                week_lines = self._render_week_view(data)
                lines.extend(week_lines)
            except Exception as e:
                logger.warning(f"Week view failed, falling back to standard: {e}")
                lines.extend(self._render_standard_view(data))
        else:
            lines.extend(self._render_standard_view(data))

        # Unscheduled section
        if data["unscheduled"]:
            item_word = "item" if len(data["unscheduled"]) == 1 else "items"
            lines.append(f"### Unscheduled — {len(data['unscheduled'])} {item_word}")
            lines.append("")
            lines.extend(self._render_items_table(data["unscheduled"]))
            lines.append("")

        return "\n".join(lines)

    def _render_standard_view(self, data: dict) -> list:
        """Original day-by-day rendering (fallback when week view disabled)."""
        lines = []
        today = data["today"]
        sorted_days = sorted(data["day_groups"].keys())
        for day_date in sorted_days:
            items = data["day_groups"][day_date]
            lines.append(self._format_day_header(day_date, len(items), today))
            lines.append("")

            if day_date == today:
                table_lines, _, _, _ = self._render_abc_table(items, today)
                lines.extend(table_lines)
            else:
                lines.extend(self._render_items_table(items))

            lines.append("")
        return lines

    def format_section(self) -> str:
        """H2 heading with section markers for re-render support."""
        if self._error:
            return (
                "<!-- M0:START -->\n"
                f"## {self.name}\n\n"
                f"> **MODULE ERROR**: {self._error}\n"
                f"> This module failed but others continued normally.\n"
                "<!-- M0:END -->"
            )
        if self._analysis:
            return (
                "<!-- M0:START -->\n"
                f"## {self.name}\n\n{self._analysis}\n"
                "<!-- M0:END -->"
            )
        return (
            "<!-- M0:START -->\n"
            f"## {self.name}\n\n_No output produced._\n"
            "<!-- M0:END -->"
        )
