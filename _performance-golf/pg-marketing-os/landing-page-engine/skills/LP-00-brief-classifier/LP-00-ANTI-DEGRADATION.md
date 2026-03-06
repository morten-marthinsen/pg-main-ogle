# LP-00: Brief Classifier — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-00-brief-classifier
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-00 has four specific failure modes that degrade quietly:

1. **Classification Shortcut:** AI reads product name and guesses Type A or Type B without running the 7-signal test. Downstream skills then get a wrongly-configured page type.

2. **Empty Brief Syndrome:** Required fields in page-brief.json left empty (not `not_available`). Downstream skills attempt to load empty strings and produce generic output.

3. **Mode Conflation:** AI runs Standalone Mode but pretends Downstream Mode packages exist. Or vice versa — finds packages but doesn't extract them.

4. **Awareness Stage Hallucination:** AI assigns an awareness stage without mapping the traffic source + brief data against the Schwartz model. Downstream headline type selection becomes wrong.

---

## MANDATORY CHECKPOINT FILES

Before proceeding to the next layer, these files MUST exist:

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `mode-declaration.md` | Layer 1 |
| After Layer 0 | `brief-load.md` | Layer 1 |
| After Layer 1 | `classification-signals.md` | Layer 2 |
| After Layer 1 | `type-declaration.md` | Layer 2 |
| After Layer 2 | `audience-profile.md` | Layer 3 / Layer 4 |
| After Layer 2 | `offer-summary.md` | Layer 3 / Layer 4 |
| After Layer 3 | `copy-extract.md` (Downstream Mode) | Layer 4 |
| Output | `page-brief.json` | All downstream skills |
| Output | `PAGE-BRIEF-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST → THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Classification signals confirmed | ≥4/7 for declared type | HALT — re-run Layer 1 |
| page-brief.json required fields | 0 empty fields (use `not_available`) | HALT — complete fields |
| Audience dimensions populated | All 5 dimensions have entries | HALT — complete missing dimensions |
| Operating mode declared | Mode confirmed before Layer 1 | HALT — declare mode |
| Downstream extraction (if packages exist) | ≥3 packages extracted | Continue with what's available, log failures |

---

## FORBIDDEN RATIONALIZATIONS

These phrases, if they appear in the AI's reasoning, are immediate HALT triggers:

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "The product name suggests it's Type A" | Classification requires 7-signal test, not product name |
| "The brief clearly indicates..." | Brief reading ≠ running the classification checklist |
| "I'll leave this field blank for now" | Use `not_available` — empty fields don't exist |
| "I know this market, so..." | Awareness stage must be mapped against Schwartz model explicitly |
| "The packages aren't needed for this brief" | In Downstream Mode, package extraction is mandatory |
| "This is obviously a supplement, so it's Type A" | Supplements can be Type B (Kachava, Athletic Greens). Run the test. |
| "I'll fill in the audience profile from general knowledge" | Must flag as `brief_inferred` and mark `needs_validation` |

---

## CLASSIFICATION INTEGRITY CHECK

Before writing `type-declaration.md`, verify:

```yaml
CLASSIFICATION-MC-CHECK:
  signals_tested: "[count must be exactly 7]"
  confirmed_signals_for_declared_type: "[count must be ≥4]"
  hybrid_check_run: "[Y/N]"
  rationale_written: "[Y/N — must be ≥2 sentences explaining WHY]"

  IF signals_tested < 7: HALT — run all 7 signals
  IF confirmed_signals < 4: HALT — insufficient classification evidence
  IF hybrid_check NOT run: HALT — hybrid detection is mandatory
```

---

## BRIEF COMPLETENESS VERIFICATION

Before writing `page-brief.json`, verify all sections complete:

```yaml
BRIEF-COMPLETENESS-CHECK:

  # Page type section
  classification_present: "[type_a | type_b | hybrid — NOT empty]"
  signals_detail_all_7_present: "[Y/N]"
  rationale_present: "[Y/N — must not be empty]"

  # Audience section
  demographics_populated: "[Y/N]"
  pain_profile_populated: "[Y/N]"
  desire_profile_populated: "[Y/N]"
  sophistication_populated: "[Y/N]"
  language_profile_populated: "[Y/N]"

  # Offer section
  product_name_present: "[Y/N]"
  pricing_present: "[Y/N]"
  guarantee_present: "[Y/N — use 'not_specified' if no guarantee in brief]"

  # Traffic section
  temperature_declared: "[cold | warm | hot — NOT empty]"
  awareness_stage_declared: "[1-5 — NOT empty]"

  # Voice section
  anti_voice_list_present: "[Y/N — must have at least 5 entries]"

  ANY_EMPTY_REQUIRED_FIELD: "[Y/N]"
  IF yes: HALT — fill fields or mark not_available
```

---

## DOWNSTREAM MODE INTEGRITY CHECK

Only runs when `operating_mode = downstream`. Before writing `copy-extract.md`:

```yaml
DOWNSTREAM-MC-CHECK:
  packages_found_count: "[number]"
  campaign_brief_loaded: "[Y/N | not_available]"
  mechanism_name_extracted: "[Y/N | not_available]"
  root_cause_extracted: "[Y/N | not_available]"
  offer_package_loaded: "[Y/N | not_available]"

  IF campaign_brief found but NOT loaded: HALT — load before extraction
  IF mechanism_name is empty string (not 'not_available'): HALT — extract or mark not_available
```

---

## THREE-FILE OUTPUT REQUIREMENT

LP-00 is NOT complete until all three exist:

```
[ ] page-brief.json — EXISTS in project outputs folder
[ ] page-brief.json — Has ALL required schema sections
[ ] page-brief.json — Zero empty required fields (not_available used correctly)
[ ] PAGE-BRIEF-SUMMARY.md — EXISTS
[ ] PAGE-BRIEF-SUMMARY.md — Contains: page type classification, audience summary, offer summary, vertical, traffic/awareness, validation flags
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows all microskills executed with spec files read
[ ] execution-log.md — Shows all gates passed

IF ANY CHECKBOX UNCHECKED → LP-00 IS NOT COMPLETE
```

---

## PAGE-BRIEF-SUMMARY.MD REQUIRED SECTIONS

```markdown
# [Product Name] — Page Brief Summary

## Classification
- Page Type: [Type A / Type B / Hybrid]
- Signals Confirmed: [X/7]
- Rationale: [2-3 sentences]
- Operating Mode: [Downstream / Standalone]

## Audience Profile
[Key points from all 5 dimensions — bullet format]

## Offer Summary
[Product, price, bonuses, guarantee — bullet format]

## Traffic Profile
- Temperature: [Cold / Warm / Hot]
- Primary Source: [e.g., Facebook cold traffic]
- Awareness Stage: [1-5 — name]

## Vertical
- Primary: [vertical name]
- Secondary: [if applicable]

## Copy Assets Available
[List what came from CopywritingEngine packages OR "Standalone mode — none available"]

## Validation Flags
[Any fields marked needs_validation — or "None — all fields confirmed"]

## Downstream Handoff
[Which downstream skills should load this brief and why]
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
LP-00-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  product_brief_loaded: "[Y/N]"
  operating_mode_declared: "[downstream | standalone | NOT_YET]"
  classification_ran_all_7_signals: "[Y/N | not_yet]"
  brief_has_zero_empty_required_fields: "[Y/N | not_yet]"

  # Rushing detection
  classifying_without_signals_test: "[Y/N]"
  leaving_fields_empty_instead_of_not_available: "[Y/N]"
  skipping_hybrid_check: "[Y/N]"
  assuming_awareness_stage_without_mapping: "[Y/N]"

  IF any rushing_detection = Y: STOP — execute the skipped step
  result: "[PROCEED | PAUSE | HALT]"
```
