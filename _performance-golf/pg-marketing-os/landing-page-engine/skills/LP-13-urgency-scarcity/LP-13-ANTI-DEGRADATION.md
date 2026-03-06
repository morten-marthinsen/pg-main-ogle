# LP-13: Urgency/Scarcity Stack — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-13-urgency-scarcity
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-13 has five specific failure modes — all related to the fact that urgency/scarcity is the easiest copy element to fabricate and the hardest to justify honestly:

1. **Fabricated Urgency:** AI invents urgency that has no basis in reality. "Only 12 left!" when there is no inventory data. "Price going up!" when no price increase is planned. This is the #1 failure mode and the reason the justification audit exists. Every urgency claim must trace to a real, documented constraint from the brief or LP-06 output.

2. **Generic Countdown Copy:** AI defaults to "Don't miss out! Act now! Limited time only!" — vague pressure language with no specifics. Real urgency copy names the deadline ("Friday, March 14th at 11:59 PM EST"), specifies the consequence ("price returns to $97"), and explains why ("launch week pricing ends").

3. **Unjustified Scarcity:** AI writes scarcity copy ("selling fast," "almost gone") without explaining WHY supply is limited. Stock level claims must be backed by manufacturing data, batch sizes, or inventory constraints documented in the brief. "While supplies last" without batch data is forbidden.

4. **Urgency Without Value:** AI places urgency copy before the visitor understands the value of the offer. Urgency is a MULTIPLIER of desire — it multiplies zero if desire has not been established. LP-11 (Offer/Pricing) must run before LP-13. The placement strategy must confirm urgency appears after value establishment.

5. **Conflicting Urgency Signals:** AI stacks 3+ urgency types on a single page, creating a trust-destroying pressure environment. "Limited supply AND price going up AND enrollment closing AND bonuses expiring" = four simultaneous urgency signals = the visitor thinks "this is all fake." Maximum 2 types, checked against the compatibility matrix.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `packages-loaded.md` | Layer 1 |
| After Layer 0 | `urgency-data.md` | Layer 1 |
| After Layer 0 | `specimens-loaded.md` | Layer 1 |
| After Layer 1 | `urgency-types-selected.md` -- with 1-2 types max | Layer 2 |
| After Layer 1 | `justification-plan.md` -- with real constraints documented | Layer 2 |
| After Layer 1 | `placement-strategy.md` | Layer 2 |
| After Layer 2 | Relevant urgency copy file(s) for selected types | Layer 3 |
| After Layer 2 | `urgency-support-copy.md` -- ALWAYS required | Layer 3 |
| After Layer 3 | `urgency-audit.md` -- score >= 7.0 | Layer 4 |
| After Layer 3 | `justification-audit.md` -- PASS, zero fabricated claims | Layer 4 |
| Output | `urgency-package.json` | All downstream |
| Output | `URGENCY-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Urgency types per page | Maximum 2 | HALT -- remove excess types, keep the 2 strongest |
| Fabricated claims | 0 | HALT -- remove fabricated claim entirely |
| Justification per claim | Every claim justified | HALT -- add justification or remove claim |
| Urgency audit score | >= 7.0/10 | HALT -- revise until met |
| AI telltales | 0 in all urgency copy | HALT -- remove every instance |
| Urgency placement | After value establishment | HALT -- verify LP-11 section precedes urgency section |
| Countdown specificity | Named deadline + consequence | HALT -- add specific date/time and what happens after |
| Scarcity specificity | Named constraint + number | HALT -- add batch size, capacity limit, or inventory data |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "Every landing page needs urgency" | Some pages have NO justified urgency. Better to have zero urgency than fabricated urgency. Output `urgency_present: false` if no real constraint exists. |
| "The client will provide the real deadline later" | Do not write deadline copy with placeholder dates. If the deadline is unknown, write the justification framework and flag for client input. |
| "Almost sold out creates urgency even if we don't know exact inventory" | "Almost sold out" without inventory data is a fabricated claim. Remove it. |
| "3 urgency types is fine because they're all real" | Maximum is 2. Three real urgency signals still create pressure-selling perception. Pick the 2 strongest. |
| "'While supplies last' is standard language" | Standard does not mean justified. "While supplies last" requires batch manufacturing data or documented inventory constraint. |
| "Natural urgency doesn't count toward the 2-type limit" | Natural urgency (Type 6) is a TYPE. It counts. If you select Natural + Time + Supply = 3 types = violation. |
| "The urgency copy doesn't need to match the page voice — urgency is supposed to be more aggressive" | Urgency must match voice direction. A calm, authority-driven page with screaming urgency copy = tonal whiplash = distrust. |
| "I'll add the justification later" | Justification is written BEFORE the urgency copy (Layer 1 before Layer 2). Urgency copy without pre-planned justification = fabrication risk. |

---

## JUSTIFICATION AUDIT REQUIREMENTS

`justification-audit.md` must trace every urgency claim to a real constraint:

```markdown
# Justification Audit -- [Product Name]

## Claims Audited: [count]

### Claim 1: [Exact urgency claim text from copy]
**Urgency type:** [Type 1-6 name]
**Justification:** [Why this constraint is real]
**Source:** [Where in the brief/LP-06 output this constraint is documented]
**Would survive "Why?" x3 test:**
  - Why is this urgent? [Answer]
  - Why does that constraint exist? [Answer]
  - Why can't the constraint be removed? [Answer]
**Status:** [JUSTIFIED | FABRICATED | UNVERIFIABLE]

### Claim 2: [Same format]
[Repeat for every urgency claim in the copy]

## Summary
- Total claims: [count]
- Justified: [count]
- Fabricated: [count -- must be 0]
- Unverifiable: [count -- flag for client verification]

## Audit Result: [PASS -- zero fabricated | FAIL -- list fabricated claims]
```

**PASS requires:**
- Zero fabricated claims
- Every claim has a documented source
- Every claim survives the "Why?" x3 test

**UNVERIFIABLE claims** (urgency stated in brief but not independently confirmable) are flagged but do not cause FAIL. Client must confirm these during review.

---

## URGENCY COPY SPECIFICITY REQUIREMENTS

Before assembly, verify all urgency copy meets specificity standards:

```yaml
SPECIFICITY-CHECK:
  deadlines:
    has_specific_date: "[Y/N -- 'Friday' is not specific; 'Friday, March 14th at 11:59 PM EST' is]"
    specifies_consequence: "[Y/N -- what happens AFTER the deadline passes?]"
    IF has_specific_date = N: HALT -- add specific date and time
    IF specifies_consequence = N: HALT -- add consequence statement

  stock_levels:
    has_specific_number: "[Y/N -- 'low stock' is not specific; 'Only 47 left' is]"
    has_batch_context: "[Y/N -- 'next batch in 6-8 weeks' or similar]"
    IF has_specific_number = N: HALT -- add specific number or remove stock claim
    IF has_batch_context = N: HALT -- add manufacturing context

  price_changes:
    has_specific_new_price: "[Y/N -- 'price going up' is not specific; 'price increases to $97' is]"
    has_specific_date: "[Y/N]"
    IF has_specific_new_price = N: HALT -- add specific price or remove claim
    IF has_specific_date = N: HALT -- add specific date

  capacity_limits:
    has_specific_number: "[Y/N -- 'limited spots' is not specific; '200 students per cohort' is]"
    has_capacity_reason: "[Y/N -- WHY is capacity limited?]"
    IF has_specific_number = N: HALT -- add specific capacity number
    IF has_capacity_reason = N: HALT -- add reason for capacity limit
```

---

## URGENCY TYPE COUNT VERIFICATION

Before Layer 2 begins, verify:

```yaml
URGENCY-TYPE-COUNT-CHECK:
  types_selected: "[list type names]"
  type_count: "[must be 0, 1, or 2]"
  compatibility_check: "[PASS -- compatible combination | FAIL -- incompatible]"

  IF type_count > 2: HALT -- remove weakest type(s), keep maximum 2
  IF type_count = 0: Output no-justified-urgency.md, skip to Layer 4
  IF compatibility_check = FAIL: HALT -- replace incompatible type with compatible alternative
```

---

## VALUE-BEFORE-URGENCY VERIFICATION

Before any urgency copy is placed, verify LP-11 has run:

```yaml
VALUE-SEQUENCE-CHECK:
  lp_11_offer_pricing_package_exists: "[Y/N]"
  section_sequence_urgency_after_offer: "[Y/N -- urgency section number > offer section number]"

  IF lp_11_package_exists = N: HALT -- LP-11 must run before LP-13
  IF urgency_after_offer = N: HALT -- urgency must be placed AFTER offer/pricing section

  Exception: Natural urgency (Type 6) callbacks can be woven into earlier sections
  (root cause, mechanism) because they describe cost-of-delay, not purchase pressure.
```

---

## THREE-FILE OUTPUT REQUIREMENT

LP-13 is NOT complete until all three exist:

```
[ ] urgency-package.json -- EXISTS
[ ] urgency-package.json -- Contains: urgency types, all copy elements, justifications, validation scores
[ ] urgency-package.json -- urgency_audit_score field shows >= 7.0
[ ] urgency-package.json -- fabricated_claims field shows 0
[ ] URGENCY-SUMMARY.md -- EXISTS
[ ] URGENCY-SUMMARY.md -- Contains: types selected with justifications, copy excerpts, audit scores, downstream handoffs
[ ] execution-log.md -- EXISTS
[ ] execution-log.md -- Shows justification plan existed before generation began (Layer 1 before Layer 2)

IF ANY CHECKBOX UNCHECKED -> LP-13 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run Before Every Major Execution)

```yaml
LP-13-MC-CHECK:
  trigger: "[before_classification | before_generation | before_validation | before_output]"

  pre_classification:
    upstream_packages_loaded: "[Y/N]"
    urgency_data_extracted: "[Y/N]"
    specimens_loaded: "[Y/N]"

  pre_generation:
    urgency_types_selected: "[Y/N]"
    type_count_within_limit: "[Y/N -- max 2]"
    justification_plan_complete: "[Y/N]"
    placement_strategy_complete: "[Y/N]"
    compatibility_check_pass: "[Y/N]"

  pre_validation:
    all_selected_type_copy_written: "[Y/N]"
    urgency_support_copy_written: "[Y/N]"
    justification_paragraphs_present: "[Y/N]"

  pre_output:
    urgency_audit_score: "[X.X -- must be >= 7.0]"
    justification_audit_result: "[PASS | FAIL]"
    fabricated_claims: "[must be 0]"
    anti_slop_clean: "[Y/N]"

  rushing_detection:
    writing_urgency_before_justification_planned: "[Y/N]"
    selecting_more_than_2_types: "[Y/N]"
    skipping_specimen_load: "[Y/N]"
    placing_urgency_before_value_establishment: "[Y/N]"
    using_generic_deadline_language: "[Y/N]"

  IF any rushing = Y: STOP -- execute skipped step properly
  result: "[PROCEED | PAUSE | HALT]"
```

---

## FAILURE MODE TABLE

| Failure Mode | Detection Signal | Response | Escalation |
|-------------|-----------------|----------|------------|
| **Fabricated urgency claim** | Justification audit finds claim with no source in brief/LP-06 | Remove claim entirely. Do not attempt to justify after the fact. | If all urgency is fabricated, set `urgency_present: false` |
| **3+ urgency types selected** | Type count check > 2 | Remove weakest type. Re-run compatibility check on remaining 2. | If client demands 3+, flag for human override with trust-impact warning |
| **Generic countdown language** | Specificity check finds no date/time/consequence | Halt generation. Return to Layer 1 to get specific dates from brief. | If dates unavailable, write framework with [DATE] placeholder and flag |
| **Urgency before value** | Value-sequence check finds urgency section before offer section | Reposition urgency section after offer in placement strategy | If page architecture requires urgency above offer, flag for human review |
| **Contradictory urgency signals** | Compatibility matrix check fails | Replace incompatible type with compatible alternative | If both types are client-requested, flag contradiction for human decision |
| **AI telltale in urgency copy** | Anti-slop scan finds forbidden word | Revise immediately. Replace with specific, credible language. | If telltale persists after 2 revision attempts, rewrite from scratch |
| **Justification fails "Why?" x3 test** | Third "Why?" has no answer | Downgrade from JUSTIFIED to UNVERIFIABLE. Flag for client input. | If client cannot verify, remove claim |
| **Voice mismatch** | Urgency copy tone significantly more aggressive than page voice | Revise urgency copy to match voice direction from page-brief.json | If urgency inherently requires different tone, flag for human calibration |
