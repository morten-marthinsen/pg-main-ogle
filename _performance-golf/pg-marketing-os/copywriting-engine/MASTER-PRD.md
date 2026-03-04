# CopywritingEngine — Master PRD

## PURPOSE

The CopywritingEngine is a sequential direct-response copywriting system that transforms market research into finished promotional copy through modular skills. Each skill operates on TWO inputs: domain expert teachings (courses, frameworks, principles) and empirical vault intelligence (patterns mined from 1,300+ proven controls in the PremiumSwipeVault).

**Operating Thesis:** Great copy is not invented — it is configured from patterns proven across thousands of winning promotions, then enhanced by domain expertise that explains WHY those patterns work.

---

## ARCHITECTURE

```
CopywritingEngine/
├── MASTER-PRD.md                   ← This file
├── SESSION-LOG.md                  ← Cross-session state
│
├── PremiumSwipeVault/              ← SHARED RESOURCE
│   ├── Processed/                  ← 1,300+ canonical JSONs
│   ├── SCHEMA/                     ← Data contract
│   └── VAULT-INDEX.md              ← Navigable catalog
│
├── SwipeExtractionMaster/          ← Vault population tool
│
├── DeepAnalysisProtocol/           ← Vault mining per skill domain
│   ├── PROTOCOL-PRD.md
│   ├── AGENT-INSTRUCTIONS.md
│   ├── analysis-types/             ← Domain templates
│   └── outputs/                    ← Pre-computed intelligence
│
├── SkillBuilder/                   ← Meta-tool: constructs skills
│   ├── SKILLBUILDER-PRD.md
│   ├── templates/
│   └── quality-gates/
│
├── Skills/                         ← Sequential copywriting modules
│   │
│   │   ══════════════════════════════════════════════════════════════
│   │   PHASE 1: STRATEGIC CLARITY (Understanding before Generation)
│   │   ══════════════════════════════════════════════════════════════
│   │
│   ├── 01-research/           ← Market intelligence + prospect psychology
│   ├── 02-proof-inventory/         ← What proof exists + can be used (strategic)
│   ├── 03-root-cause/              ← Problem reframe (what they think vs. reality)
│   ├── 04-mechanisms/              ← Unique mechanism creation + naming
│   ├── 05-promise/                 ← Promise calibration (stage-appropriate)
│   ├── 06-big-idea/               ← Big Idea SYNTHESIS (not generation)
│   │
│   │   ══════════════════════════════════════════════════════════════
│   │   PHASE 2: TACTICAL GENERATION (Producing Copy)
│   │   ══════════════════════════════════════════════════════════════
│   │
│   ├── 06-headlines/               ← Headline engineering
│   ├── 07-leads/                   ← Lead writing
│   ├── 08-story/                   ← Discovery/hero's journey narratives
│   ├── 09-copy-structure/          ← VSL/sales page/e-comm architecture
│   ├── 10-product-introduction/    ← Product reveal + description copy
│   ├── 11-proof-demonstration/     ← Proof PRESENTATION in copy (tactical)
│   ├── 12-offers/                  ← Offer construction
│   └── 13-closes/                  ← Close, CTA, guarantee
│
└── QualityProtocol/                ← Quality enforcement
    ├── ultra-rich-protocol.md
    ├── anti-slop-standards.md
    └── verbalized-sampling.md
```

---

## SEQUENTIAL SKILL FLOW

**The Clarity Sequence:** World-class copywriters achieve clarity BEFORE generation. They work through a sequence of strategic understanding (Research → Proof → Root Cause → Mechanism → Promise → Big Idea) before producing any actual copy. This system codifies that sequence.

Skills execute in order. Each skill's output feeds the next:

```
══════════════════════════════════════════════════════════════════════════════════
PHASE 1: STRATEGIC CLARITY — Building the Foundation
══════════════════════════════════════════════════════════════════════════════════

01-research          → Market Psychology Snapshot, Competitive Audit,
                            Schwartz Stage, Proof Inventory, Belief Map
        ↓
02-proof-inventory        → Available Proof Catalog (what proof exists,
                            proof strength scores, proof gaps)
        ↓
03-root-cause             → Problem Reframe Package (what they think vs.
                            what it really is vs. why nothing worked)
        ↓
04-mechanisms             → Mechanism Package (name, type, analogy, proof
                            mapping, scorecard validation)
        ↓
05-promise                → Calibrated Promise (stage-appropriate, specific,
                            believable, provable, mechanism-aligned)
        ↓
06-big-idea              → Big Idea SYNTHESIS (integrates root cause +
                            mechanism + promise into cohesive concept)

══════════════════════════════════════════════════════════════════════════════════
PHASE 2: TACTICAL GENERATION — Producing Copy
══════════════════════════════════════════════════════════════════════════════════

06-headlines              → Headline Suite (primary + variants + sub-heads)
        ↓
07-leads                  → Lead Draft (pattern-matched, emotionally calibrated)
        ↓
08-story                  → Discovery Narrative (hero's journey, obstacles, revelation)
        ↓
09-copy-structure         → Full Blueprint (VSL / sales page / e-comm / documentary)
        ↓
10-product-introduction   → Product Reveal (ingredients, system, features, how it works)
        ↓
11-proof-demonstration    → Proof Stack PRESENTATION (testimonials, data, demos)
        ↓
12-offers                 → Offer Architecture (stack, bonuses, pricing)
        ↓
13-closes                 → Close Sequence (CTA, urgency, guarantee)
```

### Phase 1 Skill Clarifications

- **02-proof-inventory:** DISTINCT from 11-proof-demonstration. This is STRATEGIC — what proof exists, what can be leveraged, what gaps need filling. Happens early to inform all downstream decisions.
- **03-root-cause:** The setup before mechanism. What the prospect believes the problem is vs. the real underlying cause. Sets up the mechanism as the logical answer.
- **04-mechanisms:** Creates the unique mechanism that addresses the root cause. Now informed by proof inventory (what can actually be proven).
- **05-promise:** Calibrates the promise to Schwartz stage + mechanism capability + available proof. In early-stage markets, the promise IS the Big Idea. In late-stage markets, it's the foundation everything builds on.
- **06-big-idea:** Now SYNTHESIS only (not generation). Integrates all preceding elements into a cohesive Big Idea concept. Does NOT generate headlines, leads, or copy.

### Phase 2 Skill Clarifications

- **08-story:** Distinct story sections (not "narrative throughout"). Hero's journey, discovery narrative, obstacle-revelation arc. Prominent in specific sections, then fades.
- **09-copy-structure:** Format-agnostic architecture. Proven structural templates for: VSLs, long-form sales pages, e-comm pages, reality/documentary-style formats. Structure first, format variations within.
- **10-product-introduction:** Distinct from offer. The copy that presents WHAT the product is and does — ingredient descriptions, system explanations, feature walkthroughs. Critical section that bridges mechanism → offer.
- **11-proof-demonstration:** TACTICAL proof presentation in copy. Takes the strategic inventory from 01 and writes the actual proof sections.

---

## TWO-INPUT SKILL ARCHITECTURE

Every skill combines:

| Input | Source | What It Provides |
|-------|--------|-------------------|
| **Domain Teachings** | Expert courses, frameworks, books | The WHY — principles, rules, mental models |
| **Vault Intelligence** | DeepAnalysisProtocol outputs | The WHAT — proven patterns, frequencies, exemplars |

**Result:** Skills that are both principled (grounded in expert knowledge) AND empirical (validated against 1,300+ real controls).

---

## SHARED RESOURCES

### PremiumSwipeVault
- **Contents:** 1,300+ extracted JSON files from proven direct-response promotions
- **Schema:** `unified-extraction-schema.json` — 4 root keys, 24 scored dimensions
- **Access:** All skills reference the vault through DeepAnalysisProtocol pre-computed outputs (never raw reads at runtime)

### DeepAnalysisProtocol
- **Purpose:** Pre-computes domain-specific intelligence from the vault
- **Output:** `[domain]-vault-intelligence.json` files consumed by skills
- **Phases:** Load & Filter → Pattern Extraction → **Cross-Niche Discovery** → Structural Analysis → Language Mining → Exemplar Curation
- **Cross-Niche Discovery:** Surfaces high-performing patterns from OTHER niches that are absent from the target niche — breakthrough opportunities from outside the echo chamber

### QualityProtocol
- **ultra-rich-protocol.md:** Anti-mediocrity enforcement (Pre-Task Interrogation → During-Task Checkpoints → Post-Task Verification)
- **anti-slop-standards.md:** Nine principles of clean writing + banned phrase lists + slop density metric
- **verbalized-sampling.md:** Distribution-level prompting that forces creative diversity beyond mode-collapsed typical responses. Required for any skill generating creative output (headlines, hooks, mechanism names, angles)

---

## CONSTRAINTS

1. Skills MUST NOT read raw vault files at runtime — they consume pre-computed vault-intelligence outputs only
2. Every skill MUST follow the two-input architecture (teachings + vault intelligence)
3. Skills MUST execute in sequence — no skill may reference outputs from a later-numbered skill
4. All text outputs MUST score ≤ 2.0 slop density before shipping
5. Skills MUST NOT duplicate content from other skills — reference, don't repeat
6. The vault schema (`unified-extraction-schema.json`) is the single source of truth for data structure
7. New skills MUST be built through the SkillBuilder process (not ad-hoc)
8. DeepAnalysisProtocol MUST run before a skill can access vault patterns for its domain

### Constraint 9: MICROSKILL ARCHITECTURE (MANDATORY)

**A skill is NOT a document. A skill is a system of bounded microskills.**

Every CopywritingEngine skill MUST be structured as a layered microskill system following the 01-research pattern. A flat instructional document (even one containing expert teachings) is NEVER acceptable as a skill. The following sub-constraints are absolute:

**9a. Microskill Granularity:** Each discrete analytical, generative, or evaluative operation MUST be its own numbered microskill file (e.g., `3.2-A-image-strength-optimizer.md`). You must be able to understand exactly what happens at each step by reading the filename alone.

**9b. Bounded Responsibility:** Each microskill does ONE thing. It does not scrape AND analyze AND synthesize. One job, one file, one output. If you can describe what it does with "and" in the middle, it's two microskills.

**9c. Explicit I/O Contracts:** Every microskill MUST declare:
- `Dependencies:` — named files/outputs it consumes
- `Output:` — named file it produces
- `Input Schema:` — YAML structure of what it receives
- `Output Schema:` — YAML structure of what it produces

**9d. Quality Gates:** Binary PASS/FAIL checkpoints between layers. No partial passes. Every gate has explicit criteria that can be evaluated mechanically.

**9e. Layered Organization:** Microskills are grouped into numbered layers (Layer 0: Foundation, Layer 1: Development, Layer 2: Optimization, etc.) with explicit progression rules — no layer may execute before all prior layers pass their gates.

**9f. Teachings ≠ Skills:** Domain teachings (Todd Brown, expert courses, frameworks) are INPUT to the skill system, stored in `source-teachings/`. They are NEVER the skill itself. The skill is the PROCESSING SYSTEM that transforms teachings + vault intelligence + upstream outputs into generative copy.

**9g. Orchestrator Pattern:** Each skill has a MASTER-AGENT or SKILL-AGENT that orchestrates microskill execution as a state machine. The orchestrator NEVER performs analysis or generation itself — it only sequences, validates gates, and manages state.

**DETECTION RULE:** If a skill's primary file is a single document longer than 200 lines containing teaching content, frameworks, and instructions combined — it is a flat document, not a microskill system. REJECT and redesign.

---

## EXTERNAL DEPENDENCIES

| System | Location | Relationship |
|--------|----------|--------------|
| NateJones-PromptArchitect | `../NateJones-PromptArchitect/` | Architectural principles for SkillBuilder quality gates |
| Claude-Master | `../Claude-Master/` | Session logging, cross-project coordination |

---

## BUILD STATUS

| Component | Status | Notes |
|-----------|--------|-------|
| PremiumSwipeVault | ✅ Active | 1,341 files, canonical schema |
| SwipeExtractionMaster | ✅ Active | Vault population tool |
| DeepAnalysisProtocol | ✅ Active | PRD + agent + mechanism analysis complete |
| SkillBuilder | 📋 Planned | Template + quality gates defined |
| QualityProtocol | ✅ Active | Ultra-rich + anti-slop + verbalized sampling |

### Phase 1: Strategic Clarity Skills

| Skill | Status | Notes |
|-------|--------|-------|
| 01-research | ✅ Complete | Full microskill system, 60+ skills across 4 layers |
| 02-proof-inventory | 🔨 Building | Source material pending, folder structure ready |
| 03-root-cause | 🔨 Building | Vault extraction running, folder structure ready |
| 04-mechanisms | ✅ Complete | 30 microskills across 5 layers + MECHANISM-AGENT |
| 05-promise | 🔨 Building | Source material collected (E5, BA, UM Bootcamp), folder ready |
| 06-big-idea | ⚠️ Redesigning | Was 01, needs refactor to synthesis-only (remove generation) |

### Phase 2: Tactical Generation Skills

| Skill | Status | Notes |
|-------|--------|-------|
| 06-headlines | 📋 Planned | Empty skill folder ready |
| 07-leads | 📋 Planned | Empty skill folder ready |
| 08-story | 📋 Planned | Empty skill folder ready |
| 09-copy-structure | 📋 Planned | Empty skill folder ready (was vsl-structure) |
| 10-product-introduction | 📋 Planned | Empty skill folder ready |
| 11-proof-demonstration | 📋 Planned | Empty skill folder ready |
| 12-offers | 📋 Planned | Empty skill folder ready |
| 13-closes | 📋 Planned | Empty skill folder ready |

---

## NEXT PRIORITIES

**Immediate (Today):**
1. Build 02-proof-inventory (source material incoming, should be straightforward)
2. Build 03-root-cause (vault extraction may be complete)
3. Build 05-promise (source material collected, needs analysis)
4. Refactor 06-big-idea to synthesis-only

**Short-term:**
5. Run DeepAnalysisProtocol for headlines domain
6. Build 06-headlines as first Phase 2 skill
7. Build 07-leads
