# U2 — 1-Click Upsell Writer ANTI-DEGRADATION.md

**Version:** 1.0
**Skill:** U2 — 1-Click Upsell Writer
**Mandatory Read:** YES — before ANY execution of U2

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: U2-UPSELL-WRITER-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL: Write post-purchase upsell copy using CAIRO structure — NOT sales page copy.
I WILL NOT: Invent gate statuses, write PAS structures, break congruence, exceed 2000 words,
            use guilt-trip CTAs, or skip CAIRO sections.
```

**Write this declaration to your first output file before executing any microskill.**

---

## FAILURE MODE TABLE

| # | Failure Mode | Detection | Response | Escalation |
|---|-------------|-----------|----------|------------|
| F1 | **Mini Sales Page** — Upsell reads like a front-end sales page with full PAS (Problem-Agitation-Solution) structure | Scan for: problem setup > 100 words, agitation language ("struggling," "frustrated," "tired of"), solution reveal as new concept rather than extension | Delete draft. Re-execute 2.1 (CAIRO Draft Generator) with explicit instruction: buyer already bought. Use CAIRO: Congratulate → Amplify → Intrigue → Reason → Offer. | If PAS persists after 2 regenerations, flag to human. Root cause may be insufficient congruence data from U0. |
| F2 | **Congruence Break** — Upsell introduces new mechanism name, new root cause framing, or replaces the FE promise | Scan for: mechanism name different from FE, root cause language paraphrased or replaced, promise that contradicts or replaces FE promise | Return to 1.1 (Congruence Mapper). Re-extract exact FE language. Regenerate with verbatim mechanism name and root cause phrasing. | If mechanism mismatch is structural (upsell product genuinely unrelated to FE), escalate to U0 for re-positioning. |
| F3 | **Verbose Upsell** — Draft exceeds 2000 words. Law 3 violation: "Speed kills." | Word count check at GATE_2 and GATE_3. Also check individual CAIRO section proportions against targets. | Identify which CAIRO section is bloated. Trim to proportion targets: C(50-100w), A(100-300w), I(50-150w), R(100-400w), O(100-300w). Cut proof elements to max 2. | If content genuinely requires >2000w, the product may be too complex for a 1-click upsell. Flag to U0 for repositioning. |
| F4 | **Missing CAIRO Section** — One or more of the 5 CAIRO sections is absent or collapsed into another section | Structural scan: verify 5 distinct sections with section headers or clear transitions. Check Intrigue (most commonly skipped) and Congratulate (most commonly rushed). | Re-execute 2.1 with section-by-section generation. Each CAIRO section must be identifiable as a distinct block with its own function. | If section is absent because product doesn't warrant it (e.g., no story for Reason), flag to human. Never silently skip. |
| F5 | **Pre-Purchase Tone** — Upsell uses urgency, fear, scarcity, or persuasion language appropriate for a front-end sales page, not a post-purchase page | Scan for: "limited time," "act now," "don't miss out," "imagine your problem getting worse," countdown timers, artificial scarcity, fear-of-loss framing | Replace with post-purchase tone: celebration, logic, extension. "You already made a great decision. This makes it even better." Rewrite flagged sections with warmth, not urgency. | If tone persists, the upstream positioning may be framing the upsell as a separate sale. Escalate to U0. |
| F6 | **No Price Anchoring** — Upsell price presented without reference to a higher value anchor | Scan Offer section for: standalone price without comparison, no "worth $X / yours for $Y" structure, no per-day breakdown | Return to 2.3 (Price Presentation Builder). Mandatory elements: value anchor > actual price > per-day breakdown > comparison anchor. | — |
| F7 | **Guilt-Trip CTA** — The "No" option in the binary choice uses manipulation, guilt, or shame | Scan CTA for: "No, I don't want to [desirable outcome]," "No, I'm fine being [undesirable state]," any emotional manipulation in the decline option | Replace with clean decline: "No thanks, I'll pass on this special offer" or "No thanks, I'll continue with just the [FE product name]." | — |
| F8 | **Proof Cascade** — Upsell contains 3+ proof elements (testimonials, studies, authority endorsements) creating a proof-heavy page | Count proof elements: testimonials, studies cited, authority endorsements, specific result claims. Threshold: max 2. | Remove excess proof elements. Select the 2 strongest (per 1.3 Proof Inventory criteria). Redistribute word count to Amplify or Reason sections. | — |
| F9 | **Synthesized Output** — Multiple microskills combined into one output file instead of per-microskill dedicated files | Check output directory: each microskill must have its own file. Any "combined analysis" or "comprehensive output" file = violation. | Delete combined file. Re-execute each microskill with dedicated output file. | — |
| F10 | **Mechanism Not Named** — Upsell uses generic references ("this system," "this breakthrough," "this method") instead of the exact mechanism name from the front-end | Scan for generic mechanism references. Cross-reference against mechanism name in U0 handoff or mechanism-package.json. Must appear in Congratulate section AND at least once more. | Replace all generic references with exact mechanism name. If mechanism name not available, HALT — cannot write congruent upsell without it. | Request mechanism-package.json from Skill 04 or FE mechanism name from human. |
| F11 | **Root Cause Paraphrased** — Upsell uses different language for the root cause than the front-end, breaking the linguistic congruence thread | Compare root cause language in upsell against exact FE phrasing from U0 handoff. "Hormonal disruption" vs "hormone issues" = paraphrase = FAIL. | Replace paraphrased root cause with verbatim FE language. Layer 1.1 congruence map should have exact phrasing — re-reference it. | — |
| F12 | **No Guarantee** — Upsell page has no risk reversal (no guarantee mentioned) | Scan Offer section for guarantee language. Must either mirror FE guarantee or introduce upsell-specific guarantee. | Add guarantee. Default: "Same [X]-day money-back guarantee applies." If FE guarantee terms unknown, flag to human. | — |
| F13 | **Product/Bonus Invention** — Upsell includes bonuses or product features not in the U0 handoff spec or project brief | Cross-reference all product claims and bonus items against U0 handoff spec. Any item not in spec = invented. | Remove invented items. If bonus stack is empty without them, generate upsell without bonus stack and flag gap to human. | — |
| F14 | **Inverted Pricing** — Upsell price > 150% of FE price, violating the pricing cascade rule | Check: upsell price / FE price. Must be 50-150%. Below 50% = undervaluing. Above 150% = inverted anchor. | Return to U0 pricing cascade. If U0 approved this price, it's a U0 error — escalate. If Mode B, flag to human. | Escalate to U0 if pricing cascade was approved with this ratio. |

---

## FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)

| Rationalization | Why Invalid |
|-----------------|-------------|
| "The buyer needs to understand the problem before seeing the upsell" | NO. They already bought the solution to the problem. Re-explaining the problem is PAS structure — a front-end sales page pattern. Use CAIRO: congratulate their purchase, amplify benefits, intrigue, reason, offer. |
| "The upsell product has a different mechanism, so I need to introduce it" | NO. Congruence is Law 2. If the upsell has a genuinely different mechanism, the STRATEGY is wrong (U0's job). U2 extends the FE mechanism, never replaces it. Escalate to U0. |
| "The copy is 2,100 words but it needs all of it" | NO. Law 3: Speed kills. 2000 words is a hard ceiling. If you can't say it in 2000 words, the upsell is scoped too broadly. Trim or escalate to U0 for re-scoping. |
| "I'll skip the Intrigue section because the transition is smoother without it" | NO. CAIRO has 5 sections. All 5 present. Always. The Intrigue section creates the insider bridge between celebrating the FE purchase and introducing the upsell. Without it, the transition feels abrupt and salesy. |
| "A little urgency will improve conversion" | NO. Post-purchase tone. The buyer is in momentum, not in a buying trance. Urgency fights the momentum. Logic and extension ride it. "This makes your purchase work better" > "Don't miss this limited offer." |
| "The 'No' option should remind them what they're missing" | NO. Clean binary. "No thanks, I'll pass" is sufficient. Guilt-trip CTAs damage the buyer relationship and brand trust. The buyer just gave you money — respect them. |
| "I'll combine the Layer 1 analysis into one comprehensive document for efficiency" | NO. Per-microskill output. Every microskill produces its own file. Combining = synthesis trap. Efficiency is not an excuse for skipping structural requirements. |
| "The congruence is implied — the buyer will connect it" | NO. Congruence must be EXPLICIT. Mechanism named. Root cause language verbatim. Promise extended with clear connection. "Implied" means you didn't do the work. |
| "Two proof elements aren't enough to be convincing" | NO. This is a post-purchase upsell, not a front-end sales page. The buyer already trusts you (they just paid). Heavy proof signals distrust of that trust. 1-2 elements is sufficient and appropriate. |
| "I'll write the full draft first and then figure out the CAIRO sections" | NO. CAIRO structure guides generation, not post-hoc labeling. Plan section proportions (Layer 1.4), then generate section by section (Layer 2.1). Reverse-engineering CAIRO onto freeform copy produces PAS-shaped content with CAIRO labels. |

---

## BINARY GATE ENFORCEMENT

Gate status can ONLY be `PASS` or `FAIL`. Any other value means the gate file should NOT exist.

| Gate | PASS Condition | FAIL Condition |
|------|---------------|----------------|
| GATE_0 | Mode determined + required inputs loaded + format classified | Missing required inputs (Mode A: U0 handoff OR mechanism package. Mode B: FE mechanism name OR upsell product OR FE price) OR format not classified |
| GATE_1 | Congruence thread mapped with exact language + position analyzed + 1-2 proof elements selected + CAIRO variant chosen | Mechanism name missing OR root cause paraphrased OR >2 proof elements OR no CAIRO variant selected |
| GATE_2 | Complete CAIRO draft 500-2000 words + all 5 sections present + mechanism named + root cause language appears + post-purchase tone + price presentation complete + binary choice present | Word count outside 500-2000 OR any CAIRO section missing OR mechanism not named OR PAS structure detected OR no binary choice |
| GATE_2.5 | Human explicitly selects winning upsell page from Arena | No selection made OR all candidates below 8.0 threshold (follow all-below-threshold protocol) |
| GATE_3 | All 7 validation checks pass + congruence score >= 7.0 + output packaged + downstream handoff present | Any validation check fails OR congruence score < 7.0 OR output missing metadata OR no downstream handoff for U3 |

---

## PER-MICROSKILL OUTPUT TABLE

| Microskill | Output File | Contents |
|-----------|------------|----------|
| 0.1 Input Loader | `layer-0/0.1-input-context.md` | Loaded packages, extracted data: mechanism name, root cause language, FE price, upsell product, upsell price, format, mode determination |
| 0.2 Specimen Calibrator | `layer-0/0.2-specimen-calibration.md` | Matched specimens, extracted CAIRO proportions, tone patterns, price presentation patterns, CTA language |
| 0.2.7 Persona Voice Loader | `layer-0/0.2.7-persona-voices.md` | Loaded persona specimens matched to vertical + format, voice loading report |
| 0.3 Format Classifier | `layer-0/0.3-format-classification.md` | Format decision (video/text), word count target, rationale |
| 1.1 Congruence Mapper | `layer-1/1.1-congruence-map.md` | Exact mechanism name, exact root cause language, exact promise phrasing, extension logic, congruence bridge statement |
| 1.2 Position Analyzer | `layer-1/1.2-position-analysis.md` | Position in sequence, buyer psychological state, CAIRO proportion recommendations, what precedes/follows |
| 1.3 Proof Inventory | `layer-1/1.3-proof-inventory.md` | Selected 1-2 proof elements with source, type, placement recommendation |
| 1.4 Structure Selector | `layer-1/1.4-structure-selection.md` | CAIRO variant, word allocation per section, opening pattern, transition mechanics |
| 2.1 CAIRO Draft Generator | `layer-2/2.1-cairo-draft.md` | Full 500-2000 word upsell page with 5 CAIRO sections |
| 2.2 Bonus Stack Builder | `layer-2/2.2-bonus-stack.md` | Max 3 bonuses: name, value prop, perceived value. Total perceived value calculation. |
| 2.3 Price Presentation Builder | `layer-2/2.3-price-presentation.md` | Value anchor, actual price, per-day breakdown, comparison anchor, guarantee, binary CTA |
| 4.1 Upsell Validator | `layer-4/4.1-validation-results.md` | 7-gate validation: word count, CAIRO sections, congruence (2 checks), tone, price, binary choice. Pass/fail per gate with evidence. |
| 4.2 Congruence Score | `layer-4/4.2-congruence-score.md` | 1-10 score with sub-scores: mechanism match, root cause preservation, promise extension, register consistency, emotional continuity |
| 4.3 Output Packager | `upsell-page-draft.md` | Final packaged upsell page with metadata header + downstream handoff for U3 |

---

## PROJECT INFRASTRUCTURE

```
[project-dir]/U2-upsell-writer/
├── layer-0/
│   ├── 0.1-input-context.md
│   ├── 0.2-specimen-calibration.md
│   ├── 0.2.7-persona-voices.md
│   └── 0.3-format-classification.md
├── layer-1/
│   ├── 1.1-congruence-map.md
│   ├── 1.2-position-analysis.md
│   ├── 1.3-proof-inventory.md
│   └── 1.4-structure-selection.md
├── layer-2/
│   ├── 2.1-cairo-draft.md
│   ├── 2.2-bonus-stack.md
│   └── 2.3-price-presentation.md
├── arena/
│   ├── round-1/
│   │   ├── round-1-congruence-purist.md
│   │   ├── round-1-story-extender.md
│   │   ├── round-1-proof-stacker.md
│   │   ├── round-1-urgency-driver.md
│   │   ├── round-1-value-calculator.md
│   │   ├── round-1-problem-revealer.md
│   │   ├── round-1-speed-optimizer.md
│   │   ├── round-1-critiques.md
│   │   ├── round-1-scores.md
│   │   └── round-1-learning-brief.md
│   ├── round-2/
│   │   └── [same structure]
│   ├── round-3/
│   │   └── [same structure]
│   └── synthesis/
│       ├── hybrid-a.md
│       ├── hybrid-b.md
│       ├── hybrid-c.md
│       └── synthesis-scores.md
├── layer-4/
│   ├── 4.1-validation-results.md
│   ├── 4.2-congruence-score.md
│   └── 4.3-output-packager.md
├── checkpoints/
│   ├── GATE_0_VERIFIED.yaml
│   ├── GATE_1_VERIFIED.yaml
│   ├── GATE_2_VERIFIED.yaml
│   ├── GATE_2.5_HUMAN_SELECTED.yaml
│   └── GATE_3_VERIFIED.yaml
└── upsell-page-draft.md
```

---

## STALE ARTIFACT CLEANUP

Before starting execution, check for and DELETE:
- Any `GATE_*.yaml` files from previous runs
- Any `upsell-page-draft.md` from previous runs
- Any microskill output files from previous runs
- Any `arena/` directory contents from previous runs

Fresh start every time. Stale artifacts from failed runs are dangerous — especially stale Arena outputs that may be confused with current-run candidates.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-26 | Initial creation — 14 failure modes, 10 forbidden rationalizations, 5 gates, 15 per-microskill outputs, project infrastructure |
