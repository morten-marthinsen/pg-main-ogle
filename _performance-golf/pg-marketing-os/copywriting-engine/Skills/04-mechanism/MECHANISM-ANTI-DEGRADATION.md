# MECHANISM-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent mechanism skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI skips scorecard validation and outputs mechanism without scoring
- AI scores fewer than 13 dimensions on the scorecard
- AI accepts mechanisms with composite score below 7.0
- AI generates mechanism without naming (no memorable name)
- AI skips proof mapping for mechanism claims
- AI produces mechanisms without analogy/metaphor anchor

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/04-mechanism/checkpoints/LAYER_1_COMPLETE.yaml
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/04-mechanism/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/04-mechanism/checkpoints/LAYER_2_COMPLETE.yaml
[project]/04-mechanism/checkpoints/ARENA_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/04-mechanism/checkpoints/LAYER_3_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "04-mechanism"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  scorecard_dimensions_scored:
    required: 13
    actual: [number]
    verified: true
  composite_score:
    minimum: 7.0
    actual: [number]
    verified: true
  mechanism_named:
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
| **Scorecard dimensions scored** | 13/13 | HALT — Score all dimensions |
| **Composite score** | 7.0 | HALT — Mechanism fails quality gate |
| **Mechanism name** | Must exist | HALT — Create memorable name |
| **Analogy/metaphor anchor** | 1 minimum | HALT — Mechanism needs graspable image |
| **Proof elements mapped** | 3 minimum | HALT — Map proof to mechanism claims |
| **Explanation layers** | 3 minimum | HALT — Simple → Medium → Technical |

### The 13 Scorecard Dimensions

Every mechanism MUST be scored on ALL 13 dimensions:

| Dimension | What It Measures |
|-----------|------------------|
| 1. Image Strength | How vivid is the mental picture? |
| 2. Simplicity | Can a 12-year-old understand it? |
| 3. Proof Integration | Is evidence woven in, not bolted on? |
| 4. Virality | Would someone share this concept? |
| 5. Ease of Use | Does it feel achievable? |
| 6. Differentiation | Is it clearly different from competitors? |
| 7. Embedded Benefits | Are benefits inherent in the mechanism? |
| 8. Doomsday Factor | Does failure feel consequential? |
| 9. Belief Compatibility | Does it fit existing worldview? |
| 10. Thesis Cohesion | Does it align with campaign thesis? |
| 11. Super Power Articulation | Does it grant special ability? |
| 12. Visceral Response | Does it trigger emotional reaction? |
| 13. Delivery Tangibility | Can they visualize using it? |

**IF ANY DIMENSION IS UNSCORED → MECHANISM VALIDATION INCOMPLETE**

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

**FORBIDDEN RATIONALIZATIONS — These statements are INVALID and trigger immediate HALT:**

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "scorecard is optional" | Scorecard validation is MANDATORY | HALT — Complete scorecard |
| "score is subjective" | Scores follow defined rubrics | HALT — Apply rubrics |
| "7.0 is just a guideline" | 7.0 is a NON-NEGOTIABLE minimum | HALT — Improve mechanism |
| "naming can come later" | Naming is part of mechanism creation | HALT — Create name now |
| "analogy is nice to have" | Analogy/metaphor is required for comprehension | HALT — Create analogy |
| "the mechanism is complex" | ALL mechanisms must be 12-year-old simple | HALT — Simplify |
| "proof comes in proof section" | Proof must be MAPPED to mechanism | HALT — Map proof |

### Enforcement Protocol

```
DURING MECHANISM EXECUTION:

IF you find yourself thinking ANY of the above rationalizations:
  1. STOP immediately
  2. OUTPUT: "🛑 RATIONALIZATION DETECTED: [which one]"
  3. Do NOT act on the rationalization
  4. Return to proper execution

This is not optional. Rationalizations are degradation signals.
```

---

## STRUCTURAL FIX 4: NAMING GATE

### The Problem
Mechanisms without memorable names fail to stick. "The mechanism" is not a name.

### The Fix

**MANDATORY NAMING VALIDATION:**

```yaml
naming_validation:
  mechanism_has_name: [Y/N]
  name_is_specific: [Y/N]  # Not "The System" or "The Method"
  name_is_memorable: [Y/N]  # Could be quoted in conversation
  name_connects_to_function: [Y/N]  # Name hints at what it does

  IF mechanism_has_name == N:
    HALT — "Mechanism must have memorable name"

  IF name_is_specific == N:
    HALT — "Name is too generic. Create specific name."

  examples_of_good_names:
    - "The AMPK Switch"
    - "The 3-Second Biomechanical Reset"
    - "The HSL Valve"
    - "The T-Factor"
    - "The Firming Flavonoids"
```

---

## STRUCTURAL FIX 5: SIMPLICITY GATE

### The Problem
AI produces mechanism explanations that are technically accurate but incomprehensible to prospects.

### The Fix

**MANDATORY 12-YEAR-OLD TEST:**

```yaml
simplicity_validation:
  core_concept_in_one_sentence: "[sentence]"
  uses_analogy_or_metaphor: [Y/N]
  analogy_is_everyday_object: [Y/N]  # Switch, valve, key, door, etc.
  avoids_jargon: [Y/N]

  IF uses_analogy_or_metaphor == N:
    HALT — "Mechanism needs graspable analogy"

  IF avoids_jargon == N:
    HALT — "Remove jargon. Use everyday language."

  test_question: "Could a 12-year-old explain this to a friend?"
  test_result: [Y/N]

  IF test_result == N:
    HALT — "Simplify mechanism explanation"
```

---

## STRUCTURAL FIX 6: MECHANISM-SPECIFIC MC-CHECK

**MECH-MC-CHECK (Required at each layer transition):**

```yaml
MECH-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [1 | 2 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP — Cannot proceed without checkpoint file"

  scorecard_verification:
    dimensions_scored: [number]
    if_under_13: "STOP — All 13 dimensions required"

    composite_score: [number]
    if_under_7: "STOP — Minimum composite score is 7.0"

  naming_verification:
    mechanism_has_name: [Y/N]
    if_no: "STOP — Mechanism must be named"

  simplicity_verification:
    has_analogy: [Y/N]
    passes_12yo_test: [Y/N]
    if_any_no: "STOP — Simplify mechanism"

  proof_verification:
    proof_elements_mapped: [number]
    if_under_3: "STOP — Map minimum 3 proof elements"

  rationalization_check:
    am_i_skipping_scorecard: [Y/N]
    am_i_accepting_low_score: [Y/N]
    am_i_skipping_naming: [Y/N]
    if_any_yes: "🛑 HALT — Rationalization detected"

  result: [CONTINUE | HALT_SCORECARD | HALT_SCORE | HALT_NAMING | HALT_SIMPLICITY | HALT_RATIONALIZATION]
```

---

## STRUCTURAL FIX 7: PROOF MAPPING REQUIREMENT

### The Problem
Mechanisms with unmapped proof feel like invented concepts rather than discovered truths.

### The Fix

**MANDATORY PROOF MAPPING:**

```yaml
proof_mapping:
  mechanism_claim_1:
    claim: "[what the mechanism does]"
    proof_element: "[specific study, testimonial, or data]"
    proof_source: "[where it comes from]"

  mechanism_claim_2:
    claim: "[second claim]"
    proof_element: "[evidence]"
    proof_source: "[source]"

  mechanism_claim_3:
    claim: "[third claim]"
    proof_element: "[evidence]"
    proof_source: "[source]"

  minimum_claims_mapped: 3
  actual_claims_mapped: [number]

  IF actual_claims_mapped < 3:
    HALT — "Map minimum 3 mechanism claims to proof"
```

---

## IMPLEMENTATION CHECKLIST

```
LAYER 0 (FOUNDATION):
[ ] Upstream packages loaded (research, proof, root-cause)
[ ] Vault intelligence loaded
[ ] Specimens loaded
[ ] Input validated

LAYER 1 (IDEATION):
[ ] Emphasis strategy selected
[ ] Mechanism type selected
[ ] Naming options generated (3+ candidates)
[ ] Explanation architecture designed
[ ] Analogy/metaphor developed
[ ] Proof elements mapped (3+ claims)
[ ] Ideation gate passed
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (OPTIMIZATION):
[ ] Image strength optimized
[ ] Simplicity validated (12-year-old test)
[ ] Proof integrated (not bolted on)
[ ] Virality assessed
[ ] Ease of use checked
[ ] Differentiation scored
[ ] Embedded benefits extracted
[ ] Doomsday factor developed
[ ] Belief compatibility checked
[ ] Thesis cohesion aligned
[ ] Super power articulated
[ ] Visceral response validated
[ ] Delivery tangibility evaluated
[ ] All 13 dimensions scored
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
[ ] Scorecard total calculated (>= 7.0)
[ ] Minimum threshold gate passed
[ ] Vault pattern comparison completed
[ ] Anti-slop validation passed
[ ] Best mechanism selected
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (PACKAGING):
[ ] Mechanism brief compiled
[ ] Copy integration points mapped
[ ] Handoff package created

ON CONTEXT RESUME:
[ ] DO NOT trust summary claims about scorecard completion
[ ] RE-READ checkpoint files
[ ] VERIFY all 13 dimensions scored
[ ] VERIFY composite score >= 7.0
[ ] If scorecard incomplete, RETURN to Layer 2
```

---

## KEY INSIGHT

> **"A mechanism without a name is forgettable. A mechanism without an analogy is incomprehensible. A mechanism without proof is unbelievable."**

The Mechanism skill has 4 layers for a reason:
- Layer 0: Load all inputs (can't create in vacuum)
- Layer 1: IDEATE mechanism options with naming and analogy
- Layer 2: OPTIMIZE against all 13 scorecard dimensions
- Layer 3: VALIDATE score meets threshold
- Layer 4: Package for downstream skills

Skipping scorecard means accepting mediocre mechanisms that don't convert.

---

## STRUCTURAL FIX 8: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/04-mechanism/checkpoints/ARENA_COMPLETE.yaml
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
[project]/04-mechanism/checkpoints/LAYER_1_COMPLETE.yaml
[project]/04-mechanism/checkpoints/LAYER_2_COMPLETE.yaml
[project]/04-mechanism/checkpoints/ARENA_COMPLETE.yaml    ← NEW (MANDATORY)
[project]/04-mechanism/checkpoints/LAYER_3_COMPLETE.yaml
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
