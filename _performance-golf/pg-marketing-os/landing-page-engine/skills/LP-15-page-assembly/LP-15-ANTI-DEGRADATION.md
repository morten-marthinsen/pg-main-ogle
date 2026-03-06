# LP-15: Page Assembly — Anti-Degradation File

> **Version:** 1.1
> **Skill:** LP-15-page-assembly
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

> **THIS FILE IS MANDATORY READING.** Read BEFORE executing any microskill. Violations of these rules constitute system failure.

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-15 has nine specific failure modes. The first six have been observed in analogous assembly skills (CopywritingEngine Skill 19 Campaign Assembly). The last three are PDP-specific failure modes that apply when page_type is type_b or hybrid.

1. **Arena-Selection Bypass (THE #1 FAILURE MODE — Type A):** The assembled page uses pre-Arena candidate copy instead of the Arena-selected variant. In the CopywritingEngine, Skill 19 used a pre-Arena draft for the lead section instead of the Arena-selected Hybrid A, resulting in the entire lead being wrong. LP-15 MUST verify that Arena-selected copy from LP-07 (HERO_SELECTION.yaml) and LP-14 (CTA_SELECTION.yaml) is the copy that appears in the assembled output. GATE_3.2 catches this. If it fails, HALT — do not proceed.

2. **Missing Package Silence:** A required upstream package is missing but assembly proceeds without flagging it. The assembled page quietly omits an entire section (e.g., FAQ, urgency, social proof) because the content package was never loaded. Every missing package must be explicitly flagged in the inventory. If a required package is missing, HALT — do not silently assemble an incomplete page.

3. **Transition-Free Assembly (Type A):** Sections are concatenated without transitions — just stacked one after another. The result reads like a list of independent copy blocks, not a cohesive page. Every section boundary (N sections = N-1 boundaries minimum) must have a transition sentence or paragraph. Bare concatenation is an assembly failure.

4. **Threading Break:** The promise made in the headline is never fulfilled in the body, or the close references something that was not established earlier. The page tells no coherent story. Threading validation (2.4) checks for an unbroken promise chain: headline promise -> mechanism explanation -> proof of mechanism -> close callback to promise. For PDP pages: product promise in buy box -> mechanism/benefits in BTF -> final CTA.

5. **Type A/B Element Mismatch:** Assembling Type B elements (rating strip, sticky ATC, price above fold) for a Type A page, or Type A elements (long story section, P.S., Makepeace-style guarantee) for a Type B page. Page type from LP-00 governs everything. Check the page type BEFORE assembling.

6. **Section Order Deviation:** Assembly deviates from LP-04's (Type A) or PDP-04's (Type B) section-sequence.json without explicit justification. The section sequencer planned the order with conversion architecture in mind. Deviating without documenting why introduces architectural drift.

7. **Wrong Package Path for PDP (PDP-SPECIFIC):** Loading LP-03/LP-04/LP-05/LP-06 packages for PDP pages when PDP skills (PDP-03 through PDP-07) replace them. This produces a Type A assembly for a Type B page — completely wrong architecture. When page_type is type_b or hybrid, microskill 0.5 runs INSTEAD of 0.2+0.3. LP-03/LP-04/LP-05/LP-06/LP-07/LP-14 packages must NOT be loaded.

8. **Type A Pattern Leak into PDP (PDP-SPECIFIC):** Story-style transitions, P.S. sections, long-form closes, or narrative bridges appear in a PDP assembly. PDP pages are scan-optimized — section headers serve as transitions. Type A patterns confuse the scanning reading path that PDP shoppers use. Microskill 3.4 scans for 6 forbidden patterns.

9. **Missing Sticky ATC Bar (PDP-SPECIFIC):** A PDP page is assembled without a sticky ATC bar specification. The sticky ATC bar is the #1 mobile conversion element for PDP pages (60%+ mobile traffic). Its absence is a conversion architecture failure. This is a hard gate — HALT regardless of composite score.

---

## MANDATORY CHECKPOINT FILES

### Type A Path (page_type = type_a)

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `brief-load.md` | Layer 1 |
| After Layer 0 | `architecture-load.md` | Layer 1 |
| After Layer 0 | `content-load.md` | Layer 1 |
| After Layer 0 | `arena-verification-load.md` | Layer 1 |
| After Layer 1 | `package-inventory.md` | Layer 2 |
| After Layer 1 | `section-order-plan.md` | Layer 2 |
| After Layer 1 | `transition-strategy.md` | Layer 2 |
| After Layer 2 | `above-fold-assembly.md` | Layer 3 |
| After Layer 2 | `body-section-assembly.md` | Layer 3 |
| After Layer 2 | `conversion-section-assembly.md` | Layer 3 |
| After Layer 2 | `threading-validation.md` | Layer 3 |
| After Layer 3 | `completeness-audit.md` | Layer 4 |
| After Layer 3 | `arena-copy-verification.md` | Layer 4 |
| After Layer 3 | `assembly-audit.md` | Layer 4 |
| Output | `assembled-page-package.json` | LP-16, LP-17, LP-18, human |
| Output | `ASSEMBLY-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

### PDP Path (page_type = type_b or hybrid)

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `brief-load.md` | Layer 1 |
| After Layer 0 | `pdp-packages-loaded.md` | Layer 1 |
| After Layer 0 | `arena-verification-load.md` (if applicable) | Layer 1 |
| After Layer 1 | `package-inventory.md` | Layer 2 |
| After Layer 1 | `section-order-plan.md` | Layer 2 |
| After Layer 1 | `transition-strategy.md` | Layer 2 |
| After Layer 2 | `pdp-page-assembly.md` | Layer 3 |
| After Layer 2 | `threading-validation.md` | Layer 3 |
| After Layer 3 | `pdp-assembly-validation.md` | Layer 4 |
| After Layer 3 | `assembly-audit.md` | Layer 4 |
| Output | `assembled-page-package.json` | PDP-16, LP-18, human |
| Output | `ASSEMBLY-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE FOR THE ACTIVE PATH DOES NOT EXIST -> THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

### Type A Thresholds

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Arena verification | HERO_SELECTION.yaml AND CTA_SELECTION.yaml match assembled copy | HALT — do not assemble with pre-Arena copy |
| Package inventory | All 14 upstream packages accounted for (present or flagged missing) | HALT — complete inventory |
| Section transitions | Every section boundary has a transition | HALT — write missing transitions |
| Threading validation | Unbroken promise chain from headline to close | HALT — identify and flag break point |
| Completeness audit | All required elements present for page type | HALT — identify missing elements |
| Assembly score | >= 7.0/10 | HALT — fix lowest-scoring dimension |
| Three-file output | assembled-page-package.json + ASSEMBLY-SUMMARY.md + execution-log.md | HALT — write missing files |

### PDP Thresholds (Type B / Hybrid)

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| PDP package inventory | All 5 PDP + 4 shared LP packages accounted for | HALT — complete inventory |
| ATC button text | VERBATIM from PDP-06 (hard gate) | HALT — replace with PDP-06 text |
| Sticky ATC bar | Specification present with trigger, contents, style, touch target (hard gate) | HALT — add sticky ATC bar spec |
| No Type A pattern leaks | Zero instances of story transitions, P.S., long-form close, narrative bridges (hard gate) | HALT — remove leaked patterns |
| Carousel completeness | All slides from PDP-03 assembled | Flag gap if fewer than 10 |
| Buy box completeness | All 10 components assembled | HALT — complete buy box |
| BTF section coverage | All PDP-04 sections assembled in order | HALT — assemble missing sections |
| PDP assembly score | >= 7.0/10 | HALT — fix lowest-scoring dimension |
| Threading validation | Product promise through BTF to final CTA | HALT — identify and flag break point |
| Three-file output | assembled-page-package.json + ASSEMBLY-SUMMARY.md + execution-log.md | HALT — write missing files |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It Is Invalid |
|----------------|-----------------|
| "The pre-Arena headline was probably fine" | The Arena exists for a reason. It selected a winner. Use the winner. Check HERO_SELECTION.yaml. |
| "The CTA package has many variants, I'll pick the best one" | You do not pick. The Arena picked. CTA_SELECTION.yaml names the winner. Use it. |
| "This package was missing but the page works without it" | Then flag it as missing in the inventory AND the summary. Do not silently drop it. The LP-17 audit will catch the gap anyway. |
| "The sections flow fine without explicit transitions" | No they do not. Bare concatenation is the #3 failure mode. Write a transition for every boundary. |
| "The threading is implied — readers will connect the dots" | Readers do not connect dots on sales pages. The page must explicitly thread the promise from headline through mechanism to close. Validate it. |
| "Type A and Type B are similar enough to mix elements" | They are fundamentally different architectures. Type A is story-driven education. Type B is scan-optimized PDP. Do not mix without LP-00 classifying the page as Hybrid. |
| "I'll adjust the section order because it makes more sense this way" | LP-04 set the section order. If you deviate, document the deviation, the reason, and the expected impact. Unexplained deviations are assembly failures. |
| "The assembly is complete — I just need to write the JSON later" | The assembly is NOT complete until all three output files exist. assembled-page-package.json is the output, not an afterthought. |
| "The LP-03 above-fold works for this PDP page too" | No. PDP pages use PDP-03 (carousel + buy box), not LP-03 (hero image + headline). Loading LP-03/LP-04/LP-05/LP-06 packages for PDP pages is Failure Mode #7. |
| "This story transition makes the PDP flow better" | Story transitions are Type A patterns. PDP pages are scan-optimized. Section headers serve as transitions. Adding narrative bridges to a PDP page degrades the scan path. |
| "The PDP page doesn't really need a sticky ATC bar" | Yes it does. 60%+ of PDP traffic is mobile. The sticky ATC bar is the #1 mobile conversion element. Missing it is Failure Mode #9 and a hard gate HALT. |
| "I'll improve the ATC button text since PDP-06's version could be better" | You do not modify PDP-06's ATC text. LP-15 assembles, it does not rewrite. ATC text is placed verbatim. This is the PDP equivalent of the Arena copy bypass. |
| "The carousel only needs 6-7 slides, 10 is excessive" | PDP-03 specified 10 slides for a reason (10-Thumbnail Story Architecture). Assemble all slides PDP-03 provided. If PDP-03 provided fewer than 10, assemble what exists and flag the gap. |

---

## ARENA VERIFICATION PROTOCOL (Detailed)

This is the most critical enforcement in LP-15. It prevents the #1 failure mode.

### Step 1: Load Arena Checkpoints (Layer 0, Microskill 0.4)
- Read `HERO_SELECTION.yaml` from LP-07 output folder
- Read `CTA_SELECTION.yaml` from LP-14 output folder
- Extract: selected variant ID, selected variant text (headline, deck, CTA copy)

### Step 2: Cross-Reference Content Packages (Layer 0, Microskill 0.4)
- Read `hero-section-package.json` from LP-07 output folder
- Read `cta-copy-package.json` from LP-14 output folder
- Confirm: the variant flagged as "selected" in the content package matches the variant named in the selection YAML
- If mismatch -> HALT at GATE_0

### Step 3: Verify in Assembled Output (Layer 3, Microskill 3.2)
- Extract headline text from `above-fold-assembly.md`
- Extract CTA text from `above-fold-assembly.md` and `conversion-section-assembly.md`
- Compare verbatim against Arena-selected text from Step 1
- If the assembled headline does not match the Arena-selected headline -> FAIL
- If the assembled primary CTA does not match the Arena-selected CTA -> FAIL
- Document the comparison in `arena-copy-verification.md` with exact text quotes

### What "Verbatim" Means
- Exact same words in the same order
- Minor formatting differences (capitalization, punctuation) are acceptable
- Any word substitution, reordering, or paraphrasing = NOT verbatim = FAIL
- Adding context around the headline (deck copy, pre-head) is fine — the headline itself must be verbatim

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| Arena-Selection Bypass | Assembled headline or CTA text does not match HERO_SELECTION.yaml or CTA_SELECTION.yaml | HALT at GATE_3.2. Replace with Arena-selected text. Re-verify. | If mismatch persists after correction, escalate to human — the Arena checkpoint files may be corrupted or the content packages may have been re-exported without Arena selection |
| Missing Package Silence | Package inventory has fewer than 14 entries, or a required package is absent without a flag | HALT at GATE_0 or GATE_1. Add the missing package to inventory as MISSING with upstream skill identified | If 3+ required packages are missing, HALT entirely — the upstream pipeline is incomplete. Do not attempt partial assembly without human approval |
| Transition-Free Assembly | Any section boundary has no transition (just one section ending and the next beginning) | Return to Layer 2. Write transitions for every bare boundary | If more than 50% of boundaries lack transitions, re-run Layer 1.3 transition strategy from scratch |
| Threading Break | Threading validation (2.4) cannot trace an unbroken path from headline promise to close | Flag the break point in threading-validation.md. Identify which section breaks the thread | If the headline promise is unrelated to the mechanism or close, this may be an upstream skill problem (LP-07 or LP-14). Flag for human review |
| Type A/B Element Mismatch | Assembled page contains elements inappropriate for its page type (e.g., P.S. section on a Type B page) | Remove mismatched elements. Reassemble with correct element set | If page type itself is ambiguous, escalate to human for LP-00 re-classification |
| Section Order Deviation | Assembled section order does not match LP-04's section-sequence.json | Document the deviation, reason, and expected impact. If no reason exists, revert to LP-04 order | If LP-04 order appears fundamentally wrong (e.g., price before value stack), flag for human review — the fix is in LP-04, not LP-15 |
| Wrong Package Path for PDP | LP-03/LP-04/LP-05/LP-06 packages loaded when page_type is type_b or hybrid | HALT at GATE_0. Switch to PDP package path (0.5 instead of 0.2+0.3) | If page_type classification is ambiguous, escalate to human for LP-00 re-classification |
| Type A Pattern Leak into PDP | Story transitions, P.S., long-form close, or narrative bridges detected in PDP assembly by 3.4 scan | HALT at GATE_3. Remove leaked patterns. Reassemble affected sections with section headers only | If Type A patterns are pervasive (3+ instances), return to Layer 2 and re-run 2.5 from scratch |
| Missing Sticky ATC Bar | PDP assembly (2.5) completed without sticky ATC bar specification | HALT at GATE_3. Return to 2.5, add sticky ATC bar specification per the spec template | Non-negotiable. Every PDP page must have a sticky ATC bar. No exceptions. |
| ATC Text Modification | ATC button text in assembly does not match PDP-06 verbatim | HALT at GATE_3 (hard gate in 3.4). Replace with PDP-06 text. Re-validate | If PDP-06 text appears broken or incomplete, escalate to human — the fix is in PDP-06, not LP-15 |
| Incomplete Carousel Assembly | PDP assembly has fewer carousel slides than PDP-03 specified | Flag in pdp-assembly-validation.md. Score carousel completeness accordingly | If PDP-03 specified fewer than 10, that is an upstream gap — flag for PDP-03 review |

---

## THREE-FILE OUTPUT REQUIREMENT

LP-15 is NOT complete until all three exist:

```
[ ] assembled-page-package.json — EXISTS
[ ] assembled-page-package.json — Has: all sections with content, transitions, CTA placements
[ ] assembled-page-package.json — Arena-selected headline and CTA are verbatim
[ ] assembled-page-package.json — Section order matches LP-04 (or deviation is justified)
[ ] assembled-page-package.json — Threading summary populated with promise chain
[ ] assembled-page-package.json — Quality scores populated
[ ] ASSEMBLY-SUMMARY.md — EXISTS
[ ] ASSEMBLY-SUMMARY.md — Contains: section map, Arena verification status, threading summary, quality scores
[ ] ASSEMBLY-SUMMARY.md — Lists any missing elements
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows all microskills executed with spec files read
[ ] execution-log.md — Shows all checkpoint files created
[ ] execution-log.md — Shows Arena verification result

IF ANY CHECKBOX UNCHECKED -> LP-15 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
LP-15-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  page_brief_loaded: "[Y/N]"
  page_type_confirmed: "[type_a | type_b | hybrid]"
  assembly_path: "[standard | pdp]"

  # Type A checks
  architecture_packages_loaded: "[Y/N | N/A if PDP]"
  content_packages_loaded: "[Y/N | N/A if PDP]"
  arena_checkpoints_loaded: "[Y/N | N/A if PDP]"
  arena_hero_verified: "[Y/N | N/A if PDP]"
  arena_cta_verified: "[Y/N | N/A if PDP]"

  # PDP checks (type_b / hybrid only)
  pdp_packages_loaded: "[Y/N | N/A if Type A]"
  shared_lp_packages_loaded: "[Y/N | N/A if Type A]"
  wrong_packages_loaded_for_pdp: "[Y/N — LP-03/04/05/06 loaded for PDP page]"
  sticky_atc_bar_specified: "[Y/N | N/A if Type A]"
  atc_text_verbatim: "[Y/N | N/A if Type A]"
  type_a_patterns_leaked: "[Y/N | N/A if Type A]"

  # Universal degradation detection
  using_pre_arena_copy: "[Y/N]"
  silently_dropping_packages: "[Y/N]"
  concatenating_without_transitions: "[Y/N — Type A only; PDP uses headers]"
  deviating_from_section_order_without_justification: "[Y/N]"
  mixing_type_a_b_elements: "[Y/N]"
  rewriting_upstream_copy: "[Y/N]"
  skipping_threading_validation: "[Y/N]"

  IF any degradation_detection = Y: STOP — execute the skipped step
  IF wrong_packages_loaded_for_pdp = Y: HALT — switch to PDP package path
  IF type_a_patterns_leaked = Y: HALT — remove leaked patterns
  IF sticky_atc_bar_specified = N (for PDP): HALT — add sticky ATC bar
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

### Type A Path

| Microskill | Output File |
|---|---|
| 0.1 Brief Loader | `brief-load.md` |
| 0.2 Architecture Loader | `architecture-load.md` |
| 0.3 Content Loader | `content-load.md` |
| 0.4 Arena Verification Loader | `arena-verification-load.md` |
| 1.1 Package Inventory | `package-inventory.md` |
| 1.2 Section Order Planner | `section-order-plan.md` |
| 1.3 Transition Strategy | `transition-strategy.md` |
| 2.1 Above-Fold Assembler | `above-fold-assembly.md` |
| 2.2 Body Section Assembler | `body-section-assembly.md` |
| 2.3 Conversion Section Assembler | `conversion-section-assembly.md` |
| 2.4 Threading Validator | `threading-validation.md` |
| 3.1 Completeness Audit | `completeness-audit.md` |
| 3.2 Arena Copy Verification | `arena-copy-verification.md` |
| 3.3 Assembly Audit | `assembly-audit.md` |
| 4.1 Page Package Compiler | `assembled-page-package.json` |
| 4.2 Summary Writer | `ASSEMBLY-SUMMARY.md` |
| 4.3 Log Writer | `execution-log.md` |

### PDP Path (Type B / Hybrid)

| Microskill | Output File |
|---|---|
| 0.1 Brief Loader | `brief-load.md` |
| 0.5 PDP Package Loader | `pdp-packages-loaded.md` |
| 0.4 Arena Verification Loader | `arena-verification-load.md` (if applicable) |
| 1.1 Package Inventory | `package-inventory.md` |
| 1.2 Section Order Planner | `section-order-plan.md` |
| 1.3 Transition Strategy | `transition-strategy.md` |
| 2.5 PDP Page Assembler | `pdp-page-assembly.md` |
| 2.4 Threading Validator | `threading-validation.md` |
| 3.4 PDP Assembly Validator | `pdp-assembly-validation.md` |
| 3.3 Assembly Audit | `assembly-audit.md` |
| 4.1 Page Package Compiler | `assembled-page-package.json` |
| 4.2 Summary Writer | `ASSEMBLY-SUMMARY.md` |
| 4.3 Log Writer | `execution-log.md` |

### FORBIDDEN: Running wrong path microskills

| If Page Type Is... | Do NOT Run | Run Instead |
|---|---|---|
| type_b or hybrid | 0.2, 0.3 | 0.5 |
| type_b or hybrid | 2.1, 2.2, 2.3 | 2.5 |
| type_b or hybrid | 3.1, 3.2 | 3.4 |
| type_a | 0.5 | 0.2, 0.3 |
| type_a | 2.5 | 2.1, 2.2, 2.3 |
| type_a | 3.4 | 3.1, 3.2 |
