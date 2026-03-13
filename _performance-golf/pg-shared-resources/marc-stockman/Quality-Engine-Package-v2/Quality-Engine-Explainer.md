# Marc's Quality Engine — What It Is, What It Adds, and How to Use It

**Prepared for:** Mastermind group members (and their AI systems)
**From:** Marc Stockman
**Date:** March 12, 2026
**Version:** 2.0

---

## What This Document Is

This is a comprehensive walkthrough of what I've built on top of Donnie French's AI Accelerator foundation. The goal is for both you and your AI to understand:

1. What Donnie's original system gave me (the baseline)
2. What I added, enhanced, or restructured (the delta)
3. How the pieces fit together as a complete system (the architecture)
4. What's unique here that a standard AI setup doesn't have (the incremental value)

Everything here is platform-agnostic in principle — it works as rules and protocols that any LLM can follow. I built it on Perplexity Computer, but the concepts translate directly to Claude Code, Cursor, or any AI environment that accepts structured instructions.

**What changed from v1.0 (March 6) to v2.0 (March 12):** The system grew significantly in one week — 16 skills became 25, 20 rules became 28, and the enforcement model evolved from behavioral rules alone into a four-tier architecture spanning behavioral constraints, structural gates, event-driven detectors, and context-isolated verification. Those additions are woven throughout this document and called out explicitly.

---

## Part 1: The Baseline — What I Started With

Donnie's system gave me six foundational concepts — each framed as an agent archetype enforcing a specific cognitive discipline. These weren't running software agents; they were design frameworks that defined what good AI behavior looks like:

| Donnie's Agent | What It Does |
|---------------|-------------|
| **ThoughtPad** | Forces the AI to think before acting — structured pre-action reasoning |
| **Runbook Engine** | If a known playbook exists, follow it instead of reinventing |
| **Quality Shield** | Multi-pass quality audit on every output before delivery |
| **Context Guardian** | Maintains context continuity across sessions |
| **Refinement Forge** | Periodic system optimization — refine rules and processes over time |
| **Distinction Engine** / Domain Work Agent | Accumulates domain knowledge over time |

These six foundations are strong behavioral primitives. They enforce discipline. What they set up — and what I built on top of them — is the detailed procedures, production pipeline, self-learning loop, and research enforcement that turn discipline into a repeatable system.

**Note:** This baseline comparison reflects Donnie's system as I understood it when we started working together (around March 2, 2026). If Donnie's system has evolved since then, some of the "Your Equivalent: None" entries below may no longer apply — which would be great, and worth comparing notes on.

---

## Part 2: What I Built — The Full Inventory

### Layer 1: The 12 AI Accelerator Rules (Donnie's 6 → My 12)

I restructured Donnie's 6 agents into 12 rules organized as Quality (Q1–Q6, fire during production) and Learning (L1–L6, fire after production). Here's the mapping:

| Rule | Name | Relationship to Donnie's System |
|------|------|--------------------------------|
| **Q1** | Structured Pre-Action Reasoning | **Enhanced** from ThoughtPad — added domain classification (Cynefin framework), tempo calibration, pre-mortem, and rollback planning |
| **Q2** | Runbook Execution | **Unchanged** — the Runbook Engine, kept as-is. The only rule I didn't touch. |
| **Q3** | Multi-Pass Quality Audit | **Enhanced** from Quality Shield — added visual formatting verification (catches text wrapping, truncation, color contrast) and a "Cascade Share Gate" that verifies files are shared in the same turn they're created |
| **Q4** | Scalability Checkpoint | **Net-new** — "What if this needed to be repeated or scaled?" Vertical, horizontal, and extraction tests. Not explicitly addressed in the original system. |
| **Q5** | Risk Anticipation & Mitigation | **Net-new** — Combines Klein's pre-mortem method ("assume it failed — why?"), FMEA scoring (Severity × Occurrence × Detection, range 1–125), and Amazon's one-way/two-way door framework. Not explicitly addressed in the original system. |
| **Q6** | First-Principles Design & Validation | **Net-new** — Forces decomposition to ground truths before building. Phase 1 strips assumptions; Phase 2 synthesizes from verified foundations. Not explicitly addressed in the original system. |
| **L1** | Post-Action Reflection | **Net-new** — After every deliverable: what worked, what didn't, what would you do differently? Classifies findings as J1 (judgment calls, not errors) vs. J2 (actual errors that need correction). Only J2 feeds into the learning system. The J1/J2 distinction is a net-new capability. |
| **L2** | Same-Turn Lesson Promotion | **Enhanced** — When a mistake is caught: capture it, evaluate if it's a pattern (2+ occurrences), promote to a permanent rule if needed. Added a "bounded trial" mechanism — new rules get a trial period before becoming permanent. |
| **L3** | Mid-Session Staleness Detection | **Net-new** — Flags any artifact not updated in 2+ hours or after 3+ major actions. Includes automated file sweeps. Complements the Context Guardian (which handles cross-session continuity) by catching within-session staleness. |
| **L4** | Context Continuity | **Enhanced** from Context Guardian — added reasoning log currency checks and session-start orientation protocol |
| **L5** | Periodic System Optimization | **Enhanced** from Refinement Forge — added a Rule Integrity Audit that classifies issues as (a) rule missing, (b) rule incomplete, (c) rule not followed, or (d) net-new gap. Each classification has a different response. |
| **L6** | Domain Knowledge Accumulation | **Reframed** from the Distinction Engine / Domain Work Agent — repositioned as an architecturally central vault role, with a triple-save protocol (memory + file + skill) so discoveries survive thread death |

**Net score:** 1 unchanged, 5 enhanced, 1 reframed, 5 net-new. 11 of 12 rules have my fingerprint (92%). The 5 net-new rules (Q4, Q5, Q6, L1, L3) represent capabilities the original system did not have.

---

### Layer 2: The Quality Engine (16-Skill Production Pipeline)

This is the big addition. The Accelerators tell the AI what to do. The Quality Engine tells it exactly how and when to do it, in what order, with what checks.

Think of it like this: the Accelerators are the driver's manual. The Quality Engine is the GPS with turn-by-turn directions.

I built this by commissioning four independent AI research reports (Claude, GPT, Gemini, Perplexity) on how to implement a production-grade quality system, then forensically synthesized their findings into a unified 16-skill pipeline. The synthesis report (`QE-Research-Synthesis-Report.md`) is included in the package — 762 lines of detailed sourcing. The 16 skills are grouped into 4 phases:

#### Phase 1: Strategic Reasoning — "Understand & Lock" (Skills 1–3)

Before any work begins, lock down the problem space.

| Skill | What It Does | Original Equivalent |
|-------|-------------|---------------------|
| **Skill 1: Task Triage & Effort Router** | Classifies the task type and assigns appropriate effort level — not every question deserves a 2-hour analysis | Not explicitly addressed — the original system treats all tasks with similar rigor |
| **Skill 2: Instruction Integrity & Injection Guard** | Screens for prompt injection and instruction manipulation — ensures the AI is following YOUR instructions, not instructions smuggled in through pasted content | Not explicitly addressed — no injection defense in the original system |
| **Skill 3: Context Anchor & Constraint Ledger** | Explicitly documents what we're solving, what we know, what we're assuming, and what the constraints are — prevents silent assumption drift | Partially covered by ThoughtPad, but without the explicit constraint ledger |

#### Phases 2–3: Reasoning Engine — "Plan, Reason & Draft" (Skills 4–6)

The actual thinking happens here. Structured, evidence-based, multi-method.

| Skill | What It Does | Original Equivalent |
|-------|-------------|---------------------|
| **Skill 4: Decomposition & Evidence Plan** | Breaks complex problems into sub-goals with evidence requirements for each — you can't solve what you haven't decomposed | Not a standalone step in the original system |
| **Skill 5: Structured Reasoning Engine** | Applies the right reasoning method for the problem type — Chain-of-Thought for linear problems, Tree-of-Thought for branching decisions, ReAct for problems requiring real-time research | Not a standalone step — reasoning method selection isn't specified |
| **Skill 6: Draft Composer** | Produces the first output following all constraints from Skills 1–5 | Implicit in the original system but not a defined step |

#### Phases 4–6: Quality Assurance — "Verify, Stress-Test & Ship" (Skills 7–12)

Before anything ships, it goes through six quality gates.

| Skill | What It Does | Original Equivalent |
|-------|-------------|---------------------|
| **Skill 7: Verification Operator** | Cross-checks every factual claim against its source — uses Chain-of-Verification (CoVe) methodology | Partially covered by Quality Shield, but without CoVe methodology |
| **Skill 8: Adversarial Critic** | Attacks the output from a hostile skeptic perspective — "What would a critic say? Where are the weak points?" | Not a standalone step — the Quality Shield is constructive, not adversarial |
| **Skill 9: Pre-Mortem & Risk Analyst** | Assumes the deliverable has failed and works backward to figure out why — combines Klein's pre-mortem with FMEA scoring | Not a standalone step — this is the Q5 Accelerator implemented as a pipeline stage |
| **Skill 10: Uncertainty Calibrator** | Forces the AI to quantify its confidence and flag what it doesn't know — prevents false certainty | Not explicitly addressed — no uncertainty quantification in the original system |
| **Skill 11: Convergence Governor** | Determines when quality passes should stop — prevents both premature shipping and infinite refinement loops | Not explicitly addressed — no convergence criteria in the original system |
| **Skill 12: Output Contract & Quality Gate** | Final gate before delivery — verifies all success criteria are met, all files are shared, formatting is correct | Partially covered by Quality Shield's final check |

#### Conditional & Maintenance (Skills 13–16)

These fire when needed, not on every query.

| Skill | What It Does | Original Equivalent |
|-------|-------------|---------------------|
| **Skill 13: Long-Context Hygiene** | Manages context window health in long conversations — prevents the "lost in the middle" attention problem | Not explicitly addressed — context window degradation not handled |
| **Skill 14: Knowledge Grounding** | Ensures external sources are properly validated and integrated — prevents contamination from untrusted inputs | Not a standalone skill in the original system |
| **Skill 15: Meta-Prompt Refiner** | Periodically evaluates and improves the prompts and instructions themselves — the system optimizes its own instructions | Partially covered by Refinement Forge, but not prompt-specific |
| **Skill 16: LLM-as-Judge Evaluator** | Uses the AI to evaluate its own outputs against defined rubrics — structured self-evaluation | Not explicitly addressed — no rubric-based self-evaluation |

---

### Layer 3: The Operational Framework (Directives + Rules + Commands)

On top of the Accelerators and Quality Engine, I built a complete operational framework:

**Directives (D-series):** Non-negotiable behavioral constraints — no autonomous messaging, present options don't decide, ground all claims in live sources, budget not a constraint, portable and teachable, etc.

**Preventive Rules (R-series):** Tactical rules derived from actual mistakes caught during sessions. Each one traces to a specific failure that happened and was promoted to a permanent rule. Key examples:

| Rule | What It Prevents |
|------|-----------------|
| **R-07: Research-Before-Reasoning Gate** | HARD GATE — the AI must complete all live research BEFORE any analysis or drafting. No more confident answers built on stale training data. This is probably the single highest-value rule in the system. Now structurally enforced via Gate 5. |
| **R-17: Feature Regression Prevention** | When updating any file, compare the new version against the old across 8 dimensions (images, sections, tables, diagrams, page count, file size, formatting, content). Prevents the AI from silently dropping content during revisions. Enforced via three structural gates. |
| **R-20: Source Verification Protocol** | Any claim driving a recommendation must be verified at the vendor's primary source page at time of writing — not from a comparison site, not from training data, not from a cached search. |
| **R-26: Acceptance Testing** | Every new or enhanced feature must be tested (happy-path + adversarial + recovery) before marking complete. Prevents all-happy-path test suites that miss failure modes. |
| **R-28: Forensic Intake of Shared Materials** | When any material is shared, read it completely and extract every mechanism before assessing relevance. "Different domain" is never sufficient grounds for dismissal — transferable patterns are the default assumption. |

Rules R-21 through R-28 are all new since v1.0:

- **R-21:** Subagent preference inheritance — standing formatting requirements must be explicitly passed to delegated agents
- **R-22:** Dependency-ordered planning — verify logical dependencies before presenting any next-steps list
- **R-23:** Credential persistence — session credentials saved to file immediately, never left in conversation text alone
- **R-24:** Compaction self-detection + milestone persistence — 7 sub-features enforcing session continuity after context compression
- **R-25:** YAML frontmatter guard — hard gate before every skill file save
- **R-26:** Acceptance testing — three test categories required before any feature is marked complete
- **R-27:** Source-to-section trace-through — new source insights must propagate to all affected sections, not just the source listing
- **R-28:** Forensic intake of shared materials — complete extraction before relevance assessment

**5 Standing Commands:** Direct control inputs I can use at any time:

| Command | What It Does |
|---------|-------------|
| `initialize` | Reads all operational files, loads the system with tiered skill loading (saves ~48% init tokens), confirms readiness |
| `re-initialize` | Delta refresh after context compaction or a break — reloads updated skills, presents what changed |
| `run` | Executes an approved prompt through the full quality pipeline |
| `audit` | Unified audit with convergence loop — loops Passes 1–4 (Verify → Adversarial → Pre-Mortem → Revise) until zero material changes, then produces a Learning Ledger (Learned / Memorialized / Activated) |
| `reflect` | 7-dimension strategic system review: Problem-Solution Fit, Complexity Audit, Context-Load Pragmatism, Blind Spot Scan, Hardening Assessment, Effectiveness Check, Simplification Pass |

**What's different from v1.0:** The old `self audit` and `check` commands are gone — they've been merged into the unified `audit` command (v3.4). Two new commands were added: `re-initialize` handles returning from context compaction, and `reflect` handles the periodic strategic review that was previously ad hoc.

---

### Layer 3 (Extended): Four Enforcement Tiers

This is the biggest structural change since v1.0. The system evolved from purely behavioral rules — written constraints the AI should follow — into a four-tier enforcement model that addresses the core weakness of behavioral rules: they fail when the AI is under context pressure.

| Tier | Mechanism | Example | Failure Mode Addressed |
|------|-----------|---------|----------------------|
| **Tier 1: Behavioral** | Written rules the AI should follow | R-07: "Research before reasoning" | Works when the AI remembers; fails under context pressure |
| **Tier 2: Structural** | Mechanically enforced gates | Gate 5: R-07 auto-check before any draft | Cannot be bypassed — fires automatically at trigger points |
| **Tier 3: Event-Driven** | Detectors that inject guidance at failure moments | Detector #3: fires when creating a file without sharing | Catches failures at the moment they happen, not in post-delivery audit |
| **Tier 4: Context-Isolated** | Subagent verifiers in clean contexts | Fresh-context verification of important deliverables | Eliminates contamination from the reasoning that produced the work |

**10 Structural Gates** (implemented in `structural-gates.md` v1.5):

The gates convert the most frequently violated rules into mechanically enforced checks. They cannot be skipped because they fire at trigger points regardless of AI memory state. Current active gates: R-25 ×2 (frontmatter guard for save + export paths), R-17 ×3 (regression prevention — pre-load, write, post-load), R-24 ×2 (file freshness + post-compaction refresh), R-11 (share-file gate), R-07 (research gate), R-26 (acceptance testing sub-gate).

**8 Event Detectors** at 3 checkpoints (implemented in `event-driven-reminders.md`):

These auto-load at session start and sweep at three checkpoints: before submitting any answer, before marking any task complete, and after every 10 tool calls. Rather than requiring the AI to remember rules, detectors surface them at the exact moment failure is most likely.

**Context-Isolated Checks** (implemented in `context-isolated-checks.md`):

For important deliverables, a subagent verifier runs in a fresh context window. The quality checker has no knowledge of why things were done the way they were — which means it can't be anchored by the same reasoning that produced the flawed output. This is the highest-fidelity quality check in the system.

---

### Layer 4: Self-Learning Infrastructure

This is the piece that makes the system compound over time rather than reset every session:

- **Issue Logger:** Every mistake gets captured in a structured format — what happened, why, the fix, the preventive rule, and whether it should be promoted to a permanent rule
- **Same-Turn Lesson Promotion (L2):** When a pattern is detected (same mistake twice), it can be promoted to a rule in the same session — no waiting for a future review cycle
- **Session Learning Log:** Persistent record of all issues and lessons across sessions (capped at 10 entries per session to prevent bloat)
- **Bounded Trial Mechanism:** New rules get a trial period with success criteria before becoming permanent — prevents rule bloat from one-off overreactions
- **Foundational Finding Protocol:** Triple-save (memory + file + skill) for any validated discovery — ensures findings survive thread death
- **Learning Ledger:** Every `audit` run now produces a mandatory Learning Ledger table (Learned / Memorialized / Activated) that makes the self-learning activity visible rather than silent

**This is a significant extension beyond the original system.** The Refinement Forge handles periodic optimization, but it doesn't have the structured capture → classify → promote → trial → permanent pipeline, nor the audit-integrated Learning Ledger that makes each cycle's output transparent.

---

## Part 3: The Incremental Value Summary

### What the Original System Gave Me (and I Kept)
- Agent-based behavioral enforcement (Donnie's core insight)
- ThoughtPad pre-action reasoning (enhanced as Q1)
- Runbook execution (unchanged as Q2)
- Quality Shield multi-pass audit (enhanced as Q3)
- Context continuity (enhanced as L4)
- Periodic optimization (enhanced as L5)
- Domain knowledge accumulation (reframed as L6)

### What I Built That Wasn't There Before

| Capability | What It Does | Why It Matters |
|-----------|-------------|----------------|
| **Research-Before-Reasoning Gate (R-07)** | Hard gate preventing analysis before live research is complete. Now structurally enforced — cannot be bypassed. | Eliminates the #1 AI failure mode: confident answers built on stale or hallucinated data |
| **Source Verification Protocol (R-20)** | Tier 1 claims must be verified at primary vendor source at time of writing | Eliminates the #2 failure mode: citing comparison sites or unfetched URLs as verification |
| **Prompt Optimization Engine (Skill 0)** | Restructures every complex prompt before the AI processes it — classifies the task (Six Axes), extracts intent (Seven Questions), builds a problem statement with success criteria | Research suggests prompt formatting can yield significant accuracy improvements. Ensures the first output is near-final. |
| **16-Skill Production Pipeline** | Turn-by-turn quality process: triage → decompose → reason → draft → verify → stress-test → ship | The original system says "audit quality." This system says "here are the 16 specific steps, in order, with methods for each." |
| **Injection Guard (Skill 2)** | Screens for prompt injection in pasted content | No defense against this in the original system |
| **Uncertainty Calibration (Skill 10)** | Forces the AI to quantify confidence and flag unknowns | The original system doesn't prevent false certainty |
| **Convergence Governor (Skill 11)** | Knows when to stop refining and ship | Prevents both premature delivery and infinite quality loops |
| **Self-Learning Loop** | Structured mistake capture → pattern detection → rule promotion → bounded trial → permanent adoption → Learning Ledger visibility | The original system optimizes periodically; this system compounds in real-time with every audit |
| **Feature Regression Prevention (R-17)** | 8-dimension comparison when updating any deliverable. Three structural gates enforce it. | Prevents silent content loss during revisions — first caught after a 31MB PDF dropped to 158KB, silently losing all images |
| **Four-Tier Enforcement Model** | Behavioral → Structural → Event-Driven → Context-Isolated | Eliminates the failure mode of behavioral rules: they work when the AI remembers them. Structural gates and event detectors work regardless. |
| **10 Structural Gates** | Mechanically enforced gates at rule trigger points | Rules that previously failed under context pressure now fire automatically |
| **8 Event Detectors** | Auto-injected guidance at the moment of failure | Replaces polling (AI must remember to check) with injection (system detects and surfaces) |
| **Context-Isolated Checks** | Fresh-context subagent verifiers | Eliminates anchoring bias contaminating quality checks |
| **5 Standing Commands** | Direct control inputs (initialize, re-initialize, run, audit, reflect) | Explicit command triggers — not just behavioral expectations |
| **Unified Audit v3.4** | Convergence loop: repeats until zero material changes; produces Learning Ledger on every run | Old system had separate self-audit + check that could each stop after one pass |
| **Session Bootstrap v2.4** | Tiered loading saves ~48% init tokens; handles both fresh init and delta re-initialize | The old v1.1 loaded everything at once; post-compaction behavior was undefined |
| **Scalability Checkpoint (Q4)** | Tests every process for repeatability and scale | Not addressed in the original system |
| **Risk Assessment Framework (Q5)** | Klein pre-mortem + FMEA scoring + Amazon doors | Not addressed in the original system |
| **First-Principles Validation (Q6)** | Strips assumptions before building anything | Not addressed in the original system |
| **Long-Context Hygiene (Skill 13)** | Manages context window degradation in long sessions | Not addressed in the original system |

### What the System Acknowledges It Doesn't Solve (Yet)

To be transparent: the system tracks 4 Known Gaps that don't have coverage yet:

- **G-4: Crisis/Chaos Protocol** — No defined behavior for when a session goes sideways with cascading failures. The ASI-ARCH paper (arXiv 2507.18074) informed the architecture: circuit breaker pattern with anomaly thresholds. Currently handled ad hoc.
- **G-6: Rule Obsolescence Detection** — No process to proactively retire rules that are no longer relevant
- **G-7: Knowledge Architecture** — No guidance on how to structure and retrieve accumulated domain knowledge at scale
- **G-8: Multi-Operator Knowledge Transfer** — No process for reconciling learnings when two operators work the same system independently (this package is a first step toward closing G-8)

These are registered as open items. They don't diminish what's built — they show the system is self-aware about its own limitations.

---

## Part 4: How This Maps to Other AI Platforms

My system is built on Perplexity Computer, but the skills are structured as plain markdown instruction files. Any AI environment that accepts structured instructions can follow them. For step-by-step platform setup instructions (Perplexity Computer, Claude Code, Claude.ai, ChatGPT, Cursor), see the "How to Load This Into Your AI" section in the README. Here's how the architecture translates:

### Direct Translation (Drop-In)

These work as instruction files or project rules with minimal adaptation on any platform:

- **The 12 Accelerator Rules (Q1-Q6, L1-L6)** — Already formatted as behavioral rules. Load as system instructions or project rules.
- **R-07 Research Gate** — Add as a hard constraint: "Never draft analysis before completing live research."
- **R-20 Source Verification** — Add as a verification protocol before delivering any claims.
- **The 5 Standing Commands** — Map to slash commands, trigger phrases, or button-activated workflows depending on your platform.
- **Directives (D-series)** — Load as non-negotiable constraints in any system prompt.

### Requires Adaptation

These need architectural thought for specific platforms:

- **The 16-Skill Pipeline** — In my system, these are 4 modular skill files that load based on which phase is active. On other platforms, they could be project instructions that activate based on task type, or separate agent contexts for quality-check phases (which benefit from separate context windows to avoid anchoring bias — see Tier 4).
- **Self-Learning Loop** — Needs a persistent file (like a `session-learning-log.md`) that loads at session start and is appended to when issues are caught.
- **Feature Regression Prevention** — Needs the AI to compare file versions before overwriting, which may require explicit before/after comparison steps or tooling support.
- **Structural Gates** — These require the AI's execution environment to support conditional logic before certain actions. On platforms without formal tool hooks, this can be approximated by adding pre-action checklists to the relevant rules.

### Implementation Options

Three approaches depending on your system's architecture:

1. **Absorb into existing hooks** — Map my rules to your existing agent structure. ThoughtPad gets Q1 enhancements, Quality Shield gets the 16-skill pipeline, etc. Cleanest result.
2. **Run as a parallel layer** — Keep your existing setup as-is and add my rules as an additional instruction layer. Faster to implement.
3. **Hybrid** — Cherry-pick the highest-value additions (R-07, R-20, Skill 0, the self-learning loop, the unified audit) and integrate those into your architecture. Fastest path to 80% of the value.

Based on my experience, highest-value additions in order: R-07 (Research Gate) → Skill 0 (Prompt Optimization) → R-20 (Source Verification) → the self-learning loop (Issue Logger + L2) → the full 16-skill pipeline.

---

## Part 5: The Skill Files

My system is implemented as a set of active skill files (+ a few deprecated ones). Here's the complete inventory:

### Master Framework (1)

| Skill | Version | What It Contains |
|-------|---------|--------------------|
| `marc-ops-framework` | 3.3 | The operating system — directives, preventive rules, 12 Accelerator rules, standing commands, skill routing table. Load this first, every session. Everything else is a module this framework routes to. |

### Quality Engine Pipeline (4)

| Skill | Version | Pipeline Phase | QE Skills Covered |
|-------|---------|---------------|-------------------|
| `qe-strategic-reasoning` | Current | Phase 1: Understand & Lock | Skills 1–3 (Triage, Injection Guard, Context Anchor) |
| `qe-reasoning-engine` | Current | Phases 2–3: Plan, Reason & Draft | Skills 4–6 (Decomposition, Structured Reasoning, Draft Composer). Integrates Q1, Q5, Q6 Accelerators. |
| `qe-quality-assurance` | Current | Phases 4–6: Verify, Stress-Test & Ship | Skills 7–12 (Verification/CoVe, Adversarial, Pre-Mortem/FMEA, Uncertainty, Convergence, Quality Gate) |
| `qe-system-maintenance` | Current | Conditional & Maintenance | Skills 13–16 (Long-Context, Grounding, Meta-Prompt, LLM-Judge). Integrates L3, L4, L5 Accelerators. |

### Operational Skills (13)

| Skill | Version | Trigger | What It Contains |
|-------|---------|---------|--------------------|
| `audit` | 3.4 | "audit" or "check" | Unified audit: Step 0 orientation → Pre-Flight (5 gates) → convergence loop (Passes 1–4 until zero material changes) → Pass 5 (System Learning + Learning Ledger) → Pass 6 (Share). Every audit produces a mandatory Learning Ledger (Learned / Memorialized / Activated). |
| `session-bootstrap` | 2.4 | "initialize" or "re-initialize" | Session start with tiered loading. Tier 1 loads immediately (framework + event detectors); Tier 2 defers on-demand. Also handles delta re-initialize after compaction. |
| `prompt-optimizer` | Current | Complex/multi-step tasks | Skill 0 — classifies tasks (Six Axes), extracts intent (Seven Questions), builds optimized problem statements with success criteria. Presents at three tiers (silent/light/full). |
| `source-verification` | 1.0 | Research, analysis, document creation | R-20 implementation — classifies claims as Tier 1 (primary source required) or Tier 2 (secondary acceptable). Prevents citing comparison sites as verification. |
| `issue-logger` | 1.2 | Corrections, audit findings, errors | R-06 implementation — structured issue capture (what/why/fix/rule), severity classification, pattern detection, promotion recommendations. The learning intake mechanism. |
| `deliverable-regression-check` | 1.0 | Any file revision or update | R-17 implementation — 8-dimension comparison (images, sections, tables, diagrams, page count, file size, formatting, content). Runs BEFORE any file is shared. |
| `foundational-finding-protocol` | 1.0 | Validated discoveries | L6 implementation — triple-save protocol (memory + file + skill) ensures foundational findings survive thread death. |
| `marc-diagram-style` | 1.2 | Creating visual assets | 15 rendering rules — font sizes, brand colors, layout, alignment, storytelling, self-audit checklist. |
| `thread-resuscitation` | 1.0 | Dead thread recovery | 6-step recovery: gather fragments → reconstruct timeline → identify losses → build master state → verify with user → activate. Includes 5 recovery patterns. |
| `reflect` | 1.1 | "reflect" | 7-dimension strategic system review. Produces proposals table with Blast Radius, Ripple Risk, Reversibility, and Sequencing. Suggested proactively after every 3–5 significant system changes. |
| `structural-gates` | 1.5 | Rule-to-structure conversion | 10 active gates across 4 enforcement tiers. Converts behavioral rules to mechanically enforced checks. Framework for adding new gates. |
| `event-driven-reminders` | 1.0 | Auto-loads at session start | 8 event detectors that fire at natural decision points, injecting guidance at the moment of failure. Sweeps at 3 checkpoints: before submit, before task complete, after every 10 tool calls. |
| `context-isolated-checks` | 1.0 | Important deliverables | Spawns subagent verifiers with fresh context windows. Quality checks aren't contaminated by the reasoning that produced the work. 4-step protocol with convergence. |

### Session Continuity (1)

| Skill | Version | What It Contains |
|-------|---------|--------------------|
| `milestone-persistence` | 1.0 | R-24 implementation — 7 sub-features: compaction self-detection, milestone file updates, checkpoint gates, staleness alarm, correction checkpoint. Prevents session state loss across context compactions. |

### Orchestration & Context (3)

| Skill | Version | Purpose |
|-------|---------|---------|
| `objective-intake` | 2.0 | Pre-Skill 0 orchestration — frames the outcome, selects persona, routes to appropriate skills, classifies execution mode. Runs between session bootstrap and Skill 0. |
| `persona-ai-infrastructure-strategist` | 1.0 | Identity persona for AI architecture work. Sets the AI's role as an infrastructure strategist operating at both architecture and implementation levels. |
| `persona-ai-productivity-architect` | 1.0 | Identity persona for tool setup and learning workflows. Covers four phases: technical foundation, guided mastery, force multiplication, intelligence feed. |

### Utility Skills (3)

| Skill | Version | Purpose |
|-------|---------|---------|
| `session-auth-api-access` | Current | Technique for accessing web apps (Claude, ChatGPT, Gemini) programmatically using session cookies as Bearer tokens. Covers cookie export, TLS fingerprint bypass, endpoint discovery. |
| `creative-bypass` | 2.1 | Relentless problem-solving disposition. Phase 0–4 framework: Practitioner Intelligence → Solution Space Enumeration → Assumption Testing → Relentless Execution → No Premature Acceptance. Anti-rationalization rule. |
| `perplexity-capabilities` | 1.2 | Authoritative inventory of Perplexity Computer capabilities. 5-step enforcement protocol against false "I can't" claims. Includes correction history for accountability. |

### Research Infrastructure (1)

| Skill | Version | Purpose |
|-------|---------|---------|
| `multi-llm-research-orchestration` | Current | Dispatches research queries to Claude, ChatGPT, Gemini, and Perplexity in parallel (Tier 1: standard chat, Tier 2: deep research). Synthesizes results into a unified report. Used for the research synthesis that built this system. |

### Deprecated (2)

| Skill | Status | Why |
|-------|--------|-----|
| `check-protocol` | DEPRECATED | Merged into `audit` v3.0 as the Pre-Flight phase. All "check" trigger words now route to the unified audit command. |
| `self-audit` | DEPRECATED | Merged into `audit` v3.0. The old 7-stage single-pass loop is now subsumed by the convergence loop + Learning Ledger. |

**v1.0 → v2.0 change note:** `self-audit` (7-stage quality loop) and `check-protocol` (8-step compliance audit) were both standalone commands in v1.0. Both are now subsumed into the unified `audit` v3.4, which runs both their functions plus the convergence loop and Learning Ledger in a single integrated pass.

---

## Part 6: For Your AI — Analysis Instructions

If you are an AI system reading this document (Claude, Claude Code, GPT-4o, Gemini, or any LLM-based assistant), here's what to do with it:

### Step 1: Map Against Your Current System

Map the 12 Accelerator Rules (Part 2, Layer 1) against whatever rules or behavioral instructions are currently active in your setup. For each rule, classify it as:
- **Already covered** — your system has this (name the specific mechanism)
- **Partially covered** — your system has a related behavior but without this rule's specific method or rigor
- **Net-new** — your system doesn't have this at all

Do the same for the 16-Skill Quality Engine pipeline (Part 2, Layer 2). The key question: which of the 16 skills address failure modes that your current quality process doesn't catch?

### Step 2: Assess the Four Enforcement Tiers

The evolution from behavioral rules (Tier 1) to structural gates (Tier 2), event detectors (Tier 3), and context-isolated checks (Tier 4) is the most important architectural insight in v2.0. Ask honestly: does your current system have anything at Tiers 2, 3, or 4? Or is it purely behavioral (Tier 1)?

If your system is Tier 1 only, behavioral rules work until context pressure causes the AI to forget them. That's when the most critical rules — R-07, R-11, R-17 — fail in practice. Structural gates and event detectors are the answer to that specific failure mode.

### Step 3: Assess the Self-Learning Infrastructure

Does your system have structured mistake capture → pattern detection → rule promotion? If not, consider: the Learning Ledger (what every audit run produces) makes self-improvement visible and auditable. Without it, system improvement is ad hoc. Every audit run produces a table showing what was Learned, what was Memorialized to a rule, and what was Activated as a new gate.

### Step 4: Prioritize by Impact

Based on my experience, highest-value additions in order:
1. **R-07 (Research-Before-Reasoning Gate)** — eliminates the most common AI failure mode (confident answers from stale data). Structural enforcement makes this bulletproof.
2. **Skill 0 (Prompt Optimization)** — largest single quality improvement per output. Restructuring the prompt before processing is worth more than any post-hoc audit.
3. **R-20 (Source Verification)** — prevents the second most common failure mode (citing unverified sources as if they were verified)
4. **The self-learning loop (Issue Logger + L2 + Learning Ledger)** — compounds improvement over time; every session makes the system stronger
5. **The full 16-skill pipeline** — comprehensive but heavyweight; implement incrementally starting with Phase 1 (Strategic Reasoning)
6. **Structural gates (Tier 2)** — highest leverage for rules that are frequently forgotten under context pressure
7. **Unified audit v3.4** — the convergence loop guarantee (won't stop until clean) and the Learning Ledger visibility are both significant advances over a single-pass audit

### Step 5: Propose an Integration Plan

Produce a concrete integration proposal that identifies:
- Which additions add genuine new capability vs. overlap with what your system already does
- Which of the three implementation approaches (absorb / parallel layer / hybrid) fits your architecture
- What the first three things are to implement, in dependency order

The goal is not to wholesale replace your current system — it's to identify the highest-leverage additions and integrate them cleanly.

---

## How to Use This Document

**For mastermind members:** Read Parts 1–3 for the big picture. Part 3 (Incremental Value Summary) is the fastest way to see what's new since your AI baseline. Part 4 covers how it translates to your specific platform.

**For your AI system:** Read the full document, then follow the analysis instructions in Part 6. The goal is a concrete integration proposal — not a summary of what Marc built, but a map of what's worth adding to your own setup and in what order.

**For collaboration:** Use this as the baseline for a back-and-forth. Your AI proposes what to adopt; Marc's system (which built and stress-tested all of this) can explain the reasoning behind specific design decisions. Together, you converge on a unified system that combines the best of both.

**Adversarial note:** This system was reviewed adversarially by Fran Rengel before being shared with the group. Fran's review identified genuine strengths and real blind spots. The blind spots are registered in the Known Gaps section — they aren't hidden. This system is designed to improve through honest critique, not through reassurance.

---

*Built on Perplexity Computer across multiple threads and extensive iterative development, starting from Donnie French's AI Accelerator foundation. Every rule in this system traces to a specific failure that was caught, analyzed, and promoted to a permanent prevention. The system has been through 20+ audits, multiple reflects, an independent adversarial review by Fran Rengel, and integration of external research (ASI-ARCH arXiv 2507.18074, OpenDev framework, "Agents of Chaos" paper). It is battle-tested against real work across 10+ days of intensive development.*

*v1.0: March 6, 2026 — 16 skills, 20 rules, behavioral enforcement only*
*v2.0: March 12, 2026 — Full skill library, comprehensive rule set, four-tier enforcement model (behavioral + structural + event-driven + context-isolated). See Skill-Registry.md for exact current counts.*
