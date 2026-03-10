---
name: order-bump-writer
description: >-
  Generate 50-150 word checkbox copy for order bumps displayed on checkout pages.
  Use when writing order bump copy that appears as a checkbox add-on during purchase.
  Produces 5-7 variants optimized for split testing, each following the 3-element
  structure (WHAT + WHY NOW + PRICE) with different emphasis angles. Brevity is the
  primary constraint — every word must earn its place. If the copy reads like a
  shortened sales page, it has failed. Trigger when users mention order bumps,
  checkout page copy, add-on offers, bump copy, or checkbox upsells. Requires U0
  Upsell Strategist output or standalone brief.
---

# U1 — Order Bump Writer

**Pipeline Position:** Second skill in Upsell Engine pipeline. After U0 (Strategist). Parallel with U2 (Upsell Writer). Feeds U4 (Assembler).

---

## PURPOSE

Generate 50-150 word checkbox copy for order bumps displayed on checkout pages. Produces 5-7 variants optimized for split testing, each following the 3-element structure (WHAT + WHY NOW + PRICE) with different emphasis angles.

**This skill writes the shortest copy in the entire system.** Brevity is not a limitation — it is the primary constraint that determines quality.

**Success Criteria:**
- 5-7 variants produced, all within 50-150 words
- Every variant contains the 3-element structure (WHAT + WHY NOW + PRICE)
- FE mechanism name appears in every variant (congruence)
- No story structure, no proof cascade, no PAS structure

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + specimen calibration | 0.1, 0.2 |
| 1 | Bump copy generation + variant generation | 1.1, 1.2 |
| 4 | Validation + output packaging | 4.1, 4.2 |

---

## REFERENCE FILES

For full execution specs, microskill details, and anti-degradation protocols:
- `U1-ORDER-BUMP-WRITER-AGENT.md` — Complete orchestration specification
- `U1-ORDER-BUMP-WRITER-ANTI-DEGRADATION.md` — Quality enforcement rules

---

## OUTPUT

**Primary:** `order-bump-copy.md` (5-7 variants)
**Location:** `~outputs/[project-code]/upsell/`
