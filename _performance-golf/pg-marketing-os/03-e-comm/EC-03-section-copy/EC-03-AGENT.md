# EC-03-AGENT.md

> **Version:** 1.0
> **Skill:** EC-03-section-copy
> **Position:** Post-Strategy/Feature-Naming, Pre-Assembly
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** EC-00-ecomm-strategist, EC-01-feature-naming
> **Output:** `section-copy-package.json` + `section-copy-assembled.md`

---

## PURPOSE

Write copy for every below-the-fold section in the section map. Each section is an island -- it must work standalone when scanned in 3-5 seconds. This skill iterates through each active BTF section, routing it to the appropriate copy template, embedding proof elements, and including design/UX notes per section.

**Success Criteria:**
- Every active BTF section has copy written within word budget
- Every section works standalone (shuffle test)
- Every section has at least 1 proof element
- Every section includes UX/design notes for page builder
- Feature names from EC-01 used consistently and exactly
- Long-form crossover patterns applied where mapped
- All section copy scan-optimized (works at 3-5 second scan speed)

This agent is a **workflow orchestrator**. It produces section-by-section copy for the entire product page below the fold.

---

## IDENTITY

**This skill IS:**
- The BTF section copy writer
- The proof element integrator
- The scan-optimization enforcer
- The section independence guarantor (shuffle test)
- The long-form crossover pattern adapter
- The design note author

**This skill is NOT:**
- The hero writer (that is EC-02)
- The feature namer (that is EC-01)
- The strategist (that is EC-00)
- The page builder (that is LP-00)
- A narrative writer (ecom is scanned, not read)

**Upstream:** Receives `ecomm-strategy.yaml` from EC-00, `feature-package.json` from EC-01
**Downstream:** Feeds `section-copy-package.json` + `section-copy-assembled.md` to EC-05 (Assembly), EC-06 (Editorial)

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Strategy + features + crossover patterns | haiku | Input loading |
| 1 | Section routing + proof planning + design note planning | sonnet | Architecture |
| 2 | Section copy generation + proof embedding | opus | Creative generation |
| 2.5 | Arena (7 competitors x 2 rounds + audience evaluation) | opus | Maximum quality |
| 4 | Standalone test + feature consistency + packaging | sonnet | Judgment evaluation |

---

## STATE MACHINE

```
IDLE -> LOADING -> ROUTING -> GENERATION -> ARENA -> VALIDATION -> COMPLETE
         |           |           |           |          |
         v           v           v           v          v
      [GATE_0]    [GATE_1]   [GATE_2]   [GATE_2.5]  [GATE_4]
      PASS/FAIL   PASS/FAIL  PASS/FAIL  HUMAN_SEL   PASS/FAIL
```

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load strategy map + feature package |
| 0.2 | `0.2-crossover-pattern-loader.md` | Load long-form patterns (Skills 13,14,15,16,18) |
| 0.3 | `0.3-input-validator.md` | Validate section map + word budgets present |

**Gate 0:** Strategy loaded with section map, feature package loaded, crossover patterns loaded, word budgets confirmed for all active sections.

### Layer 1: Section Architecture

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-section-router.md` | Route each section to appropriate template |
| 1.2 | `1.2-proof-element-planner.md` | Plan proof element per section (minimum 1) |
| 1.3 | `1.3-design-note-planner.md` | Plan UX/design notes per section |

**Gate 1:** Every section has template assignment, proof element planned, design note planned.

### Layer 2: Copy Generation

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-section-copy-generator.md` | Generate copy per section (iterative) |
| 2.2 | `2.2-proof-embedding.md` | Embed proof elements into section copy |

**Gate 2:** All sections have copy within word budgets, all sections have embedded proof, all sections pass initial scan check.

### Layer 2.5: Arena
**Specification File:** `EC-03-ARENA-LAYER.md`
**Gate 2.5:** Human selects winning section copy package.

### Layer 4: Validation & Packaging

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-standalone-section-tester.md` | Shuffle test -- each section standalone? |
| 4.2 | `4.2-feature-consistency-checker.md` | Feature names from EC-01 used correctly? |
| 4.3 | `4.3-output-packager.md` | Package section-copy-package.json + section-copy-assembled.md |

**Gate 4:** All sections pass shuffle test, all feature names match EC-01 exactly, output packaged.

---

## OUTPUT SCHEMA

```json
{
  "section_copy_version": "1.0",
  "generated_at": "ISO timestamp",
  "skill_id": "EC-03-section-copy",
  "total_sections": 13,
  "sections": [
    {
      "section_number": 9,
      "section_name": "Problem/Solution",
      "priority": 3,
      "word_budget": 250,
      "actual_word_count": 237,
      "copy": "The full section copy text...",
      "proof_element": { "type": "customer_story", "content": "..." },
      "design_notes": { "layout": "two-column", "mobile": "stack", "visual": "before/after" },
      "crossover_skill": "13-root-cause",
      "standalone_test": "PASS",
      "feature_consistency": "PASS"
    }
  ]
}
```

---

## HUMAN CHECKPOINTS

### Required: Section Copy Selection (Arena Gate 2.5)
**When:** After Arena competition
**Presented:** Complete section copy packages from 7 competitors
**Decision Required:** Select winning package or provide direction

---

## ERROR HANDLING

| Failure | Remediation |
|---------|-------------|
| Section exceeds word budget | Compress -- every section has a budget |
| Proof element missing from section | Add proof before proceeding |
| Feature name used incorrectly | Correct to exact EC-01 name |
| Section fails standalone test | Rewrite with built-in context |
| Crossover pattern doesn't adapt to ecom | Write ecom-native instead |

---

## CONSTRAINTS

### Execution Constraints
1. **EVERY section must work standalone** -- Shuffle test is mandatory.
2. **EVERY section needs proof** -- Minimum 1 proof element per section.
3. **EVERY section needs design notes** -- Copy is inseparable from layout on ecom.
4. **FEATURE names must match EC-01** -- Exact match, no paraphrasing.
5. **WORD budgets are binding** -- From EC-00 strategy.

### Quality Constraints
6. **Scan-optimized** -- Every section works when scanned in 3-5 seconds.
7. **No narrative dependency** -- No section references another section's content.
8. **Proof density** -- At least 1 proof element per section (review, stat, UGC, authority).

### Anti-Slop Constraints
9. **ZERO AI telltales** in section copy.
10. **ZERO vague benefit claims** -- every benefit must be specific.
11. **ZERO narrative bridging** -- no "as we mentioned above" or "as you'll see below".

---

## ANTI-SLOP LEXICON

**Banned:** unlock, harness, leverage, journey, empower, transform, revolutionary, game-changing, cutting-edge, next-level, dive deep, holistic, synergy, paradigm, elevate, curated, seamless, robust

---

## SESSION PERSISTENCE

```yaml
session_state:
  current_layer: [0-4]
  sections_completed: [list of section numbers]
  sections_remaining: [list]
  gate_status: { gate_0-4: P/F }
  human_selection_received: [Y/N]
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 5-layer architecture with 12 microskills, Arena layer, iterative section generation, proof embedding, standalone testing, feature consistency checking. |

---

**Skill Status:** COMPLETE
