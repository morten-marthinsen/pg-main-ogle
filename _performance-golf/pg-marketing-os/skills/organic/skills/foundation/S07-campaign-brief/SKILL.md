---
name: organic-campaign-brief
description: >-
  Synthesize all organic foundation work into a single actionable campaign brief.
  Use after all foundation skills (S01-S06) are complete and you need to produce
  the master document that unlocks all production skills. Produces the Campaign
  Brief File (CBF) — the master key that gates S08-S14 production skills.
  Consolidates audience intelligence, platform strategy, brand voice, content
  architecture, hook library, and virality scoring into one executable brief.
  Trigger when users mention campaign brief, content brief, production brief,
  or are ready to move from strategy to content production. Requires all
  foundation outputs: AIF, PSF, BVF, CAF, HLF, and VSF.
---

# S07: CAMPAIGN BRIEF
## Synthesize All Foundation Into Actionable Brief
## Gate: G06 (Requires S06 VSF) | Output: CBF (Campaign Brief File)

---

## PURPOSE

This skill synthesizes ALL foundation work (S01-S06) into a single, actionable Campaign Brief. The CBF is THE MASTER KEY that unlocks all production skills.

**Output:** Campaign Brief File (CBF)
**Unlocks:** ALL Production Skills (S08-S14) via Gate G07

## ANTI-DEGRADATION

- Read `S07-CAMPAIGN-BRIEF-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `skills/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## REQUIRED CONTEXT

### Prerequisite Files (All Required)
- S01 Output: `outputs/[campaign]-AIF.yaml` (Audience Intelligence)
- S02 Output: `outputs/[campaign]-PSF.yaml` (Platform Strategy)
- S03 Output: `outputs/[campaign]-BVF.yaml` (Brand Voice)
- S04 Output: `outputs/[campaign]-CAF.yaml` (Content Architecture)
- S05 Output: `outputs/[campaign]-HLF.yaml` (Hook Library)
- S06 Output: `outputs/[campaign]-VSF.yaml` (Virality Scoring)

### Teachings to Load
- All teachings referenced by prior skills

---

## INPUT REQUIREMENTS

All prior foundation outputs, plus:

```yaml
campaign_parameters:
  campaign_name: [Descriptive name]
  duration: [Campaign length]
  launch_date: [Start date]

objectives:
  business_objective: [What business outcome]
  content_objective: [What content outcome]
  primary_metric: [How we measure success]
  secondary_metrics: [Supporting measures]

constraints:
  budget: [Production resources]
  time_per_piece: [How long to produce each]
  team_capacity: [Who's executing]
  approval_process: [How content gets approved]
```

---

## PROCESS

### Phase 1: Foundation Synthesis Review

Pull key insights from each foundation output:

```yaml
foundation_synthesis:
  from_AIF:
    target_segment_summary: [2-3 sentence description]
    key_audience_insight: [The most important finding]
    language_to_use: [Key phrases from language mining]
    primary_pain: [The pain we'll address]
    primary_desire: [The desire we'll promise]

  from_PSF:
    primary_platform: [Where we focus]
    secondary_platforms: [Supporting platforms]
    format_focus: [Primary formats]
    posting_cadence: [Frequency]
    cross_platform_strategy: [How content moves]

  from_BVF:
    voice_summary: [Key voice attributes]
    tone_for_campaign: [Campaign-specific tone]
    vocabulary_guidelines: [Words to use/avoid]
    energy_level: [For this campaign]

  from_CAF:
    pillar_focus: [Which pillar(s) for this campaign]
    series_involved: [Any recurring series]
    content_function_mix: [% awareness/engagement/conversion]
    funnel_connection: [How content connects to revenue]

  from_HLF:
    primary_hook_types: [Hook categories to use]
    platform_specific_hooks: [Hooks for primary platform]
    approved_hooks: [Specific hooks pre-approved]

  from_VSF:
    minimum_score: [Quality threshold]
    dimension_priorities: [Which dimensions to maximize]
    calibration_insights: [What we learned from specimens]
```

### Phase 2: Objective Crystallization

Make objectives specific and measurable:

```yaml
objective:
  primary_goal: |
    [Specific, measurable outcome]
    Example: "Grow Instagram from 12K to 50K followers in 90 days while maintaining 5%+ engagement rate"

  success_metrics:
    - metric: [Name]
      current: [Baseline]
      target: [Goal]
      measurement: [How we track]
    - metric: [Name]
      current: [Baseline]
      target: [Goal]
      measurement: [How we track]

  timeline:
    start_date: [Date]
    end_date: [Date]
    milestones:
      - date: [Date]
        target: [What should be true]
```

### Phase 3: Content Planning

Define exactly what content will be created:

```yaml
content_plan:
  pillar_focus:
    - pillar: [Name]
      percentage: [% of content]
      content_types: [Formats used]

  content_calendar:
    week_1:
      - day: Monday
        content_type: [Type]
        pillar: [Which pillar]
        hook_type: [From HLF]
        function: [Awareness/Engagement/Conversion/Community]
      # Continue for each day
    # Continue for each week
    # Minimum 30 days

  hero_content:
    - title: [Working title]
      format: [Type]
      platform: [Where]
      production_date: [When]
      publish_date: [When]

  recurring_content:
    - series_name: [Name]
      frequency: [Cadence]
      format: [Type]
```

### Phase 4: Platform Execution Plan

Specific to each platform:

```yaml
platform_plan:
  primary_platform:
    name: [Platform]
    posting_frequency: [Per day/week]
    optimal_times: [From AIF]
    formats: [List]
    length_targets: [Specifics]
    hashtag_strategy: [Approach]
    engagement_protocol: [First-hour strategy]

  secondary_platforms:
    - name: [Platform]
      posting_frequency: [Cadence]
      adaptation_from_primary: [How content adapts]
      unique_content: [% original vs adapted]
```

### Phase 5: Voice & Hook Strategy

Specific guidance for content creation:

```yaml
voice_summary:
  tone_for_campaign: [Specific tone direction]
  key_phrases_to_use: [From language mining]
  phrases_to_avoid: [From BVF anti-voice]
  energy_direction: [High/medium/low]
  personality_notes: [Campaign-specific personality]

hook_strategy:
  primary_hook_types: [3-5 types to use]
  specific_hooks_approved:
    - hook: [Exact text]
      for_content_type: [Where to use]
    - hook: [Exact text]
      for_content_type: [Where to use]
  hook_testing_plan: [How we'll A/B test hooks]
```

### Phase 6: Quality & Distribution

Set the bar and plan the push:

```yaml
virality_targets:
  minimum_score: 60  # Hard floor
  target_score: 75   # Aim here
  breakout_threshold: 85  # Push hard on these

  dimension_priorities:
    1: [Most important dimension]
    2: [Second priority]
    3: [Third priority]

  hero_content_target: 80+

distribution_strategy:
  cross_platform_sequence: [How content moves]
  amplification_tactics:
    - tactic: [Description]
      trigger: [When to deploy]
  engagement_protocol: [First hour after posting]
  repurpose_plan: [How 1 piece becomes many]
```

---

## OUTPUT: CAMPAIGN BRIEF FILE (CBF)

Complete CBF Template:

```yaml
# CAMPAIGN BRIEF FILE (CBF)
# THE MASTER KEY - UNLOCKS ALL PRODUCTION
# Campaign: [Name]
# Created: [Date]
# Version: 1.0

campaign_name:
date_created:
owner: "Marcus Bell"
version: "1.0"

## OBJECTIVE
objective:
  primary_goal: |
    [Specific, measurable goal]
  success_metrics:
    - metric:
      current:
      target:
    - metric:
      current:
      target:
  timeline:
    start_date:
    end_date:
    milestones: []

## AUDIENCE
audience_summary:
  target_segment: |
    [2-3 sentence description]
  key_insight: |
    [Most important finding from AIF]
  language_to_use: []
  primary_pain:
  primary_desire:

## PLATFORM
platform_plan:
  primary_platform:
  formats: []
  posting_cadence:
  optimal_times: []
  secondary_platforms: []

## VOICE
voice_summary:
  tone_for_campaign:
  key_phrases: []
  phrases_to_avoid: []
  energy_level:

## CONTENT
content_plan:
  pillar_focus: []
  content_calendar: {}
  hero_content: []
  recurring_content: []
  content_function_mix:
    awareness:
    engagement:
    conversion:
    community:

## HOOKS
hook_strategy:
  primary_hook_types: []
  specific_hooks_approved: []
  hook_testing_plan:

## QUALITY
virality_targets:
  minimum_score: 60
  target_score: 75
  dimension_priorities: []

## DISTRIBUTION
distribution_strategy:
  cross_platform_sequence:
  amplification_tactics: []
  engagement_protocol:
  repurpose_plan:

## APPROVAL
approval_chain:
  content_approval:
  final_approval:

## SOURCE FILES
source_files:
  AIF: "skills/foundation/S01-audience-intelligence/outputs/[name]-AIF.yaml"
  PSF: "skills/foundation/S02-platform-strategy/outputs/[name]-PSF.yaml"
  BVF: "skills/foundation/S03-brand-voice/outputs/[name]-BVF.yaml"
  CAF: "skills/foundation/S04-content-architecture/outputs/[name]-CAF.yaml"
  HLF: "skills/foundation/S05-hook-library/outputs/[name]-HLF.yaml"
  VSF: "skills/foundation/S06-virality-scoring/outputs/[name]-VSF.yaml"
```

---

## VALIDATION REQUIREMENTS

CBF must have these fields populated to pass Gate G07:

**Required Fields:**
- [ ] campaign_name (not empty)
- [ ] objective.primary_goal (contains measurable metric)
- [ ] objective.success_metrics (≥2)
- [ ] audience_summary.target_segment (not empty)
- [ ] platform_plan.primary_platform (valid platform)
- [ ] platform_plan.formats (≥2)
- [ ] platform_plan.posting_cadence (defined)
- [ ] voice_summary.tone_for_campaign (not empty)
- [ ] content_plan.pillar_focus (≥1)
- [ ] content_plan.content_calendar (≥30 days planned)
- [ ] hook_strategy.primary_hook_types (≥3)
- [ ] virality_targets.minimum_score (≥60)

**Chain Validation:**
- [ ] AIF file exists and validates
- [ ] PSF file exists and validates
- [ ] BVF file exists and validates
- [ ] CAF file exists and validates
- [ ] HLF file exists and validates
- [ ] VSF file exists and validates

---

## OUTPUT LOCATION

Save CBF to:
```
skills/foundation/S07-campaign-brief/outputs/[campaign-name]-CBF.yaml
```

---

## WHAT THIS UNLOCKS

With CBF complete, Gate G07 opens. All production skills (S08-S14) are now available:
- S08: Script Writing
- S09: Caption Writing
- S10: Carousel Design
- S11: Thread Writing
- S12: Visual Direction
- S13: Arena Generation
- S14: Content Assembly

**The strategy phase is complete. Content creation begins.**

---

*The Campaign Brief is the strategy in action form. Without it, no content is created.*
