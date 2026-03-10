---
name: downsell-writer
description: >-
  Write 300-1000 word downsell pages — shown when a buyer DECLINES a 1-click upsell.
  This is NOT a second sales pitch. The buyer said no; this skill acknowledges that
  no, reframes the offer from a different angle, and presents an alternative using
  the ARO structure (Acknowledge, Reframe, Offer). The reframe must be genuine —
  not just same thing cheaper but a legitimately different angle. All drafts run
  through the Arena in generative_full_draft mode. Trigger when users mention
  downsell pages, decline pages, alternative offers, or writing the page shown
  after an upsell rejection. Requires U0 strategy and U2 context (the declined
  upsell).
---

# U3 — Downsell Writer

**Pipeline Position:** After U2 (Upsell Writer). Before U4 (Assembler), U5 (Editorial).

---

## PURPOSE

Write the 300-1000 word downsell page using the ARO structure (Acknowledge, Reframe, Offer). The buyer said "no" to the upsell — this acknowledges that "no," reframes from a different angle, and presents an alternative.

**The reframe must be genuine** — not just "same thing cheaper" but a legitimately different angle (Core Extract, Payment Plan, Lite Version, or Different Format).

**Success Criteria:**
- Word count within 300-1000 words
- ARO structure: all 3 sections present and properly proportioned
- Reframe is genuine — NOT just a discounted upsell
- Congruence verified: front-end mechanism referenced by name
- Zero guilt in the NO option
- Arena quality score meets threshold

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + specimen calibration | 0.1, 0.2 |
| 1 | Reframe selection + congruence mapping | 1.1, 1.2 |
| 2 | ARO draft generation + price presentation | 2.1, 2.2 |
| 3 | Arena — generative_full_draft mode | U3-ARENA-LAYER.md |
| 4 | Validation + output packaging | 4.1, 4.2 |

---

## REFERENCE FILES

For full execution specs, microskill details, and anti-degradation protocols:
- `U3-DOWNSELL-WRITER-AGENT.md` — Complete orchestration specification
- `U3-DOWNSELL-WRITER-ANTI-DEGRADATION.md` — Quality enforcement rules
- `skills/layer-3/U3-ARENA-LAYER.md` — Arena specification

---

## OUTPUT

**Primary:** `downsell-page-draft.md`
**Location:** `~outputs/[project-code]/upsell/`
