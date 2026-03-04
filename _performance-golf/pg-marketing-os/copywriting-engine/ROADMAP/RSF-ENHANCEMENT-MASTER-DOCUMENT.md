# RSF Enhancement Master Document

**Version:** 1.0
**Date:** 2026-01-29
**Status:** Approved for Implementation
**Scope:** Complete CopywritingEngine pipeline enhancement
**Authority:** Primary reference for RSF-driven system overhaul

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Theoretical Foundation](#2-theoretical-foundation)
3. [Technical Architecture](#3-technical-architecture)
4. [Terminology Glossary](#4-terminology-glossary)
5. [Implementation Specifications](#5-implementation-specifications)
6. [Quality Philosophy](#6-quality-philosophy)
7. [Measurement Framework](#7-measurement-framework)
8. [Research Bibliography](#8-research-bibliography)

---

# 1. EXECUTIVE SUMMARY

## 1.1 The Core Problem

Large Language Models can generate creative advertising copy, but they struggle to reliably produce the **upper tail** of creative quality — the breakthrough Big Ideas that define successful direct response campaigns. The distribution of LLM creative output clusters around average quality. Occasionally, excellent outputs emerge, but the system cannot aim at them consistently.

## 1.2 The RSF Solution

The Resonant Surprise Framework (RSF) addresses this by:

1. **Mapping the target**: Defining exactly what makes a Big Idea effective (surprise + resonance + resolution)
2. **Constraining the search**: Giving the model explicit constraints about what to avoid and what to connect to
3. **Generating variants**: Producing multiple candidates with different emphasis strategies
4. **Selecting intelligently**: Using isolated, calibrated judges to identify upper-tail outputs

## 1.3 The Enhancement Scope

This document specifies a **complete pipeline overhaul** — not just Big Ideas, but RSF principles embedded throughout:

- **Deep Research**: Temporal weighting, emotional momentum tracking
- **Root Cause**: RSF-aware framing
- **Mechanism**: RSF-aware naming and positioning
- **Promise**: RSF-aware emotional resonance
- **Big Ideas**: Complete RSF-driven generation and selection

## 1.4 The Quality Mandate

**Quality is 10x more important than time.** Every architectural decision optimizes for output quality, not processing efficiency. The system must actively resist the efficiency trap.

---

# 2. THEORETICAL FOUNDATION

## 2.1 Why Creative Advertising Effectiveness Follows a Power Law

In direct response advertising, a small percentage of campaigns generate the majority of revenue. This is not random — it reflects the cognitive science of attention and persuasion:

- **Attention is scarce**: Audiences are exposed to thousands of marketing messages. Only those that violate expectations capture attention.
- **Trust is earned**: Attention without resonance produces curiosity but not action. The message must connect to something the audience already feels.
- **Resolution enables action**: A surprising message that can't be understood produces confusion. Resolution within ~3 seconds allows the audience to engage.

The intersection of these three factors — **surprise**, **resonance**, and **resolution** — defines effective creative advertising.

## 2.2 The Psychological Basis: Schema Incongruity Theory

### Schema Theory (Mandler, 1982; Heckler & Childers, 1992)

Humans process information through **schemas** — mental frameworks that organize expectations about categories. When we encounter marketing for a product category, we unconsciously activate the schema for that category's typical messaging:

- Health supplements → "natural," "clinically proven," "doctor recommended"
- Business coaching → "proven system," "step-by-step," "secrets of success"
- Golf instruction → "simple tips," "consistency," "lower your handicap"

**Schema-congruent messages** are processed efficiently but generate low attention — they match expectations, so there's nothing to notice.

**Schema-incongruent messages** demand attention because they violate expectations. The brain must reconcile the unexpected information with existing schemas.

### The Inverted-U Relationship

The relationship between incongruity and effectiveness is not linear. It follows an **inverted-U curve**:

```
                    EFFECTIVENESS
                         │
                         │        ╭──────╮
                         │      ╱        ╲
                         │    ╱            ╲
                         │  ╱                ╲
                         │╱                    ╲
                    ─────┴─────────────────────────── INCONGRUITY
                    0    2    4    6    8    10
                         │         │         │
                    Low          Optimal    High
               (no attention)  (attention   (confusion)
                              + resolution)
```

- **Low incongruity (0-3)**: Insufficient surprise. Message blends into the expected landscape.
- **Moderate incongruity (4-7)**: Optimal zone. Captures attention and allows resolution.
- **High incongruity (8-10)**: Too surprising. Audience cannot resolve the incongruity; confusion or rejection results.

### Resolvable Incongruity

The key insight is that incongruity must be **resolvable**. The audience needs a cognitive path from "that's unexpected" to "oh, I get it." This resolution:

- Must happen quickly (within ~3 seconds for advertising)
- Must connect to something the audience already knows or feels
- Must not require specialized knowledge the audience lacks

## 2.3 The Emotional Basis: Latent vs. Expressed Emotions

### Expressed Emotions

These are emotions the audience openly acknowledges and discusses:
- "I'm frustrated with my golf game"
- "I want to lose weight"
- "I need more leads for my business"

Competitors know these emotions and address them directly. They are **saturated territory**.

### Latent Emotions

These are emotions the audience **feels but doesn't articulate** — often because:
- They're embarrassed to admit them
- They haven't consciously identified them
- Cultural norms discourage expression
- The emotion is too painful to examine

Examples:
- "I'm starting to wonder if something is fundamentally wrong with me"
- "I'm afraid I've wasted years on the wrong approach"
- "I secretly resent that others seem to succeed effortlessly"

Latent emotions are **unexploited territory**. When a message crystallizes a latent emotion, the audience experiences profound recognition: "Finally, someone said it."

### The "Finally Someone Said It" Test

A message passes the FSSIT test if the target audience would:
1. Immediately recognize the statement as true for them
2. Feel it couldn't have been articulated better
3. Feel seen and understood
4. Not have seen this exact framing in competitor messaging

FSSIT candidates are the primary resonance anchors for Big Idea generation.

## 2.4 The Gift Test (Surprise × Relevance)

The RSF borrows from gift-giving psychology research (Algoe et al., 2008):

> The most memorable gifts are simultaneously **unexpected** and **perfectly suited** to the recipient.

A gift that is expected but appropriate = pleasant but forgettable
A gift that is unexpected but inappropriate = puzzling or off-putting
A gift that is **unexpected AND appropriate** = memorable and relationship-building

Applied to advertising:
- **Unexpected + Irrelevant** = clever but doesn't convert
- **Expected + Relevant** = competent but forgettable
- **Unexpected + Relevant** = breakthrough Big Idea

The Gift Test evaluates: "Would the audience feel this message was crafted specifically for them, yet they never would have expected it?"

## 2.5 The Four Conditions of Resonant Surprise

For a Big Idea to succeed, it must satisfy four conditions:

### Condition 1: Expectation Schema Violation

The message must depart meaningfully from the audience's expected messaging patterns. This requires:
- **Mapping the schema**: What does the audience expect to see?
- **Identifying saturation**: Which patterns are so overused they produce numbness?
- **Finding whitespace**: Where are competitors NOT messaging?
- **Targeting violation**: Which specific expectations will this message violate?

**Measurement:** Schema Distance (SD) score, 1-10

### Condition 2: Latent Resonance Connection

The message must connect to emotions the audience feels but hasn't articulated. This requires:
- **Distinguishing expressed from latent**: What do they say vs. what do they feel?
- **Identifying FSSIT candidates**: What statements would produce recognition?
- **Mapping emotional gaps**: Where is the distance between expressed and latent greatest?
- **Targeting connection**: Which specific latent emotion will this message crystallize?

**Measurement:** Resonance Depth (RD) score, 1-10

### Condition 3: Resolvable Incongruity

The audience must be able to "get it" quickly. This requires:
- **Cognitive path mapping**: What steps does the audience take to understand?
- **Assumption auditing**: What must the audience already know?
- **Resolution timing**: Can they get it in <3 seconds?
- **Clarity testing**: Is the "aha moment" clear?

**Measurement:** Resolution Accessibility (RA) score, 1-10

### Condition 4: Temporal Alignment

The message must land in the current cultural and emotional moment. This requires:
- **Cultural timing analysis**: What's happening now that affects receptivity?
- **Emotional momentum tracking**: Are the targeted emotions increasing or declining?
- **Tone sensitivity**: Is the message tonally appropriate for the current moment?
- **Risk assessment**: Could current events make this message backfire?

**Measurement:** Temporal Fit (TF) score, 1-10 (or GATE: Pass/Caution/Fail)

## 2.6 The RSF Composite Score

Previous formulation: `RSF Composite = SD × RD × RA × TF / 1000`

**Enhanced formulation** (implements inverted-U and gating):

```
STEP 1: Temporal Gate
IF TF = FAIL: Reject candidate entirely
IF TF = CAUTION: Flag for human review

STEP 2: Schema Distance Gate
IF SD < 4: Reject (insufficient surprise)
IF SD > 8: Flag for human review (may be too confusing)

STEP 3: Optimization Score (within acceptable ranges)
Score = RD × RA × (SD_adjusted)

Where SD_adjusted:
- SD ≤ 7: SD_adjusted = SD
- SD > 7: SD_adjusted = 7 - (SD - 7) × 0.5

STEP 4: Ranking
Candidates ranked by Score
Top 5 advance to human checkpoint
```

This formulation:
- Gates temporal failures entirely (they don't score, they fail)
- Gates extreme schema distances (flags, doesn't reward)
- Optimizes resonance and resolution within acceptable surprise range
- Implements the inverted-U relationship

---

# 3. TECHNICAL ARCHITECTURE

## 3.1 Pipeline Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DEEP RESEARCH (Skill 00)                          │
│                                                                             │
│  Layer 1: Quote Mining (with TEMPORAL TAGGING)                              │
│  Layer 2: Synthesis (Market Narrative, Beliefs, Competitors)                │
│  Layer 2.5: Sophistication Analysis                                         │
│  Layer 2.8-A: Expectation Schema Mapper (RSF)                               │
│  Layer 2.8-B: Latent Resonance Identifier (with EMOTIONAL MOMENTUM)         │
│                                                                             │
│  KEY OUTPUTS:                                                               │
│  • expectation_schema.json                                                  │
│  • latent_resonance_field.json (with FSSIT candidates)                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SKILLS 01-04 (RSF-AWARE)                            │
│                                                                             │
│  01-Proof Inventory: Collect evidence (minimal RSF change)                  │
│  02-Root Cause: Identify real problem (RSF framing awareness)               │
│  03-Mechanism: Explain solution (RSF whitespace awareness)                  │
│  04-Promise: Core deliverable (RSF resonance awareness)                     │
│                                                                             │
│  KEY OUTPUTS:                                                               │
│  • proof_inventory.json                                                     │
│  • root_cause_packages.json (RSF-enhanced)                                  │
│  • mechanism_packages.json (RSF-enhanced)                                   │
│  • promise_packages.json (RSF-enhanced)                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      BIG IDEAS (RSF-DRIVEN) — Skill 05                      │
│                                                                             │
│  GENERATION CONTEXT (isolated):                                             │
│  • RSF research (expectation_schema, latent_resonance_field)                │
│  • Truth packages (root_cause, mechanism, promise)                          │
│  • FSSIT-first generation protocol                                          │
│  • Multi-variant generation (3 strategies × 3 candidates)                   │
│  • Pre-flight disqualification filter                                       │
│                                                                             │
│  OUTPUT: 9 Big Idea candidates                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         JUDGE CONTEXT (isolated)                            │
│                                                                             │
│  INPUTS (judge has):                                                        │
│  • 9 Big Idea candidates                                                    │
│  • RSF research (for scoring reference)                                     │
│  • Scoring rubric                                                           │
│                                                                             │
│  INPUTS (judge does NOT have):                                              │
│  • Generation prompt                                                        │
│  • "Intended" quality                                                       │
│  • Other candidates' scores during evaluation                               │
│                                                                             │
│  PROCESS:                                                                   │
│  • Resolution pathway mapping for each candidate                            │
│  • RSF scoring (SD, RD, RA, TF)                                             │
│  • Tournament-style pairwise selection                                      │
│  • Three judge perspectives voting                                          │
│                                                                             │
│  OUTPUT: Top 5 candidates ranked with rationale                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          HUMAN CHECKPOINT                                   │
│                                                                             │
│  Human receives:                                                            │
│  • Top 5 candidates with RSF scores                                         │
│  • Judge rationale for each                                                 │
│  • FSSIT connection map (which FSSIT each connects to)                      │
│  • Schema violation map (which expectations each violates)                  │
│  • Resolution pathway (cognitive steps for each)                            │
│                                                                             │
│  Human decides:                                                             │
│  • Final selection                                                          │
│  • Request iteration (specific feedback)                                    │
│  • Request new generation                                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 3.2 Data Flow Detail

### Deep Research → RSF Outputs

```yaml
INPUT: Raw market data (forums, reviews, competitor sites, quotes)

PROCESS:
  1. Quote Mining (Layer 1)
     - Scrape/collect audience quotes
     - Classify by bucket (PAIN, ROOT_CAUSE, SOLUTIONS_TRIED, etc.)
     - NEW: Tag each quote with temporal_recency (current/recent/aging/old)
     - NEW: Track source diversity metrics

  2. Synthesis (Layer 2)
     - Market narrative synthesis
     - Belief excavation
     - Competitor analysis

  3. Sophistication Analysis (Layer 2.5)
     - Schwartz stage determination
     - Skepticism level assessment

  4. Expectation Schema Mapping (Layer 2.8-A)
     - Compile saturated claims from competitors
     - Identify exhausted metaphors
     - Map standard structures and hooks
     - Calculate staleness scores
     - Identify whitespace zones
     - Generate schema violation opportunities

  5. Latent Resonance Identification (Layer 2.8-B)
     - Distinguish expressed vs. latent emotions
     - Identify emotional gaps
     - Generate FSSIT candidates
     - Map identity tensions
     - NEW: Track emotional_momentum (increasing/stable/declining)
     - Analyze cultural timing

OUTPUT:
  expectation_schema.json:
    - saturated_claims[] (with staleness_score)
    - exhausted_metaphors[]
    - default_emotional_appeals[]
    - standard_structures[]
    - whitespace_zones[]
    - schema_violation_opportunities[]
    - schema_summary (narrative)

  latent_resonance_field.json:
    - expressed_emotions[]
    - latent_emotions[] (with emotional_momentum)
    - emotional_gaps[]
    - fssit_candidates[] (with predicted_recognition_strength)
    - identity_tensions[]
    - cultural_timing_analysis
```

### Skills 01-04 → Truth Packages

```yaml
INPUT: Deep Research outputs + product/offer information

PROCESS:
  01-Proof Inventory:
    - Collect testimonials, case studies, data points
    - Score by dimension
    - No major RSF change (truth-finding)

  02-Root Cause (RSF-enhanced):
    - Identify the real reason audience has the problem
    - NEW: Consider schema distance in framing
    - NEW: Check if root cause framing violates expectations
    - Generate root cause packages

  03-Mechanism (RSF-enhanced):
    - Explain how solution works
    - NEW: Check mechanism naming against whitespace zones
    - NEW: Avoid saturated mechanism patterns
    - Generate mechanism packages

  04-Promise (RSF-enhanced):
    - Distill core deliverable
    - NEW: Connect to latent emotions, not just expressed
    - NEW: Consider resonance depth in promise framing
    - Generate promise packages

OUTPUT:
  proof_inventory.json
  root_cause_packages.json (with RSF metadata)
  mechanism_packages.json (with RSF metadata)
  promise_packages.json (with RSF metadata)
```

### Big Ideas Generation (FSSIT-First Protocol)

```yaml
INPUT:
  - expectation_schema.json
  - latent_resonance_field.json
  - root_cause_packages.json
  - mechanism_packages.json
  - promise_packages.json

PROCESS:
  1. Select Top 3 FSSIT Candidates
     - Rank by predicted_recognition_strength
     - Verify emotional_momentum is not declining
     - Select 3 highest-scoring

  2. Multi-Variant Generation (3 × 3 = 9 candidates)
     FOR each FSSIT candidate (3):
       Generate 3 variants:
         a) Surprise-emphasis: Maximize schema violation
         b) Resonance-emphasis: Maximize emotional depth
         c) Balanced: Optimize across dimensions

     GENERATION PROMPT TEMPLATE:
     """
     Build a Big Idea that opens with or delivers this recognition statement:
     "[FSSIT candidate text]"

     The Big Idea MUST:
     - Violate at least one of these expectation patterns: [whitespace zones]
     - Connect to this latent emotion: [emotion from FSSIT]
     - Be grounded in this truth: [root cause] + [mechanism] + [promise]
     - Be resolvable in <3 seconds by the target audience

     The Big Idea MUST NOT:
     - Use any of these saturated claims: [list from expectation_schema]
     - Use any of these exhausted metaphors: [list]
     - Use emotional appeals marked "numb" or "hostile": [list]
     - Be something a mapped competitor could say

     EMPHASIS FOR THIS VARIANT: [surprise/resonance/balanced]
     """

  3. Pre-Flight Disqualification Filter
     FOR each candidate:
       CHECK: Contains saturated claims (staleness ≥7)? → REJECT
       CHECK: Uses exhausted metaphors? → REJECT
       CHECK: Uses numb/hostile emotional appeals? → REJECT
       CHECK: Could multiple mapped competitors say this? → FLAG

  4. Resolution Pathway Mapping
     FOR each passing candidate:
       DOCUMENT:
         - Which schema it violates
         - Which latent emotion it connects to
         - The "aha moment" (what audience realizes)
         - Cognitive steps required (count)
         - Assumption requirements (what must audience know)

OUTPUT:
  big_idea_candidates.json:
    candidates[]:
      - id
      - fssit_source
      - variant_type (surprise/resonance/balanced)
      - big_idea_text
      - headline
      - hook
      - resolution_pathway:
          schema_violated
          emotion_connected
          aha_moment
          cognitive_steps
          assumptions_required
      - disqualification_flags[]
```

### Judge Context (Isolated Evaluation)

```yaml
INPUT (judge receives):
  - big_idea_candidates.json (candidates only, no generation context)
  - expectation_schema.json (for reference)
  - latent_resonance_field.json (for reference)
  - scoring_rubric.json

INPUT (judge does NOT receive):
  - Generation prompts
  - "Intended" quality or scores
  - Other candidates' scores during evaluation

PROCESS:
  1. Dimension Scoring (for each candidate)
     SCORE Schema Distance (SD): 1-10
       - Evidence: Which schemas violated?
       - Confidence: How clearly violated?

     SCORE Resonance Depth (RD): 1-10
       - Evidence: Which latent emotion connected?
       - Confidence: How deep is connection?

     SCORE Resolution Accessibility (RA): 1-10
       - Evidence: Cognitive path analysis
       - Confidence: Would target audience get it?

     SCORE Temporal Fit (TF): Pass/Caution/Fail
       - Evidence: Cultural timing analysis
       - Risk assessment

  2. Gating
     APPLY Temporal Gate:
       TF = FAIL → Remove from consideration
       TF = CAUTION → Flag for human review

     APPLY Schema Distance Gate:
       SD < 4 → Remove (insufficient surprise)
       SD > 8 → Flag for human review

  3. Tournament Selection (pairwise comparison)
     FOR remaining candidates:
       Present pairs
       Ask: "Which better satisfies the Gift Test?"
       Record winner
       Run elimination rounds
       Produce ranking

  4. Three Judge Perspectives (voting)
     PERSPECTIVE 1 — Audience Surrogate:
       "Would this make ME feel seen if I were the target?"

     PERSPECTIVE 2 — Skeptic:
       "Is this actually surprising or just differently-worded familiar?"

     PERSPECTIVE 3 — Practitioner:
       "Does this connect to something real or is it clever-but-empty?"

     AGGREGATE votes
     Weight candidates by cross-perspective agreement

OUTPUT:
  judge_results.json:
    ranked_candidates[]:
      - rank
      - candidate_id
      - scores: {SD, RD, RA, TF}
      - tournament_wins
      - perspective_votes: {surrogate, skeptic, practitioner}
      - judge_rationale
      - flags[]
    human_checkpoint_package:
      - top_5_candidates
      - fssit_connection_map
      - schema_violation_map
      - resolution_pathways
```

## 3.3 Temperature Configuration

Temperature is an LLM parameter that controls output randomness:
- **0.0**: Deterministic — always picks highest-probability token
- **0.3-0.5**: Low variance — mostly predictable with slight variation
- **0.7-0.9**: High variance — explores diverse possibilities
- **1.0+**: Maximum variance — can produce incoherent output

### Temperature by Pipeline Stage

| Stage | Recommended Temp | Rationale |
|-------|------------------|-----------|
| Deep Research (quote analysis) | 0.2-0.3 | Accuracy over creativity |
| 2.8-A Expectation Schema | 0.2-0.3 | Accurate pattern identification |
| 2.8-B Latent Resonance | 0.3-0.4 | Some interpretive flexibility |
| Root Cause generation | 0.5-0.6 | Moderate creativity, grounded in data |
| Mechanism generation | 0.4-0.5 | Accuracy with creative naming |
| Promise generation | 0.5-0.6 | Moderate creativity, grounded in data |
| **Big Idea generation** | **0.7-0.9** | **Maximum creative diversity** |
| Judge scoring | 0.2-0.3 | Consistent evaluation |
| Judge rationale | 0.3-0.4 | Clear explanation |

### Implementation

Add to each skill's configuration:

```yaml
execution_parameters:
  temperature: 0.X  # Specific to this skill
  extended_thinking: true/false
  max_iterations: N
```

## 3.4 Extended Thinking Configuration

Extended thinking allows the model to reason more deeply before responding. For creative tasks, this produces better outputs than step-by-step protocols.

### When to Use Extended Thinking

| Stage | Extended Thinking | Rationale |
|-------|-------------------|-----------|
| Deep Research analysis | Standard | Protocol-based, accuracy focus |
| RSF schema mapping | Standard | Pattern identification |
| RSF latent resonance | Moderate | Some interpretive depth needed |
| Root Cause | Moderate | Balance insight and protocol |
| Mechanism | Standard | Technical accuracy |
| Promise | Moderate | Emotional resonance needs depth |
| **Big Idea generation** | **Maximum** | **Deep creative exploration** |
| Judge evaluation | Moderate | Thoughtful assessment |

### Implementation

For Big Idea generation specifically:

```yaml
thinking_configuration:
  mode: "ultrathink"  # Maximum thinking depth
  instruction: |
    Take your time to deeply explore creative possibilities.
    Consider multiple angles before committing to a direction.
    Quality of insight matters more than speed of response.
```

## 3.5 Multi-Model Integration (OpenRouter)

### Purpose

Using multiple models for:
1. **Diverse generation**: Different models explore different creative regions
2. **Independent scoring**: Model that didn't generate can evaluate without bias

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLAUDE CODE (Orchestrator)                    │
│                                                                  │
│  Manages pipeline, context, data flow                           │
│                                                                  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ MCP Server Calls
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    OPENROUTER MCP SERVER                         │
│                                                                  │
│  Exposes tools:                                                  │
│  • generate_with_claude_sonnet                                   │
│  • generate_with_gpt4                                            │
│  • generate_with_gemini                                          │
│  • evaluate_with_[model]                                         │
│                                                                  │
│  Each tool:                                                      │
│  - Accepts prompt + parameters                                   │
│  - Calls specified model via OpenRouter API                      │
│  - Returns response to orchestrator                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Implementation Options

**Option A: Generation Diversity**
- Generate 3 candidates with Claude
- Generate 3 candidates with GPT-4
- Generate 3 candidates with Gemini
- Judge evaluates all 9

**Option B: Independent Evaluation**
- Claude generates all candidates
- GPT-4 scores independently
- Compare scores, flag disagreements

**Option C: Hybrid**
- Claude generates
- Perplexity provides independent analysis
- GPT-4 provides tie-breaking evaluation

### Setup Requirements

1. Create OpenRouter account (https://openrouter.ai)
2. Generate API key
3. Install/configure OpenRouter MCP server
4. Add to Claude Code MCP configuration

---

# 4. TERMINOLOGY GLOSSARY

## Core RSF Concepts

| Term | Definition |
|------|------------|
| **Resonant Surprise Framework (RSF)** | Systematic approach to generating advertising that is simultaneously unexpected (surprise) and deeply relevant (resonance) |
| **Schema Distance (SD)** | Measure of how far a message deviates from audience's expected messaging patterns. Scale: 1-10. Optimal: 4-7. |
| **Resonance Depth (RD)** | Measure of how deeply a message connects to latent (unspoken) emotions. Scale: 1-10. Higher is better. |
| **Resolution Accessibility (RA)** | Measure of how quickly and easily the audience can "get" the surprise. Scale: 1-10. Target: audience resolves in <3 seconds. |
| **Temporal Fit (TF)** | Assessment of whether message aligns with current cultural/emotional moment. Gate: Pass/Caution/Fail. |
| **Expectation Schema** | Map of messaging patterns the audience expects to see based on category norms and competitor saturation |
| **Latent Resonance Field** | Map of emotions the audience feels but hasn't articulated, waiting to be crystallized |
| **FSSIT** | "Finally Someone Said It" — statements that crystallize unspoken feelings and produce profound recognition |
| **Whitespace Zone** | Messaging territory where no competitor currently operates; high surprise potential |
| **Staleness Score** | Measure of how overexposed a messaging pattern is. Scale: 1-10. Higher = more stale. |

## Technical Concepts

| Term | Definition |
|------|------------|
| **Temperature** | LLM parameter controlling output randomness. 0=deterministic, 1=maximum variance. |
| **Extended Thinking** | LLM mode allowing deeper reasoning before responding. Produces higher quality on complex tasks. |
| **Best-of-N Sampling** | Technique: generate N candidates, select best via judge/reranker |
| **Pairwise Comparison** | Evaluation method: "Is A better than B?" rather than "Rate A 1-10" |
| **Tournament Selection** | Selection method using elimination rounds of pairwise comparisons |
| **Context Isolation** | Architectural pattern: generator and judge operate in separate contexts to prevent bias |
| **Inverted-U Relationship** | Pattern where moderate values are optimal; extremes (high or low) are suboptimal |
| **Emotional Momentum** | Tracking whether a latent emotion is increasing, stable, or declining over time |
| **Temporal Weighting** | Giving more weight to recent data vs. older data in analysis |

## Pipeline Components

| Term | Definition |
|------|------------|
| **Deep Research (Skill 00)** | Pipeline stage that gathers and synthesizes market intelligence |
| **Expectation Schema Mapper (2.8-A)** | Skill that maps audience's expected messaging patterns |
| **Latent Resonance Identifier (2.8-B)** | Skill that identifies unspoken emotions and FSSIT candidates |
| **Root Cause (Skill 02)** | Pipeline stage identifying the real reason audience has the problem |
| **Mechanism (Skill 03)** | Pipeline stage explaining how the solution works |
| **Promise (Skill 04)** | Pipeline stage distilling the core deliverable |
| **Big Ideas (Skill 05)** | Pipeline stage generating creative campaign concepts |
| **Judge Context** | Isolated evaluation environment separate from generation |
| **Human Checkpoint** | Point where human reviews and selects from AI-generated options |

## Psychological Concepts

| Term | Definition |
|------|------------|
| **Schema Incongruity** | When a message violates the expected pattern (schema) for its category |
| **Expressed Emotions** | Emotions the audience openly acknowledges and discusses |
| **Latent Emotions** | Emotions the audience feels but doesn't articulate |
| **Emotional Gap** | Distance between what audience says they feel and what they actually feel |
| **Gift Test** | Evaluation: "Is this simultaneously unexpected AND perfectly suited to the recipient?" |
| **Identity Tension** | Conflict between who audience is and who they want to be |
| **Schwartz Stage** | Market sophistication level (1-5) determining what claims/proofs are required |

---

# 5. IMPLEMENTATION SPECIFICATIONS

## 5.1 Deep Research Enhancements

### Quote Classification Temporal Tagging

**Location:** Layer 1 quote mining skills

**Change:** Add temporal_recency field to each classified quote

```yaml
quote_classification:
  id: "quote_0147"
  text: "..."
  bucket: "PAIN"
  source: "reddit_r_golf"
  date_captured: "2026-01-15"
  temporal_recency: "current"  # current (0-30 days), recent (31-90), aging (91-180), old (180+)
```

**Processing rule:**
- Tag based on date_captured relative to current date
- If date unknown, tag as "unknown" and flag

### 2.8-B Latent Resonance Identifier — Emotional Momentum

**Location:** `Skills/00-deep-research/skills/layer-2-rsf/2.8-B-latent-resonance-identifier.md`

**New output fields:**

```yaml
emotional_momentum:
  - emotion: "exhaustion with information overload"
    trend: "increasing"
    evidence: "Quote frequency up 40% in last 90 days vs prior 90 days"
    temporal_relevance: "high"

  - emotion: "fear of missing out"
    trend: "declining"
    evidence: "Quote frequency down 25% in recent quotes"
    temporal_relevance: "declining"

  - emotion: "self-doubt about capability"
    trend: "stable"
    evidence: "Consistent frequency across time periods"
    temporal_relevance: "evergreen"
```

**Processing logic:**

```
FOR each identified latent emotion:
  COUNT quotes mentioning emotion in each time bucket:
    current (0-30 days)
    recent (31-90 days)
    aging (91-180 days)
    old (180+ days)

  CALCULATE trend:
    IF current > recent by 20%+: trend = "increasing"
    IF current < recent by 20%+: trend = "declining"
    ELSE: trend = "stable"

  ASSIGN temporal_relevance:
    increasing → "high"
    stable → "evergreen"
    declining → "declining"
```

**Impact on FSSIT candidates:**

```yaml
fssit_candidates:
  - statement: "You've probably started to wonder if something is fundamentally wrong with you"
    predicted_recognition_strength: 9
    latent_emotion_source: "self-doubt about capability"
    emotional_momentum: "stable"  # NEW
    temporal_relevance: "evergreen"  # NEW
```

**Scoring adjustment:**
- FSSIT candidates connecting to "increasing" emotions get priority
- FSSIT candidates connecting to "declining" emotions get flagged

### Source Diversity Tracking

**Location:** Layer 1 output

**New output section:**

```yaml
source_diversity_metrics:
  total_quotes: 1247
  sources:
    - source: "reddit_r_golf"
      count: 412
      percentage: 33%
    - source: "golfwrx_forum"
      count: 298
      percentage: 24%
    # ...

  diversity_assessment:
    unique_sources: 8
    max_single_source_percentage: 33%
    temporal_distribution:
      current: 312 (25%)
      recent: 445 (36%)
      aging: 289 (23%)
      old: 201 (16%)

  flags:
    - "Single source (reddit_r_golf) provides 33% of quotes — may skew results"
    - "Old quotes (180+ days) underrepresented — temporal trends may be incomplete"
```

**Validation threshold:**
- Minimum 5 unique sources
- No single source > 40% of total
- Minimum 20% quotes in "current" bucket

## 5.2 Skills 02-04 RSF Awareness

### Root Cause (Skill 02) — RSF Enhancement

**Principle:** Root cause FRAMING can violate expectations even if the underlying truth is conventional.

**New constraint:**

```
WHEN generating root cause packages:
  CHECK: Does this framing appear in saturated_claims from expectation_schema?
  IF YES: Generate alternative framing that conveys same truth

  EXAMPLE:
  - Saturated framing: "The real reason you're struggling is lack of practice"
  - RSF-aware framing: "Your practice is actually reinforcing the wrong patterns"

  The TRUTH is the same (practice habits are the issue).
  The FRAMING violates the expectation that "more practice = solution."
```

**New output field:**

```yaml
root_cause_package:
  core_truth: "Practice habits are reinforcing incorrect swing mechanics"
  rsf_framing:
    chosen_frame: "Your practice is teaching your body the wrong lesson"
    schemas_violated: ["more practice = improvement"]
    conventional_alternative: "You're not practicing enough/correctly"
  # ... rest of package
```

### Mechanism (Skill 03) — RSF Enhancement

**Principle:** Mechanism NAMING and POSITIONING can occupy whitespace zones.

**New constraint:**

```
WHEN naming mechanism:
  REFERENCE whitespace_zones from expectation_schema

  CHECK: Does proposed name use saturated mechanism patterns?
  IF YES: Generate alternative that occupies whitespace

  EXAMPLE:
  - Saturated pattern: "The 3-Step System"
  - Whitespace zone: "Anti-method positioning"
  - RSF-aware name: "The Unlearning Protocol" (positions against "methods")
```

**New output field:**

```yaml
mechanism_package:
  mechanism_name: "The Unlearning Protocol"
  rsf_positioning:
    whitespace_zone_occupied: "Anti-method positioning"
    saturated_patterns_avoided: ["X-Step System", "Proven Method", "Secret Formula"]
    schema_distance_estimate: 6
  # ... rest of package
```

### Promise (Skill 04) — RSF Enhancement

**Principle:** Promise should connect to LATENT emotions, not just expressed desires.

**New constraint:**

```
WHEN crafting promise:
  REFERENCE latent_resonance_field

  CHECK: Does promise address expressed emotion or latent emotion?
  IF expressed only: Deepen to connect with underlying latent emotion

  EXAMPLE:
  - Expressed desire: "I want to hit the ball farther"
  - Latent emotion: "I want to feel athletic and capable again"
  - Surface promise: "Add 20 yards to your drive"
  - RSF-aware promise: "Feel the effortless power you had in your 30s"
```

**New output field:**

```yaml
promise_package:
  surface_promise: "Add 20 yards to your drive"
  rsf_deepened_promise:
    statement: "Feel the effortless power you had in your 30s"
    latent_emotion_connected: "desire to feel young and capable"
    resonance_depth_estimate: 8
    expressed_emotion_addressed: "want more distance"
  # ... rest of package
```

## 5.3 Big Ideas (Skill 05) — Complete RSF-Driven Overhaul

### Layer 0: Input Loading — RSF Priority

**Change:** RSF research outputs become PRIMARY inputs, not supplementary.

```yaml
input_priority:
  PRIMARY:
    - expectation_schema.json
    - latent_resonance_field.json (especially fssit_candidates)
  SECONDARY:
    - root_cause_packages.json
    - mechanism_packages.json
    - promise_packages.json
  REFERENCE:
    - proof_inventory.json
    - market_narrative.json
```

### Layer 1: FSSIT Selection

**New sub-skill:** `1.0-fssit-selector.md`

```yaml
purpose: Select top 3 FSSIT candidates for generation

input:
  latent_resonance_field.json

process:
  1. Filter FSSIT candidates:
     - EXCLUDE if emotional_momentum = "declining"
     - EXCLUDE if temporal_relevance = "declining"

  2. Rank remaining by:
     - predicted_recognition_strength (primary)
     - emotional_momentum = "increasing" (bonus)
     - expression_gap_size (secondary)

  3. Select top 3

output:
  selected_fssit:
    - rank: 1
      statement: "..."
      latent_emotion: "..."
      momentum: "..."
    - rank: 2
      ...
    - rank: 3
      ...
```

### Layer 2: Multi-Variant Generation

**Enhanced generation protocol:**

```yaml
generation_protocol:
  temperature: 0.8
  extended_thinking: true
  thinking_budget: "ultrathink"

  FOR each selected_fssit (3):
    GENERATE 3 variants:

    variant_a (surprise_emphasis):
      instruction: |
        Build a Big Idea starting from this FSSIT: "[statement]"
        EMPHASIS: Maximize schema violation.
        Target whitespace zones: [list from expectation_schema]
        Push for unexpected framing while maintaining resolution.

    variant_b (resonance_emphasis):
      instruction: |
        Build a Big Idea starting from this FSSIT: "[statement]"
        EMPHASIS: Maximize emotional depth.
        Connect to this latent emotion: [emotion from FSSIT]
        Deepen the emotional resonance while maintaining surprise.

    variant_c (balanced):
      instruction: |
        Build a Big Idea starting from this FSSIT: "[statement]"
        EMPHASIS: Balance surprise and resonance.
        Violate: [whitespace zone]
        Connect to: [latent emotion]
        Optimize across all RSF dimensions.

  TOTAL OUTPUT: 9 candidates
```

### Layer 2.5: Pre-Flight Disqualification

**New sub-skill:** `2.5-preflight-disqualifier.md`

```yaml
purpose: Remove mediocre candidates before scoring

input:
  - 9 generated candidates
  - expectation_schema.json

process:
  FOR each candidate:

    CHECK saturated_claims:
      IF candidate contains any claim with staleness_score >= 7:
        DISQUALIFY
        REASON: "Contains saturated claim: [claim]"

    CHECK exhausted_metaphors:
      IF candidate uses any exhausted_metaphor with staleness_score >= 7:
        DISQUALIFY
        REASON: "Uses exhausted metaphor: [metaphor]"

    CHECK emotional_appeals:
      IF candidate uses appeal with audience_response = "numb" or "hostile":
        DISQUALIFY
        REASON: "Uses ineffective emotional appeal: [appeal]"

    CHECK competitor_overlap:
      FOR each mapped competitor:
        ASSESS: Could this competitor plausibly say this?
        IF 3+ competitors could say it:
          FLAG: "Low differentiation — multiple competitors could use this"

output:
  qualified_candidates: [list of passing candidates]
  disqualified_candidates: [list with reasons]
  flagged_candidates: [list with flags]
```

### Layer 3: Resolution Pathway Mapping

**New sub-skill:** `3.0-resolution-mapper.md`

```yaml
purpose: Document cognitive path for each candidate

input:
  qualified_candidates

process:
  FOR each candidate:

    IDENTIFY schema_violated:
      - Which specific expectation pattern does this violate?
      - How clearly is it violated?

    IDENTIFY emotion_connected:
      - Which latent emotion does this crystallize?
      - How deep is the connection?

    ARTICULATE aha_moment:
      - What does the audience realize?
      - What's the "click" moment?

    COUNT cognitive_steps:
      - How many mental steps from reading to understanding?
      - Fewer is better. Target: ≤3 steps.

    LIST assumptions_required:
      - What must the audience already know/believe?
      - Are these reasonable assumptions for the target?

output:
  resolution_pathways:
    - candidate_id: "..."
      schema_violated: "proven method claims"
      violation_clarity: 8
      emotion_connected: "self-doubt about capability"
      connection_depth: 9
      aha_moment: "It's not me, it's the approach everyone taught me"
      cognitive_steps: 2
      assumptions_required:
        - "Has tried multiple golf instruction programs"
        - "Has experienced repeated failure"
      resolution_accessibility_estimate: 9
```

### Layer 4: Judge Handoff

**New sub-skill:** `4.0-judge-handoff.md`

```yaml
purpose: Package candidates for isolated judge context

input:
  - qualified_candidates (with resolution pathways)
  - expectation_schema.json
  - latent_resonance_field.json

process:
  CREATE judge_package:
    candidates: [qualified candidates with resolution pathways]
    reference_materials:
      expectation_schema_summary: [schema_summary from 2.8-A]
      latent_resonance_summary: [field_summary from 2.8-B]
      fssit_list: [all FSSIT candidates for reference]
    scoring_rubric: [RSF scoring criteria]

  EXCLUDE from judge_package:
    - Generation prompts
    - Variant emphasis instructions
    - "Intended" scores
    - Disqualification reasoning (judge evaluates fresh)

output:
  judge_package.json

  # This is passed to separate judge context
  # Judge has NO access to generation context
```

### Judge Context — Separate Execution

**New skill file:** `JUDGE-AGENT.md` (separate from generation skills)

```yaml
identity:
  You ARE: An impartial evaluator of Big Idea candidates
  You are NOT: The generator of these candidates
  You are NOT: Aware of how these candidates were created

  Your SOLE purpose: Evaluate candidates against RSF criteria
  and identify the top 5 for human review.

input:
  judge_package.json (candidates + reference materials + rubric)

constraints:
  - NEVER ask how candidates were generated
  - NEVER assume any candidate is "supposed to" score well
  - NEVER let candidate order influence scoring
  - ALWAYS evaluate each candidate independently
  - ALWAYS provide specific evidence for scores

process:
  1. Dimension Scoring
     FOR each candidate:
       SCORE Schema Distance (SD): 1-10
         - Reference: expectation_schema_summary
         - Evidence: What specific pattern is violated?

       SCORE Resonance Depth (RD): 1-10
         - Reference: latent_resonance_summary, fssit_list
         - Evidence: What latent emotion is crystallized?

       SCORE Resolution Accessibility (RA): 1-10
         - Reference: resolution_pathway from candidate
         - Evidence: Can target audience get this in <3 seconds?

       ASSESS Temporal Fit (TF): Pass/Caution/Fail
         - Reference: cultural_timing from latent_resonance_field
         - Evidence: Is this appropriate for current moment?

  2. Gating
     APPLY gates per RSF specification
     REMOVE candidates that fail gates
     FLAG candidates in caution zones

  3. Tournament Selection
     FOR remaining candidates:
       PAIR candidates randomly
       FOR each pair:
         ASK: "Which better satisfies the Gift Test?"
         RECORD winner
       REPEAT until ranking emerges

  4. Three Perspectives
     EVALUATE top candidates from three perspectives:

     PERSPECTIVE: Audience Surrogate
       "If I were the target audience, would this make me feel seen?"

     PERSPECTIVE: Skeptic
       "Is this genuinely surprising or just differently-worded familiar?"

     PERSPECTIVE: Practitioner
       "Does this connect to real market truth or is it clever-but-empty?"

     RECORD votes from each perspective

  5. Final Ranking
     COMBINE:
       - Tournament results
       - Perspective votes
       - RSF dimension scores
     PRODUCE ranked list

output:
  judge_results.json:
    ranked_candidates:
      - rank: 1
        candidate_id: "..."
        scores:
          SD: 7
          RD: 9
          RA: 8
          TF: "pass"
        tournament_position: 1
        perspective_votes:
          surrogate: "yes"
          skeptic: "yes"
          practitioner: "yes"
        rationale: "Strongest FSSIT connection with clear schema violation..."
      # ... top 5

    flags:
      - candidate_id: "..."
        flag: "SD > 8 — may be too surprising"
```

### Human Checkpoint Package

**Final output for human review:**

```yaml
human_checkpoint:
  top_5_candidates:
    - rank: 1
      big_idea_text: "..."
      headline: "..."
      hook: "..."
      rsf_scores:
        schema_distance: 7
        resonance_depth: 9
        resolution_accessibility: 8
        temporal_fit: "pass"
      fssit_connection: "You've probably started to wonder..."
      schema_violated: "proven method claims"
      aha_moment: "It's not me, it's the approach"
      judge_rationale: "..."
    # ... remaining 4

  context_for_human:
    expectation_schema_summary: "..."
    latent_resonance_summary: "..."
    cultural_timing_notes: "..."

  human_options:
    - "Select candidate [N] for development"
    - "Request iteration on candidate [N] with feedback: ___"
    - "Request new generation with adjusted parameters"
    - "None acceptable — escalate"
```

---

# 6. QUALITY PHILOSOPHY

## 6.1 The Core Mandate

**Quality is 10x more important than time.**

This is not a preference — it is an architectural constraint. Every decision, every tradeoff, every optimization must favor quality over speed.

### Why This Matters

A mediocre Big Idea that processes in 10 minutes wastes:
- The client's budget on ineffective advertising
- The audience's attention on forgettable messaging
- The brand's credibility on generic positioning
- Future opportunity cost from poor market positioning

A breakthrough Big Idea that takes 2 hours creates:
- Campaigns that generate outsized returns
- Audience resonance that builds brand equity
- Competitive differentiation that compounds over time
- Reference material for future creative development

The cost of additional processing time is trivial compared to the value difference between mediocre and excellent output.

## 6.2 Structural Quality Enforcement

Quality cannot be a guideline — it must be embedded structurally. The system will default to efficiency unless actively constrained.

### Minimum Iteration Requirements

```yaml
generation_requirements:
  minimum_candidates: 9
  minimum_variants_per_fssit: 3
  minimum_fssit_evaluated: 3

  # The system CANNOT produce fewer candidates
  # to save time or tokens
```

### Quality Gates That Block Progression

```yaml
quality_gates:
  fssit_connection:
    requirement: "Each candidate must connect to at least one FSSIT"
    enforcement: "Candidates without FSSIT connection are auto-disqualified"

  schema_violation:
    requirement: "Each candidate must violate at least one mapped expectation"
    enforcement: "Candidates without schema violation are auto-disqualified"

  minimum_resonance:
    requirement: "RD score must be ≥6 for candidates to advance"
    enforcement: "Candidates below threshold are removed from tournament"

  resolution_clarity:
    requirement: "Resolution pathway must be documented"
    enforcement: "Candidates without clear pathway are flagged"
```

### Extended Thinking Triggers

```yaml
thinking_triggers:
  big_idea_generation:
    mode: "ultrathink"
    instruction: "Take maximum time to explore creative possibilities"

  judge_evaluation:
    mode: "think_hard"
    instruction: "Carefully consider each dimension before scoring"

  # The system MUST engage extended thinking
  # for these stages, regardless of token cost
```

### Anti-Shortcut Constraints

```yaml
anti_shortcut_rules:
  - "NEVER present fewer than 5 candidates at human checkpoint"
  - "NEVER skip scoring dimensions to save time"
  - "NEVER skip pre-flight disqualification filter"
  - "NEVER skip resolution pathway mapping"
  - "NEVER use previous session's RSF research without refresh check"
  - "ALWAYS run tournament selection, never single-pass ranking"
  - "ALWAYS evaluate from all three judge perspectives"
  - "ALWAYS document rationale for scores"
```

### Explicit Quality > Speed Instruction

Include in MASTER-AGENT and all relevant skills:

```
## Quality Priority Statement

When faced with a choice between:
- Faster completion with acceptable quality (7/10)
- Slower completion with excellent quality (9/10)

ALWAYS choose the slower, higher-quality option.

Time is NOT a constraint for this process.
Quality IS the constraint.

The cost of a mediocre Big Idea that fails in market
far exceeds the cost of additional processing time.

This is not negotiable. This is not a preference.
This is an architectural requirement.
```

## 6.3 Anti-Efficiency-Trap Patterns

### Pattern: "Good Enough" Shortcut

**Symptom:** Stopping generation when first acceptable candidate emerges
**Prevention:** Minimum iteration requirements enforce full generation

### Pattern: Self-Satisfied Scoring

**Symptom:** Model rates its own outputs favorably to conclude faster
**Prevention:** Context isolation between generator and judge

### Pattern: Linear Assumption

**Symptom:** Assuming first candidates are best, not generating full set
**Prevention:** Tournament selection forces comparison of all candidates

### Pattern: Rationale Skipping

**Symptom:** Providing scores without evidence to speed evaluation
**Prevention:** Judge MUST provide specific evidence for each score

### Pattern: Refresh Avoidance

**Symptom:** Reusing old RSF research to skip research phase
**Prevention:** Temporal tagging reveals stale data; refresh triggers required

---

# 7. MEASUREMENT FRAMEWORK

## 7.1 Process Metrics

Track these to ensure system is functioning correctly:

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Candidates generated per run | ≥9 | <9 |
| Candidates passing pre-flight | ≥5 | <3 |
| Tournament rounds completed | Full | Incomplete |
| Judge perspectives evaluated | 3/3 | <3 |
| Resolution pathways documented | 100% | <80% |
| FSSIT connections established | 100% | <90% |

## 7.2 Quality Metrics

Track these to assess output quality:

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Average Schema Distance (top 5) | 5-7 | <4 or >8 |
| Average Resonance Depth (top 5) | ≥7 | <6 |
| Average Resolution Accessibility (top 5) | ≥7 | <6 |
| Temporal Fit pass rate | ≥80% | <60% |
| Pre-flight pass rate | 50-70% | <30% or >90% |
| Judge perspective agreement | ≥2/3 | <2/3 |

## 7.3 Outcome Metrics (Longer-term)

Track these to calibrate system over time:

| Metric | Measurement | Use |
|--------|-------------|-----|
| Human selection rate | % of top 5 selected by human | Calibrate ranking |
| Iteration request rate | % of runs requiring iteration | Identify quality gaps |
| Market performance | Conversion/engagement of selected ideas | Ground truth calibration |
| FSSIT accuracy | Did selected FSSIT resonate in market? | Refine FSSIT selection |

## 7.4 Calibration Protocol

Every 10 runs or 30 days (whichever comes first):

1. Review outcome metrics
2. Identify patterns:
   - Which RSF scores correlated with human selection?
   - Which FSSIT candidates led to successful ideas?
   - Which whitespace zones produced effective violations?
3. Adjust scoring weights if indicated
4. Update FSSIT selection criteria if indicated
5. Document learnings in LearningLog

---

# 8. RESEARCH BIBLIOGRAPHY

## Primary Research

### LLM Creativity

- Wang, Y., et al. (2025). "A large-scale comparison of divergent creativity in humans and large language models." *Nature Human Behaviour*. https://www.nature.com/articles/s41562-025-02331-1

- Bellemare-Pepin, A., et al. (2024). "Divergent creativity in humans and large language models." *Scientific Reports*. https://www.nature.com/articles/s41598-025-25157-3

- Anderson, J., et al. (2025). "Human Creativity in the Age of LLMs: Randomized Experiments on Divergent and Convergent Thinking." *CHI 2025*. https://dl.acm.org/doi/abs/10.1145/3706598.3714198

### Best-of-N Sampling and Selection

- Chen, X., et al. (2025). "Evaluation of Best-of-N Sampling Strategies for Language Model Alignment." arXiv:2502.12668. https://arxiv.org/abs/2502.12668

- Jiang, D., et al. (2023). "LLM-Blender: Ensembling Large Language Models with Pairwise Ranking and Generative Fusion." *ACL 2023*. PairRM: https://huggingface.co/llm-blender/PairRM

### Temperature and Sampling

- Nguyen, M., et al. (2025). "Min-p Sampling for Creative and Coherent LLM Outputs." *ICLR 2025*. https://openreview.net/pdf?id=FBkpCyujtS

### Multi-Model Approaches

- Kumar, M. (2025). "LLM Council: A New Era of Multi-Model Intelligence." Medium. https://medium.com/@manishmandal9734/llm-council-a-new-era-of-multi-model-intelligence-c59726b3d9c2

## Foundational Psychology

### Schema Theory

- Mandler, G. (1982). "The Structure of Value: Accounting for Taste." In *Affect and Cognition: The 17th Annual Carnegie Symposium on Cognition*.

- Heckler, S. E., & Childers, T. L. (1992). "The Role of Expectancy and Relevancy in Memory for Verbal and Visual Information: What Is Incongruency?" *Journal of Consumer Research*, 18(4), 475-492.

### Advertising Incongruity

- Lee, Y. H., & Mason, C. (1999). "Responses to Information Incongruency in Advertising: The Role of Expectancy, Relevancy, and Humor." *Journal of Consumer Research*, 26(2), 156-169.

### Gift-Giving Psychology

- Algoe, S. B., Haidt, J., & Gable, S. L. (2008). "Beyond Reciprocity: Gratitude and Relationships in Everyday Life." *Emotion*, 8(3), 425-429.

## Advertising Theory

### Market Sophistication

- Schwartz, E. M. (2004). *Breakthrough Advertising*. Bottom Line Books. (Schwartz Sophistication Stages)

### Collative Variables

- Berlyne, D. E. (1960). *Conflict, Arousal, and Curiosity*. McGraw-Hill.
- Berlyne, D. E. (1971). *Aesthetics and Psychobiology*. Appleton-Century-Crofts.

### Creativity Research

- Sternberg, R. J. (Ed.). (1999). *Handbook of Creativity*. Cambridge University Press.
- Amabile, T. M. (1996). *Creativity in Context*. Westview Press.

## Multi-Agent Architecture

- Jones, N. (2026). "Scale with Simplicity: Multi-Agent Scaling Architecture." Nate Jones Newsletter. (Internal reference: `MULTI-AGENT-SCALING-REFERENCE.md`)

---

# APPENDICES

## Appendix A: File Locations

| File | Location |
|------|----------|
| This document | `CopywritingEngine/ROADMAP/RSF-ENHANCEMENT-MASTER-DOCUMENT.md` |
| Original RSF Overview | `CopywritingEngine/ROADMAP/RESONANT-SURPRISE-FRAMEWORK-OVERVIEW.md` |
| Expectation Schema Mapper | `CopywritingEngine/Skills/00-deep-research/skills/layer-2-rsf/2.8-A-expectation-schema-mapper.md` |
| Latent Resonance Identifier | `CopywritingEngine/Skills/00-deep-research/skills/layer-2-rsf/2.8-B-latent-resonance-identifier.md` |
| Big Ideas Skill | `CopywritingEngine/Skills/05-big-ideas/` |
| Session Log | `CopywritingEngine/SESSION-LOGS/2026-01-29-rsf-enhancement-ultrathink.md` |
| Learning Log | `CopywritingEngine/LearningLog/2026-01-29-rsf-enhancement-learnings.md` |

## Appendix B: Implementation Checklist

- [ ] Deep Research: Add temporal tagging to quote classification
- [ ] Deep Research: Add emotional momentum to 2.8-B
- [ ] Deep Research: Add source diversity tracking
- [ ] Skill 02: Add RSF framing awareness
- [ ] Skill 03: Add RSF whitespace awareness
- [ ] Skill 04: Add RSF resonance awareness
- [ ] Skill 05: Create FSSIT selector sub-skill
- [ ] Skill 05: Implement multi-variant generation
- [ ] Skill 05: Create pre-flight disqualification filter
- [ ] Skill 05: Create resolution pathway mapper
- [ ] Skill 05: Create judge handoff packager
- [ ] Skill 05: Create separate JUDGE-AGENT
- [ ] Skill 05: Implement tournament selection
- [ ] Skill 05: Implement three judge perspectives
- [ ] Skill 05: Add temperature specifications
- [ ] Skill 05: Add extended thinking triggers
- [ ] Skill 05: Add quality enforcement constraints
- [ ] Set up OpenRouter MCP server (optional, for multi-model)
- [ ] Update MASTER-AGENT with quality philosophy
- [ ] Create measurement tracking system

## Appendix C: Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-29 | Initial master document |

---

**END OF DOCUMENT**
