# PRODUCT-INTRODUCTION-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
**Purpose:** STRUCTURAL enforcement to prevent product introduction skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: PRODUCT-INTRODUCTION-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Position product as hero instead of mechanism, reveal price before value stack, or use generic guarantees instead of branded ones.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates product introductions WITHOUT loading type-matched specimens
- AI creates bridge moments that feel like "now I'm selling" (pitch shift)
- AI positions product as hero instead of mechanism (Principle #1 violation)
- AI presents components as features without proof packages (Principle #4 violation)
- AI reveals price before value stack established (Principle #5 violation)
- AI uses generic "money-back guarantee" instead of branded guarantee (Principle #6 violation)
- AI uses urgency/scarcity without justified real-world reason (Principle #7 violation)
- AI selects product intro without human approval

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

```
[project]/15-product-introduction/checkpoints/LAYER_0_COMPLETE.yaml  # Human confirms product details
[project]/15-product-introduction/checkpoints/LAYER_1_COMPLETE.yaml
[project]/15-product-introduction/checkpoints/LAYER_2_COMPLETE.yaml
[project]/15-product-introduction/checkpoints/ARENA_COMPLETE.yaml    # Arena Layer (2.5) — MANDATORY
[project]/15-product-introduction/checkpoints/LAYER_3_COMPLETE.yaml
[project]/15-product-introduction/HUMAN_SELECTION.yaml  # BLOCKING
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/15-product-introduction/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/15-product-introduction/checkpoints/LAYER_2_COMPLETE.yaml
[project]/15-product-introduction/checkpoints/ARENA_COMPLETE.yaml
```

### LAYER 0 HUMAN CHECKPOINT (BLOCKING)

```yaml
# LAYER_0_COMPLETE.yaml

human_checkpoint:
  product_details_confirmed: true
  confirmed_by: "human"
  timestamp: "[ISO 8601]"
  product_name: "[exact product name]"
  price_points_confirmed: [Y/N]
  component_list_confirmed: [Y/N]

  IF product_details_confirmed != true:
    HALT — "Cannot proceed without human confirmation of product details"
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **8 principles validated** | 8/8 | HALT — Fix violations |
| **Bridge architecture** | Assigned | HALT — Select architecture |
| **Component proof packages** | All components | HALT — Add proof |
| **Value stack** | Before price | HALT — Resequence |
| **Guarantee** | Branded/named | HALT — Brand guarantee |
| **Scarcity/urgency** | Justified | HALT — Add justification |
| **Arena personas** | 6/6 | HALT — All generate |
| **Human selection** | BLOCKING | HALT — Get selection |

### The 8 Master Principles (ALL MUST VALIDATE)

```yaml
eight_principles_validation:
  principle_1_product_never_hero:
    validated: [Y/N]
    mechanism_is_hero: [Y/N]

  principle_2_withholding_creates_value:
    validated: [Y/N]
    product_name_position: "[percentage]"  # Should be 60-75% in story formats

  principle_3_bridge_moment_dangerous:
    validated: [Y/N]
    feels_natural: [Y/N]
    no_pitch_shift: [Y/N]

  principle_4_components_are_proof:
    validated: [Y/N]
    all_components_have_proof: [Y/N]

  principle_5_value_before_price:
    validated: [Y/N]
    value_stack_precedes_price: [Y/N]

  principle_6_guarantees_named_branded:
    validated: [Y/N]
    guarantee_name: "[specific name]"
    not_generic: [Y/N]

  principle_7_scarcity_justified:
    validated: [Y/N]
    justification: "[real-world reason]"

  principle_8_close_is_binary:
    validated: [Y/N]
    two_futures_presented: [Y/N]

  total_passing: [number]
  required: 8

  IF total_passing < 8:
    HALT — "All 8 principles must validate"
    failures: [list failed principles]
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "product can be hero sometimes" | Mechanism is ALWAYS hero (Principle #1) | HALT — Reposition |
| "bridge shift is natural in sales" | Pitch shift kills rapport (Principle #3) | HALT — Smooth bridge |
| "features speak for themselves" | Components need proof packages (Principle #4) | HALT — Add proof |
| "price can come first for transparency" | Value stack MUST precede price (Principle #5) | HALT — Resequence |
| "money-back guarantee is clear" | Guarantees must be BRANDED (Principle #6) | HALT — Name guarantee |
| "limited time is understood" | Urgency must be JUSTIFIED (Principle #7) | HALT — Add reason |

---

## STRUCTURAL FIX 4: BRIDGE MOMENT GATE

### The Problem
AI creates bridge moments that feel like "now I'm selling" — breaking rapport and triggering prospect resistance.

### The Fix

**BRIDGE SMOOTHNESS VALIDATION:**

```yaml
bridge_validation:
  bridge_architecture_selected: "[type]"

  pitch_shift_detection:
    tone_change_detected: [Y/N]  # Should be N
    "now_im_selling_feeling": [Y/N]  # Should be N
    natural_continuation: [Y/N]  # Should be Y

  mechanism_to_product_connection:
    mechanism_naturally_leads_to_product: [Y/N]
    product_feels_inevitable_solution: [Y/N]

  IF tone_change_detected == Y:
    HALT — "Bridge moment fails — pitch shift detected"

  IF natural_continuation == N:
    HALT — "Bridge must feel like natural conclusion, not commercial pivot"
```

---

## STRUCTURAL FIX 5: PRICE-VALUE SEQUENCE GATE

### The Problem
AI reveals price before establishing value, triggering price resistance.

### The Fix

**VALUE-PRICE SEQUENCE VALIDATION:**

```yaml
sequence_validation:
  value_stack:
    total_value_established: [Y/N]
    value_amount: "$[amount]"
    position_in_copy: "[early | middle | late]"

  price_reveal:
    position_in_copy: "[early | middle | late]"
    anchor_cascade_used: [Y/N]
    comparison_anchor_present: [Y/N]

  sequence_check:
    value_before_price: [Y/N]

  IF value_before_price == N:
    HALT — "Principle #5 violation: Value must be established BEFORE price reveal"
```

---

## STRUCTURAL FIX 6: PRODUCT-INTRO-SPECIFIC MC-CHECK

```yaml
PRODUCT-INTRO-MC-CHECK:
  timestamp: "[current time]"

  human_checkpoint_verification:
    product_details_confirmed_by_human: [Y/N]
    if_no: "STOP — Human must confirm product details before drafting"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  bridge_verification:
    bridge_feels_natural: [Y/N]
    no_pitch_shift: [Y/N]
    if_any_no: "STOP — Fix bridge moment"

  principles_verification:
    principles_passing: [number]
    if_under_8: "STOP — All 8 principles must pass"

    principle_1_mechanism_hero: [Y/N]
    if_no: "🛑 CRITICAL: Product is not the hero — mechanism is"

    principle_5_value_before_price: [Y/N]
    if_no: "🛑 CRITICAL: Value stack must precede price"

    principle_6_guarantee_branded: [Y/N]
    if_no: "🛑 CRITICAL: Guarantee must be named, not generic"

  result: [CONTINUE | HALT_HUMAN | HALT_SPECIMENS | HALT_BRIDGE | HALT_PRINCIPLES]
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 8, 11):
[ ] PRODUCT-INTRODUCTION-ANTI-DEGRADATION.md read (THIS FILE)
[ ] PRODUCT-INTRODUCTION-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 10)
[ ] Input files validated (mechanism-narrative package, campaign-brief, offer package)

LAYER 0 (FOUNDATION + HUMAN CHECKPOINT):
[ ] Upstream packages loaded (mechanism-narrative, campaign-brief)
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Product details reviewed with human
[ ] HUMAN CONFIRMS product name, price points, components
[ ] LAYER_0_COMPLETE.yaml created (with human confirmation)

LAYER 1 (CLASSIFICATION):
[ ] Introduction type classified
[ ] Bridge architecture selected
[ ] Component reveal pattern selected
[ ] Price reveal architecture selected
[ ] Type-matched specimens loaded VERBATIM
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (DRAFT):
[ ] Bridge moment drafted (no pitch shift)
[ ] Product revealed with positioning statement
[ ] All components revealed with proof packages
[ ] Value stack assembled with total value
[ ] Price revealed through appropriate architecture
[ ] Guarantee branded with specific name
[ ] Scarcity justified with real-world reason
[ ] All 6 Arena personas generate
[ ] LAYER_2_COMPLETE.yaml created

LAYER 2.5 (ARENA — MANDATORY, CANNOT BE SKIPPED):
[ ] All 7 competitors generated across 3 rounds
[ ] Adversarial critique completed each round
[ ] Targeted revision completed each round
[ ] Post-Arena Synthesis: 2-3 hybrids created
[ ] 9-10 candidates presented to human
[ ] Human selection received (BLOCKING)
[ ] ARENA_COMPLETE.yaml created

LAYER 3 (REFINEMENT):
[ ] All 8 principles validated
[ ] Binary choice established for close handoff
[ ] Anti-slop passed
[ ] Score >= 7.0
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION & SELECTION):
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created
[ ] product-introduction-package.json created
[ ] PRODUCT-INTRODUCTION-SUMMARY.md created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY human confirmed product details (LAYER_0)
[ ] VERIFY specimens loaded
[ ] VERIFY 8/8 principles pass
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"The bridge moment is the most dangerous transition in any promotion. Product never hero — mechanism is. Generic guarantees signal generic products."**

---

## STRUCTURAL FIX 7: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/15-product-introduction/checkpoints/ARENA_COMPLETE.yaml
```

This file is created ONLY after:
1. All 7 competitors have generated across 3 rounds
2. Adversarial critique completed each round
3. Targeted revision completed each round
4. All candidates scored against 7 criteria
5. Post-arena synthesis complete (2-3 hybrids)
6. Human selection received (BLOCKING)

### Checkpoint Progression (Updated)

```
LAYER_1_COMPLETE.yaml → LAYER_2_COMPLETE.yaml → ARENA_COMPLETE.yaml → LAYER_3_COMPLETE.yaml → LAYER_4_COMPLETE
```

**ARENA_COMPLETE.yaml sits between LAYER_2 and LAYER_3. Layer 3 is BLOCKED without it.**

### Forbidden Rationalizations (Arena-Specific)

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "Arena is optional" | Arena is MANDATORY per ~system/SYSTEM-CORE.md | HALT — Execute Arena |
| "Output is good enough without Arena" | Single-perspective output lacks competitive quality | HALT — Execute Arena |
| "Arena can be run separately" | Arena is part of the skill execution flow, not a separate pass | HALT — Execute Arena now |
| "Context is too large for Arena" | Request session break, do NOT skip Arena | HALT — Session break, then Arena |
| "I'll note Arena was skipped" | Noting a skip does not excuse the skip | HALT — Execute Arena |
| "Arena adds too many tokens" | Quality over cost. Always. | HALT — Execute Arena |

---

## STRUCTURAL FIX 8: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which layers completed and what candidates were selected is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/15-product-introduction/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
├── execution-log.md          # Detailed execution record
├── product-introduction-package.json  # PRIMARY OUTPUT
└── PRODUCT-INTRODUCTION-SUMMARY.md    # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "15-product-introduction"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  mechanism_narrative_package: [Y/N]
  campaign_brief: [Y/N]
  offer_package: [Y/N]
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 9: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

### The Problem
Previous skills had models invent gate statuses like "PARTIAL_PASS" and "CONDITIONAL_PASS" — statuses that don't exist.

### The Fix

**Gate statuses are BINARY: PASS or FAIL. Decision statuses are explicit.**

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

## STRUCTURAL FIX 10: STALE ARTIFACT CLEANUP

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing product-introduction-package.json or PRODUCT-INTRODUCTION-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/product-introduction-package.json (root — from failed attempts)
     - [project]/15-product-introduction/product-introduction-package.json (correct location)
     - [project]/outputs/product-introduction-package.json (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 11: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol — BEFORE any product introduction execution:**

```
SESSION STARTUP:
  1. READ this file (PRODUCT-INTRODUCTION-ANTI-DEGRADATION.md) — MANDATORY
  2. READ PRODUCT-INTRODUCTION-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin product introduction execution without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Added:** 2026-02-12
**Reference:** ~system/SYSTEM-CORE.md § MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-tier1-intelligence-loader | layer-0-outputs/0.2-tier1-intelligence-loader.md | 1KB |
| 0 | 0.2-vault-intelligence-loader | layer-0-outputs/0.2-vault-intelligence-loader.md | 1KB |
| 0 | 0.2.5-specimen-decomposer | layer-0-outputs/0.2.5-specimen-decomposer.md | 1KB |
| 0 | 0.2.6-curated-gold-specimens | layer-0-outputs/0.2.6-specimen-loading.md | 2KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 0 | 0.4-human-checkpoint-curator | layer-0-outputs/0.4-human-checkpoint.md | 1KB |
| 1 | 1.1-introduction-type-classifier | layer-1-outputs/1.1-introduction-type-classifier.md | 3KB |
| 1 | 1.2-bridge-architecture-selector | layer-1-outputs/1.2-bridge-architecture-selector.md | 3KB |
| 1 | 1.3-component-reveal-selector | layer-1-outputs/1.3-component-reveal-selector.md | 3KB |
| 1 | 1.4-price-value-strategy-mapper | layer-1-outputs/1.4-price-value-strategy-mapper.md | 3KB |
| 2 | 2.1-bridge-moment-writer | layer-2-outputs/2.1-bridge-moment.md | 5KB |
| 2 | 2.2-product-reveal-writer | layer-2-outputs/2.2-product-reveal.md | 5KB |
| 2 | 2.3-component-reveal-writer | layer-2-outputs/2.3-component-reveal.md | 5KB |
| 2 | 2.4-value-stack-writer | layer-2-outputs/2.4-value-stack.md | 5KB |
| 3 | 3.1-price-reveal-constructor | layer-3-outputs/3.1-price-reveal.md | 3KB |
| 3 | 3.2-guarantee-scarcity-writer | layer-3-outputs/3.2-guarantee-scarcity.md | 3KB |
| 3 | 3.3-emotional-architecture-calibrator | layer-3-outputs/3.3-emotional-architecture.md | 3KB |
| 3 | 3.4-future-pacing-close-setup | layer-3-outputs/3.4-future-pacing-close-setup.md | 3KB |
| 4 | 4.1-master-principles-checker | layer-4-outputs/4.1-master-principles-check.md | 3KB |
| 4 | 4.2-anti-slop-validator | layer-4-outputs/4.2-anti-slop-validation.md | 3KB |
| 4 | 4.3-vault-pattern-comparator | layer-4-outputs/4.3-vault-pattern-comparison.md | 3KB |
| 4 | 4.4-final-introduction-assembler | layer-4-outputs/4.4-final-introduction-assembly.md | 5KB |

### Layer Gate Enhancement

Each LAYER_N_COMPLETE.yaml checkpoint MUST list all microskill output files with sizes. If ANY output file is missing, the checkpoint CANNOT be created.

### Execution Log Enhancement

Each microskill entry in execution-log.md MUST include:
- Spec file read: [Y/N] with path
- Output file created: [Y/N] with path
- Output file size: [X]KB
- Schema compliance: [Y/N]

### Forbidden Behaviors

1. ❌ Executing microskills without reading their .md spec files
2. ❌ Producing summary output without per-microskill files
3. ❌ Checkpoint YAML without microskill output file listing
4. ❌ Output files below minimum size thresholds
5. ❌ Output files missing required section headers from spec

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2026-02-14 | 4 STRUCTURAL FIXES (8-11): Mandatory Project Infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md, checkpoints/), Binary Gate Enforcement (forbidden statuses — PARTIAL_PASS, CONDITIONAL_PASS trigger HALT), Stale Artifact Cleanup (search and delete before writing replacements), Anti-Degradation Mandatory Read (session startup protocol). Updated Implementation Checklist with PRE-EXECUTION and POST-EXECUTION sections. Propagation fix from Skills 01-04 to ensure operational consistency. |
| 1.2 | 2026-02-12 | PER-MICROSKILL OUTPUT PROTOCOL: Added v3.2 per-microskill output table with 24 required output files across 5 layers (7 Layer 0, 4 Layer 1, 4 Layer 2, 4 Layer 3, 4 Layer 4 + 1 assembly). Layer gate enhancement, execution log enhancement, forbidden behaviors for per-microskill compliance. |
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
