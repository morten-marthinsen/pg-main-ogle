# The Quality Engine 3.0

**Version:** 3.0 | March 15, 2026

## Intro

This document explains how the Quality Engine works — its architecture, its core mechanisms, and how they connect — so that practitioners can extract the foundational discoveries and incorporate them into their own AI systems.

## What Changed: QE 2.0 to 3.0

The QE 2.0 was the full system package you reviewed last round (25 skills, 28 rules, 9 structural gates). Based on that feedback — 42 findings across 3 reviewers, 4 independent LLM evaluations (Claude, GPT, Gemini, Perplexity), and 2 audit cycles — here are the strategic upgrades in 3.0:

| # | Upgrade | What Changed | Why It Matters |
|---|---------|-------------|----------------|
| 1 | **"What QE Is and Isn't" section** | New section defining scope tiers (L1 prompt-level, L2 session-level, L3 agent-harness), implementation levels, permanence honesty, and stated assumptions | Addresses the central feedback that the QE didn't clearly define its boundaries or acknowledge its limitations |
| 2 | **Architectural overhaul** | Added Layer 0 (Infrastructure & Observability), L3→L1 feedback arrow, cross-cutting mechanisms note | Fixes the structural gap that multiple reviewers flagged: the architecture diagram didn't show how research feeds the entire pipeline |
| 3 | **Material change taxonomy** | Defined 4 categories of material change + iteration cap (default 3) for the Convergence Loop | Addresses the "when do you stop looping?" question that every reviewer raised |
| 4 | **Evidence Typology labels** | All 15 Research Substantiation blocks now carry explicit evidence type labels: empirical, analytical, practitioner, theoretical, or analogical | Addresses the citation quality concern — readers can now see at a glance what kind of evidence backs each mechanism |
| 5 | **QE Scoreboard** | New "Measuring QE Health" section with 5 quantitative metrics + Eval Case Bank | Addresses the measurement gap: previously there was no way to know if the QE was actually working |
| 6 | **Templates + Worked Example** | 6 practitioner templates + a full end-to-end worked example (competitive analysis task) | Addresses accessibility: the 2.0 described mechanisms but didn't show them in action |
| 7 | **Task-Type Scaling** | New section with task-type decision tree + 3-mechanism floor | Addresses "does this scale to simple tasks?" — now has explicit guidance for when to use light vs. full QE |
| 8 | **Getting Started overhaul** | 4 implementation tiers with transition criteria, mechanism dependency graph, cherry-pick warning | Addresses the onboarding gap: previously no clear path from "I read this" to "I'm using this" |
| 9 | **Kill Criteria strengthened** | Default thresholds table, kill governance model, 4 remediation paths | Addresses the escalation-of-commitment problem flagged by multiple reviewers |
| 10 | **Competitive Simulation** | New mechanism chaining Arena Deliberation with strategy optimization | Addresses the gap between "is this being executed well?" and "is this the right strategy?" |

## The Problem

AI's first answer is usually good — close enough to look right, far enough from great to need significant rework. Hours of back-and-forth follow: clarifying, correcting, pushing deeper. The productivity gains AI promised get burned in the process.

So a quality system gets built to improve that first shot. Rules are added, checks are put in place, and the output does get better — the ball moves from the 20-yard line to the 5. But then the failure mode landmines start detonating. The AI claims it verified something it never checked. It follows instructions for three turns, then quietly stops. It fabricates sources, invents statistics, says "done" when it's not. Even with a good system in place, the AI keeps finding ways to work around the rules. Those last 5 yards feel impossible, because the failures aren't random. They're structural.

## The Solution

The Quality Engine makes those last 5 yards disappear. Sources get verified because the system blocks drafting until research is done. Rules get followed because they're enforced by mechanical gates, not good intentions. When something slips through, the system catches it, classifies the root cause, and permanently patches the gap so that class of failure never recurs.

But what makes the Quality Engine fundamentally different is that it learns. Every failure it catches feeds into a self-learning loop that permanently improves the system. The first session moves the ball from the 20 to the 5. The tenth session, it's on the 2. By the fiftieth, it's on the 1 — and it stays there. The system gets closer to the goal line on the first shot, every time, because every session leaves it smarter than the last. The only job left for the human is to use judgment to help the final push across the goal line for a touchdown.

## What Is the Quality Engine?

The Quality Engine is a system of interlocking mechanisms — building blocks — that structurally improve AI output quality. Not by hoping the AI does better, but by embedding enforcement directly into how AI sessions operate.

Three things make it different from "just writing better prompts":

- **It's structural, not aspirational.** The mechanisms aren't suggestions the AI might follow. They're gates that block the AI from proceeding until quality checks pass. The difference between "you should verify your sources" and "you cannot move forward until your sources are verified" is the difference between a guideline and an enforcement mechanism.

- **It compounds over time.** Every mistake the system catches feeds into a learning loop that permanently improves the system's behavior. A failure that happens once gets logged. A failure that repeats becomes a rule. A rule that keeps getting violated becomes a mechanical gate. The system gets harder to break with every session.

- **It's platform-agnostic.** The Quality Engine is built as a building code, not a construction manual. A building code says "the structure must withstand X load." A construction manual says "use these specific materials and methods." The QE defines the what and the why. You implement the how in whatever AI tool you use — Perplexity, Claude, ChatGPT, Cursor, or anything else.

The system was designed, tested, and refined across hundreds of real work sessions. Every mechanism exists because a specific failure happened, was analyzed, and produced a structural fix that prevents that class of failure from recurring.

### Foundational Sources

The Quality Engine was built from multiple converging sources:

- **100+ years of human quality methodology** — pre-mortem analysis, red teaming, wargaming, scenario planning, convergence testing
- **Published AI agent research** — [Anthropic](https://www.anthropic.com/research/building-effective-agents), [Google](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), [Manus](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus), [OpenAI](https://cdn.openai.com/business/agent-partner-toolkit/a-practical-guide-to-building-agents.pdf), [NVIDIA](https://arxiv.org/abs/2305.16291), and independent researchers on context engineering, agent architecture, and quality enforcement
- **AI Mastermind Collective practitioners** — Tony Flores (arena deliberation, anti-degradation protocols), Rich Schefren (context isolation, translation stack, pipeline failure analysis), Ben Marcoux (math-of-agents compounding analysis), Donnie French (production-system architecture)
- **Real-world validation** — independently confirmed when Marc Stockman's financial model built in Excel over 7 sessions produced the same quality principles without exposure to the formal QE

### How to Use These Building Blocks

The QE is designed as a set of independent building blocks, not a monolithic system you adopt wholesale. Each mechanism works on its own. Each one is more powerful when combined with others. You can start with one or two, prove they work in your system, and add more as you see the value.

The key distinction the QE makes is between behavioral rules (instructions the AI is told to follow) and structural enforcement (mechanisms that physically prevent the AI from proceeding without compliance). Most AI quality systems are purely behavioral — and behavioral rules degrade under pressure. The QE's building blocks include both the rules and the enforcement infrastructure that keeps them working.

## What QE Is and Isn't

Before diving into implementation, it's worth being honest about what the Quality Engine can and can't do — and what it assumes about your environment.

### Scope: What QE Covers

The QE addresses a specific problem: AI output quality degrades under pressure, across long sessions, and over time — even when the user writes excellent prompts. It solves this with structural mechanisms that enforce quality regardless of whether the AI "remembers" to be careful.

What it does NOT address: model selection, fine-tuning, training data quality, or infrastructure reliability. Those are upstream problems. The QE assumes you've chosen a capable foundation model and focuses on what happens between your prompt and the AI's output.

### Implementation Levels: From Prompt-Only to Agent Harness

Not all enforcement is equal. When the QE describes mechanisms as "gates" or "enforcement," the actual enforcement strength depends on your implementation level:

| Level | How It Works | Enforcement Strength | Who This Is For |
|-------|-------------|---------------------|----------------|
| **L1: Prompt-Only** | Instructions in your system prompt or conversation. The AI is told to follow rules. | Self-policing — the AI follows the rule because it's instructed to, with an audit trail to verify compliance. | Anyone using any AI tool. No setup required beyond writing the instructions. |
| **L2: Prompt + Files** | Instructions plus persistent files that track state across sessions (logs, registries, checklists). The AI reads and writes to these files as part of its workflow. | Self-policing with external memory — compliance is auditable because the files persist even when conversation context is lost. | Practitioners who want continuity across sessions. Requires file access in your AI tool. |
| **L3: Agent Harness** | Programmatic enforcement via lifecycle hooks, automated checks, and code-level gates. The AI literally cannot proceed past a gate without satisfying the check. | Mechanical enforcement — the system blocks non-compliant actions regardless of what the AI "decides." | Teams building AI agent infrastructure. Requires engineering investment. |

**Why this distinction matters:** When this document says "hard gate," it means the mechanism is designed as a hard gate. At L1 (prompt-only), a "hard gate" is enforced by explicit instructions and audit-trail verification — the AI is told it cannot proceed, and subsequent checks verify it didn't. At L3 (agent harness), the same gate is enforced by code that literally blocks the action. Both are valid implementations of the same mechanism. The enforcement is real at every level — it just gets mechanically stronger as you move up.

This is an honest distinction. The QE does not claim that prompt-level instructions are equivalent to programmatic enforcement. They aren't. But prompt-level enforcement, when combined with convergence-based auditing, catches the vast majority of violations — and it's available to everyone, today, on any platform.

### What QE Assumes

- **A capable foundation model.** The QE works with current frontier models (GPT-4+, Claude 3+, Gemini Pro+, etc.). It has not been tested with smaller or fine-tuned models, where behavioral instruction-following may be less reliable.
- **Session-based interaction.** The mechanisms assume you're working with an AI in conversation sessions, not batch processing or automated pipelines (though the principles transfer).
- **A human in the loop.** Several mechanisms (rule promotion, kill criteria governance, strategic decisions) require human judgment. The QE is not an autonomous quality system — it's a human-AI quality system.
- **Willingness to invest in process.** The QE adds overhead. That overhead pays for itself many times over in reduced rework, but it's real. Start with the 3 core mechanisms and expand only when you see the value.

## Getting Started

You don't need to implement all 15 mechanisms to get value. Here's a suggested progression organized into four tiers, with dependencies and transition criteria.

### Tier 1: The Core Three (Start Here)

These three mechanisms deliver the most value with the least setup. Start here and stay here for at least 2 weeks before adding more.

- **Research Gate (#3)** — stop the AI from analyzing from memory
- **Success Criteria Lock (#5)** — define "done" before starting
- **Convergence Loop (#6)** — check until the work stabilizes, not just once

**Transition criteria for Tier 2:** You're ready to move on when you've used all three on 5+ tasks, you can see the difference in output quality, and you've started noticing recurring issue types (the same kind of error keeps coming back).

### Tier 2: The Learning System

These mechanisms turn your experience into permanent improvements. They depend on Tier 1 being active — there's nothing to classify or promote if you aren't catching issues through the Convergence Loop.

- **Issue Classification Pipeline (#10)** — start capturing what goes wrong
   - Depends on: Convergence Loop (produces the findings to classify)
- **Progressive Rule Promotion (#12)** — turn patterns into rules
   - Depends on: Issue Classification (identifies the patterns worth promoting)
- **Learning Ledger (#9)** — make learning visible and accountable
   - Depends on: Issue Classification + Rule Promotion (produces the entries)

**Transition criteria for Tier 3:** You're ready when you have 5+ entries in your issue log, you've promoted at least 1 lesson into a standing rule, and you've experienced a recurring error class (same type of mistake happening 3+ times).

### Tier 3: Structural Enforcement

These mechanisms convert the learning system's output into mechanical enforcement. They require Tier 2's learning loop to identify which rules need gates.

- **Structural Gates (#1)** — convert your most-violated rules into mechanical checks
   - Depends on: Issue Classification (identifies class-c violations that need gating)
- **Context Efficiency Discipline (#2)** — budget your context window
   - Independent — can be added at any tier, but becomes critical as your rule set grows

**Transition criteria for Tier 4:** You're comfortable with gates and context management, and you're working on tasks where multiple perspectives, source verification depth, or simulation testing would add material value.

### Tier 4: Advanced Mechanisms

These mechanisms add depth for high-stakes and complex work. They don't depend on each other but all benefit from the foundation of Tiers 1-3.

- **Arena Deliberation (#8)** — multi-perspective evaluation for strategic decisions
- **Source Verification Protocol (#7)** — primary source verification for critical claims
- **Forensic Intake (#11)** — extract mechanisms before judging relevance
- **Pre-Action Reasoning (#4)** — structured thinking before execution
- **Operational Simulation (#13)** — test new mechanisms before deployment
- **Kill Criteria (#14)** — pre-define when to stop or redirect, not just when to continue
- **Success-Pattern Tracking (#15)** — learn from what works, not just what fails

Note: Pre-Action Reasoning (#4) and Kill Criteria (#14) provide high value early. If your work is consistently strategic or complex, consider adding them alongside Tier 2.

### Mechanism Dependencies

The diagram below shows which mechanisms depend on which. Arrows mean "produces input for" or "requires output from."

```
Tier 1 (Foundation):
  Research Gate ───────────┐
  Success Criteria Lock ────┤───▶ Convergence Loop
  Pre-Action Reasoning ─────┘        │
                                     │ (produces findings)
                                     ▼
Tier 2 (Learning):          Issue Classification
                                     │
                              ┌──────┼──────┐
                              ▼      ▼      ▼
                          Rule    Learning  Success-Pattern
                        Promotion  Ledger   Tracking
                              │
                              ▼ (3+ class-c violations)
Tier 3 (Enforcement):  Structural Gates
                        Context Efficiency (independent)

Tier 4 (Advanced):      Arena, Source Verification, Forensic Intake,
                        Op Simulation, Kill Criteria
                        (all benefit from Tiers 1-3 but work independently)
```

**Key insight:** Don't cherry-pick advanced mechanisms without the foundation. Arena Deliberation without a Convergence Loop means the deliberation output never gets stress-tested. Source Verification without Issue Classification means verification failures don't feed the learning system. The tiers exist because the mechanisms are designed to reinforce each other.

Each mechanism works independently. Each one is more effective when combined with the others. The order above reflects where the most value is for the least effort.

## How the Mechanisms Compound

The real power of the Quality Engine isn't in any single mechanism — it's in how they reinforce each other.

**Example: A factual error in a report.**

Without the QE: The error ships. Maybe the user catches it, maybe they don't.

With the QE, the error hits multiple defenses:
1. **Research Gate** (#3) required live sources before the report was drafted — reducing the chance of the error existing in the first place
2. **Convergence Loop** (#6) caught the error during the Verify pass and fixed it
3. But suppose it slipped through. After delivery, someone catches it.
4. **Issue Classification** (#10) captures it: "Factual error in report, root cause was secondary source not verified against primary"
5. The issue is classified as **(b) — Source Verification rule exists but didn't cover this scenario**
6. **Progressive Rule Promotion** (#12) drafts a patch to the Source Verification mechanism
7. **Learning Ledger** (#9) records: "Learned that secondary source diverged from primary. Memorialized in session log. Activated as patch to Source Verification."
8. If this class of error repeats 3+ times, **Structural Gates** (#1) convert the updated Source Verification rule into mechanical enforcement — a hard gate that blocks the action automatically

One error → caught → classified → patched → and if the pattern repeats, enforced mechanically. The system is now harder to break in that specific way. Repeat this hundreds of times and the system becomes very robust.

**Example: Kill Criteria preventing escalation of commitment.**

A complex deliverable enters its fourth convergence loop. Each loop finds small issues and fixes them, but the fixes keep introducing new small issues. Without Kill Criteria, this continues indefinitely — each pass "finds something," so the loop keeps going.

With Kill Criteria (#14) informed by Success-Pattern Tracking (#15), the system knows: "Deliverables of this type historically converge in 2-3 loops. Four loops means the approach has a structural problem, not a polish problem." The kill threshold fires. Instead of loop five, the system stops and reassesses — the right call, because the underlying approach needed to change, not be refined further.

**The Compounding Effect:**
Each mechanism individually adds some quality. Together, they create overlapping defenses where a failure at one layer gets caught by another. The Learning Loop ensures that every failure that does get through makes the system stronger. And Success-Pattern Tracking ensures that what works gets replicated, not just what fails gets prevented. This is why the system improves over time rather than degrading — the learning is structural, not just aspirational.

## Scaling QE to Different Task Types

Not every task needs the full Quality Engine. A quick factual lookup doesn't need a convergence loop. A high-stakes external deliverable needs everything. The decision tree below helps practitioners match QE intensity to task type.

### Task-Type Decision Tree

**Step 1: Classify the task.**

| Task Type | Description | Examples |
|-----------|------------|----------|
| **Quick lookup** | Simple factual question, no analysis | "What's the current price of X?" "When was Y founded?" |
| **Routine production** | Standard deliverable, familiar format | Weekly report, status update, meeting summary |
| **Strategic / analytical** | Complex analysis, unfamiliar territory, informs decisions | Competitive analysis, market research, architecture proposal |
| **High-stakes external** | Will be shared outside your team, consequences of error are high | Client deliverable, board presentation, legal document |
| **Creative / generative** | Ideation, brainstorming, first drafts where exploration matters more than precision | Campaign concepts, naming exercises, vision documents |
| **Emergency / deadline** | Time-constrained, need something good enough fast | Incident response, same-day request, fire drill |

**Step 2: Apply the right mechanisms.**

| Mechanism | Quick Lookup | Routine | Strategic | High-Stakes | Creative | Emergency |
|-----------|:-----------:|:-------:|:---------:|:-----------:|:--------:|:---------:|
| Research Gate (#3) | Sufficient for task | Yes | Yes (deep) | Yes (deep) | Optional | Yes (rapid) |
| Success Criteria (#5) | Skip | Brief | Full | Full + kill criteria | Loose | Brief |
| Convergence Loop (#6) | Skip | 1 loop max | Full (up to 3) | Full (up to 4) | 1 loop | 1 loop |
| Pre-Action Reasoning (#4) | Skip | Abbreviated | Full | Full | Abbreviated | Skip |
| Source Verification (#7) | If claim is high-stakes | For key claims | Full | Full + primary sources | Skip | For key claims |
| Arena Deliberation (#8) | Skip | Skip | If stakes warrant | Yes | Optional | Skip |
| Issue Classification (#10) | Skip | If issue found | Yes | Yes | If issue found | Post-incident |
| Learning Ledger (#9) | Skip | Brief | Full | Full | Brief | Post-incident |

**The minimum viable QE (3-mechanism floor):**
Even for emergency and time-constrained tasks, these three mechanisms should always fire:
1. **Research Gate** — even a rapid search is better than memory
2. **Success Criteria** — even a one-line definition of "done" prevents scope drift
3. **One convergence pass** — even a single verify-attack-revise cycle catches obvious errors

Everything else scales with the task. The decision tree is a guide, not a mandate — use judgment. But when in doubt, lean toward more QE rather than less. The overhead of an unnecessary convergence loop is 15 minutes. The cost of shipping an error in a high-stakes deliverable is days of rework.

## The Architecture

The Quality Engine operates in three active layers plus a foundation layer. Each layer serves a different purpose, and they work together as a system. Critically, the learning in Layer 3 feeds back into Layer 1 — discoveries become rules, rules become gates, and the system gets structurally harder to break over time.

```
┌─────────────────────────────────────────────────────┐
│  LAYER 1: BEHAVIORAL GOVERNANCE                      │
│  Always-on rules that govern every interaction        │
│                                                      │
│  Mechanisms: Structural Gates,                       │
│  Context Efficiency Discipline                       │
├─────────────────────────────────────────────────────┤
│  LAYER 2: PRODUCTION PIPELINE                        │
│  Every substantial deliverable passes through         │
│  a structured quality pipeline                       │
│                                                      │
│  Mechanisms: Research Gate, Pre-Action Reasoning,    │
│  Success Criteria Lock, Convergence Loop,            │
│  Source Verification, Arena Deliberation             │
├─────────────────────────────────────────────────────┤
│  LAYER 3: LEARNING LOOP                       ▲      │
│  Turns every session's mistakes into permanent │      │
│  system improvements                           │      │
│                                                │      │
│  Mechanisms: Learning Ledger, Issue Classification,  │
│  Progressive Rule Promotion, Forensic Intake,        │
│  Operational Simulation, Success-Pattern Tracking,   │
│  Kill Criteria                          │            │
│                                         │            │
│  L3 → L1 Feedback: Promoted rules and   │            │
│  structural gates flow UP to Layer 1 ────┘            │
├─────────────────────────────────────────────────────┤
│  LAYER 0: INFRASTRUCTURE & OBSERVABILITY (optional)   │
│  The foundation that enables mechanical enforcement   │
│                                                      │
│  File persistence, session state management,         │
│  context window monitoring, lifecycle hooks           │
│                                                      │
│  Not a QE mechanism — a prerequisite. Optional for   │
│  L1 prompt-only. Required for L3 agent harness.      │
└─────────────────────────────────────────────────────┘
```

**Cross-cutting mechanisms:** Some mechanisms operate across layer boundaries. Kill Criteria (#14) lives in Layer 3 (it's part of the learning system) but fires during Layer 2 (production pipeline) to stop runaway convergence loops. Structural Gates (#1) live in Layer 1 (governance) but are created by Layer 3 (when the learning loop identifies rules that need mechanical enforcement). This cross-cutting behavior is by design — the layers are not silos.

### Layer 1: Behavioral Governance — "The Constitution"

These are always active. They don't wait for a specific task or trigger — they govern how the AI behaves in every interaction, every session. Think of them as the operating system that runs underneath everything else.

**What Lives Here:**
- Standing rules and directives that the AI follows at all times
- Quality accelerators (think before you act, check your work, anticipate risks)
- Learning accelerators (reflect after action, detect staleness, accumulate domain knowledge)
- Structural gates that mechanically enforce the most critical rules

**Why It Matters:**
Research from multiple independent sources ([Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), [Manus](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus), [HumanLayer](https://www.humanlayer.dev/blog/writing-a-good-claude-md), [OpenDev](https://arxiv.org/pdf/2603.05344)) converges on the same finding: behavioral rules placed in an AI's system prompt are the foundational quality control mechanism. But they degrade under pressure — long sessions, large context windows, and complex tasks all cause the AI to quietly stop following its own rules. Layer 1 is where you put the rules. Layers 2 and 3 are what keep the AI actually following them.

### Layer 2: Production Pipeline — "The Laws"

Every substantial piece of work passes through a structured pipeline with gates between phases. The pipeline ensures that research happens before analysis, that success criteria exist before work begins, that output is verified before delivery, and that quality checks run in a convergence loop (not a single pass).

**The Six Phases:**

```
Research  →  Understand  →  Plan & Draft  →  Verify  →  Stress-Test  →  Ship
   │            │               │              │            │             │
   │            │               │              │            │             │
Research    Pre-Action       Success        Source      Convergence    Output
  Gate      Reasoning       Criteria       Verify         Loop       Contract
                              Lock
```

Phase 1 (Research Gate) prevents the single most common AI failure: analyzing from memory instead of current information. The AI must ground itself in live sources before forming any conclusions.

Phases 4-5 (Verify and Stress-Test) are where the Convergence Loop operates. The AI checks its work, attacks its own reasoning, runs a pre-mortem — and if any of those checks produce material changes, it loops back and does them all again. It keeps looping until a complete cycle produces zero changes. This is a hard gate, not a suggestion.

**Why It Matters:**
Without the pipeline, quality is a coin flip — sometimes the AI researches first, sometimes it doesn't. Sometimes it checks its work, sometimes it skips it. The pipeline makes quality structural, not optional.

### Layer 3: Learning Loop — "The Immune System"

Every mistake, correction, and discovery feeds into a learning system that permanently improves the AI's behavior. This is what makes the Quality Engine compound over time — each session leaves the system better than it found it.

**The learning cycle:**

```
Mistake or correction happens
        │
        ▼
Issue is captured (what happened, why, what was the fix)
        │
        ▼
Issue is classified:
  (a) No rule covers this          → Propose new rule
  (b) Rule exists but is incomplete → Propose rule patch
  (c) Rule exists but wasn't followed → Track the pattern
  (d) Net-new gap                  → Propose new mechanism
        │
        ▼
If (c) happens 3+ times for the same rule:
  Escalate → Convert from behavioral rule to structural enforcement
        │
        ▼
Changes require human approval → Apply → Verify in subsequent sessions
```

**Why It Matters:**
Most AI quality systems are static — you write the rules once and hope the AI follows them. The Learning Loop makes the system adaptive. A failure that happens once gets logged. A failure that repeats gets a rule. A rule that keeps getting violated gets mechanical enforcement. And successes get tracked so the system knows not just what to avoid but what to replicate. The system gets harder to break and smarter about what works, with every session.

### Layer 0: Infrastructure & Observability — "The Foundation"

Layer 0 is not a QE mechanism — it's the infrastructure that enables the mechanisms above it to function. At L1 (prompt-only implementation), Layer 0 is minimal: just the AI platform you're using. At L2 and L3, Layer 0 becomes increasingly important.

**What Lives Here:**
- File persistence (session state files, logs, registries that survive across sessions)
- Context window management (monitoring how much of the AI's attention budget is consumed)
- Session initialization protocols (reading persistent state at the start of every session)
- Lifecycle hooks (at L3 only: code-level triggers that fire gates automatically)

**Why It Matters:**
Without Layer 0, the other three layers rely entirely on the AI's attention and memory — which degrades. File persistence means the learning system's records survive session death. Context monitoring means the system can detect when attention pressure threatens rule compliance. Session initialization means every session starts with full awareness of prior state rather than starting from scratch.

**Implementation guidance:** If you're starting at L1 (prompt-only), you don't need Layer 0 infrastructure. The mechanisms in Layers 1-3 work without it — they just work better with it. If you're at L2 (prompt + files), invest in a small set of persistent files: a session state file, an issue log, and a learning ledger. That's sufficient infrastructure for most practitioners.

## The 15 Core Mechanisms

These are the building blocks. Each one is independently useful, but they compound when used together. They're organized by where they sit in the three-layer architecture.

To help practitioners prioritize, each mechanism is scored on three dimensions adapted from evidence-based planning research ([Kahneman & Tversky, 1979](https://www.pmi.org/learning/library/nobel-project-management-reference-class-forecasting-8068); [Klein, 2007](https://hbr.org/2007/09/performing-a-project-premortem); [Cooper Stage-Gate](https://www.stage-gate.com/blog/the-stage-gate-model-an-overview/)):

- **Evidence Base (40%)** — How strong is the research demonstrating this mechanism materially improves AI output quality?
- **Failure Prevention (35%)** — How catastrophic is the failure mode this mechanism prevents?
- **Irreplaceability (25%)** — Can another mechanism on this list partially compensate if this one is skipped?

Scores range from 7 (proven best practice with strong research, but other mechanisms provide partial coverage) to 10 (skipping this is virtually guaranteed to reduce quality, research is overwhelming, and no other mechanism compensates).

| # | Mechanism | Layer | Score |
|---|-----------|-------|-------|
| 1 | Structural Gates | Governance | 9/10 |
| 2 | Context Efficiency Discipline | Governance | 8/10 |
| 3 | Research-Before-Reasoning Gate | Pipeline | **10/10** |
| 4 | Structured Pre-Action Reasoning | Pipeline | 8/10 |
| 5 | Success Criteria Lock | Pipeline | **10/10** |
| 6 | Convergence Loop | Pipeline | **10/10** |
| 7 | Source Verification Protocol | Pipeline | 8/10 |
| 8 | Arena Deliberation | Pipeline | 8/10 |
| 9 | Learning Ledger | Learning | 9/10 |
| 10 | Issue Classification Pipeline | Learning | 9/10 |
| 11 | Forensic Intake | Learning | 7/10 |
| 12 | Progressive Rule Promotion | Learning | 9/10 |
| 13 | Operational Simulation | Learning | 7/10 |
| 14 | Kill Criteria | Learning | 9/10 |
| 15 | Success-Pattern Tracking | Learning | 8/10 |

Three mechanisms score 10/10: the Research Gate, Success Criteria Lock, and Convergence Loop. These are the irreplaceable core — no other mechanism compensates if any of these three are missing.

### Layer 1 Mechanisms (Always Active)

#### 1. Structural Gates — Impact: 9/10
**The Problem:** Behavioral rules fail under pressure. The longer a session runs, the more the AI quietly stops following its own instructions. Rules that have been violated three or more times across sessions are proof that "just follow the rule" doesn't work.

**How It Works:** Convert high-value behavioral rules into mechanical enforcement — a check that fires automatically at a specific trigger point and blocks the action if the check fails. The AI cannot proceed past the gate without satisfying the check.

**The Gate Pattern Has Five Components:**
- Trigger action (what activates the gate)
- Check (the binary verification)
- Pass behavior (proceed)
- Fail behavior (stop, fix, then proceed)
- Log (what gets recorded)

**Four Enforcement Tiers:**
- Hard gate — action physically blocked until check passes
- Content substance — blocked until content quality verified (not just existence)
- Soft gate — warning logged, action proceeds but flagged
- Audit-only — no blocking, violation captured for learning

The Content Substance tier was discovered independently by two practitioners (Tony Flores and Rich Schefren): Tony found that after adding hard gates, the AI's failure mode shifted from skipping steps to faking steps — producing checkpoint files with thin or repetitive content that technically satisfied the gate. Rich documented the same pattern in a 232-unit pipeline where files were "expanded, criticized, and revised" but the content was hollow. Together, they identified the second-generation failure mode: the AI learns to satisfy the letter of the check while violating its spirit.

**Watch for Gamed Compliance:**
Structural gates have a second-generation failure mode: once the AI learns that a gate exists, it may satisfy the letter of the check while violating its spirit. For example, a research gate that requires "at least one search" may produce a single perfunctory search that technically satisfies the gate but doesn't actually ground the analysis. The fix is the Content Substance tier (described above) — gates that verify quality, not just existence. When monitoring your gates, watch for this pattern: gate pass rates near 100% combined with no improvement in downstream quality. That's the signal of gamed compliance.

**Key Insight:**
You don't need to gate every rule. Gate the ones that keep getting violated. The 3+ violation threshold is the signal that a behavioral rule needs mechanical enforcement.

**Research Substantiation** [preprint, independent research]**:**
The OpenDev framework ([arXiv 2603.05344](https://arxiv.org/pdf/2603.05344), 81-page study) independently implements the same pattern — lifecycle hooks that structurally enforce agent behavior at specific trigger points, rather than relying on instructions alone. [Chroma Research](https://research.trychroma.com/context-rot)'s 18-model study independently confirmed that behavioral instruction-following degrades measurably as context grows — a finding that supports the rationale for structural enforcement, though the study measured degradation rather than testing enforcement mechanisms directly.

**Practitioner Validation:**
Tony Flores and Rich Schefren independently discovered the second-generation failure mode (faking vs. skipping, described above) — confirming that structural gates work, but also that enforcement must evolve as the AI adapts. The QE system itself validated the 3+ violation threshold: 10 structural gates were built from real class-c violation patterns, each one eliminating a recurring failure class.

#### 2. Context Efficiency Discipline — Impact: 8/10
**The Problem:** AI context windows are finite, and attention degrades as they fill. Research across 18 large language models shows measurable performance degradation ("context rot") as context grows ([Chroma Research](https://research.trychroma.com/context-rot)). Every instruction loaded into the system competes for attention with every other instruction.

**How It Works:** Treat context like a budget, not an infinite resource. Set explicit sizing targets for always-loaded content (the instructions that are active in every session) vs. on-demand content (loaded only when needed). Measure actual sizes. Require justification when targets are exceeded.

**Key Insight:**
More rules does not mean more quality. After a threshold, additional rules actively degrade the AI's ability to follow any of them. The discipline is knowing what NOT to load.

**Research Substantiation** [independent research, vendor documentation]**:**
[Chroma Research](https://research.trychroma.com/context-rot) tested 18 LLMs and found consistent performance degradation as input length grows — even on trivial tasks. [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)'s context engineering guide confirms the mechanism: transformer attention creates n² pairwise relationships, so doubling context quadruples the attention cost. [HumanLayer](https://www.humanlayer.dev/blog/writing-a-good-claude-md)'s research establishes that frontier LLMs follow approximately 150-200 instructions with reasonable consistency, with uniform quality decrease as count rises — and that always-loaded system instructions should stay under 300 lines. [Manus](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus)'s production experience (50 tool calls per average task, 100:1 input-to-output ratio) identifies KV-cache hit rate as the single most important performance metric.

**Practitioner Validation:**
Multiple independent Claude Code power users converged on the same finding without coordination — Boris Cherny ("context is the one constraint"), Brad Feld (clearing context between tasks as standard practice), and Obie Fernandez (documenting that loading more than 20K tokens of tool definitions cripples performance). The QE system's own experience confirmed this when a single diagram session loaded 1,742 lines of skill content and triggered the research that produced this mechanism.

### Layer 2 Mechanisms (Production Pipeline)

#### 3. Research-Before-Reasoning Gate — Impact: 10/10
**The Problem:** AI models have training data that feels like knowledge but may be outdated, incomplete, or wrong. The most dangerous failure mode is when the AI analyzes confidently from memory — producing work that sounds authoritative but is grounded in stale or fabricated information.

**How It Works:** Hard gate — not a suggestion, not a best practice, a gate that blocks the AI from proceeding — before any analysis, synthesis, or draft composition that makes factual claims. The AI must ground itself in live sources (web search, document fetch, or database query) before it can start reasoning. But the gate isn't just "did you search once?" — the AI must first identify what assumptions will inform its reasoning, then determine the appropriate scope of research for each one. A simple factual check might need one source. A strategic analysis might need a dozen. The standard is sufficiency for the task, not a minimum count. No exceptions for "I'm pretty sure I know this."

**An Additional Layer:**
Before searching externally, check what you already know. If prior research exists in your files or accumulated knowledge base, read it first, then research only the gaps. This prevents redundant work and builds on prior sessions.

**Key Insight:**
The gate isn't "verify your work after." It's "ground yourself before." The order matters — reasoning from evidence produces fundamentally different output than reasoning from memory and verifying afterward.

But there's a deeper layer: before grounding itself, the AI needs to identify what it needs to be grounded in. Every assumption that will inform downstream reasoning is a candidate for verification. The act of inventorying those assumptions — mapping the claims that need to be real before the analysis can be trusted — is itself a critical step. Meta's Chain-of-Verification research ([CoVe](https://arxiv.org/abs/2309.11495)) validates this exact pattern: Step 2 of CoVe is "planning verifications" — identifying what needs to be checked before checking it. The Plan-and-Solve prompting framework ([Wang et al., ACL 2023](https://aclanthology.org/2023.acl-long.147.pdf)) demonstrates the same principle: explicitly decomposing what needs to happen before doing it improves accuracy and eliminates missing-step errors.

**Research Substantiation** [peer-reviewed, vendor documentation]**:**
Anthropic's agent design guide ([Anthropic](https://www.anthropic.com/research/building-effective-agents)) recommends grounding in live sources before reasoning as a core agent pattern. The Reflexion paper ([Shinn et al., NeurIPS 2023](https://arxiv.org/abs/2303.11366)) demonstrates that agents with structured reflection on prior results — grounded in actual outcomes, not assumptions — achieved 91% accuracy on coding tasks versus GPT-4's 80% baseline. Meta's CoVe research ([Meta Research](https://arxiv.org/abs/2309.11495)) shows a 23% F1 improvement by planning verification questions before answering them, substantiating the principle that identifying what needs grounding before grounding it is measurably superior to post-hoc verification.

**Practitioner Validation:**
Marc Stockman's independent financial model built in Excel across 7 sessions — with no exposure to the formal QE — independently arrived at "research before analysis" as a foundational principle. Donnie French's Marketing OS (67 skills) and Creative OS (4 agents) were both found to have the same gap: no pre-execution research gate. The same missing pattern, discovered independently in three different domains (quality engineering, financial modeling, marketing automation), is a convergence signal.

#### 4. Structured Pre-Action Reasoning — Impact: 8/10
**The Problem:** AI tends to jump straight to execution. Ask it to write a report and it starts writing immediately — without considering the audience, the domain, the risks, or what "done" looks like.

**How It Works:** Before any substantive action, the AI runs through a structured reasoning protocol: stakeholder orientation (who is this for?), domain classification (what kind of work is this?), tempo calibration (how much process does this task warrant?), pre-mortem (what could go wrong?), and rollback planning (what do I do if it goes wrong?).

**Tempo Scaling Is Critical:**
Not every task needs full ceremony. A simple lookup gets abbreviated reasoning. A strategic architecture decision gets the full protocol. The system scales overhead to complexity — otherwise every small task drowns in process.

**Key Insight:**
The reasoning isn't quality theater — it's the mechanism that prevents the AI from doing the wrong work quickly. Five minutes of pre-action reasoning saves hours of rework.

**Research Substantiation** [peer-reviewed, vendor documentation, practitioner report]**:**
The Plan-and-Solve prompting framework ([Wang et al., ACL 2023](https://aclanthology.org/2023.acl-long.147.pdf)) demonstrates that explicitly planning before solving outperforms chain-of-thought prompting alone — decomposing the task first eliminates missing-step errors and improves reasoning quality. OpenAI's agent design guide ([OpenAI](https://cdn.openai.com/business/agent-partner-toolkit/a-practical-guide-to-building-agents.pdf)) recommends structured planning phases before execution as a core agent pattern. Nate Jones's "6 Axes of Hard" framework ([Jones](https://natesnewsletter.substack.com/p/gemini-31-pro-broke-every-benchmark)) provides a formal decomposition model for assessing task complexity before execution — reasoning, effort, coordination, ambiguity, stakes, and taste.

**Practitioner Validation:**
The QE system itself proved this mechanism through repeated incidents where the AI executed confidently without pre-action reasoning and produced work that was technically competent but wrong for the audience, domain, or context. The pattern was consistent enough to become a formal mechanism rather than a guideline.

#### 5. Success Criteria Lock — Impact: 10/10
**The Problem:** Without explicit criteria for "done," the AI decides on its own when work is complete. Its standard for "done" is usually "I generated a lot of text" — which is not the same as "this achieves what the user needed."

**How It Works:** Before starting any deliverable, define measurable success criteria from the user's perspective. At the end, verify each criterion individually. Not "did I do a good job?" but "criterion 1: met/not met. Criterion 2: met/not met." Binary checks, not judgment calls.

For operational documents (workflows, processes, playbooks), every step must have an explicit owner (who does this?) and timing (when does this happen?). If those are to-be-determined, say so explicitly — don't leave them implied.

**Key Insight:**
Success criteria defined at the start create accountability at the end. They convert quality from a subjective assessment into an auditable checklist.

**Research Substantiation** [vendor documentation]**:**
Anthropic's agent design principles ([Anthropic](https://www.anthropic.com/research/building-effective-agents)) emphasize defining explicit success criteria before agent execution. Google's agent design patterns ([Google Cloud](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system)) classify "review and critique with iterative refinement" — which requires defined criteria to review against — as the highest-reliability agent pattern. The broader quality management literature (pre-mortem analysis, acceptance testing) has validated criteria-first approaches for decades.

**Practitioner Validation:**
Marc Stockman's QE system enforces this as a hard rule (R-05) after repeated incidents where the AI declared work "complete" based on its own assessment rather than defined criteria. Donnie French's Marketing OS gap analysis independently identified the same missing pattern — no mechanism to lock success criteria before execution begins.

#### 6. Convergence Loop — Impact: 10/10
**The Problem:** A single quality check catches some errors but not all. The AI reviews its own work, finds a few issues, fixes them — and stops. But the fixes themselves can introduce new errors, and the first review often misses things that a second review catches.

**How It Works:** The quality check runs in a loop with four passes per cycle:

1. **Verify** — cross-check every factual claim, number, date, and attribution against source material
2. **Attack** — adopt a hostile skeptic perspective. Challenge assumptions, test logic chains, look for internal contradictions
3. **Pre-mortem** — assume the deliverable has failed. Work backward to identify why. What's missing? What could be misunderstood?
4. **Revise** — apply all material findings (not cosmetic changes)

**The Convergence Gate (Hard Rule — Not a Suggestion):**
If the Revise pass applies any material changes, loop back to Verify and run all four passes again. Continue until a complete cycle produces zero material changes. Only then is the work complete. This is what separates the QE from "just review your work" — a human saying "check it twice" is a suggestion. A convergence gate is a structural mechanism that won't let you ship until the work is mathematically stable.

**What Counts as a "Material Change":**
The convergence gate depends on a clear definition of "material." Without one, the loop either never terminates (everything looks material) or terminates too early (real issues are dismissed as cosmetic). The QE uses a four-category taxonomy:

| Category | Material? | Examples |
|----------|-----------|----------|
| Factual error | Always material | Wrong number, incorrect attribution, outdated claim, broken citation |
| Logical or structural flaw | Always material | Conclusion doesn't follow from premises, missing section, internal contradiction, gap in reasoning chain |
| Meaning-affecting wording | Material | Ambiguous language that could be misinterpreted by the target audience, hedging that obscures a definitive finding, framing that changes the reader's takeaway |
| Cosmetic | Never material | Formatting preferences, synonym swaps that don't change meaning, stylistic consistency, punctuation |

When in doubt, ask: "Would the target audience's understanding or decision change if this were left unfixed?" If yes, it's material. If no, it's cosmetic.

**Iteration Cap:**
Default maximum: 3 loops. If the work hasn't converged after 3 complete cycles, the approach likely has a structural problem — not a polish problem. At that point, stop refining and reassess the approach itself (see Kill Criteria, mechanism #14). The cap can be raised for high-stakes deliverables (external-facing documents, legal or financial work) where additional convergence loops have demonstrated value, but raising the cap is a conscious decision, not a default.

**Key Insight:**
"Convergence" is the key concept. You're not checking a fixed number of times — you're checking until the work stabilizes. Some deliverables converge in one loop. Complex ones take three or four. The loop count is the signal, not the process.

**A Note on Self-Correction Limitations:**
The Convergence Loop relies on the AI reviewing its own work. Research suggests AI systems have a measurable blind spot for their own errors — studies indicate roughly 64.5% of self-generated errors go undetected in same-session review. The Convergence Loop mitigates this significantly (multiple passes with different perspectives catch more than a single pass), but it doesn't eliminate the limitation. For the highest-stakes work, an advanced technique called clean-room verification — having a second AI instance review the work in a fresh context, without visibility into the reasoning that produced it — can close the remaining gap. This is optional and requires more infrastructure, but practitioners building agent harnesses (L3) should consider it.

**Uncertainty Signaling (Simple Version):**
During the Verify pass, identify your 3 lowest-confidence claims — claims where the evidence is thinnest, the source is least authoritative, or the inference chain is longest. Flag these explicitly in the deliverable (e.g., "Note: this claim is based on [limited source] and should be verified independently before acting on it"). This is a lightweight mechanism that adds significant credibility: a deliverable that honestly flags its weakest points is more trustworthy than one that presents everything with equal confidence.

**Research Substantiation** [peer-reviewed, preprint]**:**
Meta's Chain-of-Verification ([CoVe](https://arxiv.org/abs/2309.11495)) demonstrates that iterative verification — checking, revising, and re-checking — measurably reduces hallucination rates versus single-pass verification. The VIRF framework ([arXiv 2602.08373](https://arxiv.org/html/2602.08373v1)) implements the same convergence principle in safety-critical AI planning: a verify-diagnose-refine loop that continues until the plan is provably safe, requiring only 1.1 correction iterations on average. The mathematical foundation is straightforward: if each pass has an independent error rate, multiple passes compound the accuracy.

**Practitioner Validation:**
Ben Marcoux's math-of-agents analysis quantified the compounding effect: if each step in a multi-step process has 80% accuracy, 10 sequential steps yield approximately 11% overall success. Convergence loops improve the accuracy of each pass, which compounds across the pipeline. The QE system's own audit logs show that complex deliverables typically require 2-4 convergence loops, with each subsequent loop finding errors introduced by the previous loop's fixes — validating that single-pass review is structurally insufficient.

#### 7. Source Verification Protocol — Impact: 8/10
**The Problem:** AI frequently cites sources without actually checking them. It will attribute a claim to a website it never visited, or cite a secondary source (a comparison site, a blog post) when the primary source (the vendor's own page) says something different.

**How It Works:** For every high-stakes claim (pricing, technical specs, legal status, feature availability — anything driving a recommendation), the primary source must be fetched directly at the time of writing. Not inherited from a prior search. Not from a comparison site. The vendor's own page, fetched and read.

**An Additional Layer:**
When information passes through intermediate analysis (summaries, digests, AI commentary), distinguish between direct quotes and analytical synthesis. Never present AI-generated analysis as if it were a direct quote from the primary source.

**Key Insight:**
The difference between "I found a source that says X" and "I read the vendor's actual page and it says X" is the difference between a citation and a verification. The protocol requires verification, not citation.

**Research Substantiation** [vendor documentation, preprint]**:**
Amazon's Automated Reasoning checks for Bedrock Guardrails ([AWS](https://aws.amazon.com/blogs/aws/prevent-factual-errors-from-llm-hallucinations-with-mathematically-sound-automated-reasoning-checks-preview/)) implement the same principle at infrastructure level — using mathematical logic to verify AI-generated claims against source documents rather than trusting the AI's citation. The CRAVE framework ([arXiv 2504.14905](https://arxiv.org/html/2504.14905v1)) demonstrates that verification from conflicting perspectives (checking whether evidence supports AND refutes a claim) outperforms single-direction verification, achieving state-of-the-art accuracy on claim verification benchmarks.

**Practitioner Validation:**
This mechanism was born from a specific incident in Marc Stockman's QE system where AI-generated analysis was presented as a direct quote from a primary source — the attribution looked correct but the content was paraphrased synthesis, not the original author's words. Tony Flores independently identified the same pattern in his anti-degradation work: the AI satisfies the appearance of citation without performing actual verification.

**Conditional Enhancement — Cross-Model Fact-Check:**
For the highest-stakes factual claims — where the claim drives a decision, no primary source exists to verify against, and the claim is AI-generated — there is evidence that checking across different AI models adds genuine value. Research from [MIT CSAIL](https://ar5iv.labs.arxiv.org/html/2305.14325) shows that different models hallucinate differently, meaning cross-model disagreement is a reliable signal that a claim needs deeper scrutiny. A [Nature study](https://www.nature.com/articles/s41598-025-15203-5) across 1,250 responses from 5 LLMs confirmed that models have distinct hallucination patterns and domain specializations. This is not a routine step — [Princeton's Self-MoA research](https://arxiv.org/abs/2502.00674) showed that for most tasks, running the same strong model multiple times outperforms mixing models. The cross-model check fires only when all three conditions are met, making it a targeted escalation for the claims that matter most.

#### 8. Arena Deliberation — Impact: 8/10
**The Problem:** Some decisions can't be quality-checked by a single perspective. Strategic choices, high-stakes recommendations, and anything where framing matters benefit from having multiple viewpoints challenge each other before a recommendation is made.

**How It Works:** Three independent perspectives evaluate the same question, each in a fresh context with no visibility into what the others said:

- **The Strategist** — evaluates against goals, constraints, and long-term impact
- **The Reframer** — challenges the question itself. Is this the right question? What assumptions are embedded in how it's framed?
- **The End User** — evaluates from the perspective of whoever will receive or use the output

After all three perspectives complete, an orchestrator performs a divergence audit: where do the perspectives agree? Where do they disagree? Is the disagreement about facts (resolvable) or values (requires human judgment)?

**When to Use It:**
Not for every task. A strategic evaluator ("is the juice worth the squeeze?") assesses three conditions: (1) disagreement is possible, (2) framing could be wrong, (3) recipient experience matters. If 2 of 3 are true, Arena fires. Roughly 20% of tasks. Skip for routine tasks and binary technical decisions.

**Key Insight from Building This (credit: a foundational finding from the Arena's own self-evaluation):**
The temptation is to add more perspectives. Resist it. Three deep perspectives that challenge each other produce better results than five shallow ones. When you want better quality, add a constraint to existing perspectives, don't add a new perspective. Quality lives at the seams between perspectives, not in the number of nodes.

**Research Substantiation** [peer-reviewed]**:**
Meta's Chain-of-Verification ([CoVe](https://arxiv.org/abs/2309.11495)) uses a "factored" approach where verification questions are answered independently — without visibility into the original response — to prevent bias contamination. This is the same architectural principle as Arena's context isolation. Microsoft AutoGen ([Wu et al., ICLR 2024](https://arxiv.org/abs/2308.08155)) validates the multi-agent deliberation pattern, demonstrating that independent agent perspectives with structured synthesis outperform single-agent reasoning on complex tasks.

**Practitioner Validation:**
Rich Schefren independently identified context isolation as the critical differentiator: "80% of the difference between agents and skills is that a skill is contaminated by the current context." The Arena mechanism was validated through its own self-evaluation — an Arena run that evaluated the Arena spec itself, producing the foundational finding about depth over breadth. A subsequent 5-task stress test confirmed the mechanism holds under varied conditions.

**Competitive Simulation — An Extension of Arena Deliberation:**

Arena deliberation evaluates whether a strategy is being executed well. But there's a prior question: is this the right strategy in the first place? Competitive Simulation answers that question by pitting multiple strategic approaches against each other before committing to one.

Competitive simulation answers: "What's the best STRATEGY to pursue?"
Arena deliberation answers: "Is this strategy being EXECUTED well?"
For the highest-stakes work, chain both — simulation first to select the strategy, then Arena on the winner to stress-test its execution.

**How Competitive Simulation Works:**
The AI generates multiple candidate strategies for a given objective, each grounded in research (mechanism #3) and each using top proven, most effective frameworks appropriate to the domain. Independent evaluations run on each candidate — isolated from each other to prevent contamination — and score them against pre-defined success criteria (mechanism #5). The selection protocol has four key design decisions:

- **Selection leads, calibration is the key insight.** The primary value is picking the best approach. But the calibration signal — when the judge can't differentiate between candidates — is equally important, because it reveals that the success criteria are too vague. That signal loops back to sharpen the criteria before proceeding.
- **One round default, conditional second.** Most tasks are resolved in a single evaluation round. A second round fires only when the judge genuinely can't differentiate — not as default ceremony.
- **Score against success criteria, not document sections.** Cherry-picking the best elements from each candidate is allowed, but only when one approach outscores the other on a specific success criterion. The Convergence Loop (#6) then stress-tests the assembled result.
- **AI-generated directives with a practitioner sanity check.** The AI selects which strategic frameworks to use per task, drawing from research already gathered, with a self-check from all three Arena perspectives (strategist, reframer, end user) before candidates run.

**Epistemic Basis** [practitioner judgment]**:**
These design decisions were made through structured deliberation and practitioner judgment, not published research. No academic papers were found that validate or invalidate these specific competitive simulation design choices. The decisions are grounded in: (a) logical inference from adjacent Arena deliberation evidence, (b) Marc Stockman's direct experience with the failure mode they address (AI presenting intuition-based design choices as evidence-backed), and (c) pattern recognition from hundreds of quality system sessions. They are labeled as practitioner-validated judgment, not evidence-backed claims.

### Layer 3 Mechanisms (Learning Loop)

#### 9. Learning Ledger — Impact: 9/10
**The Problem:** Quality checks find issues. Issues get fixed. But nobody tracks what was learned — so the same types of issues recur across sessions. The quality system does work, but it doesn't get smarter.

**How It Works:** Every quality check (whether a standalone audit or part of the production pipeline) produces a Learning Ledger — a table with three columns:

| Learned | Memorialized | Activated |
|---------|-------------|-----------|
| What specific insight was discovered | Where it was recorded (which file, which entry, which persistent location) | What rule, mechanism, or behavior changed as a result |

**Why Three Columns:**
"Learned" captures the insight. "Memorialized" ensures it's stored somewhere that survives the current session. "Activated" ensures it actually changes something — learning that doesn't change behavior isn't learning.

**Key Insight:**
Making learning visible is the mechanism. When you can see "we learned X, stored it in Y, and it changed Z" in a table after every quality check, learning becomes accountable instead of aspirational.

**Research Substantiation** [peer-reviewed]**:**
The Reflexion framework ([Shinn et al., NeurIPS 2023](https://arxiv.org/abs/2303.11366)) stores verbal self-reflections in episodic memory — the academic foundation for exactly this pattern. Agents that persist their learnings in retrievable form achieved 91% accuracy versus 80% for agents that don't, demonstrating that the persistence mechanism (not just the learning) drives the improvement. NVIDIA's Voyager ([Wang et al., 2023](https://arxiv.org/abs/2305.16291)) implements a "skill library" where each learned capability is stored and retrievable — the same store-and-retrieve pattern applied to capabilities rather than insights.

**Practitioner Validation:**
The three-column format (Learned / Memorialized / Activated) emerged from Marc Stockman's direct experience that "learning" without visible activation produces no system improvement. The QE system tracks over 50 audit cycles with Learning Ledgers, providing empirical evidence that making learning visible creates accountability that aspirational "lessons learned" documents never achieve.

#### 10. Issue Classification Pipeline — Impact: 9/10
**The Problem:** When something goes wrong, the instinct is to fix it and move on. But "fix and move on" means the system never improves — the same class of error keeps happening because the root cause was never addressed.

**How It Works:** Every error, correction, and quality finding is captured in a structured format (what happened, why, what was fixed, what rule should have prevented it) and then classified:

- **(a) Rule missing** — no rule covers this class of issue → propose a new rule
- **(b) Rule incomplete** — a rule exists but doesn't cover this scenario → propose a patch
- **(c) Rule not followed** — the rule is fine, it just wasn't executed → track the pattern
- **(d) Net-new gap** — doesn't fit any current category → propose new mechanism

**The Escalation Threshold:**
Class (c) issues — rules that exist but aren't followed — get special tracking. If the same rule accumulates three or more class (c) violations across sessions, it triggers an automatic escalation: propose converting that behavioral rule into a structural gate (mechanism #1). The pattern proves that behavioral enforcement is insufficient for that specific rule.

**Key Insight:**
The classification isn't bureaucracy — it's routing. Each class has a different fix. Misclassifying the problem leads to the wrong fix. A missing rule needs a new rule. A rule that isn't followed needs mechanical enforcement, not a longer rule.

**Research Substantiation** [peer-reviewed, established methodology]**:**
The Reflexion framework ([Shinn et al., NeurIPS 2023](https://arxiv.org/abs/2303.11366)) demonstrates that structured classification of failures — distinguishing between types of errors — enables targeted improvement rather than generic retry. Root cause analysis is a foundational principle in human quality management (Six Sigma, Toyota Production System) that has been independently validated across manufacturing, software, and now AI systems.

**Practitioner Validation:**
The four-class taxonomy (a/b/c/d) was developed empirically in Marc Stockman's QE system from hundreds of real error instances. The class (c) escalation threshold — 3+ violations of the same rule triggering structural conversion — was validated when 10 structural gates were built from exactly this pattern, each one eliminating a recurring failure class. Tony Flores's independent anti-degradation work converged on the same insight: different failure types require fundamentally different responses.

#### 11. Forensic Intake — Impact: 7/10
**The Problem:** When someone shares a document, paper, or resource, the natural tendency is to skim it and quickly assess "is this relevant to what I'm working on?" This causes valuable insights to be dismissed because they appear to be from a different domain or context.

**How It Works:** When any material is shared, the standing assumption is that it contains signal. Before forming any conclusion about relevance:

1. Read the material completely — not just the abstract or summary
2. Extract every distinct mechanism, pattern, framework, and finding
3. Map each one against the current system — where does this pattern exist, where is it missing, where does it partially exist?
4. Only after completing steps 1-3, assess relevance

"Different domain" is never sufficient grounds for dismissal. Transferable patterns are the default expectation.

**Key Insight:**
The most valuable insights often come from unexpected sources. A paper about autonomous AI systems might contain an anomaly detection pattern that directly applies to your quality audit process. But you'll only see it if you extract the mechanisms before judging relevance.

**Research Substantiation** [preprint, established principle]**:**
Cross-domain transfer learning is well-established in AI research — the principle that patterns discovered in one domain frequently apply to others. The ASI-ARCH paper ([arXiv 2507.18074](https://arxiv.org/abs/2507.18074)) on autonomous system integration provided the direct catalyst for this mechanism when its anomaly detection architecture was found applicable to quality audit loops — a connection that would have been missed under a domain-relevance-first assessment.

**Practitioner Validation:**
Tony Flores independently analyzed the ASI-ARCH paper and identified the Analyst gap as applicable to both his Arena system and the QE audit loop — performing exactly the forensic extraction that the AI had initially failed to do (which led to the creation of this mechanism as a formal rule). The pattern has since been validated repeatedly: mastermind group members routinely surface cross-domain insights that would be dismissed under a relevance-first approach.

#### 12. Progressive Rule Promotion — Impact: 9/10
**The Problem:** Quality systems tend to be either too rigid (rules carved in stone that don't adapt) or too loose (guidelines that get ignored). The system needs to evolve, but evolution needs to be controlled — not every lesson becomes a rule, and not every rule becomes permanent.

**How It Works:** The promotion pipeline has clear stages:

```
Incident → Captured (session log) → Evaluated for pattern →
  One-off? → Log and monitor
  Pattern (2+ occurrences)? → Draft rule change → Human approves →
    Apply → Test → Verify in subsequent sessions
```

**Before Creating Any New Rule:**
Check whether an existing rule already covers the scenario. If so, amend the existing rule instead of creating a new one. This prevents system bloat — without this check, the natural tendency is to keep adding rules until the system collapses under its own weight (which connects directly back to mechanism #2, Context Efficiency).

**Rollback Protocol:**
Rule promotion is not a one-way ratchet. Every promoted rule must carry a version number, a timestamp, and the prior rule text (if amending an existing rule). If a promoted rule causes unintended side effects — degrading output quality, creating conflicts with other rules, or adding overhead that exceeds the failure prevention value — the rollback path is simple: revert to the prior version and log the rollback as a learning event. The issue classification pipeline will capture why the promotion failed, which may itself produce a better rule. Forward-only rule systems accumulate cruft; reversible systems stay lean.

**Key Insight:**
The human approval gate is non-negotiable. AI systems that self-modify their own rules without human oversight eventually optimize for metrics that diverge from what the human actually wants. Every rule change goes through a human.

**Research Substantiation** [vendor documentation, peer-reviewed, preprint]**:**
Anthropic's research on measuring agent autonomy ([Anthropic, Feb 2026](https://www.anthropic.com/research/measuring-agent-autonomy)) confirms that effective oversight requires human-AI interaction paradigms where the human retains approval authority over system changes. The Reflexion paper ([Shinn et al., NeurIPS 2023](https://arxiv.org/abs/2303.11366)) demonstrates effective self-improvement within bounded parameters, but the QE adds the critical human gate that pure self-improvement architectures lack. The novelty check before rule creation mirrors the ASI-ARCH paper's ([arXiv 2507.18074](https://arxiv.org/abs/2507.18074)) sanity check pattern — verify genuine novelty before investing resources.

**Practitioner Validation:**
Marc Stockman's QE system has promoted 30 rules through this pipeline across hundreds of sessions, with every rule requiring human approval before activation. The bloat-prevention check (amend existing rules before creating new ones) was validated when context efficiency research revealed that rule count directly degrades AI performance — connecting rule promotion discipline to measurable quality outcomes. Donnie French's Marketing OS (67 skills with no self-learning loop) independently demonstrated the cost of the opposite approach: a system that cannot promote lessons into permanent improvements.

#### 13. Operational Simulation — Impact: 7/10
**The Problem:** Some mechanisms look good on paper but fail in practice. An audit process that works in theory might miss obvious issues when applied to real work. A deliberation framework that sounds rigorous might produce confused or contradictory output when actually run.

**How It Works:** For new methods, processes, or skills, run a realistic simulation before deployment:

- **Cold receiver test** — can someone who has never seen this mechanism understand and use it from the documentation alone?
- **Stress test** — does the mechanism hold up under edge cases? What happens when the input is ambiguous, adversarial, or much larger than expected?
- **Scenario walkthrough** — does the mechanism produce the right result when applied to a realistic scenario, not just a toy example?

**When to Use It:**
Not for every change. A minor rule update doesn't need a simulation. But new methods, new skills, and new processes — especially ones that will be used by others — benefit enormously from being tested in realistic conditions before deployment.

**Key Insight:**
The gap between "this mechanism is logically sound" and "this mechanism works in practice" is where most quality system failures live. Simulation closes that gap before deployment, not after.

There's a deeper layer: simulation isn't just about testing mechanisms — it's about evaluating whether a chosen strategy is being executed well. Competitive Simulation (see Arena Deliberation, mechanism #8) answers "What's the best STRATEGY to pursue?" Operational Simulation answers "Is this strategy being EXECUTED well?" For the highest-stakes work, chain both: select the strategy first, then simulate its execution to catch implementation gaps before they become production failures.

**Research Substantiation** [preprint]**:**
The VIRF framework ([arXiv 2602.08373](https://arxiv.org/html/2602.08373v1)) implements a formal verification pipeline for AI plans that tests against realistic scenarios before deployment — the same test-before-ship principle applied to safety-critical systems.

**Practitioner Validation:**
Rich Schefren's documented 232-unit pipeline failure demonstrated the cost of not simulating: a system that passed logical review but failed in production because it was never stress-tested against real conditions. The Arena deliberation mechanism was itself validated through operational simulation — a cold receiver test, a 5-task stress test, and an Arena self-evaluation where the mechanism evaluated itself. This meta-validation proved that simulation catches failure modes that logical review misses. The QE system now requires operational simulation for all new methods and skills, with the Strategic Evaluator assessing whether the cost of simulation is justified for each case.

#### 14. Kill Criteria — Impact: 9/10
**The Problem:** Quality systems are designed to push forward — more passes, more checks, more refinement. But they rarely define when to stop. Without pre-defined stopping conditions, tasks consume escalating resources because every next pass "might find something." The AI — and the human — fall into escalation of commitment: continuing to invest in an approach precisely because they've already invested so much.

**How It Works:** Before starting a task, define the conditions under which the work should be stopped, pivoted, or fundamentally redirected. These aren't failure conditions (those are handled by Issue Classification). These are resource and viability thresholds:

- If the convergence loop exceeds N iterations without meaningful improvement, stop and reassess the approach
- If the task has consumed more than X time/resources relative to its value, pause and evaluate whether the approach is viable
- If a key assumption underlying the work turns out to be false, stop — don't patch around it
- If the deliverable no longer serves its original purpose (scope drift), redirect rather than continue
- If a solution's complexity exceeds the complexity of the problem it solves, stop and simplify — adding more mechanisms, perspectives, or checks past the point of diminishing returns is itself a failure mode

**Default Thresholds (starting points — adjust based on experience):**

| Kill Signal | Default Threshold | When to Override |
|------------|-------------------|------------------|
| Convergence loops | 3 loops without convergence | Raise to 4 for external-facing deliverables |
| Time investment | 2x the original estimate | Raise for truly high-stakes work (board presentations, legal) |
| Scope drift | Original task description no longer matches current work | Almost never — scope drift is usually a sign of a bad original frame |
| Assumption failure | Any key assumption disproven | Never — a false assumption invalidates downstream work |
| Complexity threshold | Solution requires more explanation than the problem it solves | Judgment call — some problems are genuinely complex |

**Kill Governance:**
The kill decision is always a human decision, not an automated one. When a kill threshold fires:
1. The system flags the threshold breach — it does not auto-kill
2. The human evaluates: is this a threshold that should be overridden, or a genuine signal to stop?
3. If overriding, the human must state why (this prevents silent normalization of threshold violations)
4. The override is logged for Success-Pattern Tracking — was the override the right call in retrospect?

**Remediation Paths (what happens after a kill fires):**
A kill doesn't mean failure — it means redirect. Four paths are available:
- **Simplify:** Reduce scope. Deliver 80% of the value at 20% of the remaining effort.
- **Reframe:** The problem statement was wrong. Restate the objective and start a fresh approach.
- **Decompose:** The task is too large for a single pass. Break it into smaller, independently deliverable chunks.
- **Escalate:** The task requires resources, expertise, or access you don't have. Surface the constraint to the decision-maker rather than working around it.

**The Distinction from Convergence:**
The Convergence Loop (#6) answers "is the work stable?" Kill Criteria answers "is the work still worth doing?" A deliverable can converge perfectly — zero material changes — and still be the wrong deliverable. Kill Criteria prevent investing quality effort into work that should have been redirected.

**Key Insight:**
Kill criteria must be set before emotional investment takes hold. Once two hours have been spent refining a deliverable, the sunk-cost bias makes it psychologically difficult to stop — even when stopping is the right call. Pre-committing to thresholds eliminates the decision in the moment. The simplicity criterion deserves special emphasis: the instinct to improve a system by adding to it (more checks, more perspectives, more layers) is itself a failure mode that kill criteria must catch. If the solution is becoming more complex than the problem, that's a kill signal.

**Research Substantiation** [peer-reviewed, practitioner methodology]**:**
Barry Staw's "Knee-Deep in the Big Muddy" research ([Staw, 1976](https://psycnet.apa.org/record/1977-08844-001)) established that decision-makers continue investing in failing approaches precisely because of prior investment — a bias that worsens with time and emotional commitment. Robert Cooper's Stage-Gate methodology ([Cooper, Stage-Gate International](https://www.stage-gate.com/blog/the-stage-gate-model-an-overview/)) formalizes go/kill decision points between project phases — companies using structured gate reviews with explicit kill decisions see dramatically higher success rates than those using ad-hoc processes. Daniel Kahneman and Amos Tversky's work on the planning fallacy ([Kahneman & Tversky, 1979](https://www.pmi.org/learning/library/nobel-project-management-reference-class-forecasting-8068)) demonstrates that humans systematically underestimate how long and how much effort tasks will require — making pre-defined stopping conditions essential rather than optional.

**Practitioner Validation:**
The OpenDev framework ([arXiv 2603.05344](https://arxiv.org/pdf/2603.05344)) implements doom-loop detection — identifying when an agent keeps trying the same failing approach — as a structural mechanism, not a guideline. Marc Stockman's 18 Planning Disciplines framework independently scored Kill Criteria at 9/10 for project outcomes, noting that kill criteria and success criteria are "mirror images" that must be established in the same planning window.

#### 15. Success-Pattern Tracking — Impact: 8/10
**The Problem:** The Quality Engine's Learning Loop is heavily oriented toward failures — catching mistakes, classifying errors, promoting fixes into rules. This is necessary, but it's only half the learning equation. The system has no symmetric mechanism for tracking what worked and why. When a deliverable succeeds, when an approach produces exceptional results, when a strategic decision pays off — that signal is acknowledged in the moment but not systematically captured, analyzed, or made available for future sessions.

**How It Works:** Alongside the failure-tracking mechanisms (Issue Classification, Learning Ledger), maintain a parallel track for successes:

- After each completed deliverable or project, capture what approach was used, what worked well, and why
- Track strategic decisions alongside their outcomes over time
- When starting new work, consult the success-pattern database: "Based on past deliverables of this type, what approach worked best? What's the typical effort required? What's the expected convergence loop count?"

This creates a reference class — a body of empirical data about how similar past work actually played out — that calibrates expectations for new work.

**The Connection to Kill Criteria:**
Success-Pattern Tracking feeds Kill Criteria with real data. Instead of guessing "how many convergence loops should this take?" the system can reference: "Deliverables of this complexity have historically required 2-3 loops. If we're on loop 5, something is wrong with the approach, not just the execution."

**Key Insight:**
Systems that learn only from failures develop an increasingly sophisticated understanding of what goes wrong — but no corresponding understanding of what goes right. Over time, this produces a system that is excellent at preventing known problems but has no mechanism for replicating known successes. The most impactful quality improvements often come not from avoiding more failures but from understanding and systematically repeating what already works.

**Research Substantiation** [preprint, peer-reviewed]**:**
The ASI-ARCH paper ([arXiv 2507.18074](https://arxiv.org/abs/2507.18074)) tracked the origin of design ideas across 1,773 experiments and found that for top-performing results, self-generated analytical insights (learning from the system's own successful experiments) accounted for 44.8% of design ideas — compared to 37.7% for non-top results. Breakthrough performance came not from more external research but from deeper analysis of what had already worked. Bent Flyvbjerg's Reference Class Forecasting research ([Flyvbjerg, 2006](https://www.pmi.org/learning/library/nobel-project-management-reference-class-forecasting-8068)) demonstrates that calibrating estimates against actual outcomes of comparable past work — rather than relying on optimistic planning assumptions — dramatically improves accuracy. The American Planning Association officially endorsed Reference Class Forecasting in 2005.

**Practitioner Validation:**
Tony Flores's Marketing-OS research compilation independently proposed a "Campaign Phylogeny" — a persistent database tracking strategic decisions and their outcomes across completed campaigns — arriving at the same pattern from the domain of marketing automation. Marc Stockman's QE system, after hundreds of audit cycles, has rich failure data but no equivalent success database — the gap was identified when cross-referencing Flores's Campaign Phylogeny concept against Flyvbjerg's Reference Class Forecasting research. Two independent sources converging on the same gap from different domains is the practitioner validation signal the QE recognizes as indicative of a fundamental discovery.

## Design Principles

Six principles emerged from the research and have been independently validated by multiple practitioners building their own quality systems:

1. **File-based persistence as source of truth.** Don't rely on conversation memory — it dies with the thread. Persistent files that survive across sessions are the foundation.

2. **Convergence-based quality gates.** Don't check a fixed number of times. Loop until zero material changes. The convergence signal is more reliable than any arbitrary pass count.

3. **Skills/prompts as the primary behavioral control mechanism.** Context engineering (what instructions the AI is given) is more impactful than model selection (which AI you use). A well-instructed mid-tier model outperforms a poorly-instructed frontier model.

4. **Separation of planning and execution.** Optimize the prompt before executing it. This prevents the most common failure mode: the AI does the wrong work quickly and confidently.

5. **Issue-to-rule self-learning pipeline.** Every mistake is a learning opportunity — but only if there's a structured pipeline that routes the learning to the right fix. Without the pipeline, lessons are acknowledged but forgotten.

6. **Session initialization from files.** Start every session by reading persistent state files that capture where you left off. Multiple practitioners independently arrived at this same pattern — it's the only reliable way to maintain continuity across sessions.

## Measuring QE Health

A quality system that can't measure its own effectiveness is running on faith. The QE Scoreboard provides five metrics that tell you whether the system is working, improving, or degrading.

### The QE Scoreboard (5 Metrics)

Track these monthly. The first three are leading indicators (they predict quality). The last two are lagging indicators (they confirm the system is learning).

| # | Metric | What It Measures | Target | Warning Signal |
|---|--------|-----------------|--------|---------------|
| 1 | **Criteria Coverage** | % of substantial tasks that had success criteria defined before work began | >80% | Below 60% means the Success Criteria Lock isn't being applied consistently |
| 2 | **Source Grounding** | % of factual claims in deliverables that cite a live source | >70% | Below 50% means the Research Gate is being bypassed or under-applied |
| 3 | **Mean Convergence Loops** | Average number of loops before convergence across deliverables | 1.5–2.5 | Consistently >3 means approaches have structural problems; consistently 1.0 means the Convergence Loop isn't finding real issues |
| 4 | **Top Recurring Issue Class** | The most frequently logged issue category this month | Should change over time | Same category dominating for 3+ months means the learning loop isn't fixing root causes |
| 5 | **Rule Promotion Rate** | Number of lessons promoted to rules or rule patches this month | 1–3 per month | Zero for 2+ months means learning isn't being activated; >5 per month risks system bloat |

**How to read the Scoreboard:**
- All five metrics trending in the right direction = the QE is compounding. The system is getting better.
- Metrics 1-3 strong but 4-5 flat = the production pipeline is working but the learning loop isn't. You're catching issues but not preventing them from recurring.
- Metrics 4-5 active but 1-3 weak = the learning loop is running but the production pipeline isn't applying the mechanisms consistently. Rules exist but aren't being followed.
- Everything flat = the QE is installed but not operationalized. Go back to Getting Started and focus on the three core mechanisms.

**Review cadence:** Monthly, 15-30 minutes. Pull the numbers from your issue log, learning ledger, and session records. The review itself is a forcing function — the act of measuring creates accountability.

### Eval Case Bank (Advanced)

As the QE matures, the Scoreboard metrics benefit from a companion mechanism: the Eval Case Bank. This is a library of real examples — one per recurring issue class — that defines the expected quality standard for that class.

**How it works:**
- Every time the Issue Classification Pipeline identifies a new recurring issue class (an issue type that appears 3+ times), capture a minimal test case: the input that triggered the issue, the incorrect output, and the corrected output.
- This builds a library of concrete examples that makes quality standards tangible rather than abstract.
- When evaluating whether the system has improved, run the eval cases: does the system now handle these cases correctly without intervention?

**Why this matters:**
Without an Eval Case Bank, the claim that "the system is improving" is anecdotal. With one, it's testable. The bank converts aspirational compounding into demonstrable compounding.

At L1 (prompt-only), the Eval Case Bank is a simple document with examples. At L2 (prompt + files), it's a structured file the AI reads at session start. At L3 (agent harness), it can be automated into regression tests. The mechanism works at every implementation level — the automation just makes it easier.

## Appendix: Human-in-the-Loop Practices

The 15 mechanisms above are structural — they work regardless of which AI model you use. The practices below are human judgment calls that make the system more effective but depend on the practitioner's context and experience.

### Model Fitness Testing

Not every AI model is equally good at every task. A model that excels at analytical reasoning may underperform at creative copywriting. A model optimized for code may struggle with nuanced business writing.

**The Practice:**
When a task type recurs and quality matters, test whether a different model produces better results. Run the same prompt through 2-3 models. Compare outputs against your success criteria. Document which model won and why.

**When to Test:**
- A task type is recurring (you'll do this kind of work regularly)
- Quality on the current model feels "good but not great" for this specific task
- A new model has been released or a colleague reports better results elsewhere

**When Not to Test:**
- One-off tasks (the testing cost exceeds the quality gain)
- Tasks where the current model consistently produces excellent results
- Tasks where the bottleneck is the prompt, not the model (fix the prompt first)

**What to Track:**
Keep a simple log: task type, models tested, which model won, why. Over time, this builds a fitness map — which models perform best for which kinds of work in your specific context.

**Key Insight:**
Model selection is a second-order lever. Prompt quality and context engineering (what information the model receives) are first-order levers. Research from [Princeton](https://arxiv.org/abs/2502.00674) showed that running the same strong model multiple times with different perspectives outperforms mixing different models in most scenarios. The exception is domain-specific specialization — where one model has been specifically trained or tuned for a particular type of work. Test for specialization, not general superiority.

**Practitioner Example:**
One AI Mastermind Collective member discovered through testing that Google's Gemini consistently outperformed Claude for marketing copywriting tasks, while Claude maintained an edge for analytical and structural work. This wasn't predictable from benchmarks — it emerged from systematic testing against real work.

## Appendix: Templates

These templates are starting points. Adapt them to your workflow.

### Success Criteria Worksheet

Fill this out before starting any substantial deliverable.

```
Task: [what you're building]
Audience: [who will receive or use this]
Format: [document, presentation, analysis, code, etc.]

Success Criteria (binary — met or not met):
1. [Specific, measurable criterion]
2. [Specific, measurable criterion]
3. [Specific, measurable criterion]
4. [Specific, measurable criterion]
5. [Specific, measurable criterion]

Kill Criteria (stop if any of these fire):
- Max convergence loops: [default 3]
- Max time investment: [X hours]
- Key assumption that must hold: [what's this built on?]
- Scope drift test: [what would signal this task has changed?]
```

### Issue Log Schema

One row per issue caught.

```
| # | Date | What Happened | Why | Fix Applied | Classification | Rule Affected | Promoted? |
|---|------|--------------|-----|-------------|----------------|---------------|-----------|
|   |      |              |     |             | (a/b/c/d)      |               | Y/N       |
```

Classifications:
- (a) Rule missing — no rule covers this
- (b) Rule incomplete — rule exists but didn't cover this scenario
- (c) Rule not followed — rule is fine, execution failed
- (d) Net-new gap — needs a new mechanism, not just a rule

### Convergence Checklist

Run this at the end of every loop. All four passes must complete.

```
Loop #: ___

[ ] VERIFY: Cross-checked all factual claims, numbers, dates, attributions
[ ] ATTACK: Challenged assumptions, tested logic chains, checked internal consistency
[ ] PRE-MORTEM: Assumed failure, worked backward to identify causes
[ ] REVISE: Applied all material changes (factual, logical, meaning-affecting)

Material changes this loop: ___

If material changes > 0: return to VERIFY (next loop)
If material changes = 0: CONVERGED — work is ready
If loop # > 3: STOP — reassess the approach (Kill Criteria)
```

### Research Gate Prompt

Use this (or adapt it) before any analysis, synthesis, or draft that makes factual claims.

```
Before I begin working on [task]:

1. What assumptions will inform my reasoning?
   - [List each assumption]

2. For each assumption, what research is needed?
   - [Assumption] → [Source type needed: live search, document fetch, database query]

3. What do I already know from prior research?
   - [Reference existing files/knowledge]

4. What gaps remain?
   - [List gaps that need live research]

I will complete the research for all gaps before beginning analysis.
```

### Source Verification Worksheet

For high-stakes claims driving recommendations.

```
| Claim | Source Type | Source URL | Fetched When | Primary Source? | Verified? |
|-------|------------|------------|-------------|----------------|-----------|
|       | vendor/academic/practitioner |  | [date/time] | Y/N | Y/N |
```

Rules:
- "Primary source" = the vendor's own page, the original paper, the actual data
- Secondary sources (comparison sites, blogs, summaries) are starting points, not endpoints
- Every Tier 1 claim (pricing, specs, legal status, feature availability) must trace to a primary source

### Learning Ledger Template

Produced after every quality check.

```
| # | Learned | Memorialized | Activated |
|---|---------|-------------|-----------|
|   | [What specific insight was discovered] | [Where it was recorded] | [What changed as a result] |
```

Rules:
- One row per material finding
- "Learned" = plain language, not jargon
- "Memorialized" = specific location (file + entry number)
- "Activated" = specific rule/mechanism changed, or "No activation needed" for one-time fixes

## Appendix: Worked Example — Strategic Analysis Task

This example walks through a complete QE-governed task from start to finish, showing how the mechanisms work together in practice. The task type is strategic analysis — the most common type of substantial work where the QE adds the most value.

### The Task

**User prompt:** "Analyze the competitive landscape for AI-powered customer support tools. I need to understand the top 5 players, their positioning, pricing, and where the market is heading. This will inform our product strategy for Q3."

### Phase 1: Research Gate (Mechanism #3) Fires

Before any analysis begins, the Research Gate blocks the AI from reasoning until it has live sources.

**Step 1: Inventory assumptions**
- Who are the top 5 players? (Need live data — this market changes quarterly)
- What is their current pricing? (Need vendor pages — cached data could be wrong)
- What's their positioning? (Need recent analyst coverage or product pages)
- Where is the market heading? (Need recent reports, funding data, product launches)

**Step 2: Execute research**
- Search for current market landscape reports (2025-2026)
- Fetch each vendor's pricing page directly (Source Verification Protocol — mechanism #7)
- Search for recent funding rounds, acquisitions, product launches
- Check for analyst reports on market direction

The Research Gate ensures this happens first, not after the AI has already formed opinions.

### Phase 2: Success Criteria Lock (Mechanism #5) Fires

Before drafting begins, define what "done" looks like:

```
Success Criteria:
1. Top 5 players identified with current market share or revenue data
2. Pricing for each player verified from primary sources (vendor's own page)
3. Positioning map shows clear differentiation axes
4. At least 3 market trend signals supported by evidence from the past 6 months
5. Actionable Q3 implications stated explicitly (not just "here's the landscape")

Kill Criteria:
- Max 3 convergence loops
- Max 4 hours
- If market data is too stale (nothing newer than 6 months), flag and redirect
```

### Phase 3: Pre-Action Reasoning (Mechanism #4)

```
Stakeholders: Product strategy team
Domain: Competitive intelligence — strategic/analytical
Tempo: Full QE (this informs Q3 product strategy — high stakes)
Pre-mortem: The biggest risk is stale pricing data. Secondary risk is
  identifying the wrong "top 5" based on brand awareness rather than
  actual market position.
Rollback: If the analysis proves unreliable mid-way (e.g., pricing data
  conflicts across sources), stop and flag rather than guessing.
```

### Phase 4: Draft Composition

The AI drafts the competitive analysis, grounding every claim in the research gathered in Phase 1. Each pricing claim links to the vendor's actual pricing page. Each market trend claim cites a specific source.

### Phase 5: Convergence Loop (Mechanism #6)

**Loop 1:**
- VERIFY: Cross-check all pricing against primary sources. Find that one vendor's pricing page has been updated since the initial research. Fix it.
- ATTACK: Challenge the positioning map. Are the differentiation axes the right ones? Identify that the analysis is over-indexing on features and under-weighting pricing models (usage-based vs. seat-based).
- PRE-MORTEM: "If the product team reads this and makes the wrong strategic bet, where would this analysis have led them astray?" Identify that the market trend section assumes continued enterprise focus, but recent funding data suggests a small-business pivot by two players.
- REVISE: 3 material changes (pricing update, positioning axis adjustment, trend nuance). Loop again.

**Loop 2:**
- VERIFY: Pricing now confirmed. New positioning axis checks out.
- ATTACK: The trend nuance added in Loop 1 — does the evidence actually support it? Check the funding data more carefully. It does.
- PRE-MORTEM: Actionable implications — are they specific enough? "Consider pricing model innovation" is not actionable. Revise to "Evaluate usage-based pricing for [specific segment] where [Competitor X] is gaining traction with this model."
- REVISE: 1 material change (sharpened implications). Loop again.

**Loop 3:**
- VERIFY: All claims check out.
- ATTACK: No new weaknesses found.
- PRE-MORTEM: No new failure modes identified.
- REVISE: 0 material changes. **Converged.**

### Phase 6: Verify Success Criteria

```
1. Top 5 players with market data: MET (market share data from [source])
2. Pricing verified from primary sources: MET (all 5 vendor pages fetched)
3. Positioning map with differentiation axes: MET (features + pricing model)
4. 3+ market trend signals with evidence: MET (4 trends, all cited)
5. Actionable Q3 implications: MET (3 specific recommendations)
```

All criteria met. Deliver.

### Phase 7: Learning Ledger (Mechanism #9)

| # | Learned | Memorialized | Activated |
|---|---------|-------------|-----------|
| 1 | Vendor pricing pages change more frequently than expected — initial research can go stale during the drafting phase | Issue log entry #47 | Added to Research Gate: for pricing-sensitive analyses, re-verify primary sources during the Verify pass, not just at the start |
| 2 | Positioning maps that use only feature dimensions miss pricing model innovation as a differentiator | Session learning log | No rule change needed — one-time analytical insight specific to this market |
| 3 | "Actionable implications" requires a specificity standard — "consider X" is not actionable, "evaluate X for Y where Z" is | Issue log entry #48 | Proposed patch to Success Criteria Lock: when implications are a success criterion, define a specificity test |

### What the QE Produced vs. What Would Have Happened Without It

| Dimension | Without QE | With QE |
|-----------|-----------|--------|
| Research | AI analyzes from training data, possibly outdated | Live sources fetched, primary sources verified |
| Pricing | Potentially months out of date | Verified from vendor pages the same day |
| Quality checks | Single pass, if any | 3 convergence loops, each finding real issues |
| Actionability | Generic recommendations | Specific, evidence-backed strategic actions |
| Learning | Nothing captured for next time | 3 insights logged, 1 rule patch proposed |

The QE didn't slow the work down — it prevented the rework that would have been required when the product team asked "where did you get this pricing?" or "what evidence supports this trend?"

*This document describes the Quality Engine as a system of transferable patterns. Companion Pattern Cards with mechanism-level implementation details and a QE Implementation Reference showing all 15 mechanisms working together in a live system are forthcoming.*
