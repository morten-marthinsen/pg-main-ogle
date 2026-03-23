# LandingPageEngine — LANDING-PAGE-ENGINE.md (Router)

**Version:** 1.1
**Created:** 2026-02-28
**Updated:** 2026-03-06
**Purpose:** Route to the correct reference file for your skill type. Slim router — all detail lives in subfiles.

---

## SYSTEM THESIS

The CopywritingEngine generates the **words**. The Landing Page Engine generates the **container** — the page structure, visual hierarchy, element ordering, and conversion architecture that holds those words. Great copy in an optimized container converts at 10%+. Great copy in a broken container converts at 2%.

**Core hierarchy:** List > Offer > Copy > **Container** (this engine).

---

## ARCHITECTURE

| File | When to Load | Contains |
|------|-------------|----------|
| **landing-page-engine-master-prd.md** | Reference — skill architecture source of truth | 19-skill definitions, element taxonomy, quality standards, CopywritingEngine integration map |
| **landing-page-engine-master-blueprint.md** | Architecture skills (LP-03, LP-04, LP-05, LP-06) | Section flows, proof density defaults, CTA optimization, Type A/B/Hybrid templates |
| **conversion-data-reference.md** | LP-01 (Intelligence Loader), LP-17 (Conversion Audit) | Unbounce Q4 2024 benchmarks, element-level impact data, industry-specific rates |
| **element-taxonomy.md** | Architecture + writing skills | 64 element types, 8 functional categories, frequency data from 20 specimens |
| **swipe-vault-index.md** | All skills needing specimen reference | "When building X, study Y" quick-reference (17 scenarios), scenario lookups, priority gaps |
| **specimens/specimen-index.md** | All skills needing real-page reference | 31 specimen files indexed by vertical, type, proof density, best practices (quality floor: 7/10) |
| **specimens/cross-page-pattern-analysis.md** | Architecture skills, LP-17 | Cross-page synthesis: section sequences, proof patterns, CTA norms, 8 impression-validated discoveries |
| **reference/design-principles.md** | LP-03, LP-04, LP-15, LP-17 | 10 conversion design principles extracted from specimens |
| **reference/visual-hierarchy.md** | LP-03, LP-07 | 5 above-fold patterns, section flow templates, CTA placement rules |
| **reference/typography-reference.md** | LP-07, LP-14 | Headline/subhead/CTA copy patterns from real pages |
| **PDP-ENGINE.md** | All PDP skill executions (Type B / Hybrid) | PDP Laws, routing, PDP skill directory, PDP model assignment, Baymard/NLS integration |
| **reference/PDP-BEST-PRACTICES-REFERENCE.md** | PDP-03 through PDP-16 | 10-Thumbnail Story Architecture, BTF Section Templates, Baymard/NN-g findings, PDP Specimen Library |
| **reference/design-tokens-reference.md** | ALL page generation skills (LP-07+, LP-15, PDP-03+) | Real design tokens (colors, fonts, spacing, buttons) from 6 S-tier specimens. Prevents "generic AI website" output. |
| **reference/component-pattern-library.md** | ALL page generation skills (LP-07+, LP-15, PDP-03+) | 13 clean HTML/CSS component templates (hero, buy box, testimonials, FAQ, etc.) with CSS custom properties. Tier 2 code specimens. |
| **reference/specimen-section-extracts.md** | On-demand for unique patterns | 8 specimen-specific interactive patterns (ailment selector, tabbed results, gamified progression, mechanism ecosystem, etc.). Tier 3 code specimens. |

---

## LOADING PROTOCOL

```
FOR EVERY SKILL EXECUTION:
  1. READ this file (LANDING-PAGE-ENGINE.md) — you're doing this now
  2. READ the skill's ANTI-DEGRADATION.md (mandatory)
  3. READ the skill's AGENT.md (mandatory)
  4. READ each microskill spec BEFORE executing that microskill

FOR ARCHITECTURE SKILLS (LP-03, LP-04, LP-05, LP-06):
  5. READ landing-page-engine-master-blueprint.md
  6. READ element-taxonomy.md
  7. READ specimens/cross-page-pattern-analysis.md

FOR WRITING SKILLS (LP-07 through LP-14):
  8. READ relevant specimens from swipe-vault-index.md lookups
  9. READ reference/typography-reference.md (LP-07, LP-14)

FOR AUDIT/ASSEMBLY SKILLS (LP-15, LP-16, LP-17, LP-18):
  10. READ conversion-data-reference.md
  11. READ specimens/cross-page-pattern-analysis.md

FOR INTELLIGENCE SKILLS (LP-01, LP-02):
  12. READ conversion-data-reference.md
  13. READ specimen-index.md

FOR ALL PAGE GENERATION SKILLS (code output):
  14. READ reference/design-tokens-reference.md (mandatory for any HTML/CSS output)
  15. READ reference/component-pattern-library.md (mandatory — base component templates)
  16. READ reference/specimen-section-extracts.md (load specific patterns matching page needs)

FOR PDP SKILLS (when page_type = type_b or hybrid):
  17. READ PDP-ENGINE.md (PDP router — loads before any PDP skill)
  18. READ reference/PDP-BEST-PRACTICES-REFERENCE.md
  19. See PDP-ENGINE.md for PDP-specific loading protocol
```

---

## THE 7 LAWS (Landing Page Engine)

1. **Read before you execute.** Read ANTI-DEGRADATION.md AND microskill spec files before every microskill.
2. **Every microskill produces its own file.** No file = didn't happen.
3. **Gates are PASS or FAIL.** No "conditional pass," no "partial pass."
4. **Type A and Type B are different architectures.** Never apply Type A patterns to Type B or vice versa without explicit justification.
5. **Write to files immediately.** Context is ephemeral.
6. **ONE OFFER PER PAGE.** Multiple offers = -266% conversion penalty. Every element serves a single conversion goal.
7. **If something goes wrong, stop.** Do not rationalize past failures.

---

## TWO PAGE TYPES

| Type | Architecture | Primary Markets | Word Count |
|------|-------------|----------------|------------|
| **Type A** (Long-Form Sales Page) | Story-driven, education-first, E5 framework | Health/supplements DR, info products, financial, personal dev | 4,000-18,000 |
| **Type B** (Ecomm/PDP) | Scan-optimized, image-heavy, above-fold critical | Supplements DTC, beauty, food/bev, consumer goods | 1,500-7,000 |
| **Hybrid** | Type B above-fold + Type A education below | Extended supplement PDPs, high-ticket DTC | 3,000-10,000 |

LP-00 classifies page type via 7-signal checklist. Classification governs every downstream decision.

**When Type B or Hybrid is detected:** LP-00 routes to PDP Enhancement Layer skills. See `PDP-ENGINE.md` for the complete PDP routing flow, skill directory, and loading protocol.

---

## SKILL DIRECTORY

### Phase 1: Intelligence & Classification
| # | Skill | Folder | Status |
|---|-------|--------|--------|
| LP-00 | Brief & Page Type Classifier | LP-00-brief-classifier/ | Built |
| LP-01 | Conversion Intelligence Loader | LP-01-conversion-intelligence/ | Built |
| LP-02 | Competitive Page Audit | LP-02-competitive-audit/ | Built |

### Phase 2: Architecture Design
| # | Skill | Folder | Status |
|---|-------|--------|--------|
| LP-03 | Above-Fold Architecture | LP-03-above-fold-architecture/ | Built |
| LP-04 | Section Sequence Planner | LP-04-section-sequence/ | Built |
| LP-05 | Social Proof Architecture | LP-05-social-proof-architecture/ | Built |
| LP-06 | Offer/CTA Architecture | LP-06-offer-cta-architecture/ | Built |

### Phase 3: Element-Level Writing
| # | Skill | Folder | Arena? | Status |
|---|-------|--------|--------|--------|
| LP-07 | Hero Section Writer | LP-07-hero-section/ | Yes (3-Lens) | Built |
| LP-08 | Trust Element Generator | LP-08-trust-elements/ | No | Built |
| LP-09 | Benefits/Features Writer | LP-09-benefits-features/ | No | Built |
| LP-10 | Social Proof Writer | LP-10-social-proof-writer/ | No | Built |
| LP-11 | Offer/Pricing Writer | LP-11-offer-pricing/ | No | Built |
| LP-12 | FAQ/Objection Crusher | LP-12-faq-objections/ | No | Built |
| LP-13 | Urgency/Scarcity Stack | LP-13-urgency-scarcity/ | No | Built |
| LP-14 | CTA Copy Optimizer | LP-14-cta-optimizer/ | Yes (3-Lens) | Built |

### Phase 4: Assembly & Optimization
| # | Skill | Folder | Status |
|---|-------|--------|--------|
| LP-15 | Page Assembly | LP-15-page-assembly/ | Built |
| LP-16 | Mobile/Speed Audit | LP-16-mobile-audit/ | Built |
| LP-17 | Conversion Audit | LP-17-conversion-audit/ | Built |
| LP-18 | A/B Test Plan | LP-18-ab-test-plan/ | Built |

### PDP Enhancement Layer (Type B / Hybrid only — replaces LP skills where PDP diverges)
| # | Skill | Folder | Replaces | Status |
|---|-------|--------|----------|--------|
| PDP-03 | Hero Carousel + Buy Box Architect | PDP-03-hero-carousel-buybox/ | LP-03 | Built |
| PDP-04 | BTF Section Sequencer | PDP-04-btf-section-sequencer/ | LP-04 | Built |
| PDP-05 | Social Proof + Review System | PDP-05-social-proof-review-system/ | LP-05, LP-10 | Built |
| PDP-06 | Offer/Buy Box Writer | PDP-06-offer-buybox-writer/ | LP-06, LP-11, LP-14 | Built |
| PDP-07 | BTF Section Writer | PDP-07-btf-section-writer/ | LP-07, LP-09 (partial) | Built |
| PDP-16 | PDP Mobile + Conversion Audit | PDP-16-mobile-conversion-audit/ | LP-16, LP-17 | Built |

*See PDP-ENGINE.md for full PDP routing, laws, and loading protocol.*

---

## MODEL ASSIGNMENT PATTERN

| Layer | Task Type | Model |
|-------|-----------|-------|
| 0 | Loading, extraction, inventory | haiku |
| 1 | Classification, structural decisions | sonnet |
| 2 | Generation (architecture skills) | opus for CTA/pacing; sonnet for structural |
| 2 | Generation (writing skills) | opus for headlines/leads; sonnet for structured output |
| 3 | Validation, audits, scoring | sonnet |
| 4 | Package assembly | haiku/sonnet |

---

## COPYWRITINGENGINE INTEGRATION

When CopywritingEngine packages exist for a project, LP-00 enters **Downstream Mode** and extracts:
- Research quotes (audience voice)
- Mechanism name + root cause anchor
- Promise statement + headline territory
- Offer package (pricing, bonuses, guarantee)
- Assembled draft (if available)

When no CopywritingEngine packages exist, LP-00 enters **Standalone Mode** and builds the brief from user input alone.

---

## OUTPUT PATH

All execution outputs go to:
```
./~outputs/[project-name]/landing-page/[skill-id]-[skill-name]/
```

Or for standalone builds:
```
./~outputs/[project-name]/[skill-id]-[skill-name]/
```

---

## SESSION-END RULE (MANDATORY)

**BEFORE ending ANY session:** Write `SESSION-STATE.md` to active project directory.

---

### SSR Pre-Screen Validation

After LP-17 (Conversion Audit) completes, SSR pre-screening runs per `~system/protocols/SSR-PRESCREEN-PROTOCOL.md`. A synthetic consumer panel (75-100 personas) evaluates the final output and produces a GO / REVISE / KILL recommendation with segment-stratified diagnostics. The SSR report is included in the output package. Trigger microskill: `skills/LP-17-conversion-audit/skills/layer-4/4.4-ssr-prescreen-trigger.md`

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.2 | 2026-03-20 | Added SSR pre-screen validation reference (LP-17 (Conversion Audit) terminal gate) |
| 1.1 | 2026-03-06 | Updated with PDP Enhancement Layer, design tokens, component pattern library, specimen section extracts |
| 1.0 | 2026-02-28 | Initial creation — 19-skill pipeline, 7 Laws, element taxonomy, specimen vault |

---

*For full skill definitions, see landing-page-engine-master-prd.md. For section flow templates, see landing-page-engine-master-blueprint.md.*
