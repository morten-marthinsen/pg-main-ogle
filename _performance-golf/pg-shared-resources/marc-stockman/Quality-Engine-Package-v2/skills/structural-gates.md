---
name: structural-gates
description: "Structural enforcement gate framework. 10 active gates with 4 enforcement tiers. Converts behavioral rules to mechanically enforced checks."
---

# Structural Gates for High-Value Rules

**Version:** 1.5 | March 12, 2026
**QE Roadmap:** Phase 1, Upgrade 3
**Principle:** Rules that have been violated 3+ times across sessions (class-c pattern) should be converted from behavioral instructions to structural enforcement that fires automatically.

---

## Building Code (Platform-Agnostic)

### The Standard

Every high-value rule must have a structural enforcement mechanism — a check that fires at a specific trigger point and blocks the action if the check fails. The AI cannot proceed past the gate without satisfying the check.

### The Failure Mode It Prevents

Behavioral rules fail under context pressure. The longer a session runs, the more rules compete for attention in the context window. Class-c violations (same rule violated 3+ times) are proof that behavioral enforcement is insufficient for that rule. Converting to structural enforcement eliminates the entire category of "forgot to follow the rule."

### When to Convert a Rule

A rule is a candidate for structural conversion when ANY of these conditions is met:
1. **3+ class-c violations** across sessions for the same rule (the formal escalation threshold)
2. **Data loss incident** caused by the behavioral version of the rule (e.g., R-17 load_skill overwrite)
3. **Binary check possible** — the rule's compliance can be verified with a yes/no test, not a judgment call

### The Gate Pattern

Every structural gate has five components:

| Component | Description | Example (R-25 YAML Frontmatter) |
|-----------|-------------|--------------------------------|
| **Trigger action** | The specific action that activates the gate | `save_custom_skill` is about to be called |
| **Check** | The binary verification | First line of file is `---` |
| **Pass behavior** | What happens when the check passes | Proceed with save_custom_skill |
| **Fail behavior** | What happens when the check fails | STOP. Add frontmatter. Then proceed. |
| **Log** | What gets recorded | "R-25 gate fired: [PASS/FAIL]. [Action taken if FAIL.]" |

### Enforcement Tiers

Not all rules need the same enforcement strength. Four tiers:

| Tier | Enforcement | When to Use | Example |
|------|------------|-------------|---------|
| **Hard gate** | Action is physically blocked until check passes | Data loss prevention, irreversible actions | R-25 (YAML frontmatter before save) |
| **Content substance** | Action blocked until content quality verified, not just existence/format | Gates where the AI might "fake" compliance by producing thin, repetitive, or perfunctory content that technically satisfies the format check but not the intent | PF-0 in audit (verify operational files have entries proportional to session work, not just that files exist) |
| **Soft gate** | Warning is logged, action proceeds but flagged for review | Quality checks, best practices | R-04 (substance ratio check) |
| **Audit-only** | No blocking, but violation is captured for Pass 5 learning | Low-risk rules, observational tracking | R-18 (context anchor) |

### Content Substance Tier — The "Faking vs. Skipping" Defense

**Attribution:** Rich Schefren (232-unit Distinction System pipeline failure, February 2026) + Tony Flores (independent observation from 13-part anti-degradation system)

**The problem:** Hard gates verify that an action happened — a file exists, a field is present, a function was called. They prevent SKIPPING. But two independent practitioners discovered that after adding hard gates, the AI's failure mode shifts from skipping steps to FAKING steps: producing checkpoint files with thin or repetitive content, calling share_file on an incomplete document, running an "audit" that finds zero issues in a clearly flawed deliverable.

Tony Flores: "Structural gates shifted the failure mode from skipping to faking."
Rich Schefren: Documented in operations-protocol-missing-layer.md — 232 files were "expanded, criticized, and revised" but quality gates were defined without enforcement. The files technically passed but the content was hollow.

**The pattern:** A content substance check goes beyond binary existence/format verification to sample whether the content actually satisfies the gate's intent:

| Hard Gate Check | Content Substance Enhancement |
|------|------|
| "Does the file exist?" | "Does the file contain substantive content proportional to the work done?" |
| "Was share_file called?" | "Was the shared file the current version, not a stale copy?" |
| "Were acceptance tests run?" | "Do the tests include adversarial and recovery cases, not just happy-path?" (R-26 already enforces this) |
| "Was the operational file updated?" | "Does the update reflect actual current state, not a copied-forward entry?" |
| "Was the audit convergence loop run?" | "Did the audit produce findings proportional to the deliverable's complexity?" |

**When to apply Content Substance checks:**
- Any gate that verifies file content (not just file existence)
- Any gate where the AI could satisfy the letter of the check while violating its spirit
- After long sessions (30+ tool calls) where attention decay increases faking risk
- On high-blast-radius deliverables (skills, permanent files, external-facing documents)

**Detection heuristics for faking:**
1. **Suspiciously clean audit** — Zero findings on a complex deliverable after a long session
2. **Copy-forward entries** — Operational file entries that are nearly identical to prior entries
3. **Thin proportionality** — A 400-line deliverable produced a 2-line reasoning log entry
4. **Format-only compliance** — Checkpoint file has the right headers but empty or boilerplate content under them
5. **Instant convergence on first audit** — Immediate convergence without any material findings on non-trivial work (note: immediate convergence IS valid for simple, well-executed tasks — suspicion applies to complex work)

**Integration with existing gates:** Content Substance is not a separate gate — it's a tier that can be applied to any existing hard gate. When a gate is promoted to Content Substance tier, it retains its original binary check AND adds a content quality verification step. If either check fails, the gate fails.

**Self-assessment contamination warning:** The same AI that produced thin content may self-assess that content as substantive — this is the same contamination problem that context-isolated-checks (Upgrade 1) solves. For high-blast-radius deliverables (skills, permanent files, external-facing documents), content substance checks should be routed through context-isolated-checks (subagent with fresh context) rather than self-assessed. For routine operational files, self-assessment with the detection heuristics above is acceptable.

**Integration with Gap G6 (Forbidden Rationalization List):** The faking detection heuristics above are rationalization patterns. When Gap G6 is built (Phase 2), the heuristics in this section should be migrated into the formal Forbidden Rationalization List, with this tier referencing the list rather than maintaining its own copy.

---

## Active Structural Gates

### Gate 1: R-25 — YAML Frontmatter Guard
**Tier:** Hard gate
**Trigger:** Before every `save_custom_skill` call
**Check:** Read first line of SKILL.md — is it `---`?
**Pass:** Proceed with save
**Fail:** STOP. Add required YAML frontmatter block. Then proceed.
**Status:** ACTIVE (built into R-25 rule text in marc-ops-framework)

### Gate 2: R-17 — Load Skill Guard
**Tier:** Hard gate
**Trigger:** Before every `load_skill` call
**Check:** Is this skill listed in `/workspace/.dirty-skills.json`?
**Pass (not dirty):** Create pre-load backup, proceed with load_skill
**Fail (dirty):** SKIP load_skill entirely. Use workspace copy. Log: "R-17 blocked load_skill for [skill] — dirty workspace copy preserved."
**Recovery:** If load_skill was called without checking (post-compaction), compare loaded version against `.pre-load-backup`. If backup is newer, restore.
**Status:** ACTIVE (built March 11, 2026 — v2.4)

### Gate 3: R-24 — File Freshness Gate
**Tier:** Hard gate
**Trigger:** Before every `share_file` call or marking a todo task "completed"
**Check:** Has `session-state.md` been updated since the last major action?
**Pass:** Proceed
**Fail:** STOP. Update session-state.md first. Then proceed.
**Status:** ACTIVE (built March 11, 2026 — v2.3)

### Gate 4: R-11 — Share Files Immediately
**Tier:** Hard gate
**Trigger:** After every file creation or modification (`write`, `edit`, or file-producing tool)
**Check:** Was `share_file` called for this file in the same turn?
**Pass:** No action needed
**Fail:** Before starting any new action, call `share_file` for the unshared file. Log: "R-11 gate fired: [filename] created but not shared. Sharing now."
**Implementation:** Maintain a mental or file-based ledger of files modified this turn. Before any new substantive action, verify the ledger is clear. At minimum, before every `submit_answer`, verify all modified files have been shared.
**Status:** ACTIVE (new — Phase 1, Upgrade 3)

### Gate 5: R-07 — Research Before Reasoning
**Tier:** Hard gate
**Trigger:** Before any analysis, synthesis, or draft composition that makes factual claims
**Check:** Has at least one `search_web`, `fetch_url`, or `search_vertical` call been made for this topic in the current session?
**Pass:** Proceed with analysis
**Fail:** STOP. Execute research first. Then proceed with analysis. Log: "R-07 gate fired: analysis attempted without prior research. Researching now."
**Exceptions:** (a) The task is purely internal system work (skill editing, operational file updates) with no external factual claims. (b) Marc explicitly says to use existing knowledge. (c) The information was already researched earlier in this session and is still in context.
**Implementation:** Before drafting any substantive deliverable, verify: "Can I cite at least one live source fetched this session for each major claim I'm about to make?" If not, research first.
**Status:** ACTIVE (new — Phase 1, Upgrade 3)

### Gate 6: R-26 — Acceptance Test Gate (via R-24 Milestone Checkpoint)
**Tier:** Hard gate
**Trigger:** When marking a feature/rule/skill as complete or saving to library
**Check:** Have R-26 acceptance tests been run and documented?
**Pass:** Proceed with marking complete
**Fail:** STOP. Run acceptance test. Document result. Then mark complete.
**Downstream Trace (HARD GATE):** When Gate 6 fires, also require: "List all permanent files that reference this skill's version, rule count, or gate count. Verify each is current." Execute via grep for the skill name, version string, and relevant counts across permanent files. If any reference is stale, update it before proceeding. This makes the recurring stale-count pattern structurally impossible.
**Provenance:** Downstream trace added March 11, 2026 per Reflect Proposal #9 — 4th consecutive audit caught stale counts in permanent files after skill updates.
**Status:** ACTIVE (built March 10, 2026 — downstream trace added March 11, 2026)

### Gate 7: R-17 — Dirty-File Write Gate
**Tier:** Hard gate
**Trigger:** After every `edit` call that modifies a file matching `skills/*/SKILL.md`
**Check:** Was `.dirty-skills.json` updated in the same turn to include this skill with the current timestamp and version?
**Pass:** Proceed to next action
**Fail:** STOP. Read the skill file's version line, update `.dirty-skills.json` with `{"skill-name": {"modified": "ISO-timestamp", "version": "vX.Y"}}`. Log: "R-17 write gate fired: [skill] edited but not registered as dirty. Registering now."
**Relationship to Gate 2:** Gate 2 (read-side) checks the registry before `load_skill`. Gate 7 (write-side) ensures the registry is populated after edits. Together they close the loop — Gate 7 feeds Gate 2. Without Gate 7, Gate 2 operates on stale data.
**Status:** ACTIVE (built March 11, 2026 — v1.1, closing write-side gap from repeat incident)

### Gate 8: R-17 — Post-Load Version Verification
**Tier:** Hard gate
**Trigger:** After every `load_skill` call completes (regardless of dirty state)
**Check:** Does a `.pre-load-backup` exist for this skill? If yes, compare the version line of the loaded workspace file against the backup version. Is the backup version newer than the loaded version?
**Pass (no backup):** Proceed. First-ever load — no prior version to protect.
**Pass (loaded >= backup):** Proceed. Loaded version is current or newer.
**Fail (backup > loaded):** STOP. Restore from `.pre-load-backup`. Log: "R-17 post-load gate fired: loaded [skill] vX.Y but backup has vX.Z. Restoring from backup." Update `.dirty-skills.json` to mark the skill as dirty (since the library copy is now known to be stale).
**Relationship to Gate 2:** Gate 2 prevents loading when a skill is known-dirty. Gate 8 catches the case where the skill was NOT known-dirty but `load_skill` returned an older version anyway (library propagation delay, caching, or post-save compaction). Gate 8 is the last-resort structural defense.
**Status:** ACTIVE (built March 11, 2026 — v1.1, elevating recovery mechanism to hard gate)

### Gate 9: R-24 — Post-Compaction State Refresh
**Tier:** Hard gate
**Trigger:** Context recovery detected — compaction summary processed, re-initialize command, or context explicitly restored from a summary/handoff
**Check:** Is `session-state.md` last-updated timestamp from the current context window's work? Specifically: does the timestamp postdate the compaction/recovery event?
**Pass:** Proceed with work.
**Fail:** STOP. Update `session-state.md` to reflect the current state (what's been done, what's pending, what skills are loaded, what versions are active). Then proceed.
**Log:** "R-24 Gate 9 fired: [PASS/FAIL]. Post-compaction state refresh [completed/not needed]."
**Detection heuristics for compaction/recovery:**
1. The conversation opens with a context summary or compaction recovery message
2. Marc says "re-initialize", "refresh", or "pick up where we left off"
3. The AI detects it has no memory of prior turns that session-state.md references
4. A `[CONTEXT SUMMARY]` block appears in the conversation
**Relationship to Gate 3:** Gate 3 (File Freshness) checks session-state.md currency before `share_file` or task completion — it's a periodic checkpoint. Gate 9 fires once at the start of a recovered context — it's a one-time initialization gate. Gate 3 is the ongoing enforcement; Gate 9 is the post-compaction bootstrap.
**Relationship to session-bootstrap:** The `re-initialize` command in session-bootstrap reads session-state.md but does not verify its currency. Gate 9 adds the currency check that session-bootstrap lacks. When both fire (re-initialize after compaction), Gate 9 fires first (update state), then session-bootstrap proceeds (read updated state).
**Provenance:** R-24 class-c threshold hit March 11, 2026 — 3 violations in a single session, all caused by deliverable production prioritized over operational file updates after context compaction. Approved by Marc March 11, 2026.
**Status:** ACTIVE (built March 11, 2026 — v1.4)

### Gate 10: R-25 — Export Frontmatter Guard
**Tier:** Hard gate
**Trigger:** Before building any zip archive, package, or bundle containing skill files for external distribution
**Check:** For every `.md` file in the package's `skills/` folder: does the first line equal `---`?
**Pass:** All files have frontmatter. Proceed with zip/package build.
**Fail:** STOP. Add YAML frontmatter to every file missing it. Use format: `---\nname: skill-name\ndescription: "..."\n---`. Then re-verify before proceeding.
**Why this exists:** `load_skill` strips YAML frontmatter from workspace copies. R-25 Gate 1 only fires on `save_custom_skill` — the export/packaging path was completely unguarded. 23 of 28 files shipped to the mastermind group without frontmatter.
**Relationship to Gate 1:** Gate 1 (R-25 save-side) guards the `save_custom_skill` path. Gate 10 (R-25 export-side) guards the packaging path. Together they ensure frontmatter survives both the save-to-library and the export-to-zip workflows.
**Provenance:** March 12, 2026 — Marc caught that 23 of 28 skill files shipped without frontmatter in the QE Package v2. Root cause: export path pulled from workspace copies where `load_skill` had stripped frontmatter.
**Status:** ACTIVE (built March 12, 2026 — v1.5)

---

## How to Add New Gates

When a rule qualifies for structural conversion (per the "When to Convert" criteria above):

1. **Define the five components** (trigger, check, pass, fail, log)
2. **Assign a tier** (hard, soft, or audit-only)
3. **Write the gate text** following the format above
4. **Patch the rule** in `marc-ops-framework` to include the structural enforcement text
5. **Update this skill file** to add the gate to the Active Structural Gates section
6. **Run R-26 acceptance test** — simulate the trigger condition and verify the gate fires correctly
7. **Audit** — run convergence loop on the changes
8. **Update permanent files** — Rules-and-Decisions-Log (provenance), Skill-Registry (version), commitment-registry (status)

---

## Gate Inventory Summary

| Gate | Rule | Tier | Trigger Point | Status |
|------|------|------|--------------|--------|
| 1 | R-25 | Hard | Before save_custom_skill | Active |
| 2 | R-17 | Hard | Before load_skill | Active |
| 3 | R-24 | Hard | Before share_file / task completion | Active |
| 4 | R-11 | Hard | After file creation/modification | Active (new) |
| 5 | R-07 | Hard | Before analysis/synthesis | Active (new) |
| 6 | R-26 | Hard | Before marking feature complete | Active |
| 7 | R-17 | Hard | After skill file edit | Active (new) |
| 8 | R-17 | Hard | After load_skill completes | Active (new) |
| 9 | R-24 | Hard | On context recovery / post-compaction | Active (new) |
| 10 | R-25 | Hard | Before building zip/package with skill files | Active (new) |

**Total: 10 active structural gates** (3 existing + 1 existing-via-R-24 + 2 Phase 1 + 3 new + 1 export-path)
**Enforcement tiers: 4** (hard gate, content substance, soft gate, audit-only)

---

## Conversion Queue (Future Candidates)

Rules being monitored for class-c violation accumulation:

| Rule | Current Class-c Count | Notes |
|------|----------------------|-------|
| R-05 (Success Criteria) | 1 | One violation this session. Monitor. |
| R-16 (Reasoning Log Currency) | 0 | No violations yet but at risk during long sessions. |
| R-04 (Substance Ratio) | 0 | Hard to check structurally — requires judgment. Candidate for soft gate. |

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Audit | PASSED | 2026-03-11 | AI | v1.1: Gates 7+8 added. R-26 tests: 15/15 PASS. 2 loops. Convergence reached. |
| Audit | PASSED | 2026-03-11 | AI | v1.2: Gate 6 downstream trace added (Reflect Proposal #9). Quality Gate table pruned (Proposal #3). |
| Audit | PASSED | 2026-03-11 | AI | v1.3: Content Substance tier added ("Faking vs. Skipping" defense). Attributed to Rich Schefren + Tony Flores. 5 detection heuristics. G6 forward integration noted. 2 loops, converged. |
| Audit | PASSED | 2026-03-11 | AI | v1.4: Gate 9 added (Post-Compaction State Refresh). R-24 class-c threshold conversion. Marc-approved. R-26 tests: 6/6 PASS. 2 loops. Convergence reached. |