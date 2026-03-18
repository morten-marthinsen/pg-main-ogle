# E-Commerce Copy Engine — E-COMM-ENGINE.md

**Version:** 1.0
**Created:** 2026-03-09
**Purpose:** Institutional memory and execution constraints for E-Commerce Copy Engine sessions. This is the master instruction file for the E-Comm Engine subsystem of Marketing-OS.

---

## TABLE OF CONTENTS

- [THE 5 LAWS (Never Scroll Past This)](#the-5-laws-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [THE CORE PROBLEM: E-COMM-SPECIFIC DEGRADATION PATTERNS](#the-core-problem-e-comm-specific-degradation-patterns)
- [ARCHITECTURE OVERVIEW](#architecture-overview)
- [FEATURE NAMING ARCHITECTURE (EC-01)](#feature-naming-architecture-ec-01)
- [HERO & VALUE PROP ARCHITECTURE (EC-02)](#hero--value-prop-architecture-ec-02)
- [SECTION COPY ARCHITECTURE (EC-03)](#section-copy-architecture-ec-03)
- [MICRO-SCRIPT ARCHITECTURE (EC-04)](#micro-script-architecture-ec-04)
- [REFERENCE SOURCES](#reference-sources)
- [LONG-FORM CROSSOVER MAP](#long-form-crossover-map)
- [SKILL BUILD STATUS](#skill-build-status)
- [VERSION HISTORY](#version-history)

---

## THE 5 LAWS (Never Scroll Past This)

1. **Ecom copy is scanned, not read.** Every section must work standalone. If a section requires context from another section, you've failed.
2. **Feature naming IS the copy.** A great feature name does more work than a paragraph of description. "Dynamic Loft Control" > "This club adjusts loft automatically." Invest 10x more time in naming than describing.
3. **The hero sells the click, not the product.** Above-fold has one job: stop the scroll and earn the scroll-down. Value prop + one visual proof point + CTA.
4. **Social proof is king.** On ecom, proof converts more than copy. Reviews, UGC, before/after, numbers, awards. Every section should have at least one proof element.
5. **Design notes are part of the output.** Unlike long-form, ecom copy is inseparable from layout. Every section must include UX/design notes for the page builder handoff.

---

## CRITICAL: READ THIS FIRST

This file exists because **e-commerce copy has its own degradation patterns** distinct from long-form sales copy. Ecom pages are scanned in 3-5 seconds — if the copy doesn't work at scan speed, it fails regardless of quality.

The key architectural insight: **E-comm copy should be fully polished BEFORE going into the page builder.** The flow is: Core Message → E-Comm Copy → Page Builder → Copy Edits (post-design loop). Feature naming alone is 30% of an ecom page and deserves its own robust skill.

**This file is the fix.** Before executing ANY E-Comm Engine skill, read the relevant sections below.

---

## THE CORE PROBLEM: E-COMM-SPECIFIC DEGRADATION PATTERNS

### Pattern 1: The Long-Form Bleed
The model writes ecom copy as if it were a sales page — long paragraphs, flowing narrative, building arguments across sections. Ecom is scanned. Each section is an island. **The fix:** EC-03 (Section Copy) enforces standalone section validation. Test: shuffle the sections randomly. Does each still make sense?

### Pattern 2: The Generic Feature Name
The model names features with technical jargon or generic descriptors — "Advanced Technology" or "Premium Materials." Feature names should be caveman-benefit format. **The fix:** EC-01 (Feature Naming) uses the "caveman-benefit" test: ingredient/tech + plain-language benefit. "L-Theanine for Tranquility" not "L-Theanine Complex."

### Pattern 3: The Copy-Only Handoff
The model produces copy with no design context — no layout notes, no image specs, no mobile behavior. Ecom copy is inseparable from layout. **The fix:** EC-05 (Assembly) produces both copy AND design notes per section. Every section output includes UX/design specs for page builder handoff.

### Pattern 4: The Proof Desert
The model writes persuasive copy but forgets proof elements. On ecom, proof converts more than persuasion. **The fix:** EC-03 (Section Copy) requires at least one proof element per section — review quote, UGC reference, before/after, statistic, or award.

### Pattern 5: The Bloated Hero
The model packs the hero section with everything — benefits, features, proof, story. The hero has ONE job: stop the scroll and earn the scroll-down. **The fix:** EC-02 (Hero & Value Prop) enforces a tight hero: headline + subhead + value prop + one visual proof point + CTA. Everything else goes BTF.

### Pattern 6: The Missing Micro-Scripts
The model produces static copy but ignores video/carousel/GIF elements that are standard on ecom pages. **The fix:** EC-04 (Micro-Scripts) writes short-form scripts (15-60 seconds) mapped to specific page sections, following the PG sf2 pattern.

### Anti-Degradation Protocol (E-Comm-Specific)

```
WHEN YOU NOTICE YOURSELF:
- Writing paragraphs that build on each other → STOP. Make each section standalone.
- Naming features with generic descriptors → STOP. Use caveman-benefit format.
- Producing copy without design notes → STOP. Add UX/layout specs per section.
- Writing a section without proof → STOP. Add at least one proof element.
- Packing the hero with everything → STOP. Hero = headline + subhead + value prop + proof + CTA.
- Skipping micro-scripts → STOP. Map video/carousel elements to sections.

IF CONTEXT IS LARGE:
- This does NOT excuse long-form narrative in ecom sections
- This does NOT excuse generic feature naming
- This does NOT excuse copy-only output (no design notes)
- Request continuation rather than compressing quality
```

---

## ARCHITECTURE OVERVIEW

The E-Commerce Copy Engine is a 7-skill pipeline that generates e-commerce copy — downstream from the Campaign Brief (Skill 09) and upstream of the Page Builder (LP-00). Feature naming is the cornerstone skill.

### Skill Pipeline

```
EC-00: E-Comm Strategist
  → Analyze product, determine page type (PDP, collection, bundle),
    map section architecture using NLS framework (19 section types),
    identify which sections apply to this product
  → Mode A (downstream from Skills 01-09) or Mode B (standalone brief)
  → Outputs: ecomm-strategy.yaml (section map + priority + word budgets)

EC-01: Feature Naming & Scoping  ← THE critical skill (30% of ecom page)
  → Deep research into product capabilities
  → Name features with caveman-benefit format
  → Prioritize feature hierarchy (which features lead, which support)
  → Write micro-script descriptions per feature
  → Arena: generative_full_draft
  → Outputs: feature-package.json (names, descriptions, hierarchy, micro-scripts)

EC-02: Hero & Value Prop Writer
  → Write above-fold hero: headline, subhead, value proposition, hero CTA
  → 10-thumbnail hero story architecture copy (NLS framework)
  → Product highlights TLDR (top 3-5 quick answers)
  → Arena: generative_full_draft
  → Outputs: hero-copy-draft.md

EC-03: Section Copy Writer
  → Write all BTF page sections from strategy map:
    Problem/agitation, mechanism/technology, what-to-expect timeline,
    ingredients, comparison chart, cost savings, expert credibility,
    use cases, offer/pricing, guarantee, FAQ
  → Iterates per section from EC-00 blueprint
  → Loads crossover patterns from long-form skills (13, 14, 15, 16, 18)
  → Arena: generative_full_draft (per major section)
  → Outputs: section-copy-package.json + section-copy-assembled.md

EC-04: Micro-Script Writer
  → Product micro-scripts for video/carousel/GIF elements
  → Short-form (15-60 second scripts)
  → Per SF2 pattern: micro-scripts map to specific page sections
  → Outputs: micro-scripts.json

EC-05: E-Comm Assembly
  → Assemble all copy sections with UX/design notes for page builder handoff
  → Cross-section consistency validation, feature thread verification
  → Include section-by-section design spec notes (per PG sf2 pattern)
  → No Arena
  → Outputs: ecomm-copy-assembled.md + page-builder-handoff.yaml

EC-06: E-Comm Editorial
  → Quality review, scan-optimization check (ecom is scanned not read)
  → Micro-script quality, feature naming consistency, proof density
  → Brand compliance gates: copy restrictions + design compliance (per WORKSPACE.md Tier 1 + Tier 2)
  → Arena: editorial_revision
  → Outputs: ecomm-copy-final.md
```

### Dependency Chain

```
Skill 09 (Campaign Brief) ──→ EC-00 (Strategy) ──→ EC-01 (Feature Naming)
                                                ──→ EC-02 (Hero & Value Prop)
                                                ──→ EC-03 (Section Copy)
                                                ──→ EC-04 (Micro-Scripts)
                        EC-01 + EC-02 + EC-03 + EC-04 ──→ EC-05 (Assembly) ──→ EC-06 (Editorial)
                                                                           ──→ LP-00 (Page Builder)
```

### Integration Points

| From | To | What Passes |
|------|-----|------------|
| Skill 09 (Campaign Brief) | EC-00 | campaign-brief.json (product details, mechanism, feature seeds, audience, voice) |
| EC-01 (Feature Naming) | EC-02, EC-03 | feature-package.json (named features, hierarchy, micro-scripts) |
| EC-05 (Assembly) | LP-00 (Page Builder) | ecomm-copy-assembled.md + page-builder-handoff.yaml |
| Long-Form Skills 13-16, 18 | EC-03 | Crossover patterns for section copy (problem, mechanism, product, offer, proof) |

---

## FEATURE NAMING ARCHITECTURE (EC-01)

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

### Micro-Script per Feature
Every feature gets a 1-2 sentence micro-script describing what it does and why it matters. These scripts feed EC-02 (hero), EC-03 (sections), and EC-04 (video scripts).

---

## HERO & VALUE PROP ARCHITECTURE (EC-02)

### Hero Components (ATF)

| Component | Purpose | Word Budget |
|-----------|---------|-------------|
| Headline | Stop the scroll, name the product promise | 5-12 words |
| Subhead | Expand headline, add specificity | 10-20 words |
| Value Proposition | Why this product, why now | 15-30 words |
| Hero CTA | Primary action button | 3-5 words |
| Product Highlights TLDR | Top 3-5 quick answers | 50-100 words total |

### 10-Thumbnail Hero Story (NLS Framework)
The hero carousel tells a product story in 10 images. EC-02 provides the copy overlay for each thumbnail position, following the NLS PDP best practices carousel architecture.

---

## SECTION COPY ARCHITECTURE (EC-03)

### NLS PDP Section Framework (19 Section Types)

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

## MICRO-SCRIPT ARCHITECTURE (EC-04)

### Script Types

| Type | Duration | Purpose | Page Placement |
|------|----------|---------|---------------|
| Hero Video | 30-60s | Product overview/demo | ATF hero carousel |
| Feature Explainer | 15-30s | Single feature deep-dive | Feature sections |
| UGC Script | 15-30s | Customer testimonial framework | UGC carousel |
| How-To | 30-60s | Usage demonstration | How to Use section |
| Comparison | 15-30s | Side-by-side demo | Comparison section |

### Section Mapping
Per the PG sf2 pattern, every micro-script maps to a specific page section. EC-04 outputs include the section reference so the page builder knows where each script appears.

---

## REFERENCE SOURCES

### NLS PDP Best Practices
`~brain/nls-pdp-best-practices.md` — 19 PDP section types with copy recommendations. This is the primary framework for EC-00 section mapping.

### PG Physical Products (External)
`github.com/performance-golf/pg-main/_performance-golf/_pg-physical-products/` — Real ecom copy workflow:
- `sf2/sf2-sales-page/1-sf2-sections-components/` — 7-step section definition process
- `sf2/sf2-sales-page/2-sf2-copy/sf2-copy-pdp/` — PDP copy with micro-scripts per section
- `sf2/3-sf2-copy-sauce/` — Copy source material
- Products: 357, clst, one.1, rs1, sf1, sf2, spd (7 physical product projects)

---

## LONG-FORM CROSSOVER MAP

These long-form VSL skills have direct ecom analogs. EC-03 loads crossover patterns from these skills when writing type-matched sections.

| Long-Form Skill | Ecom Application | E-Comm Skill |
|----------------|------------------|--------------|
| 10-Headlines | Hero headlines, section headlines | EC-02 (Hero & Value Prop) |
| 13-Root Cause Narrative | Problem/agitation section | EC-03 (Section Copy) |
| 14-Mechanism Narrative | Technology/how-it-works section | EC-03 (Section Copy) |
| 15-Product Introduction | Product highlights, features | EC-01 (Feature Naming) + EC-03 |
| 16-Offer Copy | Offer/pricing/value stack sections | EC-03 (Section Copy) |
| 18-Proof Weaving | UGC, reviews, social proof sections | EC-03 (Section Copy) |

Skills 11 (Lead), 12 (Story), 17 (Close) have minimal ecom relevance — story-driven, not scan-optimized.

---

## SKILL BUILD STATUS

| Skill | Status | Files | Built |
|-------|--------|-------|-------|
| EC-00 — E-Comm Strategist | COMPLETE | SKILL.md, EC-00-AGENT.md, EC-00-ANTI-DEGRADATION.md, microskills | 2026-03-09 |
| EC-01 — Feature Naming & Scoping | COMPLETE | SKILL.md, EC-01-AGENT.md, EC-01-ANTI-DEGRADATION.md, EC-01-ARENA-LAYER.md, microskills | 2026-03-09 |
| EC-02 — Hero & Value Prop Writer | COMPLETE | SKILL.md, EC-02-AGENT.md, EC-02-ANTI-DEGRADATION.md, microskills | 2026-03-09 |
| EC-03 — Section Copy Writer | COMPLETE | SKILL.md, EC-03-AGENT.md, EC-03-ANTI-DEGRADATION.md, microskills | 2026-03-09 |
| EC-04 — Micro-Script Writer | COMPLETE | SKILL.md, EC-04-AGENT.md, EC-04-ANTI-DEGRADATION.md, microskills | 2026-03-09 |
| EC-05 — E-Comm Assembly | COMPLETE | SKILL.md, EC-05-AGENT.md, EC-05-ANTI-DEGRADATION.md, microskills | 2026-03-09 |
| EC-06 — E-Comm Editorial | COMPLETE | SKILL.md, EC-06-AGENT.md, EC-06-ANTI-DEGRADATION.md, microskills | 2026-03-09 |

**All 7 skills fully built with AGENT.md (orchestrator), ANTI-DEGRADATION.md (structural enforcement), and complete microskill architecture.**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation — architecture, 5 Laws, 6 degradation patterns, skill pipeline, NLS PDP framework (19 sections), feature naming architecture, long-form crossover map, 7 v1 skill scaffolds. |
