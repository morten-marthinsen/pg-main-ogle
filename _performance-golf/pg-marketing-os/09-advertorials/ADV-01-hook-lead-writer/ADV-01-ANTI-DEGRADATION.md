# ADV-01-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent advertorial hook/lead process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: ADV-01-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Skip specimen loading, generate promotional hooks, bypass editorial voice checks, or auto-select without human input.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates hooks WITHOUT loading advertorial specimens
- AI writes promotional openers disguised as editorial hooks
- AI reveals product name in hook or lead
- AI skips Arena competition and auto-selects best hook
- AI generates leads that read as ad copy, not article openings
- AI produces hooks that don't stop the scroll
- AI accepts hooks below 8.0 threshold
- AI bypasses editorial voice check

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: SPECIMEN LOADING BEFORE GENERATION

### The Problem
AI generates hooks from formulas alone without calibrating against real advertorial specimens. This produces generic hooks that lack the editorial DNA of proven advertorials.

### The Fix

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/ADV-01/checkpoints/SPECIMENS_LOADED.yaml
```

```yaml
specimen_loading_check:
  specimens_loaded: [Y/N]
  specimen_count: [number]
  hook_patterns_extracted: [number]
  type_matched: [Y/N]

  IF specimens_loaded == N:
    HALT: "Cannot generate hooks without specimen calibration"
```

---

## STRUCTURAL FIX 2: EDITORIAL VOICE GATE

### The Problem
AI defaults to promotional language in hook/lead generation. "Are you tired of joint pain?" reads as an ad, not an article. This violates Laws 1, 2, and 3 simultaneously.

### The Fix

**EVERY generated hook/lead MUST pass editorial voice check before scoring:**

```yaml
editorial_voice_check:
  product_name_in_hook: [Y/N]
  product_name_in_lead_first_60_percent: [Y/N]
  promotional_phrases_found: [count]
  direct_address_selling: [Y/N]
  reads_as_article_without_product: [Y/N]

  IF product_name_in_hook == Y:
    REJECT: "Product name forbidden in hook"
  IF promotional_phrases_found > 0:
    REJECT: "Promotional language detected: [phrases]"
  IF reads_as_article_without_product == N:
    REJECT: "Fails editorial smell test"
```

---

## STRUCTURAL FIX 3: SCROLL-STOP QUALITY ENFORCEMENT

### The Problem
AI generates hooks that are editorially sound but lack stopping power. A hook that reads well but doesn't stop the scroll fails its primary mission.

### The Fix

```yaml
scroll_stop_check:
  pattern_interrupt_present: [Y/N]
  curiosity_gap_created: [Y/N]
  specificity_element_present: [Y/N]
  within_platform_char_limit: [Y/N]

  IF pattern_interrupt_present == N AND curiosity_gap_created == N:
    REJECT: "Hook has no stopping mechanism"
  IF within_platform_char_limit == N:
    REJECT: "Hook exceeds platform character limit"
```

---

## STRUCTURAL FIX 4: ARENA MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped -- AI goes directly from generation to validation, bypassing competitive quality improvement.

### The Fix

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/ADV-01/checkpoints/ARENA_COMPLETE.yaml
```

This file is created ONLY after all 7 competitors have generated, all criteria scored, and human has selected.

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "Specimens are reference only" | Specimens are REQUIRED calibration material | HALT -- Load specimens |
| "This hook is attention-grabbing enough" | Must meet 8.0 threshold with scoring evidence | HALT -- Score formally |
| "The lead establishes voice implicitly" | Voice markers must be explicit and checkable | HALT -- Add explicit markers |
| "Product mention in hook builds relevance" | Product in hook = ad smell = reader bounce | HALT -- Remove product |
| "Arena adds too many tokens" | Quality over cost. Always. | HALT -- Execute Arena |
| "I can infer human preference" | Human selection is BLOCKING | HALT -- Get selection |
| "Editorial voice can be polished later" | Voice must be established from first word | HALT -- Fix now |

---

## BINARY GATE ENFORCEMENT

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
| 0 | 0.2-specimen-calibrator | layer-0-outputs/0.2-specimen-calibrator.md | 2KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 1 | 1.1-hook-formula-selector | layer-1-outputs/1.1-hook-formula-selector.md | 2KB |
| 1 | 1.2-lead-structure-planner | layer-1-outputs/1.2-lead-structure-planner.md | 2KB |
| 2 | 2.1-hook-generator | layer-2-outputs/2.1-hook-generator.md | 4KB |
| 2 | 2.2-lead-generator | layer-2-outputs/2.2-lead-generator.md | 5KB |
| 4 | 4.1-scroll-stop-validator | layer-4-outputs/4.1-scroll-stop-validator.md | 2KB |
| 4 | 4.2-editorial-voice-checker | layer-4-outputs/4.2-editorial-voice-checker.md | 2KB |
| 4 | 4.3-output-packager | layer-4-outputs/4.3-output-packager.md | 1KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] ADV-01-ANTI-DEGRADATION.md read (THIS FILE)
[ ] ADV-01-AGENT.md read
[ ] PROJECT-STATE.md created
[ ] PROGRESS-LOG.md created
[ ] checkpoints/ directory created
[ ] advertorial-strategy.yaml validated as input

LAYER 0 (FOUNDATION):
[ ] Strategy loaded with type + angle
[ ] Specimens loaded and hook patterns extracted
[ ] Inputs validated
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (ARCHITECTURE):
[ ] Hook formula(s) selected
[ ] Lead structure planned
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (GENERATION):
[ ] 5+ hook candidates generated
[ ] Matching leads generated
[ ] All in editorial voice
[ ] LAYER_2_COMPLETE.yaml created

LAYER 2.5 (ARENA):
[ ] ARENA-LAYER.md READ (MANDATORY — contains skill-specific judging criteria)
[ ] ARENA-CORE-PROTOCOL.md READ (path: ~system/protocols/ARENA-CORE-PROTOCOL.md)
[ ] ARENA-PERSONA-PANEL.md READ (path: ~system/protocols/ARENA-PERSONA-PANEL.md)
[ ] Persona names VERIFIED against protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect
[ ] All 7 competitors generated
[ ] All criteria scored
[ ] Human selection received (BLOCKING)
[ ] ARENA_COMPLETE.yaml created

LAYER 4 (VALIDATION):
[ ] Scroll-stop quality validated
[ ] Editorial voice checked
[ ] advertorial-lead-draft.md packaged
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] All output files verified
[ ] Body handoff information populated

ON CONTEXT RESUME:
[ ] VERIFY specimens were loaded
[ ] VERIFY editorial voice checks passed
[ ] VERIFY human selection exists
[ ] If specimens skipped, RETURN to Layer 0
```

---

## KEY INSIGHT

> **"An advertorial hook that reads as an ad has already failed. The hook's job is to make the reader forget they clicked on an ad. Specimen calibration is how you learn what 'editorial' actually sounds like."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation: 4 structural fixes, editorial voice gate, scroll-stop enforcement, Arena mandatory, specimen loading enforcement |
