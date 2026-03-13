---
name: audience-intelligence
description: >-
  Deep audience research and persona building for organic content campaigns.
  Use when launching a new organic content initiative, onboarding a new brand,
  building audience personas, or when any downstream organic skill needs audience
  context. Produces the Audience Intelligence File (AIF) covering demographics,
  psychographics, platform behavior, language mining, competitor audience analysis,
  and pain/desire mapping. This is the entry point for the Organic Engine —
  all production, distribution, and analysis skills depend on the AIF.
  Trigger when users mention audience research, persona development, understanding
  their audience, or starting organic content from scratch.
---

# S01: AUDIENCE INTELLIGENCE
## Deep Audience Research + Persona Building
## Gate: None (Entry Point) | Output: AIF (Audience Intelligence File)

---

## PURPOSE

This skill produces a comprehensive understanding of WHO we're creating content for. Without this, all content is guesswork.

**Output:** Audience Intelligence File (AIF)
**Unlocks:** S02: Platform Strategy (via Gate G01)

## ANTI-DEGRADATION

- Read `S01-AUDIENCE-INTELLIGENCE-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `~system/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## REQUIRED CONTEXT

### Teachings to Load
- `teachings/audience-psychology/cialdini-influence-principles.yaml`
- `teachings/audience-psychology/kane-process-communication.yaml`
- `teachings/audience-psychology/godin-permission-marketing.yaml`
- `teachings/audience-psychology/berger-invisible-influence.yaml`
- `teachings/audience-psychology/hanlon-primal-branding.yaml`

### Specimens to Load
- 5+ growth trajectory case studies from relevant niche
- Competitor audience analysis examples

---

## INPUT REQUIREMENTS

To execute this skill, you need:

```yaml
brand_info:
  name: [Brand/person name]
  category: [What space we operate in]
  existing_positioning: [How we currently position]
  key_offerings: [What we sell/promote]

existing_data:
  current_audience_size: [If applicable]
  current_engagement_rate: [If applicable]
  existing_personas: [Any prior research]
  analytics_access: [What data we have]

competitive_context:
  direct_competitors: [List]
  adjacent_competitors: [List]
  aspirational_comparisons: [Who we want to be like]

research_budget:
  time_available: [How deep can we go]
  tool_access: [SparkToro, surveys, etc.]
```

---

## PROCESS

### Phase 1: Demographic Foundation

Establish baseline demographics:

```yaml
demographics:
  age_range:
    primary: [e.g., 25-34]
    secondary: [e.g., 35-44]
    rationale: [Why this range]

  gender_split:
    male: [%]
    female: [%]
    other: [%]
    rationale: [Based on what data]

  location:
    primary_markets: [Top 3 geographic areas]
    language: [Primary language(s)]
    timezone_clusters: [For posting optimization]

  income_level:
    bracket: [Range]
    spending_capacity: [Relevant to offerings]

  professional_context:
    industries: [Where they work]
    job_levels: [Seniority]
    business_owners: [% if relevant]
```

### Phase 2: Psychographic Depth

Go beyond demographics to understand psychology:

```yaml
psychographics:
  values:
    core_values: [3-5 values that drive decisions]
    how_expressed: [How these show up in behavior]

  interests:
    primary_interests: [What they engage with]
    adjacent_interests: [Peripheral topics]
    anti_interests: [What they explicitly reject]

  lifestyle:
    daily_routine: [How they spend time]
    consumption_habits: [How they consume content]
    aspirational_lifestyle: [What they want their life to look like]

  worldview:
    beliefs: [What they believe about the world]
    attitudes: [Their stance on relevant topics]
    tribe_identity: [What group do they see themselves as part of]
```

### Phase 3: Platform Behavior Analysis

Understand HOW they consume:

```yaml
platform_behavior:
  primary_platforms:
    - platform: [Name]
      time_spent: [Estimate]
      usage_pattern: [How they use it]
      content_preference: [What they engage with]
    - platform: [Name]
      # Repeat for each platform

  consumption_patterns:
    preferred_format: [Video/text/audio]
    preferred_length: [Short/medium/long]
    consumption_time: [When do they consume]
    consumption_context: [Where/how: commute, desk, evening]

  engagement_patterns:
    what_they_like: [Content types that get engagement]
    what_they_comment_on: [What drives comments]
    what_they_share: [What's worth sharing]
    what_they_save: [What's worth returning to]

  best_times_active:
    weekday_windows: [Specific hours]
    weekend_windows: [Specific hours]
    timezone: [Reference timezone]
```

### Phase 4: Language Mining

Capture HOW they talk (this is gold for content):

```yaml
language_mining:
  words_they_use:
    vocabulary_register: [Formal/casual/technical]
    specific_words: [Exact words they use]

  phrases_they_use:
    common_expressions: [Phrases they repeat]
    in_group_language: [Insider terms]

  slang_and_jargon:
    industry_jargon: [Technical terms]
    generational_slang: [Age-specific language]
    community_terms: [Group-specific language]

  pain_expressions:
    how_they_describe_problems: [Exact phrases]
    emotional_words_used: [Frustration vocabulary]
    questions_they_ask: [What they Google/ask]

  desire_expressions:
    how_they_describe_goals: [Exact phrases]
    success_language: [How they talk about winning]
    aspiration_language: [Future-state vocabulary]
```

**Sources for Language Mining:**
- Reddit threads in relevant subreddits
- Comment sections on competitor content
- Amazon reviews of related products
- Facebook group discussions
- Twitter/X conversations
- YouTube comments
- Customer support tickets (if accessible)

### Phase 5: Competitor Audience Analysis

Understand who else has their attention:

```yaml
competitors_they_follow:
  accounts:
    - name: [Account name]
      platform: [Where]
      follower_count: [Size]
      why_they_follow: [Value provided]
      content_style: [What they do well]
      gap: [What's missing]
    # Repeat for 5-10 key competitors

  why_they_follow: [Common reasons across competitors]

  gaps_to_exploit:
    underserved_needs: [What competitors miss]
    format_gaps: [Formats not being used]
    topic_gaps: [Topics not covered]
    voice_gaps: [Tones not represented]
```

### Phase 6: Pain/Desire Mapping

The core of all marketing — what hurts and what they want:

```yaml
pain_mapping:
  surface_pains:
    - pain: [Obvious problem]
      frequency: [How often they experience]
      intensity: [How much it bothers them]
    # List 5-10 surface pains

  deeper_pains:
    - pain: [Underlying issue]
      connection_to_surface: [How it manifests]
      emotional_weight: [How it makes them feel]
    # List 3-5 deeper pains

  root_pains:
    - pain: [Core fear/frustration]
      rarely_stated: [Why they don't say this directly]
      drives_behavior: [How this shapes decisions]
    # List 1-3 root pains

desire_mapping:
  stated_desires:
    - desire: [What they say they want]
      common_phrasing: [How they express it]
    # List 5-10 stated desires

  unstated_desires:
    - desire: [What they really want]
      why_unstated: [Social pressure, awareness, etc.]
    # List 3-5 unstated desires

  identity_desires:
    - desire: [Who they want to become]
      current_gap: [Where they are vs where they want to be]
    # List 2-3 identity desires
```

---

## OUTPUT: AUDIENCE INTELLIGENCE FILE (AIF)

Complete AIF Template:

```yaml
# AUDIENCE INTELLIGENCE FILE (AIF)
# Campaign: [Name]
# Created: [Date]
# Version: 1.0

brand: [Brand Name]
date_created: [Timestamp]
version: "1.0"

## SECTION 1: DEMOGRAPHICS
demographics:
  age_range:
    primary:
    secondary:
  gender_split:
    male:
    female:
    other:
  location:
    primary_markets: []
    language:
    timezone_clusters: []
  income_level:
    bracket:
    spending_capacity:
  professional_context:
    industries: []
    job_levels: []
    business_owners:

## SECTION 2: PSYCHOGRAPHICS
psychographics:
  values:
    core_values: []
    how_expressed:
  interests:
    primary_interests: []
    adjacent_interests: []
    anti_interests: []
  lifestyle:
    daily_routine:
    consumption_habits:
    aspirational_lifestyle:
  worldview:
    beliefs: []
    attitudes: []
    tribe_identity:

## SECTION 3: PLATFORM BEHAVIOR
platform_behavior:
  primary_platforms: []
  consumption_patterns:
    preferred_format:
    preferred_length:
    consumption_time:
    consumption_context:
  engagement_patterns:
    what_they_like:
    what_they_comment_on:
    what_they_share:
    what_they_save:
  best_times_active:
    weekday_windows: []
    weekend_windows: []
    timezone:

## SECTION 4: LANGUAGE
language_mining:
  words_they_use: []
  phrases_they_use: []
  slang_and_jargon: []
  pain_expressions:
    how_they_describe_problems: []
    emotional_words_used: []
    questions_they_ask: []
  desire_expressions:
    how_they_describe_goals: []
    success_language: []
    aspiration_language: []

## SECTION 5: COMPETITOR AUDIENCE
competitors_they_follow:
  accounts: []
  why_they_follow:
  gaps_to_exploit:
    underserved_needs: []
    format_gaps: []
    topic_gaps: []
    voice_gaps: []

## SECTION 6: PAIN/DESIRE MAP
pain_mapping:
  surface_pains: []
  deeper_pains: []
  root_pains: []

desire_mapping:
  stated_desires: []
  unstated_desires: []
  identity_desires: []

## SECTION 7: KEY INSIGHTS
key_insights:
  primary_insight:
  secondary_insights: []
  content_implications: []
```

---

## VALIDATION REQUIREMENTS

AIF must have these fields populated to pass Gate G01:

- [ ] demographics.age_range.primary
- [ ] demographics.location.primary_markets (≥1)
- [ ] platform_behavior.primary_platforms (≥2)
- [ ] platform_behavior.best_times_active
- [ ] language_mining.pain_expressions.how_they_describe_problems (≥3)
- [ ] competitors_they_follow.accounts (≥3)
- [ ] pain_mapping.surface_pains (≥3)
- [ ] desire_mapping.stated_desires (≥3)

---

## OUTPUT LOCATION

Save AIF to:
```
core-message/S01-audience-intelligence/outputs/[campaign-name]-AIF.yaml
```

---

## NEXT SKILL

Upon completion, S02: Platform Strategy is unlocked via Gate G01.

---

*You cannot create for an audience you do not understand.*
