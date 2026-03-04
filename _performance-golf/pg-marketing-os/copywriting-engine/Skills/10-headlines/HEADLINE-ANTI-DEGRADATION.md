# HEADLINE-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent headline skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates headlines WITHOUT loading type-matched specimens
- AI produces fewer than 5 candidates scoring >= 6.0
- AI selects headline without human approval
- AI skips Big Idea integration
- AI produces headlines without lead connection mapping
- AI accepts top candidate below 7.5 threshold

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/10-headlines/checkpoints/LAYER_1_COMPLETE.yaml
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/10-headlines/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/10-headlines/checkpoints/LAYER_2_COMPLETE.yaml
[project]/10-headlines/checkpoints/ARENA_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless BOTH exist:**
```
[project]/10-headlines/checkpoints/LAYER_3_COMPLETE.yaml
[project]/10-headlines/HUMAN_SELECTION.yaml  # Records human choice
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "10-headlines"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  specimens_loaded:
    required: true
    type_matched: true
    loaded_verbatim: true
  candidates_above_6:
    required: 5
    actual: [number]
  top_candidate_score:
    minimum: 7.5
    actual: [number]
  human_selection:
    required: true
    received: [Y/N]

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
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **Candidates scoring >= 6.0** | 5 | HALT — Generate more |
| **Top candidate score** | 7.5 | HALT — Refine candidates |
| **Human selection** | BLOCKING | HALT — Cannot package without |
| **Lead connection mapped** | Yes | HALT — Map lead connection |
| **Arena personas** | 6/6 | HALT — All personas generate |

### Specimen Loading Protocol

**BEFORE ANY HEADLINE GENERATION:**

```yaml
specimen_protocol:
  step_1: "READ 0.2.6-curated-gold-specimens.md"
  step_2: "IDENTIFY pattern type from Layer 1 classification"
  step_3: "LOAD verbatim specimens matching pattern type"
  step_4: "HOLD in active context during generation"

  type_to_specimen_map:
    curiosity: [Type-1, Type-7, Type-9]
    benefit: [Type-8, Type-10, Type-13]
    question: [Type-6, Type-7, Type-12, Type-13]
    warning: [Type-5, Type-7]
    story_hook: [Type-3, Type-1, Type-10]
    contrarian: [Type-2, Type-11, Type-4]

  IF specimens_not_loaded:
    HALT — "Cannot generate without specimen injection"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "4 strong candidates is enough" | Minimum 5 scoring >= 6.0 | HALT — Generate more |
| "7.0 is good enough for top" | 7.5 is the minimum for top candidate | HALT — Refine |
| "I can infer human preference" | Human selection is BLOCKING | HALT — Get selection |
| "Arena is optional" | All 6 personas must generate | HALT — Complete Arena |
| "lead mapping can happen later" | Lead mapping is part of headline skill | HALT — Map now |

---

## STRUCTURAL FIX 4: HUMAN SELECTION GATE

### The Problem
AI selects "best" headline without human input, missing preference signals.

### The Fix

**BLOCKING Human Selection:**

```yaml
human_selection_gate:
  candidates_presented: [number]
  scores_shown: [Y/N]
  rationale_provided: [Y/N]

  selection_received: [Y/N]
  selected_headline: "[text]"
  selection_timestamp: "[ISO 8601]"

  IF selection_received == N:
    HALT — "Cannot proceed to packaging without human selection"
    CANNOT: Create headline-package.json
    CANNOT: Create HEADLINE-SUMMARY.md
    MUST: Present candidates and await selection
```

### HUMAN_SELECTION.yaml Format

```yaml
# Created ONLY when human makes selection
headline_selected: "[exact headline text]"
selected_by: "human"
timestamp: "[ISO 8601]"
alternatives_presented: [number]
selection_rationale: "[if provided]"
```

---

## STRUCTURAL FIX 5: HEADLINE-SPECIFIC MC-CHECK

```yaml
HEADLINE-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [1 | 2 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP — Cannot proceed without checkpoint file"

  specimen_verification:
    specimens_loaded: [Y/N]
    loaded_verbatim: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens verbatim"

  candidate_verification:
    total_candidates: [number]
    candidates_above_6: [number]
    if_under_5: "STOP — Need 5+ candidates scoring >= 6.0"

    top_score: [number]
    if_under_7.5: "STOP — Top candidate must score >= 7.5"

  arena_verification:
    personas_completed: [number]
    if_under_6: "STOP — All 6 Arena personas must generate"

  human_selection_verification:
    at_layer_4: [Y/N]
    selection_received: [Y/N]
    if_at_layer_4_and_no_selection: "STOP — Human selection is BLOCKING"

  rationalization_check:
    am_i_skipping_specimens: [Y/N]
    am_i_inferring_selection: [Y/N]
    am_i_accepting_low_scores: [Y/N]
    if_any_yes: "🛑 HALT — Rationalization detected"

  result: [CONTINUE | HALT_SPECIMENS | HALT_CANDIDATES | HALT_ARENA | HALT_SELECTION]
```

---

## IMPLEMENTATION CHECKLIST

```
LAYER 0 (FOUNDATION):
[ ] Upstream packages loaded
[ ] Vault intelligence loaded
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Specimens loaded VERBATIM (not summarized)
[ ] Input validated

LAYER 1 (ARCHITECTURE):
[ ] Big Idea distilled
[ ] Pattern type selected
[ ] Curiosity architect executed
[ ] Schema distance calibrated
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (GENERATION):
[ ] Type-matched specimens in active context
[ ] All 6 Arena personas generate
[ ] Synthesizer creates hybrids
[ ] Minimum candidates generated
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
[ ] Candidates scored
[ ] 5+ candidates score >= 6.0
[ ] Top candidate scores >= 7.5
[ ] Lead connection mapped
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (SELECTION):
[ ] Candidates presented to human
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created
[ ] headline-package.json created
[ ] HEADLINE-SUMMARY.md created

ON CONTEXT RESUME:
[ ] VERIFY specimens were loaded (check execution log)
[ ] VERIFY candidate counts from actual output
[ ] VERIFY human selection exists (HUMAN_SELECTION.yaml)
[ ] If specimens skipped, RETURN to Layer 0
```

---

## KEY INSIGHT

> **"Headlines without specimen injection lack elite pattern DNA. Headlines without human selection lack preference calibration."**

---

## STRUCTURAL FIX 6: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/10-headlines/checkpoints/ARENA_COMPLETE.yaml
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
[project]/10-headlines/checkpoints/LAYER_1_COMPLETE.yaml
[project]/10-headlines/checkpoints/LAYER_2_COMPLETE.yaml
[project]/10-headlines/checkpoints/ARENA_COMPLETE.yaml    <- NEW (MANDATORY)
[project]/10-headlines/checkpoints/LAYER_3_COMPLETE.yaml
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
