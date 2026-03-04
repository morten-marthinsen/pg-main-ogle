# BIG-IDEA-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent big idea skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates fewer than 9 candidates (should be 3×3 matrix)
- AI skips schema distance calibration (ideas too familiar OR too alien)
- AI produces fewer than 10 headlines per candidate
- AI skips volume validation (not enough candidates to select from)
- AI produces Big Ideas without FSSIT elements
- AI skips defensibility validation (idea can't be proven)

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/06-big-idea/checkpoints/LAYER_1_COMPLETE.yaml
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/06-big-idea/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/06-big-idea/checkpoints/LAYER_2_COMPLETE.yaml
[project]/06-big-idea/checkpoints/ARENA_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/06-big-idea/checkpoints/LAYER_3_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "06-big-idea"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  candidates_generated:
    required: 9
    actual: [number]
    verified: true
  schema_distance_range:
    minimum: 4
    maximum: 8
    actual_range: "[min-max]"
    verified: true
  headlines_per_candidate:
    required: 10
    actual_minimum: [number]
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
| **Big Idea candidates** | 9 (3×3 matrix) | HALT — Generate more candidates |
| **Schema distance** | 4-8 range | HALT — Too familiar (<4) or too alien (>8) |
| **Headlines per candidate** | 10 | HALT — Generate more headlines |
| **Leads per top candidate** | 3 | HALT — Generate more leads |
| **FSSIT elements present** | 5/5 | HALT — Include all FSSIT elements |
| **Defensibility score** | 7.0 | HALT — Idea can't be proven |

### The 3×3 Candidate Matrix

Big Idea generation MUST produce a 3×3 matrix:

| | Strategy A | Strategy B | Strategy C |
|---|---|---|---|
| **Angle 1** | Candidate 1 | Candidate 2 | Candidate 3 |
| **Angle 2** | Candidate 4 | Candidate 5 | Candidate 6 |
| **Angle 3** | Candidate 7 | Candidate 8 | Candidate 9 |

**IF FEWER THAN 9 CANDIDATES → IDEATION INCOMPLETE**

### FSSIT Elements (All 5 Required)

Every Big Idea MUST contain:

| Element | Description | Check |
|---------|-------------|-------|
| **F** - Fresh | Not already saturated in market | [ ] |
| **S** - Specific | Concrete, not vague | [ ] |
| **S** - Surprising | Creates genuine "aha" | [ ] |
| **I** - Intriguing | Opens curiosity loop | [ ] |
| **T** - Truthful | Can be defended with proof | [ ] |

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

**FORBIDDEN RATIONALIZATIONS — These statements are INVALID and trigger immediate HALT:**

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "6 strong candidates is enough" | 3×3 matrix = 9 candidates minimum | HALT — Complete the matrix |
| "schema distance is subjective" | Schema distance has measurable criteria | HALT — Apply criteria |
| "5 headlines capture the idea" | 10 headlines explore different angles | HALT — Generate 5 more |
| "this idea is obviously best" | Selection requires scoring, not intuition | HALT — Score all candidates |
| "FSSIT is a guideline" | FSSIT is mandatory validation | HALT — Validate all 5 elements |
| "we can prove it later" | Defensibility must be confirmed NOW | HALT — Verify proof exists |

### Enforcement Protocol

```
DURING BIG IDEA EXECUTION:

IF you find yourself thinking ANY of the above rationalizations:
  1. STOP immediately
  2. OUTPUT: "🛑 RATIONALIZATION DETECTED: [which one]"
  3. Do NOT act on the rationalization
  4. Return to proper execution

This is not optional. Rationalizations are degradation signals.
```

---

## STRUCTURAL FIX 4: SCHEMA DISTANCE GATE

### The Problem
AI generates Big Ideas that are either too familiar (boring, "seen it before") or too alien (confusing, "what does that even mean").

### The Fix

**MANDATORY SCHEMA DISTANCE CALIBRATION:**

```yaml
schema_distance_validation:
  candidate: "[candidate name]"

  familiarity_score: [1-10]
    # 1 = Completely novel concept
    # 10 = Exact match to existing market claims

  alienness_score: [1-10]
    # 1 = Instantly comprehensible
    # 10 = Requires extensive explanation

  schema_distance: [calculated as (10 - familiarity) + alienness / 2]

  optimal_range: 4-8

  IF schema_distance < 4:
    HALT — "Big Idea too familiar. Market has seen this."
    ACTION: "Increase novelty or angle"

  IF schema_distance > 8:
    HALT — "Big Idea too alien. Market won't understand."
    ACTION: "Ground in familiar concepts"
```

### Schema Distance Examples

| Score | Example | Problem |
|-------|---------|---------|
| 2 | "Lose weight fast" | Too familiar, ignored |
| 4 | "The hidden fat trigger doctors miss" | Edge of familiar, intriguing |
| 6 | "The 3-second hormone reset" | Novel but grounded |
| 8 | "Quantum cellular reprogramming" | Edge of comprehension |
| 10 | "Mitochondrial phase-shifting" | Too alien, confusing |

---

## STRUCTURAL FIX 5: BIG-IDEA-SPECIFIC MC-CHECK

**BIGIDEA-MC-CHECK (Required at each layer transition):**

```yaml
BIGIDEA-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [1 | 2 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP — Cannot proceed without checkpoint file"

  candidate_verification:
    total_candidates: [number]
    if_under_9: "STOP — Need 3×3 matrix (9 candidates)"

    matrix_complete: [Y/N]
    if_no: "STOP — Complete the 3×3 matrix"

  schema_distance_verification:
    candidates_in_range: [number]
    candidates_too_familiar: [number]
    candidates_too_alien: [number]

    if_too_familiar > 3: "STOP — Too many familiar ideas"
    if_too_alien > 3: "STOP — Too many alien ideas"

  headline_verification:
    minimum_headlines_per_candidate: [number]
    if_under_10: "STOP — Generate 10 headlines per candidate"

  FSSIT_verification:
    fresh: [Y/N]
    specific: [Y/N]
    surprising: [Y/N]
    intriguing: [Y/N]
    truthful: [Y/N]
    if_any_no: "STOP — All 5 FSSIT elements required"

  defensibility_verification:
    proof_exists: [Y/N]
    defensibility_score: [number]
    if_score_under_7: "STOP — Big Idea cannot be defended"

  rationalization_check:
    am_i_accepting_too_few_candidates: [Y/N]
    am_i_skipping_schema_calibration: [Y/N]
    am_i_skipping_defensibility: [Y/N]
    if_any_yes: "🛑 HALT — Rationalization detected"

  result: [CONTINUE | HALT_CANDIDATES | HALT_SCHEMA | HALT_HEADLINES | HALT_FSSIT | HALT_DEFENSIBILITY]
```

---

## STRUCTURAL FIX 6: VOLUME VALIDATION GATE

### The Problem
AI selects "the best" Big Idea from too few options, missing potentially stronger candidates.

### The Fix

**MANDATORY VOLUME BEFORE SELECTION:**

```yaml
volume_validation:
  # BEFORE any selection can occur:

  candidates_generated: [number]
  minimum_required: 9

  IF candidates_generated < 9:
    HALT — "Cannot select from insufficient candidates"
    ACTION: "Return to generation, complete 3×3 matrix"

  headlines_generated: [total across all candidates]
  minimum_required: 90  # 10 per candidate × 9 candidates

  IF headlines_generated < 90:
    HALT — "Cannot evaluate without sufficient headline exploration"
    ACTION: "Generate remaining headlines"

  only_then: "Proceed to scoring and selection"
```

---

## IMPLEMENTATION CHECKLIST

```
LAYER 0 (FOUNDATION):
[ ] Deep research loader executed
[ ] Vault schema normalized
[ ] Specimen decomposer run
[ ] Input threshold validated
[ ] Component pool constructed
[ ] Deep research summarized
[ ] Foundation gate passed

LAYER 1 (INTELLIGENCE):
[ ] Pattern analyzer executed
[ ] Saturation mapper completed
[ ] Gap identifier run
[ ] Emotional mapper executed
[ ] Mechanism mapper run
[ ] Intelligence gate passed
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (GENERATION):
[ ] Candidate strategy selector run
[ ] Candidate architect executed (3×3 matrix)
[ ] 9 candidates generated
[ ] Headline generator run (10 per candidate)
[ ] Lead generator run (3 per top candidate)
[ ] Proof architect executed
[ ] Schema distance calibrated (4-8 range)
[ ] Generation gate passed
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
[ ] Volume validator passed (9 candidates, 90 headlines)
[ ] Quantification validator run
[ ] Defensibility validator executed (score >= 7.0)
[ ] Actionability validator run
[ ] Anti-slop validator passed
[ ] FSSIT validation complete (5/5)
[ ] Validation gate passed
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (PACKAGING):
[ ] Brief compiler executed
[ ] Downstream mapper run
[ ] Handoff packager completed

ON CONTEXT RESUME:
[ ] DO NOT trust summary claims about candidate counts
[ ] RE-READ checkpoint files
[ ] VERIFY 3×3 matrix from actual output
[ ] VERIFY schema distance was calibrated
[ ] VERIFY headlines per candidate (10 each)
[ ] If generation was abbreviated, RETURN to Layer 2
```

---

## KEY INSIGHT

> **"A Big Idea without volume is a guess. A Big Idea without schema calibration is either boring or confusing. A Big Idea without defensibility is a lawsuit waiting to happen."**

The Big Idea skill has 4 layers for a reason:
- Layer 1: UNDERSTAND the market landscape and gaps
- Layer 2: GENERATE volume (9 candidates, 10 headlines each)
- Layer 3: VALIDATE defensibility, FSSIT, and schema distance
- Layer 4: Package selected Big Idea for downstream

Skipping volume means selecting from too few options.

---

## STRUCTURAL FIX 7: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/06-big-idea/checkpoints/ARENA_COMPLETE.yaml
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
[project]/06-big-idea/checkpoints/LAYER_1_COMPLETE.yaml
[project]/06-big-idea/checkpoints/LAYER_2_COMPLETE.yaml
[project]/06-big-idea/checkpoints/ARENA_COMPLETE.yaml    ← NEW (MANDATORY)
[project]/06-big-idea/checkpoints/LAYER_3_COMPLETE.yaml
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
