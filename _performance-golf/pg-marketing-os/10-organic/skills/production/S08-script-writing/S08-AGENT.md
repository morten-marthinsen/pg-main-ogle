# S08: Script Writing — Master Agent

**Version:** 1.0
**Skill:** S08-script-writing
**Position:** Production Phase
**Type:** Content Generation + Arena
**Dependencies:** S07 Campaign Brief (Gate G07)
**Output:** Platform-native video scripts

---

## Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Input validation + teaching/specimen loading | haiku | Simple validation and file loading |
| 1 | Platform analysis, format selection, hook strategy | sonnet | Classification and strategic planning |
| 2 | Script drafting (generation) | opus | Creative content generation |
| 2.5 | Arena competition | opus | ALL Arena rounds |
| 4 | Script assembly + execution log | sonnet | Assembly from existing content |

---

## Purpose

Produce platform-native video scripts optimized for attention, retention, and conversion. Every script MUST run through the 7-persona Arena before finalization.

**Success Criteria:**
- Minimum 3 scripts per campaign (per CBF requirements)
- Each script has hook (0-3 seconds), body, and CTA
- Platform-native formatting (NOT cross-posted)
- Timing annotations and visual direction included
- Arena completed (3 rounds, 7 personas)
- Virality score >= 60

---

## Identity Boundaries

**This skill IS:**
- Video script creation (Reels, TikTok, YouTube Shorts, long-form)
- Hook-body-CTA structure design
- Timing annotations for video production
- Visual direction notes per segment
- Platform-specific script adaptation
- Arena-driven script refinement

**This skill is NOT:**
- Captions (that's S09)
- Carousel content (that's S10)
- Visual production (that's S12)
- Final assembly (that's S14)
- Scheduling (that's S15)

---

## Layer Map

> **Critical Constraints Reminder (Layer 0)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only
> - All teaching AND specimen files must be loaded

### Layer 0: Foundation (Loading & Validation)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 0.1 | Input Validator | [0.1-input-validator.md](skills/layer-0/0.1-input-validator.md) |
| 0.2 | Teaching Loader | [0.2-teaching-loader.md](skills/layer-0/0.2-teaching-loader.md) |
| 0.3 | Specimen Loader | [0.3-specimen-loader.md](skills/layer-0/0.3-specimen-loader.md) |
| 0.4 | CBF Loader | [0.4-cbf-loader.md](skills/layer-0/0.4-cbf-loader.md) |

> **Critical Constraints Reminder (Layer 1)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Platform analysis determines script structure

### Layer 1: Strategic Planning

| Microskill | Purpose | Document |
|------------|---------|----------|
| 1.1 | Platform Analysis | [1.1-platform-analysis.md](skills/layer-1/1.1-platform-analysis.md) |
| 1.2 | Format Selection | [1.2-format-selection.md](skills/layer-1/1.2-format-selection.md) |
| 1.3 | Hook Strategy | [1.3-hook-strategy.md](skills/layer-1/1.3-hook-strategy.md) |
| 1.4 | Script Structure Planning | [1.4-script-structure-planning.md](skills/layer-1/1.4-script-structure-planning.md) |

> **Critical Constraints Reminder (Layer 2)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Each script labeled "PRE-ARENA" until Arena complete

### Layer 2: Script Generation

| Microskill | Purpose | Document |
|------------|---------|----------|
| 2.1 | Hook Drafting | [2.1-hook-drafting.md](skills/layer-2/2.1-hook-drafting.md) |
| 2.2 | Body Script Writing | [2.2-body-script-writing.md](skills/layer-2/2.2-body-script-writing.md) |
| 2.3 | CTA Design | [2.3-cta-design.md](skills/layer-2/2.3-cta-design.md) |
| 2.4 | Visual Direction Notes | [2.4-visual-direction-notes.md](skills/layer-2/2.4-visual-direction-notes.md) |

> **Critical Constraints Reminder (Layer 2.5)**
> - Read ANTI-DEGRADATION.md before executing
> - 3 rounds mandatory, NO exceptions
> - All 7 personas must compete

### Layer 2.5: Arena

| Microskill | Purpose | Document |
|------------|---------|----------|
| 2.5.1 | Arena Submission | [2.5.1-arena-submission.md](skills/layer-2.5/2.5.1-arena-submission.md) |
| 2.5.2 | Adversarial Critique | [2.5.2-adversarial-critique.md](skills/layer-2.5/2.5.2-adversarial-critique.md) |
| 2.5.3 | Synthesis | [2.5.3-synthesis.md](skills/layer-2.5/2.5.3-synthesis.md) |

> **Critical Constraints Reminder (Layer 4)**
> - Read ANTI-DEGRADATION.md before executing
> - All validation requirements must pass
> - Output schema must be complete

### Layer 4: Output Packaging

| Microskill | Purpose | Document |
|------------|---------|----------|
| 4.1 | Output Assembler | [4.1-output-assembler.md](skills/layer-4/4.1-output-assembler.md) |
| 4.2 | Execution Log | [4.2-execution-log.md](skills/layer-4/4.2-execution-log.md) |

---

## Execution Flow

```
                INPUT: CBF + Script Requests
                            │
                            ▼
┌───────────────────────────────────────────────────────────┐
│              LAYER 0: FOUNDATION (haiku)                  │
│   Input Validation → Teaching → Specimens → CBF Loading  │
│              GATE: LAYER_0_COMPLETE.yaml                  │
└─────────────────────────┬─────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────┐
│           LAYER 1: STRATEGIC PLANNING (sonnet)            │
│   Platform Analysis → Format Selection → Hook Strategy   │
│   → Script Structure Planning                             │
│              GATE: LAYER_1_COMPLETE.yaml                  │
└─────────────────────────┬─────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────┐
│          LAYER 2: SCRIPT GENERATION (opus)                │
│   Hook Drafting → Body Writing → CTA Design →            │
│   Visual Direction Notes                                  │
│   Scripts labeled "PRE-ARENA"                             │
│              GATE: LAYER_2_COMPLETE.yaml                  │
└─────────────────────────┬─────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────┐
│              LAYER 2.5: ARENA (opus)                      │
│   7 Personas × 3 Rounds → Synthesis → Human Selection    │
│              GATE: ARENA_COMPLETE.yaml                    │
└─────────────────────────┬─────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────┐
│              LAYER 4: OUTPUT (sonnet)                     │
│   Script Assembly → Validation → Execution Log           │
│              OUTPUT: [campaign]-scripts/                  │
└─────────────────────────┴─────────────────────────────────┘
                          │
                          ▼
              HANDOFF: S14 Content Assembly
```

---

## Output Schema

```yaml
# SCRIPT OUTPUT FILE
script_id:
campaign_name:
platform:
format: # Reel/TikTok/Short/Long-form
target_length_seconds:
date_created:
version: "1.0"

metadata:
  content_title:
  content_pillar:
  content_function:
  hook_type:
  tone:

script_structure:
  hook:
    timing: "0:00-0:03"
    visual_direction: |
    speaking: |
    text_overlay: |
    production_notes: |

  context:
    timing:
    visual_direction: |
    speaking: |
    text_overlay: |
    production_notes: |

  value_section_1:
    timing:
    visual_direction: |
    speaking: |
    pattern_interrupt_at: "0:XX"
    text_overlay: |
    production_notes: |

  # Additional value sections as needed

  cta:
    timing:
    visual_direction: |
    speaking: |
    text_overlay: |
    production_notes: |

production_specs:
  pacing: # Fast/Medium/Slow
  energy: # High/Medium/Calm
  broll_needed: []
  graphics_needed: []

virality_score:
  ea: # /10
  sc: # /10
  pi: # /10
  pf: # /10
  sh: # /10
  total: # /100
  rationale: |

arena_notes:
  strongest_personas: []
  key_synthesis_decisions: []
  human_selection: |

quality_gates_passed:
  - hook_taxonomy_followed: true
  - platform_requirements_met: true
  - pattern_interrupts_present: true
  - cta_clear: true
  - arena_complete: true
  - virality_score_met: true
  - anti_slop_passed: true
```

---

## Validation Requirements (Gate G08)

- [ ] script_structure.hook exists with timing 0-3 seconds
- [ ] script_structure.body sections complete
- [ ] script_structure.cta clear and specific
- [ ] visual_direction provided for all sections
- [ ] timing_annotations accurate
- [ ] platform native (not cross-posted template)
- [ ] arena_notes.strongest_personas (≥2)
- [ ] virality_score.total ≥ 60

---

## Constraints

### Input Constraints
- NEVER proceed without CBF loaded and validated
- NEVER proceed without platform specified
- NEVER accept vague script requests without target length

### Layer 1 Constraints
- NEVER plan cross-platform scripts — each platform gets unique structure
- NEVER skip hook strategy — hooks determine retention
- NEVER assume format — TikTok ≠ Reel ≠ Short

### Layer 2 Constraints
- NEVER write hook longer than 3 seconds (short-form)
- NEVER skip visual direction notes
- NEVER forget timing annotations
- NEVER write CTA without referring to CBF funnel strategy
- NEVER label final until Arena complete

### Arena Constraints (Layer 2.5)
- NEVER run fewer than 3 rounds
- NEVER skip any of the 7 personas
- NEVER proceed without human selection after Arena
- NEVER accept mono-voice output

### Output Constraints
- NEVER output without virality score >= 60
- NEVER output without all validation requirements passing
- NEVER output placeholder content in required fields

---

## Script Architecture Templates

### Short-Form Structure (15-60 seconds)
```
HOOK (0-3s): Pattern interrupt + curiosity
CONTEXT (3-8s): Why this matters NOW
VALUE (8-45s): Dense content, no filler
CTA (final 3-5s): Single clear action
```

### Long-Form Structure (8+ minutes)
```
COLD OPEN (0-30s): Most compelling moment
INTRO + PROMISE (30-90s): What they'll learn + authority
BODY SECTIONS (bulk): 3-7 sections with re-engagement hooks
CLOSE + CTA (30-60s): Summary + next step
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-05 | Initial decomposition from monolithic SKILL.md. Model assignment table, 4-layer structure with Arena (2.5), 17 microskills, platform-native enforcement, virality scoring requirements. |
