---
name: conversion-audit
description: >-
  Score assembled landing page against 20-point conversion benchmark checklist.
  Identify every weakness. Rank optimization opportunities by expected conversion
  lift. Produce verdict: launch-ready, needs optimization, or structural rebuild
  required. This is THE QUALITY GATE — no page exits the Landing Page Engine without
  passing LP-17. Audit is objective, evidence-based, tied to real conversion data.
  Every FAIL includes specific actionable fix with expected lift estimate from
  benchmark data. Trigger when page assembly is complete and you need conversion
  validation.
---

# LP-17 — Conversion Audit

**Pipeline Position:** After LP-15 (Page Assembly). Feeds LP-18. Quality gate: PASS/FAIL.

---

## PURPOSE

Score the assembled page against a 20-point conversion checklist. Every score traces to benchmark data. The verdict determines whether the page launches, needs optimization, or requires structural rework.

**Success Criteria:**
- 20-point checklist scored with evidence-based ratings
- Every FAIL item has specific actionable fix with expected conversion lift
- Overall verdict produced (launch-ready / needs optimization / structural rebuild)
- conversion-audit.json produced with full checklist, scores, and verdict

---

## REFERENCE FILES

- `LP-17-AGENT.md` — Complete orchestration specification
- `LP-17-ANTI-DEGRADATION.md` — Quality enforcement rules
- `04-page-builder/LANDING-PAGE-ENGINE.md` — Engine-level constraints
- `04-page-builder/conversion-data-reference.md` — Benchmark data for scoring

---

## OUTPUT

**Primary:** `conversion-audit.json` + `CONVERSION-AUDIT-SUMMARY.md`
**Location:** `~outputs/[project-name]/landing-page/LP-17-conversion-audit/`
