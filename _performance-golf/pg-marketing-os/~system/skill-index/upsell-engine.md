# Skill Index: Upsell Engine (U0-U5)
**Source:** Extracted from CLAUDE-SKILL-INDEX.md. Load ONLY this file for Upsell Engine skills.

---

## Upsell Engine (U0-U5)

**Master Document:** `05-upsells/UPSELL-ENGINE.md`

### 6-Skill Architecture

| Skill | Name | Arena? | Status |
|-------|------|--------|--------|
| U0 | Upsell Strategist | No | BUILT |
| U1 | Order Bump Writer | No (too short) | BUILT |
| U2 | 1-Click Upsell Writer | Yes (`generative_full_draft`) | BUILT |
| U3 | Downsell Writer | Yes (`generative_full_draft`) | BUILT |
| U4 | Upsell Sequence Assembler | No | BUILT |
| U5 | Upsell Editorial | Yes (`editorial_revision`) | BUILT |

### 5 Upsell Laws

1. The upsell is NOT a sales page (post-purchase psychology)
2. Congruence is everything (extends front-end purchase logic)
3. Speed kills in a good way (50-150w bumps, 500-2000w upsells, 300-1000w downsells)
4. Yes-or-No architecture, not persuasion architecture
5. Descending commitment, ascending value

### Dependency Chain

```
Skill 07 (Offer) → U0 (Strategy) → U1 (Bump) / U2 (Upsell) → U3 (Downsell)
U1 + U2 + U3 → U4 (Assembler) → U5 (Editorial)
```

### U0 Protocol (Upsell Strategist)

- **Output:** `upsell-strategy.yaml` + `UPSELL-STRATEGY-SUMMARY.md`
- **Modes:** Mode A (downstream from Skills 01-09) or Mode B (standalone brief)
- **4 Layers:** 0 (Context Loading) → 1 (Offer Analysis + Position Mapping) → 2 (Congruence + Narrative) → 4 (Validation + Output)
- **11 microskills** with per-microskill output
- **GATE_2 is HUMAN_SELECT** — strategy requires human approval before U1-U3 execute
- **Pricing cascade rules:** Bump 10-30% FE, Upsell 50-150% FE, Downsell 30-50% of upsell
- **Congruence enforcement:** Mechanism name must appear by exact name in every position

### U1 Protocol (Order Bump Writer)

- **Output:** `order-bump-copy.md` (5-7 validated variants)
- **Modes:** Mode A (downstream from U0) or Mode B (standalone brief)
- **3 Layers:** 0 (Loading + Calibration) → 1 (Generation + Variants) → 4 (Validation + Packaging)
- **6 microskills** with per-microskill output
- **No Arena** — 50-150 words too short for meaningful competition; variant generator produces diversity
- **Model:** haiku (L0) → sonnet (L1 generation) → haiku (L4 validation)
- **3-element structure:** (1) What you're adding, (2) Why it matters NOW, (3) Price anchor
- **4 template types:** Completeness, Accelerator, Insurance, Exclusive
- **Hard constraints:** 150 words max, no story structure, no proof cascade, no PAS

### U2 Protocol (1-Click Upsell Writer)

- **Output:** `upsell-page-draft.md` (500-2000w, CAIRO structure)
- **Modes:** Mode A (downstream from U0 + Skill 04) or Mode B (standalone brief)
- **5 Layers:** 0 (Foundation) → 1 (Analysis) → 2 (CAIRO Draft) → 2.5 (Arena) → 4 (Validation)
- **14 microskills** with per-microskill output + Arena
- **Arena:** `generative_full_draft` mode with 7 upsell-specific competitors
- **CAIRO structure:** Congratulate → Amplify → Intrigue → Reason → Offer
- **Arena competitors:** Congruence Purist, Story Extender, Proof Stacker, Urgency Driver, Value Calculator, Problem Revealer, Speed Optimizer
- **Arena scoring:** Congruence (40%), Extension Logic (30%), Tone Shift (20%), Proof Quality (10%)
- **Persona voice loading:** Yes (500-2000w = sufficient for voice differentiation)
- **Position-aware:** Position 1 (standard congratulate) vs Position 2+ (warning/confession option)
- **Congruence score:** 1-10 scale, >= 7.0 required, < 5.0 = HALT
- **Downstream handoff:** Provides U3 with upsell angle, bonuses, price, and 2 reframe suggestions

### U3 Protocol (Downsell Writer)

- **Output:** `downsell-page-draft.md` (300-1000w, ARO structure)
- **Modes:** Mode A (downstream from U0 + U2) or Mode B (standalone brief)
- **5 Layers:** 0 (Foundation) → 1 (Reframe Selection + Congruence) → 2 (ARO Draft) → 2.5 (Arena) → 4 (Validation)
- **8 microskills** with per-microskill output + Arena
- **Arena:** `generative_full_draft` mode with 7 reframe-focused competitors
- **ARO structure:** Acknowledge → Reframe → Offer (NOT CAIRO — downsells acknowledge a "no", not congratulate a "yes")
- **Arena competitors:** Empathy Expert, Core Extractor, Angle Shifter, Value Calculator, Payment Architect, Format Flipper, Gentle Closer
- **Arena scoring:** Reframe Quality (40%), Congruence (25%), Tone (20%), Simplification (15%)
- **4 Reframe Types:** Core Extract, Payment Plan, Lite Version, Different Format
- **No persona voice loading** — 300-1000w too short for voice differentiation; anti-voice from soul.md only
- **Position-aware:** Downsell 1 (500-1000w, full ARO) vs Downsell 2 (300-600w, compressed ARO)
- **Critical rule:** "Same thing cheaper" is NOT a reframe — must be genuinely different angle
- **Zero guilt:** Acknowledge section has zero pressure, zero FOMO, validates hesitation
- **Downstream handoff:** Provides U4 with reframe_type_used, upsell_declined_context

### U4 Protocol (Upsell Sequence Assembler)

- **Output:** `upsell-sequence-assembled.md` + `validation-report.md` + `e0-handoff.yaml`
- **Modes:** Mode A (full sequence: U0+U1+U2+U3) or Mode B (partial sequence)
- **3 Layers:** 0 (Input Loading) → 1 (5 Parallel Validators) → 4 (Assembly + Handoff)
- **8 microskills** with per-microskill output
- **No Arena** — assembly and validation skill, not generative
- **5 Validators:** Sequence Collector, Narrative Thread (5 mandatory threads), Congruence Chain, Pricing Cascade, Speed (<4 min total)
- **Drift report:** Tracks deviation from U0 strategy across 4 dimensions, <15% threshold
- **Dual handoff:** U5 (editorial) + E0 (email strategy via e0-handoff.yaml with 3 buyer scenarios)
- **Arena-selected copy verification:** Checks GATE_2.5 checkpoints for U2/U3 — learned from Skill 19 failure

### U5 Protocol (Upsell Editorial)

- **Output:** `upsell-sequence-final.md` + `EDITORIAL-REPORT.md`
- **4 Layers:** 0 (Input + Rubric) → 1 (Baseline Score + Issues) → 2 (Revisions via Arena) → 4 (Rescore + Validate + Package)
- **9 microskills** with per-microskill output + Arena
- **Arena:** `editorial_revision` mode — targeted revisions for P1/P2 issues, not complete rewrites
- **7 editorial lenses:** Congruence Auditor, Speed Enforcer, Tone Guardian, Value Architect, Flow Specialist, CTA Optimizer, The Integrator
- **Arena competitors:** Congruence Surgeon, Brevity Blade, Tone Recalibrator, Value Reframer, Flow Weaver, CTA Architect, The Integrator
- **Arena scoring:** Issue Resolution (25%), Congruence Preservation (25%), Tone Preservation (20%), Speed Preservation (15%), CTA Clarity (15%)
- **5 Sequence-Level Criteria (S1-S5):** Pricing Cascade, Congruence Chain, Speed Compliance, Voice Consistency, Value Escalation
- **Minimum threshold:** 7.5/10 per piece — all pieces must pass
- **Issue severity:** P1 (Critical → Arena), P2 (Major → Arena), P3 (Minor → Direct Fix), P4 (Cosmetic → Direct Fix)
- **GATE_3:** HUMAN_REVIEW — BLOCKING. Sequence not complete without explicit human approval
- **Follows E4 pattern** (4 layers), NOT Skill 20 pattern (6 layers) — appropriate for 1,500-3,000w upsell sequences

### When Executing

1. READ `05-upsells/UPSELL-ENGINE.md`
2. READ the skill's ANTI-DEGRADATION.md
3. READ the skill's AGENT.md
4. READ each microskill .md spec BEFORE executing
5. FOLLOW all gates exactly
6. For U2/U3/U5: Also READ ~system/ARENA-PROTOCOL.md
