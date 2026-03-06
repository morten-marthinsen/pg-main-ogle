# LP-07: Hero Section Writer — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-07-hero-section
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

> **THIS FILE IS MANDATORY READING.** Read BEFORE executing any microskill. Violations of these rules constitute system failure.

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-07 has six specific failure modes — all related to the fact that this is the first creative writing skill and models tend to rush into generation without sufficient structural scaffolding:

1. **Premature Lead Writing:** AI writes the lead before the headline is selected. The lead must reflect the selected headline's angle — writing both simultaneously produces a misaligned lead that serves no specific promise.

2. **Candidate Collapse:** AI generates 3–4 headline variants (not 9+) and presents them as sufficient. The 3-lens × 3-round system exists specifically because the first 3 candidates are almost never the best.

3. **Loop Blindness:** AI writes a lead that reads well but opens only 1–2 curiosity loops (or closes loops as it opens them). This produces early drop-off. 3+ open loops are measurable and required.

4. **Slop Contamination:** AI uses AI telltales ("revolutionary," "unlock," "transform," "holistic") in headlines or lead copy. These words destroy credibility in 2025 markets. They must be caught by the anti-slop scanner BEFORE package assembly.

5. **Human Gate Bypass:** AI creates HERO_SELECTION.yaml itself (auto-selects) without human input. The human selection gate is the single most important creative checkpoint in the system. It cannot be automated.

6. **Type B Title Failure:** Product title for Type B pages defaults to brand name + product name only. "Magnesium Breakthrough" is acceptable only because it's a named product. "NeuroPeak Max 500mg" as a title is a failure — benefits must be stated.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `packages-loaded.md` | Layer 1 |
| After Layer 0 | `specimens-loaded.md` | Layer 1 |
| After Layer 1 | `headline-type-confirmed.md` | Layer 2 |
| After Layer 1 | `lead-type-selected.md` (Type A) | Layer 2.4 |
| After Layer 2 | `headline-candidates.md` — with ≥9 candidates and scores | Human checkpoint |
| After Layer 2 | `lead-draft.md` (Type A) | Human checkpoint |
| **BLOCKING** | `HERO_SELECTION.yaml` — written by human | Layer 3 |
| After Layer 3 | `loop-audit.md` (Type A) — shows ≥3 loops | Layer 4 |
| After Layer 3 | `anti-slop-scan.md` — shows PASS | Layer 4 |
| After Layer 3 | `hero-audit.md` — shows score ≥7.5 | Layer 4 |
| Output | `hero-section-package.json` | All downstream |
| Output | `HERO-SECTION-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF HERO_SELECTION.yaml DOES NOT EXIST → LAYER 3 CANNOT BEGIN. PERIOD.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Headline candidates | ≥9 total (3 lenses × 3 minimum) | HALT — generate more |
| Candidates presented to human | Top 5 with scores | HALT — score and present |
| Minimum headline score | ≥7.0 weighted to qualify | Discard below-threshold candidates |
| Specificity score per candidate | ≥6.0 | Discard generic headlines |
| Believability score per candidate | ≥6.0 | Discard unbelievable claims |
| Curiosity loops (Type A lead) | ≥3 open loops | HALT — revise lead |
| Closed loops in lead | 0 | HALT — re-open closed loops |
| Reading level (Type A) | ≤ grade 8 | HALT — revise |
| Hero audit score | ≥7.5/10 | HALT — revise until met |
| AI telltales | 0 in all copy | HALT — remove every instance |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "I generated 5 headlines — that's sufficient" | Minimum is 9 (3 lenses × 3). 5 is not 9. |
| "The headline selection seems obvious, I'll choose for efficiency" | HERO_SELECTION.yaml must be written by human. Auto-selection is a protocol violation. |
| "The lead reads well and implies curiosity" | Loops must be EXPLICITLY COUNTABLE. "Implies curiosity" is not 3 open loops. |
| "The reading level is probably fine" | Must run the actual reading level check (3.5). Estimated level is not checked level. |
| "I'll write the lead and headline together for flow" | Lead is written AFTER headline selection. Writing both simultaneously = violation. |
| "The product title includes the benefit in spirit" | Type B title must explicitly state a benefit. "In spirit" does not pass. |
| "Revolutionary is a strong word here" | Revolutionary is on the forbidden list. Strong ≠ allowed. |
| "I'll add loops if the human asks" | Loops are audited in Layer 3. They must be present before human review of final. |

---

## HEADLINE CANDIDATE REQUIREMENTS

Before presenting to human, verify `headline-candidates.md` contains:

```yaml
HEADLINE-CANDIDATE-MC-CHECK:
  total_candidates_generated: "[count — must be ≥9]"
  lens_1_converter_candidates: "[count — must be ≥3]"
  lens_2_empath_candidates: "[count — must be ≥3]"
  lens_3_skeptic_candidates: "[count — must be ≥3]"

  all_candidates_scored: "[Y/N]"
  all_7_criteria_scored_per_candidate: "[Y/N]"

  candidates_disqualified_below_threshold:
    specificity_failures: "[count]"
    believability_failures: "[count]"
    overall_failures: "[count]"

  top_5_qualified_candidates: "[count — must be exactly 5]"
  top_5_all_above_7.0: "[Y/N]"

  any_slop_words_in_candidates: "[Y/N — if Y, revise before presenting]"

  IF total < 9: HALT — generate additional candidates
  IF any_slop_words = Y: HALT — remove slop, regenerate if needed
  IF top_5_count < 5: HALT — insufficient qualifying candidates — lower lens requirements, generate more
```

---

## LOOP AUDIT REQUIREMENTS

`loop-audit.md` must explicitly identify and count each open loop:

```markdown
# Loop Audit — [Product Name]

## Loop Count: [X] (minimum required: 3)

### Loop 1: [Loop Type]
**Where opened:** "[Quote from lead — the exact sentence that opens this loop]"
**What reader wants to know:** "[The specific question this creates in the reader's mind]"
**Where it resolves:** Section [X] — [section name]
**Status:** OPEN (not resolved in lead) ✓

### Loop 2: [Loop Type]
[Same format]

### Loop 3: [Loop Type]
[Same format]

[Additional loops if present]

## Closed Loops (SHOULD BE ZERO)
[List any loops that were opened AND closed within the lead]
[If zero: "No closed loops detected — all loops remain open through end of lead"]

## Audit Result: [PASS — 3+ open loops, 0 closed | FAIL — describe issue]
```

**PASS requires:**
- ≥3 loops listed
- Each loop has an identified resolution section (OUTSIDE the lead)
- 0 closed loops within the lead

---

## ANTI-SLOP SCAN REQUIREMENTS

`anti-slop-scan.md` must explicitly check every element:

```markdown
# Anti-Slop Scan — [Product Name]

## Elements Scanned
- [ ] Pre-head
- [ ] Headline (selected)
- [ ] Deck copy (selected)
- [ ] Lead / above-fold copy (full text)

## Forbidden Words Found
[List each instance: "[word found]" — Location: "[element name]" — Status: REMOVED]
[or: "None found"]

## Vague Benefit Language Found
[List any instances]
[or: "None found"]

## Unearned Claims Found
[List any claims without evidence]
[or: "None found"]

## Scan Result: [PASS — zero forbidden elements | FAIL — list remaining issues]
```

**A single instance of a forbidden word = FAIL. Revise before assembly.**

---

## TYPE B PRODUCT TITLE VERIFICATION

Before presenting Type B copy for human selection:

```yaml
TYPE-B-TITLE-CHECK:
  title_text: "[exact H1 text]"
  contains_brand_name_only: "[Y/N]"
  contains_explicit_benefit: "[Y/N]"
  benefit_is_specific: "[Y/N — 'feel better' is not specific; 'supports deep sleep' is]"
  title_passes: "[Y/N — must be N for brand-name-only, Y for benefit-forward]"

  IF contains_explicit_benefit = N: HALT — rewrite title to include benefit
  IF benefit_is_specific = N: HALT — make benefit specific
```

---

## HERO_SELECTION.YAML AUTHENTICATION

Before beginning Layer 3, verify the selection file is human-created (not auto-generated):

```yaml
SELECTION-AUTHENTICATION-CHECK:
  file_exists: "[Y/N]"
  selected_by_field: "[must read 'human' — if 'auto' or 'system' → HALT]"
  headline_selected_text: "[must be non-empty]"
  modification_notes_present: "[Y/N — even 'Use as-is' counts]"

  IF file_exists = N: HALT — present candidates to human, await file creation
  IF selected_by != human: HALT — cannot proceed with auto-selection
  IF headline_selected_text empty: HALT — incomplete selection
```

---

## THREE-FILE OUTPUT REQUIREMENT

LP-07 is NOT complete until all three exist:

```
[ ] hero-section-package.json — EXISTS
[ ] hero-section-package.json — Contains: selected headline, deck copy, pre-head, lead (Type A), above-fold copy (Type B), threading anchor, hero audit score
[ ] hero-section-package.json — Hero audit score field shows ≥7.5
[ ] HERO-SECTION-SUMMARY.md — EXISTS
[ ] HERO-SECTION-SUMMARY.md — Contains: selected headline + rationale, lead type (Type A), loops identified, audit score, threading anchor phrase, all candidates table
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows HERO_SELECTION.yaml existed before Layer 3 began

IF ANY CHECKBOX UNCHECKED → LP-07 IS NOT COMPLETE
```

---

## HERO-SECTION-SUMMARY.MD REQUIRED SECTIONS

```markdown
# [Product Name] — Hero Section Summary

## Page Type: [Type A | Type B | Hybrid]

## Selected Headline
"[Headline text]"
Score: [X.X/10] | Lens: [Lens name] | Type: [T1-T7]

## Deck Copy
"[Deck copy text]"

## Pre-Head
"[Pre-head text]" [or: "None — not included"]

## Lead (Type A)
Lead type: [Type 1-6 name]
Word count: [X words]
Loops opened: [count] — [Loop 1 type, Loop 2 type, Loop 3 type...]
Reading level: Grade [X]

## Above-Fold Copy (Type B)
Product title: "[text]"
Short description: "[text]"
Benefits bullets: [count]

## Threading Anchor
Primary hook phrase: "[phrase]"
Promise statement: "[statement]"

## All Headline Candidates
| ID | Lens | Headline Text | Score |
|----|------|--------------|-------|
[table]

## Audit
Hero audit score: [X.X/10]
Anti-slop: [PASS]
Reading level: [PASS — Grade X | FAIL]
Loop audit (Type A): [PASS — X loops | FAIL]

## Downstream Handoffs
Threading anchor feeds: LP-08, LP-09, LP-10, LP-15
Selected lead feeds: LP-15 (Assembly)
Promise statement feeds: LP-11 (Offer), LP-14 (CTA)
```

---

## SKILL-SPECIFIC MC-CHECK (Run Before Every Major Execution)

```yaml
LP-07-MC-CHECK:
  trigger: "[before_generation | before_human_checkpoint | before_layer_3 | before_output]"

  pre_generation:
    specimens_loaded: "[Y/N]"
    upstream_packages_loaded: "[Y/N]"
    headline_type_confirmed: "[Y/N]"
    lead_type_selected: "[Y/N | N/A for Type B]"

  pre_human_checkpoint:
    headline_count: "[must be ≥9]"
    all_candidates_scored: "[Y/N]"
    top_5_identified: "[Y/N]"
    slop_check_on_candidates: "[Y/N]"

  pre_layer_3:
    hero_selection_yaml_exists: "[Y/N]"
    selected_by_human: "[Y/N]"
    IF N: HALT — do not begin Layer 3

  rushing_detection:
    writing_lead_before_headline_selected: "[Y/N]"
    auto_selecting_best_headline: "[Y/N]"
    generating_fewer_than_9_candidates: "[Y/N]"
    skipping_specimen_load: "[Y/N]"

  IF any rushing = Y: STOP — execute skipped step properly
  result: "[PROCEED | PAUSE | HALT]"
```

---

## BINARY GATE ENFORCEMENT

Gates produce exactly two outcomes:
- **PASS** — All criteria met. Proceed.
- **FAIL** — One or more criteria not met. Stop and fix.

**FORBIDDEN:** "Conditional pass", "partial pass", "pass with notes", "soft pass", or any status other than PASS/FAIL.

---

## PER-MICROSKILL OUTPUT TABLE

Every microskill MUST produce its own dedicated output file.

| Microskill | Output File |
|---|---|
| 0.1 Package Loader | `packages-loaded.md` |
| 0.2 Copy Asset Extractor | `copy-assets.md` |
| 0.3 Specimen Loader | `specimens-loaded.md` |
| 1.1 Headline Type Confirmation | `headline-type-confirmed.md` |
| 1.2 Lead Type Selector | `lead-type-selected.md` |
| 1.3 Hook Strategy Planner | `hook-strategy.md` |
| 2.1 Pre-Head Generator | `pre-heads.md` |
| 2.2 Headline Generator | `headline-candidates.md` |
| 2.3 Deck Copy Generator | `deck-candidates.md` |
| 2.4 Lead Generator (Type A) | `lead-draft.md` |
| 2.5 Type B Above-Fold Copy | `typeb-abovefold.md` |
| 3.1 Lead Revision (Type A) | `lead-final.md` |
| 3.2 Loop Audit (Type A) | `loop-audit.md` |
| 3.3 Self-Selection Test | `self-selection-test.md` |
| 3.4 Anti-Slop Scanner | `anti-slop-scan.md` |
| 3.5 Reading Level Check | `reading-level.md` |
| 3.6 10-Point Hero Audit | `hero-audit.md` |
| 4.1 Package Compiler | `hero-section-package.json` |
| 4.2 Summary Writer | `HERO-SECTION-SUMMARY.md` |
| 4.3 Log Writer | `execution-log.md` |
