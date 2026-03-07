---
name: virality-scoring
description: >-
  Predictive content quality assessment and virality scoring framework.
  Use after hook library (S05) is complete and you need a calibrated scoring
  system to predict content performance before publishing. Produces the Virality
  Scoring Framework (VSF) with scoring dimensions, weight calibration, threshold
  definitions, and benchmark specimens. No more guessing — every piece of content
  gets a score based on proven virality dimensions. Trigger when users mention
  content scoring, predicting performance, quality assessment, viral potential,
  or evaluating content before posting. Requires the Hook Library File (HLF)
  from S05.
---

# S06: VIRALITY SCORING
## Predictive Content Quality Assessment
## Gate: G05 (Requires S05 HLF) | Output: VSF (Virality Scoring Framework)

---

## PURPOSE

This skill builds a calibrated scoring framework to predict content performance BEFORE publishing. No more guessing. Every piece of content gets a score based on proven virality dimensions.

**Output:** Virality Scoring Framework (VSF)
**Unlocks:** S07: Campaign Brief (via Gate G06)

## ANTI-DEGRADATION

- Read `S06-VIRALITY-SCORING-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `skills/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## REQUIRED CONTEXT

### Teachings to Load
- `teachings/virality/berger-stepps-framework.yaml`
- `teachings/virality/kane-viral-content-model.yaml`
- `teachings/content-strategy/heath-made-to-stick.yaml`
- `teachings/audience-psychology/cialdini-influence-principles.yaml`

### Specimens to Load
- 50+ viral specimens from target platform
- Growth trajectory case studies
- High-performing competitor content

### Prerequisite Files
- S01 Output: `outputs/[campaign]-AIF.yaml` (audience context)
- S02 Output: `outputs/[campaign]-PSF.yaml` (platform context)
- S03 Output: `outputs/[campaign]-BVF.yaml` (voice alignment)
- S04 Output: `outputs/[campaign]-CAF.yaml` (content strategy)
- S05 Output: `outputs/[campaign]-HLF.yaml` (hook context)

---

## INPUT REQUIREMENTS

S01-S05 outputs, plus:

```yaml
calibration_data:
  past_content_performance:
    - content: [Title/description]
      views: [Count]
      engagement_rate: [%]
      shares: [Count]
      saves: [Count]
      what_worked: [Analysis]
      what_failed: [Analysis]

  viral_specimens:
    - content: [Description]
      platform: [Where]
      views: [Count]
      engagement_rate: [%]
      virality_factor: [What made it spread]

  platform_benchmarks:
    average_views: [For our account size]
    average_engagement: [For our niche]
    viral_threshold: [What counts as viral]
```

---

## PROCESS

### Phase 1: Framework Foundation

Establish the scoring dimensions:

```yaml
scoring_dimensions:
  hook_strength:
    weight: 20
    description: |
      Does the hook stop the scroll and create immediate engagement?
    scoring_criteria:
      10: "Irresistible — creates immediate action"
      8: "Strong — high probability of stopping scroll"
      6: "Solid — better than average"
      4: "Weak — may lose attention"
      2: "Poor — will be scrolled past"
      0: "No hook present"

    indicators:
      high_score:
        - Opens with pattern interrupt
        - Creates immediate curiosity gap
        - Triggers emotional response instantly
        - Uses proven hook template effectively
      low_score:
        - Slow build with no payoff signal
        - Generic opening
        - Requires context to understand
        - "Hey guys" or similar weak openers

  emotional_resonance:
    weight: 15
    description: |
      Does it trigger high-arousal emotions that drive sharing?
    scoring_criteria:
      10: "Profound emotional impact — people FEEL something strong"
      8: "Strong emotional trigger — clear feeling evoked"
      6: "Moderate emotion — some feeling present"
      4: "Weak emotion — mostly intellectual"
      2: "No emotional engagement"
      0: "Emotionally flat or negative"

    target_emotions:
      high_arousal_positive:
        - Awe
        - Excitement
        - Humor/amusement
        - Inspiration
        - Hope
      high_arousal_negative:
        - Anxiety/fear
        - Anger/outrage
        - Surprise/shock
      avoid:
        - Sadness (low arousal)
        - Contentment (low arousal)
        - Boredom

  practical_value:
    weight: 15
    description: |
      Does it provide useful, actionable information worth saving/sharing?
    scoring_criteria:
      10: "Game-changing value — must save/share"
      8: "High value — clearly useful"
      6: "Moderate value — somewhat useful"
      4: "Low value — generic advice"
      2: "No practical value"
      0: "Misleading or harmful"

    indicators:
      high_score:
        - Specific, actionable steps
        - Novel insight or framework
        - Saves time/money/effort
        - Solves real problem from AIF
      low_score:
        - Vague platitudes
        - Commonly known information
        - No clear takeaway
        - Entertainment only

  social_currency:
    weight: 15
    description: |
      Does sharing this make the sharer look good?
    scoring_criteria:
      10: "Sharer looks brilliant/informed/ahead"
      8: "Clear status benefit to sharing"
      6: "Some social benefit to sharing"
      4: "Neutral — no status implication"
      2: "Risky to share"
      0: "Sharing would be embarrassing"

    drivers:
      - Insider knowledge (makes sharer look informed)
      - Remarkable statistics (makes sharer look smart)
      - Counterintuitive insight (makes sharer look sophisticated)
      - Helpful for others (makes sharer look generous)
      - Humor (makes sharer look fun)

  story_structure:
    weight: 10
    description: |
      Does it follow compelling narrative architecture?
    scoring_criteria:
      10: "Perfect story arc — conflict, tension, resolution"
      8: "Strong narrative — clear journey"
      6: "Some narrative elements"
      4: "Weak structure — information only"
      2: "Confusing or disjointed"
      0: "No structure"

    elements:
      - Clear setup/conflict
      - Rising tension
      - Transformation or revelation
      - Satisfying conclusion
      - Character/relatability

  platform_fit:
    weight: 10
    description: |
      Is this optimized for the specific platform's algorithm and culture?
    scoring_criteria:
      10: "Perfect platform-native execution"
      8: "Strong platform optimization"
      6: "Acceptable for platform"
      4: "Some platform mismatches"
      2: "Wrong for this platform"
      0: "Platform violation"

    factors:
      - Format matches platform preference
      - Length optimized for platform
      - Technical specs met (resolution, aspect ratio)
      - Cultural fit for platform audience
      - Algorithm signals optimized

  specificity:
    weight: 10
    description: |
      Is it specific enough to be memorable and actionable?
    scoring_criteria:
      10: "Ultra-specific — concrete details, examples, numbers"
      8: "Highly specific — clear details"
      6: "Somewhat specific"
      4: "Generic — could apply to anything"
      2: "Vague and forgettable"
      0: "Meaningless abstraction"

    indicators:
      high_score:
        - Exact numbers ("$50,000" not "a lot")
        - Named examples
        - Step-by-step specificity
        - Concrete scenarios
      low_score:
        - "Some people"
        - "A lot of money"
        - "Success"
        - Generic advice

  voice_alignment:
    weight: 5
    description: |
      Does it sound authentically like the brand?
    scoring_criteria:
      10: "Perfectly on voice — unmistakably us"
      8: "Strong voice alignment"
      6: "Acceptable voice"
      4: "Generic — could be anyone"
      2: "Off-voice"
      0: "Voice violation"

    check_against:
      - BVF voice dimensions
      - Signature phrases
      - Banned words
      - Tone variations
```

### Phase 2: Platform-Specific Modifiers

Adjust scoring for platform context:

```yaml
platform_modifiers:
  instagram_reels:
    dimension_adjustments:
      hook_strength: +5 (hooks matter more)
      platform_fit: +3 (format critical)
      story_structure: -2 (less time for story)

    bonus_points:
      trending_audio: +5
      duet_potential: +3
      share_to_story_friendly: +3
      save_worthy: +5

    penalties:
      recycled_watermark: -10
      over_60_seconds: -3
      no_text_overlay: -2

  tiktok:
    dimension_adjustments:
      hook_strength: +5 (first second critical)
      emotional_resonance: +3 (emotion drives TikTok)
      platform_fit: +3

    bonus_points:
      trend_aligned: +5
      loop_friendly: +5
      duet_stitch_worthy: +3
      sound_trend: +3

    penalties:
      too_polished: -3
      no_hook: -10
      promotional_feel: -5

  youtube_shorts:
    dimension_adjustments:
      practical_value: +3 (YouTube audience wants learning)
      hook_strength: +3

    bonus_points:
      clear_takeaway: +3
      subscribe_prompt: +2
      shorts_to_long_funnel: +3

    penalties:
      portrait_only_content: -2
      no_branding: -2

  youtube_longform:
    dimension_adjustments:
      story_structure: +5 (story critical for retention)
      practical_value: +5 (long-form must deliver value)
      hook_strength: +3 (but first 30 sec, not first 1 sec)

    bonus_points:
      chapter_worthy: +3
      rewatchable: +5
      evergreen_topic: +5
      thumbnail_title_synergy: +5

    penalties:
      slow_opening: -5
      no_pattern_structure: -5
      filler_content: -10

  linkedin:
    dimension_adjustments:
      practical_value: +5 (value is currency)
      social_currency: +5 (professional image matters)
      specificity: +3

    bonus_points:
      thought_leadership: +5
      contrarian_professional: +3
      personal_story: +3
      document_format: +3

    penalties:
      salesy_tone: -5
      external_link: -3
      generic_business_advice: -3

  x_twitter:
    dimension_adjustments:
      hook_strength: +5 (first line is everything)
      social_currency: +3 (RT value)
      specificity: +3

    bonus_points:
      thread_depth: +3
      quote_tweet_worthy: +5
      meme_potential: +5

    penalties:
      link_in_main: -5
      too_long_tweets: -3
```

### Phase 3: Scoring Calibration

Calibrate against known performers:

```yaml
calibration:
  high_performers:
    - content: [Description of viral content]
      actual_performance: [Views/engagement]
      calculated_score: [Run through framework]
      calibration_note: |
        [What this teaches us about scoring]

  underperformers:
    - content: [Description]
      actual_performance: [Views/engagement]
      calculated_score: [Run through framework]
      calibration_note: |
        [What this teaches us — why did it underperform score?]

  calibration_adjustments:
    - adjustment: [What we changed]
      reason: |
        [Why, based on calibration]

  benchmark_mapping:
    score_0_40: "Will underperform — do not publish"
    score_40_60: "Below average — needs improvement"
    score_60_75: "Acceptable — can publish"
    score_75_85: "Strong — prioritize"
    score_85_100: "Potential viral — maximum distribution"
```

### Phase 4: Quick-Score Checklist

Create rapid assessment tool:

```yaml
quick_score_checklist:
  must_haves:
    - [ ] Hook stops scroll in <3 seconds
    - [ ] Clear emotional trigger identified
    - [ ] Specific value delivered
    - [ ] Platform-optimized format
    - [ ] On-voice execution

  red_flags:
    - [ ] Slow/no hook
    - [ ] Generic advice
    - [ ] Off-voice elements
    - [ ] Platform mismatch
    - [ ] No clear CTA or takeaway

  green_lights:
    - [ ] "I need to share this" feeling
    - [ ] Specific and memorable
    - [ ] Creates conversation/debate
    - [ ] Teaches something new
    - [ ] Makes audience feel something

  kill_criteria:
    - Score below 40 = Do not publish
    - Multiple red flags = Rework required
    - Off-voice = Cannot publish as-is
```

### Phase 5: Scoring Process

Define how to score content:

```yaml
scoring_process:
  step_1:
    action: "Rate each dimension 0-10"
    output: "Raw dimension scores"

  step_2:
    action: "Apply dimension weights"
    calculation: |
      (hook_strength * 0.20) +
      (emotional_resonance * 0.15) +
      (practical_value * 0.15) +
      (social_currency * 0.15) +
      (story_structure * 0.10) +
      (platform_fit * 0.10) +
      (specificity * 0.10) +
      (voice_alignment * 0.05)
    output: "Weighted base score (0-100)"

  step_3:
    action: "Apply platform modifiers"
    output: "Platform-adjusted score"

  step_4:
    action: "Apply bonus/penalty points"
    output: "Final score"

  step_5:
    action: "Map to benchmark"
    output: "Publish decision"

  step_6:
    action: "If below threshold, identify fix"
    output: "Improvement recommendations"
```

---

## OUTPUT: VIRALITY SCORING FRAMEWORK (VSF)

Complete VSF Template:

```yaml
# VIRALITY SCORING FRAMEWORK (VSF)
# Campaign: [Name]
# Created: [Date]
# Version: 1.0

campaign_name:
date_created:
version: "1.0"

## SCORING DIMENSIONS
dimensions:
  - name: hook_strength
    weight: 20
    criteria: {}
    indicators: {}

  - name: emotional_resonance
    weight: 15
    criteria: {}
    target_emotions: []

  - name: practical_value
    weight: 15
    criteria: {}
    indicators: {}

  - name: social_currency
    weight: 15
    criteria: {}
    drivers: []

  - name: story_structure
    weight: 10
    criteria: {}
    elements: []

  - name: platform_fit
    weight: 10
    criteria: {}
    factors: []

  - name: specificity
    weight: 10
    criteria: {}
    indicators: {}

  - name: voice_alignment
    weight: 5
    criteria: {}
    check_against: []

## PLATFORM MODIFIERS
platform_modifiers:
  primary_platform:
    name:
    adjustments: {}
    bonus_points: {}
    penalties: {}

## BENCHMARKS
benchmarks:
  minimum_publish: 60
  target: 75
  viral_threshold: 85

  score_mapping:
    0-40: "Do not publish"
    40-60: "Needs work"
    60-75: "Publishable"
    75-85: "Prioritize"
    85-100: "Maximum push"

## CALIBRATION
calibration:
  calibration_date:
  specimens_analyzed: [Count]
  high_performers: []
  calibration_insights: |

## QUICK-SCORE
quick_score:
  must_haves: []
  red_flags: []
  green_lights: []
  kill_criteria: []

## SCORING CALCULATOR
scoring_process:
  formula: |
    Base = (hook * 0.20) + (emotion * 0.15) + (value * 0.15) +
           (social * 0.15) + (story * 0.10) + (platform * 0.10) +
           (specific * 0.10) + (voice * 0.05)
    Final = Base + Modifiers + Bonuses - Penalties

## SOURCE FILES
source_files:
  AIF: "skills/foundation/S01-audience-intelligence/outputs/[name]-AIF.yaml"
  PSF: "skills/foundation/S02-platform-strategy/outputs/[name]-PSF.yaml"
  BVF: "skills/foundation/S03-brand-voice/outputs/[name]-BVF.yaml"
  CAF: "skills/foundation/S04-content-architecture/outputs/[name]-CAF.yaml"
  HLF: "skills/foundation/S05-hook-library/outputs/[name]-HLF.yaml"
```

---

## VALIDATION REQUIREMENTS

VSF must have these fields populated to pass Gate G06:

- [ ] All 8 dimensions defined with weights summing to 100
- [ ] Each dimension has scoring criteria (10/8/6/4/2/0)
- [ ] Primary platform modifiers defined
- [ ] Benchmarks established (minimum, target, viral)
- [ ] Calibration completed (>=10 specimens scored)
- [ ] Quick-score checklist populated
- [ ] Scoring formula documented

---

## OUTPUT LOCATION

Save VSF to:
```
skills/foundation/S06-virality-scoring/outputs/[campaign-name]-VSF.yaml
```

---

## USAGE IN PRODUCTION

When S08-S14 production skills run, every piece of content MUST be scored using VSF:

```yaml
content_score:
  content_title: "[Name]"
  dimension_scores:
    hook_strength: [0-10]
    emotional_resonance: [0-10]
    practical_value: [0-10]
    social_currency: [0-10]
    story_structure: [0-10]
    platform_fit: [0-10]
    specificity: [0-10]
    voice_alignment: [0-10]
  base_score: [Calculated]
  modifiers_applied: [List]
  final_score: [Number]
  decision: [Publish/Revise/Kill]
  improvement_notes: |
    [If below threshold]
```

---

## NEXT SKILL

Upon completion, S07: Campaign Brief is unlocked via Gate G06.

---

*If you can't score it, you can't improve it. Virality isn't luck — it's architecture.*
