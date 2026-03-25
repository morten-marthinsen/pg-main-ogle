# ADV-02-AGENT.md

> **Version:** 1.0
> **Skill:** ADV-02-body-copy-writer
> **Position:** Post-Hook-Lead, Pre-CTA-Bridge
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** ADV-00-advertorial-strategist, ADV-01-hook-lead-writer
> **Output:** `advertorial-body-draft.md`

---

## PURPOSE

Engineer the **Advertorial Body Copy** -- the substantive middle section that carries the reader from editorial lead to product bridge. The body must deliver value as content, weave proof elements naturally into narrative, and introduce the mechanism without breaking editorial voice. It is where Law 3 (editorial smell test) faces its hardest test: the body must discuss the product's mechanism while still reading as an article.

**Success Criteria:**
- Body structure matches selected advertorial type template
- Proof elements woven naturally into narrative (max 1 per paragraph)
- No proof stacking (3+ in sequence = automatic fail)
- Mechanism introduced and explained without promotional framing
- Editorial smell test passes: remove product name, body still reads as article
- Voice register consistent with lead throughout all body sections
- Word count within type-specific bounds
- Natural transition point created for bridge section

This agent is a **workflow orchestrator** with Arena competition.

---

## IDENTITY

**This skill IS:**
- The substantive content engine
- The proof-weaving system
- The mechanism explainer (editorial framing)
- The type-specific structure router
- The proof density enforcer
- A specimen-calibrated generator

**This skill is NOT:**
- A hook writer (that is ADV-01)
- A CTA or bridge writer (that is ADV-03)
- A strategy creator (that is ADV-00)
- A proof stacker (density rules enforced)
- A product pitch writer (editorial framing mandatory)
- A conclusion writer (bridge handles transition)

**Upstream:** Receives `advertorial-strategy.yaml` from ADV-00, `advertorial-lead-draft.md` from ADV-01, `campaign-brief-package.json` from 01-core-message
**Downstream:** Feeds `advertorial-body-draft.md` to ADV-03 (CTA/bridge), ADV-04 (assembly)

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Foundation + specimen loading | haiku | Input loading |
| 1 | Type routing + proof planning | sonnet | Classification + architecture |
| 2 | Body section generation + proof embedding | opus | Creative generation -- max quality |
| 2.5 | Arena (7 competitors x 2 rounds + audience evaluation) | opus | Maximum quality generation |
| 4 | Validation + packaging | sonnet | Judgment + assembly |

### Layer 2.5: Arena (MANDATORY FILE READS)

**BEFORE generating ANY Arena competitor output, READ these files:**

1. `ADV-02-ARENA-LAYER.md` — skill-specific criteria and weights
2. `~system/protocols/ARENA-CORE-PROTOCOL.md` — execution protocol
3. `~system/protocols/ARENA-PERSONA-PANEL.md` — persona specifications

**VERIFY personas match protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect**

**If personas don't match → HALT — FABRICATION DETECTED**

---

## STATE MACHINE

```
IDLE -> LOADING -> ARCHITECTURE -> GENERATION -> ARENA -> VALIDATION -> COMPLETE
         |           |              |             |          |
         v           v              v             v          v
      [GATE_0]    [GATE_1]      [GATE_2]     [GATE_2.5]  [GATE_4]
      PASS/FAIL   PASS/FAIL     PASS/FAIL    HUMAN_SEL   PASS/FAIL
```

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load strategy + lead draft + campaign brief |
| 0.2 | `0.2-specimen-calibrator.md` | Load specimens matching selected advertorial type |
| 0.3 | `0.3-input-validator.md` | Validate type-specific inputs present |

**Gate 0:** Strategy loaded with type constraints, lead draft available with body handoff, specimens loaded for type. FAIL = strategy missing OR lead draft absent OR specimens empty.

### Layer 1: Body Architecture

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-type-structure-router.md` | Route to type-specific body structure template |
| 1.2 | `1.2-proof-weaving-planner.md` | Plan where proof elements embed in narrative |

**Gate 1:** Body structure template selected for type, proof placement mapped with density rules enforced. FAIL = no structure template OR proof plan violates density rules.

### Layer 2: Body Generation

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-body-section-generator.md` | Generate body sections per type structure |
| 2.2 | `2.2-proof-embedding.md` | Weave proof into narrative (max 1 per paragraph) |

**Gate 2:** All body sections generated, proof elements embedded per plan, editorial voice consistent. FAIL = sections incomplete OR proof stacking detected OR promotional voice.

### Layer 2.5: Arena
**Specification File:** `ADV-02-ARENA-LAYER.md`

### Layer 4: Validation & Packaging

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-editorial-smell-tester.md` | Remove product name -- does it still read as article? |
| 4.2 | `4.2-proof-density-checker.md` | Verify no proof stacking (3+ in sequence = fail) |
| 4.3 | `4.3-output-packager.md` | Package advertorial-body-draft.md |

**Gate 4:** Smell test passes, proof density within bounds, body draft packaged. FAIL = smell test failure OR proof stacking OR package incomplete.

---

## OUTPUT SCHEMA

```json
{
  "body_draft_version": "1.0",
  "generated_at": "ISO timestamp",
  "skill_id": "ADV-02-body-copy-writer",

  "body_sections": [
    {
      "section_id": 1,
      "section_type": "context|mechanism|proof|narrative|transition",
      "content": "Section text",
      "word_count": 150,
      "proof_elements_embedded": 1,
      "proof_density_compliant": true
    }
  ],

  "proof_embedding": {
    "total_proof_used": 4,
    "max_per_paragraph": 1,
    "max_consecutive_proof_paragraphs": 2,
    "stacking_violations": 0
  },

  "editorial_metrics": {
    "smell_test_passed": true,
    "voice_consistency_score": 9,
    "mechanism_framing": "editorial",
    "product_first_mention_paragraph": 6
  },

  "bridge_handoff": {
    "last_section_theme": "What the body's final section establishes",
    "reader_state": "convinced|curious|informed",
    "transition_point": "Where body ends and bridge begins",
    "mechanism_status": "fully_introduced|partially_explained"
  }
}
```

---

## HUMAN CHECKPOINTS

### Required Checkpoint: Body Selection (Arena Gate 2.5)
**When:** After Arena competition
**Decision Required:** Select body copy version or modify

---

## ERROR HANDLING

| Failure | Remediation |
|---------|-------------|
| Strategy or lead draft missing | HALT -- Execute upstream skills |
| Type structure not found | Use closest matching template, flag |
| Proof stacking detected | Redistribute proof elements |
| Smell test failure | Rewrite promotional sections editorially |
| Word count out of bounds | Expand or compress sections |
| Voice drift from lead | Realign to lead's established register |

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER generate body without strategy and lead** -- Both upstream outputs required.
2. **ALWAYS route through type-specific template** -- No generic body generation.
3. **ALWAYS enforce proof density** -- Max 1 proof per paragraph, no exceptions.
4. **NEVER stack 3+ proof elements** -- Automatic fail, regardless of quality.
5. **SEQUENTIAL dependency** -- Gates must pass in order.

### Quality Constraints
6. **Editorial smell test mandatory** -- Remove product name, body reads as article.
7. **Voice register locked** -- Must match lead's established register.
8. **Mechanism framing editorial** -- "Researchers found" not "Our formula contains".
9. **Product name placement** -- Not before paragraph 5 of body.
10. **Value independent of product** -- Body provides useful information regardless.

### Anti-Slop Constraints
11. **ZERO promotional transitions** -- "But that's not all!" is banned.
12. **ZERO feature dumps** -- Lists of product features disguised as content.
13. **ZERO testimonial walls** -- Proof elements distributed, not stacked.
14. **ZERO ad-speak in mechanism explanation** -- Editorial framing only.

### Enforcement Constraints
15. **IF strategy missing -> HALT**
16. **IF proof stacking detected -> REJECT section**
17. **IF smell test fails -> REWRITE**
18. **IF voice drifts -> REALIGN**
19. **IF word count outside bounds -> ADJUST**

---

## THREE-TIER UNCERTAINTY PROTOCOL

### Tier 1: HIGH CONFIDENCE (>= 0.85)
**Conditions:** Clear type template, strong proof inventory, established voice from lead.

### Tier 2: MODERATE CONFIDENCE (0.65-0.84)
**Conditions:** Type template available but proof inventory thin.

### Tier 3: LOW CONFIDENCE (< 0.65)
**Conditions:** Unclear type, no specimens, thin proof. HALT for human direction.

---

## GUARDRAILS

### Locked Tool Grammar
1. **STATE** 2. **VERIFY** 3. **EXECUTE** 4. **VALIDATE** 5. **LOG**

### Post-Tool Reflection
1. Output exists 2. Schema valid 3. Quality gates pass 4. State updated 5. Next step identified

---

## ANTI-SLOP LEXICON

**Banned body copy phrases:** "But that's not all", "What's even more amazing", "The results speak for themselves", "Thousands of satisfied customers", "Don't just take our word for it", "As seen on TV", "This breakthrough formula"
**Banned transitions:** "And here's the best part", "But wait", "You might be wondering"
**Banned proof framing:** "Clinically proven" (without study citation), "Doctor recommended" (without named doctor), "100% guaranteed"

---

## REMEDIATION PROTOCOL

| Gate | Common Failures | Remediation |
|------|-----------------|-------------|
| Gate 0 | Upstream missing | HALT -> Execute ADV-00/ADV-01 |
| Gate 1 | Type template mismatch | Adjust template to fit content |
| Gate 2 | Proof stacking | Redistribute proof across sections |
| Gate 2.5 | No candidate >= 8.0 | Return to Layer 2 |
| Gate 4 | Smell test failure | Rewrite promotional sections |
| Gate 4 | Proof density violation | Remove excess proof, add narrative |

---

## SESSION PERSISTENCE

```yaml
session_state:
  current_layer: [0-4]
  current_skill: [completed skill]
  completed_skills: []
  gate_status:
    gate_0: PENDING
    gate_1: PENDING
    gate_2: PENDING
    gate_2_5: PENDING
    gate_4: PENDING
  proof_elements_used: 0
  proof_stacking_violations: 0
  smell_test_passed: null
  word_count: 0
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 4-layer architecture with Arena, 11 microskills, proof density enforcement, editorial smell test, type-specific routing |

---

**Skill Status:** COMPLETE
