# Layer 1: Extraction + Classification

**Layer:** 1
**Type:** Analysis
**Purpose:** Extract proof elements from sources and classify using taxonomy
**Dependency:** PROOF-TAXONOMY.md

---

## EXTRACTION PROTOCOL

### Source Processing Order

Process sources in order of expected proof density:

1. **Testimonial files** — Highest density of SOCIAL proof
2. **Previous promotions** — Contains all categories, pre-structured
3. **Study documents** — Concentrated AUTHORITY + MECHANISM proof
4. **Product materials** — DATA, DEMONSTRATION, RISK REVERSAL
5. **Video transcripts** — Mixed, often DEMONSTRATION heavy

---

### Extraction by Source Type

#### Testimonial Files

**Look for:**
- Named customer quotes with results
- Before/after narratives
- Specific outcome claims
- Emotional transformation stories

**Extraction Pattern:**
```
FOR each testimonial block:
    1. Extract the quote/story
    2. Extract attribution (name, location, photo?)
    3. Extract specific results mentioned
    4. Extract timeframe if mentioned
    5. Note format (written, video, audio)
    6. Classify → SOCIAL category
```

**Example Extraction:**
```
Source text: "I lost 27 pounds in just 6 weeks! I've tried everything but
nothing worked until I found this. - Sarah M., Dallas TX"

Extracted element:
  raw_text: "I lost 27 pounds in just 6 weeks! I've tried everything..."
  category: SOCIAL
  sub_type: testimonial_specific_result (SOC-02)
  specific_result: "27 pounds in 6 weeks"
  attribution: "Sarah M., Dallas TX"
  format: written
```

---

#### Previous Promotions (Sales Copy)

**Look for:**
- Headline claims (often contain DATA)
- Lead section (SOCIAL, DEMONSTRATION)
- Mechanism section (MECHANISM, AUTHORITY)
- Proof sections (all categories)
- Offer section (RISK REVERSAL)
- Close section (SOCIAL, DATA)

**Extraction Pattern:**
```
FOR each promotion:
    1. Scan for quoted testimonials → SOCIAL
    2. Scan for study citations → AUTHORITY
    3. Scan for "X% of users" claims → DATA
    4. Scan for guarantee language → RISK REVERSAL
    5. Scan for demonstration descriptions → DEMONSTRATION
    6. Scan for mechanism explanations → MECHANISM
```

**Signal Words by Category:**

| Category | Signal Words/Phrases |
|----------|---------------------|
| SOCIAL | "customers say", "users report", "testimonial", "[name] from [place]" |
| AUTHORITY | "study", "research", "Dr.", "university", "peer-reviewed", "published" |
| DEMONSTRATION | "watch as", "see for yourself", "before/after", "side by side" |
| MECHANISM | "how it works", "the reason", "because", "the key is", "the secret" |
| DATA | numbers, percentages, "$", timeframes, "X out of Y" |
| RISK REVERSAL | "guarantee", "money back", "risk-free", "trial", "refund" |

---

#### Study Documents

**Look for:**
- Study title and publication info
- Sample size and methodology
- Key findings and statistics
- Author credentials
- Conclusion statements

**Extraction Pattern:**
```
FOR each study:
    1. Extract study metadata (title, journal, date)
    2. Extract methodology (sample size, controls)
    3. Extract key findings (quote exact statistics)
    4. Extract conclusion claims
    5. Classify based on study type:
       - If proves THAT something works → AUTHORITY
       - If proves HOW/WHY it works → MECHANISM
       - Extract DATA elements from statistics
```

---

#### Product Materials

**Look for:**
- Ingredient lists with research
- Process descriptions
- Specifications and data
- Guarantee terms
- Certification badges

**Extraction Pattern:**
```
FOR each product document:
    1. Extract ingredient/component research → AUTHORITY or MECHANISM
    2. Extract specifications → DATA
    3. Extract guarantee terms → RISK REVERSAL
    4. Extract certifications → AUTHORITY (validation_certification)
    5. Extract process descriptions → may be MECHANISM or DEMONSTRATION
```

---

## CLASSIFICATION PROTOCOL

Reference: [PROOF-TAXONOMY.md](../PROOF-TAXONOMY.md)

### Classification Steps

For each extracted element:

**Step 1: Identify Primary Function**
```
Ask: "What is this proof primarily DOING for the reader?"
- Showing others' experiences? → SOCIAL
- Establishing credibility? → AUTHORITY
- Showing product in action? → DEMONSTRATION
- Explaining why/how it works? → MECHANISM
- Providing numbers? → DATA
- Reducing risk? → RISK REVERSAL
```

**Step 2: Resolve Ambiguity**
```
IF element could fit multiple categories:
    Ask: "What is the PRIMARY purpose?"

    Examples:
    - "97% of users say it works" = DATA (the number) or SOCIAL (the users)?
      → If emphasizing the number = DATA
      → If emphasizing "users say" = SOCIAL

    - Celebrity endorsement = SOCIAL or AUTHORITY?
      → If they're lending their fame = SOCIAL (celebrity_testimonial)
      → If they're lending expertise = AUTHORITY (endorsement_celebrity)

    - Study showing results = AUTHORITY or DATA?
      → The study citation = AUTHORITY
      → The specific statistic from the study = DATA
      → Extract as TWO elements if both are prominent
```

**Step 3: Assign Sub-Type**
```
Match to the most specific sub-type in PROOF-TAXONOMY.md

Use sub-type IDs for precision:
- SOC-01 through SOC-15 for SOCIAL
- AUT-01 through AUT-20 for AUTHORITY
- DEM-01 through DEM-16 for DEMONSTRATION
- MEC-01 through MEC-10 for MECHANISM
- DAT-01 through DAT-12 for DATA
- RSK-01 through RSK-12 for RISK REVERSAL
```

**Step 4: Score Element**
```
Apply 5 scoring dimensions (1-10 each):

1. SPECIFICITY
   - Does it have exact numbers, names, dates?
   - Is it concrete and verifiable?

2. CREDIBILITY
   - Is the source trustworthy?
   - Can it be verified?

3. RELEVANCE
   - How directly does it support the claim?
   - Is the connection clear?

4. NOVELTY
   - Is this fresh in this market?
   - Or overused/cliche?

5. EMOTIONAL IMPACT
   - Does it create feeling?
   - Will readers care?
```

---

## DEDUPLICATION

### Same Proof, Multiple Sources

```
IF same proof element appears in multiple sources:
    - Keep the version with highest specificity
    - Note all sources in metadata
    - Do not count twice in totals
```

### Similar Testimonials

```
IF multiple testimonials make similar claims:
    - Keep all (they're different people)
    - Flag as "cluster" for ranking purposes
    - Note the pattern (e.g., "weight loss cluster")
```

---

## OUTPUT FORMAT

### Per-Element Output

```yaml
proof_element:
  id: "PROOF-001"
  raw_text: "The exact text extracted"

  classification:
    category: "SOCIAL"
    category_id: 1
    sub_type: "testimonial_specific_result"
    sub_type_id: "SOC-02"
    confidence: 0.95

  scores:
    specificity: 8
    credibility: 7
    relevance: 9
    novelty: 6
    emotional_impact: 8
    composite: 7.6

  metadata:
    source_file: "testimonials.md"
    source_line: 45
    extraction_notes: "Strong specific result with exact figures"

  attributes:  # Category-specific attributes
    specific_result: "27 pounds in 6 weeks"
    attribution: "Sarah M., Dallas TX"
    format: "written"
    has_photo: false
```

### Aggregated Output

```yaml
extraction_summary:
  total_elements_extracted: 47

  by_category:
    social:
      count: 18
      quality_distribution:
        strong: 5   # Composite >= 7
        medium: 8   # Composite 4-6.9
        weak: 5     # Composite < 4
      sub_type_breakdown:
        testimonial_transformation: 3
        testimonial_specific_result: 7
        testimonial_video: 2
        review_rating: 4
        user_count: 2

    authority:
      count: 12
      quality_distribution: {...}
      sub_type_breakdown: {...}

    demonstration:
      count: 6
      quality_distribution: {...}
      sub_type_breakdown: {...}

    mechanism:
      count: 4
      quality_distribution: {...}
      sub_type_breakdown: {...}

    data:
      count: 5
      quality_distribution: {...}
      sub_type_breakdown: {...}

    risk_reversal:
      count: 2
      quality_distribution: {...}
      sub_type_breakdown: {...}

  gaps_identified:
    missing_categories: ["mechanism"]  # 0 elements
    weak_categories: ["demonstration", "risk_reversal"]  # All weak quality
    under_represented: ["data"]  # Count < 5

  strength_score: 64  # 0-100 composite
```

---

## HANDOFF TO LAYER 2

Pass to Layer 2 (Gap Analysis + Discovery):

1. **Complete element list** with classifications and scores
2. **Aggregated summary** with counts and quality distributions
3. **Gaps identified** for Discovery operation
4. **Schwartz stage context** (if known) for ranking weights

---

## EDGE CASES

### Empty or Minimal Sources

```
IF source_file has < 5 extractable elements:
    WARN: "Source {filename} yielded minimal proof. Consider adding more materials."
```

### Unclassifiable Elements

```
IF element doesn't clearly fit any category:
    1. Re-read element for hidden classification clues
    2. If still unclear, classify as most likely category with confidence < 0.5
    3. Flag for human review
```

### Foreign Language Elements

```
IF element is not in English:
    1. Note language in metadata
    2. Extract anyway (may be translatable)
    3. Flag for translation if proof appears strong
```
