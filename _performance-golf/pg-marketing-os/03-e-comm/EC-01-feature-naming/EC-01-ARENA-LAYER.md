# Feature Naming Arena Layer (Layer 2.5)

**Version:** 1.0
**Created:** 2026-03-09
**Position:** Between Layer 2 (Feature Naming) and Layer 4 (Validation)
**Personas:** See `../../~system/protocols/ARENA-PERSONA-PANEL.md`

> **Arena Mode:** `generative_full_draft` -- Competitors generate COMPLETE feature naming packages from scratch. Layer 2 draft = reference material, not template.

---

## PURPOSE

The Arena Layer transforms single-perspective feature naming into multi-perspective competition. Seven competitors each generate their complete feature naming package -- names, hierarchy, and micro-scripts -- which are then judged against feature-naming-specific criteria to surface the strongest naming approach.

**The Problem It Solves:**
- AI tendency toward generic, safe feature names
- Single naming pattern across all features (monotonous structure)
- Hierarchy not differentiated enough (hero not clearly strongest)
- Micro-scripts that describe without selling
- Names that require context to understand (fail standalone test)
- Naming that ignores competitive differentiation
- Feature packages where names don't work as a cohesive set

---

## QUALITY STANDARD

```
+==============================================================================+
|  MINIMUM QUALITY THRESHOLD: 8.0/10 WEIGHTED SCORE                           |
|                                                                              |
|  This is NON-NEGOTIABLE. Feature names ARE the copy on an ecom page.         |
|  A weak feature name creates a weak page. Names must be memorable,           |
|  benefit-clear, and standalone-testable. 8.0+ is mandatory.                  |
+==============================================================================+
```

---

## LAYER POSITION

```
Layer 0: Foundation (Strategy Loading, Specimen Calibration, Validation)
Layer 1: Capability Analysis (Mapping, Hierarchy Design, Crossover Loading)
Layer 2: Feature Naming (Caveman-Benefit Naming, Micro-Scripts)
    |
    v
+-----------------------------------------------------------------------------+
|                         LAYER 2.5: ARENA                                    |
|                                                                             |
|  2.5.1: Multi-Perspective Generation (7 competitor naming packages)         |
|  2.5.2: Judging Round (7 feature-naming criteria)                           |
|  2.5.3: Ranking & Rationale (Top 3 with evidence)                           |
|  2.5.4: Human Selection Checkpoint (BLOCKING)                               |
+-----------------------------------------------------------------------------+
    |
    v
Layer 4: Validation & Packaging (Generic Detection, Standalone Test, Output)
```

---

## ZERO ABBREVIATION MANDATE

```
+==============================================================================+
|  CRITICAL: COMPLETE EXECUTION REQUIRED                                       |
|                                                                              |
|  This Arena Layer MUST be executed in its ENTIRETY.                           |
|  - All 7 competitor naming packages MUST be fully generated                  |
|  - All 7 criteria MUST be scored for ALL candidates (49 scores total)        |
|  - All evidence MUST be documented -- no "see above" references              |
|  - All scoring rubrics MUST be applied with full justification               |
|                                                                              |
|  ABBREVIATION IS FORBIDDEN. If context is limited, request continuation.     |
|  Incomplete Arena execution = SKILL FAILURE.                                 |
+==============================================================================+
```

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 3-round execution protocol.**

> **Effort Level:** All generation phases use `effort: max`. Critique uses `effort: high`.

This skill uses `arena_mode: generative_full_draft`:
- **Competitors generate COMPLETE feature naming packages from scratch**
- Layer 2 draft = reference material, NOT template
- Upstream packages (strategy, product data, specimens) are the primary input
- Competitors may take radically different naming approaches
- **7 competitors** (6 personas + The Architect) generating independently
- **Adversarial critique** before scoring
- **Targeted revision** per round
- **3 rounds** of competition
- **Post-arena synthesis** creating 2-3 hybrid packages
- **Human selection** from 9-10 candidates

### What Stays Skill-Specific (Below)
- 7 judging criteria with weights
- Feature-naming-specific critique guidance
- Quality thresholds
- Anti-slop enforcement

---

## FEATURE NAMING JUDGING CRITERIA

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Caveman-Benefit Clarity** | 20% | Does the name communicate WHAT + WHY to someone with zero product knowledge? |
| **Memorability** | 20% | Would you remember this name after seeing it once? Does it stick? |
| **Hierarchy Strength** | 15% | Is the hero clearly the strongest name? Do tiers feel differentiated? |
| **Naming Variety** | 15% | Do names use different structures? Not all "[Tech] for [Benefit]"? |
| **Standalone Test** | 10% | Does the name work completely alone -- no description, no context needed? |
| **Micro-Script Quality** | 10% | Do micro-scripts sell the feature in 1-2 sentences? |
| **Cohesion as Set** | 10% | Do all feature names feel like they belong to the same product? |

### Scoring Protocol

```
FOR each naming package:
  FOR each criterion:
    Score 1-10 using rubric below
    Provide SPECIFIC evidence for score (no vague justifications)
    Flag if below minimum (6.0)

  Calculate weighted_total = sum(score * weight)

  Document:
    - Strongest names (with evidence)
    - Weakest names (with evidence)
    - Generic name violations (any detected)
```

### Scoring Rubric

**Caveman-Benefit Clarity (20%)**
- 9-10: Every name instantly communicates WHAT + WHY; zero ambiguity
- 7-8: Most names clear; one may need a moment of interpretation
- 5-6: Some names clear, some require context to understand
- 3-4: Most names are technical-only or benefit-only, not both
- 1-2: Names are generic or meaningless without description

**Memorability (20%)**
- 9-10: Names are sticky -- you'd remember them tomorrow; distinctive phrasing
- 7-8: Most names are memorable; one or two are forgettable
- 5-6: Average memorability; functional but not distinctive
- 3-4: Names blend together; hard to recall individually
- 1-2: Completely forgettable; interchangeable with competitor names

**Hierarchy Strength (15%)**
- 9-10: Hero name is clearly the strongest; tiers feel dramatically different in impact
- 7-8: Hero is strong; supporting names clearly secondary; technical clearly tertiary
- 5-6: Some hierarchy visible but hero not clearly dominant
- 3-4: Flat naming -- all features feel equally weighted
- 1-2: No hierarchy; random assortment of names

**Naming Variety (15%)**
- 9-10: Multiple naming structures used; each name feels fresh
- 7-8: Good variety; 2-3 different patterns across features
- 5-6: Some variety but dominant pattern covers 60%+ of names
- 3-4: Nearly all names follow same structure
- 1-2: Copy-paste pattern; "[X] for [Y]" for every feature

**Standalone Test (10%)**
- 9-10: Every name passes standalone test -- no context needed ever
- 7-8: Most pass; one may be borderline
- 5-6: Half pass standalone, half need context
- 3-4: Most names need context to make sense
- 1-2: Names are meaningless without accompanying description

**Micro-Script Quality (10%)**
- 9-10: Every micro-script sells the feature; benefit-forward, concise, specific
- 7-8: Most scripts are strong; one may be description-only (not selling)
- 5-6: Scripts describe features but don't sell benefits
- 3-4: Scripts are too long, too vague, or missing benefit
- 1-2: Scripts are paragraph descriptions or missing entirely

**Cohesion as Set (10%)**
- 9-10: All names feel like they belong to the same product family; consistent quality level
- 7-8: Good cohesion; one name may feel slightly out of place
- 5-6: Mixed quality -- some names feel premium, others generic
- 3-4: Names feel random; no consistent naming philosophy
- 1-2: Names could belong to different products entirely

---

## QUALITY GATES

### Gate 2.5 Requirements

| Check | Minimum | Evidence |
|-------|---------|----------|
| Packages generated | 7 | One per competitor |
| All criteria scored | 7 per package | 7 x 7 = 49 scores |
| Top package score | >= 8.0 | Weighted total |
| No critical gaps | None below 6.0 | Per-criterion review |
| Generic names | Zero in top 3 | Generic kill list check |
| Standalone test | All names pass | Per-name verification |
| Human selection received | Yes | Selection recorded |

### Gate Failure Protocol

```
IF packages < 7:
  Re-run generation for missing competitors

IF top package < 8.0:
  Option A: Return to Layer 1-2 for stronger capability analysis
  Option B: Present to human with warning ("Below optimal threshold")

IF generic names detected in top 3:
  BLOCK -- rename generic features in those packages before human selection

IF standalone test failures:
  FLAG specific names that fail, require revision before packaging

IF no human selection:
  BLOCK -- cannot proceed without human input
```

---

## ANTI-SLOP ENFORCEMENT

**Auto-Reject Phrases in Feature Names:**
- Advanced, Premium, Superior, Professional, Ultra, Pro
- Next-Gen, State-of-the-Art, Best-in-Class, Cutting-Edge
- Revolutionary, Game-Changing, Breakthrough
- Technology (alone), System (alone), Solution (alone)

**Auto-Reject Phrases in Micro-Scripts:**
- unlock, harness, leverage, empower, transform
- revolutionary, game-changing, cutting-edge
- experience the power of, discover the secret of
- like never before, takes it to the next level

**Replacement Required:** Every rejected phrase MUST be replaced with specific, concrete language.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial Arena Layer creation: 7-criterion feature-naming judging, caveman-benefit enforcement, generic name detection, standalone test integration, 8.0/10 minimum threshold, human checkpoint. |
