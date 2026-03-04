# PROMISE-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent promise skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

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
[ ] All 7 competitors generated across 3 rounds
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
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/05-promise/checkpoints/ARENA_COMPLETE.yaml
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
[project]/05-promise/checkpoints/LAYER_1_COMPLETE.yaml
[project]/05-promise/checkpoints/LAYER_2_COMPLETE.yaml
[project]/05-promise/checkpoints/ARENA_COMPLETE.yaml    ← NEW (MANDATORY)
[project]/05-promise/checkpoints/LAYER_3_COMPLETE.yaml
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
