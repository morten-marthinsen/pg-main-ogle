---
name: qe-reasoning-engine
version: 1.0
updated: 2026-03-06
author: Marc Stockman
description: Quality Engine Phases 2-3 — Decomposition, Structured Reasoning (CoT/ToT/ReAct), Draft Composition with Q1/Q5/Q6 integration
scope: Cognitive engine for planning, reasoning, and drafting within the QE pipeline
trigger: QE pipeline Phase 2-3 execution, complex multi-step analysis, decomposition
---

# Quality Engine — Phases 2-3: Reasoning Engine (Plan, Reason & Draft)

**Version:** 1.0 | March 5, 2026
**Category:** Quality Engine — Phases 2-3
**QE Skills Covered:** Skill 4 (Decomposition & Evidence Plan), Skill 5 (Structured Reasoning Engine), Skill 6 (Draft Composer)
**Accelerator Integration:** Q1 (ThoughtPad), Q5 (FMEA planning), Q6 (First-Principles Decomposition)
**Pipeline Position:** After Phase 1 (qe-strategic-reasoning) → before Phase 4 (qe-quality-assurance)

---

## Purpose

Phase 2 answers: **How should we break this down, what reasoning approach fits, and what evidence do we need?**
Phase 3 answers: **What does the complete first draft look like?**

This is the cognitive engine — where the actual thinking happens. Phase 1 locked the problem; this skill solves it. Phase 4 (in qe-quality-assurance) will then verify the solution.

---

## Relationship to Existing Skills

**DEFER TO `prompt-optimizer`** for the Skill 0 optimization cycle. Prompt-optimizer's Step 3 (Strategic Enhancements) includes decomposition guidance. This skill's procedures execute AFTER Marc approves the prompt and says `run`.

**Integration with Accelerators (per Reconciliation document):**
- **Q1 (ThoughtPad):** Q1's pre-action reasoning is the behavioral mandate. This skill's procedures are the specific per-query implementation. Q1 fires as a behavioral wrapper; Skill 4-6 fire as pipeline procedures.
- **Q6 (First-Principles):** Q6 fires BEFORE Skill 4 in the pipeline. Q6 is epistemological ("what do we actually know?"). Skill 4 is operational ("what steps do we need?"). Sequential, not redundant.
- **Q5 (FMEA):** Q5's risk-aware planning enriches Skill 4's evidence plan with risk identification early in the process. Full FMEA scoring happens later in Phase 5 (qe-quality-assurance).

---

## Pre-Phase 2: Q6 First-Principles Decomposition

### When It Fires

Standard and Thorough modes. Before Skill 4. Simplified or skipped in Fast mode.

### Procedure (from Accelerator Q6, Steps A-C)

**Step A: Decompose to Fundamentals**
Strip the problem to its core components. Remove jargon, assumed frameworks, and inherited constraints. Ask: "If we were solving this from scratch with no prior assumptions, what would the essential elements be?"

**Step B: Strip Assumptions**
Identify every assumption embedded in the current framing. For each: is it a ground truth (verified, non-negotiable) or an inherited assumption (accepted without verification)? Challenge inherited assumptions.

**Step C: Identify Ground Truths**
List only what is verifiably true. Everything else is a hypothesis to be tested during reasoning.

### Effort Scaling

- **Fast:** Skip entirely — go directly to Skill 4
- **Standard:** Quick pass — 3-5 minutes, identify top 3 ground truths and top 3 inherited assumptions
- **Thorough:** Full decomposition — complete Steps A-C, then continue to Q6 Steps D-H (benchmark against prior art, search for established frameworks, integrate validated improvements, cite sources)

---

## Skill 4: Decomposition & Evidence Plan

### Cognitive Job

Break the task into ordered subgoals with dependencies and completion tests. For each subgoal, classify the knowledge strategy: grounded (cite sources), computable (derive via math/code), reasoned (logic-based), or uncertain (must qualify).

### Provenance

Merges Claude's Least-to-Most Decomposer (Skill 4) with GPT's Decomposition (Skill 5) and Evidence Plan (Skill 6).

### Procedure

**1. Subgoal decomposition:**

Break the anchored objective (from Phase 1) into 3-10 ordered subgoals. Each subgoal must:
- Map to a specific, identifiable piece of the deliverable
- Have a clear completion test ("How do I know this subgoal is done?")
- Identify dependencies on other subgoals

**2. Dependency mapping:**

```
SUBGOAL MAP:
1. [Subgoal] → depends on: [none / other subgoals]
   Evidence strategy: [grounded / computable / reasoned / uncertain]
   Completion test: [specific, testable]
2. [Subgoal] → depends on: [1]
   Evidence strategy: [...]
   Completion test: [...]
```

**3. Evidence plan (R-07 integration):**

For each subgoal, classify the knowledge strategy:

| Strategy | Meaning | Action |
|----------|---------|--------|
| **Grounded** | Claim must be sourced from live data | Web search required. Tier 1 claims → Level 2 verification (R-20) |
| **Computable** | Answer can be derived via calculation or code | Show the calculation or code |
| **Reasoned** | Answer follows from logic applied to known facts | Document the reasoning chain |
| **Uncertain** | Answer cannot be reliably determined | Must qualify with uncertainty language |

**4. Q5 Risk-Aware Planning (Standard/Thorough only):**

For each subgoal, quick risk scan:
- What could go wrong with this subgoal?
- Is this a one-way door or two-way door? (Amazon framework from Q5)
- If one-way door: what's the rollback plan?

This is a lightweight version of Q5 — full FMEA scoring (S×O×D) happens in Phase 5.

### Effort Scaling

- **Fast:** 2-3 subgoals, no evidence plan, no risk scan. Linear execution.
- **Standard:** Full decomposition (3-7 subgoals) + evidence plan + light risk scan
- **Thorough:** Detailed decomposition (5-10 subgoals) + full evidence plan + dependency graph + risk-aware planning with door framework

### Output

```
DECOMPOSITION COMPLETE:
- Subgoals: [count]
- Dependencies: [graph summary]
- Evidence plan: [Tier 1 claims requiring Level 2 verification]
- Risk flags: [one-way doors identified, if any]
- Ready for reasoning: [YES / NO — reason]
```

---

## Skill 5: Structured Reasoning Engine

### Cognitive Job

Execute the primary reasoning pass using the minimum-sufficient reasoning topology. Select from available modes based on task type and effort level.

### Provenance

Synthesis of GPT Skill 7 (Reasoning Mode Operator), Claude Skills 1 + 2 (CoT + ToT), Perplexity Skill 2 (unified scaling), Gemini Skill 2 (topological reasoning — adapted from GoT to practical ToT ceiling).

### Mode Selection

| Mode | When to Use | Description |
|------|------------|-------------|
| **Direct** | Simple factual retrieval, low-ambiguity tasks | Answer directly with minimal reasoning scaffolding |
| **Chain-of-Thought (CoT)** | Most tasks, default for Fast mode | Linear step-by-step reasoning. Show your work. |
| **Tree-of-Thoughts (ToT)** | Complex tasks with multiple valid approaches, Thorough mode default | Explore ≥3 solution branches, evaluate each, prune weak branches, expand best 1-2 |
| **ReAct** | Tasks requiring tool use (web search, file ops, API calls) | Interleave reasoning steps with action steps. Think → Act → Observe → Think. |
| **Code-Delegate** | Calculations, data processing, anything where code is more reliable than reasoning | Write and execute code rather than reasoning through the computation |

### Decision Logic

```
Is this a calculation or data processing task?
    YES → Code-Delegate
    NO ↓

Does this require tool use (search, fetch, file operations)?
    YES → ReAct
    NO ↓

What effort mode?
    Fast → CoT (linear, one path)
    Standard → CoT with 2-3 candidate framings evaluated
    Thorough → ToT (≥3 branches, evaluate, prune, expand best 1-2)
```

### Q1 ThoughtPad Integration

For Standard and Thorough modes, the reasoning pass uses Q1's ThoughtPad structure as the internal scratchpad:

| ThoughtPad Type | When to Use |
|----------------|------------|
| **Standard** | Default for most reasoning tasks |
| **Debug** | Troubleshooting and problem diagnosis |
| **Design** | System design, architecture decisions |
| **Review** | Evaluating existing work or proposals |
| **Creative** | Brainstorming, ideation, content creation |

The ThoughtPad provides the 5-dimension scoring framework for evaluating reasoning quality at the end of each branch/path.

### Effort Scaling

- **Fast:** Direct answer or linear CoT. Single path. No branching.
- **Standard:** CoT with 2-3 candidate paths evaluated. Best path selected with reasoning. ThoughtPad used for tracking.
- **Thorough:** Full ToT with ≥3 branches. Each branch explored to sufficient depth. Evaluation criteria applied. Pruning of weak branches. Expansion of best 1-2. ThoughtPad used for each branch.

### Known Limitations

- **ReAct and Code-Delegate** activate only when tools/code execution are available. In environments without tool access, these modes are inactive and the skill routes to CoT/ToT.
- **ToT branching** is simulated within a single context window — the model cannot perform true BFS/DFS over a persistent data structure. "Branching" means considering multiple approaches sequentially and selecting the best one.
- **GoT (Graph-of-Thoughts)** was considered but excluded. Gemini's source report championed GoT as state-of-the-art, but the practical distinction between bounded ToT with backtracking and depth-limited GoT is largely terminological within a single context window. ToT captures the useful subset.

### Output

Complete reasoning trace and draft solution for each subgoal, organized by the decomposition plan from Skill 4.

---

## Skill 6: Draft Composer

### Cognitive Job

Compile reasoning outputs into a complete, structured first draft that satisfies the deliverable checklist. No meta-commentary — just the answer.

### Provenance

GPT Skill 8 (Draft Composer). Three of four source reports (Claude, Gemini, Perplexity) treat drafting as implicit. The QE synthesis retained it as explicit because verification quality in Phase 4 depends on draft structure.

### Procedure

**1. Check deliverable spec** from Phase 1 (format, length, audience, success criteria).

**2. Compile reasoning outputs** from Skill 5 into the requested format:
- Cover every item in the deliverable checklist
- Cover every subgoal from the decomposition plan
- Use the format specified in the output contract

**3. Apply quality standards:**
- No unsupported factual claims (mark uncertainty where it exists)
- No meta-commentary ("As an AI..." / "In this section I will...")
- Clear structure with headers, tables, and bullets as appropriate
- Marc's preferences applied: narrative + structure, markdown format, large fonts for visual assets

**4. Mark draft status:**
- This is the first complete draft
- It has NOT been verified (Phase 4), stress-tested (Phase 5), or governed (Phase 6)
- Mark any claims that need verification with `[VERIFY]` tags for Phase 4

### Effort Scaling

Same across modes — the draft is always complete. Quality varies because upstream reasoning depth varies.

### Design Rationale

Explicit drafting as a separate step ensures the transition from "reasoning trace" to "user-facing answer" is a conscious, governed step. This prevents Phase 4 (verification) from operating on raw reasoning traces rather than structured prose.

**Trade-off acknowledged:** If token budget analysis shows Skill 6 adds material overhead without improving verification quality, it is the first candidate for elimination — its output-format specification would fold into Skill 5.

---

## Phase 2-3 Integration Flow

```
Phase 1 artifact arrives (objective, constraints, assumptions, sources plan)
    ↓
Q6: First-Principles Decomposition (Standard/Thorough only)
    → Fundamentals → Strip assumptions → Ground truths
    ↓
Skill 4: Decomposition & Evidence Plan
    → Subgoals → Dependencies → Evidence strategies → Risk scan
    ↓
R-07 Research Gate fires (per prompt-optimizer Step 7)
    → All Tier 1 claims researched at primary sources (R-20)
    → Research completed BEFORE reasoning begins
    ↓
Skill 5: Structured Reasoning Engine
    → Mode selection → Execute reasoning → Complete trace per subgoal
    ↓
Skill 6: Draft Composer
    → Compile → Format → Mark [VERIFY] tags → First complete draft
    ↓
Phase 2-3 Complete → Hand off to Phase 4 (Verify) in qe-quality-assurance
```

---

## Effort Mode Quick Reference

| Component | Fast | Standard | Thorough |
|-----------|------|----------|----------|
| Q6 First-Principles | Skip | Quick pass (3-5 ground truths) | Full A-C + D-H (prior art benchmark) |
| Decomposition | 2-3 subgoals | 3-7 subgoals + evidence plan | 5-10 subgoals + full plan + risk scan |
| Reasoning mode | Direct or linear CoT | CoT with 2-3 paths | ToT ≥3 branches with pruning |
| ThoughtPad | Not used | Standard template | Type-specific template per branch |
| Risk-aware planning | Skip | Light (door framework) | Full (door framework + failure modes) |
| Draft | Complete but minimal | Complete with full structure | Complete with exhaustive detail |

---

*Quality Engine Phases 2-3 of 6. Receives from qe-strategic-reasoning (Phase 1). Proceeds to qe-quality-assurance (Phases 4-6).*

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Self Audit | NOT RUN | — | — | — |
| CHECK | NOT RUN | — | — | — |