# Creative OS — Output Structure

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Define a unified output standard across all agents. Respects existing conventions while adding system-level files for decision tracking and learning.

---

## CANONICAL PROJECT TREE

Every project that spans multiple agents should follow this structure:

```
[project-directory]/
├── constraint-ledger.yaml        # Decisions that constrain downstream work
├── fact-changes.yaml             # Propagation log for changed values
├── context-reservoir.md          # Human-curated bridge (multi-session projects only)
│
├── tess/                         # Tess outputs for this project
│   ├── data-analysis/            # Classification, trends, recommendations
│   └── intake-queue/             # Intake queue entries written for Veda
│
├── neco/                         # Neco outputs for this project
│   ├── audience-analysis/        # Behavioral framework outputs
│   ├── angles/                   # Angle ideation and selection
│   ├── hooks/                    # Hook generation outputs
│   ├── scripts/                  # Full script outputs
│   └── briefs/                   # Creative briefs (static image, influencer, etc.)
│
├── veda/                         # Veda outputs for this project
│   ├── [asset-id]/               # Per-asset directory (15-position naming)
│   │   ├── source/               # Downloaded source material
│   │   ├── output/               # Finished assets
│   │   └── metadata.yaml         # Asset metadata
│   └── pipeline-log.md           # Pipeline execution log
│
└── orion/                        # Orion outputs for this project
    ├── directives/               # Strategic directives issued
    ├── launch-board/             # Launch tracking board (if applicable)
    └── weekly-updates/           # Weekly update references
```

---

## EXISTING AGENT CONVENTIONS (PRESERVED)

Each agent has established output conventions. This standard builds on them — it does NOT replace them.

| Agent | Current Convention | Status |
|-------|-------------------|--------|
| **Tess** | `output/` (→ `output.nosync/`) with timestamped folders | Preserved — Tess pipeline outputs stay in agent directory |
| **Veda** | Per-asset directories with 15-position Asset ID naming | Preserved — Veda production outputs stay in agent directory |
| **Neco** | `_output/` (→ `_output.nosync/`) with versioned deliverables per project | Preserved — Neco creative outputs stay in agent directory |
| **Orion** | `_ops/` with dated operational outputs | Preserved — Orion ops outputs stay in agent directory |

**The project tree above is for cross-agent projects** — work that spans multiple agents on a single product/launch. Single-agent work stays in the agent's own output directory.

---

## SYSTEM-LEVEL FILES

These files are added at the project level (not per-agent) when a project spans multiple agents:

| File | When to Create | What It Contains |
|------|---------------|-----------------|
| `constraint-ledger.yaml` | At first cross-agent constraint decision | See `protocols/CONSTRAINT-LEDGER-PROTOCOL.md` |
| `fact-changes.yaml` | When a factual value changes mid-project | See `protocols/FACT-CHANGE-PROPAGATION-PROTOCOL.md` |
| `context-reservoir.md` | After multi-session foundation work, before creative execution | See `SESSION-ARCHITECTURE.md` Context Reservoir section |

For system-wide constraints (not project-specific):
```
_performance-golf/pg-creative-os/_shared/constraint-ledger.yaml
_performance-golf/pg-creative-os/_shared/fact-changes.yaml
```

---

## PROJECT CODE NAMING

Every cross-agent project gets a short code used consistently across all agents:

**Format:** 2-4 uppercase letters + optional number

| Code | Project |
|------|---------|
| `SF2` | Straight Flight 2 (anti-slice driver) |
| `SPD` | Speed Distance |
| `RS1` | Roger's Swing (campaign 1) |
| `LIL` | Lie It Like (putter) |
| `PG1` | PG1 Membership |
| `SSP` | SwingSmooth Pro |

The project code appears in:
- Tess intake queue entries (funnel code position)
- Neco project directories (`_projects/[code]-[name]/`)
- Veda Asset IDs (position 1)
- Orion launch boards (`launch-boards/[code]/`)

---

## REQUIRED VS OPTIONAL FILES

| File | Single-Agent Work | Cross-Agent Project |
|------|-------------------|---------------------|
| Agent's own output files | REQUIRED | REQUIRED |
| `constraint-ledger.yaml` | Optional | REQUIRED (if constraint decisions exist) |
| `fact-changes.yaml` | Optional | REQUIRED (if values change mid-project) |
| `context-reservoir.md` | Not needed | RECOMMENDED (for multi-session projects) |
| `pipeline-log.md` | Optional | RECOMMENDED (for Veda production runs) |

---

## HEAVY-WRITE DIRECTORY SAFETY

All output directories that receive rapid/bulk file writes use the `.nosync` pattern:

```
output/  →  output.nosync/  (symlink: output → output.nosync)
```

This prevents iCloud sync conflicts and keeps large generated files out of git/Finder indexing. See root `CLAUDE.md` for the full list of protected directories.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation. Canonical project tree, existing conventions preserved, system-level files defined, project code naming standard. |
