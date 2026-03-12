---
name: prompt-optimizer
version: 1.3
updated: 2026-03-06
author: Marc Stockman
description: Skill 0 Prompt Optimization Engine — classifies tasks, extracts intent, builds problem statements with success criteria
scope: Pre-execution prompt optimization for complex or multi-step tasks
trigger: Auto-activates on complex/multi-step tasks. Skip on standing commands, simple questions, or continuations.
---

# Skill 0: Prompt Optimization Engine

**Version:** 1.3 | March 5, 2026
**Category:** Quality (Pre-Execution)
**Origin:** Net-new from Marc — eliminates the #1 recurring frustration: hours of refinement to get quality output from a mediocre first response.

---

## Purpose

Marc's core problem: AI produces a confident, polished-sounding first answer that is structurally incomplete — missing context, ungrounded, scope-drifted, or optimized for the wrong thing. Marc then spends hours in back-and-forth refinement. This skill eliminates that cycle by restructuring the raw prompt before the AI processes it, so the first output is already near-final.

**The insight:** LLMs are "highly sensitive to subtle variations in prompt formatting and structure, with studies showing up to 76 accuracy points across formatting changes." Pre-submission restructuring produces larger quality gains than any post-processing or retry strategy. The bottleneck is not the model — it's the input.

**The philosophy (Nate Jones):** "If you walk into a meeting without knowing what you want, the most articulate person in the room decides for you. AI is the most articulate thing you've ever talked to." Skill 0 ensures Marc's intent survives contact with the model's fluency.

---

## When This Fires

**Trigger sequence:**
1. Marc types `initialize` → bootstrap loads (rules, preferences, operational files)
2. Marc types his raw prompt (any length, any format — brain dump, one sentence, or detailed brief)
3. **Objective Intake runs first (if applicable)** — frames the outcome, selects persona, routes skills, classifies execution mode. Produces an Objective Brief that provides pre-resolved context.
4. **Skill 0 activates** — the AI does NOT execute the prompt directly
5. The AI restructures the prompt, presents it back to Marc
6. Marc reviews, approves or tweaks
7. Only then does the AI execute the optimized prompt

**Exception — skip Skill 0 when:**
- Marc explicitly says "just do it" / "skip optimization" / "execute directly"
- The prompt is a standing command (`check`, `self audit`, `audit`)
- The prompt is a simple factual question requiring no structuring
- The prompt is a continuation of an already-optimized task within the same session

**Presentation tiers (based on Step 0 classification):**
- **Tier 1 — Silent mode** (simple/low-stakes tasks, continuations): Run Steps 0-4 internally. Confirm intent in one sentence — "I understand you want [X]. Executing now." — and proceed. Marc can interrupt if the one-liner misses the point.
- **Tier 2 — Light mode** (medium complexity): Present a 3-5 line summary: intent, 2-3 key constraints, output format. Quick confirmation: "Approve or adjust?"
- **Tier 3 — Full mode** (high complexity, high stakes, significant ambiguity detected): Present the complete Step 5 template with all fields.

Default to the lightest tier that still ensures accuracy. If during internal optimization you discover a significant gap between the raw prompt and what Marc actually wants, escalate to a heavier tier regardless of complexity classification. Marc's time is the scarce resource — don't consume it unless the optimization surfaces something Marc needs to see.

---

## The Optimization Protocol (7 Steps)

### Step 0: Classify the Task (10 seconds)

Classify the prompt against the Six Axes of Difficulty to identify the actual bottleneck:

| Axis | Rating (None / Some / Hard Part) |
|------|----------------------------------|
| Reasoning | Is the thinking itself hard? |
| Effort | Is it hard because it's big/thorough? |
| Coordination | Does it need input from multiple sources? |
| Emotional Intelligence | Does tone/politics/sensitivity matter? |
| Domain Expertise | Does it need deep field-specific knowledge? |
| Ambiguity | Is it unclear what's actually being asked? |

**Classify, then route:**
- **Ambiguity is the hard part** → Step 1 becomes a clarification exchange (ask Marc 2-3 precise questions)
- **Effort is the hard part** → Step 3 focuses on decomposition and parallelization
- **Reasoning is the hard part** → Step 3 focuses on constraint architecture and reasoning scaffolds
- **Domain expertise is the hard part** → Step 2 adds a research requirement before execution
- **Emotional intelligence is the hard part** → Step 4 adds tone calibration and audience awareness
- **Coordination is the hard part** → Step 3 focuses on deliverable artifacts that enable human coordination

### Step 1: Extract What Marc Actually Wants (The Prompt 0 Extraction)

**If an Objective Brief is present:** Objective Intake (the upstream orchestration layer) may have already produced a brief containing the desired outcome, audience, persona, skill routing, and execution mode. When a brief is present, treat questions 1, 3, and the structural parts of 6 as pre-resolved. Confirm them rather than re-deriving them. Focus optimization effort on the remaining questions: 2 (stakes), 4 (failure modes), 5 (unspoken context), and 7 (the hard part). This prevents redundant extraction.

Seven Questions — infer from the raw prompt and Marc's context (memory, preferences, project history). Where the answer is ambiguous, ask.

| # | Question | What to Extract |
|---|----------|----------------|
| 1 | What is Marc actually trying to accomplish? | The outcome, not the task. |
| 2 | Why does this matter? | Stakes level → determines specification depth. |
| 3 | What does "done" look like? | Format, length, tone, level of detail, audience. |
| 4 | What does "wrong" look like? | The subtle failure mode — what would make Marc say "no, that's not what I meant." This is the most important question. |
| 5 | What does Marc already know that he hasn't said? | Institutional knowledge, unwritten rules, context from prior sessions. |
| 6 | What are the pieces? | Components, dependencies, what comes first, what can be parallelized. |
| 7 | What's the hard part? | Where judgment calls live. Where this could go sideways. |

**Critical:** If you cannot confidently answer questions 1, 3, or 4 from the raw prompt alone, you MUST ask Marc before proceeding. These three are non-negotiable.

**One-liner prompt:** Present best-guess answers to all 7 questions and ask Marc to confirm or correct.
**Detailed brief (3+ paragraphs):** Extract answers to all 7, fill gaps from memory/workspace, present the restructured prompt without asking questions (unless ambiguity remains).

### Step 2: Build the Self-Contained Problem Statement

Rewrite Marc's raw prompt into a self-contained problem statement:

1. **Context block** — Who Marc is, what project this is for, relevant background. Pull from memory, workspace files, session history. Apply standing directives (D-01–D-13) as implicit constraints.
2. **Outcome statement** — One sentence: what "done" looks like.
3. **Success criteria** — 3-5 testable criteria (per R-05). At least one negative criterion: what the output must NOT do.
4. **Constraint architecture:**
   - **Musts** — non-negotiable requirements
   - **Must-nots** — behaviors explicitly forbidden
   - **Preferences** — when multiple valid approaches exist, which does Marc prefer?
   - **Escalation triggers** — what should you ask Marc about rather than deciding autonomously? (per D-02, D-10)
5. **Grounding requirements** — What must be verified via live web search (per D-05, R-02, R-07) vs. existing knowledge. For Tier 1 claims (pricing, specs, features, compatibility, vendor timelines), specify that the vendor's primary source page must be fetched at time of writing (per R-20).
6. **Output contract** — Exact format, structure, length, and tone of the deliverable.

### Step 3: Apply Strategic Enhancements

Based on the task classification from Step 0:

**For all tasks:**
- **Priority stacking** — Make trade-offs explicit: "correctness > completeness > brevity > formatting elegance."
- **Failure behavior** — "If uncertain, say so and present 2-3 interpretations with assumptions labeled."
- **Scope discipline** — "Implement EXACTLY and ONLY what is requested. No unrequested additions."

**For high-stakes / complex tasks:**
- **Recursive self-modeling** — "Predict your typical response. Identify three weaknesses. Create a better response addressing those weaknesses."
- **Full spectrum analysis** — "Three uncertainties, three ways you could be wrong, your recommendation addressing both, two tough skeptic questions with answers."
- **Decomposition** — Break into independently executable, independently verifiable sub-tasks.

**For research / factual tasks:**
- **Grounding mandate** — "Every factual claim must cite a source. If no source, say so explicitly."
- **Research-before-synthesis** — "Complete all research before analysis. Complete all analysis before synthesis." (R-07)

**For deliverable creation:**
- **Success criteria pre-definition** (R-05)
- **Share gate** — "Every file created must be shared immediately." (R-11)
- **Visual formatting verification** — inspect every text element before sharing (Q3)

### Step 4: Calibrate for Marc's Preferences

| Preference | Application |
|-----------|-------------|
| Narrative + structure | Combine flowing narrative with structured breakdowns (tables, bullets, trade-offs) |
| Markdown deliverables | Default to .md unless Marc specifies otherwise |
| Grounded claims only | Every factual claim gets a web search citation |
| Present options, don't decide | For strategic decisions, present 2-3 options with trade-offs (D-02) |
| No execution without approval | Never start without Marc's "go" (D-10) |
| Budget not a constraint | Optimize for capability, not cost (D-08) |
| Portable and teachable | Solutions learnable by Marc or Jeff (D-09) |
| Describe roles, not people | Implementation docs describe what needs doing (D-13) |
| Proactive next-step | After every deliverable, suggest next command |
| Microsoft tools only | Never suggest Gmail, Google Docs, etc. |

### Step 5: Assemble and Present the Optimized Prompt

**Tier 1 (Silent):**
```
I understand you want [one-sentence outcome]. Executing now.
```

**Tier 2 (Light):**
```
## Quick Check

**What I understand you want:** [1-2 sentences]
**Key constraints:** [2-3 bullets]
**Output:** [format + length]

Approve or adjust?
```

**Tier 3 (Full):**
```
## Optimized Prompt

**Task Classification:** [Axes ratings from Step 0]
**Primary Bottleneck:** [Which axis is the hard part]

**What I understand you want:**
[One-paragraph narrative of the outcome]

**Success Criteria:**
1. [Testable criterion]
2. [Testable criterion]
3. [Testable criterion]
4. [Negative criterion — what the output must NOT do]

**Constraints:**
- Must: [list]
- Must not: [list]
- Preferences: [list]
- Escalation triggers: [list]

**Output Contract:**
- Format: [specific]
- Length: [specific]
- Tone: [specific]
- Structure: [specific sections/elements required]

**Research Requirements:**
- [What needs live web verification]
- [What can come from existing files/memory]

**Approach:**
[Execution methodology, tools, parallelization strategy]

**Estimated Scope:**
[Light / Medium / Heavy]

---
**Approve as-is, or tell me what to adjust.**
```

### Step 6: Marc Reviews

Four possible responses:
1. **`run`** → Execute the optimized prompt. Fires Step 7.
2. **"Approved" / "Go" / "Yes"** → Same as `run`.
3. **Marc provides adjustments** → Incorporate feedback, re-present (one more cycle only). Prompt QE Check 5 fires.
4. **"Skip" / "Just do it"** → Execute original raw prompt directly (override).

### Step 7: Post-Approval Execution Bridge

Once Marc approves:

- **R-07 Research Gate fires first** — Before any analysis/synthesis/drafting:
  1. Identify every factual claim the task will require
  2. Execute live web searches for each
  3. **For Tier 1 claims (per R-20):** Fetch the vendor's primary source page directly. Confirm specific data points match the live page. Citation format: [Source Name — verified DATE](URL)
  4. Document findings in workspace files
  5. Only then proceed to analysis and synthesis
  - **If research contradicts assumptions:** Stop and surface the conflict to Marc before continuing.
- **Q1 fires** — Pre-action reasoning log entry
- **All standing rules active** — D-01 through D-13, R-01 through R-20
- **Success criteria become the verification gate** — convergence loop (Q3) checks each criterion
- **Constraint architecture governs execution** — no scope drift
- **At delivery, apply R-18 + R-19** — Context anchor at top, suggested next command at bottom

---

## Prompt Quality Engine (Prompt QE)

Purpose-built quality layer for the optimization step — enforces only rules relevant to prompt structuring.

### Rules Enforced During Prompt Optimization (10 rules)

D-02 (Options), D-03 (Ethics), D-05 (Ground Claims), D-08 (Budget), D-10 (Approval), R-02 (Sources), R-03 (Apply Skills), R-05 (Success Criteria), R-07 (Research Gate), R-20 (Source Verification)

### Five Internal Checks

**Check 1 — Intent Convergence** (adapts R-10, Q3, R-15)
Does the optimized prompt answer all 7 questions? Does the output contract match intent? Does every success criterion trace back to something Marc said or implied? If "no," revise before presenting.

**Check 2 — Assumption Grounding** (adapts D-05, R-02, D-04)
Are all factual assumptions verified from memory, workspace, or live search? Anything based on stale context? Flag unverifiable assumptions: "I'm assuming X based on [source] — correct?"

**Check 3 — Red-Team Pass** (adapts Q5)
Simulate being the receiving LLM. Check for: token position effects (critical instructions in high-attention positions — beginning and end, not middle), competing instructions, ambiguity traps, scope creep vectors, failure mode coverage. Fix breakpoints before presenting. Escalate genuine ambiguities that only Marc can resolve.

**Check 4 — Substance Ratio** (adapts R-04, R-08, D-09)
Is optimization time proportionate to total expected cycle time? Is the prompt a concrete executable artifact, not a description of what a good prompt would look like? Is it portable?

**Check 5 — Correction Feedback Loop** (fires after Step 6 if Marc adjusts)
Capture what the optimization missed, why, and whether it's a pattern. If pattern (same correction 2+ sessions), promote via L2.

### Prompt QE Flow

```
Steps 0-5: Classify → Extract Intent → Build Spec → Enhance → Calibrate → Assemble
    ↓
[PROMPT QE: Checks 1-4 — pre-presentation pass]
    ↓
Step 6: Marc Reviews
    ↓ (if Marc adjusts)
[PROMPT QE: Check 5 — Correction Feedback Loop]
    ↓
Step 7: Execution Bridge
```

---

## Complete Workflow Integration

```
initialize → loads rules, preferences, ops files
    AI: "Ready for your prompt."
    ↓
Marc types brain dump
    ↓
OBJECTIVE INTAKE: Outcome framing → Persona → Skills → Execution mode → Objective Brief
    ↓
SKILL 0: Steps 0-5 → [PROMPT QE Checks 1-4] → Present (Tier 1/2/3)
    ↓
Marc reviews → adjusts or approves
    ↓
run → Step 7: R-07 Gate → Q1 → Q2 → Execute → Q3 → L1 → L2 → Deliver (R-18 + R-19)
    ↓
Marc's choice: self audit / check / audit / next task
```

### Marc's 5 Commands

| Command | When | What It Does |
|---------|------|-------------|
| `initialize` | Start of session | Loads the operating system |
| `run` | After reviewing optimized prompt | Executes with full quality stack |
| `self audit` | After delivery | 7-stage stress test on the deliverable |
| `check` | Anytime | 8-step operational compliance audit |
| `audit` | After self audit | One more forensic loop, material changes only |

**Edge case:** If Marc types `run` without a preceding Skill 0 optimization, treat as "execute my last instruction with all rules active." If no prior instruction exists, ask Marc what he wants to run.

---

## Rule Relationships

- **Q1:** Skill 0 generates the reasoning inputs that Q1 logs.
- **Q3:** Skill 0's success criteria become Q3's verification checklist.
- **Q4:** For process/system tasks, Skill 0 adds scalability question.
- **Q5:** "What does wrong look like?" feeds Q5's risk identification.
- **Q6:** For architectural tasks, adds emergent complexity gate.
- **R-05:** Skill 0 operationalizes R-05 by generating success criteria before every task.
- **R-07:** Step 7 fires R-07 as first action after `run`.
- **D-02 / D-10:** The approval gate (Step 6) is structural enforcement.

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Self Audit | NOT RUN | — | — | — |
| CHECK | NOT RUN | — | — | — |