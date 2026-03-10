---
name: upsell-sequence-assembler
description: >-
  Assemble all upsell sequence pieces (order bump + upsell + downsell) into a
  cohesive sequence document with cross-page narrative validation. Use after U1-U3
  have produced their individual pieces. This is an ASSEMBLY + VALIDATION skill,
  not a writing skill — it combines existing pieces, validates threading between
  them, verifies pricing cascade compliance, and catches inconsistencies that
  individual skill validations miss. Produces assembled sequence document plus
  E0 handoff for email integration. Trigger when users mention assembling the
  upsell funnel, compiling upsell pages, sequence validation, or building the
  complete post-purchase flow. Requires U0-U3 outputs.
---

## TABLE OF CONTENTS

- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [MODEL ASSIGNMENT TABLE (BINDING)](#model-assignment-table-binding)
- [TWO OPERATING MODES](#two-operating-modes)
- [STATE MACHINE](#state-machine)
- [LAYER ARCHITECTURE](#layer-architecture)
- [OUTPUT SCHEMA](#output-schema)
- [MANDATORY THREAD ELEMENTS (from UPSELL-ENGINE.md)](#mandatory-thread-elements-from-upsell-engine-claudemd)
- [CONSTRAINTS](#constraints)
- [ERROR HANDLING](#error-handling)
- [VERSION HISTORY](#version-history)

---

# U4 — Upsell Sequence Assembler AGENT.md

**Version:** 1.0
**Skill:** U4 — Upsell Sequence Assembler
**Position:** After U1 (Order Bump), U2 (Upsell), U3 (Downsell). Before U5 (Editorial).
**Dependencies:** U0 (Strategy), U1 (Order Bump copy), U2 (Upsell page), U3 (Downsell page)
**Output:** `upsell-sequence-assembled.md` + `validation-report.md` + `e0-handoff.yaml` + per-microskill output files
**Arena:** No — assembly and validation skill, not generative

---

## PURPOSE

Assemble all upsell sequence pieces (order bump + upsell + downsell) into a cohesive sequence document and validate cross-page narrative threading, congruence chain, pricing cascade, and speed compliance. This is the final quality checkpoint before editorial review.

**Key Distinction:** This is an ASSEMBLY + VALIDATION skill, not a writing skill. It does not generate new copy — it COMBINES existing pieces, validates threading between them, and catches inconsistencies that individual skill validations might miss.

**Success Criteria:**
- All upstream pieces assembled in correct funnel order
- Narrative thread verified (mechanism name, root cause, promise, buyer validation on every page)
- Congruence chain validated (FE → Bump → Upsell → Downsell all logically connected)
- Pricing cascade compliant (Bump 10-30% FE, Upsell 50-150% FE, Downsell 30-50% of Upsell)
- Speed compliant (total sequence reading time < 4 minutes)
- Drift report shows <15% deviation from U0 strategic plan
- Two handoffs generated: U5 (editorial) + E0 (email strategy)

---

## IDENTITY

**What U4 IS:**
- The final assembly layer that combines all upsell sequence pieces into a complete document
- The cross-page validator that catches inconsistencies between pages
- The narrative thread auditor ensuring mechanism/root cause/promise weave through every page
- The congruence chain enforcer across the full sequence
- The pricing cascade validator
- The speed enforcer (total reading time)
- The drift detector (deviation from U0 plan)

**What U4 is NOT:**
- A copywriter (all copy is already written by U1, U2, U3)
- A creative direction tool (that's U0)
- An editorial reviewer (that's U5)
- A replacement for individual skill validation (U1, U2, U3 each validate their own output)

**Upstream:** U0 strategy + U1 order bump copy + U2 upsell page + U3 downsell page
**Downstream:** U5 (editorial review), E0 (email strategy — what was offered/accepted/declined)

---

## MODEL ASSIGNMENT TABLE (BINDING)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Loading all upstream outputs | haiku | Input loading, no reasoning needed |
| 1 | 5 validation dimensions | sonnet | Structural validation — pattern matching, not creative |
| 4 | Assembly + packaging + handoff generation | sonnet | Integration of existing content + metadata packaging |

**These assignments are BINDING. Do not substitute models.**

**Why no opus:** U4 is structural validation and assembly. No creative generation required. Sonnet provides sufficient analytical capability for threading validation and congruence checking.

**Why no Arena:** U4 doesn't generate copy. There's nothing to compete on — assembly either threads correctly or it doesn't. Validation is binary, not creative.

---

## TWO OPERATING MODES

### Mode A: Full Sequence (Standard)

**Inputs:**
- `upsell-strategy.yaml` (from U0) — REQUIRED
- `order-bump-copy.md` (from U1) — REQUIRED (selected variant)
- `upsell-page-draft.md` (from U2, Arena-selected) — REQUIRED
- `downsell-page-draft.md` (from U3, Arena-selected) — REQUIRED
- `mechanism-package.json` (from Skill 04) — REQUIRED

### Mode B: Partial Sequence

**Inputs:**
- Subset of above (e.g., bump + upsell only, no downsell yet)
- Assembly proceeds with available pieces
- Validation runs against available pieces only
- Flag "Partial Sequence — [missing piece(s)]" in all output

---

## STATE MACHINE

```
IDLE -> LOADING -> VALIDATION -> ASSEMBLY -> COMPLETE
         |             |            |
       GATE_0        GATE_1      GATE_2
      (inputs)     (all 5        (assembled +
                   validators     handoffs
                   pass)          generated)
```

---

## LAYER ARCHITECTURE

### Layer 0: Loading

> **Critical Constraints Reminder (Layer 0)**
> - READ U4-UPSELL-ASSEMBLER-ANTI-DEGRADATION.md before executing
> - READ UPSELL-ENGINE.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Load ALL upstream pieces BEFORE validation — partial loading = incomplete validation

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 0.1 | Input Loader | `skills/layer-0/0.1-input-loader.md` | Load all upstream outputs: U0 strategy YAML, U1 selected variant, U2 Arena-selected upsell, U3 Arena-selected downsell, mechanism package. Determine mode (full vs partial). Extract key fields for validation: mechanism name, root cause language, promise, all prices, all word counts, all product names. |

**GATE_0:** All available upstream outputs loaded. Mode determined. FAIL if: Mode A and any of the 4 required upstream outputs missing. Mode B: at least U0 strategy + 1 copy piece loaded.

---

### Layer 1: Validation (5 Parallel Validators)

> **Critical Constraints Reminder (Layer 1)**
> - All 5 validators run against the SAME loaded inputs
> - Each validator produces its own output file
> - Validators check CROSS-PAGE consistency (not just individual page quality)
> - Individual pages already passed their own skill validation — U4 catches INTER-PAGE issues
> - Failures here don't mean the individual pieces are bad — they mean the COMBINATION has problems

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 1.1 | Sequence Collector | `skills/layer-1/1.1-sequence-collector.md` | Arrange all pieces in funnel order: Order Form → Order Bump (U1) → [purchase completes] → Upsell Page 1 (U2) → [YES: Upsell 2 or Thank You] / [NO: Downsell (U3)] → Thank You. Verify the sequence is complete per U0 strategy. Flag any missing pieces. Output: ordered sequence with piece boundaries and word counts. |
| 1.2 | Narrative Thread Validator | `skills/layer-1/1.2-narrative-thread-validator.md` | Verify mandatory thread elements across ALL pages: (1) Mechanism name on every page (exact match), (2) Root cause reference 3+ times across sequence, (3) Promise extended on every page, (4) Buyer validation ("smart decision" / "right choice") on every page opening, (5) Price anchoring on upsell + downsell pages. Report: thread-by-thread pass/fail with evidence (exact quotes from each page). |
| 1.3 | Congruence Chain Validator | `skills/layer-1/1.3-congruence-chain-validator.md` | Validate the congruence CHAIN — not just individual congruence but page-to-page logical connection: FE→Bump (bump extends FE), Bump→Upsell (upsell builds on bump), Upsell→Downsell (downsell reframes upsell — genuinely different angle, not just cheaper). Check: language register consistency, emotional tone progression, mechanism language consistency. Report any congruence breaks between adjacent pages. |
| 1.4 | Pricing Cascade Validator | `skills/layer-1/1.4-pricing-cascade-validator.md` | Validate pricing ratios against U0 strategy and standard ranges: Bump = 10-30% of FE price, Upsell = 50-150% of FE price, Downsell = 30-50% of declined upsell price. Check LOSS_LEADER_MODE exceptions if applicable. Verify price anchoring on each page (is the anchor accurate?). Report: ratio-by-ratio pass/fail with actual percentages. |
| 1.5 | Speed Validator | `skills/layer-1/1.5-speed-validator.md` | Calculate total sequence reading time. Formula: total words / 200 wpm (conservative reading speed for sales copy). Threshold: < 4 minutes total. Also check individual page reading times: Bump < 1 min, Upsell < 2 min, Downsell < 1 min. Flag if combined word count pushes past threshold. Report: per-page reading time + total + pass/fail. |

**Execution order:** All 5 validators can run in PARALLEL (independent validation dimensions). 1.1 first (collects and orders pieces), then 1.2-1.5 in parallel.

**GATE_1:** All 5 validators complete. All pass OR failures documented with specific evidence. FAIL if: any validator incomplete OR total failures > 3 across all validators (systemic issue, not isolated problems).

---

### Layer 4: Assembly + Packaging

> **Critical Constraints Reminder (Layer 4)**
> - Assemble the ACTUAL selected copies, not summaries
> - Do NOT rewrite copy — only add sequence metadata and transitions
> - Verify the assembled document matches the individual files
> - Generate BOTH handoffs: U5 (editorial) and E0 (email strategy)
> - Drift report is mandatory — deviation from U0 plan

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 4.1 | Sequence Packager | `skills/layer-4/4.1-sequence-packager.md` | Assemble all pieces into `upsell-sequence-assembled.md` — a single document with the full sequence in funnel order. Include: metadata header (all prices, products, word counts), sequence map, then full text of each piece with clear page boundaries. Also generate `validation-report.md` with all 5 validator results + drift report (deviation from U0 strategy: mechanism name consistency, pricing cascade compliance, word count targets, reframe type match). Drift threshold: <15%. |
| 4.2 | Handoff Generator | `skills/layer-4/4.2-handoff-generator.md` | Generate two downstream handoffs: (1) To U5: `upsell-sequence-assembled.md` is the primary input — includes full sequence + validation report. (2) To E0: `e0-handoff.yaml` — structured data for email follow-up strategy: what products were offered (bump, upsell, downsell), at what prices, what angles, what mechanism, what guarantee terms. E0 uses this to craft abandoned-upsell emails, welcome sequences that reference the upsell, and post-purchase follow-up that continues the congruence thread. |

**Execution order:** 4.1 first (assemble + validate), then 4.2 (generate handoffs from assembled sequence).

**GATE_2:** Assembled sequence document complete. Validation report with all 5 dimensions documented. Drift report < 15%. Both handoffs generated (U5 + E0). FAIL if: assembled document missing any piece OR validation report incomplete OR drift > 15% OR either handoff missing.

---

## OUTPUT SCHEMA

### upsell-sequence-assembled.md

```yaml
---
metadata:
  skill: "U4 — Upsell Sequence Assembler"
  version: "1.0"
  project: "[project name]"
  mode: "[full | partial]"
  fe_product: "[name]"
  fe_price: "[price]"
  fe_mechanism: "[mechanism name]"
  sequence_pieces:
    order_bump:
      product: "[name]"
      price: "[price]"
      word_count: "[count]"
      price_ratio_to_fe: "[X%]"
    upsell_1:
      product: "[name]"
      price: "[price]"
      word_count: "[count]"
      price_ratio_to_fe: "[X%]"
      format: "[text_page | video_script]"
    downsell_1:
      product: "[name]"
      price: "[price]"
      word_count: "[count]"
      price_ratio_to_upsell: "[X%]"
      reframe_type: "[type]"
  total_word_count: "[sum]"
  total_reading_time: "[X minutes]"
  drift_score: "[X%]"
  validation_summary:
    narrative_threads: "[PASS/FAIL]"
    congruence_chain: "[PASS/FAIL]"
    pricing_cascade: "[PASS/FAIL]"
    speed_compliance: "[PASS/FAIL]"
  created: "[date]"
---
```

```
## SEQUENCE MAP

ORDER FORM: [FE Product] — $[price]
  └── ORDER BUMP: [Bump Product] — $[price] ([X%] of FE)
         ↓ [purchase completes]
      UPSELL 1: [Upsell Product] — $[price] ([X%] of FE)
         ├── YES → Thank You (or Upsell 2 if applicable)
         └── NO → DOWNSELL 1: [Downsell Product] — $[price] ([X%] of Upsell)
                    └── YES/NO → Thank You
```

```
## ORDER BUMP — [Product Name]

[Full order bump copy — selected variant from U1]

---

## UPSELL PAGE 1 — [Product Name]

[Full upsell page copy — Arena-selected from U2]

---

## DOWNSELL PAGE 1 — [Product Name]

[Full downsell page copy — Arena-selected from U3]

---

## VALIDATION REPORT

### 1. Narrative Thread Validation
[Results from 1.2]

### 2. Congruence Chain Validation
[Results from 1.3]

### 3. Pricing Cascade Validation
[Results from 1.4]

### 4. Speed Validation
[Results from 1.5]

### 5. Drift Report
[Deviation from U0 strategy]
```

### e0-handoff.yaml

```yaml
upsell_sequence_handoff:
  project: "[name]"
  fe_product: "[name]"
  fe_price: "[price]"
  fe_mechanism: "[mechanism name]"

  offers_in_sequence:
    - position: "order_bump"
      product: "[name]"
      price: "[price]"
      angle: "[one sentence — how bump was positioned]"
    - position: "upsell_1"
      product: "[name]"
      price: "[price]"
      angle: "[one sentence — how upsell was positioned]"
      format: "[text_page | video_script]"
    - position: "downsell_1"
      product: "[name]"
      price: "[price]"
      reframe_type: "[core_extract | payment_plan | lite_version | different_format]"
      angle: "[one sentence — how downsell was reframed]"

  congruence_thread:
    mechanism_name: "[exact]"
    root_cause_language: "[exact]"
    promise: "[core promise]"

  guarantee_terms: "[guarantee description]"

  email_strategy_inputs:
    abandoned_upsell: "Buyer who purchases FE but declines all upsells — follow up with value content that seeds future upsell"
    upsell_accepted: "Buyer who accepted upsell — welcome sequence should reference upsell, cross-sell opportunities"
    downsell_accepted: "Buyer who declined upsell but accepted downsell — nurture toward full product upgrade"
```

---

## MANDATORY THREAD ELEMENTS (from UPSELL-ENGINE.md)

| Thread | Minimum | Check |
|--------|---------|-------|
| Mechanism Name | Every page | Same exact name — no variations, no paraphrases |
| Root Cause Reference | 3+ across sequence | "Because [root cause]..." language appears 3+ times total |
| Promise Extension | Every page | Each step adds to promise — bump completes, upsell accelerates, downsell provides core |
| Buyer Validation | Every page open | "You made the right choice" or equivalent — acknowledges prior purchase |
| Price Anchoring | Upsell + Downsell | Reference back to FE value or prior pricing |

---

## CONSTRAINTS

1. **No copy generation.** U4 assembles and validates. It does NOT write new copy.
2. **All pieces must be loaded.** Missing pieces in Mode A = GATE_0 FAIL.
3. **5 validators are mandatory.** All 5 must complete.
4. **Thread violations are structural.** Mechanism name missing from one page = GATE_1 FAIL.
5. **Drift threshold is 15%.** Above that = escalate to human.
6. **Both handoffs required.** U5 + E0. Missing either = GATE_2 FAIL.
7. **Per-microskill output files.** Every microskill produces its own dedicated output file.
8. **Assembly uses ACTUAL copy.** Not summaries, not excerpts. Full text of each piece.
9. **Reading time < 4 minutes total.** Based on 200 wpm conservative rate.
10. **Pricing cascade ratios enforced.** Bump 10-30% FE, Upsell 50-150% FE, Downsell 30-50% of Upsell. LOSS_LEADER_MODE exceptions documented.

---

## ERROR HANDLING

| Error | Detection | Response | Escalation |
|-------|-----------|----------|------------|
| Missing upstream piece (Mode A) | GATE_0 fail | Request missing piece from upstream skill | If upstream skill not yet run, flag dependency gap |
| Mechanism name inconsistency | 1.2 flag | Document exact inconsistency. Flag which page uses wrong name. | Human decides: which version is correct? Fix in next editorial pass (U5). |
| Congruence break between pages | 1.3 flag | Document the break: which two pages, what breaks. | Pass to U5 editorial with specific fix recommendations. |
| Pricing cascade violation | 1.4 flag | Document violation with actual ratios. | Escalate to U0 if ratios are far off. Minor deviations: document for human review. |
| Speed violation (>4 min total) | 1.5 flag | Identify which page is longest. Recommend trimming. | Pass to U5 with speed reduction recommendation. |
| Drift > 15% from U0 plan | 4.1 flag | Document specific deviations. | Escalate to human: accept drift or request upstream revision. |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-27 | Initial creation — 3 layers, 8 microskills, 5 validators, dual handoff (U5 + E0), drift reporting |
