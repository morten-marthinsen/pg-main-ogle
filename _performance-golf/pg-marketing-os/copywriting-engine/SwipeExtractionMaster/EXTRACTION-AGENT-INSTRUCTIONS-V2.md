# Extraction Agent Instructions v2.0

**Purpose:** Guide for extracting PROOF and PROMISE domains from swipe files into the vault schema.

**Extraction Status:**
| Domain | Status | Notes |
|--------|--------|-------|
| Big Ideas | ✅ COMPLETE | See GenerativeEngine for patterns |
| Mechanism | ✅ COMPLETE | See 03-mechanisms skill output |
| Root Cause | ✅ COMPLETE | See 02-root-cause skill output |
| **Proof** | 🔄 IN PROGRESS | Deep extraction required (this document) |
| **Promise** | 🔄 IN PROGRESS | Extraction fields defined (this document) |

---

## CRITICAL PATHS

### Swipe Vault Location (SOURCE)
```
/Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/CopywritingEngine/PremiumSwipeVault
```

**Vault Structure:**
```
PremiumSwipeVault/
├── Processed/           ← 1,326 existing JSON extractions (UPDATE these)
├── SCHEMA/
│   └── unified-extraction-schema.json
└── [source collections may be in separate location]
```

### Output Location (WRITE TO)
```
/Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/CopywritingEngine/PremiumSwipeVault/Processed/
```

### Schema Location
```
/Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/CopywritingEngine/PremiumSwipeVault/SCHEMA/unified-extraction-schema.json
```

### Source Swipe Files (RAW COPY) — MULTIPLE LOCATIONS

**PRIMARY SOURCE (4,292 files):**
```
/Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/BigIdeaEngine/Data/Cleaned_Swipe_File/
├── Crème de la Crème Controls/              (118 files)
├── 107 GREATEST Ads.../                     (100 files)
├── Direct Mail HEALTH Motherlode/           (394 files)
├── Direct Mail FiINANCIAL Motherlode/       (244 files)
├── Billion Dollar Boys.../                  (15 files)
├── Biz Op Swipes Old School/                (120 files)
├── Health & Beauty PRINT Ad Motherlode/     (1,912 files)
├── Financial PRINT Motherlode/              (258 files)
├── Self-Help/                               (223 files)
└── [other collections]
```

**SECONDARY SOURCE — CA-Pro VSL/TSL Queue (1,087 files):**
```
/Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/BigIdeaEngine/Data/CA-Pro-Database/VSL-TSL-Queue/
├── Happy_Mammoth_*.md                       (17+ files)
├── Native_Path_*.md                         (8+ files)
├── GlucoComplete_*.md                       (2 files)
├── GlucoTrust_*.md                          (2 files)
├── Golden_Hippo_*.md                        (VSL transcripts)
└── [other modern VSL/TSL transcripts]
```

**TERTIARY SOURCE — Raw Originals (14 files):**
```
/Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/BigIdeaEngine/Data/SuperMasterSwipeFile/Raw-Originals/
```

**PERFORMANCE GOLF (1 file):**
```
/Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/Copywriting-Business/Universal/projects/Performance-Golf/
```

**CRITICAL: When extracting, ALWAYS populate the `raw_swipe_file` field with the full path to the source file. This enables re-extraction and auditing.**

### Extraction Principle
**EXTRACT from copy, don't FABRICATE.** Every field must come from actual copy text. If something isn't in the swipe, mark it null—never invent.

---

# MANDATORY VALIDATION GATES (ADDED 2026-01-28)

> **INCIDENT CONTEXT:** On 2026-01-27, 88 extractions were generated from abbreviated JSON metadata files (arsenal_ prefix) that contained only 20-word descriptions instead of actual 500-1000 word copy. The extractions claimed "950 words extracted" and "95% confidence" when the source had 22 words. This section prevents that failure mode.

## PRE-EXTRACTION VALIDATION GATE (MUST PASS BEFORE ANY EXTRACTION)

**HALT CONDITIONS — If ANY of these fail, DO NOT PROCEED:**

### 1. Source Content Word Count Threshold
```
IF source_file.full_text.word_count < 500:
  HALT
  LOG: "❌ VALIDATION FAILED: Source file {filename} has only {count} words. Minimum 500 required for extraction."
  ALERT_USER: "Source file appears to be metadata/summary, not actual copy. Cannot extract."
  ACTION: Add to MISSING_SOURCE_QUEUE.md for manual resolution
  DO_NOT_PROCEED: true
```

### 2. Content Type Detection (Metadata vs Copy)
```
IF source_file.full_text contains ANY of these descriptor phrases:
  - "establishes", "creates empathy", "demonstrates", "serves as"
  - "positions the", "sets up the", "transitions to"
  - "[description]", "[summary]", "[analysis]"
THEN:
  HALT
  LOG: "❌ VALIDATION FAILED: Source appears to be metadata description, not actual sales copy."
  ALERT_USER: "Source file contains analytical language, not verbatim copy."
  DO_NOT_PROCEED: true
```

### 3. Prose Structure Check
```
IF source_file.full_text does NOT contain:
  - At least 5 complete sentences (ending in . ! or ?)
  - AND at least ONE of: quotation marks, call-to-action phrases, price mentions
THEN:
  HALT
  LOG: "❌ VALIDATION FAILED: Source lacks prose structure expected of sales copy."
  ALERT_USER: "Content does not appear to be sales/marketing copy."
  DO_NOT_PROCEED: true
```

### 4. Known Problem Source Detection
```
IF source_file.swipe_id starts with "arsenal_":
  CHECK: Does matching markdown source exist in:
    /BigIdeaEngine/Data/Cleaned_Swipe_File/107 GREATEST Ads.../
  IF markdown source exists:
    USE markdown source, NOT the abbreviated JSON
  ELSE:
    HALT
    LOG: "❌ Arsenal source requires markdown original. JSON is metadata only."
    DO_NOT_PROCEED: true
```

## POST-EXTRACTION VALIDATION GATE (MUST PASS BEFORE SAVING)

### 5. Output-Source Cross-Validation
```
IF extraction.claimed_word_count > (source.actual_word_count * 1.5):
  REJECT
  LOG: "❌ FABRICATION DETECTED: Claimed {X} words but source has only {Y} words."
  DELETE_EXTRACTION: true
  ALERT_USER: "Extraction appears fabricated. Output exceeds source by >50%."
```

### 6. Proof Element Plausibility Check
```
MAX_PLAUSIBLE_ELEMENTS = source.word_count / 40

IF extraction.proof_elements_count > MAX_PLAUSIBLE_ELEMENTS:
  REJECT
  LOG: "❌ FABRICATION DETECTED: Cannot extract {X} proof elements from {Y} word source. Max plausible: {MAX}."
  DELETE_EXTRACTION: true
```

### 7. Confidence Score Anchor
```
IF source.word_count < 300 AND extraction.confidence_score > 60:
  REJECT
  LOG: "❌ CONFIDENCE INVALID: {X}% confidence impossible from {Y} word source."

CONFIDENCE_CEILING = min(95, source.word_count / 10)
IF extraction.confidence_score > CONFIDENCE_CEILING:
  WARN: "Confidence score {X}% exceeds plausible ceiling of {CEILING}% for this source."
```

## PROVENANCE CHAIN (REQUIRED IN EVERY EXTRACTION)

Every extraction MUST include this provenance block:

```json
{
  "provenance": {
    "source_file_path": "/full/path/to/actual/source.md",
    "source_file_type": "markdown|json_with_full_text|transcript",
    "source_word_count_actual": 950,
    "source_content_hash": "sha256:first8chars",
    "extraction_timestamp": "2026-01-28T13:00:00Z",
    "validation_gates_passed": {
      "word_count_threshold": true,
      "content_type_check": true,
      "prose_structure_check": true,
      "output_source_cross_validation": true,
      "proof_plausibility_check": true,
      "confidence_anchor_check": true
    },
    "extractor_version": "v2.1"
  }
}
```

**IF ANY validation_gates_passed field would be false → DO NOT SAVE EXTRACTION**

## SOURCE QUALITY CLASSIFICATION

Before extraction, classify every source:

| Classification | Criteria | Action |
|----------------|----------|--------|
| `VALID_SOURCE` | full_text > 500 words, prose structure, no descriptor phrases | ✅ PROCEED with extraction |
| `ABBREVIATED_METADATA` | full_text < 100 words OR contains descriptor phrases | ❌ HALT + ALERT + Add to requeue |
| `PARTIAL_SOURCE` | 100-500 words, some prose structure | ⚠️ WARN + REQUEST_CONFIRMATION before proceeding |
| `NO_SOURCE` | file missing OR full_text empty/null | ❌ HALT + ALERT |

**KNOWN ABBREVIATED SOURCES:**
- `arsenal_*` prefix files in PremiumSwipeVault 2/Processed/ → Use markdown originals in BigIdeaEngine instead
- Any JSON where `lead.word_count` < 50 but claims full extraction

---

# DOMAIN 1: DEEP PROOF EXTRACTION

## The Problem with Category-Level Extraction

Current vault has only **category-level** proof data:
```yaml
# INSUFFICIENT (current)
proof:
  types_used: [testimonials, studies, credentials]
  density: heavy
```

We need **sub-element level** extraction with full 75-sub-type taxonomy:
```yaml
# REQUIRED (new)
proof_inventory:
  elements:
    - category: SOCIAL
      sub_type_id: SOC-02
      sub_type: testimonial_specific_result
      raw_text: "I lost 27 pounds in just 3 weeks..."
      scores:
        specificity: 9
        credibility: 7
        relevance: 8
        novelty: 5
        emotional_impact: 8
        composite: 7.4
```

---

## The 6-Category, 75-Sub-Type Taxonomy

### Category 1: SOCIAL (15 Sub-Types)

**Definition:** Proof derived from other people's experiences, behaviors, and validation.
**Primary Question:** "What have OTHER PEOPLE experienced or said?"

| ID | Sub-Type | Definition | Signal Words |
|----|----------|------------|--------------|
| SOC-01 | testimonial_transformation | Full before/after narrative from customer | "I used to... now I..." |
| SOC-02 | testimonial_specific_result | Customer citing exact numbers/outcomes | "I lost 27 pounds", "Made $10,000" |
| SOC-03 | testimonial_video | On-camera customer endorsement | [Video indicator] |
| SOC-04 | testimonial_audio | Voice recording endorsement | [Audio indicator] |
| SOC-05 | testimonial_written | Text-only testimonial | Quoted text, letter format |
| SOC-06 | testimonial_anonymous | No name attribution | "A customer from Texas said..." |
| SOC-07 | testimonial_celebrity | Famous person endorsement | Celebrity name mentioned |
| SOC-08 | review_rating | Platform ratings (stars) | "4.8 stars", "5-star reviews" |
| SOC-09 | review_volume | Quantity of reviews | "Over 10,000 reviews" |
| SOC-10 | user_count | Number of customers | "Join 50,000+ customers" |
| SOC-11 | bestseller_status | Rankings, #1 claims | "#1 bestseller", "Top-rated" |
| SOC-12 | waitlist_demand | Demand/scarcity indicators | "Waitlist of 5,000 people" |
| SOC-13 | geographic_spread | Customer distribution | "Customers in 47 countries" |
| SOC-14 | community_size | Group/membership numbers | "Active community of 25,000" |
| SOC-15 | user_generated_content | Customer-created content | User photos, stories, creations |

**Boundary Cases:**
- Celebrity endorsement of CREDENTIALS → AUTHORITY (AUT-16)
- User count as a STATISTIC → DATA (if framed as number, not social proof)

---

### Category 2: AUTHORITY (20 Sub-Types)

**Definition:** Proof derived from credentials, expertise, institutional backing, and third-party validation.
**Primary Question:** "WHO says this is true/good, and what makes them qualified?"

| ID | Sub-Type | Definition | Signal Words |
|----|----------|------------|--------------|
| AUT-01 | study_peer_reviewed | Published in journals | "Published in Journal of...", "Peer-reviewed" |
| AUT-02 | study_clinical_trial | Controlled medical study | "Double-blind", "Placebo-controlled" |
| AUT-03 | study_university | Academic institution research | "Harvard study", "Research from MIT" |
| AUT-04 | study_independent_lab | Third-party testing | "Independent lab verified" |
| AUT-05 | study_company | Internal research | "Our research shows" |
| AUT-06 | study_meta_analysis | Analysis of multiple studies | "Meta-analysis of 50 studies" |
| AUT-07 | credential_inventor | Creator's qualifications | "Dr. X, who developed..." |
| AUT-08 | credential_company | Business authority markers | "Industry leader", "Established 1952" |
| AUT-09 | credential_education | Degrees, certifications | "PhD from Stanford", "Board certified" |
| AUT-10 | credential_experience | Years in field | "30 years of experience" |
| AUT-11 | credential_achievements | Awards, recognitions | "Winner of the X Award" |
| AUT-12 | credential_famous_clients | Notable people served | "Trusted by Fortune 500 CEOs" |
| AUT-13 | credential_patents | Innovation proof | "Patented technology" |
| AUT-14 | endorsement_expert | Authority figure approval | "Recommended by Dr. Oz" |
| AUT-15 | endorsement_professional | Professional recommendation | "Doctor recommended" |
| AUT-16 | endorsement_celebrity | Famous person credibility lend | Celebrity vouching for effectiveness |
| AUT-17 | validation_government | FDA approval, etc. | "FDA approved", "USDA certified" |
| AUT-18 | validation_certification | Official seals/badges | "GMP certified", "ISO 9001" |
| AUT-19 | validation_industry_award | Recognition from field | "Best of CES 2024" |
| AUT-20 | validation_media | News coverage | "As seen on CNN", "Featured in Forbes" |

**Boundary Cases:**
- Study proving MECHANISM → MECHANISM (MEC-01)
- Expert explaining WHY something works → MECHANISM (MEC-07)

---

### Category 3: DEMONSTRATION (16 Sub-Types)

**Definition:** Visual, sensory, or experiential proof that SHOWS the product/result in action.
**Primary Question:** "Can I SEE this working?"

| ID | Sub-Type | Definition | Signal Words |
|----|----------|------------|--------------|
| DEM-01 | demo_live | Real-time demonstration | "Watch as I...", "Right now, live..." |
| DEM-02 | demo_video | Recorded proof | "See the video proof" |
| DEM-03 | demo_side_by_side | A/B comparison test | "On the left... on the right..." |
| DEM-04 | demo_stress_test | Extreme conditions test | "We put it through..." |
| DEM-05 | demo_destruction | Proving durability | "Even when we hit it with a hammer" |
| DEM-06 | demo_speed | Showing quick results | "In just 30 seconds, watch as..." |
| DEM-07 | demo_contrast | Ours vs. theirs comparison | "Compared to Brand X..." |
| DEM-08 | before_after_photo | Side-by-side transformation images | [Photo comparison] |
| DEM-09 | before_after_video | Video transformation/timelapse | [Video timelapse] |
| DEM-10 | before_after_screenshot | Digital results comparison | Dashboard/app screenshots |
| DEM-11 | before_after_metrics | Numbers before vs. after | "Weight went from 200 to 165" |
| DEM-12 | before_after_lifestyle | Quality of life change shown | Visual of life improvement |
| DEM-13 | behind_scenes | How it's made/works | Factory tour, process revelation |
| DEM-14 | ingredient_showcase | Components displayed | "Contains real gold particles" |
| DEM-15 | process_walkthrough | Step-by-step visualization | "Step 1... Step 2... Step 3..." |
| DEM-16 | calculator_interactive | User can calculate own result | ROI calculator, dosage calculator |

**Boundary Cases:**
- Demo showing WHY mechanism works → MECHANISM (if explaining the why)
- Before/after TESTIMONIAL → SOCIAL (if customer-narrated transformation)

---

### Category 4: MECHANISM (10 Sub-Types)

**Definition:** Proof that the SPECIFIC MECHANISM (how it works) is valid. This proves WHY and HOW, not just THAT.
**Primary Question:** "WHY does this work? What's the scientific/logical basis?"

| ID | Sub-Type | Definition | Signal Words |
|----|----------|------------|--------------|
| MEC-01 | mechanism_study | Research proving how it works | "Studies show the compound targets..." |
| MEC-02 | mechanism_scientific_principle | Underlying science explained | "Based on the principle of thermogenesis" |
| MEC-03 | mechanism_analogy_proof | Proven concept in new domain | "Just like how X works, this..." |
| MEC-04 | mechanism_ingredient_research | Studies on specific components | "The key ingredient, curcumin, has been shown to..." |
| MEC-05 | mechanism_process_validation | Steps verified by authority | "This 3-step process is endorsed by..." |
| MEC-06 | mechanism_historical_precedent | "Used for centuries" proof | "Ancient remedy used by..." |
| MEC-07 | mechanism_expert_explanation | Authority explains why it works | "Dr. X explains: 'The reason this works is...'" |
| MEC-08 | mechanism_logical_chain | Step-by-step causation proof | "When A happens, it causes B, which leads to C" |
| MEC-09 | mechanism_competitor_admission | Rivals acknowledge the approach | "Even competitors admit..." |
| MEC-10 | mechanism_patent_citation | Innovation legally validated | "Patent #12345 proves the unique..." |

**Key Distinction:**
- DEMONSTRATION shows THAT it works
- MECHANISM proves WHY it works

---

### Category 5: DATA (12 Sub-Types)

**Definition:** Numerical, statistical, and quantified proof elements.
**Primary Question:** "What are the NUMBERS?"

| ID | Sub-Type | Definition | Signal Words |
|----|----------|------------|--------------|
| DAT-01 | data_exact_statistic | Precise numbers | "97.3% of users", "Lost an average of 27.4 lbs" |
| DAT-02 | data_percentage | X% improvement/result | "73% improvement", "Reduced by 50%" |
| DAT-03 | data_success_rate | Success rate claim | "97% success rate", "9 out of 10" |
| DAT-04 | data_money_figures | Dollar amounts | "Save $2,847 per year", "Worth $997" |
| DAT-05 | data_time_figures | Time quantities | "In just 14 days", "Saves 3 hours daily" |
| DAT-06 | data_comparison | Comparative statistics | "3x faster", "5x more effective" |
| DAT-07 | data_source_cited | Statistics with attribution | "According to the CDC, 47% of..." |
| DAT-08 | data_proprietary | Exclusive/internal numbers | "Our internal data shows..." |
| DAT-09 | data_real_time | Current/live stats | "Right now, 347 people are using..." |
| DAT-10 | data_historical | Track record over time | "For 15 years, our success rate..." |
| DAT-11 | data_aggregated | Combined results across users | "Collectively, our users have lost 2M lbs" |
| DAT-12 | data_case_count | Number of cases/examples | "In 5,000 documented cases..." |

**Boundary Cases:**
- User COUNT as social proof → SOCIAL (SOC-10) if framed as "join others"
- Statistic FROM a study → AUTHORITY (the study is authority, stat is data within)

---

### Category 6: RISK REVERSAL (12 Sub-Types)

**Definition:** Proof that reduces or eliminates buyer risk — guarantees, trials, and protection mechanisms.
**Primary Question:** "What happens if it doesn't work for me?"

| ID | Sub-Type | Definition | Signal Words |
|----|----------|------------|--------------|
| RSK-01 | guarantee_money_back | Full refund promise | "100% money-back guarantee" |
| RSK-02 | guarantee_extended | Long guarantee period | "365-day guarantee", "Full year to decide" |
| RSK-03 | guarantee_double | Double your money back | "Double your money back if..." |
| RSK-04 | guarantee_conditional | Specific condition guarantee | "If you don't lose 10 lbs, full refund" |
| RSK-05 | guarantee_unconditional | No questions asked | "No questions asked, full refund" |
| RSK-06 | guarantee_specific_result | Guaranteeing specific outcome | "Guaranteed to increase by 50% or refund" |
| RSK-07 | trial_free | Try before you buy | "Free 30-day trial", "Try it risk-free" |
| RSK-08 | trial_discounted | Reduced-price trial | "$1 trial", "75% off first month" |
| RSK-09 | trial_keep_bonus | Keep the bonus either way | "Keep the bonus even if you return" |
| RSK-10 | support_included | Ongoing help promised | "Lifetime support included" |
| RSK-11 | warranty_product | Physical product protection | "3-year warranty" |
| RSK-12 | warranty_lifetime | Lifetime coverage | "Lifetime warranty" |

---

## The 5-Dimension Scoring System

**For EVERY proof element extracted, score on these 5 dimensions (1-10):**

### Dimension 1: Specificity
How precise and concrete is this proof?

| Score | Criteria |
|-------|----------|
| 10 | Exact numbers, names, dates, verifiable details |
| 7 | Fairly specific with some quantification |
| 4 | General claims, approximate figures |
| 1 | Vague, unquantified, generic |

### Dimension 2: Credibility
How believable is the source?

| Score | Criteria |
|-------|----------|
| 10 | Peer-reviewed, government, highly reputable |
| 7 | Named expert, established company |
| 4 | Anonymous but plausible |
| 1 | Unattributed, suspicious, unverifiable |

### Dimension 3: Relevance
How directly does this support the claim/promise?

| Score | Criteria |
|-------|----------|
| 10 | Directly proves the exact claim being made |
| 7 | Strongly related, clear connection |
| 4 | Adjacent, requires some inference |
| 1 | Tangentially related at best |

### Dimension 4: Novelty
How fresh/unused is this proof?

| Score | Criteria |
|-------|----------|
| 10 | Never seen in this market |
| 7 | Uncommon, fresh angle |
| 4 | Sometimes used, somewhat familiar |
| 1 | Overused, cliche, market-exhausted |

### Dimension 5: Emotional Impact
How does this make the reader FEEL?

| Score | Criteria |
|-------|----------|
| 10 | Powerful emotional response (awe, relief, hope) |
| 7 | Notable emotional resonance |
| 4 | Mildly engaging |
| 1 | Emotionally flat, boring |

### Composite Score Calculation

```
Base Score = (Specificity + Credibility + Relevance + Novelty + Emotional Impact) / 5

Schwartz Stage Adjustments:
- Stage 1-2: Weight SOCIAL and DEMONSTRATION higher (+20%)
- Stage 3: Weight MECHANISM higher (+30%)
- Stage 4: Weight AUTHORITY and DATA higher (+20%)
- Stage 5: Weight SOCIAL (identification) higher (+30%)

Final Score = Base Score * Stage Adjustment
```

---

## Proof Element Output Schema

```yaml
proof_element:
  id: "PROOF-001"  # Sequential ID within swipe
  raw_text: "The actual proof text from source"

  classification:
    category: "SOCIAL"  # One of 6 categories
    sub_type: "testimonial_specific_result"
    sub_type_id: "SOC-02"
    confidence: 0.95  # How confident in this classification

  scores:
    specificity: 8
    credibility: 7
    relevance: 9
    novelty: 6
    emotional_impact: 8
    composite: 7.6
    stage_adjusted: 9.12  # After Schwartz adjustment

  context:
    position_in_copy: "early_body"  # lead, early_body, mid_body, late_body, close
    supports_claim: "Weight loss promise"  # What claim does this support?
    mechanism_aligned: true  # Does it support the mechanism?

  source:
    swipe_file: "filename.md"
    approximate_location: "paragraph 15"  # Or timestamp for VSL
```

---

## Proof Inventory Aggregation

After extracting all individual proof elements, aggregate into:

```yaml
proof_inventory:
  total_elements: 23

  by_category:
    SOCIAL: 8
    AUTHORITY: 5
    DEMONSTRATION: 4
    MECHANISM: 2
    DATA: 3
    RISK_REVERSAL: 1

  by_sub_type:
    - sub_type_id: SOC-02
      count: 5
      avg_composite: 7.8
    - sub_type_id: AUT-03
      count: 2
      avg_composite: 8.2
    # ... etc

  gaps:
    missing_categories: [MECHANISM]  # Categories with 0 elements
    weak_categories: [RISK_REVERSAL]  # Categories with low scores

  strongest_elements:
    - id: "PROOF-007"
      sub_type_id: "AUT-02"
      composite: 9.1
      raw_text: "Double-blind clinical trial..."

  overall_strength_score: 73  # 0-100

  promise_ceiling: "significant_improvement"
  # Based on proof strength:
  # transformation (90+)
  # significant_improvement (70-89)
  # noticeable_improvement (50-69)
  # some_benefit (30-49)
  # minimal (<30)
```

---

## Deep Proof Extraction Protocol

### Step 1: First Pass — Identify All Proof Elements

Read the entire swipe and mark every proof element. Look for:
- Testimonial indicators: quotes, names, locations, photos, video references
- Study references: "research shows", "scientists found", "study published"
- Credential markers: degrees, certifications, years of experience
- Demonstration language: "watch as", "see for yourself", "live example"
- Statistics: percentages, numbers, timeframes, comparisons
- Guarantees: "money back", "risk free", "guaranteed"

### Step 2: Classify Each Element

For each proof element:
1. **Determine primary function** — What is this proof DOING for the reader?
2. **Match to category** — Use the decision tree:
   ```
   Showing OTHER PEOPLE'S experiences? → SOCIAL
   Establishing CREDIBILITY? → AUTHORITY
   SHOWING product/result in action? → DEMONSTRATION
   Proving WHY/HOW mechanism works? → MECHANISM
   Providing NUMBERS/statistics? → DATA
   REDUCING RISK? → RISK REVERSAL
   ```
3. **Match to sub-type** — Use the ID tables above
4. **Assign confidence** — How certain is this classification? (0-1)

### Step 3: Score Each Element

Apply the 5-dimension scoring:
- Specificity (1-10)
- Credibility (1-10)
- Relevance (1-10)
- Novelty (1-10)
- Emotional Impact (1-10)

Calculate composite: `(S + C + R + N + E) / 5`

### Step 4: Note Context

For each element:
- Position in copy (where does it appear?)
- What claim does it support?
- Is it mechanism-aligned?

### Step 5: Aggregate

Build the proof_inventory summary with:
- Counts by category and sub-type
- Gap analysis
- Strongest elements
- Overall strength score
- Promise ceiling determination

---

## Proof Extraction Examples

### Heavy Proof Health VSL

```yaml
proof_inventory:
  total_elements: 47

  by_category:
    SOCIAL: 23
    AUTHORITY: 12
    DEMONSTRATION: 5
    MECHANISM: 3
    DATA: 3
    RISK_REVERSAL: 1

  elements:
    - id: "PROOF-001"
      raw_text: "Sarah M. from Ohio lost 27 pounds in just 6 weeks—and has kept it off for 2 years now"
      classification:
        category: SOCIAL
        sub_type: testimonial_specific_result
        sub_type_id: SOC-02
        confidence: 0.95
      scores:
        specificity: 9  # Exact numbers, location, timeframe
        credibility: 7  # Named but unverifiable
        relevance: 9  # Directly supports weight loss promise
        novelty: 4  # Common testimonial format
        emotional_impact: 8  # Aspirational, specific
        composite: 7.4

    - id: "PROOF-002"
      raw_text: "In a double-blind clinical trial published in the Journal of Metabolic Research, 87% of participants saw significant improvement within 28 days"
      classification:
        category: AUTHORITY
        sub_type: study_clinical_trial
        sub_type_id: AUT-02
        confidence: 0.98
      scores:
        specificity: 9  # Journal named, percentage, timeframe
        credibility: 9  # Peer-reviewed, clinical trial
        relevance: 9  # Directly validates mechanism
        novelty: 6  # Clinical trial format familiar
        emotional_impact: 7  # Hope-inducing
        composite: 8.0

  overall_strength_score: 82
  promise_ceiling: significant_improvement
```

### Light Proof Golf VSL

```yaml
proof_inventory:
  total_elements: 11

  by_category:
    SOCIAL: 3
    AUTHORITY: 4
    DEMONSTRATION: 4
    MECHANISM: 0
    DATA: 0
    RISK_REVERSAL: 0

  elements:
    - id: "PROOF-001"
      raw_text: "Coach of 3 major winners including [names]"
      classification:
        category: AUTHORITY
        sub_type: credential_famous_clients
        sub_type_id: AUT-12
        confidence: 0.95
      scores:
        specificity: 8  # Specific achievement, could name names
        credibility: 9  # Verifiable credentials
        relevance: 8  # Establishes teaching authority
        novelty: 5  # Common credential format
        emotional_impact: 7  # Aspirational
        composite: 7.4

    - id: "PROOF-002"
      raw_text: "Watch as I demonstrate this exact move—see how the club drops into the slot automatically"
      classification:
        category: DEMONSTRATION
        sub_type: demo_live
        sub_type_id: DEM-01
        confidence: 0.90
      scores:
        specificity: 7  # Shows specific move
        credibility: 8  # Visual proof
        relevance: 9  # Directly shows mechanism
        novelty: 6  # Live demo standard in golf
        emotional_impact: 8  # Satisfying visual proof
        composite: 7.6

  gaps:
    missing_categories: [MECHANISM, DATA, RISK_REVERSAL]
    weak_categories: [SOCIAL]

  overall_strength_score: 58
  promise_ceiling: noticeable_improvement
```

---

# DOMAIN 2: PROMISE EXTRACTION

## Promise Field Definitions

From PROMISE-AGENT.md, extract these fields for each swipe:

```yaml
promise_extraction:
  # Core Promise
  primary_promise:
    statement: [string]
    # The actual promise text — the transformation/outcome promised
    # Example: "Burn 8 pounds of belly fat in the next 72 hours"

    promise_type: [enum]
    # Options:
    #   transformation — Complete change of state
    #   improvement — Better version of current state
    #   relief — Removal of pain/problem
    #   capability — Gain new ability
    #   prevention — Avoid negative outcome

  # Specificity Markers
  specificity_markers:
    timeframe: [string or null]
    # When will result occur?
    # Examples: "in 7 days", "within 30 minutes", "by next week"

    quantity: [string or null]
    # How much change?
    # Examples: "23 pounds", "30 extra yards", "$10,000/month"

    qualifier: [string or null]
    # What specifically changes?
    # Examples: "belly fat", "blood pressure", "golf handicap"

    without_sacrifice: [string or null]
    # What they DON'T have to give up
    # Examples: "without dieting", "without changing your swing", "without working harder"

    even_if: [string or null]
    # Overcoming obstacles
    # Examples: "even if you're over 60", "even if you've failed before", "even if you have no experience"

  # Emotional Dimension
  emotional_dimension:
    core_feeling: [string]
    # What feeling does the promise evoke?
    # Examples: "freedom from embarrassment", "confidence on the course", "financial security"

    pain_removed: [string or null]
    # What pain/frustration goes away?

    pleasure_gained: [string or null]
    # What positive experience is gained?

  # Calibration Signals
  calibration_signals:
    believability_devices: [array of strings]
    # What makes the promise credible?
    # Examples: "results may vary", "when combined with...", "if you follow the steps"

    hedges: [array of strings]
    # Any limiting language?
    # Examples: "up to", "as much as", "depending on"

    conditions: [array of strings]
    # Requirements for the promise?
    # Examples: "for people who...", "works best if..."

  # Mechanism Link
  mechanism_link:
    mechanism_delivers: [string or null]
    # How does the mechanism connect to the promise?
    # Example: "The Metabolic Reset Protocol restores deep sleep, which enables..."

    superiority_framing: [string or null]
    # Is there a "the ONLY way" or "the BEST way" claim?
    # Example: "The only method that addresses the root cause directly"

  # Position in Copy
  position:
    headline_promise: [string or null]
    # Promise as stated in headline

    subhead_promise: [string or null]
    # Promise as stated in subhead

    body_promise: [string or null]
    # Expanded promise in body copy

    close_promise: [string or null]
    # Restated promise in close
```

---

## Promise Type Definitions

### 1. TRANSFORMATION
**Pattern:** Complete change of state — from X to not-X
**Signal Words:** "become", "transform", "finally be", "no longer"
**Example:** "Transform from a frustrated 20-handicapper into the player your buddies envy"

### 2. IMPROVEMENT
**Pattern:** Better version of current state — more/less of something
**Signal Words:** "increase", "boost", "add", "reduce", "improve"
**Example:** "Add 20-30 yards to your drives while hitting more fairways"

### 3. RELIEF
**Pattern:** Removal of pain/problem/frustration
**Signal Words:** "eliminate", "end", "stop", "never again", "finally free from"
**Example:** "End the frustration of inconsistent iron shots forever"

### 4. CAPABILITY
**Pattern:** Gain new ability they didn't have before
**Signal Words:** "now you can", "finally able to", "unlock the ability"
**Example:** "Finally hit a draw on command—even if you've sliced for 20 years"

### 5. PREVENTION
**Pattern:** Avoid negative future outcome
**Signal Words:** "protect", "prevent", "avoid", "never worry about"
**Example:** "Protect your retirement from the coming market correction"

---

## Promise Extraction Protocol

### Step 1: Find Primary Promise

Look in these locations (in order of priority):
1. **Headline** — Often contains the core promise
2. **Subhead** — Expands or specifies the headline
3. **Early body** — "Imagine...", "Finally...", "Now you can..."
4. **Close** — Restated/amplified promise

Extract the CORE promise — what transformation/outcome is being sold?

### Step 2: Extract Specificity Markers

For each marker present:
- **Timeframe:** Look for time words (days, weeks, minutes, hours)
- **Quantity:** Look for numbers (pounds, dollars, yards, percent)
- **Qualifier:** Look for what specifically changes
- **Without sacrifice:** Look for "without", "no need to"
- **Even if:** Look for "even if", "regardless of", "no matter"

### Step 3: Identify Emotional Dimension

- What FEELING does the promise evoke?
- What PAIN goes away?
- What PLEASURE is gained?

### Step 4: Note Calibration Signals

- Believability devices (conditions, hedges)
- Any limiting language
- Requirements for the promise to work

### Step 5: Map Mechanism Link

- How does the mechanism connect to the promise?
- Is there a superiority claim?

### Step 6: Track Position

- Where does the promise appear in the copy?
- How is it stated differently at each position?

---

## Promise Extraction Examples

### Golf Promise Extraction

```yaml
promise_extraction:
  primary_promise:
    statement: "Add 20-30 yards to your drives while hitting more fairways than ever before"
    promise_type: improvement

  specificity_markers:
    timeframe: "within your first round"
    quantity: "20-30 yards"
    qualifier: "drives"
    without_sacrifice: "without overhauling your entire swing"
    even_if: "even if you're over 60 with a bad back"

  emotional_dimension:
    core_feeling: "confidence and pride on the first tee"
    pain_removed: "embarrassment of short, inconsistent drives"
    pleasure_gained: "respect from playing partners, more birdie opportunities"

  calibration_signals:
    believability_devices:
      - "Results depend on current swing"
      - "Most golfers see improvement on first swing"
    hedges: ["up to 30 yards", "as much as"]
    conditions: ["for golfers who currently slice"]

  mechanism_link:
    mechanism_delivers: "Simple Strike Sequence programs correct low point, enabling effortless distance"
    superiority_framing: "The only method that addresses the root cause of inconsistent contact"

  position:
    headline_promise: "Add 30 Yards to Your Drives"
    subhead_promise: "While hitting more fairways than ever before"
    body_promise: "Imagine stepping up to the first tee knowing you're about to pipe it 280 down the middle..."
    close_promise: "In just minutes, you could be hitting longer, straighter drives than you have in years"
```

### Health Promise Extraction

```yaml
promise_extraction:
  primary_promise:
    statement: "Wake up each morning with natural, sustained energy that lasts all day—without caffeine, pills, or stimulants"
    promise_type: transformation

  specificity_markers:
    timeframe: "within 2 weeks"
    quantity: "7+ hours of quality sleep"
    qualifier: "natural, sustained energy"
    without_sacrifice: "without pills, exercise changes, or strict diets"
    even_if: "even if you've struggled with sleep for decades"

  emotional_dimension:
    core_feeling: "freedom from exhaustion, mental clarity, vitality"
    pain_removed: "constant fatigue, brain fog, reliance on caffeine"
    pleasure_gained: "waking up refreshed, mental sharpness, energy for family"

  calibration_signals:
    believability_devices:
      - "Individual results may vary"
      - "Works best for those over 40"
      - "60-day money back guarantee"
    hedges: ["up to", "as much as 7 hours"]
    conditions: ["for adults experiencing age-related sleep decline"]

  mechanism_link:
    mechanism_delivers: "Metabolic Reset Protocol restores deep sleep phase, enabling natural energy production"
    superiority_framing: "The first and only solution that addresses Shallow Sleep Syndrome"

  position:
    headline_promise: "Finally Sleep Through the Night—Wake Up Energized"
    subhead_promise: "Without pills, prescriptions, or changing your lifestyle"
    body_promise: "Imagine waking up tomorrow feeling like you slept on a cloud—clear-headed, energized, ready to take on the day..."
    close_promise: "Tonight could be your last restless night. Tomorrow, you could wake up transformed."
```

---

## Promise Scoring (PERFECT_PROMISE 0-10)

Score the promise in `configuration.elements.PERFECT_PROMISE`:

| Score | Criteria |
|-------|----------|
| 9-10 | Specific, measurable, proven, addresses exact desire, includes timeframe, strong without/even-if markers |
| 7-8 | Strong promise, good specificity, supported by proof, most markers present |
| 5-6 | Generic benefit claim, lacks specificity or proof, few markers |
| 3-4 | Vague promise, no measurable outcome, weak emotional connection |
| 1-2 | Weak or unclear promise, no specificity markers |

---

## EXTRACTION CHECKLIST

For each swipe file, verify extraction of:

### Proof Extraction (Required)
- [ ] All proof elements identified and classified
- [ ] Each element has category, sub_type, sub_type_id
- [ ] Each element scored on 5 dimensions
- [ ] Proof inventory aggregated with counts by category/sub-type
- [ ] Gaps identified
- [ ] Overall strength score calculated
- [ ] Promise ceiling determined

### Promise Extraction (Required)
- [ ] Primary promise statement extracted
- [ ] Promise type identified
- [ ] All present specificity markers extracted
- [ ] Emotional dimension captured
- [ ] Calibration signals noted
- [ ] Mechanism link documented
- [ ] Position in copy tracked
- [ ] PERFECT_PROMISE score assigned (0-10)

---

## OUTPUT FORMAT

Each extraction should include these proof and promise sections:

```json
{
  "swipe_id": "source_brand_product_format_001",

  "metadata": {
    "raw_swipe_file": "/Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/BigIdeaEngine/Data/[SOURCE_DIR]/[filename].md",
    "source_collection": "DM Health Motherlode | CA-Pro-Database | etc.",
    "extraction_date": "2026-01-24",
    "extraction_version": "2.0"
  },

  "components": {
    "proof_inventory": {
      "total_elements": 23,
      "by_category": {
        "SOCIAL": 8,
        "AUTHORITY": 5,
        "DEMONSTRATION": 4,
        "MECHANISM": 2,
        "DATA": 3,
        "RISK_REVERSAL": 1
      },
      "by_sub_type": [
        {"sub_type_id": "SOC-02", "count": 5, "avg_composite": 7.8}
      ],
      "elements": [
        {
          "id": "PROOF-001",
          "raw_text": "...",
          "classification": {
            "category": "SOCIAL",
            "sub_type": "testimonial_specific_result",
            "sub_type_id": "SOC-02",
            "confidence": 0.95
          },
          "scores": {
            "specificity": 8,
            "credibility": 7,
            "relevance": 9,
            "novelty": 6,
            "emotional_impact": 8,
            "composite": 7.6
          },
          "context": {
            "position_in_copy": "early_body",
            "supports_claim": "Weight loss promise",
            "mechanism_aligned": true
          }
        }
      ],
      "gaps": {
        "missing_categories": [],
        "weak_categories": ["RISK_REVERSAL"]
      },
      "overall_strength_score": 73,
      "promise_ceiling": "significant_improvement"
    },

    "promise_extraction": {
      "primary_promise": {
        "statement": "...",
        "promise_type": "transformation"
      },
      "specificity_markers": {
        "timeframe": "in 7 days",
        "quantity": "23 pounds",
        "qualifier": "belly fat",
        "without_sacrifice": "without dieting",
        "even_if": "even if you're over 50"
      },
      "emotional_dimension": {
        "core_feeling": "...",
        "pain_removed": "...",
        "pleasure_gained": "..."
      },
      "calibration_signals": {
        "believability_devices": ["..."],
        "hedges": ["..."],
        "conditions": ["..."]
      },
      "mechanism_link": {
        "mechanism_delivers": "...",
        "superiority_framing": "..."
      },
      "position": {
        "headline_promise": "...",
        "subhead_promise": "...",
        "body_promise": "...",
        "close_promise": "..."
      }
    }
  },

  "configuration": {
    "elements": {
      "PERFECT_PROMISE": 8
    }
  }
}
```

---

## QUALITY GATES

Before saving any extraction:

### Provenance Quality Gate (CRITICAL)
- **raw_swipe_file REQUIRED:** Every extraction MUST have `metadata.raw_swipe_file` populated with full path to source
- **Source must exist:** Verify the file path is valid before saving extraction
- **No orphan extractions:** If source file cannot be found, DO NOT create extraction
- **⚠️ SOURCE CONTENT VALIDATION (ADDED 2026-01-28):** File existence is NOT sufficient. Source MUST pass all PRE-EXTRACTION VALIDATION GATES defined above (word count ≥500, no descriptor phrases, prose structure). See "MANDATORY VALIDATION GATES" section.
- **Provenance chain REQUIRED:** Every extraction must include full provenance block with validation_gates_passed status

### Proof Quality Gates
1. **Classification Completeness:** Every element has category + sub_type_id
2. **Scoring Completeness:** Every element has all 5 dimension scores
3. **No Fabrication:** All raw_text comes directly from copy
4. **Aggregation Accuracy:** Counts match element count
5. **Promise Ceiling Logic:** Ceiling matches strength score tier

### Promise Quality Gates
1. **Primary Promise Present:** statement and promise_type required
2. **Specificity Check:** At least 2 markers extracted (or null if truly absent)
3. **Emotional Coherence:** Core feeling aligns with promise type
4. **Mechanism Alignment:** If mechanism extracted, link should connect
5. **Position Tracking:** At least headline or body promise captured

---

## AGENT WORKFLOW

1. **Read swipe file completely** before extracting
2. **First Pass — Mark all proof elements** (don't classify yet)
3. **Second Pass — Classify each proof element** using taxonomy
4. **Third Pass — Score each proof element** on 5 dimensions
5. **Aggregate proof inventory** with counts, gaps, strength score
6. **Extract primary promise** from headline/subhead/body
7. **Extract specificity markers** (all that are present)
8. **Capture emotional dimension**
9. **Note calibration signals**
10. **Map mechanism link** if applicable
11. **Track position** across copy sections
12. **Run quality gates** before saving
13. **Save to canonical output path**

---

*Version 2.0 — Updated 2026-01-24*
*Deep Proof Extraction (75 sub-types) + Promise Extraction (5 types, full schema)*
*Big Idea, Mechanism, Root Cause extractions: COMPLETE — see respective skill outputs*
