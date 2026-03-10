# Proof Taxonomy Classification Engine

**Version:** 1.0
**Purpose:** Classify proof elements into the 6-category, 75-subtype taxonomy

---

## CLASSIFICATION PROTOCOL

When classifying a proof element:

1. **Read the proof element** — Understand what it is claiming/showing
2. **Identify primary function** — What is this proof DOING for the reader?
3. **Match to category** — Which of the 6 categories best fits the primary function?
4. **Match to sub-type** — Within that category, which specific sub-type?
5. **Score the element** — Apply the 5 scoring dimensions

---

## CATEGORY DECISION TREE

```
START: What is this proof primarily doing?

├── Showing OTHER PEOPLE'S experiences/validation?
│   └── → SOCIAL
│
├── Establishing CREDIBILITY through credentials/expertise/research?
│   └── → AUTHORITY
│
├── SHOWING the product/result in action (visual/experiential)?
│   └── → DEMONSTRATION
│
├── Proving WHY/HOW the specific mechanism works?
│   └── → MECHANISM
│
├── Providing NUMBERS, statistics, or quantified claims?
│   └── → DATA
│
└── REDUCING RISK through guarantees/trials/protection?
    └── → RISK REVERSAL
```

---

## CATEGORY DEFINITIONS + SUB-TYPES

### 1. SOCIAL

**Definition:** Proof derived from other people's experiences, behaviors, and validation.

**Primary Question:** "What have OTHER PEOPLE experienced or said?"

**Sub-Types:**

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
- Celebrity endorsement of CREDENTIALS → AUTHORITY (endorsement_celebrity)
- User count as a STATISTIC → DATA (if framed as number, not social proof)

---

### 2. AUTHORITY

**Definition:** Proof derived from credentials, expertise, institutional backing, and third-party validation.

**Primary Question:** "WHO says this is true/good, and what makes them qualified?"

**Sub-Types:**

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
- Study proving MECHANISM → MECHANISM (mechanism_study)
- Expert explaining WHY something works → MECHANISM (mechanism_expert_explanation)

---

### 3. DEMONSTRATION

**Definition:** Visual, sensory, or experiential proof that SHOWS the product/result in action.

**Primary Question:** "Can I SEE this working?"

**Sub-Types:**

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

### 4. MECHANISM

**Definition:** Proof that the SPECIFIC MECHANISM (how it works) is valid. This proves WHY and HOW, not just THAT.

**Primary Question:** "WHY does this work? What's the scientific/logical basis?"

**Sub-Types:**

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

**Boundary Cases:**
- Study proving THAT it works (results) → AUTHORITY (study_*)
- Demonstration of mechanism → DEMONSTRATION (unless explaining WHY)

**Key Distinction:**
- DEMONSTRATION shows THAT it works
- MECHANISM proves WHY it works
- A demo of the mechanism in action = DEMONSTRATION
- An explanation of WHY the mechanism works = MECHANISM

---

### 5. DATA

**Definition:** Numerical, statistical, and quantified proof elements.

**Primary Question:** "What are the NUMBERS?"

**Sub-Types:**

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
- User COUNT as social proof → SOCIAL (user_count) if framed as "join others"
- Statistic FROM a study → AUTHORITY (the study is authority, stat is data within)

---

### 6. RISK REVERSAL

**Definition:** Proof that reduces or eliminates buyer risk — guarantees, trials, and protection mechanisms.

**Primary Question:** "What happens if it doesn't work for me?"

**Sub-Types:**

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

**Boundary Cases:**
- Guarantee framed as CONFIDENCE claim → Could overlap with AUTHORITY if "We're so confident because..."

---

## SCORING DIMENSIONS

After classification, score each element on 5 dimensions (1-10):

### 1. Specificity
How precise and concrete is this proof?
- 10: Exact numbers, names, dates, verifiable details
- 7: Fairly specific with some quantification
- 4: General claims, approximate figures
- 1: Vague, unquantified, generic

### 2. Credibility
How believable is the source?
- 10: Peer-reviewed, government, highly reputable
- 7: Named expert, established company
- 4: Anonymous but plausible
- 1: Unattributed, suspicious, unverifiable

### 3. Relevance
How directly does this support the claim/promise?
- 10: Directly proves the exact claim being made
- 7: Strongly related, clear connection
- 4: Adjacent, requires some inference
- 1: Tangentially related at best

### 4. Novelty
How fresh/unused is this proof?
- 10: Never seen in this market
- 7: Uncommon, fresh angle
- 4: Sometimes used, somewhat familiar
- 1: Overused, cliche, market-exhausted

### 5. Emotional Impact
How does this make the reader FEEL?
- 10: Powerful emotional response (awe, relief, hope)
- 7: Notable emotional resonance
- 4: Mildly engaging
- 1: Emotionally flat, boring

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

## CLASSIFICATION OUTPUT FORMAT

```yaml
proof_element:
  id: "PROOF-001"
  raw_text: "The actual proof text from source"

  classification:
    category: "SOCIAL"
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

  source:
    file: "testimonials.md"
    line: 45

  notes: "Strong specific result testimonial with exact weight loss figure"
```

---

## QUICK REFERENCE CARD

| Category | Primary Function | Key Question |
|----------|------------------|--------------|
| **SOCIAL** | Others' experiences | "What did other people experience?" |
| **AUTHORITY** | Credibility source | "Who qualified says this is true?" |
| **DEMONSTRATION** | Visual/experiential proof | "Can I see this working?" |
| **MECHANISM** | How/why it works | "Why does this work?" |
| **DATA** | Numbers/statistics | "What are the numbers?" |
| **RISK REVERSAL** | Risk reduction | "What if it doesn't work?" |
