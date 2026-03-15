# Humanization Specimen Library — MANIFEST

**Version:** 1.1
**Created:** 2026-03-15
**Purpose:** Master index for the humanization specimen library. Tracks all specimen sources, engine packs, and loader deployments.
**Authority:** Part of the Humanization Protocol (HUMANIZATION-PROTOCOL.md). System 3 in the Triple-System Specimen Architecture.

---

## ARCHITECTURE

```
~system/humanization-specimens/
  MANIFEST.md                            # This file
  0.3.H-humanization-loader-TEMPLATE.md  # Loader template for all copy-gen skills

  tier-1-controls/
    by-function/                         # PRIMARY index — mirrors skill functions
      hooks/                             # Opening hooks, attention grabbers
      transitions/                       # Section transitions, bridges
      proof-stacking/                    # Evidence layering, credibility building
      emotional-beats/                   # Emotional turning points, audience engagement
      closes/                            # Closing sequences, CTAs, callbacks
      stories/                           # Narrative passages, founder stories
      rhythm/                            # Sentence cadence, varied rhythm examples
      conversational/                    # Natural register, spoken delivery
    by-anti-pattern/                     # SECONDARY cross-reference
      P01-compound-alternatives.md       # Passages countering each anti-pattern
      ... through P12

  client-work-diffs/
    HTKT-v5-v6/specimens.md              # 10 specimens from HTKT v5→v6 human edit
    [future-project]/specimens.md        # Grows with each campaign

  engine-packs/                          # Pre-curated 2-3KB selections per engine
    vsl-pack.md                          # VSL engine (Skills 10-17)
    ecomm-pack.md                        # E-comm engine (EC-01 to EC-04)
    email-pack.md                        # Email engine (E1, E2)
    ads-pack.md                          # Ads engine (A07)
    advertorial-pack.md                  # Advertorial engine (ADV-01 to ADV-03)
    organic-pack.md                      # Organic engine (S08, S09, S11, S13)
    page-builder-pack.md                 # Page builder (LP-07 to LP-14)
    upsell-pack.md                       # Upsell engine (U1-U3)
    checkout-pack.md                     # Checkout engine (CK-01, CK-02)
```

---

## SPECIMEN SOURCES

### Source 1: Client Work Diffs (Active)

Human edits on AI-generated copy. Each diff produces before/after specimens showing structural corrections.

| Project | Editor | Specimens | Status |
|---------|--------|-----------|--------|
| HTKT Transformation Academy v5→v6 | Anthony Flores | 10 | Migrated |

### Source 2: Tier 1 Controls (Pending Phase 2)

Pre-AI human copy from master copywriters. Mined for "distinctly human" passages that score 3+ on the 12 humanization criteria.

| Author | Files Available | Expected Yield | Status |
|--------|----------------|----------------|--------|
| Clayton Makepeace | 4 controls | 15-25 | Pending |
| Gary Halbert | 27 files | 20-30 | Pending |
| Eugene Schwartz | 14 files | 20-35 | Pending |
| David Ogilvy | 30 files | 25-45 | Pending |
| Craig Clemens | 4 files | 8-12 | Pending |
| Gary Bencivenga | 22 files | 15-25 | Pending |

---

## ENGINE PACK DEPLOYMENT

| Engine | Pack File | Copy-Gen Skills | Loader Count | Status |
|--------|-----------|-----------------|--------------|--------|
| 02-long-form-vsl | vsl-pack.md | 10, 11, 12, 13, 14, 15, 16, 17 | 8 | Deployed |
| 03-e-comm | ecomm-pack.md | EC-01, EC-02, EC-03, EC-04 | 4 | Deployed |
| 04-page-builder | page-builder-pack.md | LP-07 through LP-14 | 8 | Deployed |
| 05-upsells | upsell-pack.md | U1, U2, U3 | 3 | Deployed |
| 06-checkout | checkout-pack.md | CK-01, CK-02 | 2 | Deployed |
| 07-emails | email-pack.md | E1, E2 | 2 | Deployed |
| 08-ads | ads-pack.md | A07 | 1 | Deployed |
| 09-advertorials | advertorial-pack.md | ADV-01, ADV-02, ADV-03 | 3 | Deployed |
| 10-organic | organic-pack.md | S08, S09, S11, S13 | 4 | Deployed |
| **TOTAL** | 9 packs | | **35** | **All Deployed** |

---

## EXTRACTION CRITERIA (What Makes a Passage "Distinctly Human")

Score against 12 criteria (inversions of the 12 anti-patterns):

1. Varied sentence cadence (3 words to 25+, no pattern)
2. Non-parallel emphasis (no tricolons)
3. Punchline discipline (strong line → silence, not restatement)
4. Vocal delivery markers (CAPS, italics as speech cues)
5. Natural connective tissue ("because," "so," "and yet")
6. Raw/visceral register where warranted
7. Specific referents (concrete nouns, not "it/things/what")
8. Audience-facing emotion (pulls reader IN, not narrates AT)
9. Trust the reader (teaches once, references later)
10. No forward-promises (delivers without announcing)
11. Callbacks (credibility loops back)
12. Consistent register (one conceptual frame per argument)

**Score 3+ criteria = candidate. Score 5+ = gold.**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-03-15 | Full rollout: all 9 engine packs created, all 35 loaders deployed across every copy-gen skill. Phase 2 (Tier 1 extraction) pending. |
| 1.0 | 2026-03-15 | Initial creation. Directory structure, 10 HTKT specimens migrated, VSL engine pack built, 8 VSL loaders deployed. |
