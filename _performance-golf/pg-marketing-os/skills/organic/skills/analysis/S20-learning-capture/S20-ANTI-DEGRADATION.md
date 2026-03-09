# S20 Learning Capture — Anti-Degradation Protocol v1.0

## MANDATORY READ
This file MUST be read before executing S20. Anti-degradation protocols are binding constraints.

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: S20 Learning Capture — Anti-Degradation Protocol v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Defer propagation to a later session — it must happen NOW. Update teaching files based on a single instance instead of requiring minimum 3 data points. Accept "PENDING" propagation status — only COMPLETE or FAILED are valid.
```

**Write this declaration to your first output file before executing any microskill.**

---

## Core Principle
S20 transforms performance data into system intelligence. The propagation step — actually writing updates to teaching files, specimen libraries, and gate configs — is NOT optional. If learning isn't written to engine files in the same session, it won't happen.

**Historical failure:** This has failed 3 times in CopywritingEngine (Research v1, Research v2, Proof v1). Learning was "deferred to later" and never happened. S20 MUST NOT repeat this pattern.

---

## Failure Mode Table

| Failure Mode | Detection Signal | Response | Escalation |
|--------------|------------------|----------|------------|
| **Single-instance learning** | Learning flag based on 1 data point | REJECT flag, require minimum 3 instances | If 3+ instances of same pattern across campaigns, revisit |
| **Updating teaching without evidence** | Teaching update proposed without S19 PAR citation | BLOCK update, require specific pattern/variance citation | Human review if agent insists update needed |
| **Specimen promotion without performance data** | Specimen added without actual metrics | REJECT specimen, require performance data | N/A |
| **Skipping propagation verification** | Updates drafted but file timestamps not checked | HALT execution, run 1.6-propagation-verification.md | CRITICAL: Escalate if verification not completed |
| **"Pending" propagation status** | Learning log shows "propagation_status: PENDING" | REJECT log, require COMPLETE or FAILED | N/A |
| **Deferring propagation to later** | Agent suggests "apply updates in next session" | BLOCK defer, execute propagation NOW | CRITICAL: Human intervention if agent cannot complete |
| **Speculative updates** | Teaching update without statistical significance | REJECT update, require confidence threshold | N/A |
| **Ignoring gate threshold** | S20 passes gate without propagation complete | FAIL gate, block handoff | CRITICAL: Agent override forbidden |

---

## Forbidden Rationalizations

### NEVER say:
- "This one example proves..." — Require minimum 3 data points
- "We can update later" — Propagation must happen in same session
- "Propagation is optional" — It is mandatory
- "The pattern is obvious even with 1 instance" — Statistical rigor required
- "Teaching file is close enough" — Updates must be specific and evidence-based
- "We'll verify propagation next time" — Verify NOW via 1.6
- "Partial propagation is acceptable" — Binary: COMPLETE or FAILED
- "Let's defer this learning" — Only defer with explicit reason + 3-campaign revisit trigger

---

## Binary Gate Enforcement

**GATE_S20 has only two states:**
1. **PASS** — All learning flags categorized, actioned, propagated, verified
2. **FAIL** — Any flag unprocessed, any update not propagated, verification incomplete

**NEVER:**
- "CONDITIONAL_PASS"
- "PASS_WITH_PENDING"
- "PARTIAL_PASS"
- "PASS_PENDING_PROPAGATION"

These are all FAIL states. If propagation incomplete → GATE FAIL → escalate.

---

## Per-Microskill Output Protocol

Every microskill in S20 MUST produce its own output file. NEVER synthesize outputs.

| Microskill | Output File | Minimum Size |
|------------|-------------|--------------|
| 0.1 | 0.1-validation-result.json | 500B |
| 0.2 | 0.2-teaching-context.json | 1KB |
| 0.3 | 0.3-upstream-package.json | 2KB |
| 1.1 | 1.1-learning-categories.json | 2KB |
| 1.2 | 1.2-teaching-updates.yaml | 1KB |
| 1.3 | 1.3-specimen-promotions.json | 1KB |
| 1.4 | 1.4-prediction-calibration.json | 1KB |
| 1.5 | 1.5-gate-threshold-review.json | 1KB |
| 1.6 | 1.6-propagation-verification.json | 1KB |
| 4.1 | learning-log-[campaign_id]-[date].md | 3KB |
| 4.2 | system-update-manifest-[date].md | 2KB |
| 4.3 | S20-execution-log-[date].md | 2KB |

**CRITICAL:** Microskill 1.6 (propagation verification) output MUST include file modification timestamps for every target file. If timestamps don't change → propagation FAILED.

---

## Project Infrastructure Requirements

### Required Files for S20 Execution:
1. **PROJECT-STATE.md** — Current learning state, last propagation date, pending learnings
2. **LEARNING-LOG/** directory — All historical learning log entries
3. **Teaching files/** directory — All YAML teaching files that may be updated
4. **Specimen library/** directory — Where high-performing content specimens live
5. **Gate configs/** directory — Pass/fail threshold configurations

### Before S20 execution:
- Verify all directories exist
- Check PROJECT-STATE.md for pending learnings from previous campaigns
- Load current teaching file versions

---

## Stale Artifact Cleanup

### Before generating new outputs:
1. Check for orphaned learning logs (PAR exists but no learning log)
2. Identify teaching files not updated in >90 days (may need refresh)
3. Flag specimens without performance data (incomplete promotions)
4. Detect "PENDING" propagation statuses from previous runs (failed propagations)

### Delete/flag stale artifacts:
- Learning logs marked "PENDING" for >7 days
- Teaching update drafts never applied
- Specimen promotions without metadata

---

## Statistical Rigor Requirements

### Teaching Updates:
- **Minimum 3 data points** — Never update teaching based on single instance
- **Confidence thresholds:**
  - High: ≥3 data points + statistical significance
  - Medium: 2 data points + strong correlation
  - Low: 1 data point (hypothesis only, NOT actionable)
- **Only High confidence updates propagated** — Medium/Low deferred with 3-campaign revisit trigger

### Specimen Promotion:
- **Minimum performance threshold:** Virality composite ≥70 OR dimension score ≥8.0 on ≥2 dimensions
- **Require actual metrics** — Not predictions, actual post-publish performance
- **Platform representation** — Balance specimen library across platforms

### Gate Threshold Adjustment:
- **Minimum 10 content pieces** analyzed before adjusting gate
- **Require directional consistency** — If lowering threshold, ≥3 pieces near threshold must have overperformed
- **Statistical justification** — Show distribution shift, not anecdote

---

## Propagation Verification Protocol (Microskill 1.6)

### MUST verify:
1. **File exists** at target path
2. **File timestamp** changed after update operation
3. **Content includes** the specific update (spot-check YAML keys, specimen IDs)
4. **No corruption** — File still parses correctly
5. **Version incremented** — Teaching files have version numbers

### If verification FAILS:
1. **Retry propagation** (1 attempt)
2. **Log failure** with error details
3. **Mark propagation_status: FAILED**
4. **Escalate to human** — Do NOT proceed

---

## Model-Specific Degradation Patterns

### Opus at Layer 1:
- **Risk:** Over-confidence in single-instance patterns
- **Mitigation:** Enforce 3-data-point minimum in prompts, add statistical check
- **Detection:** Learning flag without 3+ citations → REJECT

### Sonnet at Layer 4:
- **Risk:** Skipping propagation verification step
- **Mitigation:** Explicit checklist in 1.6 prompt, require timestamp output
- **Detection:** Propagation verification file missing timestamps → FAIL

### Haiku at Layer 0:
- **Risk:** Passing invalid inputs to Layer 1
- **Mitigation:** Strict validation rules, binary pass/fail
- **Detection:** Layer 1 errors due to missing data → trace back to Layer 0 validation

---

## Output Quality Gates

### Learning Log (4.1):
- [ ] All learning flags from S19 PAR addressed
- [ ] Every learning has evidence (≥3 citations for High confidence)
- [ ] Confidence and impact assigned
- [ ] Propagation status is COMPLETE or FAILED (never PENDING)
- [ ] Target files listed

### System Update Manifest (4.2):
- [ ] Every file update listed
- [ ] Before/after snippets included
- [ ] File paths absolute
- [ ] Timestamps recorded
- [ ] Version numbers incremented

### Execution Log (4.3):
- [ ] All decisions logged
- [ ] Data sources documented
- [ ] Timeline complete
- [ ] Any issues noted

---

## Escalation Triggers

### Escalate to human if:
1. Propagation verification fails after retry
2. >50% of learning flags are Low confidence (insufficient data)
3. Teaching update conflicts with prior learning
4. Gate threshold adjustment would change pass rate by >20%
5. Specimen library imbalance (e.g., 90% from one platform)
6. Agent proposes deferring propagation to later session

---

## Success Criteria

S20 succeeds when:
1. **100% of learning flags processed** (categorized, actioned, or consciously deferred)
2. **All High-confidence updates propagated** and verified
3. **Learning log complete** with COMPLETE propagation status
4. **System update manifest** lists all file changes with before/after
5. **GATE_S20 = PASS**

---

## Version History
- v1.0 (2024-03-05): Initial anti-degradation protocol with 9-fix pattern for learning capture
