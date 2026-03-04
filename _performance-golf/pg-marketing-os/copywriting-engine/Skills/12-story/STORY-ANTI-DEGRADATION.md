# STORY-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent story skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates stories WITHOUT loading type-matched specimens
- AI skips beat structure (required sequence of story beats)
- AI reveals mechanism BEFORE "Cry for Help" moment (sequence violation)
- AI skips Carlton compliance check (9 items)
- AI produces stories without mechanism-story alignment validation
- AI selects story without human approval

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

```
[project]/12-story/checkpoints/LAYER_1_COMPLETE.yaml
[project]/12-story/checkpoints/LAYER_2_COMPLETE.yaml
[project]/12-story/checkpoints/ARENA_COMPLETE.yaml    # Arena Layer (2.5) — MANDATORY
[project]/12-story/checkpoints/LAYER_3_COMPLETE.yaml
[project]/12-story/HUMAN_SELECTION.yaml  # BLOCKING
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/12-story/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/12-story/checkpoints/LAYER_2_COMPLETE.yaml
[project]/12-story/checkpoints/ARENA_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "12-story"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  specimens_loaded: true
  story_type_classified: "[type]"
  beat_sequence_complete: true
  carlton_compliance: 9/9
  mechanism_alignment_score: [number >= 7.0]
  human_selection: [received | pending]
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **Beat sequence** | All required beats | HALT — Complete sequence |
| **Carlton compliance** | 9/9 | HALT — Fix violations |
| **Mechanism-story alignment** | 7.0 | HALT — Improve alignment |
| **Arena personas** | 6/6 | HALT — All generate |
| **Human selection** | BLOCKING | HALT — Get selection |

### Story Beat Sequences by Type

**Standard Discovery:**
```
Trip → Yoda → Cry for Help → Reveal → Verification → Root Cause
```

**Accidental Discovery:**
```
Accident → Yoda → Reveal → Verification → Root Cause
```

**Straight-to-Expert:**
```
Finding Yoda → Trip/New Reality → Reveals → Verification → Root Cause
```

**CRITICAL: Mechanism reveal CANNOT happen before Cry for Help moment.**

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "beat order is flexible" | Beat sequence is FIXED per story type | HALT — Follow sequence |
| "mechanism can appear earlier" | Reveal MUST follow Cry for Help | HALT — Resequence |
| "Carlton compliance is a guideline" | 9/9 compliance required | HALT — Fix violations |
| "7.0 alignment is approximate" | 7.0 is NON-NEGOTIABLE minimum | HALT — Improve |
| "Arena is optional for stories" | All 6 personas required | HALT — Complete Arena |

---

## STRUCTURAL FIX 4: BEAT SEQUENCE GATE

### The Problem
AI reveals mechanism too early or skips required beats.

### The Fix

**BEAT SEQUENCE VALIDATION:**

```yaml
beat_sequence_validation:
  story_type: "[standard_discovery | accidental_discovery | straight_to_expert]"

  required_beats:
    # Varies by story type
    - beat_1: "[name]"
      present: [Y/N]
      word_count: [range]
    - beat_2: "[name]"
      present: [Y/N]
      word_count: [range]
    # Continue for all beats

  cry_for_help_position: [beat number]
  mechanism_reveal_position: [beat number]

  sequence_validation:
    IF mechanism_reveal_position <= cry_for_help_position:
      HALT — "SEQUENCE VIOLATION: Mechanism reveal must come AFTER Cry for Help"

  all_beats_present: [Y/N]
  IF all_beats_present == N:
    HALT — "All required beats must be present"
```

---

## STRUCTURAL FIX 5: CARLTON COMPLIANCE GATE

### The 9 Carlton Rules

| # | Rule | Validation |
|---|------|------------|
| 1 | Reader knows where story is going | Direction clear? |
| 2 | Vulnerability moment earned | Not forced? |
| 3 | Specific sensory details | Vivid imagery? |
| 4 | Emotional stakes established | Reader cares? |
| 5 | Conflict/obstacle present | Tension exists? |
| 6 | Transformation believable | Gradual shift? |
| 7 | Voice consistent throughout | No breaks? |
| 8 | Mechanism integrated naturally | Not shoehorned? |
| 9 | Ending earns the sale | Setup complete? |

```yaml
carlton_compliance:
  rule_1_direction: [PASS | FAIL]
  rule_2_vulnerability: [PASS | FAIL]
  rule_3_sensory: [PASS | FAIL]
  rule_4_stakes: [PASS | FAIL]
  rule_5_conflict: [PASS | FAIL]
  rule_6_transformation: [PASS | FAIL]
  rule_7_voice: [PASS | FAIL]
  rule_8_mechanism: [PASS | FAIL]
  rule_9_ending: [PASS | FAIL]

  total_passing: [number]
  required: 9

  IF total_passing < 9:
    HALT — "Carlton compliance requires 9/9"
    failures: [list failed rules]
```

---

## STRUCTURAL FIX 6: STORY-SPECIFIC MC-CHECK

```yaml
STORY-MC-CHECK:
  timestamp: "[current time]"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched_to_story_type: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  beat_verification:
    all_beats_present: [Y/N]
    sequence_correct: [Y/N]
    mechanism_after_cry_for_help: [Y/N]
    if_any_no: "STOP — Fix beat sequence"

  carlton_verification:
    rules_passing: [number]
    if_under_9: "STOP — Carlton compliance 9/9 required"

  alignment_verification:
    mechanism_story_score: [number]
    if_under_7: "STOP — Alignment minimum 7.0"

  human_selection_verification:
    selection_received: [Y/N]
    if_at_packaging_and_no: "STOP — Human selection BLOCKING"

  result: [CONTINUE | HALT_SPECIMENS | HALT_BEATS | HALT_CARLTON | HALT_ALIGNMENT | HALT_SELECTION]
```

---

## IMPLEMENTATION CHECKLIST

```
LAYER 0 (FOUNDATION):
[ ] Upstream packages loaded
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Story type identified from context
[ ] Type-matched specimens loaded VERBATIM

LAYER 1 (ARCHITECTURE):
[ ] Story type classified with vault reference
[ ] Story beat mapper executed
[ ] Character architect run
[ ] Emotional arc designed
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (CONSTRUCTION):
[ ] Setup context builder run
[ ] Discovery sequence builder run
[ ] Mechanism revelation constructor executed
[ ] Validation section builder run
[ ] All beats in correct sequence
[ ] Mechanism reveal AFTER Cry for Help
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
[ ] Carlton compliance checked (9/9)
[ ] Mechanism-story alignment validated (>= 7.0)
[ ] All 6 Arena personas generate
[ ] Anti-slop validation passed
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION & SELECTION):
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created
[ ] story-package.json created
[ ] STORY-SUMMARY.md created

ON CONTEXT RESUME:
[ ] VERIFY specimens loaded
[ ] VERIFY beat sequence correct
[ ] VERIFY Carlton 9/9
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"Story without beat structure is rambling. Story revealing mechanism early kills the arc. Story without Carlton compliance feels amateur."**

---

## STRUCTURAL FIX 7: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/12-story/checkpoints/ARENA_COMPLETE.yaml
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
[project]/12-story/checkpoints/LAYER_1_COMPLETE.yaml
[project]/12-story/checkpoints/LAYER_2_COMPLETE.yaml
[project]/12-story/checkpoints/ARENA_COMPLETE.yaml    <- NEW (MANDATORY)
[project]/12-story/checkpoints/LAYER_3_COMPLETE.yaml
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
