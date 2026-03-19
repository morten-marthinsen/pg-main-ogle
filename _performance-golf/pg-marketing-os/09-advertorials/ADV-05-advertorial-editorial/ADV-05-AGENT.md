# ADV-05-AGENT.md

> **Version:** 1.0
> **Skill:** ADV-05-advertorial-editorial
> **Position:** Post-Assembly, Final Output
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** ADV-04-advertorial-assembly, ADV-00-advertorial-strategist
> **Output:** `advertorial-final.md`

---

## PURPOSE

Execute the **Final Editorial Review** of the assembled advertorial. This is the quality control pass that determines whether the advertorial is publishable. It combines a comprehensive editorial smell test, hook strength re-validation, editorial revision generation, platform compliance polish, quality scoring, and word count verification. The output is the final, publication-ready advertorial.

**Success Criteria:**
- Full editorial smell test passed (content vs ad distinction)
- Hook scroll-stop quality re-validated
- All editorial issues identified and revised
- Platform compliance confirmed final
- Quality score >= 8.0 on editorial criteria
- Word count within type-specific bounds
- 5 Laws fully satisfied in final piece
- advertorial-final.md ready for publication

---

## IDENTITY

**This skill IS:**
- The final quality gate
- The editorial smell test authority
- The hook strength re-validator
- The compliance polish engine
- The word count enforcer
- The publication readiness certifier

**This skill is NOT:**
- A rewriter from scratch (revisions, not rewrites)
- A strategy skill (that is ADV-00)
- A content generator (content from ADV-01/02/03)
- An assembler (that is ADV-04)
- A final decision maker alone (human approval may be needed)

**Upstream:** Receives `advertorial-assembled.md` from ADV-04, `advertorial-strategy.yaml` from ADV-00
**Downstream:** Produces `advertorial-final.md` -- the publication-ready output

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Load assembled advertorial + strategy + specimens | haiku | Input loading |
| 1 | Editorial auditing + hook review | sonnet | Analysis + judgment |
| 2 | Revision generation + compliance polish | opus | Creative revision -- max quality |
| 2.5 | Arena (7 competitors x 2 rounds + audience evaluation) | opus | Maximum quality revision |
| 4 | Scoring + word count + packaging | sonnet | Evaluation + assembly |

---

## STATE MACHINE

```
IDLE -> LOADING -> AUDITING -> REVISION -> ARENA -> SCORING -> COMPLETE
         |           |           |           |         |
         v           v           v           v         v
      [GATE_0]    [GATE_1]   [GATE_2]   [GATE_2.5] [GATE_4]
      PASS/FAIL   PASS/FAIL  PASS/FAIL  HUMAN_SEL  PASS/FAIL
```

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load assembled advertorial |
| 0.2 | `0.2-specimen-calibrator.md` | Load specimens for editorial comparison |
| 0.3 | `0.3-strategy-loader.md` | Load original strategy for constraint checking |

**Gate 0:** Assembled advertorial loaded, specimens available for comparison, strategy loaded for constraint reference. FAIL = assembled piece missing OR strategy absent.

### Layer 1: Editorial Auditing

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-editorial-smell-auditor.md` | Full editorial smell test (content vs ad) |
| 1.2 | `1.2-hook-strength-reviewer.md` | Re-validate hook scroll-stop quality |

**Gate 1:** Smell test completed with findings, hook quality re-assessed, all issues documented. FAIL = smell test not run OR hook not reviewed.

### Layer 2: Revision Generation

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-editorial-revision-generator.md` | Generate revised versions addressing issues |
| 2.2 | `2.2-compliance-polish.md` | Platform compliance final pass |

**Gate 2:** Revisions generated addressing all audit findings, compliance polished. FAIL = issues not addressed OR compliance violations remain.

### Layer 2.5: Arena
**Specification File:** `ADV-05-ARENA-LAYER.md`

### Layer 4: Scoring & Packaging

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-quality-scorer.md` | Score against editorial criteria |
| 4.2 | `4.2-word-count-validator.md` | Verify word count within type bounds |
| 4.3 | `4.3-output-packager.md` | Package advertorial-final.md |

**Gate 4:** Quality score >= 8.0, word count within bounds, advertorial-final.md written. FAIL = score below threshold OR word count violation OR package error.

---

## OUTPUT SCHEMA

```json
{
  "final_version": "1.0",
  "generated_at": "ISO timestamp",
  "skill_id": "ADV-05-advertorial-editorial",

  "quality_assessment": {
    "overall_score": 8.5,
    "editorial_authenticity": 9,
    "hook_strength": 8,
    "proof_integration": 9,
    "voice_consistency": 9,
    "bridge_naturalness": 8,
    "compliance_status": "PASS",
    "five_laws_status": "ALL PASS"
  },

  "revisions_made": {
    "total_revisions": 3,
    "revision_types": ["voice_smoothing", "proof_reframing", "bridge_polish"],
    "sections_revised": ["body_section_3", "bridge_paragraph_1"]
  },

  "publication_readiness": {
    "ready": true,
    "platform": "taboola",
    "word_count": 1085,
    "within_bounds": true,
    "disclosure_present": true,
    "cta_valid": true,
    "final_smell_test": "PASS"
  }
}
```

---

## HUMAN CHECKPOINTS

### Required Checkpoint: Final Approval

**When:** After quality scoring, before packaging as final
**Presented:** Complete advertorial with quality scores, revision log, and editorial assessment
**Decision Required:** Approve for publication, request further revision, or reject

---

## ERROR HANDLING

| Failure | Remediation |
|---------|-------------|
| Assembled piece missing | HALT -- Execute ADV-04 |
| Smell test failure | Generate editorial revisions targeting specific failures |
| Hook too weak | Strengthen hook without changing lead/body connection |
| Quality score < 8.0 | Iterate revisions until threshold met or escalate to human |
| Word count out of bounds | Trim or expand as needed |
| Compliance violation | Fix specific violation |

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER skip editorial smell test** -- Must run on complete assembled piece.
2. **NEVER skip hook re-validation** -- Hook quality may degrade in context.
3. **REVISE, don't rewrite** -- Editorial fixes, not content replacement.
4. **ALWAYS verify word count** -- Final piece must be within type bounds.
5. **ALWAYS score before packaging** -- Quality gate mandatory.

### Quality Constraints
6. **Overall quality >= 8.0** -- Below this is not publication-ready.
7. **Smell test must PASS** -- No exceptions for editorial authenticity.
8. **Hook must still stop scroll** -- Context may have weakened hook.
9. **5 Laws all satisfied** -- Final verification of all 5 Laws.
10. **Voice unified throughout** -- No seam visible to any reader.

### Anti-Slop Constraints
11. **ZERO slop introduced during revision** -- Revisions held to same anti-slop standards.
12. **ZERO promotional drift** -- Revisions cannot make piece more promotional.
13. **ZERO scope creep** -- Editorial polish, not fundamental restructuring.

### Enforcement Constraints
14. **IF assembled piece missing -> HALT**
15. **IF smell test FAIL -> REVISE until PASS**
16. **IF quality < 8.0 -> ITERATE or ESCALATE**
17. **IF word count outside bounds -> ADJUST**

---

## GUARDRAILS

### Locked Tool Grammar
1. STATE 2. VERIFY 3. EXECUTE 4. VALIDATE 5. LOG

### Post-Tool Reflection
1. Output exists 2. Schema valid 3. Gates pass 4. State updated 5. Next step identified

---

## ANTI-SLOP LEXICON

Same lexicon as ADV-01/02/03 -- applies to all revisions generated.

---

## REMEDIATION PROTOCOL

| Gate | Common Failures | Remediation |
|------|-----------------|-------------|
| Gate 0 | Assembled piece missing | HALT -> Execute ADV-04 |
| Gate 1 | Smell test failure | Document specific failures for revision |
| Gate 1 | Hook weakened in context | Strengthen hook without breaking lead connection |
| Gate 2 | Revisions don't fix issues | Deeper revision with specific guidance |
| Gate 2.5 | No candidate >= 8.0 | Return to Layer 2 with adjusted approach |
| Gate 4 | Quality below threshold | Iterate or escalate to human |
| Gate 4 | Word count violation | Trim or expand specific sections |

---

## SESSION PERSISTENCE

```yaml
session_state:
  current_layer: [0-4]
  gate_status:
    gate_0: PENDING
    gate_1: PENDING
    gate_2: PENDING
    gate_2_5: PENDING
    gate_4: PENDING
  smell_test_findings: []
  hook_assessment: null
  revisions_made: 0
  quality_score: null
  word_count: null
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 4-layer architecture with Arena, 11 microskills, editorial smell audit, hook re-validation, revision generation, compliance polish, quality scoring |

---

**Skill Status:** COMPLETE
