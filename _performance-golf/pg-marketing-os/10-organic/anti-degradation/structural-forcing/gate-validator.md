# GATE VALIDATOR — FILE EXISTENCE CHECKING PROTOCOL
## Automated Prerequisite Verification System
## Version 1.0 — March 2026

---

## PURPOSE

This file defines the EXACT protocol for validating gates before any skill execution. No skill proceeds without prerequisite verification. This is not advisory — this is structural enforcement.

**Gate Validation Prevents:**
- Content creation without strategy (the #1 organic marketing failure)
- Broken pipelines from missing handoff files
- Quality degradation from skipped steps
- Wasted effort on content that can't be distributed

---

## GATE VALIDATION LOGIC

### Step 1: Identify Required Gate

When ANY skill is invoked, immediately determine which gate applies:

```
SKILL REQUESTED → GATE LOOKUP

Foundation Phase:
  S02: Platform Strategy      → Check G01 (requires S01 AIF)
  S03: Brand Voice            → Check G02 (requires S02 PSF)
  S04: Content Architecture   → Check G03 (requires S03 BVF)
  S05: Hook Library           → Check G04 (requires S04 CAF)
  S06: Virality Scoring       → Check G05 (requires S05 HLF)
  S07: Campaign Brief         → Check G06 (requires S06 VSF + ALL prior)

Production Phase:
  S08: Script Writing         → Check G07 (requires S07 CBF)
  S09: Caption Writing        → Check G07 (requires S07 CBF)
  S10: Carousel Design        → Check G07 (requires S07 CBF)
  S11: Thread Writing         → Check G07 (requires S07 CBF)
  S12: Visual Direction       → Check G07 (requires S07 CBF)
  S13: Arena Generation       → Check G07 (requires S07 CBF)
  S14: Content Assembly       → Check G08 (requires Arena output) + G09 (Virality Score ≥60)

Distribution Phase:
  S15: Publishing Queue       → Check G10 (requires S14 output)
  S16: Engagement Protocol    → Check G10 (requires S14 output)
  S17: Network Amplification  → Check G10 (requires S14 output)
  S18: Repurposing Engine     → Check G10 (requires S14 output)

Analysis Phase:
  S19: Performance Analysis   → No gate (accepts external data)
  S20: Learning Capture       → Check G11 (requires S19 Analysis)
```

---

## FILE EXISTENCE CHECKS

### Path Pattern Convention

All prerequisite files follow this path structure:

```
Base: ./

Foundation Outputs:
core-message/S01-audience-intelligence/outputs/[campaign-name]-AIF.yaml
core-message/S02-platform-strategy/outputs/[campaign-name]-PSF.yaml
core-message/S03-brand-voice/outputs/[campaign-name]-BVF.yaml
core-message/S04-content-architecture/outputs/[campaign-name]-CAF.yaml
core-message/S05-hook-library/outputs/[campaign-name]-HLF.yaml
core-message/S06-virality-scoring/outputs/[campaign-name]-VSF.yaml
core-message/S07-campaign-brief/outputs/[campaign-name]-CBF.yaml

Production Outputs:
skills/production/S13-arena-generation/outputs/[campaign-name]-[content-id]-ARENA.yaml
skills/production/S14-content-assembly/outputs/[campaign-name]-[content-id]-FINAL.yaml

Analysis Outputs:
skills/analysis/S19-performance-analysis/outputs/[campaign-name]-ANALYSIS.yaml
skills/analysis/S20-learning-capture/outputs/[campaign-name]-LEARNINGS.yaml
```

### Validation Check Sequence

For each gate, execute in order:

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    GATE VALIDATION SEQUENCE                              ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  STEP 1: FILE EXISTENCE                                                  ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  Check: Does the file exist at the expected path?                        ║
║                                                                          ║
║  Expected Path: [base]/skills/[phase]/[skill]/outputs/[campaign]-[type]  ║
║                                                                          ║
║  Result:                                                                 ║
║    FILE_EXISTS = true  → Proceed to Step 2                              ║
║    FILE_EXISTS = false → BLOCK: File Missing                            ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  STEP 2: REQUIRED FIELDS                                                 ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  Check: Do all required fields exist in the file?                        ║
║                                                                          ║
║  Reference: ~system/pipeline-handoff-registry.md for field requirements          ║
║                                                                          ║
║  Parse file → Check each required field → List missing                   ║
║                                                                          ║
║  Result:                                                                 ║
║    ALL_FIELDS_PRESENT = true  → Proceed to Step 3                       ║
║    ALL_FIELDS_PRESENT = false → BLOCK: Incomplete File                  ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  STEP 3: VALIDATION RULES                                                ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  Check: Do field values pass validation rules?                           ║
║                                                                          ║
║  Run validation logic per field type (see Validation Rules below)        ║
║                                                                          ║
║  Result:                                                                 ║
║    ALL_RULES_PASS = true  → GATE OPEN: Proceed with skill               ║
║    ALL_RULES_PASS = false → BLOCK: Validation Failed                    ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## VALIDATION RULES BY OUTPUT TYPE

### AIF (Audience Intelligence File)
```yaml
required_fields:
  - campaign_name: [string, not empty]
  - primary_audience:
      - demographics: [object, has age_range, location, gender]
      - psychographics: [object, has values, fears, desires]
      - behaviors: [array, min 3 items]
  - primary_platforms: [array, min 2 items]
  - content_preferences: [array, min 3 items]
  - pain_points: [array, min 5 items]
  - desired_outcomes: [array, min 3 items]

validation_rules:
  - primary_platforms must be valid platform names
  - pain_points must be specific (>20 characters each)
  - demographics.age_range must be numeric range format
```

### PSF (Platform Strategy File)
```yaml
required_fields:
  - campaign_name: [string, not empty]
  - platforms: [array, min 2 items]
  - per_platform:
      - platform_name: [string]
      - posting_frequency: [string, specific cadence]
      - optimal_times: [array, times]
      - format_focus: [array, min 2 formats]
      - algorithm_priorities: [array, min 3 items]
      - growth_tactics: [array, min 3 items]

validation_rules:
  - Each platform in platforms must have a per_platform entry
  - posting_frequency must be specific (not "regularly")
  - optimal_times must include timezone
```

### BVF (Brand Voice File)
```yaml
required_fields:
  - campaign_name: [string, not empty]
  - voice_characteristics: [array, min 5 traits]
  - tone_spectrum: [object, has formal_casual, serious_playful]
  - power_words: [array, min 10 words]
  - banned_words: [array, min 5 words]
  - signature_phrases: [array, min 3 phrases]
  - communication_style: [string, detailed description]

validation_rules:
  - voice_characteristics must be specific adjectives
  - power_words must not overlap with banned_words
  - tone_spectrum values must be numeric (1-10 scale)
```

### CAF (Content Architecture File)
```yaml
required_fields:
  - campaign_name: [string, not empty]
  - content_pillars: [array, min 3 pillars]
  - per_pillar:
      - pillar_name: [string]
      - topics: [array, min 5 topics]
      - formats: [array, min 2 formats]
      - posting_ratio: [percentage]
  - content_series: [array, min 1 series]
  - content_mix: [object, percentages sum to 100]

validation_rules:
  - pillar posting_ratios must sum to 100%
  - content_mix percentages must sum to 100%
  - Each pillar must have unique topics
```

### HLF (Hook Library File)
```yaml
required_fields:
  - campaign_name: [string, not empty]
  - hook_categories: [array, min 5 categories]
  - per_category:
      - category_name: [string]
      - hooks: [array, min 5 hooks per category]
      - use_cases: [array, when to use]
  - hook_formulas: [array, min 10 formulas]
  - proven_hooks: [array, min 5 with performance data]

validation_rules:
  - Each hook must be under 100 characters
  - hook_formulas must include [VARIABLE] placeholders
  - proven_hooks must include source and metric
```

### VSF (Virality Scoring Framework File)
```yaml
required_fields:
  - campaign_name: [string, not empty]
  - scoring_dimensions: [array, all 7 dimensions]
  - dimension_weights: [object, sums to 100]
  - minimum_threshold: [number, typically 60]
  - score_interpretation: [object, ranges defined]

validation_rules:
  - scoring_dimensions must include all 7 core dimensions
  - dimension_weights must sum to 100
  - minimum_threshold must be numeric 0-100
```

### CBF (Campaign Brief File) — THE MASTER KEY
```yaml
required_fields:
  - campaign_name: [string, not empty]
  - objective:
      - primary_goal: [string, contains metric]
      - success_metrics: [array, min 2 metrics]
  - audience_summary:
      - target_segment: [string]
      - key_insight: [string]
  - platform_plan:
      - primary_platform: [valid platform]
      - formats: [array, min 2 formats]
      - posting_cadence: [specific schedule]
  - voice_summary:
      - tone_for_campaign: [string]
      - key_phrases: [array]
  - content_plan:
      - pillar_focus: [array, min 1 pillar]
      - content_pieces: [array, min 30 days of content]
  - hook_strategy:
      - primary_hook_types: [array, min 3 types]
  - virality_targets:
      - minimum_score: [number, ≥60]

chain_validation:
  - Verify AIF exists and validates
  - Verify PSF exists and validates
  - Verify BVF exists and validates
  - Verify CAF exists and validates
  - Verify HLF exists and validates
  - Verify VSF exists and validates

validation_rules:
  - All chain files must exist
  - objective.primary_goal must contain a number
  - content_plan.content_pieces must cover campaign duration
```

---

## AUTOMATED VERIFICATION PROMPTS

### Pre-Execution Check (Always Run First)

Before ANY skill execution, output this verification:

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    GATE VERIFICATION: [SKILL NAME]                       ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Campaign: [campaign-name]                                               ║
║  Requested Skill: [S0X - Skill Name]                                     ║
║  Gate Required: [G0X]                                                    ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  PREREQUISITE CHECK:                                                     ║
║                                                                          ║
║  File: [prerequisite output type]                                        ║
║  Path: [exact file path]                                                 ║
║  Status: [EXISTS / NOT FOUND]                                            ║
║                                                                          ║
║  [If EXISTS:]                                                            ║
║  Fields Check: [COMPLETE / INCOMPLETE]                                   ║
║  Missing Fields: [list or "None"]                                        ║
║                                                                          ║
║  Validation Check: [PASS / FAIL]                                         ║
║  Failures: [list or "None"]                                              ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  GATE STATUS: [OPEN / BLOCKED]                                           ║
║                                                                          ║
║  [If OPEN:]                                                              ║
║  Proceeding with [Skill Name]...                                         ║
║                                                                          ║
║  [If BLOCKED:]                                                           ║
║  See REQUIRED ACTION below.                                              ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### G07 Special Verification (Production Gate)

G07 guards ALL production skills and requires chain validation:

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    G07 CHAIN VERIFICATION                                ║
║                    Production Gate — Full Audit                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Campaign: [campaign-name]                                               ║
║  Requested: Production Skill Access                                      ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  FOUNDATION CHAIN STATUS:                                                ║
║                                                                          ║
║  S01 AIF: [✓ EXISTS & VALID / ✗ MISSING / ⚠ INCOMPLETE]                 ║
║  S02 PSF: [✓ EXISTS & VALID / ✗ MISSING / ⚠ INCOMPLETE]                 ║
║  S03 BVF: [✓ EXISTS & VALID / ✗ MISSING / ⚠ INCOMPLETE]                 ║
║  S04 CAF: [✓ EXISTS & VALID / ✗ MISSING / ⚠ INCOMPLETE]                 ║
║  S05 HLF: [✓ EXISTS & VALID / ✗ MISSING / ⚠ INCOMPLETE]                 ║
║  S06 VSF: [✓ EXISTS & VALID / ✗ MISSING / ⚠ INCOMPLETE]                 ║
║  S07 CBF: [✓ EXISTS & VALID / ✗ MISSING / ⚠ INCOMPLETE]                 ║
║                                                                          ║
║  Chain Status: [COMPLETE / BROKEN at S0X]                                ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  G07 STATUS: [OPEN / BLOCKED]                                            ║
║                                                                          ║
║  [If BLOCKED:]                                                           ║
║  First Missing Step: [S0X - Skill Name]                                  ║
║  Run: Execute S0X to continue pipeline                                   ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## GATE BYPASS PREVENTION

### Hard Enforcement

Gates CANNOT be bypassed automatically. The system will:

1. **Always Check** — No skill execution without gate verification
2. **Always Report** — Display gate status before any action
3. **Always Block** — Refuse to proceed if gate fails

### User-Requested Bypass Protocol

Only the USER can request a bypass. The system must:

```
1. CONFIRM the bypass request is explicit:
   User must say: "Bypass gate [GXX]" or "Skip gate check"

2. EXPLAIN consequences:
   "Bypassing G[XX] means [specific consequence].
   Content created without [prerequisite] often fails because [reason]."

3. REQUIRE double confirmation:
   "To confirm bypass, respond: 'Confirm bypass G[XX]'"

4. LOG the bypass:
   Record in session for quality audit
```

### Bypass Logging Format

```yaml
bypass_record:
  gate: G[XX]
  timestamp: [datetime]
  campaign: [campaign-name]
  skill_requested: [S0X]
  user_reason: [stated reason or "not provided"]
  potential_impact:
    - [consequence 1]
    - [consequence 2]
  session_id: [for tracking]

warning: "Bypass logged. Quality may be compromised."
```

---

## ERROR MESSAGING

### Error Type 1: File Missing

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    GATE BLOCKED: G[XX]                                   ║
║                    Missing Prerequisite File                             ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  You requested: [S0X - Skill Name]                                       ║
║                                                                          ║
║  This skill requires: [Prerequisite Output Type]                         ║
║  Expected path:                                                          ║
║    [full file path]                                                      ║
║                                                                          ║
║  Status: FILE NOT FOUND                                                  ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  REQUIRED ACTION:                                                        ║
║  Execute [S0X-1 - Prerequisite Skill] first to generate this file.       ║
║                                                                          ║
║  Command: Run S[0X-1]: [Prerequisite Skill Name]                         ║
║                                                                          ║
║  Why This Matters:                                                       ║
║  [Brief explanation of what the prerequisite provides]                   ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### Error Type 2: Incomplete File

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    GATE BLOCKED: G[XX]                                   ║
║                    Incomplete Prerequisite File                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  You requested: [S0X - Skill Name]                                       ║
║                                                                          ║
║  Prerequisite file exists:                                               ║
║    [file path]                                                           ║
║                                                                          ║
║  Status: INCOMPLETE — Missing Required Fields                            ║
║                                                                          ║
║  Missing fields:                                                         ║
║    ✗ [field_name_1]                                                      ║
║    ✗ [field_name_2]                                                      ║
║    ✗ [field_name_3]                                                      ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  REQUIRED ACTION:                                                        ║
║  Complete the missing fields in [Prerequisite Skill] output.             ║
║                                                                          ║
║  Option 1: Re-run [Prerequisite Skill] to regenerate complete file       ║
║  Option 2: Manually add missing fields to existing file                  ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### Error Type 3: Validation Failed

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    GATE BLOCKED: G[XX]                                   ║
║                    Validation Failed                                     ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  You requested: [S0X - Skill Name]                                       ║
║                                                                          ║
║  Prerequisite file exists with all fields, but validation failed:        ║
║    [file path]                                                           ║
║                                                                          ║
║  Validation Failures:                                                    ║
║    ✗ [field]: [current value]                                            ║
║      Required: [validation rule]                                         ║
║                                                                          ║
║    ✗ [field]: [current value]                                            ║
║      Required: [validation rule]                                         ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  REQUIRED ACTION:                                                        ║
║  Fix the validation issues in the prerequisite file.                     ║
║                                                                          ║
║  Specific fixes needed:                                                  ║
║    1. [specific fix instruction]                                         ║
║    2. [specific fix instruction]                                         ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## RECOVERY PROTOCOLS

### Recovery: Missing File

```
RECOVERY PROTOCOL: MISSING FILE

1. IDENTIFY the missing prerequisite skill
2. RETRIEVE any existing partial work for that skill
3. EXECUTE the prerequisite skill from start or resume point
4. VERIFY output file is created at correct path
5. VALIDATE output file passes all checks
6. RETRY original skill request
```

### Recovery: Incomplete File

```
RECOVERY PROTOCOL: INCOMPLETE FILE

1. OPEN existing prerequisite file
2. IDENTIFY missing fields from error message
3. DETERMINE if missing data requires:
   - User input (prompt for it)
   - Derived from prior outputs (calculate it)
   - Default values (apply with notice)
4. ADD missing fields to file
5. SAVE updated file
6. RE-VALIDATE file
7. RETRY original skill request
```

### Recovery: Validation Failed

```
RECOVERY PROTOCOL: VALIDATION FAILED

1. OPEN existing prerequisite file
2. IDENTIFY failing fields from error message
3. FOR EACH failing field:
   - Understand the validation rule
   - Determine correct value/format
   - Update field value
4. SAVE updated file
5. RE-VALIDATE file
6. RETRY original skill request
```

---

## GATE STATUS COMMAND

The `/gate-check` command returns full pipeline status:

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    GATE STATUS: [Campaign Name]                          ║
║                    Full Pipeline Audit                                   ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  FOUNDATION PHASE                                                        ║
║  ───────────────                                                         ║
║  G01 → S02 requires S01 AIF: [✓ OPEN / ✗ BLOCKED]                       ║
║  G02 → S03 requires S02 PSF: [✓ OPEN / ✗ BLOCKED]                       ║
║  G03 → S04 requires S03 BVF: [✓ OPEN / ✗ BLOCKED]                       ║
║  G04 → S05 requires S04 CAF: [✓ OPEN / ✗ BLOCKED]                       ║
║  G05 → S06 requires S05 HLF: [✓ OPEN / ✗ BLOCKED]                       ║
║  G06 → S07 requires S06 VSF: [✓ OPEN / ✗ BLOCKED]                       ║
║                                                                          ║
║  PRODUCTION PHASE                                                        ║
║  ────────────────                                                        ║
║  G07 → S08-S14 requires CBF: [✓ OPEN / ✗ BLOCKED]                       ║
║  G08 → S14 Assembly requires Arena: [✓ OPEN / ✗ BLOCKED]                ║
║  G09 → S14 Final requires Score≥60: [✓ OPEN / ✗ BLOCKED]                ║
║                                                                          ║
║  DISTRIBUTION PHASE                                                      ║
║  ──────────────────                                                      ║
║  G10 → S15-S18 requires S14 output: [✓ OPEN / ✗ BLOCKED]                ║
║                                                                          ║
║  ANALYSIS PHASE                                                          ║
║  ──────────────                                                          ║
║  G11 → S20 requires S19 Analysis: [✓ OPEN / ✗ BLOCKED]                  ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  CURRENT POSITION: [Last completed skill or "No skills completed"]       ║
║  NEXT AVAILABLE: [Next skill with open gate or "Complete S01 first"]     ║
║  RECOMMENDED: [Specific next action]                                     ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

*Gates are not bureaucracy. They are quality infrastructure. Trust the system.*
