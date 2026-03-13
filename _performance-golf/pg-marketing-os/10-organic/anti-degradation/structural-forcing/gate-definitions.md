# GATE DEFINITIONS — STRUCTURAL FORCING PROTOCOL
## Hard Blocks That Prevent Premature Execution
## Version 1.0 — March 2026

---

## WHAT GATES ARE

Gates are HARD BLOCKS in the pipeline. They prevent skills from executing until prerequisite conditions are met. Gates are not suggestions — they are structural forcing mechanisms.

**Why Gates Exist:**
- Prevent content creation without strategy
- Ensure data flows correctly between skills
- Force proper sequence
- Prevent the #1 organic marketing failure: posting without planning

---

## GATE REGISTRY

### Foundation Phase Gates (S01-S07)

| Gate ID | Blocks Skill | Required Condition | Validation |
|---------|--------------|-------------------|------------|
| G01 | S02: Platform Strategy | S01 AIF exists | File + Required Fields |
| G02 | S03: Brand Voice | S02 PSF exists | File + Required Fields |
| G03 | S04: Content Architecture | S03 BVF exists | File + Required Fields |
| G04 | S05: Hook Library | S04 CAF exists | File + Required Fields |
| G05 | S06: Virality Scoring | S05 HLF exists | File + Required Fields |
| G06 | S07: Campaign Brief | S06 VSF exists + All prior files | File + Required Fields |

### Production Phase Gates (S08-S14)

| Gate ID | Blocks Skill | Required Condition | Validation |
|---------|--------------|-------------------|------------|
| G07 | S08-S14 (ALL Production) | S07 CBF exists | File + Required Fields |
| G08 | S14: Content Assembly | Arena has run | Arena output file exists |
| G09 | S14: Final Output | Virality Score ≥ 60 | Score validation |

### Distribution Phase Gates (S15-S18)

| Gate ID | Blocks Skill | Required Condition | Validation |
|---------|--------------|-------------------|------------|
| G10 | S15-S18 (ALL Distribution) | S14 output exists | File + Required Fields |

### Analysis Phase Gates (S19-S20)

| Gate ID | Blocks Skill | Required Condition | Validation |
|---------|--------------|-------------------|------------|
| G11 | S20: Learning Capture | S19 Analysis exists | File + Required Fields |

---

## GATE VALIDATION PROTOCOL

### Step 1: File Existence Check
```
CHECK: Does prerequisite file exist?

Path Pattern: skills/[phase]/[skill]/outputs/[campaign-name]-[output-type].yaml

Example: core-message/S01-audience-intelligence/outputs/bellringer-AIF.yaml

Result:
- EXISTS: ✓ → Proceed to Step 2
- NOT EXISTS: ✗ → BLOCK with File Missing message
```

### Step 2: Required Fields Check
```
CHECK: Do all required fields exist in the file?

Required Fields per Output Type:
(See ~system/pipeline-handoff-registry.md for complete list)

Result:
- ALL PRESENT: ✓ → Proceed to Step 3
- MISSING FIELDS: ✗ → BLOCK with Missing Fields message
```

### Step 3: Validation Rules Check
```
CHECK: Do field values pass validation rules?

Example Rules:
- AIF.primary_platforms: Must have ≥ 2 entries
- PSF.format_focus: Must have ≥ 2 formats per platform
- BVF.power_words: Must have ≥ 10 words
- VSF.score ≥ 60 for production

Result:
- ALL PASS: ✓ → GATE OPEN
- ANY FAIL: ✗ → BLOCK with Validation Failure message
```

---

## GATE FAILURE RESPONSES

### Response Template: File Missing
```
╔══════════════════════════════════════════════════════════════════╗
║                    GATE BLOCKED: G[XX]                           ║
║                    Missing Prerequisite File                     ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  You requested: [Skill Name]                                     ║
║                                                                  ║
║  This skill requires: [Prerequisite Output]                      ║
║  Expected path: [File path]                                      ║
║  Status: FILE NOT FOUND                                          ║
║                                                                  ║
║  ─────────────────────────────────────────────────────────────── ║
║                                                                  ║
║  REQUIRED ACTION:                                                ║
║  Execute [Prerequisite Skill] first to generate this file.       ║
║                                                                  ║
║  Run: /skill [prerequisite-skill-name]                          ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

### Response Template: Missing Fields
```
╔══════════════════════════════════════════════════════════════════╗
║                    GATE BLOCKED: G[XX]                           ║
║                    Incomplete Prerequisite File                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  You requested: [Skill Name]                                     ║
║                                                                  ║
║  Prerequisite file exists: [File path]                           ║
║  Status: INCOMPLETE                                              ║
║                                                                  ║
║  Missing fields:                                                 ║
║    ✗ [field_name]                                                ║
║    ✗ [field_name]                                                ║
║    ✗ [field_name]                                                ║
║                                                                  ║
║  ─────────────────────────────────────────────────────────────── ║
║                                                                  ║
║  REQUIRED ACTION:                                                ║
║  Complete the missing fields in [Prerequisite Skill] output.     ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

### Response Template: Validation Failure
```
╔══════════════════════════════════════════════════════════════════╗
║                    GATE BLOCKED: G[XX]                           ║
║                    Validation Failed                             ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  You requested: [Skill Name]                                     ║
║                                                                  ║
║  Prerequisite file: [File path]                                  ║
║  Status: VALIDATION FAILED                                       ║
║                                                                  ║
║  Failures:                                                       ║
║    ✗ [field]: [current value] — Required: [rule]                ║
║    ✗ [field]: [current value] — Required: [rule]                ║
║                                                                  ║
║  ─────────────────────────────────────────────────────────────── ║
║                                                                  ║
║  REQUIRED ACTION:                                                ║
║  Fix validation issues in [Prerequisite Skill] output.           ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## GATE G07: THE MASTER KEY

Gate G07 is special. It guards ALL production skills (S08-S14).

**The Campaign Brief File (CBF) is the key that unlocks content production.**

### G07 Validation Requirements

The CBF must have:
```yaml
required_fields:
  - campaign_name: [Not empty]
  - objective.primary_goal: [Contains measurable metric]
  - objective.success_metrics: [At least 2 defined]
  - audience_summary.target_segment: [Not empty]
  - platform_plan.primary_platform: [Valid platform]
  - platform_plan.formats: [At least 2]
  - platform_plan.posting_cadence: [Defined]
  - voice_summary.tone_for_this_campaign: [Not empty]
  - content_plan.pillar_focus: [At least 1]
  - content_plan.content_pieces: [At least 30 days]
  - hook_strategy.primary_hook_types: [At least 3]
  - virality_targets.minimum_score: [≥ 60]

chain_validation:
  - AIF exists and validates
  - PSF exists and validates
  - BVF exists and validates
  - CAF exists and validates
  - HLF exists and validates
  - VSF exists and validates
```

### Why G07 Is Strict

Without strategy, content fails. This gate ensures:
- Audience is understood (AIF)
- Platform approach is defined (PSF)
- Voice is codified (BVF)
- Content structure exists (CAF)
- Hooks are ready (HLF)
- Quality bar is set (VSF)
- Everything synthesizes (CBF)

**No content is created until ALL of this is done.**

---

## GATE BYPASS PROTOCOL

Gates can ONLY be bypassed with explicit user approval.

### Bypass Request Format
```
User says: "Bypass gate [GXX] for [reason]"

System responds:
"WARNING: Gate bypass requested for [Gate].

This gate exists to ensure [purpose].
Bypassing may result in [consequence].

To confirm bypass, respond: 'Confirm bypass GXX'

Note: Bypass is logged and flagged in quality reports."
```

### Bypass Logging
```yaml
bypass_log:
  gate: [GXX]
  timestamp: [datetime]
  user_reason: [stated reason]
  potential_impact: [what could go wrong]
  session_id: [for tracking]
```

---

## GATE STATUS COMMAND

`/gate-check` returns:
```
╔══════════════════════════════════════════════════════════════════╗
║                    GATE STATUS: [Campaign Name]                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Foundation Phase:                                               ║
║    G01 (S02 requires S01): [✓ OPEN / ✗ BLOCKED]                 ║
║    G02 (S03 requires S02): [✓ OPEN / ✗ BLOCKED]                 ║
║    G03 (S04 requires S03): [✓ OPEN / ✗ BLOCKED]                 ║
║    G04 (S05 requires S04): [✓ OPEN / ✗ BLOCKED]                 ║
║    G05 (S06 requires S05): [✓ OPEN / ✗ BLOCKED]                 ║
║    G06 (S07 requires S06): [✓ OPEN / ✗ BLOCKED]                 ║
║                                                                  ║
║  Production Phase:                                               ║
║    G07 (Production requires CBF): [✓ OPEN / ✗ BLOCKED]          ║
║    G08 (Assembly requires Arena): [✓ OPEN / ✗ BLOCKED]          ║
║    G09 (Final requires Score≥60): [✓ OPEN / ✗ BLOCKED]          ║
║                                                                  ║
║  Distribution Phase:                                             ║
║    G10 (Distribution requires S14): [✓ OPEN / ✗ BLOCKED]        ║
║                                                                  ║
║  Analysis Phase:                                                 ║
║    G11 (S20 requires S19): [✓ OPEN / ✗ BLOCKED]                 ║
║                                                                  ║
║  Current Position: [Skill Name]                                  ║
║  Next Available: [Next Skill]                                    ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

*Gates are not obstacles. They are quality assurance.*
