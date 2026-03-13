# QUALITY STANDARDS FRAMEWORK
## Universal Benchmark for Deep Research System v2

**Version:** 2.0
**Created:** January 17, 2026
**Last Updated:** January 17, 2026
**Applies To:** All skills, processes, and outputs in the Deep Research System
**Related Documents:** [[Deep-Research-v2/RESEARCH-PRD]], [[Deep-Research-v2/MASTER-AGENT]]

---

## THE CORE BENCHMARK

> "This process is intended to do the work of an entire nine-figure research team. This cannot be surface-level basic research that could be done in five minutes with a Google search."

**The Standard:** Would a $100M+ company's dedicated research team produce this? If not, it's not done.

---

## PART 1: EVIDENCE VOLUME REQUIREMENTS

### The Math of Confidence

| Evidence Count | Quality Level | Action |
|----------------|---------------|--------|
| < 50 | Garbage | Cannot proceed - expand immediately |
| 50-100 | Insufficient | Cannot make confident claims |
| 100-500 | Getting There | May proceed with heavy caveats |
| 500-1,000 | Acceptable Minimum | Can make moderate confidence claims |
| 1,000+ | Target Standard | Required for strategic decisions |
| 2,000+ | Excellence | Enables PhD-level defensibility |

### Why This Matters

If you're making claims about a market with thousands or millions of participants, you need proportional evidence to have statistical validity. 47 quotes about a market segment tells you almost nothing about that segment.

### Process-Specific Minimums

| Process | Minimum Evidence | Target Evidence |
|---------|------------------|-----------------|
| Deep Research | 1,000 quotes | 2,000+ quotes |
| Big Idea Development | 100 market examples | 250+ examples |
| Mechanism Development | 15 competitor mechanisms | 30+ mechanisms |
| Audience Analysis | 500 customer quotes | 1,000+ quotes |
| Competitive Analysis | 25 competitors mapped | 50+ competitors |

---

## PART 2: QUANTIFICATION OVER QUALIFICATION

### The Non-Negotiable Rule

**NEVER** use vague qualifiers. **ALWAYS** use exact counts.

#### Prohibited Language

- "Many customers..."
- "Most prospects..."
- "A significant number..."
- "Often mentioned..."
- "Frequently cited..."
- "Common themes include..."
- "Several people said..."
- "It appears that..."

#### Required Language

- "412 of 847 pain quotes (48.6%) mention [specific problem]"
- "73% of 1,247 quotes reference [specific concern]"
- "Only 12 of 156 competitor mechanisms address..."
- "Zero mentions found across 2,341 quotes for..."
- "The top 3 pain points represent 67% of all mentions"

### Quantification Creates

1. **Prioritization** - What's actually biggest vs. what feels big
2. **Defensibility** - Numbers can't be argued, feelings can
3. **Precision** - No room for interpretation error
4. **Comparison** - Can stack rank opportunities objectively
5. **Credibility** - Claims backed by data command respect

### Implementation: The Tally Protocol

At every analysis stage, produce tallies in this format:

```
CATEGORY: [Name]
├── Total Quotes: [N]
├── Subcategory A: [n] ([%])
├── Subcategory B: [n] ([%])
├── Subcategory C: [n] ([%])
└── Other/Uncategorized: [n] ([%])
```

---

## PART 3: PARALLEL BUCKET STRUCTURE

### The Principle

Every category needs its opposite. Analysis without parallel correlation misses half the picture.

### Required Pairings

| Primary Bucket | Parallel Bucket | Insight Generated |
|----------------|-----------------|-------------------|
| Pain Quotes | Hope Quotes | What hurts → What they dream of |
| Why It Hurts | How It Works | Problem mechanism → Solution mechanism |
| Root Cause Claims | Solutions Tried | What market says causes it → What they've tried |
| What Competitors Claim | What's Actually Missing | Saturated positioning → Open territory |
| Current State | Desired State | Before picture → After picture |
| Objections | Proof Elements | Resistance → Evidence that overcomes |
| What They Hate | What They Love | Villain extraction → Hero positioning |

### The Gap Between Pairs = Opportunity

When you map Pain against Hope, the mismatch reveals:
- Pains without corresponding hopes (unacknowledged desires)
- Hopes without corresponding pains (aspirational whitespace)
- Mismatched intensity (pain is 10, hope is 2 = massive opportunity)

### Implementation: Correlation Matrix

For every analysis, produce:

```
CORRELATION MATRIX: Pain ↔ Hope

| Pain Category | Count | Corresponding Hope | Count | Gap Score |
|---------------|-------|-------------------|-------|-----------|
| [Pain 1] | [n] | [Hope 1] | [n] | [difference] |
| [Pain 2] | [n] | [Hope 2] | [n] | [difference] |
| ...
```

Gap Score = Hope Count - Pain Count
- Negative = Pain underserved by hope messaging
- Positive = Hope messaging without pain acknowledgment

---

## PART 4: COMPETITOR INTELLIGENCE REQUIREMENTS

### The Massive Gap We Fixed

Research that ignores competitor positioning is only half the picture. You must map:

1. **Claimed Root Causes** - What do competitors SAY is causing the problem?
2. **Unique Mechanisms** - What do they claim SOLVES it that differentiates them?
3. **Saturation Level** - How many are using each claim/mechanism?
4. **Territory Gaps** - What is NO ONE saying?

### Mechanism Mapping Protocol

For every market/product analyzed:

```
COMPETITOR MECHANISM MAP

| Mechanism | Description | Competitors Using | Saturation |
|-----------|-------------|-------------------|------------|
| [Name] | [What it claims] | [List] | High/Med/Low |
| ... | ... | ... | ... |

CLAIMED ROOT CAUSES

| Root Cause | Description | Competitors Claiming | Saturation |
|------------|-------------|---------------------|------------|
| [Name] | [What they say causes problem] | [List] | High/Med/Low |
| ... | ... | ... | ... |

WHITESPACE ANALYSIS

| Territory | Why It's Open | Opportunity Score |
|-----------|---------------|-------------------|
| [Gap 1] | [Explanation] | [1-10] |
| ... | ... | ... |
```

### Minimum Competitor Coverage

| Process | Competitors | Mechanisms | Root Causes |
|---------|-------------|------------|-------------|
| Deep Research | 25+ | 15+ unique | 10+ unique |
| Big Ideas | 50+ examples | 20+ patterns | 15+ angles |
| Mechanisms | 30+ mapped | 20+ documented | 15+ analyzed |

### Mechanism Documentation Format (NAME + ARTICULATION)

Every mechanism must be documented with two components:

**NAME Object:**
```yaml
name:
  primary: [The branded name]
  category: [Type of mechanism]
  owner: [Who created/owns it]
```

**ARTICULATION Object:**
```yaml
articulation:
  how_it_works: [Plain language explanation]
  key_differentiator: [What makes it unique]
  proof_elements: [What evidence supports it]
  vulnerability: [Where the claim is weak]
```

---

## PART 5: SELF-VALIDATION GATES

### The Principle

The system must validate its own outputs before proceeding. No human should have to catch basic errors.

### Gate Questions (Must Answer YES to All)

**Volume Gate:**
- [ ] Do we have minimum evidence count for this process?
- [ ] Have we exhausted reasonable source expansion?
- [ ] Do all buckets meet their individual minimums?

**Quantification Gate:**
- [ ] Are all claims backed by specific counts?
- [ ] Have we eliminated vague qualifiers?
- [ ] Can we defend every number with source data?
- [ ] Are percentages calculated against clear denominators?

**Parallel Structure Gate:**
- [ ] Have we mapped all required bucket pairs?
- [ ] Have we analyzed the gaps between pairs?
- [ ] Are correlations documented?
- [ ] Is the correlation matrix complete?

**Competitor Gate:**
- [ ] Have we mapped competitor mechanisms (15+)?
- [ ] Have we documented claimed root causes?
- [ ] Have we identified whitespace?
- [ ] Is the NAME + ARTICULATION format used?

**Defensibility Gate:**
- [ ] Would this pass PhD committee scrutiny?
- [ ] Can every claim trace to source material?
- [ ] Is there evidence a skeptic couldn't dismiss?
- [ ] Would a hostile reviewer find gaps?

**Terminology Gate (Market-Specific):**
- [ ] Are we using market-appropriate terminology throughout?
- [ ] Does language match how prospects actually speak?
- [ ] Have we avoided generic marketing jargon?

### If ANY Gate Fails

1. **STOP** - Do not produce output
2. **IDENTIFY** - Which gate failed and why
3. **EXPAND** - Gather more evidence/do more analysis
4. **RE-RUN** - Complete the gate check again
5. **ONLY PROCEED** - When all gates pass

---

## PART 6: VERBATIM QUOTE REQUIREMENTS

### The Principle

Paraphrased insights are interpretations. Verbatim quotes are evidence. The difference is courtroom-grade.

### Required Quote Documentation

For every major claim or category:
- **Minimum 25 verbatim quotes** as proof
- Quotes must be **exact** - no paraphrasing
- Each quote must have **source attribution**
- Quotes must **directly support** the claim

### Quote Quality Hierarchy

| Level | Description | Use For |
|-------|-------------|---------|
| Gold | Exact verbatim, verified source, high specificity | Primary evidence |
| Silver | Exact verbatim, verified source, moderate specificity | Supporting evidence |
| Bronze | Exact verbatim, unverified source | Context only |
| Invalid | Paraphrased or no source | DO NOT USE |

### Specificity Markers (Increase Quote Value)

- Dollar amounts mentioned (+1)
- Time frames mentioned (+1)
- Product names mentioned (+1)
- Numbers/measurements mentioned (+1)
- Emotional intensity markers (+1)
- Specific outcomes described (+1)
- Before/after comparison (+2)

### Format Standard

```
SUPPORTING QUOTES: [Category Name]

1. "[Exact quote text]"
   - Source: [Platform/Location]
   - Date: [If available]
   - Context: [Brief context if needed]
   - Specificity Score: [1-10]
   - Relevance: [Why this proves the claim]

2. "[Exact quote text]"
   ...
```

---

## PART 7: DYNAMIC EXPANSION PROTOCOL

### The Principle

Ambiguity triggers more research, not assumptions. The system escalates before it settles.

### Expansion Triggers

| Trigger | Definition | Action |
|---------|------------|--------|
| Ambiguous Cluster | Category has < 70% agreement | Expand sources, re-cluster |
| Thin Evidence | Any bucket < minimum threshold | Expand sources for that bucket |
| Missing Sources | Obvious source type not searched | Add source type, re-run |
| Outlier Patterns | < 5 quotes in a potential category | Investigate if real or noise |
| Competitor Gap | < 15 mechanisms mapped | Expand competitor analysis |
| Topic Gap | Research topic with < 50 quotes | Targeted expansion for topic |

### The Expansion Loop

```
START
  ↓
[Analyze Current Data]
  ↓
[Run Validation Gates] ──NO──→ [Identify Failure]
  ↓ YES                              ↓
[Proceed]                    [Trigger Expansion]
                                     ↓
                             [Gather More Data]
                                     ↓
                             [Return to START]
```

### Maximum Expansion Cycles

| Process | Max Cycles Before Human Review |
|---------|-------------------------------|
| Layer 1 (Research) | 3 cycles |
| Layer 2 (Analysis) | 2 cycles |
| Layer 3 (Opportunities) | 2 cycles |

If max cycles reached without gate pass → Flag for human intervention

### Expansion Query Generation

When expansion is triggered, generate queries specifically for the gap:

```
EXPANSION TRIGGER: [Bucket/Topic]
CURRENT COUNT: [N]
REQUIRED MINIMUM: [M]
GAP: [M - N]

EXPANSION QUERIES:
1. [Targeted query 1]
2. [Targeted query 2]
3. [Targeted query 3]
...

EXPANSION SOURCES:
1. [New source to try]
2. [Alternative platform]
...
```

---

## PART 8: OUTPUT FORMATTING STANDARDS

### Every Output Must Include

1. **Executive Summary** - Key findings in < 500 words
2. **Evidence Statistics** - Counts, sources, coverage
3. **Quantified Findings** - All claims with numbers
4. **Correlation Analysis** - Parallel bucket insights
5. **Competitor Map** - Mechanisms and root causes
6. **Gap Analysis** - Whitespace opportunities
7. **Supporting Quotes** - 25+ per major claim
8. **Validation Checklist** - All gates documented

### Quality Markers

Every document header should include:

```
---
Quality Validation:
- Total Evidence Count: [N]
- Source Types: [List]
- Buckets Complete: [Yes/No for each]
- Validation Gates Passed: [Yes/No for each]
- Expansion Cycles: [N]
- Confidence Level: [Low/Medium/High/Very High]
- Market Configuration: [Market name from config]
---
```

### Confidence Level Definitions

| Level | Definition |
|-------|------------|
| Very High | 2,000+ quotes, all gates pass, saturation achieved |
| High | 1,000+ quotes, all gates pass, minor gaps documented |
| Medium | 500-1,000 quotes, most gates pass, some expansion needed |
| Low | <500 quotes, gates failing, significant expansion required |

---

## PART 9: TOOL RESILIENCE STANDARDS

### The Principle

Tool failures are expected. The system adapts, not halts.

### Tool Fallback Chain

```
PRIMARY: Firecrawl
    ↓ (on failure)
FALLBACK 1: Apify
    ↓ (on failure)
FALLBACK 2: Perplexity
    ↓ (on failure)
FALLBACK 3: Manual source list
```

### Platform-Specific Requirements

| Platform | Required Tool | Why |
|----------|---------------|-----|
| Reddit | Apify ONLY | Firecrawl blocked |
| YouTube | Apify 3-step | Comments require special handling |
| Social (IG/TikTok) | Apify ONLY | Firecrawl cannot access |
| Forums | Firecrawl primary | Most reliable for forums |
| Competitor sites | Firecrawl primary | Full page scraping |

### Failure Response Protocol

**Single Source Failure:**
- Log failure
- Add to fallback queue
- Continue with other sources
- DO NOT halt

**Tool Failure:**
- Log tool failure
- Switch to next in fallback chain
- Continue scraping
- DO NOT halt

**Catastrophic Failure (>50%):**
- Halt execution
- Generate failure report
- Escalate to human

### Success Metrics

- Primary tool success rate: Target >80%
- Fallback trigger rate: Target <20%
- Source completion rate: Target >95%
- Manual intervention rate: Target <5%

---

## PART 10: THE MINDSET STANDARDS

### What "Done" Means

❌ "I produced an output file"
✅ "I produced an output that passes all validation gates and would serve a $100M company's strategic decisions"

### What "Good Enough" Means

❌ "It has some evidence"
✅ "It has MORE evidence than a dedicated research team could reasonably gather, organized better, with clearer insights"

### What "Validated" Means

❌ "I checked that it looks reasonable"
✅ "Every claim traces to source, every number is verified, every conclusion survives adversarial challenge"

### The Bar

If you have to ask "is this good enough?" - it's not.

When it's truly good enough, you'll know because:
- The evidence is overwhelming
- The numbers tell a clear story
- The gaps are obvious
- The opportunities are unmistakable
- A skeptic couldn't dismiss it
- An expert would nod in recognition

### The Ultimate Test

> "If this were submitted anonymously alongside work from the best research teams in the world, would it be recognizable as exceptional—or would it blend into the competent middle?"

The gap between those reactions is where all the value lives.

---

## PART 11: E5 METHOD QUALITY REQUIREMENTS

### E5 Tool Completion Standards

| E5 Tool | Required Output | Minimum Evidence |
|---------|-----------------|------------------|
| WEB Analysis | Wants, Emotions, Beliefs | 25+ quotes per category |
| Belief Excavator | WHY, WHAT, WHO, HOW | 4 categories populated |
| Promise Exposure | Stage 1-5 diagnosis | Supporting evidence documented |
| Now-After Grid | 4 quadrants complete | 10+ entries per quadrant |
| Ideal Client Outcome | Success story constructed | Verbatim evidence cited |
| Magic Wand | Blue-sky desires | 5+ specific desires |
| Benefit Dimensionalizer | Full chain documented | Functional → Dimensionalized → Emotional |
| Villain Extraction | Inventory populated | 10+ items per category |
| Competitor Offer | Full documentation | Per-competitor breakdown |
| Objection Handler | CPT responses | 3-5 per opportunity |

### CPT Response Quality

Every objection response must include:

**C - CLAIM:** Direct counter-statement that addresses the objection head-on
**P - PROOF:** Specific evidence supporting the claim (quotes, data, examples)
**T - TRANSITION:** Why this matters to the prospect (benefit connection)

Quality criteria:
- No generic responses
- Uses prospect language from quotes
- Proof is specific, not general
- Transition connects to emotional benefit

---

## PART 12: MARKET ADAPTATION STANDARDS

### Market Configuration Completeness

Every project must have a complete market_config.yaml with:

| Section | Required Elements |
|---------|-------------------|
| Terminology | Customer, problem, product terms |
| Platforms | Tier 1, 2, 3 with tool assignments |
| Aspects | 5 market-specific categories |
| Competitors | Known players + terminology |
| Emotional Context | Fears, frustrations, hopes, identity |
| Query Patterns | Templates for each query type |

### Terminology Consistency Check

Throughout all outputs:
- [ ] Customer term used consistently
- [ ] Problem term used consistently
- [ ] Product term used consistently
- [ ] No generic marketing jargon
- [ ] Language matches prospect voice

### Platform Effectiveness Tracking

After each project, document:
- Which platforms yielded highest-value quotes
- Which platforms had access issues
- Recommendations for future projects in this market

---

## IMPLEMENTATION CHECKLIST

For any new process or skill being built:

- [ ] Define minimum evidence thresholds
- [ ] Establish bucket structure with parallel pairs
- [ ] Create quantification templates
- [ ] Build competitor mapping requirements
- [ ] Design validation gates
- [ ] Set expansion triggers
- [ ] Document output format standards
- [ ] Create quality marker templates
- [ ] Include market adaptation hooks
- [ ] Test against real use case
- [ ] Iterate until PhD-level defensibility achieved

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-17 | Initial framework derived from PG research overhaul |
| 2.0 | 2026-01-17 | Upgraded to agnostic version. Added E5 quality requirements, market adaptation standards, tool resilience standards, expanded validation gates. |

---

## ATTRIBUTION

This framework synthesizes:
- **PG Deep Research v3.0/v3.2:** Volume requirements, bucket structure, mechanism mapping, expansion protocols
- **E5 Methodology:** Power verbs, session protocols, micro-skill architecture, CPT objection handling
- **Todd Brown Method:** Market sophistication, benefit dimensionalization, villain extraction

The combined standard: **PhD-level research that serves nine-figure business decisions.**
