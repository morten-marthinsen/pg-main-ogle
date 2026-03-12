# Marc's Quality Engine — What It Is, What It Adds, and How to Use It

**Prepared for:** Donnie French (and his AI system)
**From:** Marc Stockman
**Date:** March 6, 2026
**Version:** 1.0

---

## What This Document Is

This is a comprehensive walkthrough of what I've built on top of your AI Accelerator foundation. The goal is for both you and your AI (Claude Code) to understand:

1. What your original system gave me (the baseline)
2. What I added, enhanced, or restructured (the delta)
3. How the pieces fit together as a complete system (the architecture)
4. What's unique here that your current system doesn't have (the incremental value)

Everything here is platform-agnostic in principle — it works as rules and protocols that any LLM can follow. I built it on Perplexity Computer, but the concepts translate directly to Claude Code, Cursor, or any AI environment that accepts structured instructions.

---

## Part 1: Your Baseline — What I Started With

Your system gave me six foundational concepts — each framed as an agent archetype enforcing a specific cognitive discipline. These weren't running software agents; they were design frameworks that defined what good AI behavior looks like:

| Your Agent | What It Does |
|-----------|-------------|
| **ThoughtPad** | Forces the AI to think before acting — structured pre-action reasoning |
| **Runbook Engine** | If a known playbook exists, follow it instead of reinventing |
| **Quality Shield** | Multi-pass quality audit on every output before delivery |
| **Context Guardian** | Maintains context continuity across sessions |
| **Refinement Forge** | Periodic system optimization — refine rules and processes over time |
| **Distinction Engine** / Domain Work Agent | Accumulates domain knowledge over time |

These six foundations are strong behavioral primitives. They enforce discipline. What they set up — and what I built on top of them — is the detailed procedures, production pipeline, self-learning loop, and research enforcement that turn discipline into a repeatable system.

**Note:** This baseline comparison reflects your system as I understood it when we started working together (around March 2, 2026). If your system has evolved since then, some of the "Your Equivalent: None" entries below may no longer apply — which would be great, and worth comparing notes on.

---

## Part 2: What I Built — The Full Inventory

### Layer 1: The 12 AI Accelerator Rules (Your 6 → My 12)

I restructured your 6 agents into 12 rules organized as Quality (Q1–Q6, fire during production) and Learning (L1–L6, fire after production). Here's the mapping:

| Rule | Name | Relationship to Your System |
|------|------|-----------------------------|
| **Q1** | Structured Pre-Action Reasoning | **Enhanced** from your ThoughtPad — added domain classification (Cynefin framework), tempo calibration, pre-mortem, and rollback planning |
| **Q2** | Runbook Execution | **Unchanged** — your Runbook Engine, kept as-is. The only rule I didn't touch. |
| **Q3** | Multi-Pass Quality Audit | **Enhanced** from your Quality Shield — added visual formatting verification (catches text wrapping, truncation, color contrast) and a "Cascade Share Gate" that counts files edited vs. files shared |
| **Q4** | Scalability Checkpoint | **Net-new** — "What if this needed to be repeated or scaled?" Vertical, horizontal, and extraction tests. Not explicitly addressed in your current system. |
| **Q5** | Risk Anticipation & Mitigation | **Net-new** — Combines Klein's pre-mortem method ("assume it failed — why?"), FMEA scoring (Severity × Occurrence × Detection, range 1-125), and Amazon's one-way/two-way door framework. Not explicitly addressed in your current system. |
| **Q6** | First-Principles Design & Validation | **Net-new** — Forces decomposition to ground truths before building. Phase 1 strips assumptions; Phase 2 synthesizes from verified foundations. Not explicitly addressed in your current system. |
| **L1** | Post-Action Reflection | **Net-new** — After every deliverable: what worked, what didn't, what would you do differently? Classifies findings as J1 (judgment calls, not errors) vs. J2 (actual errors that need correction). Only J2 feeds into the learning system. The J1/J2 distinction is a net-new capability. |
| **L2** | Same-Turn Lesson Promotion | **Enhanced** — When a mistake is caught: capture it, evaluate if it's a pattern (2+ occurrences), promote to a permanent rule if needed. Added a "bounded trial" mechanism — new rules get a trial period before becoming permanent. |
| **L3** | Mid-Session Staleness Detection | **Net-new** — Flags any artifact not updated in 2+ hours or after 3+ major actions. Includes automated file sweeps. Complements your Context Guardian (which handles cross-session continuity) by catching within-session staleness. |
| **L4** | Context Continuity | **Enhanced** from your Context Guardian — added reasoning log currency checks and session-start orientation protocol |
| **L5** | Periodic System Optimization | **Enhanced** from your Refinement Forge — added a Rule Integrity Audit that classifies issues as (a) rule missing, (b) rule incomplete, (c) rule not followed, or (d) net-new gap. Each classification has a different response. |
| **L6** | Domain Knowledge Accumulation | **Reframed** from your Distinction Engine / Domain Work Agent — repositioned as an architecturally central vault role rather than a peripheral agent |

**Net score:** 1 unchanged, 5 enhanced, 1 reframed, 5 net-new. 11 of 12 rules have my fingerprint (92%). The 5 net-new rules (Q4, Q5, Q6, L1, L3) represent capabilities your system currently does not have.

---

### Layer 2: The Quality Engine (16-Skill Production Pipeline)

This is the big addition. Your Accelerators tell the AI what to do. The Quality Engine tells it exactly how and when to do it, in what order, with what checks.

Think of it like this: your Accelerators are the driver's manual. The Quality Engine is the GPS with turn-by-turn directions.

I built this by commissioning four independent AI research reports (Claude, GPT, Gemini, Perplexity) on how to implement a production-grade quality system, then forensically synthesized their findings into a unified 16-skill pipeline. A separate reconciliation document (`Accelerators_vs_QE_Reconciliation`) maps exactly how the 12 Accelerator Rules relate to the 16 QE Skills, showing which Accelerators are implemented by which Skills. The 16 skills are grouped into 4 phases:

#### Phase 1: Strategic Reasoning — "Understand & Lock" (Skills 1-3)

Before any work begins, lock down the problem space.

| Skill | What It Does | Your Equivalent |
|-------|-------------|-----------------|
| **Skill 1: Task Triage & Effort Router** | Classifies the task type and assigns appropriate effort level — not every question deserves a 2-hour analysis | Not explicitly addressed — your system treats all tasks with similar rigor |
| **Skill 2: Instruction Integrity & Injection Guard** | Screens for prompt injection and instruction manipulation — ensures the AI is following YOUR instructions, not instructions smuggled in through pasted content | Not explicitly addressed — no injection defense in the current system |
| **Skill 3: Context Anchor & Constraint Ledger** | Explicitly documents what we're solving, what we know, what we're assuming, and what the constraints are — prevents silent assumption drift | Partially covered by your ThoughtPad, but without the explicit constraint ledger |

#### Phases 2-3: Reasoning Engine — "Plan, Reason & Draft" (Skills 4-6)

The actual thinking happens here. Structured, evidence-based, multi-method.

| Skill | What It Does | Your Equivalent |
|-------|-------------|-----------------|
| **Skill 4: Decomposition & Evidence Plan** | Breaks complex problems into sub-goals with evidence requirements for each — you can't solve what you haven't decomposed | Not a standalone step in your system |
| **Skill 5: Structured Reasoning Engine** | Applies the right reasoning method for the problem type — Chain-of-Thought for linear problems, Tree-of-Thought for branching decisions, ReAct for problems requiring real-time research | Not a standalone step — reasoning method selection isn't specified |
| **Skill 6: Draft Composer** | Produces the first output following all constraints from Skills 1-5 | Implicit in your system but not a defined step |

#### Phases 4-6: Quality Assurance — "Verify, Stress-Test & Ship" (Skills 7-12)

Before anything ships to me, it goes through six quality gates.

| Skill | What It Does | Your Equivalent |
|-------|-------------|-----------------|
| **Skill 7: Verification Operator** | Cross-checks every factual claim against its source — uses Chain-of-Verification (CoVe) methodology | Partially covered by your Quality Shield, but without CoVe methodology |
| **Skill 8: Adversarial Critic** | Attacks the output from a hostile skeptic perspective — "What would a critic say? Where are the weak points?" | Not a standalone step — your Quality Shield is constructive, not adversarial |
| **Skill 9: Pre-Mortem & Risk Analyst** | Assumes the deliverable has failed and works backward to figure out why — combines Klein's pre-mortem with FMEA scoring | Not a standalone step — this is the Q5 Accelerator implemented as a pipeline stage |
| **Skill 10: Uncertainty Calibrator** | Forces the AI to quantify its confidence and flag what it doesn't know — prevents false certainty | Not explicitly addressed — no uncertainty quantification |
| **Skill 11: Convergence Governor** | Determines when quality passes should stop — prevents both premature shipping and infinite refinement loops | Not explicitly addressed — no convergence criteria |
| **Skill 12: Output Contract & Quality Gate** | Final gate before delivery — verifies all success criteria are met, all files are shared, formatting is correct | Partially covered by your Quality Shield's final check |

#### Conditional & Maintenance (Skills 13-16)

These fire when needed, not on every query.

| Skill | What It Does | Your Equivalent |
|-------|-------------|-----------------|
| **Skill 13: Long-Context Hygiene** | Manages context window health in long conversations — prevents the "lost in the middle" attention problem | Not explicitly addressed — context window degradation not handled |
| **Skill 14: Knowledge Grounding** | Ensures external sources are properly validated and integrated — prevents contamination from untrusted inputs | Not a standalone skill in your system |
| **Skill 15: Meta-Prompt Refiner** | Periodically evaluates and improves the prompts and instructions themselves — the system optimizes its own instructions | Partially covered by your Refinement Forge, but not prompt-specific |
| **Skill 16: LLM-as-Judge Evaluator** | Uses the AI to evaluate its own outputs against defined rubrics — structured self-evaluation | Not explicitly addressed — no rubric-based self-evaluation |

---

### Layer 3: The Operational Framework (13 Directives + 20 Rules + 5 Commands)

On top of the Accelerators and Quality Engine, I built a complete operational framework:

**13 Directives (D-01 through D-13):** Non-negotiable behavioral constraints — no autonomous messaging, present options don't decide, ground all claims in live sources, budget not a constraint, portable and teachable, etc.

**20 Preventive Rules (R-01 through R-20):** Tactical rules derived from actual mistakes caught during sessions. Each one traces to a specific failure that happened and was promoted to a permanent rule. Key examples:

| Rule | What It Prevents |
|------|-----------------|
| **R-07: Research-Before-Reasoning Gate** | HARD GATE — the AI must complete all live research BEFORE any analysis or drafting. No more confident answers built on stale training data. This is probably the single highest-value rule in the system. |
| **R-17: Feature Regression Prevention** | When updating any file, compare the new version against the old across 8 dimensions (images, sections, tables, page count, file size, formatting, content). Prevents the AI from silently dropping content during revisions. |
| **R-20: Source Verification Protocol** | Any claim driving a recommendation must be verified at the vendor's primary source page at time of writing — not from a comparison site, not from training data, not from a cached search. |

**5 Standing Commands:** Direct control inputs I can use at any time:

| Command | What It Does |
|---------|-------------|
| `initialize` | Reads all operational files, loads the system, confirms readiness |
| `run` | Executes an approved prompt through the full quality pipeline |
| `self audit` | 7-stage quality loop on the most recent deliverable |
| `check` | 8-step compliance audit against all rules |
| `audit` | Deep forensic loop — material changes only, continues until no further improvements |

---

### Layer 4: Self-Learning Infrastructure

This is the piece that makes the system compound over time rather than reset every session:

- **Issue Logger:** Every mistake gets captured in a structured format — what happened, why, the fix, the preventive rule, and whether it should be promoted to a permanent rule
- **Same-Turn Lesson Promotion (L2):** When a pattern is detected (same mistake twice), it can be promoted to a rule in the same session — no waiting for a future review cycle
- **Session Learning Log:** Persistent record of all issues and lessons across sessions
- **Bounded Trial Mechanism:** New rules get a trial period with success criteria before becoming permanent — prevents rule bloat from one-off overreactions

**This is a significant extension beyond your current system.** Your Refinement Forge handles periodic optimization, but it doesn't have the structured capture → classify → promote → trial → permanent pipeline.

---

## Part 3: The Incremental Value Summary

### What You Have That I Kept
- Agent-based behavioral enforcement (your core insight)
- ThoughtPad pre-action reasoning (enhanced as Q1)
- Runbook execution (unchanged as Q2)
- Quality Shield multi-pass audit (enhanced as Q3)
- Context continuity (enhanced as L4)
- Periodic optimization (enhanced as L5)
- Domain knowledge accumulation (reframed as L6)

### What You Don't Have That I Built

| Capability | What It Does | Why It Matters |
|-----------|-------------|----------------|
| **Research-Before-Reasoning Gate (R-07)** | Hard gate preventing analysis before live research is complete | Eliminates the #1 AI failure mode: confident answers built on stale or hallucinated data |
| **Source Verification Protocol (R-20)** | Tier 1 claims must be verified at primary vendor source at time of writing | Eliminates the #2 failure mode: citing comparison sites or unfetched URLs as verification |
| **Prompt Optimization Engine (Skill 0)** | Restructures every complex prompt before the AI processes it — classifies the task, extracts intent, builds a problem statement with success criteria | Research suggests prompt formatting can yield significant accuracy improvements. This ensures the first output is near-final. |
| **16-Skill Production Pipeline** | Turn-by-turn quality process: triage → decompose → reason → draft → verify → stress-test → ship | Your system says "audit quality." Mine says "here are the 16 specific steps, in order, with methods for each." |
| **Injection Guard (Skill 2)** | Screens for prompt injection in pasted content | No defense against this in your current system |
| **Uncertainty Calibration (Skill 10)** | Forces the AI to quantify confidence and flag unknowns | Your system doesn't prevent false certainty |
| **Convergence Governor (Skill 11)** | Knows when to stop refining and ship | Prevents both premature delivery and infinite quality loops |
| **Self-Learning Loop** | Structured mistake capture → pattern detection → rule promotion → bounded trial → permanent adoption | Your system optimizes periodically; mine compounds in real-time |
| **Feature Regression Prevention (R-17)** | 8-dimension comparison when updating any deliverable | Prevents silent content loss during revisions — caught after I lost all images in a 31MB PDF that dropped to 158KB |
| **Scalability Checkpoint (Q4)** | Tests every process for repeatability and scale | Not addressed in your system |
| **Risk Assessment Framework (Q5)** | Klein pre-mortem + FMEA scoring + Amazon doors | Not addressed in your system |
| **First-Principles Validation (Q6)** | Strips assumptions before building anything | Not addressed in your system |
| **Long-Context Hygiene (Skill 13)** | Manages context window degradation in long sessions | Not addressed in your system |
| **5 Standing Commands** | Direct control inputs (initialize, run, self audit, check, audit) | Your system uses hooks; mine adds explicit command triggers |

### What the System Acknowledges It Doesn't Solve (Yet)

To be transparent: the system tracks 4 Known Gaps that don't have coverage yet:

- **G-4: Crisis/Chaos Protocol** — No defined behavior for when a session goes sideways with cascading failures
- **G-6: Rule Obsolescence Detection** — No process to proactively retire rules that are no longer relevant
- **G-7: Knowledge Architecture** — No guidance on how to structure and retrieve accumulated domain knowledge at scale
- **G-8: Multi-Operator Knowledge Transfer** — No process for reconciling learnings when two operators work the same system independently (this document is a first step toward closing G-8)

These are registered as open items. They don't diminish what's built — they show the system is self-aware about its own limitations.

---

## Part 4: How This Maps to Claude Code

Your system uses Claude Code hooks — skill files that Claude Code loads and follows. Here's how my system would translate:

### Direct Translation (Drop-In)
These work as Claude Code instruction files with minimal adaptation:

- **The 12 Accelerator Rules (Q1-Q6, L1-L6)** — Already formatted as behavioral rules. Load as system instructions or project rules.
- **R-07 Research Gate** — Add as a hard constraint in Claude Code's project instructions: "Never draft analysis before completing live research."
- **R-20 Source Verification** — Add as a verification protocol Claude Code follows before delivering any claims.
- **The 5 Standing Commands** — Map to Claude Code slash commands or trigger phrases.

### Requires Adaptation
These need architectural thought for Claude Code:

- **The 16-Skill Pipeline** — In my system, these are 4 modular skill files that load based on which phase is active. In Claude Code, they could be project instructions that activate based on task type, or they could be separate agent contexts (quality checks may benefit from separate context windows to avoid anchoring bias).
- **Self-Learning Loop** — Needs a persistent file (like a `session-learning-log.md` in the project) that Claude Code reads at session start and appends to when issues are caught.
- **Feature Regression Prevention** — Needs Claude Code to compare file versions before overwriting, which may require custom tooling.

### Philosophical Difference to Consider
My system is rule-based (behavioral constraints any AI follows). Your system is hook-based (agent-specific behaviors triggered by Claude Code's architecture). Both work. The question for you is whether to:

1. **Absorb the rules into your existing hooks** — map my rules to your existing agent structure (ThoughtPad gets Q1 enhancements, Quality Shield gets the 16-skill pipeline, etc.)
2. **Run them as a parallel layer** — keep your hooks as-is and add my rules as an additional instruction set
3. **Hybrid** — cherry-pick the highest-value additions (R-07, R-20, Skill 0, the self-learning loop) and integrate those into your existing architecture

Option 1 is the cleanest. Option 3 is the fastest to implement.

---

## Part 5: The Skill Files

My system is implemented as 16 saved skill files. Here's the complete inventory with what each contains:

### Operational Skills (8)

| Skill | Version | What It Contains |
|-------|---------|-----------------|
| `marc-ops-framework` | 1.2 | Master framework — 13 directives, 20 rules, 12 Accelerators, 5 commands, skill routing table. The "operating system." |
| `prompt-optimizer` | 1.3 | Skill 0 — prompt optimization engine. Classifies tasks (Six Axes), extracts intent (Seven Questions), builds problem statements with success criteria. |
| `source-verification` | 1.0 | R-20 implementation — claim classification (Tier 1 vs Tier 2), verification levels (Level 1 vs Level 2), red flag patterns. |
| `check-protocol` | 1.0 | CHECK command — 8-step compliance audit (rules, commitments, reasoning log, staleness, file visibility, work quality, rule integrity). |
| `self-audit` | 1.0 | Self audit command — 7-stage quality loop (orient, verify, adversarial test, pre-mortem, revise, share, system learning). |
| `session-bootstrap` | 1.1 | Initialize command — reads operational files, checks for interrupted audits, loads the system, confirms readiness. |
| `deliverable-regression-check` | 1.0 | R-17 implementation — 8-dimension version comparison (images, sections, tables, diagrams, page count, file size, formatting, content). |
| `issue-logger` | 1.1 | R-06 implementation — structured issue capture, severity classification, pattern detection, promotion recommendations. |

### Quality Engine Skills (4)

| Skill | Version | Pipeline Phase | QE Skills Covered |
|-------|---------|---------------|-------------------|
| `qe-strategic-reasoning` | 1.0 | Phase 1: Understand & Lock | Skills 1-3 (Triage, Injection Guard, Context Anchor) |
| `qe-reasoning-engine` | 1.0 | Phases 2-3: Plan, Reason & Draft | Skills 4-6 (Decomposition, Structured Reasoning, Draft Composer) |
| `qe-quality-assurance` | 1.1 | Phases 4-6: Verify, Stress-Test & Ship | Skills 7-12 (Verification, Adversarial, Pre-Mortem, Uncertainty, Convergence, Quality Gate) |
| `qe-system-maintenance` | 1.1 | Conditional & Maintenance | Skills 13-16 (Long-Context, Grounding, Meta-Prompt, LLM-Judge) |

### Supporting Skills (4)

| Skill | Version | Purpose |
|-------|---------|---------|
| `marc-diagram-style` | 1.2 | Visual asset rendering rules (fonts, layout, colors, alignment) |
| `objective-intake` | 1.2 | Pre-Skill 0 orchestration — frames the outcome, selects persona, routes to skills, classifies execution mode |
| `persona-ai-infrastructure-strategist` | 1.0 | Identity persona for AI architecture work |
| `persona-ai-productivity-architect` | 1.0 | Identity persona for tool setup and learning workflows |

---

## Part 6: For Donnie's AI — Analysis Instructions

If you're an AI reading this document (Claude Code, or any other system), here's what to do with it:

1. **Map the 12 Accelerator Rules (Part 2, Layer 1) against whatever rules or skills are currently active in your system.** Identify which of Marc's rules add new capabilities vs. which overlap with existing ones.

2. **Evaluate the 16-Skill Quality Engine pipeline (Part 2, Layer 2) against your current quality process.** The key question: which of the 16 skills address failure modes that your current system doesn't catch?

3. **Assess the self-learning infrastructure (Part 2, Layer 4).** Does your system have structured mistake capture → pattern detection → rule promotion? If not, this is probably the highest-leverage addition.

4. **Prioritize by impact.** Based on Marc's experience, the highest-value additions in order are:
   - R-07 (Research-Before-Reasoning Gate) — eliminates the most common AI failure mode
   - Skill 0 (Prompt Optimization) — largest single quality improvement per output
   - R-20 (Source Verification) — prevents the second most common failure mode
   - The self-learning loop (Issue Logger + L2) — compounds improvement over time
   - The full 16-skill pipeline — comprehensive but heavyweight; implement incrementally

5. **Propose an integration plan** that maps Marc's additions to your existing architecture — whether that's absorbing into existing skills/agents, running as a parallel layer, or a hybrid approach.

---

## How to Use This Document

**For Donnie:** Read Parts 1-3 for the big picture. Part 3 (Incremental Value Summary) is the fastest way to see what's new. Part 4 covers how it translates to your Claude Code setup.

**For Donnie's AI:** Read the full document, then follow the instructions in Part 6. The goal is to produce a concrete integration proposal that identifies which of Marc's additions would add the most value to Donnie's existing system.

**For collaboration:** Marc and Donnie can use this as the baseline for a back-and-forth: Donnie's AI proposes what to adopt, Marc's AI (which built the system) can explain the reasoning behind specific design decisions, and together they converge on a unified system that combines the best of both.

---

*Built on Perplexity Computer across multiple threads and extensive iterative development, starting from Donnie's AI Accelerator foundation. Every rule in this system traces to a specific failure that was caught, analyzed, and promoted to a permanent prevention. The system has been through multiple self-audits and compliance checks. It's not theoretical — it's battle-tested against real work.*
