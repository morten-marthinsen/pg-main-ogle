---
name: organic-visual-direction
description: >-
  Thumbnail, visual, and creative direction for organic content assets.
  Use when producing visual direction briefs for thumbnails, video frames,
  carousel slide designs, and creative assets. The visual layer is the first
  thing seen — it determines whether content gets consumed or skipped.
  Produces visual direction briefs with color palettes, composition guides,
  typography specs, and design references for execution by designers or AI
  image tools. Trigger when users mention thumbnails, visual design, creative
  direction, image specs, or art direction for organic content. Requires
  the Campaign Brief File (CBF) from S07.
---

# S12: VISUAL DIRECTION
## Thumbnail, Visual, and Creative Direction
## Gate: G07 (Requires S07 CBF) | Output: Production Asset

---

## PURPOSE

This skill produces visual direction for thumbnails, video frames, carousel slides, and creative assets. The visual layer is the first thing seen — it determines whether content gets consumed.

**Output:** Visual direction briefs for design execution
**Prerequisite:** Campaign Brief File (CBF) required

## ANTI-DEGRADATION

- Read `S12-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `skills/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## REQUIRED CONTEXT

### Load Before Execution
- `CLAUDE-CORE.md` — Inviolable laws
- Campaign Brief File (CBF) from S07
- Brand visual guidelines (if available)

### Specimens to Load
- `specimens/by-platform/youtube/thumbnails-high-ctr/`
- `specimens/by-platform/instagram/reels-viral/`
- Platform-specific visual specimens

---

## INPUT REQUIREMENTS

```yaml
visual_brief:
  asset_type: [Thumbnail/Reel cover/Carousel slides/Story/Banner]
  platform: [YouTube/Instagram/TikTok/LinkedIn/X]
  content_title: [What content this visual supports]
  content_type: [Video/carousel/static post]

  content_summary: |
    [Brief description of the content]

  emotion_to_convey: [Primary emotional response desired]
  action_desired: [Click/swipe/stop scroll]

  brand_elements:
    colors: [Primary palette]
    fonts: [Typography guidelines]
    style: [Minimalist/bold/playful/professional]
    logo_usage: [When/how to include]

  constraints:
    dimensions: [Aspect ratio]
    text_safe_zone: [If applicable]
    platform_restrictions: [Any specific rules]
```

---

## PROCESS

### Phase 1: Asset Type Analysis

```yaml
asset_types:
  youtube_thumbnail:
    dimensions: "1280x720 (16:9)"
    primary_goal: "Maximize click-through rate"
    view_context: "Alongside 10+ competing thumbnails"
    key_elements:
      - Face with clear emotion (usually)
      - 3-4 words of text maximum
      - High contrast
      - Simple, clean composition
      - Story or curiosity element

  instagram_reel_cover:
    dimensions: "1080x1920 (9:16)"
    primary_goal: "Encourage tap/watch"
    view_context: "Grid or Reels tab"
    key_elements:
      - Works at small size
      - Text overlay if not auto-generated
      - Intriguing freeze frame
      - Brand consistent

  instagram_carousel_slide:
    dimensions: "1080x1080 (1:1) or 1080x1350 (4:5)"
    primary_goal: "Encourage swipe, save"
    view_context: "Feed, carousel viewer"
    key_elements:
      - Consistent visual system
      - Scannable text
      - Clear hierarchy
      - Visual variety across slides

  linkedin_post_image:
    dimensions: "1200x628 or 1080x1080"
    primary_goal: "Stop scroll, support text"
    view_context: "LinkedIn feed"
    key_elements:
      - Professional aesthetic
      - Clean, minimalist often works
      - Quote or key stat
      - Subtle branding

  tiktok_video_cover:
    dimensions: "1080x1920 (9:16)"
    primary_goal: "Entice from profile view"
    view_context: "Creator profile grid"
    key_elements:
      - Works in small grid view
      - Text overlay for context
      - Visually distinct from other videos
```

### Phase 2: Thumbnail Psychology

```yaml
thumbnail_psychology:
  faces:
    why_they_work: |
      Humans are wired to look at faces. Faces with strong emotion
      capture attention faster than any other visual element.

    emotion_guidelines:
      curiosity: "Eyebrow raised, slight smile, looking at something"
      shock: "Wide eyes, open mouth, hands near face"
      excitement: "Big smile, energetic pose, movement"
      seriousness: "Direct eye contact, neutral expression, authority"
      concern: "Furrowed brow, serious expression"

    face_techniques:
      - Face should take up 30-50% of thumbnail
      - Eye contact with viewer increases connection
      - Asymmetrical faces more engaging
      - Lighting on face is critical

  text_on_thumbnails:
    principles:
      - 3-4 words maximum
      - Must be readable at small size
      - Complement title, don't repeat
      - Create curiosity gap
      - High contrast with background

    text_techniques:
      - Outline or shadow for readability
      - Sans-serif fonts for clarity
      - Title case or ALL CAPS
      - Position away from face

  composition:
    principles:
      - Rule of thirds (face in one third, text in another)
      - Clear focal point
      - Negative space is valuable
      - Visual hierarchy is clear
      - Color contrast draws eye

    composition_patterns:
      split_screen: "Face left, result/object right"
      central_face: "Face center, text above or below"
      before_after: "Two states shown"
      reaction: "Face reacting to something visible"
      mystery: "Something hidden or partially revealed"
```

### Phase 3: Color Strategy

```yaml
color_psychology:
  platform_trends:
    youtube:
      high_ctr_colors: ["Red", "Yellow", "Blue", "Orange"]
      reason: "High contrast, energetic, stands out"

    instagram:
      high_engagement: ["Warm tones", "Muted aesthetics", "Consistent palette"]
      reason: "Brand cohesion, lifestyle appeal"

    linkedin:
      professional: ["Blue", "Navy", "Green", "White backgrounds"]
      reason: "Trust, professionalism"

  color_principles:
    contrast:
      - Text must contrast with background
      - Key elements should pop
      - Don't compete with face for attention

    consistency:
      - Brand colors for recognition
      - Signature color across content
      - Template-based approach for series

    emotion:
      red: "Energy, urgency, passion"
      blue: "Trust, calm, professionalism"
      yellow: "Optimism, attention, warning"
      green: "Growth, money, health"
      orange: "Creativity, enthusiasm"
      purple: "Luxury, creativity, wisdom"
      black: "Sophistication, power"
      white: "Clean, simple, modern"
```

### Phase 4: Visual Direction Brief

```yaml
visual_direction_template:
  concept:
    one_liner: "[Single sentence describing the visual]"
    reference_mood: "[Adjectives: bold, clean, energetic, etc.]"
    emotional_goal: "[What viewer should feel]"

  composition:
    layout: "[Description of element placement]"
    focal_point: "[What draws the eye first]"
    secondary_elements: "[Supporting visual elements]"
    negative_space: "[How space is used]"

  face_direction:
    subject: "[Who is in the image]"
    expression: "[Specific emotion/expression]"
    positioning: "[Where in frame, what angle]"
    eye_line: "[Where they're looking]"
    action: "[What they're doing, if anything]"

  text_elements:
    headline: "[Exact text]"
    font_style: "[Description: bold sans-serif, etc.]"
    color: "[Text color]"
    position: "[Where in composition]"
    effects: "[Shadow, outline, etc.]"

  color_palette:
    primary: "[Main color]"
    secondary: "[Accent color]"
    background: "[Background treatment]"
    text: "[Text color]"

  supporting_elements:
    graphics: "[Icons, shapes, etc.]"
    photos_objects: "[Other visual elements]"
    effects: "[Filters, overlays, etc.]"

  brand_elements:
    logo: "[If/where to include]"
    watermark: "[If applicable]"
    consistent_elements: "[Series-specific items]"

  technical_specs:
    dimensions: "[Exact pixel dimensions]"
    file_format: "[PNG/JPG/etc]"
    resolution: "[DPI if print, 72 for digital]"
```

### Phase 5: Platform-Specific Direction

```yaml
platform_direction:
  youtube_thumbnail:
    must_have:
      - Clear face with emotion
      - 3-4 words max
      - High contrast
      - Works at 160x90 (search result size)

    avoid:
      - Cluttered composition
      - Unreadable text
      - Low contrast
      - Faces too small
      - Misleading imagery

    direction_example:
      concept: "Creator showing surprise at results on screen"
      face: "Wide eyes, slight open mouth, looking at screen element"
      text: "'$47K in 30 Days' in bold yellow"
      composition: "Face left third, results visual right, text bottom"

  instagram_carousel:
    must_have:
      - Consistent visual system across slides
      - Clear hierarchy on each slide
      - Scannable text (8 words or less per block)
      - Cover that works in grid

    avoid:
      - Inconsistent styling between slides
      - Too much text per slide
      - Visually boring/samey slides
      - Cover that doesn't hook

    direction_example:
      cover: "Bold headline, minimal graphics, brand colors"
      body_slides: "Headline + 2-3 lines supporting text + icon"
      final: "Clear CTA, profile handle"

  linkedin_visual:
    must_have:
      - Professional aesthetic
      - Clean, readable design
      - Single clear message
      - Works with text post

    avoid:
      - Overly promotional
      - Cluttered design
      - Unprofessional imagery
      - Stock photo cliches

    direction_example:
      concept: "Quote card with key insight"
      text: "Large quote text, attribution below"
      style: "Minimal, white background, brand accent color"
```

### Phase 6: Series Consistency

```yaml
series_visual_system:
  purpose: |
    Recurring content should have visual consistency that builds
    brand recognition and series anticipation.

  system_elements:
    template_structure:
      - Consistent layout grid
      - Same position for key elements
      - Repeating graphical elements

    color_system:
      - Primary brand color always present
      - Accent color for emphasis
      - Consistent text colors

    typography:
      - Same fonts across series
      - Consistent text sizes
      - Same treatment (outlines, shadows)

    signature_elements:
      - Series badge/logo
      - Episode numbering
      - Creator visual presence

  template_checklist:
    - [ ] Template allows for content variation
    - [ ] Brand instantly recognizable
    - [ ] Works across different topics
    - [ ] Maintains quality at speed
```

---

## OUTPUT FORMAT

```yaml
visual_direction_output:
  asset_type:
  platform:
  content_title:

  creative_direction:
    concept: |
    mood: |
    emotional_goal: |

  composition:
    layout: |
    focal_point: |
    secondary_elements: |

  face_direction:
    subject: |
    expression: |
    positioning: |
    action: |

  text_elements:
    headlines: []
    font_direction: |
    color: |
    position: |

  color_palette:
    primary: |
    secondary: |
    background: |
    text: |

  supporting_elements:
    graphics: |
    photos: |
    effects: |

  brand_elements:
    logo_placement: |
    watermark: |

  technical_specs:
    dimensions: |
    format: |

  reference_notes: |
    [Any additional direction for designer]

  similar_references:
    - [URLs or descriptions of reference visuals]
```

---

## VALIDATION REQUIREMENTS

Visual direction must pass:
- [ ] Clear concept that can be executed
- [ ] Platform-appropriate specifications
- [ ] Works at intended viewing size
- [ ] Brand consistent
- [ ] Emotion and goal clearly stated
- [ ] All necessary elements specified
- [ ] Technical specs accurate

---

*The visual is the first word spoken. Make it say something worth hearing.*
