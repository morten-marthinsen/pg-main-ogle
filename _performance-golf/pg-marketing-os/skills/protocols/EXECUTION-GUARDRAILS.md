# EXECUTION GUARDRAILS — Universal Enforcement Protocol

**Version:** 1.0
**Created:** 2026-03-06
**Authority:** EQUAL to CLAUDE-CORE.md — this protocol is STRUCTURAL, not advisory
**Scope:** Every skill in every engine (Foundation, Long-form, Ads, Email, Organic, Upsell, Landing Page)

---

## TABLE OF CONTENTS

- [Operator Pre-Flight Checklist](#operator-pre-flight-checklist)
- [Universal Mandatory Read Declaration](#universal-mandatory-read-declaration)
- [GATE_0 Anti-Degradation Proof Standard](#gate_0-anti-degradation-proof-standard)
- [Post-Execution Verification Checklist](#post-execution-verification-checklist)
- [Enforcement Hierarchy](#enforcement-hierarchy)

---

## Operator Pre-Flight Checklist

Before executing ANY skill, verify these files are loaded into context:

| # | File | Purpose | When to Load |
|---|------|---------|-------------|
| 1 | `CLAUDE-CORE.md` | Universal execution constraints | ALWAYS |
| 2 | Skill's `SKILL.md` | Entry point, architecture, thresholds | ALWAYS |
| 3 | Skill's `ANTI-DEGRADATION.md` | Structural enforcement rules | ALWAYS |
| 4 | Skill's microskill `.md` specs | Per-microskill execution details | Before each microskill |
| 5 | `CLAUDE-ARENA.md` | Arena protocol | If skill has Arena rounds |
| 6 | `CLAUDE-SPECIMENS.md` | Specimen loading protocol | If skill generates copy |
| 7 | Engine-level `CLAUDE.md` | Engine-specific constraints | If engine has one (Ads, Email, Organic) |

**If any of files 1-3 are missing from context, HALT. Do not proceed.**

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

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-06 | Initial creation — universal enforcement protocol standardizing mandatory read declarations across all engines |
