# The Strategic Builder Methodology

## For Entrepreneurs Building Business Systems with AI

---

## What This Is

A complete methodology for strategic entrepreneurs who build business systems using AI. It answers the question: **How does someone who thinks strategically -- not a coder, but a builder -- approach AI-assisted system development?**

This methodology was developed through practice, refined through failure, and formalized into a repeatable system. It bridges the gap between strategic thinking and technical execution.

It covers two things most methodologies treat separately:

1. **What to build and in what order** — the Translation Stack, from Vision through Validation
2. **How to enforce discipline across sessions, agents, and context windows** — the operational infrastructure that prevents projects from drifting off protocol when you're not watching

These aren't separate concerns. The second problem only becomes visible when you run the first at scale. A 17-unit project survives on memory alone. A 232-unit pipeline across multiple sessions does not.

---

## The Core Insight

Between your vision and a working system, there are multiple levels of translation. Most people see only the top and bottom -- Vision and Implementation -- and try to jump between them.

This is why AI-assisted building feels inconsistent. The AI is being asked to do translation work it wasn't designed for.

The solution: Make the invisible levels visible. Document each level. Move through them in sequence. Validate each level before proceeding to the next.

---

## The Translation Stack

| Level | What Lives Here | The Question It Answers | Document |
|-------|----------------|------------------------|----------|
| **Vision** | The transformed state | "What does the world look like when this exists?" | Vision Document |
| **Architecture** | The system of systems | "How do the pieces relate to each other?" | System Architecture Map |
| **Capability** | What each piece does | "What jobs does this component perform?" | Capability Map |
| **Phased Delivery** | What to build first | "What's the minimum that solves the core problem?" | Phased Delivery Plan |
| **Prototyping** | What actually works | "Does this approach hold up against real inputs?" | Prototype Notes |
| **Specification** | How it performs the job | "What exactly must be true for this to work?" | PRD |
| **Implementation** | The working system | "How is it built?" | Code + Execution Checklist |
| **Validation** | Proof it works | "Does it perform reliably with real-world inputs?" | Validation Results |

Each level translates the one above it into something more concrete. Skip a level, and you're asking the next level down to do translation work it isn't designed for.

**Note:** Prototyping applies when building AI tools (skills, agents, workflows). For non-AI builds, move directly from Phased Delivery to Specification.

**Rule:** Never skip a level. Each level translates the one above it.

---

## The Leverage Insight

Each level up the stack has more leverage than the level below it:

- A change at Validation affects one build
- A change at Implementation affects one feature
- A change at Specification affects one capability
- A change at Capability affects one system
- A change at Architecture affects multiple systems
- A change at Vision affects everything

This is why getting Vision right matters more than getting code right. It's why an hour spent on Architecture saves ten hours building the wrong thing.

Strategic entrepreneurs operate at the highest-leverage levels. Technicians operate at the lowest. Your job is the top three levels (Vision, Architecture, Capability). Everything below that can be handled by AI -- but only if you've done your job first.

---

## The Three Questions Protocol

| Order | Question | When Asked |
|-------|----------|------------|
| 1 | **What's the system?** | Once at start; when strategy shifts |
| 2 | **What must it do?** | For each major component |
| 3 | **How exactly?** | Before each build session |

**Rule:** Don't answer Question 3 until you've answered Questions 1 and 2.

These questions map directly to the Translation Stack:
- Question 1 = Architecture level
- Question 2 = Capability level
- Question 3 = Prototyping + Specification levels

---

## The Feedback Loop

The Translation Stack is presented top-down, but real building is iterative. When working at any level, if you discover the level above is wrong:

1. **STOP** current work
2. **Go back up** to the broken level
3. **Fix** the higher-level document
4. **Return down** the stack and resume

Example: Writing a PRD reveals a missing capability. Stop the PRD. Update the Capability Map. Then resume the PRD.

Never plow forward with a broken higher level. The cost compounds downward -- an error in Architecture cascades through every Capability, every PRD, every build.

---

## Project Infrastructure

Before building anything, a project needs infrastructure -- files that enforce protocols, track state, and ensure that any session entering the project knows exactly what to do.

This infrastructure is created at the START of a project, not at the end. The enforcement mechanism comes first. The work follows.

### The Project CLAUDE.md

Every project folder gets a CLAUDE.md at creation. This is not documentation about the project -- it is the session controller. Any AI session that enters the folder reads this file automatically and operates under its rules.

A project CLAUDE.md must contain:

1. **Protocol mandates** — which operational protocols this project requires
2. **Required reads at session start** — PROJECT-STATE, PROGRESS-LOG, any handoff documents
3. **Quality gate definitions** — project-specific thresholds and what they apply to
4. **Sub-agent rules** — persona assignments, structured context template, quality thresholds, depth limits (can sub-agents spawn their own sub-agents?)
5. **Progress logging location and frequency** — where and how often to write persistent logs
6. **Key decisions log** — decisions that have been made and should not be revisited

The CLAUDE.md is the first file created, not the last file updated. It exists before the Vision Document. It exists before any work begins.

### The PROJECT-STATE File

Every project maintains a living PROJECT-STATE file that tracks the project across its entire lifetime. It is:

- Created at project start (alongside the CLAUDE.md)
- The mandatory first-read for any session entering the project
- Updated at the end of every work session
- The single source of truth for what's done, what's next, and what decisions were made
- Written so that a cold-start session can read it and immediately resume work

What it tracks:
- Complete task graph (all phases, dependencies, status)
- Current phase and immediate next steps
- Key decisions made (so they're not revisited)
- All file locations that matter
- Sub-agent results and quality scores (if applicable)

**The distinction from a Handoff Document:** A Handoff Document is an emergency snapshot created when a session is about to run out of context. It captures one moment. The PROJECT-STATE file is living infrastructure that evolves with the project. Both serve different purposes; both are necessary.

### The PROGRESS-LOG

A persistent file that survives across sessions. After every significant unit of work, append:

```
## [Timestamp]
**Phase:** [Current phase]
**Completed:** [What was finished]
**Modified:** [Files changed]
**Requirements addressed:** [Which ones]
**Quality gates:** [PASS/FAIL with scores, if applicable]
**Next:** [Immediate next action]
```

Progress tracked only in chat context is progress that vanishes when the context window compresses. Progress written to files survives indefinitely.

### The Authorization Manifest

A pre-authorization file created at project start that answers all permission questions upfront. Agents read it before doing work. Actions marked AUTHORIZED proceed without asking. Only BOUNDARY items require stopping.

This eliminates the pattern where agents block on permission requests while you're away, hanging the entire project until you return.

### Thought Pads

Every agent working on the project maintains a reasoning journal — a persistent file that captures assumptions, decisions, concerns, and cross-agent dependencies as they work.

What goes in:
- Assumptions being made and why
- Decisions considered and which was chosen
- Concerns or risks spotted
- Things that seem off or inconsistent
- "If X turns out to be wrong, this whole approach breaks"

Thought pads are append-only, timestamped, written BEFORE decisions (not after). They provide visibility into agent reasoning so mistakes can be caught before they become output errors.

---

## Validation Gates

Every level of the Translation Stack has a validation gate -- criteria that must ALL pass before moving to the next level. This is where most errors get caught. Errors at higher levels are exponentially more costly than errors at lower levels.

**Quality gates are checkpoints, not labels.** They are enforced, not just defined. When a deliverable hits a quality gate:

1. Evaluate against the threshold criteria
2. Log PASS or FAIL explicitly
3. If FAIL: spawn corrective action with SPECIFIC failure notes (not "do better")
4. Re-evaluate after correction
5. Maximum 3 retries, then escalate to the human with options
6. NEVER proceed past a failed quality gate without logging the failure and the decision

The difference between "defined" and "enforced" is the difference between knowing the speed limit and having a cop on the highway.

### Independent Audits

Validation gates are self-assessed — the builder checks their own work against criteria. That catches obvious misses, but builders are blind to their own errors. The same way a writer can't proofread their own copy, a builder can't reliably audit their own translation from one level to the next.

For high-blast-radius levels, an independent audit is required BEFORE proceeding. "Independent" means a separate agent, a separate session, or a critic — something that didn't do the work and has no stake in it being good. Its only job is to find what's wrong.

**Audit in proportion to blast radius:**

| Level | Audit Requirement | Why |
|---|---|---|
| **Vision** | Full independent audit | One page. 2 minutes to check. Getting it wrong wastes the entire project. |
| **Architecture** | Full independent audit | Short document. An error here cascades through every system built under it. |
| **Capability** | Full independent audit | Missing or misaligned capabilities mean building things that shouldn't exist or not building things that should. |
| **Phased Delivery** | Full independent audit | Wrong sequencing means building on a foundation that doesn't exist yet. |
| **PRD** | Translation audit | The most error-prone translation in the stack (WHAT → HOW). Verify the PRD actually implements the capability it claims to. |
| **Prototyping** | No audit | Exploratory by nature. Auditing exploration defeats its purpose. |
| **Build** | Existing validation sufficient | Post-Build Validation + Execution Checklist with evidence already forces proof. |

**What the auditor checks at each level:**

- **Vision audit:** Does this describe a transformed state, not features? Could multiple completely different architectures achieve it? Is it achievable with current resources?
- **Architecture audit:** Does this architecture actually achieve the Vision? Are ALL dependencies explicit? Could you explain it in 2 minutes?
- **Capability audit:** Does every capability trace back to the Architecture? Are there capabilities with no parent system? Are there architectural components with no capabilities?
- **Phased Delivery audit:** Does Phase 1 genuinely solve a complete problem? Could you stop after Phase 1 and have value? Does the sequencing follow value, not technical layers?
- **PRD audit:** Does this PRD implement the capability it claims to — not a different capability, not a subset, not a superset? Could an AI build from this without asking clarifying questions?

**The rule:** Nothing at Vision, Architecture, Capability, or Phased Delivery proceeds to the next level without an independent audit confirming it passes the gate. The builder's self-assessment is step one. The independent audit is step two. Both must pass.

### Vision Gate
- Describes a transformed state, not features
- Multiple completely different architectures could achieve this vision
- Someone can understand the goal without knowing the implementation
- Short -- one page maximum
- Realistic -- achievable with current tools and team

### Architecture Gate
- Someone can see how all pieces fit together without knowing internals
- All dependencies are explicit
- No system exists in isolation
- Every system can be built and maintained with current resources
- The total number of systems is the minimum needed
- You could explain this architecture in 2 minutes

### Capability Gate
- Each capability is stated as a job/outcome, not a feature
- For each capability, you can imagine 3+ different implementations
- Inputs and outputs are defined
- Each capability can be built with tools that exist today
- No capability requires "magic" -- tools not yet built, AI that doesn't exist
- The total number of capabilities is the minimum needed

### Phased Delivery Gate
- Phase 1 solves a real, complete problem on its own
- You could stop after Phase 1 and have something valuable
- Phase 1 can be built in days, not weeks
- No phase depends on a later phase
- Phases are sequenced by value delivered, not technical layers

### Prototyping Gate (AI Tools Only)
- At least 3 test scenarios run with real or realistic inputs
- Output format validated against actual results, not assumptions
- Edge cases discovered during prototyping are documented
- You can articulate what changed between initial assumptions and what prototyping revealed

### PRD Gate
- All 8 components present (Objective, Scope, Requirements, Acceptance Criteria, Integration Points, Edge Cases, Constraints, Out of Scope)
- Every requirement is testable
- An AI could build this without asking clarifying questions
- Estimated build time is hours, not days
- Includes built-in optimization requirements (usage tracking, performance scoring, pattern detection, feedback loops, version history, degradation detection — see Optimization section)

### Post-Build Validation Gate
- All happy path scenarios pass
- Edge cases handled gracefully (no silent failures)
- Failure modes produce explicit errors, not garbage
- Consistency across repeated runs is acceptable
- At least one real-world input produces usable output

---

## Phased Delivery

Between the Capability Map and the specification sits Phased Delivery Planning. It answers: "We know everything this system needs to do -- what do we build first?"

**The Process:**
1. Identify the single most important problem (the core problem, not the full vision)
2. Find the minimum capability set that solves that core problem -- that's Phase 1
3. Group remaining capabilities into phases by dependencies, value, and effort
4. Validate: each phase works independently, you could stop after any phase and have value

**The Principle:** Working software that does three things well beats documented software that will eventually do fourteen things.

---

## Prototyping: Discovery Before Specification

When building AI tools (skills, agents, automated workflows), there's a step between knowing what the system should do and writing the formal specification: **prototyping in conversation.**

Before writing the PRD, work through the capability manually with AI in a conversational session. Run 3-5 test scenarios with real or realistic inputs. This is reconnaissance -- you're discovering what works before committing to a spec.

For each test, pay attention to:
- Where the AI needed more context than you expected
- What output format actually worked vs. what you assumed would work
- What broke, confused, or required manual fixing
- What questions revealed ambiguity in your own thinking

PRDs written from theory produce tools that work in theory. PRDs written after prototyping produce tools that work in practice. The time spent prototyping typically saves significant rework after the build.

**When to prototype:** Any time the build target is an AI tool. Skip for non-AI builds (static sites, data pipelines, documentation).

---

## The PRD: Specification That AI Can Execute

A complete PRD has eight components:

1. **Objective** -- What capability is this implementing? Links to Capability Map.
2. **Scope** -- What's in AND what's explicitly out. Both equally important.
3. **Requirements** -- Specific, testable statements. No vague language.
4. **Acceptance Criteria** -- Verifiable checkboxes. How you prove each requirement is met.
5. **Integration Points** -- Inputs, outputs, dependencies. What connects to what.
6. **Edge Cases** -- What happens in unusual situations. Specified behavior for each.
7. **Constraints** -- Technical, business, practical limitations.
8. **Out of Scope** -- Explicit exclusions with reasons.

**The Test:** Could an AI read this PRD and build exactly what you imagined without asking any clarifying questions? If they need to ask "what do you mean by..." then the PRD isn't specific enough.

---

## The Execution Checklist

The gap between "understood the spec" and "built to spec" is where most projects fail. The Execution Checklist closes this gap.

Before building, transform PRD requirements into a checklist with an evidence column:

| # | Requirement | Status | Evidence |
|---|-------------|--------|----------|
| 1 | [Requirement from PRD] | [ ] | |
| 2 | [Requirement from PRD] | [ ] | |

**Rules:**
- Mark each requirement AS you implement it, not after
- Evidence column must contain specific file path, line number, or output proof
- "Done" is not valid evidence
- If blocked, mark BLOCKED with reason
- The completed checklist is a required deliverable

---

## Post-Build Validation

The Execution Checklist proves you built what the PRD specified. Post-Build Validation proves what you built actually works in practice. These are different things.

After completing the build, test with real scenarios:

| Test | What You're Checking |
|------|---------------------|
| **Happy path** (3 scenarios) | Does it work with clean, expected inputs? |
| **Edge cases** (3 scenarios) | Missing data, unusual input, ambiguous requests -- does it handle them gracefully? |
| **Failure modes** (2 scenarios) | Contradictory inputs, impossible constraints -- does it fail explicitly or produce garbage silently? |
| **Consistency** (same input 3x) | Does it produce similar-quality outputs each time? |
| **Real-world input** (1-2 scenarios) | Test with actual data from the intended use case |

If any test fails, fix the issue and re-run. Do not ship failing systems.

---

## Optimization

Most AI tools are static -- they work the same on day 100 as day 1. This leaves enormous value on the table. Every system you build MUST include mechanisms for self-improvement. This is not optional. It is a build requirement, enforced at the PRD Gate.

The principle: **Build tools that get smarter with use.** A system that improves 2% per week is twice as good after a year. This compounding is one of the biggest advantages of building persistent AI systems rather than running one-off prompts.

### Built-In Optimization (Required in Every System)

Every system must include, at minimum:

1. **Usage tracking** — What went in, what came out, and whether the output was used as-is, edited, or rejected. Without this data, optimization is guesswork.
2. **Performance scoring** — Automatic quality assessment against the system's own criteria. The system must be able to evaluate its own output, not just produce it.
3. **Pattern detection triggers** — Every 10 uses (or weekly, whichever comes first), the system surfaces what's working and what's degrading. This is not a manual review — it's built into the system.
4. **Feedback loops** — Output quality feeds back into instruction refinement. Minor improvements (tighter constraints, better phrasing) are applied automatically. Structural changes (new phases, different output formats) are flagged for review.
5. **Version history** — Every improvement is versioned so it can be rolled back if it makes things worse.
6. **Degradation detection** — Alert when output quality drops below a threshold. Systems that degrade silently are worse than systems that never improve, because they erode trust without warning.

This is a significant amount of infrastructure. A dedicated optimization agent — a skill that knows all the patterns for making systems self-improving — should be invoked as a standard step in the build process rather than requiring each builder to figure it out from scratch every time.

### Failure-Driven Optimization (Reactive)

When something breaks or produces bad output: fix it, then add a rule so it doesn't happen again. Instruction files evolve from failures, not from preemptive rulemaking. Every failure that isn't captured in a rule is a failure waiting to repeat.

### Deliberate Optimization (Proactive)

Beyond built-in tracking and failure response, there are moments when you intentionally sit down and ask: what could be better about this system?

**Triggers for a deliberate optimization pass:**

| Trigger | Why |
|---|---|
| **After 10 real-world uses** | Enough data to see patterns. Early enough to catch design issues before they compound. |
| **Output rejection rate exceeds ~30%** | If you're editing or rejecting more than a third of outputs, the system needs structural work, not incremental fixes. |
| **After any significant failure** | Not just a patch — a structured look at what else might be wrong. |
| **Before generating a runbook** | You want to optimize BEFORE you lock execution down. Never runbook a system you haven't deliberately optimized. |

**What a deliberate optimization pass looks like:**

1. Review usage data from built-in tracking
2. Check alignment — does the system still match its Capability Map and PRD, or has it drifted?
3. Identify the top 3 weakest areas in output quality
4. For each: diagnose root cause → propose fix → implement → re-validate
5. Re-run the full Post-Build Validation suite
6. Update PROJECT-STATE and PROGRESS-LOG

**When to stop optimizing:**

A system is "good enough" when the next improvement would cost more time than it saves. Concretely:

- It passes Post-Build Validation consistently
- Output rejection rate is below threshold
- Remaining improvements are marginal (2% gains, not 20%)
- Your time is better spent building the next thing

You can always re-enter the optimization phase when triggers fire again. Optimization is a phase you revisit, not a one-time event.

### The Full Lifecycle

With optimization in place, the complete lifecycle of a system is:

```
Build → Use → Optimize → When stable, generate Runbook
                ↑                          |
                └──── triggers fire ───────┘
```

The optimization phase sits between "this system works" and "this system is ready for production lockdown." A runbook should never be generated from a system that hasn't been through at least one deliberate optimization pass.

---

## From Skill to Runbook

Skills are powerful. They embed methodology, frameworks, and patterns into reusable instructions. But skills have a vulnerability: they require interpretation. When a skill says "invoke the deutsch methodology with the brief," the AI must decide how to invoke it, what to pass, what to do with the output, and what to do when something fails.

Most of the time, interpretation works fine. But when execution patterns stabilize — when the steps are the same every time regardless of input — interpretation becomes unnecessary risk. This is when a skill produces a runbook.

### What a Runbook Is

A runbook is a linear execution script generated FROM a skill. It removes all interpretation:

| Skill Says | Runbook Says |
|---|---|
| "Invoke the deutsch skill" | "Use Task tool with subagent_type='general-purpose', prompt=[exact prompt]" |
| "Save the draft" | "Write to [exact file path] with filename [exact pattern]" |
| "If the critic scores below threshold" | "If score < 8.0, retry with [exact modified prompt]. Max 3 retries. On 3rd failure, log to [exact path] and continue to step 7." |

### The Relationship

- **Skill** = the source of truth. Methodology, decision logic, frameworks, the "why" and "what." Always exists. Continues to evolve.
- **Runbook** = a deployment artifact generated from the skill. Exact commands, zero interpretation, the "how precisely." Exists only when execution has stabilized.

The skill never goes away. The runbook never replaces it. When the skill evolves, you regenerate the runbook.

### When a Skill Produces a Runbook

**The dividing line:** If a human would follow the same steps every time regardless of the input, it's a runbook candidate. If a human would make different choices based on the input, it stays a skill only.

**Runbook candidates** — skills that execute a pipeline:
- Data collection and reporting (same sources, same format, same output)
- Multi-agent orchestration (same spawn pattern, same collection, same judging)
- Automated maintenance (same checks, same corrections, same logging)

**Not runbook candidates** — skills that apply judgment:
- Creative writing (copywriting methodologies, content creation)
- Analysis that requires interpretation (distinction finding, research synthesis)
- Strategy and planning (the methodology itself)

**The middle ground** — skills with both layers:
Many complex skills have an orchestration layer (pipeline) wrapped around a creative layer (judgment). The orchestration layer gets runbooked. The creative layer stays as skills. A copywriting arena runbook handles spawning agents, collecting entries, running critics, and updating dashboards. The actual copywriting within each spawned agent stays flexible.

### The Lifecycle

```
1. Build a skill (methodology, frameworks, decision logic)
2. Use it, iterate it, improve it
3. Execution pattern stabilizes — steps are the same every time
4. Generate a runbook from the skill for those stable paths
5. Skill continues to evolve → regenerate the runbook when it does
```

Some skills never produce a runbook because the execution never stabilizes. That's fine. Not every skill needs one.

### What Makes a Good Runbook

1. **No interpretation required** — every step is exact
2. **No decisions required** — all choices pre-made
3. **Resumable at any step** — if interrupted, can restart from any phase
4. **Failure handling explicit** — what to do when something breaks, step by step
5. **Validation built in** — how to verify each phase completed before moving to the next

### The Tradeoff

Runbooks sacrifice flexibility for reliability. A skill can adapt to unexpected situations. A runbook cannot — it does exactly what it says, no more. For validated workflows where you've confirmed the approach works, this is a feature. For exploration and creative work, it's a limitation.

---

## The Dispatcher Pattern

For projects with more than one stream of work, the main agent (dispatcher) does no implementation work. It:
- Reads the project's CLAUDE.md and PROJECT-STATE
- Decomposes work into tasks for sub-agents
- Assigns each sub-agent a persona with backstory matched to the task
- Monitors thought pads for cross-agent consistency
- Enforces quality gates on sub-agent output
- Preserves its context window for coordination, not execution

**Any project that spawns sub-agents MUST use the Dispatcher Pattern.** Not "should." MUST. Available protocols that aren't mandated will not be followed when context windows reset.

### Structured Context Passing

Every sub-agent spawn must receive structured context. Ad-hoc prompts like "evaluate this file and score it" produce inconsistent results. When hundreds of sub-agents each receive slightly different instructions, output quality varies wildly and the dispatcher can't compare results meaningfully.

**Minimum sub-agent context:**

```
## TASK: [Name]
### PERSONA: [Name + background from persona library]
### OBJECTIVE: [One sentence]
### INPUTS: [Listed with descriptions]
### REQUIREMENTS CHECKLIST: [All items]
### CONSTRAINTS: [NEVER/ALWAYS/MAX]
### OUTPUT FORMAT: [Exact specification]
### QUALITY THRESHOLD: [STANDARD/ELEVATED/CRITICAL = 70%/85%/95%]
```

Sub-agents MUST return:
- Output in the specified format
- Self-assessment with confidence score
- Issues encountered (or "None")

The persona backstory creates implicit quality standards. A sub-agent told "You are Dr. Maya Patel, a systems architect known for ruthlessly simple designs" will produce different work than one given no persona. The backstory constrains behavior more effectively than explicit rules.

### Sub-Agent Depth

By default, sub-agents cannot spawn their own sub-agents. This prevents uncontrolled spawning chains that are impossible to monitor. If a project requires multi-level delegation, the project CLAUDE.md must explicitly authorize it and define the maximum depth.

---

## Session Management

Most sessions are continuations, not fresh starts. The methodology has a clear workflow for starting a new project. It also needs a clear workflow for what happens when a new session enters an existing project mid-flight.

### Starting a New Session in an Existing Project

1. Read the project CLAUDE.md (protocol mandates)
2. Read the PROJECT-STATE file (current phase, next steps, decisions made)
3. Read the PROGRESS-LOG (recent work)
4. Read any handoff documents from prior sessions
5. Verify protocol compliance (confirm operating mode is loaded)
6. Begin work from the current phase — do not re-plan or re-discover what's already decided

This sounds obvious. In practice, sessions routinely enter projects without reading state files, without loading required protocols, and without verifying compliance. The project CLAUDE.md enforces this by listing exactly what must be read before work begins.

### Context Window Management

At 70-80% context capacity, create a Handoff Document:

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

Save to the project folder. Do NOT attempt "one more action." The Handoff Document is an emergency artifact -- use it before you need it, not after.

Update the PROJECT-STATE file at the same time. The Handoff captures session-specific context. The PROJECT-STATE captures project-lifetime state. Both matter.

---

## Finishing

The methodology covers starting projects, building through them, and managing them across sessions. It also needs to cover ending them. Projects that don't have a formal close-out don't end — they fade. And faded projects that were never formally closed look identical to active projects from the outside.

### Three End States

Every project eventually reaches one of three states. The methodology recognizes all three and has a protocol for each.

**Complete** — The project achieved its Vision. The system works. Deliverables are done. This is the desired end state.

**Paused** — The project isn't done but work has intentionally stopped. It may resume. Requirements haven't changed — priorities have. Everything stays in place for when work restarts.

**Abandoned** — The project isn't going to be finished. The Vision is no longer worth pursuing, requirements changed fundamentally, or the approach was wrong. This is a deliberate decision, never a default.

### Staleness Trigger

Projects that drift into paused without anyone acknowledging it are the most dangerous — they consume mental overhead without producing value, and a new session entering the folder has no idea whether to continue or wait.

**The rule:** If no work has been logged to PROGRESS-LOG in 2 weeks and the project is not marked PAUSED or COMPLETE, it is flagged for a status decision. Someone must explicitly choose: resume, pause, or abandon.

### Close-Out Protocol: Complete

When the last phase passes validation and the project owner judges that the Vision has been achieved:

1. **Vision review** — Does the finished system actually deliver the transformed state described in the Vision Document? The AI presents evidence; the project owner makes the judgment call.
2. **Final validation** — Run Post-Build Validation on the complete system as a whole, not just the last phase built. Components that passed individually may not work together.
3. **Asset handoff** — Transition deployable assets (skills, agents, runbooks) from project space to production. They now live in their permanent home, not the project folder.
4. **Lessons learned** — What worked. What was harder than expected. What patterns should be extracted for future projects. What would you do differently. Written to a file in the project folder, not just discussed.
5. **Documentation finalized** — CLAUDE.md updated to reflect the finished state, not mid-build state. PROJECT-STATE marked COMPLETE with final date.
6. **Cleanup** — Archive intermediate artifacts (thought pads, draft files, scratch work). Keep the final deliverables, the lessons learned, and the project infrastructure (CLAUDE.md, PROJECT-STATE, PROGRESS-LOG). Remove everything that only mattered during the build.
7. **Student packaging** (if applicable) — Per the distribution protocol, package the deliverables for student/client distribution.

### Close-Out Protocol: Paused

When you consciously decide to stop working on a project for now:

1. **Update PROJECT-STATE** — Current status, what's done, what remains, why it's being paused.
2. **Write a resumption guide** — What the next session needs to know to pick this back up. Not a full handoff — a resumption guide assumes the project infrastructure is intact and just needs context reloaded.
3. **Mark status as PAUSED** — Include the reason and the expected resumption trigger ("will resume after webinar," "waiting on API access," "lower priority until Q2").
4. **No cleanup** — Everything stays as-is. Paused projects resume; cleaning up creates re-work.

### Close-Out Protocol: Abandoned

When you decide the Vision is no longer worth pursuing:

1. **Document WHY** — So you don't restart this project later and hit the same wall. Be specific: what changed, what was wrong with the approach, what would need to be different for this to be worth revisiting.
2. **Extract reusable assets** — Research, frameworks, skills, or components that have value outside this project. Move them to where they'll be found and used.
3. **Mark PROJECT-STATE as ABANDONED** — Include the reason and date.
4. **Archive the folder** — Per the Archiving protocol below.

---

## Archiving

When a project is finished — all audits passed, deliverables packaged, assets deployed, no more work to be done — it moves out of the active workspace. Nothing is deleted. Everything is preserved. The project just stops occupying active space.

### Where Projects Go

All completed and abandoned projects move to the **Archived-Projects** vault. Every project gets its own folder, containing the complete project as it existed at close-out — CLAUDE.md, PROJECT-STATE, PROGRESS-LOG, Vision, Architecture, PRDs, thought pads, lessons learned, everything.

```
Archived-Projects/
├── PROJECT-ARCHIVE-INDEX.md        (master index of all archived projects)
├── [project-name-1]/               (complete project folder, unchanged)
├── [project-name-2]/
└── ...
```

Nothing is stripped, reorganized, or cleaned beyond what the Finishing close-out already did. The archive is the project as it was, frozen at the moment of close-out.

### The Archive Index

A master index lives in BOTH locations:

- **Archived-Projects/PROJECT-ARCHIVE-INDEX.md** — the authoritative copy, in the archive vault itself
- **Active-Brain/00 Projects/PROJECT-ARCHIVE-INDEX.md** — a mirror copy in the active workspace, so you can find archived projects without opening the archive vault

The index contains, for each archived project:

| Field | Purpose |
|---|---|
| **Project name** | What it was |
| **Status** | COMPLETE or ABANDONED |
| **Archive date** | When it was archived |
| **Archive path** | Where to find it in Archived-Projects |
| **Vision (1 sentence)** | What it set out to do |
| **Deliverables deployed to** | Where the production assets live now |
| **Lessons learned (brief)** | 2-3 sentence summary of key takeaways |

The index is updated every time a project is archived. Both copies are updated together.

### Tombstone Files

When a project moves from Active-Brain to Archived-Projects, a small tombstone file stays behind at the original location in Active-Brain:

```
# [Project Name] — Archived
**Status:** COMPLETE (or ABANDONED)
**Archived:** [date]
**Archive location:** Archived-Projects/[folder name]
**Deliverables deployed to:** [paths where skills/agents/runbooks now live]
**Lessons learned:** [2-3 sentence summary]
```

The tombstone serves one purpose: if anyone (human or AI session) navigates to where a project used to be, they find a pointer instead of nothing. The archive index is the primary way to find archived projects. The tombstone is a safety net for references that still point to the old location.

Everything else in the original folder moves to the archive. Only the tombstone remains.

### When to Archive

A project is ready for archiving when ALL of the following are true:

1. All phases are complete and have passed their validation gates
2. Independent audits are complete (for levels that required them)
3. Deliverables are packaged (student packaging, if applicable)
4. Assets are deployed to production (skills installed, agents configured, runbooks generated)
5. The Finishing close-out protocol is complete (lessons learned captured, documentation finalized)
6. There is no remaining work to be done

Archiving happens immediately after these conditions are met. There is no cooling-off period — the close-out protocol already captures everything needed for future reference.

For abandoned projects, archiving happens as the final step of the Abandoned close-out, after reusable assets have been extracted.

### Retrieving Archived Projects

Archived projects are reference material, not active workspaces. If you need to:

- **Reference a past project's approach** — Read from the archive directly. The full project infrastructure is preserved.
- **Resume a completed project** (new phase, expansion) — Copy the relevant files back to Active-Brain, create a new project entry, and use the "Adding to an Existing System" workflow. The archive copy stays untouched.
- **Learn from past lessons** — Check the archive index first (the lessons summary), then read the full lessons-learned file in the archived project if needed.

---

## Core Constraints

### Reality Constraint
Only propose what can be built with current tools and current skill level. No theoretical architectures requiring tools that don't exist. No capability maps with 20 capabilities when 5 will do. If you catch yourself proposing something elaborate, cut it in half, then ask if you can cut it again.

The test: "Can this be built and running within days, not months?"

### Time Calibration
AI-assisted projects move fast. Traditional project management time does not apply.

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

### Portability Constraint
All project artifacts live in files, never only in conversation history. Skills, agents, memory, architecture docs -- all persist outside the AI. Nothing that matters exists only in chat. The AI is the executor, not the system.

### Durability-First Build Rule
When two implementation approaches exist -- one quick/fragile and one requiring more setup but more stable -- default to the durable approach. Do not optimize for saving minutes at the cost of reliability. There is no silent shortcut option.

---

## Agentic Operations Principles

Eight principles for daily agent work:

1. **Think in blast radius** -- Estimate scope by files touched, not perceived difficulty
2. **Interrupt and steer** -- Check agents mid-task, don't wait and hope
3. **Minimize context tax** -- Prefer lean tools over heavy integrations
4. **Use screenshots** -- Visual context beats text descriptions
5. **Instruction files evolve from failures** -- Add rules when things go wrong, not preemptively
6. **Better models need shorter prompts** -- Start brief, add detail only if needed
7. **Cleanup is low-focus work** -- Reserve maintenance for low-energy time
8. **Intuition compounds through reps** -- Practice beats frameworks

---

## Workflows

### Starting a New Project

```
 1. Create project folder
 2. Create CLAUDE.md (protocol mandates, quality gates, sub-agent rules, session startup checklist)
 3. Create PROJECT-STATE file (task graph, operating mode, decisions log)
 4. Create PROGRESS-LOG.md (empty, ready for session entries)
 5. Create authorization manifest
 6. Create thought-pads subfolder
 7. Write Vision Document → validate → independent audit
 8. Create System Architecture Map → validate → independent audit
 9. Create Capability Map → validate → independent audit
10. Create Phased Delivery Plan → validate → independent audit
11. Prototype (if building AI tools) → validate
12. Write PRD for Phase 1 → validate → translation audit (PRD vs. Capability)
13. Build with Execution Checklist
14. Run Post-Build Validation → validate against Post-Build Gate
15. Update CLAUDE.md, PROJECT-STATE, and PROGRESS-LOG
16. Repeat from step 11 for next phase
```

### Continuing an Existing Project (New Session)

```
1. Read project CLAUDE.md (protocol mandates)
2. Read PROJECT-STATE file (current phase, decisions, next steps)
3. Read PROGRESS-LOG.md (recent work)
4. Read any handoff documents
5. Confirm protocol compliance
6. Begin work from current phase
```

### Adding to an Existing System

```
1. Update the relevant Capability Map → validate → independent audit
2. Update the Phased Delivery Plan → validate → independent audit
3. Prototype (if AI tools) → validate
4. Write a PRD → validate → translation audit (PRD vs. Capability)
5. Build with Execution Checklist → Validate
6. Update CLAUDE.md, PROJECT-STATE, and PROGRESS-LOG
```

### Maintenance

```
1. Write a lightweight PRD → validate
2. Build with Execution Checklist → Validate
3. Update CLAUDE.md, PROJECT-STATE, and PROGRESS-LOG
```

---

## Key Principles

1. **Documents are thinking tools, not bureaucracy.** When you write something down, you discover what you don't know.
2. **Leverage lives at the top.** Invest attention at the highest-leverage level.
3. **Translation is your job.** Your role is to translate Vision through Specification with enough clarity that Implementation happens without you.
4. **Ambiguity is the enemy.** Every ambiguity is a decision the AI makes for you. Make decisions explicit.
5. **Systems compound.** Build with compounding in mind -- your systems are components of one infrastructure.
6. **Reality over theory.** Only build what can actually be built with current tools and skills.
7. **Working software beats comprehensive plans.** Ship Phase 1, then expand.
8. **No silent shortcuts.** Do it right, or ask first.
9. **Prototype before you specify.** Discover what works through conversation, then write the spec.
10. **Build tools that improve with use.** Every system should get smarter over time. Static tools leave compounding value on the table.
11. **Enforce, don't assume.** Protocols that depend on the agent "remembering" to follow them will fail at scale. Protocols enforced by project infrastructure survive.
12. **State lives in files, not in chat.** Anything tracked only in conversation context is one context reset away from being lost.

---

*The Strategic Builder Methodology*
*Developed by Rich Schefren, 2025-2026*
*Formalized: February 2, 2026*
*Unified: February 11, 2026 -- Integrated Project Operations Protocol, Runbook Evolution, Auditing, Optimization, Finishing, and Archiving*

---

## Source Materials

The research and iterative documents that led to this methodology are preserved in the `research/` subfolder:
- Original Translation Stack exploration (10 documents)
- Three Questions Protocol development
- PRD framework evolution
- Agentic operations research (from Peter Steinberger's methodology)
- Methodology review and gap analysis
- Core agent operations skill development
- Project Operations Protocol -- The Missing Layer (7 distinctions, February 8, 2026)
- Runbook Evolution -- From Skills to Execution Scripts (February 4, 2026)
