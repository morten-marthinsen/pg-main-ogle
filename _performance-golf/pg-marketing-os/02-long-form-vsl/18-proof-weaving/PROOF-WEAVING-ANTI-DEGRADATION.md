# PROOF-WEAVING-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
**Purpose:** STRUCTURAL enforcement to prevent proof weaving skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: PROOF-WEAVING-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Create testimonial cascades without 8-beat flow pattern, present before/afters without maximum contrast, or skip into/out transitions for proof sections.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates proof blocks WITHOUT loading type-matched specimens
- AI creates testimonial cascades without proper flow rhythm (8-beat pattern)
- AI writes before/afters without maximum contrast structure
- AI presents study citations as dry academic references instead of persuasively framed
- AI creates demonstration proof without quantified outcomes
- AI builds social proof without scale progression (individual → pattern → scale)
- AI writes transformation reminders that don't callback to earlier proof
- AI creates proof sections without smooth into/out transitions
- AI fails to meet density targets for sections
- AI selects proof approach without human approval

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

```
[project]/18-proof-weaving/checkpoints/LAYER_0_COMPLETE.yaml  # Human confirms proof approach
[project]/18-proof-weaving/checkpoints/LAYER_1_COMPLETE.yaml
[project]/18-proof-weaving/checkpoints/LAYER_2_COMPLETE.yaml
[project]/18-proof-weaving/checkpoints/ARENA_COMPLETE.yaml    # Arena Layer (2.5) — MANDATORY
[project]/18-proof-weaving/HUMAN_SELECTION.yaml  # BLOCKING
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/18-proof-weaving/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 (Validation) CANNOT execute unless BOTH files exist:**
```
[project]/18-proof-weaving/checkpoints/LAYER_2_COMPLETE.yaml
[project]/18-proof-weaving/checkpoints/ARENA_COMPLETE.yaml
```

### LAYER 0 HUMAN CHECKPOINT (BLOCKING)

```yaml
# LAYER_0_COMPLETE.yaml

human_checkpoint:
  proof_approach_confirmed: true
  confirmed_by: "human"
  timestamp: "[ISO 8601]"
  proof_sequencing_strategy: "[proof_first | authority_to_social | scale_cascade | testimonial_parade | wave_pattern]"

  IF proof_approach_confirmed != true:
    HALT — "Cannot proceed without human confirmation of proof approach"
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **Proof types covered** | All required per structure | HALT — Complete types |
| **Testimonial cascade** | 8-beat flow pattern | HALT — Fix rhythm |
| **Before/after** | Maximum contrast | HALT — Increase contrast |
| **Study citations** | Persuasively framed | HALT — Reframe |
| **Social proof** | Scale progression | HALT — Add progression |
| **Transitions** | Into AND out of sections | HALT — Add transitions |
| **Density targets** | Per-section minimums | HALT — Add elements |
| **Arena personas** | 6/6 | HALT — All generate |
| **Human selection** | BLOCKING | HALT — Get selection |

### Proof Density Requirements (TIER1 Benchmarks)

```yaml
density_validation:
  lead:
    target: "1-2 elements"
    required_types: ["authority_anchor", "credibility_mention"]
    actual_count: [number]
    meets_target: [Y/N]

  mechanism_narrative:
    target: "3-4 elements"
    required_types: ["study_citation", "demonstration"]
    actual_count: [number]
    meets_target: [Y/N]

  proof_section:
    target: "6-8+ elements"
    required_types: ["testimonial_cascade", "before_after_progression"]
    actual_count: [number]
    meets_target: [Y/N]

  product_introduction:
    target: "2-3 elements"
    required_types: ["single_testimonial", "results_summary"]
    actual_count: [number]
    meets_target: [Y/N]

  offer_copy:
    target: "1-2 elements"
    required_types: ["value_testimonial", "guarantee_proof"]
    actual_count: [number]
    meets_target: [Y/N]

  close:
    target: "2-3 elements"
    required_types: ["transformation_reminder", "scale_proof_callback"]
    actual_count: [number]
    meets_target: [Y/N]

  IF any_section.meets_target == N:
    HALT — "Density target not met for: [section]"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "testimonial flow is subjective" | 8-beat pattern is REQUIRED (Gold #1) | HALT — Fix rhythm |
| "before/after is clear enough" | Maximum CONTRAST required (Gold #3) | HALT — Increase contrast |
| "studies speak for themselves" | Persuasive FRAMING required | HALT — Reframe |
| "scale is implied" | Individual → pattern → scale REQUIRED | HALT — Add progression |
| "transitions will be added later" | Transitions must be drafted NOW | HALT — Add transitions |
| "density is approximate" | Targets are NON-NEGOTIABLE | HALT — Add elements |
| "callbacks are optional" | Transformation reminders MUST reference earlier proof | HALT — Add callbacks |

---

## STRUCTURAL FIX 4: TESTIMONIAL CASCADE GATE

### The Problem
AI creates testimonials without proper flow rhythm, making them feel like disconnected quotes.

### The Fix

**8-BEAT FLOW PATTERN VALIDATION:**

```yaml
testimonial_cascade_validation:
  using_8_beat_pattern: [Y/N]

  beat_sequence:
    beat_1_relatable_problem: [present]
    beat_2_skepticism_overcome: [present]
    beat_3_specific_result: [present]
    beat_4_unexpected_benefit: [present]
    beat_5_life_change: [present]
    beat_6_emotional_payoff: [present]
    beat_7_recommendation: [present]
    beat_8_call_to_action: [present]

  flow_elements:
    names_and_locations: [Y/N]  # "— Sarah M., Denver, CO"
    varied_quote_lengths: [Y/N]  # Not all same length
    natural_voice: [Y/N]  # Not corporate/scripted

  IF using_8_beat_pattern == N:
    HALT — "Testimonial cascade must use 8-beat flow pattern from Gold #1"
```

---

## STRUCTURAL FIX 5: TRANSITION GATE

### The Problem
AI creates proof sections that start and end abruptly without smooth transitions.

### The Fix

**TRANSITION VALIDATION:**

```yaml
transition_validation:
  sections_with_proof: [list]

  per_section_check:
    section_name: "[name]"

    into_transition:
      present: [Y/N]
      pattern_used: "[but_dont_take_my_word | skeptical_good | nothing_speaks_louder | not_alone]"
      feels_natural: [Y/N]

    out_transition:
      present: [Y/N]
      pattern_used: "[you_could_be_next | imagine_yourself | only_question_now]"
      feels_natural: [Y/N]

  approved_into_patterns:
    - "But don't take my word for it..."
    - "Skeptical? Good. Let me show you the evidence..."
    - "Nothing speaks louder than results..."
    - "[Name] isn't alone. Not by a long shot..."

  approved_out_patterns:
    - "And you could be next..."
    - "Imagine yourself [timeframe] from now..."
    - "The only question now is: will you take the step?"

  IF any_section.into_transition.present == N:
    HALT — "All proof sections need INTO transition"

  IF any_section.out_transition.present == N:
    HALT — "All proof sections need OUT transition"
```

---

## STRUCTURAL FIX 6: PROOF-WEAVING-SPECIFIC MC-CHECK

```yaml
PROOF-WEAVING-MC-CHECK:
  timestamp: "[current time]"

  human_checkpoint_verification:
    proof_approach_confirmed_by_human: [Y/N]
    if_no: "STOP — Human must confirm proof approach before drafting"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  density_verification:
    lead_density_met: [Y/N]
    mechanism_density_met: [Y/N]
    proof_section_density_met: [Y/N]
    product_intro_density_met: [Y/N]
    offer_density_met: [Y/N]
    close_density_met: [Y/N]
    if_any_no: "STOP — Density targets must be met for all sections"

  testimonial_verification:
    uses_8_beat_pattern: [Y/N]
    if_no: "STOP — Testimonial cascade requires 8-beat flow pattern"

  before_after_verification:
    uses_maximum_contrast: [Y/N]
    if_no: "STOP — Before/after requires maximum contrast structure"

  study_verification:
    persuasively_framed: [Y/N]
    if_no: "STOP — Study citations must be persuasively framed"

  social_proof_verification:
    has_scale_progression: [Y/N]
    if_no: "STOP — Social proof requires individual → pattern → scale"

  transition_verification:
    all_into_transitions: [Y/N]
    all_out_transitions: [Y/N]
    if_any_no: "STOP — All proof sections need into AND out transitions"

  callback_verification:
    transformation_reminders_callback: [Y/N]
    if_no: "STOP — Transformation reminders must reference earlier proof"

  result: [CONTINUE | HALT_HUMAN | HALT_SPECIMENS | HALT_DENSITY | HALT_TESTIMONIAL | HALT_CONTRAST | HALT_STUDY | HALT_SOCIAL | HALT_TRANSITION | HALT_CALLBACK]
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 8, 11):
[ ] PROOF-WEAVING-ANTI-DEGRADATION.md read (THIS FILE)
[ ] PROOF-WEAVING-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 10)
[ ] Input files validated (proof-inventory-package, structure-package, campaign-brief)

LAYER 0 (FOUNDATION + HUMAN CHECKPOINT):
[ ] Upstream packages loaded (proof-inventory, structure, campaign-brief)
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Proof approach reviewed with human
[ ] HUMAN CONFIRMS proof sequencing strategy
[ ] LAYER_0_COMPLETE.yaml created (with human confirmation)

LAYER 1 (ARCHITECTURE):
[ ] All proof sections mapped by position
[ ] Elements selected per section
[ ] Density targets confirmed achievable
[ ] Type-matched specimens loaded VERBATIM
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (DRAFTING):
[ ] All proof blocks drafted for each section
[ ] Testimonial cascades use 8-beat flow pattern
[ ] Before/afters use maximum contrast
[ ] Study citations persuasively framed
[ ] Social proof has scale progression
[ ] Transitions smooth into AND out of sections
[ ] Density targets met for all sections
[ ] All 6 Arena personas generate
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
[ ] Emotional register matches campaign
[ ] Avatar resonance validated
[ ] Assembly instructions complete
[ ] No orphaned proof elements (or justified)
[ ] Anti-slop passed
[ ] Score >= 7.0
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created

OUTPUT:
[ ] proof-weaving-package.json created
[ ] PROOF-WEAVING-SUMMARY.md created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified (proof-weaving-package.json, PROOF-WEAVING-SUMMARY.md, execution-log.md)
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY human confirmed proof approach (LAYER_0)
[ ] VERIFY specimens loaded
[ ] VERIFY density targets met
[ ] VERIFY 8-beat testimonial pattern
[ ] VERIFY all transitions present
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"Testimonials without flow rhythm are disconnected quotes. Before/afters without maximum contrast are underwhelming. Study citations without persuasive framing are academic. Proof sections without transitions are jarring."**

---

## STRUCTURAL FIX 7: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 2-round + audience evaluation competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/18-proof-weaving/checkpoints/ARENA_COMPLETE.yaml
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
skill: "18-proof-weaving"
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
[project]/18-proof-weaving/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
├── execution-log.md          # Detailed execution record
├── proof-weaving-package.json # PRIMARY OUTPUT
└── PROOF-WEAVING-SUMMARY.md  # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "18-proof-weaving"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  proof_inventory_package: [Y/N]
  structure_package: [Y/N]
  campaign_brief: [Y/N]
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

BEFORE writing proof-weaving-package.json or PROOF-WEAVING-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/proof-weaving-package.json (root — from failed attempts)
     - [project]/18-proof-weaving/proof-weaving-package.json (correct location)
     - [project]/outputs/proof-weaving-package.json (wrong path)
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

**Session startup protocol — BEFORE any Proof Weaving execution:**

```
SESSION STARTUP:
  1. READ this file (PROOF-WEAVING-ANTI-DEGRADATION.md) — MANDATORY
  2. READ PROOF-WEAVING-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin Proof Weaving execution without reading this anti-degradation file first.
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
| 0 | 0.5-human-checkpoint-curator | layer-0-outputs/0.5-human-checkpoint.md | 1KB |
| 1 | 1.1-proof-section-mapper | layer-1-outputs/1.1-proof-section-mapper.md | 3KB |
| 1 | 1.2-density-planner | layer-1-outputs/1.2-density-planner.md | 3KB |
| 1 | 1.3-dramatization-opportunity-scanner | layer-1-outputs/1.3-dramatization-scanner.md | 3KB |
| 1 | 1.4-proof-element-selector | layer-1-outputs/1.4-proof-element-selector.md | 3KB |
| 1 | 1.5-sequencing-strategy-selector | layer-1-outputs/1.5-sequencing-strategy.md | 3KB |
| 2 | 2.1-testimonial-drafter | layer-2-outputs/2.1-testimonial-drafts.md | 5KB |
| 2 | 2.2-before-after-drafter | layer-2-outputs/2.2-before-after-drafts.md | 5KB |
| 2 | 2.3-study-citation-drafter | layer-2-outputs/2.3-study-citation-drafts.md | 5KB |
| 2 | 2.4-demonstration-proof-drafter | layer-2-outputs/2.4-demonstration-proof-drafts.md | 5KB |
| 2 | 2.5-authority-proof-drafter | layer-2-outputs/2.5-authority-proof-drafts.md | 5KB |
| 2 | 2.6-scale-proof-drafter | layer-2-outputs/2.6-scale-proof-drafts.md | 5KB |
| 2 | 2.7-data-proof-drafter | layer-2-outputs/2.7-data-proof-drafts.md | 5KB |
| 2 | 2.8-proof-transition-drafter | layer-2-outputs/2.8-proof-transition-drafts.md | 3KB |
| 3 | 3.1-emotional-register-calibrator | layer-3-outputs/3.1-emotional-register.md | 3KB |
| 3 | 3.2-avatar-resonance-checker | layer-3-outputs/3.2-avatar-resonance.md | 3KB |
| 3 | 3.3-density-validation | layer-3-outputs/3.3-density-validation.md | 2KB |
| 3 | 3.4-flow-rhythm-checker | layer-3-outputs/3.4-flow-rhythm.md | 3KB |
| 4 | 4.1-proof-assembly-packager | layer-4-outputs/4.1-proof-assembly-package.md | 5KB |
| 4 | 4.2-placement-verification | layer-4-outputs/4.2-placement-verification.md | 3KB |
| 4 | 4.3-output-assembly | layer-4-outputs/4.3-output-assembly.md | 5KB |

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
| 2.0 | 2026-02-14 | STRUCTURAL FIXES 8-11: Added 4 structural fixes propagated from Skills 01-04. Fix 8: Mandatory Project Infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md, checkpoints/). Fix 9: Binary Gate Enforcement (forbidden statuses — PARTIAL_PASS, CONDITIONAL_PASS, etc. trigger IMMEDIATE HALT). Fix 10: Stale Artifact Cleanup (search and delete before writing replacement output). Fix 11: Anti-Degradation Mandatory Read (session startup protocol — read this file + PROOF-WEAVING-AGENT.md before execution). Added PRE-EXECUTION and POST-EXECUTION sections to implementation checklist. |
| 1.2 | 2026-02-12 | PER-MICROSKILL OUTPUT PROTOCOL (v3.2): Added per-microskill output table with 27 required output files across Layers 0-4. Enhanced layer gate, execution log, and forbidden behaviors for per-microskill enforcement. |
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
