# LP-15: Page Assembly — Master Agent

> **Version:** 1.1
> **Skill:** LP-15-page-assembly
> **Position:** Phase 4 — Assembly (the most critical Phase 4 skill — everything converges here)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** ALL Phase 1-3 outputs. See Upstream Package Map below.
> **Output:** `assembled-page-package.json` + `ASSEMBLY-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Integrate all upstream element packages into a complete, threaded, transition-connected page brief. LP-15 is where every upstream skill's output converges into a single assembled page. It writes section transitions, validates threading from headline promise through mechanism to close, and verifies that Arena-selected copy is correctly incorporated.

**This is the convergence point.** Every architecture decision (LP-03 through LP-06) and every written element (LP-07 through LP-14) feeds into LP-15. If LP-15 fails, the downstream audit (LP-17), test plan (LP-18), and the entire page fail.

**Success Criteria:**
- All required upstream packages loaded and inventoried (zero silent omissions)
- Arena-selected copy from LP-07 (HERO_SELECTION.yaml) and LP-14 (CTA_SELECTION.yaml) verified and incorporated verbatim
- Section order matches LP-04's section-sequence.json (deviations require explicit justification)
- Every section boundary has a transition sentence or paragraph — no bare concatenation
- Threading validated: headline promise is fulfilled in body, mechanism connects to promise, close references both
- Page type (Type A / Type B / Hybrid) from LP-00 governs element requirements
- Assembled page is complete for its page type per element-taxonomy.md

---

## IDENTITY

**This skill IS:**
- The integrator that assembles all upstream outputs into a single cohesive page
- A transition writer that connects sections with purposeful bridges
- A threading validator that ensures the page tells one coherent story from headline to close
- An Arena-verification checkpoint that confirms selected variants are used (not pre-Arena candidates)

**This skill is NOT:**
- A rewriter — it uses the copy as written by upstream skills. It writes ONLY transitions and structural connective tissue.
- An architecture skill — it follows the architecture set by LP-03, LP-04, LP-05, LP-06
- A quality auditor — LP-17 scores the assembled page. LP-15 assembles it.
- A generator of new headlines, CTAs, or body copy — those come from LP-07 through LP-14

**Upstream:** Every skill from LP-00 through LP-14 provides packages. See the Upstream Package Map.
**Downstream:** Feeds `assembled-page-package.json` to LP-16 (Mobile/Speed Audit), LP-17 (Conversion Audit), LP-18 (A/B Test Plan).

---

## UPSTREAM PACKAGE MAP

| Upstream Skill | Package | Required? | Purpose |
|---|---|---|---|
| LP-00 | page-brief.json | YES — BLOCKING | Page type, audience, vertical, awareness stage |
| LP-03 | above-fold-blueprint.json | YES | Above-fold architecture: element order, hierarchy, layout |
| LP-04 | section-sequence.json | YES | Section order for the full page — the assembly blueprint |
| LP-05 | social-proof-architecture.json | YES | Proof wave pattern, density targets, placement rules |
| LP-06 | offer-cta-architecture.json | YES | Offer structure, CTA placement plan, price display, guarantee architecture |
| LP-07 | hero-section-package.json + HERO_SELECTION.yaml | YES — ARENA VERIFIED | Hero section: headline, deck, hero image brief, early trust signals. **Arena-selected variant.** |
| LP-08 | trust-elements.json | YES | Trust badges, certification badges, media mentions, partner logos |
| LP-09 | benefits-features.json | YES | Benefit bullets, feature deep-dives, benefit-before-feature ordering |
| LP-10 | social-proof-copy.json | YES | Testimonials, reviews, case studies, before/after content |
| LP-11 | pricing-section.json | YES | Price display, bundles, subscriptions, value stack, anchoring |
| LP-12 | faq-package.json | YES | FAQ Q&As, objection handling |
| LP-13 | urgency-package.json | YES | Urgency/scarcity elements, countdown, stock indicators |
| LP-14 | cta-copy-package.json + CTA_SELECTION.yaml | YES — ARENA VERIFIED | CTA copy for all placements. **Arena-selected variant.** |
| CopywritingEngine | 19-campaign-assembly (if available) | OPTIONAL | Pre-assembled long-form copy from CopywritingEngine pipeline |

### PDP-Specific Upstream Packages (Type B / Hybrid only)

When `page_type` is `type_b` or `hybrid`, PDP skills replace several LP packages. Loaded by microskill 0.5 instead of 0.2+0.3.

| Upstream Skill | Package | Required? | Replaces | Purpose |
|---|---|---|---|---|
| PDP-03 | pdp-above-fold-blueprint.json | YES — BLOCKING | LP-03 | Carousel (10 slides) + buy box architecture (10 components) + facts panel |
| PDP-04 | pdp-section-sequence.json | YES — BLOCKING | LP-04 | BTF section order for the PDP page — 15+ PDP-specific sections |
| PDP-05 | pdp-social-proof-system.json | YES | LP-05, LP-10 | Review system: histogram, filters, UGC, Q&A, highlighted reviews |
| PDP-06 | pdp-offer-buy-box.json | YES — BLOCKING | LP-06, LP-11, LP-14 | Buy box copy, ATC CTA text, subscription tiles, price display, variant options |
| PDP-07 | pdp-btf-sections.json | YES — BLOCKING | LP-07 (partial), LP-09 (partial) | All BTF section copy (benefits, how-it-works, ingredients, science, comparison, etc.) |
| LP-08 | trust-elements-package.json | YES (shared) | — | Trust badges, certifications — shared with PDP path |
| LP-09 | benefits-section-package.json | YES (shared) | — | Benefit bullets, feature deep-dives — PDP-formatted |
| LP-12 | faq-package.json | YES (shared) | — | FAQ Q&As — accordion-formatted for PDP |
| LP-13 | urgency-package.json | YES (shared) | — | Urgency/scarcity — stock indicator, urgency micro-copy |

**Packages NOT loaded for PDP pages:** LP-03, LP-04, LP-05, LP-06, LP-07 (hero-section-package.json), LP-10 (social-proof-copy.json), LP-14 (cta-copy-package.json). These are replaced by PDP skills above.

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Input Loading
  -> 0.1: Load page brief (from LP-00) — determines page_type
  |
  IF page_type = type_a:
    -> 0.2: Load architecture packages (from LP-03, LP-04, LP-05, LP-06)
    -> 0.3: Load content packages (from LP-07, LP-08, LP-09, LP-10, LP-11, LP-12, LP-13, LP-14)
    -> 0.4: Arena Verification — load HERO_SELECTION.yaml and CTA_SELECTION.yaml, verify match
  |
  IF page_type = type_b OR hybrid:
    -> 0.5: Load PDP packages (from PDP-03, PDP-04, PDP-05, PDP-06, PDP-07 + shared LP-08, LP-09, LP-12, LP-13)
    -> 0.4: Arena Verification — for LP-07/LP-14 if used (PDP pages may not use these)
  |
  | [GATE_0: Page brief loaded? All required packages present? Arena selections verified (if applicable)?]
LAYER_1: Assembly Planning
  -> 1.1: Package inventory — flag missing packages, determine assembly mode
  -> 1.2: Section order confirmation — confirm LP-04 (Type A) or PDP-04 (Type B) sequence
  -> 1.3: Transition strategy — story bridges (Type A) or section headers (Type B/PDP)
  | [GATE_1: Inventory complete? Section order confirmed? Transition plan ready?]
LAYER_2: Assembly Execution
  |
  IF page_type = type_a:
    -> 2.1: Above-fold assembly — headline, deck, hero image, trust, primary CTA
    -> 2.2: Body section assembly — story, root cause, mechanism, benefits, ingredients, proof blocks
    -> 2.3: Conversion section assembly — value stack, pricing, guarantee, urgency, FAQ, CTA, close, P.S.
  |
  IF page_type = type_b OR hybrid:
    -> 2.5: PDP page assembly — carousel + buy box + facts panel + BTF sections + reviews + FAQ accordion + sticky ATC bar
  |
  -> 2.4: Threading validation — headline/product promise through mechanism to close/ATC
  | [GATE_2: All sections assembled? Transitions written (Type A) or headers present (Type B)? Threading validated?]
LAYER_3: Quality Checks
  |
  IF page_type = type_a:
    -> 3.1: Completeness audit — all required elements present for page type
    -> 3.2: Arena copy verification — GATE: verbatim Arena-selected copy in assembled output
  |
  IF page_type = type_b OR hybrid:
    -> 3.4: PDP assembly validation — carousel, buy box, BTF coverage, UX compliance, no Type A leaks
  |
  -> 3.3: Assembly audit — score section ordering, transitions/headers, threading, completeness (adapted for PDP criteria if Type B)
  | [GATE_3: Completeness/PDP validation passes? Arena/ATC copy verified? Assembly score >= 7.0?]
LAYER_4: Package Assembly
  -> 4.1: Compile assembled-page-package.json
  -> 4.2: Write ASSEMBLY-SUMMARY.md
  -> 4.3: Write execution-log.md
  |
COMPLETE
```

### PDP Assembly Path Summary

When `page_type` is `type_b` or `hybrid`:
- **0.5** runs INSTEAD of 0.2+0.3 (loads PDP packages instead of LP packages)
- **0.4** still runs (Arena verification for LP-07/LP-14 — though PDP pages may not use LP-07/LP-14)
- **2.5** runs INSTEAD of 2.1+2.2+2.3 (PDP assembly replaces standard assembly)
- **2.4** still runs (threading validation — adapted for PDP: carousel promise through BTF to final CTA)
- **3.4** runs INSTEAD of 3.1+3.2 (PDP validation replaces standard validation)
- **3.3** still runs (assembly audit — score adapted for PDP criteria)

---

## MODEL ASSIGNMENT TABLE

| Layer | Microskill | Model | Rationale |
|-------|-----------|-------|-----------|
| 0 | 0.1 Brief Loader | haiku | File loading, no judgment |
| 0 | 0.2 Architecture Loader | haiku | File loading, no judgment |
| 0 | 0.3 Content Loader | haiku | File loading, no judgment |
| 0 | 0.4 Arena Verification Loader | haiku | File loading + verification comparison — no creative judgment |
| 0 | 0.5 PDP Package Loader | haiku | File loading for PDP packages — no judgment |
| 1 | 1.1 Package Inventory | sonnet | Structural analysis, moderate judgment |
| 1 | 1.2 Section Order Planner | sonnet | Planning, sequence confirmation |
| 1 | 1.3 Transition Strategy | sonnet | Strategic planning, threading analysis |
| 2 | 2.1 Above-Fold Assembler | sonnet | Structural assembly (copy already written by LP-07) |
| 2 | 2.2 Body Section Assembler | opus | Creative transition writing between sections |
| 2 | 2.3 Conversion Section Assembler | opus | Creative transition writing for conversion sections |
| 2 | 2.4 Threading Validator | opus | Critical judgment — evaluating narrative coherence across full page |
| 2 | 2.5 PDP Page Assembler | opus | PDP assembly requires structural judgment about scan-optimized layout |
| 3 | 3.1 Completeness Audit | sonnet | Checklist verification against taxonomy |
| 3 | 3.2 Arena Copy Verification | sonnet | Verbatim text comparison — moderate judgment |
| 3 | 3.3 Assembly Audit | sonnet | Scoring and judgment |
| 3 | 3.4 PDP Assembly Validator | sonnet | Systematic validation against PDP requirements |
| 4 | 4.1 Page Package Compiler | haiku | JSON assembly |
| 4 | 4.2 Summary Writer | sonnet | Human-readable summary writing |
| 4 | 4.3 Log Writer | haiku | Execution logging |

**POSITIONAL REINFORCEMENT — READ THIS AT EVERY LAYER ENTRY:**
> You are LP-15, Page Assembly. You ASSEMBLE upstream outputs into a cohesive page. You write ONLY transitions and structural connective tissue — you do NOT rewrite upstream copy. You verify Arena-selected copy is incorporated verbatim. Every section boundary must have a transition. Threading from headline to close must be validated. Gates are PASS or FAIL — nothing else.

---

## LAYER DETAILS

### Layer 0: Input Loading

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 0.1 | Brief Loader | `skills/layer-0/0.1-brief-loader.md` | Load page brief from LP-00 | `page-brief.json` path | `brief-load.md` | haiku |
| 0.2 | Architecture Loader | `skills/layer-0/0.2-architecture-loader.md` | Load architecture packages from LP-03, LP-04, LP-05, LP-06 | 4 architecture package paths | `architecture-load.md` | haiku |
| 0.3 | Content Loader | `skills/layer-0/0.3-content-loader.md` | Load all writing skill outputs from LP-07 through LP-14 | 8 content package paths | `content-load.md` | haiku |
| 0.4 | Arena Verification Loader | `skills/layer-0/0.4-arena-verification-loader.md` | Load HERO_SELECTION.yaml and CTA_SELECTION.yaml, verify Arena-selected variants match content packages | Selection checkpoint paths + content packages | `arena-verification-load.md` | haiku |
| 0.5 | PDP Package Loader | `skills/layer-0/0.5-pdp-package-loader.md` | **PDP PATH ONLY (type_b/hybrid).** Load PDP skill outputs (PDP-03 through PDP-07) + shared LP packages (LP-08, LP-09, LP-12, LP-13). Runs INSTEAD of 0.2+0.3. | PDP package paths + shared LP package paths | `pdp-packages-loaded.md` | haiku |

**GATE_0 (Type A):** Page brief loaded AND all 4 architecture packages loaded AND all 8 content packages loaded AND Arena selections verified (no mismatch). If ANY required package is missing -> HALT with message identifying which upstream skill must be run first. If Arena verification detects a mismatch -> HALT with message: "Arena-selected variant does not match content package. [Skill] must re-export or re-run Arena."

**GATE_0 (Type B / Hybrid — PDP):** Page brief loaded AND all 5 PDP packages loaded (PDP-03, PDP-04, PDP-05, PDP-06, PDP-07) AND all 4 shared LP packages loaded (LP-08, LP-09, LP-12, LP-13). If ANY critical PDP package is missing (PDP-03, PDP-04, PDP-06, PDP-07) -> HALT: "LP-15 requires [package] from [skill]. Run [skill] first." LP-03/LP-04/LP-05/LP-06/LP-07/LP-14 packages must NOT be loaded for PDP pages.

### Layer 1: Assembly Planning

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 1.1 | Package Inventory | `skills/layer-1/1.1-package-inventory.md` | Inventory all packages, flag missing, determine assembly mode | `brief-load.md`, `architecture-load.md`, `content-load.md`, `arena-verification-load.md` | `package-inventory.md` | sonnet |
| 1.2 | Section Order Planner | `skills/layer-1/1.2-section-order-planner.md` | Confirm section order from LP-04, adapt for available content | `package-inventory.md`, `architecture-load.md` | `section-order-plan.md` | sonnet |
| 1.3 | Transition Strategy | `skills/layer-1/1.3-transition-strategy.md` | Plan transitions between sections, identify threading anchors | `section-order-plan.md`, `content-load.md`, `brief-load.md` | `transition-strategy.md` | sonnet |

**GATE_1:** Package inventory complete with all packages accounted for (present or explicitly flagged as missing). Section order confirmed with LP-04 as source of truth. Transition strategy covers every section boundary. If any section boundary lacks a transition plan -> HALT, complete the plan.

### Layer 2: Assembly Execution

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 2.1 | Above-Fold Assembler | `skills/layer-2/2.1-above-fold-assembler.md` | Assemble above-fold: Arena-selected headline, deck, hero image brief, trust signals, primary CTA | `architecture-load.md`, `content-load.md`, `arena-verification-load.md`, `section-order-plan.md` | `above-fold-assembly.md` | sonnet |
| 2.2 | Body Section Assembler | `skills/layer-2/2.2-body-section-assembler.md` | Assemble body sections in LP-04 order, write transitions | `section-order-plan.md`, `content-load.md`, `transition-strategy.md` | `body-section-assembly.md` | opus |
| 2.3 | Conversion Section Assembler | `skills/layer-2/2.3-conversion-section-assembler.md` | Assemble conversion sections: value stack, pricing, guarantee, urgency, FAQ, CTA, close, P.S. | `section-order-plan.md`, `content-load.md`, `transition-strategy.md`, `arena-verification-load.md` | `conversion-section-assembly.md` | opus |
| 2.4 | Threading Validator | `skills/layer-2/2.4-threading-validator.md` | Validate threading from headline promise through mechanism to close | `above-fold-assembly.md`, `body-section-assembly.md`, `conversion-section-assembly.md` | `threading-validation.md` | opus |
| 2.5 | PDP Page Assembler | `skills/layer-2/2.5-pdp-page-assembler.md` | **PDP PATH ONLY (type_b/hybrid).** Assemble carousel + buy box + facts panel + all BTF sections + reviews + FAQ accordion + sticky ATC bar + CTA placements. Runs INSTEAD of 2.1+2.2+2.3. | `pdp-packages-loaded.md`, `section-order-plan.md`, `transition-strategy.md` | `pdp-page-assembly.md` | opus |

**GATE_2 (Type A):** All three assembly files exist (above-fold, body, conversion). Every section boundary has a written transition (not bare concatenation). Threading validation identifies the promise chain and confirms it is unbroken. If any section is missing a transition -> HALT, write the transition. If threading is broken -> HALT, identify the break point and flag for Layer 3 review.

**GATE_2 (Type B / Hybrid — PDP):** `pdp-page-assembly.md` exists. All PDP-04 BTF sections assembled. Carousel specification present. Buy box assembled with all components. Sticky ATC bar specified. No story-style transitions (section headers only). Threading validation (2.4) adapted for PDP: product promise in buy box through BTF benefits/mechanism to final CTA.

### Layer 3: Quality Checks

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 3.1 | Completeness Audit | `skills/layer-3/3.1-completeness-audit.md` | Verify all required elements present for page type per element-taxonomy.md | `above-fold-assembly.md`, `body-section-assembly.md`, `conversion-section-assembly.md`, `brief-load.md` | `completeness-audit.md` | sonnet |
| 3.2 | Arena Copy Verification | `skills/layer-3/3.2-arena-copy-verification.md` | GATE: Verify Arena-selected copy from LP-07 and LP-14 appears verbatim in assembled output | `arena-verification-load.md`, `above-fold-assembly.md`, `conversion-section-assembly.md` | `arena-copy-verification.md` | sonnet |
| 3.3 | Assembly Audit | `skills/layer-3/3.3-assembly-audit.md` | Score assembled page: section ordering, transitions, threading, completeness. Score >= 7.0 required. | All Layer 2 outputs, `completeness-audit.md`, `arena-copy-verification.md`, `threading-validation.md` | `assembly-audit.md` | sonnet |
| 3.4 | PDP Assembly Validator | `skills/layer-3/3.4-pdp-assembly-validator.md` | **PDP PATH ONLY (type_b/hybrid).** Validate carousel completeness (25%), buy box completeness (25%), BTF coverage (25%), UX compliance (25%). Minimum 7.0/10. Runs INSTEAD of 3.1+3.2. | `pdp-page-assembly.md`, `pdp-packages-loaded.md`, `threading-validation.md` | `pdp-assembly-validation.md` | sonnet |

**GATE_3 (Type A):** Completeness audit passes for page type. Arena copy verification PASSES — Arena-selected headline and CTA copy appear verbatim in assembled output (not pre-Arena candidates). Assembly audit score >= 7.0/10. If Arena verification FAILS -> HALT. This is the #1 failure mode. Do NOT proceed with pre-Arena copy. If assembly score < 7.0 -> HALT, identify and fix the lowest-scoring dimension before proceeding.

**GATE_3 (Type B / Hybrid — PDP):** PDP assembly validation score >= 7.0/10. Hard gates: ATC button text verbatim from PDP-06, sticky ATC bar present, no Type A pattern leaks. Assembly audit (3.3) score >= 7.0 (adapted for PDP criteria). If ATC text not verbatim -> HALT. If sticky ATC bar missing -> HALT. If Type A pattern leak detected -> HALT.

### Layer 4: Package Assembly

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 4.1 | Page Package Compiler | `skills/layer-4/4.1-page-package-compiler.md` | Compile assembled-page-package.json | All Layer 2 + Layer 3 outputs | `assembled-page-package.json` | haiku |
| 4.2 | Summary Writer | `skills/layer-4/4.2-summary-writer.md` | Write ASSEMBLY-SUMMARY.md (human-readable page overview) | `assembled-page-package.json`, `assembly-audit.md` | `ASSEMBLY-SUMMARY.md` | sonnet |
| 4.3 | Log Writer | `skills/layer-4/4.3-log-writer.md` | Write execution-log.md | All outputs | `execution-log.md` | haiku |

---

## GATE CONDITIONS DETAIL

### GATE_0 (Inputs Loaded + Arena Verified)

**Type A PASS:** `page-brief.json` loaded. All 4 architecture packages loaded. All 8 content packages loaded. HERO_SELECTION.yaml and CTA_SELECTION.yaml loaded and verified — selected variants match content packages.
**Type A FAIL conditions:**
- Missing page brief -> HALT: "LP-15 requires page-brief.json from LP-00."
- Missing architecture package -> HALT: "LP-15 requires [package] from [skill]. Run [skill] first."
- Missing content package -> HALT: "LP-15 requires [package] from [skill]. Run [skill] first."
- Arena mismatch -> HALT: "Arena-selected variant in [HERO_SELECTION.yaml / CTA_SELECTION.yaml] does not match content in [package]. [Skill] must re-export with Arena selection."

**PDP PASS (Type B / Hybrid):** `page-brief.json` loaded. All 5 PDP packages loaded (PDP-03, PDP-04, PDP-05, PDP-06, PDP-07). All 4 shared LP packages loaded (LP-08, LP-09, LP-12, LP-13). LP-03/LP-04/LP-05/LP-06/LP-07/LP-14 NOT loaded.
**PDP FAIL conditions:**
- Missing page brief -> HALT: "LP-15 requires page-brief.json from LP-00."
- Missing PDP-03 -> HALT: "LP-15 requires pdp-above-fold-blueprint.json from PDP-03. Run PDP-03 first."
- Missing PDP-04 -> HALT: "LP-15 requires pdp-section-sequence.json from PDP-04. Run PDP-04 first."
- Missing PDP-06 -> HALT: "LP-15 requires pdp-offer-buy-box.json from PDP-06. Run PDP-06 first."
- Missing PDP-07 -> HALT: "LP-15 requires pdp-btf-sections.json from PDP-07. Run PDP-07 first."
- LP-03/LP-04/LP-05/LP-06 loaded for PDP page -> HALT: "Wrong package path. PDP pages use PDP skill outputs, not LP architecture packages."

### GATE_1 (Assembly Plan Ready)
**PASS (Type A):** Package inventory accounts for all 14 upstream packages. Section order plan exists with LP-04 as source. Transition strategy covers every section boundary (N sections = N-1 transitions minimum).
**PASS (PDP):** Package inventory accounts for all 9 PDP + shared packages. Section order plan exists with PDP-04 as source. Transition strategy specifies section headers for every BTF section.
**FAIL:** Missing inventory items, unconfirmed section order, or missing transition plans. Action: Complete the missing planning artifact.

### GATE_2 (Assembly Execution Complete)
**Type A PASS:** `above-fold-assembly.md` + `body-section-assembly.md` + `conversion-section-assembly.md` all exist. Every section boundary has a written transition. Threading validation confirms unbroken promise chain.
**Type A FAIL:** Missing assembly file, bare concatenation at any boundary, or broken threading. Action: Write the missing transition or flag the threading break.

**PDP PASS (Type B / Hybrid):** `pdp-page-assembly.md` exists. Carousel assembled. Buy box assembled with all 10 components. All PDP-04 BTF sections assembled. Sticky ATC bar specified. Threading validation confirms product promise chain.
**PDP FAIL:** Missing assembly file, missing carousel/buy box, missing BTF sections, missing sticky ATC bar, or broken threading. Action: Return to 2.5 and complete the assembly.

### GATE_3 (Quality Verified)
**Type A PASS:** Completeness audit passes. Arena copy verification PASSES (verbatim match). Assembly audit >= 7.0/10.
**Type A FAIL conditions:**
- Completeness fails -> Return to Layer 2, assemble missing elements.
- Arena copy fails -> HALT IMMEDIATELY. This is the #1 failure mode. Do not proceed. Identify which Arena-selected copy was replaced and why.
- Assembly score < 7.0 -> Return to Layer 2, fix the lowest-scoring dimension.

**PDP PASS (Type B / Hybrid):** PDP assembly validation score >= 7.0/10. ATC button text verbatim (hard gate PASS). Sticky ATC bar present (hard gate PASS). No Type A pattern leaks (hard gate PASS). Assembly audit (3.3) >= 7.0/10.
**PDP FAIL conditions:**
- ATC text not verbatim -> HALT. Replace with PDP-06 text. Re-validate.
- Sticky ATC bar missing -> HALT. Return to 2.5, add sticky ATC bar specification.
- Type A pattern leak -> HALT. Remove leaked pattern. Re-validate.
- PDP validation score < 7.0 -> Return to 2.5, fix lowest-scoring dimension.
- Assembly audit score < 7.0 -> Return to 2.5, fix lowest-scoring dimension.

---

## OUTPUT SCHEMA

### assembled-page-package.json

```json
{
  "schema_version": "1.0",
  "created": "[ISO timestamp]",
  "project_name": "[from page-brief.json]",
  "page_type": "[type_a | type_b | hybrid]",
  "vertical": "[from page-brief.json]",

  "assembly_metadata": {
    "total_sections": "[count]",
    "total_estimated_words": "[count]",
    "assembly_mode": "[full | partial]",
    "missing_packages": ["[list any missing upstream packages, empty if none]"],
    "arena_verification": {
      "hero_selection_verified": true,
      "cta_selection_verified": true,
      "hero_variant_id": "[from HERO_SELECTION.yaml]",
      "cta_variant_id": "[from CTA_SELECTION.yaml]"
    }
  },

  "above_fold": {
    "pre_head": "[text or null]",
    "headline": "[Arena-selected headline text — VERBATIM from LP-07]",
    "subheadline_deck": "[deck copy text]",
    "hero_image": {
      "description": "[image brief]",
      "format": "[specified format]",
      "alt_text": "[accessibility text]"
    },
    "trust_bar": ["[trust signal 1]", "[trust signal 2]"],
    "primary_cta": {
      "text": "[Arena-selected CTA text — VERBATIM from LP-14]",
      "position": "above_fold",
      "style_notes": "[color, size, etc.]"
    },
    "rating_strip": "[if Type B — rating + review count, null if Type A]",
    "price_display": "[if Type B — price block, null if Type A]"
  },

  "sections": [
    {
      "section_number": 1,
      "section_name": "[from LP-04 section-sequence.json]",
      "section_purpose": "[from LP-04]",
      "source_skill": "[LP-XX that generated the content]",
      "content": {
        "headline": "[section headline if any]",
        "body": "[full section body copy]",
        "proof_elements": ["[any embedded proof]"],
        "cta": "[CTA placement if any — from LP-14]",
        "images": ["[image briefs if any]"]
      },
      "transition_in": "[transition paragraph connecting FROM previous section TO this one]",
      "transition_out": "[transition paragraph connecting FROM this section TO next one]",
      "estimated_words": "[count]"
    }
  ],

  "conversion_block": {
    "value_stack": "[from LP-11]",
    "pricing": {
      "display": "[price display format]",
      "anchoring": "[anchoring technique and anchor price]",
      "bundles": ["[bundle options]"],
      "subscription": "[subscription option if any]"
    },
    "guarantee": {
      "branded_name": "[guarantee name]",
      "duration": "[days]",
      "terms": "[specific terms]",
      "full_text": "[complete guarantee copy]"
    },
    "urgency": "[from LP-13]",
    "faq": [
      {
        "question": "[Q]",
        "answer": "[A]"
      }
    ],
    "close": {
      "benefit_summary": "[closing benefit recap]",
      "final_cta": {
        "text": "[CTA text]",
        "position": "close"
      },
      "ps": "[P.S. text if Type A, null if Type B]"
    }
  },

  "cta_placements": [
    {
      "position": "[section name or 'above_fold' or 'close']",
      "text": "[CTA text]",
      "style": "[notes on styling]",
      "arena_selected": "[true if this is the Arena-selected CTA variant, false otherwise]"
    }
  ],

  "technical_specs": {
    "image_format": "[WebP or other]",
    "lazy_loading": "[Y/N]",
    "mobile_sticky_cta": "[Y/N + details]",
    "cta_touch_target": "[size in px]",
    "load_optimization_notes": "[any notes]"
  },

  "threading_summary": {
    "headline_promise": "[the core promise from the headline]",
    "mechanism_connection": "[how the mechanism section connects to the promise]",
    "close_callback": "[how the close references the headline promise and mechanism]",
    "threading_score": "[from threading-validation.md]"
  },

  "quality_scores": {
    "assembly_score": "[from assembly-audit.md — X/10]",
    "completeness_score": "[from completeness-audit.md — percentage]",
    "threading_score": "[from threading-validation.md — X/10]",
    "arena_verification": "PASS"
  }
}
```

### ASSEMBLY-SUMMARY.md

```markdown
# Assembly Summary — [Project Name]

## Page Type: [Type A | Type B | Hybrid]
## Assembly Mode: [Full | Partial]
## Assembly Score: [X/10]

## Section Map
| # | Section | Source Skill | Words | Has Transition? |
|---|---------|-------------|-------|-----------------|
| 1 | [name] | LP-XX | [count] | [Y/N] |
[...all sections...]

## Arena Verification
- Hero headline (LP-07): [VERIFIED — variant ID]
- CTA copy (LP-14): [VERIFIED — variant ID]

## Threading Summary
- **Promise:** [headline promise in one sentence]
- **Mechanism connection:** [how mechanism fulfills promise]
- **Close callback:** [how close references both]
- **Threading score:** [X/10]

## Missing Elements (if any)
[List any elements missing for the page type]

## Quality Scores
| Dimension | Score |
|-----------|-------|
| Assembly | [X/10] |
| Completeness | [X%] |
| Threading | [X/10] |
| Arena Verification | PASS |

## Downstream Routing
- LP-16 (Mobile/Speed Audit): [ready / not ready]
- LP-17 (Conversion Audit): [ready / not ready]
- LP-18 (A/B Test Plan): [ready / not ready]
```

---

## FORBIDDEN BEHAVIORS

1. Using pre-Arena candidate copy instead of Arena-selected variants — this is the #1 failure mode. Always verify against HERO_SELECTION.yaml and CTA_SELECTION.yaml.
2. Silently dropping missing packages — every missing upstream package must be explicitly flagged in the inventory and noted in the assembly summary.
3. Concatenating sections without transitions — every section boundary must have a transition sentence or paragraph. Bare concatenation = assembly failure.
4. Rewriting upstream copy — LP-15 assembles, it does not rewrite. Transitions are the ONLY new copy LP-15 generates.
5. Deviating from LP-04 section order without explicit justification — LP-04 is the sequence source of truth.
6. Assembling Type B elements for a Type A page or vice versa — page type from LP-00 governs element requirements.
7. Skipping threading validation — the promise chain from headline to close must be validated. A page where the close does not reference the headline promise is a broken page.
8. Claiming assembly is complete before all three output files exist (assembled-page-package.json + ASSEMBLY-SUMMARY.md + execution-log.md).
9. Proceeding past GATE_3 when Arena copy verification fails — HALT is mandatory.
10. Writing generic transitions ("And now let's talk about...") — transitions must reference the thread and create narrative momentum.

---

## TRANSITION WRITING GUIDELINES

LP-15 writes transitions only. These are the rules for transition quality:

### What a Good Transition Does
1. **References the previous section's key takeaway** — "Now that you understand why [root cause]..."
2. **Creates forward momentum toward the next section** — "...there's a solution that addresses this directly."
3. **Maintains the threading anchor** — keeps the headline promise alive throughout the page
4. **Matches the page's tone** — conversational for Type A, scannable for Type B

### Type A Transition Patterns
- **Story-to-RootCause:** "For years, I thought [common belief]. Then I discovered something that changed everything..."
- **RootCause-to-Mechanism:** "Once I understood [root cause], the solution became obvious..."
- **Mechanism-to-Product:** "That's exactly why [product] was created..."
- **Product-to-Proof:** "Don't take my word for it..."
- **Proof-to-Offer:** "If you're ready to experience [promise] for yourself..."

### Type B Transition Patterns
- **Benefits-to-HowItWorks:** Section header serves as transition. "How It Works" with visual step icons.
- **Ingredients-to-Reviews:** "See What Our Customers Are Saying" — header-as-transition.
- **Reviews-to-FAQ:** "Still Have Questions?" — header-as-transition.
- Type B pages are scan-optimized — transitions are shorter and often just section headers.

---

## DOWNSTREAM HANDOFF

LP-15 produces `assembled-page-package.json` which feeds directly to:

| Downstream Skill | What It Needs from LP-15 | Priority | Page Types |
|-----------------|-------------------------|----------|------------|
| LP-16 (Mobile/Speed Audit) | Technical specs, image format directives, CTA sizing, sticky bar spec | P2 | Type A |
| LP-17 (Conversion Audit) | Full assembled page for 20-point audit scoring | P1 | Type A |
| LP-18 (A/B Test Plan) | Assembled page elements to identify test candidates | P3 | All |
| PDP-16 (PDP Mobile + Conversion Audit) | Full assembled PDP page including carousel, buy box, sticky ATC bar, BTF sections, review system | P1 | Type B / Hybrid |
