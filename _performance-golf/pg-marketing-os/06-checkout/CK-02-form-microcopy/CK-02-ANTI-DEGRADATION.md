# CK-02-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent form & micro-copy process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: CK-02-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Write blaming error messages, use vague button text, add persuasion language to forms, or skip mobile keyboard specifications.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI writes BLAMING error messages ("Invalid card number" instead of "Please check your card number")
- AI uses vague button text ("Submit" instead of "Complete Order")
- AI adds persuasion language to form copy ("Claim your spot!" for a button)
- AI skips mobile keyboard type specification
- AI writes order bump copy instead of defining the integration point for U1
- AI over-writes helper text (verbose explanations instead of minimal hints)
- AI forgets error messages for some fields
- AI designs for desktop first without mobile field sizing

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### The Fix

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/CK-02/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/CK-02/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/CK-02/checkpoints/LAYER_2_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
layer: [N]
skill: "CK-02-form-microcopy"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  fields_mapped: [count]
  error_messages_complete: [Y/N]
  blaming_messages_found: [count]
  mobile_keyboards_specified: [Y/N]
  order_summary_complete: [Y/N]
  button_text_specific: [Y/N]
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Error messages per field** | 1 per required field | HALT -- Every field needs error message |
| **Blaming error messages** | Zero | HALT -- Rewrite all blaming messages |
| **Mobile keyboard specified** | Every field | HALT -- Add keyboard type |
| **Button text specificity** | Action-oriented | HALT -- Replace vague text |
| **Order summary elements** | Product + price + total | HALT -- Complete summary |
| **Persuasion language in forms** | Zero instances | HALT -- Remove all instances |

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "'Invalid' is clear enough" | "Invalid" blames. "Please enter a valid email address" guides. | HALT -- Rewrite with guidance |
| "'Submit' is standard" | Standard does not mean optimal. Specific CTAs outperform generic. | HALT -- Use "Complete Order" or equivalent |
| "Helper text for every field helps" | Unnecessary helper text adds friction. Only add when label is not self-explanatory. | HALT -- Remove unnecessary helper text |
| "A little persuasion on the button helps conversion" | Checkout buttons are functional. "Claim Your Spot!" raises anxiety. | HALT -- Use neutral action text |
| "I'll specify mobile later" | Mobile is primary (70%+ of checkouts). Specify now. | HALT -- Add mobile spec |
| "I'll write the order bump copy here" | Order bump copy is U1's responsibility. CK-02 defines integration point only. | HALT -- Remove copy, keep integration spec |

---

## STRUCTURAL FIX 4: ERROR MESSAGE TONE GATE

### The Problem
AI defaults to terse, blaming error messages because training data is full of "Invalid [field]" patterns. On checkout, these messages cause abandonment.

### The Fix

**Automated Tone Check:**

```yaml
error_tone_gate:
  FOR each error message:
    CHECK for blaming language:
      - "Invalid [anything]"
      - "Wrong [anything]"
      - "Incorrect [anything]"
      - "Bad [anything]"
      - "Error" (alone, without guidance)
      - "Failed"
      - "Rejected"
      - "Denied"

    IF blaming language found:
      1. FLAG exact message
      2. REWRITE with guiding alternative:
         - "Invalid email" -> "Please enter a valid email address"
         - "Wrong card number" -> "Please check your card number -- it should be 16 digits"
         - "Invalid zip" -> "Please enter your 5-digit zip code"
         - "Error" -> "Please check the highlighted field"
      3. LOG violation count
      4. DO NOT proceed to packaging until all rewritten

    GOOD ERROR MESSAGES include:
      - What is wrong (specifically)
      - What the correct format is
      - How to fix it
      - No blame, no shame, no frustration
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

**BEFORE any execution begins, create project infrastructure:**

```
[project]/CK-02/
  PROJECT-STATE.md
  PROGRESS-LOG.md
  checkpoints/
  checkout-microcopy-package.json    # PRIMARY OUTPUT
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 6: BINARY GATE ENFORCEMENT

**Gate statuses are BINARY: PASS or FAIL.**

```
VALID GATE STATUSES:
  COMPLETE (layer checkpoint)
  PASS (gate evaluation)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / "good enough"

IF any forbidden status is generated:
  1. HALT immediately
  2. DELETE output files created under false status
  3. RETURN to failing layer
  4. Re-evaluate with valid statuses only
```

---

## STRUCTURAL FIX 7: STALE ARTIFACT CLEANUP

**Before writing ANY replacement output file:**

```
STALE ARTIFACT PROTOCOL:
  1. SEARCH for existing checkout-microcopy-package.json at all possible locations
  2. IF stale file exists at wrong location: DELETE it
  3. LOG deletion in PROGRESS-LOG.md
  4. ONLY THEN write new output files
```

---

## STRUCTURAL FIX 8: ANTI-DEGRADATION MANDATORY READ

**Session startup protocol:**

```
SESSION STARTUP:
  1. READ this file (CK-02-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ CK-02-AGENT.md
  3. IF resuming: READ PROJECT-STATE.md
  4. IF resuming: READ checkpoint files
  5. CREATE infrastructure if not exists
  6. ONLY THEN begin execution
```

---

## Per-Microskill Output Protocol

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-input-validator | layer-0-outputs/0.2-input-validator.md | 1KB |
| 1 | 1.1-field-mapper | layer-1-outputs/1.1-field-mapper.md | 2KB |
| 1 | 1.2-order-summary-planner | layer-1-outputs/1.2-order-summary-planner.md | 2KB |
| 2 | 2.1-microcopy-generator | layer-2-outputs/2.1-microcopy-generator.md | 5KB |
| 4 | 4.1-error-message-tone-checker | layer-4-outputs/4.1-error-message-tone-checker.md | 2KB |
| 4 | 4.2-output-packager | layer-4-outputs/4.2-output-packager.md | 3KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] Anti-degradation read (THIS FILE)
[ ] CK-02-AGENT.md read
[ ] PROJECT-STATE.md created
[ ] checkpoints/ directory created
[ ] checkout-strategy.yaml loaded

LAYER 0 (FOUNDATION):
[ ] Strategy loaded with checkout pattern and flow map
[ ] Field requirements extracted
[ ] Inputs validated
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (FIELD MAPPING):
[ ] All form fields mapped with type and validation
[ ] Mobile keyboard type specified per field
[ ] Order summary structure planned
[ ] Order bump integration defined (placement + format only)
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (GENERATION):
[ ] Labels generated for every field (1-3 words)
[ ] Helper text generated where needed (not every field)
[ ] Error messages generated for every required field
[ ] Error message tone check: ZERO blaming messages
[ ] Progress indicators defined (if multi-step)
[ ] Button text is specific action ("Complete Order")
[ ] Order summary copy complete
[ ] LAYER_2_COMPLETE.yaml created

LAYER 4 (VALIDATION + PACKAGING):
[ ] Error message tone validated
[ ] All fields have complete copy set
[ ] checkout-microcopy-package.json written
[ ] Schema validation passed
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] All output files verified

ON CONTEXT RESUME:
[ ] Verify execution state
[ ] Check for blaming error messages in existing outputs
[ ] Check for stale artifacts
```

---

## KEY INSIGHT

> **"The error message is the most important copy on checkout. A buyer who encounters 'Invalid card number' feels accused. A buyer who encounters 'Please check your card number -- it should be 16 digits' feels helped. The difference is whether they retry or abandon."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 8 structural fixes, error message tone gate, per-microskill output protocol, full checklist |
