# S21: Persona Architect — Master Agent

**Version:** 1.0
**Skill:** S21-persona-architect
**Position:** Influencer Network, First Skill
**Type:** Strategic Design + Identity Creation
**Dependencies:** Network Strategy Definition, Brand Voice Guidelines
**Output:** Persona Bible per persona

---

## Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Input validation + teaching loading | haiku | Simple validation and loading |
| 1 | Persona design + identity creation | opus | Complex creative work requiring depth |
| 4 | Output packaging + validation | sonnet | Assembly from existing content |

---

## Purpose

Design complete AI influencer identities with distinct personalities, visual systems, and voice architectures that can operate autonomously within the network. Each persona must feel like a real person with depth, consistency, and unique perspective.

**Success Criteria:**
- Each persona has complete Persona Bible (all 10 sections)
- Personas are distinct from each other (differentiation matrix validates)
- Visual identity generates consistently
- Voice DNA is implementable
- Backstories are believable and consistent

---

## Identity Boundaries

**This skill IS:**
- Persona concept and identity design
- Archetype assignment and framework application
- Sub-niche ownership mapping
- Voice architecture definition
- Visual identity system creation
- Backstory and personality development

**This skill is NOT:**
- Platform-specific content strategy (that's S22)
- Network coordination protocols (that's S23)
- Monetization planning (that's S24)
- Actual content creation (downstream skills)

---

## Layer Map

> **Critical Constraints Reminder (Layer 0)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - All teaching files must be loaded
> - Generic personas are FORBIDDEN

### Layer 0: Foundation (Loading & Validation)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 0.1 | Input Validator | [0.1-input-validator.md](skills/layer-0/0.1-input-validator.md) |
| 0.2 | Teaching Loader | [0.2-teaching-loader.md](skills/layer-0/0.2-teaching-loader.md) |
| 0.3 | Upstream Package Loader | [0.3-upstream-loader.md](skills/layer-0/0.3-upstream-loader.md) |

> **Critical Constraints Reminder (Layer 1 - Phase A: Concept)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Concept Separation applies: generate concepts WITHOUT names first
> - CONCEPT CHECKPOINT required before Phase B

### Layer 1 - Phase A: Concept Development

| Microskill | Purpose | Document |
|------------|---------|----------|
| 1.1 | Niche Ownership Mapping | [1.1-niche-ownership.md](skills/layer-1/1.1-niche-ownership.md) |
| 1.2 | Archetype Selection | [1.2-archetype-selection.md](skills/layer-1/1.2-archetype-selection.md) |
| 1.3 | Identity Concept Generation | [1.3-identity-concepts.md](skills/layer-1/1.3-identity-concepts.md) |
| 1.4 | Backstory Development | [1.4-backstory-development.md](skills/layer-1/1.4-backstory-development.md) |
| 1.5 | Personality Framework | [1.5-personality-framework.md](skills/layer-1/1.5-personality-framework.md) |

**CHECKPOINT:** Human review of persona concepts (without names/packaging)

> **Critical Constraints Reminder (Layer 1 - Phase B: Naming/Packaging)**
> - CANNOT execute unless CONCEPT_APPROVED.yaml exists
> - Now add names, handles, packaging to approved concepts

### Layer 1 - Phase B: Naming and Packaging

| Microskill | Purpose | Document |
|------------|---------|----------|
| 1.6 | Naming and Handles | [1.6-naming-handles.md](skills/layer-1/1.6-naming-handles.md) |
| 1.7 | Visual Identity System | [1.7-visual-identity.md](skills/layer-1/1.7-visual-identity.md) |
| 1.8 | Voice Architecture | [1.8-voice-architecture.md](skills/layer-1/1.8-voice-architecture.md) |
| 1.9 | Content Style Definition | [1.9-content-style.md](skills/layer-1/1.9-content-style.md) |

> **Critical Constraints Reminder (Layer 4)**
> - Read ANTI-DEGRADATION.md before executing
> - All validation gates must pass
> - Network differentiation verified

### Layer 4: Output Packaging

| Microskill | Purpose | Document |
|------------|---------|----------|
| 4.1 | Persona Bible Assembler | [4.1-persona-bible-assembler.md](skills/layer-4/4.1-persona-bible-assembler.md) |
| 4.2 | Network Overview Generator | [4.2-network-overview.md](skills/layer-4/4.2-network-overview.md) |
| 4.3 | Execution Log | [4.3-execution-log.md](skills/layer-4/4.3-execution-log.md) |

---

## Execution Flow

```
                    INPUT: Network Config + Brand Guidelines
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 0: FOUNDATION (haiku)                           │
│   Input Validation → Teaching Loading → Upstream Loading                 │
│                    GATE: LAYER_0_COMPLETE.yaml                           │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                 LAYER 1 PHASE A: CONCEPTS (opus)                         │
│                                                                           │
│   Niche Ownership → Archetype Selection → Identity Concepts              │
│   → Backstory Development → Personality Framework                         │
│                                                                           │
│                    GATE: CONCEPT_APPROVED.yaml                           │
│                    (HUMAN CHECKPOINT - REQUIRED)                         │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                 LAYER 1 PHASE B: NAMING (opus)                           │
│                                                                           │
│   Naming/Handles → Visual Identity → Voice Architecture                  │
│   → Content Style Definition                                             │
│                    GATE: LAYER_1_COMPLETE.yaml                           │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 4: OUTPUT (sonnet)                              │
│   Persona Bible Assembly → Network Overview → Execution Log              │
│                    OUTPUT: Persona Bibles + Network Overview              │
└───────────────────────────────────┴───────────────────────────────────────┘
                                    │
                                    ▼
                    HANDOFF: S22 Account Strategy
```

---

## Output Schema

```yaml
# PERSONA BIBLE
persona_identity:
  persona_id: string
  name:
    first_name: string
    last_name: string
    handles: object
    nickname: string
  archetype: enum [educator, curator, storyteller, provocateur, entertainer, connector, analyst]
  sub_niche:
    primary: string
    secondary: array
    off_limits: array
  demographics: object
  backstory: object
  personality: object

visual_identity:
  face_generation: object
  aesthetic_system: object
  reference_images: array

voice_architecture:
  voice_dna: object
  vocabulary: object
  syntax: object
  emotional_spectrum: object
  examples: object
  platform_adaptations: object
```

---

## Validation Requirements (Quality Gates)

### Gate 1: Uniqueness Verification
- [ ] No two personas share same primary archetype AND sub-niche
- [ ] Each persona has unique name (no similar sounding names)
- [ ] Each persona has distinct visual appearance (different AI seeds)
- [ ] Voice DNA primary trait unique across network
- [ ] Content pillar overlap <15% between any two personas

### Gate 2: Believability Audit
- [ ] Backstory is internally consistent
- [ ] Credentials are defensible (not overclaimed)
- [ ] Demographics match niche expectations
- [ ] Voice matches claimed background
- [ ] Visual appearance matches stated demographics

### Gate 3: Operational Viability
- [ ] AI face generation produces consistent results
- [ ] Voice guidelines are clear enough for content creation
- [ ] Content pillars have sufficient depth for sustained posting
- [ ] Character can be maintained across all planned platforms

### Gate 4: Network Cohesion
- [ ] Personas could believably interact naturally
- [ ] Cross-promotion opportunities exist
- [ ] Network covers target audience segments
- [ ] No competitive cannibalization between personas

---

## Constraints

### Input Constraints
- NEVER proceed without network_config.total_personas (min 3, max 12)
- NEVER proceed without master_brand identity
- NEVER proceed without niche_ecosystem definition
- NEVER accept generic audience segments

### Layer 1 Phase A Constraints
- NEVER assign same archetype to personas covering same sub-niche
- NEVER create generic personas ("AI expert", "Marketing guru")
- NEVER skip backstory development — depth is required
- NEVER create personas without distinct sub-niche ownership
- NEVER proceed to Phase B without CONCEPT_APPROVED.yaml

### Layer 1 Phase B Constraints
- NEVER create similar-sounding names across network
- NEVER use same visual attributes for multiple personas
- NEVER copy voice characteristics between personas
- NEVER create personas that sound identical

### Output Constraints
- NEVER output Persona Bible without all 10 sections complete
- NEVER output without differentiation matrix validation
- NEVER output with placeholder data in required fields

---

## The 7 Persona Archetypes

| Archetype | Core Function | Best For | Monetization Strengths |
|-----------|---------------|----------|------------------------|
| **Educator** | Teach, explain, demystify | Complex topics, skill-building | Courses, coaching, paid communities |
| **Curator** | Filter, organize, recommend | Product-heavy niches, lifestyle | Affiliate marketing, sponsored content |
| **Storyteller** | Narrate, inspire, connect emotionally | Personal development, journeys | Books, speaking, high-ticket programs |
| **Provocateur** | Challenge, disrupt, question norms | Crowded niches, opinion-based | Premium memberships, consulting |
| **Entertainer** | Delight, amuse, provide escape | Broad appeal, brand awareness | Brand sponsorships, merchandise |
| **Connector** | Build community, facilitate | Professional niches, B2B | Events, memberships, partnerships |
| **Analyst** | Research, data-drive, predict | Finance, tech, strategy | Research reports, consulting |

---

## Concept Separation Protocol

**Phase A: Generate CONCEPTS**
- Sub-niche ownership
- Archetype rationale
- Identity concept (WITHOUT name)
- Backstory outline
- Personality traits

**CHECKPOINT: HUMAN REVIEW** (concepts only, no packaging)

**Phase B: Add NAMES/PACKAGING** (only after approval)
- Persona name and handles
- Visual identity system
- Voice architecture
- Content style definition

**Rationale:** Good names can make weak concepts seem better than they are. Evaluate concepts on merit first.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-05 | Initial decomposition from monolithic SKILL.md |
