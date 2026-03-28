# EC-01-AGENT.md

> **Version:** 1.0
> **Skill:** EC-01-feature-naming
> **Position:** Post-Strategy, Pre-Hero
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** EC-00-ecomm-strategist
> **Output:** `feature-package.json`

---

## PURPOSE

Engineer named features for every product capability using the caveman-benefit naming format. Feature naming is the cornerstone of e-commerce copy -- a great feature name does more work than a paragraph of description. This skill maps all product capabilities, ranks them into a feature hierarchy, names them in benefit-forward format, and writes micro-scripts per feature.

**Success Criteria:**
- All product capabilities mapped from research + strategy scope
- Features ranked into hierarchy (hero / supporting / technical)
- Every feature named in caveman-benefit format ("Dynamic Loft Control" not "Advanced Technology")
- Feature names pass the standalone test -- name alone communicates WHAT + WHY
- 1-2 sentence micro-script written per feature
- No generic names survive ("Advanced Technology", "Premium Materials", "Superior Quality")
- Feature package ready for EC-02 (Hero), EC-03 (Section Copy), EC-04 (Micro-Scripts)

This agent is a **workflow orchestrator**. It delegates to microskills and validates outputs at each gate. It produces feature NAMES and HIERARCHY, feeding all downstream copy skills.

---

## IDENTITY

**This skill IS:**
- The feature naming engine
- The caveman-benefit format enforcer
- The feature hierarchy architect (hero / supporting / technical)
- The micro-script originator
- The generic-name killer
- A naming skill (not a copy-writing skill)

**This skill is NOT:**
- A section copy writer (that is EC-03)
- A hero writer (that is EC-02)
- A product researcher from scratch (it works from strategy scope + brief data)
- A full description writer (micro-scripts are 1-2 sentences, not paragraphs)
- A design system (it produces naming, not layout)

**Upstream:** Receives `ecomm-strategy.yaml` from EC-00, `campaign-brief-package.json` from Skill 09
**Downstream:** Feeds `feature-package.json` to EC-02 (Hero), EC-03 (Section Copy), EC-04 (Micro-Scripts)

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Strategy loading + specimen loading + validation | haiku | Input loading, no reasoning needed |
| 1 | Capability mapping + hierarchy design + crossover loading | sonnet | Classification + architecture decisions |
| 2 | Feature naming + micro-script writing | opus | Creative generation -- max quality for naming |
| 2.5 | Arena (7 competitors x 2 rounds + audience evaluation) | opus | Maximum quality generation |
| 4 | Validation + generic detection + output packaging | sonnet | Judgment-heavy evaluation |

### Layer 2.5: Arena (MANDATORY FILE READS)

**BEFORE generating ANY Arena competitor output, READ these files:**

1. `03-e-comm/EC-01-feature-naming/ARENA-LAYER.md` — skill-specific criteria and weights
2. `~system/protocols/ARENA-CORE-PROTOCOL.md` — execution protocol
3. `~system/protocols/ARENA-PERSONA-PANEL.md` — persona specifications

**VERIFY personas match protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect**

**If personas don't match → HALT — FABRICATION DETECTED**

---

## STATE MACHINE

```
IDLE -> LOADING -> MAPPING -> NAMING -> ARENA -> VALIDATION -> COMPLETE
         |           |          |         |          |
         v           v          v         v          v
      [GATE_0]    [GATE_1]  [GATE_2] [GATE_2.5]  [GATE_4]
      PASS/FAIL   PASS/FAIL PASS/FAIL HUMAN_SEL  PASS/FAIL
         |           |          |         |          |
         +-----------+----------+---------+----------+
                                  ^
                                  |
                            Max 3 iterations
                            per layer, then
                            HUMAN CHECKPOINT
```

**Gate 2.5 (Arena Layer):** HUMAN_SELECT gate -- execution BLOCKS until human explicitly selects winning feature naming package from arena. No auto-selection permitted.

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

**Purpose:** Load strategy scope, campaign brief, specimen patterns, and validate that sufficient capability data exists for feature naming.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load strategy + campaign brief + product research |
| 0.2 | `0.2-specimen-calibrator.md` | Load PG feature naming examples (sf2 pattern) |
| 0.3 | `0.3-input-validator.md` | Validate product capability data present |

**Execution Order:**
1. 0.1, 0.2 in parallel (independent data loading)
2. 0.3 after both complete (validates aggregated data)

**Gate 0:** Strategy loaded with feature research scope, campaign brief loaded with product data, specimen patterns loaded, capability data validated (minimum 4 identifiable capabilities). FAIL = strategy missing OR no feature research scope OR capability data insufficient.

---

### Layer 1: Capability Analysis

**Purpose:** Map all product capabilities, design the feature hierarchy, and load crossover patterns from Skill 15 (Product Introduction).

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-capability-mapper.md` | Map all product capabilities/ingredients/technologies |
| 1.2 | `1.2-hierarchy-designer.md` | Rank features (hero / supporting / technical) |
| 1.3 | `1.3-crossover-loader.md` | Load Skill 15 (Product Introduction) patterns |

**Execution Order:**
1. 1.1 first (capabilities must be mapped before hierarchy)
2. 1.2 after 1.1 (hierarchy depends on complete capability map)
3. 1.3 in parallel with 1.2 (independent pattern loading)

**Gate 1:** All capabilities mapped (minimum 4), hierarchy designed with at least 1 hero + 2 supporting + 1 technical, Skill 15 patterns loaded. FAIL = fewer than 4 capabilities OR no hero feature candidate OR crossover patterns missing.

---

### Layer 2: Feature Naming & Micro-Scripts

**Purpose:** Name every feature using caveman-benefit format and write 1-2 sentence micro-scripts per feature.

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-caveman-benefit-namer.md` | Name features in caveman-benefit format |
| 2.2 | `2.2-micro-script-per-feature.md` | Write 1-2 sentence micro-script per feature |

**Execution Order:**
1. 2.1 first (names must exist before micro-scripts reference them)
2. 2.2 after 2.1 (micro-scripts use the named features)

**Gate 2:** Every capability has a caveman-benefit name, every name passes generic-name screening, every feature has a micro-script. FAIL = any unnamed capability OR generic name detected OR missing micro-script.

---

### Layer 2.5: Arena Persona Panel (Multi-Perspective Generation)

**Purpose:** Generate feature naming packages through 7 competitor personas, then judge against feature-naming-specific criteria with 8.0/10 minimum quality threshold. Human selects winning package.

**Specification File:** `EC-01-ARENA-LAYER.md`

**Execution Protocol:**
1. **Multi-Perspective Generation (Phase 1):** Each of 7 competitors generates their complete feature naming package
2. **Judging Round (Phase 2):** All packages scored against 7 feature-naming criteria
3. **Ranking & Rationale (Phase 3):** Packages ranked with transparent scoring justification
4. **Human Selection Checkpoint (Phase 4):** BLOCKING -- human selects winning package

**Gate 2.5:** Human has explicitly selected feature naming package from arena. FAIL = no human input received OR human requests full regeneration.

---

### Layer 4: Validation & Packaging

**Purpose:** Final validation of feature names, generic-name detection, standalone testing, and output packaging.

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-generic-name-detector.md` | Reject generic names ("Advanced Technology") |
| 4.2 | `4.2-name-standalone-tester.md` | Does name alone communicate what + why? |
| 4.3 | `4.3-output-packager.md` | Package feature-package.json |

**Execution Order:**
1. 4.1, 4.2 in parallel (independent validation checks)
2. 4.3 after both pass (package only validated features)

**Gate 4:** Zero generic names remaining, all names pass standalone test, feature-package.json assembled with all fields. FAIL = generic name detected OR standalone test failure OR package incomplete.

---

## OUTPUT SCHEMA

```json
{
  "feature_package_version": "1.0",
  "generated_at": "ISO timestamp",
  "skill_id": "EC-01-feature-naming",

  "product_name": "Product name",
  "total_features": 8,

  "feature_hierarchy": {
    "hero": [
      {
        "feature_id": "F-001",
        "name": "Dynamic Loft Control",
        "capability": "Automatic loft adjustment based on swing",
        "benefit": "Optimizes launch angle for maximum distance",
        "micro_script": "Dynamic Loft Control automatically adjusts the club face angle during your swing, optimizing launch for maximum carry distance on every shot.",
        "naming_rationale": "Combines the technology (dynamic loft) with the result (control) in 3 words"
      }
    ],
    "supporting": [],
    "technical": []
  },

  "naming_validation": {
    "generic_names_detected": 0,
    "standalone_test_failures": 0,
    "all_names_caveman_benefit": true
  },

  "downstream_handoffs": {
    "ec_02_hero": "hero feature(s) for headline and value prop",
    "ec_03_sections": "all features for section copy",
    "ec_04_scripts": "micro-scripts as script seeds"
  }
}
```

---

## HUMAN CHECKPOINTS

### Required Checkpoint: Feature Package Selection (Arena Gate 2.5)

**When:** After Arena competition, before validation
**Presented:** 7+ feature naming packages with scores and rationale
**Decision Required:** Select one package, modify names, or provide custom
**Override:** Human can select lower-scoring package with rationale
**Timeout:** No timeout -- waits for human decision

### Optional Checkpoint: Hierarchy Review (Post-Layer 1)

**When:** After capability mapping and hierarchy design
**Triggered By:** Ambiguous hero feature (2+ candidates tied) or low confidence
**Presented:** Capability map with proposed hierarchy
**Decision Required:** Approve hierarchy or adjust
**Override:** Human can designate hero feature directly

---

## ERROR HANDLING

| Failure | Remediation |
|---------|-------------|
| Strategy missing feature research scope | HALT -- return to EC-00 |
| Fewer than 4 capabilities identifiable | Request additional product data |
| Generic names persist after detection | Return to Layer 2 for renaming |
| Standalone test failures | Return to Layer 2 for name revision |
| Human rejects all naming packages | Gather feedback, regenerate with new direction |
| Micro-scripts missing for features | Return to 2.2 for completion |

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER accept generic feature names** -- "Advanced Technology", "Premium Materials", "Superior Quality" are auto-rejected.
2. **ALWAYS use caveman-benefit format** -- Name must communicate WHAT it is + WHY it matters.
3. **ALWAYS write micro-scripts** -- Every feature needs a 1-2 sentence micro-script.
4. **SEQUENTIAL layer dependency** -- Each layer must pass its gate before the next begins.
5. **ALWAYS validate with generic detector** -- Layer 4 generic detection is mandatory.
6. **ALWAYS test standalone clarity** -- Name alone must communicate meaning.

### Quality Constraints
7. **Hero feature name must be the strongest** -- Most memorable, most benefit-clear.
8. **No duplicate naming patterns** -- If hero is "[Tech] for [Benefit]", supporting features should vary structure.
9. **Micro-scripts must use the feature name** -- Script references the named feature explicitly.
10. **Feature names should be 2-4 words** -- Exceptions allowed for complex technologies, but brevity preferred.

### Anti-Slop Constraints
11. **ZERO vague qualifiers in names** -- "Advanced", "Premium", "Superior", "Pro", "Ultra" without specifics.
12. **ZERO AI telltales in micro-scripts** -- "Unlock", "harness", "leverage", "journey".
13. **ZERO empty benefit words** -- "Better", "improved", "enhanced", "optimized" without specific outcome.

### Integration Constraints
14. **Feature names must be used consistently downstream** -- EC-02, EC-03, EC-04 must use exact names.
15. **Hero feature must appear in hero section** -- EC-02 headline/subhead references hero feature.
16. **Feature hierarchy must match strategy priority** -- EC-00 priority informs feature prominence.

### Enforcement Constraints
17. **IF generic name detected -> REJECT** -- Return to naming, cannot proceed.
18. **IF standalone test fails -> REVISE** -- Name must communicate without context.
19. **IF fewer than 4 features -> HALT** -- Insufficient depth for ecom page.
20. **IF micro-script missing -> BLOCK** -- Cannot package without micro-scripts.
21. **IF human rejects all packages -> PAUSE** -- Request specific naming direction.

---

## THREE-TIER UNCERTAINTY PROTOCOL

### Tier 1: HIGH CONFIDENCE (>= 0.85)
**Conditions:** Product features well-documented, clear differentiators, comparable products in vault.
**Behavior:** Proceed through naming without additional human checkpoints.

### Tier 2: MODERATE CONFIDENCE (0.65-0.84)
**Conditions:** Some features unclear, hero candidate ambiguous, limited comparable products.
**Behavior:** Present hierarchy for human review, flag ambiguous naming decisions.

### Tier 3: LOW CONFIDENCE (< 0.65)
**Conditions:** Feature data sparse, no clear differentiators, novel product category.
**Behavior:** HALT -- request additional product research or human direction on naming approach.

---

## GUARDRAILS

### Locked Tool Grammar

All skill invocations MUST follow this exact 5-step sequence:
1. **STATE** the skill being called and its specific purpose
2. **VERIFY** all required inputs are available and valid
3. **EXECUTE** the skill with explicit parameters documented
4. **VALIDATE** the output against expected schema and quality thresholds
5. **LOG** the result (PASS/FAIL, key outputs, warnings)

### Post-Tool Reflection

AFTER EVERY SKILL EXECUTION, verify:
1. **Output exists** -- File/object is non-empty
2. **Schema valid** -- Output matches expected contract
3. **Quality gates pass** -- No threshold violations
4. **State updated** -- Session context reflects completed step
5. **Next step identified** -- Next skill confirmed with inputs available

---

## ANTI-SLOP LEXICON

NEVER use these words/phrases in feature names or micro-scripts:

**Generic name patterns:** Advanced Technology, Premium Materials, Superior Quality, Pro System, Ultra Performance, Next-Gen, State-of-the-Art, Best-in-Class, Cutting-Edge
**AI telltales:** unlock, harness, leverage, dive deep, journey, empower, transform, revolutionize
**Empty intensifiers:** literally, absolutely, totally, incredibly, extremely, truly, very
**Vague benefit words:** better, improved, enhanced, optimized, upgraded (without specific outcome)

**REPLACEMENT REQUIREMENT:**
- "Advanced Technology" -> "HyperSpeed Face" or "Tri-Flex Core" (specific mechanism name)
- "Premium Materials" -> "Forged Titanium Frame" (specific material + form)
- "Better performance" -> "15 more yards off the tee" (specific measurable outcome)

---

## REMEDIATION PROTOCOL

| Gate | Common Failures | Remediation |
|------|-----------------|-------------|
| Gate 0 | Strategy missing | HALT -> Request EC-00 execution |
| Gate 0 | Feature scope empty | HALT -> Return to EC-00 for scope definition |
| Gate 1 | Fewer than 4 capabilities | REQUEST -> Additional product data |
| Gate 1 | No hero candidate | REVIEW -> All capabilities for hero potential |
| Gate 2 | Generic names generated | RENAME -> Apply caveman-benefit format strictly |
| Gate 2 | Micro-scripts missing | COMPLETE -> Write scripts for every feature |
| Gate 2.5 | Arena below threshold | REGENERATE -> Additional naming passes |
| Gate 4 | Generic detector finds violations | RETURN -> Layer 2 for renaming |
| Gate 4 | Standalone test failures | RETURN -> Layer 2 for name revision |

### Escalation Protocol
- Max 3 remediation iterations per gate
- After 3 failures: HUMAN CHECKPOINT with full failure log

---

## SESSION PERSISTENCE

```yaml
session_state:
  current_layer: [0-4]
  current_skill: [skill ID just completed]
  completed_skills: [list]
  output_status: [PASS/FAIL/PENDING]
  gate_status:
    gate_0: [PASS/FAIL/PENDING]
    gate_1: [PASS/FAIL/PENDING]
    gate_2: [PASS/FAIL/PENDING]
    gate_2_5: [PASS/FAIL/PENDING]
    gate_4: [PASS/FAIL/PENDING]
  capabilities_mapped: [count]
  features_named: [count]
  generic_names_remaining: [count]
  human_selection_received: [Y/N]
  next_action: [next skill to execute]
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 5-layer architecture with 12 microskills, Arena layer for feature naming competition, caveman-benefit format enforcement, generic-name detection, standalone testing, micro-script generation. |

---

**Skill Status:** COMPLETE -- Full 5-layer architecture with 12 microskills, Arena layer, all guardrails implemented
