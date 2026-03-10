# Campaign Assembly Skill — Master Agent

**Version:** 1.2
**Skill:** 19-campaign-assembly
**Position:** Phase 3.5 (Assembly & Verification)
**Type:** Master Orchestrator (State Machine)
**Dependencies:** 08-structure, 09-campaign-brief, 10-headlines, 11-lead, 12-story, 13-root-cause-narrative, 14-mechanism-narrative, 15-product-introduction, 16-offer-copy, 17-close, 18-proof-weaving
**Output:** `campaign-assembly-package.json` + `assembled-draft.md` + `CAMPAIGN-ASSEMBLY-SUMMARY.md`

---

## PURPOSE

Assemble all drafted sections into a cohesive, polished full draft. This skill takes every upstream draft (headline, lead, story, root-cause narrative, mechanism narrative, product introduction, offer copy, close) plus proof blocks from proof-weaving, and weaves them into a unified campaign document with smooth transitions, proper threading, accurate callbacks, and consistent voice.

**Key Distinction:** This is an ASSEMBLY skill, not a drafting skill. It does not write new copy — it COMBINES existing drafts into a coherent whole, writing only transition language and ensuring threading consistency.

**Success Criteria:**
- All upstream drafts assembled in correct sequence per structure blueprint
- All proof blocks inserted per proof-weaving assembly instructions
- Transitions between sections smooth (no jarring shifts)
- Threading verified (mechanism name, root cause anchor, key phrases appear throughout)
- Callbacks accurate (transformation reminders reference actual earlier content)
- Voice/tone consistent across sections
- Word count within target range (± 10%)
- No orphaned open loops (every planted loop resolved)
- Drift report shows <15% deviation from structure blueprint

---

## IDENTITY

**This skill IS:**
- The final assembly layer that combines all drafted components into a complete document
- The transition engineer that ensures smooth flow between sections
- The threading auditor that verifies key concepts are woven throughout
- The consistency guardian that ensures voice, tone, and terminology are unified
- The proof insertion executor that places proof blocks per weaving instructions
- The quality validator that checks for drift from structure blueprint

**This skill is NOT:**
- A copywriting tool (drafting is complete by this point)
- A creative direction tool (that is 09-campaign-brief)
- A structure determination tool (that is 08-structure)
- An editorial review tool (that is 20-editorial-review)
- A proof drafting tool (that is 18-proof-weaving)

**Upstream:** Receives all draft packages from skills 08.5-15.5
**Downstream:** Feeds assembled-draft.md to 20-editorial-review

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Loading 11 upstream packages | haiku | Input loading, no reasoning needed |
| 1 | Sequencing + proportion checking | sonnet | Structural verification against benchmarks |
| 2 | Assembly + transition writing | sonnet | Integration of existing content — transitions only, not new generation |
| 3 | Threading audit + callback validation | opus | Deep coherence judgment across full document |
| 4 | Full read-through + packaging | opus | Comprehensive quality validation |

---

## TEACHING FOUNDATIONS

### Primary: Clayton Makepeace on Copy Flow

1. **Copy flows like a river** — reader should be swept along without friction
2. **Transitions are bridges** — they carry the reader from one thought to the next
3. **Repetition builds belief** — key phrases must appear 5-10+ times throughout
4. **Callbacks create closure** — earlier promises must be fulfilled, earlier proof must be referenced
5. **Voice must be singular** — copy should sound like ONE person speaking, not committee writing

### Secondary: TIER1 Assembly Patterns

**From Stansberry America 2020:**
- 12-section architecture with specific proportions
- 8 transition techniques (question-to-validation, credibility-to-claim, data-to-rhetorical, etc.)
- Linear escalation pacing
- Key phrase repetition (5-10+ times each)

**From Sinatra OmegaQ Plus:**
- Authority → Framework → Clinical → Social → Risk Reversal sequence
- Story woven throughout (not isolated section)
- 12 markers framework referenced throughout as threading anchor
- Callbacks in close to lead content

### Tertiary: Todd Brown E5 on Campaign Coherence

1. **Campaign thesis should be provable** in a single pass through the copy
2. **Every section advances the thesis** — no tangents or disconnected content
3. **Proof density varies by section** — but the argument is continuous
4. **The close echoes the lead** — circular structure creates closure

---

## STATE MACHINE

```
                    ┌─────────────────────────────────────────────────────┐
                    │                                                     │
                    ▼                                                     │
IDLE ──► LOADING ──► SEQUENCING ──► ASSEMBLING ──► THREADING ──► VALIDATION ──► COMPLETE
            │              │              │              │              │
            ▼              ▼              ▼              ▼              ▼
         FAIL_L0        FAIL_L1        FAIL_L2        FAIL_L3        FAIL_L4
            │              │              │              │              │
            ▼              ▼              ▼              ▼              ▼
        [Remediate]   [Remediate]   [Remediate]   [Remediate]   [Remediate]
            │              │              │              │              │
            └──────────────┴──────────────┴──────────────┴──────────────┘
                                        ▲
                                        │
                                  Max 3 iterations
                                  per layer, then
                                  HUMAN CHECKPOINT
```

---

## INPUTS

### From 08-structure (structure-package.json)

```yaml
section_sequence:
  - section: "headline"
    purpose: "Attention capture"
    target_percentage: 1%
  - section: "lead"
    purpose: "Hook and promise"
    target_percentage: 8%
  - section: "story"
    purpose: "Credibility and identification"
    target_percentage: 12%
  # ... etc

target_word_count: 5500
threading_guide:
  mechanism_name: "The XYZ Protocol"
  root_cause_anchor: "metabolic dysfunction"
  key_phrases: ["biological age", "cellular energy", "mitochondrial function"]
```

### From 09-campaign-brief (campaign-brief-package.json)

```yaml
voice_direction:
  tone: "authoritative_empathetic"
  reading_level: "8th grade"
  emotional_register: "hope_dominant"

transition_style: "conversational"
pacing_rhythm: "linear_escalation"
```

### From Draft Skills (09-15)

Each skill provides a draft package:
- `headline-package.json` → selected headline + subheadline
- `lead-package.json` → lead draft
- `story-package.json` → story draft
- `root-cause-narrative-package.json` → root cause narrative draft
- `mechanism-narrative-package.json` → mechanism narrative draft
- `product-introduction-package.json` → product introduction draft
- `offer-copy-package.json` → offer copy draft
- `close-package.json` → close draft

### From 18-proof-weaving (proof-weaving-package.json)

```yaml
proof_blocks:
  lead:
    - block_id: "lead_credibility_001"
      drafted_copy: "..."
      placement: "paragraph_2"
  mechanism_narrative:
    - block_id: "mech_proof_001"
      drafted_copy: "..."
      placement: "after_mechanism_explanation"
  # ... etc

assembly_instructions:
  insertion_order: [...]
  transition_notes:
    into_proof_section: "But don't take my word for it..."
    out_of_proof_section: "And you could be next..."
```

---

## OUTPUTS

### campaign-assembly-package.json

```json
{
  "assembly_metadata": {
    "version": "1.0",
    "assembled_date": "2026-02-02",
    "total_word_count": 5423,
    "section_count": 10,
    "proof_blocks_inserted": 18
  },

  "section_manifest": {
    "headline": {
      "word_count": 45,
      "percentage": 0.8%,
      "source_package": "headline-package.json",
      "modifications": "none"
    },
    "lead": {
      "word_count": 450,
      "percentage": 8.3%,
      "source_package": "lead-package.json",
      "proof_blocks_inserted": ["lead_credibility_001"],
      "modifications": ["Added proof block at paragraph 2"]
    },
    // ... for each section
  },

  "threading_audit": {
    "mechanism_name_occurrences": 12,
    "root_cause_anchor_occurrences": 8,
    "key_phrase_occurrences": {
      "biological age": 6,
      "cellular energy": 9,
      "mitochondrial function": 7
    },
    "threading_status": "PASS"
  },

  "callback_audit": {
    "callbacks_planted": 4,
    "callbacks_resolved": 4,
    "unresolved_callbacks": [],
    "callback_status": "PASS"
  },

  "transition_audit": {
    "transitions_written": 9,
    "jarring_transitions": 0,
    "transition_status": "PASS"
  },

  "drift_report": {
    "structure_compliance": 94%,
    "word_count_variance": "+1.2%",
    "section_proportion_variances": {
      "lead": "+0.3%",
      "story": "-0.8%",
      // ...
    },
    "drift_status": "PASS (< 15% deviation)"
  },

  "consistency_audit": {
    "voice_consistency": "PASS",
    "terminology_consistency": "PASS",
    "emotional_register_consistency": "PASS",
    "issues_found": []
  },

  "open_loop_audit": {
    "loops_planted": 5,
    "loops_resolved": 5,
    "unresolved_loops": [],
    "loop_status": "PASS"
  },

  "quality_scores": {
    "threading_score": 9.2,
    "transition_score": 8.8,
    "consistency_score": 9.0,
    "structure_compliance_score": 9.4,
    "overall_assembly_score": 9.1
  },

  "handoff_to_editorial": {
    "assembled_draft_path": "assembled-draft.md",
    "known_issues": [],
    "recommended_focus_areas": [
      "Verify lead-to-story transition feels natural",
      "Check mechanism naming moment impact",
      "Review close callback to lead transformation"
    ]
  }
}
```

### assembled-draft.md

Complete assembled draft in markdown format:

```markdown
# [Headline]

[Subheadline]

---

## Lead

[Lead copy with proof blocks inserted]

---

## Story

[Story copy]

[Transition to root cause]

---

## Root Cause

[Root cause narrative]

[Transition to mechanism]

---

## Mechanism

[Mechanism narrative with proof blocks]

[Transition to product]

---

## Product Introduction

[Product introduction copy]

---

## Offer

[Offer copy]

---

## Close

[Close copy with CTAs]

---

[P.S. sections]
```

### CAMPAIGN-ASSEMBLY-SUMMARY.md

Human-readable summary of assembly process and outputs.

---

## 5-LAYER ARCHITECTURE (23 MICROSKILLS)

### Layer 0: Foundation & Loading (6 microskills)

**Purpose:** Load ALL upstream packages (11 total), TIER1 assembly patterns, and validate completeness. Present human checkpoint for assembly approach confirmation.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 0.1 | `0.1-upstream-loader.md` | Load all 11 upstream packages | ✓ ACTIVE |
| 0.2 | `0.2-vault-intelligence-loader.md` | Load TIER1 assembly patterns (transitions, threading, pacing) | ✓ ACTIVE |
| 0.2.6 | `0.2.6-curated-gold-specimens.md` | Load verbatim elite assembly specimens — 8 Gold specimens (Stansberry transitions, Stansberry threading, Sinatra authority flow, Sinatra framework threading, Lead-to-Close callbacks, Proof reminder callbacks, Section proportions, Linear escalation), 3 Silver specimens | ✓ ACTIVE |
| 0.3 | `0.3-teachings-loader.md` | Load assembly principles (Makepeace flow, Schwartz sophistication, Carlton engagement, E5, RMBC) | ✓ ACTIVE |
| 0.4 | `0.4-input-validator.md` | Validate all 11 packages present and complete | ✓ ACTIVE |
| 0.5 | `0.5-human-checkpoint-curator.md` | Present assembly approach to human — confirm section sequence, threading priorities | ✓ ACTIVE |

**Execution Order:** 0.1 → 0.2 + 0.2.6 (parallel) → 0.3 → 0.4 → 0.5

**GATE_0:** All 11 upstream packages loaded, TIER1 patterns indexed, human confirmation received. FAIL = any upstream package missing OR incomplete.

---

### Layer 1: Sequencing & Proportion (4 microskills)

**Purpose:** Validate section sequence against structure blueprint, calculate target proportions, map golden thread placement, and plan attention pacing.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 1.1 | `1.1-section-sequencer.md` | Validate/finalize section sequence (standard, proof-first, authority-first, data-heavy strategies) | ✓ ACTIVE |
| 1.2 | `1.2-proportion-calculator.md` | Calculate word count targets per section against format benchmarks (VSL, Magalog, Sales Letter) | ✓ ACTIVE |
| 1.3 | `1.3-golden-thread-mapper.md` | Map where threading elements MUST appear — mechanism (8+), root cause (5+), framework (4+), promise (6+) | ✓ ACTIVE |
| 1.4 | `1.4-pacing-planner.md` | Plan attention-maintenance pacing — HOOK/BUILD/PEAK/REST/BRIDGE patterns, danger zones, re-engagement hooks | ✓ ACTIVE |

**GATE_1:** Section sequence validated, proportion targets calculated, golden thread mapped, pacing planned. FAIL = sequence mismatch OR proportion conflicts.

---

### Layer 2: Assembly (5 microskills)

**Purpose:** Assemble all sections, write transition language, insert proof blocks, weave callbacks, and insert attention maintenance techniques.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 2.1 | `2.1-section-assembler.md` | Load drafted copy from each upstream package and assemble in sequence | ✓ ACTIVE |
| 2.2 | `2.2-transition-writer.md` | Write smooth transitions using 8 TIER1 techniques (Question-to-Validation, Credibility-to-Claim, Data-to-Rhetorical, Statistics-to-Visualization, Historical-to-Prediction, Expert-to-Reframe, Elite-to-Blueprint, Personal-to-Urgency) | ✓ ACTIVE |
| 2.3 | `2.3-proof-block-inserter.md` | Insert proof blocks from proof-weaving-package at designated placements | ✓ ACTIVE |
| 2.4 | `2.4-callback-weaver.md` | Weave 4 callback patterns — Lead-to-Close, Story-to-Product, Proof-to-Close, Root-Cause-to-Mechanism | ✓ ACTIVE |
| 2.5 | `2.5-attention-maintenance.md` | Insert attention-maintenance techniques at pacing plan intervals (re-engagement hooks, momentum builders, validators) | ✓ ACTIVE |

**GATE_2:** All sections assembled, all transitions written, all proof blocks inserted, callbacks woven, attention techniques placed. FAIL = missing sections OR jarring transitions OR missing callbacks.

---

### Layer 3: Refinement & Audit (4 microskills)

**Purpose:** Verify threading counts, audit terminology consistency, verify callbacks, and validate pacing execution.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 3.1 | `3.1-golden-thread-auditor.md` | Audit threading element counts against minimums — mechanism (8+), root cause (5+), framework (4+), promise (6+) | ✓ ACTIVE |
| 3.2 | `3.2-terminology-consistency-checker.md` | Ensure terminology remains consistent — capitalization, article usage, spacing, abbreviations, pronouns | ✓ ACTIVE |
| 3.3 | `3.3-callback-verification.md` | Verify all planned callbacks are properly established and echoed — no orphaned echoes or establishments | ✓ ACTIVE |
| 3.4 | `3.4-pacing-verification.md` | Verify pacing plan executed — intensity patterns match, re-engagement hooks placed, danger zones addressed, progressive density achieved | ✓ ACTIVE |

**GATE_3:** Threading verified (minimum counts met), terminology consistent, callbacks validated, pacing verified. FAIL = threading below threshold OR consistency violations OR missing callbacks.

---

### Layer 4: Validation (4 microskills)

**Purpose:** Final quality validation — full read-through, attention audit, anti-slop validation, and output assembly.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 4.1 | `4.1-full-read-through-checker.md` | Execute complete read-through — verify unified flow, identify issues, score section quality | ✓ ACTIVE |
| 4.2 | `4.2-attention-audit.md` | Final audit of attention maintenance — hook strength, momentum, fatigue mitigation, curiosity loops, value delivery | ✓ ACTIVE |
| 4.3 | `4.3-anti-slop-validation.md` | Detect and eliminate weak copy — filler phrases, generic claims, AI tells, clichés, specificity/confidence audit | ✓ ACTIVE |
| 4.4 | `4.4-output-assembly.md` | Assemble campaign-assembly-package.json + CAMPAIGN-ASSEMBLY-SUMMARY.md + execution-log.md | ✓ ACTIVE |

**GATE_4:** Read-through passed, attention score ≥70, slop score ≥70, all outputs assembled. FAIL = critical issues OR scores below threshold.

---

## QUALITY GATES SUMMARY

| Gate | Requirement | Failure Action |
|------|-------------|----------------|
| Gate 0 | All 11 upstream packages loaded, human confirms assembly approach | Cannot sequence |
| Gate 1 | Sequence validated, proportions calculated, proof insertion mapped, threading planned | Cannot assemble |
| Gate 2 | All sections assembled, transitions smooth, proof blocks inserted, callbacks woven | Return to assembly |
| Gate 3 | Threading verified, consistency passed, loops resolved, callbacks validated | Return to auditing |
| Gate 4 | Drift < 15%, quality scores >= 7.0, all outputs packaged | Return to validation |

---

## TRANSITION PATTERNS (FROM TIER1)

### 8 Core Transition Techniques

| Technique | Example | When to Use |
|-----------|---------|-------------|
| **Question-to-Validation** | "If you're concerned... you're not alone" | Lead → Story |
| **Credibility-to-Claim** | "With 35 years experience, I can tell you..." | Story → Root Cause |
| **Data-to-Rhetorical** | "How can it be normal when..." | Root Cause → Mechanism |
| **Statistics-to-Visualization** | Chart/visual makes numbers tangible | Mechanism support |
| **Historical-to-Prediction** | "The same pattern that destroyed X..." | Mechanism → Product |
| **Expert-to-Reframe** | "It's not banking — it's currency" | Root Cause pivot |
| **Elite-to-Blueprint** | "Here's what they're doing — here's your blueprint" | Product → Offer |
| **Personal-to-Urgency** | "I'm protecting MY family — will you?" | Offer → Close |

### Proof Section Transitions (From Proof-Weaving)

**Into Proof:**
- "But don't take my word for it..."
- "Skeptical? Good. Let me show you the evidence..."
- "[Name] isn't alone. Not by a long shot..."

**Out of Proof:**
- "And you could be next..."
- "The only question now is: will you take the step?"

---

## THREADING REQUIREMENTS

### Minimum Occurrence Counts

| Element | Minimum Occurrences | Placement Distribution |
|---------|---------------------|------------------------|
| **Mechanism Name** | 8+ | Lead (1), Story (1), Root Cause (1), Mechanism (3+), Product (1), Close (1) |
| **Root Cause Anchor** | 5+ | Root Cause (2+), Mechanism (1), Product (1), Close (1) |
| **Key Phrases** | 5+ each | Distributed throughout |
| **Promise** | 6+ | Lead (1), Mechanism (1), Product (1), Offer (2), Close (1) |

### Callback Requirements

| Callback Type | Requirement |
|---------------|-------------|
| **Lead-to-Close** | Close must reference lead promise or transformation |
| **Proof-to-Close** | Transformation reminder must reference actual earlier proof |
| **Story-to-Product** | Product introduction must callback to story credibility |
| **Root-Cause-to-Mechanism** | Mechanism must explicitly address root cause |

---

## CONSISTENCY AUDIT CRITERIA

### Voice Consistency

- Same person speaking throughout (first person singular for authority-driven, etc.)
- No sudden shifts in formality
- Consistent use of contractions
- Same emotional register

### Terminology Consistency

- Same term for mechanism (no switching between synonyms)
- Same term for root cause
- Same product name throughout
- Same enemy/villain references

### Emotional Register Consistency

- If hope-dominant, maintain throughout (no sudden fear spikes without bridge)
- If fear-dominant, maintain throughout (no sudden positivity without bridge)
- Transitions between registers must be gradual

---

## SECTION PROPORTION BENCHMARKS (TIER1)

| Section | VSL Benchmark | Magalog Benchmark | Sales Letter Benchmark |
|---------|---------------|-------------------|------------------------|
| Headline | 1% | 2% | 2% |
| Lead | 8-12% | 8-10% | 10-15% |
| Story | 10-15% | 8-12% | 12-18% |
| Root Cause | 10-15% | 12-15% | 10-15% |
| Mechanism | 15-20% | 15-20% | 15-18% |
| Product Intro | 8-12% | 10-12% | 8-12% |
| Offer | 15-20% | 15-18% | 12-15% |
| Close | 10-15% | 8-12% | 10-15% |

---

## ASSEMBLY-SPECIFIC FORBIDDEN BEHAVIORS

1. ❌ Writing new copy (this skill assembles, not drafts)
2. ❌ Changing section content beyond minor transition language
3. ❌ Skipping proof block insertion (all blocks from weaving must be inserted)
4. ❌ Ignoring threading plan (mechanism name, root cause must appear throughout)
5. ❌ Creating jarring transitions (section shifts must be smooth)
6. ❌ Leaving open loops unresolved (every planted loop must be closed)
7. ❌ Inconsistent terminology (same terms throughout)
8. ❌ Drift > 15% from structure blueprint without human approval
9. ❌ Proceeding with quality scores < 7.0
10. ❌ Missing callbacks (close MUST reference lead, transformation reminders MUST reference earlier proof)

---

## OUTPUT VERIFICATION

Before claiming 16-Campaign-Assembly complete:

```
[ ] campaign-assembly-package.json EXISTS with ALL schema sections
[ ] assembled-draft.md EXISTS with ALL sections in sequence
[ ] CAMPAIGN-ASSEMBLY-SUMMARY.md EXISTS with ALL sections
[ ] All 11 upstream packages loaded and used
[ ] All sections assembled in correct sequence per structure blueprint
[ ] All proof blocks inserted per proof-weaving instructions
[ ] All transitions written (no section-to-section gaps)
[ ] Threading verified (mechanism name 8+, root cause 5+, key phrases 5+ each)
[ ] Callbacks validated (close → lead, transformation reminder → proof)
[ ] Voice/terminology consistency passed
[ ] All open loops resolved
[ ] Drift report shows < 15% deviation
[ ] Quality scores >= 7.0 overall
[ ] Editorial handoff notes prepared
```

---

## RELATIONSHIP TO OTHER SKILLS

### Upstream Dependencies (11 skills)

| Skill | Package | What We Use |
|-------|---------|-------------|
| 08-structure | structure-package.json | Section sequence, target word count, threading guide |
| 09-campaign-brief | campaign-brief-package.json | Voice direction, transition style, pacing rhythm |
| 10-headlines | headline-package.json | Selected headline, subheadline |
| 11-lead | lead-package.json | Lead draft |
| 12-story | story-package.json | Story draft |
| 13-root-cause-narrative | root-cause-narrative-package.json | Root cause narrative draft |
| 14-mechanism-narrative | mechanism-narrative-package.json | Mechanism narrative draft |
| 15-product-introduction | product-introduction-package.json | Product introduction draft |
| 16-offer-copy | offer-copy-package.json | Offer copy draft |
| 17-close | close-package.json | Close draft |
| 18-proof-weaving | proof-weaving-package.json | Proof blocks, insertion instructions |

### Downstream Consumers

| Skill | Package | What They Use |
|-------|---------|---------------|
| 20-editorial-review | assembled-draft.md, campaign-assembly-package.json | Complete draft for editorial passes, known issues, focus areas |

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER assemble without all upstream packages** — All 11 packages must be loaded and validated before assembly.
2. **ALWAYS sequence before assembling** — Layer 1 sequencing must complete before Layer 2 assembly begins.
3. **ALWAYS insert all proof blocks** — Every block from proof-weaving-package must be placed per instructions.
4. **SEQUENTIAL dependency** — Each layer must pass its gate before the next layer begins.
5. **NEVER write new copy** — Assembly skill combines, it does not draft (transitions only exception).
6. **ALWAYS map golden thread** — Threading elements must be tracked throughout entire document.
7. **NEVER leave callbacks orphaned** — Every callback established must be echoed; every echo must have establishment.

### Quality Constraints
8. **Threading minimum counts mandatory** — Mechanism (8+), root cause (5+), framework (4+), promise (6+).
9. **Transition smoothness required** — No jarring section shifts; all transitions must flow naturally.
10. **Drift tolerance ≤ 15%** — Structure deviation beyond 15% requires human approval.
11. **Proportion variance ≤ 10%** — Section word counts must be within 10% of targets.
12. **Consistency audit pass required** — Voice, terminology, emotional register must be unified.

### Anti-Slop Constraints
13. **ZERO generic transitions** — "Moving on to..." / "Now let's talk about..." are banned.
14. **ZERO jarring tonal shifts** — Emotional register must transition gradually, not abruptly.
15. **ZERO callback failures** — Close MUST reference lead; transformation reminders MUST reference earlier proof.
16. **ZERO terminology inconsistency** — Same term for mechanism/root cause throughout.

### Integration Constraints
17. **Structure blueprint compliance** — Section sequence must match structure-package exactly.
18. **Campaign-brief voice alignment** — Assembled voice must match brief direction.
19. **Proof-weaving placement compliance** — All proof blocks placed per weaving instructions.
20. **Editorial handoff completeness** — All known issues and focus areas documented for 20-editorial.

### Enforcement Constraints
21. **IF any upstream package missing → HALT** — Cannot proceed; identify missing package.
22. **IF threading count below minimum → REMEDIATE** — Add threading elements before proceeding.
23. **IF callback orphaned → FIX** — Establish or echo as needed before packaging.
24. **IF drift > 15% → CHECKPOINT** — Human approval required to proceed.
25. **IF transition jarring → REWRITE** — Smooth using approved transition techniques.
26. **IF consistency violation found → REMEDIATE** — Fix terminology/voice before proceeding.
27. **IF quality score < 7.0 → HALT** — Cannot package until threshold met.

---

## THREE-TIER UNCERTAINTY PROTOCOL

Assembly involves uncertainty in combining diverse upstream drafts. This protocol ensures appropriate confidence signaling.

### Tier 1: HIGH CONFIDENCE (≥ 0.85)

**Conditions:**
- All 11 upstream packages complete and high-quality (scores ≥ 7.5)
- Voice/tone consistent across all upstream drafts
- Proof-weaving placements clear and achievable
- Threading elements naturally present in drafts

**Behavior:**
- Proceed with automatic assembly
- Standard quality gates apply
- Confidence score displayed: "HIGH (0.XX)"

### Tier 2: MODERATE CONFIDENCE (0.65-0.84)

**Conditions:**
- All packages present but some below quality threshold
- Minor voice/tone variations between sections
- Some proof placements require adjustment
- Threading elements may need enhancement

**Behavior:**
- Flag quality variations for attention during refinement
- Document voice normalization needs
- Confidence score displayed: "MODERATE (0.XX)"

### Tier 3: LOW CONFIDENCE (< 0.65)

**Conditions:**
- Upstream packages have significant quality issues
- Major voice/tone inconsistencies between sections
- Proof placements conflict with section structures
- Threading elements sparse or missing

**Behavior:**
- HALT automatic progression
- Present diagnostic to human with specific issues
- Request: proceed with documented issues OR request upstream re-execution
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

1. **Output exists** — Assembled section is non-empty and properly formatted
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

NEVER use these words/phrases in transition writing:

**Generic transitions:** moving on, now let's talk about, next we'll discuss, speaking of which, another thing, also important

**Jarring connectors:** but anyway, in any case, be that as it may, having said that, at any rate

**Weak bridges:** so, anyway, well, now then, alright

**Filler phrases:** as mentioned before, as we discussed, as I said, in other words, basically, essentially

**REPLACEMENT REQUIREMENT:** Use the 8 TIER1 transition techniques:
- Question-to-Validation → "If you're concerned... you're not alone"
- Credibility-to-Claim → "With 35 years experience, I can tell you..."
- Data-to-Rhetorical → "How can it be normal when..."
- Statistics-to-Visualization → Chart/visual makes numbers tangible
- Historical-to-Prediction → "The same pattern that destroyed X..."
- Expert-to-Reframe → "It's not banking — it's currency"
- Elite-to-Blueprint → "Here's what they're doing — here's your blueprint"
- Personal-to-Urgency → "I'm protecting MY family — will you?"

---

## REMEDIATION PROTOCOL

### Gate Failure Response Matrix

| Gate | Common Failures | Remediation |
|------|-----------------|-------------|
| Gate 0 | Upstream package missing | HALT → Identify missing package, request execution |
| Gate 0 | Package quality below threshold | WARN → Proceed with documented quality flag |
| Gate 1 | Sequence mismatch | REALIGN → Adjust to match structure-package |
| Gate 1 | Proportion conflicts | RECALCULATE → Adjust targets with documented variance |
| Gate 2 | Section assembly gap | BRIDGE → Write transition using approved techniques |
| Gate 2 | Proof block placement conflict | ADJUST → Find alternative placement, document change |
| Gate 3 | Threading below minimum | ENHANCE → Add mechanism/root cause references |
| Gate 3 | Callback orphaned | RESOLVE → Add establishment or echo as needed |
| Gate 4 | Drift > 15% | CHECKPOINT → Human approval required |
| Gate 4 | Quality score < 7.0 | RETURN → Re-run failing audit, fix issues |

### Escalation Protocol
- Max 3 remediation iterations per gate
- After 3 failures at same gate: HUMAN CHECKPOINT with full failure log
- Human may: override threshold, provide direction, approve with drift, or request upstream re-execution

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
  sections_assembled: [count of 10]
  proof_blocks_inserted: [count]
  threading_counts:
    mechanism_name: [count]
    root_cause_anchor: [count]
    key_phrases: { phrase: count }
    promise: [count]
  callbacks_status:
    established: [count]
    echoed: [count]
    orphaned: [count]
  drift_percentage: [float]
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
`19-campaign-assembly/outputs/campaign-assembly-learning-log.json`

### What Gets Logged

```yaml
run_entry:
  run_id: string
  timestamp: string
  niche: string
  sub_niche: string
  format_type: enum[VSL, Magalog, Sales_Letter]
  upstream_packages_loaded: integer
  confidence_tier: string
  sections_assembled: integer
  proof_blocks_inserted: integer
  transitions_written: integer
  threading_counts:
    mechanism_name: integer
    root_cause_anchor: integer
    key_phrases: [{ phrase: string, count: integer }]
    promise: integer
  callback_audit:
    established: integer
    echoed: integer
    orphaned: integer
  drift_report:
    structure_compliance: float
    word_count_variance: string
    section_variances: object
  quality_scores:
    threading_score: float
    transition_score: float
    consistency_score: float
    structure_compliance_score: float
    overall_assembly_score: float
  gate_results:
    gate_0: enum[pass, fail]
    gate_1: enum[pass, fail]
    gate_2: enum[pass, fail]
    gate_3: enum[pass, fail]
    gate_4: enum[pass, fail]
  remediation_count: integer
  slop_violations_caught: integer
  feedback_requests: [object]
  failure_log: [object]

assembly_pattern_entry:
  format_type: string
  transition_technique_used: string
  effectiveness_score: float
  section_pair: string
  notes: string
```

### Manager Responsibility
- Log every run automatically upon completion
- Track transition technique effectiveness by section pair
- Track threading achievement rates by format type
- Track drift patterns and common variance sources
- Track callback success/failure patterns
- Surface recurring assembly issues for process improvement

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.2 | 2026-02-12 | Model Assignment Table: Added Binding Model Assignment Table. Haiku for infrastructure (Pre/0), sonnet for classification/assembly (1-2), opus for validation/read-through (3-4). Note: No Arena for this skill. |
| 1.2 | 2026-02-02 | EXCELLENT BUILD: Added 27 numbered constraints, Three-Tier Uncertainty Protocol, Locked Tool Grammar, Post-Tool Reflection, Anti-Slop Lexicon, Session Persistence, Remediation Protocol, Learning Log. All 7 guardrails implemented. |
| 1.1 | 2026-02-02 | COMPLETE: All 23 microskills created across 5 layers. Layer 0 (6 microskills), Layer 1 (4 microskills), Layer 2 (5 microskills), Layer 3 (4 microskills), Layer 4 (4 microskills). Key additions: golden thread mapper, pacing planner, attention maintenance, anti-slop validation, full read-through checker |
| 1.0 | 2026-02-02 | Initial creation: 5-layer architecture, 11 upstream dependencies, threading/callback requirements, transition patterns from TIER1, consistency audit criteria, section proportion benchmarks |

---

**Skill Status:** COMPLETE (EXCELLENT) — 23 microskills operational across 5 layers, all 7 guardrails implemented.
