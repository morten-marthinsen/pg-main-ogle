---
name: thread-resuscitation
description: "Systematic recovery protocol for dead or compacted threads. 6-step process to reconstruct complete state from fragments."
---

# Thread Resuscitation Protocol

**Version:** 1.0 | March 10, 2026
**Trigger:** Marc provides context from a dead thread (pasted conversation, links, or summary) and says "recover this" or "resuscitate this thread" or describes work from a prior session that needs to continue.
**Provenance:** Codified from the March 10, 2026 recovery of two dead threads (Deep Research Automation v1 and v2). Both threads contained foundational discoveries and architecture decisions that were partially lost. This protocol was developed during that recovery to prevent future sessions from approaching thread death ad-hoc.

---

## The Problem This Solves

Threads die. Context compaction loses detail. Sandboxes recycle and take workspace files with them. When Marc needs to continue work from a dead thread, the AI currently has no systematic way to:

1. Identify what survived vs. what was lost
2. Reconstruct a complete picture from fragments
3. Distinguish decisions from explorations
4. Produce a reliable master state without gaps

The result: recovery is slow, error-prone, and often incomplete. Important discoveries are missed. Decisions get re-litigated. The AI confidently reports work as done when it was actually interrupted.

**This skill provides a repeatable 6-step recovery protocol that produces a verified master state from any combination of surviving fragments.**

---

## What Survives Thread Death

Understanding what persists and what doesn't is the foundation of effective recovery.

| Artifact | Survives Thread Death? | Survives Workspace Recycle? | Notes |
|----------|----------------------|---------------------------|-------|
| **Memory entries** | Yes | Yes | Highest-durability store. Summaries only — not full technical detail. |
| **Saved skills** (library) | Yes | Yes | Second-highest durability. Content is fully recoverable via `load_skill`. |
| **Workspace files** | No | No | Lost when thread dies or sandbox recycles. |
| **Conversation context** | No | N/A | Lost entirely when thread dies. Summarized on compaction. |
| **Scripts and code** | No (unless in skill per L6) | No | The most commonly lost artifact. |
| **Credentials/cookies** | No (unless saved per R-23) | No | Must be re-exported by Marc each new thread. |
| **Todo lists** (platform UI) | No | N/A | Platform-specific, not persistent. |
| **Audit checkpoints** | No | No | Workspace files — lost with thread. |

**Key insight from March 10 recovery:** The two most painful losses were (1) a working Python orchestrator script that was only in the workspace, and (2) detailed technical discoveries that were in conversation context but not memory. Both losses directly led to the creation of L6 (Implementation Persistence) and `foundational-finding-protocol` (triple-save).

---

## The Recovery Protocol (6 Steps)

### Step 1: Gather All Available Fragments

Collect every piece of surviving information. Sources, in order of reliability:

**Tier 1 — High reliability (stored in durable systems):**
1. **Memory search** — Search for the project name, key people, tools, platforms, and concepts from the dead thread. Memory entries are the most reliable surviving fragments.
2. **Skill library** — Load any skills that were created or modified during the dead thread. Their content is fully intact.
3. **Credential files** — Check `/workspace/credentials/` (if workspace survived) or memory for credential metadata.

**Tier 2 — Medium reliability (user-provided, potentially incomplete):**
4. **Marc's pasted content** — Marc may paste conversation excerpts, thread summaries, or context summaries from the dead thread. These are valuable but may be incomplete or out of date (they capture one point in time, not the final state).
5. **Linked resources** — URLs, documents, or external artifacts referenced in the dead thread.

**Tier 3 — Low reliability (inferred, may have gaps):**
6. **Training data / general knowledge** — What the AI knows about the tools, platforms, and approaches mentioned. Useful for filling gaps but not for confirming what was actually done vs. planned.

**Output:** A raw inventory of all fragments, organized by tier. Note the source and reliability of each piece.

---

### Step 2: Reconstruct the Timeline

From the fragments, build a chronological timeline of what happened in the dead thread:

```
[Date/Time if known] — [What happened] — [Source: memory/skill/pasted/inferred]
```

**Focus on:**
- Decisions made (and by whom — Marc decides, AI proposes)
- Work completed (with evidence — not just claims)
- Work started but not finished
- Blockers encountered
- Discoveries made

**Distinguish carefully between:**
- **Done** — evidence exists that this was completed (memory says "built X", skill contains X, Marc confirms X)
- **In progress** — evidence that work started but no evidence of completion
- **Planned** — discussed but no evidence of execution
- **Explored** — investigated but explicitly rejected or deferred

This distinction is critical. The March 10 recovery found that the AI initially reported items as "done" that were actually "in progress" or "planned" — because the dead thread's conversation contained confident statements about future work that looked like past-tense reports when read out of context.

---

### Step 3: Identify What Was Lost

Cross-reference the timeline against the survival table (Step 1) to identify gaps:

| Category | What to Check | How to Detect Loss |
|----------|--------------|-------------------|
| **Code/scripts** | Was working code mentioned in the timeline? | Check if it's embedded in a skill (L6). If not → LOST. |
| **Workspace files** | Were files created during the dead thread? | Files don't survive thread death. All → LOST unless backed up. |
| **Detailed technical notes** | Were implementation details discovered? | Check memory for detail level. If memory only has summaries → DETAIL LOST. |
| **Credentials** | Were cookies/tokens provided? | Check `/workspace/credentials/` and memory. If not saved per R-23 → LOST. |
| **Decisions** | Were decisions made and recorded? | Check skills and memory. If only in conversation → LOST. |
| **Progress on multi-step work** | Was a checklist being tracked? | Platform todo lists don't survive. Check memory for progress notes. |

**Output:** A loss inventory — what's confirmed lost, what's partially lost (summary survived but detail didn't), and what's fully intact.

---

### Step 4: Build the Master State

Synthesize all fragments into a single master document: `/workspace/master-todo.md`

Structure:

```markdown
# Master Todo — [Project Name]
## Reconstructed [Date] from [Thread names/descriptions]

## SAVED TO SKILL LIBRARY (Confirmed Loaded)
- [x] [skill name] (skill_id) — [description and status]

## FOUNDATIONAL DISCOVERIES (In Memory)
- [x] [discovery] — [verification status]

## COOKIE/CREDENTIAL STATUS
| Platform | Status | Notes |
|----------|--------|-------|

## NOT YET BUILT — Skills & Commands
[Numbered list of planned but unbuilt items]

## NOT YET DONE — [Category]
[Numbered list of incomplete work items]

## DECISIONS MADE (for reference)
[Bullet list of confirmed decisions with rationale]

## SEPARATE THREAD FLAGS
[Items that belong to other threads/projects]
```

**Rules for the master state:**
- Every item must have a clear status: done, in progress, planned, deferred, or lost
- Every "done" item must cite its evidence source
- Every "lost" item must note what would be needed to reconstruct it
- Decisions must note who decided (Marc or AI recommendation) and when
- Use checkboxes `[x]` for done, `[ ]` for not done — makes scanning easy

---

### Step 5: Verify with Marc

Present the master state to Marc for verification. The AI's reconstruction is an informed guess — Marc is the ground truth.

**Verification prompt:**
```
I've reconstructed the state from [N] fragments across [sources].

Here's what I believe is the current state:
[master state summary — key items only, not the full document]

Key uncertainties:
- [item where evidence is conflicting or thin]
- [item where status is ambiguous]

Does this match your understanding? Anything I'm missing or got wrong?
```

**Why this step matters:** The March 10 recovery initially produced a synthesis with 7 material errors — items marked as "done" that weren't, missing items that were important, and status misclassifications. Marc's corrections were essential to reaching an accurate state. The AI should NEVER skip verification and treat its reconstruction as authoritative.

---

### Step 6: Activate the Recovered State

Once Marc confirms the master state, bring it live:

1. **Save master-todo.md** to workspace and share via share_file
2. **Load all relevant skills** from the library
3. **Check credentials** — which platforms need Marc to re-export cookies?
4. **Create operational infrastructure** — reasoning log, staleness map, etc. (per session-bootstrap Step 5)
5. **Run the foundational-finding-protocol** on any discoveries that weren't triple-saved in the dead thread — this is the most common gap
6. **Update memory** with the reconstructed state — so future thread deaths have more to work from

**After activation, suggest an audit** on the master state to catch any remaining gaps.

---

## Recovery Patterns (from March 10 experience)

### Pattern 1: The Confident Ghost
**What happens:** The dead thread contained confident statements about planned work ("Next, I'll build X"). In recovery, these read as completed work. The AI reports X as done.
**Prevention:** Always look for EVIDENCE of completion, not just statements of intent. "I'll build X" ≠ "X is built." Check: is X in a skill file? Is X in memory as completed? Can Marc confirm X was delivered?

### Pattern 2: The Detail Fade
**What happens:** Memory preserved that "Claude auth was solved" but not HOW (sessionKey as Bearer token bypassing Cloudflare). The detail is the valuable part.
**Prevention:** When recovering, search memory with specific technical terms, not just project names. "Claude sessionKey Bearer token" retrieves more than "Claude auth."

### Pattern 3: The Orphaned Script
**What happens:** Working code existed in the workspace but wasn't embedded in a skill. Thread dies. Code is gone.
**Prevention:** L6 (Implementation Persistence) now requires working code to be embedded in skills. During recovery, check every skill that should contain code — if the code block is missing, flag for reconstruction.

### Pattern 4: The Credential Gap
**What happens:** Cookies were provided in conversation but never saved to file (pre-R-23). Thread dies. Cookies are gone. Marc has to re-export.
**Prevention:** R-23 now requires immediate file save. During recovery, check `/workspace/credentials/` and flag missing platforms.

### Pattern 5: The Decision Drift
**What happens:** A decision was made early in the thread but later work implicitly changed it without updating the decision record. Recovery picks up the original decision, not the evolved one.
**Prevention:** L3 (Decision Record Staleness) now requires same-turn updates when decisions change. During recovery, look for conflicting signals in later messages that might indicate decision drift.

---

## Integration with Other Skills

| Skill | Integration Point |
|-------|------------------|
| `session-bootstrap` | Step 6 uses session-bootstrap's infrastructure creation (Step 5) to set up the recovered workspace. |
| `foundational-finding-protocol` | Step 6 runs triple-save on any discoveries that weren't persisted in the dead thread. |
| `marc-ops-framework` | Recovery respects all standing rules. R-23 (credentials), L6 (code in skills), L3 (decision staleness) are particularly relevant. |
| `audit` | Suggest audit after recovery to catch remaining gaps. |
| `objective-intake` | After recovery, the next objective Marc states goes through normal intake — recovery doesn't bypass the stack. |

---

## When NOT to Use This Protocol

- **Context compaction within a live thread** — Use `re-initialize` instead. The workspace is still alive; you just need to reload skills and context.
- **Simple "where were we?" after a break** — Use `re-initialize`. No need for full recovery.
- **Starting fresh on a project** — Use `initialize`. No dead thread to recover from.
- **Thread is still alive but context is long** — Not a recovery situation. Just continue working.

This protocol is specifically for: **dead threads where workspace files are gone and the work needs to continue.**

---

## Registration in marc-ops-framework

This skill should be registered in the Operational Skills table:

| Skill | When to Load |
|-------|-------------|
| `thread-resuscitation` | Load when Marc provides context from a dead thread and needs to continue that work. Triggers on pasted conversation content, dead thread links, or explicit "recover/resuscitate" requests. |

---

*This skill is the canonical protocol for recovering work from dead threads. It directly codifies the lessons learned during the March 10, 2026 recovery session. The five recovery patterns above are the most common failure modes — check for all of them during any recovery.*

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Audit | PASSED | 2026-03-10 | AI | Final audit (cross-skill + thread-resuscitation). Loop 1: 3 material findings (stale "planned" reference, missing agent routing in framework description, stale master-todo). Loop 2: 0 findings. Convergence reached. |
| CHECK | NOT RUN | — | — | — |