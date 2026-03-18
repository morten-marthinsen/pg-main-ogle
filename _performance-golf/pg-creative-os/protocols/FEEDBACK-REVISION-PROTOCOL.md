# Creative OS — Feedback/Revision Protocol

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Structured approach to handling revisions at 3 severity levels. Prevents agents from "drifting to raw model" by ensuring the right context is re-loaded for each revision type.
**Adapted from:** Marketing OS Feedback/Revision Protocol v1.2

---

## WHY THIS EXISTS

When a human requests a revision, the agent often regenerates from its current (possibly degraded) context rather than re-loading the structural constraints that produced the original output. Result: the revision is technically responsive but structurally weaker — the agent has "drifted to raw model."

This protocol ensures that every revision re-loads the appropriate level of context.

---

## THREE SEVERITY LEVELS

### Level 1: Light Edit

**What it is:** Word-level or value-level changes. The structure and approach are correct; specific values need updating.

**Examples per agent:**
- **Orion:** "Change this task's priority from B to A" / "Update the scorecard metric"
- **Tess:** "Fix this root angle name" / "Change this Asset ID's country code"
- **Veda:** "Update the expansion type code" / "Fix this metadata field"
- **Neco:** "Change this headline word" / "Fix this credential to 30+ years"

**What to re-load:**
- Anti-degradation adapter (agent-specific — ensures forbidden rationalizations are active)
- Naming convention (if Asset ID or naming is involved)

**What NOT to do:**
- Do NOT re-run upstream analysis
- Do NOT regenerate surrounding content
- Do NOT re-read the full agent spec

**Process:**
1. Identify the specific value to change
2. Search for ALL instances of the old value (Fact Change Propagation if it appears in multiple files)
3. Replace with new value
4. Verify the change is consistent across all references

---

### Level 2: Structural

**What it is:** Section-level or approach-level changes. The output exists but the framing, structure, or approach needs rework.

**Examples per agent:**
- **Orion:** "Restructure the weekly update format" / "Rewrite the delegation framework"
- **Tess:** "Change the classification thresholds" / "Restructure the intake queue columns"
- **Veda:** "Refactor the orchestrator routing logic" / "Change how the pipeline handles AI params"
- **Neco:** "Rewrite this angle with different framing" / "Change the audience segmentation approach"

**What to re-load:**
- Agent's CLAUDE.md (full Build State + session protocol)
- Relevant sub-agent spec (the one that produced the output being revised)
- Constraint Ledger (check for active constraints that affect the revision)
- Anti-degradation adapter

**What NOT to do:**
- Do NOT regenerate from scratch (preserve what works)
- Do NOT ignore constraint ledger entries (upstream decisions still apply)

**Process:**
1. Re-read the agent's CLAUDE.md for current state
2. Check Constraint Ledger for active constraints on the affected output
3. Identify what specifically needs to change (don't over-revise)
4. Revise the affected section(s) while preserving unaffected parts
5. Verify the revision doesn't violate any constraint ledger entries
6. If the revision changes a downstream constraint, create a new Constraint Ledger entry

---

### Level 3: Full Regen

**What it is:** Fundamental strategy or approach change. The core direction is shifting, not just the execution.

**Examples per agent:**
- **Orion:** "New scorecard metrics for the next 30 days" / "Different strategic priorities entirely"
- **Tess:** "Change the naming convention structure" / "New classification system"
- **Veda:** "New expansion agent type" / "Different pipeline architecture"
- **Neco:** "New brand thread" / "Different audience entirely" / "New behavioral framework approach"

**What to re-load:**
- Full agent context (CLAUDE.md + master agent + relevant specs)
- Constraint Ledger (update or supersede affected entries)
- Fact Change Propagation (mandatory — old values exist in multiple files)
- Anti-degradation (full, not just adapter)

**What NOT to do:**
- Do NOT skip fact change propagation (old values WILL persist and cause downstream errors)
- Do NOT assume downstream outputs are still valid (they probably aren't)

**Process:**
1. Re-read full agent context
2. Update Constraint Ledger — supersede old entries, create new ones
3. Run Fact Change Propagation for every value that changed
4. Regenerate the affected output(s) with full context loaded
5. Identify all downstream outputs that depend on what changed
6. Flag downstream outputs as stale (they need re-evaluation)
7. Verify no orphaned references to old approach remain

---

## NON-NEGOTIABLES (ALL LEVELS)

These apply regardless of revision severity:

1. **Re-read the anti-degradation adapter before any revision.** Even Light Edits can introduce forbidden rationalizations if the agent is under context pressure.
2. **Never revise from memory.** Re-read the actual file being revised, not your recollection of it.
3. **Preserve what works.** A revision to one section should not degrade adjacent sections.
4. **Log the revision.** Note in the session log what was revised, why, and at what severity level.
5. **Check downstream.** Every revision at Level 2+ should ask: "Does this change affect anything downstream?"

---

## REVISION SEVERITY DECISION GUIDE

| Signal | Level |
|--------|-------|
| "Change X to Y" (single value) | Level 1 |
| "Fix this typo / wrong number" | Level 1 |
| "Rewrite this section" | Level 2 |
| "Use a different approach for X" | Level 2 |
| "This whole direction is wrong" | Level 3 |
| "We're changing the strategy" | Level 3 |
| Not sure | Default to Level 2 (safer — re-loads more context) |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation. 3 severity levels with per-agent examples, context re-loading rules, and non-negotiables. |
