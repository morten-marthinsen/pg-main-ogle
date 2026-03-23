---
name: platform-strategy
description: >-
  Platform selection and algorithm optimization for organic content distribution.
  Use after audience intelligence (S01) is complete and you need to determine
  which social platforms to prioritize and how to optimize for each platform's
  algorithm. Produces the Platform Strategy File (PSF) with platform rankings,
  algorithm playbooks, posting cadence, and format recommendations per platform.
  Trigger when users ask about platform selection, algorithm optimization,
  where to post content, social media strategy, or cross-platform distribution
  planning. Requires the Audience Intelligence File (AIF) from S01.
---

# S02: PLATFORM STRATEGY
## Platform Selection + Algorithm Optimization
## Gate: G01 (Requires S01 AIF) | Output: PSF (Platform Strategy File)

---

## PURPOSE

This skill determines WHERE to focus and HOW to optimize for each platform's algorithm. Platform selection is leverage — choosing wrong means fighting uphill.

**Output:** Platform Strategy File (PSF)
**Unlocks:** S03: Brand Voice (via Gate G02)

**Success Criteria:**
- Platform selection justified with audience-data rationale
- Content format mix defined per platform
- Posting cadence and timing windows established
- Output: platform strategy document

## ANTI-DEGRADATION

- Read `S02-PLATFORM-STRATEGY-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `~system/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## REQUIRED CONTEXT

### Teachings to Load
- `teachings/platform-algorithms/vaynerchuk-day-trading-attention.yaml`
- `teachings/platform-algorithms/instagram-2024.yaml`
- `teachings/platform-algorithms/tiktok-2024.yaml`
- `teachings/platform-algorithms/youtube-2024.yaml`
- `teachings/platform-algorithms/linkedin-2024.yaml`
- `teachings/platform-algorithms/x-twitter-2024.yaml`
- `teachings/virality/kane-platform-arbitrage.yaml`

### Specimens to Load
- Growth trajectory case studies from target platforms
- Platform-specific viral specimens

### Prerequisite Files
- S01 Output: `outputs/[campaign]-AIF.yaml` (Audience Intelligence File)

---

## INPUT REQUIREMENTS

S01 AIF output, plus:

```yaml
platform_context:
  current_presence:
    - platform: [Name]
      account: [Handle]
      followers: [Count]
      engagement_rate: [%]
      posting_frequency: [Current]
      growth_rate: [Monthly %]

  resources:
    creation_hours_weekly: [Available hours]
    team_size: [People available]
    equipment: [What we have]
    budget_monthly: [For ads/tools]

  constraints:
    platforms_to_avoid: [Any restrictions]
    format_limitations: [What we can't do]
    approval_requirements: [Who signs off]

goals:
  primary_objective: [Awareness/Leads/Sales/Community]
  timeline: [When we need results]
  minimum_acceptable_growth: [Per month]
```

---

## PROCESS

### Phase 1: Platform-Audience Fit Analysis

Map audience to platform characteristics:

```yaml
platform_fit_matrix:
  instagram:
    audience_presence: [Low/Medium/High]
    evidence: [How we know they're here]
    content_fit: [Visual fit rating 1-10]
    competition_level: [Low/Medium/High]
    algorithm_advantage: [What we can exploit]
    fit_score: [1-100]

  tiktok:
    audience_presence: [Low/Medium/High]
    evidence: [How we know]
    content_fit: [Format fit rating 1-10]
    competition_level: [Low/Medium/High]
    algorithm_advantage: [What we can exploit]
    fit_score: [1-100]

  youtube:
    audience_presence: [Low/Medium/High]
    evidence: [How we know]
    content_fit: [Long-form fit rating 1-10]
    competition_level: [Low/Medium/High]
    algorithm_advantage: [What we can exploit]
    fit_score: [1-100]

  linkedin:
    audience_presence: [Low/Medium/High]
    evidence: [How we know]
    content_fit: [Professional fit rating 1-10]
    competition_level: [Low/Medium/High]
    algorithm_advantage: [What we can exploit]
    fit_score: [1-100]

  x_twitter:
    audience_presence: [Low/Medium/High]
    evidence: [How we know]
    content_fit: [Short-form fit rating 1-10]
    competition_level: [Low/Medium/High]
    algorithm_advantage: [What we can exploit]
    fit_score: [1-100]
```

**Selection Criteria (from Vaynerchuk):**
1. Where is your audience ACTUALLY spending time?
2. Where is there arbitrage (attention > competition)?
3. What format matches your creation strengths?
4. Where can you sustain consistent output?

### Phase 2: Primary Platform Deep Dive

For the selected primary platform:

```yaml
primary_platform:
  name: [Platform]
  selection_rationale: |
    [Why this platform over others]

  algorithm_mechanics:
    discovery_system: [How new content gets surfaced]
    ranking_signals:
      positive:
        - signal: [What the algorithm rewards]
          weight: [High/Medium/Low]
          how_to_maximize: [Specific tactics]
      negative:
        - signal: [What the algorithm penalizes]
          how_to_avoid: [Specific tactics]

    velocity_factors:
      first_hour: [What happens in first 60 mins]
      critical_metrics: [What matters most]
      push_triggers: [What causes viral push]

    content_preferences:
      optimal_length: [Seconds/words/slides]
      format_priority: [What gets pushed]
      posting_frequency: [Sweet spot]
      posting_times: [Best windows]

  format_strategy:
    primary_format: [Main content type]
    secondary_format: [Supporting content]
    format_mix:
      - format: [Type]
        percentage: [% of content]
        purpose: [Why we use it]

  growth_tactics:
    organic_tactics:
      - tactic: [Description]
        expected_impact: [High/Medium/Low]
        effort_required: [High/Medium/Low]

    engagement_tactics:
      - tactic: [Description]
        implementation: [How to do it]

    amplification_tactics:
      - tactic: [Description]
        trigger: [When to use]
```

### Phase 3: Secondary Platform Strategy

For supporting platforms:

```yaml
secondary_platforms:
  - platform: [Name]
    purpose: [Why we're here]
    effort_allocation: [% of total effort]

    content_strategy:
      original_percentage: [% original content]
      adapted_percentage: [% adapted from primary]
      adaptation_approach: [How we adapt]

    posting_cadence: [Frequency]

    success_metrics:
      primary_metric: [What we track]
      target: [Goal]

    algorithm_notes:
      key_differences: [From primary platform]
      adaptation_required: [Format changes]
```

### Phase 4: Cross-Platform Content Flow

Design how content moves between platforms:

```yaml
content_flow:
  primary_to_secondary:
    - source_format: [On primary platform]
      target_format: [On secondary platform]
      adaptation_steps:
        1: [Step]
        2: [Step]
      delay: [Time between posts]

  content_cascade:
    hero_content_path:
      1: [Platform + format]
      2: [Platform + format]
      3: [Platform + format]

    regular_content_path:
      1: [Platform + format]
      2: [Platform + format]

  repurpose_matrix:
    long_form_video:
      - short_clips: [How many]
      - quotes: [How many]
      - stills: [How many]
      - audio: [Podcast clip]

    carousel:
      - thread: [Platform]
      - single_images: [How many]
      - video_slideshow: [Yes/No]
```

### Phase 5: Posting Schedule Optimization

Build the optimal posting calendar:

```yaml
posting_schedule:
  primary_platform:
    name: [Platform]
    weekly_posts: [Total]
    daily_breakdown:
      monday: [Count + times]
      tuesday: [Count + times]
      wednesday: [Count + times]
      thursday: [Count + times]
      friday: [Count + times]
      saturday: [Count + times]
      sunday: [Count + times]

    format_schedule:
      - format: [Type]
        days: [Which days]
        times: [Which times]

    optimal_times:
      highest_engagement: [Time window]
      highest_reach: [Time window]
      lowest_competition: [Time window]

  secondary_platforms:
    - platform: [Name]
      weekly_posts: [Total]
      schedule_notes: [Any specifics]
```

### Phase 6: Platform-Specific Metrics

Define success measurement:

```yaml
metrics_framework:
  primary_platform:
    name: [Platform]

    vanity_metrics:
      - metric: [Name]
        current: [Baseline]
        target_30_day: [Goal]
        target_90_day: [Goal]

    engagement_metrics:
      - metric: [Name]
        current: [Baseline]
        target: [Goal]
        importance: [High/Medium/Low]

    growth_metrics:
      - metric: [Name]
        current: [Baseline]
        target: [Goal]
        tracking: [How we measure]

    conversion_metrics:
      - metric: [Name]
        current: [Baseline]
        target: [Goal]
        attribution: [How we track]

  north_star_metric:
    metric: [Single most important]
    current: [Baseline]
    target: [Goal]
    rationale: |
      [Why this metric matters most]
```

---

## OUTPUT: PLATFORM STRATEGY FILE (PSF)

Complete PSF Template:

```yaml
# PLATFORM STRATEGY FILE (PSF)
# Campaign: [Name]
# Created: [Date]
# Version: 1.0

campaign_name:
date_created:
version: "1.0"

## PLATFORM SELECTION
platform_selection:
  primary_platform:
    name:
    selection_rationale: |
    fit_score:

  secondary_platforms:
    - name:
      purpose:
      effort_allocation:

## PRIMARY PLATFORM STRATEGY
primary_strategy:
  algorithm_mechanics:
    discovery_system:
    ranking_signals:
      positive: []
      negative: []
    velocity_factors:
      first_hour:
      critical_metrics: []
      push_triggers: []

  format_strategy:
    primary_format:
    secondary_format:
    format_mix: []

  posting_schedule:
    weekly_posts:
    daily_breakdown: {}
    optimal_times: []

  growth_tactics:
    organic: []
    engagement: []
    amplification: []

## SECONDARY PLATFORM STRATEGIES
secondary_strategies: []

## CONTENT FLOW
content_flow:
  primary_to_secondary: []
  content_cascade: {}
  repurpose_matrix: {}

## METRICS
metrics_framework:
  north_star_metric:
    metric:
    current:
    target:
  vanity_metrics: []
  engagement_metrics: []
  growth_metrics: []
  conversion_metrics: []

## SOURCE
source_files:
  AIF: "core-message/S01-audience-intelligence/outputs/[name]-AIF.yaml"
```

---

## VALIDATION REQUIREMENTS

PSF must have these fields populated to pass Gate G02:

- [ ] primary_platform.name (valid platform)
- [ ] primary_platform.selection_rationale (not empty)
- [ ] algorithm_mechanics.ranking_signals.positive (>=3)
- [ ] format_strategy.primary_format (valid format)
- [ ] posting_schedule.weekly_posts (>=3)
- [ ] posting_schedule.optimal_times (>=2)
- [ ] metrics_framework.north_star_metric.metric (defined)
- [ ] content_flow.primary_to_secondary (>=1 if secondary exists)

---

## OUTPUT LOCATION

Save PSF to:
```
core-message/S02-platform-strategy/outputs/[campaign-name]-PSF.yaml
```

---

## PLATFORM ALGORITHM CHEAT SHEETS

### Instagram (2024-2025)
```yaml
instagram:
  algorithm_priorities:
    1: "Watch time / Time on content"
    2: "Shares (especially DM shares)"
    3: "Saves"
    4: "Comments"
    5: "Likes"

  reels_signals:
    - "First 3 seconds retention"
    - "Full watch rate"
    - "Replay rate"
    - "Share-to-view ratio"

  push_triggers:
    - "5%+ engagement in first hour"
    - "High save rate (>3%)"
    - "DM shares spike"

  penalties:
    - "Recycled TikTok watermark"
    - "Low-resolution content"
    - "Engagement bait (outdated tactics)"
    - "Posting frequency >3x daily"
```

### TikTok (2024-2025)
```yaml
tiktok:
  algorithm_priorities:
    1: "Full watch rate"
    2: "Rewatch rate"
    3: "Share rate"
    4: "Comment rate"
    5: "Profile visits from video"

  fyp_signals:
    - "First 1-second hook (swipe prevention)"
    - "Loop completion"
    - "Time spent on page after video"
    - "Sound usage patterns"

  push_triggers:
    - ">50% full watch rate"
    - "High share velocity first 30 mins"
    - "Comment engagement (replies)"

  penalties:
    - "QR codes / watermarks"
    - "Overly promotional content"
    - "Duplicate content"
```

### YouTube (2024-2025)
```yaml
youtube:
  algorithm_priorities:
    1: "Click-through rate (CTR)"
    2: "Average view duration (AVD)"
    3: "Average percentage viewed"
    4: "Session time (after your video)"
    5: "Subscriber conversion"

  discovery_signals:
    - "Thumbnail CTR vs impressions"
    - "First 30-second retention"
    - "Audience retention curve shape"
    - "End screen clicks"

  push_triggers:
    - "CTR >8%"
    - "AVD >50% of video"
    - "Unusual topic/search surge"

  shorts_signals:
    - "Swipe-away rate (inverse)"
    - "Loop completion"
    - "Subscriber conversion from Short"
```

### LinkedIn (2024-2025)
```yaml
linkedin:
  algorithm_priorities:
    1: "Dwell time (time reading)"
    2: "Comment quality and length"
    3: "Share to network"
    4: "Click-through on links (penalized initially)"
    5: "Saves"

  format_signals:
    - "Native content (no external links)"
    - "Document/carousel posts"
    - "Text with line breaks"
    - "Video completion rate"

  push_triggers:
    - "Engagement in first 60-90 mins"
    - "Comments with replies (conversation)"
    - "Shares with commentary"

  penalties:
    - "External links in initial post"
    - "Engagement pods (detected)"
    - "Overly salesy content"
```

### X/Twitter (2024-2025)
```yaml
x_twitter:
  algorithm_priorities:
    1: "Engagement rate (replies, retweets, likes)"
    2: "Time spent on tweet/thread"
    3: "Profile clicks"
    4: "Bookmark rate"
    5: "Quote tweets"

  discovery_signals:
    - "Reply to engagement ratio"
    - "Thread completion rate"
    - "Media engagement boost"
    - "Topic/interest matching"

  push_triggers:
    - "Viral velocity in first 30 mins"
    - "Quote tweets with engagement"
    - "Influential account engagement"

  penalties:
    - "External links (deprioritized)"
    - "Low engagement rate history"
    - "Spam-like patterns"
```

---

## NEXT SKILL

Upon completion, S03: Brand Voice is unlocked via Gate G02.

---

*Choose your battlefield. The algorithm is neutral — it rewards those who understand its language.*
