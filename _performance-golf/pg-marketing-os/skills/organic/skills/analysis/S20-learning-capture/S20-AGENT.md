# S20 Learning Capture — Agent Specification v1.0

## Model Assignment Table

| Layer | Model | Rationale |
|-------|-------|-----------|
| Layer 0 | `claude-haiku-4` | Input validation, file loading — fast, cost-effective |
| Layer 1 | `claude-opus-4` | Learning categorization, teaching updates, prediction calibration — requires judgment for system-level intelligence updates |
| Layer 4 | `claude-sonnet-4` | Output packaging, manifest assembly — structured output, no creativity needed |

**CRITICAL:** Positional reinforcement at every layer entry. Read model assignment before proceeding.

---

## Purpose
Transform S19 performance insights into system-level intelligence updates. Update teaching files, specimen libraries, prediction models, and gate thresholds. This is the meta-learning layer that makes the organic marketing system smarter over time.

**NOT Arena-based** — this is analysis and system maintenance, not generative work.

---

## Identity Boundaries

### S20 IS:
- Learning categorization (teaching_update, specimen_addition, skill_refinement, gate_adjustment)
- Teaching file updates (YAML edits with evidence)
- Specimen promotion (high-performing content → specimen library)
- Prediction model calibration (virality scoring adjustments)
- Gate threshold adjustment (pass/fail threshold refinement)
- Propagation verification (ensuring updates actually written to files)
- Meta-learning accumulation (system gets smarter with each campaign)

### S20 IS NOT:
- Performance analysis (that's S19)
- Content creation (that's S01-S15)
- Campaign strategy (that's S00-S03)
- Individual content evaluation (that's S06/S13)
- Immediate tactical adjustments (this is strategic learning)

---

## Layer Map

### Layer 0: Validation & Loading (haiku)
- **0.1-input-validator.md** — Validate S19 PAR exists, learning flags present, minimum evidence thresholds met
- **0.2-teaching-loader.md** — Load current teaching YAML files that may need updates
- **0.3-upstream-loader.md** — Load S19 PAR, learning flags, current system baselines

### Layer 1: Learning Intelligence (opus)
- **1.1-learning-categorization.md** — Categorize each S19 learning flag into types, assign confidence and impact
- **1.2-teaching-update-generation.md** — Draft specific YAML changes to teaching files (require minimum 3 data points)
- **1.3-specimen-promotion.md** — Identify high-performing content worth promoting to specimen library
- **1.4-prediction-calibration.md** — Analyze if virality scoring thresholds need recalibration
- **1.5-gate-threshold-review.md** — Review if current gate pass thresholds are still appropriate
- **1.6-propagation-verification.md** — VERIFY that all approved updates were actually written to target files

### Layer 4: Assembly & Manifest (sonnet)
- **4.1-learning-log-assembler.md** — Assemble learning log entry with all categorized learnings, updates made, propagation status
- **4.2-system-update-manifest.md** — List all files updated/created, include before/after for each change
- **4.3-execution-log.md** — Timestamped log of all decisions, evidence reviewed, updates applied

---

## Output Schema

**Primary Output:** `learning_log_entry` (JSON + markdown)

```json
{
  "learning_id": "LL_[campaign_id]_[date]",
  "date": "ISO8601",
  "source_campaign": "[campaign_id]",
  "source_par": "path/to/PAR.md",
  "learning_count": 8,
  "learnings": [
    {
      "learning_type": "teaching_update|specimen_addition|skill_refinement|gate_adjustment",
      "learning_content": "detailed description",
      "evidence": ["data point 1", "data point 2", "data point 3"],
      "confidence": "high|medium|low",
      "impact_assessment": "high|medium|low",
      "action_required": "specific action",
      "action_taken": "what was done",
      "propagation_status": "COMPLETE|PENDING|FAILED",
      "target_files": ["file1", "file2"]
    }
  ],
  "teaching_files_updated": 3,
  "specimens_added": 2,
  "gates_adjusted": 1,
  "propagation_complete": true
}
```

---

## Gate

**GATE_S20: Learning Propagation Complete**

All learning flags from S19 must be:
1. **Categorized** with confidence/impact
2. **Actioned** (updates drafted/applied or consciously deferred with reason)
3. **Propagated** (all file updates verified written to disk)
4. **Documented** (learning log entry complete)

**Binary gate:** PASS (all flags processed, propagation verified) or FAIL (flags unprocessed or updates not propagated)

**NEVER:**
- Use "partial propagation" or "propagation pending"
- Defer propagation to "later session"
- Skip verification step
- Mark gate PASS if any propagation failed

---

## Critical Anti-Degradation Rules

### From S20-ANTI-DEGRADATION.md (summary):

1. **NEVER defer propagation** — If learning isn't written to engine files in same session, it won't happen
2. **Require minimum 3 data points** — Single-instance learnings are NOT statistically significant
3. **Binary propagation status** — COMPLETE or FAILED, never "pending"
4. **Verify file timestamps** — Check that target files were actually modified
5. **No speculative updates** — Teaching updates require evidence from S19 PAR

---

## Execution Protocol

### Step 1: Layer 0 — Validation & Loading
**Model:** claude-haiku-4

Read and execute:
- 0.1-input-validator.md → validate PAR, learning flags, evidence
- 0.2-teaching-loader.md → load teaching YAMLs
- 0.3-upstream-loader.md → load S19 PAR + current baselines

**Output:** Validated inputs, loaded context

---

### Step 2: Layer 1 — Learning Intelligence
**Model:** claude-opus-4

**Positional Reinforcement:** You are executing Layer 1 of S20 Learning Capture. Your task is learning categorization, teaching updates, specimen promotion, prediction calibration, gate threshold review, and propagation verification. Use claude-opus-4 model for judgment-heavy intelligence work.

Read and execute in sequence:
- 1.1-learning-categorization.md → categorize all S19 flags
- 1.2-teaching-update-generation.md → draft YAML updates (minimum 3 data points)
- 1.3-specimen-promotion.md → identify high-performers for specimen library
- 1.4-prediction-calibration.md → assess if virality scoring needs recalibration
- 1.5-gate-threshold-review.md → review pass/fail thresholds
- 1.6-propagation-verification.md → VERIFY all updates written to files

**Output:** Categorized learnings, drafted updates, propagation verification

---

### Step 3: Layer 4 — Assembly & Manifest
**Model:** claude-sonnet-4

**Positional Reinforcement:** You are executing Layer 4 of S20 Learning Capture. Your task is assembling learning log, system update manifest, and execution log. Use claude-sonnet-4 model for structured packaging.

Read and execute:
- 4.1-learning-log-assembler.md → assemble learning log entry
- 4.2-system-update-manifest.md → list all files updated with before/after
- 4.3-execution-log.md → timestamped decision log

**Output:** Learning log, system update manifest, execution log

---

### Step 4: Gate Validation
Check GATE_S20:
- [ ] All learning flags categorized
- [ ] All updates actioned or deferred with reason
- [ ] All file updates propagated and verified
- [ ] Learning log complete

If ALL boxes checked → **GATE PASS**
If ANY box unchecked → **GATE FAIL** → escalate to human

---

## Downstream Handoff

**To:** System (teaching files, specimen libraries, gate configs)
**Format:** Learning log entry + system update manifest
**Required fields:** All per output schema above

---

## Version History
- v1.0 (2024-03-05): Initial S20 agent specification with 9-microskill architecture
