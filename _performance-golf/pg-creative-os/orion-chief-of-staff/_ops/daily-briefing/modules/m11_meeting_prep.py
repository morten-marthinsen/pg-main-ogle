"""Module 11: Meeting Prep Intelligence

Detects recurring meetings from transcript filename patterns, identifies
likely upcoming meetings, and generates per-meeting prep briefs using
KB context (attendees, open action items, recent decisions, active topics).

Filename convention: MMDDYY-meeting-name-slug.md
Recurring detection: similar slugs appearing >1 time across transcripts.
"""

import re
from collections import Counter, defaultdict
from datetime import date, timedelta
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any, Optional

from .base import BriefingModule, MODULES_DIR
from .scorecard_context import current_day, get_scorecard_prompt
from .transcript_kb import load_kb, kb_stats

TRANSCRIPTS_DIR = MODULES_DIR.parent.parent / "meetings" / "transcripts"

# How many days back to look for recent meetings
LOOKBACK_DAYS = 30
# Minimum occurrences for a meeting to be "recurring"
MIN_RECURRENCES = 2
# Max meetings to prep for in a single run
MAX_PREP_MEETINGS = 3
# Similarity threshold for grouping meeting slugs
SLUG_SIMILARITY = 0.70

# Common name fragments that indicate attendees in slug
# Maps slug fragments → full names (populated from KB people)
KNOWN_ALIASES = {
    "christopher": "Christopher",
    "ogle": "Christopher",
    "chris": "Christopher",
    "john": "John",
    "brixton": "Brixton",
    "jeff": "Jeff",
    "jojo": "Jojo",
    "fatima": "Fatima",
    "jenni": "Jenni",
    "romeo": "Romeo",
    "morton": "Morton",
    "fleeks": "Fleeks",
    "liv": "Liv",
}


def _parse_filename(filename: str) -> dict:
    """Parse MMDDYY-slug.md into structured data."""
    stem = Path(filename).stem
    match = re.match(r"(\d{2})(\d{2})(\d{2})-(.*)", stem)
    if not match:
        return {"date": None, "slug": stem, "stem": stem}

    mm, dd, yy = match.group(1), match.group(2), match.group(3)
    slug = match.group(4)
    try:
        meeting_date = date(2000 + int(yy), int(mm), int(dd))
    except ValueError:
        meeting_date = None

    return {"date": meeting_date, "slug": slug, "stem": stem}


def _normalize_slug(slug: str) -> str:
    """Remove date-like prefixes and common noise words for grouping."""
    # Remove trailing numbers that might be disambiguation
    slug = re.sub(r"-\d+$", "", slug)
    # Remove "transcript" suffix
    slug = re.sub(r"-transcript$", "", slug)
    return slug


def _extract_attendees_from_slug(slug: str) -> list:
    """Extract likely attendee names from a meeting slug."""
    parts = slug.lower().split("-")
    attendees = set()
    for part in parts:
        if part in KNOWN_ALIASES:
            attendees.add(KNOWN_ALIASES[part])
    return sorted(attendees)


def _group_meetings(parsed_files: list) -> dict:
    """Group meetings by similarity into recurring series.

    Returns: {canonical_slug: [list of parsed meeting dicts]}
    """
    groups = defaultdict(list)
    canonical_map = {}  # normalized_slug -> canonical_slug

    for pf in parsed_files:
        norm = _normalize_slug(pf["slug"])

        # Try to match to existing canonical slug
        best_match = None
        best_score = 0
        for canon in canonical_map:
            score = SequenceMatcher(None, norm, canon).ratio()
            if score > best_score:
                best_score = score
                best_match = canon

        if best_match and best_score >= SLUG_SIMILARITY:
            canonical = canonical_map[best_match]
            groups[canonical].append(pf)
        else:
            # New group
            canonical_map[norm] = norm
            groups[norm].append(pf)

    return dict(groups)


def _detect_cadence(dates: list) -> str:
    """Detect meeting cadence from a list of dates."""
    if len(dates) < 2:
        return "one-off"

    dates = sorted(dates)
    gaps = [(dates[i + 1] - dates[i]).days for i in range(len(dates) - 1)]
    avg_gap = sum(gaps) / len(gaps)

    if avg_gap <= 2:
        return "daily"
    elif avg_gap <= 9:
        return "weekly"
    elif avg_gap <= 18:
        return "biweekly"
    elif avg_gap <= 35:
        return "monthly"
    return "irregular"


def _predict_next(dates: list, cadence: str, today: date) -> Optional[date]:
    """Predict the next occurrence based on cadence."""
    if not dates:
        return None

    last = max(dates)
    gap_map = {"daily": 1, "weekly": 7, "biweekly": 14, "monthly": 30}
    gap = gap_map.get(cadence)
    if not gap:
        return None

    predicted = last + timedelta(days=gap)
    # If predicted is in the past, advance to next occurrence
    while predicted < today:
        predicted += timedelta(days=gap)

    return predicted


class MeetingPrepModule(BriefingModule):
    name = "Meeting Prep Intelligence"
    key = "m11_meeting_prep"
    setup_required = "Depends on M9 (Transcript Intelligence)"

    def fetch_data(self) -> Any:
        kb = load_kb()
        stats = kb_stats(kb)
        today = date.today()
        cutoff = today - timedelta(days=LOOKBACK_DAYS)

        if not TRANSCRIPTS_DIR.exists():
            return {"meetings_to_prep": [], "kb": kb, "stats": stats}

        # Parse all transcript filenames
        all_parsed = []
        for md_file in sorted(TRANSCRIPTS_DIR.rglob("*.md")):
            rel = str(md_file.relative_to(TRANSCRIPTS_DIR))
            parsed = _parse_filename(md_file.name)
            parsed["rel_path"] = rel
            all_parsed.append(parsed)

        # Group into meeting series
        groups = _group_meetings(all_parsed)

        # Identify recurring meetings with recent activity
        recurring = []
        for slug, meetings in groups.items():
            if len(meetings) < MIN_RECURRENCES:
                continue

            dates = [m["date"] for m in meetings if m["date"]]
            if not dates:
                continue

            recent_dates = [d for d in dates if d >= cutoff]
            if not recent_dates:
                continue  # No recent activity

            cadence = _detect_cadence(dates)
            predicted_next = _predict_next(dates, cadence, today)

            # Extract attendees from slug
            attendees = _extract_attendees_from_slug(slug)

            # Score: prioritize meetings happening soon
            urgency = 0
            if predicted_next:
                days_until = (predicted_next - today).days
                if days_until <= 1:
                    urgency = 3  # Today or tomorrow
                elif days_until <= 3:
                    urgency = 2  # This week
                elif days_until <= 7:
                    urgency = 1

            recurring.append({
                "slug": slug,
                "occurrences": len(meetings),
                "cadence": cadence,
                "last_date": max(dates),
                "predicted_next": predicted_next,
                "attendees": attendees,
                "urgency": urgency,
                "recent_count": len(recent_dates),
            })

        # Sort by urgency (highest first), then by last_date (most recent first)
        recurring.sort(key=lambda x: (-x["urgency"], -x["last_date"].toordinal()))

        # Take top N for prep
        meetings_to_prep = recurring[:MAX_PREP_MEETINGS]

        # Enrich with KB context for each meeting
        for meeting in meetings_to_prep:
            meeting["kb_context"] = self._gather_kb_context(
                kb, meeting["attendees"], meeting["slug"]
            )

        return {
            "meetings_to_prep": meetings_to_prep,
            "all_recurring": recurring,
            "kb": kb,
            "stats": stats,
        }

    def _gather_kb_context(self, kb: dict, attendees: list, slug: str) -> dict:
        """Pull relevant KB context for a specific meeting's attendees."""
        context = {
            "open_actions_by_person": {},
            "recent_decisions": [],
            "related_topics": [],
        }

        today = date.today()
        cutoff_14d = (today - timedelta(days=14)).isoformat()

        # Open action items for each attendee
        for name in attendees:
            if name == "Christopher":
                continue  # Christopher is always there; focus on others' items
            items = []
            for ai in kb.get("action_items", []):
                if ai.get("status") != "open":
                    continue
                owner = (ai.get("owner") or "").strip()
                if owner.lower() == name.lower() or name.lower() in owner.lower():
                    items.append({
                        "text": ai["text"],
                        "age": ai.get("last_mentioned", ai.get("source_date", "")),
                    })
            if items:
                context["open_actions_by_person"][name] = items[:5]

        # Christopher's own open items (relevant to bring up)
        christopher_items = []
        for ai in kb.get("action_items", []):
            if ai.get("status") != "open":
                continue
            owner = (ai.get("owner") or "").strip().lower()
            if owner in ("christopher", "christopher ogle", "ogle", "chris"):
                christopher_items.append({"text": ai["text"]})
        if christopher_items:
            context["open_actions_by_person"]["Christopher (you)"] = christopher_items[:5]

        # Recent decisions that involved these attendees
        for dec in kb.get("decisions", []):
            if dec.get("source_date", "") < cutoff_14d:
                continue
            made_by = [n.lower() for n in dec.get("made_by", [])]
            if any(a.lower() in " ".join(made_by) for a in attendees):
                context["recent_decisions"].append(dec["text"])

        # Topics related to meeting slug keywords
        slug_words = set(slug.lower().split("-")) - {
            "sync", "call", "meeting", "review", "check", "in", "and", "the",
            "a", "x", "quick",
        }
        for topic in kb.get("topics", []):
            if topic.get("status") != "active":
                continue
            topic_words = set(topic["name"].lower().split())
            if slug_words & topic_words:
                context["related_topics"].append({
                    "name": topic["name"],
                    "mentions": topic.get("mention_count", 1),
                })

        return context

    def analyze(self, data: Any) -> str:
        meetings = data["meetings_to_prep"]
        all_recurring = data["all_recurring"]
        stats = data["stats"]
        day = current_day()

        if not all_recurring:
            return (
                f"_No recurring meetings detected in the last {LOOKBACK_DAYS} days. "
                f"({stats['transcripts_processed']} transcripts in KB)_\n"
            )

        if not meetings:
            # Have recurring but none urgent enough
            summary = f"**{len(all_recurring)} recurring meeting series** detected. "
            summary += "None predicted within the next 7 days.\n\n"
            summary += "_Series:_ " + ", ".join(
                f"{m['slug']} ({m['cadence']})" for m in all_recurring[:5]
            )
            if len(all_recurring) > 5:
                summary += f" _+{len(all_recurring) - 5} more_"
            return summary + "\n"

        # Build prep briefs via AI
        scorecard_prompt = get_scorecard_prompt()

        prep_context = []
        for m in meetings:
            ctx = m["kb_context"]
            block = [
                f"MEETING: {m['slug'].replace('-', ' ').title()}",
                f"  Cadence: {m['cadence']} | Last: {m['last_date']}",
            ]
            if m["predicted_next"]:
                days_until = (m["predicted_next"] - date.today()).days
                if days_until <= 0:
                    block.append(f"  Predicted: TODAY or overdue")
                elif days_until == 1:
                    block.append(f"  Predicted: TOMORROW")
                else:
                    block.append(f"  Predicted: {m['predicted_next']} ({days_until}d)")

            if m["attendees"]:
                block.append(f"  Attendees: {', '.join(m['attendees'])}")

            if ctx["open_actions_by_person"]:
                block.append("  Open action items:")
                for person, items in ctx["open_actions_by_person"].items():
                    for item in items:
                        block.append(f"    - [{person}] {item['text']}")

            if ctx["recent_decisions"]:
                block.append("  Recent decisions:")
                for dec in ctx["recent_decisions"][:3]:
                    block.append(f"    - {dec}")

            if ctx["related_topics"]:
                block.append("  Related active topics:")
                for t in ctx["related_topics"][:3]:
                    block.append(f"    - {t['name']} ({t['mentions']} mentions)")

            prep_context.append("\n".join(block))

        full_context = "\n\n".join(prep_context)

        analysis = self.call_anthropic(
            system_prompt=(
                "You are Orion, Christopher Ogle's Chief of Staff. Generate concise "
                "meeting prep briefs for his upcoming meetings.\n\n"
                f"{scorecard_prompt}\n\n"
                "For each meeting, provide:\n"
                "1. **Key agenda items** Christopher should raise (based on open "
                "action items and recent decisions)\n"
                "2. **Follow-ups to check** (stale items owned by attendees)\n"
                "3. **Scorecard connection** (which 30/60/90 metric this meeting advances)\n\n"
                "Rules:\n"
                "- Be specific and actionable. No generic advice.\n"
                "- If KB context is thin for a meeting, say so briefly.\n"
                "- Prioritize items that advance the scorecard.\n"
                "- Use bullet points. Keep each meeting's prep to 4-6 lines.\n"
                "- If no action items or decisions exist for attendees, focus on "
                "what Christopher should ASK or PROPOSE based on scorecard gaps.\n"
            ),
            user_content=(
                f"Day {day} of 90. Prepare Christopher for these meetings:\n\n"
                f"{full_context}"
            ),
            max_tokens=600,
        )

        # Add cadence summary footer
        footer_lines = [
            "",
            f"_Recurring series detected: {len(all_recurring)} | "
            f"Prepped: {len(meetings)}_",
        ]

        return analysis + "\n".join(footer_lines)
