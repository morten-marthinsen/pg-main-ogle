---
name: project-brief
description: >-
  Initial project brief capture for new copywriting campaigns. Produces TWO documents:
  (1) Soul.md — the voice/identity document for all downstream copy skills, and
  (2) Research Brief — the input document for Skill 01 Deep Research. Use when starting
  any new project, onboarding a new client, or initializing a campaign. Trigger when
  users mention starting a new project, creating a brief, kicking off research, or
  initializing a campaign. This is the entry point for the entire pipeline.
---

# 00: PROJECT BRIEF

## Soul.md + Research Brief — Project Initialization

---

## PURPOSE

This skill initializes a new project by creating two foundational documents:

1. **Soul.md** — The voice/identity document that all downstream *copy* skills reference.
   Defines voice register, audience relationship, emotional range, and pacing.
2. **Research Brief** — The input document that Skill 01 (Deep Research) consumes.
   Defines what we're researching, business context, hypotheses, and emphasis areas.

Both documents follow a **draft → human review → approve** workflow. Nothing executes
until the human signs off.

**Outputs:**
- `Soul.md` (Status: Seed) — for copy generation pipeline
- `[project]-brief.md` (Status: Draft) — for research pipeline

**Unlocks:** Skill 01 (Research)

---

## TEMPLATES

| Template | Purpose | Location |
|----------|---------|----------|
| `soul-md-template.md` | Voice/identity document | This folder |
| `research-brief-template.md` | Research input document | This folder |

### Vertical Profile
- `skills/layer-0/0.0.1-vertical-profile-loader.md` — determines which persona panel,
  specimens, taste defaults, and anti-slop rules apply

---

## PROCESS: VOICE PROMPT → BRIEF WORKFLOW

When a user provides a voice prompt (long-form description of a new project, audience,
product, or campaign), follow this sequence:

```
USER VOICE PROMPT
       ↓
1. LISTEN — Extract all relevant details from the prompt
       ↓
2. FILL — Populate research-brief-template.md using the extracted details
   - Map product details → Section 1 (Product Identity)
   - Map existing URLs/docs → Section 2 (Assets)
   - Map business reasoning → Section 3 (Business Context)
   - Map suspicions/theories → Section 4 (Hypotheses)
   - Map specific questions → Section 5 (Additional Questions)
   - Map "go deeper on X" → Section 6 (Exploration Emphasis)
   - Map budget/timeline → Section 7 (Constraints)
       ↓
3. INFER — Fill gaps intelligently based on context
   - If the user mentions a target audience but not hypotheses,
     generate 3-5 hypotheses based on what they described
   - If they mention competitors or frustrations, map those to
     additional questions
   - Add a Strategic Notes section with your reasoning about
     what transfers from prior work and what needs fresh research
       ↓
4. PRESENT — Show the completed brief to the user for review
   - Flag any sections you're unsure about
   - Flag any gaps the user should fill in
   - Explicitly ask: "Review and refine this before we begin?"
       ↓
5. REFINE — Incorporate user feedback (may loop 1-3 times)
       ↓
6. APPROVE — User confirms the brief is ready
       ↓
7. SAVE — Write the final brief to the project research folder:
   ./Copywriting-Business/Clients/[Client]/projects/[Project]/research/[project]-brief.md
       ↓
8. SOUL.md (if needed) — If this is a brand-new project, also create
   a Seed-status Soul.md using soul-md-template.md
       ↓
SKILL 01 UNLOCKED
```

### Key Rules

- **NEVER skip the human review step.** The brief is always presented for approval
  before Skill 01 begins.
- **Fill in as much as possible** from the voice prompt. Don't leave fields blank if
  the user gave you enough information to populate them.
- **Infer intelligently but flag your inferences.** If you generated hypotheses the
  user didn't explicitly state, call that out so they can confirm or adjust.
- **Add Strategic Notes** when prior research exists (e.g., a women's campaign that
  informs a men's campaign). This section is not part of the standard template but
  provides valuable context for the human reviewer.

---

## OUTPUT LOCATIONS

- **Research Brief:** `Copywriting-Business/Clients/[Client]/projects/[Project]/research/[project]-brief.md`
- **Soul.md:** `Copywriting-Business/Clients/[Client]/projects/[Project]/Soul.md`

---

## NEXT SKILL

Upon brief approval, Skill 01 (Deep Research) is unlocked. Provide the approved
brief file to the Research Orchestrator to begin execution.
