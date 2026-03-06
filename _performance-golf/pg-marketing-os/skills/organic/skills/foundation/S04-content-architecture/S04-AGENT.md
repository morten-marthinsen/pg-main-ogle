# S04: Content Architecture — Master Agent

**Version:** 1.0
**Skill:** S04-content-architecture
**Position:** Foundation Phase, Step 4
**Type:** Strategic Architecture (Leaf Skill)
**Dependencies:** S01-audience-intelligence, S02-platform-strategy, S03-brand-voice
**Output:** Content Architecture File (CAF)

---

## Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Input validation + teaching/specimen loading | haiku | Simple validation + file loading |
| 1 | Architecture design (pillars, functions, series, formats, funnel) | opus | Strategic design requiring deep analysis |
| 4 | Output assembly + execution log | sonnet | Assembly from existing content |

---

## Purpose

Design the structural framework for all content. Pillars, series, formats, and funnel integration. Without architecture, content is random output. With it, every piece builds toward a destination.

**Success Criteria:**
- 3-5 content pillars defined and mapped to audience needs
- Content function mix totaling 100%
- At least 1 recurring content series designed
- Format matrix with 3+ formats defined
- Funnel integration with clear CTAs
- Weekly calendar framework established
- All validation gates passed

---

## Identity Boundaries

**This skill IS:**
- Content pillar definition based on audience intelligence
- Content function mapping (awareness/engagement/conversion/community)
- Series architecture design
- Format matrix creation
- Funnel and CTA strategy
- Calendar framework design

**This skill IS NOT:**
- Specific content creation (that's S08-S13)
- Hook writing (that's S05)
- Platform algorithm optimization details
- Specific post captions or scripts

---

## Layer Map

```
Layer 0: Input Validation + Context Loading
├── 0.1 Input Validator
├── 0.2 Teaching Loader (Hormozi, Vaynerchuk, Miller, content funnel frameworks)
├── 0.3 Specimen Loader (architecture examples, series formats)
└── 0.4 Upstream Loader (AIF, PSF, BVF)

Layer 1: Architecture Design
├── 1.1 Pillar Definition (3-5 pillars mapped to audience needs)
├── 1.2 Function Mapping (awareness/engagement/conversion/community percentages)
├── 1.3 Series Architecture (recurring series design)
├── 1.4 Format Matrix (format variations by platform)
├── 1.5 Funnel Integration (content → CTA → offer path)
└── 1.6 Calendar Framework (weekly rhythm + posting cadence)

Layer 4: Output Assembly
├── 4.1 CAF Assembler (compile complete Content Architecture File)
└── 4.2 Execution Log (document decisions and rationale)
```

---

## Positional Reinforcement

### Before Layer 1
You are ONLY doing architecture. No content creation. No hook writing. Just the structural framework that guides all future content decisions.

### Before Layer 4
You are assembling the CAF. Verify all required sections are populated. Ensure percentages sum to 100%. Check that pillars map to AIF audience needs.

---

## Pre-Execution Requirements

**BEFORE any S04 execution, complete these steps:**

1. **READ** `S04-ANTI-DEGRADATION.md` — mandatory
2. **VALIDATE** all upstream inputs exist (AIF, PSF, BVF)
3. **CREATE** project infrastructure:
   - `[project]/S04-content-architecture/outputs/`
   - `[project]/S04-content-architecture/checkpoints/`
4. **DELETE** any stale artifacts from previous attempts
5. **ONLY THEN** begin Layer 0

---

## Concept Separation Protocol

**This skill HAS concept/naming separation.**

**Phase A: Pillar and Series Concepts (Layer 1.1-1.3)**
- Develop pillar concepts WITHOUT naming them
- Design series concepts WITHOUT naming them
- Focus on strategic positioning, audience fit, business connection

**CONCEPT CHECKPOINT (Gate 1A)**
- Human reviews pillar and series CONCEPTS
- Human approves strategic direction
- Only concepts proceed to naming

**Phase B: Naming and Detailed Design (Layer 1.4-1.6)**
- Name approved pillars
- Name approved series
- Build out format matrix, funnel integration, calendar framework

**Rationale:** Good names can make weak concepts seem strong. Evaluating concepts separately prevents packaging bias.

---

## Output Location

```
marketing-os/skills/organic/skills/foundation/S04-content-architecture/outputs/[campaign-name]-CAF.yaml
```

---

## Validation Requirements

CAF must pass Gate G04 with these criteria:
- content_pillars (≥3 pillars defined)
- Each pillar has audience_need mapped to AIF
- content_functions percentages sum to 100%
- content_series (≥1 series defined)
- format_matrix (≥3 formats defined)
- funnel_integration.cta_strategy (primary CTA defined)
- calendar_framework.weekly_rhythm (all 7 days defined)
- calendar_framework.posting_cadence (≥1 platform defined)

---

*Architecture is invisible until you see the chaos that exists without it.*
