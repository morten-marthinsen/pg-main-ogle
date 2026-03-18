# Creative OS — Constraint Ledger Protocol

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Track decisions that constrain downstream execution across agents. Makes decision rationale and downstream implications EXPLICIT and TRACEABLE.
**Adapted from:** Marketing OS Constraint Ledger Protocol v1.0

---

## WHY THIS EXISTS

Under context pressure, agents lose track of constraints established earlier in a workflow. Tess assigns a naming convention version. Orion makes a scorecard decision. Neco locks in an angle. By the time a downstream agent acts on these decisions, the original rationale and constraints have been buried under accumulated context.

The Constraint Ledger makes decision rationale and downstream implications explicit so they survive context compression and session boundaries.

---

## WHAT GETS LOGGED

Any decision that constrains how downstream agents operate:

| Decision Type | Agent | Example | Downstream Impact |
|---|---|---|---|
| **Naming convention version** | Tess | "Updated to v3.10 — position 8 redefined" | All Asset IDs must use new position definitions |
| **Root angle assignment** | Tess | "Script ID clst-i223 assigned to 'Chronic Slicer'" | All expansions of i223 must preserve this root angle name |
| **Brand thread assignment** | Orion | "SF2 launch = Thread 2 (Innovation)" | All SF2 creative tagged Thread 2 |
| **Scorecard metric change** | Orion | "Day 60 target: 3 active launches" | Priority shifts across all agents |
| **Expansion type classification** | Tess | "v0017-v0020 classified as EXV (vertical)" | Veda pipeline uses exv code, not exh |
| **Tool/API change** | Any | "Iconik collection ID changed" | All Veda uploads target new collection |
| **SSS schema change** | Tess | "New column R added: Delivery Date" | All intake queue writers must populate column R |
| **Neco angle approval** | Neco | "Angle locked: 'The Muscle Everyone Ignores'" | All downstream scripts must serve this angle |
| **Team roster change** | Orion | "New editor: Keenan Garrett (kg)" | name_generator.py team-codes.yaml updated |
| **Strategic pivot** | Orion | "Pause env v2 AI pipeline" | Veda stops processing AI background swaps |

---

## LEDGER FORMAT

```yaml
constraint_ledger:
  project: "[project-code or 'system']"
  created: "[ISO 8601]"
  last_updated: "[ISO 8601]"

  entries:
    - id: "CL-001"
      agent: "tess"
      decision: "Naming convention updated to v3.10 — position 8 expansion type codes simplified"
      rationale: "Old codes (ver/hor) caused confusion. New codes (exv/exh) are clearer."
      constraints:
        - "All new Asset IDs must use exv/exh, not legacy ver/hor"
        - "Existing assets retain old codes — do not retroactively rename"
        - "TESS-NAMING-CONVENTION.md is the single source of truth for position definitions"
      downstream_agents: ["veda", "neco"]
      status: "active"

    - id: "CL-002"
      agent: "orion"
      decision: "SF2 launch assigned to Brand Thread 2 (Innovation)"
      rationale: "SF2 is a new product category (anti-slice driver). Aligns with Innovation thread, not Journey thread."
      constraints:
        - "All SF2 creative tagged Thread 2"
        - "Neco angle ideation for SF2 uses innovation framing, not improvement framing"
        - "Orion weekly update reports SF2 under Thread 2 metrics"
      downstream_agents: ["tess", "veda", "neco"]
      status: "active"

    # --- Superseded entry example ---
    - id: "CL-003"
      agent: "tess"
      decision: "Root angle i223 renamed from 'Chronic Slicer v1' to 'Chronic Slicer'"
      rationale: "Version suffix was inconsistent with other root angle names"
      supersedes: "CL-001-original-name"
      supersedes_reason: "Naming consistency cleanup"
      fact_change_ref: "FC-001"
      constraints:
        - "All references to i223 must use 'Chronic Slicer' — no version suffix"
      downstream_agents: ["veda", "neco"]
      status: "active"
```

---

## LIFECYCLE

### When Entries Are Created

| Trigger | Agent | Examples |
|---|---|---|
| Naming convention version change | Tess | Position redefinition, new codes added |
| Root angle assignment or rename | Tess | New script ID → root angle binding |
| Brand thread decision | Orion | Product launch → thread assignment |
| Scorecard metric change | Orion | 30/60/90 target adjustment |
| Angle approval (human confirmed) | Neco | Locked angle that constrains all downstream scripts |
| Tool/API configuration change | Any | Iconik endpoint, SSS schema, team roster |
| Strategic pivot | Orion | Priority shift, project pause/resume |

### When Entries Are Updated

| Trigger | Action |
|---|---|
| Human modifies decision | Update entry, add `modified_by: human` + `modification_reason` |
| Downstream conflict detected | Add `conflict_flag` with details |
| Fact change propagation | Cross-reference with fact-changes.yaml |

### When Entries Are Retired

Entries are NEVER deleted. They are marked `status: "superseded"` with:
- `superseded_by`: ID of the replacing entry
- `superseded_date`: When the supersession occurred
- `supersedes_reason`: Why the old decision was replaced

The superseding entry uses the `supersedes` field to point back to the old entry. Full chain is preserved.

---

## HOW AGENTS USE THE LEDGER

### At Session Start

When an agent begins a session involving a specific project:

1. **Check if a constraint ledger exists** for the project (or system-level)
2. **Filter entries** by `downstream_agents` containing this agent's name
3. **List active constraints** — these are additional requirements for this session
4. **Note any recent changes** (entries created or superseded since last session)

### During Execution

The constraint list is treated as mandatory requirements alongside the agent's own CLAUDE.md rules. If an action would violate a ledger constraint:

1. **Flag the conflict** in the session log
2. **Resolve by adhering to the constraint** (the upstream decision takes precedence)
3. If resolution is impossible, **HALT and surface to the operator**

### Before Handoff

Before any inter-agent handoff, verify that the output respects all active constraints in the ledger for the target agent.

---

## OUTPUT LOCATION

The constraint ledger lives in the project's output directory:

```
[project-directory]/constraint-ledger.yaml
```

For system-wide constraints (naming convention changes, team roster updates, tool configuration):

```
_performance-golf/pg-creative-os/_shared/constraint-ledger.yaml
```

Created at the first constraint-creating decision and grows as subsequent decisions add entries.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation. Adapted from Marketing OS for Creative OS's multi-agent domain. Covers naming convention, root angle, brand thread, scorecard, tool/API, and strategic pivot constraints. |
