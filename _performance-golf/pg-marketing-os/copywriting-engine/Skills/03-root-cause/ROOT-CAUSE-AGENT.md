# Root Cause Skill — Master Agent

**Version:** 3.1 (RSF-Enhanced + Mandatory Output Protocol)
**Skill:** 03-root-cause
**Position:** Phase 1, Step 3 (Research & Strategy)
**Type:** Derivation + Expression + Validation (Leaf Skill)
**Dependencies:** 01-research outputs, 02-proof-inventory outputs
**RSF Dependencies (Optional):** expectation_schema.json, latent_resonance_field.json
**Output:** root-cause-package.yaml

---

## RSF ENHANCEMENT (v3.0)

This version adds **RSF-aware expression selection** — the ability to consider schema distance when framing root cause revelations. While root cause DERIVATION remains pure truth-finding, root cause EXPRESSION can leverage RSF intelligence to maximize audience impact.

**Core Principle:** Root cause TRUTH is not affected by RSF. Root cause FRAMING can be.

**New capabilities:**
- Schema distance evaluation for root cause framing
- Integration with expectation_schema.json for whitespace-aware expression
- Integration with latent_resonance_field.json for resonance-connected framing
- RSF metadata in output for Big Ideas downstream consumption

---

## Purpose

Develop the "root cause" — the strategic insight that shifts the prospect's understanding from their SURFACE PROBLEM to the REAL ROOT CAUSE. This skill separates **DERIVATION** (how to find the root cause from research) from **EXPRESSION** (how to communicate it for the specific niche).

**Success Criteria:**
- Root cause derived from research patterns (not fabricated)
- Expression method matched to niche
- All three parts complete (what_they_think, what_real, why_nothing_worked)
- Validation scores meet minimum thresholds
- Handoffs complete for 04-mechanism, 05-promise, 06-big-idea

The Root Cause skill:
- **Derives** the root cause from research patterns (not fabricates it)
- **Expresses** the root cause appropriately for the niche
- **Validates** truth, alignment, proof, and resonance
- **Packages** copy blocks and downstream handoffs

---

## Identity Boundaries

**This skill IS:**
- Root cause derivation from research data
- Niche-appropriate expression selection
- Validation of truth, alignment, proof, resonance
- Copy block generation for root cause section
- Downstream handoff packaging

**This skill is NOT:**
- Deep research or market analysis (that's 01-research)
- Proof inventory or ceiling calculation (that's 02-proof-inventory)
- Mechanism development (that's 04-mechanism)
- Promise calibration (that's 05-promise)
- Copy WRITING for the full promotion (that's 13-root-cause-narrative)

**Upstream dependencies:** Deep Research (00) and Proof Inventory (01) must complete before this skill runs.

**Downstream consumers:** Mechanism (03), Promise (04), Big Ideas (05), and Root-Cause-Narrative (10) all depend on this skill's output.

---

## Why This Architecture

**Key Insight from Vault Analysis:**

The previous "6 methods" conflated derivation and expression. Analysis of high-scoring swipes (pg_ssts_vsl_001, pg_fixd_vsl_001, pg_sf1_vsl_001, pg_one_vsl_001) revealed:

1. **DERIVATION is consistent** — All niches follow: Research → Surface Problem → Hidden Root Cause → Why Nothing Worked
2. **EXPRESSION varies by niche** — Golf uses simple reframes; Health uses syndromes/villains

**Examples:**
- Golf (SSTS): Root cause = "low point misconception" → Expressed as simple reframe ("biggest misconception in golf")
- Health (Resurge): Root cause = "incomplete metabolic reset" → Expressed as named syndrome ("Shallow Sleep Syndrome")

Both found the root cause the same way (from research patterns). They expressed it differently.

---

## Two-Phase Architecture

```
PHASE 1: DERIVATION (Layer 1)
┌─────────────────────────────────────────────────────────────────┐
│ How to FIND the root cause from research data                   │
│                                                                 │
│ 1.1 Research Pattern Analysis    ← Mine research for patterns   │
│ 1.2 Symptom Convergence          ← Multiple symptoms → one cause│
│ 1.3 False Belief Identification  ← What they wrongly believe    │
│ 1.4 Hidden Layer Discovery       ← Known problem, deeper root   │
│ 1.5 Mechanism Constraint Check   ← Can mechanism solve it?      │
│ 1.6 Proof Constraint Check       ← Can we prove it?             │
│ 1.7 Derivation Synthesis         ← Select best root cause       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
PHASE 2: EXPRESSION (Layer 2)
┌─────────────────────────────────────────────────────────────────┐
│ How to COMMUNICATE the root cause for the niche                 │
│                                                                 │
│ 2.1 Simple Reframe               ← Direct insight (golf style)  │
│ 2.2 Named Syndrome               ← Medical condition (health)   │
│ 2.3 Villain Personification      ← Blame an external enemy      │
│ 2.4 Metaphor Construction        ← Analogy to explain           │
│ 2.5 Dual Problem Framing         ← Two compounding problems     │
│ 2.6 Niche Expression Matching    ← Match method to niche        │
│ 2.7 Expression Synthesis         ← Finalize expression          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Niche Expression Patterns (From Vault Analysis)

| Niche | Primary Expression | Avoid | Examples |
|-------|-------------------|-------|----------|
| **Golf/Sports** | Simple Reframe | Named syndrome | "Forgotten fundamental", "Biggest misconception" |
| **Health/Supplements** | Named Syndrome + Villain | Simple reframe | "Shallow Sleep Syndrome", "Leaky Gut" |
| **Weight Loss** | Villain + Syndrome | Simple reframe | "Three queen hormones", "Fat storage mode" |
| **Finance** | Villain + Expose | Named syndrome | "Wall Street insiders", "The Fed" |
| **Business** | Simple Reframe | Villain, Syndrome | "You're focused on the wrong metric" |

---

## Microskill Layer Map

### Layer 1: DERIVATION (Finding the Root Cause)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 1.1 | Research Pattern Analysis | [1.1-research-pattern-analysis.md](skills/layer-1/1.1-research-pattern-analysis.md) |
| 1.2 | Symptom Convergence | [1.2-symptom-convergence.md](skills/layer-1/1.2-symptom-convergence.md) |
| 1.3 | False Belief Identification | [1.3-false-belief-identification.md](skills/layer-1/1.3-false-belief-identification.md) |
| 1.4 | Hidden Layer Discovery | [1.4-hidden-layer-discovery.md](skills/layer-1/1.4-hidden-layer-discovery.md) |
| 1.5 | Mechanism Constraint Check | [1.5-mechanism-constraint-check.md](skills/layer-1/1.5-mechanism-constraint-check.md) |
| 1.6 | Proof Constraint Check | [1.6-proof-constraint-check.md](skills/layer-1/1.6-proof-constraint-check.md) |
| 1.7 | Derivation Synthesis | [1.7-derivation-synthesis.md](skills/layer-1/1.7-derivation-synthesis.md) |

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

### Layer 2: EXPRESSION (Communicating the Root Cause)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 2.1 | Simple Reframe | [2.1-simple-reframe.md](skills/layer-2/2.1-simple-reframe.md) |
| 2.2 | Named Syndrome | [2.2-named-syndrome.md](skills/layer-2/2.2-named-syndrome.md) |
| 2.3 | Villain Personification | [2.3-villain-personification.md](skills/layer-2/2.3-villain-personification.md) |
| 2.4 | Metaphor Construction | [2.4-metaphor-construction.md](skills/layer-2/2.4-metaphor-construction.md) |
| 2.5 | Dual Problem Framing | [2.5-dual-problem-framing.md](skills/layer-2/2.5-dual-problem-framing.md) |
| 2.6 | Niche Expression Matching | [2.6-niche-expression-matching.md](skills/layer-2/2.6-niche-expression-matching.md) |
| 2.7 | Expression Synthesis | [2.7-expression-synthesis.md](skills/layer-2/2.7-expression-synthesis.md) |

### Layer 3: VALIDATION

| Microskill | Purpose | Document |
|------------|---------|----------|
| 3.1 | Truth Validation | [3.1-truth-validation.md](skills/layer-3/3.1-truth-validation.md) |
| 3.2 | Mechanism Alignment Score | [3.2-mechanism-alignment-score.md](skills/layer-3/3.2-mechanism-alignment-score.md) |
| 3.3 | Proof Availability Score | [3.3-proof-availability-score.md](skills/layer-3/3.3-proof-availability-score.md) |
| 3.4 | Audience Resonance Check | [3.4-audience-resonance-check.md](skills/layer-3/3.4-audience-resonance-check.md) |
| 3.5 | Validation Synthesis | [3.5-validation-synthesis.md](skills/layer-3/3.5-validation-synthesis.md) |

### Layer 4: OUTPUT PACKAGING

| Microskill | Purpose | Document |
|------------|---------|----------|
| 4.1 | Copy Block Formatting | [4.1-copy-block-formatting.md](skills/layer-4/4.1-copy-block-formatting.md) |
| 4.2 | Downstream Handoff | [4.2-downstream-handoff.md](skills/layer-4/4.2-downstream-handoff.md) |
| 4.3 | Integration Guidance | [4.3-integration-guidance.md](skills/layer-4/4.3-integration-guidance.md) |
| 4.4 | Output Synthesis | [4.4-output-synthesis.md](skills/layer-4/4.4-output-synthesis.md) |

---

## Execution Flow

```
                    INPUT: Deep Research + Proof Inventory
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                          LAYER 1: DERIVATION                              │
│                                                                           │
│   Research Patterns → Symptom Convergence → False Belief → Hidden Layer   │
│                                    │                                      │
│                          Mechanism Check → Proof Check                    │
│                                    │                                      │
│                          Derivation Synthesis                             │
│                                    │                                      │
│                    OUTPUT: Validated Root Cause Candidate                 │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                          LAYER 2: EXPRESSION                              │
│                                                                           │
│   Simple Reframe ─┐                                                       │
│   Named Syndrome ─┼─→ Niche Matching → Expression Synthesis               │
│   Villain ────────┤                                                       │
│   Metaphor ───────┤                                                       │
│   Dual Problem ───┘                                                       │
│                                    │                                      │
│                    OUTPUT: Expressed Root Cause                           │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                          LAYER 3: VALIDATION                              │
│                                                                           │
│         Truth → Alignment → Proof → Resonance → Synthesis                 │
│                                    │                                      │
│          DECISION: Approved / Conditional / Revision / Blocked            │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                          LAYER 4: OUTPUT                                  │
│                                                                           │
│      Copy Blocks → Downstream Handoffs → Integration Guidance             │
│                                    │                                      │
│                    OUTPUT: Root Cause Skill Deliverable                   │
└───────────────────────────────────┴───────────────────────────────────────┘
                                    │
                                    ▼
                    HANDOFF: Mechanism Skill, Promise Skill, Big Idea Skill
```

---

## Three-Part Root Cause Structure

Every root cause output includes:

```
1. WHAT THEY THINK THE PROBLEM IS
   "[Their current understanding / false attribution]"

2. WHAT THE REAL PROBLEM IS
   "[The derived and expressed root cause]"

3. WHY NOTHING HAS WORKED
   "[How root cause explains all past failures]"
```

**Vault Examples:**

| Swipe | Think | Real | Why Failed |
|-------|-------|------|------------|
| pg_ssts_vsl_001 | "Need to hit ball first" | "Low point misconception" | "Trying to hit wrong point in swing arc" |
| pg_fixd_vsl_001 | "Multiple swing flaws" | "Off-track first move" | "Fixing symptoms, not root cause" |
| pg_sf1_vsl_001 | "Need more practice" | "Technique fails under pressure" | "Practice doesn't transfer to course" |
| pg_one_vsl_001 | "Bad at wedges" | "Two problems: mental + design" | "Only addressing half the issue" |

---

## Reframe Techniques (From Vault Schema)

The `reframe_technique` enum captures how the root cause shifts understanding:

| Technique | Description | Best For |
|-----------|-------------|----------|
| `blame_removal` | Removes self-blame, external cause | Health, weight loss |
| `enemy_reveal` | Exposes hidden villain | Health, finance |
| `false_solution_expose` | Shows why common solutions fail | All niches |
| `scientific_discovery` | Reveals new scientific insight | Health, golf |
| `conspiracy_reveal` | Uncovers hidden agenda | Finance, alternative health |
| `contrarian_truth` | Challenges conventional wisdom | All niches |
| `false_belief_destruction` | Corrects fundamental misconception | Golf, skills |

---

## Output Schema

```yaml
root_cause_skill_output:
  version: "3.0"

  core:
    statement: "[1-2 sentence root cause]"
    three_part:
      what_they_think: "[False understanding]"
      what_real: "[Expressed root cause]"
      why_nothing_worked: "[Failure explanation]"

  copy_blocks:
    full_revelation: "[200-300 word block]"
    compressed: "[75-100 word block]"
    headlines: {option_1, option_2, subheadline}
    bullets: [5 bullets]
    vsl_script: "[Formatted script]"
    email_teaser: "[Email content]"

  validation:
    scores:
      truth: [X/10]
      alignment: [X/10]
      proof: [X/10]
      resonance: [X/10]
      composite: [X/10]
    decision: approved | conditional | revision | blocked

  downstream_handoffs:
    mechanism: {root_cause_to_solve, must_address, match_type}
    promise: {what_becomes_possible, transformation_arc}
    big_idea: {disruption_potential, reframe_technique}

  # RSF v3.0: RSF Integration Metadata
  rsf_metadata:
    rsf_inputs_available: boolean
    expression_schema_distance:
      score: number (1-10)
      schemas_violated: [string]  # Which expectations this framing violates
      conventional_alternative: string  # What a conventional framing would be
    resonance_connection:
      connected_latent_emotion: string
      connection_strength: number (1-10)
      fssit_alignment: string  # If framing aligns with a FSSIT candidate
    rsf_framing_notes: string  # How RSF influenced expression choice

  metadata:
    niche: "[Niche]"
    expression_method: "[Method used]"
    reframe_technique: "[From enum]"
    derivation_source: convergence | false_belief | hidden_layer | combination
```

---

## Constraints

### Input Constraints
- NEVER proceed without deep_research outputs loaded
- NEVER proceed without proof_inventory outputs loaded
- NEVER accept niche parameter outside defined taxonomy (golf, health, weight_loss, finance, business)
- NEVER start derivation without surface_problem identified from research

### Derivation Constraints (Layer 1)
- NEVER fabricate root causes — Must derive from research patterns, not invent for mechanism convenience
- NEVER select root cause that mechanism cannot solve
- NEVER select root cause without proof pathway from 02-proof-inventory
- NEVER proceed to Layer 2 without ≥1 validated root cause candidate
- NEVER accept root cause that adds self-blame — Must create relief, not burden
- NEVER accept root cause contradicted by research data

### Expression Constraints (Layer 2)
- NEVER force expression method — Match expression to niche (see Niche Expression Patterns table)
- NEVER use Named Syndrome expression for Golf/Sports niche
- NEVER use Simple Reframe expression for Health/Supplements niche without justification
- NEVER use Villain expression for Business niche
- NEVER proceed to Layer 3 without expression method selected
- NEVER produce expression without all three parts (what_they_think, what_real, why_nothing_worked)

### RSF Expression Constraints (Layer 2 — v3.0)
- WHEN RSF inputs available: MUST evaluate expression against expectation_schema
- WHEN RSF inputs available: MUST check for latent_emotion connection
- WHEN expression falls in saturated_claims: MUST document justification OR select alternative
- WHEN expression aligns with FSSIT candidate: STRONGLY PREFER that expression
- NEVER select expression with schema_distance > 8 without human review flag
- NEVER sacrifice niche-appropriate expression for RSF optimization (niche rules take precedence)
- ALWAYS populate rsf_metadata in output when RSF inputs were available
- ALWAYS set rsf_inputs_available: false when RSF data not present

### Validation Constraints (Layer 3)
- NEVER skip validation — All root causes must pass truth, alignment, proof, resonance checks
- NEVER output with truth score < 6.0
- NEVER output with mechanism_alignment score < 7.0
- NEVER output with composite score < 6.5
- NEVER assign "approved" decision if any dimension < minimum threshold
- NEVER assign "blocked" decision without specific remediation guidance

### Output Constraints (Layer 4)
- NEVER output without all three copy block formats (full_revelation, compressed, headlines)
- NEVER output without downstream handoffs to mechanism, promise, big_idea
- NEVER handoff root_cause_to_solve without mechanism match verification
- ALWAYS include reframe_technique from defined enum
- ALWAYS include derivation_source classification
- ALWAYS maintain proof ceiling — Root cause claims limited by 02-proof-inventory ceiling

---

## Expression Method Selection Rules

Select expression method based on niche using binary decision tree:

```
IF niche = golf OR niche = sports OR niche = business:
    USE simple_reframe
    DO NOT USE named_syndrome, villain_personification

IF niche = health OR niche = supplements:
    USE named_syndrome OR villain_personification
    DO NOT USE simple_reframe alone

IF niche = weight_loss:
    USE villain_personification + named_syndrome
    DO NOT USE simple_reframe alone

IF niche = finance:
    USE villain_personification + expose
    DO NOT USE named_syndrome
```

Override allowed ONLY with explicit justification documented in output.

---

## RSF-Aware Expression Selection (v3.0)

When RSF inputs are available (expectation_schema.json, latent_resonance_field.json), expression selection gains additional optimization:

### Schema Distance Consideration

```
FOR each candidate expression method:
  EVALUATE: Does this framing violate audience expectations?

  IF expression aligns with saturated_claims from expectation_schema:
    FLAG: "Low schema distance — conventional framing"
    CONSIDER: Alternative expression that occupies whitespace_zone

  IF expression occupies identified whitespace_zone:
    BOOST: Schema distance score (+2)
    NOTE: "Expression leverages unexploited territory"
```

### Resonance Connection

```
FOR selected expression:
  CHECK: Does framing connect to latent_emotion from resonance field?

  IF framing crystallizes an identified latent_emotion:
    BOOST: Resonance connection strength
    DOCUMENT: Which emotion is crystallized

  IF framing aligns with FSSIT candidate:
    STRONGLY PREFER: This expression
    DOCUMENT: FSSIT alignment in rsf_metadata
```

### RSF Expression Optimization Protocol

```
WHEN RSF inputs available:
  1. GENERATE: Candidate expressions per niche rules (existing logic)
  2. EVALUATE: Each candidate against expectation_schema
     - Which expectations does it violate? (schema distance)
     - Does it fall into saturated territory?
  3. EVALUATE: Each candidate against latent_resonance_field
     - Does it connect to unexpressed emotion?
     - Does it align with any FSSIT candidate?
  4. SELECT: Expression that maximizes:
     - Niche appropriateness (existing logic)
     - Schema distance (RSF enhancement)
     - Resonance connection (RSF enhancement)
  5. DOCUMENT: RSF influence in rsf_metadata

WHEN RSF inputs NOT available:
  - Proceed with existing expression selection logic
  - Set rsf_inputs_available: false in output
  - Log: "RSF enhancement skipped — inputs unavailable"
```

### Schema Distance Scoring for Root Cause Expression

| Score | Interpretation | Action |
|-------|---------------|--------|
| 1-3 | Highly conventional framing | Consider alternatives if RSF available |
| 4-6 | Moderate schema distance | Acceptable; optimize resonance |
| 7-8 | Strong schema violation | Optimal range for RSF |
| 9-10 | Extreme deviation | Flag for review — may confuse |

**Note:** Unlike Big Ideas, Root Cause expressions tolerate lower schema distance (4-6) because the primary goal is TRUTH REVELATION, not surprise. RSF enhances but does not override niche-appropriate expression selection.

---

## Layer Sequence Rules

**Layer 1 → Layer 2 Gate:**
- AFTER completing all Layer 1 microskills (1.1-1.7)
- BEFORE starting any Layer 2 microskill
- VERIFY: ≥1 root cause candidate with mechanism_check = PASS and proof_check = PASS

**Layer 2 → Layer 3 Gate:**
- AFTER completing Layer 2 expression synthesis (2.7)
- BEFORE starting Layer 3 validation
- VERIFY: Expression method selected, all three parts populated

**Layer 3 → Layer 4 Gate:**
- AFTER completing Layer 3 validation synthesis (3.5)
- BEFORE starting Layer 4 output packaging
- VERIFY: Decision is "approved" or "conditional" (not "revision" or "blocked")

---

## Post-Processing Checkpoint

Before finalizing output, verify:

1. **Derivation Integrity:** Root cause derived from research, not fabricated
2. **Expression Match:** Expression method matches niche patterns
3. **Three-Part Completeness:** All three parts present and substantive
4. **Validation Scores:** All dimensions meet minimum thresholds
5. **Copy Block Coverage:** All format variations generated
6. **Handoff Completeness:** All downstream skills have required inputs
7. **Proof Alignment:** Root cause claims within proof ceiling

If any check fails → return to relevant layer for correction before output.

---

## Trigger-Template Refusals

### Refuse to Proceed When:
- **Missing research:** "Cannot derive root cause without deep_research outputs. Run 01-research first."
- **Missing proof inventory:** "Cannot validate root cause claims without proof_inventory outputs. Run 02-proof-inventory first."
- **Mechanism mismatch:** "Derived root cause '[X]' cannot be solved by proposed mechanism. Either revise root cause or revise mechanism."
- **Validation blocked:** "Root cause blocked with scores: [truth: X, alignment: X, proof: X, resonance: X]. Composite [X] below minimum 6.5. Return to derivation."

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

## Validation Thresholds

| Dimension | Minimum | Good | Excellent |
|-----------|---------|------|-----------|
| Truth | 6.0 | 7.5 | 9.0+ |
| Mechanism Alignment | 7.0 | 8.0 | 9.0+ |
| Proof Availability | 6.0 | 7.0 | 8.5+ |
| Audience Resonance | 7.0 | 8.0 | 9.0+ |
| Composite | 6.5 | 7.5 | 8.5+ |

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
- MUST validate all upstream inputs before processing begins
- MUST NOT proceed if deep_research outputs are missing or incomplete
- MUST NOT proceed if proof_inventory outputs are unavailable
- NEVER fabricate root causes to fit a predetermined mechanism
- MUST derive root cause exclusively from research pattern analysis
- ONLY select root causes that the proposed mechanism can solve
- MUST verify proof pathway exists before finalizing root cause selection
- NEVER add self-blame to root cause framing — relief is mandatory
- MUST match expression method to niche per Expression Patterns table
- NEVER use Named Syndrome for Golf/Sports without documented override justification
- NEVER use Simple Reframe alone for Health/Supplements niche
- MUST include all three parts in output (what_they_think, what_real, why_nothing_worked)
- ONLY output with truth score ≥ 6.0
- ONLY output with mechanism_alignment score ≥ 7.0
- ONLY output with composite score ≥ 6.5
- MUST include reframe_technique from approved enum in every output
- NEVER skip validation layer — all four validation dimensions required
- MUST populate all downstream handoffs (mechanism, promise, big_idea)
- NEVER handoff without mechanism match verification completed

### Active Quality Gate Enforcement

```
IF deep_research_outputs missing:
  LOG: "[INPUT_VALIDATION] FAILED: deep_research outputs not found"
  ACTION: HALT
  REMEDIATION: Run 01-research skill before proceeding

IF proof_inventory_outputs missing:
  LOG: "[INPUT_VALIDATION] FAILED: proof_inventory outputs not found"
  ACTION: HALT
  REMEDIATION: Run 02-proof-inventory skill before proceeding

IF derivation yields zero candidates:
  LOG: "[LAYER_1_GATE] FAILED: No root cause candidates derived from research"
  ACTION: HALT
  REMEDIATION: Review research data quality; expand source materials

IF expression_method not matched to niche:
  LOG: "[LAYER_2_GATE] FAILED: Expression method [method] invalid for niche [niche]"
  ACTION: HALT
  REMEDIATION: Select expression per Niche Expression Patterns table

IF truth_score < 6.0:
  LOG: "[VALIDATION_GATE] FAILED: Truth score [X] below minimum 6.0"
  ACTION: HALT
  REMEDIATION: Revise root cause to increase factual accuracy

IF mechanism_alignment < 7.0:
  LOG: "[VALIDATION_GATE] FAILED: Mechanism alignment [X] below minimum 7.0"
  ACTION: HALT
  REMEDIATION: Ensure mechanism can solve the root cause; revise if needed

IF composite_score < 6.5:
  LOG: "[VALIDATION_GATE] FAILED: Composite score [X] below minimum 6.5"
  ACTION: HALT
  REMEDIATION: Address lowest-scoring dimensions; re-validate
```

---

### Failure Modes
| Mode | Severity | Detection | Handling |
|------|----------|-----------|----------|
| Upstream deep_research missing | HIGH | Input validation | HALT with remediation: run 01-research |
| Upstream proof_inventory missing | HIGH | Input validation | HALT with remediation: run 02-proof-inventory |
| Zero root cause candidates | HIGH | Layer 1 output check | HALT + expand research sources |
| Expression/niche mismatch | MEDIUM | Layer 2 validation | REJECT + apply correct expression method |
| Truth score below threshold | HIGH | Layer 3 validation | HALT + revise root cause derivation |
| Mechanism cannot solve root cause | HIGH | Constraint check 1.5 | HALT + revise root cause OR mechanism |
| No proof pathway available | HIGH | Constraint check 1.6 | HALT + address proof gaps first |
| Three-part output incomplete | MEDIUM | Output validation | REJECT + populate missing parts |
| Handoff schema mismatch | HIGH | Output validation | REJECT + re-package per downstream schema |
| Root cause adds self-blame | MEDIUM | Content analysis | REJECT + reframe for relief |

---

### Anti-Slop Lexicon
NEVER use these words/phrases in generated output:

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

---

## Status

**VERSION 3.0** — RSF-Enhanced per system-wide RSF integration initiative.

**Changes from v2.1:**
- Added RSF Dependencies (optional) to header
- Added RSF Enhancement section explaining v3.0 capabilities
- Added rsf_metadata to output schema for downstream RSF consumption
- Added RSF-Aware Expression Selection section with:
  - Schema distance consideration for expression framing
  - Resonance connection to latent_resonance_field
  - RSF Expression Optimization Protocol
  - Schema distance scoring table for root cause expressions
- Added RSF Expression Constraints (8 new constraints)
- Expression selection now considers whitespace_zones when available
- FSSIT alignment now influences expression preference

**Key Principle:** Root cause TRUTH is not affected by RSF. Root cause FRAMING can be enhanced by RSF intelligence.

**Changes from v2.0 (retained in v2.1):**
- Added Identity Boundaries section
- Expanded constraints from 6 to 32 (including 8 RSF constraints)
- Added Expression Method Selection Rules (binary decision tree)
- Added Layer Sequence Rules (positional reinforcement)
- Added Post-Processing Checkpoint
- Added Trigger-Template Refusals
- Added Success Criteria to Purpose

**Architecture:**
- Separated DERIVATION (finding) from EXPRESSION (communicating)
- Niche-specific expression matching
- RSF-enhanced expression optimization (v3.0)
- Validation layer with explicit scoring
- Downstream handoff packaging with rsf_metadata

**Microskills Complete:**
- Layer 1: 7 derivation microskills
- Layer 2: 7 expression microskills
- Layer 3: 5 validation microskills
- Layer 4: 4 output microskills

**Total: 23 microskills**

---

---

## MANDATORY OUTPUT FILE PROTOCOL (v3.1)

```
╔══════════════════════════════════════════════════════════════════════════════╗
║  CRITICAL: ALL REQUIRED OUTPUT FILES ARE MANDATORY                           ║
║                                                                               ║
║  The skill is NOT COMPLETE until ALL files exist and pass validation.        ║
║  You MUST NOT claim completion without verifying each file individually.     ║
║  You MUST NOT skip markdown handoff creation to save time or tokens.         ║
║                                                                               ║
║  FAILURE TO CREATE ANY REQUIRED FILE = SKILL EXECUTION FAILURE               ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

### REQUIRED OUTPUT FILES (3 Total)

| File | Format | Purpose | Validation Requirement |
|------|--------|---------|------------------------|
| `root-cause-package.yaml` | YAML | Primary structured output | Must pass schema validation |
| `ROOT-CAUSE-SUMMARY.md` | Markdown | Human-readable handoff | Must contain all required sections |
| `execution-log.md` | Markdown | Execution verification | Must show all 23 microskills checked |

### FILE 1: root-cause-package.yaml (SCHEMA VALIDATION)

```
REQUIRED SECTIONS:
┌─────────────────────────────────────────────────────────────────────┐
│  1. core              ← statement + three_part structure            │
│  2. copy_blocks       ← full_revelation, compressed, headlines      │
│  3. validation        ← scores + decision                           │
│  4. downstream_handoffs ← mechanism, promise, big_idea              │
│  5. rsf_metadata      ← RSF integration data (if available)         │
│  6. metadata          ← niche, expression_method, reframe_technique │
└─────────────────────────────────────────────────────────────────────┘

ALL HANDOFFS ARE MANDATORY:
- downstream_handoffs.mechanism must be populated
- downstream_handoffs.promise must be populated
- downstream_handoffs.big_idea must be populated
```

### FILE 2: ROOT-CAUSE-SUMMARY.md (SECTION REQUIREMENTS)

```
REQUIRED MARKDOWN SECTIONS:
┌─────────────────────────────────────────────────────────────────────┐
│  1. Executive Summary      ← Niche, expression method, scores       │
│  2. Three-Part Statement   ← what_they_think, what_real, why_failed │
│  3. Validation Scores      ← truth, alignment, proof, resonance     │
│  4. Copy Blocks            ← full_revelation + compressed versions  │
│  5. Downstream Handoffs    ← mechanism, promise, big_idea handoffs  │
│  6. Integration Guidance   ← How to use in copy production          │
└─────────────────────────────────────────────────────────────────────┘

PURPOSE: Allows human review without parsing YAML.
MISSING ANY SECTION = VALIDATION FAILURE
```

### FILE 3: execution-log.md (MICROSKILL VERIFICATION)

```
REQUIRED LOG CONTENT:
┌─────────────────────────────────────────────────────────────────────┐
│  1. Header with date, project name, skill version                   │
│  2. Layer 0 execution status                                        │
│  3. Layer 1 execution status (all 7 derivation microskills)         │
│  4. Layer 2 execution status (all 7 expression microskills)         │
│  5. Layer 3 execution status (all 5 validation microskills)         │
│  6. Layer 4 execution status (all 4 output microskills)             │
│  7. Quality gates verification                                      │
│  8. Session state for resume capability                             │
└─────────────────────────────────────────────────────────────────────┘

FORMAT: Must use checkbox format [x] for completed microskills.
INCOMPLETE CHECKLIST = EXECUTION WAS NOT COMPLETE
```

---

## COMPLETION GATE (MANDATORY BEFORE DECLARING SUCCESS)

```
OUTPUT FILE VERIFICATION CHECKLIST:
┌───────────────────────────────────────────────────────────────────────────────┐
│ [ ] root-cause-package.yaml EXISTS in project outputs folder                  │
│ [ ] root-cause-package.yaml contains 'core.three_part' section                │
│ [ ] root-cause-package.yaml contains 'copy_blocks' section                    │
│ [ ] root-cause-package.yaml contains 'validation.scores' section              │
│ [ ] root-cause-package.yaml contains 'downstream_handoffs.mechanism'          │
│ [ ] root-cause-package.yaml contains 'downstream_handoffs.promise'            │
│ [ ] root-cause-package.yaml contains 'downstream_handoffs.big_idea'           │
│                                                                                │
│ [ ] ROOT-CAUSE-SUMMARY.md EXISTS in project outputs folder                    │
│ [ ] ROOT-CAUSE-SUMMARY.md contains Three-Part Statement section               │
│ [ ] ROOT-CAUSE-SUMMARY.md contains Validation Scores section                  │
│ [ ] ROOT-CAUSE-SUMMARY.md contains Copy Blocks section                        │
│ [ ] ROOT-CAUSE-SUMMARY.md contains Downstream Handoffs section                │
│                                                                                │
│ [ ] execution-log.md EXISTS in project outputs folder                         │
│ [ ] execution-log.md shows ALL microskills executed with checkboxes           │
│ [ ] execution-log.md shows quality gates verification                         │
└───────────────────────────────────────────────────────────────────────────────┘

IF ANY CHECKBOX IS UNCHECKED:
  → DO NOT claim skill completion
  → CREATE the missing file(s)
  → POPULATE the missing section(s)
  → RE-VERIFY the entire checklist
  → ONLY THEN report completion to user
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | — | Initial two-phase architecture (derivation/expression separation) |
| 2.1 | — | NateJones audit enhancements (constraints, boundaries, gates) |
| 3.0 | 2026-01-29 | RSF integration: schema distance consideration, resonance connection, FSSIT alignment |
| 3.1 | 2026-01-31 | Added MANDATORY OUTPUT FILE PROTOCOL with 3-file requirement and completion gate |
