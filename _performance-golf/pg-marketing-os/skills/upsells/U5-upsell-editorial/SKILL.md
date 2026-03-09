---
name: upsell-editorial
description: >-
  Systematic quality review and revision of the complete assembled upsell sequence.
  Use as the final quality gate after U4 has assembled the full post-purchase funnel.
  Scores every piece (order bump, upsell page, downsell page) against upsell-specific
  editorial criteria, identifies structural and tone issues, applies revisions (Arena
  for critical/major P1/P2 issues, direct fix for minor P3/P4), rescores to verify
  improvement, and packages the final polished sequence. Every piece must score 7.5+
  to pass. Trigger when users mention upsell review, editorial pass on upsell pages,
  quality check, or finalizing the upsell sequence. Requires U4 assembled output.
---

# U5 — Upsell Editorial

**Pipeline Position:** Final skill in Upsell Engine pipeline. After U4 (Assembler). Produces the final polished upsell sequence.

---

## PURPOSE

Systematic quality review and revision of the complete assembled upsell sequence. Scores every piece against 7 upsell-specific editorial lenses, identifies issues, applies revisions, and packages the final sequence.

**Success Criteria:**
- Every piece scored BEFORE and AFTER revision
- All P1/P2 issues addressed through full Arena (editorial_revision mode)
- All P3/P4 issues addressed through direct fixes
- Final score >= 7.5 for every individual piece
- All 5 Sequence-Level Criteria (S1-S5) verified
- Congruence chain verified across entire sequence

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + scoring rubric | 0.1, 0.2 |
| 1 | Baseline scoring + issue identification + clustering | 1.1, 1.2, 1.3 |
| 2 | Revision execution | 2.1 |
| 3 | Arena — editorial_revision mode (P1/P2 issues only) | U5-ARENA-LAYER.md |
| 4 | Rescore + sequence criteria validation + output packaging | 4.1, 4.2, 4.3 |

---

## REFERENCE FILES

For full execution specs, microskill details, and anti-degradation protocols:
- `U5-UPSELL-EDITORIAL-AGENT.md` — Complete orchestration specification
- `U5-UPSELL-EDITORIAL-ANTI-DEGRADATION.md` — Quality enforcement rules
- `skills/layer-3/U5-ARENA-LAYER.md` — Arena specification

---

## OUTPUT

**Primary:** `upsell-sequence-final.md` + `EDITORIAL-REPORT.md`
**Location:** `outputs/[project-code]/upsell/`
