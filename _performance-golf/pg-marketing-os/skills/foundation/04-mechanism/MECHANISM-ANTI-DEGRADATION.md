# MECHANISM-ANTI-DEGRADATION.md

**Version:** 3.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
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

**Operational Failure Patterns (from Research + Proof + Root Cause):**
- AI invents gate statuses ("PARTIAL_PASS", "CONDITIONAL_PASS") to bypass failing gates
- AI proceeds without project infrastructure, losing state between sessions
- AI uses wrong model tier for analysis-heavy layers
- AI leaves stale artifacts from failed attempts that contaminate downstream skills
- AI skips reading anti-degradation files, repeating known failures

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1B (Naming) CANNOT execute unless BOTH files exist:**
```
[project]/04-mechanism/checkpoints/LAYER_1A_COMPLETE.yaml
[project]/04-mechanism/checkpoints/CONCEPT_APPROVED.yaml
```

**Layer 2 (Optimization) CANNOT execute unless this file exists:**
```
[project]/04-mechanism/checkpoints/LAYER_1B_COMPLETE.yaml
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

  arena_verification:
    arena_complete_yaml_exists: [Y/N]
    if_no: "STOP — Arena Layer (2.5) is MANDATORY. Cannot proceed to Layer 3."
    rounds_completed: [number]
    if_under_3: "STOP — All 3 rounds required"
    human_selection_received: [Y/N]
    if_no: "STOP — Human selection is BLOCKING"
    am_i_thinking_arena_is_optional: [Y/N]
    am_i_thinking_output_is_good_enough: [Y/N]
    am_i_thinking_run_arena_separately: [Y/N]
    if_any_yes: "🛑 HALT — Arena rationalization detected"

  concept_checkpoint_verification:
    concept_approved_yaml_exists: [Y/N]
    if_no_and_in_layer_1B: "STOP — CONCEPT_APPROVED.yaml is MANDATORY before naming"
    concepts_presented_in_plain_language: [Y/N]
    if_no: "STOP — Remove all names/packaging before presenting to human"
    am_i_thinking_name_will_clarify_concept: [Y/N]
    am_i_thinking_concept_is_obvious: [Y/N]
    am_i_skipping_human_approval: [Y/N]
    if_any_yes: "🛑 HALT — Concept checkpoint rationalization detected"

  soul_md_check:
    soul_md_loaded_this_session: [Y/N]
    if_no_and_exists: "HALT — Load Soul.md before proceeding"
    anti_voice_patterns_in_output: [Y/N]
    if_yes: "HALT — Output contains anti-voice patterns. Rewrite."
    mechanism_names_match_voice_register: [Y/N]
    if_no: "HALT — Names don't match campaign voice. Regenerate."

  rationalization_check:
    am_i_skipping_scorecard: [Y/N]
    am_i_accepting_low_score: [Y/N]
    am_i_skipping_naming: [Y/N]
    if_any_yes: "🛑 HALT — Rationalization detected"

  result: [CONTINUE | HALT_SCORECARD | HALT_SCORE | HALT_NAMING | HALT_SIMPLICITY | HALT_CONCEPT | HALT_SOUL | HALT_RATIONALIZATION]
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

## STRUCTURAL FIX 8: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/04-mechanism/checkpoints/ARENA_COMPLETE.yaml
```

This file is created ONLY after:
1. All 7 competitors have generated across 3 rounds
2. Adversarial critique completed each round
3. Targeted revision completed each round
4. All candidates scored against 7 criteria
5. Post-arena synthesis complete (2-3 hybrids)
6. Human selection received (BLOCKING)

### Checkpoint Progression (Updated)

```
LAYER_1A_COMPLETE.yaml → CONCEPT_APPROVED.yaml → LAYER_1B_COMPLETE.yaml → LAYER_2_COMPLETE.yaml → ARENA_COMPLETE.yaml → LAYER_3_COMPLETE.yaml → LAYER_4_COMPLETE
```

**CONCEPT_APPROVED.yaml sits between LAYER_1A and LAYER_1B. Layer 1B (Naming) is BLOCKED without it.**
**ARENA_COMPLETE.yaml sits between LAYER_2 and LAYER_3. Layer 3 is BLOCKED without it.**

### Forbidden Rationalizations (Arena-Specific)

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "Arena is optional" | Arena is MANDATORY per CLAUDE.md v3.0+ | HALT — Execute Arena |
| "Output is good enough without Arena" | Single-perspective output lacks competitive quality | HALT — Execute Arena |
| "Arena can be run separately" | Arena is part of the skill execution flow, not a separate pass | HALT — Execute Arena now |
| "Context is too large for Arena" | Request session break, do NOT skip Arena | HALT — Session break, then Arena |
| "I'll note Arena was skipped" | Noting a skip does not excuse the skip | HALT — Execute Arena |
| "Arena adds too many tokens" | Quality over cost. Always. | HALT — Execute Arena |

---

## STRUCTURAL FIX 9: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which layers completed and what candidates were selected is forgotten between sessions. This EXACT failure happened in Research (quote shortfall across sessions) and Root Cause (Arena agent died between sessions, no state preserved).

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/04-mechanism/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
│   ├── LAYER_1_COMPLETE.yaml
│   ├── LAYER_2_COMPLETE.yaml
│   ├── ARENA_COMPLETE.yaml
│   └── LAYER_3_COMPLETE.yaml
├── execution-log.md          # Detailed execution record
├── mechanism-package.yaml    # PRIMARY OUTPUT
└── MECHANISM-SUMMARY.md      # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "04-mechanism"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | ARENA_AWAITING_HUMAN_SELECTION | COMPLETE]"
inputs_validated:
  research_final_handoff: [true/false]
  proof_final_handoff: [true/false]
  root_cause_package: [true/false]
  brief: [true/false]
niche: "[golf | health | weight_loss | finance | business]"
schwartz_stage: [2-5]
emphasis_strategy: ""     # Populated by Layer 1
mechanism_candidates: []  # Populated by Layer 1
selected_candidate: ""    # Populated by Arena
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 10: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

### The Problem
Previous skills had models invent gate statuses like "PARTIAL_PASS" and "CONDITIONAL_PASS" — statuses that don't exist. This happened in Research (twice) and would happen in Mechanism without structural prevention.

### The Fix

**Gate statuses are BINARY: PASS or FAIL. Decision statuses are explicit.**

```
VALID GATE STATUSES (checkpoint files):
  ✅ COMPLETE (layer checkpoint)
  ✅ PASS (gate evaluation)

VALID DECISION STATUSES (validation layer):
  ✅ approved
  ✅ revision (return to Layer 2)
  ✅ blocked (return to Layer 1)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  ❌ PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  ❌ approved_with_concerns / conditional_approval
  ❌ PROCEED_WITH_CONCERNS / WARNING
  ❌ "good enough" / "acceptable for now"

IF any forbidden status is generated:
  1. HALT immediately
  2. DELETE any output files created under the false status
  3. RETURN to the failing layer
  4. Re-evaluate with valid statuses only
```

---

## STRUCTURAL FIX 11: MODEL SELECTION + PERSONA ASSIGNMENTS

### The Fix

**Binding Model Assignment Table for Mechanism:**

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure setup | haiku | File creation only |
| 0 | Input validation + loading | haiku | Simple validation |
| 1 | Ideation (emphasis, naming, explanation, analogy, proof mapping) | opus | Deep creative analysis — naming requires nuanced niche understanding |
| 2 | Scorecard optimization (13 dimensions) | opus | Judgment-heavy scoring against rubrics |
| 2.5 | Arena (7 competitors × 3 rounds) | opus | Competitive generation — maximum quality required |
| 3 | Validation + selection | opus | Judgment-heavy scoring and comparison |
| 4 | Output packaging | sonnet | Assembly from existing content |

**Mechanism is almost entirely opus.** Naming, scorecard optimization, arena, and validation all require deep reasoning. Only infrastructure and final packaging can use lower tiers.

---

## STRUCTURAL FIX 12: STALE ARTIFACT CLEANUP

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing mechanism-package.yaml or MECHANISM-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/mechanism-package.yaml (root — from failed attempts)
     - [project]/04-mechanism/mechanism-package.yaml (correct location)
     - [project]/outputs/mechanism-package.yaml (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 13: CONCEPT CHECKPOINT GATE (v3.0)

### The Problem
Mechanism v3.x generated concepts AND names simultaneously. Good names propped up weak mechanism concepts. Anthony couldn't evaluate strategic thinking without creative packaging bias. Naming work was wasted when the underlying concept was wrong.

### The Fix

**Layer 1B (Naming) CANNOT execute unless this file exists:**
```
[project]/04-mechanism/checkpoints/CONCEPT_APPROVED.yaml
```

This file is created ONLY when:
1. Layer 1A generated 5+ mechanism concepts in plain language (NO names)
2. Concepts were presented WITHOUT names, analogies, or creative packaging
3. Anthony reviewed and approved 1+ concepts
4. CONCEPT_APPROVED.yaml was written with approved concept IDs

### CONCEPT_APPROVED.yaml Format

```yaml
# CONCEPT_APPROVED.yaml
skill: "04-mechanism"
timestamp: "[ISO 8601]"
concepts_presented: [count]
concepts_approved:
  - concept_id: "[ID]"
    human_notes: "[direction from Anthony]"
concepts_rejected:
  - concept_id: "[ID]"
    reason: "[why]"
soul_md_loaded: [true/false]
```

### Updated Checkpoint Progression

```
LAYER_1A_COMPLETE.yaml → CONCEPT_APPROVED.yaml → LAYER_1B_COMPLETE.yaml → LAYER_2_COMPLETE.yaml → ARENA_COMPLETE.yaml → LAYER_3_COMPLETE.yaml
```

**CONCEPT_APPROVED.yaml sits between Layer 1A and Layer 1B. Layer 1B (Naming) is BLOCKED without it.**

### Forbidden Rationalizations (Concept Checkpoint)

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "concept is obvious" | Even obvious concepts need human validation | HALT — Present to human |
| "only one viable concept" | Present it anyway — human may disagree or redirect | HALT — Present to human |
| "a good name will clarify the concept" | Naming MASKS weak concepts — evaluate concept FIRST | HALT — Present plain language |
| "I'll present the named version" | Naming biases evaluation — plain language ONLY in Phase A | HALT — Remove names |
| "human approval slows things down" | Quality over speed. Concept approval is non-negotiable. | HALT — Present to human |
| "the mechanism concept maps directly from root cause" | Mechanism concept must be DERIVED through analysis, not assumed from upstream | HALT — Execute ideation |

---

## STRUCTURAL FIX 14: SOUL.MD LOADING GATE (v3.0)

### The Problem
Without taste constraints, mechanism names and analogies default to generic AI patterns that don't match the campaign voice.

### The Fix

**MANDATORY Soul.md check at pre-execution:**

```yaml
soul_md_verification:
  soul_md_exists: [Y/N]
  soul_md_path: "[project]/SOUL.md"

  IF soul_md_exists == Y:
    soul_md_loaded: true
    status: "[Seed | Expanded | Finalized]"
    voice_register_extracted: [Y/N]
    energy_signature_extracted: [Y/N]
    anti_voice_extracted: [Y/N]

    IF status != "Finalized":
      WARNING: "Soul.md not finalized — taste constraints may be incomplete"

    CONSTRAINTS ACTIVE:
      - Mechanism names must match voice register and energy signature
      - Anti-voice patterns are FORBIDDEN in all naming and analogy output
      - Analogies must match the energy signature (e.g., no military metaphors for gentle voice)

  IF soul_md_exists == N:
    WARNING: "No Soul.md found — generation will lack taste constraints"
    FLAG: All outputs flagged as "generated without Soul.md"
    PROCEED: But document the absence
```

### MC-CHECK Enhancement for Soul.md

Add to MECH-MC-CHECK:

```yaml
soul_md_check:
  soul_md_loaded_this_session: [Y/N]
  if_no_and_exists: "HALT — Load Soul.md before proceeding"
  anti_voice_patterns_in_output: [Y/N]
  if_yes: "HALT — Output contains anti-voice patterns. Rewrite."
  mechanism_names_match_voice_register: [Y/N]
  if_no: "HALT — Names don't match campaign voice. Regenerate."
```

---

## STRUCTURAL FIX 15: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol — BEFORE any mechanism execution:**

```
SESSION STARTUP:
  1. READ this file (MECHANISM-ANTI-DEGRADATION.md) — MANDATORY
  2. READ MECHANISM-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin mechanism execution without reading this anti-degradation file first.
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 9, 14, 15):
[ ] MECHANISM-ANTI-DEGRADATION.md read (THIS FILE)
[ ] MECHANISM-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 12)
[ ] Input files validated (research FINAL_HANDOFF, proof FINAL_HANDOFF, root-cause-package, brief)
[ ] Soul.md checked — loaded if exists, flagged if absent (Fix 14)

LAYER 0 (FOUNDATION):
[ ] Upstream packages loaded (research, proof, root-cause)
[ ] Vault intelligence loaded
[ ] Specimens loaded
[ ] Soul.md loaded — voice_register, energy_signature, anti_voice extracted
[ ] Input validated
[ ] MODEL: haiku (Fix 11)

LAYER 1A / PHASE A (CONCEPT DISCOVERY):
[ ] Emphasis strategy selected (1.0 — runs FIRST)
[ ] Mechanism type selected (1.1)
[ ] 5+ mechanism CONCEPTS generated in PLAIN LANGUAGE (NO names, NO analogies)
[ ] Explanation architecture conceptualized (1.3) — framework only, no creative packaging
[ ] Proof elements mapped — 3+ claims (1.5)
[ ] Ideation gate passed — 5+ viable concepts
[ ] LAYER_1A_COMPLETE.yaml created
[ ] PROJECT-STATE.md updated
[ ] MODEL: opus (Fix 11)

CONCEPT CHECKPOINT (Fix 13 — BLOCKING):
[ ] 5+ concepts presented in plain language ONLY
[ ] NO names, analogies, or creative packaging included
[ ] Human reviewed and approved 1+ concepts
[ ] CONCEPT_APPROVED.yaml created with approved concept IDs
[ ] Human notes/direction captured in CONCEPT_APPROVED.yaml
[ ] VERIFY: CONCEPT_APPROVED.yaml exists before proceeding to Layer 1B

LAYER 1B / PHASE B (NAMING — approved concepts only):
[ ] Naming options generated — 15+ candidates via 4-pass verbalized sampling (1.2)
[ ] Names generated ONLY for approved concept(s)
[ ] Analogy/metaphor developed (1.4) — constrained by Soul.md voice register
[ ] Anti-voice patterns checked against all names and analogies
[ ] LAYER_1B_COMPLETE.yaml created
[ ] MODEL: opus (Fix 11)

LAYER 2 (OPTIMIZATION):
[ ] Image strength optimized (2.1)
[ ] Simplicity validated — 12-year-old test (2.2)
[ ] Proof integrated — not bolted on (2.3)
[ ] Virality assessed (2.4)
[ ] Ease of use checked (2.5)
[ ] Differentiation scored (2.6)
[ ] Embedded benefits extracted (2.7)
[ ] Doomsday factor developed (2.8)
[ ] Belief compatibility checked (2.9)
[ ] Thesis cohesion aligned (2.10)
[ ] Super power articulated (2.11)
[ ] Visceral response validated (2.12)
[ ] Delivery tangibility evaluated (2.13)
[ ] All 13 dimensions scored
[ ] Primary dimensions ≥ 7, supporting dimensions ≥ 5
[ ] LAYER_2_COMPLETE.yaml created
[ ] MODEL: opus (Fix 11)

LAYER 2.5 (ARENA — MANDATORY, CANNOT BE SKIPPED):
[ ] All 7 competitors generated (Round 1)
[ ] Adversarial critique completed (Round 1)
[ ] Targeted revision completed (Round 1)
[ ] Scoring and Learning Brief (Round 1)
[ ] All 7 competitors regenerated (Round 2)
[ ] Adversarial critique completed (Round 2)
[ ] Targeted revision completed (Round 2)
[ ] Scoring and Cumulative Learning Brief (Round 2)
[ ] All 7 competitors generate FINAL (Round 3)
[ ] Adversarial critique completed (Round 3)
[ ] Targeted revision completed (Round 3)
[ ] FINAL scoring and ranking (Round 3)
[ ] Post-Arena Synthesis: 2-3 hybrids created
[ ] 9-10 candidates presented to human
[ ] Human selection received (BLOCKING)
[ ] ARENA_COMPLETE.yaml created

LAYER 3 (VALIDATION):
[ ] Scorecard total calculated (>= 7.0)
[ ] Primary dimensions ≥ 7
[ ] Supporting dimensions ≥ 5
[ ] Minimum threshold gate passed (3.2)
[ ] Vault pattern comparison completed (3.3)
[ ] Anti-slop validation passed (3.4)
[ ] Best mechanism selected with rationale (3.5)
[ ] LAYER_3_COMPLETE.yaml created
[ ] MODEL: opus (Fix 11)

LAYER 4 (PACKAGING):
[ ] Mechanism brief compiled (4.1)
[ ] Copy integration points mapped (4.2)
[ ] Handoff package created for downstream skills (4.3)
[ ] mechanism-package.yaml written with ALL required sections
[ ] MECHANISM-SUMMARY.md written with ALL required sections
[ ] execution-log.md written showing all microskills
[ ] Gate statuses are valid only — no invented statuses (Fix 10)
[ ] MODEL: sonnet (Fix 11)

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All 3 output files verified (YAML + Summary + Log)
[ ] All downstream handoffs populated (05-promise, 06-big-idea, 14-mechanism-narrative)
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] DO NOT trust summary claims about scorecard completion
[ ] RE-READ PROJECT-STATE.md for current position
[ ] RE-READ checkpoint files
[ ] VERIFY all 13 dimensions scored from actual output
[ ] VERIFY composite score >= 7.0 from actual output
[ ] If scorecard incomplete, RETURN to Layer 2
```

---

## KEY INSIGHT

> **"A mechanism without a name is forgettable. A mechanism without an analogy is incomprehensible. A mechanism without proof is unbelievable. And a mechanism without COMPETITION is single-perspective."**

The Mechanism skill has 4 layers + Arena for a reason:
- Layer 0: Load all inputs (can't create in vacuum)
- Layer 1: IDEATE mechanism options with naming and analogy
- Layer 2: OPTIMIZE against all 13 scorecard dimensions
- **Layer 2.5: COMPETE — 7 personas, 3 rounds, adversarial critique, human selection**
- Layer 3: VALIDATE score meets threshold
- Layer 4: Package for downstream skills

Skipping scorecard means accepting mediocre mechanisms that don't convert.
**Skipping Arena means producing single-perspective mechanisms that lack competitive quality.**

---

## Per-Microskill Output Protocol (v3.2)

**Added:** 2026-02-12
**Reference:** CLAUDE-CORE.md § MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB min |
| 0 | 0.2-vault-intelligence-loader | layer-0-outputs/0.2-vault-intelligence-loader.md | 1KB min |
| 0 | 0.2.5-specimen-decomposer | layer-0-outputs/0.2.5-specimen-decomposer.md | 1KB min |
| 0 | 0.2.8-tier1-expression-reference | layer-0-outputs/0.2.8-tier1-expression-reference.json | 2KB min |
| 0 | 0.3-teachings-loader | layer-0-outputs/0.3-teachings-loader.md | 1KB min |
| 0 | 0.4-input-validator | layer-0-outputs/0.4-input-validator.md | 1KB min |
| 1 | 1.0-emphasis-strategy | layer-1-outputs/1.0-emphasis-strategy.md | 2KB min |
| 1 | 1.1-mechanism-type-selection | layer-1-outputs/1.1-mechanism-type-selection.md | 3KB min |
| 1 | 1.2-naming-candidates | layer-1-outputs/1.2-naming-candidates.md | 5KB min |
| 1 | 1.3-explanation-architectures | layer-1-outputs/1.3-explanation-architectures.md | 5KB min |
| 1 | 1.4-analogies | layer-1-outputs/1.4-analogies.md | 3KB min |
| 1 | 1.5-proof-mapping | layer-1-outputs/1.5-proof-mapping.md | 3KB min |
| 1 | 1.6-ideation-gate | layer-1-outputs/1.6-ideation-gate.md | 2KB min |
| 1 | 1.7-naming-anchoring-score | layer-1-outputs/1.7-naming-anchoring-scores.json | 3KB min |
| 2 | 2.1-image-strength | layer-2-outputs/2.1-image-strength.md | 2KB min |
| 2 | 2.2-simplicity | layer-2-outputs/2.2-simplicity.md | 2KB min |
| 2 | 2.3-proof-integration | layer-2-outputs/2.3-proof-integration.md | 2KB min |
| 2 | 2.4-virality | layer-2-outputs/2.4-virality.md | 2KB min |
| 2 | 2.5-ease-of-use | layer-2-outputs/2.5-ease-of-use.md | 2KB min |
| 2 | 2.6-differentiation | layer-2-outputs/2.6-differentiation.md | 2KB min |
| 2 | 2.7-embedded-benefits | layer-2-outputs/2.7-embedded-benefits.md | 2KB min |
| 2 | 2.8-doomsday | layer-2-outputs/2.8-doomsday.md | 2KB min |
| 2 | 2.9-belief-compatibility | layer-2-outputs/2.9-belief-compatibility.md | 2KB min |
| 2 | 2.10-thesis-cohesion | layer-2-outputs/2.10-thesis-cohesion.md | 2KB min |
| 2 | 2.11-super-power | layer-2-outputs/2.11-super-power.md | 2KB min |
| 2 | 2.12-visceral-response | layer-2-outputs/2.12-visceral-response.md | 2KB min |
| 2 | 2.13-delivery-tangibility | layer-2-outputs/2.13-delivery-tangibility.md | 2KB min |
| 3 | 3.1-scorecard-scores | layer-3-outputs/3.1-scorecard-scores.md | 3KB min |
| 3 | 3.2-threshold-gate | layer-3-outputs/3.2-threshold-gate.md | 2KB min |
| 3 | 3.3-vault-comparison | layer-3-outputs/3.3-vault-comparison.md | 3KB min |
| 3 | 3.4-anti-slop-validation | layer-3-outputs/3.4-anti-slop-validation.md | 3KB min |
| 3 | 3.5-mechanism-selection | layer-3-outputs/3.5-mechanism-selection.md | 3KB min |
| 4 | 4.1-mechanism-brief | layer-4-outputs/4.1-mechanism-brief.md | 5KB min |
| 4 | 4.2-copy-integration-map | layer-4-outputs/4.2-copy-integration-map.md | 3KB min |
| 4 | 4.3-handoff-package | layer-4-outputs/4.3-handoff-package.md | 5KB min |

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
| 3.1 | 2026-02-23 | EXPRESSION ANCHORING PROTOCOL: Added 0.2.8-tier1-expression-reference (2KB min) and 1.7-naming-anchoring-scores (3KB min) to per-microskill output table. Shared protocol: Skills/protocols/EXPRESSION-ANCHORING-PROTOCOL.md. Scores naming candidates against audience vocabulary match (40%), TIER1 naming patterns (30%), and FSSIT echo (30%). Adds quote-first naming to Phase B. |
| 3.0 | 2026-02-14 | CONCEPT/NAMING SEPARATION + SOUL.MD: Added STRUCTURAL FIX 13 (Concept Checkpoint Gate) — Layer 1B Naming cannot execute without CONCEPT_APPROVED.yaml. Includes gate file format, updated checkpoint progression (LAYER_1A → CONCEPT_APPROVED → LAYER_1B → LAYER_2 → ARENA → LAYER_3), 6 concept-specific forbidden rationalizations. Added STRUCTURAL FIX 14 (Soul.md Loading Gate) — mandatory Soul.md check at pre-execution with voice/energy/anti-voice extraction, mechanism name voice-matching constraint. MECH-MC-CHECK enhanced with concept_checkpoint_verification block (6 checks) and soul_md_check block (3 checks). Implementation checklist restructured: Layer 1 split into "Layer 1A / Phase A (Concept Discovery)" and "Layer 1B / Phase B (Naming)", new CONCEPT CHECKPOINT section with 6 items, Soul.md loading added to pre-execution and Layer 0. Old Fix 13 (Anti-Degradation Mandatory Read) renumbered to Fix 15. |
| 2.1 | 2026-02-12 | Added Per-Microskill Output Protocol (v3.2) — complete output file table for all 33 microskills across Layers 0, 1, 2, 3, and 4. Layer gate enhancement, execution log enhancement, forbidden behaviors. |
| 2.0 | 2026-02-12 | 5 new structural fixes from Research/Proof/Root Cause propagation pattern. Fix 9: Mandatory project infrastructure (PROJECT-STATE.md + PROGRESS-LOG.md + checkpoints/). Fix 10: Binary gate enforcement with forbidden statuses (PARTIAL_PASS, CONDITIONAL_PASS, approved_with_concerns, etc.). Fix 11: Model selection + persona assignments (binding table — opus for ideation/scorecard/arena/validation, sonnet for packaging, haiku for infrastructure). Fix 12: Stale artifact cleanup (search-and-delete before writing replacements). Fix 13: Anti-degradation mandatory read at session startup. Implementation checklist expanded from 27 to 46 items with PRE-EXECUTION and POST-EXECUTION sections. MC-CHECK updated with Arena verification block. Key insight updated to include Arena reference. |
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
