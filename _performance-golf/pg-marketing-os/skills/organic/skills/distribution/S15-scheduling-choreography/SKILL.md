---
name: scheduling-choreography
description: >-
  Optimal timing, cross-platform sequencing, and posting choreography for
  organic content distribution. Use after content assembly (S14) is complete
  and you need to determine precisely when and in what sequence to publish
  across platforms. Timing is leverage — the same content posted at the wrong
  time dies; posted at the right time, it explodes. Produces the Scheduling
  Choreography File (SCF) with platform-specific timing windows, cross-post
  sequencing, and engagement-window coordination. Trigger when users mention
  scheduling, posting times, content calendar timing, cross-platform sequencing,
  or when to publish content. Requires S14 Content Assembly output.
---

# S15: SCHEDULING CHOREOGRAPHY
## Optimal Timing, Cross-Platform Sequencing, Posting Choreography
## Gate: G10 (Requires S14 Content Assembly) | Output: Scheduling Choreography File (SCF)

---

## PURPOSE

This skill transforms assembled content into a precisely timed, cross-platform distribution sequence. Timing is leverage — the same content posted at the wrong time dies; posted at the right time, it explodes. This is not "scheduling" — it is choreography.

**Output:** Scheduling Choreography File (SCF)
**Requires:** S14 Content Assembly output
**Unlocks:** S16 Engagement Protocol

---

## ANTI-DEGRADATION

- Read `S15-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `skills/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## SKILL IDENTITY

```yaml
skill_id: S15
skill_name: Scheduling Choreography
category: Distribution
position_in_pipeline: First distribution skill (post-production)
dependencies:
  hard:
    - S14 Content Assembly (content packages must exist)
  soft:
    - S02 Platform Strategy (posting windows)
    - S07 Campaign Brief (campaign calendar)
outputs_to:
  - S16 Engagement Protocol (timing triggers engagement windows)
  - S17 Network Amplification (coordinates network timing)
```

---

## PREREQUISITES (Gate Requirements)

### G10 Validation

Before executing S15, verify:

```yaml
gate_g10_check:
  required_files:
    - path: "skills/production/S14-content-assembly/outputs/[campaign]-[content-id]-package.yaml"
      exists: [Yes/No]
      valid: [Yes/No]

  required_fields:
    - content_id: [must exist]
    - platform: [must be specified]
    - content_type: [must be defined]
    - status: [must be "ready" or higher]

  quality_gates:
    - virality_score: [must be >= 60]
    - arena_passed: [must be true]
    - voice_check: [must be passed]

gate_decision: [PROCEED / BLOCKED]
block_reason: [if blocked, why]
```

---

## INPUT REQUIREMENTS

### From S14 Content Assembly

```yaml
content_inputs:
  content_packages:
    - content_id: [Unique identifier]
      title: [Working title]
      platform: [Primary platform]
      secondary_platforms: [List]
      content_type: [Format]
      content_function: [Awareness/Engagement/Conversion/Community]
      pillar: [Content pillar]
      campaign: [Campaign name]
      virality_score: [Score from VSF]
      production_status: [Ready]
```

### From S02 Platform Strategy

```yaml
platform_timing:
  primary_platform:
    optimal_times: [From PSF]
    posting_frequency: [From PSF]
    algorithm_velocity_windows: [First-hour requirements]

  secondary_platforms:
    - platform: [Name]
      optimal_times: [Windows]
      delay_from_primary: [Hours/days]
```

### From S07 Campaign Brief

```yaml
campaign_context:
  campaign_dates:
    start: [Date]
    end: [Date]

  content_calendar:
    monthly_themes: [If applicable]
    key_dates: [Launches, events, etc.]
    posting_cadence: [Daily/weekly rhythm]

  goals:
    primary_metric: [What we're optimizing for]
    volume_target: [Posts per week]
```

### Additional Scheduling Context

```yaml
scheduling_context:
  timezone: [Primary audience timezone]

  external_factors:
    holidays: [Upcoming holidays in range]
    industry_events: [Relevant events]
    competitor_patterns: [Known competitor posting times]
    cultural_moments: [Trending topics, awareness days]

  historical_data:
    best_performing_times: [If available]
    worst_performing_times: [If available]
    audience_online_patterns: [From analytics]

  constraints:
    blackout_dates: [Days not to post]
    approval_lead_time: [Hours needed for approval]
    production_dependencies: [Content not yet ready]
```

---

## PROCESS

### Phase 1: Platform-Specific Timing Intelligence

#### 2026 Optimal Posting Windows (Updated Data)

```yaml
platform_timing_matrix_2026:

  instagram:
    highest_engagement_windows:
      weekday:
        tier_1: "6:00-7:00 AM" # Pre-work scroll
        tier_2: "12:00-1:00 PM" # Lunch break
        tier_3: "7:00-9:00 PM" # Evening wind-down
      weekend:
        tier_1: "9:00-11:00 AM" # Late morning leisure
        tier_2: "7:00-9:00 PM" # Evening relaxation

    format_specific_timing:
      reels:
        best: "12:00-1:00 PM, 7:00-8:00 PM"
        rationale: "Peak entertainment consumption windows"
      carousels:
        best: "7:00-8:00 AM, 6:00-7:00 PM"
        rationale: "When users have time to swipe through"
      stories:
        best: "8:00-9:00 AM, 5:00-6:00 PM"
        rationale: "Quick consumption moments"

    posting_frequency:
      reels: "1-2 per day maximum"
      feed_posts: "1 per day maximum"
      stories: "3-7 per day"
      minimum_gap: "4 hours between feed posts"

    algorithm_notes:
      first_hour_critical: true
      velocity_threshold: "5%+ engagement in 60 minutes for push"
      repost_penalty: "Duplicate detection active"

  tiktok:
    highest_engagement_windows:
      weekday:
        tier_1: "7:00-9:00 AM" # Morning commute
        tier_2: "12:00-3:00 PM" # Extended lunch/afternoon
        tier_3: "7:00-11:00 PM" # Prime evening hours
      weekend:
        tier_1: "9:00 AM-12:00 PM" # Late morning
        tier_2: "7:00-11:00 PM" # Evening dominance

    posting_frequency:
      optimal: "1-3 posts per day"
      maximum: "4 posts per day"
      minimum_gap: "3 hours between posts"

    algorithm_notes:
      first_30_minutes: "Critical for initial push determination"
      batch_testing: "Post variations at different times"
      trend_timing: "Post trending content within 24-48 hours of trend emergence"

  youtube:
    shorts:
      best_times:
        weekday: "12:00-3:00 PM, 7:00-10:00 PM"
        weekend: "9:00 AM-12:00 PM, 5:00-9:00 PM"
      posting_frequency: "1-3 per day"

    long_form:
      best_times:
        weekday: "2:00-4:00 PM" # Published before evening viewing
        weekend: "9:00-11:00 AM" # Morning publish for afternoon watch
      posting_frequency: "1-3 per week"
      pre_premiere: "Schedule 24-48 hours ahead for notification push"

    algorithm_notes:
      first_24_hours: "Critical for long-form momentum"
      first_2_hours: "Shorts velocity window"
      subscriber_notification: "Publish when subscribers most active"

  linkedin:
    highest_engagement_windows:
      weekday_only:
        tier_1: "7:00-8:00 AM" # Pre-work professional check
        tier_2: "10:00-11:00 AM" # Mid-morning break
        tier_3: "5:00-6:00 PM" # End of workday
      weekend:
        limited_engagement: true
        if_posting: "Sunday 5:00-7:00 PM prep for week"

    posting_frequency:
      optimal: "1 post per day"
      maximum: "2 posts per day"
      minimum_gap: "18-24 hours between posts"

    format_timing:
      text_posts: "Early morning (7:00-8:00 AM)"
      carousels: "Mid-morning (10:00-11:00 AM)"
      video: "Lunch (12:00-1:00 PM)"

    algorithm_notes:
      first_90_minutes: "Critical for algorithmic push"
      comment_velocity: "Comments worth more than likes"
      external_links: "Post in comments, not body"

  x_twitter:
    highest_engagement_windows:
      weekday:
        tier_1: "8:00-10:00 AM" # Morning news cycle
        tier_2: "12:00-1:00 PM" # Lunch scroll
        tier_3: "5:00-6:00 PM" # Commute/end of day
      weekend:
        tier_1: "9:00-11:00 AM"
        tier_2: "8:00-10:00 PM"

    posting_frequency:
      optimal: "3-5 posts per day"
      maximum: "10 posts per day (with engagement)"
      threads: "1 per day maximum"

    algorithm_notes:
      first_30_minutes: "Determines reach trajectory"
      reply_engagement: "Self-replies within 30 mins boost"
      quote_tweets: "Trigger additional distribution"
```

### Phase 2: Content Type Timing Matrix

Match content type to optimal timing:

```yaml
content_type_timing:

  awareness_content:
    purpose: "Maximum reach to new audiences"
    optimal_timing:
      instagram: "12:00-1:00 PM or 7:00-8:00 PM"
      tiktok: "7:00-9:00 PM"
      youtube_shorts: "12:00-3:00 PM"
      linkedin: "7:00-8:00 AM"
      x_twitter: "8:00-10:00 AM"
    rationale: "Peak traffic hours for discovery"

  engagement_content:
    purpose: "Drive interaction from existing audience"
    optimal_timing:
      instagram: "7:00-9:00 PM"
      tiktok: "7:00-11:00 PM"
      youtube: "Evening publish"
      linkedin: "10:00-11:00 AM"
      x_twitter: "12:00-1:00 PM or 5:00-6:00 PM"
    rationale: "When audience has time to engage deeply"

  conversion_content:
    purpose: "Drive specific actions (link clicks, sign-ups)"
    optimal_timing:
      instagram: "6:00-7:00 AM or 8:00-9:00 PM"
      tiktok: "Not optimal platform for conversion"
      youtube: "Afternoon for evening viewing"
      linkedin: "Tuesday-Thursday 10:00 AM"
      x_twitter: "Tuesday-Thursday 9:00-10:00 AM"
    rationale: "Decision-making windows"

  community_content:
    purpose: "Build relationship with core audience"
    optimal_timing:
      instagram_stories: "Multiple throughout day"
      live_content: "7:00-9:00 PM"
      linkedin: "5:00-6:00 PM"
      x_twitter: "Evening hours"
    rationale: "Relaxed, conversational windows"
```

### Phase 3: Cross-Platform Cascade Sequencing

Design the posting sequence for maximum amplification:

```yaml
cascade_sequence_templates:

  hero_content_cascade:
    description: "For major content pieces (high virality score, campaign anchors)"

    sequence:
      t0_primary_launch:
        platform: "[Primary platform from PSF]"
        time: "[Optimal window for platform]"
        actions:
          - "Post primary content"
          - "Pin/feature if applicable"
          - "Begin engagement protocol (S16)"

      t1_amplification:
        delay: "30-60 minutes after T0"
        platform: "X/Twitter"
        content: "Thread teasing primary content"
        actions:
          - "Link to primary platform (in reply)"
          - "Tag relevant accounts"

      t2_secondary_push:
        delay: "2-4 hours after T0"
        platform: "LinkedIn (if B2B relevant)"
        content: "Professional angle on same content"
        actions:
          - "Adapt messaging for platform"
          - "No direct cross-post"

      t3_stories_echo:
        delay: "4-6 hours after T0"
        platform: "Instagram Stories"
        content: "Behind-the-scenes or reaction to engagement"
        actions:
          - "Reference main post"
          - "Add engagement stickers"

      t4_next_day_repurpose:
        delay: "18-24 hours after T0"
        platform: "[Secondary video platform]"
        content: "Adapted version for new platform"
        actions:
          - "Full platform-native adaptation"
          - "New hook for new audience"

  standard_content_cascade:
    description: "For regular content (meeting threshold, consistent output)"

    sequence:
      t0_primary:
        platform: "[Primary platform]"
        time: "[Standard optimal window]"

      t1_secondary:
        delay: "4-24 hours"
        platform: "[Secondary platform]"
        content: "Adapted version"

      t2_repurpose:
        delay: "2-7 days"
        platform: "[Tertiary platform]"
        content: "Reformatted version"

  rapid_trend_cascade:
    description: "For time-sensitive trend-jacking content"

    sequence:
      t0_first_mover:
        platform: "TikTok or X/Twitter"
        time: "ASAP (within 2 hours of trend)"
        priority: "Speed > perfection"

      t1_expansion:
        delay: "1-2 hours"
        platforms: "All relevant platforms simultaneously"
        actions:
          - "Adapted for each platform"
          - "Hashtag alignment"

      monitoring:
        check: "Every 30 minutes for first 3 hours"
        action: "Double down or pivot based on response"
```

### Phase 4: Momentum Stacking Protocol

Build on viral moments and successful content:

```yaml
momentum_stacking:

  viral_response_protocol:
    trigger: "Content exceeds 3x average performance in first hour"

    immediate_actions:
      within_30_minutes:
        - "Increase engagement intensity (S16)"
        - "Post supporting story/content"
        - "Reply to high-value comments"
        - "Notify network for amplification (S17)"

      within_2_hours:
        - "Create follow-up content referencing success"
        - "Cross-post tease to other platforms"
        - "Screenshot/celebrate in stories"

      within_24_hours:
        - "Create Part 2 or response video"
        - "Compile and respond to top comments"
        - "Adjust next week's calendar to capitalize"

  content_series_stacking:
    description: "Building momentum across related pieces"

    strategy:
      post_spacing: "24-48 hours between series posts"
      callback_hooks:
        - "Reference previous part performance"
        - "Use comments/questions from Part 1 in Part 2"
        - "Create anticipation with previews"

      escalation_pattern:
        part_1: "Introduce concept (Awareness)"
        part_2: "Deepen with examples (Engagement)"
        part_3: "Actionable framework (Conversion)"
        part_4: "Community stories/results (Community)"

  weekly_momentum_rhythm:
    monday: "Week opener - strong hook content"
    tuesday: "Educational/value content"
    wednesday: "Community engagement focus"
    thursday: "Controversial/opinion content"
    friday: "Lighter/entertaining content"
    saturday: "Repurposed best performers"
    sunday: "Behind-the-scenes/authentic content"
```

### Phase 5: Holiday & Event Calendar Integration

```yaml
calendar_integration_2026:

  major_holidays:
    - date: "2026-01-01"
      event: "New Year's Day"
      content_strategy: "New beginnings, goal-setting"
      posting: "Post before midnight and morning after"
      avoid: "Heavy promotional content"

    - date: "2026-02-14"
      event: "Valentine's Day"
      content_strategy: "Love, relationships, self-care"
      posting: "Week before + day of"
      avoid: "Irrelevant forced tie-ins"

    - date: "2026-05-25"
      event: "Memorial Day"
      content_strategy: "Respectful acknowledgment"
      posting: "Minimal promotional content"
      avoid: "Sales messaging"

    - date: "2026-07-04"
      event: "Independence Day"
      content_strategy: "Freedom, celebration"
      posting: "Before and after, not during"
      avoid: "Complex content (low attention)"

    - date: "2026-11-26"
      event: "Thanksgiving"
      content_strategy: "Gratitude, community"
      posting: "Wednesday before, Friday after"
      avoid: "Hard selling"

    - date: "2026-12-25"
      event: "Christmas"
      content_strategy: "Celebration, year-end"
      posting: "Pre-scheduled, minimal engagement"
      avoid: "Expecting high engagement"

  cultural_moments:
    awareness_days: "[Research relevant awareness days for niche]"
    industry_events: "[Conference dates, launches, announcements]"
    platform_events: "[TikTok trends, Instagram features, etc.]"

  event_content_planning:
    lead_time:
      major_holiday: "2-4 weeks content prep"
      awareness_day: "1-2 weeks prep"
      trend_response: "Same day or next day"

    content_types:
      pre_event: "Anticipation, countdown, preparation"
      during_event: "Real-time, authentic, in-the-moment"
      post_event: "Recap, learnings, community highlights"
```

### Phase 6: Scheduling Brief Assembly

```yaml
scheduling_brief_template:

  brief_header:
    campaign: "[Campaign name]"
    date_range: "[Start] to [End]"
    total_content_pieces: "[Count]"
    platforms_covered: "[List]"
    prepared_by: "[Name/System]"
    date_prepared: "[Date]"

  weekly_overview:
    week_of: "[Date]"
    theme: "[Weekly theme if applicable]"

    content_schedule:
      monday:
        - time: "[HH:MM]"
          timezone: "[TZ]"
          platform: "[Platform]"
          content_id: "[ID]"
          content_title: "[Title]"
          content_type: "[Format]"
          function: "[Awareness/Engagement/Conversion/Community]"
          cascade_position: "[Primary/Secondary/Repurpose]"
          engagement_window: "[Duration for S16]"
          notes: "[Any special instructions]"

      tuesday:
        # [Repeat structure]

      # [Continue for each day]

    key_dates_this_week:
      - date: "[Date]"
        event: "[Event name]"
        content_adjustment: "[How we're responding]"

  content_by_platform:
    instagram:
      total_posts: "[Count]"
      breakdown:
        reels: "[Count]"
        carousels: "[Count]"
        stories: "[Count]"
      posting_times: "[List of scheduled times]"

    # [Repeat for each platform]

  cascade_sequences:
    - hero_content:
        content_id: "[ID]"
        t0: "[Platform] at [Time]"
        t1: "[Platform] at [Time]"
        t2: "[Platform] at [Time]"

    # [List all cascades]

  contingency_notes:
    if_content_underperforms: "[Action]"
    if_content_overperforms: "[Action]"
    backup_content: "[IDs of backup content]"
```

---

## OUTPUT SPECIFICATION

### Scheduling Choreography File (SCF)

```yaml
# SCHEDULING CHOREOGRAPHY FILE (SCF)
# Campaign: [Name]
# Created: [Date]
# Version: 1.0

scf_metadata:
  campaign_name:
  date_range:
    start:
    end:
  total_content_pieces:
  platforms:
  timezone:
  prepared_by:
  date_prepared:
  version: "1.0"

## SECTION 1: PLATFORM TIMING STRATEGY
platform_timing:
  primary_platform:
    name:
    optimal_windows:
      tier_1:
      tier_2:
      tier_3:
    format_timing: {}
    posting_frequency:
    algorithm_notes:

  secondary_platforms:
    - name:
      optimal_windows: []
      delay_from_primary:
      posting_frequency:

## SECTION 2: CONTENT SCHEDULE
content_schedule:
  week_1:
    date_range:
    theme:
    posts:
      - date:
        time:
        timezone:
        platform:
        content_id:
        content_title:
        content_type:
        function:
        cascade_position:
        engagement_window_start:
        engagement_window_end:
        network_amplification: [Yes/No]
        notes:
      # [Continue for all posts]

  week_2:
    # [Same structure]

  # [Continue for campaign duration]

## SECTION 3: CASCADE SEQUENCES
cascade_sequences:
  - sequence_id:
    content_id:
    sequence_type: [Hero/Standard/Rapid]
    steps:
      - step: "T0"
        platform:
        time:
        content_type:
        actions: []
      - step: "T1"
        platform:
        delay:
        content_type:
        actions: []
      # [Continue for sequence]

## SECTION 4: MOMENTUM STACKING RULES
momentum_rules:
  viral_threshold:
    metric:
    threshold:
    timeframe:

  viral_response_sequence:
    within_30_minutes: []
    within_2_hours: []
    within_24_hours: []

  series_stacking:
    spacing:
    escalation_pattern: []

## SECTION 5: CALENDAR INTEGRATION
calendar_events:
  - date:
    event:
    content_strategy:
    posting_adjustment:
    content_ids_affected: []

## SECTION 6: CONTINGENCIES
contingencies:
  underperformance_protocol:
    threshold:
    actions: []

  overperformance_protocol:
    threshold:
    actions: []

  backup_content:
    - content_id:
      can_replace: [List of content IDs]
      ready_to_publish: [Yes/No]

## SECTION 7: HANDOFF TO S16
engagement_triggers:
  - content_id:
    platform:
    post_time:
    engagement_window_start:
    engagement_window_end:
    priority: [High/Medium/Low]

## SOURCE FILES
source_files:
  content_packages: "[paths]"
  platform_strategy: "[path to PSF]"
  campaign_brief: "[path to CBF]"
```

---

## QUALITY GATES

### Anti-Degradation Checks

```yaml
scf_quality_gates:

  timing_validation:
    - check: "All post times fall within platform optimal windows"
      status: [Pass/Fail]
      exceptions: "[List any exceptions with rationale]"

    - check: "Minimum posting gaps respected"
      status: [Pass/Fail]
      violations: "[List any violations]"

    - check: "No blackout date violations"
      status: [Pass/Fail]

  cascade_validation:
    - check: "All cascade sequences have defined delays"
      status: [Pass/Fail]

    - check: "No platform posted before primary"
      status: [Pass/Fail]

    - check: "Engagement windows defined for all posts"
      status: [Pass/Fail]

  coverage_validation:
    - check: "All content packages from S14 have scheduled times"
      status: [Pass/Fail]
      missing: "[List any unscheduled content]"

    - check: "Calendar events accounted for"
      status: [Pass/Fail]

    - check: "Weekly content quotas met"
      status: [Pass/Fail]

  handoff_validation:
    - check: "S16 engagement triggers complete"
      status: [Pass/Fail]

    - check: "S17 network amplification flags set"
      status: [Pass/Fail]

quality_gate_decision: [APPROVED / REVISION REQUIRED]
revision_notes: "[If required, what needs fixing]"
```

---

## TEMPLATES

### Weekly Scheduling Template

```yaml
weekly_schedule_template:
  week_of: "[YYYY-MM-DD]"
  campaign: "[Name]"

  monday:
    posts:
      - time: "07:00"
        platform: "Instagram"
        content_id: ""
        type: "Reel"
        notes: ""
      - time: "12:00"
        platform: "LinkedIn"
        content_id: ""
        type: "Carousel"
        notes: ""
    stories:
      - time: "09:00"
        content: ""
      - time: "15:00"
        content: ""
    engagement_blocks:
      - time: "07:00-08:00"
        focus: "Post-publish engagement"
      - time: "18:00-19:00"
        focus: "Community engagement"

  tuesday:
    posts: []
    stories: []
    engagement_blocks: []

  wednesday:
    posts: []
    stories: []
    engagement_blocks: []

  thursday:
    posts: []
    stories: []
    engagement_blocks: []

  friday:
    posts: []
    stories: []
    engagement_blocks: []

  saturday:
    posts: []
    stories: []
    engagement_blocks: []

  sunday:
    posts: []
    stories: []
    engagement_blocks: []

  week_summary:
    total_feed_posts:
    total_stories:
    platforms_active:
    engagement_hours:
```

### Cascade Planning Template

```yaml
cascade_planning_template:
  content_id: ""
  content_title: ""
  virality_score: ""
  cascade_type: "[Hero/Standard/Rapid]"

  primary_launch:
    platform: ""
    date: ""
    time: ""
    timezone: ""
    format: ""
    caption_ready: [Yes/No]
    visuals_ready: [Yes/No]
    hashtags_ready: [Yes/No]

  cascade_steps:
    - step_number: 1
      delay_from_primary: ""
      platform: ""
      time: ""
      adaptation: ""
      status: [Scheduled/Pending/Ready]

    - step_number: 2
      delay_from_primary: ""
      platform: ""
      time: ""
      adaptation: ""
      status: [Scheduled/Pending/Ready]

    - step_number: 3
      delay_from_primary: ""
      platform: ""
      time: ""
      adaptation: ""
      status: [Scheduled/Pending/Ready]

  monitoring_checkpoints:
    - time: "T+30min"
      check: "Engagement velocity"
      threshold: ""
      action_if_below: ""
      action_if_above: ""

    - time: "T+2hr"
      check: "Performance trajectory"
      threshold: ""
      action_if_below: ""
      action_if_above: ""
```

### Event Response Template

```yaml
event_response_template:
  event_name: ""
  event_date: ""
  event_type: "[Holiday/Industry/Cultural/Trending]"
  relevance_to_brand: "[High/Medium/Low]"

  content_response:
    pre_event:
      timing: ""
      content_type: ""
      content_id: ""
      angle: ""

    during_event:
      timing: ""
      content_type: ""
      content_id: ""
      angle: ""

    post_event:
      timing: ""
      content_type: ""
      content_id: ""
      angle: ""

  scheduling_adjustments:
    posts_to_move: []
    posts_to_cancel: []
    posts_to_add: []

  engagement_adjustments:
    hashtags_to_use: []
    hashtags_to_avoid: []
    tone_shift: ""
```

---

## EXAMPLES

### Example 1: Hero Content Cascade (Instagram Primary)

```yaml
example_hero_cascade:
  content_id: "OME-2026-Q1-042"
  content_title: "The 5-Second Rule That Changed My Business"
  virality_score: 82
  cascade_type: "Hero"

  primary_launch:
    platform: "Instagram"
    date: "2026-03-15"
    time: "12:30 PM"
    timezone: "EST"
    format: "Reel"
    rationale: "Highest engagement window for Reels, Sunday positioning"

  cascade_execution:
    t0_12:30_PM:
      platform: "Instagram"
      action: "Post Reel"
      engagement: "Begin S16 protocol immediately"

    t1_1:00_PM:
      platform: "Instagram Stories"
      action: "Post 'Just posted' story with poll"
      content: "Which part resonated most? A or B"

    t2_1:30_PM:
      platform: "X/Twitter"
      action: "Post thread teaser"
      content: "Thread: The psychology behind the 5-second rule (and why most people get it wrong)..."
      note: "Link to Instagram in final tweet"

    t3_5:00_PM:
      platform: "LinkedIn"
      action: "Post professional adaptation"
      content: "Adapted angle for professional context"
      format: "Text post with image"

    t4_Monday_7:00_AM:
      platform: "TikTok"
      action: "Post platform-native version"
      content: "Re-recorded with TikTok energy and hooks"
      note: "Different hook than Instagram version"

    t5_Monday_12:00_PM:
      platform: "YouTube Shorts"
      action: "Post Shorts adaptation"
      content: "Edited for YouTube Shorts format"

  monitoring:
    checkpoint_1:
      time: "T+30min"
      metric: "Engagement rate"
      expected: "5%+"
      action_below: "Boost engagement, comment replies"
      action_above: "Notify network (S17), prep Part 2"

    checkpoint_2:
      time: "T+2hr"
      metric: "Views vs average"
      expected: "2x average"
      action_below: "Add to story highlights, share to close friends"
      action_above: "Record reaction video, accelerate cascade"
```

### Example 2: Weekly Rhythm Schedule

```yaml
example_weekly_schedule:
  week_of: "2026-03-16"
  campaign: "AI Products Launch"
  theme: "Trust-Building Week"

  monday:
    posts:
      - time: "07:00 EST"
        platform: "LinkedIn"
        content_id: "OME-2026-Q1-043"
        type: "Carousel"
        title: "7 Signs You're Ready for AI in Your Business"
        function: "Awareness"
        cascade: "Standard - Primary"
        engagement_window: "07:00-08:30"

      - time: "12:00 EST"
        platform: "Instagram"
        content_id: "OME-2026-Q1-044"
        type: "Reel"
        title: "POV: Your first day with AI automation"
        function: "Engagement"
        cascade: "Standard - Primary"
        engagement_window: "12:00-13:30"

    stories:
      - time: "08:30"
        content: "Monday motivation - behind the scenes prep"
      - time: "14:00"
        content: "Reaction to Reel performance + Q&A"
      - time: "19:00"
        content: "Evening wind-down, preview tomorrow"

  tuesday:
    posts:
      - time: "10:00 EST"
        platform: "LinkedIn"
        content_id: "OME-2026-Q1-043-adapt"
        type: "Text + Image"
        title: "Key insight from carousel (adapted)"
        function: "Engagement"
        cascade: "OME-2026-Q1-043 T1"

      - time: "19:00 EST"
        platform: "TikTok"
        content_id: "OME-2026-Q1-045"
        type: "Short video"
        title: "Controversial take: AI won't replace you..."
        function: "Awareness"
        cascade: "Standard - Primary"
        engagement_window: "19:00-21:00"

    # [Continue pattern for rest of week]

  key_events:
    - date: "2026-03-17"
      event: "St. Patrick's Day"
      adjustment: "Lighter content scheduled, no heavy educational"

  metrics_targets:
    total_reach_goal: "50,000"
    engagement_rate_goal: "5.5%"
    new_followers_goal: "500"
```

### Example 3: Trend Response Rapid Cascade

```yaml
example_trend_response:
  trigger: "Major AI announcement from competitor"
  detected: "2026-03-18 09:00 EST"
  response_deadline: "Before 12:00 EST (3 hours)"

  rapid_cascade:
    t0_09:30:
      platform: "X/Twitter"
      content: "Hot take thread on announcement"
      type: "Thread"
      timing: "30 minutes after detection"
      approval: "Fast-track (skip normal review)"

    t1_10:00:
      platform: "Instagram Stories"
      content: "Quick reaction video (recorded immediately)"
      type: "Story"
      timing: "60 minutes after detection"

    t2_10:30:
      platform: "TikTok"
      content: "Quick POV reaction video"
      type: "Short video"
      timing: "90 minutes after detection"

    t3_11:30:
      platform: "LinkedIn"
      content: "Professional analysis post"
      type: "Text post"
      timing: "2.5 hours after detection"

    t4_14:00:
      platform: "Instagram"
      content: "Carousel breakdown of implications"
      type: "Carousel"
      timing: "5 hours (more considered response)"

  monitoring:
    hashtags_tracking: ["#AIannouncement", "#[competitor]", "#AINews"]
    competitor_response_watch: true
    conversation_participation: "Active replies for 6 hours"

  content_adjustments:
    postponed:
      - content_id: "OME-2026-Q1-046"
        original_time: "12:00 EST"
        new_time: "Tomorrow 12:00 EST"
        reason: "Trend response takes priority"
```

---

## VALIDATION REQUIREMENTS

SCF passes when:

- [ ] All content from S14 has assigned posting times
- [ ] All posting times fall within optimal platform windows
- [ ] Minimum gaps between posts respected per platform
- [ ] All cascade sequences fully defined
- [ ] Momentum stacking rules documented
- [ ] Calendar events integrated and content adjusted
- [ ] Contingency protocols defined
- [ ] Engagement windows specified for S16 handoff
- [ ] Network amplification flags set for S17
- [ ] No blackout date violations

---

## OUTPUT LOCATION

Save SCF to:
```
skills/distribution/S15-scheduling-choreography/outputs/[campaign-name]-SCF.yaml
```

---

## NEXT SKILL

Upon completion, S16: Engagement Protocol is triggered for each scheduled content piece, with timing from the SCF.

---

*Timing is not a detail. It is the difference between content that lives and content that dies. Choreograph or be forgotten.*
