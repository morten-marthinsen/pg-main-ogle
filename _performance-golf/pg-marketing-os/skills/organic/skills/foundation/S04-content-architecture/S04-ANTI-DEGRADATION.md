# S04-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-04
**Purpose:** STRUCTURAL enforcement to prevent content architecture skill process breakdown
**Authority:** This document has EQUAL authority to ORGANIC-ENGINE-CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI creates pillars that don't map to audience needs from AIF
- AI invents content percentages that don't sum to 100%
- AI skips series architecture entirely
- AI creates format matrix without platform-specific variations
- AI produces funnel integration without clear CTA strategy
- AI bypasses Concept Checkpoint and names pillars/series prematurely

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Concept Checkpoint (Gate 1A)

**Phase B (Naming) CANNOT execute unless this file exists:**
```
[project]/S04-content-architecture/checkpoints/CONCEPT_APPROVED.yaml
```

**Checkpoint File Format:**
```yaml
# CONCEPT_APPROVED.yaml
skill: "S04-content-architecture"
status: APPROVED
timestamp: "[ISO 8601]"

approved_concepts:
  pillars:
    - concept_id: pillar_1
      description: "[Concept description]"
      audience_need: "[From AIF]"
    - concept_id: pillar_2
      description: "[Concept description]"
      audience_need: "[From AIF]"

  series:
    - concept_id: series_1
      description: "[Series concept]"
      pillar: "[Which pillar]"

human_approval:
  approved_by: "[Name]"
  approval_date: "[Date]"
  notes: "[Any guidance]"
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/S04-content-architecture/checkpoints/LAYER_1_COMPLETE.yaml
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

**CAF cannot be marked COMPLETE unless:**

| Element | Minimum | Actual | Verified |
|---------|---------|--------|----------|
| Content pillars | 3 | ___ | ☐ |
| Pillars with audience_need mapped | 3 | ___ | ☐ |
| Content functions sum to 100% | Yes | ___ | ☐ |
| Content series defined | 1 | ___ | ☐ |
| Formats in format_matrix | 3 | ___ | ☐ |
| Primary CTA defined | Yes | ___ | ☐ |
| Weekly rhythm days populated | 7 | ___ | ☐ |

**If any minimum not met → status = INCOMPLETE, NOT "conditional pass" or "partial pass"**

---

## STRUCTURAL FIX 3: FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|--------------|-----------|----------|------------|
| Pillars not mapped to AIF needs | Check each pillar has `audience_need` field with content from AIF | REJECT pillar, require AIF-based need | Human review if 2+ pillars rejected |
| Function percentages don't sum to 100% | Math check: awareness + engagement + conversion + community = 100 | REJECT function_mapping, require exact 100% | Immediate halt if math wrong 2+ times |
| Series missing structural elements | Check: name, format, platform, pillar, concept, frequency, examples | REJECT series, require all fields | Human review if series incomplete |
| Format matrix missing platform variations | Check each format has platform-specific adaptations | REJECT format, require variations | Human review if 2+ formats missing variations |
| No clear CTA strategy | Check funnel_integration.cta_strategy has primary_ctas with ≥1 entry | REJECT funnel section, require CTAs | Immediate halt if no CTA after Layer 1 |
| Calendar framework incomplete | Check weekly_rhythm has all 7 days + posting_cadence has ≥1 platform | REJECT calendar, require complete framework | Human review if calendar missing after Layer 1 |

---

## STRUCTURAL FIX 4: FORBIDDEN RATIONALIZATIONS

**NEVER accept these justifications:**

| Forbidden Phrase | Why It's Forbidden | Correct Response |
|-----------------|-------------------|------------------|
| "We can refine the pillars later" | Pillars ARE the foundation | Stop. Complete pillar definition now. |
| "Function percentages are approximate" | 100% is exact, not approximate | Stop. Make percentages sum to exactly 100%. |
| "Series can be added in production" | Architecture precedes production | Stop. Design at least 1 series now. |
| "Format details can be decided per post" | Format matrix guides decisions | Stop. Define format variations now. |
| "CTA strategy evolves with content" | Strategy precedes execution | Stop. Define primary CTA now. |

---

## STRUCTURAL FIX 5: BINARY GATE ENFORCEMENT

**Gates can ONLY have these statuses:**
- `PASS` — all criteria met, proceed
- `FAIL` — criteria not met, stop and remediate

**NEVER use:**
- "conditional pass"
- "partial pass"
- "pass with warnings" (unless explicitly defined in gate criteria)
- "provisionally approved"

**If a gate file exists, it MUST say PASS. Any other content means DELETE THE FILE.**

---

## STRUCTURAL FIX 6: MANDATORY READ BEFORE EXECUTION

**The agent MUST read these files BEFORE starting S04:**

1. `S04-AGENT.md` — master agent protocol
2. `S04-ANTI-DEGRADATION.md` — THIS FILE
3. `skills/layer-0/0.1-input-validator.md` — input validation protocol
4. `[project]/S01-audience-intelligence/outputs/[campaign]-AIF.yaml` — audience needs
5. `[project]/S02-platform-strategy/outputs/[campaign]-PSF.yaml` — platform context
6. `[project]/S03-brand-voice/outputs/[campaign]-BVF.yaml` — voice constraints

**Execution without reading = automatic FAIL**

---

## STRUCTURAL FIX 7: PER-MICROSKILL OUTPUT PROTOCOL

**Every microskill produces its own file. No exceptions.**

**Layer 1 Required Files (6 files):**
```
1.1-pillar-concepts.yaml
1.2-function-mapping.yaml
1.3-series-concepts.yaml
1.4-format-matrix.yaml
1.5-funnel-integration.yaml
1.6-calendar-framework.yaml
```

**If a microskill is marked "complete" but its output file doesn't exist → it didn't happen.**

---

## STRUCTURAL FIX 8: PROJECT INFRASTRUCTURE REQUIREMENTS

**Before ANY S04 execution, these MUST exist:**

```
[project]/S04-content-architecture/
├── PROJECT-STATE.md (tracks current phase, blockers, decisions)
├── PROGRESS-LOG.md (timestamped log of all actions)
├── checkpoints/ (CONCEPT_APPROVED.yaml, LAYER_1_COMPLETE.yaml)
└── outputs/ (final CAF.yaml destination)
```

**Missing infrastructure = execution cannot proceed**

---

## STRUCTURAL FIX 9: STALE ARTIFACT CLEANUP

**Before starting Layer 1, DELETE these if they exist from previous failed attempts:**

```
[project]/S04-content-architecture/outputs/[campaign]-CAF.yaml
[project]/S04-content-architecture/checkpoints/CONCEPT_APPROVED.yaml
[project]/S04-content-architecture/checkpoints/LAYER_1_COMPLETE.yaml
```

**Stale checkpoints create false progression signals.**

---

## Per-Microskill Output Requirements

| Microskill | Output File | Minimum Content | Verified |
|------------|-------------|-----------------|----------|
| 1.1 | pillar-concepts.yaml | 3 pillars, each with audience_need from AIF | ☐ |
| 1.2 | function-mapping.yaml | 4 functions summing to 100% | ☐ |
| 1.3 | series-concepts.yaml | 1 series with concept, structure, examples | ☐ |
| 1.4 | format-matrix.yaml | 3+ formats with platform variations | ☐ |
| 1.5 | funnel-integration.yaml | CTA strategy with ≥1 primary CTA | ☐ |
| 1.6 | calendar-framework.yaml | 7-day rhythm + posting cadence | ☐ |
| 4.1 | [campaign]-CAF.yaml | Complete CAF with all sections | ☐ |
| 4.2 | execution-log.md | Timestamped decisions and rationale | ☐ |

---

*Degradation is prevented through structure, not instructions.*
