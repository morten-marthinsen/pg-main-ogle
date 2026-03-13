# MECHANISM-NARRATIVE-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
**Purpose:** STRUCTURAL enforcement to prevent mechanism narrative skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: MECHANISM-NARRATIVE-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Use hedge words, skip the metaphor anchor or dramatic naming moment, or present proof as bullet lists instead of woven narrative.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates narratives WITHOUT loading type-matched specimens
- AI skips the 6-phase unit structure
- AI produces mechanism without dramatic naming moment
- AI skips metaphor anchor (mechanism incomprehensible)
- AI skips "Think about it" simplification moment
- AI presents proof as bullet lists instead of woven narrative
- AI uses hedge words ("may," "could," "potentially")
- AI selects narrative without human approval

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/14-mechanism-narrative/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/14-mechanism-narrative/checkpoints/LAYER_2_COMPLETE.yaml
[project]/14-mechanism-narrative/checkpoints/ARENA_COMPLETE.yaml
```

**Full Checkpoint Progression:**
```
[project]/14-mechanism-narrative/checkpoints/LAYER_0_COMPLETE.yaml  # Human confirms mechanism
[project]/14-mechanism-narrative/checkpoints/LAYER_1_COMPLETE.yaml
[project]/14-mechanism-narrative/checkpoints/LAYER_2_COMPLETE.yaml
[project]/14-mechanism-narrative/checkpoints/ARENA_COMPLETE.yaml
[project]/14-mechanism-narrative/checkpoints/LAYER_3_COMPLETE.yaml
[project]/14-mechanism-narrative/HUMAN_SELECTION.yaml  # BLOCKING
```

### LAYER 0 HUMAN CHECKPOINT (BLOCKING)

```yaml
# LAYER_0_COMPLETE.yaml

human_checkpoint:
  mechanism_confirmed: true
  confirmed_by: "human"
  timestamp: "[ISO 8601]"
  mechanism_name: "[exact name from 04-mechanism package]"

  IF mechanism_confirmed != true:
    HALT — "Cannot proceed without human confirmation of mechanism"
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **6 phases present** | 6/6 | HALT — Complete all phases |
| **Metaphor anchor** | 1 graspable | HALT — Create metaphor |
| **"Think about it" moment** | Present | HALT — Add simplification |
| **Naming moment** | Dramatic | HALT — Create anticipation |
| **Hedge words** | 0 | HALT — Remove all |
| **Arena personas** | 6/6 | HALT — All generate |
| **12-year-old test** | Pass | HALT — Simplify |

### The 6-Phase Unit Structure (MANDATORY)

```yaml
six_phase_structure:
  phase_1_problem_amplification:
    present: [Y/N]
    escalates_beyond_root_cause: [Y/N]

  phase_2_root_cause_bridge:
    present: [Y/N]
    connects_root_cause_to_mechanism: [Y/N]

  phase_3_naming_reveal:
    present: [Y/N]
    has_anticipation_buildup: [Y/N]
    naming_is_dramatic: [Y/N]

  phase_4_mechanism_explanation:
    present: [Y/N]
    uses_metaphor_anchor: [Y/N]
    uses_think_about_it: [Y/N]
    escalates_simple_to_complex: [Y/N]

  phase_5_proof_integration:
    present: [Y/N]
    proof_is_woven: [Y/N]  # NOT bullet lists
    institutional_stacking_OR_escalating: [Y/N]

  phase_6_product_bridge:
    present: [Y/N]
    transitions_to_product: [Y/N]

  IF any_phase.present == N:
    HALT — "All 6 phases required"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "5 phases is enough" | 6-phase structure is MANDATORY | HALT — Add missing phase |
| "metaphor is optional" | Metaphor is REQUIRED for comprehension | HALT — Create metaphor |
| "readers understand technical" | 12-year-old test is mandatory | HALT — Simplify |
| "proof list is clearer" | Proof must be WOVEN into narrative | HALT — Rewrite |
| "hedge words are safe" | Hedge words kill believability | HALT — Remove all |
| "naming happens naturally" | Naming moment must be DRAMATIC | HALT — Build anticipation |

---

## STRUCTURAL FIX 4: HEDGE WORD GATE

### The Problem
AI uses hedge words that undermine mechanism credibility.

### The Fix

**ZERO HEDGE WORDS ALLOWED:**

```yaml
hedge_word_scan:
  forbidden_words:
    - "may"
    - "might"
    - "could"
    - "potentially"
    - "possibly"
    - "perhaps"
    - "it seems"
    - "appears to"
    - "tends to"
    - "can sometimes"

  scan_result:
    hedge_words_found: [list]
    count: [number]

  IF count > 0:
    HALT — "Zero hedge words allowed in mechanism narrative"
    words_to_remove: [list]
    suggested_replacements:
      "may help" → "helps"
      "could reduce" → "reduces"
      "might improve" → "improves"
```

---

## STRUCTURAL FIX 5: METAPHOR ANCHOR GATE

### The Problem
AI explains mechanisms technically without graspable mental image.

### The Fix

**MANDATORY METAPHOR ANCHOR:**

```yaml
metaphor_validation:
  metaphor_present: [Y/N]
  metaphor_text: "[the metaphor used]"

  metaphor_criteria:
    everyday_object_or_concept: [Y/N]  # Switch, valve, key, door, etc.
    visual_and_graspable: [Y/N]
    explains_function: [Y/N]
    12_year_old_would_understand: [Y/N]

  IF metaphor_present == N:
    HALT — "Mechanism must have metaphor anchor"

  IF any_criteria == N:
    HALT — "Metaphor fails criteria: [which one]"

  good_metaphor_examples:
    - "AMPK acts like an on-off switch"
    - "HSL is like a one-way valve"
    - "Think of it like a key that fits only one lock"
    - "Imagine your metabolism has a dimmer switch"
```

---

## STRUCTURAL FIX 6: NAMING MOMENT GATE

### The Problem
AI introduces mechanism name without dramatic buildup.

### The Fix

**DRAMATIC NAMING VALIDATION:**

```yaml
naming_moment_validation:
  naming_position_in_narrative: "[early | middle | late]"

  anticipation_buildup:
    teased_before_reveal: [Y/N]
    curiosity_created: [Y/N]
    reveal_feels_earned: [Y/N]

  naming_structure:
    has_anticipation_phrase: [Y/N]  # "I call it...", "Scientists named it...", "It's called..."
    name_stands_alone: [Y/N]  # Not buried in sentence

  IF any_element == N:
    HALT — "Naming moment must be dramatic with anticipation"

  good_naming_examples:
    - "After months of research, I finally understood what was happening. I call it the [NAME]."
    - "Scientists have a name for this phenomenon: the [NAME]."
    - "There's a reason nothing worked before. It's called [NAME]."
```

---

## STRUCTURAL FIX 7: MECH-NARRATIVE-SPECIFIC MC-CHECK

```yaml
MECH-NARRATIVE-MC-CHECK:
  timestamp: "[current time]"

  human_checkpoint_verification:
    mechanism_confirmed_by_human: [Y/N]
    if_no: "STOP — Human must confirm mechanism before narrative begins"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  structure_verification:
    phases_present: [number]
    if_under_6: "STOP — All 6 phases required"

  metaphor_verification:
    metaphor_present: [Y/N]
    passes_12yo_test: [Y/N]
    if_any_no: "STOP — Metaphor anchor required"

  naming_verification:
    naming_moment_dramatic: [Y/N]
    has_anticipation: [Y/N]
    if_any_no: "STOP — Naming moment must be dramatic"

  hedge_word_verification:
    hedge_words_found: [number]
    if_above_0: "STOP — Zero hedge words allowed"

  think_about_it_verification:
    simplification_moment_present: [Y/N]
    if_no: "STOP — 'Think about it' simplification required"

  proof_verification:
    proof_woven: [Y/N]
    proof_as_lists: [Y/N]
    if_proof_as_lists: "STOP — Proof must be woven, not listed"

  result: [CONTINUE | HALT_HUMAN | HALT_SPECIMENS | HALT_STRUCTURE | HALT_METAPHOR | HALT_NAMING | HALT_HEDGE | HALT_PROOF]
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 9, 12):
[ ] MECHANISM-NARRATIVE-ANTI-DEGRADATION.md read (THIS FILE)
[ ] MECHANISM-NARRATIVE-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 11)
[ ] Input files validated (04-mechanism package, campaign-brief, root-cause-narrative package)

LAYER 0 (FOUNDATION + HUMAN CHECKPOINT):
[ ] Upstream packages loaded (04-mechanism, campaign-brief)
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Mechanism package reviewed
[ ] HUMAN CONFIRMS mechanism to use
[ ] LAYER_0_COMPLETE.yaml created (with human confirmation)

LAYER 1 (CLASSIFICATION):
[ ] Narrative type classified
[ ] Simplification technique selected
[ ] Type-matched specimens loaded VERBATIM
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (DRAFT):
[ ] All 6 phases drafted
[ ] Phase 3 has dramatic naming moment
[ ] Phase 4 has metaphor anchor
[ ] Phase 4 has "Think about it" simplification
[ ] Phase 5 has proof WOVEN (not listed)
[ ] Zero hedge words
[ ] All 6 Arena personas generate
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
[ ] 12-year-old comprehension test passes
[ ] Proof fully integrated (not academic citations)
[ ] Anti-slop passed
[ ] Score >= 7.0
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION & SELECTION):
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created
[ ] mechanism-narrative-package.json created
[ ] MECHANISM-NARRATIVE-SUMMARY.md created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY human confirmed mechanism (LAYER_0)
[ ] VERIFY specimens loaded
[ ] VERIFY all 6 phases present
[ ] VERIFY zero hedge words
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"Mechanism without metaphor is incomprehensible. Naming without anticipation is forgettable. Hedge words kill believability."**

---

## STRUCTURAL FIX 8: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/14-mechanism-narrative/checkpoints/ARENA_COMPLETE.yaml
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

## STRUCTURAL FIX 9: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which layers completed and what candidates were selected is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/14-mechanism-narrative/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
├── execution-log.md          # Detailed execution record
├── mechanism-narrative-package.json   # PRIMARY OUTPUT
└── MECHANISM-NARRATIVE-SUMMARY.md     # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "14-mechanism-narrative"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  mechanism_package: [Y/N]
  campaign_brief: [Y/N]
  root_cause_narrative_package: [Y/N]
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 10: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

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

## STRUCTURAL FIX 11: STALE ARTIFACT CLEANUP

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing mechanism-narrative-package.json or MECHANISM-NARRATIVE-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/mechanism-narrative-package.json (root — from failed attempts)
     - [project]/14-mechanism-narrative/mechanism-narrative-package.json (correct location)
     - [project]/outputs/mechanism-narrative-package.json (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 12: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol — BEFORE any mechanism narrative execution:**

```
SESSION STARTUP:
  1. READ this file (MECHANISM-NARRATIVE-ANTI-DEGRADATION.md) — MANDATORY
  2. READ MECHANISM-NARRATIVE-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin mechanism narrative execution without reading this anti-degradation file first.
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
| 1 | 1.1-narrative-type-classifier | layer-1-outputs/1.1-narrative-type-classifier.md | 3KB |
| 1 | 1.2-framing-pattern-selector | layer-1-outputs/1.2-framing-pattern-selector.md | 3KB |
| 1 | 1.3-emotional-arc-designer | layer-1-outputs/1.3-emotional-arc-designer.md | 3KB |
| 1 | 1.4-explanation-sequence-mapper | layer-1-outputs/1.4-explanation-sequence-mapper.md | 3KB |
| 2 | 2.1-problem-amplification-writer | layer-2-outputs/2.1-problem-amplification.md | 5KB |
| 2 | 2.2-mechanism-naming-reveal-writer | layer-2-outputs/2.2-mechanism-naming-reveal.md | 5KB |
| 2 | 2.3-mechanism-explanation-writer | layer-2-outputs/2.3-mechanism-explanation.md | 5KB |
| 2 | 2.4-mechanism-proof-integrator | layer-2-outputs/2.4-mechanism-proof-integration.md | 5KB |
| 3 | 3.1-simplification-calibrator | layer-3-outputs/3.1-simplification-calibration.md | 3KB |
| 3 | 3.2-villain-mechanism-pairing | layer-3-outputs/3.2-villain-mechanism-pairing.md | 3KB |
| 3 | 3.3-product-bridge-constructor | layer-3-outputs/3.3-product-bridge.md | 3KB |
| 3 | 3.4-narrative-flow-polisher | layer-3-outputs/3.4-narrative-flow.md | 3KB |
| 4 | 4.1-e-level-alignment | layer-4-outputs/4.1-e-level-alignment.md | 3KB |
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
| 2.0 | 2026-02-14 | 4 STRUCTURAL FIXES (9-12): Mandatory Project Infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md, checkpoints/), Binary Gate Enforcement (forbidden statuses — PARTIAL_PASS, CONDITIONAL_PASS trigger HALT), Stale Artifact Cleanup (search and delete before writing replacements), Anti-Degradation Mandatory Read (session startup protocol). Updated Implementation Checklist with PRE-EXECUTION and POST-EXECUTION sections. Propagation fix from Skills 01-04 to ensure operational consistency. |
| 1.2 | 2026-02-12 | PER-MICROSKILL OUTPUT PROTOCOL: Added v3.2 per-microskill output table with 23 required output files across 5 layers (7 Layer 0, 4 Layer 1, 4 Layer 2, 4 Layer 3, 4 Layer 4). Layer gate enhancement, execution log enhancement, forbidden behaviors for per-microskill compliance. |
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
