# PDP-07: BTF Section Writer — Master Agent

> **Version:** 1.0
> **Skill:** PDP-07-btf-section-writer
> **Position:** PDP Enhancement Layer — Phase 3 Writing Skill (largest PDP skill)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-00 (page-brief.json), LP-01 (conversion intelligence), PDP-04 (pdp-section-sequence.json)
> **Output:** `pdp-btf-sections.json` + `PDP-BTF-SECTIONS-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Write the actual copy for every below-the-fold (BTF) section that PDP-04 sequenced. This is the **largest PDP skill** because it handles all BTF content types — from Product Highlights tiles to comparison charts to ingredient cards to identity-matching grids. Each of the 16 PDP BTF section types has its own structure, formatting requirements, and persuasion function.

**What PDP-07 replaces:** LP-07 Type B path + portions of LP-09 (benefits/ingredients), LP-10 (social proof copy), LP-11 (offer pricing copy) for Type B and Hybrid pages.

**What PDP-07 does NOT handle:**
- Reviews & Ratings (section 13) — handled by PDP-05
- FAQ (section 14) — handled by LP-12 enhanced
- UGC Video Carousel (section 2) — curated upstream, PDP-07 writes labels/captions only if PDP-04 flagged it

**The Hunt-and-Peck Rule:** Every section PDP-07 writes MUST function as a standalone module. PDP visitors jump directly to sections they care about. No section may depend on the visitor having read any previous section. No "as mentioned above." No "building on the previous section." Each section is an island.

**The Scannability Rule:** Every section must be digestible at a glance. Bold headers, short bullets, visual-first layouts. If a visitor cannot get the point of a section in 5 seconds of scanning, the section fails.

**Success Criteria:**
- Every section in PDP-04's sequence has complete copy (except Reviews and FAQ)
- Each section's word count is within +/-10% of PDP-04's target
- Each section passes the 5-second scannability test
- Each section passes anti-slop check (zero generic AI language)
- Each section is independently comprehensible (module independence)
- Proof density per section matches PDP-04's proof density plan
- No redundancy with above-fold carousel content — sections EXTEND, not repeat

---

## IDENTITY

**This skill IS:**
- The BTF content writer for all PDP section types (except Reviews and FAQ)
- The skill that translates PDP-04's architectural blueprint into actual copy
- The producer of scannable, modular, hunt-and-peck-optimized section content
- The enforcer of "X for Y" naming for ingredients, comparison chart ethics, and timeline realism

**This skill is NOT:**
- The section sequencer (PDP-04 already determined which sections, in what order, at what length)
- The review system writer (PDP-05 handles Reviews & Ratings)
- The FAQ writer (LP-12 enhanced handles FAQ)
- The above-fold architect (PDP-03 handled carousel + buy box)
- The buy box copy writer (PDP-06 handles ATC copy, subscription copy, micro-trust copy)

**Upstream:** `page-brief.json` (LP-00), LP-01 intelligence, `pdp-section-sequence.json` (PDP-04)
**Downstream:** `pdp-btf-sections.json` consumed by LP-15 (Page Assembly)

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Load upstream packages + reference data
  -> 0.1: Brief + Research Loader (LP-00 brief, LP-01 intelligence, research quotes)
  -> 0.2: Section Sequence Loader (PDP-04 pdp-section-sequence.json)
  -> 0.3: PDP Reference Loader (PDP-BEST-PRACTICES-REFERENCE.md Section 5)
  | [GATE_0: Required inputs loaded? Section sequence valid? Page type = type_b or hybrid?]
LAYER_1: Section Brief Extraction
  -> 1.1: Per-Section Brief Extractor (per-section product data, proof, quotes)
  -> 1.2: Section-Specific Data Validator (sufficient data per section type?)
  | [GATE_1: Every queued section has sufficient data? Data gaps flagged?]
LAYER_2: Section Writers (execute only sections present in PDP-04 sequence)
  -> 2.1: Product Highlights Writer
  -> 2.2: Expert Section Writer
  -> 2.3: Ingredients Section Writer
  -> 2.4: What to Expect Writer
  -> 2.5: Problem/Solution/Logic Writer
  -> 2.6: Comparison Chart Writer
  -> 2.7: Cost Savings Chart Writer
  -> 2.8: Quality/Manufacturing Writer
  -> 2.9: How to Use Writer
  -> 2.10: Identity Matching Writer
  | [GATE_2: All sequenced sections written? Word counts within +/-10% of targets?]
LAYER_3: Validation
  -> 3.1: Section Quality Audit (5-second scannability + anti-slop + reading level)
  -> 3.2: Module Independence Check (each section standalone)
  -> 3.3: Proof Density Verification (meets PDP-04 proof targets)
  | [GATE_3: All sections pass scannability AND module independence AND proof density?]
LAYER_4: Package Assembly
  -> 4.1: BTF Sections Compiler (pdp-btf-sections.json)
  -> 4.2: Summary Writer (PDP-BTF-SECTIONS-SUMMARY.md)
  -> 4.3: Log Writer (execution-log.md)
  |
COMPLETE
```

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Brief + Research Loader | Load LP-00 page-brief.json, LP-01 conversion intelligence, research quotes | input-verification.md |
| 0.2: Section Sequence Loader | Load PDP-04 pdp-section-sequence.json, extract ordered section list with targets | section-sequence-loaded.md |
| 0.3: PDP Reference Loader | Load PDP-BEST-PRACTICES-REFERENCE.md Section 5 (BTF Section Templates) | pdp-reference-loaded.md |

**GATE_0:** page-brief.json loaded AND pdp-section-sequence.json loaded AND page type = `type_b` or `hybrid`. If page type = `type_a` -> HALT — use LP-07 through LP-14 instead. If pdp-section-sequence.json missing -> HALT — run PDP-04 first.

### Layer 1: Section Brief Extraction

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: Per-Section Brief Extractor | For each section in the sequence, extract relevant product data, proof elements, audience quotes from brief/research | per-section-briefs.md |
| 1.2: Section-Specific Data Validator | Verify each section has sufficient data to write (ingredients list for What's in It, study data for Proof, etc.) | data-validation.md |

**GATE_1:** Every queued section has a brief with sufficient data. Data gaps flagged for human input (e.g., missing ingredient list, no study data). Sections with critical data gaps cannot proceed to Layer 2.

### Layer 2: Section Writers

Execute ONLY sections present in PDP-04's sequence. Skip sections not included.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 2.1: Product Highlights Writer | Top 3-5 tiles with question + expandable answer format | section-product-highlights.md |
| 2.2: Expert Section Writer | Credentials, video direction, trust framing, "Why Dr. X formulated this" | section-the-expert.md |
| 2.3: Ingredients Section Writer | Visual-first ingredient cards, "X for Y" naming, vertical expanded layout, microscript benefits | section-whats-in-it.md |
| 2.4: What to Expect Writer | 3-5 milestone timeline, vertical line visual, mechanism per phase | section-what-to-expect.md |
| 2.5: Problem/Solution/Logic Writer | Consolidated: agitation -> paradigm shift -> mechanism diagram. 1, 2, or 3 sections depending on PDP-04 | section-problem-solution-logic.md |
| 2.6: Comparison Chart Writer | 3-column table, 5-7 rows, primacy/recency effect | section-comparison-chart.md |
| 2.7: Cost Savings Chart Writer | Individual vs bundle pricing, "You Save $X" punchline | section-cost-savings.md |
| 2.8: Quality/Manufacturing Writer | Sourcing, manufacturing, certifications, testing/purity | section-how-its-made.md |
| 2.9: How to Use Writer | 3-step numbered instructions with icons, dose + timing + method | section-how-to-use.md |
| 2.10: Identity Matching Writer | 3-column persona grid ("This is for you if..."), demographic/psychographic matching | section-identity-matching.md |

**GATE_2:** All sections present in PDP-04's sequence have been written. Each section word count is within +/-10% of PDP-04's target. No section has been skipped without explicit reason (data gap flagged in Layer 1).

### Layer 3: Validation

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: Section Quality Audit | 5-second scannability test, anti-slop check, reading level check per section | quality-audit.md |
| 3.2: Module Independence Check | Verify each section works standalone — no cross-section references, no assumed prior reading | independence-check.md |
| 3.3: Proof Density Verification | Verify each section meets PDP-04's proof density target | proof-density-check.md |

**GATE_3:** All sections pass 5-second scannability test AND module independence check AND proof density verification. Any failures require revision before proceeding.

### Layer 4: Package Assembly

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: BTF Sections Compiler | Assemble pdp-btf-sections.json with all section copy | pdp-btf-sections.json |
| 4.2: Summary Writer | Write PDP-BTF-SECTIONS-SUMMARY.md | PDP-BTF-SECTIONS-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md | execution-log.md |

---

## 16 PDP BTF SECTION TYPE REFERENCE

PDP-07 writes 10 of these 16 types. Reviews (#13) handled by PDP-05. FAQ (#14) handled by LP-12. UGC Video Carousel (#2) is curated upstream (labels/captions only if needed). The Problem/Solution/Logic (#6, #7, #8) are consolidated into one writer (2.5).

| # | Section ID | Section Name | PDP-07 Writer | Key Structure | Word Count Range |
|---|-----------|-------------|---------------|---------------|-----------------|
| 1 | `product_highlights` | Product Highlights (TLDR) | 2.1 | 3-5 question tiles, expandable answers | 75-300 |
| 2 | `ugc_video_carousel` | UGC Video Carousel | Labels only (curated upstream) | 5-7 video labels/captions | 30-150 |
| 3 | `the_expert` | The Expert | 2.2 | Credential strip, video CTA, trust frame | 75-400 |
| 4 | `whats_in_it` | What's in It (Ingredients) | 2.3 | Visual cards, "X for Y" naming, vertical expanded | 50-300 per ingredient |
| 5 | `what_to_expect` | What to Expect (Timeline) | 2.4 | 3-5 milestones, vertical line, mechanism per phase | 100-500 |
| 6 | `the_problem` | The Problem (Agitation) | 2.5 | Pain amplification, consolidated with 7+8 | 75-400 |
| 7 | `the_solution` | The Solution (USP) | 2.5 | Paradigm shift -> real cause -> new solution | 75-400 |
| 8 | `why_it_works` | Why It Works (Logic) | 2.5 | 4-step mechanism diagram | 100-450 |
| 9 | `comparison_chart` | Comparison Chart | 2.6 | 3-column, 5-7 rows, checks vs Xs | 50-250 |
| 10 | `cost_savings` | Cost Savings Chart | 2.7 | Individual vs bundle, "You Save $X" | 50-250 |
| 11 | `how_its_made` | How It's Made (Quality) | 2.8 | Sourcing, manufacturing, certs | 75-350 |
| 12 | `how_to_use` | How to Use (Instructions) | 2.9 | 3-step numbered, icons | 50-250 |
| 13 | `reviews_ratings` | Reviews & Ratings | PDP-05 | Histogram, photo strip, keyword filters | 200-1,200 |
| 14 | `faq` | FAQ (Objections) | LP-12 | Accordion, 5-7 curated questions | 250-900 |
| 15 | `identity_matching` | Identity Matching | 2.10 | 3-column persona grid | 75-300 |
| 16 | `the_proof` | The Proof (Data) | 2.5 (appended) | Study circles, survey data, graphs | 100-450 |

---

## SECTION WRITING PRINCIPLES

### 1. Hunt-and-Peck > Linear Reading
Each section is a standalone module. Visitors jump to sections they care about. NO section may contain "as mentioned above," "building on the previous section," "recall from the ingredients section," or any other cross-reference. Each section must be independently comprehensible.

### 2. Scannability First
Every section must be digestible at a glance:
- Bold headers that state the section's point
- Short bullets (never paragraphs longer than 2 lines)
- Visual-first layouts (image/icon + text, not text-only)
- White space between elements

### 3. No Redundancy with Above-Fold
The carousel already showed the product, ingredients, how it works, and testimonials at a glance. BTF sections EXTEND that information with depth and detail. Never repeat carousel slide content verbatim.

### 4. "X for Y" Ingredient Naming
Not "Vitamin D" but "Vitamin D for Immune Support." Every ingredient gets a caveman-readable benefit pairing. This is non-negotiable for the Ingredients section.

### 5. Comparison Chart Ethics
Never name real competitors by brand name. Use category terms: "Leading Brand A," "Typical Alternative," "Standard Formula." Primacy effect: strongest advantage in first row. Recency effect: clincher advantage in last row.

### 6. Word Count Discipline
PDP-04 assigned specific word count targets per section. PDP-07 must write within +/-10% of those targets. PDP copy is SHORT. Do not over-write. Every word earns its place.

### 7. Proof is Specific
"Clinically studied" is not proof. "Supported by a 2019 randomized controlled trial in the Journal of Nutrition (n=120)" is proof. If the brief does not contain specific proof data, write the best available general proof and flag the gap.

---

## MODEL ASSIGNMENT TABLE

| Layer | Task | Model |
|-------|------|-------|
| 0 | Input loading + reference loading | haiku |
| 1.1 | Per-section brief extraction | sonnet |
| 1.2 | Data validation | sonnet |
| 2.1-2.10 | All section writers (generation) | opus |
| 3.1 | Section quality audit | sonnet |
| 3.2 | Module independence check | sonnet |
| 3.3 | Proof density verification | sonnet |
| 4 | Package assembly | haiku |

### Layer 2.5: Arena (MANDATORY FILE READS)

**BEFORE generating ANY Arena competitor output, READ these files:**

1. `04-page-builder/skills/PDP-07-btf-section-writer/ARENA-LAYER.md` — skill-specific criteria and weights
2. `~system/protocols/ARENA-CORE-PROTOCOL.md` — execution protocol
3. `~system/protocols/ARENA-PERSONA-PANEL.md` — persona specifications

**VERIFY personas match protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect**

**If personas don't match → HALT — FABRICATION DETECTED**

---

## FORBIDDEN BEHAVIORS

1. Writing a section not present in PDP-04's sequence — PDP-04 decides which sections, PDP-07 writes them
2. Writing Reviews & Ratings content — PDP-05 handles this entirely
3. Writing FAQ content — LP-12 enhanced handles this entirely
4. Cross-section references ("as mentioned above," "see the ingredients section," "building on what we discussed")
5. Paragraphs longer than 3 sentences in any section — PDP is scannable, not readable
6. Ingredient names without "X for Y" benefit pairing — "Ashwagandha" alone is incomplete; must be "Ashwagandha for Stress Relief"
7. Naming real competitor brands in comparison charts — use category terms only
8. Exceeding word count targets by more than 10% — PDP copy is SHORT
9. Generic AI language (revolutionary, game-changing, transform, unlock, harness, leverage, cutting-edge, synergize)
10. Repeating carousel slide content verbatim — BTF extends, not repeats
11. Writing a section without reading its Layer 2 microskill spec first — always read before execute
12. Leaving proof claims vague ("studies show," "research proves") when specific citations exist in the brief
13. Proceeding past GATE_2 with any sequenced section unwritten
14. Proceeding past GATE_3 with any section failing scannability or module independence
15. "The Proof" data section without actual data points — if no studies/surveys exist, this section should have been excluded by PDP-04
