# S05: Hook Library — Master Agent

**Version:** 1.0
**Skill:** S05-hook-library
**Position:** Foundation Phase, Step 5
**Type:** Expression Architecture + Generation (Leaf Skill)
**Dependencies:** S01-audience-intelligence, S02-platform-strategy, S03-brand-voice, S04-content-architecture
**Output:** Hook Library File (HLF)

---

## Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Input validation + teaching/specimen loading | haiku | Simple validation + file loading |
| 1 | Hook generation (taxonomy, templates, platform optimization, pillar hooks, voice calibration) | opus | Creative expression requiring deep audience understanding |
| 4 | Output assembly + execution log | sonnet | Assembly from existing content |

---

## Purpose

Build a campaign-specific library of hooks calibrated to audience, platform, and voice. The hook is everything in a 3-second attention world. Without a hook library, every piece of content starts from zero.

**Success Criteria:**
- Hook taxonomy internalized (7 categories)
- Platform-specific optimization for primary platform
- Hooks generated for each content pillar
- Voice calibration ensuring hooks match BVF
- Tiered library (proven, high-confidence, to-test)
- Testing plan defined
- All validation gates passed

---

## Identity Boundaries

**This skill IS:**
- Hook taxonomy application to specific campaign
- Platform-optimized hook generation
- Pillar-specific hook libraries
- Voice calibration of hooks to BVF
- Hook testing methodology

**This skill IS NOT:**
- Full content creation (that's S08-S13)
- Platform algorithm hacking
- Body copy or full scripts
- Visual design

---

## Layer Map

```
Layer 0: Input Validation + Context Loading
├── 0.1 Input Validator
├── 0.2 Teaching Loader (Kane, Berger, Cialdini, Heath)
├── 0.3 Specimen Loader (hook taxonomy, viral specimens, competitor hooks)
└── 0.4 Upstream Loader (AIF, PSF, BVF, CAF)

Layer 1: Hook Library Generation
├── 1.1 Taxonomy Internalization (7 hook categories + mechanisms)
├── 1.2 Template Generation (templates for each category)
├── 1.3 Platform Optimization (platform-specific hook adaptations)
├── 1.4 Pillar Hook Generation (hooks for each content pillar)
├── 1.5 Voice Calibration (ensure hooks match BVF)
└── 1.6 Testing Plan Design (A/B test methodology)

Layer 4: Output Assembly
├── 4.1 HLF Assembler (compile complete Hook Library File)
└── 4.2 Execution Log (document hook decisions and rationale)
```

---

## Positional Reinforcement

### Before Layer 1
You are ONLY generating hooks. Not full content, not body copy, not captions. Just hooks — the first 1-3 seconds that stop the scroll.

### Before Layer 4
You are assembling the HLF. Verify all hook categories populated, voice calibration complete, minimum hook counts met.

---

## Pre-Execution Requirements

**BEFORE any S05 execution, complete these steps:**

1. **READ** `S05-ANTI-DEGRADATION.md` — mandatory
2. **VALIDATE** all upstream inputs exist (AIF, PSF, BVF, CAF)
3. **CREATE** project infrastructure:
   - `[project]/S05-hook-library/outputs/`
   - `[project]/S05-hook-library/checkpoints/`
4. **DELETE** any stale artifacts from previous attempts
5. **ONLY THEN** begin Layer 0

---

## Concept Separation Protocol

**This skill HAS concept/naming separation.**

**Phase A: Hook Concepts (Layer 1.1-1.3)**
- Internalize taxonomy
- Generate templates
- Design platform optimizations
- Focus on STRUCTURE and MECHANISMS, not specific hooks yet

**CONCEPT CHECKPOINT (Gate 1A)**
- Human reviews hook taxonomy application
- Human approves hook directions
- Only approved directions proceed to generation

**Phase B: Hook Generation (Layer 1.4-1.6)**
- Generate pillar-specific hooks
- Voice-calibrate all hooks
- Create tiered library
- Design testing plan

**Rationale:** Good hooks can validate weak strategic positioning. Evaluating hook strategy separately prevents execution from masking strategic problems.

---

## Output Location

```
marketing-os/organic/core-message/S05-hook-library/outputs/[campaign-name]-HLF.yaml
```

---

## Validation Requirements

HLF must pass Gate G05 with these criteria:
- hook_categories (all 7 categories defined)
- platform_hooks (primary platform fully defined)
- pillar_hooks (hooks for each pillar from CAF)
- ready_to_use_hooks.tier_1_proven (≥10 hooks)
- ready_to_use_hooks.tier_2_high_confidence (≥20 hooks)
- never_use (≥5 anti-patterns)
- All hooks pass BVF voice check

---

*The hook is not the beginning of content. The hook IS the content — everything else is proof.*
