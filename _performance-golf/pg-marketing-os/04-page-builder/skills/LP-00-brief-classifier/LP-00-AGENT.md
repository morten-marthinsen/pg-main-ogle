# LP-00: Brief & Page Type Classifier — Master Agent

> **Version:** 1.0
> **Skill:** LP-00-brief-classifier
> **Position:** Phase 1 — Entry Point (First skill to run)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** None (entry point) OR CopywritingEngine packages (if available)
> **Output:** `page-brief.json` + `PAGE-BRIEF-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Ingest all available inputs — product brief, CopywritingEngine packages, or both — and produce a **complete, structured page brief** that every downstream Landing Page Engine skill consumes.

**Two critical decisions this skill makes:**

1. **Page Type Classification:** Type A (Long-Form Sales Page) or Type B (Ecomm/PDP) or Hybrid — and WHY. This decision governs every structural choice downstream.
2. **Operating Mode:** Downstream Mode (CopywritingEngine packages available) vs. Standalone Mode (brief only). Different inputs produce different brief depth.

**Success Criteria:**
- Page type classified with ≥4 of 7 classification signals confirmed
- Audience profile populated across all 5 dimensions
- Offer summary accurate and complete
- Vertical correctly identified from 8-option list
- Operating mode declared and confirmed
- Traffic temperature mapped (cold / warm / hot)
- Awareness stage mapped per Schwartz (Unaware → Most Aware)
- `page-brief.json` schema complete — zero empty required fields

This agent is a **workflow orchestrator**. It reads available inputs, runs classification, builds the brief, and validates completeness. It does NOT write copy or design page structure.

---

## IDENTITY

**This skill IS:**
- The intake and classification layer for every landing page build
- The single source of truth for what page type, what audience, what offer, what vertical
- The brief that all 18 downstream skills load as their primary context
- A structural decision-maker — it commits to Type A, Type B, or Hybrid

**This skill is NOT:**
- An architecture planner (LP-03, LP-04 handle that)
- A research tool (LP-01 loads conversion intelligence)
- A competitive analyzer (LP-02 handles that)
- A copy writer

**Upstream:** Raw product brief (required) + CopywritingEngine packages (optional)
**Downstream:** Feeds `page-brief.json` to LP-01, LP-02, LP-03, LP-04, and all Phase 3 writing skills

---

## STATE MACHINE

```
IDLE → TRIGGERED
  ↓
LAYER_0: Input inventory + mode declaration
  → 0.1: Scan for CopywritingEngine packages (declare operating mode)
  → 0.2: Load product brief (required)
  → 0.3: Extract available upstream packages (Downstream Mode only)
  ↓ [GATE_0: Product brief present? If NO → HALT]
LAYER_1: Page type classification
  → 1.1: Run 7-signal classification checklist
  → 1.2: Hybrid detection test
  → 1.3: Type declaration + rationale
  ↓ [GATE_1: Classification has ≥4/7 signals confirmed?]
LAYER_2: Brief construction
  → 2.1: Audience profile builder (5 dimensions)
  → 2.2: Offer summary builder
  → 2.3: Vertical identifier
  → 2.4: Traffic temperature mapper
  → 2.5: Awareness stage mapper
  → 2.6: Voice & tone extractor
  ↓ [GATE_2: All required brief fields populated?]
LAYER_3 (Downstream Mode only): Package extraction
  → 3.1: Research intelligence extractor
  → 3.2: Copy package distiller
  → 3.3: Offer package extractor
  ↓ [GATE_3: Extracted packages valid and complete?]
LAYER_4: Package assembly
  → 4.1: page-brief.json compiler
  → 4.2: PAGE-BRIEF-SUMMARY.md writer
  → 4.3: execution-log.md writer
  ↓
COMPLETE
```

> **Note:** Layer 3 only executes in Downstream Mode. In Standalone Mode, the state machine skips from GATE_2 directly to Layer 4.

---

## OPERATING MODES

### Downstream Mode (CopywritingEngine packages available)

**Triggered when:** One or more of these files exist for the project:
- `09-campaign-brief/outputs/campaign-brief.json`
- `07-offer/outputs/offer-package.json`
- `05-promise/outputs/promise-output.json`
- `01-research/outputs/[any research output]`
- `19-campaign-assembly/outputs/assembled-draft.md`

**What changes:** Layer 3 executes. Brief depth is significantly richer — audience quotes, mechanism language, offer details, proof inventory all come from upstream packages rather than being inferred from a brief alone.

**Brief quality in Downstream Mode:** ~90% complete. Audience voice is real (from research), offer is exact (from offer package), mechanism language is confirmed.

### Standalone Mode (Brief only)

**Triggered when:** No CopywritingEngine packages found for the project.

**What happens:** LP-00 builds the entire brief from the product brief document alone. It infers audience dimensions, constructs an offer summary from available information, and flags any gaps as `needs_validation`.

**Brief quality in Standalone Mode:** ~65–75% complete. Audience dimensions are inferred, not research-validated. Gaps flagged for human review.

**Layer 3 behavior:** Skipped entirely. Note added to execution log: "Standalone Mode — Layer 3 skipped. Consider running CopywritingEngine research (Skill 01) before landing page build for higher-fidelity audience data."

---

## LAYER SEQUENCE

### Layer 0: Input Inventory

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Mode Detector | Scan project folder for CopywritingEngine packages, declare mode | mode-declaration.md |
| 0.2: Brief Loader | Load and parse product brief document | brief-load.md |
| 0.3: Package Loader (Downstream only) | Load all available CopywritingEngine packages | package-inventory.md |

**GATE_0:** Product brief exists AND was successfully parsed. If brief is absent or unreadable → HALT with clear error message.

### Layer 1: Page Type Classification

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: 7-Signal Classifier | Run classification checklist against brief | classification-signals.md |
| 1.2: Hybrid Detector | Test for hybrid conditions | hybrid-test.md |
| 1.3: Type Declaration | Commit to page type with written rationale | type-declaration.md |

**GATE_1:** Classification has ≥4 confirmed signals for the declared type. If 3 signals each for Type A and Type B → automatically flag as Hybrid.

### Layer 2: Brief Construction

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 2.1: Audience Profile Builder | Build 5-dimension audience profile | audience-profile.md |
| 2.2: Offer Summary Builder | Extract and structure the full offer | offer-summary.md |
| 2.3: Vertical Identifier | Identify vertical from 8-option list | vertical-id.md |
| 2.4: Traffic Temperature Mapper | Classify expected traffic temperature | traffic-temp.md |
| 2.5: Awareness Stage Mapper | Map Schwartz awareness stage | awareness-map.md |
| 2.6: Voice & Tone Extractor | Extract voice direction and anti-voice | voice-direction.md |

**GATE_2:** All required fields populated. Fields marked `needs_validation` are allowed but must be flagged. Zero empty required fields.

### Layer 3: Package Extraction (Downstream Mode Only)

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: Research Intelligence Extractor | Pull top 10 pain quotes, top 5 hope quotes, villain | research-extract.md |
| 3.2: Copy Package Distiller | Extract: headline territory, mechanism name, root cause phrase, promise statement | copy-extract.md |
| 3.3: Offer Package Extractor | Pull: full offer details, guarantee, pricing, bonuses | offer-extract.md |

**GATE_3:** At least root cause, mechanism name, and offer details extracted. Any missing package noted in brief as `not_available`.

### Layer 4: Package Assembly

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: Brief Compiler | Assemble complete page-brief.json | page-brief.json |
| 4.2: Summary Writer | Write human-readable PAGE-BRIEF-SUMMARY.md | PAGE-BRIEF-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md | execution-log.md |

---

## PAGE TYPE CLASSIFICATION SYSTEM

### The 7-Signal Checklist

Run all 7 signals against the brief. Tally Type A vs. Type B signals.

| Signal | Type A (Long-Form) | Type B (Ecomm/PDP) |
|--------|-------------------|-------------------|
| **S1: Offer complexity** | Multi-bonus stack, high-value proposition, justifies long explanation | Simple single product, no bonuses needed |
| **S2: Price point** | $30+ average order or subscription over $40/mo | $15–$60 standard purchase |
| **S3: Claim complexity** | Claims require education to be believed (mechanism, study, explanation) | Claims are self-evident or require only visual proof |
| **S4: Audience awareness** | Problem-Aware or below — audience doesn't know the solution | Solution-Aware or Product-Aware — audience knows what to look for |
| **S5: Traffic source** | Facebook/YouTube cold traffic, native ads, email campaigns | Google Shopping, organic search, influencer links, brand traffic |
| **S6: Competitive landscape** | Product competes on mechanism/story, not SKU/price | Product competes on price, formulation, reviews, brand |
| **S7: Category norm** | Industry norm is long-form sales page (supplements DR, info products, financial) | Industry norm is product page (DTC brands, Amazon-adjacent, Shopify) |

**Scoring:**
- 5–7 Type A signals → Type A
- 5–7 Type B signals → Type B
- 3–4 each direction → Hybrid (see below)
- Equal 3.5/3.5 → Default to Hybrid, flag for human clarification

### Hybrid Page Type

A **Hybrid** has both elements: an ecomm-style above-fold (image, rating, price, ATC) combined with long-form educational content below. Common examples: Magnesium Breakthrough, Kachava, Earth Echo.

**Hybrid triggers automatically when:**
- Type A signals: 3–4 AND Type B signals: 3–4
- OR brief explicitly describes extended PDP with narrative content below fold

**Hybrid architecture:** Type B above-fold (drives impulse/ready-to-buy) + Type A below-fold sections (educates hesitant buyers). LP-04 section sequence configures both zones.

### Classification Forbidden Behaviors

1. ❌ Classifying without running all 7 signals
2. ❌ Declaring Type B for a health supplement sold primarily via Facebook cold traffic (almost always Type A or Hybrid)
3. ❌ Declaring Type A for a well-known branded product with existing organic search demand
4. ❌ Skipping Hybrid detection — hybrid is a valid first-class type
5. ❌ Proceeding past GATE_1 with fewer than 4 confirmed signals for declared type

---

## AUDIENCE PROFILE (5 DIMENSIONS)

Every page-brief.json must contain an audience profile populated across all 5 dimensions. In Standalone Mode, dimensions are inferred from the brief. In Downstream Mode, dimensions pull from research packages.

### Dimension 1: Demographics
```yaml
demographics:
  age_range: "[e.g., 45-65]"
  gender_skew: "[e.g., 70% female]"
  income_level: "[e.g., middle-income, $45K-$80K HH]"
  education: "[e.g., some college to college-educated]"
  geography: "[e.g., US-primary, Canada-secondary]"
  source: "[brief_inferred | research_validated]"
```

### Dimension 2: Pain Profile
```yaml
pain_profile:
  primary_pain: "[single most acute pain statement]"
  secondary_pains: ["[pain 2]", "[pain 3]"]
  pain_intensity: "[scale 1-10 with rationale]"
  duration: "[how long they've had this problem]"
  failed_solutions: ["[thing they tried]", "[thing they tried]"]
  self_blame: "[do they blame themselves? Y/N + how]"
  source: "[brief_inferred | research_validated]"
  top_quotes: ["[verbatim quote from research if Downstream Mode]"]
```

### Dimension 3: Desire Profile
```yaml
desire_profile:
  primary_desire: "[single most specific desired outcome]"
  dream_outcome: "[ideal state in vivid language]"
  identity_desire: "[who they want to become, not just what they want]"
  timeline_expectation: "[how fast they expect results]"
  source: "[brief_inferred | research_validated]"
  top_quotes: ["[verbatim quote from research if Downstream Mode]"]
```

### Dimension 4: Sophistication Profile
```yaml
sophistication:
  awareness_stage: "[Unaware | Problem-Aware | Solution-Aware | Product-Aware | Most-Aware]"
  market_sophistication: "[Stage 1-5 per Schwartz]"
  tried_before: "[Y/N — have they tried solutions in this category?]"
  skepticism_level: "[low | medium | high | very_high]"
  mechanism_familiarity: "[do they know how solutions in this category work?]"
  source: "[brief_inferred | research_validated]"
```

### Dimension 5: Language Profile
```yaml
language_profile:
  vocabulary_level: "[reading grade: e.g., 7th grade]"
  idioms: ["[phrases they actually use]"]
  avoid_vocabulary: ["[clinical terms to avoid]", "[jargon to avoid]"]
  emotional_tone: "[e.g., hopeful but skeptical]"
  source: "[brief_inferred | research_validated]"
  sample_quotes: ["[how they describe their problem in their own words]"]
```

---

## OFFER SUMMARY SCHEMA

```yaml
offer_summary:
  product_name: "[full product name]"
  product_category: "[e.g., dietary supplement, online course, coaching]"
  primary_benefit: "[single core promise]"
  mechanism_name: "[from CopywritingEngine if available, else: not_available]"
  root_cause_anchor: "[from CopywritingEngine if available, else: not_available]"

  pricing:
    single_unit_price: "[e.g., $69.99]"
    has_multi_pack: "[Y/N]"
    multi_pack_options: ["[e.g., 3-pack at $49.99/bottle]"]
    has_subscription: "[Y/N]"
    subscription_price: "[e.g., $54.99/month]"
    has_trial: "[Y/N]"
    trial_details: "[e.g., free + S&H, 14-day trial]"

  bonuses:
    count: "[number of bonuses]"
    list: ["[bonus name + value]"]

  guarantee:
    duration: "[e.g., 60 days]"
    branded_name: "[e.g., The Complete Confidence Guarantee — or: not_specified]"
    type: "[money-back | exchange | results-based]"

  urgency_levers:
    has_stock_scarcity: "[Y/N + justification if Y]"
    has_price_deadline: "[Y/N + details if Y]"
    has_batch_limitation: "[Y/N + details if Y]"

  source: "[brief_inferred | offer_package_validated]"
```

---

## VERTICAL IDENTIFICATION

Identify the vertical from these 8 options. Vertical governs specimen loading in downstream skills.

| Vertical ID | Vertical | Key Indicators |
|-------------|---------|----------------|
| `health-supplements` | Health & Dietary Supplements | Vitamins, minerals, herbal, nootropics, weight loss, sleep |
| `health-devices` | Health Devices & Equipment | Wearables, fitness equipment, medical devices |
| `beauty-wellness` | Beauty & Personal Care | Skincare, haircare, cosmetics, personal wellness |
| `info-products` | Info Products & Courses | Digital courses, ebooks, masterclasses, challenges |
| `coaching-services` | Coaching & High-Ticket Services | Coaching programs, done-for-you, consulting |
| `finance-investing` | Finance & Investing | Trading, investing, financial tools |
| `personal-development` | Personal Development | Self-help, mindset, productivity |
| `ecomm-dtc` | Ecommerce / DTC Consumer Goods | Non-health physical products, food/beverage, gear |

**When uncertain:** Classify as primary vertical + secondary vertical. Both are documented in `page-brief.json`.

---

## TRAFFIC TEMPERATURE MAPPING

```
COLD TRAFFIC:
  Definition: Has no prior awareness of this product or brand
  Sources: Facebook/Instagram ads (interest targeting), YouTube pre-roll, native ads, cold email
  Implications:
    - Above-fold must earn attention before stating offer
    - Headline leans curiosity or problem-agitation (not direct benefit)
    - Much more educational content needed before CTA
    - Social proof required earlier (builds trust with strangers)
    - Type A or Hybrid almost always preferred

WARM TRAFFIC:
  Definition: Aware of problem or category; may have heard of brand
  Sources: Retargeting ads, email list, organic search for category terms, influencer mention
  Implications:
    - Can lead with benefit/solution sooner
    - Mechanism still needs explaining but faster
    - Testimonials and reviews highly effective
    - CTA can appear earlier in page

HOT TRAFFIC:
  Definition: Actively searching for this product or intending to buy
  Sources: Branded search, organic search for product name, direct type-in, existing customer
  Implications:
    - Type B (ecomm) often sufficient
    - Above-fold CTA can be primary conversion element
    - Proof density more important than education
    - Price and value comparison critical
    - Shorter pages can work
```

---

## AWARENESS STAGE MAPPING (SCHWARTZ)

```
Stage 1 — UNAWARE:
  Does not know they have the problem
  Headline approach: Curiosity/warning, pattern interrupt

Stage 2 — PROBLEM-AWARE:
  Knows they have the problem, doesn't know solution category exists
  Headline approach: Problem acknowledgment + revelation promise

Stage 3 — SOLUTION-AWARE:
  Knows solution category exists, doesn't know your product
  Headline approach: Mechanism differentiation, "unlike other X"

Stage 4 — PRODUCT-AWARE:
  Knows your product, hasn't bought yet
  Headline approach: Direct benefit, offer, reason-to-act-now

Stage 5 — MOST AWARE:
  Knows your product and your brand well
  Headline approach: "New" / latest version / upgrade, loyalty offer
```

---

## PAGE-BRIEF.JSON SCHEMA

Complete schema — all required fields must be populated or marked `not_available`:

```json
{
  "schema_version": "1.0",
  "created": "[ISO timestamp]",
  "project_name": "[product/client name]",

  "operating_mode": "[downstream | standalone]",
  "copywriting_engine_packages": {
    "available": ["{list of available packages}"],
    "missing": ["{list of missing packages}"]
  },

  "page_type": {
    "classification": "[type_a | type_b | hybrid]",
    "signals_confirmed": "[count, e.g., 5/7]",
    "signals_detail": {
      "s1_offer_complexity": "[type_a | type_b | neutral]",
      "s2_price_point": "[type_a | type_b | neutral]",
      "s3_claim_complexity": "[type_a | type_b | neutral]",
      "s4_audience_awareness": "[type_a | type_b | neutral]",
      "s5_traffic_source": "[type_a | type_b | neutral]",
      "s6_competitive_landscape": "[type_a | type_b | neutral]",
      "s7_category_norm": "[type_a | type_b | neutral]"
    },
    "rationale": "[1-3 sentence justification for classification]",
    "hybrid_zone_split": "[for Hybrid only: e.g., Type B above fold + Type A below fold starting at Section 2]"
  },

  "audience": {
    "demographics": {},
    "pain_profile": {},
    "desire_profile": {},
    "sophistication": {},
    "language_profile": {}
  },

  "offer_summary": {},

  "vertical": {
    "primary": "[vertical_id]",
    "secondary": "[vertical_id | null]"
  },

  "traffic": {
    "temperature": "[cold | warm | hot]",
    "primary_source": "[e.g., facebook_cold, email_list, organic_search]",
    "awareness_stage": "[1_unaware | 2_problem_aware | 3_solution_aware | 4_product_aware | 5_most_aware]"
  },

  "voice_direction": {
    "register": "[e.g., direct, conversational, authoritative]",
    "energy": "[e.g., urgent, hopeful, confident]",
    "anti_voice": ["[what to avoid]"],
    "reading_level_target": "[e.g., 7th grade]",
    "soul_md_available": "[Y/N]",
    "soul_md_path": "[path if available]"
  },

  "copy_assets": {
    "headline_territory": "[from CopywritingEngine or: not_available]",
    "mechanism_name": "[from CopywritingEngine or: not_available]",
    "root_cause_anchor_phrase": "[from CopywritingEngine or: not_available]",
    "primary_promise": "[from CopywritingEngine or: not_available]",
    "big_idea_statement": "[from CopywritingEngine or: not_available]",
    "assembled_draft_available": "[Y/N]",
    "assembled_draft_path": "[path if Y]"
  },

  "proof_inventory": {
    "testimonials_count": "[number or: not_available]",
    "has_clinical_studies": "[Y/N | not_available]",
    "has_before_afters": "[Y/N | not_available]",
    "has_expert_endorsements": "[Y/N | not_available]",
    "proof_inventory_path": "[path if available]"
  },

  "validation_flags": [
    "{list any fields marked needs_validation with reason}"
  ],

  "downstream_handoffs": {
    "lp_01_intelligence": "Load this brief to identify relevant benchmarks and specimens",
    "lp_03_above_fold": "Classification and audience data governs above-fold pattern selection",
    "lp_04_section_sequence": "Page type + awareness stage determines section sequence and proportions",
    "lp_07_hero_section": "Headline territory + voice direction required",
    "all_phase_3_skills": "Audience profile and voice direction consumed by all writing skills"
  }
}
```

---

## QUALITY GATES DETAIL

### GATE_0 (Product Brief Present)
**PASS:** Product brief document located AND parsed. Operating mode declared.
**FAIL:** No product brief found. Action: HALT with message — "LP-00 requires a product brief to proceed. Provide a brief document or path to an existing project brief."

### GATE_1 (Classification Confirmed)
**PASS:** Declared page type has ≥4/7 signals confirmed. Hybrid triggered if 3–4 each direction.
**FAIL:** Fewer than 4 signals confirmed for any type. Action: Return to Layer 1 with note — "Insufficient classification signals. Review S1–S7 against additional product information."

### GATE_2 (Brief Complete)
**PASS:** All required JSON fields populated or marked `not_available`. Zero empty required fields.
**FAIL:** Required fields empty (not marked `not_available`). Action: Return to Layer 2, complete missing fields.

### GATE_3 (Downstream Packages Valid — Downstream Mode Only)
**PASS:** At least root cause anchor, mechanism name, and offer details successfully extracted.
**FAIL:** Packages found but unreadable/malformed. Action: Log error, proceed with what's available, mark extracted fields as `not_available` for failed packages.

---

## FORBIDDEN BEHAVIORS

1. ❌ Proceeding without a product brief (GATE_0 is absolute)
2. ❌ Classifying with fewer than 4 confirmed signals
3. ❌ Leaving required JSON fields empty — use `not_available` for genuinely unavailable data
4. ❌ Defaulting to Type A without running the 7-signal test
5. ❌ Skipping Hybrid detection for ambiguous cases
6. ❌ Inferring audience dimensions without flagging them as `brief_inferred` in Standalone Mode
7. ❌ Treating a product-aware warm-traffic ecomm page as if it needs cold-traffic long-form treatment
8. ❌ Skipping Layer 3 in Downstream Mode — package extraction is mandatory when packages exist
9. ❌ Creating page-brief.json without PAGE-BRIEF-SUMMARY.md and execution-log.md
10. ❌ Voice direction that allows generic AI telltales — anti_voice must explicitly include: "revolutionary, game-changing, transform, unlock, harness, empower, journey, comprehensive"
