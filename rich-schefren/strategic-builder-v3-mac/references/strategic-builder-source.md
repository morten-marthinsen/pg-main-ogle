# The Strategic Builder Methodology

## For Entrepreneurs Building Business Systems with AI

---

## What This Is

A complete methodology for strategic entrepreneurs who build business systems using AI. It answers the question: **How does someone who thinks strategically -- not a coder, but a builder -- approach AI-assisted system development?**

This methodology was developed through practice, refined through failure, and formalized into a repeatable system. It bridges the gap between strategic thinking and technical execution.

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

## Validation Gates

Every level has a validation gate -- criteria that must ALL pass before moving to the next level. This is where most errors get caught. Errors at higher levels are exponentially more costly than errors at lower levels.

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
- Includes a requirement for evolution capability (the system must be designed to improve over time)

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

## Building Systems That Improve Over Time

Most AI tools are static -- they work the same on day 100 as day 1. This leaves enormous value on the table.

Every system you build should include a mechanism for self-improvement:

1. **Performance tracking.** The system captures what inputs it received, what it produced, and whether the output was used as-is, edited, or rejected.

2. **Pattern detection.** Periodically (every 10 uses or weekly), review performance: What do high-quality outputs have in common? What causes low-quality outputs? What edge cases keep appearing?

3. **Improvement application.** Propose specific changes to instructions, constraints, or validation rules based on patterns. Minor improvements (tighter constraints, better phrasing) can be applied immediately. Structural changes (new phases, different output formats) get reviewed first.

The principle: **Build tools that get smarter with use.** A system that improves 2% per week is twice as good after a year. This compounding is one of the biggest advantages of building persistent AI systems rather than running one-off prompts.

---

## 

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

## The Dispatcher Pattern

For projects with more than one stream of work, the main agent (dispatcher) does no implementation work. It:
- Reads the project's methodology docs
- Decomposes work into tasks for sub-agents
- Assigns each sub-agent a persona with backstory matched to the task
- Monitors thought pads for cross-agent consistency
- Preserves its context window for coordination, not execution

Sub-agents receive a persona, task scope, authorization, relevant docs, and a thought pad path.

The persona backstory creates implicit quality standards. A sub-agent told "You are Dr. Maya Patel, a systems architect known for ruthlessly simple designs" will produce different work than one given no persona. The backstory constrains behavior more effectively than explicit rules.

---

## Thought Pads

Every agent maintains a reasoning journal -- a persistent file that captures assumptions, decisions, concerns, and cross-agent dependencies as they work.

What goes in:
- Assumptions being made and why
- Decisions considered and which was chosen
- Concerns or risks spotted
- Things that seem off or inconsistent
- "If X turns out to be wrong, this whole approach breaks"

Thought pads are append-only, timestamped, written BEFORE decisions (not after). They provide visibility into agent reasoning so mistakes can be caught before they become output errors.

---

## Authorization Manifest

Every project gets a pre-authorization file at creation that answers all permission questions upfront. Agents read it before doing work. Actions marked AUTHORIZED proceed without asking. Only Boundary items require stopping.

This eliminates the pattern where agents block on permission requests while the user is away, hanging the entire project until they return.

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

## The Workflow Summary

### Starting a New Project
1. Create project folder
2. Create authorization manifest
3. Create thought-pads subfolder
4. Write the Vision Document → validate
5. Create the System Architecture Map → validate
6. Create a Capability Map → validate
7. Create a Phased Delivery Plan → validate
8. Prototype (if building AI tools) → validate
9. Write a PRD for Phase 1 → validate (must include evolution requirement)
10. Build with Execution Checklist
11. Run Post-Build Validation
12. Update CLAUDE.md
13. Repeat from step 8 for next phase

### Adding to an Existing System
1. Update the relevant Capability Map → validate
2. Update the Phased Delivery Plan → validate
3. Prototype (if AI tools) → validate
4. Write a PRD → validate
5. Build → Validate
6. Update CLAUDE.md

### Maintenance
1. Write a lightweight PRD → validate
2. Build → Validate
3. Update CLAUDE.md

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

---

*The Strategic Builder Methodology*
*Developed by Rich Schefren, 2025-2026*
*Formalized: February 2, 2026*
*Updated: February 4, 2026 -- Added Runbook Evolution section*

---

## Source Materials

The research and iterative documents that led to this methodology are preserved in the `research/` subfolder:
- Original Translation Stack exploration (10 documents)
- Three Questions Protocol development
- PRD framework evolution
- Agentic operations research (from Peter Steinberger's methodology)
- Methodology review and gap analysis
- Core agent operations skill development
- Runbook evolution experiment (copywriting-arena-runbook-generator skill, February 2026)
