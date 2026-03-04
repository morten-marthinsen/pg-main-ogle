# Research System v3 - Master Agent

**Version:** 3.5
**Created:** January 15, 2026
**Last Updated:** January 20, 2026
**Role:** Workflow Orchestrator
**Related Document:** [[RESEARCH-PRD]] (Requirements & Standards)
**Methodology Reference:** Todd Brown E5 Method Integration

**v3.5 CRITICAL CHANGES:**
- Added Phase 3.5: Layer 2.5 - Synthesis (MANDATORY)
- Changed Final Handoff from SYNTHESIS to ASSEMBLY operation
- Added Pre-Assembly Validation gate requiring Layer 2.5 artifacts
- Added 6 new synthesis micro-skills (2.5-A through 2.5-F)
- Root cause fix for SF2 v1 incomplete handoff incident

---

## CRITICAL: CORE INFRASTRUCTURE (v3.4 ADDITIONS)

**Before ANY research execution, these core skills MUST be active:**

| Core Skill | Purpose | Status |
|------------|---------|--------|
| **0.1-state-manager** | Checkpointing, session recovery, state persistence | ALWAYS ACTIVE |
| **0.2-tool-resilience** | Fallback chains, tool failure recovery | ALWAYS ACTIVE |
| **0.3-authenticity-validator** | Verify quotes are real, not fabricated | RUNS AFTER 1.5-A |
| **0.4-technical-audit** | Boris Cherny forensic audit at end of every iteration | RUNS POST-ITERATION |

```yaml
core_infrastructure:
  state_management:
    checkpoint_frequency: "after every skill completion"
    session_recovery: "automatic on restart"
    file: [[micro-skills/core/0.1-state-manager.md]]

  tool_resilience:
    fallback_chains: "defined for all external tools"
    failure_handling: "automatic with logging"
    file: [[micro-skills/core/0.2-tool-resilience.md]]

  authenticity_validation:
    when: "after extraction, before Layer 2"
    blocking: true
    file: [[micro-skills/core/0.3-authenticity-validator.md]]

  technical_audit:
    when: "end of every iteration, after ANY skill/process modification"
    mandatory: true
    perspective: "Boris Cherny / Claude Code Team Lead"
    file: [[micro-skills/core/0.4-technical-audit.md]]
```

**These core skills prevent the failures that caused the Ion Golf Ball incident.**

---

## CRITICAL: PRD REFERENCE

This Master Agent is the **execution workflow**. It answers: **"How do we execute?"**

For all requirements, minimums, acceptance criteria, and quality standards, reference: **[[RESEARCH-PRD]]**

**If there is ANY conflict between this document and the PRD, the PRD takes precedence.**

Key PRD sections to reference:
- Quote minimums and bucket structure: [[RESEARCH-PRD#Section 3]]
- Contextual expansion rules: [[RESEARCH-PRD#Section 2]]
- Layer acceptance criteria: [[RESEARCH-PRD#Section 4]]
- Autonomous execution rules: [[RESEARCH-PRD#Section 7]]
- Tool resilience protocols: [[RESEARCH-PRD#Section 6]]
- Final output schema: [[RESEARCH-PRD#Section 5]]

---

## What This Agent Does

The Master Agent orchestrates the entire research process. It maintains context, manages flow, delegates to micro-skills, handles validation checkpoints, and ensures PRD requirements are met.

**It DOES:**
- Orchestrate the execution sequence
- Validate PRD requirements at each gate
- Manage tool resilience and fallbacks
- Maintain session state for continuity
- Self-validate and self-expand when requirements not met
- **Synthesize** disparate findings into coherent intelligence
- Generate final output when all criteria satisfied

**It does NOT:**
- Scrape data (delegated to scraper skills)
- Analyze patterns (delegated to analysis skills)
- Interpret findings (delegated to intelligence skills)
- Make subjective quality judgments (PRD defines quality)

All work is delegated to micro-skills. All requirements come from the PRD.

---

## Activation

When invoked with a research brief, the Master Agent:

1. Validates the brief has required information
2. Initializes the project folder
3. **Executes Context Expansion (NEW - Step 1.0)**
4. Begins Layer 1 sequence with PRD-defined minimums
5. Self-validates at each gate against PRD requirements
6. Continues automatically when gates pass
7. Pauses only at strategic human checkpoints
8. Produces final handoff package when all PRD criteria met

---

## Required Input (Research Brief)

```yaml
product:
  name: [Product name]
  category: [Market category - e.g., "Wedges", "Irons", "Golf Balls"]
  description: [What it does - 1-3 sentences]
  known_benefits: [List of known/claimed benefits]
  price_point: [Approximate price or range]

market:
  mode: [A or B]
  # Mode A: Existing product with marketing history
  # Mode B: New product with no marketing

  existing_marketing: [URLs to current marketing if Mode A]
  target_customer: [Who it's currently positioned for, if known]

constraints:
  budget: [Scraping budget in dollars, default $25]
  timeline: [Urgency level: standard/rush]
  focus_areas: [Optional - specific areas to prioritize]

context:
  why_now: [Why is this research being done?]
  known_gaps: [What do you already suspect but need validated?]
  concept_doc: [Optional - URL to product concept document for cross-reference]
```

---

## Execution Sequence

### Phase 1: Initialization

```
1. CHECK FOR EXISTING SESSION
   - Call: STATE_MANAGER.session_start()
   - IF existing checkpoint found:
     - Prompt: "Resume from checkpoint or restart?"
     - IF resume: Load checkpoint state, skip to resume point
     - IF restart: Confirm, then proceed with fresh start

2. Validate brief completeness
   - All required fields present
   - Product category clearly defined (needed for context expansion)

3. Create project folder: pg-deep-research-v2/projects/[project-name]/
4. Create subfolders (CANONICAL STRUCTURE):
   - checkpoints/         # State management files
   - execution/           # Logs, manifests, reports
   - raw-data/            # Raw scrape data (SOURCE OF TRUTH)
   - source-docs/         # Processed source documents
   - layer-1-outputs/
   - layer-2-outputs/
   - layer-3-outputs/

5. Save brief to source-docs/brief.yaml

6. Initialize STATE_MANAGER:
   - Create current_state.json
   - Create execution_log.jsonl
   - Create skill_outputs_manifest.json
   - Set session_id, project_id, timestamps
   - Log: "State management initialized"

7. Load PRD requirements from [[RESEARCH-PRD.md]]
   - Verify PRD file exists and is readable
   - Cache minimum requirements for validation gates

8. Initialize TOOL_RESILIENCE:
   - Verify all tool chains are configured
   - Test primary tools are accessible
   - Log: "Tool chains ready"

9. Create initial checkpoint:
   - STATE_MANAGER.checkpoint_create("initialization_complete")

10. Log: "Project initialized, state management active, ready for context expansion"
```

---

### Phase 2: Layer 1 - Infrastructure

#### STEP 1.0: Context Expansion (NEW - CRITICAL)

**Reference:** [[RESEARCH-PRD#Section 2]] for expansion rules

```
STEP 1.0: Context Expansion
├── Call: 1.0-A Context Expander
│   Input: product.category, product.description, product.known_benefits
│   Output: context_expansion.json
│
│   Expansion Logic:
│   1. Identify CATEGORY (e.g., "Wedges")
│   2. Identify CONTEXT (e.g., "Short Game")
│   3. **Ruminate** on PRIMARY RESEARCH TOPICS (10+)
│   4. Generate EQUIPMENT-SPECIFIC TOPICS
│   5. Generate COMPETITOR CONTEXT TOPICS
│   6. **Calibrate** SOURCE TYPES for each topic area
│
├── Validation:
│   - Primary topics >= 10
│   - Equipment topics >= 5
│   - Competitor topics >= 5 (competitors to analyze)
│   - Source types include: instructional, forums, reviews, competitor pages
│   - Emotional/psychological topics included
│
├── IF validation fails:
│   - Expand topic list
│   - DO NOT proceed without adequate coverage
│
└── Log: "Context expanded: [X] primary topics, [Y] source types identified"
```

#### STEP 1.1: Platform & Query Generation

```
STEP 1.1: Platform & Query Generation
├── Call: 1.1-A Platform Identifier
│   Input: context_expansion.json (NOT just product category)
│   Output: platform_list.json
│
│   Platform Selection Based On Context:
│   - Forums: GolfWRX, TheSandTrap, MyGolfSpy, Reddit
│   - Video: YouTube (instructional + reviews)
│   - Reviews: Amazon, Golf Galaxy, PGA Superstore
│   - Social: TikTok (younger demo), Instagram (brand messaging)
│   - Research: Academic sources if available
│
├── Call: 1.1-B Query Generator
│   Input: context_expansion.json + platform_list.json
│   Output: queries.json
│
│   Query Generation Rules:
│   - Generate queries for EACH research topic (not just product)
│   - Include instructional queries ("how to stop chunking")
│   - Include emotional queries ("chipping anxiety", "fear of...")
│   - Include problem queries ("can't hit chip shots")
│   - Include equipment queries (competitor names, product types)
│   - Minimum: 50 queries total, 5 per major topic
│
├── Validation:
│   - Queries cover all research topics from context expansion
│   - Mix of problem, emotional, instructional, and equipment queries
│   - No topic has fewer than 5 queries
│
└── Log: "Generated [X] queries across [Y] platforms for [Z] topics"
```

#### STEP 1.2: Source Discovery & Evaluation

```
STEP 1.2: Source Discovery & Evaluation
├── Call: 1.2-A Source Scanner
│   Input: queries.json, platform_list.json
│   Output: raw_sources.json
│
│   Minimum Requirements:
│   - 100+ potential sources identified
│   - Coverage across all research topics
│   - Mix of source types (forums, videos, reviews, competitor pages)
│
├── Call: 1.2-B Source Scorer
│   Input: raw_sources.json
│   Output: scored_sources.json
│
│   Scoring Criteria:
│   - Relevance to research topics
│   - Content volume (threads with 50+ replies score higher)
│   - Recency (last 2 years preferred)
│   - Authority (established forums > random blogs)
│
├── Validation:
│   - 50+ sources score above threshold
│   - All research topics have at least 3 high-scoring sources
│   - Platform diversity maintained
│
└── Log: "Discovered [X] sources, [Y] passed scoring threshold"
```

#### STEP 1.3: Source Validation

```
STEP 1.3: Source Validation
├── Call: 1.3-A Source Validator (Agent Critic)
│   Input: scored_sources.json
│   Output: validation_report.md + approved_sources.json
│
│   Validation Checks:
│   - Source is accessible (not paywalled, not 404)
│   - Content is relevant to research topics
│   - Content volume justifies scraping cost
│   - No duplicate sources
│
├── >>> CHECKPOINT 1 <<<
│   Present: validation_report.md to human
│   Show: Source list, coverage by topic, estimated scraping cost
│   Require: Human approval before expensive scraping
│   Allow: Human to add/remove sources, modify priorities
│
├── Human Actions Possible:
│   - Approve as-is
│   - Add manual sources
│   - Remove sources
│   - Adjust priorities
│   - Increase/decrease budget
│
└── Log: "Checkpoint 1 passed, [X] sources approved for scraping"
```

#### STEP 1.4: Deep Scraping (PARALLEL WITH RESILIENCE)

**Reference:** [[RESEARCH-PRD#Section 6]] for tool resilience protocols

```
STEP 1.4: Deep Scraping (PARALLEL)
├── After checkpoint approval, run all applicable scrapers in parallel:
│
├── Tool Resilience Protocol (CRITICAL):
│   PRIMARY: Firecrawl
│   FALLBACK 1: Apify (apify/rag-web-browser)
│   FALLBACK 2: Exa (web_search_exa)
│   FALLBACK 3: Manual source list (LAST RESORT)
│
│   ON TOOL FAILURE:
│   - Log failure with details
│   - AUTOMATICALLY switch to next tool
│   - DO NOT halt, DO NOT wait for human
│   - Continue scraping with fallback tool
│
├── Platform Blocking Protocol:
│   IF Reddit blocked → Switch to GolfWRX, TheSandTrap forums
│   IF YouTube comments blocked → Use video transcripts
│   IF Amazon blocked → Switch to Golf Galaxy, PGA Superstore
│   ALWAYS: Find equivalent source, continue without interruption
│
├── Call (Parallel):
│   1.4-A Deep Scraper - Forums (GolfWRX, TheSandTrap, etc.)
│   1.4-B Deep Scraper - YouTube (comments + transcripts)
│   1.4-C Deep Scraper - Reddit (if accessible)
│   1.4-D Deep Scraper - Social (TikTok, Instagram)
│   1.4-E Deep Scraper - Reviews (Amazon, retailer sites)
│   1.4-F Deep Scraper - Ads Library (competitor ads)
│   1.4-G Deep Scraper - Funnels (competitor pages)
│   1.4-H Deep Scraper - Instructional Content (NEW)
│
├── Output: raw_content/ folder with all scraped data
│
├── Scraping Depth (Reference PRD):
│   - Continue until saturation OR minimum sources scraped
│   - Saturation = same patterns appearing 5+ times from different sources
│   - DO NOT stop at arbitrary number if saturation not reached
│
├── FAILURE HANDLING:
│   - Single source fails: Log, skip, continue (do not halt)
│   - Tool fails: Switch to fallback, continue (do not halt)
│   - All tools fail for critical source: Add to manual review list, continue
│   - ONLY halt if >50% of sources fail (catastrophic failure)
│
└── Log: "Scraping complete: [X] sources scraped, [Y] items collected, [Z] tool switches"
```

#### STEP 1.5: Extraction, Quantification & Saturation

**Reference:** [[RESEARCH-PRD#Section 3]] for quote requirements and bucket structure

```
STEP 1.5: Extraction, Quantification & Saturation
├── Call: 1.5-A Content Extractor
│   Input: raw_content/
│   Output: extracted_quotes.json
│
│   Extraction Rules:
│   - **Excavate** VERBATIM quotes (no cleaning, no paraphrasing)
│   - Full context attached (source, author, thread, date)
│   - **Scrutinize** for specificity (dollar amounts, product names, numbers)
│
├── Call: 1.5-B Basic Tagger
│   Input: extracted_quotes.json
│   Output: tagged_quotes.json
│
│   Tagging into PRD-defined buckets:
│   - PAIN (physical problems)
│   - HOPE (desires)
│   - ROOT_CAUSE (beliefs about why)
│   - SOLUTIONS_TRIED (what they've attempted)
│   - COMPETITOR_MECHANISM (how competitors claim to work)
│
├── Call: 1.5-C Quantifier (NEW)
│   Input: tagged_quotes.json
│   Output: quantified_buckets.json
│
│   Quantification:
│   - Count total quotes
│   - Count per bucket
│   - Count per subcategory
│   - Identify subcategories dynamically from content
│   - Generate "Total Mentions: [X]" tallies
│   - Extract top 25 verbatim for each subcategory (if 25+ exist)
│
├── Call: 1.5-D Saturation Analyzer (NEW)
│   Input: quantified_buckets.json
│   Output: saturation_report.json
│
│   Saturation Analysis:
│   - **Distill** clusters (pain points close together)
│   - **Scrutinize** ambiguous clusters requiring expansion
│   - Check topic coverage from context expansion
│   - Verify no research topic has < 50 quotes
│
├── Self-Validation Gate (PRD Reference):
│   Check against [[RESEARCH-PRD.md#Section 3.1]]:
│   - Total quotes >= 1,000?
│   - Pain quotes >= 300?
│   - Hope quotes >= 250?
│   - Root cause quotes >= 200?
│   - Solutions tried quotes >= 150?
│   - No ambiguous clusters?
│   - All research topics covered?
│
├── IF validation fails:
│   - Identify which criterion failed
│   - Identify which topics/buckets need expansion
│   - Generate additional queries for underperforming areas
│   - RETURN to Step 1.4 for additional scraping
│   - DO NOT proceed to Layer 2
│   - DO NOT ask human for permission to continue
│   - AUTOMATICALLY expand search
│
├── Dynamic Expansion Trigger:
│   IF saturation_report shows cluster ambiguity:
│   - Log: "Cluster detected: [pain points X, Y, Z] - expanding search"
│   - Generate targeted queries to differentiate
│   - Scrape additional sources
│   - Re-run quantification
│   - Continue until cluster resolves OR validated as single phenomenon
│
└── Log: "Layer 1 complete: [X] total quotes, all PRD minimums met, saturation achieved"
```

#### STEP 1.6: Layer 1 Checkpoint

```
STEP 1.6: Layer 1 Checkpoint
├── Call: 1.6-A Layer 1 Checkpoint (Agent Critic)
│   Input: quantified_buckets.json + saturation_report.json
│   Output: layer1_checkpoint.json
│
│   Validates (Reference [[RESEARCH-PRD.md#Checklist B]]):
│   - All PRD minimums met
│   - Saturation achieved
│   - No unresolved cluster ambiguity
│   - All research topics from context expansion covered
│   - Competitor analysis complete (5+ with root cause + mechanism)
│
├── >>> CHECKPOINT 2 (Agent Only - No Human) <<<
│   This is an INTERNAL validation checkpoint
│   Human is NOT involved unless validation FAILS
│
│   IF PASSED: Proceed automatically to Layer 2
│   IF WARNING: Proceed with documented concerns
│   IF FAILED:
│     - Identify failure reason
│     - Auto-expand in failed area
│     - Re-run validation
│     - Only escalate to human if 3 expansion attempts fail
│
└── Log: "Layer 1 checkpoint passed, proceeding to Layer 2"
```

---

### Phase 3: Layer 2 - Intelligence

**Reference:** [[RESEARCH-PRD#Section 4.2]] for Layer 2 requirements

```
STEP 2.1: Effect Mapping
├── Call: 2.1-A Effect Mapper
│   Input: brief + quantified_buckets.json
│   Output: effect_map.json
│
├── Call: 2.1-B Effect Validator
│   Input: effect_map.json + quantified_buckets.json
│   Output: validated_effect_map.json
│
└── Log: "Effects mapped and validated"

STEP 2.2: Audience & Aspect Analysis (+ E5 WEB Analysis)
├── Call: 2.2-A Audience Identifier
│   Input: quantified_buckets.json
│   Output: audience_segments.json
│
│   Must produce:
│   - Primary segment with demographics + psychographics + emotional state
│   - Secondary segment(s) if data supports
│
├── Call: 2.2-B Audience-Effect Matcher
│   Input: audience_segments.json + validated_effect_map.json
│   Output: audience_effect_matches.json
│
├── Call: 2.2-C Aspect Extractor
│   Input: quantified_buckets.json
│   Output: aspect_tagged_quotes.json
│
├── Call: 2.2-D Aspect Connector
│   Input: aspect_tagged_quotes.json
│   Output: aspect_connections.json
│
├── Call: 2.2-E WEB Analysis Deep (E5 Tool 2) [NEW]
│   Input: quantified_buckets.json + audience_segments.json
│   Output: web_analysis.json
│
│   Must produce (Reference E5 Method):
│   - WANTS: Desires in prospect's own language
│   - EMOTIONS: Fear, frustration, embarrassment, hope states
│   - BELIEFS: Pre-existing marketplace beliefs
│   - All with verbatim quote evidence
│
├── Call: 2.2-F Belief Excavator (E5 Tool 2B) [NEW]
│   Input: quantified_buckets.json + web_analysis.json
│   Output: belief_inventory.json
│
│   Must produce:
│   - Beliefs about WHY the problem exists
│   - Beliefs about WHAT works/doesn't work
│   - Beliefs about WHO can solve it
│   - Beliefs about HOW solutions should work
│   - Alignable vs challengeable belief classification
│
└── Log: "Audience, aspect, and WEB analysis complete"

STEP 2.3: Gap Detection (parallel with 2.4)
├── Call: 2.3-A Gap Counter
│   Input: quantified_buckets.json
│   Output: gap_counts.json
│
├── Call: 2.3-B Gap Assessor
│   Input: gap_counts.json
│   Output: assessed_gaps.json
│
└── Log: "Gaps detected and assessed"

STEP 2.4: Competitive Analysis (parallel with 2.3) [EXPANDED FOR E5]
├── Call: 2.4-A Competitor Claim Mapper (+ Villain Extraction)
│   Input: competitor data from Layer 1 + quote_extractions + forum_data
│   Output: competitor_claims.json + villain_inventory.json
│
│   Must produce for each competitor:
│   - Claimed root cause (what problem they say they solve)
│   - Marketing message (positioning/tagline)
│   - Implicit belief (what their messaging assumes)
│   - Weakness (where claim is vulnerable)
│   - VILLAIN DATA: What prospects HATE about this competitor
│
│   Must produce consolidated villain inventory:
│   - Hated features across market
│   - Hated products across market
│   - Hated messaging/positioning
│   - Hated experiences
│
├── Call: 2.4-B Saturation Scorer
│   Input: competitor_claims.json
│   Output: saturation_map.json
│
├── Call: 2.4-C Mechanism Mapper (NAME + ARTICULATION format)
│   Input: competitor data + ads + funnels
│   Output: mechanism_map.json + exclusion_registry.json
│
│   Must produce:
│   - 15+ unique technologies/mechanisms mapped
│   - Per mechanism: NAME object + ARTICULATION object
│   - Exclusion notes for mechanism creation agent
│   - Articulation gaps (underexplained mechanisms = opportunity)
│
├── Call: 2.4-D Promise Exposure Analyzer (E5 Tool 6) [NEW]
│   Input: competitor_claims.json + saturation_map.json + ads_data
│   Output: market_sophistication.json
│
│   Must produce:
│   - Market Sophistication Stage diagnosis (1-5)
│   - Lead strategy recommendation based on stage
│   - Evidence supporting stage diagnosis
│   - Historical progression analysis
│
├── Call: 2.4-E Competitor Offer Analyzer (E5 Competitor) [NEW]
│   Input: competitor_claims.json + funnel_data + product_pages
│   Output: competitor_offer_analysis.json + sin_offer_brief.md
│
│   Must produce for each competitor:
│   - Deliverables (what they get)
│   - Features (facts about product)
│   - Price and terms
│   - Bonuses and premiums
│   - Guarantee / risk reversal (STRONG/MEDIUM/WEAK rating)
│
│   Must produce SIN intelligence:
│   - SUPERIOR: What would beat market
│   - IRRESISTIBLE: What creates urgency
│   - NO-BRAINER: What removes all risk
│
└── Log: "Competitive analysis complete: [X] competitors, [Y] mechanisms, Stage [Z] market"

STEP 2.5: Timing & Trends
├── Call: 2.5-A Trend Detector
│   Input: quantified_buckets.json (with timestamps)
│   Output: trend_analysis.json
│
├── Call: 2.5-B Timing Assessor
│   Input: trend_analysis.json
│   Output: timing_signals.json
│
└── Log: "Timing analysis complete"

STEP 2.6: Advanced Pattern Detection + E5 Prospect Examination (PARALLEL)
├── Run all in parallel:
│   2.6-A Contrarian Detector
│   2.6-B Pattern Linker
│   2.6-C Villain Identifier
│   2.6-D Transformation Mapper
│   2.6-E Category Creation Detector
│   2.6-F Loss Aversion Weighter
│
├── After base patterns complete, run E5 tools in parallel:
│
├── Call: 2.6-H Now-After Grid (E5 Tool 3) [NEW]
│   Input: quantified_buckets.json + web_analysis.json
│   Output: now_after_grid.json
│
│   Must produce 4-quadrant transformation map:
│   - HAVE: Before → After (tangible possessions)
│   - EXPERIENCE: Before → After (daily experiences)
│   - STATUS: Before → After (how others see them)
│   - FEELING: Before → After (internal emotional state)
│   - All with verbatim evidence
│
├── Call: 2.6-I Ideal Client Outcome (E5 Tool 4) [NEW]
│   Input: now_after_grid.json + web_analysis.json
│   Output: ideal_client_outcome.json
│
│   Must produce:
│   - Constructed "best success story"
│   - Primary transformation statement
│   - Key quote evidence from real prospects
│   - Desired end state in prospect language
│
├── Call: 2.6-J Magic Wand Extractor (E5 Tool 5) [NEW]
│   Input: quantified_buckets.json + web_analysis.json
│   Output: magic_wand.json
│
│   Must produce:
│   - Perfect world desires (no constraints)
│   - Specific trigger question responses
│   - Blue-sky wishes in prospect language
│   - Unfulfilled expectations from current solutions
│
├── Call: 2.6-K Benefit Dimensionalizer (E5 Product) [NEW]
│   Input: effect_map.json + now_after_grid.json + magic_wand.json
│   Output: dimensionalized_benefits.json
│
│   Must produce benefit transformation chain:
│   - FUNCTIONAL benefits (what it does)
│   - DIMENSIONALIZED benefits (specific, measurable, tangible)
│   - EMOTIONAL benefits (how it makes them feel)
│   - Complete transformation: Functional → Dimensionalized → Emotional
│
├── After all E5 tools complete:
├── Call: 2.6-G Pattern Consolidator
│   Input: all 2.6-A through 2.6-K outputs
│   Output: advanced_patterns.json + e5_synthesis.json
│
└── Log: "Advanced pattern detection + E5 prospect examination complete"

STEP 2.7: Intelligence Synthesis (NEW)
├── Call: 2.7-A Intelligence Synthesizer
│   Input: All Layer 2 outputs
│   Output: market_intelligence.md + voice_of_customer_analysis.md
│
│   Must **synthesize** and **distill** (Reference [[RESEARCH-PRD.md#Section 4.2]]):
│   - Competitive landscape (3 tiers)
│   - Target customer profile (demographics + psychographics + emotional)
│   - Customer journey (4 stages with intervention points)
│   - Messaging framework (core narrative + hierarchy)
│   - Voice of customer language (DO's and DON'Ts)
│   - Objection handling (4+ with counters)
│   - Testimonial templates (3+ with examples)
│
└── Log: "Layer 2 intelligence synthesized"

STEP 2.8: Layer 2 Checkpoint
├── Call: 2.8-A Layer 2 Checkpoint (Hybrid Review)
│   Input: all Layer 2 outputs
│   Output: layer2_checkpoint.json
│
│   Validates (Reference [[RESEARCH-PRD.md#Checklist C]]):
│   - All required sections present
│   - Customer profile has all 3 components
│   - Journey has 4 stages
│   - Messaging has narrative + hierarchy
│   - 4+ objections with counters
│   - 3+ testimonial templates
│
│   E5 Validation (REQUIRED):
│   - WEB Analysis complete (Wants, Emotions, Beliefs documented)
│   - Belief inventory has 4 categories (WHY, WHAT, WHO, HOW)
│   - Market Sophistication Stage determined (1-5)
│   - Now-After Grid has all 4 quadrants
│   - Ideal Client Outcome constructed
│   - Magic Wand desires extracted
│   - Benefits dimensionalized (Functional → Dimensionalized → Emotional)
│   - Villain inventory populated
│   - Competitor offers analyzed with guarantee ratings
│   - Mechanism map has NAME + ARTICULATION format
│
├── >>> CHECKPOINT 3 (Hybrid) <<<
│   PHASE 1 - Agent Review:
│   - Confidence distribution across all Layer 2
│   - Evidence quality assessment
│   - Pattern coherence check
│
│   PHASE 2 - Human Review (ONLY if triggered):
│   - Low-confidence items (<60%) flagged for human
│   - Human approves, modifies, or excludes items
│   - If all items >= 60% confidence, NO human review needed
│
├── IF approved (or no human review needed): Proceed to Layer 3
├── IF rejected: Return to relevant skill for revision
│
└── Log: "Layer 2 checkpoint passed, proceeding to Layer 2.5 Synthesis"
```

---

### Phase 3.5: Layer 2.5 - Synthesis (MANDATORY)

**Reference:** [[RESEARCH-PRD#Section 4.2.5]] for Layer 2.5 requirements

**CRITICAL:** This phase transforms analytical data into copy-ready narrative artifacts. The FINAL_HANDOFF.md depends on these artifacts existing and being validated. Skipping this phase was the root cause of the SF2 v1 incomplete handoff incident.

**CRITICAL REQUIREMENT - ANALYSIS DEPTH:**
The 25-pair minimum is the OUTPUT, not the INPUT. This phase MUST:
1. **Analyze ALL 1,000+ quotes** collected in Layer 1
2. **Categorize every quote** with physical_tag and emotional_tags
3. **Tally all categories** to identify the BIGGEST patterns
4. **Generate pairs from the full analysis**, selecting the TOP transformations

DO NOT just find 25 pairs and stop. The goal is to identify:
- **BIGGEST Pain** - Most frequently mentioned physical problem
- **BIGGEST Hope** - Most frequently mentioned resolution
- **BIGGEST Why** - Most frequently mentioned root cause
- **BIGGEST How** - Most frequently mentioned mechanism

**HUMAN REVIEW CHECKPOINT:**
After all synthesis artifacts are generated, a SYNTHESIS_VALIDATION.md file is created showing ALL quotes by category with tallies. The human MUST review this before proceeding to Final Handoff.

```
STEP 2.5.0: Synthesis Initialization
├── Verify Layer 2 outputs exist:
│   - E5.1_theme_clustering.json ✓
│   - E5.2_emotional_intensity_map.json ✓
│   - E5.3_competitive_landscape.json ✓
│   - E5.4_demographic_segmentation.json ✓
│   - E5.5_opportunity_scoring.json ✓
│
├── Load all E5 analysis files into working memory
├── Initialize layer-2-5-outputs/ directory
│
├── IF any Layer 2 output missing:
│   - FAIL and return to Layer 2
│   - Log: "BLOCKED - Missing Layer 2 outputs: {list}"
│
└── Log: "Synthesis initialization complete, beginning artifact generation"
```

```
STEP 2.5.1: Transformation Pair Generation
├── Call: [[micro-skills/layer-2-5/2.5-A-transformation-synthesizer.md]]
│   Input:
│   - All PAIN quotes from layer-1-outputs/
│   - All HOPE quotes from layer-1-outputs/
│   - E5.2_emotional_intensity_map.json
│
│   Output: layer-2-5-outputs/transformation_pairs.json
│
│   Validation:
│   - Count >= 25 pairs
│   - Each pair has: pain_quote_id, hope_quote_id, theme_label
│   - Each pair connects a physical problem to its resolution
│
├── IF count < 25:
│   - DO NOT proceed
│   - Log: "Insufficient transformation pairs: [X]/25"
│   - Continue generating until minimum met
│
├── Checkpoint: STATE_MANAGER.checkpoint_create("transformation_pairs_complete")
│
└── Log: "Transformation pairs generated: [X] pairs"
```

```
STEP 2.5.2: Educational Pair Generation
├── Call: [[micro-skills/layer-2-5/2.5-B-educational-synthesizer.md]]
│   Input:
│   - All ROOT_CAUSE quotes
│   - All SOLUTIONS_TRIED quotes
│   - All HOPE quotes
│   - E5.1_theme_clustering.json
│
│   Output: layer-2-5-outputs/educational_pairs.json
│
│   Validation:
│   - Count >= 25 pairs
│   - Each pair has: why_quote, how_quote, sequence_label
│   - Pairs connect problem explanation (WHY) to solution mechanism (HOW)
│
├── IF count < 25:
│   - DO NOT proceed
│   - Continue generating until minimum met
│
├── Checkpoint: STATE_MANAGER.checkpoint_create("educational_pairs_complete")
│
└── Log: "Educational pairs generated: [X] pairs"
```

```
STEP 2.5.3: WEB Analysis Generation
├── Call: [[micro-skills/layer-2-5/2.5-C-web-synthesizer.md]]
│   Input:
│   - All categorized quotes (by bucket)
│   - E5.2_emotional_intensity_map.json
│   - E5.4_demographic_segmentation.json
│
│   Output: layer-2-5-outputs/web_analysis.json
│
│   Validation:
│   - WANTS section has: GAIN, BE, DO, SAVE, AVOID
│   - EMOTIONS section has: current_state, desired_state
│   - BELIEFS section has: disrupt[], align[]
│   - All sections non-empty
│
├── IF any section empty:
│   - DO NOT proceed
│   - Log: "WEB Analysis incomplete: missing {sections}"
│
├── Checkpoint: STATE_MANAGER.checkpoint_create("web_analysis_complete")
│
└── Log: "WEB Analysis complete with [X] wants, [Y] emotions, [Z] beliefs"
```

```
STEP 2.5.4: Now→After Grid Generation
├── Call: [[micro-skills/layer-2-5/2.5-D-transformation-grid.md]]
│   Input:
│   - PAIN subcategories with examples
│   - HOPE subcategories with examples
│   - transformation_pairs.json
│
│   Output: layer-2-5-outputs/now_after_grid.json
│
│   Validation:
│   - 4 dimensions: HAVE, EXPERIENCE, STATUS, FEELING
│   - Each dimension has: NOW statement, AFTER statement
│   - one_line_transformation present
│
├── IF any dimension missing NOW or AFTER:
│   - DO NOT proceed
│   - Log: "Now→After Grid incomplete: {missing}"
│
├── Checkpoint: STATE_MANAGER.checkpoint_create("now_after_grid_complete")
│
└── Log: "Now→After Grid complete with 4 dimensions"
```

```
STEP 2.5.5: Language Pattern Extraction
├── Call: [[micro-skills/layer-2-5/2.5-E-language-extractor.md]]
│   Input:
│   - All quotes with emotional tags
│   - E5.2_emotional_intensity_map.json
│   - PAIN subcategory names
│
│   Output: layer-2-5-outputs/language_patterns.json
│
│   Validation:
│   - physical_problem_language has 5+ categories
│   - transformation_language has FROM and TO lists
│   - gold_phrases has 10+ entries
│
├── IF categories < 5 OR gold_phrases < 10:
│   - DO NOT proceed
│   - Log: "Language patterns insufficient: {details}"
│
├── Checkpoint: STATE_MANAGER.checkpoint_create("language_patterns_complete")
│
└── Log: "Language patterns extracted: [X] categories, [Y] gold phrases"
```

```
STEP 2.5.6: Two-Tier Categorization Finalization
├── Call: [[micro-skills/layer-2-5/2.5-F-categorization-finalizer.md]]
│   Input:
│   - All raw quotes from layer-1-outputs/
│   - E5.1_theme_clustering.json (for subcategory mapping)
│   - E5.2_emotional_intensity_map.json (for emotional tags)
│
│   Output: layer-2-5-outputs/two_tier_quotes.json
│
│   Validation:
│   - Every quote has: id, quote, bucket, physical_tag, emotional_tags[], source, priority
│   - No quote missing physical_tag
│   - No quote missing emotional_tags (at least 1)
│
├── IF any quote missing required fields:
│   - Fix the specific quote(s)
│   - DO NOT proceed with incomplete data
│
├── Checkpoint: STATE_MANAGER.checkpoint_create("two_tier_complete")
│
└── Log: "Two-tier categorization complete: [X] quotes tagged"
```

```
STEP 2.5.7: Generate Human Review Markdown (NEW)
├── Call: [[micro-skills/layer-2-5/2.5-G-validation-generator.md]]
│   Input:
│   - two_tier_quotes.json (ALL quotes with tags)
│   - transformation_pairs.json
│   - educational_pairs.json
│   - web_analysis.json
│   - now_after_grid.json
│   - language_patterns.json
│
│   Output: layer-2-5-outputs/SYNTHESIS_VALIDATION.md
│
│   CRITICAL FORMAT REQUIREMENTS:
│   - ALL 1,000+ quotes listed by subcategory
│   - Quotes as readable lines, NOT tables
│   - Format: > "quote" — Source [ID] [PRIORITY] [tags]
│   - Tally counts for every subcategory
│   - Pattern analysis summary with BIGGEST findings
│   - Validation checklist at end
│
├── Verify SYNTHESIS_VALIDATION.md created successfully
│
├── Checkpoint: STATE_MANAGER.checkpoint_create("validation_md_complete")
│
└── Log: "SYNTHESIS_VALIDATION.md generated - ready for human review"
```

```
Gate 2.5: Synthesis Validation (BLOCKING)
├── Verify ALL artifacts exist:
│   □ layer-2-5-outputs/transformation_pairs.json
│   □ layer-2-5-outputs/educational_pairs.json
│   □ layer-2-5-outputs/web_analysis.json
│   □ layer-2-5-outputs/now_after_grid.json
│   □ layer-2-5-outputs/language_patterns.json
│   □ layer-2-5-outputs/two_tier_quotes.json
│   □ layer-2-5-outputs/SYNTHESIS_VALIDATION.md (NEW - human review doc)
│
├── Validate each artifact:
│   □ transformation_pairs.json: count >= 25, all have IDs
│   □ educational_pairs.json: count >= 25, all have sequences
│   □ web_analysis.json: all 5 WANTS sections populated
│   □ now_after_grid.json: all 4 dimensions have NOW+AFTER
│   □ language_patterns.json: 5+ categories, 10+ gold phrases
│   □ two_tier_quotes.json: all quotes have physical + emotional tags
│   □ SYNTHESIS_VALIDATION.md: all sections present, all quotes listed
│
├── IF ALL PASS:
│   - Log: "Gate 2.5 PASSED - all synthesis artifacts validated"
│   - PAUSE FOR HUMAN REVIEW (see below)
│
├── IF ANY FAIL:
│   - Log: "Gate 2.5 FAILED - missing/invalid: {list}"
│   - BLOCK progress to Layer 3
│   - Return to relevant synthesis skill (2.5-A through 2.5-G)
│   - Re-run Gate 2.5 after fix
│
└── Checkpoint: STATE_MANAGER.checkpoint_create("gate_2_5_passed")
```

```
HUMAN CHECKPOINT 2.5: Synthesis Review (BLOCKING)
├── PAUSE EXECUTION
│
├── Present to human:
│   "Layer 2.5 synthesis complete. Please review:
│    → layer-2-5-outputs/SYNTHESIS_VALIDATION.md
│
│   This file shows:
│   - ALL 1,000+ quotes categorized by subcategory
│   - Tally counts for each subcategory
│   - Top 25+ transformation pairs (Pain→Hope)
│   - Top 25+ educational pairs (Why→How)
│   - Pattern analysis with BIGGEST findings
│
│   Please verify:
│   1. Quote categorization looks accurate
│   2. Subcategory tallies make sense
│   3. Top pairs represent strongest transformations
│   4. Biggest findings align with your expectations
│
│   Type 'APPROVED' to proceed to Layer 3
│   Type 'REVISE' with feedback to make corrections"
│
├── WAIT for human response
│
├── IF human approves:
│   - Log: "Human approved synthesis validation"
│   - Proceed to Layer 3
│   - Checkpoint: STATE_MANAGER.checkpoint_create("human_approved_synthesis")
│
├── IF human requests revision:
│   - Log: "Human requested synthesis revision: {feedback}"
│   - Return to relevant synthesis skill with feedback
│   - Regenerate SYNTHESIS_VALIDATION.md
│   - Re-run Human Checkpoint 2.5
│
└── DO NOT proceed to Layer 3 without human approval
```

---

### Phase 4: Layer 3 - Opportunity Surfacing

**Reference:** [[RESEARCH-PRD#Section 4.3]] for Layer 3 requirements

```
STEP 3.1: Scoring & Ranking
├── Call: 3.1-A Opportunity Scorer
│   Input: All Layer 2 outputs
│   Output: ranked_opportunities.json
│
│   Must produce:
│   - 5+ opportunities minimum
│   - Each with confidence score
│   - Each with insight, current state, opportunity statement
│
├── IF fewer than 5 opportunities:
│   - Review Layer 2 data for missed opportunities
│   - DO NOT proceed with fewer than 5
│
└── Log: "Opportunities scored: [X] identified"

STEP 3.2: Evidence Packaging + Objection Handling
├── Call: 3.1-B Evidence Compiler
│   Input: ranked_opportunities.json + Layer 1 raw data
│   Output: evidence_packages.json
│
│   For each opportunity:
│   - Execution recommendations
│   - Success metrics
│   - Supporting quotes
│
├── Call: 3.1-C Proactive Objection Handler (E5 Principle 25) [NEW]
│   Input: ranked_opportunities.json + belief_inventory.json + villain_inventory.json
│   Output: objection_responses.json
│
│   Must produce for EVERY opportunity:
│   - Anticipated objections (3-5 per opportunity)
│   - CPT Response for each objection:
│     - CLAIM: Direct counter-statement
│     - PROOF: Evidence supporting claim
│     - BENEFIT (Transition): Why this matters to prospect
│   - Proactive vs reactive classification
│   - Copy-ready objection handling blocks
│
│   Quality criteria:
│   - No opportunity without objection handling
│   - All objections have complete CPT responses
│   - Responses use prospect language from quotes
│
└── Log: "Evidence compiled + objections handled for all opportunities"

STEP 3.3: Risk & Action Planning
├── Call: 3.3-A Risk Assessor (NEW)
│   Input: ranked_opportunities.json + competitive data
│   Output: risk_factors.json
│
│   Must produce:
│   - Risk factors for each major opportunity
│   - Mitigations for each risk
│
├── Call: 3.3-B Action Sequencer (NEW)
│   Input: ranked_opportunities.json
│   Output: action_sequence.json
│
│   Must produce:
│   - Immediate actions (Week 1-2)
│   - Short-term actions (Week 3-6)
│   - Medium-term actions (Week 7-12)
│
├── Call: 3.3-C Measurement Definer (NEW)
│   Input: ranked_opportunities.json
│   Output: measurement_framework.json
│
│   Must produce:
│   - Leading indicators
│   - Lagging indicators
│
└── Log: "Risk, action, and measurement frameworks complete"

STEP 3.4: Opportunity Map Generation
├── Call: 3.4-A Opportunity Map Generator
│   Input: All Step 3.1-3.3 outputs
│   Output: opportunity_map.md
│
│   Structure (Reference [[RESEARCH-PRD.md#Section 4.3]]):
│   - Strategic opportunity map table
│   - Individual opportunity sections (insight, execution, metrics)
│   - Additional opportunities
│   - Risk factors with mitigations
│   - Action sequence
│   - Measurement framework
│
└── Log: "Layer 3 opportunity map generated"

STEP 3.5: Layer 3 Validation
├── Self-Validation Gate (Reference [[RESEARCH-PRD.md#Checklist D]]):
│   - 5+ opportunities with execution plans?
│   - All confidence scores present?
│   - Risk factors identified?
│   - Action sequence defined?
│   - Measurement framework present?
│
├── IF validation fails:
│   - Complete missing elements
│   - DO NOT proceed to final handoff
│   - DO NOT ask human
│
└── Log: "Layer 3 validation passed"
```

---

### Phase 5: Final Handoff

**Reference:** [[RESEARCH-PRD#Section 5]] for output requirements

**CRITICAL DESIGN CHANGE (v3.5):** FINAL_HANDOFF.md is now an **ASSEMBLY operation**, not a synthesis operation. All synthesis work was completed and validated in Layer 2.5. This phase simply assembles validated components into the final document.

```
STEP 5.0: Pre-Assembly Validation (BLOCKING)
├── Verify ALL Layer 2.5 artifacts exist:
│   □ layer-2-5-outputs/transformation_pairs.json
│   □ layer-2-5-outputs/educational_pairs.json
│   □ layer-2-5-outputs/web_analysis.json
│   □ layer-2-5-outputs/now_after_grid.json
│   □ layer-2-5-outputs/language_patterns.json
│   □ layer-2-5-outputs/two_tier_quotes.json
│
├── IF any artifact MISSING:
│   - FAIL immediately
│   - Log: "BLOCKED - Cannot assemble FINAL_HANDOFF without Layer 2.5 artifacts"
│   - Return to Phase 3.5 (Layer 2.5)
│   - DO NOT attempt to synthesize missing data at this stage
│
├── Validate each artifact passes minimum thresholds:
│   □ transformation_pairs.json: count >= 25
│   □ educational_pairs.json: count >= 25
│   □ web_analysis.json: all 5 WANTS sections populated
│   □ now_after_grid.json: all 4 dimensions have NOW+AFTER
│   □ language_patterns.json: 5+ categories, 10+ gold phrases
│   □ two_tier_quotes.json: all quotes have physical + emotional tags
│
├── IF any artifact INVALID:
│   - FAIL immediately
│   - Log: "BLOCKED - Invalid Layer 2.5 artifact: {artifact}"
│   - Return to relevant Layer 2.5 skill for repair
│
└── Log: "Pre-assembly validation PASSED - all Layer 2.5 artifacts validated"
```

```
STEP 5.1: Final Handoff Assembly
├── Call: 3.2-A Handoff Assembler (renamed from Packager)
│   Input:
│     - layer-2-5-outputs/transformation_pairs.json
│     - layer-2-5-outputs/educational_pairs.json
│     - layer-2-5-outputs/web_analysis.json
│     - layer-2-5-outputs/now_after_grid.json
│     - layer-2-5-outputs/language_patterns.json
│     - layer-2-5-outputs/two_tier_quotes.json
│     - layer-3-outputs/opportunity_synthesis.json
│     - layer-1-outputs/ (raw quote batches for reference)
│   Output: FINAL_HANDOFF.md
│
│   CRITICAL: This is an ASSEMBLY operation, not synthesis.
│   All synthesis data already exists in validated JSON files.
│   The handoff simply formats and combines them.
│
│   18-Section Structure (Reference [[RESEARCH-PRD.md#Section 5.2]]):
│
│   SECTION 1: PRD COMPLIANCE SUMMARY
│      - Generate from artifact counts
│      - Show all minimums met
│
│   SECTION 2: EXECUTIVE SUMMARY
│      - Research at a glance (metrics table)
│      - Core thesis validation
│      - Single biggest opportunity
│
│   SECTION 3: PAIN ANALYSIS
│      - Assemble from two_tier_quotes.json (bucket=PAIN)
│      - Use BUCKET_SECTION_TEMPLATE.md format
│      - 80+ lines minimum
│
│   SECTION 4: HOPE ANALYSIS
│      - Assemble from two_tier_quotes.json (bucket=HOPE)
│      - Use BUCKET_SECTION_TEMPLATE.md format
│      - 80+ lines minimum
│
│   SECTION 5: ROOT_CAUSE ANALYSIS
│      - Assemble from two_tier_quotes.json (bucket=ROOT_CAUSE)
│      - Use BUCKET_SECTION_TEMPLATE.md format
│      - 80+ lines minimum
│
│   SECTION 6: SOLUTIONS_TRIED ANALYSIS
│      - Assemble from two_tier_quotes.json (bucket=SOLUTIONS_TRIED)
│      - Use BUCKET_SECTION_TEMPLATE.md format
│      - 80+ lines minimum
│
│   SECTION 7: COMPETITOR_MECHANISMS ANALYSIS
│      - Assemble from two_tier_quotes.json (bucket=COMPETITOR_MECHANISM)
│      - Use BUCKET_SECTION_TEMPLATE.md format
│      - 80+ lines minimum
│
│   SECTION 8: VILLAIN ANALYSIS
│      - Assemble from two_tier_quotes.json (bucket=VILLAIN)
│      - Use BUCKET_SECTION_TEMPLATE.md format
│      - 80+ lines minimum
│
│   SECTION 9: PAIN→HOPE TRANSFORMATION PAIRS
│      - Insert from transformation_pairs.json
│      - Format as table with pain_quote, hope_quote, theme
│      - Must show 25+ pairs
│
│   SECTION 10: WHY→HOW EDUCATIONAL PAIRS
│      - Insert from educational_pairs.json
│      - Format as sequences with why_quote, how_quote
│      - Must show 25+ pairs
│
│   SECTION 11: WEB ANALYSIS (WANTS-EMOTIONS-BELIEFS)
│      - Insert from web_analysis.json
│      - Format WANTS as GAIN/BE/DO/SAVE/AVOID
│      - Format EMOTIONS as current_state/desired_state
│      - Format BELIEFS as disrupt/align
│
│   SECTION 12: NOW→AFTER GRID
│      - Insert from now_after_grid.json
│      - Format as 4-row table: HAVE, EXPERIENCE, STATUS, FEELING
│      - Include one_line_transformation
│
│   SECTION 13: LANGUAGE PATTERNS & PHRASE FREQUENCIES
│      - Insert from language_patterns.json
│      - Format physical_problem_language by category
│      - Format transformation_language as FROM→TO
│      - Highlight gold_phrases
│
│   SECTION 14: ANGLE RECOMMENDATIONS
│      - Generate from opportunity_synthesis.json
│      - List primary angles with supporting evidence
│
│   SECTION 15: OPPORTUNITY MATRIX
│      - Generate from opportunity_synthesis.json
│      - Prioritized list with confidence scores
│
│   SECTION 16: COPY BUILDING BLOCKS
│      - Compile from language_patterns.json gold_phrases
│      - Add GOLD quotes from two_tier_quotes.json (priority=GOLD)
│
│   SECTION 17: OBJECTION HANDLING FRAMEWORK
│      - Generate from opportunity_synthesis.json objections section
│
│   SECTION 18: FULL QUOTE DATABASE REFERENCE
│      - Summary of quote ID system
│      - Platform coverage statistics
│      - Reference to raw quote batches
│
├── **Reference:** [[micro-skills/templates/BUCKET_SECTION_TEMPLATE.md]] for Sections 3-8
│
└── Log: "FINAL_HANDOFF.md assembly complete"
```

```
STEP 5.2: Post-Assembly Validation (MANDATORY)
├── Verify document structure:
│   □ Document has exactly 18 sections
│   □ Table of Contents present and links work
│   □ PRD Compliance Summary shows all minimums met
│
├── Validate BUCKET SECTIONS (3-8):
│   For EACH of the 6 bucket sections, verify:
│   - [ ] Bucket Overview present with totals and compliance %
│   - [ ] "What This Bucket Answers" statement present
│   - [ ] Two-Tier Subcategory Table with 5+ rows
│   - [ ] Each subcategory has emotional breakdown with percentages
│   - [ ] Top 25 (or Top N) verbatim quotes per subcategory
│   - [ ] GOLD quotes appear in Top 5 of each subcategory
│   - [ ] Copy Note present for each subcategory
│   - [ ] Summary table present
│   - [ ] #1 identification with mentions count
│   - [ ] **Section length >= 80 lines**
│
├── Validate SYNTHESIS SECTIONS (9-13):
│   - [ ] Section 9: 25+ transformation pairs with quote IDs
│   - [ ] Section 10: 25+ educational pairs with sequences
│   - [ ] Section 11: WEB Analysis with GAIN/BE/DO/SAVE/AVOID
│   - [ ] Section 12: Now→After Grid with 4 dimensions
│   - [ ] Section 13: Language Patterns with 5+ categories
│
├── IF ANY VALIDATION FAILS:
│   - Identify the specific failure
│   - If bucket section undersized: Rebuild using BUCKET_SECTION_TEMPLATE.md
│   - If synthesis section incomplete: Return to Layer 2.5 to repair artifact
│   - Re-run post-assembly validation
│   - **NEVER deliver a handoff that fails validation**
│
├── Log line count per bucket section:
│   - PAIN: [X] lines (required: 80+)
│   - HOPE: [X] lines (required: 80+)
│   - ROOT_CAUSE: [X] lines (required: 80+)
│   - SOLUTIONS_TRIED: [X] lines (required: 80+)
│   - COMPETITOR_MECHANISMS: [X] lines (required: 80+)
│   - VILLAIN: [X] lines (required: 80+)
│
└── Log: "Post-assembly validation PASSED - all 18 sections validated"
```

```
STEP 5.3: Completion
├── Move all outputs to appropriate folders
├── Create execution_log.md with full timeline
├── Create summary.md with key metrics
├── Present FINAL_HANDOFF.md to human
│
├── Final Report:
│   - Total quotes: [X]
│   - Transformation pairs: [X]
│   - Educational pairs: [X]
│   - Bucket sections all 80+ lines: YES
│   - All Layer 2.5 artifacts valid: YES
│
└── Log: "Research complete - FINAL_HANDOFF.md ready for review"
```

---

## Context Management

The Master Agent maintains a running context object saved to `context.yaml`:

```yaml
context:
  project_name: [string]
  current_phase: [1-5]
  current_step: [string]

  completed_steps: [list]
  pending_steps: [list]

  checkpoint_status:
    checkpoint_1: [pending/passed/failed]
    checkpoint_2: [pending/passed/failed]
    checkpoint_3: [pending/passed/failed]

  prd_validation:
    total_quotes: [number]
    pain_quotes: [number]
    hope_quotes: [number]
    root_cause_quotes: [number]
    solutions_tried_quotes: [number]
    competitors_analyzed: [number]
    mechanisms_mapped: [number]
    saturation_achieved: [boolean]
    cluster_ambiguity: [list of unresolved clusters]

  tool_resilience:
    primary_tool_failures: [count]
    fallback_switches: [list of tool switches]
    sources_requiring_manual: [list]

  errors: [list of any errors encountered]
  warnings: [list of any warnings]

  expansion_history:
    expansion_attempts: [count]
    expansion_reasons: [list]
    expansion_results: [list]

  budget:
    allocated: [number]
    spent: [number]
    remaining: [number]
```

This context is updated after each step and enables session resumption.

---

## Error Handling

**Reference:** [[RESEARCH-PRD#Section 6]] for resilience protocols

### Tool Failure Protocol
```
IF scraping tool fails:
  1. Log: "[Tool] failed for [source]: [error]"
  2. Switch: Move to next tool in fallback chain
  3. Continue: Do NOT halt, do NOT wait for human
  4. Report: Include in execution log

IF all tools fail for single source:
  1. Log: "All tools failed for [source]"
  2. Add to manual_review_needed list
  3. Continue: Process other sources
  4. Only escalate if >50% sources fail
```

### Validation Failure Protocol
```
IF PRD minimum not met (e.g., quotes < 1,000):
  1. Log: "PRD minimum not met: [criterion] = [value], required = [minimum]"
  2. Identify: Which topics/buckets need expansion
  3. Generate: Additional queries for underperforming areas
  4. Expand: Return to scraping for those areas
  5. Re-validate: Check PRD minimums again
  6. Repeat: Until minimums met OR 3 expansion attempts fail
  7. Only escalate to human after 3 failed expansion attempts
```

### Checkpoint Failure Protocol
```
IF checkpoint rejected by human:
  1. Log rejection reason
  2. Determine recovery path:
     - Checkpoint 1 (sources): Modify source list, re-run 1.2-1.3
     - Checkpoint 3 (confidence): Review flagged items, re-run analysis
  3. Resume from appropriate step after correction
```

### Budget Protocol
```
IF budget would be exceeded:
  1. HALT before expensive operation
  2. Report: Current spend, projected cost, what remains
  3. Request: Budget increase OR scope reduction
  4. Do NOT proceed without approval
```

### Session Interruption Protocol
```
IF session times out or is interrupted:
  1. Save: Current state to context.yaml
  2. Save: All completed outputs
  3. Log: "Session interrupted at [step], [X]% complete"

ON session resume:
  1. Load: context.yaml
  2. Validate: What completed, what remains
  3. Continue: From exact interruption point
  4. NEVER restart from beginning
```

---

## Session Recap Protocol (Human-in-the-Loop Optimization)

**Purpose:** Capture learnings after each research session to continuously improve the system.

### After Every Research Session

At the end of each research project (after FINAL_HANDOFF.md is delivered), generate a session recap:

```yaml
# session_recap.yaml

session_metadata:
  project_name: [project name]
  completion_date: [date]
  total_duration: [hours]
  quote_volume_achieved: [number]
  layers_completed: [1, 2, 3]

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
  process_updates:
    - "[Process improvements]"

## HUMAN FEEDBACK REQUESTED
feedback_requested:
  - question: "[Specific question for human review]"
    context: "[Why this question matters]"
    options: "[Possible answers/directions]"
```

### Session Recap Output Location

Save to: `pg-deep-research-v2/projects/[project-name]/session_recap.yaml`

### Recap Review Process

```
AFTER each project completion:
  1. Generate session_recap.yaml automatically
  2. Present key findings to human
  3. Request human feedback on:
     - Quality assessment accuracy
     - Recommended improvements
     - Skill update priorities
  4. Log human feedback for system iteration

PERIODIC REVIEW (every 5 projects):
  1. Aggregate session recaps
  2. Identify patterns in challenges
  3. Prioritize skill updates
  4. Update PRD if minimums need adjustment
  5. Update MASTER-AGENT if flow needs optimization
```

### Feedback Integration

Human feedback is captured and used to:
- Refine skill instructions
- Adjust PRD minimums
- Improve query generation
- Enhance source prioritization
- Optimize tool fallback sequences

**The system gets better with each use.**

---

## Post-Iteration Technical Audit (MANDATORY)

**Reference:** [[0.4-technical-audit]]

After EVERY iteration, modification, or skill update, the Boris Cherny Technical Audit MUST run.

### When to Trigger

```yaml
mandatory_triggers:
  - After ANY skill file is created or modified
  - After ANY workflow/process is updated
  - After ANY master agent file changes
  - Before ANY production/live execution
  - After ANY failure or unexpected behavior
  - At end of every iteration cycle
  - After session recap is generated
```

### Audit Execution Protocol

```
POST-ITERATION TECHNICAL AUDIT:
├── Call: 0.4-A Technical Audit
│   Input: All modified files, current system state
│   Output: audit_report_{timestamp}.json
│
│   Audit Phases (ALL MANDATORY):
│   1. STRUCTURAL INTEGRITY ANALYSIS
│      - Dependency graph validation
│      - Input/Output contract verification
│      - File path consistency
│
│   2. FAILURE MODE ANALYSIS
│      - External service dependencies
│      - Context window exhaustion
│      - Data integrity failure modes
│      - State and recovery analysis
│
│   3. EFFICIENCY & PERFORMANCE ANALYSIS
│      - Parallelization opportunities
│      - Redundant operations
│      - Tool selection optimization
│
│   4. QUALITY & ROBUSTNESS ANALYSIS
│      - Validation completeness
│      - Error message quality
│      - Documentation completeness
│
│   5. SECURITY & SAFETY ANALYSIS
│      - Data handling safety
│      - Resource safety
│
│   6. IMPROVEMENT OPPORTUNITIES
│      - Depth improvements
│      - Reliability improvements
│      - User experience improvements
│
├── Classification:
│   CRITICAL: Will cause system failure - MUST FIX BEFORE PROCEEDING
│   HIGH: Significant quality degradation - Should fix before production
│   MEDIUM: Reduces reliability/efficiency - Should fix soon
│   LOW: Best practice improvements - Fix when convenient
│
├── IF CRITICAL findings:
│   - HALT: Do not proceed with any execution
│   - DOCUMENT: Log all critical issues
│   - FIX: Implement fixes before continuing
│   - RE-AUDIT: Run audit again after fixes
│
├── IF HIGH findings:
│   - DOCUMENT: Log all high issues
│   - DECIDE: Human decides to fix now or accept risk
│   - PROCEED: Can continue with documented risks
│
├── Output Location: execution/audit_reports/audit_{timestamp}.json
│
└── Log: "Technical audit complete: [X] critical, [Y] high, [Z] medium, [W] low issues"
```

### Audit Report Handling

```yaml
on_audit_complete:
  critical_issues:
    action: MANDATORY FIX
    proceed: false
    human_override: requires explicit acknowledgment

  high_issues:
    action: RECOMMEND FIX
    proceed: true with documentation
    human_override: optional

  medium_issues:
    action: LOG FOR FUTURE
    proceed: true
    human_override: not required

  low_issues:
    action: IMPROVEMENT BACKLOG
    proceed: true
    human_override: not required
```

### Integration with Iteration Cycle

```
ITERATION CYCLE:
  1. Execute research/process changes
  2. Generate session recap
  3. >>>  RUN TECHNICAL AUDIT  <<<
  4. Address critical findings
  5. Document accepted risks
  6. Close iteration
  7. Begin next iteration
```

**The technical audit ensures no errors slip through. Claude doesn't catch everything on first pass - this audit catches what was missed.**

---

## Output Structure

Each project produces:

```
pg-deep-research-v2/projects/[project-name]/
├── source-docs/
│   ├── brief.yaml
│   └── context_expansion.json
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
│   ├── web_analysis.json                 # E5 Tool 2 - WEB Analysis
│   ├── belief_inventory.json             # E5 Tool 2B - Belief Excavator
│   ├── gap_counts.json
│   ├── assessed_gaps.json
│   ├── competitor_claims.json
│   ├── villain_inventory.json            # E5 Competitor - Villain Extraction
│   ├── mechanism_map.json
│   ├── exclusion_registry.json           # Mechanism exclusion for creation
│   ├── saturation_map.json
│   ├── market_sophistication.json        # E5 Tool 6 - Promise Exposure
│   ├── competitor_offer_analysis.json    # E5 Competitor - Offer Analysis
│   ├── sin_offer_brief.md                # SIN Offer Intelligence
│   ├── trend_analysis.json
│   ├── timing_signals.json
│   ├── now_after_grid.json               # E5 Tool 3 - Now-After Grid
│   ├── ideal_client_outcome.json         # E5 Tool 4 - Ideal Client Outcome
│   ├── magic_wand.json                   # E5 Tool 5 - Magic Wand
│   ├── dimensionalized_benefits.json     # E5 Product - Benefit Dimensionalizer
│   ├── advanced_patterns.json
│   ├── e5_synthesis.json                 # Consolidated E5 outputs
│   ├── market_intelligence.md
│   ├── voice_of_customer_analysis.md
│   └── layer2_checkpoint.json
├── layer-3-outputs/
│   ├── ranked_opportunities.json
│   ├── evidence_packages.json
│   ├── objection_responses.json          # E5 Principle 25 - CPT Responses
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
├── session_recap.yaml               # Human-in-loop optimization
└── FINAL_HANDOFF.md  ← PRIMARY DELIVERABLE
```

---

## Invocation

To run the Master Agent:

```
/research-v3 [project-name]
```

The Master Agent will:
1. Prompt for research brief if not provided
2. Validate brief completeness
3. Execute context expansion
4. Begin Layer 1 with PRD-validated minimums
5. Self-validate and self-expand when needed
6. Pause only at strategic checkpoints
7. Generate FINAL_HANDOFF.md when all PRD criteria met
8. Deliver single comprehensive handoff document

---

## Micro-Skill Registry

### Layer 1 Skills

| Skill ID | Name | Purpose | PRD Reference | E5 Reference |
|----------|------|---------|---------------|--------------|
| 1.0-A | Context Expander | Expand product to full research context | Section 2 | - |
| **1.0-B** | **Prospect Awareness Mapper** | **Diagnose 5-level awareness pyramid** | **Section 2** | **E5 Tool 1** |
| 1.1-A | Platform Identifier | Identify platforms for research topics | Section 2.2 | - |
| 1.1-B | Query Generator | Generate queries for all topics | Section 2.2 | - |
| 1.2-A | Source Scanner | Discover sources across platforms | Section 3 | - |
| 1.2-B | Source Scorer | Score sources for relevance | Section 3 | - |
| 1.3-A | Source Validator | Validate and prepare source list | Section 3 | - |
| 1.4-A | Scraper - Forums | Scrape forum content | Section 3 | - |
| 1.4-B | Scraper - YouTube | Scrape YouTube content | Section 3 | - |
| 1.4-C | Scraper - Reddit | Scrape Reddit content | Section 3 | - |
| 1.4-D | Scraper - Social | Scrape TikTok/Instagram | Section 3 | - |
| 1.4-E | Scraper - Reviews | Scrape review sites | Section 3 | - |
| 1.4-F | Scraper - Ads Library | Scrape competitor ads | Section 3 | - |
| 1.4-G | Scraper - Funnels | Scrape competitor pages | Section 3 | - |
| 1.4-H | Scraper - Instructional | Scrape instructional content | Section 3 | - |
| 1.5-A | Content Extractor | Extract verbatim quotes | Section 3.3 | - |
| 1.5-B | Basic Tagger | Tag quotes into buckets | Section 3.2 | - |
| 1.5-C | Quantifier | Tally and quantify buckets | Section 3.2 | - |
| 1.5-D | Saturation Analyzer | Detect saturation and clusters | Section 3.4 | - |
| 1.6-A | Layer 1 Checkpoint | Validate Layer 1 completion | Section 4.1 | - |
| 1.6-B | Data Sufficiency Validator | Ensure PRD minimums | Section 3.1 | - |

### Layer 2 Skills

| Skill ID | Name | Purpose | PRD Reference | E5 Reference |
|----------|------|---------|---------------|--------------|
| 2.1-A | Effect Mapper | Map product effects | Section 4.2 | - |
| 2.1-B | Effect Validator | Validate effect mapping | Section 4.2 | - |
| 2.2-A | Audience Identifier | Identify customer segments | Section 4.2 | - |
| 2.2-B | Audience-Effect Matcher | Match audiences to effects | Section 4.2 | - |
| 2.2-C | Aspect Extractor | Extract product aspects | Section 4.2 | - |
| 2.2-D | Aspect Connector | Connect aspects to quotes | Section 4.2 | - |
| **2.2-E** | **WEB Analysis Deep** | **Systematic Wants/Emotions/Beliefs extraction** | **Section 4.2** | **E5 Tool 2** |
| **2.2-F** | **Belief Excavator** | **Extract pre-existing beliefs about marketplace** | **Section 4.2** | **E5 Tool 2B** |
| 2.3-A | Gap Counter | Count market gaps | Section 4.2 | - |
| 2.3-B | Gap Assessor | Assess gap opportunities | Section 4.2 | - |
| 2.4-A | Competitor Claim Mapper | Map competitor claims + **VILLAIN EXTRACTION** | Section 4.2 | **E5 Competitor** |
| 2.4-B | Saturation Scorer | Score market saturation | Section 4.2 | - |
| 2.4-C | Mechanism Mapper | Map competitor tech (NAME + ARTICULATION) | Section 4.2 | **E5 Competitor** |
| **2.4-D** | **Promise Exposure Analyzer** | **Diagnose Market Sophistication Stage (1-5)** | **Section 4.2** | **E5 Tool 6** |
| **2.4-E** | **Competitor Offer Analyzer** | **Map offers: deliverables, price, guarantee, bonuses** | **Section 4.2** | **E5 Competitor** |
| 2.5-A | Trend Detector | Detect market trends | Section 4.2 | - |
| 2.5-B | Timing Assessor | Assess timing signals | Section 4.2 | - |
| 2.6-A | Contrarian Detector | Detect contrarian views | Section 4.2 | - |
| 2.6-B | Pattern Linker | Link patterns across data | Section 4.2 | - |
| 2.6-C | Villain Identifier | Identify market villains | Section 4.2 | - |
| 2.6-D | Transformation Mapper | Map customer transformations | Section 4.2 | - |
| 2.6-E | Category Creation Detector | Detect category opportunities | Section 4.2 | - |
| 2.6-F | Loss Aversion Weighter | Weight loss aversion signals | Section 4.2 | - |
| 2.6-G | Pattern Consolidator | Consolidate all patterns | Section 4.2 | - |
| **2.6-H** | **Now-After Grid** | **Map Have/Experience/Status/Feeling transformation** | **Section 4.2** | **E5 Tool 3** |
| **2.6-I** | **Ideal Client Outcome** | **Construct best success story** | **Section 4.2** | **E5 Tool 4** |
| **2.6-J** | **Magic Wand Extractor** | **Extract blue-sky perfect world desires** | **Section 4.2** | **E5 Tool 5** |
| **2.6-K** | **Benefit Dimensionalizer** | **Transform Functional → Dimensionalized → Emotional** | **Section 4.2** | **E5 Product** |
| 2.7-A | Intelligence Synthesizer | Synthesize all intelligence | Section 4.2 | - |
| 2.8-A | Layer 2 Checkpoint | Validate Layer 2 completion | Section 4.2 | - |

### Layer 3 Skills

| Skill ID | Name | Purpose | PRD Reference | E5 Reference |
|----------|------|---------|---------------|--------------|
| 3.1-A | Opportunity Scorer | Score and rank opportunities | Section 4.3 | - |
| 3.1-B | Evidence Compiler | Compile evidence packages | Section 4.3 | - |
| **3.1-C** | **Proactive Objection Handler** | **CPT responses for every opportunity** | **Section 4.3** | **E5 Principle 25** |
| 3.3-A | Risk Assessor | Assess opportunity risks | Section 4.3 | - |
| 3.3-B | Action Sequencer | Create action timeline | Section 4.3 | - |
| 3.3-C | Measurement Definer | Define metrics | Section 4.3 | - |
| 3.4-A | Opportunity Map Generator | Generate opportunity map | Section 4.3 | - |
| 3.2-A | Handoff Packager | Create final handoff | Section 5 | - |

---

## Notes

- This agent ONLY orchestrates. All actual work is delegated to micro-skills.
- All requirements, minimums, and criteria come from [[RESEARCH-PRD]].
- If a micro-skill doesn't exist yet, the agent will report and create a stub.
- Human checkpoints are STRATEGIC, not procedural. Don't ask "should I continue?"
- The system self-validates and self-expands until PRD requirements are met.
- All context is persisted. Sessions can be resumed if interrupted.
- The final deliverable is ALWAYS a single FINAL_HANDOFF.md file.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 15, 2026 | Initial creation |
| 2.0 | Jan 16, 2026 | Added cross-reference mode |
| 3.0 | Jan 16, 2026 | Full PRD integration, context expansion, autonomous execution, tool resilience, dynamic minimums |
| 3.2 | Jan 17, 2026 | **E5 Method Integration**: Added 10 new micro-skills (1.0-B, 2.2-E, 2.2-F, 2.4-D, 2.4-E, 2.6-H, 2.6-I, 2.6-J, 2.6-K, 3.1-C). Updated execution flow for E5 tools. Added villain extraction to 2.4-A. Added NAME+ARTICULATION format to 2.4-C. Updated output structure with E5 files. Added E5 Reference column to all skills tables. Added Session Recap Protocol for human-in-the-loop optimization. Applied E3 Language Cheatsheet power words (ruminate, excavate, synthesize, distill, scrutinize, calibrate). |
| 3.3 | Jan 17, 2026 | **Core Infrastructure**: Added 0.1-state-manager (checkpointing), 0.2-tool-resilience (fallback chains), 0.3-authenticity-validator (data verification). Updated 1.4-A and 1.6-B with core skill integration. Canonical directory structure defined. |
| 3.4 | Jan 17, 2026 | **Boris Cherny Technical Audit**: Added 0.4-technical-audit as mandatory post-iteration audit. Added Post-Iteration Technical Audit section with 6-phase audit protocol. Integrated audit into iteration cycle. |
| **3.5** | **Jan 18, 2026** | **CONSISTENT DEPTH ENFORCEMENT**: Added BUCKET_SECTION_TEMPLATE.md reference as mandatory for all bucket section generation. Updated Step 5.1 (Final Handoff Generation) to enforce template compliance for ALL 6 buckets. Added bucket section depth validation to handoff generation. All bucket sections must use identical two-tier template structure with minimum 80 lines. **Root cause:** PAIN section had 200+ lines while ROOT_CAUSE had 10 lines - inconsistent depth makes research unusable for copywriters. |

---

**Related Document:** [[RESEARCH-PRD]]
**Methodology Reference:** [[Todd Brown E5 Method]]
**Technical Audit Reference:** [[0.4-technical-audit]]
**Bucket Section Template:** [[BUCKET_SECTION_TEMPLATE]]
