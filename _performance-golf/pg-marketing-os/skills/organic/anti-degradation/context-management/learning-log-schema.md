# LEARNING LOG SCHEMA — CAPTURING AND STRUCTURING INSIGHTS
## How Learnings Are Recorded and Integrated
## Version 1.0 — March 2026

---

## PURPOSE

The Organic Marketing Engine learns from every campaign. This file defines exactly how learnings are captured, structured, tagged, prioritized, and integrated back into the system.

**The Principle:**
- Every piece of content generates data
- Data becomes insight through analysis
- Insight becomes improvement through integration
- The engine gets smarter with every cycle

**Learning Types:**
- Hook insights (what stops scrolls)
- Format insights (what structures work)
- Timing insights (when content performs)
- Audience insights (who responds to what)
- Failure modes (what breaks and why)

---

## LEARNING TYPES

### Type 1: HOOK INSIGHTS

Learnings about what makes hooks effective.

```yaml
hook_insight:
  insight_id: HI-[YYYYMMDD]-[XXX]
  learning_type: hook_insight

  discovery:
    campaign: [campaign name]
    content_id: [content identifier]
    platform: [platform]
    date_discovered: [ISO 8601]

  hook_data:
    hook_text: |
      [The exact hook that performed]
    hook_category: [from hook taxonomy]
    hook_pattern: [formula/structure used]

  performance:
    views: [number]
    completion_rate: [percentage]
    engagement_rate: [percentage]
    save_rate: [percentage]
    share_rate: [percentage]
    benchmark_comparison: [above/at/below average]

  insight:
    what_worked: |
      [Why this hook performed - specific observation]
    pattern_identified: |
      [Generalizable pattern that can be reused]
    audience_response: |
      [How audience reacted - qualitative]

  application:
    reusable_formula: |
      [Hook formula derived from this success]
    use_cases:
      - [when to use this type]
      - [when to use this type]
    contraindications:
      - [when NOT to use this type]

  confidence_level: [HIGH/MEDIUM/LOW]
  verification_status: [single_instance/multiple_confirmed/statistically_significant]
```

---

### Type 2: FORMAT INSIGHTS

Learnings about content formats and structures.

```yaml
format_insight:
  insight_id: FI-[YYYYMMDD]-[XXX]
  learning_type: format_insight

  discovery:
    campaign: [campaign name]
    content_ids: [list of content pieces]
    platform: [platform]
    date_discovered: [ISO 8601]

  format_data:
    format_type: [video/carousel/thread/post/etc.]
    structure: |
      [Description of the structure that worked]
    length: [duration or word count]
    elements_included:
      - [element 1]
      - [element 2]

  performance:
    average_engagement: [percentage]
    average_reach: [number]
    average_saves: [number]
    compared_to_other_formats: [X% better/worse]

  insight:
    why_it_worked: |
      [Analysis of why this format performed]
    key_elements: |
      [Which elements drove performance]
    audience_behavior: |
      [How audience consumed this format]

  application:
    recommended_for:
      - [content type]
      - [topic type]
      - [audience state]
    structure_template: |
      [Reusable structure/template]
    best_practices:
      - [practice 1]
      - [practice 2]

  confidence_level: [HIGH/MEDIUM/LOW]
  sample_size: [number of pieces analyzed]
```

---

### Type 3: TIMING INSIGHTS

Learnings about when content performs best.

```yaml
timing_insight:
  insight_id: TI-[YYYYMMDD]-[XXX]
  learning_type: timing_insight

  discovery:
    campaign: [campaign name]
    content_analyzed: [number of pieces]
    platform: [platform]
    date_discovered: [ISO 8601]
    analysis_period: [date range]

  timing_data:
    best_days:
      - day: [day of week]
        performance_index: [relative performance]
      - day: [day of week]
        performance_index: [relative performance]
    best_times:
      - time: [HH:MM timezone]
        performance_index: [relative performance]
      - time: [HH:MM timezone]
        performance_index: [relative performance]
    worst_times:
      - time: [HH:MM timezone]
        performance_index: [relative performance]

  performance:
    best_vs_worst_difference: [X% difference]
    consistency: [how consistent is this pattern]
    seasonal_factors: [any seasonal observations]

  insight:
    pattern_explanation: |
      [Why these times work - audience behavior hypothesis]
    audience_activity: |
      [When target audience is most active]
    competition_factor: |
      [How timing relates to competition]

  application:
    recommended_schedule:
      - day: [day]
        time: [time]
        content_type: [what to post]
    avoid_times:
      - [time to avoid and why]
    exceptions:
      - [when to break the pattern]

  confidence_level: [HIGH/MEDIUM/LOW]
  data_points: [number of posts analyzed]
```

---

### Type 4: AUDIENCE INSIGHTS

Learnings about audience behavior and preferences.

```yaml
audience_insight:
  insight_id: AI-[YYYYMMDD]-[XXX]
  learning_type: audience_insight

  discovery:
    campaign: [campaign name]
    platform: [platform]
    date_discovered: [ISO 8601]
    source: [analytics/comments/surveys/behavior]

  audience_data:
    segment_identified: |
      [Description of audience segment]
    segment_size: [estimated size or percentage]
    demographics:
      - [relevant demographic]
    psychographics:
      - [relevant psychographic]
    behaviors:
      - [observed behavior]
      - [observed behavior]

  engagement_patterns:
    responds_to:
      - [content type]
      - [topic]
      - [tone]
    ignores:
      - [content type]
      - [topic]
    engagement_style: |
      [How they engage - comments, shares, saves, etc.]

  insight:
    key_discovery: |
      [The core insight about this audience]
    motivation: |
      [What drives their engagement]
    pain_points_confirmed:
      - [pain point validated]
    desires_confirmed:
      - [desire validated]

  application:
    content_recommendations:
      - [recommendation 1]
      - [recommendation 2]
    topics_to_prioritize:
      - [topic]
    tone_adjustments: |
      [How to adjust voice for this segment]
    targeting_refinements: |
      [How to better reach this segment]

  confidence_level: [HIGH/MEDIUM/LOW]
  evidence_strength: [anecdotal/pattern/confirmed]
```

---

### Type 5: FAILURE MODES

Learnings from what didn't work.

```yaml
failure_mode:
  insight_id: FM-[YYYYMMDD]-[XXX]
  learning_type: failure_mode

  discovery:
    campaign: [campaign name]
    content_id: [content identifier]
    platform: [platform]
    date_discovered: [ISO 8601]
    failure_detected_by: [analytics/mc_check/arena/manual]

  failure_data:
    what_failed: |
      [Description of the failure]
    content_type: [format]
    expected_performance: [what was expected]
    actual_performance: [what happened]
    gap: [X% below expectation]

  analysis:
    root_cause: |
      [Why this failed - honest assessment]
    contributing_factors:
      - [factor 1]
      - [factor 2]
    warning_signs_missed:
      - [sign we should have caught]
    similar_past_failures:
      - [reference to pattern]

  prevention:
    what_to_avoid: |
      [Specific thing to avoid in future]
    early_warning_signs:
      - [sign to watch for]
    checkpoint_to_add: |
      [If relevant, new check to add to MC-CHECK]
    system_improvement: |
      [Change to make to prevent recurrence]

  lessons:
    key_takeaway: |
      [The core lesson from this failure]
    reframe: |
      [How to think about this going forward]

  severity: [MINOR/MODERATE/MAJOR/CRITICAL]
  recurrence_risk: [HIGH/MEDIUM/LOW]
```

---

## TAGGING SYSTEM

### Primary Tags

Every learning receives primary tags for categorization:

```yaml
tags:
  learning_type: [hook_insight/format_insight/timing_insight/audience_insight/failure_mode]
  platform: [tiktok/instagram/youtube/linkedin/twitter/multi-platform]
  content_format: [video/carousel/thread/post/story/reel/short]
  pillar: [pillar from CAF if applicable]
  campaign: [campaign name]
  phase: [foundation/production/distribution/analysis]
```

### Secondary Tags

Additional tags for filtering and retrieval:

```yaml
secondary_tags:
  topic: [specific topic if applicable]
  hook_type: [curiosity/controversy/result/story/etc.]
  audience_segment: [segment if applicable]
  emotion: [primary emotion involved]
  performance_tier: [top_10_percent/above_average/average/below_average/bottom_10_percent]
  confidence: [high/medium/low]
  status: [active/superseded/invalidated]
```

### Tag Examples

```yaml
# Example 1: High-performing hook insight
tags:
  learning_type: hook_insight
  platform: tiktok
  content_format: video
  pillar: AI_education
  campaign: bellringer_q1_2026
  phase: analysis
secondary_tags:
  topic: AI_tools
  hook_type: result
  performance_tier: top_10_percent
  confidence: high
  status: active

# Example 2: Failure mode learning
tags:
  learning_type: failure_mode
  platform: linkedin
  content_format: carousel
  pillar: business_strategy
  campaign: thought_leadership
  phase: analysis
secondary_tags:
  topic: productivity
  performance_tier: bottom_10_percent
  confidence: high
  status: active
```

---

## PRIORITY SCORING

### Priority Calculation

Each learning receives a priority score (1-100) based on:

```yaml
priority_scoring:
  base_score: 50  # Starting point

  modifiers:
    # Impact modifiers
    performance_impact:
      top_10_percent: +30
      above_average: +15
      average: 0
      below_average: -10
      bottom_10_percent: +20  # Failures are valuable too

    # Confidence modifiers
    confidence:
      high: +15
      medium: 0
      low: -15

    # Recency modifiers
    recency:
      last_7_days: +10
      last_30_days: +5
      last_90_days: 0
      older: -10

    # Applicability modifiers
    applicability:
      universal: +15  # Applies across campaigns
      campaign_specific: 0
      one_off: -10

    # Verification modifiers
    verification:
      statistically_significant: +15
      multiple_confirmed: +10
      single_instance: -5

priority_tiers:
  CRITICAL: 85-100  # Must integrate immediately
  HIGH: 70-84       # Integrate in next cycle
  MEDIUM: 50-69     # Queue for integration
  LOW: 30-49        # Archive for reference
  MINIMAL: 0-29     # May discard or archive
```

### Priority Score Example

```yaml
# High-performing hook insight
base_score: 50
modifiers_applied:
  - performance_impact: +30 (top 10%)
  - confidence: +15 (high)
  - recency: +10 (last 7 days)
  - applicability: +15 (universal pattern)
  - verification: +10 (multiple confirmed)
final_priority: 130 → capped at 100

priority_tier: CRITICAL
action: Integrate into HLF immediately
```

---

## INTEGRATION TRIGGERS

### When Learnings Update the System

```yaml
integration_triggers:
  # Automatic integration
  automatic:
    - trigger: Priority score ≥ 85 (CRITICAL)
      action: Flag for immediate review and integration
      target: Relevant foundation file (HLF, PSF, BVF, etc.)

    - trigger: Failure mode with severity MAJOR or CRITICAL
      action: Add to banned patterns or checkpoint questions
      target: anti-slop/banned-phrases.md or mc-check/checkpoint-questions.md

    - trigger: Hook insight with top_10_percent performance
      action: Add to Hook Library as proven hook
      target: HLF proven_hooks section

  # Scheduled integration
  scheduled:
    - frequency: weekly
      action: Review all HIGH priority learnings
      process: Batch integration into foundation files

    - frequency: monthly
      action: Pattern analysis across all learnings
      process: System improvement recommendations

    - frequency: quarterly
      action: Full learning audit
      process: Archive superseded, update teachings

  # Threshold-based integration
  threshold:
    - condition: 3+ learnings confirm same pattern
      action: Elevate to teaching principle
      target: Relevant teaching file

    - condition: 3+ failure modes show same root cause
      action: Add structural prevention
      target: Gate definitions or checkpoint system
```

### Integration Process

```
INTEGRATION WORKFLOW

1. LEARNING IDENTIFIED
   └── Captured with full schema
   └── Tagged appropriately
   └── Priority scored

2. TRIAGE
   └── CRITICAL → Immediate review queue
   └── HIGH → Next cycle queue
   └── MEDIUM → Scheduled review
   └── LOW → Archive

3. INTEGRATION REVIEW
   └── Verify learning accuracy
   └── Identify target file(s) for update
   └── Draft integration change

4. INTEGRATION EXECUTION
   └── Update target file
   └── Document change source
   └── Link learning to update

5. VERIFICATION
   └── Confirm integration complete
   └── Mark learning as "integrated"
   └── Monitor for impact
```

---

## LEARNING LOG FILE STRUCTURE

### Storage Location

```
OrganicMarketingEngine/
└── learning-log/
    ├── session-continuity/      # Handoff documents
    ├── system-learnings/        # General system learnings
    │   ├── hooks/               # Hook insights
    │   ├── formats/             # Format insights
    │   ├── timing/              # Timing insights
    │   ├── audience/            # Audience insights
    │   └── failures/            # Failure modes
    └── campaign-learnings/      # Campaign-specific learnings
        ├── [campaign-name]/
        │   ├── hooks/
        │   ├── formats/
        │   ├── timing/
        │   ├── audience/
        │   └── failures/
        └── [campaign-name]/
```

### File Naming Convention

```
[learning-type]-[YYYYMMDD]-[XXX]-[brief-description].yaml

Examples:
hook-insight-20260315-001-curiosity-gap-performance.yaml
format-insight-20260318-002-carousel-structure.yaml
failure-mode-20260320-001-weak-cta-linkedin.yaml
timing-insight-20260325-003-weekend-performance.yaml
audience-insight-20260328-001-beginner-segment.yaml
```

---

## LEARNING CAPTURE PROTOCOL

### When to Capture Learnings

```
CAPTURE TRIGGERS:

After S19 Performance Analysis:
└── All significant performance patterns
└── Top and bottom performers
└── Audience behavior observations

After S20 Learning Capture:
└── Formalized insights from analysis
└── System improvement recommendations
└── Pattern validations

During Production:
└── Arena insights (what won and why)
└── MC-CHECK failures (what triggered revision)
└── Unexpected outcomes

Real-time Observations:
└── Comment sentiment patterns
└── Viral moments
└── Engagement anomalies
```

### Capture Checklist

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    LEARNING CAPTURE CHECKLIST                            ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  IDENTIFICATION                                                          ║
║  □ Learning type identified                                              ║
║  □ Unique insight ID assigned                                            ║
║  □ Campaign and content linked                                           ║
║                                                                          ║
║  DATA                                                                    ║
║  □ Relevant metrics captured                                             ║
║  □ Context documented                                                    ║
║  □ Comparison to benchmarks included                                     ║
║                                                                          ║
║  ANALYSIS                                                                ║
║  □ Root cause or success factor identified                               ║
║  □ Pattern articulated (not just observation)                            ║
║  □ Confidence level assessed                                             ║
║                                                                          ║
║  APPLICATION                                                             ║
║  □ Actionable recommendation included                                    ║
║  □ Use cases defined                                                     ║
║  □ Integration target identified                                         ║
║                                                                          ║
║  METADATA                                                                ║
║  □ Tags applied                                                          ║
║  □ Priority scored                                                       ║
║  □ Verification status noted                                             ║
║                                                                          ║
║  STORAGE                                                                 ║
║  □ Saved to correct folder                                               ║
║  □ File named correctly                                                  ║
║  □ Linked from campaign folder if applicable                             ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## LEARNING RETRIEVAL

### Querying the Learning Log

When creating new content or updating system files, query learnings:

```
RETRIEVAL PROTOCOL

1. IDENTIFY what you're working on:
   - Platform?
   - Content format?
   - Pillar/topic?
   - Hook type?

2. QUERY relevant learnings:
   - Filter by platform tag
   - Filter by content format
   - Filter by confidence (HIGH preferred)
   - Sort by priority score

3. APPLY insights:
   - Hook insights → Hook selection
   - Format insights → Structure decisions
   - Timing insights → Scheduling
   - Audience insights → Angle selection
   - Failure modes → What to avoid

4. DOCUMENT application:
   - Note which learnings informed the work
   - Enable tracking of learning impact
```

### Quick Reference Query

```yaml
# Example: Creating a TikTok video about AI tools

query:
  learning_type: [hook_insight, format_insight]
  platform: tiktok
  content_format: video
  topic: AI_tools
  confidence: high
  status: active

sort_by: priority_score desc
limit: 10

# Returns top 10 relevant learnings to inform content creation
```

---

## LEARNING LIFECYCLE

### Status Progression

```
NEW → ACTIVE → [INTEGRATED/SUPERSEDED/INVALIDATED]

NEW: Just captured, not yet reviewed
ACTIVE: Reviewed, valuable, in use
INTEGRATED: Applied to system files
SUPERSEDED: Replaced by newer learning
INVALIDATED: Proven incorrect or no longer applicable
```

### Archival Protocol

```yaml
archival_rules:
  # Keep forever
  retain:
    - All CRITICAL priority learnings
    - All integrated learnings (with integration reference)
    - All failure modes (valuable historical reference)

  # Archive after 1 year
  archive:
    - LOW priority learnings without integration
    - Platform-specific learnings when platform deprecated
    - Campaign-specific learnings after campaign ends

  # Mark superseded
  supersede:
    - When newer learning contradicts with higher confidence
    - When platform algorithm changes invalidate insight
    - When audience shifts make insight irrelevant
```

---

## LEARNING LOG REPORTS

### Weekly Summary Report

```yaml
weekly_learning_summary:
  period: [date range]

  new_learnings:
    total: [count]
    by_type:
      hook_insights: [count]
      format_insights: [count]
      timing_insights: [count]
      audience_insights: [count]
      failure_modes: [count]

  critical_learnings:
    - insight_id: [ID]
      summary: [brief]
      priority_action: [what needs to happen]

  integration_completed:
    - learning_id: [ID]
      integrated_into: [file]
      change_summary: [brief]

  patterns_emerging:
    - [pattern description and relevant learning IDs]

  recommendations:
    - [recommendation for system improvement]
```

### Monthly Pattern Report

```yaml
monthly_pattern_report:
  period: [month]

  strongest_patterns:
    - pattern: [description]
      supporting_learnings: [count]
      confidence: [high/medium]
      recommendation: [action]

  emerging_trends:
    - trend: [description]
      evidence: [learning IDs]
      monitoring_recommendation: [what to watch]

  system_health:
    learning_capture_rate: [count per week]
    integration_rate: [percentage of critical learnings integrated]
    pattern_validation_rate: [percentage of patterns confirmed]

  improvement_priorities:
    1. [priority improvement]
    2. [priority improvement]
    3. [priority improvement]
```

---

*Learnings compound. Capture them ruthlessly. Integrate them systematically. The engine evolves.*
