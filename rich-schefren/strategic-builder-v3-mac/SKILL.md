---
name: strategic-builder
description: "Complete project lifecycle methodology: setup, building, testing, auditing, optimizing, finishing, deploying, and archiving. Follow this when starting a new project, continuing an existing one, adding to a system, or closing out work. Enforces the Translation Stack, validation gates with independent audits, project infrastructure (CLAUDE.md first), session management, optimization requirements, skill-to-runbook lifecycle, finishing protocols (complete/paused/abandoned), and archiving to Archived-Projects vault. Use whenever Rich says 'new project,' 'build this,' 'let's create,' or when planning any system."
---

# Strategic Builder Methodology — Operational Skill

## What This Is

A prescriptive methodology agents FOLLOW (not consult) when building projects. Every project moves through the Translation Stack top-down. No level is skipped. Each level has a validation gate AND (for high-blast-radius levels) an independent audit that must pass before proceeding.

This skill covers the COMPLETE project lifecycle: setting up, managing, testing, auditing, optimizing, finishing, deploying, and archiving.

**Source of truth:** `Active-Brain/01 Strategic Profits/00 Program Development/Force Multiplier/Content/methodology/The Strategic Builder Methodology — Unified.md`

---

## Core Constraints

**Reality Constraint (enforced at every level):**
- Only propose what can be built with current tools and current skill level
- No theoretical architectures requiring tools that don't exist
- No capability maps with 20 capabilities when 5 will do
- If you catch yourself proposing something elaborate, cut it in half, then ask if you can cut it again
- The test: "Can this be built and running within days, not months?"

**Time Calibration:**
| Artifact | Realistic AI-Assisted Time |
|----------|---------------------------|
| Vision Document | 15-30 min |
| Architecture Map | 20-40 min |
| Capability Map | 15-30 min |
| Phased Delivery Plan | 10-20 min |
| Prototyping (AI tools) | 30-60 min |
| PRD | 20-40 min |
| Build (from good PRD) | 30 min - few hours |
| Post-Build Validation | 15-30 min |
| Full project (Vision to working v1) | 1-3 sessions |

If estimates exceed these ranges significantly, the scope is too large. Simplify.

**Portability Constraint:**
- All project artifacts live in the Obsidian vault, never only in chat
- Nothing that matters exists only in conversation history
- Store in the project folder, never in temp files

**Durability-First Build Rule:**
When two implementation approaches exist — one quick/fragile and one requiring more setup but more stable — default to the durable approach. There is no silent shortcut option. Either do it the right way, or ask first.

**Feedback Loop Protocol:**
- When working at any level, if you discover the level above is wrong, STOP
- Go back up, fix the higher-level document, then return down the stack
- Never plow forward with a broken higher level. The cost compounds downward.

---

## Decision Tree: Which Workflow?

```
Is this a brand new initiative?
├── YES → Full Workflow (Infrastructure → Vision → ... → Implementation → Finishing)
└── NO
    ├── Continuing an existing project (new session)?
    │   └── Session Startup Protocol (read CLAUDE.md → PROJECT-STATE → PROGRESS-LOG → resume)
    ├── Adding a new system to existing architecture?
    │   └── Update Architecture → Capability Map → Phased Delivery → [Prototype] → PRD → Build → Validate
    │       (All with audits at appropriate levels)
    ├── Adding capability to existing system?
    │   └── Update Capability Map → Phased Delivery → [Prototype] → PRD → Build → Validate
    ├── Modifying existing capability?
    │   └── PRD → Build → Validate → Update CLAUDE.md/PROJECT-STATE
    ├── Quick fix / maintenance?
    │   └── PRD (lightweight) → Build → Update CLAUDE.md/PROJECT-STATE
    ├── Closing out a project?
    │   └── Finishing Protocol (Complete, Paused, or Abandoned)
    └── Archiving a finished project?
        └── Archiving Protocol

[Prototype] = Required for AI tools (skills, agents). Skip for non-AI builds.
Validate = Post-Build Validation (see section below)
```

---

## Project Infrastructure (Created FIRST)

Before building anything, create the project's enforcement infrastructure. These files ensure any session entering the project knows what to do.

### Step 1: Project Folder
New folder at `Active-Brain/00 Projects/[Project Name]/`

### Step 2: CLAUDE.md (Session Controller)
This is the FIRST file created, not the last updated. It must contain:

1. **Protocol mandates** — which protocols this project requires
2. **Required reads at session start** — PROJECT-STATE, PROGRESS-LOG, handoff docs
3. **Quality gate definitions** — project-specific thresholds
4. **Sub-agent rules** — persona assignments, structured context template, quality thresholds, depth limits
5. **Progress logging location and frequency**
6. **Key decisions log** — decisions that should not be revisited

### Step 3: PROJECT-STATE File
Living single source of truth. Tracks:
- Complete task graph (phases, dependencies, status)
- Current phase and immediate next steps
- Key decisions made
- All important file locations
- Sub-agent results and quality scores (if applicable)

Updated at the end of every work session.

### Step 4: PROGRESS-LOG.md
Empty file, ready for session entries. After every significant unit of work, append:

```
## [Timestamp]
**Phase:** [Current phase]
**Completed:** [What was finished]
**Modified:** [Files changed]
**Requirements addressed:** [Which ones]
**Quality gates:** [PASS/FAIL with scores]
**Next:** [Immediate next action]
```

### Step 5: Authorization Manifest
Pre-answers all permission questions. See Authorization Manifest section below.

### Step 6: Thought-Pads Subfolder
`[Project Folder]/thought-pads/` — one file per agent.

---

## The Translation Stack

### Level 1: Vision Document

**Produce:** Short document (one page max) describing the transformed state. Not features. The outcome.

**Validation gate:**
- [ ] Describes a transformed state, not features
- [ ] Multiple completely different architectures could achieve this vision
- [ ] Someone can understand the goal without knowing the implementation
- [ ] Short — one page maximum
- [ ] Realistic — achievable with current tools and team

**Independent audit required.** A separate agent verifies: Does this describe a transformed state? Could multiple architectures achieve it? Is it achievable?

**Store as:** `[Project Folder]/vision.md`

---

### Level 2: System Architecture Map

**Produce:** Map of all systems and their relationships. What connects to what, what data flows between them, what dependencies exist.

**Validation gate:**
- [ ] Someone can see how all pieces fit together without knowing internals
- [ ] All dependencies are explicit
- [ ] No system exists in isolation
- [ ] Every system can be built and maintained with current resources
- [ ] The total number of systems is the minimum needed
- [ ] You could explain this architecture in 2 minutes

**Independent audit required.** A separate agent verifies: Does this architecture achieve the Vision? Are ALL dependencies explicit?

**Store as:** `[Project Folder]/architecture.md`

---

### Level 3: Capability Map

**Produce:** For each system, what jobs it must perform — stated as outcomes, not features. Inputs, outputs, dependencies.

**Validation gate:**
- [ ] Each capability is stated as a job/outcome, not a feature
- [ ] For each capability, you can imagine 3+ different implementations
- [ ] Inputs and outputs are defined
- [ ] Each capability can be built with tools that exist today
- [ ] No capability requires "magic"
- [ ] The total number of capabilities is the minimum needed

**Independent audit required.** A separate agent verifies: Does every capability trace to the Architecture? Are there architectural components with no capabilities? Capabilities with no parent system?

**Store as:** `[Project Folder]/capabilities.md`

---

### Level 4: Phased Delivery Plan

**Process:**
1. Identify the single most important problem (the core problem)
2. Find the minimum capability set to solve it — that's Phase 1
3. Group remaining capabilities into phases by dependencies, value, effort
4. Validate: each phase works independently

**Validation gate:**
- [ ] Phase 1 solves a real, complete problem on its own
- [ ] You could stop after Phase 1 and have something valuable
- [ ] Phase 1 can be built in days, not weeks
- [ ] No phase depends on a later phase
- [ ] Phases are sequenced by value delivered, not technical layers

**Independent audit required.** A separate agent verifies: Does Phase 1 genuinely solve a complete problem? Does sequencing follow value, not technical layers?

**Store as:** `[Project Folder]/phased-delivery.md`

---

### Level 5: Prototyping (AI Tools Only)

**When:** Build target is an AI tool (skill, agent, workflow). Skip for non-AI builds.

**Process:**
1. Work through the capability manually with AI in conversation
2. Run 3-5 test scenarios with real or realistic inputs
3. Note where AI needed more context, what output format worked, what broke, what revealed ambiguity
4. Only after prototyping, write the PRD

**Validation gate:**
- [ ] At least 3 test scenarios run with real or realistic inputs
- [ ] Output format validated against actual results
- [ ] Edge cases discovered during prototyping are documented
- [ ] You can articulate what changed between initial assumptions and what prototyping revealed

**No audit required.** Exploratory by nature.

**Store as:** `[Project Folder]/prototype-notes.md`

---

### Level 6: PRD

**Produce:** Specification for current phase. Eight components — see `references/prd-template.md`.

**The eight components:**
1. Objective — what capability, linked to Capability Map
2. Scope — in and out, explicit
3. Requirements — specific, testable statements
4. Acceptance Criteria — verifiable checkboxes
5. Integration Points — inputs, outputs, dependencies
6. Edge Cases — unusual scenarios with defined behaviors
7. Constraints — technical, practical limitations
8. Out of Scope — explicit exclusions with reasons

**Validation gate:**
- [ ] All 8 components present
- [ ] Every requirement is testable
- [ ] An AI could build this without asking clarifying questions
- [ ] Estimated build time is hours, not days
- [ ] Includes built-in optimization requirements (usage tracking, performance scoring, pattern detection, feedback loops, version history, degradation detection)

**Translation audit required.** A separate agent verifies: Does this PRD implement the capability it claims to — not a different capability, not a subset, not a superset?

**Store as:** `[Project Folder]/prd-phase-[N].md`

---

### Level 7: Implementation

**Build from PRD using Execution Checklist:**

| # | Requirement | Status | Evidence |
|---|-------------|--------|----------|
| 1 | [From PRD] | [ ] | |
| 2 | [From PRD] | [ ] | |

**Rules:**
- Mark each requirement AS you implement it
- Evidence = specific file path, line number, or output proof
- "Done" is not valid evidence
- Blocked = BLOCKED with reason
- Completed checklist is a required deliverable

**After building:** Update CLAUDE.md, PROJECT-STATE, and PROGRESS-LOG.

---

## Quality Gate Enforcement

Quality gates are checkpoints, not labels. When a deliverable hits a gate:

1. Evaluate against threshold criteria
2. Log PASS or FAIL explicitly
3. If FAIL: spawn corrective action with SPECIFIC failure notes (not "do better")
4. Re-evaluate after correction
5. Maximum 3 retries, then escalate to the human with options
6. NEVER proceed past a failed gate without logging the failure and the decision

---

## Post-Build Validation

| Test | What You're Checking |
|------|---------------------|
| **Happy path** (3 scenarios) | Works with clean, expected inputs? |
| **Edge cases** (3 scenarios) | Handles missing data, unusual input gracefully? |
| **Failure modes** (2 scenarios) | Fails explicitly, not silently? |
| **Consistency** (same input 3x) | Similar-quality outputs each time? |
| **Real-world input** (1-2 scenarios) | Produces output you'd actually use? |

If any test fails, fix and re-run. Do not ship failing systems.

**Store as:** `[Project Folder]/validation-results.md`

---

## Client-Facing Projects: Additional Mandatory Phases

**"Client-Facing"** = any project where output is delivered TO or used BY clients/students.

For client-facing projects, two additional phases are MANDATORY after Post-Build Validation.

### Phase: Delivery Operations

Must answer before the project can be `complete`:
- How does the client RECEIVE this? (Email? Portal? Installer? Download?)
- What format? (HTML? PDF? Markdown? Installers?)
- What sequence and timing?
- What prerequisites must exist first? (Keap campaigns, GitHub repos, hosting)
- How is completion tracked?
- What happens when a client gets stuck?

**Architecture.md must include a "Delivery Architecture" section:**

```
## Delivery Architecture
### Distribution Mechanism   [how it reaches the client]
### Format                   [file types, packaging method]
### Sequence & Timing        [order, triggers, pacing]
### Prerequisites            [what must exist before delivery can happen]
### Tracking & Support       [how to know if client is stuck]
### Edge Cases               [team distribution, multiple programs, missing prereqs]
```

If this section can't be filled out with specific answers, the architecture is incomplete.

**Capability Map must include "Delivery & Support Capabilities":**
- Package materials for distribution
- Distribute materials to clients (mechanism, timing, prereqs)
- Track client progress/completion
- Support stuck clients
- Handle edge cases

**Project task graph must include delivery tasks** (e.g., T-014: Package skills as installers, T-015: Build distribution sequence, T-016: Set up tracking, T-017: End-to-end test).

**"Scoped but waiting" documents are RED FLAGS.** If a doc says "awaiting decisions before building," that's an unresolved dependency — not a low-priority note. Add blocked tasks to the task graph. Project status cannot be `complete` while blocked tasks exist.

---

### Phase: End-to-End Testing

**"A client can use it" is the definition of done for client-facing projects.**

"Works on my machine" is NOT done. Test on a clean machine with a client who has zero context:

- [ ] Client can RECEIVE the package (delivery mechanism works)
- [ ] Client can FOLLOW all instructions (nothing references non-existent files)
- [ ] Client can REACH the end state (tools installed, configured, running)
- [ ] All referenced materials exist in the package
- [ ] All download links, installers, and repos work
- [ ] All installers run on both Mac and Windows

---

### Ready to Ship Checklist (Required Before `complete` on Client-Facing Projects)

**Content Layer**
- [ ] All components built and reviewed
- [ ] No placeholders remaining ([SUPPORT EMAIL], [screenshot], etc.)
- [ ] Voice/quality passes standards

**Delivery Layer**
- [ ] Distribution mechanism specified and built
- [ ] Package format defined and tested
- [ ] Sequence and timing documented
- [ ] Tracking system identified and implemented
- [ ] Support channel defined
- [ ] Prerequisites documented

**Testing Layer**
- [ ] End-to-end test on clean machine completed
- [ ] All referenced materials exist in the package
- [ ] All download links and installers work
- [ ] Support process tested with a stuck-client scenario

**Documentation Layer**
- [ ] Architecture.md has Delivery Architecture section (filled out)
- [ ] Capability Map has Delivery & Support Capabilities (filled out)
- [ ] Task graph includes delivery tasks (T-014+)
- [ ] No "scoped but waiting" documents blocking critical paths

**If ANY box is unchecked → status = `blocked` or `in-progress`, NOT `complete`.**

---

## Optimization

Every system MUST include self-improvement mechanisms. This is enforced at the PRD Gate.

### Built-In Optimization (Required in Every System)

Every system must include, at minimum:
1. **Usage tracking** — inputs, outputs, used-as-is/edited/rejected
2. **Performance scoring** — automatic quality assessment against own criteria
3. **Pattern detection triggers** — every 10 uses or weekly, surface what's working/degrading
4. **Feedback loops** — output quality feeds back into instruction refinement
5. **Version history** — every improvement versioned for rollback
6. **Degradation detection** — alert when quality drops below threshold

### Failure-Driven Optimization
When something breaks: fix it, add a rule so it doesn't recur. Instruction files evolve from failures.

### Deliberate Optimization
**Triggers:**
- After 10 real-world uses
- Output rejection rate exceeds ~30%
- After any significant failure
- Before generating a runbook

**The pass:**
1. Review usage data from built-in tracking
2. Check alignment with Capability Map and PRD
3. Identify top 3 weakest areas
4. For each: diagnose → fix → re-validate
5. Re-run full Post-Build Validation
6. Update PROJECT-STATE and PROGRESS-LOG

**Stop optimizing when:** Passes validation consistently, rejection rate below threshold, remaining improvements marginal, time better spent elsewhere.

### Evolution File
Every system gets `[install location]/evolution.md` tracking version metrics and changelog.

---

## From Skill to Runbook

When a system's execution pattern stabilizes — same steps every time regardless of input — generate a runbook from the skill.

**The dividing line:** Same steps every time = runbook. Different choices per input = skill only.

**Runbook candidates:** Data pipelines, multi-agent orchestration, automated maintenance.
**Not candidates:** Creative writing, interpretive analysis, strategy/planning.
**Middle ground:** Complex skills with both orchestration (runbook) and creative (skill) layers.

**Lifecycle:**
1. Build skill → 2. Use and iterate → 3. Execution stabilizes → 4. Generate runbook → 5. Skill evolves → regenerate runbook

**Good runbook criteria:** No interpretation, no decisions, resumable at any step, explicit failure handling, built-in validation.

**Rule:** Never generate a runbook from a system that hasn't been through at least one deliberate optimization pass.

---

## Dispatcher Pattern

**Any project that spawns sub-agents MUST use the Dispatcher Pattern.**

The dispatcher does NO implementation work. It:
- Reads CLAUDE.md and PROJECT-STATE
- Decomposes work into tasks
- Assigns personas matched to tasks
- Monitors thought pads for consistency
- Enforces quality gates on sub-agent output
- Preserves context window for coordination

### Structured Context Passing (Required)

Every sub-agent receives:

```
## TASK: [Name]
### PERSONA: [Name + background]
### OBJECTIVE: [One sentence]
### INPUTS: [Listed with descriptions]
### REQUIREMENTS CHECKLIST: [All items]
### CONSTRAINTS: [NEVER/ALWAYS/MAX]
### OUTPUT FORMAT: [Exact specification]
### QUALITY THRESHOLD: [STANDARD/ELEVATED/CRITICAL = 70%/85%/95%]
```

Sub-agents MUST return:
- Output in specified format
- Self-assessment with confidence score
- Issues encountered (or "None")

### Sub-Agent Depth
By default, sub-agents cannot spawn their own sub-agents. If needed, project CLAUDE.md must explicitly authorize it and define maximum depth.

---

## Thought Pads

**Location:** `[Project Folder]/thought-pads/[agent-name].md`

**What goes in:** Assumptions and why. Decisions and which was chosen. Concerns. Inconsistencies. "If X is wrong, this breaks."

**Rules:** Append-only. Timestamped. Written BEFORE decisions. Flag cross-agent dependencies.

---

## Session Management

### Starting a New Session (Existing Project)

```
1. Read project CLAUDE.md (protocol mandates)
2. Read PROJECT-STATE file (current phase, decisions, next steps)
3. Read PROGRESS-LOG.md (recent work)
4. Read any handoff documents
5. Confirm protocol compliance
6. Begin work from current phase — do NOT re-plan what's already decided
```

### Context Window Management

At 70-80% capacity, create a Handoff Document:

```
## HANDOFF DOCUMENT
**Objective:** [What we set out to do]
**Completed:** [What's done, with file paths]
**Current state:** [Where things stand]
**Blockers:** [Unresolved issues]
**Next steps:** [Exactly what to do next]
**Decisions made:** [So they're not revisited]
**Files modified:** [With descriptions]
**Requirements status:** [Complete vs. remaining]
```

Save to project folder. Update PROJECT-STATE at the same time. Do NOT attempt "one more action."

---

## Finishing

### Three End States

**Complete** — Vision achieved. Deliverables done.
**Paused** — Work intentionally stopped. May resume.
**Abandoned** — Vision no longer worth pursuing. Deliberate decision.

### Staleness Trigger
If no work logged to PROGRESS-LOG in 2 weeks and project not marked PAUSED or COMPLETE → flag for status decision (resume, pause, or abandon).

### Close-Out: Complete

1. **Vision review** — Does the finished system deliver the transformed state? AI presents evidence; project owner judges.
2. **Final validation** — Post-Build Validation on the complete system as a whole.
3. **Asset handoff** — Deploy skills/agents/runbooks to production (`~/.claude/skills/`, `~/.claude/agents/`).
4. **Lessons learned** — Written to `[Project Folder]/lessons-learned.md`.
5. **Documentation finalized** — CLAUDE.md and PROJECT-STATE marked COMPLETE.
6. **Cleanup** — Archive intermediate artifacts. Keep deliverables, lessons, infrastructure.
7. **Student packaging** (if applicable) — Per distribution protocol to `Student Resources/`.

### Close-Out: Paused

1. Update PROJECT-STATE with what's done and what remains
2. Write resumption guide
3. Mark status PAUSED with reason and expected resumption trigger
4. No cleanup — everything stays as-is

### Close-Out: Abandoned

1. Document WHY (so you don't restart and hit the same wall)
2. Extract reusable assets
3. Mark PROJECT-STATE as ABANDONED
4. Archive per Archiving protocol

---

## Archiving

### Where Projects Go
All completed and abandoned projects move to **Archived-Projects** vault. Complete project folder, unchanged.

### Archive Index
Master index in BOTH locations:
- `Archived-Projects/PROJECT-ARCHIVE-INDEX.md` (authoritative)
- `Active-Brain/00 Projects/PROJECT-ARCHIVE-INDEX.md` (mirror)

Per project: name, status, archive date, path, vision summary, deliverable locations, lessons summary.

### Tombstone Files
Small pointer stays at original location in Active-Brain:

```
# [Project Name] — Archived
**Status:** COMPLETE (or ABANDONED)
**Archived:** [date]
**Archive location:** Archived-Projects/[folder name]
**Deliverables deployed to:** [paths]
**Lessons learned:** [2-3 sentences]
```

### When to Archive
ALL must be true:
1. All phases complete and validated
2. Independent audits complete
3. Deliverables packaged
4. Assets deployed to production
5. Finishing close-out complete
6. No remaining work

---

## Authorization Manifest

Every project gets `authorization.md` at creation:

```markdown
# PROJECT AUTHORIZATION: [Project Name]

## File Access
- Read any file in the Obsidian vault: AUTHORIZED
- Read any file in ~/.claude/: AUTHORIZED
- Write to this project folder: AUTHORIZED
- Write to ~/.claude/skills/ and ~/.claude/agents/: AUTHORIZED

## Tool Access
- Bash commands (non-destructive): AUTHORIZED
- Web fetch / web search: AUTHORIZED
- MCP servers (Slack, Google Drive, etc.): AUTHORIZED

## Operations
- Create files and folders within project scope: AUTHORIZED
- Install dependencies: AUTHORIZED
- Spawn sub-agents: AUTHORIZED
- Run scripts: AUTHORIZED

## Boundaries (STOP and ask)
- Deleting files outside this project folder
- Pushing to git remotes
- Sending messages (Slack, email, iMessage)
- Spending money (API calls with cost, purchases)
- Modifying CLAUDE.md files outside this project
```

---

## Agentic Operations Principles

1. **Think in blast radius** — estimate by files touched, not perceived difficulty
2. **Interrupt and steer** — check agents mid-task, don't wait and hope
3. **Minimize context tax** — prefer lean tools over heavy integrations
4. **Use screenshots** — visual context beats text descriptions
5. **Instruction files evolve from failures** — add rules when things go wrong, not preemptively
6. **Better models need shorter prompts** — start brief, add detail only if needed
7. **Cleanup is low-focus work** — reserve maintenance for low-energy time
8. **Intuition compounds through reps** — practice beats frameworks

---

## Technical Design Documents

For systems that must run reliably for months without oversight, add a TDD before building. See `references/tdd-template.md`.

**Use when:** Automated/unattended, failure causes disruption, external service connections, won't remember how it works in 3 months.
**Skip when:** One-time scripts, throwaway prototypes, rebuildable in under 30 minutes.

---

## The Three Questions Protocol

Before building anything, answer these questions in order. Never skip to a lower question without answering the ones above it.

| # | Question | Level | When |
|---|----------|-------|------|
| 1 | **What's the system?** | Architecture | Once per major initiative; revisit when strategy shifts |
| 2 | **What must it do?** | Capability | For each system/component; revisit when capability gaps emerge |
| 3 | **How exactly?** | Specification | Before every build session |

**Question 1 — What's the system?** Map the system of systems. What connects to what? What flows between them? What's the build sequence? If you can't draw this, you're not ready to build.

**Question 2 — What must it do?** State capabilities as jobs/outcomes, not features. True capabilities can be implemented multiple ways. Test: "Can I imagine 3 different implementations of this?" If yes = capability. If no = feature — go up a level.

**Question 3 — How exactly?** Write a PRD complete enough that someone could build it without asking clarifying questions. If the AI needs to ask, the PRD isn't done.

**Hierarchy of errors:** Getting Q1 wrong = most expensive (systems don't connect, everything is rework). Getting Q2 wrong = expensive (features don't add up to capabilities). Getting Q3 wrong = annoying but recoverable (iterate).

Most people spend 90% of attention on Q3. Invert this.

---

## Full Workflow: New Project

```
 1. Create project folder
 2. Create CLAUDE.md (protocol mandates, quality gates, sub-agent rules)
 3. Create PROJECT-STATE file (task graph, operating mode, decisions)
 4. Create PROGRESS-LOG.md (empty)
 5. Create authorization manifest
 6. Create thought-pads subfolder
 7. Write Vision Document → validate → independent audit
 8. Create Architecture Map → validate → independent audit
 9. Create Capability Map → validate → independent audit
10. Create Phased Delivery Plan → validate → independent audit
11. Prototype (if AI tools) → validate
12. Write PRD for Phase 1 → validate → translation audit
13. Build with Execution Checklist
14. Run Post-Build Validation
15. [If client-facing] Delivery Operations → End-to-End Test → Ready to Ship checklist
16. Update CLAUDE.md, PROJECT-STATE, PROGRESS-LOG
17. Repeat from step 11 for next phase
18. When all phases complete → Finishing protocol
19. When close-out complete → Archiving protocol
```

---

## Reference Documents

All source methodology documents live in `references/`:

| File | Contents |
|------|----------|
| `strategic-builder-source.md` | Full source methodology (50K, complete detail) |
| `three-questions-protocol.md` | Q1/Q2/Q3 framework with examples and common mistakes |
| `delivery-gap-and-prevention.md` | Postmortem: how delivery was missed; full prevention strategy |
| `operations-protocol-missing-layer.md` | 7 distinctions discovered from 232-unit pipeline failure |
| `skill-architecture-patterns.md` | 10-layer skill quality model; patterns to adopt when project output is a skill |
| `agentic-operations-principles.md` | Expanded agentic ops principles |
| `runbooks.md` | Full runbook generation guidelines |
| `technical-design-documents.md` | When and how to write TDDs |
| `prd-template.md` | PRD template |
| `tdd-template.md` | TDD template |
