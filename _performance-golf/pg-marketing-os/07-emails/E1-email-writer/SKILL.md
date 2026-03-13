---
name: email-writer
description: >-
  Generate individual promotional emails following the campaign blueprint from E0.
  Use when writing email body copy for a planned email campaign sequence. Each email
  is written to a specific body type (one of 7: CT, QO, TM, QA, LB, ST, NR) using
  structural specimens and voice specimens from the 6-persona Arena. Generates ONE
  email at a time per the blueprint position. Produces individual email drafts with
  70-80% content / 20-30% pitch ratio, natural bridge transitions, and attention-
  grabbing opening hooks. Trigger when users mention writing emails, email copy,
  email body, drafting an email, or generating email content. Requires E0
  campaign-blueprint.yaml.
---

# E1 — Email Writer

**Pipeline Position:** After E0 (Strategist). Before E2 (Subject Lines). Generates one email at a time per the campaign blueprint.

---

## PURPOSE

Generate individual emails following the campaign blueprint from E0. Each email is written to a specific body type (one of 7: CT, QO, TM, QA, LB, ST, NR) using structural specimens and voice specimens from the 6-persona Arena.

**Success Criteria:**
- Email follows assigned body type structural template
- Content-to-pitch ratio maintained (70-80% / 20-30%)
- Bridge/transition is smooth and natural
- Opening hook captures attention in first 3 lines
- CTA matches assigned pattern from blueprint

---

## LAYER ARCHITECTURE

| Layer | Task |
|-------|------|
| 0 | Input loading + specimen loading |
| 1 | Body type template selection + voice calibration |
| 2 | Email draft generation |
| 3 | Arena — 6-persona generative mode |

---

## REFERENCE FILES

For full execution specs, microskill details, and anti-degradation protocols:
- `EMAIL-WRITER-AGENT.md` — Complete orchestration specification
- `EMAIL-WRITER-ANTI-DEGRADATION.md` — Quality enforcement rules

---

## OUTPUT

**Primary:** Individual email drafts per blueprint position
**Location:** `~outputs/[project-code]/email/email-copy/`
