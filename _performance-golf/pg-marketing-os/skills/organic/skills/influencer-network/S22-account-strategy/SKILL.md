---
name: influencer-account-strategy
description: >-
  Comprehensive per-account content strategies, growth plans, and operational
  playbooks for AI influencer accounts. Use after persona creation (S21) when
  you need to transform persona identities into thriving social media accounts
  with specific platform strategies. Produces account playbooks with content
  calendars, growth milestones, engagement tactics, and monetization readiness
  indicators per platform. Trigger when users mention account strategy, growth
  plan, influencer content plan, platform playbook, or turning personas into
  accounts. Requires Persona Bibles from S21-Persona Architect.
---

# S22: ACCOUNT STRATEGY

## SKILL IDENTITY

**Skill ID:** S22-account-strategy
**Name:** Account Strategy
**Version:** 1.0.0
**Purpose:** Develop comprehensive per-account content strategies, growth plans, and operational playbooks that transform persona identities into thriving social media accounts
**Position in Pipeline:** Second skill in Influencer Network cluster (S21 → S22 → S23 → S24)
**Upstream Dependencies:** S21-Persona Architect (Persona Bibles required)
**Downstream Consumers:** S23-Network Coordination, S24-Monetization Engine, Content Production Teams

## ANTI-DEGRADATION

- Read `S22-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `skills/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## PREREQUISITES (Gate Requirements)

### Required Before Execution

| Gate | Requirement | Validation Method |
|------|-------------|-------------------|
| G1 | Persona Bible complete (from S21) | Document exists with all sections |
| G2 | Platform accounts created | Handles reserved and verified |
| G3 | Visual assets generated | Profile pics, banners ready |
| G4 | Content production capacity confirmed | Resource allocation documented |
| G5 | Posting tools/scheduling access | Tools configured and tested |
| G6 | Analytics tracking set up | Pixels, UTMs, tracking in place |
| G7 | Compliance review complete | Legal sign-off on account approach |

### Soft Prerequisites (Recommended)

- Competitor analysis for each platform
- Platform algorithm research current
- Hashtag research complete
- Content calendar template selected
- Engagement response protocols drafted

---

## INPUT REQUIREMENTS

### Required Inputs

```yaml
persona_bible:
  persona_id: string
  name: object
  archetype: string
  sub_niche: object
  voice_architecture: object
  visual_identity: object
  content_pillars: array

platform_config:
  target_platforms: array
  platform_priorities: object (ranked 1-N)
  platform_specific_goals: object

growth_parameters:
  timeline: string (e.g., "12 months")
  target_followers: object (per platform)
  engagement_rate_targets: object
  content_velocity: object (posts per platform per week)

resource_constraints:
  content_budget: number
  production_hours_weekly: number
  engagement_hours_weekly: number
  tools_available: array
```

### Optional Inputs

```yaml
existing_account_data: object (if account already has history)
competitor_benchmarks: array
seasonal_considerations: array
campaign_calendar: array
monetization_priorities: array
collaboration_opportunities: array
```

---

## PROCESS (Step-by-Step Execution Protocol)

### Phase 1: Platform Selection and Prioritization

**Duration:** 30-45 minutes

**Step 1.1: Platform-Persona Fit Analysis**

For each potential platform, score fit (1-10) across these dimensions:

| Dimension | Weight | Scoring Criteria |
|-----------|--------|------------------|
| Audience Match | 25% | Target demo active on platform |
| Content Format Fit | 25% | Persona's preferred formats work here |
| Archetype Alignment | 20% | Platform rewards this archetype type |
| Growth Potential | 15% | Realistic path to meaningful following |
| Monetization Fit | 15% | Revenue opportunities align |

**Platform Scoring Matrix:**

```
PLATFORM FIT SCORECARD: [Persona Name]

                    | Audience | Format | Archetype | Growth | Monetization | TOTAL |
--------------------|----------|--------|-----------|--------|--------------|-------|
Instagram           |    /10   |   /10  |    /10    |   /10  |     /10      |  /50  |
TikTok              |    /10   |   /10  |    /10    |   /10  |     /10      |  /50  |
YouTube             |    /10   |   /10  |    /10    |   /10  |     /10      |  /50  |
Twitter/X           |    /10   |   /10  |    /10    |   /10  |     /10      |  /50  |
LinkedIn            |    /10   |   /10  |    /10    |   /10  |     /10      |  /50  |
Threads             |    /10   |   /10  |    /10    |   /10  |     /10      |  /50  |

RECOMMENDATION:
- Primary Platform: [Highest score]
- Secondary Platform: [Second highest]
- Tertiary Platform: [Third, if above threshold]
- Skip: [Below threshold scores]
```

**Step 1.2: Platform Priority Assignment**

```yaml
platform_priorities:
  primary:
    platform: string
    content_allocation: "60% of effort"
    posting_frequency: string
    growth_target: number

  secondary:
    platform: string
    content_allocation: "30% of effort"
    posting_frequency: string
    growth_target: number

  tertiary:
    platform: string
    content_allocation: "10% of effort"
    posting_frequency: string
    growth_target: number
```

---

### Phase 2: Content Pillar Strategy

**Duration:** 45-60 minutes

**Step 2.1: Pillar Definition and Allocation**

Transform persona content pillars into actionable content categories:

```yaml
content_pillars:
  pillar_1:
    name: string
    description: string
    percentage_of_content: integer (sum to 100)
    primary_formats: array
    posting_frequency: string
    content_goals: array
    example_topics:
      - topic: string
        angle: string
        format: string
      - topic: string
        angle: string
        format: string

  pillar_2:
    name: string
    description: string
    percentage_of_content: integer
    primary_formats: array
    posting_frequency: string
    content_goals: array
    example_topics: array

  pillar_3:
    name: string
    description: string
    percentage_of_content: integer
    primary_formats: array
    posting_frequency: string
    content_goals: array
    example_topics: array

  pillar_4:
    name: string
    description: string
    percentage_of_content: integer
    primary_formats: array
    posting_frequency: string
    content_goals: array
    example_topics: array
```

**Step 2.2: Pillar-to-Platform Mapping**

Not all pillars work on all platforms. Map appropriately:

| Pillar | Instagram | TikTok | YouTube | Twitter | LinkedIn |
|--------|-----------|--------|---------|---------|----------|
| Pillar 1 | Carousels, Reels | Videos | Shorts | Threads | Posts |
| Pillar 2 | Stories, Reels | Videos | Long-form | Tweets | Articles |
| Pillar 3 | Feed posts | Duets | Shorts | Threads | Posts |
| Pillar 4 | Reels only | Videos | Community | Tweets | Comments |

**Step 2.3: Content Series Development**

Create recurring content series for each pillar:

```yaml
content_series:
  series_1:
    name: string (catchy, memorable)
    pillar: string
    format: string
    frequency: string (e.g., "Weekly on Tuesdays")
    description: string
    hashtag: string (if applicable)
    template: string (link or description)
    examples:
      - title: string
        hook: string
      - title: string
        hook: string

  series_2:
    name: string
    pillar: string
    format: string
    frequency: string
    description: string
    hashtag: string
    template: string
    examples: array
```

---

### Phase 3: Posting Cadence and Schedule

**Duration:** 30-45 minutes

**Step 3.1: Optimal Posting Frequency**

Determine sustainable posting frequency based on:
- Platform best practices
- Content production capacity
- Quality maintenance requirements
- Engagement capacity

```yaml
posting_frequency:
  instagram:
    feed_posts: "X per week"
    stories: "X per day"
    reels: "X per week"
    total_weekly: integer

  tiktok:
    videos: "X per day/week"
    total_weekly: integer

  youtube:
    long_form: "X per week/month"
    shorts: "X per week"
    community: "X per week"
    total_weekly: integer

  twitter:
    tweets: "X per day"
    threads: "X per week"
    total_weekly: integer

  linkedin:
    posts: "X per week"
    articles: "X per month"
    total_weekly: integer
```

**Step 3.2: Posting Schedule Template**

Create weekly posting schedule:

```
WEEKLY POSTING SCHEDULE: [Persona Name]

═══════════════════════════════════════════════════════════════════════════════
MONDAY
───────────────────────────────────────────────────────────────────────────────
Instagram:
  • 9:00 AM - Feed Post (Pillar 1)
  • 12:00 PM - Stories (BTS/Engagement)
  • 6:00 PM - Reel (Pillar 2)

TikTok:
  • 11:00 AM - Video (Pillar 1)
  • 7:00 PM - Video (Pillar 3)

Twitter:
  • 8:00 AM - Tweet (Pillar 1 insight)
  • 2:00 PM - Engagement tweet
  • 5:00 PM - Tweet (Pillar 2 insight)

═══════════════════════════════════════════════════════════════════════════════
TUESDAY
───────────────────────────────────────────────────────────────────────────────
[Continue for each day...]

═══════════════════════════════════════════════════════════════════════════════
```

**Step 3.3: Time Zone Optimization**

```yaml
posting_times:
  primary_timezone: string
  target_audience_timezones: array

  optimal_times_by_platform:
    instagram:
      best_times: array
      worst_times: array
      reasoning: string

    tiktok:
      best_times: array
      worst_times: array
      reasoning: string

    youtube:
      best_times: array
      worst_times: array
      reasoning: string
```

---

### Phase 4: Growth Strategy and Milestones

**Duration:** 45-60 minutes

**Step 4.1: Growth Phase Definition**

```yaml
growth_phases:
  phase_1_foundation:
    duration: "Months 1-3"
    follower_target: number
    focus_areas:
      - "Establish consistent posting rhythm"
      - "Build initial content library"
      - "Develop engagement habits"
    key_metrics:
      - metric: string
        target: number
    tactics: array

  phase_2_momentum:
    duration: "Months 4-6"
    follower_target: number
    focus_areas:
      - "Optimize performing content"
      - "Increase collaboration"
      - "Build community"
    key_metrics: array
    tactics: array

  phase_3_scale:
    duration: "Months 7-9"
    follower_target: number
    focus_areas:
      - "Viral content attempts"
      - "Cross-platform growth"
      - "Monetization introduction"
    key_metrics: array
    tactics: array

  phase_4_authority:
    duration: "Months 10-12"
    follower_target: number
    focus_areas:
      - "Thought leadership positioning"
      - "Revenue optimization"
      - "Network leverage"
    key_metrics: array
    tactics: array
```

**Step 4.2: Follower Acquisition Tactics**

```yaml
acquisition_tactics:
  organic_tactics:
    hashtag_strategy:
      approach: string
      primary_hashtags: array
      secondary_hashtags: array
      branded_hashtags: array

    engagement_strategy:
      daily_engagement_targets:
        comments: integer
        follows: integer
        shares: integer
      target_accounts: array (accounts to engage with)
      engagement_windows: array (best times to engage)

    collaboration_strategy:
      collaboration_types: array
      target_collaborators: array
      outreach_approach: string

    trend_participation:
      trend_types_to_join: array
      trend_types_to_skip: array
      response_speed_target: string

    seo_optimization:
      keyword_targets: array
      bio_optimization: string
      caption_optimization: string

  growth_hacks:
    tactic_1:
      name: string
      description: string
      expected_impact: string
      resources_needed: string

    tactic_2:
      name: string
      description: string
      expected_impact: string
      resources_needed: string
```

**Step 4.3: Milestone Tracking Framework**

```yaml
milestones:
  follower_milestones:
    - milestone: 1000
      target_date: date
      celebration_plan: string

    - milestone: 5000
      target_date: date
      celebration_plan: string

    - milestone: 10000
      target_date: date
      celebration_plan: string
      unlock: "Swipe up / Link in bio features"

    - milestone: 50000
      target_date: date
      celebration_plan: string
      unlock: "Brand deal eligibility"

    - milestone: 100000
      target_date: date
      celebration_plan: string
      unlock: "Major monetization opportunities"

  engagement_milestones:
    - milestone: "5% engagement rate"
      target_date: date

    - milestone: "First viral post (10K+ views)"
      target_date: date

    - milestone: "First feature/repost by major account"
      target_date: date

  content_milestones:
    - milestone: "50 posts published"
      target_date: date

    - milestone: "First content series complete"
      target_date: date

    - milestone: "100 posts published"
      target_date: date
```

---

### Phase 5: Hook Library Development

**Duration:** 30-45 minutes

**Step 5.1: Hook Category Framework**

```yaml
hook_library:
  question_hooks:
    description: "Open with a compelling question"
    format_template: "[Question that implies valuable answer]"
    examples:
      - hook: string
        pillar: string
        format: string
      - hook: string
        pillar: string
        format: string
      - hook: string
        pillar: string
        format: string

  statement_hooks:
    description: "Open with bold claim or insight"
    format_template: "[Bold statement that demands attention]"
    examples:
      - hook: string
        pillar: string
        format: string
      - hook: string
        pillar: string
        format: string

  story_hooks:
    description: "Open with narrative tension"
    format_template: "[Story opening that creates curiosity]"
    examples:
      - hook: string
        pillar: string
        format: string
      - hook: string
        pillar: string
        format: string

  controversy_hooks:
    description: "Open with contrarian take"
    format_template: "[Statement that challenges conventional wisdom]"
    examples:
      - hook: string
        pillar: string
        format: string
      - hook: string
        pillar: string
        format: string

  curiosity_hooks:
    description: "Open with information gap"
    format_template: "[Statement that creates must-know feeling]"
    examples:
      - hook: string
        pillar: string
        format: string
      - hook: string
        pillar: string
        format: string

  fear_hooks:
    description: "Open with problem/pain"
    format_template: "[Statement that identifies pain point]"
    examples:
      - hook: string
        pillar: string
        format: string
      - hook: string
        pillar: string
        format: string

  result_hooks:
    description: "Open with outcome/transformation"
    format_template: "[Result that audience wants]"
    examples:
      - hook: string
        pillar: string
        format: string
      - hook: string
        pillar: string
        format: string
```

**Step 5.2: Platform-Specific Hook Adaptations**

```yaml
platform_hook_adaptations:
  instagram:
    character_limit: "First 125 chars visible"
    hook_style: "Visual + text combo"
    best_hook_types: ["question", "statement", "curiosity"]
    examples: array

  tiktok:
    time_limit: "First 1-3 seconds"
    hook_style: "Verbal + visual pattern interrupt"
    best_hook_types: ["curiosity", "controversy", "result"]
    examples: array

  youtube:
    time_limit: "First 5-10 seconds + thumbnail"
    hook_style: "Thumbnail promise + verbal hook"
    best_hook_types: ["question", "result", "story"]
    examples: array

  twitter:
    character_limit: "280 chars, first line visible"
    hook_style: "Text-only, punchy"
    best_hook_types: ["statement", "controversy", "question"]
    examples: array

  linkedin:
    character_limit: "First 140 chars visible"
    hook_style: "Professional but attention-grabbing"
    best_hook_types: ["story", "result", "statement"]
    examples: array
```

---

### Phase 6: Content Calendar Construction

**Duration:** 60-90 minutes

**Step 6.1: Calendar Architecture**

```yaml
calendar_structure:
  planning_horizon: string (e.g., "4 weeks rolling")
  review_cadence: string (e.g., "Weekly on Fridays")
  flexibility_buffer: string (e.g., "20% slots for reactive content")

  content_types_tracked:
    - type: "Planned content"
      description: "Pre-produced, scheduled content"

    - type: "Reactive content"
      description: "Trend responses, timely content"

    - type: "Evergreen content"
      description: "Timeless content for repurposing"

    - type: "Campaign content"
      description: "Special initiative content"
```

**Step 6.2: Monthly Content Calendar Template**

```
CONTENT CALENDAR: [Persona Name] - [Month Year]

══════════════════════════════════════════════════════════════════════════════
MONTH OVERVIEW
──────────────────────────────────────────────────────────────────────────────
Theme: [Monthly theme if applicable]
Key Dates: [Relevant dates, holidays, launches]
Goals:
  • Follower target: [X]
  • Content pieces: [X]
  • Engagement rate: [X]%
Campaign: [If running campaign this month]

══════════════════════════════════════════════════════════════════════════════
WEEK 1: [Date Range]
──────────────────────────────────────────────────────────────────────────────

| Day | Instagram | TikTok | YouTube | Twitter |
|-----|-----------|--------|---------|---------|
| Mon | [Content] | [Content] | - | [Content] |
| Tue | [Content] | [Content] | - | [Content] |
| Wed | [Content] | [Content] | [Content] | [Content] |
| Thu | [Content] | [Content] | - | [Content] |
| Fri | [Content] | [Content] | - | [Content] |
| Sat | [Content] | [Content] | - | [Content] |
| Sun | [Content] | - | [Content] | [Content] |

Week 1 Notes:
• [Any special considerations]
• [Campaign integration notes]
• [Collaboration scheduled]

══════════════════════════════════════════════════════════════════════════════
WEEK 2: [Date Range]
──────────────────────────────────────────────────────────────────────────────
[Continue format...]

══════════════════════════════════════════════════════════════════════════════
CONTENT INVENTORY
──────────────────────────────────────────────────────────────────────────────

| ID | Title | Pillar | Format | Platform | Status | Date |
|----|-------|--------|--------|----------|--------|------|
| C001 | [Title] | P1 | Reel | IG | Ready | [Date] |
| C002 | [Title] | P2 | Video | TT | In Prod | [Date] |
| C003 | [Title] | P3 | Post | IG | Idea | [Date] |

══════════════════════════════════════════════════════════════════════════════
PILLAR BALANCE CHECK
──────────────────────────────────────────────────────────────────────────────

Pillar 1: [X] pieces ([X]%) - Target: [X]%
Pillar 2: [X] pieces ([X]%) - Target: [X]%
Pillar 3: [X] pieces ([X]%) - Target: [X]%
Pillar 4: [X] pieces ([X]%) - Target: [X]%

Status: [On track / Adjust needed]

══════════════════════════════════════════════════════════════════════════════
```

**Step 6.3: Content Production Workflow**

```yaml
production_workflow:
  ideation:
    frequency: string
    process: string
    idea_sources: array
    idea_capture_tool: string

  production:
    batch_production: boolean
    batch_schedule: string
    production_tools: array
    quality_checklist: array

  scheduling:
    scheduling_tool: string
    scheduling_day: string
    approval_process: string

  publishing:
    manual_steps: array
    automation: array
    post_publish_checklist: array

  engagement:
    response_window: string
    engagement_checklist: array
    escalation_triggers: array
```

---

### Phase 7: Individual Account Strategy File Assembly

**Duration:** 30-45 minutes

Compile all elements into the definitive Account Strategy document.

---

## OUTPUT SPECIFICATION

### Primary Deliverable: Individual Account Strategy File

One complete Account Strategy file per persona containing:

```
ACCOUNT STRATEGY: [PERSONA NAME]
Version: 1.0
Created: [Date]
Last Updated: [Date]
Review Cadence: [Frequency]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1: ACCOUNT OVERVIEW
├── Persona Quick Reference
├── Platform Presence
├── Growth Targets
└── Key Metrics Dashboard

SECTION 2: PLATFORM STRATEGY
├── Platform Priorities
├── Platform-Specific Approaches
├── Cross-Platform Integration
└── Platform Exit/Entry Criteria

SECTION 3: CONTENT PILLARS
├── Pillar Definitions
├── Pillar-Platform Mapping
├── Content Series
└── Topic Idea Bank

SECTION 4: POSTING CADENCE
├── Posting Schedule
├── Time Optimization
├── Frequency Guidelines
└── Flexibility Protocols

SECTION 5: GROWTH STRATEGY
├── Growth Phases
├── Follower Acquisition Tactics
├── Engagement Strategy
└── Milestone Roadmap

SECTION 6: HOOK LIBRARY
├── Hook Categories
├── Platform Adaptations
├── Refresh Schedule
└── Performance Tracking

SECTION 7: CONTENT CALENDAR
├── Calendar Template
├── Production Workflow
├── Review Process
└── Current Month Calendar

SECTION 8: ANALYTICS & OPTIMIZATION
├── KPIs and Targets
├── Tracking Setup
├── Review Cadence
└── Optimization Protocol

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Secondary Deliverables

1. **Content Calendar (Standalone)**
   - Exportable calendar format
   - Integration with scheduling tools

2. **Hook Library Quick Reference**
   - One-page hook reference
   - Categorized by type and platform

3. **Growth Tracker Dashboard**
   - Milestone tracking
   - Week-over-week metrics

---

## OUTPUT SCHEMAS

### Account Strategy Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AccountStrategy",
  "type": "object",
  "required": ["persona_id", "platforms", "content_pillars", "posting_cadence", "growth_strategy"],
  "properties": {
    "persona_id": {
      "type": "string",
      "pattern": "^P[0-9]{3}$"
    },
    "platforms": {
      "type": "object",
      "required": ["primary", "secondary"],
      "properties": {
        "primary": {
          "type": "object",
          "required": ["platform", "handle", "content_allocation", "posting_frequency", "growth_target"],
          "properties": {
            "platform": {"type": "string"},
            "handle": {"type": "string"},
            "content_allocation": {"type": "string"},
            "posting_frequency": {"type": "string"},
            "growth_target": {"type": "integer"},
            "specific_strategy": {"type": "string"}
          }
        },
        "secondary": {
          "type": "object",
          "properties": {
            "platform": {"type": "string"},
            "handle": {"type": "string"},
            "content_allocation": {"type": "string"},
            "posting_frequency": {"type": "string"},
            "growth_target": {"type": "integer"}
          }
        },
        "tertiary": {
          "type": "object",
          "properties": {
            "platform": {"type": "string"},
            "handle": {"type": "string"},
            "content_allocation": {"type": "string"},
            "posting_frequency": {"type": "string"},
            "growth_target": {"type": "integer"}
          }
        }
      }
    },
    "content_pillars": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["name", "percentage", "formats", "topics"],
        "properties": {
          "pillar_id": {"type": "string"},
          "name": {"type": "string"},
          "description": {"type": "string"},
          "percentage": {"type": "integer", "minimum": 0, "maximum": 100},
          "formats": {"type": "array", "items": {"type": "string"}},
          "posting_frequency": {"type": "string"},
          "topics": {"type": "array", "items": {"type": "string"}},
          "series": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {"type": "string"},
                "frequency": {"type": "string"},
                "format": {"type": "string"}
              }
            }
          }
        }
      }
    },
    "posting_cadence": {
      "type": "object",
      "required": ["schedule", "optimal_times"],
      "properties": {
        "schedule": {
          "type": "object",
          "additionalProperties": {
            "type": "object",
            "properties": {
              "total_weekly": {"type": "integer"},
              "breakdown": {"type": "object"}
            }
          }
        },
        "optimal_times": {
          "type": "object",
          "additionalProperties": {
            "type": "array",
            "items": {"type": "string"}
          }
        },
        "timezone": {"type": "string"}
      }
    },
    "growth_strategy": {
      "type": "object",
      "required": ["phases", "tactics", "milestones"],
      "properties": {
        "phases": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["name", "duration", "target", "focus"],
            "properties": {
              "name": {"type": "string"},
              "duration": {"type": "string"},
              "target": {"type": "integer"},
              "focus": {"type": "array", "items": {"type": "string"}},
              "tactics": {"type": "array", "items": {"type": "string"}}
            }
          }
        },
        "tactics": {
          "type": "object",
          "properties": {
            "hashtags": {"type": "object"},
            "engagement": {"type": "object"},
            "collaboration": {"type": "object"},
            "trends": {"type": "object"}
          }
        },
        "milestones": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["metric", "target", "date"],
            "properties": {
              "metric": {"type": "string"},
              "target": {"type": ["integer", "string"]},
              "date": {"type": "string"},
              "celebration": {"type": "string"},
              "unlock": {"type": "string"}
            }
          }
        }
      }
    },
    "hook_library": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "description": {"type": "string"},
          "template": {"type": "string"},
          "examples": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "hook": {"type": "string"},
                "pillar": {"type": "string"},
                "format": {"type": "string"}
              }
            }
          }
        }
      }
    },
    "content_calendar": {
      "type": "object",
      "properties": {
        "planning_horizon": {"type": "string"},
        "review_cadence": {"type": "string"},
        "flexibility_buffer": {"type": "string"},
        "current_month": {"type": "object"}
      }
    }
  }
}
```

### Content Calendar Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ContentCalendar",
  "type": "object",
  "required": ["persona_id", "month", "year", "weeks"],
  "properties": {
    "persona_id": {"type": "string"},
    "month": {"type": "integer", "minimum": 1, "maximum": 12},
    "year": {"type": "integer"},
    "theme": {"type": "string"},
    "key_dates": {"type": "array", "items": {"type": "string"}},
    "goals": {
      "type": "object",
      "properties": {
        "follower_target": {"type": "integer"},
        "content_pieces": {"type": "integer"},
        "engagement_rate": {"type": "number"}
      }
    },
    "weeks": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["week_number", "date_range", "content"],
        "properties": {
          "week_number": {"type": "integer"},
          "date_range": {"type": "string"},
          "content": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["day", "platform", "content_type"],
              "properties": {
                "content_id": {"type": "string"},
                "day": {"type": "string"},
                "time": {"type": "string"},
                "platform": {"type": "string"},
                "content_type": {"type": "string"},
                "pillar": {"type": "string"},
                "title": {"type": "string"},
                "hook": {"type": "string"},
                "status": {"type": "string", "enum": ["idea", "in_production", "ready", "scheduled", "published"]},
                "notes": {"type": "string"}
              }
            }
          },
          "notes": {"type": "string"}
        }
      }
    },
    "content_inventory": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "content_id": {"type": "string"},
          "title": {"type": "string"},
          "pillar": {"type": "string"},
          "format": {"type": "string"},
          "platform": {"type": "string"},
          "status": {"type": "string"},
          "scheduled_date": {"type": "string"}
        }
      }
    },
    "pillar_balance": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "count": {"type": "integer"},
          "percentage": {"type": "number"},
          "target": {"type": "number"}
        }
      }
    }
  }
}
```

### Hook Library Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "HookLibrary",
  "type": "object",
  "required": ["persona_id", "hook_categories"],
  "properties": {
    "persona_id": {"type": "string"},
    "last_updated": {"type": "string", "format": "date"},
    "hook_categories": {
      "type": "object",
      "properties": {
        "question": {
          "type": "object",
          "required": ["description", "examples"],
          "properties": {
            "description": {"type": "string"},
            "template": {"type": "string"},
            "examples": {
              "type": "array",
              "items": {
                "type": "object",
                "required": ["hook"],
                "properties": {
                  "hook": {"type": "string"},
                  "pillar": {"type": "string"},
                  "format": {"type": "string"},
                  "platform": {"type": "string"},
                  "performance": {"type": "string"}
                }
              },
              "minItems": 5
            }
          }
        },
        "statement": {"$ref": "#/properties/hook_categories/properties/question"},
        "story": {"$ref": "#/properties/hook_categories/properties/question"},
        "controversy": {"$ref": "#/properties/hook_categories/properties/question"},
        "curiosity": {"$ref": "#/properties/hook_categories/properties/question"},
        "fear": {"$ref": "#/properties/hook_categories/properties/question"},
        "result": {"$ref": "#/properties/hook_categories/properties/question"}
      }
    },
    "platform_adaptations": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "constraints": {"type": "string"},
          "best_hook_types": {"type": "array", "items": {"type": "string"}},
          "examples": {"type": "array", "items": {"type": "string"}}
        }
      }
    },
    "top_performers": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "hook": {"type": "string"},
          "category": {"type": "string"},
          "platform": {"type": "string"},
          "performance_metric": {"type": "string"}
        }
      }
    }
  }
}
```

---

## QUALITY GATES (Anti-Degradation Checks)

### Gate 1: Strategic Alignment

```
ALIGNMENT CHECKLIST:

□ Platform selection matches persona archetype strengths
□ Content pillars align with Persona Bible definitions
□ Posting frequency is sustainable with resources
□ Growth targets are ambitious but realistic
□ Hook library reflects persona voice accurately
□ Calendar balances pillars correctly
□ All content serves sub-niche ownership
```

### Gate 2: Operational Viability

```
OPERATIONAL CHECKLIST:

□ Production capacity supports posting frequency
□ Engagement hours budgeted realistically
□ Tools and access confirmed for all platforms
□ Review and approval process is clear
□ Flexibility built in for reactive content
□ Batch production schedule works with resources
□ Analytics tracking captures all KPIs
```

### Gate 3: Growth Realism

```
GROWTH CHECKLIST:

□ Follower projections based on comparable accounts
□ Engagement rate targets match platform averages
□ Milestone dates account for platform dynamics
□ Acquisition tactics are ethical and sustainable
□ Collaboration targets are achievable
□ Budget allocation matches growth phase needs
□ Contingency plans exist for underperformance
```

### Gate 4: Content Quality

```
CONTENT CHECKLIST:

□ Hooks are compelling and on-brand
□ Content series have enough depth for sustainability
□ Platform adaptations maintain core message
□ Visual guidelines are clear and achievable
□ Voice consistency maintained across formats
□ Call-to-actions are clear but not pushy
□ Evergreen/reactive balance is appropriate
```

---

## TEMPLATES

### Template 1: Individual Account Strategy File (Full Document)

```markdown
# ACCOUNT STRATEGY: [PERSONA NAME]

**Version:** 1.0
**Created:** [Date]
**Last Updated:** [Date]
**Persona ID:** [P001]
**Review Cadence:** Monthly

---

## QUICK REFERENCE DASHBOARD

| Metric | Current | Target (3mo) | Target (12mo) |
|--------|---------|--------------|---------------|
| **Total Followers** | [X] | [X] | [X] |
| **Primary Platform** | [Platform]: [X] | [X] | [X] |
| **Secondary Platform** | [Platform]: [X] | [X] | [X] |
| **Engagement Rate** | [X]% | [X]% | [X]% |
| **Weekly Content** | [X] pieces | [X] pieces | [X] pieces |

---

## 1. ACCOUNT OVERVIEW

### Persona Quick Reference

| Attribute | Value |
|-----------|-------|
| **Name** | [Name] |
| **Archetype** | [Archetype] |
| **Sub-Niche** | [Primary sub-niche] |
| **Voice** | [One-line voice summary] |
| **Visual** | [One-line visual summary] |

### Platform Presence

| Platform | Handle | Status | Role |
|----------|--------|--------|------|
| Instagram | @[handle] | [Active/Building/Planned] | [Primary/Secondary/Tertiary] |
| TikTok | @[handle] | [Status] | [Role] |
| YouTube | @[handle] | [Status] | [Role] |
| Twitter/X | @[handle] | [Status] | [Role] |
| LinkedIn | [name] | [Status] | [Role] |
| Threads | @[handle] | [Status] | [Role] |

### Account Goals

**12-Month Vision:**
> [One paragraph describing where this account should be in 12 months]

**Primary Objective:** [Main goal - awareness/engagement/monetization/authority]

**Key Success Metrics:**
1. [Metric 1]: [Target]
2. [Metric 2]: [Target]
3. [Metric 3]: [Target]

---

## 2. PLATFORM STRATEGY

### Platform Priority Matrix

| Priority | Platform | Content % | Posting Freq | Follower Target | Why |
|----------|----------|-----------|--------------|-----------------|-----|
| Primary | [Platform] | 60% | [X]/week | [X] | [Reason] |
| Secondary | [Platform] | 30% | [X]/week | [X] | [Reason] |
| Tertiary | [Platform] | 10% | [X]/week | [X] | [Reason] |

### Platform-Specific Strategies

#### [PRIMARY PLATFORM]

**Why This Platform:**
[2-3 sentences on platform-persona fit]

**Content Approach:**
- Primary formats: [List]
- Posting frequency: [X] per [timeframe]
- Best posting times: [Times]

**Platform-Specific Tactics:**
1. [Tactic 1]
2. [Tactic 2]
3. [Tactic 3]

**Key Features to Leverage:**
- [Feature 1]: [How to use]
- [Feature 2]: [How to use]

**Platform-Specific KPIs:**
| KPI | Current | Target |
|-----|---------|--------|
| Followers | [X] | [X] |
| Engagement Rate | [X]% | [X]% |
| Reach | [X] | [X] |
| [Platform-specific] | [X] | [X] |

#### [SECONDARY PLATFORM]

[Same format as above]

#### [TERTIARY PLATFORM]

[Same format as above]

### Cross-Platform Integration

**Content Repurposing Flow:**
```
[Primary Platform Original]
         ↓
[Adaptation for Secondary]
         ↓
[Adaptation for Tertiary]
```

**Cross-Promotion Strategy:**
- [How platforms reference each other]
- [Link-in-bio strategy]
- [Story/post cross-promotion]

---

## 3. CONTENT PILLARS

### Pillar Overview

| Pillar | % | Posts/Week | Primary Formats | Goal |
|--------|---|------------|-----------------|------|
| [Pillar 1] | [X]% | [X] | [Formats] | [Goal] |
| [Pillar 2] | [X]% | [X] | [Formats] | [Goal] |
| [Pillar 3] | [X]% | [X] | [Formats] | [Goal] |
| [Pillar 4] | [X]% | [X] | [Formats] | [Goal] |

### Pillar 1: [NAME]

**Description:** [What this pillar covers]

**Content Goals:**
- [Goal 1]
- [Goal 2]

**Formats:**
- [Format 1]: [Why it works]
- [Format 2]: [Why it works]

**Example Topics:**
1. [Topic + angle]
2. [Topic + angle]
3. [Topic + angle]
4. [Topic + angle]
5. [Topic + angle]

**Content Series:**

| Series Name | Format | Frequency | Description |
|-------------|--------|-----------|-------------|
| [Series 1] | [Format] | [Freq] | [Description] |
| [Series 2] | [Format] | [Freq] | [Description] |

### Pillar 2: [NAME]

[Same format as Pillar 1]

### Pillar 3: [NAME]

[Same format as Pillar 1]

### Pillar 4: [NAME]

[Same format as Pillar 1]

### Topic Idea Bank

| ID | Topic | Pillar | Format | Platform | Priority | Status |
|----|-------|--------|--------|----------|----------|--------|
| T001 | [Topic] | P1 | [Format] | [Platform] | High | Backlog |
| T002 | [Topic] | P2 | [Format] | [Platform] | Med | In Progress |
| T003 | [Topic] | P1 | [Format] | [Platform] | Low | Backlog |

---

## 4. POSTING CADENCE

### Weekly Schedule

```
═══════════════════════════════════════════════════════════════════
MONDAY
───────────────────────────────────────────────────────────────────
[Platform 1]:
  • [Time] - [Content Type] ([Pillar])
  • [Time] - [Content Type] ([Pillar])

[Platform 2]:
  • [Time] - [Content Type] ([Pillar])

═══════════════════════════════════════════════════════════════════
TUESDAY
───────────────────────────────────────────────────────────────────
[Continue for each day...]

═══════════════════════════════════════════════════════════════════
```

### Posting Time Optimization

| Platform | Best Times | Why | Avoid |
|----------|------------|-----|-------|
| [Platform 1] | [Times] | [Reason] | [Times] |
| [Platform 2] | [Times] | [Reason] | [Times] |
| [Platform 3] | [Times] | [Reason] | [Times] |

### Frequency Guidelines

**Minimum Viable Posting:**
- [Platform 1]: [X] per week (below this loses momentum)
- [Platform 2]: [X] per week
- [Platform 3]: [X] per week

**Optimal Posting:**
- [Platform 1]: [X] per week
- [Platform 2]: [X] per week
- [Platform 3]: [X] per week

**Maximum (Quality Ceiling):**
- [Platform 1]: [X] per week (above this risks quality drop)
- [Platform 2]: [X] per week
- [Platform 3]: [X] per week

### Flexibility Protocol

**Reactive Content Slots:**
- [X]% of weekly content reserved for trends/timely content
- Specific slots: [Days/times]

**When to Skip a Post:**
- [Condition 1]
- [Condition 2]

**When to Add Extra Posts:**
- [Condition 1]
- [Condition 2]

---

## 5. GROWTH STRATEGY

### Growth Phases

#### Phase 1: Foundation (Months 1-3)

**Follower Target:** [X]
**Focus:** [Key priorities]

**Tactics:**
1. [Tactic with detail]
2. [Tactic with detail]
3. [Tactic with detail]

**Success Criteria:**
- [ ] [Metric 1]
- [ ] [Metric 2]
- [ ] [Metric 3]

#### Phase 2: Momentum (Months 4-6)

**Follower Target:** [X]
**Focus:** [Key priorities]

**Tactics:**
1. [Tactic with detail]
2. [Tactic with detail]
3. [Tactic with detail]

**Success Criteria:**
- [ ] [Metric 1]
- [ ] [Metric 2]
- [ ] [Metric 3]

#### Phase 3: Scale (Months 7-9)

[Continue format...]

#### Phase 4: Authority (Months 10-12)

[Continue format...]

### Follower Acquisition Tactics

#### Hashtag Strategy

**Primary Hashtags (Use Always):**
1. #[hashtag] - [X]M posts, [reason]
2. #[hashtag] - [X]M posts, [reason]
3. #[hashtag] - [X]M posts, [reason]

**Secondary Hashtags (Rotate):**
- [List of 10-15 hashtags]

**Niche Hashtags (Discovery):**
- [List of 5-10 smaller hashtags]

**Branded Hashtag:**
- #[BrandedHashtag] - [How/when to use]

**Hashtag Mix per Post:**
- [X] primary + [X] secondary + [X] niche

#### Engagement Strategy

**Daily Engagement Targets:**
| Activity | Target | Time Investment |
|----------|--------|-----------------|
| Respond to comments | 100% within [X]hrs | [X] min |
| Engage with target accounts | [X] comments | [X] min |
| Engage with hashtags | [X] interactions | [X] min |
| DM responses | [Policy] | [X] min |

**Target Accounts to Engage:**
1. [@account1] - [Why, how to engage]
2. [@account2] - [Why, how to engage]
3. [@account3] - [Why, how to engage]

**Engagement Best Practices:**
- [Practice 1]
- [Practice 2]
- [Practice 3]

#### Collaboration Strategy

**Collaboration Types:**
1. [Type 1]: [How it works, frequency]
2. [Type 2]: [How it works, frequency]
3. [Type 3]: [How it works, frequency]

**Target Collaborators:**
| Account | Followers | Fit | Approach |
|---------|-----------|-----|----------|
| @[account] | [X]K | [Why] | [How to reach out] |
| @[account] | [X]K | [Why] | [How to reach out] |

**Collaboration Outreach Template:**
> [Template for reaching out to potential collaborators]

#### Trend Participation

**Trends to Join:**
- [Type of trend]
- [Type of trend]
- [Type of trend]

**Trends to Skip:**
- [Type of trend] - [Why]
- [Type of trend] - [Why]

**Trend Response Protocol:**
1. Spot trend within [X] hours
2. Evaluate fit: [Criteria]
3. Create adaptation: [Process]
4. Post within: [Timeframe]

### Milestone Roadmap

| Milestone | Target | Date | Celebration | Unlock |
|-----------|--------|------|-------------|--------|
| First 100 followers | 100 | [Date] | [Action] | - |
| First 1K followers | 1,000 | [Date] | [Action] | [What unlocks] |
| First viral post | [X] views | [Date] | [Action] | - |
| First 5K followers | 5,000 | [Date] | [Action] | [What unlocks] |
| First 10K followers | 10,000 | [Date] | [Action] | [What unlocks] |
| 5% engagement rate | 5% | [Date] | [Action] | - |
| First collaboration | 1 | [Date] | [Action] | - |
| First brand inquiry | 1 | [Date] | [Action] | [What unlocks] |

---

## 6. HOOK LIBRARY

### Hook Categories

#### Question Hooks

> **Template:** "[Question that implies valuable answer follows]"

| Hook | Pillar | Format | Platform |
|------|--------|--------|----------|
| "[Question hook 1]" | P1 | Reel | IG |
| "[Question hook 2]" | P2 | Video | TT |
| "[Question hook 3]" | P1 | Post | IG |
| "[Question hook 4]" | P3 | Thread | TW |
| "[Question hook 5]" | P2 | Short | YT |

#### Statement Hooks

> **Template:** "[Bold statement that demands attention]"

| Hook | Pillar | Format | Platform |
|------|--------|--------|----------|
| "[Statement hook 1]" | P1 | Reel | IG |
| "[Statement hook 2]" | P3 | Video | TT |
| "[Statement hook 3]" | P2 | Post | LI |
| "[Statement hook 4]" | P1 | Thread | TW |
| "[Statement hook 5]" | P4 | Short | YT |

#### Story Hooks

> **Template:** "[Story opening that creates curiosity]"

[Continue format for remaining hook types...]

#### Controversy Hooks

[Same format]

#### Curiosity Hooks

[Same format]

#### Fear/Pain Hooks

[Same format]

#### Result Hooks

[Same format]

### Platform-Specific Hook Adaptations

**Instagram:**
- Constraint: First 125 characters visible
- Best types: Question, Statement, Curiosity
- Example: "[Platform-specific example]"

**TikTok:**
- Constraint: First 1-3 seconds verbal
- Best types: Curiosity, Controversy, Result
- Example: "[Platform-specific example]"

**YouTube:**
- Constraint: Thumbnail + first 5-10 seconds
- Best types: Question, Result, Story
- Example: "[Platform-specific example]"

**Twitter:**
- Constraint: First line of tweet
- Best types: Statement, Controversy, Question
- Example: "[Platform-specific example]"

**LinkedIn:**
- Constraint: First 140 characters visible
- Best types: Story, Result, Statement
- Example: "[Platform-specific example]"

### Hook Performance Tracking

| Hook | Uses | Avg. Performance | Status |
|------|------|------------------|--------|
| "[Hook]" | [X] | [Metric] | Active/Retired |

---

## 7. CONTENT CALENDAR

### Calendar Settings

| Setting | Value |
|---------|-------|
| Planning Horizon | [X] weeks rolling |
| Review Day | [Day] |
| Flexibility Buffer | [X]% for reactive |
| Batch Production Day | [Day] |

### Current Month: [MONTH YEAR]

**Theme:** [If applicable]
**Key Dates:** [List relevant dates]

**Month Goals:**
- [ ] [Goal 1]
- [ ] [Goal 2]
- [ ] [Goal 3]

[Insert monthly calendar grid]

### Content Production Workflow

**Ideation (Weekly):**
1. Review trending topics: [Day/Time]
2. Check content idea bank: [Day/Time]
3. Plan next week's content: [Day/Time]

**Production (Batch):**
1. Batch day: [Day]
2. Content types per batch: [X] posts
3. Production checklist:
   - [ ] Scripts written
   - [ ] Visuals created
   - [ ] Captions drafted
   - [ ] Hashtags selected
   - [ ] CTAs added

**Scheduling:**
1. Schedule day: [Day]
2. Tool: [Scheduling tool]
3. Final review: [Process]

**Publishing:**
1. Manual steps: [What needs human touch]
2. Post-publish: [What to do after posting]

---

## 8. ANALYTICS & OPTIMIZATION

### Key Performance Indicators

| KPI | Definition | Current | Target | Tracking |
|-----|------------|---------|--------|----------|
| Follower Growth | New followers/week | [X] | [X] | Weekly |
| Engagement Rate | (Likes+Comments)/Followers | [X]% | [X]% | Weekly |
| Reach | Unique accounts reached | [X] | [X] | Weekly |
| Saves | Content saves | [X] | [X] | Weekly |
| Shares | Content shares | [X] | [X] | Weekly |
| Profile Visits | Visits to profile | [X] | [X] | Weekly |
| Link Clicks | Bio link clicks | [X] | [X] | Weekly |

### Analytics Review Cadence

**Daily (5 min):**
- Check notifications
- Respond to engagement
- Note any viral activity

**Weekly (30 min):**
- Review week's performance
- Identify top/bottom performers
- Adjust next week's plan

**Monthly (60 min):**
- Full analytics review
- Milestone check
- Strategy adjustments
- Report generation

### Optimization Protocol

**When a Post Performs Well:**
1. Analyze why (format, hook, topic, time, hashtags)
2. Document in "winners" file
3. Create similar content
4. Consider repurposing

**When a Post Underperforms:**
1. Analyze why
2. Document learnings
3. Avoid similar approach
4. Don't repeat mistake

**Content Audit (Monthly):**
- Top 5 performers: [Analysis]
- Bottom 5 performers: [Analysis]
- Adjustments: [What to change]

---

## APPENDICES

### A. Hashtag Master List
[Complete categorized hashtag list]

### B. Content Templates
[Links to Canva/design templates]

### C. Caption Templates
[Fill-in-the-blank caption structures]

### D. Response Templates
[Pre-written responses for common comments]

### E. Crisis Playbook
[How to handle negative situations]

---

*This Account Strategy is a living document. Review and update monthly.*
```

### Template 2: Hook Library Quick Reference (One-Page)

```markdown
# HOOK LIBRARY: [PERSONA NAME]
*Quick Reference Card*

---

## QUESTION HOOKS
> Start with a question that implies a valuable answer

- "[Question 1]"
- "[Question 2]"
- "[Question 3]"

## STATEMENT HOOKS
> Lead with a bold claim

- "[Statement 1]"
- "[Statement 2]"
- "[Statement 3]"

## STORY HOOKS
> Open with narrative tension

- "[Story opener 1]"
- "[Story opener 2]"
- "[Story opener 3]"

## CONTROVERSY HOOKS
> Challenge conventional wisdom

- "[Hot take 1]"
- "[Hot take 2]"
- "[Hot take 3]"

## CURIOSITY HOOKS
> Create an information gap

- "[Curiosity 1]"
- "[Curiosity 2]"
- "[Curiosity 3]"

## FEAR/PAIN HOOKS
> Identify the problem

- "[Pain point 1]"
- "[Pain point 2]"
- "[Pain point 3]"

## RESULT HOOKS
> Lead with the outcome

- "[Result 1]"
- "[Result 2]"
- "[Result 3]"

---

## PLATFORM QUICK TIPS

| Platform | Best Hook Types | Constraint |
|----------|-----------------|------------|
| Instagram | Question, Statement | 125 chars visible |
| TikTok | Curiosity, Controversy | 1-3 seconds |
| YouTube | Question, Result | Thumbnail + 5sec |
| Twitter | Statement, Controversy | First line |
| LinkedIn | Story, Result | 140 chars visible |

---

*Last updated: [Date]*
```

---

## EXAMPLES

### Example 1: Platform Selection for "Maya Chen" (Educator)

```
PLATFORM FIT SCORECARD: Maya Chen

                    | Audience | Format | Archetype | Growth | Monetization | TOTAL |
--------------------|----------|--------|-----------|--------|--------------|-------|
Instagram           |    9     |   9    |    8      |   7    |     8        |  41   |
TikTok              |    8     |   9    |    9      |   9    |     6        |  41   |
YouTube             |    7     |   8    |    9      |   6    |     9        |  39   |
Twitter/X           |    6     |   5    |    6      |   5    |     4        |  26   |
LinkedIn            |    5     |   6    |    7      |   4    |     7        |  29   |
Threads             |    4     |   4    |    5      |   3    |     2        |  18   |

RECOMMENDATION:
- Primary Platform: Instagram (41) - Strong for educators, carousel tutorials excel
- Secondary Platform: TikTok (41) - Viral potential for educational content
- Tertiary Platform: YouTube (39) - Long-form educational authority
- Skip: Twitter (26), LinkedIn (29), Threads (18) - Below threshold

RATIONALE:
Maya's educational archetype thrives on visual tutorials. Instagram carousels
are perfect for step-by-step AI tool breakdowns. TikTok's algorithm rewards
educational content heavily. YouTube builds long-term authority and has the
best monetization for educators.
```

### Example 2: Content Pillar Definition

```yaml
content_pillars:
  pillar_1:
    name: "AI Tool Tutorials"
    description: "Step-by-step guides for specific AI writing tools"
    percentage_of_content: 40
    primary_formats: ["Carousel", "Short video", "Long tutorial"]
    posting_frequency: "3x per week"
    content_goals:
      - "Establish expertise"
      - "Provide immediate value"
      - "Drive saves and shares"
    example_topics:
      - topic: "ChatGPT for social media captions"
        angle: "5-step workflow with prompts"
        format: "Carousel"
      - topic: "Claude for email sequences"
        angle: "Before/after comparison"
        format: "Reel"
      - topic: "Jasper vs Copy.ai comparison"
        angle: "Honest review after 30 days"
        format: "YouTube video"

  pillar_2:
    name: "Prompt Engineering"
    description: "Teaching how to write better AI prompts"
    percentage_of_content: 25
    primary_formats: ["Carousel", "Thread", "Short video"]
    posting_frequency: "2x per week"
    content_goals:
      - "Differentiate from basic tutorials"
      - "Attract advanced users"
      - "Create shareable frameworks"
    example_topics:
      - topic: "The CRAFT prompt framework"
        angle: "Original framework with examples"
        format: "Carousel + Thread"
      - topic: "Why your AI outputs suck"
        angle: "Common mistakes and fixes"
        format: "Reel"

  pillar_3:
    name: "Productivity & Workflow"
    description: "How AI fits into content creation workflows"
    percentage_of_content: 20
    primary_formats: ["Reel", "Stories", "Short video"]
    posting_frequency: "2x per week"
    content_goals:
      - "Show practical application"
      - "Relatable content"
      - "Time-saving focus"
    example_topics:
      - topic: "My morning AI content routine"
        angle: "Day-in-the-life with tools"
        format: "Reel"
      - topic: "Batching content with AI"
        angle: "How I create a week in 2 hours"
        format: "YouTube Short"

  pillar_4:
    name: "AI Industry & Mindset"
    description: "Bigger picture on AI and creator economy"
    percentage_of_content: 15
    primary_formats: ["Post", "Thread", "Talking head video"]
    posting_frequency: "1x per week"
    content_goals:
      - "Thought leadership"
      - "Discussion generation"
      - "Community building"
    example_topics:
      - topic: "AI won't replace you (but...)"
        angle: "Nuanced take on AI fears"
        format: "Feed post"
      - topic: "The AI tools I stopped using"
        angle: "Honest reflection"
        format: "Thread"
```

### Example 3: Growth Phase Strategy

```yaml
growth_phases:
  phase_1_foundation:
    duration: "Months 1-3"
    follower_target: 5000
    focus_areas:
      - "Establish consistent posting rhythm (5x/week Instagram, 7x/week TikTok)"
      - "Build initial content library (50+ pieces)"
      - "Develop engagement habits (30 min/day)"
      - "Test content types to find winners"
    key_metrics:
      - metric: "Posts published"
        target: 100
      - metric: "Engagement rate"
        target: "5%+"
      - metric: "Profile visits/week"
        target: 500
    tactics:
      - "Post at optimal times consistently"
      - "Engage with 20 accounts/day in niche"
      - "Use trending audio on Reels/TikTok"
      - "Respond to every comment within 2 hours"
      - "Join 3 engagement pods in niche"

  phase_2_momentum:
    duration: "Months 4-6"
    follower_target: 15000
    focus_areas:
      - "Double down on top-performing content types"
      - "Launch first content series"
      - "Begin collaboration outreach"
      - "Grow email list to 500"
    key_metrics:
      - metric: "Follower growth rate"
        target: "10%/month"
      - metric: "Collaborations completed"
        target: 5
      - metric: "Viral posts (10K+ views)"
        target: 3
    tactics:
      - "Create 2 recurring content series"
      - "Reach out to 10 potential collaborators/week"
      - "Increase posting to 7x/week on primary platform"
      - "Start email capture with lead magnet"
      - "Run first giveaway collaboration"
```

---

## CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | [Date] | Initial release |

---

## RELATED SKILLS

- **S21-persona-architect:** Provides Persona Bible as foundation
- **S23-network-coordination:** Uses account strategies for cross-promotion
- **S24-monetization-engine:** Builds revenue on account foundation

---

*S22-account-strategy: Turning persona identities into thriving social media accounts.*
