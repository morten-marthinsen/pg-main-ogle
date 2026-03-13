# Model Routing — Workload-Specialized Assignment

**Version:** 1.0
**Created:** 2026-03-11
**Source:** OpenDev Enhancement 5 (arXiv:2603.05344) + ASI-Arch multi-model integration (arXiv:2507.18074)
**Purpose:** Map every cognitive task in the pipeline to the optimal model for that workload

---

## TABLE OF CONTENTS

- [Why This Exists](#why-this-exists)
- [The 6 Cognitive Roles](#the-6-cognitive-roles)
- [Role-to-Layer Mapping](#role-to-layer-mapping)
- [Per-Skill Override Table](#per-skill-override-table)
- [Arena Role Routing](#arena-role-routing)
- [Branch Engine Routing](#branch-engine-routing)
- [Cost Optimization](#cost-optimization)
- [Implementation Notes](#implementation-notes)

---

## WHY THIS EXISTS

OpenDev defines 5 model roles (Normal, Thinking, Critique, Planning, VLM) each bound to the optimal model for that cognitive workflow. ASI-Arch uses different LLMs for different phases (O3 for analysis, GPT-4.1 for implementation, separate Checker model for validation).

Marketing-OS currently uses a binary Opus/Sonnet split:
- Opus 4.6 for strategy (Skills 00-09)
- Sonnet 4.5 for copy (Skills 10-20)
- Branch engines: "default to Sonnet unless primarily analytical"

This is too coarse. Within a single skill, Layer 0 (loading) is a Planning task, Layer 1 (classification) is a Strategy task, Layer 2 (generation) is a Generation task, and Layer 3 (validation) is a Validation task. Each benefits from a different model's strengths.

---

## THE 6 COGNITIVE ROLES

| Role | Default Model | Fallback | Characteristics | When to Use |
|------|---------------|----------|-----------------|-------------|
| **Strategy** | Opus 4.6 | — | Deep reasoning, analytical precision, scoring, classification, synthesis | Strategic decisions that cascade downstream |
| **Generation** | Sonnet 4.5 | — | Fluid writing, large context capacity, fast copy production | Any task that produces prose, copy, or creative content |
| **Critique** | Opus 4.6 | Sonnet 4.5 | Adversarial evaluation, genuine weakness identification, cross-model evaluation | Arena Critic, editorial review, gate failure diagnosis |
| **Validation** | Haiku 4.5 | Sonnet 4.5 | Schema checks, gate verification, threshold validation, binary decisions | Layer 3 gates, handoff validation, checkpoint verification |
| **Planning** | Haiku 4.5 | Sonnet 4.5 | Upstream loading, file discovery, triage, context inventory | Layer 0, Pre-Flight Planning, Task Triage |
| **Visual** | Gemini (via MCP) | — | Image/video analysis, visual creative review | A05 visual direction, A08 creative production |

### Cross-Model Evaluation Insight

**The Critic should run on a DIFFERENT model than the generators when possible.**

A Sonnet generator evaluated by an Opus critic produces better results than Sonnet evaluating its own Sonnet output. Cross-model evaluation reduces self-congratulatory scoring because:
- The evaluating model has no memory of the creative choices that led to the output
- Different model architectures have different blind spots — cross-evaluation catches more
- ASI-Arch's Checker uses O3 to validate GPT-4.1's code for the same reason

This is analogous to ASI-Arch's principle: "fix technical issues, not creative choices." The Critic identifies structural problems (missing threading, dropped mechanism name, flow breaks) but does NOT override creative choices (metaphor selection, proof ordering, voice register).

---

## ROLE-TO-LAYER MAPPING

| Layer | Purpose | Cognitive Role | Model |
|-------|---------|---------------|-------|
| **Layer 0** (Foundation/Loading) | Load upstream packages, validate inputs, file discovery | Planning | Haiku 4.5 |
| **Layer 0.5** (Pre-Flight Planning) | Distill upstream context into Execution Brief | Planning | Haiku 4.5 |
| **Layer 1** (Classification/Analysis) | Score, classify, evaluate, rank | Strategy | Opus 4.6 |
| **Layer 2** (Generation/Drafting) | Write copy, generate content, produce creative output | Generation | Sonnet 4.5 |
| **Layer 2.5** (Arena — Persona Generators) | Generate competitive outputs per persona voice | Generation (copy) / Strategy (strategic) | Sonnet 4.5 / Opus 4.6 |
| **Layer 2.5** (Arena — Critic) | Identify ONE weakest element per output | Critique | Opus 4.6 |
| **Layer 2.5** (Arena — Judge) | Score all outputs across 7 criteria | Strategy | Opus 4.6 |
| **Layer 2.6** (Synthesizer) | Micro-element decomposition, hybrid reconstruction | Strategy | Opus 4.6 |
| **Layer 3** (Validation) | Gate checks, quality verification, threshold validation | Validation | Haiku 4.5 |
| **Layer 4** (Output Packaging) | Write handoff files, execution log, checkpoint YAML | Planning | Haiku 4.5 |

---

## PER-SKILL OVERRIDE TABLE

Some skills deviate from the default layer-to-role mapping because their cognitive profile doesn't match the layer's typical task:

| Skill | Layer | Default Role | Override To | Reason |
|-------|-------|-------------|-------------|--------|
| 00 (Deep Research Setup) | All | Planning | Planning (Haiku) | Mechanical — file setup and research config |
| 01 (Research) | Layer 2 | Generation | Strategy (Opus) | Research classification is analytical, not generative |
| 02 (Proof Inventory) | Layer 2 | Generation | Strategy (Opus) | Scoring and gap analysis is analytical |
| 03 (Root Cause) | Layer 2 | Generation | Strategy (Opus) | Root cause selection requires deep reasoning |
| 04 (Mechanism) | Layer 2 | Generation | Strategy (Opus) | E-level classification and scorecard evaluation |
| 05 (Big Idea) | Layer 2 | Generation | Strategy (Opus) | RSF scoring, schema distance calculation |
| 06 (Offer) | Layer 2 | Generation | Strategy (Opus) | Offer architecture is structural/analytical |
| 07 (Persona) | Layer 2 | Generation | Strategy (Opus) | Persona development requires analytical depth |
| 08 (Structure) | Layer 2 | Generation | Strategy (Opus) | Structure engineering is architectural |
| 09 (Campaign Brief) | Layer 2 | Generation | Strategy (Opus) | Synthesis of all foundation outputs |
| 10 (Headlines) | Layer 2 | Generation | Generation (Sonnet) | Creative generation — default applies |
| 19 (Assembly) | Layer 2 | Generation | Validation (Haiku) | Assembly is mostly mechanical — concatenation with coherence checks |
| 20 (Editorial) | All Layers | Mixed | Critique (Opus) | Fresh-context editorial benefits from analytical depth |

**Skills 11-18:** Use default layer mapping (Generation/Sonnet at Layer 2, Haiku at Layers 0/3/4).

---

## ARENA ROLE ROUTING

| Arena Role | Model | Why |
|------------|-------|-----|
| Persona generators (strategic skills 03-08) | Opus 4.6 | Strategic concept generation needs depth |
| Persona generators (copy skills 10-18) | Sonnet 4.5 | Copy generation needs fluidity + large context |
| Critic (all skills) | Opus 4.6 | Genuine weakness identification requires analytical depth |
| Judge / Scorer (all skills) | Opus 4.6 | Precise multi-dimensional scoring across 7 criteria |
| Synthesizer (all skills) | Opus 4.6 | Micro-element decomposition and hybrid reconstruction require precision |
| Revision agents (all skills) | Same as generators | Revisions should use the same model that generated the original |

**Single-Context Mode:** In single-context Arena, model routing applies at the session level — you cannot switch models mid-session. The session runs on the model assigned to the skill's primary cognitive role (Opus for strategic skills, Sonnet for copy skills). The Critic and Judge run within the same context on the same model. This is a known limitation of single-context mode.

**Subagent Mode:** Each subagent specifies its model via the `model` parameter on the Task tool call. This enables true cross-model evaluation — Sonnet generates, Opus critiques.

---

## BRANCH ENGINE ROUTING

| Engine | Default Model | Override Skills |
|--------|---------------|-----------------|
| **Ads (A01-A12)** | Sonnet 4.5 | A01 (Ad Intelligence) → Opus, A10 (Pre-Launch Scoring) → Opus |
| **Email (E0-E4)** | Sonnet 4.5 | None — all generation-heavy |
| **Organic (S01-S24)** | Sonnet 4.5 | S09 (Intelligence) → Opus |
| **Upsell (U0-U5)** | Sonnet 4.5 | U0 (Upsell Strategy) → Opus |
| **E-Commerce (03-e-comm)** | Sonnet 4.5 | Strategic skills → Opus |
| **Checkout (06-checkout)** | Sonnet 4.5 | — |
| **Advertorials (09-advertorials)** | Sonnet 4.5 | — |

---

## COST OPTIMIZATION

| Cognitive Role | Model | Relative Cost (per 1M tokens) | Usage Frequency |
|---------------|-------|-------------------------------|-----------------|
| Strategy (Opus) | Opus 4.6 | $$$ | Medium — foundation + Arena critic/judge |
| Generation (Sonnet) | Sonnet 4.5 | $$ | High — all copy generation, persona generators |
| Critique (Opus) | Opus 4.6 | $$$ | Low-Medium — 1 critique per round per skill |
| Validation (Haiku) | Haiku 4.5 | $ | High — every gate, every layer transition |
| Planning (Haiku) | Haiku 4.5 | $ | Medium — Layer 0/4 per skill, pre-flight |
| Visual (Gemini) | Gemini | $ (via MCP) | Low — A05 and A08 only |

**Estimated savings vs. current approach:**

| Routing Change | Cost Impact |
|---------------|-------------|
| Layer 0 → Haiku (from Opus on strategy skills) | ~80% reduction on loading/validation for 10 skills |
| Layer 3 → Haiku (from Sonnet on copy skills) | ~70% reduction on gate checks for 11 skills |
| Layer 4 → Haiku (from Sonnet on copy skills) | ~70% reduction on output packaging |
| Arena Critic → Opus (from Sonnet on copy skills) | Quality improvement — Opus critique catches more. Slight cost increase. |
| Skill 19 (Assembly) → Haiku (from Sonnet) | ~70% reduction — assembly is mechanical |

**Net effect:** Lower total cost with higher quality on the tasks that matter most (critique, strategic analysis).

---

## IMPLEMENTATION NOTES

### In Claude Code

- **Session-level:** The main session runs on one model (Opus or Sonnet per SESSION-ARCHITECTURE.md). Model routing within a session uses subagent delegation.
- **Subagent routing:** Each Task tool call specifies `model: "opus"`, `model: "sonnet"`, or `model: "haiku"`.
- **Haiku for validation:** Create a Haiku subagent for Layer 3 gate checks. The subagent reads the output files, runs the validation, writes the gate result. The main session continues.
- **Haiku for loading:** Create a Haiku subagent for Layer 0 upstream loading. The subagent reads upstream packages, validates presence and completeness, writes a loading report. The main session proceeds to Layer 1 with confidence.

### Routing Decision Tree

```
GIVEN: current skill, current layer, arena role (if applicable)

1. Check Per-Skill Override Table
   → If override exists for this skill + layer, use override model
   → If no override, continue

2. Check Arena Role Routing (if in Arena)
   → Use model assigned to arena role (Critic → Opus, etc.)
   → If not in Arena, continue

3. Use Role-to-Layer Mapping
   → Layer 0 → Haiku
   → Layer 1 → Opus
   → Layer 2 → Sonnet (copy) or Opus (strategy, per override)
   → Layer 3 → Haiku
   → Layer 4 → Haiku
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-11 | Initial creation. 6 cognitive roles with model assignments, per-layer mapping, per-skill overrides, Arena routing, branch engine routing, cost analysis. From OpenDev Enhancement 5 + ASI-Arch multi-model integration. |
