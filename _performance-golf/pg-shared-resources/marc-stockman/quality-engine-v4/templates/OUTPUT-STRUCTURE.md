# Output Structure — Template
**Quality Engine v4** | Component: Template
**Purpose:** Standardize how project outputs are organized — canonical directory structure with constraint-ledger, fact-changes, issue-log, and learning-log locations
**Instructions:** Copy this file into your system and fill in the [PLACEHOLDERS]

---

## STRUCTURE

All skill outputs for a project are stored under a project-code directory:

```
outputs/
  [project-code]/
    # Foundation Phase Outputs
    [foundation-package-1].json
    [foundation-package-2].json
    [foundation-package-3].yaml

    # Reasoning Captures (from competitive evaluation phases)
    reasoning-captures/
      [phase-id]-[name]-reasoning.yaml

    # Context Reservoir (human-curated, created after foundation)
    context-reservoir.md

    # Generation Phase Outputs
    [section-1]-package.json
    [section-1]-assembled-output.md
    [section-2]-package.json
    [section-2]-assembled-output.md
    assembled-draft.md
    editorial-report.json

    # Quality Tracking (MANDATORY for Quality Engine)
    constraint-ledger.yaml       # Locked decisions and constraints
    fact-changes.yaml            # Fact change propagation tracker
    issue-log.md                 # Cumulative incident record
    learning-log/                # Learning capture directory
      observations.md            # L1-L2 raw observations and patterns
      promotion-results.tsv      # L3-L6 promotion test results
      failure-fixes.md           # Specific failures and structural fixes

    # Branch Engine Outputs
    [branch-1]/
      [branch-outputs]
    [branch-2]/
      [branch-outputs]
```

---

## PROJECT CODES

Project codes are short identifiers that uniquely name a project. They are assigned when a project starts.

**Format:** 2-4 uppercase letters + optional number

**Examples:**
- `[CODE_1]` — [DESCRIPTION]
- `[CODE_2]` — [DESCRIPTION]
- `[CODE_3]` — [DESCRIPTION]

**Rules:**
- Use the project code consistently across ALL outputs
- The project code appears in the folder path: `outputs/[CODE]/`
- Use the same code when referencing outputs in handoff packages
- If a project has multiple versions, append a number: `[CODE]1`, `[CODE]2`

---

## ASSEMBLED OUTPUT FILES

A key element is the **assembled output** files. These are the ACTUAL GENERATED CONTENT from each phase, saved as markdown:

| File | Source Phase | Purpose |
|------|-------------|---------|
| `[section-1]-assembled-output.md` | [PHASE_1] | Full output as generated |
| `[section-2]-assembled-output.md` | [PHASE_2] | Full output as generated |

These files are loaded by the NEXT phase in sequence to maintain continuity and prevent repetition. They are distinct from the `-package.json` files, which contain structured metadata.

**Each generation phase must output BOTH:**
1. A structured package (`.json` / `.yaml`) with metadata, handoff data, and scores
2. An assembled output file (`.md`) with the actual generated content

---

## QUALITY TRACKING FILES

### constraint-ledger.yaml

Tracks locked decisions and constraints that downstream phases must honor.

```yaml
constraints:
  - id: "C-001"
    date: "[DATE]"
    decision: "[WHAT WAS DECIDED]"
    source: "[WHO/WHAT DECIDED IT]"
    affects: ["[PHASE_1]", "[PHASE_2]"]
    status: "LOCKED"
```

### fact-changes.yaml

Tracks factual changes that need propagation across outputs.

```yaml
changes:
  - id: "FC-001"
    date: "[DATE]"
    field: "[FIELD_NAME]"
    old_value: "[OLD]"
    new_value: "[NEW]"
    source: "[WHO/WHAT CHANGED IT]"
    propagation_status: "incomplete"  # incomplete | complete | deferred
    affected_files:
      - "[FILE_1]"
      - "[FILE_2]"
```

### issue-log.md

Cumulative incident record across all sessions.

```markdown
### ISSUE-[YYYY-MM-DD]-[sequential-number]

- **Date:** [ISO 8601]
- **Class:** [factual-error | voice-drift | structural-regression | missing-input | scope-creep | specification-gap | context-loss | hallucination | threading-failure | other]
- **Skill/Phase:** [ID where issue occurred]
- **Project:** [project-code]
- **Severity:** [critical | moderate | minor]
- **Description:** [What went wrong — be specific]
- **Root cause:** [Why it went wrong]
- **Pattern match:** [Does this match any previous issue?]
- **Proposed prevention:** [What rule or change would prevent recurrence]
- **Learned:** [Yes / No]
- **Memorialized:** [Yes / No — if yes, cite location]
- **Activated:** [Yes / No — if yes, cite code/hook]
```

### learning-log/

Learning capture directory with three files:

| File | Purpose |
|------|---------|
| `observations.md` | L1-L2 raw observations and confirmed patterns |
| `promotion-results.tsv` | L3-L6 promotion test results (tab-separated) |
| `failure-fixes.md` | Specific failures and their structural fixes |

---

## MIGRATION NOTE

If your system previously saved outputs to skill-specific directories, check BOTH the legacy path and the new path during the transition:

```
PRIMARY PATH:  outputs/[project-code]/[package-name].json
FALLBACK PATH: [old-skill-directory]/outputs/[package-name].json
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | [DATE] | Initial creation from Quality Engine v4 template. |
