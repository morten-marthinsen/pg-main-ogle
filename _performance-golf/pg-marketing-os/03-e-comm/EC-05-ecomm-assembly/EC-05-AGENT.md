# EC-05-AGENT.md

> **Version:** 1.0
> **Skill:** EC-05-ecomm-assembly
> **Position:** Post-All-Copy-Skills, Pre-Editorial
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** EC-00, EC-01, EC-02, EC-03, EC-04
> **Output:** `ecomm-copy-assembled.md` + `page-builder-handoff.yaml`

---

## PURPOSE

Assemble all copy elements (hero, section copy, micro-scripts, feature package) into a complete product page document with integrated UX/design notes for page builder handoff. This skill verifies cross-section consistency, confirms feature threading from hero through all sections, and produces the complete assembly ready for editorial review.

**Success Criteria:**
- All sections assembled in priority order from EC-00 strategy
- Hero feature thread verified from ATF through all BTF sections
- Design notes integrated per section for page builder
- Cross-section consistency validated (tone, voice, feature names)
- Page-builder-handoff.yaml generated with section-by-section specs
- Complete page document ready for EC-06 editorial review

No Arena -- assembly is a structural task, not a creative competition.

---

## IDENTITY

**This skill IS:**
- The page assembly engine
- The cross-section consistency validator
- The design note integrator
- The page builder handoff generator
- The feature thread checker

**This skill is NOT:**
- A copy writer (all copy comes from EC-02, EC-03, EC-04)
- An editor (that is EC-06)
- A page builder (that is LP-00)
- A feature namer (that is EC-01)

**Upstream:** Receives all outputs from EC-00 through EC-04
**Downstream:** Feeds to EC-06 (Editorial) and LP-00 (Page Builder)

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Loading all upstream packages | haiku | Input loading |
| 1 | Assembly + thread checking + design integration | sonnet | Structural analysis |
| 2 | Page builder handoff generation | sonnet | Structured output |
| 4 | Cross-section validation + packaging | sonnet | Consistency judgment |

---

## STATE MACHINE

```
IDLE -> LOADING -> ASSEMBLY -> HANDOFF -> VALIDATION -> COMPLETE
         |           |           |            |
         v           v           v            v
      [GATE_0]    [GATE_1]   [GATE_2]     [GATE_4]
```

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load hero + section copy + micro-scripts + feature package |
| 0.2 | `0.2-strategy-loader.md` | Load strategy for section order |

**Gate 0:** All upstream outputs loaded and available.

### Layer 1: Assembly & Verification

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-section-assembler.md` | Assemble sections in priority order |
| 1.2 | `1.2-feature-thread-checker.md` | Verify hero feature carried through all sections |
| 1.3 | `1.3-design-note-integrator.md` | Integrate UX/design notes per section |

**Gate 1:** All sections assembled in order, hero feature thread verified, design notes integrated.

### Layer 2: Handoff Generation

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-page-builder-handoff-generator.md` | Generate page-builder-handoff.yaml |

**Gate 2:** Handoff document generated with section-by-section specs.

### Layer 4: Validation & Packaging

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-assembly-validator.md` | Cross-section consistency final check |
| 4.2 | `4.2-output-packager.md` | Package ecomm-copy-assembled.md + page-builder-handoff.yaml |

**Gate 4:** All consistency checks pass, both output files packaged.

---

## OUTPUT SCHEMA

```json
{
  "assembly_version": "1.0",
  "generated_at": "ISO timestamp",
  "skill_id": "EC-05-ecomm-assembly",
  "page_type": "pdp",
  "total_sections": 14,
  "total_word_count": 3150,
  "assembly_order": [1, 2, 3, 4, 9, 10, 7, 5, 14, 8, 11, 12, 16, 17],
  "hero_feature_thread": {
    "feature_name": "HyperSpeed Face",
    "hero_mention": true,
    "btf_mentions": 5,
    "thread_status": "CONTINUOUS"
  },
  "handoff_generated": true
}
```

---

## CONSTRAINTS

1. **Assembly order MUST follow EC-00 priority ranking.**
2. **Hero feature MUST appear in hero AND at least 2 BTF sections.**
3. **Design notes MUST be present for every section.**
4. **Feature names MUST match EC-01 across entire assembled document.**
5. **Micro-scripts MUST be placed at their mapped sections.**
6. **No new copy generated** -- assembly uses only existing copy from EC-02/EC-03/EC-04.

---

## SESSION PERSISTENCE

```yaml
session_state:
  current_layer: [0-4]
  gate_status: { gate_0-4: P/F }
  sections_assembled: [count]
  next_action: [next skill]
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 4-layer architecture with 8 microskills, cross-section validation, feature thread checking, page builder handoff generation. |

---

**Skill Status:** COMPLETE
