# ADV-02-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent advertorial body copy process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: ADV-02-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files, enforce proof density rules, pass editorial smell test.
I WILL NOT: Stack proof elements, skip specimen calibration, use promotional mechanism framing, or bypass smell test.
```

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI stacks 3+ proof elements in consecutive paragraphs (most common failure)
- AI frames mechanism in promotional language ("our patented formula")
- AI generates body that fails editorial smell test when product name removed
- AI skips type-specific structure routing, uses generic body template
- AI embeds more than 1 proof element per paragraph
- AI introduces product name too early (before paragraph 5)
- AI generates feature lists disguised as editorial content
- AI voice drifts from lead's established register

---

## STRUCTURAL FIX 1: PROOF DENSITY ENFORCEMENT

### The Problem
AI naturally wants to "prove" the product works by stacking testimonials, studies, and statistics in rapid succession. 3+ proof elements in sequence triggers "ad smell" -- readers recognize the selling pattern and disengage.

### The Fix

```yaml
proof_density_enforcement:
  AFTER every paragraph generation:
    count_proof_in_paragraph: [0 or 1]
    IF count > 1:
      HALT: "More than 1 proof element in paragraph [N]"
      ACTION: Split proof into separate paragraphs with narrative between

    count_consecutive_proof_paragraphs: [0, 1, or 2]
    IF count >= 3:
      HALT: "Proof stacking detected -- 3+ consecutive proof paragraphs"
      ACTION: Insert narrative/editorial paragraph between proof sections

  RHYTHM CHECK:
    Ideal pattern: narrative -> proof -> narrative -> proof
    Acceptable: narrative -> proof -> proof -> narrative
    FORBIDDEN: proof -> proof -> proof (3+ consecutive)
```

---

## STRUCTURAL FIX 2: EDITORIAL SMELL TEST GATE

### The Problem
AI writes body copy that discusses the mechanism and product in language indistinguishable from a sales page. When you remove the product name, the content reads as a product description, not an article.

### The Fix

```yaml
smell_test_protocol:
  BEFORE body draft can be packaged:
    1. CREATE redacted version (remove product/brand names)
    2. READ redacted version
    3. EVALUATE: "Could this appear in a health/lifestyle publication?"

    IF reads_as_ad:
      HALT: "Body fails editorial smell test"
      ACTION: Rewrite promotional sections through editorial lens
      SPECIFIC FIX: Replace product language with mechanism language
        "Our formula contains..." -> "The compound contains..."
        "This product is..." -> "The approach involves..."
        "Customers report..." -> "Participants in the study reported..."
```

---

## STRUCTURAL FIX 3: TYPE-SPECIFIC STRUCTURE ENFORCEMENT

### The Problem
AI ignores the advertorial type and generates a generic body structure. A listicle body should have numbered items. A native article should have journalistic structure. Generic bodies feel like generic ads.

### The Fix

```yaml
type_structure_enforcement:
  BEFORE generation:
    VERIFY type_structure_template loaded from 1.1
    VERIFY sections mapped to type requirements

    IF template not loaded:
      HALT: "Cannot generate body without type-specific template"

  DURING generation:
    EACH section must match template slot
    EACH section header must follow type conventions
    TOTAL section count must match template
```

---

## STRUCTURAL FIX 4: PRODUCT NAME PLACEMENT GATE

### The Problem
AI introduces the product name in the first or second body paragraph, immediately signaling "this is an ad" to the reader.

### The Fix

```yaml
product_name_placement:
  RULE: Product name CANNOT appear before paragraph 5 of body
  MECHANISM references before paragraph 5 must use:
    - Generic category terms ("a compound", "an approach", "a technique")
    - Editorial descriptors ("what researchers identified", "the finding")

  ENFORCEMENT:
    SCAN each paragraph for product name
    IF found before paragraph 5:
      HALT: "Product name too early -- paragraph [N]"
      ACTION: Replace with editorial mechanism language
```

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "More proof = more convincing" | 3+ proof stacking = ad smell = reader bounce | HALT -- Distribute proof |
| "The product name builds familiarity" | Early product name = ad signal = trust loss | HALT -- Delay to paragraph 5+ |
| "Generic body works for any type" | Type-specific structure = editorial authenticity | HALT -- Use type template |
| "The mechanism explanation needs product context" | Mechanism can be explained without brand name | HALT -- Use editorial framing |
| "Smell test is subjective" | Smell test has objective criteria (see protocol) | HALT -- Run formal check |
| "Arena adds too many tokens" | Quality over cost | HALT -- Execute Arena |

---

## BINARY GATE ENFORCEMENT

```
VALID: COMPLETE, PASS
FORBIDDEN: PARTIAL_PASS, CONDITIONAL_PASS, SOFT_PASS,
           approved_with_concerns, "good enough"

IF forbidden status generated:
  1. HALT 2. DELETE output 3. RETURN to failing layer 4. Re-evaluate
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-specimen-calibrator | layer-0-outputs/0.2-specimen-calibrator.md | 2KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 1 | 1.1-type-structure-router | layer-1-outputs/1.1-type-structure-router.md | 3KB |
| 1 | 1.2-proof-weaving-planner | layer-1-outputs/1.2-proof-weaving-planner.md | 2KB |
| 2 | 2.1-body-section-generator | layer-2-outputs/2.1-body-section-generator.md | 5KB |
| 2 | 2.2-proof-embedding | layer-2-outputs/2.2-proof-embedding.md | 3KB |
| 4 | 4.1-editorial-smell-tester | layer-4-outputs/4.1-editorial-smell-tester.md | 2KB |
| 4 | 4.2-proof-density-checker | layer-4-outputs/4.2-proof-density-checker.md | 2KB |
| 4 | 4.3-output-packager | layer-4-outputs/4.3-output-packager.md | 1KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] ADV-02-ANTI-DEGRADATION.md read (THIS FILE)
[ ] ADV-02-AGENT.md read
[ ] Strategy and lead draft validated as inputs

LAYER 0: Strategy + lead + specimens loaded, inputs validated
LAYER 1: Type template selected, proof placement planned
LAYER 2: Body sections generated, proof embedded per plan
LAYER 2.5: Arena completed, human selected
LAYER 4: Smell test passed, proof density checked, packaged

POST-EXECUTION:
[ ] Proof density log shows zero violations
[ ] Smell test documented with evidence
[ ] Bridge handoff populated
```

---

## KEY INSIGHT

> **"The body copy is where advertorials live or die. Any reader can feel the shift from 'article I'm reading' to 'ad trying to sell me something.' Proof density is the tell -- the moment proof stacks, the reader knows."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation: proof density enforcement, editorial smell test gate, type structure enforcement, product name placement gate |
