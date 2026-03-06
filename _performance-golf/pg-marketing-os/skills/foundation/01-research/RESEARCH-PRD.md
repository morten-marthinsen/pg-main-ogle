# Deep Research System v3 - Product Requirements Document

**Version:** 5.1
**Created:** January 17, 2026
**Last Updated:** January 29, 2026
**Role:** Requirements & Standards Authority
**Related Document:** [[skills/foundation/01-research/MASTER-AGENT]] (Execution Workflow)
**Enforcement Document:** [[ENFORCEMENT-GATES]] (MANDATORY Hard Stops)
**Methodology Reference:** Todd Brown E5 Method Integration

---

## IDENTITY

```
This document IS: The single authority defining WHAT must be achieved across all layers
                   of the Deep Research pipeline. All requirements, minimums, thresholds,
                   and quality standards originate here.

This document is NOT: An execution guide (that is MASTER-AGENT.md).
This document is NOT: A skill prompt (those are in skills/).
This document is NOT: A style guide (see QUALITY-STANDARDS.md for formatting rules).

AUTHORITY RULE: If there is ANY conflict between the MASTER-AGENT and this PRD,
                this PRD takes precedence. No exceptions.

ENFORCEMENT: All requirements in this PRD are enforced by ENFORCEMENT-GATES.md.
             Gates are BINARY - they either OPEN or CLOSE.
             A CLOSED gate BLOCKS all progression. No exceptions.
```

---

## CONSTRAINTS

```
CRITICAL NOTE ON QUOTE VOLUME:
The 1,000 quote minimum is a RULE, not a guideline. This threshold exists because
deep research quality collapses below this volume. DO NOT reduce this number without
EXPLICIT user permission stating: "I approve reducing quote volume to [N] for [reason]."
Market type, product type, and time constraints are NOT automatic exceptions.
When in doubt, hit 1,000 quotes.

HARD BLOCKERS (Gate 1 — Layer 1 → Layer 2):
1. Total quotes < 1,000 → BLOCKED. No rounding, no approximation.
2. Pain quotes < 300 → BLOCKED.
3. Hope quotes < 250 → BLOCKED.
4. Root cause quotes < 200 → BLOCKED.
5. Solutions tried quotes < 150 → BLOCKED.
6. Competitor mechanism quotes < 100 → BLOCKED.
7. Villain quotes < 75 → BLOCKED.
8. Numbered quote system missing → BLOCKED.
9. Pain-Hope pairs < 25 → BLOCKED.
10. Why-How pairs < 25 → BLOCKED.
11. Villain data points < 50 → BLOCKED.
12. Competitor offers missing → BLOCKED.
13. Mechanisms mapped < 15 → BLOCKED.

HARD BLOCKERS (Gate 2.5 — Layer 2.5 → Layer 2.8-RSF):
13a. Transformation pairs < 25 → BLOCKED.
13b. Educational pairs < 25 → BLOCKED.
13c. Any WEB category empty → BLOCKED.
13d. Any transformation grid dimension missing → BLOCKED.
13e. Gold phrases < 10 → BLOCKED.
13f. Final categorization quote count ≠ input count → BLOCKED.
13g. Human checkpoint 2.5 not APPROVED → BLOCKED.
13h. Any Layer 2.5 artifact file missing → BLOCKED.

HARD BLOCKERS (Gate 2.8 — Layer 2.8-RSF → Layer 3):
14a. expectation_schema.json missing → BLOCKED (unless human RSF skip approved).
14b. expectation_schema total_patterns_mapped < 15 → BLOCKED.
14c. expectation_schema whitespace_zones < 3 → BLOCKED.
14d. latent_resonance_field.json missing → BLOCKED (unless human RSF skip approved).
14e. latent_resonance_field expressed_vs_latent_gaps < 3 → BLOCKED.
14f. latent_resonance_field fssit_candidates < 5 → BLOCKED.
14g. latent_resonance_field identity_tensions < 2 → BLOCKED.
14h. Human RSF skip NOT approved AND any of above fails → BLOCKED.

ANTI-FABRICATION RULES:
14. ALL quotes MUST be exact verbatim — no paraphrasing, no cleaning, no "summarizing."
15. ALL counts MUST trace to actual data files — never estimated or rounded.
16. Confidence scores MUST be calculated from formula (Rule 5), never asserted.
17. Validation files CANNOT contain minimums not defined in this PRD.
18. IF validation passes with actual < PRD minimum → validation is CORRUPT, restart.

QUANTIFICATION RULES:
19. NEVER use vague qualifiers ("many," "most," "often," "significant").
20. ALWAYS use exact counts with denominators ("412 of 847 pain quotes (48.6%)").
21. EVERY claim MUST trace to source material with quote ID.

SCOPE RULES:
22. This system produces research intelligence — NEVER marketing copy.
23. This system maps competitor mechanisms — NEVER creates new ones.
24. This system identifies opportunities — NEVER executes campaigns.
25. Downstream agents consume FINAL_HANDOFF.md — this system produces it.

EXECUTION RULES:
26. NEVER proceed past a failed gate. Gates are binary.
27. NEVER reduce scope below minimums without human approval.
28. NEVER skip a required bucket or analysis.
29. ALWAYS self-expand when minimums unmet (3 MANDATORY expansion rounds, then escalate to human).
30. ALWAYS use tool fallback chain on failure (Firecrawl → Apify → Perplexity).
```

---

## Section 1: System Purpose & Philosophy

### 1.1 The Core Standard

> "This process is intended to do the work of an entire nine-figure research team. This cannot be surface-level basic research that could be done in five minutes with a Google search."

**The Standard:** Would a $100M+ company's dedicated research team produce this? If not, it's not done.

### 1.2 The Math of Confidence

| Evidence Count | Quality Level | Action |
|----------------|---------------|--------|
| < 50 | Garbage | Cannot proceed - expand immediately |
| 50-100 | Insufficient | Cannot make confident claims |
| 100-500 | Getting There | May proceed with heavy caveats |
| 500-1,000 | Acceptable Minimum | Can make moderate confidence claims |
| 1,000+ | Target Standard | Required for strategic decisions |
| 2,000+ | Excellence | Enables PhD-level defensibility |

### 1.3 Market Adaptability Principle

This system adapts to ANY market where understanding buyer psychology creates competitive advantage:

- Health & Wellness (supplements, fitness, biohacking)
- Personal Development (coaching, courses, transformation)
- Finance & Investing (newsletters, trading systems)
- Software & SaaS (B2B, B2C)
- Information Products (courses, memberships)
- Physical Products (equipment, tools, devices)
- Services (consulting, agencies, professional services)
- Any direct response or high-consideration purchase market

The system calibrates terminology, platforms, and aspects based on the market configuration provided in the research brief.

---

## Section 1.5: Scope, Boundaries & Decision Rules

### 1.5.1 Explicit Scope Definition

#### IN SCOPE (What This System Produces)

```yaml
primary_outputs:
  - Quantified voice-of-customer intelligence (quotes, tallies, patterns)
  - Competitive landscape mapping (claims, mechanisms, offers, villains)
  - Prospect psychological profiling (WEB analysis, awareness, beliefs)
  - Strategic opportunity identification (scored and prioritized)
  - Messaging framework foundations (themes, angles, language patterns)
  - FINAL_HANDOFF.md with all intelligence for downstream agents

prospect_examination:
  - Awareness Pyramid diagnosis (which of 5 levels)
  - WEB Analysis (Wants, Emotions, Beliefs)
  - Now-After Grid (transformation mapping)
  - Ideal Client Outcome (best success story)
  - Magic Wand Extraction (blue-sky desires)
  - Promise Exposure Analysis (market sophistication stage)

competitor_examination:
  - Claim mapping (what they say)
  - Mechanism mapping (NAME + ARTICULATION for exclusion)
  - Offer analysis (deliverables, price, terms, guarantee, bonuses)
  - Villain extraction (what prospects HATE about them)
  - White space identification (unowned positioning)

product_intelligence_for_handoff:
  - Benefit dimensionalization (functional → emotional)
  - Proactive objection mapping (with CPT responses)
  - Feature-to-benefit translation
```

#### OUT OF SCOPE (What Downstream Agents Handle)

```yaml
mechanism_creation:
  - Creating new proprietary mechanisms is OUT OF SCOPE
  - This system MAPS competitor mechanisms for EXCLUSION
  - Mechanism creation agent uses FINAL_HANDOFF.md exclusion registry
  - Rationale: Mechanism creation requires product-specific engineering

copy_creation:
  - Writing actual marketing copy is OUT OF SCOPE
  - This system produces INPUTS for copy (language patterns, themes, quotes)
  - Copy agents use FINAL_HANDOFF.md intelligence
  - Rationale: Copy requires creative synthesis beyond research

campaign_execution:
  - Media buying, ad placement, funnel building OUT OF SCOPE
  - This system produces intelligence that INFORMS campaigns
  - Rationale: Execution requires different tooling and expertise

product_development:
  - Physical product design OUT OF SCOPE
  - This system identifies WHAT prospects want, not HOW to build it
  - Rationale: R&D is separate discipline
```

### 1.5.2 Decision Rules

#### Rule 1: Expansion vs Completion Trade-off

```yaml
decision_trigger: "Should I continue expanding or move to next phase?"

decision_rule:
  IF quote_volume < 1000:
    → EXPAND (mandatory)
  IF any_bucket < minimum_threshold:
    → EXPAND that bucket specifically
  IF cluster_ambiguity_detected (3+ patterns undifferentiated):
    → EXPAND to resolve ambiguity
  IF all_minimums_met AND saturation_achieved:
    → PROCEED to next phase
  IF expansion_would_exceed_budget:
    → PAUSE for human decision

never_decide_autonomously:
  - Reducing scope below minimums
  - Skipping a required bucket
  - Proceeding with unresolved ambiguity
```

#### Rule 2: Source Quality vs Quantity Trade-off

```yaml
decision_trigger: "Low-quality source vs no source for topic"

decision_rule:
  IF topic_has_zero_sources:
    → ACCEPT lower-quality source over nothing
    → FLAG as "needs validation"
  IF topic_has_3+_sources:
    → PREFER high-quality sources when multiple options exist
    → DISCARD low-quality sources ONLY when higher-quality alternatives cover the same topic
    → NOTE: This is about SOURCE SELECTION, not quote volume. The 1,000 quote minimum is non-negotiable regardless of source quality.
  IF all_sources_low_quality:
    → DOCUMENT the limitation
    → PROCEED with caveats
    → FLAG for human review

quality_hierarchy:
  1. Forum discussions (peers talking to peers)*
  2. YouTube comments (emotional, unfiltered)
  3. Reddit threads (detailed experiences)
  4. Review sites (structured but less emotional)
  5. Product pages (competitor-controlled, use for mechanisms only)

# *CRITICAL FORUM AWARENESS CAVEAT*
# Forum users in specialized communities represent the HIGHEST
# awareness level in the market - NOT the general prospect.
# These are enthusiasts who have tried everything.
# Their sophistication level ≠ average viewer or casual buyer.

forum_awareness_protocol:
  recognition:
    - Forum users are typically "Most Aware" or "Product Aware" prospects
    - They know competitor products, mechanisms, and promises intimately
    - Their objections are MORE sophisticated than general market
    - Their language reflects deep product knowledge, not beginner confusion

  source_balancing_protocol:
    STEP_1: "Collect and analyze forum insights separately"
    STEP_2: "Collect and analyze non-forum insights separately"
    STEP_3: "Compare forum patterns vs non-forum patterns"
    STEP_4: "Identify SHARED patterns (high confidence - universal)"
    STEP_5: "Flag FORUM-ONLY patterns as 'advanced prospect specific'"
    STEP_6: "Flag NON-FORUM-ONLY patterns as 'general market insight'"

  weighting_guidance:
    - DO NOT over-index on forum sophistication for general market copy
    - USE forum insights for: mechanism credibility, advanced objections,
      competitor weaknesses, technical proof requirements
    - USE non-forum insights for: emotional triggers, basic desires,
      awareness level language, entry-point messaging

  output_requirement:
    - ALL synthesis documents must note source distribution
    - FLAG if >60% of insights come from forums alone
    - ENSURE cumulative understanding across ALL source types
    - DOCUMENT any forum-vs-general-market contradictions
```

#### Rule 3: Confidence Threshold Trade-off

```yaml
decision_trigger: "Low confidence on analysis item"

decision_rule:
  IF confidence < 50%:
    → FLAG for human review
    → DO NOT include in primary recommendations
    → DOCUMENT in "uncertain findings" section
  IF confidence 50-79%:
    → INCLUDE with explicit confidence label
    → DOCUMENT supporting evidence
  IF confidence >= 80%:
    → INCLUDE as validated finding

confidence_calculation:
  - Multiple independent sources confirming = +20%
  - High engagement on source content = +10%
  - Recency (< 1 year) = +10%
  - Specificity of quotes = +15%
  - Consistency with other findings = +15%
  - Emotional intensity in language = +10%
```

#### Rule 4: Tool Failure Trade-off

```yaml
decision_trigger: "Scraping tool fails"

decision_rule:
  IF tool_fails:
    → SWITCH to fallback immediately
    → LOG the failure
    → DO NOT pause for human
  IF all_tools_fail_for_source:
    → SKIP source if non-critical
    → FLAG if critical
    → CONTINUE with other sources
  IF all_tools_fail_for_critical_source:
    → PAUSE for human intervention
    → DOCUMENT what was attempted

critical_source_definition:
  - Primary competitor product pages
  - Major forums (market-specific)
  - YouTube instructional content
```

#### Rule 5: Confidence Calculation Formula (MANDATORY - ANTI-FABRICATION)

```yaml
CRITICAL: Confidence MUST be calculated from data, NEVER asserted

confidence_calculation_formula:
  purpose: Prevent fabricated confidence scores

  formula:
    base_score: 0

    quote_volume_score:
      IF total_quotes >= 1000: +25
      IF total_quotes >= 500 AND < 1000: +10
      IF total_quotes < 500: 0
      BLOCKER: IF total_quotes < 500, confidence = BLOCKED, cannot proceed

    bucket_coverage_score:
      FOR each primary bucket:
        IF bucket_count >= bucket_minimum: +5
        IF bucket_count < bucket_minimum: -10
      BLOCKER: IF any bucket < minimum, confidence = BLOCKED

    saturation_score:
      IF all_clusters_resolved: +15
      IF ambiguous_clusters_exist: -20

    pair_extraction_score:
      IF pain_hope_pairs >= 25: +10
      IF why_how_pairs >= 25: +10
      BLOCKER: IF pairs not extracted, confidence = BLOCKED

    villain_data_score:
      IF villain_data_points >= 50: +10
      IF villain_data_points < 50: -15
      BLOCKER: IF villain_data_points = 0, confidence = BLOCKED

    final_confidence_calculation:
      raw_score = SUM(all scores above)
      IF any BLOCKER triggered: confidence = 0, status = "BLOCKED"
      ELSE: confidence = MIN(raw_score, 100)

  confidence_labels:
    0-49: "LOW" (requires human review)
    50-79: "MEDIUM" (include with caveats)
    80-100: "HIGH" (validated finding)
    BLOCKED: "INVALID" (cannot proceed)

  validation_requirements:
    - Confidence score MUST include calculation breakdown
    - Every "+X" or "-X" must reference actual data count
    - "HIGH" / "MEDIUM" / "LOW" labels REQUIRE numeric backing
    - Assertions like "confidence: HIGH" without calculation = INVALID
    - Agent CANNOT proceed with INVALID confidence

  anti_fabrication_rule:
    - IF validation file contains confidence without calculation → REJECT
    - IF confidence score doesn't match calculated score → REJECT
    - IF minimums in validation don't match PRD → REJECT validation entirely
    - Invented minimums = automatic failure of entire layer
```

### 1.5.3 Dependencies & Integration Points

#### Upstream Dependencies (What This System Needs)

```yaml
required_inputs:
  research_brief:
    - Product name and category
    - Primary problem the product solves
    - Target audience description
    - Known competitors (starting list)
    source: Human operator

  tool_access:
    - Firecrawl (primary scraper)
    - Apify (fallback scraper)
    - Perplexity (research fallback)
    source: MCP configuration

  context_files:
    - Previous research (if exists)
    - Brand guidelines (if relevant)
    source: Project folder
```

#### Downstream Consumers (What Uses This Output)

```yaml
consumers:
  mechanism_creation_agent:
    receives: exclusion_registry (competitor mechanisms to avoid)
    from_section: FINAL_HANDOFF.md → Mechanism Exclusion Registry

  copy_creation_agent:
    receives:
      - Top 25 quotes per bucket
      - Language DO's and DON'Ts
      - Messaging framework
      - Objection counters
      - Testimonial templates
    from_section: FINAL_HANDOFF.md → All sections

  campaign_strategy_agent:
    receives:
      - Strategic opportunities with scores
      - Customer journey map
      - Competitive positioning
    from_section: FINAL_HANDOFF.md → Layer 3

  product_team:
    receives:
      - Pain/hope patterns
      - Feature requests (implicit)
      - Competitor weaknesses
    from_section: FINAL_HANDOFF.md → Layer 1 + Layer 2
```

### 1.5.4 Risks & Mitigations

#### Risk 1: Insufficient Quote Volume

```yaml
risk: Research produces < 1000 quotes
probability: MEDIUM (depends on market size)
impact: HIGH (compromises all downstream analysis)

mitigation:
  preventive:
    - Expand context to adjacent topics
    - Include instructional content sources
    - Search for forum discussions, not just reviews
  reactive:
    - Dynamic expansion triggers automatically
    - No upper limit on quote collection
    - Continue until saturation, not arbitrary number

detection:
  - Real-time quote counter in Layer 1
  - Alert if pace suggests < 1000 by completion
```

#### Risk 2: Tool Access Failures

```yaml
risk: Primary scraping tools fail or rate-limit
probability: MEDIUM-HIGH (common with aggressive scraping)
impact: MEDIUM (delays but fallbacks exist)

mitigation:
  preventive:
    - Multiple tool fallback chain (Firecrawl → Apify → Perplexity)
    - Rate limiting awareness in scraping patterns
    - Session persistence for interruption recovery
  reactive:
    - Automatic tool switching on failure
    - Queue failed sources for retry
    - Continue with alternative sources

detection:
  - Log all tool failures
  - Track success rate per tool
  - Alert if > 30% failure rate
```

#### Risk 3: Cluster Ambiguity Not Resolved

```yaml
risk: Pain/hope patterns remain clustered and undifferentiated
probability: MEDIUM (depends on market complexity)
impact: HIGH (downstream messaging lacks precision)

mitigation:
  preventive:
    - Saturation analysis includes cluster detection
    - Forced expansion when clusters detected
    - Specific queries to differentiate clusters
  reactive:
    - Document the cluster as "potentially same phenomenon"
    - Include both interpretations in analysis
    - Flag for human validation

detection:
  - Automated cluster analysis in saturation check
  - Manual review of top patterns
```

#### Risk 4: Competitor Mechanism Overlap

```yaml
risk: New mechanism accidentally copies competitor
probability: LOW (if exclusion registry used properly)
impact: HIGH (legal and positioning risk)

mitigation:
  preventive:
    - Explicit NAME + ARTICULATION documentation
    - Exclusion registry in FINAL_HANDOFF.md
    - "Avoid" notes on every competitor mechanism
  reactive:
    - Mechanism creation agent validates against registry
    - Human review before mechanism finalization

detection:
  - Similarity check in mechanism creation agent
  - Pattern matching on exclusion registry
```

#### Risk 5: Market Sophistication Misjudgment

```yaml
risk: Incorrectly diagnose market sophistication stage
probability: MEDIUM (requires interpretation)
impact: HIGH (wrong lead strategy - Promise vs Mechanism vs Experience)

mitigation:
  preventive:
    - Promise Exposure Analyzer with explicit criteria
    - Multiple data points for stage diagnosis
    - Document reasoning for stage selection
  reactive:
    - Flag low-confidence stage diagnoses
    - Provide alternative strategies for adjacent stages
    - Human validation at checkpoint

detection:
  - Confidence score on stage diagnosis
  - Check for contradictory evidence
```

#### Risk 6: Villain Data Insufficient

```yaml
risk: Not enough "what they hate" data about competitors
probability: MEDIUM (requires specific searches)
impact: MEDIUM (limits contrast positioning)

mitigation:
  preventive:
    - Explicit villain extraction in Layer 2
    - Search for negative reviews, complaints, returns
    - Include "disappointed", "waste of money" queries
  reactive:
    - Expand to marketplace 1-3 star reviews
    - Search YouTube comments on competitor videos
    - Forum threads about competitor problems

detection:
  - Minimum 75 villain quotes threshold (aligned with Gate 1 HARD BLOCKER #7)
  - Alert if < 75 by Layer 2 completion
```

---

## Section 2: Context Expansion Requirements

### 2.1 The Context Expansion Mandate

Before ANY scraping or source discovery, the system MUST expand the product/market context into a comprehensive research scope.

**Purpose:** Prevent narrow research that misses critical market psychology.

### 2.2 Expansion Output Requirements

| Component | Minimum | Description |
|-----------|---------|-------------|
| Primary Research Topics | 10+ | Core topics the market discusses |
| Category-Specific Topics | 5+ | Topics unique to this product category |
| Competitor Context Topics | 5+ | Competitor-related research angles |
| Emotional/Psychological Topics | 5+ | Fear, frustration, hope, identity topics |
| Source Type Calibration | 6+ types | Platform/source types to cover |

### 2.3 Market Configuration Integration

During context expansion, the system must:

1. **Adapt terminology** to the market (e.g., "golfers" → "traders" → "practitioners")
2. **Identify market-specific platforms** (Reddit vs. specialized forums vs. Facebook groups)
3. **Calibrate aspect categories** for the market (functional, outcome, experience, social, emotional)
4. **Map the competitive landscape** (who are the key players, what are they saying)

### 2.4 Context Expansion Validation

The system SHALL NOT proceed to source discovery until:

- [ ] 10+ primary research topics identified
- [ ] 5+ category-specific topics identified
- [ ] 5+ competitor context topics identified
- [ ] Emotional/psychological dimension included
- [ ] 6+ source types calibrated
- [ ] Market terminology established

---

## Section 3: Evidence Volume & Structure Requirements

### 3.1 Minimum Quote Requirements

| Bucket | Minimum Quotes | Description |
|--------|----------------|-------------|
| **PAIN** | 300+ | Physical problems, frustrations, failures |
| **HOPE** | 250+ | Desires, aspirations, goals |
| **ROOT_CAUSE** | 200+ | Beliefs about WHY the problem exists |
| **SOLUTIONS_TRIED** | 150+ | What they've attempted, what failed |
| **COMPETITOR_MECHANISM** | 100+ | How competitors claim to solve it |
| **TOTAL** | **1,000+** | Across all buckets |

### 3.2 Bucket Definitions (Market-Agnostic)

**PAIN Bucket:**
- Physical manifestations of the problem
- Frustration expressions
- Failure descriptions
- Embarrassment and shame triggers
- Cost/loss expressions

**HOPE Bucket:**
- Desired outcomes
- Aspirational states
- "If only..." expressions
- Success fantasies
- Transformation goals

**ROOT_CAUSE Bucket:**
- What they believe causes the problem
- Attribution patterns
- "The reason is..." statements
- Blame assignments (self, external, circumstance)

**SOLUTIONS_TRIED Bucket:**
- Products/services attempted
- Methods/techniques tried
- Money spent
- Time invested
- Why they believe it failed

**COMPETITOR_MECHANISM Bucket:**
- How competitors claim their solution works
- Unique technologies/methods/systems
- Differentiating claims
- Proof elements used

### 3.3 Quote Quality Requirements

**Verbatim Standard:**
- All quotes MUST be exact verbatim - no paraphrasing
- Each quote MUST have source attribution
- Each quote MUST have context (thread, date, author if available)

**Quality Hierarchy:**

| Level | Description | Use For |
|-------|-------------|---------|
| Gold | Exact verbatim, verified source, high specificity | Primary evidence |
| Silver | Exact verbatim, verified source, moderate specificity | Supporting evidence |
| Bronze | Exact verbatim, unverified source | Context only |
| Invalid | Paraphrased or no source | DO NOT USE |

**Specificity Markers (add value):**
- Dollar amounts mentioned
- Time frames mentioned
- Product names mentioned
- Numbers/measurements mentioned
- Emotional intensity markers

### 3.4 Saturation Requirements

Research continues until saturation is achieved:

**Saturation Defined:**
- Same patterns appearing 5+ times from different sources
- New sources yielding <10% novel insights
- All research topics from context expansion covered

**Cluster Detection:**
If multiple pain points appear to cluster together, the system MUST:
1. Identify the cluster
2. Determine if it's one phenomenon or multiple
3. If ambiguous, expand search to differentiate
4. Document resolution

### 3.5 Numbered Quote System (MANDATORY)

**CRITICAL**: All quotes MUST be numbered for traceability. This is NOT optional.

```yaml
quote_numbering_system:
  purpose: Enable traceability from final handoff back to source

  numbering_format:
    PAIN: P-001, P-002, P-003... P-999
    HOPE: H-001, H-002, H-003... H-999
    ROOT_CAUSE: RC-001, RC-002, RC-003... RC-999
    SOLUTIONS_TRIED: ST-001, ST-002, ST-003... ST-999
    COMPETITOR_MECHANISM: CM-001, CM-002, CM-003... CM-999
    VILLAIN: V-001, V-002, V-003... V-999

  quote_record_structure:
    id: "[BUCKET]-[NUMBER]"
    text: "[VERBATIM quote - no cleaning, no paraphrasing]"
    source_url: "[full URL]"
    platform: "[Reddit/YouTube/Forum/Review/etc]"
    author: "[username if available]"
    date: "[date if available]"
    context: "[thread title or video title]"
    engagement: "[upvotes/likes/replies if available]"
    specificity_flags: ["dollar_amount", "product_name", "time_period", etc]

  traceability_requirements:
    - Every quote in Layer 2/3 analysis MUST reference quote ID
    - Every quote in pairs MUST include quote ID
    - Final handoff MUST preserve quote IDs
    - Downstream agents can trace any insight back to source quote

  validation:
    - IF quotes not numbered → Layer 1 INCOMPLETE, BLOCKED
    - IF Layer 2 analysis references unnumbered quote → INVALID
    - IF pair contains quote without ID → INVALID
```

### 3.6 Pair Extraction Requirement (MANDATORY)

**CRITICAL**: These pairs are REQUIRED Layer 1 outputs. Without them, Layer 1 is INCOMPLETE.

```yaml
pair_extraction:
  purpose: Connect pain states to desired outcomes for copywriting transformation arcs

  pain_hope_pairs:
    description: Match each significant pain quote to its corresponding hope/desire
    minimum_required: 25 matched pairs
    output_file: layer-1-outputs/pain_hope_pairs.json

    pair_structure:
      pair_id: "PH-001"
      pain_quote:
        id: "P-023"
        text: "[verbatim pain quote]"
        source: "[url]"
        subcategory: "[e.g., Primary Pain Type]"
      hope_quote:
        id: "H-017"
        text: "[verbatim hope quote]"
        source: "[url]"
        subcategory: "[e.g., Desired Outcome]"
      transformation_insight: "[What this pair reveals about the emotional journey]"
      copy_application: "[How copywriter can use this pair]"

    selection_criteria:
      - Pain and hope are DIRECTLY related (same problem/solution)
      - Both quotes have high specificity and emotion
      - Pair reveals clear transformation arc
      - Prioritize pairs with specific details (numbers, timeframes, products)

  why_how_pairs:
    description: Match "why it hurts" (root cause beliefs) to "how it works" (mechanism beliefs)
    minimum_required: 25 matched pairs
    output_file: layer-1-outputs/why_how_pairs.json

    pair_structure:
      pair_id: "WH-001"
      why_quote:
        id: "RC-012"
        text: "[verbatim root cause quote - what they BELIEVE causes the problem]"
        source: "[url]"
        belief_type: "[Technique/Equipment/Mental/Physical/Knowledge]"
      how_quote:
        id: "ST-008"
        text: "[verbatim solutions tried quote - what they've TRIED based on that belief]"
        source: "[url]"
        solution_type: "[Technique Change/Equipment Change/Mental Approach/Lessons/Practice]"
      mechanism_insight: "[What this pair reveals about prospect belief structure]"
      messaging_opportunity: "[How to align with or challenge this belief]"

    selection_criteria:
      - Why and How are CAUSALLY linked (belief led to action)
      - Reveals prospect's mental model of the problem
      - Shows failed solutions that validate new approach
      - Prioritize pairs that reveal common misconceptions

  final_handoff_location:
    pain_hope_pairs: "Layer 1 Section 1.8: Pain → Hope Transformation Pairs"
    why_how_pairs: "Layer 1 Section 1.9: Why It Hurts → How It Works Pairs"

  validation:
    - IF pain_hope_pairs < 25 → Layer 1 BLOCKED
    - IF why_how_pairs < 25 → Layer 1 BLOCKED
    - IF pairs not in final handoff → Final handoff INVALID
```

### 3.7 Top 25 Requirement (ALL 6 BUCKETS)

**CRITICAL**: Top 25 extraction applies to ALL 6 buckets, not just PAIN and HOPE.

For each subcategory with 25+ quotes in ANY bucket:
- Extract the TOP 25 most specific, emotionally rich, and usable quotes
- These become the "copywriting ammunition" for the marketing team
- Selection criteria: Specificity > Emotion > Length > Engagement

**Quote Threshold Rules (applies to ALL buckets):**
- If subcategory has 25+ quotes: MUST include Top 25 verbatim
- If subcategory has 15-24 quotes: Include Top 15 verbatim
- If subcategory has 10-14 quotes: Include Top 10 verbatim
- If subcategory has <10 quotes: Include ALL quotes

**Priority Flag Integration:**
- GOLD quotes (academic/research, product testimonials, mechanism validation) MUST appear in Top 5
- HIGH quotes (specific, quotable, emotional) fill remaining top slots
- STANDARD quotes (supporting evidence) complete the list

**Two-Tier Categorization Required:**
Every quote in Top 25 must include:
1. Primary subcategory (Physical Problem / Belief Category / Solution Type)
2. Secondary emotional tags (1-3 tags: anxiety, frustration, hope, validation, etc.)
3. Priority flag (GOLD / HIGH / STANDARD)

### 3.8 Bucket Section Template (MANDATORY - CONSISTENT DEPTH)

**CRITICAL**: All 6 bucket sections in FINAL_HANDOFF.md MUST use the identical template structure.

**Template Reference:** [[BUCKET_SECTION_TEMPLATE]]

```yaml
bucket_section_requirements:
  purpose: Ensure copywriter can answer any question about any bucket with equal depth

  mandatory_structure_per_bucket:
    1. Bucket Overview (5+ lines):
       - Total quotes count
       - PRD minimum
       - Compliance percentage
       - "What This Bucket Answers" statement

    2. Two-Tier Subcategory Breakdown Table:
       - Primary subcategory (Physical Problem / Belief Category / Solution Type)
       - Mention count
       - Emotional breakdown (tag: count, tag: count)
       - Percentage of bucket

    3. Subcategory Deep-Dives (minimum 3 per bucket):
       - Contextual label and description
       - Why This Matters statement
       - Emotional breakdown with percentages
       - Top 25 verbatim quotes (or Top N if <25 exist)
       - Copy Note for each subcategory

    4. Summary Table:
       - Bucket-specific summary format
       - #1 identification with mention count
       - #1 copy opportunity statement

  minimum_section_length: 80 lines per bucket

  two_tier_categorization:
    description: Every quote must have BOTH tiers assigned
    primary_tier: What PHYSICAL PROBLEM or MECHANISM does this describe?
    secondary_tier: What EMOTIONAL IMPACT does this cause? (1-3 tags)

  priority_flagging:
    GOLD: Academic/research validation, product testimonials, mechanism validation
    HIGH: Specific, quotable, emotional
    STANDARD: Supporting evidence

  gold_quote_rules:
    - GOLD quotes MUST appear in Top 5 of their subcategory
    - If a subcategory has 0 GOLD quotes, it cannot be the #1 subcategory
    - GOLD quotes drive credibility - prioritize accordingly

enforcement_rules:
  - No summary-only sections allowed
  - Every bucket gets identical template treatment
  - Top 25 threshold applies to ALL 6 buckets
  - Validation checklist must pass before bucket section is complete

bucket_specific_labels:
  PAIN:
    subcategory_type: "Physical Problem (Primary)"
    contextual_label: "Physical Problem:"
    summary_header: "Pain Points by Severity"
    metric_label: "PAIN POINT"

  HOPE:
    subcategory_type: "Product Outcome (Primary)"
    contextual_label: "Product Outcome:"
    summary_header: "Desired Outcomes by Frequency"
    metric_label: "HOPE"

  ROOT_CAUSE:
    subcategory_type: "Belief Category (Primary)"
    contextual_label: "Core Belief:"
    summary_header: "What They Believe → What's Actually True"
    metric_label: "ROOT CAUSE BELIEF"

  SOLUTIONS_TRIED:
    subcategory_type: "Solution Category (Primary)"
    contextual_label: "Solutions Tried:"
    summary_header: "What They've Exhausted"
    metric_label: "SOLUTION TRIED"

  COMPETITOR_MECHANISMS:
    subcategory_type: "Competitor (Primary)"
    contextual_label: "Mechanism:"
    summary_header: "Competitor Claims vs Reality"
    metric_label: "COMPETITOR WEAKNESS"

  VILLAIN:
    subcategory_type: "Villain Type (Primary)"
    contextual_label: "Villain:"
    summary_header: "Villains to Attack"
    metric_label: "VILLAIN"
```

**WHY THIS EXISTS**: Previous research had PAIN with 200+ lines and ROOT_CAUSE with 10 lines. A copywriter asking "What's the #1 root cause belief?" deserves the same depth as "What's the #1 pain point?" This template ensures consistent, usable depth across ALL buckets.

---

## Section 4: Layer Requirements

### 4.1 Layer 1: Infrastructure (Data Collection)

**Purpose:** Build the raw evidence foundation.

**Checklist A - Layer 1 Completion:**

- [ ] Context expansion complete (Section 2 requirements met)
- [ ] 50+ queries generated across all research topics
- [ ] 100+ potential sources identified
- [ ] 50+ sources passed quality threshold
- [ ] All scrapers executed (with resilience protocol)
- [ ] 1,000+ quotes extracted
- [ ] All bucket minimums met (Section 3.1)
- [ ] **All quotes numbered with IDs (P-XXX, H-XXX, RC-XXX, ST-XXX, CM-XXX, V-XXX)**
- [ ] **Two-tier categorization: Primary subcategory + Emotional tags for ALL quotes**
- [ ] **Priority flags assigned: GOLD / HIGH / STANDARD for ALL quotes**
- [ ] **Pain → Hope pairs >= 25 extracted**
- [ ] **Why It Hurts → How It Works pairs >= 25 extracted**
- [ ] **Villain data >= 50 data points**
- [ ] Saturation achieved or documented
- [ ] No unresolved cluster ambiguity
- [ ] Competitor analysis complete (5+ competitors with root cause + mechanism)
- [ ] Mechanisms >= 15 mapped with NAME + ARTICULATION format

**Layer 1 CANNOT be passed if any checkbox is unchecked.**

**Layer 1 Output Structure:**

```markdown
# LAYER 1: QUANTIFIED SOURCE EXTRACTION

## 1.1 PAIN QUOTES (Physical Problems)
### Category: [SUBCATEGORY NAME]
**Total Mentions:** [X]

**Top 25 Verbatim Quotes:**
1. [P-001] "[Quote]" - [Source]
2. [P-002] "[Quote]" - [Source]
...
25. [P-025] "[Quote]" - [Source]

[Repeat for each subcategory]

## 1.2 HOPE QUOTES (Desires)
[Same structure with H-XXX IDs]

## 1.3 ROOT CAUSE BELIEFS (Why It Hurts)
[Same structure with RC-XXX IDs]

## 1.4 SOLUTIONS TRIED (How It Works)
[Same structure with ST-XXX IDs]

## 1.5 COMPETITOR ROOT CAUSE ANALYSIS
[Table format with all competitors]

## 1.6 COMPETITOR MECHANISM MAPPING
| Competitor | NAME | ARTICULATION | Causal Chain | AVOID |
|------------|------|--------------|--------------|-------|
| [Brand] | [Proprietary name] | [How they explain it] | [Step logic] | [What to exclude] |

## 1.7 VILLAIN DATA
**Total Villain Data Points:** [X] (minimum 50)
### Hated Features
[V-001] "[Quote]" - [Source] → Contrast: [Opportunity]
...
### Hated Products
...
### Hated Messaging
...
### Hated Experiences
...

## 1.8 PAIN → HOPE TRANSFORMATION PAIRS (Top 25)
| Pair ID | Pain Quote (ID) | Hope Quote (ID) | Transformation Insight |
|---------|-----------------|-----------------|------------------------|
| PH-001 | [P-023] "..." | [H-017] "..." | [Insight] |
| PH-002 | [P-045] "..." | [H-032] "..." | [Insight] |
...

## 1.9 WHY IT HURTS → HOW IT WORKS PAIRS (Top 25)
| Pair ID | Root Cause Quote (ID) | Solution Tried Quote (ID) | Mechanism Insight |
|---------|----------------------|---------------------------|-------------------|
| WH-001 | [RC-012] "..." | [ST-008] "..." | [Insight] |
| WH-002 | [RC-034] "..." | [ST-021] "..." | [Insight] |
...

## 1.10 LAYER 1 QUANTIFICATION SUMMARY
| Bucket | PRD Minimum | Actual Count | Status |
|--------|-------------|--------------|--------|
| PAIN | 300 | [X] | ✓/✗ |
| HOPE | 250 | [X] | ✓/✗ |
| ROOT_CAUSE | 200 | [X] | ✓/✗ |
| SOLUTIONS_TRIED | 150 | [X] | ✓/✗ |
| COMPETITOR_MECHANISMS | 15 | [X] | ✓/✗ |
| VILLAIN_DATA | 50 | [X] | ✓/✗ |
| PAIN_HOPE_PAIRS | 25 | [X] | ✓/✗ |
| WHY_HOW_PAIRS | 25 | [X] | ✓/✗ |
| **TOTAL QUOTES** | **1000** | **[X]** | **✓/✗** |
```

### 4.2 Layer 2: Intelligence (Analysis & Synthesis)

**Purpose:** Transform raw data into actionable intelligence.

**Required Outputs:**

1. **Competitive Landscape Analysis**
   - 3 tiers: Primary, Secondary, Tertiary competitors
   - Each with: positioning, mechanism, root cause claim, weakness

2. **Target Customer Profile**
   - Demographics (age, income, location patterns)
   - Psychographics (values, beliefs, worldview)
   - Emotional State (current fears, frustrations, hopes)

3. **Customer Journey Map**
   - 4 stages minimum
   - Entry points per stage
   - Intervention opportunities

4. **Messaging Framework**
   - Core narrative
   - Hierarchy of claims
   - Supporting proof structure

5. **Voice of Customer Analysis**
   - Language DO's (use these exact phrases)
   - Language DON'Ts (avoid these terms)
   - Emotional resonance patterns

6. **Objection Handling**
   - 4+ objections identified
   - Counter for each
   - Evidence supporting counter

7. **Testimonial Templates**
   - 3+ templates based on actual language patterns
   - Before/after structure
   - Specificity markers included

**E5 Method Requirements (Layer 2):**

| E5 Tool | Output Required | Validation |
|---------|-----------------|------------|
| WEB Analysis | Wants, Emotions, Beliefs documented | All 3 categories populated |
| Belief Excavator | WHY, WHAT, WHO, HOW beliefs | 4 categories populated |
| Promise Exposure | Market Sophistication Stage (1-5) | Stage + evidence documented |
| Now-After Grid | Have, Experience, Status, Feeling | 4 quadrants populated |
| Ideal Client Outcome | Best success story constructed | Primary transformation stated |
| Magic Wand | Blue-sky desires extracted | 5+ specific desires documented |
| Benefit Dimensionalizer | Functional → Dimensionalized → Emotional | Complete chain documented |
| Villain Extraction | Hated features, products, messaging | Inventory populated |
| Competitor Offer Analysis | Deliverables, price, guarantee, bonuses | Per-competitor documentation |
| Mechanism Mapper | NAME + ARTICULATION format | 15+ mechanisms mapped |

**Checklist C - Layer 2 Completion:**

- [ ] Competitive landscape (3 tiers)
- [ ] Customer profile (demo + psycho + emotional)
- [ ] Journey map (4 stages)
- [ ] Messaging framework (narrative + hierarchy)
- [ ] Voice of customer (DO's + DON'Ts)
- [ ] Objections (4+ with counters)
- [ ] Testimonial templates (3+)
- [ ] WEB Analysis complete
- [ ] Belief inventory complete (4 categories)
- [ ] Market Sophistication diagnosed
- [ ] Now-After Grid complete (4 quadrants)
- [ ] Ideal Client Outcome constructed
- [ ] Magic Wand desires extracted
- [ ] Benefits dimensionalized
- [ ] Villain inventory populated
- [ ] Competitor offers analyzed
- [ ] Mechanisms mapped (15+)

### 4.2.5 Layer 2.5: Synthesis (MANDATORY)

**Purpose:** Transform raw analytical data from Layer 2 into copy-ready narrative artifacts.
All synthesis happens in this layer — Final Handoff is assembly only.

**CRITICAL DEPTH REQUIREMENT:** Layer 2.5 skills MUST analyze ALL 1000+ quotes for patterns,
THEN select top pairs. The correct process is: comprehensive scan → pattern identification →
top selection. Never "find 25 and stop."

**Required Outputs:**

1. **Transformation Pairs** (`transformation_pairs.md`)
   - Minimum 25 Pain→Hope pairs (target 35+)
   - Each pair: verbatim pain quote + verbatim hope quote + bridge insight
   - Priority tagged: GOLD / SILVER / BRONZE
   - All quotes traced to source IDs
   - Format: blockquote lines (`> "quote" — Source [ID] [PRIORITY] [tags]`)

2. **Educational Pairs** (`educational_pairs.md`)
   - Minimum 25 Why→How pairs
   - Each pair: why-it-fails quote + how-to-fix quote + educational frame
   - Traced to specific market misconceptions
   - Educational frames are mechanism-ready

3. **WEB Synthesis** (`web_synthesis.md`)
   - Wants, Emotions, Beliefs — each category populated
   - Subdivided by Vic Schwab dimensions: GAIN / BE / DO / SAVE / AVOID
   - Minimum 5 entries per major category
   - All entries backed by verbatim quote evidence

4. **Transformation Grid** (`transformation_grid.md`)
   - 4-dimension Now→After grid: HAVE / EXPERIENCE / STATUS / FEELING
   - Each dimension has both "Now" state AND "After" state
   - All cells populated with verbatim quote evidence
   - Contrast is specific and dramatic (not generic platitudes)

5. **Language Patterns** (`language_patterns.md`)
   - Minimum 10 "gold phrases" (highest emotional resonance)
   - Recurring patterns (language appearing 3+ times across sources)
   - Prospect-generated metaphors and analogies
   - Intensity markers catalog
   - DO/DON'T vocabulary guide
   - All phrases VERBATIM with source ID and frequency count

6. **Final Categorization** (`final_categorization.md`)
   - TWO-TIER tagging for ALL 1000+ quotes (no exceptions):
     - Physical tag: primary bucket (pain/hope/root_cause/solutions_tried/transformation/objection)
     - Emotional tags: 1-3 emotional descriptors per quote
   - Tallies by category and sub-category
   - Cross-reference index (quotes in multiple emotional contexts)
   - Output quote count MUST match input quote count exactly

7. **Synthesis Validation** (`SYNTHESIS_VALIDATION.md`)
   - Summary statistics (pair counts, quote counts, coverage percentages)
   - Sample pairs from each synthesis category (top 5 per)
   - Category tallies with percentages
   - Gap analysis (empty categories, thin areas)
   - Confidence assessment per artifact
   - Human-reviewable format (this IS the human checkpoint document)

**Acceptance Criteria:**

| Artifact | Minimum Threshold | Quality Standard |
|----------|-------------------|------------------|
| Transformation Pairs | 25+ pairs | All have both quotes with IDs, bridge non-obvious |
| Educational Pairs | 25+ pairs | Each traces to market misconception |
| WEB Synthesis | 15+ entries total | All 3 categories + 5 subdivisions populated |
| Transformation Grid | 4 dimensions | All have Now + After with quotes |
| Language Patterns | 10+ gold phrases | All verbatim with source IDs |
| Final Categorization | 100% quote coverage | Two-tier tags on every quote |
| Synthesis Validation | Complete | All sections present, tallies accurate |

**Checklist C.5 - Layer 2.5 Completion:**

- [ ] Transformation pairs produced (25+ minimum)
- [ ] Educational pairs produced (25+ minimum)
- [ ] WEB synthesis complete (all categories + subdivisions)
- [ ] Transformation grid complete (all 4 dimensions)
- [ ] Language patterns extracted (10+ gold phrases)
- [ ] Final categorization complete (100% quote coverage)
- [ ] Synthesis validation document generated
- [ ] All pairs have verbatim quotes with source IDs
- [ ] All tallies are mathematically accurate
- [ ] No paraphrased or summarized quotes (verbatim only)
- [ ] Human checkpoint APPROVED (SYNTHESIS_VALIDATION.md reviewed)

**Gate 2.5 → Layer 2.8-RSF:**

```
HARD BLOCKERS (Gate 2.5 — Layer 2.5 → Layer 2.8-RSF):
1. Transformation pairs < 25 → BLOCKED.
2. Educational pairs < 25 → BLOCKED.
3. Any WEB category empty → BLOCKED.
4. Any transformation grid dimension missing → BLOCKED.
5. Gold phrases < 10 → BLOCKED.
6. Final categorization quote count ≠ input quote count → BLOCKED.
7. Human checkpoint not APPROVED → BLOCKED.
8. Any Layer 2.5 artifact file missing → BLOCKED.
```

**Human Checkpoint 2.5 (BLOCKING):**

The human MUST review SYNTHESIS_VALIDATION.md before Layer 3 can begin.
This checkpoint CANNOT be auto-approved. The agent MUST wait for explicit
human response (APPROVE / REVISE / REJECT).

### 4.2.8 Layer 2.8-RSF: Resonant Surprise Framework (MANDATORY)

**Purpose:** Map audience expectation schemas and latent resonance fields to enable
schema distance calibration and FSSIT-first Big Idea generation in downstream creative skills.

**Reference:** [[roadmap/RESONANT-SURPRISE-FRAMEWORK-OVERVIEW]]
**Sub-skills:** [[skills/layer-2-rsf/2.8-A-expectation-schema-mapper.md]], [[skills/layer-2-rsf/2.8-B-latent-resonance-identifier.md]]

**Input Requirements (ALL must exist before RSF executes):**
- All Layer 2 outputs (competitor_claims.json, market_intelligence.md, market_sophistication.json, belief_inventory.json, now_after_grid.json)
- All Layer 2.5 outputs (transformation_pairs.md required by 2.8-B)
- layer-1-outputs/quantified_buckets.json
- market_config.yaml
- Human checkpoint 2.5 = APPROVED

**Output Requirements:**

1. `layer-2-rsf-outputs/expectation_schema.json` — Audience messaging expectations map
   - total_patterns_mapped ≥ 15
   - saturated_claims ≥ 5 (each with staleness score 1-10)
   - exhausted_metaphors ≥ 3
   - whitespace_zones ≥ 3 (messaging territory with no/low competitor presence)
   - schema_violation_opportunities ≥ 5
   - schema_summary: non-empty narrative summary

2. `layer-2-rsf-outputs/latent_resonance_field.json` — Latent emotional landscape map
   - expressed_vs_latent_gaps ≥ 3
   - unnamed_emotions ≥ 2
   - identity_tensions ≥ 2
   - fssit_candidates ≥ 5 (each with recognition_strength ≥ 6)
   - resonance_summary: non-empty narrative summary

**Gate 2.8 — Layer 2.8-RSF → Layer 3:**

```
HARD BLOCKERS (Gate 2.8 — RSF → Layer 3):
1. expectation_schema.json missing → BLOCKED (unless human RSF skip approved).
2. expectation_schema total_patterns_mapped < 15 → BLOCKED.
3. expectation_schema whitespace_zones < 3 → BLOCKED.
4. latent_resonance_field.json missing → BLOCKED (unless human RSF skip approved).
5. latent_resonance_field expressed_vs_latent_gaps < 3 → BLOCKED.
6. latent_resonance_field fssit_candidates < 5 → BLOCKED.
7. latent_resonance_field identity_tensions < 2 → BLOCKED.
8. Human RSF skip NOT approved AND any of above fails → BLOCKED.
```

**Human RSF Override:**

The human MAY approve an RSF skip if dependencies are missing or RSF execution fails.
When RSF is skipped:
- `rsf_skip_approved: true` is set in context.yaml
- All downstream skills receive `rsf_inputs_available: false`
- 06-big-idea activates degradation protocol (derives FSSIT-equivalent candidates from research data)
- Quality degradation is expected and documented in output metadata

**Downstream Consumers:**
- 03-root-cause: Uses expectation schemas for framing reference (optional enhancement)
- 04-mechanism: Uses whitespace zones for naming whitespace check (optional enhancement)
- 05-promise: Uses FSSIT candidates for emotional frame alignment (optional enhancement)
- 06-big-idea: Uses FSSIT candidates + expectation schemas (REQUIRED — has degradation fallback)

### 4.3 Layer 3: Opportunity Surfacing & Strategic Intelligence

**Purpose:** Surface strategic opportunities from validated research data. Layer 3 produces
strategic intelligence that a downstream creative system can consume. It does NOT generate
Big Ideas, mechanisms, copy briefs, or creative assets.

**Architecture Note:** The research pipeline ends at FINAL_HANDOFF.md — a comprehensive
intelligence package. Creative generation belongs in a separate downstream system.

**Required Outputs:**

1. **Ranked Opportunities** (from 3.1-A Opportunity Scorer)
   - Minimum 5 opportunities scored
   - 6-component weighted composite score per opportunity:
     - Market Demand (0.25), Emotional Intensity (0.20), Competitive Gap (0.20)
     - Evidence Strength (0.15), Transformation Potential (0.10), Urgency Signals (0.10)
   - 3-tier classification:
     - TIER 1 (PRIMARY): Score 80+ — Lead opportunities
     - TIER 2 (SECONDARY): Score 60-79 — Supporting angles
     - TIER 3 (TERTIARY): Score 40-59 — Future exploration
   - At least 1 Tier 1 opportunity required
   - All scores traceable to source quotes with IDs

2. **Evidence Packages** (from 3.1-B Evidence Compiler)
   - Tiered depth by opportunity rank:
     - FULL PACKAGE (Tier 1): 15+ quotes, frequency data, emotional markers, cross-bucket corroboration
     - SUMMARY PACKAGE (Tier 2): 8-12 quotes, key frequency, primary emotional drivers
     - MINIMAL PACKAGE (Tier 3): 3-5 representative quotes, basic count
   - All quote IDs valid and traceable
   - No fabricated or paraphrased quotes

3. **Objection Responses** (from 3.1-C Proactive Objection Handler)
   - CPT (Claim-Proof-Turnaround) format across 8 categories:
     - SKEPTICISM, PRIOR_FAILURE, COST_CONCERN, TIME_CONCERN
     - COMPLEXITY, TRUST, COMPARISON, RELEVANCE
   - Each response includes:
     - Objection (verbatim from research where possible)
     - Claim: Direct counter-statement
     - Proof: Quote evidence with IDs supporting the claim
     - Turnaround: Reframe transforming objection into benefit
   - 8 handling types per objection:
     - Acknowledge, Reframe, Evidence, Story, Logic, Contrast, Future-Pace, Bridge
   - Minimum 3 distinct objection variants per category

4. **Risk Assessment** (from 3.3-A Risk Assessor)
   - 5 risk categories per Tier 1 opportunity:
     - MARKET RISK, COMPETITIVE RISK, EXECUTION RISK, MESSAGING RISK, TIMING RISK
   - Each risk scored: Likelihood (1-5) × Impact (1-5)
   - Specific actionable mitigation per risk
   - Overall risk profile per opportunity

5. **Action Sequence** (from 3.3-B Action Sequencer)
   - 3-phase timeline per Tier 1 opportunity:
     - PHASE 1 — IMMEDIATE (0-2 weeks): Quick wins, validation steps
     - PHASE 2 — SHORT-TERM (2-6 weeks): Primary execution, campaign launch
     - PHASE 3 — MEDIUM-TERM (6-12 weeks): Optimization, expansion
   - 6 action types per phase:
     - RESEARCH, CREATE, TEST, LAUNCH, MEASURE, OPTIMIZE
   - Dependencies between actions identified
   - Risk mitigations integrated into timeline

6. **Measurement Framework** (from 3.3-C Measurement Definer)
   - Per Tier 1 opportunity:
     - LEADING INDICATORS: Early signals (engagement, CTR, opt-in)
     - LAGGING INDICATORS: Outcome metrics (conversion, revenue, retention)
     - DECISION TRIGGERS: Specific thresholds that trigger action
     - KILL CRITERIA: When to abandon an approach
     - BASELINE BENCHMARKS: Industry/historical reference points
   - All decision triggers have specific numeric thresholds
   - Kill criteria are unambiguous
   - Leading indicators measurable within Phase 1

7. **Opportunity Map** (from 3.4-A Opportunity Map Generator)
   - Unified strategic document synthesizing all Layer 3 outputs:
     - Opportunity landscape (visual hierarchy)
     - Tier 1 deep dives (score + evidence + risk + action + measurement)
     - Tier 2 briefs (condensed summaries)
     - Strategic recommendations (prioritized)
     - Cross-opportunity patterns
   - No new analysis — synthesis of existing Layer 3 outputs only

8. **FINAL_HANDOFF.md** (from 3.2-A Handoff Packager)
   - ASSEMBLY of all artifacts into single 300-500KB markdown file
   - 14 sections + appendices (see Section 5.2 for full structure)
   - All content traceable to source artifacts
   - No new analysis generated during assembly

**Checklist D - Layer 3 Completion:**

- [ ] 5+ opportunities scored with 6-component composite
- [ ] At least 1 Tier 1 (score 80+) opportunity identified
- [ ] All scores traceable to source quote IDs
- [ ] Evidence packages at correct tier depth (Full/Summary/Minimal)
- [ ] All evidence quotes are verbatim with valid IDs
- [ ] CPT objection responses across all 8 categories
- [ ] 3+ objection variants per category
- [ ] All proof elements cite real quote IDs
- [ ] 5-category risk assessment for all Tier 1 opportunities
- [ ] All mitigations specific and actionable
- [ ] 3-phase action sequence for Tier 1 opportunities
- [ ] Dependencies between actions identified
- [ ] Measurement framework with numeric thresholds
- [ ] Kill criteria unambiguous for each Tier 1 opportunity
- [ ] Opportunity map synthesizes all Layer 3 outputs
- [ ] FINAL_HANDOFF.md assembled (300-500KB)
- [ ] FINAL_HANDOFF.md has all 14 sections populated
- [ ] NO new analysis generated — assembly only

---

## Section 5: Final Output Requirements

### 5.1 Single Deliverable Mandate (ASSEMBLY)

The final deliverable is ONE markdown file: **FINAL_HANDOFF.md**

This file MUST contain ALL content from all layers - no separate files, no "see attached," no references to other documents.

**CRITICAL:** Final Handoff is an ASSEMBLY operation. All synthesis was completed in Layer 2.5.
The handoff process FORMATS and COMBINES pre-validated artifacts. It does NOT:
- Generate new analysis
- Create new insights
- Re-interpret data
- Fill gaps with generated content
- Synthesize across layers (that happened in Layer 2.5)

If any content is missing during assembly, the process HALTS and returns to the
originating skill — it does NOT attempt to generate the missing content inline.

### 5.2 FINAL_HANDOFF.md Structure

```markdown
# [PROJECT NAME] - Deep Research Handoff
## Research Complete: [Date]

---

## EXECUTIVE SUMMARY

### Research at a Glance
| Metric | Value |
|--------|-------|
| Total Quotes | [N] |
| Sources Scraped | [N] |
| Competitors Analyzed | [N] |
| Mechanisms Mapped | [N] |
| Opportunities Identified | [N] |

### Core Thesis
[1-2 paragraph summary of the single most important finding]

### Single Biggest Opportunity
[The #1 opportunity with brief rationale]

---

## LAYER 1: QUANTIFIED SOURCE EXTRACTION

### Pain Quotes
**Total: [N] quotes**

#### [Subcategory 1]: [N] mentions ([%])
[Top 25 verbatim quotes with sources]

#### [Subcategory 2]: [N] mentions ([%])
[Top 25 verbatim quotes with sources]

[Continue for all subcategories]

### Hope Quotes
**Total: [N] quotes**
[Same structure as Pain]

### Root Cause Quotes
**Total: [N] quotes**
[Same structure]

### Solutions Tried Quotes
**Total: [N] quotes**
[Same structure]

### Competitor Root Cause Analysis
[Per-competitor documentation]

### Competitor Mechanism Mapping
[NAME + ARTICULATION format for each]

### Layer 1 Quantification Summary
[Tally of all buckets with percentages]

---

## LAYER 2: MARKET INTELLIGENCE ANALYSIS

### Competitive Landscape
[3 tiers with full analysis]

### Target Customer Profile
[Demographics + Psychographics + Emotional State]

### Customer Journey Map
[4 stages with intervention points]

### Messaging Framework
[Core narrative + hierarchy]

### Voice of Customer Analysis
[DO's and DON'Ts with examples]

### Objection Handling
[4+ objections with counters]

### Testimonial Templates
[3+ templates with examples]

### E5 Analysis Package
[All E5 tool outputs]

---

## LAYER 2.5: SYNTHESIS ARTIFACTS

### Transformation Pairs
**Total: [N] pairs**
[All Pain→Hope pairs with verbatim quotes, IDs, priority tags, bridge insights]

### Educational Pairs
**Total: [N] pairs**
[All Why→How pairs with verbatim quotes, IDs, educational frames]

### WEB Synthesis
[Wants / Emotions / Beliefs — subdivided by GAIN/BE/DO/SAVE/AVOID]
[All entries with verbatim quote evidence]

### Transformation Grid
| Dimension | NOW State | AFTER State |
|-----------|-----------|-------------|
| HAVE | [with quotes] | [with quotes] |
| EXPERIENCE | [with quotes] | [with quotes] |
| STATUS | [with quotes] | [with quotes] |
| FEELING | [with quotes] | [with quotes] |

### Language Patterns
**Gold Phrases: [N]**
[All gold phrases with source IDs and frequency counts]
[Recurring patterns, metaphors, intensity markers]
[DO/DON'T vocabulary guide]

### Full Categorization
**Total Quotes Tagged: [N]**
[Category tallies with subcategories and percentages]
[Cross-reference index]

---

## LAYER 3: OPPORTUNITY SURFACING & STRATEGIC INTELLIGENCE

### Opportunity Map
[Visual hierarchy of all scored opportunities by tier]

| Rank | Opportunity | Composite Score | Tier | Market Demand | Emotional Intensity | Competitive Gap |
|------|------------|----------------|------|---------------|--------------------|----|
| 1 | [Name] | [Score] | TIER 1 | [0.XX] | [0.XX] | [0.XX] |
| ... | ... | ... | ... | ... | ... | ... |

### [Tier 1 Opportunity 1]: [Name]
**Score:** [Composite] | **Tier:** PRIMARY

#### Evidence Package
[15+ supporting quotes with IDs, frequency data, emotional markers]

#### Objection Playbook
| Category | Objection | Claim | Proof | Turnaround |
|----------|-----------|-------|-------|------------|
| SKEPTICISM | [verbatim] | [counter] | [quote ID] | [reframe] |
| ... | ... | ... | ... | ... |

#### Risk Profile
| Category | Likelihood | Impact | Composite | Mitigation |
|----------|-----------|--------|-----------|------------|
| MARKET | [1-5] | [1-5] | [L×I] | [specific action] |
| COMPETITIVE | ... | ... | ... | ... |
| EXECUTION | ... | ... | ... | ... |
| MESSAGING | ... | ... | ... | ... |
| TIMING | ... | ... | ... | ... |

#### Action Sequence
**Phase 1 — Immediate (0-2 weeks):**
[Actions by type: RESEARCH, CREATE, TEST, LAUNCH, MEASURE, OPTIMIZE]

**Phase 2 — Short-term (2-6 weeks):**
[Actions by type]

**Phase 3 — Medium-term (6-12 weeks):**
[Actions by type]

#### Measurement Framework
- **Leading Indicators:** [with thresholds]
- **Lagging Indicators:** [with targets]
- **Decision Triggers:** [specific numeric thresholds]
- **Kill Criteria:** [unambiguous conditions]

[Repeat full deep dive for all Tier 1 opportunities]

### Tier 2 Opportunities (Briefs)
[Condensed summaries for each Tier 2 opportunity]

### Cross-Opportunity Patterns
[Themes spanning multiple opportunities]

### Strategic Recommendations
[Prioritized next steps across all opportunities]

---

## APPENDICES

### Source Inventory
[All scraped sources with URLs and metadata]

### Artifact Manifest
[All intermediate files produced during research]

### Research Methodology
[E5 framework, WEB framework, scoring methodology]

### Competitor Analysis Detail
[Full competitor mechanism and offer analysis]

---

*Generated by Deep Research System v3*
*Methodology: Todd Brown E5 Integration*
*Assembly Operation: All synthesis completed in Layer 2.5*
```

### 5.3 Checklist E - Final Output Validation

- [ ] Single markdown file
- [ ] Executive summary present
- [ ] All Layer 1 content included with tallies
- [ ] All Layer 2 content included
- [ ] All Layer 2.5 synthesis artifacts included:
  - [ ] Transformation pairs (25+ with IDs)
  - [ ] Educational pairs (25+ with IDs)
  - [ ] WEB synthesis (all categories populated)
  - [ ] Transformation grid (all 4 dimensions)
  - [ ] Language patterns (10+ gold phrases)
  - [ ] Full categorization (100% quote coverage)
- [ ] All Layer 3 content included
- [ ] Appendices present
- [ ] No external references (all content self-contained)
- [ ] All quotes are verbatim with sources
- [ ] All numbers are exact (no vague qualifiers)
- [ ] Assembly only — no new analysis generated during handoff
- [ ] All quote IDs preserved and traceable to source

---

## Section 6: Tool Resilience Protocol

### 6.1 Tool Fallback Chain

```
PRIMARY: Firecrawl
    ↓ (on failure)
FALLBACK 1: Apify (apify/rag-web-browser or specific actors)
    ↓ (on failure)
FALLBACK 2: Gemini (gemini-search or gemini-deep-research) OR Perplexity (perplexity_research)
    ↓ (on failure)
FALLBACK 3: Manual source list (LAST RESORT)
```

**Gemini vs. Perplexity Decision Logic:**
- Use **Gemini** (`gemini-deep-research`) when the task requires multi-step autonomous exploration, URL analysis, or reasoning about complex content
- Use **Perplexity** (`perplexity_research`) when the task is a straightforward factual search or topic overview
- If one fails, try the other before falling back to manual
- Both are available via MCP: `mcp__gemini__*` and `mcp__perplexity__*`

### 6.2 Platform-Specific Protocols

| Platform | Tool | Notes |
|----------|------|-------|
| Reddit | **Apify ONLY** | Firecrawl is blocked, will silently fail |
| YouTube | **Apify 3-step** | Video search → Transcripts → Comments |
| **Twitter/X** | **Apify ONLY** | Firecrawl hard-blocked on x.com. Use `apidojo/tweet-scraper` (primary) or `quacker/twitter-scraper` (fallback). Gemini reasoning fallback for complex threads. |
| Forums | Firecrawl primary | Apify fallback |
| Competitor sites | Firecrawl primary | Apify fallback |
| Social (IG/TikTok/FB) | **Apify ONLY** | Firecrawl cannot access |
| Ad Libraries | **Apify ONLY** | Facebook Ads Library actors |

### 6.3 Failure Response Protocol

**On Single Source Failure:**
1. Log failure with details
2. Add to fallback queue
3. Continue with other sources
4. DO NOT halt

**On Tool Failure:**
1. Log tool failure
2. Switch to next tool in fallback chain
3. Continue scraping
4. DO NOT halt, DO NOT ask human

**On Platform Block:**
1. Log block
2. Switch to equivalent sources
3. Continue without interruption
4. Example: Reddit blocked → niche forums, Quora, YouTube comments

**On Catastrophic Failure (>50% sources fail):**
1. Halt execution
2. Generate failure report
3. Present to human for intervention

---

## Section 7: Autonomous Execution Rules

### 7.1 The Autonomy Mandate

The system SHALL execute autonomously within these boundaries:

**Self-Expand When:**
- Quote minimums not met
- Bucket minimums not met
- Saturation not achieved
- Cluster ambiguity exists
- Research topic coverage incomplete

**Self-Validate At:**
- Each layer checkpoint
- Each gate crossing
- Before final output

**Pause For Human Only When:**
- Gate 0: Quality Benchmark Calibration (if reference examples needed)
- Gate 0.5: Product Type Verification (if ANY ambiguity exists)
- Checkpoint 1: Source list approval before expensive scraping
- Checkpoint 2: Layer 2 Sample Review (MANDATORY for complex projects)
- Checkpoint 3: Low-confidence items (<60%) flagged
- Error Recovery: Foundation contamination detected
- Catastrophic failure (>50% sources fail)
- Budget would be exceeded
- 3 expansion attempts fail for same criterion

### 7.2 Expansion Protocol

When any PRD requirement is not met:

```
1. IDENTIFY: Which criterion failed
2. DIAGNOSE: Which topics/buckets need expansion
3. GENERATE: Additional queries for underperforming areas
4. SCRAPE: Return to scraping for those areas
5. RE-VALIDATE: Check PRD requirements again
6. REPEAT: Until requirements met OR 3 attempts fail
7. ESCALATE: Only after 3 failed attempts
```

### 7.3 Budget Management

- Track estimated vs. actual spend
- Halt BEFORE exceeding budget
- Present options: increase budget OR reduce scope
- Never proceed without approval when budget at risk

---

## Section 8: Quantification Standards

### 8.1 The Non-Negotiable Rule

**NEVER** use vague qualifiers. **ALWAYS** use exact counts.

**Prohibited Language:**
- "Many customers..."
- "Most prospects..."
- "A significant number..."
- "Often mentioned..."
- "Frequently cited..."
- "Common themes include..."

**Required Language:**
- "412 of 847 pain quotes (48.6%) mention [X]"
- "73% of 1,247 quotes reference [Y]"
- "Only 12 of 156 competitor mechanisms address..."
- "Zero mentions found across 2,341 quotes for..."

### 8.2 The Tally Protocol

At every analysis stage, produce tallies:

```
CATEGORY: [Name]
├── Total Quotes: [N]
├── Subcategory A: [n] ([%])
├── Subcategory B: [n] ([%])
├── Subcategory C: [n] ([%])
└── Other/Uncategorized: [n] ([%])
```

### 8.3 Parallel Bucket Correlation

For every analysis, produce correlation matrix:

```
CORRELATION MATRIX: [Bucket A] ↔ [Bucket B]

| Category A | Count | Corresponding B | Count | Gap Score |
|------------|-------|-----------------|-------|-----------|
| [X] | [n] | [Y] | [n] | [difference] |
```

Gap Score = B Count - A Count
- Negative = A underserved by B
- Positive = B without corresponding A

---

## Section 9: Quality Gates

### 9.1 Gate Philosophy

Every gate must pass before proceeding. Gates are NOT optional.

### 9.1.5 Gate 0: Quality Benchmark Calibration (BEFORE Layer 1)

**Purpose:** Establish quality expectations before work begins to prevent misalignment.

**MANDATORY PROTOCOL:**

```yaml
quality_benchmark_calibration:
  trigger: Before ANY Layer 1 work begins

  required_steps:
    1. Ask user for reference examples of acceptable quality
    2. If provided, read ALL example files completely
    3. Note quality elements:
       - Quote density (quotes per 1000 words)
       - Competitive analysis depth (number of competitors, detail level)
       - Transformation pair structure and depth
       - Evidence backing (how many quotes support each claim)
       - Objection handling completeness
       - Opportunity map detail level
    4. Create quality checklist matching the standard
    5. Reference checklist during execution at each layer
    6. Compare output samples against benchmark before proceeding

  if_no_examples_provided:
    - Default to "nine-figure research team" standard (Section 1.1)
    - Use PRD minimums as floor, not ceiling
    - Aim for PhD-level defensibility

  documentation_requirement:
    - Document quality standard in Layer 1 header
    - Reference throughout execution
    - Include in final handoff metadata
```

**CRITICAL:** If user provides reference examples and final output does NOT match that quality level, the research has FAILED regardless of whether PRD minimums were met. PRD minimums are gates, not targets.

### 9.1.6 Gate 0.5: Product Type Verification (BEFORE Layer 2)

**Purpose:** Prevent foundation contamination from product type misalignment.

**MANDATORY PROTOCOL:**

```yaml
product_type_verification:
  trigger: After Layer 1 complete, BEFORE Layer 2 begins

  required_verification:
    product_type:
      - Hardware device vs digital product vs service vs physical product
      - Specific format (app, course, membership, coaching, device, supplement, etc.)
      - Delivery mechanism (download, ship, in-person, online access)
      status: "[VERIFIED]" or "[NEEDS CLARIFICATION]"

    price_range:
      - Exact price points or validated range
      - One-time vs subscription vs tiered
      - Any upsells or downsells
      status: "[VERIFIED]" or "[NEEDS CLARIFICATION]"

    key_relationships:
      - Partners vs competitors (CRITICAL distinction)
      - Integration partners
      - Distribution partners
      - White-label relationships
      status: "[VERIFIED]" or "[NEEDS CLARIFICATION]"

    target_customer:
      - Primary segment
      - Secondary segments
      - Excluded segments
      status: "[VERIFIED]" or "[NEEDS CLARIFICATION]"

  process:
    1. Re-read ALL context files from previous session/brief
    2. Document product type, price, relationships, customer in Layer 2 header
    3. IF ANY STATUS is "[NEEDS CLARIFICATION]" → HALT and ask user
    4. NEVER proceed with assumptions
    5. User must explicitly confirm before Layer 2 begins

  documentation:
    - Create "PRODUCT VERIFICATION" section in Layer 2 header
    - Include: Type, Price, Partners, Competitors, Target Customer
    - Timestamp verification
    - Note: "Verified with user on [DATE]" or "Verified from brief dated [DATE]"
```

**BLOCKER:** If any ambiguity exists about product type, partnerships, or positioning, Layer 2 CANNOT begin until clarified.

### 9.2 Gate 1: Layer 1 → Layer 2 (HARD BLOCKERS)

**CRITICAL - ANTI-FABRICATION**: These conditions MUST halt execution. NO EXCEPTIONS.

```yaml
hard_blockers:
  blocker_list:
    - total_quotes < 1000 → BLOCKED (cannot proceed to Layer 2)
    - pain_quotes < 300 → BLOCKED
    - hope_quotes < 250 → BLOCKED
    - root_cause_quotes < 200 → BLOCKED
    - solutions_tried_quotes < 150 → BLOCKED
    - numbered_quote_system_missing → BLOCKED
    - pain_hope_pairs < 25 → BLOCKED
    - why_how_pairs < 25 → BLOCKED
    - villain_data_points < 50 → BLOCKED
    - competitor_offers_missing → BLOCKED
    - mechanisms_mapped < 15 → BLOCKED

  on_blocked:
    action_sequence:
      1. Log: "BLOCKED: [criterion] not met"
      2. Log: "Required: [PRD_minimum], Actual: [calculated_value]"
      3. Log: "PRD Reference: Section [X.X]"
      4. Return to scraping/extraction
      5. DO NOT generate any "validation passed" output
      6. DO NOT assert confidence
      7. DO NOT proceed to next layer

  anti_fabrication_enforcement:
    - Validation files MUST contain actual counts from actual data files
    - Validation files MUST cite PRD section for each minimum
    - Validation files CANNOT contain minimums not defined in PRD
    - IF validation file contains invented minimum → ENTIRE VALIDATION INVALID
    - IF validation passes with actual < PRD minimum → VALIDATION CORRUPT, restart

  validation_output_required_format:
    criterion_name: "[exact name from PRD]"
    prd_section: "[Section X.X]"
    prd_minimum: [number from PRD]
    actual_value: [number calculated from data]
    data_source_file: "[filename containing raw data]"
    calculation_method: "[how actual_value was derived]"
    status: "PASSED" | "BLOCKED"
    IF PASSED: "[actual] >= [minimum] ✓"
    IF BLOCKED: "[actual] < [minimum] ✗ - DEFICIT: [minimum - actual]"
```

### 9.2.5 Checkpoint 2: Layer 2 Sample Review (AFTER Layer 2, BEFORE Layer 2.5)

**Purpose:** Catch quality/direction issues before synthesis work begins.

**MANDATORY PROTOCOL:**

```yaml
layer_2_sample_review:
  trigger: After Layer 2 complete, BEFORE Layer 2.5 begins

  required_output:
    sample_sections:
      - Competitive Landscape Analysis (first 3 competitors)
      - Target Customer Profile (complete)
      - WEB Analysis (Wants/Emotions/Beliefs - complete)
      - One objection with CPT response (full example)
      - One testimonial template (full example)

    format: 3-5 page excerpt showing depth and style

    purpose:
      - Allow user to verify quality matches benchmark
      - Catch misalignment before expensive Layer 2.5/3 work
      - Confirm tone, depth, and structure meet expectations

  user_must_respond:
    - "APPROVED - Proceed to Layer 2.5"
    - "REVISE - [specific feedback]"
    - "RESTART - Foundation issue detected"

  if_RESTART:
    - DO NOT attempt to patch Layer 2
    - Return to Layer 1 if product type wrong
    - Better to rebuild clean foundation than patch contaminated one

  documentation:
    - User approval timestamp in Layer 2.5 header
    - Any revision notes documented
    - Approval status: "APPROVED WITHOUT REVISION" or "APPROVED AFTER REVISION"
```

**CRITICAL:** This checkpoint is MANDATORY for projects with:
- New product categories (no prior research examples)
- Complex markets (10+ competitors, multi-tier)
- User explicitly requested quality matching specific benchmark
- Previous research quality issues documented

**OPTIONAL:** For routine research in familiar categories with clear benchmarks, this checkpoint MAY be skipped if user has opted out.

### 9.2.6 Error Recovery Protocol

**Purpose:** Define response when fundamental errors discovered mid-execution.

**MANDATORY PROTOCOL:**

```yaml
error_recovery:
  foundation_contamination_defined:
    - Product type wrong (hardware vs digital vs service)
    - Key partner misidentified as competitor (or vice versa)
    - Price range off by >50%
    - Target customer segment completely wrong
    - Market sophistication stage misdiagnosed

  detection_triggers:
    - User correction that invalidates Layer 2+ work
    - Internal consistency check failure
    - Quality benchmark comparison reveals major gap
    - Synthesis produces nonsensical outputs

  response_protocol:
    IF error_detected AND layer_completed >= 2:
      1. STOP all forward progress immediately
      2. Document the contamination:
         - What was wrong
         - When it entered the pipeline
         - Which layers are contaminated
      3. Present user with THREE options:
         a) RESTART from Layer 1 (RECOMMENDED for foundation issues)
         b) RESTART from point of contamination (if isolated error)
         c) PROCEED knowing quality compromised (NOT RECOMMENDED)
      4. NEVER attempt to patch contaminated layers
      5. Wait for explicit user decision

  why_no_patching:
    - Contaminated assumptions infect all downstream analysis
    - Competitive positioning wrong → villain extraction wrong
    - Product type wrong → opportunity scoring wrong
    - Partner/competitor confusion → mechanism mapping wrong
    - Cannot "put genie back in bottle"
    - Clean restart faster than debugging contamination

  documentation:
    - Create ERROR_LOG.md with contamination details
    - Include in final handoff as lesson learned
    - Flag quality grade: "COMPROMISED - [reason]"
```

**CRITICAL RULE:** Once foundation contamination detected after Layer 2, DEFAULT to restart recommendation. Only allow patching for isolated, non-foundational errors (typos, calculation errors, single subcategory missing).

### 9.3 Gate Questions (All Must Be YES)

**Volume Gate:**
- [ ] Do we have minimum evidence count for this layer?
- [ ] Have we exhausted reasonable source expansion?

**Quantification Gate:**
- [ ] Are all claims backed by specific counts?
- [ ] Have we eliminated vague qualifiers?
- [ ] Can we defend every number with source data?

**Parallel Structure Gate:**
- [ ] Have we mapped all required bucket pairs?
- [ ] Have we analyzed the gaps between pairs?
- [ ] Are correlations documented?

**Competitor Gate:**
- [ ] Have we mapped competitor mechanisms (15+)?
- [ ] Have we documented claimed root causes?
- [ ] Have we identified whitespace?

**Defensibility Gate:**
- [ ] Would this pass PhD committee scrutiny?
- [ ] Can every claim trace to source material?
- [ ] Is there evidence a skeptic couldn't dismiss?

### 9.4 Gate Failure Response

```
IF ANY gate fails:
  1. STOP - Do not produce output
  2. IDENTIFY - Which gate failed and why
  3. EXPAND - Gather more evidence/analysis
  4. RE-RUN - Complete gate check again
  5. ONLY PROCEED - When all gates pass
```

---

## Section 10: Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | Jan 17, 2026 | Initial agnostic version derived from PG Deep Research v3.2. Full E5 integration, market-agnostic architecture, configurable market adaptation, tool resilience protocols, autonomous execution rules. |
| 3.0 | Jan 19, 2026 | ANTI-FABRICATION & CONSISTENT DEPTH UPDATE: Added Section 1.5, Rule 5, Sections 3.5-3.8, Hard Blockers to Gate 1, Checklist B.1, full Appendix. |
| 4.0 | Jan 23, 2026 | **NateJones Optimization:** Added IDENTITY section (authority declaration, IS/IS NOT). Added CONSTRAINTS section (30 binary rules consolidating hard blockers, anti-fabrication, quantification, scope, and execution rules from throughout document into single reference). No content removed — constraints section cross-references existing sections. |
| **5.1** | **Jan 29, 2026** | **ENFORCEMENT GATES UPDATE (Catastrophic Failure Recovery):** Added mandatory reference to new ENFORCEMENT-GATES.md document. This update created after execution produced only 150 quotes (required: 1000+), skipped Layer 2.5 entirely, and attempted FINAL_HANDOFF without required artifacts. ENFORCEMENT-GATES.md creates HARD STOPS that cannot be bypassed: real-time quote counter protocol, state lock mechanism preventing phase skipping, pre-execution gate validation for ALL skills. Gates are BINARY - OPEN or CLOSED with no exceptions. |
| **5.0** | **Jan 26, 2026** | **Quality Gate Expansion (Gamma Research Lessons Learned):** Added Gate 0 (Quality Benchmark Calibration), Gate 0.5 (Product Type Verification), Checkpoint 2 (Layer 2 Sample Review), Error Recovery Protocol (Section 9.2.6), reinforced 1,000 quote rule as non-negotiable without explicit permission. Added critical note on quote volume to CONSTRAINTS. Updated Section 7.1 autonomy mandate to reference new gates. Prevents foundation contamination and quality misalignment detected in gamma meditation research project. |

---

## Section 11: Appendix - Validation Checklists

### Checklist A: Context Expansion Validation
- [ ] Product identified
- [ ] Category identified
- [ ] Context (broader domain) identified
- [ ] Primary research topics listed (10+)
- [ ] Category-specific topics listed
- [ ] Competitor context topics listed
- [ ] Source types identified for each topic area
- [ ] Instructional/educational content included
- [ ] Emotional/psychological topics included

### Checklist B: Layer 1 Completion
- [ ] Total quotes >= 1,000
- [ ] Pain quotes >= 300 with subcategories
- [ ] Hope quotes >= 250 with subcategories
- [ ] Root cause quotes >= 200 with subcategories
- [ ] Solutions tried quotes >= 150 with subcategories
- [ ] Top 25 verbatim for each subcategory (if 25+ exist) **IN ALL 6 BUCKETS**
- [ ] **All quotes numbered with IDs (P-XXX, H-XXX, RC-XXX, ST-XXX, CM-XXX, V-XXX)**
- [ ] **Two-tier categorization: Primary subcategory + Emotional tags for ALL quotes**
- [ ] **Priority flags assigned: GOLD / HIGH / STANDARD for ALL quotes**
- [ ] Tallies present for all categories
- [ ] Competitors >= 5 with root cause analysis
- [ ] Mechanisms >= 15 mapped with NAME + ARTICULATION format
- [ ] **Villain data >= 50 data points**
- [ ] **Pain → Hope pairs >= 25 extracted**
- [ ] **Why It Hurts → How It Works pairs >= 25 extracted**
- [ ] Saturation achieved (no expanding clusters)
- [ ] All research topics covered
- [ ] **Quantification summary table with PRD minimums vs actuals**

### Checklist B.1: Bucket Section Depth Validation (MANDATORY)

**Reference:** [[BUCKET_SECTION_TEMPLATE]]

For EACH of the 6 bucket sections (PAIN, HOPE, ROOT_CAUSE, SOLUTIONS_TRIED, COMPETITOR_MECHANISMS, VILLAIN):

- [ ] Bucket Overview present with totals and compliance %
- [ ] "What This Bucket Answers" statement present
- [ ] Two-Tier Subcategory Table with 5+ rows
- [ ] Each subcategory has emotional breakdown with percentages
- [ ] Top 25 (or Top N) verbatim quotes per subcategory with quote IDs
- [ ] GOLD quotes appear in Top 5 of each subcategory
- [ ] Copy Note present for each subcategory
- [ ] Summary table present with bucket-specific format
- [ ] #1 identification with mentions count and percentage
- [ ] #1 Copy Opportunity statement present
- [ ] **Section length >= 80 lines**

**ENFORCEMENT RULE**: If ANY bucket section fails this checklist, FINAL_HANDOFF.md is INVALID. All 6 buckets MUST receive identical template treatment.

### Checklist C: Layer 2 Completion
- [ ] Competitive landscape complete with tiers
- [ ] Target customer profile with demographics
- [ ] Target customer profile with psychographics
- [ ] Target customer profile with emotional state
- [ ] Customer journey with 4 stages
- [ ] Each journey stage has intervention opportunity
- [ ] Messaging framework with core narrative
- [ ] Messaging framework with message hierarchy
- [ ] Headline options provided
- [ ] Voice of customer DO's list
- [ ] Voice of customer DON'Ts list
- [ ] Tone guidance provided
- [ ] 4+ objections with CPT counter-narratives
- [ ] 3+ testimonial templates with examples
- [ ] **E5 PROSPECT EXAMINATION:**
  - [ ] Awareness level diagnosed with confidence score
  - [ ] WEB Analysis complete (Wants, Emotions, Beliefs)
  - [ ] Now-After Grid mapped (Have/Experience/Status/Feeling)
  - [ ] Ideal Client Outcome constructed
  - [ ] Magic Wand desires extracted
  - [ ] Promise Exposure (Market Sophistication) stage diagnosed
- [ ] **E5 COMPETITOR EXAMINATION:**
  - [ ] 15+ mechanisms mapped with NAME + ARTICULATION
  - [ ] Exclusion registry compiled
  - [ ] 5+ competitor offers analyzed
  - [ ] SIN offer intelligence extracted
  - [ ] 50+ villain data points collected
  - [ ] Contrast opportunities documented
- [ ] **E5 PRODUCT EXAMINATION:**
  - [ ] Benefits dimensionalized (Functional → Dimensionalized → Emotional)
  - [ ] Proactive objections mapped with CPT responses

### Checklist D: Layer 3 Completion
- [ ] 5+ opportunities scored with 6-component composite
- [ ] At least 1 Tier 1 (score 80+) opportunity
- [ ] All scores traceable to source quote IDs
- [ ] Evidence packages at correct tier depth
- [ ] All evidence quotes verbatim with valid IDs
- [ ] CPT objection responses across all 8 categories
- [ ] 3+ objection variants per category
- [ ] All proof elements cite real quote IDs
- [ ] 5-category risk assessment for Tier 1 opportunities
- [ ] All mitigations specific and actionable
- [ ] 3-phase action sequence for Tier 1 opportunities
- [ ] Measurement framework with numeric thresholds
- [ ] Kill criteria unambiguous
- [ ] Opportunity map synthesizes all Layer 3 outputs
- [ ] FINAL_HANDOFF.md assembled (300-500KB)
- [ ] All 14 sections populated
- [ ] NO new analysis generated — assembly only

### Checklist E: Final Handoff Validation
- [ ] Single markdown file (300-500KB)
- [ ] Executive summary with metrics table
- [ ] Core thesis statement present
- [ ] Top 3 opportunities with composite scores
- [ ] Full Layer 1 content (quotes by bucket with tallies)
- [ ] Full Layer 2 content (market intelligence, E5, competitor analysis)
- [ ] Full Layer 2.5 content:
  - [ ] Transformation pairs (25+ with IDs)
  - [ ] Educational pairs (25+ with IDs)
  - [ ] WEB synthesis (all categories populated)
  - [ ] Transformation grid (all 4 dimensions)
  - [ ] Language patterns (10+ gold phrases)
  - [ ] Full categorization (100% quote coverage)
- [ ] Full Layer 3 content:
  - [ ] Opportunity map with tier rankings
  - [ ] Evidence packages per opportunity
  - [ ] Objection playbook (8 categories)
  - [ ] Risk profiles (5 categories per Tier 1)
  - [ ] Action sequences (3 phases per Tier 1)
  - [ ] Measurement frameworks (with numeric triggers)
- [ ] Appendices present (source inventory, artifact manifest, methodology)
- [ ] All quotes verbatim with source IDs (P-XXX, H-XXX, RC-XXX, ST-XXX, CM-XXX, V-XXX)
- [ ] NO new analysis generated during assembly
- [ ] All terminology consistent with market_config
- [ ] All checklists A-D passed

---

## Related Documents

- [[skills/foundation/01-research/MASTER-AGENT]] - Execution workflow
- [[skills/foundation/01-research/QUALITY-STANDARDS]] - Universal quality framework
- [[market-configs/]] - Market configuration templates
- [[skills/]] - Micro-skill library

---

**END OF PRD**

**The Standard: PhD-level research that serves nine-figure business decisions.**
