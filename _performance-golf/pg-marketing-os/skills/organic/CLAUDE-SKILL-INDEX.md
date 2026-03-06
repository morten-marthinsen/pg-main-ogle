# CLAUDE-SKILL-INDEX.md — PER-SKILL MANDATORY PROTOCOLS
## Skill Registry and Requirements for OrganicMarketingEngine
## Version 1.0 — March 2026

---

## SKILL MAP OVERVIEW

```
FOUNDATION (Strategy — Must complete before production)
├── S01: Audience Intelligence
├── S02: Platform Strategy
├── S03: Brand Voice
├── S04: Content Architecture
├── S05: Hook Library
├── S06: Virality Scoring
└── S07: Campaign Brief

PRODUCTION (Content Creation — Arena required)
├── S08: Script Writing
├── S09: Caption Writing
├── S10: Carousel Design
├── S11: Thread Writing
├── S12: Visual Direction
├── S13: Arena Generation
└── S14: Content Assembly

DISTRIBUTION (Post-Creation)
├── S15: Scheduling Choreography
├── S16: Engagement Protocol
├── S17: Network Amplification
└── S18: Repurpose Multiplication

ANALYSIS (Learning)
├── S19: Performance Analysis
└── S20: Learning Capture

INFLUENCER NETWORK (Sub-System)
├── S21: Persona Architect
├── S22: Account Strategy
├── S23: Network Coordination
└── S24: Monetization Engine
```

---

## FOUNDATION SKILLS (S01-S07)

### S01: AUDIENCE INTELLIGENCE
**Purpose:** Deep audience research + persona building
**Input:** Brand/product/person to market
**Output:** Audience Intelligence File (AIF)

**Required Teachings:**
- `cialdini-influence-principles.yaml`
- `kane-one-million-followers.yaml` (includes process communication)
- `godin-this-is-marketing.yaml`
- `berger-invisible-influence.yaml`

**Required Specimens:**
- 5+ growth trajectory case studies
- Competitor audience analysis examples

**Output Schema (AIF):**
```yaml
brand: [name]
date_created: [timestamp]
version: [1.0]

demographics:
  age_range: [range]
  gender_split: [percentages]
  location: [primary markets]
  income_level: [bracket]

psychographics:
  values: [core values]
  interests: [topics they engage with]
  lifestyle: [how they spend time]
  worldview: [beliefs and attitudes]

platform_behavior:
  primary_platforms: [ranked list]
  consumption_patterns: [how they consume content]
  engagement_patterns: [what they engage with]
  best_times_active: [time windows]

language_mining:
  words_they_use: [vocabulary list]
  phrases_they_use: [common expressions]
  slang_and_jargon: [insider language]
  pain_expressions: [how they describe problems]
  desire_expressions: [how they describe wants]

competitors_they_follow:
  accounts: [list with follower counts]
  why_they_follow: [value provided]
  gaps_to_exploit: [what competitors miss]

pain_mapping:
  surface_pains: [obvious problems]
  deeper_pains: [underlying issues]
  root_pains: [core fears/frustrations]

desire_mapping:
  stated_desires: [what they say they want]
  unstated_desires: [what they really want]
  identity_desires: [who they want to become]
```

**Gate:** AIF must exist before S02 executes

---

### S02: PLATFORM STRATEGY
**Purpose:** Platform selection + format strategy
**Input:** Audience Intelligence File (AIF)
**Output:** Platform Strategy File (PSF)

**Required Teachings:**
- `vaynerchuk-day-trading-attention.yaml`
- `instagram-algorithm-2026.yaml`
- `tiktok-algorithm-2026.yaml`
- `youtube-algorithm-2026.yaml`
- `linkedin-algorithm-2026.yaml`
- `x-twitter-algorithm-2026.yaml`
- `cross-platform-amplification.yaml`

**Required Specimens:**
- 5+ specimens per target platform

**Output Schema (PSF):**
```yaml
brand: [name]
date_created: [timestamp]

platform_priority:
  primary: [main platform]
  secondary: [supporting platforms]
  exclude: [platforms to skip and why]

per_platform_strategy:
  [platform_name]:
    audience_fit_score: [1-10]
    format_focus: [primary formats]
    posting_frequency: [cadence]
    best_times: [specific windows]
    algorithm_signals_to_maximize: [list]
    format_length_targets: [specifics]
    competitive_whitespace: [opportunities]

cross_platform_flow:
  content_adaptation: [how content moves between platforms]
  amplification_sequence: [posting order for maximum reach]

resource_allocation:
  production_hours_per_platform: [breakdown]
  priority_ranking: [ranked list]
```

**Gate:** PSF must exist before S03 executes

---

### S03: BRAND VOICE
**Purpose:** Voice, tone, visual identity for content
**Input:** AIF + PSF + existing brand materials
**Output:** Brand Voice File (BVF)

**Required Teachings:**
- `hanlon-primal-branding.yaml`
- `miller-storybrand-framework.yaml`

**Required Specimens:**
- 3+ voice specimens from similar brands

**Output Schema (BVF):**
```yaml
brand: [name]
date_created: [timestamp]

voice_attributes:
  primary: [3-5 core voice traits]
  description: [how these traits manifest]

vocabulary:
  power_words: [words to use frequently]
  banned_words: [words to never use]
  signature_phrases: [ownable expressions]

tone_spectrum:
  by_platform: [how tone shifts per platform]
  by_content_type: [how tone shifts by purpose]
  by_audience_state: [how tone shifts by where they are in journey]

anti_voice:
  never_sound_like: [specific descriptions]
  competitor_voices_to_avoid: [examples]

visual_identity:
  color_palette: [hex codes]
  typography: [fonts and usage]
  aesthetic_keywords: [3-5 visual descriptors]

energy_levels:
  high_energy_content: [when and how]
  medium_energy_content: [when and how]
  low_energy_content: [when and how]
```

**Gate:** BVF must exist before S04 executes

---

### S04: CONTENT ARCHITECTURE
**Purpose:** Content system design
**Input:** AIF + PSF + BVF
**Output:** Content Architecture File (CAF)

**Required Teachings:**
- `hormozi-content-to-leads.yaml`
- `vaynerchuk-jjjrh-ratio.yaml`
- `flynn-superfans.yaml`
- `anand-content-trap.yaml`

**Required Specimens:**
- 3+ series/pillar structure examples

**Output Schema (CAF):**
```yaml
brand: [name]
date_created: [timestamp]

content_pillars:
  - pillar_name: [name]
    description: [what it covers]
    percentage_of_content: [%]
    audience_value: [why it matters to them]
    brand_value: [why it matters to us]

recurring_series:
  - series_name: [name]
    frequency: [daily/weekly/etc]
    format: [format type]
    platform: [where it lives]
    hook_structure: [consistent opening pattern]

content_by_function:
  awareness: [% of content + types]
  engagement: [% of content + types]
  conversion: [% of content + types]
  community: [% of content + types]

calendar_architecture:
  daily_rhythm: [what happens each day]
  weekly_rhythm: [what happens each week]
  monthly_rhythm: [what happens each month]

content_to_funnel:
  - content_type: [type]
    next_step: [where it leads]
    conversion_action: [what we want them to do]
```

**Gate:** CAF must exist before S05 executes

---

### S05: HOOK LIBRARY
**Purpose:** Platform-specific hook arsenal
**Input:** AIF + PSF + BVF + CAF + specimen hooks
**Output:** Hook Library File (HLF)

**Required Teachings:**
- `kane-hook-point-system.yaml`
- `heath-made-to-stick-success.yaml`
- `berger-stepps-framework.yaml`

**Required Specimens:**
- All hooks from `specimens/hooks/`

**Output Schema (HLF):**
```yaml
brand: [name]
date_created: [timestamp]

hooks_by_type:
  curiosity_gap:
    - hook: [exact hook text]
      use_for: [content types]
      platform_fit: [platforms]
  [repeat for each hook type]

hooks_by_platform:
  instagram:
    - hook: [hook]
      format: [reel/carousel/story]
      why_native: [platform reason]
  [repeat for each platform]

hooks_by_content_pillar:
  [pillar_name]:
    - hook: [hook]
      angle: [specific angle]
  [repeat for each pillar]

ab_test_framework:
  testing_protocol: [how we test hooks]
  minimum_sample: [sample size]
  winner_criteria: [what determines winner]
```

**Gate:** HLF must exist before S06 executes

---

### S06: VIRALITY SCORING
**Purpose:** Scoring framework for viral potential
**Input:** All prior files
**Output:** Virality Scoring Framework File (VSF)

**Required Teachings:**
- `berger-stepps-framework.yaml`
- `berger-contagious-complete.yaml` (includes arousal-virality framework)
- `baer-talk-triggers.yaml`

**Required Specimens:**
- 10+ high-score specimens for calibration

**Output Schema (VSF):**
```yaml
brand: [name]
date_created: [timestamp]

formula: "(EA × SC × PI × PF × SH) / 10,000"

dimension_definitions:
  emotional_activation:
    description: [what it measures]
    scoring_guide:
      1-3: [description]
      4-6: [description]
      7-8: [description]
      9-10: [description]
    brand_calibration: [specific to this brand]
  [repeat for each dimension]

score_thresholds:
  do_not_publish: [0-X]
  major_revision: [X-Y]
  acceptable: [Y-Z]
  strong: [Z-A]
  potential_breakout: [A-100]

calibration_specimens:
  - specimen_id: [id]
    actual_performance: [metrics]
    predicted_score: [score]
    actual_score: [calibrated score]
```

**Gate:** VSF must exist before S07 executes

---

### S07: CAMPAIGN BRIEF
**Purpose:** Synthesize all foundation into actionable brief
**Input:** All S01-S06 outputs
**Output:** Campaign Brief File (CBF)

**Output Schema (CBF):**
```yaml
campaign_name: [name]
date_created: [timestamp]
owner: [the client]

objective:
  primary_goal: [specific, measurable]
  success_metrics: [KPIs]
  timeline: [dates]

audience_summary:
  target_segment: [from AIF]
  key_insight: [most important finding]

platform_plan:
  primary_platform: [from PSF]
  formats: [specific formats]
  posting_cadence: [frequency]

voice_summary:
  tone_for_this_campaign: [from BVF]
  key_phrases: [signature expressions]

content_plan:
  pillar_focus: [which pillar(s)]
  content_pieces: [30-day calendar]

hook_strategy:
  primary_hook_types: [from HLF]
  specific_hooks_approved: [list]

virality_targets:
  minimum_score: [threshold]
  target_dimensions: [which to maximize]

distribution_strategy:
  cross_platform_plan: [how content moves]
  amplification_tactics: [specific tactics]
```

**Gate:** CBF UNLOCKS all production skills (S08-S14)

---

## PRODUCTION SKILLS (S08-S14)

All production skills require:
- Campaign Brief File (CBF) exists
- Arena protocol runs on all outputs
- Virality scoring on final outputs

### S08: SCRIPT WRITING
**Output:** Platform-specific video scripts

### S09: CAPTION WRITING
**Output:** Platform-native captions with CTAs

### S10: CAROUSEL DESIGN
**Output:** Carousel content architecture (text + visual direction)

### S11: THREAD WRITING
**Output:** X/Twitter threads and LinkedIn posts

### S12: VISUAL DIRECTION
**Output:** Thumbnail specs, image prompts, visual briefs

### S13: ARENA GENERATION
**Output:** Full arena competition for any content piece

### S14: CONTENT ASSEMBLY
**Output:** Final assembled content, formatting, scheduling specs

---

## DISTRIBUTION SKILLS (S15-S18)

### S15: SCHEDULING CHOREOGRAPHY
**Output:** Optimal timing, cross-platform sequencing

### S16: ENGAGEMENT PROTOCOL
**Output:** Comment strategy, DM strategy, community management

### S17: NETWORK AMPLIFICATION
**Output:** AI influencer network coordination

### S18: REPURPOSE MULTIPLICATION
**Output:** One piece → 10+ platform-native variants

---

## ANALYSIS SKILLS (S19-S20)

### S19: PERFORMANCE ANALYSIS
**Input:** Performance data from published content
**Output:** What worked, what didn't, why

### S20: LEARNING CAPTURE
**Input:** S19 output
**Output:** System-level learnings that improve the engine

---

## INFLUENCER NETWORK SKILLS (S21-S24)

### S21: PERSONA ARCHITECT
**Output:** AI influencer identity designs

### S22: ACCOUNT STRATEGY
**Output:** Per-account content + growth strategy

### S23: NETWORK COORDINATION
**Output:** Cross-account amplification playbook

### S24: MONETIZATION ENGINE
**Output:** Revenue model per account + network total

---

*Every skill has a job. Every skill has requirements. No shortcuts.*
