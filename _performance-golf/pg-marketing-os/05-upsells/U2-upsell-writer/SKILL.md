---
name: upsell-page-writer
description: >-
  Write 500-2000 word 1-click upsell pages — the first post-purchase offer buyers
  encounter after completing their front-end purchase. This is NOT a sales page;
  the buyer already said yes. Extends the logic of that yes into a congruent post-
  purchase offer using the CAIRO structure (Congratulate, Amplify, Intrigue, Reason,
  Offer). Supports video script mode for complex products (up to 4000 words). All
  drafts run through the Arena in generative_full_draft mode. Trigger when users
  mention upsell pages, post-purchase offers, 1-click upsells, OTO pages, or
  writing the page that appears after checkout. Requires U0 strategy and Skill 04
  Mechanism output.
---

# U2 — 1-Click Upsell Writer

**Pipeline Position:** After U0 (Strategist), parallel with U1 (Order Bump). Before U3 (Downsell), U4 (Assembler), U5 (Editorial).

---

## PURPOSE

Write the 500-2000 word 1-click upsell page using the CAIRO structure (Congratulate, Amplify, Intrigue, Reason, Offer). The buyer already said yes — this extends the logic of that yes, not a new persuasion sequence.

**Success Criteria:**
- Word count within 500-2000 words (video scripts may extend to 3000-4000w)
- CAIRO structure: all 5 sections present and properly proportioned
- Congruence verified: front-end mechanism referenced by name
- Post-purchase warmth tone — NOT pre-purchase selling
- Arena quality score 8.0+ weighted average

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + specimen calibration + persona voice + format classification | 0.1, 0.2, 0.2.7, 0.3 |
| 1 | Congruence mapping + position analysis + proof inventory + structure selection | 1.1, 1.2, 1.3, 1.4 |
| 2 | CAIRO draft generation + bonus stack + price presentation | 2.1, 2.2, 2.3 |
| 3 | Arena — generative_full_draft mode | U2-ARENA-LAYER.md |
| 4 | Validation + congruence scoring + output packaging | 4.1, 4.2, 4.3 |

---

## REFERENCE FILES

For full execution specs, microskill details, and anti-degradation protocols:
- `U2-UPSELL-WRITER-AGENT.md` — Complete orchestration specification
- `U2-UPSELL-WRITER-ANTI-DEGRADATION.md` — Quality enforcement rules
- `skills/layer-3/U2-ARENA-LAYER.md` — Arena specification

---

## OUTPUT

**Primary:** `upsell-page-draft.md`
**Location:** `~outputs/[project-code]/upsell/`
