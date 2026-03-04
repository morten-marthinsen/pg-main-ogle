# CopywritingEngine Competitive Analysis
## What CE Does Well That Neco Doesn't — And What to Import

**Date:** 2026-02-07
**Author:** Neco Session 007
**Scope:** Deep analysis of Anthony Flores' CopywritingEngine vs Neco — The NeuroCopy Agent
**Purpose:** Identify concrete, prioritized improvements for Neco based on CE's innovations

---

## Executive Summary

The CopywritingEngine (CE) is a 438+ file system for generating long-form direct response copy (VSLs, sales pages, magalogs). Neco is an 8-sub-agent system for short-form paid ads (hooks, scripts, angles, briefs). They share almost no scope overlap, but CE has **6 major innovations** that Neco should adapt for short-form.

The three highest-impact improvements — in order — are:

1. **Specimen Vault** — Load verbatim winning ad copy during generation (not just frameworks)
2. **Multi-Perspective Generation** — Generate from multiple lenses, adversarial critique, then select
3. **Structural Quality Gates** — Convert instructional rules into structural barriers that can't be bypassed

These three changes would close ~80% of the quality gap between CE-generated copy and Neco-generated copy.

---

## System Comparison

| Dimension | CopywritingEngine | Neco |
|-----------|-------------------|------|
| **Scope** | Long-form DR copy (VSLs, sales pages, magalogs) | Short-form paid ads (hooks, scripts, angles, briefs) |
| **Architecture** | 5-layer sequential pipeline (20 skills) | 3-layer hub-and-spoke (8 sub-agents) |
| **File Count** | 438+ files, 118KB CLAUDE.md | 5 core files, 132-line CLAUDE.md, 11 reference files |
| **Generation Model** | 7 competitors × 3 rounds × adversarial critique + phrase-level synthesis | Single-perspective generation per sub-agent |
| **Grounding** | 400+ RSF-extracted swipe specimens, type-indexed loading | 11 behavioral framework reference files |
| **Quality Enforcement** | Structural gates (files that must exist), MC-CHECK, context zones | Phase-Stop Discipline, Non-Negotiables (instructional) |
| **Quality Scoring** | RSF Composite (Schema Distance × Resonance Depth × Resolution × Temporal Fit) | A+ Concept Protocol (5-Point Checklist), Visceral Resonance Test |
| **Claim Safety** | 3-tier verification, proof_id tracing, verification gates | Non-Negotiable #4 (instructional rule, no structural enforcement) |
| **Failure Learning** | LearningLog/ directory, failure-driven anti-degradation files | "Common Mistakes" section (empty, intended for organic growth) |
| **Domain Intelligence** | Domain-agnostic (health, finance, self-help) | Golf-specific (Six-Axis, golf suggestibility principle) |

---

## Gap Analysis: What CE Does Well That Neco Doesn't

### GAP 1: Specimen Injection / Vault Intelligence (CRITICAL)

**What CE has:**
- 400+ swipe files extracted using VAULT_V3_SCHEMA (RSF framework, 75-sub-type proof taxonomy, 13-dimension mechanism scoring)
- Type-indexed loading matrices per skill — match content type to specimen type before generation
- Verbatim text held in active context during generation as "statistical attractors" (exact token sequences reshape probability distributions toward elite patterns)
- `0.2.6-curated-gold-specimens.md` files in 8+ skills with loading matrices
- CE Learning #41: "Statistical attraction requires VERBATIM text. Summarized or paraphrased specimens don't work."

**What Neco has:**
- `_reference/` directory with 11 behavioral framework files (six-axis, FATE, behavior compass, PCP, authority triangle, cognitive biases, style library, hook library, ad angle ideation, copy constraints, golf suggestibility)
- These are FRAMEWORKS (how to think about copy), not SPECIMENS (what great copy looks like)
- No swipe vault. No verbatim ad examples. No type-indexed loading. Generation happens from pure framework application.

**Why this matters:**
Frameworks tell the model what to AIM for. Specimens show it what HITTING THE TARGET looks like. Without specimens, Neco generates from theory — the output is structurally correct but lacks the pattern DNA of winning ads. CE's biggest quality leap came from specimen injection (Learning #41-45).

**The golf-specific gap:** PG has a massive corpus of winning ads across products (DQFE, SF2, EOS, etc.) plus competitor ads. This content exists but isn't structured for Neco to load during generation.

---

### GAP 2: Multi-Perspective Generation (CRITICAL)

**What CE has:**
- **Arena Layer (2.5):** 7 competitors (Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect) each generate independently across 3 mandatory rounds
- **Adversarial Critic:** Dedicated critic with no generation context identifies weakest element per output with actionable fix direction
- **Critique-Revise Cycle:** Every competitor revises their weakest element after critique, then gets scored
- **Learning Between Rounds:** Losers absorb winners' techniques (not voice) via Learning Briefs
- **Synthesizer Layer (2.6):** Post-Arena phrase-level hybrid creation — extracts best micro-elements from all 7 Round 3 outputs, reconstructs 2-3 coherent hybrids
- **Human Selection:** 9-10 candidates presented (7 pure + 2-3 hybrids)
- **Agent Teams mode:** Each persona as separate Claude instance with own 200K context (zero contamination)

**What Neco has:**
- Single-perspective generation per sub-agent
- Hook Generation (#4) produces variants, but all from the same "voice"
- Quality Validator (#8) evaluates AFTER generation, but doesn't provide adversarial pressure DURING generation
- No multi-perspective competition. No critique-revise cycles. No synthesis of best elements.

**Why this matters:**
The SF2 failure case proved it: single-perspective generation produced "The 96% Secret" (RSF 0.12). Multi-perspective generation with adversarial evaluation would have killed that Big Idea before it reached the client. Competition between perspectives is the quality pressure that produces great work.

---

### GAP 3: Structural Quality Gates (HIGH)

**What CE has:**
- Dedicated `*-ANTI-DEGRADATION.md` for all 20 skills with structural enforcement
- Gate files that must exist: `GATE_1_VERIFIED.yaml`, `LAYER_3_COMPLETE.yaml`, `DISCOVERY_LOG.md` — Layer N+1 physically requires Layer N output
- MC-CHECK Protocol (metacognitive checkpoints) with rushing detection, synthesis verification, completeness checks
- Context zones (GREEN/YELLOW/RED/CRITICAL) with specific escalating responses
- Forbidden Rationalizations lists (catch the model making excuses)
- Structural barriers principle: "Instructions can be ignored. Structures cannot be bypassed."

**What Neco has:**
- Phase-Stop Discipline (one phase, one stop)
- Non-Negotiables (14 rules — all instructional)
- Context Budget Rules
- Human Checkpoints (3: audience, angle, verification)
- No gate files. No MC-CHECK. No context zones. No forbidden rationalizations.

**Why this matters:**
Neco's quality enforcement relies on the model following instructions. CE proved — through documented failures — that instructions degrade under context pressure. The model rushes, finds loopholes, rationalizes shortcuts. Structural gates can't be bypassed because files either exist or they don't. Neco's Non-Negotiables say "never deliver unverified claims" — but there's no structural mechanism to enforce it.

---

### GAP 4: Claim Verification (HIGH)

**What CE has:**
- CLAIM-VERIFICATION-PROTOCOL.md with 3-tier claim system
- Tier 1 (mandatory): statistics, percentages, study citations, expert attributions, timeframes, patient counts — every one must have proof_id
- Tier 2 (strong): general medical facts, mechanism claims, outcome projections — flag if uncertain
- Tier 3 (acceptable): rhetorical questions, prospect experiences, promise framing
- CLAIM_VERIFICATION_GATE after every narrative skill (11-17)
- Forbidden fabrication patterns: "Harvard researchers," round numbers, specific timeframes, journal attributions, expert quotes — all without proof_id
- Born from Ultra Liver failure: LLM fabricated "Harvard researchers found..." claim that passed editorial

**What Neco has:**
- Non-Negotiable #4: "Never deliver unverified factual claims. Zero tolerance for hallucinations. Flag all credentials, statistics, and claims with verification markers."
- This is an instruction, not a structural gate
- No proof_id tracing system. No claim verification appendix. No fabrication pattern detection.

**Why this matters:**
Neco writes ad scripts that include factual claims — ingredient percentages, study results, mechanism claims, expert quotes. LLMs will fabricate plausible-sounding claims. PG cannot afford fabricated health claims in paid ads (legal liability, platform bans, brand damage). An ad claiming "Harvard study proves..." when no such study exists is worse than no ad at all.

---

### GAP 5: Quantitative Quality Scoring (MODERATE)

**What CE has:**
- RSF Composite = (Schema Distance × Resonance Depth × Resolution Accessibility × Temporal Fit) / 1000
- Minimum threshold: RSF Composite >= 3.0 to advance
- SF2 proved the framework: "The 96% Secret" scored 0.12, Anthony's direction scored 5.18 — 43x improvement
- 7 default judging criteria with weights for Arena evaluation
- Per-skill scoring criteria adapted for each domain

**What Neco has:**
- A+ Concept Protocol (5-Point Checklist: Emotional Territory, Transformation Test, Before/After, Quality Check, Anti-Patterns)
- Visceral Resonance Test ("does it create a feeling in the body?")
- Six-Axis Audit (checks Focus elevation, Suggestibility windows, axis sequence)
- Quality is evaluated through checklists and subjective feel — no composite scoring

**Why this matters:**
Quantitative scoring creates accountability. It's the difference between "this feels good" and "this scores 5.18 on our framework." It also enables comparison: "Hook A scores 6.2, Hook B scores 4.1 — here's why." Neco's A+ Protocol covers similar territory conceptually but lacks the mathematical teeth that would make quality measurable and improvable over time.

---

### GAP 6: Failure-Driven Learning System (MODERATE)

**What CE has:**
- `LearningLog/` directory with dated entries (60+ learnings documented)
- Every failure spawns a structural fix: Ultra Liver → Claim Verification Protocol, Research 121/1000 → Research Anti-Degradation, Proof Layer 3 skip → Proof Anti-Degradation, SF2 Big Idea failure → RSF integration + persona integration
- CLAUDE.md updated after every failure with new forbidden behaviors, structural gates, MC-CHECKs
- System evolves through documented failure analysis

**What Neco has:**
- "Common Mistakes to Avoid" section in CLAUDE.md (currently empty — "grows organically via self-correction")
- No explicit learning log directory
- No failure-driven structural fix pattern

**Why this matters:**
Neco hasn't been used operationally yet, so no failures to document. But the infrastructure should exist BEFORE the first failure, not after. When Neco generates a bad hook or a hallucinated claim, the system needs a place to capture the failure and a pattern for creating structural fixes.

---

## What Neco Does Well That CE Doesn't

CE is not universally superior. Neco has strengths CE lacks:

### 1. Behavioral Framework Integration
Neco has 6 specific Chase Hughes behavioral frameworks (Six-Axis, FATE, Behavior Compass, PCP, Authority Triangle, Cognitive Biases) for audience intelligence. CE uses general copywriting frameworks. Neco's audience analysis is more psychologically sophisticated.

### 2. Golf-Specific Domain Intelligence
The Golf Suggestibility Principle ("emotion IS in the education"), the Focus → Suggestibility → Compliance chain, and the teaching-as-persuasion insight. CE is domain-agnostic. Neco is domain-optimized.

### 3. Hub-and-Spoke Flexibility
Neco's routing handles multiple creative tasks (angle ideation, hook writing, script generation, influencer briefs, static image briefs) through task-type routing. CE's sequential pipeline is optimized for one output type (complete long-form campaign). Neco's architecture is better for the variety of short-form creative work PG needs.

### 4. Architectural Simplicity
5 core files, 1289-line sub-agents spec, 11 reference files vs. CE's 438+ files and 118KB CLAUDE.md. Neco is comprehensible. A new team member can read the entire system in under 2 hours. CE requires days.

### 5. Interactive Workflow
Neco's human checkpoints (audience confirmation, angle confirmation, verification review) create a collaborative workflow. CE's checkpoints exist but the system is more autonomous. Neco's design is better for a creative lead who wants to shape direction.

---

## Prioritized Neco Improvement Recommendations

### PRIORITY 1: Critical — Highest Impact

#### 1.1 Build a Specimen Vault (`_vault/`)

**What:** Create a structured collection of winning PG ad copy — hooks, scripts, angles, influencer scripts — that sub-agents load VERBATIM during generation.

**Structure:**
```
_vault/
  hooks/
    by-style/           # provocative/, educational/, testimonial/, etc.
    by-product/         # dqfe/, sf2/, eos/, etc.
    by-format/          # 15s/, 30s/, 60s/
  scripts/
    by-format/          # 15s/, 30s/, 60s/, vsl-snippet/
    by-angle-type/      # mechanism/, social-proof/, transformation/, etc.
  angles/
    by-product/
    by-framework/       # six-axis/, fate/, behavior-compass/
  influencer-scripts/
    by-product/
    by-talent-tier/     # micro/, mid/, macro/
```

**How specimens get in:**
1. Mine existing PG winning ads (from Tess data — what's working)
2. Mine competitor winning ads (from research)
3. Each specimen gets: source, product, format, style, performance data (if available), what makes it work (2-3 sentence annotation)

**How sub-agents use them:**
- Sub-Agent #4 (Hook Generation): Before generating hooks, load 3-5 type-matched hook specimens. Hold verbatim in context. Generate with specimens as statistical attractors.
- Sub-Agent #5 (Script Generation): Before writing scripts, load 2-3 format-matched script specimens.
- Sub-Agent #3 (Angle Ideation): Before ideating angles, load winning angles from the same product/category.

**Effort:** MEDIUM-HIGH (initial vault population requires curating existing ads)
**Impact:** HIGHEST — This single change has more quality impact than all other recommendations combined.

---

#### 1.2 Add Lightweight Multi-Perspective Generation

**What:** For hooks and scripts, generate from multiple editorial lenses, score adversarially, then let the human select from the best.

**NOT the full CE Arena** (7 competitors × 3 rounds is overkill for a 15-second hook). Instead:

**For Hook Generation (Sub-Agent #4):**
```
STEP 1: Generate 3 hook sets from different lenses:
  - Lens A: Provocative/Contrarian (pattern interrupt, bold claims)
  - Lens B: Educational/Curiosity (teaching moment, "I didn't know that")
  - Lens C: Emotional/Empathetic (wound recognition, "that's exactly how I feel")

STEP 2: Internal adversarial check:
  For each hook: "What would a skeptical golfer think reading this?"
  Flag hooks that are: vague, cliché, factually questionable, too similar to existing ads

STEP 3: Score all hooks on Neco criteria:
  - Scroll-Stop Power (Focus creation)
  - Curiosity/Education Setup (Suggestibility potential)
  - Specificity (concrete vs. vague)
  - Axis Alignment (matches format priority)

STEP 4: Present top 5-7 hooks with scores to human for selection
```

**For Script Generation (Sub-Agent #5):**
```
STEP 1: Generate 2 full script variants:
  - Variant A: Education-forward (lead with teaching, mechanism emphasis)
  - Variant B: Emotion-forward (lead with wound/desire, then teach)

STEP 2: Adversarial check per variant:
  "Where does the viewer lose interest?"
  "Where does the teaching feel generic?"
  "Where does the CTA feel forced?"

STEP 3: Synthesize best elements if warranted (optional)

STEP 4: Present variants with scoring to human
```

**Effort:** LOW-MEDIUM (protocol changes in Sub-Agents #4 and #5, no new infrastructure)
**Impact:** HIGH — Multi-perspective generation is the second biggest quality lever after specimens.

---

#### 1.3 Add Structural Quality Gates

**What:** Convert Neco's 3 human checkpoints from instructional rules into structural barriers.

**Implementation:**

Add to NECO-MASTER-AGENT.md Section 5 (Human Checkpoints):

```yaml
structural_gates:
  checkpoint_1_audience:
    trigger: After Sub-Agent #2 (Audience Intelligence) completes
    gate: "CHECKPOINT_1_AUDIENCE_CONFIRMED" must appear in session state
    enforcement: Sub-Agents #3-#7 CANNOT execute without this gate
    forbidden_bypass: "I'll come back to this" / "audience is implied" / "obvious segment"

  checkpoint_2_angle:
    trigger: After Sub-Agent #3 (Angle Ideation) completes
    gate: "CHECKPOINT_2_ANGLE_CONFIRMED" must appear in session state
    enforcement: Sub-Agents #4-#5 CANNOT execute without this gate
    forbidden_bypass: "angle is clear from context" / "standard approach"

  checkpoint_3_verification:
    trigger: After Sub-Agent #8 (Quality Validator) completes
    gate: "CHECKPOINT_3_VERIFIED" must appear in session state
    enforcement: Output CANNOT be delivered without this gate
    forbidden_bypass: "minor issues" / "good enough for review"
```

Add a lightweight MC-CHECK equivalent to CLAUDE.md:

```yaml
NECO-CHECK (execute at each checkpoint):
  confidence: [1-10]
  rushing_detection:
    skipping_audience_analysis: [Y/N]
    generating_without_specimens: [Y/N]
    using_generic_language: [Y/N]
    fabricating_claims: [Y/N]
  if_any_yes: "STOP — re-read protocol, slow down"
```

**Effort:** LOW (add sections to existing docs)
**Impact:** HIGH — Prevents the degradation patterns CE documented extensively.

---

### PRIORITY 2: High — Significant Quality Improvement

#### 2.1 Add Claim Verification for Scripts

**What:** Lightweight claim verification integrated into Sub-Agent #8 (Quality Validator).

**Implementation:**
Add a new skill to Sub-Agent #8: **Claim Verification Check**

```yaml
claim_verification_check:
  scope: Every script, influencer brief, or static image brief that includes factual claims

  tier_1_mandatory:
    - statistics (percentages, numbers, counts)
    - study citations ("research shows...", "study found...")
    - expert attributions ("Dr. X says...", "according to...")
    - specific timeframes ("in just 3 days", "within 2 weeks")
    - ingredient claims ("contains 500mg of...")
    verification: Must trace to Context Gatherer (#1) output or be flagged [NEEDS_VERIFICATION]

  tier_2_strong:
    - mechanism claims ("works by activating...")
    - outcome claims ("you'll notice...")
    verification: Should have supporting context or be softened

  tier_3_acceptable:
    - rhetorical questions, prospect language, promise framing
    verification: Not required

  output: Claim Verification Appendix attached to every deliverable
  gate: If any Tier 1 claim lacks source → HALT delivery
```

**Effort:** LOW (add skill definition to Sub-Agent #8 in NECO-SUB-AGENTS.md)
**Impact:** HIGH — Prevents PG from running ads with fabricated claims.

---

#### 2.2 Create Short-Form Quality Scoring Framework

**What:** Quantitative scoring adapted from CE's RSF for Neco's short-form formats.

**For Hooks (adapt RSF → "HSP" — Hook Scoring Protocol):**

| Dimension | What It Measures | Weight |
|-----------|-----------------|--------|
| Scroll-Stop Power | Does it create Focus? (contrarian, curiosity, specificity) | 30% |
| Suggestibility Setup | Does it set up a teaching moment? | 25% |
| Specificity | Concrete numbers, mechanisms, outcomes vs. vague | 20% |
| Freshness | How far from what golfers have already seen? | 15% |
| Axis Alignment | Matches the Focus → Suggestibility → Compliance sequence | 10% |

**HSP Composite = Weighted average. Threshold: HSP >= 7.0 to present to human.**

**For Scripts (adapt RSF → "SSP" — Script Scoring Protocol):**

| Dimension | What It Measures | Weight |
|-----------|-----------------|--------|
| Hook Power | First 3 seconds — does it stop the scroll? | 20% |
| Educational Depth | Does the body teach something genuinely new? | 25% |
| Axis Traversal | Complete Focus → Suggestibility → Compliance journey | 20% |
| Specificity | Concrete vs. vague throughout | 15% |
| CTA Natural Flow | Does the click feel like desire, not a pitch? | 10% |
| Voice Authenticity | Sounds human, not AI | 10% |

**SSP Composite = Weighted average. Threshold: SSP >= 7.0 to present to human.**

**Effort:** MEDIUM (define frameworks, add to Sub-Agent #8 Quality Validator)
**Impact:** MODERATE-HIGH — Makes quality measurable and comparable.

---

### PRIORITY 3: Moderate — Infrastructure for Future Quality

#### 3.1 Add Learning Log Infrastructure

**What:** Create `_learning/` directory for capturing operational learnings.

```
_learning/
  YYYY-MM-DD-[topic].md    # dated entries
  patterns.md              # recurring patterns (what works, what doesn't)
  failure-fixes.md         # structural fixes from documented failures
```

**Protocol:** After every Neco operational session, if a failure or significant learning occurs:
1. Write `_learning/YYYY-MM-DD-[topic].md` with root cause analysis
2. Add relevant entry to CLAUDE.md "Common Mistakes to Avoid"
3. If structural fix needed, add to relevant sub-agent in NECO-SUB-AGENTS.md

**Effort:** LOW (create directory + protocol)
**Impact:** MODERATE — Enables system evolution through use.

---

#### 3.2 Build Proof Inventory Integration

**What:** When Context Gatherer (#1) collects product/offer info, structure proof elements with IDs that downstream sub-agents reference.

**Implementation:** Add proof structuring to Context Gatherer output:

```yaml
proof_inventory:
  - proof_id: PROOF-001
    claim: "Adds 20+ yards of distance"
    source: "Golf Digest independent testing, 2025"
    type: third_party_test
    strength: strong
  - proof_id: PROOF-002
    claim: "3-piece forged titanium construction"
    source: "Product specifications"
    type: product_spec
    strength: factual
```

Script Generation (#5) and Hook Generation (#4) then reference proof_ids when including claims. Quality Validator (#8) verifies all Tier 1 claims trace to a proof_id.

**Effort:** MEDIUM (modify Context Gatherer output contract + downstream references)
**Impact:** MODERATE — Structural hallucination prevention.

---

#### 3.3 Tess Integration for Audience Data

**What:** Pull actual ad performance data from Tess (SSS) to inform Neco's audience intelligence and angle selection.

**Future workflow:**
1. Neco requests: "What's working for DQFE?"
2. Tess returns: Top-performing ads, hooks, angles, audience segments from SSS data
3. Neco's Audience Intelligence (#2) incorporates real performance data alongside behavioral frameworks
4. Neco's Angle Ideation (#3) avoids saturated angles and explores untapped territories

**Effort:** HIGH (requires Tess-Neco bridge, similar to Tess-Veda bridge)
**Impact:** MODERATE-HIGH — Grounds creative direction in actual performance data.

---

## What NOT to Import from CE

| CE Feature | Why Not for Neco |
|------------|-----------------|
| Full 7-competitor × 3-round Arena | Overkill for 15-second hooks. A hook doesn't need 21 generation rounds. Lightweight multi-perspective (1.2) is the right adaptation. |
| 438-file microskill architecture | Neco's 8 sub-agents with skill lists are appropriate for short-form scope. Decomposing hook writing into 5 layers of microskills adds complexity without proportional quality gain. |
| 93KB VAULT_V3_SCHEMA | Designed for long-form VSL/sales page extraction. Neco needs a simpler ad-focused specimen schema. |
| 118KB CLAUDE.md | Keep Neco lean. 132 lines is better than 2000+. Add enforcement where needed, but don't recreate CE's complexity. |
| 9-persona evaluation system | CE's persona system wasn't even working correctly (SF2 showed personas weren't wired into execution). Multi-perspective lenses (1.2) are simpler and more reliable. |
| Sequential pipeline | Neco's hub-and-spoke is better for multi-format output. Don't regress to a sequential pipeline. |

---

## Implementation Roadmap

| Priority | Recommendation | Effort | When |
|----------|---------------|--------|------|
| **P1** | 1.1 Specimen Vault | Medium-High | First — highest impact |
| **P1** | 1.2 Multi-Perspective Generation | Low-Medium | Second — protocol change only |
| **P1** | 1.3 Structural Quality Gates | Low | Third — quick doc updates |
| **P2** | 2.1 Claim Verification | Low | With P1 changes |
| **P2** | 2.2 Quality Scoring Framework | Medium | After first operational use |
| **P3** | 3.1 Learning Log | Low | Before first operational use |
| **P3** | 3.2 Proof Inventory | Medium | After first operational use |
| **P3** | 3.3 Tess Integration | High | Future — requires Tess-Neco bridge |

---

## Open Questions for Christopher

1. **Specimen Vault (1.1):** Do you want to start populating the vault from existing PG ads, or wait until Neco is used operationally first? Mining existing winners requires a curation session.

2. **Multi-Perspective Generation (1.2):** Are the 3 lenses (Provocative, Educational, Empathetic) the right framing for PG's creative direction? Or do you want different lenses?

3. **Quality Scoring (2.2):** Should the HSP/SSP scoring dimensions be calibrated against actual PG ad performance data from Tess? If so, we'd need the Tess-Neco bridge first.

4. **Implementation Scope:** Do you want to implement these changes NOW (modifying NECO-SUB-AGENTS.md, NECO-MASTER-AGENT.md, CLAUDE.md), or capture them as a future improvement roadmap and use Neco as-is first to get baseline experience?

---

**Document Status:** COMPLETE — Ready for Christopher's review
