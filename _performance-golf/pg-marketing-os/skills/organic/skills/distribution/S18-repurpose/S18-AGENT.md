# S18: Repurpose Multiplication — Master Agent

**Version:** 1.0
**Skill:** S18-repurpose-multiplication
**Position:** Distribution, Multiplication Layer
**Type:** Strategy + Production Coordination
**Dependencies:** S14 Content Assembly (original content)
**Output:** Repurpose Multiplication Plan (RMP)

---

## Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Input validation + upstream loading | haiku | Simple validation |
| 1 | Repurpose strategy + atomization | sonnet | Strategic planning, format mapping |
| 4 | RMP assembly + tracking | sonnet | Assembly from existing content |

---

## Purpose

Transform a single piece of content into maximum distribution value through platform-native repurposing. One piece becomes 10+ variants rebuilt for each platform. This is NOT cross-posting with minor edits — this is systematic content atomization and platform-native rebuilding.

**Success Criteria:**
- Minimum 10 variants identified
- Variants cover 3+ platforms
- Each variant has clear source element
- All variants are platform-native (rebuilt, not resized)
- Production timeline is realistic

---

## Identity Boundaries

**This skill IS:**
- Content atomization (breaking down into atomic units)
- Platform adaptation strategy (one format → many platforms)
- Repurpose planning and prioritization
- Production timeline coordination
- Variant tracking and scheduling coordination

**This skill is NOT:**
- The actual production of variants (that goes through S08-S14)
- Cross-posting without adaptation (violates Law 5)
- Just resizing or reformatting (must rebuild for platform)
- Publishing or distribution (that's S15-S17)

---

## Layer Map

> **Critical Constraints Reminder (Layer 0)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only
> - All upstream content must be loaded

### Layer 0: Foundation (Loading & Validation)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 0.1 | Input Validator | [0.1-input-validator.md](skills/layer-0/0.1-input-validator.md) |
| 0.2 | Upstream Loader | [0.2-upstream-loader.md](skills/layer-0/0.2-upstream-loader.md) |

> **Critical Constraints Reminder (Layer 1)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Minimum 10 variants required
> - Platform-native rebuilding mandatory

### Layer 1: Strategy (Repurpose Planning)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 1.1 | Content Atomization | [1.1-content-atomization.md](skills/layer-1/1.1-content-atomization.md) |
| 1.2 | Platform Adaptation Matrix | [1.2-platform-adaptation-matrix.md](skills/layer-1/1.2-platform-adaptation-matrix.md) |
| 1.3 | Variant Planning | [1.3-variant-planning.md](skills/layer-1/1.3-variant-planning.md) |
| 1.4 | Production Sequencing | [1.4-production-sequencing.md](skills/layer-1/1.4-production-sequencing.md) |

> **Critical Constraints Reminder (Layer 4)**
> - Read ANTI-DEGRADATION.md before executing
> - All variants must have production briefs
> - RMP schema must be complete

### Layer 4: Output Packaging

| Microskill | Purpose | Document |
|------------|---------|----------|
| 4.1 | RMP Assembler | [4.1-rmp-assembler.md](skills/layer-4/4.1-rmp-assembler.md) |
| 4.2 | Execution Log | [4.2-execution-log.md](skills/layer-4/4.2-execution-log.md) |

---

## Execution Flow

```
                    INPUT: Original Content (S14)
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 0: FOUNDATION (haiku)                           │
│   Input Validation → Upstream Loading (S14, S02, S03)                   │
│                    GATE: LAYER_0_COMPLETE.yaml                           │
└───────────────────────────────┬───────────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 1: STRATEGY (sonnet)                            │
│                                                                           │
│   Atomization → Platform Adaptation → Variant Planning → Sequencing      │
│                    GATE: LAYER_1_COMPLETE.yaml                           │
└───────────────────────────────┬───────────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 4: OUTPUT (sonnet)                              │
│   RMP Assembly → Validation → Execution Log                              │
│                    OUTPUT: RMP.yaml                                       │
└───────────────────────────────┴───────────────────────────────────────────┘
                                │
                                ▼
                    HANDOFF: Variants → S08-S14 (Production)
                             RMP → S15 (Scheduling)
```

---

## Output Schema

```yaml
# REPURPOSE MULTIPLICATION PLAN (RMP)
campaign_name:
original_content_id:
original_content_title:
original_platform:
date_created:
version: "1.0"

atomization:
  hooks:
    - text: string
      timestamp: string
      variant_potential: []
  key_insights:
    - insight: string
      timestamp: string
      variant_potential: []
  memorable_quotes:
    - quote: string
      variant_potential: []
  story_beats:
    - story: string
      timestamp: string
      variant_potential: []
  frameworks:
    - framework: string
      variant_potential: []
  data_points:
    - data: string
      variant_potential: []

variants:
  - variant_id: string
    variant_type: string
    source_element: string
    platform: string
    format: string
    length: string
    production_needs:
      editing: string
      new_recording: string
      design: string
    priority: string
    timeline: string
    status: string

production_queue:
  immediate:
    day_0: []
  short_term:
    day_1_to_3: []
  extended:
    day_3_plus: []

distribution:
  per_platform:
    instagram:
      variants: []
    tiktok:
      variants: []
    youtube:
      variants: []
    linkedin:
      variants: []
    x_twitter:
      variants: []

cross_reference:
  internal_linking: []
  content_callbacks: []

tracking:
  metrics_per_variant: []
  aggregate_metrics: {}
```

---

## Validation Requirements (Gate G10)

- [ ] Original content from S14 loaded and validated
- [ ] Content fully atomized (all unit types checked)
- [ ] Minimum 10 variants identified
- [ ] Variants cover 3+ platforms
- [ ] Each variant has clear source element
- [ ] Each variant has production needs defined
- [ ] Each variant is platform-native (not cross-posted)
- [ ] Production timeline is realistic
- [ ] Scheduling coordinates with S15

---

## Constraints

### Input Constraints
- NEVER proceed without S14 content package
- NEVER accept original content without content_id
- NEVER skip platform strategy reference (S02)

### Layer 1 Constraints
- NEVER accept fewer than 10 variants
- NEVER accept cross-posted content (same content, minor tweaks)
- NEVER accept variants without source element mapping
- NEVER skip platform adaptation requirements
- NEVER accept variants covering fewer than 3 platforms

### Output Constraints
- NEVER output RMP without atomization complete
- NEVER output variants without production needs defined
- NEVER output without production timeline
- NEVER output without tracking structure

---

## CRITICAL: Platform-Native Rebuilding

**Law 5: Platform-Native or Nothing**

Content must be **rebuilt** for each platform, not resized.

**FORBIDDEN:**
- Cross-posting with minor edits
- Same caption, multiple platforms
- Resizing video without content adaptation
- TikTok watermarks on Instagram

**REQUIRED:**
- Hook rewritten for platform algorithm
- Pacing adjusted for platform norms
- Format rebuilt for platform specs
- Native text styling per platform

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-05 | Initial decomposition from monolithic SKILL.md |
