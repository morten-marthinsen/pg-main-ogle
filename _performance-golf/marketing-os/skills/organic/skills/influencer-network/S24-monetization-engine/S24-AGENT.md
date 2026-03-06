# S24 Monetization Engine Agent

## Purpose
Design revenue generation strategies for the AI persona network. Map monetization paths per persona: affiliate, sponsorship, digital products, community membership, consulting. Create network-level revenue plan.

## Version
v1.0 | 2026-03-05

## Dependencies
**Upstream:**
- S21 Persona Bibles (all persona-bible-[name].md)
- S21 Network Overview (network-overview.md)
- S22 Account Strategy Plans (all account-plan-[persona]-[platform].md)
- S23 Network Coordination Plan (network-coordination-plan.md)

## Layer Architecture

### Layer 0: Input & Context Loading
**Model:** claude-3-5-haiku-20241022

| Microskill | File | Purpose |
|------------|------|---------|
| 0.1 | input-validator.md | Validate Persona Bibles, Account Plans, Coordination Plan exist |
| 0.2 | teaching-loader.md | Load monetization frameworks, creator economy models, pricing strategies |
| 0.3 | upstream-loader.md | Load S21 Bibles, S22 Strategies, S23 Coordination, audience data |

### Layer 1: Monetization Strategy
**Model:** claude-opus-4-20250514

| Microskill | File | Purpose |
|------------|------|---------|
| 1.1 | revenue-model-mapping.md | Map revenue models to each persona based on archetype and audience |
| 1.2 | audience-monetization-readiness.md | Assess when audience is ready for monetization (followers, engagement, trust) |
| 1.3 | product-development-strategy.md | Design digital products, courses, memberships per persona |
| 1.4 | partnership-framework.md | Design sponsorship/affiliate strategy, brand alignment, rate cards |
| 1.5 | pricing-architecture.md | Price products and services per persona, value perception |
| 1.6 | revenue-projection.md | Project revenue per persona and network-wide, scenarios |

### Layer 4: Assembly & Documentation
**Model:** claude-3-5-sonnet-20241022

| Microskill | File | Purpose |
|------------|------|---------|
| 4.1 | monetization-plan-assembler.md | Assemble complete monetization strategy per persona |
| 4.2 | revenue-dashboard.md | Create network-wide revenue view, tracking, projections |
| 4.3 | execution-log.md | Document monetization decisions, pricing rationale, model selection |

## Model Assignment Rationale
- **Layer 0 (haiku):** Fast validation and context loading
- **Layer 1 (opus):** Monetization strategy requires deep understanding of creator economy, audience psychology, revenue model fit
- **Layer 4 (sonnet):** Efficient assembly and dashboard creation

## Output Specifications
**Primary Output:**
- Monetization Strategy per persona (revenue models, products, partnerships, pricing)
- Network Revenue Dashboard (projections, tracking, optimization)
- Execution Log (monetization decisions and rationale)

**Minimum Sizes:**
- Monetization Strategy per persona: 12KB
- Revenue Dashboard: 8KB
- Execution Log: 5KB

## Quality Gates
- [ ] All Persona Bibles and upstream plans loaded
- [ ] Revenue models mapped per persona (not one-size-fits-all)
- [ ] Audience monetization readiness assessed (no premature monetization)
- [ ] Product development aligned with persona authority
- [ ] Partnership framework includes brand alignment criteria
- [ ] Pricing reflects value perception and purchasing power
- [ ] Revenue projections include conservative/moderate/aggressive scenarios

## Execution Notes
- Monetization must align with persona authority and audience trust
- Premature monetization kills audience relationship
- Revenue models should differ across personas based on archetype
- Pricing must consider audience purchasing power
- Network-level monetization creates additional opportunities
- Brand firewall applies to monetization (personas can't all promote same parent brand products)

## Positional Reinforcement
You are executing **S24 Monetization Engine**. Your role is to design revenue strategies for each AI persona that align with their authority, audience readiness, and archetype while creating network-level monetization opportunities.
