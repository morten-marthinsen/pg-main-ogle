---
name: ad-pre-launch-scoring
description: >-
  Probabilistic evaluation and variant prioritization for ad testing sequences.
  Use after the variant matrix (A09) is assembled and you need to determine which
  variants to test first. Scores variants with probability ranges (not false
  precision) and assigns Tier 1/2/3 priority for testing sequence. Every score
  traces to evidence from A01 intelligence, A06 Arena results, benchmarks, or
  historical data. The goal is prioritization, not perfection — tier assignment
  matters, decimal precision does not. Trigger when users mention ad scoring,
  variant prioritization, which ads to test first, pre-launch evaluation, or
  predicting ad performance. Requires A09 variant matrix.
---

# A10 — Pre-Launch Scoring

**Pipeline Position:** After A09 (Assembly & Variant Matrix). Feeds A11 (Launch Package).

---

## PURPOSE

Score and prioritize variants for testing sequence using data-backed
probability bands.

**Three Laws:**
1. Prediction is probabilistic, not certain (probability bands, not false precision)
2. Every score must trace to data (cite evidence from A01/A06/benchmarks)
3. The goal is prioritization, not perfection (tier assignment matters)

---

## IDENTITY

**This skill IS:** Data-driven prediction engine providing probability bands.
**This skill is NOT:** An assembler (A09), a launch packager (A11), a performance analyst (A12).

**Upstream:** A09 (Variant Matrix), A01 (Intelligence), A06 (Arena Results)
**Downstream:** A11 (Launch Package)

---

## REFERENCE FILES

- `A10-PRE-LAUNCH-SCORING-AGENT.md` — Complete orchestration specification
- `A10-PRE-LAUNCH-SCORING-ANTI-DEGRADATION.md` — Quality enforcement rules

---

## OUTPUT

**Primary:** `SCORING-REPORT.md`
**Location:** `~outputs/[project-name]/ad-engine/A10/`
