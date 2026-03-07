# S05-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-04
**Purpose:** STRUCTURAL enforcement to prevent hook library skill process breakdown
**Authority:** This document has EQUAL authority to ORGANIC-ENGINE-CLAUDE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: S05-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Generate generic hooks not calibrated to the specific campaign. Use approximate hook counts instead of exact minimums (10 Tier 1, 20 Tier 2). Skip voice calibration against BVF for every hook.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates generic hooks not calibrated to specific campaign
- AI skips platform-specific optimization
- AI produces hooks that violate BVF voice constraints
- AI creates hooks for pillars that don't exist in CAF
- AI invents hook counts ("~30 hooks") instead of exact minimums (≥10, ≥20)
- AI bypasses Concept Checkpoint and generates hooks without strategic approval

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Concept Checkpoint (Gate 1A)

**Phase B (Hook Generation) CANNOT execute unless this file exists:**
```
[project]/S05-hook-library/checkpoints/CONCEPT_APPROVED.yaml
```

**Checkpoint File Format:**
```yaml
# CONCEPT_APPROVED.yaml
skill: "S05-hook-library"
status: APPROVED
timestamp: "[ISO 8601]"

approved_strategy:
  hook_categories_to_prioritize: []
  platform_optimization_approach: ""
  pillar_hook_distribution: {}

human_approval:
  approved_by: "[Name]"
  approval_date: "[Date]"
  notes: "[Any guidance]"
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/S05-hook-library/checkpoints/LAYER_1_COMPLETE.yaml
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

**HLF cannot be marked COMPLETE unless:**

| Element | Minimum | Actual | Verified |
|---------|---------|--------|----------|
| Hook categories defined | 7 | ___ | ☐ |
| Platform optimization (primary) | 1 complete | ___ | ☐ |
| Pillar hooks (each pillar) | ≥5 hooks | ___ | ☐ |
| Tier 1 proven hooks | 10 | ___ | ☐ |
| Tier 2 high-confidence hooks | 20 | ___ | ☐ |
| Anti-hook patterns | 5 | ___ | ☐ |
| BVF voice check | All pass | ___ | ☐ |

**If any minimum not met → status = INCOMPLETE, NOT "conditional pass" or "partial pass"**

**CRITICAL:** Numbers are EXACT. 10 means 10. Not "~10" or "8-12". Exactly 10.

---

## STRUCTURAL FIX 3: FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|--------------|-----------|----------|------------|
| Generic hooks (not campaign-specific) | Check hooks reference audience language from AIF or pillar themes from CAF | REJECT hooks, require campaign-specific regeneration | Human review if 5+ hooks generic |
| Platform optimization skipped | Verify platform_hooks section has primary platform with ≥4 subsections populated | REJECT HLF, require platform optimization | Immediate halt if platform section empty |
| Hooks violate BVF voice | Cross-check each hook against BVF anti_voice patterns | REJECT violating hooks, regenerate | Human review if 3+ hooks violate voice |
| Hooks for non-existent pillars | Verify every pillar in pillar_hooks exists in CAF | REJECT invalid pillar hooks, require correction | Immediate halt if pillar mismatch |
| Hook count below minimum | Count tier_1 (≥10), tier_2 (≥20), anti-patterns (≥5) | REJECT HLF, require exact counts | Human review if counts wrong after 2 attempts |
| No testing plan | Check testing_plan section has methodology + current_tests structure | REJECT HLF, require testing plan | Immediate halt if testing section empty |

---

## STRUCTURAL FIX 4: FORBIDDEN RATIONALIZATIONS

**NEVER accept these justifications:**

| Forbidden Phrase | Why It's Forbidden | Correct Response |
|-----------------|-------------------|------------------|
| "We can refine hooks in production" | Library precedes production | Stop. Generate complete library now. |
| "These are directional hooks" | Hooks must be production-ready | Stop. Generate specific, usable hooks. |
| "Voice calibration is subjective" | BVF provides objective criteria | Stop. Check every hook against BVF. |
| "Approximately 10-15 tier 1 hooks" | Numbers are exact | Stop. Generate exactly 10 (or more). |
| "Platform optimization is similar across platforms" | Each platform has distinct patterns | Stop. Optimize for specific platform. |

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

**The agent MUST read these files BEFORE starting S05:**

1. `S05-AGENT.md` — master agent protocol
2. `S05-ANTI-DEGRADATION.md` — THIS FILE
3. `skills/layer-0/0.1-input-validator.md` — input validation protocol
4. `[project]/S01-audience-intelligence/outputs/[campaign]-AIF.yaml` — audience language
5. `[project]/S02-platform-strategy/outputs/[campaign]-PSF.yaml` — platform context
6. `[project]/S03-brand-voice/outputs/[campaign]-BVF.yaml` — voice constraints
7. `[project]/S04-content-architecture/outputs/[campaign]-CAF.yaml` — pillar structure

**Execution without reading = automatic FAIL**

---

## STRUCTURAL FIX 7: PER-MICROSKILL OUTPUT PROTOCOL

**Every microskill produces its own file. No exceptions.**

**Layer 1 Required Files (6 files):**
```
1.1-taxonomy-application.yaml
1.2-template-library.yaml
1.3-platform-optimization.yaml
1.4-pillar-hooks.yaml
1.5-voice-calibration.yaml
1.6-testing-plan.yaml
```

**If a microskill is marked "complete" but its output file doesn't exist → it didn't happen.**

---

## STRUCTURAL FIX 8: PROJECT INFRASTRUCTURE REQUIREMENTS

**Before ANY S05 execution, these MUST exist:**

```
[project]/S05-hook-library/
├── PROJECT-STATE.md (tracks current phase, blockers, decisions)
├── PROGRESS-LOG.md (timestamped log of all actions)
├── checkpoints/ (CONCEPT_APPROVED.yaml, LAYER_1_COMPLETE.yaml)
└── outputs/ (final HLF.yaml destination)
```

**Missing infrastructure = execution cannot proceed**

---

## STRUCTURAL FIX 9: STALE ARTIFACT CLEANUP

**Before starting Layer 1, DELETE these if they exist from previous failed attempts:**

```
[project]/S05-hook-library/outputs/[campaign]-HLF.yaml
[project]/S05-hook-library/checkpoints/CONCEPT_APPROVED.yaml
[project]/S05-hook-library/checkpoints/LAYER_1_COMPLETE.yaml
```

**Stale checkpoints create false progression signals.**

---

## Per-Microskill Output Requirements

| Microskill | Output File | Minimum Content | Verified |
|------------|-------------|-----------------|----------|
| 1.1 | taxonomy-application.yaml | 7 categories with mechanisms | ☐ |
| 1.2 | template-library.yaml | ≥3 templates per category (21 total) | ☐ |
| 1.3 | platform-optimization.yaml | Primary platform fully defined | ☐ |
| 1.4 | pillar-hooks.yaml | ≥5 hooks per pillar | ☐ |
| 1.5 | voice-calibration.yaml | All hooks pass BVF check | ☐ |
| 1.6 | testing-plan.yaml | Methodology + structure defined | ☐ |
| 4.1 | [campaign]-HLF.yaml | Complete HLF with all sections | ☐ |
| 4.2 | execution-log.md | Hook decisions and rationale | ☐ |

---

## STRUCTURAL FIX 10: VOICE VIOLATION DETECTOR

**Before HLF marked complete, run this check:**

```python
def detect_voice_violations(hooks, bvf):
    violations = []

    anti_voice = bvf.get('anti_voice', [])

    for hook in hooks:
        for anti_pattern in anti_voice:
            if anti_pattern.lower() in hook.lower():
                violations.append({
                    'hook': hook,
                    'violation': anti_pattern,
                    'severity': 'HIGH'
                })

    return violations

# If violations found → REJECT hooks, regenerate
```

---

*Degradation is prevented through structure, not instructions.*
