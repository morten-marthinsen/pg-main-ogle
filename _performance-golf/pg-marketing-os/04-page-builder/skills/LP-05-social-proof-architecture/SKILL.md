---
name: social-proof-architecture
description: >-
  Design the complete social proof strategy for the landing page — proof types,
  placement, density, sequence, and format. LP-04 assigns proof density per section;
  LP-05 engineers the full architecture: specific proof types per slot, wave pattern
  mapped to section sequence, format direction, volume calculations, and gap analysis.
  Trigger when section sequence is complete and you need to design where and how proof
  elements appear throughout the page.
---

# LP-05 — Social Proof Architecture

**Pipeline Position:** After LP-00 (Brief), LP-04 (Section Sequence). Feeds LP-08, LP-10, LP-15, PDP-05.

---

## PURPOSE

Design the proof architecture — what types of proof appear in which sections, at what density, in what format. LP-04 set the proof density targets; LP-05 fills those slots with specific proof types and identifies gaps that need sourcing.

**Success Criteria:**
- Specific proof types assigned to each proof slot from LP-04
- Wave pattern designed (proof density rises toward conversion points)
- Gap analysis produced (missing proof types, sourcing needs identified)
- proof-architecture.json produced with slot-by-slot proof assignments

---

## REFERENCE FILES

- `LP-05-AGENT.md` — Complete orchestration specification
- `LP-05-ANTI-DEGRADATION.md` — Quality enforcement rules
- `04-page-builder/LANDING-PAGE-ENGINE.md` — Engine-level constraints
- `04-page-builder/specimens/cross-page-pattern-analysis.md` — Cross-page proof patterns

---

## OUTPUT

**Primary:** `proof-architecture.json` + `PROOF-ARCHITECTURE-SUMMARY.md`
**Location:** `~outputs/[project-name]/landing-page/LP-05-social-proof-architecture/`
