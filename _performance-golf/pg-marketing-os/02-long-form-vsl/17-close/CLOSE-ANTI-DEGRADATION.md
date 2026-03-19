# CLOSE-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
**Purpose:** STRUCTURAL enforcement to prevent close skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: CLOSE-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Write guarantee as generic refund policy instead of contract format, create fewer than 6 CTAs, or skip specific action instructions.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates closes WITHOUT loading type-matched specimens
- AI creates benefit summary under 5 "You get" items (Element #1 violation)
- AI writes guarantee as "if not satisfied, return for refund" (Element #2 violation)
- AI produces fewer than 6 CTAs or identical CTA phrases (Element #3 violation)
- AI skips specific action instructions (Element #4 violation)
- AI creates weak P.S. sections that don't advance the close (Element #5 violation)
- AI uses generic urgency without justification
- AI creates fabricated crossroads that prospects see through
- AI selects close without human approval

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

```
[project]/17-close/checkpoints/LAYER_0_COMPLETE.yaml  # Human confirms close approach
[project]/17-close/checkpoints/LAYER_1_COMPLETE.yaml
[project]/17-close/checkpoints/LAYER_2_COMPLETE.yaml
[project]/17-close/checkpoints/ARENA_COMPLETE.yaml    # Arena Layer (2.5) — MANDATORY
[project]/17-close/checkpoints/LAYER_3_COMPLETE.yaml
[project]/17-close/HUMAN_SELECTION.yaml  # BLOCKING
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/17-close/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/17-close/checkpoints/LAYER_2_COMPLETE.yaml
[project]/17-close/checkpoints/ARENA_COMPLETE.yaml
```

### LAYER 0 HUMAN CHECKPOINT (BLOCKING)

```yaml
# LAYER_0_COMPLETE.yaml

human_checkpoint:
  close_approach_confirmed: true
  confirmed_by: "human"
  timestamp: "[ISO 8601]"
  closing_theme: "[crossroads | logical_restatement | reasons_why | dont_go_alone | simple_restatement | but_wait | usp_close]"

  IF close_approach_confirmed != true:
    HALT — "Cannot proceed without human confirmation of close approach"
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **"You get" items** | 5 minimum | HALT — Add items |
| **CTAs (different)** | 6-10 range | HALT — Add CTAs |
| **CTA variety** | Different phrases/emotions | HALT — Vary CTAs |
| **Guarantee** | Contract/promise format | HALT — Rewrite |
| **Action instructions** | Specific steps | HALT — Add clarity |
| **P.S. sections** | 1+ using Makepeace techniques | HALT — Strengthen P.S. |
| **6 Makepeace elements** | 6/6 | HALT — Complete all |
| **Arena personas** | 6/6 | HALT — All generate |
| **Human selection** | BLOCKING | HALT — Get selection |

### The 6 Makepeace Foundational Elements (ALL MUST BE PRESENT)

```yaml
six_elements_validation:
  element_1_benefit_summary:
    present: [Y/N]
    uses_you_get_format: [Y/N]
    item_count: [number]  # Must be >= 5

  element_2_guarantee_as_confidence:
    present: [Y/N]
    format: "[contract | promise | generic]"  # Must NOT be generic
    written_as_commitment: [Y/N]  # Not "if not satisfied, return for refund"

  element_3_ask_for_sale:
    present: [Y/N]
    cta_count: [number]  # Must be 6-10
    phrases_different: [Y/N]
    emotions_varied: [Y/N]

  element_4_tell_what_to_do:
    present: [Y/N]
    step_by_step: [Y/N]
    checkout_process_clear: [Y/N]

  element_5_ps_power_section:
    present: [Y/N]
    technique_used: "[bonus | testimonial | guarantee_restatement | urgency_reason]"
    advances_close: [Y/N]  # Not "P.S. Don't forget"

  element_6_sidebars_callouts:
    present: [Y/N]
    type: "[value | risk_relief | proof]"

  total_present: [number]
  required: 6

  IF total_present < 6:
    HALT — "All 6 Makepeace elements required"
    missing: [list missing elements]
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "3-4 You get items covers it" | Minimum 5 items required (Element #1) | HALT — Add items |
| "money-back guarantee is clear" | Guarantee must be CONTRACT format (Element #2) | HALT — Rewrite |
| "5 CTAs is enough" | 6-10 CTAs required with variety (Element #3) | HALT — Add CTAs |
| "action is obvious" | Step-by-step instructions required (Element #4) | HALT — Add clarity |
| "P.S. is just a reminder" | P.S. must ADVANCE the close (Element #5) | HALT — Strengthen |
| "limited time" urgency" | Urgency must be JUSTIFIED | HALT — Add reason |
| "crossroads is a close pattern" | Crossroads must be SINCERE, not fabricated | HALT — Authentify |

---

## STRUCTURAL FIX 4: CTA VARIETY GATE

### The Problem
AI creates identical or near-identical CTA phrases, causing prospect fatigue.

### The Fix

**CTA COMPREHENSIVE VALIDATION:**

```yaml
cta_validation:
  total_ctas: [number]
  minimum_required: 6
  maximum_recommended: 10

  phrase_variety_check:
    cta_texts: [list all CTA phrases]
    all_different: [Y/N]

  emotional_variety_check:
    emotions_used: [list]  # confidence, consequence, urgency, curiosity, fear, hope
    minimum_3_different: [Y/N]

  reason_variety_check:
    different_reasons_given: [Y/N]  # Why click NOW

  IF total_ctas < 6:
    HALT — "Element #3 violation: Minimum 6 CTAs required"

  IF all_different == N:
    HALT — "CTAs must have DIFFERENT phrases"

  IF minimum_3_different == N:
    HALT — "CTAs must appeal to at least 3 DIFFERENT emotions"
```

---

## STRUCTURAL FIX 5: GUARANTEE FORMAT GATE

### The Problem
AI defaults to generic "money-back guarantee" language instead of confidence-building contract format.

### The Fix

**GUARANTEE FORMAT VALIDATION:**

```yaml
guarantee_validation:
  guarantee_text: "[the actual guarantee text]"

  forbidden_patterns_check:
    contains_if_not_satisfied: [Y/N]  # Should be N
    contains_return_for_refund: [Y/N]  # Should be N
    uses_generic_money_back: [Y/N]  # Should be N

  required_patterns_check:
    written_as_commitment: [Y/N]  # Should be Y
    feels_like_contract: [Y/N]  # Should be Y
    demonstrates_confidence: [Y/N]  # Should be Y

  IF any_forbidden_pattern == Y:
    HALT — "Element #2 violation: Guarantee must be CONTRACT format, not generic refund policy"

  rewrite_guidance:
    bad: "If you're not satisfied, return for a full refund"
    good: "I'm so confident [Product] will [specific result] that I'm putting my reputation on the line..."
```

---

## STRUCTURAL FIX 6: CLOSE-SPECIFIC MC-CHECK

```yaml
CLOSE-MC-CHECK:
  timestamp: "[current time]"

  human_checkpoint_verification:
    close_approach_confirmed_by_human: [Y/N]
    if_no: "STOP — Human must confirm close approach before drafting"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  benefit_summary_verification:
    you_get_format: [Y/N]
    item_count: [number]
    if_under_5: "STOP — Element #1: Minimum 5 'You get' items"

  guarantee_verification:
    contract_format: [Y/N]
    not_generic: [Y/N]
    if_any_no: "STOP — Element #2: Guarantee must be contract format"

  cta_verification:
    cta_count: [number]
    if_under_6: "STOP — Element #3: Minimum 6 CTAs"
    phrases_different: [Y/N]
    emotions_varied: [Y/N]
    if_any_no: "STOP — CTAs must have variety in phrase and emotion"

  action_instructions_verification:
    step_by_step: [Y/N]
    checkout_clear: [Y/N]
    if_any_no: "STOP — Element #4: Specific action instructions required"

  ps_verification:
    present: [Y/N]
    advances_close: [Y/N]
    if_any_no: "STOP — Element #5: P.S. must advance the close"

  elements_verification:
    elements_present: [number]
    if_under_6: "STOP — All 6 Makepeace elements required"

  result: [CONTINUE | HALT_HUMAN | HALT_SPECIMENS | HALT_ELEMENTS | HALT_CTA | HALT_GUARANTEE]
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 8, 11):
[ ] CLOSE-ANTI-DEGRADATION.md read (THIS FILE)
[ ] CLOSE-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 10)
[ ] Input files validated (offer-copy-package, campaign-brief, structure-package)

LAYER 0 (FOUNDATION + HUMAN CHECKPOINT):
[ ] Upstream packages loaded (offer-copy, campaign-brief)
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Close approach reviewed with human
[ ] HUMAN CONFIRMS closing theme
[ ] LAYER_0_COMPLETE.yaml created (with human confirmation)

LAYER 1 (CLASSIFICATION):
[ ] Closing theme selected (1 of 7 Makepeace themes)
[ ] Benefit summary designed (5+ items)
[ ] CTA plan has 6-10+ asks with variety
[ ] P.S. strategy selected
[ ] Type-matched specimens loaded VERBATIM
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (DRAFT):
[ ] Benefit summary uses "You get" (5+ items)
[ ] Guarantee is contract/promise (not generic)
[ ] Closing theme section complete
[ ] CTA sequence has 6+ with variety in phrase/emotion/reason
[ ] Action instructions specific with checkout clarity
[ ] P.S. written using Makepeace techniques
[ ] Sidebars/callouts present
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
[ ] Urgency justified with real-world reason
[ ] Crossroads/future pacing vivid (if applicable)
[ ] Cialdini integration subtle
[ ] Checkout process clear
[ ] All 6 Makepeace elements validated
[ ] Anti-slop passed
[ ] Score >= 7.0
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION & SELECTION):
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created
[ ] close-package.json created
[ ] CLOSE-SUMMARY.md created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified (close-package.json, CLOSE-SUMMARY.md, execution-log.md)
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY human confirmed close approach (LAYER_0)
[ ] VERIFY specimens loaded
[ ] VERIFY 6/6 Makepeace elements present
[ ] VERIFY 6+ CTAs with variety
[ ] VERIFY guarantee is contract format
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"Guarantee as policy says 'we have a return process.' Guarantee as contract says 'I'm betting my reputation.' CTAs without variety cause prospect fatigue at the moment of decision."**

---

## STRUCTURAL FIX 7: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 2-round + audience evaluation competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/17-close/checkpoints/ARENA_COMPLETE.yaml
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

## STRUCTURAL FIX 8: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which layers completed and what candidates were selected is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/17-close/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
├── execution-log.md          # Detailed execution record
├── close-package.json        # PRIMARY OUTPUT
└── CLOSE-SUMMARY.md          # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "17-close"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  offer_copy_package: [Y/N]
  campaign_brief: [Y/N]
  structure_package: [Y/N]
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

BEFORE writing close-package.json or CLOSE-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/close-package.json (root — from failed attempts)
     - [project]/17-close/close-package.json (correct location)
     - [project]/outputs/close-package.json (wrong path)
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

**Session startup protocol — BEFORE any Close execution:**

```
SESSION STARTUP:
  1. READ this file (CLOSE-ANTI-DEGRADATION.md) — MANDATORY
  2. READ CLOSE-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin Close execution without reading this anti-degradation file first.
```

---

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
| 1 | 1.1-closing-theme-selector | layer-1-outputs/1.1-closing-theme-selector.md | 3KB |
| 1 | 1.2-benefit-summary-designer | layer-1-outputs/1.2-benefit-summary-designer.md | 3KB |
| 1 | 1.3-cta-repetition-planner | layer-1-outputs/1.3-cta-repetition-planner.md | 3KB |
| 1 | 1.4-ps-strategy-selector | layer-1-outputs/1.4-ps-strategy-selector.md | 3KB |
| 2 | 2.1-benefit-summary-writer | layer-2-outputs/2.1-benefit-summary.md | 5KB |
| 2 | 2.2-guarantee-close-writer | layer-2-outputs/2.2-guarantee-close.md | 5KB |
| 2 | 2.3-closing-theme-writer | layer-2-outputs/2.3-closing-theme.md | 5KB |
| 2 | 2.4-cta-action-sequence-writer | layer-2-outputs/2.4-cta-action-sequence.md | 5KB |
| 3 | 3.1-urgency-scarcity-integrator | layer-3-outputs/3.1-urgency-scarcity.md | 3KB |
| 3 | 3.2-future-pacing-crossroads | layer-3-outputs/3.2-future-pacing-crossroads.md | 3KB |
| 3 | 3.3-ps-section-writer | layer-3-outputs/3.3-ps-section.md | 3KB |
| 3 | 3.4-cialdini-commitment | layer-3-outputs/3.4-cialdini-commitment.md | 3KB |
| 4 | 4.1-makepeace-elements-checker | layer-4-outputs/4.1-makepeace-elements-check.md | 3KB |
| 4 | 4.2-anti-slop-validator | layer-4-outputs/4.2-anti-slop-validation.md | 3KB |
| 4 | 4.3-vault-pattern-comparator | layer-4-outputs/4.3-vault-pattern-comparison.md | 3KB |
| 4 | 4.4-final-close-assembler | layer-4-outputs/4.4-final-close-assembly.md | 5KB |

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
| 2.0 | 2026-02-14 | STRUCTURAL FIXES 8-11: Added 4 structural fixes propagated from Skills 01-04. Fix 8: Mandatory Project Infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md, checkpoints/). Fix 9: Binary Gate Enforcement (forbidden statuses — PARTIAL_PASS, CONDITIONAL_PASS, etc. trigger IMMEDIATE HALT). Fix 10: Stale Artifact Cleanup (search and delete before writing replacement output). Fix 11: Anti-Degradation Mandatory Read (session startup protocol — read this file + CLOSE-AGENT.md before execution). Added PRE-EXECUTION and POST-EXECUTION sections to implementation checklist. |
| 1.2 | 2026-02-12 | PER-MICROSKILL OUTPUT PROTOCOL (v3.2): Added per-microskill output table with 24 required output files across Layers 0-4. Enhanced layer gate, execution log, and forbidden behaviors for per-microskill enforcement. |
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
