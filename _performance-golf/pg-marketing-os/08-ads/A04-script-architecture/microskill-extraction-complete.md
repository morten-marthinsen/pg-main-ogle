# A04 Script Architecture — Microskill Extraction Complete

**Date:** 2026-02-22
**Task:** Extract all microskill specifications from A04-SCRIPT-ARCHITECTURE-AGENT.md into individual .md files
**Status:** ✅ COMPLETE

---

## Summary

Successfully extracted **30 microskill specification files** from the A04 AGENT.md file and organized them into the standard CopywritingEngine microskill directory structure.

### File Inventory

```
./ads/A04-script-architecture/
└── skills/
    ├── layer-0/          (7 files - Foundation & Loading)
    ├── layer-1/          (5 files - Framework Selection)
    ├── layer-2/          (7 files - Module Design)
    ├── layer-2.5/        (4 files - Arena - Optional)
    ├── layer-3/          (4 files - Variant Planning)
    └── layer-4/          (3 files - Output Packaging)

TOTAL: 30 microskill files
SIZE: 57.5 KB
```

---

## Layer 0: Foundation & Loading (7 files)

| File | Microskill | Purpose | Model |
|------|-----------|---------|-------|
| `0.0.1-vertical-profile-loader.md` | Vertical Profile Loader | Load ad-specific vertical config (golf/health/finance/personal-dev/technology) | haiku |
| `0.1-upstream-strategic-loader.md` | Upstream Strategic Loader | Load Campaign Brief, Root Cause, Mechanism, Promise, Big Idea, Offer | haiku |
| `0.2-hook-angle-matrix-loader.md` | Hook-Angle Matrix Loader | Load A02 selected hooks (8+), types, angles, platform recommendations | haiku |
| `0.3-format-strategy-loader.md` | Format Strategy Loader | Load A03 format/platform/length assignments per hook | haiku |
| `0.4-script-structures-loader.md` | Script Structures Loader | Load AD-SCRIPT-STRUCTURES.md (all 8 frameworks) and HOLD in active context | haiku |
| `0.5-soul-md-loader.md` | Soul.md Loader | Load project voice constraints (optional but recommended) | haiku |
| `0.6-input-validator.md` | Input Validator | Validate all required inputs before Layer 1 | haiku |

---

## Layer 1: Framework Selection (5 files)

| File | Microskill | Purpose | Model |
|------|-----------|---------|-------|
| `1.1-ad-concept-inventory.md` | Ad Concept Inventory | Build inventory of ad concepts (hook + format + platform + length) | opus |
| `1.2-framework-analysis-matrix.md` | Framework Analysis Matrix | Analyze 5 selection variables, score all 8 frameworks per concept | opus |
| `1.3-framework-assignments.md` | Framework Assignments | Select winning framework per concept with rationale citing all 5 variables | opus |
| `1.4-bumper-ad-design.md` | Bumper Ad Design | Design 6-second bumper structures (conditional — only if bumpers exist) | opus |
| `1.5-layer-1-validator.md` | Layer 1 Validator | Verify all assignments complete, rationales cite 5 variables, no incompatibilities | opus |

---

## Layer 2: Module Design (7 files)

| File | Microskill | Purpose | Model |
|------|-----------|---------|-------|
| `2.1-module-sequence-design.md` | Module Sequence Design | Map framework to 5 modules, set word count budgets per module | opus |
| `2.2-hook-module-briefs.md` | Hook Module Briefs | Design [HOOK] module content briefs with clean seam to [SETUP] | opus |
| `2.3-setup-module-briefs.md` | Setup Module Briefs | Design [SETUP] module briefs, verify hook promise fulfillment | opus |
| `2.4-mechanism-module-briefs.md` | Mechanism Module Briefs | Design [MECHANISM] module briefs (full/compressed/omitted per length) | opus |
| `2.5-proof-module-briefs.md` | Proof Module Briefs | Design [PROOF] module briefs, select proof type and specific elements | opus |
| `2.6-cta-module-briefs.md` | CTA Module Briefs | Design 3 CTA variants per concept (urgency/risk-reversal/low-friction) | opus |
| `2.7-av-format-blueprints.md` | AV Format Blueprints | Assemble complete two-column AV blueprints with transitions | opus |

---

## Layer 2.5: Arena (4 files - OPTIONAL)

| File | Microskill | Purpose | Model |
|------|-----------|---------|-------|
| `2.5.1-alternative-architecture-generation.md` | Alternative Architecture Generation | Generate 2-3 structural variants per concept | opus |
| `2.5.2-architecture-scoring.md` | Architecture Scoring | Score variants on 5 criteria (coherence/mechanism/testability/platform/persuasion) | opus |
| `2.5.3-architecture-selection.md` | Architecture Selection | Human selects winning architecture (BLOCKING gate) | opus |
| `2.5.4-arena-validator.md` | Arena Validator | Validate selections, update inventory, verify winning architectures | opus |

---

## Layer 3: Variant Planning (4 files)

| File | Microskill | Purpose | Model |
|------|-----------|---------|-------|
| `3.1-hook-swap-groups.md` | Hook Swap Groups | Identify compatible hooks per body (3-5 hooks per group target) | opus |
| `3.2-cta-swap-groups.md` | CTA Swap Groups | Verify 3 CTAs swap independently, add 1-2 more variants | opus |
| `3.3-proof-swap-groups.md` | Proof Swap Groups | Design 2-3 proof alternatives (testimonial/data/demonstration) | opus |
| `3.4-variant-matrix-calculator.md` | Variant Matrix Calculator | Calculate total variants (hooks x CTAs x proofs), verify >= 30 | opus |

---

## Layer 4: Output Packaging (3 files)

| File | Microskill | Purpose | Model |
|------|-----------|---------|-------|
| `4.1-package-assembler.md` | Package Assembler | Assemble SCRIPT-ARCHITECTURE-PACKAGE.md (40KB minimum) | sonnet |
| `4.2-execution-log-assembler.md` | Execution Log Assembler | Create execution-log.md with per-microskill verification | sonnet |
| `4.3-checkpoint-assembler.md` | Checkpoint Assembler | Create all LAYER_N_COMPLETE.yaml checkpoint files | sonnet |

---

## Key Architectural Patterns Extracted

### 1. The 3 Laws of Script Architecture
1. **The script serves the hook AND the big idea** — Hook promise must be fulfilled by the body
2. **Word count is physics, not suggestion** — 6s=15 words, 15s=40 words, 30s=75 words, 60s=160 words, 2-3min=450 words
3. **Modules are independent, scripts are not** — Swappable modules with clean seams, but coherent flow within a script

### 2. The 8 Frameworks
- **PAS** (Problem-Agitate-Solution) — 15-60s, Meta/TikTok, pain hooks
- **AIDA** (Attention-Interest-Desire-Action) — 30-90s, all platforms, authority hooks
- **BAB** (Before-After-Bridge) — 15-60s, Meta/TikTok, transformation hooks
- **Hook-Body-CTA** — 15-30s, TikTok/Reels/Shorts, all hook types (social-native default)
- **Story Narrative** — 60-120s, YouTube/Meta, identity/transformation hooks
- **Edutainment** — 2-5min, YouTube, curiosity/claim hooks, sophisticated audiences
- **UGC-DR** (User-Generated Content - Direct Response) — 15-45s, TikTok/Meta, testimonial/skeptic hooks
- **Fast-Paced Viral** — 6-15s, TikTok/Shorts, platform-native/visual hooks

### 3. The 5 Selection Variables
Every framework assignment must analyze and cite:
1. **Hook Type** (from AD-HOOK-TAXONOMY.md)
2. **Platform** (TikTok/Meta/YouTube/etc.)
3. **Ad Length** (6s/15s/30s/60s/90s/2min/3min)
4. **Vertical** (golf/health/finance/personal-dev/technology)
5. **Awareness Level** (unaware/problem/solution/product/most-aware)

### 4. The 5 Standard Modules
- **[HOOK]** — 3-5 seconds — Attention mechanism
- **[SETUP]** — 5-15 seconds — Problem context/story/education
- **[MECHANISM]** — 5-20 seconds — Why this works/unique explanation
- **[PROOF]** — 3-10 seconds — Evidence/testimonial/data
- **[CTA]** — 3-5 seconds — Call to action

### 5. Hook-Body Coherence Protocol (5 Questions)
Every script must answer:
1. Does the hook make a promise?
2. Does [SETUP] begin fulfilling within 5 seconds?
3. Does [MECHANISM] match hook's specificity?
4. Does the script lead to the big idea?
5. Would a viewer feel the body was written for them?

---

## Format Compliance

Each microskill file follows the standard format extracted from the reference example:

```markdown
# [ID]: [Name]

## Purpose
[What this microskill does and why it exists]

## Inputs
[What this microskill receives]

## Process
[Detailed logic/steps — extracted verbatim from AGENT.md]

## Output Schema
[Structured output format]

## Output File
- **Path:** `layer-[N]-outputs/[id]-[name].md`
- **Minimum size:** [X]KB

## Quality Checks
[Pass/fail criteria]

## Dependencies
[Prerequisites]
```

---

## Integration Points

### Upstream Dependencies
- **Skills 03-09** (Strategic foundation: Root Cause, Mechanism, Promise, Big Idea, Offer, Structure, Campaign Brief)
- **A02** (Hook Generation: 8+ selected hooks)
- **A03** (Format Strategy: format/platform/length assignments)
- **References/AD-SCRIPT-STRUCTURES.md** (8 frameworks, modular architecture)

### Downstream Consumers
- **A05** (Visual Direction) — uses visual intent per module
- **A06** (Ad Arena) — references complete script architectures
- **A07** (Copy Production) — uses content briefs to write actual copy
- **A09** (Assembly) — uses variant swap plan for matrix construction

---

## Anti-Degradation Enforcement

Each microskill file captures critical enforcement rules from the AGENT.md:

### Word Count Enforcement
- Word counts are EXACT, not approximate
- Tolerance exists but hard caps are absolute
- Every script verified BEFORE quality assessment

### Framework Selection Enforcement
- All 5 variables MUST be cited in rationale
- "I'll use PAS" without analysis is forbidden
- Framework diversity required (no single framework > 80%)

### Coherence Enforcement
- 5-question check is MANDATORY per concept
- "Seems fine" without answering questions is forbidden
- Disconnected scripts are caught HERE, not in A07

### Module Independence Rules
- Each module must be swappable (clean seams)
- Within a script, modules must flow (coherent)
- Minimum 3 CTAs per concept (urgency/risk-reversal/low-friction)

---

## Model Assignment

| Layer | Model | Rationale |
|-------|-------|-----------|
| **Pre-Execution** | haiku | File creation, directory setup (mechanical) |
| **Layer 0** | haiku | Loading, validation, input assembly (mechanical extraction) |
| **Layer 1** | opus | Framework selection requires deep reasoning across 5 variables |
| **Layer 2** | opus | Module design requires strategic reasoning about content, word count, coherence |
| **Layer 2.5** | opus | Structural evaluation of competing architectures |
| **Layer 3** | opus | Variant planning requires understanding dependencies and coherence |
| **Layer 4** | sonnet | Assembly and formatting (structured packaging, not creative reasoning) |

---

## Critical Success Factors

This extraction captures the following critical architectural requirements:

1. **Per-Microskill Output Protocol** — Every microskill produces its own dedicated file
2. **Binary Gate Enforcement** — Gates are PASS or FAIL (no invented statuses)
3. **Word Count Physics** — Exact word counts based on 2.5 words/second speech rate
4. **Hook-Body Coherence** — 5-question validation prevents disconnected scripts
5. **5-Variable Framework Selection** — Systematic analysis prevents arbitrary assignments
6. **Modular Architecture** — Clean seams enable variant testing
7. **Platform Nativeness** — Structures adapted to platform norms
8. **Mechanism Integration** — Mandatory for 60+ second scripts
9. **CTA Variants** — Minimum 3 per concept with different emotional appeals
10. **Variant Matrix** — Minimum 30 variants campaign-wide

---

## Verification

✅ All 30 microskill files created
✅ Standard format followed across all files
✅ Detailed logic extracted from AGENT.md (not summarized)
✅ Output schemas defined per file
✅ Quality checks specified per file
✅ Dependencies documented per file
✅ Directory structure matches main CopywritingEngine pattern
✅ Total size: 57.5 KB

---

## Next Steps

The microskill files are now ready for execution. When A04 runs:

1. Agents will read individual microskill .md files (not synthesize from AGENT.md)
2. Each microskill will produce its own dedicated output file
3. Checkpoint YAML files will list all microskill outputs with sizes
4. Execution log will confirm spec file read before each microskill execution
5. This prevents the "Synthesis Trap" where agents generate plausible output without executing actual microskill logic

---

**Extraction completed:** 2026-02-22
**Files ready for production use**
