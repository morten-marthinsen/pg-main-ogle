---
name: upsell-page-writer
description: >-
  Write 500-2000 word 1-click upsell pages — the first post-purchase offer buyers
  encounter after completing their front-end purchase. This is NOT a sales page;
  the buyer already said yes. Extends the logic of that yes into a congruent post-
  purchase offer using the CAIRO structure (Congratulate, Amplify, Intrigue, Reason,
  Offer). Supports video script mode for complex products (up to 4000 words). All
  drafts run through the Arena in generative_full_draft mode. Trigger when users
  mention upsell pages, post-purchase offers, 1-click upsells, OTO pages, or
  writing the page that appears after checkout. Requires U0 strategy and Skill 04
  Mechanism output.
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
- [SPECIMEN QUICK-REFERENCE](#specimen-quick-reference)
- [TEACHING FOUNDATIONS](#teaching-foundations)
- [CAIRO SECTION PROPORTIONS (By Position)](#cairo-section-proportions-by-position)
- [FORMAT SPECIFICATIONS](#format-specifications)
- [VERSION HISTORY](#version-history)

---

# U2 — 1-Click Upsell Writer AGENT.md

**Version:** 1.1
**Skill:** U2 — 1-Click Upsell Writer
**Position:** After U0 (Strategist), parallel with U1 (Order Bump). Before U3 (Downsell), U4 (Assembler), U5 (Editorial).
**Dependencies:** U0 (Upsell Strategy), Skill 04 (Mechanism), Soul.md
**Output:** `upsell-page-draft.md` + per-microskill output files
**Arena:** Yes — `generative_full_draft` mode

---

## PURPOSE

Write the 500-2000 word 1-click upsell page — the first post-purchase offer the buyer encounters after completing their front-end purchase. This is NOT a sales page. The buyer already said yes. U2 extends the logic of that yes into a congruent, post-purchase offer using the CAIRO structure (Congratulate, Amplify, Intrigue, Reason, Offer).

**Success Criteria:**
- Word count within 500-2000 words (HARD FAIL outside range)
- **Video script exception:** Video scripts for complex products (supplements with ingredient lists, DFY tools with feature walkthroughs) may extend to 3000-4000 words. Specimen data shows 39% conversion lift from longer videos (OLOF method). If video script exceeds 2000w, flag "EXTENDED_VIDEO" in metadata — do NOT hard-fail. Text pages remain capped at 2000w.
- CAIRO structure: all 5 sections present and properly proportioned
- Congruence verified: front-end mechanism referenced by name, root cause language preserved, promise extended
- Tone is post-purchase warmth — NOT pre-purchase selling
- Price presentation includes anchor + discount + per-day breakdown
- Binary choice present: "Yes, Add To Order" / "No thanks" (clean, no guilt, no manipulation)
- Guarantee references FE guarantee or introduces upsell-specific one
- Overall Arena quality score meets threshold (8.0+ weighted average)

---

## IDENTITY

**What U2 IS:**
- A post-purchase page writer that extends the buyer's momentum
- A CAIRO structure executor that generates congratulate → amplify → intrigue → reason → offer pages
- A congruence enforcer — every word connects back to the front-end mechanism and promise
- A tone calibrator — celebration and logic, not conviction and urgency
- A format generator — produces video scripts OR text pages per U0 spec

**What U2 is NOT:**
- A front-end sales page writer (buyer already purchased — no PAS, no long-form persuasion)
- A mechanism explainer (the mechanism was sold in the front-end — extend it, don't re-explain)
- A proof cascade builder (1-2 proof elements maximum — this is speed, not thoroughness)
- A copy-paste tool (upsell copy must be WRITTEN, not adapted from front-end)
- A strategy tool (U0 handles positioning, pricing, sequence architecture)
- An order bump writer (that is U1 — 50-150 words, completely different format)
- A downsell writer (that is U3 — different reframe angle, shorter, different psychology)

**Upstream:** U0 handoff spec (`layer-2/2.3-handoff-specs.md` → U2 section), `mechanism-package.json` (Skill 04), `soul.md`, optionally `story-elements` (Skill 12)
**Downstream:** U3 (Downsell — needs upsell to know what was declined), U4 (Assembler — stitches full sequence), U5 (Editorial)

---

## MODEL ASSIGNMENT TABLE (BINDING)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Context loading (U0 handoff, mechanism, soul.md, specimens) | haiku | Input loading, no reasoning needed |
| 1 | Analysis (congruence mapping, position analysis, proof inventory, structure selection) | sonnet | Analytical classification — structured reasoning |
| 2 | Full CAIRO draft generation | opus | Creative generation — max quality for 500-2000w piece |
| 2.5 | Arena (7 competitors x 2 rounds + audience evaluation) | opus | Maximum quality generation — generative_full_draft mode |
| 4 | Validation + output packaging | sonnet | Mechanical validation + assembly |

**These assignments are BINDING. Do not substitute models.**

### Layer 2.5: Arena (MANDATORY FILE READS)

**BEFORE generating ANY Arena competitor output, READ these files:**

1. `skills/layer-3/U2-ARENA-LAYER.md` — skill-specific criteria and weights
2. `~system/protocols/ARENA-CORE-PROTOCOL.md` — execution protocol
3. `~system/protocols/ARENA-PERSONA-PANEL.md` — persona specifications

**VERIFY personas match protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect**

**If personas don't match → HALT — FABRICATION DETECTED**

---

## TWO OPERATING MODES

### Mode A: Downstream from U0 (Recommended)

**Inputs:**
- `upsell-strategy.yaml` (from U0) — REQUIRED
- `layer-2/2.3-handoff-specs.md` U2 section (from U0) — REQUIRED
- `mechanism-package.json` (from Skill 04) — REQUIRED
- `soul.md` (from project) — RECOMMENDED
- `story-elements` (from Skill 12) — OPTIONAL (for narrative callbacks)
- `root-cause-package.yaml` (from Skill 03) — OPTIONAL
- `promise-output.json` (from Skill 05) — OPTIONAL

**Mode A produces the strongest output** because it has the full congruence thread, pricing cascade, narrative arc, and strategic positioning from U0.

### Mode B: Standalone Brief

**Inputs:**
- Front-end product name, mechanism name, root cause language, promise — REQUIRED
- Upsell product description and price — REQUIRED
- Front-end price (for anchoring) — REQUIRED
- Target audience description — REQUIRED
- Format preference (video script / text page) — OPTIONAL

**Mode B is inherently less rich.** Congruence thread must be constructed from brief inputs. Flag "Mode B — limited upstream context" in all output.

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
> - READ U2-UPSELL-WRITER-ANTI-DEGRADATION.md before executing
> - READ UPSELL-ENGINE.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Determine Mode (A vs B) BEFORE loading — do not mix modes
> - The upsell is NOT a sales page — post-purchase psychology applies from Layer 0 onward

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 0.1 | Input Loader | `0.1-input-loader.md` | Load U0 handoff spec, mechanism package, soul.md, story elements. Determine mode. Extract: mechanism name, root cause language, FE promise, FE price, upsell product, upsell price, format (video/text), proof elements, guarantee terms. |
| 0.2 | Specimen Calibrator | `0.2-specimen-calibrator.md` | Load upsell specimens from TIER1 vault filtered by: (a) position match (upsell vs bump vs downsell), (b) vertical match, (c) format match (video/text). Extract CAIRO proportions, tone patterns, price presentation patterns, CTA language from specimens. |
| 0.2.7 | Persona Voice Loader | `0.2.7-persona-voice-loader.md` | Load persona voice specimens for Arena competitors. 500-2000 words = sufficient length for voice differentiation. Match persona specimens to vertical + format. Per PERSONA-VOICE-LOADING-PROTOCOL.md. |
| 0.3 | Format Classifier | `0.3-format-classifier.md` | Classify output format: video script (with speaker notes, visual cues, timing marks) OR text page (with headline hierarchy, CTA buttons, layout notes). Set word count target within 500-2000 range based on position and product complexity. |

**Execution order:** 0.1 first (mode determination), then 0.2 + 0.2.7 + 0.3 in parallel.

**GATE_0:** Sufficient context loaded. FAIL if: Mode A missing U0 handoff spec OR mechanism package. Mode B missing FE mechanism name OR upsell product description OR FE price. Format not classified.

---

### Layer 1: Analysis

> **Critical Constraints Reminder (Layer 1)**
> - Congruence is measured against the FRONT-END, not other upsells
> - Mechanism must be referenced BY NAME — "this system" or "this breakthrough" = FAIL
> - Root cause language must be IDENTICAL to front-end, not paraphrased
> - Proof elements limited to 1-2 maximum — this is NOT a proof cascade
> - Every microskill produces its own output file — no synthesis across microskills

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 1.1 | Congruence Mapper | `1.1-congruence-mapper.md` | Map the congruence thread: extract exact mechanism name, exact root cause language, exact promise phrasing from FE. Define how upsell EXTENDS each (not replaces). Document the congruence bridge — the logical connection from "you just bought X" to "X works even better with Y." |
| 1.2 | Position Analyzer | `1.2-position-analyzer.md` | Analyze upsell position in sequence: is this Upsell 1, Upsell 2? What came before (order bump)? What comes after (downsell)? Map buyer psychological state: post-purchase momentum, commitment consistency, trust elevation, time pressure. Determine CAIRO section proportions based on position. |
| 1.3 | Proof Inventory | `1.3-proof-inventory.md` | Select exactly 1-2 proof elements from available inventory. Prioritize: (a) social proof numbers ("Over 14,000 golfers..."), (b) authority endorsement, (c) specific result claim. More than 2 = FAIL. This is not a proof cascade. |
| 1.4 | Structure Selector | `1.4-structure-selector.md` | Select CAIRO variant based on position + product + vertical. Map word count allocation per CAIRO section. Determine opening pattern: standard congratulate (55% of specimens) vs warning/confession (effective at position 2+) vs insider reveal. Set transition mechanics between CAIRO sections. |

**Execution order:** 1.1 first (congruence data needed by all), then 1.2 + 1.3 in parallel, then 1.4 (integrates all).

**GATE_1:** Congruence thread fully mapped with exact language. Position analyzed with psychological state. 1-2 proof elements selected. CAIRO structure variant selected with proportions. FAIL if: mechanism name missing OR root cause language paraphrased instead of verbatim OR >2 proof elements selected OR no CAIRO variant chosen.

---

### Layer 2: CAIRO Draft Generation

> **Critical Constraints Reminder (Layer 2)**
> - THE 5 LAWS OF UPSELL APPLY TO EVERY WORD:
>   1. This is NOT a sales page (post-purchase psychology)
>   2. Congruence is everything (extend, don't replace)
>   3. Speed kills — 500-2000 words, every extra word is friction
>   4. Yes-or-No architecture, not persuasion architecture
>   5. Descending commitment, ascending value
> - CAIRO structure is MANDATORY — all 5 sections must appear
> - Tone: celebration + logic + extension. NOT conviction + urgency + persuasion.
> - Binary choice at the end — no guilt, no manipulation, clean decision

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 2.1 | CAIRO Draft Generator | `2.1-cairo-draft-generator.md` | Generate the full 500-2000 word upsell page following CAIRO structure. Sections: **C**ongratulate (50-100w) — validate purchase, name mechanism/product, open a loop. **A**mplify (100-300w) — future pace FE benefits, five senses, dimensionalized. **I**ntrigue (50-150w) — insider feeling, showmanship, "found a page you shouldn't have." **R**eason (100-400w) — short story-based reason why upsell exists, Cialdini "because." **O**ffer (100-300w) — product, value stack, price anchor, guarantee, binary choice. **Extended Video Note:** For video scripts flagged EXTENDED_VIDEO, proportions scale proportionally: C (50-150w), A (200-800w), I (100-300w), R (200-1000w), O (150-500w). The R (Reason) section absorbs most of the additional length — specimen US-21 and US-24 show the reason-why / proof section expanding most in longer scripts. |
| 2.2 | Bonus Stack Builder | `2.2-bonus-stack-builder.md` | Build the bonus stack for the Offer section. Max 3 bonuses (speed kills — don't bloat). Each bonus: name + one-sentence value + perceived value. Total bonus perceived value > upsell price (deal framing). Bonuses must be CONGRUENT with upsell product — not random add-ons. |
| 2.3 | Price Presentation Builder | `2.3-price-presentation-builder.md` | Build the price presentation block: (a) value anchor ("worth $297..."), (b) actual price with contrast ("yours today for just $67"), (c) per-day/per-use breakdown ("less than $2.24 a day"), (d) comparison anchor ("less than your daily coffee"). Include guarantee presentation: mirror FE guarantee or introduce upsell-specific. Include binary CTA: "Yes, Add [Product] To My Order — Just $[Price]" / "No thanks, I'll pass on this special offer." |

**Done-For-You Upsell Template (from Specimens US-21, US-22, US-26):**
When the upsell product is a done-for-you tool, software, or template, use the "survey → discovery → solution" narrative arc in the Reason section:
1. "We surveyed our customers..." (discovered the real bottleneck)
2. "75% were failing because..." (the manual step is the problem)
3. "So we built [product]..." (the solution origin story)
4. "We tested it with [X] people..." (A/B comparison proof: fail rate without vs success rate with)
5. "And now it's yours today..." (transition to offer)
This arc is the CAIRO gold standard — US-21 (Credit Secrets) achieved 30-50% conversion rates using this exact template. US-26 (Tinder) is structurally identical from a different vertical, proving it works across markets.

**Execution order:** 2.1 first (full CAIRO draft), then 2.2 + 2.3 in parallel (refine Offer section components), then integrate bonus stack and price presentation into the draft.

**GATE_2:** Complete CAIRO draft within 500-2000 words. All 5 CAIRO sections present. Mechanism named in Congratulate section. Root cause language appears. Post-purchase tone confirmed. Price presentation complete with anchor + actual + breakdown. Binary choice present. FAIL if: word count outside 500-2000 OR any CAIRO section missing OR mechanism not named OR PAS/persuasion structure detected OR no binary choice.

---

### Layer 2.5: Arena

> **Critical Constraints Reminder (Layer 2.5 — Arena)**
> - See `~system/protocols/ARENA-CORE-PROTOCOL.md` for complete 2-round + audience evaluation execution protocol
> - See `U2-ARENA-LAYER.md` for U2-specific competitors, scoring weights, and rubrics
> - Arena mode: `generative_full_draft` — competitors write COMPLETE upsell pages from scratch
> - Layer 2 draft = reference material, NOT a template to vary
> - 7 competitors (6 upsell-specific approaches + The Architect)
> - 2 rounds + audience evaluation MANDATORY — no "good enough after Round 1"
> - Human selection BLOCKING — no auto-selection
> - Quality threshold: 8.0+ weighted average

**Arena Execution:**
1. Load U2-ARENA-LAYER.md for competitors, criteria, weights
2. Load ~system/protocols/ARENA-CORE-PROTOCOL.md for 2-round + audience evaluation execution flow
3. Each competitor generates a COMPLETE upsell page using upstream packages + Layer 1 analysis + Layer 2 reference draft
4. Competitors are NOT constrained to the Layer 2 draft's approach — they may use different CAIRO proportions, different opening patterns, different tone calibrations
5. 2 rounds with adversarial critique, targeted revision, audience evaluation + analytical briefs
6. Post-arena synthesis: 2-3 phrase-level hybrids
7. Human selects from 9-10 candidates (7 pure + 2-3 hybrids)

**GATE_2.5 (HUMAN_SELECT):** Human explicitly selects winning upsell page. FAIL if: no selection made OR all candidates below 8.0 threshold (trigger all-below-threshold protocol per ~system/protocols/ARENA-CORE-PROTOCOL.md).

---

### Layer 4: Validation & Output Packaging

> **Critical Constraints Reminder (Layer 4)**
> - Validate the ARENA-SELECTED output, not the Layer 2 draft
> - Word count: 500-2000 (HARD FAIL outside range)
> - CAIRO: all 5 sections present
> - Congruence: mechanism name + root cause language from FE
> - Tone: post-purchase warmth (NOT pre-purchase selling)
> - Price: anchor + discount + per-day breakdown
> - Binary choice: "Yes, Add To Order" / "No thanks"
> - Guarantee: present and either mirrors or extends FE guarantee

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 4.1 | Upsell Validator | `4.1-upsell-validator.md` | Run all 7 validation gates against the Arena-selected output: (1) Word count 500-2000. (2) CAIRO 5 sections present. (3) Congruence: mechanism name appears. (4) Congruence: root cause language appears. (5) Tone: post-purchase warmth scan (flag any pre-purchase selling language). (6) Price: anchor + actual + breakdown present. (7) Binary choice present with both yes and no options. Report: pass/fail per gate with evidence. |
| 4.2 | Congruence Score | `4.2-congruence-score.md` | Score the congruence between upsell and front-end on a 1-10 scale. Criteria: (a) mechanism name exact match, (b) root cause language preservation, (c) promise extension logic, (d) language register consistency, (e) emotional continuity. Score < 7.0 = flag for revision. |
| 4.3 | Output Packager | `4.3-output-packager.md` | Package final deliverable: `upsell-page-draft.md` with metadata header (product, position, price, format, word count, congruence score, Arena selection info). Include downstream handoff data for U3 (downsell needs to know what upsell offered, at what price, what angle — so the downsell can REFRAME, not just discount). |

**Execution order:** 4.1 first, then 4.2, then 4.3 (sequential — each depends on previous).

**GATE_3:** All 7 validation checks pass. Congruence score >= 7.0. Output packaged with complete metadata. Downstream handoff data present. FAIL if: any validation check fails OR congruence score < 7.0 OR missing downstream handoff data.

---

## OUTPUT SCHEMA

### upsell-page-draft.md

```yaml
---
metadata:
  skill: "U2 — 1-Click Upsell Writer"
  version: "1.0"
  project: "[project name]"
  position: "[upsell_1 | upsell_2]"
  format: "[video_script | text_page]"
  product: "[upsell product name]"
  price: "[upsell price]"
  fe_product: "[front-end product name]"
  fe_price: "[front-end price]"
  fe_mechanism: "[mechanism name]"
  word_count: "[actual count]"
  congruence_score: "[1-10]"
  arena_selection:
    persona: "[selected competitor]"
    type: "[pure | hybrid]"
    weighted_score: "[score]"
  mode: "[A | B]"
  created: "[date]"
---

## CONGRATULATE (50-100 words)

[Congratulate section — validates purchase, names mechanism/product, opens a loop]

## AMPLIFY (100-300 words)

[Amplify section — future paces FE benefits, five senses, dimensionalized]

## INTRIGUE (50-150 words)

[Intrigue section — insider feeling, showmanship, pattern disruption]

## REASON (100-400 words)

[Reason section — short story-based reason why, Cialdini "because"]

## OFFER (100-300 words)

[Offer section — product, bonuses, value stack, price anchor, guarantee, binary CTA]

---

## DOWNSTREAM HANDOFF (for U3 Downsell Writer)

downstream_for_U3:
  upsell_product: "[product name]"
  upsell_price: "[price]"
  upsell_angle: "[one sentence — what angle was the upsell sold on]"
  bonuses_included: ["[bonus 1]", "[bonus 2]", "[bonus 3]"]
  guarantee_type: "[mirrored | upsell-specific]"
  mechanism_name: "[exact]"
  root_cause_language: "[exact]"
  promise_extension: "[how upsell extended the FE promise]"
  reframe_suggestions:
    - "[possible downsell reframe angle 1]"
    - "[possible downsell reframe angle 2]"
```

---

## CONSTRAINTS

1. **Word count is a HARD GATE.** 500-2000 words for text pages. Under 500 = incomplete CAIRO. Over 2000 on text = violating Law 3 (Speed kills). **Video script exception:** Video scripts for complex products may extend to 4000 words — flag "EXTENDED_VIDEO" in metadata. Specimens US-21 (2,800w), US-24 (3,400w), and US-26 (4,000w) all exceed 2000w and convert at 30-50% per Goff data. The OLOF method shows +39% conversion from longer videos.
2. **CAIRO structure is mandatory.** All 5 sections (Congratulate, Amplify, Intrigue, Reason, Offer) must appear in order. Skipping a section = structural failure.
3. **Mechanism must be named.** "This system" or "this breakthrough" or "this discovery" are NOT acceptable. The exact mechanism name from the front-end must appear in Congratulate and at least once more in the page.
4. **Root cause language must be verbatim.** The root cause phrasing from the front-end appears in the upsell without paraphrasing. If FE says "hormonal disruption," the upsell says "hormonal disruption" — not "hormone issues" or "endocrine problems."
5. **Post-purchase tone only.** The buyer already bought. No PAS structure. No "imagine your problem." No fear-based urgency. Celebration, logic, extension. Flag any pre-purchase language as a validation failure.
6. **Binary choice is clean.** "Yes, Add [Product] To My Order" / "No thanks, I'll pass on this special offer." No guilt trips. No "No, I don't want to improve my life." No manipulation in the no option.
7. **Maximum 2 proof elements.** This is not a proof cascade. 1-2 proof elements (social proof number, authority endorsement, specific result) woven in. More than 2 = delete the extras.
8. **Price anchor is mandatory.** The upsell price must be presented against a higher anchor value. "Worth $297... yours today for just $67." Without anchoring, the price feels arbitrary.
9. **Guarantee is mandatory.** Either mirror the FE guarantee ("Same 60-day guarantee applies") or introduce an upsell-specific one. No upsell page without risk reversal.
10. **Per-microskill output files.** Every microskill produces its own dedicated output file. Combining microskill outputs into a single file = structural failure.
11. **Mode B must be flagged.** If running from standalone brief, all output must note "Mode B — limited upstream context."
12. **Never invent products or bonuses.** If the handoff spec doesn't include bonuses, the upsell page doesn't have a bonus stack. Ask the human — don't fabricate.

---

## ERROR HANDLING

| Error | Detection | Response | Escalation |
|-------|-----------|----------|------------|
| Missing U0 handoff spec (Mode A) | GATE_0 fail | Switch to Mode B OR request handoff spec | Cannot proceed without product/price/mechanism |
| Mechanism name not in handoff | Layer 1.1 flags | Request mechanism-package.json from Skill 04 | If unavailable, extract from brief (Mode B) |
| Word count outside 500-2000 | GATE_2 or GATE_3 | Trim (if over) or expand (if under) specific CAIRO sections | If structural issue makes range impossible, flag to human |
| Congruence score < 7.0 | Layer 4.2 | Return to Layer 2, regenerate with stricter congruence constraints | If mechanism mismatch is fundamental, escalate to U0 |
| PAS structure detected in draft | GATE_2 | Identify PAS sections, rewrite as CAIRO with post-purchase tone | If persistent across regenerations, flag to human |
| All Arena candidates below 8.0 | GATE_2.5 | Follow all-below-threshold protocol per ~system/protocols/ARENA-CORE-PROTOCOL.md | Human decides: accept highest, regenerate, or adjust upstream |
| Human rejects all candidates | GATE_2.5 | Capture feedback, return to Layer 2 with new direction | 2 rejections = pause and ask for explicit direction |
| Bonuses not in handoff spec | Layer 2.2 | Generate upsell without bonus stack, flag gap | Human decides: provide bonuses or ship without |
| Format mismatch (video vs text) | Layer 0.3 | Clarify with U0 handoff or human | Default to text page if unresolvable |

---

## SPECIMEN QUICK-REFERENCE

### Good Upsell Example (CAIRO Structure)

```
CONGRATULATE (72 words):
"Congratulations — you've just made one of the smartest decisions you'll
make all year. The [Metabolic Switch Protocol] is already on its way to
your inbox, and thousands of men and women have used this exact system
to finally break through their weight loss plateau. But before you go to
your confirmation page, I need to share something with you that could
dramatically accelerate your results..."

AMPLIFY (187 words):
"Picture this: It's 30 days from now. You step on the scale and see a
number you haven't seen in years. Your clothes fit differently — not just
looser, but like they were made for the body you've always wanted. Your
energy is through the roof. You're sleeping deeper. Your spouse noticed
the change last week and hasn't stopped commenting since. That's what
happens when the Metabolic Switch finally flips — when your body stops
fighting you and starts working WITH you. And for most people who follow
the protocol, those results start showing up within the first 14 days.
But here's what we've learned from working with over 14,000 people who've
used this system..."

INTRIGUE (93 words):
"There's one additional element that our most successful users — the ones
who see results 2-3x faster than average — all have in common. We almost
didn't include it in this offer because frankly, the Metabolic Switch
Protocol works great on its own. But after seeing the data... we couldn't
NOT share it. This is something we've only offered to our private coaching
clients — people who paid $2,000+ for this exact guidance."

REASON (246 words):
"Here's why we created this: When we first developed the Metabolic Switch,
we noticed something unexpected. About 30% of our users were getting
results significantly faster than everyone else. Same protocol. Same
foods. Same schedule. But faster, more dramatic results. We spent three
months studying what they were doing differently, and it came down to
one thing: they were combining the Metabolic Switch with a specific
morning activation sequence. Just 7 minutes each morning — before
breakfast — that essentially 'primes' your metabolism to respond even
faster to the protocol. We packaged that morning activation sequence into
what we call the Metabolic Accelerator. It's the exact 7-minute routine
that our fastest responders were already doing naturally. Because when
your metabolism is primed BEFORE you eat, the Metabolic Switch activates
faster and stays active longer throughout the day."

OFFER (198 words):
"The Metabolic Accelerator normally sells for $97 on our website. But
because you just invested in the Metabolic Switch Protocol — and because
this accelerator is specifically designed to work WITH the protocol you
just purchased — I want to offer you something special.

Right now, you can add the Metabolic Accelerator to your order for just
$27. That's less than $1 a day for the next month.

You'll get:
- The complete 7-Minute Morning Activation Sequence (video + PDF) — $47 value
- The Metabolic Priming Food Guide — $29 value
- The 30-Day Accelerator Tracking Sheet — $21 value

Total value: $97. Your price today: $27.

Same 60-day money-back guarantee applies. If the Accelerator doesn't
noticeably speed up your results, just email us for a full refund.

[YES — Add The Metabolic Accelerator To My Order For Just $27]

[No thanks, I'll stick with just the Metabolic Switch Protocol]"
```

**Why this works:** Same mechanism name throughout ("Metabolic Switch"). Root cause language preserved. Congratulate validates the purchase. Amplify future paces with five senses. Intrigue creates insider feeling. Reason tells a short story-based "why" (Cialdini "because"). Offer has anchor ($97), actual ($27), per-day breakdown (<$1/day), bonus stack, guarantee, clean binary choice.

### Bad Upsell Example (What NOT to Do)

```
"Are you TIRED of struggling with your weight? Do you feel like
nothing works no matter how hard you try?

Well, you're not alone. Millions of Americans are fighting the
same battle every single day. The diet industry has LIED to you...

[300 words of problem-agitation-solution]

...which is why we created the Ultimate Fat Burning System. This
revolutionary breakthrough uses cutting-edge science to...

[200 words explaining a new mechanism unrelated to FE]

...and right now, for a limited time only, you can get this
incredible system for just $197 (regularly $497!)

Click here to claim your copy before time runs out!

[No thanks, I don't want to lose weight and feel amazing]"
```

**Why this fails:**
- PAS structure (problem-agitation-solution) — this is a sales page, not a post-purchase upsell
- No Congratulate section — doesn't acknowledge they just bought something
- New mechanism introduced ("Ultimate Fat Burning System") — congruence break
- "Revolutionary breakthrough" / "cutting-edge" — slop language
- No CAIRO structure — missing Amplify, Intrigue, Reason
- Guilt-trip in the no option ("I don't want to lose weight and feel amazing")
- $197 upsell when FE is $47 — inverted anchor (419% of FE)
- No guarantee mentioned
- Fear/urgency tone ("before time runs out") instead of post-purchase warmth
- No per-day breakdown, no bonus stack

---

## TEACHING FOUNDATIONS

### Post-Purchase Psychology (The Foundation of Everything in U2)

The buyer is in a fundamentally different psychological state after purchasing. Understanding this is non-negotiable:

**Commitment Consistency (Cialdini):** The buyer wants to be consistent with their buying decision. They just said "yes" to solving this problem with this mechanism. An upsell that extends that "yes" rides the wave of consistency. An upsell that introduces a new problem or mechanism FIGHTS the consistency impulse.

**The Endowment Effect:** The buyer mentally "owns" the front-end product already. They're protective of their investment. An upsell that makes their investment work BETTER feels like protecting what they own. An upsell that implies their purchase is incomplete feels threatening.

**Post-Purchase Momentum:** The hardest decision — to buy — is already made. Every subsequent decision is easier IF it feels like the same decision extended. "You already decided to fix your metabolism. This makes that fix work faster." That's one decision, not two.

**Elevated Trust:** They trusted you enough to give you money. Trust is at its peak. This is why heavy proof cascades are unnecessary (and counterproductive — they signal distrust of the trust they just gave you).

**Time Pressure (Working FOR You):** The buyer wants to complete the transaction and access their purchase. They're not browsing. They're not comparing. They want to FINISH. This is why upsell copy is short, direct, and decision-framed. Every word that doesn't advance the decision is friction.

### The CAIRO Framework (Validated by 15+ Specimens)

**C — Congratulate (50-100 words):**
Validate the purchase. Name what they bought. Name the mechanism. Create the emotional foundation of "you made a great choice." Then open a loop — hint that there's one more thing that could make this even better.

Specimen pattern: 55% of upsell specimens open with congratulate/stick-the-sale. This is the dominant, proven pattern for Upsell 1 position.

**A — Amplify (100-300 words):**
Future pace the benefits of what they ALREADY bought. Five senses. Dimensionalized. "Picture yourself 30 days from now..." This section does NOT sell the upsell — it reinforces the front-end purchase and builds excitement. The amplification creates emotional momentum that makes the upsell feel like a natural next step, not a new pitch.

**I — Intrigue (50-150 words):**
Create the insider feeling. "There's one more thing our most successful users have in common." "We almost didn't include this." "This is what our $2,000 coaching clients get." The intrigue section transitions from celebrating what they bought to introducing what they could add. It's a bridge, not a sales pitch.

Specimen insight: Warning/confession openers (US-09, US-12, US-17) are effective at Upsell 2 position (pattern disruption after they've already seen one standard upsell). For Upsell 1, the standard congratulate → intrigue flow is stronger.

**R — Reason (100-400 words):**
Tell a SHORT story explaining WHY this upsell exists. Cialdini's "because" principle — people comply at dramatically higher rates when given a reason, even a small one. "We created this because we noticed our fastest responders all had one thing in common..." The reason section provides logical justification for the emotional momentum already built.

**O — Offer (100-300 words):**
Product name. Value stack (brief — 3 bonuses max). Price anchor ("worth $X, yours for $Y"). Per-day/per-use breakdown. Guarantee. Binary choice. Clean, fast, no fluff. The offer section is mechanical, not emotional. The emotion is already done. This is the decision architecture.

### Price Presentation Psychology

**Anchor High, Reveal Low:** Always present a higher reference price before the actual price. "The Accelerator sells for $97 on our website. Today: $27." The gap between anchor and actual creates perceived value.

**Per-Day Breakdown:** Divide the price by 30 (or relevant usage period). "$27 = less than $1 a day." Small daily amounts bypass the "is this worth it?" calculation.

**Comparison Anchor:** Compare to a familiar daily expense. "Less than your morning coffee." "Less than a single golf lesson." Reframes the price as trivially small.

**Value Stack > Price:** Total perceived value of bonuses + main product should exceed the price by 3-5x minimum. "$97 total value for just $27" = 3.6x value ratio.

### The Binary Choice Architecture

The CTA is a decision, not a persuasion device:
- **YES option:** Clear, specific, includes product name and price. "Yes, Add The Metabolic Accelerator To My Order — Just $27"
- **NO option:** Clean, respectful, no guilt. "No thanks, I'll pass on this special offer" or "No thanks, I'll continue with just the [FE product name]"

**Forbidden NO options:**
- "No, I don't want to [desirable outcome]" — guilt manipulation
- "No, I'm fine being [undesirable state]" — shame manipulation
- "No, I'll pay full price later" — false urgency manipulation

---

## CAIRO SECTION PROPORTIONS (By Position)

| Position | C | A | I | R | O | Total |
|----------|---|---|---|---|---|-------|
| Upsell 1 (standard) | 50-100w | 150-300w | 75-150w | 150-400w | 150-300w | 575-1250w |
| Upsell 1 (long) | 75-100w | 200-400w | 100-200w | 250-500w | 200-400w | 825-1600w |
| Upsell 2 | 50-75w | 100-200w | 50-100w | 100-250w | 100-200w | 400-825w |

Note: Upsell 2 is shorter because buyer has already seen one upsell page. Diminishing patience. Get to the point faster.

---

## FORMAT SPECIFICATIONS

### Video Script Format

```
[VIDEO OPENS — Presenter on camera, warm smile, congratulatory tone]

PRESENTER: "Congratulations — you just made one of the smartest..."

[CUT TO: B-roll of [product visual]]

PRESENTER (V.O.): "Picture this: It's 30 days from now..."

[CUT TO: Presenter, leaning in, conspiratorial tone]

PRESENTER: "Now, there's one thing our most successful..."

[TEXT ON SCREEN: "[Upsell Product Name]"]

[CUT TO: Product demo / value stack visual]

[CTA SCREEN: Two buttons — YES / NO THANKS]
```

### Text Page Format

```
# [Congratulatory Headline]

[Congratulate paragraph]

## [Amplify sub-headline — future pacing]

[Amplify paragraphs with dimensionalized benefits]

## [Intrigue sub-headline — insider hook]

[Intrigue paragraph creating insider feeling]

## [Reason sub-headline — why this exists]

[Reason paragraphs with short story]

---

## [Offer headline — special pricing]

[Product + bonus stack + price presentation + guarantee]

[CTA BUTTON: "Yes, Add [Product] To My Order — Just $[Price]"]

[Text link: "No thanks, I'll pass on this special offer"]
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-26 | Initial creation — full architecture, 5 layers, 15 microskills, CAIRO structure, output schema, specimen examples, teaching foundations, format specs |
