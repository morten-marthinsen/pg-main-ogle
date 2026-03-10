# S10 Carousel Design — ANTI-DEGRADATION PROTOCOL v1.0

**Status:** MANDATORY READ before execution
**Last Updated:** 2026-03-05
**Propagated From:** S08/S09 structural fixes

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: S10 Carousel Design — ANTI-DEGRADATION PROTOCOL v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Treat the cover slide as just a title instead of the most critical scroll-stop element. Skip visual direction for any slide or claim it can come later. Skip Arena for carousels or assume slides should all match in formatting.
```

**Write this declaration to your first output file before executing any microskill.**

---

## EXECUTIVE SUMMARY

This protocol prevents 9 failure modes that degrade carousel quality. Every agent executing S10 MUST read this file before beginning work.

**Core Principle:** Carousels are save-optimized visual content. Cover slide determines swipe-through. Each slide must stand alone as screenshot-worthy content.

---

## STRUCTURAL FIX 1: CHECKPOINT FILES REQUIRED

```yaml
Required Checkpoints:
  PRE_ARENA:
    file: "pre-arena-carousel-draft.md"
    minimum_size: 2000 chars
    contains: "PRE-ARENA" label
    slides: 5-15 slides with visual direction per slide

  ARENA_COMPLETE:
    file: "arena-results.md"
    minimum_size: 4000 chars
    contains:
      - 7 persona carousel variants
      - 3 critique rounds
      - Human selection

  SELECTED_CAROUSEL:
    file: "selected-carousel-final.md"
    minimum_size: 1500 chars
    verified_from: "arena-results.md"
    per_slide_files: true
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

**Carousel Requirements:**

| Platform | Slide Count | Text Per Slide | Aspect Ratio | File Format |
|----------|-------------|----------------|--------------|-------------|
| Instagram | 5-10 slides | <100 chars headline, <200 body | 1:1 or 4:5 | JPG/PNG per slide |
| LinkedIn | 8-15 slides | <150 chars headline, <300 body | Variable (PDF upload) | PDF multi-page |

**Cover Slide (Slide 1) Requirements:**
- MUST stop scroll with hook/curiosity/value
- Hook score ≥8.0/10 required
- Clear value proposition in <3 seconds
- NOT generic ("X Tips You Need")

**Per-Slide Minimums:**
- Headline: 10-100 chars (Instagram), 10-150 chars (LinkedIn)
- Body copy: 20-200 chars (Instagram), 50-300 chars (LinkedIn)
- Visual direction: Layout + colors + typography + imagery notes
- Stand-alone value: Each slide must make sense if viewed independently

---

## STRUCTURAL FIX 3: FAILURE MODE TABLE

| Failure Mode | Detection Signal | Response Protocol | Escalation |
|--------------|------------------|-------------------|------------|
| Weak Cover Slide | Generic hook, hook score <7.0 | REGENERATE cover with curiosity gap | 1st occurrence (critical) |
| Text Overload | >250 chars per slide (Instagram) | REDUCE to readable length, split into 2 slides | 2nd occurrence |
| No Visual Direction | Missing layout/color/typography notes | ADD complete visual direction per slide | 1st occurrence |
| Identical Formatting | All slides same layout | VARY slide designs for visual interest | 2nd occurrence |
| Slides Don't Stand Alone | Slide N requires Slide N-1 context | REWRITE for independence | 1st occurrence |
| Missing CTA Slide | No save/share/engage prompt on final slide | ADD CTA slide as slide N | 1st occurrence (critical) |
| Voice Drift | BVF mismatch detected | REGENERATE with persona specimens | BVF score <7.0 |

---

## STRUCTURAL FIX 4: FORBIDDEN RATIONALIZATIONS

**NEVER say:**
1. "The carousel is self-explanatory" → Every slide needs explicit visual direction
2. "Visual direction can come later" → Design brief must accompany copy
3. "All slides should match" → Variety maintains attention across swipes
4. "Cover slide is just a title" → Cover slide is THE most critical (determines swipe-through)
5. "Users will read slides in order" → Users screenshot individual slides out of context
6. "Arena can be skipped for simple carousels" → Arena ALWAYS mandatory for generative content
7. "We can combine slides to save space" → Each concept = one slide (clarity > brevity)
8. "Generic hooks work fine" → Specificity and curiosity required for scroll-stop

---

## STRUCTURAL FIX 5: BINARY GATE ENFORCEMENT

**Gates are PASS or FAIL only.**

### GATE 0.1: Input Validation
- **Pass:** Carousel brief exists, platform specified, slide count target, content type defined
- **Fail:** HALT. Request missing inputs.

### GATE 1.4: Strategy Complete
- **Pass:** All 4 Layer 1 files exist (platform analysis, slide architecture, hook strategy, save optimization)
- **Fail:** REGENERATE missing strategy files.

### GATE 2.4: Pre-Arena Draft Ready
- **Pass:** All slides written (cover + body + CTA), visual direction per slide, labeled PRE-ARENA
- **Fail:** REWRITE. Cannot proceed to Arena.

### GATE 2.5.3: Arena Complete (HUMAN_SELECT)
- **Pass:** Human selected 1 hybrid, ARENA_COMPLETE checkpoint created
- **Fail:** WAIT for human selection.

### GATE 4.3: Final Validation
- **Pass:** Per-slide files generated, platform specs met, Arena selection verified
- **Fail:** FIX packaging errors.

---

## STRUCTURAL FIX 6: MANDATORY READ ENFORCEMENT

**Before execution:**
1. Read `S10-AGENT.md` (Layer Map, Model Assignment, Templates)
2. Read `S10-ANTI-DEGRADATION.md` (this file)
3. Read `CAROUSEL-BRIEF-SCHEMA.md` (input schema)
4. Load `ORGANIC-ARENA-PROTOCOL.md` (7 personas, 3-round critique)
5. Read individual microskill specs for current layer

---

## STRUCTURAL FIX 7: PER-MICROSKILL OUTPUT

**Every microskill produces dedicated output file.**

### Layer 0 Outputs (4 files):
- `0.1-validation-result.json`
- `0.2-teaching-references.md`
- `0.3-specimen-references.md`
- `0.4-cbf-extraction.yaml`

### Layer 1 Outputs (4 files):
- `1.1-platform-carousel-analysis.md`
- `1.2-slide-architecture.md`
- `1.3-hook-strategy.md`
- `1.4-save-optimization.md`

### Layer 2 Outputs (4 files):
- `2.1-cover-slide.md`
- `2.2-body-slides.md` (labeled PRE-ARENA)
- `2.3-cta-slide.md`
- `2.4-visual-direction.md`

### Layer 2.5 Outputs (3 files):
- `2.5.1-arena-submission.md`
- `2.5.2-adversarial-critique.md`
- `2.5.3-synthesis-hybrids.md`

---

## STRUCTURAL FIX 8: PROJECT INFRASTRUCTURE

```
project-directory/
├── PROJECT-STATE.md
├── PROGRESS-LOG.md
├── carousel-brief.yaml
├── checkpoints/
│   ├── pre-arena-carousel-draft.md
│   └── arena-results.md
├── outputs/
│   ├── layer-0/ (4 files)
│   ├── layer-1/ (4 files)
│   ├── layer-2/ (4 files)
│   └── layer-2.5/ (3 files)
└── final-carousel/
    ├── slide-01-cover.md
    ├── slide-02-body.md
    ├── ...
    ├── slide-N-cta.md
    └── design-brief.md
```

---

## STRUCTURAL FIX 9: STALE ARTIFACT CLEANUP

**Before Layer 4:**
1. Verify Arena selection is source for final carousel
2. Archive pre-Arena drafts
3. Confirm per-slide character counts
4. Validate BVF alignment of FINAL carousel (not draft)

**File Naming:**
- Drafts: `*-draft.md` or `PRE-ARENA-*`
- Arena: `arena-*`
- Final: `slide-##-*.md` (per-slide files)

---

## CAROUSEL-SPECIFIC ENFORCEMENT

### Cover Slide (Slide 1) Requirements:
- Hook strength score ≥8.0/10 (critical threshold)
- Value proposition clear in first 3 seconds of viewing
- NOT generic templates ("X Things You Need", "The Ultimate Guide")
- Creates curiosity gap for swipe-through ("Wait, what's #3?")

### Slide Independence Requirement:
- Each slide must make sense if screenshot individually
- No "continued from previous slide" dependencies
- Complete thought per slide (headline + supporting copy)
- Test: Can user understand Slide 5 without seeing Slides 1-4?

### Visual Direction Requirement:
- Per-slide layout specification (centered, left-aligned, split, etc.)
- Color palette per slide (can vary for visual interest)
- Typography notes (headline font size, body font, hierarchy)
- Imagery direction (photo, illustration, abstract, none)

### Save Optimization Requirement:
- Slide 1: Front-load save prompt OR create curiosity
- Slides 2-N: Screenshot-worthy formatting (bullets, numbers, frameworks)
- Slide N: Explicit save/share CTA
- Reference value: Can user return to this carousel later for information?

---

## ARENA REQUIREMENTS

**7 Organic Persona Panel:**
1. Volume Machine
2. Value Architect
3. Virality Engineer
4. Community Builder
5. Brand Purist
6. Algorithm Hacker
7. Storyteller

**Arena Protocol:**
- Each persona generates complete carousel (all slides)
- 3 rounds of adversarial critique
- Scoring: Hook Strength (30%), Save-Worthiness (30%), Platform Fit (20%), Engagement (20%)
- Generate 3+ hybrids
- Human selects final

---

## PLATFORM-SPECIFIC ENFORCEMENT

### Instagram Carousels:
- Slide count: 5-10 (optimal 6-8)
- Aspect ratio: 1:1 or 4:5 (4:5 recommended for screen space)
- Text per slide: <100 chars headline, <200 chars body
- Swipe direction: Left to right
- Format: Individual JPG/PNG files per slide

### LinkedIn Carousels:
- Slide count: 8-15 (professional audiences tolerate longer)
- Aspect ratio: Variable (document upload, typically 16:9 or A4)
- Text per slide: <150 chars headline, <300 chars body
- Format: Multi-page PDF

---

## COMMON CAROUSEL FAILURES

1. **Generic Cover:** "5 Tips for Success" → No curiosity, no swipe
2. **Text Wall:** 400-char slide on mobile → Unreadable
3. **Context-Dependent Slides:** "As I mentioned earlier..." → Fails independence test
4. **No Visual Variety:** 10 slides, identical centered text → Visual fatigue
5. **Missing Save Prompt:** No CTA on final slide → Missed engagement
6. **Vague Design Brief:** "Make it modern" → Designer has no actionable direction
7. **Wrong Aspect Ratio:** 16:9 slides for Instagram → Cropped/distorted

---

## ANTI-DEGRADATION CHECKLIST

Before marking S10 complete:

- [ ] All 3 checkpoint files exist (PRE-ARENA, ARENA_COMPLETE, SELECTED)
- [ ] Arena had 7 personas, 3 critique rounds, human selection
- [ ] Cover slide hook score ≥8.0/10
- [ ] All slides have visual direction (layout, colors, typography, imagery)
- [ ] Slides pass independence test (each stands alone)
- [ ] Final slide has CTA (save/share/follow prompt)
- [ ] Character counts per slide within platform limits
- [ ] BVF alignment score ≥7.0/10
- [ ] All 15 microskill output files exist
- [ ] Per-slide final files generated (slide-01.md, slide-02.md, etc.)

---

## VERSION HISTORY

- **v1.0** (2026-03-05): Initial build. Propagated 9 structural fixes from S08/S09. Added carousel-specific enforcement (cover slide requirements, slide independence, visual direction per slide, save optimization).

---

**END ANTI-DEGRADATION PROTOCOL**
