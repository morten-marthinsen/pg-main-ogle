# Pipeline Handoff Registry
**Quality Engine v4** | Component: Protocol
**Purpose:** Define required fields for all inter-stage handoff files in a multi-stage pipeline — validate field presence, not just file existence
**System-Agnostic:** Works with any AI model or agent framework

---

## WHY THIS EXISTS

Multi-stage pipelines have handoff files passing between stages. Previously, input validators checked that an upstream file *exists* but NOT that it contains the required fields. A silent schema mismatch (e.g., Stage 3 changes its output structure but Stage 6's loader still expects the old fields) causes downstream failures with no clear error message.

**Specific failure this prevents:** A downstream assembly stage consumes a pre-competition draft instead of the competition-selected winner, resulting in entire sections missing from the assembled output. If the assembly stage's input validator had checked for `arena_selection_verified: true` in each upstream package, this could not have happened.

This registry is the **single source of truth** for what each handoff file MUST contain.

---

## VALIDATION PROTOCOL

```
FOR EACH handoff file consumed by a stage's input validation:
  1. CHECK: File exists at expected path -> if not, HALT
  2. CHECK: File size >= minimum threshold -> if not, HALT
  3. CHECK: All REQUIRED fields present (per this registry) -> if not, HALT with specific missing field
  4. CHECK: REQUIRED fields are non-empty -> if not, HALT with specific empty field
  5. CHECK: Competition-dependent fields have arena_selection_verified: true -> if not, HALT
  6. OPTIONAL fields: log if missing, do not HALT
```

---

## HANDOFF ENTRY TEMPLATE

Use this template to document each handoff in your pipeline:

### HANDOFF [N]: [filename]

**Producer:** Stage [N] ([Stage Name])
**Consumers:** Stages [list]
**Minimum Size:** [size]
**Path:** `[project]/[stage-folder]/[filename]`

#### Required Sections

| # | Section | Required Fields | Consumer Stages |
|---|---------|----------------|-----------------|
| 1 | [Section Name] | [field_1, field_2, ...] | [list] |
| 2 | [Section Name] | [field_1, field_2, ...] | [list] |

#### Field Validation Rules

```
REQUIRED: [field] [operator] [value]
REQUIRED: [field] is non-empty
REQUIRED: [checkpoint file] exists ([gate description])
REQUIRED: arena_selection_verified: true (competition output, not pre-competition draft)
```

---

## EXAMPLE: RESEARCH HANDOFF

### HANDOFF 1: research-output.md

**Producer:** Stage 01 (Deep Research)
**Consumers:** Stages 02, 03, 04, 05, 06
**Minimum Size:** 300KB (for large research projects)
**Path:** `[project]/01-research/research-output.md`

#### Required Sections

| # | Section | Required Fields | Consumer Stages |
|---|---------|----------------|-----------------|
| 1 | Executive Summary | market_overview, total_data_points, category_distribution | All |
| 2 | Evidence Database | entries[] with source_id, verbatim_text, category, scores | All |
| 3 | Pattern Analysis | clusters[] (theme, entry_count, representative_entries) | 03, 06 |
| 4 | Market Intelligence | stage (1-5), evidence, dominant_claims | 04, 06 |

#### Field Validation Rules

```
REQUIRED: total_data_points >= 100
REQUIRED: Each entry has: source_id (non-empty), verbatim_text (non-empty), category
REQUIRED: category_distribution has all required categories populated
```

---

## EXAMPLE: STRATEGIC PACKAGE HANDOFF

### HANDOFF 3: strategy-package.yaml

**Producer:** Stage 03 (Core Strategy)
**Consumers:** Stages 04, 05, 06, 09
**Minimum Size:** 2KB
**Path:** `[project]/03-strategy/strategy-package.yaml`

#### Required Sections

| # | Section | Required Fields | Consumer Stages |
|---|---------|----------------|-----------------|
| 1 | Core Statement | statement, three_part.problem, three_part.reality, three_part.why_nothing_worked | All |
| 2 | Validation Scores | truth_score (>=6.0), alignment_score (>=7.0), composite_score (>=6.5) | All |
| 3 | Downstream Handoffs | mechanism_seed, promise_anchor, concept_seed | 04, 05, 06 |

#### Field Validation Rules

```
REQUIRED: three_part structure complete (all 3 parts non-empty)
REQUIRED: truth_score >= 6.0
REQUIRED: alignment_score >= 7.0
REQUIRED: composite_score >= 6.5
REQUIRED: mechanism_seed is non-empty
REQUIRED: concept_approved checkpoint exists (Phase A gate passed)
REQUIRED: arena_selection_verified: true (competition output, not pre-competition draft)
```

---

## EXAMPLE: NARRATIVE STAGE HANDOFFS

All narrative stages follow a common schema pattern:

#### Common Required Fields (All Narrative Packages)

```yaml
required:
  draft: string                      # Full section draft (competition-selected, non-empty)
  arena_winner: object               # {perspective, round, score}
  quality_score: number              # >= threshold (e.g., 8.5)
  arena_selection_verified: true     # BLOCKING — prevents pre-competition draft consumption
  human_selection_timestamp: string  # Gate approval timestamp
  threading_verification:
    key_term_present: boolean        # true — core terminology preserved
    strategy_anchor_present: boolean # true — strategic anchor preserved
    key_phrases_preserved: boolean   # true
  word_count: number                 # Within target range
```

---

## EXAMPLE: ASSEMBLY STAGE HANDOFF

### Assembly Package Required Fields

```yaml
required:
  assembly_metadata:
    timestamp: string
    versions: object                  # Version of each upstream package consumed
    gates_verified: array             # List of all upstream gate checkpoints verified

  section_manifest:                   # Per-section accounting
    - section_id: string
      source_package: string          # Which stage produced this section
      arena_selection_verified: true  # CRITICAL — must be competition output
      word_count: number
      percentage_of_total: number

  threading_audit:
    key_term_occurrences: number      # Count across full draft
    strategy_anchor_occurrences: number
    key_phrase_consistency: boolean

  callback_audit:
    open_loops_planted: number
    open_loops_resolved: number
    orphaned_loops: array              # Must be empty

  drift_report:
    structure_compliance_pct: number   # >= 85%
    word_count_variance_pct: number

  quality_scores:
    overall: number                    # >= 7.0
    threading: number
    flow: number
    consistency: number
```

---

## COMPETITION SELECTION VERIFICATION (CRITICAL)

**This field prevents the most common assembly failure pattern.**

Every handoff from a competition-enabled stage MUST include:

```yaml
arena_selection_verified: true
human_selection_timestamp: "[ISO 8601]"
arena_round_3_source: "[perspective name or hybrid ID]"
```

**Validation rule for assembly stages:**

```
FOR EACH section in assembled draft:
  1. READ the source package
  2. CHECK: arena_selection_verified == true
  3. CHECK: human_selection_timestamp is non-empty
  4. IF either check fails:
     +--------------------------------------------------------------------+
     |  STRUCTURAL BLOCK: PRE-COMPETITION DRAFT DETECTED                   |
     |                                                                      |
     |  Section [X] source package does NOT have competition verification. |
     |  This may be a pre-competition draft, not the selected output.      |
     |                                                                      |
     |  ACTION: Verify the correct competition-selected file is loaded.    |
     +--------------------------------------------------------------------+
     HALT — DO NOT ASSEMBLE WITH UNVERIFIED DRAFT
```

---

## CROSS-REFERENCE MAP TEMPLATE

### What Each Stage Consumes

| Stage | Upstream Packages Required |
|-------|--------------------------|
| 02 | 01 |
| 03 | 01, 02 |
| ... | ... |

### What Each Stage Produces

| Stage | Output Package | Consumed By |
|-------|---------------|-------------|
| 01 | research-output.md | 02, 03, 04, 05, 06 |
| 02 | evidence-package.yaml | 05, 09, 11 |
| ... | ... | ... |

---

## CROSS-PIPELINE HANDOFFS

When multiple pipelines share data (e.g., a core pipeline feeds into email, advertising, and e-commerce pipelines), document cross-pipeline handoffs:

### CROSS-PIPELINE [N]: [Source] to [Destination]

**Producer:** [Source Stage]
**Consumer:** [Destination Pipeline Stage]
**File:** [filename]
**Additional requirements:** [What the destination pipeline extracts]

---

## BUILDING YOUR REGISTRY

To create a handoff registry for your pipeline:

1. **Map all stages** — list every stage and what it produces/consumes
2. **Document required fields** — for each handoff file, list every field the consumer expects
3. **Set minimum sizes** — establish minimum file sizes that indicate complete output
4. **Add validation rules** — define numeric thresholds, non-empty requirements, cross-references
5. **Mark competition-dependent fields** — any field that should only come from competition-selected output
6. **Build the cross-reference map** — visualize the full dependency graph
7. **Test with a dry run** — validate all existing handoff files against the registry

The registry prevents silent schema drift. When a producer changes its output format, the registry makes the break visible immediately at the consumer's input validation.
