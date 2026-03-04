# Learning Log: Headline Skill Architecture + Skill Sequence Restructure Analysis

**Date:** 2026-01-31
**Topic:** Headline Skill Creation, Extraction Planning, Skill Sequence Restructure

---

## SECTION 1: HEADLINE SKILL LEARNINGS

### Why Headlines Needed a Dedicated Skill

**Problem Identified:**
- Headlines were being generated implicitly in the lead or campaign brief
- No dedicated vault intelligence for headline patterns
- No systematic curiosity gap engineering
- No schema distance calibration at headline level

**Solution:**
- Created 10-headlines skill between campaign-brief and lead
- Built 4-layer architecture mirroring other writing skills
- Integrated RSF framework for schema distance

### Key Headline Concepts Implemented

**1. Curiosity Gap Types**
| Gap Type | Question Form | Best Resolution |
|----------|---------------|-----------------|
| Mechanism | "What IS this thing?" | Lead/Body reveal |
| Result | "What results did they get?" | Lead/Early body |
| Identity | "Who is this person?" | Lead (authority) |
| Enemy | "What's sabotaging me?" | Root cause section |
| Secret | "What info am I missing?" | Throughout, late reveal |
| Story | "What happened next?" | Story section |

**2. Schema Distance Scale**
- 1-3: Conventional (low attention)
- 4-5: Moderate ("That's interesting")
- 6-7: **OPTIMAL** ("Wait, what?")
- 8-9: Significant ("That's surprising")
- 10: Extreme (confusion risk)

**3. Headline-Lead Connection**
- Gap resolution timing affects lead architecture
- Headline callback opportunities strengthen coherence
- Subheadline should make "how" visible for high schema distance

### Enhanced Headline Fields Specification

Created comprehensive field specification for extraction support:
- Promise compression (core promise in headline form)
- Curiosity architecture (gap design)
- Schema analysis (RSF integration)
- Emotional engineering (intensity, trajectory)
- VSL adaptation (spoken version, title card)
- Formula pattern matching

---

## SECTION 2: ARSENAL RE-EXTRACTION LEARNINGS

### The Source File Problem

**Discovery:**
Arsenal swipes were extracted from vault JSON (metadata only) instead of original source markdown (actual copy).

**Evidence:**
- Vault JSON: `"lead.full_text": "First-person narrative confession"` (DESCRIPTION)
- Source MD: `"For 40-Years, I was tortured with unbearable indigestion..."` (ACTUAL COPY)

**Impact:**
- Missing verbatim content for training
- Proof passages not captured
- Story text absent
- Lead full text abbreviated

### Mapping Process

1. Extracted headlines/products from all 98 vault JSON files
2. Matched to 100 source markdown files using similarity scoring
3. Manual corrections for low-confidence matches
4. Identified 75 unique files after deduplication
5. Created extraction queue with source paths

### Lessons for Future Extractions

1. **Always extract from original source files**
2. **Verify verbatim content in lead.full_text > 100 words**
3. **Check mechanism.explanation_text is actual copy, not description**
4. **Validate story_text captures complete narrative**

---

## SECTION 3: SKILL SEQUENCE RESTRUCTURE ANALYSIS

### Proposed 20-Skill Sequence

```
PHASE 1: Research & Strategy (01-06)
01 Deep Research
02 Proof Inventory
03 Root Cause
04 Mechanism
05 Promise
06 Big Idea

PHASE 2: Architecture (07-09)
07 Offer + Format Selection
08 Structure
09 Campaign Brief ← HUMAN REVIEW GATE

PHASE 3: Writing (10-18)
10 Headline ← HUMAN SELECTS
11 Lead
12 Story
13 Root Cause Narrative
14 Mechanism Narrative
15 Proof Weaving ← NEW SKILL
16 Product Introduction
17 Offer Copy
18 Close

PHASE 4: Assembly & Review (19-20)
19 Assembly (AI-powered)
20 Editorial Review
```

### Key Changes Analyzed

**1. Renumbering (00→01 base)**
- Rationale: Human-readable, clean 20-step process
- Impact: All folder names change, all file references change
- Risk: HIGH — extensive find/replace needed

**2. Big Idea Singular (06-big-idea → 06-big-idea)**
- Rationale: Output is singular even though multiple generated
- Impact: Folder rename, package references
- Risk: LOW — contained change

**3. Proof Weaving (NEW skill at position 15)**
- Rationale: Proof is critical but has no dedicated writing skill
- Current state: Proof inventory exists, but writing is scattered
- Proposed function:
  - Create proof blocks for insertion
  - Build testimonial sequences
  - Construct before/after progressions
  - Ensure proof density optimization
  - Match proof to claims in each section
- Impact: New skill development required
- Risk: MEDIUM — new development

**4. Format Selection in Offer Skill**
- Rationale: Format (VSL/Sales Page/E-commerce) affects structure
- Impact: Enhance 07-offer to include format decision
- Risk: LOW — enhancement not replacement

**5. Enhanced Assembly Skill**
- Rationale: Current assembly is mechanical; needs AI intelligence
- Proposed enhancements:
  - Reference swipe patterns during assembly
  - Optimize transitions using model intelligence
  - Ensure coherence across sections
  - Create fully optimized draft
- Impact: Significant enhancement of skill 19
- Risk: MEDIUM — enhancement required

### Dependency Analysis Required

Before restructure, must audit:
1. All AGENT.md files referencing other skills by number
2. Package references (e.g., "mechanism-package.json")
3. Upstream-loader.md files in each skill
4. Vault intelligence file references
5. Session logs and learning logs
6. SKILL-SEQUENCE.md (already updated for 08.5)

### Breaking Change Categories

| Category | Files Affected | Migration Approach |
|----------|---------------|-------------------|
| Folder names | 18 folders | Batch rename |
| Skill references | ~200 files | Find/replace |
| Package names | ~50 files | Careful review |
| Vault intelligence | ~14 files | Regenerate |
| Documentation | ~20 files | Manual update |

---

## SECTION 4: PROOF WEAVING SKILL CONCEPT

### Why Proof Weaving is Needed

**Current Gap:**
- 02-proof-inventory catalogues proof
- But no skill specifically WRITES proof into copy
- Proof gets scattered across mechanism, product intro, offer
- No systematic proof density optimization

**Proposed Function:**
1. Load proof inventory
2. Match proof elements to claims in draft
3. Create proof blocks (can be inserted anywhere)
4. Build testimonial sequences
5. Construct before/after progressions
6. Optimize proof density per section
7. Ensure credibility anchors are placed strategically

**Position Rationale (after Mechanism Narrative):**
- Mechanism has been explained
- Proof of mechanism working comes next
- Product introduction leverages that proof
- Natural narrative flow: "Here's how it works → Here's proof it works → Here's the product"

### Proof Weaving Output

```json
{
  "proof_blocks": [
    {
      "block_id": "testimonial_sequence_01",
      "type": "testimonial_cascade",
      "content": "[Written testimonial sequence]",
      "placement_recommendation": "after mechanism reveal",
      "proof_elements_used": ["testimonial_001", "testimonial_003"]
    }
  ],
  "before_after_progressions": [...],
  "credibility_anchors": [...],
  "density_map": {
    "lead": 2,
    "mechanism_narrative": 4,
    "proof_weaving_section": 8,
    "product_intro": 3,
    "offer_copy": 2,
    "close": 2
  }
}
```

---

## SECTION 5: RECOMMENDATIONS

### For Restructure Execution

1. **Create migration checklist** before any changes
2. **Backup entire Skills folder** before renaming
3. **Use search/replace carefully** — review each change
4. **Test one skill first** — rename 00→01, verify nothing breaks
5. **Update documentation last** — after code changes verified

### For Proof Weaving Development

1. **Start with AGENT.md scaffold** (similar to headline skill)
2. **Define proof block types** (testimonial, study, demonstration, etc.)
3. **Build placement algorithm** based on narrative flow
4. **Integrate with proof inventory** output format
5. **Test with existing draft** before full development

### For Extraction Execution

1. **Start with Arsenal Track A** — highest priority
2. **Include enhanced headline fields** in all extractions
3. **Validate verbatim content** at each step
4. **Build headline vault intelligence** from extraction data

---

## RESUME INSTRUCTIONS

### If Continuing Restructure Analysis
1. Read this log + session log
2. Audit all skill files for cross-references
3. Create detailed migration checklist
4. Present to Anthony for approval

### If Starting Extraction
1. Read COMPREHENSIVE_REEXTRACTION_PLAN.md
2. Read HEADLINE_EXTRACTION_FIELDS.md
3. Begin Arsenal Track A with enhanced headline fields
4. Process in batches of 10-15 files

### If Building Proof Weaving Skill
1. Read 02-proof-inventory AGENT.md for context
2. Study how proof is currently scattered in writing skills
3. Design proof block types and placement algorithm
4. Create scaffold following headline skill pattern

---

**Key Insight:** The copywriting engine is evolving from a linear skill sequence to a more sophisticated system with:
- Dedicated attention to headlines (historically critical)
- Dedicated proof weaving (currently scattered)
- AI-powered assembly (beyond mechanical stitching)
- Clean 20-step process for automation readiness

---

## SECTION 6: DECISION (2026-02-01)

### Restructure Decision: Option B (Phased Approach)

**Approved Path:**
1. **Phase B1 (NOW):** Add `18-proof-weaving` scaffold — COMPLETE
2. **Phase B2 (NEXT):** Complete extraction campaign with current numbering
3. **Phase B3 (AFTER EXTRACTION):** Full migration to 01-20 sequence with step-by-step verification

### Proof Weaving Clarification

**Key Understanding:** Proof Weaving is a DRAFTING skill, not just strategic placement.

**Function:**
- Inputs: Proof Inventory + Structure (proof placements) + Campaign Brief (style direction)
- Drafts: All proof copy — testimonials written out, before/afters narrativized, study citations formatted
- Outputs: Assembly-ready proof blocks with insertion instructions

**Position Logic:**
```
Phase 3: Section Writing (09-15)
  └── 17-close (final writing skill)
Phase 3.75: Proof Drafting
  └── 18-proof-weaving ← DRAFTS ALL PROOF COPY
Phase 3.5: Assembly
  └── 19-campaign-assembly ← INSERTS PROOF BLOCKS
```

**Why After Close:**
- All section drafts are complete
- Structure tells us WHERE proof goes
- Brief tells us WHAT TYPE of proof
- Proof Inventory tells us WHAT PROOF exists
- This skill WRITES the proof copy
- Assembly INSERTS the written blocks

### Files Created

1. `18-proof-weaving/PROOF-WEAVING-AGENT.md` — Full AGENT specification
2. `18-proof-weaving/skills/layer-0/` through `layer-3/` — Directory structure
3. `18-proof-weaving/vault-intelligence/` — For future extraction patterns
4. `18-proof-weaving/outputs/` — For package output

### Updated SKILL-SEQUENCE.md

- Skill count: 20 skills (00-17 + 08.5 + 15.5)
- Added Phase 3.75: Proof Drafting
- Updated dependency flow diagram
- Updated skill build status table

### Next Steps

1. Proceed with extraction campaign (current numbering)
2. After extraction: Full migration to 01-20 with step-by-step verification
3. Each skill section checked individually during migration
