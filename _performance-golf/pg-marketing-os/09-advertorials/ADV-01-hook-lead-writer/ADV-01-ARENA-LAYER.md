# Hook & Lead Arena Layer (Layer 2.5)

**Version:** 1.0
**Created:** 2026-03-09
**Position:** Between Layer 2 (Hook/Lead Generation) and Layer 4 (Validation)
**Personas:** See `../../~system/protocols/ARENA-PERSONA-PANEL.md`

> **Arena Mode:** `generative_full_draft` -- Competitors write COMPLETE hook/lead combinations from scratch using upstream strategy. Layer 2 drafts = reference material, not template.

---

## PURPOSE

The Arena Layer transforms single-perspective hook/lead development into multi-perspective competition. Seven competitors each generate their complete hook + lead combination, which are then judged against advertorial-specific criteria to surface the strongest scroll-stopping, editorially-authentic opening.

**The Problem It Solves:**
- AI tendency toward generic "article-style" openings lacking stopping power
- Hooks that tell instead of tease (revealing too much too early)
- Leads that drift into promotional voice within first 2-3 sentences
- Editorial voice that reads as "trying to sound editorial" rather than being editorial
- Hook/lead disconnect (hook promises something lead doesn't deliver)
- Platform-unaware hooks that exceed character limits
- Curiosity gaps too weak to sustain reading into body copy

---

## QUALITY STANDARD

```
+============================================================================+
|  MINIMUM QUALITY THRESHOLD: 8.0/10 WEIGHTED SCORE                          |
|                                                                             |
|  This is NON-NEGOTIABLE. Advertorial hooks compete against editorial        |
|  content in native feeds. A hook scoring below 8.0 will be scrolled past,   |
|  and the entire advertorial investment is wasted.                           |
|                                                                             |
|  The hook is the ad for the advertorial. If it fails, nothing else matters. |
+============================================================================+
```

---

## LAYER POSITION

```
Layer 0: Foundation (Strategy Loading, Specimen Calibration, Validation)
Layer 1: Architecture (Hook Formula Selection, Lead Structure Planning)
Layer 2: Generation (Hook Candidates, Lead Paragraphs)
    |
    v
+-----------------------------------------------------------------------+
|                         LAYER 2.5: ARENA                                |
|                                                                         |
|  2.5.1: Multi-Perspective Generation (7 competitor hook/lead combos)  |
|  2.5.2: Judging Round (7 advertorial-specific criteria)                |
|  2.5.3: Ranking & Rationale (Top 3 with evidence)                     |
|  2.5.4: Human Selection Checkpoint (BLOCKING)                         |
+-----------------------------------------------------------------------+
    |
    v
Layer 4: Validation (Scroll-Stop Check, Editorial Voice Check, Packaging)
```

---

## ZERO ABBREVIATION MANDATE

```
+============================================================================+
|  CRITICAL: COMPLETE EXECUTION REQUIRED                                      |
|                                                                             |
|  This Arena Layer MUST be executed in its ENTIRETY.                         |
|  - All 7 competitor hook/lead combinations MUST be fully generated          |
|  - All 7 criteria MUST be scored for ALL candidates (49 scores total)       |
|  - All evidence MUST be documented -- no "see above" references             |
|  - All scoring rubrics MUST be applied with full justification              |
|                                                                             |
|  ABBREVIATION IS FORBIDDEN. If context is limited, request continuation.    |
|  Incomplete Arena execution = SKILL FAILURE.                                |
+============================================================================+
```

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 3-round execution protocol.**

This skill uses `arena_mode: generative_full_draft`:
- **Competitors write COMPLETE hook/lead combinations from scratch**
- Upstream strategy is the primary input (type, angle, voice, constraints)
- Layer 2 drafts are reference material, not templates
- Each competitor generates hook + 3-5 lead paragraphs independently
- **7 competitors** (6 personas + The Architect)
- **3 rounds** of competition with adversarial critique
- **Post-arena synthesis** creating 2-3 hybrid combinations
- **Human selection** from 9-10 candidates

### What Stays Skill-Specific (Below)
- 7 judging criteria with weights
- Advertorial-specific generation constraints
- Editorial voice enforcement in judging
- Scroll-stop quality in judging

---

## HOOK/LEAD JUDGING CRITERIA

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Scroll-Stop Power** | 20% | Would this hook make a native-feed scroller STOP? Does it demand attention without clickbait? |
| **Editorial Authenticity** | 20% | Does this read like a genuine article opening, not an ad? Would it pass in a real publication? |
| **Curiosity Creation** | 15% | Does the hook create a specific, compelling gap the reader needs to close? |
| **Voice Consistency** | 15% | Does the voice register stay locked from hook through lead? No register drift? |
| **Platform Compliance** | 10% | Within character limits? Meets platform-specific requirements? |
| **Specimen Pattern Match** | 10% | Does structure match proven advertorial specimen patterns? |
| **Body Connection Quality** | 10% | Does lead create natural momentum into body copy? Reader wants to continue? |

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
    - Editorial smell test result (PASS/FAIL with reasoning)
```

### Scoring Rubric

**Scroll-Stop Power (20%)**
- 9-10: Impossible to scroll past in native feed; demands attention; visceral reaction
- 7-8: Strong stop; would pause and read; compelling opening
- 5-6: Moderate interest; might read if topic relevant
- 3-4: Weak; blends into feed; easy to scroll past
- 1-2: Invisible; zero stopping power; generic article opening

**Editorial Authenticity (20%)**
- 9-10: Indistinguishable from genuine editorial content; passes smell test completely
- 7-8: Reads as article; slight polish needed; mostly authentic
- 5-6: Some editorial elements but ad DNA visible; sophisticated readers would spot it
- 3-4: Reads as ad dressed up as article; thin editorial veneer
- 1-2: Obvious ad; no editorial disguise; promotional from first word

**Curiosity Creation (15%)**
- 9-10: Irresistible gap; MUST read on; perfectly calibrated to topic
- 7-8: Strong curiosity; want to read more; clear gap
- 5-6: Some curiosity; mildly interesting; weak gap
- 3-4: Little curiosity; can live without reading further
- 1-2: Zero curiosity; hook tells the whole story or fails to tease

**Voice Consistency (15%)**
- 9-10: Perfect voice lock from hook through lead; zero drift; one unified voice
- 7-8: Strong consistency; minor fluctuations; recognizable voice throughout
- 5-6: Some consistency but drift detected; voice shifts between hook and lead
- 3-4: Significant drift; hook and lead feel like different writers
- 1-2: No consistency; hook is editorial, lead is promotional (or vice versa)

**Platform Compliance (10%)**
- 9-10: Fully compliant; optimized for platform; leverages platform conventions
- 7-8: Compliant; meets requirements; no violations
- 5-6: Mostly compliant; minor issues fixable
- 3-4: Several compliance issues; would need significant revision
- 1-2: Non-compliant; would be rejected by platform

**Specimen Pattern Match (10%)**
- 9-10: Structure matches elite advertorial specimens exactly; demonstrates mastery
- 7-8: Strong pattern alignment; recognizable quality markers
- 5-6: Some pattern elements; generic structure
- 3-4: Little alignment with proven patterns
- 1-2: No recognizable pattern; amateur structure

**Body Connection Quality (10%)**
- 9-10: Crystal clear path to body; reader pulled forward; narrative momentum irresistible
- 7-8: Good connection; body path clear; reader likely to continue
- 5-6: Connection exists but requires work; transition unclear
- 3-4: Weak connection; lead and body feel disconnected
- 1-2: Dead end; reader has no reason to continue past lead

---

## QUALITY GATES

### Gate 2.5 Requirements

| Check | Minimum | Evidence |
|-------|---------|----------|
| Candidates generated | 7 | One per competitor |
| All criteria scored | 7 per candidate | 7 x 7 = 49 scores |
| Top candidate score | >= 8.0 | Weighted total |
| No critical gaps | None below 6.0 | Per-criterion review |
| Editorial smell test | All pass | Smell test per candidate |
| Product name absent | Zero in hooks | Hook text review |
| Human selection | Yes | Selection recorded |

### Gate Failure Protocol

```
IF candidates < 7:
  Re-run generation for missing competitors

IF top candidate < 8.0:
  Option A: Return to Layer 1-2 for stronger generation
  Option B: Present to human with warning ("Below optimal threshold")

IF editorial smell test fails:
  BLOCK -- cannot present candidate that smells like an ad

IF product name in hook:
  BLOCK -- remove product name, re-score

IF no human selection:
  BLOCK -- cannot proceed without human input
```

---

## ANTI-SLOP ENFORCEMENT

**Auto-Reject Phrases:**
- Are you tired of, In today's fast-paced world, What if I told you
- Picture this, Imagine a world where, Have you ever wondered
- Revolutionary, game-changing, breakthrough, cutting-edge
- Unlock, discover the secret, transform your life
- Amazing, incredible, unbelievable, mind-blowing

**Replacement Required:**
Every rejected phrase MUST be replaced with specific, editorial-voice language before candidate can be scored.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial Arena Layer: 7-criteria judging, editorial authenticity focus, scroll-stop enforcement, 8.0 minimum threshold, full scoring rubrics |
