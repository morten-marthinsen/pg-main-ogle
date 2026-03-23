# LP-14: CTA Copy Optimizer — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-14-cta-optimizer
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-14 has six specific failure modes — all related to the deceptive simplicity of CTA copy. Models treat CTAs as trivially short and rush through generation without applying the same rigor used for headlines or leads:

1. **Generic CTA Copy:** AI defaults to "Click Here", "Buy Now", "Learn More" without emotional specificity. These are the lowest-converting CTAs possible. Every CTA must contain a benefit reference, proof anchor, or audience language — not a generic command.

2. **Missing Threading:** CTA copy does not reference the page's primary promise or mechanism from LP-07. The CTA is the closing of the loop opened by the headline. If the headline promises "deeper sleep in 7 days" and the CTA says "Order Now," the threading is broken.

3. **Candidate Collapse:** AI generates 3-4 CTA variants and presents them as sufficient. The 3-lens x 2-round + audience evaluation system exists because the first few candidates are almost always generic. 9+ candidates minimum.

4. **P.S. That Introduces New Information:** P.S. copy should RESTATE the strongest benefit and remind of the guarantee. It should NOT introduce a new mechanism, a new benefit, a new proof point, or any claim not already present on the page. P.S. is a recency-bias anchor, not a new pitch.

5. **Human Gate Bypass:** AI creates CTA_SELECTION.yaml itself (auto-selects CTAs) without human input. The human selection gate is critical because CTA preference is deeply contextual and taste-driven.

6. **Urgency Fabrication:** AI adds "Limited Time!" or "Act Now!" to CTAs without justified urgency from LP-13. If LP-13 did not produce urgency data, the CTA CANNOT contain urgency language. Fabricated urgency destroys trust.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `packages-loaded.md` | Layer 1 |
| After Layer 0 | `cta-architecture-loaded.md` | Layer 1 |
| After Layer 0 | `specimens-loaded.md` | Layer 1 |
| After Layer 1 | `cta-type-plan.md` | Layer 2 |
| After Layer 1 | `ps-strategy.md` | Layer 2.3 |
| After Layer 2 | `primary-cta-candidates.md` — with >= 9 candidates and scores | Human checkpoint |
| After Layer 2 | `ps-copy-draft.md` | Human checkpoint |
| After Layer 2 | `final-close-draft.md` | Human checkpoint |
| **BLOCKING** | `CTA_SELECTION.yaml` — written by human | Layer 3 |
| After Layer 3 | `anti-slop-scan.md` — shows PASS | Layer 4 |
| After Layer 3 | `cta-audit.md` — shows score >= 7.5 | Layer 4 |
| Output | `cta-copy-package.json` | All downstream |
| Output | `CTA-COPY-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF CTA_SELECTION.yaml DOES NOT EXIST -> LAYER 3 CANNOT BEGIN. PERIOD.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Primary CTA candidates | >= 9 total (3 lenses x 3 minimum) | HALT — generate more |
| CTA button text length | 3-8 words | HALT — shorten or revise |
| Surrounding context length | Max 2 sentences | HALT — cut to 2 sentences |
| CTA scoring minimum | >= 7.0 weighted to qualify | Discard below-threshold candidates |
| Specificity score per candidate | >= 6.0 | Discard generic CTAs |
| Emotional appeal coverage | >= 5 of 6 types in final set | HALT — generate missing types |
| P.S. new claims | 0 new claims | HALT — rewrite P.S. to restate only |
| CTA audit score | >= 7.5/10 | HALT — revise until met |
| AI telltales | 0 in all copy | HALT — remove every instance |
| Final close threading | Must reference LP-07 anchor | HALT — revise final close |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "I generated 5 CTAs — that's sufficient" | Minimum is 9 (3 lenses x 3). 5 is not 9. |
| "The CTA selection seems obvious, I'll choose for efficiency" | CTA_SELECTION.yaml must be written by human. Auto-selection is a protocol violation. |
| "Buy Now is simple and direct — it works" | "Buy Now" has zero emotional specificity, zero benefit reference, zero threading. It fails Specificity scoring. |
| "The P.S. adds important context the reader needs" | P.S. restates only. If the information is not already on the page, it belongs in the body copy, not the P.S. |
| "Limited Time adds urgency" | Only LP-13-validated urgency can appear in CTAs. "Limited Time" without a deadline is fabricated urgency. |
| "Click Here is clear and simple" | "Click Here" is banned. It tells the reader nothing about what they get. Specificity score = 1. |
| "The button text is 10 words but reads naturally" | 8-word maximum for button text is a hard limit. Revise to 8 or fewer. |
| "My CTAs reference the product — that threads to the headline" | Threading requires referencing LP-07's `threading_anchors.primary_hook_phrase` or `promise_statement` — not just the product name. |
| "Urgency is implied by the offer structure" | Implied urgency is not urgency copy. Only explicit, justified urgency from LP-13 qualifies. |

---

## PRIMARY CTA CANDIDATE REQUIREMENTS

Before presenting to human, verify `primary-cta-candidates.md` contains:

```yaml
CTA-CANDIDATE-MC-CHECK:
  total_candidates_generated: "[count — must be >= 9]"
  lens_1_converter_candidates: "[count — must be >= 3]"
  lens_2_empath_candidates: "[count — must be >= 3]"
  lens_3_skeptic_candidates: "[count — must be >= 3]"

  all_candidates_scored: "[Y/N]"
  all_6_criteria_scored_per_candidate: "[Y/N]"

  candidates_disqualified:
    specificity_failures: "[count]"
    length_violations: "[count]"
    slop_words: "[count]"

  top_candidates_qualified: "[count — must be >= 6]"
  top_all_above_7.0: "[Y/N]"

  emotional_appeals_covered:
    confidence_desire: "[Y/N]"
    consequence_awareness: "[Y/N]"
    urgency: "[Y/N — only if LP-13 data exists]"
    social_proof: "[Y/N]"
    value: "[Y/N]"
    specificity: "[Y/N]"
  appeals_covered_count: "[count — target >= 5]"

  any_slop_words_in_candidates: "[Y/N — if Y, revise before presenting]"
  all_button_text_3_to_8_words: "[Y/N]"

  IF total < 9: HALT -- generate additional candidates
  IF any_slop_words = Y: HALT -- remove slop, regenerate if needed
  IF all_button_text_3_to_8_words = N: HALT -- shorten violating candidates
```

---

## P.S. COPY VALIDATION

Before presenting P.S. copy to human, verify:

```yaml
PS-VALIDATION-CHECK:
  ps_1_exists: "[Y/N]"
  ps_1_restates_benefit: "[Y/N — must be Y]"
  ps_1_introduces_new_claim: "[Y/N — must be N]"
  ps_1_sentence_count: "[count — must be 2-4]"
  ps_1_includes_cta: "[Y/N — must be Y]"

  ps_2_exists: "[Y/N — optional]"
  ps_2_type: "[urgency | scarcity — must reference LP-13]"
  ps_2_introduces_new_claim: "[Y/N — must be N]"

  ps_3_exists: "[Y/N — optional]"
  ps_3_type: "[authority | social_proof]"
  ps_3_introduces_new_claim: "[Y/N — must be N]"

  any_new_claims_in_ps: "[Y/N — if Y, rewrite P.S.]"

  IF any_new_claims = Y: HALT -- P.S. MUST only restate
```

---

## FINAL CLOSE THREADING VERIFICATION

Before presenting final close to human, verify:

```yaml
FINAL-CLOSE-THREADING-CHECK:
  lp07_hook_phrase: "[exact phrase from hero-section-package.json threading_anchors]"
  lp07_promise_statement: "[exact statement from hero-section-package.json]"

  final_close_references_hook: "[Y/N — must be Y]"
  hook_reference_quote: "[the exact sentence in final close that references the hook]"

  final_close_references_promise: "[Y/N — must be Y]"
  promise_reference_quote: "[the exact sentence]"

  addresses_final_hesitation: "[Y/N — must be Y]"
  hesitation_type: "[guarantee | proof | risk_removal | social_proof]"

  sentence_count: "[count — must be 3-5]"

  IF final_close_references_hook = N: HALT -- rewrite to thread back to LP-07
  IF sentence_count > 5: HALT -- cut to 5 sentences max
```

---

## CTA_SELECTION.YAML AUTHENTICATION

Before beginning Layer 3, verify the selection file is human-created:

```yaml
SELECTION-AUTHENTICATION-CHECK:
  file_exists: "[Y/N]"
  selected_by_field: "[must read 'human' -- if 'auto' or 'system' -> HALT]"
  primary_cta_button_text: "[must be non-empty]"
  ps_1_text: "[must be non-empty]"
  final_close_text: "[must be non-empty]"
  modification_notes_present: "[Y/N -- even 'Use as-is' counts]"

  IF file_exists = N: HALT -- present candidates to human, await file creation
  IF selected_by != human: HALT -- cannot proceed with auto-selection
  IF primary_cta_button_text empty: HALT -- incomplete selection
```

---

## THREE-FILE OUTPUT REQUIREMENT

LP-14 is NOT complete until all three exist:

```
[ ] cta-copy-package.json -- EXISTS
[ ] cta-copy-package.json -- Contains: primary CTA, secondary CTAs, P.S. copy, final close, micro-CTAs, emotional appeal tags, audit score
[ ] cta-copy-package.json -- CTA audit score field shows >= 7.5
[ ] CTA-COPY-SUMMARY.md -- EXISTS
[ ] CTA-COPY-SUMMARY.md -- Contains: selected primary CTA + rationale, all candidate table, emotional appeal coverage, threading verification, audit score
[ ] execution-log.md -- EXISTS
[ ] execution-log.md -- Shows CTA_SELECTION.yaml existed before Layer 3 began

IF ANY CHECKBOX UNCHECKED -> LP-14 IS NOT COMPLETE
```

---

## CTA-COPY-SUMMARY.MD REQUIRED SECTIONS

```markdown
# [Product Name] -- CTA Copy Summary

## Page Type: [Type A | Type B | Hybrid]

## Selected Primary CTA
Button text: "[text]"
Context text: "[text or None]"
Emotional appeal: [type name]
Score: [X.X/10] | Lens: [Lens name]

## Secondary CTAs
| Position | Button Text | Appeal Type |
|----------|------------|-------------|
| Above-fold | [text] | [type] |
| Mid-page | [text] | [type] |
| Post-proof | [text] | [type] |
| Post-testimonial | [text] | [type] |

## P.S. Copy
P.S. #1: "[text]" -- Restates: [benefit name]
P.S. #2: "[text or: Skipped]" -- Type: [urgency/scarcity or: N/A]
P.S. #3: "[text or: Skipped]" -- Type: [authority/proof or: N/A]

## Final Close Paragraph
"[full text]"
Threading reference: "[exact phrase that echoes LP-07 hook]"
Hesitation addressed: [guarantee | proof | risk_removal | social_proof]

## Micro-CTAs
[count] inline CTAs for between-section placement

## Emotional Appeal Coverage
| Appeal Type | Covered | Where |
|------------|---------|-------|
| Confidence/Desire | [Y/N] | [position] |
| Consequence Awareness | [Y/N] | [position] |
| Urgency | [Y/N] | [position — or: N/A no LP-13 data] |
| Social Proof | [Y/N] | [position] |
| Value | [Y/N] | [position] |
| Specificity | [Y/N] | [position] |
Coverage: [X/6]

## All Primary CTA Candidates
| ID | Lens | Button Text | Appeal | Score |
|----|------|------------|--------|-------|
[table]

## Audit
CTA audit score: [X.X/10]
Anti-slop: [PASS]
Emotional appeal coverage: [X/6]
All button text 3-8 words: [Y/N]
Threading verified: [Y/N]

## Downstream Handoffs
CTA copy package feeds: LP-15 (Page Assembly)
```

---

## SKILL-SPECIFIC MC-CHECK (Run Before Every Major Execution)

```yaml
LP-14-MC-CHECK:
  trigger: "[before_generation | before_human_checkpoint | before_layer_3 | before_output]"

  pre_generation:
    specimens_loaded: "[Y/N]"
    upstream_packages_loaded: "[Y/N]"
    cta_architecture_loaded: "[Y/N]"
    lp07_threading_anchors_extracted: "[Y/N]"
    lp13_urgency_data_available: "[Y/N | N/A -- if N/A, no urgency CTAs allowed]"

  pre_human_checkpoint:
    primary_cta_count: "[must be >= 9]"
    all_candidates_scored: "[Y/N]"
    all_button_text_3_to_8_words: "[Y/N]"
    ps_copy_restates_only: "[Y/N]"
    final_close_threads_to_lp07: "[Y/N]"
    emotional_appeal_coverage: "[X/6 -- target >= 5]"

  pre_layer_3:
    cta_selection_yaml_exists: "[Y/N]"
    selected_by_human: "[Y/N]"
    IF N: HALT -- do not begin Layer 3

  rushing_detection:
    generating_fewer_than_9_candidates: "[Y/N]"
    auto_selecting_best_cta: "[Y/N]"
    ps_introducing_new_claims: "[Y/N]"
    fabricating_urgency_without_lp13: "[Y/N]"
    skipping_specimen_load: "[Y/N]"
    using_generic_button_text: "[Y/N]"

  IF any rushing = Y: STOP -- execute skipped step properly
  result: "[PROCEED | PAUSE | HALT]"
```
