# SOURCE AUTHORITY AUDIT PROTOCOL (SAAP)
## Version 1.0 — The "Never Miss Again" System
### Engine Architecture Standard

---

## GOVERNANCE

**Parent document:** `ENGINE_ARCHITECTURE_STANDARD.md`
**This protocol is:** Phase -1 of every engine build (mandatory gate)
**Location in each engine:** `meta/SAAP-AUDIT.md` (completed audit) + `meta/SAAP-MATRIX.md` (cross-reference matrix)
**Hierarchy:** Architecture Standard > This Protocol > Engine Blueprint > Engine Files

---

## WHY THIS EXISTS

On March 4, 2026, during the Design Engine blueprint build, we missed Garr Reynolds (the foundational voice in presentation design), Brad Frost (the component architecture bible), Luke Wroblewski (the mobile design philosophy), Russell Brunson (funnel intelligence), Donald Miller (narrative architecture), and Eugene Schwartz (awareness-level calibration).

**Root cause:** The source list was generated from memory — which means it was generated from vibes. No systematic process. No forced decomposition. No validation gate.

**The fix:** This protocol. It runs BEFORE any engine's Tier 1 source list is finalized. It is a GATE — the engine build cannot proceed to Phase 1 (Teaching Extraction) until SAAP is complete and signed off.

---

## THE PROTOCOL (7 Steps)

### STEP 1: DOMAIN DECOMPOSITION
**What:** Break the engine's domain into every sub-domain, sub-skill, and knowledge area it must cover.
**How:** Use forced exhaustive mapping. Don't brainstorm — decompose.

```
ENGINE DOMAIN: [e.g., "Design"]
│
├── SUB-DOMAIN 1: [e.g., "Visual Design Foundations"]
│   ├── Sub-skill: Typography
│   ├── Sub-skill: Color Theory
│   ├── Sub-skill: Layout & Grid Systems
│   ├── Sub-skill: Spacing & Whitespace
│   ├── Sub-skill: Visual Hierarchy
│   └── Sub-skill: Composition
│
├── SUB-DOMAIN 2: [e.g., "UX & Interaction Design"]
│   ├── Sub-skill: Information Architecture
│   ├── Sub-skill: Navigation Patterns
│   ├── Sub-skill: Form Design
│   ├── Sub-skill: Accessibility
│   ├── Sub-skill: User Research / Testing
│   └── Sub-skill: Interaction Patterns
│
├── SUB-DOMAIN 3: [e.g., "Platform-Specific Design"]
│   ├── Sub-skill: Web / Responsive Design
│   ├── Sub-skill: Mobile (iOS + Android)
│   ├── Sub-skill: Presentation / Slide Design
│   └── Sub-skill: Dashboard / Data Visualization
│
├── SUB-DOMAIN 4: [e.g., "Design Systems & Components"]
│   ├── Sub-skill: Component Architecture
│   ├── Sub-skill: Design Tokens
│   ├── Sub-skill: Pattern Libraries
│   └── Sub-skill: Design Documentation
│
├── SUB-DOMAIN 5: [e.g., "Design Strategy & Process"]
│   ├── Sub-skill: Design Thinking
│   ├── Sub-skill: Client Presentation
│   ├── Sub-skill: Design Critique
│   └── Sub-skill: Design Business (pricing, scoping)
│
└── SUB-DOMAIN 6: [e.g., "Psychology & Persuasion"]
    ├── Sub-skill: Cognitive Load
    ├── Sub-skill: Decision Architecture
    ├── Sub-skill: Emotional Design
    ├── Sub-skill: Trust & Credibility Signals
    └── Sub-skill: Attention & Perception
```

**RULE:** Minimum 5 sub-domains. Minimum 3 sub-skills per sub-domain. If you can't identify 3 sub-skills, the sub-domain is too granular — merge up. If a sub-domain has more than 8 sub-skills, it's too broad — split it.

**GATE:** Domain Decomposition Map must exist before proceeding.

---

### STEP 2: AUTHORITY MAPPING (Per Sub-Skill)
**What:** For EACH sub-skill identified in Step 1, identify the canonical authority — the person/book/resource that practitioners in that field consider the definitive voice.
**How:** Use this forced template:

```
SUB-SKILL: [e.g., "Form Design"]

CANONICAL AUTHORITY: [The ONE name/book that practitioners point to]
  → Name: Luke Wroblewski
  → Work: "Web Form Design: Filling in the Blanks"
  → Why canonical: Former Yahoo/eBay lead designer, Google product director.
    The definitive data-driven guide to form UX. Cited by everyone in the field.
  → What we extract: Label placement rules, input types, validation patterns,
    progressive disclosure, error handling, multi-step forms

SECONDARY AUTHORITIES (1-3):
  → [Name]: [Work] — [What they add that the canonical doesn't]
  → [Name]: [Work] — [What they add that the canonical doesn't]

FREE/EXTRACTABLE SOURCES:
  → [URL or resource]: [What to extract]
  → [URL or resource]: [What to extract]
```

**CRITICAL RULE:** If you cannot name the canonical authority for a sub-skill, that is a GAP. Flag it immediately. Do NOT proceed with a vague or generic source.

**VALIDATION QUESTIONS (ask for each sub-skill):**
1. If a senior practitioner in this field were building a curriculum, who would they assign first?
2. What book/course does every "recommended reading" list in this space include?
3. Who coined the key frameworks or terminology used in this sub-skill?
4. Is there a practitioner whose real-world work DEMONSTRATES mastery (not just teaches it)?

**GATE:** Every sub-skill must have at least one named canonical authority before proceeding.

---

### STEP 3: WEB VALIDATION SWEEP
**What:** For each sub-domain, run targeted web searches to find authorities you missed.
**How:** Use these exact search patterns:

```
SEARCH PATTERN 1: "[sub-domain] best books"
  → e.g., "presentation design best books"
  → Look for names that appear on 3+ lists

SEARCH PATTERN 2: "[sub-domain] definitive guide"
  → e.g., "mobile design definitive guide"
  → Look for canonical texts

SEARCH PATTERN 3: "[sub-domain] must read [current year]"
  → e.g., "UX design must read 2026"
  → Catches newer voices

SEARCH PATTERN 4: "[sub-domain] curriculum syllabus"
  → e.g., "interaction design curriculum syllabus"
  → University syllabi reveal canonical texts

SEARCH PATTERN 5: "[known authority] recommended by" OR "[known authority] influenced by"
  → e.g., "Garr Reynolds recommended by" OR "Steve Krug influenced by"
  → Finds the network of authorities around known voices

SEARCH PATTERN 6: "[sub-skill] framework" OR "[sub-skill] methodology"
  → e.g., "design systems methodology" OR "content strategy framework"
  → Finds the people who created named frameworks
```

**RULE:** Run at least 2 search patterns per sub-domain. If a name appears 3+ times across different searches, it's likely a canonical authority you missed.

**GATE:** Web Validation must be completed for ALL sub-domains before proceeding.

---

### STEP 4: CROSS-REFERENCE MATRIX
**What:** Build a matrix showing which authorities cover which sub-skills. This reveals both gaps AND redundancies.
**How:**

```
                    | Typography | Color | Layout | Forms | Mobile | Slides | Components | Emotional |
--------------------|-----------|-------|--------|-------|--------|--------|------------|-----------|
Refactoring UI      |     ★     |   ★   |   ★    |   ★   |   ○    |        |     ○      |           |
Laws of UX          |           |       |        |   ○   |   ○    |        |            |     ★     |
Don't Make Me Think |           |       |   ○    |   ○   |   ○    |        |            |     ○     |
Garr Reynolds       |     ○     |   ○   |   ○    |       |        |   ★    |            |     ★     |
Nancy Duarte        |           |       |   ○    |       |        |   ★    |            |     ○     |
Brad Frost          |           |       |        |       |        |        |     ★      |           |
Luke Wroblewski     |           |       |        |   ★   |   ★    |        |            |           |
Butterick           |     ★     |       |        |       |        |        |            |           |
Ethan Marcotte      |           |       |   ★    |       |   ○    |        |            |           |
...                 |           |       |        |       |        |        |            |           |

★ = PRIMARY authority for this sub-skill (the canonical voice)
○ = SECONDARY coverage (touches it but isn't the definitive source)
[empty] = Does not cover this sub-skill
```

**WHAT TO LOOK FOR:**
- **Empty columns** = Sub-skills with NO authority assigned → CRITICAL GAP
- **Columns with only ○** = Sub-skills with secondary coverage but no canonical voice → MODERATE GAP
- **Rows with many ★** = Authorities that are trying to cover too much → Verify they're actually canonical for each
- **Rows with only one ★** = Specialized authorities → Good, this means precision

**GATE:** No empty columns allowed. Every sub-skill must have at least one ★.

---

### STEP 5: GAP RESOLUTION
**What:** For any gaps identified in Step 4, find and assign the missing authority.
**How:**

```
GAP FOUND: [Sub-skill with no ★ authority]

RESOLUTION SEARCH:
  1. Search: "[sub-skill] best book/course/resource"
  2. Search: "[sub-skill] expert" OR "[sub-skill] pioneer"
  3. Search: "[sub-skill] framework creator"
  4. Ask: "Who do the existing authorities in adjacent sub-skills cite?"

RESOLUTION:
  → Authority: [Name]
  → Work: [Title]
  → Tier placement: [1 = must-have / 2 = supplemental]
  → Justification: [Why this is the canonical voice]
```

**RULE:** Every gap must be resolved with a NAMED authority, not a generic resource. "Various blog posts" is not a resolution. "Brad Frost's Atomic Design" is.

**EXCEPTION:** If a sub-skill is truly emerging (no established canonical voice yet), document it as "EMERGING — no canonical authority yet" and identify the 2-3 leading voices competing for that position. Flag for re-evaluation in 6 months.

---

### STEP 6: TIER ASSIGNMENT & ACQUISITION PLAN
**What:** Organize all authorities into Tier 1 (must-have before build) and Tier 2 (supplemental / phase 2).
**How:**

**TIER 1 CRITERIA (must meet ALL):**
- Covers a sub-skill where it's the ONLY canonical authority (no redundancy)
- OR covers 3+ sub-skills as primary authority (breadth)
- The engine literally cannot produce quality output in this sub-skill without it
- Practitioners consider it essential, not optional

**TIER 2 CRITERIA (meets ANY):**
- Adds depth to a sub-skill already covered by a Tier 1 source
- Covers an advanced or specialized aspect
- Is newer/more current but the foundational principles are already covered
- Is excellent but not essential for MVP

**FREE SOURCE CRITERIA:**
- Documentation, blog archives, open-source guides that can be extracted immediately
- Does NOT replace the need for a Tier 1 authority — supplements it

**ACQUISITION PLAN (for each source):**

```
SOURCE: [Title]
TIER: [1 / 2 / Free]
FORMAT: [Book / Course / Blog / Documentation / Video]
COST: [$X or Free]
ACQUISITION: [Buy on Amazon / Enroll at URL / Extract from URL]
EXTRACTION PRIORITY: [1-5, where 1 = extract first]
ESTIMATED EXTRACTION TIME: [X hours]
DEPENDENCIES: [What must be extracted before this? e.g., "After Refactoring UI because it establishes the baseline vocabulary"]
```

**GATE:** Tier 1 sources must be acquired (purchased/enrolled) before Phase 1 build begins.

---

### STEP 7: SIGN-OFF & LOCK
**What:** Final review and lock of the source list before build begins.
**How:**

**SIGN-OFF CHECKLIST:**

```
[ ] Domain Decomposition Map completed (Step 1)
    → Minimum 5 sub-domains identified
    → Minimum 3 sub-skills per sub-domain
    → No sub-domain has > 8 sub-skills (split if so)

[ ] Authority Mapping completed for ALL sub-skills (Step 2)
    → Every sub-skill has a named canonical authority
    → Canonical authorities are actual practitioners/authors, not generic resources

[ ] Web Validation Sweep completed (Step 3)
    → At least 2 search patterns per sub-domain
    → All names appearing 3+ times evaluated for inclusion

[ ] Cross-Reference Matrix built (Step 4)
    → No empty columns (every sub-skill has ★ coverage)
    → No columns with only ○ (every sub-skill has a primary voice)

[ ] All gaps resolved (Step 5)
    → Every gap has a named authority assigned
    → Emerging sub-skills documented with competing voices

[ ] Tier assignment complete (Step 6)
    → Tier 1 sources identified and acquisition planned
    → Extraction priority and dependencies mapped
    → Free sources identified for immediate extraction

[ ] Client sign-off
    → Source list reviewed for taste alignment
    → "Do I respect these voices?" check
    → Any authorities the client wants added/removed based on experience
```

**LOCK RULE:** Once signed off, the Tier 1 source list is LOCKED for the build phase. New sources can be added to Tier 2 at any time, but Tier 1 changes require re-running Steps 4-6 to check for cascading gaps.

---

## WHEN TO RUN THIS PROTOCOL

**MANDATORY triggers:**
1. Before ANY new engine build (before Phase 1 begins)
2. When adding a new VERTICAL to an existing engine (e.g., adding "mobile" vertical to Design Engine)
3. When a major gap is discovered mid-build (run Steps 4-7 only)
4. Quarterly review of all active engines (run Steps 3-5 only — "What's changed?")

**OPTIONAL triggers:**
5. When a new book/course/voice emerges that might be canonical
6. When engine output quality drops in a specific sub-skill area
7. When a client/student asks "why didn't the engine do X?" and X traces back to missing source material

---

## THE META-PRINCIPLE

The gap that happened on March 4, 2026 was not a knowledge gap — it was a PROCESS gap.

I (Claude) have knowledge of Garr Reynolds, Brad Frost, Luke Wroblewski, Russell Brunson, Donald Miller, and Eugene Schwartz. The information was IN me. But without a forced decomposition process, I defaulted to what came to mind first — which biased toward the most popular/recent voices and missed foundational ones.

**This is the same failure mode that happens to human experts.** Senior designers know about Brad Frost but might forget to include him in a curriculum because Atomic Design feels "obvious." The fix is the same: don't trust recall, trust process.

The SAAP forces exhaustive decomposition BEFORE source selection, which means:
- Every sub-skill is explicitly identified (not assumed)
- Every sub-skill gets its own authority search (not bundled with adjacent skills)
- Gaps are structurally visible (empty columns in the matrix)
- Coverage is verifiable (the matrix can be audited)

This is the same philosophy as the engine architecture itself: **Instructions can be ignored. Structures cannot be bypassed.**

---

## INTEGRATION WITH ENGINE BUILD SEQUENCE

```
CURRENT BUILD SEQUENCE:
Phase 0: Folder structure, CLAUDE.md, core files
Phase 1: Teaching extraction from acquired sources
Phase 2: Specimen collection
Phase 3: Skill engine build
Phase 4: Arena build
Phase 5: Anti-degradation layer
Phase 6: First live project + learning capture

UPDATED BUILD SEQUENCE:
Phase -1: SOURCE AUTHORITY AUDIT PROTOCOL ← NEW GATE
  → Step 1: Domain Decomposition
  → Step 2: Authority Mapping
  → Step 3: Web Validation Sweep
  → Step 4: Cross-Reference Matrix
  → Step 5: Gap Resolution
  → Step 6: Tier Assignment & Acquisition Plan
  → Step 7: Sign-Off & Lock
  → GATE: SAAP complete → Proceed to Phase 0
Phase 0: Folder structure, CLAUDE.md, core files
Phase 1: Teaching extraction from acquired sources
...
```

The SAAP becomes Phase -1 — it happens BEFORE the build even starts. And it produces a concrete artifact (the Cross-Reference Matrix) that can be audited at any time during the build to verify coverage.

---

## APPENDIX: SAAP APPLIED TO THE TWO CURRENT ENGINES

### A. DESIGN ENGINE — Post-Audit Source Additions

| Gap Identified | Sub-Skill | Authority Added | Tier |
|---------------|-----------|-----------------|------|
| Presentation design philosophy | Slide Design | Garr Reynolds — Presentation Zen trilogy (3 books) | 1 |
| Component architecture | Design Systems | Brad Frost — Atomic Design | 1 |
| Mobile design philosophy | Mobile Design | Luke Wroblewski — Mobile First | 1 |
| Form design | Form UX | Luke Wroblewski — Web Form Design | 2 |
| Responsive design foundations | Web/Responsive | Ethan Marcotte — Responsive Web Design | 2 |
| Screen typography | Typography | Matthew Butterick — Practical Typography | 2 |
| Emotional design layer | Emotional Design | Aarron Walter — Designing for Emotion | 2 |
| Design business/presentation | Design Strategy | Mike Monteiro — Design Is a Job | 2 |
| Steve Jobs keynote methodology | Presentation | Carmine Gallo — Presentation Secrets of Steve Jobs | 2 |

### B. ORGANIC MARKETING ENGINE — Post-Audit Source Additions

| Gap Identified | Sub-Skill | Authority Added | Tier |
|---------------|-----------|-----------------|------|
| Funnel architecture | Traffic → Conversion | Russell Brunson — Traffic Secrets + DotCom Secrets | 1 |
| Brand narrative architecture | Brand Storytelling | Donald Miller — Building a StoryBrand | 1 |
| Market awareness calibration | Content Strategy | Eugene Schwartz — Breakthrough Advertising (Ch. 1) | 1 |
| Content compounding / media strategy | Content Longevity + PR | Ryan Holiday — Perennial Seller + Trust Me I'm Lying | 2 |
| Content-first business model | Audience Building | Joe Pulizzi — Content Inc. | 2 |
| Content craft & quality | Content Production | Ann Handley — Everybody Writes | 2 |
| Personal brand building | Brand Strategy | Mark Schaefer — Known + Marketing Rebellion | 2 |
| Organic lead gen strategy | Lead Generation | Sabri Suby — Sell Like Crazy | 2 |
| Design × Marketing intersection | Creative Business | Chris Do / The Futur | 2 (both engines) |

---

## APPENDIX: BLANK SAAP TEMPLATE

### ENGINE: [Name]
### Date: [Date]
### Auditor: [Who ran the protocol]

**STEP 1 — Domain Decomposition Map:**
```
[Paste completed map here]
```

**STEP 2 — Authority Mapping:**
```
[Paste completed mapping for each sub-skill]
```

**STEP 3 — Web Validation Results:**
```
[Paste search results and newly discovered authorities]
```

**STEP 4 — Cross-Reference Matrix:**
```
[Paste completed matrix]
```

**STEP 5 — Gap Resolution Log:**
```
[Paste all gaps found and how they were resolved]
```

**STEP 6 — Final Source List with Acquisition Plan:**
```
TIER 1:
1. [Source] — [Cost] — [Extraction Priority] — [Dependencies]
2. ...

TIER 2:
1. [Source] — [Cost] — [Extraction Priority]
2. ...

FREE SOURCES:
1. [URL] — [What to extract]
2. ...
```

**STEP 7 — Sign-Off:**
```
[ ] All steps completed
[ ] No empty columns in matrix
[ ] Tier 1 sources acquired
[ ] Client approved
Date: ___________
```
