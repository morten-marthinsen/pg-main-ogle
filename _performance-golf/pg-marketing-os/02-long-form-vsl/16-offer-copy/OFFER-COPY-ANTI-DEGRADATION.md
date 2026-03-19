# OFFER-COPY-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
**Purpose:** STRUCTURAL enforcement to prevent offer copy skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: OFFER-COPY-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Skip D-F-W-B-P format for deliverables, create fewer than 3 value demonstration iterations, or use identical CTA language.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates offer copy WITHOUT loading type-matched specimens
- AI presents deliverables as features without D-F-W-B-P format (Principle #1 violation)
- AI repeats identical promise text instead of restating differently (Principle #2 violation)
- AI reveals price before establishing value stack (Principle #3 violation)
- AI skips "if all it did was..." value demonstration (Principle #4 violation)
- AI uses generic "money-back guarantee" (Principle #5 violation)
- AI creates fewer than 3 CTAs or identical CTA language (Principle #6 violation)
- AI adds urgency without justified reason (Principle #8 violation)
- AI selects offer copy without human approval

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

```
[project]/16-offer-copy/checkpoints/LAYER_0_COMPLETE.yaml  # Human confirms offer details
[project]/16-offer-copy/checkpoints/LAYER_1_COMPLETE.yaml
[project]/16-offer-copy/checkpoints/LAYER_2_COMPLETE.yaml
[project]/16-offer-copy/checkpoints/ARENA_COMPLETE.yaml    # Arena Layer (2.5) — MANDATORY
[project]/16-offer-copy/checkpoints/LAYER_3_COMPLETE.yaml
[project]/16-offer-copy/HUMAN_SELECTION.yaml  # BLOCKING
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/16-offer-copy/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/16-offer-copy/checkpoints/LAYER_2_COMPLETE.yaml
[project]/16-offer-copy/checkpoints/ARENA_COMPLETE.yaml
```

### LAYER 0 HUMAN CHECKPOINT (BLOCKING)

```yaml
# LAYER_0_COMPLETE.yaml

human_checkpoint:
  offer_details_confirmed: true
  confirmed_by: "human"
  timestamp: "[ISO 8601]"
  offer_format: "[supplement | info_product | digital_bundle | financial | service | hybrid]"
  deliverables_confirmed: [Y/N]
  bonuses_confirmed: [Y/N]
  price_point_confirmed: [Y/N]
  guarantee_terms_confirmed: [Y/N]

  IF offer_details_confirmed != true:
    HALT — "Cannot proceed without human confirmation of offer details"
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **D-F-W-B-P format** | All deliverables & bonuses | HALT — Format all items |
| **"If all it did" iterations** | 3 minimum | HALT — Add iterations |
| **CTAs (different)** | 3 minimum | HALT — Add variety |
| **Guarantee** | Branded/named | HALT — Brand guarantee |
| **Urgency** | Justified | HALT — Add justification |
| **10 principles validated** | 10/10 | HALT — Fix violations |
| **Arena personas** | 6/6 | HALT — All generate |
| **Human selection** | BLOCKING | HALT — Get selection |

### The D-F-W-B-P Structure (MANDATORY FOR ALL ITEMS)

Every deliverable and bonus MUST include:

```yaml
dfwbp_validation:
  item_name: "[name]"

  deliverable: "[what they get]"
  present: [Y/N]

  feature: "[what it does/contains]"
  present: [Y/N]

  why: "[why this matters]"
  present: [Y/N]

  benefit: "[outcome for them]"
  present: [Y/N]

  proof: "[evidence it works]"
  present: [Y/N]

  IF any_element.present == N:
    HALT — "D-F-W-B-P incomplete for: [item_name]"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "features are self-explanatory" | D-F-W-B-P is MANDATORY for all items | HALT — Complete format |
| "two value demos is enough" | Minimum 3 "if all it did was..." required | HALT — Add iteration |
| "CTA variety is minor" | Identical CTAs cause prospect fatigue | HALT — Vary language |
| "money-back is universal" | Guarantee must be BRANDED (Principle #5) | HALT — Name guarantee |
| "limited time is understood" | Urgency must be JUSTIFIED | HALT — Add reason |
| "promise restating is repetitive" | DIFFERENT words each time (Principle #2) | HALT — Vary language |
| "value is implied by components" | Value totaling MUST precede price | HALT — Calculate total |

---

## STRUCTURAL FIX 4: VALUE DEMONSTRATION GATE

### The Problem
AI skips or abbreviates the "if all it did was..." value demonstration framework.

### The Fix

**MANDATORY VALUE DEMONSTRATION:**

```yaml
value_demonstration_validation:
  iterations_present: [number]
  minimum_required: 3

  iteration_1:
    benefit: "[specific benefit]"
    would_it_be_worth_it: [present]
    reason_why: "[specific reason]"

  iteration_2:
    benefit: "[DIFFERENT benefit]"
    would_it_be_worth_it: [present]
    reason_why: "[specific reason]"

  iteration_3:
    benefit: "[DIFFERENT benefit]"
    would_it_be_worth_it: [present]
    reason_why: "[specific reason]"

  benefits_are_different: [Y/N]  # Cannot be variations of same benefit

  IF iterations_present < 3:
    HALT — "Principle #4 violation: Minimum 3 value demonstration iterations required"

  IF benefits_are_different == N:
    HALT — "Each iteration must use a DIFFERENT benefit, not variations"
```

---

## STRUCTURAL FIX 5: CTA VARIETY GATE

### The Problem
AI creates identical or near-identical CTA language throughout offer copy.

### The Fix

**CTA VARIETY VALIDATION:**

```yaml
cta_validation:
  total_ctas: [number]
  minimum_required: 3

  cta_analysis:
    - cta_1:
        text: "[CTA text]"
        emotional_appeal: "[confidence | consequence | urgency | curiosity | fear | hope]"
    - cta_2:
        text: "[CTA text]"
        emotional_appeal: "[different from cta_1]"
    - cta_3:
        text: "[CTA text]"
        emotional_appeal: "[different from cta_1 and cta_2]"

  variety_check:
    all_texts_different: [Y/N]
    at_least_3_emotional_appeals: [Y/N]

  IF total_ctas < 3:
    HALT — "Principle #6 violation: Minimum 3 CTAs required"

  IF all_texts_different == N:
    HALT — "CTAs must have DIFFERENT language"

  IF at_least_3_emotional_appeals == N:
    HALT — "CTAs must appeal to DIFFERENT emotions"
```

---

## STRUCTURAL FIX 6: THE 10 PRINCIPLES GATE

### All 10 Principles MUST Pass

```yaml
ten_principles_validation:
  principle_1_dfwbp_sacred: [PASS | FAIL]
    detail: "Every deliverable/bonus follows D-F-W-B-P"

  principle_2_promise_restated_not_repeated: [PASS | FAIL]
    detail: "Primary promise appears with DIFFERENT words"

  principle_3_value_before_price: [PASS | FAIL]
    detail: "Total value established before price reveal"

  principle_4_if_all_it_did: [PASS | FAIL]
    detail: "3+ value demonstration iterations"

  principle_5_guarantee_is_feature: [PASS | FAIL]
    detail: "Guarantee is BRANDED and NAMED"

  principle_6_three_ctas_minimum: [PASS | FAIL]
    detail: "3+ CTAs with DIFFERENT emotional appeals"

  principle_7_consequence_amplification: [PASS | FAIL]
    detail: "Pain/frustration reminder between CTAs"

  principle_8_urgency_justified: [PASS | FAIL]
    detail: "Urgency has specific, credible reason"

  principle_9_stack_review_before_price: [PASS | FAIL]
    detail: "Full stack re-listed with values before price"

  principle_10_seamless_entry: [PASS | FAIL]
    detail: "First line flows from product introduction handoff"

  total_passing: [number]
  required: 10

  IF total_passing < 10:
    HALT — "All 10 offer copy principles must pass"
    failures: [list failed principles]
```

---

## STRUCTURAL FIX 7: OFFER-COPY-SPECIFIC MC-CHECK

```yaml
OFFER-COPY-MC-CHECK:
  timestamp: "[current time]"

  human_checkpoint_verification:
    offer_details_confirmed_by_human: [Y/N]
    if_no: "STOP — Human must confirm offer details before drafting"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  dfwbp_verification:
    all_deliverables_complete: [Y/N]
    all_bonuses_complete: [Y/N]
    if_any_no: "STOP — D-F-W-B-P required for all items"

  value_demo_verification:
    iterations_present: [number]
    if_under_3: "STOP — Minimum 3 value demonstration iterations"

  cta_verification:
    ctas_present: [number]
    if_under_3: "STOP — Minimum 3 CTAs with variety"
    cta_variety: [Y/N]
    if_no: "STOP — CTAs must have different language and emotions"

  principles_verification:
    principles_passing: [number]
    if_under_10: "STOP — All 10 principles must pass"

  result: [CONTINUE | HALT_HUMAN | HALT_SPECIMENS | HALT_DFWBP | HALT_VALUE | HALT_CTA | HALT_PRINCIPLES]
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 9, 12):
[ ] OFFER-COPY-ANTI-DEGRADATION.md read (THIS FILE)
[ ] OFFER-COPY-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 11)
[ ] Input files validated (product-introduction package, offer package, campaign-brief)

LAYER 0 (FOUNDATION + HUMAN CHECKPOINT):
[ ] Upstream packages loaded (product-introduction, offer-package, campaign-brief)
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Offer details reviewed with human
[ ] HUMAN CONFIRMS deliverables, bonuses, price, guarantee terms
[ ] LAYER_0_COMPLETE.yaml created (with human confirmation)

LAYER 1 (CLASSIFICATION):
[ ] Offer format classified
[ ] D-F-W-B-P sequence mapped for all items
[ ] Value demo designed (3+ iterations)
[ ] Price presentation planned
[ ] Type-matched specimens loaded VERBATIM
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (DRAFT):
[ ] All deliverables in D-F-W-B-P format
[ ] All bonuses in D-F-W-B-P format with values
[ ] 3+ "if all it did was..." iterations
[ ] Price revealed with anchoring
[ ] Guarantee branded with specific name
[ ] 3+ CTAs with variety
[ ] Consequence amplification between CTAs
[ ] All 6 Arena personas generate
[ ] LAYER_2_COMPLETE.yaml created

LAYER 2.5 (ARENA — MANDATORY, CANNOT BE SKIPPED):
[ ] All 7 competitors generated across 2 rounds
[ ] Adversarial critique completed each round
[ ] Targeted revision completed each round
[ ] Post-Arena Synthesis: 2-3 hybrids created
[ ] 9-10 candidates presented to human
[ ] Human selection received (BLOCKING)
[ ] ARENA_COMPLETE.yaml created

LAYER 3 (REFINEMENT):
[ ] Promise restated with variety (not repeated)
[ ] Emotional arc ascending
[ ] Urgency justified
[ ] Stack review before price
[ ] All 10 principles validated
[ ] Anti-slop passed
[ ] Score >= 7.0
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION & SELECTION):
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created
[ ] offer-copy-package.json created
[ ] OFFER-COPY-SUMMARY.md created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY human confirmed offer details (LAYER_0)
[ ] VERIFY specimens loaded
[ ] VERIFY all D-F-W-B-P complete
[ ] VERIFY 3+ value demo iterations
[ ] VERIFY 3+ CTAs with variety
[ ] VERIFY 10/10 principles pass
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"D-F-W-B-P is sacred — features without format are forgettable. 'If all it did' is not optional — it's the value demonstration framework. Identical CTAs cause prospect fatigue."**

---

## STRUCTURAL FIX 8: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 2-round + audience evaluation competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/16-offer-copy/checkpoints/ARENA_COMPLETE.yaml
```

This file is created ONLY after:
1. All 7 competitors have generated across 2 rounds
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

## STRUCTURAL FIX 9: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which layers completed and what candidates were selected is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/16-offer-copy/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
├── execution-log.md          # Detailed execution record
├── offer-copy-package.json   # PRIMARY OUTPUT
└── OFFER-COPY-SUMMARY.md     # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "16-offer-copy"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  product_introduction_package: [Y/N]
  offer_package: [Y/N]
  campaign_brief: [Y/N]
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 10: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

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

## STRUCTURAL FIX 11: STALE ARTIFACT CLEANUP

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing offer-copy-package.json or OFFER-COPY-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/offer-copy-package.json (root — from failed attempts)
     - [project]/16-offer-copy/offer-copy-package.json (correct location)
     - [project]/outputs/offer-copy-package.json (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 12: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol — BEFORE any offer copy execution:**

```
SESSION STARTUP:
  1. READ this file (OFFER-COPY-ANTI-DEGRADATION.md) — MANDATORY
  2. READ OFFER-COPY-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin offer copy execution without reading this anti-degradation file first.
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
| 0 | 0.2-source-teaching-loader | layer-0-outputs/0.2-source-teaching-loader.md | 1KB |
| 0 | 0.2-vault-intelligence-loader | layer-0-outputs/0.2-vault-intelligence-loader.md | 1KB |
| 0 | 0.2.5-specimen-decomposer | layer-0-outputs/0.2.5-specimen-decomposer.md | 1KB |
| 0 | 0.2.6-curated-gold-specimens | layer-0-outputs/0.2.6-specimen-loading.md | 2KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 0 | 0.4-human-checkpoint-curator | layer-0-outputs/0.4-human-checkpoint.md | 1KB |
| 1 | 1.1-offer-presentation-classifier | layer-1-outputs/1.1-offer-presentation-classifier.md | 3KB |
| 1 | 1.2-deliverable-sequence-mapper | layer-1-outputs/1.2-deliverable-sequence-mapper.md | 3KB |
| 1 | 1.3-value-demonstration-designer | layer-1-outputs/1.3-value-demonstration-designer.md | 3KB |
| 1 | 1.4-price-presentation-planner | layer-1-outputs/1.4-price-presentation-planner.md | 3KB |
| 2 | 2.1-deliverable-stack-writer | layer-2-outputs/2.1-deliverable-stack.md | 5KB |
| 2 | 2.2-bonus-presentation-writer | layer-2-outputs/2.2-bonus-presentation.md | 5KB |
| 2 | 2.3-value-demonstration-writer | layer-2-outputs/2.3-value-demonstration.md | 5KB |
| 2 | 2.4-price-guarantee-cta-writer | layer-2-outputs/2.4-price-guarantee-cta.md | 5KB |
| 3 | 3.1-transition-flow-optimizer | layer-3-outputs/3.1-transition-flow.md | 3KB |
| 3 | 3.2-promise-repetition-calibrator | layer-3-outputs/3.2-promise-repetition.md | 3KB |
| 3 | 3.3-emotional-escalation-verifier | layer-3-outputs/3.3-emotional-escalation.md | 3KB |
| 3 | 3.4-cta-variation-generator | layer-3-outputs/3.4-cta-variations.md | 3KB |
| 4 | 4.1-offer-principles-checker | layer-4-outputs/4.1-offer-principles-check.md | 3KB |
| 4 | 4.2-anti-slop-validator | layer-4-outputs/4.2-anti-slop-validation.md | 3KB |
| 4 | 4.3-vault-pattern-comparator | layer-4-outputs/4.3-vault-pattern-comparison.md | 3KB |
| 4 | 4.4-final-offer-copy-assembler | layer-4-outputs/4.4-final-offer-copy-assembly.md | 5KB |

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
| 2.0 | 2026-02-14 | 4 STRUCTURAL FIXES (9-12): Mandatory Project Infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md, checkpoints/), Binary Gate Enforcement (forbidden statuses — PARTIAL_PASS, CONDITIONAL_PASS trigger HALT), Stale Artifact Cleanup (search and delete before writing replacements), Anti-Degradation Mandatory Read (session startup protocol). Updated Implementation Checklist with PRE-EXECUTION and POST-EXECUTION sections. Propagation fix from Skills 01-04 to ensure operational consistency. |
| 1.2 | 2026-02-12 | PER-MICROSKILL OUTPUT PROTOCOL (v3.2): Added per-microskill output table with 24 required output files across Layers 0-4. Enhanced layer gate, execution log, and forbidden behaviors for per-microskill enforcement. |
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
