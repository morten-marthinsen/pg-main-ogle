# Headline Arena Layer (Layer 2.5)

**Version:** 2.1
**Created:** 2026-02-05
**Position:** Between Layer 2 (Headline Generation) and Layer 3 (Headline Refinement)
**Personas:** See [ARENA-PERSONA-PANEL.md](../../~system/protocols/ARENA-PERSONA-PANEL.md)

> **Arena Mode:** `generative_full_draft` — Competitors write COMPLETE pieces from scratch using upstream packages. Layer 2 draft = reference material, not template. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 2-round + audience evaluation execution protocol.

---

## PURPOSE

The Arena Layer transforms single-perspective headline development into multi-perspective competition. Seven competitors each generate their complete headline package, which are then judged against headline-specific criteria to surface the strongest candidate.

**The Problem It Solves:**
- AI tendency toward generic headlines that lack stopping power
- Headlines disconnected from Big Idea's core expression
- Curiosity gaps that are too weak or too confusing
- Schema distance miscalibrated (too conventional or too bizarre)
- Headlines that don't connect naturally to lead architecture
- Specificity missing (vague instead of concrete)
- Headlines that promise benefits the proof can't support

---

## QUALITY STANDARD

```
╔══════════════════════════════════════════════════════════════════════════════╗
║  MINIMUM QUALITY THRESHOLD: 8.5/10 WEIGHTED SCORE                            ║
║                                                                               ║
║  This is NON-NEGOTIABLE. Headlines that score below 8.5 will fail to stop    ║
║  prospects and the entire campaign collapses at first contact.               ║
║                                                                               ║
║  7.0-7.5 is INSUFFICIENT for this skill. Headlines are the ad for the ad.    ║
║  80% of the battle is won or lost in the headline. 8.5+ is mandatory.        ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## LAYER POSITION

```
Layer 0: Foundation (Upstream Loading, Vault Intelligence, Specimen Decomposition)
Layer 1: Headline Architecture (Big Idea Distillation, Pattern Selection, Curiosity Design)
Layer 2: Headline Generation (Formula, Vault-Inspired, Schema-Violation, Candidate Scoring)
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         LAYER 2.5: ARENA                                     │
│                                                                              │
│  2.5.1: Multi-Perspective Generation (7 competitor headline packages)       │
│  2.5.2: Judging Round (7 headline-specific criteria)                         │
│  2.5.3: Ranking & Rationale (Top 3 with evidence)                           │
│  2.5.4: Human Selection Checkpoint (BLOCKING)                               │
└─────────────────────────────────────────────────────────────────────────────┘
    │
    ▼
Layer 3: Headline Refinement (Power Words, Specificity, Subheadlines, Lead Connection)
Layer 4: Selection & Packaging
```

---

## ZERO ABBREVIATION MANDATE

```
╔══════════════════════════════════════════════════════════════════════════════╗
║  CRITICAL: COMPLETE EXECUTION REQUIRED                                       ║
║                                                                               ║
║  This Arena Layer MUST be executed in its ENTIRETY.                          ║
║  • All 7 competitor headline packages MUST be fully generated                ║
║  • All 7 criteria MUST be scored for ALL candidates (49 scores total)        ║
║  • All evidence MUST be documented — no "see above" references               ║
║  • All scoring rubrics MUST be applied with full justification               ║
║                                                                               ║
║  ABBREVIATION IS FORBIDDEN. If context is limited, request continuation.     ║
║  Incomplete Arena execution = SKILL FAILURE.                                 ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 2-round + audience evaluation execution protocol.**

> **Effort Level:** All generation phases use `effort: max`. Critique uses `effort: high`. See ~system/SYSTEM-CORE.md Effort Protocol.
> **Agent Team Mode:** When Agent Teams enabled, each persona runs as a separate teammate agent with full-draft generation in its own 200K context. See `~system/protocols/ARENA-CORE-PROTOCOL.md` v2.0 Agent Team Execution Mode.

This skill uses `arena_mode: generative_full_draft`:
- **Competitors write COMPLETE pieces from scratch** — NOT variations of a Layer 2 draft
- Layer 2 draft output = reference material and structural guide, NOT a template
- Upstream packages (root cause, mechanism, promise, big idea, structure) are the primary input
- Competitors are NOT constrained to follow the Layer 2 draft's specific approach
- **7 competitors** (6 personas + The Architect) generating independently
- **Adversarial critique** before scoring (The Critic identifies at most ONE weakest element per output; may report no_material_weakness if output is genuinely strong)
- **Targeted revision** (each competitor fixes their identified weakness)
- **2 rounds** of competition with audience evaluation + analytical briefs between rounds
- **Post-arena synthesis** (Layer 2.6) creating 2-3 phrase-level hybrids
- **Human selection** from 9-10 candidates (7 pure + 2-3 hybrids)

### Full-Draft Mode Specifics
- Each competitor generates their OWN complete version from the upstream strategic packages
- The Layer 2 draft is available as ONE reference among many, not THE template
- Competitors may take radically different approaches (different structure, different emphasis, different tone)
- This produces TRUE creative diversity, not minor variations

### What Stays Skill-Specific (Below)
- 7 judging criteria with weights (used by both The Critic and the Judge)
- Persona generation instructions for this skill
- Critique-specific guidance for this skill
- Quality thresholds
- Anti-slop enforcement
- Input/output requirements

---

## HEADLINE JUDGING CRITERIA

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Stopping Power** | 20% | Would this headline make a scrolling prospect STOP? Does it demand attention? |
| **Curiosity Gap Strength** | 20% | Is the gap strong enough to compel reading but resolvable? Not too weak, not too obscure? |
| **Specificity** | 15% | Concrete elements present? Numbers, timeframes, outcomes? Not vague or generic? |
| **Big Idea Expression** | 15% | Does headline express or imply the Big Idea? Is the core message present? |
| **Schema Distance Calibration** | 10% | 6-7 optimal. Too conventional (< 5) or too bizarre (> 8) fails. Right surprise level? |
| **TIER1 Pattern Match** | 10% | Does structure match elite TIER1 vault patterns? Demonstrates headline sophistication? |
| **Lead Connection Quality** | 10% | Is connection to lead clear? Gap resolution timing logical? Emotional arc continues? |

### Scoring Protocol

```
FOR each candidate:
  FOR each criterion:
    Score 1-10 using rubric below
    Provide SPECIFIC evidence for score (no vague justifications)
    Flag if below minimum (6.0)

  Calculate weighted_total = sum(score * weight)

  Document:
    - Strongest elements (with evidence)
    - Weakest elements (with evidence)
    - Critical gaps (any criterion below 6.0)
```

### Scoring Rubric

**Stopping Power (20%)**
- 9-10: Impossible to scroll past; demands attention; visceral reaction
- 7-8: Strong stop; would pause and read; compelling
- 5-6: Moderate interest; might read; not urgent
- 3-4: Weak; easy to scroll past; blends into noise
- 1-2: Invisible; zero stopping power; generic

**Curiosity Gap Strength (20%)**
- 9-10: Irresistible gap; MUST know the answer; perfectly calibrated
- 7-8: Strong curiosity; want to know more; clear gap
- 5-6: Some curiosity; mildly interesting; weak gap
- 3-4: Little curiosity; can live without knowing; no real gap
- 1-2: Zero curiosity; no gap created; or gap too confusing to engage

**Specificity (15%)**
- 9-10: Multiple concrete elements: number + timeframe + specific outcome
- 7-8: Two concrete elements present; good specificity
- 5-6: One concrete element; some specificity
- 3-4: Mostly vague; generic terms; "better results" language
- 1-2: Completely vague; no concrete elements; pure generics

**Big Idea Expression (15%)**
- 9-10: Big Idea perfectly compressed; core message unmistakable; one-sentence Big Idea
- 7-8: Big Idea clearly expressed or strongly implied
- 5-6: Big Idea somewhat present; connection requires inference
- 3-4: Big Idea weak or disconnected; headline doesn't serve Big Idea
- 1-2: No Big Idea connection; headline and Big Idea are unrelated

**Schema Distance Calibration (10%)**
- 9-10: Schema distance 6-7 (optimal zone); perfect surprise without confusion
- 7-8: Schema distance 5-6 or 7-8 (acceptable); slight under/over
- 5-6: Schema distance 4-5 or 8-9 (borderline); too conventional or too extreme
- 3-4: Schema distance < 4 (too conventional) or > 9 (too bizarre)
- 1-2: Schema distance completely miscalibrated; confusing or invisible

**TIER1 Pattern Match (10%)**
- 9-10: Structure matches elite TIER1 headlines exactly; demonstrates mastery
- 7-8: Strong pattern alignment; recognizable quality
- 5-6: Some pattern elements; generic structure
- 3-4: Little alignment with proven patterns; amateur structure
- 1-2: No recognizable pattern; structural weakness

**Lead Connection Quality (10%)**
- 9-10: Crystal clear connection; gap resolution timing perfect; emotional arc seamless
- 7-8: Good connection; lead path clear; emotional continuity
- 5-6: Connection exists but requires work; lead path unclear
- 3-4: Weak connection; headline and lead feel disconnected
- 1-2: No connection; headline is dead end; lead can't pick up

### Critique-Specific Guidance

**What The Critic should particularly target in Headline Arena:**
- Headlines that tell the whole story (no curiosity gap)
- Schema distance outside optimal 6-7 range
- Missing Big Idea expression in headline
- Subheadlines that repeat headline content instead of complementing
- Specificity gaps (vague promises, missing numbers/timeframes)

---

## QUALITY GATES

### Gate 2.5 Requirements

| Check | Minimum | Evidence |
|-------|---------|----------|
| Candidates generated | 7 | One per competitor |
| All criteria scored | 7 per candidate | 7 × 7 = 49 scores |
| Top candidate score | ≥ 8.5 | Weighted total (elevated threshold) |
| No critical gaps | None below 6.0 | Per-criterion review |
| Schema distance calibrated | All in 4-9 range | Schema check |
| Curiosity gap present | All candidates | Gap defined for each |
| Human selection received | Yes | Selection recorded |

### Gate Failure Protocol

```
IF candidates < 7:
  Re-run generation for missing competitors

IF any criterion unscored:
  Complete judging before proceeding

IF top candidate < 8.5:
  Option A: Return to Layer 1-2 for stronger generation
  Option B: Present to human with warning ("Below optimal threshold")

IF critical gaps exist:
  Flag gaps in presentation to human
  Human decides whether to proceed or iterate

IF schema distance miscalibrated:
  Flag for calibration in Layer 3 refinement

IF curiosity gap missing:
  BLOCK — cannot present candidate without curiosity architecture

IF no human selection:
  BLOCK — cannot proceed without human input
```

---

## INTEGRATION WITH BIG IDEA

The Headline Arena has unique constraint: **headline must express the Big Idea**.

### Big Idea Expression Enforcement

```
FOR each persona generation:
  BEFORE generating:
    Load big-idea-package.json
    Extract core expression and campaign thesis
  DURING generation:
    Headline MUST express or imply the Big Idea
    Core promise MUST be present
    Mechanism hint SHOULD be present (if mechanism-forward headline)
  AFTER generation:
    Verify Big Idea connection is explicit or strongly implicit
    REJECT any headline that doesn't serve the Big Idea

ANY candidate with weak Big Idea expression (< 6.0) requires explanation
```

### Promise Ceiling Protocol

```
IF headline promises beyond proof ceiling:
  Option A: Weaken headline promise to match available proof
  Option B: Flag for human acknowledgment (risk documented)
  Option C: Add qualifier language while maintaining stopping power

NEVER allow headline to make claims the body copy cannot prove
```

---

## ANTI-SLOP ENFORCEMENT

Headlines have ZERO TOLERANCE for slop words. This list applies to ALL Arena generation:

**Auto-Reject Phrases:**
- revolutionary, game-changing, breakthrough, cutting-edge
- unlock, discover the secret, transform your life
- amazing, incredible, unbelievable, mind-blowing
- you won't believe, one weird trick, doctors hate

**Replacement Required:**
Every rejected phrase MUST be replaced with specific, concrete language before candidate can be scored.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-02-05 | AGENT TEAMS + EFFORT PROTOCOL: Added effort level and Agent Team mode references to execution protocol. See ~system/protocols/ARENA-CORE-PROTOCOL.md v2.0 and ~system/SYSTEM-CORE.md. |
| 2.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0: Added arena_mode: generative_full_draft (competitors write complete pieces from scratch, not variations of Layer 2 draft). Replaced Phase 1-4 execution protocol with reference to ~system/protocols/ARENA-CORE-PROTOCOL.md (2-round + audience evaluation mandatory competition, adversarial critique-revise, 7 competitors including The Architect, analytical briefs). Added critique-specific guidance. Updated all competitor counts from 6 to 7. Version bump. |
| 1.0 | 2026-02-03 | Initial Arena Layer creation with 6-persona generation, 7-criterion headline-specific judging, Big Idea expression enforcement, 8.5/10 minimum threshold, human checkpoint |
