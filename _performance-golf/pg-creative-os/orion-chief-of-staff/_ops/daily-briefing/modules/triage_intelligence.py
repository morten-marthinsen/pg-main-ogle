"""Triage Intelligence — pre-scores pending review items.

Utility module (not a BriefingModule). Called by M0b during fetch_data()
to enrich each pending item with a confidence score, matched rules,
ClickUp cross-reference, and calendar-aware day suggestion.

v1.1: capacity-aware scheduling, launch proximity scoring,
      auto-routing of depends_on items to Waiting On.
v2.0: intelligent placement — task-type classification, urgency-aware
      scheduling, multi-factor day scoring, duplicate detection,
      and "why" reasoning for each placement.
v2.1: entity-first calendar matching — extracts person names from
      action items (depends_on, KB people, text patterns) and
      cross-references against calendar events in a +/-24h window.
      Items with a match get a `calendar_overlap` flag and
      `~calendar?~` signal in Pending Review.
"""

import json
import os
import re
import shutil
import tempfile
from collections import defaultdict
from datetime import date, timedelta
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

from .base import MODULES_DIR
from .capacity_engine import (
    DayCapacity, load_work_blocks, load_preferences,
    compute_week_capacity, DAY_NAMES, WORK_WEEKDAYS,
)
from .transcript_kb import load_schedule as _load_schedule

DAILY_BRIEFING_DIR = MODULES_DIR.parent
TRIAGE_HISTORY_PATH = DAILY_BRIEFING_DIR / ".kb-triage-history.json"
KB_APPROVALS_PATH = DAILY_BRIEFING_DIR / ".kb-approvals.json"
KB_PATH = DAILY_BRIEFING_DIR / ".transcript-kb.json"
KB_MANUAL_ITEMS_PATH = DAILY_BRIEFING_DIR / ".kb-manual-items.json"


# ── Score Classifications ────────────────────────────────────────────────

LIKELY_APPROVE = "LIKELY APPROVE"
LEAN_APPROVE = "LEAN APPROVE"
NEEDS_REVIEW = "NEEDS REVIEW"
LEAN_REJECT = "LEAN REJECT"
LIKELY_REJECT = "LIKELY REJECT"


def classify_score(score: float) -> str:
    """Map a score (-1.0 to +1.0) to a human-readable classification."""
    if score >= 0.60:
        return LIKELY_APPROVE
    elif score >= 0.20:
        return LEAN_APPROVE
    elif score > -0.20:
        return NEEDS_REVIEW
    elif score > -0.60:
        return LEAN_REJECT
    else:
        return LIKELY_REJECT


# ── Text Similarity ──────────────────────────────────────────────────────

def _similarity(a: str, b: str) -> float:
    """Quick text similarity (0.0-1.0) using SequenceMatcher."""
    return SequenceMatcher(None, a.lower().strip(), b.lower().strip()).ratio()


# PG offer/product names for calendar matching
_OFFER_NAMES = {
    "sf2", "speedtrack", "speed track",
    "sf1", "straightaway",
    "pgb", "rs1", "ssp", "swingsmooth",
    "spd", "one.1", "wedge", "dqfe",
}

_CALENDAR_GENERIC = {
    "call", "meeting", "schedule", "review", "discuss", "assets",
    "next", "week", "mid", "about", "with", "for", "the", "and",
    "creative", "pre", "post", "sync", "update", "check", "align",
    "alignment", "launch", "team", "plan", "finalize", "create",
    "new", "set", "get", "make", "send", "book", "from", "this",
    "that", "will", "can", "our", "your", "their",
}


def _extract_topic_keywords(text: str) -> set:
    """Extract topic-level keywords for calendar matching.

    Focuses on offer names, people, and specific nouns — not generic words.
    """
    text_lower = text.lower()
    keywords = set()
    # Check known offer names (including multi-word)
    for name in _OFFER_NAMES:
        if name in text_lower:
            keywords.add(name)
    # Extract non-generic words > 3 chars
    for word in text_lower.split():
        word = word.strip(".,;:!?()[]\"'-")
        if word and word not in _CALENDAR_GENERIC and len(word) > 3:
            keywords.add(word)
    return keywords


# ── Entity-First Calendar Matching ──────────────────────────────────────

# Common first names / words that are too generic to match as person names
_GENERIC_FIRST_NAMES = {
    "christopher", "chris", "the", "team", "schedule", "review",
    "call", "meeting", "follow", "send", "book", "check", "update",
    "create", "post", "draft", "write", "discuss", "align",
}

# Full names to exclude (Christopher himself — matching his own calendar is noise)
_EXCLUDED_FULL_NAMES = {
    "christopher ogle", "chris ogle",
}


def _extract_person_names(item: dict, kb_people: Optional[Dict[str, Any]] = None) -> List[str]:
    """Extract person names from an action item for calendar cross-reference.

    Sources:
    1. depends_on field (most reliable — already a person name)
    2. Text mentions of known KB people (fuzzy first-name match)
    3. Common name patterns in text ("with [Name]", "to [Name]", etc.)

    Returns list of lowercase first names suitable for fuzzy matching.
    """
    names = []
    text = item.get("text", "")
    text_lower = text.lower()

    # Source 1: depends_on field
    depends_on = (item.get("depends_on") or "").strip()
    if depends_on:
        full_lower = depends_on.lower().strip()
        # Skip Christopher himself — matching his own calendar is noise
        if full_lower not in _EXCLUDED_FULL_NAMES:
            # Extract first name from "John Hardesty" -> "john"
            first = depends_on.split()[0].lower().strip()
            if first and first not in _GENERIC_FIRST_NAMES and len(first) > 2:
                names.append(first)
            # Also keep the full name lowered for exact matching
            if full_lower and full_lower not in _GENERIC_FIRST_NAMES:
                names.append(full_lower)

    # Source 2: KB people lookup — check if any known person's first name appears in text
    if kb_people:
        for full_name in kb_people:
            full_lower = full_name.lower().strip()
            if full_lower in _EXCLUDED_FULL_NAMES:
                continue
            first = full_name.split()[0].lower().strip()
            if first and first not in _GENERIC_FIRST_NAMES and len(first) > 2:
                if first in text_lower:
                    names.append(first)
                    # Also add the full name for stronger matching
                    names.append(full_lower)

    # Source 3: Pattern-based extraction ("with [Name]", "to [Name]", "from [Name]")
    name_patterns = [
        r'\bwith\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)',
        r'\bto\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)',
        r'\bfrom\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)',
        r'\bfor\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)',
    ]
    for pattern in name_patterns:
        for match in re.finditer(pattern, text):
            candidate = match.group(1).strip()
            first = candidate.split()[0].lower()
            if first not in _GENERIC_FIRST_NAMES and len(first) > 2:
                names.append(first)

    # Deduplicate while preserving order
    seen = set()
    unique = []
    for n in names:
        if n not in seen:
            seen.add(n)
            unique.append(n)
    return unique


def _match_person_to_calendar(
    person_names: List[str],
    calendar_day_events: Dict[str, list],
    report_date: Optional[date] = None,
) -> Optional[Dict[str, Any]]:
    """Check if any person name appears in calendar events within +/-24h window.

    Searches event titles and attendee names/emails for matches.

    Args:
        person_names: Lowercase person names/first-names to search for.
        calendar_day_events: Dict of date ISO string -> list of parsed events.
        report_date: The report date (defaults to today).

    Returns:
        Dict with match details or None:
        {
            "person": str,           # matched name
            "event_summary": str,    # calendar event title
            "event_time": str,       # formatted time or "All day"
            "event_date": str,       # ISO date of the event
            "is_yesterday": bool,    # True if event was yesterday
            "is_today": bool,        # True if event is today
            "yesterday_also": bool,  # True if person appears in BOTH yesterday and today
        }
    """
    if not person_names or not calendar_day_events:
        return None

    today = report_date or date.today()
    yesterday = today - timedelta(days=1)
    tomorrow = today + timedelta(days=1)

    # Window: yesterday, today, tomorrow
    window_dates = [yesterday.isoformat(), today.isoformat(), tomorrow.isoformat()]

    matches_by_day = {}  # date_iso -> match_info

    for date_iso in window_dates:
        events = calendar_day_events.get(date_iso, [])
        for ev in events:
            summary_lower = (ev.get("summary") or "").lower()
            attendee_names = []
            for att in ev.get("attendees", []):
                att_name = (att.get("name") or "").lower()
                if att_name:
                    attendee_names.append(att_name)

            # Check each person name against event summary + attendees
            for person in person_names:
                matched = False
                if person in summary_lower:
                    matched = True
                else:
                    for att_name in attendee_names:
                        if person in att_name:
                            matched = True
                            break

                if matched:
                    # Format event time
                    from .calendar_helper import format_time
                    start_dt = ev.get("start_dt")
                    time_str = format_time(start_dt) if start_dt else "All day"

                    matches_by_day[date_iso] = {
                        "person": person,
                        "event_summary": ev.get("summary", "(No title)"),
                        "event_time": time_str,
                        "event_date": date_iso,
                        "is_yesterday": date_iso == yesterday.isoformat(),
                        "is_today": date_iso == today.isoformat(),
                    }
                    break  # One match per day is enough
            if date_iso in matches_by_day:
                break  # Found a match for this day, move on

    if not matches_by_day:
        return None

    # Prefer today's match, then tomorrow's, then yesterday's
    today_iso = today.isoformat()
    tomorrow_iso = tomorrow.isoformat()
    yesterday_iso = yesterday.isoformat()

    best = matches_by_day.get(today_iso) or matches_by_day.get(tomorrow_iso) or matches_by_day.get(yesterday_iso)
    if best is None:
        return None

    # Check for yesterday+today strengthening
    best["yesterday_also"] = (
        yesterday_iso in matches_by_day and today_iso in matches_by_day
    )

    return best


# ── Triage History ───────────────────────────────────────────────────────

class TriageHistory:
    """Loads, saves, and queries the triage decision history."""

    def __init__(self):
        self.data = self._load()

    def _load(self) -> dict:
        """Load triage history from disk, bootstrapping if needed."""
        if TRIAGE_HISTORY_PATH.exists():
            try:
                with open(TRIAGE_HISTORY_PATH, encoding="utf-8") as f:
                    return json.load(f)
            except (json.JSONDecodeError, KeyError):
                pass

        # Bootstrap from existing approvals
        history = {
            "version": "1.0",
            "last_updated": date.today().isoformat(),
            "stats": {"total": 0, "approved": 0, "rejected": 0},
            "decisions": [],
            "learned_rules": {
                "delegation_targets": {},
                "keyword_patterns": {},
                "depends_on_rejection_rate": 0.0,
            },
        }
        self._bootstrap(history)
        self._save(history)
        return history

    def _bootstrap(self, history: dict) -> None:
        """One-time: populate history from .kb-approvals.json + .transcript-kb.json."""
        if not KB_APPROVALS_PATH.exists() or not KB_PATH.exists():
            return

        try:
            with open(KB_APPROVALS_PATH, encoding="utf-8") as f:
                approvals = json.load(f)
            with open(KB_PATH, encoding="utf-8") as f:
                kb = json.load(f)
        except (json.JSONDecodeError, KeyError):
            return

        # Build lookup of KB items by ID
        items_by_id = {}
        for ai in kb.get("action_items", []):
            items_by_id[ai.get("id", "")] = ai

        for item_id, decision_val in approvals.get("approvals", {}).items():
            ai = items_by_id.get(item_id)
            if not ai:
                continue

            if isinstance(decision_val, str) and decision_val == "rejected":
                decision = "rejected"
            elif isinstance(decision_val, dict) and decision_val.get("status") == "open":
                decision = "approved"
            else:
                continue

            history["decisions"].append({
                "item_id": item_id,
                "decision": decision,
                "decision_date": approvals.get("last_updated", ""),
                "item_snapshot": {
                    "text": ai.get("text", ""),
                    "owner": ai.get("owner", ""),
                    "category": ai.get("category", ""),
                    "confidence": ai.get("confidence", ""),
                    "depends_on": ai.get("depends_on"),
                    "source_transcript": ai.get("source_transcript", ""),
                },
                "matched_rules": [],
            })

        # Update stats
        approved = sum(1 for d in history["decisions"] if d["decision"] == "approved")
        rejected = sum(1 for d in history["decisions"] if d["decision"] == "rejected")
        history["stats"] = {
            "total": len(history["decisions"]),
            "approved": approved,
            "rejected": rejected,
        }

        # Compute initial rules
        self._recompute_rules(history)

    def _recompute_rules(self, history: dict) -> None:
        """Derive learned rules from the full decision history."""
        decisions = history["decisions"]
        if not decisions:
            return

        # Delegation targets: track people mentioned in depends_on or text
        target_stats = defaultdict(lambda: {"reject": 0, "approve": 0})
        keyword_stats = defaultdict(lambda: {"reject": 0, "approve": 0})
        depends_reject = 0
        depends_total = 0

        # Known delegation targets (seed list — expanded from decisions)
        known_targets = {
            "chris hibbert", "fatima", "romeo", "chris fleeks",
            "ben marcoux", "nate jones",
        }

        reject_keywords = [
            "follow up on", "follow up with", "work with",
            "coordinate with", "assign", "delegate", "check with",
        ]

        for dec in decisions:
            snap = dec.get("item_snapshot", {})
            decision = dec["decision"]
            text_lower = (snap.get("text") or "").lower()
            depends_on = (snap.get("depends_on") or "").lower()

            # depends_on stats
            if depends_on and depends_on not in ("christopher", "christopher ogle"):
                depends_total += 1
                if decision == "rejected":
                    depends_reject += 1

                # Track as delegation target
                for target in known_targets:
                    if target in depends_on:
                        if decision == "rejected":
                            target_stats[target]["reject"] += 1
                        else:
                            target_stats[target]["approve"] += 1

            # Text mentions of targets
            for target in known_targets:
                if target in text_lower:
                    if decision == "rejected":
                        target_stats[target]["reject"] += 1
                    else:
                        target_stats[target]["approve"] += 1

            # Keyword patterns
            for kw in reject_keywords:
                if kw in text_lower:
                    if decision == "rejected":
                        keyword_stats[kw]["reject"] += 1
                    else:
                        keyword_stats[kw]["approve"] += 1

        # Build delegation target confidence
        delegation_targets = {}
        for target, stats in target_stats.items():
            total = stats["reject"] + stats["approve"]
            if total > 0:
                delegation_targets[target] = {
                    "reject": stats["reject"],
                    "approve": stats["approve"],
                    "confidence": stats["reject"] / total,
                }

        # Build keyword pattern ratios
        keyword_patterns = {}
        for kw, stats in keyword_stats.items():
            total = stats["reject"] + stats["approve"]
            if total > 0:
                keyword_patterns[kw] = {
                    "reject": stats["reject"],
                    "approve": stats["approve"],
                    "ratio": stats["reject"] / total,
                }

        history["learned_rules"] = {
            "delegation_targets": delegation_targets,
            "keyword_patterns": keyword_patterns,
            "depends_on_rejection_rate": (
                depends_reject / depends_total if depends_total > 0 else 0.0
            ),
        }

    def _save(self, history: dict) -> None:
        """Atomic write of triage history."""
        history["last_updated"] = date.today().isoformat()

        if TRIAGE_HISTORY_PATH.exists():
            try:
                backup = TRIAGE_HISTORY_PATH.with_suffix(".bak.json")
                shutil.copy2(str(TRIAGE_HISTORY_PATH), str(backup))
            except OSError:
                pass

        fd, tmp_path = tempfile.mkstemp(
            dir=str(DAILY_BRIEFING_DIR), suffix=".tmp", prefix=".kb-triage-"
        )
        try:
            with os.fdopen(fd, "w", encoding="utf-8") as f:
                json.dump(history, f, indent=2, ensure_ascii=False)
            os.replace(tmp_path, str(TRIAGE_HISTORY_PATH))
        except Exception:
            try:
                os.unlink(tmp_path)
            except OSError:
                pass
            raise

    def record_decision(self, item_id: str, decision: str,
                        item_snapshot: dict,
                        matched_rules: Optional[List[str]] = None,
                        reason_code: Optional[str] = None,
                        reason: Optional[str] = None,
                        session: Optional[str] = None,
                        from_state: Optional[str] = None,
                        to_state: Optional[str] = None,
                        source: Optional[str] = None) -> None:
        """Append a new decision and recompute rules.

        Extended fields (all optional, backward compatible):
            reason_code: Taxonomy code (e.g. 'piggyback_meeting', 'delegation',
                'already_done', 'waiting_on_input', 'urgent_deadline',
                'routine_scheduling', 'not_my_task', 'wrong_owner',
                'automated_task', 'stale', 'calendar_crossref')
            reason: Free-text explanation of the decision
            session: Session identifier (e.g. 'S104')
            from_state: Where the item was (e.g. 'pending', 'scheduled:2026-03-17')
            to_state: Where the item went (e.g. 'scheduled:2026-03-20_a2',
                'removed', 'completed')
            source: Item origin ('transcript', 'clickup', 'manual', 'calendar')
        """
        entry = {
            "item_id": item_id,
            "decision": decision,
            "decision_date": date.today().isoformat(),
            "item_snapshot": item_snapshot,
            "matched_rules": matched_rules or [],
        }
        if reason_code is not None:
            entry["reason_code"] = reason_code
        if reason is not None:
            entry["reason"] = reason
        if session is not None:
            entry["session"] = session
        if from_state is not None:
            entry["from"] = from_state
        if to_state is not None:
            entry["to"] = to_state
        if source is not None:
            entry["source"] = source

        self.data["decisions"].append(entry)

        # Update stats
        approved = sum(1 for d in self.data["decisions"] if d["decision"] == "approved")
        rejected = sum(1 for d in self.data["decisions"] if d["decision"] == "rejected")
        self.data["stats"] = {
            "total": len(self.data["decisions"]),
            "approved": approved,
            "rejected": rejected,
        }

        self._recompute_rules(self.data)
        self._save(self.data)

    def reason_code_distribution(self) -> dict:
        """Count decisions by reason_code. Entries without a code are grouped under None."""
        dist = defaultdict(int)
        for dec in self.data.get("decisions", []):
            code = dec.get("reason_code")
            dist[code] += 1
        return dict(dist)

    def source_rejection_rate(self, source: str) -> float:
        """What percentage of items from a given source get rejected.

        Returns 0.0 if no decisions match the source.
        """
        total = 0
        rejected = 0
        for dec in self.data.get("decisions", []):
            if dec.get("source") == source:
                total += 1
                if dec["decision"] == "rejected":
                    rejected += 1
        return rejected / total if total > 0 else 0.0

    def auto_placement_candidates(self) -> list:
        """Find patterns where the same (reason_code, source) pair has occurred
        3+ times with 100% consistency in placement decision.

        Returns list of dicts with pattern info and suggested action.
        """
        pattern_decisions = defaultdict(list)
        for dec in self.data.get("decisions", []):
            code = dec.get("reason_code")
            src = dec.get("source")
            if code is None:
                continue
            key = (code, src)
            pattern_decisions[key].append(dec["decision"])

        candidates = []
        for (code, src), decisions in pattern_decisions.items():
            if len(decisions) < 3:
                continue
            decision_set = set(decisions)
            if len(decision_set) == 1:
                candidates.append({
                    "reason_code": code,
                    "source": src,
                    "consistent_decision": decisions[0],
                    "count": len(decisions),
                })
        return candidates

    @property
    def rules(self) -> dict:
        return self.data.get("learned_rules", {})

    @property
    def stats(self) -> dict:
        return self.data.get("stats", {})


# ── Pattern Matcher ──────────────────────────────────────────────────────

class PatternMatcher:
    """Score items against learned triage rules."""

    def __init__(self, rules: dict, launches: list = None,
                 stale_config: Optional[dict] = None):
        self.rules = rules
        self.launches = launches or []
        self.stale_config = stale_config or {}

    def score(self, item: dict) -> Tuple[float, List[str]]:
        """Return (score, matched_rules) for a pending item.

        Score ranges from -1.0 (certain reject) to +1.0 (certain approve).
        """
        score = 0.0
        matched = []

        text_lower = (item.get("text") or "").lower()
        depends_on = (item.get("depends_on") or "").lower()
        delegation_targets = self.rules.get("delegation_targets", {})

        # Rule 1: depends_on set and not Christopher
        if depends_on and depends_on not in ("christopher", "christopher ogle"):
            score -= 0.40
            matched.append(f"depends_on:{depends_on}")

            # Additional penalty if known delegation target
            for target, stats in delegation_targets.items():
                if target in depends_on and stats.get("confidence", 0) > 0.70:
                    score -= 0.10
                    matched.append(f"delegation_target:{target}")
                    break

        # Rule 2: text mentions delegation targets
        for target, stats in delegation_targets.items():
            if target in text_lower and stats.get("confidence", 0) > 0.70:
                # Only count if not already caught by depends_on
                if f"delegation_target:{target}" not in matched:
                    score -= 0.35
                    matched.append(f"text_mentions:{target}")
                break

        # Rule 3: keyword patterns
        for pattern, stats in self.rules.get("keyword_patterns", {}).items():
            if pattern in text_lower and stats.get("ratio", 0) > 0.60:
                score -= 0.25 * stats["ratio"]
                matched.append(f"keyword:{pattern}")

        # Rule 4: inferred confidence is weaker signal
        if item.get("confidence") == "inferred":
            score -= 0.10
            matched.append("inferred_confidence")

        # Rule 5: launch proximity boost
        if self.launches:
            launch_boost = self._score_launch_proximity(text_lower)
            if launch_boost > 0:
                score += launch_boost
                matched.append("launch_linked")

        # Rule 6: staleness penalty for old pending items
        if self.stale_config:
            source_date_str = item.get("source_date", "")
            if source_date_str:
                try:
                    source_dt = date.fromisoformat(source_date_str)
                    age_days = (date.today() - source_dt).days
                    stale_days = self.stale_config.get("days", 21)
                    hard_reject_days = self.stale_config.get("hard_reject_days", 35)
                    exempt_keywords = self.stale_config.get("exempt_keywords", [])

                    # Check for scorecard keyword exemption
                    is_exempt = any(
                        kw.lower() in text_lower
                        for kw in exempt_keywords
                    ) if exempt_keywords else False

                    if age_days > hard_reject_days:
                        # Hard reject regardless of keywords
                        score = -1.0
                        matched.append(f"stale:{age_days}d (hard reject)")
                    elif age_days > stale_days and not is_exempt:
                        # Soft penalty — pushes into LEAN/LIKELY REJECT
                        score -= 0.50
                        matched.append(f"stale:{age_days}d")
                except (ValueError, TypeError):
                    pass

        # Clamp
        score = max(-1.0, min(1.0, score))
        return score, matched

    def _score_launch_proximity(self, text_lower: str) -> float:
        """Boost score if item relates to a launch due within 14 days."""
        today = date.today()
        best_boost = 0.0

        for launch in self.launches:
            launch_name = (launch.get("name", "") or "").lower()
            due_ms = launch.get("due_date")
            if not due_ms or not launch_name:
                continue

            similarity = SequenceMatcher(None, text_lower[:80], launch_name[:80]).ratio()
            if similarity < 0.35:
                continue

            try:
                launch_date = date.fromtimestamp(int(due_ms) / 1000)
            except (ValueError, TypeError, OSError):
                continue

            days_until = (launch_date - today).days
            if days_until <= 14:
                best_boost = max(best_boost, 0.40 * similarity)

        return best_boost


# ── ClickUp Matcher ──────────────────────────────────────────────────────

class ClickUpMatcher:
    """Fuzzy-match pending items against ClickUp task names."""

    def __init__(self, clickup_tasks: List[dict], threshold: float = 0.55):
        self.tasks = clickup_tasks
        self.threshold = threshold

    def find_match(self, pending_text: str) -> Optional[dict]:
        """Find best-matching ClickUp task for a pending item.

        Returns {"task_name": str, "task_id": str, "similarity": float}
        or None if no match above threshold.
        """
        best_match = None
        best_score = 0.0

        for task in self.tasks:
            task_name = task.get("name", "")
            sim = _similarity(pending_text, task_name)
            if sim > best_score and sim >= self.threshold:
                best_score = sim
                best_match = {
                    "task_name": task_name,
                    "task_id": task.get("id", ""),
                    "similarity": sim,
                }

        return best_match


# ── Task Classifier ──────────────────────────────────────────────────────

class TaskClassifier:
    """Classify pending items by task type to inform scheduling decisions.

    Categories:
    - scheduling: "book call", "set up meeting" → do ASAP, calendars fill up
    - quick_action: Slack posts, agenda items, emails → fits in any gap
    - deep_work: interviews, briefs, test design → needs focus block
    - strategic: team conversations, evaluations → prefer Monday
    - stale_time_sensitive: "within hours" from a past transcript → reject
    """

    SCHEDULING_KW = [
        "schedule call", "schedule a call", "schedule follow-up",
        "book call", "book a call", "book meeting",
        "set up call", "set up a call", "set up meeting",
    ]
    QUICK_ACTION_KW = [
        "post an update", "post a update", "post an alignment",
        "post update", "add agenda item", "add agenda",
        "send feedback", "send a feedback", "message ",
        "notify ", "email ",
    ]
    DEEP_WORK_KW = [
        "conduct initial interview", "conduct interview",
        "review candidate", "assess them with test",
        "submit a brief", "submit brief", "create ads",
        "write ", "build ", "design ", "outline ",
        "develop ", "draft ", "work on solution",
        "re-test", "test approach",
    ]
    STRATEGIC_KW = [
        "speak with", "talk to", "align on",
        "strategy", "evaluate", "opportunities",
    ]
    TIME_SENSITIVE_PHRASES = [
        "within 1-2 hours", "within a couple hours",
        "within the next couple hours", "within hours",
        "within 1 hour", "within an hour",
    ]

    @classmethod
    def classify(cls, text: str, source_date: str = "") -> dict:
        """Return task type info for scheduling decisions.

        Returns:
            {
                "type": str,          # scheduling | quick_action | deep_work | strategic | general
                "duration_min": int,   # estimated minutes
                "urgency": str,        # today | soon | needs_focus | flexible
                "why": str,            # short reason for placement logic
            }
        """
        text_lower = text.lower()

        # Detect stale time-sensitive items (from past transcripts)
        is_time_sensitive = any(p in text_lower for p in cls.TIME_SENSITIVE_PHRASES)
        if is_time_sensitive and source_date:
            try:
                src_dt = date.fromisoformat(source_date)
                if (date.today() - src_dt).days >= 1:
                    return {
                        "type": "stale_time_sensitive",
                        "duration_min": 0,
                        "urgency": "reject",
                        "why": "Time-sensitive from yesterday — likely stale",
                    }
            except (ValueError, TypeError):
                pass

        # Scheduling tasks — do ASAP before calendars fill
        if any(kw in text_lower for kw in cls.SCHEDULING_KW):
            return {
                "type": "scheduling",
                "duration_min": 10,
                "urgency": "soon",
                "why": "Book while calendars are open",
            }

        # Quick actions — fit in gaps between meetings
        if any(kw in text_lower for kw in cls.QUICK_ACTION_KW):
            return {
                "type": "quick_action",
                "duration_min": 15,
                "urgency": "flexible",
                "why": "Quick task, fits in any gap",
            }

        # Deep work — needs focus block
        if any(kw in text_lower for kw in cls.DEEP_WORK_KW):
            return {
                "type": "deep_work",
                "duration_min": 60,
                "urgency": "needs_focus",
                "why": "Needs focus block time",
            }

        # Strategic conversations
        if any(kw in text_lower for kw in cls.STRATEGIC_KW):
            return {
                "type": "strategic",
                "duration_min": 30,
                "urgency": "flexible",
                "why": "Strategic conversation — prefer Monday",
            }

        # Default: medium task
        return {
            "type": "general",
            "duration_min": 30,
            "urgency": "flexible",
            "why": "",
        }


# ── Schedule Suggester ───────────────────────────────────────────────────

# Max meeting minutes before a day is "full" (fallback when no capacity data)
MAX_MEETING_MINUTES = 180  # 3 hours


class ScheduleSuggester:
    """Suggest the best day + tier to schedule a pending item.

    v2.0: Multi-factor day scoring with task-type awareness.

    Considers:
    - Task type: scheduling tasks → today/tomorrow; deep work → needs focus block
    - Urgency: "book call" gets placed sooner than "work on solution"
    - Capacity fit: deep work only on days with focus time
    - Load balancing: avoids piling everything on one day
    - Day type fit: strategic tasks prefer Monday
    - Today is valid for quick/scheduling tasks (≤20 min)

    Mon-Fri only. Friday overflow rolls to Monday. Never suggests Sat/Sun.
    """

    def __init__(self, calendar_day_loads: Dict[str, dict],
                 day_type_config: Optional[dict] = None,
                 week_capacity: Optional[Dict[str, Any]] = None,
                 existing_day_item_counts: Optional[Dict[str, int]] = None):
        self.day_loads = calendar_day_loads
        self.week_capacity = week_capacity or {}
        self.existing_day_item_counts = existing_day_item_counts or {}

    def suggest_day(self, item: dict, item_score: float = 0.0,
                    task_info: Optional[dict] = None) -> Tuple[Optional[str], str]:
        """Suggest a day + tier for this item.

        Returns:
            (day_str, why_str) tuple.
            day_str: formatted like "Tue Mar 10 as B" or None if no day found.
            why_str: short explanation for why this day was chosen.
        """
        today = date.today()

        if task_info is None:
            task_info = {"type": "general", "duration_min": 30,
                         "urgency": "flexible", "why": ""}

        # Stale time-sensitive items shouldn't be scheduled
        if task_info.get("urgency") == "reject":
            return None, task_info.get("why", "")

        # Determine target tier based on triage score
        target_tier = "A" if item_score >= 0.30 else "B"

        # Capacity-aware path
        if self.week_capacity:
            return self._suggest_with_capacity(today, target_tier, task_info)

        # Fallback: meeting-load-based
        day_str = self._suggest_fallback(today)
        return day_str, ""

    def _suggest_with_capacity(self, today: date, target_tier: str,
                                task_info: dict) -> Tuple[Optional[str], str]:
        """Multi-factor day selection using capacity + task type."""
        candidates = []
        duration = task_info.get("duration_min", 30)

        for date_iso, cap in sorted(self.week_capacity.items()):
            try:
                d = date.fromisoformat(date_iso)
            except (ValueError, TypeError):
                continue

            if d < today:
                continue
            if not cap.is_work_day:
                continue

            is_today = (d == today)

            # Today: only allow quick/scheduling tasks (≤20 min)
            if is_today and duration > 20:
                continue

            # Determine effective tier (downgrade A→B if no A slots)
            effective_tier = target_tier
            if target_tier == "A" and cap.a_task_slots <= 0:
                effective_tier = "B"
            if effective_tier == "B" and cap.b_task_slots <= 0 and not is_today:
                continue

            # Score this day for this specific task
            day_score = self._score_day(d, cap, task_info, is_today)
            candidates.append((d, cap, effective_tier, day_score))

        if not candidates:
            return None, ""

        # Sort by score descending — best fit first
        candidates.sort(key=lambda x: x[3], reverse=True)
        best_day, best_cap, tier, _ = candidates[0]

        day_name = DAY_NAMES[best_day.weekday()]
        date_str = best_day.strftime("%b %d")
        day_str = f"{day_name} {date_str} as {tier}"

        why = self._explain_placement(best_day, best_cap, task_info, tier)
        return day_str, why

    def _score_day(self, d: date, cap, task_info: dict, is_today: bool) -> float:
        """Score a day for a specific task. Higher = better fit."""
        score = 0.0
        urgency = task_info.get("urgency", "flexible")
        duration = task_info.get("duration_min", 30)
        task_type = task_info.get("type", "general")
        days_out = (d - date.today()).days

        # 1. Urgency: scheduling tasks prefer sooner
        if urgency == "soon":
            # Strong preference for today/tomorrow — calendars fill up
            score += max(0.0, 1.0 - days_out * 0.25)
        elif urgency == "needs_focus":
            # Prefer days with focus blocks, timing less critical
            score += min(1.0, cap.focus_minutes / 150.0)
        else:
            # Flexible: slight preference for sooner but not strong
            score += max(0.0, 0.5 - days_out * 0.05)

        # 2. Capacity fit — enough room for this task?
        if duration <= 20:
            # Quick tasks fit anywhere with any capacity
            score += 0.4 if cap.total_available >= 30 else 0.1
        elif duration >= 45:
            # Deep work needs focus time
            if cap.focus_minutes >= duration:
                score += 0.6
            elif cap.total_available >= duration:
                score += 0.3
            else:
                score -= 0.2  # Day can't fit this task
        else:
            # Medium tasks prefer afternoon slots
            if cap.afternoon_minutes >= duration:
                score += 0.5
            elif cap.total_available >= duration:
                score += 0.3

        # 3. Load balancing — avoid overloaded days
        existing = self.existing_day_item_counts.get(d.isoformat(), 0)
        if existing >= 6:
            score -= 0.4
        elif existing >= 4:
            score -= 0.2

        # 4. Day type fit — strategic tasks prefer Monday
        if task_type == "strategic" and cap.day_type == "strategic":
            score += 0.3
        elif task_type == "strategic" and cap.day_type != "strategic":
            score -= 0.1

        # 5. Today bonus for quick/scheduling tasks
        if is_today and duration <= 20:
            score += 0.3

        return score

    def _explain_placement(self, d: date, cap, task_info: dict, tier: str) -> str:
        """Generate a short reason for this placement."""
        reasons = []
        urgency = task_info.get("urgency", "flexible")
        task_why = task_info.get("why", "")
        duration = task_info.get("duration_min", 30)
        task_type = task_info.get("type", "general")
        days_out = (d - date.today()).days

        if days_out == 0:
            reasons.append("fits today's gaps")
        elif urgency == "soon":
            reasons.append("book while calendars are open")

        if task_why and task_why not in reasons:
            reasons.append(task_why)

        if duration >= 45 and cap.focus_minutes >= 60:
            fh, fm = divmod(cap.focus_minutes, 60)
            focus_str = f"{fh}h{fm}m" if fm else f"{fh}h"
            reasons.append(f"{focus_str} focus available")

        if task_type == "strategic" and cap.day_type == "strategic":
            reasons.append("strategic day")

        existing = self.existing_day_item_counts.get(d.isoformat(), 0)
        if existing <= 2:
            reasons.append("light day")

        return "; ".join(reasons[:2]) if reasons else ""

    def _suggest_fallback(self, today: date) -> Optional[str]:
        """Fallback: suggest based on meeting load (no capacity data)."""
        if not self.day_loads:
            return None

        candidates = []
        for offset in range(1, 8):
            d = today + timedelta(days=offset)
            if d.weekday() not in WORK_WEEKDAYS:
                continue

            iso = d.isoformat()
            load = self.day_loads.get(iso, {"meeting_count": 0, "meeting_minutes": 0})
            meeting_mins = load.get("meeting_minutes", 0)

            if meeting_mins > MAX_MEETING_MINUTES:
                continue

            load_score = 1.0 - (meeting_mins / MAX_MEETING_MINUTES)
            candidates.append((d, load_score))

        if not candidates:
            return None

        candidates.sort(key=lambda x: x[1], reverse=True)
        best_day = candidates[0][0]
        day_name = DAY_NAMES[best_day.weekday()]
        date_str = best_day.strftime("%b %d")
        return f"{day_name} {date_str}"


# ── Auto-Routing ────────────────────────────────────────────────────────


def route_depends_on_items(
    pending_items: List[dict],
    config: dict,
) -> Tuple[List[dict], List[dict]]:
    """Split pending items into triage vs waiting_on.

    Items where depends_on is set and is NOT Christopher are routed
    to the Waiting On list (they skip triage entirely).

    Args:
        pending_items: All pending action items.
        config: Full config dict (reads intelligence.auto_route_depends).

    Returns:
        (triage_items, waiting_on_items)
    """
    intel_config = config.get("intelligence", {})
    if not intel_config.get("auto_route_depends", True):
        return pending_items, []

    christopher_names = {"christopher", "christopher ogle", "chris ogle", ""}
    triage = []
    waiting_on = []

    for item in pending_items:
        depends_on = (item.get("depends_on") or "").strip().lower()
        if depends_on and depends_on not in christopher_names:
            item["_waiting_on"] = item.get("depends_on", "")
            waiting_on.append(item)
        else:
            triage.append(item)

    return triage, waiting_on


# ── Duplicate Detection ──────────────────────────────────────────────────


def _dedup_similarity(text_a: str, text_b: str) -> float:
    """Combined similarity score using sequence matching + word overlap.

    SequenceMatcher alone misses semantic duplicates like:
    - "Schedule call with Samuel" vs "Schedule follow-up call with Sam Mercado"
    - "Add agenda item to Monday media call" vs "Add agenda item for next Monday's media call"

    Hybrid approach: max(sequence_ratio, jaccard_word_overlap) gives better
    dedup accuracy for transcript-extracted items with different phrasing.
    """
    a_lower = text_a.lower().strip()
    b_lower = text_b.lower().strip()

    # Standard sequence matching
    seq_score = SequenceMatcher(None, a_lower, b_lower).ratio()

    # Word-level Jaccard overlap (ignores word order, catches semantic dupes)
    stop_words = {"the", "a", "an", "to", "for", "and", "with", "on", "in",
                  "of", "is", "at", "by", "or", "from", "that", "this"}
    words_a = {w for w in a_lower.split() if w not in stop_words and len(w) > 2}
    words_b = {w for w in b_lower.split() if w not in stop_words and len(w) > 2}

    if words_a and words_b:
        intersection = words_a & words_b
        union = words_a | words_b
        jaccard = len(intersection) / len(union) if union else 0.0
    else:
        jaccard = 0.0

    return max(seq_score, jaccard)


def deduplicate_pending_items(items: List[dict],
                              threshold: float = 0.52) -> List[dict]:
    """Merge duplicate pending items from multiple transcript passes.

    When the same action item appears in two transcripts (e.g., "CRO Weekly"
    processed twice), items with combined similarity >= threshold are merged.
    Uses hybrid matching (sequence + word overlap) to catch semantic duplicates.

    The first occurrence is kept; duplicates are recorded in _merged_from.

    Returns:
        Deduplicated list of items. Merged items have:
        - _merged_count: int (total including self)
        - _merged_from: list of {"id": str, "source": str}
    """
    if len(items) <= 1:
        return items

    merged = []
    used = set()

    for i, item_a in enumerate(items):
        if i in used:
            continue

        text_a = item_a.get("text") or ""
        group = [item_a]

        for j in range(i + 1, len(items)):
            if j in used:
                continue
            text_b = items[j].get("text") or ""
            if _dedup_similarity(text_a, text_b) >= threshold:
                group.append(items[j])
                used.add(j)

        # Keep the first item, annotate if duplicates found
        result_item = group[0].copy()
        if len(group) > 1:
            result_item["_merged_from"] = [
                {"id": g.get("id", ""), "source": g.get("source_transcript", "")}
                for g in group[1:]
            ]
            result_item["_merged_count"] = len(group)

        merged.append(result_item)
        used.add(i)

    return merged


# ── Cross-Reference Filter ───────────────────────────────────────────────


def filter_already_handled(
    pending_items: List[dict],
    shared_state: dict,
    threshold: float = 0.75,
    kb_data: Optional[dict] = None,
    manual_data: Optional[dict] = None,
) -> Tuple[List[dict], dict]:
    """Filter pending items already handled elsewhere (calendar, tracker, ClickUp).

    Checks three sources:
    1. Action Items Tracker — items already scheduled in .kb-schedule.json + .kb-manual-items.json
    2. Google Calendar — scheduling-type items where a matching meeting already exists
    3. ClickUp completed — items matching recently completed ClickUp tasks

    Args:
        kb_data: Pre-loaded, post-approval KB dict. If provided, used instead of
            re-reading from disk (avoids stale status bug where approved items
            still show as "pending" on disk).
        manual_data: Pre-loaded manual items dict. Same rationale as kb_data.

    Returns:
        (kept_items, filter_stats) where filter_stats = {
            "already_scheduled": int,
            "already_on_calendar": int,
            "completed_in_clickup": int,
            "total_filtered": int,
        }
    """
    stats = {
        "already_scheduled": 0,
        "already_on_calendar": 0,
        "completed_in_clickup": 0,
        "total_filtered": 0,
    }

    # Build reference texts from scheduled/open/waiting-on items (tracker)
    tracker_texts = []
    try:
        schedule = _load_schedule()
        # Use pre-loaded KB if available (has approvals applied), else read from disk
        kb = kb_data
        if kb is None and KB_PATH.exists():
            with open(KB_PATH, encoding="utf-8") as f:
                kb = json.load(f)
        if kb:
            for ai in kb.get("action_items", []):
                aid = ai.get("id", "")
                # Include open, waiting-on, and scheduled items
                if ai.get("status") in ("open", "waiting_on") or aid in schedule or ai.get("depends_on"):
                    tracker_texts.append(ai.get("text", "").lower().strip())
        # Use pre-loaded manual items if available, else read from disk
        manual = manual_data
        if manual is None and KB_MANUAL_ITEMS_PATH.exists():
            with open(KB_MANUAL_ITEMS_PATH, encoding="utf-8") as f:
                manual = json.load(f)
        if manual:
            for ai in manual.get("action_items", []):
                aid = ai.get("id", "")
                if ai.get("status") in ("open", "waiting_on") or aid in schedule or ai.get("depends_on"):
                    tracker_texts.append(ai.get("text", "").lower().strip())
    except Exception:
        pass

    # Build calendar event summaries for matching scheduling-type items
    calendar_summaries = []
    try:
        cal_events = shared_state.get("calendar_day_events", {})
        for _day, events in cal_events.items():
            for ev in events:
                summary = (ev.get("summary") or "").lower().strip()
                if summary:
                    calendar_summaries.append(summary)
                # Also include attendee names
                for att in ev.get("attendees", []):
                    name = (att.get("displayName") or att.get("email", "").split("@")[0] or "").lower()
                    if name:
                        calendar_summaries.append(name)
    except Exception:
        pass

    # Build ClickUp completed task texts (check for "closed" status tasks)
    clickup_completed_texts = []
    try:
        # shared_state only has active tasks; check if any have status indicating completion
        clickup_tasks = shared_state.get("clickup_tasks", [])
        for task in clickup_tasks:
            status = (task.get("status") or "").lower()
            if status in ("closed", "complete", "done", "resolved"):
                clickup_completed_texts.append(task.get("name", "").lower().strip())
    except Exception:
        pass

    kept = []
    for item in pending_items:
        text = (item.get("text") or "").lower().strip()
        filtered = False

        # Skip items with depends_on — these route to Waiting On section, not filtered here
        if item.get("depends_on"):
            kept.append(item)
            continue

        # Check 1: Already on Action Items Tracker
        if tracker_texts:
            for tt in tracker_texts:
                if tt and _similarity(text, tt) >= threshold:
                    stats["already_scheduled"] += 1
                    filtered = True
                    break

        # Check 2: Calendar match (entity-aware)
        # Offer-name matches apply to ALL items (if a pending item mentions SF2
        # and there's an SF2 call on the calendar, it's already handled).
        # Keyword-depth and person-name matches only apply to scheduling-type items.
        if not filtered and calendar_summaries:
            item_keywords = _extract_topic_keywords(text)
            item_offer_names = item_keywords & _OFFER_NAMES
            is_scheduling = False
            if item_offer_names or True:  # always extract keywords
                for cal_summary in calendar_summaries:
                    cal_keywords = _extract_topic_keywords(cal_summary)
                    shared = item_keywords & cal_keywords
                    has_offer_match = bool(shared & _OFFER_NAMES)
                    # Offer match: filter any item type
                    if has_offer_match:
                        stats["already_on_calendar"] += 1
                        filtered = True
                        break
                    # Keyword depth + person match: only for scheduling items
                    if not is_scheduling:
                        task_info = TaskClassifier.classify(
                            item.get("text", ""),
                            source_date=item.get("source_date", ""),
                        )
                        is_scheduling = task_info.get("type") == "scheduling"
                    if is_scheduling:
                        has_keyword_depth = len(shared) >= 2
                        if has_keyword_depth:
                            stats["already_on_calendar"] += 1
                            filtered = True
                            break
                        depends = (item.get("depends_on") or "").lower()
                        if depends and depends in cal_summary:
                            stats["already_on_calendar"] += 1
                            filtered = True
                            break

        # Check 3: ClickUp completed match
        if not filtered and clickup_completed_texts:
            for ct in clickup_completed_texts:
                if ct and _similarity(text, ct) >= threshold:
                    stats["completed_in_clickup"] += 1
                    filtered = True
                    break

        if not filtered:
            kept.append(item)

    stats["total_filtered"] = len(pending_items) - len(kept)
    return kept, stats


# ── Orchestrator ─────────────────────────────────────────────────────────

def enrich_pending_items(
    pending_items: List[dict],
    shared_state: dict,
    config: dict,
) -> Dict[str, dict]:
    """Score and enrich all pending items with triage intelligence.

    v2.0: Adds task-type classification, urgency-aware scheduling,
    multi-factor day scoring, and "why" reasoning for each placement.

    Args:
        pending_items: List of pending action item dicts from KB.
        shared_state: Shared state from daily_briefing.py (may contain
            calendar_day_loads and clickup_tasks).
        config: Full config dict (reads triage_intelligence section).

    Returns:
        Dict mapping item_id -> enrichment dict:
        {
            "score": float,
            "classification": str,
            "matched_rules": list,
            "clickup_match": Optional[dict],
            "suggested_day": Optional[str],
            "suggestion_why": str,
            "task_type": str,
            "estimated_minutes": int,
        }
    """
    ti_config = config.get("modules", {}).get("triage_intelligence", {})
    if not ti_config.get("enabled", True):
        return {}

    # Initialize components
    history = TriageHistory()
    launches = shared_state.get("launches", [])
    intel_config = config.get("intelligence", {})
    stale_config = {
        "days": intel_config.get("stale_pending_days", 21),
        "hard_reject_days": intel_config.get("stale_hard_reject_days", 35),
        "exempt_keywords": intel_config.get("scorecard_keywords", []),
    }
    matcher = PatternMatcher(history.rules, launches=launches, stale_config=stale_config)

    # ClickUp matcher (from pre-fetched data)
    clickup_tasks = shared_state.get("clickup_tasks", [])
    cu_threshold = ti_config.get("clickup_match_threshold", 0.55)
    cu_matcher = ClickUpMatcher(clickup_tasks, cu_threshold)

    # Build existing day item counts for load balancing
    existing_day_item_counts: Dict[str, int] = {}
    try:
        from .transcript_kb import load_schedule
        schedule = load_schedule()
        for _item_id, sched_date in schedule.items():
            if sched_date:
                existing_day_item_counts[sched_date] = (
                    existing_day_item_counts.get(sched_date, 0) + 1
                )
    except Exception:
        pass  # Graceful degradation

    # Schedule suggester (capacity-aware when available)
    cal_loads = shared_state.get("calendar_day_loads", {})
    week_capacity = shared_state.get("week_capacity", {})
    suggester = ScheduleSuggester(
        cal_loads,
        week_capacity=week_capacity,
        existing_day_item_counts=existing_day_item_counts,
    )

    # Entity-first calendar matching: load KB people + calendar events
    kb_people = None
    calendar_day_events = shared_state.get("calendar_day_events", {})
    entity_calendar_enabled = intel_config.get("entity_calendar_match", True)
    if entity_calendar_enabled and calendar_day_events:
        try:
            from .transcript_kb import load_kb as _load_kb_for_people
            _kb_temp = _load_kb_for_people()
            kb_people = _kb_temp.get("people", {})
        except Exception:
            kb_people = None  # Graceful degradation — pattern extraction still works

    # Auto-approve threshold (Phase 5)
    auto_approve_threshold = intel_config.get("auto_approve_threshold", None)
    auto_approve_enabled = auto_approve_threshold is not None and auto_approve_threshold > 0

    enrichments = {}
    auto_approved_items = []

    for item in pending_items:
        item_id = item.get("id", "")
        if not item_id:
            continue

        # Classify task type for intelligent scheduling
        task_info = TaskClassifier.classify(
            item.get("text", ""),
            source_date=item.get("source_date", ""),
        )

        # Pattern score
        pattern_score, matched_rules = matcher.score(item)

        # ClickUp match bonus
        clickup_match = cu_matcher.find_match(item.get("text", ""))
        if clickup_match:
            pattern_score += 0.30
            matched_rules.append(f"clickup_match:{clickup_match['task_name'][:40]}")

        # Entity-first calendar overlap detection
        calendar_overlap = None
        if entity_calendar_enabled and calendar_day_events:
            try:
                person_names = _extract_person_names(item, kb_people=kb_people)
                if person_names:
                    cal_match = _match_person_to_calendar(
                        person_names, calendar_day_events
                    )
                    if cal_match:
                        calendar_overlap = cal_match
                        matched_rules.append(f"calendar_overlap:{cal_match['person']}")
            except Exception:
                pass  # Graceful degradation

        # Clamp after bonuses
        score = max(-1.0, min(1.0, pattern_score))

        # Day + tier suggestion (only for items leaning toward approve)
        suggested_day = None
        suggestion_why = ""
        if score > -0.20:
            suggested_day, suggestion_why = suggester.suggest_day(
                item, item_score=score, task_info=task_info,
            )

        # Auto-approve if score exceeds threshold (Phase 5)
        auto_approved = False
        if auto_approve_enabled and score >= auto_approve_threshold:
            auto_approved = True
            matched_rules.append("auto_approved")
            auto_approved_items.append({
                "item_id": item_id,
                "text": item.get("text", ""),
                "score": round(score, 2),
                "suggested_day": suggested_day,
            })

        enrichments[item_id] = {
            "score": round(score, 2),
            "classification": classify_score(score),
            "matched_rules": matched_rules,
            "clickup_match": clickup_match,
            "suggested_day": suggested_day,
            "suggestion_why": suggestion_why,
            "task_type": task_info.get("type", "general"),
            "estimated_minutes": task_info.get("duration_min", 30),
            "auto_approved": auto_approved,
            "merged_count": item.get("_merged_count", 1),
            "calendar_overlap": calendar_overlap,
        }

    # Store auto-approved items in shared_state for M00a and M00 to consume
    if auto_approved_items and shared_state is not None:
        shared_state["auto_approved_items"] = auto_approved_items

    return enrichments
