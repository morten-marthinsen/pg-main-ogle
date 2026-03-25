# PDP-07: BTF Section Writer — Anti-Degradation File

> **Version:** 1.0
> **Skill:** PDP-07-btf-section-writer
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

PDP-07 is the largest PDP skill and has eight specific failure modes:

1. **LP-07 Pattern Leakage:** AI applies LP-07's Type A hero section writing approach to PDP BTF sections. PDP sections are scannable modules, not narrative blocks. If the output reads like a long-form sales page section, this failure has occurred.

2. **Section Homogenization:** AI writes all sections in the same format — generic paragraph + bullet list. Each of the 16 section types has a DISTINCT structure (tiles, timelines, charts, grids, cards). A comparison chart that reads like a benefits list is a structural failure.

3. **Cross-Section Dependency:** AI writes sections that reference each other ("as mentioned in the ingredients section above"). PDP visitors hunt-and-peck. Each section must be independently comprehensible. Cross-references break the module independence model.

4. **Word Count Bloat:** AI writes 400+ words for a section with a 150-word target. PDP copy is SHORT. Over-writing is the most common LLM failure mode for PDP content. Every word must earn its place.

5. **Generic Ingredient Copy:** AI writes "Ashwagandha is a powerful adaptogen" instead of "Ashwagandha for Stress Relief — reduces cortisol levels to help your body handle daily stress without the crash." The "X for Y" naming pattern is mandatory. Ingredient copy without specific benefit pairing is a failure.

6. **Competitor Brand Naming:** AI puts real brand names ("Unlike Centrum..." or "vs. Athletic Greens") in the comparison chart. PDP comparison charts use category terms only: "Leading Brand A," "Standard Formula," "Typical Alternative."

7. **Missing Proof Specificity:** AI writes "clinically studied" or "research-backed" without citing the actual study, sample size, or journal. When specific proof data exists in the brief, vague proof claims are a failure.

8. **Above-Fold Repetition:** AI repeats carousel slide content verbatim in BTF sections. The carousel already introduced ingredients, how it works, and benefits. BTF sections must EXTEND that content with depth and detail, not echo it.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `input-verification.md` | Layer 1 |
| After Layer 0 | `section-sequence-loaded.md` | Layer 1 |
| After Layer 0 | `pdp-reference-loaded.md` | Layer 1 |
| After Layer 1 | `per-section-briefs.md` | Layer 2 |
| After Layer 1 | `data-validation.md` | Layer 2 |
| After Layer 2 | `section-product-highlights.md` (if in sequence) | Layer 3 |
| After Layer 2 | `section-the-expert.md` (if in sequence) | Layer 3 |
| After Layer 2 | `section-whats-in-it.md` (if in sequence) | Layer 3 |
| After Layer 2 | `section-what-to-expect.md` (if in sequence) | Layer 3 |
| After Layer 2 | `section-problem-solution-logic.md` (if in sequence) | Layer 3 |
| After Layer 2 | `section-comparison-chart.md` (if in sequence) | Layer 3 |
| After Layer 2 | `section-cost-savings.md` (if in sequence) | Layer 3 |
| After Layer 2 | `section-how-its-made.md` (if in sequence) | Layer 3 |
| After Layer 2 | `section-how-to-use.md` (if in sequence) | Layer 3 |
| After Layer 2 | `section-identity-matching.md` (if in sequence) | Layer 3 |
| After Layer 3 | `quality-audit.md` | Layer 4 |
| After Layer 3 | `independence-check.md` | Layer 4 |
| After Layer 3 | `proof-density-check.md` | Layer 4 |
| Output | `pdp-btf-sections.json` | LP-15 (Page Assembly) |
| Output | `PDP-BTF-SECTIONS-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST -> THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Word count per section | Within +/-10% of PDP-04 target | HALT — edit to target |
| Scannability (5-second test) | Each section scannable at a glance | HALT — restructure |
| Module independence | Zero cross-section references | HALT — remove references |
| Anti-slop | Zero forbidden AI words | HALT — remove |
| "X for Y" ingredient naming | Every ingredient in What's in It section | HALT — add benefit pairing |
| Comparison chart naming | Zero real competitor brand names | HALT — replace with category terms |
| Proof specificity | Specific citations when data exists in brief | HALT — add specifics |
| No above-fold repetition | BTF extends carousel, not repeats it | HALT — rewrite to extend |
| Section output files | One per written section | HALT — write missing files |
| PDP-04 sequence alignment | Only write sections in PDP-04 sequence | HALT — remove unauthorized sections |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "This section needs more context to make sense" | Each section is a standalone module. If it needs context from another section, it's not standalone. Rewrite it to be self-contained. |
| "The word count target is too low for this section" | PDP copy is SHORT. PDP-04 set the target based on PDP benchmarks. Write concisely. If you cannot say it in the target word count, you are over-explaining. |
| "I'll write the FAQ since it's part of BTF" | FAQ is handled by LP-12 enhanced. PDP-07 does NOT write FAQ content. |
| "The comparison chart would be more compelling with real brand names" | Real brand names risk legal issues and look adversarial. Category terms ("Leading Brand A") are standard PDP practice. |
| "Clinically studied is sufficient for the proof claim" | If the brief contains a specific study citation, "clinically studied" is lazy. Use the citation. If no citation exists, flag the gap. |
| "This ingredient doesn't have a simple benefit pairing" | Every ingredient can be expressed as "X for Y." If the mechanism is complex, simplify: "CoQ10 for Cellular Energy." The Y is always a felt benefit. |
| "This section is better as a narrative paragraph" | PDP sections are scannable. Narrative paragraphs fail the 5-second test. Use headers, bullets, tiles, cards, or tables. |
| "I need to reference the mechanism from the Why It Works section" | Cross-references break module independence. State the mechanism briefly within this section. Repetition across modules is acceptable; dependency is not. |

---

## PER-SECTION OUTPUT VALIDATION

Before writing each section's output file, verify:

```yaml
SECTION-OUTPUT-CHECK:
  section_id: "[from PDP-04 sequence]"
  section_name: "[human-readable name]"

  # Content checks
  word_count_actual: "[number]"
  word_count_target: "[from PDP-04]"
  word_count_within_10_percent: "[Y/N — MUST BE Y]"
  scannable_at_5_seconds: "[Y/N — MUST BE Y]"
  module_independent: "[Y/N — zero cross-references — MUST BE Y]"
  no_above_fold_repetition: "[Y/N — extends carousel, not repeats — MUST BE Y]"

  # Format checks
  uses_section_specific_structure: "[Y/N — tiles/timeline/chart/grid/cards as required]"
  bold_headers_present: "[Y/N — MUST BE Y]"
  max_paragraph_length: "[number of sentences — MUST BE <= 3]"
  bullets_or_structured_format: "[Y/N — MUST BE Y]"

  # Quality checks
  anti_slop_clean: "[Y/N — zero forbidden AI words — MUST BE Y]"
  proof_density_met: "[Y/N — matches PDP-04 spec]"
  x_for_y_naming: "[Y/N — ingredients section only — MUST BE Y if applicable]"
  no_competitor_brand_names: "[Y/N — comparison chart only — MUST BE Y if applicable]"

  IF any MUST-BE-Y is N: HALT — fix before writing file
```

---

## THREE-FILE OUTPUT REQUIREMENT

PDP-07 is NOT complete until all three exist:

```
[ ] pdp-btf-sections.json — EXISTS
[ ] pdp-btf-sections.json — Has: all sections from PDP-04 sequence (except Reviews, FAQ)
[ ] pdp-btf-sections.json — Each section has: section_id, name, copy, word_count, proof_elements, visual_directions
[ ] pdp-btf-sections.json — Each section copy is within +/-10% of PDP-04 word count target
[ ] pdp-btf-sections.json — Has: validation_summary with scannability, independence, proof density results
[ ] PDP-BTF-SECTIONS-SUMMARY.md — EXISTS
[ ] PDP-BTF-SECTIONS-SUMMARY.md — Contains: per-section summary with word counts, key copy highlights, data gaps
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows: all microskills executed, spec files read, validation results, data gaps flagged

IF ANY CHECKBOX UNCHECKED -> PDP-07 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
PDP-07-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  page_brief_loaded: "[Y/N]"
  section_sequence_loaded: "[Y/N]"
  pdp_reference_loaded: "[Y/N]"
  page_type_confirmed: "[type_b | hybrid — NOT type_a]"

  # Rushing detection
  writing_section_not_in_sequence: "[Y/N]"
  writing_reviews_or_faq: "[Y/N]"
  cross_section_references_present: "[Y/N]"
  word_count_over_10_percent: "[Y/N]"
  using_lp07_narrative_patterns: "[Y/N]"
  generic_ai_language_present: "[Y/N]"
  ingredient_without_x_for_y: "[Y/N]"
  competitor_brand_names_used: "[Y/N]"
  above_fold_content_repeated: "[Y/N]"

  IF any rushing_detection = Y: STOP — execute the corrective action
  result: "[PROCEED | PAUSE | HALT]"
```

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| LP-07 pattern leakage | Output reads like narrative prose instead of scannable modules | Rewrite using section-specific structure (tiles, timeline, chart, grid) | Re-read PDP-07 AGENT.md + ANTI-DEGRADATION.md, clear LP-07 patterns |
| Section homogenization | Multiple sections use identical paragraph + bullet format | Rewrite each section using its specific structure type | Review PDP-BEST-PRACTICES-REFERENCE.md Section 5 for each section's unique format |
| Cross-section dependency | Section contains "as mentioned above" or references another section | Remove reference, add brief standalone context within this section | If standalone context requires significant word count increase, flag for PDP-04 word count adjustment |
| Word count bloat | Section exceeds PDP-04 target by >10% | Cut to target — remove weakest sentences, condense bullets | If content cannot be cut without losing essential information, flag for human decision |
| Generic ingredient copy | Ingredient listed without "X for Y" benefit pairing | Add benefit pairing using brief data | If no benefit data exists for ingredient, flag as data gap for human input |
| Competitor brand naming | Real brand name appears in comparison chart | Replace with category term ("Leading Brand A") | Non-negotiable — no escalation needed, just fix it |
| Missing proof specificity | "Clinically studied" used when specific study data exists in brief | Replace with specific citation (journal, year, sample size) | If brief lacks specifics, use best available language and flag gap |
| Above-fold repetition | BTF section echoes carousel slide text | Rewrite to extend and deepen carousel content, not repeat it | Compare against PDP-03 carousel-architecture.md to identify what was already covered |

---

## IMPLEMENTATION CHECKLIST — ARENA

```
LAYER 2.5 (ARENA -- MANDATORY):
[ ] ARENA-LAYER.md READ (MANDATORY — contains skill-specific judging criteria)
[ ] ARENA-CORE-PROTOCOL.md READ (path: ~system/protocols/ARENA-CORE-PROTOCOL.md)
[ ] ARENA-PERSONA-PANEL.md READ (path: ~system/protocols/ARENA-PERSONA-PANEL.md)
[ ] Persona names VERIFIED against protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect
[ ] All 7 competitors generated BTF section copy packages
[ ] All packages scored against criteria
[ ] Human selection received (BLOCKING)
```
