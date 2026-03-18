# GATE-SYSTEM
**Quality Engine v4** | Component: Core
**Purpose:** Universal gate system defining quality checkpoints, structural enforcement, and pass/fail discipline
**Authority:** EQUAL to all skill/agent-level files
**System-Agnostic:** Works with Claude, Gemini, OpenAI, or any AI model

---

## TABLE OF CONTENTS

- [Why Gates Exist](#why-gates-exist)
- [Core Principle: PASS or FAIL](#core-principle-pass-or-fail)
- [Gate Types](#gate-types)
- [GATE_0: Read Declaration](#gate_0-read-declaration)
- [Phase/Layer Gates](#phaselayer-gates)
- [Skill-Level Gates](#skill-level-gates)
- [Arena Gates](#arena-gates)
- [Structural Enforcement](#structural-enforcement)
- [Gate Checkpoint YAML Format](#gate-checkpoint-yaml-format)
- [Forbidden Gate Statuses](#forbidden-gate-statuses)
- [Proportionality Calibration](#proportionality-calibration)
- [Gate Definitions: Examples](#gate-definitions-examples)
- [Implementing Gates in Your System](#implementing-gates-in-your-system)

---

## Why Gates Exist

Gates are the primary enforcement mechanism against execution degradation. Without gates:
- Skills claim completion without verification
- Quality drops silently as context grows
- Downstream consumers inherit upstream defects
- "Good enough" replaces "complete"

Gates convert subjective quality assessment into binary structural proof: a gate checkpoint file either exists on disk or it doesn't. There is no middle ground.

---

## Core Principle: PASS or FAIL

**Every gate in the Quality Engine resolves to exactly one of two states: PASS or FAIL.**

- **PASS:** All criteria met. Gate checkpoint file is created. Execution may proceed to next phase.
- **FAIL:** One or more criteria not met. Gate checkpoint file is NOT created. Execution halts for remediation.

There is nothing in between. There is nothing adjacent. There is nothing "close."

---

## Forbidden Gate Statuses

These statuses have been invented by LLMs under context pressure. They do not exist. If you find yourself writing any of these, HALT.

| Forbidden Status | Why It's Forbidden |
|-----------------|-------------------|
| `CONDITIONAL_PASS` | Does not exist. If conditions remain, it's a FAIL. |
| `PARTIAL_PASS` | Does not exist. Partial = incomplete = FAIL. |
| `PASS_WITH_CAVEATS` | Caveats = unresolved issues = FAIL. |
| `SOFT_PASS` | There is no soft. PASS or FAIL. |
| `PROVISIONAL_PASS` | Provisional = not verified = FAIL. |
| `PASS_PENDING_REVIEW` | If review hasn't happened, it hasn't passed. FAIL. |
| `NEAR_PASS` | Near = not there = FAIL. |
| `ACCEPTABLE` | Not a gate status. PASS or FAIL. |
| `SUFFICIENT` | Not a gate status. PASS or FAIL. |
| `MEETS_MINIMUM` | Not a gate status. Either it passes or it doesn't. |
| `WAIVED` | Gates cannot be waived by the model. Only the human operator can waive a gate, and the waiver must be recorded. |

**If an automated validator detects any forbidden status in a gate checkpoint file, the gate is invalid and must be re-evaluated.**

---

## Gate Types

### Gate Hierarchy

```
GATE_0 (Read Declaration)
  |
  +-- Phase/Layer Gates (one per phase boundary)
  |     |
  |     +-- Per-Unit Gates (optional, within phases)
  |
  +-- Skill-Level Gates (skill completion)
  |
  +-- Arena Gates (competitive refinement - if applicable)
```

Each gate type builds on the ones below it. A skill-level gate cannot pass if any phase gate underneath it has failed.

---

## GATE_0: Read Declaration

GATE_0 is the foundation of the entire gate system. It proves that the model read its instructions before executing.

### What GATE_0 Proves

1. The system-core file was read (not cached, not summarized)
2. The skill's anti-degradation file was read (not skipped)
3. The model wrote a declaration to an output file (structural proof)
4. The declaration references the correct filename and version (proves actual reading)

### GATE_0 Checkpoint Format

```yaml
gate: GATE_0
status: PASS
timestamp: "[ISO timestamp]"
anti_degradation:
  file_read: "[SKILL-NAME]-ANTI-DEGRADATION.md"
  version: "[version from file header]"
  declaration_written_to: "phase-0/[first-output-filename].md"
system_core:
  file_read: "SYSTEM-CORE.md"
  seven_laws_acknowledged: true
```

### Mandatory Read Declaration Template

This text MUST appear in the first output file before any work begins:

```
I HAVE READ THIS FILE: [FILENAME]-ANTI-DEGRADATION.md v[VERSION]
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules.
I WILL: Produce per-unit output files for every unit of work executed.
I WILL NOT: [skill-specific forbidden behaviors from the anti-degradation file]
```

### GATE_0 Verification

1. Check that `anti_degradation.file_read` matches the skill's actual AD filename
2. Check that `anti_degradation.version` matches the version in the AD file header
3. Check that `anti_degradation.declaration_written_to` points to a real file
4. Open that file and verify the declaration text exists
5. Verify the "I WILL NOT" line references specific forbidden behaviors (not generic text)

### Why This Exists

Instructional constraints ("read this file") CAN be ignored under context pressure. The declaration creates a STRUCTURAL proof artifact:
- If the declaration is missing from the first output, the file was not read and all outputs are suspect
- If the declaration has wrong version/filename, a cached or hallucinated version was used
- If the "I WILL NOT" line is generic, the file was skimmed, not read

---

## Phase/Layer Gates

Phase gates verify that all work within a phase is complete before proceeding to the next phase.

### Phase Gate Checkpoint Format

```yaml
gate: PHASE_[N]_COMPLETE
status: PASS
timestamp: "[ISO timestamp]"
phase: [N]
outputs:
  - file: "[output-1-filename]"
    size_bytes: [actual size]
    min_size_bytes: [threshold]
    size_check: PASS
  - file: "[output-2-filename]"
    size_bytes: [actual size]
    min_size_bytes: [threshold]
    size_check: PASS
all_units_executed: true
unit_count: [number]
all_outputs_exist: true
all_size_thresholds_met: true
gate_result: PASS
```

### Phase Gate Rules

1. **Every output file must be listed** with actual size and threshold
2. **Size check is per-file** — each must independently meet its threshold
3. **All units within the phase must have dedicated output files** — no combining
4. **The gate file itself is the proof** — if it doesn't exist on disk, the phase didn't pass
5. **Phase N gate must exist before Phase N+1 begins** — no skipping ahead

---

## Skill-Level Gates

Skill-level gates verify that the entire skill execution is complete.

### Skill Gate Checkpoint Format

```yaml
gate: SKILL_COMPLETE
status: PASS
timestamp: "[ISO timestamp]"
skill: "[skill name]"
version: "[skill version]"
phases_completed:
  - phase: 0
    gate_file: "checkpoints/PHASE_0_COMPLETE.yaml"
    verified: true
  - phase: 1
    gate_file: "checkpoints/PHASE_1_COMPLETE.yaml"
    verified: true
  - phase: 2
    gate_file: "checkpoints/PHASE_2_COMPLETE.yaml"
    verified: true
outputs:
  primary:
    file: "[primary-output-filename]"
    exists: true
    schema_valid: true
  summary:
    file: "[summary-filename]"
    exists: true
    sections_complete: true
  execution_log:
    file: "execution-log.md"
    exists: true
    all_units_logged: true
anti_degradation:
  gate_0_passed: true
  declaration_verified: true
  no_forbidden_statuses: true
gate_result: PASS
```

### Skill Gate Rules

1. **All phase gates must exist and be PASS** before skill gate can pass
2. **All three required outputs must exist** (primary, summary, execution log)
3. **GATE_0 declaration must be verified** in the first output file
4. **No forbidden gate statuses** found in any checkpoint file

---

## Arena Gates

Arena gates apply to skills that use competitive refinement (multiple rounds of generation, critique, and revision).

### Arena Gate Checkpoint Format

```yaml
gate: ARENA_COMPLETE
status: PASS
timestamp: "[ISO timestamp]"
rounds_completed: [number >= minimum required]
minimum_rounds_required: [number]
per_round:
  - round: 1
    entries_generated: [number]
    critique_completed: true
    revision_completed: true
  - round: 2
    entries_generated: [number]
    critique_completed: true
    revision_completed: true
    learning_applied: "[what was learned from round 1]"
  - round: 3
    entries_generated: [number]
    critique_completed: true
    revision_completed: true
    learning_applied: "[what was learned from round 2]"
winner_selection:
  method: "[human_selected | highest_scored]"
  winner_id: "[identifier]"
  score: [numeric]
  minimum_score: [threshold]
  score_check: PASS
gate_result: PASS
```

### Arena Gate Rules

1. **Minimum round count is non-negotiable** — "good enough after round 1" is forbidden
2. **Each round must include generation, critique, AND revision** — no skipping phases
3. **Learning must carry forward** — round 2 must reference what was learned from round 1
4. **Critique must be genuine** — self-critique (the same "voice" critiquing itself) is forbidden
5. **Winner selection requires human input** unless the skill explicitly allows automated selection

---

## Structural Enforcement

### The File-on-Disk Principle

A gate is enforced by requiring a checkpoint file to exist on disk. No file = gate not passed. This is the most reliable enforcement mechanism because:

- Files persist across context windows
- Files can be verified by external tools
- Files cannot be "remembered" into existence
- Files create an audit trail

### Enforcement Checklist

```
FOR EVERY GATE:
  [ ] Gate checkpoint file written to [project]/checkpoints/
  [ ] File contains all required YAML fields
  [ ] Status is PASS or FAIL (nothing else)
  [ ] All referenced output files actually exist
  [ ] All size thresholds verified with actual byte counts
  [ ] No forbidden statuses anywhere in the file

IF THE CHECKPOINT FILE DOES NOT EXIST ON DISK:
  -> The gate has not been evaluated
  -> The phase/skill is NOT complete
  -> Downstream work CANNOT proceed
```

### Automated Validation (Optional)

For systems with automation capabilities, implement validators that:

1. **Check forbidden statuses** — Scan checkpoint YAML for any forbidden status string
2. **Verify file references** — Confirm that every file path in the checkpoint actually exists
3. **Validate size thresholds** — Compare actual file sizes against declared minimums
4. **Detect threshold clustering** — Flag if >50% of scores are within 0.5 of minimums
5. **Block session completion** — Prevent "done" status if critical gate failures exist

---

## Proportionality Calibration

### The Problem

Gate-passing optimization occurs when the model targets scores to documented minimums rather than deriving them from genuine analysis.

### Detection Signals

1. **Threshold clustering:** >50% of scores land within 0.5 of documented minimums
2. **Perfect gate-passing:** Every single score is exactly at or just above the minimum
3. **Generic justification:** Score rationales use abstract language rather than citing specific evidence
4. **Minimum-hitting:** Scores decrease precision as they approach gate thresholds

### Calibration Rules

1. **Scores are DERIVED, not TARGETED.** Evaluate the work product first. The score follows from the evaluation. Never start with a target score and work backward.
2. **Overshoot is normal.** Work that genuinely earns 8.2 should score 8.2, not be rounded down to a 6.0 minimum.
3. **Failed gates prove rigor.** If every gate passes on the first attempt across all rounds, scoring may be too lenient.
4. **Justifications cite evidence.** "Scores 7.0 because the analysis maps directly to three documented user pain points" -- not "Scores 7.0 because it meets the clarity threshold."
5. **All-at-minimum = recalibrate.** If >50% of scores are within 0.5 of minimums, STOP. Re-read the scoring criteria. Re-evaluate from the work product.

---

## Gate Definitions: Examples

### Example 1: Research Skill Gates

```yaml
# Gate: Research Phase 1 Complete
gate: PHASE_1_COMPLETE
status: PASS
thresholds:
  total_items_collected:
    minimum: 1000
    actual: 1047
    check: PASS
  category_a:
    minimum: 300
    actual: 312
    check: PASS
  category_b:
    minimum: 250
    actual: 268
    check: PASS
  category_c:
    minimum: 200
    actual: 215
    check: PASS
  category_d:
    minimum: 150
    actual: 153
    check: PASS
  category_e:
    minimum: 100
    actual: 99
    check: FAIL
gate_result: FAIL  # Category E is 1 short. Gate does not pass.
```

### Example 2: Generation Skill Gates

```yaml
# Gate: Creative Phase Complete
gate: PHASE_2_COMPLETE
status: PASS
outputs:
  - file: "2.1-concept-exploration.md"
    size_bytes: 6420
    min_size_bytes: 5000
    size_check: PASS
  - file: "2.2-naming-candidates.md"
    size_bytes: 3890
    min_size_bytes: 3000
    size_check: PASS
  - file: "2.3-expression-variants.md"
    size_bytes: 7210
    min_size_bytes: 5000
    size_check: PASS
concept_checkpoint_exists: true
all_outputs_exist: true
all_size_thresholds_met: true
gate_result: PASS
```

### Example 3: Validation Skill Gates

```yaml
# Gate: Validation Phase Complete
gate: PHASE_3_COMPLETE
status: PASS
scores:
  clarity:
    score: 7.8
    minimum: 6.0
    check: PASS
    justification: "Maps directly to documented pain point with specific language match"
  differentiation:
    score: 8.1
    minimum: 7.0
    check: PASS
    justification: "Three competitors analyzed; approach is structurally distinct from all three"
  specificity:
    score: 6.2
    minimum: 6.0
    check: PASS
    justification: "Names specific mechanism and outcome, though benefit layering could be deeper"
threshold_clustering_check:
  scores_within_0.5_of_minimum: 1  # Only specificity (6.2 vs 6.0)
  total_scores: 3
  percentage: 33%
  clustering_alert: false  # Below 50% threshold
gate_result: PASS
```

---

## Implementing Gates in Your System

### Step 1: Define Your Gate Structure

Map your system's workflow to a gate hierarchy:

```
Your System:
  GATE_0 (Read Declaration) ........... always required
  Phase 0 Gate (Foundation/Setup) ..... inputs verified
  Phase 1 Gate (Analysis/Research) .... data collected
  Phase 2 Gate (Generation/Creation) .. outputs created
  Phase 3 Gate (Validation/QA) ........ quality verified
  Skill Complete Gate ................. all phases passed
```

### Step 2: Define Thresholds Per Skill

For each skill, document:
- What numeric thresholds must be met
- What output files must exist
- What minimum file sizes apply
- What scores must be achieved (if applicable)

### Step 3: Create Checkpoint Directory

```
[project-outputs]/
  [skill-name]/
    checkpoints/
      GATE_0.yaml
      PHASE_0_COMPLETE.yaml
      PHASE_1_COMPLETE.yaml
      PHASE_2_COMPLETE.yaml
      PHASE_3_COMPLETE.yaml
      SKILL_COMPLETE.yaml
```

### Step 4: Enforce Sequencing

Implement this rule in every skill spec:

```
Phase N+1 CANNOT begin unless:
  [project]/checkpoints/PHASE_[N]_COMPLETE.yaml exists
  AND its gate_result field is PASS
```

### Step 5: Add Automated Validation (Optional)

If your system supports hooks or validators:
- Run on every file write/edit
- Check for forbidden gate statuses
- Verify file references in checkpoints
- Alert on threshold clustering
- Block session completion on critical failures

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-17 | Initial creation for Quality Engine v4. Universal gate system with PASS/FAIL discipline, forbidden statuses, GATE_0, phase/skill/arena gates, structural enforcement, proportionality calibration, examples, and implementation guide. |
