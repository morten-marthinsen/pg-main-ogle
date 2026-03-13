# Section Copy Arena Layer (Layer 2.5)

**Version:** 1.0
**Created:** 2026-03-09
**Position:** Between Layer 2 (Copy Generation) and Layer 4 (Validation)
**Personas:** See `../../~system/protocols/ARENA-PERSONA-PANEL.md`

> **Arena Mode:** `generative_full_draft` -- Competitors generate COMPLETE section copy packages from scratch.

---

## PURPOSE

The Arena Layer transforms single-perspective section writing into multi-perspective competition. Seven competitors each generate copy for ALL active BTF sections, judged against ecom-specific criteria emphasizing scan optimization, proof density, and section independence.

---

## QUALITY STANDARD

```
+==============================================================================+
|  MINIMUM QUALITY THRESHOLD: 8.0/10 WEIGHTED SCORE                           |
|                                                                              |
|  Section copy IS the product page. Weak sections = weak conversion.          |
|  Every section must work standalone, include proof, and scan in 3-5s.       |
|  8.0+ is mandatory.                                                          |
+==============================================================================+
```

---

## LAYER POSITION

```
Layer 0: Foundation (Strategy, Features, Crossover Patterns)
Layer 1: Section Architecture (Routing, Proof Planning, Design Notes)
Layer 2: Copy Generation (Section Copy, Proof Embedding)
    |
    v
+-----------------------------------------------------------------------------+
|                         LAYER 2.5: ARENA                                    |
|  7 competitors generate complete BTF section copy packages                  |
+-----------------------------------------------------------------------------+
    |
    v
Layer 4: Validation & Packaging (Standalone Test, Feature Check, Output)
```

---

## ZERO ABBREVIATION MANDATE

```
+==============================================================================+
|  All 7 competitor section packages MUST include ALL active BTF sections.     |
|  All 7 criteria MUST be scored for ALL candidates.                           |
|  ABBREVIATION IS FORBIDDEN.                                                  |
+==============================================================================+
```

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 3-round execution protocol.**

---

## SECTION COPY JUDGING CRITERIA

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Scan Optimization** | 20% | Does every section work when scanned in 3-5 seconds? Headers, bullets, bolded key phrases? |
| **Section Independence** | 20% | Does each section work completely standalone? Shuffle test pass? |
| **Proof Density** | 15% | Is there at least 1 proof element per section? Are proofs specific, not vague? |
| **Feature Consistency** | 15% | Are EC-01 feature names used exactly? No paraphrasing? |
| **Word Budget Compliance** | 10% | Are all sections within their word budgets? |
| **Design Note Quality** | 10% | Are design notes actionable for page builder? Layout, mobile, visuals specified? |
| **Crossover Pattern Usage** | 10% | Are long-form patterns adapted appropriately (condensed, not pasted)? |

### Scoring Rubric

**Scan Optimization (20%)**
- 9-10: Every section instantly communicable in 3-second scan; perfect hierarchy
- 7-8: Most sections scan well; 1-2 require brief reading
- 5-6: Half the sections require reading to understand
- 3-4: Most sections are paragraph blocks; poor scan optimization
- 1-2: Reads like a long-form sales page; zero scan optimization

**Section Independence (20%)**
- 9-10: Perfect shuffle test; every section introduces own context
- 7-8: Nearly all sections standalone; 1 minor reference to another
- 5-6: Some sections reference others; partial dependency
- 3-4: Sections build on each other; narrative flow expected
- 1-2: Sections completely interdependent; reading order required

**Proof Density (15%)**
- 9-10: Every section has strong, specific proof; multiple proof types used
- 7-8: Every section has proof; most are specific
- 5-6: Most sections have proof; some are vague ("studies show")
- 3-4: Some sections lack proof; proof desert emerging
- 1-2: Minimal proof across sections; persuasion without evidence

**Feature Consistency (15%)**
- 9-10: Every feature name matches EC-01 exactly; zero deviations
- 7-8: Almost all match; 1 minor variation
- 5-6: Most match; some paraphrasing detected
- 3-4: Significant inconsistency; feature names modified
- 1-2: Feature names largely ignored or invented

---

## QUALITY GATES

### Gate 2.5 Requirements

| Check | Minimum | Evidence |
|-------|---------|----------|
| Packages generated | 7 | One per competitor |
| All criteria scored | 7 per package | 49 scores total |
| Top package score | >= 8.0 | Weighted total |
| All sections standalone | Yes | Shuffle test |
| All sections have proof | Yes | Proof per section |
| Feature names exact | Yes | EC-01 match |
| Human selection | Received | BLOCKING |

---

## ANTI-SLOP ENFORCEMENT

**Auto-Reject Phrases:**
- unlock, harness, leverage, empower, transform
- revolutionary, game-changing, cutting-edge, next-level
- as mentioned above, as you'll see below, building on that
- studies show (without citation), experts agree (without naming)

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial Arena Layer: 7-criterion section copy judging, scan optimization focus, section independence requirement, proof density enforcement, feature consistency checking, 8.0/10 minimum threshold. |
