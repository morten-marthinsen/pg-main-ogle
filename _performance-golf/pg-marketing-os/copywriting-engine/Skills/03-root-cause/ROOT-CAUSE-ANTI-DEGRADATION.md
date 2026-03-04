# ROOT-CAUSE-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent root cause skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI skips derivation layer and synthesizes root cause from memory
- AI produces single root cause instead of required 3+ candidates
- AI skips expression variants (simple reframe, named syndrome, villain personification, metaphor)
- AI accepts root cause that internalizes blame to the reader
- AI proceeds without truth validation scoring

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/03-root-cause/checkpoints/LAYER_1_COMPLETE.yaml
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/03-root-cause/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/03-root-cause/checkpoints/LAYER_2_COMPLETE.yaml
[project]/03-root-cause/checkpoints/ARENA_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/03-root-cause/checkpoints/LAYER_3_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "03-root-cause"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  root_cause_candidates:
    required: 3
    actual: [number]
    verified: true
  expression_variants_per_candidate:
    required: 3
    actual: [number]
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
| **Root cause candidates** | 3 | HALT — Generate more candidates |
| **Expression variants per candidate** | 3 | HALT — Create more variants |
| **Truth validation score** | 6.0 | HALT — Candidate fails validation |
| **Mechanism alignment score** | 6.0 | HALT — Root cause doesn't support mechanism |
| **Proof availability score** | 5.0 | HALT — Insufficient proof for root cause |
| **Three-part structure** | 3/3 | HALT — Must have what_they_think, what_real, why_nothing_worked |

### Three-Part Structure Requirement

Every root cause output MUST contain:

```yaml
three_part_structure:
  what_they_think: "[The false belief the prospect holds]"
  what_real: "[The counter-intuitive root cause]"
  why_nothing_worked: "[Why past solutions failed - traced to addressing symptoms]"
```

**IF ANY PART IS MISSING → ROOT CAUSE IS INCOMPLETE**

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

**FORBIDDEN RATIONALIZATIONS — These statements are INVALID and trigger immediate HALT:**

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "obvious from research" | Root cause must be DERIVED through analysis, not assumed | HALT — Execute derivation skills |
| "implied from context" | Explicit derivation required | HALT — Execute derivation skills |
| "one strong candidate is enough" | Minimum 3 candidates required for comparison | HALT — Generate more candidates |
| "expression variants are optional" | Variants test different communication approaches | HALT — Create variants |
| "truth score is subjective" | Score must be calculated per validation rubric | HALT — Execute validation |
| "the reader caused this" | Root cause MUST be EXTERNAL (Rule #1) | HALT — Reframe externally |
| "I can synthesize this" | Must read and execute microskills | HALT — Read microskill files |

### Enforcement Protocol

```
DURING ROOT CAUSE EXECUTION:

IF you find yourself thinking ANY of the above rationalizations:
  1. STOP immediately
  2. OUTPUT: "🛑 RATIONALIZATION DETECTED: [which one]"
  3. Do NOT act on the rationalization
  4. Return to proper execution

This is not optional. Rationalizations are degradation signals.
```

---

## STRUCTURAL FIX 4: BLAME EXTERNALIZATION GATE

### The Problem
Root causes that blame the reader ("you weren't consistent," "you gave up too soon") fail Rule #1 and destroy rapport.

### The Fix

**MANDATORY EXTERNALIZATION CHECK:**

```yaml
blame_externalization_check:
  root_cause_blames_reader: [Y/N]
  root_cause_blames_external_factor: [Y/N]
  villain_is_external_entity: [Y/N]

  IF root_cause_blames_reader == Y:
    HALT — "Root cause violates Rule #1: Must be EXTERNAL"
    ACTION: Reframe to external cause

  IF villain_is_external_entity == N:
    HALT — "Villain must be external entity (industry, ingredient, company, system)"
    ACTION: Identify external villain
```

**Valid External Villains:**
- An industry (Big Pharma, fitness industry)
- A specific ingredient or compound
- A company or corporation
- A system or institution
- Misinformation sources
- Hidden environmental factors

**Invalid Internal "Villains":**
- The reader's willpower
- The reader's consistency
- The reader's past choices
- The reader's genetics (unless reframed as external factor acting ON them)

---

## STRUCTURAL FIX 5: ROOT-CAUSE-SPECIFIC MC-CHECK

**RC-MC-CHECK (Required at each layer transition):**

```yaml
RC-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [1 | 2 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP — Cannot proceed without checkpoint file"

  candidate_verification:
    root_cause_candidates_count: [number]
    if_under_3: "STOP — Minimum 3 candidates required"

    expression_variants_per_candidate: [number]
    if_under_3: "STOP — Minimum 3 variants per candidate required"

  structure_verification:
    what_they_think_populated: [Y/N]
    what_real_populated: [Y/N]
    why_nothing_worked_populated: [Y/N]
    if_any_no: "STOP — Three-part structure incomplete"

  blame_check:
    root_cause_is_external: [Y/N]
    if_no: "STOP — Rule #1 violation: Root cause must be external"

  rationalization_check:
    am_i_synthesizing_from_memory: [Y/N]
    am_i_skipping_derivation: [Y/N]
    am_i_thinking_one_candidate_enough: [Y/N]
    if_any_yes: "🛑 HALT — Rationalization detected"

  result: [CONTINUE | HALT_THRESHOLD | HALT_STRUCTURE | HALT_BLAME | HALT_RATIONALIZATION]
```

---

## STRUCTURAL FIX 6: 10 CRITICAL RULES VALIDATION

Every root cause MUST pass validation against these 10 rules:

| Rule | Requirement | Validation Question |
|------|-------------|---------------------|
| 1 | Root cause is EXTERNAL | Does it blame something outside the reader? |
| 2 | Explains ALL past failures | Does it account for why everything else failed? |
| 3 | More specific than false belief | Is it more concrete than what they currently think? |
| 4 | Creates clear path to solution | Does it naturally lead to the mechanism? |
| 5 | Pairs with villain | Is there a specific external villain? |
| 6 | Counter-intuitive | Would it surprise the prospect? |
| 7 | Woven throughout copy | Can it be referenced repeatedly? |
| 8 | Has memorable anchor phrase | Is there a quotable phrase? |
| 9 | Authority established before reveal | Is credibility set up first? |
| 10 | Kills competitor solutions | Does it invalidate other approaches? |

**Validation Gate:**
```
ALL 10 RULES MUST PASS

IF any rule fails:
  HALT — Return to Layer 2 for revision
  Document which rule failed and why
```

---

## IMPLEMENTATION CHECKLIST

```
LAYER 1 (SURFACE MAPPING):
[ ] Research patterns analyzed
[ ] Symptom convergence completed
[ ] False beliefs identified
[ ] Hidden layers discovered
[ ] Mechanism constraint checked
[ ] Proof constraint checked
[ ] Derivation synthesized
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (ROOT DISCOVERY):
[ ] Simple reframe created
[ ] Named syndrome developed
[ ] Villain personification completed
[ ] Metaphor construction done
[ ] Dual problem framing (if applicable)
[ ] Niche expression matching
[ ] Expression synthesis
[ ] Minimum 3 candidates generated
[ ] Minimum 3 variants per candidate
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
[ ] Truth validation (score >= 6.0)
[ ] Mechanism alignment (score >= 6.0)
[ ] Proof availability (score >= 5.0)
[ ] Audience resonance checked
[ ] Validation synthesis complete
[ ] All 10 critical rules pass
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (PACKAGING):
[ ] Three-part structure complete
[ ] Copy block formatted
[ ] Downstream handoff prepared
[ ] Integration guidance documented
[ ] Output synthesis complete

ON CONTEXT RESUME:
[ ] DO NOT trust summary claims about layer completion
[ ] RE-READ checkpoint files
[ ] VERIFY candidate counts from actual output
[ ] If derivation was skipped, RETURN to Layer 1
```

---

## KEY INSIGHT

> **"Root cause is DERIVED, not assumed. External, not internal. Counter-intuitive, not obvious."**

The Root Cause skill has 4 layers for a reason:
- Layer 1: Map the surface (what they think, what they've tried)
- Layer 2: DISCOVER the real root cause through multiple approaches
- Layer 3: VALIDATE the root cause meets all 10 rules
- Layer 4: Package for downstream skills

Skipping derivation means producing generic root causes that don't shift worldview.

---

## STRUCTURAL FIX 7: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/03-root-cause/checkpoints/ARENA_COMPLETE.yaml
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
[project]/03-root-cause/checkpoints/LAYER_1_COMPLETE.yaml
[project]/03-root-cause/checkpoints/LAYER_2_COMPLETE.yaml
[project]/03-root-cause/checkpoints/ARENA_COMPLETE.yaml    ← NEW (MANDATORY)
[project]/03-root-cause/checkpoints/LAYER_3_COMPLETE.yaml
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
