# Mechanism Evaluation Prompts - Detailed Templates

> Complete evaluation framework for assessing mechanism quality using AI. These prompts help score, validate, compare, and identify improvement opportunities.

---

## Table of Contents

1. [13-Dimension Scoring System](#13-dimension-scoring-system)
2. [Quick Validation Tests](#quick-validation-tests)
3. [Comparative Analysis Prompts](#comparative-analysis-prompts)
4. [Weakness Identification Prompts](#weakness-identification-prompts)
5. [Improvement Recommendation Prompts](#improvement-recommendation-prompts)

---

## 13-Dimension Scoring System

### Full Scoring Prompt

```markdown
**ROLE:** You are a ruthlessly honest mechanism evaluator. Your job is to find weaknesses, not validate mediocre work. Use calibrated scoring - a 7+ should be genuinely good.

**MECHANISM TO EVALUATE:**
[PASTE COMPLETE MECHANISM HERE]

**CONTEXT:**
- Product: [INSERT]
- Target Market: [INSERT]
- Market Sophistication Level: [1-5]
- Mechanism Type: [Problem/Solution/Delivery/Full System]

---

## EVALUATION: 13-Dimension Analysis

### Dimension 1: NOVELTY (1-10)
*How new/unknown is this mechanism to the target market?*

**Scoring Guide:**
- 1-3: Common knowledge, seen everywhere
- 4-6: Somewhat novel, some have heard of it
- 7-8: Fresh to most, only experts know
- 9-10: Unknown to 80%+ of market, genuine discovery

**Score:** [ ]
**Evidence:** [Why this score - be specific]

---

### Dimension 2: SPECIFICITY (1-10)
*How detailed and precise is the causation chain?*

**Scoring Guide:**
- 1-3: Vague claims, no mechanism details
- 4-6: Some detail, but gaps in explanation
- 7-8: Clear X→Y→Z chain with some named components
- 9-10: Precise chain with ALL components named, numbered, specified

**Score:** [ ]
**Evidence:** [Why this score - cite specific details or gaps]

---

### Dimension 3: SCIENTIFIC CREDIBILITY (1-10)
*What research or clinical backing exists?*

**Scoring Guide:**
- 1-3: No backing, pure claims
- 4-6: Some research referenced, not robust
- 7-8: Multiple studies, credible sources
- 9-10: Clinical trials, peer-reviewed research, expert consensus

**Score:** [ ]
**Evidence:** [List specific proof elements or their absence]

---

### Dimension 4: VISUAL CLARITY (1-10)
*Can the audience "see" the mechanism in their mind?*

**Scoring Guide:**
- 1-3: Abstract, impossible to visualize
- 4-6: Some imagery, but still conceptual
- 7-8: Clear metaphor, easy to picture
- 9-10: Instant, vivid mental picture - "I can see it!"

**Score:** [ ]
**Evidence:** [What metaphor/imagery exists or is missing]

---

### Dimension 5: EMOTIONAL RESONANCE (1-10)
*Does it trigger a gut-level emotional response?*

**Scoring Guide:**
- 1-3: Purely intellectual, no emotional impact
- 4-6: Mild interest or concern
- 7-8: Clear emotional response (fear, hope, anger, relief)
- 9-10: Visceral reaction - disgust, outrage, desperate hope

**Score:** [ ]
**Evidence:** [What emotions are triggered and how]

---

### Dimension 6: ENEMY CLARITY (1-10)
*Is there a clear, named villain with a specific attack mechanism?*

**Scoring Guide:**
- 1-3: No enemy, or vague enemy ("bad habits")
- 4-6: Named enemy but unclear attack
- 7-8: Named enemy with clear attack mechanism
- 9-10: Named, personified villain with detailed attack + origin story

**Score:** [ ]
**Evidence:** [Identify the villain and attack mechanism]

---

### Dimension 7: INEVITABILITY (1-10)
*Does it create "this WILL happen to you" feeling?*

**Scoring Guide:**
- 1-3: Feels optional, could go either way
- 4-6: Possible risk acknowledged
- 7-8: Strong probability communicated
- 9-10: Unavoidable - if they don't act, consequences are certain

**Score:** [ ]
**Evidence:** [How inevitability is or isn't established]

---

### Dimension 8: SOLUTION ELEGANCE (1-10)
*Is the solution simple yet comprehensive?*

**Scoring Guide:**
- 1-3: Overly complex or overly simplistic
- 4-6: Workable but clunky
- 7-8: Clean and logical
- 9-10: Elegant - simple enough to explain in one sentence, comprehensive enough to be complete

**Score:** [ ]
**Evidence:** [Assess simplicity vs completeness balance]

---

### Dimension 9: UNIQUE OWNERSHIP (1-10)
*Does the creator "own" this mechanism?*

**Scoring Guide:**
- 1-3: Generic, anyone could claim this
- 4-6: Some unique elements
- 7-8: Mostly proprietary, hard to copy
- 9-10: Category-defining, trademarked language, can't find elsewhere

**Score:** [ ]
**Evidence:** [What's proprietary vs. generic]

---

### Dimension 10: PARADIGM SHIFT POWER (1-10)
*Does it flip existing beliefs?*

**Scoring Guide:**
- 1-3: Confirms existing beliefs
- 4-6: Adds to existing beliefs
- 7-8: Challenges some beliefs
- 9-10: Inverts everything they thought they knew

**Score:** [ ]
**Evidence:** [What belief is being shifted and how dramatically]

---

### Dimension 11: FALSE SOLUTION DESTRUCTION (1-10)
*Does it explain why everything else failed?*

**Scoring Guide:**
- 1-3: Ignores competition
- 4-6: Mentions alternatives don't work
- 7-8: Explains WHY alternatives fail
- 9-10: Systematically destroys every competitor with mechanism logic

**Score:** [ ]
**Evidence:** [How are past failures explained?]

---

### Dimension 12: MARKET SOPHISTICATION CALIBRATION (1-10)
*Does it match the audience's awareness stage?*

**Scoring Guide:**
- 1-3: Completely mismatched to market stage
- 4-6: Partially appropriate
- 7-8: Good fit for stated market stage
- 9-10: Perfect calibration - exactly what this market needs to hear

**Score:** [ ]
**Evidence:** [How does mechanism match stated sophistication level?]

---

### Dimension 13: PROOF INTEGRATION (1-10)
*Is every claim backed by evidence?*

**Scoring Guide:**
- 1-3: Claims with no proof
- 4-6: Some claims backed, others floating
- 7-8: Most claims have supporting proof
- 9-10: ~1:1 proof-to-claim ratio, every major claim supported

**Score:** [ ]
**Evidence:** [Identify unsupported claims]

---

## SUMMARY

**Total Score:** [ ]/130

**Rating:**
- Below 90: NEEDS WORK - Significant revisions required
- 90-109: COMPETITIVE - Can work, but has clear improvement opportunities
- 110+: DOMINANT - Strong mechanism ready for copy development

**Top 3 Strengths:**
1. [Dimension]: [Why it's strong]
2. [Dimension]: [Why it's strong]
3. [Dimension]: [Why it's strong]

**Top 3 Weaknesses:**
1. [Dimension]: [What's missing/weak]
2. [Dimension]: [What's missing/weak]
3. [Dimension]: [What's missing/weak]

**Priority Improvements:**
1. [Most impactful improvement]
2. [Second priority]
3. [Third priority]

**Overall Assessment:**
[2-3 sentences on mechanism viability and recommended next steps]
```

### Abbreviated Scoring Prompt (Quick Version)

```markdown
**QUICK MECHANISM SCORE**

Rate this mechanism 1-10 on each dimension. Be calibrated - 7+ means genuinely good.

Mechanism: [INSERT]

| Dimension | Score | One-Line Reason |
|-----------|-------|-----------------|
| Novelty | | |
| Specificity | | |
| Scientific Credibility | | |
| Visual Clarity | | |
| Emotional Resonance | | |
| Enemy Clarity | | |
| Inevitability | | |
| Solution Elegance | | |
| Unique Ownership | | |
| Paradigm Shift Power | | |
| False Solution Destruction | | |
| Market Calibration | | |
| Proof Integration | | |
| **TOTAL** | /130 | |

**Verdict:** [Needs Work / Competitive / Dominant]
**#1 Fix Needed:** [Single most impactful improvement]
```

---

## Quick Validation Tests

### The 5-Test Battery

```markdown
**RAPID MECHANISM VALIDATION**

Run these 5 tests on the mechanism:

**Mechanism:** [INSERT]

---

## TEST 1: THE COCKTAIL PARTY TEST

**Question:** Would someone spontaneously tell a friend about this at a party?

**Evaluation Criteria:**
- Is it interesting enough to share unprompted?
- Would they remember it well enough to explain it?
- Would it make them seem smart/interesting to share it?

**Evidence:** [Specific elements that are/aren't shareable]

**Result:** [PASS / FAIL / BORDERLINE]

---

## TEST 2: THE 12-YEAR-OLD TEST

**Question:** Can a 12-year-old understand the core concept?

**Evaluation Criteria:**
- Is the language simple and jargon-free?
- Is the logic easy to follow?
- Is there a clear "this causes that" story?

**Try explaining it simply:** [Write a 12-year-old-friendly version]

**Result:** [PASS / FAIL / BORDERLINE]

---

## TEST 3: THE 4-WORD TEST

**Question:** Can you express the core mechanism in 4 words or less?

**Evaluation Criteria:**
- Can you capture the essence succinctly?
- Is there a clear, memorable core concept?

**4-word version:** [Write it]

**Result:** [PASS / FAIL / BORDERLINE]

---

## TEST 4: THE "EYES LIGHT UP" TEST

**Question:** When explained, does it create an "aha!" moment?

**Evaluation Criteria:**
- Is there a revelation?
- Does it feel like discovering something important?
- Is there a "finally, this makes sense" feeling?

**The "aha" moment is:** [Identify it or note its absence]

**Result:** [PASS / FAIL / BORDERLINE]

---

## TEST 5: THE "DIFFERENT CATEGORY" TEST

**Question:** Does it put you in a different category than competitors?

**Evaluation Criteria:**
- Does it make competitors irrelevant (not just "worse")?
- Are you playing a different game entirely?
- Or are you just claiming to be "better" in the same category?

**Category analysis:** [Same category vs. new category]

**Result:** [PASS / FAIL / BORDERLINE]

---

## OVERALL VALIDATION

**Tests Passed:** [ ]/5

**Interpretation:**
- 5/5: Mechanism is ready for prime time
- 4/5: Minor refinement needed
- 3/5: Significant work needed
- 2/5 or less: Back to the drawing board

**Critical Path:** [Which failed test is most important to fix?]
```

### Individual Test Deep Dives

```markdown
**SHAREABILITY DEEP DIVE**

Analyze why someone would or wouldn't share this mechanism:

Mechanism: [INSERT]

**Shareability Factors:**

1. **Social Currency** - Does sharing make them look smart/informed?
   - Score (1-5):
   - Analysis:

2. **Emotional Trigger** - Does it provoke a reaction worth sharing?
   - Score (1-5):
   - Analysis:

3. **Story Structure** - Is there a narrative that's easy to retell?
   - Score (1-5):
   - Analysis:

4. **Practical Value** - Would sharing help others?
   - Score (1-5):
   - Analysis:

5. **Surprise Factor** - Is there a "wait, really?" element?
   - Score (1-5):
   - Analysis:

**Total Shareability:** /25
**Recommendation:** [What would make it more shareable?]
```

---

## Comparative Analysis Prompts

### Head-to-Head Comparison

```markdown
**MECHANISM COMPARISON ANALYSIS**

Compare these mechanisms and determine the winner.

**Mechanism A:**
[INSERT]

**Mechanism B:**
[INSERT]

**Mechanism C:** (Optional)
[INSERT]

---

## COMPARISON MATRIX

| Criteria | A | B | C | Notes |
|----------|---|---|---|-------|
| Memorability (1-10) | | | | |
| Believability (1-10) | | | | |
| Differentiation (1-10) | | | | |
| Emotional Impact (1-10) | | | | |
| Shareability (1-10) | | | | |
| Proof-ability (1-10) | | | | |
| Market Fit (1-10) | | | | |
| Naming Strength (1-10) | | | | |
| **TOTAL** | | | | |

---

## QUALITATIVE ANALYSIS

**Mechanism A Strengths:**
-
-

**Mechanism A Weaknesses:**
-
-

**Mechanism B Strengths:**
-
-

**Mechanism B Weaknesses:**
-
-

---

## VERDICT

**Winner:** [A / B / C]

**Margin of Victory:** [Decisive / Close / Marginal]

**Key Differentiators:**
1. [Why winner wins on this factor]
2. [Why winner wins on this factor]
3. [Why winner wins on this factor]

**Hybrid Opportunity:**
Could elements from losing mechanisms improve the winner?
[Analysis and recommendations]

**Final Recommendation:**
[Clear guidance on which to use and any modifications needed]
```

### Market Position Analysis

```markdown
**MECHANISM MARKET POSITIONING**

Evaluate how this mechanism positions against market competitors.

**Your Mechanism:**
[INSERT]

**Competitor Mechanisms:**
1. [Competitor 1]: [Their mechanism]
2. [Competitor 2]: [Their mechanism]
3. [Competitor 3]: [Their mechanism]

---

## POSITIONING ANALYSIS

**Category Definition:**
- Current category: [How the market currently defines the category]
- Your mechanism's category: [Same or different?]

**Differentiation Level:**
- [ ] Same category, claiming "better"
- [ ] Same category, different angle
- [ ] Adjacent category
- [ ] New category entirely

**Competitive Displacement:**

| Competitor | Their Approach | How Your Mechanism Makes Them Obsolete |
|------------|----------------|---------------------------------------|
| 1 | | |
| 2 | | |
| 3 | | |

**White Space Analysis:**
What does your mechanism offer that NO competitor addresses?
-
-
-

**Vulnerability Analysis:**
How could a competitor attack your mechanism?
-
-

**Positioning Recommendation:**
[How to position for maximum differentiation]
```

---

## Weakness Identification Prompts

### Comprehensive Weakness Audit

```markdown
**MECHANISM WEAKNESS AUDIT**

Identify ALL potential weaknesses in this mechanism.

**Mechanism:**
[INSERT]

---

## STRUCTURAL WEAKNESSES

**Logic Gaps:**
- Are there unexplained steps in the causation chain?
- Does conclusion follow from premises?
- Any logical fallacies?

**Findings:**
-
-

**Specificity Gaps:**
- Where is the mechanism vague?
- What details are missing?
- What questions would a skeptic ask?

**Findings:**
-
-

---

## PROOF WEAKNESSES

**Unsupported Claims:**
List every claim and its supporting proof (or lack thereof):

| Claim | Proof | Gap? |
|-------|-------|------|
| | | |
| | | |
| | | |

**Credibility Concerns:**
- Is the source trustworthy?
- Can claims be verified?
- Is there counter-evidence?

**Findings:**
-
-

---

## MARKET WEAKNESSES

**Sophistication Mismatch:**
- Is this mechanism appropriate for the market's awareness level?
- Too basic? Too complex?

**Analysis:**

**Competition Vulnerabilities:**
- How could competitors counter this mechanism?
- What objections will they raise?

**Analysis:**

---

## EMOTIONAL WEAKNESSES

**Emotional Dead Zones:**
- Where does the mechanism lose emotional impact?
- Are there dry, purely intellectual sections?

**Analysis:**

**Fear/Hope Balance:**
- Is there too much fear without hope?
- Is there unrealistic hope without credible basis?

**Analysis:**

---

## COMMUNICATION WEAKNESSES

**Clarity Issues:**
- What's confusing?
- What needs to be explained multiple ways?

**Analysis:**

**Memorability Issues:**
- What won't they remember?
- What needs better naming/imagery?

**Analysis:**

---

## WEAKNESS PRIORITY MATRIX

| Weakness | Severity (1-10) | Ease of Fix (1-10) | Priority |
|----------|-----------------|-------------------|----------|
| | | | |
| | | | |
| | | | |

**Top 3 Priority Fixes:**
1. [Weakness]: [Why it matters] [How to fix]
2. [Weakness]: [Why it matters] [How to fix]
3. [Weakness]: [Why it matters] [How to fix]
```

### Skeptic's Objection Analysis

```markdown
**SKEPTIC OBJECTION GENERATOR**

Generate every objection a skeptic would raise about this mechanism.

**Mechanism:**
[INSERT]

---

## OBJECTION CATEGORIES

**"That's Not True" Objections:**
Objections to the facts/claims:
1.
2.
3.

**"That Won't Work for Me" Objections:**
Objections to personal applicability:
1.
2.
3.

**"I've Heard This Before" Objections:**
Objections about novelty:
1.
2.
3.

**"Prove It" Objections:**
Demands for evidence:
1.
2.
3.

**"What About..." Objections:**
Questions about things not addressed:
1.
2.
3.

**"The Real Problem Is..." Objections:**
Alternative explanations:
1.
2.
3.

---

## OBJECTION HANDLING

For each major objection, how does the mechanism address it (or fail to)?

| Objection | Current Response | Strength (1-10) | Improvement |
|-----------|-----------------|-----------------|-------------|
| | | | |
| | | | |
| | | | |

**Unaddressed Objections:**
[List objections with no current response in the mechanism]

**Pre-emptive Strike Opportunities:**
[Objections that should be addressed proactively in the copy]
```

---

## Improvement Recommendation Prompts

### Targeted Dimension Improvement

```markdown
**DIMENSION-SPECIFIC IMPROVEMENT**

The mechanism scored low on [DIMENSION]. Provide specific improvements.

**Mechanism:**
[INSERT]

**Weak Dimension:** [e.g., Visual Clarity]
**Current Score:** [e.g., 4/10]
**Target Score:** [e.g., 8/10]

---

## ANALYSIS

**Current State:**
[What exists now for this dimension]

**Gap to Target:**
[What's missing to reach target score]

---

## IMPROVEMENT OPTIONS

**Option 1: [Name]**
- Description:
- Implementation:
- Expected score improvement:
- Effort required:

**Option 2: [Name]**
- Description:
- Implementation:
- Expected score improvement:
- Effort required:

**Option 3: [Name]**
- Description:
- Implementation:
- Expected score improvement:
- Effort required:

---

## RECOMMENDATION

**Best Option:** [1/2/3]
**Rationale:**

**Implementation Steps:**
1.
2.
3.

**Revised Mechanism Section:**
[Write the improved version]
```

### Full Mechanism Upgrade

```markdown
**MECHANISM 2.0 UPGRADE**

Transform this mechanism from competitive to dominant.

**Current Mechanism:**
[INSERT]

**Current Score:** [e.g., 95/130]
**Target Score:** 115+/130

---

## UPGRADE AREAS

**Priority 1: [Weakest Dimension]**
- Current:
- Upgraded:

**Priority 2: [Second Weakest]**
- Current:
- Upgraded:

**Priority 3: [Third Weakest]**
- Current:
- Upgraded:

---

## STRENGTHENING ADDS

**Additional Specificity:**
[What specific details can be added?]

**Additional Proof Elements:**
[What proof can strengthen claims?]

**Additional Visual Metaphors:**
[What imagery can make it clearer?]

**Additional Emotional Triggers:**
[What emotions can be amplified?]

---

## UPGRADED MECHANISM

**Version 2.0:**
[Write the complete upgraded mechanism]

---

## SCORE COMPARISON

| Dimension | Before | After | Change |
|-----------|--------|-------|--------|
| Novelty | | | |
| Specificity | | | |
| [etc.] | | | |
| **TOTAL** | | | |

**Upgrade Assessment:** [Was target achieved? What else could be done?]
```

---

## Automation Notes

### When to Use Each Prompt

| Situation | Prompt to Use |
|-----------|---------------|
| Initial mechanism assessment | Full 13-Dimension Scoring |
| Quick viability check | Abbreviated Scoring + 5-Test Battery |
| Choosing between options | Head-to-Head Comparison |
| Understanding market position | Market Position Analysis |
| Finding what's wrong | Comprehensive Weakness Audit |
| Anticipating objections | Skeptic Objection Generator |
| Fixing specific issues | Targeted Dimension Improvement |
| Major mechanism revision | Full Mechanism Upgrade |

### Integration with Generation Workflow

1. Generate mechanism using Generation Prompts
2. Run Quick Validation (5-Test Battery)
3. If passes, run Full 13-Dimension Scoring
4. If score < 90, run Weakness Audit
5. Use Improvement Prompts to address weaknesses
6. Re-score until 110+

---

## Sources

- LLM Evaluation Best Practices from Confident AI
- Promptfoo LLM Rubric methodology
- Google Vertex AI evaluation metrics
- Mechanism Deep Dive research framework
- A/B testing frameworks from Braintrust and Langfuse

---

*Last Updated: 2026-01-27*
