# LP-01: Conversion Intelligence Loader — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-01-conversion-intelligence
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-01 has four specific failure modes that degrade quietly:

1. **Generic Benchmark Syndrome:** AI outputs median/all-industry conversion rates (6.6%) instead of drilling into the vertical-specific and traffic-temperature-specific slice. Downstream skills then set wrong targets — a cold-traffic supplement page benchmarked at 6.6% instead of 2-4% leads to incorrect CTA placement and section count decisions.

2. **Specimen Mismatch:** AI recommends specimens that match on surface keywords but not on functional similarity. Example: matching a Type B brand homepage (Sunday Red) to a Type A long-form supplement sales page build. Downstream architecture skills copy patterns from the wrong archetype.

3. **Benchmark Hallucination:** AI cites conversion statistics, lift percentages, or industry rates that do not appear anywhere in conversion-data-reference.md. This is the highest-severity failure mode because downstream skills treat these numbers as ground truth. A hallucinated "+150% from countdown timers" leads to architecture decisions based on fiction.

4. **Missing Strategic Context:** AI outputs raw data (benchmarks, specimen IDs, element lists) without synthesizing them into actionable guidance. Downstream skills receive a data dump instead of intelligence. LP-03 gets a list of benchmarks but no guidance on what they mean for above-fold decisions.

---

## MANDATORY CHECKPOINT FILES

Before proceeding to the next layer, these files MUST exist:

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `brief-extract.md` | Layer 1 |
| After Layer 0 | `data-reference-load.md` | Layer 1 |
| After Layer 0 | `specimen-index-load.md` | Layer 1 |
| After Layer 1 | `vertical-benchmarks.md` | Layer 2 |
| After Layer 1 | `page-type-benchmarks.md` | Layer 2 |
| After Layer 1 | `matched-specimens.md` | Layer 2 |
| After Layer 1 | `element-impact-ranking.md` | Layer 2 |
| After Layer 2 | `benchmark-synthesis.md` | Layer 3 |
| After Layer 2 | `specimen-analysis.md` | Layer 3 |
| After Layer 2 | `filtered-patterns.md` | Layer 3 |
| After Layer 2 | `strategic-context.md` | Layer 3 |
| After Layer 3 | `validation-report.md` | Layer 4 |
| After Layer 3 | `completeness-audit.md` | Layer 4 |
| Output | `conversion-intelligence.json` | All downstream skills |
| Output | `CONVERSION-INTELLIGENCE-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST → THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Benchmarks sourced with citations | ≥4 distinct benchmarks | HALT — re-scan conversion-data-reference.md |
| Specimens matched | ≥2 (or gap explicitly documented) | Document gap, proceed with available data |
| Elements ranked | ≥8 elements in priority ranking | HALT — expand ranking using element-taxonomy.md |
| Strategic context downstream coverage | LP-03 + LP-04 + LP-06 guidance present | HALT — complete missing guidance sections |
| Hallucinated benchmarks | 0 (zero tolerance) | HALT — remove or replace with sourced data |
| Data confidence score | Calculated and documented | HALT — calculate before assembly |

---

## FORBIDDEN RATIONALIZATIONS

These phrases, if they appear in the AI's reasoning, are immediate HALT triggers:

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "Industry average conversion rate is typically..." | Use vertical-specific data from conversion-data-reference.md, not general knowledge |
| "Based on my understanding of this market..." | All benchmarks must come from the reference file, not model knowledge |
| "This specimen is close enough..." | Specimen matching requires documented match_score with specific criteria |
| "I'll add some relevant benchmarks" | Every benchmark must have a traceable citation to conversion-data-reference.md |
| "The patterns suggest..." | Cross-page patterns must come from cross-page-pattern-analysis.md, not inference |
| "No specimens match, so I'll skip this section" | Document the gap in data_confidence and strategic_context.data_gaps, proceed with fallback logic |
| "This is a conditional pass" | Gates are binary PASS/FAIL — no conditional, partial, or soft pass |
| "The strategic context is implicit in the data" | Strategic context must be explicit, written, and reference specific benchmarks/patterns |

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| **Generic Benchmark Syndrome** | Benchmark synthesis uses "6.6% median" or "all-industry" numbers when vertical-specific data exists in conversion-data-reference.md | HALT — return to 1.1/1.2, re-scan for vertical-specific rows | Flag in execution-log if no vertical-specific data exists (legitimate gap vs. missed data) |
| **Specimen Mismatch** | Matched specimen page_type does not match build page_type AND no fallback documentation exists | HALT — re-run 1.3 with correct matching hierarchy (primary → secondary → tertiary → fallback) | Document in data_gaps if all specimens are poor matches |
| **Benchmark Hallucination** | Any benchmark in benchmark-synthesis.md, conversion-intelligence.json, or CONVERSION-INTELLIGENCE-SUMMARY.md cannot be found by searching conversion-data-reference.md | HALT — remove the hallucinated benchmark immediately, replace with sourced data or mark `not_available` | This is a severity-10 failure. If caught in Layer 3, all Layer 2 outputs are suspect — re-validate completely |
| **Missing Strategic Context** | strategic-context.md lacks explicit guidance for LP-03, LP-04, or LP-06 | HALT — return to 2.4, complete guidance using benchmark + specimen + pattern data | If insufficient data exists to write guidance, document the gap and write "insufficient data — LP-[X] should rely on defaults from MASTER-BLUEPRINT.md" |

---

## SOURCE VERIFICATION PROTOCOL

Before any benchmark appears in the final output, it must pass this check:

```yaml
SOURCE-VERIFICATION:
  benchmark_claim: "[the exact number/percentage/range being cited]"
  found_in_CONVERSION_DATA_REFERENCE: "[Y/N]"
  exact_location: "[section name + table row or rule number]"
  exact_source_text: "[the verbatim text from the reference file]"

  IF found_in_CONVERSION_DATA_REFERENCE = N:
    → HALT
    → Remove the benchmark
    → Replace with sourced data or mark "not_available"
    → Log the hallucination attempt in validation-report.md
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
LP-01-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  page_brief_loaded: "[Y/N]"
  page_type_extracted: "[type_a | type_b | hybrid | NOT_YET]"
  vertical_extracted: "[vertical_id | NOT_YET]"
  conversion_data_reference_loaded: "[Y/N | NOT_YET]"
  specimen_index_loaded: "[Y/N | NOT_YET]"

  # Degradation detection
  using_generic_benchmarks_when_specific_exist: "[Y/N]"
  specimen_page_type_mismatch: "[Y/N]"
  benchmark_not_traceable_to_source: "[Y/N]"
  strategic_context_missing_downstream_guidance: "[Y/N]"

  IF any degradation_detection = Y: STOP — execute the remediation step
  result: "[PROCEED | PAUSE | HALT]"
```

---

## THREE-FILE OUTPUT REQUIREMENT

LP-01 is NOT complete until all three exist:

```
[ ] conversion-intelligence.json — EXISTS in project outputs folder
[ ] conversion-intelligence.json — Has ALL required schema sections
[ ] conversion-intelligence.json — Zero hallucinated benchmarks (validated in Layer 3)
[ ] conversion-intelligence.json — At minimum 2 matched specimens (or gap documented)
[ ] conversion-intelligence.json — Data confidence score calculated
[ ] CONVERSION-INTELLIGENCE-SUMMARY.md — EXISTS
[ ] CONVERSION-INTELLIGENCE-SUMMARY.md — Contains: benchmarks, specimens, elements, patterns, strategic context, confidence
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows all microskills executed with spec files read
[ ] execution-log.md — Shows all gates passed
[ ] execution-log.md — Shows validation report results (zero hallucinations confirmed)

IF ANY CHECKBOX UNCHECKED → LP-01 IS NOT COMPLETE
```

---

## CONVERSION-INTELLIGENCE-SUMMARY.MD REQUIRED SECTIONS

```markdown
# [Product Name] — Conversion Intelligence Summary

## Classification Context
- Page Type: [Type A / Type B / Hybrid]
- Vertical: [primary (+ secondary if applicable)]
- Traffic: [cold / warm / hot]
- Awareness: [stage 1-5 — name]

## Key Benchmarks
- Target CVR: [range with source]
- Bounce Rate Target: [range]
- Page Speed Target: [seconds]
[All with explicit citations to conversion-data-reference.md]

## Matched Specimens
[For each matched specimen: ID, name, match score, key pattern to study, relevance to this build]

## Element Priority Ranking (Top 10)
[Ranked list: element name, impact data, required Y/N]

## Cross-Page Patterns (Filtered)
[Section sequence pattern, proof pattern, CTA pattern — specific to this page type]

## Strategic Context
### For LP-03 (Above-Fold)
[Specific guidance]
### For LP-04 (Section Sequence)
[Specific guidance]
### For LP-05 (Social Proof)
[Specific guidance]
### For LP-06 (Offer/CTA)
[Specific guidance]

## Data Confidence
- Overall: [score/10]
- Key Gaps: [what data is missing]

## Downstream Handoff
[Which skills consume this output and what they should prioritize]
```
