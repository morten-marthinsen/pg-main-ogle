# STRUCTURE-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
**Purpose:** STRUCTURAL enforcement to prevent structure skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: STRUCTURE-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Produce fewer than 5 CPB chunks, skip gap mapping or segue planning, or accept a coherence score below 7.0.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI produces fewer than 5 CPB (Claim-Proof-Benefit) chunks
- AI skips gap mapping from prospect's current state to purchase-ready
- AI produces chunks without proof-to-claim mapping
- AI skips coherence validation (chunks don't flow logically)
- AI produces structure without segue/transition planning
- AI accepts coherence score below 7.0

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/08-structure/checkpoints/LAYER_1_COMPLETE.yaml
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/08-structure/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/08-structure/checkpoints/LAYER_2_COMPLETE.yaml
[project]/08-structure/checkpoints/ARENA_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/08-structure/checkpoints/LAYER_3_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "08-structure"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  cpb_chunks_created:
    required: 5
    actual: [number]
    verified: true
  coherence_score:
    minimum: 7.0
    actual: [number]
    verified: true
  segues_planned:
    required: true
    actual: [Y/N]
    verified: true

completeness:
  all_microskills_executed: true
  minimum_thresholds_met: true
  quality_gates_passed: true
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **CPB chunks** | 5 | HALT — Create more chunks |
| **Coherence score** | 7.0 | HALT — Restructure for flow |
| **Gap-to-chunk mapping** | Complete | HALT — All gaps must map to chunks |
| **Proof-to-claim mapping** | Complete | HALT — Every claim needs proof |
| **Segue planning** | Done | HALT — Plan all transitions |
| **Argument strategy** | Selected | HALT — Must have explicit strategy |

### CPB Chunk Structure

Every chunk MUST contain all 3 elements:

| Element | Description | Check |
|---------|-------------|-------|
| **Claim** | What you're asserting | [ ] |
| **Proof** | Evidence supporting the claim | [ ] |
| **Benefit** | Why this matters to prospect | [ ] |

```yaml
cpb_chunk:
  claim: "[The assertion being made]"
  proof: "[Evidence supporting the claim]"
  benefit: "[Why the prospect should care]"
```

**IF ANY CPB ELEMENT MISSING → CHUNK INCOMPLETE**

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

**FORBIDDEN RATIONALIZATIONS — These statements are INVALID and trigger immediate HALT:**

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "4 chunks cover everything" | Minimum 5 chunks required | HALT — Create 5th chunk |
| "coherence is subjective" | Coherence has measurable criteria | HALT — Apply criteria |
| "proof can be added later" | Proof must be mapped NOW | HALT — Map proof to claims |
| "segues will emerge" | Segues must be PLANNED | HALT — Plan segues explicitly |
| "the argument is obvious" | Argument strategy must be explicit | HALT — Select and document strategy |
| "flow is good enough" | 7.0 coherence is minimum | HALT — Restructure |

### Enforcement Protocol

```
DURING STRUCTURE EXECUTION:

IF you find yourself thinking ANY of the above rationalizations:
  1. STOP immediately
  2. OUTPUT: "🛑 RATIONALIZATION DETECTED: [which one]"
  3. Do NOT act on the rationalization
  4. Return to proper execution

This is not optional. Rationalizations are degradation signals.
```

---

## STRUCTURAL FIX 4: GAP MAPPING GATE

### The Problem
AI produces structures without mapping the prospect's journey from current state to purchase-ready.

### The Fix

**MANDATORY GAP MAPPING:**

```yaml
gap_mapping:
  prospect_current_state:
    awareness_level: "[unaware | problem_aware | solution_aware | product_aware | most_aware]"
    belief_state: "[what they currently believe]"
    emotional_state: "[current feelings about problem]"
    objections_held: "[list of objections]"

  prospect_purchase_ready_state:
    awareness_level: "most_aware"
    belief_state: "[what they must believe to buy]"
    emotional_state: "[how they must feel to act]"
    objections_resolved: "[all objections addressed]"

  gaps_to_close:
    - gap_1:
        from: "[current belief/state]"
        to: "[required belief/state]"
        chunk_assigned: "[which CPB chunk closes this gap]"
    - gap_2:
        from: "[current]"
        to: "[required]"
        chunk_assigned: "[chunk]"
    # Continue for all gaps

  validation:
    all_gaps_mapped_to_chunks: [Y/N]

    IF all_gaps_mapped_to_chunks == N:
      HALT — "All gaps must be assigned to CPB chunks"
```

---

## STRUCTURAL FIX 5: COHERENCE VALIDATION GATE

### The Problem
AI produces chunks that are individually good but don't flow together logically.

### The Fix

**MANDATORY COHERENCE SCORING:**

```yaml
coherence_validation:
  chunk_sequence:
    - chunk_1: "[name]"
    - chunk_2: "[name]"
    - chunk_3: "[name]"
    - chunk_4: "[name]"
    - chunk_5: "[name]"

  flow_checks:
    logical_progression: [1-10]
      # Does each chunk build on the previous?
    emotional_arc: [1-10]
      # Does emotion build appropriately?
    no_redundancy: [1-10]
      # No repeated arguments?
    objection_timing: [1-10]
      # Are objections addressed before they arise?
    proof_distribution: [1-10]
      # Is proof spread throughout, not clumped?

  coherence_score: [average of above]
  minimum_required: 7.0

  IF coherence_score < 7.0:
    HALT — "Coherence below threshold"
    ACTION: "Reorder chunks or add connecting logic"

  weak_transitions:
    - between_chunks: "[chunk A → chunk B]"
      issue: "[why it doesn't flow]"
      fix: "[how to improve]"
```

---

## STRUCTURAL FIX 6: SEGUE PLANNING REQUIREMENT

### The Problem
AI leaves transitions between chunks unplanned, leading to choppy copy.

### The Fix

**MANDATORY SEGUE PLANNING:**

```yaml
segue_plan:
  transition_1:
    from_chunk: "[chunk name]"
    to_chunk: "[chunk name]"
    segue_type: "[question | story_continuation | proof_callback | emotional_pivot | logical_bridge]"
    segue_text: "[planned transition language]"

  transition_2:
    from_chunk: "[chunk name]"
    to_chunk: "[chunk name]"
    segue_type: "[type]"
    segue_text: "[text]"

  # Continue for all transitions

  all_transitions_planned: [Y/N]

  IF all_transitions_planned == N:
    HALT — "All chunk transitions must be planned"
```

### Segue Types

| Type | Use When | Example |
|------|----------|---------|
| Question | Opening curiosity loop | "But why does this matter to you?" |
| Story continuation | Returning to narrative | "Remember what happened next?" |
| Proof callback | Reinforcing earlier evidence | "This is exactly why those studies showed..." |
| Emotional pivot | Shifting emotional register | "Now, I want you to imagine..." |
| Logical bridge | Connecting arguments | "And here's what that means for..." |

---

## STRUCTURAL FIX 7: STRUCTURE-SPECIFIC MC-CHECK

**STRUCTURE-MC-CHECK (Required at each layer transition):**

```yaml
STRUCTURE-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [1 | 2 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP — Cannot proceed without checkpoint file"

  chunk_verification:
    cpb_chunks_created: [number]
    if_under_5: "STOP — Minimum 5 CPB chunks required"

    all_chunks_have_claim: [Y/N]
    all_chunks_have_proof: [Y/N]
    all_chunks_have_benefit: [Y/N]
    if_any_no: "STOP — All CPB elements required for each chunk"

  gap_verification:
    gaps_identified: [number]
    gaps_mapped_to_chunks: [number]
    if_unmapped_gaps: "STOP — All gaps must map to chunks"

  coherence_verification:
    coherence_score: [number]
    if_under_7: "STOP — Coherence minimum is 7.0"

  segue_verification:
    transitions_planned: [number]
    transitions_needed: [number - 1 for N chunks]
    if_transitions_planned < transitions_needed: "STOP — Plan all segues"

  rationalization_check:
    am_i_accepting_fewer_chunks: [Y/N]
    am_i_skipping_proof_mapping: [Y/N]
    am_i_skipping_segue_planning: [Y/N]
    if_any_yes: "🛑 HALT — Rationalization detected"

  result: [CONTINUE | HALT_CHUNKS | HALT_GAPS | HALT_COHERENCE | HALT_SEGUES | HALT_RATIONALIZATION]
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 9, 12):
[ ] STRUCTURE-ANTI-DEGRADATION.md read (THIS FILE)
[ ] STRUCTURE-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 11)
[ ] Input files validated (research, proof, root-cause, mechanism, promise, big-idea, offer)

LAYER 0 (FOUNDATION):
[ ] Upstream packages loaded
[ ] Vault intelligence loaded
[ ] Teachings loaded
[ ] Input validated

LAYER 1 (MAPPING):
[ ] Campaign thesis crystallized
[ ] Prospect gaps mapped (current → purchase-ready)
[ ] Gaps converted to chunks
[ ] Argument strategy selected
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (CONSTRUCTION):
[ ] Claims engineered (5+ claims)
[ ] Proof-to-claim mapped (every claim has proof)
[ ] Benefits dimensionalized
[ ] CPB chunks assembled (5+ complete chunks)
[ ] LAYER_2_COMPLETE.yaml created

LAYER 2.5 (ARENA — MANDATORY, CANNOT BE SKIPPED):
[ ] ARENA-LAYER.md READ (MANDATORY — contains skill-specific judging criteria)
[ ] ARENA-CORE-PROTOCOL.md READ (path: ~system/protocols/ARENA-CORE-PROTOCOL.md)
[ ] ARENA-PERSONA-PANEL.md READ (path: ~system/protocols/ARENA-PERSONA-PANEL.md)
[ ] Persona names VERIFIED against protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect
[ ] All 7 competitors generated across 2 rounds
[ ] Adversarial critique completed each round
[ ] Targeted revision completed each round
[ ] Post-Arena Synthesis: 2-3 hybrids created
[ ] 9-10 candidates presented to human
[ ] Human selection received (BLOCKING)
[ ] ARENA_COMPLETE.yaml created

LAYER 3 (SEQUENCING):
[ ] Chunks sequenced for flow
[ ] Segues built (simple segues)
[ ] Connectors engineered
[ ] Coherence markers integrated
[ ] SIN segues built (if applicable)
[ ] Coherence score calculated (>= 7.0)
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION):
[ ] Logical coherence validated
[ ] Persuasion flow audited
[ ] Anti-slop validation passed
[ ] Vault pattern comparison completed
[ ] Final argument assembled

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] DO NOT trust summary claims about chunk counts
[ ] RE-READ checkpoint files
[ ] VERIFY 5+ CPB chunks from actual output
[ ] VERIFY all chunks have C, P, and B
[ ] VERIFY coherence score >= 7.0
[ ] VERIFY segues are planned
[ ] If structure incomplete, RETURN to appropriate layer
```

---

## KEY INSIGHT

> **"Structure without gap mapping leaves holes in the argument. Structure without coherence produces choppy copy. Structure without segue planning creates jarring transitions."**

The Structure skill has 4 layers for a reason:
- Layer 1: MAP the gaps from current state to purchase-ready
- Layer 2: CONSTRUCT CPB chunks to close each gap
- Layer 3: SEQUENCE chunks for flow and plan segues
- Layer 4: VALIDATE coherence and assemble final argument

Skipping gap mapping means missing steps in the persuasion journey.

---

## STRUCTURAL FIX 8: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 2-round + audience evaluation competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/08-structure/checkpoints/ARENA_COMPLETE.yaml
```

This file is created ONLY after:
1. All 7 competitors have generated across 2 rounds
2. Adversarial critique completed each round
3. Targeted revision completed each round
4. All candidates scored against 7 criteria
5. Post-arena synthesis complete (2-3 hybrids)
6. Human selection received (BLOCKING)

### ARENA_COMPLETE.yaml Format

```yaml
# ARENA_COMPLETE.yaml
layer: "2.5"
skill: "08-structure"
status: COMPLETE
timestamp: "[ISO 8601]"

arena_execution:
  rounds_completed: 2
  competitors_per_round: 7
  critique_phases_completed: 2
  revision_phases_completed: 2
  hybrids_created: [number]

human_selection:
  selected_candidate: "[name]"
  selection_type: "[pure | hybrid]"
  selected_from_persona: "[persona name or 'synthesizer']"
  timestamp: "[ISO 8601]"

verification:
  all_7_competitors_generated: true
  all_2_rounds_completed: true
  critique_before_scoring: true
  human_selection_received: true

persona_verification:
  personas_loaded_from: "~system/protocols/ARENA-PERSONA-PANEL.md"
  personas_used:
    - Makepeace
    - Halbert
    - Schwartz
    - Ogilvy
    - Clemens
    - Bencivenga
    - The Architect
  all_match_protocol: true  # FALSE = HALT — fabrication detected
```

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
[project]/08-structure/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
├── execution-log.md          # Detailed execution record
├── structure-package.yaml    # PRIMARY OUTPUT
└── STRUCTURE-SUMMARY.md      # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "08-structure"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  research_handoff: "[Y/N]"
  proof_inventory: "[Y/N]"
  root_cause_package: "[Y/N]"
  mechanism_package: "[Y/N]"
  promise_package: "[Y/N]"
  big_idea_package: "[Y/N]"
  offer_package: "[Y/N]"
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

BEFORE writing structure-package.yaml or STRUCTURE-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/structure-package.yaml (root — from failed attempts)
     - [project]/08-structure/structure-package.yaml (correct location)
     - [project]/outputs/structure-package.yaml (wrong path)
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

**Session startup protocol — BEFORE any Structure execution:**

```
SESSION STARTUP:
  1. READ this file (STRUCTURE-ANTI-DEGRADATION.md) — MANDATORY
  2. READ STRUCTURE-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin Structure execution without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Added:** 2026-02-12
**Reference:** ~system/SYSTEM-CORE.md § MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB min |
| 0 | 0.2-vault-intelligence-loader | layer-0-outputs/0.2-vault-intelligence-loader.md | 1KB min |
| 0 | 0.2.5-specimen-decomposer | layer-0-outputs/0.2.5-specimen-decomposer.md | 1KB min |
| 0 | 0.3-teachings-loader | layer-0-outputs/0.3-teachings-loader.md | 1KB min |
| 0 | 0.4-input-validator | layer-0-outputs/0.4-input-validator.md | 1KB min |
| 1 | 1.1-campaign-thesis-crystallizer | layer-1-outputs/1.1-campaign-thesis-crystallizer.md | 3KB min |
| 1 | 1.2-prospect-gap-mapper | layer-1-outputs/1.2-prospect-gap-mapper.md | 3KB min |
| 1 | 1.3-gap-to-chunk-converter | layer-1-outputs/1.3-gap-to-chunk-converter.md | 3KB min |
| 1 | 1.4-argument-strategy-selector | layer-1-outputs/1.4-argument-strategy-selector.md | 3KB min |
| 2 | 2.1-claim-engineer | layer-2-outputs/2.1-claim-engineer.md | 3KB min |
| 2 | 2.2-proof-to-claim-mapper | layer-2-outputs/2.2-proof-to-claim-mapper.md | 3KB min |
| 2 | 2.3-benefit-dimensionalizer | layer-2-outputs/2.3-benefit-dimensionalizer.md | 3KB min |
| 2 | 2.4-cpb-chunk-assembler | layer-2-outputs/2.4-cpb-chunk-assembler.md | 5KB min |
| 3 | 3.1-chunk-sequencer | layer-3-outputs/3.1-chunk-sequencer.md | 3KB min |
| 3 | 3.2-simple-segue-builder | layer-3-outputs/3.2-simple-segue-builder.md | 3KB min |
| 3 | 3.3-connector-engineer | layer-3-outputs/3.3-connector-engineer.md | 3KB min |
| 3 | 3.4-coherence-marker-integrator | layer-3-outputs/3.4-coherence-marker-integrator.md | 2KB min |
| 3 | 3.5-sin-segue-builder | layer-3-outputs/3.5-sin-segue-builder.md | 3KB min |
| 4 | 4.1-logical-coherence-validator | layer-4-outputs/4.1-logical-coherence-validator.md | 3KB min |
| 4 | 4.2-persuasion-flow-auditor | layer-4-outputs/4.2-persuasion-flow-auditor.md | 3KB min |
| 4 | 4.3-anti-slop-validator | layer-4-outputs/4.3-anti-slop-validator.md | 3KB min |
| 4 | 4.4-vault-pattern-comparator | layer-4-outputs/4.4-vault-pattern-comparator.md | 3KB min |
| 4 | 4.5-final-argument-assembler | layer-4-outputs/4.5-final-argument-assembler.md | 5KB min |

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
| 2.0 | 2026-02-14 | STRUCTURAL ENFORCEMENT PROPAGATION: Added 4 structural fixes from Skills 01-04 propagation pattern. Fix 9: Mandatory project infrastructure (PROJECT-STATE.md + PROGRESS-LOG.md). Fix 10: Binary gate enforcement with forbidden statuses. Fix 11: Stale artifact cleanup. Fix 12: Anti-degradation mandatory read at session startup. Implementation checklist expanded with PRE-EXECUTION and POST-EXECUTION sections. |
| 1.2 | 2026-02-12 | PER-MICROSKILL OUTPUT PROTOCOL: Added per-microskill output table (23 microskills across Layers 0-4) with minimum file size thresholds. Layer gate enhancement, execution log enhancement, forbidden behaviors for per-microskill outputs. |
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
