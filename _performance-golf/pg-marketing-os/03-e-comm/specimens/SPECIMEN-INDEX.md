# E-Comm Specimen Index

**Created:** 2026-03-13
**Updated:** 2026-03-13 (v3 — SF2 + supplement specimens, verbatim specimens embedded in skills)
**Purpose:** Master index for e-commerce copy specimens used by specimen calibrators (0.2) and persona voice loaders (0.2.7) across EC-01 through EC-06.

---

## Source Architecture

### Primary Source: NLS PDP Best Practices

| Source | Location | Content |
|--------|----------|---------|
| NLS PDP Framework | `~brain/nls-pdp-best-practices.md` | 10-thumbnail carousel architecture, BTF section best practices (What It Shows / Why It Exists / Best Practices / Live Examples for every section type), 30+ annotated live reference URLs, Baymard/NN/g mobile UX research |

The NLS document is the PRIMARY calibration source. It defines what each section type should accomplish, how it should be structured, and provides annotated live examples from best-in-class e-commerce PDPs (FourSigmatic, Kachava, Ryze, Stonehenge Health, UpWellness, PetLab, AG1, Seed, HumanN, Pendulum, Nutreance, TryCreate, and others).

### Secondary Source: PG Product Pages

| Product | Type | Source | Extracted |
|---------|------|--------|-----------|
| 357 Fairway Hybrid | Golf club (fairway hybrid) | `pg-main/_pg-physical-products/357/357-sales-page/` | 2026-03-13 |
| ONE.1 Wedge | Golf club (wedge) | `pg-main/_pg-physical-products/one.1/one.1-sales-page/` | 2026-03-13 |
| RS1 Putter | Golf club (putter) | `pg-main/_pg-physical-products/rs1/2-rs1-copy/` | 2026-03-13 |
| SF2 Slice-Fix Driver | Golf club (driver) | `pg-main/_pg-physical-products/sf2/sf2-sales-page/` | 2026-03-13 |

### Tertiary Source: Non-Golf E-Comm (Supplement/Health)

| Product | Brand | Source | Extracted |
|---------|-------|--------|-----------|
| Collagen Peptides / Total Body Formula | Healthy Bones Co. | `healthybonesco.com` | 2026-03-13 |
| Dynamic Joint / Dynamic Nerve / Dynamic Biotics | Stonehenge Health | `stonehengehealth.com` | 2026-03-13 |

Supplement specimens provide naming patterns outside golf — trademarked portmanteau ingredients (FORTIBONE, FORTIGEL, VERISOL), brand naming architecture, and deployment ladder patterns.

PG products are implementation specimens — real copy that shows how the NLS framework translates to physical product e-comm in the golf niche.

---

## Specimen Categories

### 1. NLS Framework (`nls-framework/`)

| File | Content | Primary Consumer |
|------|---------|-----------------|
| `nls-ux-design-standards.md` | Baymard/NN/g mobile PDP research: 8 sections covering image carousel, buy box, CTA, product details, FAQ, reviews, Q&A, persistent navigation | EC-06 (Mobile-First Lens + Design-Copy Integration Lens) |
| `nls-reference-library.md` | All NLS-cited live reference URLs organized by section type with quality ratings and annotations; frequency analysis | All calibrators (visual reference) |

### 2. Feature Naming (`feature-naming/`)

| File | Product | Features Extracted | Status |
|------|---------|-------------------|--------|
| `357-feature-naming.md` | 357 Fairway Hybrid | 5 named features + Tri-Fusion umbrella | COMPLETE |
| `one1-feature-naming.md` | ONE.1 Wedge | 5 named features + Auto-Correct umbrella | COMPLETE |
| `rs1-feature-naming.md` | RS1 Putter | 7 named features + Roll Straight umbrella | COMPLETE |
| `sf2-feature-naming.md` | SF2 Slice-Fix Driver | 7 named features + SliceFix umbrella + micro-scripts + competitive comparison | COMPLETE |
| `supplement-naming-specimens.md` | Healthy Bones Co. + Stonehenge Health | Manufacturer portmanteau names (FORTIBONE, FORTIGEL, VERISOL, TENDOFORTE, ApresFlex), brand naming patterns, deployment ladder, cross-specimen analysis | COMPLETE |
| `feature-naming-patterns.md` | Cross-product analysis | 9 naming patterns (added Portmanteau + Counter-Problem), hierarchy, volume scaling | COMPLETE |

### 3. Hero Sections (`hero-sections/`)

| File | Content | Status |
|------|---------|--------|
| `hero-patterns.md` | **NLS 10-thumbnail carousel architecture** (full detail: What It Shows / Why It Exists / Example Copy / Live References for all 10 positions) + PG headline formulas + ATF architecture comparison + scroll-stop techniques | **v2 COMPLETE** |
| `357-hero.md` | 357 ATF components, headline, subhead, CTA, highlights | COMPLETE |
| `one1-hero.md` | ONE.1 dual hero (PDP + Sales Page), staccato pre-head, offer box | COMPLETE |
| `rs1-hero.md` | RS1 full NLS carousel implementation, Q&A highlights, dual-tier pricing | COMPLETE |

### 4. Section Copy (`section-copy/`)

| File | Content | Status |
|------|---------|--------|
| `section-type-specimens.md` | **NLS best practices + PG implementations** for every BTF section type. Each section: NLS Framework (What It Shows / Why It Exists / Best Practices) → NLS Live References (annotated) → PG Implementation → EC-03 Calibration Notes. Covers: Highlights, UGC, Expert, Ingredients, Timeline, Problem, Mechanism, Comparison, Cost Savings, Reviews, Guarantee, Identity Matching, Proof, FAQ | **v2 COMPLETE** |

### 5. Micro-Scripts (`micro-scripts/`)

| File | Content | Status |
|------|---------|--------|
| `micro-script-patterns.md` | 10 micro-script categories (A/B Equations, Rule of Three, Staccato, Named Compounds, Wordplay, Stark Reminders, Micro-Stories, Rhyme, Alliteration, Category Evolution) + volume benchmarks + EC-04 calibration | COMPLETE |

---

## Calibrator Cross-Reference

| Calibrator | Skill | Primary NLS Specimens | PG Specimens |
|-----------|-------|----------------------|-------------|
| `EC-01/0.2-specimen-calibrator.md` | Feature Naming | NLS ingredient naming format ("X for Y") | `feature-naming/*.md` |
| `EC-02/0.2-specimen-calibrator.md` | Hero & Value Prop | `hero-patterns.md` (10-thumbnail architecture), `nls-reference-library.md` (ATF references) | `hero-sections/357-hero.md`, `one1-hero.md`, `rs1-hero.md` |
| `EC-03/section-router` | Section Copy | `section-type-specimens.md` (NLS framework per section type) | Embedded in section-type-specimens |
| `EC-04/micro-script-generator` | Micro-Scripts | NLS microscript references in Highlights + Ingredients | `micro-scripts/micro-script-patterns.md` |
| `EC-06/0.2-specimen-calibrator.md` | Editorial | `nls-ux-design-standards.md` (Baymard/NN/g), `nls-reference-library.md` (quality benchmarks) | All categories |

---

## What Each File Delivers

### For Copy Generation (EC-01 through EC-04)
- **NLS Framework:** What each section type should show, why it exists, what best practices to follow, example copy
- **PG Implementations:** Real copy specimens showing how the framework translates to physical product e-comm
- **Live References:** URLs to study for visual/structural inspiration
- **Calibration Notes:** Specific rules for the generator skill (word counts, formats, patterns)

### For Editorial (EC-06)
- **NLS UX Standards:** Baymard/NN/g research for mobile-first and design-copy integration audits
- **Reference Library:** Quality benchmarks by section type (what "good" and "bad" look like)
- **PG Implementations:** Standard against which to evaluate generated copy

---

## Version History

| Date | Changes |
|------|---------|
| 2026-03-13 | v1: 3 PG products extracted, 4 specimen categories, cross-product pattern analysis |
| 2026-03-13 | v2: NLS framework integration — added nls-framework/ directory (UX standards + reference library), rebuilt hero-patterns.md with full 10-thumbnail carousel architecture, rebuilt section-type-specimens.md with NLS as primary source for all section types |
| 2026-03-13 | v3: Added SF2 feature naming specimens (7 features + SliceFix umbrella + micro-scripts). Added supplement naming specimens (Healthy Bones Co. + Stonehenge Health — portmanteau patterns, deployment ladder). Embedded verbatim specimens into EC-03 skills (0.4-teachings-loader, 1.2-proof-element-planner, 2.1-section-copy-generator, 2.2-proof-embedding), EC-02 skills (2.1-headline-subhead-generator, 4.1-scroll-stop-validator), EC-04 skills (2.1-script-generator), EC-05 skills (1.1-section-assembler, 2.1-page-builder-handoff-generator, 4.1-assembly-validator). Added Donnie French as 7th persona across all e-comm voice loaders (EC-01, EC-02, EC-03, EC-06). |
