# A06-AD-ARENA-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-22
**Purpose:** STRUCTURAL enforcement to prevent Ad Arena skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md, ~system/SYSTEM-CORE.md, and AD-ENGINE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: A06-AD-ARENA-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Run fewer than 2 Arena rounds + audience evaluation ("concepts look strong enough after Round 1"), evaluate hooks/scripts/visuals separately instead of as atomic integrated units, or run Arena without loading verbatim ad specimens for each persona (minimum 15 per persona).
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI evaluates hooks, scripts, and visuals SEPARATELY instead of as atomic integrated units
- AI runs Arena without loading verbatim ad specimens for each persona
- AI runs fewer than 2 rounds ("concepts look strong enough after Round 1")
- AI uses self-critique instead of dedicated adversarial Critic with blind evaluation
- AI creates consensus across personas instead of maintaining adversarial diversity
- AI inflates scores in later rounds due to familiarity instead of genuine quality improvement
- AI evaluates ads against generic criteria without platform-specific nativeness scoring
- AI skips the Synthesizer phase, presenting only the 7 pure persona outputs
- AI proceeds to copy production without human selection (BLOCKING gate violation)
- AI generates hybrid concepts by averaging scores instead of synthesizing best elements
- AI presents concepts below minimum thresholds (8.0 weighted, 7.0 scroll-stop, 6.5 platform native)
- AI uses persona descriptions without specimen loading (descriptive personas = protocol violation)

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/A06-ad-arena/checkpoints/LAYER_0_COMPLETE.yaml
```

**Arena Round 1 CANNOT execute unless this file exists:**
```
[project]/A06-ad-arena/checkpoints/LAYER_1_COMPLETE.yaml
```

**Arena Round 2 CANNOT execute unless BOTH files exist:**
```
[project]/A06-ad-arena/checkpoints/LAYER_1_COMPLETE.yaml
[project]/A06-ad-arena/checkpoints/ARENA_R1_COMPLETE.yaml
```

**Arena Round 2 (FINAL) CANNOT execute unless ALL THREE files exist:**
```
[project]/A06-ad-arena/checkpoints/LAYER_1_COMPLETE.yaml
[project]/A06-ad-arena/checkpoints/ARENA_R1_COMPLETE.yaml
[project]/A06-ad-arena/checkpoints/ARENA_R2_COMPLETE.yaml
```

**Synthesizer (Layer 2.5) CANNOT execute unless this file exists:**
```
[project]/A06-ad-arena/checkpoints/ARENA_R3_COMPLETE.yaml
```

**Layer 3 (Human Selection) CANNOT execute unless this file exists:**
```
[project]/A06-ad-arena/checkpoints/SYNTHESIS_COMPLETE.yaml
```

**Layer 4 (Output) CANNOT execute unless this file exists:**
```
[project]/A06-ad-arena/checkpoints/HUMAN_SELECTION_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# ARENA_R[N]_COMPLETE.yaml (for Rounds 1-3)
round: [1 | 2]
skill: "A06-ad-arena"
timestamp: "[ISO 8601]"
status: COMPLETE

concepts_evaluated:
  - concept_id: "[C-001]"
    hook_id: "[H-XX]"
    script_id: "[S-XX]"
    visual_id: "[V-XX]"
  - concept_id: "[C-002]"
    [...]

personas_completed:
  dr_strategist: true
  scroll_stopper: true
  ugc_native: true
  brand_builder: true
  data_scientist: true
  visual_storyteller: true
  architect: true

critique_completed: true
revision_completed: true
scoring_completed: true
learning_brief_generated: true

completeness:
  all_7_personas_evaluated: true
  all_concepts_critiqued: true
  all_concepts_revised: true
  all_concepts_scored: true

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

```yaml
# SYNTHESIS_COMPLETE.yaml
skill: "A06-ad-arena"
layer: 2.5
timestamp: "[ISO 8601]"
status: COMPLETE

synthesis_outputs:
  hybrids_created: [2 | 3]
  hybrid_ids:
    - "[H-001]"
    - "[H-002]"
    - "[H-003]" (optional)

quality_verification:
  all_hybrids_score_8_0_plus: true
  all_coherence_checks_pass: true
  hybrids_meaningfully_different: true

completeness:
  decomposition_complete: true
  best_element_matrix_complete: true
  hybrid_reconstruction_complete: true
  coherence_validation_complete: true
```

```yaml
# HUMAN_SELECTION_COMPLETE.yaml
skill: "A06-ad-arena"
layer: 3
timestamp: "[ISO 8601]"
status: COMPLETE

selection_received: true
selected_concepts:
  - concept_id: "[C-XXX or H-XXX]"
    type: "[pure | hybrid]"
    weighted_score: [X.X]
  - [additional selections...]

verification:
  minimum_3_concepts_selected: true
  all_selections_above_8_0: true
  all_scroll_stop_above_7_0: true
  all_platform_native_above_6_5: true
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Arena rounds** | 3 (mandatory — no shortcuts) | HALT -- Complete both rounds + audience evaluation |
| **Personas per round** | 7 (all must evaluate) | HALT -- All 7 personas required |
| **Specimens loaded per persona** | 15 verbatim ad specimens minimum | HALT -- Load specimens before Arena |
| **Overall weighted score** | >= 8.0 to advance | HALT -- Refine or reject concept |
| **Scroll-Stop Power** | >= 7.0 (DEAL-BREAKER) | HALT -- Concept fails primary job |
| **Platform Nativeness** | >= 6.5 (must feel natural) | HALT -- Concept feels like "ad" |
| **No criterion below** | 5.0 (catastrophic weakness) | HALT -- Any 1-4 score disqualifies |
| **Synthesis hybrids** | 2-3 (minimum 2) | HALT -- Generate synthesis hybrids |
| **Concepts advancing minimum** | 3 concepts >= 8.0 | Follow ALL-BELOW-THRESHOLD protocol |
| **Human selection** | BLOCKING (cannot auto-select) | HALT -- Wait for human selection |
| **Critique per round** | Adversarial Critic evaluates ALL concepts | HALT -- Critique is mandatory |

### Specimen Loading Protocol

**BEFORE ANY ARENA EXECUTION:**

```yaml
specimen_protocol:
  step_1: "CHECK: Do >= 15 specimen files exist in ad-persona-specimens/[persona-dir]/ for EACH of the 6 specialist personas?"
  step_2: "IF YES for all 6: LOAD 3-5 niche-matched + platform-matched specimens per persona"
  step_3: "IF NO (< 15 for any persona): HALT -- 'Cannot run Arena without minimum specimen count'"
  step_4: "HOLD specimens in active context across both rounds + audience evaluation"
  step_5: "Persona evaluations MUST reference specific specimens as comparison points"
  step_6: "The Architect does NOT load separate specimens -- references all specimens from other 6 personas"

  persona_to_specimen_dir:
    dr_strategist: "ad-persona-specimens/01-dr-strategist/"
    scroll_stopper: "ad-persona-specimens/02-scroll-stopper/"
    ugc_native: "ad-persona-specimens/03-ugc-native/"
    brand_builder: "ad-persona-specimens/04-brand-builder/"
    data_scientist: "ad-persona-specimens/05-data-scientist/"
    visual_storyteller: "ad-persona-specimens/06-visual-storyteller/"

  niche_matching:
    campaign_vertical: "[health | golf | finance | personal-dev | technology]"
    load_specimens_from_same_vertical: true
    if_vertical_specimens_unavailable: "Load closest match + log gap"

  platform_matching:
    campaign_platform: "[TikTok | Meta | YouTube | Google Display]"
    load_specimens_from_same_platform: true
    if_platform_specimens_unavailable: "Load closest match + log gap"

  IF specimens_not_loaded:
    HALT -- "Cannot run Arena without verbatim specimen injection"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "Concepts look strong enough after Round 1" | Round 2 and 3 produce genuine improvement through learning. Cutting rounds cuts quality ceiling. | HALT -- Complete both rounds + audience evaluation |
| "5 personas are sufficient for this evaluation" | 7 personas is non-negotiable. Each brings a distinct lens. Missing personas = missing critical perspectives. | HALT -- All 7 personas required |
| "The hook alone is strong so the concept passes" | Concepts are ATOMIC UNITS (hook + script + visual). Evaluating elements in isolation misses integration quality. | HALT -- Evaluate complete integrated concept |
| "Close enough to 8.0" (e.g., 7.8 weighted score) | Thresholds are exact. 7.8 ≠ 8.0. Numbers are binary pass/fail. | HALT -- Refine until threshold met |
| "All personas agree so we don't need the Critic" | The Critic exists precisely to prevent consensus drift. Adversarial critique is mandatory EVERY round. | HALT -- Execute adversarial critique |
| "Specimens aren't available for this vertical" | If < 15 specimens exist per persona, Arena CANNOT run. Descriptive personas without specimens = protocol violation. | HALT -- Complete specimen collection first |
| "The visual and copy are both strong separately" | Visual-copy coherence is a specific criterion. Separate strength ≠ integrated strength. | HALT -- Evaluate visual-copy coherence score |
| "This ad would work on any platform" | Platform Nativeness is platform-specific. A TikTok ad scored without TikTok-specific nativeness criteria is invalid. | HALT -- Apply platform-specific scoring |
| "Synthesis is just averaging the persona scores" | Synthesis is phrase-level reconstruction of improved concepts using best elements. Averaging = forbidden. | HALT -- Execute proper synthesis protocol |
| "Human can select from the top 3 scorers by default" | Human selection is BLOCKING. No auto-selection, no timeout selection, no defaults. | HALT -- Wait for explicit human selection |

---

## STRUCTURAL FIX 4: A06-SPECIFIC MC-CHECK

```yaml
AD-ARENA-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [0 | 1 | 2 | 2.5 | 3 | 4]
    current_round: [1 | 2 | audience-eval | post-arena | N/A]
    previous_checkpoint_exists: [Y/N]
    if_no: "STOP -- Cannot proceed without checkpoint file"

  specimen_verification:
    specimens_loaded_per_persona:
      dr_strategist: [count] -- >= 15?
      scroll_stopper: [count] -- >= 15?
      ugc_native: [count] -- >= 15?
      brand_builder: [count] -- >= 15?
      data_scientist: [count] -- >= 15?
      visual_storyteller: [count] -- >= 15?
    all_personas_above_minimum: [Y/N]
    specimens_held_in_active_context: [Y/N]
    if_any_no: "STOP -- Load specimens to minimum before Arena execution"

  concept_assembly_verification:
    concepts_assembled_as_atomic_units: [Y/N]
    hook_plus_script_plus_visual: [Y/N]
    no_isolated_element_evaluation: [Y/N]
    if_any_no: "STOP -- Concepts must be hook + script + visual as integrated units"

  arena_round_compliance:
    rounds_completed: [0 | 1 | 2 | 3]
    if_under_3_and_attempting_synthesis: "STOP -- Both rounds + audience evaluation mandatory"
    personas_evaluated_this_round: [count]
    if_under_7: "STOP -- All 7 personas must evaluate every round"

  critique_verification:
    adversarial_critic_executed: [Y/N]
    critique_per_concept_completed: [Y/N]
    critic_identified_one_weakness_each: [Y/N]
    revision_after_critique_completed: [Y/N]
    if_any_no: "STOP -- Adversarial critique-revise cycle is mandatory"

  scoring_verification:
    all_concepts_scored_against_7_criteria: [Y/N]
    evidence_provided_for_each_score: [Y/N]
    platform_specific_adjustments_applied: [Y/N]
    if_any_no: "STOP -- Complete scoring with evidence"

  threshold_verification:
    minimum_concepts_above_8_0: [count] -- >= 3?
    all_concepts_scroll_stop_above_7_0: [Y/N]
    all_concepts_platform_native_above_6_5: [Y/N]
    no_concepts_with_criterion_below_5_0: [Y/N]
    if_thresholds_not_met: "Follow ALL-BELOW-THRESHOLD protocol"

  synthesis_verification:
    at_layer_2_5: [Y/N]
    if_yes_hybrids_created: [2 | 3 | insufficient]
    if_insufficient: "STOP -- Minimum 2 synthesis hybrids required"
    hybrids_all_score_8_0_plus: [Y/N]
    hybrids_coherence_validated: [Y/N]
    if_any_no: "STOP -- Synthesis quality gates not met"

  human_selection_verification:
    at_layer_3: [Y/N]
    if_yes_selection_received: [Y/N]
    if_at_layer_3_and_no_selection: "STOP -- Human selection is BLOCKING"

  rationalization_check:
    am_i_skipping_rounds: [Y/N]
    am_i_evaluating_elements_separately: [Y/N]
    am_i_running_without_specimens: [Y/N]
    am_i_using_self_critique: [Y/N]
    am_i_inflating_scores: [Y/N]
    am_i_ignoring_platform_specificity: [Y/N]
    am_i_averaging_instead_of_synthesizing: [Y/N]
    if_any_yes: "HALT -- Rationalization detected"

  result: [CONTINUE | HALT_SPECIMENS | HALT_ROUNDS | HALT_CRITIQUE | HALT_SYNTHESIS | HALT_SELECTION | HALT_THRESHOLDS]
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-round Arena execution loses continuity without persistent state files. Without PROJECT-STATE.md, which concepts were evaluated, which rounds completed, and which personas ran is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/A06-ad-arena/
  PROJECT-STATE.md          # Living document -- updated after every round
  PROGRESS-LOG.md           # Append-only timeline of all actions
  checkpoints/              # Gate checkpoint files
  execution-log.md          # Detailed execution record
  layer-0-outputs/          # Per-microskill output files
  layer-1-outputs/
  layer-2-outputs/
    round-1/                # Round 1 evaluations
    round-2/                # Round 2 evaluations
    audience-evaluation/    # Audience evaluation outputs
  layer-2.5-outputs/        # Synthesis hybrids
  layer-3-outputs/          # Human selection
  layer-4-outputs/          # Final packaging
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "A06-ad-arena"
created: "[date]"
last_updated: "[date]"
current_layer: [0 | 1 | 2 | 2.5 | 3 | 4]
current_round: [1 | 2 | audience-eval | post-arena | N/A]
status: "[INITIALIZING | IN_PROGRESS | BLOCKED | COMPLETE]"

concepts_under_evaluation:
  - concept_id: "C-001"
    hook_id: "H-XX"
    script_id: "S-XX"
    visual_id: "V-XX"
    platform: "[TikTok | Meta | YouTube | Display]"
    status: "EVALUATING"
    current_weighted_score: [X.X or "pending"]
  - [additional concepts...]

arena_progress:
  round_1: "[PENDING | IN_PROGRESS | COMPLETE]"
  round_2: "[PENDING | IN_PROGRESS | COMPLETE]"
  audience_evaluation: "[PENDING | IN_PROGRESS | COMPLETE]"
  synthesis: "[PENDING | IN_PROGRESS | COMPLETE]"
  human_selection: "[PENDING | AWAITING | RECEIVED]"

specimens_loaded:
  dr_strategist: [count]
  scroll_stopper: [count]
  ugc_native: [count]
  brand_builder: [count]
  data_scientist: [count]
  visual_storyteller: [count]
  all_above_minimum: [Y/N]

gate_status:
  GATE_0: "[PASS | FAIL | PENDING]"
  GATE_1: "[PASS | FAIL | PENDING]"
  GATE_R1: "[PASS | FAIL | PENDING]"
  GATE_R2: "[PASS | FAIL | PENDING]"
  GATE_R2_FINAL: "[PASS | FAIL | PENDING]"
  GATE_2.5: "[PASS | FAIL | PENDING]"
  GATE_3: "[PASS | FAIL | PENDING]"
  GATE_4: "[PASS | FAIL | PENDING]"

next_action: "[specific next step]"
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 6: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

### The Problem
Previous skills had models invent gate statuses like "PARTIAL_PASS" and "CONDITIONAL_PASS" -- statuses that don't exist.

### The Fix

**Gate statuses are BINARY: PASS or FAIL.**

```
VALID GATE STATUSES (checkpoint files):
  COMPLETE (layer/round checkpoint)
  PASS (gate evaluation)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / conditional_approval
  PROCEED_WITH_CONCERNS / WARNING
  "good enough" / "acceptable for now"
  "strong after Round 1" / "Round 2 won't help"
  "close to 8.0" / "approximately meets threshold"

IF any forbidden status is generated:
  1. HALT immediately
  2. DELETE any output files created under the false status
  3. RETURN to the failing layer/round
  4. Re-evaluate with valid statuses only
```

---

## STRUCTURAL FIX 7: STALE ARTIFACT CLEANUP

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing round evaluation outputs or synthesis outputs:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/arena-round-[N]-results.md (root -- from failed attempts)
     - [project]/A06-ad-arena/layer-2-outputs/round-[N]/ (correct location)
     - [project]/outputs/arena-round-[N]/ (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED round:
  1. DELETE all output artifacts from the failed round
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 8: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol -- BEFORE any Arena execution:**

```
SESSION STARTUP:
  1. READ this file (A06-AD-ARENA-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ A06-AD-ARENA-AGENT.md -- agent architecture and 7 personas
  3. READ AD-ENGINE.md (Ad Arena Adaptation section)
  4. READ ~system/protocols/ARENA-CORE-PROTOCOL.md (2-round + audience evaluation shared protocol)
  5. IF resuming: READ PROJECT-STATE.md for current round/layer
  6. IF resuming: READ checkpoint files to verify completion
  7. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  8. VERIFY specimen loading (minimum 15 per persona)
  9. ONLY THEN begin execution

NEVER begin Arena execution without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Reference:** ~system/SYSTEM-CORE.md MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.0.1-project-infrastructure | layer-0-outputs/0.0.1-project-infrastructure.md | 1KB |
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 2KB |
| 0 | 0.2-specimen-loader | layer-0-outputs/0.2-specimen-loader.md | 3KB |
| 0 | 0.3-campaign-context-assembler | layer-0-outputs/0.3-campaign-context-assembler.md | 2KB |
| 0 | 0.4-platform-requirements-loader | layer-0-outputs/0.4-platform-requirements-loader.md | 2KB |
| 0 | 0.5-input-validator | layer-0-outputs/0.5-input-validator.md | 1KB |
| 1 | 1.1-concept-assembler | layer-1-outputs/1.1-concept-assembler.md | 3KB |
| 1 | 1.2-integration-mapper | layer-1-outputs/1.2-integration-mapper.md | 3KB |
| 1 | 1.3-concept-bundle-validator | layer-1-outputs/1.3-concept-bundle-validator.md | 2KB |
| 2.1 | 2.1-persona-evaluation-round-1 | layer-2-outputs/round-1/2.1-persona-evaluations.md | 5KB |
| 2.2 | 2.2-critique-round-1 | layer-2-outputs/round-1/2.2-adversarial-critique.md | 3KB |
| 2.3 | 2.3-revision-round-1 | layer-2-outputs/round-1/2.3-targeted-revision.md | 3KB |
| 2.4 | 2.4-scoring-round-1 | layer-2-outputs/round-1/2.4-scoring.md | 5KB |
| 2.5 | 2.5-learning-brief-round-1 | layer-2-outputs/round-1/2.5-learning-brief.md | 3KB |
| 2.1 | 2.1-persona-evaluation-round-2 | layer-2-outputs/round-2/2.1-persona-evaluations.md | 5KB |
| 2.2 | 2.2-critique-round-2 | layer-2-outputs/round-2/2.2-adversarial-critique.md | 3KB |
| 2.3 | 2.3-revision-round-2 | layer-2-outputs/round-2/2.3-targeted-revision.md | 3KB |
| 2.4 | 2.4-scoring-round-2 | layer-2-outputs/round-2/2.4-scoring.md | 5KB |
| 2.5 | 2.5-learning-brief-round-2 | layer-2-outputs/round-2/2.5-cumulative-learning-brief.md | 3KB |
| 2.1 | 2.1-audience-evaluation | layer-2-outputs/audience-evaluation/2.1-audience-evaluations.md | 5KB |
| 2.2 | 2.2-audience-critique | layer-2-outputs/audience-evaluation/2.2-audience-critique.md | 3KB |
| 2.3 | 2.3-audience-revision | layer-2-outputs/audience-evaluation/2.3-targeted-revision.md | 3KB |
| 2.4 | 2.4-audience-scoring | layer-2-outputs/audience-evaluation/2.4-final-scoring.md | 5KB |
| 2.5 | 2.5.1-decomposition | layer-2.5-outputs/2.5.1-decomposition.md | 5KB |
| 2.5 | 2.5.2-best-element-matrix | layer-2.5-outputs/2.5.2-best-element-matrix.md | 3KB |
| 2.5 | 2.5.3-hybrid-reconstruction | layer-2.5-outputs/2.5.3-hybrid-reconstruction.md | 5KB |
| 3 | 3.1-candidate-presentation | layer-3-outputs/3.1-candidate-presentation.md | 5KB |
| 3 | 3.2-human-selection-capture | layer-3-outputs/3.2-human-selection-capture.md | 2KB |
| 4 | 4.1-results-packager | layer-4-outputs/4.1-results-packager.md | 5KB |
| 4 | 4.2-learning-brief-finalizer | layer-4-outputs/4.2-learning-brief-finalizer.md | 3KB |
| 4 | 4.3-downstream-handoff | layer-4-outputs/4.3-downstream-handoff.md | 3KB |

### Layer Gate Enhancement

Each checkpoint YAML (ARENA_R1_COMPLETE.yaml, ARENA_R2_COMPLETE.yaml, ARENA_R3_COMPLETE.yaml, SYNTHESIS_COMPLETE.yaml) MUST list all microskill output files with sizes. If ANY output file is missing, the checkpoint CANNOT be created.

### Execution Log Enhancement

Each microskill entry in execution-log.md MUST include:
- Spec file read: [Y/N] with path
- Output file created: [Y/N] with path
- Output file size: [X]KB
- Schema compliance: [Y/N]

### Forbidden Behaviors

1. Executing microskills without reading their .md spec files
2. Producing summary output without per-microskill files
3. Checkpoint YAML without microskill output file listing
4. Output files below minimum size thresholds
5. Output files missing required section headers from spec

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 5, 8):
[ ] A06-AD-ARENA-ANTI-DEGRADATION.md read (THIS FILE)
[ ] A06-AD-ARENA-AGENT.md read
[ ] AD-ENGINE.md read (Ad Arena Adaptation section)
[ ] ~system/protocols/ARENA-CORE-PROTOCOL.md read (2-round + audience evaluation shared protocol)
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 7)
[ ] All upstream inputs validated (A02, A04, A05 package files exist)
[ ] Specimens verified (>= 15 per persona, all 6 specialist personas)

LAYER 0 (LOADING):
[ ] Project infrastructure created
[ ] Upstream packages loaded (hooks, scripts, visuals)
[ ] Specimens loaded (3-5 per persona, niche-matched + platform-matched)
[ ] Campaign context assembled
[ ] Platform requirements loaded
[ ] All inputs validated
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (CONCEPT ASSEMBLY):
[ ] All concepts assembled as atomic units (hook + script + visual)
[ ] Integration quality mapped (visual-copy coherence assessed)
[ ] Concept bundles validated (no isolated element evaluations)
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 PRE-ARENA (MANDATORY FILE READS):
[ ] ARENA-CORE-PROTOCOL.md READ (path: ~system/protocols/ARENA-CORE-PROTOCOL.md)
[ ] ARENA-PERSONA-PANEL.md READ (path: ~system/protocols/ARENA-PERSONA-PANEL.md)
[ ] Persona names VERIFIED against protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect

LAYER 2 ROUND 1 (ARENA):
[ ] All 7 personas evaluated all concepts (no skipped personas)
[ ] Concepts evaluated as integrated units (not isolated elements)
[ ] Adversarial Critic produced assessment (weakness_found or no_material_weakness) + strength_note per concept
[ ] Targeted revision completed based on critique
[ ] All concepts scored against 7 criteria with evidence
[ ] Platform-specific adjustments applied (TikTok/Meta/YouTube/Display)
[ ] Analytical Brief Round 1 generated
[ ] ARENA_R1_COMPLETE.yaml created

LAYER 2 ROUND 2 (ARENA):
[ ] Analytical Brief distributed to all 7 personas
[ ] All 7 personas re-evaluated with learning integration
[ ] Adversarial Critic re-critiqued (honest assessment of improved concepts — may report no_material_weakness)
[ ] Targeted revision completed
[ ] All concepts scored (genuine improvement, not inflation)
[ ] Cumulative Analytical Brief generated
[ ] ARENA_R2_COMPLETE.yaml created

LAYER 2 ROUND 2 FINAL (ARENA):
[ ] Cumulative Analytical Brief distributed to all 7 personas
[ ] All 7 personas generated FINAL evaluations
[ ] Adversarial Critic performed FINAL critique
[ ] Targeted revision completed
[ ] FINAL scoring completed
[ ] ARENA_R2_FINAL_COMPLETE.yaml created

LAYER 2.5 (SYNTHESIS -- MANDATORY, CANNOT BE SKIPPED):
[ ] All 7 Round 2 (FINAL) evaluations decomposed into improvement suggestions
[ ] Best-element matrix created (best suggestion per concept aspect)
[ ] 2-3 hybrid concepts reconstructed (not averaged)
[ ] Coherence validation completed (6/6 checks pass)
[ ] All hybrids score >= 8.0
[ ] SYNTHESIS_COMPLETE.yaml created

LAYER 3 (HUMAN SELECTION -- BLOCKING):
[ ] 9-10 candidates presented (7 pure + 2-3 hybrids)
[ ] All scores and rationale transparent
[ ] Human selection received (BLOCKING -- cannot proceed without)
[ ] Selected concepts verified (>= 8.0 weighted, >= 7.0 scroll-stop, >= 6.5 platform native)
[ ] Minimum 3 concepts selected
[ ] HUMAN_SELECTION_COMPLETE.yaml created

LAYER 4 (OUTPUT & PACKAGING):
[ ] AD-ARENA-RESULTS.md created with complete evaluation data
[ ] Analytical Brief finalized (what the Arena learned)
[ ] Downstream handoff to A07 prepared (selected concepts only)
[ ] All output files verified
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated with Arena completion
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] Learning log updated with any catches/fixes
[ ] Downstream handoff to A07 ready

ON CONTEXT RESUME:
[ ] VERIFY specimens were loaded (check execution log)
[ ] VERIFY all rounds completed (check round checkpoint files)
[ ] VERIFY concepts evaluated as atomic units (no isolated element scoring)
[ ] VERIFY human selection exists (HUMAN_SELECTION_COMPLETE.yaml)
[ ] If specimens skipped, RETURN to Layer 0
[ ] If rounds skipped, RETURN to last completed round
```

---

## ALL-BELOW-THRESHOLD PROTOCOL

**Trigger:** Fewer than 3 concepts score >= 8.0 weighted after all rounds + synthesis.

**This is NOT a failure. It is a quality signal.**

```
IF fewer than 3 concepts >= 8.0 after Round 2 (FINAL) + Synthesis:

STEP 1: ANALYZE THE PATTERN
  - Which criterion(s) are systematically weak across all concepts?
  - Is the weakness in hook quality, script architecture, or visual direction?
  - Is the weakness platform-specific (platform nativeness scores low)?
  - Is the weakness integration (visual-copy coherence scores low)?

STEP 2: GENERATE DIAGNOSTIC REPORT
  Create file: A06-ad-arena/ALL-BELOW-THRESHOLD-DIAGNOSTIC.md
  Include:
    - Threshold gap analysis (how far below 8.0 are the top concepts?)
    - Criterion weakness breakdown (which criteria are dragging scores down?)
    - Source skill identification (A02 hook issue? A04 script issue? A05 visual issue?)
    - Recommendations for upstream skill re-execution

STEP 3: PRESENT TO HUMAN (BLOCKING)
  Options:
    a. Accept the top 3 concepts despite being below 8.0 (acknowledge quality ceiling lowered)
    b. Return to A02/A04/A05 to generate new hooks/scripts/visuals based on diagnostic
    c. Adjust quality thresholds for this campaign (acknowledge different standards)

STEP 4: LOG THE DECISION
  - If (a): Log quality ceiling acknowledgment, proceed with top 3
  - If (b): Return to identified upstream skill with diagnostic feedback
  - If (c): Document adjusted thresholds in PROJECT-STATE.md, proceed with top 3

DO NOT:
  - Inflate scores to meet thresholds
  - Advance concepts that genuinely fail quality gates
  - Proceed to A07 without human decision on threshold failure
```

---

## STRUCTURAL FIX 9: HOMOGENEITY DETECTION (Arena Diversity Protocol)

### The Problem
LLMs naturally converge toward similar outputs across personas. When 5 of 7 personas produce fear-based problem-solution hooks, the Arena produces volume without diversity. The best ad concept may be hiding in an unexplored approach.

### The Fix

**Reference:** `~system/protocols/ARENA-DIVERSITY-PROTOCOL.md`

**MANDATORY in every Arena round:**

1. **Variant Diversity Audit** — After all 7 personas generate, classify each output by emotional frame, structural approach, entry angle, and differentiating phrase. If >3 convergent pairs detected: trigger Divergence Protocol (3 most-similar regenerate with differentiation constraint).

2. **Competitive Distance Scoring (10% weight)** — Score each concept against A01 competitive intelligence data. How different is this from what competitors are running? Scores MUST cite specific competitor examples.

3. **Pattern Break Bonus (5% weight)** — Does this concept violate expected ad category conventions? Name the convention being broken.

4. **Memorability Test** — After scoring, recall one phrase per concept without re-reading. Flag forgettable concepts.

### Ad-Specific Convergence Patterns to Watch

| Convergence Pattern | Why It Happens | Divergence Constraint |
|---|---|---|
| All hooks use fear/urgency | Default LLM emotional register | Require curiosity, aspiration, or humor hooks |
| All scripts follow problem-solution | Default persuasion structure | Require story-first, question-driven, or contrarian scripts |
| All visuals use before/after | Default health ad visual | Require lifestyle, mechanism-visual, or social proof visuals |

### MC-CHECK Addition

Add to AD-ARENA-MC-CHECK:

```yaml
diversity_verification:
  diversity_audit_completed: [Y/N]
  convergent_pairs_count: [number]
  divergence_protocol_triggered: [Y/N]
  competitive_distance_scored: [Y/N]
  pattern_break_scored: [Y/N]
  memorability_test_completed: [Y/N]
  if_any_no: "HALT — Complete diversity audit per ARENA-DIVERSITY-PROTOCOL.md"
```

---

## KEY A06-SPECIFIC DEGRADATION PATTERNS

### Pattern 1: Isolated Element Evaluation

**Symptom:** The model scores hook, script, and visual separately, then averages for concept score.

**Why This Fails:** A brilliant hook that creates an expectation the script doesn't fulfill is a 9/10 hook with a 4/10 concept. Integration quality is a separate dimension from element quality.

**Fix:** Concepts are ATOMIC UNITS. Evaluate hook + script + visual as an integrated whole. Visual-copy coherence is a specific criterion. A concept with a 9/10 hook + 9/10 script + 9/10 visual can still score 5/10 on visual-copy coherence if they don't reinforce each other.

### Pattern 2: Descriptive Personas Without Specimens

**Symptom:** The model generates persona evaluations based on persona descriptions ("The Scroll Stopper would focus on the first 3 seconds...") without loading actual winning ad specimens.

**Why This Fails:** Descriptive personas produce generic, theoretical evaluations. Specimen-loaded personas produce grounded evaluations with specific reference points from real winning ads.

**Fix:** BEFORE Arena execution, VERIFY >= 15 specimens loaded per persona. Persona evaluations MUST reference specific specimens. "This hook is weaker than the [Specimen ID] hook because..." is valid. "This hook lacks scroll-stop power" without specimen comparison is generic.

### Pattern 3: Single-Round Shortcuts

**Symptom:** After Round 1, the model declares concepts "strong enough" and skips Rounds 2-3.

**Why This Fails:** The best evaluations emerge from the 2-round + audience evaluation adversarial process. Round 1 establishes baselines. Round 2 shows improvement through learning. Round 2 (FINAL) produces peak quality.

**Fix:** 2 rounds + audience evaluation are MANDATORY. "Strong after Round 1" is a forbidden rationalization. The Arena runs 2 rounds + audience evaluation regardless of Round 1 scores.

### Pattern 4: Self-Critique Weakness

**Symptom:** The model uses the same agent that generated the evaluation to also critique it, or uses a different persona to critique (cross-persona critique).

**Why This Fails:** Self-critique is weak — the model finds surface-level issues or none. Cross-persona critique drifts toward consensus instead of adversarial challenge.

**Fix:** Dedicated adversarial Critic agent with NO generation context. The Critic receives outputs BLIND, evaluates against the SAME 7 criteria as scoring. If a material weakness exists, identifies the SINGLE most impactful one per concept with actionable fix direction. If no element materially underperforms, reports `no_material_weakness` with a `strength_note`. Do not manufacture weaknesses to justify the role.

### Pattern 5: Consensus Drift

**Symptom:** In later rounds, all 7 personas start agreeing. Evaluations converge instead of maintaining diverse perspectives.

**Why This Fails:** Consensus is a sign of degradation, not quality. Each persona should maintain its distinct lens even when learning from other personas.

**Fix:** Analytical Briefs distribute TECHNIQUES, not consensus. Personas absorb winner techniques but maintain their editorial lens. The Scroll Stopper learning from The Brand Builder's memorability technique doesn't make the Scroll Stopper evaluate memorability — it makes the Scroll Stopper's hook recommendations create memorability.

### Pattern 6: Scoring Inflation

**Symptom:** Round 2 (FINAL) scores are higher than Round 1 not due to genuine quality improvement but due to familiarity with the concepts.

**Why This Fails:** Familiarity ≠ quality. Repeated exposure can inflate scores through mere-exposure effect.

**Fix:** Scores must reflect genuine quality against the 7 criteria, not familiarity. Adversarial Critic in Round 2 (FINAL) MUST still find weaknesses even in high-scoring concepts. If the Critic finds zero weaknesses, that itself is a degradation signal.

### Pattern 7: Platform Blindness

**Symptom:** The model evaluates all ad concepts against generic quality criteria without adjusting for platform-specific demands.

**Why This Fails:** A concept scoring 9/10 on visual-copy coherence might be 4/10 on TikTok platform nativeness if it feels like a TV commercial. Platform Nativeness is a separate criterion with platform-specific adjustments.

**Fix:** BEFORE scoring Platform Nativeness, identify the target platform (TikTok/Meta/YouTube/Display). Apply platform-specific adjustments per the scoring rubric. A polished, professional production is POSITIVE for YouTube Pre-Roll, NEGATIVE for TikTok UGC nativeness.

### Pattern 8: Synthesis as Averaging

**Symptom:** The model creates hybrid concepts by averaging persona scores ("Hybrid A gets 8.2 from averaging all personas") instead of reconstructing improved concepts from best elements.

**Why This Fails:** Averaging produces mediocre blends. True synthesis creates concepts that exceed any single persona's version by integrating the best improvement suggestions.

**Fix:** Synthesis is phrase-level reconstruction. Decompose all 7 Round 2 (FINAL) evaluations into discrete improvement suggestions. Build best-element matrix. Reconstruct 2-3 improved concepts from best suggestions. Validate coherence (the improved concept must feel unified, not Frankensteined).

---

## KEY INSIGHT

> **"An ad concept is hook + script + visual as an atomic unit. Evaluating any element in isolation misses the integration quality that determines whether the ad actually works. The Arena evaluates complete concepts through 7 specialized lenses across 2 adversarial rounds + audience evaluation. Cutting rounds, skipping personas, or evaluating without specimens are all protocol violations that lower the quality ceiling."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-03-06 | HOMOGENEITY DETECTION: Added Structural Fix 9 — Arena Diversity Protocol integration. Variant Diversity Audit mandatory each round, Competitive Distance (10%) and Pattern Break (5%) added to scoring, Memorability Test post-scoring. Ad-specific convergence patterns table. MC-CHECK enhanced with diversity_verification block. Reference: `~system/protocols/ARENA-DIVERSITY-PROTOCOL.md`. |
| 1.0 | 2026-02-22 | Initial creation with 8 structural fixes, per-microskill output table (31 microskills across rounds), implementation checklist, ALL-BELOW-THRESHOLD protocol, 8 A06-specific degradation patterns. Full Arena anti-degradation architecture for ad concept evaluation. |
