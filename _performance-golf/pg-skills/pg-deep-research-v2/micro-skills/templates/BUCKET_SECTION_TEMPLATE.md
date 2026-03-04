# BUCKET SECTION TEMPLATE

**Version:** 1.1
**Last Updated:** January 20, 2026
**Purpose:** Enforce consistent depth across ALL 6 research buckets
**Critical Rule:** Every bucket section MUST follow this EXACT structure

---

## WHY THIS TEMPLATE EXISTS

Previous research outputs had inconsistent depth:
- PAIN: 200+ lines with full subcategory breakdown
- ROOT_CAUSE: 10 lines with summary table
- SOLUTIONS_TRIED: 8 lines with 4 quotes

This is unacceptable. A copywriter asking "What's the #1 root cause belief?" deserves the same depth as "What's the #1 pain point?"

**THE FIX:** Every bucket section uses this IDENTICAL template.

---

## INTEGRATION WITH LAYER 2.5 (v3.5 Update)

This template is now enforced through the **Layer 2.5 synthesis process**:

1. **two_tier_quotes.json** - Provides all quotes with physical_tag + emotional_tags
2. **SYNTHESIS_VALIDATION.md** - Human reviews ALL quotes before Final Handoff
3. **Gate 2.5** - Validates categorization before assembly begins

**Data Source for Bucket Sections:** `layer-2-5-outputs/two_tier_quotes.json`

All bucket sections in FINAL_HANDOFF.md are ASSEMBLED from validated Layer 2.5 outputs, not synthesized at handoff time.

---

## TEMPLATE STRUCTURE (MANDATORY FOR ALL 6 BUCKETS)

```markdown
## SECTION [N]: [BUCKET_NAME] ANALYSIS ([Bucket Purpose])

### Bucket Overview
- **Total [BUCKET] Quotes:** [X]
- **PRD Minimum:** [Y]
- **Compliance:** [Z]%

**What This Bucket Answers:** [One sentence explaining what this bucket reveals]

### TWO-TIER SUBCATEGORY BREAKDOWN TABLE

| [Subcategory Type] (Primary) | Mentions | Emotional Breakdown | % of Bucket |
|------------------------------|----------|---------------------|-------------|
| **[SUBCATEGORY_1]** | [X] | [tag: Y, tag: Z, tag: W] | [X.X]% |
| **[SUBCATEGORY_2]** | [X] | [tag: Y, tag: Z, tag: W] | [X.X]% |
| **[SUBCATEGORY_3]** | [X] | [tag: Y, tag: Z, tag: W] | [X.X]% |
| **[SUBCATEGORY_4]** | [X] | [tag: Y, tag: Z, tag: W] | [X.X]% |
| **[SUBCATEGORY_5]** | [X] | [tag: Y, tag: Z, tag: W] | [X.X]% |

---

### SUBCATEGORY 1: [NAME] ([X] mentions, [X.X]%)

**[Contextual Label]:** [Description of what this subcategory represents]
**Why This Matters:** [One sentence on copy relevance]

**Emotional Breakdown:**
- [Tag_1]: [X] mentions ([X.X]%)
- [Tag_2]: [X] mentions ([X.X]%)
- [Tag_3]: [X] mentions ([X.X]%)

#### TOP 25 VERBATIM QUOTES (if 25+ quotes exist, otherwise TOP [N])

**Format Option A: Readable Lines (PREFERRED for human review)**

> "Quote text here exactly as collected" — Source [ID] [GOLD] [emotional_tag1, emotional_tag2]

> "Second quote text here" — Source [ID] [HIGH] [emotional_tag1]

> "Third quote text here" — Source [ID] [HIGH] [emotional_tag1, emotional_tag2]

[...continue for all quotes in subcategory...]

**Format Option B: Table (ACCEPTABLE for final handoff)**

| Rank | ID | Quote | Source | Emotional | Priority |
|------|-----|-------|--------|-----------|----------|
| 1 | [ID] | **"[Quote text]"** | [Source] | [tags] | **GOLD** |
| 2 | [ID] | "[Quote text]" | [Source] | [tags] | HIGH |
| ... | ... | ... | ... | ... | ... |
| 25 | [ID] | "[Quote text]" | [Source] | [tags] | [PRIORITY] |

**CRITICAL:** SYNTHESIS_VALIDATION.md MUST use Format Option A (readable lines) for human review. FINAL_HANDOFF.md may use either format.

**Copy Note:** [One actionable insight for copywriters]

---

[REPEAT FOR EACH SUBCATEGORY]

---

### [BUCKET_NAME] SUMMARY: [Summary Header]

| [Column 1] | [Column 2] | [Column 3] |
|------------|------------|------------|
| [Row 1] | ... | ... |
| [Row 2] | ... | ... |
| [Row 3] | ... | ... |

**THE #1 [METRIC]:** [Subcategory name] ([X] mentions, [X.X]%)
**THE #1 COPY OPPORTUNITY:** [One sentence actionable insight]

---
```

---

## BUCKET-SPECIFIC LABELS

### PAIN Bucket
- **Subcategory Type:** Physical Problem (Primary)
- **Contextual Label:** "Physical Problem:"
- **Summary Header:** "Pain Points by Severity"
- **#1 Metric:** "PAIN POINT"

### HOPE Bucket
- **Subcategory Type:** Product Outcome (Primary)
- **Contextual Label:** "Product Outcome:"
- **Summary Header:** "Desired Outcomes by Frequency"
- **#1 Metric:** "HOPE"

### ROOT_CAUSE Bucket
- **Subcategory Type:** Belief Category (Primary)
- **Contextual Label:** "Core Belief:"
- **Summary Header:** "What They Believe → What's Actually True"
- **#1 Metric:** "ROOT CAUSE BELIEF"

### SOLUTIONS_TRIED Bucket
- **Subcategory Type:** Solution Category (Primary)
- **Contextual Label:** "Solutions Tried:"
- **Summary Header:** "What They've Exhausted"
- **#1 Metric:** "SOLUTION TRIED"

### COMPETITOR_MECHANISMS Bucket
- **Subcategory Type:** Competitor (Primary)
- **Contextual Label:** "Mechanism:"
- **Summary Header:** "Competitor Claims vs Reality"
- **#1 Metric:** "COMPETITOR WEAKNESS"

### VILLAIN Bucket
- **Subcategory Type:** Villain Type (Primary)
- **Contextual Label:** "Villain:"
- **Summary Header:** "Villains to Attack"
- **#1 Metric:** "VILLAIN"

---

## ENFORCEMENT RULES

### Rule 1: Minimum Section Length
Every bucket section MUST have:
- Bucket Overview (5+ lines)
- Two-Tier Subcategory Table (5+ rows)
- At least 3 subcategory deep-dives
- Each subcategory with emotional breakdown
- Top 25 verbatim (or Top N if under 25 quotes)
- Copy Note per subcategory
- Summary table
- #1 identification

**Minimum length per bucket section: 80+ lines**

### Rule 2: No Summary-Only Sections
The following is NOT ACCEPTABLE:

```markdown
## SECTION 5: ROOT_CAUSE ANALYSIS

| Belief | Evidence | Opportunity |
|--------|----------|-------------|
| "It's mental" | Research says otherwise | Equipment solution |
| "Bad technique" | Instructors say nothing wrong | Technique + equipment |
```

This is a SUMMARY, not a SECTION. It violates the template.

### Rule 3: Top 25 Threshold
- If subcategory has 25+ quotes: MUST include Top 25 verbatim
- If subcategory has 15-24 quotes: Include Top 15 verbatim
- If subcategory has 10-14 quotes: Include Top 10 verbatim
- If subcategory has <10 quotes: Include all quotes

### Rule 4: GOLD Quote Prioritization
GOLD quotes MUST appear in Top 5 of their subcategory:
- Academic/research validation
- Product testimonials (THE product being researched)
- Quotes that directly validate product mechanism

### Rule 5: Two-Tier Required
Every quote must have:
- Primary subcategory (Physical Problem / Belief / Solution Type)
- Secondary emotional tags (1-3)
- Priority flag (GOLD / HIGH / MEDIUM / STANDARD)

---

## VALIDATION CHECKLIST

Before marking a bucket section complete, verify:

- [ ] Bucket Overview present with totals and compliance %
- [ ] "What This Bucket Answers" statement present
- [ ] Two-Tier Subcategory Table with 5+ rows
- [ ] Each subcategory has emotional breakdown with percentages
- [ ] Top 25 (or Top N) verbatim quotes per subcategory
- [ ] GOLD quotes appear in Top 5 of each subcategory
- [ ] Copy Note present for each subcategory
- [ ] Summary table present
- [ ] #1 identification with mentions count
- [ ] Section length ≥ 80 lines

---

## EXAMPLE: Correct ROOT_CAUSE Section (Abbreviated)

```markdown
## SECTION 5: ROOT_CAUSE ANALYSIS (Why It Hurts)

### Bucket Overview
- **Total ROOT_CAUSE Quotes:** 238
- **PRD Minimum:** 200
- **Compliance:** 119%

**What This Bucket Answers:** What do golfers BELIEVE is causing their problem?

### TWO-TIER SUBCATEGORY BREAKDOWN TABLE

| Belief Category (Primary) | Mentions | Emotional Breakdown | % |
|---------------------------|----------|---------------------|---|
| MENTAL / PSYCHOLOGICAL | 66 | fear: 28, anxiety: 22 | 27.7% |
| TECHNIQUE BELIEFS | 54 | confusion: 24, frustration: 18 | 22.7% |
| EQUIPMENT BELIEFS | 48 | blame: 24, revelation: 14 | 20.2% |
...

### SUBCATEGORY 1: MENTAL / PSYCHOLOGICAL (66 mentions, 27.7%)

**Core Belief:** "It's all in my head"
**Why This Matters:** Opens equipment solution if anxiety isn't ROOT cause

**Emotional Breakdown:**
- Fear: 28 mentions (42.4%)
- Anxiety: 22 mentions (33.3%)
...

#### TOP 25 VERBATIM QUOTES

| Rank | ID | Quote | Source | Emotional | Priority |
|------|-----|-------|--------|-----------|----------|
| 1 | RC-V3-007 | "Fear of club digging into ground" | PGA PhD Research | fear | **GOLD** |
| 2 | RC-V3-008 | "yips exacerbated by anxiety but not caused by it" | PGA PhD | validation | **GOLD** |
...

**Copy Note:** PGA PhD proves anxiety EXACERBATES but doesn't CAUSE - equipment intervention works

---

[REPEAT FOR ALL SUBCATEGORIES]

---

### ROOT CAUSE SUMMARY: What They Believe → What's True

| Belief | Evidence Against | Copy Opportunity |
|--------|------------------|------------------|
| "It's mental" | "not CAUSED by anxiety" | Equipment removes trigger |
...

**THE #1 ROOT CAUSE BELIEF:** Mental/Psychological (66 mentions, 27.7%)
**THE #1 COPY OPPORTUNITY:** Equipment breaks the anxiety cycle
```

---

## REFERENCE

This template is referenced by:
- [[1.5-C-quantifier]] - Generates the initial quote categorization
- [[2.5-F-categorization-finalizer]] - Finalizes two-tier tags for ALL quotes
- [[2.5-G-validation-generator]] - Generates SYNTHESIS_VALIDATION.md with readable lines
- [[_performance-golf/pg-skills/pg-deep-research-v2/MASTER-AGENT#Phase 5]] - Assembles bucket sections for FINAL_HANDOFF.md
- [[RESEARCH-PRD]] - Defines minimums per bucket

**Data Flow (v3.5):**
```
Layer 1 → raw quotes collected
    ↓
Layer 2 → E5 analysis
    ↓
Layer 2.5 → two_tier_quotes.json (all quotes categorized)
    ↓
Layer 2.5 → SYNTHESIS_VALIDATION.md (human review)
    ↓
Human Checkpoint → APPROVED
    ↓
Final Handoff → Bucket sections ASSEMBLED from validated data
```

**Created:** 2026-01-18
**Last Updated:** 2026-01-20 (v3.5 Layer 2.5 integration)
