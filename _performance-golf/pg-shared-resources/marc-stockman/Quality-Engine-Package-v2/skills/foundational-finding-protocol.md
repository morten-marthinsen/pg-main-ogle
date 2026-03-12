---
name: foundational-finding-protocol
description: "Triple-save protocol for cross-thread discoveries. Ensures foundational findings survive thread death by persisting to memory, file, and skill simultaneously."
---

# Foundational Finding Protocol

**Version:** 1.0 | March 10, 2026
**Trigger:** Auto-triggers when a foundational finding is identified during any work. Also triggers manually when Marc says "capture finding" or "save this discovery."
**Provenance:** Created after recovering two dead threads (March 10, 2026) where foundational discoveries about Claude, ChatGPT, Gemini, and Perplexity API access were trapped in conversation context. The discoveries survived only in memory fragments — workspace files, scripts, and conversation-only details were lost.

---

## The Problem This Solves

Foundational findings are the highest-value output of exploratory work. They are the "aha" moments — technical breakthroughs, architectural decisions, proven approaches, validated constraints — that change how all future work is done.

Without a persistence protocol, these findings exist only in:
- **Conversation context** — dies when the thread dies or compacts
- **Workspace files** — die when the sandbox recycles
- **Memory** — survives across threads but stores summaries, not full technical detail

The result: discoveries get made, celebrated, and then silently lost. Future sessions rediscover them from scratch (if lucky) or make decisions without them (if not).

**This skill ensures every foundational finding is persisted three ways simultaneously, so that no single point of failure can erase it.**

---

## What Qualifies as a Foundational Finding

Not every result is a foundational finding. Use this classification:

| Category | Examples | Qualifies? |
|----------|----------|------------|
| **Technical breakthrough** | "Claude sessionKey works as Bearer token and bypasses Cloudflare" | Yes |
| **Validated constraint** | "ChatGPT POST is blocked from cloud/datacenter IPs" | Yes |
| **Architectural decision** | "Direct HTTP API calls using session tokens, not browser automation" | Yes |
| **Proven approach** | "curl_cffi fixes TLS fingerprint detection by Cloudflare" | Yes |
| **Tool/library discovery** | "gemini-webapi library handles Gemini session auth" | Yes |
| **Working implementation** | A tested script or config that achieves the above | Yes — per L6 |
| **Intermediate result** | "Downloaded 28 files from Perplexity" | No — this is progress, not a discovery |
| **Tactical decision** | "Use OneDrive folder named 'Exploratory Research'" | No — this is a preference, not a finding |
| **Known fact** | "Perplexity has a search API" | No — this is documentation, not a discovery |

**The litmus test:** "If this thread died right now and a new session started fresh, would they need to rediscover this through trial and error?" If yes, it's foundational.

---

## The Triple-Save Protocol

When a foundational finding is identified, execute all three saves in the same turn. Do not defer any save to "later" — "later" may never come.

### Save 1: Memory (cross-thread persistence)

Store the finding in memory using `memory_update`. Format:

```
Remember that [finding statement — complete enough to act on without additional context].
Technical details: [key specifics — API endpoints, token names, library names, version constraints].
Discovered: [date]. Context: [what project/work led to this discovery].
```

**Why memory:** Memory survives across all threads. Even if workspace files and skills are inaccessible, memory provides enough context to reconstruct the finding.

**What to include:** The finding must be self-contained — a future session reading only the memory entry should be able to understand and apply the finding without needing to find the original thread.

**What NOT to include:** Actual credential values (tokens, cookies, passwords). Memory stores metadata about credentials, not the credentials themselves (per R-23).

---

### Save 2: File (workspace persistence within session)

Write the finding to a dedicated findings file: `/workspace/foundational-findings.md`

If the file doesn't exist, create it with this structure:
```markdown
# Foundational Findings Log
## Persisted discoveries that must survive thread death

| # | Date | Finding | Category | Saved To |
|---|------|---------|----------|----------|
```

Add a row for each finding. The "Saved To" column tracks which of the three saves were completed:
- M = Memory
- F = File (this file)
- S = Skill (which skill was updated)

**Also write detailed technical notes** below the table, with full context, code snippets, and implementation details that are too long for memory or a table row.

**Why file:** The file provides detailed technical context within the session. If the thread is active, this file is the fastest reference. If the thread dies, the file dies with it — but memory and skill saves persist.

---

### Save 3: Skill Update (library persistence across threads)

Determine which skill should contain this finding and update it. Options:

| Finding Type | Target Skill | What to Update |
|-------------|-------------|----------------|
| Platform auth/API approach | `session-auth-api-access` | Add to platform-specific section |
| Model-specific behavior | `multi-llm-research-orchestration` | Add to model capabilities section |
| Working code/script | The skill that uses it (per L6) | Embed full source in fenced code block |
| Architectural decision | `master-todo.md` Decisions section | Add to decisions list |
| Tool/library discovery | The skill that will use the tool | Add to dependencies/tools section |
| Operational insight | `marc-ops-framework` or relevant ops skill | Add to relevant section or Known Gaps |
| No clear skill home | Create a new section in the findings file | Note that this finding needs a skill home |

After updating the skill file, save it to the library via `save_custom_skill`. This ensures the finding persists in the skill library even if the workspace dies.

**Per L6 (Implementation Persistence):** If the finding includes working code, the code must be embedded in the skill file, not just referenced as a workspace file. Workspace files die with threads; skill files persist.

**Why skill:** Skills are the highest-durability persistence layer. They survive thread death, workspace recycling, and context compaction. A finding embedded in a skill will be automatically loaded into every future session that uses that skill.

---

## When to Trigger

This protocol should fire automatically when:

1. **A technical approach is validated through testing** — "it works" is the signal
2. **A constraint is discovered through failure** — "it doesn't work because..." is the signal  
3. **An architectural decision is made and confirmed by Marc** — "let's go with X" is the signal
4. **A working implementation passes testing** — code that runs successfully is the signal
5. **Marc explicitly says "capture this" or "save this finding"** — manual trigger

**The AI should proactively identify findings** without waiting for Marc to ask. When something qualifies per the classification table above, announce: "This looks like a foundational finding. Running triple-save protocol." Then execute all three saves.

---

## Verification Checklist

After the triple-save, verify:

- [ ] Memory entry is self-contained (would make sense to a future session with no other context)
- [ ] File entry has both the summary row AND detailed technical notes
- [ ] Skill update is in the correct skill and is accurately stated
- [ ] Skill was saved to library (check for skill_id confirmation)
- [ ] If code is involved, it's embedded in the skill (L6), not just in a workspace file

If any save failed (memory error, skill save error, etc.), retry. If retry fails, note the failure and ensure the other two saves are solid. Two out of three is better than zero.

---

## Recovery Mode

When starting a new session after a thread death, the findings can be recovered from multiple sources:

1. **Memory search** — search for "foundational finding" or the specific topic
2. **Skill files** — load relevant skills and check their content
3. **Workspace files** — if the workspace survived, check `/workspace/foundational-findings.md`

The triple-save ensures that at least one source survives any failure mode:

| Failure | Memory | File | Skill |
|---------|--------|------|-------|
| Thread dies | Survives | Lost | Survives |
| Context compaction | Survives (summary may lose detail) | Survives (in workspace) | Survives |
| Workspace recycles | Survives | Lost | Survives |
| Memory corruption | Lost | Survives (if thread alive) | Survives |
| Skill library down | Survives | Survives (if thread alive) | Lost (temporarily) |

**No single failure loses all three.** The only total-loss scenario is simultaneous memory corruption + workspace death + skill library failure — which is a platform-level catastrophe, not a normal failure mode.

---

## Integration with Other Skills

| Skill | Integration Point |
|-------|------------------|
| `marc-ops-framework` | L6 (Implementation Persistence) mandates code-in-skill. This protocol operationalizes L6. |
| `session-bootstrap` / `re-initialize` | On re-initialize, check `/workspace/foundational-findings.md` for findings not yet triple-saved. |
| `audit` | During audit Pass 1 (Verification), check if any claims in the deliverable are based on findings that haven't been triple-saved. Flag as risk. |
| `thread-resuscitation` | Recovery mode of this protocol feeds into thread resuscitation — findings are the first thing to recover. Step 6 of thread-resuscitation runs triple-save on unprotected findings. |
| `issue-logger` | When a finding is lost and rediscovered, log it as an issue with "triple-save not executed" as the root cause. |

---

## Registration in marc-ops-framework

This protocol should be referenced in:
- **L6 description** — as the operational implementation of implementation persistence
- **Skill Routing table** — auto-triggers on validated technical findings

---

*This skill is the canonical protocol for persisting foundational discoveries across thread boundaries. It directly addresses the "discoveries trapped in dead threads" problem identified on March 10, 2026.*

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Audit | PASSED | 2026-03-10 | AI | Loop 1: 1 material finding (L6 cross-reference missing in framework), 2 changes applied (L6 reference + operational files list). Loop 2: 0 findings. Convergence reached. |
| CHECK | NOT RUN | — | — | — |