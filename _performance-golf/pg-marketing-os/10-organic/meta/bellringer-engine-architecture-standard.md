# ENGINE ARCHITECTURE STANDARD
## The Master Pattern for Building AI Knowledge Engines
### Version 1.0 — March 2026

---

## WHAT THIS DOCUMENT IS

This is the meta-architecture document that defines the mandatory pattern, standards, and gates that EVERY AI knowledge engine must follow — whether it's the CopywritingEngine (already built), the Organic Marketing Engine, the Design Engine, or any future engine.

**Any Claude instance building an engine for the client must read this document first and comply with all mandatory gates.**

This document exists because individual engine blueprints can drift, improvise, or skip steps. This standard cannot be bypassed. It is the constitution; blueprints are legislation.

---

## THE MANDATORY BUILD SEQUENCE

Every engine follows this exact sequence. Phases cannot be reordered. Gates cannot be skipped.

```
PHASE -1: SOURCE AUTHORITY AUDIT (SAAP)
    │   Reference: source-authority-audit-protocol.md
    │   Output: meta/SAAP-AUDIT.md + meta/SAAP-MATRIX.md
    │
    ▼ GATE: SAAP-AUDIT.md exists with all 7 steps completed + client sign-off
    │
PHASE 0: ARCHITECTURE SETUP
    │   Create folder structure, CLAUDE.md, ~system/SYSTEM-CORE.md,
    │   anti-degradation system, pipeline handoff registry
    │   Output: Complete folder skeleton + all root-level CLAUDE files
    │
    ▼ GATE: CLAUDE.md + ~system/SYSTEM-CORE.md exist
    │
PHASE 1: TEACHINGS EXTRACTION
    │   Extract frameworks from acquired Tier 1 sources into YAML
    │   Verify extraction covers ALL sub-skills from SAAP matrix
    │   Output: teachings/ directory populated
    │
    ▼ GATE: Every Tier 1 source extracted + no empty matrix columns
    │
PHASE 2: SPECIMEN COLLECTION
    │   Curate, catalog, deconstruct best-in-class examples
    │   Output: specimens/ directory populated
    │
    ▼ GATE: Minimum specimen count met per category
    │
PHASE 3: SKILL ENGINE BUILD
    │   Build each skill in pipeline order
    │   Each skill gets: SKILL.md, templates, output schemas, gate definitions
    │   Output: skills/ directory with all pipeline skills
    │
    ▼ GATE: All skills pass dry-run test
    │
PHASE 4: ARENA BUILD
    │   Write persona profiles, curate persona specimens,
    │   write arena protocol, test on real briefs
    │   Output: arena/ directory fully populated
    │
    ▼ GATE: Arena produces differentiated outputs on 3+ test briefs
    │
PHASE 5: ANTI-DEGRADATION LAYER
    │   Define all skill-to-skill gates, MC-CHECK protocol,
    │   quality scoring (RSF), context management
    │   Output: anti-slop/ directory + all gate files
    │
    ▼ GATE: Quality scoring system produces valid scores on test outputs
    │
PHASE 6: FIRST LIVE PROJECT
    │   Run complete pipeline on real work
    │   Capture learnings, refine, begin compounding flywheel
    │   Output: First live output + learning capture log
    │
    ▼ The engine is now LIVE. Compounding begins.
```

---

## THE 5-LAYER ARCHITECTURE (Mandatory for All Engines)

Every engine has exactly 5 layers. No more, no fewer. The names may vary slightly by domain, but the FUNCTION of each layer is fixed.

| Layer | Function | What It Contains | Why It's Mandatory |
|-------|----------|------------------|--------------------|
| **1. TEACHINGS** | What the masters know | Extracted frameworks, principles, laws from canonical sources | Without teachings, the engine generates from LLM defaults — generic output |
| **2. SPECIMENS** | What great looks like | Curated, deconstructed examples of excellence | Without specimens, quality has no calibration target |
| **3. PIPELINE** | The correct sequence of steps | Skills in forced order with gates between them | Without pipeline, steps get skipped or run out of order |
| **4. ARENA** | Competing strategic voices | Multiple personas that debate, compete, and synthesize | Without arena, output reflects one perspective — no tension, no refinement |
| **5. ANTI-DEGRADATION** | Quality enforcement | Gates, scoring, smell detectors, context management | Without anti-degradation, quality decays over time as context accumulates |

---

## MANDATORY FILE STRUCTURE PATTERN

Every engine must have these directories and files at minimum:

```
[EngineName]/
│
├── CLAUDE.md                              # ROUTER — determines what to load per request
├── ~system/SYSTEM-CORE.md                         # Inviolable laws — the constitution of this engine
├── ORGANIC-ARENA.md                        # Arena competition protocol
├── ~system/SPECIMEN-GUIDE.md                    # Specimen loading protocol
├── ORGANIC-SKILL-INDEX.md                  # Per-skill mandatory protocols (organic engine's own — separate from root index)
│
├── meta/                                 # ENGINE GOVERNANCE (not loaded by skills)
│   ├── SAAP-AUDIT.md                     # ← MANDATORY: Completed Source Authority Audit
│   ├── SAAP-MATRIX.md                    # ← MANDATORY: Cross-Reference Matrix
│   ├── SOURCE-ACQUISITION-LOG.md         # Track source acquisition + extraction status
│   ├── quarterly-review-log.md           # SAAP re-checks every 90 days
│   └── ENGINE-CHANGELOG.md              # Log of structural changes to the engine
│
├── teachings/                             # Layer 1
│   ├── [domain-specific subdirectories]
│   └── [YAML files extracted from sources]
│
├── specimens/                             # Layer 2
│   ├── [categorized examples]
│   └── [deconstruction files]
│
├── skills/                                # Layer 3 (Pipeline)
│   ├── [S01-Snn/ or D01-Dnn/]
│   └── [Each skill has: SKILL.md, templates/, outputs/]
│
├── arena/                                 # Layer 4
│   ├── personas/
│   ├── arena-protocol.md
│   └── [persona-specific specimens]
│
├── anti-slop/                             # Layer 5
│   ├── banned-patterns.md
│   ├── quality-principles.md
│   ├── quality-scoring.md                # RSF or equivalent scoring system
│   └── context-management.md
│
└── vertical-profiles/                     # OPTIONAL: Only if engine serves multiple verticals
    └── [vertical-specific overrides]
```

---

## THE 4 INVIOLABLE STANDARDS

These apply to every engine, every skill, every output. Non-negotiable.

### Standard 1: STRUCTURAL FORCING OVER INSTRUCTIONS
Instructions can be ignored. Structures cannot be bypassed.

- Every quality requirement is enforced by a FILE-EXISTENCE GATE, not a paragraph of instructions
- If file X doesn't exist, the next step literally cannot execute
- Gate checks are binary: the file exists or it doesn't. No "good enough."

### Standard 2: SOURCE AUTHORITY AUDIT (SAAP) IS PHASE -1
No engine build begins without a completed SAAP.

- Domain decomposition must be exhaustive (min 5 sub-domains × 3+ sub-skills)
- Every sub-skill must have a named canonical authority
- The Cross-Reference Matrix must have no empty columns
- The client must sign off before build proceeds
- SAAP re-runs quarterly (Steps 3-5 only) to catch new voices

### Standard 3: THE ARENA IS NOT OPTIONAL
Every engine that produces creative or strategic output must have an Arena layer.

- Minimum 5 personas (7 is the standard)
- Personas must represent genuinely different philosophies, not just tonal variations
- Arena protocol must force actual competition (not just sequential generation)
- Arena output must include synthesis — the best elements from competing approaches

### Standard 4: ANTI-DEGRADATION IS STRUCTURAL
Quality doesn't degrade because of bad intentions. It degrades because of entropy — context accumulation, pattern collapse, creative fatigue.

- Every engine must have domain-specific "smell detectors" (minimum 10)
- Every engine must have a quantitative quality scoring system (RSF or equivalent)
- Context management must be explicit: load zones, maximum context budgets, forced context refresh
- MC-CHECK (or domain equivalent) runs on every output before delivery

---

## SAAP INTEGRATION POINTS

The Source Authority Audit Protocol integrates at these specific points:

### 1. Before Build (Phase -1)
**Full 7-step SAAP runs.** This is the primary integration point.
- Produces: `meta/SAAP-AUDIT.md` + `meta/SAAP-MATRIX.md`
- Gate: Cannot proceed to Phase 0 without completed audit

### 2. During Phase 1 (Teachings Extraction)
**Matrix verification runs.** After each source is extracted, check it against the SAAP matrix.
- For each extraction: "Which sub-skills does this source cover?"
- Update `meta/SOURCE-ACQUISITION-LOG.md` with extraction status
- After all Tier 1 extractions complete: verify no matrix column is still empty
- If gaps remain: acquire and extract the Tier 2 source for that sub-skill

### 3. During Phase 3 (Skill Engine Build)
**Sub-skill loading verification.** When building each skill, verify it loads teachings from the appropriate canonical authority.
- Each skill's SKILL.md must reference which teachings it loads
- Cross-reference against SAAP matrix: does this skill's teaching load cover its sub-skills?
- If a skill covers sub-skills X and Y but only loads teachings for X, flag it

### 4. Quarterly (Ongoing)
**SAAP refresh runs Steps 3-5 only.** Every 90 days:
- Step 3: Web Validation Sweep — have new canonical voices emerged?
- Step 4: Update Cross-Reference Matrix if new sources identified
- Step 5: Resolve any new gaps
- Log results in `meta/quarterly-review-log.md`
- New sources go to Tier 2 unless they fill a critical gap (then Tier 1 + extraction)

### 5. On Quality Failure
**Triggered SAAP sub-audit.** When engine output quality drops in a specific area:
- Trace the quality failure to the relevant sub-skill(s)
- Check SAAP matrix: what authority covers this sub-skill?
- If the authority is Tier 2 and hasn't been extracted yet — extract it now
- If no authority covers this sub-skill — run Steps 2-5 for this sub-skill only

---

## HOW TO USE THIS DOCUMENT

### For Claude (Any Instance)
When the client asks you to build a new engine:
1. Read this document FIRST
2. Read the SAAP protocol
3. Begin with Phase -1 (the audit) — do NOT skip to Phase 0
4. Follow the mandatory build sequence
5. Use the mandatory file structure pattern
6. Comply with all 4 inviolable standards

### For the Client
When evaluating any engine (built by Claude, by a team, or by a third party):
1. Check: Does `meta/SAAP-AUDIT.md` exist? If not, the source list wasn't validated.
2. Check: Does the Cross-Reference Matrix have empty columns? If so, there are gaps.
3. Check: Are all 5 layers present? Missing layers = structural weakness.
4. Check: Are gates enforced by file existence, or just by instructions? Instructions will drift.

### For Future Engines
This standard applies to any engine built under this architecture, including but not limited to:
- Sales Engine
- Education / Course Engine
- Community Building Engine
- Music Production Engine
- Brand Identity Engine
- Video / Content Production Engine
- AI Agent Architecture Engine
- Financial Modeling Engine

The domain changes. The architecture doesn't.

---

## RELATIONSHIP TO EXISTING DOCUMENTS

```
ENGINE_ARCHITECTURE_STANDARD.md               ← THIS DOCUMENT (the constitution)
    │
    ├── source-authority-audit-protocol.md    ← The SAAP (Phase -1 protocol)
    │
    ├── organic-marketing-engine-blueprint.md ← Engine-specific blueprint
    │   └── meta/SAAP-AUDIT.md              ← Completed audit for this engine
    │
    ├── DESIGN_ENGINE_BLUEPRINT.md            ← Engine-specific blueprint
    │   └── meta/SAAP-AUDIT.md              ← Completed audit for this engine
    │
    └── [FUTURE_ENGINE]_BLUEPRINT.md          ← Any future engine
        └── meta/SAAP-AUDIT.md              ← Completed audit for this engine
```

**Hierarchy:** Standard > Protocol > Blueprint > Engine Files

If a blueprint contradicts this standard, the standard wins.
If a skill contradicts its blueprint, the blueprint wins.
If an output contradicts its skill protocol, the skill protocol wins.

---

## CHANGELOG

| Date | Version | Change |
|------|---------|--------|
| 2026-03-04 | 1.0 | Initial creation. Established 5-layer architecture, SAAP integration, 4 inviolable standards, mandatory build sequence. Born from gap analysis that revealed missing canonical authorities in Design Engine (Garr Reynolds, Brad Frost, Luke Wroblewski) and Organic Marketing Engine (Russell Brunson, Donald Miller, Eugene Schwartz). |

---

*This is a living document. It evolves as we learn. But the 4 standards are permanent.*
