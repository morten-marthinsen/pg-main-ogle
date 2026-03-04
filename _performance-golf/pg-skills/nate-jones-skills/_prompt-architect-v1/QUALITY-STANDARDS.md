# QUALITY STANDARDS — Nate Jones Prompt Architect
*Scoring Rubrics & Thresholds for Skill Evaluation*

---

## PURPOSE

This document defines the quantitative scoring system used by the Prompt Architecture Auditor. Every score maps to a specific, measurable dimension of skill quality. No subjective judgments — only standards-backed measurements.

---

## 1. SCORING DIMENSIONS

### 1.1 Structural Quality (4 dimensions)

| Dimension | What It Measures | Scale | Threshold | Critical? |
|-----------|-----------------|-------|-----------|-----------|
| Four-Block Compliance | Presence/quality of Purpose, Instructions, Reference, Output blocks | 0-20 (5 per block) | ≥16 | Yes |
| Constraint Ratio | Constraints ÷ (Constraints + Instructions) | 0.0-1.0 | ≥0.60 | Yes |
| Specificity Score | % of sections in Goldilocks zone | 0-100% | ≥80% | Yes |
| Hierarchy Clarity | Clear section nesting, no orphaned content | 0-5 | ≥4 | No |

### 1.2 Production Quality (4 dimensions)

| Dimension | What It Measures | Scale | Threshold | Critical? |
|-----------|-----------------|-------|-----------|-----------|
| Guardrail Coverage | # of 7 guardrail patterns present | 0-7 | ≥5 (prod) / ≥3 (internal) | Yes |
| Slop Density | Filler/hedge instances per 100 lines | 0-∞ (lower=better) | ≤2 | Yes |
| Production Principles | # of 6 principles implemented | 0-6 | ≥4 (orchestrator) / ≥3 (leaf) | No |
| Failure Mode Exposure | # of 7 MCP failure modes present | 0-7 (lower=better) | 0 (prod) / ≤2 (dev) | Conditional |

### 1.3 Architectural Quality (4 dimensions)

| Dimension | What It Measures | Scale | Threshold | Critical? |
|-----------|-----------------|-------|-----------|-----------|
| Context Layering | Clean separation of Layer 1 (deterministic) and Layer 2 (probabilistic) | 0-5 | ≥3 | No |
| Composability | Can this skill be called by other skills cleanly? | 0-5 | ≥4 | No |
| State Awareness | Does it track what's been done / what's next? | 0-5 | ≥3 (multi-step) / N/A (single-shot) | Conditional |
| Validation Presence | Self-validates outputs before delivery? | Binary | Present | Yes (generation skills) |

### 1.4 Copy/Content Quality (4 dimensions — apply only to content-producing skills)

| Dimension | What It Measures | Scale | Threshold | Critical? |
|-----------|-----------------|-------|-----------|-----------|
| Anti-Slop Compliance | All 9 anti-slop principles enforced | 0-9 | ≥8 | Yes |
| Benefit Depth | Dimensionalized benefits (functional+emotional+identity) | 0-5 levels | ≥3 | No |
| Voice Specification | Brand voice defined with vocabulary + examples | 0-5 | ≥4 | Yes (copy skills) |
| CTA Clarity | Clear, friction-free call to action specification | 0-5 | ≥4 | Yes (copy skills) |

---

## 2. SCORING RUBRICS

### 2.1 Four-Block Compliance (0-20)

**Block 1: PURPOSE (0-5)**
| Score | Criteria |
|-------|----------|
| 0 | No purpose statement |
| 1 | Vague purpose ("helps with things") |
| 2 | General purpose but missing specifics (who, what problem) |
| 3 | Clear purpose, missing either audience or problem |
| 4 | Clear purpose with audience AND problem defined |
| 5 | Precise purpose with scope boundaries, non-goals, and success criteria |

**Block 2: INSTRUCTIONS (0-5)**
| Score | Criteria |
|-------|----------|
| 0 | No instructions (just a description) |
| 1 | Vague directions ("do the analysis") |
| 2 | General steps without decision rules |
| 3 | Clear steps with some decision rules |
| 4 | Explicit steps, decision rules, sequence, and dependencies |
| 5 | Complete protocol with conditional logic, edge cases, and fallbacks |

**Block 3: REFERENCE (0-5)**
| Score | Criteria |
|-------|----------|
| 0 | No reference material or exemplars |
| 1 | Mentions "refer to X" without providing content |
| 2 | Minimal context, no exemplars |
| 3 | Context provided, but no output exemplars |
| 4 | Context + 1-2 output exemplars |
| 5 | Full context + 2-3 exemplars + anti-exemplars (what NOT to produce) |

**Block 4: OUTPUT (0-5)**
| Score | Criteria |
|-------|----------|
| 0 | No output specification |
| 1 | "Produce a report" (undefined format) |
| 2 | General format mentioned (markdown, list) |
| 3 | Format specified with sections defined |
| 4 | Precise format with structure, length constraints, and section specs |
| 5 | Complete spec: format + structure + length + quality criteria + validation checks |

### 2.2 Constraint Ratio Calculation

**Method:**

```
1. Count CONSTRAINT statements:
   - Contains: NEVER, ALWAYS, MUST NOT, DO NOT, CANNOT, FORBIDDEN
   - Contains: "is not allowed", "is prohibited", "under no circumstances"
   - Defines boundaries: max/min limits, exclusions, scope restrictions
   - Anti-patterns listed (what NOT to do)

2. Count INSTRUCTION statements:
   - Contains: "do", "write", "create", "generate", "analyze", "produce"
   - Action directives without boundary framing
   - Positive directions (what TO do)

3. Calculate:
   ratio = constraint_count / (constraint_count + instruction_count)

4. Score:
   ≥0.70 = Optimal (constraints dominate)
   0.60-0.69 = Acceptable (good balance)
   0.50-0.59 = Weak (needs more constraints)
   <0.50 = Failing (instruction-heavy, will produce generic output)
```

### 2.3 Specificity Scoring

**Per-Section Evaluation:**

| Zone | Characteristics | Score |
|------|----------------|-------|
| TOO VAGUE | Uses "appropriate," "relevant," "as needed," "good quality" without defining what those mean | 0 |
| SLIGHTLY VAGUE | Has general direction but missing measurable criteria | 1 |
| GOLDILOCKS | Specific enough to constrain, flexible enough for model intelligence. Has measurable criteria AND room for execution style. | 2 |
| SLIGHTLY RIGID | Prescribes exact words/phrases that limit model quality | 1 |
| TOO RIGID | Word-for-word scripts, no room for adaptation | 0 |

**Calculation:**
```
specificity_score = (sections_in_goldilocks / total_sections) × 100%
```

### 2.4 Guardrail Pattern Detection

**Pattern 1: Identity Invariants**
- Look for: "You are [X]", "You are NOT [Y]", role definitions
- Must include both positive identity AND negative boundaries
- Score: Present (1) or Absent (0)

**Pattern 2: Trigger-Template Refusals**
- Look for: "If [trigger condition], respond with [exact template]"
- Must handle at least 2 edge cases explicitly
- Score: Present (1) or Absent (0)

**Pattern 3: Three-Tier Uncertainty**
- Look for: Confidence-based behavior rules (>90%, 60-90%, <60%)
- Must define different actions per confidence tier
- Score: Present (1) or Absent (0)

**Pattern 4: Locked Tool Grammar**
- Look for: Preconditions before tool calls, required parameters, format rules
- Must constrain tool usage, not just describe it
- Score: Present (1) or Absent (0)

**Pattern 5: Binary Style Rules**
- Look for: ALWAYS/NEVER pairs without gray area
- Must have at least 3 binary rules
- Score: Present (1) or Absent (0)

**Pattern 6: Positional Reinforcement**
- Look for: Critical rules placed FIRST in document, repeated near end
- Key constraints appear in multiple sections
- Score: Present (1) or Absent (0)

**Pattern 7: Post-Tool Reflection**
- Look for: Validation steps AFTER tool calls or major operations
- Must check: format correct? data sensible? errors present?
- Score: Present (1) or Absent (0)

### 2.5 Anti-Slop Detection

**Slop Indicators (each occurrence = 1 point):**

**Filler Phrases:**
- "It's important to note"
- "It's worth mentioning"
- "In today's fast-paced world"
- "At the end of the day"
- "When all is said and done"
- "In this day and age"
- "As we all know"
- "The fact of the matter is"
- "It goes without saying"
- "Needless to say"

**Hedge Words (without genuine uncertainty):**
- "perhaps"
- "it seems"
- "one might argue"
- "arguably"
- "it could be said"
- "in some ways"
- "to some extent"
- "more or less"

**Corporate Buzzwords:**
- "synergy"
- "leverage" (as verb)
- "ecosystem" (when not technical)
- "paradigm shift"
- "holistic approach"
- "move the needle"
- "low-hanging fruit"
- "circle back"
- "deep dive" (overused)
- "unpack" (overused)

**Generic Modifiers:**
- "very" (replace with specific)
- "really" (replace with specific)
- "quite" (replace with specific)
- "extremely" (replace with specific)
- "incredibly" (replace with specific)
- "absolutely" (unless literal)

**Passive Voice (when active is better):**
- "It was determined that..." → "We determined..."
- "The analysis was performed..." → "[Agent] analyzed..."
- "Results were obtained..." → "[Agent] obtained..."

**Calculation:**
```
slop_density = total_slop_instances / (total_lines / 100)
```

---

## 3. OVERALL HEALTH RATING

### Aggregate Scoring

```
CRITICAL dimensions (must all pass):
- Four-Block Compliance ≥16
- Constraint Ratio ≥0.60
- Specificity Score ≥80%
- Guardrail Coverage ≥ threshold for type
- Slop Density ≤2

HEALTH RATING:
- EXCELLENT: All critical pass + all non-critical at threshold
- GOOD: All critical pass + ≥75% non-critical at threshold
- FAIR: All critical pass + <75% non-critical at threshold
- POOR: 1-2 critical dimensions failing
- CRITICAL: 3+ critical dimensions failing
```

### Recommendation Matrix

| Health | Critical Fails | Recommendation | Action |
|--------|---------------|----------------|--------|
| EXCELLENT | 0 | PASS | No changes needed |
| GOOD | 0 | PASS (with notes) | Optional improvements listed |
| FAIR | 0 | OPTIMIZE | Apply Layer 2 prescriptions |
| POOR | 1-2 | REWRITE | Full Layer 2+3 pipeline |
| CRITICAL | 3+ | REBUILD | Start from SKILL-TEMPLATE |

---

## 4. SKILL TYPE MODIFIERS

Not all skills need the same standards. Apply these modifiers:

### Orchestrator Skills (MASTER-AGENT files)
- Production Principles threshold: ≥5 (not 4)
- State Awareness: REQUIRED (not conditional)
- Guardrail Coverage: ≥6 (not 5)
- Must have: session persistence, handoff protocol, checkpoint logic

### Leaf Skills (single-purpose micro-skills)
- Production Principles threshold: ≥3 (not 4)
- State Awareness: N/A (orchestrator handles state)
- Guardrail Coverage: ≥3 (not 5)
- Must have: clear input/output spec, single responsibility

### Generation Skills (produce content/copy)
- Anti-Slop Compliance: REQUIRED (≥8)
- Chain-of-Refinement: REQUIRED
- Validation Presence: REQUIRED
- Exemplars: REQUIRED (minimum 2 positive + 1 negative)

### Validation Skills (gates/checkpoints)
- Binary Style Rules: REQUIRED (≥5 rules)
- Locked Tool Grammar: REQUIRED
- Decision Logic: Must be explicit (no "use judgment")
- Output: Must produce quantified pass/fail, not qualitative assessment

### Scraper/Collection Skills
- Failure Mode Exposure: REQUIRED (0 modes)
- Tool Fallback Chain: REQUIRED
- Post-Tool Reflection: REQUIRED
- Error handling: Must distinguish transient vs permanent failures

---

## 5. SCORING REPORT FORMAT

Every audit produces scores in this format:

```yaml
quality_scores:
  target: [filename]
  type: [orchestrator | leaf | generation | validation | scraper]
  timestamp: [ISO date]

  structural:
    four_block_compliance:
      score: [0-20]
      threshold: 16
      status: [PASS | FAIL]
      details:
        purpose: [0-5]
        instructions: [0-5]
        reference: [0-5]
        output: [0-5]
    constraint_ratio:
      score: [0.0-1.0]
      threshold: 0.60
      status: [PASS | FAIL]
      constraints_found: [count]
      instructions_found: [count]
    specificity:
      score: [0-100%]
      threshold: 80%
      status: [PASS | FAIL]
      sections_evaluated: [count]
      in_goldilocks: [count]
      too_vague: [count]
      too_rigid: [count]
    hierarchy_clarity:
      score: [0-5]
      threshold: 4
      status: [PASS | FAIL]

  production:
    guardrail_coverage:
      score: [0-7]
      threshold: [type-dependent]
      status: [PASS | FAIL]
      present: [list of patterns found]
      missing: [list of patterns absent]
    slop_density:
      score: [instances/100 lines]
      threshold: 2
      status: [PASS | FAIL]
      instances: [list of found slop with line numbers]
    production_principles:
      score: [0-6]
      threshold: [type-dependent]
      status: [PASS | FAIL]
      present: [list]
      missing: [list]
    failure_modes:
      score: [0-7]
      threshold: [type-dependent]
      status: [PASS | FAIL | N/A]
      detected: [list]

  architectural:
    context_layering:
      score: [0-5]
      threshold: 3
      status: [PASS | FAIL]
    composability:
      score: [0-5]
      threshold: 4
      status: [PASS | FAIL]
    state_awareness:
      score: [0-5]
      threshold: [type-dependent]
      status: [PASS | FAIL | N/A]
    validation_presence:
      score: [Binary]
      threshold: Present
      status: [PASS | FAIL | N/A]

  content: # Only for generation/copy skills
    anti_slop:
      score: [0-9]
      threshold: 8
      status: [PASS | FAIL | N/A]
    benefit_depth:
      score: [0-5]
      threshold: 3
      status: [PASS | FAIL | N/A]
    voice_spec:
      score: [0-5]
      threshold: 4
      status: [PASS | FAIL | N/A]
    cta_clarity:
      score: [0-5]
      threshold: 4
      status: [PASS | FAIL | N/A]

  aggregate:
    critical_dimensions_passing: [X of Y]
    total_score: [sum of all applicable scores]
    max_possible: [sum of all applicable maxima]
    percentage: [total/max × 100]
    health_rating: [EXCELLENT | GOOD | FAIR | POOR | CRITICAL]
    recommendation: [PASS | OPTIMIZE | REWRITE | REBUILD]
```

---

## 6. IMPROVEMENT TRACKING

### Before/After Comparison Format

```yaml
improvement_metrics:
  target: [filename]
  audit_date: [date]

  before:
    health_rating: [rating]
    critical_passing: [X of Y]
    aggregate_percentage: [%]

  after:
    health_rating: [rating]
    critical_passing: [X of Y]
    aggregate_percentage: [%]

  delta:
    health_change: [e.g., POOR → GOOD]
    critical_fixed: [count]
    percentage_improvement: [+X%]

  key_changes:
    - dimension: [which score improved]
      before: [old score]
      after: [new score]
      prescription_applied: [what was done]
```

---

## DOCUMENT INFO

**Version:** 1.0
**Created:** 2026-01-22
**Purpose:** Quantitative scoring rubrics for skill file evaluation
**Authority:** Defines measurements referenced by MASTER-AGENT.md
**Scope:** All Claude Code skill files within Anthony's vault ecosystem
**Location:** `/Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/NateJones-PromptArchitect/QUALITY-STANDARDS.md`
