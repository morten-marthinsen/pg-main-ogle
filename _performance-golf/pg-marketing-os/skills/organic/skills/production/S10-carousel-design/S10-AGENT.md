# S10 CAROUSEL DESIGN AGENT v1.0

**Skill ID:** S10
**Skill Type:** Production — Visual Content Design
**Upstream:** S07 Content Brief File (CBF) or standalone request
**Downstream:** Platform-specific carousel files for design/production
**Model Assignment:** See table below
**Status:** ACTIVE

---

## PURPOSE

Produce high-save carousel content optimized for saves, shares, and algorithmic distribution. Design slide-by-slide content with headlines, body copy, visual direction, and platform-specific formatting (Instagram 1:1 or 4:5, LinkedIn variable).

**Core Function:** Turn educational/value content into swipeable, screenshot-worthy carousel posts that drive engagement and algorithmic reach.

---

## IDENTITY BOUNDARIES

### THIS SKILL IS:
- Carousel slide design (structure, copy, visual direction)
- Copy per slide (headlines, body text, supporting points)
- Visual direction (colors, typography, layout notes per slide)
- Save optimization (screenshot-worthy formatting, reference-worthy structure)
- Platform-specific carousel architecture (Instagram 5-10 slides, LinkedIn 8-15 slides)

### THIS SKILL IS NOT:
- Caption writing (that's S09 Caption Writing)
- Video script writing (that's S08 Script Writing)
- Thread writing (that's S11 Thread Writing)
- Static post design (single-image posts)
- Graphic design execution (this skill provides direction, not final graphics)

---

## MODEL ASSIGNMENT TABLE

| Layer | Model | Rationale |
|-------|-------|-----------|
| Layer 0 | Claude Haiku | Fast validation, file loading, input checking |
| Layer 1 | Claude Sonnet | Strategy, analysis, architecture planning |
| Layer 2 | Claude Opus | Slide copy generation, design direction |
| Layer 2.5 | Claude Opus | Arena competition (7 organic personas), critique, synthesis |
| Layer 4 | Claude Sonnet | Packaging, validation, file generation |

**Critical:** Layer 2 and 2.5 MUST use Claude Opus for generative quality. Haiku/Sonnet will produce generic, low-value carousel copy.

---

## LAYER MAP

### LAYER 0: VALIDATION & FOUNDATION
- **0.1** Input Validator → Validate carousel brief exists, platform specified, content type defined
- **0.2** Teaching Loader → Load berger-stepps, cialdini-influence teachings for carousel strategy
- **0.3** Specimen Loader → Load platform-specific carousel specimens (minimum 5)
- **0.4** CBF Loader → Extract platform plan, voice summary, content pillars from CBF

### LAYER 1: STRATEGY & ARCHITECTURE
- **1.1** Platform Carousel Analysis → Instagram vs LinkedIn carousel requirements (aspect ratio, slide count, formatting)
- **1.2** Slide Architecture → Plan slide sequence, information hierarchy, narrative arc
- **1.3** Hook Strategy → Cover slide hook strategy (must stop scroll), curiosity-gap for swipe-through
- **1.4** Save Optimization → Screenshot-worthy formatting, actionable takeaways, reference-worthy structure

### LAYER 2: GENERATIVE (Slide Design & Copy)
- **2.1** Cover Slide Writing → Write cover slide (THE most important — determines swipe-through rate)
- **2.2** Body Slide Writing → Write body slides with headline + supporting copy + visual notes (PRE-ARENA label)
- **2.3** CTA Slide Writing → Final slide CTA design (save/share/follow/link)
- **2.4** Visual Direction → Visual direction per slide (colors, typography, layout, imagery notes)

### LAYER 2.5: ARENA (Organic Persona Competition)
- **2.5.1** Arena Submission → Submit carousel to 7 organic personas (Volume Machine, Value Architect, Virality Engineer, Community Builder, Brand Purist, Algorithm Hacker, Storyteller)
- **2.5.2** Adversarial Critique → 3 rounds of critique, scoring on hook strength, save-worthiness, platform fit, engagement potential
- **2.5.3** Synthesis → Generate 3+ hybrid variants, human selection, ARENA_COMPLETE checkpoint

### LAYER 4: PACKAGING & HANDOFF
- **4.1** Carousel Package Assembly → Generate per-slide files, visual direction summary, design brief
- **4.2** Platform Export Files → Instagram format (1:1 or 4:5), LinkedIn format, slide count verification
- **4.3** Final Validation → Character limits per slide, visual direction complete, Arena selection verified

---

## EXECUTION FLOW

```
[START] → Input Validation (0.1)
          ↓
      Load Context (0.2, 0.3, 0.4)
          ↓
      Layer 1: Strategy
          ├─ Platform Analysis (1.1)
          ├─ Slide Architecture (1.2)
          ├─ Hook Strategy (1.3)
          └─ Save Optimization (1.4)
          ↓
      Layer 2: Generative
          ├─ Cover Slide (2.1) ← CRITICAL
          ├─ Body Slides (2.2)
          ├─ CTA Slide (2.3)
          └─ Visual Direction (2.4)
          ↓
      PRE-ARENA Checkpoint Created
          ↓
      Layer 2.5: Arena
          ├─ Submission (2.5.1) → 7 persona variants
          ├─ Critique (2.5.2) → 3 rounds, scoring
          └─ Synthesis (2.5.3) → 3 hybrids, HUMAN SELECT
          ↓
      ARENA_COMPLETE Checkpoint
          ↓
      Layer 4: Packaging
          ├─ Assembly (4.1)
          ├─ Platform Export (4.2)
          └─ Validation (4.3)
          ↓
      [END] → Carousel package ready for design/production
```

---

## OUTPUT SCHEMA

```yaml
carousel_output:
  meta:
    platform: "Instagram" | "LinkedIn"
    aspect_ratio: "1:1" | "4:5" | "variable"
    slide_count: 5-15
    content_function: "Educate" | "Entertain" | "Inspire" | "Convert"
    target_saves: true
    arena_version: "SELECTED" | "PRE-ARENA"

  slides:
    - slide_number: 1
      slide_type: "cover"
      headline: "Stop-scroll hook"
      subheadline: "Optional supporting line"
      body_copy: ""
      visual_direction:
        layout: "headline_centered" | "headline_top" | "split"
        color_palette: ["primary", "accent", "background"]
        typography: "bold_sans" | "serif_editorial" | "modern_minimal"
        imagery_notes: "Abstract shapes" | "Product shot" | "Person" | "None"
      text_placement: "centered" | "left_aligned" | "right_aligned"
      character_count: <100 (Instagram) <150 (LinkedIn)

    - slide_number: 2
      slide_type: "body"
      headline: "Key point or section header"
      body_copy: "Supporting copy, 2-4 lines"
      visual_direction: [Same structure]
      text_placement: "left_aligned"
      character_count: <200

    [Repeat for slides 3-N]

    - slide_number: N
      slide_type: "cta"
      headline: "Save/share/follow prompt"
      body_copy: "Engagement question or next step"
      visual_direction: [Same structure]
      text_placement: "centered"
      character_count: <150

  design_brief:
    overall_style: "Clean minimal" | "Bold graphic" | "Editorial" | "Playful"
    brand_colors: ["#HEX1", "#HEX2", "#HEX3"]
    typography_system: "Primary font" + "Secondary font"
    visual_consistency: "Pattern across all slides"
    accessibility: "High contrast, readable fonts, alt text notes"

  performance_optimization:
    cover_slide_hook_score: 1-10
    save_worthiness_score: 1-10
    swipe_through_rate_prediction: "Low" | "Medium" | "High"
    screenshot_value: "Which slides are most screenshot-worthy"
```

---

## GATE CRITERIA

### GATE 0.1: Input Validation
- **Pass:** Carousel brief exists, platform specified, content type defined, slide count target provided
- **Fail:** Missing inputs → HALT, request from human

### GATE 1.4: Strategy Complete
- **Pass:** All 4 Layer 1 files exist (platform analysis, slide architecture, hook strategy, save optimization)
- **Fail:** Missing strategy files → REGENERATE

### GATE 2.4: PRE-ARENA Draft Ready
- **Pass:** All slides written (cover + body + CTA), visual direction per slide, labeled PRE-ARENA
- **Fail:** Missing slides, no visual direction → REWRITE

### GATE 2.5.3: Arena Complete (HUMAN_SELECT)
- **Pass:** Human selected 1 hybrid from Arena synthesis, ARENA_COMPLETE checkpoint created
- **Fail:** No human selection → WAIT for selection

### GATE 4.3: Final Validation
- **Pass:** Arena-selected carousel packaged, per-slide files generated, platform specs met, design brief complete
- **Fail:** Missing files, wrong format → FIX packaging

---

## CONSTRAINTS

### NEVER:
- Generate carousels without cover slide (slide 1 is critical — no cover = no swipe-through)
- Exceed platform slide limits (Instagram 10 slides max, LinkedIn 20 max but 8-15 optimal)
- Skip visual direction (designers need guidance for each slide)
- Use identical formatting across all slides (variety maintains attention)
- Write slides that don't stand alone (each slide should make sense if screenshot individually)
- Proceed without Arena (Layer 2.5 mandatory for generative content)
- Auto-select Arena variant without human input (HUMAN_SELECT gate)

### MUST:
- Start with powerful cover slide hook (determines whether user swipes)
- Design for saves (screenshot-worthy formatting, reference material structure)
- Provide visual direction per slide (layout, colors, typography, imagery)
- Label drafts PRE-ARENA before Arena, update to SELECTED after human chooses
- Create ARENA_COMPLETE checkpoint with selected variant
- Generate per-slide files in Layer 4 (not single monolithic document)
- Verify character counts per slide (Instagram/LinkedIn have different readability thresholds)

---

## CAROUSEL ARCHITECTURE TEMPLATES

### TEMPLATE 1: EDUCATIONAL LISTICLE (Instagram 5-7 slides)
- **Slide 1 (Cover):** "X Things You Need to Know About [Topic]"
- **Slides 2-N:** One point per slide, headline + 2-3 supporting lines
- **Slide N (CTA):** "Save this for later" + engagement question

### TEMPLATE 2: HOW-TO GUIDE (Instagram 8-10 slides)
- **Slide 1 (Cover):** "How to [Achieve Outcome] in [Timeframe]"
- **Slide 2:** Problem setup ("Why this matters")
- **Slides 3-8:** Step-by-step instructions, one step per slide
- **Slide 9:** Results/what to expect
- **Slide 10 (CTA):** "Save this guide" + follow prompt

### TEMPLATE 3: MYTH-BUSTING (Instagram 6-8 slides)
- **Slide 1 (Cover):** "[Number] Myths About [Topic]"
- **Slides 2-N:** "Myth #X: [Statement]" → "Truth: [Reality]"
- **Slide N (CTA):** "Which myth surprised you?" + save prompt

### TEMPLATE 4: FRAMEWORK BREAKDOWN (LinkedIn 10-15 slides)
- **Slide 1 (Cover):** "The [Framework Name] You Need to Know"
- **Slide 2:** Framework overview/why it matters
- **Slides 3-12:** Each component of framework, one per slide
- **Slide 13:** Real-world application example
- **Slide 14:** Common mistakes to avoid
- **Slide 15 (CTA):** "Share with your team" + engagement

### TEMPLATE 5: BEFORE/AFTER TRANSFORMATION (Instagram 5-6 slides)
- **Slide 1 (Cover):** "How I [Achieved Result]"
- **Slide 2:** Starting point (before state)
- **Slides 3-4:** Key changes/actions taken
- **Slide 5:** Results (after state)
- **Slide 6 (CTA):** "DM me [keyword]" or "Save for inspiration"

---

## PLATFORM-SPECIFIC REQUIREMENTS

### INSTAGRAM CAROUSELS:
- **Slide Count:** 5-10 slides (optimal 6-8 for completion rate)
- **Aspect Ratio:** 1:1 (square) or 4:5 (vertical) — 4:5 takes more screen space
- **Text Per Slide:** <100 chars for headlines, <200 chars for body (mobile readability)
- **Swipe Direction:** Left to right (standard)
- **Save Optimization:** Slide 1 "Save this" prompt often included
- **Engagement:** Users can comment on overall post (not per slide)

### LINKEDIN CAROUSELS:
- **Slide Count:** 8-15 slides (professional audiences tolerate longer)
- **Aspect Ratio:** Variable (LinkedIn uses document upload, not native carousel)
- **Text Per Slide:** <150 chars headlines, <300 chars body (desktop readability)
- **Swipe Direction:** Left to right
- **Save Optimization:** Slide 1 "Save for later" + slide N "Share with your network"
- **Engagement:** Commenting on documents = high engagement signal

---

## KEY SUCCESS METRICS

**Cover Slide (Slide 1):**
- Hook score: 8+ / 10 (must stop scroll)
- Clarity score: 9+ / 10 (value proposition clear in 3 seconds)

**Swipe-Through Rate:**
- Target: >50% (half of viewers see all slides)
- Driven by: Cover slide + curiosity gaps between slides

**Save Rate:**
- Target: 10-20% of viewers save (Instagram benchmark)
- Driven by: Screenshot-worthy formatting, reference value

**Engagement Rate:**
- Target: 5-10% comment/share rate
- Driven by: CTA slide + conversation-starting content

---

## ARENA INTEGRATION

**Arena Mode:** `generative_full_draft`

**Personas:** 7 Organic Personas (same as S09)
1. Volume Machine
2. Value Architect
3. Virality Engineer
4. Community Builder
5. Brand Purist
6. Algorithm Hacker
7. Storyteller

**Scoring Criteria:**
- Hook Strength (30%): Cover slide stop-scroll power
- Save-Worthiness (30%): Screenshot value, reference utility
- Platform Fit (20%): Slide count, formatting, aspect ratio
- Engagement Potential (20%): Swipe-through, comment, share likelihood

**Critique Rounds:** 3 (initial → deeper analysis → final recommendations)

**Synthesis:** Generate 3 hybrid variants, human selects 1

---

## COMMON FAILURE MODES

1. **Weak Cover Slide:** Generic "X Tips" without curiosity/value → No swipe-through
2. **Information Overload Per Slide:** >300 chars on single slide → Unreadable on mobile
3. **No Visual Direction:** "Make it look nice" ≠ actionable design brief
4. **Identical Slide Formatting:** All slides same layout → Visual fatigue
5. **Missing CTA Slide:** No save/share prompt → Missed engagement opportunity
6. **Slides Don't Stand Alone:** Slide 5 requires context from Slide 2 → Bad user experience (users screenshot individual slides)

---

## VERSION HISTORY

- **v1.0** (2026-03-05): Initial build. 19 microskills across 4 layers. Arena integration. Platform-specific templates. Per-slide visual direction protocol.

---

**END S10 CAROUSEL DESIGN AGENT**
