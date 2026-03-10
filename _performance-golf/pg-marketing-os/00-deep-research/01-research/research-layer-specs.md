# Deep Research System v3 - Layer Execution Specifications

**Version:** 5.5 (decomposed from MASTER-AGENT.md v5.4)
**Created:** January 17, 2026
**Last Updated:** February 25, 2026
**Purpose:** Per-layer execution specifications for the research pipeline
**Parent Document:** [[RESEARCH-ORCHESTRATOR]] (load that file FIRST)

**LOADING INSTRUCTION:** Do NOT read this entire file. Load ONLY the section for your current execution layer:
- Phase 0: Market Configuration → search for "### Phase 0"
- Phase 1: Initialization → search for "### Phase 1"
- Phase 2: Layer 1 Infrastructure → search for "### Phase 2"
- Phase 3: Layer 2 Intelligence → search for "### Phase 3:"
- Phase 3.5: Layer 2.5 Synthesis → search for "### Phase 3.5"
- Phase 3.85: Layer 2.8 RSF → search for "### Phase 3.85"
- Phase 4: Layer 3 Opportunity → search for "### Phase 4"
- Phase 5: Completion → search for "### Phase 5" (also load research-output-protocol.md)

---

## Execution Sequence

### Phase 0: Market Configuration (NEW - CRITICAL)

> **Critical Constraints Reminder (Phase 0)**
> - Read RESEARCH-ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Quote targets are exact: 1000 means 1000

#### STEP 0.0: Market Adaptation

**Purpose:** Configure the entire research system for the specific market before any research begins.

```
STEP 0.0: Market Configuration
├── Input: Research brief (product.category, market.industry, target_customer)
│
├── Generate Market Configuration:
│   1. CUSTOMER TERMINOLOGY
│      - Primary term: [e.g., "traders", "photographers", "practitioners", "users"]
│      - Plural: [e.g., "traders", "photographers"]
│      - Adjective form: [e.g., "trading", "photography", "wellness"]
│
│   2. PROBLEM TERMINOLOGY
│      - Primary problem: [e.g., "losing trades", "inconsistent results", "chronic pain"]
│      - Problem category: [e.g., "performance", "health", "efficiency"]
│
│   3. PRODUCT TERMINOLOGY
│      - Product type: [e.g., "system", "equipment", "protocol", "software"]
│      - Solution category: [e.g., "method", "tool", "program"]
│
│   4. PLATFORM CALIBRATION
│      - Tier 1 (Primary): [3-5 highest-value platforms for this market]
│      - Tier 2 (Secondary): [3-5 additional platforms]
│      - Tier 3 (Supplementary): [2-3 niche sources]
│      - Blocked platforms: [Any known to block scraping]
│
│   5. ASPECT CATEGORIES
│      - Define 5 market-specific aspects:
│        * [Aspect 1]: [Definition]
│        * [Aspect 2]: [Definition]
│        * [Aspect 3]: [Definition]
│        * [Aspect 4]: [Definition]
│        * [Aspect 5]: [Definition]
│
│   6. COMPETITOR CONTEXT
│      - Known competitors: [From brief + initial research]
│      - Competitor terminology: [How market refers to competitors]
│      - Comparison patterns: [How prospects compare solutions]
│
│   7. EMOTIONAL CONTEXT
│      - Primary fears: [Market-specific fear patterns]
│      - Primary frustrations: [Market-specific frustration patterns]
│      - Primary hopes: [Market-specific aspiration patterns]
│      - Identity markers: [How they see themselves / want to be seen]
│
├── Output: market_config.yaml
│
├── Validation (ACTIVE ENFORCEMENT):
│   - MUST verify all 7 configuration sections populated — REJECT if incomplete
│   - MUST confirm platform list includes minimum 6 sources — HALT if below threshold
│   - MUST verify aspect categories defined — REJECT undefined aspects
│   - MUST confirm terminology established — HALT if terminology undefined
│
├── Save to: projects/[project-name]/market_config.yaml
│
└── Log: "Market configured for [industry]: [customer_term] seeking [solution_category]"
```

**Market Configuration Template (Output):**

```yaml
# market_config.yaml
# Auto-generated from research brief

project:
  name: [project-name]
  created: [date]
  market_mode: [A or B]

terminology:
  customer:
    primary: [e.g., "trader"]
    plural: [e.g., "traders"]
    adjective: [e.g., "trading"]

  problem:
    primary: [e.g., "losing trades"]
    category: [e.g., "performance"]

  product:
    type: [e.g., "system"]
    solution: [e.g., "method"]

platforms:
  tier_1:
    - name: [Platform]
      type: [forum/social/video/review]
      tool: [firecrawl/apify/perplexity]
      priority: critical
  tier_2:
    - name: [Platform]
      type: [type]
      tool: [tool]
      priority: high
  tier_3:
    - name: [Platform]
      type: [type]
      tool: [tool]
      priority: moderate

  blocked:
    - name: [Platform]
      reason: [Why blocked]
      alternative: [What to use instead]

aspects:
  - name: [Aspect 1]
    definition: [What this captures]
    example_terms: [Keywords that indicate this aspect]
  - name: [Aspect 2]
    definition: [Definition]
    example_terms: [Keywords]
  # ... 5 total

competitors:
  known:
    - name: [Competitor]
      type: [direct/indirect]
      positioning: [Brief description]
  terminology:
    comparison_phrases: [How prospects compare]
    category_terms: [Market category language]

emotional_context:
  fears:
    - [Fear pattern 1]
    - [Fear pattern 2]
  frustrations:
    - [Frustration pattern 1]
    - [Frustration pattern 2]
  hopes:
    - [Hope pattern 1]
    - [Hope pattern 2]
  identity:
    current: [How they see themselves now]
    aspirational: [How they want to be seen]
    anti_identity: [What they don't want to be]

query_patterns:
  # Templates for query generation
  pain_queries:
    - "[problem] frustrating"
    - "can't [desired_outcome]"
    - "[customer_plural] struggling with"
  hope_queries:
    - "how to [desired_outcome]"
    - "best [solution_category] for [problem]"
    - "[customer_plural] who [achieved_outcome]"
  competitor_queries:
    - "[competitor_name] review"
    - "[competitor_name] vs"
    - "is [competitor_name] worth it"
```

---

### Phase 1: Initialization

> **Critical Constraints Reminder (Phase 1)**
> - Read RESEARCH-ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Subagents MUST use structured context template

**INITIALIZATION CONSTRAINTS:**
- MUST validate brief contains all required fields before ANY processing.
- MUST reject briefs with empty product.name or market.industry fields.
- NEVER create project folder without validated brief.
- MUST verify parent directory exists before folder creation.
- ONLY proceed to Layer 1 after all initialization steps complete successfully.

```
1. Validate brief completeness
   - All required fields present — MUST reject if any missing
   - Product category clearly defined — MUST NOT be generic placeholder
   - Market industry specified — MUST match known industry taxonomy

2. Create project folder: Deep-Research-v3/projects/[project-name]/
3. Create subfolders:
   - source-docs/
   - layer-1-outputs/
   - layer-2-outputs/
   - layer-2-5-outputs/
   - layer-3-outputs/
   - checkpoints/
   - validation-logs/

4. Save brief to source-docs/brief.yaml
5. Save market config to market_config.yaml

6. Load PRD requirements from [[RESEARCH-PRD.md]]
   - MUST verify PRD file exists and is readable — HALT if missing
   - MUST cache minimum requirements for validation gates
   - NEVER proceed without PRD successfully loaded

7. Initialize context tracking:
   - MUST create context.yaml with initial state
   - MUST set current_phase: 1
   - MUST set all checkpoints: pending
   - NEVER leave context.yaml in undefined state

8. Log: "Project initialized, market configured, PRD loaded, ready for context expansion"
   - MUST include timestamp in all log entries
```

---

### Phase 2: Layer 1 - Infrastructure

> **Critical Constraints Reminder (Layer 1)**
> - Read RESEARCH-ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Quote targets are exact: 1000 means 1000
> - Subagents MUST use structured context template

**LAYER 1 EXECUTION CONSTRAINTS:**
- MUST complete all Layer 1 steps in numbered sequence (1.0 → 1.1 → 1.2 → 1.3 → 1.4 → 1.5 → 1.6).
- NEVER skip any step in the Layer 1 sequence.
- MUST save checkpoint after EVERY skill completion within Layer 1.
- ONLY proceed to Layer 2 after Layer 1 checkpoint explicitly passes.
- MUST validate all PRD minimums before Layer 1 completion.

#### STEP 1.0: Context Expansion

**Reference:** [[Unused Copy Processes/Deep-Research-v3/RESEARCH-PRD#Section 2]] for expansion rules

**STEP 1.0 CONSTRAINTS:**
- MUST produce minimum 10 primary research topics.
- MUST include emotional/psychological topics — NEVER omit.
- NEVER proceed to 1.1 without validated context expansion.

```
STEP 1.0: Context Expansion
├── Call: 1.0-A Context Expander
│   Input: market_config.yaml, product description, known benefits
│   Output: context_expansion.json
│
│   Expansion Logic:
│   1. Identify CATEGORY from market config
│   2. Identify CONTEXT (broader market context)
│   3. **Ruminate** on PRIMARY RESEARCH TOPICS (10+)
│   4. Generate CATEGORY-SPECIFIC TOPICS (5+)
│   5. Generate COMPETITOR CONTEXT TOPICS (5+)
│   6. **Calibrate** SOURCE TYPES for each topic area
│
├── Call: 1.0-B Prospect Awareness Mapper (E5 Tool 1)
│   Input: market_config.yaml, context_expansion.json
│   Output: awareness_baseline.json
│
│   Must produce:
│   - 5-level awareness pyramid diagnosis
│   - Estimated distribution across levels
│   - Entry point recommendations
│
├── Validation (ACTIVE ENFORCEMENT):
│   - MUST confirm primary topics >= 10 — REJECT and expand if below
│   - MUST confirm category topics >= 5 — REJECT and expand if below
│   - MUST confirm competitor topics >= 5 — REJECT and expand if below
│   - MUST verify source types include: instructional, forums, reviews, competitor pages
│   - MUST verify emotional/psychological topics included — NEVER omit
│   - MUST confirm awareness baseline established — HALT if missing
│
├── IF validation fails:
│   - MUST expand topic list automatically
│   - MUST NOT proceed without adequate coverage
│   - MUST log expansion attempt with reason
│
└── Log: "Context expanded: [X] primary topics, [Y] source types identified"
```

#### STEP 1.1: Platform & Query Generation

**STEP 1.1 CONSTRAINTS:**
- MUST generate minimum 50 queries total.
- MUST ensure no topic has fewer than 5 queries.
- NEVER use queries that violate market terminology from market_config.
- ONLY use platforms from market_config tier lists.

```
STEP 1.1: Platform & Query Generation
├── Call: 1.1-A Platform Identifier
│   Input: context_expansion.json + market_config.yaml
│   Output: platform_list.json
│
│   Platform Selection Based On Market Config:
│   - Use tier_1, tier_2, tier_3 from market_config
│   - Respect blocked platforms
│   - Ensure tool assignments match platform requirements
│
├── Call: 1.1-B Query Generator
│   Input: context_expansion.json + platform_list.json + market_config.yaml
│   Output: queries.json
│
│   Query Generation Rules:
│   - Use query_patterns from market_config as templates
│   - Generate queries for EACH research topic
│   - Include instructional queries
│   - Include emotional queries
│   - Include problem queries
│   - Include competitor queries
│   - Minimum: 50 queries total, 5 per major topic
│
├── Validation (ACTIVE ENFORCEMENT):
│   - MUST verify queries cover all research topics — REJECT if gaps found
│   - MUST confirm mix of problem, emotional, instructional, and competitor queries
│   - MUST enforce no topic has fewer than 5 queries — EXPAND if below
│   - MUST verify all queries use market-appropriate terminology — REJECT violators
│
└── Log: "Generated [X] queries across [Y] platforms for [Z] topics"
```

#### STEP 1.2: Source Discovery & Evaluation

**STEP 1.2 CONSTRAINTS:**
- MUST identify minimum 100 potential sources.
- MUST ensure 50+ sources score above threshold.
- NEVER proceed with fewer than 3 high-scoring sources per research topic.
- MUST maintain platform diversity across source list.

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
│   - Authority (established platforms > random blogs)
│
├── Validation:
│   - 50+ sources score above threshold
│   - All research topics have at least 3 high-scoring sources
│   - Platform diversity maintained
│
└── Log: "Discovered [X] sources, [Y] passed scoring threshold"
```

#### STEP 1.3: Source Validation

**STEP 1.3 CONSTRAINTS:**
- MUST validate every source for accessibility before approval.
- MUST eliminate all duplicate sources from final list.
- NEVER approve paywalled sources without documented workaround.
- MUST require human approval at Checkpoint 1 before expensive scraping.

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

**Reference:** [[Unused Copy Processes/Deep-Research-v3/RESEARCH-PRD#Section 6]] for tool resilience protocols

**STEP 1.4 CONSTRAINTS:**
- MUST execute all scrapers in parallel where possible.
- MUST follow fallback chain on tool failure (Firecrawl → Apify → Perplexity → Manual).
- NEVER halt on single source failure — log and continue.
- ONLY halt if >50% of sources fail (catastrophic failure threshold).
- MUST log every tool switch with reason and timestamp.
- NEVER exceed allocated budget without human approval.

```
STEP 1.4: Deep Scraping (PARALLEL)
├── After checkpoint approval, run all applicable scrapers in parallel:
│
├── ⚡ PARALLEL EXECUTION (Audit Fix EFF-001):
│   ┌─────────────────────────────────────────────────────────┐
│   │ LAUNCH ALL SCRAPERS SIMULTANEOUSLY - DO NOT SEQUENCE    │
│   │                                                          │
│   │ Parallel Group A (Content Sources):                      │
│   │   ├── 1.4-A Forums      ──┐                              │
│   │   ├── 1.4-B Video       ──┼── Run simultaneously         │
│   │   ├── 1.4-C Reddit      ──┤                              │
│   │   └── 1.4-D Social      ──┘                              │
│   │                                                          │
│   │ Parallel Group B (Competitor Intelligence):              │
│   │   ├── 1.4-E Reviews     ──┐                              │
│   │   ├── 1.4-F Ads Library ──┼── Run simultaneously         │
│   │   ├── 1.4-G Funnels     ──┤                              │
│   │   └── 1.4-H Instructional─┘                              │
│   │                                                          │
│   │ Groups A and B run in parallel with each other           │
│   └─────────────────────────────────────────────────────────┘
│
├── Tool Resilience Protocol (CRITICAL):
│   PRIMARY: Firecrawl
│   FALLBACK 1: Apify (apify/rag-web-browser)
│   FALLBACK 2: Perplexity (perplexity_research)
│   FALLBACK 3: Manual source list (LAST RESORT)
│
│   ON TOOL FAILURE:
│   - Log failure with details
│   - AUTOMATICALLY switch to next tool
│   - DO NOT halt, DO NOT wait for human
│   - Continue scraping with fallback tool
│
├── Platform Blocking Protocol:
│   Use market_config.yaml blocked platforms list
│   IF blocked platform encountered → Use specified alternative
│   ALWAYS: Find equivalent source, continue without interruption
│
├── Call (⚡ PARALLEL - based on market_config platforms):
│   1.4-A Deep Scraper - Forums          [PARALLEL]
│   1.4-B Deep Scraper - Video           [PARALLEL]
│   1.4-C Deep Scraper - Reddit          [PARALLEL]
│   1.4-D Deep Scraper - Social          [PARALLEL]
│   1.4-E Deep Scraper - Reviews         [PARALLEL]
│   1.4-F Deep Scraper - Ads Library     [PARALLEL]
│   1.4-G Deep Scraper - Funnels         [PARALLEL]
│   1.4-H Deep Scraper - Instructional   [PARALLEL]
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

**Reference:** [[Unused Copy Processes/Deep-Research-v3/RESEARCH-PRD#Section 3]] for quote requirements and bucket structure

**STEP 1.5 CONSTRAINTS:**
- MUST extract VERBATIM quotes only — NEVER paraphrase or clean.
- MUST attach full context (source, author, thread, date) to every quote.
- MUST meet all PRD bucket minimums before proceeding.
- NEVER proceed to Layer 2 with unresolved cluster ambiguity.
- MUST auto-expand (3 MANDATORY rounds — not "up to", all 3 REQUIRED) before escalating to human.
- ONLY assign unique IDs to quotes — NEVER reuse IDs.

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
│   - PAIN (problems, frustrations, failures)
│   - HOPE (desires, aspirations, goals)
│   - ROOT_CAUSE (beliefs about why)
│   - SOLUTIONS_TRIED (what they've attempted)
│   - COMPETITOR_MECHANISM (how competitors claim to work)
│
├── Call: 1.5-C Quantifier
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
├── Call: 1.5-D Saturation Analyzer
│   Input: quantified_buckets.json
│   Output: saturation_report.json
│
│   Saturation Analysis:
│   - **Distill** clusters (pain points close together)
│   - **Scrutinize** ambiguous clusters requiring expansion
│   - Check topic coverage from context expansion
│   - Verify no research topic has < 50 quotes
│
├── Self-Validation Gate (ACTIVE ENFORCEMENT):
│   Check against [[RESEARCH-PRD.md#Section 3.1]]:
│   - MUST confirm total quotes >= 1,000 — REJECT and expand if below
│   - MUST confirm pain quotes >= 300 — REJECT and expand if below
│   - MUST confirm hope quotes >= 250 — REJECT and expand if below
│   - MUST confirm root cause quotes >= 200 — REJECT and expand if below
│   - MUST confirm solutions tried quotes >= 150 — REJECT and expand if below
│   - MUST verify no ambiguous clusters — EXPAND to resolve if present
│   - MUST verify all research topics covered — EXPAND gaps if found
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

**STEP 1.6 CONSTRAINTS:**
- MUST validate ALL PRD minimums pass before checkpoint approval.
- MUST confirm saturation achieved for all research topics.
- NEVER pass checkpoint with unresolved cluster ambiguity.
- ONLY escalate to human after 3 failed expansion attempts.
- MUST document all warnings even when proceeding.

```
STEP 1.6: Layer 1 Checkpoint
├── Call: 1.6-A Layer 1 Checkpoint (Agent Critic)
│   Input: quantified_buckets.json + saturation_report.json
│   Output: layer1_checkpoint.json
│
│   Validates (Reference [[RESEARCH-PRD.md#Checklist A]]):
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
│   IF FAILED (there is NO other status — gates are BINARY):
│     - Identify failure reason
│     - Auto-expand in failed area
│     - Re-run validation
│     - Only escalate to human if 3 expansion attempts fail
│
└── Log: "Layer 1 checkpoint passed, proceeding to Layer 2"
```

---

### Phase 3: Layer 2 - Intelligence

> **Critical Constraints Reminder (Layer 2)**
> - Read RESEARCH-ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Quote targets are exact: 1000 means 1000
> - Subagents MUST use structured context template

**Reference:** [[Unused Copy Processes/Deep-Research-v3/RESEARCH-PRD#Section 4.2]] for Layer 2 requirements

**LAYER 2 EXECUTION CONSTRAINTS:**
- MUST complete Layer 1 checkpoint before ANY Layer 2 execution.
- MUST execute steps in sequence except where parallel execution is specified.
- MUST validate all E5 tool outputs for completeness.
- NEVER proceed to Layer 2.5 without all required Layer 2 outputs.
- MUST ensure customer profile has all 3 components (demographics, psychographics, emotional).
- ONLY use terminology from market_config throughout all Layer 2 outputs.

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
│   Input: quantified_buckets.json + market_config.yaml
│   Output: audience_segments.json
│
│   Must produce:
│   - Primary segment with demographics + psychographics + emotional state
│   - Secondary segment(s) if data supports
│   - Using terminology from market_config
│
├── Call: 2.2-B Audience-Effect Matcher
│   Input: audience_segments.json + validated_effect_map.json
│   Output: audience_effect_matches.json
│
├── Call: 2.2-C Aspect Extractor
│   Input: quantified_buckets.json + market_config.yaml (aspects)
│   Output: aspect_tagged_quotes.json
│
│   Use market-specific aspects from market_config
│
├── Call: 2.2-D Aspect Connector
│   Input: aspect_tagged_quotes.json
│   Output: aspect_connections.json
│
├── Call: 2.2-E WEB Analysis Deep (E5 Tool 2)
│   Input: quantified_buckets.json + audience_segments.json
│   Output: web_analysis.json
│
│   Must produce (Reference E5 Method):
│   - WANTS: Desires in prospect's own language
│   - EMOTIONS: Fear, frustration, embarrassment, hope states
│   - BELIEFS: Pre-existing marketplace beliefs
│   - All with verbatim quote evidence
│
├── Call: 2.2-F Belief Excavator (E5 Tool 2B)
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
│   CONSTRAINTS:
│   - MUST analyze minimum 5 competitors with root cause + mechanism.
│   - MUST produce NAME + ARTICULATION format for all mechanisms.
│   - MUST determine Market Sophistication Stage (1-5) with evidence.
│   - NEVER include competitor data without source attribution.
│   - MUST rate all guarantees as STRONG/MEDIUM/WEAK.
│
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
├── Call: 2.4-D Promise Exposure Analyzer (E5 Tool 6)
│   Input: competitor_claims.json + saturation_map.json + ads_data
│   Output: market_sophistication.json
│
│   Must produce:
│   - Market Sophistication Stage diagnosis (1-5)
│   - Lead strategy recommendation based on stage
│   - Evidence supporting stage diagnosis
│   - Historical progression analysis
│
├── Call: 2.4-E Competitor Offer Analyzer (E5 Competitor)
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
├── Call: 2.55-A Trend Detector
│   Input: quantified_buckets.json (with timestamps)
│   Output: trend_analysis.json
│
├── Call: 2.55-B Timing Assessor
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
├── Call: 2.6-H Now-After Grid (E5 Tool 3)
│   Input: quantified_buckets.json + web_analysis.json
│   Output: now_after_grid.json
│
│   Must produce 4-quadrant transformation map:
│   - HAVE: Before → After (tangible possessions/results)
│   - EXPERIENCE: Before → After (daily experiences)
│   - STATUS: Before → After (how others see them)
│   - FEELING: Before → After (internal emotional state)
│   - All with verbatim evidence
│
├── Call: 2.6-I Ideal Client Outcome (E5 Tool 4)
│   Input: now_after_grid.json + web_analysis.json
│   Output: ideal_client_outcome.json
│
│   Must produce:
│   - Constructed "best success story"
│   - Primary transformation statement
│   - Key quote evidence from real prospects
│   - Desired end state in prospect language
│
├── Call: 2.6-J Magic Wand Extractor (E5 Tool 5)
│   Input: quantified_buckets.json + web_analysis.json
│   Output: magic_wand.json
│
│   Must produce:
│   - Perfect world desires (no constraints)
│   - Specific trigger question responses
│   - Blue-sky wishes in prospect language
│   - Unfulfilled expectations from current solutions
│
├── Call: 2.6-K Benefit Dimensionalizer (E5 Product)
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

STEP 2.7: Intelligence Synthesis
├── Call: 2.7-A Intelligence Synthesizer
│   Input: All Layer 2 outputs + market_config.yaml
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
│   - All using market-appropriate terminology
│
└── Log: "Layer 2 intelligence synthesized"

STEP 2.8: Layer 2 Checkpoint
│   CONSTRAINTS:
│   - MUST validate ALL E5 requirements before checkpoint passage.
│   - MUST flag all items with <60% confidence for human review.
│   - NEVER auto-approve low-confidence items.
│   - ONLY proceed to Layer 2.5 with explicit checkpoint passage.
│
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

> **Critical Constraints Reminder (Layer 2.5)**
> - Read RESEARCH-ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Analyze ALL 1000+ quotes — NEVER sample or shortcut
> - Subagents MUST use structured context template

**Reference:** [[Unused Copy Processes/Deep-Research-v3/RESEARCH-PRD#Section 4.2.5]] for Layer 2.5 requirements

**PURPOSE:** Transform raw analytical data into copy-ready narrative artifacts. All synthesis
happens HERE — Final Handoff is ASSEMBLY only.

**CRITICAL:** This layer analyzes ALL 1000+ quotes for patterns, THEN selects top pairs.
Never "find 25 and stop." Analysis depth = comprehensive.

**LAYER 2.5 EXECUTION CONSTRAINTS:**
- MUST complete Layer 2 checkpoint before ANY Layer 2.5 execution.
- MUST analyze ALL quotes comprehensively — NEVER sample or shortcut.
- MUST produce minimum 25 transformation pairs — target 35+.
- MUST produce minimum 25 educational pairs.
- MUST categorize EVERY quote with physical AND emotional tags.
- NEVER proceed to Layer 3 without human approval at Checkpoint 2.5.
- ONLY accept synthesis outputs that have complete quote ID references.
- MUST verify all 7 Layer 2.5 artifacts exist before Pre-Assembly Validation.

```
STEP 2.5.0: Pre-Synthesis Validation
├── VERIFY all Layer 2 outputs exist:
│   - quantified_buckets.json
│   - web_analysis.json (WEB complete)
│   - advanced_patterns.json
│   - market_intelligence.md
│   - All E5 tool outputs
│
├── VERIFY Layer 2 checkpoint = PASSED
│   IF NOT: HALT — "Layer 2 must pass before synthesis begins"
│
├── VERIFY total quote count >= PRD minimum
│   IF NOT: HALT — "Insufficient quotes for synthesis"
│
└── Log: "Pre-synthesis validation passed, beginning Layer 2.5"

STEP 2.5.1: Transformation Synthesis
├── Call: 2.5-A Transformation Synthesizer
│   Input: quantified_buckets.json (ALL pain + hope quotes)
│   Output: layer-2-5-outputs/transformation_pairs.md
│
│   CRITICAL DEPTH REQUIREMENT:
│   - Analyze ALL 1000+ quotes across pain and hope buckets
│   - Identify ALL Pain→Hope transformation patterns
│   - Select TOP 25+ pairs (target 35+) by impact and specificity
│   - Each pair: verbatim pain quote + verbatim hope quote + bridge insight
│   - Format: blockquote lines (> "quote" — Source [ID] [PRIORITY] [tags])
│
│   Validation:
│   - Minimum 25 pairs produced
│   - All pairs have both pain AND hope quotes with IDs
│   - Priority tags assigned (GOLD/SILVER/BRONZE)
│   - Bridge insights are non-obvious
│
└── Log: "Transformation synthesis complete: [X] pairs extracted"

STEP 2.5.2: Educational Synthesis
├── Call: 2.5-B Educational Synthesizer
│   Input: quantified_buckets.json (ALL root_cause + solutions_tried quotes)
│   Output: layer-2-5-outputs/educational_pairs.md
│
│   CRITICAL DEPTH REQUIREMENT:
│   - Analyze ALL root_cause and solutions_tried quotes
│   - Identify Why→How educational patterns
│   - Select TOP 25+ pairs by teaching power
│   - Each pair: why-it-fails quote + how-to-fix quote + educational frame
│   - Format: blockquote lines with source attribution
│
│   Validation:
│   - Minimum 25 pairs produced
│   - All pairs trace to specific market misconceptions
│   - Educational frames are mechanism-ready
│
└── Log: "Educational synthesis complete: [X] pairs extracted"

STEP 2.5.3: WEB Synthesis
├── Call: 2.5-C WEB Synthesizer
│   Input: web_analysis.json + quantified_buckets.json
│   Output: layer-2-5-outputs/web_synthesis.md
│
│   Must produce (Vic Schwab framework):
│   - WANTS: What prospects explicitly desire (with quote evidence)
│   - EMOTIONS: Dominant emotional states driving behavior (with evidence)
│   - BELIEFS: Core beliefs about problem/solution/self (with evidence)
│   - Each category subdivided by: GAIN / BE / DO / SAVE / AVOID
│   - Minimum 5 entries per major category
│
│   Validation:
│   - All 3 WEB categories populated
│   - All 5 Schwab subdivisions addressed
│   - Every entry has verbatim quote evidence
│
└── Log: "WEB synthesis complete"

STEP 2.5.4: Transformation Grid
├── Call: 2.5-D Transformation Grid
│   Input: quantified_buckets.json + web_synthesis.md + now_after_grid.json
│   Output: layer-2-5-outputs/transformation_grid.md
│
│   Must produce 4-dimension Now→After grid:
│   - HAVE: What they have now → What they'll have after
│   - EXPERIENCE: Daily experience now → Daily experience after
│   - STATUS: How others see them now → How others will see them
│   - FEELING: Internal state now → Internal state after
│   - All dimensions with verbatim quote evidence
│
│   Validation:
│   - All 4 dimensions populated
│   - Each dimension has Now AND After with quotes
│   - Contrast is dramatic and specific (not generic)
│
└── Log: "Transformation grid complete"

STEP 2.5.5: Language Extraction
├── Call: 2.5-E Language Extractor
│   Input: ALL quotes across all buckets
│   Output: layer-2-5-outputs/language_patterns.md
│
│   Must produce:
│   - GOLD PHRASES: 10+ verbatim phrases with high emotional resonance
│   - RECURRING PATTERNS: Language patterns that appear 3+ times
│   - METAPHORS: Prospect-generated metaphors and analogies
│   - INTENSITY MARKERS: Strongest emotional language identified
│   - DO/DON'T vocabulary guide for copy
│
│   Validation:
│   - Minimum 10 gold phrases identified
│   - All phrases are VERBATIM (not paraphrased)
│   - Each tagged with source ID and frequency count
│
└── Log: "Language extraction complete: [X] gold phrases identified"

STEP 2.5.6: Categorization Finalization
├── Call: 2.5-F Categorization Finalizer
│   Input: ALL classified quotes (quantified_buckets.json)
│   Output: layer-2-5-outputs/final_categorization.md
│
│   Must produce two-tier categorization for ALL 1000+ quotes:
│   - PHYSICAL TAG: One primary bucket (pain/hope/root_cause/solutions_tried/transformation/objection)
│   - EMOTIONAL TAGS: 1-3 emotional descriptors per quote
│   - Tally by category and sub-category
│   - Cross-reference index (which quotes appear in multiple emotional contexts)
│
│   CRITICAL: Every single quote gets categorized. No skipping.
│
│   Validation:
│   - Quote count in output matches input count exactly
│   - All quotes have both physical AND emotional tags
│   - Tallies are mathematically correct
│
└── Log: "Categorization finalization complete: [X] quotes tagged"

STEP 2.5.7: Validation Generation + Human Checkpoint
├── Call: 2.5-G Validation Generator
│   Input: ALL Layer 2.5 outputs (2.5-A through 2.5-F)
│   Output: layer-2-5-outputs/SYNTHESIS_VALIDATION.md
│
│   Must produce human-reviewable validation document:
│   - Summary statistics (pair counts, quote counts, coverage)
│   - Sample pairs from each synthesis (top 5 per category)
│   - Category tallies with percentages
│   - Gap analysis (any empty categories or thin areas)
│   - Confidence assessment per artifact
│
├── >>> HUMAN CHECKPOINT 2.5 (BLOCKING) <<<
│   ┌─────────────────────────────────────────────────────────────────────┐
│   │  MANDATORY HUMAN REVIEW                                            │
│   │                                                                      │
│   │  CONSTRAINTS:                                                       │
│   │  - MUST halt execution until explicit human response received.     │
│   │  - MUST present SYNTHESIS_VALIDATION.md in standardized format.    │
│   │  - NEVER auto-approve — ONLY human can approve this checkpoint.    │
│   │  - MUST log human decision with timestamp and rationale.           │
│   │  - ONLY proceed to Layer 3 with explicit APPROVE decision.         │
│   │                                                                      │
│   │  Present: SYNTHESIS_VALIDATION.md to human                         │
│   │                                                                      │
│   │  Human reviews:                                                     │
│   │  - Are transformation pairs authentic and impactful?                │
│   │  - Are educational pairs teaching real insights?                    │
│   │  - Does WEB synthesis ring true to market knowledge?               │
│   │  - Are gold phrases genuinely resonant?                            │
│   │  - Are categorization tallies reasonable?                          │
│   │                                                                      │
│   │  Human actions:                                                     │
│   │  - APPROVE: Proceed to Layer 3                                     │
│   │  - REVISE: Return to specific 2.5 skill with feedback             │
│   │  - REJECT: Return to Layer 2 for more data                        │
│   │                                                                      │
│   │  THIS CHECKPOINT CANNOT BE SKIPPED.                                │
│   │  DO NOT auto-approve. WAIT for human response.                     │
│   └─────────────────────────────────────────────────────────────────────┘
│
├── IF APPROVED: Proceed to Layer 3
├── IF REVISE: Return to specified 2.5 skill, re-run, re-validate
├── IF REJECT: Return to Layer 2 expansion skills
│
└── Log: "Layer 2.5 synthesis complete and human-approved, proceeding to Layer 3"

GATE 2.5: Pre-Layer-3 Verification
├── VERIFY all 7 Layer 2.5 artifacts exist:
│   - transformation_pairs.md
│   - educational_pairs.md
│   - web_synthesis.md
│   - transformation_grid.md
│   - language_patterns.md
│   - final_categorization.md
│   - SYNTHESIS_VALIDATION.md
│
├── VERIFY human checkpoint status = APPROVED
│
├── IF ANY artifact missing: HALT — identify and re-run skill
├── IF human not approved: HALT — wait for human
│
└── Log: "Gate 2.5 passed — all synthesis artifacts validated"
```

---

### Phase 3.85: Layer 2.8 - RSF (Resonant Surprise Framework)

> **Critical Constraints Reminder (Layer 2.8)**
> - Read RESEARCH-ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Layer 2.5 human checkpoint MUST be APPROVED before RSF execution

**Reference:** [[./ROADMAP/RESONANT-SURPRISE-FRAMEWORK-OVERVIEW]] for RSF theory
**Sub-skills:** [[skills/layer-2-rsf/2.8-A-expectation-schema-mapper.md]], [[skills/layer-2-rsf/2.8-B-latent-resonance-identifier.md]]

**PURPOSE:** Map audience expectation schemas and latent resonance fields for downstream
creative skills (03-root-cause, 04-mechanism, 05-promise, 06-big-idea). RSF provides the
intelligence layer that enables schema distance calibration and FSSIT-first Big Idea generation.

**CRITICAL:** RSF outputs are REQUIRED by 06-big-idea (FSSIT-first protocol) and enhance
03-root-cause, 04-mechanism, and 05-promise. Skipping RSF degrades all downstream creative output.

**LAYER 2.8-RSF EXECUTION CONSTRAINTS:**
- MUST complete Layer 2.5 human checkpoint (APPROVED) before ANY RSF execution.
- MUST have transformation_pairs.md (from 2.5-A) — 2.8-B depends on it.
- MUST produce both expectation_schema.json AND latent_resonance_field.json.
- MUST meet minimum thresholds (≥15 patterns, ≥3 whitespace zones, ≥5 FSSIT candidates).
- NEVER skip RSF without explicit human override approval.
- NEVER rationalize skipping ("optional", "adds too many tokens", "can derive later").
- ONLY proceed to Layer 3 with Gate 2.8 passed OR human RSF-skip approved.

```
STEP 2.8-RSF-0: Pre-RSF Validation
├── VERIFY Layer 2.5 checkpoint = APPROVED (human-approved)
│   IF NOT: HALT — "Layer 2.5 must be human-approved before RSF execution"
│
├── VERIFY all RSF input dependencies exist:
│   Required for 2.8-A (Expectation Schema Mapper):
│   - layer-2-outputs/competitor_claims.json (competitor_analysis)
│   - layer-2-outputs/market_intelligence.md (market_narrative)
│   - layer-2-outputs/market_sophistication.json (sophistication_analysis)
│   - layer-1-outputs/quantified_buckets.json (classified_quotes)
│   - market_config.yaml
│
│   Required for 2.8-B (Latent Resonance Identifier):
│   - layer-1-outputs/quantified_buckets.json (classified_quotes)
│   - layer-2-outputs/belief_inventory.json (belief_excavation)
│   - layer-2-outputs/market_intelligence.md (market_narrative)
│   - layer-2-outputs/now_after_grid.json
│   - layer-2-5-outputs/transformation_pairs.md (CRITICAL — from Layer 2.5-A)
│   - market_config.yaml
│
├── IF ANY dependency missing:
│   - Log which files are missing
│   - HALT — "RSF cannot execute without: [missing files]"
│   - Present human with option: FIX (re-run upstream) or SKIP RSF
│   - IF human approves RSF skip:
│     - SET rsf_skip_approved: true
│     - Log: "⚠️ RSF SKIPPED by human override — downstream degradation expected"
│     - PROCEED directly to Gate 2.8 (skip path)
│
└── Log: "Pre-RSF validation passed, beginning Layer 2.8-RSF"

STEP 2.8-RSF-A: Expectation Schema Mapping
├── Call: /skills/layer-2-rsf/2.8-A-expectation-schema-mapper.md
│   Input:
│     - layer-2-outputs/competitor_claims.json
│     - layer-2-outputs/market_intelligence.md
│     - layer-2-outputs/market_sophistication.json
│     - layer-1-outputs/quantified_buckets.json
│     - market_config.yaml
│   Output: layer-2-rsf-outputs/expectation_schema.json
│
│   Validates:
│   - total_patterns_mapped ≥ 15
│   - saturated_claims ≥ 5
│   - exhausted_metaphors ≥ 3
│   - whitespace_zones ≥ 3
│   - schema_violation_opportunities ≥ 5
│   - schema_summary present and non-empty
│
│   IF validation fails:
│   - Log which minimums were not met
│   - Re-run 2.8-A once with expanded analysis scope
│   - If second attempt fails, flag for human review
│
└── Log: "Expectation schema mapping complete: [X] patterns, [Y] whitespace zones"

STEP 2.8-RSF-B: Latent Resonance Identification
├── Call: /skills/layer-2-rsf/2.8-B-latent-resonance-identifier.md
│   Input:
│     - layer-1-outputs/quantified_buckets.json
│     - layer-2-outputs/belief_inventory.json
│     - layer-2-outputs/market_intelligence.md
│     - layer-2-outputs/now_after_grid.json
│     - layer-2-5-outputs/transformation_pairs.md
│     - market_config.yaml
│   Output: layer-2-rsf-outputs/latent_resonance_field.json
│
│   Validates:
│   - expressed_vs_latent_gaps ≥ 3
│   - unnamed_emotions ≥ 2
│   - identity_tensions ≥ 2
│   - fssit_candidates ≥ 5 (each with recognition_strength ≥ 6)
│   - resonance_summary present and non-empty
│
│   IF validation fails:
│   - Log which minimums were not met
│   - Re-run 2.8-B once with expanded emotional analysis scope
│   - If second attempt fails, flag for human review
│
└── Log: "Latent resonance identification complete: [X] FSSIT candidates, [Y] identity tensions"

GATE 2.8: Pre-Layer-3 RSF Verification
├── PATH A — RSF Executed:
│   VERIFY both RSF outputs exist:
│   - layer-2-rsf-outputs/expectation_schema.json
│   - layer-2-rsf-outputs/latent_resonance_field.json
│
│   VERIFY minimums:
│   - expectation_schema: ≥15 patterns, ≥3 whitespace zones, schema_summary present
│   - latent_resonance_field: ≥3 gaps, ≥5 FSSIT candidates, ≥2 identity tensions, resonance_summary present
│
│   IF ALL pass:
│   - SET checkpoint_2_8_rsf: passed
│   - SET rsf_status.expectation_schema_generated: true
│   - SET rsf_status.latent_resonance_generated: true
│   - Log: "Gate 2.8 PASSED — RSF outputs validated"
│
│   IF ANY fail:
│   - Log which outputs failed validation
│   - Present to human: FIX (re-run RSF) or OVERRIDE (proceed without)
│
├── PATH B — RSF Skipped (human override):
│   VERIFY rsf_skip_approved = true
│   - SET checkpoint_2_8_rsf: skipped
│   - SET rsf_status.rsf_skip_approved: true
│   - Log: "⚠️ Gate 2.8 SKIPPED by human override — downstream skills will use degradation paths"
│
├── IF NEITHER path satisfied: HALT — "Cannot proceed to Layer 3 without RSF completion or skip"
│
└── Log: "Gate 2.8 resolved — proceeding to Layer 3"
```

---

### Phase 4: Layer 3 - Opportunity Surfacing & Strategic Intelligence

> **Critical Constraints Reminder (Layer 3)**
> - Read RESEARCH-ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Quote targets are exact: 1000 means 1000
> - Layer 3 produces strategic intelligence ONLY — no creative generation

**Reference:** [[./00-deep-research/01-research/RESEARCH-PRD#Section 4.3]] for Layer 3 requirements

**PURPOSE:** Surface strategic opportunities from validated research data. Layer 3 does NOT
generate creative assets (Big Ideas, mechanisms, copy). It produces strategic intelligence
that a downstream creative system can consume.

**ARCHITECTURE:** Research pipeline ends at FINAL_HANDOFF.md — a comprehensive intelligence
package. Creative generation (Big Ideas, mechanisms, promises) belongs in a separate system.

**LAYER 3 EXECUTION CONSTRAINTS:**
- MUST verify ALL Layer 3 trigger conditions before ANY Layer 3 execution.
- MUST have Layer 2.5 checkpoint = APPROVED before starting.
- MUST produce minimum 5 scored opportunities with all 6 scoring components.
- MUST identify at least 1 Tier 1 opportunity (score 80+).
- MUST address all 8 objection categories in proactive handling.
- NEVER generate new creative content — Layer 3 is SYNTHESIS and ASSEMBLY only.
- ONLY include evidence packages with valid, traceable quote IDs.
- MUST complete risk assessment for ALL Tier 1 opportunities.
- NEVER proceed to Final Handoff without validated opportunity map.

```
STEP 3.1: Opportunity Assessment (PARALLEL)
├── ⚡ PARALLEL EXECUTION - Run scoring, evidence, and objection handling simultaneously:
│
│   ┌─────────────────────────────────────────────────────────────────────┐
│   │  LAYER 3 TRIGGER CONDITIONS                                         │
│   │                                                                      │
│   │  ALL Layer 3 skills require these preconditions to be TRUE:         │
│   │                                                                      │
│   │  MANDATORY TRIGGERS (must ALL be met):                              │
│   │  ├── Layer 1 checkpoint passed (layer1_checkpoint.json exists)      │
│   │  ├── Layer 2 checkpoint passed (layer2_checkpoint.json exists)      │
│   │  ├── Layer 2.5 checkpoint = APPROVED (human-approved)               │
│   │  ├── All 7 Layer 2.5 artifacts exist and validated                  │
│   │  ├── Layer 2.8-RSF complete OR human-approved RSF skip              │
│   │  ├── layer-2-rsf-outputs/expectation_schema.json exists (or skip)  │
│   │  ├── layer-2-rsf-outputs/latent_resonance_field.json exists (or skip) │
│   │  ├── quantified_buckets.json has 1000+ classified quotes            │
│   │  └── market_config.yaml exists with complete configuration          │
│   │                                                                      │
│   │  IF ANY trigger is FALSE:                                           │
│   │  ├── DO NOT start Layer 3                                           │
│   │  ├── Log which precondition failed                                  │
│   │  ├── Return to appropriate layer to complete missing input          │
│   │  └── Re-check triggers after completion                             │
│   └─────────────────────────────────────────────────────────────────────┘
│
├── Call: 3.1-A Opportunity Scorer
│   Input:
│     - quantified_buckets.json
│     - transformation_pairs.md
│     - educational_pairs.md
│     - web_synthesis.md
│     - market_config.yaml
│   Output: layer-3-outputs/ranked_opportunities.json
│
│   Must produce 6-component weighted scoring:
│   - Market Demand (weight: 0.25) — frequency + intensity from quotes
│   - Emotional Intensity (weight: 0.20) — from language patterns
│   - Competitive Gap (weight: 0.20) — unmet needs from competitor analysis
│   - Evidence Strength (weight: 0.15) — quote density + source diversity
│   - Transformation Potential (weight: 0.10) — Now→After distance
│   - Urgency Signals (weight: 0.10) — time-pressure language
│
│   3-tier classification:
│   - TIER 1 (PRIMARY): Score 80+ — Lead opportunities
│   - TIER 2 (SECONDARY): Score 60-79 — Supporting angles
│   - TIER 3 (TERTIARY): Score 40-59 — Future exploration
│
│   Validation:
│   - Minimum 5 scored opportunities produced
│   - All 6 scoring components populated for each
│   - At least 1 Tier 1 opportunity identified
│   - All scores traceable to source quotes with IDs
│
├── Call: 3.1-B Evidence Compiler
│   Input:
│     - ranked_opportunities.json (from 3.1-A, if available; else run after)
│     - quantified_buckets.json
│     - final_categorization.md
│     - transformation_pairs.md
│     - language_patterns.md
│   Output: layer-3-outputs/evidence_packages.json
│
│   Must produce tiered evidence packages for each opportunity:
│   - FULL PACKAGE (Tier 1 opportunities):
│     - 15+ supporting quotes with IDs
│     - Statistical frequency data
│     - Emotional intensity markers
│     - Cross-bucket corroboration
│     - Transformation pair connections
│   - SUMMARY PACKAGE (Tier 2 opportunities):
│     - 8-12 supporting quotes with IDs
│     - Key frequency data
│     - Primary emotional drivers
│   - MINIMAL PACKAGE (Tier 3 opportunities):
│     - 3-5 representative quotes with IDs
│     - Basic frequency count
│
│   Validation:
│   - Every Tier 1 opportunity has FULL package
│   - All quote IDs are valid and traceable
│   - No fabricated or paraphrased quotes
│
├── Call: 3.1-C Proactive Objection Handler
│   Input:
│     - ranked_opportunities.json
│     - quantified_buckets.json (solutions_tried + competitor_mechanisms)
│     - market_intelligence.md
│   Output: layer-3-outputs/objection_responses.json
│
│   Must produce CPT (Claim-Proof-Turnaround) responses across 8 categories:
│   - SKEPTICISM: "This won't work for me because..."
│   - PRIOR_FAILURE: "I've tried similar things and..."
│   - COST_CONCERN: "This seems expensive/not worth..."
│   - TIME_CONCERN: "I don't have time to..."
│   - COMPLEXITY: "This seems too complicated..."
│   - TRUST: "How do I know this is legitimate..."
│   - COMPARISON: "Why not just use [competitor]..."
│   - RELEVANCE: "This doesn't apply to my situation..."
│
│   Each response includes:
│   - The objection (verbatim from research where possible)
│   - Claim: Direct counter-statement
│   - Proof: Quote evidence supporting the claim
│   - Turnaround: Reframe that transforms objection into benefit
│
│   8 handling types per objection:
│   - Acknowledge, Reframe, Evidence, Story, Logic, Contrast, Future-Pace, Bridge
│
│   Validation:
│   - All 8 categories addressed
│   - Each category has 3+ distinct objection variants
│   - All proof elements cite real quote IDs
│   - Turnarounds are specific (not generic)
│
└── Log: "Opportunity assessment complete: [X] opportunities scored, [Y] evidence packages, [Z] objections handled"

STEP 3.2: Strategic Planning (SEQUENTIAL — each builds on previous)
├── NOTE: 3.3-A → 3.3-B → 3.3-C must run in sequence (each requires prior output)
│
├── Call: 3.3-A Risk Assessor
│   Input:
│     - ranked_opportunities.json
│     - objection_responses.json
│     - market_intelligence.md
│     - competitor_offer_analysis.json
│   Output: layer-3-outputs/risk_factors.json
│
│   Must assess 5 risk categories per Tier 1 opportunity:
│   - MARKET RISK: Audience size, demand stability, trend direction
│   - COMPETITIVE RISK: Saturation, response likelihood, barrier to entry
│   - EXECUTION RISK: Complexity, resource requirements, dependencies
│   - MESSAGING RISK: Believability threshold, sophistication level, fatigue
│   - TIMING RISK: Seasonality, cultural moment, window of opportunity
│
│   Each risk scored on:
│   - Likelihood (1-5): How probable is this risk materializing?
│   - Impact (1-5): How severe if it materializes?
│   - Composite: Likelihood × Impact matrix
│   - Mitigation: Specific actionable countermeasure
│
│   Validation:
│   - All 5 categories assessed for Tier 1 opportunities
│   - All mitigations are specific and actionable
│   - Overall risk profile summarized per opportunity
│
├── Call: 3.3-B Action Sequencer
│   Input:
│     - ranked_opportunities.json
│     - risk_factors.json (from 3.3-A)
│     - evidence_packages.json
│   Output: layer-3-outputs/action_sequence.json
│
│   Must produce 3-phase timeline for Tier 1 opportunities:
│   - PHASE 1 — IMMEDIATE (0-2 weeks):
│     Quick wins, low-risk actions, validation steps
│   - PHASE 2 — SHORT-TERM (2-6 weeks):
│     Primary execution, asset creation, campaign launch
│   - PHASE 3 — MEDIUM-TERM (6-12 weeks):
│     Optimization, expansion, secondary opportunities
│
│   6 action types per phase:
│   - RESEARCH: Additional data gathering needed
│   - CREATE: Assets or content to produce
│   - TEST: Validation experiments to run
│   - LAUNCH: Go-live activities
│   - MEASURE: KPIs to track
│   - OPTIMIZE: Iteration based on results
│
│   Validation:
│   - All 3 phases populated for Tier 1 opportunities
│   - Actions are specific and assignable
│   - Dependencies between actions identified
│   - Risk mitigations integrated into timeline
│
├── Call: 3.3-C Measurement Definer
│   Input:
│     - ranked_opportunities.json
│     - action_sequence.json (from 3.3-B)
│     - risk_factors.json (from 3.3-A)
│   Output: layer-3-outputs/measurement_framework.json
│
│   Must produce for each Tier 1 opportunity:
│   - LEADING INDICATORS: Early signals of success/failure
│     (e.g., engagement rate, click-through, opt-in rate)
│   - LAGGING INDICATORS: Outcome metrics
│     (e.g., conversion rate, revenue, retention)
│   - DECISION TRIGGERS: Specific thresholds that trigger action
│     (e.g., "If CTR < 1.5% after 1000 impressions → revise headline")
│   - KILL CRITERIA: When to abandon an approach
│     (e.g., "If no Tier 1 conversion after 30 days → pivot")
│   - BASELINE BENCHMARKS: Industry/historical reference points
│
│   Validation:
│   - All Tier 1 opportunities have complete measurement frameworks
│   - Decision triggers have specific numeric thresholds
│   - Kill criteria are unambiguous
│   - Leading indicators are measurable within Phase 1 timeline
│
└── Log: "Strategic planning complete: risks assessed, actions sequenced, measurements defined"

STEP 3.3: Opportunity Map Generation
├── Call: 3.4-A Opportunity Map Generator
│   Input:
│     - ranked_opportunities.json
│     - evidence_packages.json
│     - objection_responses.json
│     - risk_factors.json
│     - action_sequence.json
│     - measurement_framework.json
│   Output: layer-3-outputs/opportunity_map.md
│
│   Must produce unified strategic document:
│   - OPPORTUNITY LANDSCAPE: Visual hierarchy of all scored opportunities
│   - TIER 1 DEEP DIVES: Full analysis per primary opportunity
│     - Score breakdown (6 components)
│     - Evidence summary (key quotes)
│     - Risk profile (5 categories)
│     - Action sequence (3 phases)
│     - Measurement framework
│     - Objection preparedness
│   - TIER 2 BRIEFS: Condensed summaries for secondary opportunities
│   - STRATEGIC RECOMMENDATIONS: Prioritized next steps
│   - CROSS-OPPORTUNITY PATTERNS: Themes spanning multiple opportunities
│
│   Validation:
│   - All Tier 1 opportunities have complete deep dives
│   - All Tier 2 opportunities have briefs
│   - Recommendations are ranked and actionable
│   - No new analysis generated — synthesis of existing Layer 3 outputs only
│
└── Log: "Opportunity map generated: [X] Tier 1, [Y] Tier 2, [Z] Tier 3"

STEP 3.4: Handoff Assembly
│   CONSTRAINTS:
│   - MUST verify all sections are present before declaring assembly complete.
│   - MUST preserve all verbatim quotes exactly as extracted — NEVER modify.
│   - NEVER generate new insights or analysis during assembly.
│   - ONLY include content that traces to a source artifact.
│   - MUST maintain consistent terminology from market_config throughout.
│   - MUST reject assembly if file size outside expected range (300-500KB).
│
├── Call: 3.2-A Handoff Packager
│   Input: ALL validated artifacts from Layers 1, 2, 2.5, 2.8-RSF (if executed), and 3 + research brief
│   Output: FINAL_HANDOFF.md (300-500KB expected)
│
│   ASSEMBLY RULES (CRITICAL):
│   - COMBINE existing artifacts into structured document
│   - FORMAT consistently (headings, blockquotes, tables)
│   - PRESERVE all verbatim quotes exactly as extracted
│   - REFERENCE source artifacts (not re-analyze)
│   - DO NOT generate new insights or analysis
│   - DO NOT re-interpret data
│   - DO NOT fill gaps with generated content
│   - ALL content must trace to a source artifact
│
│   Full Section Structure (14 core + 3 contextual):
│
│   0. BUSINESS CONTEXT (from research brief)
│      - Why this research was initiated (why_now)
│      - What decisions this research informs (decisions_pending)
│      - Hypotheses to be validated (listed, verdicts in Section 16)
│      - Questions to be answered (listed, answers in Section 15)
│      - Areas of exploration emphasis
│      NOTE: Provides CONTEXT for interpreting findings. If brief had no
│      sections 3-6, displays "No business context provided."
│
│   1. EXECUTIVE SUMMARY
│      - Research metrics (quote count, source count, coverage)
│      - Top 3 opportunities with composite scores
│      - Single biggest strategic insight
│
│   2. MARKET LANDSCAPE
│      - Market configuration summary (from market_config.yaml)
│      - Competitive landscape (from market_intelligence.md)
│      - Market sophistication level
│
│   3. QUANTIFIED VOICE OF CUSTOMER
│      - All quotes by bucket with two-tier categorization
│        (from final_categorization.md)
│      - Bucket tallies and distributions
│      - Quote format: > "text" — Source [ID] [PRIORITY] [tags]
│
│   4. TRANSFORMATION PAIRS
│      - All Pain→Hope pairs with bridge insights
│        (from transformation_pairs.md)
│
│   5. EDUCATIONAL PAIRS
│      - All Why→How pairs with educational frames
│        (from educational_pairs.md)
│
│   6. WEB ANALYSIS
│      - Wants, Emotions, Beliefs with Schwab subdivisions
│        (from web_synthesis.md)
│
│   7. TRANSFORMATION GRID
│      - Now→After across 4 dimensions
│        (from transformation_grid.md)
│
│   8. LANGUAGE ARSENAL
│      - Gold phrases, patterns, metaphors, intensity markers
│        (from language_patterns.md)
│
│   8.5. RSF INTELLIGENCE (if RSF executed — omit section if RSF skipped)
│        - Expectation schema summary
│          (from layer-2-rsf-outputs/expectation_schema.json → schema_summary)
│        - Top whitespace zones (messaging territory with no/low competitor presence)
│          (from expectation_schema.json → whitespace_zones)
│        - Saturated claims with staleness scores
│          (from expectation_schema.json → saturated_claims)
│        - Latent resonance summary
│          (from layer-2-rsf-outputs/latent_resonance_field.json → resonance_summary)
│        - FSSIT candidates (top 5+ "Finally Someone Said It" statements)
│          (from latent_resonance_field.json → fssit_candidates)
│        - Identity tensions
│          (from latent_resonance_field.json → identity_tensions)
│        - Cultural timing analysis
│          (from latent_resonance_field.json → temporal_alignment)
│        NOTE: This section is consumed by Skills 03-06 for schema distance
│        calibration and FSSIT-first Big Idea generation.
│
│   9. OPPORTUNITY MAP
│      - Ranked opportunities with scores and tiers
│        (from opportunity_map.md)
│
│   10. EVIDENCE PACKAGES
│       - Tiered evidence for each opportunity
│         (from evidence_packages.json)
│
│   11. OBJECTION PLAYBOOK
│       - CPT responses across 8 categories
│         (from objection_responses.json)
│
│   12. RISK FACTORS
│       - 5-category risk assessment per Tier 1 opportunity
│         (from risk_factors.json)
│
│   13. ACTION SEQUENCE
│       - 3-phase timeline with 6 action types
│         (from action_sequence.json)
│
│   14. MEASUREMENT FRAMEWORK
│       - Leading/lagging indicators, decision triggers, kill criteria
│         (from measurement_framework.json)
│
│   15. ADDITIONAL QUESTIONS RESPONSE (if brief contained questions)
│       - Each question from brief with evidence-based answer
│       - Supporting quote IDs and data points
│       - Confidence level (HIGH/MEDIUM/LOW)
│       NOTE: Only included if brief.additional_questions was populated.
│       Answers must be SUBSTANTIVE with specific evidence citations.
│
│   16. HYPOTHESIS VALIDATION (if brief contained hypotheses)
│       - Each hypothesis with VALIDATED/INVALIDATED/INCONCLUSIVE verdict
│       - Evidence FOR with quote IDs
│       - Evidence AGAINST with quote IDs
│       - Confidence percentage
│       - Nuance and caveats
│       NOTE: Only included if brief.hypotheses was populated.
│       Verdicts determined by evidence weight, not confirmation bias.
│
│   APPENDICES:
│   - Source inventory (all scraped sources with URLs)
│   - Artifact manifest (all intermediate files produced)
│   - Methodology notes (E5 framework, WEB framework)
│   - Competitor analysis detail (from competitor_offer_analysis.json)
│
├── Assembly Validation (ACTIVE ENFORCEMENT):
│   - MUST verify single markdown file produced — FAIL if multiple files
│   - MUST verify Section 0 present (even if "no context provided")
│   - MUST verify all 14 core sections (1-14) present and populated
│   - MUST verify Section 15 present if brief had additional_questions
│   - MUST verify Section 16 present if brief had hypotheses
│   - MUST verify all content traceable to source artifacts — REJECT untraceable content
│   - MUST verify all quote IDs preserved (P-XXX, H-XXX, RC-XXX, ST-XXX, CM-XXX, V-XXX)
│   - MUST verify NO new analysis or interpretation added — REJECT generated content
│   - MUST verify file size within expected range (300-500KB) — FLAG if outside range
│   - MUST verify all terminology consistent with market_config — REJECT inconsistencies
│   - MUST verify hypothesis verdicts have supporting evidence — REJECT unsubstantiated verdicts
│   - MUST verify question answers cite specific quote IDs — REJECT generic answers
│
├── IF validation fails:
│   - Identify missing section
│   - Trace to source artifact
│   - Re-assemble (not re-generate)
│
└── Log: "FINAL_HANDOFF.md assembled: [X]KB, [Y] sections, [Z] quotes"

STEP 3.5: Layer 3 Final Validation
│   CONSTRAINTS:
│   - MUST verify ALL Tier 1 opportunities scored 80+.
│   - MUST confirm evidence packages complete for ALL Tier 1.
│   - MUST confirm measurement frameworks have numeric thresholds.
│   - NEVER mark research complete with FAIL status.
│   - ONLY transition to COMPLETE when ALL validators pass.
│
├── Post-assembly verification:
│
│   Validates:
│   - All Tier 1 opportunities scored 80+?
│   - Evidence packages complete for all Tier 1?
│   - Objection responses cover all 8 categories?
│   - Risk assessments have specific mitigations?
│   - Action sequences are phase-appropriate?
│   - Measurement frameworks have numeric thresholds?
│   - FINAL_HANDOFF.md is complete and consistent?
│
├── Gate Decision:
│   - PASS: All requirements met, research complete
│   - CONDITIONAL_PASS: Minor gaps noted, handoff with recommendations
│   - FAIL: Major gaps, return to specific skill for remediation
│
├── IF FAIL:
│   - Identify failing component
│   - Return to appropriate 3.x skill
│   - Re-run and re-validate
│   - Re-assemble FINAL_HANDOFF.md
│
└── Log: "Layer 3 validation: [status] - Research [complete/incomplete]"
```

---

### Phase 5: Completion & Delivery

> **Critical Constraints Reminder (Phase 5)**
> - Read RESEARCH-ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Quote targets are exact: 1000 means 1000
> - FINAL_HANDOFF.md is the primary deliverable — verify completeness

**Reference:** [[./00-deep-research/01-research/RESEARCH-PRD#Section 5]] for output requirements

**NOTE:** FINAL_HANDOFF.md assembly is handled in Phase 4, STEP 3.4 (Handoff Packager).
This phase handles post-assembly verification, file organization, and delivery.

```
STEP 5.1: Post-Assembly Verification
├── Verify all output files exist in appropriate folders:
│
│   layer-1-outputs/
│   ├── market_config.yaml
│   ├── quantified_buckets.json
│   ├── platform_list.json
│   └── source_urls.json
│
│   layer-2-outputs/
│   ├── market_intelligence.md
│   ├── voice_of_customer_analysis.md
│   ├── web_analysis.json
│   ├── advanced_patterns.json
│   ├── e5_synthesis.json
│   └── competitor_offer_analysis.json
│
│   layer-2-5-outputs/
│   ├── transformation_pairs.md
│   ├── educational_pairs.md
│   ├── web_synthesis.md
│   ├── transformation_grid.md
│   ├── language_patterns.md
│   ├── final_categorization.md
│   └── SYNTHESIS_VALIDATION.md
│
│   layer-3-outputs/
│   ├── ranked_opportunities.json
│   ├── evidence_packages.json
│   ├── objection_responses.json
│   ├── risk_factors.json
│   ├── action_sequence.json
│   ├── measurement_framework.json
│   └── opportunity_map.md
│
│   checkpoints/
│   ├── latest_checkpoint.json
│   ├── checkpoint_layer1_complete.json
│   ├── checkpoint_layer2_complete.json
│   ├── checkpoint_layer2_5_complete.json
│   └── checkpoint_layer3_complete.json
│
│   FINAL_HANDOFF.md (root level)
│
├── IF any file missing: Log gap, trace to originating skill
│
└── Log: "File verification complete: [X] artifacts confirmed"

STEP 5.2: Technical Audit (Final)
├── Call: 0.4 Technical Audit
│   Input: All output files + FINAL_HANDOFF.md
│   Output: validation-logs/final_audit.md
│
│   Validates:
│   - Quote authenticity (no fabrication)
│   - Source traceability (all IDs valid)
│   - Completeness (no empty sections)
│   - Consistency (terminology matches market_config)
│   - Format compliance (blockquote lines, correct ID format)
│
└── Log: "Technical audit: [PASS/FAIL]"

STEP 5.3: Delivery
├── Create execution_log.md with full timeline
├── Create summary.md with key metrics:
│   - Total quotes extracted
│   - Sources scraped
│   - Tier 1 opportunities identified
│   - Top opportunity score
│   - Total research duration
│   - Layer completion timestamps
├── Present FINAL_HANDOFF.md to human
│
└── Log: "Research complete — FINAL_HANDOFF.md ready for review"
```

---

## Micro-Skill Registry

### Phase 0 Skills (Market Configuration)

| Skill ID | Name | Purpose | PRD Reference |
|----------|------|---------|---------------|
| 0.0-A | Market Configurator | Generate market_config.yaml from brief | Section 2 |

### Layer 1 Skills

| Skill ID | Name | Purpose | PRD Reference | E5 Reference |
|----------|------|---------|---------------|--------------|
| 1.0-A | Context Expander | Expand product to full research context | Section 2 | - |
| 1.0-B | Prospect Awareness Mapper | Diagnose 5-level awareness pyramid | Section 2 | E5 Tool 1 |
| 1.1-A | Platform Identifier | Identify platforms for research topics | Section 2.2 | - |
| 1.1-B | Query Generator | Generate queries for all topics | Section 2.2 | - |
| 1.2-A | Source Scanner | Discover sources across platforms | Section 3 | - |
| 1.2-B | Source Scorer | Score sources for relevance | Section 3 | - |
| 1.3-A | Source Validator | Validate and prepare source list | Section 3 | - |
| 1.4-A | Scraper - Forums | Scrape forum content | Section 3 | - |
| 1.4-B | Scraper - Video | Scrape video platform content | Section 3 | - |
| 1.4-C | Scraper - Reddit | Scrape Reddit content (Apify only) | Section 3 | - |
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
| 2.2-E | WEB Analysis Deep | Systematic Wants/Emotions/Beliefs extraction | Section 4.2 | E5 Tool 2 |
| 2.2-F | Belief Excavator | Extract pre-existing beliefs about marketplace | Section 4.2 | E5 Tool 2B |
| 2.3-A | Gap Counter | Count market gaps | Section 4.2 | - |
| 2.3-B | Gap Assessor | Assess gap opportunities | Section 4.2 | - |
| 2.4-A | Competitor Claim Mapper | Map competitor claims + VILLAIN EXTRACTION | Section 4.2 | E5 Competitor |
| 2.4-B | Saturation Scorer | Score market saturation | Section 4.2 | - |
| 2.4-C | Mechanism Mapper | Map competitor tech (NAME + ARTICULATION) | Section 4.2 | E5 Competitor |
| 2.4-D | Promise Exposure Analyzer | Diagnose Market Sophistication Stage (1-5) | Section 4.2 | E5 Tool 6 |
| 2.4-E | Competitor Offer Analyzer | Map offers: deliverables, price, guarantee, bonuses | Section 4.2 | E5 Competitor |
| 2.5-A | Trend Detector | Detect market trends | Section 4.2 | - |
| 2.5-B | Timing Assessor | Assess timing signals | Section 4.2 | - |
| 2.6-A | Contrarian Detector | Detect contrarian views | Section 4.2 | - |
| 2.6-B | Pattern Linker | Link patterns across data | Section 4.2 | - |
| 2.6-C | Villain Identifier | Identify market villains | Section 4.2 | - |
| 2.6-D | Transformation Mapper | Map customer transformations | Section 4.2 | - |
| 2.6-E | Category Creation Detector | Detect category opportunities | Section 4.2 | - |
| 2.6-F | Loss Aversion Weighter | Weight loss aversion signals | Section 4.2 | - |
| 2.6-G | Pattern Consolidator | Consolidate all patterns | Section 4.2 | - |
| 2.6-H | Now-After Grid | Map Have/Experience/Status/Feeling transformation | Section 4.2 | E5 Tool 3 |
| 2.6-I | Ideal Client Outcome | Construct best success story | Section 4.2 | E5 Tool 4 |
| 2.6-J | Magic Wand Extractor | Extract blue-sky perfect world desires | Section 4.2 | E5 Tool 5 |
| 2.6-K | Benefit Dimensionalizer | Transform Functional → Dimensionalized → Emotional | Section 4.2 | E5 Product |
| 2.7-A | Intelligence Synthesizer | Synthesize all intelligence | Section 4.2 | - |
| 2.8-A | Layer 2 Checkpoint | Validate Layer 2 completion | Section 4.2 | - |

### Layer 2.8-RSF Skills (Resonant Surprise Framework)

| Skill ID | Name | Purpose | PRD Reference | E5 Reference |
|----------|------|---------|---------------|--------------|
| 2.8-RSF-A | Expectation Schema Mapper | Map audience messaging expectations, staleness scores, whitespace zones | Section 4.2.8 | RSF |
| 2.8-RSF-B | Latent Resonance Identifier | Identify latent emotions, FSSIT candidates, identity tensions | Section 4.2.8 | RSF |

### Layer 2.5 Skills (Synthesis)

| Skill ID | Name | Purpose | PRD Reference | E5 Reference |
|----------|------|---------|---------------|--------------|
| 2.5-A | Transformation Synthesizer | Synthesize Pain→Hope transformation pairs from all quotes | Section 4.2.5 | - |
| 2.5-B | Educational Synthesizer | Synthesize Why→How educational pairs from root cause + solutions tried | Section 4.2.5 | - |
| 2.5-C | WEB Synthesizer | Synthesize Wants/Emotions/Beliefs with Schwab subdivisions | Section 4.2.5 | E5 Tool 2 |
| 2.5-D | Transformation Grid | Produce 4-dimension Now→After grid (Have/Experience/Status/Feeling) | Section 4.2.5 | E5 Tool 3 |
| 2.5-E | Language Extractor | Extract gold phrases, recurring patterns, metaphors, intensity markers | Section 4.2.5 | - |
| 2.5-F | Categorization Finalizer | Two-tier categorization (physical + emotional tags) for all quotes | Section 4.2.5 | - |
| 2.5-G | Validation Generator | Generate SYNTHESIS_VALIDATION.md for human review checkpoint | Section 4.2.5 | - |

### Layer 3 Skills (Opportunity Surfacing & Strategic Intelligence)

| Skill ID | Name | Purpose | PRD Reference | E5 Reference |
|----------|------|---------|---------------|--------------|
| 3.1-A | Opportunity Scorer | Score opportunities with 6-component weighted scoring and 3-tier classification | Section 4.3 | - |
| 3.1-B | Evidence Compiler | Compile tiered evidence packages (Full/Summary/Minimal) per opportunity | Section 4.3 | - |
| 3.1-C | Proactive Objection Handler | Generate CPT (Claim-Proof-Turnaround) responses across 8 objection categories | Section 4.3 | - |
| 3.3-A | Risk Assessor | Assess 5 risk categories (Market/Competitive/Execution/Messaging/Timing) per opportunity | Section 4.3 | - |
| 3.3-B | Action Sequencer | Produce 3-phase action timeline (Immediate/Short-Term/Medium-Term) with 6 action types | Section 4.3 | - |
| 3.3-C | Measurement Definer | Define leading/lagging indicators, decision triggers, kill criteria, and baselines | Section 4.3 | - |
| 3.4-A | Opportunity Map Generator | Generate unified strategic document with tier deep dives and recommendations | Section 4.3 | - |
| 3.2-A | Handoff Packager | Assemble FINAL_HANDOFF.md (14-section structure) from all validated artifacts | Section 5 | - |

---

*Extracted from MASTER-AGENT.md v5.4 on 2026-02-25.*
