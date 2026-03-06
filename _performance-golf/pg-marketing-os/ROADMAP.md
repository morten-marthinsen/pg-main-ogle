# CopywritingEngine — ROADMAP

**Version:** 1.3
**Created:** 2026-02-07
**Updated:** 2026-02-20
**Purpose:** Strategic development roadmap for the CopywritingEngine system

---

## Current State (v3.7 — February 2026)

### What Exists

| Component | Status | Version |
|-----------|--------|---------|
| **CLAUDE.md** (Master Protocol) | Complete | v3.7 |
| **20 Skills** (01-Research through 20-Editorial) | All operational | Various |
| **Arena System** (7 competitors, 3 rounds, adversarial Critic) | Complete | v3.0 |
| **Synthesizer Layer** (phrase-level hybrids) | Complete | v2.0 |
| **Metacognitive Protocol** (MC-CHECK, context zones) | Complete | v2.4+ |
| **Anti-Degradation System** (20/20 skills protected) | Complete | v2.8+ |
| **Effort Protocol** (Extended Thinking mapping) | Complete | v3.1 |
| **Agent Teams Architecture** (parallel persona execution) | Specified, not yet field-tested | v3.1 |
| **Specimen Injection** (8 skills with gold specimens) | Complete | v2.0 |
| **Per-Microskill Output Protocol** | Complete (all 20 skills) | v1.0 |
| **Model Assignment Tables** | Complete (all 20 AGENT.md files) | Binding |
| **Taste Capture Protocol** | Complete | v1.0 |
| **Learning Capture Protocol** | Complete | v1.0 |
| **FSSIT Handoff Template** | Complete | v1.0 |
| **Vertical Profile System** (5 verticals, persona registry, configurable panels) | Complete (Phase 1 — infrastructure) | v3.7 |
| **Soul.md Template** (00-brief) | Complete | v1.0 |
| **Learning Log** (70+ learnings captured) | Active | v2.0 |
| **Backup Infrastructure** (GitHub auto-backup) | Active | Stable |

### Architecture Summary

```
Layer 0: Foundation (upstream loading, specimen injection)
Layer 1: Architecture (classification, pattern selection)
Layer 2: Generation/Drafting (Arena competition, effort: max)
  Layer 2.5: Arena (7 competitors x 3 rounds + Critic + Judge)
  Layer 2.6: Synthesizer (phrase-level hybrids from 7 outputs)
Layer 3: Validation/Refinement (quality gates, anti-slop)
Layer 4: Output/Packaging (handoff to next skill)
```

---

## Strategic Direction: The Metacognition + AI Partnership Discovery

### What We Learned (2026-02-07)

Deep research for the Rich Shefren AI Opportunity project revealed that the CopywritingEngine's architecture directly maps to validated cognitive science frameworks:

| Engine Component | Cognitive Science Framework | Source |
|-----------------|---------------------------|--------|
| MC-CHECK Protocol | Metacognitive monitoring/calibration | IJHCI 2025 — validated psychometric scale |
| Anti-Degradation System | Cognitive Atrophy Prevention | MIT Media Lab 2025 — EEG evidence |
| Arena + Human Selection | Expanded Creative Space | PNAS 2023 — 88% novel strategies post-AlphaGo |
| Specimen Injection | Extended Mind / Externalized Cognition | Andy Clark, Nature 2025 |
| Learning Log | Schema Acceleration | Piaget + Ericsson Deliberate Practice 2.0 |
| CLAUDE.md Version History | Double-Loop Learning + Co-Evolution | Argyris & Schon |
| Structural Forcing | Cognitive Sovereignty | Prevents atrophy paradox |

### The Insight

**The CopywritingEngine IS a concrete implementation of the metacognitive AI partnership methodology.** It's not just a copywriting tool — it's a demonstration of how to build durable, platform-independent, compounding human-AI cognitive systems.

This means the engine has two futures:
1. **As a copywriting system** — continue improving skill quality and execution
2. **As a methodology proof-of-concept** — the architecture itself becomes teachable content

---

## Phase 1: Near-Term (February 2026)

### 1A. Agent Teams Field Testing
**Priority:** HIGH
**Status:** Architecture specified in CLAUDE.md v3.1, not yet battle-tested

- Run first real Arena with Agent Teams (separate Claude instances per persona)
- Measure quality improvement vs. single-context execution
- Document: latency, token cost, quality delta, persona contamination elimination
- Identify operational issues (coordination, state management, error handling)
- Update CLAUDE.md based on field findings

### 1B. Rich Shefren AI Opportunity Pipeline (Skills 03-20)
**Priority:** HIGH
**Status:** COMPLETE — Sections 1-10, full editorial pass, ready for Anthony review

- Skills 03-20 executed for the AI opportunity offer
- First offer processed with v3.0 Arena + v3.1 Effort Protocol
- Anthony hands-on at each stage with significant edits at Sections 7, 9, 2A, 2B
- Editorial (Skill 20) completed: B+ (7.86) → A (8.86), ~90 individual edits
- Deliverables at: `./outputs/rich-shefren-ai-opportunity/`

### 1C. Specimen Library Expansion
**Priority:** HIGH (upgraded from MEDIUM — identified as highest quality-lift-per-effort pathway)
**Status:** COMPLETE — System 2 fully implemented (101 specimens + shared protocol + 16 per-skill microskills)

- **System 2 specimens collected (2026-02-15):** 101 files across 6 personas — Makepeace (4 controls), Halbert (27 files), Schwartz (14 files with OCR), Ogilvy (30 files with OCR), Clemens (4 VSLs), Bencivenga (22 files incl. 3 promo sales letters)
- **Shared protocol created:** `skills/PERSONA-VOICE-LOADING-PROTOCOL.md` — per-arena-mode selection matrices, niche matching guide, output requirements
- **Per-skill microskills created:** `0.2.7-persona-voice-loader.md` in all 16 Arena skills with skill-specific specimen recommendations
- **All 16 AGENT.md files updated** with 0.2.7 row in Layer 0 tables
- **Remaining gaps:** Halbert has no actual ad copy (only instructional), Clemens limited to Gundry, Ogilvy has 1 partial file needing manual OCR
- Expand gold specimen library for skills that need more type coverage
- Consider: specimens for non-traditional offer types (info products, coaching, SaaS)

### 1D. Five Root Problems (Identified 2026-02-14)
**Priority:** HIGH
**Status:** 3 of 5 ADDRESSED (#2, #3, #4). Remaining 2 (#1, #5) require market data.

Five root problems limiting generative output quality from B- to the target 95th+ percentile:

1. **The Scoring Paradox** — LLM judges score 60-70% on persuasive criteria but have never felt a pattern interrupt or the urge to keep reading. High scores on copy that wouldn't work in market. *Solution:* Loop 4 market feedback data to calibrate what scores actually mean. **Status: NOT YET ADDRESSED — requires market data.**
2. **The Specimen Gap** — System 1 (structural patterns) active, System 2 (persona voices) never built. *Solution:* Load 5-10 pages verbatim copy per persona. **ADDRESSED (v3.4-v3.5):** 101 specimens across 6 personas + 16 per-skill microskills + shared protocol. See 1C above.
3. **The Taste Encoding Problem** — Anthony's edits are the richest taste signal but captured ad-hoc, not structured as learnable data. *Solution:* Structured taste capture (YAML per edit with pattern/reason/category). **ADDRESSED (v3.6):** TASTE-CAPTURE-PROTOCOL.md created, learning-log SCHEMA.md v2.0 with taste_revision_entry, CLAUDE.md Taste Capture section added.
4. **The FSSIT Gap** — Research finds volume (1000 quotes) but not depth (3 FSSIT candidates that unlock the campaign). *Solution:* Make microskills 2.8-A/2.8-B mandatory, produce 5 ranked FSSIT candidates as primary research deliverable. **ADDRESSED (v3.6):** Gate 2.8 added to ENFORCEMENT-GATES.md, FSSIT-HANDOFF-TEMPLATE.md created, FSSIT Loading Gate added to BIG-IDEA-AGENT.md, FSSIT integration added to Skills 03-05.
5. **The Speed-to-Market Problem** — Internal optimization (Loops 1-3) running heavily, Loop 4 (market feedback) hasn't started. Each fix has diminishing returns without calibration data. *Solution:* Ship 3-5 campaigns, let conversion data recalibrate the system. **Status: NOT YET ADDRESSED — operational.**

---

## Phase 2: Short-Term (March-April 2026)

### 2A. Metacognitive Methodology Extraction
**Priority:** HIGH
**Dependency:** Rich Shefren pipeline completion

- Extract the generalizable methodology from the CopywritingEngine's architecture
- Document: Which design decisions map to which cognitive science principles
- Create teaching materials that explain WHY the engine works, not just HOW
- Develop framework for applying the same methodology to other domains

### 2B. Platform Persistence Hardening
**Priority:** MEDIUM

The CopywritingEngine's markdown-based architecture is inherently platform-independent. Strengthen this:
- Ensure ALL system knowledge lives in readable files (no hidden state in tool configs)
- Test portability: can the system execute with a different AI model?
- Document migration path if Claude Code evolves or is replaced
- Version-control all skill files with semantic versioning

### 2C. Quality Metrics Dashboard
**Priority:** MEDIUM

- Implement the Learning Log SCHEMA.md cross-skill patterns aggregation
- Create automated quality trend tracking across projects
- Flag recurring failure modes before they become patterns
- Build human review triggers (failure rate > 20%, same feedback 3+ times)

---

## Phase 3: Medium-Term (May-August 2026)

### 3A. Metacognitive AI Partnership Course/Module Architecture
**Priority:** HIGH (depends on Rich Shefren offer success)

If the Rich Shefren AI opportunity offer succeeds:
- Design course curriculum around the Three Dimensions + Shield framework:
  - **The Mirror** (metacognitive calibration through AI)
  - **The Partnership** (distributed cognition + emergent capabilities)
  - **The Flywheel** (schema acceleration + compounding returns)
  - **The Shield** (cognitive sovereignty — preventing atrophy)
- Build exercises that teach Level 3 (metacognitive partnership) skills
- Create measurable outcomes using the IJHCI Collaborative AI Metacognition Scale
- Consider: can the CopywritingEngine itself be a teaching tool?

### 3B. Multi-Domain Engine Architecture
**Priority:** MEDIUM-LOW (speculative)

The CopywritingEngine's architecture is domain-specific (direct response copywriting) but the METHODOLOGY is domain-independent. Explore:
- Could the same layer architecture (0-4 + Arena + Synthesizer) apply to other domains?
- Candidate domains: content strategy, product positioning, sales training, education design
- What's domain-specific (specimens, skill content) vs. domain-independent (Arena, MC-CHECK, gates)?

### 3C. Cognitive Measurement Integration
**Priority:** LOW (research dependency)

- Integrate findings from IJHCI's Collaborative AI Metacognition Scale
- Build self-assessment tools for users of the methodology
- Track cognitive development over time (pre/post measurement)
- Contribute to research on AI-enhanced metacognition

---

## Phase 4: Long-Term Vision

### The Engine as Living Proof

The CopywritingEngine's unique strategic position is that it serves DUAL purposes:

1. **Production Tool** — Generates world-class direct response copy campaigns
2. **Methodology Demonstration** — Every component IS the metacognitive AI partnership methodology applied to a specific domain

This means every improvement to the engine simultaneously:
- Produces better copy (immediate commercial value)
- Demonstrates the methodology more compellingly (proof asset)
- Generates learnings that feed back into both (compounding)

### The Compounding Advantage

Each project processed through the engine:
- Adds learnings to the Learning Log (schema acceleration)
- Reveals failure modes that strengthen anti-degradation (double-loop learning)
- Produces specimens that improve future generation (externalized cognition)
- Validates the methodology further (proof accumulation)

This is the Co-Evolutionary Flywheel in action — the system gets better at a compounding rate, and the advantage is structurally impossible for competitors to replicate without building their own metacognitive architecture.

---

## Risk Registry

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Agent Teams underperforms in practice | Medium | High | Single-context fallback documented; field test before relying on it |
| AI model changes break assumptions | Medium | High | Platform-independent markdown architecture; test portability |
| Context window limits constrain Arena | High | Medium | Context compression protocol; session break protocol; Agent Teams |
| Offer complexity (Shefren project) exceeds system design | Medium | Medium | Anthony's hands-on involvement; adaptive approach |
| Cognitive atrophy research evolves/contradicts | Low | Medium | Track literature; update framework if needed |
| Token costs of Agent Teams unsustainable | Medium | Low | Cost is correct tradeoff for quality; optimize team size if needed |

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-20 | Vertical Profile System created (v3.7) | 5 vertical profiles (golf, health, finance, personal-dev, technology), persona registry (9 individual files), 0.0.1-vertical-profile-loader microskill, configurable Arena persona panels, vertical-specific specimens/taste/anti-slop. Golf replaces Ogilvy with Donnie French. Architecture: ONE engine with configurable layers, NOT separate forks. |
| 2026-02-20 | ARENA-PERSONA-PANEL.md upgraded to v3.0 | Configurable panel system — persona specs extracted to persona-registry/ individual files, vertical panel configurations table, 9 registered personas including Donnie French (golf-native) |
| 2026-02-20 | PERSONA-VOICE-LOADING-PROTOCOL.md upgraded to v2.0 | Vertical-aware loading — 3-step process (determine panel, locate specimens, vertical-specific loading), specimen directory override system, golf vertical example |
| 2026-02-15 | Taste Capture Protocol created (v3.6) | Structured YAML edit capture, pattern accumulation, taste-to-generation bridge — addresses Root Problem #3 |
| 2026-02-15 | FSSIT mandatory integration (v3.6) | Gate 2.8 in ENFORCEMENT-GATES.md, FSSIT-HANDOFF-TEMPLATE.md, FSSIT Loading Gate in BIG-IDEA-AGENT.md — addresses Root Problem #4 |
| 2026-02-15 | Learning Capture Protocol created (v3.6) | PAI-inspired: explicit ratings, implicit sentiment, universal LEARN phase, learning-log SCHEMA.md v2.0 |
| 2026-02-15 | Soul.md Template created | Copy-paste template at skills/00-brief/soul-md-template.md with inline guidance |
| 2026-02-14 | Five root problems diagnosed for generative quality gap | Deep state-of-union analysis: Scoring Paradox, Specimen Gap, Taste Encoding, FSSIT Gap, Speed-to-Market |
| 2026-02-14 | Specimen Library upgraded to HIGH priority | Identified as highest quality-lift-per-effort pathway — personas use descriptions not examples |
| 2026-02-14 | Engine reframed as "search engine for creativity" | Anthony navigates depth, system explores breadth — neither alone gets to 0.01% |
| 2026-02-14 | Current quality assessed as B+ strategic / B- generative | Six specific copy deficits identified: soul, voice integrity, organic pacing, emotional honesty, cliffhanger instinct, generous framing |
| 2026-02-12 | Per-microskill output protocol rolled out to all 20 skills | Synthesis Trap evidence: Mechanism Skill 04 had 33 microskill definitions but only 8 summary-level outputs |
| 2026-02-12 | Model assignment tables added to all 20 AGENT.md files | Binding haiku/sonnet/opus assignments per layer per skill |
| 2026-02-07 | FINAL_HANDOFF minimum set to 200KB (was 300KB) | 300KB unrealistic given context constraints; 166KB output was excellent quality |
| 2026-02-07 | CopywritingEngine framed as methodology proof | Research synthesis revealed 1:1 mapping between engine architecture and cognitive science |
| 2026-02-05 | Arena upgraded to v3.0 (7 competitors, 3 rounds, Critic) | Single-pass generation with 6 competitors insufficient; adversarial critique needed |
| 2026-02-05 | Agent Teams architecture specified | Persona contamination, self-critique weakness, context pressure identified as root causes of quality issues |
| 2026-02-05 | Anti-degradation rolled out to all 20 skills | Proactive protection after Research and Proof Inventory catastrophic failures |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.3 | 2026-02-20 | v3.7 VERTICAL PROFILE SYSTEM: Engine now supports 5 market verticals (golf, health, finance, personal-dev, technology) via configurable profiles. New infrastructure: skills/verticals/ (5 profiles), skills/persona-registry/ (9 personas including Donnie French), 0.0.1-vertical-profile-loader microskill (deployed to all 16 Arena skills + 00-brief), vertical-specimens/ directories (5 verticals x system-1 + system-2). ARENA-PERSONA-PANEL.md v2.2→v3.0 (configurable panels). PERSONA-VOICE-LOADING-PROTOCOL.md v1.0→v2.0 (vertical-aware loading). All 16 AGENT.md Layer 0 tables updated with 0.0.1 row. Added 3 decision log entries. |
| 1.2 | 2026-02-15 | v3.6 update: current state → v3.6, 3/5 root problems now ADDRESSED (#2 Specimen Gap, #3 Taste Encoding, #4 FSSIT Gap), added Taste Capture Protocol + Learning Capture Protocol + FSSIT Handoff Template + Soul.md Template to component table, Learning Log → v2.0, added 4 decision log entries |
| 1.1 | 2026-02-14 | State-of-union update: current state → v3.2, RSF pipeline marked COMPLETE, Specimen Library upgraded to HIGH priority, added Section 1D (Five Root Problems), added 4 decision log entries (2026-02-12 through 2026-02-14), added Per-Microskill Output Protocol and Model Assignment Tables to component table |
| 1.0 | 2026-02-07 | Initial roadmap creation based on metacognition + AI partnership framework discovery |
