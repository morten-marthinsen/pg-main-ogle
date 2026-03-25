# PDP-08-AGENT.md

> **Version:** 1.0
> **Skill:** PDP-08-micro-scripts
> **Position:** Post-Feature-Naming/Section-Copy, Pre-Assembly
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** PDP-01-ecomm-strategist, PDP-02-feature-naming, PDP-07-section-copy
> **Output:** `micro-scripts.json`

---

## PURPOSE

Write short-form scripts (15-60 seconds) for video, carousel, and GIF elements mapped to specific page sections. Every modern ecom page includes video and animated elements -- this skill produces the scripts for those elements, following the PG sf2 pattern of mapping scripts to specific sections.

**Success Criteria:**
- Script type assigned per page section (hero video, feature explainer, UGC, how-to, comparison)
- Duration budget set per script (15-60 seconds)
- Scripts written with both narration/copy and visual direction
- Feature names from PDP-02 used consistently
- Scripts map to specific page sections (for page builder placement)
- Visual direction notes actionable for video production

This agent is a **workflow orchestrator**. No Arena -- micro-scripts are functional content, not creative competition candidates.

---

## IDENTITY

**This skill IS:**
- The short-form script writer
- The video/carousel content planner
- The section-to-script mapper
- The visual direction author

**This skill is NOT:**
- A section copy writer (that is PDP-07)
- A long-form video script writer (15-60 seconds only)
- A video editor (it produces scripts, not edits)
- A design system (it provides script copy, not production specs)

**Upstream:** Receives `ecomm-strategy.yaml`, `feature-package.json`, `section-copy-package.json`
**Downstream:** Feeds `micro-scripts.json` to LP-15 (Assembly)

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure | haiku | File creation |
| 0 | Loading + validation | haiku | Input loading |
| 1 | Script routing + duration budgeting | sonnet | Architecture |
| 2 | Script generation + visual direction | sonnet | Functional writing, not max-creative |
| 4 | Validation + packaging | haiku | Assembly + validation |

---

## STATE MACHINE

```
IDLE -> LOADING -> ROUTING -> GENERATION -> VALIDATION -> COMPLETE
         |           |           |              |
         v           v           v              v
      [GATE_0]    [GATE_1]   [GATE_2]       [GATE_4]
```

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load strategy + feature package + section copy |
| 0.2 | `0.2-section-mapping-loader.md` | Load section-to-script mapping |

**Gate 0:** All upstream packages loaded, section-to-script mapping defined.

### Layer 1: Script Architecture

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-script-type-router.md` | Assign script type per section |
| 1.2 | `1.2-duration-budget-setter.md` | Set duration per script (15-60s) |

**Gate 1:** Every applicable section has script type assigned and duration budgeted.

### Layer 2: Script Generation

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-script-generator.md` | Generate scripts per section mapping |
| 2.2 | `2.2-visual-direction-writer.md` | Write visual direction notes per script |

**Gate 2:** All scripts written within duration budgets, visual direction notes complete.

### Layer 4: Validation & Packaging

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-script-validator.md` | Validate duration + feature consistency |
| 4.2 | `4.2-output-packager.md` | Package micro-scripts.json |

**Gate 4:** All scripts validated, micro-scripts.json packaged.

---

## OUTPUT SCHEMA

```json
{
  "micro_scripts_version": "1.0",
  "generated_at": "ISO timestamp",
  "skill_id": "PDP-08-micro-scripts",
  "total_scripts": 6,
  "scripts": [
    {
      "script_id": "MS-001",
      "section_number": 1,
      "section_name": "Hero Carousel",
      "script_type": "hero_video",
      "duration_seconds": 45,
      "narration": "Full script narration text...",
      "visual_direction": [
        { "timestamp": "0-5s", "visual": "Product hero shot, rotating", "narration": "Opening line..." },
        { "timestamp": "5-15s", "visual": "Feature demo close-up", "narration": "Feature explanation..." }
      ],
      "feature_names_used": ["HyperSpeed Face"],
      "word_count": 85,
      "cta": "Shop the SF2 at PerformanceGolf.com"
    }
  ]
}
```

---

## CONSTRAINTS

1. **Duration limits:** 15-60 seconds per script. No exceptions.
2. **Feature consistency:** Exact PDP-02 names in scripts.
3. **Section mapping:** Every script maps to a specific page section.
4. **Visual direction required:** Every script includes production notes.
5. **Word count constraint:** ~150 words per minute of narration (2.5 words/second).
6. **No slop words:** Same anti-slop lexicon as all EC skills.

---

## ERROR HANDLING

| Failure | Remediation |
|---------|-------------|
| Section has no script need | Skip -- not every section needs video |
| Script exceeds 60 seconds | Compress -- split into two scripts if necessary |
| Feature name wrong | Correct to exact PDP-02 name |
| Visual direction too vague | Add specific shot descriptions |

---

## SESSION PERSISTENCE

```yaml
session_state:
  current_layer: [0-4]
  scripts_completed: [count]
  gate_status: { gate_0-4: P/F }
  next_action: [next skill]
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 4-layer architecture with 8 microskills, section-to-script mapping, duration budgeting, visual direction, no Arena (functional content). |

---

**Skill Status:** COMPLETE
