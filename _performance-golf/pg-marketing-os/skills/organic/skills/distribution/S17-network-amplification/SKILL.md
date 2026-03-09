---
name: network-amplification
description: >-
  AI influencer network coordination for viral content amplification moments.
  Use when you need to orchestrate a network of accounts (owned, partnered, or
  AI-driven) to strategically amplify content at critical distribution moments.
  The difference between content that dies and content that goes viral is often
  the first wave of engagement — this skill orchestrates that wave. Produces
  the Network Amplification Plan (NAP) with account coordination sequences,
  engagement timing, and cross-network activation triggers. Trigger when users
  mention amplification, network coordination, cross-promotion, or boosting
  organic reach. Requires S14-S16 outputs. Connects to S21-S24 Influencer Network.
---

# S17: NETWORK AMPLIFICATION
## AI Influencer Network Coordination for Viral Moments
## Gate: G10 (Requires S14 Content Assembly) | Output: Network Amplification Plan (NAP)

---

## PURPOSE

This skill coordinates a network of accounts (owned, partnered, or AI-driven) to strategically amplify content at critical moments. The difference between content that dies and content that goes viral is often the first wave of engagement. This skill orchestrates that wave.

**Output:** Network Amplification Plan (NAP)
**Requires:** S14 Content Assembly output + S15 Scheduling + S16 Engagement Protocol
**Connects to:** S21-S24 (Influencer Network Sub-System)

---

## ANTI-DEGRADATION

- Read `S17-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `skills/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## SKILL IDENTITY

```yaml
skill_id: S17
skill_name: Network Amplification
category: Distribution
position_in_pipeline: Third distribution skill (amplification layer)
dependencies:
  hard:
    - S14 Content Assembly (content to amplify)
    - S15 Scheduling Choreography (timing coordination)
    - S16 Engagement Protocol (engagement windows defined)
  soft:
    - S21-S24 (If using AI influencer network)
outputs_to:
  - S19 Performance Analysis (amplification impact metrics)
  - Learning Log (what amplification strategies worked)
```

---

## PREREQUISITES (Gate Requirements)

### Gate Validation

```yaml
gate_check:
  required_files:
    content_package:
      path: "skills/production/S14-content-assembly/outputs/[content-id]-package.yaml"
      exists: [Yes/No]

    scheduling_file:
      path: "skills/distribution/S15-scheduling-choreography/outputs/[campaign]-SCF.yaml"
      exists: [Yes/No]
      network_amplification_flags: [Defined/Not Defined]

    engagement_protocol:
      path: "skills/distribution/S16-engagement-protocol/outputs/[campaign]-[content-id]-EPF.yaml"
      exists: [Yes/No]

  optional_files:
    network_roster:
      path: "skills/influencer-network/network-roster.yaml"
      exists: [Yes/No]
      note: "If not exists, use partner/owned accounts only"

gate_decision: [PROCEED / BLOCKED]
block_reason: [if blocked, why]
```

---

## INPUT REQUIREMENTS

### From S15 Scheduling Choreography

```yaml
scheduling_inputs:
  amplification_triggers:
    - content_id: [ID]
      platform: [Platform]
      post_time: [Time]
      priority: [High/Medium/Low]
      network_amplification: [Yes/No]
```

### From S16 Engagement Protocol

```yaml
engagement_inputs:
  engagement_windows:
    - content_id: [ID]
      window_start: [Time]
      window_end: [Time]
      first_60_protocol: [Active/Passive]
```

### Network Roster (If Available)

```yaml
network_roster:
  owned_accounts:
    - account_handle: [Handle]
      platform: [Platform]
      follower_count: [Count]
      niche: [Topic area]
      relationship: "Owned"
      activation_rules:
        can_engage: [Types of engagement allowed]
        must_disclose: [Yes/No]
        delay_requirements: [Minimum delay from main post]

  partner_accounts:
    - account_handle: [Handle]
      platform: [Platform]
      follower_count: [Count]
      niche: [Topic area]
      relationship: "Partner"
      compensation_model: [Free/Paid/Exchange]
      activation_rules:
        requires_notice: [Hours needed]
        content_approval: [Yes/No]
        exclusivity: [Yes/No]

  ai_influencer_accounts:
    - account_handle: [Handle]
      platform: [Platform]
      follower_count: [Count]
      persona_id: [From S21]
      niche: [Topic area]
      relationship: "AI-Owned"
      activation_rules:
        engagement_types: [Comment/Duet/Stitch/Share]
        natural_delay_range: [Min-Max minutes]
        voice_profile: [Link to persona]
```

---

## PROCESS

### Phase 1: Network Activation Sequence Design

Design the coordinated activation of network accounts.

```yaml
network_activation_framework:

  activation_tiers:

    tier_1_inner_circle:
      description: "Closest, most reliable accounts"
      timing: "T+5 to T+15 minutes"
      accounts:
        owned_accounts: "All relevant owned accounts"
        close_partners: "Partners with no notice requirement"
        personal_relationships: "Friends, close collaborators"

      engagement_types:
        instagram:
          - "Like immediately"
          - "Comment (substantive)"
          - "Share to Story with commentary"
          - "Save"
          - "DM to friends"
        tiktok:
          - "Like immediately"
          - "Comment (engaging)"
          - "Share"
          - "Add to favorites"
        youtube:
          - "Like"
          - "Comment"
          - "Subscribe prompt if relevant"
        linkedin:
          - "Like (reaction)"
          - "Comment"
          - "Share with commentary"
        x_twitter:
          - "Like"
          - "Reply"
          - "Retweet with quote"
          - "Bookmark"

      instructions:
        - "Engagement must appear organic (varied timing)"
        - "Comments must be substantive, not generic"
        - "Each account should have slightly different angle"

    tier_2_extended_network:
      description: "Broader network of partners and aligned accounts"
      timing: "T+20 to T+60 minutes"
      accounts:
        partner_accounts: "Partners with flexible notice"
        community_members: "Highly engaged community members"
        aligned_creators: "Creators in same niche"

      engagement_types:
        instagram:
          - "Like"
          - "Comment (adds perspective)"
          - "Share to Story (selective)"
        tiktok:
          - "Like"
          - "Comment"
          - "Stitch/Duet (if prepared)"
        youtube:
          - "Like"
          - "Comment"
        linkedin:
          - "Like"
          - "Comment (professional insight)"
        x_twitter:
          - "Like"
          - "Reply (thread contribution)"
          - "Quote tweet with addition"

      instructions:
        - "Natural timing variation (staggered)"
        - "Mix of engagement types"
        - "No obvious coordination appearance"

    tier_3_amplification_layer:
      description: "AI accounts and wider network for volume"
      timing: "T+60 to T+180 minutes"
      accounts:
        ai_accounts: "AI influencer accounts from S21-S24"
        broad_partners: "Wide network partners"

      engagement_types:
        platform_dependent: "Varies by platform and account persona"
        focus: "Comments that spark discussion"

      instructions:
        - "Must maintain authentic appearance"
        - "Each account follows its persona voice"
        - "Timing must not appear coordinated"
        - "Mix engagement types to avoid patterns"

  activation_choreography:
    minute_by_minute:
      t0:
        action: "Main account posts content"
        engagement: "Zero from network"

      t5:
        action: "Tier 1 — Account A"
        engagement: "Like + substantive comment"
        comment_angle: "[Specific angle for this account]"

      t8:
        action: "Tier 1 — Account B"
        engagement: "Like + different angle comment"
        comment_angle: "[Different specific angle]"

      t12:
        action: "Tier 1 — Account C"
        engagement: "Story share with commentary"

      t15:
        action: "Tier 1 — Account D"
        engagement: "Like + question comment"

      t20:
        action: "Tier 2 begins"
        note: "Staggered timing, 3-5 minute gaps"

      t60:
        action: "Tier 3 begins"
        note: "10-20 minute gaps, natural variation"
```

### Phase 2: Cross-Account Engagement Choreography

Coordinate accounts to create conversation, not just engagement.

```yaml
cross_account_choreography:

  conversation_threads:
    description: "Network accounts engage with each other to create visible conversation"

    thread_pattern_1:
      name: "Debate Thread"
      structure:
        account_1_comment: "Posts perspective A on content"
        account_2_reply: "Respectfully challenges with perspective B"
        main_account_response: "Acknowledges both, adds nuance"
        account_3_addition: "Adds supporting evidence for one side"

      rules:
        - "Disagreement must be civil and add value"
        - "Main account plays neutral/referee role"
        - "Conversation should invite organic participation"

    thread_pattern_2:
      name: "Story Expansion"
      structure:
        account_1_comment: "Shares related personal story"
        account_2_reply: "Asks follow-up question"
        account_1_response: "Provides more detail"
        main_account_response: "Connects story to content point"

      rules:
        - "Stories must be plausible for account"
        - "Questions should be genuinely curious"
        - "Main account amplifies the story"

    thread_pattern_3:
      name: "Value Add Chain"
      structure:
        account_1_comment: "Adds tip/insight not in content"
        account_2_reply: "Expands on that tip"
        account_3_addition: "Adds another related tip"
        main_account_response: "Thanks them, pins or highlights"

      rules:
        - "Tips must be genuinely valuable"
        - "Builds impression of expert community"
        - "Main account elevates the discussion"

  engagement_sequencing:

    instagram_sequence:
      goal: "Create visible engagement that attracts organic engagement"
      sequence:
        1: "3-4 substantive comments from Tier 1 (T+5-15)"
        2: "Main account replies to create conversation (T+10-20)"
        3: "Story shares with tag from partners (T+15-30)"
        4: "Second wave comments from Tier 2 (T+20-45)"
        5: "Pin best comment thread (T+30)"
        6: "Main account asks question in comments (T+45)"
        7: "Tier 3 responds to question (T+60+)"

    tiktok_sequence:
      goal: "Create comment velocity that triggers algorithm push"
      sequence:
        1: "Rapid likes from Tier 1 (T+2-10)"
        2: "Substantive comments from Tier 1 (T+5-15)"
        3: "Main account replies, creating threads (T+10-20)"
        4: "Tier 2 engagement wave (T+20-40)"
        5: "Stitch/Duet from prepared accounts (T+60-180)"
        6: "Tier 3 engagement for sustained momentum (T+60+)"

    youtube_sequence:
      goal: "Create early engagement signals for algorithm"
      sequence:
        1: "Likes from Tier 1 within first 5 minutes"
        2: "Comments from Tier 1 (T+5-15)"
        3: "Main account pins best comment"
        4: "Tier 2 comments over next hour"
        5: "Community posts referencing video"

    linkedin_sequence:
      goal: "Create visible professional engagement"
      sequence:
        1: "Reactions from Tier 1 (T+5-15)"
        2: "Thoughtful comments from Tier 1 (T+10-20)"
        3: "Main account replies, tags other experts"
        4: "Shares with commentary from partners (T+20-60)"
        5: "Second wave professional comments (T+30-90)"

    x_twitter_sequence:
      goal: "Create quote tweet chain and reply activity"
      sequence:
        1: "Likes and retweets from Tier 1 (T+2-10)"
        2: "Quote tweets with additions from Tier 1 (T+10-20)"
        3: "Reply thread participation (T+15-30)"
        4: "Tier 2 quote tweets and replies (T+30-60)"
        5: "Tier 3 engagement for volume (T+60+)"
```

### Phase 3: Stitch/Duet/Reaction Timing

Coordinate video response content from network accounts.

```yaml
video_response_coordination:

  stitch_strategy:
    platforms: ["TikTok", "Instagram Reels"]
    purpose: "Create additional content that references and promotes original"

    preparation:
      pre_production: "24-48 hours before main content publishes"
      requirements:
        - "Network account has stitch/duet prepared"
        - "Content adds genuine value, not just promotion"
        - "Different angle than original"

    timing:
      optimal_window: "T+60 to T+240 minutes"
      rationale: "After initial organic engagement, before momentum dies"

      sequence:
        first_stitch:
          timing: "T+60 to T+120"
          account_type: "Highest engagement network account"
          content_type: "Strong reaction + addition"

        second_stitch:
          timing: "T+180 to T+300"
          account_type: "Different niche perspective"
          content_type: "Contrarian or expanded view"

        third_stitch:
          timing: "T+24 hours"
          account_type: "Commentary/analysis account"
          content_type: "Recap or deep dive"

  duet_strategy:
    platforms: ["TikTok"]
    purpose: "Side-by-side content that creates new context"

    types:
      reaction_duet:
        description: "Account reacts to content in real-time"
        timing: "T+60 to T+120"
        authenticity_check: "Reaction must feel genuine"

      addition_duet:
        description: "Account adds their perspective alongside"
        timing: "T+120 to T+180"
        value_add: "Must contribute new information"

      humor_duet:
        description: "Account adds comedic spin"
        timing: "T+180+"
        risk_check: "Must align with brand tone"

  reaction_video_strategy:
    platforms: ["YouTube", "TikTok", "Instagram"]
    purpose: "Full reaction content that extends reach to new audiences"

    preparation:
      lead_time: "Can be done post-publish (within 24 hours)"
      planning: "Identify 2-3 network accounts with different audiences"

    execution:
      video_1:
        timing: "T+24 to T+48 hours"
        account: "Largest relevant reach"
        format: "Genuine reaction with commentary"
        hook: "Pulls clip from original as hook"

      video_2:
        timing: "T+48 to T+72 hours"
        account: "Different niche perspective"
        format: "Analysis or deep dive"
        hook: "Fresh angle on same content"

    coordination:
      main_account_response:
        - "Engage with reaction content"
        - "Share/feature in Stories"
        - "Tag and thank in community posts"
```

### Phase 4: Hashtag Coordination

Coordinate hashtag strategy across network.

```yaml
hashtag_coordination:

  strategy_principles:
    - "Never use identical hashtag sets across accounts"
    - "Mix of branded, niche, and trending hashtags"
    - "Each account uses hashtags natural to their persona"
    - "Coordinated push on 1-2 target hashtags"

  hashtag_tiers:

    tier_1_branded:
      description: "Owned or campaign-specific hashtags"
      usage: "Main account + 30% of network accounts"
      example: "#[BrandName] #[CampaignName]"

    tier_2_niche:
      description: "Niche-specific hashtags"
      usage: "All accounts, varied selection"
      example: "#[NicheKeyword] #[IndustryTerm]"

    tier_3_trending:
      description: "Currently trending relevant hashtags"
      usage: "Selective accounts, if genuinely relevant"
      example: "[Research current trends before each post]"

  coordination_matrix:
    main_account:
      hashtags:
        branded: 1-2
        niche: 3-5
        trending: 0-2
      placement: "First comment (Instagram) or integrated (others)"

    network_account_1:
      hashtags:
        branded: 1 (same as main)
        niche: 2-3 (different from main)
        trending: 1 (same as main if trending)

    network_account_2:
      hashtags:
        branded: 0-1
        niche: 3-4 (persona-appropriate)
        trending: 0-1

    # Pattern continues with variation

  trending_hashtag_protocol:
    research: "Check trending before post and at T+30"
    integration:
      - "If trending hashtag emerges relevant to content, update network instructions"
      - "Main account can add in first comment"
      - "Network accounts can use in stitch/duet content"
```

### Phase 5: Multi-Account Posting Sequences

Coordinate complementary content across multiple accounts.

```yaml
multi_account_posting:

  content_cascade:
    description: "Multiple accounts post related content in sequence"

    cascade_pattern_1:
      name: "Angle Expansion"
      timing: "Same day, staggered hours"
      structure:
        main_account:
          content: "Primary content (e.g., '5 rules for X')"
          time: "T0"

        network_account_1:
          content: "Expansion on Rule 1 (deep dive)"
          time: "T+4 hours"
          reference: "Subtle reference, not obvious cross-promo"

        network_account_2:
          content: "Contrarian take on one rule"
          time: "T+8 hours"
          reference: "Comments 'saw something about this today...'"

        network_account_3:
          content: "Personal story applying the rules"
          time: "T+24 hours"
          reference: "Tags main account in content"

    cascade_pattern_2:
      name: "Controversy Cascade"
      timing: "Compressed timeline for momentum"
      structure:
        main_account:
          content: "Posts controversial take"
          time: "T0"

        network_account_1:
          content: "Supports the take with evidence"
          time: "T+2 hours"

        network_account_2:
          content: "Challenges the take respectfully"
          time: "T+3 hours"

        main_account_followup:
          content: "Responds to the conversation"
          time: "T+6 hours"

      note: "Creates appearance of organic debate"

    cascade_pattern_3:
      name: "Trend Piling"
      timing: "Same day, close together"
      structure:
        main_account:
          content: "Trend-jacking content"
          time: "T0"

        network_accounts:
          content: "Each posts their take on same trend"
          time: "T+1 to T+4 hours, staggered"
          coordination: "Same core hashtag, different angles"

      note: "Creates appearance of multiple people talking about topic"

  platform_specific_patterns:

    tiktok_sound_cascade:
      description: "Multiple accounts use same sound"
      execution:
        - "Main account creates/uses sound"
        - "Network accounts use same sound with different content"
        - "Timing: spread over 24-48 hours"
        - "Each video tags main account or uses branded hashtag"

    instagram_collab_posts:
      description: "Use Instagram's collab feature"
      execution:
        - "Main account creates post"
        - "Invites network account as collaborator"
        - "Post appears on both profiles"
        - "Doubles initial reach"

    twitter_thread_relay:
      description: "Network accounts build on each other's threads"
      execution:
        - "Main account posts thread"
        - "Network account quotes with addition"
        - "Another network account quotes that"
        - "Creates chain of related content"
```

### Phase 6: Organic Appearance Maintenance

Critical protocols to ensure network activity appears natural.

```yaml
organic_appearance_protocol:

  timing_variation:
    rule: "Never have accounts engage at predictable intervals"

    implementation:
      engagement_gaps:
        minimum: "3 minutes between network engagements"
        maximum: "20 minutes between network engagements"
        pattern: "Random within range, not consistent"

      day_part_variation:
        - "Some accounts engage only mornings"
        - "Some accounts engage only evenings"
        - "Some accounts engage sporadically"

      off_days:
        - "Each network account has 1-2 'off days' per week"
        - "Rotate which days for each account"

  engagement_variation:
    rule: "Never have all accounts do same engagement type"

    implementation:
      engagement_mix:
        like_only: "20% of network engagements"
        comment_only: "10% of network engagements"
        like_plus_comment: "40% of network engagements"
        share_story: "15% of network engagements"
        save_only: "15% of network engagements"

      comment_variation:
        - "Different lengths"
        - "Different emoji usage"
        - "Different tones (per persona)"
        - "Some with questions, some without"

  content_independence:
    rule: "Network accounts must have independent content lives"

    implementation:
      independent_posting:
        - "Network accounts post their own content regularly"
        - "Not all posts are related to main account"
        - "Engagement with other creators in niche"

      engagement_breadth:
        - "Network accounts engage with multiple creators"
        - "Not just main account content"
        - "Natural interest patterns"

  detection_avoidance:
    platform_specific:
      instagram:
        - "Avoid engaging within 30 seconds of each other"
        - "Vary story viewing times"
        - "Mix DM shares vs public shares"

      tiktok:
        - "Don't all watch to same completion point"
        - "Vary rewatch behavior"
        - "Stagger stitch/duet timing"

      linkedin:
        - "Vary reaction types (not all 'like')"
        - "Comment lengths should vary significantly"
        - "Don't all share within same hour"

      twitter:
        - "Mix retweets and quote tweets"
        - "Vary reply length and style"
        - "Stagger engagement timing"

  authenticity_checks:
    weekly:
      - "Review engagement patterns for suspicious regularity"
      - "Audit comment quality from network accounts"
      - "Check for reported/flagged content"

    monthly:
      - "Full network behavior analysis"
      - "Account health check"
      - "Adjust patterns if needed"
```

---

## OUTPUT SPECIFICATION

### Network Amplification Plan (NAP)

```yaml
# NETWORK AMPLIFICATION PLAN (NAP)
# Campaign: [Name]
# Content: [Content ID]
# Created: [Date]
# Version: 1.0

nap_metadata:
  campaign_name:
  content_id:
  content_title:
  platform:
  post_time:
  amplification_priority: [High/Medium/Low]
  prepared_by:
  date_prepared:
  version: "1.0"

## SECTION 1: NETWORK ROSTER
network_roster:
  tier_1_accounts:
    - handle:
      platform:
      follower_count:
      relationship:
      activation_time:
      engagement_type:
      comment_text: |
      notes:

  tier_2_accounts:
    - handle:
      platform:
      follower_count:
      relationship:
      activation_time:
      engagement_type:
      comment_angle:
      notes:

  tier_3_accounts:
    - handle:
      platform:
      follower_count:
      relationship:
      activation_time:
      engagement_type:
      notes:

## SECTION 2: ACTIVATION SEQUENCE
activation_sequence:
  timeline:
    - time: "T+5"
      account:
      action:
      content: |

    - time: "T+8"
      account:
      action:
      content: |

    # [Continue for all activation points]

  conversation_threads:
    - thread_id:
      pattern: [Debate/Story/ValueAdd]
      participants: []
      structure: |

## SECTION 3: VIDEO RESPONSE COORDINATION
video_responses:
  stitches:
    - account:
      timing:
      content_brief: |
      status: [Prepared/Pending/Posted]

  duets:
    - account:
      timing:
      content_brief: |
      status: [Prepared/Pending/Posted]

  reactions:
    - account:
      timing:
      content_brief: |
      status: [Prepared/Pending/Posted]

## SECTION 4: HASHTAG COORDINATION
hashtag_strategy:
  primary_hashtag:
  secondary_hashtags: []

  per_account_hashtags:
    main_account: []
    network_account_1: []
    network_account_2: []
    # [Continue for all accounts]

## SECTION 5: MULTI-ACCOUNT POSTING
posting_cascade:
  pattern: [Angle/Controversy/Trend]
  sequence:
    - account:
      content_type:
      time:
      hook: |
      reference_to_main: |

## SECTION 6: ORGANIC APPEARANCE RULES
organic_rules:
  timing_variation:
    minimum_gap:
    maximum_gap:
    off_day_accounts: []

  engagement_variation:
    like_only_accounts: []
    full_engagement_accounts: []

  authenticity_checks:
    schedule:
    responsible:

## SECTION 7: CONTINGENCIES
contingencies:
  underperformance_response:
    trigger:
    action: []

  overperformance_response:
    trigger:
    action: []

  controversy_response:
    action: "Pause network engagement, await main account response"

## SECTION 8: METRICS
metrics:
  network_engagement_target:
    total_comments:
    total_likes:
    total_shares:
  organic_lift_target:
    percentage_increase_from_baseline:
  tracking_method:

## SOURCE FILES
source_files:
  content_package: "[path]"
  scheduling_choreography: "[path]"
  engagement_protocol: "[path]"
  network_roster: "[path]"
```

---

## QUALITY GATES

### Anti-Degradation Checks

```yaml
nap_quality_gates:

  roster_validation:
    - check: "All network accounts verified active"
      status: [Pass/Fail]

    - check: "Account relationships current"
      status: [Pass/Fail]

    - check: "Activation times realistic"
      status: [Pass/Fail]

  sequence_validation:
    - check: "No timing conflicts (accounts engaging simultaneously)"
      status: [Pass/Fail]

    - check: "Minimum gaps respected"
      status: [Pass/Fail]

    - check: "All comment content written"
      status: [Pass/Fail]

  organic_validation:
    - check: "Timing variation built in"
      status: [Pass/Fail]

    - check: "Engagement types varied"
      status: [Pass/Fail]

    - check: "Comment styles differentiated"
      status: [Pass/Fail]

    - check: "Off-day pattern established"
      status: [Pass/Fail]

  content_validation:
    - check: "All comment text unique"
      status: [Pass/Fail]

    - check: "Comments add value (not generic)"
      status: [Pass/Fail]

    - check: "Video response content prepared"
      status: [Pass/Fail]

  risk_validation:
    - check: "No obvious coordination signals"
      status: [Pass/Fail]

    - check: "Contingencies defined"
      status: [Pass/Fail]

quality_gate_decision: [APPROVED / REVISION REQUIRED]
revision_notes: "[If required, what needs fixing]"
```

---

## TEMPLATES

### Network Activation Checklist

```yaml
network_activation_checklist:
  content_id:
  post_time:

  pre_post:
    - [ ] Network accounts notified
    - [ ] Comment content distributed
    - [ ] Video responses prepared
    - [ ] Timing confirmed with all participants

  tier_1_activation:
    - [ ] Account A engaged at T+[X]
    - [ ] Account B engaged at T+[X]
    - [ ] Account C engaged at T+[X]
    - [ ] Account D engaged at T+[X]
    - [ ] All comments posted as planned

  tier_2_activation:
    - [ ] Staggered engagement begun
    - [ ] All tier 2 accounts engaged by T+60

  tier_3_activation:
    - [ ] AI accounts engaged
    - [ ] Broad network activated

  video_responses:
    - [ ] Stitch 1 posted at T+[X]
    - [ ] Duet 1 posted at T+[X]
    - [ ] Reaction video posted at T+[X]

  post_amplification:
    - [ ] Organic engagement verified
    - [ ] No platform flags detected
    - [ ] Metrics documented
```

### Comment Script Template

```yaml
comment_script_template:
  content_id:
  platform:

  tier_1_comments:
    account_1:
      handle:
      timing: "T+[X]"
      comment_text: |

      engagement_type: [Like+Comment/Comment Only/Share]
      notes:

    account_2:
      handle:
      timing: "T+[X]"
      comment_text: |

      engagement_type:
      notes:

    # [Continue for all Tier 1]

  conversation_thread:
    thread_starter:
      account:
      comment: |

    reply_1:
      account:
      reply_to: [Thread starter]
      comment: |

    reply_2:
      account:
      reply_to: [Reply 1 or Thread starter]
      comment: |

    main_account_response:
      comment: |

  tier_2_comment_angles:
    - angle: "[Specific angle]"
      assigned_to: "[Account]"
    - angle: "[Different angle]"
      assigned_to: "[Account]"
```

### Video Response Brief Template

```yaml
video_response_brief:
  content_id:
  original_content_summary: |

  stitch_brief:
    account:
    timing: "T+[X]"
    content_requirements:
      hook: |
      main_point: |
      cta: |
    technical_specs:
      length: "[Duration]"
      format: "[Format]"
    talking_points:
      - point: |
      - point: |
    dos:
      - |
    donts:
      - |

  duet_brief:
    account:
    timing: "T+[X]"
    reaction_style: [Genuine/Comedic/Analytical]
    key_moments_to_react:
      - timestamp: "[Time]"
        reaction: |
    talking_points:
      - |

  reaction_video_brief:
    account:
    timing: "T+[X]"
    format: "[Full reaction/Commentary/Analysis]"
    length: "[Duration]"
    key_sections:
      - section: |
        commentary: |
    promotion_approach: |
```

---

## EXAMPLES

### Example 1: Instagram Reel High-Priority Amplification

```yaml
example_instagram_amplification:
  content_id: "OME-2026-Q1-042"
  content_title: "The 5-Second Rule That Changed My Business"
  platform: "Instagram"
  post_time: "2026-03-15 12:30 PM EST"
  amplification_priority: "HIGH"

  network_activation:

    tier_1:
      - account: "@productivitycoach_jen"
        relationship: "Close partner"
        timing: "T+5 minutes (12:35 PM)"
        engagement: "Like + Comment"
        comment: "The third point literally changed how I run my morning routine. I tested this for 30 days and my productivity jumped 40%. Anyone else tried this?"
        notes: "Sets up conversation about point 3"

      - account: "@ceo_daily_tips"
        relationship: "Owned account"
        timing: "T+8 minutes (12:38 PM)"
        engagement: "Like + Comment"
        comment: "This is exactly what I've been trying to explain to my team. Sharing this in our Slack right now."
        notes: "Creates social proof + sharing behavior"

      - account: "@mindset_mastery_"
        relationship: "Partner"
        timing: "T+12 minutes (12:42 PM)"
        engagement: "Story share + Comment"
        comment: "The psychology behind #3 is fascinating. Most people don't realize how much their brain fights against quick decisions."
        story_text: "Just saw this and had to share - drop everything and watch @mainaccount's new Reel"
        notes: "Adds authority through psychology angle"

      - account: "@entrepreneurlife.co"
        relationship: "Owned account"
        timing: "T+15 minutes (12:45 PM)"
        engagement: "Like + Comment + Save"
        comment: "Question: How do you apply this to hiring decisions? Been struggling with analysis paralysis on team building."
        notes: "Creates question for main account to answer"

    conversation_thread:
      main_account_response_to_jen:
        timing: "T+18 minutes"
        reply: "40% is incredible! What specifically about point 3 made the biggest difference?"

      jen_reply:
        timing: "T+25 minutes"
        reply: "Honestly? I stopped second-guessing my first instinct. Turns out my gut was right 80% of the time and I was wasting energy overthinking."

      main_account_followup:
        timing: "T+28 minutes"
        reply: "This is exactly it. The 5-second window isn't about making perfect decisions — it's about trusting the pattern recognition you've already built. Pinning this thread."

    tier_2:
      - account: "@hustleandheart_"
        timing: "T+25 minutes"
        comment: "Saved. This is going in my 'watch on repeat' collection."

      - account: "@growthlab.io"
        timing: "T+35 minutes"
        comment: "The connection between decision speed and confidence is underrated. Great breakdown."

      - account: "@sidehustle_sarah"
        timing: "T+45 minutes"
        comment: "Starting to implement #2 today. Will report back."

      - account: "@buildinpublic_"
        timing: "T+55 minutes"
        comment: "This explains why my best launches happened when I stopped planning for months."

    video_responses:
      stitch_1:
        account: "@productivitycoach_jen"
        timing: "T+90 minutes"
        content: "Reaction to the 5-second rule + her 30-day experiment results"
        hook: "I tried this for 30 days and here's what happened..."

      stitch_2:
        account: "@mindset_mastery_"
        timing: "T+240 minutes"
        content: "Psychology deep dive on why this works"
        hook: "The neuroscience behind the 5-second rule..."

  organic_appearance:
    timing_variation:
      gaps_used: [5, 3, 4, 3, 7, 10, 10, 10]
      pattern: "Clustered in first 15 minutes, then spread out"

    engagement_variation:
      like_plus_comment: 60%
      story_share: 20%
      save: 20%

    off_post_behavior:
      - "@productivitycoach_jen engaged with 3 other creators before posting"
      - "@ceo_daily_tips posted their own content 2 hours before"

  results:
    network_engagement_total: "8 comments, 12 likes, 3 story shares, 2 saves"
    first_hour_organic_engagement: "47 comments, 312 likes"
    organic_lift_percentage: "+180% vs average"
```

### Example 2: TikTok Trend Response Network Activation

```yaml
example_tiktok_trend:
  content_id: "OME-2026-Q1-067"
  content_title: "My controversial take on [Trending Topic]"
  platform: "TikTok"
  post_time: "2026-03-18 10:30 AM EST"
  amplification_priority: "RAPID TREND"

  network_activation:

    compressed_timeline:
      note: "Trend content requires faster activation"

    tier_1:
      - account: "@techbro_takes"
        timing: "T+3 minutes"
        engagement: "Like + Comment"
        comment: "THIS. Finally someone said it."

      - account: "@honest_founder"
        timing: "T+5 minutes"
        engagement: "Comment"
        comment: "The last point is going to get you in trouble but you're 100% right"

      - account: "@ai_insights_daily"
        timing: "T+7 minutes"
        engagement: "Like + Comment + Share"
        comment: "Been waiting for someone to drop this take. The data supports this completely."

    tier_2:
      - account: "@startup_skeptic"
        timing: "T+12 minutes"
        engagement: "Comment (mild pushback)"
        comment: "I see your point but isn't the second point ignoring [X]?"

      main_account_reply:
        timing: "T+15 minutes"
        comment: "Fair point. Here's how I think about it: [nuance]. What's been your experience?"

    video_responses:
      duet_1:
        account: "@techbro_takes"
        timing: "T+45 minutes"
        content: "Duet agreeing and adding their take"
        hook: "Had to duet this because [reason]..."

      stitch_1:
        account: "@startup_skeptic"
        timing: "T+90 minutes"
        content: "Respectful counter-argument stitch"
        hook: "I love @mainaccount but here's where I disagree..."

      stitch_2:
        account: "@ai_insights_daily"
        timing: "T+3 hours"
        content: "Data/evidence supporting the take"
        hook: "Here's the data that proves @mainaccount right..."

    hashtag_coordination:
      trending_hashtag: "#[TrendingTopic]"
      coordinated_use:
        main_account: "#[TrendingTopic] #ContrarianTake #TechTwitter"
        network_1: "#[TrendingTopic] #HotTake"
        network_2: "#[TrendingTopic] #FounderLife"
        network_3: "#[TrendingTopic] #AITakes"

  results:
    trend_amplification: "Content appeared in trend cluster"
    video_responses_generated: 3 (planned) + 7 (organic)
    reach_vs_average: "+450%"
```

---

## VALIDATION REQUIREMENTS

NAP passes when:

- [ ] All network accounts verified and active
- [ ] Activation sequence fully defined with times
- [ ] All comment content written and unique
- [ ] Video responses prepared (if planned)
- [ ] Hashtag coordination documented
- [ ] Organic appearance rules implemented
- [ ] Timing variation built into plan
- [ ] Engagement type variation specified
- [ ] Contingencies defined
- [ ] No obvious coordination patterns

---

## OUTPUT LOCATION

Save NAP to:
```
skills/distribution/S17-network-amplification/outputs/[campaign]-[content-id]-NAP.yaml
```

---

## NEXT SKILL

Upon completion, S18: Repurpose Multiplication takes successful content and multiplies its reach through format transformation.

---

*A single post is a whisper. A coordinated network is a chorus. The algorithm cannot ignore a chorus — but the chorus must sound organic or it becomes noise.*
