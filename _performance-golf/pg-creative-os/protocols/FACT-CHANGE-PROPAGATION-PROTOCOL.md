# Creative OS — Fact Change Propagation Protocol

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Prevent upstream-downstream data drift when a factual value changes mid-workflow. When a value changes, find and update every reference — or explicitly mark it as superseded.
**Adapted from:** Marketing OS Fact Change Propagation Protocol v1.0

---

## WHY THIS EXISTS

When a human changes a factual value — a naming convention position, a root angle name, an API endpoint, a team member code — the new value gets applied to the current file but upstream files that contain the old value are not updated. Every downstream agent that reads those stale files re-introduces the old value.

**Creative OS scenarios where this has or could happen:**

| Scenario | Old Value | New Value | What Goes Stale |
|----------|-----------|-----------|-----------------|
| Naming convention version update | v3.4 position definitions | v3.10 position definitions | TESS-NAMING-CONVENTION.md referenced by Veda, Tess pipeline, intake queue |
| Root angle rename | "Chronic Slicer v1" | "Chronic Slicer" | SSS Column C, intake queue rows, Neco scripts, Veda metadata |
| SSS schema change | 17 columns in intake queue | 18 columns (added Delivery Date) | Agent CLAUDE.md files, pipeline handoff registry, Veda CLI |
| Tool endpoint change | Old Iconik collection ID | New Iconik collection ID | Veda .env, iconik-client.ts, SETUP.md |
| Team roster change | Editor leaves | New editor added | team-codes.yaml, name_generator.py, ClickUp custom fields |
| Scorecard target change | Day 30 target: 2 launches | Day 60 target: 3 launches | Orion CLAUDE.md, weekly update templates, triage rules |
| Brand thread reassignment | SF2 = Thread 1 | SF2 = Thread 2 | All SF2-related Neco scripts, Orion reports, Tess classification |
| Credential update | "25+ years experience" | "30+ years experience" | All Neco scripts, briefs, and copy that cite the credential |

---

## TRIGGER CONDITION

This protocol activates when ANY of these occur:

1. A human directive changes a factual value that exists in files across multiple agents
2. A conflict is detected between a value in one agent's file and the same value in another agent's file
3. A Constraint Ledger entry is created with a `supersedes` field
4. A naming convention version is bumped
5. A team roster or tool configuration changes

**Factual data points include:** naming convention definitions, root angle names, Asset IDs, API endpoints/IDs, team member codes, scorecard targets, brand thread assignments, credential claims, product names, and any named entity that appears in files across multiple agents.

---

## PROTOCOL STEPS

### Step 1 — Identify the Change

```
FACT CHANGE DETECTED:
  Field: [what changed — e.g., "naming convention version"]
  Old value: [exact old value]
  New value: [exact new value]
  Source of change: [human directive / config update / conflict detection]
  Canonical authority: [which source is authoritative — e.g., "TESS-NAMING-CONVENTION.md v3.10"]
```

### Step 2 — Search All Agent Directories

Search the entire Creative OS directory tree for ALL files containing the old value:

```
Search: grep -r "[old value]" _performance-golf/pg-creative-os/
```

Present the full list to the operator:

```
PROPAGATION REQUIRED:
  [N] files contain the old value "[old value]"
  The new canonical value is "[new value]"

  Files requiring update:
  1. [agent]/[file path] — line [N]: "[context showing old value]"
  2. [agent]/[file path] — line [N]: "[context showing old value]"
  ...
```

### Step 3 — Propagate or Mark

For each file containing the old value, choose one of:

| Action | When to Use | What Happens |
|--------|-------------|--------------|
| **Update** | The file is active and will be read by agents | Replace old value with new value in the file |
| **Mark superseded** | The file is historical (archived session logs, old briefs) | Add `[SUPERSEDED by FC-XXX]` marker inline |
| **Defer** | The file will be regenerated from scratch | Note deferral in fact-changes.yaml; re-check when file is next written |

### Step 4 — Log the Change

Create or update the fact-changes tracking file:

**Per-project:** `[project-directory]/fact-changes.yaml`
**System-wide:** `_performance-golf/pg-creative-os/_shared/fact-changes.yaml`

```yaml
fact_changes:
  - id: "FC-001"
    date: "2026-03-18"
    field: "naming convention version"
    old_value: "v3.9"
    new_value: "v3.10"
    source: "Tess session S164"
    canonical_authority: "TESS-NAMING-CONVENTION.md"
    propagation_status: "complete"
    files_updated:
      - "tess-strategic-scaling-system/SESSION-LOG.md"
      - "tess-strategic-scaling-system/CLAUDE.md"
    files_marked_superseded: []
    files_deferred: []
    constraint_ledger_entry: "CL-001"
```

### Step 5 — Update the Constraint Ledger

If the changed fact originated from a Constraint Ledger entry, update that entry with `supersedes` and mark the old entry as `status: "superseded"`. See CONSTRAINT-LEDGER-PROTOCOL.md for the full supersession format.

### Step 6 — Gate Check

**BLOCKING:** Do not proceed with downstream execution until:

- All files are updated, marked superseded, or explicitly deferred
- The fact-changes.yaml entry has `propagation_status` set
- If any files are deferred, the reason is documented

If propagation cannot be completed, **HALT and surface to the operator.**

---

## CREATIVE OS-SPECIFIC EXAMPLES

### Example 1: Naming Convention Version Bump

```
FACT CHANGE DETECTED:
  Field: naming convention version
  Old value: "v3.9" (position 8 used legacy ver/hor codes)
  New value: "v3.10" (position 8 uses exv/exh codes)
  Source: Tess session S164
  Canonical authority: TESS-NAMING-CONVENTION.md

PROPAGATION REQUIRED:
  7 files contain "v3.9" or reference old position 8 codes
  1. tess/.../SESSION-LOG.md — Build State version field
  2. tess/.../CLAUDE.md — version reference
  3. veda/.../VEDA-ANTI-DEGRADATION.md — "v3.4" in Gate 4 description
  4. veda/.../src/sub-agents/naming-generator/validator.ts — validation rules
  5. orion/.../CLAUDE.md — references naming convention
  6. protocols/PIPELINE-HANDOFF-REGISTRY.md — references naming convention
  7. SETUP.md — references naming convention

ACTION: Update all 7 files. Log as FC-001. Create CL entry.
```

### Example 2: Root Angle Rename

```
FACT CHANGE DETECTED:
  Field: root angle name for i223
  Old value: "Chronic Slicer v1"
  New value: "Chronic Slicer"
  Source: human directive (consistency cleanup)
  Canonical authority: SSS Column C

PROPAGATION REQUIRED:
  3 files contain "Chronic Slicer v1"
  1. SSS spreadsheet — Column C, row for i223
  2. neco/_output/sf2-ads/sf2-angle-library.md — angle reference
  3. orion/_ops/launch-boards/sf2/sf2-launch-board-content.md — persona mapping

ACTION: Update spreadsheet (Tess). Update files 2-3. Log as FC-002.
```

### Example 3: Team Roster Change

```
FACT CHANGE DETECTED:
  Field: editor roster
  Old value: (editor not in list)
  New value: "Keenan Garrett (kg)" added
  Source: HR / team update
  Canonical authority: team-codes.yaml

PROPAGATION REQUIRED:
  1 file needs update
  1. orion/_ops/static-delivery/team-codes.yaml — add new entry

ACTION: Update team-codes.yaml. No other propagation needed (name_generator.py loads from YAML dynamically).
```

---

## ANTI-PATTERNS

1. **Do NOT silently update files.** Always present the list to the operator first. The operator may have context about which files should be updated vs. marked superseded.
2. **Do NOT skip propagation because "the file will be regenerated later."** Log it as deferred. The old value WILL re-appear if the regenerating agent reads a stale upstream file.
3. **Do NOT treat this as optional.** Data drift is the #1 quality failure in multi-agent pipelines.
4. **Do NOT update only the immediately adjacent files.** Search the ENTIRE Creative OS directory tree. Fact drift propagates through chains of files that reference each other.
5. **Do NOT update files in agents you're not currently working in without flagging it.** Cross-agent updates should be logged in both agents' session logs.

---

## RELATIONSHIP TO OTHER PROTOCOLS

| Protocol | Relationship |
|----------|-------------|
| **Constraint Ledger** | Fact changes create new ledger entries with `supersedes` field. The ledger tracks the decision; this protocol enforces the propagation. |
| **Pipeline Handoff Registry** | If a handoff field definition changes, both this protocol AND the registry must be updated. |
| **Anti-Degradation** | Proceeding with known stale values is a forbidden behavior (see SYSTEM-CORE.md Law 6). |
| **Session Logs** | All fact change propagations should be noted in the session log of the agent that initiated the change. |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation. 6-step propagation protocol adapted for Creative OS's multi-agent domain. Includes 3 Creative OS-specific examples (naming convention, root angle, team roster). |
