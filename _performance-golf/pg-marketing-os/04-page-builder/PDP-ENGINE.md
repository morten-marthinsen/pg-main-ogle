# PDP Engine — PDP-ENGINE.md (Unified Copy + Build Router)

**Version:** 2.0
**Created:** 2026-03-04
**Updated:** 2026-03-24 — Unified E-Comm Copy + Page Builder merge (v2.0)
**Purpose:** Route to the correct reference file for PDP (Product Detail Page) skill execution. This engine is the unified copy-and-build system for all Type B / Hybrid ecommerce pages — from strategy and feature naming through copy generation, page assembly, and editorial quality gates.

---

## SYSTEM THESIS

E-comm copy is inseparable from design. A headline means nothing without its carousel context. A feature name means nothing without its card layout. A CTA means nothing without its buy box UX. This engine unifies what was previously split across two systems — the E-Commerce Copy Engine (strategy, naming, copy, micro-scripts, editorial) and the Page Builder PDP Enhancement Layer (architecture, design, assembly, audit) — into a single pipeline where copy is written knowing how it will be rendered, and pages are built with world-class copy methodology baked in.

**Core hierarchy:** Above-Fold is 80% of the PDP conversion decision. Below-fold exists for hunt-and-peck reassurance, not linear storytelling.

---

## THE 10 PDP LAWS

### Copy Laws (from E-Comm Engine)

1. **Ecom copy is scanned, not read.** Every section must work standalone. If a section requires context from another section, you've failed.
2. **Feature naming IS the copy.** A great feature name does more work than a paragraph of description. "Dynamic Loft Control" > "This club adjusts loft automatically." Invest 10x more time in naming than describing.
3. **The hero sells the click, not the product.** Above-fold has one job: stop the scroll and earn the scroll-down. Value prop + one visual proof point + CTA.
4. **Social proof is king.** On ecom, proof converts more than copy. Reviews, UGC, before/after, numbers, awards. Every section should have at least one proof element.
5. **Design notes are part of the output.** Unlike long-form, ecom copy is inseparable from layout. Every section must include UX/design notes for page builder handoff.

### Architecture Laws (from Page Builder)

6. **Above-fold is an interactive purchasing system.** The carousel + buy box must answer every purchase question before any scrolling happens. A 10-thumbnail story carousel is not a headline; a buy box with variant chips is not a CTA block.
7. **Hunt-and-peck trumps linear reading.** Section order matters less than section completeness. Each section must be self-contained and scannable.
8. **UX IS copy.** On a PDP, the interaction design (exposed chips, stepper, sticky ATC, accordion) is as important as the words. Bad UX kills good copy.
9. **Warm traffic, fast conversion.** PDP visitors are typically pre-sold by an ad or referral. Re-confirm the promise, resolve micro-anxieties, remove friction. Don't re-educate.
10. **Copy and container are built together.** Copy written blind to its container converts at 2%. Copy written for its container converts at 10%+. Every copy skill loads design tokens and component patterns.

---

## THE 6 E-COMM DEGRADATION PATTERNS

These patterns are the most common failure modes when AI generates e-comm content. Every PDP skill must guard against them.

### Pattern 1: The Long-Form Bleed
The model writes ecom copy as if it were a sales page — long paragraphs, flowing narrative, building arguments across sections. **The fix:** Standalone section validation. Test: shuffle the sections randomly. Does each still make sense?

### Pattern 2: The Generic Feature Name
The model names features with technical jargon or generic descriptors — "Advanced Technology" or "Premium Materials." **The fix:** Caveman-benefit format: ingredient/tech + plain-language benefit. "L-Theanine for Tranquility" not "L-Theanine Complex."

### Pattern 3: The Copy-Only Handoff
The model produces copy with no design context — no layout notes, no image specs, no mobile behavior. **The fix:** Every section output includes UX/design specs. Copy is inseparable from layout.

### Pattern 4: The Proof Desert
The model writes persuasive copy but forgets proof elements. On ecom, proof converts more than persuasion. **The fix:** At least one proof element per section — review quote, UGC reference, before/after, statistic, or award.

### Pattern 5: The Bloated Hero
The model packs the hero section with everything — benefits, features, proof, story. The hero has ONE job: stop the scroll and earn the scroll-down. **The fix:** Tight hero: headline + subhead + value prop + one visual proof point + CTA. Everything else goes BTF.

### Pattern 6: The Missing Micro-Scripts
The model produces static copy but ignores video/carousel/GIF elements that are standard on ecom pages. **The fix:** Short-form scripts (15-60 seconds) mapped to specific page sections.

### Anti-Degradation Protocol

```
WHEN YOU NOTICE YOURSELF:
- Writing paragraphs that build on each other → STOP. Make each section standalone.
- Naming features with generic descriptors → STOP. Use caveman-benefit format.
- Producing copy without design notes → STOP. Add UX/layout specs per section.
- Writing a section without proof → STOP. Add at least one proof element.
- Packing the hero with everything → STOP. Hero = headline + subhead + value prop + proof + CTA.
- Skipping micro-scripts → STOP. Map video/carousel elements to sections.
- Writing copy without loading design tokens → STOP. Load design-tokens-reference.md.

IF CONTEXT IS LARGE:
- This does NOT excuse long-form narrative in ecom sections
- This does NOT excuse generic feature naming
- This does NOT excuse copy-only output (no design notes)
- Request continuation rather than compressing quality
```

---

## ARCHITECTURE — UNIFIED PDP PIPELINE

LP-00 classifies page type. When `type_b` or `hybrid` is detected, the unified PDP route activates:

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    UNIFIED PDP PIPELINE (Type B / Hybrid)               ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                         ║
║  PHASE 1: INTELLIGENCE & STRATEGY                                       ║
║    LP-00  (shared) → LP-01 (shared) → LP-02 (shared)                  ║
║    PDP-01: E-Comm Strategist                                            ║
║      → NLS 19-section mapping, section architecture, word budgets       ║
║      → Mode A (downstream from Research) or Mode B (standalone brief)   ║
║                                                                         ║
║  PHASE 2: FEATURE ARCHITECTURE                                          ║
║    PDP-02: Feature Naming & Scoping  ← THE cornerstone (30% of page)  ║
║      → Caveman-benefit naming, hierarchy, micro-scripts per feature     ║
║      → Arena: generative_full_draft + audience evaluation               ║
║                                                                         ║
║  PHASE 3: ABOVE-FOLD COPY + ARCHITECTURE                               ║
║    PDP-03: Hero Carousel + Buy Box (COPY + DESIGN unified)             ║
║      → 10-Thumbnail Story Architecture + hero copy generation           ║
║      → Buy box architecture + buy box copy                              ║
║      → Arena: generative_full_draft + audience evaluation               ║
║                                                                         ║
║  PHASE 4: BTF SECTION COPY + DESIGN                                    ║
║    PDP-04: BTF Section Sequencer (strategy + sequence + word budgets)   ║
║      │                                                                  ║
║      ▼ [PARALLEL — Section Writing]                                     ║
║    PDP-07: BTF Section Writer (COPY + DESIGN unified)                  ║
║      → All BTF sections with standalone test + proof + design notes     ║
║      → Arena: generative_full_draft + audience evaluation               ║
║    PDP-05: Social Proof + Review System Architect                       ║
║    PDP-06: Offer/Buy Box Writer                                         ║
║    LP-08  (shared, enhanced): Trust Elements                            ║
║    LP-09  (shared, enhanced): Benefits/Features                         ║
║    LP-12  (shared, enhanced): FAQ/Objections                            ║
║    LP-13  (shared): Urgency/Scarcity                                    ║
║                                                                         ║
║  PHASE 5: MICRO-SCRIPTS                                                ║
║    PDP-08: Micro-Script Writer                                          ║
║      → 15-60s video scripts mapped to sections                          ║
║      → Bill Schley protocol, visual direction specs                     ║
║                                                                         ║
║  PHASE 6: ASSEMBLY + BUILD                                              ║
║    LP-15  (shared, PDP-enhanced): Page Assembly                         ║
║      → No-new-copy rule, feature thread verification                    ║
║      → Design tokens + component patterns applied                       ║
║      → Output: assembled copy + handoff YAML + index.html               ║
║                                                                         ║
║  PHASE 7: EDITORIAL + AUDIT                                             ║
║    PDP-17: E-Comm Editorial (terminal quality gate)                     ║
║      → 6 Editorial Lenses, 7-persona voice system                       ║
║      → Brand compliance (workspace-loaded, conditional)                 ║
║      → Arena: editorial_revision + audience evaluation                  ║
║      → SSR pre-screen + distinctiveness pass                            ║
║    PDP-16: PDP Mobile + Conversion Audit                                ║
║    LP-18  (shared): A/B Test Plan                                       ║
║                                                                         ║
║  OUTPUT: Complete PDP Package                                           ║
║    • ecomm-copy-final.md (arena-tested, editorial-polished)            ║
║    • page-builder-handoff.yaml (section-by-section design specs)        ║
║    • index.html (built page with design tokens + components)            ║
║    • micro-scripts.json (video scripts mapped to sections)              ║
║    • CONVERSION-AUDIT-REPORT.md                                         ║
║    • AB-TEST-PLAN.md                                                    ║
╚══════════════════════════════════════════════════════════════════════════╝
```

**Type A pages:** Continue using LP-03 through LP-14 as designed. PDP skills are never invoked.
**Hybrid pages:** Use PDP above-fold (PDP-03) + PDP BTF sequencing (PDP-04) + both PDP and LP writing skills as needed.

---

## FEATURE NAMING ARCHITECTURE (PDP-02)

Feature naming is 30% of an ecom page and deserves its own robust skill with Arena competition.

### The Caveman-Benefit Format

```
[Ingredient/Technology/Component] for [Plain-Language Benefit]

Examples:
  "L-Theanine for Tranquility"
  "Dynamic Loft Control"
  "HyperSpeed Face Technology"
  "Marine Collagen for Skin Renewal"
  "Triple-Layer Cushioning System"
```

### Feature Hierarchy

| Tier | Role | Page Placement | Copy Weight |
|------|------|---------------|-------------|
| Hero Feature | Leads the product story, appears in headlines | ATF hero, product highlights | 30% of feature copy |
| Supporting Features | Reinforce hero, add depth | BTF sections, comparison charts | 50% of feature copy |
| Technical Features | Specs, ingredients, materials | Ingredient panels, spec tables | 20% of feature copy |

### Feature Thread Requirement

Hero feature from PDP-02 MUST appear in hero section AND at least 2 BTF sections minimum. Supporting features in their primary section + at least 1 cross-reference. Technical features in at least 1 relevant section.

### Micro-Script per Feature

Every feature gets a 1-2 sentence micro-script describing what it does and why it matters. These scripts feed PDP-03 (hero), PDP-07 (sections), and PDP-08 (video scripts).

---

## NLS PDP SECTION FRAMEWORK (19 Section Types)

| # | Section | Copy Type | Proof Required |
|---|---------|----------|---------------|
| 1 | Hero Carousel | Visual story copy | UGC or product shots |
| 2 | Copy Block | Value prop expansion | At least 1 stat |
| 3 | CTA Box | Offer + urgency | Trust badges |
| 4 | Product Highlights | Feature TLDR | Star rating or award |
| 5 | UGC Carousel | Customer content | UGC is the proof |
| 6 | Expert Credibility | Authority section | Expert credentials |
| 7 | Ingredients/Materials | What's inside | Source/quality proof |
| 8 | What to Expect Timeline | Results journey | Before/after or timeline |
| 9 | Problem/Solution | Pain → product | Customer story |
| 10 | Why It Works | Mechanism section | Study or patent |
| 11 | Comparison Chart | vs. alternatives | Objective data |
| 12 | Cost Savings | Value calculation | Price comparison |
| 13 | How to Use | Instructions | Demo reference |
| 14 | Reviews | Customer proof | Review quotes |
| 15 | FAQ | Objection handling | Expert answers |
| 16 | Offer/Pricing | Price presentation | Value anchor |
| 17 | Guarantee | Risk reversal | Policy details |
| 18 | Use Cases | Audience segments | Segment-specific proof |
| 19 | Awards/Press | External validation | Logos, citations |

### Standalone Section Test

Every section must pass: "If I read ONLY this section, do I understand what the product does and why I should care?" If no → rewrite with context built into the section.

---

## MICRO-SCRIPT ARCHITECTURE (PDP-08)

### Script Types

| Type | Duration | Purpose | Page Placement |
|------|----------|---------|---------------|
| Hero Video | 30-60s | Product overview/demo | ATF hero carousel |
| Feature Explainer | 15-30s | Single feature deep-dive | Feature sections |
| UGC Script | 15-30s | Customer testimonial framework | UGC carousel |
| How-To | 30-60s | Usage demonstration | How to Use section |
| Comparison | 15-30s | Side-by-side demo | Comparison section |
| Robot Testing/Proof | 30-60s | Mechanical proof of claims | Proof sections |

### Bill Schley Protocol

Micro-scripts WEAVE approved DSI + micro-scripts from PDP-02 as narrative anchors. Micro-scripts are standalone beats (15-60s max, 2.5 words/second), NOT buried in sentences, with pauses before/after. Duration hard limits: min 15s, max 60s. Visual direction mandatory (timestamped, shot-by-shot, every 5-10s block covered). No new taglines — approved messaging from PDP-02 only.

---

## LONG-FORM CROSSOVER MAP

These long-form VSL skills have direct ecom analogs. PDP-07 loads crossover patterns from these skills when writing type-matched sections.

| Long-Form Skill | Ecom Application | PDP Skill |
|----------------|------------------|-----------|
| 10-Headlines | Hero headlines, section headlines | PDP-03 (Hero Copy) |
| 13-Root Cause Narrative | Problem/agitation section | PDP-07 (Section Copy) |
| 14-Mechanism Narrative | Technology/how-it-works section | PDP-07 (Section Copy) |
| 15-Product Introduction | Product highlights, features | PDP-02 (Feature Naming) + PDP-07 |
| 16-Offer Copy | Offer/pricing/value stack sections | PDP-07 (Section Copy) |
| 18-Proof Weaving | UGC, reviews, social proof sections | PDP-07 (Section Copy) |

Skills 11 (Lead), 12 (Story), 17 (Close) have minimal ecom relevance — story-driven, not scan-optimized.

---

## ARENA ARCHITECTURE (PDP Skills)

Four arena fires in the PDP pipeline, each with audience agent evaluation:

| Skill | Arena Mode | What Competes | Why It Earns Arena |
|-------|-----------|--------------|-------------------|
| PDP-02 Feature Naming | `generative_full_draft` | Complete feature naming packages (names, hierarchy, micro-scripts) | Feature names ARE 30% of the page |
| PDP-03 Hero Copy | `generative_full_draft` | Complete hero packages (headline, subhead, value prop, CTA, carousel copy) | Above-fold is 80% of conversion |
| PDP-07 Section Copy | `generative_full_draft` | Complete BTF section copy for ALL active sections | Audience agents evaluate full simulated page scroll |
| PDP-17 Editorial | `editorial_revision` | Editorial revision packages (edit-not-rewrite, all flagged sections) | Terminal quality gate |

Arena execution follows `~system/protocols/ARENA-CORE-PROTOCOL.md` (2-round + audience evaluation mandatory). Audience agents evaluate from customer perspective per `~system/protocols/AUDIENCE-AGENT-PROTOCOL.md`.

---

## BRAND COMPLIANCE (Workspace-Loaded, Conditional)

Brand compliance is NOT hardcoded into PDP skills. It is loaded conditionally from the active workspace/project context.

```
BRAND COMPLIANCE LOADING:
  1. CHECK if workspace has brand guidelines directory
     (e.g., _performance-golf/pg-brand/pg-brand-guidelines/)
  2. IF brand guidelines exist:
     → Load brand copy restrictions (forbidden claims, required disclaimers)
     → Load brand design compliance (colors, typography, logo usage, design principles)
     → Activate brand compliance gates in PDP-17 Editorial (minimum 8.0/10)
  3. IF no brand guidelines:
     → Skip brand compliance gates
     → PDP-17 Editorial runs standard editorial lenses only
```

This keeps the engine brand-agnostic while supporting workspace-specific brand enforcement.

---

## REFERENCE FILES

| File | When to Load | Contains |
|------|-------------|----------|
| **PDP-ENGINE.md** | Every PDP skill execution (you're reading this now) | 10 Laws, 6 degradation patterns, unified pipeline, feature naming architecture, micro-script architecture, arena architecture, brand compliance |
| **LANDING-PAGE-ENGINE.md** | Every PDP skill execution | Universal LP Laws, Type A/B/Hybrid classification, CopywritingEngine integration |
| **reference/PDP-BEST-PRACTICES-REFERENCE.md** | PDP-03 through PDP-17 | 10-Thumbnail Story Architecture, BTF Section Templates, Baymard/NN-g findings, PDP Specimen Library |
| **landing-page-engine-master-blueprint.md** | PDP-04 (section sequencing context) | Section flow defaults — PDP-04 overrides Type B defaults from this file |
| **element-taxonomy.md** | PDP-03, PDP-04, PDP-07 | Element types — PDP adds carousel, buy box, review system elements |
| **conversion-data-reference.md** | PDP-16 (audit benchmarks) | Conversion benchmarks — PDP-16 adds Baymard-specific mobile metrics |
| **reference/design-tokens-reference.md** | ALL PDP generation skills | Real design tokens from S-tier specimens — prevents "generic AI website" output |
| **reference/component-pattern-library.md** | ALL PDP generation skills | 13 clean HTML/CSS component templates |
| **reference/specimen-section-extracts.md** | On-demand for unique patterns | 8 specimen-specific interactive patterns |
| **specimens/SPECIMEN-INDEX.md** | All PDP skills | Unified specimen reference — NLS framework + real product specimens |

---

## LOADING PROTOCOL

```
FOR EVERY PDP SKILL EXECUTION:
  1. READ this file (PDP-ENGINE.md) — you're doing this now
  2. READ the parent LANDING-PAGE-ENGINE.md (universal LP laws apply)
  3. READ the skill's ANTI-DEGRADATION.md (mandatory)
  4. READ the skill's AGENT.md (mandatory)
  5. READ each microskill spec BEFORE executing that microskill

FOR PDP STRATEGY + ARCHITECTURE SKILLS (PDP-01, PDP-03, PDP-04):
  6. READ landing-page-engine-master-blueprint.md
  7. READ element-taxonomy.md
  8. READ reference/PDP-BEST-PRACTICES-REFERENCE.md

FOR PDP COPY SKILLS (PDP-02, PDP-03, PDP-07):
  9. READ relevant specimens from specimens/SPECIMEN-INDEX.md lookups
  10. READ reference/design-tokens-reference.md (copy must know its container)

FOR PDP WRITING SKILLS (PDP-05, PDP-06, PDP-07):
  11. READ reference/PDP-BEST-PRACTICES-REFERENCE.md (BTF section templates)

FOR PDP MICRO-SCRIPTS (PDP-08):
  12. READ specimens/micro-scripts/ patterns
  13. READ PDP-02 feature package (micro-scripts must use approved names)

FOR PDP ASSEMBLY (LP-15 PDP path):
  14. READ reference/design-tokens-reference.md (mandatory for HTML/CSS output)
  15. READ reference/component-pattern-library.md (mandatory — base component templates)

FOR PDP EDITORIAL (PDP-17):
  16. READ PDP-02 feature package (feature names are LOCKED)
  17. IF workspace has brand guidelines → READ brand compliance files
  18. READ ~system/protocols/SSR-PRESCREEN-PROTOCOL.md

FOR PDP AUDIT (PDP-16):
  19. READ conversion-data-reference.md
  20. READ reference/PDP-BEST-PRACTICES-REFERENCE.md (full Baymard checklist)
```

---

## PDP SKILL DIRECTORY

### Phase 1: Intelligence & Strategy
| # | Skill | Folder | Arena? | Status |
|---|-------|--------|--------|--------|
| LP-00 | Brief & Page Type Classifier | LP-00-brief-classifier/ | No | Built (shared) |
| LP-01 | Conversion Intelligence Loader | LP-01-conversion-intelligence/ | No | Built (shared) |
| LP-02 | Competitive Page Audit | LP-02-competitive-audit/ | No | Built (shared) |
| PDP-01 | E-Comm Strategist | PDP-01-ecomm-strategist/ | No | Built |

### Phase 2: Feature Architecture
| # | Skill | Folder | Arena? | Status |
|---|-------|--------|--------|--------|
| PDP-02 | Feature Naming & Scoping | PDP-02-feature-naming/ | Yes (generative) | Built |

### Phase 3: Above-Fold Copy + Architecture
| # | Skill | Folder | Arena? | Status |
|---|-------|--------|--------|--------|
| PDP-03 | Hero Carousel + Buy Box (Copy + Design) | PDP-03-hero-carousel-buybox/ | Yes (generative) | Built |

### Phase 4: BTF Section Copy + Design
| # | Skill | Folder | Arena? | Status |
|---|-------|--------|--------|--------|
| PDP-04 | BTF Section Sequencer | PDP-04-btf-section-sequencer/ | No | Built |
| PDP-05 | Social Proof + Review System Architect | PDP-05-social-proof-review-system/ | No | Built |
| PDP-06 | Offer/Buy Box Writer | PDP-06-offer-buybox-writer/ | No | Built |
| PDP-07 | BTF Section Writer (Copy + Design) | PDP-07-btf-section-writer/ | Yes (generative) | Built |

### Phase 5: Micro-Scripts
| # | Skill | Folder | Arena? | Status |
|---|-------|--------|--------|--------|
| PDP-08 | Micro-Script Writer | PDP-08-micro-scripts/ | No | Built |

### Phase 6: Assembly
| # | Skill | Folder | Arena? | Status |
|---|-------|--------|--------|--------|
| LP-15 | Page Assembly (PDP-enhanced) | LP-15-page-assembly/ | No | Built (shared, PDP-enhanced) |

### Phase 7: Editorial + Audit
| # | Skill | Folder | Arena? | Status |
|---|-------|--------|--------|--------|
| PDP-17 | E-Comm Editorial | PDP-17-editorial/ | Yes (editorial_revision) | Built |
| PDP-16 | PDP Mobile + Conversion Audit | PDP-16-mobile-conversion-audit/ | No | Built |
| LP-18 | A/B Test Plan | LP-18-ab-test-plan/ | No | Built (shared) |

### Shared Skills (enhanced for PDP, no separate PDP version)
| # | Skill | PDP Enhancement |
|---|-------|----------------|
| LP-08 | Trust Elements | +2 microskills: PDP trust badge patterns, expert section framing |
| LP-09 | Benefits/Features | +3 microskills: ingredient card format, microscript benefit pattern, vertical-expanded layout |
| LP-12 | FAQ/Objections | +2 microskills: Baymard top 5-7 curation, accordion-only enforcement |
| LP-13 | Urgency/Scarcity | Shared — no changes |

---

## MODEL ASSIGNMENT PATTERN (PDP Skills)

| Layer | Task Type | Model |
|-------|-----------|-------|
| 0 | Loading, extraction, inventory | haiku |
| 1 | Classification, structural decisions, carousel architecture | sonnet |
| 2 | Generation (feature naming, hero copy, section copy, micro-scripts) | opus for naming / hero / buy box; sonnet for structured output |
| 2.5 | Arena (all generation + critique + scoring) | opus (generation), sonnet (critique/scoring) |
| 3 | Validation, audits, scoring | sonnet (audits), opus (Baymard compliance, editorial lenses) |
| 4 | Package assembly | haiku/sonnet |

---

## PDP vs LP DIVERGENCE MAP

| Phase | LP Engine Skills | PDP Divergence | Action |
|-------|-----------------|---------------|--------|
| Phase 1: Intelligence | LP-00, LP-01, LP-02 | LOW (80% shared) | Reuse + PDP-01 adds ecom strategy |
| Phase 2: Feature Naming | (none in LP) | **NEW (0% shared)** | PDP-02 is entirely new — LP has no feature naming |
| Phase 3: Architecture | LP-03, LP-04 | **HIGH (20% shared)** | Replace with PDP-03 (+ hero copy), PDP-04 |
| Phase 4: Writing | LP-05 through LP-14 | MIXED (40% shared) | Replace some (PDP-05/06/07), enhance others (LP-08/09/12) |
| Phase 5: Micro-Scripts | (none in LP) | **NEW (0% shared)** | PDP-08 is entirely new — LP has no micro-scripts |
| Phase 6: Assembly | LP-15 | MEDIUM (60% shared) | Enhance LP-15 with PDP assembly path |
| Phase 7: Editorial/Audit | LP-16, LP-17 | **HIGH (20% shared)** | PDP-17 replaces with 6-lens editorial; PDP-16 enhanced |

---

## FOUNDATIONAL PRINCIPLES (from NLS / Baymard / NN-g)

1. **DR Principles Remixed** — Traditional direct response persuasion restructured for hunt-and-peck PDP behavior
2. **Semi-Qualified Traffic** — Most visitors are pre-sold from product-first ads; page must also serve category searchers who don't know the product
3. **UX/UI Best Practices** — Baymard Institute and NN-g conversion testing research governs interaction patterns
4. **Scannability First** — Every section digestible at a glance; visitors choose which sections to deep-dive
5. **Copy-Container Unity** — Copy is written knowing how it will be rendered. Design tokens, component patterns, and layout specs are loaded during copy generation, not after.

---

## OUTPUT PATH

All PDP execution outputs go to:
```
./~outputs/[project-name]/landing-page/[skill-id]-[skill-name]/
```

PDP skills use the same output path convention as LP skills.

---

## SESSION-END RULE (MANDATORY)

**BEFORE ending ANY session:** Write `SESSION-STATE.md` to active project directory.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2026-03-24 | **Unified E-Comm Copy + Page Builder merge.** Absorbed E-COMM-ENGINE.md: 5 Copy Laws → 10 PDP Laws, 6 Degradation Patterns, Feature Naming Architecture, NLS 19-Section Framework, Micro-Script Architecture, Long-Form Crossover Map, Arena Architecture (4 arena fires), Brand Compliance (workspace-loaded, conditional). New skills: PDP-01 (from EC-00), PDP-02 (from EC-01), PDP-08 (from EC-04), PDP-17 (from EC-06). Enhanced: PDP-03 (+hero copy), PDP-04 (+strategy), PDP-07 (+section copy methodology), LP-15 (+assembly), PDP-16 (+editorial insights). |
| 1.0 | 2026-03-04 | Initial creation — PDP Enhancement Layer with 5 PDP Laws, routing, 6 PDP skills, model assignment, Baymard/NLS integration |

---

*For full PDP best practices and Baymard research, see reference/PDP-BEST-PRACTICES-REFERENCE.md. For LP Engine universal rules, see LANDING-PAGE-ENGINE.md.*
