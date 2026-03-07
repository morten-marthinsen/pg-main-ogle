---
name: content-architecture
description: >-
  Content pillar design and strategic structure for organic content programs.
  Use after brand voice (S03) is complete and you need to design the structural
  framework — pillars, series, formats, and funnel integration. Produces the
  Content Architecture File (CAF) with content pillars, series concepts,
  format distribution, and customer journey mapping. Without architecture,
  content is random output; with it, every piece builds toward a destination.
  Trigger when users mention content pillars, content strategy, content
  calendar structure, series planning, or organizing content into a system.
  Requires the Brand Voice File (BVF) from S03.
---

# S04: CONTENT ARCHITECTURE
## Content Pillars + Strategic Structure
## Gate: G03 (Requires S03 BVF) | Output: CAF (Content Architecture File)

---

## PURPOSE

This skill designs the structural framework for all content. Pillars, series, formats, and funnel integration. Without architecture, content is random output. With it, every piece builds toward a destination.

**Output:** Content Architecture File (CAF)
**Unlocks:** S05: Hook Library (via Gate G04)

## ANTI-DEGRADATION

- Read `S04-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `skills/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## REQUIRED CONTEXT

### Teachings to Load
- `teachings/content-strategy/hormozi-content-to-leads.yaml`
- `teachings/content-strategy/vaynerchuk-pillar-strategy.yaml`
- `teachings/content-strategy/miller-customer-journey.yaml`
- `teachings/monetization/content-funnel-frameworks.yaml`

### Specimens to Load
- Content architecture examples from successful creators
- Series formats that drive engagement
- Funnel integration specimens

### Prerequisite Files
- S01 Output: `outputs/[campaign]-AIF.yaml` (pain/desire mapping)
- S02 Output: `outputs/[campaign]-PSF.yaml` (platform requirements)
- S03 Output: `outputs/[campaign]-BVF.yaml` (voice constraints)

---

## INPUT REQUIREMENTS

S01-S03 outputs, plus:

```yaml
business_context:
  core_offerings:
    - offering: [Name]
      price_point: [Range]
      target_customer: [Who it's for]
      content_role: [How content supports it]

  content_goals:
    primary: [Awareness/Leads/Sales/Authority]
    secondary: [Additional goals]

  existing_content:
    what_works: [Content that performs]
    what_fails: [Content that doesn't]
    gaps: [What's missing]

  creator_preferences:
    formats_enjoy: [What creator likes making]
    formats_avoid: [What creator dislikes]
    time_per_piece: [Realistic production time]
```

---

## PROCESS

### Phase 1: Content Pillar Definition

Define 3-5 content pillars:

```yaml
content_pillars:
  pillar_1:
    name: [Pillar name]
    description: |
      [What this pillar covers]

    audience_need: |
      [Which pain/desire from AIF this addresses]

    topic_clusters:
      - cluster: [Topic area]
        subtopics:
          - [Subtopic 1]
          - [Subtopic 2]
          - [Subtopic 3]

    content_types:
      - type: [Format]
        frequency: [How often]
        example_titles:
          - [Title 1]
          - [Title 2]
          - [Title 3]

    business_connection: |
      [How this pillar connects to revenue]

    percentage_of_content: [% of total output]

  pillar_2:
    # Same structure

  pillar_3:
    # Same structure

  pillar_4:
    # Same structure (optional)

  pillar_5:
    # Same structure (optional)
```

**Pillar Design Principles:**
1. Each pillar must map to a real audience pain or desire (from AIF)
2. Pillars should be distinct but related
3. At least one pillar must directly connect to revenue
4. No pillar should be <15% or >40% of content

### Phase 2: Content Function Mapping

Map content functions to business outcomes:

```yaml
content_functions:
  awareness:
    purpose: |
      Introduce brand to new audiences, maximize reach
    percentage: [% of content]

    characteristics:
      - Broad appeal topics
      - High shareability
      - Optimized for algorithm discovery
      - Lower depth, higher entertainment

    content_types:
      - type: [Format]
        pillar: [Which pillar]
        frequency: [How often]

    success_metrics:
      - Reach
      - Impressions
      - New followers
      - Video views

  engagement:
    purpose: |
      Deepen relationship with existing audience
    percentage: [% of content]

    characteristics:
      - Encourages comments and discussion
      - Builds community feeling
      - Creates inside jokes and references
      - Personal stories and opinions

    content_types:
      - type: [Format]
        pillar: [Which pillar]
        frequency: [How often]

    success_metrics:
      - Comments
      - Saves
      - Shares
      - DMs

  conversion:
    purpose: |
      Move audience toward purchase/action
    percentage: [% of content]

    characteristics:
      - Clear value demonstration
      - Social proof integration
      - Direct or indirect CTAs
      - Problem-solution framing

    content_types:
      - type: [Format]
        pillar: [Which pillar]
        frequency: [How often]

    success_metrics:
      - Link clicks
      - Sign-ups
      - Purchases
      - Inquiries

  community:
    purpose: |
      Reward and activate loyal followers
    percentage: [% of content]

    characteristics:
      - Insider content
      - Behind-the-scenes
      - Direct interaction
      - Co-creation opportunities

    content_types:
      - type: [Format]
        pillar: [Which pillar]
        frequency: [How often]

    success_metrics:
      - Reply rate
      - Story engagement
      - UGC creation
      - Retention metrics
```

**Recommended Function Mix:**
- Awareness: 40-50%
- Engagement: 25-30%
- Conversion: 15-20%
- Community: 10-15%

### Phase 3: Series Architecture

Design recurring content series:

```yaml
content_series:
  series_1:
    name: [Series name]
    format: [Video/carousel/thread/etc]
    platform: [Primary platform]
    pillar: [Which pillar]
    function: [Primary function]

    concept: |
      [What makes this series distinctive]

    structure:
      hook_pattern: |
        [How each episode hooks]
      body_pattern: |
        [What the middle looks like]
      close_pattern: |
        [How each episode ends]

    frequency: [How often]
    total_episodes: [If limited] or "Ongoing"

    example_episodes:
      - title: [Episode 1]
        hook: [Specific hook]
      - title: [Episode 2]
        hook: [Specific hook]
      - title: [Episode 3]
        hook: [Specific hook]

    success_criteria:
      views_target: [Per episode]
      engagement_target: [%]
      series_growth: [Episode-over-episode]

  series_2:
    # Same structure

  series_3:
    # Same structure
```

**Series Design Principles:**
1. Series builds anticipation (people wait for next episode)
2. Clear pattern but room for variation
3. Ownable — only you could make this series
4. Maps to business objective

### Phase 4: Format Matrix

Define all content formats in use:

```yaml
format_matrix:
  short_form_video:
    platforms: [Where used]
    length_range: [Seconds]
    production_time: [Hours]
    frequency: [Per week]

    variations:
      - name: [Variation 1]
        description: [What makes it distinct]
        use_case: [When to use]

      - name: [Variation 2]
        description: [What makes it distinct]
        use_case: [When to use]

    pillar_fit:
      - pillar: [Name]
        fit_score: [1-10]

  long_form_video:
    platforms: [Where used]
    length_range: [Minutes]
    production_time: [Hours]
    frequency: [Per week/month]

    variations:
      - name: [Variation]
        description: [What makes it distinct]
        use_case: [When to use]

    pillar_fit:
      - pillar: [Name]
        fit_score: [1-10]

  carousel:
    platforms: [Where used]
    slide_count: [Typical range]
    production_time: [Hours]
    frequency: [Per week]

    variations:
      - name: [Variation]
        description: [What makes it distinct]
        use_case: [When to use]

    pillar_fit:
      - pillar: [Name]
        fit_score: [1-10]

  single_image:
    # Same structure

  thread:
    # Same structure

  story:
    # Same structure

  live:
    # Same structure
```

### Phase 5: Funnel Integration

Connect content to revenue path:

```yaml
funnel_integration:
  content_funnel:
    top_of_funnel:
      content_role: |
        Attract and introduce
      content_types: []
      call_to_action: [What we ask them to do]
      next_step: [Where they go]

    middle_of_funnel:
      content_role: |
        Educate and nurture
      content_types: []
      call_to_action: [What we ask them to do]
      next_step: [Where they go]

    bottom_of_funnel:
      content_role: |
        Convert and activate
      content_types: []
      call_to_action: [What we ask them to do]
      next_step: [Where they go]

  cta_strategy:
    primary_ctas:
      - cta: [What we ask]
        content_types: [Where it appears]
        frequency: [How often]
        destination: [Where it leads]

    soft_ctas:
      - cta: [Lower commitment ask]
        content_types: [Where it appears]

  lead_magnets:
    - name: [Lead magnet]
      content_that_promotes: [Which content types]
      frequency: [How often mentioned]

  offer_integration:
    - offer: [Product/service]
      content_types_that_support: []
      mention_frequency: [How often]
      approach: [Direct/indirect/case study/etc]
```

### Phase 6: Content Calendar Framework

Build the structural calendar:

```yaml
calendar_framework:
  weekly_rhythm:
    monday:
      primary_format: [Format]
      function: [Awareness/Engagement/etc]
      pillar_focus: [Which pillar]

    tuesday:
      # Same structure

    wednesday:
      # Same structure

    thursday:
      # Same structure

    friday:
      # Same structure

    saturday:
      # Same structure

    sunday:
      # Same structure

  posting_cadence:
    platform_1:
      daily_posts: [Count]
      story_frequency: [Per day]
      live_frequency: [Per week/month]

    platform_2:
      # Same structure

  content_batch_structure:
    batch_size: [How many pieces at once]
    batch_frequency: [How often batching happens]
    batch_day: [When batching occurs]

  seasonal_adjustments:
    holidays: [How content changes]
    launches: [How launches affect calendar]
    slow_periods: [How to handle]
```

---

## OUTPUT: CONTENT ARCHITECTURE FILE (CAF)

Complete CAF Template:

```yaml
# CONTENT ARCHITECTURE FILE (CAF)
# Campaign: [Name]
# Created: [Date]
# Version: 1.0

campaign_name:
date_created:
version: "1.0"

## CONTENT PILLARS
content_pillars:
  - name:
    description: |
    audience_need: |
    topic_clusters: []
    percentage_of_content:
    business_connection: |

## CONTENT FUNCTIONS
content_functions:
  awareness:
    percentage:
    content_types: []
  engagement:
    percentage:
    content_types: []
  conversion:
    percentage:
    content_types: []
  community:
    percentage:
    content_types: []

## CONTENT SERIES
content_series:
  - name:
    format:
    platform:
    pillar:
    function:
    concept: |
    frequency:
    example_episodes: []

## FORMAT MATRIX
format_matrix:
  formats_in_use: []
  format_details: {}

## FUNNEL INTEGRATION
funnel_integration:
  content_funnel:
    top: {}
    middle: {}
    bottom: {}
  cta_strategy: {}
  offer_integration: []

## CALENDAR FRAMEWORK
calendar_framework:
  weekly_rhythm: {}
  posting_cadence: {}
  content_batch_structure: {}

## SOURCE FILES
source_files:
  AIF: "skills/foundation/S01-audience-intelligence/outputs/[name]-AIF.yaml"
  PSF: "skills/foundation/S02-platform-strategy/outputs/[name]-PSF.yaml"
  BVF: "skills/foundation/S03-brand-voice/outputs/[name]-BVF.yaml"
```

---

## VALIDATION REQUIREMENTS

CAF must have these fields populated to pass Gate G04:

- [ ] content_pillars (>=3 pillars defined)
- [ ] Each pillar has audience_need mapped
- [ ] content_functions percentages sum to 100%
- [ ] content_series (>=1 series defined)
- [ ] format_matrix (>=3 formats defined)
- [ ] funnel_integration.cta_strategy (primary CTA defined)
- [ ] calendar_framework.weekly_rhythm (all 7 days defined)
- [ ] calendar_framework.posting_cadence (>=1 platform defined)

---

## OUTPUT LOCATION

Save CAF to:
```
skills/foundation/S04-content-architecture/outputs/[campaign-name]-CAF.yaml
```

---

## NEXT SKILL

Upon completion, S05: Hook Library is unlocked via Gate G04.

---

*Architecture is invisible until you see the chaos that exists without it.*
