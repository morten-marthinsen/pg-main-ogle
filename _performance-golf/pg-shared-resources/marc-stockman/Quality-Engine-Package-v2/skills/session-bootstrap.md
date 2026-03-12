---
name: session-bootstrap
description: Session initialization and re-initialization protocol with tiered skill loading. Full session start (initialize) and delta refresh (re-initialize) for mid-session updates.
version: 2.4
---
# Session Bootstrap Protocol (Initialize & Re-initialize Commands)

**Version:** 2.4 | March 11, 2026
**Trigger:** Marc says "initialize" (new session) or "re-initialize" (refresh existing session)

---

## Command Summary

| Command | Trigger | Purpose | When to Use |
|---------|---------|---------|-------------|
| `initialize` | Marc says "initialize" or pastes the bootstrap prompt | Full session start from scratch | New thread, new session, starting fresh |
| `re-initialize` | Marc says "re-initialize" or "reinitialize" or "refresh" | Refresh existing session with latest changes | Mid-session after skill updates, after context compaction, after returning from a break |

Both commands execute the same protocol below, but `re-initialize` runs in **delta mode** — it compares current state against what was loaded at the start of the session and highlights what changed.

---

## Initialize Protocol (9 Steps)

### Step 1: Read Session State Anchor + Operational Files

Check the workspace for these files and read any that exist. Read in this order:

**Active files (always read):**
0. `session-state.md` — Session state anchor (READ FIRST if it exists — provides thread identity, current task, modified skills, key decisions, and remaining open items for rapid recovery)
1. `reasoning-log.md` — Pre/post-action reasoning entries
2. `staleness-map.md` — Artifact dependency tracking
3. `session-learning-log.md` — Lessons learned and rule promotions
4. `commitment-registry.md` — Promise tracking
5. `foundational-findings.md` — Foundational findings log
6. `PROJECT.md` — Project charter (if one exists for current project)
7. `master-todo.md` — Master to-do list (if one exists)
8. Any `HANDOFF*.md` — Thread transition documents

**Legacy files (read only if superseding skill is unavailable):**
9. `persistent-rules.md` — Superseded by `marc-ops-framework` skill
10. `Skill_0_Prompt_Optimization.md` — Superseded by `prompt-optimizer` skill
11. `audit-command.md` — Superseded by `audit` skill
12. `convergence-gate.md` — Superseded by `audit` skill

If any of these files don't exist, note which ones are missing but proceed. They will be created as needed during work.

**Re-initialize delta:** When running as re-initialize, read `session-state.md` FIRST — it contains the complete recovery state. Then verify against other operational files. Only report material differences.

**Post-compaction priority:** If `session-state.md` exists and conversation context appears thin (compaction symptoms), treat `session-state.md` as the authoritative source and rebuild session state from it before loading anything else.

---

### Step 2: Search Memory for Context

Run memory searches for:
- Active projects and standing rules
- Marc's current priorities and open items
- Any recent session context that carries forward
- **Failure history (MANDATORY):** Search for "class-c violations" and "operational file staleness recurring pattern." This surfaces prior session failure patterns so the AI enters the session aware of its known weaknesses, not just its rules.

This ensures continuity across sessions. Marc's memory contains standing preferences, project history, and operational context that may not be in workspace files.

**Re-initialize delta:** When running as re-initialize, focus memory search on what may have changed since session start — new facts stored during the session, updated project status, recently modified preferences. Include failure history search on every re-initialize — compaction may have erased awareness of failure patterns.

---

### Step 3: Check for Interrupted Audits

Check for `/workspace/audit-checkpoint.md`:
- If it exists and is less than 2 hours old: there is an interrupted audit to resume. Note the step it reached, and the deliverable being audited. Present this to Marc and ask whether to resume or start fresh.
- If it exists and is more than 2 hours old: note that a stale checkpoint exists and will be discarded.
- If it doesn't exist: no interrupted audits.

---

### Step 4: Check Reasoning Log Currency

If `reasoning-log.md` exists:
- Is it current? (updated within last 2 hours or within last 3 major actions)
- If stale, note this in the session status

If it doesn't exist: note that it will be created when first needed.

---

### Step 5: Create Missing Operational Infrastructure

If any of these files don't exist, create them with minimal scaffolding:

**reasoning-log.md** (if missing):
```markdown
# Reasoning Log
| # | Task | A: Stakeholders | B: Domain | C: Tempo | D: Pre-Mortem | E: Rollback | F: Plan | G: Outcome | H: Delta | I: Lesson | J: Promote? |
|---|------|-----------------|-----------|----------|---------------|-------------|---------|------------|----------|-----------|-------------|
```

**staleness-map.md** (if missing):
```markdown
# Staleness Map
| Artifact | Last Updated | Depends On | Status |
|----------|-------------|------------|--------|
```

**session-learning-log.md** (if missing):
```markdown
# Session Learning Log
| # | Date | What Happened | Why | Fix | Preventive Rule | Classification | Promoted? |
|---|------|--------------|-----|-----|----------------|----------------|-----------|
```

**commitment-registry.md** (if missing):
```markdown
# Commitment Registry
| # | Commitment | Status | Artifact | Notes |
|---|-----------|--------|----------|-------|
```

Share each created file via share_file (R-11).

**Re-initialize delta:** Skip this step entirely — infrastructure already exists. Only check for files that SHOULD exist but are missing (which would indicate a problem).

---

### Step 6: Check Credentials (R-23)

Check `/workspace/credentials/` for saved credential files:
- List all credential files found
- For each: note the platform, file size (as a proxy for validity), and when it was saved
- Cross-reference with memory for known credential status (which platforms have valid cookies, which need re-export)

Report credential status in the session summary. If credentials are missing for platforms that Marc has previously provided cookies for, flag this — Marc may need to re-export.

---

### Step 7: Reload Skills from Library (Tiered Loading)

Skills are loaded in tiers to minimize context consumption at init. The framework text in `marc-ops-framework` contains the behavioral rules (so enforcement doesn't depend on the skill being loaded), but the detailed procedures live in the tier-2 skills and are loaded on-demand when their triggers fire.

**Tier 1 — Always load at init (~10,600 tokens projected):**

| Skill | Why Always | Token Cost |
|-------|-----------|------------|
| `marc-ops-framework` | Master operating system — all rules, routing, preferences. Load FIRST. | ~8,500 |
| `event-driven-reminders` | 8 event detectors that fire at natural decision points. Must be active from the start to catch early mistakes. | ~2,100 |

After loading Tier 1, read `session-state.md` (already done in Step 1). This gives the session full rule awareness and active monitoring at ~7.5% of the 200K context window (down from ~14.6% when all skills loaded).

**Tier 2 — Load on-demand when triggers fire:**

| Skill | Trigger to Load | Why Deferred |
|-------|----------------|-------------|
| `audit` | Marc says "audit", "check", "self audit", "check yourself", "run a check", "checkpoint" | Detailed audit procedure only needed when auditing |
| `structural-gates` | Converting a behavioral rule to structural enforcement, building new gates, or class-c threshold hit | Gate definitions referenced by framework text; full skill needed only for gate operations |
| `issue-logger` | Marc correction, audit finding, regression FAIL, self-caught error, R-24 Correction Checkpoint | Issue entry format and classification only needed when logging |
| `milestone-persistence` | R-24 enforcement details needed — compaction detected, milestone file updates, checkpoint gates | Detailed R-24 sub-features only needed when R-24 fires |
| `prompt-optimizer` | Complex/multi-step task requiring Skill 0 optimization | Full optimization protocol only needed for qualifying tasks |
| `objective-intake` | Marc states a new objective (pre-Skill 0 orchestration) | Only needed when framing a new objective |
| `session-auth-api-access` | Cookie auth needed for platform APIs | Only needed for credential-based API access |

**How on-demand loading works:** When a trigger condition for a Tier 2 skill is detected, load it via `load_skill` before executing the triggered protocol. The framework's behavioral rules (R-17, R-24, R-26, etc.) remain active at all times through the framework text — the skills add detailed procedures, not the rules themselves.

**Re-initialize delta:** When running as re-initialize, check if any skill was modified during the current session (saved to library via `save_custom_skill`). If so, reload it from the library to pick up the latest version. Report which skills were refreshed. Only reload Tier 1 skills automatically; reload Tier 2 skills only if they are currently loaded in the workspace and were modified.

**R-17 Load Skill Guard:** When `load_skill` is called on a skill modified during the current session, the workspace copy will be overwritten by the library version. If you made local modifications (especially YAML frontmatter or in-session patches), note them and re-apply after loading.

---

### Step 8: Present Session Status

Present a structured status to Marc:

```
## Session Status

**Framework version:** [version from marc-ops-framework]
**Rules loaded:** [count] (expected: 13 directives + 27 preventive rules = 40, plus 12 Accelerator rules)
**Tier 1 skills loaded:** [list with versions — marc-ops-framework, event-driven-reminders]
**Tier 2 skills available:** [list — loaded on-demand when triggers fire]
**Context budget:** [estimated tokens consumed / 200K window = X%]
**Operational files:** [which exist, which are missing]
**Credentials:** [which platforms have saved cookies, which are missing]
**Interrupted audits:** [none / details]
**Open items from prior work:** [from commitment registry, master-todo, reasoning log, handoff docs]
**Memory context:** [key items from memory search]
**Failure history warnings:** [If failure history search returned recurring patterns, list them here with severity. Example: "⚠️ R-24 (file staleness) has 3+ class-c violations across sessions — extra vigilance required on milestone persistence." If no recurring patterns found, state "No recurring failure patterns detected."]

Ready for your prompt.
```

**Re-initialize delta format:** When running as re-initialize, replace the full status with a delta report:

```
## Re-initialize Complete — Delta Report

**Skills refreshed:** [list of skills reloaded, with version changes noted]
**Files changed since last load:** [list with summary of what changed]
**New memory context:** [anything new from memory search]
**Credential status:** [any changes]
**Stale artifacts:** [any flagged by L3]

What changed:
- [bullet list of material differences from last initialize/re-initialize]

What didn't change:
- [brief note confirming unchanged items are still valid]

Continuing with updated context.
```

---

### Step 9: Confirm Upstream Stack Available

Verify that the upstream layers will fire on Marc's next prompt. Under tiered loading, these are Tier 2 skills — confirm they are available in the library, do NOT load them at init.

1. **Skill 0 (Prompt Optimization Engine):** Confirm `prompt-optimizer` is available in the skill library. It will auto-load on complex/multi-step tasks. If `Skill_0_Prompt_Optimization.md` exists in workspace as a legacy file, note it but prefer the saved skill.

2. **Objective Intake:** Confirm `objective-intake` is available in the skill library. It will load when Marc states a new objective. Do NOT load it at init — it's Tier 2.

The full upstream sequence is: Marc states objective → Objective Intake (loads on-demand) → Skill 0 (loads on-demand) → Marc says "run" → Execution.

---

## Setup Confirmation Format

After completing all steps, respond with:

1. **Framework version** (current version of marc-ops-framework)
2. **Number of rules loaded** (expected: 40 rules — 13 directives + 27 preventive rules, plus 12 Accelerator rules)
3. **Tier 1 skills loaded** (marc-ops-framework + event-driven-reminders, with versions)
4. **Tier 2 skills available** (list of on-demand skills and their triggers)
5. **Context budget** (estimated tokens consumed at init / 200K = X%)
6. **Operational files status** (which exist, which are missing, which were created)
7. **Credential status** (which platforms have cookies, which are missing)
8. **Open items** from prior work (from commitment registry, master-todo, reasoning log, or handoff docs)
9. **"Ready for your prompt."**

---

## Edge Cases

- **Marc pastes the full bootstrap prompt instead of just saying "initialize":** Execute the same protocol. The bootstrap prompt contains the full framework; this skill's protocol is the operational execution of that framework.
- **Workspace is completely empty (brand new thread):** Create all operational files from Step 5. Note that persistent-rules.md is not available and the framework is being loaded from saved skills and memory instead.
- **Marc says "initialize" mid-session:** Run the full protocol but in re-initialize delta mode. Mid-session initialize IS a re-initialize — you're refreshing, not starting from scratch.
- **Marc says "re-initialize" at the start of a brand new thread:** Run the full initialize protocol instead — there's nothing to compare against in a new thread. Inform Marc: "No prior state to compare against — running full initialize instead."
- **Context compaction just happened:** Re-initialize is critical here. R-24 (Compaction Self-Detection) should auto-fire on next action, but if it doesn't, Marc may need to say "re-initialize". The conversation summary preserves key facts, but loaded skill content is gone. Re-initialize reads `session-state.md` first for rapid recovery, then reloads all skills and operational files, restoring full capability.
- **Skills failed to load from library (FALLBACK PROTOCOL):** If `load_skill` fails (network issues, library unavailable): (1) Check `/workspace/skills/{skill-name}/SKILL.md` for a cached workspace copy. (2) If found, read it directly with the `read` tool. (3) Flag in the session status: "⚠️ {skill-name} loaded from workspace cache — may be outdated if updated in another thread." (4) Continue with the cached version rather than failing entirely. (5) When the library becomes available again, reload the skill to pick up any updates. This prevents total system failure on library outages.

---

## Re-initialize Decision Guide

When to suggest re-initialize to Marc:

| Situation | Suggest? | Why |
|-----------|----------|-----|
| Context compaction just happened | Yes, immediately | R-24 should auto-fire, but suggest as backup. `session-state.md` provides rapid recovery source. |
| Marc returns after 30+ minutes away | Yes, proactively | Skills may have been updated by other threads |
| A skill was just saved to library | Yes, if it affects current work | Pick up the latest version |
| Major operational file was updated | Yes | Ensure all rules are current |
| Thread is running normally, no changes | No | Unnecessary overhead |
| Marc explicitly says "don't re-initialize" | No | Respect the instruction |

---

## Registration in marc-ops-framework

This skill adds the `re-initialize` command to the Standing Commands table in `marc-ops-framework`:

| Command | Trigger | Action |
|---------|---------|--------|
| `re-initialize` | Marc says "re-initialize" or "reinitialize" or "refresh" | Load skill `session-bootstrap`. Execute in delta mode — reload skills, re-read changed files, search memory for new context, present delta report. |

When saving this skill, also update `marc-ops-framework` Section 3 (Standing Commands) to include the `re-initialize` command.

---

*This is the canonical definition of the initialize and re-initialize commands and session start protocol. Per L4 (Context Continuity).*

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Audit | PASSED | 2026-03-10 | AI | v2.2: Step 1 reorganized (active/legacy files), library fallback protocol added to Edge Cases. Immediate convergence. |
| Audit | PASSED | 2026-03-10 | AI | v2.3: Failure history memory search in Step 2, failure warnings in Step 8, Classification column in scaffolding. Convergence reached. |
| Audit | PASSED | 2026-03-11 | AI | v2.4: Tiered loading (Step 7 restructured into Tier 1/Tier 2), Step 8+9 updated, rule counts corrected to 27 preventive rules. 2 loops. Loop 1: 1 finding (audit trigger list incomplete — aligned with framework). Loop 2: 0 findings. Convergence reached. |