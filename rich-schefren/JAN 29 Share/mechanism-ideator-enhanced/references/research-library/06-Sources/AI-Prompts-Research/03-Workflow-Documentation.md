# AI Mechanism Workflow Documentation

> Complete workflows for mechanism development, from research to deployment. These workflows power the Mechanism Creator skill and integrate with copywriting automation.

---

## Table of Contents

1. [End-to-End Mechanism Development](#end-to-end-mechanism-development)
2. [Research-to-Mechanism Pipeline](#research-to-mechanism-pipeline)
3. [Rapid Mechanism Iteration](#rapid-mechanism-iteration)
4. [Mechanism Naming Workflow](#mechanism-naming-workflow)
5. [Proof Collection Automation](#proof-collection-automation)
6. [Integration with Copy Development](#integration-with-copy-development)

---

## End-to-End Mechanism Development

### Overview

Complete workflow from blank slate to deployment-ready mechanism.

```
DISCOVERY → GENERATION → EVALUATION → SELECTION → NAMING → REFINEMENT → VALIDATION
   ↓            ↓            ↓            ↓          ↓          ↓            ↓
 Research   3-5 Options   Score Each   Pick Best   Name It   Strengthen   Final QA
```

### Phase 1: Discovery (30-45 min)

**Objective:** Gather all inputs needed for mechanism generation

**Step 1.1: Product/Offer Analysis**
```markdown
INPUT NEEDED:
- Product/Service description
- Core features and components
- Unique ingredients/elements
- How it's delivered
- Price point
- Existing positioning

PROMPT TO USE:
"Analyze this product and extract mechanism development inputs:

Product: [PASTE PRODUCT INFO]

Extract:
1. Core working elements (what makes it function)
2. Unique differentiators (what only this has)
3. Delivery mechanism (how it's packaged/delivered)
4. Natural category (what market sees it as)
5. Potential repositioning angles (what else could it be)"
```

**Step 1.2: Market Research**
```markdown
INPUT NEEDED:
- Target audience demographics
- Target audience psychographics
- Pain points (surface level)
- Desired outcomes
- Current solutions they've tried
- Objections and skepticism

PROMPT TO USE:
"Based on this audience profile, identify mechanism opportunities:

Audience: [PASTE AUDIENCE INFO]

Identify:
1. Surface problems they articulate
2. Deeper problems they may not know about
3. Past solution failures and why they failed
4. Beliefs about the problem
5. Beliefs about potential solutions
6. Emotional state regarding the problem
7. What they blame for the problem
8. What would constitute 'proof' to them"
```

**Step 1.3: Competitive Analysis**
```markdown
INPUT NEEDED:
- Top 3-5 competitors
- Their mechanisms/approaches
- Their messaging
- Their weaknesses

PROMPT TO USE:
"Analyze competitor mechanisms for differentiation opportunities:

Competitor 1: [NAME] - [THEIR APPROACH]
Competitor 2: [NAME] - [THEIR APPROACH]
Competitor 3: [NAME] - [THEIR APPROACH]

Identify:
1. Common mechanism patterns (what everyone says)
2. Overused angles to avoid
3. Gaps no one is addressing
4. Counter-positioning opportunities
5. Category creation opportunities"
```

**Step 1.4: Sophistication Assessment**
```markdown
PROMPT TO USE:
"Determine market sophistication level:

Product category: [INSERT]
Target audience: [INSERT]
Competitor landscape: [INSERT]

Assess:
- Awareness level (1-5 scale):
  1 = Unaware of problem
  2 = Problem aware, seeking solutions
  3 = Solution aware, comparing options
  4 = Product aware, saturated market
  5 = Most aware, tried everything, skeptical

- Required mechanism level (E1-E5):
  E1 = Simple claim
  E2 = Proof-backed claim
  E3 = Mechanism introduced
  E4 = New mechanism + paradigm shift
  E5 = Category creation + worldview shift

Recommendation: [Level] because [reasoning]"
```

**Phase 1 Output:** Discovery Document containing:
- Product mechanism inputs
- Audience insights
- Competitive gaps
- Sophistication assessment
- Mechanism requirements

---

### Phase 2: Generation (45-60 min)

**Objective:** Create 3-5 distinct mechanism options

**Step 2.1: Generate Problem Mechanisms**
```markdown
Use Template A (Root Cause Discovery) from Generation Prompts.

INPUT: Discovery Document
OUTPUT: 3-5 potential villain/problem mechanisms

For each, capture:
- Villain name
- Attack mechanism
- Origin story
- Self-esteem restoration angle
- Initial proof concept
```

**Step 2.2: Generate Solution Mechanisms**
```markdown
Use Template D (How-It-Works) from Generation Prompts.

INPUT: Product analysis + each problem mechanism
OUTPUT: Solution mechanism to match each problem

For each, capture:
- Solution name
- 3-step process
- Why others don't work
- Demonstration concept
```

**Step 2.3: Develop Full Mechanisms**
```markdown
Use Template K (Complete Mechanism System) for top 3-5 combinations.

INPUT: Problem + Solution pairs
OUTPUT: Full mechanism frameworks including:
- Hook mechanism
- Problem mechanism (UMP)
- Solution mechanism (UMS)
- Delivery mechanism (UMD)
- Integration check
```

**Step 2.4: Initial Naming**
```markdown
For each mechanism, generate working names:

PROMPT:
"Create 3 working names for this mechanism:
[INSERT MECHANISM]

Naming criteria:
- Memorable and unique
- Benefits implied
- Easy to say/spell
- Not already in use
- Creates curiosity"
```

**Phase 2 Output:** 3-5 complete mechanism options with working names

---

### Phase 3: Evaluation (30-45 min)

**Objective:** Score all options and identify the strongest

**Step 3.1: Quick Validation**
```markdown
Run 5-Test Battery on each mechanism.

Track results in comparison table:

| Test | Mechanism 1 | Mechanism 2 | Mechanism 3 |
|------|-------------|-------------|-------------|
| Cocktail Party | | | |
| 12-Year-Old | | | |
| 4-Word | | | |
| Eyes Light Up | | | |
| Different Category | | | |
| PASS COUNT | /5 | /5 | /5 |

Eliminate any with <3/5 passes.
```

**Step 3.2: Full Scoring**
```markdown
Run 13-Dimension Scoring on remaining mechanisms.

Score each dimension 1-10.
Calculate totals.

| Dimension | Mech 1 | Mech 2 | Mech 3 |
|-----------|--------|--------|--------|
| Novelty | | | |
| Specificity | | | |
| Scientific Credibility | | | |
| Visual Clarity | | | |
| Emotional Resonance | | | |
| Enemy Clarity | | | |
| Inevitability | | | |
| Solution Elegance | | | |
| Unique Ownership | | | |
| Paradigm Shift Power | | | |
| False Solution Destruction | | | |
| Market Calibration | | | |
| Proof Integration | | | |
| **TOTAL** | /130 | /130 | /130 |
```

**Step 3.3: Comparative Analysis**
```markdown
Use Head-to-Head Comparison prompt.

Consider:
- Raw score (highest wins)
- Dimension balance (no major weaknesses)
- Fixability (can low scores be improved?)
- Market fit (best for stated audience)
- Differentiation (most distinctive)
```

**Phase 3 Output:**
- Ranked mechanisms with scores
- Clear leader identified
- Gap analysis for top mechanism

---

### Phase 4: Selection (15-20 min)

**Objective:** Confirm winner and document decision

**Step 4.1: Final Decision**
```markdown
DECISION FRAMEWORK:

Winner Selection Criteria:
1. Highest total score
2. No dimension below 5
3. Passes at least 4/5 quick tests
4. Strongest market differentiation
5. Most feasible proof support

If tie: Choose mechanism with:
- Higher Unique Ownership score (harder to copy)
- Higher Emotional Resonance (drives action)
- Higher Paradigm Shift Power (E5 potential)

DOCUMENT:
- Selected mechanism: [NAME]
- Score: [X/130]
- Key strengths: [TOP 3]
- Known weaknesses: [TO ADDRESS]
- Decision rationale: [WHY THIS ONE]
```

**Step 4.2: Hybrid Consideration**
```markdown
PROMPT:
"Can elements from the non-selected mechanisms strengthen the winner?

Winner: [MECHANISM]
Runner-up 1: [MECHANISM]
Runner-up 2: [MECHANISM]

Analyze:
1. Strongest elements from each runner-up
2. How they could integrate with winner
3. Risk of diluting winner's strength
4. Net benefit assessment

Recommendation: [Incorporate element X from mechanism Y because...]"
```

**Phase 4 Output:**
- Selected mechanism
- Decision documentation
- Any hybrid additions

---

### Phase 5: Naming (30-45 min)

**Objective:** Create compelling, ownable names for all mechanism components

**Step 5.1: Generate Name Options**
```markdown
Use Mechanism Name Generator prompt.

Generate 20+ names per category:
- Villain/Enemy names
- Problem state names
- Solution mechanism names
- Method/System names
- Outcome state names

For each category, create options in styles:
- Alliterative
- Scientific-sounding
- Benefit-embedded
- Action-oriented
```

**Step 5.2: Name Validation**
```markdown
VALIDATION CHECKLIST:

For each name candidate:
[ ] Easy to pronounce
[ ] Easy to spell
[ ] Not already trademarked
[ ] Domain available (if needed)
[ ] No negative connotations
[ ] Works in headlines
[ ] Creates curiosity
[ ] Implies benefit
[ ] Sounds proprietary
[ ] Memorable after one hearing
```

**Step 5.3: System Cohesion**
```markdown
Use Terminology System Builder prompt.

Ensure all names work together:
- Villain name → Problem state name → Solution name → Outcome name
- Should feel like one proprietary language
- Should be internally consistent
- Should tell a story when listed together
```

**Phase 5 Output:**
- Complete naming system
- All component names finalized
- Terminology guide

---

### Phase 6: Refinement (30-45 min)

**Objective:** Strengthen weak dimensions to reach 110+

**Step 6.1: Gap Analysis**
```markdown
From Phase 3 scoring, identify dimensions below 8.

Priority order by:
1. Lowest scores
2. Highest impact on persuasion
3. Easiest to fix
```

**Step 6.2: Targeted Improvements**
```markdown
Use Targeted Dimension Improvement prompt for each weak area.

For each dimension:
1. Identify current state
2. Define target state
3. Generate improvement options
4. Select best option
5. Implement improvement
6. Re-score
```

**Step 6.3: Integration Check**
```markdown
PROMPT:
"Review this refined mechanism for coherence:

[INSERT REFINED MECHANISM]

Check:
1. Do all components tell the same story?
2. Is there any contradiction?
3. Does the villain connect to the solution?
4. Does the solution connect to the delivery?
5. Is the naming consistent?
6. Is the proof supporting the right claims?

Issues found:
Fixes needed:"
```

**Phase 6 Output:**
- Strengthened mechanism
- Updated scores
- Integration verification

---

### Phase 7: Validation (15-20 min)

**Objective:** Final quality assurance before copy development

**Step 7.1: Re-run All Tests**
```markdown
5-Test Battery: Must pass 5/5
13-Dimension Score: Must be 110+
```

**Step 7.2: Stakeholder Review Prep**
```markdown
SUMMARY DOCUMENT:

## Mechanism: [NAME]

### The Problem
[1-2 paragraph description of the problem mechanism]

### The Solution
[1-2 paragraph description of the solution mechanism]

### The Delivery
[1-2 paragraph description of delivery mechanism]

### Key Names
- Villain: [NAME]
- Problem: [NAME]
- Solution: [NAME]
- Method: [NAME]

### Proof Foundation
[List key proof elements]

### Score: [X/130]

### Why This Wins
[3-5 bullet points on differentiation]
```

**Step 7.3: Sign-Off Checklist**
```markdown
FINAL CHECKLIST:

[ ] Mechanism scored 110+ on 13 dimensions
[ ] Mechanism passed 5/5 quick tests
[ ] All naming finalized and validated
[ ] Proof elements identified and sourceable
[ ] No compliance/legal red flags
[ ] Differentiated from competitors
[ ] Appropriate for market sophistication
[ ] Ready for copy development

SIGN-OFF: [Approved / Needs More Work]
```

**Phase 7 Output:**
- Validated mechanism
- Summary document
- Sign-off confirmation

---

## Research-to-Mechanism Pipeline

### For When Starting with Raw Research

```
RAW RESEARCH → DIGEST → SYNTHESIZE → DEVELOP → VERIFY → VALIDATE
```

**Step 1: Digest Research**
```markdown
PROMPT:
"Digest this research material and extract mechanism-relevant insights:

[PASTE RESEARCH - studies, articles, product info]

Extract:
1. Key scientific findings (what's proven)
2. Novel insights (what's not commonly known)
3. Villain candidates (what causes problems)
4. Solution candidates (what fixes them)
5. Proof elements (what can be cited)
6. Story elements (origin stories, discoveries)
7. Naming opportunities (terminology to adopt/adapt)"
```

**Step 2: Synthesize Angles**
```markdown
PROMPT:
"Based on this research digest, identify the TOP 3 mechanism angles:

[INSERT DIGEST]

For each angle:
- Core insight:
- Mechanism type (problem/solution/both):
- Paradigm shift potential:
- Proof available:
- Naming opportunity:
- Risk/concerns:

Rank by potential impact and feasibility."
```

**Step 3: Develop Selected Angle**
```markdown
Use Template K (Complete Mechanism System) to fully develop the top angle.
```

**Step 4: Verify Against Research**
```markdown
PROMPT:
"Cross-reference this mechanism against source research:

Mechanism:
[INSERT]

Source research:
[INSERT OR REFERENCE]

Verify:
1. Is every claim supportable by the research?
2. What proof exists for each component?
3. Are there overstatements to correct?
4. Are there understatements to strengthen?
5. What additional research would help?

Claim-by-claim verification:
| Claim | Research Support | Strength | Action Needed |
| | | | |"
```

---

## Rapid Mechanism Iteration

### For Quick Brainstorming Sessions

**15-Minute Mechanism Sprint**

```markdown
MINUTE 1-3: Problem Brainstorm
"List 10 potential hidden causes for [PROBLEM]:
1.
2.
..."

MINUTE 4-6: Quick Villain Selection
"Of these 10, which 3 are most:
- Novel
- Believable
- Emotionally resonant"

MINUTE 7-10: Rapid Development
"Develop the top villain into a quick mechanism:
- Villain: [NAME]
- Attack: [HOW]
- Solution: [FIX]
- Proof: [EVIDENCE]"

MINUTE 11-13: Quick Test
"Does this pass the 4-word test?
4 words: _______________"

MINUTE 14-15: Name and Capture
"Working name: __________
Next step: __________"
```

**30-Minute Mechanism Comparison**

```markdown
MINUTE 1-10: Generate 3 mechanisms
(Use abbreviated generation prompts)

MINUTE 11-20: Quick score all 3
(Use abbreviated scoring - just 5 dimensions)
- Novelty
- Emotional impact
- Differentiation
- Believability
- Memorability

MINUTE 21-25: Compare and select

MINUTE 26-30: Identify next steps for winner
```

---

## Mechanism Naming Workflow

### Dedicated Naming Session

**Step 1: Generate Raw Options (15 min)**
```markdown
For each component, generate 10 options:

VILLAIN NAMES:
Use patterns: [Compound] [Scientific] [Fear-Based] [Personified]
1.
2.
...

SOLUTION NAMES:
Use patterns: [Alliterative] [Benefit-Embedded] [Action-Based] [Protocol]
1.
2.
...

METHOD NAMES:
Use patterns: [Numbered Steps] [Formula] [System] [Sequence]
1.
2.
...
```

**Step 2: Filter by Criteria (10 min)**
```markdown
Apply filters:

MUST BE:
[ ] Easy to say
[ ] Easy to remember
[ ] Not already in use
[ ] Implies benefit
[ ] Sounds proprietary

SHOULD BE:
[ ] Alliterative or rhyming
[ ] Under 4 words
[ ] Works as hashtag
[ ] Domain-available

Survivors: _________
```

**Step 3: System Cohesion Check (5 min)**
```markdown
Do these work together?
- [Villain] causes [Problem]
- [Solution] defeats [Villain]
- [Method] delivers [Solution]
- Result is [Outcome]

Read it aloud. Does it flow?
```

**Step 4: Finalize (5 min)**
```markdown
FINAL NAMES:
- Villain: __________
- Problem: __________
- Solution: __________
- Method: __________
- Outcome: __________

TRADEMARK/DOMAIN CHECK:
[ ] Searched USPTO
[ ] Searched domain registrars
[ ] No conflicts found
```

---

## Proof Collection Automation

### Systematic Proof Gathering

**Step 1: Proof Needs Assessment**
```markdown
PROMPT:
"For this mechanism, identify all proof needs:

Mechanism:
[INSERT]

For each claim, specify:
| Claim | Proof Type Needed | Priority |
| | | |

Proof types:
- Authority (credentials, endorsements)
- Scientific (studies, research)
- Social (testimonials, case studies)
- Demonstration (visual proof, before/after)
- Statistical (numbers, percentages)
"
```

**Step 2: Proof Search Queries**
```markdown
PROMPT:
"Generate search queries to find proof for these claims:

Claims:
1. [CLAIM 1]
2. [CLAIM 2]
...

For each, provide:
- Academic search query (Google Scholar)
- News search query
- Industry search query
- Testimonial search query
"
```

**Step 3: Proof Evaluation**
```markdown
For each proof element found:

[ ] Is it from a credible source?
[ ] Can it be verified?
[ ] Is it relevant to the claim?
[ ] Is it recent enough?
[ ] Can it be used without permission issues?

PROOF INVENTORY:
| Claim | Proof Found | Source | Strength (1-10) |
| | | | |
```

---

## Integration with Copy Development

### Handoff to Copywriter

**Mechanism Brief Format**
```markdown
# Mechanism Brief: [NAME]

## Overview
One paragraph summary of the complete mechanism.

## The Problem Mechanism
- Villain: [NAME]
- Attack mechanism: [DESCRIPTION]
- Origin story: [DESCRIPTION]
- Emotional trigger: [FEELING]

## The Solution Mechanism
- Solution: [NAME]
- How it works: [3 STEPS]
- Why it's different: [DIFFERENTIATION]

## The Delivery Mechanism
- Product positioning: [DESCRIPTION]
- Why this format: [RATIONALE]

## Naming System
- All proprietary terms with definitions

## Proof Inventory
- List all available proof elements

## Key Copy Points
- Must-hit messages
- Tone guidance
- Objections to address

## Score Summary
- Total: [X/130]
- Strongest dimensions: [LIST]
- Cautions: [ANY WEAK AREAS]
```

**VSL/Sales Letter Integration Points**
```markdown
WHERE MECHANISM APPEARS:

1. HEADLINE
- Hook mechanism for curiosity

2. LEAD (First 500 words)
- Problem mechanism introduction
- Villain reveal

3. BODY (Problem section)
- Full problem mechanism
- Past failure explanation
- Self-esteem restoration

4. BODY (Solution section)
- Solution mechanism reveal
- How it works explanation
- Differentiation claims

5. BODY (Proof section)
- Proof elements supporting mechanism

6. PRODUCT REVEAL
- Delivery mechanism
- Why this format

7. CLOSE
- Mechanism-based urgency
- Binary choice framing
```

---

## Workflow Checklists

### Pre-Generation Checklist
```markdown
[ ] Product analysis complete
[ ] Audience research complete
[ ] Competitor analysis complete
[ ] Sophistication level determined
[ ] Required E-level identified
[ ] Key proof sources identified
```

### Post-Generation Checklist
```markdown
[ ] 3+ mechanism options generated
[ ] All options have working names
[ ] All options have proof concepts
[ ] All options scored
[ ] Winner selected with rationale
```

### Pre-Deployment Checklist
```markdown
[ ] Final score 110+
[ ] All 5 quick tests passed
[ ] All naming finalized
[ ] Proof inventory complete
[ ] Compliance review passed
[ ] Copy brief prepared
```

---

## Sources & References

- Research Brief: Mechanism Deep Dive
- AI Copywriting Best Practices from Copyhackers
- Todd Brown E5 Method workflow
- LLM Evaluation frameworks from Confident AI
- A/B Testing methodologies from Braintrust

---

*Last Updated: 2026-01-27*
