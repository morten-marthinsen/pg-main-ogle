# LP-05: Social Proof Architecture — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-05-social-proof-architecture
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-05 has five specific failure modes:

1. **Proof Desert:** No proof in the first 25% of the page. Visitors encounter headline, lead, story, and root cause with zero credibility signals. Trust erodes before the mechanism section even begins. Cold traffic bounces. Early proof anchoring (20-Point Checklist item 09) is a data-backed conversion lever — skipping it is a measurable revenue loss.

2. **Proof Type Monotony:** All testimonials, no authority signals, no data, no before/afters. One-dimensional proof fails sophisticated audiences who need multiple evidence types to believe. Minimum 3 different proof types across the page. Variety is not a luxury — it maps to different skepticism modes (social validation, clinical validation, authority validation, visual transformation).

3. **Type A/B Pattern Conflation:** Applying Type B review cascade patterns to a Type A long-form page (or vice versa). Type A uses a wave pattern — light early, heavy at proof blocks, light mid, heavy pre-close. Type B uses immediate volume — rating strip above fold, review cascade mid-page. These architectures serve different visitor decision processes. Mixing them produces a Frankenstein page that serves neither.

4. **Volume Threshold Miss:** Fewer than 15 testimonials for Type A, fewer than 50 reviews for Type B (20-Point Checklist item 10). Insufficient proof volume signals "new product" or "unproven product" to visitors. Volume IS the message — sparse proof communicates doubt regardless of individual testimonial quality.

5. **Generic Proof Planning:** "Add testimonials here" without specifying count, type, quality standard, or format. LP-10 receives zero actionable guidance. The proof section gets written as generic "Great product!" filler. Every planned proof element must specify: type code, count, format, quality requirement (specific outcomes/numbers), and content source (available or requires_sourcing).

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `brief-and-sequence-loaded.md` | Layer 1 |
| After Layer 0 | `proof-inventory.md` | Layer 1 |
| After Layer 0 | `specimen-proof-patterns.md` | Layer 1 |
| After Layer 1 | `proof-classification.md` | Layer 2 |
| After Layer 1 | `volume-requirements.md` | Layer 2 |
| After Layer 1 | `wave-pattern-selection.md` | Layer 2 |
| After Layer 1 | `proof-gap-analysis.md` | Layer 2 |
| After Layer 2 | `proof-placement-plan.md` | Layer 3 |
| After Layer 2 | `proof-density-map.md` | Layer 3 |
| After Layer 2 | `proof-type-sequence.md` | Layer 3 |
| After Layer 2 | `proof-format-direction.md` | Layer 3 |
| After Layer 3 | `architecture-validation.md` (score >= 7.0/8) | Layer 4 |
| After Layer 3 | `coverage-audit.md` | Layer 4 |
| Output | `proof-architecture.json` | LP-10, LP-15, LP-17 |
| Output | `PROOF-ARCHITECTURE-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST -> THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Architecture score | >= 7.0/8 | HALT -- revise until met |
| Early trust proof | Proof within first 25% of page | HALT -- add early proof signal |
| Volume threshold (Type A) | >= 15 testimonials planned | HALT -- increase volume or switch to AUTHORITY_SUBSTITUTION mode |
| Volume threshold (Type B) | >= 50 reviews planned | HALT -- increase volume or flag critical gap |
| Proof type diversity | >= 3 different proof types | HALT -- add missing types |
| Specific outcomes | All testimonials require outcomes/numbers | HALT -- add quality requirements |
| Wave pattern match | Pattern matches page type | HALT -- re-select correct pattern |
| Section coverage | Every section has explicit proof spec | HALT -- complete missing specs |
| No vague assignments | Zero "add testimonials" without specifics | HALT -- specify count, type, format, quality |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "The lead section doesn't need proof — it's too early" | 20-Point Checklist item 09: proof within first 25% of page. Early authority signals are conversion-backed. |
| "Testimonials are all the proof we need" | Proof type monotony. Clinical studies rank #1 for health. Expert endorsements rank #2 overall. Text testimonials rank #6. |
| "The page is Type A so reviews don't apply" | Type A still needs 15+ testimonials. Reviews can supplement dedicated proof blocks. |
| "There aren't enough testimonials so we'll skip proof blocks" | Switch to AUTHORITY_SUBSTITUTION mode. Expert endorsements, performance guarantees, and media mentions substitute for testimonial volume. Do NOT eliminate proof. |
| "I'll let LP-10 figure out the format" | LP-05 must specify format direction per slot. LP-10 writes copy against that direction. |
| "Generic testimonials are fine as placeholders" | Every testimonial must include specific outcomes/numbers (20-Point Checklist item 11). "Great product!" is not a testimonial — it is noise. |
| "The proof architecture looks balanced without the audit" | The 8-point validation and coverage audit must run explicitly. Visual inspection is insufficient. |
| "This Type B page needs a Type A proof wave" | Type A and Type B proof architectures serve different decision processes. If Hybrid is needed, declare Hybrid — do not graft one pattern onto the other. |

---

## WAVE PATTERN VERIFICATION

Before writing `proof-placement-plan.md`, verify the wave pattern matches the page type:

```yaml
WAVE-PATTERN-CHECK:
  page_type: "[from page-brief.json]"
  wave_pattern_selected: "[type_a_wave | type_b_wave | hybrid_wave]"

  VALID_COMBINATIONS:
    type_a: [type_a_wave]
    type_b: [type_b_wave]
    hybrid: [hybrid_wave]

  pattern_valid_for_type: "[Y/N]"
  IF N: HALT -- re-select wave pattern matching page type
```

---

## PROOF DESERT DETECTION

A "proof desert" is any zone of the page spanning 3+ consecutive sections with NO proof elements. Run this check on the completed section proof map:

```yaml
PROOF-DESERT-CHECK:
  sections_checked: "[total sections]"

  consecutive_no_proof_zones:
    - zone_1: "[section range — e.g., sections 3-5]"
      has_proof: "[Y/N]"
    - zone_2: "[next zone]"
      has_proof: "[Y/N]"

  deserts_found: "[count — any zone of 3+ consecutive sections with density = none]"
  IF deserts_found > 0: HALT -- add proof element to break the desert

  first_proof_position: "[section number]"
  first_25_percent_section: "[section number — total_sections * 0.25]"
  early_trust_present: "[Y/N — first_proof_position <= first_25_percent_section]"
  IF early_trust_present = N: HALT -- add early proof signal
```

---

## PROOF MONOTONY DETECTION

Check that the architecture uses at least 3 different proof types:

```yaml
PROOF-MONOTONY-CHECK:
  proof_types_used:
    - type: "[code]"
      count_across_page: "[number]"
    - type: "[code]"
      count_across_page: "[number]"
    [all types used]

  unique_types_count: "[number]"
  diversity_check: "[PASS (>= 3 types) | FAIL (< 3 types)]"
  IF FAIL: HALT -- add proof types from hierarchy (clinical_study, expert_endorsement, before_after, photo_testimonial, volume_signal, text_testimonial)

  dominant_type: "[code that has highest count]"
  dominant_percentage: "[% of total proof touches]"
  over_concentration: "[Y/N — dominant_percentage > 70%]"
  IF over_concentration = Y: FLAG -- consider diversifying proof types
```

---

## VOLUME THRESHOLD VERIFICATION

```yaml
VOLUME-CHECK:
  page_type: "[type_a | type_b | hybrid]"

  IF type_a:
    testimonials_planned: "[count]"
    threshold: 15
    check: "[PASS | FAIL]"

  IF type_b:
    reviews_planned: "[count]"
    threshold: 50
    check: "[PASS | FAIL]"

  IF hybrid:
    testimonials_planned: "[count]"
    testimonial_threshold: 10
    reviews_planned: "[count]"
    review_threshold: 25
    check: "[PASS | FAIL]"

  IF any check = FAIL: HALT -- increase planned volume or switch proof mode
```

---

## THREE-FILE OUTPUT REQUIREMENT

LP-05 is NOT complete until all three exist:

```
[ ] proof-architecture.json -- EXISTS
[ ] proof-architecture.json -- Has: proof_strategy (mode + wave_pattern), section_proof_map (every section), volume_targets, proof_gaps, architecture_score (>= 7.0)
[ ] proof-architecture.json -- Type A: >= 15 testimonials planned, wave pattern = type_a_wave
[ ] proof-architecture.json -- Type B: >= 50 reviews planned, wave pattern = type_b_wave
[ ] proof-architecture.json -- All proof elements have: type, count, format, quality_requirement
[ ] PROOF-ARCHITECTURE-SUMMARY.md -- EXISTS
[ ] PROOF-ARCHITECTURE-SUMMARY.md -- Contains: proof mode, wave pattern, per-section proof map, volume totals, gap list, architecture score
[ ] execution-log.md -- EXISTS
[ ] execution-log.md -- Shows all microskills executed with spec files read
[ ] execution-log.md -- Shows validation score and coverage audit results

IF ANY CHECKBOX UNCHECKED -> LP-05 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
LP-05-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  page_brief_loaded: "[Y/N]"
  section_sequence_loaded: "[Y/N]"
  page_type_confirmed: "[type_a | type_b | hybrid]"
  proof_inventory_documented: "[Y/N]"

  # Rushing detection
  applying_wrong_wave_pattern_for_type: "[Y/N]"
  assigning_proof_without_specifics: "[Y/N]"
  skipping_early_trust_anchoring: "[Y/N]"
  using_only_one_proof_type: "[Y/N]"
  planning_generic_testimonials: "[Y/N]"
  skipping_validation_or_audit: "[Y/N]"

  IF any rushing_detection = Y: STOP -- execute the skipped step
  result: "[PROCEED | PAUSE | HALT]"
```

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| Proof desert | 3+ consecutive sections with density = none, OR no proof in first 25% of page | Add authority signal or volume proof to break the desert | HALT if no proof assets available for early placement -- escalate to human for proof sourcing |
| Proof type monotony | Fewer than 3 distinct proof types across full architecture | Add proof types from hierarchy (prioritize highest-ranked available types) | If only 1-2 proof types exist in inventory, switch to AUTHORITY_SUBSTITUTION mode |
| Type A/B conflation | Wave pattern code does not match page type classification | Re-select correct wave pattern | HALT -- re-read page-brief.json page_type and apply correct pattern |
| Volume threshold miss | Type A < 15 testimonials OR Type B < 50 reviews planned | Increase planned volume; if inventory insufficient, flag as PROOF_GAP with severity | If inventory has < 5 testimonials total, switch to AUTHORITY_SUBSTITUTION mode and flag critical gap |
| Generic proof planning | Any proof element lacks count, type, format, or quality requirement | Rewrite element spec with all four required attributes | If unable to specify quality requirements, proof type may not be available -- flag for sourcing |
