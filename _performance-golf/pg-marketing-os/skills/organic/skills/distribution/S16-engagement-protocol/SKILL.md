---
name: engagement-protocol
description: >-
  Comment strategy, DM strategy, and community management protocol for organic
  content distribution. Use after content is scheduled and you need a first-hour
  engagement plan. The first 60 minutes after posting determine whether content
  lives or dies algorithmically. Produces the Engagement Protocol File (EPF)
  with comment response templates, DM automation triggers, community management
  playbooks, and engagement-window action sequences. Trigger when users mention
  engagement strategy, comment management, community building, DM strategy,
  or post-publish engagement. Requires S14 Content Assembly and S15 Scheduling.
---

# S16: ENGAGEMENT PROTOCOL
## Comment Strategy, DM Strategy, Community Management
## Gate: G10 (Requires S14 Content Assembly) | Output: Engagement Protocol File (EPF)

---

## PURPOSE

This skill transforms passive content publishing into active community building. The first 60 minutes after posting determine whether content lives or dies. Engagement is not optional — it is the difference between algorithmic death and exponential reach.

**Output:** Engagement Protocol File (EPF)
**Requires:** S14 Content Assembly output + S15 Scheduling Choreography
**Unlocks:** S17 Network Amplification coordination

---

## ANTI-DEGRADATION

- Read `S16-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `skills/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## SKILL IDENTITY

```yaml
skill_id: S16
skill_name: Engagement Protocol
category: Distribution
position_in_pipeline: Second distribution skill (post-scheduling)
dependencies:
  hard:
    - S14 Content Assembly (content packages must exist)
  soft:
    - S15 Scheduling Choreography (defines engagement windows)
    - S03 Brand Voice (tone for responses)
    - S01 Audience Intelligence (language patterns)
outputs_to:
  - S17 Network Amplification (coordinates network engagement)
  - S19 Performance Analysis (engagement metrics feed analysis)
```

---

## PREREQUISITES (Gate Requirements)

### Gate Validation

Before executing S16, verify:

```yaml
gate_check:
  required_files:
    content_package:
      path: "skills/production/S14-content-assembly/outputs/[content-id]-package.yaml"
      exists: [Yes/No]

    scheduling_file:
      path: "skills/distribution/S15-scheduling-choreography/outputs/[campaign]-SCF.yaml"
      exists: [Yes/No]
      engagement_windows_defined: [Yes/No]

  required_context:
    brand_voice_file:
      path: "skills/foundation/S03-brand-voice/outputs/[campaign]-BVF.yaml"
      exists: [Yes/No]

    audience_intelligence:
      path: "skills/foundation/S01-audience-intelligence/outputs/[campaign]-AIF.yaml"
      exists: [Yes/No]

gate_decision: [PROCEED / BLOCKED]
block_reason: [if blocked, why]
```

---

## INPUT REQUIREMENTS

### From S15 Scheduling Choreography

```yaml
scheduling_inputs:
  engagement_triggers:
    - content_id: [ID]
      platform: [Platform]
      post_time: [Time]
      engagement_window_start: [Time]
      engagement_window_end: [Time]
      priority: [High/Medium/Low]
```

### From S03 Brand Voice

```yaml
voice_inputs:
  tone_for_responses:
    comment_tone: [How to sound in comments]
    dm_tone: [How to sound in DMs]
    controversy_tone: [How to handle criticism]

  vocabulary:
    power_words: [Words to use]
    banned_words: [Words to avoid]
    signature_phrases: [Ownable expressions]

  personality_traits:
    humor_level: [0-10]
    formality_level: [0-10]
    emoji_usage: [None/Light/Moderate/Heavy]
```

### From S01 Audience Intelligence

```yaml
audience_inputs:
  language_patterns:
    slang_they_use: [Terms to mirror]
    questions_they_ask: [Common questions]
    pain_expressions: [How they describe problems]

  engagement_patterns:
    what_makes_them_comment: [Triggers]
    what_makes_them_dm: [Motivations]
    community_behaviors: [Group dynamics]
```

---

## PROCESS

### Phase 1: First 60 Minutes Protocol (Critical Window)

The first hour after posting is algorithmic judgment time. This protocol maximizes initial velocity.

```yaml
first_60_minutes_protocol:

  minute_0_to_5:
    name: "Immediate Post-Publish Actions"
    actions:
      - action: "Self-engage (if applicable)"
        detail: "Add first comment with value-add or question"
        example: "Curious which of these 5 resonates most with you?"
        platform_notes:
          instagram: "First comment can include extra hashtags"
          linkedin: "First comment adds commentary, link if needed"
          tiktok: "Pin a comment that encourages engagement"
          x_twitter: "Reply to self with additional context"

      - action: "Share to Stories (Instagram)"
        detail: "Post to stories with engagement sticker"
        sticker_options: ["Poll", "Question", "Slider", "Quiz"]

      - action: "Send to Close Friends/DM groups"
        detail: "Share with inner circle for initial engagement"
        note: "These should be real connections, not pods"

      - action: "Cross-platform tease"
        detail: "Quick post on other platforms pointing to main content"
        example: "Just dropped something on Instagram that I think you'll love..."

  minute_5_to_15:
    name: "Engagement Initiation"
    actions:
      - action: "Reply to first comments immediately"
        detail: "Every early comment gets a thoughtful reply"
        response_time_target: "Under 3 minutes"
        quality: "Substantive, not just emoji"

      - action: "Engage with similar content"
        detail: "Find 5-10 posts in your niche posted in last hour"
        engagement_type: "Genuine, valuable comments (not 'Nice post!')"
        note: "This signals activity to algorithm"

      - action: "Monitor initial metrics"
        detail: "Check early engagement velocity"
        warning_signs:
          - "Zero comments after 5 minutes"
          - "Low view count compared to recent"
          - "Negative sentiment in first comments"

  minute_15_to_30:
    name: "Momentum Building"
    actions:
      - action: "Continue reply velocity"
        detail: "Maintain rapid response to all comments"
        priority: "Questions > Positive > Neutral > Negative"

      - action: "Pin best comment (if platform supports)"
        detail: "Pin a comment that sparks conversation"
        criteria: "Controversial, funny, or creates curiosity"

      - action: "Engage reciprocally"
        detail: "Visit profiles of commenters, engage with their content"
        note: "Builds relationship, signals active community"

      - action: "Drop second piece of value"
        detail: "Add additional insight in comments"
        example: "By the way, there's a sixth point I didn't include..."

  minute_30_to_60:
    name: "Sustained Engagement"
    actions:
      - action: "Continue thoughtful replies"
        detail: "Shift from rapid to quality"
        note: "Longer, more detailed responses acceptable now"

      - action: "Identify potential DM conversations"
        detail: "Look for comments that warrant private follow-up"
        triggers:
          - "Questions about products/services"
          - "Sharing personal stories"
          - "Expressing specific pain points"
          - "Offering collaboration"

      - action: "Community engagement on platform"
        detail: "Engage outside your post to stay active"

      - action: "Initial performance assessment"
        detail: "Compare to average performance"
        decision_tree:
          above_average: "Continue monitoring, prepare amplification"
          at_average: "Maintain engagement intensity"
          below_average: "Boost engagement, check content issues"
```

### Phase 2: Comment Seeding Strategies

Strategic first comments that spark conversation.

```yaml
comment_seeding_strategies:

  question_seeds:
    description: "End your content with a question, then seed the answer"
    technique:
      - "Post content ending with open question"
      - "Add first comment that models the type of answer you want"
      - "Reply to your own comment with additional perspective"

    examples:
      seed_comment: "For me, it was realizing that [specific insight]. Anyone else?"
      self_reply: "Actually, thinking about it more, this connects to [broader idea]..."

  controversy_seeds:
    description: "Introduce productive tension that invites debate"
    technique:
      - "Post content with strong perspective"
      - "Add comment acknowledging opposing view"
      - "Let audience debate (with moderation)"

    examples:
      seed_comment: "I know some people disagree with #3. What's your take on the alternative approach?"
      note: "Never fake controversy — invite genuine different perspectives"

  value_extension_seeds:
    description: "Add additional value not in the main content"
    technique:
      - "Main content delivers core value"
      - "First comment adds bonus tip/insight"
      - "Signals that comments are worth reading"

    examples:
      seed_comment: "Bonus tip I couldn't fit in the video: [additional valuable insight]"
      note: "Makes comment section feel valuable"

  story_continuation_seeds:
    description: "Tease additional story in comments"
    technique:
      - "Main content tells partial story"
      - "First comment continues with 'what happened next'"
      - "Creates pattern of checking comments"

    examples:
      seed_comment: "By the way, here's what happened after I tried this for 30 days..."

  poll_prompt_seeds:
    description: "Create mini-polls in comments"
    technique:
      - "Main content presents options"
      - "First comment asks for votes"
      - "Creates easy engagement path"

    examples:
      seed_comment: "Reply A if you're Team [X], B if you're Team [Y]. I'll share the results!"
```

### Phase 3: Reply Hierarchy (Prioritization Framework)

Not all comments are equal. This framework prioritizes response order.

```yaml
reply_hierarchy:

  tier_1_immediate:
    response_time: "Within 3 minutes"
    priority: "HIGHEST"
    comment_types:
      - type: "Questions (genuine)"
        reason: "Shows you're responsive, adds value"
        response_style: "Thorough, helpful, specific"

      - type: "Influential accounts"
        reason: "Algorithmic signal + relationship building"
        response_style: "Acknowledge their expertise, add value"

      - type: "Potential customers/clients"
        reason: "Direct business opportunity"
        response_style: "Helpful, offer to continue conversation"

      - type: "Highly engaged followers"
        reason: "Reward loyalty, encourage more"
        response_style: "Personal, appreciative"

  tier_2_quick:
    response_time: "Within 10 minutes"
    priority: "HIGH"
    comment_types:
      - type: "Substantive positive comments"
        reason: "Encourages more quality engagement"
        response_style: "Match their energy, add insight"

      - type: "Story shares"
        reason: "People sharing personal experiences"
        response_style: "Acknowledge, validate, connect"

      - type: "Tag mentions"
        reason: "They're bringing others in"
        response_style: "Thank them, welcome tagged person"

  tier_3_standard:
    response_time: "Within 30 minutes"
    priority: "MEDIUM"
    comment_types:
      - type: "Simple positive comments"
        reason: "Shows appreciation for all engagement"
        response_style: "Brief but genuine acknowledgment"

      - type: "Emoji-only comments"
        reason: "Still shows you read all comments"
        response_style: "Emoji reply or brief text"

      - type: "Neutral comments"
        reason: "Opportunity to spark conversation"
        response_style: "Ask follow-up question"

  tier_4_strategic:
    response_time: "Within 60 minutes"
    priority: "STRATEGIC"
    comment_types:
      - type: "Constructive criticism"
        reason: "Shows maturity, can build trust"
        response_style: "Thank, acknowledge valid points, clarify if needed"

      - type: "Requests/suggestions"
        reason: "Community input signals"
        response_style: "Acknowledge, explain what's possible"

  tier_5_careful:
    response_time: "Depends on situation"
    priority: "HANDLE WITH CARE"
    comment_types:
      - type: "Negative but valid critique"
        reason: "Opportunity to show character"
        response_style: "Humble, non-defensive, seek understanding"

      - type: "Trolling/bad faith"
        reason: "Don't feed trolls, but don't ignore"
        response_style: "One neutral response or ignore + hide"

      - type: "Spam"
        reason: "Clean up community"
        response_style: "Delete/report, no response needed"

response_templates:
  tier_1_question:
    template: "Great question, [Name]! [Direct answer]. [Additional context or value]. Does that help?"

  tier_1_influential:
    template: "[Name], appreciate you sharing your perspective. [Acknowledge their point]. [Add value or question]."

  tier_2_positive:
    template: "[Acknowledgment]! [Connect to their specific point]. [Add insight or question]."

  tier_3_simple:
    template: "[Brief acknowledgment] [Emoji or short addition]"

  tier_4_criticism:
    template: "Appreciate the feedback, [Name]. [Acknowledge valid point]. [Clarify/explain]. What's been your experience with [related aspect]?"

  tier_5_negative:
    template: "I hear you. [Acknowledge without agreeing if invalid]. [Redirect constructively if possible]."
    note: "If bad faith, single response max: 'Thanks for sharing your perspective.'"
```

### Phase 4: DM Strategy Framework

Converting public engagement into private relationships.

```yaml
dm_strategy:

  dm_triggers:
    description: "When to move from public comments to private DM"

    high_priority_triggers:
      - trigger: "Product/service inquiry"
        signal: "Comment asking about pricing, availability, how to work together"
        response: "Thank publicly, then DM with details"
        dm_opener: "Hey [Name]! Saw your comment about [topic]. Happy to share more details here..."

      - trigger: "Shared vulnerability"
        signal: "Comment sharing personal struggle related to content"
        response: "Brief public acknowledgment, then private support"
        dm_opener: "Hey [Name], really appreciated you sharing that. Didn't want to put you on the spot publicly, but wanted to say..."

      - trigger: "Collaboration mention"
        signal: "Comment suggesting partnership, feature, or collaboration"
        response: "Express interest publicly, move to DM for details"
        dm_opener: "Hey! Loved your comment about [collaboration idea]. Let's explore this..."

      - trigger: "Specific expertise question"
        signal: "Complex question that deserves detailed private response"
        response: "Brief public answer, offer deeper dive in DM"
        dm_opener: "Following up on your question about [topic]. Here's the deeper dive I promised..."

    medium_priority_triggers:
      - trigger: "Repeat engager"
        signal: "Same person engaging consistently across multiple posts"
        response: "Acknowledge pattern, start relationship"
        dm_opener: "Hey [Name]! I've noticed you engaging a lot lately — really appreciate it. What's your story?"

      - trigger: "Profile worth connecting with"
        signal: "Engager has aligned business/interests"
        response: "Check their content, DM with genuine connection"
        dm_opener: "Hey! Checked out your profile after your comment — love what you're doing with [specific thing]. [Question/connection]"

      - trigger: "New follower with engagement"
        signal: "New follow + meaningful first comment"
        response: "Welcome them personally"
        dm_opener: "Hey [Name]! Noticed you just joined the community. Welcome! What brought you here?"

  dm_automation_framework:
    description: "Systematic DM sequences for common scenarios"
    warning: "Automation must feel personal. Never spam. Always add value."

    new_follower_sequence:
      trigger: "New follow"
      delay: "1-4 hours after follow"
      message_1:
        template: "Hey [Name]! Thanks for the follow. Curious — what content brought you here?"
        personalization: "Check their bio, reference something specific if possible"

      message_2:
        trigger: "They reply"
        template: "[Acknowledge their answer]. I'm always curious what people are working on — what's your current focus?"

      message_3:
        trigger: "Conversation develops"
        template: "Continue genuinely based on their responses"

      note: "Goal is relationship, not immediate conversion"

    lead_nurture_sequence:
      trigger: "Expressed interest in product/service"
      message_1:
        timing: "Same day as inquiry"
        template: "Hey [Name]! Following up on your interest in [product/service]. Quick question: what's the main problem you're trying to solve?"

      message_2:
        trigger: "They respond with pain point"
        timing: "Within 2 hours"
        template: "[Acknowledge pain]. I've seen that a lot. Here's what's worked for others in your situation: [brief insight]. Would it help to [next step]?"

      message_3:
        trigger: "Positive response"
        timing: "Same day"
        template: "[Provide value/next step]. Let me know if you have questions."

      follow_up:
        trigger: "No response after 48 hours"
        template: "Hey [Name], just checking in. No pressure — just wanted to make sure you got what you needed. Any questions?"

    engagement_to_community:
      trigger: "Highly engaged commenter (5+ quality comments)"
      message_1:
        template: "Hey [Name]! I've noticed you in the comments a lot — really appreciate your contributions. You clearly get this stuff. Quick question: [relevant question about their expertise/experience]"

      goal: "Convert to community member, potential advocate"

  dm_tone_calibration:
    platform_specific:
      instagram:
        tone: "Casual, friendly, emoji-acceptable"
        length: "Short paragraphs, broken into multiple messages"
        avoid: "Overly formal, long blocks of text"

      linkedin:
        tone: "Professional but personable"
        length: "Concise, value-focused"
        avoid: "Generic connection request language"

      x_twitter:
        tone: "Direct, conversational"
        length: "Brief, respect character culture"
        avoid: "Pitchy, salesy"

      tiktok:
        tone: "Very casual, fun, young energy"
        length: "Very short, punchy"
        avoid: "Corporate speak"
```

### Phase 5: Community Building Tactics

Building ongoing community, not just one-time engagement.

```yaml
community_building:

  daily_engagement_routine:
    description: "Consistent habits that build community"

    morning_block:
      duration: "30 minutes"
      activities:
        - "Reply to overnight comments (all platforms)"
        - "Check DMs and respond"
        - "Engage with 10 accounts in your niche"
        - "Check for @mentions and respond"

    midday_block:
      duration: "15 minutes"
      activities:
        - "Reply to new comments from morning content"
        - "Engage with Stories replies"
        - "Quick DM check"

    evening_block:
      duration: "30 minutes"
      activities:
        - "Reply to afternoon/evening comments"
        - "Engage with 10 accounts in your niche"
        - "Story engagement (polls, questions)"
        - "Respond to DMs"
        - "Plan next day's engagement priorities"

  community_engagement_formats:

    ask_me_anything:
      frequency: "Monthly or bi-weekly"
      format: "Stories (Instagram), Live, or Thread"
      structure:
        - "Announce 24 hours ahead"
        - "Collect questions via Stories/comments"
        - "Answer publicly (increases content)"
        - "Follow up privately on personal questions"

    community_spotlight:
      frequency: "Weekly"
      format: "Story feature or post"
      structure:
        - "Feature community member's win/content"
        - "Tag them, celebrate publicly"
        - "Encourage others to share"
        - "Creates aspiration for participation"

    behind_the_scenes:
      frequency: "2-3x weekly"
      format: "Stories, TikTok, casual posts"
      structure:
        - "Show process, not just results"
        - "Humanize the brand/person"
        - "Create parasocial connection"
        - "Ask for input on decisions"

    user_generated_content:
      frequency: "Ongoing"
      formats:
        - "Repost/share community content"
        - "Create challenges with hashtag"
        - "Feature testimonials/results"
        - "Duet/stitch community videos"

  community_rituals:
    description: "Recurring patterns that create belonging"

    examples:
      - ritual: "Monday Mindset"
        description: "Weekly motivational post with community check-in"
        engagement_driver: "Ask everyone to share their weekly goal"

      - ritual: "Friday Wins"
        description: "Celebrate community wins from the week"
        engagement_driver: "Tag community members who shared wins"

      - ritual: "Sunday Reset"
        description: "Planning content with audience input"
        engagement_driver: "Poll on what content they want next week"

      - ritual: "Monthly Q&A"
        description: "Deep-dive questions from community"
        engagement_driver: "Pre-submission creates anticipation"
```

### Phase 6: Controversy Management

Handling negative situations without brand damage.

```yaml
controversy_management:

  severity_classification:

    level_1_minor:
      description: "Single negative comment, mild criticism"
      examples:
        - "I disagree with this point"
        - "This didn't work for me"
        - "Meh, nothing new here"
      response:
        timing: "Within 30 minutes"
        approach: "Acknowledge, don't defend"
        template: "Appreciate the perspective! What's been your experience with [topic]?"
      escalation: "None needed"

    level_2_moderate:
      description: "Multiple negative comments, valid criticism"
      examples:
        - "This advice could be harmful because..."
        - "You're wrong about X, here's why..."
        - "Several comments questioning credibility"
      response:
        timing: "Within 1 hour"
        approach: "Acknowledge validity, clarify position"
        template: "Thanks for raising this. You make a valid point about [X]. My perspective is [Y] because [reason]. What do you think about [specific aspect]?"
      escalation: "Monitor for 24 hours, prepare statement if grows"

    level_3_significant:
      description: "Viral criticism, potential brand damage"
      examples:
        - "Post being quote-tweeted with criticism"
        - "Comments section overwhelmingly negative"
        - "Influencer calling out the content"
      response:
        timing: "Within 2 hours"
        approach: "Strategic, measured response"
        process:
          1: "Document everything (screenshots)"
          2: "Assess validity of criticism"
          3: "Draft response (don't post immediately)"
          4: "Consider: apologize, clarify, or stand firm"
          5: "Post single, thoughtful response"
          6: "Do not engage with every critic"
      escalation: "Prepare longer statement if needed"

    level_4_crisis:
      description: "Major backlash, trending criticism, media attention"
      examples:
        - "Trending for wrong reasons"
        - "Major accounts piling on"
        - "Press coverage imminent"
      response:
        timing: "ASAP (within 1 hour)"
        approach: "Crisis mode"
        process:
          1: "Stop all scheduled content"
          2: "Document everything"
          3: "Assess: what's the core criticism?"
          4: "Draft official response"
          5: "If error made: apologize genuinely, outline action"
          6: "If misunderstanding: clarify calmly"
          7: "Single statement, don't argue in comments"
          8: "Go quiet after statement"
      escalation: "PR/legal review if needed"

  response_principles:

    do:
      - "Respond, don't react (pause before posting)"
      - "Acknowledge valid criticism genuinely"
      - "Own mistakes clearly without over-explaining"
      - "Move specific issues to DM when appropriate"
      - "Maintain consistent tone regardless of attack severity"
      - "Know when silence is the best response"

    dont:
      - "Delete negative comments (unless harassment/spam)"
      - "Argue point by point with critics"
      - "Match aggressive energy"
      - "Make excuses"
      - "Play victim"
      - "Involve community in fighting critics"

  post_controversy_recovery:
    immediate: "Go quiet for 24-48 hours (unless clarification needed)"
    day_3_to_7: "Return with valuable, non-controversial content"
    week_2: "Acknowledge growth/learning if appropriate"
    ongoing: "Build goodwill through consistent value"
```

---

## OUTPUT SPECIFICATION

### Engagement Protocol File (EPF)

```yaml
# ENGAGEMENT PROTOCOL FILE (EPF)
# Campaign: [Name]
# Created: [Date]
# Version: 1.0

epf_metadata:
  campaign_name:
  content_id:
  platform:
  post_time:
  engagement_window:
    start:
    end:
  priority: [High/Medium/Low]
  prepared_by:
  date_prepared:
  version: "1.0"

## SECTION 1: FIRST 60 MINUTES PROTOCOL
first_60_minutes:
  minute_0_to_5:
    self_comment:
      text: |
      purpose: [Question/Value/Controversy/Story]
    story_action:
      sticker_type:
      content:
    close_friends_share: [Yes/No]
    cross_platform_tease:
      platform:
      content:

  minute_5_to_15:
    niche_engagement_targets:
      - account:
        post_to_engage:
        planned_comment:
    reply_velocity_target: "Under 3 minutes"

  minute_15_to_30:
    pin_comment_strategy:
    second_value_drop:
      text: |

  minute_30_to_60:
    dm_prospect_criteria:
    performance_threshold:
      metric:
      above_action:
      below_action:

## SECTION 2: COMMENT SEEDING
comment_seeding:
  seed_type: [Question/Controversy/Value/Story/Poll]
  seed_comment_text: |

  self_reply_text: |

  expected_conversation_flow:

## SECTION 3: REPLY HIERARCHY
reply_hierarchy:
  tier_1_targets:
    - account_type:
      response_template:
  tier_2_targets:
    - account_type:
      response_template:
  tier_3_approach:
  tier_4_approach:
  tier_5_approach:

## SECTION 4: DM STRATEGY
dm_strategy:
  triggers_active:
    - trigger:
      dm_opener:
  sequences_active:
    - sequence_name:
      sequence_id:

## SECTION 5: COMMUNITY ACTIONS
community_actions:
  pre_post:
    - action:
  post_publish:
    - action:
  ongoing:
    - action:
      frequency:

## SECTION 6: CONTROVERSY PREPAREDNESS
controversy_prep:
  potential_criticisms:
    - criticism:
      prepared_response:
  escalation_contact:
  content_pause_authority: [Who can pause content]

## SECTION 7: DAILY ENGAGEMENT SCHEDULE
daily_schedule:
  morning_block:
    time:
    duration:
    activities: []
  midday_block:
    time:
    duration:
    activities: []
  evening_block:
    time:
    duration:
    activities: []

## SECTION 8: METRICS TO TRACK
metrics:
  engagement_rate_target:
  comment_count_target:
  reply_rate_target:
  dm_conversion_target:

## SOURCE FILES
source_files:
  content_package: "[path]"
  scheduling_choreography: "[path]"
  brand_voice: "[path]"
  audience_intelligence: "[path]"
```

---

## QUALITY GATES

### Anti-Degradation Checks

```yaml
epf_quality_gates:

  protocol_completeness:
    - check: "First 60 minutes protocol fully defined"
      status: [Pass/Fail]

    - check: "Comment seeding strategy specified"
      status: [Pass/Fail]

    - check: "Reply hierarchy documented"
      status: [Pass/Fail]

    - check: "DM triggers and openers defined"
      status: [Pass/Fail]

  voice_alignment:
    - check: "Response templates match BVF tone"
      status: [Pass/Fail]

    - check: "Language mirrors audience patterns from AIF"
      status: [Pass/Fail]

    - check: "No banned phrases in templates"
      status: [Pass/Fail]

  preparedness:
    - check: "Controversy responses prepared"
      status: [Pass/Fail]

    - check: "Escalation path defined"
      status: [Pass/Fail]

    - check: "Daily engagement schedule realistic"
      status: [Pass/Fail]

  metrics:
    - check: "Success metrics defined"
      status: [Pass/Fail]

    - check: "Targets are measurable"
      status: [Pass/Fail]

quality_gate_decision: [APPROVED / REVISION REQUIRED]
revision_notes: "[If required, what needs fixing]"
```

---

## TEMPLATES

### First 60 Minutes Checklist Template

```yaml
first_60_minutes_checklist:
  content_id:
  platform:
  post_time:

  minute_0_to_5:
    - [ ] Self-comment posted
    - [ ] Story posted with engagement sticker
    - [ ] Shared to close friends/DM groups
    - [ ] Cross-platform tease sent

  minute_5_to_15:
    - [ ] First comments replied to (target: <3 min each)
    - [ ] 5+ niche posts engaged with
    - [ ] Initial metrics checked

  minute_15_to_30:
    - [ ] All new comments replied to
    - [ ] Best comment pinned
    - [ ] Second value comment added
    - [ ] Reciprocal profile engagement done

  minute_30_to_60:
    - [ ] Reply velocity maintained
    - [ ] DM candidates identified
    - [ ] Performance assessment completed
    - [ ] Decision made: [Amplify/Maintain/Boost]

  notes:
```

### Reply Template Library

```yaml
reply_templates:

  question_response:
    context: "Someone asks a genuine question"
    templates:
      - "Great question, [Name]! [Direct answer]. [Additional context]. Does that help?"
      - "[Direct answer]. By the way, I covered this deeper in [link/reference]. Anything else you're wondering about?"
      - "Love this question. [Answer]. Curious — what made you think about this?"

  positive_acknowledgment:
    context: "Someone leaves a positive comment"
    templates:
      - "[Acknowledgment]! [Connect to their specific point]. [Add value or question]"
      - "Really appreciate that, [Name]. What part resonated most for you?"
      - "Thanks! [Add relevant insight that extends the conversation]"

  story_response:
    context: "Someone shares a personal story"
    templates:
      - "Wow, thanks for sharing that, [Name]. [Acknowledge specific element]. What happened next?"
      - "That's exactly the kind of story that [connects to content theme]. Appreciate you being vulnerable."
      - "[Validate their experience]. A lot of people go through this. [Add supportive insight]"

  constructive_criticism:
    context: "Someone offers valid critique"
    templates:
      - "Appreciate this feedback. You make a fair point about [X]. My thinking was [Y], but I can see how [Z]. What's been your experience?"
      - "Thanks for pushing back on this. [Acknowledge their point]. Here's another angle to consider: [perspective]."
      - "Valid critique. I should have been clearer about [X]. What would have made this more useful for you?"

  disagreement:
    context: "Someone disagrees with content"
    templates:
      - "Interesting perspective! I see where you're coming from. My view is [X] because [reason]. What's shaped your thinking on this?"
      - "Fair point. We might just see this differently. Curious what experience led you to [their view]?"
      - "[Acknowledge their view]. There's definitely more than one way to look at this. [Add nuance]."

  potential_customer:
    context: "Someone expresses interest in product/service"
    templates:
      - "Glad this resonated! Happy to share more about [product/service]. Sending you a DM with details."
      - "Thanks for the interest! Quick question — what's the main thing you're trying to solve? (Helps me point you in the right direction)"
      - "Appreciate that! I'll DM you — want to make sure you get exactly what you need."
```

### DM Sequence Templates

```yaml
dm_sequence_templates:

  new_follower_welcome:
    trigger: "New follow + meaningful engagement"
    message_1:
      delay: "2-4 hours"
      template: |
        Hey [Name]! Thanks for joining the community.

        Curious — what content caught your attention?

        Always love knowing what brings people here.

    message_2:
      trigger: "They respond"
      template: |
        [Acknowledge their answer specifically]

        That's awesome. I'm always curious what people are working on — what's your current focus?

    message_3:
      trigger: "Conversation develops"
      approach: "Continue genuinely based on their responses, look for natural next step"

  lead_inquiry:
    trigger: "Comment expressing interest in product/service"
    message_1:
      delay: "Same day"
      template: |
        Hey [Name]! Saw your comment about [topic].

        Happy to share more details here. Quick question first: what's the main problem you're trying to solve?

        Helps me point you in the right direction.

    message_2:
      trigger: "They respond with pain point"
      template: |
        Got it — [acknowledge their pain point specifically].

        I've seen a lot of people deal with that. Here's what's worked: [brief insight]

        Would it help if I [next step: shared more, hopped on a call, sent a resource]?

    message_3:
      trigger: "Positive response"
      template: |
        Perfect. [Provide value/next step]

        Let me know if any questions come up. Here to help.

    follow_up:
      trigger: "No response after 48 hours"
      template: |
        Hey [Name], just checking in — no pressure.

        Let me know if you have questions or if timing's off.

        Either way, hope the content keeps helping.

  collaboration_inquiry:
    trigger: "Comment suggesting collaboration"
    message_1:
      delay: "Same day"
      template: |
        Hey [Name]! Loved your comment about [collaboration idea].

        I'm definitely open to exploring this. Quick context: what did you have in mind?

    message_2:
      trigger: "They share idea"
      template: |
        [React positively to viable ideas]

        This could be interesting. A few questions:
        - [Clarifying question 1]
        - [Clarifying question 2]

        What's your timeline thinking?

    progression: "Move to call or more detailed discussion based on viability"
```

---

## EXAMPLES

### Example 1: High-Priority Post Engagement Protocol

```yaml
example_high_priority:
  content_id: "OME-2026-Q1-042"
  content_title: "The 5-Second Rule That Changed My Business"
  platform: "Instagram"
  virality_score: 82
  post_time: "2026-03-15 12:30 PM EST"
  engagement_priority: "HIGH"

  first_60_minutes_execution:

    minute_0_to_5:
      self_comment:
        text: "Curious which of these 5 seconds resonates most with you? For me, #3 was the game-changer."
        posted: "12:31 PM"

      story_posted:
        content: "Just dropped something that took me 3 years to figure out"
        sticker: "Poll - Have you tried the 5-second rule? Yes/No"
        posted: "12:33 PM"

      close_friends_share:
        message: "New post up — would love your thoughts on this one"
        sent_to: "Top 25 engaged followers"
        posted: "12:34 PM"

    minute_5_to_15:
      comments_received: 12
      replies_sent: 12
      average_reply_time: "2.3 minutes"
      reply_examples:
        - comment: "This is exactly what I needed to hear today"
          reply: "Timing is everything! What are you working through right now?"
        - comment: "Does this work for bigger decisions too?"
          reply: "Great question! Actually yes — the key is [specific insight]. Have you tried it with bigger decisions?"

      niche_engagement:
        accounts_engaged: 8
        quality_comments_left: 8
        profile_visits: 15

    minute_15_to_30:
      pinned_comment: "The real magic of the 5-second rule isn't in the action — it's in interrupting the pattern that stops you. What pattern do you need to interrupt?"
      second_value_drop: "By the way, there's a 6th second most people miss: the moment you decide to share what you learned. That's where compound growth happens."

    minute_30_to_60:
      dm_prospects_identified:
        - user: "@entrepreneur_sarah"
          trigger: "Asked about applying to team management"
          dm_sent: "Hey Sarah! Saw your question about team management. Here's the deeper dive..."
        - user: "@coach_mike"
          trigger: "Shared personal story about procrastination"
          dm_sent: "Hey Mike, really appreciated your vulnerability in that comment. Didn't want to put you on blast publicly..."

      performance_assessment:
        views: 2,340
        engagement_rate: "7.2%"
        compared_to_average: "+180%"
        decision: "AMPLIFY — Notify network (S17), prep follow-up content"

  results:
    hour_1_engagement_rate: "8.1%"
    hour_1_comments: 47
    hour_1_dm_conversations: 4
    hour_1_decision: "Network amplification activated"
```

### Example 2: Controversy Response

```yaml
example_controversy:
  content_id: "OME-2026-Q1-051"
  content_title: "Why I Stopped Using [Popular Tool]"
  platform: "X/Twitter"
  controversy_level: "Level 2 — Moderate"

  situation:
    criticism: "Thread being quote-tweeted by fans of [Popular Tool]"
    volume: "15+ critical replies in first hour"
    sentiment: "Defensive, some aggressive"

  response_execution:

    initial_assessment:
      time: "15 minutes after controversy detected"
      valid_criticism:
        - "I didn't acknowledge Tool X's improvements in last update"
        - "My comparison was based on old version"
      invalid_criticism:
        - "Ad hominem attacks"
        - "Accusations without evidence"

    response_strategy:
      approach: "Acknowledge valid points, don't engage bad faith"

      public_response:
        posted: "45 minutes after controversy started"
        text: |
          Fair point from several people — I should have been clearer.

          My experience was with [Tool X] v2.3. I've heard v3.0 addressed some of these issues.

          If you've used both versions, I'm genuinely curious: what changed for you?

          Not trying to trash anyone's tools. Just sharing what worked (and didn't) for my specific workflow.

    engagement_choices:
      engaged_with:
        - "Thoughtful critics who made valid points"
        - "Neutral observers asking questions"
      did_not_engage:
        - "Aggressive trolls"
        - "People clearly not reading the original"
        - "Pile-on accounts"

    dm_follow_up:
      prospects: "3 people who shared nuanced perspectives"
      approach: "Thank them privately, start relationship"

  results:
    controversy_duration: "~4 hours"
    resolution: "Conversation became constructive"
    net_outcome: "Gained followers who appreciated nuanced response"
    learning: "Include version numbers in tool comparisons"
```

---

## VALIDATION REQUIREMENTS

EPF passes when:

- [ ] First 60 minutes protocol fully specified
- [ ] Comment seeding strategy defined with actual text
- [ ] Reply hierarchy documented with templates
- [ ] DM triggers and opener scripts written
- [ ] Community engagement schedule realistic and complete
- [ ] Controversy responses prepared for likely criticisms
- [ ] All templates match brand voice (BVF)
- [ ] All language patterns mirror audience (AIF)
- [ ] Metrics and targets defined
- [ ] Escalation path clear

---

## OUTPUT LOCATION

Save EPF to:
```
skills/distribution/S16-engagement-protocol/outputs/[campaign]-[content-id]-EPF.yaml
```

---

## NEXT SKILL

Upon completion, S17: Network Amplification coordinates broader engagement strategy.

---

*Engagement is not a post-publish afterthought. It is the difference between content that exists and content that matters. Every comment is a relationship waiting to happen.*
