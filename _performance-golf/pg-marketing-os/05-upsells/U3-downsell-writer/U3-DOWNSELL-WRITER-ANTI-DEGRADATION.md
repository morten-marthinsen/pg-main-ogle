# U3 — Downsell Writer ANTI-DEGRADATION.md

**Version:** 1.0
**Skill:** U3 — Downsell Writer
**Mandatory Read:** YES — before ANY execution of U3

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: U3-DOWNSELL-WRITER-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL: Write post-decline downsell copy using ARO structure — NOT upsell CAIRO, NOT sales page PAS.
I WILL NOT: Invent gate statuses, write CAIRO/PAS structures, break congruence, exceed 1000 words,
            use guilt/pressure in Acknowledge, treat downsell as "cheaper upsell", or skip ARO sections.
```

**Write this declaration to your first output file before executing any microskill.**

---

## FAILURE MODE TABLE

| # | Failure Mode | Detection | Response | Escalation |
|---|-------------|-----------|----------|------------|
| F1 | **Second Sales Pitch** — Downsell reads like a second upsell attempt or a mini sales page with full PAS structure | Scan for: problem re-statement, agitation language, solution reveal as new concept, CAIRO structure instead of ARO, congratulatory opening instead of acknowledgment | Delete draft. Re-execute 2.1 (ARO Draft Generator) with explicit instruction: buyer said NO. Use ARO: Acknowledge → Reframe → Offer. NOT CAIRO. NOT PAS. | If PAS/CAIRO persists after 2 regenerations, flag to human. |
| F2 | **Undifferentiated Discount** — Downsell is just the upsell at a lower price, same angle, same copy shortened. Pattern 4 from UPSELL-ENGINE.md. | Scan for: same value proposition as upsell, same angle rephrased shorter, no reframe type identifiable, "same product for less" framing | Return to 1.1 (Reframe Selector). Must select an explicit reframe type (Core Extract / Payment Plan / Lite Version / Different Format). Regenerate with genuinely different angle. | If product genuinely cannot be reframed, escalate to U0 for repositioning. |
| F3 | **Guilt/Pressure in Acknowledge** — The Acknowledge section uses guilt, pressure, FOMO, or manipulation to make the buyer regret declining | Scan for: "you're missing out," "most people regret," "last chance," "before you go," "don't miss," "are you sure," shame language, regret language, loss-framing | Rewrite Acknowledge section with pure validation: "I completely understand," "absolutely nothing wrong with," "that's a perfectly fine choice." Zero manipulation. | — |
| F4 | **Congruence Break** — Downsell introduces new mechanism, new root cause, or replaces the FE promise | Same as U2 F2 — scan for mechanism name different from FE, root cause paraphrased/replaced, promise contradicting FE | Return to 1.2 (Congruence Mapper). Re-extract exact FE language. Regenerate. | If congruence break is structural, escalate to U0. |
| F5 | **Verbose Downsell** — Draft exceeds 1000 words. Law 3 violation. Buyer patience is at its LOWEST at downsell. | Word count check at GATE_2 and GATE_3 | Trim ARO sections to proportion targets. Downsell should be SIMPLER than upsell, not just shorter. | If content genuinely requires >1000w, the downsell product is scoped too broadly. Escalate to U0. |
| F6 | **Missing ARO Section** — One of the 3 ARO sections absent or collapsed | Structural scan: verify 3 distinct sections. Check Acknowledge (most commonly rushed/skipped). | Re-execute 2.1 with section-by-section generation. | Never silently skip a section. |
| F7 | **CAIRO Structure Used** — Agent generates CAIRO (Congratulate, Amplify, Intrigue, Reason, Offer) instead of ARO | Scan for: Congratulate section, Amplify section, Intrigue section. Any CAIRO section = wrong structure. | Delete and regenerate with ARO instruction. Downsells Acknowledge a "no", they don't Congratulate a "yes." | If persistent, the agent may be confused with U2 — re-read U3 AGENT.md. |
| F8 | **Inverted Pricing** — Downsell price >= declined upsell price | Compare downsell price against declined upsell price. Must be LOWER. | Pricing cascade broken. Cannot fix locally. | Escalate to U0. |
| F9 | **Synthesized Output** — Multiple microskills combined into one file | Check output directory: each microskill must have its own file. | Delete combined file. Re-execute with dedicated output files. | — |
| F10 | **Mechanism Not Named** — Generic references instead of exact mechanism name | Same as U2 F10. Must appear in downsell. | Replace generic references. If mechanism name unavailable, HALT. | — |
| F11 | **Over-Proving** — 2+ proof elements in downsell (limit is 1 for downsell, not 2 like upsell) | Count proof elements. Threshold: max 1. | Remove excess proof. Keep the single strongest. | — |
| F12 | **Guilt-Trip CTA** — NO option uses manipulation | Same as U2 F7. Clean decline only. | Replace with: "No thanks, I'll continue with just my original purchase." | — |

---

## FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)

| Rationalization | Why Invalid |
|-----------------|-------------|
| "The buyer needs to understand why they should reconsider" | NO. They made their decision. The downsell REFRAMES the offer, it doesn't re-argue for it. Acknowledge, don't persuade. |
| "A congratulatory opening feels natural here too" | NO. The buyer said NO. You don't congratulate a no. You ACKNOWLEDGE it. CAIRO is for post-purchase (U2). ARO is for post-decline (U3). Different psychology. |
| "Making the downsell the same product at a lower price is the simplest approach" | NO. Pattern 4 violation: "The Undifferentiated Downsell." Downsells REFRAME. Different angle, different entry point. If you can't reframe, escalate to U0. |
| "Adding urgency will improve conversion on the downsell" | NO. The buyer is at maximum decision fatigue. Urgency adds pressure, not motivation. Warmth and simplicity convert at this point, not urgency. |
| "The copy is 1,100 words but the reframe needs it" | NO. Law 3. 1000 words is the ceiling. If the reframe needs 1100 words, the reframe is too complex for a downsell. Simplify or escalate. |
| "A little guilt won't hurt — it's just a nudge" | NO. The Acknowledge section is the most trust-sensitive copy in the funnel. Any guilt DESTROYS the trust built by the FE purchase. Zero means zero. |
| "I'll combine the analysis into one document" | NO. Per-microskill output. Every microskill produces its own file. |
| "Two proof elements will be more convincing" | NO. Downsell gets 1 proof element max. Even less than upsell. Simplicity is the point. |
| "The buyer still needs to be sold on the mechanism" | NO. They BOUGHT the FE. They already bought the mechanism. The downsell reframes the OFFER, not the mechanism. |

---

## BINARY GATE ENFORCEMENT

Gate status can ONLY be `PASS` or `FAIL`. Any other value means the gate file should NOT exist.

| Gate | PASS Condition | FAIL Condition |
|------|---------------|----------------|
| GATE_0 | Mode determined + required inputs loaded | Missing required inputs (Mode A: U0 handoff OR U2 downstream handoff OR mechanism package. Mode B: declined upsell product/price/angle OR downsell product/price OR FE mechanism name) |
| GATE_1 | Reframe type selected (NOT "same thing cheaper") + congruence thread mapped with exact language | No reframe type OR reframe is just discount OR mechanism name missing OR root cause paraphrased |
| GATE_2 | Complete ARO draft 300-1000 words + all 3 sections present + mechanism named + reframe is genuine + zero guilt in Acknowledge + price < declined upsell + binary choice clean | Word count outside 300-1000 OR any ARO section missing OR mechanism not named OR reframe is just "cheaper" OR guilt/pressure detected OR price >= upsell OR no binary choice |
| GATE_2.5 | Human explicitly selects winning downsell page from Arena | No selection made OR all below 8.0 threshold |
| GATE_3 | All 8 validation checks pass + output packaged + downstream handoff present | Any check fails OR output missing metadata OR no downstream handoff for U4 |

---

## PER-MICROSKILL OUTPUT TABLE

| Microskill | Output File | Contents |
|-----------|------------|----------|
| 0.1 Input Loader | `layer-0/0.1-input-context.md` | Loaded packages, extracted data: mechanism name, root cause language, FE price, declined upsell product/price/angle, downsell product/price, reframe suggestions, mode determination |
| 0.2 Specimen Calibrator | `layer-0/0.2-specimen-calibration.md` | Specimen gap flagged, adapted patterns from U2 specimens + ARO structure, tone patterns, reframe patterns |
| 1.1 Reframe Selector | `layer-1/1.1-reframe-selection.md` | Selected reframe type with rationale, reframe angle statement, why this type fits this product/situation |
| 1.2 Congruence Mapper | `layer-1/1.2-congruence-map.md` | Exact mechanism name, exact root cause language, exact promise phrasing, congruence maintenance strategy for downsell angle |
| 2.1 ARO Draft Generator | `layer-2/2.1-aro-draft.md` | Full 300-1000 word downsell page with 3 ARO sections |
| 2.2 Price Presentation Builder | `layer-2/2.2-price-presentation.md` | Declined upsell anchor, downsell price, per-day breakdown, savings framing, guarantee, binary CTA |
| 4.1 Downsell Validator | `layer-4/4.1-validation-results.md` | 8-gate validation: word count, ARO sections, reframe quality, congruence (2 checks), tone/guilt, pricing, binary choice. Pass/fail per gate. |
| 4.2 Output Packager | `downsell-page-draft.md` | Final packaged downsell page with metadata header + downstream handoff for U4 |

---

## PROJECT INFRASTRUCTURE

```
[project-dir]/U3-downsell-writer/
├── layer-0/
│   ├── 0.1-input-context.md
│   └── 0.2-specimen-calibration.md
├── layer-1/
│   ├── 1.1-reframe-selection.md
│   └── 1.2-congruence-map.md
├── layer-2/
│   ├── 2.1-aro-draft.md
│   └── 2.2-price-presentation.md
├── arena/
│   ├── round-1/
│   │   ├── round-1-empathy-expert.md
│   │   ├── round-1-core-extractor.md
│   │   ├── round-1-angle-shifter.md
│   │   ├── round-1-value-calculator.md
│   │   ├── round-1-payment-architect.md
│   │   ├── round-1-format-flipper.md
│   │   ├── round-1-gentle-closer.md
│   │   ├── round-1-critiques.md
│   │   ├── round-1-scores.md
│   │   └── round-1-learning-brief.md
│   ├── round-2/
│   │   └── [same structure]
│   ├── audience-evaluation/
│   │   └── [same structure]
│   └── synthesis/
│       ├── hybrid-a.md
│       ├── hybrid-b.md
│       ├── hybrid-c.md
│       └── synthesis-scores.md
├── layer-4/
│   ├── 4.1-validation-results.md
│   └── 4.2-output-packager.md
├── checkpoints/
│   ├── GATE_0_VERIFIED.yaml
│   ├── GATE_1_VERIFIED.yaml
│   ├── GATE_2_VERIFIED.yaml
│   ├── GATE_2.5_HUMAN_SELECTED.yaml
│   └── GATE_3_VERIFIED.yaml
└── downsell-page-draft.md
```

---

## STALE ARTIFACT CLEANUP

Before starting execution, check for and DELETE:
- Any `GATE_*.yaml` files from previous runs
- Any `downsell-page-draft.md` from previous runs
- Any microskill output files from previous runs
- Any `arena/` directory contents from previous runs

---

## KNOWN LIMITATIONS

### Specimen Gap (Severity: MEDIUM)
Only 1 downsell specimen (US-16) exists in the upsell specimen vault, and the FILE IS MISSING. The specimen calibrator (0.2) works from:
1. Index metadata for US-16
2. U2 specimen patterns adapted for shorter/softer copy
3. ARO structure defined in UPSELL-ENGINE.md

This means U3 has NO verbatim downsell specimen to calibrate against. Quality depends entirely on structural enforcement (ARO, word counts, reframe types) + adapted upsell patterns. When downsell specimens become available, they should be added to the vault and 0.2 updated.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-27 | Initial creation — 12 failure modes, 9 forbidden rationalizations, 5 gates, 8 per-microskill outputs, project infrastructure, known limitations |
