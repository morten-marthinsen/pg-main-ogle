---
name: brand-voice
description: >-
  Voice architecture and tone calibration for organic content creation.
  Use after platform strategy (S02) is complete and you need to define or
  refine a brand's unique voice across social platforms. Produces the Brand
  Voice File (BVF) containing voice dimensions, tone registers, vocabulary
  guidelines, platform-specific adaptations, and voice specimens. Voice is
  the feeling behind words — without a defined voice, every piece of content
  is an identity crisis. Trigger when users mention brand voice, tone of voice,
  writing style, content personality, or voice consistency across platforms.
  Requires the Platform Strategy File (PSF) from S02.
---

# S03: BRAND VOICE
## Voice Architecture + Tone Calibration
## Gate: G02 (Requires S02 PSF) | Output: BVF (Brand Voice File)

---

## PURPOSE

This skill codifies the unique voice that will cut through noise. Voice is not words — it's the feeling behind words. Without a defined voice, every piece of content is an identity crisis.

**Output:** Brand Voice File (BVF)
**Unlocks:** S04: Content Architecture (via Gate G03)

## ANTI-DEGRADATION

- Read `S03-BRAND-VOICE-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `~system/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## REQUIRED CONTEXT

### Teachings to Load
- `teachings/audience-psychology/godin-permission-marketing.yaml`
- `teachings/content-strategy/miller-storybrand.yaml`
- `teachings/virality/berger-stepps-framework.yaml`
- `teachings/content-strategy/brand-voice-principles.yaml`

### Specimens to Load
- Voice specimens from aspirational creators
- High-performing content from competitor analysis (AIF)
- Platform-specific tone examples

### Prerequisite Files
- S01 Output: `outputs/[campaign]-AIF.yaml` (for language mining)
- S02 Output: `outputs/[campaign]-PSF.yaml` (for platform context)

---

## INPUT REQUIREMENTS

S01-S02 outputs, plus:

```yaml
brand_foundation:
  brand_name: [Name]
  brand_tagline: [If exists]
  brand_mission: [Core purpose]

  founder_voice:
    natural_tone: [How founder naturally speaks]
    writing_samples: [Existing content]
    speaking_samples: [Podcasts, videos]

  brand_values:
    - value: [Name]
      how_it_shows_in_voice: [Expression]
    - value: [Name]
      how_it_shows_in_voice: [Expression]

existing_voice_assets:
  style_guide: [If exists]
  voice_examples: [URLs or content]
  what_works: [Current voice that lands]
  what_doesnt: [Voice that falls flat]

aspirational_voices:
  - creator: [Name]
    platform: [Where]
    what_to_emulate: [Specific traits]
    what_to_avoid: [Their quirks we skip]
```

---

## PROCESS

### Phase 1: Voice Archetype Selection

Identify the foundational voice archetype:

```yaml
voice_archetype:
  primary_archetype:
    name: [Archetype name]
    description: |
      [What this archetype sounds like]
    example_creators: [Who embodies this]

  secondary_archetype:
    name: [Archetype name]
    description: |
      [How it complements primary]

  archetype_blend:
    ratio: [Primary:Secondary]
    expression: |
      [How they combine]
```

**12 Voice Archetypes:**

| Archetype | Core Energy | Example |
|-----------|-------------|---------|
| **The Sage** | Wisdom, insight, teaching | Tim Ferriss |
| **The Rebel** | Challenge, disruption, bold | Gary Vaynerchuk |
| **The Creator** | Vision, imagination, craft | Casey Neistat |
| **The Caregiver** | Empathy, support, nurturing | Brene Brown |
| **The Hero** | Courage, action, challenge | David Goggins |
| **The Explorer** | Curiosity, discovery, adventure | Nas Daily |
| **The Lover** | Passion, connection, beauty | Marie Forleo |
| **The Jester** | Humor, wit, entertainment | Ryan Reynolds |
| **The Ruler** | Authority, control, status | Alex Hormozi |
| **The Everyman** | Relatability, authenticity | MrBeast |
| **The Innocent** | Optimism, simplicity, hope | Simon Sinek |
| **The Magician** | Transformation, vision | Tony Robbins |

### Phase 2: Voice Dimensions

Define voice across key dimensions:

```yaml
voice_dimensions:
  formality:
    level: [1-10, 1=casual, 10=formal]
    description: |
      [How this shows up in content]
    examples:
      casual_end: [Example phrase at casual extreme]
      formal_end: [Example phrase at formal extreme]
      typical: [Example phrase at our level]

  energy:
    level: [1-10, 1=calm, 10=intense]
    description: |
      [How this shows up in content]
    examples:
      low_energy: [Example]
      high_energy: [Example]
      typical: [Example]

  complexity:
    level: [1-10, 1=simple, 10=complex]
    description: |
      [Vocabulary and concept complexity]
    examples:
      simple: [Example]
      complex: [Example]
      typical: [Example]

  warmth:
    level: [1-10, 1=distant, 10=intimate]
    description: |
      [Emotional closeness with audience]
    examples:
      distant: [Example]
      intimate: [Example]
      typical: [Example]

  humor:
    level: [1-10, 1=serious, 10=playful]
    type: [Wit/sarcasm/absurdist/observational/none]
    description: |
      [How humor appears]
    examples:
      serious: [Example]
      playful: [Example]
      typical: [Example]

  authority:
    level: [1-10, 1=peer, 10=expert]
    source: [Experience/credentials/results/philosophy]
    description: |
      [How authority is established]
    examples:
      peer: [Example]
      expert: [Example]
      typical: [Example]

  provocation:
    level: [1-10, 1=safe, 10=controversial]
    boundaries: [What we will/won't touch]
    description: |
      [How much we push boundaries]
    examples:
      safe: [Example]
      provocative: [Example]
      typical: [Example]

  pace:
    level: [1-10, 1=slow, 10=rapid]
    description: |
      [Sentence rhythm and cadence]
    examples:
      slow: [Example]
      rapid: [Example]
      typical: [Example]
```

### Phase 3: Tone Variations

Voice stays constant; tone shifts by context:

```yaml
tone_variations:
  by_content_function:
    awareness:
      tone_shift: |
        [How voice adjusts for awareness content]
      example: [Sample]

    engagement:
      tone_shift: |
        [How voice adjusts for engagement content]
      example: [Sample]

    conversion:
      tone_shift: |
        [How voice adjusts for conversion content]
      example: [Sample]

    community:
      tone_shift: |
        [How voice adjusts for community content]
      example: [Sample]

  by_platform:
    instagram:
      tone_shift: |
        [Platform-specific adjustments]
      example: [Sample]

    tiktok:
      tone_shift: |
        [Platform-specific adjustments]
      example: [Sample]

    youtube:
      tone_shift: |
        [Platform-specific adjustments]
      example: [Sample]

    linkedin:
      tone_shift: |
        [Platform-specific adjustments]
      example: [Sample]

    x_twitter:
      tone_shift: |
        [Platform-specific adjustments]
      example: [Sample]

  by_emotion:
    celebrating_wins:
      tone: [Description]
      example: [Sample]

    addressing_struggle:
      tone: [Description]
      example: [Sample]

    teaching_concepts:
      tone: [Description]
      example: [Sample]

    responding_to_criticism:
      tone: [Description]
      example: [Sample]

    announcing_offers:
      tone: [Description]
      example: [Sample]
```

### Phase 4: Language Rules

Specific vocabulary and syntax guidelines:

```yaml
language_rules:
  vocabulary:
    signature_words:
      - word: [Word]
        usage: [How/when to use]
      # 5-10 signature words

    power_phrases:
      - phrase: [Phrase]
        context: [When to use]
      # 10-20 power phrases

    banned_words:
      - word: [Word]
        reason: [Why banned]
      # Words to never use

    audience_language:
      - phrase: [From language mining]
        integrate_how: [How to use it naturally]

  syntax:
    sentence_length:
      preference: [Short/mixed/long]
      guideline: |
        [Specific guidance]

    paragraph_length:
      preference: [How many sentences]
      guideline: |
        [Specific guidance]

    punctuation_style:
      em_dashes: [Yes/No/How]
      ellipses: [Yes/No/How]
      exclamation_points: [Frequency]
      question_use: [Rhetorical/direct]

    structural_preferences:
      lists: [Bullet vs numbered, when]
      headers: [Style]
      capitalization: [Title case/sentence/caps]

  rhetorical_devices:
    preferred:
      - device: [Name]
        example: [How we use it]
      # List devices we use

    avoided:
      - device: [Name]
        reason: [Why we skip it]
```

### Phase 5: Anti-Voice Definition

Define what we explicitly DO NOT sound like:

```yaml
anti_voice:
  never_sound_like:
    - archetype: [What to avoid]
      example: [What this sounds like]
      why_wrong: [Why it doesn't fit us]

  never_use:
    - pattern: [Language pattern]
      example: [What it looks like]
      alternative: [What to use instead]

  tone_boundaries:
    too_casual_example: [Crosses our line]
    too_formal_example: [Crosses our line]
    too_salesy_example: [Crosses our line]
    too_preachy_example: [Crosses our line]

  competitive_differentiation:
    - competitor: [Name]
      their_voice: [Description]
      our_distinction: [How we differ]
```

### Phase 6: Voice Calibration Examples

Write calibration samples to lock voice:

```yaml
voice_calibration:
  hook_examples:
    on_voice:
      - "[Example hook that nails our voice]"
      - "[Example hook that nails our voice]"
      - "[Example hook that nails our voice]"

    off_voice:
      - text: "[Example that misses]"
        fix: "[Corrected version]"

  caption_examples:
    on_voice:
      - "[Full caption example in our voice]"

    off_voice:
      - text: "[Example that misses]"
        fix: "[Corrected version]"

  response_examples:
    to_compliment:
      on_voice: "[How we respond]"
      off_voice: "[How we don't respond]"

    to_question:
      on_voice: "[How we respond]"
      off_voice: "[How we don't respond]"

    to_criticism:
      on_voice: "[How we respond]"
      off_voice: "[How we don't respond]"
```

---

## OUTPUT: BRAND VOICE FILE (BVF)

Complete BVF Template:

```yaml
# BRAND VOICE FILE (BVF)
# Campaign: [Name]
# Created: [Date]
# Version: 1.0

campaign_name:
brand_name:
date_created:
version: "1.0"

## VOICE IDENTITY
voice_identity:
  archetype:
    primary:
    secondary:
    blend_description: |

  one_sentence_voice: |
    [Our voice is...]

  voice_pillars:
    - pillar: [Name]
      description: |
    - pillar: [Name]
      description: |
    - pillar: [Name]
      description: |

## VOICE DIMENSIONS
voice_dimensions:
  formality: [1-10]
  energy: [1-10]
  complexity: [1-10]
  warmth: [1-10]
  humor: [1-10]
  authority: [1-10]
  provocation: [1-10]
  pace: [1-10]

  dimension_summary: |
    [Paragraph describing overall voice feel]

## TONE VARIATIONS
tone_variations:
  by_content_function: {}
  by_platform: {}
  by_emotion: {}

## LANGUAGE RULES
language_rules:
  signature_words: []
  power_phrases: []
  banned_words: []
  audience_language: []

  syntax:
    sentence_length:
    paragraph_length:
    punctuation_style: {}
    structural_preferences: {}

  rhetorical_devices:
    preferred: []
    avoided: []

## ANTI-VOICE
anti_voice:
  never_sound_like: []
  never_use: []
  tone_boundaries: {}
  competitive_differentiation: []

## CALIBRATION EXAMPLES
calibration:
  hook_examples:
    on_voice: []
    off_voice: []
  caption_examples:
    on_voice: []
    off_voice: []
  response_examples: {}

## SOURCE FILES
source_files:
  AIF: "core-message/S01-audience-intelligence/outputs/[name]-AIF.yaml"
  PSF: "core-message/S02-platform-strategy/outputs/[name]-PSF.yaml"
```

---

## VALIDATION REQUIREMENTS

BVF must have these fields populated to pass Gate G03:

- [ ] voice_identity.archetype.primary (valid archetype)
- [ ] voice_identity.one_sentence_voice (not empty)
- [ ] voice_dimensions (all 8 dimensions scored)
- [ ] language_rules.signature_words (>=5)
- [ ] language_rules.power_phrases (>=10)
- [ ] language_rules.banned_words (>=5)
- [ ] anti_voice.never_sound_like (>=2)
- [ ] calibration.hook_examples.on_voice (>=3)

---

## OUTPUT LOCATION

Save BVF to:
```
core-message/S03-brand-voice/outputs/[campaign-name]-BVF.yaml
```

---

## NEXT SKILL

Upon completion, S04: Content Architecture is unlocked via Gate G03.

---

*Voice is the invisible fingerprint on every piece of content. Get it right once, and every piece carries the same DNA.*
