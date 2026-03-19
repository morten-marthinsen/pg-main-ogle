# Editorial Arena Layer (Layer 2.5)

**Version:** 1.0
**Created:** 2026-03-09
**Position:** Between Layer 2 (Editorial Revision) and Layer 4 (Scoring & Packaging)
**Personas:** See `../../~system/protocols/ARENA-PERSONA-PANEL.md`

> **Arena Mode:** `editorial_revision` -- Competitors generate COMPLETE editorial revision packages applied to assembled copy. They edit, they do NOT rewrite.

---

## PURPOSE

The Arena Layer transforms single-perspective editorial revision into multi-perspective competition. Seven competitors each produce a complete editorial revision package for ALL sections of the assembled e-commerce copy. Each revision must demonstrate scan optimization improvement, proof strengthening, design note completeness, and feature naming consistency -- all while staying within the 30% word-change limit that defines editorial versus rewrite.

---

## QUALITY STANDARD

```
+==============================================================================+
|  MINIMUM QUALITY THRESHOLD: 8.0/10 WEIGHTED SCORE                           |
|                                                                              |
|  Editorial is the last line of defense before the page goes live.            |
|  Every revision must tighten, not bloat. Edit, not rewrite.                  |
|  Proof stays. Feature names stay. Scan optimization improves.                |
|  8.0+ is mandatory.                                                          |
+==============================================================================+
```

---

## LAYER POSITION

```
Layer 0: Foundation (Assembled Copy, Specimens, Strategy)
Layer 1: Audit (Scan Optimization, Proof Density)
Layer 2: Revision (Editorial Revision, Design Note Completeness)
    |
    v
+-----------------------------------------------------------------------------+
|                         LAYER 2.5: ARENA                                    |
|  7 competitors generate complete editorial revision packages                |
+-----------------------------------------------------------------------------+
    |
    v
Layer 4: Scoring & Packaging (Quality Score, Feature Consistency, Output)
```

---

## ZERO ABBREVIATION MANDATE

```
+==============================================================================+
|  All 7 competitor packages MUST include revisions for ALL flagged sections.  |
|  All 7 criteria MUST be scored for ALL candidates.                           |
|  ABBREVIATION IS FORBIDDEN.                                                  |
+==============================================================================+
```

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 2-round + audience evaluation execution protocol.**

---

## EDITORIAL REVISION JUDGING CRITERIA

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Scan Optimization Improvement** | 25% | Did the revision measurably improve scan performance? Headers tightened, key phrases bolded, paragraphs shortened? |
| **Proof Preservation & Strengthening** | 20% | Are all original proof elements preserved? Were weak proofs strengthened without removal? |
| **Edit Precision** | 15% | Are changes surgical and targeted? Word-change ratio under 30%? No wholesale rewrites? |
| **Design Note Completeness** | 15% | Are all design notes actionable? Layout, mobile, and visual specs present for every section? |
| **Feature Name Consistency** | 10% | Are all EC-01 feature names used exactly? Zero paraphrasing, shortening, or invention? |
| **Slop Reduction** | 10% | Did the revision remove slop words? Were replacements specific and concrete, not generic? |
| **Word Budget Discipline** | 5% | Did the revision maintain or reduce word counts? No bloating during edit? |

### Scoring Rubric

**Scan Optimization Improvement (25%)**
- 9-10: Every section scans perfectly in 3 seconds; revision transformed scanability
- 7-8: Most sections improved; 1-2 already optimized, no regressions
- 5-6: Some sections improved; others unchanged; no clear methodology
- 3-4: Minimal scan improvement; revisions focused elsewhere
- 1-2: Scan optimization not addressed; sections still read as paragraphs

**Proof Preservation & Strengthening (20%)**
- 9-10: All proofs preserved; weak proofs strengthened with specifics; additional proofs added
- 7-8: All proofs preserved; most strengthened
- 5-6: All proofs preserved; no strengthening attempted
- 3-4: Some proofs weakened or diluted during revision
- 1-2: Proofs removed "to tighten copy" -- REJECT

**Edit Precision (15%)**
- 9-10: Surgical edits; every change has clear purpose; well under 30% change threshold
- 7-8: Targeted edits; near but under 30% change ratio
- 5-6: Edits somewhat scattered; approaching 30% threshold
- 3-4: Sections partially rewritten; over 30% in some sections
- 1-2: Wholesale rewrite disguised as editorial -- REJECT

**Design Note Completeness (15%)**
- 9-10: Every section has layout + mobile + visual specs; notes ready for page builder
- 7-8: Most sections complete; 1-2 need minor detail
- 5-6: Half of sections have complete notes; others vague
- 3-4: Most notes vague ("nice layout" level)
- 1-2: Design notes missing or placeholder

---

## QUALITY GATES

### Gate 2.5 Requirements

| Check | Minimum | Evidence |
|-------|---------|----------|
| Packages generated | 7 | One per competitor |
| All criteria scored | 7 per package | 49 scores total |
| Top package score | >= 8.0 | Weighted total |
| Word change < 30% | Per section | Change ratio audit |
| All proofs preserved | Yes | Proof count match |
| Feature names exact | Yes | EC-01 match |
| No slop introduced | Yes | Lexicon scan |
| Human selection | Received | BLOCKING |

---

## EDITORIAL-SPECIFIC ARENA CONSTRAINTS

```yaml
editorial_arena_rules:
  INPUT: All competitors receive SAME assembled copy from EC-05
  INPUT: All competitors receive SAME audit findings from Layer 1
  INPUT: All competitors receive SAME design note gaps from Layer 2

  CONSTRAINT: Competitors EDIT the existing copy -- they do NOT generate new copy
  CONSTRAINT: Word change ratio tracked per section -- over 30% = auto-fail
  CONSTRAINT: Feature names from EC-01 are LOCKED -- cannot be modified
  CONSTRAINT: Proof elements from EC-03 CANNOT be removed
  CONSTRAINT: Section structure from EC-05 CANNOT be reorganized

  DIFFERENTIATION: Competitors differentiate on:
    - HOW they tighten sentences (word choice precision)
    - HOW they improve scan optimization (formatting strategy)
    - HOW they strengthen proof (repositioning, adding context)
    - HOW they complete design notes (layout specificity)
    - WHAT slop words they catch and HOW they replace them
```

---

## ANTI-SLOP ENFORCEMENT

**Auto-Reject Phrases:**
- unlock, harness, leverage, empower, transform
- revolutionary, game-changing, cutting-edge, next-level
- dive deep, holistic, synergy, paradigm, elevate
- curated, seamless, robust, comprehensive (without specific meaning)

**Editorial-Specific Auto-Reject:**
- "This reads better as..." (rewrite rationalization)
- "The proof slows things down..." (proof removal rationalization)
- "A stronger name would be..." (feature renaming rationalization)

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial Arena Layer: 7-criterion editorial revision judging, edit precision enforcement, proof preservation requirement, scan optimization focus, design note completeness, 30% word-change limit, 8.0/10 minimum threshold. |
