# Big Idea Skill — Master Agent (RSF-Driven Synthesis Mode)

**Version:** 5.1 (Expression Anchoring Protocol + Concept/Naming Separation + Soul.md Integration + Process Enforcement)
**Skill:** 06-big-idea
**Position:** Phase 1, Step 6 (Research & Strategy)
**Type:** RSF-Driven Synthesis + Creative Generation
**Dependencies:** 03-root-cause, 04-mechanism, 05-promise outputs, SOUL.md (project-level)
**RSF Dependencies (Required):** expectation_schema.json, latent_resonance_field.json (including FSSIT candidates), FSSIT-RANKING.md (standardized handoff from `~system/protocols/FSSIT-HANDOFF-TEMPLATE.md`)
**RSF Dependencies (Optional):** competitive_sophistication_audit.json, emotional_momentum.json
**Output:** big-idea-output.json

---

## RSF COMPLETE OVERHAUL (v4.0)

This version implements the **Resonant Surprise Framework (RSF)** as the foundational architecture for Big Idea generation. This is not an enhancement — it is a complete reimagining of how Big Ideas are created.

### Core Philosophy Change

**Before (v3.x):** Generate Big Ideas → Check for resonance and surprise
**After (v4.0):** Start from RESONANCE (FSSIT) → Layer in SURPRISE (schema violation) → Generate Big Ideas

### Key RSF Principles

1. **FSSIT-First Generation:** Big Ideas START from top "Finally Someone Said It" candidates from 2.8-B latent resonance analysis. Resonance is foundational, not retrofitted.

2. **Schema Distance Gating (Inverted-U):** Not all surprise is good. Optimal schema distance is 4-8 on a 10-point scale.
   - SD < 4: Reject (insufficient surprise)
   - SD 4-8: Optimize (sweet spot)
   - SD > 8: Flag for human review (may confuse)

3. **Multi-Variant Generation:** Generate 9+ candidates (3 emphasis strategies × 3+ variants each) to access the upper tail of the quality distribution.

4. **Separate Judge Context:** Generation and scoring happen in isolated contexts to prevent self-bias and gaming.

5. **Tournament-Style Selection:** Use pairwise comparison ("Is A better than B?") instead of absolute scoring (1-10) for subjective qualities like resonance.

6. **Quality Over Speed (10x):** Structural constraints prevent shortcuts. Minimum candidate counts, extended deliberation, quality gates that block progression.

### What RSF Requires

| Input | Source | Purpose |
|-------|--------|---------|
| expectation_schema.json | 2.8-A | Identifies saturated claims, whitespace zones, audience expectations |
| latent_resonance_field.json | 2.8-B | Contains FSSIT candidates, latent emotions, emotional momentum |
| rsf_metadata from upstream | 02, 03, 04 | RSF influence from root cause, mechanism, promise framing |

---

## Pre-Execution Protocol (v5.0)

```
BEFORE ANY BIG IDEA SKILL EXECUTION:
  1. READ this file (BIG-IDEA-AGENT.md) completely
  2. READ ~system/protocols/SOUL-MD-PROTOCOL.md (voice/taste constraint system)
  3. LOAD [project]/SOUL.md if it exists
     - IF exists: Extract voice_register, energy_signature, anti_voice, pacing_signature
     - IF status != "Finalized": WARN "Soul.md not finalized — taste constraints may be incomplete"
     - IF not exists: WARN "No Soul.md found — Big Idea generation will lack taste constraints"
  4. READ BIG-IDEA-ANTI-DEGRADATION.md
  5. Proceed to Layer 0
```

---

## Concept/Naming Separation Architecture (v5.0)

### Why Concept and Creative Wrapping Are Separated

**The Problem:** Previous versions generated Big Idea concepts AND creative wrappers/names simultaneously. This caused:
1. **Good names propping up weak concepts** — A clever creative wrapper can make a mediocre strategic synthesis look impressive
2. **Name attachment bias** — Once a concept has a catchy name/wrapper, it becomes harder to evaluate the underlying strategic synthesis objectively
3. **Anthony unable to evaluate strategic thinking** — When concepts arrive pre-wrapped with headlines and leads, it's impossible to judge whether the core RC + Mech + Promise + FSSIT synthesis is sound
4. **Wasted creative work** — If the concept is wrong, all the headlines, leads, and creative wrapping built on it are wasted

**The Fix:** Split Big Idea generation into two phases with a mandatory human checkpoint between them:

### Three-Phase Architecture

```
PHASE A: CONCEPT GENERATION (Layers 0-2A)
  Generate 5+ Big Idea CONCEPTS in plain language
  Each concept = a unique strategic synthesis of RC + Mech + Promise + FSSIT
  NO creative wrappers. NO headlines. NO leads.
  Focus: Is this STRATEGIC SYNTHESIS sound? Does it reorganize narrative? Does it violate schema?

         ↓

CONCEPT CHECKPOINT (BLOCKING — Human Approval Required)
  Present 5+ concepts in plain language
  Anthony evaluates the STRATEGIC THINKING, not the packaging
  Anthony selects 1-2 concepts to develop further
  Creates CONCEPT_APPROVED.yaml

         ↓

PHASE B: CREATIVE WRAPPING (Layers 2B-4)
  ONLY the approved concept(s) get wrapped
  Creative wrappers, Big Idea types, headlines (10+), leads (3+)
  Apply Soul.md voice constraints
  Full tournament selection, marketplace check
  Arena (if applicable)
```

### What Each Phase Produces

**Phase A Output (per concept):**
```yaml
concept:
  id: string
  plain_language_statement: string  # 1-2 sentences: what this Big Idea IS, in plain words
  fssit_anchor: string             # Which FSSIT candidate this builds from
  rc_angle: string                 # How root cause is used (plain language)
  mechanism_angle: string          # How mechanism is positioned (plain language)
  promise_angle: string            # How promise is framed (plain language)
  schema_violation: string         # What audience expectation this violates (plain language)
  nr_potential: string             # How this explains their past (plain language)
  soul_alignment: string           # How this fits the Soul.md voice/energy (if Soul.md exists)
  why_this_works: string           # 2-3 sentences on strategic rationale
```

**Phase B Output (for approved concept only):**
- Full Big Idea candidates with creative wrappers
- 10+ headlines per wrapper variant
- 3+ full leads per wrapper variant
- RSF scoring, tournament selection, marketplace check
- Proof architecture
- Handoffs to downstream skills

### Human Checkpoint Format

```markdown
## Big Idea Concept Candidates

### Concept 1: [Plain Language Title]

**The Big Idea in plain words:**
[1-2 sentences describing the strategic synthesis]

**FSSIT anchor:** [Which audience feeling this crystallizes]
**Root cause angle:** [How we're using the root cause]
**Mechanism angle:** [How we're positioning the mechanism]
**Promise angle:** [How we're framing the promise]
**Schema violation:** [What expectation this breaks]
**Narrative reorganization:** [How this explains their past]
**Soul.md alignment:** [How this matches the project voice — if Soul.md exists]

**Why this works strategically:** [2-3 sentences]

---

### Concept 2: [Plain Language Title]
[Same format]

---

[Continue for all 5+ concepts]

## Your Decision
Please select 1-2 concepts to develop into full Big Ideas with creative wrapping, headlines, and leads.
```

### CONCEPT_APPROVED.yaml Format

```yaml
concept_checkpoint:
  skill: "06-big-idea"
  timestamp: "[ISO timestamp]"
  concepts_presented: [count]
  concepts_approved:
    - concept_id: "[selected concept ID]"
      human_notes: "[any direction from Anthony]"
    - concept_id: "[optional second concept]"
      human_notes: "[notes]"
  concepts_rejected:
    - concept_id: "[rejected ID]"
      reason: "[why]"
  soul_md_loaded: [true/false]
```

---

## Purpose

SYNTHESIZE the outputs from Root Cause, Mechanism, and Promise skills into compelling Big Idea candidates using the **Resonant Surprise Framework** — creating concepts that are simultaneously unexpected (surprise) and deeply relevant (resonance).

**Success Criteria (v5.0 — Concept/Naming Separation + Soul.md):**
- Soul.md loaded (if exists) and constraints active
- RSF inputs loaded and validated
- ≥5 Big Idea CONCEPTS generated in plain language (Phase A)
- FSSIT-first generation protocol followed for all concepts
- Schema distance gating applied (all concepts SD 4-8 or flagged)
- Human checkpoint: concepts presented for approval BEFORE creative wrapping
- CONCEPT_APPROVED.yaml exists before Phase B begins
- Approved concept(s) wrapped with creative wrappers, headlines (10+), leads (3+)
- Tournament-style selection executed for creative variants
- Marketplace reality check passed
- Coherence validation passes (all components align)
- Top candidate RSF composite score ≥ 7.5
- Final human checkpoint with 5+ wrapped candidates presented
- Handoffs complete for downstream copy skills

**Critical Architecture (v5.0):** This skill is RSF-DRIVEN with mandatory concept approval. FSSIT candidates are the STARTING POINT. Concepts are approved in plain language BEFORE any creative wrapping occurs. Soul.md constrains all creative expression.

---

## Identity Boundaries

**This skill IS:**
- Big Idea synthesis from upstream strategic inputs
- Creative wrapper development
- Headline and lead generation
- Campaign coherence validation
- Big Idea type selection based on vault patterns

**This skill is NOT:**
- Root cause derivation (that's 03-root-cause)
- Mechanism development (that's 04-mechanism)
- Promise calibration (that's 05-promise)
- Deep research (that's 01-research)
- VSL structure mapping (that's 08-structure)
- Copy WRITING for the full promotion (downstream skills)

**Upstream dependencies:** Root Cause (02), Mechanism (03), Promise (04) must complete before this skill runs.

**Downstream consumers:** Offer (06), Structure (07), and all Phase 3 narrative skills depend on this skill's output.

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read + Soul.md load | haiku | File creation only |
| 0 | Input synthesis + RSF loading | haiku | Simple validation and loading |
| 1 | FSSIT mapping + type strategy | opus | Deep strategic analysis, FSSIT integration |
| 2A | Concept generation (5+ plain language concepts) | opus | Strategic synthesis — max quality |
| 2A-CP | **CONCEPT CHECKPOINT** (human approval) | — | Human decision point |
| 2B | Creative wrapping of approved concept(s) | opus | Creative generation — max quality |
| 2.7 | Transformation operators (SDS optimization) | opus | Schema distance reasoning |
| 3 | Tournament selection + RSF scoring + marketplace check | opus | Judgment-heavy multi-dimensional evaluation |
| 3.7 | Schema distance calculator | opus | Analytical calculation (CNI/BCI/LNI/IGC) |
| 3.8 | Anchor-to-distance ratio | opus | Resolution accessibility analysis |
| 2.5 | Arena (7 competitors × 2 rounds + audience evaluation) | opus | Maximum quality generation |
| 4 | Output packaging + handoffs | sonnet | Assembly from existing content |

### Layer 2.5: Arena (MANDATORY FILE READS)

**BEFORE generating ANY Arena competitor output, READ these files:**

1. `06-big-idea/ARENA-LAYER.md` — skill-specific criteria and weights
2. `~system/protocols/ARENA-CORE-PROTOCOL.md` — execution protocol
3. `~system/protocols/ARENA-PERSONA-PANEL.md` — persona specifications

**VERIFY personas match protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect**

**If personas don't match → HALT — FABRICATION DETECTED**

---

## FSSIT-First Generation Protocol (v4.0 Core)

**The fundamental inversion:** Previous versions generated Big Ideas then checked for resonance. v4.0 STARTS from resonance (FSSIT candidates) and BUILDS Big Ideas around them.

### Why FSSIT-First?

FSSIT ("Finally Someone Said It") candidates from 2.8-B represent statements that crystallize unspoken feelings the audience has but hasn't articulated. These create the "finally someone understands" response that drives conversion.

By starting from FSSIT:
- Resonance is foundational, not retrofitted
- We're saying what the audience NEEDS to hear, not just what we want to say
- Schema violation is layered ON TOP of deep emotional connection

### FSSIT-First Generation Steps (NR-Enhanced)

```
STEP 1: LOAD TOP FSSIT CANDIDATES (NR-PRIORITIZED)
  FROM latent_resonance_field.json:
    SELECT: Top 3 FSSIT candidates by:
      PRIMARY: narrative_reorganization_potential (NR ≥ 7 preferred)
      SECONDARY: momentum_adjusted_strength
    FILTER: Only candidates with temporal_relevance = "high" or "evergreen"
    FILTER: Only candidates with narrative_reorganization_potential ≥ 5
    DOCUMENT: Each FSSIT statement + its past_explaining_power

  NR PRIORITIZATION RATIONALE:
    FSSIT candidates with high NR already contain the "explains their past" power.
    By starting from high-NR FSSITs, Big Ideas inherit narrative reorganization
    as a foundational property rather than checking for it at scoring.

STEP 2: MAP FSSIT → DOMAIN-SPECIFIC STORY REFRAME
  FOR each FSSIT candidate:
    IDENTIFY: What domain-specific past does this FSSIT explain?
      - What history of struggle does it make sense of?
      - What past failures does it connect?
      - What self-blame does it remove?

    IDENTIFY: Which root cause framing AMPLIFIES this past-explaining power?
      - The root cause should be THE MISSING PIECE that explains their history

    IDENTIFY: Which mechanism positioning DELIVERS the story resolution?
      - The mechanism should be WHAT WAS MISSING all along

    IDENTIFY: Which promise variation COMPLETES the narrative?
      - "Now that you understand why [past], you can finally [future]"

    GENERATE: Big Idea angle that:
      - OPENS with or DELIVERS the FSSIT recognition
      - EXPLICITLY explains why their domain-specific past didn't work
      - VIOLATES expectation schema (from whitespace_zones)
      - CONNECTS root cause + mechanism + promise
      - COMPLETES the narrative: past struggle → explanation → new future

STEP 3: LAYER IN SCHEMA VIOLATION (v4.3 Enhanced with Transformation Operators)
  FROM expectation_schema.json:
    LOAD: whitespace_zones (unexploited messaging territory)
    LOAD: saturated_claims (what to AVOID)
    LOAD: expectation_patterns (what to VIOLATE)

  FOR each FSSIT-based Big Idea angle:
    SELECT: Which whitespace_zone to occupy
    SELECT: Which expectation_pattern to violate
    CALCULATE: Schema distance using 3.7-schema-distance-calculator (target: Calibrated SDS 3.6-5.6)

    IF Raw_SDS < 4.0 (pre-calibration):
      APPLY Transformation Operators from 2.7-transformation-operators.md:
        - INVERSION: Flip accepted wisdom to opposite claim
        - HIDDEN VARIABLE: Introduce unexpected causal factor
        - CATEGORY VIOLATION: Cross niche boundaries for fresh perspective
        - TEMPORAL SHIFT: Challenge timing assumptions
        - SCALE SHIFT: Challenge quantity assumptions
        - VILLAIN REFRAME: Recast trusted element as antagonist

      SELECT: Operator(s) most compatible with FSSIT resonance
      APPLY: Re-calculate SDS after transformation
      VERIFY: Transformation preserved FSSIT emotional core

    VERIFY: Schema violation ENHANCES rather than UNDERMINES the NR
      - Surprise should make the "past explained" moment MORE powerful
      - Not contradict the biographical coherence
    DOCUMENT: How surprise is layered onto resonance
    DOCUMENT: Which transformation operators applied (if any)

STEP 4: GENERATE VARIANTS (NR-PRESERVED)
  FOR each FSSIT-based angle:
    GENERATE: 3+ variants using different:
      - Big Idea types (mechanism, enemy, discovery, etc.)
      - Creative wrappers
      - Headline approaches

    FOR each variant:
      VERIFY: Does this variant preserve the FSSIT's past_explaining_power?
      VERIFY: Does the creative wrapper strengthen or weaken the NR?
      IF NR weakened: Revise variant to restore narrative reorganization power
```

### Why NR-First in FSSIT Selection Matters

Starting from FSSIT candidates with high narrative_reorganization_potential ensures:

1. **Resonance is foundational** — We're saying what they need to hear
2. **Past-explaining is foundational** — We're explaining why their past makes sense
3. **NR is inherited, not retrofitted** — Big Ideas built from high-NR FSSITs naturally have high NR
4. **Rich's "confirms, amplifies, names, connects" is baked in** — Not checked at the end

**The difference:**
- Option A (scoring only): Generate Big Ideas → Check NR score → Flag low NR
- Option B (FSSIT-first): Start from high-NR FSSITs → NR is foundational → Verify preservation

Option B produces higher-quality NR because the past-explaining power is the STARTING POINT, not a validation check.

### FSSIT Integration Examples

| FSSIT Candidate | Schema Violation | Big Idea Synthesis |
|-----------------|------------------|-------------------|
| "I wish someone would just tell me what actually works" | Expectation: Complex multi-step systems | "The Single Switch That [Promise]" — Violates complexity expectation while delivering FSSIT desire for simplicity |
| "I'm tired of feeling like it's my fault" | Expectation: Self-improvement framing | "The Hidden [Villain] Sabotaging Your [Goal]" — Removes self-blame (FSSIT) via enemy reveal (surprise) |
| "Nothing works for people like me" | Expectation: One-size-fits-all solutions | "The [Unique Factor] Protocol for [Specific Identity]" — Validates uniqueness (FSSIT) via identity-based mechanism (surprise) |

---

## Schema Distance Gating (Inverted-U Principle)

**Key Insight from Research:** The relationship between surprise and effectiveness is an INVERTED U. Moderate surprise (SD 4-8) maximizes engagement. Extreme surprise (SD 9-10) produces confusion or rejection.

### Schema Distance Scale

| SD | Interpretation | Audience Response | Action |
|----|---------------|-------------------|--------|
| 1-3 | Highly conventional | "I've heard this before" | REJECT — insufficient surprise |
| 4-5 | Moderate violation | "That's interesting..." | ACCEPTABLE — optimize resonance |
| 6-7 | Strong violation | "Wait, what? Tell me more!" | OPTIMAL — sweet spot |
| 8 | Significant violation | "That's surprising..." | ACCEPTABLE — verify resolution |
| 9-10 | Extreme violation | "That doesn't make sense" | FLAG — requires human review |

### Schema Distance Calculation

**v4.3 Enhanced:** Schema distance is now calculated using a three-index composite calibrated by information gap. See [3.7-schema-distance-calculator.md](skills/layer-3/3.7-schema-distance-calculator.md) for full implementation.

**Three-Index Composite (CNI + BCI + LNI):**
- **CNI (Claim Novelty Index):** 0-10 scale measuring claim frequency vs. competitors
- **BCI (Belief Contradiction Index):** 0-10 scale measuring market truth contradictions
- **LNI (Linguistic Novelty Index):** 0-10 scale measuring vocabulary/framing/metaphor novelty

**Calibration via IGC (Information Gap Calibration):**
Based on Loewenstein's Curiosity Gap Theory — too small = boring, too large = confusion.

```
CALCULATE schema_distance FOR each candidate:

  STEP 1: Calculate Raw Component Indices
    CNI = (10 - competitor_frequency_score)  # Higher = more novel
    BCI = count(contradicted_market_truths) × weight  # Higher = more contrarian
    LNI = (vocabulary + framing + metaphor) / 3  # Average of novelty dimensions

  STEP 2: Calculate Raw Schema Distance Score
    Raw_SDS = (CNI + BCI + LNI) / 3

  STEP 3: Calculate Information Gap Calibration
    IGC = f(gap_openness, resolution_signal, bridge_elements)  # 0-10 scale

  STEP 4: Apply IGC Calibration
    Calibrated_SDS = Raw_SDS × (IGC / 5)
    # IGC = 5 → no change; IGC < 5 → reduces SDS; IGC > 5 → amplifies SDS

  OPTIMAL ZONE: Calibrated SDS 3.6-5.6
    Below 3.6: Reject (insufficient surprise)
    3.6-5.6: Accept (optimal engagement zone)
    Above 5.6: Flag for human review (may exceed resolution capacity)
```

**Transformation Operators:** When candidates fall below optimal SDS, apply operators from [2.7-transformation-operators.md](skills/layer-2/2.7-transformation-operators.md) to systematically increase schema distance.

### Gating Logic

```
FOR each Big Idea candidate:
  CALCULATE: schema_distance

  IF schema_distance < 4:
    DECISION: REJECT
    REASON: "Insufficient surprise — too conventional"
    ACTION: Do not proceed to scoring
    GUIDANCE: "Layer in expectation violation from whitespace_zones"

  IF schema_distance >= 4 AND schema_distance <= 8:
    DECISION: PROCEED
    ACTION: Continue to RSF scoring

  IF schema_distance > 8:
    DECISION: FLAG_FOR_REVIEW
    REASON: "Extreme schema distance — may confuse audience"
    ACTION: Include in output but mark as requiring human judgment
    GUIDANCE: "Verify audience can resolve surprise in <3 seconds"
```

### Resolution Accessibility Check

**v4.3 Enhanced:** Resolution accessibility is now quantified via Anchor-to-Distance Ratio. See [3.8-anchor-distance-ratio.md](skills/layer-3/3.8-anchor-distance-ratio.md) for full implementation.

For candidates with Calibrated SDS above 4.5, verify resolution accessibility via ADR:

```
RESOLUTION_CHECK (ADR-Enhanced):

  STEP 1: Calculate Total Anchoring Score
    Five Anchoring Dimensions (each 0-10):
      - Authority Anchoring: Recognized sources, credentials, institutional backing
      - Evidence Anchoring: Specificity, verifiability, demonstration potential
      - Linguistic Anchoring: Familiar vocabulary, category-appropriate framing
      - Social Anchoring: Testimonials, case studies, tribal validation
      - Incremental Anchoring: Logical bridges, stepping stones, gradual reveals

    Total_Anchoring_Score = Σ(dimension_scores)  # Max 50

  STEP 2: Calculate Anchor-to-Distance Ratio
    ADR = Total_Anchoring_Score / (Calibrated_SDS × 10)

  STEP 3: Interpret ADR for RSF Resolution Accessibility
    ADR < 0.8:  RA = 1-3 (DANGER: Insufficient anchoring for distance)
    ADR 0.8-1.2: RA = 4-5 (Borderline: May work with strong audience)
    ADR 1.2-2.0: RA = 6-8 (OPTIMAL: Surprise well-supported by anchors)
    ADR > 2.0:  RA = 9-10 (Over-anchored: May feel too safe, reduce SDS impact)

  ACTIONS:
    IF ADR < 0.8:
      REVISE: Add anchoring elements OR reduce SDS
      FLAG: "Insufficient anchoring for schema distance"

    IF ADR > 2.0:
      CONSIDER: Increase SDS (idea may be under-leveraging novelty)
      NOTE: This is optimization, not failure

LEGACY QUICK-CHECK (still valid for rough assessment):
  QUESTION: "Can the target audience 'get' this in <3 seconds?"
  FACTORS:
    - Is the connection to their experience obvious?
    - Is the violation surprising but logical in hindsight?
    - Does the promise provide immediate resolution?
```

---

## Narrative Reorganization Scoring (NR) — Fifth RSF Dimension

**Key Insight from Rich Schefren:** The best Big Ideas don't just resonate with present emotions — they **reorganize the audience's domain-specific biographical narrative**. They make past struggles make sense. They confirm, amplify, name, and connect disparate experiences into a coherent story.

**CRITICAL: Domain-Specific, Not Whole-Life**

NR applies to the audience's story **within the domain the product addresses**, not their entire life:

| Domain | What NR Reorganizes |
|--------|---------------------|
| **Financial (End of America)** | Their feelings about the country, economics, retirement, their financial future — why their investments haven't worked, why they feel uneasy |
| **Golf (Slice fix)** | Their feelings about their swing, their history with the slice, why lessons/tips haven't worked, their identity as a golfer |
| **Health (Diet)** | Their health journey, why diets failed, why they've struggled with weight, their relationship with food |
| **Relationships** | Their relationship history, why past relationships failed, why they've had bad breakups, their patterns in love |

The Big Idea doesn't need to change their whole worldview — it changes their **domain-specific worldview** in a way that makes their history within that domain suddenly make sense.

### What Narrative Reorganization Measures

A Big Idea with high NR:
1. **Explains their domain-specific past** — "Oh, THAT'S why X never worked for me"
2. **Removes self-blame within the domain** — "It's not that I lack willpower / am broken at THIS"
3. **Creates domain-specific biographical coherence** — Disparate failures in this area now form a pattern
4. **Installs new domain-specific self-concept** — "I'm not someone who can't succeed at golf; I'm someone who was missing Y"
5. **Produces the FSSIT response** — "I always knew this about my [domain] struggles but couldn't articulate it"

### NR Scoring Scale

| NR Score | Description | Audience Response |
|----------|-------------|-------------------|
| 1-3 | No biographical relevance | "This could be anyone's problem" |
| 4-5 | Some past-explaining power | "I guess that could explain some things" |
| 6-7 | Strong reorganization | "This explains my whole history with [domain]" |
| 8-10 | Complete narrative transformation | "I always knew this but couldn't put my finger on it — now my entire story makes sense" |

### NR Scoring Calculation

```
CALCULATE narrative_reorganization FOR each candidate:

  BASE_SCORE = 5 (neutral starting point)

  ADJUSTMENTS:
    IF Big Idea explains WHY past attempts failed: +2
    IF Big Idea removes self-blame via external villain: +1
    IF Big Idea creates "I always knew it" recognition: +2
    IF Big Idea connects to FSSIT candidate from 2.8-B: +1
    IF Big Idea only addresses current state (not past): -2
    IF Big Idea implies personal failing: -1

  FINAL_NR = BASE_SCORE + sum(ADJUSTMENTS)
  CLAMP: 1-10 range
```

### NR Optimization (Unlike SD, Higher is Better)

Unlike Schema Distance (where 4-8 is optimal due to inverted-U), Narrative Reorganization does NOT have a "too high" problem. More biographical coherence is always better.

- **NR < 4:** WEAK — Consider strengthening past-explaining power
- **NR 4-6:** ACCEPTABLE — Big Idea has some narrative reorganization
- **NR 7-10:** STRONG — Big Idea creates meaningful worldview shift

### NR Integration with FSSIT-First Protocol

FSSIT candidates naturally have high NR potential because they crystallize unspoken feelings. When building Big Ideas from FSSIT:

```
FOR each FSSIT-based Big Idea:
  VERIFY: Does the Big Idea preserve the FSSIT's past-explaining power?
  VERIFY: Does the Big Idea add the "why past didn't work" dimension?
  VERIFY: Does the Big Idea remove self-blame or provide external cause?

  IF all verified: NR likely ≥ 7
  IF any missing: Revise to strengthen biographical narrative connection
```

---

## Multi-Variant Generation (Upper Tail Access)

**Key Insight from Research:** The upper tail of creative quality EXISTS in LLM output distribution. The challenge is TARGETING it. Multi-variant generation with intelligent selection surfaces exceptional outputs that single-pass generation misses.

### Generation Strategy

```
MANDATORY: Generate ≥9 candidates (minimum)
RECOMMENDED: Generate 12-15 candidates for robust selection

APPROACH: 3 Emphasis Strategies × 3+ Variants Each

STRATEGY A: RESONANCE-HEAVY (FSSIT-dominant)
  Focus: Maximize emotional connection
  FSSIT: Central to Big Idea
  Schema violation: Moderate (SD 4-6)
  Generate: 3+ variants

STRATEGY B: SURPRISE-HEAVY (Schema-dominant)
  Focus: Maximize unexpectedness
  FSSIT: Supporting element
  Schema violation: Strong (SD 6-8)
  Generate: 3+ variants

STRATEGY C: BALANCED (Equal weight)
  Focus: Optimize both dimensions
  FSSIT: Integrated
  Schema violation: Moderate-strong (SD 5-7)
  Generate: 3+ variants
```

### Variant Diversity Requirements

Each strategy MUST produce variants with:
- Different Big Idea types (mechanism, enemy, discovery, etc.)
- Different creative wrappers
- Different headline angles
- Different lead approaches

**CONSTRAINT:** No two variants may share the same Big Idea type AND creative wrapper combination.

---

## Tournament-Style Selection (Judge Architecture)

**Key Insight:** Absolute scoring (1-10) is unreliable for subjective qualities like "resonance" and "surprise." Pairwise comparison ("Is A better than B?") produces more consistent rankings.

### Selection Architecture

```
PHASE 1: PRE-FLIGHT DISQUALIFICATION
  FILTER: Remove candidates that obviously fail
    - SD < 4 (insufficient surprise)
    - Missing FSSIT connection
    - Coherence failures
    - Slop density > 2.0

PHASE 2: TOURNAMENT ROUNDS
  STRUCTURE: Single-elimination tournament
  COMPARISON: Head-to-head on four dimensions

  FOR each pairing:
    EVALUATE dimension by dimension:
      1. "Which better satisfies the Gift Test?"
         (Would this feel like receiving something valuable?)
      2. "Which creates stronger 'finally someone said it' response?"
         (FSSIT resonance)
      3. "Which is more surprising while remaining resolvable?"
         (Schema distance + resolution)
      4. "Which better explains their past and reorganizes their story?"
         (Narrative reorganization)

    WINNER: Best 3 of 4 dimensions advances (or 2 of 4 with NR tiebreaker)

PHASE 3: FINAL RANKING
  TOP 5 candidates advance to human checkpoint
  DOCUMENT: Tournament path for each finalist
  DOCUMENT: Why losers lost (specific dimension failures)
```

### Judge Perspectives (Multi-Perspective Evaluation)

For critical comparisons, evaluate from four perspectives:

1. **The Audience Surrogate**
   Question: "Would this make ME feel seen if I were the target?"
   Focus: Resonance depth, emotional accuracy

2. **The Skeptic**
   Question: "Is this actually surprising or just differently-worded familiar?"
   Focus: Schema distance, genuine novelty

3. **The Practitioner**
   Question: "Does this connect to something real or is it clever-but-empty?"
   Focus: Truth grounding, mechanism credibility

4. **The Biographer**
   Question: "Does this explain their past and change how they see their story?"
   Focus: Narrative reorganization, past-explaining power, biographical coherence

### Judge Context Isolation

**CRITICAL:** The judge evaluates candidates WITHOUT seeing:
- Generation prompts
- "Intended" quality markers
- Other candidates' scores during evaluation
- Strategy labels (A, B, C)

The judge sees ONLY:
- The candidates themselves
- RSF research (expectation_schema, latent_resonance_field)
- Scoring rubric
- Upstream inputs (root cause, mechanism, promise)

This prevents:
- Self-bias (model preferring what it "meant" to create)
- Score gaming (optimizing for rubric rather than quality)
- Cross-contamination (letting one candidate's score affect another's)

---

## Marketplace Reality Check (v4.2 — Dual Evaluation Layer)

**Key Insight from Rich Schefren's Webinar Arena:** The tournament evaluates whether candidates follow methodology correctly. But methodology correctness ≠ marketplace effectiveness. Something can score high on every RSF dimension and still not convert.

**The Gap This Addresses:** Previous evaluation conflated two different questions:
1. "Does this follow the methodology correctly?" (RSF dimensions, constraints)
2. "Would this actually sell?"

These are related but not identical. The Marketplace Reality Check adds an adversarial final gate.

### Marketplace Reality Check Protocol

```
PHASE: FINAL GATE (After Tournament, Before Human Checkpoint)

FOR top 5 tournament finalists:

  EVALUATE from cold-read perspective:
    - Read the Big Idea as a prospect would — no methodology context
    - Forget RSF scores, FSSIT connections, and NR calculations
    - Encounter it FRESH

  ANSWER three questions:
    1. "Would I actually stop scrolling for this?"
       - Not "is this technically surprising" but "would this grab me?"

    2. "Does this feel like something I'd share or remember?"
       - The hallmark of resonance that WORKS, not resonance that SCORES

    3. "Or does it feel like 'marketing'?"
       - The smell test: Does this feel like someone selling, or someone who understands?

  MARKETPLACE FLAGS:
    - "Technically correct but practically inert" — High RSF, low grab
    - "Clever-sounding" — Optimized for the rubric, not the prospect
    - "Marketing smell" — Triggers prospect defenses despite RSF scores

  FOR each finalist:
    RECORD: marketplace_reality_check
      passed_cold_read: boolean
      would_stop_scrolling: boolean
      would_share_or_remember: boolean
      marketing_smell_detected: boolean
      marketplace_notes: string  # What worked/didn't from cold perspective

  FLAGGING:
    IF passed_cold_read = false AND rsf_composite > 7.5:
      FLAG: "High RSF but failed marketplace check — methodology/effectiveness gap"
      ACTION: Include in human checkpoint with explicit flag
      GUIDANCE: "This scored well on methodology but may not work in market"
```

### Why This Matters

The RSF dimensions measure whether a Big Idea is:
- Surprising (SD)
- Resonant (RD)
- Comprehensible (RA)
- Timely (TF)
- Narrative-reorganizing (NR)

But none of these directly measure: **"Would a real prospect actually respond to this?"**

High RSF + Failed Marketplace Check = Red flag that the Big Idea was optimized for the evaluation system rather than the actual audience.

### Marketplace Check vs. Audience Surrogate Judge

| Audience Surrogate (Tournament) | Marketplace Reality Check (Final Gate) |
|--------------------------------|---------------------------------------|
| Evaluates WITH methodology context | Evaluates WITHOUT methodology context |
| Asks "Would this make me feel seen?" | Asks "Would this make me stop scrolling?" |
| Comparative (A vs B) | Absolute (pass/fail for each) |
| Part of tournament selection | After tournament selection |
| Methodology-informed judgment | Cold-read judgment |

The Marketplace Reality Check catches Big Ideas that "look right" to the methodology but wouldn't actually work.

---

## Learning Ledger (v4.2 — Calibration Loop)

**Key Insight from Rich Schefren's Webinar Arena:** Evaluation systems drift over time unless calibrated against real-world outcomes. The Arena maintains a "learning ledger" that tracks whether internal judgments correlated with actual results.

**The Gap This Addresses:** The CopywritingEngine evaluates Big Ideas but never learns whether those evaluations were accurate. Without feedback, the system can drift toward patterns that "look right" but don't actually convert.

### Calibration Record (Per Big Idea Output)

Every Big Idea output now includes a calibration record for future feedback:

```yaml
calibration_record:
  # Identification
  big_idea_id: string  # Unique identifier for tracking
  project_id: string   # Which project this belongs to
  generation_date: date

  # Internal Predictions (at generation time)
  predicted_winner: string  # Which candidate we recommended
  rsf_scores:
    schema_distance: integer
    resonance_depth: integer
    resolution_accessibility: integer
    temporal_fit: integer
    narrative_reorganization: integer
    rsf_composite: float
  marketplace_check_passed: boolean
  tournament_path: string  # How this candidate won
  confidence_level: float  # How confident was the system?

  # Actual Outcomes (to be updated when known)
  actual_outcome:
    was_used: null | boolean  # Did the client actually use this Big Idea?
    performance_data: null | object  # Click rates, conversion, etc.
    client_feedback: null | string  # Qualitative feedback
    outcome_date: null | date

  # Calibration Analysis (calculated post-outcome)
  calibration:
    prediction_accuracy: null | float  # Did high-RSF predict high-performance?
    dimension_accuracy:  # Which RSF dimensions predicted well?
      sd_correlated: null | boolean
      rd_correlated: null | boolean
      ra_correlated: null | boolean
      tf_correlated: null | boolean
      nr_correlated: null | boolean
    marketplace_check_accuracy: null | boolean  # Did cold-read predict outcome?
    judge_accuracy:  # Which judge perspectives were most predictive?
      audience_surrogate: null | float
      skeptic: null | float
      practitioner: null | float
      biographer: null | float
    learning_note: null | string  # What did we learn from this outcome?
```

### How the Learning Ledger Works

```
PHASE 1: RECORD (At Generation Time)
  FOR each Big Idea output:
    GENERATE: Unique big_idea_id
    RECORD: All RSF scores, predictions, confidence levels
    RECORD: Which candidate won and why
    RECORD: Marketplace check results
    LEAVE: actual_outcome fields as null

PHASE 2: UPDATE (When Outcomes Available)
  WHEN actual performance data is available:
    RETRIEVE: calibration_record by big_idea_id
    UPDATE: actual_outcome section with real data
    CALCULATE: prediction_accuracy
    CALCULATE: dimension_accuracy for each RSF dimension
    CALCULATE: judge_accuracy for each perspective

PHASE 3: LEARN (Periodic Analysis)
  AGGREGATE: calibration_records across projects
  IDENTIFY: Which RSF dimensions correlate most with actual performance
  IDENTIFY: Which judge perspectives are most predictive
  IDENTIFY: Systematic biases (e.g., "high NR consistently underperforms predictions")
  ADJUST: Judge weighting based on accuracy history
  DOCUMENT: learning_note for each significant finding
```

### Calibration Questions the Ledger Answers

Over time, the Learning Ledger enables answering:

1. **"Are our RSF scores predictive?"**
   - Does high RSF composite actually correlate with high performance?
   - Which individual dimensions (SD, RD, RA, TF, NR) are most predictive?

2. **"Are our judges calibrated?"**
   - Is the Audience Surrogate perspective more predictive than the Skeptic?
   - Is the Biographer (NR) perspective adding signal or noise?

3. **"Is the Marketplace Reality Check working?"**
   - Do Big Ideas that pass cold-read actually perform better?
   - Should we weight marketplace check more heavily?

4. **"Where do we systematically over/under-estimate?"**
   - Do we consistently overrate certain Big Idea types?
   - Do certain markets perform differently than our predictions?

### Why This Creates Accountability

Without the Learning Ledger:
- Evaluation → Output → No feedback → Drift toward "looks right"

With the Learning Ledger:
- Evaluation → Output → **Outcome data** → Calibration → **Adjusted evaluation**

The Learning Ledger creates a closed loop. Over time, the system learns which evaluation patterns actually predict success.

---

## What Changed in v3.0

### Removed (Now Handled Upstream)
- ~~Deep Research Loading~~ → Skill 01-research
- ~~Proof Inventory~~ → Skill 02-proof-inventory
- ~~Root Cause Development~~ → Skill 03-root-cause
- ~~Mechanism Development~~ → Skill 04-mechanisms
- ~~Promise Calibration~~ → Skill 05-promise

### Retained (This Skill's Core Function)
- Vault pattern analysis (for Big Idea type selection)
- Big Idea candidate generation (synthesis of inputs)
- Headline/lead generation (creative expression)
- Validation and packaging

### New (v3.0)
- Upstream package consumption
- Synthesis operations
- Campaign coherence validation

---

## The Synthesis Operation

Big Idea = **Root Cause Reframe** + **Unique Mechanism** + **Calibrated Promise** + **Creative Wrapper**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BIG IDEA SYNTHESIS                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
     ┌──────────────────────────────┼──────────────────────────────┐
     │                              │                              │
     ▼                              ▼                              ▼
┌──────────────┐           ┌──────────────┐           ┌──────────────┐
│ ROOT CAUSE   │           │  MECHANISM   │           │   PROMISE    │
│  PACKAGE     │           │   PACKAGE    │           │   PACKAGE    │
│              │           │              │           │              │
│ • Villain    │           │ • Name       │           │ • Statement  │
│ • Reframe    │           │ • Superiority│           │ • Thesis     │
│ • Countersell│           │ • Scorecard  │           │ • Variations │
└──────────────┘           └──────────────┘           └──────────────┘
     │                              │                              │
     └──────────────────────────────┼──────────────────────────────┘
                                    ▼
                     ┌───────────────────────────┐
                     │     BIG IDEA ENGINE       │
                     │                           │
                     │ + Vault Pattern Library   │
                     │ + Big Idea Type Selection │
                     │ + Creative Wrapper        │
                     │ + Headline/Lead Gen       │
                     └─────────────┬─────────────┘
                                   ▼
                     ┌───────────────────────────┐
                     │   BIG IDEA CANDIDATES     │
                     │   (5+ variations)         │
                     └───────────────────────────┘
```

---

## Input Schema

```yaml
big_idea_input:
  # FROM 02-ROOT-CAUSE
  from_root_cause:
    surface_problem: string
    real_root_cause: string
    root_cause_method: enum  # Which of 6 methods used
    villain:
      name: string
      type: string
      what_it_does: string
      how_it_sabotages: string
    countersells:
      why_dieting_fails: string
      why_exercise_fails: string
      why_competitors_fail: string
      only_solution_narrative: string
    key_reframe_lines: [string]
    villain_dramatization_lines: [string]

  # FROM 03-MECHANISM
  from_mechanism:
    mechanism_name: string
    mechanism_type: enum
    superiority_claim: string
    what_it_does: string
    how_it_works_simplified: string
    villain_defeat_action: string
    scorecard:
      image_strength: integer
      simplicity: integer
      proof: integer
      differentiation: integer
      composite: float
    naming_elements: [string]
    metaphor_options: [string]

  # FROM 04-PROMISE
  from_promise:
    primary_promise:
      statement: string
      promise_type: enum
      specificity_markers: object
    campaign_thesis: string
    variations:
      bold_version: string
      safe_version: string
      question_version: string
    quality_gates:
      is_specific: boolean
      is_believable: boolean
      is_provable: boolean
      is_mechanism_aligned: boolean

  # FROM 00-DEEP-RESEARCH (Market Context)
  from_deep_research:
    schwartz_stage: integer (1-5)
    market_psychology:
      dominant_emotion: string
      hope_level: integer
      skepticism_level: integer
    competitive_landscape:
      saturated_big_ideas: [string]
      saturated_mechanisms: [string]
      whitespace_opportunities: [string]
    customer_language:
      how_they_describe_problem: [string]
      how_they_describe_success: [string]

  # VAULT REFERENCE (for pattern matching, not generation)
  vault_context:
    relevant_swipe_ids: [string]  # Pre-filtered for niche
    big_idea_type_distribution: object  # From vault analysis
    top_performing_patterns: [object]
```

---

## Output Schema

```yaml
big_idea_output:
  # Summary
  summary:
    total_candidates: integer
    recommended_candidate: string  # ID of top candidate
    big_idea_type_used: string
    differentiation_score: float
    campaign_coherence_score: float

  # Big Idea Candidates (5+)
  candidates:
    - id: string
      big_idea_statement: string        # The one-sentence Big Idea
      big_idea_type: enum[mechanism, enemy, discovery, transformation, prophecy, identity]

      components:
        root_cause_angle: string        # How we're using the root cause
        mechanism_angle: string         # How we're positioning the mechanism
        promise_angle: string           # How we're framing the promise
        creative_wrapper: string        # The unique creative framing

      headlines:
        - headline: string
          headline_type: string
          vault_inspiration: string     # Swipe ID that inspired this
        # ... 10+ headlines per candidate

      leads:
        - lead_type: enum[story, problem_agitation, revelation, question, statistic]
          full_lead: string             # 200-500 words, fully written
          hook_sentence: string
        # ... 3+ leads per candidate

      proof_architecture:
        lead_proof: string
        mechanism_proof: string
        body_proof_sequence: [string]
        close_proof: string

      scores:
        novelty: integer (1-10)         # How fresh vs. market
        coherence: integer (1-10)       # How well components fit
        emotional_impact: integer (1-10)
        differentiation: integer (1-10)
        composite: float

  # Campaign Coherence Check
  coherence_validation:
    root_cause_to_mechanism: boolean    # Does RC naturally lead to mechanism?
    mechanism_to_promise: boolean       # Does mechanism deliver promise?
    promise_to_big_idea: boolean        # Does big idea express promise?
    villain_consistent: boolean         # Same villain throughout?
    thesis_aligned: boolean             # Big Idea matches campaign thesis?
    all_pass: boolean

  # Handoffs
  handoffs:
    to_headlines:
      recommended_headlines: [object]
      headline_strategies: [string]
    to_leads:
      recommended_leads: [object]
      lead_approach: string
    to_vsl_structure:
      big_idea_for_vsl: string
      proof_sequence: [string]
      mechanism_reveal_strategy: string

  # RSF v4.0: Comprehensive RSF Metadata
  rsf_metadata:
    rsf_inputs_loaded:
      expectation_schema: boolean
      latent_resonance_field: boolean
      fssit_candidates_count: integer

    generation_protocol:
      fssit_first_followed: boolean
      fssit_candidates_used: [string]  # The FSSIT statements that anchored generation
      strategies_executed:
        resonance_heavy_count: integer
        surprise_heavy_count: integer
        balanced_count: integer
      total_candidates_generated: integer

    schema_distance_distribution:
      rejected_sd_below_4: integer
      accepted_sd_4_to_8: integer
      flagged_sd_above_8: integer
      average_sd_accepted: float

    selection_process:
      tournament_executed: boolean
      tournament_rounds: integer
      finalist_count: integer
      judge_perspectives_used: [string]

    top_candidate_rsf_scores:
      schema_distance: integer (1-10)
      resonance_depth: integer (1-10)
      resolution_accessibility: integer (1-10)
      temporal_fit: integer (1-10)
      narrative_reorganization: integer (1-10)
      rsf_composite: float  # SD×RD×RA×TF×NR / 10000

    fssit_alignment:
      primary_fssit_used: string
      alignment_strength: integer (1-10)
      fssit_integration_type: enum[opens_with, delivers, frames_around]

    whitespace_occupation:
      whitespace_zone_occupied: string
      expectations_violated: [string]
      differentiation_from_saturated: string

    quality_over_speed_compliance:
      minimum_candidates_met: boolean
      tournament_selection_used: boolean
      human_checkpoint_prepared: boolean
      shortcuts_blocked: [string]  # List of shortcuts that were structurally prevented

    # v4.2: Marketplace Reality Check
    marketplace_reality_check:
      finalists_checked: integer
      passed_cold_read: [string]  # IDs of candidates that passed
      failed_cold_read: [string]  # IDs that failed despite high RSF
      methodology_effectiveness_gaps: [string]  # Candidates flagged for gap

    # v4.2: Learning Ledger (Calibration Record)
    calibration_record:
      big_idea_id: string
      project_id: string
      generation_date: date
      predicted_winner: string
      predicted_rsf_composite: float
      marketplace_check_passed: boolean
      confidence_level: float
      # actual_outcome: null (to be updated when performance data available)
      # calibration: null (to be calculated post-outcome)
```

---

## Microskill Layers (v5.0 — Concept/Naming Separation)

| Layer | Purpose | Document |
|-------|---------|----------|
| **Layer 0.0.1** | Vertical Profile Loader — Load vertical config (persona panel, specimens, taste defaults, anti-slop) | [0.0.1-vertical-profile-loader.md](skills/layer-0/0.0.1-vertical-profile-loader.md) |
| **Layer 0** | Input Loading + Coherence Check + Soul.md Loading | [L0-INPUT-SYNTHESIS.md](skills/layer-0/L0-INPUT-SYNTHESIS.md) |
| **Layer 0.2.7** | Persona Voice Loading (System 2 Arena calibration) | [0.2.7-persona-voice-loader.md](skills/layer-0/0.2.7-persona-voice-loader.md) |
| **Layer 0.2.8** | TIER1 Expression Reference Loading (Big Idea patterns) | [0.2.8-tier1-expression-reference.md](skills/layer-0/0.2.8-tier1-expression-reference.md) |
| **Layer 1** | Big Idea Type Selection + Strategy | [L1-TYPE-STRATEGY.md](skills/layer-1/L1-TYPE-STRATEGY.md) |
| **Layer 2A** | **Concept Generation** (5+ plain language concepts) | [L2-CANDIDATE-GENERATION.md](skills/layer-2/L2-CANDIDATE-GENERATION.md) |
| **CHECKPOINT** | **CONCEPT CHECKPOINT** — Human approves concept(s) before creative wrapping | CONCEPT_APPROVED.yaml |
| **Layer 2B** | **Creative Wrapping** (approved concept only — wrappers, headlines, leads) | [L2-CANDIDATE-GENERATION.md](skills/layer-2/L2-CANDIDATE-GENERATION.md) |
| **Layer 2.7** | Transformation Operators (SDS Optimization) | [2.7-transformation-operators.md](skills/layer-2/2.7-transformation-operators.md) |
| **Layer 3** | Validation + Scoring + Tournament + Marketplace Check | [L3-VALIDATION-SCORING.md](skills/layer-3/L3-VALIDATION-SCORING.md) |
| **Layer 3.7** | Schema Distance Calculator (CNI/BCI/LNI/IGC) | [3.7-schema-distance-calculator.md](skills/layer-3/3.7-schema-distance-calculator.md) |
| **Layer 3.8** | Anchor-to-Distance Ratio (RA Enhancement) | [3.8-anchor-distance-ratio.md](skills/layer-3/3.8-anchor-distance-ratio.md) |
| **Layer 3.9** | Expression Anchoring Score (Data-Grounded Validation) | [3.9-expression-anchoring-score.md](skills/layer-3/3.9-expression-anchoring-score.md) |
| **Layer 4** | Output Packaging + Handoffs | [L4-OUTPUT-PACKAGING.md](skills/layer-4/L4-OUTPUT-PACKAGING.md) |

### Layer-1 Chain-of-Refinement Protocol

AFTER Layer 1 skill execution, IF any output scores below threshold:

```
REFINEMENT_LOOP:
  IF selected_output.confidence_score < 0.75 OR quality_score < 7.0:
    1. DIAGNOSE: Identify which scoring dimension(s) failed
       - Classification confidence too low?
       - Insufficient evidence for selection?
       - Competing options too close in score?

    2. ADJUST: Modify parameters based on diagnosis
       - If confidence low → narrow candidate pool
       - If evidence weak → request additional vault context
       - If tie-breaker needed → apply domain-specific heuristics

    3. RE-EXECUTE: Generate new candidates with adjusted parameters
       - MUST use different seed/approach than first pass
       - MUST NOT simply re-run identical query

    4. RE-SCORE: Evaluate new candidates against same rubric

    5. ITERATION_LIMIT: 3 attempts maximum
       IF still below threshold after 3 iterations:
         LOG: "Layer-1 refinement exhausted. Escalating to human review."
         FLAG: output for human checkpoint
         PROCEED: with best available candidate (clearly marked as below-threshold)
```

NEVER proceed to Layer 2 with unvalidated Layer-1 output.
MUST document any below-threshold outputs that proceed after exhausting refinement.

---

### FSSIT Loading Gate (BLOCKING — Before Layer 2A)

```
BEFORE ENTERING LAYER 2A (Concept Generation):
  1. CHECK: Does [project]/01-research/FSSIT-RANKING.md exist?
  2. IF EXISTS:
     - LOAD top 5 FSSIT candidates into context
     - VERIFY: At least 5 candidates with Recognition Strength >= 6
     - VERIFY: At least 2 candidates with NR Potential >= 7
     - Each concept candidate in Layer 2A MUST map to at least 1 FSSIT anchor
     - Document FSSIT-to-concept mapping in output
  3. IF NOT EXISTS:
     - CHECK: Does RSF_SKIP_ACKNOWLEDGED.yaml exist?
     - IF YES: Proceed with RSF Degradation Protocol (generate FSSIT-equivalents from research)
     - IF NO: WARN "FSSIT-RANKING.md not found and no RSF skip acknowledged. Recommend running RSF before Big Idea generation."
```

---

## Execution Flow (v5.0 — Concept/Naming Separation)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Layer 0: Input Synthesis + RSF Loading + Soul.md           │
│  Load upstream packages (RC, Mech, Promise)                                  │
│  Load Soul.md (extract voice_register, energy_signature, anti_voice)         │
│  Load RSF data (expectation_schema.json + latent_resonance_field.json)       │
│  IF RSF missing: ACTIVATE DEGRADATION PROTOCOL (derive FSSIT from research) │
│  Verify coherence: RC→Mech→Promise alignment                                 │
│  Load vault patterns for target niche                                        │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Layer 1: Type Strategy                                    │
│  Analyze vault: Which Big Idea types perform best in this niche?             │
│  Check saturation: Which types are overused? Which are whitespace?           │
│  Select 2-3 Big Idea types to develop                                        │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 ↓
┌─ FSSIT LOADING GATE (BLOCKING — Before Layer 2A) ──────────────────────────┐
│  1. CHECK: Does [project]/01-research/FSSIT-RANKING.md exist?               │
│  2. IF EXISTS:                                                               │
│     - LOAD top 5 FSSIT candidates into context                              │
│     - VERIFY: At least 5 candidates with Recognition Strength >= 6          │
│     - VERIFY: At least 2 candidates with NR Potential >= 7                  │
│     - Each concept candidate in Layer 2A MUST map to at least 1 FSSIT anchor│
│     - Document FSSIT-to-concept mapping in output                           │
│  3. IF NOT EXISTS:                                                           │
│     - CHECK: Does RSF_SKIP_ACKNOWLEDGED.yaml exist?                         │
│     - IF YES: Proceed with RSF Degradation Protocol                         │
│       (generate FSSIT-equivalents from research)                            │
│     - IF NO: WARN "FSSIT-RANKING.md not found and no RSF skip              │
│       acknowledged. Recommend running RSF before Big Idea generation."      │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 ↓
┌─ PHASE A ───────────────────────────────────────────────────────────────────┐
│                    Layer 2A: Concept Generation                              │
│  Generate 5+ Big Idea CONCEPTS in plain language                             │
│  For each: Synthesize RC + Mech + Promise + FSSIT anchor                     │
│  Document: schema violation, NR potential, Soul.md alignment                 │
│  NO creative wrappers. NO headlines. NO leads. Plain language ONLY.           │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 ↓
┌═════════════════════════════════════════════════════════════════════════════┐
║               CONCEPT CHECKPOINT (BLOCKING — Human Approval)                ║
║  Present 5+ concepts in plain language                                      ║
║  Anthony evaluates STRATEGIC SYNTHESIS, not packaging                       ║
║  Anthony selects 1-2 concepts to develop                                    ║
║  → Creates CONCEPT_APPROVED.yaml                                            ║
╚════════════════════════════════╤════════════════════════════════════════════╝
                                 ↓
┌─ PHASE B ───────────────────────────────────────────────────────────────────┐
│                    Layer 2B: Creative Wrapping (Approved Concept Only)        │
│  Wrap approved concept(s) with creative wrappers (3+ per concept)            │
│  Apply Soul.md voice constraints to all creative expression                  │
│  Generate 10+ headlines per wrapper variant                                  │
│  Write 3+ full leads per wrapper variant                                     │
│  Generate proof architecture per variant                                     │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Layer 3: Validation + Scoring                             │
│  Score each wrapped variant (novelty, coherence, impact, differentiation)    │
│  Tournament-style selection on creative variants                             │
│  Marketplace Reality Check on top 5                                          │
│  Validate campaign coherence (all components align)                          │
│  Anti-slop validation                                                        │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Layer 4: Output Packaging                                 │
│  Select top candidate(s)                                                     │
│  Package handoffs to downstream copy skills                                  │
│  Generate BIG-IDEA-BRIEF.md                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## The Six Big Idea Types

From source teachings, Big Ideas fall into these types:

### 1. MECHANISM Big Idea
**Core:** The HOW is the story
**Pattern:** "The [mechanism] way to [promise]"
**When to use:** Stage 3-4 markets, mechanism is genuinely novel

### 2. ENEMY Big Idea
**Core:** A villain is sabotaging the prospect
**Pattern:** "The real reason you can't [goal] is [villain]"
**When to use:** Strong villain from root cause, frustrated audience

### 3. DISCOVERY Big Idea
**Core:** Something new was found/revealed
**Pattern:** "[Authority] discovers the [secret] to [promise]"
**When to use:** Authority proof strong, mechanism has origin story

### 4. TRANSFORMATION Big Idea
**Core:** A dramatic before/after journey
**Pattern:** "How [person like you] went from [now] to [after]"
**When to use:** Strong testimonial proof, relatable avatar

### 5. PROPHECY Big Idea
**Core:** A prediction about the future
**Pattern:** "The coming [event] that will [consequence]"
**When to use:** Urgency angle, trend-based mechanism

### 6. IDENTITY Big Idea
**Core:** You belong to a special group
**Pattern:** "For [specific identity] who [specific struggle]"
**When to use:** Stage 5 markets, strong tribal element

---

## Synthesis Rules

### Rule 1: Villain Consistency
The villain established in Root Cause MUST appear in the Big Idea. The Big Idea either:
- Positions mechanism as villain-defeating
- Positions promise as villain-escaped state
- Positions identity as villain-aware tribe

### Rule 2: Mechanism Integration
The mechanism MUST be present in the Big Idea, either:
- As the central concept (Mechanism Big Idea)
- As the solution to the enemy (Enemy Big Idea)
- As the discovered secret (Discovery Big Idea)

### Rule 3: Promise Anchoring
The promise is what the Big Idea DELIVERS. Every Big Idea must answer:
"And when you do this, you will [promise]"

### Rule 4: Creative Differentiation
The creative wrapper must NOT be:
- The same as competitor Big Ideas
- A saturated pattern in this niche
- Generic or AI-sounding

---

## Constraints

### Input Constraints
- NEVER proceed without root_cause_package from 03-root-cause
- NEVER proceed without mechanism_package from 04-mechanism
- NEVER proceed without promise_package from 05-promise
- NEVER proceed without vault_context containing relevant_swipe_ids
- NEVER proceed without schwartz_stage from 01-research

### RSF Input Constraints (v4.3 — CRITICAL)

**Layer 0 RSF Loading Protocol:**

```
STEP: Load RSF Data (REQUIRED — v4.0+)
  1. CHECK: Does [project]/layer-2-rsf-outputs/expectation_schema.json exist?
  2. CHECK: Does [project]/layer-2-rsf-outputs/latent_resonance_field.json exist?
  3. IF BOTH exist:
     - Load both files
     - VALIDATE: ≥3 FSSIT candidates with strength ≥ 0.7
     - VALIDATE: ≥3 whitespace_zones in expectation_schema
     - SET rsf_inputs_available: true
     - Log: "RSF data loaded — FSSIT-first generation protocol active"
  4. IF EITHER missing:
     - Log: "⚠️ RSF data unavailable — activating degradation protocol"
     - ACTIVATE RSF DEGRADATION PROTOCOL (see below)
     - SET rsf_inputs_available: false
```

**RSF constraints when loaded:**
- NEVER proceed without at least 3 FSSIT candidates identified with strength ≥ 0.7
- NEVER proceed if FSSIT candidates have temporal_relevance = "declining" for all top candidates
- ALWAYS verify RSF inputs are from the SAME research run as upstream skill inputs

### RSF DEGRADATION PROTOCOL (v4.3)

```
WHEN RSF INPUTS UNAVAILABLE:
  1. DERIVE 3 FSSIT-equivalent candidates from research data:
     - Source: FINAL_HANDOFF.md pain quotes, emotional landscape, core wounds
     - Method: Identify top 3 unexpressed/underexpressed emotional themes
       a. Scan all pain quotes for themes that appear 3+ times but are
          NEVER directly stated as the core issue
       b. Look for "I always felt..." or "nobody talks about..." language
       c. Identify emotions present in quotes but absent from competitor messaging
     - Format: Same as FSSIT candidate schema:
       {
         statement: string,          // The crystallized FSSIT statement
         target_emotion: string,     // Primary emotion addressed
         predicted_strength: float,  // Estimated recognition strength (0-1)
         source: "derived_from_research",
         derivation_evidence: [string]  // Quote IDs supporting derivation
       }
  2. DERIVE expectation patterns from competitive landscape:
     - Source: FINAL_HANDOFF.md competitive analysis, saturated claims
     - Method: Map top competitor messaging patterns + staleness estimates
       a. List top 5 competitor claims/promises
       b. Estimate staleness (1-10) based on how many competitors use similar language
       c. Identify 2+ messaging zones with NO competitor presence
     - Format: Same as expectation_schema whitespace zones
  3. PROCEED with adapted FSSIT-first protocol using derived candidates
  4. FLAG in output: "RSF inputs derived from research data (not from dedicated RSF analysis)"
  5. rsf_metadata.rsf_inputs_available = false with degradation notes:
     rsf_metadata:
       rsf_inputs_available: false
       degradation_active: true
       fssit_candidates_derived: true
       derivation_source: "FINAL_HANDOFF.md pain quotes + competitive analysis"
       quality_impact: "FSSIT candidates are approximations — lower confidence than dedicated RSF analysis"
```

### FSSIT-First Constraints (v4.0 — MANDATORY)
- MUST start generation from top 3 FSSIT candidates — This is foundational, not optional
- MUST map each FSSIT to root cause, mechanism, and promise connections BEFORE generating
- MUST document which FSSIT statement anchors each Big Idea candidate
- NEVER generate Big Idea candidates without FSSIT anchor point
- NEVER retrofit FSSIT after generation — FSSIT is the starting point
- MUST generate at least 3 candidates PER top FSSIT candidate (minimum 9 total)

### Schema Distance Constraints (v4.0 — MANDATORY)
- MUST calculate schema_distance for every candidate before scoring
- MUST REJECT candidates with schema_distance < 4 — insufficient surprise
- MUST FLAG candidates with schema_distance > 8 — requires human review
- MUST document which expectation_patterns each candidate violates
- MUST document which whitespace_zones each candidate occupies
- NEVER accept candidate with SD > 8 without explicit human_review_flag
- MUST verify resolution_accessibility for candidates with SD 7-8

### Concept/Naming Separation Constraints (v5.0 — MANDATORY)
- MUST generate ≥5 Big Idea CONCEPTS in plain language during Layer 2A
- MUST present concepts WITHOUT creative wrappers, headlines, or leads
- MUST wait for CONCEPT_APPROVED.yaml before proceeding to Layer 2B
- MUST only wrap APPROVED concept(s) in Layer 2B — rejected concepts are discarded
- NEVER generate headlines or leads before concept approval
- NEVER combine concept generation and creative wrapping in the same layer
- MUST load Soul.md constraints before any creative wrapping in Layer 2B
- MUST document Soul.md alignment for each concept in Phase A output

### Creative Wrapping Constraints (v5.0 — MANDATORY, Layer 2B only)
- MUST generate 3+ creative wrapper variants per approved concept
- MUST execute all three emphasis strategies (resonance-heavy, surprise-heavy, balanced)
- MUST ensure variant diversity — No two variants may share Big Idea type AND creative wrapper
- MUST apply Soul.md voice constraints to all headlines, leads, and creative wrappers
- MUST generate ≥10 headlines per wrapper variant
- MUST write ≥3 full leads (200-500 words) per wrapper variant
- NEVER skip a strategy due to "efficiency" — All three perspectives required

### Tournament Selection Constraints (v4.0 — MANDATORY)
- MUST use tournament-style pairwise comparison for final selection
- MUST isolate judge context from generation context
- MUST evaluate from all four perspectives (Audience Surrogate, Skeptic, Practitioner, Biographer)
- NEVER use absolute 1-10 scoring as primary selection method
- NEVER let judge see generation prompts, strategy labels, or "intended" quality
- MUST document tournament path for all finalists
- MUST present minimum 5 candidates at human checkpoint

### Narrative Reorganization Constraints (v4.1 — MANDATORY)
- MUST calculate narrative_reorganization score for every candidate
- MUST verify Big Idea explains WHY past attempts failed (not just what to do now)
- MUST verify Big Idea removes self-blame or provides external cause for past failure
- MUST verify connection to FSSIT candidate preserves past-explaining power
- NEVER accept candidate with NR < 4 without explicit revision guidance
- MUST include NR dimension in tournament comparisons via Biographer perspective
- MUST document how each finalist reorganizes the audience's biographical narrative

### Marketplace Reality Check Constraints (v4.2 — MANDATORY)
- MUST execute Marketplace Reality Check on all tournament finalists (top 5)
- MUST evaluate each finalist from cold-read perspective WITHOUT methodology context
- MUST answer all three marketplace questions (stop scrolling, share/remember, marketing smell)
- MUST flag any candidate with high RSF (>7.5) that fails cold-read check
- NEVER allow high-RSF candidate to proceed unflagged if marketplace check fails
- MUST document marketplace_reality_check results in rsf_metadata
- MUST present marketplace flags explicitly at human checkpoint
- NEVER optimize for RSF scores at expense of marketplace viability

### Learning Ledger Constraints (v4.2 — MANDATORY)
- MUST generate unique big_idea_id for every Big Idea output
- MUST record complete calibration_record in rsf_metadata for every output
- MUST include all RSF scores, predictions, and confidence levels in calibration_record
- MUST leave actual_outcome fields as null at generation time (for later update)
- NEVER omit calibration_record from output — this enables system learning
- MUST preserve calibration_record format for downstream outcome capture
- SHOULD update calibration_record when actual performance data becomes available

### Quality-Over-Speed Constraints (v4.0 — STRUCTURAL)
- NEVER reduce candidate count to save time/tokens
- NEVER skip tournament selection for "faster" absolute scoring
- NEVER combine generation and scoring in same context
- NEVER present fewer than 5 candidates to human checkpoint
- MUST block progression if minimum candidate count not met
- MUST log any attempted shortcuts in quality_over_speed_compliance

### Synthesis Constraints (Layer 0-1)
- NEVER generate root cause, mechanism, or promise — These come from upstream skills only
- NEVER ignore upstream inputs — All candidates MUST use the provided RC/Mech/Promise
- NEVER select Big Idea type oversaturated in competitive_landscape
- NEVER proceed to candidate generation without ≥2 Big Idea types selected
- NEVER use creative wrapper similar to saturated_big_ideas list

### Concept Generation Constraints (Layer 2A)
- NEVER produce fewer than 5 Big Idea concepts in plain language
- NEVER include creative wrappers, headlines, or leads in Layer 2A output
- NEVER proceed to Layer 2B without CONCEPT_APPROVED.yaml
- MUST document FSSIT anchor, RC angle, mechanism angle, promise angle, schema violation, NR potential, and Soul.md alignment for each concept
- MUST present concepts for human evaluation BEFORE any creative expression

### Creative Wrapping Constraints (Layer 2B)
- NEVER wrap a concept that was not approved in CONCEPT_APPROVED.yaml
- NEVER produce Big Ideas without headlines — Minimum 10 headlines per wrapper variant
- NEVER produce Big Ideas without leads — Minimum 3 full leads (200-500 words each) per variant
- NEVER produce headline without vault_inspiration reference
- NEVER produce lead without explicit lead_type classification
- NEVER omit proof_architecture from any variant
- MUST apply Soul.md voice constraints to all creative expression

### Validation Constraints (Layer 3)
- NEVER pass coherence check if villain not present in Big Idea
- NEVER pass coherence check if mechanism not integrated
- NEVER pass coherence check if promise not anchored
- NEVER pass coherence check if campaign thesis not aligned
- NEVER pass candidate with differentiation score < 5
- NEVER pass candidate with coherence score < 7
- NEVER output if coherence_validation.all_pass = false

### Output Constraints (Layer 4)
- NEVER output without recommended_candidate identified
- NEVER output without coherence_validation section complete
- NEVER output without handoffs to headlines, leads, vsl_structure
- NEVER output with any candidate missing scores (novelty, coherence, emotional_impact, differentiation)

### Quality Constraints
- ALWAYS synthesize from upstream inputs — Creative wrapper only, not strategic foundation
- ALWAYS validate campaign thesis alignment before output
- ALWAYS trace headlines to vault inspiration (include swipe_id reference)
- ALWAYS include selection_rationale for recommended candidate
- ALWAYS verify villain consistency throughout all candidates
- ALWAYS document differentiation_from_exemplar for top candidate

---

## Trigger-Template Refusals

### Refuse to Proceed When:
- **Missing upstream:** "Cannot synthesize Big Ideas without [root_cause_package | mechanism_package | promise_package]. Run upstream skill first."
- **Coherence failure:** "Big Idea candidates fail coherence validation. [Specific failure: villain_present=false | mechanism_integrated=false | etc.]. Return to Layer 2 for revision."
- **Saturation collision:** "All selected Big Idea types appear in saturated_big_ideas list. Select alternative types or develop unique creative wrappers."
- **Insufficient differentiation:** "No candidate achieved differentiation score ≥ 5. Top candidate: [X] with score [Y]. Revise creative wrappers for market differentiation."

---

### Three-Tier Uncertainty Protocol

When encountering ambiguous inputs, missing context, or unclear instructions:

- **HIGH CONFIDENCE (>90%):** Proceed with execution. No flag needed.
- **MEDIUM CONFIDENCE (60-90%):** Proceed but FLAG the assumption in output metadata. Document what was assumed and why.
- **LOW CONFIDENCE (<60%):** HALT execution. Log the uncertainty source. Request clarification before proceeding.

NEVER proceed at low confidence. NEVER suppress medium-confidence flags.

---

### Locked Tool Grammar

All skill invocations MUST follow this exact sequence:
1. STATE the skill being called and its purpose
2. VERIFY all required inputs are available and valid
3. EXECUTE the skill with explicit parameters
4. VALIDATE the output against the expected schema
5. LOG the result before proceeding to the next skill

NEVER invoke a skill without verifying its inputs first.
NEVER skip output validation between skill executions.
NEVER proceed past a failed skill without logging the failure and determining remediation.

---

### Post-Tool Reflection

AFTER EVERY SKILL EXECUTION, verify:
1. Output file exists and is non-empty
2. Output schema matches the expected contract from the skill's output specification
3. No quality gate violations are present in the output
4. Context state is updated to reflect the completed step
5. The next skill in the sequence is identified and its inputs are confirmed available

IF any verification fails: LOG the failure, HALT the pipeline, and REPORT which verification failed and why.

---

## Post-Processing Checkpoint

Before finalizing output, verify:

1. **Upstream Utilization:** All candidates use root cause villain, mechanism name, and promise statement from upstream
2. **Villain Consistency:** Same villain appears throughout campaign (root cause → Big Idea → downstream)
3. **Mechanism Integration:** Mechanism is central to Big Idea (not bolted on)
4. **Promise Anchoring:** Every Big Idea delivers on the calibrated promise
5. **Thesis Alignment:** Big Idea matches campaign thesis from 05-promise
6. **Headline Count:** Each candidate has ≥10 headlines with vault references
7. **Lead Count:** Each candidate has ≥3 full leads (200-500 words)
8. **Coherence Scores:** All validation checks pass
9. **Differentiation:** Top candidate is distinct from vault exemplars and competitors

If any check fails → return to relevant layer for correction before output.

---

## Quality Protocol

### Campaign Coherence Score (1-10)

```python
def score_coherence(candidate, upstream_inputs):
    checks = {
        'rc_to_mechanism': villain_leads_to_mechanism(
            upstream_inputs['root_cause']['villain'],
            upstream_inputs['mechanism']
        ),
        'mechanism_to_promise': mechanism_delivers_promise(
            upstream_inputs['mechanism'],
            upstream_inputs['promise']
        ),
        'big_idea_expresses_all': big_idea_contains_all_elements(
            candidate['big_idea_statement'],
            upstream_inputs
        ),
        'villain_present': villain_in_big_idea(
            candidate,
            upstream_inputs['root_cause']['villain']
        ),
        'thesis_aligned': matches_campaign_thesis(
            candidate,
            upstream_inputs['promise']['campaign_thesis']
        )
    }

    return sum(checks.values()) * 2  # 5 checks × 2 = max 10
```

### Differentiation Score (1-10)

```python
def score_differentiation(candidate, market_context):
    saturation = market_context['competitive_landscape']['saturated_big_ideas']

    penalties = 0
    if candidate['big_idea_type'] in get_oversaturated_types(saturation):
        penalties += 3
    if similar_to_competitor(candidate['big_idea_statement'], saturation):
        penalties += 4
    if generic_creative_wrapper(candidate['creative_wrapper']):
        penalties += 3

    return max(1, 10 - penalties)
```

---

## SESSION PERSISTENCE

After each skill execution, update the session context:

```yaml
session_state:
  current_phase: [phase number]
  current_step: [skill ID just completed]
  completed_steps: [append completed skill to list]
  output_status: [PASS/FAIL/PENDING for last skill]
  next_action: [next skill to execute]
  blockers: [any blocking issues encountered]
```

On session resume:
1. Read the session state
2. Identify the last completed step
3. Resume from the next uncompleted step
4. NEVER re-execute a completed step unless explicitly instructed

MUST update session state after every skill completion.
MUST persist state before any human checkpoint or pause point.

---

---

## CONSTRAINTS ENFORCEMENT

### Mandatory Execution Constraints
- MUST validate all upstream packages before synthesis begins
- MUST NOT proceed without root_cause_package from 03-root-cause
- MUST NOT proceed without mechanism_package from 04-mechanism
- MUST NOT proceed without promise_package from 05-promise
- MUST NOT proceed without vault_context containing relevant_swipe_ids
- NEVER generate root cause, mechanism, or promise — synthesis only from upstream inputs
- MUST use provided root cause villain in all Big Idea candidates
- MUST integrate mechanism into every Big Idea — no bolted-on mechanisms allowed
- MUST anchor every Big Idea to the calibrated promise
- ONLY select Big Idea types not oversaturated in competitive_landscape
- MUST select ≥2 Big Idea types before candidate generation
- MUST generate ≥5 Big Idea candidates
- MUST produce ≥10 headlines per candidate with vault_inspiration reference
- MUST produce ≥3 full leads (200-500 words) per candidate
- NEVER pass candidate with coherence score < 7
- NEVER pass candidate with differentiation score < 5
- NEVER output if coherence_validation.all_pass = false
- MUST verify villain consistency throughout all candidates
- MUST include proof_architecture in every candidate
- MUST document selection_rationale for recommended candidate
- MUST include differentiation_from_exemplar for top candidate

### Active Quality Gate Enforcement

```
IF root_cause_package missing:
  LOG: "[INPUT_VALIDATION] FAILED: root_cause_package not found"
  ACTION: HALT
  REMEDIATION: Run 03-root-cause skill before proceeding

IF mechanism_package missing:
  LOG: "[INPUT_VALIDATION] FAILED: mechanism_package not found"
  ACTION: HALT
  REMEDIATION: Run 04-mechanism skill before proceeding

IF promise_package missing:
  LOG: "[INPUT_VALIDATION] FAILED: promise_package not found"
  ACTION: HALT
  REMEDIATION: Run 05-promise skill before proceeding

IF vault_context.relevant_swipe_ids empty:
  LOG: "[INPUT_VALIDATION] FAILED: No vault swipes available for pattern matching"
  ACTION: HALT
  REMEDIATION: Load vault intelligence for target niche

IF big_idea_types_selected < 2:
  LOG: "[LAYER_1_GATE] FAILED: Only [N] Big Idea types selected, minimum is 2"
  ACTION: HALT
  REMEDIATION: Select additional non-saturated Big Idea types

IF candidates_generated < 5:
  LOG: "[LAYER_2_GATE] FAILED: Only [N] candidates generated, minimum is 5"
  ACTION: HALT
  REMEDIATION: Generate additional candidates using selected types

IF coherence_validation.all_pass = false:
  LOG: "[LAYER_3_GATE] FAILED: Coherence check failed — [specific failure]"
  ACTION: HALT
  REMEDIATION: Revise candidates to ensure villain, mechanism, promise alignment

IF differentiation_score < 5 for all candidates:
  LOG: "[LAYER_3_GATE] FAILED: No candidate achieved differentiation ≥ 5"
  ACTION: HALT
  REMEDIATION: Revise creative wrappers for market differentiation
```

---

### Failure Modes
| Mode | Severity | Detection | Handling |
|------|----------|-----------|----------|
| Upstream root_cause_package missing | HIGH | Input validation | HALT with remediation: run 03-root-cause |
| Upstream mechanism_package missing | HIGH | Input validation | HALT with remediation: run 04-mechanism |
| Upstream promise_package missing | HIGH | Input validation | HALT with remediation: run 05-promise |
| Vault intelligence empty | HIGH | Load check | HALT with fallback: provide vault file path |
| All selected types oversaturated | HIGH | Saturation check | HALT + select alternative Big Idea types |
| Fewer than 5 candidates generated | MEDIUM | Layer 2 gate | REJECT + expand generation |
| Headlines < 10 per candidate | MEDIUM | Layer 2 validation | REJECT + generate additional headlines |
| Leads < 3 per candidate | MEDIUM | Layer 2 validation | REJECT + write additional leads |
| Villain not present in Big Idea | HIGH | Coherence check | REJECT candidate + revise with villain |
| Mechanism not integrated | HIGH | Coherence check | REJECT candidate + revise with mechanism central |
| Promise not anchored | HIGH | Coherence check | REJECT candidate + revise to deliver promise |
| Coherence score < 7 | HIGH | Layer 3 scoring | REJECT candidate + address alignment gaps |
| Differentiation score < 5 | MEDIUM | Layer 3 scoring | REJECT candidate + revise creative wrapper |
| Campaign thesis misaligned | HIGH | Coherence validation | HALT + ensure Big Idea matches thesis |
| Handoff schema mismatch | HIGH | Output validation | REJECT + re-package per downstream schema |

---

### Anti-Slop Lexicon
NEVER use these words/phrases in Big Idea copy, headlines, or leads:

**Vague quantifiers (replace with specifics):**
- many, often, most, some, several, usually, typically, around, approximately, various, numerous

**AI telltales (ban entirely):**
- revolutionary, game-changing, unlock, harness, leverage, dive deep, journey, empower, cutting-edge, groundbreaking, transformative, seamlessly

**Corporate filler (eliminate):**
- comprehensive, robust, innovative, state-of-the-art, synergy, holistic, streamlined, best-in-class, world-class

**Hedge words (replace with definitive statements):**
- might, could potentially, should consider, may want to, perhaps, arguably, it seems, appears to be

**Filler phrases (delete):**
- it's important to note, as you can see, needless to say, at the end of the day, in today's world

**Big Idea-specific slop (ban):**
- secret, ancient, weird trick, doctors hate, one simple thing (unless genuinely novel and provable)

---

## Worked Exemplars

### Exemplar A: Successful Execution (Golf Instruction Niche)

**Input Context:**
- Niche: Golf instruction
- Sub-niche: Driver distance for amateur golfers 50+
- Product: Video training program
- Upstream: Root cause (hip restriction), mechanism (Vertical Line Method), promise (add 30+ yards)

**Layer 0 → 1 Transition:**
- Loader validated: root_cause_package, mechanism_package, promise_package all present
- Vault intelligence confirmed: 3 competing driver distance products mapped
- Schwartz stage: 4 (mechanism-aware market)
- Input threshold: PASS (all required fields present)

**Layer 1 Execution:**
- Vault pattern analysis: MECHANISM Big Ideas dominate golf instruction (67% of controls)
- Saturation check: "hip rotation" and "swing speed" mechanisms oversaturated
- Whitespace identified: Vertical alignment angle is fresh
- Big Idea types selected: MECHANISM (primary), DISCOVERY (secondary)
- Confidence score: 0.89 (above 0.75 threshold)

**Layer 2 Execution:**
- 6 Big Idea candidates generated
- Top candidate: "The 2-Inch Vertical Line That Adds 30+ Yards"
- Components synthesized: Hip restriction villain + Vertical Line mechanism + 30-yard promise
- 12 headlines generated per candidate, all with vault_inspiration references
- 3 full leads written per candidate (story, problem-agitation, revelation)
- Quality score: 8.4/10

**Layer 3-4 Execution:**
- Coherence validation: PASS (villain → mechanism → promise aligned)
- Differentiation score: 8/10 (distinct from hip rotation angle)
- Anti-slop: PASS (0 violations)
- Final output assembled with proof_architecture mapped

**Result:** COMPLETE state, `big-idea-output.json` handed to 07-offer and 08-structure.

---

### Exemplar B: Refinement Loop Triggered (Health Supplement Niche)

**Input Context:**
- Niche: Health supplements
- Sub-niche: Joint pain relief for active adults
- Product: Supplement + exercise guide bundle

**Layer 1 Initial Execution:**
- First-pass type selection: MECHANISM vs. ENEMY vs. DISCOVERY all viable
- Initial confidence: 0.64 (BELOW 0.75 threshold)
- Diagnosis: Mechanism not differentiated enough from "inflammation" angle competitors

**Refinement Loop:**
- Iteration 1: Re-analyzed vault patterns for joint health niche → 0.68
- Iteration 2: Applied ENEMY Big Idea type with "Cartilage Assassin" villain framing → 0.79 (PASS)
- Creative wrapper differentiated: "The Hidden Joint Saboteur Your Doctor Never Tested For"
- Confidence after refinement: 0.79

**Layer 2-4 Execution:**
- 5 candidates generated with ENEMY type emphasis
- Top candidate differentiation score: 7/10
- All coherence checks: PASS

**Result:** Proceeded to COMPLETE after 2 refinement iterations in Layer 1.

---

### Exemplar C: Human Checkpoint Triggered (Financial Niche)

**Input Context:**
- Niche: Financial education
- Sub-niche: Crypto investing for beginners
- Product: Newsletter + trading alerts

**Layer 1 Execution:**
- Type selection attempted: DISCOVERY, PROPHECY, MECHANISM all scored similarly
- Saturation analysis: All major Big Idea angles appear in competitive landscape
- Confidence after 3 iterations: 0.71 (still below 0.75 threshold)
- Diagnosis: Market saturation too high for automated differentiation

**Human Checkpoint:**
- Operator reviewed 3 competing Big Idea angles
- Selected PROPHECY type with "2024 Halving Event" timing hook
- Manual override documented: "Timing-based differentiation unavailable to vault pattern matching"
- Rationale: Upcoming halving event provides natural news hook competitors haven't fully exploited

**Layer 2-4 Execution (post-checkpoint):**
- Candidates generated with human-selected PROPHECY type
- Differentiation score: 7/10 (timing angle creates freshness)
- Below-threshold flag preserved in output metadata

**Result:** COMPLETE state with human-approved selection, confidence flag preserved for downstream awareness.

---

## Status

**VERSION 5.0** — Concept/Naming Separation + Soul.md Integration. Concepts approved in plain language before creative wrapping.

### Major Changes from v3.1:

**Architecture Transformation:**
- RSF is now foundational, not supplementary
- FSSIT-first generation protocol replaces idea-first-check-later approach
- Tournament-style selection replaces absolute scoring
- Multi-variant generation (9+ candidates) replaces minimum viable (5 candidates)
- Separate judge context prevents self-bias

**New Sections Added:**
- RSF Complete Overhaul explanation
- FSSIT-First Generation Protocol (comprehensive)
- Schema Distance Gating (with inverted-U principle)
- Multi-Variant Generation (3 strategies × 3+ variants)
- Tournament-Style Selection (judge architecture)
- rsf_metadata in output schema (comprehensive tracking)

**New Constraint Categories:**
- RSF Input Constraints (5 constraints)
- FSSIT-First Constraints (6 constraints)
- Schema Distance Constraints (7 constraints)
- Multi-Variant Generation Constraints (5 constraints)
- Tournament Selection Constraints (7 constraints)
- Quality-Over-Speed Constraints (6 constraints)

**Total Constraints:** 64 explicit NEVER/MUST/ALWAYS statements (up from 28 in v3.1)

**Key Philosophy Changes:**
- Quality weighted 10x over speed (structurally enforced)
- Resonance is foundational, not retrofitted
- Judge context isolated from generation context
- Minimum candidate counts are non-negotiable gates
- Human checkpoint with 5+ candidates mandatory

### Changes retained from v3.0/v3.1:
- Synthesis-only mode (no RC/Mech/Promise generation)
- 5 layers focused on synthesis from upstream skill outputs
- Identity boundaries
- Post-processing checkpoint
- Trigger-template refusals
- Coherence validation

**Layers (Updated for Concept/Naming Separation + Soul.md):**
- [x] Layer 0: Input Synthesis + RSF Loading + Soul.md Loading + Coherence Check
- [x] Layer 1: FSSIT Mapping + Type Strategy + Schema Distance Planning
- [x] Layer 2A: Concept Generation (5+ plain language concepts)
- [x] CONCEPT CHECKPOINT: Human approves strategic synthesis
- [x] Layer 2B: Creative Wrapping (approved concepts only — wrappers, headlines, leads)
- [x] Layer 3: Pre-flight Filter + Tournament Selection + RSF Scoring + Marketplace Check
- [x] Layer 4: Human Checkpoint Packaging + Output Assembly

**RSF Integration Status:**
- expectation_schema.json: REQUIRED
- latent_resonance_field.json: REQUIRED
- fssit_candidates: REQUIRED (minimum 3 with strength ≥ 0.7)
- upstream rsf_metadata: CONSUMED from 02, 03, 04

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.x | — | Original monolithic skill with all generation in-skill |
| 3.0 | — | Synthesis-only mode (upstream skills handle RC/Mech/Promise) |
| 3.1 | — | NateJones audit enhancements (constraints, boundaries, gates) |
| 4.0 | 2026-01-29 | **Complete RSF Overhaul**: FSSIT-first generation, schema distance gating, multi-variant generation, tournament selection, quality-over-speed structural enforcement |
| 4.1 | 2026-01-29 | **NR Fifth Dimension**: Added Narrative Reorganization (NR) as fifth RSF scoring dimension, Biographer judge perspective, NR constraints, updated tournament selection to 4 dimensions |
| 4.2 | 2026-01-29 | **Dual Evaluation + Learning Ledger** (from Rich Schefren patterns): Added Marketplace Reality Check as final gate separating methodology correctness from marketplace effectiveness; Added Learning Ledger with calibration_record for tracking predictions against actual outcomes; 15 new constraints; Addresses methodology/effectiveness gap and enables system learning over time |
| 4.3 | 2026-02-03 | **Schema Distance Framework Enhancement**: Added three-index composite calculation (CNI + BCI + LNI) calibrated by Information Gap Calibration (IGC) per Loewenstein's Curiosity Gap Theory; Added 6 Transformation Operators (Inversion, Hidden Variable, Category Violation, Temporal Shift, Scale Shift, Villain Reframe) for systematic SDS optimization; Added Anchor-to-Distance Ratio (ADR) for quantified Resolution Accessibility calculation via 5 anchoring dimensions (Authority, Evidence, Linguistic, Social, Incremental); Optimal calibrated SDS zone refined to 3.6-5.6; New microskills: 3.7-schema-distance-calculator.md, 2.7-transformation-operators.md, 3.8-anchor-distance-ratio.md |
| 4.4 | 2026-02-12 | Model Assignment Table: Added Binding Model Assignment Table. Haiku for infrastructure (Pre/0), opus for all analysis/generation/scoring layers (1-3.8), sonnet for packaging (4). |
| 5.1 | 2026-02-23 | **Expression Anchoring Protocol**: Added 0.2.8 TIER1 Expression Reference loader to Layer 0 (Big Idea type patterns, headline patterns, FSSIT patterns from TIER1 vault). Added 3.9 Expression Anchoring Score to Layer 3 (after 3.8, before validation gate). 4-dimension scoring: Quote Penetration (30%), TIER1 Pattern Match (20%), FSSIT Echo (30%), Schema Distance × Anchoring Interaction (20%). FSSIT drift check validates creative wrapping preserved resonance. Shared protocol: Skills/protocols/EXPRESSION-ANCHORING-PROTOCOL.md. |
| 5.0 | 2026-02-14 | **Concept/Naming Separation + Soul.md Integration**: Split Layer 2 into Layer 2A (Concept Generation — 5+ concepts in plain language) and Layer 2B (Creative Wrapping — approved concepts only). Added CONCEPT CHECKPOINT gate between 2A and 2B requiring human approval of strategic synthesis before creative expression. Added Soul.md as mandatory dependency — loaded at pre-execution, voice constraints applied throughout creative wrapping. Added Pre-Execution Protocol with Soul.md loading. Updated Model Assignment Table for split layers (2A/2A-CP/2B). Added Concept/Naming Separation Architecture section with full rationale, phase descriptions, human checkpoint format, and CONCEPT_APPROVED.yaml schema. Updated execution flow diagram, microskill layers table, constraints (new concept/naming separation and creative wrapping constraint categories). Prevents good names propping up weak concepts and gives Anthony direct control over strategic synthesis decisions. |
