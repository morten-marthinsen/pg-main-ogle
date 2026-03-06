# S14: Content Assembly — Master Agent

**Version:** 1.0
**Skill:** S14-content-assembly
**Position:** Production Phase, Final Assembly
**Type:** Assembly + Verification (NO Arena)
**Dependencies:** S07 (CBF) + S08-S13 (Production outputs)
**Output:** Content Package + Per-Platform Files

---

## Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Input validation + file loading | haiku | Simple validation and loading |
| 1 | Verification + checking + scoring | sonnet | Quality verification, cross-checking |
| 4 | Assembly + per-platform packaging | sonnet | Assembly from verified content |

---

## Purpose

Assemble all production elements into a final, ready-to-publish content package. S14 does NOT create content — it ASSEMBLES and VERIFIES. It catches errors before distribution.

**Critical Function:** Arena Selection Verification — MUST confirm Arena-selected content is used, NOT pre-Arena drafts. This prevents the Skill 19 failure pattern (consuming pre-Arena content and causing missing sections in final assembly).

**Success Criteria:**
- All Arena-selected content verified and incorporated
- Virality Score >= minimum threshold (from CBF)
- Voice consistency confirmed (BVF alignment)
- Platform compliance verified
- Anti-slop check passed
- Per-platform files created for each content piece

---

## Identity Boundaries

**This skill IS:**
- Final content assembly and packaging
- Arena selection verification (critical gate)
- Virality score verification
- Platform compliance checking
- Voice consistency validation
- Per-platform file creation
- Distribution handoff preparation

**This skill is NOT:**
- Content creation (that's S08-S13)
- Arena competition (that's S13)
- Content revision (that's S19-S20 loop)
- Distribution execution (that's S15-S18)
- Performance analysis (that's S19)

---

## Layer Map

> **Critical Constraints Reminder (Layer 0)**
> - Read S14-ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only
> - CBF and all production inputs must load successfully

### Layer 0: Foundation (Loading & Validation)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 0.1 | Input Validator | [0.1-input-validator.md](skills/layer-0/0.1-input-validator.md) |
| 0.2 | Arena Results Loader | [0.2-arena-results-loader.md](skills/layer-0/0.2-arena-results-loader.md) |
| 0.3 | Production Outputs Loader | [0.3-production-outputs-loader.md](skills/layer-0/0.3-production-outputs-loader.md) |
| 0.4 | CBF Loader | [0.4-cbf-loader.md](skills/layer-0/0.4-cbf-loader.md) |

> **Critical Constraints Reminder (Layer 1)**
> - Read S14-ANTI-DEGRADATION.md before executing
> - Arena selection verification is BLOCKING — any pre-Arena content = HALT
> - Virality score below threshold = revision required
> - All checks produce individual output files

### Layer 1: Verification (Quality Checks)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 1.1 | Arena Selection Verification | [1.1-arena-selection-verification.md](skills/layer-1/1.1-arena-selection-verification.md) |
| 1.2 | Content Inventory | [1.2-content-inventory.md](skills/layer-1/1.2-content-inventory.md) |
| 1.3 | Virality Score Check | [1.3-virality-score-check.md](skills/layer-1/1.3-virality-score-check.md) |
| 1.4 | Platform Compliance Check | [1.4-platform-compliance-check.md](skills/layer-1/1.4-platform-compliance-check.md) |
| 1.5 | Voice Consistency Check | [1.5-voice-consistency-check.md](skills/layer-1/1.5-voice-consistency-check.md) |
| 1.6 | Cross-Reference Validation | [1.6-cross-reference-validation.md](skills/layer-1/1.6-cross-reference-validation.md) |

> **Critical Constraints Reminder (Layer 4)**
> - Read S14-ANTI-DEGRADATION.md before executing
> - All Layer 1 verification must pass before assembly
> - Per-platform files are MANDATORY (one file per platform per content piece)
> - Execution log tracks all assembly decisions

### Layer 4: Output Packaging

| Microskill | Purpose | Document |
|------------|---------|----------|
| 4.1 | Content Package Assembler | [4.1-content-package-assembler.md](skills/layer-4/4.1-content-package-assembler.md) |
| 4.2 | Per-Platform File Creation | [4.2-per-platform-file-creation.md](skills/layer-4/4.2-per-platform-file-creation.md) |
| 4.3 | Execution Log | [4.3-execution-log.md](skills/layer-4/4.3-execution-log.md) |

---

## Execution Flow

```
                    INPUT: CBF + Production Outputs (S08-S13)
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 0: FOUNDATION (haiku)                           │
│   Input Validation → Arena Results → Production Outputs → CBF Loading     │
│                    GATE: LAYER_0_COMPLETE.yaml                           │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 1: VERIFICATION (sonnet)                        │
│                                                                           │
│   Arena Selection Verification (CRITICAL) → Content Inventory →           │
│   Virality Score Check → Platform Compliance → Voice Consistency →       │
│   Cross-Reference Validation                                             │
│                                                                           │
│                    GATE G08: Arena verified                              │
│                    GATE G09: Virality >= minimum                         │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 4: OUTPUT (sonnet)                              │
│   Content Package Assembly → Per-Platform File Creation → Execution Log  │
│                    OUTPUT: Content Package + Platform Files               │
└───────────────────────────────────┴───────────────────────────────────────┘
                                    │
                                    ▼
                    HANDOFF: S15-S18 Distribution (via Gate G10)
```

---

## Output Schema

```yaml
# CONTENT PACKAGE (Master File)
content_package:
  metadata:
    content_id: "[Unique identifier]"
    title: "[Content title]"
    platform: "[Primary platform]"
    content_type: "[Reel/carousel/thread/etc]"
    content_function: "[Awareness/Engagement/Conversion/Community]"
    pillar: "[From CAF]"
    campaign: "[Campaign name]"
    created_date: "[ISO 8601]"
    target_publish_date: "[Date]"
    target_publish_time: "[Time with timezone]"
    status: "[Draft/Ready/Scheduled/Published]"
    arena_selection_verified: true  # CRITICAL FLAG

  primary_content:
    script:  # For video content
      hook: |
      body: |
      cta: |
      word_count: [Number]

    caption:
      platform: "[Platform]"
      hook: |
      body: |
      cta: |
      hashtags: []
      character_count: [Number]

  visual_direction:
    thumbnail:
      concept: |
      composition: |
      text_elements: |
      technical_specs: |

    supporting_visuals: []

  quality_verification:
    virality_score:
      overall_score: [0-100]
      threshold_required: [Number from CBF]
      threshold_met: [Yes/No]
      dimension_breakdown:
        hook_strength: [0-10]
        emotional_resonance: [0-10]
        practical_value: [0-10]
        social_currency: [0-10]
        story_structure: [0-10]
        platform_fit: [0-10]
        specificity: [0-10]
        voice_alignment: [0-10]

    arena_verification:
      arena_complete: true
      arena_selection_used: true
      arena_checkpoint_path: "[Path to ARENA_COMPLETE checkpoint]"

    voice_check:
      bvf_aligned: [Yes/No]
      banned_words_present: [Yes/No]
      tone_appropriate: [Yes/No]

    anti_slop_check:
      slop_density: [Percentage]
      passed: [Yes/No]

    platform_compliance:
      specs_met: [Yes/No]
      length_appropriate: [Yes/No]
      format_correct: [Yes/No]

  distribution_plan:
    primary_platform:
      platform: "[Platform]"
      post_time: "[Time]"
      engagement_protocol: |

    secondary_platforms:
      - platform: "[Platform]"
        adaptation_notes: |
        post_time: "[Time]"

  production_requirements:
    filming: |
    editing: |
    design: |

  tracking:
    metrics_to_track: []
    success_criteria: |
```

---

## Validation Requirements (Gates G08, G09)

**Gate G08 (Arena Verification):**
- [ ] ARENA_COMPLETE checkpoint exists from S13
- [ ] arena_selection_verified flag = true
- [ ] Arena-selected content matches assembled content
- [ ] NO pre-Arena drafts used in assembly

**Gate G09 (Virality Threshold):**
- [ ] Virality Score >= minimum threshold from CBF
- [ ] Score below 60 → revision required
- [ ] Score below 40 → blocked from publication
- [ ] All dimensions scored

**Additional Validation:**
- [ ] Voice check passed (BVF aligned)
- [ ] Platform compliance verified
- [ ] Anti-slop check passed
- [ ] Per-platform files created

---

## Constraints

### NEVER Constraints
- NEVER proceed if Arena checkpoint missing
- NEVER use pre-Arena drafts (check arena_selection_verified flag)
- NEVER approve content with virality score below minimum
- NEVER skip voice consistency check
- NEVER skip platform compliance check
- NEVER create content package without all production inputs
- NEVER proceed if anti-slop density > 5%
- NEVER skip per-platform file creation

### MUST Constraints
- MUST verify arena_selection_verified = true
- MUST check ARENA_COMPLETE checkpoint from S13
- MUST score content using VSF
- MUST verify BVF alignment
- MUST check platform-specific requirements
- MUST create individual files per platform per content piece
- MUST log all assembly decisions with timestamps
- MUST flag content below virality threshold

### Assembly Constraints
- MUST verify all required components exist before assembly
- MUST cross-check Arena selections against assembled content
- MUST validate content matches CBF objectives
- MUST verify pillar and function assignments
- MUST ensure distribution plan is complete

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-04 | Initial decomposition from monolithic SKILL.md. Added critical Arena selection verification (learned from Skill 19 failure), virality score checking, per-platform file creation, voice consistency validation. NO Arena for S14 — assembly only. |
