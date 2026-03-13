# ADV-05-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent advertorial editorial review process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: ADV-05-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Run full editorial smell test, re-validate hook, score quality, verify word count.
I WILL NOT: Skip smell test, rubber-stamp quality, accept below-threshold scores, or introduce slop during revision.
```

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI rubber-stamps assembled piece without genuine editorial review
- AI skips smell test ("ADV-02 already ran it")
- AI accepts quality score below 8.0 ("close enough")
- AI introduces promotional language during editorial revision
- AI skips hook re-validation ("ADV-01 validated it")
- AI ignores word count bounds ("a few words over is fine")
- AI generates revisions that drift toward promotional tone
- AI skips specimen comparison ("already calibrated in earlier skills")

---

## STRUCTURAL FIX 1: FRESH SMELL TEST REQUIREMENT

### The Problem
AI assumes the smell test from ADV-02 still applies after assembly. But assembly can introduce seams, transitional sentences, or context changes that shift the smell test result.

### The Fix

```yaml
fresh_smell_test:
  REQUIRED: Run NEW smell test on ASSEMBLED piece (not component drafts)
  CANNOT rely on: ADV-02 smell test results
  MUST produce: New smell test documentation with assembled-piece evidence

  IF smell_test_skipped:
    HALT: "Fresh smell test required on assembled piece"

  IF smell_test_references_ADV_02:
    HALT: "Stale smell test -- must run on assembled piece, not ADV-02 output"
```

---

## STRUCTURAL FIX 2: QUALITY THRESHOLD ENFORCEMENT

### The Problem
AI accepts "7.8 is close enough to 8.0" or generates "CONDITIONAL_PASS" statuses that don't exist.

### The Fix

```yaml
quality_threshold:
  MINIMUM: 8.0 weighted score
  BINARY: PASS (>= 8.0) or FAIL (< 8.0)

  IF score < 8.0:
    STATUS = FAIL
    ACTION: Generate targeted revisions for weakest criteria
    ITERATE: Up to 3 revision cycles
    IF still < 8.0 after 3 cycles: ESCALATE to human

  FORBIDDEN scores:
    - 7.9 with "rounds up to 8.0" -- NO
    - 8.0 with "generous scoring" -- score must be EARNED
    - "CONDITIONAL_PASS at 7.5" -- status doesn't exist
```

---

## STRUCTURAL FIX 3: REVISION ANTI-DEGRADATION

### The Problem
AI generates "editorial revisions" that actually introduce promotional language, slop phrases, or scope creep. The revision makes the piece worse, not better.

### The Fix

```yaml
revision_quality_check:
  AFTER each revision:
    1. Run anti-slop scan on revised text
    2. Compare promotional language count: before vs after
    3. Compare editorial authenticity score: before vs after

    IF promotional_language_count_increased:
      REJECT revision: "Revision introduced promotional language"
      REVERT to pre-revision text

    IF editorial_score_decreased:
      REJECT revision: "Revision decreased editorial quality"
      REVERT to pre-revision text

    IF slop_phrases_found:
      REJECT revision: "Revision contains slop: [phrases]"
      REVERT and regenerate
```

---

## STRUCTURAL FIX 4: WORD COUNT AS HARD BOUNDARY

### The Problem
AI treats word count bounds as suggestions. "1,520 words for a type with 1,500 max" gets rationalized as "basically within bounds."

### The Fix

```yaml
word_count_enforcement:
  FROM strategy.type_constraints.word_count_range:
    min: [lower bound]
    max: [upper bound]

  CHECK:
    IF word_count < min:
      FAIL: "Below minimum ([count] < [min])"
      ACTION: Expand weakest sections with editorial content

    IF word_count > max:
      FAIL: "Above maximum ([count] > [max])"
      ACTION: Trim lowest-value sections

    TOLERANCE: ZERO -- bounds are hard limits
```

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "ADV-02 already smell-tested" | Assembly changes context -- need fresh test | HALT -- Run fresh smell test |
| "7.8 rounds up to 8.0" | Threshold is hard minimum | HALT -- Score < 8.0 is FAIL |
| "The revisions improved it" | Must verify revisions didn't degrade | HALT -- Compare before/after |
| "Hook was already validated" | Context may have weakened hook | HALT -- Re-validate in context |
| "20 words over limit is fine" | Word count bounds are hard limits | HALT -- Trim to bounds |
| "Arena is optional for editorial" | Arena is mandatory per system protocol | HALT -- Execute Arena |
| "The piece is good enough" | "Good enough" is a forbidden status | HALT -- Score formally |

---

## BINARY GATE ENFORCEMENT

```
VALID: COMPLETE, PASS
FORBIDDEN: PARTIAL_PASS, CONDITIONAL_PASS, SOFT_PASS, "good enough"
IF forbidden: HALT -> DELETE -> RETURN -> Re-evaluate
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-specimen-calibrator | layer-0-outputs/0.2-specimen-calibrator.md | 2KB |
| 0 | 0.3-strategy-loader | layer-0-outputs/0.3-strategy-loader.md | 1KB |
| 1 | 1.1-editorial-smell-auditor | layer-1-outputs/1.1-smell-auditor.md | 3KB |
| 1 | 1.2-hook-strength-reviewer | layer-1-outputs/1.2-hook-reviewer.md | 2KB |
| 2 | 2.1-editorial-revision-generator | layer-2-outputs/2.1-revision-generator.md | 5KB |
| 2 | 2.2-compliance-polish | layer-2-outputs/2.2-compliance-polish.md | 2KB |
| 4 | 4.1-quality-scorer | layer-4-outputs/4.1-quality-scorer.md | 3KB |
| 4 | 4.2-word-count-validator | layer-4-outputs/4.2-word-count-validator.md | 1KB |
| 4 | 4.3-output-packager | layer-4-outputs/4.3-output-packager.md | 1KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] ADV-05-ANTI-DEGRADATION.md read
[ ] ADV-05-AGENT.md read
[ ] Assembled advertorial validated as input

LAYER 0: Assembled piece + specimens + strategy loaded
LAYER 1: Fresh smell test run, hook re-validated
LAYER 2: Revisions generated, compliance polished
LAYER 2.5: Arena completed, human selected
LAYER 4: Quality scored >= 8.0, word count verified, final packaged

POST-EXECUTION:
[ ] Fresh smell test documented (not recycled from ADV-02)
[ ] Quality score earned (not inflated)
[ ] Revisions didn't degrade editorial quality
[ ] Word count within hard bounds
[ ] advertorial-final.md publication-ready
```

---

## KEY INSIGHT

> **"The editorial review is where quality is certified, not assumed. Every skill before this built the advertorial; this skill determines whether it should be published. A rubber-stamp editorial review is worse than no review -- it creates false confidence."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation: fresh smell test requirement, quality threshold enforcement, revision anti-degradation, word count hard boundaries |
