# S14-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-04
**Purpose:** STRUCTURAL enforcement to prevent content assembly skill process breakdown
**Authority:** This document has EQUAL authority to ORGANIC-ENGINE-CLAUDE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: S14-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Assemble content using pre-Arena drafts instead of Arena-selected versions. Accept virality scores below threshold or treat them as approximate. Skip voice consistency check or anti-slop check before final assembly.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI assembles content using pre-Arena drafts instead of Arena-selected versions (Skill 19 failure pattern)
- AI approves content below virality threshold
- AI skips voice consistency check
- AI bypasses platform compliance verification
- AI creates master package without creating per-platform files
- AI proceeds without verifying all production inputs exist
- AI skips anti-slop check

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Arena Verification Checkpoint (Gate G08)

**Layer 1 CANNOT proceed unless this file exists:**
```
[project]/S13-arena-generation/checkpoints/ARENA_COMPLETE.yaml
```

**Checkpoint File Required Fields:**
```yaml
# ARENA_COMPLETE.yaml
skill: "S13-arena-generation"
status: COMPLETE
timestamp: "[ISO 8601]"

arena_results:
  content_id: "[ID]"
  arena_selection_verified: true  # CRITICAL FLAG
  selected_hybrid: "[Hybrid identifier]"
  hybrid_path: "[Path to Arena-selected content]"

human_selection:
  selected_by: "[Name]"
  selection_date: "[Date]"
  selection_notes: "[Any guidance]"
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/S14-content-assembly/checkpoints/LAYER_1_COMPLETE.yaml
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

**Content Package cannot be marked COMPLETE unless:**

| Element | Minimum | Actual | Verified |
|---------|---------|--------|----------|
| Arena checkpoint exists | Yes | ___ | ☐ |
| arena_selection_verified flag | true | ___ | ☐ |
| Virality Score | >= CBF minimum | ___ | ☐ |
| Voice check passed | Yes | ___ | ☐ |
| Platform compliance verified | Yes | ___ | ☐ |
| Anti-slop check passed | Yes | ___ | ☐ |
| Per-platform files created | All platforms | ___ | ☐ |
| Production inputs loaded | All required | ___ | ☐ |

**If any minimum not met → status = INCOMPLETE, NOT "conditional pass" or "partial pass"**

---

## STRUCTURAL FIX 3: FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|--------------|-----------|----------|------------|
| Pre-Arena draft used | Check arena_selection_verified flag + compare content against Arena checkpoint | HALT immediately — reload Arena-selected content | Human review required — this is CRITICAL failure |
| Virality score below threshold | Compare score to CBF minimum_virality_score | REJECT assembly if below 60, FLAG if 60-70, PROCEED if 70+ | Human review if 2+ pieces below threshold |
| Voice consistency violation | Check for banned words, tone mismatches against BVF | REJECT piece, require revision | Human review if 2+ violations |
| Platform compliance failure | Check length, format, specs against PSF | REJECT piece, require reformatting | Immediate halt if multiple violations |
| Missing production input | Check all required S08-S13 outputs exist | HALT assembly until input available | Human review if input missing after S13 complete |
| Anti-slop density too high | Calculate slop percentage, threshold 5% | REJECT if >5%, FLAG if 3-5%, PROCEED if <3% | Human review if multiple pieces flagged |
| Per-platform files missing | Count files created vs platforms required | REJECT assembly as incomplete | Immediate halt if Layer 4 claims complete without files |

---

## STRUCTURAL FIX 4: FORBIDDEN RATIONALIZATIONS

**NEVER accept these justifications:**

| Forbidden Phrase | Why It's Forbidden | Correct Response |
|-----------------|-------------------|------------------|
| "The pre-Arena version is close enough" | Arena exists to improve content | Stop. Use Arena-selected version ONLY. |
| "Virality score is approximate" | Numbers are exact, thresholds are hard | Stop. Score precisely. Flag or reject if below threshold. |
| "Voice check can happen post-publish" | BVF violations damage brand | Stop. Verify voice alignment now. |
| "Platform specs are flexible" | Algorithms penalize non-compliant content | Stop. Meet platform specs exactly. |
| "We can create platform files later" | Assembly means COMPLETE and READY | Stop. Create all per-platform files now. |

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

**Gate G08 (Arena Verification):** PASS only if arena_selection_verified = true AND Arena checkpoint exists
**Gate G09 (Virality Threshold):** PASS only if score >= CBF minimum AND all dimensions scored

---

## STRUCTURAL FIX 6: MANDATORY READ BEFORE EXECUTION

**The agent MUST read these files BEFORE starting S14:**

1. `S14-CONTENT-ASSEMBLY-AGENT.md` — master agent protocol
2. `S14-ANTI-DEGRADATION.md` — THIS FILE
3. `skills/layer-0/0.1-input-validator.md` — input validation protocol
4. `[project]/S07-campaign-brief/outputs/[campaign]-CBF.yaml` — virality thresholds, objectives
5. `[project]/S13-arena-generation/checkpoints/ARENA_COMPLETE.yaml` — Arena verification
6. `[project]/S03-brand-voice/outputs/[campaign]-BVF.yaml` — voice constraints

**Execution without reading = automatic FAIL**

---

## STRUCTURAL FIX 7: PER-MICROSKILL OUTPUT PROTOCOL

**Every microskill produces its own file. No exceptions.**

**Layer 0 Required Files (4 files):**
```
0.1-input-validation.yaml
0.2-arena-results.yaml
0.3-production-outputs.yaml
0.4-cbf-context.yaml
```

**Layer 1 Required Files (6 files):**
```
1.1-arena-verification.yaml
1.2-content-inventory.yaml
1.3-virality-scores.yaml
1.4-platform-compliance.yaml
1.5-voice-consistency.yaml
1.6-cross-reference-validation.yaml
```

**Layer 4 Required Files (3+ files):**
```
4.1-content-package.yaml (master assembly)
4.2-[platform]-[content-id].md (one per platform per content piece)
4.3-execution-log.md (timestamped decisions)
```

**If a microskill is marked "complete" but its output file doesn't exist → it didn't happen.**

---

## STRUCTURAL FIX 8: PROJECT INFRASTRUCTURE REQUIREMENTS

**Before ANY S14 execution, these MUST exist:**

```
[project]/S14-content-assembly/
├── PROJECT-STATE.md (tracks current phase, blockers, decisions)
├── PROGRESS-LOG.md (timestamped log of all actions)
├── checkpoints/ (LAYER_0_COMPLETE.yaml, LAYER_1_COMPLETE.yaml)
└── outputs/ (final content package + per-platform files)
```

**Missing infrastructure = execution cannot proceed**

---

## STRUCTURAL FIX 9: STALE ARTIFACT CLEANUP

**Before starting Layer 0, DELETE these if they exist from previous failed attempts:**

```
[project]/S14-content-assembly/outputs/[campaign]-content-package.yaml
[project]/S14-content-assembly/outputs/[platform]-[content-id].md (all platform files)
[project]/S14-content-assembly/checkpoints/LAYER_0_COMPLETE.yaml
[project]/S14-content-assembly/checkpoints/LAYER_1_COMPLETE.yaml
```

**Stale checkpoints create false progression signals.**

---

## Per-Microskill Output Requirements

| Microskill | Output File | Minimum Content | Verified |
|------------|-------------|-----------------|----------|
| 0.1 | input-validation.yaml | All required inputs present, paths verified | ☐ |
| 0.2 | arena-results.yaml | Arena checkpoint loaded, arena_selection_verified flag confirmed | ☐ |
| 0.3 | production-outputs.yaml | All S08-S13 outputs inventoried and loaded | ☐ |
| 0.4 | cbf-context.yaml | CBF loaded, virality thresholds extracted | ☐ |
| 1.1 | arena-verification.yaml | Arena-selected content verified, NO pre-Arena drafts | ☐ |
| 1.2 | content-inventory.yaml | All content pieces listed with metadata | ☐ |
| 1.3 | virality-scores.yaml | Each piece scored, thresholds compared | ☐ |
| 1.4 | platform-compliance.yaml | Platform specs verified per piece | ☐ |
| 1.5 | voice-consistency.yaml | BVF alignment checked, violations flagged | ☐ |
| 1.6 | cross-reference-validation.yaml | CBF requirements verified, gaps flagged | ☐ |
| 4.1 | content-package.yaml | Master assembly with all verified content | ☐ |
| 4.2 | [platform]-[content-id].md | One file per platform per content piece | ☐ |
| 4.3 | execution-log.md | Timestamped decisions and rationale | ☐ |

---

## CRITICAL: Arena Selection Verification Protocol

**This is the HIGHEST PRIORITY check in S14.** The Skill 19 failure (entire lead section missing from assembled draft) was caused by consuming pre-Arena content.

### Detection Steps (1.1 Microskill)

1. Load `ARENA_COMPLETE.yaml` checkpoint from S13
2. Verify `arena_selection_verified: true` flag exists
3. Extract `selected_hybrid` identifier and `hybrid_path`
4. Load Arena-selected content from hybrid_path
5. Load content from production outputs being assembled
6. Compare line-by-line: Are they identical?

### Response Protocol

**IF content matches Arena selection:**
- Mark arena_verification.yaml as PASS
- Proceed to 1.2

**IF content does NOT match (pre-Arena draft detected):**
- Mark arena_verification.yaml as FAIL
- Log mismatch details (which content piece, what's different)
- HALT immediately — do not proceed to 1.2
- Display error message to human
- Require reload of Arena-selected content before proceeding

**This check is BLOCKING. It cannot be bypassed.**

---

## CRITICAL: Virality Score Enforcement Protocol

**Virality threshold comes from CBF.** Different campaigns may have different minimums.

### Scoring Steps (1.3 Microskill)

1. Load `minimum_virality_score` from CBF
2. Score each content piece using VSF (8 dimensions, 0-10 each)
3. Calculate overall score: weighted average of dimensions
4. Compare to threshold

### Threshold Response

**Score >= 70:**
- Mark as STRONG
- Proceed without flags

**Score 60-69:**
- Mark as ACCEPTABLE
- Proceed with minor flag (could be improved)

**Score 40-59:**
- Mark as REVISION_REQUIRED
- HALT assembly for this piece
- Flag for human review
- Require revision before proceeding

**Score < 40:**
- Mark as BLOCKED
- REJECT from assembly entirely
- Require major revision or replacement

**No invented statuses. These four categories are exhaustive.**

---

## Anti-Slop Check Protocol

**Slop density = percentage of generic AI phrases in content.**

### Banned Slop Phrases (Auto-detection)
- "In today's digital landscape"
- "Game-changer"
- "Revolutionary"
- "Unlock your potential"
- "Take your [X] to the next level"
- "Are you ready to"
- "It's time to"
- "The truth is"
- "Here's the thing"
- "Let's dive in"

### Density Calculation
```
Slop Density = (Count of Slop Phrases / Total Sentence Count) × 100
```

### Threshold Response

**Density < 2%:**
- PASS — acceptable

**Density 2-5%:**
- FLAG — revision recommended

**Density > 5%:**
- REJECT — rewrite required

---

*Degradation is prevented through structure, not instructions.*
