# Learning Log: Schema Distance Framework Enhancement (v4.3)

**Date:** 2026-02-03
**Type:** Big Idea Skill Enhancement
**Scope:** Schema Distance calculation, Transformation Operators, Anchor-to-Distance Ratio
**Affected Skills:** 06-big-idea
**Source Session:** Continuation from compacted context discussing theoretical framework for measuring schema distance

---

## CORE LEARNINGS

### 35. Three-Index Composite (CNI + BCI + LNI) Provides Better SDS Measurement

**Learning:** The original Schema Distance calculation used a simple additive adjustment model (BASE_SCORE = 5, add/subtract for factors). This is too coarse to reliably target the optimal surprise zone.

**New Approach:**
The three-index composite disaggregates schema distance into measurable dimensions:

- **CNI (Claim Novelty Index):** 0-10 scale measuring how frequently similar claims appear in competitor messaging
- **BCI (Belief Contradiction Index):** 0-10 scale measuring how many market truths the claim contradicts
- **LNI (Linguistic Novelty Index):** 0-10 scale measuring vocabulary, framing, and metaphor novelty

**Formula:**
```
Raw_SDS = (CNI + BCI + LNI) / 3
```

**Why Three Indices:**
A Big Idea can be novel in DIFFERENT ways:
- Novel claim, familiar language (high CNI, low LNI)
- Familiar claim, contrarian angle (low CNI, high BCI)
- Standard angle, fresh metaphor (low CNI, low BCI, high LNI)

Single-score SDS collapses these distinctions. Three-index composite preserves them.

**Action:** Implemented in 3.7-schema-distance-calculator.md with full scoring rubrics for each index.

---

### 36. Information Gap Calibration (IGC) Based on Loewenstein's Curiosity Gap Theory

**Learning:** Raw schema distance doesn't account for whether the gap is RESOLVABLE. Loewenstein's research shows curiosity requires both gap awareness AND perceived resolution path.

**IGC Factors:**
1. **Gap Openness:** Does the Big Idea open clear information gaps? (not too obvious, not too obscure)
2. **Resolution Signal:** Does the Big Idea signal resolution is possible? (prevents abandonment)
3. **Bridge Elements:** Are there familiar elements anchoring the novel claim? (prevents confusion)

**Calibration Effect:**
```
Calibrated_SDS = Raw_SDS × (IGC / 5)
```

- IGC = 5: No change (neutral calibration)
- IGC < 5: REDUCES effective SDS (gap too unclear or resolution path too obscure)
- IGC > 5: AMPLIFIES effective SDS (clear gap with strong resolution signal)

**Implication:** A Big Idea with Raw_SDS = 8 but IGC = 3 becomes Calibrated_SDS = 4.8 — the lack of resolution pathway reduces its effective surprise.

**Action:** IGC calculation integrated into 3.7-schema-distance-calculator.md.

---

### 37. Optimal Zone Shifts from 4-8 to 3.6-5.6 (Calibrated)

**Learning:** When IGC calibration is applied, the optimal zone shifts. The original 4-8 range assumed perfect resolution accessibility. With calibration factored in:

| Old Range (Raw) | New Range (Calibrated) | Why |
|-----------------|------------------------|-----|
| SD < 4: Reject | cSDS < 3.6: Reject | After IGC, truly too conventional |
| SD 4-8: Accept | cSDS 3.6-5.6: Accept | Optimal engagement zone with calibration |
| SD > 8: Flag | cSDS > 5.6: Flag | Even with good IGC, high risk |

**Why the Range Narrowed:**
The original 4-8 range was based on raw distance without resolution consideration. When we account for resolution path quality, the effective "surprise that works" range is narrower than intuition suggests.

**Action:** Updated all gating logic to use calibrated SDS with new thresholds.

---

### 38. Six Transformation Operators for Systematic SDS Optimization

**Learning:** When a Big Idea candidate falls below the optimal SDS zone, there was no systematic method to increase schema distance. Transformation Operators provide structured approaches.

**The Six Operators:**

| Operator | Definition | SDS Impact |
|----------|------------|------------|
| **INVERSION** | Flip accepted wisdom to opposite claim | +2.0-3.0 CNI, +2.0-3.0 BCI |
| **HIDDEN VARIABLE** | Introduce unexpected causal factor | +1.5-2.5 CNI, +1.0-2.0 BCI |
| **CATEGORY VIOLATION** | Cross niche boundaries for fresh perspective | +2.0-3.0 CNI, +1.5-2.5 LNI |
| **TEMPORAL SHIFT** | Challenge timing assumptions | +1.0-2.0 CNI, +1.0-1.5 BCI |
| **SCALE SHIFT** | Challenge quantity assumptions | +1.0-2.0 CNI, +0.5-1.5 BCI |
| **VILLAIN REFRAME** | Recast trusted element as antagonist | +2.0-3.0 BCI, +1.5-2.5 LNI |

**Why Operators:**
Rather than vague instruction to "make it more surprising," operators provide concrete transformations with predictable SDS impact.

**Constraint:**
Transformation MUST preserve FSSIT resonance core. If an operator increases SDS but destroys emotional connection, it fails.

**Action:** Implemented in 2.7-transformation-operators.md with selection criteria and application examples.

---

### 39. Anchor-to-Distance Ratio (ADR) Quantifies Resolution Accessibility

**Learning:** The original Resolution Accessibility check was qualitative ("Can audience 'get' this in <3 seconds?"). ADR quantifies the relationship between anchoring strength and schema distance.

**Five Anchoring Dimensions:**

| Dimension | What It Measures | Max Score |
|-----------|-----------------|-----------|
| **Authority Anchoring** | Recognized sources, credentials, institutional backing | 10 |
| **Evidence Anchoring** | Specificity, verifiability, demonstration potential | 10 |
| **Linguistic Anchoring** | Familiar vocabulary, category-appropriate framing | 10 |
| **Social Anchoring** | Testimonials, case studies, tribal validation | 10 |
| **Incremental Anchoring** | Logical bridges, stepping stones, gradual reveals | 10 |

**ADR Formula:**
```
ADR = Total_Anchoring_Score / (Calibrated_SDS × 10)
```

**Interpretation:**
| ADR Range | RA Score | Status |
|-----------|----------|--------|
| < 0.8 | 1-3 | DANGER: Insufficient anchoring |
| 0.8-1.2 | 4-5 | Borderline |
| 1.2-2.0 | 6-8 | OPTIMAL |
| > 2.0 | 9-10 | Over-anchored (safe but may reduce SDS impact) |

**Why ADR Matters:**
High SDS with low anchoring = confusion
Moderate SDS with strong anchoring = optimal engagement
Low SDS with any anchoring = insufficient surprise

ADR ensures the system accounts for this balance quantitatively.

**Action:** Implemented in 3.8-anchor-distance-ratio.md with full scoring rubrics.

---

## PATTERN FLAGS FOR FUTURE REFERENCE

### Raw SDS Overconfidence Pattern
**Symptom:** Big Idea scored SD 7 on raw calculation but fails in testing
**Cause:** No IGC calibration — gap wasn't resolvable despite being surprising
**Prevention:** Always use Calibrated_SDS, never Raw_SDS for gating decisions

### Operator Without Resonance Pattern
**Symptom:** Transformation increases SDS but Big Idea loses FSSIT connection
**Cause:** Operator applied without checking resonance preservation
**Prevention:** FSSIT-compatibility check required before operator application

### Anchoring Deficit Pattern
**Symptom:** High SDS Big Idea consistently confuses test audiences
**Cause:** ADR below 0.8 — surprise exceeds anchoring capacity
**Prevention:** Calculate ADR before proceeding; add anchors if below threshold

### Over-Anchored Safety Pattern
**Symptom:** Big Idea scores well but feels "too safe" or "obvious"
**Cause:** ADR > 2.0 — excessive anchoring mutes surprise effect
**Prevention:** If ADR > 2.0, consider increasing SDS via Transformation Operators

---

## TECHNICAL TERMS DEFINED

| Term | Definition |
|------|------------|
| **CNI (Claim Novelty Index)** | 0-10 scale measuring claim frequency vs. competitors |
| **BCI (Belief Contradiction Index)** | 0-10 scale measuring market truth contradictions |
| **LNI (Linguistic Novelty Index)** | 0-10 scale measuring vocabulary/framing/metaphor novelty |
| **IGC (Information Gap Calibration)** | 0-10 scale based on Loewenstein's Curiosity Gap Theory |
| **Calibrated SDS** | Schema Distance after IGC calibration: Raw_SDS × (IGC / 5) |
| **Transformation Operator** | Structured technique for systematically increasing SDS |
| **ADR (Anchor-to-Distance Ratio)** | Total anchoring divided by calibrated SDS; optimal 1.2-2.0 |
| **Anchoring Dimension** | Category of evidence/familiarity that supports surprise resolution |

---

## NEW MICROSKILLS CREATED

| Microskill | Layer | Purpose |
|------------|-------|---------|
| 3.7-schema-distance-calculator.md | Layer 3 | Three-index composite calculation with IGC calibration |
| 2.7-transformation-operators.md | Layer 2 | Six operators for systematic SDS optimization |
| 3.8-anchor-distance-ratio.md | Layer 3 | ADR calculation for quantified Resolution Accessibility |

---

## INTEGRATION POINTS UPDATED

1. **BIG-IDEA-AGENT.md** — Version updated to 4.3; Microskill Layers table expanded; Schema Distance Calculation section rewritten to reference 3.7; Resolution Accessibility section rewritten to reference 3.8; FSSIT-First Generation Protocol updated to include Transformation Operators; Version History updated

2. **FSSIT-First Protocol** — Step 3 (Layer in Schema Violation) now includes:
   - Transformation Operator application when Raw_SDS < 4.0
   - FSSIT-compatibility verification after transformation
   - Documentation of operators applied

3. **Schema Distance Gating** — Thresholds updated:
   - Reject below 3.6 (calibrated)
   - Accept 3.6-5.6 (calibrated)
   - Flag above 5.6 (calibrated)

---

## RECOMMENDED SYSTEM CHANGES

| Priority | Change | Based On |
|----------|--------|----------|
| CRITICAL | Use Calibrated_SDS for all gating | Learning #37 |
| CRITICAL | Apply Transformation Operators when SDS low | Learning #38 |
| HIGH | Calculate ADR before accepting high-SDS candidates | Learning #39 |
| HIGH | Include IGC in all SDS calculations | Learning #36 |
| MEDIUM | Train operators application on FSSIT preservation | Learning #38 |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-03 | Initial learning log for Schema Distance Framework enhancement |

