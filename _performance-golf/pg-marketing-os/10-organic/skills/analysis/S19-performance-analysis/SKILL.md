---
name: performance-analysis
description: >-
  Systematic post-mortem analysis of organic content performance. Use after
  content has been published and performance data is available. Answers three
  critical questions: What worked? What did not? Why? Transforms raw platform
  metrics into actionable intelligence. Produces calibrated performance
  assessments identifying patterns, outliers, and causal factors that explain
  content success or failure. Compares predicted virality scores (S06) against
  actual performance for calibration. Trigger when users mention content
  analytics, performance review, post-mortem, what worked, content metrics,
  or analyzing results. Requires distribution data from S15-S18.
---

# S19: Performance Analysis

## SKILL IDENTITY

**Skill ID:** S19-performance-analysis
**Name:** Performance Analysis
**Version:** 1.0.0
**Category:** Analysis
**Position in Pipeline:** Post-Distribution → Performance Analysis → Learning Capture (S20)

**Purpose:**
Systematic post-mortem analysis of content performance. Answers three critical questions: What worked? What didn't? Why? Transforms raw metrics into actionable intelligence that improves future content decisions.

**Core Function:**
Convert platform analytics into calibrated performance assessments, identifying patterns, outliers, and causal factors that explain content success or failure.

**Integration Points:**
- **Upstream:** Receives distribution data from S17-scheduling, S18-cross-posting
- **Downstream:** Feeds insights to S20-learning-capture for system-level improvements
- **Lateral:** References S05-virality-scoring for prediction calibration

## ANTI-DEGRADATION

- Read `S19-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `~system/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## PREREQUISITES

### Gate Requirements

**Data Prerequisites:**
- [ ] Content has been live for minimum analysis window (platform-specific)
- [ ] Platform analytics API access or manual data export available
- [ ] Original Virality Score prediction on file
- [ ] Content metadata (hook used, format, posting time, platform)

**Minimum Analysis Windows by Platform:**
| Platform | Minimum Window | Full Analysis Window |
|----------|----------------|---------------------|
| TikTok | 48 hours | 7 days |
| Instagram Reels | 48 hours | 14 days |
| Instagram Feed | 24 hours | 7 days |
| YouTube Shorts | 72 hours | 14 days |
| YouTube Long-form | 7 days | 28 days |
| LinkedIn | 24 hours | 7 days |
| Twitter/X | 12 hours | 48 hours |
| Facebook | 24 hours | 7 days |
| Threads | 24 hours | 72 hours |

**Tool Prerequisites:**
- Access to platform native analytics
- Performance tracking spreadsheet or database
- Historical performance baseline data (minimum 30 posts for statistical validity)

---

## INPUT REQUIREMENTS

### Required Data Structure

```yaml
performance_analysis_input:
  content_reference:
    content_id: string          # Unique identifier
    original_file: string       # Path to original content
    distribution_log: string    # Path to distribution record

  content_metadata:
    format_type: string         # reel, carousel, thread, long-form, etc.
    primary_hook: string        # Hook used in content
    hook_category: string       # curiosity, controversy, authority, etc.
    content_pillar: string      # Which content pillar it serves
    call_to_action: string      # Primary CTA used
    posting_datetime: datetime  # Exact posting time
    platform: string            # Platform analyzed

  prediction_data:
    virality_score: float       # Original S05 prediction (0-100)
    predicted_range: string     # low/medium/high/viral
    confidence_level: float     # Prediction confidence
    key_prediction_factors: list # Why this score was given

  raw_metrics:
    views: integer
    likes: integer
    comments: integer
    shares: integer
    saves: integer
    follows_gained: integer     # New followers from this content
    watch_time_average: float   # Seconds (video content)
    completion_rate: float      # Percentage who watched to end
    click_through_rate: float   # For content with links
    reach: integer              # Unique accounts reached
    impressions: integer        # Total times shown
    profile_visits: integer     # Profile visits from content

  contextual_factors:
    day_of_week: string
    time_of_day: string         # morning/afternoon/evening/night
    competing_content: string   # Major events that day
    promotion_used: boolean     # Any paid boost
    collab_partner: string      # If collaboration content
```

### Baseline Data Requirements

To perform valid analysis, maintain rolling baselines:

```yaml
baseline_data:
  account_averages:
    followers_at_time: integer
    avg_views_30d: float
    avg_engagement_rate_30d: float
    avg_saves_30d: float
    avg_shares_30d: float
    avg_follows_per_post_30d: float

  format_averages:
    by_format_type:
      reel:
        avg_views: float
        avg_engagement: float
        sample_size: integer
      carousel:
        avg_views: float
        avg_engagement: float
        sample_size: integer
      # etc.

  hook_averages:
    by_hook_category:
      curiosity:
        avg_views: float
        avg_engagement: float
        sample_size: integer
      # etc.

  time_averages:
    by_posting_hour:
      "09:00":
        avg_views: float
        sample_size: integer
      # etc.
```

---

## PROCESS

### Phase 1: Metric Collection and Normalization

**Step 1.1: Gather Raw Metrics**
Pull all available metrics from platform analytics. Use native tools or API access.

**Step 1.2: Normalize for Account Size**
Calculate normalized metrics to enable cross-content comparison:

```
Normalized View Rate = Views / Followers × 100
Engagement Rate = (Likes + Comments + Shares + Saves) / Views × 100
Save Rate = Saves / Views × 100
Share Rate = Shares / Views × 100
Follow Conversion = New Follows / Views × 100
```

**Step 1.3: Calculate Performance Indices**
Compare against baselines to generate performance indices:

```
View Performance Index = Actual Views / Baseline Average Views
Engagement Index = Actual Engagement Rate / Baseline Engagement Rate
Virality Index = (Shares + Saves) / (Likes + Comments)
```

### Phase 2: Virality Score Calibration

**Step 2.1: Compare Prediction to Reality**
```yaml
calibration_check:
  predicted_score: [original S05 score]
  predicted_range: [low/medium/high/viral]

  actual_performance:
    view_percentile: [where this landed vs. last 30 posts]
    engagement_percentile: [same]
    virality_signals: [shares, saves relative to baseline]

  calibration_result:
    prediction_accuracy: [accurate/over-predicted/under-predicted]
    deviation_magnitude: [slight/moderate/severe]
    deviation_direction: [positive/negative]
```

**Step 2.2: Identify Calibration Factors**
When prediction missed reality, identify why:

| Prediction Miss | Possible Factors |
|-----------------|------------------|
| Over-predicted (content underperformed) | Hook didn't land, execution gap, timing bad, audience mismatch |
| Under-predicted (content overperformed) | Algorithm favor, trend alignment, unexpected resonance, external amplification |

### Phase 3: Hook Performance Analysis

**Step 3.1: Hook Effectiveness Scoring**

```yaml
hook_analysis:
  hook_used: "[exact hook text]"
  hook_category: "[curiosity/controversy/authority/social-proof/etc.]"

  scroll_stop_metrics:
    3_second_retention: float     # % who stayed past 3 seconds
    avg_watch_time: float         # seconds
    completion_rate: float        # % who finished

  hook_effectiveness_score: float  # 0-100 based on retention curve

  comparison_to_category:
    category_average: float
    this_hook_performance: "[above/at/below] average"
    percentile_rank: integer      # Where this hook ranks in category

  hook_verdict:
    worked: boolean
    why: string                   # Analysis of why it worked/didn't
    iteration_potential: string   # How to improve
```

**Step 3.2: Hook Pattern Recognition**

Track patterns across hook categories:
- Which hook types consistently outperform?
- Which hook types have high variance (hit or miss)?
- Are certain hooks better for certain content pillars?

### Phase 4: Content Type Performance Tracking

**Step 4.1: Format Performance Matrix**

```yaml
format_analysis:
  format_used: "[reel/carousel/thread/02-long-form-vsl/etc.]"

  format_metrics:
    views_vs_format_baseline: float    # Index (1.0 = average)
    engagement_vs_format_baseline: float
    saves_vs_format_baseline: float

  format_verdict:
    performance_level: "[exceptional/above-average/average/below-average/poor]"
    format_fatigue_check: boolean      # Is this format declining?

  format_recommendations:
    continue_format: boolean
    modify_approach: string            # Specific modifications
    frequency_adjustment: string       # Post more/less of this format
```

**Step 4.2: Format Trend Analysis**

Look at format performance over time:
- Is a format gaining or losing effectiveness?
- Format saturation signals
- Optimal format mix recommendations

### Phase 5: Posting Time Analysis

**Step 5.1: Time Performance Scoring**

```yaml
time_analysis:
  posted_at:
    datetime: datetime
    day_of_week: string
    time_slot: string    # morning/afternoon/evening/night

  time_performance:
    views_vs_time_baseline: float
    engagement_vs_time_baseline: float

  optimal_time_comparison:
    was_optimal_slot: boolean
    optimal_slot_for_this_content: string
    estimated_performance_if_optimal: float  # Projected improvement

  time_verdict:
    timing_impact: "[positive/neutral/negative]"
    time_recommendation: string
```

**Step 5.2: Time Pattern Updates**

Maintain rolling optimal time windows:
- Best performing hours (last 30 days)
- Best performing days
- Platform-specific timing patterns
- Content-type-specific timing patterns

### Phase 6: Audience Growth Attribution

**Step 6.1: Follow Conversion Analysis**

```yaml
growth_attribution:
  follows_gained: integer
  follow_rate: float           # Follows / Views

  follow_quality_signals:
    profile_visits: integer
    profile_visit_to_follow: float

  attribution_factors:
    content_quality: float     # % attributed to content itself
    hook_draw: float           # % attributed to hook
    cta_effectiveness: float   # % attributed to CTA
    profile_optimization: float # % attributed to profile

  growth_verdict:
    high_growth_content: boolean  # Above baseline follow rate
    growth_driver: string         # Primary factor
    replication_potential: string # How to replicate
```

**Step 6.2: Audience Quality Assessment**

Beyond quantity, assess quality of new follows:
- Engagement rate of new followers on subsequent content
- Unfollow rate in following 7 days
- Ideal customer profile (ICP) alignment signals

### Phase 7: A/B Test Analysis (When Applicable)

**Step 7.1: Test Result Framework**

```yaml
ab_test_analysis:
  test_type: "[hook/thumbnail/format/time/cta/caption]"

  variant_a:
    description: string
    views: integer
    engagement_rate: float
    primary_metric: float

  variant_b:
    description: string
    views: integer
    engagement_rate: float
    primary_metric: float

  statistical_analysis:
    sample_sufficient: boolean    # Minimum 1000 views per variant
    confidence_level: float       # Statistical confidence
    winner: string                # "A" or "B" or "no_significant_difference"
    lift: float                   # % improvement of winner

  test_verdict:
    conclusive: boolean
    winning_approach: string
    implementation_recommendation: string
    follow_up_test: string        # Next test to run
```

**Step 7.2: Test Validity Checks**

Before declaring a winner:
- [ ] Both variants had similar external conditions
- [ ] Sample size sufficient for statistical significance
- [ ] No confounding variables (time of day, platform changes)
- [ ] Results consistent with theoretical expectations

### Phase 8: Performance Dashboard Generation

**Step 8.1: Single Content Dashboard**

Generate a performance summary for individual content:

```yaml
content_performance_dashboard:
  content_id: string
  analysis_date: date
  analysis_window: string

  headline_metrics:
    views: integer
    view_index: float          # vs baseline
    engagement_rate: float
    engagement_index: float    # vs baseline
    virality_score_actual: float

  performance_grade: string    # A/B/C/D/F

  key_insights:
    - insight_1: string
    - insight_2: string
    - insight_3: string

  actionable_recommendations:
    - recommendation_1: string
    - recommendation_2: string

  learning_tags:
    - tag_1: string           # For S20 learning capture
    - tag_2: string
```

**Step 8.2: Aggregate Dashboard (Weekly/Monthly)**

```yaml
aggregate_performance_dashboard:
  period: string              # "Week of [date]" or "Month of [month]"
  total_posts: integer

  overall_metrics:
    total_views: integer
    total_engagement: integer
    total_new_follows: integer
    avg_engagement_rate: float
    best_performer: string    # Content ID
    worst_performer: string   # Content ID

  trend_analysis:
    views_trend: string       # "up X%" or "down X%"
    engagement_trend: string
    growth_trend: string

  format_breakdown:
    reels:
      count: integer
      avg_performance_index: float
    carousels:
      count: integer
      avg_performance_index: float
    # etc.

  hook_breakdown:
    best_performing_hook_category: string
    worst_performing_hook_category: string

  recommendations:
    double_down: list         # What to do more of
    reduce: list              # What to do less of
    experiment: list          # What to test
```

---

## OUTPUT SPECIFICATION

### Primary Output: Performance Analysis Report

```yaml
performance_analysis_report:
  metadata:
    report_id: string
    generated_at: datetime
    content_analyzed: string
    analysis_type: "[single_content/weekly/monthly]"

  executive_summary:
    one_line: string          # Single sentence verdict
    performance_grade: string # A/B/C/D/F
    key_number: string        # Most important metric highlight

  detailed_analysis:
    metrics_breakdown:
      views:
        actual: integer
        vs_baseline: float
        percentile: integer
      engagement:
        actual: float
        vs_baseline: float
        percentile: integer
      saves:
        actual: integer
        vs_baseline: float
        percentile: integer
      shares:
        actual: integer
        vs_baseline: float
        percentile: integer
      follows:
        actual: integer
        vs_baseline: float
        percentile: integer

    virality_calibration:
      predicted: float
      actual_equivalent: float
      calibration_status: string
      calibration_notes: string

    hook_analysis:
      hook_used: string
      effectiveness_score: float
      comparison_to_category: string

    format_analysis:
      format_used: string
      format_performance: string
      format_recommendations: string

    timing_analysis:
      posted_at: datetime
      timing_impact: string
      optimal_alternative: string

    growth_analysis:
      follows_gained: integer
      follow_rate: float
      growth_driver: string

  insights:
    what_worked:
      - factor_1: string
      - factor_2: string
    what_didnt_work:
      - factor_1: string
      - factor_2: string
    why:
      - explanation_1: string
      - explanation_2: string

  recommendations:
    immediate_actions:
      - action_1: string
      - action_2: string
    system_updates:
      - update_1: string      # Flags for S20 learning capture

  learning_capture_flags:
    promote_to_specimen: boolean
    update_hook_data: boolean
    update_timing_data: boolean
    update_format_data: boolean
    calibration_adjustment_needed: boolean
```

### Secondary Output: Performance Metrics Log

Append to rolling performance log:

```yaml
performance_log_entry:
  date: date
  content_id: string
  platform: string
  format: string
  hook_category: string
  posting_time: datetime

  metrics:
    views: integer
    likes: integer
    comments: integer
    shares: integer
    saves: integer
    follows: integer

  indices:
    view_index: float
    engagement_index: float
    growth_index: float

  virality:
    predicted: float
    actual_equivalent: float
    calibration: string

  grade: string

  tags:
    - tag_1: string
    - tag_2: string
```

### Tertiary Output: Alert Notifications

When thresholds are crossed:

```yaml
performance_alert:
  alert_type: "[exceptional_performance/concerning_decline/anomaly]"
  severity: "[low/medium/high/critical]"

  trigger:
    metric: string
    threshold: float
    actual: float

  content_reference: string

  recommended_action: string

  auto_escalate_to_learning: boolean
```

---

## QUALITY GATES

### Anti-Degradation Checks

**Gate 1: Data Completeness**
- [ ] All required metrics collected
- [ ] No placeholder or estimated values without flagging
- [ ] Analysis window minimum met
- [ ] Baseline data available for comparison

**Gate 2: Analysis Validity**
- [ ] Statistical validity for any claims made
- [ ] No single-post conclusions about system patterns
- [ ] Confounding variables acknowledged
- [ ] Uncertainty quantified where applicable

**Gate 3: Calibration Integrity**
- [ ] Prediction vs. reality comparison completed
- [ ] Calibration factors identified
- [ ] Calibration direction and magnitude logged
- [ ] System update flags set appropriately

**Gate 4: Actionability**
- [ ] Every insight paired with a recommendation
- [ ] Recommendations are specific and executable
- [ ] No vague "do better" conclusions
- [ ] Learning capture flags set for S20

**Gate 5: Consistency**
- [ ] Same methodology applied across all content
- [ ] Grading criteria consistent with previous reports
- [ ] Index calculations use current baselines
- [ ] No cherry-picking metrics

---

## ALERT THRESHOLDS

### When to Pay Attention

**Positive Alerts (Exceptional Performance):**
| Metric | Threshold | Action |
|--------|-----------|--------|
| View Index | > 3.0 | Flag for specimen review |
| Engagement Rate | > 2x baseline | Deep dive analysis |
| Follow Rate | > 2x baseline | Replicate analysis |
| Share Rate | > 3x baseline | Virality pattern study |
| Saves | > 4x baseline | Value pattern study |

**Negative Alerts (Concerning Decline):**
| Metric | Threshold | Action |
|--------|-----------|--------|
| View Index | < 0.3 | Investigate suppression |
| Engagement Rate | < 0.5x baseline | Format/hook review |
| 3 consecutive below baseline | All formats | System audit |
| Follow Rate | Negative (unfollows) | Content audit |
| Completion Rate | < 25% | Hook/opening review |

**Anomaly Alerts:**
| Signal | Description | Action |
|--------|-------------|--------|
| High variance | Same content type, wildly different results | Variable isolation |
| Platform change | Sudden baseline shift | Algorithm update check |
| Prediction miss > 50% | Major calibration error | S05 review |
| Time sensitivity | Same content, 10x difference by time | Time optimization priority |

---

## TEMPLATES

### Template 1: Single Content Performance Report

```markdown
# Performance Report: [Content ID]

**Analysis Date:** [Date]
**Platform:** [Platform]
**Content Type:** [Format]
**Posted:** [Datetime]
**Analysis Window:** [X hours/days]

---

## Executive Summary

**Performance Grade: [A/B/C/D/F]**

[One-sentence verdict on content performance]

**Key Metric:** [Most impressive or concerning number]

---

## Metrics Dashboard

| Metric | Actual | Baseline | Index | Percentile |
|--------|--------|----------|-------|------------|
| Views | [X] | [X] | [X] | [X]th |
| Engagement Rate | [X]% | [X]% | [X] | [X]th |
| Saves | [X] | [X] | [X] | [X]th |
| Shares | [X] | [X] | [X] | [X]th |
| New Follows | [X] | [X] | [X] | [X]th |

---

## Virality Score Calibration

- **Predicted Score:** [X]/100 ([range])
- **Actual Performance Equivalent:** [X]/100
- **Calibration Status:** [Accurate / Over-predicted / Under-predicted]
- **Deviation:** [X]%

**Calibration Notes:**
[Why prediction matched or missed reality]

---

## Hook Analysis

**Hook Used:** "[Exact hook text]"
**Hook Category:** [Category]

- **3-Second Retention:** [X]%
- **Completion Rate:** [X]%
- **Hook Effectiveness Score:** [X]/100
- **vs. Category Average:** [Above/At/Below] ([X]%)

**Verdict:** [Did the hook work? Why or why not?]

---

## Format Analysis

**Format:** [Format type]

- **Format Performance Index:** [X]
- **vs. Format Baseline:** [Above/At/Below] average
- **Format Trend:** [Improving/Stable/Declining]

**Verdict:** [Format assessment and recommendations]

---

## Timing Analysis

**Posted:** [Day, Time]
**Time Slot:** [Morning/Afternoon/Evening/Night]

- **vs. Time Slot Baseline:** [X]
- **Optimal Slot for This Content:** [Time]
- **Estimated Improvement if Optimal:** [X]%

**Verdict:** [Timing assessment]

---

## Growth Analysis

- **New Follows:** [X]
- **Follow Rate:** [X]%
- **Profile Visits:** [X]
- **Visit-to-Follow Rate:** [X]%

**Primary Growth Driver:** [What drove follows]

---

## Key Insights

### What Worked
1. [Factor 1]
2. [Factor 2]

### What Didn't Work
1. [Factor 1]
2. [Factor 2]

### Why
[Causal analysis of performance]

---

## Recommendations

### Immediate Actions
1. [Action 1]
2. [Action 2]

### System Updates
- [ ] [Flag for learning capture]

---

## Learning Capture Flags

- [ ] Promote to Specimen: [Yes/No]
- [ ] Update Hook Data: [Yes/No]
- [ ] Update Timing Data: [Yes/No]
- [ ] Update Format Data: [Yes/No]
- [ ] Calibration Adjustment: [Yes/No]

---

*Report generated by S19-performance-analysis*
```

### Template 2: Weekly Performance Aggregate

```markdown
# Weekly Performance Report

**Period:** Week of [Start Date] to [End Date]
**Total Posts Analyzed:** [X]
**Platforms:** [List]

---

## Executive Summary

**Overall Grade: [A/B/C/D/F]**

[One paragraph summary of the week's performance]

---

## Headline Numbers

| Metric | This Week | Last Week | Change |
|--------|-----------|-----------|--------|
| Total Views | [X] | [X] | [+/-X%] |
| Total Engagement | [X] | [X] | [+/-X%] |
| Avg Engagement Rate | [X]% | [X]% | [+/-X%] |
| New Followers | [X] | [X] | [+/-X%] |

---

## Best & Worst Performers

**Top Performer:**
- Content: [ID]
- Views: [X] ([X]x baseline)
- Key Success Factor: [What made it work]

**Worst Performer:**
- Content: [ID]
- Views: [X] ([X]x baseline)
- Key Failure Factor: [What went wrong]

---

## Format Breakdown

| Format | Posts | Avg Views | Avg Engagement | Index |
|--------|-------|-----------|----------------|-------|
| Reels | [X] | [X] | [X]% | [X] |
| Carousels | [X] | [X] | [X]% | [X] |
| [etc.] | | | | |

**Format Insight:** [What format data tells us]

---

## Hook Performance

**Best Performing Hook Category:** [Category] ([X] index)
**Worst Performing Hook Category:** [Category] ([X] index)

**Hook Insight:** [What hook data tells us]

---

## Timing Insights

**Best Performing Days:** [Days]
**Best Performing Times:** [Times]

**Timing Insight:** [What timing data tells us]

---

## Virality Calibration Summary

- **Predictions Made:** [X]
- **Accurate Predictions:** [X] ([X]%)
- **Over-Predicted:** [X]
- **Under-Predicted:** [X]

**Calibration Insight:** [System accuracy assessment]

---

## Trends

**Positive Trends:**
1. [Trend 1]
2. [Trend 2]

**Concerning Trends:**
1. [Trend 1]
2. [Trend 2]

---

## Recommendations

### Double Down On
1. [What to do more of]
2. [What to do more of]

### Reduce
1. [What to do less of]

### Experiment With
1. [What to test next week]

---

## Learning Capture Flags

- [ ] [X] posts flagged for specimen review
- [ ] Hook category [X] needs data update
- [ ] Timing data needs recalibration
- [ ] Format [X] showing fatigue signals

---

*Report generated by S19-performance-analysis*
```

### Template 3: A/B Test Results Report

```markdown
# A/B Test Results

**Test ID:** [ID]
**Test Type:** [Hook/Thumbnail/Format/Time/CTA/Caption]
**Test Period:** [Start] to [End]
**Platform:** [Platform]

---

## Test Design

**Hypothesis:** [What we expected to happen]

**Variant A:** [Description]
**Variant B:** [Description]

**Primary Metric:** [What we're measuring]
**Secondary Metrics:** [Additional measures]

---

## Results

| Metric | Variant A | Variant B | Difference |
|--------|-----------|-----------|------------|
| Sample Size | [X] | [X] | |
| Primary Metric | [X] | [X] | [+/-X%] |
| Secondary 1 | [X] | [X] | [+/-X%] |
| Secondary 2 | [X] | [X] | [+/-X%] |

---

## Statistical Analysis

- **Sample Sufficient:** [Yes/No]
- **Confidence Level:** [X]%
- **Statistical Significance:** [Yes/No]

---

## Verdict

**Winner:** [A / B / No Significant Difference]
**Lift:** [X]%
**Confidence:** [High/Medium/Low]

---

## Interpretation

[Why we think the winner won]

---

## Validity Check

- [ ] Both variants had similar external conditions
- [ ] Sample size sufficient
- [ ] No confounding variables
- [ ] Results align with theory

**Validity Status:** [Valid/Questionable/Invalid]

---

## Implementation

**Recommendation:** [What to do based on results]

**Follow-Up Test:** [Next test to run]

---

*Report generated by S19-performance-analysis*
```

---

## EXAMPLES

### Example 1: High-Performing Reel Analysis

```yaml
content_analyzed:
  content_id: "REEL-2026-03-15-001"
  platform: "Instagram"
  format: "Reel"
  hook: "The AI tool nobody's talking about that replaced 4 hours of my day"
  posted_at: "2026-03-15T10:30:00"

metrics:
  views: 142000
  likes: 8500
  comments: 423
  shares: 2100
  saves: 4200
  follows: 312

baseline_comparison:
  avg_views: 35000
  view_index: 4.06
  avg_engagement_rate: 3.2%
  actual_engagement_rate: 10.7%
  engagement_index: 3.34

virality_calibration:
  predicted_score: 72
  predicted_range: "high"
  actual_equivalent: 89
  calibration: "Under-predicted by 17 points"
  calibration_reason: "Hook resonated stronger than pattern suggested. 'Nobody's talking about' trigger outperformed historical average by 3x."

hook_analysis:
  hook_category: "exclusivity"
  3_second_retention: 78%
  completion_rate: 42%
  hook_effectiveness: 91
  vs_category_average: "+34%"
  verdict: "Hook crushed. The specificity ('4 hours') and exclusivity ('nobody's talking about') combination is powerful."

format_analysis:
  format: "talking_head_reel"
  format_index: 2.8
  format_trend: "strong"
  verdict: "Format working well. This specific style (direct camera, quick cuts) outperforming other reel formats."

timing_analysis:
  posted: "Tuesday 10:30 AM"
  time_index: 1.4
  verdict: "Good timing choice. Tuesday morning hitting professional audience."

growth_analysis:
  follows: 312
  follow_rate: 0.22%
  vs_baseline: 3.1x
  growth_driver: "Value density in content + strong hook = high follow intent"

performance_grade: "A+"

recommendations:
  - "Replicate hook formula: [Exclusivity signal] + [Specific benefit] + [Curiosity gap]"
  - "This format/hook combination is specimen-worthy"
  - "Test this hook pattern across other content pillars"

learning_capture_flags:
  promote_to_specimen: true
  update_hook_data: true
  calibration_adjustment: true
```

### Example 2: Underperforming Carousel Analysis

```yaml
content_analyzed:
  content_id: "CAROUSEL-2026-03-18-002"
  platform: "Instagram"
  format: "Carousel"
  hook: "5 productivity tips for busy entrepreneurs"
  posted_at: "2026-03-18T19:00:00"

metrics:
  views: 4200
  likes: 180
  comments: 12
  shares: 8
  saves: 45
  follows: 2

baseline_comparison:
  avg_views: 28000
  view_index: 0.15
  avg_engagement_rate: 4.1%
  actual_engagement_rate: 5.8%
  engagement_index: 1.41

virality_calibration:
  predicted_score: 45
  predicted_range: "medium"
  actual_equivalent: 18
  calibration: "Over-predicted by 27 points"
  calibration_reason: "Hook is generic. '5 productivity tips' is oversaturated. No scroll-stop power."

hook_analysis:
  hook_category: "listicle"
  hook_effectiveness: 22
  vs_category_average: "-45%"
  verdict: "Hook failed hard. Zero differentiation from thousands of identical posts. No curiosity gap, no specificity."

format_analysis:
  format: "carousel"
  format_index: 0.18
  format_trend: "declining"
  verdict: "Carousel format not the issue—other carousels performing normally. This is a hook/topic failure."

timing_analysis:
  posted: "Monday 7:00 PM"
  time_index: 0.7
  verdict: "Timing slightly suboptimal but not the primary failure factor."

growth_analysis:
  follows: 2
  follow_rate: 0.05%
  vs_baseline: 0.2x
  growth_driver: "N/A—content failed to demonstrate unique value"

performance_grade: "D"

what_went_wrong:
  - "Generic hook with zero differentiation"
  - "Topic is oversaturated ('productivity tips')"
  - "No unique angle or perspective"
  - "Listicle format without a surprising or specific promise"

recommendations:
  - "Never use 'X tips for Y' without a differentiating angle"
  - "Add specificity: 'The productivity system that let me write a book in 30 days'"
  - "Add exclusivity: 'The tip my $10M clients use that nobody shares'"
  - "Test same content with stronger hook"

learning_capture_flags:
  promote_to_specimen: false
  update_hook_data: true  # Document this hook pattern as underperformer
  failure_mode: "generic_hook"
```

### Example 3: Anomaly Detection Analysis

```yaml
content_analyzed:
  content_id: "REEL-2026-03-20-003"
  platform: "TikTok"
  format: "Reel"

anomaly_detected: true
anomaly_type: "unexpected_underperformance"

expected_vs_actual:
  predicted_score: 68
  actual_equivalent: 31
  deviation: 37 points (54% miss)

historical_comparison:
  same_hook_category_avg: 52000 views
  same_format_avg: 48000 views
  same_time_slot_avg: 45000 views
  actual_views: 8900

anomaly_investigation:
  checked_factors:
    - platform_algorithm_change: "Possible—TikTok rolled out update 3/19"
    - shadowban_signals: "No obvious violations"
    - audio_copyright: "Clean"
    - hashtag_issues: "None detected"
    - posting_time: "Optimal slot"
    - content_quality: "On par with recent high performers"

  likely_cause: "Algorithm update affecting this content style"
  confidence: "Medium"

  comparison_data:
    other_posts_same_day: "Also underperformed by avg 40%"
    other_creators_similar_content: "Industry-wide dip reported"

anomaly_verdict: "External factor—platform algorithm shift, not content issue"

recommendations:
  - "Do not adjust content strategy based on this data point"
  - "Monitor next 5 posts for pattern confirmation"
  - "If pattern continues, investigate new algorithm preferences"
  - "Check creator community for algorithm update discussions"

learning_capture_flags:
  promote_to_specimen: false
  update_hook_data: false
  flag_for_monitoring: true
  external_factor_logged: true
```

---

## INTEGRATION NOTES

### Upstream Dependencies
- **S05-virality-scoring:** Required for prediction calibration
- **S17-scheduling:** Provides posting time data
- **S18-cross-posting:** Provides multi-platform distribution data

### Downstream Outputs
- **S20-learning-capture:** Receives all learning flags, calibration data, and pattern insights
- **Content Calendar:** Receives timing recommendations
- **Hook Database:** Receives hook performance data

### Data Storage Requirements
- Rolling 90-day performance log
- Baseline calculations updated weekly
- Historical specimen archive
- Calibration tracking database

### Automation Opportunities
- API integration for automatic metric pulling
- Scheduled report generation (daily/weekly/monthly)
- Alert system for threshold crossings
- Automated learning flag routing to S20

---

*S19-performance-analysis is the forensic layer of the Organic Marketing Engine. Every piece of content is evidence. This skill extracts the lessons and feeds the system's continuous improvement loop.*
