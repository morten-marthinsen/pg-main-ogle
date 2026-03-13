# S06: Virality Scoring — Master Agent

**Version:** 1.0
**Skill:** S06-virality-scoring
**Position:** Foundation, Step 6
**Type:** Framework Development (Leaf Skill)
**Dependencies:** S01-S05 outputs
**Output:** VSF (Virality Scoring Framework)

---

## Pre-Execution Requirements

**BEFORE any S06 execution, complete these steps:**

1. **READ** `S06-VIRALITY-SCORING-ANTI-DEGRADATION.md` — mandatory
2. **VALIDATE** all upstream inputs exist (S01-S05 output files)
3. **CREATE** project infrastructure:
   - `[campaign]/S06-virality-scoring/PROJECT-STATE.md`
   - `[campaign]/S06-virality-scoring/PROGRESS-LOG.md`
   - `[campaign]/S06-virality-scoring/checkpoints/` directory
4. **DELETE** any stale artifacts from previous failed attempts
5. **ONLY THEN** begin Layer 0

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure setup | haiku | File creation only |
| 0 | Input validation + teaching loading | haiku | Simple validation |
| 1 | Framework development (8 dimensions) | opus | Strategic framework design |
| 4 | Output packaging | sonnet | Assembly from existing content |

---

## Purpose

Build a calibrated scoring framework to predict content performance BEFORE publishing. The VSF creates objective quality thresholds based on proven virality dimensions.

**Success Criteria:**
- 8 scoring dimensions defined with weights totaling 100%
- Platform modifiers established for primary platform
- Calibration completed with ≥10 specimens
- Benchmarks set (minimum/target/viral thresholds)
- Quick-score checklist created

---

## Identity Boundaries

**This skill IS:**
- Predictive quality assessment framework
- Platform-specific scoring calibration
- Benchmark establishment from specimen analysis
- Production-ready evaluation tool

**This skill IS NOT:**
- Content creation (that's S08-S13)
- Performance analysis (that's S19-S20)
- Platform strategy (that's S02)
- Hook creation (that's S05)

---

## Layer Map

```
Layer 0: Input Validation + Teaching Loading
├── 0.1 Input Validator
├── 0.2 Teaching Loader
├── 0.3 Specimen Loader
└── 0.4 Upstream Loader

Layer 1: Framework Development
├── 1.1 Dimension Definition
├── 1.2 Platform Modifiers
├── 1.3 Specimen Calibration
├── 1.4 Benchmark Mapping
└── 1.5 Quick-Score Builder

Layer 4: Output Packaging
├── 4.1 VSF Assembler
└── 4.2 Execution Log
```

---

## Positional Reinforcement

### BEFORE Layer 1
You have completed input validation. All S01-S05 outputs are loaded. Teachings are accessible. Specimens are ready for calibration.

**YOUR TASK NOW:** Develop the 8-dimension scoring framework. Each dimension must have weights, criteria (0-10 scale), and indicators. Platform modifiers must be specific to the primary platform identified in S02.

**DO NOT:** Skip calibration. Do not invent specimen scores without analyzing actual viral content.

### BEFORE Layer 4
You have completed framework development. All dimensions are defined. Platform modifiers are set. Calibration is complete with specimen scores documented.

**YOUR TASK NOW:** Package the complete VSF output file. Verify all required fields are populated. Generate execution log.

**DO NOT:** Skip any VSF template sections. Do not omit calibration data.

---

## Output Requirements

**File:** `outputs/[campaign-name]-VSF.yaml`

**Minimum Content:**
- 8 dimensions with weights summing to 100%
- Platform modifiers for primary platform
- ≥10 calibrated specimens with actual scores
- Benchmark thresholds (minimum: 60, target: 75, viral: 85)
- Quick-score checklist (must-haves, red flags, green lights, kill criteria)
- Scoring formula documented

---

## Gate G06 Criteria

**PASS if:**
- All 8 dimensions defined with 0-10 criteria
- Weights sum to exactly 100%
- Primary platform modifiers defined
- ≥10 specimens calibrated with scores
- Benchmarks established
- Quick-score checklist complete

**FAIL if:**
- Any dimension missing criteria
- Weights don't sum to 100%
- <10 specimens calibrated
- Benchmarks not set
- Quick-score checklist incomplete

On FAIL: Return to incomplete microskills for remediation.

---

## Downstream Handoff

VSF unlocks **S07: Campaign Brief** via Gate G06.

The VSF becomes the quality control mechanism for ALL production skills (S08-S13). Every piece of content MUST be scored using this framework.

---

*Version 1.0 — Foundation skill, no Arena layer*
