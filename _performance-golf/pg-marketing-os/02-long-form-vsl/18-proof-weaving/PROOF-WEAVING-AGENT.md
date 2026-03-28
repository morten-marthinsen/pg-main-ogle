# Skill 15.5: Proof Weaving

> **Version:** 1.4
> **Phase:** 3 (Section Writing)
> **Position:** After 17-close, before 19-campaign-assembly
> **Status:** COMPLETE (All Layers Active)

---

## PURPOSE

Draft all proof elements into assembly-ready copy blocks. This skill takes the proof inventory (what proof exists) and the structure/brief (where proof goes) and writes the actual proof copy — testimonials, before/afters, study citations, demonstrations — so that Campaign Assembly has complete, written proof blocks ready for insertion.

**Key Distinction:** This is a DRAFTING skill, not a strategic skill. It writes copy, not strategy.

---

## POSITION IN SEQUENCE

```
Phase 3: Section Writing
├── 11-lead
├── 12-story
├── 13-root-cause-narrative
├── 14-mechanism-narrative
├── 15-product-introduction
├── 16-offer-copy
├── 17-close
└── 18-proof-weaving ← DRAFTS ALL PROOF COPY

Phase 3.5: Assembly
└── 19-campaign-assembly ← INSERTS PROOF BLOCKS INTO FINAL DOCUMENT
```

**Why This Position:**
- All section drafts complete (09-15)
- Structure tells us WHERE proof goes in each section
- Brief tells us WHAT TYPE of proof (testimonial cascade, single powerful testimonial, before/after progression, etc.)
- Proof Inventory tells us WHAT PROOF we have
- This skill DRAFTS the proof copy
- Assembly INSERTS the drafted proof blocks

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Foundation + specimen loading | haiku | Input loading, no reasoning needed |
| 1 | Proof architecture + section mapping + density planning | sonnet | Structural mapping from upstream |
| 2 | Proof block drafting (7 proof types) | opus | Creative writing — max quality |
| 2.5 | Arena (7 competitors × 2 rounds + audience evaluation) | opus | Maximum quality generation |
| 3 | Validation + density audit | opus | Judgment-heavy evaluation |
| 4 | Assembly instructions packaging | sonnet | Assembly from existing content |

### Layer 2.5: Arena (MANDATORY FILE READS)

**BEFORE generating ANY Arena competitor output, READ these files:**

1. `18-proof-weaving/ARENA-LAYER.md` — skill-specific criteria and weights
2. `~system/protocols/ARENA-CORE-PROTOCOL.md` — execution protocol
3. `~system/protocols/ARENA-PERSONA-PANEL.md` — persona specifications

**VERIFY personas match protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect**

**If personas don't match → HALT — FABRICATION DETECTED**

---

## INPUTS

### From 02-proof-inventory (proof-inventory-output.json)

```yaml
proof_elements:
  testimonials:
    - id: "testimonial_001"
      source: "John D., Texas"
      raw_quote: "I lost 47 pounds in 3 months..."
      proof_type: "transformation"
      strength_score: 8.5

  before_afters:
    - id: "ba_001"
      before_state: "..."
      after_state: "..."
      timeframe: "90 days"

  studies:
    - id: "study_001"
      citation: "Journal of..."
      key_finding: "..."

  demonstrations:
    - id: "demo_001"
      type: "mechanism_proof"
      description: "..."
```

### From 08-structure (structure-package.json)

```yaml
proof_placements:
  lead:
    proof_density: 2
    proof_types: ["credibility_anchor", "authority_mention"]
    placement_notes: "Brief credibility insertion, not heavy proof"

  mechanism_narrative:
    proof_density: 4
    proof_types: ["study_citation", "demonstration"]
    placement_notes: "Prove the mechanism works"

  proof_section:
    proof_density: 8
    proof_types: ["testimonial_cascade", "before_after_progression"]
    placement_notes: "Heavy proof section after mechanism reveal"

  product_introduction:
    proof_density: 3
    proof_types: ["testimonial_single", "results_summary"]
    placement_notes: "Transition proof to product"

  offer_copy:
    proof_density: 2
    proof_types: ["testimonial_single", "guarantee_proof"]
    placement_notes: "Value proof for offer stack"

  close:
    proof_density: 2
    proof_types: ["transformation_reminder", "urgency_proof"]
    placement_notes: "Final proof push before CTA"
```

### From 09-campaign-brief (campaign-brief-package.json)

```yaml
proof_direction:
  testimonial_style: "narrative" | "quote_block" | "integrated"
  before_after_format: "side_by_side" | "story_progression" | "stats_focused"
  study_citation_depth: "mention_only" | "explain_finding" | "full_breakdown"
  proof_emotional_register: "triumphant" | "relieved" | "amazed"
  avatar_resonance_priority: ["age_match", "problem_match", "lifestyle_match"]
```

---

## OUTPUTS

### proof-weaving-package.json

```json
{
  "proof_blocks": {
    "lead": [
      {
        "block_id": "lead_credibility_001",
        "type": "authority_mention",
        "drafted_copy": "Dr. Sarah Chen, who spent 23 years at Johns Hopkins studying metabolic disorders, discovered something that would change everything...",
        "word_count": 24,
        "placement": "paragraph_2",
        "proof_elements_used": ["authority_001"]
      }
    ],

    "mechanism_narrative": [
      {
        "block_id": "mech_proof_001",
        "type": "study_citation",
        "drafted_copy": "In a landmark 2019 study published in the Journal of Clinical Nutrition, researchers found that this compound increased metabolic rate by 47% — without any change in diet or exercise...",
        "word_count": 38,
        "placement": "after_mechanism_explanation",
        "proof_elements_used": ["study_001"]
      },
      {
        "block_id": "mech_proof_002",
        "type": "demonstration",
        "drafted_copy": "You can see this working in real-time. When patients take this compound, their blood work shows...",
        "word_count": 52,
        "placement": "mechanism_demo_section",
        "proof_elements_used": ["demo_001"]
      }
    ],

    "proof_section": [
      {
        "block_id": "testimonial_cascade_001",
        "type": "testimonial_sequence",
        "drafted_copy": "Take John D. from Texas. At 57, he'd tried everything — keto, intermittent fasting, even those expensive meal delivery services. Nothing worked. Three months after discovering [mechanism], he stepped on the scale and saw something he hadn't seen in 20 years: 187 pounds. 'I lost 47 pounds,' he told us, 'and I didn't change anything else. Same foods. Same schedule. Just this one thing.'\\n\\nOr consider Maria S. from Florida...",
        "word_count": 156,
        "placement": "proof_section_opening",
        "proof_elements_used": ["testimonial_001", "testimonial_002", "testimonial_003"]
      },
      {
        "block_id": "before_after_001",
        "type": "before_after_progression",
        "drafted_copy": "Before: Waking up exhausted. Struggling to button his pants. Avoiding mirrors.\\n\\nAfter: Bounding out of bed at 6am. Wearing clothes he hadn't fit into since college. Actually looking forward to beach vacations.\\n\\nThe transformation took 90 days...",
        "word_count": 72,
        "placement": "after_testimonial_cascade",
        "proof_elements_used": ["ba_001"]
      }
    ],

    "product_introduction": [
      {
        "block_id": "product_proof_001",
        "type": "results_summary",
        "drafted_copy": "To date, over 47,000 people have used [Product Name] to transform their metabolism. The average user loses 23 pounds in the first 60 days...",
        "word_count": 34,
        "placement": "product_reveal_support",
        "proof_elements_used": ["aggregate_stats_001"]
      }
    ],

    "offer_copy": [
      {
        "block_id": "offer_proof_001",
        "type": "value_testimonial",
        "drafted_copy": "'I would have paid $5,000 for this information,' says Robert M. from Ohio. 'It's worth more than the three different gym memberships I wasted money on.'",
        "word_count": 32,
        "placement": "value_stack_support",
        "proof_elements_used": ["testimonial_007"]
      }
    ],

    "close": [
      {
        "block_id": "close_proof_001",
        "type": "transformation_reminder",
        "drafted_copy": "Remember John? The 57-year-old from Texas who lost 47 pounds? He's now training for his first 5K. At 58 years old. That could be you in 90 days...",
        "word_count": 38,
        "placement": "before_final_cta",
        "proof_elements_used": ["testimonial_001"]
      }
    ]
  },

  "density_verification": {
    "lead": { "target": 2, "achieved": 2, "status": "met" },
    "mechanism_narrative": { "target": 4, "achieved": 4, "status": "met" },
    "proof_section": { "target": 8, "achieved": 8, "status": "met" },
    "product_introduction": { "target": 3, "achieved": 3, "status": "met" },
    "offer_copy": { "target": 2, "achieved": 2, "status": "met" },
    "close": { "target": 2, "achieved": 2, "status": "met" }
  },

  "proof_element_usage": {
    "testimonial_001": { "used_in": ["proof_section", "close"], "times_used": 2 },
    "testimonial_002": { "used_in": ["proof_section"], "times_used": 1 },
    "study_001": { "used_in": ["mechanism_narrative"], "times_used": 1 },
    "unused_elements": ["testimonial_008", "ba_003"]
  },

  "assembly_instructions": {
    "insertion_order": [
      "lead_credibility_001 → lead paragraph 2",
      "mech_proof_001 → after mechanism explanation",
      "mech_proof_002 → mechanism demo section",
      "testimonial_cascade_001 → proof section opening",
      "before_after_001 → after testimonial cascade",
      "product_proof_001 → product reveal support",
      "offer_proof_001 → value stack support",
      "close_proof_001 → before final CTA"
    ],
    "transition_notes": {
      "into_proof_section": "After mechanism reveal, use bridge: 'But don't take my word for it...'",
      "out_of_proof_section": "End with future pacing: 'And you could be next...'"
    }
  }
}
```

---

## 4-LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

**Purpose:** Load all upstream packages, TIER1 proof patterns, teachings, and present human checkpoint.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 0.1 | `0.1-upstream-loader.md` | Load proof-inventory, structure, campaign-brief + secondary packages for correlation | **ACTIVE** |
| 0.2 | `0.2-vault-intelligence-loader.md` | Load TIER1 proof patterns (distribution, dramatization, transitions, placement matrix) | **ACTIVE** |
| 0.2.6 | `0.2.6-curated-gold-specimens.md` | Load verbatim elite proof specimens as statistical attractors — 9 Gold specimens, 3 Silver specimens, proof transition patterns, proof sequencing strategies, TIER1-derived proof density benchmarks | **ACTIVE** |
| 0.3 | `0.3-teachings-loader.md` | Load proof writing principles (Makepeace, Halbert, Schwartz, Carlton, Georgi, Ogilvy) | **ACTIVE** |
| 0.4 | `0.4-input-validator.md` | Validate all required inputs present, proof sufficiency, type coverage | **ACTIVE** |
| 0.5 | `0.5-human-checkpoint-curator.md` | Present proof approach to human for confirmation | **ACTIVE** |

**Execution Order:** 0.1 → 0.2 + 0.2.6 (parallel) → 0.3 → 0.4 → 0.5

**GATE_0:** All upstream packages loaded, TIER1 patterns indexed, teachings loaded, human confirmation received.

---

### Layer 1: Architecture & Planning

**Purpose:** Map proof placements, plan density, scan for dramatization opportunities, select elements, choose sequencing strategy.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 1.1 | `1.1-proof-section-mapper.md` | Map proof opportunities to EVERY section (not just proof section) | **ACTIVE** |
| 1.2 | `1.2-density-planner.md` | Set density targets per section based on approach (proof-first, authority-driven, data-heavy) | **ACTIVE** |
| 1.3 | `1.3-dramatization-opportunity-scanner.md` | Find ALL opportunities to dramatize/accentuate proof (claim proximity, objection points, emotional peaks, contrast, scale, callbacks) | **ACTIVE** |
| 1.4 | `1.4-proof-element-selector.md` | Match specific proof elements to specific placements using score/type/variety criteria | **ACTIVE** |
| 1.5 | `1.5-sequencing-strategy-selector.md` | Select optimal proof sequencing (proof-first, authority-to-social, scale cascade, testimonial parade, data cascade, balanced) | **ACTIVE** |

**Execution Order:** 1.1 → 1.2 → 1.3 → 1.4 → 1.5

**GATE_1:** All sections mapped, density targets set, elements selected, sequencing strategy chosen.

---

### Layer 2: Drafting

**Purpose:** WRITE the actual proof copy using type-specific drafting skills.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 2.1 | `2.1-testimonial-drafter.md` | Write testimonial sequences (full story, quick-hit, authority-embedded, 8-beat cascade) | **ACTIVE** |
| 2.2 | `2.2-before-after-drafter.md` | Write maximum-contrast transformation narratives | **ACTIVE** |
| 2.3 | `2.3-study-citation-drafter.md` | Write persuasive (not academic) study citations using 6-step structure | **ACTIVE** |
| 2.4 | `2.4-demonstration-proof-drafter.md` | Write quantified outcome demonstrations (superiority, speed, visual, comparison, scale, real-time) | **ACTIVE** |
| 2.5 | `2.5-authority-proof-drafter.md` | Write "living proof" authority copy with personal stake | **ACTIVE** |
| 2.6 | `2.6-scale-proof-drafter.md` | Write individual → pattern → scale progressions | **ACTIVE** |
| 2.7 | `2.7-data-proof-drafter.md` | Write weaponized statistics (rhetorical cascade, government data, data cascade) | **ACTIVE** |
| 2.8 | `2.8-proof-transition-drafter.md` | Write smooth transitions INTO, OUT OF, and BETWEEN proof sections | **ACTIVE** |

**Execution Order:** 2.1-2.7 (parallel by type) → 2.8 (transitions)

**GATE_2:** All proof blocks drafted with transitions, density targets met.

---

### Layer 2.5: Arena Persona Generation

**Purpose:** Generate multi-perspective proof block candidates through legendary copywriter personas, then score and rank for human selection.

> **Reference:** See `ARENA-LAYER.md` for complete specification

#### State Machine

```
IDLE --> TRIGGERED --> LAYER_0 --> HUMAN_CHECKPOINT --> LAYER_1 --> LAYER_2 --> ARENA --> LAYER_3 --> LAYER_4 --> COMPLETE
                           ↓                                 ↓          ↓          ↓          ↓          ↓
                        [GATE_0]                          [GATE_1]   [GATE_2]  [GATE_2.5] [GATE_3]   [GATE_4]
                           ↓                                 ↓          ↓          ↓          ↓          ↓
                        PASS/FAIL                         PASS/FAIL  PASS/FAIL  HUMAN_SEL PASS/FAIL  PASS/FAIL
```

#### Persona Panel (6 Experts)

| Persona | Proof Weaving Lens |
|---------|-------------------|
| **Makepeace** | Flow architecture — transitions that feel inevitable, pacing that builds |
| **Halbert** | Entertainment value — proof that reads like drama, hooks that pull through |
| **Schwartz** | Market sophistication — proof pitched to awareness level, never over/under |
| **Ogilvy** | Credibility engineering — institutional authority, specific citation power |
| **Clemens** | Scientific clarity — proof that explains the mechanism, institutional backing |
| **Bencivenga** | Proof-first dominance — let evidence do the heavy lifting |

#### 7 Judging Criteria

| Criterion | Weight | What It Measures |
|-----------|--------|------------------|
| **Testimonial Cascade Quality** | 20% | 8-beat flow pattern execution, name/location specificity, emotional variety — CRITICAL |
| **Before/After Contrast Impact** | 15% | Maximum emotional contrast, specific measurable outcomes, vivid state descriptions |
| **Study Citation Persuasiveness** | 15% | 6-step structure adherence, institution name-drop, specific findings (not academic) |
| **Transition Smoothness** | 15% | Into/out of/between proof sections — no jarring "here are testimonials" |
| **Density Target Achievement** | 15% | Meets TIER1 benchmarks per section (lead 1-2, mechanism 3-4, proof 6-8+, etc.) |
| **Avatar Resonance** | 10% | Proof subjects match target avatar demographics, struggles, outcomes, language |
| **Emotional Register Calibration** | 10% | Matches campaign-brief proof direction (triumphant, relieved, amazed) |

#### Execution Flow

1. **Multi-Perspective Generation** — Each persona generates proof block candidates for each proof type
2. **Judging Round** — Score all candidates against 7 criteria (weighted)
3. **Ranking & Rationale** — Rank top 5 with explicit reasoning per criterion
4. **Human Selection Checkpoint** — Present ranked candidates; human selects or requests regeneration

**GATE_2.5:** BLOCKING — Requires human selection before Layer 3 proceeds.

---

### Layer 3: Refinement

**Purpose:** Calibrate emotional register, check avatar resonance, validate density, verify flow.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 3.1 | `3.1-emotional-register-calibrator.md` | Ensure proof tone matches campaign brief direction | **ACTIVE** |
| 3.2 | `3.2-avatar-resonance-checker.md` | Ensure proof resonates with target avatar (demographics, struggles, outcomes, language) | **ACTIVE** |
| 3.3 | `3.3-density-validation.md` | Verify all density targets met, type balance, section appropriateness | **ACTIVE** |
| 3.4 | `3.4-flow-rhythm-checker.md` | Ensure proof flows naturally (transitions, paragraph rhythm, sentence variety, pacing) | **ACTIVE** |

**Execution Order:** 3.1 → 3.2 → 3.3 → 3.4

**GATE_3:** Register calibrated, avatar resonance verified, density validated, flow smooth.

---

### Layer 4: Validation & Packaging

**Purpose:** Package proof blocks for assembly, verify all placements, create output files.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 4.1 | `4.1-proof-assembly-packager.md` | Tag and package all proof blocks with assembly metadata (placement, transitions, callbacks, threading) | **ACTIVE** |
| 4.2 | `4.2-placement-verification.md` | Verify all proof placements match structure requirements, no orphaned blocks | **ACTIVE** |
| 4.3 | `4.3-output-assembly.md` | Create proof-weaving-package.json + PROOF-WEAVING-SUMMARY.md + execution-log.md | **ACTIVE** |

**Execution Order:** 4.1 → 4.2 → 4.3

**GATE_4:** All packages complete, placements verified, outputs assembled.

---

## QUALITY GATES

### Input Gates
- [ ] proof-inventory-output.json loaded with proof elements
- [ ] structure-package.json loaded with proof placements
- [ ] campaign-brief-package.json loaded with proof direction

### Process Gates
- [ ] All proof sections mapped to draft queue
- [ ] Proof elements selected for each section
- [ ] Density targets achievable with available proof

### Output Gates
- [ ] All proof blocks drafted
- [ ] Density targets met for each section
- [ ] Assembly instructions complete
- [ ] No orphaned proof elements (unless intentionally unused)

---

## RELATIONSHIP TO OTHER SKILLS

### Upstream Dependencies
| Skill | Package | What We Use |
|-------|---------|-------------|
| 02-proof-inventory | proof-inventory-output.json | Raw proof elements, rankings |
| 08-structure | structure-package.json | Proof placements, density targets |
| 09-campaign-brief | campaign-brief-package.json | Style direction, emotional register |

### Downstream Consumers
| Skill | Package | What They Use |
|-------|---------|---------------|
| 19-campaign-assembly | proof-weaving-package.json | Drafted proof blocks, insertion instructions |

---

## KEY DISTINCTIONS

**02-proof-inventory vs 18-proof-weaving:**
- `02-proof-inventory` = STRATEGIC — What proof exists, gaps, rankings
- `18-proof-weaving` = DRAFTING — Writing that proof into assembly-ready copy

**18-proof-weaving vs 19-campaign-assembly:**
- `18-proof-weaving` = DRAFTS proof blocks with placement instructions
- `19-campaign-assembly` = INSERTS those blocks into the final document

---

## VAULT INTELLIGENCE NEEDED

To draft proof blocks that match proven patterns, we need to extract: ✅ **ADDRESSED BY 0.2.6-curated-gold-specimens.md**

1. **Testimonial structures** from TIER1 swipes ✅
   - How are testimonials introduced? → Gold #1 (IVL Testimonial Parade)
   - What makes a testimonial cascade flow? → 8-beat flow pattern documented
   - How are names/locations formatted? → Name conventions documented

2. **Before/after formats** from TIER1 swipes ✅
   - Side-by-side vs. story progression → Gold #3 (Ken Transformation)
   - What details are included? → Maximum contrast structure documented
   - How is the transformation dramatized? → Silver #1 (Functional Proof Cascade)

3. **Study citation patterns** from TIER1 swipes ✅
   - Full citation vs. mention only → Gold #4 (Element Z Study)
   - How are findings framed? → 6-step citation structure documented
   - What makes a study citation persuasive? → Gold #5 (Sinatra 62% Blood Flow)

4. **Proof section transitions** from TIER1 swipes ✅
   - How do swipes transition INTO proof sections? → 4 patterns documented
   - How do they transition OUT? → 3 patterns documented
   - What bridges are used? → "Don't take my word for it" + "You could be next" patterns

5. **Proof sequencing strategies** ✅
   - Proof-First (Whitaker), Authority-to-Social (Sinatra), Scale Cascade, Testimonial Parade, Wave Pattern

6. **Proof density benchmarks** ✅
   - Section-by-section density targets from TIER1 controls

---

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER draft proof without inventory** — proof-inventory-output.json must be loaded and validated before any drafting.
2. **ALWAYS map before drafting** — Layer 1 mapping must complete before Layer 2 drafting begins.
3. **ALWAYS verify density targets** — Every section must meet its density target before passing gate.
4. **SEQUENTIAL dependency** — Each layer must pass its gate before the next layer begins.
5. **NEVER exceed proof ceiling** — Claims in proof copy cannot exceed what's documented in proof inventory.
6. **ALWAYS include placement instructions** — Every proof block must have explicit placement metadata for assembly.
7. **NEVER create orphaned blocks** — Every drafted block must have a designated insertion point.

### Quality Constraints
8. **Testimonial specificity required** — Every testimonial must include name, location, and specific outcome.
9. **Before/after contrast minimum** — B/A blocks must show measurable contrast (numbers, timeframes, or vivid states).
10. **Study citation credibility** — Studies must include source, year, and specific finding (not vague references).
11. **Demonstration proof quantification** — Demo proof must include quantified outcomes.
12. **Transition smoothness** — Every proof section transition must flow naturally (no "here are testimonials").

### Anti-Slop Constraints
13. **ZERO generic testimonial intros** — "But don't take my word for it" is the ONLY acceptable transition (not "here's what people are saying").
14. **ZERO vague outcomes** — "felt better" / "life changed" without specifics are banned.
15. **ZERO unnamed testimonials** — Every testimonial must have attribution.
16. **ZERO academic study language** — Studies are persuasive, not academic (no "suggests" / "may indicate").

### Integration Constraints
17. **Campaign-brief alignment** — Proof emotional register must match brief direction.
18. **Avatar resonance required** — Proof subjects must match target avatar demographics.
19. **Structure compliance** — Proof blocks must match placement instructions from structure-package.
20. **Mechanism threading** — Proof copy must use exact mechanism name from mechanism-package.

### Enforcement Constraints
21. **IF proof inventory missing → HALT** — Cannot proceed; request 02-proof-inventory execution.
22. **IF density target unreachable → WARN** — Flag to human with gap analysis before proceeding.
23. **IF testimonial lacks specifics → REJECT** — Rewrite with specific outcomes.
24. **IF study citation vague → REJECT** — Rewrite with source, year, finding.
25. **IF placement unclear → HALT** — Cannot package block without insertion point.
26. **IF emotional register mismatch → REMEDIATE** — Recalibrate through Layer 3 refinement.
27. **IF avatar mismatch detected → FLAG** — Human checkpoint for approval before proceeding.

---

## THREE-TIER UNCERTAINTY PROTOCOL

Proof drafting involves uncertainty in matching proof to section needs. This protocol ensures appropriate confidence signaling.

### Tier 1: HIGH CONFIDENCE (≥ 0.85)

**Conditions:**
- Proof inventory has 3+ elements for each planned placement
- All proof types needed are available (testimonials, studies, B/A, etc.)
- Avatar match score ≥ 0.8 for proof subjects
- Density targets achievable with inventory

**Behavior:**
- Proceed with automatic drafting
- Standard quality gates apply
- Confidence score displayed: "HIGH (0.XX)"

### Tier 2: MODERATE CONFIDENCE (0.65-0.84)

**Conditions:**
- Proof inventory has 1-2 elements for some placements
- Some proof types missing but substitutes available
- Avatar match score 0.6-0.79
- Density targets achievable with creative arrangement

**Behavior:**
- Draft with substitution strategy documented
- Flag substitutions for human awareness
- Confidence score displayed: "MODERATE (0.XX)"

### Tier 3: LOW CONFIDENCE (< 0.65)

**Conditions:**
- Proof inventory insufficient for multiple sections
- Key proof types missing entirely
- Avatar match score < 0.6
- Density targets likely unachievable

**Behavior:**
- HALT automatic progression
- Present diagnostic to human with specific gaps
- Request: proceed with best effort OR return to 02-proof-inventory for gap fill
- Confidence score displayed: "LOW (0.XX) — HUMAN INPUT REQUIRED"

---

## GUARDRAILS

### Locked Tool Grammar

All skill invocations MUST follow this exact 5-step sequence:

1. **STATE** the skill being called and its specific purpose
2. **VERIFY** all required inputs are available and valid
3. **EXECUTE** the skill with explicit parameters documented
4. **VALIDATE** the output against expected schema and quality thresholds
5. **LOG** the result (PASS/FAIL, key outputs, warnings) before proceeding

**ENFORCEMENT:**
- NEVER invoke a skill without completing step 2 (input verification)
- NEVER proceed to next skill without completing step 4 (output validation)
- NEVER skip step 5 (logging) — state must be tracked for session persistence
- IF any step fails, HALT and determine remediation before continuing

### Post-Tool Reflection

AFTER EVERY SKILL EXECUTION, verify these 5 points:

1. **Output exists** — Proof block is non-empty and properly formatted
2. **Schema valid** — Output matches expected contract from skill specification
3. **Quality gates pass** — No threshold violations in output
4. **State updated** — Session context reflects completed step
5. **Next step identified** — Next skill in sequence confirmed with inputs available

**ENFORCEMENT:**
- IF output missing → LOG failure, HALT pipeline, REPORT which skill failed
- IF schema invalid → LOG specific deviation, REMEDIATE or HALT
- IF quality gate fails → LOG which threshold violated, trigger remediation
- IF state not updated → UPDATE before any further execution

---

## ANTI-SLOP LEXICON

NEVER use these words/phrases in proof copy output:

**Generic testimonial intros:** here's what people are saying, let me share some testimonials, see what others say, customer reviews show, many have experienced

**Vague outcomes:** felt better, life changed, it works, amazing results, incredible transformation, everything improved, totally different now

**Weak study language:** suggests, may indicate, could potentially, appears to, tends to, some evidence shows

**Empty intensifiers:** literally, absolutely, totally, completely, incredibly, truly, really, very

**Generic credibility:** experts agree, studies show (without citation), doctors recommend (without name), research proves (without source)

**AI telltales:** journey, unlock, transform your life, discover the secret, breakthrough, game-changing, revolutionary

**REPLACEMENT REQUIREMENT:** Every rejected phrase must be replaced with specific, evidence-based language:
- "felt better" → "woke up without joint pain for the first time in 3 years"
- "studies show" → "A 2019 Journal of Clinical Nutrition study found that..."
- "incredible transformation" → "lost 47 pounds in 90 days while eating the same foods"

---

## REMEDIATION PROTOCOL

### Gate Failure Response Matrix

| Gate | Common Failures | Remediation |
|------|-----------------|-------------|
| Gate 0 | Proof inventory missing | HALT → Request 02-proof-inventory execution |
| Gate 0 | Structure-package missing placements | HALT → Request 08-structure with proof_placements |
| Gate 1 | Density targets unachievable | WARN human → Proceed with documented gaps OR request more proof |
| Gate 1 | Proof-to-section mismatch | REMAP → Reassign proof elements to better-fit sections |
| Gate 2 | Testimonial lacks specifics | REJECT → Redraft with specific outcome, timeframe, attribution |
| Gate 2 | Study citation incomplete | REJECT → Redraft with source, year, specific finding |
| Gate 2 | Transition jarring | REWRITE → Use approved transition patterns |
| Gate 3 | Emotional register mismatch | RECALIBRATE → Adjust tone to match campaign-brief |
| Gate 3 | Avatar resonance low | FLAG → Human checkpoint for approval |
| Gate 4 | Placement metadata missing | BLOCK → Add placement before packaging |

### Escalation Protocol
- Max 3 remediation iterations per gate
- After 3 failures at same gate: HUMAN CHECKPOINT with full failure log
- Human may: override threshold, provide direction, approve with exceptions, or request upstream re-execution

---

## SESSION PERSISTENCE

After each skill execution, update the session context:

```yaml
session_state:
  current_layer: [0-4]
  current_skill: [skill ID just completed]
  completed_skills: [list of completed skill IDs]
  output_status: [PASS/FAIL/PENDING]
  gate_status:
    gate_0: [PASS/FAIL/PENDING]
    gate_1: [PASS/FAIL/PENDING]
    gate_2: [PASS/FAIL/PENDING]
    gate_3: [PASS/FAIL/PENDING]
    gate_4: [PASS/FAIL/PENDING]
  confidence_tier: [HIGH/MODERATE/LOW]
  proof_blocks_drafted: [count]
  density_status:
    lead: [met/unmet]
    mechanism_narrative: [met/unmet]
    proof_section: [met/unmet]
    product_introduction: [met/unmet]
    offer_copy: [met/unmet]
    close: [met/unmet]
  blockers: [any blocking issues]
  next_action: [next skill to execute]
```

**On Session Resume:**
1. Read session state from persistence
2. Identify last completed skill
3. Verify outputs from last skill still valid
4. Resume from next uncompleted skill
5. NEVER re-execute completed skills unless explicitly instructed

**ENFORCEMENT:**
- MUST update session state after every skill completion
- MUST persist state before any human checkpoint or pause

---

## LEARNING LOG

### Log Location
`18-proof-weaving/outputs/proof-weaving-learning-log.json`

### What Gets Logged

```yaml
run_entry:
  run_id: string
  timestamp: string
  niche: string
  sub_niche: string
  proof_elements_available: integer
  proof_blocks_drafted: integer
  confidence_tier: string
  density_targets:
    lead: { target: int, achieved: int }
    mechanism_narrative: { target: int, achieved: int }
    proof_section: { target: int, achieved: int }
    product_introduction: { target: int, achieved: int }
    offer_copy: { target: int, achieved: int }
    close: { target: int, achieved: int }
  gate_results:
    gate_0: enum[pass, fail]
    gate_1: enum[pass, fail]
    gate_2: enum[pass, fail]
    gate_3: enum[pass, fail]
    gate_4: enum[pass, fail]
  remediation_count: integer
  slop_violations_caught: integer
  proof_types_used: [string]
  unused_proof_elements: [string]
  avatar_resonance_score: float
  feedback_requests: [object]
  failure_log: [object]

proof_effectiveness_entry:
  niche: string
  proof_type: string
  section_placed: string
  avatar_match_score: float
  effectiveness_rating: float
  notes: string
```

### Manager Responsibility
- Log every run automatically upon completion
- Track proof type effectiveness by section placement
- Track density achievement rates
- Track avatar resonance correlation with effectiveness
- Track slop violation frequency
- Surface recurring gaps for inventory improvement guidance

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.4 | 2026-02-12 | Model Assignment Table: Added Binding Model Assignment Table. Haiku for infrastructure (Pre/0), sonnet for architecture (1) and packaging (4), opus for drafting/Arena/validation (2-3). |
| 1.3 | 2026-02-03 | Added Layer 2.5 Arena integration with 6-persona generation panel, 7 judging criteria (Testimonial Cascade Quality 20%, Before/After Contrast Impact 15%, Study Citation Persuasiveness 15%, Transition Smoothness 15%, Density Target Achievement 15%, Avatar Resonance 10%, Emotional Register Calibration 10%), BLOCKING human selection checkpoint at Gate 2.5, state machine diagram. |
| 1.2 | 2026-02-02 | EXCELLENT BUILD: Added 27 numbered constraints, Three-Tier Uncertainty Protocol, Locked Tool Grammar, Post-Tool Reflection, Anti-Slop Lexicon, Session Persistence, Remediation Protocol, Learning Log. All 7 guardrails implemented. |
| 1.1 | 2026-02-02 | Complete 4-layer microskill architecture: Layer 0 (6 skills), Layer 1 (5 skills), Layer 2 (8 skills), Layer 3 (4 skills), Layer 4 (3 skills). Total: 26 microskills covering proof mapping, 7 proof type drafters, dramatization scanning, transitions, refinement, and assembly packaging. |
| 1.0 | 2026-02-02 | Initial scaffold with 0.2.6-curated-gold-specimens.md |

---

**Skill Status:** COMPLETE (EXCELLENT) — All 26 microskills active across 4 layers + Layer 2.5 Arena integration, all 7 guardrails implemented.
