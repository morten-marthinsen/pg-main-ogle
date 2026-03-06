# S01-AUDIENCE-INTELLIGENCE-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-04
**Purpose:** STRUCTURAL enforcement to prevent S01 process breakdown
**Authority:** This document has EQUAL authority to S01-AUDIENCE-INTELLIGENCE-AGENT.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI skips language mining and synthesizes audience voice from memory
- AI produces single competitor analysis instead of required 3+ accounts
- AI accepts demographic data without evidence sources
- AI skips pain/desire mapping depth (surface only, no deeper/root layers)
- AI proceeds to S02 with incomplete AIF

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/S01-audience-intelligence/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/S01-audience-intelligence/checkpoints/LAYER_1_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "S01-audience-intelligence"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  pain_expressions:
    required: 3
    actual: [number]
    verified: true
  competitor_accounts:
    required: 3
    actual: [number]
    verified: true
  surface_pains:
    required: 3
    actual: [number]
    verified: true
  stated_desires:
    required: 3
    actual: [number]
    verified: true

completeness:
  all_microskills_executed: true
  minimum_thresholds_met: true
  quality_gates_passed: true
```

---

## MINIMUM THRESHOLDS

| Section | Minimum Requirement | Gate |
|---------|-------------------|------|
| Pain expressions | 3 unique expressions | Layer 1 |
| Competitor accounts | 3 analyzed accounts | Layer 1 |
| Surface pains | 3 documented pains | Layer 1 |
| Stated desires | 3 documented desires | Layer 1 |
| Primary platforms | 2 platforms identified | Layer 1 |
| Primary markets | 1 geographic area | Layer 1 |
| AIF validation fields | 8/8 passing | Gate G01 |

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|--------------|-----------|----------|------------|
| Language mining skipped | pain_expressions count < 3 | HALT Layer 1. Mine Reddit/YouTube/reviews for actual phrases | If sources unavailable, flag to human |
| Competitor analysis shallow | accounts count < 3 OR gap analysis empty | HALT Layer 1. Analyze 3+ competitors with substantive gaps | If competitors unclear, request human input |
| Demographic fabrication | No evidence sources cited | REJECT demographics. Require SparkToro/analytics data | If no data available, use proxy sources |
| Pain mapping incomplete | Only surface_pains populated | HALT 1.6. Complete deeper_pains and root_pains layers | Cannot proceed without 3-layer depth |
| AIF validation failure | Any of 8 required fields empty | HALT Layer 4. Return to relevant Layer 1 microskill | Re-validate after correction |

---

## FORBIDDEN RATIONALIZATIONS

**NEVER accept these justifications:**

1. "We can infer the audience language from the niche."
   - NO. Language mining MUST use actual audience quotes from real sources.

2. "Two competitors is enough for pattern recognition."
   - NO. Minimum 3 accounts required. Gaps require triangulation.

3. "Demographics are obvious for this vertical."
   - NO. Evidence-based only. SparkToro, analytics, or proxy data required.

4. "We can skip root pains — surface pains are enough."
   - NO. Three-layer pain mapping is mandatory. Root pains drive content angles.

5. "The AIF can be completed later after S02."
   - NO. S02 CANNOT execute without passing Gate G01. AIF must be complete.

---

## BINARY GATE ENFORCEMENT

Gate G01 status can ONLY be:
- **PASS** — All 8 validation requirements met, file created
- **FAIL** — Any validation requirement missing, no file created

**NEVER create these invalid statuses:**
- "PARTIAL_PASS"
- "CONDITIONAL_PASS"
- "PASS_WITH_NOTES"
- "DEFERRED"

If Gate G01 fails, the LAYER_1_COMPLETE.yaml file MUST NOT exist.

---

## MANDATORY READ

**BEFORE executing S01:**
1. Read this ANTI-DEGRADATION.md file (you are reading it now)
2. Read S01-AUDIENCE-INTELLIGENCE-AGENT.md
3. Read all Layer 0 microskill specs (0.1-0.3)
4. Read all Layer 1 microskill specs (1.1-1.6)

**Execution without reading specs = guaranteed failure.**

---

## PER-MICROSKILL OUTPUT PROTOCOL

| Microskill | Output File | Minimum Size | Required Fields |
|------------|-------------|--------------|-----------------|
| 0.1 | input-validation.yaml | 500 bytes | brand_info, competitive_context, validation_status |
| 0.2 | teachings-loaded.yaml | 1KB | 5 teaching files with summaries |
| 0.3 | specimens-loaded.yaml | 1KB | 5+ case studies |
| 1.1 | demographic-foundation.yaml | 2KB | age_range, gender_split, location, income, professional |
| 1.2 | psychographic-depth.yaml | 2KB | values, interests, lifestyle, worldview |
| 1.3 | platform-behavior.yaml | 2KB | primary_platforms (≥2), consumption, engagement, times |
| 1.4 | language-mining.yaml | 3KB | pain_expressions (≥3), desire_expressions, vocabulary |
| 1.5 | competitor-audience.yaml | 2KB | accounts (≥3), why_follow, gaps |
| 1.6 | pain-desire-mapping.yaml | 3KB | surface_pains (≥3), deeper_pains, root_pains, desires (≥3) |
| 4.1 | AIF.yaml | 8KB+ | All sections from schema |
| 4.2 | execution-log.md | 2KB | All microskills checked |

**If any output file is missing, that microskill did NOT execute.**

---

## PROJECT INFRASTRUCTURE

**BEFORE Layer 0 execution, create:**
```
[project]/S01-audience-intelligence/
[project]/S01-audience-intelligence/checkpoints/
[project]/S01-audience-intelligence/outputs/
[project]/S01-audience-intelligence/PROJECT-STATE.md
[project]/S01-audience-intelligence/PROGRESS-LOG.md
```

**Purpose:** Session resumption, execution tracking, artifact organization

---

## STALE ARTIFACT CLEANUP

**BEFORE starting new execution:**
- DELETE any LAYER_N_COMPLETE.yaml files from previous failed attempts
- DELETE any partial output files from previous sessions
- VERIFY checkpoints directory is clean
- ONLY THEN begin Layer 0

**Stale checkpoints cause false gate passes.**

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-04 | Initial creation for organic marketing S01 decomposition |
