# Learning Log: Mechanism Naming Client Feedback
**Date:** 2026-02-03
**Skill:** 04-mechanism
**Project:** UpWellness Ultra Liver

---

## FEEDBACK RECEIVED

### Learning #53: Mechanism Name Must Sound More Advanced Than the Problem Name

**What Happened:**
The 04-Mechanism pipeline generated "Phase 3 Bile Flow Protocol" as the winning mechanism name. Client rejected it — too long (5 words), too clinical, "a lot." The root cause is "Sticky Bile Syndrome" — visceral, sensory, simple. The mechanism name should sound like the SOLUTION — elevated, precise, scientific. "Phase 3 Bile Flow Protocol" doesn't clear that bar.

**Why It Was Wrong:**
- The pipeline optimized for accuracy and completeness over copy-readiness
- "Protocol" adds length without adding value — it sounds like a medical document, not a product mechanism
- 5 words is too long for a mechanism name that needs to work in headlines, subheads, and casual body copy references
- The name should ELEVATE from the problem, not just describe the science in more words

**Rule Established:**
> **MANDATORY:** Mechanism names must be 2-3 words maximum. The mechanism name must sound MORE advanced/elevated than the root cause name. If the root cause is visceral and sensory (e.g., "Sticky Bile"), the mechanism must sound scientific/branded/precise — not just a longer description of the same concept. Test: would a prospect feel like they're UPGRADING from problem to solution when they hear the name?

**Implementation:**
- Add name-length gate in 1.2-naming-generator.md: reject any candidate over 3 words
- Add "elevation test" in Layer 3 validation: mechanism name must register as more sophisticated than root cause name
- Present top 3-5 naming candidates to client before finalizing — naming is a creative decision that benefits from human input

---

### Learning #54: "The Bile Thinner" Is Too Simplistic — Mechanism Should Not Match Problem's Register

**What Happened:**
"The Bile Thinner" was runner-up at 8.0/10. Client rejected it as "too simplistic" — the mechanism name would be at the same visceral/simple level as "Sticky Bile Syndrome." If the problem is sticky bile, the solution can't just be "bile thinner." That's solving at the same altitude.

**Why This Matters:**
- In copywriting, the mechanism creates ASCENSION — the prospect moves from "I have a problem I can feel" to "there's a sophisticated solution I can trust"
- If the mechanism sounds as simple as the problem, it doesn't create the authority gap that drives purchase decisions
- The mechanism name is doing persuasion work — it needs to imply expertise, research, formulation sophistication

**Rule Established:**
> **Naming hierarchy must ascend:** Root cause (visceral/sensory) → Mechanism (scientific/branded) → Product (authority/trust). Each level should sound more sophisticated than the one before it. Never name the mechanism at the same register as the problem.

**Implementation:**
- Add "register check" to 1.2-naming-generator.md scoring criteria
- Score candidates on perceived sophistication relative to root cause name
- Reject candidates that could be mistaken for a description of the problem rather than a solution

---

### Learning #55: Pipeline Should Present Naming Options to Client, Not Auto-Select

**What Happened:**
The pipeline ran all 29 microskills and selected "Phase 3 Bile Flow Protocol" as the winner without client input on naming. The client had strong opinions — they preferred "Tri-Phase Flow" which wasn't even in the original candidate set. Client input improved the name.

**Why This Matters:**
- Mechanism naming is one of the most consequential creative decisions in the pipeline
- Copywriters have naming instincts that scorecards can't fully capture (how it "feels" in copy, rhythm, mouth-feel)
- The 12-dimension scorecard evaluates mechanism STRENGTH, but mechanism NAMING is partly an art
- Client rejected the auto-selected winner and proposed a better alternative

**Rule Established:**
> **MANDATORY:** After Layer 1.2 (Naming Generator), present top 5 naming candidates to the client with brief rationale for each. Do NOT auto-select. The client must approve the mechanism name before proceeding to Layer 2 optimization. This is a GATE that requires human input.

**Implementation:**
- Add human approval gate after 1.2-naming-generator.md
- Present candidates with: name, word count, register level, key strength, copy usage example
- Client selects winner (or proposes alternative)
- THEN proceed to Layer 2 optimization with approved name

---

### Learning #56: "Tri-Phase Flow" Selected — Naming Pattern to Replicate

**What Happened:**
After exploring 12+ naming candidates, client selected "Tri-Phase Flow" for the following reasons:
- **Dual meaning:** "Tri-Phase" refers to the 3 phases of liver detox; "Flow" refers to bile flow specifically
- **Branded feel:** "Tri-" prefix sounds more branded/technical than "Three-"
- **Elevated register:** Sounds scientific/engineering without being inaccessible — clearly more advanced than "Sticky Bile"
- **3 words:** Tight, punchy, works in headlines and body copy
- **Copy versatility:** "the Tri-Phase Flow formula," "Dr. Levitt's Tri-Phase Flow formula," "the tri-phase approach"

**Pattern to Replicate:**
> When naming mechanisms in health/supplement niches:
> - Use branded prefixes (Tri-, Multi-, Pro-) over plain English (Three, Many, Advanced)
> - Combine a PROCESS word (Phase, Stage, Cycle) with an OUTCOME word (Flow, Clear, Restore)
> - Keep to 2-3 words
> - Test for dual meaning — names that work on two levels are stronger
> - Test in actual copy phrases: "the [NAME] formula," "Dr. X's [NAME] formula," "the [NAME] approach"

**Rejected alternatives and why:**
| Name | Why Rejected |
|------|-------------|
| Phase 3 Bile Flow Protocol | Too long (5 words), too clinical |
| The Bile Thinner | Too simplistic, same register as problem |
| Three-Phase Flow | Good but less branded than "Tri-Phase" |
| Phase 3 Flow | Decent but less dual-meaning than Tri-Phase |
| TriFlow | Too branded/made-up, sounds like a product not a mechanism |

---

## FILES UPDATED

1. mechanism_package.yaml — All naming references updated to "Tri-Phase Flow" / "Tri-Phase Flow Formula"
2. MECHANISM-SUMMARY.md — All naming references updated
3. Runner-up updated from "The Bile Thinner" to "Phase 3 Flow" (8.5/10)

## SKILLS TO UPDATE (when skill files are restored)

1. `1.2-naming-generator.md` — Add 3-word max gate, elevation test, client approval gate
2. `3.4-anti-slop-validator.md` — Add register check (mechanism must outrank root cause in sophistication)
3. `MECHANISM-AGENT.md` — Add human approval gate after Layer 1.2 naming

---

*Learning log entry for mechanism skill improvement — Ultra Liver project*
