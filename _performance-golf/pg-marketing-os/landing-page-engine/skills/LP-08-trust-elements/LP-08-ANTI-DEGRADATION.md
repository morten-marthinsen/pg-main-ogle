# LP-08: Trust Element Generator — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-08-trust-elements
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-08 has six specific failure modes — all related to the fact that trust copy is short, seemingly simple, and therefore the most likely element for AI to phone in with generic filler:

1. **Generic Trust Copy:** The #1 failure. AI writes "100% Satisfaction Guaranteed" instead of "365-Day Money-Back Guarantee — No Questions, No Hassle." "Premium Quality" instead of "GMP Certified — Pharmaceutical-Grade Facility." "Doctor Recommended" instead of "'The most bioavailable magnesium I've tested' — Dr. James DiNicolantonio, PharmD, cardiovascular research scientist." Generic trust copy is WORSE than no trust copy — it signals low effort, which is the opposite of trust.

2. **Certification Jargon Without Translation:** AI lists "GMP Certified · NSF Tested · Prop 65 Compliant" as badge copy without explaining what any of it means. The audience does not know what GMP stands for. Certifications without benefit translation are meaningless visual noise. Every certification MUST have a 1–2 sentence explanation that answers "What does this mean FOR ME?"

3. **Volume Signal Rounding:** AI writes "Over a million customers" instead of "1,270,268+ customers since 2019." Rounded numbers signal estimation. Specific numbers signal measurement. The difference in perceived credibility is massive. Always use specific numbers — even slightly less impressive specific numbers outperform rounded larger numbers in trust.

4. **Authority Signal Anonymity:** AI writes "Recommended by leading doctors" or "Backed by health experts" without naming a single person. Anonymous authority is zero authority. Every authority signal MUST include: specific name, specific credential relevant to the product category, specific endorsement statement (quote preferred), and institution/practice.

5. **Trust Bar Overload or Underload:** AI either stuffs 8 signals into the trust bar (cognitive overload — visitor processes none of them) or writes only 1–2 signals (insufficient to establish the credibility strip pattern). Trust bars work at 3–5 signals (Type A) or 4–6 signals (Type B). Outside these ranges, effectiveness drops.

6. **Fabrication:** AI generates media mentions for publications that never covered the brand, invents certifications the product doesn't have, or inflates customer counts. Every trust signal MUST be verifiable against the trust inventory loaded in Layer 0. If a trust signal is not in the inventory, it cannot be in the output.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `packages-loaded.md` | Layer 1 |
| After Layer 0 | `trust-inventory.md` | Layer 1 |
| After Layer 0 | `specimen-trust-patterns.md` | Layer 1 |
| After Layer 1 | `trust-classification.md` | Layer 2 |
| After Layer 1 | `trust-bar-plan.md` | Layer 2 |
| After Layer 1 | `trust-placement-map.md` | Layer 2 |
| After Layer 2 | `trust-bar-copy.md` | Layer 3 |
| After Layer 2 | `media-mention-copy.md` (even if `not_applicable`) | Layer 3 |
| After Layer 2 | `certification-copy.md` (even if `not_applicable`) | Layer 3 |
| After Layer 2 | `badge-copy.md` (even if `not_applicable`) | Layer 3 |
| After Layer 2 | `volume-signal-copy.md` (even if `not_applicable`) | Layer 3 |
| After Layer 2 | `pdp-trust-badge-copy.md` (even if `skipped_type_a`) | Layer 3 |
| After Layer 2 | `pdp-expert-section-copy.md` (even if `skipped_type_a` or `not_applicable`) | Layer 3 |
| After Layer 3 | `trust-validation.md` (score >= 7.0/10) | Layer 4 |
| After Layer 3 | `specificity-audit.md` (PASS) | Layer 4 |
| Output | `trust-elements-package.json` | LP-15, LP-17 |
| Output | `TRUST-ELEMENTS-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST -> THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Trust audit score | >= 7.0/10 | HALT — revise until met |
| Specificity audit | PASS (zero generic signals) | HALT — rewrite every generic signal |
| Anti-slop scan | PASS (zero forbidden words) | HALT — remove every instance |
| Trust bar signal count | 3–5 (Type A) or 4–6 (Type B) | HALT — add or remove signals |
| Trust bar word count per signal | 3–5 words maximum | HALT — shorten to constraint |
| Badge copy word count | 3–7 words maximum | HALT — shorten to constraint |
| Certification explanations | Every certification has benefit translation | HALT — write explanation |
| Authority signal pattern | Name + Credential + Institution + Statement | HALT — complete the pattern |
| Volume signal numbers | SPECIFIC (not rounded) | HALT — replace rounded numbers |
| Factual accuracy | All signals from trust inventory (no fabrication) | HALT — remove fabricated signals |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "100% Satisfaction Guaranteed is what everyone uses" | That is exactly why it is generic and carries zero trust weight. Specify the terms. |
| "The audience knows what GMP means" | They do not. Research shows <5% of supplement buyers can define GMP. Translate it. |
| "Over a million customers sounds more impressive than 1,047,823" | Specific numbers are perceived as more credible. "Over a million" sounds like estimation. |
| "We don't have a named doctor, so 'Recommended by doctors' is acceptable" | Anonymous authority is zero authority. If no named doctor exists, use a different trust element type. |
| "6 words in the trust bar signal is close enough to 5" | The constraint is 3–5 words. 6 words means the signal is not scannable enough. Trim it. |
| "The brand hasn't been featured in media, so I'll note a publication that covers the vertical" | Fabrication. If no media mentions exist, the element is `not_applicable`. Period. |
| "The certifications are listed on the product page, that's sufficient" | Listed without explanation = jargon noise. Every certification needs a benefit translation. |
| "The trust bar already covers trust, we don't need separate badges" | Trust bar and badges serve different psychological functions. Trust bar = scanning credibility. Badges = checkout confidence. Both may be needed. |
| "Volume signals aren't critical for a new product" | Then the element is `not_applicable`. Do not fabricate volume. |
| "The trust audit is 6.5 which is close to 7.0" | 6.5 is not 7.0. Revise until 7.0 is met. Close is not met. |
| "The page is Type A but I'll run 2.6/2.7 anyway since trust badges and expert sections are useful for any page" | 2.6 and 2.7 are PDP-specific — they depend on PDP-03 buy box architecture which does not exist for Type A. Type A trust badges are handled by 2.4, and Type A authority signals are handled by 2.5. Running PDP microskills for Type A will produce copy that references non-existent page architecture. |

---

## SPECIFICITY AUDIT PROTOCOL

The specificity audit tests every individual trust signal against a binary pass/fail:

```yaml
SPECIFICITY-AUDIT:
  elements_tested: "[total count]"

  per_element_check:
    - element_id: "[ID]"
      element_type: "[trust_bar | badge | certification | media | authority | volume | security]"
      copy_text: "[exact text]"
      contains_specific_detail: "[Y/N]"
      specific_detail_type: "[number | name | timeframe | certification_name | institution | none]"
      generic_check: "[PASS (specific) | FAIL (generic)]"

  total_passed: "[count]"
  total_failed: "[count]"
  generic_signals_found: "[list of failed element IDs]"

  audit_result: "[PASS — zero generic signals | FAIL — [count] generic signals]"
  IF FAIL: Each generic signal must be rewritten with specific detail before proceeding
```

**Specificity test:** Can a reader distinguish this trust signal from a generic competitor? If you could swap the brand name and the signal still applies unchanged, it FAILS the specificity test.

---

## ANTI-SLOP SCAN PROTOCOL

```yaml
ANTI-SLOP-SCAN:
  elements_scanned:
    - trust_bar_copy: "[scanned]"
    - media_mention_copy: "[scanned | not_applicable]"
    - certification_copy: "[scanned | not_applicable]"
    - badge_copy: "[scanned | not_applicable]"
    - volume_signal_copy: "[scanned | not_applicable]"
    - authority_signal_copy: "[scanned | not_applicable]"
    - security_signal_copy: "[scanned | not_applicable]"

  category_1_generic_trust_found: "[list or: none]"
  category_2_ai_telltales_found: "[list or: none]"
  category_3_unverifiable_claims_found: "[list or: none]"
  category_4_vague_volume_found: "[list or: none]"
  category_5_empty_credibility_found: "[list or: none]"

  total_forbidden_words_found: "[count]"
  scan_result: "[PASS | FAIL]"
  IF FAIL: List every instance with suggested replacement
```

---

## TRUST BAR VERIFICATION

Before writing trust bar copy, verify the plan:

```yaml
TRUST-BAR-CHECK:
  page_type: "[type_a | type_b | hybrid]"
  signal_count: "[must be 3-5 for Type A, 4-6 for Type B]"
  signal_count_valid: "[Y/N]"

  signals_ordered_by_impact: "[Y/N]"
  position_1_is_risk_removal: "[Y/N — guarantee or strongest differentiator]"

  per_signal_check:
    - position: 1
      type: "[type]"
      source_in_trust_inventory: "[Y/N — must be Y]"
      word_count_target: "[3-5 words]"
    - position: 2
      [same format]
    [all positions]

  IF signal_count_valid = N: HALT — adjust signal count for page type
  IF any source_in_trust_inventory = N: HALT — remove fabricated signal
```

---

## FACTUAL ACCURACY VERIFICATION

Every trust signal must trace back to the trust inventory loaded in Layer 0:

```yaml
FACTUAL-ACCURACY-CHECK:
  total_trust_signals_in_output: "[count]"

  per_signal_verification:
    - signal_id: "[ID]"
      claim_made: "[what the copy claims]"
      inventory_source: "[exact entry in trust-inventory.md that supports this claim]"
      verified: "[Y/N]"

  total_verified: "[count]"
  total_unverified: "[count]"
  unverified_signals: "[list of IDs]"

  check_result: "[PASS — all verified | FAIL — [count] unverified]"
  IF FAIL: Remove or replace every unverified signal. Do NOT proceed with unverified claims.
```

---

## THREE-FILE OUTPUT REQUIREMENT

LP-08 is NOT complete until all three exist:

```
[ ] trust-elements-package.json — EXISTS
[ ] trust-elements-package.json — Has: trust_bar (3-6 signals with 2 variant sets), all applicable trust element types populated
[ ] trust-elements-package.json — validation.trust_audit_score >= 7.0
[ ] trust-elements-package.json — validation.specificity_audit = PASS
[ ] trust-elements-package.json — validation.generic_signals_found = 0
[ ] trust-elements-package.json — All signals traceable to trust inventory (no fabrication)
[ ] TRUST-ELEMENTS-SUMMARY.md — EXISTS
[ ] TRUST-ELEMENTS-SUMMARY.md — Contains: trust element types used, trust bar copy, placement map, audit score, specificity results
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows all microskills executed with spec files read
[ ] execution-log.md — Shows validation score and specificity audit results

IF ANY CHECKBOX UNCHECKED -> LP-08 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
LP-08-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  page_brief_loaded: "[Y/N]"
  proof_architecture_loaded: "[Y/N]"
  trust_inventory_documented: "[Y/N]"
  page_type_confirmed: "[type_a | type_b | hybrid]"

  # Rushing detection
  writing_generic_trust_copy: "[Y/N]"
  listing_certifications_without_explanations: "[Y/N]"
  using_anonymous_authority_signals: "[Y/N]"
  rounding_volume_numbers: "[Y/N]"
  fabricating_trust_signals: "[Y/N]"
  skipping_specificity_audit: "[Y/N]"
  trust_bar_outside_signal_count_range: "[Y/N]"

  IF any rushing_detection = Y: STOP — execute the skipped step
  result: "[PROCEED | PAUSE | HALT]"
```

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| Generic trust copy | Specificity audit finds signals that could apply to any brand unchanged | Rewrite every generic signal with specific detail (number, name, timeframe, certification) | If unable to make specific (no data available), change element to `not_applicable` |
| Certification jargon | Certification listed without benefit explanation | Write 1–2 sentence translation answering "What does this mean for ME?" | If certification details unknown, flag for human research |
| Volume signal rounding | Copy uses rounded numbers ("Over a million") | Replace with specific number from trust inventory | If specific number unknown, mark as `not_applicable` — never guess |
| Authority anonymity | "Doctors recommend" or "Experts agree" without named individuals | Replace with Name + Credential + Institution + Statement pattern | If no named authority exists, remove authority signal — do not fabricate |
| Trust bar overload | More than 5 signals (Type A) or 6 signals (Type B) | Remove lowest-impact signals until within range | Escalate to human if all signals seem equally important |
| Fabrication | Trust signal in output has no matching entry in trust inventory | Remove fabricated signal immediately | HALT — review all signals against inventory before proceeding |
| Running 2.6/2.7 for Type A | Page type is type_a but PDP-specific microskills 2.6 or 2.7 are generating full output | Write output file with `skipped_type_a` status and terminate immediately | These microskills are PDP-specific — they require buy box architecture (PDP-03) which does not exist for Type A pages |
