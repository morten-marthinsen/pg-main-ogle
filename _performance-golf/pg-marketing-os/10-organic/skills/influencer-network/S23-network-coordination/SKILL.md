---
name: network-coordination
description: >-
  Orchestrate cross-account amplification, coordinate engagement patterns, and
  execute network-wide campaigns across the AI influencer network. Use when
  multiple influencer accounts need to work together for amplification while
  maintaining organic appearance. Produces network coordination plans with
  engagement timing matrices, cross-promotion sequences, collaborative content
  briefs, and detection-avoidance patterns. Trigger when users mention network
  coordination, cross-account amplification, collaborative campaigns, network-wide
  strategy, or coordinating multiple influencer accounts. Requires Persona Bibles
  (S21) and Account Strategies (S22).
---

# S23: NETWORK COORDINATION

## SKILL IDENTITY

**Skill ID:** S23-network-coordination
**Name:** Network Coordination
**Version:** 1.0.0
**Purpose:** Orchestrate cross-account amplification, coordinate engagement patterns, and execute network-wide campaigns while maintaining organic appearance and avoiding detection patterns
**Position in Pipeline:** Third skill in Influencer Network cluster (S21 → S22 → S23 → S24)
**Upstream Dependencies:** S21-Persona Architect (Persona Bibles), S22-Account Strategy (Individual strategies)
**Downstream Consumers:** S24-Monetization Engine, Campaign Execution Teams

## ANTI-DEGRADATION

- Read `S23-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `~system/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## PREREQUISITES (Gate Requirements)

### Required Before Execution

| Gate | Requirement | Validation Method |
|------|-------------|-------------------|
| G1 | Minimum 3 personas with complete Persona Bibles | Documents verified |
| G2 | All account strategies complete (S22) | Strategy files exist |
| G3 | All accounts active with 30+ days history | Account age verified |
| G4 | Minimum 500 followers per account | Follower count check |
| G5 | Engagement patterns established | 30-day engagement history |
| G6 | Coordination tools configured | Access verified |
| G7 | Detection risk assessment complete | Risk matrix approved |

### Soft Prerequisites (Recommended)

- Network relationship map defined
- Timing zone coverage analyzed
- Hashtag coordination strategy drafted
- Emergency protocols established
- Legal/compliance sign-off on coordination approach

---

## INPUT REQUIREMENTS

### Required Inputs

```yaml
network_config:
  personas: array (minimum 3)
  total_accounts: integer
  platforms_covered: array
  network_type: enum [tight, loose, hybrid]
  master_brand_visibility: enum [overt, covert, hybrid]

account_data:
  - persona_id: string
    accounts:
      - platform: string
        handle: string
        follower_count: integer
        engagement_rate: number
        posting_schedule: object
        timezone: string

relationship_map:
  - persona_a: string
    persona_b: string
    relationship_type: enum [friends, colleagues, mentor_mentee, acquaintances, rivals]
    interaction_frequency: enum [high, medium, low]
    interaction_style: string

coordination_parameters:
  engagement_naturalness_score_target: number (0-100)
  campaign_injection_frequency: string
  cross_promotion_limits: object
  detection_risk_tolerance: enum [very_low, low, medium]
```

### Optional Inputs

```yaml
campaign_calendar: array (scheduled campaigns)
competitor_networks: array (for differentiation)
platform_algorithm_notes: object
historical_coordination_data: object
brand_partnership_schedule: array
```

---

## PROCESS (Step-by-Step Execution Protocol)

### Phase 1: Network Relationship Architecture

**Duration:** 45-60 minutes

**Step 1.1: Relationship Type Definition**

Define authentic relationship types between personas:

```yaml
relationship_types:
  friends:
    description: "Genuine friendship, personal connection"
    interaction_pattern: "Casual, personal comments, inside jokes"
    engagement_frequency: "High (3-5x per week)"
    public_indicators: "Tagged in personal content, birthday wishes"
    example_interactions:
      - "lol you would say that 😂"
      - "coffee soon??"
      - "[inside reference from shared backstory]"

  colleagues:
    description: "Professional relationship, mutual respect"
    interaction_pattern: "Professional support, knowledge sharing"
    engagement_frequency: "Medium (1-2x per week)"
    public_indicators: "Professional shoutouts, collaborative content"
    example_interactions:
      - "Great breakdown of this!"
      - "Adding to this thread..."
      - "Your work on [topic] is always so good"

  mentor_mentee:
    description: "Teaching/learning dynamic"
    interaction_pattern: "Guidance, questions, appreciation"
    engagement_frequency: "Medium (1-2x per week)"
    public_indicators: "Credit given, advice asked/given"
    example_interactions:
      - mentor: "This is exactly what I was talking about in my post last week"
      - mentee: "Learned this from @[mentor]'s guide"
      - mentee: "Quick question - how do you handle [situation]?"

  acquaintances:
    description: "Know each other, occasional interaction"
    interaction_pattern: "Casual engagement, low intimacy"
    engagement_frequency: "Low (2-4x per month)"
    public_indicators: "Occasional likes, surface comments"
    example_interactions:
      - "Nice!"
      - "Interesting take"
      - "Following for more of this"

  rivals:
    description: "Friendly competition, different perspectives"
    interaction_pattern: "Respectful disagreement, banter"
    engagement_frequency: "Low-Medium (occasional debates)"
    public_indicators: "Duets/responses with different takes"
    example_interactions:
      - "Respectfully disagree here..."
      - "Okay but have you considered..."
      - "The friendly competition continues 😤"
```

**Step 1.2: Network Relationship Matrix**

Map all persona-to-persona relationships:

```
NETWORK RELATIONSHIP MATRIX

              | P001    | P002    | P003    | P004    | P005    |
--------------|---------|---------|---------|---------|---------|
P001 (Maya)   |    -    | Friends | Mentor  | Acquaint| Colleague|
P002 (Jordan) | Friends |    -    | Rivals  | Colleague| Friends |
P003 (Sam)    | Mentee  | Rivals  |    -    | Friends | Acquaint|
P004 (Alex)   | Acquaint| Colleague| Friends |    -    | Mentor  |
P005 (Taylor) | Colleague| Friends | Acquaint| Mentee  |    -    |

INTERACTION FREQUENCY KEY:
🟢 High (3-5x/week)
🟡 Medium (1-2x/week)
🟠 Low (2-4x/month)
⚪ Minimal (as needed)
```

**Step 1.3: Relationship Backstory Creation**

For each relationship, create believable backstory:

```yaml
relationship_backstories:
  - personas: ["P001", "P002"]
    relationship: "friends"
    origin: "Met at a content creator conference in 2023, bonded over shared frustration with AI tool pricing"
    shared_history:
      - "Both posted about the same AI tool launch within hours"
      - "Did a collaborative live about prompt engineering"
      - "Occasional references to 'that networking event'"
    inside_references:
      - "The thing" (refers to a shared inside joke)
      - "Conference energy" (callback to how they met)
    public_touchpoints:
      - "Joint live in March 2024"
      - "Tagged in each other's stories occasionally"
```

---

### Phase 2: Cross-Account Engagement Protocols

**Duration:** 60-90 minutes

**Step 2.1: Natural Interaction Patterns**

Define engagement patterns that appear organic:

```yaml
engagement_protocols:
  comment_engagement:
    timing:
      min_delay_after_post: "5 minutes"
      max_delay_after_post: "48 hours"
      natural_window: "15 min - 6 hours (80% of engagements)"

    frequency_caps:
      max_comments_per_day_per_pair: 2
      max_comments_per_week_per_pair: 5
      min_gap_between_comments: "4 hours"

    comment_types:
      supportive:
        frequency: "40%"
        examples:
          - "This is so helpful!"
          - "Needed this today"
          - "Your [pillar] content is always 🔥"

      additive:
        frequency: "30%"
        examples:
          - "Adding to this - I've found that..."
          - "Yes and also [related insight]"
          - "This reminds me of [related concept]"

      question:
        frequency: "15%"
        examples:
          - "Have you tried [thing]?"
          - "Curious how you handle [situation]?"
          - "What's your take on [related topic]?"

      personal:
        frequency: "15%"
        examples:
          - "We were literally just talking about this!"
          - "lol this is so you"
          - "[Inside reference]"

  like_engagement:
    frequency: "Like 70-90% of posts, varies by relationship"
    timing: "Random within first 24 hours"
    pattern: "Don't like every post - occasional misses feel natural"

  share_engagement:
    frequency: "Share 5-15% of posts, only exceptional content"
    timing: "Usually within first 6 hours"
    caption_style: "Genuine recommendation, not promotional"
    examples:
      - "Been following [name] for a while - this is their best one yet"
      - "Okay I don't usually share stuff but this 👆"
      - "My friend said this better than I could"

  save_engagement:
    note: "Not public, but contributes to algorithm"
    frequency: "Save 20-40% of posts"
    timing: "Random, can be delayed"
```

**Step 2.2: Comment Quality Guidelines**

```yaml
comment_quality_standards:
  minimum_length: "3+ words (except for specific friends dynamics)"

  avoid_patterns:
    - "Always being first commenter"
    - "Identical comment structures"
    - "Too much praise (feels fake)"
    - "Never disagreeing (feels orchestrated)"
    - "Same emojis every time"
    - "Commenting at exactly the same time"

  authenticity_markers:
    - "Occasional typos (not forced)"
    - "Platform-specific slang"
    - "Reference to previous conversations"
    - "Occasional questions that show genuine curiosity"
    - "Sometimes just emojis for close friends"
    - "Different energy based on relationship type"

  red_flags_to_avoid:
    - "Every comment mentions how great they are"
    - "Always being the first 3 comments"
    - "Comments that sound like reviews"
    - "Perfect grammar when persona wouldn't have it"
    - "Same comment template visible"
```

**Step 2.3: Platform-Specific Protocols**

```yaml
platform_protocols:
  instagram:
    comment_visibility: "High (top comments shown)"
    timing_strategy: "Quick engagement wins 'top comment' position"
    additional_actions:
      - "Story replies (more intimate)"
      - "Story shares with reaction"
      - "Reel duets/remixes"
    cross_promotion_limits:
      tagged_posts: "2-3 per month max"
      story_mentions: "1-2 per week max"
      collab_posts: "1 per month max"

  tiktok:
    comment_visibility: "Algorithm-driven (engagement-based)"
    timing_strategy: "Early comments get visibility"
    additional_actions:
      - "Duets (powerful cross-promotion)"
      - "Stitches (add context)"
      - "Reply videos"
    cross_promotion_limits:
      duets: "1-2 per month"
      stitches: "2-3 per month"
      comment threads: "Unlimited if natural"

  youtube:
    comment_visibility: "Owner can pin, algorithm shows 'engaging' comments"
    timing_strategy: "Less time-sensitive, quality matters more"
    additional_actions:
      - "Community post engagement"
      - "Premiere chat participation"
    cross_promotion_limits:
      channel mentions: "1-2 per month"
      collab videos: "1 per quarter"

  twitter:
    comment_visibility: "Chronological + engagement"
    timing_strategy: "Speed matters for visibility"
    additional_actions:
      - "Quote tweets"
      - "Thread additions"
      - "Retweets with comment"
    cross_promotion_limits:
      quote_tweets: "3-4 per month"
      mentions: "Weekly acceptable"

  linkedin:
    comment_visibility: "Engagement-based"
    timing_strategy: "First hour matters most"
    additional_actions:
      - "Shares with commentary"
      - "Tagging in relevant discussions"
    cross_promotion_limits:
      shares: "1-2 per week"
      tags: "Occasional, professional context"
```

---

### Phase 3: Amplification Choreography

**Duration:** 45-60 minutes

**Step 3.1: Viral Moment Protocol**

When one persona's content starts performing, trigger network amplification:

```yaml
viral_amplification_protocol:
  trigger_thresholds:
    instagram:
      views_velocity: "10x normal within first 2 hours"
      engagement_velocity: "5x normal engagement rate"
    tiktok:
      views_velocity: "20x normal within first hour"
      fyp_indicator: "Views significantly exceeding followers"
    youtube:
      views_velocity: "5x normal within first 6 hours"
    twitter:
      retweet_velocity: "10x normal within first hour"

  amplification_sequence:
    phase_1_immediate:
      timing: "Within 30 minutes of viral detection"
      actions:
        - "Closest relationship persona comments (authentic, not promotional)"
        - "All personas save/like"
        - "1-2 personas share to stories (genuine reaction)"
      example_comments:
        - "This is going to blow up lol"
        - "Finally the algorithm recognizes you!!"
        - "Okay this one is GOOD good"

    phase_2_wave:
      timing: "2-6 hours after viral detection"
      actions:
        - "Remaining personas engage organically"
        - "Quote tweets/stitches if platform appropriate"
        - "Cross-platform mentions (natural discovery framing)"
      example_framing:
        - "Just saw this going viral, and honestly deserved"
        - "Apparently [name] broke the internet today"

    phase_3_sustain:
      timing: "24-72 hours"
      actions:
        - "Reply to comments on viral post (engagement)"
        - "Create 'response' content from other personas"
        - "Keep engagement visible"
      example_content:
        - "Responding to @[viral persona]'s point about..."
        - "The discourse around [topic] got me thinking..."
```

**Step 3.2: Coordinated Post Timing**

```yaml
timing_coordination:
  same_topic_posts:
    rule: "Never post on same topic within 24 hours"
    spacing: "Minimum 48 hours between similar topic posts"
    sequencing: "If planned, persona 1 posts, persona 2 reacts/adds"

  daily_schedule_coordination:
    rule: "Distribute posting times to avoid pattern"
    method: "Stagger primary posting windows"
    example:
      persona_1: "Morning focus (6-9 AM)"
      persona_2: "Midday focus (11 AM-2 PM)"
      persona_3: "Evening focus (5-8 PM)"

  engagement_window_coordination:
    rule: "Don't all engage in same 10-minute window"
    method: "Randomize engagement timing within larger window"
    timing_variance: "+/- 30 minutes from trigger"

  campaign_coordination:
    rule: "Cascade don't cluster"
    method: "Staggered posts over 3-7 days"
    example_schedule:
      day_1: "Persona 1 introduces topic"
      day_3: "Persona 2 adds perspective"
      day_5: "Persona 3 debates/challenges"
      day_7: "Persona 1 responds/synthesizes"
```

**Step 3.3: Hashtag Coordination**

```yaml
hashtag_coordination:
  shared_hashtags:
    strategy: "Some overlap is natural, complete overlap is suspicious"
    overlap_target: "20-40% hashtag overlap between personas"
    shared_hashtags:
      - "#[niche hashtag 1]"
      - "#[niche hashtag 2]"
      - "#[broad topic hashtag]"
    persona_specific:
      persona_1: ["#unique1a", "#unique1b", "#unique1c"]
      persona_2: ["#unique2a", "#unique2b", "#unique2c"]
      persona_3: ["#unique3a", "#unique3b", "#unique3c"]

  branded_hashtag_protocol:
    if_master_brand_overt:
      approach: "All personas occasionally use brand hashtag"
      frequency: "10-20% of posts"
    if_master_brand_covert:
      approach: "No shared branded hashtags"
      frequency: "0%"

  trending_hashtag_coordination:
    rule: "Don't all jump on same trend simultaneously"
    method: "First-mover advantage to one persona, others observe"
    exception: "Major industry events (conferences, launches)"
```

---

### Phase 4: Network Effect Mapping

**Duration:** 30-45 minutes

**Step 4.1: Audience Flow Mapping**

Map how audiences flow between accounts:

```
AUDIENCE FLOW MAP

[Entry Points]
├── Persona 1 (Maya) - Beginners discovering AI tools
│   └── Flow to: Persona 3 (Sam) for tool recommendations
│   └── Flow to: Persona 2 (Jordan) for deeper strategy
│
├── Persona 2 (Jordan) - Advanced users seeking perspective
│   └── Flow to: Persona 1 (Maya) for practical tutorials
│   └── Flow to: Persona 3 (Sam) for specific tools
│
└── Persona 3 (Sam) - Tool-curious users wanting recommendations
    └── Flow to: Persona 1 (Maya) for how-to
    └── Flow to: Persona 2 (Jordan) for strategic context

[Cross-Pollination Triggers]
• Persona 1 mentions tool → Persona 3 does deep review
• Persona 2 debates concept → Persona 1 makes tutorial
• Persona 3 reviews tool → Persona 1 shows workflow
```

**Step 4.2: Complementary Content Strategy**

```yaml
complementary_content:
  topic_handoffs:
    scenario: "AI Writing Tools"
    execution:
      persona_1:
        role: "How to use"
        content: "Step-by-step ChatGPT tutorial"
      persona_2:
        role: "When and why"
        content: "Strategy for AI in content workflow"
      persona_3:
        role: "Which one"
        content: "ChatGPT vs Claude vs Jasper comparison"
    cross_references:
      - "Persona 1 mentions 'If you want to know WHICH tool, check @persona3'"
      - "Persona 2 mentions 'For the how-to, @persona1 has the best guide'"
      - "Persona 3 mentions 'Once you pick a tool, @persona1 shows you how'"

  content_sequencing:
    week_1:
      persona_1: "Problem awareness content"
    week_2:
      persona_2: "Solution framework content"
    week_3:
      persona_3: "Tool recommendation content"
    week_4:
      persona_1: "Implementation tutorial"
    result: "Audience exposed to all three, each adds unique value"
```

**Step 4.3: Network Value Ladder**

```yaml
network_value_ladder:
  level_1_discovery:
    entry_personas: ["Persona 1", "Persona 3"]
    content_type: "Quick wins, tips, tools"
    audience_state: "Problem aware, seeking solutions"

  level_2_education:
    progression_personas: ["Persona 1", "Persona 2"]
    content_type: "Tutorials, frameworks, deeper content"
    audience_state: "Solution aware, learning implementation"

  level_3_transformation:
    authority_personas: ["Persona 2"]
    content_type: "Strategy, mindset, advanced concepts"
    audience_state: "Implementing, seeking optimization"

  level_4_community:
    all_personas: true
    content_type: "Discussion, collaboration, user spotlights"
    audience_state: "Loyal followers, potential customers"
```

---

### Phase 5: Campaign Injection Protocols

**Duration:** 45-60 minutes

**Step 5.1: Campaign Types and Approaches**

```yaml
campaign_types:
  product_launch:
    description: "Introducing new product/offer through network"
    approach: "Cascading awareness → education → conversion"
    persona_roles:
      awareness_driver: "Persona with highest reach"
      educator: "Persona with highest trust"
      converter: "Persona with strongest CTA history"
    timeline: "2-3 weeks"

  brand_partnership:
    description: "Sponsored content across network"
    approach: "Authentic integration, staggered posting"
    persona_roles:
      primary: "Most relevant persona for brand"
      amplifiers: "Other personas engage/share"
    timeline: "1-2 weeks"

  awareness_campaign:
    description: "Building awareness for concept/topic"
    approach: "Multi-perspective exploration"
    persona_roles:
      introducer: "First to raise topic"
      debater: "Challenges/adds nuance"
      synthesizer: "Summarizes discussion"
    timeline: "1-2 weeks"

  community_event:
    description: "Live events, challenges, campaigns"
    approach: "Coordinated participation"
    persona_roles:
      host: "Primary event runner"
      participants: "Active engaged members"
    timeline: "Event-dependent"
```

**Step 5.2: Campaign Injection Playbook**

```yaml
campaign_injection_playbook:
  pre_campaign:
    timing: "1-2 weeks before"
    actions:
      - "Organic content in campaign topic area (priming)"
      - "Establish conversation around related themes"
      - "No direct campaign mentions"
    example:
      campaign: "AI writing tool launch"
      pre_content:
        - "Persona 1: 'The tools I'm currently using for X...'"
        - "Persona 2: 'Why current tools are missing something...'"
        - "Persona 3: 'What I wish AI tools would do better...'"

  campaign_launch:
    timing: "Day 1-3"
    actions:
      - "Primary persona introduces campaign/product"
      - "Natural discovery framing from other personas"
      - "Engagement appears organic (not simultaneous)"
    sequence:
      hour_0: "Primary persona posts announcement"
      hour_2-4: "Closest relationship persona comments genuinely"
      hour_6-12: "Other personas engage (likes, saves)"
      hour_24: "One persona shares with genuine reaction"
      hour_48: "Another persona creates related content"

  campaign_sustain:
    timing: "Day 4-14"
    actions:
      - "Multiple perspectives on campaign topic"
      - "User-generated content encouragement"
      - "Q&A and objection handling across personas"
    content_distribution:
      - "Persona 1: Tutorial using campaign product"
      - "Persona 2: Strategic perspective on campaign topic"
      - "Persona 3: Comparison/review if product"

  campaign_close:
    timing: "Final 2-3 days"
    actions:
      - "Urgency content from relevant personas"
      - "Social proof compilation"
      - "Final push with natural scarcity"
```

**Step 5.3: Message Coordination**

```yaml
message_coordination:
  core_message_consistency:
    rule: "Same core message, different voices"
    example:
      core_message: "AI tools save time without sacrificing quality"
      persona_1_version: "Here's how I cut my content time in half with AI"
      persona_2_version: "The quality argument against AI is outdated"
      persona_3_version: "5 tools that actually deliver on the time-saving promise"

  talking_points_distribution:
    method: "Each persona owns specific angles"
    example:
      campaign: "Course launch"
      persona_1_angles:
        - "Course methodology and what you'll learn"
        - "My journey creating this curriculum"
      persona_2_angles:
        - "Why this approach is different/better"
        - "Strategic implications of these skills"
      persona_3_angles:
        - "Value comparison to alternatives"
        - "Who this is (and isn't) for"

  objection_handling_distribution:
    method: "Different personas address different objections"
    objection_map:
      "Too expensive": "Persona 2 (value argument)"
      "Don't have time": "Persona 1 (efficiency proof)"
      "Not sure if right for me": "Persona 3 (comparison/fit)"
      "Can learn this free": "Persona 2 (quality/curation argument)"
```

---

### Phase 6: Organic Appearance Maintenance

**Duration:** 60-90 minutes (critical)

**Step 6.1: Detection Pattern Avoidance**

```yaml
detection_avoidance:
  red_flag_patterns_to_avoid:
    timing_patterns:
      - "All accounts posting at exactly same times"
      - "Engagement always within 5 minutes of post"
      - "Identical engagement velocity across posts"
      - "Suspiciously perfect 'first comment' rate"

    content_patterns:
      - "Same talking points word-for-word"
      - "Identical hashtag sets"
      - "Cross-posting exact content"
      - "Always praising never disagreeing"

    engagement_patterns:
      - "Only engaging with each other (no external)"
      - "Engagement ratios that don't match follower ratios"
      - "Comment patterns that feel templated"
      - "Never missing each other's content"

    technical_patterns:
      - "Same IP address for engagement"
      - "Same device fingerprints"
      - "Identical posting tools"
      - "Coordinated link shorteners"

  countermeasures:
    timing:
      - "Randomize engagement delays (+/- 30 min minimum)"
      - "Vary posting times within window"
      - "Occasionally 'miss' posts (don't engage with every single one)"
      - "Different engagement patterns per relationship type"

    content:
      - "Never use same wording for same point"
      - "Unique hashtag sets per persona (some overlap natural)"
      - "Occasional public disagreements"
      - "Different content formats for same topics"

    engagement:
      - "80% of engagement should be OUTSIDE the network"
      - "Engage with external accounts more than internal"
      - "Comment quality varies (not always long/thoughtful)"
      - "Different emoji usage per persona"

    technical:
      - "Different devices/IP addresses per account"
      - "Varied posting tools or manual posting"
      - "Different link structures"
      - "Avoid coordinated automation"
```

**Step 6.2: External Engagement Requirements**

```yaml
external_engagement:
  requirement: "Each persona MUST have robust external engagement"

  ratios:
    internal_to_external: "1:4 minimum (1 internal, 4 external)"
    explanation: "For every comment on a network persona, 4+ on external"

  external_engagement_targets:
    daily_per_persona:
      comments_on_external_accounts: "10-20"
      follows_of_external_accounts: "5-10"
      shares_of_external_content: "1-3"

  target_account_types:
    tier_1_similar_niche: "30% of external engagement"
    tier_2_adjacent_niche: "40% of external engagement"
    tier_3_general_interest: "30% of external engagement"

  external_engagement_guidelines:
    - "Build genuine relationships with external creators"
    - "Comment quality should match internal comments"
    - "Occasional collaborations with external accounts"
    - "Join external conversations and trends"
```

**Step 6.3: Naturalness Scoring System**

```yaml
naturalness_audit:
  scoring_dimensions:
    timing_naturalness:
      weight: 25
      indicators:
        - "Engagement timing variance"
        - "Posting time consistency with persona 'lifestyle'"
        - "Gap variance between engagements"

    content_naturalness:
      weight: 25
      indicators:
        - "Voice consistency with Persona Bible"
        - "Topic relevance to persona expertise"
        - "Format variety"

    engagement_naturalness:
      weight: 25
      indicators:
        - "Internal vs external ratio"
        - "Comment variety"
        - "Engagement depth variety"

    relationship_naturalness:
      weight: 25
      indicators:
        - "Relationship-appropriate interactions"
        - "Backstory consistency"
        - "Evolution over time"

  scoring_scale:
    90-100: "Indistinguishable from organic"
    75-89: "Highly natural, minor adjustments needed"
    60-74: "Acceptable, review recommended"
    below_60: "Risk zone - immediate review required"

  audit_frequency: "Weekly"

  audit_template:
    persona_id: string
    week: string
    timing_score: integer
    content_score: integer
    engagement_score: integer
    relationship_score: integer
    total_score: integer
    notes: string
    action_items: array
```

---

### Phase 7: Network Coordination Playbook Assembly

**Duration:** 30-45 minutes

Compile all protocols into the definitive Network Coordination Playbook.

---

## OUTPUT SPECIFICATION

### Primary Deliverable: Network Coordination Playbook

One comprehensive playbook for the entire network:

```
NETWORK COORDINATION PLAYBOOK
Version: 1.0
Created: [Date]
Last Updated: [Date]
Network ID: [ID]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1: NETWORK OVERVIEW
├── Persona Roster
├── Relationship Matrix
├── Platform Distribution
└── Coordination Parameters

SECTION 2: RELATIONSHIP ARCHITECTURE
├── Relationship Definitions
├── Relationship Backstories
├── Interaction Guidelines
└── Evolution Roadmap

SECTION 3: ENGAGEMENT PROTOCOLS
├── Cross-Account Engagement Rules
├── Platform-Specific Protocols
├── Comment Templates (Per Relationship)
└── Engagement Frequency Caps

SECTION 4: AMPLIFICATION CHOREOGRAPHY
├── Viral Moment Protocol
├── Timing Coordination
├── Hashtag Strategy
└── Cascade Sequences

SECTION 5: NETWORK EFFECT MAP
├── Audience Flow Diagram
├── Complementary Content Strategy
├── Value Ladder
└── Cross-Promotion Opportunities

SECTION 6: CAMPAIGN INJECTION
├── Campaign Types
├── Injection Playbook
├── Message Coordination
└── Campaign Calendar

SECTION 7: ORGANIC APPEARANCE
├── Detection Avoidance
├── External Engagement Requirements
├── Naturalness Audit
└── Risk Monitoring

SECTION 8: OPERATIONAL PROCEDURES
├── Daily Coordination Checklist
├── Weekly Review Process
├── Emergency Protocols
└── Escalation Procedures

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Secondary Deliverables

1. **Relationship Quick Reference Cards**
   - One-page reference per relationship pair
   - Interaction examples and limits

2. **Campaign Coordination Templates**
   - Fill-in templates for campaign execution
   - Timeline and responsibility matrices

3. **Naturalness Audit Scorecards**
   - Weekly audit templates
   - Historical tracking sheets

---

## OUTPUT SCHEMAS

### Network Coordination Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "NetworkCoordination",
  "type": "object",
  "required": ["network_id", "personas", "relationships", "engagement_protocols", "amplification_choreography"],
  "properties": {
    "network_id": {"type": "string"},
    "version": {"type": "string"},
    "last_updated": {"type": "string", "format": "date"},
    "personas": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["persona_id", "name", "platforms"],
        "properties": {
          "persona_id": {"type": "string"},
          "name": {"type": "string"},
          "platforms": {"type": "array", "items": {"type": "string"}}
        }
      }
    },
    "relationships": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["persona_a", "persona_b", "type", "frequency"],
        "properties": {
          "persona_a": {"type": "string"},
          "persona_b": {"type": "string"},
          "type": {"type": "string", "enum": ["friends", "colleagues", "mentor_mentee", "acquaintances", "rivals"]},
          "frequency": {"type": "string", "enum": ["high", "medium", "low", "minimal"]},
          "backstory": {"type": "string"},
          "interaction_style": {"type": "string"},
          "example_interactions": {"type": "array", "items": {"type": "string"}},
          "inside_references": {"type": "array", "items": {"type": "string"}}
        }
      }
    },
    "engagement_protocols": {
      "type": "object",
      "required": ["comment_engagement", "like_engagement", "share_engagement"],
      "properties": {
        "comment_engagement": {
          "type": "object",
          "properties": {
            "timing": {"type": "object"},
            "frequency_caps": {"type": "object"},
            "comment_types": {"type": "object"}
          }
        },
        "like_engagement": {"type": "object"},
        "share_engagement": {"type": "object"},
        "platform_specific": {
          "type": "object",
          "additionalProperties": {"type": "object"}
        }
      }
    },
    "amplification_choreography": {
      "type": "object",
      "required": ["viral_protocol", "timing_coordination", "hashtag_coordination"],
      "properties": {
        "viral_protocol": {
          "type": "object",
          "properties": {
            "trigger_thresholds": {"type": "object"},
            "amplification_sequence": {"type": "object"}
          }
        },
        "timing_coordination": {"type": "object"},
        "hashtag_coordination": {"type": "object"}
      }
    },
    "network_effect_map": {
      "type": "object",
      "properties": {
        "audience_flow": {"type": "object"},
        "complementary_content": {"type": "object"},
        "value_ladder": {"type": "object"}
      }
    },
    "campaign_protocols": {
      "type": "object",
      "properties": {
        "campaign_types": {"type": "object"},
        "injection_playbook": {"type": "object"},
        "message_coordination": {"type": "object"}
      }
    },
    "organic_maintenance": {
      "type": "object",
      "required": ["detection_avoidance", "external_engagement", "naturalness_audit"],
      "properties": {
        "detection_avoidance": {"type": "object"},
        "external_engagement": {"type": "object"},
        "naturalness_audit": {"type": "object"}
      }
    }
  }
}
```

### Relationship Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Relationship",
  "type": "object",
  "required": ["relationship_id", "persona_a", "persona_b", "type"],
  "properties": {
    "relationship_id": {"type": "string"},
    "persona_a": {"type": "string"},
    "persona_b": {"type": "string"},
    "type": {
      "type": "string",
      "enum": ["friends", "colleagues", "mentor_mentee", "acquaintances", "rivals"]
    },
    "direction": {
      "type": "string",
      "enum": ["mutual", "a_to_b", "b_to_a"],
      "description": "For asymmetric relationships like mentor_mentee"
    },
    "frequency": {
      "type": "string",
      "enum": ["high", "medium", "low", "minimal"]
    },
    "backstory": {
      "type": "object",
      "properties": {
        "origin": {"type": "string"},
        "shared_history": {"type": "array", "items": {"type": "string"}},
        "inside_references": {"type": "array", "items": {"type": "string"}},
        "public_touchpoints": {"type": "array", "items": {"type": "string"}}
      }
    },
    "interaction_guidelines": {
      "type": "object",
      "properties": {
        "tone": {"type": "string"},
        "topics": {"type": "array", "items": {"type": "string"}},
        "avoid": {"type": "array", "items": {"type": "string"}}
      }
    },
    "engagement_limits": {
      "type": "object",
      "properties": {
        "comments_per_week": {"type": "integer"},
        "shares_per_month": {"type": "integer"},
        "tags_per_month": {"type": "integer"}
      }
    },
    "example_interactions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "context": {"type": "string"},
          "from": {"type": "string"},
          "text": {"type": "string"}
        }
      },
      "minItems": 5
    }
  }
}
```

### Campaign Coordination Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CampaignCoordination",
  "type": "object",
  "required": ["campaign_id", "type", "timeline", "persona_roles", "execution_plan"],
  "properties": {
    "campaign_id": {"type": "string"},
    "name": {"type": "string"},
    "type": {
      "type": "string",
      "enum": ["product_launch", "brand_partnership", "awareness_campaign", "community_event"]
    },
    "objective": {"type": "string"},
    "timeline": {
      "type": "object",
      "properties": {
        "start_date": {"type": "string", "format": "date"},
        "end_date": {"type": "string", "format": "date"},
        "phases": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {"type": "string"},
              "start": {"type": "string"},
              "end": {"type": "string"},
              "focus": {"type": "string"}
            }
          }
        }
      }
    },
    "persona_roles": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "role": {"type": "string"},
          "content_types": {"type": "array", "items": {"type": "string"}},
          "posting_schedule": {"type": "array"},
          "talking_points": {"type": "array", "items": {"type": "string"}}
        }
      }
    },
    "execution_plan": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["day", "persona", "action"],
        "properties": {
          "day": {"type": "integer"},
          "time": {"type": "string"},
          "persona": {"type": "string"},
          "action": {"type": "string"},
          "platform": {"type": "string"},
          "content_brief": {"type": "string"},
          "engagement_required": {"type": "array", "items": {"type": "string"}}
        }
      }
    },
    "message_matrix": {
      "type": "object",
      "properties": {
        "core_message": {"type": "string"},
        "persona_variations": {
          "type": "object",
          "additionalProperties": {"type": "string"}
        },
        "objection_handling": {
          "type": "object",
          "additionalProperties": {
            "type": "object",
            "properties": {
              "assigned_persona": {"type": "string"},
              "response_approach": {"type": "string"}
            }
          }
        }
      }
    },
    "success_metrics": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "metric": {"type": "string"},
          "target": {"type": ["string", "number"]},
          "tracking_method": {"type": "string"}
        }
      }
    }
  }
}
```

---

## QUALITY GATES (Anti-Degradation Checks)

### Gate 1: Relationship Authenticity

```
RELATIONSHIP AUTHENTICITY CHECKLIST:

□ Each relationship has documented backstory
□ Interaction styles match relationship types
□ Frequency caps are realistic for relationship type
□ Example interactions feel genuine
□ Inside references exist for close relationships
□ Public history is consistent and documentable
□ Relationships can evolve naturally over time
```

### Gate 2: Engagement Naturalness

```
ENGAGEMENT NATURALNESS CHECKLIST:

□ Timing variance built into all engagement
□ Comment templates have sufficient variety
□ Not all engagement is positive (occasional neutrality)
□ External engagement exceeds internal (4:1 ratio)
□ Platform-specific behaviors respected
□ Different personas have different engagement styles
□ Engagement velocity realistic per account size
```

### Gate 3: Detection Risk Assessment

```
DETECTION RISK CHECKLIST:

□ No identical posting times across accounts
□ No identical hashtag sets
□ Engagement doesn't always come from same accounts first
□ Different devices/IPs for different accounts
□ Comment patterns don't feel templated
□ Occasional "misses" built in (don't engage with everything)
□ External engagement ratio maintained
□ Naturalness audit score above 75
```

### Gate 4: Campaign Coordination

```
CAMPAIGN COORDINATION CHECKLIST:

□ Campaign messages adapted per persona voice
□ Posting staggered (not simultaneous)
□ Different angles covered by different personas
□ Objection handling distributed appropriately
□ Amplification feels organic not orchestrated
□ External accounts included in campaign engagement
□ Success metrics defined and trackable
```

---

## TEMPLATES

### Template 1: Network Coordination Playbook (Full Document)

```markdown
# NETWORK COORDINATION PLAYBOOK

**Network Name:** [Name]
**Version:** 1.0
**Created:** [Date]
**Last Updated:** [Date]

---

## QUICK REFERENCE

| Personas | Platforms | Coordination Level | Risk Tolerance |
|----------|-----------|-------------------|----------------|
| [#] personas | [Platforms] | [Tight/Loose/Hybrid] | [Very Low/Low/Medium] |

---

## 1. NETWORK OVERVIEW

### Persona Roster

| ID | Name | Archetype | Primary Platform | Followers | Status |
|----|------|-----------|------------------|-----------|--------|
| P001 | [Name] | [Type] | [Platform] | [X]K | Active |
| P002 | [Name] | [Type] | [Platform] | [X]K | Active |
| P003 | [Name] | [Type] | [Platform] | [X]K | Active |

### Network Structure

```
[Visual representation of network relationships]
```

### Coordination Parameters

| Parameter | Setting |
|-----------|---------|
| Internal:External Engagement | 1:4 minimum |
| Naturalness Score Target | 85+ |
| Campaign Injection Frequency | [X] per month |
| Cross-Promotion Limit | [X] per persona per month |

---

## 2. RELATIONSHIP ARCHITECTURE

### Relationship Matrix

| | P001 | P002 | P003 |
|------|------|------|------|
| P001 | - | [Type] | [Type] |
| P002 | [Type] | - | [Type] |
| P003 | [Type] | [Type] | - |

### Relationship Details

#### P001 ↔ P002: [Relationship Type]

**Backstory:**
> [How they know each other, history]

**Interaction Style:**
- Tone: [Description]
- Topics: [What they discuss]
- Frequency: [How often]

**Example Interactions:**
1. "[Example comment/interaction]"
2. "[Example comment/interaction]"
3. "[Example comment/interaction]"

**Engagement Limits:**
- Comments/week: [X]
- Shares/month: [X]
- Tags/month: [X]

[Repeat for each relationship pair]

---

## 3. ENGAGEMENT PROTOCOLS

### Comment Engagement Rules

**Timing:**
- Minimum delay after post: [X] minutes
- Natural window: [X] hours (80% of engagement)
- Maximum delay: [X] hours

**Frequency Caps:**
- Max comments/day per pair: [X]
- Max comments/week per pair: [X]
- Minimum gap between comments: [X] hours

**Comment Types Distribution:**
| Type | % | Example |
|------|---|---------|
| Supportive | [X]% | "[Example]" |
| Additive | [X]% | "[Example]" |
| Question | [X]% | "[Example]" |
| Personal | [X]% | "[Example]" |

### Comment Templates by Relationship

#### Friends Comments
- "[Template 1]"
- "[Template 2]"
- "[Template 3]"

#### Colleague Comments
- "[Template 1]"
- "[Template 2]"
- "[Template 3]"

[Continue for each relationship type]

### Platform-Specific Protocols

#### Instagram
- Comment visibility: [Notes]
- Timing strategy: [Notes]
- Additional actions: [List]
- Cross-promotion limits: [List]

#### TikTok
[Same format]

#### YouTube
[Same format]

#### Twitter
[Same format]

---

## 4. AMPLIFICATION CHOREOGRAPHY

### Viral Moment Protocol

**Trigger Thresholds:**
| Platform | Indicator | Threshold |
|----------|-----------|-----------|
| Instagram | Views velocity | [X]x normal in [X] hours |
| TikTok | Views velocity | [X]x normal in [X] hour |
| YouTube | Views velocity | [X]x normal in [X] hours |
| Twitter | Retweets velocity | [X]x normal in [X] hour |

**Amplification Sequence:**

| Phase | Timing | Actions | Example |
|-------|--------|---------|---------|
| Immediate | 0-30 min | [Actions] | "[Example]" |
| Wave | 2-6 hours | [Actions] | "[Example]" |
| Sustain | 24-72 hours | [Actions] | "[Example]" |

### Timing Coordination

**Daily Schedule Distribution:**
| Persona | Primary Window | Secondary Window |
|---------|----------------|------------------|
| P001 | [Time range] | [Time range] |
| P002 | [Time range] | [Time range] |
| P003 | [Time range] | [Time range] |

**Same Topic Spacing:**
- Minimum: [X] hours between personas on same topic
- Ideal: [X] hours between similar content

### Hashtag Coordination

**Shared Hashtags (All Personas):**
- #[hashtag1]
- #[hashtag2]
- #[hashtag3]

**Persona-Specific Hashtags:**
| Persona | Unique Hashtags |
|---------|-----------------|
| P001 | #[x], #[y], #[z] |
| P002 | #[a], #[b], #[c] |
| P003 | #[d], #[e], #[f] |

**Overlap Target:** [X]% hashtag overlap maximum

---

## 5. NETWORK EFFECT MAP

### Audience Flow

```
[Diagram showing how audiences flow between personas]

Entry: Persona 1 (Beginners)
          ↓
    ┌─────┴─────┐
    ↓           ↓
Persona 2   Persona 3
(Strategy)  (Tools)
    └─────┬─────┘
          ↓
    Conversion
```

### Complementary Content Matrix

| Topic | P001 Role | P002 Role | P003 Role |
|-------|-----------|-----------|-----------|
| [Topic 1] | How-to | Strategy | Tools |
| [Topic 2] | Tutorial | Opinion | Review |
| [Topic 3] | Beginner | Advanced | Comparison |

### Cross-Reference Guidelines

**When P001 posts about [topic]:**
- P002 can reference: "[Example]"
- P003 can reference: "[Example]"

**When P002 posts about [topic]:**
[Continue pattern]

---

## 6. CAMPAIGN INJECTION

### Campaign Types

| Type | Approach | Timeline | Persona Roles |
|------|----------|----------|---------------|
| Product Launch | Cascade | 2-3 weeks | [Roles] |
| Brand Partnership | Staggered | 1-2 weeks | [Roles] |
| Awareness | Multi-perspective | 1-2 weeks | [Roles] |

### Campaign Execution Template

**Campaign:** [Name]
**Duration:** [Dates]
**Objective:** [Goal]

| Day | Time | Persona | Platform | Action | Content Brief |
|-----|------|---------|----------|--------|---------------|
| 1 | [Time] | P001 | [Platform] | [Action] | [Brief] |
| 1 | [Time] | P002 | [Platform] | [Action] | [Brief] |
| 2 | [Time] | P003 | [Platform] | [Action] | [Brief] |

**Message Coordination:**
- Core message: "[Message]"
- P001 version: "[Adapted]"
- P002 version: "[Adapted]"
- P003 version: "[Adapted]"

---

## 7. ORGANIC APPEARANCE MAINTENANCE

### Detection Avoidance Checklist

**Daily:**
- [ ] Timing variance applied to all engagement
- [ ] External engagement completed before internal
- [ ] No identical comments used
- [ ] Different devices for different accounts

**Weekly:**
- [ ] Naturalness audit completed
- [ ] External:internal ratio verified (4:1)
- [ ] Comment variety check
- [ ] Timing pattern review

### External Engagement Requirements

| Persona | Daily External Comments | Daily External Follows | Weekly External Shares |
|---------|------------------------|----------------------|----------------------|
| P001 | [X]-[X] | [X]-[X] | [X]-[X] |
| P002 | [X]-[X] | [X]-[X] | [X]-[X] |
| P003 | [X]-[X] | [X]-[X] | [X]-[X] |

### Naturalness Audit Scorecard

**Week of:** [Date]

| Persona | Timing | Content | Engagement | Relationship | Total | Status |
|---------|--------|---------|------------|--------------|-------|--------|
| P001 | /25 | /25 | /25 | /25 | /100 | [Status] |
| P002 | /25 | /25 | /25 | /25 | /100 | [Status] |
| P003 | /25 | /25 | /25 | /25 | /100 | [Status] |

**Action Items:**
- [Item 1]
- [Item 2]

---

## 8. OPERATIONAL PROCEDURES

### Daily Coordination Checklist

**Morning:**
- [ ] Check overnight performance across accounts
- [ ] Identify any viral moments requiring amplification
- [ ] Review scheduled posts for the day
- [ ] Complete external engagement quota

**Afternoon:**
- [ ] Execute internal engagement (staggered)
- [ ] Monitor real-time performance
- [ ] Adjust evening posts if needed

**Evening:**
- [ ] Final engagement round
- [ ] Note any issues for weekly review
- [ ] Prep next day's coordination

### Weekly Review Process

**Meeting Day:** [Day]
**Duration:** [Time]

**Agenda:**
1. Performance review (15 min)
2. Naturalness audit (15 min)
3. Campaign status (10 min)
4. Issues/adjustments (15 min)
5. Next week planning (5 min)

### Emergency Protocols

**Scenario: Account Suspension**
1. [Action 1]
2. [Action 2]
3. [Action 3]

**Scenario: Coordination Exposed**
1. [Action 1]
2. [Action 2]
3. [Action 3]

**Scenario: Viral Crisis**
1. [Action 1]
2. [Action 2]
3. [Action 3]

---

## APPENDICES

### A. Comment Template Library
[Extended library of comment templates]

### B. Campaign Calendar
[12-month campaign schedule]

### C. Audit History
[Historical naturalness scores]

### D. Contact/Escalation
[Who to contact for issues]

---

*This playbook is confidential. Review and update weekly.*
```

### Template 2: Relationship Quick Reference Card

```markdown
# RELATIONSHIP CARD: [Persona A] ↔ [Persona B]

**Relationship Type:** [Type]
**Frequency:** [High/Medium/Low]

---

## BACKSTORY
> [2-3 sentence backstory]

## INTERACTION STYLE
- **Tone:** [Description]
- **Energy:** [Level]
- **Topics:** [What they discuss]

## LIMITS
| Action | Weekly Cap | Monthly Cap |
|--------|------------|-------------|
| Comments | [X] | [X] |
| Shares | [X] | [X] |
| Tags | [X] | [X] |
| Collabs | - | [X] |

## EXAMPLE COMMENTS

**Supportive:**
- "[Example]"
- "[Example]"

**Additive:**
- "[Example]"
- "[Example]"

**Personal:**
- "[Example]"
- "[Example]"

## INSIDE REFERENCES
- "[Reference]" = [Meaning]
- "[Reference]" = [Meaning]

## RED FLAGS (Avoid)
- [Thing to avoid]
- [Thing to avoid]

---
*Quick reference card - see full playbook for details*
```

---

## EXAMPLES

### Example 1: Viral Amplification Sequence

```
VIRAL MOMENT DETECTED: Maya Chen (P001)
Platform: TikTok
Trigger: 50K views in first hour (10x normal velocity)
Time: 2:30 PM EST

AMPLIFICATION SEQUENCE EXECUTION:

PHASE 1 - IMMEDIATE (2:30-3:00 PM)
├── 2:35 PM: Jordan (P002 - Friends) comments
│   └── "Okay the algorithm finally paying attention 👀"
├── 2:40 PM: All personas save video
├── 2:45 PM: Sam (P003 - Mentee) likes
├── 2:55 PM: Jordan shares to Instagram story
│   └── "Maya breaking TikTok rn go watch"

PHASE 2 - WAVE (4:30-8:30 PM)
├── 4:45 PM: Sam comments
│   └── "This breakdown is *chef's kiss*"
├── 5:30 PM: Sam shares to TikTok story
├── 6:00 PM: Jordan quote tweets Maya's cross-post
│   └── "When the student becomes the teacher 😤 @mayachenwrites"
├── 7:30 PM: Sam creates stitch (next day publish)
│   └── "Adding my tool recommendations to @mayachenwrites's framework"

PHASE 3 - SUSTAIN (Next 24-72 hours)
├── Day 2: Jordan creates response video
│   └── "The strategic implications of what Maya said..."
├── Day 2: Sam publishes stitch
├── Day 3: Maya responds to Sam's stitch (continues conversation)
├── Day 3: All personas engage with comments on original

RESULT: Video reached 500K views, 15K new followers across network
```

### Example 2: Campaign Injection - Product Launch

```
CAMPAIGN: AI Writing Course Launch
DURATION: October 1-21

PRE-CAMPAIGN (Sept 24-30):
├── Sept 24: Maya posts "My content workflow is broken" (problem awareness)
├── Sept 26: Jordan posts "Why most AI courses miss the point"
├── Sept 28: Sam posts "Tools I've been testing lately" (includes course topic)
└── Sept 30: Maya posts "Working on something..." (soft tease)

CAMPAIGN LAUNCH (Oct 1-3):
├── Oct 1, 10 AM: Maya announces course (primary launch post)
├── Oct 1, 2 PM: Jordan comments "FINALLY. Been waiting for this."
├── Oct 1, 4 PM: Sam likes, saves
├── Oct 1, 6 PM: Jordan shares to stories "My friend just dropped this"
├── Oct 2, 10 AM: Sam creates "First look" review content
├── Oct 2, 2 PM: Jordan creates "Why I'm recommending this" strategic angle
├── Oct 3: All personas engage with launch post comments
└── Oct 3: Maya goes live, Jordan and Sam join as guests

CAMPAIGN SUSTAIN (Oct 4-18):
├── Week 1: Maya - Tutorials showing course concepts
│           Jordan - Strategic case for investing in AI skills
│           Sam - Tool recommendations that pair with course
├── Week 2: Maya - Student success stories
│           Jordan - Debate content on AI education
│           Sam - Comparison to other learning options
└── Week 3: Maya - Deep dive modules
            Jordan - Future of work angle
            Sam - "What I learned" content

CAMPAIGN CLOSE (Oct 19-21):
├── Oct 19: Maya - Urgency content "Doors closing"
├── Oct 19: Jordan - "Last chance" share
├── Oct 20: Sam - "If you haven't yet..." nudge
├── Oct 21: Maya - Final push + thank you
└── Oct 21: All personas celebrate launch success

MESSAGE MATRIX:
Core: "Master AI writing tools and transform your content workflow"
Maya: "Here's exactly how I did it - step by step"
Jordan: "This is the strategic advantage you're missing"
Sam: "After testing everything, this is the investment that makes sense"
```

### Example 3: Natural Comment Variation

```
SCENARIO: Sam (P003) posts tool review
RELATIONSHIP: Maya (P001) is Sam's mentor

BAD APPROACH (Detectable):
- Always commenting first
- "Great review!" (too generic)
- Always positive
- Same emoji patterns

GOOD APPROACH (Natural):

Option 1 (Supportive - 40%):
"Your reviews keep getting better 🎯 The pricing breakdown was super helpful"

Option 2 (Additive - 30%):
"Adding to this - I've been using [tool] for 3 months now and the [feature] has been a game changer for batch content"

Option 3 (Question - 15%):
"Have you tried it for longer-form content? Curious if it holds up beyond social"

Option 4 (Personal - 15%):
"You've come so far with these reviews! Remember when you asked me about starting these? 😊"

Option 5 (Skip this post):
[Don't comment - natural to miss some posts]

TIMING VARIANCE:
- Sometimes comment within 30 min (15% of time)
- Usually comment within 2-6 hours (65% of time)
- Sometimes comment next day (15% of time)
- Sometimes miss entirely (5% of time)
```

---

## CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | [Date] | Initial release |

---

## RELATED SKILLS

- **S21-persona-architect:** Provides Persona Bibles for relationship design
- **S22-account-strategy:** Provides posting schedules for coordination
- **S24-monetization-engine:** Uses network for revenue amplification

---

*S23-network-coordination: Orchestrating organic amplification across the influencer network.*
