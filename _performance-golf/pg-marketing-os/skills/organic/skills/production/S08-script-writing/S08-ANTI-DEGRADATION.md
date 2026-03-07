# S08-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-05
**Purpose:** STRUCTURAL enforcement to prevent script writing skill process breakdown
**Authority:** This document has EQUAL authority to ORGANIC-ENGINE-CLAUDE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: S08-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Write cross-posted scripts instead of platform-native scripts. Skip timing annotations or visual direction notes. Bypass Arena or accept virality scores below 60.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates cross-posted scripts instead of platform-native scripts
- AI skips hook strategy and writes generic openings
- AI forgets timing annotations making scripts unusable for production
- AI skips visual direction notes
- AI bypasses Arena and outputs "final" scripts
- AI writes scripts without loading specimens or teachings
- AI accepts virality scores below threshold

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer 0 Complete (Input Gate)

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/S08-script-writing/checkpoints/LAYER_0_COMPLETE.yaml
```

**Checkpoint File Format:**
```yaml
# LAYER_0_COMPLETE.yaml
skill: "S08-script-writing"
status: PASS
timestamp: "[ISO 8601]"

loaded_files:
  cbf: "[path]"
  teachings:
    - "[path to teaching 1]"
    - "[path to teaching 2]"
  specimens:
    - "[path to specimen 1]"
    - "[path to specimen 2]"

validation_passed:
  - cbf_exists: true
  - platform_specified: true
  - script_requests_defined: true
  - teachings_loaded: true
  - specimens_loaded: true
```

### Arena Complete (Production Gate)

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/S08-script-writing/checkpoints/ARENA_COMPLETE.yaml
```

**Checkpoint File Format:**
```yaml
# ARENA_COMPLETE.yaml
skill: "S08-script-writing"
status: PASS
timestamp: "[ISO 8601]"

arena_execution:
  rounds_completed: 3
  personas_competed: 7
  synthesis_complete: true
  human_selection_captured: true

scripts_processed:
  - script_id: "[script-1-id]"
    arena_file: "[path]"
    selected_variant: "[persona name or hybrid]"

human_approval:
  approved_by: "[Name]"
  approval_date: "[Date]"
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

**Scripts cannot be marked COMPLETE unless:**

| Element | Minimum | Actual | Verified |
|---------|---------|--------|----------|
| Scripts produced | 3 | ___ | ☐ |
| Hook timing annotation | 0-3 seconds | ___ | ☐ |
| Visual direction sections | All sections | ___ | ☐ |
| Arena rounds completed | 3 | ___ | ☐ |
| Personas competed | 7 | ___ | ☐ |
| Virality score | 60 | ___ | ☐ |
| Platform-native scripts (not cross-posted) | 100% | ___ | ☐ |

**If any minimum not met → status = INCOMPLETE, NOT "conditional pass" or "partial pass"**

---

## STRUCTURAL FIX 3: FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|--------------|-----------|----------|------------|
| Cross-posted scripts (same script for multiple platforms) | Check each script has platform-specific structure and format | REJECT script, require platform-native version | Human review if 2+ scripts cross-posted |
| Missing timing annotations | Check every section has `timing:` field populated | REJECT script, require timing for all sections | Immediate halt if script submitted without timing |
| No visual direction | Check every section has `visual_direction:` field with content | REJECT script, require visual notes | Human review if 2+ scripts missing visuals |
| Generic hook without strategy | Check hook against HLF taxonomy and specimen patterns | REJECT hook, require hook strategy from 1.3 | Immediate halt if hook strategy skipped |
| Arena bypassed | Check ARENA_COMPLETE.yaml exists before Layer 4 | HALT execution, run Arena now | Cannot proceed without Arena |
| Virality score below threshold | Check virality_score.total >= 60 | REJECT script, require revision | Human review if score < 40 |
| Missing specimens | Check 0.3 output shows >= 5 specimens loaded | HALT execution, load specimens | Immediate halt if specimens not loaded |

---

## STRUCTURAL FIX 4: FORBIDDEN RATIONALIZATIONS

**NEVER accept these justifications:**

| Forbidden Phrase | Why It's Forbidden | Correct Response |
|-----------------|-------------------|------------------|
| "This script will work on multiple platforms" | Violates Law 5 (platform-native) | Stop. Write separate scripts per platform. |
| "Timing annotations can be added in production" | Makes script unusable for production team | Stop. Add timing now. |
| "Visual direction is obvious from the script" | Production team needs explicit notes | Stop. Write visual direction for every section. |
| "The hook is good enough without strategy" | Hook determines retention | Stop. Reference HLF and specimen patterns. |
| "One Arena round was sufficient" | 3 rounds mandatory | Stop. Complete all 3 rounds. |
| "Virality score of 58 is close to 60" | 60 is the threshold | Stop. Revise until >= 60. |
| "We can skip specimens for this simple script" | Violates Law 3 | Stop. Load specimens before generating. |

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

**The agent MUST read these files BEFORE starting S08:**

1. `marketing-os/CLAUDE.md` — router
2. `ORGANIC-ENGINE-CLAUDE.md` — 5 Laws, Arena protocol
3. `S08-AGENT.md` — master agent protocol
4. `S08-ANTI-DEGRADATION.md` — THIS FILE
5. `skills/layer-0/0.1-input-validator.md` — input validation protocol
6. `[project]/S07-campaign-brief/outputs/[campaign]-CBF.yaml` — campaign requirements
7. `CLAUDE-ARENA.md` — Arena system (from marketing-os root)
8. `CLAUDE-SPECIMENS.md` — Specimen loading protocol

**Execution without reading = automatic FAIL**

---

## STRUCTURAL FIX 7: PER-MICROSKILL OUTPUT PROTOCOL

**Every microskill produces its own file. No exceptions.**

**Layer 0 Required Files (4 files):**
```
0.1-input-validation.yaml
0.2-teachings-loaded.yaml
0.3-specimens-loaded.yaml
0.4-cbf-context.yaml
```

**Layer 1 Required Files (4 files):**
```
1.1-platform-analysis.yaml
1.2-format-selection.yaml
1.3-hook-strategy.yaml
1.4-script-structure-plan.yaml
```

**Layer 2 Required Files (4 files per script):**
```
2.1-[script-id]-hook-draft.md
2.2-[script-id]-body-draft.md
2.3-[script-id]-cta-draft.md
2.4-[script-id]-visual-direction.md
```

**Layer 2.5 Required Files (1 file per script):**
```
2.5-[script-id]-arena-results.md
```

**Layer 4 Required Files (2 files):**
```
4.1-[campaign]-scripts-assembled.yaml
4.2-execution-log.md
```

**If a microskill is marked "complete" but its output file doesn't exist → it didn't happen.**

---

## STRUCTURAL FIX 8: PROJECT INFRASTRUCTURE REQUIREMENTS

**Before ANY S08 execution, these MUST exist:**

```
[project]/S08-script-writing/
├── PROJECT-STATE.md (tracks current phase, blockers, decisions)
├── PROGRESS-LOG.md (timestamped log of all actions)
├── checkpoints/ (LAYER_0_COMPLETE.yaml, ARENA_COMPLETE.yaml)
├── layer-0/ (microskill outputs)
├── layer-1/ (microskill outputs)
├── layer-2/ (draft scripts)
├── arena/ (arena results per script)
└── outputs/ (final scripts)
```

**Missing infrastructure = execution cannot proceed**

---

## STRUCTURAL FIX 9: STALE ARTIFACT CLEANUP

**Before starting Layer 0, DELETE these if they exist from previous failed attempts:**

```
[project]/S08-script-writing/checkpoints/LAYER_0_COMPLETE.yaml
[project]/S08-script-writing/checkpoints/LAYER_1_COMPLETE.yaml
[project]/S08-script-writing/checkpoints/LAYER_2_COMPLETE.yaml
[project]/S08-script-writing/checkpoints/ARENA_COMPLETE.yaml
[project]/S08-script-writing/outputs/[any-script-files]
```

**Stale checkpoints create false progression signals.**

---

## Per-Microskill Output Requirements

| Microskill | Output File | Minimum Content | Verified |
|------------|-------------|-----------------|----------|
| 0.1 | input-validation.yaml | Platform + script requests validated | ☐ |
| 0.2 | teachings-loaded.yaml | 4+ teachings loaded | ☐ |
| 0.3 | specimens-loaded.yaml | 5+ specimens loaded | ☐ |
| 0.4 | cbf-context.yaml | CBF fields extracted | ☐ |
| 1.1 | platform-analysis.yaml | Platform specs + requirements | ☐ |
| 1.2 | format-selection.yaml | Format per script (Reel/TikTok/etc) | ☐ |
| 1.3 | hook-strategy.yaml | Hook types + selection from HLF | ☐ |
| 1.4 | script-structure-plan.yaml | Structure per script (hook/body/cta) | ☐ |
| 2.1 | [script-id]-hook-draft.md | Hook with timing + visual notes | ☐ |
| 2.2 | [script-id]-body-draft.md | Body sections with timing | ☐ |
| 2.3 | [script-id]-cta-draft.md | CTA with visual direction | ☐ |
| 2.4 | [script-id]-visual-direction.md | Visual notes per section | ☐ |
| 2.5 | [script-id]-arena-results.md | 3 rounds, 7 personas, synthesis | ☐ |
| 4.1 | scripts-assembled.yaml | All scripts in final format | ☐ |
| 4.2 | execution-log.md | Timestamped decisions | ☐ |

---

## PLATFORM-NATIVE ENFORCEMENT

**Each platform requires unique script structure. NEVER cross-post.**

| Platform | Hook Window | Max Length | Visual Style | CTA Type |
|----------|-------------|------------|--------------|----------|
| TikTok | 0.5-1s | 15-60s | Casual, trend-aware | Brief, in-video |
| Instagram Reels | 1-3s | 15-90s | Polished, caption-integrated | Save/share triggers |
| YouTube Shorts | 1-3s | 15-60s | Title/thumbnail synergy | Subscribe CTA |
| YouTube Long-form | Cold open + intro | 8+ min | Chapter structure | Multiple CTAs |

**If script doesn't match platform requirements → REJECT**

---

## ARENA REQUIREMENTS (NON-NEGOTIABLE)

**Every script MUST:**
- Be evaluated by all 7 organic personas (Volume Machine, Value Architect, Virality Engineer, Community Builder, Brand Purist, Algorithm Hacker, Storyteller)
- Complete 3 full rounds
- Generate synthesis pulling best elements from multiple personas
- Capture human selection of final variant

**Arena file MUST show:**
```yaml
rounds: 3
personas: 7
synthesis_variants: [list of hybrid options]
human_selection: "[chosen variant]"
```

**Missing any element = Arena incomplete = Layer 4 cannot proceed**

---

## VIRALITY SCORING REQUIREMENTS

**Every final script MUST have:**
```yaml
virality_score:
  ea: [1-10] # Emotional Activation
  sc: [1-10] # Social Currency
  pi: [1-10] # Pattern Interrupt
  pf: [1-10] # Platform Fit
  sh: [1-10] # Shareability
  total: [calculated] # Must be >= 60
  rationale: "[explanation of scores]"
```

**If total < 60 → script requires revision**
**If total < 40 → script is blocked from production**

---

*Degradation is prevented through structure, not instructions.*
