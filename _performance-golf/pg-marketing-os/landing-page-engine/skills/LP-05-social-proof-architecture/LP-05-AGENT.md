# LP-05: Social Proof Architecture — Master Agent

> **Version:** 1.0
> **Skill:** LP-05-social-proof-architecture
> **Position:** Phase 2 — Third Architecture Skill (runs after LP-04)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-00 (page-brief.json), LP-04 (section-sequence.json)
> **Output:** `proof-architecture.json` + `PROOF-ARCHITECTURE-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Design the complete **social proof strategy** for the landing page — what types of proof, where each type appears, at what density, in what sequence, and in what format. This is the proof master plan that LP-10 (Social Proof Writer) executes against.

LP-04 assigns a proof density level per section (none / light / medium / heavy / maximum). LP-05 takes that skeletal plan and engineers the full proof architecture: specific proof types per slot, the wave pattern mapped to the section sequence, format direction for each proof element, volume calculations, and gap analysis.

**Two outputs of equal importance:**

1. **Proof Architecture** — The complete map of proof slots: what type goes where, how many, what format, what quality standard
2. **Gap Analysis** — What proof types are missing from the available inventory, what must be sourced before launch, and prioritized recommendations

**Success Criteria:**
- Proof wave pattern correctly applied for page type (Type A vs. Type B — these are DIFFERENT patterns)
- Every section from section-sequence.json has a proof specification (including "none" where appropriate)
- Total proof volume meets thresholds: Type A >= 15 testimonials, Type B >= 50 reviews
- Proof hierarchy applied: clinical studies > expert endorsements > before/afters > photo testimonials > volume signals > text testimonials
- Early trust anchoring confirmed: proof appears within first 25% of page (20-Point Checklist item 09)
- Proof includes specific outcomes/numbers (20-Point Checklist item 11)
- Before/after format deployed where applicable (20-Point Checklist item 12)
- Proof gaps identified with severity and sourcing recommendations
- Proof format directions specific enough for LP-10 to execute without ambiguity

This agent is a **workflow orchestrator**. It designs the proof strategy and maps proof slots. It does NOT write the actual proof copy — that is LP-10 (Social Proof Writer).

---

## IDENTITY

**This skill IS:**
- The social proof strategist — decides WHAT proof goes WHERE and WHY
- The wave pattern engineer — maps proof density to the page's persuasion arc
- The gap analyst — identifies missing proof types and prioritizes sourcing
- The format director — specifies whether proof should be text, photo, video, stat bar, review cascade, etc.
- The proof slot specifier consumed by LP-10 and LP-15

**This skill is NOT:**
- A copy writer — LP-10 writes the actual testimonial/review/proof copy
- A section sequencer — LP-04 already determined section order; LP-05 populates proof within that order
- A CTA architect — LP-06 handles CTA placement and copy direction
- A trust element generator — LP-08 handles trust badges, certifications, and security signals

**Upstream:** `page-brief.json` (LP-00), `section-sequence.json` (LP-04), proof inventory (from CopywritingEngine Skill 02 if available)
**Downstream:** `proof-architecture.json` consumed by LP-10 (Social Proof Writer), LP-15 (Page Assembly), LP-17 (Conversion Audit)

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Load upstream packages + proof inventory
  -> 0.1: Load page-brief.json + section-sequence.json
  -> 0.2: Load proof inventory (available testimonials, studies, endorsements)
  -> 0.3: Load specimen proof patterns for matching vertical/page type
  | [GATE_0: Required inputs present? Page type confirmed?]
LAYER_1: Proof strategy classification
  -> 1.1: Classify available proof by type (6-level hierarchy)
  -> 1.2: Calculate proof volume requirements for page type
  -> 1.3: Select wave pattern (Type A / Type B / Hybrid)
  -> 1.4: Identify proof gaps (required vs. available)
  | [GATE_1: Wave pattern selected? Volume targets set? Gaps identified?]
LAYER_2: Proof placement architecture
  -> 2.1: Map proof placements to section-sequence.json sections
  -> 2.2: Assign proof density per section (with specific elements)
  -> 2.3: Sequence proof types within each section
  -> 2.4: Specify proof format direction per slot
  | [GATE_2: Every section has a proof spec? No vague assignments?]
LAYER_3: Architecture validation
  -> 3.1: Validate proof architecture against 8-point checklist
  -> 3.2: Run coverage audit (no proof deserts, no proof monotony)
  | [GATE_3: Architecture score >= 7.0/8? Zero proof deserts? Coverage audit passes?]
LAYER_4: Package assembly
  -> 4.1: Compile proof-architecture.json
  -> 4.2: Write PROOF-ARCHITECTURE-SUMMARY.md
  -> 4.3: Write execution-log.md
  |
COMPLETE
```

---

## PROOF HIERARCHY BY PERSUASIVENESS

All proof type decisions must reference this hierarchy. Higher-ranked proof types should occupy higher-visibility slots (above fold, early page, dedicated proof blocks).

| Rank | Proof Type | Code | Persuasiveness | Best For |
|------|-----------|------|---------------|----------|
| 1 | Clinical studies | `clinical_study` | Highest (health) | Mechanism sections, ingredient deep-dives, authority positioning |
| 2 | Expert endorsements | `expert_endorsement` | Very high | Lead section, product introduction, early trust anchor |
| 3 | Specific before/after results | `before_after` | High | Proof blocks, pre-close, transformation evidence |
| 4 | Photo testimonials | `photo_testimonial` | Medium-high | Proof blocks, review sections, social proof strips |
| 5 | Social proof volume | `volume_signal` | Medium | Above fold (Type B), social proof strips, stat bars |
| 6 | Text testimonials | `text_testimonial` | Medium-low | Proof blocks, FAQ proof inserts, value testimonials |

**Additional proof types (not ranked but strategically important):**

| Proof Type | Code | Use Case |
|-----------|------|----------|
| Media mention | `media_mention` | Trust bar, above fold, lead section |
| Certification/badge | `certification` | Trust bar, above fold, guarantee proximity |
| Platform review | `platform_review` | Review cascade (Type B), Trustpilot widgets |
| Performance guarantee | `performance_guarantee` | B2B/high-ticket, replaces testimonials |
| Stat claim bar | `stat_bar` | Above fold or early section ("50,000+ customers") |
| Video testimonial | `video_testimonial` | Dedicated proof blocks (higher engagement than text) |

---

## WAVE PATTERNS

### Type A — Long-Form Sales Page Wave

The proof wave for Type A pages follows the page's persuasion arc. Proof density oscillates between light and heavy in a deliberate rhythm:

```
ABOVE FOLD:           Light (1-2 authority signals — trust bar, media logos)
  |
LEAD / HOOK:          Light (1 embedded credibility mention)
  |
STORY:                Embedded (Yoda credentials, institutional names)
  |
ROOT CAUSE:           Medium (2-3 scientific supports woven into narrative)
  |
MECHANISM:            Dense (3-5 clinical supports, demonstrations)
  |
PROOF BLOCK 1:        HEAVY (2-4 testimonials + 1 study/data point)
  |                    "Don't take my word for it..." transition
PRODUCT INTRO:        Light (1 authority endorsement)
  |
INGREDIENT SECTION:   Medium per ingredient (1 study + 1 testimonial)
  |
PROOF BLOCK 2:        HEAVY (5-8 testimonials — cascade)
  |                    Specific outcomes, names/locations, before/after
OFFER / VALUE STACK:  Light (1 value testimonial — "Worth every penny")
  |
GUARANTEE:            Confidence proof (visual certificate, stat)
  |
PROOF BLOCK 3:        HEAVY (transformation proof + callbacks to lead)
  |                    "You could be next" framing
FAQ:                  Embedded (proof woven into answers)
  |
CLOSE / P.S.:         Medium (3-5 benefit summary callbacks)
```

**Type A volume targets:**
- Minimum 15 testimonials across all proof blocks (20-Point Checklist item 10)
- Minimum 3 clinical/study references in mechanism + ingredient sections
- At least 1 expert endorsement
- Proof in first 25% of page (early trust anchoring — 20-Point Checklist item 09)
- Proof includes specific outcomes/numbers (20-Point Checklist item 11)
- Before/after format where available (20-Point Checklist item 12)

### Type B — Ecomm/PDP Wave

Type B proof follows a volume-first pattern. Proof is immediate and overwhelming — the page earns trust through sheer quantity rather than through a persuasion arc:

```
ABOVE FOLD:           HEAVY (rating strip + review count — IMMEDIATE)
  |                    "4.8 stars from 2,847 reviews" visible instantly
KEY BENEFITS:         Light (badge/icon proof only)
  |
HOW IT WORKS:         None (illustration/diagram section)
  |
INGREDIENT SECTION:   Medium (per-ingredient proof claims, 1 study each)
  |
SOCIAL PROOF STRIP:   HEAVY ("50,000+ customers" counter + volume stats)
  |
BEFORE/AFTER:         HEAVY (gallery — if applicable)
  |
REVIEW CASCADE:       MAXIMUM (25-50+ featured reviews with filtering)
  |                    Star rating, name, location, result-specific text
  |                    Filter by: concern, rating, verified
GUARANTEE:            Confidence proof (badge, duration, branded name)
  |
COMPARISON TABLE:     Medium (competitive proof where we win)
```

**Type B volume targets:**
- Minimum 50 reviews in cascade section (20-Point Checklist item 10)
- Rating strip above fold with review count
- Social proof counter ("X+ customers") if 500+ customers exist
- Per-ingredient proof claims
- Proof includes specific outcomes/numbers (20-Point Checklist item 11)
- Before/after format where applicable (20-Point Checklist item 12)

### Hybrid Wave

Hybrid pages combine both patterns:
- **Zone 1 (Above fold — Type B):** Rating strip + review count + trust badges (immediate proof)
- **Zone 2 (Education — Type A style):** Embedded studies + authority signals following Type A wave
- **Zone 3 (Conversion — mixed):** Review cascade (Type B) + testimonial blocks (Type A) + guarantee proof

---

## PROOF MODE SELECTION

Based on the Cross-Page Pattern Analysis finding that proof density is **bimodal, not a spectrum**, LP-05 operates in one of two modes:

### PROOF SATURATION Mode
**When:** Product has substantial proof inventory (15+ testimonials, studies, endorsements available)
**Strategy:** Volume creates inevitability. Layer proof throughout the page. Every section either contains or is adjacent to proof.
**Specimen references:** Hyros (~80% proof), LMNT (83K reviews), BIOptimizers (38 citations + 1,561 reviews)
**Risk:** Proof fatigue if types are monotonous. Mitigate with type variety.

### AUTHORITY SUBSTITUTION Mode
**When:** Product has limited proof inventory (<10 testimonials, few studies) OR is a celebrity/authority-driven brand
**Strategy:** Founder/expert authority substitutes for volume. Performance guarantees replace testimonials. Fewer proof elements, but each carries heavy authority weight.
**Specimen references:** Graziosi (Robbins authority letter), Closers (performance guarantee only), Sunday Red (brand IS proof)
**Risk:** Insufficient trust for cold traffic. Mitigate with performance guarantees and media signals.

**Selection logic:**
```
IF proof_inventory.testimonials >= 15 AND (proof_inventory.has_clinical_studies = Y OR proof_inventory.has_expert_endorsements = Y):
  mode = PROOF_SATURATION
ELIF proof_inventory.testimonials >= 5:
  mode = PROOF_SATURATION (with PROOF_GAP flags)
ELSE:
  mode = AUTHORITY_SUBSTITUTION
```

---

## OPERATING MODES

### Downstream Mode (CopywritingEngine packages available)
**Triggered when:** `page-brief.json` shows `operating_mode: downstream` and proof inventory has data.
**What changes:** Proof inventory is richer — actual testimonial text, study citations, expert names. LP-05 maps real proof assets to specific page slots.

### Standalone Mode (Brief only)
**Triggered when:** `page-brief.json` shows `operating_mode: standalone`.
**What changes:** LP-05 generates proof REQUIREMENTS (what types needed per slot) without actual proof content. All planned proof is marked `requires_sourcing`. The architecture is complete but the proof assets are TBD.

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

> **POSITIONAL REINFORCEMENT:** You are loading inputs. Do NOT classify, plan, or assign anything yet. Layer 0 reads files and confirms they exist. That is all.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Brief Loader | Load page-brief.json + section-sequence.json, confirm page type | brief-and-sequence-loaded.md |
| 0.2: Proof Inventory Loader | Load all available proof assets (testimonials, studies, endorsements, reviews) | proof-inventory.md |
| 0.3: Specimen Proof Loader | Load proof patterns from matching specimens by vertical/page type | specimen-proof-patterns.md |

**GATE_0:** Both upstream files loaded AND page type confirmed. Proof inventory documented (even if sparse). If `section-sequence.json` missing -> HALT.

### Layer 1: Proof Strategy Classification

> **POSITIONAL REINFORCEMENT:** You are classifying proof and calculating requirements. Do NOT place proof into sections yet. That is Layer 2. Layer 1 determines WHAT you have, WHAT you need, and WHICH wave pattern to use.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: Proof Type Classifier | Classify all available proof by type against 6-level hierarchy | proof-classification.md |
| 1.2: Proof Volume Calculator | Calculate total proof needed per page type against thresholds | volume-requirements.md |
| 1.3: Wave Pattern Selector | Select Type A, Type B, or Hybrid wave pattern; select proof mode | wave-pattern-selection.md |
| 1.4: Proof Gap Analyzer | Compare required vs. available; identify gaps by type | proof-gap-analysis.md |

**GATE_1:** Wave pattern selected for correct page type. Volume targets documented. Proof mode declared (SATURATION or AUTHORITY_SUBSTITUTION). All gaps identified with severity.

### Layer 2: Proof Placement Architecture

> **POSITIONAL REINFORCEMENT:** You are placing specific proof into specific section slots. Every section from section-sequence.json gets a proof specification. No section is left without an explicit assignment (even if that assignment is "none"). Do NOT validate yet — that is Layer 3.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 2.1: Proof Placement Planner | Map proof placements to every section in the sequence | proof-placement-plan.md |
| 2.2: Proof Density Mapper | Assign density level + specific element counts per section | proof-density-map.md |
| 2.3: Proof Type Sequencer | Sequence proof types within multi-proof sections for maximum impact | proof-type-sequence.md |
| 2.4: Proof Format Director | Specify format (text, photo, video, widget, stat bar, cascade) per slot | proof-format-direction.md |

**GATE_2:** Every section has a proof spec. No vague assignments ("add testimonials" without count/type). Format direction specific enough for LP-10 execution. Density assignments consistent with wave pattern.

### Layer 3: Architecture Validation

> **POSITIONAL REINFORCEMENT:** You are VALIDATING the architecture. The design is complete — now test it. Run every check. Do not skip any validation because the architecture "looks right."

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: Proof Architecture Validator | Score architecture against 8-point validation checklist | architecture-validation.md |
| 3.2: Coverage Audit | Test for proof deserts, proof monotony, Type A/B conflation, volume thresholds | coverage-audit.md |

**GATE_3:** Architecture score >= 7.0/8 AND coverage audit passes (zero proof deserts, zero proof monotony, correct type pattern). If score < 7.0 -> revise and re-validate.

### Layer 4: Package Assembly

> **POSITIONAL REINFORCEMENT:** You are assembling the final output package. No new decisions. Compile what Layer 2 designed and Layer 3 validated into the three output files.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: Proof Architecture Compiler | Assemble proof-architecture.json | proof-architecture.json |
| 4.2: Summary Writer | Write PROOF-ARCHITECTURE-SUMMARY.md | PROOF-ARCHITECTURE-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md | execution-log.md |

---

## 8-POINT VALIDATION CHECKLIST

Score each point 0 (fail) or 1 (pass). Minimum 7.0/8 to proceed.

**Early Trust (2 points)**
1. Proof appears within the first 25% of the page (20-Point Checklist item 09)
2. Early proof is authority-type or volume-type (not generic testimonials)

**Volume Thresholds (2 points)**
3. Type A: >= 15 testimonials total across all proof blocks (20-Point Checklist item 10)
4. Type B: >= 50 reviews in cascade section (20-Point Checklist item 10)
   (Score the applicable one + automatic pass on the other)

**Proof Quality (2 points)**
5. All planned testimonials include specific outcomes/numbers (20-Point Checklist item 11)
6. Before/after format deployed where applicable (20-Point Checklist item 12)

**Architecture Integrity (2 points)**
7. Wave pattern matches page type (Type A wave for Type A, Type B wave for Type B)
8. No proof type monotony (at least 3 different proof types used across the page)

**Scoring:**
- 8/8: Architecture ready for LP-10 execution
- 7/8: Minor gap, can proceed with note
- 5-6/8: Structural issues — revise before proceeding
- Below 5: Architecture rebuild required

---

## PROOF-ARCHITECTURE.JSON SCHEMA

```json
{
  "schema_version": "1.0",
  "created": "[ISO timestamp]",
  "project_name": "[product name]",
  "page_type": "[type_a | type_b | hybrid]",

  "proof_strategy": {
    "mode": "[proof_saturation | authority_substitution]",
    "wave_pattern": "[type_a_wave | type_b_wave | hybrid_wave]",
    "mode_rationale": "[1-2 sentence explanation]"
  },

  "proof_inventory_summary": {
    "testimonials_available": "[count or not_available]",
    "clinical_studies_available": "[count or not_available]",
    "expert_endorsements_available": "[count or not_available]",
    "before_afters_available": "[count or not_available]",
    "platform_reviews_available": "[count or not_available]",
    "media_mentions_available": "[list or not_available]",
    "certifications_available": "[list or not_available]",
    "video_testimonials_available": "[count or not_available]",
    "inventory_sufficiency": "[sufficient | gaps_identified | critical_gaps]"
  },

  "volume_targets": {
    "testimonials_planned": "[count]",
    "studies_planned": "[count]",
    "before_afters_planned": "[count]",
    "authority_signals_planned": "[count]",
    "volume_signals_planned": "[count]",
    "total_proof_touches": "[grand total]",
    "threshold_check": "[PASS | FAIL — with threshold reference]"
  },

  "section_proof_map": [
    {
      "section_number": 1,
      "section_id": "[from section-sequence.json]",
      "section_name": "[from section-sequence.json]",
      "density_level": "[none | light | medium | heavy | maximum]",
      "proof_elements": [
        {
          "slot_id": "[section_id]_proof_[N]",
          "type": "[proof type code]",
          "rank": "[1-6 from hierarchy]",
          "count": "[number of this type in this slot]",
          "format": "[text | photo | video | widget | stat_bar | cascade | badge | certificate]",
          "quality_requirement": "[specific — e.g., 'Named expert with MD/PhD credentials and specific endorsement statement']",
          "content_source": "[available — path/description | requires_sourcing]",
          "placement_within_section": "[opening | embedded | closing | standalone_block]"
        }
      ],
      "transition_in": "[proof transition phrase direction — e.g., 'Don't take my word for it...' | none]",
      "transition_out": "[proof callback direction — e.g., 'And that's just one story...' | none]",
      "wave_zone": "[early | education | accumulation | close]"
    }
  ],

  "proof_wave_summary": {
    "early_zone": {
      "sections": "[section range]",
      "density": "[description]",
      "primary_types": "[list]"
    },
    "education_zone": {
      "sections": "[section range]",
      "density": "[description]",
      "primary_types": "[list]"
    },
    "accumulation_zone": {
      "sections": "[section range]",
      "density": "[description]",
      "primary_types": "[list]"
    },
    "close_zone": {
      "sections": "[section range]",
      "density": "[description]",
      "primary_types": "[list]"
    }
  },

  "proof_gaps": [
    {
      "gap_id": "[GAP_N]",
      "type_needed": "[proof type code]",
      "sections_affected": "[section ids]",
      "count_needed": "[number]",
      "count_available": "[number]",
      "severity": "[critical | high | medium | low]",
      "sourcing_recommendation": "[specific action — e.g., 'Request 5 photo testimonials with specific outcomes from existing customers']"
    }
  ],

  "architecture_score": "[X.X/8]",
  "coverage_audit_result": "[PASS | FAIL — with details]",

  "downstream_handoffs": {
    "lp_10_social_proof_writer": "Load proof-architecture.json section_proof_map — each slot_id is a writing assignment with format and quality requirements",
    "lp_15_page_assembly": "Load proof-architecture.json for proof element placement during assembly",
    "lp_17_conversion_audit": "Load proof-architecture.json for 20-Point Checklist items 09-12 verification"
  }
}
```

---

## AWARENESS-STAGE PROOF ADJUSTMENTS

The audience's awareness stage from `page-brief.json` modifies proof placement timing:

| Awareness Stage | Proof Adjustment |
|----------------|-----------------|
| **Stage 1 — Unaware** | Authority/expert proof early (they don't trust the problem claim yet). Delay testimonials until after mechanism. |
| **Stage 2 — Problem-Aware** | Authority proof early. Testimonials mid-page. Clinical proof woven into education sections. |
| **Stage 3 — Solution-Aware** | Testimonials can appear earlier. Differentiation proof (comparison, unique mechanism) prioritized. |
| **Stage 4 — Product-Aware** | Volume proof early (they already know the product — show them everyone uses it). Objection-specific testimonials near close. |
| **Stage 5 — Most Aware** | Heavy proof immediately. Price + proof above fold. Social proof volume is the primary trust driver. |

---

## PROOF FORMAT SPECIFICATIONS

Each proof element must have a format direction specific enough for LP-10 to execute:

| Format | Description | When to Use |
|--------|------------|-------------|
| `text` | Written testimonial — name, location, outcome, quote | Default for proof blocks |
| `photo` | Headshot + written testimonial | Higher-credibility slots, dedicated proof blocks |
| `video` | Embedded video testimonial with pull-quote | Primary proof blocks (engagement driver) |
| `widget` | Third-party widget (Trustpilot, Judge.me) | Above fold (Type B), trust bar |
| `stat_bar` | 3-number credibility strip ("50K customers / 4.8 stars / 2,847 reviews") | Above fold, social proof strip |
| `cascade` | Scrollable review feed with filtering | Review section (Type B) — 25-50+ reviews |
| `badge` | Visual certification/trust badge | Trust bar, guarantee proximity |
| `certificate` | Visual guarantee certificate | Guarantee section |
| `comparison` | Side-by-side vs. competitors | Comparison table section |
| `before_after` | Side-by-side transformation with timeframe + outcome | Proof blocks, before/after gallery |

---

## MODEL ASSIGNMENT TABLE

| Layer | Task | Model |
|-------|------|-------|
| 0 | Input loading + verification | haiku |
| 1.1-1.2 | Proof classification + volume calculation | sonnet |
| 1.3-1.4 | Wave pattern selection + gap analysis | sonnet |
| 2.1-2.2 | Proof placement + density mapping | sonnet |
| 2.3-2.4 | Type sequencing + format direction | sonnet |
| 3.1-3.2 | Architecture validation + coverage audit | sonnet |
| 4 | Package assembly | haiku |

---

## FORBIDDEN BEHAVIORS

1. Proceeding without loading `section-sequence.json` — the section order is already decided; LP-05 populates proof WITHIN that order
2. Applying Type A wave pattern to a Type B page or vice versa — these are fundamentally different proof architectures
3. Leaving any section without a proof specification (even "none" must be explicitly stated)
4. Assigning proof density as "add testimonials" without specifying count, type, quality requirement, and format
5. Planning fewer than 15 testimonials for Type A or fewer than 50 reviews for Type B
6. No proof in the first 25% of the page — early trust anchoring is mandatory (20-Point Checklist item 09)
7. All proof being the same type — minimum 3 different proof types across the page (no monotony)
8. Planning "great product!" generic testimonials — every testimonial must specify outcomes/numbers requirement
9. Proceeding past GATE_3 with architecture score below 7.0/8
10. Writing copy or testimonial text — LP-05 designs the architecture; LP-10 writes the proof copy
11. Ignoring proof gaps — every gap must be documented with severity and sourcing recommendation
12. Skipping the coverage audit — validation is mandatory even when architecture "looks right"
