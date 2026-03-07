# Project Operations Protocol — The Missing Layer

## What This Is

This document captures operational distinctions that are **missing from the Strategic Builder Methodology** — discovered through a 3+ session failure where a major project (232-unit Distinction System) ran without proper protocol enforcement despite those protocols existing.

The distinctions below are not theoretical. They come from watching what actually broke when these rules weren't followed.

---

## The Problem Statement

The Strategic Builder Methodology covers:
- WHAT to build (Translation Stack)
- HOW to think about building (Three Questions Protocol)
- HOW to specify (PRDs, Validation Gates)
- HOW to operate daily (Agentic Operations Principles)

It does NOT cover:
- HOW a project enforces its own protocols across sessions
- HOW a new session knows what protocols to follow
- HOW to prevent protocol drift when context windows reset

This is the gap between having good protocols and actually following them. Three separate documents existed (Dispatcher/Manager, Core Agent Operations, Agentic Ops Principles), all describing correct behavior. None of them were loaded or enforced during the actual work. The result: 232 files expanded, criticized, and revised — all without consumption receipts, requirements checklists, structured context passing, or project state management.

The work got done. But it was fragile. Every session handoff lost state. Every context window crash meant re-explaining everything. Every sub-agent received ad-hoc prompts instead of structured context. And Rich had to manually stop the pipeline and ask "are you even running the protocols?" — which should never happen.

---

## Distinction 1: Project-Level CLAUDE.md vs. Global CLAUDE.md

**What most people have:** A global `~/.claude/CLAUDE.md` that sets general behavior for all sessions.

**What's missing:** A project-level CLAUDE.md in every project folder that enforces project-specific protocols, quality gates, and operating mode.

**Why this matters:** Global CLAUDE.md sets defaults. But every project has specific requirements — which protocols to load, which quality gates to enforce, which personas to use, where to log progress. Without a project-level CLAUDE.md, each new session starts cold and defaults to generic behavior.

**The rule (add to methodology):**

> **Every project folder gets a CLAUDE.md at creation (Step 1, not Step 12).**
>
> This CLAUDE.md must contain:
> 1. **Protocol mandates** — which operational protocols this project requires (Dispatcher/Manager, Core Agent Operations, etc.)
> 2. **Project state pointer** — path to PROJECT-STATE file (mandatory first-read)
> 3. **Quality gate definitions** — project-specific thresholds and scoring criteria
> 4. **Sub-agent spawning rules** — persona assignments, context passing template, quality thresholds
> 5. **Progress logging location** — where to write persistent logs
> 6. **Session startup checklist** — what must happen before any work begins

**The current methodology says** (line 357): "Update CLAUDE.md" — as Step 12, after the build is done. This is backwards. The CLAUDE.md should be the FIRST file created, not the last one updated. It's the enforcement mechanism, not the documentation.

---

## Distinction 2: Project State File vs. Handoff Document

**What exists:** Handoff documents created at context window limits (Core Agent Operations, Section 1).

**What's missing:** A persistent PROJECT-STATE file that lives for the lifetime of the project and is updated every session.

**Why this matters:** Handoff documents are emergency artifacts — created when a session is about to die. They capture the state at one moment. A PROJECT-STATE file is a living document that evolves with the project, tracking:
- Complete task graph (all phases, dependencies, status)
- Operating mode requirements
- Key decisions (so they're not revisited)
- Current phase and next steps
- All file locations
- Sub-agent results and quality scores

**The distinction:**
- **Handoff document** = snapshot of a dying session (emergency)
- **PROJECT-STATE file** = living single source of truth for the project (infrastructure)

**The rule (add to methodology):**

> **Every project maintains a PROJECT-STATE file that is:**
> 1. Created at project start (alongside CLAUDE.md)
> 2. The mandatory first-read for any session entering the project
> 3. Updated at the end of every session (not just at handoff)
> 4. The single source of truth for what's done, what's next, and what decisions were made
> 5. Written in a format that a cold-start session can read and immediately resume work

The Strategic Builder Methodology mentions state implicitly (the Execution Checklist, the Validation Results) but never creates a single persistent document that tracks the whole project across sessions.

---

## Distinction 3: Protocol Mandate vs. Protocol Availability

**What exists:** Dispatcher/Manager agent definition at `~/.claude/agents/dispatcher-manager/AGENT.md`. Core Agent Operations at `~/.claude/CLAUDE.md` (global). Both are available.

**What's missing:** A mechanism that MANDATES their use for a specific project.

**Why this matters:** Available is not the same as loaded. The Dispatcher/Manager protocol existed for months. The Core Agent Operations protocols were in the global CLAUDE.md. Neither was followed during the Distinction System project because nothing forced the session to read them, acknowledge them, and prove compliance.

**The distinction:**
- **Available** = the document exists somewhere the agent could find it
- **Mandated** = the project's CLAUDE.md explicitly requires loading and compliance verification

**The rule (add to methodology):**

> **For any project using sub-agents, the project CLAUDE.md must mandate:**
> 1. "Read `~/.claude/agents/dispatcher-manager/AGENT.md` — operate in Dispatcher/Manager mode"
> 2. "Follow Core Agent Operations protocols (Sections 1-13 of the installed skill)"
> 3. "Verify compliance before starting work" (produce a brief protocol compliance confirmation)

The Agentic Operations Principles document (already in this folder) says "The Dispatcher Pattern" is for "projects with more than one stream of work." This needs to be stronger: any project that spawns sub-agents MUST use the Dispatcher Pattern. Not "should." MUST.

---

## Distinction 4: Session Startup Protocol vs. "Just Continue"

**What exists:** "Starting a New Project" workflow (Strategic Builder Methodology, lines 345-358).

**What's missing:** "Starting a New Session in an Existing Project" protocol.

**Why this matters:** Most sessions are continuations, not starts. The methodology has a clear 13-step workflow for starting a project. It has nothing for what happens when a new session enters an existing project at Phase 8 of 10.

**The distinction:**
- **New Project** = empty folder, Vision to Implementation
- **Continuing Session** = populated folder, resume from last known state

**The rule (add to methodology):**

> **Session Startup Protocol (for existing projects):**
> 1. Read the project CLAUDE.md (protocol mandates)
> 2. Read the PROJECT-STATE file (current phase, next steps, decisions made)
> 3. Verify protocol compliance (confirm operating mode)
> 4. Read any handoff documents from prior sessions
> 5. Begin work from the current phase — do not re-plan or re-discover what's already decided

This sounds obvious. It wasn't happening. Three sessions in a row entered this project without reading the PROJECT-STATE.md, without loading Dispatcher/Manager mode, and without verifying Core Agent Operations compliance.

---

## Distinction 5: Structured Context Passing vs. Ad-Hoc Prompting

**What exists:** The Dispatcher/Manager agent describes structured context passing (lines 220-295 of AGENT.md) with a specific format.

**What was happening:** Sub-agents received raw prompts like "Evaluate this file and score it." No persona. No structured task definition. No output schema. No quality threshold.

**Why this matters:** Ad-hoc prompts produce inconsistent results. Structured context produces consistent results. When 232 sub-agents each receive slightly different instructions, the output quality varies wildly and the manager can't compare results meaningfully.

**The distinction:**
- **Ad-hoc prompt** = "Do this thing, figure out the details yourself"
- **Structured context** = Task definition + Persona + Constraints + Quality threshold + Output schema

**The rule (add to methodology):**

> **Every sub-agent spawn must include (minimum):**
> ```markdown
> ## TASK: [Name]
> ### PERSONA: [Name + background from persona library]
> ### OBJECTIVE: [One sentence]
> ### INPUTS: [Listed with descriptions]
> ### REQUIREMENTS CHECKLIST: [All items]
> ### CONSTRAINTS: [NEVER/ALWAYS/MAX]
> ### OUTPUT FORMAT: [Exact specification]
> ### QUALITY THRESHOLD: [STANDARD/ELEVATED/CRITICAL = 70%/85%/95%]
> ```
>
> Sub-agents MUST return:
> - Output in the specified format
> - Self-assessment with confidence score
> - Issues encountered (or "None")

The current methodology mentions "Sub-agents receive a persona, task scope, authorization, relevant docs, and a thought pad path" (line 282). This needs to be a non-negotiable template, not a suggestion.

---

## Distinction 6: Quality Gate Enforcement vs. Quality Gate Definition

**What exists:** Validation Gates in the methodology (lines 65-116). Quality thresholds in Dispatcher/Manager (STANDARD/ELEVATED/CRITICAL). SHIP threshold for distinctions (8.0+).

**What was happening:** Files were scored and labeled SHIP or REVISE, but there was no formal gate where the manager:
1. Checked the score against the threshold
2. Logged PASS or FAIL
3. Triggered the retry protocol on FAIL
4. Escalated to user after 3 retries

**The distinction:**
- **Quality gate defined** = "The threshold is 8.0+"
- **Quality gate enforced** = "Score was 7.75. FAIL. Retry 1 of 3. Spawning revision agent with specific corrections."

**The rule (add to methodology):**

> **Quality gates are checkpoints, not labels.** When a deliverable hits a quality gate:
> 1. Score or evaluate against threshold
> 2. Log PASS or FAIL explicitly
> 3. If FAIL: spawn corrective action with SPECIFIC failure notes (not "do better")
> 4. Re-evaluate after correction
> 5. Max 3 retries, then escalate to user with options
> 6. NEVER proceed past a failed quality gate without logging the failure and the decision

---

## Distinction 7: Progress Logging to Files vs. Progress in Chat

**What exists:** Core Agent Operations Section 5 (Persistent Progress Logging). The rule is clear: "Write progress to persistent location, not just chat."

**What was happening:** All progress was tracked in chat context. When sessions ended or context compressed, progress tracking was lost. Three sessions of work with zero persistent log files.

**The distinction:**
- **Chat progress** = visible during the session, gone when context compresses
- **File progress** = survives across sessions, enables cold-start recovery

**The rule (already exists, needs enforcement):**

> **After every significant unit of work, append to the project progress log:**
> ```markdown
> ## [Timestamp]
> **Phase:** [Current phase]
> **Completed:** [What was finished]
> **Modified:** [Files changed]
> **Sub-agents:** [Spawned, completed, scores]
> **Quality gates:** [PASS/FAIL with scores]
> **Next:** [Immediate next action]
> ```
>
> Location: `[project folder]/PROGRESS-LOG.md`

This is the difference between protocol existence and protocol enforcement. The rule existed. It wasn't followed because nothing in the project's CLAUDE.md mandated it.

---

## Summary: What Changes in the Methodology

### Current Workflow: Starting a New Project (REVISED)

```
1. Create project folder
2. → NEW: Create CLAUDE.md (protocol mandates, quality gates, sub-agent rules)
3. → NEW: Create PROJECT-STATE file (task graph, operating mode, decisions log)
4. → NEW: Create PROGRESS-LOG.md (empty, ready for session entries)
5. Create authorization manifest
6. Create thought-pads subfolder
7. Write Vision Document → validate
8. Create System Architecture Map → validate
9. Create Capability Map → validate
10. Create Phased Delivery Plan → validate
11. Prototype (if AI tools) → validate
12. Write PRD for Phase 1 → validate
13. Build with Execution Checklist
14. Run Post-Build Validation
15. Update CLAUDE.md, PROJECT-STATE, and PROGRESS-LOG
16. Repeat from step 11 for next phase
```

**What moved:** CLAUDE.md creation moved from Step 12 to Step 2. Three new artifacts added at project start.

### NEW Workflow: Starting a New Session (Existing Project)

```
1. Read project CLAUDE.md (protocol mandates)
2. Read PROJECT-STATE file (current phase, decisions, next steps)
3. Read PROGRESS-LOG.md (recent work)
4. Read any handoff documents
5. Produce protocol compliance confirmation:
   - Dispatcher/Manager mode: LOADED
   - Core Agent Operations: LOADED
   - Quality gates: [list with thresholds]
   - Sub-agent template: READY
6. Begin work from current phase
```

### NEW Requirements for Project CLAUDE.md

Every project CLAUDE.md must contain:
1. Protocol mandates (which protocols are required)
2. PROJECT-STATE pointer (mandatory first-read)
3. Quality gate definitions (project-specific thresholds)
4. Sub-agent spawning template
5. Progress logging location
6. Session startup checklist

### NEW Requirements for Sub-Agent Spawning

Every sub-agent must receive structured context (not ad-hoc prompts):
- Task definition
- Persona assignment
- Constraints
- Quality threshold
- Output schema

---

## Why These Distinctions Matter

Every one of these gaps was invisible until the system ran at scale. A 17-unit pilot project worked fine without them because one session could hold the whole project in context. A 232-unit pipeline across 3+ sessions broke because:

1. Each new session started cold (no session startup protocol)
2. Protocols existed but weren't mandated (available vs. enforced)
3. State was tracked in chat, not files (lost on every context reset)
4. Sub-agents received ad-hoc prompts (inconsistent quality)
5. Quality gates were defined but not enforced (no retry protocol)
6. CLAUDE.md was an afterthought, not a session controller (created last, not first)

**The meta-lesson:** Protocols that depend on the agent "remembering" to follow them will fail at scale. Protocols that are enforced by the project's own infrastructure (CLAUDE.md, PROJECT-STATE, session startup checklist) survive because the agent reads them automatically.

---

*Discovered: February 8, 2026*
*Source: Distinction System Pipeline — 232 teaching units across 3+ sessions*
*Status: These rules should be incorporated into the Strategic Builder Methodology*
