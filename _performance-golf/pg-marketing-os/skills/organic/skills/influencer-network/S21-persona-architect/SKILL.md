---
name: persona-architect
description: >-
  Design complete AI influencer identities with distinct personalities, visual
  systems, and voice architectures. Use when building new AI influencer personas
  that can operate autonomously within the network. Produces comprehensive Persona
  Bibles containing identity foundations, visual identity systems, voice architecture
  specs, content DNA profiles, and growth trajectory plans. This is the first skill
  in the Influencer Network cluster (S21-S24). Trigger when users mention creating
  influencer personas, AI influencers, building social media characters, persona
  development, or designing influencer identities. Requires network strategy
  definition and brand voice guidelines.
---

# S21: PERSONA ARCHITECT

## SKILL IDENTITY

**Skill ID:** S21-persona-architect
**Name:** Persona Architect
**Version:** 1.0.0
**Purpose:** Design complete AI influencer identities with distinct personalities, visual systems, and voice architectures that can operate autonomously within the network
**Position in Pipeline:** First skill in Influencer Network cluster (S21 → S22 → S23 → S24)
**Upstream Dependencies:** Network Strategy Definition, Brand Voice Guidelines
**Downstream Consumers:** S22-Account Strategy, S23-Network Coordination, S24-Monetization Engine

## ANTI-DEGRADATION

- Read `S21-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `skills/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## PREREQUISITES (Gate Requirements)

### Required Before Execution

| Gate | Requirement | Validation Method |
|------|-------------|-------------------|
| G1 | Network size defined (minimum 3, maximum 12 personas) | Integer between 3-12 |
| G2 | Master brand identity exists | Brand Bible document present |
| G3 | Target audience segments identified (minimum 3) | Audience Persona documents |
| G4 | Niche ecosystem mapped | Niche Map with sub-niches identified |
| G5 | Platform list confirmed | Platform Strategy document |
| G6 | Content pillar framework established | Content Pillar Matrix |
| G7 | Legal/compliance guidelines defined | Compliance Checklist |

### Soft Prerequisites (Recommended)

- Competitor influencer analysis complete
- Visual brand guidelines established
- Tone of voice spectrum defined
- Content style examples curated

---

## INPUT REQUIREMENTS

### Required Inputs

```yaml
network_config:
  total_personas: integer (3-12)
  primary_platforms: array [instagram, tiktok, youtube, twitter, linkedin, threads]
  master_brand: string
  brand_relationship: enum [overt, covert, hybrid]

audience_segments:
  - segment_id: string
    name: string
    demographics:
      age_range: string
      gender_distribution: object
      location_focus: array
      income_bracket: string
    psychographics:
      values: array
      pain_points: array
      aspirations: array
      content_preferences: array

niche_ecosystem:
  primary_niche: string
  sub_niches: array
  adjacent_niches: array

content_pillars:
  - pillar_id: string
    name: string
    themes: array
    content_types: array

visual_guidelines:
  color_palette: array
  aesthetic_spectrum: string
  imagery_style: string
```

### Optional Inputs

```yaml
existing_personas: array (for network expansion)
competitor_personas: array (for differentiation)
brand_restrictions: array
platform_specific_requirements: object
monetization_priorities: array
```

---

## PROCESS (Step-by-Step Execution Protocol)

### Phase 1: Niche Ownership Mapping

**Duration:** 30-45 minutes

**Step 1.1: Sub-Niche Inventory**
Create exhaustive list of sub-niches within the ecosystem:

```
PRIMARY NICHE: [Main Topic]
├── Sub-Niche A: [Specific angle 1]
├── Sub-Niche B: [Specific angle 2]
├── Sub-Niche C: [Specific angle 3]
├── Sub-Niche D: [Specific angle 4]
├── Sub-Niche E: [Specific angle 5]
└── Adjacent Niches:
    ├── Adjacent 1: [Related topic]
    ├── Adjacent 2: [Related topic]
    └── Adjacent 3: [Related topic]
```

**Step 1.2: Ownership Assignment Matrix**
Map each persona to exclusive sub-niche territory:

| Persona Slot | Primary Sub-Niche | Secondary Territory | Off-Limits |
|--------------|-------------------|---------------------|------------|
| Persona 1 | Sub-Niche A | Adjacent 1 | Sub-Niche B, C |
| Persona 2 | Sub-Niche B | Adjacent 2 | Sub-Niche A, D |
| Persona 3 | Sub-Niche C | Sub-Niche E | Sub-Niche A, B |

**Step 1.3: Differentiation Validation**
Run overlap analysis:
- No two personas share >15% content theme overlap
- Each persona has minimum 2 unique content angles
- Adjacent territory shared by maximum 2 personas

---

### Phase 2: Archetype Selection

**Duration:** 20-30 minutes

**Step 2.1: Archetype Assignment**
Select primary archetype for each persona from the seven core archetypes:

#### THE SEVEN PERSONA ARCHETYPES

**1. THE EDUCATOR**
- **Core Function:** Teach, explain, demystify
- **Content Style:** Tutorials, breakdowns, how-tos, myth-busting
- **Voice Characteristics:** Patient, clear, authoritative but approachable
- **Audience Relationship:** Teacher-student, mentor-mentee
- **Best For:** Complex topics, skill-building niches, professional development
- **Monetization Strengths:** Courses, coaching, paid communities

**2. THE CURATOR**
- **Core Function:** Filter, organize, recommend
- **Content Style:** Lists, roundups, reviews, comparisons, "best of"
- **Voice Characteristics:** Discerning, organized, tasteful, helpful
- **Audience Relationship:** Trusted advisor, personal shopper
- **Best For:** Product-heavy niches, lifestyle, tools/tech
- **Monetization Strengths:** Affiliate marketing, sponsored content, brand deals

**3. THE STORYTELLER**
- **Core Function:** Narrate, inspire, connect emotionally
- **Content Style:** Personal stories, case studies, journey content, transformations
- **Voice Characteristics:** Vulnerable, dramatic, relatable, engaging
- **Audience Relationship:** Friend, fellow traveler
- **Best For:** Personal development, health journeys, creative pursuits
- **Monetization Strengths:** Books, speaking, high-ticket programs

**4. THE PROVOCATEUR**
- **Core Function:** Challenge, disrupt, question norms
- **Content Style:** Hot takes, contrarian views, debates, myth-destroying
- **Voice Characteristics:** Bold, confident, unapologetic, sharp
- **Audience Relationship:** Thought leader, iconoclast they admire
- **Best For:** Crowded niches needing differentiation, opinion-based topics
- **Monetization Strengths:** Premium memberships, events, consulting

**5. THE ENTERTAINER**
- **Core Function:** Delight, amuse, provide escape
- **Content Style:** Comedy, skits, trends, memes, reactions
- **Voice Characteristics:** Funny, energetic, relatable, quick-witted
- **Audience Relationship:** Friend who makes them laugh
- **Best For:** Broad appeal topics, brand awareness, viral content
- **Monetization Strengths:** Brand sponsorships, merchandise, UGC deals

**6. THE CONNECTOR**
- **Core Function:** Build community, facilitate relationships
- **Content Style:** Interviews, collaborations, community spotlights, networking content
- **Voice Characteristics:** Warm, inclusive, curious about others, generous
- **Audience Relationship:** Community leader, host
- **Best For:** Professional niches, B2B, community-driven topics
- **Monetization Strengths:** Events, memberships, B2B partnerships

**7. THE ANALYST**
- **Core Function:** Research, data-drive, predict
- **Content Style:** Data breakdowns, trend analysis, predictions, deep dives
- **Voice Characteristics:** Precise, evidence-based, thoughtful, nuanced
- **Audience Relationship:** Expert resource, trusted researcher
- **Best For:** Finance, tech, markets, strategy-focused niches
- **Monetization Strengths:** Research reports, consulting, premium newsletters

**Step 2.2: Archetype Balance Check**
Ensure network diversity:
- No more than 2 personas share same primary archetype
- Minimum 4 different archetypes across network
- Archetypes should complement, not compete

---

### Phase 3: Identity Generation

**Duration:** 45-60 minutes per persona

**Step 3.1: Core Identity Creation**

For each persona, generate:

```yaml
persona_identity:
  # NAMING
  name:
    first_name: string (culturally appropriate, memorable)
    last_name: string (optional, depends on niche formality)
    handle_variations:
      instagram: string
      tiktok: string
      youtube: string
      twitter: string
    nickname: string (for community use)

  # DEMOGRAPHICS
  demographics:
    age: integer (specific, not range)
    gender: string
    location:
      city: string
      country: string
      timezone: string
    nationality: string
    ethnicity: string (for AI image consistency)

  # BACKSTORY
  backstory:
    origin_story: string (200-300 words)
    defining_moment: string (what led to this niche)
    credentials: array (real or implied expertise)
    current_situation: string (lifestyle context)
    future_aspirations: array

  # PERSONALITY
  personality:
    mbti_type: string
    enneagram: string
    core_values: array (3-5 values)
    quirks: array (2-3 memorable traits)
    pet_peeves: array
    guilty_pleasures: array
    catchphrases: array (2-3 signature phrases)
```

**Step 3.2: Backstory Development Protocol**

Create compelling, consistent backstory using this framework:

```
BACKSTORY TEMPLATE:

[NAME] is a [AGE]-year-old [PROFESSION/IDENTITY] based in [LOCATION].

ORIGIN: [How they discovered their niche - specific moment or journey]

STRUGGLE: [What challenge did they overcome that gives them credibility]

TRANSFORMATION: [What shift happened that made them passionate about sharing]

MISSION: [Why they create content - the deeper purpose]

DAILY LIFE: [What their lifestyle looks like - adds relatability]

UNIQUE ANGLE: [What perspective only THEY can bring]
```

**Step 3.3: Credential Framework**

Establish believable expertise:

| Credential Type | Examples | Authenticity Level |
|-----------------|----------|-------------------|
| Professional | "Former [industry] professional" | Must be defensible |
| Experiential | "10 years practicing [skill]" | Implied through content |
| Educational | "Self-taught expert in..." | Demonstrated in content |
| Results-Based | "Helped 500+ people with..." | Build over time |
| Passion-Based | "Obsessed with [topic] since..." | Immediately claimable |

---

### Phase 4: Visual Identity System

**Duration:** 30-45 minutes per persona

**Step 4.1: AI Face Generation Specifications**

```yaml
visual_identity:
  face_generation:
    tool: enum [midjourney, dalle, stable_diffusion, custom]
    base_prompt: string
    consistency_seeds: array

    physical_attributes:
      skin_tone: string (hex code range)
      hair_color: string
      hair_style: string
      eye_color: string
      facial_features: string (distinctive elements)
      age_appearance: string

    expression_library:
      default: string (prompt modifier)
      excited: string
      thoughtful: string
      serious: string
      laughing: string

    angle_library:
      profile: string
      three_quarter: string
      straight_on: string
      looking_down: string
      looking_up: string
```

**Step 4.2: Aesthetic System**

```yaml
aesthetic_system:
  color_palette:
    primary: hex
    secondary: hex
    accent: hex
    neutral: hex
    background: hex

  visual_style:
    photography_style: string
    editing_preset: string
    filter_approach: string
    lighting_preference: string

  brand_elements:
    logo_style: string (if applicable)
    font_primary: string
    font_secondary: string
    icon_style: string

  content_templates:
    carousel_style: string
    story_aesthetic: string
    video_thumbnail_style: string
    quote_graphic_style: string
```

**Step 4.3: Visual Consistency Protocol**

```
CONSISTENCY RULES:

1. FACE CONSISTENCY
   - Use same base seed/prompt for all AI generations
   - Maintain consistent lighting direction
   - Keep consistent age appearance
   - Document 10+ reference images as "canonical"

2. ENVIRONMENT CONSISTENCY
   - Define 3-5 recurring locations/backgrounds
   - Maintain consistent props and objects
   - Create "signature" visual elements

3. EDITING CONSISTENCY
   - Use identical preset/filter across all content
   - Maintain consistent saturation and contrast levels
   - Keep text styling uniform

4. WARDROBE CONSISTENCY
   - Define color palette for clothing
   - Establish signature pieces
   - Document "never wear" items
```

---

### Phase 5: Voice Architecture

**Duration:** 30-45 minutes per persona

**Step 5.1: Voice DNA Definition**

```yaml
voice_architecture:
  # CORE VOICE
  voice_dna:
    primary_trait: string (one word: witty, warm, direct, etc.)
    secondary_trait: string
    tertiary_trait: string
    anti_traits: array (what this voice is NEVER)

  # VOCABULARY
  vocabulary:
    signature_words: array (words they use frequently)
    banned_words: array (words they never use)
    industry_jargon_level: enum [none, light, moderate, heavy]
    slang_usage: enum [none, light, moderate, heavy]
    emoji_style:
      frequency: enum [never, rare, occasional, frequent]
      signature_emojis: array

  # SENTENCE STRUCTURE
  syntax:
    average_sentence_length: enum [short, medium, long, varied]
    paragraph_length: enum [punchy, moderate, detailed]
    question_frequency: enum [rare, occasional, frequent]
    exclamation_usage: enum [never, rare, occasional, frequent]

  # EMOTIONAL RANGE
  emotional_spectrum:
    baseline_energy: enum [calm, moderate, high]
    excitement_expression: string (how they show excitement)
    frustration_expression: string (how they show frustration)
    empathy_expression: string (how they show care)
```

**Step 5.2: Voice Examples Library**

Create 10+ example outputs in the persona's voice:

```
VOICE EXAMPLE LIBRARY:

[HOOK - Attention Grabber]
"[Example hook in persona's exact voice]"

[EDUCATIONAL - Teaching moment]
"[Example educational content in persona's voice]"

[PERSONAL - Vulnerability/story]
"[Example personal share in persona's voice]"

[RESPONSE - Replying to comments]
"[Example comment response in persona's voice]"

[CTA - Call to action]
"[Example CTA in persona's voice]"

[CONTROVERSY - Handling disagreement]
"[Example handling criticism in persona's voice]"

[CELEBRATION - Sharing wins]
"[Example celebrating success in persona's voice]"

[ADMISSION - Being wrong/learning]
"[Example admitting mistake in persona's voice]"
```

**Step 5.3: Platform Voice Adaptations**

```yaml
platform_voice_mods:
  instagram:
    caption_length: string
    hashtag_style: string
    story_voice: string (more casual?)

  tiktok:
    hook_style: string
    energy_level: string
    trend_participation: string

  youtube:
    intro_style: string
    explanation_depth: string
    outro_approach: string

  twitter:
    thread_style: string
    reply_approach: string
    quote_tweet_style: string

  linkedin:
    formality_shift: string
    storytelling_approach: string
    engagement_style: string
```

---

### Phase 6: Content Style Definition

**Duration:** 30-45 minutes per persona

**Step 6.1: Content Format Preferences**

```yaml
content_style:
  format_preferences:
    primary_formats: array (top 3)
    secondary_formats: array
    avoided_formats: array

  content_ratios:
    educational: percentage
    entertaining: percentage
    promotional: percentage
    personal: percentage
    engagement: percentage

  hook_patterns:
    primary_hook_type: string
    hook_examples: array (5+)

  cta_patterns:
    soft_cta_style: string
    hard_cta_style: string
    cta_frequency: string
```

**Step 6.2: Content Pillars Per Persona**

```yaml
persona_pillars:
  pillar_1:
    name: string
    description: string
    content_percentage: integer
    example_topics: array

  pillar_2:
    name: string
    description: string
    content_percentage: integer
    example_topics: array

  pillar_3:
    name: string
    description: string
    content_percentage: integer
    example_topics: array

  pillar_4:
    name: string
    description: string
    content_percentage: integer
    example_topics: array
```

**Step 6.3: Content Differentiation Matrix**

Ensure clear differentiation from other network personas:

| Content Element | Persona 1 | Persona 2 | Persona 3 |
|-----------------|-----------|-----------|-----------|
| Primary Format | Carousels | Short video | Long video |
| Posting Time | Morning | Afternoon | Evening |
| Energy Level | High | Moderate | Calm |
| Content Depth | Surface | Medium | Deep |
| Visual Style | Bright | Moody | Minimal |
| Hook Style | Question | Statement | Story |

---

### Phase 7: Persona Bible Assembly

**Duration:** 20-30 minutes per persona

Compile all elements into the definitive Persona Bible document.

---

## OUTPUT SPECIFICATION

### Primary Deliverable: Persona Bible

One complete Persona Bible per persona containing:

```
PERSONA BIBLE: [PERSONA NAME]
Version: 1.0
Created: [Date]
Last Updated: [Date]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1: IDENTITY OVERVIEW
├── Name & Handles
├── Archetype
├── Sub-Niche Ownership
├── One-Line Description
└── Positioning Statement

SECTION 2: DEMOGRAPHICS & BACKSTORY
├── Full Demographics
├── Origin Story (300 words)
├── Credentials
├── Daily Life Context
└── Character Quirks

SECTION 3: VISUAL IDENTITY
├── AI Generation Specs
├── Reference Images (10+)
├── Color Palette
├── Aesthetic Guidelines
├── Template Library Links
└── Visual Dos and Don'ts

SECTION 4: VOICE ARCHITECTURE
├── Voice DNA Summary
├── Vocabulary Guide
├── Syntax Guidelines
├── Emotional Expression Guide
├── Voice Examples (10+)
└── Platform Adaptations

SECTION 5: CONTENT STRATEGY
├── Content Pillars
├── Format Preferences
├── Posting Patterns
├── Hook Library
├── CTA Patterns
└── Differentiation Notes

SECTION 6: OPERATIONAL GUIDELINES
├── Response Protocols
├── Crisis Management
├── Brand Integration Rules
├── Collaboration Guidelines
└── Evolution Pathway

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Secondary Deliverables

1. **Network Overview Document**
   - All personas at a glance
   - Differentiation matrix
   - Relationship map

2. **Visual Asset Package**
   - AI generation prompts
   - Reference image library
   - Template files

3. **Voice Guide Quick Reference**
   - One-page voice summary per persona
   - Quick vocabulary reference

---

## OUTPUT SCHEMAS

### Persona Identity Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PersonaIdentity",
  "type": "object",
  "required": ["persona_id", "name", "archetype", "sub_niche", "demographics", "backstory", "personality"],
  "properties": {
    "persona_id": {
      "type": "string",
      "pattern": "^P[0-9]{3}$"
    },
    "name": {
      "type": "object",
      "required": ["first_name", "handles"],
      "properties": {
        "first_name": {"type": "string"},
        "last_name": {"type": "string"},
        "handles": {
          "type": "object",
          "properties": {
            "instagram": {"type": "string"},
            "tiktok": {"type": "string"},
            "youtube": {"type": "string"},
            "twitter": {"type": "string"},
            "linkedin": {"type": "string"}
          }
        },
        "nickname": {"type": "string"}
      }
    },
    "archetype": {
      "type": "string",
      "enum": ["educator", "curator", "storyteller", "provocateur", "entertainer", "connector", "analyst"]
    },
    "sub_niche": {
      "type": "object",
      "required": ["primary", "secondary"],
      "properties": {
        "primary": {"type": "string"},
        "secondary": {"type": "array", "items": {"type": "string"}},
        "off_limits": {"type": "array", "items": {"type": "string"}}
      }
    },
    "demographics": {
      "type": "object",
      "required": ["age", "gender", "location"],
      "properties": {
        "age": {"type": "integer", "minimum": 18, "maximum": 65},
        "gender": {"type": "string"},
        "location": {
          "type": "object",
          "properties": {
            "city": {"type": "string"},
            "country": {"type": "string"},
            "timezone": {"type": "string"}
          }
        },
        "nationality": {"type": "string"},
        "ethnicity": {"type": "string"}
      }
    },
    "backstory": {
      "type": "object",
      "required": ["origin_story", "defining_moment", "credentials", "mission"],
      "properties": {
        "origin_story": {"type": "string", "minLength": 200, "maxLength": 500},
        "defining_moment": {"type": "string"},
        "credentials": {"type": "array", "items": {"type": "string"}},
        "current_situation": {"type": "string"},
        "mission": {"type": "string"},
        "future_aspirations": {"type": "array", "items": {"type": "string"}}
      }
    },
    "personality": {
      "type": "object",
      "required": ["core_values", "quirks"],
      "properties": {
        "mbti_type": {"type": "string", "pattern": "^[EI][NS][TF][JP]$"},
        "enneagram": {"type": "string"},
        "core_values": {"type": "array", "items": {"type": "string"}, "minItems": 3, "maxItems": 5},
        "quirks": {"type": "array", "items": {"type": "string"}, "minItems": 2},
        "pet_peeves": {"type": "array", "items": {"type": "string"}},
        "guilty_pleasures": {"type": "array", "items": {"type": "string"}},
        "catchphrases": {"type": "array", "items": {"type": "string"}, "minItems": 2}
      }
    }
  }
}
```

### Visual Identity Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "VisualIdentity",
  "type": "object",
  "required": ["persona_id", "face_generation", "aesthetic_system"],
  "properties": {
    "persona_id": {"type": "string"},
    "face_generation": {
      "type": "object",
      "required": ["base_prompt", "physical_attributes"],
      "properties": {
        "tool": {"type": "string", "enum": ["midjourney", "dalle", "stable_diffusion", "custom"]},
        "base_prompt": {"type": "string"},
        "consistency_seeds": {"type": "array", "items": {"type": "string"}},
        "physical_attributes": {
          "type": "object",
          "properties": {
            "skin_tone": {"type": "string"},
            "hair_color": {"type": "string"},
            "hair_style": {"type": "string"},
            "eye_color": {"type": "string"},
            "facial_features": {"type": "string"},
            "age_appearance": {"type": "string"}
          }
        },
        "expression_library": {
          "type": "object",
          "additionalProperties": {"type": "string"}
        },
        "angle_library": {
          "type": "object",
          "additionalProperties": {"type": "string"}
        }
      }
    },
    "aesthetic_system": {
      "type": "object",
      "required": ["color_palette", "visual_style"],
      "properties": {
        "color_palette": {
          "type": "object",
          "properties": {
            "primary": {"type": "string", "pattern": "^#[0-9A-Fa-f]{6}$"},
            "secondary": {"type": "string", "pattern": "^#[0-9A-Fa-f]{6}$"},
            "accent": {"type": "string", "pattern": "^#[0-9A-Fa-f]{6}$"},
            "neutral": {"type": "string", "pattern": "^#[0-9A-Fa-f]{6}$"},
            "background": {"type": "string", "pattern": "^#[0-9A-Fa-f]{6}$"}
          }
        },
        "visual_style": {
          "type": "object",
          "properties": {
            "photography_style": {"type": "string"},
            "editing_preset": {"type": "string"},
            "filter_approach": {"type": "string"},
            "lighting_preference": {"type": "string"}
          }
        },
        "brand_elements": {
          "type": "object",
          "properties": {
            "font_primary": {"type": "string"},
            "font_secondary": {"type": "string"},
            "icon_style": {"type": "string"}
          }
        }
      }
    },
    "reference_images": {
      "type": "array",
      "items": {"type": "string"},
      "minItems": 10
    }
  }
}
```

### Voice Architecture Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "VoiceArchitecture",
  "type": "object",
  "required": ["persona_id", "voice_dna", "vocabulary", "syntax", "examples"],
  "properties": {
    "persona_id": {"type": "string"},
    "voice_dna": {
      "type": "object",
      "required": ["primary_trait", "anti_traits"],
      "properties": {
        "primary_trait": {"type": "string"},
        "secondary_trait": {"type": "string"},
        "tertiary_trait": {"type": "string"},
        "anti_traits": {"type": "array", "items": {"type": "string"}}
      }
    },
    "vocabulary": {
      "type": "object",
      "properties": {
        "signature_words": {"type": "array", "items": {"type": "string"}},
        "banned_words": {"type": "array", "items": {"type": "string"}},
        "industry_jargon_level": {"type": "string", "enum": ["none", "light", "moderate", "heavy"]},
        "slang_usage": {"type": "string", "enum": ["none", "light", "moderate", "heavy"]},
        "emoji_style": {
          "type": "object",
          "properties": {
            "frequency": {"type": "string", "enum": ["never", "rare", "occasional", "frequent"]},
            "signature_emojis": {"type": "array", "items": {"type": "string"}}
          }
        }
      }
    },
    "syntax": {
      "type": "object",
      "properties": {
        "average_sentence_length": {"type": "string", "enum": ["short", "medium", "long", "varied"]},
        "paragraph_length": {"type": "string", "enum": ["punchy", "moderate", "detailed"]},
        "question_frequency": {"type": "string", "enum": ["rare", "occasional", "frequent"]},
        "exclamation_usage": {"type": "string", "enum": ["never", "rare", "occasional", "frequent"]}
      }
    },
    "emotional_spectrum": {
      "type": "object",
      "properties": {
        "baseline_energy": {"type": "string", "enum": ["calm", "moderate", "high"]},
        "excitement_expression": {"type": "string"},
        "frustration_expression": {"type": "string"},
        "empathy_expression": {"type": "string"}
      }
    },
    "examples": {
      "type": "object",
      "required": ["hook", "educational", "personal", "response", "cta"],
      "additionalProperties": {"type": "string"}
    },
    "platform_adaptations": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "additionalProperties": {"type": "string"}
      }
    }
  }
}
```

---

## QUALITY GATES (Anti-Degradation Checks)

### Gate 1: Uniqueness Verification

```
UNIQUENESS CHECKLIST:

□ No two personas share same primary archetype AND sub-niche
□ Each persona has unique name (no similar sounding names)
□ Each persona has distinct visual appearance (different AI seeds)
□ Voice DNA primary trait unique across network
□ Content pillar overlap <15% between any two personas
□ Geographic locations distributed (no clustering)
□ Age distribution spans target demographic range
```

### Gate 2: Believability Audit

```
BELIEVABILITY CHECKLIST:

□ Backstory is internally consistent
□ Credentials are defensible (not overclaimed)
□ Demographics match niche expectations
□ Voice matches claimed background
□ Visual appearance matches stated demographics
□ Content style matches archetype
□ Personality traits create coherent character
```

### Gate 3: Operational Viability

```
OPERATIONAL CHECKLIST:

□ AI face generation produces consistent results
□ Voice guidelines are clear enough for content creation
□ Content pillars have sufficient depth for sustained posting
□ Character can be maintained across all planned platforms
□ No legal/compliance red flags in identity
□ Monetization pathways are viable for this persona
□ Persona can evolve without breaking character
```

### Gate 4: Network Cohesion

```
NETWORK CHECKLIST:

□ Personas could believably interact naturally
□ Cross-promotion opportunities exist
□ Network covers target audience segments
□ No competitive cannibalization between personas
□ Master brand relationship is clear and consistent
□ Combined reach covers all platform priorities
□ Monetization strategies don't conflict
```

---

## TEMPLATES

### Template 1: Persona Bible (Full Document)

```markdown
# PERSONA BIBLE: [PERSONA NAME]

**Version:** 1.0
**Created:** [Date]
**Last Updated:** [Date]
**Persona ID:** [P001]

---

## QUICK REFERENCE

| Attribute | Value |
|-----------|-------|
| **Name** | [Full Name] |
| **Handle** | @[handle] |
| **Archetype** | [Archetype] |
| **Sub-Niche** | [Primary sub-niche] |
| **Age** | [XX] |
| **Location** | [City, Country] |
| **Primary Platform** | [Platform] |
| **Voice Summary** | [One sentence] |

---

## 1. IDENTITY

### 1.1 Name & Handles

**Full Name:** [First Last]
**Pronunciation:** [If needed]
**Nickname:** [Community nickname]

| Platform | Handle | URL |
|----------|--------|-----|
| Instagram | @[handle] | instagram.com/[handle] |
| TikTok | @[handle] | tiktok.com/@[handle] |
| YouTube | [Channel Name] | youtube.com/@[handle] |
| Twitter/X | @[handle] | x.com/[handle] |
| LinkedIn | [Name] | linkedin.com/in/[handle] |
| Threads | @[handle] | threads.net/@[handle] |

### 1.2 One-Line Description

> "[One sentence that captures who this persona is and what they do]"

### 1.3 Positioning Statement

For [target audience] who [need/want], [Persona Name] is the [category] who [unique value proposition] because [reason to believe].

---

## 2. ARCHETYPE

### Primary Archetype: [ARCHETYPE NAME]

**Core Function:** [What this archetype does]

**Why This Archetype:**
[2-3 sentences explaining why this archetype was chosen for this persona]

**Archetype Expression:**
- **Content Focus:** [How archetype manifests in content]
- **Audience Relationship:** [How they relate to followers]
- **Monetization Fit:** [How archetype supports revenue]

### Secondary Archetype Influences

- [Secondary archetype element 1]
- [Secondary archetype element 2]

---

## 3. SUB-NICHE OWNERSHIP

### Primary Territory

**Sub-Niche:** [Primary sub-niche name]
**Ownership Level:** Exclusive
**Content Percentage:** [XX]%

**Topics Owned:**
- [Topic 1]
- [Topic 2]
- [Topic 3]
- [Topic 4]
- [Topic 5]

### Secondary Territory

**Adjacent Areas:** [List]
**Shared With:** [Other personas who touch this area]
**Content Percentage:** [XX]%

### Off-Limits

**Never Covers:**
- [Topic 1] — Owned by [Persona X]
- [Topic 2] — Owned by [Persona Y]
- [Topic 3] — Outside brand scope

---

## 4. DEMOGRAPHICS

| Attribute | Value |
|-----------|-------|
| **Age** | [XX] years old |
| **Gender** | [Gender] |
| **Location** | [City], [Country] |
| **Timezone** | [TZ] |
| **Nationality** | [Nationality] |
| **Ethnicity** | [For AI consistency] |
| **Language** | [Primary], [Secondary] |
| **Occupation** | [Current/Former role] |
| **Education** | [Background] |
| **Relationship Status** | [If relevant] |
| **Living Situation** | [Context] |

---

## 5. BACKSTORY

### Origin Story

[300-word origin story written in third person, covering:
- Where they came from
- How they discovered their niche
- The pivotal moment that changed everything
- What drives them now
- Their current mission]

### Defining Moment

> "[Quote or moment that encapsulates their journey]"

[2-3 sentences expanding on this moment]

### Credentials

| Credential Type | Credential | How It's Shown |
|-----------------|------------|----------------|
| Professional | [Credential] | [Mentioned in bio/content] |
| Experiential | [Credential] | [Demonstrated through stories] |
| Results-Based | [Credential] | [Shared as social proof] |

### Current Life Context

[1-2 paragraphs describing their daily life, routines, environment - adds texture and relatability]

### Mission Statement

> "[Their why - why they create content, what change they want to make]"

---

## 6. PERSONALITY

### Psychological Profile

| Framework | Type | Implications |
|-----------|------|--------------|
| MBTI | [Type] | [How it shows up] |
| Enneagram | [Type] | [How it shows up] |

### Core Values

1. **[Value 1]:** [How it manifests]
2. **[Value 2]:** [How it manifests]
3. **[Value 3]:** [How it manifests]
4. **[Value 4]:** [How it manifests]
5. **[Value 5]:** [How it manifests]

### Quirks & Personality Traits

**Endearing Quirks:**
- [Quirk 1 - specific and memorable]
- [Quirk 2 - specific and memorable]
- [Quirk 3 - specific and memorable]

**Pet Peeves:**
- [Pet peeve 1]
- [Pet peeve 2]
- [Pet peeve 3]

**Guilty Pleasures:**
- [Guilty pleasure 1]
- [Guilty pleasure 2]

### Catchphrases & Signature Expressions

| Phrase | When Used |
|--------|-----------|
| "[Catchphrase 1]" | [Context] |
| "[Catchphrase 2]" | [Context] |
| "[Catchphrase 3]" | [Context] |

---

## 7. VISUAL IDENTITY

### AI Face Generation

**Tool:** [Midjourney/DALL-E/etc.]

**Base Prompt:**
```
[Full prompt for generating consistent face]
```

**Consistency Seeds/References:**
- Seed: [If applicable]
- Reference images: [Link to folder]

### Physical Appearance

| Attribute | Description |
|-----------|-------------|
| Skin Tone | [Description + hex range] |
| Hair | [Color, style, length] |
| Eyes | [Color, shape] |
| Build | [Body type] |
| Distinctive Features | [What makes them recognizable] |
| Age Appearance | [How old they look] |

### Expression Library

| Expression | Prompt Modifier | Use Case |
|------------|-----------------|----------|
| Default/Neutral | [Modifier] | Profile pics, thumbnails |
| Excited/Happy | [Modifier] | Celebration content |
| Thoughtful | [Modifier] | Educational content |
| Serious | [Modifier] | Important topics |
| Laughing | [Modifier] | Entertainment content |

### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | [Name] | #[XXXXXX] | [Where used] |
| Secondary | [Name] | #[XXXXXX] | [Where used] |
| Accent | [Name] | #[XXXXXX] | [Where used] |
| Neutral | [Name] | #[XXXXXX] | [Where used] |
| Background | [Name] | #[XXXXXX] | [Where used] |

### Visual Style Guidelines

**Photography/Image Style:**
- Style: [Description]
- Lighting: [Preference]
- Composition: [Guidelines]

**Editing & Filters:**
- Preset/Filter: [Name or description]
- Saturation: [Level]
- Contrast: [Level]
- Warmth: [Level]

**Typography:**
- Primary Font: [Font name]
- Secondary Font: [Font name]
- Text Style: [Guidelines]

### Wardrobe Guidelines

**Signature Pieces:**
- [Item 1]
- [Item 2]
- [Item 3]

**Color Palette (Clothing):**
- Frequently wears: [Colors]
- Never wears: [Colors]

**Style Descriptor:** [e.g., "Casual professional," "Athleisure," "Minimalist chic"]

### Visual Dos and Don'ts

**DO:**
- [Guideline 1]
- [Guideline 2]
- [Guideline 3]

**DON'T:**
- [Guideline 1]
- [Guideline 2]
- [Guideline 3]

---

## 8. VOICE ARCHITECTURE

### Voice DNA

| Element | Value |
|---------|-------|
| **Primary Trait** | [One word] |
| **Secondary Trait** | [One word] |
| **Tertiary Trait** | [One word] |
| **Voice Summary** | [One sentence describing overall voice] |

**Anti-Traits (Never Sounds Like):**
- [Anti-trait 1]
- [Anti-trait 2]
- [Anti-trait 3]

### Vocabulary

**Signature Words (Uses Frequently):**
- [Word 1]
- [Word 2]
- [Word 3]
- [Word 4]
- [Word 5]

**Banned Words (Never Uses):**
- [Word 1]
- [Word 2]
- [Word 3]
- [Word 4]
- [Word 5]

**Jargon Level:** [None/Light/Moderate/Heavy]
**Slang Usage:** [None/Light/Moderate/Heavy]

**Emoji Usage:**
- Frequency: [Never/Rare/Occasional/Frequent]
- Signature Emojis: [List]

### Syntax & Structure

| Element | Style |
|---------|-------|
| Sentence Length | [Short/Medium/Long/Varied] |
| Paragraph Length | [Punchy/Moderate/Detailed] |
| Question Frequency | [Rare/Occasional/Frequent] |
| Exclamation Usage | [Never/Rare/Occasional/Frequent] |
| Opening Style | [How they typically start] |
| Closing Style | [How they typically end] |

### Emotional Expression

**Baseline Energy:** [Calm/Moderate/High]

| Emotion | How They Express It |
|---------|---------------------|
| Excitement | [Description + example] |
| Frustration | [Description + example] |
| Empathy | [Description + example] |
| Confidence | [Description + example] |
| Vulnerability | [Description + example] |

### Voice Examples

**HOOK (Attention Grabber):**
> "[Example in persona's exact voice]"

**EDUCATIONAL (Teaching):**
> "[Example in persona's exact voice]"

**PERSONAL (Story/Vulnerability):**
> "[Example in persona's exact voice]"

**COMMENT RESPONSE (Engaging):**
> "[Example in persona's exact voice]"

**CTA (Call to Action):**
> "[Example in persona's exact voice]"

**HOT TAKE (Opinion):**
> "[Example in persona's exact voice]"

**CELEBRATION (Sharing Win):**
> "[Example in persona's exact voice]"

**ADMISSION (Being Wrong):**
> "[Example in persona's exact voice]"

**EMPATHY (Supporting Someone):**
> "[Example in persona's exact voice]"

**HUMOR (Being Funny):**
> "[Example in persona's exact voice]"

### Platform Voice Adaptations

**Instagram:**
- Caption length: [Guidelines]
- Hashtag approach: [Guidelines]
- Story voice: [Any shift from feed]
- Reel energy: [Guidelines]

**TikTok:**
- Hook style: [Guidelines]
- Energy level: [Guidelines]
- Trend participation: [Guidelines]
- Comment style: [Guidelines]

**YouTube:**
- Intro approach: [Guidelines]
- Explanation depth: [Guidelines]
- Outro style: [Guidelines]
- Community tab: [Guidelines]

**Twitter/X:**
- Tweet style: [Guidelines]
- Thread approach: [Guidelines]
- Reply style: [Guidelines]
- Quote tweet style: [Guidelines]

**LinkedIn:**
- Formality shift: [Guidelines]
- Story approach: [Guidelines]
- Professional tone: [Guidelines]

---

## 9. CONTENT STRATEGY

### Content Pillars

| Pillar | % | Description | Example Topics |
|--------|---|-------------|----------------|
| [Pillar 1] | [XX]% | [Description] | [Topic 1], [Topic 2], [Topic 3] |
| [Pillar 2] | [XX]% | [Description] | [Topic 1], [Topic 2], [Topic 3] |
| [Pillar 3] | [XX]% | [Description] | [Topic 1], [Topic 2], [Topic 3] |
| [Pillar 4] | [XX]% | [Description] | [Topic 1], [Topic 2], [Topic 3] |

### Content Mix

| Type | Percentage | Examples |
|------|------------|----------|
| Educational | [XX]% | [Examples] |
| Entertaining | [XX]% | [Examples] |
| Promotional | [XX]% | [Examples] |
| Personal | [XX]% | [Examples] |
| Engagement | [XX]% | [Examples] |

### Format Preferences

**Primary Formats (70% of content):**
1. [Format 1]
2. [Format 2]
3. [Format 3]

**Secondary Formats (25% of content):**
- [Format 1]
- [Format 2]

**Avoided Formats:**
- [Format 1] — [Reason]
- [Format 2] — [Reason]

### Hook Library

| Hook Type | Examples |
|-----------|----------|
| Question | "[Example 1]" / "[Example 2]" |
| Statement | "[Example 1]" / "[Example 2]" |
| Controversy | "[Example 1]" / "[Example 2]" |
| Story | "[Example 1]" / "[Example 2]" |
| Pattern Interrupt | "[Example 1]" / "[Example 2]" |

### CTA Patterns

**Soft CTAs:**
- "[Example 1]"
- "[Example 2]"
- "[Example 3]"

**Hard CTAs:**
- "[Example 1]"
- "[Example 2]"
- "[Example 3]"

**CTA Frequency:** [Guidelines]

---

## 10. OPERATIONAL GUIDELINES

### Response Protocols

**Comment Response Rate:** [Target %]
**Response Time Window:** [Timeframe]

**Response Priority:**
1. [Type 1 - highest priority]
2. [Type 2]
3. [Type 3]
4. [Type 4 - lowest priority]

**DM Policy:**
- [When to respond]
- [When to ignore]
- [When to escalate]

### Crisis Management

**Scenario: Negative Comment/Criticism**
- Response approach: [Guidelines]
- Example response: "[Template]"

**Scenario: Being Called Out**
- Response approach: [Guidelines]
- Example response: "[Template]"

**Scenario: Controversial Topic**
- Response approach: [Guidelines]
- Boundary: [What's off-limits]

### Brand Integration Rules

**Overt Mention:** [When/How to mention master brand]
**Subtle Reference:** [Guidelines]
**Product Promotion:** [Rules and frequency]
**Affiliate Disclosure:** [Required language]

### Collaboration Guidelines

**Collaborate With:**
- [Persona X] — [How and why]
- [Persona Y] — [How and why]
- External creators in [niche] — [Guidelines]

**Collaboration Don'ts:**
- [What to avoid]
- [What to avoid]

### Evolution Pathway

**3-Month Evolution:**
- [What might change]
- [What stays constant]

**6-Month Evolution:**
- [What might change]
- [What stays constant]

**12-Month Evolution:**
- [What might change]
- [What stays constant]

---

## APPENDICES

### A. Reference Image Library
[Links to canonical reference images]

### B. Content Templates
[Links to platform-specific templates]

### C. Voice Training Examples
[Additional voice examples for AI training]

### D. Competitor Differentiation Notes
[How this persona differs from similar creators]

---

*This Persona Bible is a living document. Update as the persona evolves.*
```

### Template 2: Network Overview (Quick Reference)

```markdown
# INFLUENCER NETWORK OVERVIEW

**Network Name:** [Name]
**Total Personas:** [#]
**Master Brand:** [Brand Name]
**Brand Relationship:** [Overt/Covert/Hybrid]

---

## PERSONA ROSTER

| ID | Name | Archetype | Sub-Niche | Platforms | Status |
|----|------|-----------|-----------|-----------|--------|
| P001 | [Name] | [Type] | [Niche] | IG, TT | Active |
| P002 | [Name] | [Type] | [Niche] | YT, TW | Active |
| P003 | [Name] | [Type] | [Niche] | LI, TH | Active |

---

## DIFFERENTIATION MATRIX

| Element | P001 | P002 | P003 |
|---------|------|------|------|
| Archetype | [Type] | [Type] | [Type] |
| Age | [XX] | [XX] | [XX] |
| Energy | [Level] | [Level] | [Level] |
| Visual | [Style] | [Style] | [Style] |
| Depth | [Level] | [Level] | [Level] |
| Hook Style | [Type] | [Type] | [Type] |

---

## SUB-NICHE OWNERSHIP MAP

```
PRIMARY NICHE: [Topic]
│
├── [Sub-niche A] ──────────── P001 (Exclusive)
│
├── [Sub-niche B] ──────────── P002 (Exclusive)
│
├── [Sub-niche C] ──────────── P003 (Exclusive)
│
├── [Sub-niche D] ──────────── P001 + P003 (Shared)
│
└── [Sub-niche E] ──────────── P002 + P003 (Shared)
```

---

## NETWORK RELATIONSHIPS

```
    P001
   /    \
  /      \
P002 ── P003
```

**P001 ↔ P002:** [Relationship type]
**P001 ↔ P003:** [Relationship type]
**P002 ↔ P003:** [Relationship type]

---

## VOICE SPECTRUM

| Persona | Energy | Formality | Humor | Depth |
|---------|--------|-----------|-------|-------|
| P001 | High | Casual | Frequent | Surface |
| P002 | Low | Professional | Rare | Deep |
| P003 | Medium | Friendly | Occasional | Medium |

---

## PLATFORM DISTRIBUTION

| Platform | Personas | Total Reach Target |
|----------|----------|-------------------|
| Instagram | P001, P002, P003 | [XXX]K |
| TikTok | P001, P003 | [XXX]K |
| YouTube | P002 | [XXX]K |
| Twitter/X | P001, P002 | [XXX]K |
| LinkedIn | P002, P003 | [XXX]K |

---

## ARCHETYPE DISTRIBUTION

- Educator: [#] personas
- Curator: [#] personas
- Storyteller: [#] personas
- Provocateur: [#] personas
- Entertainer: [#] personas
- Connector: [#] personas
- Analyst: [#] personas

---

*Quick reference for network coordination. See individual Persona Bibles for full details.*
```

---

## EXAMPLES

### Example 1: Complete Persona - "Maya Chen" (Educator Archetype)

```yaml
persona_identity:
  persona_id: "P001"

  name:
    first_name: "Maya"
    last_name: "Chen"
    handles:
      instagram: "mayachenwrites"
      tiktok: "mayachenwrites"
      youtube: "Maya Chen"
      twitter: "mayachenwrites"
    nickname: "May"

  archetype: "educator"

  sub_niche:
    primary: "AI writing tools for content creators"
    secondary: ["prompt engineering basics", "AI productivity hacks"]
    off_limits: ["AI art generation", "coding/technical AI", "AI ethics debates"]

  demographics:
    age: 29
    gender: "Female"
    location:
      city: "Austin"
      country: "USA"
      timezone: "CST"
    nationality: "American"
    ethnicity: "Asian-American (Chinese heritage)"

  backstory:
    origin_story: "Maya spent five years as a content strategist at a tech startup, churning out blog posts, emails, and social content until she burned out. When ChatGPT launched, she skeptically tested it for a week and realized it could have saved her thousands of hours. She became obsessed with mastering AI writing tools, documenting everything she learned. Friends started asking for help, then friends of friends. She started posting tutorials on TikTok 'just to have something to send people' and hit 10K followers in three months. Now she's on a mission to help every overwhelmed content creator discover that AI isn't here to replace them—it's here to give them their time back."

    defining_moment: "The night she realized she'd spent 6 hours writing one email sequence that AI helped her draft in 20 minutes—and it was actually better."

    credentials:
      - "5 years as content strategist at tech startups"
      - "Tested 50+ AI writing tools extensively"
      - "Helped 2,000+ creators implement AI workflows"

    current_situation: "Works from her home office in Austin, creates content in the mornings, tests new AI tools in the afternoons. Lives with her partner and a very demanding cat named Pixel."

    mission: "To help content creators reclaim their time and creativity by mastering AI tools—without losing their authentic voice."

    future_aspirations:
      - "Launch a comprehensive AI writing course"
      - "Build a community of AI-savvy creators"
      - "Write a book on human-AI creative collaboration"

  personality:
    mbti_type: "ENFJ"
    enneagram: "3w2"
    core_values:
      - "Efficiency with purpose"
      - "Authentic communication"
      - "Continuous learning"
      - "Generous knowledge sharing"
    quirks:
      - "Names all her AI prompt templates after 90s sitcom characters"
      - "Has a 'tool graveyard' folder of AI tools that disappointed her"
      - "Drinks obscene amounts of oat milk lattes"
    pet_peeves:
      - "AI tools with confusing pricing"
      - "'AI will replace writers' fear-mongering"
      - "Tutorials that skip the 'why'"
    guilty_pleasures:
      - "Reality TV (specifically dating shows)"
      - "Spending too much money on planners she doesn't use"
    catchphrases:
      - "Work smarter, not harder—but actually this time"
      - "Let me show you the shortcut"
      - "Your AI is only as good as your prompt"

voice_architecture:
  voice_dna:
    primary_trait: "Clear"
    secondary_trait: "Encouraging"
    tertiary_trait: "Practical"
    anti_traits: ["Condescending", "Overly technical", "Preachy", "Vague"]

  vocabulary:
    signature_words: ["shortcut", "workflow", "game-changer", "here's the thing", "real talk"]
    banned_words: ["synergy", "leverage (as verb)", "guru", "hack your life", "crushing it"]
    industry_jargon_level: "light"
    slang_usage: "moderate"
    emoji_style:
      frequency: "occasional"
      signature_emojis: ["✨", "💡", "⚡", "🎯"]

  syntax:
    average_sentence_length: "short"
    paragraph_length: "punchy"
    question_frequency: "frequent"
    exclamation_usage: "occasional"

  emotional_spectrum:
    baseline_energy: "moderate"
    excitement_expression: "Okay this is actually incredible—"
    frustration_expression: "Real talk: this drives me crazy..."
    empathy_expression: "I get it. I've been there."

  examples:
    hook: "Stop writing your captions from scratch. Here's the 3-step AI workflow I use instead:"
    educational: "Here's the thing about ChatGPT—it's not about getting the perfect output on the first try. It's about learning to have a conversation with it. Start broad, then narrow down. Ask it to improve its own answer. That's where the magic happens."
    personal: "I used to spend my Sundays batch-writing content for the week. By evening, I was exhausted and the content was... fine. Just fine. Now? Same amount of content, 2 hours, and I actually have energy left for my life."
    response: "This is such a good question! The short answer is yes, but the key is using it as a starting point, not a final draft. Want me to do a deeper tutorial on this?"
    cta: "Save this for your next content day. And if you want the full prompt template, it's linked in my bio ✨"
```

### Example 2: Differentiation Between Three Personas

```
NETWORK: AI Creator Tools (3 Personas)

PERSONA 1: Maya Chen (Educator)
├── Sub-Niche: AI Writing Tools
├── Audience: Content creators overwhelmed by volume
├── Energy: Moderate, encouraging
├── Depth: Medium (accessible tutorials)
├── Visual: Bright, clean, organized
├── Content: Step-by-step tutorials, tool reviews, workflow breakdowns

PERSONA 2: Jordan Rivers (Provocateur)
├── Sub-Niche: AI Strategy & Big Picture
├── Audience: Creators questioning if/how to use AI
├── Energy: High, passionate
├── Depth: Deep (think pieces, debates)
├── Visual: Bold, high contrast, text-heavy
├── Content: Hot takes, industry analysis, myth-busting

PERSONA 3: Sam Torres (Curator)
├── Sub-Niche: AI Tool Discovery & Deals
├── Audience: Tool-curious creators who want recommendations
├── Energy: Calm, reliable
├── Depth: Surface (quick reviews, comparisons)
├── Visual: Organized, comparison-focused, clean
├── Content: Tool roundups, deal alerts, quick reviews

DIFFERENTIATION CHECK:
✓ No archetype overlap (Educator vs Provocateur vs Curator)
✓ Different energy levels (Moderate vs High vs Calm)
✓ Different content depths (Medium vs Deep vs Surface)
✓ Complementary audiences (Overwhelmed vs Questioning vs Curious)
✓ Distinct visual styles (Bright vs Bold vs Organized)
✓ Clear content separation (How-to vs Why vs What)
```

### Example 3: Voice Contrast

```
SAME TOPIC: "Why AI won't replace content creators"

MAYA (Educator):
"Here's the thing about AI replacing writers—it's not going to happen, but not for the reason you think. AI is incredible at generating volume. But content that connects? That requires something AI doesn't have: your story, your perspective, your weird specific experiences that make readers think 'omg same.' AI is your assistant, not your replacement. Let me show you how to use it that way."

JORDAN (Provocateur):
"Hot take: If you're worried AI will replace you, it probably should. Not because AI is better—but because you're not doing work that matters. Anyone can generate generic content now. That's the baseline. The question is: are you creating something that could ONLY come from you? If not, that's the real problem. AI just exposed it."

SAM (Curator):
"Seeing a lot of 'AI will replace creators' panic. Here's what I've found after testing 50+ AI writing tools: Every single one still needs heavy human editing to be usable. They're time-savers, not replacements. Quick list of what AI does well vs what still needs you: [list]. Bottom line: Learn to use these tools and you're MORE valuable, not less."
```

---

## CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | [Date] | Initial release |

---

## RELATED SKILLS

- **S22-account-strategy:** Uses Persona Bibles as input for account-level planning
- **S23-network-coordination:** Uses persona relationships for cross-promotion
- **S24-monetization-engine:** Uses persona archetypes for revenue strategy

---

*S21-persona-architect: Designing AI influencer identities that captivate and convert.*
