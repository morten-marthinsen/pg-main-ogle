# HEADLINE-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
**Purpose:** STRUCTURAL enforcement to prevent headline skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: HEADLINE-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Skip Arena rounds, synthesize headlines from summaries instead of specimens, or reduce candidate count below minimums.
```

**Write this declaration to your first output file before executing any microskill.**

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
PRE-EXECUTION (Fixes 7, 10):
[ ] HEADLINE-ANTI-DEGRADATION.md read (THIS FILE)
[ ] HEADLINE-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 9)
[ ] Input files validated (campaign-brief-package, big-idea-package, structure-package, specimens)

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

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

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
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 2-round + audience evaluation competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/10-headlines/checkpoints/ARENA_COMPLETE.yaml
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
skill: "10-headlines"
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

## STRUCTURAL FIX 7: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which layers completed and what candidates were selected is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/10-headlines/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
├── execution-log.md          # Detailed execution record
├── headline-package.json     # PRIMARY OUTPUT
└── HEADLINE-SUMMARY.md       # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "10-headlines"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  campaign_brief_package: [Y/N]
  big_idea_package: [Y/N]
  structure_package: [Y/N]
  specimens_loaded: [Y/N]
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 8: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

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

## STRUCTURAL FIX 9: STALE ARTIFACT CLEANUP

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing headline-package.json or HEADLINE-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/headline-package.json (root — from failed attempts)
     - [project]/10-headlines/headline-package.json (correct location)
     - [project]/outputs/headline-package.json (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 10: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol — BEFORE any headline execution:**

```
SESSION STARTUP:
  1. READ this file (HEADLINE-ANTI-DEGRADATION.md) — MANDATORY
  2. READ HEADLINE-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin headline execution without reading this anti-degradation file first.
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
| 0 | 0.2.6-curated-gold-specimens | layer-0-outputs/0.2.6-specimen-loading.md | 2KB |
| 0 | 0.3-teachings-loader | layer-0-outputs/0.3-teachings-loader.md | 1KB |
| 0 | 0.4-input-validator | layer-0-outputs/0.4-input-validator.md | 1KB |
| 1 | 1.1-big-idea-distiller | layer-1-outputs/1.1-big-idea-distiller.md | 3KB |
| 1 | 1.2-pattern-type-selector | layer-1-outputs/1.2-pattern-type-selector.md | 3KB |
| 1 | 1.3-curiosity-architect | layer-1-outputs/1.3-curiosity-architect.md | 3KB |
| 1 | 1.4-schema-distance-calibrator | layer-1-outputs/1.4-schema-distance-calibrator.md | 3KB |
| 2 | 2.1-formula-based-generator | layer-2-outputs/2.1-formula-based-generator.md | 5KB |
| 2 | 2.2-vault-inspired-generator | layer-2-outputs/2.2-vault-inspired-generator.md | 5KB |
| 2 | 2.3-schema-violation-generator | layer-2-outputs/2.3-schema-violation-generator.md | 5KB |
| 2 | 2.4-format-adapter | layer-2-outputs/2.4-format-adapter.md | 3KB |
| 2 | 2.5-candidate-scorer | layer-2-outputs/2.5-candidate-scorer.md | 3KB |
| 3 | 3.1-power-word-injector | layer-3-outputs/3.1-power-word-injector.md | 3KB |
| 3 | 3.2-specificity-enhancer | layer-3-outputs/3.2-specificity-enhancer.md | 3KB |
| 3 | 3.3-subheadline-generator | layer-3-outputs/3.3-subheadline-generator.md | 3KB |
| 3 | 3.4-lead-connection-mapper | layer-3-outputs/3.4-lead-connection-mapper.md | 3KB |
| 3 | 3.5-final-scorer | layer-3-outputs/3.5-final-scorer.md | 3KB |
| 4 | 4.1-presentation-formatter | layer-4-outputs/4.1-presentation-formatter.md | 3KB |
| 4 | 4.2-selection-processor | layer-4-outputs/4.2-selection-processor.md | 2KB |
| 4 | 4.3-package-assembler | layer-4-outputs/4.3-package-assembler.md | 5KB |
| 4 | 4.4-lead-handoff-preparer | layer-4-outputs/4.4-lead-handoff-preparer.md | 3KB |

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

## STRUCTURAL FIX 11: CATEGORY SPREAD + DIVERSITY ENFORCEMENT

### The Problem
Headline generation tends to cluster around one approach — typically formula-based curiosity headlines. When 8 of 12 candidates use the same archetype, the Arena scores variations of one pattern instead of evaluating genuinely different approaches.

### The Fix

**Reference:** `~system/protocols/BRAINSTORM-DIVERSITY-PROTOCOL.md`

**1. Minimum Category Spread:**

Headline candidates MUST cover 4+ archetypes:

| Archetype | Source Microskill | What It Means |
|-----------|------------------|--------------|
| **Formula-based** | 2.1 | Proven formula patterns (How-to, Number, Question, etc.) |
| **Vault-inspired** | 2.2 | Modeled on specific gold specimen patterns |
| **Schema-violation** | 2.3 | Deliberately breaking category expectations |
| **Format-adapted** | 2.4 | Adapted for specific formats (email, social, VSL) |

```yaml
category_spread_check:
  total_candidates: [number]
  archetypes_represented: [number]
  IF archetypes_represented < 4:
    HALT — "Need candidates from all 4 archetypes. Missing: [list]"
```

**2. Similarity De-duplication:**

After generation, before Arena entry:
- Group candidates by dominant frame (emotional + structural)
- If any group contains >40% of total candidates: flag as "cluster-heavy"
- When cluster-heavy: generate 3-5 additional candidates OUTSIDE the overrepresented frame
- This is additive — does not delete existing candidates

**3. Specimen-Anchored Divergence:**

Each generation pass (2.1-2.4) already anchors to different approaches. Additionally:
- Each pass must use a DIFFERENT specimen anchor from the vault
- Mix classic and modern specimens
- Mix verticals where available

**MC-CHECK Addition:**

Add to HEADLINE-MC-CHECK:

```yaml
diversity_verification:
  archetypes_represented: [number]
  if_under_4: "HALT — Need all 4 headline archetypes"
  cluster_heavy_detected: [Y/N]
  if_yes_additional_generated: [Y/N]
  if_cluster_heavy_and_no_additional: "HALT — Generate 3-5 candidates outside overrepresented frame"
  specimen_anchors_diverse: [Y/N]
  if_no: "HALT — Each generation pass needs different specimen anchor"
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-03-06 | CATEGORY SPREAD + DIVERSITY: Added Structural Fix 11 — 4+ headline archetypes required, 40% cluster threshold triggers additive generation, specimen-anchored divergence. MC-CHECK enhanced with diversity_verification. Reference: `~system/protocols/BRAINSTORM-DIVERSITY-PROTOCOL.md`. |
| 2.0 | 2026-02-14 | STRUCTURAL ENFORCEMENT PROPAGATION: Added 4 structural fixes from Skills 01-04 propagation pattern. Fix 7: Mandatory project infrastructure. Fix 8: Binary gate enforcement with forbidden statuses. Fix 9: Stale artifact cleanup. Fix 10: Anti-degradation mandatory read. Implementation checklist expanded with PRE-EXECUTION and POST-EXECUTION sections. |
| 1.2 | 2026-02-12 | PER-MICROSKILL OUTPUT PROTOCOL: Added v3.2 per-microskill output table with 23 required output files across 5 layers. Layer gate enhancement, execution log enhancement, forbidden behaviors for per-microskill compliance. |
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
