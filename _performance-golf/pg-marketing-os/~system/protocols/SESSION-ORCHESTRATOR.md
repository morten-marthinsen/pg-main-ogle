# Session Orchestrator Protocol

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Automated skill sequencing within a session. Reads the Pipeline DAG and project progress to resolve, present, load, execute, and advance skills — pulling the human in at gates instead of requiring manual navigation.
**Authority:** Referenced by SYSTEM-CORE.md. Extends STARTUP-SEQUENCE.md Step 5 into a continuous execution loop.

---

## WHAT THIS REPLACES

Previously, the human manually:
1. Identified the next skill
2. Told the agent which skill to load
3. Verified dependencies themselves
4. Tracked what was done across sessions

The orchestrator automates steps 1-4. The human's role shifts to: **approve gate checkpoints, choose between parallel options, and direct creative decisions.**

This is a PROTOCOL (instructions the agent follows), not software. Phase 7 converts it to runtime software.

---

## THE ORCHESTRATION LOOP

After the Startup Sequence completes (Steps 1-4), the orchestrator replaces Step 5 with a continuous loop:

```
STARTUP SEQUENCE (Steps 1-4)
    ↓
ORCHESTRATOR LOOP:
    ┌─→ RESOLVE eligible skills
    │   ↓
    │   PRESENT options to human
    │   ↓
    │   LOAD selected skill (profile + SKILL.md + protocols + upstream)
    │   ↓
    │   EXECUTE skill (agent follows SKILL.md)
    │   ↓
    │   COMPLETE (update progress, record outputs)
    │   ↓
    │   GATE CHECK (if gate_after exists)
    │   ↓
    │   CONTEXT CHECK (enough room for another skill?)
    │   ↓
    └── LOOP or SESSION END
```

---

## STEP 1: RESOLVE

Find all skills eligible for execution right now.

### Algorithm

```
READ pipeline-dag.json → nodes[], gates[]
READ project-progress.json → skills with statuses

FOR EACH node in dag.nodes:
  IF progress.skill[node.id].status != "pending":
    SKIP — already completed, in_progress, skipped, or failed

  IF progress.engine[node.engine].status == "skipped":
    SKIP — engine is inactive for this project

  FOR EACH dep in node.depends_on:
    IF progress.skill[dep].status != "completed":
      SKIP — dependency not met
      BREAK

  FOR EACH gate in dag.gates:
    IF node.id IN gate.blocks_skills:
      IF gate NOT in progress.gates with status "passed":
        SKIP — blocked by unpassed gate
        BREAK

  → node is ELIGIBLE — add to eligible_list
```

### Resolution Rules

1. **Only `pending` skills are eligible.** Skills marked `completed`, `skipped`, `failed`, or `in_progress` are never in the eligible list.
2. **ALL dependencies must be `completed`.** Not `in_progress`, not `failed` — completed.
3. **Gate blocking is checked per-skill.** A gate blocks specific skills (listed in `gate.blocks_skills`), not entire engines.
4. **Skipped engines are invisible.** If an engine is `skipped`, all its skills are excluded from resolution.

---

## STEP 2: PRESENT

Show the human what's available and recommend next action.

### Single Eligible Skill

```
NEXT SKILL: [id] — [name] ([engine])
Dependencies: [list] — all met
Model: [opus/sonnet]
Arena: [yes/no]
Estimated context: [light/moderate/heavy based on protocol count]

Ready to execute?
```

### Multiple Eligible Skills (Same Engine)

```
ELIGIBLE SKILLS in [engine]:
  1. [id] — [name] (parallel group: [PG-id])
  2. [id] — [name] (parallel group: [PG-id])
  ...

These skills can run in any order. Recommend: [first by ID].
Which skill to execute?
```

### Multiple Eligible Skills (Cross-Engine)

This happens after Skill 09 (campaign brief gate) when branch engines unlock.

```
BRANCH ENGINES UNLOCKED — [N] skills across [M] engines eligible:

  Long-Form VSL:    Skill 10 (headlines) + Skill 18 (proof-weaving)
  PDP Pipeline:     PDP-01 (strategist)
  Page Builder:     LP-07 through LP-14 (8 element writers)
  Upsells:          U0 (strategist)
  Checkout:         CK-00 (strategist)
  Emails:           E0 (strategist)
  Ads:              A01 (ad intelligence)
  Advertorials:     ADV-00 (strategist)

Which engine should we work on first?
Common approach: VSL first (longest critical path), then branch engines.
```

### No Eligible Skills

```
NO SKILLS ELIGIBLE

Possible reasons:
  - Gate [id] is blocking: [description] — requires human review
  - All active skills completed for current engines
  - All remaining skills are in skipped engines

[Present gate materials if a gate is blocking]
[Or suggest activating additional engines if all current work is done]
```

---

## STEP 3: LOAD

Once the human selects (or confirms) a skill, load everything it needs.

### Loading Sequence

```
1. READ skill loading profile:
   ~system/skill-loading-profiles/[id]-[name].yaml
   → Extract: protocols_required, arena, generates_copy, mcp_tools

2. READ SKILL.md from the skill's engine directory:
   → Main pipeline 00-02: 00-deep-research/[NN]-[name]/skills/SKILL.md
   → Main pipeline 03-09: 01-core-message/[NN]-[name]/skills/SKILL.md
   → VSL 10-20: 02-long-form-vsl/[NN]-[name]/skills/SKILL.md
   → Branch engines: [engine-dir]/skills/[id]-[name]/SKILL.md
   (Resolve from engine AGENT.md if path is unclear)

3. LOAD protocols from protocols_required list:
   → Read each file from ~system/protocols/ or ~system/
   → Follow PROTOCOL-MANIFEST priority ordering

4. LOAD upstream packages (Layer 0):
   → Read the skill's layer-0 loader files
   → These pull specific upstream outputs per pipeline-handoff-registry.md

5. LOAD conditional resources:
   → IF arena: load audience-agent-personas.json (via 0.5-audience-agent-loader.md)
   → IF generates_copy: load context reservoir, humanization loader, Soul.md
   → IF expression_anchoring: load EXPRESSION-ANCHORING-PROTOCOL.md
   → IF skill_number in [11-17]: load PROSE-QUALITY-VERIFICATION.md
   → IF mcp_tools not empty: discover MCP tools per MCP-TOOL-REGISTRY.md

6. CONFIRM load to human:
   SKILL LOADED: [id] — [name]
   Protocols: [count] loaded
   Upstream packages: [count] consumed
   Arena mode: [mode or "none"]
   Context estimate: [KB]

   Beginning execution.
```

### Pre-Flight Check (Before Execution)

Before executing, run the pre-flight items from PROTOCOL-MANIFEST:

1. **Pre-mortem** (if tier requires it): 3 questions — failure modes, weakest inputs, degradation prediction
2. **Upstream validation**: Verify all consumed upstream packages have required fields per handoff registry
3. **Model confirmation**: Verify the current model matches the DAG's `model` field for this skill. If mismatch, flag to human.

---

## STEP 4: EXECUTE

The agent follows SKILL.md instructions. The orchestrator does NOT interfere with skill execution — it only manages transitions between skills.

During execution, the orchestrator monitors for:
- **Context pressure**: If the system signals YELLOW/ORANGE/RED zone, the orchestrator notes this for the CONTEXT CHECK step
- **Skill completion signals**: The skill produces its output files and hits its completion criteria

---

## STEP 5: COMPLETE

After skill execution finishes:

### Update Progress File

```json
{
  "skills": {
    "[skill_id]": {
      "status": "completed",
      "output_path": "[path to output file]",
      "completed_date": "[ISO 8601]",
      "session": N
    }
  }
}
```

### Verify Outputs

1. Confirm output file exists at the expected path
2. Confirm file is non-empty
3. For handoff-critical outputs: spot-check required fields
4. If verification fails: set status to `failed`, report to human, do NOT advance

### Record Session Progress

Add the skill to the current session's `skills_completed` array.

---

## STEP 6: GATE CHECK

After completing a skill, check if a gate follows.

### Gate Resolution

```
READ dag.gates[]
FIND gate WHERE gate.after_skill == just_completed_skill_id
IF found:
  → RUN GATE CHECKPOINT PROCEDURE
ELSE:
  → PROCEED to CONTEXT CHECK
```

### Gate Checkpoint Procedure

```
┌─────────────────────────────────────────────────────────────────┐
│  GATE: [gate.id]                                                │
│  After: Skill [id] ([name])                                    │
│  Blocks: [gate.blocks_skills]                                  │
│                                                                 │
│  REVIEW REQUIRED: [gate.description]                           │
│  Requirements: [gate.requires]                                  │
│                                                                 │
│  Output for review: [path to skill output]                     │
│  Quality score: [if applicable]                                 │
│  Arena winner: [if applicable]                                  │
│                                                                 │
│  Decision: PASS / FAIL / REVISE                                │
└─────────────────────────────────────────────────────────────────┘
```

### Gate Outcomes

| Decision | Action |
|----------|--------|
| **PASS** | Record gate as passed in progress file. Unblock downstream skills. Resolve next eligible skills. |
| **FAIL** | Mark skill as `failed`. Set status back to `pending` for re-execution. Do NOT advance. Ask human for guidance on what to change. |
| **REVISE** | Keep skill as `in_progress`. Human provides revision notes. Re-execute specific microskills within the skill. After revision, re-present gate. |

### Recording Gate Results

```json
{
  "gates": [
    ...existing,
    {
      "gate_id": "[id]",
      "after_skill": "[skill_id]",
      "status": "passed",
      "decision_date": "[ISO 8601]",
      "session": N,
      "notes": "[human feedback if any]"
    }
  ]
}
```

---

## STEP 7: CONTEXT CHECK

Before looping back to RESOLVE, check if there's enough context to execute another skill.

### Decision Matrix

| Context Zone | Skill Type | Recommendation |
|-------------|------------|----------------|
| GREEN | Any | Continue — loop to RESOLVE |
| YELLOW | Light (non-Arena, non-copy) | Continue with caution |
| YELLOW | Heavy (Arena + copy generation) | Recommend session break |
| ORANGE | Any | Recommend session break |
| RED | Any | Trigger Session End Protocol immediately |

### Session Break Recommendation

```
CONTEXT ADVISORY: [zone] zone reached.

Completed this session: [list of skills]
Next eligible: Skill [id] ([name]) — estimated [light/moderate/heavy]

Recommend: End session now. Next session picks up at Skill [id].
Continue anyway? (Not recommended — quality may degrade)
```

If the human chooses to continue despite the recommendation, proceed but flag the risk. If the human agrees to end, trigger Session End Protocol.

---

## SPECIAL CASES

### Case 1: Email Engine Per-Email Loop

The email engine's E1 (writer) and E2 (subject lines) run as a PAIR per email, repeated N times.

```
E0 completes → campaign-blueprint.yaml specifies N emails

FOR email_num = 1 to N:
  EXECUTE E1 for email_num
  EXECUTE E2 for email_num (reads E1's finished output)

AFTER all N pairs complete:
  EXECUTE E3 (sequence assembler)
  EXECUTE E4 (editorial)
```

The orchestrator tracks E1/E2 completion per email. In the progress file, E1 and E2 have status `completed` only after ALL emails are written. Use `notes` to track per-email progress:

```json
{
  "E1": {
    "status": "in_progress",
    "notes": "Emails 1-4 of 7 complete"
  }
}
```

### Case 2: Organic Mode B (Standalone)

When the organic engine runs standalone (no main pipeline):

1. The main pipeline is `skipped` — the orchestrator ignores all skills 00-09
2. S01 has no dependencies — it's immediately eligible
3. The orchestrator sequences S01→S02→...→S07→[production parallel]→S14→[distribution]
4. S07 does NOT wait for Skill 09 (which doesn't exist in Mode B)

### Case 3: Foundation Integrity Check

Between Skills 13 and 14 (for Full and Standard tiers):

1. After Skill 13 completes, the orchestrator checks `dag.foundation_integrity_check`
2. If the check `applies_to_tiers` includes the current tier:
   - Run Foundation Integrity Check protocol BEFORE resolving Skill 14
   - Record results in progress file
   - If FLAGS are raised: present to human for decision before proceeding

### Case 4: Proof-Weaving Parallel Path

Skill 18 runs parallel with the 10→17 cascade. The orchestrator handles this:

1. After Skill 09 gate passes, BOTH Skill 10 and Skill 18 become eligible
2. In a single-agent session: present both as options, human chooses order
3. Skill 19 (assembly) only becomes eligible when BOTH Skill 17 AND Skill 18 are completed
4. If Skill 18 completes before Skill 17: no action, continue the 10→17 cascade
5. If Skill 17 completes before Skill 18: Skill 18 becomes the immediate next priority

### Case 5: Mid-Session Engine Switch

When the human wants to switch from one branch engine to another mid-session:

1. Complete the current skill (never abandon mid-execution)
2. Update progress for the current skill
3. Re-run RESOLVE — all eligible skills across all engines appear
4. Human selects a skill from a different engine
5. Orchestrator loads the new engine's protocols (unloading previous engine-specific protocols)

No special handling needed — the RESOLVE algorithm naturally surfaces all eligible skills across all active engines.

### Case 6: Skill Re-execution After Failure

When a skill needs to be re-run (gate FAIL, output corruption, etc.):

1. Set skill status to `pending` in progress file
2. The RESOLVE algorithm will surface it again (its dependencies are still met)
3. If downstream skills were already `completed` based on the failed skill's output:
   - Flag to human: "Skill [X] is being re-executed. Skills [Y, Z] consumed its output. They may need re-execution too."
   - Do NOT auto-cascade failures — let the human decide

---

## ORCHESTRATOR STATE

The orchestrator does not maintain its own state file. All state is in:
- `project-progress.json` — skill statuses, gate results, session log
- `pipeline-dag.json` — dependency graph, gates, parallel groups (read-only)
- Conversation context — current session's execution history

This means every session starts fresh from the progress file. No state leaks between sessions.

---

## INTEGRATION WITH EXISTING PROTOCOLS

| Protocol | Relationship to Orchestrator |
|----------|------------------------------|
| STARTUP-SEQUENCE.md | Runs BEFORE orchestrator. Steps 1-4 prepare state. Step 5 is replaced by the orchestrator loop. |
| SESSION-END.md | Runs AFTER orchestrator loop ends. Commits state, reports summary. |
| PROTOCOL-MANIFEST.md | Orchestrator uses it to determine WHAT to load per skill (via loading profiles). |
| EXECUTION-GUARDRAILS.md | Still applies within each skill execution. Orchestrator doesn't bypass guardrails. |
| EVENT-DRIVEN-REMINDERS.md | Still fires during skill execution. Orchestrator monitors context zone signals. |
| ADAPTIVE-COMPACTION-PROTOCOL.md | Orchestrator triggers compaction awareness at YELLOW zone and above. |

---

## CRITICAL RULES

1. **NEVER skip RESOLVE.** Even if you "know" what comes next, run the algorithm. Edge cases (parallel groups, cross-engine eligibility) are not obvious.
2. **NEVER auto-execute past a gate.** Gates are human decisions. Present and wait. No "the output looks good, I'll pass it."
3. **NEVER execute a skill whose dependencies aren't ALL completed.** In-progress is not completed. Failed is not completed.
4. **ALWAYS present eligible skills before executing.** The human confirms or redirects. The orchestrator suggests, the human decides.
5. **ALWAYS update progress immediately after completion.** Before gate check, before context check, before anything else. If the session crashes, the progress file is the recovery point.
6. **NEVER start a skill you can't finish.** If context is ORANGE and the next skill is a heavy Arena execution, recommend ending the session.
7. **The DAG is read-only.** The orchestrator never modifies `pipeline-dag.json`. Only `project-progress.json` is written.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation as part of Harness Architecture Phase 4. |
