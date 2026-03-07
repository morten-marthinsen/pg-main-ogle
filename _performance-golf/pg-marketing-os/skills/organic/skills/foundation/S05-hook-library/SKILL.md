---
name: hook-library
description: >-
  Campaign-specific hook architecture and pattern library for organic content.
  Use after content architecture (S04) is complete and you need a library of
  hooks calibrated to audience, platform, and voice. Produces the Hook Library
  File (HLF) with categorized hooks by type, platform-specific variants, and
  attention-optimization patterns. The hook is everything in a 3-second attention
  world — without a hook library, every piece of content starts from zero.
  Trigger when users mention hooks, opening lines, attention-grabbers, scroll-
  stoppers, or building a library of content openers. Requires the Content
  Architecture File (CAF) from S04.
---

# S05: HOOK LIBRARY
## Hook Architecture + Pattern Library
## Gate: G04 (Requires S04 CAF) | Output: HLF (Hook Library File)

---

## PURPOSE

This skill builds a campaign-specific library of hooks calibrated to audience, platform, and voice. The hook is everything in a 3-second attention world. Without a hook library, every piece of content starts from zero.

**Output:** Hook Library File (HLF)
**Unlocks:** S06: Virality Scoring (via Gate G05)

## ANTI-DEGRADATION

- Read `S05-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `skills/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## REQUIRED CONTEXT

### Teachings to Load
- `teachings/virality/kane-3-second-hook.yaml`
- `teachings/virality/berger-stepps-framework.yaml`
- `teachings/audience-psychology/cialdini-influence-principles.yaml`
- `teachings/content-strategy/heath-made-to-stick.yaml`

### Specimens to Load
- `specimens/hooks/hook-taxonomy.json`
- Platform-specific viral specimens from target platforms
- High-performing hooks from competitor analysis

### Prerequisite Files
- S01 Output: `outputs/[campaign]-AIF.yaml` (language + pain/desire)
- S02 Output: `outputs/[campaign]-PSF.yaml` (platform context)
- S03 Output: `outputs/[campaign]-BVF.yaml` (voice constraints)
- S04 Output: `outputs/[campaign]-CAF.yaml` (pillar + series context)

---

## INPUT REQUIREMENTS

S01-S04 outputs, plus:

```yaml
hook_context:
  primary_platform: [From PSF]
  primary_format: [Video/carousel/thread/etc]

  top_performing_content:
    - title: [Content that worked]
      hook_used: [The hook]
      why_it_worked: [Analysis]

  competitor_hooks:
    - creator: [Name]
      hook: [Their hook]
      performance: [Views/engagement]
      what_to_learn: [Insight]
```

---

## PROCESS

### Phase 1: Hook Taxonomy Understanding

Internalize the hook taxonomy from specimens:

```yaml
hook_categories:
  curiosity_hooks:
    description: |
      Create information gaps that demand closure
    mechanisms:
      - Open loop (incomplete story)
      - Unexpected juxtaposition
      - Impossible/unlikely statement
      - Hidden knowledge reveal

  fear_hooks:
    description: |
      Activate loss aversion and threat detection
    mechanisms:
      - Warning/danger signal
      - Loss framing
      - Mistake exposure
      - Future threat

  desire_hooks:
    description: |
      Promise specific valuable outcomes
    mechanisms:
      - Result promise
      - Secret/shortcut
      - Transformation preview
      - Status/identity upgrade

  social_proof_hooks:
    description: |
      Leverage tribal belonging and validation
    mechanisms:
      - Numbers/statistics
      - Authority endorsement
      - Trend signaling
      - Community reference

  identity_hooks:
    description: |
      Trigger self-recognition and belonging
    mechanisms:
      - "You" direct address
      - Tribe identification
      - Struggle recognition
      - Aspiration alignment

  controversy_hooks:
    description: |
      Create tension through unexpected positions
    mechanisms:
      - Contrarian take
      - Myth busting
      - Hot take
      - Challenge to authority

  story_hooks:
    description: |
      Open narrative loops with conflict/tension
    mechanisms:
      - "I was wrong about..."
      - Transformation beginning
      - Conflict introduction
      - Stakes establishment

  pattern_interrupt:
    description: |
      Break expected patterns to capture attention
    mechanisms:
      - Unexpected visual
      - Unusual opening
      - Pattern violation
      - Shock value (within limits)
```

### Phase 2: Hook Templates by Category

Build templates for each category:

```yaml
hook_templates:
  curiosity:
    - template: "The [unexpected adjective] truth about [topic]"
      example: "The uncomfortable truth about morning routines"
      use_when: [Context]
      voice_fit: [How to adapt to our voice]

    - template: "What [authority/group] don't want you to know about [topic]"
      example: "What productivity gurus don't want you to know about hustle culture"
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "I spent [time/money] on [thing] so you don't have to"
      example: "I spent $50,000 on courses so you don't have to"
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "[Number] years of [activity] taught me [unexpected lesson]"
      example: "15 years of entrepreneurship taught me to stop working hard"
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "This [thing] changed everything about how I [activity]"
      example: "This framework changed everything about how I create content"
      use_when: [Context]
      voice_fit: [How to adapt]

  fear:
    - template: "Stop [common action] — here's why"
      example: "Stop posting at 9am — here's why"
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "The [number] mistakes that are killing your [outcome]"
      example: "The 3 mistakes that are killing your engagement"
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "[Most people/You're probably] doing [thing] wrong"
      example: "You're probably doing hooks wrong"
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "Why [thing you trust] is actually [opposite]"
      example: "Why your engagement rate is actually lying to you"
      use_when: [Context]
      voice_fit: [How to adapt]

  desire:
    - template: "How I [achieved result] in [time frame]"
      example: "How I grew to 100K followers in 90 days"
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "The [simple/easy] way to [desired outcome]"
      example: "The stupidly simple way to create viral content"
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "[Number] [things] that will [transform outcome]"
      example: "5 hooks that will 10x your reach"
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "What if you could [desired state] without [sacrifice]"
      example: "What if you could go viral without being cringe"
      use_when: [Context]
      voice_fit: [How to adapt]

  social_proof:
    - template: "After [number] [things created], here's what actually works"
      example: "After 1,000 videos, here's what actually works"
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "[Impressive result] — here's how"
      example: "10 million views in 30 days — here's how"
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "I asked [number/authority] [people] and they all said..."
      example: "I asked 50 millionaires and they all said this"
      use_when: [Context]
      voice_fit: [How to adapt]

  identity:
    - template: "If you [behavior], you need to hear this"
      example: "If you overthink your content, you need to hear this"
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "Only [percentage/type] of [people] understand this"
      example: "Only 1% of creators understand this"
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "[Type of person] won't tell you this, but..."
      example: "Your mentor won't tell you this, but..."
      use_when: [Context]
      voice_fit: [How to adapt]

  controversy:
    - template: "Unpopular opinion: [contrarian take]"
      example: "Unpopular opinion: posting daily is a waste of time"
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "[Common advice] is dead. Here's what works now."
      example: "Hashtags are dead. Here's what works now."
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "Everyone says [common wisdom]. They're wrong."
      example: "Everyone says be consistent. They're wrong."
      use_when: [Context]
      voice_fit: [How to adapt]

  story:
    - template: "[Time ago], I [situation]. [Unexpected turn]."
      example: "6 months ago, I was broke. Now I'm turning down clients."
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "I almost [bad outcome] until I discovered..."
      example: "I almost quit content creation until I discovered..."
      use_when: [Context]
      voice_fit: [How to adapt]

    - template: "The day I [learned lesson] everything changed"
      example: "The day I stopped caring about likes, everything changed"
      use_when: [Context]
      voice_fit: [How to adapt]
```

### Phase 3: Platform-Specific Hook Optimization

Adapt hooks for each platform:

```yaml
platform_optimization:
  instagram_reels:
    optimal_length: "1-3 seconds verbal, must hook visually instantly"
    format_notes:
      - Text overlay for silent viewers
      - Visual pattern interrupt in frame 1
      - Face close-up often works best

    hook_adaptations:
      - Start mid-sentence or mid-action
      - Use "POV:" or "Watch this" frameworks
      - Question + pause works well

    hooks_that_work:
      - Direct-to-camera confrontation
      - Visual reveal builds
      - Text-on-screen with suspense

    hooks_to_avoid:
      - Slow builds
      - "Hey guys" openings
      - Long setup before payoff

  tiktok:
    optimal_length: "0.5-2 seconds to hook"
    format_notes:
      - First frame must stop scroll
      - Sound trends can act as hook
      - Green screen effective for context

    hook_adaptations:
      - Pattern interrupt in first frame
      - Leverage trending sounds
      - "POV" and "storytime" formats

    hooks_that_work:
      - Immediate conflict/tension
      - Unexpected visual
      - Direct challenge to viewer

    hooks_to_avoid:
      - Logos or intros
      - "Follow me for more"
      - Slow pacing

  youtube_shorts:
    optimal_length: "1-3 seconds"
    format_notes:
      - Must work on mute
      - Thumbnail mindset even for Shorts
      - Hook impacts swipe-away rate

    hook_adaptations:
      - Text overlay critical
      - Curiosity gaps work well
      - Tutorial framing effective

    hooks_that_work:
      - "Here's how to..." immediately
      - Result shown first
      - Unexpected claim

    hooks_to_avoid:
      - "In this video..."
      - Asking for engagement upfront
      - Slow reveals

  youtube_longform:
    optimal_length: "5-15 seconds before topic reveal"
    format_notes:
      - Hook works WITH thumbnail/title
      - Must justify the length
      - Pattern preview helps retention

    hook_adaptations:
      - Cold open with compelling clip
      - Stakes establishment
      - Pattern promise ("3 things...")

    hooks_that_work:
      - Conflict/drama tease
      - Transformation preview
      - "What happened next will..."

    hooks_to_avoid:
      - Long intros/branding
      - "Don't forget to subscribe"
      - Sponsor placement in hook

  linkedin:
    optimal_length: "First 2 lines before 'see more'"
    format_notes:
      - Must work as text
      - Hook is the first 2 lines
      - "See more" is the scroll-stopper

    hook_adaptations:
      - Bold statement first line
      - Contrarian professional take
      - Personal story opener

    hooks_that_work:
      - "I [did/learned/failed] something..."
      - Counterintuitive business insight
      - Vulnerable admission

    hooks_to_avoid:
      - "I'm excited to announce..."
      - Promotional language
      - Links in first line

  x_twitter:
    optimal_length: "First line must hook"
    format_notes:
      - Thread hook is everything
      - Quote tweet format matters
      - Character limit forces density

    hook_adaptations:
      - Density over explanation
      - Hot take format
      - "Thread:" or emoji setup

    hooks_that_work:
      - Contrarian statement
      - Surprising statistic
      - Bold claim to unpack

    hooks_to_avoid:
      - "1/" without hook
      - Links in main tweet
      - Asking questions without substance
```

### Phase 4: Hook Generation by Pillar

Generate hooks for each content pillar:

```yaml
pillar_hooks:
  pillar_1:
    pillar_name: [Name]

    curiosity_hooks:
      - "[Hook text]"
      - "[Hook text]"
      - "[Hook text]"

    fear_hooks:
      - "[Hook text]"
      - "[Hook text]"

    desire_hooks:
      - "[Hook text]"
      - "[Hook text]"
      - "[Hook text]"

    story_hooks:
      - "[Hook text]"
      - "[Hook text]"

  pillar_2:
    # Same structure

  pillar_3:
    # Same structure
```

### Phase 5: Voice Calibration

Ensure hooks match brand voice:

```yaml
voice_calibrated_hooks:
  on_voice_examples:
    - hook: "[Hook that nails our voice]"
      category: [Hook type]
      pillar: [Which pillar]
      why_on_voice: |
        [Explanation]

  off_voice_examples:
    - original_hook: "[Generic hook]"
      voice_problem: |
        [What's wrong]
      fixed_hook: "[Hook rewritten in our voice]"

  voice_filters:
    must_include:
      - [Voice element that must be present]
    must_avoid:
      - [Voice element to never include in hooks]
```

### Phase 6: Hook Testing Plan

Design testing methodology:

```yaml
testing_plan:
  a_b_test_structure:
    test_variable: [What we're testing]
    control: [Base hook]
    variations:
      - variation: [Hook variant]
        hypothesis: [What we expect]

  success_metrics:
    - metric: [What we measure]
      threshold: [What constitutes success]

  testing_cadence:
    frequency: [How often we test]
    sample_size: [Minimum views before decision]

  learning_capture:
    process: |
      [How we document what works]
    storage: |
      skills/foundation/S05-hook-library/learnings/
```

---

## OUTPUT: HOOK LIBRARY FILE (HLF)

Complete HLF Template:

```yaml
# HOOK LIBRARY FILE (HLF)
# Campaign: [Name]
# Created: [Date]
# Version: 1.0

campaign_name:
date_created:
version: "1.0"

## HOOK TAXONOMY
hook_categories:
  - category: curiosity
    mechanisms: []
    templates: []
  - category: fear
    mechanisms: []
    templates: []
  - category: desire
    mechanisms: []
    templates: []
  - category: social_proof
    mechanisms: []
    templates: []
  - category: identity
    mechanisms: []
    templates: []
  - category: controversy
    mechanisms: []
    templates: []
  - category: story
    mechanisms: []
    templates: []

## PLATFORM OPTIMIZATION
platform_hooks:
  instagram: {}
  tiktok: {}
  youtube_shorts: {}
  youtube_long: {}
  linkedin: {}
  x_twitter: {}

## PILLAR HOOKS
pillar_hooks: {}

## VOICE-CALIBRATED LIBRARY
ready_to_use_hooks:
  tier_1_proven:
    - hook: "[Text]"
      category: [Type]
      pillar: [Which]
      platform: [Best for]

  tier_2_high_confidence:
    - hook: "[Text]"
      category: [Type]
      pillar: [Which]
      platform: [Best for]

  tier_3_to_test:
    - hook: "[Text]"
      category: [Type]
      hypothesis: [Why it might work]

## ANTI-HOOKS
never_use:
  - hook_pattern: "[Pattern to avoid]"
    reason: |

## TESTING PLAN
testing_plan:
  methodology: |
  current_tests: []
  learnings: []

## SOURCE FILES
source_files:
  AIF: "skills/foundation/S01-audience-intelligence/outputs/[name]-AIF.yaml"
  PSF: "skills/foundation/S02-platform-strategy/outputs/[name]-PSF.yaml"
  BVF: "skills/foundation/S03-brand-voice/outputs/[name]-BVF.yaml"
  CAF: "skills/foundation/S04-content-architecture/outputs/[name]-CAF.yaml"
```

---

## VALIDATION REQUIREMENTS

HLF must have these fields populated to pass Gate G05:

- [ ] hook_categories (all 7 categories defined)
- [ ] platform_hooks (primary platform fully defined)
- [ ] pillar_hooks (hooks for each pillar from CAF)
- [ ] ready_to_use_hooks.tier_1_proven (>=10 hooks)
- [ ] ready_to_use_hooks.tier_2_high_confidence (>=20 hooks)
- [ ] never_use (>=5 anti-patterns)
- [ ] All hooks pass BVF voice check

---

## OUTPUT LOCATION

Save HLF to:
```
skills/foundation/S05-hook-library/outputs/[campaign-name]-HLF.yaml
```

---

## NEXT SKILL

Upon completion, S06: Virality Scoring is unlocked via Gate G05.

---

*The hook is not the beginning of content. The hook IS the content — everything else is proof.*
