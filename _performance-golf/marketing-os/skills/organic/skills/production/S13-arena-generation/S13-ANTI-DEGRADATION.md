# S13: Arena Generation Anti-Degradation System
Version: 1.0
Status: Active
Last Updated: 2026-03-05

## Mandatory Read

**YOU MUST READ THIS FILE BEFORE EXECUTING S13.**

The Arena is the quality gate before content launch. These failure modes have been observed repeatedly:
- Single-round "Arena" that skips iteration
- Missing personas creating evaluation blind spots
- Personas converging without Critic challenge (groupthink)
- Synthesis generation without Arena insights
- Proceeding without human selection

**The fixes are structural, not suggestions.**

---

## The 9 Core Fixes

### Fix 1: Project Infrastructure (MANDATORY)
Every S13 execution requires:
```
project-root/
  ├── CLAUDE.md
  ├── PROJECT-STATE.md
  └── PROGRESS-LOG.md
```

**BEFORE starting S13:**
1. Verify all 3 files exist
2. Read CLAUDE.md for routing
3. Read PROJECT-STATE.md for context
4. Update PROGRESS-LOG.md with S13 start

If missing: create or escalate. Do NOT proceed.

---

### Fix 2: Per-Microskill Output (MANDATORY)

| Microskill | Required Output File |
|------------|---------------------|
| 0.1 input-validator | `s13-0.1-validation-report.yaml` |
| 0.2 persona-loader | `s13-0.2-personas.yaml` |
| 0.3 content-draft-loader | `s13-0.3-content-draft.md` |
| 0.4 cbf-loader | `s13-0.4-brand-context.yaml` |
| 1.1 arena-brief-preparation | `s13-1.1-arena-brief.yaml` |
| 1.2 round-1-competition | `s13-1.2-round-1-scores.yaml` |
| 1.3 round-1-critique | `s13-1.3-round-1-critique.yaml` |
| 1.4 round-2-competition | `s13-1.4-round-2-scores.yaml` |
| 1.5 round-2-critique | `s13-1.5-round-2-critique.yaml` |
| 1.6 round-3-competition | `s13-1.6-round-3-scores.yaml` |
| 1.7 round-3-final-scoring | `s13-1.7-final-scores.yaml` |
| 2.5.1 synthesis-generation | `s13-2.5.1-hybrids.yaml` |
| 2.5.2 human-selection-capture | `s13-2.5.2-selection.yaml` |
| 4.1 arena-results-assembler | `arena_results.yaml` |
| 4.2 execution-log | `s13-execution-log.md` |

EVERY microskill MUST produce its own file.

---

### Fix 3: Binary Gate Enforcement (MANDATORY)

Gates are PASS or FAIL. No other status exists.

**Forbidden:**
- "PARTIAL_PASS"
- "CONDITIONAL_PASS"
- "NEEDS_REVIEW"
- "2_OF_3_ROUNDS_COMPLETE"

If criteria not met: gate file NOT created. Fix or escalate.

---

### Fix 4: Stale Artifact Cleanup (MANDATORY)

Before starting S13 Layer 1, check for stale Arena files from previous runs:
```
s13-1.2-round-1-scores.yaml
arena_results.yaml
GATE_2.5_ARENA_COMPLETE
```

If found: move to `_archive/YYYY-MM-DD-HH-MM/`, document in PROGRESS-LOG, proceed fresh.

---

### Fix 5: Model Selection Binding (MANDATORY)

| Layer | Model | Non-Negotiable |
|-------|-------|----------------|
| Layer 0 | claude-haiku-4 | YES |
| Layer 1 | claude-opus-4.6 | YES |
| Layer 2.5 | claude-opus-4.6 | YES |
| Layer 4 | claude-sonnet-4.5 | YES |

If model unavailable: escalate. Do NOT substitute.

---

### Fix 6: 3-Round Requirement (MANDATORY)

**3 rounds are NON-NEGOTIABLE.**

Round 1: Initial evaluations
Critic: Challenge convergence
Round 2: Response to critique
Critic: Escalate challenge
Round 3: Final scores

Forbidden rationalizations:
- "Round 1 scores were unanimous, no need for more rounds"
- "Content is simple, 1 round is enough"
- "Time constraint, skipping to synthesis"

If time is constrained: escalate to human for Arena scope decision, don't skip rounds.

---

### Fix 7: All 7 Personas Required (MANDATORY)

**All 7 personas MUST participate in EACH round:**
1. Volume Machine
2. Value Architect
3. Virality Engineer
4. Community Builder
5. Brand Purist
6. Algorithm Hacker
7. Storyteller

Forbidden:
- "Only 5 personas relevant for this content type"
- "Virality Engineer doesn't apply to educational content"
- "Skipping Brand Purist, already on-brand"

Each persona brings unique lens. Skipping = blind spot.

---

### Fix 8: Critic Challenge Enforcement (MANDATORY)

**Critic MUST challenge each round.**

If personas converge (scores within 2 points), Critic severity escalates to 8-9/10.

Critic challenge must:
- Identify specific convergence patterns
- Surface blind spots
- Force differentiation
- Push personas to defend or revise

If Critic challenge is generic or skipped: Arena is ineffective.

---

### Fix 9: Human Selection Capture (MANDATORY)

**Human selection is REQUIRED before creating GATE_2.5_ARENA_COMPLETE.**

Arena informs, human decides. Captured selection must include:
- Selected content ID (original or hybrid)
- Any modifications requested
- Rationale for selection
- Timestamp

If human unavailable: BLOCK at Gate 2.5, escalate. Do NOT proceed to Layer 4 without selection.

---

## Failure Mode Table

| Failure Mode | Detection | Response | Escalation |
|--------------|-----------|----------|------------|
| Fewer than 3 rounds | Round count < 3 | BLOCK at Gate 1, execute missing rounds | Immediate |
| Missing personas | Persona count < 7 in any round | BLOCK, re-execute round with all 7 | Immediate |
| Mono-voice output | All scores within 1 point across personas | Critic escalates severity to 9/10 | After Round 1 |
| Synthesis without critique | Hybrids don't reference Critic insights | Regenerate synthesis with Arena-informed rationale | Before Gate 2.5 |
| No human selection | Gate 2.5 created without selection capture | DELETE gate file, escalate to human | Immediate |
| Skipped Critic challenge | No Critic file for round | BLOCK, execute Critic challenge | After Round 1/2 |
| Weak Critic challenge | Severity < 5/10 when convergence detected | Regenerate Critic challenge with higher severity | Same round |

---

## Forbidden Rationalizations

1. "One round was enough, scores were clear"
2. "Only 5 personas relevant for this content"
3. "Synthesis IS the selection, human doesn't need to choose"
4. "Personas all agreed, Critic challenge not needed"
5. "Time constraint, skipping to final output"
6. "Content is simple, full Arena is overkill"
7. "Brand Purist always agrees, no need to include"
8. "Hybrids are just variations, Arena insights already incorporated"

If you think any of these: STOP. Re-read Arena protocol.

---

## Quality Enforcement Checklist

**Before creating GATE_2.5_ARENA_COMPLETE:**

- [ ] 3 full rounds executed
- [ ] All 7 personas in each round
- [ ] Critic challenged after Round 1
- [ ] Critic challenged after Round 2
- [ ] Final scores compiled (Round 3)
- [ ] 3+ hybrid variations generated
- [ ] Human selection captured with rationale
- [ ] Selected content documented

**If ANY checkbox unchecked: Arena INCOMPLETE. Do NOT create gate.**

---

## Emergency Protocols

### If content draft is missing
STOP. Escalate: "S13 requires complete content draft from S08-S12. Cannot run Arena on incomplete content."

### If human unavailable for selection
BLOCK at Gate 2.5. Document in PROGRESS-LOG: "Arena complete, awaiting human selection. S14 blocked until selection captured."

### If Critic repeatedly fails to challenge
Escalate to human: "Arena Critic not achieving differentiation. Scores converging across rounds despite challenges. May indicate content uniformity or Critic calibration issue."

---

## Version History

- **v1.0** (2026-03-05): Initial anti-degradation system for S13 Arena Generation
