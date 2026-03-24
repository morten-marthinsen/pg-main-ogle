"""Extended scorecard context with day-count awareness.

Provides get_scorecard_prompt() that includes countdown to checkpoints.
Used by M9 (extraction), M10 (analysis), and M11 (meeting prep).
"""

from datetime import date

# Day 1 of the 90-day plan: Feb 10, 2026
# Duplicated from daily_briefing.py to avoid circular import
DAY_ONE = date(2026, 2, 10)

# Checkpoint dates
DAY_30_DATE = date(2026, 3, 11)  # Feb 10 + 30 days
DAY_60_DATE = date(2026, 4, 10)  # Feb 10 + 60 days
DAY_90_DATE = date(2026, 5, 10)  # Feb 10 + 90 days


def current_day(today: date = None) -> int:
    """Current day in the 90-day plan."""
    if today is None:
        today = date.today()
    delta = today - DAY_ONE
    return max(1, delta.days + 1)


def days_until(target: date, today: date = None) -> int:
    """Days until a target date."""
    if today is None:
        today = date.today()
    return (target - today).days


def get_scorecard_prompt(today: date = None) -> str:
    """Return scorecard context with countdown awareness for AI prompts."""
    if today is None:
        today = date.today()

    day = current_day(today)
    d30 = days_until(DAY_30_DATE, today)
    d60 = days_until(DAY_60_DATE, today)
    d90 = days_until(DAY_90_DATE, today)

    # Determine current phase
    if day <= 30:
        phase = "Stabilize & Establish"
        checkpoint = f"Day 30 in {d30} days (Mar 11)"
    elif day <= 60:
        phase = "Accelerate & Build"
        checkpoint = f"Day 60 in {d60} days (Apr 10)"
    else:
        phase = "Prove & Evaluate"
        checkpoint = f"Day 90 in {d90} days (May 10)"

    return (
        f"**Day {day} of 90** | Phase: {phase} | Next checkpoint: {checkpoint}\n\n"
        "Christopher's 30/60/90 Scorecard:\n"
        "DAY 30 — Stabilize & Establish: Team stability (Russ handoff, Fatima strategic "
        "partner, Jenni/Jojo 1:1s). Hiring (senior designer/art director, Romeo onboarding, "
        "senior editors). Neco influencer brief demo to John. RS1 launch in motion. Weekly "
        "Creative Lead Updates to John. Creative OS PRD shared with key stakeholders. "
        "Performance output maintained.\n"
        "DAY 60 — Accelerate & Build: Key hires closing (>=1 offer). AI tools measurably "
        "improving creative velocity (>=15% increase). RS1 fully-connected campaign live. "
        "Creative OS demo to John & Brixton (TESS->Neco->VEDA pipeline). OPEX savings from "
        "AI documented. >=6 Spark Book ideas in production.\n"
        "DAY 90 — Prove & Evaluate: AI-first org chart proposed. >=3 teams using Creative OS "
        "outputs. Brand-paid connection proven (>=2 integrated campaigns). >=2 key hires "
        "onboarded. VP narrative clear.\n\n"
        "Scorecard metrics to track in transcripts:\n"
        "- Hiring progress (Romeo, editors, designers, art director)\n"
        "- RS1 campaign milestones\n"
        "- AI/Creative OS adoption signals\n"
        "- Brand-paid connection evidence\n"
        "- Spark Book product pipeline\n"
        "- Weekly update delivery to John\n"
        "- Delegation vs IC work balance\n"
    )
