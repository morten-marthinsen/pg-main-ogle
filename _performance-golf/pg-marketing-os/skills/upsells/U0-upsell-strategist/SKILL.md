---
name: upsell-strategist
description: >-
  Analyze front-end offer stack and campaign context to design the complete post-
  purchase upsell sequence. Use when planning upsell funnels, order bump placement,
  downsell strategy, or post-purchase offer architecture. Determines what to offer
  at each position, pricing cascade, congruence mapping, and the narrative thread
  connecting the sequence. This skill does NOT write copy — it produces the strategic
  blueprint that U1-U3 execute against. Operates in Mode A (downstream from Skills
  07-09 with full context) or Mode B (standalone brief). Trigger when users mention
  upsell strategy, post-purchase offers, funnel architecture, order bump planning,
  or designing an upsell sequence. Requires Skill 07 (Offer) and Skill 09 (Brief).
---

# U0 — Upsell Strategist

**Pipeline Position:** First skill in Upsell Engine pipeline. Executes after Skill 07 (Offer) and Skill 09 (Campaign Brief). Feeds U1 (Order Bump), U2 (Upsell Writer), U3 (Downsell Writer).

---

## PURPOSE

Analyze the front-end offer stack and campaign context to design the complete post-purchase upsell sequence. Determines what to offer at each position, pricing cascade, congruence mapping, and the narrative thread connecting the entire sequence.

**This skill does NOT write copy.** It produces the strategic blueprint that U1-U3 execute against.

**Success Criteria:**
- Every upsell position mapped with product, price, and congruence rationale
- Pricing cascade follows descending commitment / ascending value rule
- Congruence thread documented (mechanism, root cause, promise continuity)
- Narrative arc across full sequence defined
- Clear handoff specs for U1, U2, U3

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + brief parsing + validation | 0.1, 0.2, 0.3 |
| 1 | Offer stack analysis + product mapping + pricing | 1.1, 1.2, 1.3, 1.4 |
| 2 | Congruence threading + narrative arc + handoff specs | 2.1, 2.2, 2.3 |
| 4 | Strategy validation + output packaging | 4.1, 4.2 |

---

## REFERENCE FILES

For full execution specs, microskill details, and anti-degradation protocols:
- `U0-UPSELL-STRATEGIST-AGENT.md` — Complete orchestration specification
- `U0-UPSELL-STRATEGIST-ANTI-DEGRADATION.md` — Quality enforcement rules

---

## OUTPUT

**Primary:** `upsell-strategy.yaml` + `UPSELL-STRATEGY-SUMMARY.md`
**Location:** `outputs/[project-code]/upsell/`
