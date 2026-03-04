# STRUCTURE-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent structure skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

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
[ ] All 7 competitors generated across 3 rounds
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
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/08-structure/checkpoints/ARENA_COMPLETE.yaml
```

This file is created ONLY after:
1. All 7 competitors have generated entries (7 unique personas)
2. 3 full rounds completed (not 1, not 2 — THREE)
3. Adversarial critique completed each round (ONE weakness per competitor)
4. Targeted revision completed each round
5. Post-Arena Synthesis: 2-3 hybrids created from top performers
6. Human selection received (BLOCKING — cannot proceed without it)

### Updated Checkpoint Progression
```
[project]/08-structure/checkpoints/LAYER_1_COMPLETE.yaml
[project]/08-structure/checkpoints/LAYER_2_COMPLETE.yaml
[project]/08-structure/checkpoints/ARENA_COMPLETE.yaml    ← NEW (MANDATORY)
[project]/08-structure/checkpoints/LAYER_3_COMPLETE.yaml
```

### Arena-Specific Forbidden Rationalizations

| Rationalization | Why It's Wrong | Required Response |
|----------------|---------------|-------------------|
| "Context is too long for Arena" | Arena is the HIGHEST-VALUE step. Context management is YOUR problem, not a reason to skip. | Manage context. Run Arena. |
| "The Layer 2 output is already strong" | Single-perspective output is NEVER as strong as 7-competitor tested output. | Run Arena regardless of perceived quality. |
| "I'll run Arena separately/later" | "Later" means never. Arena runs between Layer 2 and Layer 3. Period. | Run Arena NOW, before Layer 3. |
| "Arena would be redundant here" | Arena is NEVER redundant. It catches blind spots single-perspective generation cannot. | Run Arena. No exceptions. |
| "The user didn't specifically request Arena" | Arena is MANDATORY per engine architecture. It doesn't require a request. | Run Arena. It's structural, not optional. |
| "I can incorporate Arena-style thinking" | Simulating competition is not competition. 7 real personas generating real alternatives is irreplaceable. | Run full Arena protocol. No shortcuts. |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
