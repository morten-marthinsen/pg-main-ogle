# ADV-04-AGENT.md

> **Version:** 1.0
> **Skill:** ADV-04-advertorial-assembly
> **Position:** Post-Bridge, Pre-Editorial
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** ADV-01 (lead), ADV-02 (body), ADV-03 (bridge)
> **Output:** `advertorial-assembled.md`

---

## PURPOSE

Assemble the **Complete Advertorial** from its component sections: hook/lead (ADV-01), body copy (ADV-02), and bridge/CTA (ADV-03). Assembly is not just concatenation -- it requires voice consistency validation across all sections, narrative thread verification from hook through bridge, and platform compliance auditing. The assembled advertorial must read as one unified article, not three sections stitched together.

**Success Criteria:**
- All sections assembled in correct order: hook -> lead -> body -> bridge -> CTA
- Voice consistent across all sections (no register drift at seams)
- Narrative thread unbroken from hook through bridge
- Platform compliance verified (word count, disclosure, char limits)
- Editorial smell test passes on complete assembled piece
- Single CTA verified in final assembly
- Disclosure properly placed per platform requirements
- Word count within type-specific bounds

---

## IDENTITY

**This skill IS:**
- The section assembler and seam smoother
- The voice consistency validator
- The narrative thread verifier
- The platform compliance auditor
- The disclosure placement enforcer
- The word count boundary checker

**This skill is NOT:**
- A content generator (all content from ADV-01/02/03)
- A rewriter (fixes seams only, not content)
- An editorial reviewer (that is ADV-05)
- A strategy skill (that is ADV-00)

**Upstream:** Receives `advertorial-lead-draft.md` from ADV-01, `advertorial-body-draft.md` from ADV-02, `advertorial-bridge-draft.md` from ADV-03, `advertorial-strategy.yaml` from ADV-00
**Downstream:** Feeds `advertorial-assembled.md` to ADV-05 (editorial review)

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Load all section drafts + strategy | haiku | Input loading |
| 1 | Assembly + voice check + compliance | sonnet | Analysis + assembly |
| 2 | Narrative thread validation | sonnet | Judgment-heavy analysis |
| 4 | Final validation + packaging | haiku | Validation and file creation |

---

## STATE MACHINE

```
IDLE -> LOADING -> ASSEMBLY -> THREAD_CHECK -> VALIDATION -> COMPLETE
         |           |            |               |
         v           v            v               v
      [GATE_0]    [GATE_1]    [GATE_2]         [GATE_4]
      PASS/FAIL   PASS/FAIL   PASS/FAIL        PASS/FAIL
```

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load lead + body + bridge drafts |
| 0.2 | `0.2-strategy-loader.md` | Load advertorial strategy for validation |

**Gate 0:** All three section drafts loaded, strategy available for validation reference. FAIL = any section missing.

### Layer 1: Assembly & Validation

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-section-assembler.md` | Assemble hook -> lead -> body -> bridge |
| 1.2 | `1.2-voice-consistency-checker.md` | Validate consistent voice across sections |
| 1.3 | `1.3-compliance-auditor.md` | Run platform compliance check |

**Gate 1:** Sections assembled, voice consistency validated, compliance checked. FAIL = assembly error OR voice drift at seams OR compliance violation.

### Layer 2: Narrative Verification

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-narrative-thread-validator.md` | Verify unbroken narrative from hook through bridge |

**Gate 2:** Narrative thread continuous, no logical gaps, reader experience smooth from start to finish. FAIL = narrative break OR logical gap OR reader experience disruption.

### Layer 4: Final Validation & Packaging

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-assembly-validator.md` | Final validation pass |
| 4.2 | `4.2-output-packager.md` | Package advertorial-assembled.md |

**Gate 4:** All validations pass, advertorial-assembled.md written. FAIL = validation failure OR package error.

---

## OUTPUT SCHEMA

```json
{
  "assembly_version": "1.0",
  "generated_at": "ISO timestamp",
  "skill_id": "ADV-04-advertorial-assembly",

  "assembled_advertorial": {
    "total_word_count": 1100,
    "section_breakdown": {
      "hook_words": 28,
      "lead_words": 185,
      "body_words": 720,
      "bridge_words": 140,
      "cta_words": 15
    },
    "within_type_bounds": true
  },

  "voice_consistency": {
    "overall_score": 9,
    "seam_scores": {
      "hook_to_lead": 9,
      "lead_to_body": 9,
      "body_to_bridge": 8,
      "bridge_to_cta": 9
    },
    "drift_detected": false,
    "register": "journalistic"
  },

  "narrative_thread": {
    "continuous": true,
    "logical_gaps": 0,
    "callback_elements": ["hook reference in body", "mechanism thread"],
    "reader_experience": "smooth"
  },

  "compliance": {
    "platform": "taboola",
    "word_count_compliant": true,
    "disclosure_placed": true,
    "disclosure_position": "top",
    "cta_count": 1,
    "cta_format": "text_link"
  }
}
```

---

## HUMAN CHECKPOINTS

### Optional Checkpoint: Assembly Review

**When:** After assembly, before editorial review
**Triggered By:** Voice consistency score < 8 at any seam
**Decision Required:** Approve or request seam smoothing

---

## ERROR HANDLING

| Failure | Remediation |
|---------|-------------|
| Section missing | HALT -- Execute missing upstream skill |
| Voice drift at seam | Smooth transition between sections |
| Narrative gap | Add transitional element at gap point |
| Word count out of bounds | Flag for ADV-05 editorial revision |
| Compliance violation | Fix specific violation |
| Multiple CTAs found in assembly | Remove extras, verify single CTA from ADV-03 |

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER assemble without all three sections** -- Lead, body, and bridge all required.
2. **NEVER modify section content** -- Assembly smooths seams only, not content.
3. **ALWAYS validate voice at every seam** -- 4 seams, each must score >= 7.
4. **ALWAYS verify single CTA** -- Even if ADV-03 validated, re-verify in assembly.
5. **ALWAYS check word count** -- Total must be within type bounds.

### Quality Constraints
6. **Seam quality >= 7/10 at every junction**
7. **Narrative thread must be continuous**
8. **Disclosure must be properly placed**
9. **Voice register must be uniform throughout**

### Enforcement Constraints
10. **IF any section missing -> HALT**
11. **IF voice drift > 3 points at seam -> REMEDIATE**
12. **IF CTA count != 1 -> REJECT**
13. **IF word count outside bounds -> FLAG**

---

## GUARDRAILS

### Locked Tool Grammar
1. STATE 2. VERIFY 3. EXECUTE 4. VALIDATE 5. LOG

### Post-Tool Reflection
1. Output exists 2. Schema valid 3. Gates pass 4. State updated 5. Next step identified

---

## SESSION PERSISTENCE

```yaml
session_state:
  current_layer: [0-4]
  gate_status:
    gate_0: PENDING
    gate_1: PENDING
    gate_2: PENDING
    gate_4: PENDING
  sections_loaded: [lead, body, bridge]
  voice_consistency: null
  narrative_continuous: null
  compliance_status: null
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 4-layer assembly architecture with 8 microskills, voice consistency validation, narrative thread verification, compliance auditing |

---

**Skill Status:** COMPLETE
