# EC-02-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent Hero & Value Prop process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: EC-02-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files and respect all word budgets exactly.
I WILL NOT: Pack the hero with everything, write BTF content in the hero, or exceed word budgets.
```

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI packs the hero section with everything (benefits, features, proof, story, FAQ)
- AI writes headlines that exceed 12 words
- AI produces subheads that repeat the headline instead of expanding it
- AI writes value props that are feature lists instead of reasons to act
- AI uses passive CTAs ("Learn More") instead of action CTAs ("Shop Now")
- AI skips the 10-thumbnail carousel or produces fewer than 10 positions
- AI ignores the hero feature from EC-01
- AI writes hero copy that only works when read, not scanned

---

## STRUCTURAL FIX 1: HERO SCOPE LOCK

### The Problem
AI treats the hero as a mini-sales-page, packing it with everything. The hero has ONE job: stop the scroll and earn the scroll-down.

### The Fix

```yaml
hero_scope_lock:
  ALLOWED in hero:
    - Headline (5-12 words)
    - Subhead (10-20 words)
    - Value proposition (15-30 words)
    - CTA button text (3-5 words)
    - Product highlights TLDR (3-5 items, 50-100 words total)
    - 10-thumbnail carousel copy

  FORBIDDEN in hero:
    - Full feature descriptions (save for EC-03)
    - Extended proof/testimonials (save for EC-03)
    - FAQ content (save for EC-03)
    - Guarantee copy (save for EC-03)
    - Comparison charts (save for EC-03)
    - Pricing details (save for EC-03)
    - Story elements (save for EC-03)

  IF forbidden content detected in hero output:
    REJECT -- "Hero contains BTF content. Remove and save for EC-03."
```

---

## STRUCTURAL FIX 2: WORD BUDGET ENFORCEMENT

### The Problem
AI writes headlines and subheads that exceed word limits, diluting impact. Every extra word in a headline reduces stopping power.

### The Fix

```yaml
word_budget_enforcement:
  headline:
    min: 5
    max: 12
    IF exceeds: REJECT -- "Headline must be 5-12 words. Currently [X]. Compress."

  subhead:
    min: 10
    max: 20
    IF exceeds: REJECT -- "Subhead must be 10-20 words. Currently [X]. Compress."

  value_prop:
    min: 15
    max: 30
    IF exceeds: REJECT -- "Value prop must be 15-30 words. Currently [X]. Compress."

  cta:
    min: 2
    max: 5
    IF exceeds: REJECT -- "CTA must be 2-5 words. Currently [X]. Compress."

  ENFORCEMENT:
    Word counts are HARD LIMITS, not guidelines.
    IF any component exceeds max: HALT -- compress before proceeding.
```

---

## STRUCTURAL FIX 3: CAROUSEL COMPLETENESS

### The Problem
AI produces 3-5 carousel positions instead of the required 10, or produces carousel without visual direction notes.

### The Fix

```yaml
carousel_check:
  required_positions: 10
  per_position_requirements:
    - position_number: [1-10]
    - thumbnail_copy: [not empty]
    - visual_direction: [not empty]

  IF positions < 10:
    HALT -- "Carousel requires 10 positions. Currently [X]. Complete all."
  IF any position missing copy:
    HALT -- "Position [X] missing thumbnail copy."
  IF any position missing visual direction:
    HALT -- "Position [X] missing visual direction note."
```

---

## STRUCTURAL FIX 4: HERO FEATURE ANCHOR

### The Problem
AI writes hero copy that doesn't reference the hero feature from EC-01, producing generic hero sections that could apply to any product.

### The Fix

```yaml
hero_feature_check:
  hero_feature_name: [from EC-01 feature-package.json]

  hero_must_reference_in:
    - headline OR subhead (hero feature name or concept)
    - product highlights (hero feature as #1 highlight)
    - carousel (hero feature in position 1-3)

  IF hero feature not referenced in any of the above:
    HALT -- "Hero feature [X] must appear in hero section."
```

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "The headline needs context -- 15 words" | Headlines work BECAUSE they're compressed | COMPRESS to 12 words max |
| "The value prop should list all features" | Value prop = reason to act, not feature list | REWRITE as WHY, not WHAT |
| "Learn More is standard for ecom" | "Learn More" is passive; action CTAs convert higher | USE action CTA |
| "5 carousel positions is enough" | NLS framework specifies 10-position narrative | COMPLETE all 10 |
| "The hero feature doesn't fit the headline" | Headline must serve the hero feature | REWORK headline around hero feature |
| "We can add more to the hero later" | Hero scope is locked; BTF content goes to EC-03 | REMOVE BTF content |

---

## BINARY GATE ENFORCEMENT

```
VALID STATUSES: PASS, FAIL
FORBIDDEN: PARTIAL_PASS, CONDITIONAL_PASS, "close enough", "within range"
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-specimen-calibrator | layer-0-outputs/0.2-specimen-calibrator.md | 1KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 1 | 1.1-headline-formula-selector | layer-1-outputs/1.1-headline-formula-selector.md | 2KB |
| 1 | 1.2-thumbnail-story-planner | layer-1-outputs/1.2-thumbnail-story-planner.md | 3KB |
| 1 | 1.3-highlights-selector | layer-1-outputs/1.3-highlights-selector.md | 2KB |
| 2 | 2.1-headline-subhead-generator | layer-2-outputs/2.1-headline-subhead-generator.md | 3KB |
| 2 | 2.2-hero-section-generator | layer-2-outputs/2.2-hero-section-generator.md | 5KB |
| 4 | 4.1-scroll-stop-validator | layer-4-outputs/4.1-scroll-stop-validator.md | 2KB |
| 4 | 4.2-word-budget-checker | layer-4-outputs/4.2-word-budget-checker.md | 1KB |
| 4 | 4.3-output-packager | layer-4-outputs/4.3-output-packager.md | 1KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] EC-02-ANTI-DEGRADATION.md read
[ ] EC-02-AGENT.md read
[ ] Hero feature identified from EC-01

LAYER 0: Strategy + feature package + NLS patterns loaded
LAYER 1: Headline approach + carousel plan + highlights selected
LAYER 2: 5+ headline/subhead pairs + complete hero section generated
LAYER 2.5: Arena complete + human selection received
LAYER 4: Scroll-stop validated + word budgets met + hero-copy-draft.md packaged

ON CONTEXT RESUME:
[ ] VERIFY hero feature is being used
[ ] VERIFY word budgets not exceeded
[ ] VERIFY carousel has 10 positions
```

---

## KEY INSIGHT

> "The hero sells the click, not the product. Pack it with everything and you sell nothing. Headline + subhead + value prop + proof point + CTA. That's it. Everything else goes below the fold."

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation: 4 structural fixes (hero scope lock, word budget enforcement, carousel completeness, hero feature anchor), forbidden rationalizations, per-microskill output protocol. |
