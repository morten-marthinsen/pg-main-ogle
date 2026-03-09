# S18-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-05
**Purpose:** STRUCTURAL enforcement to prevent repurpose multiplication skill process breakdown
**Authority:** This document has EQUAL authority to ORGANIC-ENGINE-CLAUDE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: S18-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Create fewer than 10 variants from source content. Cross-post same content with minor edits instead of platform-native rebuilding. Skip atomization and jump directly to variant planning.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI creates fewer than 10 variants (minimum threshold)
- AI cross-posts same content with minor edits (violates Law 5)
- AI creates variants without platform-specific adaptation
- AI skips atomization and jumps to variant planning
- AI produces generic "repurpose" without source element mapping
- AI creates variants without production needs assessment

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Atomization Checkpoint (Gate S18-1)

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/S18-repurpose/checkpoints/LAYER_0_COMPLETE.yaml
```

**Checkpoint File Format:**
```yaml
# LAYER_0_COMPLETE.yaml
skill: "S18-repurpose"
status: PASS
timestamp: "[ISO 8601]"

loaded_content:
  original_content_id: "[ID]"
  original_platform: "[Platform]"
  s14_package_loaded: true
  s02_psf_loaded: true
  s03_bvf_loaded: true

validation:
  all_required_files_loaded: true
  content_has_performance_data: "[Yes/No/Pending]"
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/S18-repurpose/checkpoints/LAYER_1_COMPLETE.yaml
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

**RMP cannot be marked COMPLETE unless:**

| Element | Minimum | Actual | Verified |
|---------|---------|--------|----------|
| Variants identified | 10 | ___ | ☐ |
| Platforms covered | 3 | ___ | ☐ |
| Variants with source element | 10 (100%) | ___ | ☐ |
| Variants with production needs | 10 (100%) | ___ | ☐ |
| Platform-native rebuilding | All variants | ___ | ☐ |
| Production timeline defined | Yes | ___ | ☐ |

**If any minimum not met → status = INCOMPLETE, NOT "conditional pass" or "partial pass"**

---

## STRUCTURAL FIX 3: FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|--------------|-----------|----------|------------|
| Fewer than 10 variants | Count variants array | REJECT RMP, require 10+ | Human review if persistent |
| Cross-posting (not platform-native) | Check variant descriptions for "same content, different platform" | REJECT variant, require rebuild spec | Immediate halt if 2+ cross-posts |
| Missing source element | Check each variant has `source_element` field populated | REJECT variant, require atomization | Human review if 2+ missing |
| Missing production needs | Check each variant has `production_needs` with 3 fields | REJECT variant, require needs | Human review if 2+ missing |
| Platforms < 3 | Count unique platforms in variants | REJECT RMP, require 3+ platforms | Immediate halt |
| No atomization | Check atomization section has 3+ atomic units | REJECT RMP, require atomization | Immediate halt |

---

## STRUCTURAL FIX 4: FORBIDDEN RATIONALIZATIONS

**NEVER accept these justifications:**

| Forbidden Phrase | Why It's Forbidden | Correct Response |
|-----------------|-------------------|------------------|
| "10 variants is too many for this content" | Every piece has 10+ variants | Stop. Find 10 variants or explain why content too weak. |
| "Cross-posting is efficient" | Violates Law 5 | Stop. Rebuild for each platform or don't post. |
| "Same caption works on Instagram and TikTok" | Platform-native requirement | Stop. Rewrite caption for each platform. |
| "Production needs are obvious" | Must be explicit | Stop. Document editing, recording, design needs. |
| "We can atomize later" | Atomization precedes planning | Stop. Complete atomization now. |

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

**The agent MUST read these files BEFORE starting S18:**

1. `S18-AGENT.md` — master agent protocol
2. `S18-ANTI-DEGRADATION.md` — THIS FILE
3. `skills/layer-0/0.1-input-validator.md` — input validation protocol
4. `[project]/S14-content-assembly/outputs/[content-id]-package.yaml` — original content
5. `[project]/S02-platform-strategy/outputs/[campaign]-PSF.yaml` — platform requirements
6. `[project]/S03-brand-voice/outputs/[campaign]-BVF.yaml` — voice constraints

**Execution without reading = automatic FAIL**

---

## STRUCTURAL FIX 7: PER-MICROSKILL OUTPUT PROTOCOL

**Every microskill produces its own file. No exceptions.**

**Layer 1 Required Files (4 files):**
```
1.1-atomization.yaml
1.2-platform-adaptation-matrix.yaml
1.3-variant-plan.yaml
1.4-production-sequence.yaml
```

**If a microskill is marked "complete" but its output file doesn't exist → it didn't happen.**

---

## STRUCTURAL FIX 8: PROJECT INFRASTRUCTURE REQUIREMENTS

**Before ANY S18 execution, these MUST exist:**

```
[project]/S18-repurpose/
├── PROJECT-STATE.md (tracks current phase, blockers, decisions)
├── PROGRESS-LOG.md (timestamped log of all actions)
├── checkpoints/ (LAYER_0_COMPLETE.yaml, LAYER_1_COMPLETE.yaml)
└── outputs/ (final RMP.yaml destination)
```

**Missing infrastructure = execution cannot proceed**

---

## STRUCTURAL FIX 9: STALE ARTIFACT CLEANUP

**Before starting Layer 1, DELETE these if they exist from previous failed attempts:**

```
[project]/S18-repurpose/outputs/[content-id]-RMP.yaml
[project]/S18-repurpose/checkpoints/LAYER_0_COMPLETE.yaml
[project]/S18-repurpose/checkpoints/LAYER_1_COMPLETE.yaml
```

**Stale checkpoints create false progression signals.**

---

## Per-Microskill Output Requirements

| Microskill | Output File | Minimum Content | Verified |
|------------|-------------|-----------------|----------|
| 1.1 | atomization.yaml | 3+ atomic units per type (hooks, insights, quotes) | ☐ |
| 1.2 | platform-adaptation-matrix.yaml | Adaptation rules for 3+ platforms | ☐ |
| 1.3 | variant-plan.yaml | 10+ variants with source elements | ☐ |
| 1.4 | production-sequence.yaml | Timeline for all variants | ☐ |
| 4.1 | [content-id]-RMP.yaml | Complete RMP with all sections | ☐ |
| 4.2 | execution-log.md | Timestamped decisions and rationale | ☐ |

---

## CRITICAL ENFORCEMENT: Law 5 Platform-Native Rebuilding

**Law 5 Violation Detection:**

Check every variant for these FORBIDDEN patterns:
- "Same as [platform] but posted to [other platform]"
- "Cross-post to [platform list]"
- "Minor edits for [platform]"
- "Resize for [platform]"
- Production needs: "None" or "Minimal"

**If ANY variant matches forbidden patterns → REJECT entire RMP**

**REQUIRED patterns:**
- "Rebuilt for [platform]"
- "Hook rewritten for [platform] algorithm"
- "Pacing adjusted for [platform] norms"
- Production needs: Explicit editing/recording/design requirements

---

*Degradation is prevented through structure, not instructions.*
