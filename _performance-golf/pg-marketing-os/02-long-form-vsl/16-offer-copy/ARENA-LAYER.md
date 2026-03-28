# Offer Copy Skill — Arena Layer (2.5)

**Version:** 2.1
**Parent Skill:** 16-offer-copy
**Position:** Between Layer 2 (Draft Generation) and Layer 3 (Refinement)
**Purpose:** Multi-perspective offer copy generation through 7 competitors (6 legendary copywriter personas + The Architect), scored against 7 skill-specific criteria, with mandatory human selection

> **Arena Mode:** `generative_full_draft` — Competitors write COMPLETE pieces from scratch using upstream packages. Layer 2 draft = reference material, not template. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 2-round + audience evaluation execution protocol.

---

## ARENA OVERVIEW

The Offer Copy Arena generates 7 complete offer presentation drafts — each reflecting a distinct copywriting master's approach to the formal offer presentation. This is the COMMERCIAL CLIMAX of the promotion: where belief converts to action. Different personas bring radically different approaches to D-F-W-B-P delivery, value demonstration, price psychology, and CTA construction.

**Why Arena Matters for Offer Copy:**
- D-F-W-B-P can be delivered with varying emphasis (some personas emphasize Why, others emphasize Proof)
- Value demonstration patterns differ dramatically across masters
- Price psychology anchoring varies (aggressive cascade vs. softer anchoring)
- CTA emotional variety depends on persona worldview
- Guarantee positioning ranges from confident challenge to warm reassurance
- Promise restatement techniques vary in creativity and repetition style

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 2-round + audience evaluation execution protocol.**

> **Effort Level:** All generation phases use `effort: max`. Critique uses `effort: high`. See ~system/SYSTEM-CORE.md Effort Protocol.
> **Agent Team Mode:** When Agent Teams enabled, each persona runs as a separate teammate agent with full-draft generation in its own 200K context. See `~system/protocols/ARENA-CORE-PROTOCOL.md` v2.0 Agent Team Execution Mode.

This skill uses `arena_mode: generative_full_draft`:
- **Competitors write COMPLETE pieces from scratch** — NOT variations of a Layer 2 draft
- Layer 2 draft output = reference material and structural guide, NOT a template
- Upstream packages (root cause, mechanism, promise, big idea, structure) are the primary input
- Competitors are NOT constrained to follow the Layer 2 draft's specific approach
- **7 competitors** (6 personas + The Architect) generating independently
- **Adversarial critique** before scoring (The Critic identifies at most ONE weakest element per output; may report no_material_weakness if output is genuinely strong)
- **Targeted revision** (each competitor fixes their identified weakness)
- **2 rounds** of competition with audience evaluation + analytical briefs between rounds
- **Post-arena synthesis** (Layer 2.6) creating 2-3 phrase-level hybrids
- **Human selection** from 9-10 candidates (7 pure + 2-3 hybrids)

### Full-Draft Mode Specifics
- Each competitor generates their OWN complete version from the upstream strategic packages
- The Layer 2 draft is available as ONE reference among many, not THE template
- Competitors may take radically different approaches (different structure, different emphasis, different tone)
- This produces TRUE creative diversity, not minor variations

### What Stays Skill-Specific (Below)
- 7 judging criteria with weights (used by both The Critic and the Judge)
- Persona generation instructions for this skill
- Critique-specific guidance for this skill
- Quality thresholds
- Anti-slop enforcement
- Input/output requirements

---

## OFFER COPY JUDGING CRITERIA (7 Dimensions)

#### 1. D-F-W-B-P Completeness (20%) — CRITICAL
**What It Measures:** Does every deliverable and bonus have all 5 elements: Deliverable, Feature, Why, Benefit, Proof?

**Scoring Rubric:**
- **9-10:** Every deliverable and bonus has explicit D-F-W-B-P with no shortcuts; Why and Benefit are distinct and compelling; Proof is specific, not generic
- **7-8:** All items have D-F-W-B-P; occasional Why/Benefit overlap or generic proof
- **5-6:** Most items have D-F-W-B-P; some elements weak or missing on 1-2 items
- **3-4:** Feature dump with some benefits sprinkled in; Why often missing; Proof sparse
- **1-2:** Pure feature listing without Why, Benefit, or Proof

**CRITICAL THRESHOLD:** Any D-F-W-B-P score < 7 is BLOCKING. The format is sacred.

**D-F-W-B-P Audit Checklist (per item):**
- [ ] Deliverable: Clearly named what they get
- [ ] Feature: What it includes/contains
- [ ] Why: Why this feature matters (mechanism-level)
- [ ] Benefit: What this means for the prospect's life
- [ ] Proof: Evidence this delivers (study, testimonial, mechanism validation)

#### 2. Value Demonstration Impact (20%)
**What It Measures:** Does the "if all it did was..." section create genuine "this is worth far more than the price" perception?

**Scoring Rubric:**
- **9-10:** 3+ iterations with diverse benefits; each "why it would be worth it" reason is emotionally compelling and credible; cumulative effect creates "how can this be so affordable?" reaction
- **7-8:** 3 iterations with good benefit variety; reasons are solid; value perception is strong
- **5-6:** 3 iterations but benefits overlap or reasons feel weak; value perception adequate
- **3-4:** Under 3 iterations or benefits too similar; reasons feel forced; value unclear
- **1-2:** Missing or perfunctory; no genuine value demonstration

**Value Demonstration Requirements:**
- MINIMUM 3 iterations (mandatory per SIN methodology)
- Each iteration uses a DIFFERENT benefit
- Each "why it would be worth it" is SPECIFIC to that benefit
- Cumulative effect builds to price reveal

#### 3. Price Psychology Quality (15%)
**What It Measures:** Is the price presented with proper anchoring that makes the actual price feel like a bargain?

**Scoring Rubric:**
- **9-10:** Clear retail value anchor; optional middle anchor; actual price creates relief/excitement; savings explicitly stated; stack review before price; price feels like a steal
- **7-8:** Good anchoring structure; price reveal creates positive reaction; savings clear
- **5-6:** Some anchoring; price reveal neutral; savings mentioned but not emphasized
- **3-4:** Weak or missing anchoring; price feels exposed; possible sticker shock
- **1-2:** Price dropped without context; no value-to-price contrast

**Price Psychology Elements:**
- Stack review re-lists all items with values before price
- Retail value anchor established
- Savings amount AND percentage stated
- Per-day/per-dose minimization (if applicable)
- Terms clearly stated

#### 4. Guarantee Positioning (15%)
**What It Measures:** Is the guarantee branded and positioned as confident promise, not policy language?

**Scoring Rubric:**
- **9-10:** Guarantee has memorable branded name; written as bold confidence expression; feels like additional value; specific terms are prospect-favorable
- **7-8:** Guarantee is named; positioned as confidence; terms clear and strong
- **5-6:** Guarantee mentioned with some branding; language functional but not inspiring
- **3-4:** Generic guarantee language; reads like legal requirement
- **1-2:** "Money-back guarantee" or "if not satisfied, return for refund" — unbranded

**Guarantee Red Flags (automatic rejection):**
- "Money-back guarantee" without branded name
- "If not satisfied, return for refund"
- "Satisfaction guaranteed" (generic)
- "30-day guarantee" without framing
- Any "guarantee" that sounds like policy, not promise

#### 5. CTA Variety & Emotional Range (15%)
**What It Measures:** Do the 3+ CTAs use genuinely different emotional appeals, phrases, and supporting reasons?

**Scoring Rubric:**
- **9-10:** 3+ CTAs each with distinct emotional appeal (confidence, consequence, urgency); different phrases; different supporting reasons; no repetition; consequence amplification between CTAs
- **7-8:** 3 CTAs with good variety; emotional range present; some phrase variation
- **5-6:** 3 CTAs but similarity in emotion or phrasing; variety adequate but not excellent
- **3-4:** Fewer than 3 CTAs or repetitive language; limited emotional range
- **1-2:** Single CTA or copy-pasted identical CTAs

**CTA Emotional Range (required):**
- CTA 1: Confidence appeal — "You've seen the proof, now take action"
- CTA 2: Consequence appeal — "Don't let another day pass with [problem]"
- CTA 3: Urgency appeal — "[Justified reason] means you need to act now"

#### 6. Promise Restatement Quality (10%)
**What It Measures:** Is the primary promise restated multiple times with different words each time?

**Scoring Rubric:**
- **9-10:** Primary promise appears 3+ times; each restatement uses completely different words while conveying the same transformation; creative variation
- **7-8:** Promise restated multiple times; good variation; occasionally similar phrasing
- **5-6:** Promise mentioned multiple times; some copy-paste or very similar restatements
- **3-4:** Promise mentioned once or twice; little variation when repeated
- **1-2:** Promise lost after initial mention; or copy-pasted identical phrases

**Promise Restatement Examples:**
- GOOD: "Achieve the blood pressure your doctor dreams of" / "Finally see numbers that make your doctor smile" / "Walk into your next checkup with confidence"
- BAD: "Achieve healthy blood pressure" / "Get healthy blood pressure" / "Have healthy blood pressure"

#### 7. Transition Smoothness (5%)
**What It Measures:** Do transitions between sections flow naturally without "new section starting" feeling?

**Scoring Rubric:**
- **9-10:** All transitions carry emotional momentum forward; no jarring breaks; reader doesn't notice section boundaries
- **7-8:** Smooth transitions; occasional slight gear shift but not jarring
- **5-6:** Adequate transitions; some feel like section markers
- **3-4:** Transitions feel like new sections starting; emotional momentum disrupted
- **1-2:** Abrupt section breaks; no transition language; choppy reading experience

**Transition Points to Evaluate:**
- Deliverable to deliverable
- Deliverables to bonus transition
- Bonus to bonus
- Bonuses to value demonstration
- Value demonstration to price
- Price to guarantee
- Guarantee to CTA
- CTA to consequence amplification to next CTA

---

### Critique-Specific Guidance

**What The Critic should particularly target in Offer Copy Arena:**
- D-F-W-B-P elements missing from any deliverable or bonus
- Value demonstration under 3 "if all it did was..." iterations
- Identical CTA language repeated (must have variety)
- Promise restatements that are copy-pasted (must use DIFFERENT words)
- Urgency without justified real-world reason

---

## 10 OFFER COPY PRINCIPLES COMPLIANCE CHECK

Before Arena output is accepted, verify all 10 principles:

| Principle | Verification Question | Failure = REJECT |
|-----------|----------------------|------------------|
| 1. D-F-W-B-P Sacred | Does every deliverable/bonus have all 5 elements? | Any item missing element |
| 2. Promise Restated Not Repeated | Is promise restated 3+ times with different words? | Copy-pasted restatements |
| 3. Value Before Price | Is total value established before price reveal? | Price before value total |
| 4. "If All It Did" Present | Are there 3+ value demonstration iterations? | Under 3 iterations |
| 5. Guarantee Is Feature | Is guarantee branded with specific name? | Generic "money-back" |
| 6. Three CTAs Minimum | Are there 3+ CTAs? | Fewer than 3 CTAs |
| 7. Consequence Amplification | Is pain reminder present between CTAs? | No consequence section |
| 8. Urgency Justified | Is urgency claim backed by specific reason? | Generic "limited time" |
| 9. Stack Review Before Price | Is full stack re-listed before price? | Price without stack review |
| 10. Seamless Entry | Does first line flow from product introduction? | Jarring "here's the offer" |

---

## ANTI-SLOP ENFORCEMENT (OFFER COPY SPECIFIC)

### Banned Phrases — Instant Rejection

**Value Stack Poison:**
- "Amazing bonuses"
- "Incredible value"
- "Unbeatable price"
- "Best deal ever"
- "No-brainer" (without proof)
- "Steal at this price"

**Guarantee Poison:**
- "Money-back guarantee" (unbranded)
- "If not satisfied, return for refund"
- "Satisfaction guaranteed" (generic)
- "100% guaranteed" (without specifics)
- "Risk-free trial" (without specifics)

**CTA Poison:**
- "Click here now"
- "Order now" (naked)
- "Buy now" (naked)
- "Don't wait" (without consequence)
- "Act now" (without justification)

**Urgency Poison:**
- "Limited time offer" (without specifics)
- "This won't last"
- "While supplies last" (without inventory justification)
- "Don't miss out"
- "Once in a lifetime"

**Feature Dump Indicators:**
- "Contains X, Y, and Z" (without Why/Benefit)
- "Includes..." (without Why/Benefit)
- "Features..." (without Why/Benefit)
- Bullet-only delivery without narrative

---

## ARENA OUTPUT SCHEMA

```yaml
offer_copy_arena:
  execution_metadata:
    skill: "16-offer-copy"
    layer: "2.5"
    timestamp: string
    run_id: string
    specimens_loaded: [string]

  generation_round:
    candidates_generated: 7
    candidates:
      - persona: string
        draft: object  # full draft structure
        word_count: integer
        dfwbp_audit: object
        value_demo_count: integer
        cta_count: integer
        guarantee_branded_name: string

  judging_round:
    scores_by_candidate:
      - persona: string
        criterion_scores:
          dfwbp_completeness: float
          value_demo_impact: float
          price_psychology: float
          guarantee_positioning: float
          cta_variety: float
          promise_restatement: float
          transition_smoothness: float
        weighted_score: float
        dfwbp_audit_result: string

  ranking:
    ordered_candidates: [object]
    recommendation: string
    recommendation_rationale: string

  human_selection:
    checkpoint_presented: boolean
    selection_made: boolean
    selected_persona: string
    selection_rationale: string
    synthesis_requested: boolean
    synthesis_elements: [object]  # if synthesis requested

  validation:
    offer_principles_check:
      all_ten_pass: boolean
      violations: [string]
    anti_slop_check:
      pass: boolean
      violations_found: [string]
    dfwbp_threshold_check:
      all_dfwbp_above_7: boolean
      flagged_items: [string]

  selected_output:
    final_draft: object  # winning draft (or synthesis)
    ready_for_layer_3: boolean
```

---

## INTEGRATION WITH LAYER 3

### Handoff Requirements

The Arena winner (or synthesis) passes to Layer 3 with:

1. **Complete deliverable stack** — All D-F-W-B-P elements present
2. **Bonus section** — All bonuses with values and transitions
3. **Value demonstration** — 3+ iterations with compelling reasons
4. **Price presentation foundation** — Anchoring structure ready for polish
5. **Branded guarantee** — Named and positioned, ready for final polish
6. **CTA sequence** — 3+ CTAs with emotional variety

### Layer 3 Refinement Scope

Layer 3 (Refinement & Polish) builds on Arena output:
- Optimizes all transitions for emotional momentum
- Calibrates promise restatement variety
- Verifies emotional escalation arc
- Ensures CTA variation is maximized
- Polishes urgency justification

**Layer 3 MUST NOT:**
- Remove D-F-W-B-P elements
- Reduce value demonstration iterations below 3
- Unbrand the guarantee
- Eliminate CTAs below 3

---

## QUALITY GATES

### Gate 2.5 (BLOCKING)

Arena Layer passes Gate 2.5 when:
- [ ] Human has explicitly selected one candidate (or synthesis)
- [ ] Selected candidate has weighted score >= 8.5
- [ ] Selected candidate has D-F-W-B-P completeness >= 7.0
- [ ] All 10 offer copy principles pass on selected candidate
- [ ] Anti-slop validation passes on selected candidate
- [ ] Selection is logged with rationale

**Failure Response:**
- If no candidate meets thresholds → additional generation round (max 3)
- If human rejects all candidates → request guidance on specific issues
- After 2 rounds without acceptable candidate → escalate to full human checkpoint

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-02-05 | AGENT TEAMS + EFFORT PROTOCOL: Added effort level and Agent Team mode references to execution protocol. See ~system/protocols/ARENA-CORE-PROTOCOL.md v2.0 and ~system/SYSTEM-CORE.md. |
| 2.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0: Added arena_mode: generative_full_draft (competitors write complete pieces from scratch, not variations of Layer 2 draft). Replaced Phase 1-4 execution protocol with reference to ~system/protocols/ARENA-CORE-PROTOCOL.md (2-round + audience evaluation mandatory competition, adversarial critique-revise, 7 competitors including The Architect, analytical briefs). Added critique-specific guidance. Updated all competitor counts from 6 to 7. Version bump. |
| 1.0 | 2026-02-03 | Initial Arena Layer for offer copy with 7 judging criteria (D-F-W-B-P Completeness 20%, Value Demo Impact 20%, Price Psychology 15%, Guarantee Positioning 15%, CTA Variety 15%, Promise Restatement 10%, Transition Smoothness 5%), 10 offer copy principle compliance verification, D-F-W-B-P audit system, SIN methodology integration |
