# U0 — Upsell Strategist ANTI-DEGRADATION.md

**Version:** 1.0
**Skill:** U0 — Upsell Strategist
**Mandatory Read:** YES — before ANY execution of U0

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: U0-UPSELL-STRATEGIST-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Invent gate statuses, skip congruence mapping, or write copy in U0.
```

**Write this declaration to your first output file before executing any microskill.**

---

## FAILURE MODE TABLE

| # | Failure Mode | Detection | Response | Escalation |
|---|-------------|-----------|----------|------------|
| F1 | Copy leaks into strategy | U0 output contains headlines, body copy, CTAs | Delete copy. Re-execute affected microskill. | If persistent: isolate strategic analysis from creative impulse. |
| F2 | Pricing cascade violated | Bump >30% FE, upsell >150% FE, or downsell >50% upsell | Return to 1.3 (Pricing Cascade Designer). Re-price. | Flag to human if no product fits the price range. |
| F3 | Congruence thread broken | Upsell position doesn't reference front-end mechanism by name | Return to 2.1 (Congruence Thread Mapper). Re-map. | If mechanism mismatch is fundamental, flag to human. |
| F4 | Single-position strategy | Only one upsell position defined | Return to 1.2 (Product Mapper). Minimum 2 positions. | If client truly has only 1 product, document limitation. |
| F5 | Auto-approved strategy | GATE_2 marked PASS without human input | HALT. GATE_2 is HUMAN_SELECT. | Cannot proceed without human approval. |
| F6 | Product invention | Strategy references products that don't exist | Delete invented products. Map only real products. | Flag product gaps to human. |
| F7 | Mode confusion | Mode A inputs mixed with Mode B assumptions | Re-determine mode. Re-execute Layer 0. | — |
| F8 | Synthesized output | Multiple microskills combined into one file | Delete. Re-execute with per-microskill output. | — |

---

## FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)

| Rationalization | Why Invalid |
|-----------------|-------------|
| "The strategy includes some sample copy for illustration" | U0 does NOT write copy. Ever. Strategic specs only. |
| "One position is sufficient for this offer" | Minimum 2 positions. That's the rule. |
| "The pricing is close enough to the cascade rules" | Pricing rules are exact ranges. 31% bump = FAIL. |
| "The mechanism reference is implied" | Mechanism must be referenced BY NAME. Implied ≠ stated. |
| "The strategy is straightforward, no need for human approval" | GATE_2 is HUMAN_SELECT. Always. |
| "I'll combine the analysis into one comprehensive document" | Per-microskill output. Every microskill → its own file. |

---

## BINARY GATE ENFORCEMENT

Gate status can ONLY be `PASS` or `FAIL`. Any other value means the gate file should NOT exist.

| Gate | PASS Condition | FAIL Condition |
|------|---------------|----------------|
| GATE_0 | Mode determined + required inputs loaded | Missing required inputs for declared mode |
| GATE_1 | All positions mapped + pricing valid + products real | Any position unmapped OR pricing violation OR invented product |
| GATE_2 | Human explicitly approves strategy | Human rejects OR no response yet |
| GATE_3 | Output schema complete + all validations pass | Missing fields OR cascade violation OR congruence gap |

---

## PER-MICROSKILL OUTPUT TABLE

| Microskill | Output File | Contents |
|-----------|------------|----------|
| 0.1 Upstream Loader | `layer-0/0.1-upstream-context.md` | Loaded packages, extracted data points, mode determination |
| 0.2 Brief Parser | `layer-0/0.2-brief-context.md` | Parsed brief data, identified gaps, mode B flag |
| 0.3 Input Validator | `layer-0/0.3-input-validation.md` | Validation results, completeness assessment, GATE_0 status |
| 1.1 Offer Stack Analyzer | `layer-1/1.1-offer-analysis.md` | Decomposed offer: products, prices, bonuses, guarantee, value equation |
| 1.2 Upsell Product Mapper | `layer-1/1.2-product-mapping.md` | Products assigned to positions with congruence rationale |
| 1.3 Pricing Cascade Designer | `layer-1/1.3-pricing-cascade.md` | Price per position, ratios validated, cascade table |
| 1.4 Position Sequence Optimizer | `layer-1/1.4-sequence-order.md` | Final sequence order with rationale |
| 2.1 Congruence Thread Mapper | `layer-2/2.1-congruence-map.md` | Mechanism name, root cause, promise threading across all positions |
| 2.2 Narrative Arc Designer | `layer-2/2.2-narrative-arc.md` | Emotional/logical arc: purchase → bump → upsell → downsell → thank you |
| 2.3 Handoff Spec Generator | `layer-2/2.3-handoff-specs.md` | Concrete specs for U1, U2, U3 with all required context |
| 4.1 Strategy Validator | `layer-4/4.1-validation-results.md` | All validations: pricing, congruence, position coverage |
| 4.2 Output Packager | `upsell-strategy.yaml` + `UPSELL-STRATEGY-SUMMARY.md` | Final packaged output |

---

## PROJECT INFRASTRUCTURE

```
[project-dir]/U0-upsell-strategist/
├── layer-0/
│   ├── 0.1-upstream-context.md
│   ├── 0.2-brief-context.md (Mode B only)
│   └── 0.3-input-validation.md
├── layer-1/
│   ├── 1.1-offer-analysis.md
│   ├── 1.2-product-mapping.md
│   ├── 1.3-pricing-cascade.md
│   └── 1.4-sequence-order.md
├── layer-2/
│   ├── 2.1-congruence-map.md
│   ├── 2.2-narrative-arc.md
│   └── 2.3-handoff-specs.md
├── layer-4/
│   ├── 4.1-validation-results.md
│   └── 4.2-output-packager.md (writes final files)
├── checkpoints/
│   ├── GATE_0_VERIFIED.yaml
│   ├── GATE_1_VERIFIED.yaml
│   ├── GATE_2_HUMAN_APPROVED.yaml
│   └── GATE_3_VERIFIED.yaml
├── upsell-strategy.yaml
└── UPSELL-STRATEGY-SUMMARY.md
```

---

## STALE ARTIFACT CLEANUP

Before starting execution, check for and DELETE:
- Any `GATE_*.yaml` files from previous runs
- Any `upsell-strategy.yaml` from previous runs
- Any microskill output files from previous runs

Fresh start every time. Stale artifacts from failed runs are dangerous.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-26 | Initial creation — 8 failure modes, 6 forbidden rationalizations, per-microskill output table |
