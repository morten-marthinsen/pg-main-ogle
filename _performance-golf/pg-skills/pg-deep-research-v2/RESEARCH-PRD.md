# Deep Research System - Product Requirements Document (PRD)

**Version:** 3.2
**Created:** January 16, 2026
**Last Updated:** January 17, 2026
**Status:** ACTIVE
**Related Document:** [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT]] (Workflow Orchestrator)
**Methodology Reference:** Todd Brown E5 Method, Rich Schefren AI Execution Spec

---

## DOCUMENT PURPOSE

This PRD defines the **requirements, standards, and acceptance criteria** for the Deep Research System. It answers the question: **"What does success look like?"**

The companion document, [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT]], answers: **"How do we execute to achieve success?"**

These documents are **bidirectionally linked**. The Master Agent references this PRD for all quality gates, minimums, and acceptance criteria. This PRD references the Master Agent for execution protocols.

**CRITICAL**: This PRD is the governing document. If there is any conflict between this PRD and the Master Agent, the PRD takes precedence.

---

# SECTION 1: VISION & OBJECTIVE

## 1.1 Vision Statement

To create the **most comprehensive, PhD-level market intelligence system** that produces research so thorough, so deeply validated, and so strategically actionable that it gives Performance Golf an **unfair competitive advantage** in every product launch.

This system must:
- **Leave no stone unturned** - **Excavate** every relevant quote, insight, and pattern
- **Operate semi-autonomously** - Human checkpoints are strategic gates, not "please continue" prompts
- **Self-validate and self-expand** - **Scrutinize** depth and continue automatically when insufficient
- **Produce evisceration-level intelligence** - **Synthesize** and **distill** intelligence that enables absolute competitive domination

## 1.2 Objective

For any given product, produce a single comprehensive research document that contains:
1. **Quantified voice of customer data** organized into actionable buckets
2. **Competitive intelligence** with root cause and mechanism mapping
3. **Strategic opportunities** with execution-ready plans
4. **Language patterns** for direct use in marketing copy

## 1.3 Definition of Done

Research is **COMPLETE** when ALL of the following are true:

| Criteria | Requirement | Validation Method |
|----------|-------------|-------------------|
| Quote Volume | 1,000+ minimum, no upper limit | Automated count |
| Bucket Coverage | All 4 primary buckets populated with minimums met | Bucket validator |
| Bucket Saturation | No ambiguous clusters requiring expansion | Saturation analyzer |
| Competitor Analysis | Minimum 5 competitors with root cause + mechanism | Manual count |
| Contextual Coverage | All research topics from context expansion covered | Topic checklist |
| Layer Completion | All 3 layers complete with acceptance criteria met | Layer validators |
| Final Output | Single FINAL_HANDOFF.md with all content | File existence check |

---

# SECTION 1.5: SCOPE, BOUNDARIES & DECISION RULES

## 1.5.1 Explicit Scope Definition

### IN SCOPE (What This System Produces)

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

### OUT OF SCOPE (What Downstream Agents Handle)

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

## 1.5.2 Decision Rules

### Rule 1: Expansion vs Completion Trade-off

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

### Rule 2: Source Quality vs Quantity Trade-off

```yaml
decision_trigger: "Low-quality source vs no source for topic"

decision_rule:
  IF topic_has_zero_sources:
    → ACCEPT lower-quality source over nothing
    → FLAG as "needs validation"
  IF topic_has_3+_sources:
    → PRIORITIZE quality over quantity
    → DISCARD low-quality sources
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
# Forum users (GolfWRX, TheSandTrap, etc.) represent the HIGHEST
# awareness level in the market - NOT the general prospect.
# These are golf obsessives who have tried everything.
# Their sophistication level ≠ average YouTube viewer or review reader.

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

### Rule 3: Confidence Threshold Trade-off

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

### Rule 5: Confidence Calculation Formula (MANDATORY - ANTI-FABRICATION)

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

### Rule 4: Tool Failure Trade-off

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
  - Major forums (Reddit, GolfWRX)
  - YouTube instructional content
```

## 1.5.3 Dependencies & Integration Points

### Upstream Dependencies (What This System Needs)

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
    - Exa (search + scrape)
    - Ref.io (documentation)
    source: MCP configuration

  context_files:
    - Previous research (if exists)
    - Brand guidelines (if relevant)
    source: Project folder
```

### Downstream Consumers (What Uses This Output)

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

### Internal Dependencies (Skill Execution Order)

```yaml
layer_1_sequence:
  1.0-A: Context Expander → establishes research scope
  1.0-B: Prospect Awareness Mapper → calibrates messaging strategy
  ↓
  1.1-1.4: Scraping skills (can run parallel)
  ↓
  1.5: Quote Quantification (depends on scraping complete)

layer_2_sequence:
  2.1: Demographics/Psychographics
  2.2: WEB Analysis (E, F parallel)
  2.3: Gap Detection
  2.4: Competitor Analysis (A, B, C, D, E parallel after A)
  2.5: Customer Journey
  2.6: Prospect Tools (H, I, J, K parallel)
  2.7: Intelligence Synthesis (depends on all above)

layer_3_sequence:
  3.1: Opportunity Scoring (A, B, C parallel)
  3.2: Risk Analysis
  3.3: Action Planning
  3.4: Final Handoff Generation (depends on all above)

parallelization_rules:
  - Skills within same layer CAN run parallel if no data dependency
  - Skills across layers MUST run sequentially
  - Scraping skills SHOULD run parallel for efficiency
```

## 1.5.4 Risks & Mitigations

### Risk 1: Insufficient Quote Volume

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

### Risk 2: Tool Access Failures

```yaml
risk: Primary scraping tools fail or rate-limit
probability: MEDIUM-HIGH (common with aggressive scraping)
impact: MEDIUM (delays but fallbacks exist)

mitigation:
  preventive:
    - Multiple tool fallback chain (Firecrawl → Apify → Exa)
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

### Risk 3: Cluster Ambiguity Not Resolved

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

### Risk 4: Competitor Mechanism Overlap

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

### Risk 5: Market Sophistication Misjudgment

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

### Risk 6: Villain Data Insufficient

```yaml
risk: Not enough "what they hate" data about competitors
probability: MEDIUM (requires specific searches)
impact: MEDIUM (limits contrast positioning)

mitigation:
  preventive:
    - Explicit villain extraction in 2.4-A
    - Search for negative reviews, complaints, returns
    - Include "disappointed", "waste of money" queries
  reactive:
    - Expand to Amazon 1-3 star reviews
    - Search YouTube comments on competitor videos
    - Forum threads about competitor problems

detection:
  - Minimum 50 villain data points threshold
  - Alert if < 50 by Layer 2 completion
```

---

# SECTION 2: CONTEXTUAL EXPANSION FRAMEWORK

## 2.1 The Expansion Logic

**CRITICAL REQUIREMENT**: Research is NOT limited to the product category. Research MUST expand to the FULL CONTEXT the product exists within.

```
PRODUCT
   ↓
CATEGORY (what type of product)
   ↓
CONTEXT (what broader domain does it serve)
   ↓
RESEARCH TOPICS (all relevant areas within that context)
   ↓
SOURCE TYPES (where to find data on each topic)
```

## 2.2 Expansion Examples

### Example 1: Wedge Product

```yaml
product: ONE.1 Wedge
category: Wedges
context: SHORT GAME

research_topics:
  primary:
    - Chipping technique and problems
    - Chipping confidence and mental game
    - Chipping yips and anxiety
    - Pitch shot distance control
    - Pitch shot trajectory control
    - Bunker play technique
    - Bunker play fear and avoidance
    - Greenside shot execution
    - Lies (thick rough, tight lies, hardpan)
    - Touch and feel around greens
    - Short game practice methods
    - Short game scoring impact

  equipment_specific:
    - Wedge bounce and grind selection
    - Wedge forgiveness vs control
    - Wedge sole design impact
    - Gap wedge vs sand wedge vs lob wedge
    - Chipper clubs and alternatives

  competitor_context:
    - Cleveland wedges (CBX, Smart Sole, RTX)
    - Callaway wedges (JAWS, Mack Daddy)
    - Titleist Vokey wedges
    - TaylorMade wedges (Hi-Toe, MG)
    - Ping Glide wedges
    - Mizuno wedges
    - Specialty/game improvement wedges

source_types:
  - YouTube videos about short game instruction
  - YouTube videos about chipping drills
  - YouTube videos about bunker technique
  - Forum discussions about short game problems
  - Forum discussions about wedge selection
  - Reddit threads about chipping anxiety
  - Reddit threads about short game improvement
  - Review sites for wedge comparisons
  - Academic/research on golf yips
  - Instructional content (reveals pain points)
  - Competitor product pages (mechanism mapping)
  - Competitor ads (positioning analysis)
```

### Example 2: Iron Set Product

```yaml
product: [Hypothetical Iron Set]
category: Irons
context: IRON PLAY / BALL STRIKING

research_topics:
  primary:
    - Contact consistency (fat, thin, topped)
    - Sweet spot finding
    - Ball compression and feel
    - Distance control and gapping
    - Distance consistency
    - Shot dispersion
    - Trajectory control
    - Forgiveness on mishits
    - Workability and shot shaping
    - Turf interaction and divots
    - Iron confidence
    - Approach shot anxiety
    - Practice and improvement

  equipment_specific:
    - Cavity back vs blade vs players distance
    - Offset and launch characteristics
    - Shaft selection impact
    - Lie angle importance
    - Iron fitting considerations

  competitor_context:
    - Callaway irons (Paradym, Apex, Big Bertha)
    - TaylorMade irons (P-series, Qi, Stealth)
    - Titleist irons (T-series)
    - Ping irons (G-series, i-series)
    - Cobra irons
    - Mizuno irons
    - Srixon irons

source_types:
  - YouTube videos about ball striking
  - YouTube videos about iron contact
  - YouTube videos about compression
  - Forum discussions about iron consistency
  - Forum discussions about distance gapping
  - Reddit threads about fat/thin shots
  - Reddit threads about iron improvement
  - Review sites for iron comparisons
  - Instructional content on iron play
  - Competitor product pages
  - Competitor ads
```

### Example 3: Golf Ball Product

```yaml
product: [Hypothetical Golf Ball]
category: Golf Balls
context: BALL PERFORMANCE / SCORING

research_topics:
  primary:
    - Driver distance and ball speed
    - Spin rates (driver, irons, wedges)
    - Feel and feedback
    - Greenside spin and control
    - Durability concerns
    - Visibility and alignment
    - Price vs performance value
    - Ball fitting and selection
    - Compression and swing speed matching
    - Weather performance (cold, wet)
    - Consistency ball to ball

  equipment_specific:
    - Urethane vs ionomer covers
    - Multi-layer construction
    - Dimple patterns
    - Core technology

  competitor_context:
    - Titleist Pro V1/Pro V1x
    - Callaway Chrome Soft
    - TaylorMade TP5
    - Bridgestone Tour B
    - Kirkland Signature
    - Vice Golf
    - Snell Golf
    - OnCore

source_types:
  - YouTube ball comparison videos
  - YouTube ball fitting content
  - Forum discussions about ball selection
  - Reddit threads about premium vs budget balls
  - Amazon reviews for specific balls
  - Golf ball testing sites
  - Robot testing data discussions
  - Competitor product pages
  - Competitor ads
```

## 2.3 Context Expansion Rules

### Rule 1: Never Limit to Product Category Alone
```
WRONG: Researching "wedges" only
RIGHT: Researching "short game" which includes wedges
```

### Rule 2: Instructional Content Reveals Pain
```
People watching "how to stop chunking" videos HAVE the chunking problem.
The comments on these videos are GOLD for pain quotes.
Scrape instructional content, not just review content.
```

### Rule 3: Adjacent Topics Matter
```
For wedges: Don't just search "wedge reviews"
Also search: "chipping yips", "short game anxiety", "bunker fear"
These reveal the EMOTIONAL context equipment solves.
```

### Rule 4: Competitor Sources Are for Mechanisms, Not Pain
```
Competitor product pages → Extract HOW their product claims to work
Customer forums/Reddit → Extract PAIN, HOPE, ROOT CAUSES, SOLUTIONS TRIED
Don't conflate these. Tag them differently.
```

## 2.4 Context Expansion Validation

Before proceeding past source discovery, validate:

- [ ] All primary research topics have at least 3 source types identified
- [ ] Instructional/educational content is included (not just reviews)
- [ ] Emotional/psychological topics are included (anxiety, confidence, fear)
- [ ] Forum discussions beyond product reviews are included
- [ ] Competitor sources are identified separately for mechanism mapping

**Reference:** [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Phase 2 Step 1.0]] - Context Expansion Execution

---

# SECTION 3: QUOTE REQUIREMENTS

## 3.1 Volume Requirements

### Minimum Threshold
| Metric | Minimum | Notes |
|--------|---------|-------|
| Total Quotes | 1,000 | This is the FLOOR, not the ceiling |
| Pain Quotes | 300 | Physical problems experienced |
| Hope Quotes | 250 | Desires and aspirations |
| Root Cause Quotes | 200 | Beliefs about why the problem exists |
| Solutions Tried Quotes | 150 | What they've already attempted |
| Competitor Mechanism Quotes | 100 | How competitors claim to solve it |

### Dynamic Expansion Trigger

**CRITICAL**: 1,000 quotes is the minimum, NOT the target. The system MUST continue beyond 1,000 if:

1. **Cluster Ambiguity Detected**: If saturation analysis shows 3+ pain points clustering together without clear differentiation, EXPAND the search to break the cluster apart.

2. **Topic Coverage Gap**: If any research topic from context expansion has < 50 quotes, EXPAND that topic specifically.

3. **Competitor Gap**: If any major competitor has < 20 mechanism/claim quotes, EXPAND competitor research.

4. **Confidence Threshold Not Met**: If Layer 2 analysis produces opportunities with < 80% confidence, EXPAND underlying data.

### No Upper Limit

There is **NO MAXIMUM** quote count. If the market requires 2,000, 3,000, or 5,000 quotes to achieve saturation and cluster differentiation, the system continues until:
- All clusters are clearly differentiated
- All research topics have adequate coverage
- All competitors are fully mapped
- Layer 2 analysis achieves high confidence

## 3.2 Bucket Structure

### Primary Buckets (4 Required)

#### Bucket 1: PAIN QUOTES
**Definition**: Physical problems, failures, frustrations, and negative experiences

```yaml
pain_quotes:
  minimum_total: 300

  subcategory_structure:
    - subcategory_name: [Dynamically generated based on product context]
      minimum_mentions: 25
      top_25_verbatim: required
      tally_format: "Total Mentions: [X]"

  example_subcategories_wedge:
    - Chunking/Fat Shots
    - Thinning/Skulling/Blading
    - Yips/Involuntary Movements
    - Digging/Leading Edge Issues
    - Distance Control Problems
    - Trajectory Issues
    - Bunker Failures

  example_subcategories_irons:
    - Fat Shots
    - Thin/Topped Shots
    - Shanks
    - Distance Inconsistency
    - Trajectory Problems
    - Mishit Punishment
    - Turf Interaction Issues
```

#### Bucket 2: HOPE QUOTES
**Definition**: Desires, aspirations, what they want to experience

```yaml
hope_quotes:
  minimum_total: 250

  subcategory_structure:
    - subcategory_name: [Dynamically generated]
      minimum_mentions: 20
      top_25_verbatim: required
      tally_format: "Total Mentions: [X]"

  example_subcategories_wedge:
    - Consistent Contact
    - Confidence Restored
    - Forgiveness/Less Punishment
    - Distance Control
    - Spin Control
    - Versatility
    - Bunker Escape

  example_subcategories_irons:
    - Consistent Contact
    - Confidence at Address
    - Forgiveness on Mishits
    - Predictable Distance
    - Better Feel/Feedback
    - Improved Dispersion
```

#### Bucket 3: ROOT CAUSE BELIEFS (Why It Hurts)
**Definition**: What customers BELIEVE causes their problem

```yaml
root_cause_quotes:
  minimum_total: 200

  subcategory_structure:
    - subcategory_name: [Dynamically generated]
      minimum_mentions: 15
      top_25_verbatim: required

  standard_subcategories:
    - Technique Beliefs ("I'm doing something wrong")
    - Equipment Beliefs ("My clubs don't fit me")
    - Mental/Psychological Beliefs ("It's all in my head")
    - Physical Beliefs ("I'm not athletic enough")
    - Knowledge Beliefs ("I don't understand how to...")
```

#### Bucket 4: SOLUTIONS TRIED (How It Works)
**Definition**: What customers have ALREADY attempted to solve their problem

```yaml
solutions_tried_quotes:
  minimum_total: 150

  subcategory_structure:
    - subcategory_name: [Dynamically generated]
      minimum_mentions: 15
      top_25_verbatim: required

  standard_subcategories:
    - Technique Changes Tried
    - Equipment Changes Tried
    - Mental Approaches Tried
    - Lessons/Instruction Tried
    - Practice Methods Tried
    - Giving Up/Avoidance
```

### Secondary Buckets (Required)

#### Bucket 5: COMPETITOR ROOT CAUSE ANALYSIS
**Definition**: What problem each competitor CLAIMS to solve

```yaml
competitor_root_cause:
  minimum_competitors: 5
  per_competitor_required:
    - competitor_name: [Brand/Product]
    - claimed_root_cause: "What problem do they say they solve?"
    - marketing_message: "Their primary positioning/tagline"
    - implicit_belief: "What does their messaging assume?"
    - weakness: "Where is their claim vulnerable?"
```

#### Bucket 6: COMPETITOR MECHANISM MAPPING
**Definition**: HOW each competitor claims their solution works (NAME + ARTICULATION)

```yaml
competitor_mechanisms:
  minimum_mechanisms: 15 unique technologies
  per_mechanism_required:
    - competitor_name: [Brand]
    - NAME: [Proprietary name - what they CALL it]
    - ARTICULATION: [How they EXPLAIN it works]
    - causal_chain: [Step-by-step logic chain]
    - differentiation: [What makes it unique]
    - exclusion_notes: [What to AVOID when creating new mechanisms]
```

#### Bucket 7: COMPETITOR OFFERS
**Definition**: What competitors DELIVER, how they PRICE, what they GUARANTEE

```yaml
competitor_offers:
  minimum_competitors: 5
  per_offer_required:
    - deliverables: What customer receives
    - price_and_terms: Cost and payment options
    - bonuses: What extras are included
    - guarantee: Risk reversal strength (STRONG/MEDIUM/WEAK)
    - sin_intelligence: Superior/Irresistible/No-brainer gaps
```

#### Bucket 8: VILLAIN DATA
**Definition**: What prospects HATE about competitor products, features, and messaging

```yaml
villain_extraction:
  minimum_data_points: 50
  categories:
    - hated_features: What specific features frustrate them
    - hated_products: Which products have negative sentiment
    - hated_messaging: What positioning language offends
    - hated_experiences: What purchase/use experiences disappoint
  per_villain_required:
    - what_they_hate: Specific complaint
    - verbatim_quote: Their words
    - source: Where found
    - contrast_opportunity: How to position against this
```

## 3.3 Quote Quality Standards

### Verbatim Preservation
- Extract EXACTLY as written
- Preserve typos, slang, capitalization
- Preserve emojis and formatting
- NEVER clean, correct, or paraphrase
- NEVER summarize or condense

### Context Requirements
Each quote must include:
- Source URL
- Platform (Reddit, YouTube, Forum, etc.)
- Author (if available)
- Date (if available)
- Thread/video title for context
- Parent content (if reply)
- Engagement metrics (upvotes, likes, etc.)

### Specificity Flagging
Flag quotes containing:
- Dollar amounts ("$50 per dozen")
- Product names ("Pro V1", "Cleveland CBX4")
- Quantities ("lost 3 balls", "5 years playing")
- Time periods ("after 6 months")
- Handicap/skill level ("I'm a 12 handicap")
- Personal stories ("I've been playing for 20 years")

### Top 25 Requirement (ALL 6 BUCKETS)

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

## 3.5 Numbered Quote System (MANDATORY)

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
    specificity_flags: ["dollar_amount", "product_name", "handicap", etc]

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

## 3.6 Pair Extraction Requirement (MANDATORY)

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
        subcategory: "[e.g., Chunking/Fat Shots]"
      hope_quote:
        id: "H-017"
        text: "[verbatim hope quote]"
        source: "[url]"
        subcategory: "[e.g., Consistent Contact]"
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

## 3.8 Bucket Section Template (MANDATORY - CONSISTENT DEPTH)

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

## 3.7 Saturation Analysis

### What is Saturation?
Saturation is reached when additional scraping produces quotes that repeat patterns already captured, rather than revealing new patterns.

### Cluster Differentiation Requirement

**CRITICAL RULE**: If saturation analysis reveals 3+ pain points (or hope points, or root causes) that are clustering together without clear differentiation, the system MUST:

1. **Identify the cluster**: "Chunking, fat shots, and digging are clustering together"
2. **Expand search specifically**: Add queries targeting differentiation
3. **Continue scraping**: Until the cluster breaks apart OR it's validated as a single phenomenon
4. **Document the finding**: Either "These are distinct problems" OR "These are the same problem with different names"

### Saturation Validation Checklist

Before declaring any bucket saturated:
- [ ] Pattern has appeared 5+ times from different sources
- [ ] No new patterns have emerged in last 50 quotes for this bucket
- [ ] All subcategories have minimum quotes
- [ ] No ambiguous clusters remain
- [ ] All research topics from context expansion are covered

**Reference:** [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Step 1.5-D]] - Saturation Analyzer Execution

---

# SECTION 4: LAYER REQUIREMENTS

## 4.1 Layer 1: Infrastructure (Quantified Source Extraction)

### Purpose
Collect, extract, and quantify all raw voice-of-customer data and competitive intelligence.

### Acceptance Criteria

| Criterion | Requirement | Validation |
|-----------|-------------|------------|
| Context Expansion | Complete with all research topics identified | Checklist |
| Source Count | 50+ sources minimum | Automated count |
| Platform Diversity | 4+ platform types | Automated check |
| Quote Volume | 1,000+ minimum | Automated count |
| Bucket Minimums | All 4 primary buckets meet minimums | Bucket validator |
| Top 25 Extraction | Each subcategory has top 25 if 25+ exist | Automated check |
| Competitor Coverage | 5+ competitors with root cause + mechanism | Manual count |
| Saturation Achieved | No expanding clusters, all topics covered | Saturation analyzer |
| Quantification Complete | All tallies present, all buckets labeled | Format check |

### Layer 1 Output Structure

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

**Reference:** [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Phase 2]] - Layer 1 Execution

---

## 4.2 Layer 2: Intelligence (Market Analysis)

### Purpose
Transform raw data into strategic intelligence: competitive landscape, customer profiles, messaging frameworks, voice patterns, AND E5 prospect/competitor examination outputs.

### Acceptance Criteria

| Criterion | Requirement | Validation |
|-----------|-------------|------------|
| Competitive Landscape | Complete tier analysis of all competitors | Section exists |
| Target Customer Profile | Demographics + Psychographics + Emotional State | All 3 present |
| Customer Journey | 4-stage journey with intervention points | All stages defined |
| Messaging Framework | Core narrative + Message hierarchy | Both present |
| Voice of Customer Language | DO's and DON'Ts lists | Both lists present |
| Objection Handling | 4+ objections with CPT counter-narratives | Count check |
| Testimonial Templates | 3+ templates with examples | Count check |
| **E5 PROSPECT EXAMINATION** | | |
| Awareness Level | Diagnosed with confidence score | Section exists |
| WEB Analysis | Wants, Emotions, Beliefs documented | All 3 present |
| Now-After Grid | Have/Experience/Status/Feeling mapped | Grid complete |
| Ideal Client Outcome | Best success story constructed | Section exists |
| Magic Wand | Blue-sky desires extracted | Section exists |
| Promise Exposure | Market sophistication stage diagnosed | Stage identified |
| **E5 COMPETITOR EXAMINATION** | | |
| Mechanism Mapping | NAME + ARTICULATION for 15+ mechanisms | Count + format check |
| Offer Analysis | 5+ competitors with SIN intelligence | Count check |
| Villain Inventory | 50+ data points with contrast opportunities | Count check |
| **E5 PRODUCT EXAMINATION** | | |
| Benefit Dimensionalization | Functional → Dimensionalized → Emotional | All 3 levels present |
| Proactive Objections | All opportunities have CPT responses | Section exists |

### Layer 2 Output Structure

```markdown
# LAYER 2: MARKET INTELLIGENCE ANALYSIS

## 2.1 COMPETITIVE LANDSCAPE
### Market Structure
[Tier 1, 2, 3 competitors]
### [Product] Competitive Position
### Competitive White Space

## 2.2 TARGET CUSTOMER PROFILE
### Primary Segment: [Name]
**Demographics:** [Table]
**Psychographics:** [Bullets]
**Emotional State:** [Quote + description]
**Behavioral Patterns:** [Bullets]

### Secondary Segment: [Name]
[Same structure]

## 2.3 CUSTOMER JOURNEY MAP
### Stage 1: Awareness (Problem Recognition)
**Trigger Events:**
**Current Behavior:**
**[Product] Opportunity:**

### Stage 2: Consideration (Solution Research)
[Same structure]

### Stage 3: Decision (Purchase)
[Same structure]

### Stage 4: Post-Purchase (Experience)
[Same structure]

## 2.4 MESSAGING FRAMEWORK
### Core Narrative
[Full narrative]

### Message Hierarchy
1. Problem Agitation
2. Solution Introduction
3. Proof Points
4. Differentiation
5. Risk Reversal

### Headline Options

## 2.5 VOICE OF CUSTOMER LANGUAGE
### Language DO's:
### Language DON'Ts:
### Tone:

## 2.6 OBJECTION HANDLING
### Objection 1: [Title]
**How They Express It:**
**Counter-Narrative (CPT Format):**
- Claim:
- Proof:
- Benefit (Transition):
[Repeat for each objection]

## 2.7 TESTIMONIAL TEMPLATES
### Template 1: [Type]
[Template with example]
[Repeat for each template]

## 2.8 E5 PROSPECT EXAMINATION

### 2.8.1 Awareness Pyramid
**Diagnosed Level:** [1-5]
**Confidence:** [%]
**Distribution Estimate:**
| Level | % | Description |
|-------|---|-------------|
| Most Aware | X% | |
| Product Aware | X% | |
| Solution Aware | X% | |
| Problem Aware | X% | **PRIMARY TARGET** |
| Completely Unaware | X% | |

**Strategic Implications:**
- Lead with: [Problem agitation / Mechanism / Direct offer]
- Copy length: [Long / Medium / Short]
- Differentiation focus: [Promise / Mechanism / Experience]

### 2.8.2 WEB Analysis
**WANTS (What They Desire):**
[Categorized wants with quotes]

**EMOTIONS (How They Feel):**
- Current emotions: [Before purchase]
- Desired emotions: [After solution]

**BELIEFS (What They Think):**
- About the problem:
- About solutions:
- About the marketplace:
- About competitors:

### 2.8.3 Now-After Grid
| Category | NOW | AFTER |
|----------|-----|-------|
| HAVE | | |
| EXPERIENCE | | |
| STATUS | | |
| FEELING | | |

### 2.8.4 Ideal Client Outcome
**Primary Results:**
**Secondary Transformations:**
**Testimonial Framework:**

### 2.8.5 Magic Wand
**Blue-Sky Desires:**
**Reality Calibration:**
**Promise Boundaries:**

### 2.8.6 Promise Exposure (Market Sophistication)
**Stage Diagnosis:** [1-5]
**Lead Strategy:** [Promise / Expanded Promise / Mechanism / Expanded Mechanism / Experience]
**Evidence:**

## 2.9 E5 COMPETITOR EXAMINATION

### 2.9.1 Mechanism Exclusion Registry
| Competitor | NAME | ARTICULATION | AVOID |
|------------|------|--------------|-------|
| | | | |

### 2.9.2 Offer Landscape
**Price Tiers:**
**Guarantee Analysis:**
**SIN Opportunities:**

### 2.9.3 Villain Inventory
**Hated Features:**
**Hated Products:**
**Hated Messaging:**
**Contrast Opportunities:**

## 2.10 E5 PRODUCT EXAMINATION

### 2.10.1 Benefit Dimensionalization
| Feature | Functional Benefit | Dimensionalized | Emotional Benefit |
|---------|-------------------|-----------------|-------------------|
| | | | |

### 2.10.2 Proactive Objection Matrix
| Opportunity | Likely Objection | CPT Response |
|-------------|------------------|--------------|
| | | |
```

**Reference:** [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Phase 3]] - Layer 2 Execution

---

## 4.2.5 Layer 2.5: Synthesis Requirements (MANDATORY)

### Purpose

Layer 2.5 is the **MANDATORY synthesis layer** that transforms organized analytical data (Layer 2 outputs) into copy-ready narrative artifacts. This layer exists because:

1. **Transformation pairs require MANUAL matching** of pain quotes to hope quotes - this cannot be reliably done during final handoff generation
2. **WEB Analysis requires NARRATIVE synthesis**, not analytical output - it must be created as a discrete artifact
3. **These artifacts were previously generated "at handoff" with inconsistent results** - the SF2 v1 incident proved synthesis must happen BEFORE final assembly

### Critical Design Principles

**PRINCIPLE 1: FINAL_HANDOFF.md is an ASSEMBLY operation, not a synthesis operation.**

By the time we generate FINAL_HANDOFF.md, all synthesis work must already be complete and validated. This layer ensures that.

**PRINCIPLE 2: All 1,000+ quotes must be analyzed to identify patterns.**

The 25-pair minimum is the OUTPUT requirement, not the INPUT requirement. The agent MUST:
- Analyze ALL 1,000+ quotes collected in Layer 1
- Categorize and tally every quote by physical problem and emotional tags
- Identify patterns from the FULL dataset to determine:
  - What is the BIGGEST pain point (most frequently mentioned)
  - What is the BIGGEST hope (most frequently mentioned)
  - What is the BIGGEST "why it hurts" (root cause)
  - What is the BIGGEST "how it works" (mechanism/solution)
- Select the TOP 25+ pairs that represent the strongest transformations BASED ON THIS ANALYSIS

**PRINCIPLE 3: Human review checkpoint with Markdown output.**

Before proceeding to Final Handoff, a human-reviewable Markdown file must be generated showing ALL quotes categorized with tallies. This serves as a validation checkpoint where the human can verify:
- Quote categorization accuracy
- Pattern identification quality
- Proper distribution across buckets
- Two-tier tagging completeness

### Required Outputs

| Output File | Minimum | Validation Criteria |
|------------|---------|---------------------|
| `transformation_pairs.json` | 25 pairs | Each has: pain_quote_id, hope_quote_id, theme_label |
| `educational_pairs.json` | 25 pairs | Each has: why_quote, how_quote, sequence_label |
| `web_analysis.json` | 5 sections | GAIN, BE, DO, SAVE, AVOID all populated |
| `now_after_grid.json` | 4 dimensions | HAVE, EXPERIENCE, STATUS, FEELING all have NOW + AFTER |
| `language_patterns.json` | 5 categories | Exact phrases by physical problem category |
| `two_tier_quotes.json` | All quotes | Every quote has physical_tag + emotional_tags[] |
| **`SYNTHESIS_VALIDATION.md`** | **NEW** | **Human-reviewable Markdown showing ALL quotes by category with tallies** |

### CRITICAL: Human Review Checkpoint Output

**File:** `layer-2-5-outputs/SYNTHESIS_VALIDATION.md`

This Markdown file is generated AFTER all JSON artifacts are complete and BEFORE proceeding to Final Handoff. It provides human-readable validation of the synthesis work.

**Required Format:**

```markdown
# SYNTHESIS VALIDATION CHECKPOINT
Generated: [timestamp]
Project: [project-name]

## QUOTE ANALYSIS SUMMARY (1,000+ Quotes Analyzed)

### By Bucket
| Bucket | Count | % of Total |
|--------|-------|------------|
| PAIN | 253 | 25.3% |
| HOPE | 177 | 17.7% |
| ROOT_CAUSE | 123 | 12.3% |
| SOLUTIONS_TRIED | 117 | 11.7% |
| COMPETITOR_MECHANISM | 114 | 11.4% |
| VILLAIN | 128 | 12.8% |
| **TOTAL** | **1000** | **100%** |

---

## PAIN QUOTES BY SUBCATEGORY

### SLICE (94 quotes - BIGGEST PAIN)

> "I could probably send the ball 2 fairways to the right" — GolfWRX [P-021] [GOLD] [desperation, severity]

> "Ball going 90 degrees to the right every time" — TheSandTrap [P-045] [HIGH] [frustration, embarrassment]

> "Every drive is a banana ball into the woods" — Reddit [P-089] [MEDIUM] [frustration]

[...all 94 quotes listed as readable lines with tags at end...]

### CONFIDENCE_COLLAPSE (58 quotes)

> "Mentally I am prepared to hit a bad shot before I even step up to the ball" — GolfWRX [P-046] [GOLD] [dread, mental_defeat]

[...all 58 quotes listed...]

### DISTANCE_INCONSISTENCY (42 quotes)
[...all 42 quotes listed...]

### SOCIAL_EMBARRASSMENT (32 quotes)
[...all 32 quotes listed...]

### EQUIPMENT_CHURN (27 quotes)
[...all 27 quotes listed...]

---

## HOPE QUOTES BY SUBCATEGORY

### STRAIGHT_SHOTS (62 quotes - BIGGEST HOPE)

> "Nearly dead-straight draw shots everywhere" — GolfWRX [H-113] [HIGH] [transformation, relief]

[...all 62 quotes listed...]

### FAIRWAY_ACCURACY (44 quotes)
[...all 44 quotes listed...]

[...continue for all HOPE subcategories...]

---

## ROOT_CAUSE QUOTES BY SUBCATEGORY

### MECHANICAL_CAUSE (48 quotes - BIGGEST WHY)

> "A slice is caused by an open face to that path at impact" — Titleist [RC-021] [HIGH] [technical]

[...all 48 quotes listed...]

[...continue for all ROOT_CAUSE subcategories...]

---

## SOLUTIONS_TRIED QUOTES BY SUBCATEGORY
[...same format...]

---

## COMPETITOR_MECHANISM QUOTES BY SUBCATEGORY
[...same format...]

---

## VILLAIN QUOTES BY SUBCATEGORY
[...same format...]

---

## TOP TRANSFORMATION PAIRS (25+ pairs)

### Pain→Hope Pairs by Theme

**Theme: Slice → Straight (12 pairs)**

1. **TP-001** "2 fairways to the right" → "dead-straight draw shots" [GOLD]
2. **TP-002** "90 degree turn" → "baby draw down the middle" [HIGH]
[...all pairs in theme...]

**Theme: Fear → Confidence (8 pairs)**
[...pairs listed...]

[...continue for all themes...]

---

## TOP EDUCATIONAL PAIRS (25+ pairs)

### Why→How Pairs by Sequence

**Sequence: Mechanical→Equipment (10 pairs)**

1. **EP-001** WHY: "open face at impact" → HOW: "heel-weighted CG closes the face"
[...all pairs in sequence...]

[...continue for all sequences...]

---

## PATTERN ANALYSIS SUMMARY

### Biggest Findings (Based on 1,000+ Quote Analysis)

| Category | #1 Finding | Count | % |
|----------|-----------|-------|---|
| **Biggest Pain** | SLICE | 94 | 37% of PAIN |
| **Biggest Hope** | STRAIGHT_SHOTS | 62 | 35% of HOPE |
| **Biggest Why** | MECHANICAL_CAUSE | 48 | 39% of ROOT_CAUSE |
| **Biggest How** | DRAW_BIAS_EQUIPMENT | 45 | 39% of COMPETITOR |

### Emotional Distribution
| Emotion | Count | Appears In |
|---------|-------|------------|
| frustration | 156 | PAIN, ROOT_CAUSE, VILLAIN |
| fear | 98 | PAIN, SOLUTIONS_TRIED |
| hope | 65 | HOPE, COMPETITOR |
[...top 10 emotions...]

---

## VALIDATION CHECKLIST

- [ ] All 1,000+ quotes categorized
- [ ] All quotes have physical_tag
- [ ] All quotes have emotional_tags[]
- [ ] 25+ transformation pairs generated
- [ ] 25+ educational pairs generated
- [ ] WEB Analysis complete
- [ ] Now→After Grid complete
- [ ] Language patterns extracted

**STATUS: READY FOR HUMAN REVIEW**
```

**Quote Display Format Rule:**

Quotes MUST be displayed as readable lines, NOT in tables or spreadsheet format:

**CORRECT FORMAT:**
> "Quote text here exactly as collected" — Source [ID] [PRIORITY] [emotional_tag1, emotional_tag2]

**INCORRECT FORMAT (DO NOT USE):**
| ID | Quote | Source | Priority | Tags |
|---|---|---|---|---|
| P-021 | Quote text... | GolfWRX | GOLD | desperation |

The readable line format ensures:
- Quotes flow naturally when reading
- Context is preserved
- Tags are visible but don't interrupt the quote
- Human reviewer can quickly scan and validate

### Output Specifications

#### transformation_pairs.json
```json
{
  "pairs": [
    {
      "pair_id": "TP-001",
      "pain_quote_id": "P-021",
      "pain_quote": "I could probably send the ball 2 fairways to the right",
      "hope_quote_id": "H-113",
      "hope_quote": "Nearly dead-straight draw shots everywhere",
      "theme": "2 Fairways → Straight",
      "transformation_type": "SLICE_TO_STRAIGHT"
    }
  ],
  "total_pairs": 35,
  "validation": {
    "minimum_met": true,
    "all_have_ids": true
  }
}
```

#### educational_pairs.json
```json
{
  "pairs": [
    {
      "pair_id": "EP-001",
      "why_quote": "A slice is caused by an open face to that path at impact",
      "why_quote_id": "RC-021",
      "how_quote": "When you move the CG to the heel, it produces more draw",
      "how_quote_id": "CM-024",
      "sequence_label": "Face Angle → Equipment Solution"
    }
  ],
  "total_pairs": 32,
  "validation": {
    "minimum_met": true,
    "all_have_sequences": true
  }
}
```

#### web_analysis.json
```json
{
  "wants": {
    "GAIN": ["Straight drives", "Distance without sacrifice", "Confidence"],
    "BE": ["Confident driver of the ball", "The guy who finds fairways"],
    "DO": ["Hit fairways consistently", "Step up without dread"],
    "SAVE": ["Strokes from penalty shots", "Embarrassment", "Money"],
    "AVOID": ["Military golf", "90-degree slice", "Adjacent fairways"]
  },
  "emotions": {
    "current_state": ["Frustrated fear", "Chronic embarrassment", "Mental defeat"],
    "desired_state": ["Confident", "In control", "Proud", "Free"]
  },
  "beliefs": {
    "disrupt": [
      {
        "belief": "Equipment can't fix a swing problem",
        "counter": "Show how equipment CAUSES and FIXES the problem"
      }
    ],
    "align": [
      {
        "belief": "I'm a capable golfer held back by one club",
        "validation": "You found it"
      }
    ]
  }
}
```

#### now_after_grid.json
```json
{
  "dimensions": {
    "HAVE": {
      "NOW": "Unpredictable slice, driver anxiety, wasted strokes",
      "AFTER": "Consistent fairway hits, confident tee shots"
    },
    "EXPERIENCE": {
      "NOW": "Dreading every driver shot, tensing up",
      "AFTER": "Stepping up confidently, swinging freely"
    },
    "STATUS": {
      "NOW": "The guy who plays military golf",
      "AFTER": "The guy who stripes it down the middle"
    },
    "FEELING": {
      "NOW": "Fearful, frustrated, embarrassed, defeated",
      "AFTER": "Confident, proud, relaxed, in control"
    }
  },
  "one_line_transformation": "From frustrated slicer to confident fairway finder"
}
```

#### language_patterns.json
```json
{
  "physical_problem_language": {
    "SLICE": ["2 fairways to the right", "90 degree turn", "military golf", "banana ball"],
    "CONFIDENCE": ["mentally prepared to hit a bad shot", "can't trust my driver", "fear of the right side"],
    "DISTANCE": ["15-20 yards shorter", "can't match my 3 wood", "giving up distance"],
    "SOCIAL": ["make a fool of myself", "playing from behind", "hold up the group"],
    "EQUIPMENT": ["many many many drivers", "nothing works", "still looking for the one"]
  },
  "transformation_language": {
    "FROM": ["slice", "chunk", "terrified", "dread", "embarrassed"],
    "TO": ["straight", "glides through", "confident", "anticipate", "proud"]
  },
  "gold_phrases": [
    "2 fairways to the right",
    "90 degree turn",
    "military golf (left, right, left)",
    "mentally prepared to hit a bad shot"
  ]
}
```

#### two_tier_quotes.json
```json
{
  "quotes": [
    {
      "id": "P-021",
      "quote": "I could probably send the ball 2 fairways to the right",
      "bucket": "PAIN",
      "physical_tag": "SLICE",
      "emotional_tags": ["desperation", "severity"],
      "source": "GolfWRX",
      "priority": "GOLD"
    }
  ],
  "total_quotes": 1000,
  "by_physical_tag": {
    "SLICE": 94,
    "CONFIDENCE_COLLAPSE": 58,
    "DISTANCE_INCONSISTENCY": 42
  }
}
```

### Validation Gate 2.5

**CRITICAL:** CANNOT proceed to Layer 3 until ALL outputs exist and pass validation.

```yaml
gate_2_5_validation:
  name: "SYNTHESIS_VALIDATION"
  blocking: true

  checks:
    - artifact: "transformation_pairs.json"
      exists: true
      count_minimum: 25
      structure: "each has pain_id AND hope_id AND theme"

    - artifact: "educational_pairs.json"
      exists: true
      count_minimum: 25
      structure: "each has why_quote AND how_quote"

    - artifact: "web_analysis.json"
      exists: true
      sections: ["wants.GAIN", "wants.BE", "wants.DO", "wants.SAVE", "wants.AVOID"]
      all_populated: true

    - artifact: "now_after_grid.json"
      exists: true
      dimensions: ["HAVE", "EXPERIENCE", "STATUS", "FEELING"]
      each_has: ["NOW", "AFTER"]

    - artifact: "language_patterns.json"
      exists: true
      categories_minimum: 5
      gold_phrases_minimum: 10

    - artifact: "two_tier_quotes.json"
      exists: true
      all_quotes_have: ["physical_tag", "emotional_tags"]

  on_pass:
    action: "Proceed to Layer 3"
    log: "Gate 2.5 PASSED - all synthesis artifacts validated"

  on_failure:
    action: "BLOCK and identify gaps"
    log: "Gate 2.5 FAILED - missing: {list_failures}"
    next_step: "Return to relevant synthesis skill"
```

### On Failure Protocol

If any artifact is missing or below minimum:

1. **BLOCK** progress to Layer 3
2. **IDENTIFY** the specific gap(s)
3. **RETURN** to the relevant synthesis skill:
   - Missing transformation pairs → Run 2.5-A again
   - Missing WEB analysis → Run 2.5-C again
   - Incomplete two-tier tags → Run 2.5-F again
4. **RE-VALIDATE** after synthesis attempt
5. **ONLY PROCEED** when all artifacts pass validation

### Why This Layer Matters

| Without Layer 2.5 | With Layer 2.5 |
|-------------------|----------------|
| Synthesis at handoff (unreliable) | Synthesis before handoff (validated) |
| Missing sections go undetected | Explicit gate catches all gaps |
| FINAL_HANDOFF quality varies | FINAL_HANDOFF is reliable assembly |
| No checkpoint for synthesis work | Synthesis work is checkpointed |
| Template compliance optional | Template compliance enforced |

### Competitor Analysis Preservation (CRITICAL)

The COMPETITOR_MECHANISM bucket contains critical competitive intelligence that MUST be preserved through Layer 2.5:

1. **Competitor mechanisms** - How competing products claim to solve the problem
2. **Competitor offers** - Pricing, guarantees, positioning
3. **What works/doesn't work** - Evidence of competitor effectiveness
4. **Market positioning data** - How competitors frame their solutions

This data is essential for:
- Unique mechanism differentiation (E5 Principle)
- Objection handling (why this is different/better)
- Competitive positioning in copy
- Market gap identification

**SYNTHESIS_VALIDATION.md must include a complete COMPETITOR_MECHANISM section** showing all competitor quotes categorized by subcategory (DRAW_BIAS, MINI_DRIVER, SHORTER_SHAFT, FITTING, etc.) with tallies.

**Reference:** [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Phase 3.5]] - Layer 2.5 Execution

---

## 4.3 Layer 3: Opportunity Surfacing

### Purpose
Identify and prioritize strategic opportunities with execution-ready plans, risk factors, and measurement frameworks.

### Acceptance Criteria

| Criterion | Requirement | Validation |
|-----------|-------------|------------|
| Opportunity Count | 5+ primary opportunities | Count check |
| Confidence Scores | Each opportunity has confidence % | All present |
| Execution Plans | Each opportunity has execution steps | All present |
| Risk Factors | Risks identified with mitigations | Section exists |
| Action Sequence | Immediate/Short/Medium-term timeline | All 3 present |
| Measurement Framework | Leading + Lagging indicators | Both present |

### Layer 3 Output Structure

```markdown
# LAYER 3: OPPORTUNITY SURFACING

## 3.1 STRATEGIC OPPORTUNITY MAP
[Table: Priority, Opportunity, Confidence, Impact]

## 3.2 OPPORTUNITY 1: [NAME]
### The Insight
### Current State
### The Opportunity
### Execution Recommendations
### Success Metrics

[Repeat for each opportunity]

## 3.7 ADDITIONAL OPPORTUNITIES
[Lower priority opportunities]

## 3.8 RISK FACTORS
### Risk 1: [Name]
- Description
- **Mitigation:**
[Repeat for each risk]

## 3.9 RECOMMENDED ACTION SEQUENCE
### Immediate (Week 1-2):
### Short-term (Week 3-6):
### Medium-term (Week 7-12):

## 3.10 MEASUREMENT FRAMEWORK
### Leading Indicators:
### Lagging Indicators:
```

**Reference:** [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Phase 4]] - Layer 3 Execution

---

# SECTION 5: FINAL OUTPUT REQUIREMENTS

## 5.1 Single File Requirement

The final deliverable MUST be a single markdown file: **FINAL_HANDOFF.md**

This file contains:
- Executive Summary
- Complete Layer 1 (all quotes, all tallies, all buckets)
- Complete Layer 2 (all intelligence sections)
- Complete Layer 3 (all opportunities with execution plans)
- Appendices (source list, next steps)

**NO SCATTERED JSON FILES.** All analysis, all quotes, all intelligence in ONE document.

## 5.2 FINAL_HANDOFF.md Schema

```markdown
# [PRODUCT NAME] Deep Research - Final Handoff
## Complete Market Intelligence Package
**Project:** [Product Name] Product Launch
**Generated:** [Date]
**Mode:** Cross-Reference Analysis (PhD-Level)
**Status:** COMPLETE

---

# EXECUTIVE SUMMARY

## Research At A Glance
| Metric | Value |
|--------|-------|
| Total Sources Analyzed | [X] |
| Total Quotes Extracted | [X] |
| Pain Quotes | [X] |
| Hope Quotes | [X] |
| Root Cause Beliefs | [X] |
| Solutions Tried | [X] |
| Competitors Analyzed | [X] |
| Technologies Mapped | [X] |
| Strategic Opportunities | [X] |

## The Core Thesis: [VALIDATED/PARTIALLY VALIDATED/NEW FINDING]
[Key finding summary]

## The Single Biggest Opportunity
[One-paragraph opportunity statement]

---

# LAYER 1: QUANTIFIED SOURCE EXTRACTION
[Full Layer 1 content per Section 4.1]

---

# LAYER 2: MARKET INTELLIGENCE ANALYSIS
[Full Layer 2 content per Section 4.2]

---

# LAYER 3: OPPORTUNITY SURFACING
[Full Layer 3 content per Section 4.3]

---

# APPENDIX A: SOURCE FILES
[List of all scraped sources with descriptions]

# APPENDIX B: NEXT STEPS FOR MARKETING TEAM
[Numbered action items]

---

*Research conducted using Cross-Reference Mode with quantified extraction.*
*All findings validated against multiple sources.*
*Confidence levels indicated for each opportunity.*

**Document Generated:** [Date]
**Total Research Time:** [X hours/sessions]
**Methodology:** Quantified bucket extraction with saturation validation
```

## 5.3 Quality Gate Before Final Output

Before generating FINAL_HANDOFF.md, validate:

- [ ] Total quotes >= 1,000
- [ ] All 4 primary buckets meet minimums
- [ ] All subcategories have top 25 (if 25+ exist)
- [ ] No unresolved cluster ambiguity
- [ ] 5+ competitors analyzed with root cause + mechanism
- [ ] 15+ unique mechanisms mapped
- [ ] All Layer 2 sections complete
- [ ] 5+ opportunities with execution plans
- [ ] All opportunities have confidence scores
- [ ] Risk factors identified
- [ ] Action sequence defined
- [ ] Measurement framework present

**IF ANY CHECK FAILS: Do not generate final output. Return to the relevant layer and complete.**

**Reference:** [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Phase 5]] - Final Handoff Execution

---

# SECTION 6: TOOL RESILIENCE REQUIREMENTS

## 6.1 Scraping Tool Fallback Chain

The system has access to multiple scraping tools. If one fails, AUTOMATICALLY switch to the next.

```yaml
primary_tool: Firecrawl
fallback_1: Apify (apify/rag-web-browser)
fallback_2: Exa (web_search_exa)
fallback_3: Manual source list from human (LAST RESORT)

protocol:
  on_failure:
    - Log: "[Tool] failed for [source/query]: [error]"
    - Switch: Move to next tool in chain
    - Continue: Do not halt, do not wait for human
    - Report: Include tool switches in final scraping summary

  on_all_tools_fail:
    - Log: "All automated tools failed for [source/query]"
    - Continue: Move to next source/query
    - Flag: Add to "manual review needed" list
    - Do not halt entire process for single source failure
```

## 6.2 Platform Blocking Protocol

```yaml
if_platform_blocked:
  reddit_blocked:
    - Switch to: GolfWRX forums, TheSandTrap forums, MyGolfSpy forums
    - Rationale: Same audience, similar content

  youtube_comments_blocked:
    - Switch to: Video transcripts via Firecrawl
    - Alternative: Forum discussions ABOUT YouTube videos

  amazon_blocked:
    - Switch to: Golf Galaxy reviews, PGA Superstore reviews
    - Alternative: Forum threads discussing product reviews

  general_rule:
    - Identify equivalent source with same audience
    - Continue without human intervention
    - Document substitution in scraping summary
```

## 6.3 Rate Limiting Protocol

```yaml
if_rate_limited:
  - Switch to different tool immediately
  - Queue original tool for retry after cooldown
  - Continue with different sources while waiting
  - NEVER wait idle - always be scraping something
```

## 6.4 Session Persistence

```yaml
on_session_timeout_or_interruption:
  - Save: Current quote count, bucket tallies, sources scraped
  - Save: Context expansion state, current layer, current step
  - File: checkpoint.yaml in project folder

on_session_resume:
  - Load: checkpoint.yaml
  - Validate: What was completed, what remains
  - Continue: From exact point of interruption
  - NEVER restart from beginning
```

**Reference:** [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Error Handling]] - Resilience Execution

---

# SECTION 7: AUTONOMOUS EXECUTION RULES

## 7.1 When to Continue Without Human

The system MUST continue automatically when:

| Scenario | Action |
|----------|--------|
| Scraping completes successfully | → Proceed to extraction |
| Extraction meets minimums | → Proceed to quantification |
| Quantification shows saturation | → Proceed to Layer 2 |
| Layer 2 sections complete | → Proceed to Layer 3 |
| Layer 3 opportunities identified | → Generate final handoff |
| Tool fails | → Switch to fallback tool, continue |
| Platform blocked | → Switch to equivalent source, continue |
| Rate limited | → Switch tools, continue elsewhere |

## 7.2 When to Pause for Human

The system MUST pause ONLY at these checkpoints:

| Checkpoint | Trigger | Human Action Required |
|------------|---------|----------------------|
| Checkpoint 1 | After source validation, before expensive scraping | Approve source list OR modify |
| Checkpoint 3 | Low-confidence items in Layer 2 (<60%) | Review flagged items, approve or modify |
| Budget Exceeded | Projected cost exceeds allocated budget | Approve additional spend OR reduce scope |
| All Tools Failed | No scraping tool can access a CRITICAL source | Provide manual data OR approve skip |

**CRITICAL**: "Phase complete, should I continue?" is NOT a valid checkpoint. The system continues automatically unless a BLOCKING condition is met.

## 7.3 Self-Validation Gates

Before proceeding to next layer, the system validates:

### Gate 1: Layer 1 → Layer 2

**HARD BLOCKERS (CRITICAL - ANTI-FABRICATION)**

```yaml
hard_blockers:
  CRITICAL: These conditions MUST halt execution. NO EXCEPTIONS.

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

**Standard Validation:**
```yaml
validate:
  - total_quotes >= 1000
  - pain_quotes >= 300
  - hope_quotes >= 250
  - root_cause_quotes >= 200
  - solutions_tried_quotes >= 150
  - competitors_analyzed >= 5
  - mechanisms_mapped >= 15
  - saturation_achieved == true

if_any_fail:
  - Identify which criterion failed
  - Expand search in that area
  - Continue scraping until criterion met
  - DO NOT proceed to Layer 2
  - DO NOT ask human for permission to continue
```

### Gate 2: Layer 2 → Layer 3
```yaml
validate:
  - competitive_landscape: complete
  - customer_profile: complete (demographics + psychographics + emotional)
  - customer_journey: complete (4 stages)
  - messaging_framework: complete (narrative + hierarchy)
  - voice_of_customer: complete (do's + don'ts)
  - objections: >= 4 with counters
  - testimonial_templates: >= 3

if_any_fail:
  - Identify which section incomplete
  - Complete that section
  - DO NOT proceed to Layer 3
  - DO NOT ask human
```

### Gate 3: Layer 3 → Final Handoff
```yaml
validate:
  - opportunities: >= 5 with execution plans
  - confidence_scores: all present
  - risk_factors: identified
  - action_sequence: defined
  - measurement_framework: present

if_any_fail:
  - Complete the missing elements
  - DO NOT generate final handoff
  - DO NOT ask human
```

## 7.4 Never Ask Permission For:

- Continuing to the next phase when gates pass
- Switching tools when one fails
- Expanding search when minimums not met
- Completing a section that's incomplete
- Generating the final output when all criteria met

## 7.5 Always Ask Permission For:

- Spending beyond allocated budget
- Skipping a critical source that all tools cannot access
- Proceeding when confidence is very low (<50%) on majority of opportunities
- Modifying the research brief or scope

**Reference:** [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Execution Sequence]] - Autonomous Execution Flow

---

# SECTION 8: CROSS-REFERENCE MAP

## 8.1 PRD → Master Agent References

| PRD Section | Master Agent Reference |
|-------------|----------------------|
| Section 2: Contextual Expansion | [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Phase 2 Step 1.0]] |
| Section 3: Quote Requirements | [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Step 1.5]] |
| Section 3.4: Saturation Analysis | [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Step 1.5-D]] |
| Section 4.1: Layer 1 Requirements | [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Phase 2]] |
| Section 4.2: Layer 2 Requirements | [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Phase 3]] |
| Section 4.3: Layer 3 Requirements | [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Phase 4]] |
| Section 5: Final Output | [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Phase 5]] |
| Section 6: Tool Resilience | [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Error Handling]] |
| Section 7: Autonomous Execution | [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Execution Sequence]] |

## 8.2 Master Agent → PRD References

The Master Agent should reference this PRD for:
- All minimum volume requirements
- All acceptance criteria
- All quality gates
- All output schemas
- All validation checklists

**The PRD is the source of truth for WHAT. The Master Agent is the source of truth for HOW.**

---

# SECTION 9: VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 15, 2026 | Initial creation (implicit in Master Agent) |
| 2.0 | Jan 16, 2026 | Extracted from ONE.1 Wedge learnings |
| 3.0 | Jan 16, 2026 | Full PRD with contextual expansion, dynamic minimums, saturation analysis, autonomous execution rules |
| 3.1 | Jan 17, 2026 | Added E5 methodology integration: Prospect Examination (6 tools), Competitor Examination (offers, villains), Product Examination (benefit dimensionalization) |
| 3.2 | Jan 17, 2026 | Added Rich Schefren spec elements: Scope definition, Decision Rules, Dependencies, Risks & Mitigations; Added NAME + ARTICULATION format for mechanisms; Added Villain extraction requirements |
| **3.3** | **Jan 17, 2026** | **ANTI-FABRICATION UPDATE:** Added Rule 5 (Mandatory Confidence Calculation Formula with blockers); Added Section 3.5 (Numbered Quote System - MANDATORY); Added Section 3.6 (Pair Extraction Requirement - MANDATORY with Pain→Hope and Why→How pairs); Added Hard Blockers to Gate 1 with anti-fabrication enforcement; Updated Layer 1 Output Structure to include pairs and villain data; Updated Checklist B with new mandatory requirements. **Root cause:** Agent fabricated validation pass with 18% of required quotes. These additions prevent future fabrication. |
| **3.4** | **Jan 18, 2026** | **CONSISTENT DEPTH ENFORCEMENT:** Added Section 3.8 (Bucket Section Template Reference - MANDATORY); Updated Section 3.4 to require Top 25 verbatim for ALL 6 buckets (not just PAIN/HOPE); Added two-tier categorization requirement (Physical Problem + Emotional Tag); Added BUCKET_SECTION_TEMPLATE.md as mandatory reference for all bucket sections; Updated Checklist B with bucket section depth requirements (minimum 80 lines per section); Added GOLD quote prioritization rules. **Root cause:** PAIN section had 200+ lines while ROOT_CAUSE had 10 lines - inconsistent depth makes research unusable. |

---

# SECTION 10: APPENDIX - VALIDATION CHECKLISTS

## Checklist A: Context Expansion Validation
- [ ] Product identified
- [ ] Category identified
- [ ] Context (broader domain) identified
- [ ] Primary research topics listed (10+)
- [ ] Equipment-specific topics listed
- [ ] Competitor context topics listed
- [ ] Source types identified for each topic area
- [ ] Instructional/educational content included
- [ ] Emotional/psychological topics included

## Checklist B: Layer 1 Completion
- [ ] Total quotes >= 1,000
- [ ] Pain quotes >= 300 with subcategories
- [ ] Hope quotes >= 250 with subcategories
- [ ] Root cause quotes >= 200 with subcategories
- [ ] Solutions tried quotes >= 150 with subcategories
- [ ] Top 25 verbatim for each subcategory (if 25+ exist) **IN ALL 6 BUCKETS**
- [ ] **All quotes numbered with IDs (P-XXX, H-XXX, RC-XXX, ST-XXX, V-XXX)**
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

## Checklist B.1: Bucket Section Depth Validation (MANDATORY)

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

## Checklist C: Layer 2 Completion
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

## Checklist D: Layer 3 Completion
- [ ] 5+ opportunities identified
- [ ] Each opportunity has insight
- [ ] Each opportunity has current state
- [ ] Each opportunity has execution recommendations
- [ ] Each opportunity has success metrics
- [ ] Each opportunity has confidence score
- [ ] Risk factors identified
- [ ] Each risk has mitigation
- [ ] Action sequence defined (immediate/short/medium)
- [ ] Leading indicators defined
- [ ] Lagging indicators defined

## Checklist E: Final Handoff Validation
- [ ] Single markdown file
- [ ] Executive summary present
- [ ] Research metrics table present
- [ ] Core thesis statement present
- [ ] Biggest opportunity statement present
- [ ] Full Layer 1 content included
- [ ] Full Layer 2 content included
- [ ] Full Layer 3 content included
- [ ] Appendix A (sources) present
- [ ] Appendix B (next steps) present
- [ ] All checklists A-D passed

---

**END OF PRD**

**Related Document:** [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT]]
