# ROOT-CAUSE-NARRATIVE-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
**Purpose:** STRUCTURAL enforcement to prevent root cause narrative skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: ROOT-CAUSE-NARRATIVE-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Internalize blame to the reader, reveal root cause before establishing authority, or skip the three-part structure.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates narratives WITHOUT loading type-matched specimens
- AI skips the three-part structure requirement
- AI reveals root cause BEFORE establishing authority (Rule #9 violation)
- AI internalizes blame to the reader (Rule #1 violation)
- AI skips the 10 critical rules validation
- AI produces narratives without memorable anchor phrase
- AI selects narrative without human approval

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/13-root-cause-narrative/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/13-root-cause-narrative/checkpoints/LAYER_2_COMPLETE.yaml
[project]/13-root-cause-narrative/checkpoints/ARENA_COMPLETE.yaml
```

**Full Checkpoint Progression:**
```
[project]/13-root-cause-narrative/checkpoints/LAYER_0_COMPLETE.yaml  # Human confirms root cause
[project]/13-root-cause-narrative/checkpoints/LAYER_1_COMPLETE.yaml
[project]/13-root-cause-narrative/checkpoints/LAYER_2_COMPLETE.yaml
[project]/13-root-cause-narrative/checkpoints/ARENA_COMPLETE.yaml
[project]/13-root-cause-narrative/checkpoints/LAYER_3_COMPLETE.yaml
[project]/13-root-cause-narrative/HUMAN_SELECTION.yaml  # BLOCKING
```

### LAYER 0 HUMAN CHECKPOINT (BLOCKING)

```yaml
# LAYER_0_COMPLETE.yaml
# Created ONLY when human confirms root cause to use

human_checkpoint:
  root_cause_confirmed: true
  confirmed_by: "human"
  timestamp: "[ISO 8601]"
  root_cause_selected: "[exact root cause from 03-root-cause package]"

  IF root_cause_confirmed != true:
    HALT — "Cannot proceed without human confirmation of root cause"
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **Three-part structure** | 3/3 | HALT — Include all parts |
| **10 critical rules** | 10/10 | HALT — Fix violations |
| **Anchor phrase** | Present & memorable | HALT — Create anchor |
| **Reframe techniques** | 2 minimum | HALT — Add reframes |
| **Arena personas** | 6/6 | HALT — All generate |
| **Human selection** | BLOCKING | HALT — Get selection |

### The Three-Part Structure (MANDATORY)

Every root cause narrative MUST communicate:

```yaml
three_part_structure:
  what_they_think:
    present: [Y/N]
    content: "[The false belief]"

  what_real:
    present: [Y/N]
    content: "[The counter-intuitive root cause]"

  why_nothing_worked:
    present: [Y/N]
    content: "[Traced to addressing symptoms]"

  IF any_part.present == N:
    HALT — "All 3 parts of structure required"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "two parts communicate enough" | Three-part structure is MANDATORY | HALT — Add missing part |
| "authority can come after reveal" | Authority MUST precede reveal (Rule #9) | HALT — Resequence |
| "subtle blame is okay" | All blame must be EXTERNAL (Rule #1) | HALT — Externalize |
| "anchor phrase will emerge" | Anchor must be DESIGNED | HALT — Create anchor |
| "8/10 rules is strong" | 10/10 rules required | HALT — Fix violations |

---

## STRUCTURAL FIX 4: THE 10 CRITICAL RULES GATE

### All 10 Rules MUST Pass

| Rule | Requirement | Validation |
|------|-------------|------------|
| 1 | Root cause is EXTERNAL | Does it blame something outside reader? |
| 2 | Explains ALL past failures | Accounts for why everything failed? |
| 3 | More specific than false belief | More concrete than what they think? |
| 4 | Creates clear path to solution | Naturally leads to mechanism? |
| 5 | Pairs with villain | Specific external villain identified? |
| 6 | Counter-intuitive | Would it surprise the prospect? |
| 7 | Woven throughout | Can be referenced repeatedly? |
| 8 | Has memorable anchor phrase | Quotable phrase exists? |
| 9 | Authority before reveal | Credibility established first? |
| 10 | Kills competitor solutions | Invalidates other approaches? |

```yaml
ten_rules_validation:
  rule_1_external: [PASS | FAIL]
  rule_2_explains_failures: [PASS | FAIL]
  rule_3_specific: [PASS | FAIL]
  rule_4_path_to_solution: [PASS | FAIL]
  rule_5_villain: [PASS | FAIL]
  rule_6_counter_intuitive: [PASS | FAIL]
  rule_7_woven: [PASS | FAIL]
  rule_8_anchor_phrase: [PASS | FAIL]
  rule_9_authority_first: [PASS | FAIL]
  rule_10_kills_competitors: [PASS | FAIL]

  total_passing: [number]
  required: 10

  IF total_passing < 10:
    HALT — "All 10 critical rules must pass"
    failures: [list failed rules]
```

---

## STRUCTURAL FIX 5: AUTHORITY-BEFORE-REVEAL GATE

### The Problem
AI reveals the root cause before establishing why the reader should believe the messenger.

### The Fix

**SEQUENCE VALIDATION:**

```yaml
sequence_validation:
  authority_establishment:
    position_in_narrative: "[early | middle | late]"
    type: "[qualification | experience | social_proof | institutional]"
    established_before_reveal: [Y/N]

  root_cause_reveal:
    position_in_narrative: "[early | middle | late]"
    comes_after_authority: [Y/N]

  IF comes_after_authority == N:
    HALT — "Rule #9 violation: Authority must be established BEFORE root cause reveal"
    ACTION: "Move authority establishment earlier OR move reveal later"
```

---

## STRUCTURAL FIX 6: RC-NARRATIVE-SPECIFIC MC-CHECK

```yaml
RC-NARRATIVE-MC-CHECK:
  timestamp: "[current time]"

  human_checkpoint_verification:
    root_cause_confirmed_by_human: [Y/N]
    if_no: "STOP — Human must confirm root cause before narrative begins"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  structure_verification:
    what_they_think_present: [Y/N]
    what_real_present: [Y/N]
    why_nothing_worked_present: [Y/N]
    if_any_no: "STOP — Three-part structure required"

  rules_verification:
    rules_passing: [number]
    if_under_10: "STOP — All 10 rules must pass"

    rule_1_blame_external: [Y/N]
    if_no: "🛑 CRITICAL: Rule #1 violation — blame must be external"

    rule_9_authority_first: [Y/N]
    if_no: "🛑 CRITICAL: Rule #9 violation — authority must precede reveal"

  anchor_verification:
    anchor_phrase_exists: [Y/N]
    anchor_is_memorable: [Y/N]
    if_any_no: "STOP — Memorable anchor phrase required"

  result: [CONTINUE | HALT_HUMAN | HALT_SPECIMENS | HALT_STRUCTURE | HALT_RULES | HALT_ANCHOR]
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 8, 11):
[ ] ROOT-CAUSE-NARRATIVE-ANTI-DEGRADATION.md read (THIS FILE)
[ ] ROOT-CAUSE-NARRATIVE-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 10)
[ ] Input files validated (03-root-cause package, campaign-brief)

LAYER 0 (FOUNDATION + HUMAN CHECKPOINT):
[ ] Upstream packages loaded (03-root-cause, campaign-brief)
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Root cause package reviewed
[ ] HUMAN CONFIRMS root cause to use
[ ] LAYER_0_COMPLETE.yaml created (with human confirmation)

LAYER 1 (CLASSIFICATION):
[ ] Communication type classified
[ ] Vault reference identified
[ ] Framing pattern selected
[ ] Type-matched specimens loaded VERBATIM
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (DRAFT):
[ ] All 7 phases drafted
[ ] Authority established BEFORE reveal
[ ] Three-part structure present
[ ] Anchor phrase created
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

LAYER 3 (REFINEMENT):
[ ] Evidence woven (not cited)
[ ] Minimum 2 reframe techniques stacked
[ ] Threading guide complete
[ ] All 10 rules validated (10/10)
[ ] Anti-slop passed
[ ] Score >= 7.0
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION & SELECTION):
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created
[ ] root-cause-narrative-package.json created
[ ] ROOT-CAUSE-NARRATIVE-SUMMARY.md created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY human confirmed root cause (LAYER_0)
[ ] VERIFY specimens loaded
[ ] VERIFY three-part structure
[ ] VERIFY 10/10 rules pass
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"Root cause narrative that blames the reader destroys rapport. Reveal before authority has no weight. Without anchor phrase, nothing is quotable."**

---

## STRUCTURAL FIX 7: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 2-round + audience evaluation competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/13-root-cause-narrative/checkpoints/ARENA_COMPLETE.yaml
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
skill: "13-root-cause-narrative"
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
[project]/13-root-cause-narrative/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
├── execution-log.md          # Detailed execution record
├── root-cause-narrative-package.json  # PRIMARY OUTPUT
└── ROOT-CAUSE-NARRATIVE-SUMMARY.md    # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "13-root-cause-narrative"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  root_cause_package: [Y/N]
  campaign_brief: [Y/N]
  proof_inventory: [Y/N]
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

BEFORE writing root-cause-narrative-package.json or ROOT-CAUSE-NARRATIVE-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/root-cause-narrative-package.json (root — from failed attempts)
     - [project]/13-root-cause-narrative/root-cause-narrative-package.json (correct location)
     - [project]/outputs/root-cause-narrative-package.json (wrong path)
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

**Session startup protocol — BEFORE any root cause narrative execution:**

```
SESSION STARTUP:
  1. READ this file (ROOT-CAUSE-NARRATIVE-ANTI-DEGRADATION.md) — MANDATORY
  2. READ ROOT-CAUSE-NARRATIVE-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin root cause narrative execution without reading this anti-degradation file first.
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
| 0 | 0.2-tier1-intelligence-loader | layer-0-outputs/0.2-tier1-intelligence-loader.md | 1KB |
| 0 | 0.2-vault-intelligence-loader | layer-0-outputs/0.2-vault-intelligence-loader.md | 1KB |
| 0 | 0.2.5-specimen-decomposer | layer-0-outputs/0.2.5-specimen-decomposer.md | 1KB |
| 0 | 0.2.6-curated-gold-specimens | layer-0-outputs/0.2.6-specimen-loading.md | 2KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 0 | 0.4-human-checkpoint-curator | layer-0-outputs/0.4-human-checkpoint.md | 1KB |
| 1 | 1.1-communication-type-classifier | layer-1-outputs/1.1-communication-type-classifier.md | 3KB |
| 1 | 1.2-framing-pattern-selector | layer-1-outputs/1.2-framing-pattern-selector.md | 3KB |
| 1 | 1.3-emotional-arc-designer | layer-1-outputs/1.3-emotional-arc-designer.md | 3KB |
| 1 | 1.4-narrative-sequence-mapper | layer-1-outputs/1.4-narrative-sequence-mapper.md | 3KB |
| 2 | 2.1-problem-agitation-writer | layer-2-outputs/2.1-problem-agitation.md | 5KB |
| 2 | 2.2-root-cause-revelation-writer | layer-2-outputs/2.2-root-cause-revelation.md | 5KB |
| 2 | 2.3-failure-explanation-writer | layer-2-outputs/2.3-failure-explanation.md | 5KB |
| 2 | 2.4-countersell-bridge-writer | layer-2-outputs/2.4-countersell-bridge.md | 5KB |
| 3 | 3.1-evidence-integration-calibrator | layer-3-outputs/3.1-evidence-integration.md | 3KB |
| 3 | 3.2-reframe-stacking-optimizer | layer-3-outputs/3.2-reframe-stacking.md | 3KB |
| 3 | 3.3-transition-flow-polisher | layer-3-outputs/3.3-transition-flow.md | 3KB |
| 3 | 3.4-threading-guide-generator | layer-3-outputs/3.4-threading-guide.md | 3KB |
| 4 | 4.1-critical-rules-checker | layer-4-outputs/4.1-critical-rules-check.md | 3KB |
| 4 | 4.2-anti-slop-validator | layer-4-outputs/4.2-anti-slop-validation.md | 3KB |
| 4 | 4.3-vault-pattern-comparator | layer-4-outputs/4.3-vault-pattern-comparison.md | 3KB |
| 4 | 4.4-final-narrative-assembler | layer-4-outputs/4.4-final-narrative-assembly.md | 5KB |

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
| 2.0 | 2026-02-14 | 4 STRUCTURAL FIXES (8-11): Mandatory Project Infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md, checkpoints/), Binary Gate Enforcement (forbidden statuses — PARTIAL_PASS, CONDITIONAL_PASS trigger HALT), Stale Artifact Cleanup (search and delete before writing replacements), Anti-Degradation Mandatory Read (session startup protocol). Updated Implementation Checklist with PRE-EXECUTION and POST-EXECUTION sections. Propagation fix from Skills 01-04 to ensure operational consistency. |
| 1.2 | 2026-02-12 | PER-MICROSKILL OUTPUT PROTOCOL: Added v3.2 per-microskill output table with 24 required output files across 5 layers (7 Layer 0, 4 Layer 1, 4 Layer 2, 4 Layer 3, 4 Layer 4 + 1 assembly). Layer gate enhancement, execution log enhancement, forbidden behaviors for per-microskill compliance. |
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
