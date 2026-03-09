# Bravo — CMO Chief of Staff Agent: Bootstrap Plan

> **Version**: 1.0  
> **Created**: 2026-02-10  
> **Status**: PLANNING  
> **Purpose**: Comprehensive plan for bootstrapping Bravo, John's Chief of Staff agent, modeled after Orion but customized for CMO-level priorities and workflows

---

## Project Intent Summary

**Goal**: Create Bravo, a Strategic Chief of Staff agent for John (CMO) at Performance Golf, modeled after Orion (Christopher's agent) but customized to John's CMO-level priorities, working style, and strategic initiatives.

**Key Objective**: Help John execute on his four core priorities while managing the transition from direct-response-only to a brand-plus-performance model, protecting his time for high-leverage strategic work, and ensuring visibility into progress for the CEO.

---

## Decisions Made

### 1. Agent Identity
- **Name**: Bravo
- **Role**: Strategic Chief of Staff for John (CMO)
- **Model**: Based on Orion's architecture, customized for CMO-level scope
- **Folder**: `bravo-chief-of-staff-cmo/` (already exists)

### 2. Governance & Permissions
- **Model**: Mixed shared/private (to be defined in detail later)
- **Private Data**: 
  - Team member decisions and org chart changes
  - Payroll, salary, bonuses, raises
  - Other items to be determined
- **Shared Data**: To be defined during implementation
- **SSS Access**: Read-only access to Strategic Scaling System (no write permissions)

### 3. Inter-Agent Communication
- **Orion Interaction**: Bravo should communicate with Christopher's Orion agent
- **Protocol**: To be defined during implementation
- **Communication Boundary**: Bravo drafts only (no direct Slack sends); John reviews and sends

### 4. Strategic Focus
- **Priorities**: All four priorities are in scope:
  1. Successful Product Launches (360-degree campaign approach)
  2. Unlocking Lifetime Value (LTV)
  3. Getting the Team Right (AI-empowered organization)
  4. Brand Rollout and Repositioning
- **Projects**: All projects below these priorities are also in scope
- **Sequencing**: Bravo should make recommendations on execution order and flag when workload is too much
- **Timeframe**: Quarterly framework (Q1-Q4 2026)

### 5. Execution Modes (Initial Priority)
All modes are critical, but initial focus on:
1. **CEO Visibility and Updates** — Weekly progress reports with data context
2. **Team Talent Evaluation and Hiring Strategy** — Assessment, recruiting, onboarding
3. **LTV Strategy and Execution** — Lifetime value optimization
4. **Meeting Prep and Triage** — High-volume meeting management

### 6. Architecture
- **Structure**: Mirror Orion's sub-agent architecture
- **Customization**: Sub-agents customized to John's PRD (to be created)
- **Layers**: Follow Orion's Layer 1 (Strategic Core), Layer 2 (Operational Engine), Layer 3 (Support Functions) pattern

### 7. Reference Materials & Folder Structure
- **Brand Guidelines**: Already exist in `pg-skills/pg-brand-guidelines/`
- **Strategic Vision Docs**: Will be stored in `bravo-chief-of-staff-cmo/_reference/`
- **Meeting Transcripts**: `bravo-chief-of-staff-cmo/_ops/meetings/transcripts/`
- **Prep Docs**: `bravo-chief-of-staff-cmo/_ops/meetings/prep/`
- **Existing Agent Specs**: Skip (not needed for bootstrap)

### 8. API & Tool Access
- **Status**: To be determined later
- **Prerequisites**: Need clarity on sub-agents first to determine required integrations

---

## Critical Requirement: Challenger Subagent

### Overview
Bravo must include a **Challenger subagent** (modeled after Orion's Challenger) that is embedded directly in the main `CLAUDE.md` file so it's active in all conversations.

### Purpose
The Challenger helps John:
- Become a better CMO/leader
- See things from different perspectives
- Spot gaps he might be missing
- Improve overall workflows and decision-making

### Implementation Approach
- **Location**: Embedded in `CLAUDE.md` (main agent config file)
- **Activation**: Always-on, active in every conversation
- **Escalation Levels**: FLAG, BLOCK, CONVINCE ME (same as Orion)
- **Focus Areas** (adapted for CMO-level):
  - Strategic alignment with brand mission and quarterly goals
  - CMO altitude (ensuring John stays at strategic level, not tactical)
  - Workload sequencing and capacity management
  - Blind spot detection (stakeholder dynamics, second-order consequences)
  - Decision quality and consistency with brand positioning
  - Workflow optimization and delegation opportunities

### Key Differences from Orion's Challenger
- **Focus**: CMO-level concerns vs. VP-level concerns
  - Orion: "VP narrative", "earn VP title", "30/60/90 scorecard"
  - Bravo: "CMO strategic leverage", "brand mission alignment", "quarterly priorities", "CEO visibility"
- **Metrics**: Quarterly framework vs. 30/60/90-day milestones
- **Stakeholders**: CEO, CFO, CPO, direct reports vs. John (for Orion)
- **Scope**: Company-wide transformation vs. department-level execution

---

## Gaps & Open Questions

### 1. Projects Below Priorities
**Question**: What are the specific "projects below" the four priorities?
- Are these product launches?
- Campaign initiatives?
- Team restructuring tasks?
- Other strategic initiatives?

**Impact**: Needed to map projects to sub-agents and quarterly framework.

### 2. Scorecard/Metrics Framework
**Question**: What's the exact scorecard structure?
- Quarterly (Q1-Q4 2026)?
- 30/60/90-day milestones within quarters?
- Annual with quarterly checkpoints?
- Different metrics per priority?

**Impact**: Affects how Bravo tracks progress and generates CEO updates.

### 3. Sub-Agent Mapping
**Potential Sub-Agents** (to be confirmed):
- **LTV Strategist/Tracker** (Layer 1 or 2)
- **Product Launch Coordinator** (360-degree campaigns) (Layer 2)
- **Team Talent Evaluator/Hiring Advisor** (Layer 2 or 3)
- **Meeting Prep/Triage Engine** (Layer 3)
- **CEO Update Generator** (Layer 3)
- **Brand Rollout Tracker** (Layer 2)
- **Sequencing/Workload Analyzer** (Layer 1 or 2)
- **Challenger** (Layer 1 — embedded in CLAUDE.md)

**Questions**:
- Which sub-agents are needed?
- What's the priority order?
- Should they mirror Orion's layer structure?

### 4. Inter-Agent Bridge Protocol with Orion
**Questions**:
- What data/information flows between Bravo and Orion?
- What triggers communication?
- What's the protocol for coordination?
- Should Bravo read Orion's SESSION-LOG.md or deliverables?

### 5. Core Principle & Agent Identity
**Question**: What's Bravo's core principle?
- Orion uses "Strategic Leverage Principle"
- What governs all of Bravo's decisions?
- What's the agent metaphor? ("the strategist", "the orchestrator", etc.)
- What's the one-sentence role description?

### 6. PRD Creation Process
**Question**: How should we approach PRD creation?
- Start with template Phase 0 (pre-bootstrap)?
- Run intent alignment session first (like Orion's 11-gap process)?
- Create PRD before defining sub-agents, or define sub-agents as part of PRD?

### 7. Non-Negotiables & Phase-Stop Discipline
**Questions**:
- Should Bravo use same phase-stop discipline as Orion?
- What are Bravo-specific non-negotiables?
  - Brand mission alignment (from briefing)
  - Premium creative quality (from briefing)
  - Avoid legacy playbooks (from briefing)
  - Surround-sound campaigns (from briefing)
- Any CMO-specific rules?

### 8. Anti-Degradation Adapter
**Questions**:
- Should Bravo have its own `BRAVO-ANTI-DEGRADATION.md` adapter?
- What agent-specific structural gates are needed?
- Should it reference core system like Orion does?

### 9. Session Protocol & Context Budget
**Questions**:
- Should Bravo follow Orion's session protocol (read SESSION-LOG.md first, handoff on exit)?
- What's the context budget? (What to read, what to skip)
- How should Bravo handle session resumption?

### 10. CEO Update Protocol (Future Task)
**Noted as future work**, but helpful to clarify:
- Format preference? (Like Orion's Creative Lead Update — 3-5 bullets, 60-second read?)
- Frequency? (Weekly? Bi-weekly?)
- What data sources should Bravo scrape? (Domo, Shopify, ClickUp, etc.)
- What's the CEO's preferred delivery method?

---

## Recommended Bootstrap Sequence

Based on the Agent Provisioning Template and Orion's bootstrap pattern:

### Phase 0: Pre-Bootstrap (Information Gathering)
- [ ] Fill in Phase 0.1: Person & Role details
- [ ] Fill in Phase 0.2: Strategic Context (priorities, scorecard, blockers)
- [ ] Gather Phase 0.3: Reference Materials
- [ ] Define Phase 0.4: API & Credentials (defer until sub-agents defined)
- [ ] Resolve Phase 0.5: Governance Decisions (partially done, needs detail)

### Phase 1: Agent Identity & Architecture
- [ ] Define agent name (DONE: Bravo)
- [ ] Define agent role (one sentence)
- [ ] Define agent metaphor
- [ ] Define core principle
- [ ] Define execution modes (initial list done, needs full list)
- [ ] Define sub-agent count and layers
- [ ] Run intent alignment session (gap identification)

### Phase 2: Foundation Documents (Create in Order)
1. [ ] `CLAUDE.md` — Auto-loaded config
   - **CRITICAL**: Embed Challenger subagent directly in this file
   - Identity paragraph
   - Anti-degradation reference
   - Phase-Stop Discipline
   - Non-negotiables (including Challenger always-on)
   - Execution modes table
   - Context budget rules
   - Key references table
   - Common mistakes section
   - Session handoff protocol

2. [ ] `BRAVO-PRD.md` — Full product requirements
   - Scope and boundaries
   - Architecture overview
   - Scorecard/metrics framework
   - Protocols and constraints
   - Sub-agent registry

3. [ ] `BRAVO-MASTER-AGENT.md` — Master agent spec
   - Execution modes (detailed)
   - Sub-agent architecture
   - Decision protocols
   - Session operations

4. [ ] `BRAVO-SUB-AGENTS.md` — Sub-agent specifications
   - Each sub-agent's scope, inputs, outputs, backstory
   - **Include**: Challenger subagent spec (even though embedded in CLAUDE.md)

5. [ ] `BRAVO-ANTI-DEGRADATION.md` — Anti-degradation adapter
   - Reference core system
   - Agent-specific structural gates

6. [ ] `SESSION-LOG.md` — Session history
   - YAML build state
   - Session entries

### Phase 3: Directory Structure
```
bravo-chief-of-staff-cmo/
├── CLAUDE.md                      # Auto-loaded config (with embedded Challenger)
├── BRAVO-PRD.md                   # Product requirements
├── BRAVO-MASTER-AGENT.md          # Master agent spec
├── BRAVO-SUB-AGENTS.md            # Sub-agent specs
├── BRAVO-ANTI-DEGRADATION.md       # Anti-degradation adapter
├── SESSION-LOG.md                 # Session history
├── BRAVO-BOOTSTRAP-PLAN.md        # This document
├── _reference/                    # Input docs (John provides)
│   ├── strategic-vision-docs/    # Strategic vision documents
│   └── [other reference materials]
└── _ops/                          # Operational outputs
    ├── meetings/
    │   ├── transcripts/          # Meeting transcripts
    │   └── prep/                 # Prep docs and agendas
    ├── weekly-updates/           # CEO updates
    ├── decision-log/            # Decision tracking
    └── [other agent-specific dirs]/
```

### Phase 4: Integration
- [ ] Update root Creative OS `CLAUDE.md` (add Bravo to architecture)
- [ ] Document inter-agent bridges (Bravo ↔ Orion)
- [ ] Update MEMORY.md (if applicable)

### Phase 5: Verification
- [ ] All foundation documents exist
- [ ] `CLAUDE.md` loads correctly (test session)
- [ ] Challenger is active in all conversations (verify)
- [ ] SESSION-LOG.md has correct YAML build state
- [ ] Anti-degradation adapter references core system
- [ ] Root CLAUDE.md routing rules include Bravo
- [ ] Inter-agent bridges documented
- [ ] First session completed successfully

---

## Key Design Principles

### 1. Challenger Always-On
The Challenger subagent must be embedded in `CLAUDE.md` so it's active in every conversation. This ensures John receives continuous strategic challenge and gap detection.

### 2. CMO-Level Focus
Bravo operates at CMO altitude, not tactical execution. Focus on:
- Strategic alignment
- Brand mission coherence
- Quarterly priority advancement
- CEO visibility
- Team empowerment and delegation

### 3. Brand Mission Alignment
Every recommendation, challenge, and decision must align with Performance Golf's brand mission: helping everyday golfers play better golf faster.

### 4. Workload Sequencing
Bravo should proactively analyze workload and recommend sequencing when capacity is exceeded.

### 5. Data-Driven Visibility
CEO updates must include scraped data from Domo, Shopify, ClickUp, and other sources to provide context and details.

---

## Next Steps

1. **Resolve Open Questions**: Address gaps identified above
2. **Run Intent Alignment Session**: Modeled on Orion's 11-gap process
3. **Create PRD**: Define scope, scorecard, and sub-agents
4. **Build Foundation Documents**: Start with CLAUDE.md (embedding Challenger)
5. **Test & Iterate**: Complete first session and refine

---

## Reference Documents

- **Agent Provisioning Template**: `_shared/agent-provisioning-template.md`
- **Orion Reference** (consolidated spec): `orion-chief-of-staff/ORION-REFERENCE.md`
- **Orion CLAUDE.md**: `orion-chief-of-staff/CLAUDE.md`
- **John's Briefing**: `bravo-chief-of-staff-cmo/bravo-cmo-chief-of-staff-briefing.md`

---

**Status**: Ready for Phase 0 completion and Phase 1 intent alignment session.
