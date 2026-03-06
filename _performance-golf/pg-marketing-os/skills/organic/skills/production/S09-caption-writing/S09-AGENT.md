# S09: Caption Writing — Master Agent

**Version:** 1.0
**Skill:** S09-caption-writing
**Position:** Production Phase
**Type:** Content Generation + Arena
**Dependencies:** S07 Campaign Brief (Gate G07), optionally S08 Scripts
**Output:** Platform-optimized captions

---

## Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Input validation + teaching/specimen loading | haiku | Simple validation and file loading |
| 1 | Platform analysis, caption structure strategy, CTA strategy | sonnet | Classification and strategic planning |
| 2 | Caption drafting (generation) | opus | Creative content generation |
| 2.5 | Arena competition | opus | ALL Arena rounds |
| 4 | Caption assembly + execution log | sonnet | Assembly from existing content |

---

## Purpose

Produce scroll-stopping, engagement-driving captions that work WITH visual content to maximize impact. Captions are content, not metadata. Every caption MUST run through the 7-persona Arena.

**Success Criteria:**
- Captions for all requested content pieces
- Hook works before fold/truncation for each platform
- Platform-native formatting (not cross-posted)
- CTA matches content function
- Arena completed (3 rounds, 7 personas)
- Voice alignment with BVF confirmed

---

## Identity Boundaries

**This skill IS:**
- Caption copy creation (Instagram, TikTok, YouTube, LinkedIn, X)
- Hook-body-CTA structure for captions
- Platform-specific formatting (line breaks, hashtags, length)
- CTA integration aligned with content function
- Arena-driven caption refinement

**This skill is NOT:**
- Video scripts (that's S08)
- Carousel slide copy (that's S10)
- Thread bodies (that's S11)
- Comment responses (that's S16)

---

## Layer Map

> **Critical Constraints Reminder (Layer 0)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only
> - All teaching AND specimen files must be loaded

### Layer 0: Foundation (Loading & Validation)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 0.1 | Input Validator | [0.1-input-validator.md](skills/layer-0/0.1-input-validator.md) |
| 0.2 | Teaching Loader | [0.2-teaching-loader.md](skills/layer-0/0.2-teaching-loader.md) |
| 0.3 | Specimen Loader | [0.3-specimen-loader.md](skills/layer-0/0.3-specimen-loader.md) |
| 0.4 | CBF Loader | [0.4-cbf-loader.md](skills/layer-0/0.4-cbf-loader.md) |

### Layer 1: Strategic Planning

| Microskill | Purpose | Document |
|------------|---------|----------|
| 1.1 | Platform Caption Analysis | [1.1-platform-caption-analysis.md](skills/layer-1/1.1-platform-caption-analysis.md) |
| 1.2 | Caption Structure Strategy | [1.2-caption-structure-strategy.md](skills/layer-1/1.2-caption-structure-strategy.md) |
| 1.3 | Hook Strategy | [1.3-hook-strategy.md](skills/layer-1/1.3-hook-strategy.md) |
| 1.4 | CTA Strategy | [1.4-cta-strategy.md](skills/layer-1/1.4-cta-strategy.md) |
| 1.5 | Hashtag Strategy | [1.5-hashtag-strategy.md](skills/layer-1/1.5-hashtag-strategy.md) |

### Layer 2: Caption Generation

| Microskill | Purpose | Document |
|------------|---------|----------|
| 2.1 | Hook Drafting | [2.1-hook-drafting.md](skills/layer-2/2.1-hook-drafting.md) |
| 2.2 | Body Writing | [2.2-body-writing.md](skills/layer-2/2.2-body-writing.md) |
| 2.3 | CTA Integration | [2.3-cta-integration.md](skills/layer-2/2.3-cta-integration.md) |
| 2.4 | Platform Formatting | [2.4-platform-formatting.md](skills/layer-2/2.4-platform-formatting.md) |

### Layer 2.5: Arena

| Microskill | Purpose | Document |
|------------|---------|----------|
| 2.5.1 | Arena Submission | [2.5.1-arena-submission.md](skills/layer-2.5/2.5.1-arena-submission.md) |
| 2.5.2 | Adversarial Critique | [2.5.2-adversarial-critique.md](skills/layer-2.5/2.5.2-adversarial-critique.md) |
| 2.5.3 | Synthesis | [2.5.3-synthesis.md](skills/layer-2.5/2.5.3-synthesis.md) |

### Layer 4: Output Packaging

| Microskill | Purpose | Document |
|------------|---------|----------|
| 4.1 | Output Assembler | [4.1-output-assembler.md](skills/layer-4/4.1-output-assembler.md) |
| 4.2 | Execution Log | [4.2-execution-log.md](skills/layer-4/4.2-execution-log.md) |

---

## Output Schema

```yaml
# CAPTION OUTPUT FILE
caption_id:
campaign_name:
platform:
content_type: # Reel/photo/video/carousel/etc
content_function: # Awareness/Engagement/Conversion/Community
date_created:
version: "1.0"

caption_content:
  hook: |
    [First line before 'more' or truncation]

  body: |
    [Full caption body with line breaks]

  cta:
    type: # Soft/Medium/Hard
    text: |
      [Call to action text]

  hashtags: []

  full_caption: |
    [Complete caption ready to post with formatting]

metadata:
  content_title:
  content_pillar:
  character_count:
  platform_limits_met: true/false

voice_check:
  bvf_alignment: true/false
  signature_phrases_used: []
  banned_words_avoided: true/false

virality_contribution:
  hook_strength: # /10
  platform_fit: # /10
  voice_alignment: # /10

arena_notes:
  selected_hybrid: "[Hybrid X]"
  strongest_personas: []
  key_synthesis_decisions: []

quality_gates_passed:
  - hook_before_fold: true
  - platform_formatted: true
  - voice_aligned: true
  - cta_appropriate: true
  - arena_complete: true
  - anti_slop_passed: true
```

---

## Validation Requirements (Gate)

- [ ] caption_content.hook exists and works before fold
- [ ] platform character limits met
- [ ] platform_formatting applied (line breaks, emoji, hashtags)
- [ ] voice_check passed against BVF
- [ ] cta matches content_function
- [ ] hashtag_strategy from PSF applied
- [ ] arena_complete: true
- [ ] anti_slop_passed: true

---

## Constraints

### Input Constraints
- NEVER proceed without CBF loaded
- NEVER accept caption requests without platform specified
- NEVER accept vague content descriptions

### Layer 1 Constraints
- NEVER plan cross-platform captions — each platform gets unique structure
- NEVER skip hook strategy — first line determines engagement
- NEVER ignore platform character limits

### Layer 2 Constraints
- NEVER write hook that doesn't work before "...more" or truncation
- NEVER skip line breaks (readability matters)
- NEVER write CTA without referring to CBF funnel strategy
- NEVER label final until Arena complete

### Arena Constraints (Layer 2.5)
- NEVER run fewer than 3 rounds
- NEVER skip any of the 7 personas
- NEVER proceed without human selection

### Output Constraints
- NEVER output without voice check passed
- NEVER output with character count exceeding platform limits
- NEVER output placeholder content in required fields

---

## Platform Caption Specifications

### Instagram
- Display before fold: First 125 characters
- Max length: 2200 characters
- Optimal: 150-300 or 1000+ (no middle)
- Line breaks: Essential for readability
- Hashtags: In caption or first comment

### TikTok
- Display: First ~70 characters
- Max length: 4000 characters (2024+)
- Optimal: 50-150 characters
- Purpose: Add context video doesn't provide

### LinkedIn
- Display before fold: First ~140 characters
- Max length: 3000 characters
- Format: Single sentences with line breaks
- Hashtags: End only (3-5 max)

### X/Twitter
- Max length: 280 characters
- No truncation — all visible
- Format: Entire caption is the hook

### YouTube
- Description fold: First 100 characters
- Max length: 5000 characters
- Include: Timestamps (long-form), links, resources

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-05 | Initial decomposition from monolithic SKILL.md. Model assignment table, 4-layer structure with Arena (2.5), 16 microskills, platform-native enforcement, voice check requirements. |
