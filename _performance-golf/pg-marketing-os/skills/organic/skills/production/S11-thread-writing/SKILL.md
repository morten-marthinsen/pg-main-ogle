---
name: thread-writing
description: >-
  High-engagement thread architecture for X/Twitter and LinkedIn organic content.
  Use when producing multi-post threads that build authority, drive engagement,
  and maximize value delivery in a scannable long-form text format. Produces
  complete threads with all individual posts, hook structures, value cadence,
  and engagement triggers. All thread content runs through the Arena before
  finalization. Trigger when users mention threads, Twitter threads, LinkedIn
  threads, tweetstorms, multi-post content, or long-form text content for
  social platforms. Requires the Campaign Brief File (CBF) from S07.
---

# S11: THREAD WRITING
## High-Engagement Thread Architecture
## Gate: G07 (Requires S07 CBF) | Output: Production Asset

---

## PURPOSE

This skill produces viral-worthy threads for X/Twitter and LinkedIn. Threads are long-form text content that builds authority, drives engagement, and maximizes value delivery in a scannable format.

**Output:** Complete thread with all tweets/posts
**Prerequisite:** Campaign Brief File (CBF) required

## ANTI-DEGRADATION

- Read `S11-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `skills/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## REQUIRED CONTEXT

### Load Before Execution
- `CLAUDE-CORE.md` — Inviolable laws
- `CLAUDE-ARENA.md` — Production content runs through Arena
- Campaign Brief File (CBF) from S07

### Teachings to Reference
- `teachings/virality/berger-stepps-framework.yaml`
- `teachings/virality/heath-succes-framework.yaml`
- `teachings/audience-psychology/cialdini-influence-principles.yaml`

### Specimens to Load
- High-performing thread specimens
- Viral thread breakdowns

---

## INPUT REQUIREMENTS

```yaml
thread_brief:
  topic: [What this thread teaches/shares]
  platform: [X/Twitter or LinkedIn]
  content_function: [Awareness/Engagement/Conversion/Community]
  pillar: [From CAF]

  key_points:
    - point_1: [Core message 1]
    - point_2: [Core message 2]
    - point_3: [Core message 3]
    # ... up to 15

  thread_goal:
    primary: [RT/Like/Reply/Profile visit/Link click]
    secondary: [Additional goals]

  cta_goal: [What action after consuming]
  tone_override: [If different from CBF default]

  constraints:
    tweet_count: [5-15 tweets]
    include_visuals: [Yes/No/Partial]
```

---

## PROCESS

### Phase 1: Platform-Specific Architecture

```yaml
platform_specs:
  x_twitter:
    character_limit: 280 per tweet
    thread_display: "Show as connected thread"
    media_per_tweet: "Up to 4 images, 1 video, 1 link card"
    numbering: "Optional but recommended (1/15 or just numbers)"

    algorithm_factors:
      - First tweet engagement determines reach
      - Quote tweets amplify significantly
      - Replies and bookmarks signal quality
      - Media increases engagement
      - Thread completion rate matters

  linkedin:
    character_limit: 3000 per post
    thread_display: "Posts are separate, linked in comments"
    approach: "Single long post OR multi-post series"

    algorithm_factors:
      - Dwell time (time reading)
      - Comments (especially long ones)
      - Reposts with commentary
      - Native content preferred
```

### Phase 2: Thread Type Selection

```yaml
thread_types:
  listicle_thread:
    description: "Numbered insights, tips, or lessons"
    structure:
      - Tweet 1: Hook + promise
      - Tweet 2: Context/credibility
      - Tweets 3-N: Individual points
      - Final tweet: Summary + CTA
    best_for: ["Tips", "Lessons learned", "Mistakes"]
    engagement_driver: "Comprehensive value, easy to consume"
    example_hook: "15 lessons from building a $10M business:"

  story_thread:
    description: "Narrative arc with lessons"
    structure:
      - Tweet 1: Hook (tension/intrigue)
      - Tweet 2-4: Story setup
      - Tweet 5-8: Journey/conflict
      - Tweet 9-11: Resolution/transformation
      - Tweet 12+: Lessons extracted
      - Final tweet: CTA
    best_for: ["Personal stories", "Case studies", "Transformations"]
    engagement_driver: "Emotional investment"
    example_hook: "In 2019, I was $50K in debt and sleeping on a friend's couch. This is the story of how everything changed."

  breakdown_thread:
    description: "Analysis of specific example"
    structure:
      - Tweet 1: What we're breaking down
      - Tweet 2: Why it matters
      - Tweets 3-N: Individual insights
      - Final tweet: Key takeaways + CTA
    best_for: ["Case studies", "Strategy analysis", "Teardowns"]
    engagement_driver: "Intellectual value, learn from success"
    example_hook: "I analyzed @MrBeast's last 100 videos. Here's what I found:"

  framework_thread:
    description: "Teaching a methodology"
    structure:
      - Tweet 1: Framework name + promise
      - Tweet 2: Why this works
      - Tweets 3-N: Framework steps
      - Final tweet: How to implement + CTA
    best_for: ["Systems", "Processes", "Methodologies"]
    engagement_driver: "Actionable, saveable, implementable"
    example_hook: "The 5-step framework behind every viral thread:"

  prediction_thread:
    description: "Forward-looking analysis"
    structure:
      - Tweet 1: Bold prediction hook
      - Tweet 2: Context/credentials
      - Tweets 3-N: Evidence and reasoning
      - Final tweet: What to do about it
    best_for: ["Thought leadership", "Industry trends", "Hot takes"]
    engagement_driver: "Controversy, forward-thinking"
    example_hook: "In 2025, 90% of content creators will fail. Here's why (and what to do):"

  curation_thread:
    description: "Best resources, tools, examples"
    structure:
      - Tweet 1: What you've curated
      - Tweets 2-N: Individual items with brief commentary
      - Final tweet: Summary + CTA
    best_for: ["Resources", "Tools", "Examples"]
    engagement_driver: "Utility, saves time"
    example_hook: "I've tested 50+ AI tools. Here are the 12 worth paying for:"
```

### Phase 3: Tweet 1 (The Hook)

The first tweet determines thread success:

```yaml
tweet_1_architecture:
  purpose: "Stop scroll, earn the thread read"

  elements:
    hook:
      requirements:
        - Works standalone (no context needed)
        - Creates curiosity or desire
        - Specific over vague
        - Number or time frame if applicable
      max_length: "60-80% of character limit"

    promise:
      requirements:
        - Clear value proposition
        - What they'll learn/get
        - Implicit "read this thread"

  hook_templates:
    listicle: "[Number] [things] I learned from [experience]:"
    story: "[Dramatic setup]. Here's what happened:"
    breakdown: "I [analyzed/studied/researched] [thing]. Here's what I found:"
    framework: "The [adjective] [framework] for [outcome]:"
    prediction: "[Bold claim about future]. Here's why:"
    curation: "[Number] [resources] that [benefit]:"

  hook_amplifiers:
    - Specific numbers beat vague ("$47K" beats "a lot")
    - Time frames create urgency ("in 30 days")
    - Credentials in hook build trust ("After 10 years...")
    - Contrarian angles stand out ("Everyone says X. They're wrong.")

  tweet_1_checklist:
    - [ ] Works without reading any other tweet
    - [ ] Creates curiosity or desire
    - [ ] Clear what thread delivers
    - [ ] No wasted words
    - [ ] Strong enough to RT on its own
```

### Phase 4: Body Tweets (Tweets 2 to N-1)

Structure the value delivery:

```yaml
body_architecture:
  tweet_principles:
    - Each tweet should be valuable standalone
    - Maintain momentum (no filler tweets)
    - Vary structure to maintain interest
    - Build to strongest points (not necessarily save for last)

  tweet_structures:
    tip_tweet:
      format: "[Number]. [Tip headline]\n\n[Brief explanation or example]"
      character_budget: "50 chars headline, rest for body"

    story_beat_tweet:
      format: "[Narrative moment]\n\n[What it meant or what happened]"
      character_budget: "Full 280 for story flow"

    insight_tweet:
      format: "[Core insight]\n\n[Evidence or example]\n\n[Implication]"
      character_budget: "80/100/100"

    comparison_tweet:
      format: "[Old way/wrong way]\n\nvs.\n\n[New way/right way]"
      character_budget: "130/130 split"

    quote_tweet:
      format: "\"[Quote]\"\n\n— [Attribution or context]"
      character_budget: "200 quote, 80 attribution"

  pacing_principles:
    - Strong point → Context → Strong point (vary intensity)
    - Visual tweet every 3-4 tweets if possible
    - No two consecutive tweets with same structure
    - Transition tweets ("But here's the thing..." / "That's not all...")

  engagement_boosters:
    - Questions that invite replies
    - Controversial statements (within bounds)
    - Personal stories mixed with tactics
    - Specific examples and case studies
```

### Phase 5: Final Tweet (CTA)

Convert attention into action:

```yaml
final_tweet_architecture:
  elements:
    summary:
      optional: true
      format: "TLDR: [Key points]" or "Recap: [Main takeaway]"

    cta:
      requirements:
        - Clear specific action
        - Matches thread goal
        - Gives reason to act

    loop_close:
      optional: true
      format: "Reference back to hook/promise"

  cta_templates:
    engagement_cta:
      - "Found this helpful? RT the first tweet to help others."
      - "Which point hit hardest? Reply with the number."
      - "Bookmark this for when you need it."

    follow_cta:
      - "Follow @[handle] for more threads like this."
      - "I write about [topic] every week. Follow along."

    lead_cta:
      - "Want the full [resource]? DM me '[keyword]'."
      - "I put everything in a [format]. Link in bio."

    conversion_cta:
      - "I teach this in depth at [program]. Link in bio."
      - "Want me to help you with this? [Call booking link]"

  final_tweet_checklist:
    - [ ] Thread value justifies the ask
    - [ ] CTA is specific and clear
    - [ ] Easy to take action
    - [ ] Matches content function from CBF
```

### Phase 6: Formatting and Polish

```yaml
formatting:
  line_breaks:
    purpose: "Visual breathing room"
    rules:
      - Break after hook sentence
      - Break before key points
      - Single line for emphasis

  numbering:
    x_twitter: "1/ or 1. or 1)" at start
    linkedin: "Optional, often just bold headers"

  emphasis:
    all_caps: "Sparingly for key words"
    quotation_marks: "For quotes and key terms"

  emojis:
    x_twitter: "Minimal or none (more serious tone)"
    linkedin: "Strategic use (one per point max)"

  media:
    x_twitter:
      - Screenshots for proof/examples
      - Diagrams for frameworks
      - Charts for data
    linkedin:
      - Document/carousel format available
      - Native video performs well

thread_checklist:
  - [ ] Tweet 1 hooks standalone
  - [ ] Every tweet adds value
  - [ ] No filler tweets
  - [ ] Consistent formatting
  - [ ] Smooth transitions
  - [ ] Strong CTA
  - [ ] Voice aligned with BVF
  - [ ] Anti-slop check passed
```

---

## OUTPUT FORMAT

```yaml
thread_output:
  title:
  platform:
  content_function:
  thread_type:
  total_tweets:

  tweets:
    - tweet_number: 1
      type: "hook"
      content: |
      media: [Description if applicable]
      character_count:

    - tweet_number: 2
      type: "context"
      content: |
      media: [Description if applicable]
      character_count:

    # ... continue for all tweets

    - tweet_number: [final]
      type: "cta"
      content: |
      character_count:

  thread_copy: |
    [Full thread formatted for easy copying]

  engagement_prediction:
    estimated_rt_potential: [Low/Medium/High]
    estimated_reply_rate: [Low/Medium/High]
    virality_indicators: []

  quality_scores:
    hook_strength: [1-10]
    value_density: [1-10]
    flow_and_pacing: [1-10]
    cta_clarity: [1-10]
    overall_score: [1-100]
```

---

## VALIDATION REQUIREMENTS

Thread must pass:
- [ ] Tweet 1 works standalone as hook
- [ ] All tweets under character limit
- [ ] No filler tweets (each adds value)
- [ ] Smooth transitions between tweets
- [ ] Consistent numbering/formatting
- [ ] CTA clear and appropriate
- [ ] Voice aligned with BVF
- [ ] Anti-slop check passed
- [ ] 5-15 tweets total

---

## ARENA INTEGRATION

All threads must run through Arena competition:
1. Generate thread using this skill
2. Pass to S13: Arena Generation
3. 7 personas evaluate each tweet
4. Synthesize best version
5. Final thread produced

---

*The thread is the thinking person's viral content. Every tweet should earn the next tweet.*
