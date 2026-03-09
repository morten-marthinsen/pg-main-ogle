---
name: upsell-sequence-assembler
description: >-
  Assemble all upsell sequence pieces (order bump + upsell + downsell) into a
  cohesive sequence document with cross-page narrative validation. Use after U1-U3
  have produced their individual pieces. This is an ASSEMBLY + VALIDATION skill,
  not a writing skill — it combines existing pieces, validates threading between
  them, verifies pricing cascade compliance, and catches inconsistencies that
  individual skill validations miss. Produces assembled sequence document plus
  E0 handoff for email integration. Trigger when users mention assembling the
  upsell funnel, compiling upsell pages, sequence validation, or building the
  complete post-purchase flow. Requires U0-U3 outputs.
---

# U4 — Upsell Sequence Assembler

**Pipeline Position:** After U1 (Order Bump), U2 (Upsell Writer), U3 (Downsell Writer). Before U5 (Editorial). Also produces E0 handoff for email integration.

---

## PURPOSE

Assemble all upsell sequence pieces into a cohesive sequence document and validate cross-page narrative threading, congruence chain, pricing cascade, and speed compliance.

**This is an ASSEMBLY + VALIDATION skill, not a writing skill.** It does not generate new copy — it combines existing pieces and catches inconsistencies.

**Success Criteria:**
- All upstream pieces assembled in correct funnel order
- Narrative thread verified (mechanism name, root cause, promise on every page)
- Congruence chain validated (FE to Bump to Upsell to Downsell)
- Pricing cascade compliant
- Speed compliant (total sequence reading time < 4 minutes)
- Two handoffs generated: U5 (editorial) + E0 (email strategy)

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading from U0-U3 | 0.1 |
| 1 | Sequence collection + narrative thread + congruence chain + pricing cascade + speed validation | 1.1, 1.2, 1.3, 1.4, 1.5 |
| 4 | Sequence packaging + handoff generation | 4.1, 4.2 |

---

## REFERENCE FILES

For full execution specs, microskill details, and anti-degradation protocols:
- `U4-UPSELL-ASSEMBLER-AGENT.md` — Complete orchestration specification
- `U4-UPSELL-ASSEMBLER-ANTI-DEGRADATION.md` — Quality enforcement rules

---

## OUTPUT

**Primary:** `upsell-sequence-assembled.md` + `validation-report.md` + `e0-handoff.yaml`
**Location:** `outputs/[project-code]/upsell/`
