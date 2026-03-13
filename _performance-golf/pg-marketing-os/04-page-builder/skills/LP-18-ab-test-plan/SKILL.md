---
name: ab-test-plan
description: >-
  Generate 5-10 specific, implementable A/B test hypotheses for the assembled
  landing page. Each hypothesis ranked by expected conversion lift, sized for
  statistical significance, tied to evidence from LP-17 audit, LP-16 mobile audit,
  conversion-data-reference.md benchmarks, and cross-page-pattern-analysis.md
  patterns. This is the FINAL SKILL in the Landing Page Engine. Every test
  hypothesis must be specific enough for implementation without clarifying questions.
  Trigger when conversion audit and mobile audit are complete.
---

# LP-18 — A/B Test Plan

**Pipeline Position:** Final skill. After LP-17 (Conversion Audit), LP-16 (Mobile Audit). No downstream.

---

## PURPOSE

Generate specific, implementable A/B test hypotheses prioritized by expected conversion lift. Each test is sized for statistical significance and tied to audit evidence.

**Success Criteria:**
- 5-10 test hypotheses generated with specific implementation instructions
- Each ranked by expected conversion lift from benchmark data
- Sample size and duration calculated for statistical significance
- ab-test-plan.json produced with all hypotheses, rankings, and implementation specs

---

## REFERENCE FILES

- `LP-18-AGENT.md` — Complete orchestration specification
- `LP-18-ANTI-DEGRADATION.md` — Quality enforcement rules
- `04-page-builder/LANDING-PAGE-ENGINE.md` — Engine-level constraints
- `04-page-builder/conversion-data-reference.md` — Benchmark data for lift estimates
- `04-page-builder/specimens/cross-page-pattern-analysis.md` — Pattern evidence

---

## OUTPUT

**Primary:** `ab-test-plan.json` + `AB-TEST-PLAN-SUMMARY.md`
**Location:** `~outputs/[project-name]/landing-page/LP-18-ab-test-plan/`
