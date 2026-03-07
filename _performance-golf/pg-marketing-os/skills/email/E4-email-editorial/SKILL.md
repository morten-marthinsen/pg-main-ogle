---
name: email-editorial
description: >-
  Systematic quality review and revision of the complete assembled email campaign.
  Use as the final quality gate after E3 has assembled the full sequence. Scores
  every email against the EMAIL-QUALITY-RUBRIC, identifies structural and voice
  issues, applies revisions (full Arena for critical/major issues, direct fix for
  minor/cosmetic), rescores to verify improvement, and packages the final revised
  campaign. Every email must score 7.5+ to pass. Trigger when users mention email
  review, editorial pass, quality check, email polish, campaign revision, or
  finalizing an email campaign. Requires E3 assembled-sequence.yaml output.
---

# E4 — Email Editorial

**Pipeline Position:** Final skill in Email Engine pipeline. After E3 (Assembler). Produces the final polished email campaign.

---

## PURPOSE

Systematic quality review and revision of the complete assembled email campaign. Scores every email against the quality rubric, identifies issues, applies revisions, and packages the final campaign.

**Success Criteria:**
- Every email scored BEFORE and AFTER revision
- All critical/major issues addressed through Arena
- All minor/cosmetic issues addressed through direct fixes
- Final score >= 7.5 for every email
- Campaign-level quality criteria verified

---

## LAYER ARCHITECTURE

| Layer | Task |
|-------|------|
| 0 | Input loading + rubric loading |
| 1 | Baseline scoring + issue identification |
| 2 | Revision execution |
| 3 | Arena for critical/major issues + rescore |

---

## REFERENCE FILES

For full execution specs, microskill details, and anti-degradation protocols:
- `EMAIL-EDITORIAL-AGENT.md` — Complete orchestration specification
- `EMAIL-EDITORIAL-ANTI-DEGRADATION.md` — Quality enforcement rules

---

## OUTPUT

**Primary:** Final revised email campaign + editorial report
**Location:** `outputs/[project-code]/email/`
