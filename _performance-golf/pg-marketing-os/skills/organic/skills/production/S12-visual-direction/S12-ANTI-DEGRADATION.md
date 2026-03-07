# S12: Visual Direction Anti-Degradation System
Version: 1.0
Status: Active
Last Updated: 2026-03-05

## Mandatory Read

**YOU MUST READ THIS FILE BEFORE EXECUTING S12.**

This document contains the accumulated failure modes and enforcement protocols for S12 Visual Direction. These patterns have been observed across multiple projects. Ignoring them will result in:
- Generic visual direction that designers cannot execute
- Off-brand assets requiring expensive rework
- Poor visual performance (low CTR, scroll-through)
- Misalignment between copy tone and visual treatment

**The fixes are structural, not suggestions.**

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: S12: Visual Direction Anti-Degradation System v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Provide generic visual direction like "make it look good" instead of specific composition, color, and typography specs. Use vague dimensions like "square" or "landscape" instead of exact pixel dimensions. Skip text-safe zone specification for any visual with text overlay.
```

**Write this declaration to your first output file before executing any microskill.**

---

## The 9 Core Fixes

### Fix 1: Project Infrastructure (MANDATORY)
**Every S12 execution requires these 3 files in the project directory:**

```
project-root/
  ├── CLAUDE.md          # Skill routing and context
  ├── PROJECT-STATE.md   # Current state snapshot
  └── PROGRESS-LOG.md    # Append-only audit trail
```

**BEFORE starting S12:**
1. Verify all 3 files exist
2. Read CLAUDE.md for skill routing
3. Read PROJECT-STATE.md for current context
4. Update PROGRESS-LOG.md with S12 start timestamp

**If any file is missing:** Create it or escalate to human. Do NOT proceed with incomplete infrastructure.

---

### Fix 2: Per-Microskill Output (MANDATORY)

**EVERY microskill MUST produce its own dedicated output file.**

This prevents the "synthesis trap" where agents read high-level instructions and synthesize output without executing individual specifications.

| Microskill | Required Output File |
|------------|---------------------|
| 0.1 input-validator | `s12-0.1-validation-report.yaml` |
| 0.2 teaching-loader | `s12-0.2-teaching-context.md` |
| 0.3 specimen-loader | `s12-0.3-specimens.yaml` |
| 0.4 cbf-loader | `s12-0.4-brand-guidelines.yaml` |
| 1.1 platform-visual-analysis | `s12-1.1-platform-analysis.yaml` |
| 1.2 thumbnail-strategy | `s12-1.2-thumbnail-strategy.md` |
| 1.3 visual-style-guide | `s12-1.3-style-guide.yaml` |
| 1.4 color-typography-system | `s12-1.4-color-typography.yaml` |
| 2.1 thumbnail-design-brief | `s12-2.1-thumbnail-brief.yaml` |
| 2.2 video-frame-direction | `s12-2.2-frame-direction.yaml` |
| 2.3 carousel-visual-direction | `s12-2.3-carousel-visuals.yaml` |
| 2.4 creative-asset-specs | `s12-2.4-asset-specs.yaml` |
| 2.5.1 arena-submission | `s12-2.5.1-arena-package.yaml` |
| 2.5.2 adversarial-critique | `s12-2.5.2-critique-report.yaml` |
| 2.5.3 synthesis | `s12-2.5.3-synthesis-results.yaml` |
| 4.1 output-assembler | `visual_direction_brief.yaml` |
| 4.2 execution-log | `s12-execution-log.md` |

**Forbidden behaviors:**
- "I'll combine 1.1-1.4 into one analysis file" — NO, each microskill gets its own file
- "The final brief includes all this, no need for intermediate files" — NO, produce intermediate files
- "I already validated in my head" — NO, write validation-report.yaml

---

### Fix 3: Binary Gate Enforcement (MANDATORY)

Gates are **PASS or FAIL**. No other status exists.

**Allowed gate file contents:**
```yaml
gate: PASS
timestamp: 2026-03-05T14:32:00Z
validator: claude-haiku-4
criteria_met:
  - criterion_1: true
  - criterion_2: true
```

**FORBIDDEN gate statuses:**
- "PARTIAL_PASS" — does not exist
- "CONDITIONAL_PASS" — does not exist
- "NEEDS_REVIEW" — does not exist
- "MOSTLY_COMPLETE" — does not exist

**If criteria are not met:** The gate file must NOT be created. Fix the issue or escalate to human.

---

### Fix 4: Stale Artifact Cleanup (MANDATORY)

**Before starting S12 Layer 1:** Check for stale visual direction files from previous runs.

```bash
# If these files exist, they are stale:
s12-1.1-platform-analysis.yaml
s12-2.1-thumbnail-brief.yaml
visual_direction_brief.yaml
GATE_2.5_ARENA_COMPLETE
```

**If stale files exist:**
1. Move to `_archive/YYYY-MM-DD-HH-MM/`
2. Document in PROGRESS-LOG.md
3. Proceed with fresh execution

**NEVER append to existing files from previous runs.** Each execution starts clean.

---

### Fix 5: Model Selection Binding (MANDATORY)

The Model Assignment Table in S12-AGENT.md is **binding**.

| Layer | Model | Non-Negotiable |
|-------|-------|----------------|
| Layer 0 | claude-haiku-4 | YES |
| Layer 1 | claude-sonnet-4.5 | YES |
| Layer 2 | claude-opus-4.6 | YES |
| Layer 2.5 | claude-opus-4.6 | YES |
| Layer 4 | claude-sonnet-4.5 | YES |

**If a model is unavailable:** Escalate to human. Do NOT substitute.

**Forbidden rationalizations:**
- "Sonnet can handle Layer 2, it's just visual direction"
- "Haiku is good enough for thumbnail strategy"
- "I'll use Opus for everything to be safe"

---

### Fix 6: Arena Requirements (MANDATORY)

**For thumbnail direction: Arena is MANDATORY.**

Thumbnails determine whether content gets consumed. A 7-persona × 3-round Arena evaluation prevents single-context bias.

**Arena must include:**
- All 7 organic personas (Volume Machine, Value Architect, Virality Engineer, Community Builder, Brand Purist, Algorithm Hacker, Storyteller)
- 3 full rounds (Round 1 → Critique → Round 2 → Critique → Round 3)
- Synthesis (3+ hybrid approaches)
- Human selection capture

**For supplementary assets (quote cards, carousel slides):** Arena is optional but recommended.

**BLOCKING GATE:** `GATE_2.5_ARENA_COMPLETE` must exist before Layer 4.

---

### Fix 7: Brand Consistency Verification (MANDATORY)

**Before creating GATE_4_PACKAGE_COMPLETE:**

Verify visual direction aligns with brand guidelines from CBF:
- [ ] Colors match brand palette (or have documented rationale for deviation)
- [ ] Typography matches brand fonts
- [ ] Visual style aligns with brand voice (e.g., premium brand = clean/sophisticated visuals)
- [ ] Logo usage follows brand guidelines

**If brand guidelines are missing from CBF:** Escalate to human. Do NOT invent brand guidelines.

---

### Fix 8: Platform Dimension Accuracy (MANDATORY)

**Each platform has specific dimension requirements:**

| Platform | Thumbnail | Feed Post | Story/Reel | Carousel |
|----------|-----------|-----------|------------|----------|
| YouTube | 1280×720 | — | — | — |
| Instagram | — | 1080×1080 | 1080×1920 | 1080×1080 |
| TikTok | — | — | 1080×1920 | — |
| LinkedIn | — | 1200×627 | — | 1200×627 |
| Twitter | — | 1200×675 | — | — |

**Verify dimensions in Layer 1 (1.1 platform-visual-analysis) and enforce in Layer 2.**

**NEVER provide generic dimensions like "square" or "vertical" — specify exact pixel dimensions.**

---

### Fix 9: Text-Safe Zone Specification (MANDATORY)

**Every visual with text overlay MUST specify text-safe zones.**

Text-safe zone = area where text will NOT be blocked by:
- Platform UI elements (profile pic, like button, timestamp)
- Video player controls
- Cropping on different devices

**Example specification:**
```yaml
text_safe_zone:
  top_margin: 80px
  bottom_margin: 120px
  left_margin: 60px
  right_margin: 60px
  rationale: "Instagram feed post — profile pic in top-left, like/comment in bottom-center"
```

**If text-safe zone is missing:** Visual direction is INCOMPLETE. Do NOT proceed to Layer 4.

---

## Failure Mode Table

| Failure Mode | Detection Signal | Immediate Response | Escalation Threshold |
|--------------|------------------|-------------------|---------------------|
| Generic stock photo direction | Visual direction contains phrases like "person smiling" or "office background" without specific style/mood | Regenerate with specific visual reference (composition, lighting, mood, color treatment) | 2 generic descriptions in one brief |
| Missing thumbnail for video | Content type = video, but no thumbnail brief exists | BLOCK at GATE_2_BRIEFS_COMPLETE, regenerate thumbnail brief | Cannot proceed without thumbnail |
| Wrong platform dimensions | Dimensions don't match platform specs (e.g., 1080×1080 for YouTube) | Cross-reference platform table, regenerate with correct dimensions | 1 dimension error = immediate block |
| No text-safe zone | Visual direction includes text overlay but no safe-zone coordinates | Regenerate with text-safe zone specification | Cannot proceed without safe zone |
| Visual-voice misalignment | Brand voice is "professional/authoritative" but visuals are "playful/casual" | Reload brand guidelines from CBF, realign visual strategy | 1 misalignment = immediate block |
| Mono-color palette | Only 1-2 colors specified, insufficient for designer execution | Expand to primary, secondary, accent, background colors with hex codes | Palette must have 4+ colors |
| Missing typography specs | No font families, sizes, or weights specified | Generate complete typography system with headline, subhead, body specs | Cannot proceed without typography |
| Cross-platform reuse assumption | Same visual specs for multiple platforms | Regenerate platform-specific variations | 1 reuse assumption = immediate block |

---

## Forbidden Rationalizations

**These statements indicate degradation in progress. If you catch yourself thinking these, STOP:**

1. "This is just a visual brief, I can keep it high-level"
   - NO. Designers need actionable specifications.

2. "The designer will figure out the details"
   - NO. Your job is to provide the details.

3. "One color is enough, they'll pick complementary colors"
   - NO. Specify the full palette.

4. "I don't need exact dimensions, just 'landscape' or 'square'"
   - NO. Exact pixel dimensions required.

5. "Arena seems like overkill for a thumbnail"
   - NO. Thumbnails determine consumption. Arena is mandatory.

6. "I'll just describe the vibe, designers are creative"
   - NO. Vibe + specific direction. Both required.

7. "Text-safe zone is obvious, I don't need to specify"
   - NO. Platform UI varies. Always specify.

8. "This carousel can reuse the same visual for all slides"
   - NO. Each slide needs visual progression.

9. "Brand guidelines are in my head from reading the CBF"
   - NO. Extract and document in s12-0.4-brand-guidelines.yaml.

10. "I'll combine all the Layer 1 analysis into one file"
    - NO. Per-microskill output. Each gets its own file.

---

## Quality Enforcement Checklist

**Run this checklist before creating GATE_4_PACKAGE_COMPLETE:**

### Completeness
- [ ] All 17 microskill output files exist
- [ ] visual_direction_brief.yaml exists and validates against schema
- [ ] s12-execution-log.md exists with full audit trail

### Specificity
- [ ] Color palette has 4+ colors with hex codes
- [ ] Typography system specifies font families, sizes, weights
- [ ] Visual direction includes specific composition notes (not "nice looking")
- [ ] Imagery direction includes mood, style, reference notes

### Platform Accuracy
- [ ] Dimensions match platform requirements exactly
- [ ] Text-safe zones account for platform UI elements
- [ ] Aspect ratios correct for platform

### Brand Consistency
- [ ] Colors align with brand palette (or deviation documented)
- [ ] Typography aligns with brand fonts
- [ ] Visual style aligns with brand voice

### Arena Compliance (if thumbnail)
- [ ] 7 personas evaluated
- [ ] 3 rounds completed
- [ ] Synthesis generated
- [ ] Human selection captured
- [ ] GATE_2.5_ARENA_COMPLETE exists

### Handoff Readiness
- [ ] Designer could execute from this brief alone (no clarification needed)
- [ ] All asset types covered (thumbnail, frames, slides)
- [ ] Production notes clear and actionable

---

## Emergency Protocols

### If CBF is missing brand guidelines
1. STOP execution immediately
2. Document gap in PROGRESS-LOG.md
3. Escalate to human: "CBF lacks brand guidelines (colors, fonts, style). Cannot produce on-brand visual direction. Request updated CBF or standalone brand guide."
4. Do NOT invent brand guidelines

### If platform dimensions are ambiguous
1. Cross-reference platform documentation
2. If multiple valid dimensions exist (e.g., Instagram accepts 4:5 and 1:1), default to most common
3. Document dimension choice rationale in s12-1.1-platform-analysis.yaml
4. If truly ambiguous, escalate to human

### If content requires visual approach not covered in teaching files
1. Note the gap in execution log
2. Proceed with best-effort based on core visual principles
3. Flag for human review in GATE_4_PACKAGE_COMPLETE
4. Recommend teaching file update post-project

---

## Version History

- **v1.0** (2026-03-05): Initial anti-degradation system for S12 Visual Direction
