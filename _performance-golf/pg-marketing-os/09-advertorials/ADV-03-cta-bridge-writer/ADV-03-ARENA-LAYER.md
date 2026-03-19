# CTA & Bridge Arena Layer (Layer 2.5)

**Version:** 1.0
**Created:** 2026-03-09
**Position:** Between Layer 2 (Bridge Generation) and Layer 4 (Validation)
**Personas:** See `../../~system/protocols/ARENA-PERSONA-PANEL.md`

> **Arena Mode:** `generative_full_draft` -- Competitors write COMPLETE bridge + CTA from scratch.

---

## PURPOSE

The Arena Layer generates competing bridge/CTA approaches from 7 different perspectives. The bridge is where most advertorials fail -- the transition from trusted editorial content to product recommendation. Multi-perspective competition ensures the bridge feels natural from multiple reader viewpoints.

**The Problem It Solves:**
- AI defaults to sales close patterns in bridge
- Bridge that works for one audience may alienate another
- Single-perspective bridges miss the most natural transition angle
- CTA language drifts toward direct-response patterns
- Transition gradient too steep (editorial -> sales in one sentence)

---

## QUALITY STANDARD

```
+============================================================================+
|  MINIMUM QUALITY THRESHOLD: 8.0/10 WEIGHTED SCORE                          |
|                                                                             |
|  The bridge is the most delicate section. It must feel like a natural       |
|  recommendation from a trusted source, not a pivot to selling.             |
|  Anything below 8.0 will feel "off" to the reader.                         |
+============================================================================+
```

---

## LAYER POSITION

```
Layer 0: Foundation (Strategy + Body + Specimen Loading)
Layer 1: Architecture (Bridge Frame Selection, Transition Planning)
Layer 2: Generation (Bridge + CTA Candidates)
    |
    v
+-----------------------------------------------------------------------+
|                         LAYER 2.5: ARENA                                |
|  2.5.1: Multi-Perspective Generation (7 competitor bridges)            |
|  2.5.2: Judging Round (7 bridge-specific criteria)                     |
|  2.5.3: Ranking & Rationale (Top 3 with evidence)                     |
|  2.5.4: Human Selection Checkpoint (BLOCKING)                         |
+-----------------------------------------------------------------------+
    |
    v
Layer 4: Validation (Recommendation Tone, Single CTA, Packaging)
```

---

## ZERO ABBREVIATION MANDATE

```
+============================================================================+
|  All 7 competitors generate full bridge + CTA.                             |
|  All 7 criteria scored for all candidates.                                 |
|  ABBREVIATION IS FORBIDDEN.                                                |
+============================================================================+
```

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 2-round + audience evaluation protocol.**

### What Stays Skill-Specific (Below)

---

## BRIDGE/CTA JUDGING CRITERIA

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Recommendation Authenticity** | 25% | Does bridge feel like genuine recommendation, not sales pitch? |
| **Transition Smoothness** | 20% | Is the shift from body editorial to bridge seamless? No visible seam? |
| **CTA Restraint** | 15% | Exactly 1 CTA? Text link format? No urgency? No "Buy Now"? |
| **Voice Consistency** | 15% | Does bridge maintain the editorial voice from body? |
| **Bridge Frame Quality** | 10% | Does the selected frame (discovery/recommendation/expert/community) work? |
| **Reader Trust Preservation** | 10% | Would reader feel respected, not manipulated? |
| **Specimen Pattern Match** | 5% | Does bridge structure match proven advertorial bridge patterns? |

### Scoring Rubric

**Recommendation Authenticity (25%)**
- 9-10: Feels exactly like a friend recommending something they found; zero sales pressure
- 7-8: Reads as genuine recommendation; minor promotional undertones
- 5-6: Recommendation present but sales intent visible
- 3-4: Thin recommendation veneer over obvious sales pitch
- 1-2: Direct sales pitch; no recommendation framing

**Transition Smoothness (20%)**
- 9-10: No visible seam; reader flows from body to bridge without noticing shift
- 7-8: Smooth transition; slight shift detectable by careful reader
- 5-6: Noticeable transition; reader feels shift but continues
- 3-4: Abrupt; clear shift from article to ad; jarring
- 1-2: Completely disconnected; body and bridge feel like different pieces

**CTA Restraint (15%)**
- 9-10: Single text link, perfectly placed, reads as natural part of sentence
- 7-8: Single text link, appropriate placement
- 5-6: Single CTA but slightly prominent or styled
- 3-4: Multiple CTAs or button-style formatting
- 1-2: Aggressive multi-CTA with urgency/button styling

**Voice Consistency (15%)**
- 9-10: Same voice as body; unified piece
- 7-8: Mostly consistent; minor shifts
- 5-6: Some drift; bridge feels different from body
- 3-4: Significant drift; clearly different voice
- 1-2: Complete voice change; bridge is direct-response copy

**Bridge Frame Quality (10%)**
- 9-10: Frame fits perfectly; feels natural for the narrative
- 7-8: Frame works well; appropriate choice
- 5-6: Frame adequate; could be better
- 3-4: Frame feels forced; wrong choice for content
- 1-2: No coherent frame; random transition

**Reader Trust Preservation (10%)**
- 9-10: Reader feels respected and informed; trust fully maintained
- 7-8: Trust maintained; reader not uncomfortable
- 5-6: Trust borderline; reader might feel slightly manipulated
- 3-4: Trust damaged; reader feels tricked
- 1-2: Trust destroyed; reader feels deceived

**Specimen Pattern Match (5%)**
- 9-10: Matches elite specimen bridge patterns exactly
- 7-8: Strong alignment with proven patterns
- 5-6: Some alignment; generic approach
- 3-4: Little alignment
- 1-2: No pattern alignment

---

## QUALITY GATES

### Gate 2.5 Requirements

| Check | Minimum | Evidence |
|-------|---------|----------|
| Candidates generated | 7 | One per competitor |
| All criteria scored | 7 per candidate | 49 total scores |
| Top candidate score | >= 8.0 | Weighted total |
| CTA count per candidate | Exactly 1 | CTA audit |
| CTA format | Text link | Format check |
| Sales language absent | Zero instances | Language scan |
| Human selection | Yes | Selection recorded |

---

## ANTI-SLOP ENFORCEMENT

**Auto-Reject Phrases:**
- Buy now, Order today, Add to cart, Get yours, Claim your
- Don't miss, Act fast, Limited time, While supplies last
- What are you waiting for, You deserve this, Click here to buy
- Rush my order, Yes I want this, Sign me up

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial Arena: recommendation authenticity focus, transition smoothness, CTA restraint scoring, 8.0 minimum |
