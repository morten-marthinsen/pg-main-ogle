---
name: carousel-design
description: >-
  High-save carousel architecture for Instagram and LinkedIn organic content.
  Use when producing multi-slide carousel posts optimized for saves, shares,
  and algorithmic distribution. Carousels are the highest-save format on
  Instagram and LinkedIn — they deliver value in a digestible, screenshot-worthy
  format. Produces complete carousel structures with copy for each slide,
  visual direction, and narrative flow. All carousel content runs through
  the Arena. Trigger when users mention carousels, slide posts, swipe posts,
  educational slides, or Instagram/LinkedIn multi-image content. Requires
  the Campaign Brief File (CBF) from S07.
---

# S10: CAROUSEL DESIGN
## High-Save Carousel Architecture
## Gate: G07 (Requires S07 CBF) | Output: Production Asset

---

## PURPOSE

This skill produces carousel content optimized for saves, shares, and algorithmic distribution. Carousels are the highest-save format on Instagram and LinkedIn — they deliver value in a digestible, screenshot-worthy format.

**Output:** Complete carousel structure with copy for each slide
**Prerequisite:** Campaign Brief File (CBF) required

---

## REQUIRED CONTEXT

### Load Before Execution
- `CLAUDE-CORE.md` — Inviolable laws
- `CLAUDE-ARENA.md` — Production content runs through Arena
- Campaign Brief File (CBF) from S07

### Teachings to Reference
- `teachings/virality/heath-succes-framework.yaml` (SUCCESs)
- `teachings/virality/berger-stepps-framework.yaml` (Practical Value)
- `teachings/content-strategy/miller-storybrand.yaml`

### Specimens to Load
- High-performing carousel specimens from target platform
- Save-rate optimized carousel examples

---

## INPUT REQUIREMENTS

```yaml
carousel_brief:
  topic: [What this carousel teaches/shares]
  platform: [Instagram/LinkedIn/other]
  content_function: [Awareness/Engagement/Conversion/Community]
  pillar: [From CAF]

  target_outcome:
    primary: [Save/Share/Click/Engage]
    secondary: [Additional goals]

  key_points:
    - point_1: [Core message 1]
    - point_2: [Core message 2]
    - point_3: [Core message 3]
    # ... up to 10

  cta_goal: [What action after consuming]
  tone_override: [If different from CBF default]

  constraints:
    slide_count: [5-10 slides]
    visual_style: [From brand guidelines]
```

---

## PROCESS

### Phase 1: Carousel Type Selection

Choose the optimal carousel structure:

```yaml
carousel_types:
  listicle:
    description: "Numbered tips, tactics, or steps"
    structure: "Cover → Item 1 → Item 2 → ... → CTA"
    best_for: ["How-to", "Tips", "Mistakes to avoid"]
    optimal_slides: 7-10
    save_driver: "Comprehensive value"
    example_hook: "7 hooks that went viral in 2024"

  story_carousel:
    description: "Narrative arc across slides"
    structure: "Hook → Setup → Conflict → Resolution → Lesson → CTA"
    best_for: ["Case studies", "Transformations", "Personal stories"]
    optimal_slides: 6-8
    save_driver: "Emotional connection"
    example_hook: "How I went from $0 to $1M (the real story)"

  framework_carousel:
    description: "Teaching a specific methodology"
    structure: "Cover → Context → Framework steps → Application → CTA"
    best_for: ["Frameworks", "Models", "Systems"]
    optimal_slides: 5-7
    save_driver: "Intellectual value"
    example_hook: "The 3-step system behind every viral video"

  comparison_carousel:
    description: "X vs Y or Before/After"
    structure: "Cover → Old way → New way → Why → How → CTA"
    best_for: ["Contrarian takes", "Myth busting", "Transformations"]
    optimal_slides: 5-8
    save_driver: "Clarity and contrast"
    example_hook: "What they teach vs. what actually works"

  quote_carousel:
    description: "Curated insights or quotes"
    structure: "Cover → Quote 1 → Quote 2 → ... → Summary → CTA"
    best_for: ["Inspiration", "Thought leadership", "Curated wisdom"]
    optimal_slides: 5-7
    save_driver: "Screenshot value"
    example_hook: "5 mindset shifts that changed everything"

  case_study_carousel:
    description: "Breakdown of specific example"
    structure: "Cover → Context → Analysis slides → Lessons → CTA"
    best_for: ["Proof", "Education", "Authority building"]
    optimal_slides: 7-10
    save_driver: "Credibility and specificity"
    example_hook: "How [Brand] grew 500% in 90 days"
```

### Phase 2: Cover Slide (Slide 1)

The cover slide must stop the scroll:

```yaml
cover_slide:
  elements:
    hook_headline:
      purpose: "Stop scroll, create curiosity"
      requirements:
        - Clear value promise
        - Number or specificity when possible
        - Works in thumbnail size
        - Creates open loop

    subheadline:
      purpose: "Add context or credibility"
      requirements:
        - Optional but often helpful
        - Brief supporting info
        - Authority signal if relevant

    visual:
      purpose: "Reinforce message"
      requirements:
        - On-brand
        - Clear at small size
        - Supports headline

  cover_templates:
    listicle: "[Number] [things] to [outcome]"
    story: "How I [transformation] (and you can too)"
    framework: "The [adjective] [framework] for [outcome]"
    comparison: "[Common approach] vs [Better approach]"
    quote: "[Number] [insights/lessons] that [result]"
    case_study: "How [subject] [achieved result]"

  cover_checklist:
    - [ ] Headline is 8 words or less
    - [ ] Works at thumbnail size
    - [ ] Creates curiosity or desire
    - [ ] Matches brand visual style
    - [ ] Swipe indicator present
```

### Phase 3: Content Slides (Slides 2-N)

Structure the interior slides:

```yaml
content_slide_structure:
  elements:
    headline:
      purpose: "Main point of this slide"
      format: "Bold, short, scannable"
      max_words: 8

    body:
      purpose: "Explanation or detail"
      format: "Brief, digestible"
      max_words: 30-40

    visual_elements:
      - Icons or illustrations
      - Examples or screenshots
      - Graphs or data
      - Quote callouts

  slide_principles:
    - One idea per slide
    - Scannable in 2-3 seconds
    - Value complete without caption
    - Consistent visual formatting
    - Progress indicator if helpful

  slide_formats:
    tip_slide:
      headline: "Tip #[N]: [Core advice]"
      body: "[Brief explanation of why/how]"

    step_slide:
      headline: "Step [N]: [Action]"
      body: "[Brief explanation]"

    comparison_slide:
      layout: "Left vs Right"
      left: "[Old/Wrong way]"
      right: "[New/Right way]"

    quote_slide:
      quote: "[Powerful statement]"
      attribution: "— [Source/yourself]"

    stat_slide:
      stat: "[Number + context]"
      insight: "[What it means]"

    story_slide:
      headline: "[Moment/chapter]"
      body: "[What happened]"
```

### Phase 4: Flow and Pacing

Design the slide-to-slide experience:

```yaml
flow_architecture:
  attention_curve:
    slide_1: "Hook (stop scroll)"
    slide_2: "Context (set up value)"
    slides_3_7: "Value delivery (core content)"
    slide_8_9: "Summary/synthesis"
    final_slide: "CTA + loop close"

  retention_tactics:
    pattern_variation:
      - Vary slide layouts every 2-3 slides
      - Alternate text-heavy and visual
      - Use contrast to maintain interest

    open_loops:
      - Tease upcoming slides
      - "But that's not even the best part..."
      - Number counting creates expectation

    value_density:
      - Front-load value (don't save best for last)
      - Each slide should feel complete
      - Reward continued swiping

  pacing_check:
    - [ ] No two consecutive slides look the same
    - [ ] Energy builds or varies appropriately
    - [ ] No slide feels like filler
    - [ ] Reader motivation maintained throughout
```

### Phase 5: Final Slide (CTA)

Design the conversion slide:

```yaml
final_slide:
  purpose: "Convert attention into action"

  elements:
    summary:
      optional: true
      content: "Quick recap or key takeaway"

    cta:
      primary: "[Main action desired]"
      format: "Clear, specific, actionable"

    social_proof:
      optional: true
      content: "Brief credibility element"

  cta_templates:
    soft_cta:
      - "Save this for later"
      - "Follow @[handle] for more"
      - "Share with someone who needs this"

    medium_cta:
      - "Comment '[word]' for the full guide"
      - "Link in bio for free [resource]"
      - "DM me '[keyword]' for [benefit]"

    hard_cta:
      - "Book your call at [link in bio]"
      - "Enroll now — link in bio"
      - "[Specific offer with urgency]"

  final_slide_checklist:
    - [ ] CTA matches content function
    - [ ] Action is crystal clear
    - [ ] No confusion about next step
    - [ ] Value delivery justified the ask
```

### Phase 6: Caption Integration

Write carousel-specific caption:

```yaml
carousel_caption:
  structure:
    hook: "Reinforce carousel value (don't repeat cover)"
    context: "Why this matters / why now"
    summary: "Optional key points"
    cta: "Matches final slide"

  caption_templates:
    value_focused: |
      Save this before the algorithm buries it.

      I spent [time/money] learning these [lessons/tactics].

      Swipe through and implement #[N] today.

      Save → Apply → Watch what happens.

    story_focused: |
      This carousel tells the story of [transformation].

      The [number] on slide [N] changed everything.

      Swipe if you're ready for [outcome].

    engagement_focused: |
      Swipe through and tell me which one hit hardest.

      I bet it's #[N]. Am I right?

      Comment your favorite below.
```

---

## OUTPUT FORMAT

```yaml
carousel_output:
  title:
  platform:
  content_function:
  carousel_type:
  total_slides:

  slides:
    - slide_number: 1
      type: "cover"
      headline: |
      subheadline: |
      visual_direction: |

    - slide_number: 2
      type: "content"
      headline: |
      body: |
      visual_direction: |

    # ... continue for all slides

    - slide_number: [final]
      type: "cta"
      summary: |
      cta_text: |
      visual_direction: |

  caption:
    hook: |
    body: |
    cta: |
    hashtags: []

  full_caption: |

  production_notes:
    visual_style: |
    key_design_elements: []
    brand_colors: []

  quality_scores:
    save_potential: [1-10]
    share_potential: [1-10]
    educational_value: [1-10]
    visual_flow: [1-10]
    overall_score: [1-100]
```

---

## VALIDATION REQUIREMENTS

Carousel must pass:
- [ ] Cover slide hooks in thumbnail
- [ ] One clear idea per slide
- [ ] Visual consistency maintained
- [ ] Value delivered without caption
- [ ] CTA clear and appropriate
- [ ] Voice alignment with BVF
- [ ] Anti-slop check (no filler slides)
- [ ] 5-10 slides total

---

## ARENA INTEGRATION

All carousels must run through Arena competition:
1. Generate carousel structure using this skill
2. Pass to S13: Arena Generation
3. 7 personas evaluate each slide
4. Synthesize best version
5. Final carousel produced

---

## SAVE OPTIMIZATION CHECKLIST

High-save carousels share these traits:
- [ ] Screenshot-worthy individual slides
- [ ] Actionable and specific advice
- [ ] Framework or system to implement
- [ ] Doesn't require caption to understand
- [ ] Professional visual design
- [ ] Clear topic from cover
- [ ] Comprehensive coverage
- [ ] Unique insight or angle

---

*Carousels are the save machines. Every slide should be worth screenshotting.*
