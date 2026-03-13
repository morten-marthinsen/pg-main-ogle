# PDP Enhancement Layer — PDP-ENGINE.md (Router)

**Version:** 1.0
**Created:** 2026-03-04
**Purpose:** Route to the correct reference file for PDP (Product Detail Page) skill execution. This layer augments the LP Engine for Type B / ecommerce pages.

---

## SYSTEM THESIS

The LP Engine was designed Type-A-first with Type B bolted on. A world-class PDP has a fundamentally different architecture than a long-form sales page: a 10-thumbnail story carousel is not a headline; a buy box with variant chips is not a CTA block; a filterable review system is not a testimonial cascade. This layer replaces where PDP diverges. It reuses where it doesn't.

**Core hierarchy:** Above-Fold is 80% of the PDP conversion decision. Below-fold exists for hunt-and-peck reassurance, not linear storytelling.

---

## THE 5 PDP LAWS

1. **Above-fold is 80% of the conversion decision.** The carousel + buy box must answer every purchase question before any scrolling happens.
2. **Scannability over storytelling.** PDP visitors hunt-and-peck. They don't read linearly. Every BTF section must work as an independent module.
3. **Hunt-and-peck trumps linear reading.** Section order matters less than section completeness. Each section must be self-contained and scannable.
4. **UX IS copy.** On a PDP, the interaction design (exposed chips, stepper, sticky ATC, accordion) is as important as the words. Bad UX kills good copy.
5. **Warm traffic, fast conversion.** PDP visitors are typically pre-sold by an ad or referral. Re-confirm the promise, resolve micro-anxieties, remove friction. Don't re-educate.

---

## ARCHITECTURE — WHEN PDP SKILLS ACTIVATE

LP-00 classifies page type. When `type_b` or `hybrid` is detected, the PDP route activates:

```
LP-00 (shared) → LP-01 (shared) → LP-02 (shared)
    │
    ▼ [type_b or hybrid detected → PDP route]
    │
PDP-03: Hero Carousel + Buy Box Architect
    │
    ▼
PDP-04: BTF Section Sequencer
    │
    ▼
[PARALLEL — Phase 3]
  PDP-05: Social Proof + Review System Architect
  PDP-06: Offer/Buy Box Writer
  LP-08  (shared, enhanced): Trust Elements
  LP-09  (shared, enhanced): Benefits/Features
  LP-12  (shared, enhanced): FAQ/Objections
  LP-13  (shared): Urgency/Scarcity
  PDP-07: BTF Section Writer
    │
    ▼
LP-15 (shared, enhanced): Page Assembly → PDP-16: PDP Audit → LP-18 (shared)
```

**Type A pages:** Continue using LP-03 through LP-14 as designed. PDP skills are never invoked.
**Hybrid pages:** Use PDP above-fold (PDP-03) + PDP BTF sequencing (PDP-04) + both PDP and LP writing skills as needed.

---

## REFERENCE FILES

| File | When to Load | Contains |
|------|-------------|----------|
| **PDP-ENGINE.md** | Every PDP skill execution (you're reading this now) | PDP Laws, routing, skill directory, model assignment |
| **reference/PDP-BEST-PRACTICES-REFERENCE.md** | PDP-03, PDP-04, PDP-05, PDP-06, PDP-07, PDP-16 | 10-Thumbnail Story Architecture, BTF Section Templates, Baymard/NN-g findings, PDP Specimen Library |
| **landing-page-engine-master-blueprint.md** | PDP-04 (section sequencing context) | Section flow defaults — PDP-04 overrides Type B defaults from this file |
| **element-taxonomy.md** | PDP-03, PDP-04, PDP-07 | Element types — PDP adds carousel, buy box, review system elements |
| **conversion-data-reference.md** | PDP-16 (audit benchmarks) | Conversion benchmarks — PDP-16 adds Baymard-specific mobile metrics |
| **specimens/specimen-index.md** | All PDP skills | Specimen reference — PDP specimens annotated in BEST-PRACTICES-REFERENCE |

---

## LOADING PROTOCOL

```
FOR EVERY PDP SKILL EXECUTION:
  1. READ this file (PDP-ENGINE.md) — you're doing this now
  2. READ the parent LANDING-PAGE-ENGINE.md (universal LP laws apply)
  3. READ the skill's ANTI-DEGRADATION.md (mandatory)
  4. READ the skill's AGENT.md (mandatory)
  5. READ each microskill spec BEFORE executing that microskill
  6. READ reference/PDP-BEST-PRACTICES-REFERENCE.md

FOR PDP ARCHITECTURE SKILLS (PDP-03, PDP-04):
  7. READ landing-page-engine-master-blueprint.md (for comparison)
  8. READ element-taxonomy.md

FOR PDP WRITING SKILLS (PDP-05, PDP-06, PDP-07):
  9. READ relevant specimens from PDP-BEST-PRACTICES-REFERENCE.md lookups

FOR PDP AUDIT (PDP-16):
  10. READ conversion-data-reference.md
  11. READ reference/PDP-BEST-PRACTICES-REFERENCE.md (full Baymard checklist)
```

---

## PDP SKILL DIRECTORY

### Phase 2: PDP Architecture (replaces LP-03, LP-04 for Type B)
| # | Skill | Folder | Status |
|---|-------|--------|--------|
| PDP-03 | Hero Carousel + Buy Box Architect | PDP-03-hero-carousel-buybox/ | Built |
| PDP-04 | BTF Section Sequencer | PDP-04-btf-section-sequencer/ | Built |

### Phase 3: PDP Writing (replaces portions of LP-05–LP-14 for Type B)
| # | Skill | Folder | Status |
|---|-------|--------|--------|
| PDP-05 | Social Proof + Review System Architect | PDP-05-social-proof-review-system/ | Built |
| PDP-06 | Offer/Buy Box Writer | PDP-06-offer-buybox-writer/ | Built |
| PDP-07 | BTF Section Writer | PDP-07-btf-section-writer/ | Built |

### Phase 4: PDP Audit (replaces LP-16 + LP-17 for Type B)
| # | Skill | Folder | Status |
|---|-------|--------|--------|
| PDP-16 | PDP Mobile + Conversion Audit | PDP-16-mobile-conversion-audit/ | Built |

### Shared Skills (enhanced for PDP, no separate PDP version)
| # | Skill | PDP Enhancement |
|---|-------|----------------|
| LP-00 | Brief Classifier | PDP routing logic in type declaration |
| LP-01 | Conversion Intelligence | Shared — no changes |
| LP-02 | Competitive Audit | Shared — no changes |
| LP-08 | Trust Elements | +2 microskills: PDP trust badge patterns, expert section framing |
| LP-09 | Benefits/Features | +3 microskills: ingredient card format, microscript benefit pattern, vertical-expanded layout |
| LP-12 | FAQ/Objections | +2 microskills: Baymard top 5-7 curation, accordion-only enforcement |
| LP-13 | Urgency/Scarcity | Shared — no changes |
| LP-15 | Page Assembly | +3 microskills: PDP assembly path, PDP validation, PDP section ordering |
| LP-18 | A/B Test Plan | Shared — no changes |

---

## MODEL ASSIGNMENT PATTERN (PDP Skills)

| Layer | Task Type | Model |
|-------|-----------|-------|
| 0 | Loading, extraction, inventory | haiku |
| 1 | Classification, structural decisions, carousel architecture | sonnet |
| 2 | Generation (section copy, buy box copy, review system design) | opus for carousel story / buy box; sonnet for structured output |
| 3 | Validation, audits, scoring | sonnet (audits), opus (Baymard compliance) |
| 4 | Package assembly | haiku/sonnet |

---

## PDP vs LP DIVERGENCE MAP

| Phase | LP Engine Skills | PDP Divergence | Action |
|-------|-----------------|---------------|--------|
| Phase 1: Intelligence | LP-00, LP-01, LP-02 | LOW (80% shared) | Reuse + minor enhance (LP-00 routing) |
| Phase 2: Architecture | LP-03, LP-04 | **HIGH (20% shared)** | Replace with PDP-03, PDP-04 |
| Phase 3: Writing | LP-05 through LP-14 | MIXED (40% shared) | Replace some (PDP-05/06/07), enhance others (LP-08/09/12) |
| Phase 4: Assembly/Audit | LP-15 through LP-18 | MEDIUM (60% shared) | Enhance LP-15, replace LP-16+17 with PDP-16, reuse LP-18 |

---

## FOUNDATIONAL PRINCIPLES (from NLS / Baymard / NN-g)

1. **DR Principles Remixed** — Traditional direct response persuasion restructured for hunt-and-peck PDP behavior
2. **Semi-Qualified Traffic** — Most visitors are pre-sold from product-first ads; page must also serve category searchers who don't know the product
3. **UX/UI Best Practices** — Baymard Institute and NN-g conversion testing research governs interaction patterns
4. **Scannability First** — Every section digestible at a glance; visitors choose which sections to deep-dive

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

*For full PDP best practices and Baymard research, see reference/PDP-BEST-PRACTICES-REFERENCE.md. For LP Engine universal rules, see LANDING-PAGE-ENGINE.md.*
