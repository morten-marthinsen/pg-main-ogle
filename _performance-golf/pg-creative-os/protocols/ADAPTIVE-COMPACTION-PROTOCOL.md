# Creative OS — Adaptive Compaction Protocol

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Progressive context reduction to extend session viability before mandatory breaks. Degrades gracefully rather than cliff-falling from full context to session break.
**Adapted from:** Marketing OS Adaptive Compaction Protocol v1.0 (OpenDev Enhancement 4)

---

## WHY THIS EXISTS

As sessions progress, agents accumulate context — file reads, phase outputs, reference docs, spreadsheet data. Without compaction, the only response to context pressure is a hard session break, which costs human time and risks information loss.

This protocol defines 5 stages of progressive compression. Each stage preserves less but never hits zero. The system degrades gracefully.

**Core principle:** Reduce SCOPE (fewer items loaded), not DEPTH (shallower thinking). The Effort Protocol level stays the same.

---

## WHEN TO APPLY

Compaction triggers are based on the context zone system (CREATIVE-OS-ANTI-DEGRADATION.md Part 4):

| Zone | Compaction Stages Applied |
|------|--------------------------|
| **GREEN** | None — full context |
| **YELLOW** | Stage 1 |
| **RED** | Stages 1-3 |
| **CRITICAL** | Stages 1-5 (if still over budget) |

Compaction is **cumulative** — each stage adds to the previous. Stage 3 assumes Stages 1 and 2 are already applied.

---

## THE 5 STAGES

### Stage 1: Compress Completed Phase Outputs to Summaries

**Trigger:** YELLOW zone entry
**Estimated savings:** ~20-30% of accumulated context

**Action:** For phases that are FULLY COMPLETE with outputs written to files, replace detailed context with one-line summaries. The full output exists on disk — keeping it in conversation context is redundant.

**What stays full (NEVER compress):**
- Current phase's working context
- Build State block
- Agent's CLAUDE.md session protocol
- Anti-degradation rules

**What gets summarized:**
- Completed phase reports → one line: "Phase [N]: [result]"
- File contents that were read for reference but not being actively edited
- Previous phase's detailed output (already written to file)

### Stage 2: Compress Session History to Build State Only

**Trigger:** RED zone entry (continued pressure after Stage 1)
**Estimated savings:** ~15-25% of session history

**Action:** Drop detailed session log entries from active context. The Build State block at the top of SESSION-LOG.md is the current snapshot — older entries are recoverable from the file.

**What stays:**
- Build State block (~25 lines)
- Current session's phase bullets (in progress)

**What gets dropped:**
- Prior session entries loaded at session start
- Archived session references
- Historical phase reports

### Stage 3: Compress Reference Material to Key Decisions Only

**Trigger:** RED zone (continued pressure after Stage 2)
**Estimated savings:** ~15-20% of reference material

**Action:** For reference docs that were loaded for context (master agent specs, PRDs, sub-agent specs), drop everything except the specific sections actively being used.

**Per-agent "always keep" items (NEVER compress):**

| Agent | Always Keep Full |
|-------|-----------------|
| **Orion** | Current scorecard state, active BLOCK/CONVINCE ME items, standing orders |
| **Tess** | Current pipeline stage data, naming convention (if parsing), classification rules (if classifying) |
| **Veda** | Current edit operation state, asset IDs in progress, test results from current phase |
| **Neco** | Current audience context, active angle + framework, behavioral frameworks in active use |

**What gets compressed:**
- Master agent sections not relevant to current task
- PRD sections already consumed
- Sub-agent specs for sub-agents not being used this session

### Stage 4: Generate Session Handoff and Recommend Break

**Trigger:** RED zone (continued pressure after Stage 3)

**Action:** This is not compression — it's preparation for orderly exit.

1. Complete the current atomic action (don't leave mid-phase)
2. Write current state to SESSION-LOG.md
3. Generate the agent's handoff prompt
4. Recommend session break to the operator

**The operator can override** and continue if they judge the remaining work is small enough to complete. But the recommendation is on record.

### Stage 5: Emergency State Save and HALT

**Trigger:** CRITICAL zone

**Action:** Save everything and stop. This is survival mode.

1. Save current state to SESSION-LOG.md immediately
2. Write any in-progress output to a file (even if incomplete — mark as `[INCOMPLETE — session break]`)
3. Generate mandatory handoff prompt
4. HALT — do not continue regardless of operator override

**This stage should almost never fire.** If it does, the session has gone too long without a break.

---

## COMPACTION VERIFICATION CHECKLIST

After applying ANY compaction stage, verify:

```
[ ] Agent's "always keep" items are INTACT (see Stage 3 table)
[ ] Build State block is INTACT
[ ] Current phase's working context is INTACT
[ ] No data needed for the CURRENT phase was compacted
[ ] Compaction stage noted in session log
```

**IF ANY CHECK FAILS:** Undo the compaction for the affected component. Compaction must never remove data the current phase actively needs.

---

## ANTI-PATTERNS

1. **Do NOT compress the current phase's context.** Only compress completed phases and reference material.
2. **Do NOT compress Build State.** It's ~25 lines — the savings aren't worth the risk.
3. **Do NOT compress anti-degradation rules.** These are the guardrails that prevent quality collapse — compressing them is self-defeating.
4. **Do NOT skip stages.** Apply them in order. Each stage assumes the previous stages have already reclaimed space.
5. **Do NOT treat Stage 4 as optional.** If you've reached Stage 4, context pressure is real and a break is genuinely recommended.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation. 5-stage progressive compaction adapted from Marketing OS for Creative OS's multi-agent domain. Per-agent "always keep" items defined. |
