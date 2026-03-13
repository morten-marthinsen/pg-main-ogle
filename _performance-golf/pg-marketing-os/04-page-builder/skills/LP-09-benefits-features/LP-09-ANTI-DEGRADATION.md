# LP-09: Benefits/Features Section Writer — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-09-benefits-features
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-09 has six specific failure modes — all related to the tendency for models to write benefit copy that sounds good but lacks structural completeness:

1. **Incomplete D-F-W-B-P Chains:** AI writes compelling-sounding benefit copy that skips the Proof component (or the Why bridge). Every element must complete all 5 components. A benefit without proof is an assertion. An assertion on a landing page is wasted space.

2. **Phantom Proof:** AI fabricates clinical citations, study names, or statistics that do not exist. "A 2023 study in the Journal of Nutrition found..." when no such study exists. If proof data is not available from upstream packages, flag PROOF_GAP — never invent evidence.

3. **Feature-First Writing:** AI leads with the technical feature or ingredient name instead of the felt benefit. "Contains 500mg of Ashwagandha KSM-66" vs. "Fall asleep 23 minutes faster — with a clinically studied dose of Ashwagandha KSM-66 (500mg)." Benefits lead. Features follow.

4. **Vague Benefit Language:** AI writes "supports overall health," "promotes general wellness," or "helps you feel your best." These are content-free. Every benefit must be specific enough that a reader can picture the outcome.

5. **Slop Contamination:** AI uses AI telltales ("revolutionary formula," "game-changing ingredient," "unlock your body's potential") in benefit copy. These words destroy credibility. They must be caught by the anti-slop scanner BEFORE package assembly.

6. **Tone Drift From Hero:** AI writes benefit sections in a different voice/register than the hero section. If the hero is conversational and direct, the benefits section cannot suddenly become clinical and formal. Threading anchor from LP-07 governs tone throughout.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `packages-loaded.md` | Layer 1 |
| After Layer 0 | `benefit-sections-identified.md` | Layer 1 |
| After Layer 0 | `specimens-loaded.md` | Layer 1 |
| After Layer 1 | `benefit-section-classification.md` | Layer 2 |
| After Layer 1 | `dfwbp-structure-plan.md` | Layer 2 |
| After Layer 1 (if supplement) | `ingredient-strategy.md` | Layer 2.2 |
| After Layer 2 (if Type B/Hybrid supplement) | `pdp-ingredient-cards.md` | Layer 3 |
| After Layer 2 (if Type B/Hybrid) | `pdp-microscripts.md` | Layer 3 |
| After Layer 2 (if Type B/Hybrid) | `pdp-vertical-layout-spec.md` | Layer 3 |
| After Layer 2 | All assigned section outputs (varies by classification) | Layer 3 |
| After Layer 3 | `benefit-audit.md` — shows score >=7.5 | Layer 4 |
| After Layer 3 | `dfwbp-audit.md` — shows PASS | Layer 4 |
| After Layer 3 | `anti-slop-scan.md` — shows PASS | Layer 4 |
| Output | `benefits-section-package.json` | All downstream |
| Output | `BENEFITS-SECTION-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| D-F-W-B-P chain completeness | 100% (all 5 components per element) | HALT — complete missing components |
| Proof specificity | Named source + year + number for every Proof | HALT — specify or flag PROOF_GAP |
| Benefit audit score | >=7.5/10 | HALT — revise until met |
| AI telltales | 0 in all benefit copy | HALT — remove every instance |
| Type B bullet format | Benefit verb first, no ingredient leads | HALT — reformat |
| Ingredient dose stated (supplement) | Every ingredient has dose from brief | HALT — flag missing doses |
| How-it-works step count | 3-5 steps maximum | HALT — reduce if >5 |
| Tone consistency with hero | Threading anchor referenced | HALT — realign tone |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "The benefit is implied — readers will understand" | D-F-W-B-P requires explicit Benefit statement. Implied benefits are missed benefits. |
| "I couldn't find proof, so I wrote a general claim" | Flag PROOF_GAP and escalate. Never substitute a vague claim for missing proof. |
| "Studies show is sufficient citation" | "Studies show" is a Category 3 forbidden phrase. Name the study or flag the gap. |
| "The ingredient name is itself a benefit" | No ingredient name is a benefit. Ashwagandha is a feature. "Fall asleep 23 minutes faster" is a benefit. |
| "5 D-F-W-B-P components makes the copy too long for Type B" | Type B uses condensed format. The chain is still complete — just compressed into scan-friendly language. |
| "The comparison table doesn't need proof per row" | Every comparison claim must be factually verifiable. Unverified comparison claims create legal liability. |
| "7 steps is fine for this process" | Maximum 5 steps. Cognitive load research is clear. Reduce or combine steps. |
| "The tone shift is appropriate for this section" | Tone is governed by the hero threading anchor from LP-07. Shifts require explicit justification documented in the execution log. |
| "The PDP ingredient cards work fine in a horizontal grid" | Baymard research is definitive: 27% oversight rate in horizontal layouts vs. 8% in vertical. Vertical stacking is mandatory for PDP benefit sections. |
| "Microscripts don't need to be exactly consistent — close enough is fine" | The entire purpose of microscripts is consistency. "Supports Deep Sleep" in one location and "Promotes Better Sleep" in another is a failure. Same microscript, every location. |
| "The 'X for Y' naming is too rigid — this ingredient doesn't fit the pattern" | Every ingredient fits the pattern. If you can't write "[Ingredient] for [Benefit]," the benefit is too vague. Sharpen the benefit, don't abandon the pattern. |

---

## PDP-SPECIFIC FORBIDDEN BEHAVIORS (2.6, 2.7, 2.8)

The following behaviors are FORBIDDEN and must be caught before package assembly:

1. **Running 2.6/2.7/2.8 for Type A pages.** These microskills are Type B/Hybrid ONLY. Type A uses 2.2 (Ingredient Deep-Dive Writer) for ingredient sections. Pre-execution gate must check page type.

2. **Using horizontal grid layout for PDP benefit sections.** Vertical stacking ONLY per Baymard Institute research — 27% item oversight rate in horizontal layouts vs. 8% in vertical. No exceptions, no "it looks better this way" rationalizations.

3. **Writing ingredient cards without the "X for Y" naming pattern.** Every ingredient card headline MUST follow "[Ingredient] for [Benefit]" format. Cards without this pattern fail to deliver the scan-optimized naming that PDP pages require.

4. **Microscript inconsistency across page locations.** If a microscript appears in a carousel slide AND an ingredient card AND a benefit section, it must be the EXACT SAME text in all three locations.

5. **Microscripts longer than 5 words.** 2-5 words maximum. If you cannot compress the benefit into 5 words, the benefit is not specific enough.

6. **Vague microscript benefit language.** "Supports Health" or "Promotes Wellness" are as forbidden in microscripts as they are in full benefit copy. Every microscript must name a specific, picturable outcome.

7. **Layout spec with vague spacing values.** "Generous padding" or "sufficient spacing" are not specifications. Concrete pixel values required (e.g., "24px between cards," "16px minimum padding on mobile").

---

## D-F-W-B-P AUDIT REQUIREMENTS

`dfwbp-audit.md` must explicitly verify every element:

```markdown
# D-F-W-B-P Audit -- [Product Name]

## Total Elements Audited: [count]

### Element: [element-id]
| Component | Present | Content |
|-----------|---------|---------|
| Deliverable | [Y/N] | [summary] |
| Feature | [Y/N] | [summary] |
| Why | [Y/N] | [summary] |
| Benefit | [Y/N] | [summary] |
| Proof | [Y/N] | [summary or PROOF_GAP] |
| Chain Complete: [Y/N]

[Repeat for every element]

## Summary
- Total elements: [count]
- Complete chains: [count]
- Incomplete chains: [count]
- PROOF_GAP flags: [count]
- Elements needing revision: [list IDs]

## Audit Result: [PASS -- all chains complete | FAIL -- X incomplete chains]
```

**PASS requires:**
- Every element has all 5 components populated
- Proof components are specific (not "studies show" or "research proves")
- PROOF_GAP flags are acceptable ONLY if escalated to human — they still count as "present" for audit purposes because the gap is explicitly documented

---

## BENEFIT AUDIT REQUIREMENTS (10-POINT)

Score each point 0 (fail) or 1 (pass). Minimum 7.5/10 to proceed.

```markdown
# Benefit Section Audit -- [Product Name]

## Scoring

1. D-F-W-B-P completeness: All elements have complete chains [0/1]
2. Proof specificity: All proof points name source + number (or flagged PROOF_GAP) [0/1]
3. Benefit-first language: Benefits lead in copy, features follow [0/1]
4. Scan-friendliness (Type B): Bullets are 8-12 words, benefit verb first [0/1 or N/A]
5. Ingredient accuracy (supplement): Doses match brief, mechanisms are plain language [0/1 or N/A]
6. Tone consistency: Copy matches hero section threading anchor [0/1]
7. Zero AI telltales: Anti-slop scan PASS [0/1]
8. Section completeness: All classified sections have copy output [0/1]
9. Comparison fairness: All competitive claims are factually verifiable [0/1 or N/A]
10. How-it-works clarity: Steps are sequential, 3-5 count, each has benefit [0/1 or N/A]

## Score: [X/applicable points * 10 = X.X/10]
## Result: [PASS (>=7.5) | FAIL (<7.5)]
```

**For non-applicable items:** Calculate score from applicable items only. Example: 8 applicable items, 7 pass = 8.75/10.

---

## ANTI-SLOP SCAN REQUIREMENTS

`anti-slop-scan.md` must explicitly check every copy output:

```markdown
# Anti-Slop Scan -- [Product Name] -- Benefits Section

## Elements Scanned
- [ ] benefit-bullets.md
- [ ] ingredient-deep-dives.md [if applicable]
- [ ] feature-explanations.md [if applicable]
- [ ] how-it-works.md [if applicable]
- [ ] comparison-benefits.md [if applicable]
- [ ] pdp-ingredient-cards.md [if Type B/Hybrid supplement]
- [ ] pdp-microscripts.md [if Type B/Hybrid]

## Category 1 -- AI Telltales
[List each instance or: "None found"]

## Category 2 -- Vague Benefit Language
[List each instance or: "None found"]

## Category 3 -- Unearned Claims
[List each instance or: "None found"]

## Category 4 -- Generic Benefit Language
[List each instance or: "None found"]

## Category 5 -- Passive/Hedge Language
[List each instance or: "None found"]

## Near-Miss Check
[List any near-miss words: unlock, empower, journey, seamless, robust, elevate]
[or: "None found"]

## Total Forbidden Words Found: [count]
## Scan Result: [PASS | FAIL]

## Required Revisions (if FAIL)
| Forbidden Word | Location | Suggested Replacement |
|---------------|----------|----------------------|
[Repeat for each instance]
```

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| Incomplete D-F-W-B-P chain | dfwbp-audit.md shows FAIL | Return to Layer 2 — complete missing components | If proof data unavailable after 2 attempts -> PROOF_GAP flag + human escalation |
| Phantom proof (fabricated citation) | Human review or verification check | Remove fabricated citation immediately. Flag as PROOF_GAP. | Automatic — any fabricated citation is a severity-10 failure |
| Feature-first writing | benefit-audit.md item 3 fails | Rewrite affected elements with benefit lead | If pattern persists across >3 elements -> reload specimens and regenerate section |
| Vague benefit language | anti-slop-scan.md Category 2/4 hits | Replace each vague phrase with specific, measurable outcome language | If >5 instances -> systematic rewrite of full section, not patchwork fixes |
| Tone drift from hero | benefit-audit.md item 6 fails | Re-read hero-section-package.json threading anchor. Realign all copy. | If drift is in >50% of elements -> full section regeneration with specimen reload |
| Slop contamination | anti-slop-scan.md FAIL | Remove all instances, provide replacements, rescan | If >3 instances in a single section -> full section rewrite |
| Ingredient dose missing from brief | ingredient-strategy.md shows `needs_data` | Halt ingredient deep-dive for that ingredient. Flag for human. | Cannot write ingredient deep-dive without confirmed dose. |
| How-it-works >5 steps | Layer 2.4 output review | Combine or remove steps to reach 3-5 | If combination is not possible -> split into 2 how-it-works sections |
| PDP microskills run for Type A page | Page type check at pre-execution gate | HALT — 2.6, 2.7, 2.8 are Type B/Hybrid ONLY | Automatic — wrong page type is a structural error |
| Horizontal grid layout for PDP benefits | pdp-vertical-layout-spec.md review | HALT — vertical stacking only per Baymard (27% vs 8% oversight rate) | Automatic — horizontal layout is never acceptable for PDP benefit sections |
| Ingredient card missing "X for Y" naming | pdp-ingredient-cards.md review | Rewrite card headline to "[Ingredient] for [Benefit]" pattern | If >3 cards lack pattern -> full card section regeneration |
| Microscript inconsistency across page | pdp-microscripts.md consistency map audit | Identify all instances of the ingredient/feature and unify to single microscript | Automatic — inconsistency defeats the entire purpose of the microscript system |
| Microscript exceeds 5 words | pdp-microscripts.md word count check | Compress to 2-5 words | If compression loses meaning -> rewrite with different benefit verb |

---

## THREE-FILE OUTPUT REQUIREMENT

LP-09 is NOT complete until all three exist:

```
[ ] benefits-section-package.json -- EXISTS
[ ] benefits-section-package.json -- Contains: all classified benefit section copy
[ ] benefits-section-package.json -- Every element has complete D-F-W-B-P chain
[ ] benefits-section-package.json -- Validation block shows all gates PASS
[ ] BENEFITS-SECTION-SUMMARY.md -- EXISTS
[ ] BENEFITS-SECTION-SUMMARY.md -- Contains: section count, content types, proof gaps, audit score, threading check
[ ] execution-log.md -- EXISTS
[ ] execution-log.md -- Shows all microskills executed and all gates passed

IF ANY CHECKBOX UNCHECKED -> LP-09 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run Before Every Major Execution)

```yaml
LP-09-MC-CHECK:
  trigger: "[before_generation | before_validation | before_output]"

  pre_generation:
    specimens_loaded: "[Y/N]"
    upstream_packages_loaded: "[Y/N]"
    benefit_sections_classified: "[Y/N]"
    dfwbp_chains_planned: "[Y/N]"
    ingredient_strategy_complete: "[Y/N | N/A]"
    hero_threading_anchor_loaded: "[Y/N]"

  pre_validation:
    all_classified_sections_have_copy: "[Y/N]"
    all_dfwbp_chains_attempted: "[Y/N]"
    proof_gaps_documented: "[Y/N -- list if any]"

  pre_output:
    benefit_audit_score: "[X.X -- must be >=7.5]"
    dfwbp_audit: "[PASS | FAIL]"
    anti_slop_scan: "[PASS | FAIL]"

  rushing_detection:
    writing_copy_before_classification: "[Y/N]"
    skipping_dfwbp_planning: "[Y/N]"
    skipping_specimen_load: "[Y/N]"
    using_vague_proof: "[Y/N]"

  IF any rushing = Y: STOP -- execute skipped step properly
  result: "[PROCEED | PAUSE | HALT]"
```
