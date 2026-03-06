# Layer 3: Discovery + Generation

**Layer:** 3
**Type:** Research + Recommendation
**Purpose:** Find external proof and recommend proof creation
**Inputs:** Gap analysis from Layer 2

---

## PART A: DISCOVERY OPERATION

### Discovery Protocol

For each gap identified, search for external proof:

```
FOR each gap in gap_priorities:
    1. Determine search strategy based on category
    2. Execute search (web, databases, literature)
    3. Evaluate findings for credibility and relevance
    4. Package discoveries with citations
```

---

### Category-Specific Discovery Strategies

#### SOCIAL Gaps

**Search for:**
- Industry review aggregators
- Product comparison sites
- Social media mentions
- Forum discussions
- Competitor testimonials (for market benchmarks)

**Evaluation criteria:**
- Authenticity (real vs. fake reviews)
- Relevance (same problem/audience)
- Recency (recent > dated)

---

#### AUTHORITY Gaps

**Search for:**
- PubMed / medical literature
- Academic databases
- Industry journals
- Expert interviews / quotes
- Certification bodies

**Evaluation criteria:**
- Study quality (peer-reviewed > company-funded)
- Sample size
- Methodology rigor
- Relevance to mechanism/claim

---

#### DEMONSTRATION Gaps

**Search for:**
- YouTube demonstrations
- Product comparison videos
- Before/after galleries
- Competitor demonstrations (for benchmarking)

**Evaluation criteria:**
- Visual quality
- Authenticity
- Transferability (can we create similar?)

---

#### MECHANISM Gaps

**Search for:**
- Scientific papers on the mechanism
- Ingredient/component research
- Expert explanations
- Patent citations
- Analogous mechanism proofs

**Evaluation criteria:**
- Scientific validity
- Explanation clarity
- Authority of source
- Direct applicability

---

#### DATA Gaps

**Search for:**
- Industry statistics
- Market research reports
- Government data (CDC, FDA, etc.)
- Academic surveys
- Competitor claims (for benchmarking)

**Evaluation criteria:**
- Source credibility
- Recency
- Specificity
- Direct relevance

---

#### RISK REVERSAL Gaps

**Search for:**
- Industry standard guarantees
- Competitor guarantee analysis
- Best practices in niche

**Note:** Risk reversal is usually CREATED not discovered — focus on Generation.

---

### Discovery Output Format

```yaml
discoveries:
  mechanism:
    - discovery_id: "DISC-001"
      type: "study"
      title: "Effects of [ingredient] on [condition]: A meta-analysis"
      source: "Journal of Clinical Nutrition, 2023"
      key_finding: "Meta-analysis of 12 studies (n=1,847) found 34% improvement..."
      relevance_score: 8
      credibility_score: 9
      citation: "Smith et al., J Clin Nutr, 2023;45(3):112-120"
      usability: "Can cite directly in mechanism section"

    - discovery_id: "DISC-002"
      type: "expert_quote"
      expert: "Dr. Jane Smith, Stanford University"
      credentials: "PhD Biochemistry, 25+ years research"
      quote: "The mechanism works by..."
      source: "Interview, Health Magazine, Jan 2024"
      relevance_score: 7
      credibility_score: 8

  data:
    - discovery_id: "DISC-003"
      type: "statistic"
      stat: "78% of adults report [problem]"
      source: "CDC National Health Survey, 2023"
      relevance_score: 9
      credibility_score: 10
      citation: "CDC NHIS, 2023"

  analogous_proof:
    - discovery_id: "DISC-004"
      mechanism_proven: "[Similar compound] shown to work via same pathway"
      original_study: "Published in Nature, 2022"
      how_it_applies: "Our compound uses identical mechanism..."
      strength_of_analogy: "strong"
```

---

## PART B: GENERATION OPERATION

### Generation Protocol

For gaps that Discovery couldn't fill, recommend proof to CREATE:

```
FOR each unfilled_gap:
    1. Determine what proof would fill the gap
    2. Assess feasibility (can client create this?)
    3. Estimate impact (how much would this help?)
    4. Prioritize by impact/effort ratio
```

---

### Category-Specific Generation Recommendations

#### SOCIAL Generation

| Recommendation | Description | Effort | Impact |
|----------------|-------------|--------|--------|
| Testimonial request campaign | Email existing customers for stories | Low | High |
| Video testimonial incentive | Offer discount for video testimonials | Medium | High |
| Case study development | Deep-dive interview with best customers | Medium | High |
| Review solicitation | Ask for platform reviews | Low | Medium |

**Implementation guidance:**
```
testimonial_collection_guide:
  questions_to_ask:
    - "What was your situation before using [product]?"
    - "What specific results have you seen?"
    - "What would you tell someone considering this?"

  what_makes_strong_testimonial:
    - Specific numbers/results
    - Named and attributed
    - Emotional transformation story
    - Before/after comparison
```

---

#### AUTHORITY Generation

| Recommendation | Description | Effort | Impact |
|----------------|-------------|--------|--------|
| Commission independent study | Fund third-party research | High | Very High |
| Expert endorsement outreach | Contact relevant experts | Medium | High |
| Certification pursuit | Get relevant certifications | Medium | Medium |
| Credential documentation | Document existing credentials better | Low | Medium |

---

#### DEMONSTRATION Generation

| Recommendation | Description | Effort | Impact |
|----------------|-------------|--------|--------|
| Before/after photo collection | Ask customers for photos | Low | Very High |
| Product demonstration video | Create professional demo | Medium | High |
| Side-by-side comparison | Compare to alternatives | Medium | High |
| Live demonstration event | Real-time proof event | High | Very High |

---

#### MECHANISM Generation

| Recommendation | Description | Effort | Impact |
|----------------|-------------|--------|--------|
| Mechanism explainer video | Visualize how it works | Medium | High |
| Expert explanation interview | Get expert to explain mechanism | Medium | High |
| Scientific advisory board | Form credibility panel | High | Very High |
| White paper development | Document the science | Medium | High |

---

#### DATA Generation

| Recommendation | Description | Effort | Impact |
|----------------|-------------|--------|--------|
| Customer survey | Collect aggregate results | Low | Medium |
| Usage analytics | Track actual customer outcomes | Low | High |
| A/B testing documentation | Document performance data | Medium | High |
| Third-party measurement | Independent data collection | High | Very High |

---

#### RISK REVERSAL Generation

| Recommendation | Description | Effort | Impact |
|----------------|-------------|--------|--------|
| Extended guarantee | Increase guarantee period | Low | High |
| Conditional guarantee | Add specific result guarantee | Low | High |
| Free trial implementation | Add risk-free trial | Medium | Very High |
| Keep-the-bonus policy | Let them keep something even if return | Low | Medium |

---

### Generation Output Format

```yaml
generation_plan:
  high_priority:
    - recommendation_id: "GEN-001"
      category: "mechanism"
      what_to_create: "Expert explanation video with Dr. [Name]"
      why_critical: "Stage 3 market requires mechanism proof; currently missing"
      how_to_execute:
        - "Identify 3 relevant experts in field"
        - "Outreach with interview request"
        - "Prepare questions focused on mechanism"
        - "Record video explanation"
      estimated_effort: "medium"
      estimated_impact: "high"
      timeline: "2-4 weeks"

    - recommendation_id: "GEN-002"
      category: "social"
      what_to_create: "Specific result testimonials (with numbers)"
      why_critical: "Current testimonials lack specificity"
      how_to_execute:
        - "Send testimonial request to top 100 customers"
        - "Use guided questions to get specific results"
        - "Offer incentive for detailed responses"
      estimated_effort: "low"
      estimated_impact: "high"
      timeline: "1-2 weeks"

  medium_priority:
    - recommendation_id: "GEN-003"
      category: "demonstration"
      what_to_create: "Before/after photo gallery"
      why_critical: "No visual proof of results currently"
      how_to_execute: [...]
      estimated_effort: "low"
      estimated_impact: "medium"
      timeline: "ongoing"

  nice_to_have:
    - recommendation_id: "GEN-004"
      category: "risk_reversal"
      what_to_create: "Extended 365-day guarantee"
      why_critical: "Would strengthen close significantly"
      how_to_execute: [...]
      estimated_effort: "low"
      estimated_impact: "medium"

  total_gap_coverage:
    gaps_filled_by_discovery: 2
    gaps_requiring_generation: 3
    estimated_time_to_full_coverage: "4-6 weeks"
```

---

## HANDOFF TO LAYER 4

Pass to Layer 4 (Ranking):

1. **Merged inventory** — Original elements + discoveries
2. **Generation plan** — For downstream reference (what's coming)
3. **Updated gap status** — What's still missing
4. **Promise ceiling update** — May have changed with discoveries
