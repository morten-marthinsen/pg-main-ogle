# ROOT-CAUSE-ANTI-DEGRADATION.md

**Version:** 3.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
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

**Phase B (Expression/Layer 2) CANNOT execute unless BOTH files exist:**
```
[project]/03-root-cause/checkpoints/LAYER_1_COMPLETE.yaml
[project]/03-root-cause/checkpoints/CONCEPT_APPROVED.yaml
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

  concept_checkpoint_verification:
    concept_approved_yaml_exists: [Y/N]
    if_no_and_in_phase_B: "STOP — CONCEPT_APPROVED.yaml is MANDATORY before expression"
    concepts_presented_in_plain_language: [Y/N]
    if_no: "STOP — Remove all names/expressions before presenting to human"
    am_i_thinking_expression_will_clarify_concept: [Y/N]
    am_i_thinking_concept_is_obvious: [Y/N]
    am_i_skipping_human_approval: [Y/N]
    if_any_yes: "🛑 HALT — Concept checkpoint rationalization detected"

  soul_md_check:
    soul_md_loaded_this_session: [Y/N]
    if_no_and_exists: "HALT — Load Soul.md before proceeding"
    anti_voice_patterns_in_output: [Y/N]
    if_yes: "HALT — Output contains anti-voice patterns. Rewrite."

  rationalization_check:
    am_i_synthesizing_from_memory: [Y/N]
    am_i_skipping_derivation: [Y/N]
    am_i_thinking_one_candidate_enough: [Y/N]
    if_any_yes: "🛑 HALT — Rationalization detected"

  result: [CONTINUE | HALT_THRESHOLD | HALT_STRUCTURE | HALT_BLAME | HALT_CONCEPT | HALT_SOUL | HALT_RATIONALIZATION]
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
PRE-EXECUTION (Fixes 8, 13, 14):
[ ] ROOT-CAUSE-ANTI-DEGRADATION.md read (THIS FILE)
[ ] ROOT-CAUSE-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 11)
[ ] Input files validated (research FINAL_HANDOFF, proof FINAL_HANDOFF, brief)
[ ] Soul.md checked — loaded if exists, flagged if absent (Fix 13)

LAYER 0 (INPUT VALIDATION):
[ ] Research FINAL_HANDOFF.md loaded and verified
[ ] Proof FINAL_HANDOFF.md loaded and verified
[ ] Brief loaded and verified
[ ] RSF data checked (optional — load if available)
[ ] Soul.md loaded — voice_register, energy_signature, anti_voice extracted
[ ] Niche identified from research
[ ] MODEL: haiku (Fix 10)

LAYER 1 / PHASE A (CONCEPT DISCOVERY):
[ ] Research patterns analyzed (1.1)
[ ] Symptom convergence completed (1.2)
[ ] False beliefs identified (1.3)
[ ] Hidden layers discovered (1.4)
[ ] Mechanism constraint checked (1.5)
[ ] Proof constraint checked (1.6)
[ ] Derivation synthesized (1.7)
[ ] ≥3 root cause CONCEPTS generated in PLAIN LANGUAGE (no names, no expressions)
[ ] Concepts presented to human WITHOUT creative packaging
[ ] LAYER_1_COMPLETE.yaml created
[ ] PROJECT-STATE.md updated
[ ] MODEL: opus (Fix 10)

CONCEPT CHECKPOINT (Fix 12 — BLOCKING):
[ ] 3-5 concepts presented in plain language ONLY
[ ] NO expression methods, names, or creative wrappers included
[ ] Human reviewed and approved 1+ concepts
[ ] CONCEPT_APPROVED.yaml created with approved concept IDs
[ ] Human notes/direction captured in CONCEPT_APPROVED.yaml
[ ] VERIFY: CONCEPT_APPROVED.yaml exists before proceeding to Phase B

LAYER 2 / PHASE B (EXPRESSION — approved concepts only):
[ ] Simple reframe created (2.1)
[ ] Named syndrome developed (2.2) — skip for golf niche
[ ] Villain personification completed (2.3)
[ ] Metaphor construction done (2.4)
[ ] Dual problem framing if applicable (2.5)
[ ] Niche expression matching (2.6)
[ ] Expression synthesis (2.7)
[ ] Minimum 3 candidates with ≥3 variants each
[ ] LAYER_2_COMPLETE.yaml created
[ ] MODEL: opus (Fix 10)

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
[ ] Downstream handoff prepared (mechanism, promise, big_idea)
[ ] Integration guidance documented
[ ] Output synthesis complete
[ ] root-cause-package.yaml written with ALL required sections
[ ] ROOT-CAUSE-SUMMARY.md written with ALL required sections
[ ] execution-log.md written showing all 23 microskills
[ ] Gate statuses are valid only — no invented statuses (Fix 9)
[ ] MODEL: sonnet (Fix 10)

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All 3 output files verified (YAML + Summary + Log)
[ ] All downstream handoffs populated (mechanism, promise, big_idea)
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] DO NOT trust summary claims about layer completion
[ ] RE-READ PROJECT-STATE.md for current position
[ ] RE-READ checkpoint files
[ ] VERIFY candidate counts from actual output
[ ] If derivation was skipped, RETURN to Layer 1
```

---

## STRUCTURAL FIX 7: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) was skipped entirely during execution — AI went directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition that transforms single-perspective output into multi-perspective elite output. This is the SAME degradation pattern as Research skip and Proof Discovery skip: AI finds a "shortcut" that eliminates the highest-value step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/03-root-cause/checkpoints/ARENA_COMPLETE.yaml
```

This file is created ONLY after:
1. All 7 competitors have generated across 3 rounds
2. Adversarial critique completed each round
3. Targeted revision completed each round
4. All candidates scored against 7 criteria
5. Post-arena synthesis complete (2-3 hybrids)
6. Human selection received (BLOCKING)

### ARENA_COMPLETE.yaml Format

```yaml
# ARENA_COMPLETE.yaml
layer: "2.5"
skill: "03-root-cause"
status: COMPLETE
timestamp: "[ISO 8601]"

arena_execution:
  rounds_completed: 3
  competitors_per_round: 7
  critique_phases_completed: 3
  revision_phases_completed: 3
  hybrids_created: [number]

human_selection:
  selected_candidate: "[name]"
  selection_type: "[pure | hybrid]"
  selected_from_persona: "[persona name or 'synthesizer']"
  timestamp: "[ISO 8601]"

verification:
  all_7_competitors_generated: true
  all_3_rounds_completed: true
  critique_before_scoring: true
  human_selection_received: true
```

### Checkpoint Progression (Updated)

```
LAYER_1_COMPLETE.yaml → LAYER_2_COMPLETE.yaml → ARENA_COMPLETE.yaml → LAYER_3_COMPLETE.yaml → LAYER_4_COMPLETE
```

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

### Arena-Specific MC-CHECK Addition

Add to RC-MC-CHECK at Layer 2→3 transition:

```yaml
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
```

---

## STRUCTURAL FIX 8: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which layers completed and what candidates were selected is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/03-root-cause/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
│   ├── LAYER_1_COMPLETE.yaml
│   ├── LAYER_2_COMPLETE.yaml
│   ├── ARENA_COMPLETE.yaml
│   └── LAYER_3_COMPLETE.yaml
├── execution-log.md          # Detailed execution record
├── root-cause-package.yaml   # PRIMARY OUTPUT
└── ROOT-CAUSE-SUMMARY.md     # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "03-root-cause"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  research_final_handoff: [true/false]
  proof_final_handoff: [true/false]
  brief: [true/false]
niche: "[golf | health | weight_loss | finance | business]"
expression_method: "[simple_reframe | named_syndrome | villain_personification | etc.]"
root_cause_candidates: []  # Populated by Layer 1
selected_candidate: ""     # Populated by Arena
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 9: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

### The Problem
Previous skills had models invent gate statuses like "PARTIAL_PASS" and "CONDITIONAL_PASS" — statuses that don't exist. This same vulnerability applies to root cause: a model could invent "APPROVED_WITH_CONCERNS" or "CONDITIONAL_APPROVAL" to bypass validation.

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

## STRUCTURAL FIX 10: MODEL SELECTION + PERSONA ASSIGNMENTS

### The Fix

**Binding Model Assignment Table for Root Cause:**

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure setup | haiku | File creation only |
| 0 | Input validation + RSF loading | haiku | Simple validation |
| 1 | Derivation (7 microskills) | opus | Deep analysis — pattern recognition, convergence, hidden layers |
| 2 | Expression (7 microskills) | opus | Creative framing — requires nuanced niche understanding |
| 2.5 | Arena (7 competitors × 3 rounds) | opus | Competitive generation — maximum quality required |
| 3 | Validation (5 microskills) | opus | Judgment-heavy scoring |
| 4 | Output packaging | sonnet | Assembly from existing content |

**Root cause is almost entirely opus.** Derivation, expression, arena, and validation all require deep reasoning. Only infrastructure and final packaging can use lower tiers.

---

## STRUCTURAL FIX 11: STALE ARTIFACT CLEANUP

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing root-cause-package.yaml or ROOT-CAUSE-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/root-cause-package.yaml (root — from failed attempts)
     - [project]/03-root-cause/root-cause-package.yaml (correct location)
     - [project]/outputs/root-cause-package.yaml (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 12: CONCEPT CHECKPOINT GATE (v3.0)

### The Problem
Root Cause v3.x generated concepts AND expressions simultaneously. Good naming propped up weak concepts. Anthony couldn't evaluate strategic thinking without creative packaging bias. Expression work was wasted when the underlying concept was wrong.

### The Fix

**Phase B (Expression & Naming) CANNOT execute unless this file exists:**
```
[project]/03-root-cause/checkpoints/CONCEPT_APPROVED.yaml
```

This file is created ONLY when:
1. Phase A generated 3-5 root cause concepts in plain language
2. Concepts were presented WITHOUT expression methods or naming
3. Anthony reviewed and approved 1+ concepts
4. CONCEPT_APPROVED.yaml was written with approved concept IDs

### CONCEPT_APPROVED.yaml Format

```yaml
# CONCEPT_APPROVED.yaml
skill: "03-root-cause"
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
LAYER_1_COMPLETE.yaml → CONCEPT_APPROVED.yaml → LAYER_2_COMPLETE.yaml → ARENA_COMPLETE.yaml → LAYER_3_COMPLETE.yaml
```

**CONCEPT_APPROVED.yaml sits between LAYER_1 and LAYER_2. Layer 2 (Expression) is BLOCKED without it.**

### Forbidden Rationalizations (Concept Checkpoint)

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "concept is obvious" | Even obvious concepts need human validation | HALT — Present to human |
| "only one viable concept" | Present it anyway — human may disagree or redirect | HALT — Present to human |
| "expression will clarify the concept" | Expression MASKS weak concepts — evaluate concept FIRST | HALT — Present plain language |
| "I'll just present the named version" | Naming biases evaluation — plain language ONLY in Phase A | HALT — Remove names |
| "human approval slows things down" | Quality over speed. Concept approval is non-negotiable. | HALT — Present to human |
| "the concept is just the root cause from research" | Concept must be DERIVED through analysis, not assumed from upstream | HALT — Execute derivation |

---

## STRUCTURAL FIX 13: SOUL.MD LOADING GATE (v3.0)

### The Problem
Without taste constraints, root cause expressions default to generic AI patterns that don't match the campaign voice.

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
      - Expression methods must match voice register
      - Anti-voice patterns are FORBIDDEN in all output
      - Energy signature constrains emotional intensity

  IF soul_md_exists == N:
    WARNING: "No Soul.md found — generation will lack taste constraints"
    FLAG: All outputs flagged as "generated without Soul.md"
    PROCEED: But document the absence
```

### MC-CHECK Enhancement for Soul.md

Add to RC-MC-CHECK:

```yaml
soul_md_check:
  soul_md_loaded_this_session: [Y/N]
  if_no_and_exists: "HALT — Load Soul.md before proceeding"
  anti_voice_patterns_in_output: [Y/N]
  if_yes: "HALT — Output contains anti-voice patterns. Rewrite."
```

---

## STRUCTURAL FIX 14: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol — BEFORE any root cause execution:**

```
SESSION STARTUP:
  1. READ this file (ROOT-CAUSE-ANTI-DEGRADATION.md) — MANDATORY
  2. READ ROOT-CAUSE-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin root cause execution without reading this anti-degradation file first.
```

---

## KEY INSIGHT

> **"Root cause is DERIVED, not assumed. External, not internal. Counter-intuitive, not obvious. And COMPETITION-TESTED, not single-perspective."**

The Root Cause skill has 4 layers + Arena for a reason:
- Layer 1: Map the surface (what they think, what they've tried)
- Layer 2: DISCOVER the real root cause through multiple approaches
- **Layer 2.5: COMPETE — 7 personas, 3 rounds, adversarial critique, human selection**
- Layer 3: VALIDATE the human-selected root cause meets all 10 rules
- Layer 4: Package for downstream skills

Skipping derivation means producing generic root causes that don't shift worldview.
**Skipping Arena means producing single-perspective root causes that lack competitive quality.**

---

## Per-Microskill Output Protocol (v3.2)

**Added:** 2026-02-12
**Reference:** CLAUDE-CORE.md § MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | L0-input-validation | layer-0-outputs/L0-input-validation.md | 1KB min |
| 0 | 0.2-vault-intelligence-loader | layer-0-outputs/0.2-vault-intelligence-loader.md | 1KB min |
| 0 | 0.2.5-specimen-decomposer | layer-0-outputs/0.2.5-specimen-decomposer.md | 1KB min |
| 0 | 0.2.8-tier1-expression-reference | layer-0-outputs/0.2.8-tier1-expression-reference.json | 2KB min |
| 1 | 1.1-research-pattern-analysis | layer-1-outputs/1.1-research-pattern-analysis.md | 3KB min |
| 1 | 1.2-symptom-convergence | layer-1-outputs/1.2-symptom-convergence.md | 3KB min |
| 1 | 1.3-false-belief-identification | layer-1-outputs/1.3-false-belief-identification.md | 3KB min |
| 1 | 1.4-hidden-layer-discovery | layer-1-outputs/1.4-hidden-layer-discovery.md | 3KB min |
| 1 | 1.5-mechanism-constraint-check | layer-1-outputs/1.5-mechanism-constraint-check.md | 2KB min |
| 1 | 1.6-proof-constraint-check | layer-1-outputs/1.6-proof-constraint-check.md | 2KB min |
| 1 | 1.7-derivation-synthesis | layer-1-outputs/1.7-derivation-synthesis.md | 5KB min |
| 2 | 2.1-simple-reframe | layer-2-outputs/2.1-simple-reframe.md | 3KB min |
| 2 | 2.2-named-syndrome | layer-2-outputs/2.2-named-syndrome.md | 3KB min |
| 2 | 2.3-villain-personification | layer-2-outputs/2.3-villain-personification.md | 3KB min |
| 2 | 2.4-metaphor-construction | layer-2-outputs/2.4-metaphor-construction.md | 3KB min |
| 2 | 2.5-dual-problem-framing | layer-2-outputs/2.5-dual-problem-framing.md | 3KB min |
| 2 | 2.6-niche-expression-matching | layer-2-outputs/2.6-niche-expression-matching.md | 3KB min |
| 2 | 2.7-expression-synthesis | layer-2-outputs/2.7-expression-synthesis.md | 5KB min |
| 2 | 2.8-expression-anchoring-score | layer-2-outputs/2.8-expression-anchoring-scores.json | 3KB min |
| 3 | 3.1-truth-validation | layer-3-outputs/3.1-truth-validation.md | 3KB min |
| 3 | 3.2-mechanism-alignment | layer-3-outputs/3.2-mechanism-alignment.md | 2KB min |
| 3 | 3.3-proof-availability | layer-3-outputs/3.3-proof-availability.md | 2KB min |
| 3 | 3.4-audience-resonance | layer-3-outputs/3.4-audience-resonance.md | 2KB min |
| 3 | 3.5-validation-synthesis | layer-3-outputs/3.5-validation-synthesis.md | 3KB min |
| 4 | 4.1-copy-block-formatting | layer-4-outputs/4.1-copy-block-formatting.md | 5KB min |
| 4 | 4.2-downstream-handoff | layer-4-outputs/4.2-downstream-handoff.md | 5KB min |
| 4 | 4.3-integration-guidance | layer-4-outputs/4.3-integration-guidance.md | 3KB min |
| 4 | 4.4-output-synthesis | layer-4-outputs/4.4-output-synthesis.md | 5KB min |

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
| 3.1 | 2026-02-23 | EXPRESSION ANCHORING PROTOCOL: Added 0.2.8-tier1-expression-reference (2KB min) and 2.8-expression-anchoring-scores (3KB min) to per-microskill output table. Shared protocol: Skills/protocols/EXPRESSION-ANCHORING-PROTOCOL.md. Scores expression variants against audience research quotes (40%), TIER1 patterns (30%), and FSSIT echo (30%). Adds quote-first generation to Phase B. |
| 3.0 | 2026-02-14 | CONCEPT/NAMING SEPARATION + SOUL.MD: Added STRUCTURAL FIX 12 (Concept Checkpoint Gate) — Phase B Expression cannot execute without CONCEPT_APPROVED.yaml. Includes gate file format, 6 concept-specific forbidden rationalizations. Added STRUCTURAL FIX 13 (Soul.md Loading Gate) — mandatory Soul.md check at pre-execution with voice/energy/anti-voice extraction. MC-CHECK enhanced with soul_md_check block. Implementation checklist restructured: Layer 1 → "Phase A (Concept Discovery)", new CONCEPT CHECKPOINT section with 6 items, Layer 2 → "Phase B (Expression — approved concepts only)", Soul.md loading added to pre-execution and Layer 0. Checkpoint progression updated to include CONCEPT_APPROVED.yaml between LAYER_1 and LAYER_2. Old Fix 12 (Anti-Degradation Mandatory Read) renumbered to Fix 14. |
| 2.1 | 2026-02-12 | Added Per-Microskill Output Protocol (v3.2) — complete output file table for all 26 microskills across Layers 0, 1, 2, 3, and 4. Layer gate enhancement, execution log enhancement, forbidden behaviors. |
| 2.0 | 2026-02-12 | 5 new structural fixes from Research/Proof propagation pattern. Fix 8: Mandatory project infrastructure (PROJECT-STATE.md + PROGRESS-LOG.md). Fix 9: Binary gate enforcement with forbidden statuses (PARTIAL_PASS, CONDITIONAL_PASS, approved_with_concerns, etc.). Fix 10: Model selection + persona assignments (binding table — opus for derivation/expression/arena/validation, sonnet for packaging, haiku for infrastructure). Fix 11: Stale artifact cleanup (search-and-delete before writing replacements). Fix 12: Anti-degradation mandatory read at session startup. Implementation checklist expanded with pre-execution and post-execution steps. |
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added STRUCTURAL FIX 7 — Arena Layer (2.5) cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations (6 entries). Added Arena verification to RC-MC-CHECK. Updated Implementation Checklist with full Arena checklist (16 items). Updated checkpoint progression to include ARENA_COMPLETE.yaml between LAYER_2 and LAYER_3. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
