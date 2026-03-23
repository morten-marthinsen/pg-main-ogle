---
name: conversion-intelligence-loader
description: >-
  Load, match, filter, and synthesize conversion intelligence for the specific
  page type and vertical classified by LP-00. Bridges the raw data layer
  (conversion-data-reference.md, specimen-index.md, cross-page-pattern-analysis.md,
  element-taxonomy.md) and all downstream architecture/writing skills. Performs
  benchmark loading (vertical-specific data), specimen matching (relevant page
  examples), and strategic synthesis (actionable context). Trigger when page brief
  exists and you need conversion benchmarks and specimen matches for downstream
  architecture decisions.
skill_type: technique
persuasion_profile: commitment + moderate authority
---

# LP-01 — Conversion Intelligence Loader

**Pipeline Position:** After LP-00 (Brief). Feeds LP-02, LP-03, LP-04, LP-05, LP-06, LP-17, LP-18, and all PDP skills.

---

## PURPOSE

Load vertical-specific conversion benchmarks, match relevant specimen pages, and synthesize actionable intelligence that downstream architecture and writing skills consume.

**Success Criteria:**
- Vertical-specific benchmarks loaded from conversion-data-reference.md
- Relevant specimens matched from specimen-index.md (quality floor: 7/10)
- Cross-page patterns synthesized from cross-page-pattern-analysis.md
- conversion-intelligence.json produced with benchmark, specimen, and synthesis sections

---

## REFERENCE FILES

- `LP-01-AGENT.md` — Complete orchestration specification
- `LP-01-ANTI-DEGRADATION.md` — Quality enforcement rules
- `04-page-builder/LANDING-PAGE-ENGINE.md` — Engine-level constraints
- `04-page-builder/conversion-data-reference.md` — Unbounce Q4 2024 benchmarks
- `04-page-builder/specimens/specimen-index.md` — 31 specimen files
- `04-page-builder/specimens/cross-page-pattern-analysis.md` — 8 validated discoveries

---

## OUTPUT

**Primary:** `conversion-intelligence.json` + `CONVERSION-INTELLIGENCE-SUMMARY.md`
**Location:** `~outputs/[project-name]/landing-page/LP-01-conversion-intelligence/`
