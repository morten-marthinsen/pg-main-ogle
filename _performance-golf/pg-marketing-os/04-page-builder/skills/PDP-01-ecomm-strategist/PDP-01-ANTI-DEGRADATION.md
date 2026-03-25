# PDP-01-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent E-Comm Strategist process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: PDP-01-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Write copy in the strategy output, skip NLS framework loading, or produce vague section rationales.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI writes COPY instead of STRATEGY (producing headlines, taglines, body copy in the strategy document)
- AI skips NLS framework loading and invents section types
- AI produces fewer than 8 active sections (thin strategy)
- AI uses vague section rationales ("this section adds value")
- AI skips word budgeting or sets unrealistic budgets (100-word mechanism section)
- AI does not define feature research scope, leaving PDP-02 directionless
- AI ignores crossover mapping to long-form skills
- AI treats standalone brief (Mode B) as complete without validating equivalent data coverage

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: NO COPY IN STRATEGY

### The Problem
AI blends strategy and copy -- producing headlines, taglines, or descriptive prose in what should be a structural document. The strategy output must be pure architecture: section names, priorities, word budgets, crossover references.

### The Fix

**ecomm-strategy.yaml MUST contain ZERO prose copy:**

```yaml
copy_prohibition_check:
  headline_text_present: [Y/N]
  tagline_text_present: [Y/N]
  body_copy_present: [Y/N]
  feature_description_prose_present: [Y/N]

  IF any_yes:
    HALT -- "Strategy contains copy. Remove all prose. Strategy = architecture only."
```

**Allowed content in strategy:**
- Section names (from NLS framework)
- Priority numbers (1-N)
- Word budgets (integer values)
- Crossover skill references (skill IDs)
- Proof type requirements (category labels)
- Design note seeds (structural descriptions, not copy)
- Feature research scope (capability names, not descriptions)

**Forbidden content in strategy:**
- Headlines or taglines
- Body copy sentences
- Feature descriptions (save for PDP-02)
- Value propositions (save for PDP-03)
- Section copy (save for PDP-07)

---

## STRUCTURAL FIX 2: NLS FRAMEWORK MANDATORY LOAD

### The Problem
AI invents section types from general knowledge instead of loading the specific 19-section NLS PDP framework. This produces inconsistent section naming and misses framework-specific guidance.

### The Fix

**Section mapping CANNOT execute unless NLS framework is loaded:**

```yaml
nls_framework_check:
  file_loaded: [Y/N]
  file_path: "~brain/nls-pdp-best-practices.md"
  section_count_in_framework: 19
  sections_referenced_in_map: [number]

  IF file_loaded == N:
    HALT -- "Cannot map sections without NLS framework loaded"

  IF sections_referenced_in_map uses non-NLS names:
    HALT -- "Section names must match NLS framework exactly"
```

---

## STRUCTURAL FIX 3: MINIMUM SECTION THRESHOLD

### The Problem
AI produces thin strategy with 4-5 sections, missing critical conversion sections. A product page needs depth to convert.

### The Fix

**Active section count must be >= 8:**

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| Active sections | 8 | HALT -- Review excluded sections |
| Hero section (1) | ALWAYS active | HALT -- Hero cannot be excluded |
| CTA section (3 or 16) | At least one | HALT -- Page needs at least one CTA |
| Proof section (5, 14, or 19) | At least one | HALT -- Page needs social proof |
| Feature section (4, 7, or 10) | At least one | HALT -- Page needs feature depth |

---

## STRUCTURAL FIX 4: WORD BUDGET REALISM

### The Problem
AI sets word budgets that are either too low (50 words for a mechanism section) or too high (800 words for a single ecom section). Ecom is scanned, not read.

### The Fix

```yaml
word_budget_bounds:
  per_section:
    minimum: 50
    maximum: 500
  total_page:
    minimum: 1500
    maximum: 5000

  IF any_section < 50:
    HALT -- "Section too thin. Minimum 50 words per section."
  IF any_section > 500:
    HALT -- "Section too long for scan optimization. Maximum 500 words."
  IF total > 5000:
    HALT -- "Page too long. Reduce section count or per-section budgets."
  IF total < 1500:
    HALT -- "Page too thin. Increase budgets or add sections."
```

---

## STRUCTURAL FIX 5: FEATURE RESEARCH SCOPE REQUIRED

### The Problem
AI produces strategy without defining what features PDP-02 should investigate. PDP-02 then guesses at feature scope, producing irrelevant naming.

### The Fix

```yaml
feature_scope_check:
  hero_feature_candidates: [number]
  supporting_feature_candidates: [number]
  technical_features: [number]

  IF hero_feature_candidates < 1:
    HALT -- "Must identify at least 1 hero feature candidate"
  IF supporting_feature_candidates < 2:
    HALT -- "Must identify at least 2 supporting feature candidates"
  IF total_candidates < 4:
    HALT -- "Feature research scope too thin for PDP-02"
```

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "I'll add section details later" | Strategy must be complete before downstream skills execute | HALT -- Complete now |
| "The NLS framework is just a guide" | NLS is the CANONICAL section framework for this engine | HALT -- Load and follow |
| "5 sections is enough for this product" | Minimum 8 active sections for conversion depth | HALT -- Add sections |
| "Word budgets are approximate" | Word budgets are binding constraints for downstream skills | HALT -- Set precise budgets |
| "Feature scope will emerge in PDP-02" | PDP-02 needs direction from strategy | HALT -- Define scope now |
| "Crossover mapping is optional" | Long-form patterns are a core advantage of this engine | HALT -- Map crossovers |

---

## BINARY GATE ENFORCEMENT

**Gate statuses are BINARY: PASS or FAIL.**

```
VALID GATE STATUSES:
  COMPLETE (layer checkpoint)
  PASS (gate evaluation)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / conditional_approval
  PROCEED_WITH_CONCERNS / WARNING
  "good enough" / "acceptable for now"

IF any forbidden status is generated:
  1. HALT immediately
  2. DELETE any output files created under the false status
  3. RETURN to the failing layer
  4. Re-evaluate with valid statuses only
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-nls-framework-loader | layer-0-outputs/0.2-nls-framework-loader.md | 1KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 1 | 1.1-page-type-classifier | layer-1-outputs/1.1-page-type-classifier.md | 2KB |
| 1 | 1.2-section-mapper | layer-1-outputs/1.2-section-mapper.md | 3KB |
| 1 | 1.3-crossover-identifier | layer-1-outputs/1.3-crossover-identifier.md | 2KB |
| 2 | 2.1-strategy-assembler | layer-2-outputs/2.1-strategy-assembler.md | 5KB |
| 4 | 4.1-strategy-validator | layer-4-outputs/4.1-strategy-validator.md | 2KB |
| 4 | 4.2-output-packager | layer-4-outputs/4.2-output-packager.md | 1KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] PDP-01-ANTI-DEGRADATION.md read (THIS FILE)
[ ] PDP-01-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Input files validated (campaign brief OR standalone brief)
[ ] Source mode determined (Mode A or Mode B)

LAYER 0 (FOUNDATION):
[ ] Upstream brief loaded (Mode A or Mode B)
[ ] NLS PDP framework loaded from ~brain/
[ ] Product details validated (name, category, 3+ features, audience)

LAYER 1 (CLASSIFICATION):
[ ] Page type classified (PDP / collection / bundle) with rationale
[ ] Section map produced (minimum 8 active sections)
[ ] Crossover skills identified per section
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (ASSEMBLY):
[ ] Section priority ranked (1-N)
[ ] Word budgets set per section (50-500 per section, 1500-5000 total)
[ ] Feature research scope defined for PDP-02
[ ] LAYER_2_COMPLETE.yaml created

LAYER 4 (VALIDATION):
[ ] Strategy validated for completeness
[ ] ecomm-strategy.yaml packaged and schema-compliant
[ ] ZERO copy content in strategy output
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] Downstream handoffs populated (PDP-02 through LP-15 references)

ON CONTEXT RESUME:
[ ] VERIFY NLS framework was loaded (check execution log)
[ ] VERIFY section count meets minimum (check strategy output)
[ ] VERIFY word budgets are within bounds
[ ] VERIFY feature research scope is populated
[ ] If NLS framework skipped, RETURN to Layer 0
```

---

## KEY INSIGHT

> "Strategy without the NLS framework is guesswork. Strategy with copy mixed in is confusion. The blueprint must be pure architecture -- section names, priorities, word budgets, crossover references -- nothing else."

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation: 5 structural fixes (no copy in strategy, NLS mandatory load, minimum section threshold, word budget realism, feature research scope required), forbidden rationalizations, binary gate enforcement, per-microskill output protocol, implementation checklist. |
