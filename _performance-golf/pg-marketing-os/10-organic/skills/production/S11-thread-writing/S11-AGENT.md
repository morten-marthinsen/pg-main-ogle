# S11: Thread Writing — Master Agent

**Version:** 1.0
**Skill:** S11-thread-writing
**Position:** Production, Post-CBF
**Type:** Content Generation + Arena
**Dependencies:** S07 Campaign Brief (CBF)
**Output:** Thread content (X/Twitter or LinkedIn)

---

## Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Input validation + loading | haiku | Simple validation, specimen loading |
| 1 | Platform analysis + architecture | sonnet | Classification, structure planning |
| 2 | Thread generation | opus | Content creation requires creativity |
| 2.5 | Arena competition | opus | ALL Arena competition |
| 4 | Output assembly + validation | sonnet | Assembly from existing content |

---

## Purpose

Produce high-engagement threads for X/Twitter and LinkedIn that build authority, drive engagement, and maximize value delivery in a scannable format. Threads are long-form text content that must hook on tweet 1, deliver value through the body, and close with clear CTA.

**Success Criteria:**
- Tweet 1 works standalone as scroll-stop hook
- Each tweet provides standalone value while building sequence
- Platform-native formatting (X thread ≠ LinkedIn article)
- Voice aligned with BVF
- Passes virality scoring (≥60)

---

## Identity Boundaries

**This skill IS:**
- Thread topic selection and architecture
- Platform-specific thread structure (X vs LinkedIn)
- Hook tweet optimization for scroll stop
- Individual tweet writing that builds sequence
- Engagement trigger placement
- CTA strategy for threads

**This skill is NOT:**
- Campaign strategy (that's S01-S07)
- Visual direction (that's S12)
- Scheduling (that's S15)
- Performance analysis (that's S19)

---

## Layer Map

> **Critical Constraints Reminder (Layer 0)**
> - Read ANTI-DEGRADATION.md before executing
> - Load CBF, BVF, teaching files, specimens
> - Every microskill produces its own output file

### Layer 0: Foundation (Loading & Validation)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 0.1 | Input Validator | [0.1-input-validator.md](skills/layer-0/0.1-input-validator.md) |
| 0.2 | Teaching Loader | [0.2-teaching-loader.md](skills/layer-0/0.2-teaching-loader.md) |
| 0.3 | Specimen Loader | [0.3-specimen-loader.md](skills/layer-0/0.3-specimen-loader.md) |
| 0.4 | CBF Loader | [0.4-cbf-loader.md](skills/layer-0/0.4-cbf-loader.md) |

> **Critical Constraints Reminder (Layer 1)**
> - Platform differences are structural, not cosmetic
> - Thread type selection determines architecture
> - Hook tweet must work standalone

### Layer 1: Thread Architecture

| Microskill | Purpose | Document |
|------------|---------|----------|
| 1.1 | Platform Analysis | [1.1-platform-analysis.md](skills/layer-1/1.1-platform-analysis.md) |
| 1.2 | Thread Type Selection | [1.2-thread-type-selection.md](skills/layer-1/1.2-thread-type-selection.md) |
| 1.3 | Hook Tweet Strategy | [1.3-hook-tweet-strategy.md](skills/layer-1/1.3-hook-tweet-strategy.md) |
| 1.4 | Thread Count Planning | [1.4-thread-count-planning.md](skills/layer-1/1.4-thread-count-planning.md) |

> **Critical Constraints Reminder (Layer 2)**
> - Each tweet must provide standalone value
> - No filler tweets allowed
> - Maintain momentum throughout

### Layer 2: Thread Generation

| Microskill | Purpose | Document |
|------------|---------|----------|
| 2.1 | Hook Tweet Writing | [2.1-hook-tweet-writing.md](skills/layer-2/2.1-hook-tweet-writing.md) |
| 2.2 | Body Tweet Writing | [2.2-body-tweet-writing.md](skills/layer-2/2.2-body-tweet-writing.md) |
| 2.3 | CTA Tweet Writing | [2.3-cta-tweet-writing.md](skills/layer-2/2.3-cta-tweet-writing.md) |
| 2.4 | Formatting Polish | [2.4-formatting-polish.md](skills/layer-2/2.4-formatting-polish.md) |

> **Critical Constraints Reminder (Layer 2.5 — Arena)**
> - All threads run through 7-persona Arena
> - 2 rounds + audience evaluation mandatory
> - Mode: generative_full_draft

### Layer 2.5: Arena Competition

| Microskill | Purpose | Document |
|------------|---------|----------|
| 2.5.1 | Arena Submission | [2.5.1-arena-submission.md](skills/layer-2.5/2.5.1-arena-submission.md) |
| 2.5.2 | Adversarial Critique | [2.5.2-adversarial-critique.md](skills/layer-2.5/2.5.2-adversarial-critique.md) |
| 2.5.3 | Synthesis | [2.5.3-synthesis.md](skills/layer-2.5/2.5.3-synthesis.md) |

> **Critical Constraints Reminder (Layer 4)**
> - Arena-selected thread must be incorporated
> - Virality score must be calculated
> - All validation checks must pass

### Layer 4: Output Packaging

| Microskill | Purpose | Document |
|------------|---------|----------|
| 4.1 | Output Assembler | [4.1-output-assembler.md](skills/layer-4/4.1-output-assembler.md) |
| 4.2 | Execution Log | [4.2-execution-log.md](skills/layer-4/4.2-execution-log.md) |

---

## Execution Flow

```
                INPUT: CBF + Thread Brief
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│         LAYER 0: FOUNDATION (haiku)                 │
│   Input Validation → Teaching/Specimen Loading      │
│           GATE: LAYER_0_COMPLETE.yaml              │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│         LAYER 1: ARCHITECTURE (sonnet)              │
│   Platform Analysis → Type Selection → Hook         │
│   Strategy → Thread Count Planning                  │
│           GATE: LAYER_1_COMPLETE.yaml              │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│         LAYER 2: GENERATION (opus)                  │
│   Hook Tweet → Body Tweets → CTA Tweet              │
│   → Formatting Polish                               │
│           GATE: LAYER_2_COMPLETE.yaml              │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│         LAYER 2.5: ARENA (opus)                     │
│   7 Personas × 2 Rounds + Audience Eval → Synthesis │
│           GATE: ARENA_COMPLETE.yaml                │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│         LAYER 4: OUTPUT (sonnet)                    │
│   Assembly → Virality Scoring → Validation         │
│           OUTPUT: thread-output.yaml                │
└─────────────────┴───────────────────────────────────┘
                  │
                  ▼
           HANDOFF: S14 Content Assembly
```

---

## Output Schema

```yaml
# THREAD OUTPUT
thread_id:
title:
platform: # X_TWITTER or LINKEDIN
content_function: # Awareness/Engagement/Conversion/Community
thread_type: # Listicle/Story/Breakdown/Framework/Prediction/Curation
total_tweets:

tweets:
  - tweet_number: 1
    type: "hook"
    content: |
      [Tweet text]
    character_count:
    media_description: # If applicable

  - tweet_number: 2
    type: "context"
    content: |
      [Tweet text]
    character_count:

  # ... continue for all tweets

thread_copy_formatted: |
  [Full thread with numbering, ready to post]

virality_scores:
  emotional_activation: # 1-10
  social_currency: # 1-10
  pattern_interrupt: # 1-10
  platform_fit: # 1-10
  shareability: # 1-10
  total_score: # Sum

quality_scores:
  hook_strength: # 1-10
  value_density: # 1-10
  flow_and_pacing: # 1-10
  cta_clarity: # 1-10

arena_selection_verified: true
arena_file: # Path to arena synthesis

execution_log: # Path to log file
```

---

## Validation Requirements (Pre-S14 Handoff)

- [ ] platform = X_TWITTER or LINKEDIN
- [ ] total_tweets between 5-15
- [ ] tweets[0].type = "hook"
- [ ] tweets[-1] includes clear CTA
- [ ] All tweets under character limit (280 for X, 3000 for LinkedIn)
- [ ] virality_scores.total_score ≥ 60
- [ ] quality_scores.hook_strength ≥ 7
- [ ] arena_selection_verified = true
- [ ] Arena synthesis file exists at arena_file path

---

## Constraints

### Input Constraints
- NEVER proceed without valid CBF
- NEVER proceed without thread_brief.topic
- NEVER proceed without thread_brief.platform
- NEVER proceed without BVF (voice constraints)

### Layer 1 Constraints
- NEVER treat X threads and LinkedIn threads as identical
- NEVER select thread type without analyzing audience need
- NEVER skip hook tweet strategy — tweet 1 determines thread success
- NEVER plan thread count without content density analysis

### Layer 2 Constraints
- NEVER write filler tweets to hit target count
- NEVER write hook tweet that requires context to understand
- NEVER write body tweets that don't provide standalone value
- NEVER write CTA tweet without matching content function from CBF
- NEVER skip formatting polish — line breaks and emphasis matter

### Arena Constraints
- NEVER skip Arena for thread content
- NEVER run fewer than 2 rounds
- NEVER skip any of the 7 personas
- NEVER proceed without human selection after Arena synthesis

### Output Constraints
- NEVER output thread without virality scoring
- NEVER output thread with virality_score < 60
- NEVER output thread with hook_strength < 7
- NEVER output without arena_selection_verified = true
- NEVER output without all validation requirements passing

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-04 | Initial decomposition from monolithic SKILL.md. Added Layer 0-4 structure, model assignments, Arena integration, per-microskill output protocol. |
