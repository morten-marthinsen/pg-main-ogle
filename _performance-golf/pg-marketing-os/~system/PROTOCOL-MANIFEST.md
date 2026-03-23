# Protocol Manifest — Conditional Loading Rules

**Version:** 1.0
**Created:** 2026-03-10
**Purpose:** Priority-banded protocol loading to minimize token overhead per skill execution
**Authority:** Referenced by SYSTEM-CORE.md — this manifest governs WHAT loads, SYSTEM-CORE governs HOW you execute

---

## HOW TO USE THIS MANIFEST

At session start:
1. Read this manifest
2. Identify: current skill(s), engine, tier, vertical, context zone
3. Load all protocols where **Load Condition** evaluates TRUE
4. Sort by priority (lower number = loaded first)
5. Track total estimated tokens loaded

At skill transition (within session):
1. Unload protocols specific to the previous skill (priority 50-60)
2. Load protocols for the new skill
3. Re-evaluate conditional protocols (65-95)

**Do NOT load the entire manifest into context.** Use it as a lookup table.

---

## Priority Bands

| Priority | Category | Load Condition | Est. Tokens |
|----------|----------|----------------|-------------|
| 8 | Output Path Resolution (`OUTPUT-PATH-RESOLUTION.md`) | ALWAYS | ~1,300 |
| 10 | The 7 Laws (SYSTEM-CORE §1) | ALWAYS | ~500 |
| 15 | Core Anti-Degradation (SYSTEM-CORE §2-3) | ALWAYS | ~1,500 |
| 20 | Mandatory Output Protocol | ALWAYS | ~800 |
| 25 | Per-Microskill Output Protocol | ALWAYS | ~600 |
| 30 | Forbidden Behaviors (core subset) | ALWAYS | ~400 |
| 35 | Event-Driven Reminders (detector awareness) | ALWAYS | ~300 |
| 40 | Task Triage (tier identification) | SESSION START ONLY | ~400 |
| 45 | Effort Protocol (extended thinking) | ALWAYS | ~500 |
| 50 | Current Skill `SKILL.md` | PER SKILL | varies |
| 55 | Current Skill `ANTI-DEGRADATION.md` | PER SKILL | varies |
| 60 | Skill-Index file (`skill-index/XX-name.md`) | PER SKILL (if exists) | varies |
| 65 | `ARENA-PROTOCOL.md` | IF skill.arena == true | ~8,000 |
| 68 | `ARENA-CORE-PROTOCOL.md` | IF skill.arena == true | ~5,000 |
| 70 | `SPECIMEN-GUIDE.md` | IF skill.generates_copy == true | ~4,000 |
| 72 | `PERSONA-VOICE-LOADING-PROTOCOL.md` | IF skill.generates_copy == true | ~2,000 |
| 75 | Vertical profile (`verticals/[vertical].md`) | IF vertical != null | ~2,000 |
| 78 | `CONTEXT-RESERVOIR-TEMPLATE.md` | IF skill_number >= 10 | ~3,000 |
| 80 | Engine master file (AD-ENGINE.md, etc.) | IF engine != "main-pipeline" | varies |
| 82 | Pipeline Handoff Registry | IF skill.consumes_upstream == true | ~3,000 |
| 85 | Expression Anchoring Protocol | IF skill_number in [03, 04, 05, 06] | ~2,000 |
| 88 | Prose Quality Verification | IF skill_number in [11-17] | ~1,500 |
| 90 | Active Recitation Protocol | IF tier in [Full, Standard] AND skill_number in [12, 15] | ~1,000 |
| 92 | Foundation Integrity Check | IF between Session 4-5 AND tier != Quick | ~1,500 |
| 93 | Output Pattern Detection | IF output involves judgment, analysis, or recommendations | ~1,200 |
| 94 | Decision Challenge Protocol | ALWAYS (lightweight — fires on trigger, not pre-loaded in full) | ~800 |
| 95 | Context Zone Reminders | IF zone != GREEN | ~500 |
| 98 | MCP Tool Discovery | IF skill.mcp_tools != empty (see MCP-TOOL-REGISTRY.md) | ~200 |

---

## Per-Skill Loading Table

Each skill has a loading profile at `~system/skill-loading-profiles/[id]-[name].yaml` declaring its protocol requirements. The table below summarizes key flags.

### Foundation Pipeline (00-09)

| Skill | ID | Arena | Generates Copy | Consumes Upstream | Expression Anchoring | Engine | MCP Tools |
|-------|----|-------|---------------|-------------------|---------------------|--------|-----------|
| Project Brief | 00 | no | no | no | no | main-pipeline | none |
| Deep Research | 01 | no | no | no | no | main-pipeline | firecrawl, apify, google-drive |
| Proof Inventory | 02 | no | no | yes | no | main-pipeline | none |
| Root Cause | 03 | yes | no | yes | yes | main-pipeline | none |
| Mechanism | 04 | yes | no | yes | yes | main-pipeline | none |
| Promise | 05 | yes | no | yes | yes | main-pipeline | none |
| Big Idea | 06 | yes | no | yes | yes | main-pipeline | none |
| Offer Stack | 07 | yes | no | yes | no | main-pipeline | none |
| Structure | 08 | no | no | yes | no | main-pipeline | none |
| Campaign Brief | 09 | no | no | yes | no | main-pipeline | none |

### Long-Form VSL Pipeline (10-20)

| Skill | ID | Arena | Generates Copy | Consumes Upstream | Prose Quality | Engine | MCP Tools |
|-------|----|-------|---------------|-------------------|--------------|--------|-----------|
| Headlines | 10 | yes | yes | yes | no | main-pipeline | none |
| Lead | 11 | yes | yes | yes | yes | main-pipeline | none |
| Story | 12 | yes | yes | yes | yes | main-pipeline | none |
| Root Cause Narrative | 13 | yes | yes | yes | yes | main-pipeline | none |
| Mechanism Narrative | 14 | yes | yes | yes | yes | main-pipeline | none |
| Product Introduction | 15 | yes | yes | yes | yes | main-pipeline | none |
| Offer Copy | 16 | yes | yes | yes | yes | main-pipeline | none |
| Close | 17 | yes | yes | yes | yes | main-pipeline | none |
| Proof Weaving | 18 | no | yes | yes | no | main-pipeline | none |
| Campaign Assembly | 19 | no | no | yes | no | main-pipeline | none |
| Editorial | 20 | no | no | yes | no | main-pipeline | none |

### E-Commerce Engine (EC-00 to EC-06)

| Skill | ID | Arena | Generates Copy | Consumes Upstream | Engine | MCP Tools |
|-------|----|-------|---------------|-------------------|--------|-----------|
| E-Comm Strategist | EC-00 | no | no | yes | e-comm | none |
| Feature Naming | EC-01 | yes | no | yes | e-comm | none |
| Hero Value Prop | EC-02 | yes | yes | yes | e-comm | none |
| Section Copy | EC-03 | yes | yes | yes | e-comm | none |
| Micro Scripts | EC-04 | yes | yes | yes | e-comm | none |
| Assembly | EC-05 | no | no | yes | e-comm | none |
| Editorial | EC-06 | no | no | yes | e-comm | none |

### Upsell Engine (U0-U5)

| Skill | ID | Arena | Generates Copy | Consumes Upstream | Engine | MCP Tools |
|-------|----|-------|---------------|-------------------|--------|-----------|
| Upsell Strategist | U0 | no | no | yes | upsell | none |
| Order Bump Writer | U1 | yes | yes | yes | upsell | none |
| Upsell Writer | U2 | yes | yes | yes | upsell | none |
| Downsell Writer | U3 | yes | yes | yes | upsell | none |
| Upsell Assembler | U4 | no | no | yes | upsell | none |
| Upsell Editorial | U5 | no | no | yes | upsell | none |

### Checkout Engine (CK-00 to CK-03)

| Skill | ID | Arena | Generates Copy | Consumes Upstream | Engine | MCP Tools |
|-------|----|-------|---------------|-------------------|--------|-----------|
| Checkout Strategist | CK-00 | no | no | yes | checkout | none |
| Trust/Security Copy | CK-01 | yes | yes | yes | checkout | none |
| Form Microcopy | CK-02 | yes | yes | yes | checkout | none |
| Checkout Editorial | CK-03 | no | no | yes | checkout | none |

### Email Engine (E0-E4)

| Skill | ID | Arena | Generates Copy | Consumes Upstream | Engine | MCP Tools |
|-------|----|-------|---------------|-------------------|--------|-----------|
| Email Strategist | E0 | no | no | yes | email | none |
| Email Writer | E1 | yes | yes | yes | email | none |
| Subject Line Engine | E2 | yes | yes | yes | email | none |
| Sequence Assembler | E3 | no | no | yes | email | none |
| Email Editorial | E4 | no | no | yes | email | none |

### Ad Engine (A01-A12)

| Skill | ID | Arena | Generates Copy | Consumes Upstream | Engine | MCP Tools |
|-------|----|-------|---------------|-------------------|--------|-----------|
| Ad Intelligence | A01 | no | no | yes | ads | firecrawl, apify |
| Hook & Angle Discovery | A02 | yes | no | yes | ads | none |
| Format Strategy | A03 | no | no | yes | ads | none |
| Script Architecture | A04 | yes | no | yes | ads | none |
| Visual Direction | A05 | no | no | yes | ads | gemini-media |
| Ad Arena | A06 | yes | yes | yes | ads | none |
| Copy Production | A07 | no | yes | yes | ads | none |
| Visual/Video Production | A08 | no | no | yes | ads | gemini-media, elevenlabs |
| Assembly & Variant Matrix | A09 | no | no | yes | ads | none |
| Pre-Launch Scoring | A10 | no | no | yes | ads | none |
| Launch Package | A11 | no | no | yes | ads | none |
| Performance Learning | A12 | no | no | yes | ads | none |

### Advertorial Engine (ADV-00 to ADV-05)

| Skill | ID | Arena | Generates Copy | Consumes Upstream | Engine | MCP Tools |
|-------|----|-------|---------------|-------------------|--------|-----------|
| Advertorial Strategist | ADV-00 | no | no | yes | advertorial | none |
| Hook & Lead Writer | ADV-01 | yes | yes | yes | advertorial | none |
| Body Copy Writer | ADV-02 | yes | yes | yes | advertorial | none |
| CTA Bridge Writer | ADV-03 | yes | yes | yes | advertorial | none |
| Advertorial Assembly | ADV-04 | no | no | yes | advertorial | none |
| Advertorial Editorial | ADV-05 | no | no | yes | advertorial | none |

### Organic Engine (S01-S24)

| Skill | ID | Arena | Generates Copy | Consumes Upstream | Engine | MCP Tools |
|-------|----|-------|---------------|-------------------|--------|-----------|
| Audience Intelligence | S01 | no | no | no | organic | none |
| Platform Strategy | S02 | no | no | yes | organic | none |
| Brand Voice | S03 | no | no | yes | organic | none |
| Content Architecture | S04 | no | no | yes | organic | none |
| Hook Library | S05 | yes | no | yes | organic | none |
| Virality Scoring | S06 | no | no | yes | organic | none |
| Campaign Brief | S07 | no | no | yes | organic | none |
| Script Writing | S08 | yes | yes | yes | organic | none |
| Caption Writing | S09 | yes | yes | yes | organic | firecrawl, apify |
| Carousel Design | S10 | yes | yes | yes | organic | none |
| Thread Writing | S11 | yes | yes | yes | organic | none |
| Visual Direction | S12 | no | no | yes | organic | none |
| Arena Generation | S13 | yes | yes | yes | organic | none |
| Content Assembly | S14 | no | no | yes | organic | none |
| Scheduling Choreography | S15 | no | no | yes | organic | none |
| Engagement Protocol | S16 | no | no | yes | organic | none |
| Network Amplification | S17 | no | no | yes | organic | none |
| Repurpose | S18 | no | no | yes | organic | none |
| Performance Analysis | S19 | no | no | yes | organic | none |
| Learning Capture | S20 | no | no | yes | organic | none |
| Persona Architect | S21 | no | no | yes | organic | none |
| Account Strategy | S22 | no | no | yes | organic | none |
| Network Coordination | S23 | no | no | yes | organic | none |
| Monetization Engine | S24 | no | no | yes | organic | none |

---

## Token Savings Estimate

| Scenario | Current Load | With Manifest | Savings |
|----------|-------------|---------------|---------|
| Non-Arena, non-copy skill (e.g., Skill 00) | ~15KB (full SYSTEM-CORE) | ~5KB (priority 10-45 only) | ~10KB |
| Arena strategy skill (e.g., Skill 04) | ~23KB (SYSTEM-CORE + ARENA) | ~18KB (+ expression anchoring) | ~5KB |
| Copy generation skill (e.g., Skill 12) | ~30KB (full stack) | ~27KB (all needed, no expression anchoring) | ~3KB |
| Ad engine skill (e.g., A05) | ~25KB (SYSTEM-CORE + AD-ENGINE) | ~15KB (no main pipeline protocols) | ~10KB |
| Branch engine non-Arena (e.g., E3) | ~20KB | ~8KB | ~12KB |

Biggest savings: branch engine skills and early foundation skills that currently load the full SYSTEM-CORE.

---

## Engine Master File Mapping

| Engine | Master File | Applies To |
|--------|------------|------------|
| main-pipeline | (none — SYSTEM-CORE is sufficient) | Skills 00-20 |
| e-comm | `03-e-comm/E-COMM-ENGINE.md` | EC-00 to EC-06 |
| upsell | (skill-level ANTI-DEGRADATION only) | U0-U5 |
| checkout | `06-checkout/CHECKOUT-ENGINE.md` | CK-00 to CK-03 |
| email | `07-emails/EMAIL-ENGINE.md` | E0-E4 |
| ads | `08-ads/AD-ENGINE.md` | A01-A12 |
| advertorial | `09-advertorials/ADVERTORIAL-ENGINE.md` | ADV-00 to ADV-05 |
| organic | `10-organic/ORGANIC-ENGINE.md` | S01-S24 |
