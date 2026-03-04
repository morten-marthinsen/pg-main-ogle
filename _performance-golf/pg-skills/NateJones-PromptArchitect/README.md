# Prompt Architect — Nate Jones Edition

A rigorous audit and optimization system for multi-layered AI prompt pipelines.

---

## Quick Start

1. **Unzip** and place in your Obsidian vault (or Claude Code working directory)
2. **Point Claude at MASTER-AGENT.md** when starting an audit
3. **Create a project folder** under `projects/` for each system you audit

---

## Folder Structure

```
NateJones-PromptArchitect/
├── MASTER-AGENT.md              ← Primary orchestrator (point Claude here)
├── ARCHITECTURE-PRD.md          ← System design philosophy
├── QUALITY-STANDARDS.md         ← Scoring rubrics and thresholds
├── MULTI-AGENT-SCALING-REFERENCE.md ← When/how to scale beyond single agents
├── templates/
│   ├── SKILL-TEMPLATE.md        ← Standard skill file structure
│   ├── PRD-TEMPLATE.md          ← For building new pipelines
│   └── AUDIT-REPORT-TEMPLATE.md ← Final report format
├── skills/
│   ├── layer-1/                 ← Diagnostic skills (scoring, analysis)
│   ├── layer-2/                 ← Prescription skills (rewriting, injection)
│   ├── layer-3/                 ← Delivery skills (report generation)
│   └── layer-5/                 ← Multi-agent scaling skills
└── projects/
    └── [YourProject-Audit]/     ← Your audit outputs go here
        ├── context.yaml         ← Session state tracker
        └── AUDIT-REPORT.md      ← Final report
```

---

## Usage Modes

### AUDIT Mode (Read-Only Analysis)
```
Run an AUDIT on [path/to/your/skills/]
```
- Analyzes structure, constraints, guardrails, anti-slop compliance
- Produces prescriptions but makes NO changes
- Outputs: AUDIT-REPORT.md with scores and recommendations

### OPTIMIZE Mode (Full Execution)
```
Run an OPTIMIZE on [path/to/your/skills/]
```
- Runs full audit
- Executes prescriptions (edits files)
- Cleans up debris files
- Outputs: Modified files + AUDIT-REPORT.md

---

## What Gets Scored

| Dimension | Threshold | What It Measures |
|-----------|-----------|------------------|
| Four-Block Compliance | 4/4 required | PURPOSE, INSTRUCTIONS, OUTPUT, CONSTRAINTS sections |
| Constraint Ratio | ≥0.60 | constraints / (constraints + instructions) |
| Specificity Score | ≥0.75 | Measurable thresholds vs vague language |
| Guardrail Coverage | 4+/7 | Identity invariants, refusals, uncertainty, validation |
| Anti-Slop Compliance | 80%+ | Absence of vague qualifiers, AI telltales |
| Validation Presence | Required | Output validation checks before delivery |

---

## Scoring Buckets

| Score | Verdict | Action |
|-------|---------|--------|
| 8.0+ | PASS | No changes needed |
| 5.0–7.9 | OPTIMIZE | Targeted fixes |
| 2.0–4.9 | REWRITE | Major restructure |
| <2.0 | REBUILD | Start from scratch |

---

## Key Concepts

### Constraint Ratio
The ratio of constraint statements (MUST, NEVER, ONLY, ALWAYS) to instruction statements. Higher ratios produce more predictable outputs.

### Anti-Slop Lexicon
Banned words/phrases that indicate vague or AI-generated filler:
- Vague qualifiers: "many", "often", "some", "usually"
- AI telltales: "revolutionary", "game-changing", "unlock", "leverage"
- Corporate filler: "comprehensive", "robust", "innovative"
- Hedge words: "might", "could potentially", "perhaps"

### Chain-of-Refinement
A protocol for Layer-1 skills that allows iterative improvement:
```
DIAGNOSE → ADJUST → RE-EXECUTE → RE-SCORE → ITERATION_LIMIT (3x)
```

### Failure Mode Tables
Structured documentation of how skills should handle errors:
| Mode | Severity | Detection | Handling |
|------|----------|-----------|----------|
| Input missing | HIGH | Validation | HALT + error message |

---

## Example Invocation

```markdown
Please run an OPTIMIZE audit on the CopywritingEngine system.
Target path: /path/to/CopywritingEngine/Skills/
System context: 18-domain direct-response copywriting pipeline
Priority dimensions: constraint_ratio, guardrail_coverage, anti_slop_compliance
```

---

## Included Example

The `projects/CopywritingEngine-Audit/` folder contains a completed audit showing:
- `context.yaml` — Session state with all completed steps
- `AUDIT-REPORT.md` — Full report with scores and prescriptions

---

## Version

**v1.0** — January 2025
Built for Claude Code / Claude 3.5+ / Opus 4.5
