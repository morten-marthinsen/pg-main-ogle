# Product Introduction Skill — Arena Layer (2.5)

**Version:** 2.1
**Parent Skill:** 15-product-introduction
**Position:** Between Layer 2 (Draft Generation) and Layer 3 (Commercial Architecture)
**Purpose:** Multi-perspective product introduction generation through 7 competitors (6 legendary copywriter personas + The Architect), scored against 7 skill-specific criteria, with mandatory human selection

> **Arena Mode:** `generative_full_draft` — Competitors write COMPLETE pieces from scratch using upstream packages. Layer 2 draft = reference material, not template. See `ARENA-CORE-PROTOCOL.md` for 3-round execution protocol.

---

## ARENA OVERVIEW

The Product Introduction Arena generates 7 complete product introduction drafts — each reflecting a distinct copywriting master's approach to the MOST DANGEROUS transition in copy: from mechanism education to product revelation. The bridge moment determines whether the prospect stays engaged or mentally checks out ("oh, now they're selling me something").

**Why Arena Matters for Product Introduction:**
- Bridge moments can feel natural OR like jarring sales pivots — persona diversity reveals best approach
- Some personas emphasize accessibility (Makepeace), others scientific validation (Clemens)
- Value stacking techniques vary dramatically across masters
- Guarantee and scarcity framing differs by persona worldview
- Price reveal psychology requires multiple angles to find optimal anchor structure

---

## EXECUTION PROTOCOL

**See `ARENA-CORE-PROTOCOL.md` for the complete 3-round execution protocol.**

> **Effort Level:** All generation phases use `effort: max`. Critique uses `effort: high`. See CLAUDE.md v3.1 Effort Protocol.
> **Agent Team Mode:** When Agent Teams enabled, each persona runs as a separate teammate agent with full-draft generation in its own 200K context. See `ARENA-CORE-PROTOCOL.md` v2.0 Agent Team Execution Mode.

This skill uses `arena_mode: generative_full_draft`:
- **Competitors write COMPLETE pieces from scratch** — NOT variations of a Layer 2 draft
- Layer 2 draft output = reference material and structural guide, NOT a template
- Upstream packages (root cause, mechanism, promise, big idea, structure) are the primary input
- Competitors are NOT constrained to follow the Layer 2 draft's specific approach
- **7 competitors** (6 personas + The Architect) generating independently
- **Adversarial critique** before scoring (The Critic identifies ONE weakest element per output)
- **Targeted revision** (each competitor fixes their identified weakness)
- **3 rounds** of competition with learning briefs between rounds
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

## PRODUCT INTRODUCTION JUDGING CRITERIA (7 Dimensions)

#### 1. Bridge Moment Smoothness (25%) — CRITICAL
**What It Measures:** Does the transition from mechanism to product feel like natural continuation or jarring "now I'm selling"?

**Scoring Rubric:**
- **9-10:** Prospect doesn't notice the shift — product emerges as inevitable conclusion to mechanism education
- **7-8:** Smooth transition with subtle gear shift — prospect stays engaged
- **5-6:** Noticeable transition but not jarring — some mental recalibration required
- **3-4:** Feels like a commercial break — prospect's guard goes up
- **1-2:** Jarring sales pitch — immediate "they're just selling me something" reaction

**CRITICAL THRESHOLD:** Any bridge scoring < 7 on pitch detection is BLOCKING. The bridge moment is THE most dangerous point in the copy.

**Anti-Pitch Signals:**
- Uses story continuation language ("And that's when I learned...")
- Frames product as access point to mechanism, not commercial offering
- Maintains emotional continuity from mechanism narrative
- Doesn't use "introducing," "now available," "finally revealed"

#### 2. Product Positioning Impact (15%)
**What It Measures:** Does the product reveal establish clear positioning and uniqueness?

**Scoring Rubric:**
- **9-10:** Positioning statement immediately differentiates from ALL alternatives; uniqueness claim is defensible and memorable
- **7-8:** Clear positioning with strong uniqueness claim; prospect understands what makes this different
- **5-6:** Adequate positioning but uniqueness could be clearer; some differentiation present
- **3-4:** Vague positioning; uniqueness claim is generic ("best quality," "most effective")
- **1-2:** No positioning; product introduced as commodity

**Positioning Requirements:**
- Must answer: "Why THIS product vs. all others that activate the mechanism?"
- Uniqueness claim must be SPECIFIC (not "highest quality" but "423 peer-reviewed studies")
- Manufacturing credibility signals present (GMP, third-party tested, specific facility)

#### 3. Component Proof Packaging (15%)
**What It Measures:** Does each component carry its own proof package, or does the copy read as a feature list?

**Scoring Rubric:**
- **9-10:** Every component has dedicated proof (study, mechanism explanation, expert endorsement); reads like mini-arguments, not features
- **7-8:** Most components have proof packages; a few rely on mechanism logic alone
- **5-6:** Some components proven, others listed as features; uneven proof distribution
- **3-4:** Component section reads mostly as feature list; proof is sparse
- **1-2:** Pure feature dump; "contains X, Y, Z" without why each matters

**Proof Package Elements (per component):**
- What it is (name)
- What it does (mechanism-level explanation)
- Why it matters (benefit to prospect)
- How we know (study, expert, demonstration)

#### 4. Value Stack Persuasiveness (15%)
**What It Measures:** Does the value stack make the price feel like a bargain before price is revealed?

**Scoring Rubric:**
- **9-10:** Value stack creates "how could this possibly be affordable?" reaction; each bonus adds real perceived value; total value feels genuinely high
- **7-8:** Strong value building; bonuses feel valuable and relevant; price will feel like a deal
- **5-6:** Adequate value stack; some bonuses feel thin or filler; value perception moderate
- **3-4:** Value stack feels like padding; bonuses are generic or low-perceived-value
- **1-2:** No value building before price; or value claims are obviously inflated

**Value Stack Techniques to Evaluate:**
- Dollar value parade (specific values per bonus)
- Category diversification (bonuses across different benefit categories)
- Worth entire course anchor ("just the X alone would be worth...")
- Continuity trojan horse (ongoing value beyond initial purchase)

#### 5. Price Reveal Psychology (10%)
**What It Measures:** Is the price reveal structured with proper anchoring to make actual price feel like a bargain?

**Scoring Rubric:**
- **9-10:** Multiple anchor points established; descending cascade creates anticipation; actual price creates relief and urgency; per-day/per-dose minimization makes cost feel trivial
- **7-8:** Good anchoring structure; price reveal creates positive reaction; value-to-price ratio clear
- **5-6:** Some anchoring present; price reveal is neutral; no sticker shock but no excitement either
- **3-4:** Weak anchoring; price feels exposed; prospect may hesitate
- **1-2:** No anchoring; price dropped without context; likely sticker shock

**Price Psychology Patterns:**
- Descending anchor cascade ($100k → $3k → 23¢)
- Comparison anchor (250% MORE than alternatives at fraction of price)
- Rhetorical value question ("What is X worth to you?")
- Per-day minimizer ("Less than your morning coffee")
- Non-monetary justification ("Protect your family" > price objection)

#### 6. Guarantee Positioning (10%)
**What It Measures:** Is the guarantee branded and positioned as a confident promise, or generic policy language?

**Scoring Rubric:**
- **9-10:** Guarantee has memorable branded name; written as confident promise/contract; feels like additional value, not return policy
- **7-8:** Guarantee is named; positioned as confidence rather than policy; specific terms clear
- **5-6:** Guarantee mentioned with some branding; language is functional but not inspiring
- **3-4:** Generic guarantee language; reads like legal requirement
- **1-2:** "Money-back guarantee" or "satisfaction guaranteed" without any branding or positioning

**Guarantee Branding Examples (from TIER1):**
- "Iron-Clad Triple Protection Promise"
- "The 'See It Working' Guarantee"
- "Lifetime Results Assurance"
- NEVER: "60-day money-back guarantee" (unbranded)

#### 7. Binary Choice Clarity (10%)
**What It Measures:** Does the setup create clear two-futures framing for the close?

**Scoring Rubric:**
- **9-10:** Two futures vividly painted; taking action = specific positive outcomes; not taking action = specific negative consequences; no middle ground offered
- **7-8:** Clear binary choice; both futures established; prospect understands the stakes
- **5-6:** Binary choice present but futures could be more vivid; stakes feel moderate
- **3-4:** Choice offered but feels weak; prospect might think "I'll decide later"
- **1-2:** No binary choice; soft close; "consider trying" instead of "choose now"

**Binary Choice Elements:**
- Future A (take action): Specific mechanism benefits achieved
- Future B (don't take action): Problem continues/worsens
- No middle ground: "Try for a while" or "think about it" eliminated
- Urgency tied to choice: Why decide NOW vs. later

---

### Critique-Specific Guidance

**What The Critic should particularly target in Product Introduction Arena:**
- Bridge moment that feels like "now I'm selling" (pitch detection)
- Product positioned as hero instead of mechanism
- Components presented as features without proof packages
- Price revealed before value stack established
- Generic guarantee ("money-back guarantee" without branding)

---

## MASTER PRINCIPLE COMPLIANCE CHECK

Before Arena output is accepted, verify all 8 master principles:

| Principle | Verification Question | Failure = REJECT |
|-----------|----------------------|------------------|
| 1. Product Never Hero | Is the MECHANISM positioned as hero, product as delivery vehicle? | Product framed as hero |
| 2. Withholding Creates Value | Is product name timing appropriate to format (late for story-driven)? | Name dropped too early in story format |
| 3. Bridge Most Dangerous | Does bridge feel like natural continuation, not sales pitch? | Pitch detector returns "jarring" or "pitch" |
| 4. Components Are Proof | Does each component carry its own proof package? | Components listed as features |
| 5. Value Before Price | Is value stack established before any price hint? | Price mentioned before total value |
| 6. Guarantee Named/Branded | Does guarantee have specific branded name? | Generic "money-back guarantee" |
| 7. Scarcity Justified | Is scarcity claim backed by real-world reason? | Naked urgency without justification |
| 8. Close Is Binary | Is binary choice (act vs. don't act) clearly established? | Soft close or middle-ground option |

---

## ANTI-SLOP ENFORCEMENT (PRODUCT INTRODUCTION SPECIFIC)

### Banned Phrases — Instant Rejection

**Bridge Poison:**
- "Now, let me introduce you to..."
- "Introducing [product name]"
- "Now available for the first time"
- "Finally, there's a solution"
- "That's where [product] comes in"

**Value Stack Poison:**
- "Amazing bonuses"
- "Incredible value"
- "Unbelievable savings"
- "Best deal ever"
- "No-brainer" (without proof)

**Guarantee Poison:**
- "Money-back guarantee" (unbranded)
- "If not satisfied, return for refund"
- "Satisfaction guaranteed" (generic)
- "Risk-free trial" (without specifics)

**Urgency Poison:**
- "Act now" (without justified reason)
- "Limited time offer" (without specifics)
- "Don't miss out"
- "Once in a lifetime opportunity"
- "This won't last"

**Price Reveal Poison:**
- "For a limited time only"
- "Special discount"
- "Exclusive offer"
- "Best price guaranteed"

---

## ARENA OUTPUT SCHEMA

```yaml
product_introduction_arena:
  execution_metadata:
    skill: "15-product-introduction"
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
        bridge_transition_type: string
        component_pattern_used: string
        value_technique_used: string

  judging_round:
    scores_by_candidate:
      - persona: string
        criterion_scores:
          bridge_smoothness: float
          positioning_impact: float
          component_proof: float
          value_stack: float
          price_psychology: float
          guarantee_positioning: float
          binary_choice: float
        weighted_score: float
        pitch_detector_result: string

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
    master_principles_check:
      all_eight_pass: boolean
      violations: [string]
    anti_slop_check:
      pass: boolean
      violations_found: [string]
    bridge_threshold_check:
      all_bridges_above_7: boolean
      flagged_bridges: [string]

  selected_output:
    final_draft: object  # winning draft (or synthesis)
    ready_for_layer_3: boolean
```

---

## INTEGRATION WITH LAYER 3

### Handoff Requirements

The Arena winner (or synthesis) passes to Layer 3 with:

1. **Complete bridge moment** — ready for integration with mechanism narrative handoff
2. **Product reveal draft** — positioning and uniqueness established
3. **Component section draft** — all components with proof packages
4. **Value stack preview** — bonuses introduced, ready for full value totaling
5. **Bridge quality score** — Layer 3 monitors for any degradation during refinement

### Layer 3 Refinement Scope

Layer 3 (Commercial Architecture) builds on Arena output:
- Constructs full price reveal with anchor cascade
- Finalizes guarantee branding and scarcity justification
- Calibrates 13-step emotional architecture
- Writes future pacing and binary choice setup

**Layer 3 MUST NOT:**
- Fundamentally change bridge approach
- Remove proof packages from components
- Reduce value stack
- Unbrand the guarantee

---

## QUALITY GATES

### Gate 2.5 (BLOCKING)

Arena Layer passes Gate 2.5 when:
- [ ] Human has explicitly selected one candidate (or synthesis)
- [ ] Selected candidate has weighted score >= 8.5
- [ ] Selected candidate has bridge smoothness >= 7.0
- [ ] All 8 master principles pass on selected candidate
- [ ] Anti-slop validation passes on selected candidate
- [ ] Selection is logged with rationale

**Failure Response:**
- If no candidate meets thresholds → additional generation round (max 3)
- If human rejects all candidates → request guidance on specific issues
- After 3 rounds without acceptable candidate → escalate to full human checkpoint

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-02-05 | AGENT TEAMS + EFFORT PROTOCOL: Added effort level and Agent Team mode references to execution protocol. See ARENA-CORE-PROTOCOL.md v2.0 and CLAUDE.md v3.1. |
| 2.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0: Added arena_mode: generative_full_draft (competitors write complete pieces from scratch, not variations of Layer 2 draft). Replaced Phase 1-4 execution protocol with reference to ARENA-CORE-PROTOCOL.md (3-round mandatory competition, adversarial critique-revise, 7 competitors including The Architect, learning briefs). Added critique-specific guidance. Updated all competitor counts from 6 to 7. Version bump. |
| 1.0 | 2026-02-03 | Initial Arena Layer for product introduction with 7 judging criteria (Bridge Smoothness 25%, Positioning Impact 15%, Component Proof 15%, Value Stack 15%, Price Psychology 10%, Guarantee Positioning 10%, Binary Choice 10%), 8 master principle compliance verification, pitch detector integration, bridge threshold enforcement |
