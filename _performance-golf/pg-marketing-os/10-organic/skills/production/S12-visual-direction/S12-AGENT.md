# S12: Visual Direction Agent
Version: 1.0
Status: Active
Last Updated: 2026-03-05

## Model Assignment Table

| Layer | Model | Justification |
|-------|-------|---------------|
| Layer 0 | claude-haiku-4 | Input validation, file loading — low complexity, speed critical |
| Layer 1 | claude-sonnet-4.5 | Visual analysis and strategy — pattern recognition requiring balance of speed + quality |
| Layer 2 | claude-opus-4.6 | Creative visual direction — highest quality for thumbnail/visual briefs that drive consumption |
| Layer 2.5 | claude-opus-4.6 | Arena synthesis — quality-critical visual evaluation |
| Layer 4 | claude-sonnet-4.5 | Package assembly, logging — structured output, speed over creativity |

**THIS TABLE IS BINDING.** Any deviation requires explicit approval and documentation.

## Purpose

Produce visual direction briefs for thumbnails, video frames, carousel slides, and creative assets. The visual layer determines whether content gets consumed. A scroll-stopping thumbnail or first frame can make mediocre content succeed; poor visuals can kill great content.

This skill translates content strategy and copy into actionable visual specifications that designers/video editors can execute. It's the bridge between copywriting and creative production.

## Identity Boundaries

### THIS SKILL IS
- Thumbnail design direction (composition, color, text overlay)
- Video frame specifications (key moments, visual pacing)
- Carousel visual strategy (slide-to-slide flow)
- Color palette and typography systems
- Visual mood boards and reference direction
- Platform-specific visual adaptation
- Brand consistency enforcement in visuals
- Text-safe zone specifications

### THIS SKILL IS NOT
- Actual graphic design execution (that's production)
- Video editing or production
- Copy writing (that's S08-S11)
- Content strategy (that's S04-S07)
- Performance analysis (that's S19)

## Architecture

### Layer 0: Input & Context Loading
**Model: claude-haiku-4**

YOU ARE NOW ENTERING LAYER 0.

Your task is to load all required context and validate inputs. This is infrastructure work — speed and reliability over creativity.

| Microskill | File | Model | Purpose |
|------------|------|-------|---------|
| 0.1 | input-validator.md | haiku | Verify content type, platform, CBF presence |
| 0.2 | teaching-loader.md | haiku | Load visual design principles from teaching files |
| 0.3 | specimen-loader.md | haiku | Load thumbnail/visual specimens for reference |
| 0.4 | cbf-loader.md | haiku | Load campaign brief for brand guidelines |

**Execute all Layer 0 microskills in sequence. Produce dedicated output files for each.**

**BLOCKING GATE:** `GATE_0_INPUT_VALID` must exist before proceeding.

---

### Layer 1: Visual Strategy & Analysis
**Model: claude-sonnet-4.5**

YOU ARE NOW ENTERING LAYER 1.

Your task is to analyze platform visual requirements and develop the overarching visual strategy. This determines the visual approach before specific asset briefs.

| Microskill | File | Model | Purpose |
|------------|------|-------|---------|
| 1.1 | platform-visual-analysis.md | sonnet | Analyze platform-specific visual requirements and patterns |
| 1.2 | thumbnail-strategy.md | sonnet | Develop thumbnail approach (stop-scroll mechanism) |
| 1.3 | visual-style-guide.md | sonnet | Create cohesive visual style for this content piece |
| 1.4 | color-typography-system.md | sonnet | Define color palette and typography specifications |

**Execute all Layer 1 microskills in sequence. Produce dedicated output files for each.**

**BLOCKING GATE:** `GATE_1_STRATEGY_COMPLETE` must exist before proceeding.

---

### Layer 2: Asset Direction Briefs
**Model: claude-opus-4.6**

YOU ARE NOW ENTERING LAYER 2.

Your task is to create detailed visual direction briefs for each asset type. This is where the visual strategy becomes actionable specifications for designers.

| Microskill | File | Model | Purpose |
|------------|------|-------|---------|
| 2.1 | thumbnail-design-brief.md | opus | Full thumbnail composition and design brief |
| 2.2 | video-frame-direction.md | opus | Key frame specifications for video content |
| 2.3 | carousel-visual-direction.md | opus | Slide-by-slide visual direction for carousels |
| 2.4 | creative-asset-specs.md | opus | Additional asset specifications (quote cards, etc.) |

**Execute all Layer 2 microskills in sequence. Produce dedicated output files for each.**

**BLOCKING GATE:** `GATE_2_BRIEFS_COMPLETE` must exist before proceeding to Arena.

---

### Layer 2.5: Arena Competition
**Model: claude-opus-4.6**

YOU ARE NOW ENTERING LAYER 2.5 — THE ARENA.

For visual direction, the Arena evaluates alternative thumbnail/visual approaches across 7 organic personas. The goal is to identify the visual strategy most likely to stop scrolls and drive consumption.

| Microskill | File | Model | Purpose |
|------------|------|-------|---------|
| 2.5.1 | arena-submission.md | opus | Prepare visual alternatives for Arena evaluation |
| 2.5.2 | adversarial-critique.md | opus | The Critic evaluates visual approaches |
| 2.5.3 | synthesis.md | opus | Generate hybrid visual approaches |

**The Arena is MANDATORY for thumbnail direction. Optional for supplementary assets.**

**Execute Arena protocol from `~system/protocols/ARENA-CORE-PROTOCOL.md`.**

**BLOCKING GATE:** `GATE_2.5_ARENA_COMPLETE` must exist with human selection captured before proceeding.

---

### Layer 4: Package Assembly
**Model: claude-sonnet-4.5**

YOU ARE NOW ENTERING LAYER 4.

Your task is to assemble the final visual direction package and prepare handoff files.

| Microskill | File | Model | Purpose |
|------------|------|-------|---------|
| 4.1 | output-assembler.md | sonnet | Assemble complete visual direction brief |
| 4.2 | execution-log.md | sonnet | Document decisions and create audit trail |

**Execute all Layer 4 microskills in sequence. Produce dedicated output files for each.**

**BLOCKING GATE:** `GATE_4_PACKAGE_COMPLETE` must exist before S14 can consume this output.

---

## Output Schema

```yaml
visual_direction_brief:
  content_id: string
  content_type: enum [video, carousel, static_post, thread]
  platform: enum [youtube, instagram, tiktok, linkedin, twitter]

  primary_thumbnail:
    composition:
      layout: string
      focal_point: string
      visual_hierarchy: string
    color_palette:
      primary: hex
      secondary: hex
      accent: hex
      background: hex
    typography:
      headline_font: string
      headline_size: string
      headline_color: hex
      subhead_specs: object
    imagery:
      subject: string
      style: string
      mood: string
      reference_images: array
    text_overlay:
      headline_text: string
      position: coordinates
      safe_zone: coordinates
    dimensions:
      width: int
      height: int
      format: string

  video_frames: array [if video]
    - timestamp: string
      description: string
      composition: object
      text_overlay: object

  carousel_slides: array [if carousel]
    - slide_number: int
      visual_direction: object
      text_safe_zone: coordinates

  brand_consistency:
    color_adherence: boolean
    typography_adherence: boolean
    style_notes: string

  production_notes: string
  designer_handoff: string
```

## Gate Criteria

### GATE_0_INPUT_VALID
- [ ] Content type identified
- [ ] Platform specified
- [ ] CBF loaded (includes brand guidelines)
- [ ] Teaching and specimen files loaded

### GATE_1_STRATEGY_COMPLETE
- [ ] Platform visual requirements analyzed
- [ ] Thumbnail strategy defined (stop-scroll mechanism)
- [ ] Visual style guide created
- [ ] Color and typography system defined

### GATE_2_BRIEFS_COMPLETE
- [ ] Thumbnail brief complete (composition, color, typography, imagery)
- [ ] Video frame direction complete (if video content)
- [ ] Carousel visual direction complete (if carousel)
- [ ] All dimensions correct for platform
- [ ] Text-safe zones specified

### GATE_2.5_ARENA_COMPLETE
- [ ] Arena run (7 personas, 2 rounds + audience evaluation) — FOR THUMBNAILS
- [ ] Human selection captured
- [ ] Arena results file exists with selected visual approach

### GATE_4_PACKAGE_COMPLETE
- [ ] visual_direction_brief.yaml written
- [ ] All asset types have direction
- [ ] Brand consistency verified
- [ ] Designer handoff notes complete
- [ ] execution-log.md written

## Critical Constraints

### NEVER Proceed Without CBF
The Campaign Brief contains brand guidelines (colors, fonts, logo usage, style). Visual direction without brand context produces off-brand assets that must be redone.

### NEVER Cross-Post Visuals Directly
Each platform has different dimensions, aspect ratios, and visual conventions. A YouTube thumbnail (1280×720) cannot be reused as an Instagram feed post (1080×1080). Adapt, don't duplicate.

### NEVER Skip Thumbnail for Video Content
The thumbnail is the #1 determinant of video consumption. A video without a thumbnail brief is a video that won't get watched.

### NEVER Provide Generic Direction
"Use bright colors" is not direction. "Primary: #FF6B35 (energetic orange), Secondary: #004E89 (trust blue), background gradient 15° from #FF6B35 to #F7C59F" is direction.

### NEVER Contradict Brand Voice in Visuals
If the brand voice is "premium/sophisticated," the visual direction cannot be "loud/chaotic." Visuals and copy must align tonally.

## Failure Modes

1. **Generic stock photo direction** — "Use image of person smiling" instead of specific visual reference and mood
2. **Missing thumbnail** — Video content proceeding without thumbnail brief
3. **Wrong dimensions** — YouTube thumbnail sized for Instagram
4. **No text-safe zone** — Text overlay blocking critical visual elements
5. **Visual-voice misalignment** — Carnival visuals for law firm content

## Integration Points

### Upstream Dependencies
- **S08-S11** (content creation) — provides copy that needs visual support
- **S04-S07** (strategy) — provides content strategy and format
- **S00** (CBF) — provides brand guidelines

### Downstream Consumers
- **S14** (assembly) — consumes visual direction to package complete content
- **Production team** — designers execute visual direction briefs

### Parallel Processes
- **S13** (Arena) — visual direction submits to Arena for evaluation

## Handoff Files

This skill produces:
- `visual_direction_brief.yaml` — complete visual direction package
- `s12-execution-log.md` — decisions and audit trail
- `GATE_4_PACKAGE_COMPLETE` — checkpoint for downstream consumption

## Version History

- **v1.0** (2026-03-05): Initial S12 Visual Direction agent specification
