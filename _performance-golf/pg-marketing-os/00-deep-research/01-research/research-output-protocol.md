# Deep Research System v3 - Output Protocol

**Version:** 5.5 (decomposed from MASTER-AGENT.md v5.4)
**Created:** January 17, 2026
**Last Updated:** February 25, 2026
**Purpose:** Output structure, session recap, checkpoint persistence, and mandatory file protocol
**Parent Document:** [[RESEARCH-ORCHESTRATOR]] (load that file FIRST)

---

## Output Structure

Each project produces:

```
Deep-Research-v3/projects/[project-name]/
├── source-docs/
│   ├── brief.yaml
│   └── context_expansion.json
├── market_config.yaml                   ← Market configuration
├── checkpoints/                          ← Checkpoint persistence (FAIL-002)
│   ├── latest_checkpoint.json
│   ├── checkpoint_layer1_complete.json
│   ├── checkpoint_layer2_complete.json
│   └── checkpoint_history/
├── layer-1-outputs/
│   ├── platform_list.json
│   ├── queries.json
│   ├── raw_sources.json
│   ├── scored_sources.json
│   ├── approved_sources.json
│   ├── raw_content/
│   ├── extracted_quotes.json
│   ├── tagged_quotes.json
│   ├── quantified_buckets.json
│   ├── saturation_report.json
│   └── layer1_checkpoint.json
├── layer-2-outputs/
│   ├── effect_map.json
│   ├── validated_effect_map.json
│   ├── audience_segments.json
│   ├── audience_effect_matches.json
│   ├── aspect_tagged_quotes.json
│   ├── aspect_connections.json
│   ├── web_analysis.json
│   ├── belief_inventory.json
│   ├── gap_counts.json
│   ├── assessed_gaps.json
│   ├── competitor_claims.json
│   ├── villain_inventory.json
│   ├── mechanism_map.json
│   ├── exclusion_registry.json
│   ├── saturation_map.json
│   ├── market_sophistication.json
│   ├── competitor_offer_analysis.json
│   ├── sin_offer_brief.md
│   ├── trend_analysis.json
│   ├── timing_signals.json
│   ├── now_after_grid.json
│   ├── ideal_client_outcome.json
│   ├── magic_wand.json
│   ├── dimensionalized_benefits.json
│   ├── advanced_patterns.json
│   ├── e5_synthesis.json
│   ├── market_intelligence.md
│   ├── voice_of_customer_analysis.md
│   └── layer2_checkpoint.json
├── layer-2-rsf-outputs/
│   ├── expectation_schema.json
│   └── latent_resonance_field.json
├── layer-3-outputs/
│   ├── ranked_opportunities.json
│   ├── evidence_packages.json
│   ├── objection_responses.json
│   ├── risk_factors.json
│   ├── action_sequence.json
│   ├── measurement_framework.json
│   └── opportunity_map.md
├── validation-logs/
│   ├── checkpoint-1.md
│   ├── checkpoint-2.md
│   └── checkpoint-3.md
├── context.yaml
├── execution_log.md
├── summary.md
├── session_recap.yaml
└── FINAL_HANDOFF.md  ← PRIMARY DELIVERABLE
```

---

## Invocation

To run the Master Agent:

```
/research-v2 [project-name]
```

The Master Agent will:
1. Prompt for research brief if not provided
2. Validate brief completeness
3. **Execute market configuration** (adapt to the market)
4. Execute context expansion
5. Begin Layer 1 with PRD-validated minimums
6. Self-validate and self-expand when needed
7. Pause only at strategic checkpoints
8. Generate FINAL_HANDOFF.md when all PRD criteria met
9. Deliver single comprehensive handoff document

---

## Session Recap Protocol (Human-in-the-Loop Optimization)

**Purpose:** Capture learnings after each research session to continuously improve the system.

### After Every Research Session

At the end of each research project (after FINAL_HANDOFF.md is delivered), generate a session recap:

```yaml
# session_recap.yaml

session_metadata:
  project_name: [project name]
  market_industry: [from market_config]
  completion_date: [date]
  total_duration: [hours]
  quote_volume_achieved: [number]
  layers_completed: [1, 2, 3]

market_adaptation:
  configuration_accuracy: "[How well did the market config serve the research]"
  terminology_adjustments: "[Any terminology that needed changing mid-research]"
  platform_effectiveness: "[Which platforms yielded best data]"
  aspect_category_notes: "[Were the aspects appropriate for this market]"

## WHAT WORKED WELL
successes:
  - description: "[What succeeded]"
    replicable: true/false
    skill_affected: "[Skill ID if applicable]"

## WHAT DIDN'T WORK
challenges:
  - description: "[What failed or was difficult]"
    root_cause: "[Why it failed]"
    resolution: "[How it was resolved, if at all]"
    skill_affected: "[Skill ID if applicable]"

## TOOLS PERFORMANCE
tool_performance:
  primary_tool_success_rate: [percentage]
  fallback_triggered_count: [number]
  sources_requiring_manual: [list]
  tool_recommendations: "[Any tool changes needed]"

## QUOTE QUALITY ASSESSMENT
quote_quality:
  high_value_quote_percentage: [percentage]
  quote_density_by_bucket:
    PAIN: [number]
    HOPE: [number]
    ROOT_CAUSE: [number]
    SOLUTIONS_TRIED: [number]
  underperforming_topics: [list of topics with low coverage]

## E5 ANALYSIS QUALITY
e5_analysis:
  web_analysis_completeness: "[Complete/Partial/Missing]"
  belief_excavation_depth: "[Deep/Moderate/Shallow]"
  market_sophistication_confidence: [percentage]
  now_after_grid_quality: "[High/Medium/Low]"
  benefit_dimensionalization: "[Complete/Partial/Missing]"
  objection_coverage: "[Comprehensive/Adequate/Gaps]"

## COMPETITIVE INTELLIGENCE QUALITY
competitive_intelligence:
  competitors_analyzed: [number]
  mechanisms_mapped: [number]
  villain_data_richness: "[Rich/Moderate/Sparse]"
  offer_analysis_completeness: "[Complete/Partial/Missing]"

## RECOMMENDATIONS FOR NEXT SESSION
improvements:
  immediate:
    - "[Changes to apply immediately]"
  skill_updates:
    - skill_id: "[Skill ID]"
      suggested_change: "[What to change]"
      rationale: "[Why]"
  market_config_updates:
    - "[Suggestions for improving market configuration]"
  process_updates:
    - "[Process improvements]"

## HUMAN FEEDBACK REQUESTED
feedback_requested:
  - question: "[Specific question for human review]"
    context: "[Why this question matters]"
    options: "[Possible answers/directions]"
```

### Session Recap Output Location

Save to: `Deep-Research-v3/projects/[project-name]/session_recap.yaml`

---

## MANDATORY OUTPUT FILE PROTOCOL (v5.2)

```
╔══════════════════════════════════════════════════════════════════════════════╗
║  CRITICAL: ALL REQUIRED OUTPUT FILES ARE MANDATORY                           ║
║                                                                               ║
║  The skill is NOT COMPLETE until ALL files exist and pass validation.        ║
║  You MUST NOT claim completion without verifying each file individually.     ║
║  You MUST NOT skip any layer output or handoff file creation.                ║
║                                                                               ║
║  FAILURE TO CREATE ANY REQUIRED FILE = SKILL EXECUTION FAILURE               ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

### REQUIRED OUTPUT FILES

| File | Format | Purpose | Validation Requirement |
|------|--------|---------|------------------------|
| `FINAL_HANDOFF.md` | Markdown | Primary deliverable for downstream skills | Must contain all sections per PRD |
| `layer1-raw-quotes.md` | Markdown | Layer 1 extraction output | Must meet quote minimums per PRD |
| `layer2-intelligence-analysis.md` | Markdown | Layer 2 analysis output | Must contain all analysis categories |
| `execution-log.md` | Markdown | Execution verification | Must show all microskills checked |

### COMPLETION GATE (MANDATORY BEFORE DECLARING SUCCESS)

```
OUTPUT FILE VERIFICATION CHECKLIST:
┌───────────────────────────────────────────────────────────────────────────────┐
│ [ ] FINAL_HANDOFF.md EXISTS in project outputs folder                         │
│ [ ] FINAL_HANDOFF.md contains all required sections per RESEARCH-PRD          │
│ [ ] FINAL_HANDOFF.md quote count meets PRD minimums                           │
│                                                                                │
│ [ ] layer1-raw-quotes.md EXISTS in project outputs folder                     │
│ [ ] layer1-raw-quotes.md contains quotes for all required buckets             │
│                                                                                │
│ [ ] layer2-intelligence-analysis.md EXISTS in project outputs folder          │
│ [ ] layer2-intelligence-analysis.md contains all analysis categories          │
│                                                                                │
│ [ ] execution-log.md EXISTS in project outputs folder                         │
│ [ ] execution-log.md shows ALL layers executed with checkboxes                │
│ [ ] execution-log.md shows enforcement gate checks                            │
└───────────────────────────────────────────────────────────────────────────────┘

IF ANY CHECKBOX IS UNCHECKED:
  → DO NOT claim skill completion
  → CREATE the missing file(s)
  → POPULATE the missing section(s)
  → RE-VERIFY the entire checklist
  → ONLY THEN report completion to user
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | Jan 17, 2026 | Initial agnostic version. Added Phase 0 Market Configuration for dynamic market adaptation. Full E5 Method integration. Tool resilience protocols. Autonomous execution with self-expansion. Market-configurable terminology, platforms, and aspects. |
| 3.0 | Jan 23, 2026 | NateJones optimization: Added IDENTITY section, CONSTRAINTS (18 rules), GUARDRAILS (trigger-template refusals, uncertainty protocol, post-step validation). Constraint ratio: 0.48 → 0.65. Guardrail coverage: 3/7 → 6/7. |
| 4.0 | Jan 28, 2026 | Constraint ratio boost: Expanded CONSTRAINTS from 26 to 52 rules (+26 new). Added constraints to all layer execution sections. Added FAILURE MODES table (12 modes). Added ANTI-SLOP LEXICON. Converted passive quality gates to active enforcement throughout. Target constraint ratio: 0.20 → 0.60. |
| 5.2 | Jan 31, 2026 | Added MANDATORY OUTPUT FILE PROTOCOL with explicit file requirements and completion gate checklist. |

---

**Related Documents:**
- [[Unused Copy Processes/Deep-Research-v3/RESEARCH-PRD]]
- [[Miscellaneous/Unused Copy Processes/Deep-Research-v3/QUALITY-STANDARDS]]
- [[market-configs/]]

**Methodology Reference:** [[Todd Brown E5 Method]]

---

*Extracted from MASTER-AGENT.md v5.4 on 2026-02-25.*
