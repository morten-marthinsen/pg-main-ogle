# CK-00-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent checkout strategy process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: CK-00-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Write checkout copy, skip trust architecture planning, accept zero friction points, or produce persuasion-language strategy documents.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI writes COPY instead of STRATEGY (labels, error messages, badge text belong in CK-01/CK-02)
- AI skips trust architecture and jumps straight to flow mapping
- AI identifies zero friction points (impossible -- means analysis was skipped)
- AI uses persuasion language in strategy document ("compelling," "irresistible")
- AI defaults to single-page checkout without analyzing funnel type
- AI omits order bump placement spec
- AI produces desktop-only strategy without mobile considerations

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### The Fix

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/CK-00/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/CK-00/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/CK-00/checkpoints/LAYER_2_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "CK-00-checkout-strategist"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  campaign_brief_loaded: [Y/N]
  offer_package_loaded: [Y/N]
  funnel_type_classified: [Y/N]
  checkout_pattern_selected: [Y/N]
  friction_points_identified: [count]
  trust_architecture_planned: [Y/N]

completeness:
  all_microskills_executed: true
  minimum_thresholds_met: true
  quality_gates_passed: true
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Offer package loaded** | Present with pricing | HALT -- Load offer package |
| **Funnel type classified** | With confidence >= 0.50 | HALT -- Request human classification |
| **Friction points identified** | >= 3 | HALT -- Re-run analysis (zero is impossible) |
| **Trust signal categories** | 5 (security/payment/guarantee/social/contact) | HALT -- All 5 categories required |
| **Trust density target** | 3+ signals per viewport | HALT -- Increase signal placement |
| **Order bump spec** | Present (even if "none") | HALT -- Add spec |
| **Mobile consideration** | Every section | HALT -- Add mobile behavior |

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "I'll write the copy while I'm here" | CK-00 is strategy only. CK-01 and CK-02 write copy. | HALT -- Remove copy, keep strategy |
| "Trust architecture can be added later" | Trust architecture is the core output. Not optional. | HALT -- Plan trust architecture now |
| "This checkout has no friction points" | Every checkout has friction. Zero means analysis skipped. | HALT -- Re-run friction analysis |
| "Single-page is always best" | Pattern depends on funnel type. Must classify first. | HALT -- Classify funnel type, then decide |
| "Order bump isn't needed for this product" | Placement decision is always needed, even if answer is "none" | HALT -- Document the decision |
| "Mobile can be handled in CK-03" | Strategy must plan for mobile from the start, not retrofit | HALT -- Add mobile to strategy |

---

## STRUCTURAL FIX 4: STRATEGY-NOT-COPY GATE

### The Problem
AI writes actual checkout copy (field labels, error messages, trust badge text) in the strategy document instead of structural plans.

### The Fix

**Content Type Validation:**

```yaml
strategy_content_check:
  ALLOWED in CK-00 output:
    - Funnel type classification with rationale
    - Checkout pattern selection with rationale
    - Trust signal category lists and placement plans
    - Friction point identification with severity ratings
    - Flow map with section ordering
    - Order bump placement and format spec
    - Field count targets
    - Density metrics and targets

  FORBIDDEN in CK-00 output:
    - Actual field labels ("Email address", "Full name")
    - Error message text ("Please enter a valid...")
    - Trust badge copy ("Your order is protected by...")
    - Guarantee copy text ("60-Day Money-Back...")
    - Button text ("Complete Order")
    - Helper text ("For order confirmation...")

  IF copy detected in strategy output:
    1. FLAG the copy elements
    2. MOVE them to notes for CK-01 or CK-02
    3. REPLACE with structural description
    4. Example: "60-Day Money-Back Guarantee" -> "guarantee_type: money_back, duration: 60_days"
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

**BEFORE any execution begins, create project infrastructure:**

```
[project]/CK-00/
  PROJECT-STATE.md          # Living document -- updated after every layer
  PROGRESS-LOG.md           # Append-only timeline of all actions
  checkpoints/              # Gate checkpoint files
  checkout-strategy.yaml    # PRIMARY OUTPUT
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "CK-00-checkout-strategist"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  campaign_brief: [Y/N]
  offer_package: [Y/N]
  ecomm_context: [Y/N/NA]
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 6: BINARY GATE ENFORCEMENT

**Gate statuses are BINARY: PASS or FAIL.**

```
VALID GATE STATUSES (checkpoint files):
  COMPLETE (layer checkpoint)
  PASS (gate evaluation)

VALID DECISION STATUSES (validation layer):
  approved
  revision (return to previous layer)
  blocked (return to earlier layer)

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

## STRUCTURAL FIX 7: STALE ARTIFACT CLEANUP

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing checkout-strategy.yaml:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/checkout-strategy.yaml (root -- from failed attempts)
     - [project]/CK-00/checkout-strategy.yaml (correct location)
     - [project]/outputs/checkout-strategy.yaml (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 8: ANTI-DEGRADATION MANDATORY READ

**Session startup protocol -- BEFORE any CK-00 execution:**

```
SESSION STARTUP:
  1. READ this file (CK-00-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ CK-00-AGENT.md -- agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin CK-00 execution without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-checkout-specimens-loader | layer-0-outputs/0.2-checkout-specimens-loader.md | 1KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 1 | 1.1-funnel-type-classifier | layer-1-outputs/1.1-funnel-type-classifier.md | 2KB |
| 1 | 1.2-checkout-pattern-selector | layer-1-outputs/1.2-checkout-pattern-selector.md | 2KB |
| 1 | 1.3-friction-point-identifier | layer-1-outputs/1.3-friction-point-identifier.md | 3KB |
| 2 | 2.1-strategy-assembler | layer-2-outputs/2.1-strategy-assembler.md | 5KB |
| 4 | 4.1-strategy-validator | layer-4-outputs/4.1-strategy-validator.md | 2KB |
| 4 | 4.2-output-packager | layer-4-outputs/4.2-output-packager.md | 3KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] Anti-degradation read (THIS FILE)
[ ] CK-00-AGENT.md read
[ ] PROJECT-STATE.md created
[ ] PROGRESS-LOG.md created
[ ] checkpoints/ directory created
[ ] Input files validated (campaign-brief, offer-package)

LAYER 0 (FOUNDATION):
[ ] Campaign brief loaded
[ ] Offer package loaded
[ ] Checkout specimens loaded
[ ] Inputs validated
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (CLASSIFICATION):
[ ] Funnel type classified with confidence score
[ ] Checkout pattern selected with rationale
[ ] Friction points identified (minimum 3)
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (STRATEGY ASSEMBLY):
[ ] Trust architecture planned (5 categories, placements, density)
[ ] Checkout flow map complete (all sections sequenced)
[ ] Order bump spec defined
[ ] Friction mitigation plan addresses all identified points
[ ] Mobile behavior specified for every section
[ ] NO COPY in strategy output (structural only)
[ ] LAYER_2_COMPLETE.yaml created

LAYER 4 (VALIDATION + PACKAGING):
[ ] Strategy validates against CK-01 requirements
[ ] Strategy validates against CK-02 requirements
[ ] checkout-strategy.yaml written
[ ] Schema validation passed
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] All output files verified
[ ] All downstream handoffs documented

ON CONTEXT RESUME:
[ ] Verify execution state from checkpoint files
[ ] Check for stale artifacts
[ ] Resume from next uncompleted skill
```

---

## KEY INSIGHT

> **"Checkout strategy is architecture, not copywriting. Every word of actual copy that appears in a strategy document is a sign the agent has crossed the boundary between planning and execution."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 8 structural fixes, strategy-not-copy gate, per-microskill output protocol, full checklist |
