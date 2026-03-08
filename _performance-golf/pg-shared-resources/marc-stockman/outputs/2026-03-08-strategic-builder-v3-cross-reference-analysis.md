# Strategic Builder v3 × Quality Engine — Cross-Reference Analysis

**Date:** 2026-03-08
**For:** Marc Stockman / Donnie French
**From:** Donnie French + Claude Opus 4.6 analysis session
**Scope:** How Rich Schefren's Strategic Builder v3 (SKILL.md + 12 reference documents) overlaps with, enhances, or detracts from Marc's Quality Engine
**Builds on:** 2026-03-07 Quality Engine Recommendations (Manus, Agents of Chaos, Operations Protocol sources)

---

## TL;DR

Rich's Strategic Builder v3 and Marc's Quality Engine solve **different halves of the same problem.** The QE answers "How do I think and produce at the highest quality?" The Strategic Builder answers "What should I build, in what order, and how do I make sure the whole thing holds together across sessions?" They are complementary systems with meaningful overlap in 7 areas, 10 enhancements worth absorbing, and 5 areas where applying Rich's system naively would weaken the QE.

---

## Part 1: Overlaps (Same Ground, Different Depth)

These 7 areas exist in both systems. For each: who does it better and whether consolidation is needed.

### 1.1 Quality Gate Enforcement

| Aspect | Marc's QE | Rich's SB3 |
|--------|-----------|------------|
| **Where** | 16-Skill pipeline, 6 phases | Translation Stack, 7 level-gates |
| **How** | Skills 7-12 (Verification → Convergence Governor) | Score → log PASS/FAIL → corrective action → max 3 retries → escalate |
| **Granularity** | Per-claim, per-dimension verification | Per-deliverable checkpoint |
| **Enforcement** | MC-CHECK, self-audit, check command | Gate must be logged; never proceed past failure without explicit decision |

**Verdict:** Marc's is deeper (claim-level verification, adversarial critique, pre-mortem, FMEA scoring). Rich's is more structurally enforced (max retries, explicit escalation, logged decisions). **Absorb Rich's enforcement mechanics** (max retries, explicit PASS/FAIL logging, escalation rules) into Marc's existing gate structure. Don't replace Marc's multi-dimensional verification with Rich's simpler checkpoint model.

### 1.2 Session Management & Context Persistence

| Aspect | Marc's QE | Rich's SB3 |
|--------|-----------|------------|
| **Boot** | `initialize` command → reads 11 files | Session Startup Protocol → read CLAUDE.md → PROJECT-STATE → PROGRESS-LOG → handoff docs |
| **State** | reasoning-log.md, session-learning-log.md, commitment-registry.md | PROJECT-STATE (living task graph + decisions + phase), PROGRESS-LOG, Thought-Pads |
| **Recovery** | Audit checkpoint (resume <2 hours) | Handoff Document (context window emergency snapshot) |

**Verdict:** Rich makes a critical distinction Marc doesn't: **PROJECT-STATE (living, maintained every session) vs. Handoff Document (emergency snapshot).** Marc's session-learning-log captures lessons but not project state. His commitment-registry tracks commitments but not phase/task/decision state. See Enhancement 1.6.

### 1.3 File-Based Persistence

Both systems independently converged on files as the source of truth. Marc's QE cites this as validated by Manus's "Context Engineering" research. Rich's entire methodology is built on it. **No conflict. Both correct.**

### 1.4 Self-Learning / Self-Improvement

| Aspect | Marc's QE | Rich's SB3 |
|--------|-----------|------------|
| **Capture** | Issue Logger (J1/J2 classification) | Instruction files evolve from failures (Principle 5) |
| **Promotion** | Pattern detection → bounded trial → permanent adoption | Usage tracking → pattern detection → feedback loops → version history |
| **Scope** | Rules (R-01 through R-20) | Entire skill/system (specs, constraints, anti-patterns, workflow) |

**Verdict:** Marc's issue-to-rule pipeline is more rigorous. Rich's is more comprehensive in scope — he expects the ENTIRE skill to evolve (not just rules). See Enhancement 1.7 (10-Layer Skill Architecture) for how to expand Marc's evolution scope beyond rules.

### 1.5 Anti-Degradation

| Aspect | Marc's QE | Rich's SB3 |
|--------|-----------|------------|
| **Mechanism** | Forbidden rationalization lists, R-07 gate, convergence caps | "No silent shortcuts," "Scoped-but-waiting = RED FLAG," gate enforcement |
| **Depth** | Deep (specific phrases, concept-level per yesterday's Rec 3) | Structural (prevent proceeding past incomplete work) |

**Verdict:** Marc's is more sophisticated against AI-specific failure modes. Rich's addresses a failure mode Marc doesn't: **incomplete work marked as complete.** His "Scoped but waiting = RED FLAG" principle is valuable. Marc's system could benefit from an explicit "completeness gate" that prevents deliverables from being marked done while open questions remain. This connects to Marc's G-4 (Crisis/Chaos Protocol gap).

### 1.6 Structured Context Passing

| Aspect | Marc's QE | Rich's SB3 |
|--------|-----------|------------|
| **Between** | QE skills (implicit handoff via pipeline phases) | Sub-agents (explicit Structured Context Template) |
| **Format** | Skills read previous skill output | TASK/PERSONA/OBJECTIVE/INPUTS/REQUIREMENTS/CONSTRAINTS/OUTPUT FORMAT/QUALITY THRESHOLD |

**Verdict:** Rich's is more explicit and portable. Marc's works because it's a single-agent system. If Marc ever orchestrates multiple agents, Rich's template is the right model. **No change needed now**, but file this for Marc's G-8 (Multi-Operator Transfer) gap.

### 1.7 Instruction Files Evolve From Failures

Both systems share this principle. Marc's R-01 through R-20 each trace to specific session mistakes. Rich's Principle 5 says "Every mistake = add rule to instruction file." **Complete alignment. No conflict.**

---

## Part 2: Enhancements (What Rich Adds That Would Strengthen the QE)

These 10 capabilities exist in Rich's system but not in Marc's. Ranked by impact to the QE.

### 2.1 The Translation Stack — Strategic Planning Layer Above Production

**What Rich has:** An 8-level architecture (Vision → Architecture → Capability → Phased Delivery → Prototyping → PRD → Implementation → Validation) that ensures you're building the RIGHT thing before you build it well.

**What Marc lacks:** The QE is a production pipeline. It takes a task and produces a high-quality output. But it doesn't ask: "Is this the right task? Does it fit into a larger system? Are we building at the right level of abstraction?"

**Impact:** HIGH — but only for system-building tasks. Marc's QE handles analytical, research, and recommendation tasks well without this. When Marc is designing AI infrastructure (Dossium, AI Brain), the Translation Stack prevents the most expensive mistake: building the wrong thing perfectly.

**Recommendation:** Don't integrate into the QE itself. Instead, add as a **pre-QE gate** in Objective Intake: "Is this task building a system or component of a system? If yes, has the Translation Stack been completed through the appropriate level?" This preserves the QE's focus on production quality while catching strategic misalignment before resources are spent.

### 2.2 Three Questions Protocol — Decision Routing

**What Rich has:** Q1 (What's the system?), Q2 (What must it do?), Q3 (How exactly?). With a clear hierarchy: don't answer Q3 before Q1 and Q2. Q1 wrong = costliest.

**What Marc has that's close:** Skill 0 (Prompt Optimizer) asks similar questions at the prompt level (What is Marc trying to accomplish? What does "done" look like? What does "wrong" look like?). But Skill 0 operates on individual prompts, not on system architecture.

**Impact:** MEDIUM — complements Skill 0 by adding architectural-level questioning. Most valuable when Marc is starting new initiatives, not for routine tasks.

**Recommendation:** Add the Three Questions as a **conditional check in Objective Intake.** When the task involves building or modifying a system, run the three questions before passing to Skill 0. For analytical/research tasks, skip.

### 2.3 Delivery Verification — Content ≠ Product

**What Rich has:** Mandatory Phase 4 (Delivery Operations) and Phase 5 (End-to-End Testing) for client-facing projects. Born from a catastrophic failure where a project was marked "complete" after building content but before building any delivery mechanism.

**What Marc lacks:** The QE verifies quality of OUTPUT but not quality of DELIVERY. It asks "Is this analysis correct?" but not "Can the recipient actually use this?"

**Impact:** MEDIUM — depends on Marc's use case. For internal analysis, delivery verification is overkill. For building systems for others (like Donnie's agents, or client-facing tools), it's essential.

**Recommendation:** Add a conditional delivery check to Skill 12 (Output Contract & Quality Gate): "If this deliverable will be consumed by someone other than the requesting user, verify: (a) delivery mechanism exists, (b) recipient can use the format, (c) all referenced materials are accessible." Don't make it a full phase — just a gate check.

### 2.4 Blast Radius Thinking

**What Rich has:** Estimate scope by files touched, not perceived difficulty. Small (1-3 files), Medium (4-10), Large (10+) with different handling.

**What Marc has that's close:** Skill 1 (Task Triage) routes by type, ambiguity, and stakes into Fast/Standard/Thorough. But the routing doesn't consider blast radius.

**Impact:** LOW-MEDIUM — mostly relevant for coding/system-building tasks, less for analysis.

**Recommendation:** Add blast radius as a SECONDARY signal in Skill 1 Task Triage. If a task touches 10+ files, force Thorough mode regardless of other signals. This is a single-line addition.

### 2.5 Prototyping Before Specification

**What Rich has:** For AI tools, "work through capability manually with AI in conversation. Run 3-5 test scenarios" BEFORE writing the PRD.

**What Marc lacks:** The QE jumps from planning (Phase 2) to drafting (Phase 3) without a discovery step. For novel tasks where the approach isn't proven, this risks building on untested assumptions.

**Impact:** MEDIUM — valuable for Marc's AI infrastructure work (Dossium, MCP integrations) where the right approach isn't known upfront.

**Recommendation:** Add prototyping as an optional step in Skill 4 (Decomposition & Evidence Plan). When the knowledge strategy for a subgoal is classified as "uncertain," require 2-3 test scenarios before proceeding to Skill 5 (Structured Reasoning). This fits naturally in the existing pipeline.

### 2.6 PROJECT-STATE as Living Document

**What Rich has:** A persistent document tracking task graph, current phase, key decisions, and next steps — maintained every session, mandatory first-read.

**What Marc has that's close:** commitment-registry.md tracks commitments, reasoning-log.md tracks reasoning, session-learning-log.md tracks lessons. But none of these serve as a single-source-of-truth project state.

**Impact:** MEDIUM-HIGH — for multi-session projects, Marc's system could lose project state across sessions. The QE's session-bootstrap reads 11 files, but none consolidate "where are we and what's next?"

**Recommendation:** Add a PROJECT-STATE equivalent to Marc's operational files. Could be integrated into commitment-registry.md or as a new file. Should contain: current phase, active tasks (done/blocked/next), key decisions (not to be revisited), and file locations.

### 2.7 10-Layer Skill Architecture Pattern

**What Rich has:** A quality standard for skills defining 10 architectural layers: Identity, Specs, Quick Reference, Workflow, Constraints, Anti-Patterns, Validation, Delivery, Evolution, Failure Protocol.

**What Marc's QE skills have:** Workflow and constraints (through the QE pipeline), but not: machine-enforced validation tooling, pre-mapped quick reference data, dual delivery formats, evolution logs per skill, or explicit failure protocols.

**Impact:** HIGH — if Marc applies this standard to his own QE skills, each skill becomes more self-contained and self-improving. Most valuable layers to add: **Validation tooling** (machine-enforced checks, not honor-system) and **Anti-Patterns with examples** (concrete bad/why/fix).

**Recommendation:** Don't retrofit all 16 skills at once. Start with the highest-traffic skills (Skill 0 Prompt Optimizer, Skill 1 Task Triage, Skill 7 Verification Operator) and add the two highest-leverage layers: validation tooling and anti-patterns. Expand from there.

### 2.8 Context Tax Awareness

**What Rich has:** Principle 3 — "Every integration consumes finite context tokens. Lean setups produce sharper results."

**Connection to yesterday:** Directly reinforces Recommendation 1 (Cache-Aware Context Design). Rich provides the strategic framing (context is a budget) while Manus provides the tactical implementation (stable prefix, dynamic content at end).

**Impact:** LOW-MEDIUM — already addressed by yesterday's recommendation. Rich adds the "why" but not new "what."

**Recommendation:** Already covered. No additional action beyond yesterday's Rec 1.

### 2.9 TDD (Technical Design Documents) for Durable Systems

**What Rich has:** A full framework for when and how to write TDDs — specifically for systems that must run reliably for months without human oversight.

**What Marc lacks:** The QE focuses on quality of reasoning and output. It doesn't address designing technical systems for durability. Marc's AI Infrastructure Strategist persona does this work, but without a structured TDD framework.

**Impact:** MEDIUM — relevant when Marc is building Dossium integrations, MCP servers, or automated pipelines. Not relevant for analysis/recommendation tasks.

**Recommendation:** Add Rich's TDD template as an optional reference linked from the AI Infrastructure Strategist persona. When the persona is active and building a system that must run reliably, TDD becomes a required deliverable.

### 2.10 "Scoped But Waiting" = RED FLAG

**What Rich has:** An explicit rule that documents saying "awaiting decisions before building" are BLOCKERS, not status updates. Projects cannot be marked complete while blocked tasks exist.

**What Marc lacks:** No equivalent rule. Marc's commitment-registry tracks commitments, but there's no mechanism to prevent marking work done while open questions remain.

**Impact:** MEDIUM — prevents a specific failure mode (premature completion).

**Recommendation:** Add as R-23 (proposed): "No deliverable may be marked complete while any dependency is documented as 'pending,' 'awaiting decision,' or 'TBD.' These are blockers, not status notes."

---

## Part 3: Detractions (Where Rich's System Would Weaken the QE If Applied Naively)

These 5 areas require careful handling. Applying Rich's approach without calibration would reduce the QE's effectiveness.

### 3.1 "Better Models Need Shorter Prompts" vs. Marc's Heavy Enforcement

**Rich's Principle 6:** "Frontier models with strong reasoning need less hand-holding. Over-prompting can degrade output by constraining problem-solving."

**The tension:** Marc's QE has 13 directives + 20 preventive rules + 12 accelerators + forbidden rationalization lists. By Rich's principle, this could be over-constraining the model.

**Why this is wrong for the QE:** Marc's rules trace to ACTUAL FAILURES. R-07 prevents research-before-reasoning violations that happened. R-17 prevents regressions that happened. R-20 prevents source citation failures that happened. These aren't theoretical constraints — they're battle scars.

**The nuance:** Rich is right that prompts should evolve — and that INCLUDES shrinking. Marc already has this in principle (L5 System Optimization). The risk is using Rich's principle to justify removing enforcement that's been validated by real mistakes.

**Recommendation:** Do NOT reduce enforcement based on this principle. Instead, add a periodic review (every 30 days or every 50 sessions) to Skill 15 (Meta-Prompt Refiner): "Are any preventive rules now redundant because model capability has improved? Evidence required: 10+ sessions where the rule was applicable but unnecessary." This allows principled reduction without premature removal. Connects to Marc's acknowledged gap G-6 (Rule Obsolescence Detection).

### 3.2 Prototyping Phase as Overhead for Established Workflows

**Rich's approach:** Always prototype before specification.

**The risk:** Marc's QE is an ESTABLISHED workflow. Running 3-5 test scenarios before every QE task would add massive overhead to routine work. The QE pipeline is already proven.

**Recommendation:** Only trigger prototyping for NEW capabilities or NOVEL task types. Never retrofit into the QE's existing pipeline for tasks the system already handles well.

### 3.3 Translation Stack as Overhead for Small Tasks

**Rich's full stack:** Vision → Architecture → Capability → Phased Delivery → Prototyping → PRD → Implementation → Validation.

**The risk:** If applied to every QE task, this adds 7 levels of planning before a simple analysis. Marc's Skill 1 already routes Fast tasks to skip phases. Adding the Translation Stack to every task would kill throughput.

**Recommendation:** The Translation Stack is a SYSTEM-BUILDING framework, not a task-execution framework. Only activate when building or modifying multi-component systems. The QE's own Task Triage (Skill 1) should route: "Is this building a system?" → Yes: Translation Stack first. No: QE pipeline directly.

### 3.4 Dispatcher Pattern Overhead for Single-Agent Work

**Rich's mandate:** "Any project that spawns sub-agents MUST use Dispatcher Pattern."

**The risk:** Marc's QE is designed as a single-agent system (Claude operating for Marc). Adding dispatcher infrastructure (Dispatcher reads CLAUDE.md, decomposes work, assigns personas, monitors thought pads, enforces gates on sub-agent output) to a single-agent workflow adds complexity with no benefit.

**Recommendation:** Ignore the Dispatcher Pattern for the QE unless Marc starts orchestrating multiple agents. File for G-8 (Multi-Operator Transfer) if relevant later.

**Marc Notes** Marc is migrating everything to Cursor, where he's going to work in Claude code in the terminal inside of Cursor. We need to consider multiple agents and being able to spin up sub-agents, and also using agent teams. In the revision of this, consider that because I think this dispatcher is going to be important.

### 3.5 Dual Delivery Formats for Non-Importable Outputs

**Rich's pattern:** Working format (labeled, grouped for review) vs. final format (raw, importable).

**The risk:** Marc's QE outputs are analysis, recommendations, and strategic documents. These aren't imported into other systems — they're read by humans. Adding a second format to every deliverable doubles production effort with no benefit.

**Recommendation:** Only adopt dual formats if a specific QE output type feeds into another system (e.g., if QE-produced rules need to be imported into a CLAUDE.md file). Otherwise, skip.

---

## Part 4: How Yesterday's Recommendations Map to Rich's System

| Yesterday's Recommendation | Rich's System | Relationship |
|---|---|---|
| **Rec 1:** Cache-Aware Context Design | Principle 3 (Context Tax) | **REINFORCED** — Rich adds the strategic "why" (context = budget). No new action needed. |
| **Rec 2:** External Evidence Over Self-Monitoring | Not addressed | **GAP** — Rich's system trusts quality gates but doesn't address self-monitoring degradation. Yesterday's rec stands alone. |
| **Rec 3:** Concept-Level Gates | "Capabilities not features" test | **PARTIALLY COVERED** — Rich applies concept-level thinking to architecture, not to enforcement. Yesterday's rec addresses enforcement specifically. |
| **Rec 4:** Active Recitation Protocol | PROJECT-STATE + Handoff Docs | **PARTIALLY COVERED** — Rich's persistent files serve project-level recitation. Manus's turn-level attention manipulation is a different, complementary technique. |
| **Rec 5:** Controlled Diversity for Batches | Not addressed | **GAP** — Rich doesn't address batch processing uniformity. Yesterday's rec stands alone. |
| **Rec 6:** File Integrity Verification | "Available ≠ loaded" distinction | **PARTIALLY COVERED** — Rich checks whether protocols are LOADED, not whether files are INTACT. Yesterday's rec addresses integrity specifically. |
| **Rec 7:** Proportionality for Creative Tasks | Principle 6 (Shorter Prompts) | **REINFORCED with caution** — Rich would agree that heavy enforcement during creative generation clips wings. But see Detraction 3.1: don't use this to remove validated rules. |
| **Rec 8:** Isolated Verification Context | Not addressed | **GAP** — Rich doesn't address cross-contamination of verification. Yesterday's rec stands alone. |

**Summary:** Yesterday's 4 highest-impact recommendations (#2, #3, #7, #8) are either reinforced or unaddressed by Rich. None are contradicted. Rich's system adds net-new capabilities (Translation Stack, Three Questions, Delivery Verification, 10-Layer Architecture) that yesterday's session didn't cover because those sources focused on AI behavior, not project methodology.

---

## Part 5: Priority Action List

### Tier 1 — Absorb Now (High Impact, Low Effort)

| # | Action | Source | Where in QE |
|---|--------|--------|-------------|
| A1 | Add "Scoped-but-waiting = RED FLAG" rule (R-23 proposed) | SB3 Delivery Gap | `marc-ops-framework.md` |
| A2 | Add max-retry + escalation mechanics to quality gates | SB3 Quality Gates | `qe-quality-assurance.md` Skills 7-12 |
| A3 | Add periodic rule obsolescence review (30-day cycle) | SB3 Principle 6 + QE Gap G-6 | `qe-system-maintenance.md` Skill 15 |

### Tier 2 — Build Next (High Impact, Medium Effort)

| # | Action | Source | Where in QE |
|---|--------|--------|-------------|
| B1 | Add PROJECT-STATE equivalent to operational files | SB3 Operations Protocol | New operational file + `session-bootstrap.md` update |
| B2 | Add 10-Layer Skill Architecture standard to 3 highest-traffic skills (Skill 0, 1, 7) | SB3 Skill Architecture Patterns | Target skill files |
| B3 | Add conditional delivery gate to Skill 12 for external-facing deliverables | SB3 Delivery Gap | `qe-quality-assurance.md` Skill 12 |

### Tier 3 — Reference When Needed (Medium Impact, Context-Dependent)

| # | Action | Source | When |
|---|--------|--------|------|
| C1 | Use Translation Stack + Three Questions before building new systems | SB3 Core Methodology | When Marc is building AI infrastructure |
| C2 | Add prototyping step for uncertain subgoals in Skill 4 | SB3 Prototyping Level | When knowledge strategy = "uncertain" |
| C3 | Link TDD template from AI Infrastructure Strategist persona | SB3 Technical Design Docs | When building durable automated systems |
| C4 | Add blast radius as secondary signal in Skill 1 Task Triage | SB3 Principle 1 | When coding/system-building tasks |

### Explicitly Do NOT Do

| # | What | Why |
|---|------|-----|
| X1 | Reduce enforcement rules based on "better models need shorter prompts" | Marc's rules trace to real failures; reduction requires evidence, not principle |
| X2 | Add Translation Stack to every QE task | Stack is for system-building, not production pipeline tasks |
| X3 | Add Dispatcher Pattern to QE | QE is single-agent; dispatcher adds complexity with no benefit |
| X4 | Add dual delivery formats to all skills | QE outputs are human-read, not system-imported |
| X5 | Add prototyping to established QE workflows | Only for novel/uncertain tasks, not routine production |

---

## Summary

Rich's Strategic Builder v3 is a **project methodology** — it answers "What to build, in what order, with what infrastructure to keep it working across sessions." Marc's Quality Engine is a **production system** — it answers "How to think rigorously and produce verified output." They operate at different altitudes.

The highest-value integration is not merging the two systems. It's **using the Strategic Builder as the pre-QE strategic layer** for system-building tasks while keeping the QE focused on its core strength: disciplined thinking and verification. Where they overlap, Marc's system is generally deeper; where Rich's adds new capabilities, they're complementary rather than competing.

The 3 most impactful actions from this analysis:
1. **Add PROJECT-STATE** — gives the QE persistent project memory it currently lacks (B1)
2. **Add 10-Layer Skill Architecture to key skills** — makes the QE's own skills self-improving at the structural level, not just the rule level (B2)
3. **Add "Scoped-but-waiting = RED FLAG"** — prevents a failure mode the QE has no defense against (A1)

---

*Analysis based on: Rich Schefren Strategic Builder v3 (SKILL.md + 12 reference documents), Marc Stockman Quality Engine (16 skills + ops framework + 2 personas), 2026-03-07 QE Recommendations (Manus, Agents of Chaos, Operations Protocol sources), and direct filesystem review of all files in both systems.*
