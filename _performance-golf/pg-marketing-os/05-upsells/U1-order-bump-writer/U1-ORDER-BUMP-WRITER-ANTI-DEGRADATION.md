# U1 — Order Bump Writer ANTI-DEGRADATION.md

**Version:** 1.0
**Skill:** U1 — Order Bump Writer
**Mandatory Read:** YES — before ANY execution of U1

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: U1-ORDER-BUMP-WRITER-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL: Count words exactly in every variant and reject any outside 50-150.
I WILL NOT: Write story structure, proof cascades, PAS frameworks, or mini sales pages.
I WILL NOT: Invent gate statuses, skip congruence checks, or exceed word limits.
```

**Write this declaration to your first output file before executing any microskill.**

---

## THE 5 LAWS OF UPSELL (Tattooed Here for Enforcement)

1. **NOT a sales page.** Post-purchase psychology. Extend the yes.
2. **Congruence is everything.** FE mechanism name. By name. Every variant.
3. **Speed kills.** 50-150 words. The buyer is completing their purchase.
4. **Yes-or-No architecture.** Decision, not pitch. Binary choice.
5. **Descending commitment, ascending value.** Lowest price, highest value-per-dollar.

---

## FAILURE MODE TABLE

| # | Failure Mode | Detection | Response | Escalation |
|---|-------------|-----------|----------|------------|
| F1 | Verbose copy (>150 words) | Word count check in 4.1 | Reject variant. Return to Layer 1 for regeneration with explicit count ceiling. | If 3+ variants exceed limit after regeneration, flag systemic issue — model may be ignoring constraint. |
| F2 | Story structure in bump | Presence of "imagine," "picture this," narrative arc, before/after, chronological sequence | Reject variant. Regenerate with explicit anti-narrative instruction. | — |
| F3 | Proof cascade | 2+ proof elements (stats, studies, authority claims, testimonials) in a single variant | Reject variant. Regenerate with "ONE proof element maximum" bolded. | — |
| F4 | No congruence (FE mechanism name missing) | String search for exact FE mechanism name in variant text | Reject variant. Regenerate with mechanism name as mandatory inclusion. | If mechanism name is unknown, HALT — cannot write congruent bump without it. |
| F5 | Missing price anchor | Only discount price shown, no retail/value reference | Reject variant. Regenerate with anchor instruction. | — |
| F6 | PAS structure in bump | Problem-Agitation-Solution flow detected — "are you tired of..." / "most people fail because..." / "now there's a solution" | Reject entire variant. This is the #1 degradation pattern for order bumps. Regenerate with Reminder-Extension-Offer-Choice structure explicitly. | If PAS persists after regeneration, re-read ANTI-DEGRADATION.md and restart Layer 1. |
| F7 | Pre-purchase selling tone | Urgency language ("don't miss out"), fear ("you'll regret"), manipulation ("last chance ever"), guilt in "no" option | Reject variant. Regenerate with post-purchase tone instruction: celebration, logic, extension. | — |
| F8 | Undifferentiated variants | 3+ variants with same emphasis angle, only surface-level word changes | Return to 1.2. Explicitly generate from different emphasis categories (urgency, value, congruence, social proof, exclusivity). | — |
| F9 | Mini sales page structure | Value stack (3+ bonuses listed), objection handling section, guarantee paragraph, close with urgency — full sales page compressed into bump format | Reject variant. This is a sales page, not a checkbox. Strip to 3 elements: WHAT + WHY NOW + PRICE. | If structural, return to 0.2 specimen calibration — the model has lost the bump format. |
| F10 | Missing binary choice | No "Add to Order" / "No thanks" language | Add binary choice language. This is a formatting fix, not a regeneration. | — |
| F11 | Synthesized output files | Multiple microskills combined into one output | Delete. Re-execute with per-microskill output. | — |
| F12 | Too few words (<50) | Word count check in 4.1 | Reject variant. Regenerate — the variant is too sparse to contain all 3 required elements. | — |

---

## FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)

| Rationalization | Why Invalid |
|-----------------|-------------|
| "The bump needs more context for the buyer to understand" | No. The buyer JUST bought the FE. They have all the context. 150 words max. |
| "150 words is too restrictive for this product" | No. 150 words is the constraint. The product must fit the constraint, not the other way around. Every bump in existence fits in 150 words. |
| "A mini-story would help conversion" | No. Bumps convert on speed and congruence, not narrative. Specimens US-06, US-19, US-20 (quantity bumps) prove that pure WHAT + WHY + PRICE converts at 50-70% take rates. Stories slow the buyer down. |
| "I need more proof to make this convincing" | No. One proof element maximum. The FE already did the convincing. The bump extends the FE's established credibility. A proof cascade in 150 words is a red flag that you're selling, not extending. |
| "The variants are essentially the same but that's okay because the copy is so short" | No. Different emphasis angles are REQUIRED. Urgency, value, congruence, social proof, exclusivity — these produce meaningfully different copy even at 100 words. If you can't differentiate, you don't understand the angles. |
| "I'll just trim the 200-word version down to 150" | No. Trimming a verbose version produces compressed sales copy, not bump copy. Write to the constraint from the start. 150-word bump copy is structurally different from a 200-word version with words removed. |
| "This variant is at 155 words, close enough" | No. 150 is the maximum. 155 is a FAIL. Count is exact. |
| "The mechanism name is implied by the product name" | No. The FE mechanism name must appear VERBATIM. "Metabolic Switch Meal Plan" does not contain "Metabolic Switch" by implication — it contains it literally. But "The Meal Plan" alone does NOT. Explicit reference required. |
| "Post-purchase tone feels too soft for conversion" | No. Post-purchase IS the appropriate tone. The buyer already converted. You are extending their decision, not making a new sale. Soft is strong here. Hard-sell is the failure mode. |

---

## BINARY GATE ENFORCEMENT

Gate status can ONLY be `PASS` or `FAIL`. Any other value means the gate file should NOT exist.

| Gate | PASS Condition | FAIL Condition |
|------|---------------|----------------|
| GATE_0 | Operating mode determined + all required fields extracted (product name, FE mechanism name, price, FE price) | Missing any required field for declared mode |
| GATE_1 | 5-7 variants generated + ALL within 50-150 words + ALL contain 3 elements (WHAT / WHY NOW / PRICE) | <5 variants OR any variant outside word count OR any variant missing element |
| GATE_2 | All packaged variants pass ALL validation criteria (congruence, price format, binary choice, no forbidden structures, tone) + minimum 3 passing variants | <3 passing variants OR any packaged variant has unresolved failure |

---

## PER-MICROSKILL OUTPUT TABLE

| Microskill | Output File | Contents |
|-----------|------------|----------|
| 0.1 Input Loader | `layer-0/0.1-input-context.md` | Loaded fields: product name, FE mechanism name, price, FE price, congruence type, mode determination, any gaps flagged |
| 0.2 Specimen Calibrator | `layer-0/0.2-specimen-calibration.md` | Template type classification, relevant specimen patterns extracted, structural constraints confirmed |
| 1.1 Bump Copy Generator | `layer-1/1.1-initial-bumps.md` | 2-3 initial bump versions with word counts, template type applied, 3-element structure confirmed |
| 1.2 Variant Generator | `layer-1/1.2-bump-variants.md` | 5-7 total variants with emphasis labels, word counts, differentiation notes |
| 4.1 Bump Validator | `layer-4/4.1-validation-results.md` | Per-variant pass/fail table across all criteria, rejected variants listed with reasons |
| 4.2 Output Packager | `order-bump-copy.md` | Final deliverable: passing variants with labels, split-test recommendations, implementation notes |

---

## PROJECT INFRASTRUCTURE

```
[project-dir]/U1-order-bump-writer/
+-- layer-0/
|   +-- 0.1-input-context.md
|   +-- 0.2-specimen-calibration.md
+-- layer-1/
|   +-- 1.1-initial-bumps.md
|   +-- 1.2-bump-variants.md
+-- layer-4/
|   +-- 4.1-validation-results.md
+-- checkpoints/
|   +-- GATE_0_VERIFIED.yaml
|   +-- GATE_1_VERIFIED.yaml
|   +-- GATE_2_VERIFIED.yaml
+-- order-bump-copy.md          <-- FINAL DELIVERABLE
```

**Create this directory structure BEFORE executing any microskill.** If directories don't exist, create them. If stale files from previous runs exist, delete them first (see Stale Artifact Cleanup).

---

## STALE ARTIFACT CLEANUP

Before starting execution, check for and DELETE:
- Any `GATE_*.yaml` files from previous runs
- Any `order-bump-copy.md` from previous runs
- Any microskill output files from previous runs (`layer-0/*.md`, `layer-1/*.md`, `layer-4/*.md`)

Fresh start every time. Stale artifacts from failed runs create confusion about current state — a variant that passed validation in a previous run may reference a different product or mechanism.

---

## CRITICAL ANTI-PATTERN: THE COMPRESSED SALES PAGE

The single most common failure mode for order bump generation is producing a compressed sales page instead of checkbox copy. Here is how to detect it:

**Compressed Sales Page (BAD):**
- Opens with a problem statement ("Are you struggling with...")
- Agitates the problem ("Most people fail because...")
- Introduces a new mechanism or solution
- Lists 3+ benefits or bonuses
- Includes multiple proof elements
- Closes with urgency ("Limited time only!")
- Often 180-250 words, then "trimmed" to 150

**Actual Order Bump Copy (GOOD):**
- Opens with what they just bought (reminder)
- Extends the logic ("Complete your [mechanism] system with...")
- Names the product + one value proposition
- States why adding it NOW makes sense (one reason)
- Shows price with anchor
- Binary choice: Add / No thanks
- Naturally 80-120 words because there's nothing else TO say

If the copy could work as the first 150 words of a sales page, it's wrong. Order bump copy should feel INCOMPLETE as a sales page — because it is not one.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-26 | Initial creation — 12 failure modes, 9 forbidden rationalizations, 3 gates, per-microskill output table, compressed sales page anti-pattern |
