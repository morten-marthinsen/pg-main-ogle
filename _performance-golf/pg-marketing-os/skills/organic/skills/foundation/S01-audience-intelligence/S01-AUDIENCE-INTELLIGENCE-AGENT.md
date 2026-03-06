# S01: Audience Intelligence — Master Agent

**Version:** 1.0
**Skill:** S01-audience-intelligence
**Position:** Foundation, Entry Point
**Type:** Research + Analysis
**Dependencies:** None (Entry Point)
**Output:** AIF (Audience Intelligence File)

---

## Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Input validation + teaching loading | haiku | Simple validation |
| 1 | Deep audience research + analysis | opus | Pattern recognition across sources |
| 4 | AIF assembly + validation | sonnet | Assembly from existing content |

---

## Purpose

Produce a comprehensive understanding of WHO we're creating content for. Without this, all content is guesswork. This skill establishes the demographic, psychographic, behavioral, and linguistic foundation that every downstream skill depends on.

**Success Criteria:**
- AIF populated with minimum 8 required fields
- Language mining includes 3+ pain expressions
- Competitor analysis includes 3+ accounts
- Pain/desire mapping includes 3+ surface pains and desires
- All sections substantive (not placeholder data)

---

## Identity Boundaries

**This skill IS:**
- Demographic baseline establishment
- Psychographic depth analysis
- Platform behavior mapping
- Language mining from audience sources
- Competitor audience analysis
- Pain/desire mapping

**This skill is NOT:**
- Platform selection (that's S02)
- Voice architecture (that's S03)
- Content strategy (that's S04)
- Actual content creation (that's S08-S13)

---

## Layer Map

> **Critical Constraints Reminder (Layer 0)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only
> - All teaching files must be loaded

### Layer 0: Foundation (Loading & Validation)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 0.1 | Input Validator | [0.1-input-validator.md](skills/layer-0/0.1-input-validator.md) |
| 0.2 | Teaching Loader | [0.2-teaching-loader.md](skills/layer-0/0.2-teaching-loader.md) |
| 0.3 | Specimen Loader | [0.3-specimen-loader.md](skills/layer-0/0.3-specimen-loader.md) |

> **Critical Constraints Reminder (Layer 1)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Minimum thresholds apply to all sections

### Layer 1: Analysis (Main Research)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 1.1 | Demographic Foundation | [1.1-demographic-foundation.md](skills/layer-1/1.1-demographic-foundation.md) |
| 1.2 | Psychographic Depth | [1.2-psychographic-depth.md](skills/layer-1/1.2-psychographic-depth.md) |
| 1.3 | Platform Behavior Analysis | [1.3-platform-behavior-analysis.md](skills/layer-1/1.3-platform-behavior-analysis.md) |
| 1.4 | Language Mining | [1.4-language-mining.md](skills/layer-1/1.4-language-mining.md) |
| 1.5 | Competitor Audience Analysis | [1.5-competitor-audience-analysis.md](skills/layer-1/1.5-competitor-audience-analysis.md) |
| 1.6 | Pain/Desire Mapping | [1.6-pain-desire-mapping.md](skills/layer-1/1.6-pain-desire-mapping.md) |

> **Critical Constraints Reminder (Layer 4)**
> - Read ANTI-DEGRADATION.md before executing
> - All 8 validation requirements must pass
> - AIF schema must be complete

### Layer 4: Output Packaging

| Microskill | Purpose | Document |
|------------|---------|----------|
| 4.1 | Output Assembler | [4.1-output-assembler.md](skills/layer-4/4.1-output-assembler.md) |
| 4.2 | Execution Log | [4.2-execution-log.md](skills/layer-4/4.2-execution-log.md) |

---

## Execution Flow

```
                    INPUT: Brand Info + Competitive Context
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 0: FOUNDATION (haiku)                           │
│   Input Validation → Teaching Loading → Specimen Loading                 │
│                    GATE: LAYER_0_COMPLETE.yaml                           │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 1: ANALYSIS (opus)                              │
│                                                                           │
│   Demographics → Psychographics → Platform Behavior → Language Mining     │
│   → Competitor Analysis → Pain/Desire Mapping                            │
│                    GATE: LAYER_1_COMPLETE.yaml                           │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 4: OUTPUT (sonnet)                              │
│   AIF Assembly → Validation → Execution Log                              │
│                    OUTPUT: AIF.yaml                                       │
└───────────────────────────────────┴───────────────────────────────────────┘
                                    │
                                    ▼
                    HANDOFF: S02 Platform Strategy (via Gate G01)
```

---

## Output Schema

```yaml
# AUDIENCE INTELLIGENCE FILE (AIF)
campaign_name:
brand_name:
date_created:
version: "1.0"

demographics:
  age_range: {}
  gender_split: {}
  location: {}
  income_level: {}
  professional_context: {}

psychographics:
  values: {}
  interests: {}
  lifestyle: {}
  worldview: {}

platform_behavior:
  primary_platforms: []
  consumption_patterns: {}
  engagement_patterns: {}
  best_times_active: {}

language_mining:
  words_they_use: []
  phrases_they_use: []
  slang_and_jargon: []
  pain_expressions: {}
  desire_expressions: {}

competitors_they_follow:
  accounts: []
  why_they_follow:
  gaps_to_exploit: {}

pain_mapping:
  surface_pains: []
  deeper_pains: []
  root_pains: []

desire_mapping:
  stated_desires: []
  unstated_desires: []
  identity_desires: []

key_insights:
  primary_insight:
  secondary_insights: []
  content_implications: []
```

---

## Validation Requirements (Gate G01)

- [ ] demographics.age_range.primary
- [ ] demographics.location.primary_markets (≥1)
- [ ] platform_behavior.primary_platforms (≥2)
- [ ] platform_behavior.best_times_active
- [ ] language_mining.pain_expressions.how_they_describe_problems (≥3)
- [ ] competitors_they_follow.accounts (≥3)
- [ ] pain_mapping.surface_pains (≥3)
- [ ] desire_mapping.stated_desires (≥3)

---

## Constraints

### Input Constraints
- NEVER proceed without brand_info.name
- NEVER proceed without brand_info.category
- NEVER accept empty competitive_context

### Layer 1 Constraints
- NEVER fabricate demographic data without evidence
- NEVER skip language mining — minimum 3 pain expressions required
- NEVER skip competitor analysis — minimum 3 accounts required
- NEVER accept pain mapping with fewer than 3 surface pains
- NEVER accept desire mapping with fewer than 3 stated desires

### Output Constraints
- NEVER output AIF without all 8 validation requirements passing
- NEVER output with placeholder data in required fields
- NEVER output without key_insights section populated

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-04 | Initial decomposition from monolithic SKILL.md |
