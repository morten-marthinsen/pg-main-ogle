# Session End Protocol

**Version:** 1.2
**Created:** 2026-03-17
**Updated:** 2026-03-25
**Purpose:** Standardized session wrap-up ensuring state persistence and clean handoff
**Authority:** Referenced by SYSTEM-CORE.md — mandatory at the end of every session

---

## WHEN THIS RUNS

At the end of every session. The session end protocol is the LAST thing that happens before the conversation closes.

**Triggers:**
- Human says "let's wrap up" / "end session" / "that's enough for today"
- Context window is approaching limits (system will warn)
- All planned skills for the session are complete
- Agent detects it should stop (e.g., hitting a gate that requires human review outside the session)

---

## THE 3 STEPS

### Step 1: Update Project Progress

Update `~outputs/[project-code]/project-progress.json`:

1. **Per-skill updates:**
   - Any skill completed this session: set `status: "completed"`, record `completed_date`, `session`, `output_path`
   - Any skill started but not finished: set `status: "in_progress"`
   - Record gate results for any gates that were evaluated

2. **Session log entry:**
   ```json
   {
     "session": N,
     "started": "from startup sequence",
     "ended": "ISO 8601 timestamp",
     "startup_status": "clean",
     "skills_completed": ["XX", "YY"],
     "skills_in_progress": ["ZZ"],
     "notes": "free-text session summary"
   }
   ```

3. **Milestone updates:**
   - If audience agents were constructed: update `audience_agents` block
   - If context reservoir was created: update `context_reservoir` block
   - If foundation integrity check was run: update that block

4. **Cost tracking update:**
   ```json
   {
     "session": N,
     "skills_executed": ["XX", "YY"],
     "estimated_input_tokens": 0,
     "estimated_output_tokens": 0,
     "estimated_cost_usd": 0.00,
     "models_used": ["opus-4.6", "sonnet-4.5"],
     "arena_runs": 0,
     "audience_eval_runs": 0
   }
   ```
   - Append to `cost_tracking.sessions` array
   - Update `cost_tracking.total_*` running totals
   - For Arena skills: add per-skill entry to `cost_tracking.per_skill` with model and token breakdown
   - Estimates are acceptable — exact counts not required. Use conversation token counters if available.

5. **Set `last_updated` to current timestamp**

---

### Step 2: Git Commit

Stage and commit all session work:

```bash
git add marketing-os/~outputs/[project-code]/
git commit -m "session [N]: [brief summary of what was accomplished]

Skills completed: [list]
Skills in progress: [list]
Next skill: [ID] ([name])

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

**Commit rules:**
- One commit per session (not per skill) unless the human requests otherwise
- Commit message follows the pattern above
- Include the `Co-Authored-By` trailer
- Do NOT commit files outside `~outputs/[project-code]/` unless the human explicitly requests it
- Do NOT push to remote unless the human explicitly requests it

**If the human has already committed during the session:** Only commit the progress file update, not the entire outputs directory.

---

### Step 3: Report Session Summary

Present to human:

```
SESSION [N] COMPLETE
Duration: [approximate]
Skills completed: [list with names]
Skills in progress: [list]
Next session starts at: Skill [XX] ([name])
Pending gates: [list or "none"]
Uncommitted files: [list or "none"]

NEXT SESSION NOTES:
- [Any context the next session needs to know]
- [Warnings about incomplete work]
- [Recommendations for human review between sessions]
```

---

## INTERRUPTED SESSIONS

If the session is ending due to context limits or crash (not a clean wrap-up):

1. **Still update project-progress.json** — this is the highest priority
2. **Still commit** — even a partial commit is better than lost work
3. **Mark in-progress skills clearly** — the next session's startup sequence will detect these
4. **Add a note** to the session log: `"interrupted": true, "reason": "context_limit"`

If you detect the context window is getting tight:
- Proactively suggest wrapping up
- Do NOT start a new skill if there isn't enough context to finish it
- Complete the current skill's current layer if possible, then end

---

## CRITICAL RULES

1. **ALWAYS update project-progress.json before committing.** The progress file is the primary state record.
2. **NEVER leave output files uncommitted.** Uncommitted work is lost work if the vault syncs or Obsidian interferes.
3. **NEVER mark a skill as `completed` unless ALL its required outputs exist and are valid.** Use `in_progress` for partial work.
4. **ALWAYS tell the human what the next session should start with.** Don't make them figure it out.
5. **NEVER push to remote automatically.** The human controls when syncs happen (via /vault-sync).

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-17 | Initial creation as part of Harness Architecture Phase 2. |
| 1.1 | 2026-03-21 | Updated git commit step for external output support. |
| 1.2 | 2026-03-25 | Added Step 4: cost tracking per session (Harness Upgrade U3). |
