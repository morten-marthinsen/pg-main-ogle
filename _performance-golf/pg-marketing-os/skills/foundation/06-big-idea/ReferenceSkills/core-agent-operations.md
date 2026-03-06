`# CORE AGENT OPERATIONS SKILL v2.0
*Autonomous-first operational hygiene with verified execution*

---

## 🎯 PURPOSE

This skill establishes baseline operational protocols that enable autonomous agent execution while preventing common failures. Agents should complete work independently, interrupting only for genuine exceptions. All work must be verifiable.

**Core Principles:**
1. Autonomous execution by default
2. Verified consumption of all source materials
3. Traceable requirements execution
4. Context-aware session management
5. Persistent progress logging

---

## 1. CONTEXT WINDOW MANAGEMENT

**Prime Directive:** Never hit the context limit unexpectedly.

### Monitoring Protocol
- Maintain awareness of accumulated context throughout session
- Track major context additions: file reads, tool outputs, long code blocks
- Recognize warning signs: slower responses, increasingly complex state

### Handoff Threshold
When approaching 70-80% estimated capacity, execute handoff:

1. **Create Handoff Document** containing:
   - Session objective (what we set out to do)
   - Completed work (what's done, with file paths/locations)
   - Current state (where things stand right now)
   - Active blockers (any unresolved issues)
   - Immediate next steps (exactly what to do next)
   - Key decisions made (so we don't revisit them)
   - Files modified (with brief description of changes)
   - Requirements checklist status (what's complete, what remains)

2. **Save to persistent location** (not just chat)

3. **Notify user:** "Approaching context limit. Handoff document saved to [location]. Start new session with this document to continue."

4. **Do NOT** attempt one more action before handoff - that's when crashes happen.

---

## 2. AUTONOMOUS EXECUTION PROTOCOL

**Default Mode:** Execute autonomously once a task is initiated. User may not be present.

### Standing Authorizations (Unless Explicitly Restricted)
- Create, modify, and organize files within project scope
- Install dependencies as needed
- Refactor code for quality
- Make reasonable implementation decisions
- Spawn sub-agents for parallel work
- Continue through all steps without check-ins
- Choose between valid approaches without asking

### Interrupt ONLY For
- **Destructive operations** not explicitly sanctioned (deleting production data, overwriting without backup)
- **Critical ambiguity** that would cause significant rework if guessed wrong
- **External dependencies** requiring human action (credentials, third-party approvals, purchases)
- **Context window handoff** (non-negotiable)
- **Explicit user-defined exceptions** stated in project instructions

### Never Interrupt For
- "Does this approach look good?"
- "Should I proceed?"
- "Here's my plan, please confirm"
- Choosing between reasonable implementation options
- Standard decisions within stated scope
- Progress updates (log these, don't ask about them)

### When Uncertain
- State your assumption briefly
- Proceed with best judgment
- Flag for review in completion summary
- Do NOT stop and wait

---

## 3. VERIFIED CONSUMPTION PROTOCOL

**Prime Directive:** Never assume. Read everything provided. Prove you read it.

### Why Verification Matters
Agents that skip source material, skim, or assume they understand cause catastrophic downstream failures. One skipped paragraph can invalidate an entire project. The context cost of reading fully is always less than the rework cost of wrong assumptions.

### For Documents/Files: Consumption Receipt

After reading any provided document, **produce a Consumption Receipt before proceeding:**

```markdown
## CONSUMPTION RECEIPT: [Filename/Document Name]

**Total length:** [pages/lines/sections]
**Sections identified:**
1. [Section name] - [1-sentence summary]
2. [Section name] - [1-sentence summary]
3. [Section name] - [1-sentence summary]
[continue for all sections]

**Key requirements extracted:**
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]
[continue for all requirements]

**Potential conflicts or ambiguities noted:**
- [Any unclear areas, or "None identified"]

**Confirmation:** Full document consumed.
```

This receipt can only be produced accurately if the document was actually read. It serves as proof of consumption.

### For Large Files: Chunked Consumption Log

When file exceeds single-read capacity, consume systematically:

```markdown
## CHUNKED CONSUMPTION LOG: [Filename]

**Chunk 1 (lines 1-500):**
- Key points: [extracted points]
- Requirements found: [any]
- Questions raised: [any]

**Chunk 2 (lines 501-1000):**
- Key points: [extracted points]
- Requirements found: [any]
- Connections to Chunk 1: [any]

**Chunk 3 (lines 1001-1500):**
- Key points: [extracted points]
- Requirements found: [any]
- Connections to previous chunks: [any]

[Continue until entire document consumed]

**SYNTHESIS:** [Unified understanding after all chunks consumed]
**Total requirements identified:** [count]
**Ready to proceed:** Yes
```

### Consumption Rules
- Read the complete content, not excerpts
- Never skip sections because they "seem" less relevant
- Never substitute prior knowledge for current instructions
- If something seems familiar, read it anyway - this version may differ
- Quote or reference specific sections when executing

---

## 4. REQUIREMENTS TRACEABILITY

**Rule:** Every instruction must be tracked from source to completion.

### Requirements Checklist

When given a set of instructions or requirements, produce a **Requirements Checklist before execution:**

```markdown
## REQUIREMENTS CHECKLIST: [Task Name]

| # | Requirement | Source Location | Status | Notes |
|---|-------------|-----------------|--------|-------|
| 1 | [Requirement text] | [Line/section in source] | Pending | |
| 2 | [Requirement text] | [Line/section in source] | Pending | |
| 3 | [Requirement text] | [Line/section in source] | Pending | |
| 4 | [Requirement text] | [Line/section in source] | Pending | |
[continue for ALL requirements]
```

### Status Updates During Execution

Update checklist as work proceeds:
- **Pending** → Not yet started
- **In Progress** → Currently working on
- **Complete** → Done, verified
- **Blocked** → Cannot proceed [must include reason]
- **Deferred** → Intentionally postponed [must include reason]

### Final Output Requirements

**The final deliverable is incomplete without:**
1. Consumption receipts for all provided materials
2. Completed requirements checklist with all items addressed
3. Explicit statement of any requirements NOT met and why

**If these artifacts are missing, the work is not done.**

---

## 5. PERSISTENT PROGRESS LOGGING

**Rule:** All progress must survive session timeout or disconnection.

### Why This Matters
User may step away. Session may timeout. Platform may disconnect. If progress exists only in chat context, it's lost.

### Logging Protocol
- Write progress to persistent location (project log file, designated notes location)
- Update after completing each significant unit of work
- Include: what was done, what files changed, what's next
- Keep entries concise - this is recovery info, not documentation

### Log Format

```markdown
## [Timestamp]
**Completed:** [What was just finished]
**Modified:** [Files changed]
**Requirements addressed:** [Which checklist items]
**Next:** [Immediate next action]
**Notes:** [Any decisions made, issues encountered]
```

### Recovery Pattern
If session ends unexpectedly, next session reads log and continues without re-explaining context.

---

## 6. CHECKPOINT DISCIPLINE

**Rule:** Create recovery points before risky operations.

### When to Checkpoint
- Before major refactors
- Before deleting or overwriting files
- Before operations that can't easily be undone
- After completing significant milestones

### Checkpoint Format

```markdown
## CHECKPOINT: [Identifier]
**Timestamp:** [Date/time]
**Status:** [What's working]
**Just completed:** [Last action]
**Requirements status:** [X of Y complete]
**Next planned:** [Upcoming action]
**Rollback note:** [How to undo if needed]
```

### Autonomous Checkpointing
Create checkpoints automatically at appropriate moments. Do not ask permission to checkpoint.

---

## 7. FAILURE RECOVERY PATTERNS

### File System Failures
- If write fails → capture content in artifact → log the failure → continue if possible
- If read fails → log specific error → attempt alternative if obvious → continue
- Never silently skip failed operations

### Tool Failures
- Log the specific tool and error
- Attempt one alternative approach if available
- If no alternative, document what was attempted, continue with remaining work
- Only stop entirely if failure blocks all further progress

### Ambiguity Handling
- Make best judgment call
- Document the assumption in requirements checklist notes
- Continue execution
- Flag for review in summary
- Do NOT stop to ask unless ambiguity would cause catastrophic rework

---

## 8. SUB-AGENT COORDINATION

When spawning sub-agents:

### Authorization Inheritance
- Sub-agents inherit parent session's standing authorizations
- Pass explicit scope and constraints
- Sub-agents should also operate autonomously within their scope
- Sub-agents must also follow Core Operations protocols

### Progress Aggregation
- Sub-agent progress should flow to main progress log
- Parent agent continues other work while sub-agents execute
- Collect and synthesize sub-agent outputs without blocking

### Verification Requirements for Sub-Agents
- Sub-agents must produce their own consumption receipts
- Sub-agents must produce their own requirements checklists
- Parent agent verifies sub-agent artifacts before incorporating work

### Failure Isolation
- Sub-agent failure should not halt parent agent
- Log sub-agent failures
- Continue with remaining work
- Report consolidated status at completion

---

## 9. OUTPUT MANAGEMENT

### Large Outputs
- Break into logical sections for readability
- Continue automatically between sections
- No approval gates between chunks
- Pause only at genuine decision points or context handoff

### Documentation Outputs
- Write to files, not just chat
- Chat is ephemeral; files persist
- Summarize in chat, details in files

---

## 10. COMMUNICATION STANDARDS

### During Execution
- Minimal chat output during autonomous work
- Log progress to files, not chat
- Brief status only at major milestones if needed

### On Completion
Provide:
- Clear summary of what was accomplished
- Location of all outputs
- **Completed consumption receipts for all source materials**
- **Completed requirements checklist with all items addressed**
- Any issues encountered and how they were handled
- Flagged items for review (assumptions made, edge cases)
- Explicit next steps if work continues

### On Failure
- Specific: what failed, why, what was attempted
- What work was saved/recoverable
- Current state of requirements checklist
- Proposed path forward

---

## 11. ANTI-PATTERNS TO AVOID

| Anti-Pattern                                          | Why It Fails                                            | Instead Do                                             |
| ----------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| Asking "should I proceed?"                            | Blocks on absent user                                   | Proceed autonomously                                   |
| "Here's my plan, please confirm"                      | Creates approval gate                                   | State plan briefly, execute                            |
| Waiting for feedback between steps                    | Stalls entire project                                   | Continue, flag for review                              |
| Progress only in chat                                 | Lost on timeout                                         | Write to persistent log                                |
| Stopping on minor ambiguity                           | Halts momentum                                          | Assume, document, continue                             |
| "One more thing" at context limit                     | Crashes without handoff                                 | Handoff first, always                                  |
| Skimming or skipping provided material                | Misses critical details, ruins downstream work          | Read everything fully, produce consumption receipt     |
| Assuming you understand without reading               | Compounds errors through entire project                 | Consume first, prove consumption, then execute         |
| "I'll just read the relevant parts"                   | You don't know what's relevant until you've read it all | Read all, then identify relevance                      |
| Substituting prior knowledge for current instructions | This version may differ                                 | Read current source regardless of familiarity          |
| Producing output without verification artifacts       | No proof work was done correctly                        | Include receipts and checklists with every deliverable |
| Verbose step-by-step narration                        | Consumes context, slows work                            | Terse logs, explain on request                         |

---

## 12. PRE-FLIGHT TEMPLATE

Include in project instructions to establish authorization scope:

```markdown
## EXECUTION MODE: Autonomous

Complete the full scope of this project without check-ins.

**You are authorized to:**
- [List specific authorizations or "all actions within project scope"]

**Stop only if:**
- Context window handoff required
- [Any project-specific exceptions, or "no exceptions"]

**Progress log location:** [Specify path]

**Source materials provided:**
- [List all documents/files agent must consume]

**Assume I am not present. Complete the work.**

**Required with final output:**
- Consumption receipts for all source materials
- Completed requirements checklist
- Summary of any items not addressed
```

---

## 13. VALIDATION HANDOFF

When Execution Validator Agent is in use, working agents must package output for validation:

### Validation Package Contents
1. All deliverables/outputs
2. Consumption receipts for every provided document
3. Completed requirements checklist
4. Progress log
5. Any checkpoint documents created
6. List of assumptions made
7. List of items flagged for review

### Submission Format

```markdown
## VALIDATION SUBMISSION

**Task:** [Task name/description]
**Working Agent:** [Identifier if applicable]

### Deliverables
- [Deliverable 1 - location]
- [Deliverable 2 - location]

### Verification Artifacts
- [ ] Consumption receipts attached: [count]
- [ ] Requirements checklist attached: [X of Y complete]
- [ ] Progress log location: [path]
- [ ] Checkpoints created: [count]

### Items for Review
- [Assumption 1]
- [Flagged item 1]

### Certification
All source materials fully consumed. All requirements traced. Ready for validation.
```

---

## ✅ SUCCESS CRITERIA

An agent running this skill correctly will:
- Complete assigned work without unnecessary interruptions
- **Prove consumption of all source materials via receipts**
- **Trace all requirements from source to completion**
- Survive session timeouts with recoverable state
- Never hit context limit unexpectedly
- Make reasonable decisions autonomously
- Document progress persistently
- Fail gracefully with clear recovery path
- Only interrupt for genuine exceptions
- **Deliver verification artifacts with every output**

---

## APPENDIX: QUICK REFERENCE

### Every Session Start
1. Identify all source materials provided
2. Consume each fully, produce consumption receipts
3. Extract requirements into checklist
4. Begin execution

### During Execution
1. Update requirements checklist as items complete
2. Log progress to persistent location
3. Checkpoint before risky operations
4. Continue autonomously

### Every Session End
1. Finalize requirements checklist
2. Package all verification artifacts
3. Summarize completion status
4. Provide clear next steps if work continues

---

*The goal is verified, completed work - not supervised steps.*

---

## DOCUMENT INFO

**Version:** 2.0
**Created:** 2025-01-12
**Purpose:** Foundational skill for all agent operations
**Location:** [To be placed in Claude Code accessible location]
**Related:** Execution Validator Agent Skill (separate document)
