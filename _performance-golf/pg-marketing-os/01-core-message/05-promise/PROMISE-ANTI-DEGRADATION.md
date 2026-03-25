# PROMISE-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
**Purpose:** STRUCTURAL enforcement to prevent promise skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: PROMISE-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Generate fewer than 15 raw candidates, skip proof ceiling calibration, or accept a primary promise score below 8.0.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates too few promise candidates (under 15 raw candidates)
- AI skips proof ceiling calibration and over-promises
- AI selects primary promise without scoring against rubric
- AI produces promises that don't connect to mechanism
- AI skips Schwartz sophistication calibration
- AI produces fewer than 3 supporting promises

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/05-promise/checkpoints/LAYER_1_COMPLETE.yaml
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/05-promise/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/05-promise/checkpoints/LAYER_2_COMPLETE.yaml
[project]/05-promise/checkpoints/ARENA_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/05-promise/checkpoints/LAYER_3_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "05-promise"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  raw_candidates_generated:
    required: 15
    actual: [number]
    verified: true
  primary_promise_score:
    minimum: 8.0
    actual: [number]
    verified: true
  supporting_promises:
    required: 3
    actual: [number]
    verified: true
  proof_ceiling_applied:
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
| **Raw promise candidates** | 15 | HALT — Generate more candidates |
| **Primary promise score** | 8.0 | HALT — Primary fails quality gate |
| **Supporting promises** | 3 | HALT — Need more supporting promises |
| **Promise types explored** | 4 | HALT — Explore more promise types |
| **Proof ceiling applied** | Yes | HALT — Calibrate to proof inventory |
| **Schwartz calibration applied** | Yes | HALT — Calibrate to market sophistication |

### Promise Type Requirements

Candidates MUST explore at least 4 of these promise types:

| Promise Type | Description |
|--------------|-------------|
| Primary outcome | The main result they'll achieve |
| Speed promise | How quickly they'll see results |
| Ease promise | How simple the process is |
| Transformation promise | Who they'll become |
| Uniqueness promise | What makes this different |
| Emotional promise | How they'll feel |
| Identity promise | How others will see them |
| Problem elimination | What pain goes away |

**IF FEWER THAN 4 TYPES EXPLORED → IDEATION INCOMPLETE**

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

**FORBIDDEN RATIONALIZATIONS — These statements are INVALID and trigger immediate HALT:**

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "these 10 candidates are strong" | Minimum 15 required for proper selection | HALT — Generate 5 more |
| "proof ceiling is conservative" | Proof ceiling is PROTECTIVE, not restrictive | HALT — Stay within ceiling |
| "8.0 is aspirational" | 8.0 is the NON-NEGOTIABLE minimum for primary | HALT — Improve promise |
| "one strong promise is enough" | Need primary + 3 supporting minimum | HALT — Generate supporting |
| "Schwartz stage is obvious" | Stage must be VERIFIED from research | HALT — Verify stage |
| "mechanism connection is implied" | Promise must EXPLICITLY connect to mechanism | HALT — Make connection explicit |
| "this promise tested well elsewhere" | Promise must be calibrated for THIS market | HALT — Calibrate |

### Enforcement Protocol

```
DURING PROMISE EXECUTION:

IF you find yourself thinking ANY of the above rationalizations:
  1. STOP immediately
  2. OUTPUT: "🛑 RATIONALIZATION DETECTED: [which one]"
  3. Do NOT act on the rationalization
  4. Return to proper execution

This is not optional. Rationalizations are degradation signals.
```

---

## STRUCTURAL FIX 4: PROOF CEILING GATE

### The Problem
AI generates exciting promises that exceed what proof can support, leading to unbelievable claims.

### The Fix

**MANDATORY PROOF CEILING APPLICATION:**

```yaml
proof_ceiling_validation:
  proof_inventory_loaded: [Y/N]
  overall_proof_strength: [score from proof inventory]
  promise_ceiling_calculated: [Y/N]

  primary_promise:
    claim_level: [1-10 scale]
    proof_ceiling: [1-10 scale]

    IF claim_level > proof_ceiling:
      HALT — "Promise exceeds proof ceiling"
      ACTION: "Reduce claim specificity or strengthen proof"

  calibration_applied:
    schwartz_stage: [1-5]
    claim_adjusted_for_stage: [Y/N]

    IF schwartz_stage >= 4 AND claim_is_bold:
      HALT — "Sophisticated market requires mechanism-backed claims"
```

### Proof Ceiling Calculation

```
PROOF CEILING = min(
  overall_proof_strength,
  strongest_proof_element_score,
  market_credibility_threshold
)

Promise claim level MUST be <= Proof ceiling
```

---

## STRUCTURAL FIX 5: PROMISE-SPECIFIC MC-CHECK

**PROMISE-MC-CHECK (Required at each layer transition):**

```yaml
PROMISE-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [1 | 2 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP — Cannot proceed without checkpoint file"

  candidate_verification:
    raw_candidates_count: [number]
    if_under_15: "STOP — Minimum 15 raw candidates required"

    promise_types_explored: [number]
    if_under_4: "STOP — Explore at least 4 promise types"

  calibration_verification:
    proof_ceiling_applied: [Y/N]
    if_no: "STOP — Apply proof ceiling from inventory"

    schwartz_stage_verified: [Y/N]
    if_no: "STOP — Verify Schwartz stage from research"

  scoring_verification:
    primary_promise_score: [number]
    if_under_8: "STOP — Primary promise minimum is 8.0"

    supporting_promises_count: [number]
    if_under_3: "STOP — Need minimum 3 supporting promises"

  mechanism_verification:
    promise_connects_to_mechanism: [Y/N]
    if_no: "STOP — Promise must explicitly connect to mechanism"

  rationalization_check:
    am_i_accepting_too_few_candidates: [Y/N]
    am_i_exceeding_proof_ceiling: [Y/N]
    am_i_skipping_calibration: [Y/N]
    if_any_yes: "🛑 HALT — Rationalization detected"

  result: [CONTINUE | HALT_CANDIDATES | HALT_CALIBRATION | HALT_SCORE | HALT_RATIONALIZATION]
```

---

## STRUCTURAL FIX 6: MECHANISM CONNECTION REQUIREMENT

### The Problem
AI generates standalone promises that don't flow from the mechanism, creating disconnected campaigns.

### The Fix

**MANDATORY MECHANISM-PROMISE LINK:**

```yaml
mechanism_promise_connection:
  mechanism_name: "[from mechanism package]"
  mechanism_core_function: "[what it does]"

  primary_promise:
    promise_text: "[the promise]"
    mechanism_link: "[how mechanism delivers this]"
    link_is_explicit: [Y/N]

    IF link_is_explicit == N:
      HALT — "Promise must explicitly connect to mechanism"

  supporting_promises:
    - promise_1:
        text: "[promise]"
        mechanism_link: "[connection]"
    - promise_2:
        text: "[promise]"
        mechanism_link: "[connection]"
    - promise_3:
        text: "[promise]"
        mechanism_link: "[connection]"
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 8, 11):
[ ] PROMISE-ANTI-DEGRADATION.md read (THIS FILE)
[ ] PROMISE-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 10)
[ ] Input files validated (research, proof, root-cause, mechanism)

LAYER 0 (FOUNDATION):
[ ] Upstream packages loaded (research, proof, root-cause, mechanism)
[ ] Vault intelligence loaded
[ ] Input validated
[ ] Proof ceiling calculated

LAYER 1 (DRAFTING):
[ ] Blue sky ideation completed
[ ] Specificity enhancement applied
[ ] Promise type variations created (4+ types)
[ ] Mechanism connection established
[ ] Emotional framing added
[ ] Customer language mapped
[ ] 15+ raw candidates assembled
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (CALIBRATION):
[ ] Proof ceiling applied to all candidates
[ ] Schwartz stage calibration applied
[ ] Mechanism fit verified for each
[ ] Competitor differentiation checked
[ ] Campaign thesis generated
[ ] Calibration scoring completed
[ ] Top candidates ranked (7+ ranked)
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

LAYER 3 (VALIDATION):
[ ] Proof verification (can we prove it?)
[ ] Objection resilience (will it hold up?)
[ ] Believability testing
[ ] Compliance check
[ ] Customer voice validation
[ ] Mechanism-story coherence
[ ] Validation assembly complete
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (OUTPUT):
[ ] Primary promise selected (score >= 8.0)
[ ] Supporting promises selected (3+)
[ ] Promise variations created
[ ] Usage matrix completed
[ ] Proof pairing documented
[ ] Copy integration guide created
[ ] Final output assembled

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] DO NOT trust summary claims about candidate counts
[ ] RE-READ checkpoint files
[ ] VERIFY 15+ candidates from actual output
[ ] VERIFY proof ceiling was applied
[ ] If ideation was abbreviated, RETURN to Layer 1
```

---

## KEY INSIGHT

> **"A promise without proof ceiling calibration is a lie waiting to be exposed. A promise without mechanism connection is a claim without reason to believe."**

The Promise skill has 4 layers for a reason:
- Layer 1: Generate VOLUME (15+ candidates across 4+ types)
- Layer 2: CALIBRATE to proof ceiling and market sophistication
- Layer 3: VALIDATE believability and mechanism fit
- Layer 4: SELECT and package primary + supporting promises

Skipping calibration means promising what you can't prove.

---

## STRUCTURAL FIX 7: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 2-round + audience evaluation competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/05-promise/checkpoints/ARENA_COMPLETE.yaml
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
skill: "05-promise"
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

## STRUCTURAL FIX 8: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which layers completed and what candidates were selected is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/05-promise/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
├── execution-log.md          # Detailed execution record
├── promise-package.yaml      # PRIMARY OUTPUT
└── PROMISE-SUMMARY.md        # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "05-promise"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  research_handoff: "[Y/N]"
  proof_inventory: "[Y/N]"
  root_cause_package: "[Y/N]"
  mechanism_package: "[Y/N]"
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

BEFORE writing promise-package.yaml or PROMISE-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/promise-package.yaml (root — from failed attempts)
     - [project]/05-promise/promise-package.yaml (correct location)
     - [project]/outputs/promise-package.yaml (wrong path)
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

**Session startup protocol — BEFORE any Promise execution:**

```
SESSION STARTUP:
  1. READ this file (PROMISE-ANTI-DEGRADATION.md) — MANDATORY
  2. READ PROMISE-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin Promise execution without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Added:** 2026-02-12
**Reference:** ~system/SYSTEM-CORE.md § MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | L0-input-validation | layer-0-outputs/L0-input-validation.md | 1KB min |
| 0 | 0.2-vault-intelligence-loader | layer-0-outputs/0.2-vault-intelligence-loader.md | 1KB min |
| 0 | 0.2.5-specimen-decomposer | layer-0-outputs/0.2.5-specimen-decomposer.md | 1KB min |
| 1 | 1.1-blue-sky-ideation | layer-1-outputs/1.1-blue-sky-ideation.md | 5KB min |
| 1 | 1.2-specificity-enhancement | layer-1-outputs/1.2-specificity-enhancement.md | 3KB min |
| 1 | 1.3-promise-type-variations | layer-1-outputs/1.3-promise-type-variations.md | 3KB min |
| 1 | 1.4-mechanism-connection | layer-1-outputs/1.4-mechanism-connection.md | 3KB min |
| 1 | 1.5-emotional-framing | layer-1-outputs/1.5-emotional-framing.md | 3KB min |
| 1 | 1.6-customer-language-mapping | layer-1-outputs/1.6-customer-language-mapping.md | 3KB min |
| 1 | 1.7-candidate-assembly | layer-1-outputs/1.7-candidate-assembly.md | 5KB min |
| 2 | 2.1-proof-ceiling | layer-2-outputs/2.1-proof-ceiling.md | 2KB min |
| 2 | 2.2-schwartz-calibration | layer-2-outputs/2.2-schwartz-calibration.md | 2KB min |
| 2 | 2.3-mechanism-fit | layer-2-outputs/2.3-mechanism-fit.md | 2KB min |
| 2 | 2.4-competitor-differentiation | layer-2-outputs/2.4-competitor-differentiation.md | 2KB min |
| 2 | 2.5-campaign-thesis | layer-2-outputs/2.5-campaign-thesis.md | 3KB min |
| 2 | 2.6-calibration-scoring | layer-2-outputs/2.6-calibration-scoring.md | 3KB min |
| 2 | 2.7-top-candidate-ranking | layer-2-outputs/2.7-top-candidate-ranking.md | 3KB min |
| 3 | 3.1-proof-verification | layer-3-outputs/3.1-proof-verification.md | 3KB min |
| 3 | 3.2-objection-resilience | layer-3-outputs/3.2-objection-resilience.md | 3KB min |
| 3 | 3.3-believability-testing | layer-3-outputs/3.3-believability-testing.md | 3KB min |
| 3 | 3.4-compliance-check | layer-3-outputs/3.4-compliance-check.md | 2KB min |
| 3 | 3.5-customer-voice-validation | layer-3-outputs/3.5-customer-voice-validation.md | 2KB min |
| 3 | 3.6-mechanism-story-coherence | layer-3-outputs/3.6-mechanism-story-coherence.md | 2KB min |
| 3 | 3.7-validation-assembly | layer-3-outputs/3.7-validation-assembly.md | 3KB min |
| 4 | 4.1-primary-promise-selection | layer-4-outputs/4.1-primary-promise-selection.md | 3KB min |
| 4 | 4.2-supporting-promise-selection | layer-4-outputs/4.2-supporting-promise-selection.md | 3KB min |
| 4 | 4.3-promise-variations | layer-4-outputs/4.3-promise-variations.md | 3KB min |
| 4 | 4.4-usage-matrix | layer-4-outputs/4.4-usage-matrix.md | 3KB min |
| 4 | 4.5-proof-pairing | layer-4-outputs/4.5-proof-pairing.md | 3KB min |
| 4 | 4.6-copy-integration-guide | layer-4-outputs/4.6-copy-integration-guide.md | 3KB min |
| 4 | 4.7-final-assembly | layer-4-outputs/4.7-final-assembly.md | 5KB min |

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

## STRUCTURAL FIX 12: CATEGORY SPREAD + DIVERSITY ENFORCEMENT

### The Problem
Promise generation tends to cluster around one promise type — typically transformation or improvement promises. When 10 of 15 candidates are variations of "you'll lose X pounds in Y days," the Arena evaluates volume without diversity. The best promise may be an emotional or prevention type that was never generated.

### The Fix

**Reference:** `~system/protocols/BRAINSTORM-DIVERSITY-PROTOCOL.md`

**1. Minimum Category Spread:**

Promise candidates MUST cover 4+ promise types:

| Type | What It Means |
|------|--------------|
| **Transformation** | Who they'll become (identity shift) |
| **Improvement** | What gets measurably better (specific metric) |
| **Relief** | What pain/problem disappears |
| **Capability** | What new ability they gain |
| **Prevention** | What future problem they avoid |
| **Identity** | How others will perceive them differently |
| **Emotional** | How they'll feel (internal state change) |
| **Speed/ease** | How quickly/easily they'll see results |

```yaml
category_spread_check:
  total_candidates: [number]
  promise_types_represented: [number]
  IF promise_types_represented < 4:
    HALT — "Need candidates from 4+ promise types. Missing types: [list]"
```

**2. Similarity De-duplication:**

After generation (Layer 1), before calibration (Layer 2):
- Group candidates by dominant promise frame
- If any single group contains >40% of total candidates: flag as "cluster-heavy"
- When cluster-heavy: generate 3-5 additional candidates OUTSIDE the overrepresented type
- This is additive — does not delete existing candidates

**3. Specimen-Anchored Divergence:**

When specimens are used to guide promise generation:
- Each ideation pass must anchor to a DIFFERENT specimen
- Mix classic and modern approaches
- Prevents all promises being variations of one specimen's pattern

**MC-CHECK Addition:**

Add to PROMISE-MC-CHECK:

```yaml
diversity_verification:
  promise_types_represented: [number]
  if_under_4: "HALT — Need 4+ promise types represented"
  cluster_heavy_detected: [Y/N]
  if_yes_additional_generated: [Y/N]
  if_cluster_heavy_and_no_additional: "HALT — Generate 3-5 candidates outside overrepresented type"
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-03-06 | CATEGORY SPREAD + DIVERSITY: Added Structural Fix 12 — 4+ promise types required, 40% cluster threshold triggers additive generation, specimen-anchored divergence. MC-CHECK enhanced with diversity_verification. Reference: `~system/protocols/BRAINSTORM-DIVERSITY-PROTOCOL.md`. |
| 2.0 | 2026-02-14 | STRUCTURAL ENFORCEMENT PROPAGATION: Added 4 structural fixes from Skills 01-04 propagation pattern. Fix 8: Mandatory project infrastructure (PROJECT-STATE.md + PROGRESS-LOG.md). Fix 9: Binary gate enforcement with forbidden statuses. Fix 10: Stale artifact cleanup. Fix 11: Anti-degradation mandatory read at session startup. Implementation checklist expanded with PRE-EXECUTION and POST-EXECUTION sections. |
| 1.2 | 2026-02-12 | Added Per-Microskill Output Protocol (v3.2) — complete output file table for all 31 microskills across Layers 0, 1, 2, 3, and 4. Layer gate enhancement, execution log enhancement, forbidden behaviors. |
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
