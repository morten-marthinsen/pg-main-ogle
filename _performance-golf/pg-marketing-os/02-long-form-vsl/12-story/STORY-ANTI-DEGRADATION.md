# STORY-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
**Purpose:** STRUCTURAL enforcement to prevent story skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: STORY-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Reveal mechanism before Cry for Help moment, skip Carlton compliance checks, or treat beat order as flexible.
```

**Write this declaration to your first output file before executing any microskill.**

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

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/12-story/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/12-story/checkpoints/LAYER_2_COMPLETE.yaml
[project]/12-story/checkpoints/ARENA_COMPLETE.yaml
```

**Full Checkpoint Progression:**
```
[project]/12-story/checkpoints/LAYER_1_COMPLETE.yaml
[project]/12-story/checkpoints/LAYER_2_COMPLETE.yaml
[project]/12-story/checkpoints/ARENA_COMPLETE.yaml
[project]/12-story/checkpoints/LAYER_3_COMPLETE.yaml
[project]/12-story/HUMAN_SELECTION.yaml  # BLOCKING
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
PRE-EXECUTION (Fixes 8, 11):
[ ] STORY-ANTI-DEGRADATION.md read (THIS FILE)
[ ] STORY-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 10)
[ ] Input files validated (lead-package, campaign-brief-package, root-cause-package, mechanism-package, structure-package, specimens)

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

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

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
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 2-round + audience evaluation competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/12-story/checkpoints/ARENA_COMPLETE.yaml
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
skill: "12-story"
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
[project]/12-story/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
├── execution-log.md          # Detailed execution record
├── story-package.json        # PRIMARY OUTPUT
└── STORY-SUMMARY.md          # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "12-story"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  lead_package: [Y/N]
  campaign_brief_package: [Y/N]
  root_cause_package: [Y/N]
  mechanism_package: [Y/N]
  structure_package: [Y/N]
  specimens_loaded: [Y/N]
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

BEFORE writing story-package.json or STORY-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/story-package.json (root — from failed attempts)
     - [project]/12-story/story-package.json (correct location)
     - [project]/outputs/story-package.json (wrong path)
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

**Session startup protocol — BEFORE any story execution:**

```
SESSION STARTUP:
  1. READ this file (STORY-ANTI-DEGRADATION.md) — MANDATORY
  2. READ STORY-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin story execution without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Added:** 2026-02-12
**Reference:** ~system/SYSTEM-CORE.md § MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-vault-intelligence-loader | layer-0-outputs/0.2-vault-intelligence-loader.md | 1KB |
| 0 | 0.2.5-specimen-decomposer | layer-0-outputs/0.2.5-specimen-decomposer.md | 1KB |
| 0 | 0.2.6-curated-gold-specimens | layer-0-outputs/0.2.6-specimen-loading.md | 2KB |
| 0 | 0.3-teachings-loader | layer-0-outputs/0.3-teachings-loader.md | 1KB |
| 0 | 0.4-input-validator | layer-0-outputs/0.4-input-validator.md | 1KB |
| 1 | 1.1-story-type-classifier | layer-1-outputs/1.1-story-type-classifier.md | 3KB |
| 1 | 1.2-story-beat-mapper | layer-1-outputs/1.2-story-beat-mapper.md | 3KB |
| 1 | 1.3-character-architect | layer-1-outputs/1.3-character-architect.md | 3KB |
| 1 | 1.4-emotional-arc-designer | layer-1-outputs/1.4-emotional-arc-designer.md | 3KB |
| 2 | 2.1-setup-context | layer-2-outputs/2.1-setup-context.md | 5KB |
| 2 | 2.2-discovery-sequence | layer-2-outputs/2.2-discovery-sequence.md | 5KB |
| 2 | 2.3-mechanism-revelation | layer-2-outputs/2.3-mechanism-revelation.md | 5KB |
| 2 | 2.4-transformation-payoff | layer-2-outputs/2.4-transformation-payoff.md | 5KB |
| 3 | 3.1-sensory-detail-calibrator | layer-3-outputs/3.1-sensory-detail-calibrator.md | 3KB |
| 3 | 3.2-suspense-pacing | layer-3-outputs/3.2-suspense-pacing.md | 3KB |
| 3 | 3.3-proof-integration | layer-3-outputs/3.3-proof-integration.md | 3KB |
| 3 | 3.4-carlton-compliance | layer-3-outputs/3.4-carlton-compliance.md | 3KB |
| 4 | 4.1-story-function-validation | layer-4-outputs/4.1-story-function-validation.md | 3KB |
| 4 | 4.2-mechanism-story-alignment | layer-4-outputs/4.2-mechanism-story-alignment.md | 3KB |
| 4 | 4.3-anti-slop-validation | layer-4-outputs/4.3-anti-slop-validation.md | 3KB |
| 4 | 4.4-vault-pattern-comparison | layer-4-outputs/4.4-vault-pattern-comparison.md | 3KB |
| 4 | 4.5-final-story-assembly | layer-4-outputs/4.5-final-story-assembly.md | 5KB |

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
| 2.0 | 2026-02-14 | STRUCTURAL ENFORCEMENT PROPAGATION: Added 4 structural fixes from Skills 01-04 propagation pattern. Fix 8: Mandatory project infrastructure. Fix 9: Binary gate enforcement with forbidden statuses. Fix 10: Stale artifact cleanup. Fix 11: Anti-degradation mandatory read. Implementation checklist expanded with PRE-EXECUTION and POST-EXECUTION sections. |
| 1.2 | 2026-02-12 | PER-MICROSKILL OUTPUT PROTOCOL: Added v3.2 per-microskill output table with 23 required output files across 5 layers. Layer gate enhancement, execution log enhancement, forbidden behaviors for per-microskill compliance. |
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
