# A02: Hook & Angle Discovery — Master Agent

**Version:** 1.1
**Created:** 2026-02-22
**Updated:** 2026-02-27 (impression-weighted hook input)
**Skill:** A02-hook-angle-discovery
**Position:** Ad Engine, Skill 2 (downstream from A01, upstream from A03)
**Type:** Strategic Derivation + Creative Generation + Human Curation
**Dependencies:** Campaign Brief (Skill 09), Research Handoff (Skill 01), Strategic Outputs (Skills 03-08), Ad Intelligence Handoff (A01)
**Output:** HOOK-ANGLE-MATRIX.md

---

## TABLE OF CONTENTS

- [THE 3 LAWS OF HOOK & ANGLE DISCOVERY (Never Scroll Past This)](#the-3-laws-of-hook--angle-discovery-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [PURPOSE](#purpose)
- [IDENTITY BOUNDARIES](#identity-boundaries)
- [THE ANGLE-HOOK-BIG IDEA HIERARCHY (Reference Section)](#the-angle-hook-big-idea-hierarchy-reference-section)
- [Pre-Execution Protocol](#pre-execution-protocol)
- [MODEL ASSIGNMENT TABLE (Binding)](#model-assignment-table-binding)
- [LAYER ARCHITECTURE](#layer-architecture)
- [GATE ARCHITECTURE SUMMARY](#gate-architecture-summary)
- [ANTI-DEGRADATION SECTION](#anti-degradation-section)
- [HOOK TYPE QUICK REFERENCE](#hook-type-quick-reference)
- [PER-MICROSKILL OUTPUT REQUIREMENTS](#per-microskill-output-requirements)
- [OUTPUT PATH CONVENTION](#output-path-convention)
- [INTEGRATION WITH DOWNSTREAM SKILLS](#integration-with-downstream-skills)
- [MC-CHECK SCHEDULE](#mc-check-schedule)
- [VERSION HISTORY](#version-history)

---

## THE 3 LAWS OF HOOK & ANGLE DISCOVERY (Never Scroll Past This)

1. **The hook is NOT the big idea.** The big idea (Skill 06) is the campaign-level strategic foundation. The hook is a 3-second attention mechanism that LEADS to the big idea. One big idea generates 20+ hooks. One angle generates 20+ hook variations. These are three structurally distinct levels. Conflating them is a protocol violation.
2. **Angles first, hooks second. Always.** Angles are strategic ideas derived from research and strategy. Hooks are creative expressions of angles. Generating hooks without first establishing strategic angles produces random attention-grabbers that don't serve the campaign.
3. **Volume is the game.** 50+ hooks minimum. 8+ hook types minimum. 10+ angles minimum. The algorithm needs volume. Creative testing needs volume. "These 5 hooks are really strong" is not an acceptable output. Hit the numbers, THEN curate.

---

## CRITICAL: READ THIS FIRST

This file exists because **hook generation has its own degradation patterns** distinct from long-form copy and distinct from other ad skills:

1. **Generic hooks** -- LLM defaults to safe, category-level hooks instead of specific, scroll-stopping hooks ("Want better skin?" instead of "I threw out every product my dermatologist recommended")
2. **Hook-as-big-idea** -- LLM generates the big idea AS the hook instead of generating entry points that LEAD to the big idea
3. **Type monoculture** -- LLM generates 50 hooks but they're all variations of 2-3 types (all questions, all curiosity gaps) instead of spanning the 32-type taxonomy
4. **Missing angle attribution** -- Hooks appear without traceability to a strategic angle, making it impossible to know which strategic territory is being served
5. **Premature curation** -- LLM generates 15 hooks and declares "these are the strongest" without hitting the 50+ minimum. Volume before curation.
6. **Skipping human selection** -- LLM scores hooks and auto-selects the winners, bypassing the mandatory human curation checkpoint

**This file is the fix.** Before executing A02, read the relevant sections below.

---

## PURPOSE

Generate the **hook and angle taxonomy** for the campaign -- the 3-second attention mechanisms that will stop the scroll and lead to the big idea.

**The critical output of this skill is a HOOK-ANGLE-MATRIX.md** that contains:
- 10-15 strategic angles derived from research and strategy
- 50-100+ hooks classified by type and angle
- Automated scoring with the bottom 70% cut
- Top 15-20 hooks presented to human
- Human-selected 8-10 hooks for downstream skills (A03, A04, A07)

**Success Criteria:**
- AD-HOOK-TAXONOMY.md loaded and all 32 types available during generation
- 10+ strategic angles with source attribution
- 50+ hooks generated across 8+ hook types
- Each hook classified by type, tagged to an angle, scored on 6 criteria
- Top 15-20 presented to human for curation
- Human selects 8-10 hooks (BLOCKING -- cannot proceed without selection)
- HOOK-ANGLE-MATRIX.md exists with all 7 required sections populated

---

## IDENTITY BOUNDARIES

**This skill IS:**
- Strategic angle derivation from research, root cause, mechanism, promise, big idea, ad intelligence
- Hook generation from the 32-type taxonomy applied to strategic angles
- Automated multi-criteria scoring of generated hooks
- Human curation facilitation and selection capture

**This skill is NOT:**
- Big Idea generation (that's Skill 06)
- Ad intelligence gathering (that's A01)
- Format/platform strategy (that's A03 -- A02 produces hooks, A03 maps them to platforms)
- Script writing (that's A04)
- Visual direction (that's A05)
- Arena evaluation of complete ad concepts (that's A06)

**Upstream dependencies:**
- Campaign Brief (Skill 09) -- REQUIRED
- Research Handoff (Skill 01) -- REQUIRED (pain quotes, hope quotes, language patterns)
- Root Cause (Skill 03) -- REQUIRED
- Mechanism (Skill 04) -- REQUIRED
- Promise (Skill 05) -- REQUIRED
- Big Idea (Skill 06) -- REQUIRED (hooks LEAD to the big idea)
- Offer (Skill 07) -- OPTIONAL (for proof-based angles)
- Proof Inventory (Skill 02) -- OPTIONAL (for proof-based angles)
- Ad Intelligence Handoff (A01) -- REQUIRED (competitive landscape, winning hooks, opportunity gaps)
- impression_weighted_hook_distribution: object  # OPTIONAL -- from A01 3.8 when Tool-Assisted Scan mode used
  # When present, provides performance-weighted hook type rankings alongside count-based rankings
  # Use impression-weighted data to identify which hook TYPES perform best (not just most common)

**Downstream consumers:**
- A03 (Format Strategy) -- maps selected hooks to platforms and formats
- A04 (Script Architecture) -- builds scripts around selected hooks
- A07 (Copy Production) -- generates hook swap variants for winning scripts

---

## THE ANGLE-HOOK-BIG IDEA HIERARCHY (Reference Section)

This hierarchy is the most important architectural concept in A02. Misunderstanding it produces hooks that ARE the big idea instead of hooks that LEAD to the big idea.

### Three Structurally Distinct Levels

```
LEVEL 1: BIG IDEA (Campaign Level -- CopywritingEngine Skill 06)
  "Certain plants contain gut-damaging lectins that cause
   inflammation, weight gain, and chronic health problems"
  --> This is the STRATEGIC FOUNDATION. It doesn't change per ad.
  --> Derived from research, mechanism, root cause.
  --> ONE big idea per campaign.

LEVEL 2: ANGLE (Strategic Entry Point -- A02 Layer 1)
  "The foods you trust are harming you"
  "Your doctor is treating symptoms, not causes"
  "One ingredient is missing from every probiotic"
  "The real reason diets don't work"
  --> These are STRATEGIC IDEAS derived from research + strategy.
  --> Each angle is a different DOORWAY into the big idea.
  --> 10-15 angles per campaign.
  --> Plain language. No creative expression yet.

LEVEL 3: HOOK (3-Second Expression -- A02 Layer 2)
  For angle "The foods you trust are harming you":
    Curiosity:  "The #1 'healthy' food destroying your gut"
    Warning:    "Doctor begs: stop eating this veggie immediately"
    UGC:        "I stopped eating this one food and lost 12 lbs in 3 weeks"
    Data:       "73% of Americans eat this gut-damaging food daily"
    Demo:       [Image: beloved vegetable with X through it]
  --> These are 3-SECOND ATTENTION MECHANISMS.
  --> They lead TO the big idea, but they are NOT the big idea.
  --> MANY hooks serve ONE angle.
  --> Some hooks barely reference the big idea at all.
  --> 50-100+ hooks per campaign.
```

### The Multiplication Principle

**One winning ANGLE generates 20+ hook VARIATIONS.** The angle (strategic idea) and hook (expression) are separate variables:

```
ANGLE: "You're overpaying for skincare"

HOOKS (8 different types, same angle):
  Question:      "How much do you spend on skincare each month?"
  Statistic:     "The average woman spends $8,000 on skincare in her lifetime."
  Warning:       "Stop wasting money on expensive serums that don't work."
  Social Proof:  "5,000 women have already switched to this $12 alternative."
  Reverse Psych: "Don't buy this unless you actually want great skin for less."
  Pain Point:    "Tired of spending $200/month and still dealing with breakouts?"
  Secret:        "The one ingredient luxury brands don't want you to know about."
  Demonstration: (Side-by-side texture comparison, $200 cream vs. $12 cream)
```

A02 generates ANGLES first (Layer 1), then generates HOOKS per angle across the 32-type taxonomy (Layer 2). This ensures every hook traces back to a strategic angle, and the multiplication principle is exploited for maximum variant volume.

### The Gundry Example (Full Breakdown)

```
BIG IDEA (Skill 06):
  "Certain plants contain gut-damaging lectins that cause inflammation,
   weight gain, and chronic health problems -- and the foods you think
   are healthiest are often the worst offenders."

ANGLES (A02 Layer 1):
  1. "The foods you trust are harming you" (belief reversal)
  2. "Your doctor doesn't know about lectins" (authority gap)
  3. "One protein in plants is the real cause of gut problems" (mechanism angle)
  4. "The real reason diets don't work" (root cause reframe)
  5. "Ancient cultures avoided these foods for a reason" (historical proof)

HOOKS (A02 Layer 2) -- just for angle #1:
  A6 Secret:           "Never eat this vegetable"
  C2 Warning:          "Doctor begs: stop eating this veggie immediately"
  A3 Surprising Fact:  "The #1 'healthy' food destroying your gut"
  B4 Testimonial:      "I stopped eating this one food and my bloating vanished"
  A1 Question:         "What if your salad is making you sick?"
  D1 Before/After:     "My gut before and after I cut this one food"
  F1 Audience Call-Out: "If you eat vegetables every day, watch this"
  I2 Bold Claim:       "The vegetable that's secretly destroying your health"

  That's 8 hooks from ONE angle. With 5 angles, we get 40+ hooks minimum.
```

---

## Pre-Execution Protocol

```
BEFORE ANY A02 EXECUTION:
  1. READ this file (A02-HOOK-ANGLE-DISCOVERY-AGENT.md) completely
  2. READ AD-ENGINE.md (The 5 Laws, Hook vs Big Idea Distinction, A02 requirements)
  3. READ A02-HOOK-ANGLE-DISCOVERY-ANTI-DEGRADATION.md (when it exists)
  4. LOAD AD-HOOK-TAXONOMY.md (all 32 types, 10 categories)
  5. LOAD Soul.md if it exists (project voice constraints)
  6. Proceed to Layer 0
```

---

## MODEL ASSIGNMENT TABLE (Binding)

| Phase | Model | Rationale |
|-------|-------|-----------|
| Pre-Execution | haiku | Infrastructure creation, file existence checks |
| Layer 0 (Foundation & Loading) | haiku | Loading and validation -- mechanical tasks |
| Layer 1 (Angle Discovery) | opus | Strategic derivation from research + strategy. Requires deep reasoning about pain quotes, mechanism, root cause, competitive gaps. |
| Layer 2 (Hook Generation) | opus | Creative generation with full 32-type taxonomy awareness. Must produce 50-100+ hooks with type classification and angle attribution. |
| Layer 2.5 (Automated Scoring) | opus | Multi-criteria quality evaluation. Must score 50-100+ hooks against 6 criteria with rationale. |
| Layer 3 (Human Curation) | -- | Human selection. BLOCKING. No model executes this layer. |
| Layer 4 (Output Packaging) | sonnet | Assembly of existing scored/selected hooks into output format. |

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

| Microskill | Name | Purpose | Output File |
|------------|------|---------|-------------|
| 0.0.1 | Vertical Profile Loader | Load ad-specific vertical config from `ads/ad-verticals/` | `layer-0-outputs/0.0.1-vertical-profile.md` |
| 0.1 | Upstream Package Loader | Load Campaign Brief (09), Research Handoff (01), Root Cause (03), Mechanism (04), Promise (05), Big Idea (06), Offer (07), Proof Inventory (02) | `layer-0-outputs/0.1-upstream-packages.md` |
| 0.2 | Ad Intelligence Loader | Load A01 AD-INTELLIGENCE-HANDOFF.md -- competitive landscape, winning hooks, hook type distribution, opportunity gaps | `layer-0-outputs/0.2-ad-intelligence.md` |
| 0.3 | Hook Taxonomy Loader | Load `References/AD-HOOK-TAXONOMY.md` -- all 32 types, 10 categories, examples, performance benchmarks. HOLD IN ACTIVE CONTEXT for Layer 2. | `layer-0-outputs/0.3-hook-taxonomy.md` |
| 0.4 | Soul.md Loader | Load project Soul.md if exists. Extract voice constraints for hook language. | `layer-0-outputs/0.4-soul-md.md` |
| 0.5 | Input Validator | Verify all required inputs loaded. Campaign Brief exists. Research Handoff exists. A01 output exists. Big Idea exists. Hook Taxonomy loaded. | `layer-0-outputs/0.5-input-validation.md` |

**Gate 0: Foundation Complete**

```yaml
# GATE_0_COMPLETE.yaml
gate: 0
skill: "A02-hook-angle-discovery"
timestamp: "[ISO timestamp]"
result: PASS

inputs_loaded:
  campaign_brief: true
  research_handoff: true
  root_cause: true
  mechanism: true
  promise: true
  big_idea: true
  ad_intelligence_handoff: true
  hook_taxonomy: true
  proof_inventory: [true/false]  # optional
  offer: [true/false]            # optional
  soul_md: [true/false]          # optional but recommended

vertical_profile: "[vertical name or 'universal']"
big_idea_statement: "[1-2 sentence big idea from Skill 06]"
market_awareness_level: "[unaware/problem-aware/solution-aware/product-aware/most-aware]"
target_platforms: "[list from Campaign Brief]"

all_required_inputs: true
```

### Schema Validation Reference

Input validators MUST verify field presence — not just file existence — for all consumed handoff files. See `ads/ad-engine-schema-registry.md` for required fields per handoff file.

**IF `all_required_inputs` is false --> Layer 1 is BLOCKED. Cannot proceed.**

---

### Layer 1: Angle Discovery

This is the STRATEGIC layer. Angles are DERIVED from research and strategy, not invented from thin air. Every angle must trace to a specific upstream source.

| Microskill | Name | Purpose | Output File |
|------------|------|---------|-------------|
| 1.1 | Pain-Based Angle Mining | Extract angles from Research pain quotes + Root Cause (Skill 03). Angles that address the prospect's felt pain. | `layer-1-outputs/1.1-pain-angles.md` |
| 1.2 | Mechanism-Based Angle Mining | Extract angles from Mechanism (Skill 04) + Research competitor mechanism quotes. Angles that highlight the unique mechanism or challenge competitor mechanisms. | `layer-1-outputs/1.2-mechanism-angles.md` |
| 1.3 | Identity-Based Angle Mining | Extract angles from Research hope quotes (Skill 01) + FSSIT candidates (Skill 06) + Promise (Skill 05). Angles that tap into identity, aspiration, belonging. | `layer-1-outputs/1.3-identity-angles.md` |
| 1.4 | Proof-Based Angle Mining | Extract angles from Proof Inventory (Skill 02) + Research data. Angles that lead with evidence, data, social proof, demonstrations. | `layer-1-outputs/1.4-proof-angles.md` |
| 1.5 | Competitive Gap Angle Mining | Extract angles from Ad Intelligence (A01) -- opportunity gaps, underused hook types, whitespace in competitor messaging. | `layer-1-outputs/1.5-competitive-gap-angles.md` |
| 1.6 | Angle Deduplication & Ranking | Merge all angle candidates. Remove duplicates and near-duplicates. Rank by strategic strength, research grounding, competitive differentiation. | `layer-1-outputs/1.6-ranked-angles.md` |
| 1.7 | Layer 1 Validator | Verify minimum 10 angles. Verify source attribution. Verify no angle IS the big idea (angles are entry points, not the destination). | `layer-1-outputs/1.7-layer1-validation.md` |

#### 1.1 Pain-Based Angle Mining

**Input:** Research pain quotes (Skill 01), Root Cause (Skill 03)

**Process:**
1. Extract the top 10-15 pain quotes from Research Handoff (highest intensity, most frequently expressed)
2. Group pain quotes by theme (what specific suffering do they describe?)
3. For each pain theme, derive an angle in PLAIN LANGUAGE:
   - What is the prospect FEELING?
   - What would make them stop scrolling?
   - How does the root cause reframe this pain?
4. Each angle must include: source quote(s), pain theme, plain language angle statement

**Output:** 3-5 pain-based angles with source attribution

**Example:**
```
PAIN THEME: Frustration with failed diets
SOURCE QUOTES: "I've tried everything and nothing works" (Reddit, 47 upvotes)
               "Counting calories is exhausting and I still gain weight" (Forum)
ANGLE: "The real reason your diet keeps failing (it's not willpower)"
SOURCE: Research pain quotes + Root Cause (hidden metabolic blocker)
```

#### 1.2 Mechanism-Based Angle Mining

**Input:** Mechanism (Skill 04), Research competitor mechanism quotes

**Process:**
1. Extract the unique mechanism from Skill 04 output
2. Identify what makes this mechanism DIFFERENT from competitor mechanisms
3. Derive angles that:
   - Highlight the unique mechanism as a discovery/revelation
   - Challenge competitor mechanisms as incomplete or wrong
   - Position the mechanism as the "missing piece"
4. Each angle must reference the specific mechanism element it highlights

**Output:** 3-5 mechanism-based angles

#### 1.3 Identity-Based Angle Mining

**Input:** Research hope quotes (Skill 01), FSSIT candidates (Skill 06), Promise (Skill 05)

**Process:**
1. Extract hope quotes and aspiration language from Research
2. Load FSSIT candidates from Big Idea (Skill 06) if available
3. Derive angles that:
   - Tap into who the prospect wants to BECOME
   - Use belonging/tribe language ("people like you")
   - Reference identity shifts the product enables
4. Cross-reference with Promise (Skill 05) to ensure angles are within calibrated promise ceiling

**Output:** 2-3 identity-based angles

#### 1.4 Proof-Based Angle Mining

**Input:** Proof Inventory (Skill 02), Research data

**Process:**
1. Extract strongest proof elements (studies, testimonials, data points, demonstrations)
2. Derive angles that LEAD WITH the proof:
   - "73% of..." (data-first)
   - "After 30 days, participants..." (study-first)
   - "50,000 customers have already..." (social-proof-first)
3. Each angle must cite the specific proof element it leads with

**Output:** 2-3 proof-based angles

#### 1.5 Competitive Gap Angle Mining

**Input:** Ad Intelligence (A01) -- opportunity gaps, underused hook types, hook type distribution

**Process:**
1. Load the Opportunity Gaps section from A01 output
2. Identify:
   - Hook types that competitors are NOT using (whitespace)
   - Angles that competitors haven't exploited
   - Messaging territory that's uncrowded
3. Derive angles that exploit these gaps
4. Each angle must reference the specific competitive gap it targets

**Output:** 2-3 competitive gap angles

#### 1.6 Angle Deduplication & Ranking

**Input:** All angle outputs from 1.1-1.5

**Process:**
1. Merge all angle candidates into a single list
2. Remove exact duplicates
3. Identify near-duplicates (same strategic territory, slightly different phrasing) and merge, keeping strongest version
4. Rank remaining angles by:
   - **Strategic strength** (1-10): How powerfully does this angle lead to the big idea?
   - **Research grounding** (1-10): How many research quotes/data points support this angle?
   - **Competitive differentiation** (1-10): How different is this from what competitors are running?
   - **Composite** = (Strategic × 0.4) + (Research × 0.3) + (Competitive × 0.3)

**Output:** 10-15 unique angles, ranked by composite score

**Output Format:**
```markdown
## Ranked Angles

### Angle 1: [Plain Language Statement]
- **Source:** [Pain/Mechanism/Identity/Proof/Competitive Gap]
- **Source Attribution:** [Specific quotes, data, or upstream skill references]
- **Strategic Strength:** [X/10] -- [rationale]
- **Research Grounding:** [X/10] -- [rationale]
- **Competitive Differentiation:** [X/10] -- [rationale]
- **Composite Score:** [X.X]
- **Big Idea Connection:** [How this angle leads to the campaign big idea]

[Continue for all 10-15 angles]
```

#### 1.7 Layer 1 Validator

**Validation Checks:**

| Check | Threshold | If Failed |
|-------|-----------|-----------|
| Total angles generated | >= 10 | HALT -- return to 1.1-1.5 and expand |
| Each angle has source attribution | 100% | HALT -- add missing attribution |
| No angle IS the big idea | 0 violations | HALT -- reframe as entry point, not destination |
| Minimum 3 angle categories represented | >= 3 of 5 (Pain, Mechanism, Identity, Proof, Competitive) | HALT -- mine underrepresented categories |
| Each angle states how it leads to big idea | 100% | HALT -- add big idea connection |

**Gate 1: Angle Discovery Complete**

```yaml
# GATE_1_COMPLETE.yaml
gate: 1
skill: "A02-hook-angle-discovery"
timestamp: "[ISO timestamp]"
result: PASS

angle_counts:
  pain_based: [count]
  mechanism_based: [count]
  identity_based: [count]
  proof_based: [count]
  competitive_gap: [count]
  total_before_dedup: [count]
  total_after_dedup: [count]
  total_ranked: [count]  # must be >= 10

categories_represented: [count]  # must be >= 3
all_angles_have_source: true
no_angle_is_big_idea: true
all_angles_have_big_idea_connection: true

top_3_angles:
  - angle: "[statement]"
    composite: [score]
  - angle: "[statement]"
    composite: [score]
  - angle: "[statement]"
    composite: [score]

microskill_outputs:
  - id: "1.1"
    file: "layer-1-outputs/1.1-pain-angles.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "1.2"
    file: "layer-1-outputs/1.2-mechanism-angles.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "1.3"
    file: "layer-1-outputs/1.3-identity-angles.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "1.4"
    file: "layer-1-outputs/1.4-proof-angles.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "1.5"
    file: "layer-1-outputs/1.5-competitive-gap-angles.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "1.6"
    file: "layer-1-outputs/1.6-ranked-angles.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "1.7"
    file: "layer-1-outputs/1.7-layer1-validation.md"
    size_bytes: [integer]
    minimum_met: true

all_outputs_verified: true
```

**IF total_ranked < 10 --> Gate 1 FAILS. Return to Layer 1 and expand.**

---

### Layer 2: Hook Generation

For EACH approved angle from Layer 1, generate hooks across multiple hook types from the 32-type taxonomy. The taxonomy MUST be loaded in active context during this entire layer.

| Microskill | Name | Purpose | Output File |
|------------|------|---------|-------------|
| 2.1 | Hook Type Selection Matrix | For each angle, identify which hook types are natural fits. Map angles to compatible types. | `layer-2-outputs/2.1-hook-type-matrix.md` |
| 2.2 | Hook Generation: Curiosity & Information Gap | Generate hooks using Category A types (A1-A6). Target: 3-5 hooks per angle in this category. | `layer-2-outputs/2.2-hooks-curiosity.md` |
| 2.3 | Hook Generation: Authority, Problem & Pain | Generate hooks using Categories B (B1-B4) and C (C1-C4). Target: 2-4 hooks per angle. | `layer-2-outputs/2.3-hooks-authority-pain.md` |
| 2.4 | Hook Generation: Transformation, Identity, Pattern Interrupt | Generate hooks using Categories D (D1-D3), E (E1-E3), F (F1-F4). Target: 2-3 hooks per angle. | `layer-2-outputs/2.4-hooks-transform-identity.md` |
| 2.5 | Hook Generation: Platform-Native, Scarcity, Value, Story | Generate hooks using Categories G (G1-G4), H (H1-H2), I (I1-I2), J (J1-J3). Target: 2-3 hooks per angle. | `layer-2-outputs/2.5-hooks-native-value-story.md` |
| 2.6 | Hook Deduplication | Remove duplicate or near-identical hooks across batches. Merge similar hooks, keeping strongest version. | `layer-2-outputs/2.6-deduplicated-hooks.md` |
| 2.7 | Layer 2 Validator | Verify 50+ hooks, 8+ types represented, each hook classified and attributed. | `layer-2-outputs/2.7-layer2-validation.md` |

#### 2.1 Hook Type Selection Matrix

**Input:** Ranked angles from 1.6, Hook Taxonomy (loaded in 0.3), Vertical Profile (loaded in 0.0.1)

**Process:**
1. For each of the 10-15 ranked angles, determine which hook types are natural fits
2. Consider:
   - **Angle category** (pain angles naturally map to Category C types, mechanism angles to Category A/B, etc.)
   - **Vertical-specific patterns** (health: weird food, doctor reveals; golf: distance promise, pro secret; etc.)
   - **Target platform** (TikTok: F2/F3/G types; YouTube: A/B types; Meta: all types)
   - **Audience awareness level** (unaware: pattern interrupt/curiosity; problem-aware: pain/solution; solution-aware: authority/proof)
3. Each angle should map to at least 4-6 compatible hook types
4. Ensure at least 8 of 32 hook types are targeted across all angles

**Output Format:**
```markdown
## Hook Type Selection Matrix

| Angle | A1-A6 | B1-B4 | C1-C4 | D1-D3 | E1-E3 | F1-F4 | G1-G4 | H1-H2 | I1-I2 | J1-J3 |
|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|
| Angle 1 | A2,A5 | B2 | C1,C2 | -- | -- | F1 | -- | -- | -- | -- |
| Angle 2 | A1,A6 | -- | -- | D1 | E1 | -- | G2 | -- | I1 | -- |
| ...     | ...   | ... | ... | ... | ... | ... | ... | ... | ... | ... |

Hook types targeted: [count] / 32
Hook types NOT targeted: [list -- ensure at least 8 targeted]
```

#### 2.2 Hook Generation: Curiosity & Information Gap (Category A)

**Types:** A1 (Question), A2 (Curiosity Gap), A3 (Surprising Fact), A4 (Cliffhanger), A5 (Belief Reversal), A6 (Secret/Insider)

**For each angle mapped to Category A types in the selection matrix:**

1. Generate 3-5 hooks per angle using the mapped types
2. Each hook MUST be:
   - **Classified:** Tagged with the specific type (A1, A2, etc.)
   - **Concise:** 5-15 words for text hooks; 1-sentence description for visual hooks
   - **Attributed:** Tagged to the source angle
   - **Platform-tagged:** Which platform(s) this hook suits best
3. Consult verbatim examples from AD-HOOK-TAXONOMY.md for each type
4. Apply vertical-specific patterns from the vertical profile

**Output Format (per hook):**
```markdown
### Hook C-001
- **Text:** "The #1 'healthy' food destroying your gut"
- **Type:** A6 (Secret/Insider)
- **Angle:** Angle 1 -- "The foods you trust are harming you"
- **Platform:** Meta, TikTok, YouTube
- **Word Count:** 8
- **Visual Direction Notes:** [If applicable -- e.g., "Image of vegetable with X overlay"]
```

**Target:** 3-5 hooks per angle for this category.

#### 2.3 Hook Generation: Authority, Problem & Pain (Categories B, C)

**Types:** B1 (Social Proof/Numbers), B2 (Authority/Expert), B3 (Skeptic Conversion), B4 (Testimonial/Personal Experience), C1 (Direct Pain Point), C2 (Common Mistake/Warning), C3 (Negative/"Don't Do This"), C4 (Problem-Solution)

**Same generation protocol as 2.2.** Target: 2-4 hooks per angle for these categories combined.

#### 2.4 Hook Generation: Transformation, Identity, Pattern Interrupt (Categories D, E, F)

**Types:** D1 (Before/After), D2 (Outcome Tease), D3 (Experiment/Experience), E1 (FOMO/Scarcity), E2 (Price/Value), E3 (Deadline/Time-Pressure), F1 (Audience Call-Out), F2 (Algorithmic Call-Out), F3 (Reply/Comment Response), F4 (Rapid-Fire Q&A)

**Same generation protocol as 2.2.** Target: 2-3 hooks per angle for these categories combined.

**Note on Category F hooks:** These are highly platform-specific. F2 (Algorithmic Call-Out) and F3 (Reply/Comment Response) are primarily TikTok/Reels hooks. Generate these ONLY if TikTok/Reels is a target platform.

#### 2.5 Hook Generation: Platform-Native, Visual, Humor, List, Story (Categories G, H, I, J)

**Types:** G1 (Pattern Interrupt/Visual Surprise), G2 (Demonstration), G3 (Unboxing/Reveal), G4 (Oddly Satisfying/ASMR), H1 (Comedy/Absurdist), H2 (Reverse Psychology), I1 (Numbered List), I2 (Superlative/Bold Claim), J1 (Taboo/Discomfort), J2 (Trending/Viral), J3 (Handwritten/Lo-Fi)

**Same generation protocol as 2.2.** Target: 2-3 hooks per angle for these categories combined.

**Note on visual hooks (G1-G4):** These hooks are primarily VISUAL, not text. Describe the visual concept in 1-2 sentences. Example: "G2: Close-up of supplement powder dissolving in water, revealing unusual purple color. Text overlay: 'Watch what happens.'"

#### 2.6 Hook Deduplication

**Input:** All hooks from 2.2-2.5

**Process:**
1. Collect all hooks into a single list
2. Identify exact duplicates (same text, different batch) -- remove
3. Identify near-duplicates (same angle + same type + similar phrasing) -- keep strongest version
4. Identify semantic duplicates (different words, same meaning) -- keep most specific version
5. For merged hooks, note which originals were combined

**Output:** Complete deduplicated hook bank with unique IDs

**Deduplication Rules:**
- Two hooks are near-duplicates if they share the SAME angle AND SAME type AND convey the SAME core idea
- When merging, prefer: more specific > more general, shorter > longer, stronger verb > weaker verb
- Never merge hooks from DIFFERENT angles (even if similar -- they serve different strategic purposes)

#### 2.7 Layer 2 Validator

**Validation Checks:**

| Check | Threshold | If Failed |
|-------|-----------|-----------|
| Total unique hooks generated | >= 50 | HALT -- continue generating. Return to 2.2-2.5 for underrepresented angles/types. |
| Hook types represented | >= 8 of 32 types | HALT -- generate hooks in underrepresented types |
| Each hook classified by type | 100% | HALT -- classify unclassified hooks |
| Each hook attributed to an angle | 100% | HALT -- attribute orphaned hooks |
| Hooks span at least 8 different angles | >= 8 angles | HALT -- generate hooks for underrepresented angles |
| Each hook has platform tag | 100% | HALT -- tag untagged hooks |
| Each hook is 5-15 words (text hooks) | 100% | HALT -- compress or expand out-of-range hooks |

**Gate 2: Hook Generation Complete**

```yaml
# GATE_2_COMPLETE.yaml
gate: 2
skill: "A02-hook-angle-discovery"
timestamp: "[ISO timestamp]"
result: PASS

hook_counts:
  total_before_dedup: [count]
  total_after_dedup: [count]  # must be >= 50
  by_category:
    A_curiosity: [count]
    B_authority: [count]
    C_pain: [count]
    D_transformation: [count]
    E_urgency: [count]
    F_engagement: [count]
    G_visual: [count]
    H_humor: [count]
    I_list: [count]
    J_special: [count]

types_represented: [count]  # must be >= 8
types_list: "[comma-separated type codes]"
angles_with_hooks: [count]  # must be >= 8
all_hooks_classified: true
all_hooks_attributed: true
all_hooks_platform_tagged: true

microskill_outputs:
  - id: "2.1"
    file: "layer-2-outputs/2.1-hook-type-matrix.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "2.2"
    file: "layer-2-outputs/2.2-hooks-curiosity.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "2.3"
    file: "layer-2-outputs/2.3-hooks-authority-pain.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "2.4"
    file: "layer-2-outputs/2.4-hooks-transform-identity.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "2.5"
    file: "layer-2-outputs/2.5-hooks-native-value-story.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "2.6"
    file: "layer-2-outputs/2.6-deduplicated-hooks.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "2.7"
    file: "layer-2-outputs/2.7-layer2-validation.md"
    size_bytes: [integer]
    minimum_met: true

all_outputs_verified: true
```

**IF total_after_dedup < 50 --> Gate 2 FAILS. Return to Layer 2 and continue generating.**

---

### Layer 2.5: Automated Scoring (Tier 1)

Score each hook on 6 criteria (1-10 each). Calculate weighted composite. Cut the bottom 70%. Advance the top 15-20 hooks to human curation.

| Microskill | Name | Purpose | Output File |
|------------|------|---------|-------------|
| 2.5.1 | Scroll-Stop Power Scoring | Does this hook create a pattern interrupt? Would a thumb stop? | `layer-2.5-outputs/2.5.1-scroll-stop-scores.md` |
| 2.5.2 | Curiosity Gap Scoring | Does this hook create an open loop? Does the viewer NEED to keep watching? | `layer-2.5-outputs/2.5.2-curiosity-gap-scores.md` |
| 2.5.3 | Big Idea Alignment Scoring | Does this hook lead toward the campaign's big idea? Or does it dead-end? | `layer-2.5-outputs/2.5.3-big-idea-alignment-scores.md` |
| 2.5.4 | Platform Nativeness Scoring | Would this feel natural in-feed on the target platform? Or does it scream "ad"? | `layer-2.5-outputs/2.5.4-platform-nativeness-scores.md` |
| 2.5.5 | Compliance Safety Scoring | Does this hook make claims we can support? Any regulatory risks? | `layer-2.5-outputs/2.5.5-compliance-safety-scores.md` |
| 2.5.6 | Specificity Scoring | Concrete detail vs. vague promise? Specific > generic. | `layer-2.5-outputs/2.5.6-specificity-scores.md` |
| 2.5.7 | Composite Scoring & Ranking | Calculate weighted average. Rank all hooks. Cut bottom 70%. Advance top 15-20. | `layer-2.5-outputs/2.5.7-composite-ranking.md` |

#### Scoring Criteria Detail

**2.5.1 Scroll-Stop Power (1-10)**

| Score | Meaning |
|-------|---------|
| 9-10 | Involuntary stop. Cannot scroll past this. Pattern interrupt is extreme. |
| 7-8 | Strong stop. Most viewers would pause. Clear novelty + relevance. |
| 5-6 | Moderate. Some viewers stop. Nothing extraordinary. |
| 3-4 | Weak. Blends with feed. Easy to scroll past. |
| 1-2 | Invisible. Generic phrasing, no novelty, no pattern interrupt. |

**Key question:** "If I were scrolling through 1,500 ads today, would my thumb physically stop for this?"

**2.5.2 Curiosity Gap (1-10)**

| Score | Meaning |
|-------|---------|
| 9-10 | Painful open loop. MUST keep watching. Information withheld perfectly. |
| 7-8 | Strong curiosity. Most viewers want the answer/reveal. |
| 5-6 | Moderate interest. Some curiosity but could walk away. |
| 3-4 | Weak gap. The hook gives away too much or too little. |
| 1-2 | No gap. Everything is resolved in the hook itself. |

**Key question:** "After reading this hook, is there an ITCH the viewer needs to scratch?"

**2.5.3 Big Idea Alignment (1-10)**

| Score | Meaning |
|-------|---------|
| 9-10 | Perfect pathway. This hook naturally leads to the big idea with zero contortion. |
| 7-8 | Strong alignment. Clear connection, minor bridging needed. |
| 5-6 | Moderate. Connection exists but requires setup in the body. |
| 3-4 | Weak alignment. Hook promises something the big idea doesn't fully deliver. |
| 1-2 | Dead-end. Hook leads to a topic the big idea doesn't address. |

**Key question:** "If someone stopped for this hook, would the big idea satisfy their curiosity?"

**2.5.4 Platform Nativeness (1-10)**

| Score | Meaning |
|-------|---------|
| 9-10 | Feels like organic content. Could be a friend's post. Zero "ad" signal. |
| 7-8 | Feels natural. Mostly native, slight commercial signal. |
| 5-6 | Recognizable as ad but not offensively so. Standard quality. |
| 3-4 | Feels like an ad. Polished, commercial, out of place in feed. |
| 1-2 | Screams "AD." Would trigger immediate scroll-past. |

**Key question:** "If this appeared in my feed between two organic posts, would it blend in or stand out as advertising?"

**Platform-specific scoring adjustments:**
- TikTok: UGC tone and trending formats score higher
- YouTube pre-roll: Authority and value-promise score higher
- Meta feed: Sound-off readability and text overlay quality score higher

**2.5.5 Compliance Safety (1-10)**

| Score | Meaning |
|-------|---------|
| 9-10 | Fully safe. No claims issues. No platform policy risks. |
| 7-8 | Safe with minor cautions. Standard disclaimers may be needed. |
| 5-6 | Moderate risk. Claims need substantiation. Platform review likely. |
| 3-4 | High risk. Specific claims that may trigger platform rejection. |
| 1-2 | Definite violation. Banned claims, misleading language, regulatory issues. |

**Vertical-specific compliance checks:**
- **Health:** No disease claims, no "cure/treat" language, weight loss restrictions (Meta)
- **Finance:** Regulatory compliance, no "guaranteed returns"
- **Golf:** Minimal issues; distance claims should cite conditions
- **Personal Dev:** Income claims require disclaimers
- **Technology:** Data privacy claims must be accurate

**2.5.6 Specificity (1-10)**

| Score | Meaning |
|-------|---------|
| 9-10 | Hyper-specific. Named ingredient, exact number, specific person, concrete detail. |
| 7-8 | Strong specificity. Clear detail, not generic. |
| 5-6 | Moderate. Some detail but also some vagueness. |
| 3-4 | Weak. Could apply to any product in the category. |
| 1-2 | Totally generic. "Discover the secret to..." / "What if you could..." |

**Key question:** "Could a competitor use this exact hook for THEIR product? If yes, it's not specific enough."

### Performance Validation (Optional -- 10% weight when impression data available)

When the A01 handoff includes `impression_weighted_hook_distribution`:
- Score each hook angle's TYPE against the impression-weighted performance data
- Hook types with performance_ratio > 1.5 in the weighted distribution get +2 bonus
- Hook types with performance_ratio < 0.5 get -1 penalty
- This criterion redistributes weight: other 6 criteria become ~15% each (from ~16.67%)

When NO impression data available:
- This criterion is SKIPPED
- Original 6 equally-weighted criteria apply (unchanged from v1.0)

#### 2.5.7 Composite Scoring & Ranking

**Composite Calculation:**

All 6 criteria are weighted equally:

```
Composite = (Scroll_Stop + Curiosity_Gap + Big_Idea_Alignment +
             Platform_Nativeness + Compliance_Safety + Specificity) / 6
```

**Cutoff Logic:**
1. Calculate composite score for every hook
2. Rank all hooks by composite score (descending)
3. Cut all hooks scoring below 7.0 composite average
4. If fewer than 15 hooks remain above 7.0, lower threshold to 6.5
5. If fewer than 15 hooks remain above 6.5, HALT -- return to Layer 2 and generate more hooks
6. Advance top 15-20 hooks to Layer 3 (Human Curation)

**Output Format:**
```markdown
## Composite Ranking

### ADVANCING TO HUMAN CURATION (Top 15-20)

| Rank | Hook ID | Hook Text | Type | Angle | Scroll | Curiosity | Alignment | Native | Compliance | Specificity | Composite |
|------|---------|-----------|------|-------|--------|-----------|-----------|--------|------------|-------------|-----------|
| 1 | C-047 | "..." | A6 | Angle 1 | 9 | 8 | 9 | 8 | 10 | 9 | 8.83 |
| 2 | C-012 | "..." | C1 | Angle 3 | 8 | 9 | 8 | 9 | 8 | 8 | 8.33 |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |

### CUT (Below Threshold)
[count] hooks cut (below [threshold] composite)

### Score Distribution
- Hooks >= 8.0: [count]
- Hooks 7.0-7.9: [count]
- Hooks 6.0-6.9: [count]
- Hooks < 6.0: [count]
```

**Gate 2.5: Scoring Complete**

```yaml
# GATE_2.5_COMPLETE.yaml
gate: 2.5
skill: "A02-hook-angle-discovery"
timestamp: "[ISO timestamp]"
result: PASS

scoring_summary:
  total_hooks_scored: [count]
  composite_threshold: [7.0 or 6.5]
  hooks_above_threshold: [count]  # must be >= 15
  hooks_cut: [count]
  hooks_advancing: [count]  # 15-20

top_5_hooks:
  - id: "[hook ID]"
    text: "[hook text]"
    composite: [score]
  - id: "[hook ID]"
    text: "[hook text]"
    composite: [score]
  # ... 3 more

score_distribution:
  above_8: [count]
  7_to_8: [count]
  6_to_7: [count]
  below_6: [count]

type_diversity_in_top_20:
  types_represented: [count]
  types_list: "[comma-separated]"

angle_diversity_in_top_20:
  angles_represented: [count]

all_outputs_verified: true
```

**IF hooks_advancing < 15 --> Gate 2.5 FAILS. Threshold too aggressive or insufficient hooks. Return to Layer 2.**

---

### Layer 3: Human Curation (BLOCKING)

This layer is a HUMAN gate. No model executes it. The system presents the top 15-20 hooks and waits for human selection.

| Microskill | Name | Purpose | Output File |
|------------|------|---------|-------------|
| 3.1 | Presentation Assembly | Organize top hooks by angle group for human scanning. Include all scores and rationale. | `layer-3-outputs/3.1-presentation.md` |
| 3.2 | Human Selection Capture | Capture human selections, modifications, and notes. BLOCKING GATE. | `layer-3-outputs/3.2-human-selection.md` |

#### 3.1 Presentation Assembly

**Present top 15-20 hooks organized by angle group:**

```markdown
## HOOK CURATION -- Your Selection Required

### Instructions
Select 8-10 hooks to advance to Format Strategy (A03) and Script Architecture (A04).
You may:
- Select hooks as-is
- Modify hook text (your edits are binding)
- Combine elements from multiple hooks
- Add entirely new hooks
- Add notes that constrain downstream execution

### Angle Group 1: "[Angle Statement]"
Composite Range: [X.X - X.X]

| # | Hook Text | Type | Composite | Scroll | Curiosity | Notes |
|---|-----------|------|-----------|--------|-----------|-------|
| 1 | "..." | A6 | 8.83 | 9 | 8 | Strongest in category |
| 2 | "..." | C2 | 8.17 | 8 | 9 | Platform: TikTok native |

### Angle Group 2: "[Angle Statement]"
[Same format]

### Angle Group 3: "[Angle Statement]"
[Same format]

[Continue for all angle groups with advancing hooks]

### Unaffiliated / Cross-Angle Hooks
[Any hooks that work across multiple angles]
```

#### 3.2 Human Selection Capture (BLOCKING GATE)

**This microskill CANNOT execute without human input.**

Capture:
- Which hooks are selected (by ID)
- Any modifications to hook text
- Any new hooks added by human
- Any notes or constraints for downstream skills
- Any hooks explicitly rejected with reason

**HUMAN_SELECTION.yaml Format:**

```yaml
# HUMAN_SELECTION.yaml
human_selection:
  skill: "A02-hook-angle-discovery"
  timestamp: "[ISO timestamp]"
  total_presented: [count]
  total_selected: [count]  # must be >= 8

  selected_hooks:
    - hook_id: "[original ID]"
      original_text: "[original hook text]"
      modified_text: "[if human modified -- otherwise same as original]"
      was_modified: [true/false]
      human_notes: "[any notes for downstream skills]"
      angle: "[source angle]"
      type: "[hook type code]"

    - hook_id: "[next selected hook]"
      # ...

  new_hooks_added:
    - text: "[human-created hook]"
      angle: "[which angle or 'new angle']"
      type: "[hook type or 'unclassified']"
      notes: "[context]"

  rejected_hooks:
    - hook_id: "[rejected ID]"
      reason: "[why rejected]"

  general_notes: "[any overarching direction from human]"
```

**Gate 3: Human Curation Complete**

```yaml
# GATE_3_COMPLETE.yaml
gate: 3
skill: "A02-hook-angle-discovery"
timestamp: "[ISO timestamp]"
result: PASS

human_selection_received: true
hooks_selected: [count]  # must be >= 8
hooks_modified: [count]
new_hooks_added: [count]
human_notes_captured: true

HUMAN_SELECTION_yaml_exists: true
```

**IF HUMAN_SELECTION.yaml does not exist --> Gate 3 FAILS. BLOCKED. Cannot proceed to Layer 4.**
**IF hooks_selected < 8 --> Gate 3 FAILS. Request human select additional hooks.**

---

### Layer 4: Output Packaging

| Microskill | Name | Purpose | Output File |
|------------|------|---------|-------------|
| 4.1 | HOOK-ANGLE-MATRIX.md Assembly | Assemble all 7 required sections of the primary output. | `HOOK-ANGLE-MATRIX.md` |
| 4.2 | Execution Log | Document all microskill executions with spec file reads. | `execution-log.md` |
| 4.3 | Checkpoint Assembly | Create final checkpoint confirming all outputs exist. | `checkpoints/GATE_4_COMPLETE.yaml` |

#### 4.1 HOOK-ANGLE-MATRIX.md Assembly

**Required Sections (all 7 mandatory):**

**Section 1: Strategic Angles**
- All 10-15 angles with:
  - Plain language statement
  - Source category (Pain/Mechanism/Identity/Proof/Competitive Gap)
  - Source attribution (specific quotes, data, upstream skill references)
  - Composite ranking score
  - Big Idea connection statement

**Section 2: Full Hook Bank**
- All 50-100+ hooks (pre-curation) with:
  - Unique ID
  - Hook text
  - Hook type classification (from 32-type taxonomy)
  - Source angle
  - Platform recommendation
  - All 6 scoring criteria (individual scores)
  - Composite score

**Section 3: Top 15-20 Presentation**
- The hooks that advanced to human curation
- Organized by angle group
- Full scoring breakdown with rationale

**Section 4: Human Selections**
- The 8-10 hooks selected by human
- Any modifications made (before/after)
- Any new hooks added
- All human notes (binding constraints for downstream)

**Section 5: Hook-Angle Cross-Reference**
- Matrix showing which hooks serve which angles
- Identifies angles with strong hook coverage vs. weak coverage
- Identifies angles whose hooks were ALL cut (potential strategic gap)

**Section 6: Platform Recommendations**
- Per-selected-hook platform mapping
- Which hooks suit which platforms
- Sound-on vs. sound-off considerations
- Vertical-specific platform notes

**Section 7: Variant Potential**
- For each selected hook, estimate the number of viable hook swap variants
- Group hooks by body compatibility (which hooks can share the same ad body?)
- Estimated total variant count from selected hooks

**Minimum file size:** 30KB (ensures comprehensive coverage, not a summary)

#### 4.2 Execution Log

Standard per-microskill execution log format:

```markdown
## [Microskill ID]: [Name]
- **Spec file read:** [Y/N] -- [path to .md file]
- **Output file created:** [Y/N] -- [path to output file]
- **Output file size:** [X]KB
- **Key metrics:** [microskill-specific]
- **Gate:** [PASS/FAIL]
```

#### 4.3 Checkpoint Assembly

**Gate 4: Output Packaging Complete**

```yaml
# GATE_4_COMPLETE.yaml
gate: 4
skill: "A02-hook-angle-discovery"
timestamp: "[ISO timestamp]"
result: PASS

primary_output:
  file: "HOOK-ANGLE-MATRIX.md"
  size_bytes: [integer]  # must be >= 30720 (30KB)
  sections_populated: 7  # must be 7/7
  section_checklist:
    strategic_angles: true
    full_hook_bank: true
    top_15_20_presentation: true
    human_selections: true
    hook_angle_cross_reference: true
    platform_recommendations: true
    variant_potential: true

execution_log:
  file: "execution-log.md"
  exists: true

all_gates_passed: [0, 1, 2, 2.5, 3, 4]
skill_complete: true
```

**IF HOOK-ANGLE-MATRIX.md < 30KB --> Gate 4 FAILS. Output is too thin.**
**IF any section is missing or empty --> Gate 4 FAILS. All 7 sections required.**

---

## GATE ARCHITECTURE SUMMARY

| Gate | Location | What It Blocks | Key Criteria | Gate File |
|------|----------|---------------|--------------|-----------|
| **Gate 0** | Layer 0 --> Layer 1 | Angle discovery | All inputs loaded. Campaign Brief exists. Research exists. A01 output exists. Big Idea exists. Hook Taxonomy loaded. | `checkpoints/GATE_0_COMPLETE.yaml` |
| **Gate 1** | Layer 1 --> Layer 2 | Hook generation | 10+ angles with source attribution. No angle IS the big idea. 3+ angle categories represented. | `checkpoints/GATE_1_COMPLETE.yaml` |
| **Gate 2** | Layer 2 --> Layer 2.5 | Automated scoring | 50+ unique hooks. 8+ hook types represented. Each hook classified, attributed, platform-tagged. | `checkpoints/GATE_2_COMPLETE.yaml` |
| **Gate 2.5** | Layer 2.5 --> Layer 3 | Human curation | 15+ hooks above composite threshold. Scoring complete for all hooks. | `checkpoints/GATE_2.5_COMPLETE.yaml` |
| **Gate 3** | Layer 3 --> Layer 4 | Output packaging | HUMAN_SELECTION.yaml exists. 8+ hooks selected. Human notes captured. **BLOCKING -- requires human input.** | `checkpoints/GATE_3_COMPLETE.yaml` |
| **Gate 4** | Skill completion | Downstream consumption | HOOK-ANGLE-MATRIX.md exists (30KB+). All 7 sections populated. Execution log exists. | `checkpoints/GATE_4_COMPLETE.yaml` |

### Binary Gate Enforcement

Gates are **PASS** or **FAIL** only. The following statuses are FORBIDDEN and trigger IMMEDIATE HALT:

| Forbidden Status | Why Invalid |
|-----------------|-------------|
| "PARTIAL_PASS" | Does not exist. Gates are binary. |
| "conditional pass" | Does not exist. Gates are binary. |
| "good enough for now" | Thresholds are exact, not approximate. |
| "close to 50 hooks" | 49 is not 50. Numbers are exact. |
| "most hooks are classified" | 100% means 100%. |
| "we can skip human curation -- the scores are clear" | Human selection is BLOCKING. Cannot be bypassed. |
| "8 hook types if you count subtypes" | 8 means 8 distinct type codes from the 32-type taxonomy. |

---

## ANTI-DEGRADATION SECTION

### Forbidden Behaviors

| # | Forbidden Behavior | Why It Fails | Detection Signal |
|---|-------------------|-------------|-----------------|
| 1 | Generating hooks without loading AD-HOOK-TAXONOMY.md | Hooks won't use the 32-type taxonomy. Type classification becomes arbitrary. | 0.3 output file doesn't confirm taxonomy loaded. |
| 2 | Generating hooks that ARE the big idea | Hooks should lead TO the big idea, not state it. "Certain plants contain gut-damaging lectins" is the big idea, not a hook. | Hook text is a complete thesis statement rather than a curiosity-provoking fragment. |
| 3 | All hooks being the same type (monoculture) | Minimum 8 of 32 types required. "50 questions" is not 50 hooks -- it's 50 variations of type A1. | Gate 2 type diversity check. |
| 4 | Hooks without angle attribution | Every hook must trace to a strategic angle. Orphaned hooks can't be evaluated for strategic coherence. | Layer 2 validator check. |
| 5 | "These hooks are good enough" with < 50 generated | Volume is non-negotiable. The algorithm needs variant volume. 50 is the MINIMUM, not a target. | Gate 2 count check. |
| 6 | Skipping human curation | "The top-scored hooks are clearly the best" is not an acceptable substitute for human selection. | Gate 3 checks for HUMAN_SELECTION.yaml. |
| 7 | Generic hooks | "Discover the secret to...", "What if you could...", "Imagine a world where..." -- these are copywriting cliches, not scroll-stopping hooks. | Specificity score < 5 on generic hooks. |
| 8 | Generating hooks without reading upstream packages | Hooks must be DERIVED from research and strategy, not invented from thin air. | 0.1 output file missing or incomplete. |
| 9 | Angles without source attribution | Every angle must cite which research quotes, data points, or strategic outputs it comes from. | Layer 1 validator check. |
| 10 | Skipping automated scoring | All 50+ hooks must be scored on all 6 criteria before human curation. Cherry-picking without systematic scoring is forbidden. | Gate 2.5 checks for scoring completeness. |

### Forbidden Rationalizations (IMMEDIATE HALT if Detected)

| Rationalization | Why Invalid |
|-----------------|-------------|
| "Quality over quantity -- these 15 hooks are better than 50 mediocre ones" | BOTH quality AND quantity required. Generate 50+ first, THEN score for quality. |
| "We don't need all 32 hook types" | Minimum 8 types, not all 32. But monoculture (all one type) is forbidden. |
| "The big idea IS the best hook" | Structurally impossible. The big idea is the destination. Hooks are entry points. |
| "These angles are obvious from the brief" | Angles must be DERIVED from research quotes with source attribution, not assumed. |
| "Scoring is subjective so automated scoring doesn't help" | Systematic scoring surfaces hooks that would be overlooked. Human curation is the subjective step. |
| "The human can select from 10 hooks instead of 15-20" | Present 15-20. The human may surprise you with what they select. |
| "Platform tags don't matter at this stage" | Platform awareness during generation produces better hooks. A TikTok hook differs from a YouTube hook. |

### A02-Specific MC-CHECK

```yaml
A02-MC-CHECK:
  taxonomy_loaded: [Y/N]  # Is AD-HOOK-TAXONOMY.md in active context?
  angles_from_research: [Y/N]  # Are angles derived from upstream, not invented?
  hook_count: [exact]  # Is it >= 50?
  type_diversity: [count]  # Is it >= 8 types?
  all_hooks_attributed: [Y/N]  # Does every hook trace to an angle?
  am_i_generating_big_idea_as_hook: [Y/N]
  am_i_generating_only_one_type: [Y/N]
  am_i_thinking_good_enough_with_low_count: [Y/N]
  am_i_thinking_skip_human_curation: [Y/N]

  IF any_rationalization_detected: HALT
  IF hook_count < 50: CONTINUE GENERATING
  IF type_diversity < 8: GENERATE IN UNDERREPRESENTED TYPES
```

---

## HOOK TYPE QUICK REFERENCE

Condensed reference for the 10 categories and 32 types from AD-HOOK-TAXONOMY.md. Consult the full taxonomy for examples and performance data.

### Category A: Curiosity & Information Gap (Pathway: Information Gap)

| Code | Type | Core Mechanic | Example Pattern |
|------|------|--------------|-----------------|
| A1 | Question | Unanswered question creates cognitive tension | "Can anyone learn to sing?" |
| A2 | Curiosity Gap / Tease | Hints at info without revealing | "Everything you knew about X is wrong" |
| A3 | Surprising Fact / Statistic | Unexpected data point | "73% of ecommerce video ads fail in 3 seconds" |
| A4 | Cliffhanger / Suspense | Builds tension, promises resolution | "This one change will..." |
| A5 | Belief Reversal / Contrarian | Challenges accepted wisdom | "Personal trainers are overrated" |
| A6 | Secret / Insider Knowledge | Promises exclusive information | "What dermatologists use but rarely share" (47% hook rate) |

### Category B: Authority & Social Proof (Pathway: Direct Solution)

| Code | Type | Core Mechanic | Example Pattern |
|------|------|--------------|-----------------|
| B1 | Social Proof / Numbers | Leverages crowd validation | "Over 1,000 customers can't be wrong" |
| B2 | Authority / Expert | Expert positioning bypasses skepticism | "Harvard researchers found..." |
| B3 | Skeptic Conversion Arc | Opens with skepticism, reveals conversion | "I thought this was a scam. I was wrong." (39% hook rate) |
| B4 | Testimonial / Personal Experience | Emotional connection through story | "How I went from X to Y in 30 days" |

### Category C: Pain Point & Problem (Pathway: Direct Solution)

| Code | Type | Core Mechanic | Example Pattern |
|------|------|--------------|-----------------|
| C1 | Direct Pain Point | Addresses specific suffering | "POV: Tried every acne cream, still breaking out" (35% hook rate) |
| C2 | Common Mistake / Warning | Highlights widespread error | "Stop doing X right now! Do this instead" |
| C3 | Negative / "Don't Do This" | Loss aversion via negative framing | "You are wasting your money on..." |
| C4 | Problem-Solution | Names problem, promises solution | "Close your books in 2 days instead of 2 weeks" |

### Category D: Transformation & Results (Pathway: Direct Solution)

| Code | Type | Core Mechanic | Example Pattern |
|------|------|--------------|-----------------|
| D1 | Before/After | Visual or narrative transformation | "Before vs. After: swipe to see" |
| D2 | Outcome Tease | Aspirational result + surprising method | "We got 1,000 signups with zero ads" |
| D3 | Experiment / Experience | Results from personal testing | "I published 1 video every day for 30 days" |

### Category E: Urgency & Scarcity (Pathway: Direct Solution)

| Code | Type | Core Mechanic | Example Pattern |
|------|------|--------------|-----------------|
| E1 | FOMO / Scarcity | Limited availability compels action | "Only 5 left in stock" |
| E2 | Price / Value | Leads with affordability or extraordinary value | "I found the perfect product for X, under $20" |
| E3 | Deadline / Time-Pressure | Time-bound opportunity | "This opportunity closes at midnight" |

### Category F: Engagement & Platform-Native (Pathway: Pattern Interrupt)

| Code | Type | Core Mechanic | Example Pattern |
|------|------|--------------|-----------------|
| F1 | Audience Call-Out | Directly addresses a specific demographic | "If you are a [target], stop scrolling!" |
| F2 | Algorithmic Call-Out / Platform-Native | References the platform algorithm | "If you're seeing this on your FYP..." (41% hook rate -- highest tested) |
| F3 | Reply / Comment Response | Mimics platform-native comment format | "Okay, I keep getting this comment..." (38% hook rate) |
| F4 | Rapid-Fire Q&A | Addresses common questions quickly | "Rapid fire replies to the most asked questions" |

### Category G: Visual & Sensory (Pathway: Pattern Interrupt)

| Code | Type | Core Mechanic | Example Pattern |
|------|------|--------------|-----------------|
| G1 | Pattern Interrupt / Visual Surprise | Unexpected visuals break scroll | Post-it note covering product, then removed |
| G2 | Demonstration / "Show Don't Tell" | Product solving problem visually | Squatty Potty unicorn demo |
| G3 | Unboxing / Reveal | Anticipation through revealing | "Unboxing the viral product to see if it's worth it" |
| G4 | Oddly Satisfying / ASMR | Mesmerizing visual/auditory textures | Product texture close-ups with satisfying sounds |

### Category H: Humor & Entertainment (Pathway: Pattern Interrupt)

| Code | Type | Core Mechanic | Example Pattern |
|------|------|--------------|-----------------|
| H1 | Comedy / Absurdist | Humor earns attention | "Our blades are f***ing great" (Dollar Shave Club) |
| H2 | Reverse Psychology / Disqualifier | "Don't buy this" triggers reactance | "Don't buy this hair oil if you hate shiny hair" (34% hook rate) |

### Category I: List & Structure (Pathway: Information Gap)

| Code | Type | Core Mechanic | Example Pattern |
|------|------|--------------|-----------------|
| I1 | Numbered List | Digestible numbered format | "3 mistakes most people make when..." |
| I2 | Superlative / Bold Claim | "Best," "fastest," "most advanced" | "Finally: the world's first..." |

### Category J: Special Format (Pathway: Information Gap / Pattern Interrupt)

| Code | Type | Core Mechanic | Example Pattern |
|------|------|--------------|-----------------|
| J1 | Taboo / Discomfort | Leverages avoided topics | "The one thing nobody wants to admit about..." |
| J2 | Trending / Viral | References current trends | "TikTok Made Me Buy This" |
| J3 | Handwritten / Lo-Fi | Deliberately amateur visuals | Handwritten note, whiteboard explanation |

### Performance Benchmarks

| Hook Type | Tested Hook Rate | Rank |
|-----------|-----------------|------|
| A6 (Industry Secret) | 47% | #1 |
| F2 (Algorithmic Call-Out) | 41% | #2 |
| B3 (Skeptic Conversion) | 39% | #3 |
| F3 (Platform Native Reply) | 38% | #4 |
| C1 (POV Pain Point) | 35% | #5 |
| H2 (Reverse Psychology) | 34% | #6 |
| A2 (Curiosity Gap Listicle) | 31% | #7 |

**Hook rate target:** 30%+ (only 14% of tested hooks achieve this)
**Hook refresh cycle:** Every 7-10 days at high spend
**Performance drops 37% after 7 days** at high spend levels

---

## PER-MICROSKILL OUTPUT REQUIREMENTS

Every microskill execution MUST produce its own dedicated output file following the CopywritingEngine per-microskill output protocol.

### Minimum File Size Thresholds

| Microskill Type | Minimum Size | A02 Examples |
|-----------------|-------------|--------------|
| Loader/Validator (Layer 0) | 1KB | 0.0.1, 0.1, 0.2, 0.3, 0.4, 0.5 |
| Angle Mining (Layer 1) | 3KB | 1.1, 1.2, 1.3, 1.4, 1.5 |
| Deduplication/Ranking (Layer 1) | 5KB | 1.6 |
| Validation (Layer 1, 2) | 2KB | 1.7, 2.7 |
| Hook Type Matrix (Layer 2) | 3KB | 2.1 |
| Hook Generation Batches (Layer 2) | 5KB | 2.2, 2.3, 2.4, 2.5 |
| Hook Deduplication (Layer 2) | 5KB | 2.6 |
| Individual Scoring (Layer 2.5) | 3KB | 2.5.1 through 2.5.6 |
| Composite Ranking (Layer 2.5) | 5KB | 2.5.7 |
| Presentation Assembly (Layer 3) | 5KB | 3.1 |
| Human Selection Capture (Layer 3) | 2KB | 3.2 |
| Primary Output (Layer 4) | 30KB | HOOK-ANGLE-MATRIX.md |

### Required Section Headers Per Output

Every per-microskill output file MUST contain:

```markdown
# [Microskill ID]: [Microskill Name]
## Execution Context
- Skill: A02-hook-angle-discovery
- Layer: [layer number]
- Timestamp: [execution time]
- Input files read: [list]

## Output
[Microskill-specific output]

## Quality Metrics
- [Microskill-specific quality measures]
- Schema compliance: [Y/N]
- Minimum thresholds met: [Y/N]
```

---

## OUTPUT PATH CONVENTION

All A02 outputs go to:

```
./
  outputs/
    [project-name]/
      A02-hook-angle-discovery/
        layer-0-outputs/
          0.0.1-vertical-profile.md
          0.1-upstream-packages.md
          0.2-ad-intelligence.md
          0.3-hook-taxonomy.md
          0.4-soul-md.md
          0.5-input-validation.md
        layer-1-outputs/
          1.1-pain-angles.md
          1.2-mechanism-angles.md
          1.3-identity-angles.md
          1.4-proof-angles.md
          1.5-competitive-gap-angles.md
          1.6-ranked-angles.md
          1.7-layer1-validation.md
        layer-2-outputs/
          2.1-hook-type-matrix.md
          2.2-hooks-curiosity.md
          2.3-hooks-authority-pain.md
          2.4-hooks-transform-identity.md
          2.5-hooks-native-value-story.md
          2.6-deduplicated-hooks.md
          2.7-layer2-validation.md
        layer-2.5-outputs/
          2.5.1-scroll-stop-scores.md
          2.5.2-curiosity-gap-scores.md
          2.5.3-big-idea-alignment-scores.md
          2.5.4-platform-nativeness-scores.md
          2.5.5-compliance-safety-scores.md
          2.5.6-specificity-scores.md
          2.5.7-composite-ranking.md
        layer-3-outputs/
          3.1-presentation.md
          3.2-human-selection.md
        checkpoints/
          GATE_0_COMPLETE.yaml
          GATE_1_COMPLETE.yaml
          GATE_2_COMPLETE.yaml
          GATE_2.5_COMPLETE.yaml
          GATE_3_COMPLETE.yaml
          GATE_4_COMPLETE.yaml
        HOOK-ANGLE-MATRIX.md           # Primary output
        execution-log.md               # Execution verification
        HUMAN_SELECTION.yaml           # Human curation selections
```

---

## INTEGRATION WITH DOWNSTREAM SKILLS

### A03 (Format Strategy) Consumes:
- Selected hooks (8-10) with platform recommendations
- Angle groupings (which hooks share strategic territory)
- Platform tags from scoring

### A04 (Script Architecture) Consumes:
- Selected hooks with type classifications
- Big idea alignment scores (to ensure hook-body coherence)
- Angle statements (for body content alignment)
- Human notes (binding constraints)

### A07 (Copy Production) Consumes:
- Full hook bank (for hook swap variant generation)
- Hook-angle cross-reference (to ensure variants maintain angle coherence)
- Variant potential estimates

### A06 (Ad Arena) References:
- Hook-angle matrix for evaluating complete ad concepts (hook + script + visual as unit)

---

## MC-CHECK SCHEDULE

| Trigger Point | MC-CHECK Type | Key Questions |
|---------------|--------------|---------------|
| Layer 0 complete | MC-CHECK | All inputs loaded? Taxonomy in context? |
| After 1.3 (mid-Layer 1) | MC-CHECK-LITE | Angles from research, not invented? |
| Gate 1 | MC-CHECK | 10+ angles? Source attribution? No angle IS big idea? |
| After 2.3 (mid-Layer 2) | MC-CHECK-LITE | Hook count on track? Type diversity on track? |
| After 2.5 (mid-Layer 2) | MC-CHECK-LITE | Still generating from taxonomy? Not falling into monoculture? |
| Gate 2 | MC-CHECK | 50+ hooks? 8+ types? All classified and attributed? |
| Gate 2.5 | MC-CHECK | Scoring complete? 15+ above threshold? |
| Gate 3 | MC-CHECK | Human selection received? 8+ selected? Notes captured? |
| Gate 4 | MC-CHECK | HOOK-ANGLE-MATRIX.md exists? 30KB+? All 7 sections? |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation. Full layer architecture (0-4 + 2.5), 32-type taxonomy integration, 6-criteria automated scoring, human curation gate, angle-hook-big idea hierarchy, model assignment table, gate architecture, anti-degradation section, per-microskill output requirements. |
| 1.1 | 2026-02-27 | Meta Ad Spy integration: Added optional `impression_weighted_hook_distribution` input from A01 Tool-Assisted Scan mode. Added Performance Validation criterion (optional 7th scoring criterion, 10% weight when impression data available, redistributes other 6 to ~15% each). |
