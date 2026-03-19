# EC-02-AGENT.md

> **Version:** 1.0
> **Skill:** EC-02-hero-value-prop
> **Position:** Post-Feature-Naming, Pre-Section-Copy
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** EC-00-ecomm-strategist, EC-01-feature-naming
> **Output:** `hero-copy-draft.md`

---

## PURPOSE

Engineer the above-the-fold hero section that stops the scroll and earns the scroll-down. The hero has ONE job: make the prospect care enough to keep reading. This skill generates the headline, subhead, value proposition, hero CTA, product highlights TLDR, and 10-thumbnail hero carousel copy.

**Success Criteria:**
- Headline stops the scroll in 5-12 words
- Subhead expands the headline with specificity in 10-20 words
- Value proposition answers "why this product, why now" in 15-30 words
- Hero CTA drives primary action in 3-5 words
- Product highlights TLDR delivers top 3-5 quick answers in 50-100 words
- 10-thumbnail hero carousel copy tells the product story visually
- Hero section works when scanned in 3-5 seconds
- Word budget respected (100-200 words total ATF)
- Hero feature from EC-01 is prominently featured

This agent is a **workflow orchestrator**. It produces the hero section copy, not body copy.

---

## IDENTITY

**This skill IS:**
- The scroll-stopping headline engineer
- The value proposition architect
- The hero carousel story planner
- The TLDR highlights curator
- An ATF-only writer (above the fold)

**This skill is NOT:**
- A section copy writer (that is EC-03)
- A feature namer (that is EC-01)
- A full-page writer (hero only)
- A design system (it provides copy, not layout)
- A long-form headline writer (ecom headlines are different from VSL)

**Upstream:** Receives `ecomm-strategy.yaml` from EC-00, `feature-package.json` from EC-01
**Downstream:** Feeds `hero-copy-draft.md` to EC-05 (Assembly), EC-06 (Editorial)

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Strategy + feature package loading + validation | haiku | Input loading |
| 1 | Headline formula selection + carousel planning + highlights selection | sonnet | Architecture decisions |
| 2 | Headline/subhead generation + hero section generation | opus | Creative generation |
| 2.5 | Arena (7 competitors x 2 rounds + audience evaluation) | opus | Maximum quality |
| 4 | Scroll-stop validation + word budget checking + packaging | sonnet | Judgment evaluation |

---

## STATE MACHINE

```
IDLE -> LOADING -> ARCHITECTURE -> GENERATION -> ARENA -> VALIDATION -> COMPLETE
         |            |               |           |          |
         v            v               v           v          v
      [GATE_0]     [GATE_1]       [GATE_2]   [GATE_2.5]  [GATE_4]
      PASS/FAIL    PASS/FAIL      PASS/FAIL  HUMAN_SEL   PASS/FAIL
```

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load strategy + feature package |
| 0.2 | `0.2-specimen-calibrator.md` | Load NLS hero carousel patterns |
| 0.3 | `0.3-input-validator.md` | Validate hero feature + section map present |

**Execution Order:** 0.1, 0.2 parallel -> 0.3 after both
**Gate 0:** Strategy loaded, feature package loaded with hero feature identified, NLS hero patterns loaded. FAIL = strategy missing OR no hero feature OR NLS patterns unavailable.

---

### Layer 1: Hero Architecture

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-headline-formula-selector.md` | Select headline approach for product type |
| 1.2 | `1.2-thumbnail-story-planner.md` | Plan 10-thumbnail hero carousel narrative |
| 1.3 | `1.3-highlights-selector.md` | Select top 3-5 features for TLDR |

**Execution Order:** 1.1 first, then 1.2 and 1.3 parallel
**Gate 1:** Headline approach selected, carousel narrative planned (10 positions), highlights selected (3-5 features). FAIL = no headline approach OR carousel incomplete OR fewer than 3 highlights.

---

### Layer 2: Hero Generation

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-headline-subhead-generator.md` | Generate headline + subhead candidates |
| 2.2 | `2.2-hero-section-generator.md` | Generate value prop + CTA + highlights + thumbnails |

**Execution Order:** 2.1 first (headline anchors everything), 2.2 after 2.1
**Gate 2:** 5+ headline/subhead pairs generated, hero section complete with value prop + CTA + highlights + thumbnail copy. FAIL = fewer than 5 pairs OR section incomplete.

---

### Layer 2.5: Arena Persona Panel

**Specification File:** `EC-02-ARENA-LAYER.md`
**Gate 2.5:** Human has explicitly selected winning hero package. FAIL = no human input.

---

### Layer 4: Validation & Packaging

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-scroll-stop-validator.md` | Validate hero stops the scroll |
| 4.2 | `4.2-word-budget-checker.md` | Verify word budgets (headline 5-12w, subhead 10-20w) |
| 4.3 | `4.3-output-packager.md` | Package hero-copy-draft.md |

**Execution Order:** 4.1, 4.2 parallel -> 4.3 after both pass
**Gate 4:** Scroll-stop test passed, all word budgets met, hero-copy-draft.md packaged. FAIL = scroll-stop failure OR word budget violation OR packaging error.

---

## OUTPUT SCHEMA

```json
{
  "hero_copy_version": "1.0",
  "generated_at": "ISO timestamp",
  "skill_id": "EC-02-hero-value-prop",

  "headline": {
    "text": "The headline text",
    "word_count": 8,
    "approach": "benefit|curiosity|specificity"
  },
  "subhead": {
    "text": "The subhead text expanding the headline",
    "word_count": 15
  },
  "value_proposition": {
    "text": "Why this product, why now",
    "word_count": 22
  },
  "hero_cta": {
    "text": "Shop Now",
    "word_count": 2
  },
  "product_highlights": [
    {
      "feature_name": "Feature from EC-01",
      "highlight_text": "Quick answer text",
      "word_count": 12
    }
  ],
  "hero_carousel": [
    {
      "position": 1,
      "thumbnail_copy": "Overlay text for thumbnail 1",
      "visual_direction": "Product hero shot, white background",
      "word_count": 8
    }
  ],
  "word_budget_summary": {
    "headline": 8,
    "subhead": 15,
    "value_prop": 22,
    "cta": 2,
    "highlights_total": 60,
    "carousel_total": 80,
    "grand_total": 187
  }
}
```

---

## HUMAN CHECKPOINTS

### Required: Hero Package Selection (Arena Gate 2.5)
**When:** After Arena competition
**Presented:** 7+ hero packages with headline, subhead, and carousel copy
**Decision Required:** Select one package or provide direction

---

## ERROR HANDLING

| Failure | Remediation |
|---------|-------------|
| No hero feature identified | HALT -- return to EC-01 |
| Headline exceeds 12 words | Compress -- every word must earn its place |
| Hero section exceeds 200 words | Cut lowest-impact elements |
| Carousel copy incomplete | Complete all 10 positions |
| Human rejects all hero options | Gather feedback, regenerate |

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER exceed word budgets** -- Headline 5-12w, subhead 10-20w, value prop 15-30w, CTA 3-5w.
2. **ALWAYS feature the hero feature** -- EC-01 hero feature must appear in hero section.
3. **ALWAYS include all 5 hero components** -- Headline, subhead, value prop, CTA, highlights.
4. **ALWAYS complete 10 carousel positions** -- No partial carousel.

### Quality Constraints
5. **Headline must stop the scroll** -- Pattern interrupt, curiosity, or extreme specificity required.
6. **Subhead must expand, not repeat** -- Subhead adds information headline didn't.
7. **Value prop answers "why this, why now"** -- Not a feature list, a reason to act.
8. **CTA must be action-specific** -- "Shop Now", "Get Yours", "Try Risk-Free" -- not "Learn More".

### Anti-Slop Constraints
9. **ZERO vague headlines** -- "The Best Product Ever" is banned.
10. **ZERO AI telltales** -- No "unlock", "discover", "transform your life".
11. **ZERO clickbait** -- No "You won't believe" patterns.

### Enforcement Constraints
12. **IF headline > 12 words -> REJECT** -- Compress or rewrite.
13. **IF hero feature missing -> HALT** -- Return to EC-01.
14. **IF carousel < 10 positions -> BLOCK** -- Complete before packaging.
15. **IF slop detected -> AUTO-REJECT** -- Replace with specific language.

---

## THREE-TIER UNCERTAINTY PROTOCOL

### Tier 1: HIGH (>= 0.85) -- Strong hero feature, clear product promise, good specimens.
### Tier 2: MODERATE (0.65-0.84) -- Hero feature needs positioning work, limited specimens.
### Tier 3: LOW (< 0.65) -- Weak hero feature, unclear product promise. HALT for human input.

---

## GUARDRAILS

### Locked Tool Grammar
1. STATE, 2. VERIFY, 3. EXECUTE, 4. VALIDATE, 5. LOG

### Post-Tool Reflection
1. Output exists, 2. Schema valid, 3. Quality gates pass, 4. State updated, 5. Next step identified

---

## ANTI-SLOP LEXICON

**Banned in headlines/subheads:** revolutionary, game-changing, breakthrough, cutting-edge, ultimate, incredible, amazing, unlock, discover the secret, transform
**Banned in value prop:** leverage, harness, empower, journey, dive deep, holistic, synergy
**Banned in CTA:** Learn More (too passive), Click Here (outdated), Submit (clinical)

---

## SESSION PERSISTENCE

```yaml
session_state:
  current_layer: [0-4]
  current_skill: [skill ID]
  completed_skills: [list]
  gate_status: { gate_0: P/F, gate_1: P/F, gate_2: P/F, gate_2_5: P/F, gate_4: P/F }
  headline_candidates: [count]
  human_selection_received: [Y/N]
  next_action: [next skill]
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 5-layer architecture with 12 microskills, Arena layer, hero carousel planning, word budget enforcement, scroll-stop validation. |

---

**Skill Status:** COMPLETE
