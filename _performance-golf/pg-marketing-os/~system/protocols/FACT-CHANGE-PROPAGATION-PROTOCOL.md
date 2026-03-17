# Fact Change Propagation Protocol

**Version:** 1.0
**Created:** 2026-03-15
**Purpose:** Prevent upstream-downstream data drift when a human directive changes a factual data point mid-pipeline
**Authority:** EQUAL to ~system/SYSTEM-CORE.md
**Sources:** QE 3.0 Self-Learning Pipeline Test T3 (class-d gap), RS1 production evidence (4 confirmed instances)

---

## Why This Exists

When a human decision mid-pipeline changes a factual data point — a credential, guarantee term, feature name, pricing, or product claim — the new value gets applied to the current file but upstream files that established the old value are not updated. Every downstream skill that reads those stale upstream files re-introduces the old value.

This is the Marketing OS's #1 systemic quality gap. Four confirmed instances in the RS1 production run:

| Instance | Old Value | New Value | Upstream Updated? |
|----------|-----------|-----------|-------------------|
| McGinley credential | 25+ years | 30+ years | No — Soul.md, campaign-brief.json, all core message packages still stale |
| Guarantee terms | 30-day conditional | 365-day unconditional | No — offer-package.json still stale |
| Feature names | "Face Square Focus" / "10-Piece Premium Construction" | "T-Trac Alignment Lines" / "10-Piece Hammerhead Construction" | No — feature-package.json still stale |
| Founders 500 | Included in offer-package.json | Excluded from PDP (key decision #9) | No — offer-package.json still references it |

The Constraint Ledger tracks decisions forward (upstream → downstream). This protocol tracks changes backward (downstream decision → upstream propagation).

---

## Trigger Condition

This protocol activates when **any** of the following occur:

1. A human directive changes a factual data point that exists in upstream output files
2. A human edits a downstream file to contain a different value than the upstream source
3. During execution, a conflict is detected between a value in the current file and the same value in an upstream package
4. A Constraint Ledger entry is created with a `supersedes` field

**Factual data points include:** credentials, specs, guarantee terms, feature names, pricing, product claims, SKU names, dates, statistics, regulatory claims, and any named entity that appears in multiple files.

---

## Protocol Steps

### Step 1 — Identify the Change

When a fact change is detected:

```
FACT CHANGE DETECTED:
  Field: [what changed — e.g., "McGinley credential"]
  Old value: [exact old value]
  New value: [exact new value]
  Source of change: [human directive / human edit / conflict detection]
  Canonical authority: [which source is authoritative — e.g., "user directive 2026-03-15"]
```

### Step 2 — Search the Output Tree

Search the project's entire output tree (`~outputs/[project-code]/`) for ALL files containing the old value:

```
Search: grep -r "[old value]" ~outputs/[project-code]/
```

Present the full list to the operator:

```
PROPAGATION REQUIRED:
  [N] files contain the old value "[old value]"
  The new canonical value is "[new value]"

  Files requiring update:
  1. [file path] — line [N]: "[context showing old value]"
  2. [file path] — line [N]: "[context showing old value]"
  ...
```

### Step 3 — Propagate or Mark

For each file containing the old value, the operator chooses one of:

| Action | When to Use | What Happens |
|--------|-------------|--------------|
| **Update** | The file is active and will be read by downstream skills | Replace old value with new value in the file |
| **Mark superseded** | The file is a historical artifact or intermediate output | Add `[SUPERSEDED by FC-XXX]` marker inline, pointing to the fact-changes log |
| **Defer** | The file will be regenerated from scratch in the current pipeline run | Note deferral in fact-changes log; validator will re-check when the file is next written |

### Step 4 — Log the Change

Create or update the project's fact-changes tracking file:

```
~outputs/[project-code]/fact-changes.yaml
```

Format:

```yaml
fact_changes:
  - id: "FC-001"
    date: "2026-03-15"
    field: "McGinley credential"
    old_value: "25+ years"
    new_value: "30+ years"
    source: "user directive"
    canonical_authority: "MEMORY.md — McGinley credential locked at 30+ years"
    propagation_status: "complete"  # or "incomplete" or "deferred"
    files_updated:
      - "Soul.md"
      - "campaign-brief.json"
    files_marked_superseded:
      - "story_elements_research.md"
    files_deferred: []
    constraint_ledger_entry: "CL-XXX"  # if applicable
```

### Step 5 — Update the Constraint Ledger

If the changed fact originated from a Constraint Ledger entry, update that entry:

```yaml
- id: "CL-003"
  skill: "03-root-cause"
  decision: "McGinley credential: 30+ years"
  supersedes: "CL-001"  # points to the original entry
  supersedes_reason: "User directive — credential updated based on direct knowledge"
  constraints:
    - "All files must use '30+ years' — not '25+' or '35+'"
  status: "active"
```

The original entry gets marked:

```yaml
- id: "CL-001"
  status: "superseded"
  superseded_by: "CL-003"
  superseded_date: "2026-03-15"
```

### Step 6 — Gate Check

**BLOCKING:** Do not proceed with downstream execution until:

- All files are updated, marked superseded, or explicitly deferred
- The fact-changes.yaml entry has `propagation_status` set
- If any files are deferred, the reason is documented

If propagation cannot be completed (e.g., too many files, ambiguous context), **HALT and surface to human.**

---

## Validator Integration

The `fact_change_validator.py` hook provides L3 programmatic enforcement:

1. **On every file write in `~outputs/`:** Checks if a `fact-changes.yaml` exists in the same project directory
2. **If fact changes exist with `propagation_status: incomplete`:** Scans the written file for any `old_value` entries
3. **If stale values found:** Returns a WARNING with the specific old values detected and their canonical replacements
4. **On Stop hook:** Scans the entire project output tree for any remaining stale values from incomplete fact changes

---

## Relationship to Other Protocols

| Protocol | Relationship |
|----------|-------------|
| **Constraint Ledger** | Fact changes create new ledger entries with `supersedes` field. The ledger tracks the decision; this protocol enforces the propagation. |
| **Scoped Verification** | VP-1 (Foundation Boundary) and VP-2 (Midpoint Integrity) should cross-reference the fact-changes log to verify no stale values crossed the boundary. |
| **Foundation Integrity Check** | Should load fact-changes.yaml as part of its verification input. |
| **Active Recitation** | If a recitation anchor contains a superseded value, the recitation file must be updated as part of propagation. |

---

## Tier Applicability

| Tier | Enforcement |
|------|-------------|
| **Full** | Mandatory — all 6 steps, validator active, blocking gate |
| **Standard** | Mandatory — Steps 1-4 + gate check. Validator active. |
| **Quick** | Steps 1-2 only — identify and search. Human tracks manually. |

---

## Anti-Patterns

1. **Do NOT silently update upstream files.** Always present the list to the operator first. The operator may have context about which files should be updated vs. marked superseded.
2. **Do NOT skip propagation because "the file will be regenerated later."** Log it as deferred with a reason. The validator will re-check.
3. **Do NOT treat this as optional.** This is a blocking gate. Data drift is the #1 quality failure in multi-step pipelines.
4. **Do NOT update only the immediately adjacent files.** Search the ENTIRE output tree. Fact drift propagates through chains of files that reference each other.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-15 | Initial creation — 6-step propagation protocol with validator integration, Constraint Ledger supersedes field, tier-based enforcement |
