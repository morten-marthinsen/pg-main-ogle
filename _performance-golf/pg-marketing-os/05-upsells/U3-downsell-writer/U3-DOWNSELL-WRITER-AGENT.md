---
name: downsell-writer
description: >-
  Write 300-1000 word downsell pages — shown when a buyer DECLINES a 1-click upsell.
  This is NOT a second sales pitch. The buyer said no; this skill acknowledges that
  no, reframes the offer from a different angle, and presents an alternative using
  the ARO structure (Acknowledge, Reframe, Offer). The reframe must be genuine —
  not just same thing cheaper but a legitimately different angle. All drafts run
  through the Arena in generative_full_draft mode. Trigger when users mention
  downsell pages, decline pages, alternative offers, or writing the page shown
  after an upsell rejection. Requires U0 strategy and U2 context (the declined
  upsell).
---

## TABLE OF CONTENTS

- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [MODEL ASSIGNMENT TABLE (BINDING)](#model-assignment-table-binding)
- [TWO OPERATING MODES](#two-operating-modes)
- [STATE MACHINE](#state-machine)
- [LAYER ARCHITECTURE](#layer-architecture)
- [OUTPUT SCHEMA](#output-schema)
- [CONSTRAINTS](#constraints)
- [ERROR HANDLING](#error-handling)
- [ARO SECTION PROPORTIONS (By Position)](#aro-section-proportions-by-position)
- [TEACHING FOUNDATIONS](#teaching-foundations)
- [VERSION HISTORY](#version-history)

---

# U3 — Downsell Writer AGENT.md

**Version:** 1.0
**Skill:** U3 — Downsell Writer
**Position:** After U2 (Upsell Writer). Before U4 (Assembler), U5 (Editorial).
**Dependencies:** U0 (Upsell Strategy), U2 (output — the declined upsell's context), Soul.md
**Output:** `downsell-page-draft.md` + per-microskill output files
**Arena:** Yes — `generative_full_draft` mode

---

## PURPOSE

Write the 300-1000 word downsell page — the page shown when a buyer DECLINES a 1-click upsell. This is NOT a second sales pitch. The buyer said "no" to the upsell. U3 acknowledges that "no," reframes the offer from a different angle, and presents an alternative — using the ARO structure (Acknowledge, Reframe, Offer).

**Success Criteria:**
- Word count within 300-1000 words (HARD FAIL outside range)
- ARO structure: all 3 sections present and properly proportioned
- Reframe is genuine — NOT just "same thing cheaper" (must be a different angle)
- Congruence verified: front-end mechanism referenced by name, root cause language preserved
- Tone is acknowledging and warm — NOT selling, NOT guilt-tripping
- Price lower than declined upsell, properly anchored
- Binary choice present: "Yes, I'll take [X]" / "No thanks" (cleaner than upsell)
- Zero guilt in the NO option
- Reframe type clearly identified and executed

---

## IDENTITY

**What U3 IS:**
- A post-decline page writer that acknowledges hesitation and offers a genuine alternative
- An ARO structure executor that generates Acknowledge → Reframe → Offer pages
- A reframe engine — the core creative challenge is finding a DIFFERENT angle, not just a lower price
- A congruence enforcer — every word still connects to the FE mechanism and promise
- A tone calibrator — warm, understanding, zero-pressure

**What U3 is NOT:**
- A second upsell attempt (buyer said no — respect that)
- A discount page ("same thing, 50% off" is NOT a downsell — it's a lazy discount)
- A front-end sales page writer (no PAS, no long-form persuasion)
- A guilt-trip machine ("You're missing out on..." is forbidden)
- An upsell writer (that's U2 — different structure, different psychology, different length)

**Upstream:** U0 handoff spec (reframe_type recommendation), U2 output (the declined upsell's context — product, price, angle, bonuses, mechanism, root cause, promise extension, reframe_suggestions)
**Downstream:** U4 (Assembler — needs downsell for sequence), U5 (Editorial)

---

## MODEL ASSIGNMENT TABLE (BINDING)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Context loading (U0 handoff, U2 output, specimens) | haiku | Input loading, no reasoning needed |
| 1 | Analysis (reframe selection, congruence mapping) | sonnet | Analytical classification |
| 2 | Full ARO draft generation | opus | Creative generation — reframe is the hardest part |
| 2.5 | Arena (7 competitors x 2 rounds + audience evaluation) | opus | Maximum quality — generative_full_draft mode |
| 4 | Validation + output packaging | sonnet | Mechanical validation + assembly |

**These assignments are BINDING. Do not substitute models.**

### Layer 2.5: Arena (MANDATORY FILE READS)

**BEFORE generating ANY Arena competitor output, READ these files:**

1. `skills/layer-3/U3-ARENA-LAYER.md` — skill-specific criteria and weights
2. `~system/protocols/ARENA-CORE-PROTOCOL.md` — execution protocol
3. `~system/protocols/ARENA-PERSONA-PANEL.md` — persona specifications

**VERIFY personas match protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect**

**If personas don't match → HALT — FABRICATION DETECTED**

---

## TWO OPERATING MODES

### Mode A: Downstream from U0 + U2 (Recommended)

**Inputs:**
- `upsell-strategy.yaml` (from U0) — REQUIRED
- `upsell-page-draft.md` downstream handoff section (from U2) — REQUIRED
  - Contains: upsell_product, upsell_price, upsell_angle, bonuses, guarantee_type, mechanism_name, root_cause_language, promise_extension, reframe_suggestions
- `mechanism-package.json` (from Skill 04) — REQUIRED
- `soul.md` (from project) — RECOMMENDED

**Mode A produces the strongest output** because it has the declined upsell's full context + U0's reframe_type recommendation.

### Mode B: Standalone Brief

**Inputs:**
- Front-end product name, mechanism name, root cause language, promise — REQUIRED
- Declined upsell product name, price, angle — REQUIRED
- Downsell product description and price — REQUIRED
- Reframe type (Core Extract / Payment Plan / Lite Version / Different Format) — REQUIRED

**Mode B is inherently less rich.** Flag "Mode B — limited upstream context" in all output.

---

## STATE MACHINE

```
IDLE -> LOADING -> ANALYSIS -> GENERATION -> ARENA -> VALIDATION -> COMPLETE
         |           |            |           |          |
       GATE_0     GATE_1       GATE_2     GATE_2.5   GATE_3
      (inputs)  (analysis)    (draft)    (HUMAN_SEL) (schema)
```

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

> **Critical Constraints Reminder (Layer 0)**
> - READ U3-DOWNSELL-WRITER-ANTI-DEGRADATION.md before executing
> - READ UPSELL-ENGINE.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Determine Mode (A vs B) BEFORE loading
> - The downsell is NOT a second upsell — Acknowledge + Reframe + Offer, not Congratulate
> - Buyer said NO. Respect the no. Zero guilt. Zero pressure.

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 0.1 | Input Loader | `skills/layer-0/0.1-input-loader.md` | Load U0 handoff spec, U2 downstream handoff (declined upsell context), mechanism package, soul.md. Determine mode. Extract: mechanism name, root cause language, FE promise, FE price, declined upsell product + price + angle, downsell product, downsell price, reframe_type recommendation from U0, reframe_suggestions from U2. |
| 0.2 | Specimen Calibrator | `skills/layer-0/0.2-specimen-calibrator.md` | Load downsell specimens from vault (limited — only 1 downsell specimen US-16 in index, FILE MISSING). Work from: (a) index metadata, (b) U2 specimen patterns adapted for shorter/softer copy, (c) ARO structure from UPSELL-ENGINE.md. Extract tone patterns, reframe patterns, price presentation patterns. Flag specimen gap in output. |

**Execution order:** 0.1 first (mode determination + context), then 0.2.

**GATE_0:** Sufficient context loaded. FAIL if: Mode A missing U0 handoff spec OR U2 downstream handoff OR mechanism package. Mode B missing declined upsell product/price/angle OR downsell product/price OR FE mechanism name.

---

### Layer 1: Analysis

> **Critical Constraints Reminder (Layer 1)**
> - Reframe type MUST be explicitly selected before generation
> - "Same thing cheaper" is NOT a reframe — it's a discount. DIFFERENT ANGLE required.
> - Congruence is measured against the FRONT-END, not the declined upsell
> - Mechanism must be referenced BY NAME
> - Root cause language must be IDENTICAL to front-end
> - Every microskill produces its own output file

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 1.1 | Reframe Selector | `skills/layer-1/1.1-reframe-selector.md` | Select reframe type from 4 options: (1) Core Extract — "just the essential component", (2) Payment Plan — "same product, spread payments", (3) Lite Version — "reduced scope, same mechanism", (4) Different Format — "same content, different delivery." Selection informed by U0 reframe_type recommendation, U2 reframe_suggestions, product analysis, price differential. Output: selected type with rationale + reframe angle statement. |
| 1.2 | Congruence Mapper | `skills/layer-1/1.2-congruence-mapper.md` | Map the congruence thread from FE through to downsell: exact mechanism name, exact root cause language, exact promise phrasing. Define how the downsell MAINTAINS congruence while offering a different angle. The downsell reframes the OFFER, not the mechanism or promise. |

**Execution order:** 1.1 first (reframe type determines generation direction), then 1.2 (maps congruence for the selected reframe angle).

**GATE_1:** Reframe type selected with rationale. Congruence thread mapped with exact FE language. Reframe angle is genuinely different from upsell angle (NOT just "cheaper"). FAIL if: no reframe type selected OR reframe is just "same thing, lower price" OR mechanism name missing OR root cause language paraphrased.

---

### Layer 2: ARO Draft Generation

> **Critical Constraints Reminder (Layer 2)**
> - THE 5 LAWS OF UPSELL APPLY:
>   1. NOT a sales page (post-decline psychology — even more sensitive than post-purchase)
>   2. Congruence is everything (extend, don't replace)
>   3. Speed kills — 300-1000 words. Buyer patience is LOWEST here.
>   4. Yes-or-No architecture (cleaner than upsell — simpler decision)
>   5. Descending commitment, ascending value (downsell = LESS commitment, MORE value per dollar)
> - ARO structure is MANDATORY — all 3 sections must appear
> - Acknowledge the "no" FIRST. Zero guilt. Zero pressure. Then reframe.

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 2.1 | ARO Draft Generator | `skills/layer-2/2.1-aro-draft-generator.md` | Generate the full 300-1000 word downsell page following ARO structure. Sections: **A**cknowledge (50-100w) — validate hesitation, name what they declined, zero guilt ("I completely understand"), affirm their autonomy. **R**eframe (150-500w) — present alternative angle based on selected reframe type. NOT "same thing cheaper." Different entry point, different value proposition, different reason this version might be BETTER for them right now. Light proof (1 element max). **O**ffer + Choice (100-200w) — clear product, price (lower than declined upsell, properly anchored), binary choice ("Yes, I'll take [X]" / "No thanks"). Even cleaner than upsell CTA. Position-aware: After Upsell 1 decline = full ARO 500-1000w. After Upsell 2 decline = compressed ARO 300-600w. |
| 2.2 | Price Presentation Builder | `skills/layer-2/2.2-price-presentation-builder.md` | Build price presentation for downsell: (a) declined upsell price as anchor ("You passed on [X] at $[upsell price]"), (b) downsell price with contrast ("This gives you the essential core for just $[price]"), (c) per-day breakdown if applicable, (d) savings framing vs declined upsell. Include guarantee: mirror FE guarantee. Include binary CTA: "Yes, I'll Take [Downsell Product] — Just $[Price]" / "No thanks, I'll continue with just my original purchase." |

**Execution order:** 2.1 first (full ARO draft), then 2.2 (refine price presentation in Offer section).

**GATE_2:** Complete ARO draft within 300-1000 words. All 3 ARO sections present. Mechanism named. Root cause language appears. Acknowledge section has zero guilt/zero pressure. Reframe is genuinely different angle. Price lower than declined upsell. Binary choice present with clean NO option. FAIL if: word count outside 300-1000 OR any ARO section missing OR mechanism not named OR reframe is just "cheaper" OR guilt/pressure in Acknowledge OR price >= declined upsell price.

---

### Layer 2.5: Arena

> **Critical Constraints Reminder (Layer 2.5 — Arena)**
> - See `~system/protocols/ARENA-CORE-PROTOCOL.md` for complete 2-round + audience evaluation execution protocol
> - See `U3-ARENA-LAYER.md` for U3-specific competitors, scoring weights, and rubrics
> - Arena mode: `generative_full_draft` — competitors write COMPLETE downsell pages
> - Layer 2 draft = reference material, NOT a template
> - 7 competitors (reframe-focused), 2 rounds + audience evaluation MANDATORY, Human selection BLOCKING
> - Quality threshold: 8.0+ weighted average

**Arena Execution:**
1. Load U3-ARENA-LAYER.md for competitors, criteria, weights
2. Load ~system/protocols/ARENA-CORE-PROTOCOL.md for 2-round + audience evaluation execution flow
3. Each competitor generates a COMPLETE downsell page using upstream packages + Layer 1 analysis + Layer 2 reference draft
4. 2 rounds with adversarial critique, targeted revision, audience evaluation + analytical briefs
5. Post-arena synthesis: 2-3 phrase-level hybrids
6. Human selects from 9-10 candidates

**GATE_2.5 (HUMAN_SELECT):** Human explicitly selects winning downsell page. FAIL if: no selection made OR all candidates below 8.0 threshold.

---

### Layer 4: Validation & Output Packaging

> **Critical Constraints Reminder (Layer 4)**
> - Validate the ARENA-SELECTED output, not the Layer 2 draft
> - Word count: 300-1000 (HARD FAIL outside range)
> - ARO: all 3 sections present
> - Reframe: genuinely different angle, NOT just "cheaper"
> - Congruence: mechanism name + root cause language from FE
> - Tone: acknowledging warmth, zero guilt, zero pressure
> - Price: lower than declined upsell, properly anchored

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 4.1 | Downsell Validator | `skills/layer-4/4.1-downsell-validator.md` | Run all validation gates against Arena-selected output: (1) Word count 300-1000. (2) ARO 3 sections present. (3) Reframe check: NOT just "same thing cheaper." (4) Congruence: mechanism name appears. (5) Congruence: root cause language appears. (6) Tone: acknowledging warmth, zero guilt in Acknowledge section. (7) Price: lower than declined upsell, anchored against it. (8) Binary choice: clean YES/NO with zero guilt in NO option. Report pass/fail per gate with evidence. |
| 4.2 | Output Packager | `skills/layer-4/4.2-output-packager.md` | Package final deliverable: `downsell-page-draft.md` with metadata header (product, position, price, reframe_type, word count, Arena selection info). Include downstream handoff data for U4: downsell-page-draft.md + metadata (position, reframe type used, price, word count, upsell_declined_context). |

**Execution order:** 4.1 first, then 4.2 (sequential).

**GATE_3:** All 8 validation checks pass. Output packaged with complete metadata. Downstream handoff data present. FAIL if: any validation check fails OR missing downstream handoff data.

---

## OUTPUT SCHEMA

### downsell-page-draft.md

```yaml
---
metadata:
  skill: "U3 — Downsell Writer"
  version: "1.0"
  project: "[project name]"
  position: "[downsell_1 | downsell_2]"
  product: "[downsell product name]"
  price: "[downsell price]"
  declined_upsell_product: "[what they said no to]"
  declined_upsell_price: "[what they would have paid]"
  reframe_type: "[core_extract | payment_plan | lite_version | different_format]"
  fe_product: "[front-end product name]"
  fe_price: "[front-end price]"
  fe_mechanism: "[mechanism name]"
  word_count: "[actual count]"
  arena_selection:
    persona: "[selected competitor]"
    type: "[pure | hybrid]"
    weighted_score: "[score]"
  mode: "[A | B]"
  created: "[date]"
---

## ACKNOWLEDGE (50-100 words)

[Acknowledge section — validates hesitation, names what they declined, zero guilt, zero pressure]

## REFRAME (150-500 words)

[Reframe section — different angle, different value proposition, NOT just "cheaper"]

## OFFER + CHOICE (100-200 words)

[Offer section — product, price (lower than declined upsell, anchored), guarantee, binary CTA]

---

## DOWNSTREAM HANDOFF (for U4 Assembler)

downstream_for_U4:
  downsell_product: "[product name]"
  downsell_price: "[price]"
  reframe_type_used: "[core_extract | payment_plan | lite_version | different_format]"
  reframe_angle: "[one sentence — what angle was the downsell framed on]"
  position: "[downsell_1 | downsell_2]"
  word_count: "[actual count]"
  upsell_declined_context:
    upsell_product: "[what they said no to]"
    upsell_price: "[upsell price]"
    upsell_angle: "[what angle the upsell used]"
  mechanism_name: "[exact]"
  root_cause_language: "[exact]"
  guarantee_type: "[mirrored | downsell-specific]"
```

---

## CONSTRAINTS

1. **Word count is a HARD GATE.** 300-1000 words. Under 300 = incomplete ARO. Over 1000 = violating Law 3.
2. **ARO structure is mandatory.** All 3 sections (Acknowledge, Reframe, Offer+Choice) must appear in order.
3. **Reframe must be genuine.** "Same thing cheaper" is NOT a reframe. Must be a different angle: Core Extract, Payment Plan, Lite Version, or Different Format. Each offers genuinely different value, not just less value.
4. **Mechanism must be named.** Generic references = FAIL. Exact mechanism name from FE.
5. **Root cause language must be verbatim.** Same as FE, no paraphrasing.
6. **Zero guilt, zero pressure.** The Acknowledge section is the most sensitive copy in the entire funnel. The buyer said no. Respect that completely. No "you're missing out," no "this is your last chance," no "most people regret..."
7. **Price MUST be lower than declined upsell.** If downsell price >= upsell price, the pricing cascade is broken. FAIL.
8. **Binary choice is the cleanest in the funnel.** "Yes, I'll Take [X]" / "No thanks, I'll continue with my original purchase." Zero manipulation.
9. **Maximum 1 proof element.** Even less than upsell (which allows 2). Downsell is about simplicity and alternative angle, not proof.
10. **Per-microskill output files.** Every microskill produces its own dedicated output file.
11. **No persona voice loading.** 300-1000w is borderline for voice differentiation. Soul.md anti-voice constraints only.
12. **Position-aware generation.** After Upsell 1 decline = full ARO 500-1000w. After Upsell 2 decline = compressed ARO 300-600w.
13. **No PAS structure.** No problem-agitation-solution. The buyer already bought the FE and declined the upsell. They don't need problem awareness.
14. **Never invent products.** If downsell product not in handoff spec, ask the human.

---

## ERROR HANDLING

| Error | Detection | Response | Escalation |
|-------|-----------|----------|------------|
| Missing U2 downstream handoff (Mode A) | GATE_0 fail | Switch to Mode B OR request handoff data | Cannot proceed without knowing what was declined |
| Reframe is just "cheaper" | GATE_1 or GATE_3 | Return to 1.1, select genuine reframe type | If product genuinely cannot be reframed, escalate to U0 |
| Word count outside 300-1000 | GATE_2 or GATE_3 | Trim or expand specific ARO sections | If structural issue, escalate to U0 |
| Guilt/pressure in Acknowledge | GATE_2 or GATE_3 | Rewrite Acknowledge with pure validation language | If persistent, flag to human |
| Price >= declined upsell | GATE_3 | Pricing cascade broken — escalate to U0 | Cannot fix locally — pricing is a strategy issue |
| All Arena candidates below 8.0 | GATE_2.5 | Follow all-below-threshold protocol per ~system/protocols/ARENA-CORE-PROTOCOL.md | Human decides |
| Human rejects all candidates | GATE_2.5 | Capture feedback, return to Layer 2 | 2 rejections = pause |
| No downsell specimens available | Layer 0.2 | Work from U2 specimen patterns + ARO structure | Known limitation, documented in ANTI-DEGRADATION |

---

## ARO SECTION PROPORTIONS (By Position)

| Position | A (Acknowledge) | R (Reframe) | O (Offer+Choice) | Total |
|----------|-----------------|-------------|-------------------|-------|
| Downsell 1 (after Upsell 1) | 50-100w | 250-500w | 100-200w | 400-800w |
| Downsell 2 (after Upsell 2) | 50-75w | 150-300w | 75-150w | 275-525w |

---

## TEACHING FOUNDATIONS

### Post-Decline Psychology

The buyer who declined an upsell is in a DIFFERENT psychological state than the buyer who just purchased:
- **Decision fatigue is real.** They already made a big decision (buying FE). Then they saw an upsell and said no. Their decision-making energy is depleted.
- **Defensive posture.** They may feel they're being "sold to." The Acknowledge section must disarm this — validate their decision, not challenge it.
- **Price sensitivity elevated.** They said no to the upsell price. The downsell price must feel like a genuinely better deal, not a consolation prize.
- **Attention is minimal.** They want to access what they bought. Every word that doesn't serve the reframe is friction.
- **Trust still intact** (barely). They bought the FE, so they trust the brand. But another hard sell will break that trust. The downsell must feel like a CONCESSION, not a second pitch.

### The 4 Reframe Types

**Core Extract:** "Just the essential component." Strip the upsell to its most valuable piece. "Can't commit to the full program? Start with just the Quick-Start Guide — the single most impactful piece." Works when: upsell has multiple components, one stands alone.

**Payment Plan:** "Same product, spread payments." Same offer, different commitment structure. "Split it into 3 easy payments of $X." Works when: price was the objection, not the product. Note: this is the least creative reframe — use when product fit is clearly right but price is the barrier.

**Lite Version:** "Reduced scope, same mechanism." "The 7-day version instead of the 30-day program." "The digital-only package instead of digital + physical." Works when: scope/commitment was the objection.

**Different Format:** "Same content, different delivery." "Audio versions instead of video + audio." "PDF guide instead of video course." Works when: format/time was the objection.

### The Acknowledge Section (CRITICAL)

The Acknowledge section is the most important 50-100 words in the downsell. It sets the emotional frame for everything that follows. Get it wrong, and the buyer closes the page immediately.

**Good Acknowledge:**
"I completely understand. The [Upsell Product] isn't for everyone, and there's absolutely nothing wrong with starting with just the [FE Product]. It's a powerful [mechanism] on its own."

**Bad Acknowledge:**
"Wait! Before you go — you're about to miss out on the biggest upgrade we've ever offered. Most of our customers tell us they regret not adding this..."

The first respects the buyer. The second manipulates them. The first builds trust. The second destroys it.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-27 | Initial creation — 5 layers, 8 microskills, ARO structure, 4 reframe types, position-aware generation, output schema |
