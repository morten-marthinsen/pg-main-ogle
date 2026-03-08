# Creative OS — Agent Teams Architecture Plan

**Date**: 2026-02-09
**Author**: COS Architecture Writer (Claude Agent)
**Status**: DESIGN COMPLETE — Implementation Deferred
**Scope**: Agent Teams as a permanent execution model for Creative OS
**Cross-reference**: Tony's `AGENT-TEAMS-UPGRADE-ANALYSIS.md` (CopywritingEngine), all agent Master Agent docs, `CREATIVE-OS-ANTI-DEGRADATION.md`

---

## Table of Contents

1. [Why Agent Teams for Creative OS](#1-why-agent-teams-for-creative-os)
2. [Neco Arena Design](#2-neco-arena-design)
3. [Veda Pipeline Design](#3-veda-pipeline-design)
4. [Orion Oversight Design](#4-orion-oversight-design)
5. [Checkpoint File Specification](#5-checkpoint-file-specification)
6. [Simulated Type 1 Signals for Creative OS](#6-simulated-type-1-signals-for-creative-os)
7. [Implementation Phases](#7-implementation-phases)
8. [Token Cost Analysis](#8-token-cost-analysis)

---

## 1. Why Agent Teams for Creative OS

Tony's CopywritingEngine identified three fundamental constraints that limit LLM creative output quality. Each constraint maps directly to Creative OS — and specifically to Neco, the agent where creative generation happens.

### Constraint 1: One Brain Pretending to Be Many

**Tony's diagnosis**: Seven "competitors" are actually one Claude instance simulating seven voices in sequence. By Persona 5, the outputs are contaminated by Personas 1-4. The "competition" is one model competing with itself. Creative divergence collapses.

**Creative OS evidence**: Neco's Sub-Agent #4 (Ad Hook Generation) already implements multi-perspective generation — three distinct psychological lenses (Provocative, Educational, Emotional) producing hook sets in a single context. Sub-Agent #5 (Ad Script Generation) does the same with dual-variant generation (education-forward and emotion-forward scripts). The design acknowledges that different lenses produce different outputs, but the execution runs them sequentially in one context window.

The contamination is real:
- By the time Lens C (Emotional) generates hooks, it has already seen Lens A (Provocative) and Lens B (Educational) outputs
- The "internal adversarial check" mentioned in the Sub-Agent #4 spec is self-critique — the same model evaluating its own work
- The 3 hook lenses and 2 script variants run in single context, meaning later lenses unconsciously blend with earlier ones
- What Neco calls "multi-perspective" is actually "multi-sequential-in-same-brain"

**With Agent Teams**: Each lens becomes an independent Claude instance with its own 200K context. Lens C has genuinely never seen Lens A's output. The hooks from three independent minds are actually different — not variations-on-a-theme from one mind trying to simulate difference.

### Constraint 2: No Deep Reasoning During Generation

**Tony's diagnosis**: Creative generation happens at standard inference speed. The model produces copy the same way it answers trivia — one token at a time without deliberate extended reasoning. For tasks that require integrating upstream packages, specimens, persona instructions, and quality criteria simultaneously, standard inference is insufficient compute.

**Creative OS evidence**: No effort protocol exists anywhere in Creative OS today. Neco generates hooks and scripts at the same inference depth as writing session log entries. When Sub-Agent #4 needs to simultaneously hold:
- Audience language bank (physical sensations, internal dialogue, specific moments)
- Confirmed core angle and 8 Laws compliance
- Style library patterns
- Hook library templates
- Six-Axis Focus/Suggestibility evaluation
- Visceral resonance judgment

...it does all of this at standard speed. The result: hooks that pass structural criteria but lack the visceral resonance that separates $100K ads from $1K ads.

**With Effort Protocol**: `effort: max` for all generative phases gives the model a thinking budget to deeply cross-reference audience language against angle psychology against style patterns before writing the first word. The difference between "technically correct hook" and "hook that creates a physical feeling in the reader" is the depth of reasoning that produced it.

### Constraint 3: Context Pressure Causes the Degradation We Built Defenses Against

**Tony's diagnosis**: Running multi-perspective generation in one context window is brutal. The MC-CHECK protocol, anti-degradation system, and structural enforcement exist because the single-context architecture forces degradation. We're treating symptoms, not the cause.

**Creative OS evidence**: This constraint is documented and acknowledged across the system:
- `CREATIVE-OS-ANTI-DEGRADATION.md` defines four context zones (GREEN/YELLOW/RED/CRITICAL) with explicit degradation indicators
- Veda's SESSION-LOG.md has grown to ~3,470 lines across 38 sessions
- Neco's anti-degradation adapter includes rushing detection, synthesis warnings, and NECO-CHECK at every gate
- The handoff protocol exists specifically because sessions degrade — sessions are designed to END before quality collapses

The anti-degradation system is effective but defensive. It catches degradation after it begins. It cannot prevent it. The structural root cause is unchanged: one context window trying to hold everything.

**With Agent Teams**: Each agent gets its own fresh 200K context. No compression needed between rounds. No rushing because context is filling. The anti-degradation system shifts from "catch and correct degradation" to "degradation has no mechanism to begin." The existing system becomes a safety net rather than a load-bearing wall.

### Summary: Three Constraints, One Solution

| Constraint | Symptom in Creative OS | Current Mitigation | Agent Teams Fix |
|---|---|---|---|
| One Brain Pretending to Be Many | Neco's 3 hook lenses contaminate sequentially | Multi-perspective spec acknowledges the problem | Each lens = independent Claude instance |
| No Deep Reasoning During Generation | Hooks pass structure checks but lack visceral resonance | No mitigation exists | Effort Protocol: `max` for generation |
| Context Pressure Causes Degradation | Session logs at 3,470 lines. Anti-degradation is a defense layer | MC-CHECK, context zones, handoff protocol | Each agent gets fresh 200K. Degradation mechanism removed |

---

## 2. Neco Arena Design

**Status**: DESIGN ONLY — Implementation deferred to S012+ (after Chris H demo)

This section defines a 7-agent Arena team mapped to Neco's behavioral psychology framework. It adapts Tony's CopywritingEngine Arena model (7 legendary copywriter personas) to Neco's domain (behavioral psychology lenses for golf advertising).

### 2.1 The Seven Agents

| # | Agent | Lens | Question It Answers | Neco Framework Source |
|---|-------|------|---|---|
| 1 | **Focus Agent** | Attention capture | "Would this stop the scroll in 0.5 seconds?" | Six-Axis: Focus axis. Pattern interrupt, curiosity gap, contradiction, threat/value signal |
| 2 | **Suggestibility Agent** | Mind-opening patterns | "Does this create an open mental state?" | Six-Axis: Suggestibility axis. UMP reframes, UMS reveals, "Even if..." permission |
| 3 | **Compliance Agent** | Action psychology | "Does this make the next step feel inevitable?" | Six-Axis: Compliance axis. CTA as natural conclusion, desire-to-learn-more pathway |
| 4 | **Data Agent** | Performance-backed | "What's ACTUALLY winning in Tess data?" | Tess-Neco data protocol. Top performers, winning hooks, saturated angles |
| 5 | **The Architect** | Multi-lens integration | "Does this score well on ALL criteria?" | Tony's Architect pattern. Dual role: in-Arena competitor + post-Arena synthesizer |
| 6 | **Critic Agent** | External adversarial | Identifies ONE weakness per output. No generation context. Genuinely harsh. | Tony's Critic pattern. No ego investment. Actionable fix direction per weakness |
| 7 | **Judge Agent** | HSP/SSP scoring | Scores against Neco's criteria. No ego investment. Generates Learning Briefs. | Neco's NECO-CHECK + quality criteria. HSP/SSP thresholds (7.0) |

### 2.2 Why This Mapping (Not Tony's Personas)

Tony's CopywritingEngine uses legendary copywriter personas (Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect) because his system generates long-form sales copy where editorial voice matters. Each persona brings a distinct editorial lens.

Neco generates short-form ad hooks (2-5 lines) and scripts (15s-60s). At this scale, editorial voice matters less than psychological precision. The differentiator between a $100K hook and a $1K hook is not voice — it's which psychological lever gets pulled and how precisely.

The mapping to behavioral lenses instead of copywriter personas means:
- **Focus Agent** asks the same question as Tony's Halbert ("Would they stop scrolling?") but through Neco's Six-Axis framework
- **Suggestibility Agent** does what no Tony persona explicitly does — evaluates whether the copy opens a mental state for persuasion
- **Compliance Agent** evaluates the CTA and action pathway — the axis Tony's system handles through general criteria
- **Data Agent** has no Tony equivalent — it grounds creative decisions in real Tess performance data, which is unique to Creative OS's data-driven pipeline
- **The Architect**, **Critic**, and **Judge** map directly from Tony's model because their roles are structural, not domain-specific

### 2.3 Round Flow

The Arena runs in rounds. Round count depends on format:

| Format | Rounds | Rationale |
|---|---|---|
| Hooks (15s/30s) | 2 rounds | Short-form copy has fewer dimensions to optimize. 2 rounds capture baseline + learning improvement. |
| Full scripts (60s+) | 3 rounds | Longer copy has more interacting elements (hook/body/CTA axis traversal). 3 rounds needed for full competitive peak. |
| VSL scripts | 3 rounds | Maximum complexity. Full 3-round treatment. |

#### 2-Round Flow (Hooks)

```
ROUND 1: Independent Generation
  Focus Agent generates hook set → 200K fresh context
  Suggestibility Agent generates hook set → 200K fresh context
  Compliance Agent generates hook set → 200K fresh context
  Data Agent generates hook set → 200K fresh context
  Architect generates hook set → 200K fresh context
  [All 5 generate IN PARALLEL]

  Team Lead → Collects 5 hook sets → Sends ALL to Critic Agent
  Critic Agent → Identifies ONE weakness per hook set (no generation context, genuinely harsh)
  Team Lead → Sends critiques back to each agent
  Each agent revises targeted weakness IN PARALLEL

  Team Lead → Collects revised hook sets → Sends ALL to Judge Agent
  Judge Agent → Scores all hooks against Neco criteria (HSP/SSP)
  Judge Agent → Generates Learning Brief from Round 1

ROUND 2: Learning-Informed Regeneration
  Team Lead → Distributes Learning Brief to all 5 agents
  [Same flow: generate → critique → revise → score → FINAL ranking]

POST-ARENA: Synthesis
  Architect → Creates 2-3 phrase-level hybrids from strongest elements across all agents
  Team Lead → Presents 5 pure + 2-3 hybrids = 7-8 candidates to human

★ HUMAN SELECTION CHECKPOINT (BLOCKING)
  Human selects winner(s) for production
```

#### 3-Round Flow (Scripts)

```
ROUND 1: Independent Generation
  [Same as 2-round, but all 5 agents generate FULL SCRIPTS]
  Critique → Revise → Score → Learning Brief

ROUND 2: Learning-Informed Regeneration
  Learning Brief distributed → Generate → Critique → Revise → Score
  Cumulative Learning Brief generated

ROUND 3: FINAL Generation
  Cumulative Brief distributed → Generate → Critique → Revise → FINAL Score

POST-ARENA: Synthesis
  Architect → Phrase-level hybrids from all 5 Round 3 scripts
  Team Lead → Presents 5 pure + 2-3 hybrids = 7-8 candidates to human

★ HUMAN SELECTION CHECKPOINT (BLOCKING)
```

### 2.4 Learning Brief Distribution

Learning Briefs are the mechanism by which agents improve between rounds. They are generated by the Judge Agent and distributed by the Team Lead.

**Critical principle (from Tony)**: Learning Briefs teach TECHNIQUES, not voice. The Focus Agent absorbing a technique from the Suggestibility Agent's winning hook does not make the Focus Agent generate Suggestibility-style hooks. It means the Focus Agent learns HOW to embed suggestibility setup within an attention-first approach.

**Learning Brief format**:

```yaml
learning_brief:
  round: 1
  generated_by: Judge Agent
  winner: "Focus Agent — Hook Set A"
  winner_score: 8.2

  techniques_to_absorb:
    - technique: "Specificity in the first 3 words"
      source_agent: Focus Agent
      example: "The 2.3-degree angle change..."
      why_it_worked: "Precise number signals insider knowledge before the reader even processes the claim"
      how_to_apply: "Lead with a specific, unexpected data point that implies expertise"

    - technique: "Question-as-contradiction"
      source_agent: Suggestibility Agent
      example: "What if everything your instructor told you about grip pressure is backwards?"
      why_it_worked: "Creates belief gap AND opens suggestibility in one sentence"
      how_to_apply: "Frame the hook as a question that challenges a specific belief, not a general one"

  weaknesses_identified:
    - agent: Data Agent
      weakness: "Data reference felt clinical, not visceral"
      fix_direction: "Lead with the FEELING the data implies, then cite the data as proof of the feeling"

  voice_preservation_note: |
    Each agent must maintain its lens. Focus Agent stays attention-first.
    Suggestibility Agent stays mind-opening. Absorb techniques, not identity.
```

**Distribution rules**:
- Round 1 → Round 2: Learning Brief from Round 1 winner
- Round 2 → Round 3: Cumulative Learning Brief (combines Round 1 + Round 2 insights)
- Learning Briefs are delivered as EXTERNAL signals — each agent receives them as genuinely new information, not self-generated summary

### 2.5 Synthesizer Layer

After the final round, the Architect switches from competitor to synthesizer. The synthesis process operates at the phrase level, not the section level.

**Synthesis protocol**:

1. **Micro-Element Decomposition**: Break each agent's final output into smallest meaningful units (individual phrases, sentence fragments, word choices)
2. **Function Tagging**: Tag what each element accomplishes:
   - `scroll_stop`: First words that grab attention
   - `belief_gap`: Challenges an existing assumption
   - `specificity_signal`: Precise detail implying insider knowledge
   - `suggestibility_opener`: Opens mental state for new information
   - `teaching_moment`: Delivers new information
   - `resistance_lowerer`: "Even if..." or permission pattern
   - `action_trigger`: Makes next step feel natural
3. **Cross-Agent Best-Element Matrix**: For each function, identify which agent's phrase is strongest
4. **Hybrid Reconstruction**: WRITE new hooks/scripts using best elements as ingredients (not splicing — writing coherent new output that incorporates the strongest phrases)
5. **Coherence Validation**: Ensure hybrids read as single-voice copy, not Frankensteined fragments

**Quality threshold**: Hybrids must score >= 7.0 on HSP/SSP to be presented. At least 2 meaningfully different hybrids required.

### 2.6 Team Lead Responsibilities

The Team Lead (Arena Coordinator) is not a creative agent. It is the orchestrator:

| Responsibility | Details |
|---|---|
| **Load context** | Read Neco's reference files (audience language bank, confirmed angle, style library, hook library, proof elements). Package into self-contained prompt for each agent. |
| **Spawn teammates** | Create 5 creative agents + Critic + Judge, each with their lens-specific instructions and shared context package |
| **Manage rounds** | Coordinate generate → critique → revise → score cycle. Distribute Learning Briefs between rounds. |
| **Enforce human checkpoint** | Present final candidates (pure + hybrids) to human. BLOCKING — cannot proceed without selection. |
| **Manage effort levels** | Ensure creative agents run at `effort: max`, critique at `effort: high`, scoring at `effort: high` |
| **Handle fallback** | If Agent Teams fails or is unavailable, fall back to single-context multi-perspective generation (current Neco behavior) |

### 2.7 What Each Agent Receives

Every creative agent (Focus, Suggestibility, Compliance, Data, Architect) receives a self-contained prompt package:

```yaml
agent_package:
  # 1. Agent identity and lens
  identity: |
    You are the [Lens] Agent in Neco's Arena. Your lens is [description].
    The question you answer: [question].
    Your generation approach: [specific instructions per lens].

  # 2. Shared creative inputs (identical across all 5 agents)
  confirmed_core_angle:
    name: "[angle name]"
    description: "[one-sentence description]"
    type: "wound | desire"
  audience:
    segment: "[confirmed segment name]"
    language_bank:
      pain_quotes: ["..."]
      desire_quotes: ["..."]
      their_words: ["..."]
      physical_sensations: ["..."]
  product_context:
    product_name: "[name]"
    mechanism: "[mechanism description]"
    proof_elements: ["..."]
  style_guidance:
    recommended_styles: ["from style library"]
    hook_patterns: ["from hook library"]

  # 3. Neco quality frameworks
  quality_criteria:
    - pattern_interrupt_strength
    - curiosity_gap
    - emotional_specificity
    - audience_language_grounding
    - core_angle_congruence
    - visceral_resonance
  hsp_ssp_thresholds:
    minimum: 7.0

  # 4. Specimens from _vault/ (if available)
  specimens: |
    [Verbatim text from _vault/ entries that scored $50K+]
    [These are statistical attractors — exact token sequences that reshape generation]

  # 5. Round context (Rounds 2-3 only)
  learning_brief: "[From Judge Agent — techniques to absorb]"
  round_number: 1 | 2 | 3
```

The Critic Agent receives ALL outputs but NO generation context (no audience language bank, no style guidance, no specimens). It evaluates blind.

The Judge Agent receives ALL outputs plus the quality criteria and HSP/SSP framework. It scores without having generated anything.

### 2.8 Human Selection Checkpoint

The Arena's human selection checkpoint maps directly to Neco's existing Gate structure:

| Neco Gate | Arena Equivalent | Enforcement |
|---|---|---|
| Gate 1 (Audience Confirmation) | Pre-Arena gate — audiences confirmed before Arena begins | `CHECKPOINT_1_AUDIENCE_CONFIRMED = true` |
| Gate 2 (Core Angle Confirmation) | Pre-Arena gate — angle confirmed before Arena begins | `CHECKPOINT_2_ANGLE_CONFIRMED = true` |
| Gate 3 (Verification Review) | Post-Arena gate — human selects winner from Arena candidates | `CHECKPOINT_3_ARENA_SELECTION = true` |

**The Arena does NOT replace Neco's gates. It inserts between Gate 2 and Gate 3.**

```
Gate 1: Audience confirmed
Gate 2: Core angle confirmed
  └── ARENA RUNS HERE (between Gate 2 and Gate 3)
Gate 3: Human selects Arena winner + Quality Validator verifies claims
```

### 2.9 Fallback: Single-Context Mode

When Agent Teams is unavailable or impractical:

| Scenario | Fallback |
|---|---|
| Agent Teams feature not enabled | Use current multi-perspective generation (3 lenses for hooks, 2 variants for scripts) |
| Quick iteration needed (< 5 minutes) | Single-context with `effort: max` |
| Simple hook revision (not new generation) | Single-context, no Arena needed |
| Chris H demo (S012) | Single-context demo first — Arena is a future upgrade, not a demo requirement |

The existing Neco spec (multi-perspective generation in Sub-Agents #4 and #5) remains the production path until the Arena is implemented and validated.

---

## 3. Veda Pipeline Design

Veda's execution pipeline is fundamentally different from Neco's creative generation. Veda is sequential and deterministic: fetch source, probe dimensions, select hooks, assemble with FFmpeg, export, upload. Most steps depend on the output of the previous step.

Agent Teams benefits for Veda are limited to specific parallelizable steps.

### 3.1 Where Agent Teams Helps

| Step | Current (Sequential) | With Agent Teams (Parallel) | Benefit |
|---|---|---|---|
| **Hook Selection** | 3 hooks evaluated sequentially by hook-selector.ts | 3 hooks evaluated by separate agents in parallel, each with full transcription context | Higher quality hook selection — each agent can deeply reason about a single hook candidate without context from other evaluations |
| **Source Probing + Transcription** | Probe source file dimensions, then trigger/fetch transcription | Parallel: one agent probes source while another fetches transcription | Minor time savings — these are I/O bound operations |
| **Assembly Editing Variations** | 3 variations assembled sequentially (v1, v2, v3) | 3 variations assembled in parallel by separate agents | Significant time savings — each variation is independent |
| **Intake Queue Processing** | Process one queue entry at a time | Multiple queue entries processed in parallel | Significant throughput improvement for batch operations |

### 3.2 Where Agent Teams Does NOT Help

| Step | Why Sequential Is Required |
|---|---|
| **FFmpeg operations** | Shell commands must execute one at a time. Parallel FFmpeg instances could compete for disk I/O and CPU. |
| **Iconik upload** | Each asset upload is a multi-step API sequence (create asset → create format → upload → close → generate keyframes). Must complete before the next. |
| **Naming convention generation** | Variation numbers must be sequential and non-overlapping. Parallel generation risks collisions. |
| **SSS spreadsheet writes** | Row updates must be sequential to avoid write conflicts. |

### 3.3 Proposed Veda Agent Team Structure

```
TEAM LEAD (Pipeline Orchestrator)
│
├── INTAKE AGENT (read-only)
│   └── Reads Intake Queue tab, filters PENDING rows, prepares batch manifest
│
├── HOOK EVALUATOR A
│   └── Evaluates Hook Candidate 1: full transcription analysis, thought boundary detection
│
├── HOOK EVALUATOR B
│   └── Evaluates Hook Candidate 2: independent evaluation, no cross-contamination
│
├── HOOK EVALUATOR C
│   └── Evaluates Hook Candidate 3: independent evaluation
│
└── ASSEMBLY AGENTS (spawn per variation, after hook selection)
    ├── Variation 1 Agent → FFmpeg assembly → export
    ├── Variation 2 Agent → FFmpeg assembly → export
    └── Variation 3 Agent → FFmpeg assembly → export
```

**Important**: Veda's Agent Teams usage is an optimization, not a quality transformation. The quality ceiling for Veda comes from source material and hook selection, not from parallel execution. Agent Teams makes Veda faster and allows deeper hook evaluation, but the fundamental pipeline remains sequential.

### 3.4 Implementation Note

Veda's hook-selector.ts already implements `selectHooks()` with diversity constraints (no two hooks from same script_id, max 10 donors scanned). The Agent Teams version would give each Hook Evaluator agent the full transcription context for one donor video, allowing deeper analysis of where thought boundaries fall and which segments have the strongest attention-capture potential.

This is a Phase 5 implementation — after the Neco Arena proves the Agent Teams pattern works.

---

## 4. Orion Oversight Design

Orion sits above all agents as the strategic consolidation layer. Its Agent Teams use case is fundamentally different from Neco's (creative generation) and Veda's (pipeline optimization). Orion uses Agent Teams for **monitoring and aggregation** — spawning read-only agents to check system health across all four agents simultaneously.

### 4.1 Multi-Agent Health Dashboard

```
TEAM LEAD (Orion Coordinator)
│
├── TESS MONITOR (read-only)
│   └── Reads tess-strategic-scaling-system/SESSION-LOG.md
│   └── Checks SSS spreadsheet for recent updates
│   └── Checks Challenger protocol status (open FLAGs/BLOCKs)
│   └── Returns: last session date, open issues, pipeline health
│
├── VEDA MONITOR (read-only)
│   └── Reads veda-video-editing-agent/SESSION-LOG.md
│   └── Checks git status (clean? uncommitted work?)
│   └── Checks test suite status (last run, pass count)
│   └── Returns: last session date, test health, git state, blockers
│
├── NECO MONITOR (read-only)
│   └── Reads neco-neurocopy-agent/SESSION-LOG.md
│   └── Checks _output/ for recent deliverables
│   └── Checks _learning/ for recent failure entries
│   └── Returns: last session date, output count, failure patterns
│
└── SYSTEM MONITOR (read-only)
    └── Reads CREATIVE-OS-ANTI-DEGRADATION.md for any version changes
    └── Checks _ops/ for recent audit/meeting files
    └── Checks checkpoint files across all agents (Section 5)
    └── Returns: system integrity status, recent ops activity
```

### 4.2 Aggregated Status Report

The Team Lead aggregates all monitor outputs into a single health report:

```yaml
creative_os_health_report:
  generated: "2026-02-09T10:00:00Z"
  generated_by: "Orion Health Dashboard"

  agents:
    tess:
      last_session: "S120 — 2026-02-09"
      status: HEALTHY
      recent_activity: "Asset Registry Phase 2 complete. 672 rows synced."
      blockers: []
      challenger_items: ["TC-003 Tess-to-Neco protocol (OPEN FLAG)"]

    veda:
      last_session: "S038 — 2026-02-09"
      status: BLOCKED
      recent_activity: "Phase 5 demo attempted. Statusline per-session isolation fixed."
      blockers: ["DQFE donor transcriptions not triggered in Iconik"]
      test_health: "622/632 passing (10 skipped)"
      git_state: "Clean (41fd35e)"

    neco:
      last_session: "S011 — 2026-02-08"
      status: HEALTHY
      recent_activity: "$50K vault gate. Orion backlog created. S012 demo prep."
      blockers: []
      next_milestone: "E2E demo with Chris H (S012)"

    orion:
      last_session: "S011 — 2026-02-09"
      status: HEALTHY
      recent_activity: "Audit + John call prep + private file architecture."
      blockers: []

  cross_agent:
    bridges:
      tess_to_veda: "LIVE (Intake Queue — 11 entries)"
      tess_to_neco: "DEFINED (data protocol spec exists, not yet exercised)"
      neco_to_veda: "PLANNED (production order format defined, not connected)"
    anti_degradation: "v1.0 (core + 4 adapters)"
    checkpoint_files: "Not yet implemented (see Section 5)"

  p0_items:
    - "Russ exit ~Feb 14 (confidential)"
    - "Morton evaluation framework"
    - "Fatima 1:1 prep"

  recommendation: |
    Veda blocked on Iconik transcriptions — trigger DQFE donor transcriptions
    before S038. Neco S012 demo is the next quality milestone. Orion should
    transfer Google Doc content after MCP restart.
```

### 4.3 Blocker Detection Across Agents

The health dashboard enables cross-agent blocker detection that single-agent sessions miss:

| Pattern | Detection Method | Orionmple |
|---|---|---|
| **Upstream blocker** | Veda blocked on something Tess should provide | Veda needs transcriptions → Tess/Iconik dependency |
| **Bridge stall** | A defined bridge has zero activity for 7+ days | Tess-to-Neco protocol defined but never exercised |
| **Degradation cascade** | One agent's anti-degradation warnings increasing | If Neco's failure log grows, check if Tess data quality changed |
| **Session drift** | Agent session count diverges dramatically | Tess at S120 vs Neco at S011 — is Neco underutilized? |

### 4.4 Implementation Note

This is the lowest-priority Agent Teams use case. Orion can perform manual health checks using single-context reads today. Agent Teams makes it faster (parallel reads) and more systematic (structured report format), but doesn't change the quality ceiling. Phase 6 implementation.

---

## 5. Checkpoint File Specification

Checkpoint files are filesystem gates that enable structural enforcement across sessions. A downstream phase physically cannot proceed unless the checkpoint file from the upstream phase exists and validates.

### 5.1 Format Specification

All checkpoint files use YAML format with a standard schema:

```yaml
# Orionmple: checkpoints/PHASE_4_COMPLETE.yaml
phase: 4
phase_name: "Pipeline Integration"
completed_at: "2026-02-09T10:30:00Z"
session: "VEDA-S038"
agent: "Veda"

verification:
  tests_passing: 622
  tests_skipped: 10
  build_succeeds: true
  git_clean: true
  git_commit: "41fd35e"

gate_type: "phase_completion"
gate_passed: true

artifacts:
  - path: "src/pipeline/orchestrator.ts"
    state: "Step 4.5 auto-hook selector integrated"
  - path: "src/pipeline/assembly-editor.ts"
    state: "per_variation_hooks support added"

dependencies_met:
  - "PHASE_3_COMPLETE.yaml exists and validates"

notes: |
  Phase 4 added hook_selector_input to PipelineRunConfig,
  orchestrator Step 4.5 auto-hook selector, hook gate hasAutoHooks,
  assembly editor per_variation_hooks, CLI wiring + writeHooksToRow writeback.
  13 new tests added. All passing.
```

### 5.2 Checkpoint Types

| Type | File Pattern | Purpose |
|---|---|---|
| `phase_completion` | `PHASE_{N}_COMPLETE.yaml` | Major development phase completed |
| `session_verified` | `SESSION_{N}_VERIFIED.yaml` | Session resume verified against actual state |
| `gate_passed` | `GATE_{N}_{NAME}.yaml` | Human checkpoint gate passed |
| `arena_round` | `ARENA_ROUND_{N}_COMPLETE.yaml` | Arena round completed with scoring |
| `arena_selection` | `ARENA_SELECTION.yaml` | Human selected winner from Arena |

### 5.3 Agent-Specific Locations and Schemas

#### Veda Checkpoints

**Location**: `veda-video-editing-agent/checkpoints/`

```yaml
# Veda phase completion includes code-specific verification
verification:
  tests_passing: [int]       # npm test result
  tests_skipped: [int]       # Acknowledged skipped tests
  build_succeeds: [bool]     # npm run build passes
  type_check: [bool]         # npx tsc --noEmit passes
  git_clean: [bool]          # No uncommitted changes
  git_commit: "[hash]"       # Specific commit hash
  icloud_index_clean: [bool] # No "index 2" file present
```

#### Tess Checkpoints

**Location**: `tess-strategic-scaling-system/checkpoints/`

```yaml
# Tess phase completion includes data-specific verification
verification:
  spreadsheet_synced: [bool]      # SSS spreadsheet reflects current state
  row_count: [int]                # Expected row count in target tab
  naming_convention_version: "3.7" # Which version the data complies with
  challenger_clear: [bool]         # No unresolved BLOCKs
  registry_sync_clean: [bool]     # registry_sync.py last run successful
```

#### Neco Checkpoints

**Location**: `neco-neurocopy-agent/checkpoints/`

```yaml
# Neco phase completion includes creative-specific verification
verification:
  context_complete: [bool]        # Context Gatherer output populated
  audiences_confirmed: [bool]     # Gate 1 passed
  core_angle_confirmed: [bool]    # Gate 2 passed
  claims_verified: [bool]         # Gate 3 passed
  hsp_score: [float]              # Hook Score Protocol score (>= 7.0)
  ssp_score: [float]              # Script Score Protocol score (>= 7.0)
  specimens_loaded: [bool]        # Vault specimens were in context during generation
  neco_check_passed: [bool]       # NECO-CHECK at gate boundary passed
```

#### Orion Checkpoints

**Location**: `orion-chief-of-staff/checkpoints/`

```yaml
# Orion phase completion includes strategic-specific verification
verification:
  scorecard_aligned: [bool]       # Action advances 30/60/90
  challenger_reviewed: [bool]     # Unresolved items surfaced
  delegation_ratio: [float]       # >= 0.70 target
  weekly_update_current: [bool]   # Latest update generated
```

### 5.4 Structural Enforcement

Checkpoints are NOT informational. They are structural gates:

```
BEFORE entering Phase N+1:
  CHECK: Does checkpoints/PHASE_{N}_COMPLETE.yaml exist?
  CHECK: Does the file parse as valid YAML?
  CHECK: Is gate_passed = true?
  CHECK: Do verification fields match current state?

  IF ANY CHECK FAILS → HALT. Cannot proceed.
  NO RATIONALIZATION OVERRIDES THIS.
```

The forbidden rationalization "the phase is basically complete" is structurally impossible — either the checkpoint file exists and validates, or it doesn't. There is no "basically."

### 5.5 Session Resume with Checkpoints

On session resume, the verification protocol changes from "trust the handoff" to "verify from checkpoints":

```
ON SESSION RESUME:
  1. Read SESSION-LOG.md header for claimed state
  2. List all files in checkpoints/ directory
  3. Read the MOST RECENT checkpoint file
  4. Verify its contents against actual state:
     - For Veda: run npm test, check git status, verify build
     - For Tess: check spreadsheet row count, verify naming convention
     - For Neco: check output archive, verify gate states
     - For Orion: check scorecard alignment, review challenger items
  5. If checkpoint verification passes → proceed from that point
  6. If checkpoint verification fails → REPORT DISCREPANCY before proceeding
```

---

## 6. Simulated Type 1 Signals for Creative OS

Tony's CopywritingEngine defines Simulated Type 1 Signals — externalized "gut feelings" that LLMs cannot generate internally. These simulate the automatic warning systems that humans develop through practice but LLMs cannot proceduralize.

The following six signals are adapted from Tony's framework to Creative OS's domain.

### 6.1 Signal Definitions

| Signal | Trigger | Response | Affected Agents |
|---|---|---|---|
| **INCOMPLETENESS ALERT** | Session log entry missing required fields (see each agent's session log format) | Cannot mark session complete. Return to session log and fill all required fields. | All |
| **SYNTHESIS WARNING** | Generating copy/analysis without reading source data file in THIS session | Pause. Verify the actual file was read (quote specific lines as proof). If no proof, go back and read the file. | All (critical for Neco) |
| **RUSHING ALERT** | 3+ phases completed without MC-CHECK execution | Mandatory MC-CHECK before next phase. If in YELLOW+ zone, prepare handoff. | All |
| **DEGRADATION WARNING** | Quality indicators declining: test count dropping (Veda), file counts wrong (Tess), hook scores declining (Neco), scorecard items stalling (Orion) | Context load assessment required. Announce zone. If RED+, prepare handoff. | All |
| **CONSTRAINT VIOLATION** | Action matches a forbidden behavior from any agent's non-negotiables or anti-degradation adapter | Halt immediately. Review the specific constraint. Undo the violating action if possible. Log the violation. | All |
| **OVERLOAD RISK** | Holding 5+ complex items simultaneously (5+ file reads, 5+ pending edits, 5+ unresolved decisions) | Write intermediate state to a file before continuing. Do not rely on context memory for complex state. | All |

### 6.2 Agent-Specific Trigger Orionmples

#### Neco-Specific Triggers

| Signal | Neco Trigger Orionmple |
|---|---|
| INCOMPLETENESS ALERT | Hook output missing attribution metadata (framework, audience, angle, style, brand_thread) |
| SYNTHESIS WARNING | Generating hooks without reading `_reference/style-library.md` or `_reference/hook-library.md` in this session |
| RUSHING ALERT | Skipped from Gate 1 (audience) directly to hook generation without Gate 2 (angle confirmation) |
| DEGRADATION WARNING | Hook scores declining from 7.5 average to 5.0 average within a session |
| CONSTRAINT VIOLATION | Fabricated a product name not in the Context Gatherer output. Cross-offer hook usage. |
| OVERLOAD RISK | Holding audience language bank + 3 framework analyses + angle library + style selections simultaneously |

#### Veda-Specific Triggers

| Signal | Veda Trigger Orionmple |
|---|---|
| INCOMPLETENESS ALERT | Pipeline run completed but output directory missing expected .mp4 files |
| SYNTHESIS WARNING | Running CLI command without `npm run build` first (operating on stale dist/) |
| RUSHING ALERT | 3+ code changes without running `npm test` |
| DEGRADATION WARNING | Test count dropped from 622 to 615 (tests deleted or broken) |
| CONSTRAINT VIOLATION | Cross-offer hook assignment. Root angle contamination. `--override-root-angle` used in production mode. |
| OVERLOAD RISK | Modifying orchestrator, assembly-editor, hook-selector, and CLI simultaneously |

#### Tess-Specific Triggers

| Signal | Tess Trigger Orionmple |
|---|---|
| INCOMPLETENESS ALERT | Registry sync completed but row count doesn't match expected |
| SYNTHESIS WARNING | Generating naming convention IDs without reading TESS-NAMING-CONVENTION.md |
| RUSHING ALERT | 3+ spreadsheet operations without visual verification |
| DEGRADATION WARNING | Spreadsheet tab row counts diverging from source data |
| CONSTRAINT VIOLATION | Naming convention violation (wrong position mapping). Fabricated ClickUp custom field values. |
| OVERLOAD RISK | Processing 5+ offers simultaneously across multiple spreadsheet tabs |

#### Orion-Specific Triggers

| Signal | Orion Trigger Orionmple |
|---|---|
| INCOMPLETENESS ALERT | Weekly update missing required sections (Wins, In Motion, Needs Input, Pulse, Thread Alignment) |
| SYNTHESIS WARNING | Writing scorecard update without reading actual agent session logs |
| RUSHING ALERT | Delegation without proper triage (P0/P1/P2/P3 assessment skipped) |
| DEGRADATION WARNING | Challenger items accumulating without resolution across 3+ sessions |
| CONSTRAINT VIOLATION | Direct communication to stakeholder (bypassing Christopher). Fabricated progress metrics. |
| OVERLOAD RISK | Managing 5+ P0 items simultaneously without delegation |

### 6.3 Signal Output Format

When a signal triggers, the agent outputs it explicitly and visibly:

```
INCOMPLETENESS ALERT: Session log entry for S038 is missing 'decisions_made' field.
  TRIGGER: Required field empty in session log format
  RESPONSE: Cannot mark session complete until all fields populated.
  ACTION: Returning to session log to complete entry.
```

```
SYNTHESIS WARNING: Generating hooks without reading style-library.md in this session.
  TRIGGER: No file read of _reference/style-library.md detected
  PROOF REQUIRED: Quote 3 specific lines from the file
  ACTION: Pausing generation. Reading style-library.md now.
```

```
CONSTRAINT VIOLATION: Hook uses a donor from the BFCM offer for a DQFE target.
  TRIGGER: Cross-offer hook assignment (Veda Non-Negotiable: hooks from SAME offer only)
  RESPONSE: Halt. This hook cannot be used.
  ACTION: Selecting replacement hook from DQFE offer donors only.
```

### 6.4 Integration with Anti-Degradation

These signals augment the existing `CREATIVE-OS-ANTI-DEGRADATION.md` system. They do not replace it.

| Existing System | Simulated Signals | Relationship |
|---|---|---|
| MC-CHECK protocol | RUSHING ALERT | RUSHING ALERT triggers when MC-CHECK is being skipped |
| Context zones (GREEN/YELLOW/RED/CRITICAL) | DEGRADATION WARNING | DEGRADATION WARNING triggers on quality decline; context zones trigger on volume/complexity |
| Forbidden rationalizations | CONSTRAINT VIOLATION | CONSTRAINT VIOLATION is the signal; forbidden rationalization is the specific violation type |
| Phase-Stop discipline | INCOMPLETENESS ALERT | INCOMPLETENESS ALERT fires when phase completion is claimed with gaps |

The signals are the detection mechanism. The anti-degradation system defines the response protocol.

---

## 7. Implementation Phases

### Phase 1: Effort Protocol (Immediate — All Agents)

**Timeline**: Can be applied immediately, no code changes
**Effort**: Minimal — add effort guidance to each agent's CLAUDE.md
**Impact**: Moderate quality improvement from deeper reasoning during generation

| Agent | Effort Mapping |
|---|---|
| **Neco** | `max` for hook generation, script generation, angle ideation. `high` for audience analysis, quality validation. `medium` for NECO-CHECK, gate verification. |
| **Veda** | `high` for hook selection logic, assembly planning. `medium` for standard pipeline operations, test verification. `low` for session log updates. |
| **Tess** | `high` for classification decisions, naming convention generation. `medium` for registry sync, spreadsheet operations. `low` for session log updates. |
| **Orion** | `high` for challenger assessments, weekly updates, meeting prep. `medium` for delegation triage, scorecard review. `low` for session log updates. |

**Deliverable**: Updated CLAUDE.md files for each agent with effort protocol section.

### Phase 2: Checkpoint Files (Veda First, Then Tess, Then Neco)

**Timeline**: 1-2 sessions per agent
**Effort**: Create checkpoints/ directory, add checkpoint writing to session end protocol, add checkpoint verification to session start protocol
**Impact**: Eliminates "trust the handoff" failure pattern. Structural enforcement of phase completion.

**Order rationale**:
1. **Veda first**: Most mature codebase (38 sessions, 622 tests, git history). Checkpoint verification can include automated checks (test count, build status, git hash).
2. **Tess second**: Second most mature (120 sessions). Checkpoint verification includes spreadsheet state and registry sync.
3. **Neco third**: Advisory agent — checkpoints are gate states (audience confirmed, angle confirmed, claims verified) rather than code states.

**Deliverable**: `checkpoints/` directory in each agent folder. Updated session protocols.

### Phase 3: Simulated Type 1 Signals (Core Anti-Degradation Update)

**Timeline**: 1 session
**Effort**: Update `CREATIVE-OS-ANTI-DEGRADATION.md` with signal definitions. Update each agent's adapter with agent-specific triggers.
**Impact**: Early warning system for quality issues. Catches problems before they compound.

**Deliverable**: Updated `CREATIVE-OS-ANTI-DEGRADATION.md` v1.1 with Section: Simulated Type 1 Signals. Updated adapter files.

### Phase 4: Neco Arena Agent Teams (S012+ with Chris H)

**Timeline**: Multiple sessions. Design is complete (Section 2). Implementation requires:
1. Enable Agent Teams in Claude Code settings
2. Package each lens as self-contained agent prompt
3. Implement Team Lead orchestration logic
4. Test with real product/audience (Chris H provides context)
5. Compare Arena output quality against single-context baseline
6. Iterate on lens definitions and scoring criteria

**Dependencies**:
- Agent Teams feature must be stable in Claude Code
- Chris H demo (S012) should happen in single-context mode first to establish a baseline
- Arena implementation begins after baseline is established

**Deliverable**: Working Neco Arena with 5 creative agents + Critic + Judge. Quality comparison report vs. single-context.

### Phase 5: Veda Parallel Pipeline (After Neco Arena Proves the Pattern)

**Timeline**: 2-3 sessions
**Effort**: Refactor hook selection to use parallel evaluators. Add parallel variation assembly. Batch queue processing.
**Impact**: Throughput improvement for batch operations. Deeper hook evaluation.

**Dependencies**:
- Neco Arena implementation proves Agent Teams works for Creative OS
- Veda's pipeline is stable (Phase 5 demo complete)
- Iconik transcription blocker resolved

**Deliverable**: Parallel hook evaluation and variation assembly in Veda pipeline.

### Phase 6: Orion Monitoring Dashboard (Lowest Priority)

**Timeline**: 1-2 sessions
**Effort**: Build health dashboard Team Lead + 4 monitor agents. Define report format. Wire into Orion's Mode 1 (Strategic Review).
**Impact**: Systematic cross-agent health monitoring. Replaces ad-hoc session log reading.

**Dependencies**:
- Checkpoint files exist in all agents (Phase 2 complete)
- All agents have stable session log formats

**Deliverable**: Orion health dashboard that spawns read-only monitors and produces aggregated status report.

### Phase Summary

| Phase | What | When | Prerequisite | Tokens Impact |
|---|---|---|---|---|
| 1 | Effort Protocol | Immediate | None | None (effort is a model capability, not an API cost) |
| 2 | Checkpoint Files | Next 3-6 sessions | None | None (filesystem only) |
| 3 | Simulated Signals | 1 session after Phase 2 | Phase 2 (checkpoints give signals something to check) | None (detection logic only) |
| 4 | Neco Arena | S012+ | Phases 1-3, Agent Teams stable, Chris H baseline | ~14-21x per Arena run (see Section 8) |
| 5 | Veda Parallel | After Phase 4 | Phase 4 proven, Veda pipeline stable | ~3-5x per batch run |
| 6 | Orion Dashboard | After Phase 5 | Phases 2-5 complete | ~5x per health check |

---

## 8. Token Cost Analysis

Agent Teams uses significantly more tokens than single-context mode. Each teammate is a separate Claude instance with its own context window. This section provides honest cost estimates and justification.

### 8.1 Baseline: Single-Context Session

A typical Neco creative session (hooks for one product/audience) in single-context mode:

| Component | Estimated Tokens |
|---|---|
| Context loading (CLAUDE.md, Master Agent, reference files) | ~15,000 |
| Layer 1 (Context Gatherer + Audience Intelligence) | ~20,000 |
| Layer 2 (Multi-perspective hook generation, 3 lenses) | ~30,000 |
| Layer 3 (Quality Validator) | ~10,000 |
| Session management (log, handoff) | ~5,000 |
| **Total single-context session** | **~80,000 tokens** |

Call this **1X** (baseline unit).

### 8.2 Neco Arena (2 Rounds, Hooks)

| Component | Agents | Tokens Each | Total |
|---|---|---|---|
| Team Lead orchestration | 1 | ~20,000 | 20,000 |
| Creative agents (Focus, Suggestibility, Compliance, Data, Architect) × Round 1 | 5 | ~25,000 | 125,000 |
| Critic Agent × Round 1 | 1 | ~15,000 | 15,000 |
| Judge Agent × Round 1 (scoring + Learning Brief) | 1 | ~15,000 | 15,000 |
| Creative agents × Round 2 (with Learning Brief) | 5 | ~25,000 | 125,000 |
| Critic Agent × Round 2 | 1 | ~15,000 | 15,000 |
| Judge Agent × Round 2 (final scoring) | 1 | ~15,000 | 15,000 |
| Architect synthesis (post-Arena hybrids) | 1 | ~20,000 | 20,000 |
| **Total 2-round Arena** | | | **~350,000 tokens** |

**Cost multiplier**: ~4.4X baseline (not 14X, because each agent's context is smaller than a full session)

### 8.3 Neco Arena (3 Rounds, Full Scripts)

| Component | Agents | Tokens Each | Total |
|---|---|---|---|
| Team Lead orchestration | 1 | ~25,000 | 25,000 |
| Creative agents × Round 1 | 5 | ~40,000 | 200,000 |
| Critic + Judge × Round 1 | 2 | ~20,000 | 40,000 |
| Creative agents × Round 2 | 5 | ~40,000 | 200,000 |
| Critic + Judge × Round 2 | 2 | ~20,000 | 40,000 |
| Creative agents × Round 3 | 5 | ~40,000 | 200,000 |
| Critic + Judge × Round 3 | 2 | ~20,000 | 40,000 |
| Architect synthesis | 1 | ~30,000 | 30,000 |
| **Total 3-round Arena** | | | **~775,000 tokens** |

**Cost multiplier**: ~9.7X baseline

### 8.4 Justification

Performance Golf's ad spend is measured in millions per year. The creative assets that drive that spend — hooks, scripts, angles — are the leverage point. A 10% improvement in hook quality translates directly to:

- Lower CPAs (better hooks → higher CTRs → lower cost per acquisition)
- Higher ROAS (more effective creative → more revenue per dollar spent)
- Faster scaling (winning creative can scale spend before fatigue)

The token cost of a 3-round Arena (~775K tokens) is approximately $10-15 at current API pricing. A single winning hook variation can drive $50K-$500K in profitable ad spend.

Tony's framing applies directly:

> **"This is the correct tradeoff. Quality over speed. Quality over cost."**

The anti-degradation system exists because quality matters more than efficiency. The Effort Protocol exists because depth matters more than speed. Agent Teams exists because genuine creative independence matters more than token savings.

### 8.5 Cost Optimization Strategies

While quality over cost is the principle, practical optimizations exist:

| Strategy | Savings | Tradeoff |
|---|---|---|
| 2 rounds for hooks, 3 for scripts | ~30% vs. always 3 rounds | Hooks have fewer dimensions to optimize |
| 5 creative agents (not 7 like Tony) | ~29% vs. 7-agent Arena | Neco's lenses are more targeted than Tony's editorial personas |
| Single-context for revisions | ~80% vs. Arena for simple edits | Arena is for NEW generation, not iteration on existing work |
| Effort Protocol alone (no Arena) | ~0% extra tokens | Significant quality improvement from deeper reasoning without multi-agent cost |
| Selective Arena usage | Variable | Only use Arena for high-stakes creative (new offers, major angle pivots), not every hook batch |

### 8.6 When NOT to Use the Arena

| Scenario | Use Instead |
|---|---|
| Quick hook revision (tweaking existing copy) | Single-context with `effort: max` |
| Style variant of existing hook | Single-context, no Arena |
| Session with time constraint (< 30 min) | Single-context multi-perspective |
| Low-stakes creative (internal test, throwaway) | Single-context standard effort |
| Chris H demo (S012) | Single-context first to establish baseline |

---

## Appendix A: Glossary

| Term | Definition |
|---|---|
| **Arena** | Multi-agent competitive generation process where multiple independent agents generate, get critiqued, revise, and compete across rounds |
| **Agent Teams** | Claude Code feature allowing multiple Claude instances to work as a coordinated team with peer-to-peer communication and shared task lists |
| **Learning Brief** | Document generated by Judge Agent after each round, containing winning techniques for other agents to absorb |
| **HSP** | Hook Score Protocol — Neco's scoring framework for hooks |
| **SSP** | Script Score Protocol — Neco's scoring framework for scripts |
| **Effort Protocol** | Mapping of Claude's Adaptive Thinking effort levels to specific execution phases |
| **Checkpoint File** | YAML file in agent's checkpoints/ directory that structurally gates downstream phases |
| **Simulated Type 1 Signal** | Externalized "gut feeling" warning that LLMs cannot generate internally |
| **MC-CHECK** | Metacognitive checkpoint protocol from anti-degradation system |
| **NECO-CHECK** | Neco-specific metacognitive checkpoint executed at gate boundaries |
| **Synthesizer** | Post-Arena phase where the Architect creates phrase-level hybrids from all agents' outputs |
| **Six-Axis** | Chase Hughes' behavioral influence model: Focus, Suggestibility, Openness, Connection, Compliance, Expectancy |

## Appendix B: File Locations

| File | Path |
|---|---|
| This document | `pg-creative-os/_ops/audits/05-agent-teams-architecture.md` |
| Tony's analysis | `TonyFlo Systems/CopywritingEngine/AGENT-TEAMS-UPGRADE-ANALYSIS.md` |
| Creative OS root | `pg-creative-os/CLAUDE.md` |
| Anti-degradation core | `pg-creative-os/CREATIVE-OS-ANTI-DEGRADATION.md` |
| Neco Master Agent | `pg-creative-os/neco-neurocopy-agent/NECO-MASTER-AGENT.md` |
| Neco Sub-Agents | `pg-creative-os/neco-neurocopy-agent/NECO-SUB-AGENTS.md` |
| Veda Master Agent | `pg-creative-os/veda-video-editing-agent/VEDA-MASTER-AGENT.md` |
| Orion Master Agent | `pg-creative-os/orion-chief-of-staff/ORION-REFERENCE.md` |
| Tess Master Agent | `pg-creative-os/tess-strategic-scaling-system/TESS-MASTER-AGENT.md` |

---

*Generated 2026-02-09 | Creative OS Agent Teams Architecture Plan v1.0 | COS Upgrade Session*
