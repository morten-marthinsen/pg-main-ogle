"""Shared PRD context for daily briefing AI prompts.

Provides condensed context constants that modules can inject into their
Anthropic system prompts so recommendations align with Christopher's
actual strategic priorities and document structure.

Sources of truth:
- SCORECARD_CONTEXT: ORION-REFERENCE.md Section 4 (30/60/90 Scorecard)
- PRD_SECTIONS_CONTEXT: ORION-REFERENCE.md full section outline (S1-S11)

Update these constants when the PRD is revised.
"""

SCORECARD_CONTEXT = (
    "Christopher's 30/60/90 Scorecard (condensed):\n"
    "DAY 30 — Stabilize & Establish: Team stability (Russ handoff, Fatima strategic partner, "
    "Jenni/Jojo 1:1s). Hiring (senior designer/art director, Romeo onboarding, senior editors). "
    "Neco influencer brief demo to John. RS1 launch in motion. Weekly Creative Lead Updates to John. "
    "Creative OS PRD shared with key stakeholders. Performance output maintained.\n"
    "DAY 60 — Accelerate & Build: Key hires closing (>=1 offer). AI tools measurably improving "
    "creative velocity (>=15% increase). RS1 fully-connected campaign live (ad angles + landing page "
    "+ organic + influencer). Creative OS demo to John & Brixton (TESS->Neco->VEDA pipeline). "
    "OPEX savings from AI documented. >=6 Spark Book ideas in production.\n"
    "DAY 90 — Prove & Evaluate: AI-first org chart proposed. >=3 teams using Creative OS outputs. "
    "Brand-paid connection proven (>=2 integrated campaigns). >=2 key hires onboarded. "
    "VP narrative clear — weekly updates archive showing trajectory.\n\n"
    "Creative OS agents: Orion (strategy/oversight), Tess (data intelligence/performance analysis), "
    "Veda (video production/asset creation), Neco (copywriting/audience psychology).\n"
    "Brand Threads: Thread 1 'Smarter Journey to Better Golf' (education/insight), "
    "Thread 2 'Innovation' (technology/engineering)."
)

PRD_SECTIONS_CONTEXT = (
    "ORION-REFERENCE Sections:\n"
    "S1: System Identity | S2: Architectural Principles | S3: Strategic Leverage + Brand Threads\n"
    "S4: 30/60/90 Scorecard (Day 30 Stabilize, Day 60 Accelerate, Day 90 Prove)\n"
    "S5: Scope Boundaries | S6: System Architecture (8 Execution Modes)\n"
    "S7: Sub-Agent Registry (3 layers: Strategic Core, Operational Engine, Support Functions)\n"
    "S8: Challenger Protocol (FLAG/BLOCK/CONVINCE ME)\n"
    "S9: Delegation Engine (P0-P3 triage)\n"
    "S10: Launch Tracker (9 Spark Book products + pipeline stages)\n"
    "S11: Session Operations\n\n"
    "Key docs that may need updates based on meetings:\n"
    "- ORION-REFERENCE.md: 30/60/90 scorecard, launch tracker, delegation targets\n"
    "- CREATIVE-OS-PRD-PLAN.md: Org-level vision (Christopher + John co-authoring)\n"
    "- Spark Book Launch Map: Product launch statuses\n"
    "- Team Roster: Hiring, onboarding, role changes\n"
    "- Weekly cadence: Meeting rhythms, recurring actions\n"
)
