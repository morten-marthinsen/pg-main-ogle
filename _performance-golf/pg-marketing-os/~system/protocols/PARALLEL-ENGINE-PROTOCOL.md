# Parallel Engine Execution Protocol

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Enables simultaneous execution of branch engines after Skill 09 Campaign Brief. Defines worktree isolation, engine agent scoping, progress management, and merge workflow. Multiplies throughput from sequential to parallel across up to 9 engines.
**Authority:** Referenced by SESSION-ORCHESTRATOR.md (Step 2, cross-engine branch unlock). Extends the orchestrator's engine-switching capability into true parallel execution.

---

## WHAT THIS REPLACES

Previously, after Skill 09 + G-09 gate pass:
1. Human chose one engine to work on
2. Agent completed that engine's skills sequentially
3. Human switched to the next engine in a new session
4. Repeat for all active engines (potentially 8+ sessions)

With this protocol:
- Multiple engines execute simultaneously in isolated git worktrees
- Each engine agent follows the standard orchestrator loop scoped to its engine
- The primary engine (usually VSL) stays on main for uninterrupted human attention
- Results merge back after human review per engine
- Total elapsed time: bounded by the longest engine, not the sum of all engines

This is a PROTOCOL (instructions the agent follows), not software. Phase 7 converts it to runtime.

---

## TRIGGER CONDITIONS

This protocol activates when ALL of the following are true:

1. **Skill 09 (Campaign Brief) is `completed`** in project-progress.json
2. **Gate G-09 is `passed`** in project-progress.json
3. **Two or more branch engines** have status `pending` (not `skipped`) in project-progress.json
4. **The human confirms** parallel execution when the orchestrator presents cross-engine options

If only one branch engine is active, standard sequential orchestration is sufficient — this protocol is not needed.

### Orchestrator Integration

When the Session Orchestrator's RESOLVE step surfaces skills from multiple engines (Step 2: "BRANCH ENGINES UNLOCKED"), the orchestrator presents the parallel option:

```
BRANCH ENGINES UNLOCKED — [N] engines eligible for parallel execution.

PARALLEL MODE AVAILABLE:
  Primary engine (stays on main): Long-Form VSL (recommended — longest critical path)
  Parallel engines (worktrees):
    - E-Commerce (EC-00 through EC-06)
    - Page Builder (LP-07 through LP-14)
    - Upsells (U0 through U5)
    - [etc.]

Options:
  1. Launch parallel mode (Recommended)
  2. Work engines sequentially (standard orchestrator)
  3. Choose a different primary engine

Which approach?
```

---

## EXECUTION MODES

### Mode 1: Multi-Agent Parallel (Full Protocol)

Multiple agent instances run simultaneously, each in its own worktree. Requires the human to spawn and monitor multiple Claude Code sessions or use the Task tool for subagent dispatch.

**When to use:** When the human has capacity to review multiple engines' outputs and wants maximum throughput.

### Mode 2: Staggered Parallel (Practical Default)

The human runs one engine at a time but uses worktrees for isolation. Engine outputs commit to separate branches, enabling clean context per engine session.

**When to use:** When the human wants clean per-engine sessions without cross-contamination. Simpler than Mode 1, still benefits from worktree isolation.

### Mode 3: Sequential (Fallback)

No worktrees. Standard orchestrator engine switching (Case 5). All work stays on main.

**When to use:** When only 2-3 engines are active and worktree overhead isn't justified.

The rest of this protocol describes Mode 1 and Mode 2. Mode 3 is already covered by SESSION-ORCHESTRATOR.md.

---

## WORKTREE SETUP

### Naming Convention

| Component | Pattern | Example |
|-----------|---------|---------|
| Worktree path | `/tmp/mos-[project-code]-[engine-id]` | `/tmp/mos-choc-drv-e_comm` |
| Branch name | `parallel/[project-code]/[engine-id]` | `parallel/choc-drv/e_comm` |
| Primary engine | Stays on `main` | No worktree needed |

### Setup Procedure

After the human selects parallel mode and confirms the primary engine:

```
FOR EACH active branch engine (excluding primary):
  1. Verify all Skill 09 outputs are committed to main
     git status  # must be clean
     git log -1  # confirm campaign brief commit

  2. Create worktree
     git worktree add /tmp/mos-[project-code]-[engine-id] -b parallel/[project-code]/[engine-id] main

  3. Verify worktree has upstream outputs
     ls /tmp/mos-[project-code]-[engine-id]/marketing-os/~outputs/[project-code]/
     # Must contain: campaign-brief.json, context-reservoir.md (if exists), all foundation outputs

  4. Create engine-status.json in the worktree's output directory
     # See ENGINE STATUS FILE section below
```

### CRITICAL: Worktree Safety

1. **NEVER create worktrees inside the vault directory.** Always use `/tmp/` or another path outside the vault directory. Obsidian monitors the vault directory — worktree operations there would trigger note conflicts.
2. **ALWAYS create worktrees from a clean main.** Run `git status` first. If there are uncommitted changes, commit or stash before creating worktrees.
3. **NEVER delete a worktree with uncommitted work.** Always verify `git status` in the worktree before removal.

---

## PRIMARY ENGINE SELECTION

The primary engine stays on main and gets direct human attention. Selection criteria:

| Priority | Criterion | Rationale |
|----------|-----------|-----------|
| 1 | Longest critical path | Minimizes total project duration |
| 2 | Most human gates | Human review is the bottleneck |
| 3 | Highest prose cascade depth | Prose quality degrades with less attention |

**Default: Long-Form VSL.** It has the longest critical path (Skills 10→17→18→19→20), 4 human gates (G-10, G-12, G-17, G-20), and 8 prose-cascading skills. It almost always deserves primary attention.

The human can override this default (e.g., choosing Ads as primary when ads are the campaign priority and no VSL is needed).

---

## ENGINE AGENT SPECIFICATION

Each engine agent — whether running in parallel or staggered — receives the same inputs and follows the same rules.

### Shared Context (Read-Only)

Every engine agent has access to these committed files (inherited from main via worktree):

| Resource | Path | Purpose |
|----------|------|---------|
| Campaign Brief | `~outputs/[project-code]/campaign-brief.json` | Strategic foundation |
| Context Reservoir | `~outputs/[project-code]/context-reservoir.md` | Curated analytical intelligence |
| Foundation Outputs | `~outputs/[project-code]/[skills 00-09 outputs]` | All upstream packages |
| Audience Agent Personas | `~outputs/[project-code]/audience-agent-personas.json` | For Arena evaluations |
| System Protocols | `~system/` | Full protocol library |
| Pipeline DAG | `~system/pipeline-dag.json` | Dependency graph (read-only) |

### Engine-Specific Context

| Resource | Path | Purpose |
|----------|------|---------|
| Engine Master File | `[engine-dir]/[ENGINE].md` (e.g., `03-e-comm/E-COMM-ENGINE.md`) | Engine-level instructions |
| Engine AGENT.md | `[engine-dir]/AGENT.md` | Engine navigation |
| Skill Loading Profiles | `~system/skill-loading-profiles/[engine-skill-ids].yaml` | Per-skill protocol requirements |
| Skill Directories | `[engine-dir]/skills/` | SKILL.md, microskills, layers |

### Engine Agent Rules

1. **Scope to your engine.** Only execute skills belonging to your engine. Never touch another engine's output directory.
2. **Read upstream, never write upstream.** Foundation outputs are read-only. Never modify files from Skills 00-09.
3. **Follow the orchestrator loop.** RESOLVE → PRESENT → LOAD → EXECUTE → COMPLETE → GATE → CONTEXT → LOOP. But RESOLVE only considers skills in your engine.
4. **Write engine-status.json after every skill.** This is your engine's progress record (see below).
5. **Commit after every skill completion.** Each skill gets its own commit in the worktree branch.
6. **Respect engine-internal gates.** Ad engine has G-A02 and G-A06. Organic has G-S07. These still require human review.
7. **Stop at engine completion.** When all engine skills are complete, commit final state and notify. Do not proceed to another engine.

### Scoped Orchestrator RESOLVE

Within an engine agent, the RESOLVE algorithm narrows to:

```
READ pipeline-dag.json → nodes[] WHERE node.engine == my_engine
READ engine-status.json → skill statuses

FOR EACH node in my_engine_nodes:
  IF engine-status.skill[node.id].status != "pending":
    SKIP

  FOR EACH dep in node.depends_on:
    IF dep is WITHIN my engine:
      IF engine-status.skill[dep].status != "completed":
        SKIP — dependency not met
    IF dep is OUTSIDE my engine (e.g., "09"):
      # This was verified at worktree creation — always "completed"
      CONTINUE

  FOR EACH gate in dag.gates:
    IF node.id IN gate.blocks_skills:
      IF gate NOT in engine-status.gates with status "passed":
        SKIP

  → node is ELIGIBLE
```

---

## ENGINE STATUS FILE

Each engine agent writes progress to its own lightweight status file instead of modifying the shared project-progress.json. This eliminates merge conflicts.

### File Location

```
~outputs/[project-code]/[engine-subdir]/engine-status.json
```

Example: `~outputs/choc-drv/e-comm/engine-status.json`

### Schema

```json
{
  "$schema": "engine-status-v1.0",
  "engine_id": "e_comm",
  "engine_name": "E-Commerce",
  "project_code": "choc-drv",
  "worktree_branch": "parallel/choc-drv/e_comm",
  "created": "2026-03-18T10:00:00Z",
  "last_updated": "2026-03-18T14:30:00Z",
  "status": "in_progress",

  "skills": {
    "EC-00": { "status": "completed", "output_path": "~outputs/choc-drv/e-comm/ec-00-strategist.json", "completed_date": "2026-03-18T10:45:00Z" },
    "EC-01": { "status": "completed", "output_path": "~outputs/choc-drv/e-comm/ec-01-feature-naming.json", "completed_date": "2026-03-18T11:30:00Z" },
    "EC-02": { "status": "in_progress", "output_path": null, "completed_date": null },
    "EC-03": { "status": "pending", "output_path": null, "completed_date": null },
    "EC-04": { "status": "pending", "output_path": null, "completed_date": null },
    "EC-05": { "status": "pending", "output_path": null, "completed_date": null },
    "EC-06": { "status": "pending", "output_path": null, "completed_date": null }
  },

  "gates": [],

  "session_log": [
    {
      "session": 1,
      "started": "2026-03-18T10:00:00Z",
      "skills_completed": ["EC-00", "EC-01"]
    }
  ]
}
```

### Update Rules

1. Update `engine-status.json` immediately after each skill completes (before gate check, before context check)
2. Update `last_updated` on every write
3. When engine status becomes `completed` (all skills done), set top-level `status` to `completed`
4. Commit `engine-status.json` as part of the skill completion commit

---

## MERGE PROTOCOL

After an engine completes (or at a human-designated review point), merge its work into main.

### Pre-Merge Checklist

```
BEFORE MERGING engine [engine_id]:

  1. Verify engine-status.json shows all skills completed (or desired checkpoint reached)
     cat /tmp/mos-[project-code]-[engine-id]/marketing-os/~outputs/[project-code]/[engine-subdir]/engine-status.json

  2. Human reviews engine outputs in the worktree
     # Browse output files, check quality, approve

  3. Verify worktree branch is clean
     cd /tmp/mos-[project-code]-[engine-id] && git status
     # Must show nothing to commit

  4. Verify main is clean
     cd [vault-path] && git status
     # Must show nothing to commit
```

### Merge Procedure

```
# From the vault (main branch):

1. Merge the engine branch
   git merge parallel/[project-code]/[engine-id] --no-ff -m "merge: [engine-name] parallel execution complete — [project-code]"

2. Verify merge succeeded (no conflicts expected — see Conflict Resolution below)
   git status  # clean

3. Update project-progress.json from engine-status.json
   # Read engine-status.json
   # Copy each skill's status, output_path, completed_date into the corresponding engine section
   # Copy gate records into the gates array
   # Update last_updated timestamp

4. Commit progress file update
   git commit -m "chore: sync [engine-name] progress to project-progress.json — [project-code]"

5. Remove the worktree
   git worktree remove /tmp/mos-[project-code]-[engine-id]

6. Delete the remote-tracking branch (optional — keeps branch list clean)
   git branch -d parallel/[project-code]/[engine-id]
```

### Merge Order

No strict ordering required — engines write to separate output subdirectories. However, if cross-engine optional dependencies exist (see `pipeline-dag.json → cross_engine_dependencies`), merge the upstream engine first for potential downstream benefit:

| Merge First | Merge After | Reason |
|-------------|-------------|--------|
| Upsells (U4) | Emails (E0) | Upsell sequence informs email strategy |
| Checkout (CK-00) | Upsells (U1) | Checkout strategy provides order bump placement |
| E-Commerce (EC-05) | Page Builder (LP-07) | Assembled e-comm copy feeds page builder |
| Ads (A02) | Advertorials (ADV-00) | Ad hooks can be adapted for advertorial opens |

These are OPTIONAL — no merge will fail without them. The benefit is that later-reviewed engines can incorporate earlier-reviewed outputs.

---

## CONFLICT RESOLUTION

### Expected: No Conflicts

By design, conflicts should not occur because:
1. Each engine writes to its own output subdirectory (`~outputs/[project-code]/[engine-subdir]/`)
2. No engine modifies files from other engines or from the main pipeline
3. `project-progress.json` is only modified on main, never in worktrees
4. System protocols (`~system/`) are read-only for all engine agents

### If Conflicts Occur

A conflict means an engine agent violated a rule. Handle it:

```
IF git merge reports conflicts:

  1. Identify conflicting files
     git diff --name-only --diff-filter=U

  2. Categorize each conflict:

     a. Output files in this engine's subdir → TAKE WORKTREE VERSION
        git checkout --theirs [file]

     b. Output files in ANOTHER engine's subdir → TAKE MAIN VERSION
        git checkout --ours [file]

     c. System files (~system/) → TAKE MAIN VERSION
        git checkout --ours [file]
        # Flag: engine agent modified system files — investigate

     d. project-progress.json → TAKE MAIN VERSION
        git checkout --ours [file]
        # Flag: engine agent modified progress file — investigate

  3. After resolving all conflicts:
     git add .
     git commit -m "merge: [engine-name] with conflict resolution — [list conflicting files]"

  4. Report to human:
     CONFLICT RESOLVED for [engine-name] merge.
     Files with conflicts: [list]
     Resolution: [summary of choices]
     Investigation needed: [any rule violations flagged]
```

---

## HUMAN REVIEW WORKFLOW

### Per-Engine Review

Each engine has its own review cycle, independent of other engines:

```
Engine completes all skills
    ↓
Agent notifies: "[Engine] complete — [N] skills, [N] outputs"
    ↓
Human reviews outputs in worktree
    ↓
Decision: APPROVE / REVISE / REJECT
    ↓
APPROVE → Merge to main (see Merge Protocol)
REVISE  → Agent re-executes specific skills in the worktree
REJECT  → Worktree deleted, engine reset to pending in progress file
```

### Engine-Internal Gates

Some engines have internal gates that require human review DURING execution:

| Engine | Gate | After Skill | Blocks |
|--------|------|-------------|--------|
| Ads | G-A02 | A02 (hook/angle discovery) | A03 |
| Ads | G-A06 | A06 (ad arena) | A07, A08 |
| Organic | G-S07 | S07 (campaign brief) | S08-S13, S21 |

When an engine agent hits an internal gate:
1. Agent pauses execution and notifies the human
2. Human reviews the gate output in the worktree
3. Human passes/fails/revises per standard gate procedure
4. Agent resumes execution within the worktree

The human must be available for engine-internal gates. In Mode 1 (multi-agent), this means monitoring multiple agents for gate notifications.

### Review Priority

When multiple engines complete simultaneously, review in this order:

1. **Engines with downstream dependents** (see cross-engine dependencies)
2. **Shortest engines first** (quick wins — checkout, upsells)
3. **Longest engines last** (VSL editorial usually takes the most review time)

---

## PROGRESS FILE RECONCILIATION

After all parallel engines are merged, reconcile the full project state:

```
1. Read project-progress.json on main

2. FOR EACH merged engine:
   - Verify all skill statuses are "completed" in the engine's section
   - Verify all output_paths point to existing files
   - Verify gate records are present

3. Update overall project state:
   - Set engine status to "completed" for each finished engine
   - Update session count
   - Add parallel execution summary to session_log

4. Record parallel execution metadata:
   parallel_execution.status = "completed"
   parallel_execution.completed_date = [ISO 8601]
   parallel_execution.engines_merged = [list of engine IDs]

5. Commit:
   git commit -m "chore: reconcile parallel execution — all [N] engines merged — [project-code]"
```

---

## CLEANUP

After all parallel engines are merged and progress is reconciled:

```
1. List remaining worktrees
   git worktree list

2. Remove all project-related worktrees
   git worktree remove /tmp/mos-[project-code]-*
   # If a worktree has uncommitted changes, git will refuse — investigate before force-removing

3. Delete parallel branches
   git branch --list "parallel/[project-code]/*" | xargs git branch -d

4. Verify clean state
   git worktree list  # Should show only the vault
   git branch --list "parallel/*"  # Should be empty
```

### Interrupted Cleanup

If a session ends before cleanup completes:
- Worktrees persist in `/tmp/` until system reboot or manual deletion
- Branches persist in the local repo
- Next session's Startup Sequence should detect orphaned worktrees via `git worktree list` and prompt for cleanup

---

## INTEGRATION WITH EXISTING PROTOCOLS

| Protocol | Relationship |
|----------|-------------|
| SESSION-ORCHESTRATOR.md | Orchestrator triggers this protocol at cross-engine branch unlock (Step 2). After parallel execution completes, orchestrator resumes for any remaining skills. |
| STARTUP-SEQUENCE.md | Each engine agent runs its own startup sequence within the worktree, scoped to its engine. The main session's startup detects parallel execution state. |
| SESSION-END.md | Each engine agent runs session-end within its worktree (commit, status update). The main session's end protocol handles merge reconciliation. |
| INITIALIZER-PROTOCOL.md | Creates the project structure that parallel execution depends on. No changes needed — parallel execution activates later. |
| EXECUTION-GUARDRAILS.md | Still applies within each engine agent's execution. No bypass. |
| PROTOCOL-MANIFEST.md | Engine agents load protocols per the manifest, scoped to their engine's skills. |

---

## CRITICAL RULES

1. **NEVER create worktrees inside the vault.** Always `/tmp/` or another external path. Obsidian will corrupt worktree operations inside the vault.
2. **NEVER modify project-progress.json in a worktree.** Engine agents write to engine-status.json only. Progress reconciliation happens on main after merge.
3. **NEVER let an engine agent write to another engine's output directory.** Each engine owns its subdirectory exclusively.
4. **NEVER merge without human review.** Even in Mode 1 with multiple agents, the human reviews each engine's outputs before merge.
5. **ALWAYS commit before creating worktrees.** Main must be clean. Uncommitted changes would propagate into all worktrees.
6. **ALWAYS verify worktrees have upstream outputs.** If foundation outputs aren't committed to main, worktrees won't have them.
7. **NEVER force-remove a worktree.** If `git worktree remove` refuses, investigate uncommitted work first.
8. **The DAG is read-only.** Engine agents never modify `pipeline-dag.json`. Only `engine-status.json` is written.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation as part of Harness Architecture Phase 5. |
