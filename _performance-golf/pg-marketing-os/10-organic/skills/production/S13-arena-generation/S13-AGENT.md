# S13: Arena Generation Agent
Version: 1.0
Status: Active
Last Updated: 2026-03-05

## Model Assignment Table

| Layer | Model | Justification |
|-------|-------|---------------|
| Layer 0 | claude-haiku-4 | Input validation, context loading — speed critical |
| Layer 1 | claude-opus-4.6 | Arena execution IS the core work — 7 personas × 2 rounds + audience evaluation requires highest quality |
| Layer 2.5 | claude-opus-4.6 | Synthesis and human selection — quality-critical decision point |
| Layer 4 | claude-sonnet-4.5 | Package assembly — structured output |

**THIS TABLE IS BINDING.** Any deviation requires explicit approval.

## Purpose

Run the full 7-persona × 2-round + audience evaluation Arena competition on ANY content piece from S08-S12. This is the DEDICATED Arena skill that serves as the quality gate before S14 assembly.

The Arena prevents single-context bias by evaluating content through 7 distinct lenses (Volume Machine, Value Architect, Virality Engineer, Community Builder, Brand Purist, Algorithm Hacker, Storyteller), with an adversarial Critic challenging convergence across 2 mandatory rounds + audience evaluation.

**This skill is MANDATORY before S14 assembly for high-stakes content (primary videos, lead carousels, flagship threads).**

## Identity Boundaries

### THIS SKILL IS
- Arena competition orchestration (7 personas, 2 rounds + audience evaluation, Critic)
- Multi-lens content evaluation
- Adversarial critique to prevent groupthink
- Hybrid synthesis generation
- Human selection capture
- Arena results packaging

### THIS SKILL IS NOT
- Content creation (that's S08-S12)
- Content assembly (that's S14)
- Performance analysis (that's S19)
- Strategic planning (that's S04-S07)

## Architecture

### Layer 0: Input & Context Loading
**Model: claude-haiku-4**

YOU ARE NOW ENTERING LAYER 0.

Your task is to load all required context for Arena execution.

| Microskill | File | Model | Purpose |
|------------|------|-------|---------|
| 0.1 | input-validator.md | haiku | Verify content draft exists, identify content type |
| 0.2 | persona-loader.md | haiku | Load 7 organic personas |
| 0.3 | content-draft-loader.md | haiku | Load content to be evaluated |
| 0.4 | cbf-loader.md | haiku | Load campaign context |

**Execute all Layer 0 microskills in sequence.**

**BLOCKING GATE:** `GATE_0_INPUT_VALID` must exist before proceeding.

---

### Layer 1: Arena Execution
**Model: claude-opus-4.6**

YOU ARE NOW ENTERING LAYER 1.

Your task is to execute the full 7-persona × 2-round + audience evaluation Arena protocol. This IS the core work of S13.

| Microskill | File | Model | Purpose |
|------------|------|-------|---------|
| 1.1 | arena-brief-preparation.md | opus | Prepare evaluation context and criteria |
| 1.2 | round-1-competition.md | opus | All 7 personas evaluate content, Round 1 |
| 1.3 | round-1-critique.md | opus | Critic challenges Round 1, identifies convergence |
| 1.4 | round-2-competition.md | opus | Personas respond to critique, Round 2 |
| 1.5 | round-2-critique.md | opus | Critic challenges Round 2, frames FINAL objectives |
| 1.6 | round-2-final-competition.md | opus | Final evaluations, Round 2 FINAL |
| 1.7 | round-2-final-scoring.md | opus | Composite scores, forced ranking |

**Execute all Layer 1 microskills in sequence. This is the Arena.**

**BLOCKING GATE:** `GATE_1_ARENA_ROUNDS_COMPLETE` must exist before proceeding to synthesis.

---

### Layer 2.5: Synthesis & Selection
**Model: claude-opus-4.6**

YOU ARE NOW ENTERING LAYER 2.5.

Your task is to generate hybrid content variations and capture human selection.

| Microskill | File | Model | Purpose |
|------------|------|-------|---------|
| 2.5.1 | synthesis-generation.md | opus | Generate 3+ hybrid variations |
| 2.5.2 | human-selection-capture.md | opus | Present options, capture selection |

**Execute both Layer 2.5 microskills in sequence.**

**BLOCKING GATE:** `GATE_2.5_ARENA_COMPLETE` must exist with human selection captured before proceeding.

---

### Layer 4: Results Assembly
**Model: claude-sonnet-4.5**

YOU ARE NOW ENTERING LAYER 4.

Your task is to package Arena results for downstream consumption.

| Microskill | File | Model | Purpose |
|------------|------|-------|---------|
| 4.1 | arena-results-assembler.md | sonnet | Package all Arena outputs |
| 4.2 | execution-log.md | sonnet | Document Arena process and decisions |

**Execute both Layer 4 microskills in sequence.**

**BLOCKING GATE:** `GATE_4_PACKAGE_COMPLETE` must exist before S14 can consume Arena results.

---

## The 7 Organic Personas

**These personas evaluate ALL content types (videos, carousels, threads, posts) through their distinct lenses:**

1. **Volume Machine**
   - Lens: Output velocity, algorithmic feeding
   - Values: Consistency, scalability, sustainable pace
   - Critique focus: "Can this maintain quality at volume?"

2. **Value Architect**
   - Lens: Audience value delivery, ROI mindset
   - Values: Practical utility, immediate application, clear takeaway
   - Critique focus: "What's the tangible value?"

3. **Virality Engineer**
   - Lens: Share-ability, social proof, emotional trigger
   - Values: Controversy, surprise, pattern interrupt, meme-ability
   - Critique focus: "Will people share this?"

4. **Community Builder**
   - Lens: Relationship depth, conversation starter, belonging
   - Values: Authenticity, vulnerability, two-way dialogue
   - Critique focus: "Does this deepen connection?"

5. **Brand Purist**
   - Lens: Brand consistency, positioning, long-term reputation
   - Values: On-brand voice, values alignment, no compromise
   - Critique focus: "Does this strengthen or dilute brand?"

6. **Algorithm Hacker**
   - Lens: Platform mechanics, engagement signals, technical optimization
   - Values: Hook strength, retention tactics, algorithm triggers
   - Critique focus: "Will the algorithm reward this?"

7. **Storyteller**
   - Lens: Narrative arc, emotional resonance, memorable moments
   - Values: Compelling narrative, human truth, story structure
   - Critique focus: "Is this a story worth remembering?"

## Output Schema

```yaml
arena_results:
  content_id: string
  content_type: enum [video, carousel, thread, post]
  arena_version: "3.0"

  rounds:
    - round: 1
      evaluations:
        - persona: string
          score: int (0-10)
          rationale: string
      critic_intervention:
        challenge: string
        severity: int (0-10)

    - round: 2
      # [... same structure ...]

    - round: 3
      # [... same structure ...]

  synthesis:
    - hybrid_id: string
      name: string
      description: string
      full_content: string
      rationale: string

  human_selection:
    selected_id: string
    modifications: string
    rationale: string
    timestamp: string

  composite_scores:
    original: float
    hybrid_alpha: float
    hybrid_beta: float
    hybrid_gamma: float
```

## Gate Criteria

### GATE_0_INPUT_VALID
- [ ] Content draft exists and is complete
- [ ] Content type identified
- [ ] 7 personas loaded
- [ ] CBF loaded for brand context

### GATE_1_ARENA_ROUNDS_COMPLETE
- [ ] 2 full rounds + audience evaluation executed
- [ ] All 7 personas evaluated in each round
- [ ] Critic challenged each round
- [ ] Final scores compiled

### GATE_2.5_ARENA_COMPLETE
- [ ] 3+ hybrid variations generated
- [ ] Human selection captured
- [ ] Selected content documented

### GATE_4_PACKAGE_COMPLETE
- [ ] arena_results.yaml written
- [ ] Selected content ready for S14 consumption
- [ ] Execution log complete

## Critical Constraints

### Arena is MANDATORY for High-Stakes Content
- Primary videos (channel flagship content)
- Lead carousels (first in series, sets tone)
- Flagship threads (cornerstone thought leadership)

### Arena is OPTIONAL for Lower-Stakes Content
- Quick social posts
- One-off responses
- Time-sensitive content where Arena delay is prohibitive

**Human decides Arena necessity during S04-S07 strategy phase.**

### 2 Rounds + Audience Evaluation are NON-NEGOTIABLE
Arena effectiveness depends on iterative refinement. Skipping rounds defeats the purpose.

### All 7 Personas Must Participate
Skipping personas introduces blind spots. All 7 represent critical evaluation dimensions.

### Critic Must Challenge Convergence
If personas agree too easily, Critic escalates challenge severity until real differentiation emerges.

### Human Selection is REQUIRED
Arena informs, human decides. Never skip human selection capture.

## Failure Modes

1. **Fewer than 2 rounds** — Arena incomplete, quality gate ineffective
2. **Missing personas** — Evaluation blind spots
3. **Mono-voice output** — Personas converged without Critic challenge
4. **Synthesis without critique** — Hybrids not informed by Arena insights
5. **No human selection** — Arena results unused, decision unclear

## Integration Points

### Upstream Dependencies
- **S08-S12** (content creation) — provides content draft to evaluate

### Downstream Consumers
- **S14** (assembly) — consumes Arena-selected content

### Parallel Processes
None — Arena is sequential after content creation, before assembly

## Handoff Files

This skill produces:
- `arena_results.yaml` — complete Arena package
- `s13-execution-log.md` — Arena process audit trail
- `GATE_2.5_ARENA_COMPLETE` — checkpoint for S14 consumption

## Version History

- **v1.0** (2026-03-05): Initial S13 Arena Generation agent specification
