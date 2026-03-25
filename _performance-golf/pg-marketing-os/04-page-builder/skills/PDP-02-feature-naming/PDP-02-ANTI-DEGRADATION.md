# PDP-02-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent Feature Naming process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: PDP-02-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files and reject ALL generic feature names.
I WILL NOT: Accept "Advanced Technology" or any generic naming pattern, skip the Arena, or write paragraph descriptions instead of micro-scripts.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI names features with generic descriptors ("Advanced Technology", "Premium Quality")
- AI skips caveman-benefit format and uses technical jargon alone
- AI produces paragraph-length descriptions instead of 1-2 sentence micro-scripts
- AI does not rank features into hierarchy (all treated equally)
- AI accepts first-draft names without testing for standalone clarity
- AI skips Arena and produces single-perspective naming
- AI generates names that sound impressive but communicate nothing

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: GENERIC NAME KILL LIST

### The Problem
AI defaults to safe, generic naming patterns that sound professional but communicate nothing. "Advanced Technology" could describe any product in any category.

### The Fix

**AUTO-REJECT any feature name containing these patterns:**

```yaml
generic_kill_list:
  prefixes:
    - "Advanced"
    - "Premium"
    - "Superior"
    - "Professional"
    - "Ultra"
    - "Pro"
    - "Next-Gen"
    - "State-of-the-Art"
    - "Best-in-Class"
    - "Cutting-Edge"
    - "High-Performance"
    - "Multi-"

  suffixes:
    - "Technology"
    - "System"
    - "Solution"
    - "Platform"
    - "Complex"
    - "Formula"
    - "Blend"

  IF name matches [generic_prefix] + [generic_suffix]:
    AUTO-REJECT
    EXAMPLE: "Advanced Technology" -> REJECTED
    EXAMPLE: "Premium System" -> REJECTED
    EXAMPLE: "Pro Formula" -> REJECTED

  REPLACEMENT PROTOCOL:
    1. Identify the SPECIFIC mechanism/ingredient/component
    2. Identify the SPECIFIC benefit in plain language
    3. Combine: [Specific Thing] + [Benefit Word]
    EXAMPLE: "Advanced Cushioning Technology" -> "CloudStrike Cushioning"
    EXAMPLE: "Premium Face Material" -> "Forged Titanium Face"
```

---

## STRUCTURAL FIX 2: CAVEMAN-BENEFIT FORMAT ENFORCEMENT

### The Problem
AI uses technical naming only (ingredient/tech name without benefit) or benefit-only naming (benefit without identifying the mechanism).

### The Fix

**Every feature name must pass the caveman test:**

```
CAVEMAN TEST:
  Can a person with ZERO product knowledge understand:
    1. WHAT this feature IS (ingredient, technology, component)?
    2. WHY this feature MATTERS (what benefit does it deliver)?

  IF only WHAT: Add benefit component
    "L-Theanine" -> "L-Theanine for Tranquility"

  IF only WHY: Add mechanism component
    "Better Distance" -> "HyperSpeed Face for Distance"

  IF neither: Reject entirely
    "X-Factor" -> What does this mean? REJECT.

FORMAT TEMPLATES:
  Pattern A: [Mechanism Name] for [Benefit]
    "Marine Collagen for Skin Renewal"

  Pattern B: [Benefit-Descriptive] [Component]
    "Dynamic Loft Control"
    "Triple-Layer Cushioning"

  Pattern C: [Branded Mechanism] [Result Word]
    "HyperSpeed Face"
    "CloudStrike Cushioning"
```

---

## STRUCTURAL FIX 3: MICRO-SCRIPT LENGTH ENFORCEMENT

### The Problem
AI writes paragraph-length feature descriptions when micro-scripts should be 1-2 sentences (20-40 words).

### The Fix

```yaml
micro_script_bounds:
  minimum: 15 words
  maximum: 50 words
  target: 25-35 words
  sentence_count: 1-2

  IF word_count > 50:
    REJECT -- "Micro-script too long. Compress to 1-2 sentences."

  IF word_count < 15:
    REJECT -- "Micro-script too thin. Must explain WHAT + WHY."

  STRUCTURE:
    Sentence 1: What the feature IS and what it DOES
    Sentence 2: Why that MATTERS to the customer (optional but preferred)

  EXAMPLE (good, 32 words):
    "Dynamic Loft Control automatically adjusts the club face angle
     during your swing, optimizing launch for maximum carry distance
     on every shot."

  EXAMPLE (bad, 78 words):
    "Our advanced Dynamic Loft Control technology represents the
     cutting-edge of golf club engineering. It uses sophisticated
     sensors and algorithms to..." -> TOO LONG, REJECT
```

---

## STRUCTURAL FIX 4: HIERARCHY ENFORCEMENT

### The Problem
AI treats all features equally, producing a flat list instead of a clear hierarchy. Without hierarchy, the hero section has no anchor and section copy lacks emphasis structure.

### The Fix

```yaml
hierarchy_requirements:
  hero:
    count: 1-2
    criteria: "Most differentiated, most benefit-clear, most memorable name"
    page_placement: "ATF hero, product highlights, headline material"

  supporting:
    count: 3-5
    criteria: "Meaningful benefit, adds depth, not redundant with hero"
    page_placement: "BTF feature sections, comparison charts"

  technical:
    count: 1-4
    criteria: "Specs, materials, certifications -- credibility enhancers"
    page_placement: "Ingredient panels, spec tables, technical sections"

  ENFORCEMENT:
    IF no hero designated: HALT -- "Must identify at least 1 hero feature"
    IF hero count > 2: REDUCE -- "Too many heroes dilutes impact"
    IF supporting count < 2: EXPAND -- "Need depth beyond hero"
    IF all features same tier: HALT -- "Hierarchy required"
```

---

## STRUCTURAL FIX 5: STANDALONE NAME TEST

### The Problem
AI produces names that require context to understand. If someone sees "Formula X" on a product page without reading the description, they learn nothing.

### The Fix

```yaml
standalone_test:
  question: "If I showed ONLY the feature name (no description, no context),
             would the reader understand WHAT this feature does and WHY
             it matters?"

  PASS examples:
    "L-Theanine for Tranquility" -> Tells me ingredient + benefit
    "Dynamic Loft Control" -> Tells me it adjusts loft + I control it
    "Triple-Layer Cushioning" -> Tells me structure + comfort purpose

  FAIL examples:
    "X-Factor Technology" -> Tells me nothing
    "Formula 7" -> What does 7 mean?
    "The Edge" -> Edge of what?
    "ProSystem" -> Pro at what?

  ENFORCEMENT:
    FOR each feature name:
      APPLY standalone test
      IF FAIL: REJECT -- rename with benefit component
```

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "The description explains the name" | Name must work WITHOUT description | REJECT -- rename |
| "This is the brand's official name" | If generic, add benefit qualifier | MODIFY -- add benefit |
| "Advanced Technology is industry standard" | Industry standard = invisible on page | REJECT -- rename |
| "Short names are better" | Short AND meaningful, not just short | ADD benefit component |
| "Micro-scripts can be longer for complex features" | 50 words maximum, no exceptions | COMPRESS -- rewrite |
| "All features are equally important" | Hierarchy creates page structure | RANK -- designate hero |
| "Arena is optional for naming" | Naming IS the critical skill -- Arena required | EXECUTE Arena |

---

## BINARY GATE ENFORCEMENT

```
VALID GATE STATUSES:
  COMPLETE (layer checkpoint)
  PASS (gate evaluation)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  "mostly non-generic" / "generally clear"
  "good enough names" / "acceptable naming"

IF any forbidden status is generated:
  1. HALT immediately
  2. DELETE any output files created under the false status
  3. RETURN to the failing layer
  4. Re-evaluate with PASS/FAIL only
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-specimen-calibrator | layer-0-outputs/0.2-specimen-calibrator.md | 1KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 1 | 1.1-capability-mapper | layer-1-outputs/1.1-capability-mapper.md | 2KB |
| 1 | 1.2-hierarchy-designer | layer-1-outputs/1.2-hierarchy-designer.md | 2KB |
| 1 | 1.3-crossover-loader | layer-1-outputs/1.3-crossover-loader.md | 1KB |
| 2 | 2.1-caveman-benefit-namer | layer-2-outputs/2.1-caveman-benefit-namer.md | 3KB |
| 2 | 2.2-micro-script-per-feature | layer-2-outputs/2.2-micro-script-per-feature.md | 3KB |
| 4 | 4.1-generic-name-detector | layer-4-outputs/4.1-generic-name-detector.md | 2KB |
| 4 | 4.2-name-standalone-tester | layer-4-outputs/4.2-name-standalone-tester.md | 2KB |
| 4 | 4.3-output-packager | layer-4-outputs/4.3-output-packager.md | 1KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] PDP-02-ANTI-DEGRADATION.md read (THIS FILE)
[ ] PDP-02-AGENT.md read
[ ] PROJECT-STATE.md created
[ ] PROGRESS-LOG.md created
[ ] checkpoints/ directory created

LAYER 0 (FOUNDATION):
[ ] Strategy loaded (ecomm-strategy.yaml)
[ ] Specimen patterns loaded (PG sf2 feature naming)
[ ] Product capability data validated (minimum 4)

LAYER 1 (CAPABILITY ANALYSIS):
[ ] All capabilities mapped
[ ] Hierarchy designed (hero / supporting / technical)
[ ] Skill 15 crossover patterns loaded
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (NAMING):
[ ] Every feature named in caveman-benefit format
[ ] Generic kill list applied -- zero violations
[ ] Every feature has 1-2 sentence micro-script (15-50 words)
[ ] LAYER_2_COMPLETE.yaml created

LAYER 2.5 (ARENA -- MANDATORY):
[ ] ARENA-LAYER.md READ (MANDATORY — contains skill-specific judging criteria)
[ ] ARENA-CORE-PROTOCOL.md READ (path: ~system/protocols/ARENA-CORE-PROTOCOL.md)
[ ] ARENA-PERSONA-PANEL.md READ (path: ~system/protocols/ARENA-PERSONA-PANEL.md)
[ ] Persona names VERIFIED against protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect
[ ] All 7 competitors generated naming packages
[ ] All packages scored against 7 criteria
[ ] Human selection received (BLOCKING)
[ ] ARENA_COMPLETE.yaml created

LAYER 4 (VALIDATION):
[ ] Generic name detector: zero detections
[ ] Standalone name tester: all names pass
[ ] feature-package.json assembled
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] All output files verified
[ ] Downstream handoffs populated (PDP-03, PDP-07, PDP-08)

ON CONTEXT RESUME:
[ ] VERIFY specimen patterns were loaded
[ ] VERIFY generic detection was run (not skipped)
[ ] VERIFY human selection exists
[ ] If specimens skipped, RETURN to Layer 0
```

---

## KEY INSIGHT

> "A great feature name does more work than a paragraph of description. 'Dynamic Loft Control' tells you everything. 'Advanced Technology' tells you nothing. Feature naming IS the copy."

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation: 5 structural fixes (generic kill list, caveman-benefit enforcement, micro-script length, hierarchy enforcement, standalone name test), forbidden rationalizations, per-microskill output protocol. |
