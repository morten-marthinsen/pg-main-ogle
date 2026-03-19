# Editorial Review Arena Layer (Layer 2.5)

**Version:** 1.0
**Created:** 2026-03-09
**Position:** Between Layer 2 (Revision Generation) and Layer 4 (Scoring)
**Personas:** See `../../~system/protocols/ARENA-PERSONA-PANEL.md`

> **Arena Mode:** `generative_full_draft` -- Competitors generate COMPLETE editorial revisions of the assembled advertorial.

---

## PURPOSE

The Arena Layer generates competing editorial revisions from 7 different perspectives. Each competitor takes the assembled advertorial and produces their own revised version that addresses the audit findings from Layer 1 while maintaining (or improving) editorial quality.

**The Problem It Solves:**
- Single-perspective editing misses issues visible from other angles
- Editorial revisions can inadvertently introduce new problems
- Different editorial sensibilities catch different weaknesses
- One editor's "improvement" may be another's "degradation"
- Revision quality varies based on approach (aggressive vs conservative editing)

---

## QUALITY STANDARD

```
+============================================================================+
|  MINIMUM QUALITY THRESHOLD: 8.0/10 WEIGHTED SCORE                          |
|                                                                             |
|  This is the FINAL quality gate. The winning revision becomes the          |
|  published advertorial. Nothing below 8.0 should reach publication.        |
+============================================================================+
```

---

## LAYER POSITION

```
Layer 0: Foundation (Assembled Advertorial + Specimens + Strategy)
Layer 1: Auditing (Smell Test, Hook Review)
Layer 2: Revision (Editorial Revisions, Compliance Polish)
    |
    v
+-----------------------------------------------------------------------+
|                         LAYER 2.5: ARENA                                |
|  2.5.1: Multi-Perspective Revision (7 competitor versions)             |
|  2.5.2: Judging Round (7 editorial-specific criteria)                  |
|  2.5.3: Ranking & Rationale (Top 3 with evidence)                     |
|  2.5.4: Human Selection Checkpoint (BLOCKING)                         |
+-----------------------------------------------------------------------+
    |
    v
Layer 4: Scoring (Quality Score, Word Count, Final Packaging)
```

---

## ZERO ABBREVIATION MANDATE

```
+============================================================================+
|  All 7 competitors generate full revised advertorials.                     |
|  All 7 criteria scored for all candidates.                                 |
|  ABBREVIATION IS FORBIDDEN.                                                |
+============================================================================+
```

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 2-round + audience evaluation protocol.**

### What Stays Skill-Specific (Below)

---

## EDITORIAL REVIEW JUDGING CRITERIA

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Editorial Authenticity** | 25% | Does final piece read as genuine editorial content throughout? |
| **Revision Quality** | 20% | Did revisions improve the piece without introducing new issues? |
| **Hook Strength** | 15% | Does hook still stop the scroll in context of full piece? |
| **Voice Unity** | 10% | Is voice perfectly consistent from first word to last? |
| **Proof Integration** | 10% | Are proof elements invisibly woven into narrative? |
| **Bridge Naturalness** | 10% | Does the bridge feel like natural continuation, not pivot? |
| **Compliance Readiness** | 10% | Is piece fully compliant with target platform requirements? |

### Scoring Rubric

**Editorial Authenticity (25%)**
- 9-10: Publication-ready editorial content; indistinguishable from real article
- 7-8: Strong editorial quality; minor tells detectable by experts only
- 5-6: Mixed quality; some sections editorial, some drift toward promotional
- 3-4: Weak editorial quality; reads as advertorial, not article
- 1-2: Obvious advertisement with editorial pretense

**Revision Quality (20%)**
- 9-10: All issues fixed; no new issues introduced; piece elevated
- 7-8: Most issues fixed; minor new issues; net improvement
- 5-6: Some issues fixed but new issues introduced; net neutral
- 3-4: Few issues fixed; several new issues; net negative
- 1-2: Revision made piece worse; significant degradation

**Hook Strength (15%)**
- 9-10: Impossible to scroll past; visceral stopping power in full context
- 7-8: Strong stop; compelling opening that pulls reader in
- 5-6: Moderate interest; might read if topic relevant
- 3-4: Weak; blends into feed content
- 1-2: No stopping power; generic article opening

**Voice Unity (10%)**
- 9-10: One voice from start to finish; no seams anywhere
- 7-8: Nearly unified; minor fluctuations barely detectable
- 5-6: Some voice drift; sections feel slightly different
- 3-4: Noticeable voice changes between sections
- 1-2: Multiple voices; obviously assembled from parts

**Proof Integration (10%)**
- 9-10: Proof woven invisibly; reader absorbs evidence naturally
- 7-8: Well integrated; minor seams around proof elements
- 5-6: Proof present but somewhat forced
- 3-4: Proof feels inserted; breaks narrative flow
- 1-2: Proof stacked or listed; reads as evidence dump

**Bridge Naturalness (10%)**
- 9-10: Bridge feels like inevitable continuation; reader flows into it
- 7-8: Bridge transition smooth; reader continues naturally
- 5-6: Noticeable but acceptable transition
- 3-4: Abrupt shift; reader feels the pivot
- 1-2: Jarring transition; editorial to sales in one sentence

**Compliance Readiness (10%)**
- 9-10: Fully compliant; ready to submit to platform immediately
- 7-8: Mostly compliant; minor adjustments needed
- 5-6: Several compliance issues needing attention
- 3-4: Significant compliance gaps
- 1-2: Non-compliant; would be rejected by platform

---

## QUALITY GATES

### Gate 2.5 Requirements

| Check | Minimum | Evidence |
|-------|---------|----------|
| Candidates generated | 7 | One per competitor |
| All criteria scored | 7 per candidate | 49 total scores |
| Top candidate score | >= 8.0 | Weighted total |
| No revision degradation | All candidates | Before/after comparison |
| Smell test on revisions | All pass | Fresh smell test |
| Human selection | Yes | Selection recorded |

---

## ANTI-SLOP ENFORCEMENT

**Auto-Reject if revision introduces:**
- Any phrase from the Anti-Slop Lexicon
- Promotional language not in original
- Sales urgency not in original
- Additional CTAs beyond the one
- Product name placement earlier than original

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial Arena: editorial authenticity focus, revision quality scoring, 8.0 minimum, revision anti-degradation checks |
