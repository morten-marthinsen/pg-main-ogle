# EC-03-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent Section Copy process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: EC-03-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Write standalone sections, embed proof in every section, include design notes, use exact feature names.
I WILL NOT: Write narrative copy that builds across sections, skip proof elements, exceed word budgets, or paraphrase feature names.
```

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI writes sections that reference each other ("as mentioned above")
- AI produces sections without proof elements (proof desert)
- AI exceeds word budgets, creating bloated sections
- AI paraphrases feature names instead of using exact EC-01 names
- AI writes narrative prose instead of scan-optimized copy
- AI skips design notes, producing copy-only output
- AI uses long-form patterns without adapting for ecom scan speed

---

## STRUCTURAL FIX 1: STANDALONE SECTION ENFORCEMENT

### The Problem
AI writes sections that depend on previous sections for context, creating a narrative flow that breaks when sections are viewed independently (which is how ecom pages are consumed).

### The Fix
```yaml
standalone_check:
  FOR each section:
    [ ] Contains NO references to other sections ("as we discussed", "see above")
    [ ] Contains NO narrative bridges ("building on that", "furthermore")
    [ ] Introduces its own context in the first sentence
    [ ] Could be read in ANY order and still make sense

  SHUFFLE TEST:
    Randomize section order. Read each independently.
    IF any section requires context from another: FAIL
```

---

## STRUCTURAL FIX 2: PROOF DENSITY ENFORCEMENT

### The Problem
AI writes persuasive copy without proof elements. On ecom, proof converts more than persuasion.

### The Fix
```yaml
proof_density:
  MINIMUM: 1 proof element per section
  PROOF TYPES:
    - Customer review quote
    - UGC reference
    - Before/after data
    - Statistic or study
    - Expert endorsement
    - Award or certification
    - Customer count ("127,000+ served")

  IF section has zero proof: HALT -- "Add proof element before proceeding"
  IF proof is vague ("studies show"): REJECT -- cite specific study/source
```

---

## STRUCTURAL FIX 3: FEATURE NAME CONSISTENCY

### The Problem
AI paraphrases feature names, creating inconsistency across the page. "HyperSpeed Face" becomes "the high-speed face" or "speed-optimized technology."

### The Fix
```yaml
feature_name_lock:
  LOAD exact feature names from EC-01 feature-package.json
  FOR each section that references a feature:
    [ ] Feature name matches EC-01 EXACTLY (case-sensitive)
    [ ] No paraphrasing, no shortening, no synonym substitution
    [ ] Feature name may be preceded by "the" but not modified

  EXAMPLES:
    CORRECT: "The HyperSpeed Face delivers..."
    WRONG: "The high-speed face technology..."
    WRONG: "Our advanced speed face..."
    WRONG: "HyperSpeed technology..."
```

---

## STRUCTURAL FIX 4: WORD BUDGET HARD LIMITS

### The Problem
AI produces 400-word sections when the budget is 200, creating bloated pages that fail scan optimization.

### The Fix
```yaml
word_budget_enforcement:
  FOR each section:
    budget: [from EC-00 strategy]
    actual: [word count]
    tolerance: +/- 10%

    IF actual > budget * 1.1: REJECT -- "Section exceeds budget by [X]%. Compress."
    IF actual < budget * 0.5: WARN -- "Section significantly under budget. May be too thin."
```

---

## STRUCTURAL FIX 5: DESIGN NOTES MANDATORY

### The Problem
AI produces copy without design context. Ecom copy is inseparable from layout.

### The Fix
```yaml
design_notes_check:
  FOR each section:
    [ ] layout specified (full-width, two-column, card, accordion, etc.)
    [ ] mobile_behavior specified (stack, collapse, swipe, etc.)
    [ ] visual_elements specified (images, icons, charts, etc.)

  IF any missing: HALT -- "Design notes required for page builder handoff"
```

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "Sections flow better with narrative bridges" | Ecom is scanned, not read sequentially | REMOVE bridges, make standalone |
| "Proof can be added later" | Proof is part of the copy, not a decoration | ADD proof now |
| "The feature name is close enough" | Consistency requires exact match | USE exact EC-01 name |
| "200 words isn't enough for this section" | Budget is binding; compress, not expand | COMPRESS to budget |
| "Design notes are the designer's job" | Copy + layout are inseparable on ecom | INCLUDE design notes |

---

## BINARY GATE ENFORCEMENT

```
VALID STATUSES: PASS, FAIL
FORBIDDEN: PARTIAL_PASS, "mostly standalone", "generally consistent"
```

---

## IMPLEMENTATION CHECKLIST — ARENA

```
LAYER 2.5 (ARENA -- MANDATORY):
[ ] ARENA-LAYER.md READ (MANDATORY — contains skill-specific judging criteria)
[ ] ARENA-CORE-PROTOCOL.md READ (path: ~system/protocols/ARENA-CORE-PROTOCOL.md)
[ ] ARENA-PERSONA-PANEL.md READ (path: ~system/protocols/ARENA-PERSONA-PANEL.md)
[ ] Persona names VERIFIED against protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect
[ ] All 7 competitors generated section copy packages
[ ] All packages scored against criteria
[ ] Human selection received (BLOCKING)
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-crossover-pattern-loader | layer-0-outputs/0.2-crossover-pattern-loader.md | 2KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 1 | 1.1-section-router | layer-1-outputs/1.1-section-router.md | 3KB |
| 1 | 1.2-proof-element-planner | layer-1-outputs/1.2-proof-element-planner.md | 3KB |
| 1 | 1.3-design-note-planner | layer-1-outputs/1.3-design-note-planner.md | 3KB |
| 2 | 2.1-section-copy-generator | layer-2-outputs/2.1-section-copy-generator.md | 10KB |
| 2 | 2.2-proof-embedding | layer-2-outputs/2.2-proof-embedding.md | 5KB |
| 4 | 4.1-standalone-section-tester | layer-4-outputs/4.1-standalone-section-tester.md | 3KB |
| 4 | 4.2-feature-consistency-checker | layer-4-outputs/4.2-feature-consistency-checker.md | 2KB |
| 4 | 4.3-output-packager | layer-4-outputs/4.3-output-packager.md | 1KB |

---

## KEY INSIGHT

> "Ecom copy is scanned, not read. Every section must work standalone. Every section needs proof. Every section needs design notes. The moment you write 'as we discussed above,' you've failed."

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation: 5 structural fixes (standalone enforcement, proof density, feature name consistency, word budget hard limits, design notes mandatory), forbidden rationalizations, per-microskill output protocol. |
