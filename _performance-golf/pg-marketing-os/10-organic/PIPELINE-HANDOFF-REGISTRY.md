# ~system/pipeline-handoff-registry.md — INTER-SKILL DATA CONTRACTS
## How Data Flows Between Skills
## Version 1.0 — March 2026

---

## PURPOSE

This registry defines the EXACT data contracts between skills. When Skill A outputs something that Skill B needs, this registry specifies:
- What fields are required
- What format they must be in
- What validation happens at handoff

**Why This Matters:**
- Prevents broken pipelines
- Ensures complete data transfer
- Enables parallel skill development
- Creates clear debugging paths

---

## DATA FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        PHASE 1: FOUNDATION                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   S01:AIF ────────┬──────────────────────────────────────────────────┐  │
│     │             │                                                   │  │
│     ▼             ▼                                                   │  │
│   S02:PSF ────────┬──────────────────────────────────────────────┐   │  │
│     │             │                                               │   │  │
│     ▼             ▼                                               ▼   ▼  │
│   S03:BVF ────────┬──────────────────────────────────────────► S07:CBF  │
│     │             │                                               ▲      │
│     ▼             ▼                                               │      │
│   S04:CAF ────────┬───────────────────────────────────────────────┤      │
│     │             │                                               │      │
│     ▼             ▼                                               │      │
│   S05:HLF ────────┬───────────────────────────────────────────────┤      │
│     │             │                                               │      │
│     ▼             ▼                                               │      │
│   S06:VSF ────────────────────────────────────────────────────────┘      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                              [GATE: CBF Required]
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        PHASE 2: PRODUCTION                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   CBF ──────► S08:Scripts ──────► S13:Arena ──────► S14:Assembly        │
│   CBF ──────► S09:Captions ─────► S13:Arena ──────► S14:Assembly        │
│   CBF ──────► S10:Carousels ────► S13:Arena ──────► S14:Assembly        │
│   CBF ──────► S11:Threads ──────► S13:Arena ──────► S14:Assembly        │
│   CBF ──────► S12:Visuals ──────────────────────────► S14:Assembly      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        PHASE 3: DISTRIBUTION                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   S14:Assembly ──► S15:Schedule ──► S16:Engage ──► S17:Amplify          │
│                                                                          │
│   S14:Assembly ──► S18:Repurpose ──► [Back to S08-S11 for variants]     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        PHASE 4: ANALYSIS                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   [Performance Data] ──► S19:Analysis ──► S20:Learning ──► learning-log/ │
│                                                                          │
│   learning-log/ ──────────────────────────► [Feeds back to teachings]    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## HANDOFF CONTRACTS

### S01 → S02: AIF to Platform Strategy

**Required Fields from AIF:**
```yaml
required_fields:
  - demographics.age_range
  - demographics.location
  - platform_behavior.primary_platforms
  - platform_behavior.consumption_patterns
  - platform_behavior.best_times_active
  - competitors_they_follow.accounts

validation:
  primary_platforms: "Must have at least 2 platforms listed"
  best_times_active: "Must include timezone"

handoff_check: |
  Before S02 executes, verify:
  ✓ AIF file exists in core-message/S01-audience-intelligence/outputs/
  ✓ All required_fields are populated
  ✓ Validation rules pass
```

### S02 → S03: PSF to Brand Voice

**Required Fields from PSF:**
```yaml
required_fields:
  - platform_priority.primary
  - platform_priority.secondary
  - per_platform_strategy.[platform].format_focus

validation:
  primary: "Must have exactly 1 primary platform"
  format_focus: "Must have at least 2 formats per platform"

handoff_check: |
  Before S03 executes, verify:
  ✓ PSF file exists in core-message/S02-platform-strategy/outputs/
  ✓ All required_fields are populated
  ✓ Validation rules pass
```

### S03 → S04: BVF to Content Architecture

**Required Fields from BVF:**
```yaml
required_fields:
  - voice_attributes.primary
  - vocabulary.power_words
  - vocabulary.banned_words
  - tone_spectrum.by_platform
  - energy_levels

validation:
  power_words: "Must have at least 10 words"
  banned_words: "Must have at least 5 words"
  by_platform: "Must cover all platforms from PSF"

handoff_check: |
  Before S04 executes, verify:
  ✓ BVF file exists in core-message/S03-brand-voice/outputs/
  ✓ All required_fields are populated
  ✓ Validation rules pass
  ✓ Platform coverage matches PSF
```

### S04 → S05: CAF to Hook Library

**Required Fields from CAF:**
```yaml
required_fields:
  - content_pillars (at least 3)
  - recurring_series (at least 2)
  - content_by_function.awareness
  - content_by_function.engagement

validation:
  content_pillars: "Must have percentage_of_content summing to 100%"
  recurring_series: "Must have format and platform specified"

handoff_check: |
  Before S05 executes, verify:
  ✓ CAF file exists in core-message/S04-content-architecture/outputs/
  ✓ All required_fields are populated
  ✓ Validation rules pass
```

### S05 → S06: HLF to Virality Scoring

**Required Fields from HLF:**
```yaml
required_fields:
  - hooks_by_type (at least 5 types)
  - hooks_by_platform (cover all PSF platforms)
  - hooks_by_content_pillar (cover all CAF pillars)

validation:
  hooks_by_type: "Each type must have at least 3 hooks"
  hooks_by_platform: "Each platform must have at least 5 hooks"

handoff_check: |
  Before S06 executes, verify:
  ✓ HLF file exists in core-message/S05-hook-library/outputs/
  ✓ All required_fields are populated
  ✓ Validation rules pass
```

### S06 → S07: VSF to Campaign Brief

**Required Fields from VSF:**
```yaml
required_fields:
  - dimension_definitions (all 5 dimensions)
  - score_thresholds
  - calibration_specimens (at least 5)

validation:
  dimension_definitions: "Each must have scoring_guide 1-10"
  score_thresholds: "Must cover full 0-100 range"

handoff_check: |
  Before S07 executes, verify:
  ✓ VSF file exists in core-message/S06-virality-scoring/outputs/
  ✓ All required_fields are populated
  ✓ All prior files (AIF, PSF, BVF, CAF, HLF) exist
  ✓ Validation rules pass
```

### S07 → S08-S14: CBF to Production Skills

**Required Fields from CBF (THE MASTER KEY):**
```yaml
required_fields:
  - campaign_name
  - objective.primary_goal
  - objective.success_metrics
  - audience_summary.target_segment
  - platform_plan.primary_platform
  - platform_plan.formats
  - platform_plan.posting_cadence
  - voice_summary.tone_for_this_campaign
  - content_plan.pillar_focus
  - content_plan.content_pieces
  - hook_strategy.primary_hook_types
  - virality_targets.minimum_score

validation:
  success_metrics: "Must be measurable (include numbers)"
  content_pieces: "Must have at least 30 days planned"
  minimum_score: "Must be 60 or higher"

handoff_check: |
  Before ANY production skill (S08-S14) executes, verify:
  ✓ CBF file exists in core-message/S07-campaign-brief/outputs/
  ✓ All required_fields are populated
  ✓ Validation rules pass
  ✓ All source files (AIF, PSF, BVF, CAF, HLF, VSF) exist
```

---

## CROSS-PHASE HANDOFFS

### S14 → S15-S18: Content Assembly to Distribution

**Required Fields from S14 Output:**
```yaml
required_fields:
  - content_id
  - platform
  - format
  - final_content (text/script)
  - visual_specs
  - virality_score
  - arena_synthesis_notes
  - recommended_post_time
  - hashtags
  - cta

validation:
  virality_score: "Must be >= minimum_score from CBF"
  final_content: "Must pass anti-slop check"
  arena_selection_verified: true  # CRITICAL: Prevents Skill 19-style failure (consuming pre-Arena drafts)
```

### S19 → S20: Performance Analysis to Learning Capture

**Required Fields from S19 Output:**
```yaml
required_fields:
  - content_id
  - predicted_performance (virality score)
  - actual_performance (metrics)
  - variance_analysis
  - hypothesis_for_variance
  - recommended_adjustments

validation:
  variance_analysis: "Must explain gap between predicted and actual"
```

### S20 → learning-log/: Learning Capture Output

**Required Fields:**
```yaml
required_fields:
  - learning_id
  - date_captured
  - source_campaign
  - learning_type: [teaching_update|specimen_addition|skill_refinement|gate_adjustment]
  - learning_content
  - impact_assessment: [high|medium|low]
  - action_required: [true|false]
  - action_description

storage:
  path: "learning-log/[learning_type]/[date]-[learning_id].yaml"
```

---

## VALIDATION FAILURES

When a handoff validation fails:

1. **Log the failure:**
   ```yaml
   failure_log:
     skill_from: [S0X]
     skill_to: [S0Y]
     missing_fields: [list]
     failed_validations: [list]
     timestamp: [datetime]
   ```

2. **Block the dependent skill:**
   Do NOT proceed with the dependent skill.

3. **Surface to user:**
   ```
   HANDOFF FAILURE: S0X → S0Y
   Missing: [fields]
   Invalid: [fields]

   Action Required: Complete S0X output before proceeding.
   ```

4. **Offer remediation:**
   - Re-run S0X with focus on missing/invalid fields
   - Manual field population if data exists elsewhere

---

## PARALLEL EXECUTION RULES

Skills that CAN run in parallel (no handoff dependencies between them):
- S08, S09, S10, S11 (all depend on CBF, not each other)

Skills that MUST run sequentially:
- S01 → S02 → S03 → S04 → S05 → S06 → S07

Skills that can run in parallel AFTER S14:
- S15, S16, S17, S18 (all depend on S14 output, not each other)

---

*Clean handoffs make clean outputs. No broken pipelines. No missing data.*
