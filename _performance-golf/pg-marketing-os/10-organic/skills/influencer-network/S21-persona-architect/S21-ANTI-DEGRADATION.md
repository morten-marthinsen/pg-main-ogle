# S21-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-05
**Purpose:** STRUCTURAL enforcement to prevent persona design process breakdown
**Authority:** This document has EQUAL authority to ORGANIC-ENGINE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: S21-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Create generic personas like "AI Expert" or "Marketing Guru" without specific identity depth. Skip differentiation analysis and allow archetype + sub-niche overlap. Bypass Concept Checkpoint and name personas before concepts are approved.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI creates generic personas ("AI Expert", "Marketing Guru")
- AI skips differentiation analysis between personas
- AI creates personas without believable backstories
- AI assigns same archetype to overlapping sub-niches
- AI skips Concept Checkpoint and names personas prematurely
- AI creates personas that all sound the same

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: FORBIDDEN RATIONALIZATIONS

**NEVER accept these justifications:**

| Forbidden Phrase | Why It's Forbidden | Correct Response |
|-----------------|-------------------|------------------|
| "Generic personas are easier to scale" | Generic = unauthentic = audience sees through | Stop. Create specific, detailed personas. |
| "Archetype overlap is fine if content differs" | Same archetype + same niche = competitive cannibalization | Stop. Different archetype OR different sub-niche required. |
| "We can flesh out backstory later" | Personas without depth feel fake immediately | Stop. Complete backstory NOW. |
| "Names don't matter that much" | Names signal authenticity and memorability | Stop. Names matter. Choose carefully. |
| "We can approve concepts and names together" | Good names prop up weak concepts | Stop. Concepts first, names after approval. |

---

## STRUCTURAL FIX 2: MANDATORY CHECKPOINT FILES

### Concept Checkpoint (Gate Between Phase A and Phase B)

**Phase B (Naming) CANNOT execute unless this file exists:**
```
[project]/S21-persona-architect/checkpoints/CONCEPT_APPROVED.yaml
```

**Checkpoint File Format:**
```yaml
# CONCEPT_APPROVED.yaml
skill: "S21-persona-architect"
status: APPROVED
timestamp: "[ISO 8601]"

approved_concepts:
  - persona_id: P001
    archetype: "[Archetype]"
    sub_niche_primary: "[Sub-niche]"
    identity_concept: "[Description WITHOUT name]"
    backstory_outline: "[Key points]"
    personality_traits: ["[trait1]", "[trait2]", "[trait3]"]

  - persona_id: P002
    [Same structure]

differentiation_verified: true

human_approval:
  approved_by: "[Name]"
  approval_date: "[Date]"
  notes: "[Any guidance]"
```

**Layer 1 Phase B CANNOT execute unless this file exists.**

---

## STRUCTURAL FIX 3: FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|--------------|-----------|----------|------------|
| Generic persona created | Check for vague descriptors ("expert", "guru", "enthusiast") | REJECT persona, require specific identity | Human review if 2+ personas rejected |
| Archetype + sub-niche overlap | Check matrix: no two personas same archetype AND same primary sub-niche | REJECT assignment, require differentiation | Immediate halt if overlap after correction |
| Missing backstory depth | Check backstory.origin_story has 200+ words, specific details | REJECT backstory, require depth | Human review if multiple shallow backstories |
| Voice DNA not unique | Check voice_dna.primary_trait unique across network | REJECT voice, require uniqueness | Immediate halt if 2+ personas same voice DNA |
| Concept Checkpoint bypassed | Check CONCEPT_APPROVED.yaml exists before Phase B execution | HALT execution, create checkpoint | Immediate escalation |
| Personas sound identical | Read voice examples, check for distinct style | REJECT voice architecture, require distinction | Human review if 2+ personas too similar |

---

## STRUCTURAL FIX 4: MINIMUM THRESHOLDS

**Persona Bible cannot be marked COMPLETE unless:**

| Element | Minimum | Actual | Verified |
|---------|---------|--------|----------|
| Backstory origin_story word count | 200 words | ___ | ☐ |
| Voice examples provided | 10 | ___ | ☐ |
| Reference images (visual) | 10 | ___ | ☐ |
| Content pillar definition | 3 | ___ | ☐ |
| Personality core_values | 3 | ___ | ☐ |
| Catchphrases | 2 | ___ | ☐ |
| Differentiation from other personas | Verified | ___ | ☐ |

**If any minimum not met → status = INCOMPLETE**

---

## STRUCTURAL FIX 5: BINARY GATE ENFORCEMENT

**Gates can ONLY have these statuses:**
- `PASS` — all criteria met, proceed
- `FAIL` — criteria not met, stop and remediate

**NEVER use:**
- "conditional pass"
- "partial pass"
- "pass with warnings"
- "provisionally approved"

**If a gate file exists, it MUST say PASS. Any other content means DELETE THE FILE.**

---

## STRUCTURAL FIX 6: MANDATORY READ BEFORE EXECUTION

**The agent MUST read these files BEFORE starting S21:**

1. `S21-AGENT.md` — master agent protocol
2. `S21-ANTI-DEGRADATION.md` — THIS FILE
3. `skills/layer-0/0.1-input-validator.md` — input validation protocol
4. `[project]/network-strategy-definition.yaml` — network parameters
5. `[project]/brand-voice-guidelines.yaml` — brand context
6. `organic/skills/influencer-network/teachings/archetype-framework.md` — archetype definitions

**Execution without reading = automatic FAIL**

---

## STRUCTURAL FIX 7: PER-MICROSKILL OUTPUT PROTOCOL

**Every microskill produces its own file. No exceptions.**

**Layer 1 Phase A Required Files (5 files):**
```
1.1-niche-ownership-map.yaml
1.2-archetype-assignments.yaml
1.3-identity-concepts.yaml (WITHOUT names)
1.4-backstory-outlines.yaml
1.5-personality-frameworks.yaml
```

**Checkpoint Required Before Phase B:**
```
CONCEPT_APPROVED.yaml (in checkpoints/)
```

**Layer 1 Phase B Required Files (4 files):**
```
1.6-naming-handles.yaml
1.7-visual-identity-systems.yaml
1.8-voice-architectures.yaml
1.9-content-style-definitions.yaml
```

**Layer 4 Required Files (3 files per persona + network overview):**
```
[persona-id]-persona-bible.md
network-overview.md
execution-log.md
```

**If a microskill is marked "complete" but its output file doesn't exist → it didn't happen.**

---

## STRUCTURAL FIX 8: PROJECT INFRASTRUCTURE REQUIREMENTS

**Before ANY S21 execution, these MUST exist:**

```
[project]/S21-persona-architect/
├── PROJECT-STATE.md (tracks current phase, blockers, decisions)
├── PROGRESS-LOG.md (timestamped log of all actions)
├── checkpoints/ (CONCEPT_APPROVED.yaml, LAYER_1_COMPLETE.yaml)
└── outputs/ (Persona Bibles destination)
```

**Missing infrastructure = execution cannot proceed**

---

## STRUCTURAL FIX 9: STALE ARTIFACT CLEANUP

**Before starting Layer 1, DELETE these if they exist from previous failed attempts:**

```
[project]/S21-persona-architect/outputs/*.md
[project]/S21-persona-architect/checkpoints/CONCEPT_APPROVED.yaml
[project]/S21-persona-architect/checkpoints/LAYER_1_COMPLETE.yaml
```

**Stale checkpoints create false progression signals.**

---

## Per-Microskill Output Requirements

| Microskill | Output File | Minimum Content | Verified |
|------------|-------------|-----------------|----------|
| 1.1 | niche-ownership-map.yaml | Sub-niche matrix, ownership assignments, <15% overlap | ☐ |
| 1.2 | archetype-assignments.yaml | Archetype per persona with rationale, balance check | ☐ |
| 1.3 | identity-concepts.yaml | Concepts WITHOUT names, 200+ word descriptions | ☐ |
| 1.4 | backstory-outlines.yaml | Origin, struggle, transformation, mission per persona | ☐ |
| 1.5 | personality-frameworks.yaml | MBTI, values, quirks, catchphrases per persona | ☐ |
| **CHECKPOINT** | **CONCEPT_APPROVED.yaml** | **Human approval required** | ☐ |
| 1.6 | naming-handles.yaml | Unique names + handles per platform | ☐ |
| 1.7 | visual-identity-systems.yaml | AI generation specs, color palettes, 10+ reference images | ☐ |
| 1.8 | voice-architectures.yaml | Voice DNA, vocabulary, syntax, 10+ examples | ☐ |
| 1.9 | content-style-definitions.yaml | Format preferences, pillar definitions per persona | ☐ |
| 4.1 | [persona]-persona-bible.md | Complete 10-section Persona Bible per persona | ☐ |
| 4.2 | network-overview.md | Differentiation matrix, relationship map, platform distribution | ☐ |
| 4.3 | execution-log.md | Timestamped decisions and rationale | ☐ |

---

## The Generic Persona Test

**If any of these apply, the persona is GENERIC and must be rejected:**

- [ ] Name sounds like a placeholder ("Sarah Marketing", "Tech Tom")
- [ ] Archetype without specific expertise ("Educator" with no teaching specialty)
- [ ] Backstory could apply to anyone ("Always loved [topic]")
- [ ] Sub-niche is too broad ("Marketing", "AI", "Business")
- [ ] Voice DNA uses generic descriptors ("Professional", "Friendly")
- [ ] No specific quirks or personality traits
- [ ] Credentials are vague ("Expert in [field]")
- [ ] Could swap with competitor persona without noticing

**SPECIFIC is the opposite of GENERIC:**
- ✓ "Maya Chen — Former content strategist turned AI writing tools educator"
- ✓ "Jordan Rivers — Provocateur debating AI ethics in creative work"
- ✓ "Sam Torres — Curator reviewing and comparing 50+ AI tools"

---

## Differentiation Validation

**Before marking Layer 4 complete, verify:**

```
DIFFERENTIATION MATRIX

                | Archetype | Sub-Niche | Age | Energy | Visual | Hook Style |
----------------|-----------|-----------|-----|--------|--------|------------|
Persona 1       | [Type]    | [Niche]   | XX  | [Lvl]  | [Style]| [Type]     |
Persona 2       | [Type]    | [Niche]   | XX  | [Lvl]  | [Style]| [Type]     |
Persona 3       | [Type]    | [Niche]   | XX  | [Lvl]  | [Style]| [Type]     |

OVERLAP CHECK:
□ No two personas share: Same Archetype + Same Sub-Niche
□ Ages span at least 5 years
□ Energy levels vary (High/Medium/Low distribution)
□ Visual styles are distinct
□ Hook styles differ
```

---

*Degradation is prevented through structure, not instructions.*
