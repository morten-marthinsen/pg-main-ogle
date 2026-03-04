# Learning Log: Promise Skill Client Feedback
**Date:** 2026-02-03
**Skill:** 05-promise
**Project:** UpWellness Ultra Liver

---

## FEEDBACK RECEIVED

### Learning #57: Primary Promise Must Bridge Back to Root Cause Name

**What Happened:**
The 05-Promise pipeline generated: "The real reason your liver supplements haven't worked is that they all skip Phase 3 — the Tri-Phase Flow formula is the first to support all three phases of your liver's natural detox cycle." Client revised to ADD "leaving you with sticky bile" — bridging the countersell (skipping Phase 3) directly back to the root cause name (sticky bile).

**Why It Was Wrong:**
- The original promise went from countersell (skip Phase 3) straight to mechanism/solution (Tri-Phase Flow)
- It skipped the CONSEQUENCE of the countersell — what happens when Phase 3 is skipped
- "Leaving you with sticky bile" closes the loop: problem name → countersell → consequence (root cause) → solution
- The prospect needs to FEEL the problem before hearing the solution — "sticky bile" is visceral and sensory

**Rule Established:**
> **MANDATORY:** The primary promise / campaign thesis must include a bridge from the countersell back to the root cause name. Pattern: "[countersell statement] — leaving you with [root cause name]. [Mechanism/product] is the first to [promise]." The prospect must feel the consequence of the problem before being offered the solution. Never jump directly from countersell to mechanism without naming what the countersell CAUSES.

**Implementation:**
- Add "root cause bridge check" to Layer 2 calibration (2.3-mechanism-fit-verification.md)
- Primary promise template must include root cause name explicitly
- Validate that the promise statement contains: countersell + root cause name + mechanism + outcome

---

### Learning #58: Never Say "Formula" with Mechanism Name — Confusing with Supplements

**What Happened:**
Pipeline output used "Tri-Phase Flow Formula" throughout. Client rejected — "formula" is confusing with supplements because supplements ARE formulas. When you say "Tri-Phase Flow Formula," the prospect doesn't know if you're talking about the mechanism/approach or the literal supplement formula (the blend of ingredients).

**Why This Matters:**
- In supplement copy, "formula" has a specific meaning — the ingredient blend
- Using "formula" as part of the mechanism name creates ambiguity: Is "Tri-Phase Flow Formula" the mechanism concept or the product itself?
- The mechanism name should refer to the APPROACH/SCIENCE, not the product
- "Tri-Phase Flow" alone is the mechanism. The product is "Ultra Liver." They should remain distinct.
- When needed together: "Ultra Liver with Tri-Phase Flow" — product first, mechanism as descriptor

**Rule Established:**
> **MANDATORY (Supplement Niche):** NEVER append "Formula" to a mechanism name in supplement copy. "Formula" = the physical product's ingredient blend. The mechanism name = the scientific approach/process. These must remain distinct. Correct naming: "[Mechanism Name]" alone (e.g., "Tri-Phase Flow") or "[Product] with [Mechanism]" (e.g., "Ultra Liver with Tri-Phase Flow"). NEVER: "[Mechanism] Formula."

**Naming Convention (Updated from Learnings #53-56):**
| Context | Correct | Wrong |
|---------|---------|-------|
| Short reference | Tri-Phase Flow | Tri-Phase Flow Formula |
| Formal/product | Ultra Liver with Tri-Phase Flow | Tri-Phase Flow Formula |
| Authority | Dr. Levitt's Tri-Phase Flow | Dr. Levitt's Tri-Phase Flow Formula |
| In body copy | "the Tri-Phase Flow approach" | "the Tri-Phase Flow formula" |
| Product reference | "the Ultra Liver formula" | "the Tri-Phase Flow formula" |

**Implementation:**
- Update all downstream skill templates to use correct naming convention
- Add "formula" to anti-slop lexicon WHEN used with mechanism names (not when referring to the product itself)
- mechanism_package.yaml and promise_package.yaml naming sections updated

---

## REVISED PRIMARY PROMISE

**Before:** "The real reason your liver supplements haven't worked is that they all skip Phase 3 — the Tri-Phase Flow formula is the first to support all three phases of your liver's natural detox cycle"

**After:** "The real reason your liver supplements haven't worked is that they all skip Phase 3 — leaving you with sticky bile. Ultra Liver with Tri-Phase Flow is the first to support all three phases of your liver's natural detox cycle"

**What changed:**
1. Added "leaving you with sticky bile" — bridges countersell to root cause
2. Removed "formula" from mechanism reference
3. Changed "the Tri-Phase Flow formula" → "Ultra Liver with Tri-Phase Flow" — product + mechanism, no "formula"

---

## SKILLS TO UPDATE (when skill files are restored)

1. `05-promise/skills/layer-2/2.3-mechanism-fit-verification.md` — Add root cause bridge check
2. `04-mechanism/MECHANISM-AGENT.md` — Add "no formula" rule to naming conventions
3. All downstream skills — Update naming convention table
4. Anti-slop lexicon — Add "formula" (when paired with mechanism name) to banned combinations

---

*Learning log entry for promise skill improvement — Ultra Liver project*
