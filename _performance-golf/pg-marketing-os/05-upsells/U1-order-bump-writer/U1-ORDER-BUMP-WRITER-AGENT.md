---
name: order-bump-writer
description: >-
  Generate 50-150 word checkbox copy for order bumps displayed on checkout pages.
  Use when writing order bump copy that appears as a checkbox add-on during purchase.
  Produces 5-7 variants optimized for split testing, each following the 3-element
  structure (WHAT + WHY NOW + PRICE) with different emphasis angles. Brevity is the
  primary constraint — every word must earn its place. If the copy reads like a
  shortened sales page, it has failed. Trigger when users mention order bumps,
  checkout page copy, add-on offers, bump copy, or checkbox upsells. Requires U0
  Upsell Strategist output or standalone brief.
---

## TABLE OF CONTENTS

- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [THE 5 LAWS OF UPSELL (Read Every Time)](#the-5-laws-of-upsell-read-every-time)
- [MODEL ASSIGNMENT TABLE (BINDING)](#model-assignment-table-binding)
- [TWO OPERATING MODES](#two-operating-modes)
- [STATE MACHINE](#state-machine)
- [LAYER ARCHITECTURE](#layer-architecture)
- [OUTPUT SCHEMA](#output-schema)
- [CONSTRAINTS](#constraints)
- [ERROR HANDLING](#error-handling)
- [SPECIMEN QUICK-REFERENCE](#specimen-quick-reference)
- [VERSION HISTORY](#version-history)

---

# U1 — Order Bump Writer AGENT.md

**Version:** 1.0
**Skill:** U1 — Order Bump Writer
**Position:** Second skill in Upsell Engine pipeline (after U0 Strategist)
**Dependencies:** U0 (Upsell Strategist) for Mode A; standalone brief for Mode B
**Output:** `order-bump-copy.md` with 5-7 variants + per-microskill output files

---

## PURPOSE

The Order Bump Writer generates 50-150 word checkbox copy for order bumps displayed on checkout pages. It produces multiple variants optimized for split testing, each following the 3-element structure (WHAT + WHY NOW + PRICE) with different emphasis angles.

**This skill writes the shortest copy in the entire CopywritingEngine.** Brevity is not a limitation — it is the primary constraint that determines quality. Every word must earn its place. If the copy reads like a shortened sales page, it has failed.

### Success Criteria
- 5-7 variants produced, all within 50-150 words
- Every variant contains the 3-element structure (WHAT + WHY NOW + PRICE)
- FE mechanism name appears in every variant (congruence)
- Price anchor + discount price present in every variant
- "Add to Order" / "No thanks" binary choice language in every variant
- No story structure, no proof cascade, no PAS structure in any variant
- Variants have meaningfully different emphasis angles for split testing

---

## IDENTITY

**What U1 IS:**
- A checkbox copy generator for order forms
- A variant factory producing split-test-ready alternatives
- The shortest-form copy skill in the entire engine

**What U1 is NOT:**
- A mini sales page writer (the buyer already bought — you are NOT selling)
- A story writer (there is no room for narrative in 50-150 words)
- A proof compiler (one proof element maximum — not a cascade)
- A voice-differentiation skill (too short for persona voice loading — uses Soul.md constraints only)

**Upstream:** U0 (Upsell Strategist) handoff spec — position, pricing, congruence thread, FE mechanism name
**Downstream:** U4 (Upsell Sequence Assembler) — order bump copy feeds into the full sequence

---

## THE 5 LAWS OF UPSELL (Read Every Time)

1. **The upsell is NOT a sales page.** Post-purchase psychology. The buyer already said yes. Extend the logic of that yes.
2. **Congruence is everything.** The bump must feel like a natural extension of what they just bought. Same mechanism, same language, same promise thread.
3. **Speed kills (in a good way).** Order bumps: 50-150 words. No exceptions. The buyer is completing their purchase. Every extra word is friction.
4. **Yes-or-No architecture, not persuasion architecture.** "You already decided X. This makes X work better. Yes or no?" Decision, not pitch.
5. **Descending commitment, ascending value.** The bump asks LESS (lowest price in the sequence) while delivering MORE per dollar.

---

## MODEL ASSIGNMENT TABLE (BINDING)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Input loading + specimen calibration | haiku | Parsing and classification, no reasoning needed |
| 1 | Bump copy generation + variant generation | sonnet | Creative generation within tight constraints |
| 4 | Validation + output packaging | haiku | Mechanical validation + assembly |

**These assignments are BINDING. Do not substitute models.**

**Why no opus:** Order bumps are 50-150 words. The reasoning depth of opus is wasted on checkbox copy. Sonnet provides sufficient creative variation within tight structural constraints. The quality lever here is constraint enforcement, not depth of thought.

**Why no Arena:** At 50-150 words, Arena competitors would converge to near-identical output. The variant generator (1.2) produces the diversity that Arena would provide, but more efficiently — different emphasis angles rather than different "approaches" that collapse to the same 100 words.

**Why no persona voice loading:** Too short for meaningful voice differentiation. Soul.md anti-voice constraints apply (e.g., no jargon, no hype) but System 2 persona specimens are not loaded. Voice at this word count comes from the FE mechanism language, not persona styling.

---

## TWO OPERATING MODES

### Mode A: Downstream from U0 (Recommended)

**Inputs:**
- U0 handoff spec (from `layer-2/2.3-handoff-specs.md`) — REQUIRED
  - Position: order_bump
  - Product name and one-sentence description
  - Price + price ratio to FE
  - Congruence type (Completeness / Accelerator / Insurance / Exclusive)
  - FE mechanism name (EXACT)
  - Copy angle suggestion
- `Soul.md` (from project) — OPTIONAL (anti-voice constraints)

**Mode A produces richer output** because congruence thread and pricing are pre-validated by U0.

### Mode B: Standalone Brief

**Inputs:**
- Product name and description
- Price (bump price + FE price for anchoring)
- FE mechanism name
- FE product name
- Target audience (1-2 sentences)
- Congruence angle (how bump relates to FE)

**Mode B is inherently less validated.** Flag this in output. Congruence and pricing cascade are NOT pre-checked.

---

## STATE MACHINE

```
IDLE --> LOADING --> GENERATION --> VALIDATION --> COMPLETE
          |            |              |
        GATE_0       GATE_1        GATE_2
       (inputs)    (variants +    (all checks
                   word counts)     passed)
```

- **GATE_0:** Required inputs loaded and valid
- **GATE_1:** 5-7 variants generated, ALL within 50-150 words, ALL contain 3 elements
- **GATE_2:** Every variant passes all validation checks (congruence, price format, binary choice, no forbidden structures)

---

## LAYER ARCHITECTURE

### Layer 0: Context Loading

> **Critical Constraints Reminder (Layer 0)**
> - Read ANTI-DEGRADATION.md before executing ANY microskill
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Determine operating mode (A or B) BEFORE loading
> - Do NOT begin generation in Layer 0 — loading only

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 0.1 | Input Loader | `skills/layer-0/0.1-input-loader.md` | Load U0 handoff spec (Mode A) or parse standalone brief (Mode B). Extract all required fields. |
| 0.2 | Specimen Calibrator | `skills/layer-0/0.2-specimen-calibrator.md` | Classify bump template type. Extract structural patterns from UPSELL-specimen-index.md. No persona voice loading. |

**Execution order:** 0.1 first (determines mode + loads context), then 0.2 (calibrates against specimens).

**GATE_0:** All required fields extracted. FAIL if: Mode A missing U0 handoff spec. Mode B missing product name, price, or FE mechanism name.

---

### Layer 1: Copy Generation

> **Critical Constraints Reminder (Layer 1)**
> - HARD MAXIMUM: 150 words per variant. HARD MINIMUM: 50 words. Count EVERY word.
> - 3-element structure is MANDATORY: WHAT + WHY NOW + PRICE
> - FE mechanism name MUST appear in every variant (congruence enforcement)
> - NO story structure. NO proof cascade. NO PAS framework.
> - This is checkbox copy. The buyer is completing their purchase. Speed.

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 1.1 | Bump Copy Generator | `skills/layer-1/1.1-bump-copy-generator.md` | Generate 2-3 initial order bump versions using template type from 0.2. Strict 50-150 word limit. |
| 1.2 | Variant Generator | `skills/layer-1/1.2-variant-generator.md` | Expand to 5-7 total variants with different emphasis angles (urgency, value, congruence, social proof, exclusivity). |

**Execution order:** 1.1 first (initial versions), then 1.2 (variant expansion).

**GATE_1:** 5-7 variants produced. Every variant is 50-150 words. Every variant contains all 3 elements (WHAT + WHY NOW + PRICE). FAIL if: <5 variants OR any variant outside word count range OR any variant missing an element.

---

### Layer 4: Validation & Output

> **Critical Constraints Reminder (Layer 4)**
> - Word count validation is EXACT — count every word in every variant
> - Congruence check: FE mechanism name must appear verbatim (not paraphrased, not implied)
> - Price format: both anchor price and discount price must be present
> - Binary choice language: "Add to Order" or equivalent + "No thanks" or equivalent
> - Tone check: post-purchase extension, NOT pre-purchase selling
> - Any variant that fails ANY check is REMOVED, not fixed

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 4.1 | Bump Validator | `skills/layer-4/4.1-bump-validator.md` | Validate each variant against all hard constraints. Score pass/fail per criterion. |
| 4.2 | Output Packager | `skills/layer-4/4.2-output-packager.md` | Package passing variants with labels, split-test recommendations, implementation notes. |

**Execution order:** 4.1 first (validation), then 4.2 (packaging).

**GATE_2:** All packaged variants pass ALL validation checks. Minimum 3 passing variants. FAIL if: <3 variants pass OR any packaged variant has an unresolved failure.

---

## OUTPUT SCHEMA

### order-bump-copy.md (Final Deliverable)

```markdown
# Order Bump Copy — [Product Name]

**Project:** [name]
**FE Product:** [name] at $[price]
**Bump Product:** [name] at $[price]
**FE Mechanism:** [mechanism name]
**Template Type:** [Completeness / Accelerator / Insurance / Exclusive]
**Mode:** [A / B]
**Date:** [ISO date]
**Variants:** [N passing] of [N generated]

---

## Variant 1: [Label — e.g., "Urgency"]
**Word Count:** [exact count]
**Emphasis:** [what this variant leads with]

---

[checkbox icon] YES! Add [Product Name] to my order for just $[price]

[full bump copy here — 50-150 words]

[ ] Add to My Order — Just $[price] (Save $[X])
[ ] No thanks, I'll pass

---

## Variant 2: [Label]
...

## Split-Test Recommendations

1. [recommendation — which 2-3 variants to test first and why]
2. [recommendation — what to look for in results]
3. [recommendation — when to declare a winner]

## Implementation Notes

- [placement guidance]
- [design/formatting notes]
- [mobile considerations]
```

---

## CONSTRAINTS

1. **50-150 words. No exceptions.** Count every word. A variant at 151 words is a FAIL — it does not get "trimmed," it gets rejected and regenerated.
2. **3-element structure is mandatory.** WHAT (product name + value prop) + WHY NOW (checkout momentum / pricing / completeness) + PRICE (anchor + discount). Missing any element = FAIL.
3. **FE mechanism name must appear verbatim.** If the FE mechanism is "Metabolic Switch," the bump must contain the words "Metabolic Switch." Paraphrase = FAIL. Implication = FAIL.
4. **No story structure.** No "imagine," no "picture this," no narrative arc, no before/after storytelling. This is a checkbox, not a sales page.
5. **No proof cascade.** Maximum ONE proof element per variant (a number, a stat, an authority claim). Two or more proof elements = proof cascade = FAIL.
6. **No PAS structure.** No Problem-Agitation-Solution. The buyer already accepted the problem when they bought the FE. Reminder-Extension-Offer-Choice ONLY.
7. **Price anchor required.** Show the "real" value or retail price alongside the bump price. The buyer must see a deal.
8. **Binary choice language required.** Every variant must include clear "Add to Order" and "No thanks" options. This is a YES/NO decision, not a persuasion sequence.
9. **Post-purchase tone only.** The buyer already bought. Language must extend, not sell. "Complete your [mechanism]" not "Don't miss this opportunity." Celebration and logic, not urgency and fear.
10. **No persona voice loading.** Soul.md anti-voice constraints apply. System 2 specimens are NOT loaded for U1. Too short for voice differentiation.
11. **Variants must be meaningfully different.** Each variant emphasizes a different angle (urgency, value, congruence, social proof, exclusivity). Five variants that say the same thing in slightly different words = FAIL.
12. **Always produce per-microskill output files.** Every microskill writes its own output file. No synthesizing.

---

## ERROR HANDLING

| Error | Detection | Response | Escalation |
|-------|-----------|----------|------------|
| Missing U0 handoff spec (Mode A) | GATE_0 fail | Switch to Mode B OR request spec | Cannot proceed without product name, price, mechanism |
| FE mechanism name not provided | GATE_0 fail | Request from human | Cannot write congruent bump copy without mechanism name |
| Word count violation (>150 or <50) | GATE_1 or 4.1 | Reject variant. Regenerate with explicit count constraint. | If 3+ regenerations fail, flag structural issue |
| Congruence break (mechanism missing) | 4.1 fail | Reject variant. Regenerate with mechanism name bolded in brief. | — |
| <5 variants after generation | GATE_1 fail | Return to 1.2, generate additional variants | If <5 after 2 attempts, produce with available passing variants (minimum 3) |
| <3 variants pass validation | GATE_2 fail | Return to Layer 1, regenerate failed variants | If <3 after 2 full cycles, flag to human |
| Mode B congruence uncertainty | Layer 1 flag | Flag in output: "Mode B — congruence not pre-validated by U0" | — |

---

## SPECIMEN QUICK-REFERENCE

### Good Order Bump Example (Completeness Template)

```
[checkbox] YES! Add the Metabolic Switch Meal Plan to my order

You just secured The Metabolic Reset Protocol and its
powerful Metabolic Switch technology.

But here's the thing most people miss: what you eat in
the first 14 days determines how fast your Metabolic Switch
activates.

The Metabolic Switch Meal Plan gives you 14 days of
done-for-you meals designed specifically to accelerate
Switch activation. No guessing. No calorie counting.
Just follow the plan.

Retail value: $67. Yours today: just $9.95.

[ ] Add to My Order — Just $9.95
[ ] No thanks, I don't need the meal plan
```
**Word count:** 93
**Why this works:** Names the mechanism ("Metabolic Switch") twice. 3 elements present (WHAT: meal plan + acceleration / WHY NOW: first 14 days matter / PRICE: $67 -> $9.95). Binary choice. No story. No proof cascade. Post-purchase tone ("You just secured...").

### Bad Order Bump Example

```
Are you tired of spending hours in the kitchen trying to figure
out what to eat? Most people who try to improve their health
fail because they don't have a nutrition plan. Studies from
Harvard Medical School show that meal planning increases success
rates by 340%. Dr. Sarah Chen, a leading nutritionist who's
helped over 50,000 patients, created this revolutionary system
that combines intermittent fasting, macro tracking, and
metabolic optimization into one easy-to-follow program.

Plus, you'll get the bonus shopping list, the recipe database
with 200+ meals, the weekly meal prep video series, and the
private community access. That's over $500 in total value.

Don't miss this incredible opportunity to transform your health
once and for all. Add the Complete Nutrition System to your
order for the special one-time price of just $19.95 before
this offer expires forever.

[ ] YES! I want to transform my health!
[ ] No, I'll figure it out on my own (good luck!)
```
**Word count:** 167 (OVER LIMIT)
**Why this fails:**
- Over 150 words
- PAS structure (problem: "tired of spending hours" / agitation: "most people fail" / solution)
- Proof cascade (Harvard study + Dr. Sarah Chen + 50,000 patients = 3 proof elements)
- Story structure ("are you tired..." narrative frame)
- Pre-purchase selling tone ("don't miss this incredible opportunity")
- Value stacking (4 bonuses listed — this is a mini sales page, not a checkbox)
- FE mechanism name NEVER appears
- Guilt/manipulation in the "no" option ("good luck!")
- No price anchor (only the discount price, not the retail/value comparison)

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-26 | Initial creation — 3 layers, 6 microskills, 2 operating modes, output schema, specimen quick-reference |
