# S23 Network Coordination Agent

## Purpose
Coordinate multiple AI personas as a coherent network. Manage cross-posting, engagement choreography, narrative consistency, and network-level campaigns. Orchestrate the multi-persona system as unified strategy.

## Version
v1.0 | 2026-03-05

## Dependencies
**Upstream:**
- S21 Persona Bibles (all persona-bible-[name].md)
- S21 Network Overview (network-overview.md)
- S22 Account Strategy Plans (all account-plan-[persona]-[platform].md)
- S22 Cross-Promotion Map (cross-promotion-map.md)

## Layer Architecture

### Layer 0: Input & Context Loading
**Model:** claude-3-5-haiku-20241022

| Microskill | File | Purpose |
|------------|------|---------|
| 0.1 | input-validator.md | Validate Persona Bibles, Account Plans, cross-promotion map exist |
| 0.2 | teaching-loader.md | Load network coordination frameworks, engagement choreography, narrative sequencing |
| 0.3 | upstream-loader.md | Load S21 Bibles, S22 Account Plans, cross-promotion strategies |

### Layer 1: Coordination Strategy
**Model:** claude-opus-4-20250514

| Microskill | File | Purpose |
|------------|------|---------|
| 1.1 | network-calendar-sync.md | Synchronize posting schedules across personas for momentum and coverage |
| 1.2 | engagement-choreography.md | Plan organic-looking engagement across personas (comments, shares, reactions) |
| 1.3 | narrative-arc-planning.md | Design multi-day story arcs that span personas |
| 1.4 | cross-persona-campaigns.md | Create campaigns where personas address same topic from different angles |
| 1.5 | brand-firewall.md | Ensure personas never reveal parent brand connection |
| 1.6 | conflict-resolution.md | Protocol for competing narratives or underperformance |
| 1.7 | amplification-sequences.md | Design strategic engagement sequences for key content |

### Layer 4: Assembly & Documentation
**Model:** claude-3-5-sonnet-20241022

| Microskill | File | Purpose |
|------------|------|---------|
| 4.1 | coordination-plan-assembler.md | Assemble comprehensive network coordination plan |
| 4.2 | network-dashboard.md | Create summary view of all persona activity and coordination |
| 4.3 | execution-log.md | Document coordination decisions and orchestration strategies |

## Model Assignment Rationale
- **Layer 0 (haiku):** Fast validation and context loading across multiple upstream files
- **Layer 1 (opus):** Complex multi-persona orchestration requires deep strategic reasoning
- **Layer 4 (sonnet):** Efficient assembly and dashboard creation

## Output Specifications
**Primary Output:**
- Network Coordination Plan (comprehensive orchestration strategy)
- Network Dashboard (real-time coordination view)
- Execution Log (coordination decisions and rationale)

**Minimum Sizes:**
- Network Coordination Plan: 20KB
- Network Dashboard: 8KB
- Execution Log: 5KB

## Quality Gates
- [ ] All Persona Bibles and Account Plans loaded
- [ ] Network calendar synchronized (no conflicts, maximum momentum)
- [ ] Engagement choreography looks organic (not coordinated)
- [ ] Narrative arcs span personas coherently
- [ ] Brand firewall maintained (no connection reveals)
- [ ] Conflict resolution protocols defined
- [ ] Amplification sequences strategic and authentic

## Execution Notes
- Coordination must look ORGANIC, not artificial
- Timing variations critical (no simultaneous engagement)
- Narrative consistency across personas essential
- Brand firewall is non-negotiable
- Conflict resolution needs clear escalation paths
- Network-level campaigns require careful choreography

## Positional Reinforcement
You are executing **S23 Network Coordination**. Your role is to orchestrate multiple AI personas as a unified network, ensuring engagement looks organic, narratives stay consistent, and the network amplifies itself without revealing the coordination.
