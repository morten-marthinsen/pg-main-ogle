# Offer Arena Layer (Layer 2.5)

**Version:** 2.1
**Created:** 2026-02-03
**Updated:** 2026-02-05
**Position:** Between Layer 2 (Enhancement Stack) and Layer 3 (Validation)
**Personas:** See [ARENA-PERSONA-PANEL.md](../../~system/protocols/ARENA-PERSONA-PANEL.md)
**Quality Standard:** 8.5/10 minimum (zero tolerance for mediocrity)

> **Arena Mode:** `strategic` — Competitors generate complete strategic packages. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 2-round + audience evaluation execution protocol.

---

## PURPOSE

The Arena Layer transforms offer architecture from a single-perspective process into a multi-perspective competition. Seven competitors (6 personas + The Architect) each generate their version of the complete offer package, which are then judged against skill-specific criteria to surface the strongest candidate.

**The Problem It Solves:**
- AI tendency toward generic offer structures ("bonus 1, bonus 2, bonus 3")
- Insufficient use of TIER1 vault offer patterns
- Missing copy judgment in offer element selection
- Bonuses that don't strategically address objections
- Guarantees that feel generic or weak
- Price architecture without proper psychological anchoring
- Offer names that lack memorability or market positioning

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 2-round + audience evaluation execution protocol.**

> **Effort Level:** All generation phases use `effort: max`. Critique uses `effort: high`. See ~system/SYSTEM-CORE.md Effort Protocol.
> **Agent Team Mode:** When Agent Teams enabled, each persona runs as a separate teammate agent. See `~system/protocols/ARENA-CORE-PROTOCOL.md` v2.0 Agent Team Execution Mode.

This skill uses `arena_mode: strategic` — competitors generate COMPLETE strategic packages (no behavioral change from current generation approach). The Arena adds:
- **7 competitors** (6 personas + The Architect) generating independently
- **Adversarial critique** before scoring (The Critic identifies at most ONE weakest element per output; may report no_material_weakness if output is genuinely strong)
- **Targeted revision** (each competitor fixes their identified weakness)
- **2 rounds** of competition with audience evaluation + analytical briefs between rounds
- **Post-arena synthesis** (Layer 2.6) creating 2-3 phrase-level hybrids
- **Human selection** from 9-10 candidates (7 pure + 2-3 hybrids)

### What Stays Skill-Specific (Below)
- 7 judging criteria with weights (used by both The Critic and the Judge)
- Persona generation instructions for this skill
- Critique-specific guidance for this skill
- Quality thresholds
- Anti-slop enforcement
- Input/output requirements

---

### Offer Judging Criteria

| Criterion | Weight | Definition | Why This Matters |
|-----------|--------|------------|------------------|
| **Value Equation Optimization** | 20% | How well does this offer maximize Dream Outcome × Likelihood / (Time × Effort)? All 4 levers explicitly addressed? | The Value Equation is the fundamental framework — offers that don't optimize all levers underperform |
| **Bonus Architecture** | 15% | Are bonuses strategic (objection-addressing, value-stacking, logically sequenced)? Each bonus serves clear purpose? | Random bonuses feel like padding; strategic bonuses overcome specific buying objections |
| **Guarantee Strength** | 15% | Is the guarantee compelling, branded, appropriately aggressive, and clearly articulated? Does it create genuine risk reversal? | Weak guarantees signal lack of confidence; strong guarantees eliminate purchase friction |
| **Price-Value Psychology** | 15% | Does the price architecture create overwhelming perceived value? Proper anchoring? Logical justification? | Poor price psychology creates price resistance; elite price architecture makes price feel like a steal |
| **Differentiation** | 10% | Is this offer clearly distinct from competitor offers? Would prospect remember this vs. alternatives? | Undifferentiated offers compete on price; differentiated offers command premiums |
| **TIER1 Pattern Match** | 15% | How closely does this match elite vault offer patterns? Same structural DNA as proven winners? | TIER1 patterns are proven; deviation should be intentional, not accidental |
| **Promise-Offer Alignment** | 10% | Does the offer clearly, completely deliver on the upstream promise? No gaps between what's promised and what's offered? | Misalignment breaks trust; the offer must deliver everything the promise suggested |

**TOTAL: 100%**

---

### Scoring Protocol

```
FOR each of the 7 candidates:
  FOR each of the 7 criteria:
    1. Score 1-10 with SPECIFIC EVIDENCE from the candidate
    2. Document exact text/element that justifies the score
    3. Flag if below 7.0 (elevated minimum for 8.5 threshold)
    4. Note specific improvement opportunity if below 8.0

  Calculate: weighted_total = sum(score × weight)

  Document:
    - Strongest 3 elements (with evidence)
    - Weakest 2 elements (with evidence)
    - Critical gaps (any criterion below 7.0)
    - Improvement recommendations

IF weighted_total < 8.5 for ALL candidates:
  TRIGGER re-generation with specific guidance
  DO NOT proceed to ranking with substandard candidates
```

---

### Scoring Rubric (Calibrated to 8.5 Minimum Standard)

**Value Equation Optimization (20%)**
| Score | Definition | Evidence Required |
|-------|------------|-------------------|
| 9-10 | All 4 levers explicitly maximized with specific strategies for each; offer creates "no-brainer" perception | Point to specific elements addressing Dream Outcome, Likelihood, Time, Effort |
| 8-8.9 | 4 levers addressed, 3 strongly optimized, 1 adequate | Identify which lever is adequate vs. strong |
| 7-7.9 | 4 levers addressed, all adequate, none exceptional | Note specific optimization opportunities |
| 5-6.9 | 1-2 levers weak or missing explicit addressing | Identify missing/weak levers |
| 1-4.9 | Value Equation not systematically applied | Flag as fundamental failure |

**Bonus Architecture (15%)**
| Score | Definition | Evidence Required |
|-------|------------|-------------------|
| 9-10 | Each bonus addresses specific objection; logical sequence; values justified; no "padding" bonuses | Map each bonus to specific objection |
| 8-8.9 | Bonuses are strategic; one may be less clearly justified | Identify the weaker bonus |
| 7-7.9 | Bonuses are reasonable; objection mapping partial | Note unmapped objections |
| 5-6.9 | Some bonuses feel like padding; objection connection unclear | Identify padding bonuses |
| 1-4.9 | Random bonus assembly; no strategic logic | Flag for complete redesign |

**Guarantee Strength (15%)**
| Score | Definition | Evidence Required |
|-------|------------|-------------------|
| 9-10 | Branded guarantee name; bold language; creates genuine risk reversal; appropriate for offer type; memorable | Quote exact guarantee language |
| 8-8.9 | Strong guarantee; may lack distinctive branding or bold language | Note what's missing |
| 7-7.9 | Functional guarantee; generic language; adequate but forgettable | Suggest branding improvement |
| 5-6.9 | Weak guarantee; standard "money-back" without enhancement | Flag for strengthening |
| 1-4.9 | Missing or counterproductive guarantee | Flag as critical failure |

**Price-Value Psychology (15%)**
| Score | Definition | Evidence Required |
|-------|------------|-------------------|
| 9-10 | Multiple anchor points; compelling comparisons; price feels like obvious steal; logical justification; payment options | Quote anchor cascade |
| 8-8.9 | Good anchoring; one element could be stronger | Identify improvement area |
| 7-7.9 | Basic anchoring present; price justified but not compelling | Suggest additional anchors |
| 5-6.9 | Weak anchoring; price may create resistance | Flag psychology gaps |
| 1-4.9 | No anchor strategy; price presented without context | Flag as fundamental failure |

**Differentiation (10%)**
| Score | Definition | Evidence Required |
|-------|------------|-------------------|
| 9-10 | Unique offer structure; memorable positioning; would stand out in market; "only one who..." positioning | Identify unique elements |
| 8-8.9 | Clearly differentiated; one element similar to competitors | Note similar element |
| 7-7.9 | Somewhat differentiated; prospect could confuse with alternatives | Suggest differentiation angle |
| 5-6.9 | Largely similar to competitor offers; commodity positioning | Flag differentiation need |
| 1-4.9 | Identical to market standard; no differentiation | Flag as critical failure |

**TIER1 Pattern Match (15%)**
| Score | Definition | Evidence Required |
|-------|------------|-------------------|
| 9-10 | Matches elite TIER1 offer patterns exactly; same structural DNA as proven winners | Name specific TIER1 pattern matched |
| 8-8.9 | Strong TIER1 alignment; minor deviations | Note deviation and whether intentional |
| 7-7.9 | Some TIER1 elements; some generic patterns | Identify generic vs. TIER1 elements |
| 5-6.9 | Mostly generic; limited TIER1 influence | Suggest specific TIER1 patterns to adopt |
| 1-4.9 | No TIER1 pattern recognition; purely generic | Flag for vault pattern consultation |

**Promise-Offer Alignment (10%)**
| Score | Definition | Evidence Required |
|-------|------------|-------------------|
| 9-10 | Offer delivers everything promise suggested; perfect alignment; no gaps; prospect would feel fully satisfied | Trace promise elements to offer delivery |
| 8-8.9 | Strong alignment; one minor gap | Identify the gap |
| 7-7.9 | Adequate alignment; prospect might wonder about one aspect | Note wondering point |
| 5-6.9 | Gaps between promise and offer; prospect may feel misled | Flag alignment failures |
| 1-4.9 | Offer doesn't deliver on promise; broken trust chain | Flag as critical failure |

---

### Output Format (Judging Round)

```yaml
arena_judging_output:
  layer: "2.5.2"
  scored_candidates:
    - persona: string
      criterion_scores:
        value_equation_optimization:
          score: float (1-10, one decimal)
          evidence: string (specific text from candidate)
          optimization_note: string (if score < 9)
        bonus_architecture:
          score: float
          evidence: string
          objection_mapping: [string] (which objections each bonus addresses)
          optimization_note: string
        guarantee_strength:
          score: float
          evidence: string (quote exact guarantee language)
          optimization_note: string
        price_value_psychology:
          score: float
          evidence: string (quote anchor cascade)
          optimization_note: string
        differentiation:
          score: float
          evidence: string (identify unique elements)
          optimization_note: string
        tier1_pattern_match:
          score: float
          evidence: string (name patterns matched)
          patterns_identified: [string]
          optimization_note: string
        promise_offer_alignment:
          score: float
          evidence: string (trace promise to delivery)
          alignment_map: object
          optimization_note: string
      weighted_total: float (calculated to two decimals)
      strongest_elements:
        - element: string
          evidence: string
        - element: string
          evidence: string
        - element: string
          evidence: string
      weakest_elements:
        - element: string
          evidence: string
          improvement: string
        - element: string
          evidence: string
          improvement: string
      critical_gaps: [string] (any criterion below 7.0)
      meets_threshold: boolean (weighted_total >= 8.5)

  threshold_analysis:
    candidates_meeting_threshold: integer
    highest_score: float
    lowest_score: float
    remediation_needed: boolean
```

### Critique-Specific Guidance

**What The Critic should particularly target in Offer Arena:**
- Value equation imbalance (promise vs. price vs. bonuses)
- Generic guarantee (not branded/named)
- Bonus architecture that doesn't support main offer thesis
- Price-value psychology that triggers resistance instead of reducing it
- Missing differentiation from competitor offers

---

## QUALITY GATES

### Gate 2.5 Requirements (Elevated Standard)

| Check | Minimum | Evidence Required | Failure Action |
|-------|---------|-------------------|----------------|
| Candidates generated | 7 | One complete package per competitor (6 personas + The Architect) | Re-generate missing competitors |
| Candidate completeness | All 10 elements present | Element checklist verified | Reject incomplete candidates |
| All criteria scored | 7 per candidate (49 total) | Score + evidence for each | Complete judging before proceeding |
| Score evidence provided | 42 evidence citations | Specific text/element cited | Reject scores without evidence |
| Top candidate score | ≥ 8.5 | Weighted total calculation | Trigger remediation if none meet threshold |
| No critical gaps | None below 7.0 | Per-criterion review | Flag and address gaps |
| Human selection received | Yes | Selection recorded with timestamp | BLOCK — cannot proceed without input |

### Gate Failure Protocol

```
IF candidates < 7:
  LOG: "GATE 2.5 FAILED: Only [N] candidates generated"
  ACTION: Re-run generation for missing competitors
  DO NOT proceed until all 7 complete

IF any candidate missing elements:
  LOG: "GATE 2.5 FAILED: [Persona] missing [elements]"
  ACTION: Re-generate incomplete candidate
  DO NOT include incomplete candidates in judging

IF any criterion unscored or without evidence:
  LOG: "GATE 2.5 FAILED: [Persona] [criterion] lacks score/evidence"
  ACTION: Complete judging with evidence before proceeding
  DO NOT proceed with incomplete scoring

IF top candidate < 8.5:
  LOG: "GATE 2.5 FAILED: Highest score [X.XX] below 8.5 threshold"
  ACTION:
    Option A: Re-generate with specific guidance on weak criteria
    Option B: Present to human with explicit warning and improvement recommendations
  DO NOT proceed as if threshold is met

IF critical gaps exist (any criterion < 7.0):
  LOG: "GATE 2.5 WARNING: [Persona] has critical gap in [criterion]: [score]"
  ACTION: Flag gaps prominently in human presentation
  RECOMMEND: Address gaps before final selection

IF no human selection after presentation:
  LOG: "GATE 2.5 BLOCKED: Awaiting human selection"
  ACTION: HALT — do not proceed under any circumstances
  DO NOT suggest automatic progression
```

---

## INTEGRATION WITH EXISTING LAYERS

### Layer 2 → Layer 2.5 Handoff

Layer 2 produces the enhancement stack (bonuses, guarantee, scarcity, urgency, naming, price, value demonstration). Layer 2.5 takes these inputs and generates 7 competitor-specific complete offer packages, each reinterpreting the elements through their unique lens.

**Handoff Requirements:**
- All Layer 2 microskills must be complete
- Layer 2.8 enhancement gate must PASS
- All enhancement stack elements must be present

### Layer 2.5 → Layer 3 Handoff

Layer 2.5 produces a human-selected offer package. Layer 3 validates this selection against:
- Value Equation scoring (all 4 dimensions)
- Vault pattern comparison
- Competitor differentiation
- Promise-offer alignment
- Anti-slop validation

**Handoff Package:**
- Complete selected offer package (all 10 elements)
- Weighted score and criterion breakdown
- Human selection confirmation
- Any notes or modifications from human

### Feedback Loop

If Layer 3 validation fails, feedback can request:
- Re-run Layer 2.5 with different persona emphasis
- Re-run full Arena with specific criterion focus
- Return to Layer 2 for enhancement stack revision
- Return to Layer 1 for core offer revision

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-02-05 | AGENT TEAMS + EFFORT PROTOCOL: Added effort level and Agent Team mode references to execution protocol. See ~system/protocols/ARENA-CORE-PROTOCOL.md v2.0 and ~system/SYSTEM-CORE.md. |
| 2.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0: Added arena_mode: strategic. Replaced Phase 1-4 execution protocol with reference to ~system/protocols/ARENA-CORE-PROTOCOL.md (2-round + audience evaluation mandatory competition, adversarial critique-revise, 7 competitors including The Architect, analytical briefs). Added critique-specific guidance. Updated all competitor counts from 6 to 7. Version bump. |
| 1.0 | 2026-02-03 | Initial Arena Layer creation with 6-persona generation, 7-criterion judging (Value Equation Optimization, Bonus Architecture, Guarantee Strength, Price-Value Psychology, Differentiation, TIER1 Pattern Match, Promise-Offer Alignment), elevated 8.5/10 quality threshold, comprehensive scoring rubrics, human checkpoint, zero-abbreviation mandate |
