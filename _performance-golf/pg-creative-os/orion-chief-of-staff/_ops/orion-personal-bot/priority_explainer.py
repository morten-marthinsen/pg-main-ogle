"""Priority Explainer — generates "because" reasoning for scheduling suggestions.

Covers 5 components:
1. Day type — why this day (strategic Mon vs execution Tue-Fri)
2. Score breakdown — which factors contributed, with weights
3. Relative position — what's above/below this task and why
4. Capacity context — slots remaining, why not an earlier/later day
5. Alternatives rejected — "Monday full", "Wednesday has 3 A-tasks", etc.
"""

from datetime import date
from typing import Optional


DAY_TYPE_LABELS = {
    "strategic": "Strategic day (Monday)",
    "execution": "Execution day (Tue-Fri)",
    "off": "Weekend (off)",
}

FACTOR_LABELS = {
    "launch": "launch proximity",
    "overdue": "overdue",
    "deadline": "deadline",
    "scorecard": "scorecard match",
    "day_type": "day-type fit",
}

FACTOR_WEIGHTS = {
    "launch": 0.30,
    "overdue": 0.25,
    "deadline": 0.20,
    "scorecard": 0.15,
    "day_type": 0.10,
}


def explain_suggestion(
    task_text: str,
    suggestion: dict,
) -> str:
    """Generate a human-readable "because" explanation.

    Args:
        task_text: The task title
        suggestion: Output from kb_ops.suggest_schedule()

    Returns:
        Multi-line explanation string for Slack display.
    """
    parts = []

    # 1. Day type
    day_type = suggestion.get("day_type", "execution")
    parts.append(DAY_TYPE_LABELS.get(day_type, day_type.capitalize()))

    # 2. Score breakdown
    score = suggestion.get("score", 0)
    breakdown = suggestion.get("score_breakdown", {})
    score_parts = []
    for factor, raw_score in sorted(breakdown.items(), key=lambda x: x[1], reverse=True):
        if raw_score > 0:
            weighted = raw_score * FACTOR_WEIGHTS.get(factor, 0)
            label = FACTOR_LABELS.get(factor, factor)
            score_parts.append(f"{label} (+{weighted:.2f})")

    score_str = f"Scores {score:.2f}"
    if score_parts:
        score_str += " — " + ", ".join(score_parts[:3])
    parts.append(score_str)

    # 3. Relative position
    existing = suggestion.get("existing_tasks", [])
    tier = suggestion.get("tier", "C")
    position = suggestion.get("position")

    if existing:
        higher = [t for t in existing if t.get("score", 0) > score]
        if higher:
            top = higher[0]
            parts.append(
                f"{len(higher)} higher-priority {tier}-task(s) already scheduled "
                f"(top: {top['text'][:40]}, {top['score']:.2f})"
            )
        else:
            parts.append(f"Highest-priority {tier}-task for this day")
    else:
        parts.append(f"First {tier}-task for this day")

    # 4. Capacity context
    slots = suggestion.get("slots_remaining")
    if slots is not None:
        total = 3
        used = total - slots
        parts.append(f"{used} of {total} {tier}-slots used")

    # 5. Position label
    if position and tier in ("A", "B"):
        parts.append(f"Position: {tier}{position}")

    return ". ".join(parts) + "."


def format_suggestion_message(
    task_title: str,
    suggestion: dict,
    source_info: str = None,
) -> str:
    """Format the full scheduling suggestion as a Slack message.

    Returns a formatted string ready for Slack's mrkdwn.
    """
    tier = suggestion.get("tier", "C")
    position = suggestion.get("position")
    date_label = suggestion.get("date_label", "Unknown")

    # Position label
    if position and tier in ("A", "B"):
        priority_label = f"{tier}{position}"
    else:
        priority_label = tier

    explanation = explain_suggestion(task_title, suggestion)

    lines = [
        f"*{date_label}, {priority_label}*",
        f"_{explanation}_",
        "",
        "Reply *yes*, or adjust (e.g., `mon A` or `wed B`).",
    ]

    return "\n".join(lines)
