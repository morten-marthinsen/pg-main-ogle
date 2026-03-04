# CopywritingEngine: Agent Teams + Extended Thinking Upgrade Analysis

**Date:** 2026-02-05
**Context:** Opus 4.6 release — Agent Teams, Adaptive Thinking, 1M Context Window
**Status:** Implementation Plan Approved

---

## Table of Contents

1. [The Core Problem](#the-core-problem)
2. [Feature 1: Agent Teams — The Arena Becomes Real](#feature-1-agent-teams--the-arena-becomes-real)
3. [Feature 2: Extended Thinking / Effort Controls — Deeper Generation](#feature-2-extended-thinking--effort-controls--deeper-generation)
4. [Feature 3: 1M Token Context Window — Arena Without Compression](#feature-3-1m-token-context-window--arena-without-compression)
5. [Recommended Integration Strategy](#recommended-integration-strategy)
6. [Appendix: CopywritingEngine Architecture Summary](#appendix-copywritingengine-architecture-summary)

---

## The Core Problem

The CopywritingEngine's architecture is sophisticated — the 7-competitor Arena, adversarial Critic, Learning Briefs, Synthesizer Layer, specimen injection — the **design** is strong. But initial execution has been disappointing and too far from production quality.

Three fundamental constraints explain why:

### Constraint 1: One Brain Pretending to Be Seven

Right now, 7 "competitors" are actually **one Claude instance simulating 7 voices in sequence** within a single context window.

- By the time it generates Persona 5, 6, 7, it's already **contaminated** by Personas 1–4
- The "competition" is one model competing with itself
- The Critic is critiquing its own work — self-critique is inherently weaker than external critique
- Creative divergence collapses as personas unconsciously blend

### Constraint 2: No Deep Reasoning During Generation

Creative generation currently happens at **standard inference speed**. The model produces copy the same way it answers "what's the capital of France" — one token at a time without deliberate extended reasoning.

For tasks that require integrating:
- Upstream strategic packages (root cause, mechanism, promise, big idea)
- Type-matched specimens (verbatim structural patterns)
- Persona voice characteristics
- Market research quotes and proof inventory
- Anti-slop rules and skill-specific criteria

...standard inference isn't enough compute. The model needs **thinking time** to do this integration well.

### Constraint 3: Context Pressure Causes the Degradation We Built Defenses Against

Running 3 rounds × 7 competitors × critique × revision × scoring in one context window is brutal. The MC-CHECK protocol, anti-degradation system, and structural enforcement exist **because** the single-context architecture forces degradation.

We've been treating symptoms, not the cause.

---

## Feature 1: Agent Teams — The Arena Becomes Real

### What It Is

**Agent Teams** is a new feature in Claude Code (Opus 4.6) that allows multiple Claude instances to work together as a coordinated team:

- **Peer-to-Peer Communication:** Unlike subagents (which only report back), teammates message each other directly and can challenge each other's findings
- **Shared Task List:** All agents see task status, claim available work, handle dependencies automatically
- **Independent Context Windows:** Each teammate gets its own full 200K token context — no shared context pressure
- **Parallel Execution:** Multiple agents work simultaneously on different aspects

### How It Maps to the Arena

| Current Architecture (Simulated) | With Agent Teams (Real) |
|----------------------------------|------------------------|
| 1 Claude pretends to be 7 personas | 7 separate Claude instances, each **IS** one persona |
| Sequential generation (contamination) | Parallel generation (true independence) |
| Critic critiques its own work | Critic is a separate agent — genuinely adversarial |
| Context fills after Round 1 | Each agent has full 200K per round |
| Compression lossy by Round 3 | No compression needed — fresh context per agent |
| Learning briefs are self-talk | Learning briefs are external signals between agents |

### Proposed Agent Team Structure

```
TEAM LEAD (Arena Coordinator)
│
│   Responsibilities:
│   ├── Load upstream packages, specimens, skill instructions
│   ├── Spawn teammates with persona-specific instructions
│   ├── Manage 3-round flow (Round 1 → Learning Brief → Round 2 → ... → Round 3)
│   ├── Distribute Learning Briefs between rounds
│   ├── Collect and present final candidates to human
│   └── Coordinate handoff to Synthesizer
│
├── TEAMMATE: Makepeace Agent
│   └── Full 200K context: upstream packages + specimens + Makepeace persona instructions
│       Generates complete output. No contamination from other personas.
│       Loads OWN specimens. Reasons in OWN voice. Zero cross-persona bleed.
│
├── TEAMMATE: Halbert Agent
│   └── Full 200K context: same upstream inputs, completely different creative lens
│       Entertainment-first approach. Pattern interrupts. Curiosity bombs.
│
├── TEAMMATE: Schwartz Agent
│   └── Market sophistication calibration. Claim believability. Positioning freshness.
│
├── TEAMMATE: Ogilvy Agent
│   └── Credibility-first. Authority establishment. Word economy.
│
├── TEAMMATE: Clemens Agent
│   └── Scientific clarity. 12-year-old language. Binary reframes.
│
├── TEAMMATE: Bencivenga Agent
│   └── Proof-first authority. Anticipation architecture. Claim defensibility.
│
├── TEAMMATE: The Architect Agent
│   └── Multi-lens integration. Targets highest TOTAL score across all criteria.
│       After Arena: switches to Synthesizer role for phrase-level hybrids.
│
├── TEAMMATE: The Critic Agent
│   └── Receives all 7 outputs BLIND (has no generation context)
│       Genuinely adversarial — didn't create any of the work it's evaluating
│       Identifies ONE weakest element per output (forces prioritization)
│       Provides actionable fix direction per weakness
│
└── TEAMMATE: The Judge Agent
    └── Separate from Critic — scores all 7 outputs against 7 skill-specific criteria
        No stake in any output. No generation context. Pure evaluation.
        Generates Learning Briefs from round results.
```

### Why This Is Transformative

**True Creative Independence:**
Halbert's agent has never seen Makepeace's output. There's no unconscious blending. When Halbert writes an entertainment-first lead, it's PURE Halbert — not Halbert-after-reading-4-other-personas. The "competition" becomes real competition between genuinely different creative directions.

**Genuine Adversarial Critique:**
The Critic agent didn't write any of the 7 outputs. It has no ego investment, no memory of the creative choices that led to each output, no unconscious desire to defend work it created. Its critiques will be harsher, more honest, and more useful than self-critique.

**No Context Degradation:**
Each persona agent loads the full upstream package + specimens + persona instructions into a **fresh 200K context**. No compression. No rushing. No degradation by Round 3. The quality ceiling stays the same across all rounds.

**Parallel Execution:**
All 7 personas generate simultaneously. Round 1 generation that currently takes N minutes of sequential output takes a fraction of that time. The bottleneck shifts from "generate 7 outputs in sequence" to "evaluate 7 outputs."

**Learning Briefs Become Real External Signals:**
Currently, Learning Briefs are one model telling itself what to learn from itself. With Agent Teams, Learning Briefs come from the **Judge agent** (external evaluator) and are delivered to persona agents as **genuinely new information** they haven't seen before. This creates real learning dynamics.

### How to Enable

Add to Claude Code `settings.json`:
```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

### Current Limitations (Experimental Feature)

- No session resumption with in-process teammates
- Task status can lag slightly
- One team per session
- No nested teams (teammates can't spawn their own teams)
- Lead is fixed for lifetime of team
- Significantly higher token usage (each teammate = separate Claude instance)

---

## Feature 2: Extended Thinking / Effort Controls — Deeper Generation

### What It Is

Opus 4.6 introduces **Adaptive Thinking** — the model can now spend significant compute **reasoning** before producing output. This replaces the old "UltraThink" approach with granular effort controls.

**Effort Levels:**

| Level | Behavior | Use Case |
|-------|----------|----------|
| `low` | Fast, minimal reasoning | Simple queries, status checks |
| `medium` | Balanced speed and depth | Standard operations, MC-CHECK |
| `high` | Thorough reasoning | Critique, evaluation, validation |
| `max` | Maximum reasoning depth | **Creative generation, synthesis** |

In Claude Code, set via: `/effort max`

### How It Maps to the Engine

When a persona generates a lead or story at `effort: max`, the model gets a large thinking budget to:

1. **Deeply analyze** upstream packages before generating (not just skim)
2. **Cross-reference** specimens against the specific situation (find the RIGHT pattern)
3. **Reason about** persona voice consistency (am I staying in character?)
4. **Explore multiple creative angles** before committing (not just the first idea)
5. **Check against** anti-slop rules and skill-specific criteria **during** generation, not just after
6. **Integrate** market research quotes and proof points with deliberate reasoning

### Effort Protocol — Mapped to Execution Phases

| Phase | Recommended Effort | Rationale |
|-------|-------------------|-----------|
| Layer 0–1 (Foundation/Architecture) | `high` | Decisions here cascade downstream — worth deeper reasoning |
| Layer 2 (Drafting) | `max` | This is where creative quality lives or dies |
| Arena Round 1 (Generation) | `max` | First generation sets the quality ceiling for the entire Arena |
| Arena Critique | `high` | Critic needs to find genuine weaknesses, not surface issues |
| Arena Targeted Revision | `max` | Revision is surgical — needs deep reasoning about HOW to fix |
| Arena Round 2–3 (Generation) | `max` | Each round should be the persona's absolute best work |
| Learning Brief Analysis | `high` | Understanding WHY techniques worked requires causal reasoning |
| Synthesizer (Layer 2.6) | `max` | Phrase-level decomposition and reconstruction is surgical work |
| Layer 3 (Validation) | `high` | Quality verification needs thoroughness, not speed |
| MC-CHECK | `medium` | Quick but honest self-assessment |
| Gate Verification | `medium` | Binary check — does the output meet thresholds? |

### The Key Insight

The anti-degradation system fights the **symptom** (rushed, shallow output). Extended thinking addresses the **cause** — the model doesn't spend enough compute on creative reasoning before producing tokens.

With `effort: max`, the model will:
- Think for longer before writing its first word
- Consider multiple creative directions before committing
- Cross-reference more deeply against specimens and upstream packages
- Catch anti-slop violations during generation, not in post-review
- Produce output that reflects deliberate creative reasoning, not first-token momentum

---

## Feature 3: 1M Token Context Window — Arena Without Compression

### What It Is

Opus 4.6 supports up to **1,000,000 tokens** in context — 5x the previous 200K limit.

### How It Maps

The context compression protocol in `ARENA-CORE-PROTOCOL.md` (keep winners verbatim, compress non-winners to 2–3 sentence summaries) exists because 3 rounds of 7 competitors overwhelms 200K tokens.

With 1M tokens:

| Before (200K) | After (1M) |
|----------------|-------------|
| Non-winners compressed after each round | All outputs stay in full context |
| Information loss through compression | Zero information loss |
| Learning Briefs reference summaries | Learning Briefs reference full outputs |
| Specimens may get pushed out of context | All specimens + all outputs fit comfortably |
| Context pressure triggers degradation | Comfortable headroom throughout |

### Cost Tradeoff

- Standard rate for first 200K input tokens
- 1.1x rate for tokens beyond 200K
- For the quality improvement, likely worth it

### Interaction with Agent Teams

If using Agent Teams (recommended), the 1M context is less critical — each agent gets its own 200K, which is more than sufficient when work is distributed. The 1M window is most valuable in single-context mode (no Agent Teams).

**Recommendation:** Agent Teams is the higher-impact feature. Use 1M context as a fallback for situations where Agent Teams isn't practical.

---

## Recommended Integration Strategy

### Phase 1: Immediate (No Architecture Changes)

**Goal:** Quick quality test with minimal changes.

1. Enable Agent Teams in Claude Code settings
2. Set `/effort max` before running generative skills
3. Add effort protocol guidance to `CLAUDE.md`
4. Test one generative skill (11-lead or 12-story) with both changes active
5. Compare output quality against previous runs

**Expected Impact:** Significant quality improvement from effort controls alone. Agent Teams adds creative divergence.

### Phase 2: Architecture Update (Modify Engine Files)

**Goal:** Formalize Agent Team execution into the engine architecture.

1. Add Agent Team execution protocol to `ARENA-CORE-PROTOCOL.md`
2. Package each persona as self-contained agent prompt (can be handed to a separate teammate)
3. Add Critic and Judge as formally separate agent roles
4. Update `CLAUDE.md` with team coordination rules and effort protocol
5. Update `ARENA-PERSONA-PANEL.md` with agent-team-ready persona packages
6. Test full 3-round Arena with agent team on one skill

### Phase 3: Full Rollout

**Goal:** Apply across all skills, calibrate, and document learnings.

1. Apply agent team + effort protocol across all 16 arena skills
2. Calibrate — which skills benefit most from agent teams vs. single-context with max effort?
3. Test with actual campaign content (not synthetic)
4. Document quality delta in Learning Log
5. Adjust persona prompts based on what produces best independent output

---

## Appendix: CopywritingEngine Architecture Summary

### The 20-Skill Pipeline

```
PHASE 1–2: Foundation & Intelligence
  ├── Skill 00: Campaign Brief Synthesis
  ├── Skill 01: Deep Research (1,000+ quotes extraction)
  └── Skill 02: Proof Inventory (cataloging + discovery)

PHASE 3–8: Strategic Architecture (arena_mode: strategic)
  ├── Skill 03: Root Cause (counter-intuitive explanation)
  ├── Skill 04: Mechanism (named systematic solution)
  ├── Skill 05: Promise (proof-ceiling-calibrated outcome)
  ├── Skill 06: Big Idea (campaign thesis crystallization)
  ├── Skill 07: Offer Structure (value package)
  └── Skill 08: Campaign Structure (narrative flow map)

PHASE 9–18: Generative Copy (arena_mode: generative_full_draft)
  ├── Skill 09: Campaign Brief Output
  ├── Skill 10: Headlines
  ├── Skill 11: Lead Copy
  ├── Skill 12: Story
  ├── Skill 13: Root Cause Narrative
  ├── Skill 14: Mechanism Narrative
  ├── Skill 15: Product Introduction
  ├── Skill 16: Offer Copy
  ├── Skill 17: Close
  └── Skill 18: Proof Weaving

PHASE 19–20: Assembly & Polish (arena_mode: editorial_revision)
  ├── Skill 19: Campaign Assembly
  └── Skill 20: Editorial Revision
```

### Layer Architecture Per Skill

```
Layer 0:   Foundation (upstream inputs, specimens, context)
Layer 1:   Architecture/Classification (decisions that shape generation)
Layer 2:   Drafting/Generation (primary content creation)
Layer 2.5: ARENA (7-competitor, 3-round, critique-revise competition)
Layer 2.6: SYNTHESIZER (phrase-level hybrid creation from all competitors)
           HUMAN SELECTION (9–10 candidates: 7 pure + 2–3 hybrids)
Layer 3:   Refinement/Validation
Layer 4:   Output/Handoff
```

### The 7 Competitors

| # | Persona | Editorial Lens |
|---|---------|----------------|
| 1 | **Clayton Makepeace** | Flow & Architecture — "Does this pull the reader forward inevitably?" |
| 2 | **Gary Halbert** | Entertainment & Hook — "Would they stop scrolling?" |
| 3 | **Eugene Schwartz** | Market Sophistication — "Does this match the market's awareness stage?" |
| 4 | **David Ogilvy** | Credibility & Clarity — "Would a skeptic accept this?" |
| 5 | **Gary Clemens** | Scientific Clarity — "Would a 12-year-old understand?" |
| 6 | **Gary Bencivenga** | Proof-First Authority — "Can every element be proven?" |
| 7 | **The Architect** | Integration & Synthesis — dual role: in-Arena competitor + post-Arena hybrid creator |

### Arena 3-Round Flow

```
ROUND 1: Initial Generation
  7 competitors generate → Critic evaluates → Each revises weakness → Score/Rank
  └── Learning Brief generated from Round 1 winner

ROUND 2: Learning-Informed Regeneration
  Learning Brief distributed → 7 re-generate fresh → Critique → Revise → Score/Rank
  └── Cumulative Learning Brief generated

ROUND 3: FINAL Generation
  Cumulative Brief distributed → 7 generate best version → Critique → Revise → FINAL Score
  └── All 7 kept in FULL for human selection

POST-ARENA: Synthesizer (Layer 2.6)
  The Architect creates 2–3 phrase-level hybrids from best elements across all 7

HUMAN SELECTION: 9–10 candidates (7 pure Round 3 outputs + 2–3 hybrids)
```

### Quality Control Stack

- **Structural Enforcement:** Layer N+1 physically blocked unless Layer N checkpoint file exists
- **MC-CHECK:** Mandatory metacognitive checkpoints (confidence < 7 or rushing detected = HALT)
- **Anti-Degradation Protocol:** Context load monitoring (GREEN/YELLOW/RED/CRITICAL zones)
- **Gate Validation:** Binary PASS/FAIL — no "conditional pass" concept
- **Specimen Injection:** Mandatory verbatim specimen loading before ANY generative output
- **Anti-Slop Enforcement:** Poison word lists, forbidden behaviors per skill
- **Human Selection:** BLOCKING checkpoint — cannot proceed without explicit human choice

---

*Generated 2026-02-05 | CopywritingEngine v3.0 | Arena System Upgrade + Agent Teams Analysis*
