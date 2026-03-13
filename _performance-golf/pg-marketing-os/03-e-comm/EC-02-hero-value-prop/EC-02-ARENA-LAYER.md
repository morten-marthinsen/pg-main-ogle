# Hero & Value Prop Arena Layer (Layer 2.5)

**Version:** 1.0
**Created:** 2026-03-09
**Position:** Between Layer 2 (Hero Generation) and Layer 4 (Validation)
**Personas:** See `../../~system/protocols/ARENA-PERSONA-PANEL.md`

> **Arena Mode:** `generative_full_draft` -- Competitors generate COMPLETE hero packages from scratch.

---

## PURPOSE

The Arena Layer transforms single-perspective hero writing into multi-perspective competition. Seven competitors each generate their complete hero package -- headline, subhead, value prop, CTA, highlights, and carousel copy -- judged against hero-specific criteria.

**The Problem It Solves:**
- AI tendency toward generic, forgettable headlines
- Value propositions that list features instead of answering "why this, why now"
- Carousel copy that repeats the same message 10 times
- Hero sections that try to do everything instead of stopping the scroll
- CTAs that are passive ("Learn More") instead of action-driven
- Subheads that repeat the headline content

---

## QUALITY STANDARD

```
+==============================================================================+
|  MINIMUM QUALITY THRESHOLD: 8.0/10 WEIGHTED SCORE                           |
|                                                                              |
|  The hero is the ad for the product page. If it doesn't stop the scroll,    |
|  nothing else matters. 80% of ecom page success is determined ATF.          |
|  8.0+ is mandatory.                                                          |
+==============================================================================+
```

---

## LAYER POSITION

```
Layer 0: Foundation (Strategy, Feature Package, NLS Patterns)
Layer 1: Hero Architecture (Headline Approach, Carousel Plan, Highlights)
Layer 2: Hero Generation (Headlines, Value Prop, CTA, Carousel)
    |
    v
+-----------------------------------------------------------------------------+
|                         LAYER 2.5: ARENA                                    |
|  2.5.1: Multi-Perspective Generation (7 competitor hero packages)           |
|  2.5.2: Judging Round (7 hero-specific criteria)                            |
|  2.5.3: Ranking & Rationale (Top 3 with evidence)                           |
|  2.5.4: Human Selection Checkpoint (BLOCKING)                               |
+-----------------------------------------------------------------------------+
    |
    v
Layer 4: Validation & Packaging (Scroll-Stop, Word Budget, Output)
```

---

## ZERO ABBREVIATION MANDATE

```
+==============================================================================+
|  All 7 competitor hero packages MUST be fully generated.                     |
|  All 7 criteria MUST be scored for ALL candidates.                           |
|  ABBREVIATION IS FORBIDDEN. Request continuation if needed.                  |
+==============================================================================+
```

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 3-round execution protocol.**

> **Effort Level:** All generation phases use `effort: max`.

### What Stays Skill-Specific (Below)
- 7 judging criteria with weights
- Hero-specific critique guidance
- Quality thresholds
- Anti-slop enforcement

---

## HERO JUDGING CRITERIA

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Scroll-Stop Power** | 25% | Would this hero make a scrolling prospect STOP? Does headline demand attention? |
| **Value Prop Clarity** | 20% | Does the value prop answer "why this product, why now" -- not just list features? |
| **Hero Feature Integration** | 15% | Is the EC-01 hero feature prominently integrated in headline, highlights, or carousel? |
| **Word Economy** | 10% | Are all word budgets met? Does every word earn its place? |
| **Carousel Narrative** | 10% | Do 10 thumbnails tell a coherent product story? Is there narrative progression? |
| **CTA Strength** | 10% | Is CTA action-specific? Does it create urgency without desperation? |
| **Scan Optimization** | 10% | Does the entire hero section work when scanned in 3-5 seconds? |

### Scoring Rubric

**Scroll-Stop Power (25%)**
- 9-10: Impossible to scroll past; headline creates visceral reaction or irresistible curiosity
- 7-8: Strong stop; would pause and look; compelling combination of headline + visual
- 5-6: Moderate interest; might slow scrolling but not guaranteed to stop
- 3-4: Weak; blends into product page noise; forgettable
- 1-2: Invisible; zero stopping power; could be any product

**Value Prop Clarity (20%)**
- 9-10: Immediately clear WHY this product exists and WHY now; creates desire
- 7-8: Clear value proposition; specific benefit communicated; actionable
- 5-6: Value prop present but reads like feature list; "what" not "why"
- 3-4: Vague value proposition; generic benefit language
- 1-2: No clear value proposition; just product description

**Hero Feature Integration (15%)**
- 9-10: Hero feature is the star; name appears in headline/subhead; anchors highlights
- 7-8: Hero feature prominent; name used in highlights and carousel
- 5-6: Hero feature mentioned but not prominently positioned
- 3-4: Hero feature barely referenced; generic treatment
- 1-2: Hero feature absent from hero section

**Word Economy (10%)**
- 9-10: All budgets met exactly; every word essential; nothing removable
- 7-8: Budgets met; minor words could be tightened
- 5-6: One component slightly over budget; some filler words
- 3-4: Multiple components over budget; notable filler
- 1-2: Significant budget violations; bloated copy

**Carousel Narrative (10%)**
- 9-10: 10 thumbnails tell a complete, compelling product story with clear progression
- 7-8: Good narrative arc; most positions add new information; clear flow
- 5-6: Some narrative; positions feel somewhat random; repetitive elements
- 3-4: Weak narrative; thumbnails are disconnected; no story arc
- 1-2: No narrative; random images with random copy; no progression

**CTA Strength (10%)**
- 9-10: Action-specific, urgent without desperation, perfect tone; would click
- 7-8: Clear action CTA; creates motivation to click
- 5-6: Functional CTA; "Shop Now" level -- works but not memorable
- 3-4: Passive CTA; "Learn More" or similar non-committal language
- 1-2: No CTA or completely generic ("Click Here", "Submit")

**Scan Optimization (10%)**
- 9-10: Full hero message received in 3-second scan; hierarchy perfect
- 7-8: Most of hero message received in quick scan; minor elements missed
- 5-6: Partial message received; requires reading to understand fully
- 3-4: Must read carefully to understand hero; scan misses key info
- 1-2: Hero fails scan test completely; only works when read carefully

---

## QUALITY GATES

### Gate 2.5 Requirements

| Check | Minimum | Evidence |
|-------|---------|----------|
| Packages generated | 7 | One per competitor |
| All criteria scored | 7 per package | 49 scores total |
| Top package score | >= 8.0 | Weighted total |
| No critical gaps | None below 6.0 | Per-criterion review |
| Word budgets met | All within limits | Per-component check |
| Hero feature present | In all packages | Feature name referenced |
| Human selection | Received | BLOCKING |

### Gate Failure Protocol

```
IF top package < 8.0: Return to Layer 1-2 or present with warning
IF word budgets violated: REJECT violating packages
IF hero feature missing: BLOCK -- cannot present without hero feature
IF no human selection: BLOCK -- cannot proceed
```

---

## ANTI-SLOP ENFORCEMENT

**Auto-Reject in Headlines:**
- revolutionary, game-changing, breakthrough, ultimate
- unlock, discover the secret, transform
- amazing, incredible, unbelievable

**Auto-Reject in Value Props:**
- leverage, harness, empower, journey
- holistic, synergy, paradigm
- "experience the difference"

**Auto-Reject in CTAs:**
- Learn More, Click Here, Submit, Continue
- "Discover Now", "Unlock Your [X]"

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial Arena Layer: 7-criterion hero judging, scroll-stop focus, word budget enforcement, hero feature integration requirement, scan optimization criterion, 8.0/10 minimum threshold. |
