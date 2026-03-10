# Big Idea Generative Engine — Microskill Architecture Plan

**Version:** 1.0
**Created:** 2026-01-24
**Purpose:** Decompose 4 monolithic Layer INSTRUCTIONS files into 27 bounded microskills with explicit I/O contracts
**Pattern Source:** 04-mechanisms microskill system (30 skills, proven architecture)

---

## Problem Statement

The current Generative Engine uses 4 monolithic Layer INSTRUCTIONS files (760-1047 lines each). Each file performs multiple distinct jobs within a single document. This violates the bounded-responsibility principle established in 04-mechanisms and 01-research.

**Current violations:**
- Layer 1 (760 lines): Loads files + normalizes schemas + validates thresholds + builds 6 pools + extracts summaries — all in one file
- Layer 2 (827 lines): Runs 5 independent analyses in one file
- Layer 3 (871 lines): Selects strategy + builds architecture + generates headlines + writes leads + plans proof — all in one file
- Layer 4 (1047 lines): Runs 4 independent validation gates in one file

---

## Target Architecture: 27 Microskills + Orchestrator

### Directory Structure

```
06-big-idea/
├── BIG-IDEA-AGENT.md                         ← NEW orchestrator (replaces GENERATIVE-ENGINE-AGENT.md)
├── skills/
│   ├── layer-0/                              ← Foundation (Data Loading & Validation)
│   │   ├── 0.1-deep-research-loader.md
│   │   ├── 0.2-vault-schema-normalizer.md
│   │   ├── 0.3-input-threshold-validator.md
│   │   ├── 0.4-component-pool-constructor.md
│   │   ├── 0.5-deep-research-summarizer.md
│   │   └── 0.6-foundation-gate.md
│   │
│   ├── layer-1/                              ← Intelligence (Market Analysis)
│   │   ├── 1.1-pattern-analyzer.md
│   │   ├── 1.2-saturation-mapper.md
│   │   ├── 1.3-gap-identifier.md
│   │   ├── 1.4-emotional-mapper.md
│   │   ├── 1.5-mechanism-mapper.md
│   │   └── 1.6-intelligence-gate.md
│   │
│   ├── layer-2/                              ← Generation (Candidate Creation)
│   │   ├── 2.1-candidate-strategy-selector.md
│   │   ├── 2.2-candidate-architect.md
│   │   ├── 2.3-headline-generator.md
│   │   ├── 2.4-lead-writer.md
│   │   ├── 2.5-proof-planner.md
│   │   └── 2.6-generation-gate.md
│   │
│   ├── layer-3/                              ← Validation (Quality Enforcement)
│   │   ├── 3.1-volume-validator.md
│   │   ├── 3.2-quantification-validator.md
│   │   ├── 3.3-defensibility-validator.md
│   │   ├── 3.4-actionability-validator.md
│   │   ├── 3.5-anti-slop-validator.md
│   │   └── 3.6-validation-summarizer.md
│   │
│   └── layer-4/                              ← Package (Brief Assembly)
│       ├── 4.1-brief-compiler.md
│       ├── 4.2-downstream-mapper.md
│       └── 4.3-handoff-packager.md
│
├── GenerativeEngine/                         ← PRESERVED (legacy reference, NOT the execution path)
│   ├── GENERATION-PRD.md                     ← Kept as architectural reference
│   ├── BIG-IDEA-BRIEF-TEMPLATE.md            ← Still used by 4.1-brief-compiler
│   └── output/                               ← Runtime output location
│
├── source-teachings/                         ← Domain expertise inputs
└── vault-intelligence/                       ← DeepAnalysisProtocol outputs
```

---

## Layer 0: Foundation (Data Loading & Validation)

**Source:** Layer1-INSTRUCTIONS.md (lines 1-760)
**Purpose:** Load, normalize, and validate all input data before intelligence processing

### 0.1: Deep Research Loader
| Field | Value |
|-------|-------|
| **Does** | Verifies existence + loads all 5 Deep Research files |
| **Input** | Project folder path (contains classified_quotes.json, mechanism_analysis.json, desire_language.json, opportunity_synthesis.json, market_config.yaml) |
| **Output** | deep_research_files.json (raw loaded content, existence flags) |
| **Source Lines** | Layer1-INSTRUCTIONS.md §INPUT REQUIREMENTS + §Validation Steps 1-5 |

### 0.2: Vault Schema Normalizer
| Field | Value |
|-------|-------|
| **Does** | Detects schema variant (A/B/C) per vault file, normalizes to canonical format |
| **Input** | tier1-extractions/PremiumSwipeVault/Processed/*.json |
| **Output** | normalized_vault.json (all files in canonical schema + normalization_log) |
| **Source Lines** | Layer1-INSTRUCTIONS.md §SCHEMA NORMALIZATION PROTOCOL |

### 0.3: Input Threshold Validator
| Field | Value |
|-------|-------|
| **Does** | Runs 6 validation checks against Deep Research + vault with binary PASS/FAIL |
| **Input** | deep_research_files.json, normalized_vault.json, market_config.yaml |
| **Output** | validation_status.json (all gates, exact counts, PASS/FAIL per check) |
| **Source Lines** | Layer1-INSTRUCTIONS.md §VALIDATION CHECKLIST Steps 1-6 |

### 0.4: Component Pool Constructor
| Field | Value |
|-------|-------|
| **Does** | Builds 6 component pools from normalized vault data (mechanisms, headlines, proof, emotional, root cause, big idea types) |
| **Input** | normalized_vault.json (only files that passed validation) |
| **Output** | component_pools.json (6 pool arrays with counts, swipe_sources, averages) |
| **Source Lines** | Layer1-INSTRUCTIONS.md §COMPONENT POOL CONSTRUCTION (Pools 1-6) |

### 0.5: Deep Research Summarizer
| Field | Value |
|-------|-------|
| **Does** | Extracts key insights from Deep Research for intelligence consumption (top pains, hopes, root causes, mechanisms, WEB, gaps) |
| **Input** | deep_research_files.json |
| **Output** | deep_research_summary.json (top_pains[10], top_hopes[10], root_cause_insights[5], failed_solutions[5], competitor_mechanisms, wants[5], enemies[5], beliefs[5], strategic_gaps, schwartz_stage) |
| **Source Lines** | Layer1-INSTRUCTIONS.md §DEEP RESEARCH SUMMARY EXTRACTION |

### 0.6: Foundation Gate
| Field | Value |
|-------|-------|
| **Does** | Validates all Layer 0 outputs meet completeness thresholds; produces layer0-output.json |
| **Input** | validation_status.json, component_pools.json, deep_research_summary.json |
| **Output** | layer0-output.json (combined validated output ready for Layer 1) |
| **Gate Criteria** | All validation gates PASS; all 6 pools have minimum entries; deep_research_summary complete |
| **Source Lines** | Layer1-INSTRUCTIONS.md §QUALITY GATES + §OUTPUT SPECIFICATIONS |

---

## Layer 1: Intelligence (Market Analysis)

**Source:** Layer2-INSTRUCTIONS.md (lines 1-827)
**Purpose:** Analyze patterns, saturation, gaps, emotions, and mechanism landscape with exact evidence counts

### 1.1: Pattern Analyzer
| Field | Value |
|-------|-------|
| **Does** | Ranks Big Idea types by usage frequency + quality tier, identifies dominant/rare/avoid patterns |
| **Input** | component_pools.json (big_idea_types), deep_research_summary.json (competitor_mechanisms) |
| **Output** | pattern_analysis.json (dominant_patterns[], rare_high_performers[], avoid_patterns[]) |
| **Source Lines** | Layer2-INSTRUCTIONS.md §ANALYSIS 1: PATTERN ANALYSIS |

### 1.2: Saturation Mapper
| Field | Value |
|-------|-------|
| **Does** | Maps mechanism saturation levels (Red/Yellow/Green/Blue zones) by cross-referencing competitor usage vs vault performance |
| **Input** | deep_research_summary.json (competitor_mechanisms), component_pools.json (mechanisms) |
| **Output** | saturation_mapping.json (avoid_mechanisms[], saturated[], safe[], whitespace[]) |
| **Source Lines** | Layer2-INSTRUCTIONS.md §ANALYSIS 2: SATURATION MAPPING |

### 1.3: Gap Identifier
| Field | Value |
|-------|-------|
| **Does** | Identifies proven vault patterns NOT used by competitors; ranks whitespace opportunities by 4 criteria |
| **Input** | component_pools.json (mechanisms, big_idea_types), deep_research_summary.json (competitor_mechanisms, strategic_gaps) |
| **Output** | gap_identification.json (whitespace_opportunities[], competitive_gaps[]) with opportunity tier (HIGH/MEDIUM/LOW) |
| **Source Lines** | Layer2-INSTRUCTIONS.md §ANALYSIS 3: GAP IDENTIFICATION |

### 1.4: Emotional Mapper
| Field | Value |
|-------|-------|
| **Does** | Maps pain/hope quote intensity to emotional driver combinations; identifies winning driver pairs |
| **Input** | deep_research_summary.json (top_pains, top_hopes), component_pools.json (emotional_combinations) |
| **Output** | emotional_mapping.json (primary_drivers[] with intensity levels, winning_combinations[] with combined scores) |
| **Source Lines** | Layer2-INSTRUCTIONS.md §ANALYSIS 4: EMOTIONAL MAPPING |

### 1.5: Mechanism Mapper
| Field | Value |
|-------|-------|
| **Does** | Inventories Root Cause techniques matched to Schwartz stage, mechanism naming patterns, and proof demonstration types |
| **Input** | deep_research_summary.json (schwartz_stage), component_pools.json (root_cause_techniques, mechanisms, proof_architectures) |
| **Output** | mechanism_mapping.json (root_cause_inventory[], naming_patterns[], proof_demonstration_types[]) |
| **Source Lines** | Layer2-INSTRUCTIONS.md §ANALYSIS 5: MECHANISM MAPPING |

### 1.6: Intelligence Gate
| Field | Value |
|-------|-------|
| **Does** | Enforces zero vague qualifiers, minimum 3 citations per recommendation; compiles layer1-output.json |
| **Input** | pattern_analysis.json, saturation_mapping.json, gap_identification.json, emotional_mapping.json, mechanism_mapping.json |
| **Output** | layer1-output.json (combined intelligence ready for Layer 2) |
| **Gate Criteria** | Zero forbidden terms; all recommendations cite 3+ swipe sources; all counts exact integers |
| **Source Lines** | Layer2-INSTRUCTIONS.md §QUALITY GATES (Zero Vague Qualifiers Rule, Minimum Example Citation Rule) |

---

## Layer 2: Generation (Candidate Creation)

**Source:** Layer3-INSTRUCTIONS.md (lines 1-871)
**Purpose:** Generate 5+ Big Idea candidates with complete creative execution

### 2.1: Candidate Strategy Selector
| Field | Value |
|-------|-------|
| **Does** | Picks which whitespace opportunities, dominant patterns, and hybrid combinations to pursue for 5 candidates |
| **Input** | layer1-output.json (gap_identification.whitespace_opportunities, pattern_analysis.dominant_patterns, saturation_mapping.whitespace_mechanisms) |
| **Output** | candidate_strategies.json (5 strategies: 2 whitespace, 2 dominant, 1 hybrid — each with source intelligence and selection rationale) |
| **Source Lines** | Layer3-INSTRUCTIONS.md §CANDIDATE GENERATION → Candidate Selection Strategy |

### 2.2: Candidate Architect
| Field | Value |
|-------|-------|
| **Does** | Builds complete core architecture per candidate: concept, root cause reframe, mechanism, promise, enemy, emotional drivers |
| **Input** | candidate_strategies.json, layer1-output.json (all 5 analyses for sourcing details) |
| **Output** | candidate_architectures.json (5 candidates with core_concept, root_cause_reframe, mechanism, promise_statement, enemy_identified, emotional_driver_combination — each with swipe_sources) |
| **Source Lines** | Layer3-INSTRUCTIONS.md §Candidate Architecture Template + §Example Candidate |

### 2.3: Headline Generator
| Field | Value |
|-------|-------|
| **Does** | Produces 10+ headlines per candidate using minimum 5 formula types, all as complete copy (never templates) |
| **Input** | candidate_architectures.json, layer0-output.json (component_pools.headline_formulas) |
| **Output** | candidate_headlines.json (per candidate: 10+ headlines with formula_type, emotional_driver, swipe_source, formula_source_count) |
| **Source Lines** | Layer3-INSTRUCTIONS.md §HEADLINE GENERATION |

### 2.4: Lead Writer
| Field | Value |
|-------|-------|
| **Does** | Writes 3+ lead variations per candidate as actual copy (opening hook, root cause intro, mechanism tease) using 5 technique types |
| **Input** | candidate_architectures.json |
| **Output** | candidate_leads.json (per candidate: 3+ leads with lead_technique, narrative_structure, opening_hook [2-3 sentences], root_cause_intro, mechanism_tease, swipe_source) |
| **Source Lines** | Layer3-INSTRUCTIONS.md §LEAD GENERATION |

### 2.5: Proof Planner
| Field | Value |
|-------|-------|
| **Does** | Designs proof architecture per candidate matched to Big Idea type and Schwartz stage |
| **Input** | candidate_architectures.json, layer0-output.json (component_pools.proof_architectures), deep_research_summary.json (schwartz_stage) |
| **Output** | candidate_proofs.json (per candidate: primary/secondary proof types, scientific/transformation/authority/social/demonstration elements, priority order) |
| **Source Lines** | Layer3-INSTRUCTIONS.md §PROOF ARCHITECTURE |

### 2.6: Generation Gate
| Field | Value |
|-------|-------|
| **Does** | Verifies completeness (5 candidates, 50+ headlines, 15+ leads, all with sources, no templates/placeholders); compiles layer2-output.json |
| **Input** | candidate_architectures.json, candidate_headlines.json, candidate_leads.json, candidate_proofs.json |
| **Output** | layer2-output.json (complete generation output matching current layer3-output.json schema) |
| **Gate Criteria** | ≥5 candidates; ≥50 headlines; ≥15 leads; no bracket placeholders; no description-only leads; all elements cite swipe sources |
| **Source Lines** | Layer3-INSTRUCTIONS.md §QUALITY GATES (Candidate Completeness, Evidence Traceability, Actionability, Volume) |

---

## Layer 3: Validation (Quality Enforcement)

**Source:** Layer4-INSTRUCTIONS.md (lines 1-1047)
**Purpose:** Run 4 independent quality gates + anti-slop scan with binary PASS/FAIL verdicts

### 3.1: Volume Validator
| Field | Value |
|-------|-------|
| **Does** | Verifies 100+ swipes analyzed, all Big Idea types have 3+ examples, mechanisms have 5+ examples, headline formulas have 3+ examples, lead techniques have 80+ quality sources, proof types have 3+ examples |
| **Input** | layer2-output.json, layer0-output.json |
| **Output** | volume_validation.json (status PASS/FAIL, per-check counts, specific failures) |
| **Source Lines** | Layer4-INSTRUCTIONS.md §VALIDATION GATE 1: VOLUME VALIDATION |

### 3.2: Quantification Validator
| Field | Value |
|-------|-------|
| **Does** | Scans all output text for 16 forbidden vague qualifiers; produces exact violation locations |
| **Input** | layer2-output.json (all candidate text, rationales, recommendations) |
| **Output** | quantification_validation.json (status, vague_qualifiers_found count, specific_counts_verified, issues[] with location + context + required_fix) |
| **Source Lines** | Layer4-INSTRUCTIONS.md §VALIDATION GATE 2: QUANTIFICATION VALIDATION |

### 3.3: Defensibility Validator
| Field | Value |
|-------|-------|
| **Does** | Verifies swipe source IDs exist in vault, evidence trails complete for all elements, recommendations match Layer 1 intelligence, quote counts accurate |
| **Input** | layer2-output.json, layer1-output.json, layer0-output.json |
| **Output** | defensibility_validation.json (status, sources_checked/valid/invalid, evidence_trails complete/incomplete, recommendations supported/unsupported) |
| **Source Lines** | Layer4-INSTRUCTIONS.md §VALIDATION GATE 3: DEFENSIBILITY VALIDATION |

### 3.4: Actionability Validator
| Field | Value |
|-------|-------|
| **Does** | Ensures headlines are complete copy (not templates), leads have written opening hooks, mechanisms have named steps, proof plans specify exact elements |
| **Input** | layer2-output.json (all candidate creative components) |
| **Output** | actionability_validation.json (status, headlines_complete/template counts, leads_with_copy/descriptions counts, mechanisms_with_steps/placeholders, proof_specific/vague) |
| **Source Lines** | Layer4-INSTRUCTIONS.md §VALIDATION GATE 4: ACTIONABILITY VALIDATION |

### 3.5: Anti-Slop Validator
| Field | Value |
|-------|-------|
| **Does** | Language quality gate — scans for banned phrases, AI telltales, structural quality (active voice ratio, abstract noun density, sentence necessity) |
| **Input** | layer2-output.json (all generated copy: headlines, leads, descriptions, rationales) |
| **Output** | anti_slop_validation.json (status, slop_density, violations[], revision suggestions) |
| **Source Lines** | NEW — mirrors 04-mechanisms/skills/layer-3/3.4-anti-slop-validator.md pattern |

### 3.6: Validation Summarizer
| Field | Value |
|-------|-------|
| **Does** | Aggregates all 5 validation results into overall PASS/FAIL; produces approved candidates list; routes failures to correct upstream layer |
| **Input** | volume_validation.json, quantification_validation.json, defensibility_validation.json, actionability_validation.json, anti_slop_validation.json |
| **Output** | layer3-output.json (overall_validation with gate_results, pass_count, ready_for_brief, approved_candidates[], failure_routing if applicable) |
| **Gate Criteria** | All 5 gates PASS = overall PASS. Any gate FAIL = overall FAIL with routing instructions |
| **Source Lines** | Layer4-INSTRUCTIONS.md §OVERALL VALIDATION SUMMARY + §APPROVED CANDIDATES LIST |

---

## Layer 4: Package (Brief Assembly)

**Source:** GENERATIVE-ENGINE-AGENT.md §Brief Generation + BIG-IDEA-BRIEF-TEMPLATE.md
**Purpose:** Compile final deliverable and package for downstream skills

### 4.1: Brief Compiler
| Field | Value |
|-------|-------|
| **Does** | Assembles BIG-IDEA-BRIEF.md from all validated outputs — market intelligence summary, 5 candidates with full creative execution, validation report, evidence base |
| **Input** | layer2-output.json (approved candidates), layer1-output.json (market intelligence), layer3-output.json (validation report), BIG-IDEA-BRIEF-TEMPLATE.md |
| **Output** | BIG-IDEA-BRIEF.md (final deliverable) |
| **Source Lines** | GENERATIVE-ENGINE-AGENT.md §Brief Generation + BIG-IDEA-BRIEF-TEMPLATE.md |

### 4.2: Downstream Mapper
| Field | Value |
|-------|-------|
| **Does** | Maps each approved Big Idea's components to downstream skill consumption points (03-root-cause, 04-mechanisms, 04-headlines, 05-leads, etc.) |
| **Input** | BIG-IDEA-BRIEF.md, approved candidates from layer3-output.json |
| **Output** | downstream_map.json (per downstream skill: what to extract, where to find it, format notes) |

### 4.3: Handoff Packager
| Field | Value |
|-------|-------|
| **Does** | Packages self-contained output for downstream consumption; verifies no external references remain; generates downstream skill instructions |
| **Input** | BIG-IDEA-BRIEF.md, downstream_map.json |
| **Output** | big_idea_package.json (terminal output — all downstream skills consume from here) |
| **Self-Containment Test** | Can any downstream skill execute using ONLY this package? |

---

## Mapping: Old Files → New Skills

| Old File | Old Scope | New Skills |
|----------|-----------|------------|
| Layer1-INSTRUCTIONS.md (§Input Requirements, §Validation) | File loading + validation | 0.1, 0.3 |
| Layer1-INSTRUCTIONS.md (§Schema Normalization) | Schema detection + conversion | 0.2 |
| Layer1-INSTRUCTIONS.md (§Component Pool Construction) | 6 pool builds | 0.4 |
| Layer1-INSTRUCTIONS.md (§Deep Research Summary) | Insight extraction | 0.5 |
| Layer1-INSTRUCTIONS.md (§Quality Gates) | Output validation | 0.6 |
| Layer2-INSTRUCTIONS.md (§Analysis 1) | Pattern ranking | 1.1 |
| Layer2-INSTRUCTIONS.md (§Analysis 2) | Saturation levels | 1.2 |
| Layer2-INSTRUCTIONS.md (§Analysis 3) | Gap identification | 1.3 |
| Layer2-INSTRUCTIONS.md (§Analysis 4) | Emotional mapping | 1.4 |
| Layer2-INSTRUCTIONS.md (§Analysis 5) | Mechanism mapping | 1.5 |
| Layer2-INSTRUCTIONS.md (§Quality Gates) | Vague qualifier enforcement | 1.6 |
| Layer3-INSTRUCTIONS.md (§Candidate Selection) | Strategy picking | 2.1 |
| Layer3-INSTRUCTIONS.md (§Candidate Architecture) | Core building | 2.2 |
| Layer3-INSTRUCTIONS.md (§Headline Generation) | Headline writing | 2.3 |
| Layer3-INSTRUCTIONS.md (§Lead Generation) | Lead writing | 2.4 |
| Layer3-INSTRUCTIONS.md (§Proof Architecture) | Proof planning | 2.5 |
| Layer3-INSTRUCTIONS.md (§Quality Gates) | Completeness check | 2.6 |
| Layer4-INSTRUCTIONS.md (§Gate 1) | Volume check | 3.1 |
| Layer4-INSTRUCTIONS.md (§Gate 2) | Quantification check | 3.2 |
| Layer4-INSTRUCTIONS.md (§Gate 3) | Defensibility check | 3.3 |
| Layer4-INSTRUCTIONS.md (§Gate 4) | Actionability check | 3.4 |
| NEW (anti-slop-standards.md) | Language quality | 3.5 |
| Layer4-INSTRUCTIONS.md (§Overall Validation) | Summary + approval | 3.6 |
| GENERATIVE-ENGINE-AGENT.md (§Brief) | Brief assembly | 4.1 |
| NEW | Downstream routing | 4.2 |
| NEW | Package finalization | 4.3 |

---

## Orchestrator: BIG-IDEA-AGENT.md

Replaces GENERATIVE-ENGINE-AGENT.md with the same state machine pattern as MECHANISM-AGENT.md:

```
IDLE → TRIGGERED → LAYER_0 → LAYER_1 → LAYER_2 → LAYER_3 → LAYER_4 → COMPLETE
                      ↓          ↓          ↓          ↓          ↓
                   [GATE_0]   [GATE_1]   [GATE_2]   [GATE_3]   [GATE_4]
                      ↓          ↓          ↓          ↓          ↓
                   PASS/FAIL  PASS/FAIL  PASS/FAIL  PASS/FAIL  PASS/FAIL
```

**Key differences from current orchestrator:**
- References individual microskill files (not monolithic Layer INSTRUCTIONS)
- Each gate is a dedicated microskill (not inline validation logic)
- Anti-slop validation added as Layer 3 gate (not in current system)
- Context window management preserved
- Session resume protocol preserved

---

## What Changes vs. What Stays

### CHANGES:
- 4 Layer INSTRUCTIONS files → 27 microskill files
- GENERATIVE-ENGINE-AGENT.md → BIG-IDEA-AGENT.md (new orchestrator)
- Anti-slop validation ADDED (not in current system)
- Downstream mapper ADDED (not in current system)
- Handoff packager ADDED (not in current system)

### PRESERVED:
- GENERATION-PRD.md (architectural reference, unchanged)
- BIG-IDEA-BRIEF-TEMPLATE.md (still used by 4.1-brief-compiler)
- output/ directory (runtime outputs still go here)
- All business logic (scoring rubrics, thresholds, formula types) — just relocated into bounded files
- Context window management protocol
- Session resume protocol

### DEPRECATED (moved to legacy/):
- Layer1-DataFoundation/Layer1-INSTRUCTIONS.md
- Layer2-Intelligence/Layer2-INSTRUCTIONS.md
- Layer3-Generation/Layer3-INSTRUCTIONS.md
- Layer4-Validation/Layer4-INSTRUCTIONS.md
- GENERATIVE-ENGINE-AGENT.md

---

## Execution Plan

### Phase 1: Create Directory Structure
Create `skills/layer-0/` through `skills/layer-4/` directories.

### Phase 2: Build Layer 0 Skills (Foundation)
Extract from Layer1-INSTRUCTIONS.md. 6 files. Most straightforward — data loading with explicit I/O.

### Phase 3: Build Layer 1 Skills (Intelligence)
Extract from Layer2-INSTRUCTIONS.md. 6 files. Each analysis is already a self-contained section.

### Phase 4: Build Layer 2 Skills (Generation)
Extract from Layer3-INSTRUCTIONS.md. 6 files. This is the most complex decomposition — separating strategy from architecture from headline writing from lead writing from proof planning.

### Phase 5: Build Layer 3 Skills (Validation)
Extract from Layer4-INSTRUCTIONS.md + new anti-slop. 6 files. Each gate is already independent.

### Phase 6: Build Layer 4 Skills (Package)
Partially new, partially from orchestrator. 3 files.

### Phase 7: Build BIG-IDEA-AGENT.md
New orchestrator referencing all 27 microskills by file path.

### Phase 8: Deprecate Old Files
Move Layer INSTRUCTIONS files to `GenerativeEngine/legacy/` subdirectory. Update any references.

---

## Microskill Template (Standard Format)

Each microskill follows this structure:

```markdown
# Skill X.Y: [Name]

**Version:** 1.0
**Layer:** [N] ([Layer Name])
**Type:** [Evaluation/Generation/Validation/Aggregation/etc.]
**Dependencies:** [upstream output files]
**Output:** [output_file.json]

---

## Purpose
[One sentence: what this skill does]

---

## The Question
[The single question this skill answers — in bold]

---

## Input Schema
[Explicit YAML schema of expected inputs]

---

## Output Schema
[Explicit YAML schema of produced outputs]

---

## [Process/Logic/Evaluation] Steps
[Step-by-step execution logic]

---

## Quality Criteria
[Numbered list of what "done right" looks like]

---

## Output Location
[Exact file path for output]
```

---

## Verification Criteria

After all 27 microskills + orchestrator are built:

1. Every field in every output schema traces to a specific input source
2. No microskill performs more than one distinct job
3. All gates are binary PASS/FAIL with explicit criteria
4. The orchestrator references exactly 27 skill files
5. Old Layer INSTRUCTIONS files are moved to legacy/
6. A copywriter using ONLY the brief output can write copy without follow-up questions
7. Anti-slop standards are enforced (not present in current system)
8. Downstream mapping exists (not present in current system)

---

## Total Skill Count: 27 + 1 Orchestrator

| Layer | Count | Focus |
|-------|-------|-------|
| Layer 0: Foundation | 6 | Data loading, normalization, validation, pools |
| Layer 1: Intelligence | 6 | Pattern, saturation, gap, emotional, mechanism analysis |
| Layer 2: Generation | 6 | Strategy, architecture, headlines, leads, proof |
| Layer 3: Validation | 6 | Volume, quantification, defensibility, actionability, anti-slop |
| Layer 4: Package | 3 | Brief, downstream map, handoff |
| **Total** | **27** | + BIG-IDEA-AGENT.md orchestrator |
