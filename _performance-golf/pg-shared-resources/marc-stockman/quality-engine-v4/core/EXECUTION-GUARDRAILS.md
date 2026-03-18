# EXECUTION-GUARDRAILS
**Quality Engine v4** | Component: Core
**Purpose:** Pre-flight checklist, mandatory read declarations, GATE_0 proof standard, and post-execution verification
**Authority:** EQUAL to all skill/agent-level files
**System-Agnostic:** Works with Claude, Gemini, OpenAI, or any AI model

---

## TABLE OF CONTENTS

- [Why This Exists](#why-this-exists)
- [Operator Pre-Flight Checklist](#operator-pre-flight-checklist)
- [Mandatory Read Declaration](#mandatory-read-declaration)
- [GATE_0 Anti-Degradation Proof Standard](#gate_0-anti-degradation-proof-standard)
- [Pre-Execution Risk Assessment](#pre-execution-risk-assessment)
- [Event-Driven Reminder Awareness](#event-driven-reminder-awareness)
- [Post-Execution Verification Checklist](#post-execution-verification-checklist)
- [Enforcement Hierarchy](#enforcement-hierarchy)
- [Proportionality Calibration](#proportionality-calibration)
- [Rollback Protocol](#rollback-protocol)
- [Operator Quick Reference](#operator-quick-reference)

---

## Why This Exists

Execution guardrails are the bridge between having quality protocols and actually following them. Without guardrails:

- Models skip file reads under context pressure
- Anti-degradation files get "mentally noted" but never structurally verified
- Post-execution checks are the first thing cut when sessions run long
- Quality gates exist on paper but not in checkpoint files on disk

This document defines the structural enforcement layer that makes quality protocols non-optional.

---

## Operator Pre-Flight Checklist

Before executing ANY skill, load the required files in this order:

### Minimum Required (Always Load)

| # | File | Purpose |
|---|------|---------|
| 1 | `core/SYSTEM-CORE.md` | Universal execution constraints |
| 2 | Skill's spec file | Entry point, architecture, thresholds |
| 3 | Skill's `ANTI-DEGRADATION.md` | Structural enforcement rules |
| 4 | Per-unit spec files | Detailed execution specs (load before each unit) |

### Conditionally Loaded

| File | Load When |
|------|-----------|
| `core/GATE-SYSTEM.md` | First time using the system, or gate questions arise |
| `core/EFFORT-PROTOCOL.md` | First time using the system, or effort questions arise |
| Arena/competition protocol | Skill uses competitive refinement |
| Style/voice guide | Skill generates copy or creative output |
| Upstream handoff registry | Skill consumes another skill's output |
| Domain-specific references | Skill requires specialized knowledge |

**If files 1-3 from the minimum required list are missing from context, HALT. Do not proceed.**

### Pre-Flight Verification

```
BEFORE STARTING ANY SKILL:
  [ ] SYSTEM-CORE.md loaded and 7 Laws acknowledged
  [ ] Skill spec file loaded and architecture understood
  [ ] Skill's ANTI-DEGRADATION.md loaded
  [ ] Effort level identified for first phase
  [ ] Output directory confirmed / created
  [ ] Previous session state verified (if resuming)

  IF ANY UNCHECKED -> DO NOT BEGIN EXECUTION
```

---

## Mandatory Read Declaration

Every anti-degradation file contains a declaration. You MUST write it to your first output file before executing any work.

### Template

```
I HAVE READ THIS FILE: [FILENAME]-ANTI-DEGRADATION.md v[VERSION]
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-unit output files for every unit of work executed.
I WILL NOT: [skill-specific forbidden behaviors from this file]
```

### Rules

1. **The declaration must appear in the FIRST output file** — not in conversation, not "mentally noted," not deferred to later.
2. **The filename and version must match exactly** — proves you read the actual file, not a cached summary.
3. **The "I WILL NOT" line must reference THIS file's specific forbidden behaviors** — proves you read the content, not just the header.
4. **If you cannot write the declaration, you have not read the file.** HALT and read it.

### Why This Works

Instructional constraints ("read this file") CAN be ignored under context pressure. The declaration creates a STRUCTURAL proof artifact:

| Condition | What It Proves |
|-----------|---------------|
| Declaration missing from first output | File was not read. All outputs are suspect. |
| Declaration has wrong version/filename | A cached or hallucinated version was used. Outputs are suspect. |
| "I WILL NOT" line is generic | File was skimmed, not read. Outputs are suspect. |
| Declaration present with correct details | File was read. Structural proof exists. |

---

## GATE_0 Anti-Degradation Proof Standard

The first gate checkpoint (Phase 0 / Layer 0 completion) must include anti-degradation proof:

```yaml
anti_degradation:
  file_read: "[FILENAME]-ANTI-DEGRADATION.md"
  version: "[version from file header]"
  declaration_written_to: "phase-0/[first-output-filename].md"
```

### This field is REQUIRED. A Phase 0 checkpoint without the `anti_degradation` section is INVALID.

### Verification Steps

1. Check that `anti_degradation.file_read` matches the skill's actual AD filename
2. Check that `anti_degradation.version` matches the version in the AD file header
3. Check that `anti_degradation.declaration_written_to` points to a real file
4. Open that file and verify the declaration text exists
5. Verify the "I WILL NOT" line references specific forbidden behaviors (not generic text)

---

## Pre-Execution Risk Assessment

Before executing any skill, answer three questions:

| # | Question | Purpose |
|---|----------|---------|
| 1 | **What are the 3 most likely failure modes for this skill with this input?** | Primes awareness of where things go wrong |
| 2 | **Which upstream inputs are least confident?** | Identifies weak links before they cascade |
| 3 | **At what point in execution will quality most likely degrade?** | Predicts the specific phase where MC-CHECK should be most vigilant |

### Risk Assessment Template

```yaml
pre_execution_risk:
  skill: "[skill name]"
  failure_modes:
    - mode: "[description]"
      likelihood: "[high|medium|low]"
      mitigation: "[how to prevent]"
    - mode: "[description]"
      likelihood: "[high|medium|low]"
      mitigation: "[how to prevent]"
    - mode: "[description]"
      likelihood: "[high|medium|low]"
      mitigation: "[how to prevent]"
  weakest_inputs:
    - input: "[description]"
      concern: "[why it's weak]"
  predicted_degradation_point:
    phase: "[phase name/number]"
    reason: "[why quality might drop here]"
    mc_check_response: "[what to watch for]"
```

This assessment is logged to the execution log. It does NOT block execution — it creates awareness that sharpens MC-CHECK targeting throughout the session.

### Post-Execution Comparison

After skill completion, compare actual execution to pre-mortem predictions:
- Did predicted failures occur?
- Did unpredicted failures occur?
- Log the comparison for calibration of future risk assessments.

---

## Event-Driven Reminder Awareness

During execution, degradation patterns may emerge. Whether detected by automated validators or self-monitoring, here are the patterns to watch for and the required response:

| Pattern | What It Looks Like | Required Response |
|---------|-------------------|-------------------|
| **Abbreviation** | Output contains "[continues...]", "[and more...]", placeholder language | Replace with complete content |
| **Rushing** | Output below 60% of minimum size threshold | Re-execute the unit of work |
| **Stale Reads** | 6+ writes without reading any source files | Re-read upstream files before continuing |
| **Synthesis** | Data references without corresponding source reads in this session | Read the actual source file |
| **Gate Drift** | Using forbidden gate statuses (see GATE-SYSTEM.md) | Fix to PASS or FAIL |
| **Context Pressure** | Zone transition detected (see SYSTEM-CORE.md zones) | Follow zone response protocol |

**These patterns represent detected degradation. Address the flagged issue before proceeding to the next unit of work or gate.**

---

## Post-Execution Verification Checklist

Before claiming ANY skill is complete:

| # | Check | How to Verify |
|---|-------|--------------|
| 1 | **Declaration written** | First output file contains MANDATORY READ DECLARATION text |
| 2 | **All units executed** | Each unit of work has its own output file |
| 3 | **Gate checkpoints exist** | YAML checkpoint files exist for each completed phase |
| 4 | **Anti-degradation in gates** | `anti_degradation` block present in first checkpoint YAML |
| 5 | **No forbidden rationalizations** | Cross-check output against the AD file's forbidden rationalization table |
| 6 | **Thresholds met** | Numeric requirements verified with actual counts (not estimates) |
| 7 | **Output files written** | All required handoff files exist with correct naming |
| 8 | **Proportionality check** | Flag if >50% of scores are within 0.5 of documented minimums |
| 9 | **Confidence rating** | Rate confidence (1-10) on source grounding, differentiation, specificity. Flag if any below 7. |
| 10 | **Risk assessment comparison** | Compare actual execution to pre-execution risk predictions. Log for calibration. |
| 11 | **Session state saved** | SESSION-STATE.md written with current position and next steps |

**If ANY check fails, the skill is NOT complete. Do not proceed to the next skill.**

### Verification Template

```yaml
post_execution_verification:
  skill: "[skill name]"
  checks:
    declaration_written: "[Y/N]"
    all_units_executed: "[Y/N] - [count]/[expected]"
    gate_checkpoints_exist: "[Y/N] - [list]"
    anti_degradation_in_gates: "[Y/N]"
    no_forbidden_rationalizations: "[Y/N]"
    thresholds_met: "[Y/N] - [details]"
    output_files_written: "[Y/N] - [list]"
    proportionality_check: "[PASS/FLAG] - [% within 0.5 of minimums]"
    confidence_rating:
      source_grounding: "[1-10]"
      differentiation: "[1-10]"
      specificity: "[1-10]"
      any_below_7: "[Y/N]"
    risk_comparison: "[predictions vs actuals]"
    session_state_saved: "[Y/N]"
  all_checks_pass: "[Y/N]"
  skill_complete: "[Y/N]"
```

---

## Enforcement Hierarchy

The anti-degradation system operates in 3 layers:

```
LAYER 3: RECOVERY (catches errors after context compaction)
  - Context resume verification
  - SESSION-STATE.md cross-check
  - Handoff claim verification against actual files

LAYER 2: STRUCTURAL (cannot be bypassed)
  - Checkpoint files on disk
  - Gate verification (PASS/FAIL only)
  - Mandatory read declarations in output files
  - THIS IS WHERE ENFORCEMENT LIVES

LAYER 1: INSTRUCTIONAL (can be ignored under pressure)
  - MC-CHECK self-monitoring
  - Context zones
  - "Read this file" instructions
  - NECESSARY BUT NOT SUFFICIENT
```

### The Bridge: Declarations

The mandatory read declaration bridges Layer 1 to Layer 2. It converts an instructional requirement ("read the AD file") into a structural artifact (declaration text in an output file) that can be independently verified.

Without the declaration, Layer 1 instructions are just requests. With the declaration, they become checkable proof.

---

## Proportionality Calibration

### The Problem

Gate-passing optimization occurs when the model targets scores to documented minimums rather than deriving them from genuine analysis. The result: scores that technically pass gates but don't reflect actual quality.

### Detection Signals

1. **Threshold clustering:** >50% of scores land within 0.5 of documented minimums
2. **Perfect gate-passing:** Every single score is exactly at or just above the minimum
3. **Generic justification:** Score rationales use abstract language rather than citing specific evidence
4. **Minimum-hitting:** Scores decrease in precision as they approach gate thresholds (e.g., "6.0" instead of "6.3")

### Calibration Rules

1. **Scores are DERIVED, not TARGETED.** Evaluate the work product first. The score follows from the evaluation. Never start with a target score and work backward.
2. **Overshoot is normal.** A work product that genuinely earns 8.2 should score 8.2, not be rounded down to a 6.0 minimum. Scores above minimums are EXPECTED for quality work.
3. **Failed gates prove rigor.** If every gate passes on the first attempt across all refinement rounds, consider whether scoring is too lenient. Some gate failures are a healthy sign.
4. **Justifications cite evidence.** "Scores 7.0 because the analysis maps directly to three documented user segments with specific language matches" — not "Scores 7.0 because it meets the clarity threshold."
5. **All-at-minimum = recalibrate.** If >50% of scores are within 0.5 of minimums, STOP. Re-read the scoring criteria. Re-evaluate from the work product, not from the thresholds.

---

## Rollback Protocol

### When to Rollback

- A skill produces output that corrupts or contradicts earlier verified work
- A later phase reveals that an earlier phase was fundamentally flawed
- A gate checkpoint is discovered to be invalid after downstream work has begun

### Rollback Procedure

If your system uses version control:

1. **Create snapshots at phase boundaries** — Before Phase 1 begins (post-setup) and after skill completion
2. **Tag snapshots** with project and skill identifiers: `snapshot/[project]/pre-[skill-name]`, `snapshot/[project]/post-[skill-name]`
3. **Rollback to the last known-good snapshot** if corruption is detected
4. **Re-execute from the snapshot point** — do not attempt to patch corrupted output

If your system doesn't use version control:

1. **Copy output directories at phase boundaries** as backup
2. **If corruption is detected**, delete the corrupted outputs and re-execute from the backed-up state
3. **Log the rollback** in the execution log with cause and corrective action

---

## Operator Quick Reference

### Session Start

```
1. Load SYSTEM-CORE.md
2. Load skill spec file
3. Load skill ANTI-DEGRADATION.md
4. Verify previous session state (if resuming)
5. Write read declaration to first output file
6. Complete pre-execution risk assessment
7. Create pre-skill snapshot (if using version control)
8. Begin Phase 0
```

### During Execution

```
- MC-CHECK at every phase boundary
- MC-CHECK-LITE between units of work (when flagged)
- Write outputs to files immediately (never defer)
- Monitor for degradation patterns (abbreviation, rushing, stale reads)
- Track context zone and announce transitions
- Log issues to issue log
```

### Skill Completion

```
1. Run post-execution verification checklist (all 11 checks)
2. Create skill-complete gate checkpoint
3. Create post-skill snapshot (if using version control)
4. Write SESSION-STATE.md
5. Report completion to operator with verification summary
```

### Session End

```
1. Write SESSION-STATE.md (MANDATORY for every session, not just emergencies)
2. Include: current position, completed outputs, key decisions, next action
3. Include: any open issues or unresolved questions
4. Verify the state file accurately reflects the session's work
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-17 | Initial creation for Quality Engine v4. Universal execution guardrails with pre-flight checklist, mandatory read declarations, GATE_0 proof standard, risk assessment, event-driven reminders, post-execution verification, enforcement hierarchy, proportionality calibration, rollback protocol, and operator quick reference. |
