# EXECUTION GUARDRAILS — Universal Enforcement Protocol

**Version:** 1.0
**Created:** 2026-03-06
**Authority:** EQUAL to ~system/SYSTEM-CORE.md — this protocol is STRUCTURAL, not advisory
**Scope:** Every skill in every engine (Foundation, Long-form, Ads, Email, Organic, Upsell, Landing Page)

---

## TABLE OF CONTENTS

- [Operator Pre-Flight Checklist](#operator-pre-flight-checklist)
- [Universal Mandatory Read Declaration](#universal-mandatory-read-declaration)
- [GATE_0 Anti-Degradation Proof Standard](#gate_0-anti-degradation-proof-standard)
- [Post-Execution Verification Checklist](#post-execution-verification-checklist)
- [Enforcement Hierarchy](#enforcement-hierarchy)
- [PROPORTIONALITY CALIBRATION](#proportionality-calibration)

---

## Operator Pre-Flight Checklist

Before executing ANY skill, load protocols using the manifest-driven approach:

1. Read `~system/PROTOCOL-MANIFEST.md` for the loading algorithm
2. Read the skill's loading profile at `~system/skill-loading-profiles/[id]-[name].yaml`
3. Load all protocols where the Load Condition evaluates TRUE, sorted by priority

**Minimum required (always load):**

| # | File | Purpose |
|---|------|---------|
| 1 | `~system/SYSTEM-CORE.md` | Universal execution constraints (priority 10-35) |
| 2 | Skill's `SKILL.md` | Entry point, architecture, thresholds (priority 50) |
| 3 | Skill's `ANTI-DEGRADATION.md` | Structural enforcement rules (priority 55) |
| 4 | Skill's microskill `.md` specs | Per-microskill execution details (load before each microskill) |

**Conditionally loaded (from skill's loading profile):**

| Protocol | Load When |
|----------|-----------|
| `ARENA-PROTOCOL.md` + `ARENA-CORE-PROTOCOL.md` | `arena: true` in loading profile |
| `SPECIMEN-GUIDE.md` + `PERSONA-VOICE-LOADING-PROTOCOL.md` | `generates_copy: true` |
| Engine master file | `engine` != main-pipeline |
| `pipeline-handoff-registry.md` | `consumes_upstream: true` |
| MCP tools via ToolSearch | `mcp_tools` is non-empty (see `~system/MCP-TOOL-REGISTRY.md`) |

**If any of files 1-3 are missing from context, HALT. Do not proceed.**

### Snapshot Checkpoint (Rollback Protocol)

After Layer 0 completes and before Layer 1 begins, create a pre-skill snapshot:

- [ ] Pre-skill snapshot created (tag: `snapshot/[project]/pre-[XX]-[name]`)

See `~system/protocols/SKILL-ROLLBACK-PROTOCOL.md` for snapshot commands.

### Event-Driven Reminder Awareness

During execution, automated detectors may inject reminders into your context:

| Detector | What It Catches | Your Response |
|----------|----------------|---------------|
| Abbreviation | Summary placeholders in output | Replace with complete content |
| Rushing | Output below 60% of minimum size | Re-execute microskill |
| Stale Reads | 6+ writes without reading sources | Re-read upstream files |
| Synthesis | Data references without source reads | Read the actual source file |
| Gate Drift | Forbidden gate statuses | Fix to PASS or FAIL |
| Context Pressure | Zone transitions | Follow zone response protocol |

Reminders do not halt execution, but they represent detected degradation. Address the flagged issue before proceeding to the next microskill or gate.

See `~system/protocols/EVENT-DRIVEN-REMINDERS.md` for detector details.

---

## Universal Mandatory Read Declaration

Every ANTI-DEGRADATION.md file contains this declaration. You MUST write it to your first output file before executing any microskill.

### Template

```
I HAVE READ THIS FILE: [FILENAME]-ANTI-DEGRADATION.md v[VERSION]
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: [skill-specific forbidden behaviors from this file]
```

### Rules

1. **The declaration must appear in the FIRST output file** — not in conversation, not "mentally noted," not deferred.
2. **The filename and version must match exactly** — proves you read the actual file, not a cached summary.
3. **The "I WILL NOT" line must reference THIS file's specific forbidden behaviors** — proves you read the content, not just the header.
4. **If you cannot write the declaration, you have not read the file.** HALT and read it.

### Why This Exists

Instructional constraints ("read this file") CAN be ignored under context pressure. The declaration creates a STRUCTURAL proof artifact:
- If the declaration is missing from the first output → the file was not read → all outputs are suspect
- If the declaration has wrong version/filename → a cached or hallucinated version was used → outputs are suspect
- If the "I WILL NOT" line is generic → the file was skimmed, not read → outputs are suspect

---

## GATE_0 Anti-Degradation Proof Standard

The LAYER_0_COMPLETE.yaml checkpoint (or equivalent first gate) must include:

```yaml
anti_degradation:
  file_read: "[FILENAME]-ANTI-DEGRADATION.md"
  version: "[version from file header]"
  declaration_written_to: "layer-0/[first-output-filename].md"
```

This field is REQUIRED. A LAYER_0_COMPLETE.yaml without the `anti_degradation` section is INVALID.

### Verification

When reviewing a gate checkpoint:
1. Check that `anti_degradation.file_read` matches the skill's actual AD filename
2. Check that `anti_degradation.version` matches the version in the AD file header
3. Check that `anti_degradation.declaration_written_to` points to a real file
4. Open that file and verify the declaration text exists

---

## Pre-Execution Risk Assessment

Before executing any skill, complete the Pre-Mortem assessment (see `~system/protocols/PRE-MORTEM-PROTOCOL.md`):

| # | Check | How to Complete |
|---|-------|----------------|
| 1 | 3 failure modes identified | List the 3 most likely failure modes for this skill with this input |
| 2 | Weakest inputs flagged | Identify which upstream packages or inputs are least confident |
| 3 | Degradation point predicted | Name the specific microskill or layer where quality might drop |

**Tier:** Full = mandatory for all skills. Standard = mandatory for Foundation (00-09). Quick = optional.

This assessment is logged to the execution log. It does NOT block execution — it's awareness, not enforcement.

---

## Post-Execution Verification Checklist

Before claiming ANY skill is complete:

| # | Check | How to Verify |
|---|-------|--------------|
| 1 | Declaration written | First output file contains MANDATORY READ DECLARATION text |
| 2 | All microskills executed | Each microskill has its own output file |
| 3 | Gate checkpoints exist | YAML checkpoint files exist for each completed layer/gate |
| 4 | Anti-degradation section in gates | `anti_degradation` block present in checkpoint YAML |
| 5 | No forbidden rationalizations used | Cross-check output against the AD file's forbidden rationalization table |
| 6 | Thresholds met | Numeric requirements (quote counts, word counts, etc.) verified with actual counts |
| 7 | Output files written | All required handoff files exist with correct naming |
| 8 | Proportionality check | Flag if >50% of scores are within 0.5 of documented minimums — indicates gate-passing optimization |
| 9 | Uncertainty calibration | Rate confidence (1-10) on source grounding, differentiation, specificity. Flag if any below 7. See `~system/protocols/UNCERTAINTY-CALIBRATION-PROTOCOL.md` |
| 10 | Pre-mortem comparison | Compare actual execution to pre-mortem predictions. Did predicted failures occur? Log for calibration. |
| 11 | Post-skill snapshot created | Tag `snapshot/[project]/post-[XX]-[name]` exists. See `SKILL-ROLLBACK-PROTOCOL.md` |

**If ANY check fails, the skill is NOT complete. Do not proceed to the next skill.**

---

## Enforcement Hierarchy

The anti-degradation system operates in 3 layers:

```
LAYER 3: RECOVERY (catches lies after context compaction)
  └─ Context resume verification, SESSION-STATE.md cross-check

LAYER 2: STRUCTURAL (cannot be bypassed)
  └─ Checkpoint files, gate verification, mandatory read declarations
  └─ THIS IS WHERE ENFORCEMENT LIVES

LAYER 1: INSTRUCTIONAL (can be ignored under pressure)
  └─ MC-CHECK, context zones, "read this file" instructions
  └─ NECESSARY BUT NOT SUFFICIENT
```

**The mandatory read declaration bridges Layer 1 → Layer 2.** It converts an instructional requirement ("read the AD file") into a structural artifact (declaration text in an output file) that can be verified.

---

## PROPORTIONALITY CALIBRATION

### The Problem

Gate-passing optimization occurs when the model targets scores to documented minimums rather than deriving them from genuine analysis. The result: scores that technically pass gates but don't reflect actual quality.

### Detection Signals

1. **Threshold clustering:** >50% of scores land within 0.5 of documented minimums
2. **Perfect gate-passing:** Every single score is exactly at or just above the minimum
3. **Generic justification:** Score rationales use abstract language rather than citing specific evidence
4. **Minimum-hitting:** Scores decrease precision as they approach gate thresholds (e.g., "6.0" instead of "6.3" or "7.1")

### Calibration Rules

1. **Scores are DERIVED, not TARGETED.** Evaluate the work product first. The score follows from the evaluation. Never start with a target score and work backward.
2. **Overshoot is normal.** A mechanism that genuinely earns 8.2 on visual_metaphor should score 8.2, not be rounded down to the 6.0 minimum. Scores above minimums are EXPECTED for quality work.
3. **Failed gates prove rigor.** If every gate passes on the first attempt, consider whether scoring is too lenient. Some gate failures during Arena rounds are a healthy sign.
4. **Justifications cite evidence.** "Scores 7.0 because the metaphor maps directly to the audience's existing frame of 'swing mechanics as physics'" — not "Scores 7.0 because it meets the clarity threshold."
5. **All-at-minimum = recalibrate.** If >50% of scores are within 0.5 of minimums, STOP. Re-read the scoring criteria. Re-evaluate from the work product, not from the thresholds.

---

## OVERRIDE CHANNEL

Every commitment declaration MUST include abort criteria:

"I commit to this execution plan AND I will PAUSE for human review if:
- Confidence drops below 5
- A required input file is missing or corrupted
- Output quality falls below gate threshold after 2 attempts
- Context zone transitions to RED or CRITICAL
- An unexpected error occurs that affects downstream skills

I will ABORT entirely if:
- Required upstream data is fundamentally incompatible
- The task requires capabilities outside this skill's scope
- Safety or ethical concerns arise"

This override channel ensures commitment declarations are bounded — the agent commits to the plan but retains structured exit points that require human involvement rather than silent degradation.

### Decision Challenge — Outward-Facing Pushback

The Override Channel above handles inward failure. The Decision Challenge Protocol (`DECISION-CHALLENGE-PROTOCOL.md`) handles outward disagreement — FLAG / BLOCK / CONVINCE ME escalation when the agent has material concerns about the operator's direction. See `~system/protocols/DECISION-CHALLENGE-PROTOCOL.md` for the full framework.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-06 | Initial creation — universal enforcement protocol standardizing mandatory read declarations across all engines |
