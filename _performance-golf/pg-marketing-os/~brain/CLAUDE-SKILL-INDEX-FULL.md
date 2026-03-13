# CopywritingEngine — CLAUDE-SKILL-INDEX.md

**Version:** 1.0 (decomposed from CLAUDE.md v4.0)
**Created:** 2026-02-25
**Purpose:** Per-skill mandatory protocols. Load ONLY the relevant skill's section.
**Parent:** Read `CLAUDE-CORE.md` first (always loaded).

---

## TABLE OF CONTENTS

- [HOW TO USE THIS FILE](#how-to-use-this-file)
- [01-Research (Deep Research v3) — CRITICAL ENFORCEMENT](#01-research-deep-research-v3--critical-enforcement)
- [02-Proof Inventory — CRITICAL ENFORCEMENT](#02-proof-inventory--critical-enforcement)
- [03-Root Cause (v4.1 — Concept/Naming Separation)](#03-root-cause-v41--conceptnaming-separation)
- [04-Mechanism (v4.1 — Concept/Naming Separation)](#04-mechanism-v41--conceptnaming-separation)
- [05-Promise](#05-promise)
- [06-Big Idea (v5.1 — Concept/Naming Separation)](#06-big-idea-v51--conceptnaming-separation)
- [07-Offer](#07-offer)
- [08-Structure](#08-structure)
- [09-Campaign Brief](#09-campaign-brief)
- [10-Headlines](#10-headlines)
- [11-Lead](#11-lead)
- [12-Story](#12-story)
- [13-Root Cause Narrative](#13-root-cause-narrative)
- [14-Mechanism Narrative](#14-mechanism-narrative)
- [15-Product Introduction](#15-product-introduction)
- [16-Offer Copy](#16-offer-copy)
- [17-Close](#17-close)
- [18-Proof Weaving](#18-proof-weaving)
- [19-Campaign Assembly](#19-campaign-assembly)
- [20-Editorial](#20-editorial)
- [Email Engine (E0-E4)](#email-engine-e0-e4)
- [Upsell Engine (U0-U5)](#upsell-engine-u0-u5)
- [Ad Engine (A01-A12)](#ad-engine-a01-a12)
- [Landing Page Engine (LP-00 to LP-18)](#landing-page-engine-lp-00-to-lp-18)

---

## HOW TO USE THIS FILE

**Do NOT read this entire file.** Jump to the section for the skill you are executing:

- [01-Research](#01-research)
- [02-Proof Inventory](#02-proof-inventory)
- [03-Root Cause](#03-root-cause)
- [04-Mechanism](#04-mechanism)
- [05-Promise](#05-promise)
- [06-Big Idea](#06-big-idea)
- [07-Offer](#07-offer)
- [08-Structure](#08-structure)
- [09-Campaign Brief](#09-campaign-brief)
- [10-Headlines](#10-headlines)
- [11-Lead](#11-lead)
- [12-Story](#12-story)
- [13-Root Cause Narrative](#13-root-cause-narrative)
- [14-Mechanism Narrative](#14-mechanism-narrative)
- [15-Product Introduction](#15-product-introduction)
- [16-Offer Copy](#16-offer-copy)
- [17-Close](#17-close)
- [18-Proof Weaving](#18-proof-weaving)
- [19-Campaign Assembly](#19-campaign-assembly)
- [20-Editorial](#20-editorial)
- [Email Engine](#email-engine)

---

## 01-Research (Deep Research v3) — CRITICAL ENFORCEMENT {#01-research}

**Catastrophic Failure Event (2026-02-05 AND 2026-02-11):** This has failed TWICE. 121/1000 quotes then 223/1000 quotes, both with invented gate statuses.

**Reference:** `skills/foundation/01-research/RESEARCH-ANTI-DEGRADATION.md`

### Non-Negotiable Thresholds (PRD v3.0)

| Bucket | Minimum | If Not Met |
|--------|---------|------------|
| **TOTAL** | **1,000** | **HALT** |
| Pain | 300 | HALT |
| Hope | 250 | HALT |
| Root Cause | 200 | HALT |
| Solutions Tried | 150 | HALT |
| Competitor Mechanism | 100 | HALT |
| Villain | 75 | HALT |

### Structural Gate

Layer 2 CANNOT execute unless `[project]/checkpoints/GATE_1_VERIFIED.yaml` exists.

### Forbidden Rationalizations (IMMEDIATE HALT)

| Rationalization | Why Invalid |
|-----------------|-------------|
| "quality over quantity" | BOTH required |
| "representative sample" | ALL items must be processed |
| "conditional pass" | DOES NOT EXIST |
| "sufficient for analysis" | Thresholds are non-negotiable |
| "close enough" / "approximately X" | Numbers are exact |

### Research-Specific MC-CHECK (Every 30 minutes)

```yaml
RESEARCH-MC-CHECK:
  processing_percentage: [%] — Is it 100%?
  total_quotes: [exact] — Is it >= 1000?
  all_bucket_minimums_met: [Y/N]
  am_i_sampling_instead_of_processing_all: [Y/N]
  am_i_thinking_quality_over_quantity: [Y/N]
  am_i_thinking_conditional_pass: [Y/N]
  IF any rationalization detected: 🛑 HALT
```

---

## 02-Proof Inventory — CRITICAL ENFORCEMENT {#02-proof-inventory}

**Process Failure Event (2026-02-05):** Layer 3 (Discovery) completely skipped.

**Reference:** `skills/foundation/02-proof-inventory/PROOF-ANTI-DEGRADATION.md`

### Mandatory Layer 3 Execution

ALL 7 discovery microskills (3.1-3.7) must execute. This is NOT optional.

### Structural Gate Files

Layer 4 CANNOT execute unless BOTH exist:
- `[project]/02-proof-inventory/DISCOVERY_LOG.md`
- `[project]/02-proof-inventory/checkpoints/LAYER_3_COMPLETE.yaml`

### Minimum Discovery Thresholds

| Discovery Type | Minimum | If Not Met |
|----------------|---------|------------|
| Study Discovery Searches | 5 queries | HALT |
| Data Discovery Searches | 3 queries | HALT |
| Expert Quote Searches | 3 queries | HALT |
| Microskills Adding Elements | 3 of 7 | HALT |

### FINAL_HANDOFF.md Requirements

**Minimum 50KB** with all 11 mandatory sections. This is what downstream skills consume.

---

## 03-Root Cause (v4.1 — Concept/Naming Separation) {#03-root-cause}

- **Output:** root-cause-package.yaml + ROOT-CAUSE-SUMMARY.md + execution-log.md
- **Critical:** Three-part structure (what_they_think, what_real, why_nothing_worked) is MANDATORY
- **Anti-pattern:** Skipping derivation to synthesize root cause is FORBIDDEN
- **v4.0 Architecture:** Phase A (Concept Discovery) → **CONCEPT CHECKPOINT** → Phase B (Expression & Naming)
- **CONCEPT_APPROVED.yaml MUST exist before Phase B begins**
- **Soul.md:** Loaded at pre-execution, constrains expression method selection
- **Expression Anchoring:** 0.2.8 TIER1 loader + 2.8 anchoring score + 3+ quote-first variants

---

## 04-Mechanism (v4.1 — Concept/Naming Separation) {#04-mechanism}

- **Output:** mechanism-package.json + MECHANISM-SUMMARY.md + execution-log.md
- **Critical:** All downstream handoffs must be populated
- **v4.0 Architecture:** Layer 1A (Concept) → **CONCEPT CHECKPOINT** → Layer 1B (Naming — 15+ candidates)
- **CONCEPT_APPROVED.yaml MUST exist before Layer 1B begins**
- **Soul.md:** Constrains naming to match energy signature
- **Expression Anchoring:** 0.2.8 TIER1 loader + 1.7 anchoring score + 5+ quote-first names

---

## 05-Promise {#05-promise}

- **Output:** promise-output.json + PROMISE-SUMMARY.md + execution-log.md
- **Critical:** Promise must be calibrated to proof ceiling from 02-proof-inventory
- **Anti-pattern:** Promising beyond what proof can support is FORBIDDEN

---

## 06-Big Idea (v5.1 — Concept/Naming Separation) {#06-big-idea}

- **Output:** big-idea-output.json + BIG-IDEA-SUMMARY.md + execution-log.md
- **Critical:** FSSIT-first generation protocol must be followed
- **v5.0 Architecture:** Layer 2A (Concept) → **CONCEPT CHECKPOINT** → Layer 2B (Creative Wrapping)
- **CONCEPT_APPROVED.yaml MUST exist before Layer 2B begins**
- **Soul.md:** Voice constraints applied to all creative expression in Layer 2B
- **Expression Anchoring:** 0.2.8 TIER1 loader + 3.9 anchoring score + FSSIT drift check

---

## 07-Offer {#07-offer}

- **Output:** offer-package.json + OFFER-SUMMARY.md + execution-log.md
- **Critical:** All enhancement stack components must be complete
- **Anti-pattern:** Incomplete value equation (4/4 required) is FORBIDDEN

---

## 08-Structure {#08-structure}

- **Output:** structure-package.json + STRUCTURE-SUMMARY.md + execution-log.md
- **Critical:** 5+ CPB chunks required, coherence score 7.0 minimum
- **Anti-pattern:** Creating structure without gap mapping and segue planning is FORBIDDEN

---

## 09-Campaign Brief {#09-campaign-brief}

- **Output:** campaign-brief.json + CAMPAIGN-BRIEF-SUMMARY.md + execution-log.md
- **Critical:** All 7 upstream packages must be loaded and integrated
- **Anti-pattern:** Missing threading documentation or voice direction is FORBIDDEN

---

## 10-Headlines {#10-headlines}

**Full protocol in CLAUDE-ARENA.md for Arena execution.**

### Layer Execution Order (NON-NEGOTIABLE)

Layer 0 → Layer 1 → Layer 2 → Layer 3 → Layer 4

### Specimen Injection (MANDATORY)

Before ANY headline generation:
1. READ: `10-headlines/skills/layer-0/0.2.6-curated-gold-specimens.md`
2. LOAD verbatim specimens for selected pattern type
3. HOLD in active context during generation

### Type-Indexed Specimen Usage

| Pattern Type | Specimens |
|--------------|-----------|
| curiosity | Type-1, Type-7, Type-9 |
| benefit | Type-8, Type-10, Type-13 |
| question | Type-6, Type-7, Type-12, Type-13 |
| warning | Type-5, Type-7 |
| story_hook | Type-3, Type-1, Type-10 |
| contrarian | Type-2, Type-11, Type-4 |

### Quality Gates

| Gate | Requirement | Failure Action |
|------|-------------|----------------|
| Gate 2 | 5 candidates ≥ 6.0 | Return to generation |
| Gate 3 | Top candidate ≥ 7.5 | Return to refinement |
| Gate 4 | Human selects headline | Cannot package |

---

## 11-Lead {#11-lead}

- **Output:** lead-package.json + LEAD-SUMMARY.md + execution-log.md
- **Critical:** 4/4 lead elements required, minimum 2 open loops
- **Specimen injection:** Mandatory from `11-lead/skills/layer-0/0.2.6-curated-gold-specimens.md`
- **HUMAN_SELECTION blocking gate** before packaging

---

## 12-Story {#12-story}

### Specimen Injection (MANDATORY)

1. READ: `12-story/skills/layer-0/0.2.6-curated-gold-specimens.md`
2. Match story type to specimens

| Story Type | Gold Specimens |
|------------|---------------|
| standard_discovery | Leptitox (G1), Elixir of Eros (G2), Erect on Demand (G4) |
| accidental_discovery | Fat Flusher (G5) |
| straight_to_expert | Montezuma's Secret (G3), Resurge (G6) |
| proof_story_live_experiment | Speed Profits (G9) |
| warning_story | America2020 (G7) |

### Beat Structure (MUST FOLLOW)

- **Standard Discovery:** Trip → Yoda → Cry for Help → Reveal → Verification → Root Cause
- **Accidental Discovery:** Accident → Yoda → Reveal → Verification → Root Cause
- **Straight-to-Expert:** Finding Yoda → Trip → Reveals → Verification → Root Cause

### Forbidden Behaviors

1. Generating without specimens
2. Skipping beat structure
3. Revealing mechanism before Cry for Help

---

## 13-Root Cause Narrative {#13-root-cause-narrative}

### Three-Part Structure (MUST INCLUDE)

1. **WHAT THEY THINK** — False belief
2. **WHAT IT REALLY IS** — Counter-intuitive root cause
3. **WHY NOTHING WORKED** — Failure explanation

### 10 Critical Rules

Root cause MUST be: EXTERNAL, explain ALL failures, more specific than false belief, create path to solution, pair with villain, counter-intuitive, woven throughout, have anchor phrase. Authority before reveal. Kill competitor solutions.

### Specimen Injection: `13-root-cause-narrative/skills/layer-0/0.2.6-curated-gold-specimens.md`

---

## 14-Mechanism Narrative {#14-mechanism-narrative}

### 6-Phase Unit Structure

1. Problem Amplification → 2. Root Cause Bridge → 3. Mechanism Naming/Reveal → 4. Mechanism Explanation → 5. Proof Integration → 6. Product Bridge

### 6 Simplification Techniques (USE AT LEAST ONE)

binary_reduction, single_metaphor_anchor, layered_analogy_chain, just_think_shortcut, relatable_body_knowledge, numbered_system

### Forbidden Behaviors

- Missing naming moment
- Proof as bullet lists
- Hedge words
- Missing metaphor anchor
- Missing "Think about it"

---

## 15-Product Introduction {#15-product-introduction}

### 8 Master Principles

1. Product never hero (mechanism is hero)
2. Withholding creates value
3. Bridge moment most dangerous
4. Components are proof
5. Value before price
6. Guarantees named/branded
7. Scarcity justified
8. Close is binary choice

### Specimen Injection: `15-product-introduction/skills/layer-0/0.2.6-curated-gold-specimens.md`

---

## 16-Offer Copy {#16-offer-copy}

### 10 Offer Copy Principles

1. D-F-W-B-P is sacred
2. Promise restated, never repeated
3. Value before price, always
4. "If all it did was..." NOT optional (3+ iterations)
5. Guarantee is feature, not policy
6. Three CTAs minimum
7. Consequence amplification between CTAs
8. Urgency justified
9. Stack review before price
10. Seamless entry from Product Intro

### Specimen Injection: `16-offer-copy/skills/layer-0/0.2.6-curated-gold-specimens.md`

---

## 17-Close {#17-close}

### 6 Makepeace Foundational Elements

1. Benefit Summary (5+ "You get" items)
2. Guarantee as Confidence (contract/promise, NEVER generic)
3. Ask for Sale (6-10+ with DIFFERENT phrases)
4. Tell What to Do (step-by-step)
5. P.S. Power Section
6. Sidebars/Callouts

### Specimen Injection: `17-close/skills/layer-0/0.2.6-curated-gold-specimens.md`

---

## 18-Proof Weaving {#18-proof-weaving}

### 7 Proof Types with Specimens

| Proof Type | Primary Specimen |
|------------|-----------------|
| testimonial_cascade | Gold #1 (IVL Parade) |
| before_after | Gold #3 (Ken Transformation) |
| study_citation | Gold #4 (Element Z) + Gold #5 (Sinatra 62%) |
| demonstration | Gold #5 (Sinatra Demonstration) |
| authority | Gold #6 (Sears) + Gold #7 (Sinatra Chain) |
| social_proof_scale | Gold #2 (40K Patients) + Gold #8 (16M Bottles) |
| transformation_reminder | Gold #9 (Ken Callback) |

### Proof Density Requirements

| Section | Target | Required Types |
|---------|--------|---------------|
| Lead | 1-2 | Authority anchor |
| Mechanism | 3-4 | Study, demonstration |
| Proof Section | 6-8+ | Testimonial cascade, before/after |
| Product | 2-3 | Single testimonial |
| Offer | 1-2 | Value testimonial |
| Close | 2-3 | Transformation reminder |

---

## 19-Campaign Assembly {#19-campaign-assembly}

### Threading Requirements (MINIMUM OCCURRENCES)

| Thread Element | Minimum |
|----------------|---------|
| Mechanism Name | 8+ |
| Root Cause Anchor | 5+ |
| Framework/System Name | 4+ |
| Primary Promise | 6+ |

### 4 Callback Requirements

Lead-to-Close, Proof-to-Close, Story-to-Product, Root-Cause-to-Mechanism

### 8 TIER1 Transition Techniques

Question-to-Validation, Credibility-to-Claim, Data-to-Rhetorical, Statistics-to-Visualization, Historical-to-Prediction, Expert-to-Reframe, Elite-to-Blueprint, Personal-to-Urgency

### Specimen Injection: `19-campaign-assembly/skills/layer-0/0.2.6-curated-gold-specimens.md`

---

## 20-Editorial {#20-editorial}

- **Arena Mode:** `editorial_revision`
- **6 editorial lenses, 7 criteria**
- **Score threshold:** ≥ 8.5 overall
- **Zero slop tolerance**
- **APPROVAL-REQUIRED gate** for major element changes

---

## Email Engine (E0-E4) {#email-engine}

**Master Document:** `skills/email/EMAIL-ENGINE-CLAUDE.md` (1,824 lines — READ THAT FILE for full protocol)

### 5-Skill Architecture

| Skill | Name | Arena? |
|-------|------|--------|
| E0 | Email Strategist | No |
| E1 | Email Writer | Yes (`generative_full_draft`) |
| E2 | Subject Line Engine | Yes (`generative_full_draft`) |
| E3 | Sequence Assembler | No |
| E4 | Email Editorial | Yes (`editorial_revision`) |

### 5 Email Laws

1. Every email is 70-80% content, 20-30% pitch
2. Body type is structure, not suggestion
3. Subject lines written AFTER bodies
4. The sequence is the product
5. Ben Settle's structural DNA, legendary voices

### 7 Body Types

CT (Contrarian 28.7%), QO (Quote-Opener 18.4%), TM (Testimonial 12.1%), QA (Q&A 10.8%), LB (List-Based 15.2%), ST (Story 9.6%), NR (Negative Response 5.2%)

### When Executing

1. READ `skills/email/EMAIL-ENGINE-CLAUDE.md`
2. READ the skill's ANTI-DEGRADATION.md
3. READ the skill's AGENT.md
4. READ each microskill .md spec BEFORE executing
5. FOLLOW all gates exactly

---

## Upsell Engine (U0-U5) {#upsell-engine}

**Master Document:** `skills/05-upsells/UPSELL-ENGINE-CLAUDE.md`

### 6-Skill Architecture

| Skill | Name | Arena? | Status |
|-------|------|--------|--------|
| U0 | Upsell Strategist | No | BUILT |
| U1 | Order Bump Writer | No (too short) | BUILT |
| U2 | 1-Click Upsell Writer | Yes (`generative_full_draft`) | BUILT |
| U3 | Downsell Writer | Yes (`generative_full_draft`) | BUILT |
| U4 | Upsell Sequence Assembler | No | BUILT |
| U5 | Upsell Editorial | Yes (`editorial_revision`) | BUILT |

### 5 Upsell Laws

1. The upsell is NOT a sales page (post-purchase psychology)
2. Congruence is everything (extends front-end purchase logic)
3. Speed kills in a good way (50-150w bumps, 500-2000w upsells, 300-1000w downsells)
4. Yes-or-No architecture, not persuasion architecture
5. Descending commitment, ascending value

### Dependency Chain

```
Skill 07 (Offer) → U0 (Strategy) → U1 (Bump) / U2 (Upsell) → U3 (Downsell)
U1 + U2 + U3 → U4 (Assembler) → U5 (Editorial)
```

### U0 Protocol (Upsell Strategist)

- **Output:** `upsell-strategy.yaml` + `UPSELL-STRATEGY-SUMMARY.md`
- **Modes:** Mode A (downstream from Skills 01-09) or Mode B (standalone brief)
- **4 Layers:** 0 (Context Loading) → 1 (Offer Analysis + Position Mapping) → 2 (Congruence + Narrative) → 4 (Validation + Output)
- **11 microskills** with per-microskill output
- **GATE_2 is HUMAN_SELECT** — strategy requires human approval before U1-U3 execute
- **Pricing cascade rules:** Bump 10-30% FE, Upsell 50-150% FE, Downsell 30-50% of upsell
- **Congruence enforcement:** Mechanism name must appear by exact name in every position

### U1 Protocol (Order Bump Writer)

- **Output:** `order-bump-copy.md` (5-7 validated variants)
- **Modes:** Mode A (downstream from U0) or Mode B (standalone brief)
- **3 Layers:** 0 (Loading + Calibration) → 1 (Generation + Variants) → 4 (Validation + Packaging)
- **6 microskills** with per-microskill output
- **No Arena** — 50-150 words too short for meaningful competition; variant generator produces diversity
- **Model:** haiku (L0) → sonnet (L1 generation) → haiku (L4 validation)
- **3-element structure:** (1) What you're adding, (2) Why it matters NOW, (3) Price anchor
- **4 template types:** Completeness, Accelerator, Insurance, Exclusive
- **Hard constraints:** 150 words max, no story structure, no proof cascade, no PAS

### U2 Protocol (1-Click Upsell Writer)

- **Output:** `upsell-page-draft.md` (500-2000w, CAIRO structure)
- **Modes:** Mode A (downstream from U0 + Skill 04) or Mode B (standalone brief)
- **5 Layers:** 0 (Foundation) → 1 (Analysis) → 2 (CAIRO Draft) → 2.5 (Arena) → 4 (Validation)
- **14 microskills** with per-microskill output + Arena
- **Arena:** `generative_full_draft` mode with 7 upsell-specific competitors
- **CAIRO structure:** Congratulate → Amplify → Intrigue → Reason → Offer
- **Arena competitors:** Congruence Purist, Story Extender, Proof Stacker, Urgency Driver, Value Calculator, Problem Revealer, Speed Optimizer
- **Arena scoring:** Congruence (40%), Extension Logic (30%), Tone Shift (20%), Proof Quality (10%)
- **Persona voice loading:** Yes (500-2000w = sufficient for voice differentiation)
- **Position-aware:** Position 1 (standard congratulate) vs Position 2+ (warning/confession option)
- **Congruence score:** 1-10 scale, >= 7.0 required, < 5.0 = HALT
- **Downstream handoff:** Provides U3 with upsell angle, bonuses, price, and 2 reframe suggestions

### U3 Protocol (Downsell Writer)

- **Output:** `downsell-page-draft.md` (300-1000w, ARO structure)
- **Modes:** Mode A (downstream from U0 + U2) or Mode B (standalone brief)
- **5 Layers:** 0 (Foundation) → 1 (Reframe Selection + Congruence) → 2 (ARO Draft) → 2.5 (Arena) → 4 (Validation)
- **8 microskills** with per-microskill output + Arena
- **Arena:** `generative_full_draft` mode with 7 reframe-focused competitors
- **ARO structure:** Acknowledge → Reframe → Offer (NOT CAIRO — downsells acknowledge a "no", not congratulate a "yes")
- **Arena competitors:** Empathy Expert, Core Extractor, Angle Shifter, Value Calculator, Payment Architect, Format Flipper, Gentle Closer
- **Arena scoring:** Reframe Quality (40%), Congruence (25%), Tone (20%), Simplification (15%)
- **4 Reframe Types:** Core Extract, Payment Plan, Lite Version, Different Format
- **No persona voice loading** — 300-1000w too short for voice differentiation; anti-voice from soul.md only
- **Position-aware:** Downsell 1 (500-1000w, full ARO) vs Downsell 2 (300-600w, compressed ARO)
- **Critical rule:** "Same thing cheaper" is NOT a reframe — must be genuinely different angle
- **Zero guilt:** Acknowledge section has zero pressure, zero FOMO, validates hesitation
- **Downstream handoff:** Provides U4 with reframe_type_used, upsell_declined_context

### U4 Protocol (Upsell Sequence Assembler)

- **Output:** `upsell-sequence-assembled.md` + `validation-report.md` + `e0-handoff.yaml`
- **Modes:** Mode A (full sequence: U0+U1+U2+U3) or Mode B (partial sequence)
- **3 Layers:** 0 (Input Loading) → 1 (5 Parallel Validators) → 4 (Assembly + Handoff)
- **8 microskills** with per-microskill output
- **No Arena** — assembly and validation skill, not generative
- **5 Validators:** Sequence Collector, Narrative Thread (5 mandatory threads), Congruence Chain, Pricing Cascade, Speed (<4 min total)
- **Drift report:** Tracks deviation from U0 strategy across 4 dimensions, <15% threshold
- **Dual handoff:** U5 (editorial) + E0 (email strategy via e0-handoff.yaml with 3 buyer scenarios)
- **Arena-selected copy verification:** Checks GATE_2.5 checkpoints for U2/U3 — learned from Skill 19 failure

### U5 Protocol (Upsell Editorial)

- **Output:** `upsell-sequence-final.md` + `EDITORIAL-REPORT.md`
- **4 Layers:** 0 (Input + Rubric) → 1 (Baseline Score + Issues) → 2 (Revisions via Arena) → 4 (Rescore + Validate + Package)
- **9 microskills** with per-microskill output + Arena
- **Arena:** `editorial_revision` mode — targeted revisions for P1/P2 issues, not complete rewrites
- **7 editorial lenses:** Congruence Auditor, Speed Enforcer, Tone Guardian, Value Architect, Flow Specialist, CTA Optimizer, The Integrator
- **Arena competitors:** Congruence Surgeon, Brevity Blade, Tone Recalibrator, Value Reframer, Flow Weaver, CTA Architect, The Integrator
- **Arena scoring:** Issue Resolution (25%), Congruence Preservation (25%), Tone Preservation (20%), Speed Preservation (15%), CTA Clarity (15%)
- **5 Sequence-Level Criteria (S1-S5):** Pricing Cascade, Congruence Chain, Speed Compliance, Voice Consistency, Value Escalation
- **Minimum threshold:** 7.5/10 per piece — all pieces must pass
- **Issue severity:** P1 (Critical → Arena), P2 (Major → Arena), P3 (Minor → Direct Fix), P4 (Cosmetic → Direct Fix)
- **GATE_3:** HUMAN_REVIEW — BLOCKING. Sequence not complete without explicit human approval
- **Follows E4 pattern** (4 layers), NOT Skill 20 pattern (6 layers) — appropriate for 1,500-3,000w upsell sequences

### When Executing

1. READ `skills/05-upsells/UPSELL-ENGINE-CLAUDE.md`
2. READ the skill's ANTI-DEGRADATION.md
3. READ the skill's AGENT.md
4. READ each microskill .md spec BEFORE executing
5. FOLLOW all gates exactly
6. For U2/U3/U5: Also READ CLAUDE-ARENA.md

---

## Ad Engine (A01-A12) {#ad-engine}

**Master Document:** `skills/ads/AD-ENGINE-CLAUDE.md` (v1.5 — READ THAT FILE for full protocol)

### 12-Skill Architecture

| Skill | Name | Arena? |
|-------|------|--------|
| A01 | Ad Intelligence & Competitive Scan | No |
| A02 | Hook & Angle Discovery | Yes (scoring) |
| A03 | Format Strategy & Platform Mapping | No |
| A04 | Script Architecture | No |
| A05 | Visual Direction | No |
| A06 | Ad Arena | Yes (`ad_concept`) |
| A07 | Copy Production | No |
| A08 | Visual/Video Production | No |
| A09 | Assembly & Variant Matrix | No |
| A10 | Pre-Launch Scoring | No |
| A11 | Launch Package | No |
| A12 | Performance Learning Loop | No |

### A01 Ad Intelligence & Competitive Scan

- **31 microskills** (v1.5 — up from 26)
- **3 operating modes:**
  - **Initial Scan** — New project, 500+ competitor ads scraped across platforms
  - **Continuous Monitor** — Scheduled weekly delta scans
  - **Tool-Assisted Scan** (v1.5) — Import pre-scraped, impression-sorted data from Meta Ad Spy tool
- **Tool-Assisted Scan:** Dual-signal performance scoring (40% run duration + 60% impressions) for more accurate winner identification
- **5 new microskills (v1.5):** 0.5 (JSON Import Loader), 0.6 (Brand Database Matcher), 1.6 (Meta Ad Spy Ingester), 2.7 (Impression Scorer), 3.8 (Impression-Weighted Analysis)
- **Integration protocol:** `meta-ad-spy-integration.md` (shared protocol for Tool-Assisted mode)
- **Downstream enrichment:** A02 (impression-validated hooks), A10 (impression-weighted scoring), A12 (impression baselines)

### 5 Ad Laws

1. The hook is NOT the big idea
2. The output is a test matrix, not an ad
3. Ads are modular, not monolithic
4. Platform-native or die
5. Intelligence is continuous, not one-time

### When Executing

1. READ `skills/ads/AD-ENGINE-CLAUDE.md`
2. READ the skill's ANTI-DEGRADATION.md
3. READ the skill's AGENT.md
4. READ each microskill .md spec BEFORE executing
5. FOLLOW all gates exactly
6. For A06: Also READ CLAUDE-ARENA.md

---

## Landing Page Engine (LP-00 to LP-18) {#landing-page-engine}

**Master Document:** `landing-page-engine/CLAUDE.md` (router → subfiles)

### 19-Skill Architecture

| Phase | Skills | Focus |
|-------|--------|-------|
| Phase 1: Intelligence | LP-00, LP-01, LP-02 | Classification, benchmarks, competitive audit |
| Phase 2: Architecture | LP-03, LP-04, LP-05, LP-06 | Above-fold, section sequence, proof, offer/CTA |
| Phase 3: Writing | LP-07, LP-08, LP-09, LP-10, LP-11, LP-12, LP-13, LP-14 | Hero, trust, benefits, proof, offer, FAQ, urgency, CTA |
| Phase 4: Assembly | LP-15, LP-16, LP-17, LP-18 | Page assembly, mobile audit, conversion audit, A/B test plan |

### Two Page Types

| Type | Architecture | Word Count |
|------|-------------|------------|
| **Type A** (Long-Form Sales) | Story-driven, education-first | 4,000-18,000 |
| **Type B** (Ecomm/PDP) | Scan-optimized, image-heavy, above-fold critical | 1,500-7,000 |
| **Hybrid** | Type B above-fold + Type A education below | 3,000-10,000 |

### 7 LP Laws

1. Read before you execute
2. Every microskill produces its own file
3. Gates are PASS or FAIL
4. Type A and Type B are different architectures
5. Write to files immediately
6. ONE OFFER PER PAGE (-266% penalty for multiple offers)
7. If something goes wrong, stop

### Arena Skills

| Skill | Arena Type |
|-------|-----------|
| LP-07 | Yes (3-Lens: Converter/Empath/Skeptic) |
| LP-14 | Yes (3-Lens: Converter/Empath/Skeptic) |

### Key References

| File | Purpose |
|------|---------|
| `landing-page-engine/landing-page-engine-master-prd.md` | 19-skill architecture source of truth |
| `landing-page-engine/landing-page-engine-master-blueprint.md` | Section flows, proof density, CTA optimization |
| `landing-page-engine/conversion-data-reference.md` | Unbounce benchmarks, industry-specific rates |
| `landing-page-engine/element-taxonomy.md` | 64 element types, 8 categories, frequency data |
| `landing-page-engine/specimens/specimen-index.md` | 11 specimen files indexed |
| `landing-page-engine/specimens/cross-page-pattern-analysis.md` | Cross-page synthesis |

### CopywritingEngine Integration

LP-00 has **Downstream Mode** (consumes CopywritingEngine packages) and **Standalone Mode** (builds from user input). When downstream:
- Extracts: research quotes, mechanism name, promise, offer package, assembled draft
- LP-07 consumes Skills 10-11 (Headlines, Lead)
- LP-06 feeds U2 (CTA architecture for upsell pages)

### When Executing

1. READ `landing-page-engine/CLAUDE.md` (router)
2. READ the skill's ANTI-DEGRADATION.md
3. READ the skill's AGENT.md
4. READ each microskill .md spec BEFORE executing
5. For architecture skills (LP-03-06): Also READ MASTER-BLUEPRINT.md + element-taxonomy.md
6. For audit/assembly skills (LP-15-18): Also READ conversion-data-reference.md
