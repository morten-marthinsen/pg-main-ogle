# Skill Sequence Restructure Assessment

**Date:** 2026-02-01
**Purpose:** Deep analysis of proposed 20-skill restructure before execution

---

## EXECUTIVE SUMMARY

**Verdict:** The restructure is sound in concept but HIGH-RISK in execution. Recommend a phased approach: (1) Add Proof Weaving skill at current position 15.5, (2) Complete extraction campaign, (3) Execute full renumbering as a dedicated migration project.

---

## CURRENT STATE ANALYSIS

### Current Skill Sequence (19 Skills)

```
01-research
02-proof-inventory
03-root-cause
04-mechanism
05-promise
06-big-idea
07-offer
08-structure
09-campaign-brief
10-headlines (inserted 2026-01-31)
11-lead
12-story
13-root-cause-narrative
14-mechanism-narrative
15-product-introduction
16-offer-copy
17-close
19-campaign-assembly (inside 17)
20-editorial-review
```

### Dependency Reference Count

| Reference Type | Files Affected | Occurrences |
|----------------|----------------|-------------|
| Skill folder patterns (0X-*) | 162 | 772 |
| Package references (*-package.json) | 51 | 200+ |
| Upstream loader paths | 51 | 100+ |
| Vault intelligence references | 14 | ~50 |
| Documentation references | 20+ | 100+ |

**Total estimated changes:** 1,000+ individual string replacements

---

## PROPOSED NEW STATE

### New 20-Skill Sequence

```
PHASE 1: Research & Strategy (01-06)
01 Deep Research         (was 00)
02 Proof Inventory       (was 01)
03 Root Cause            (was 02)
04 Mechanism             (was 03)
05 Promise               (was 04)
06 Big Idea (singular)   (was 06-big-idea)

PHASE 2: Architecture (07-09)
07 Offer + Format Selection  (was 06)
08 Structure                 (was 07)
09 Campaign Brief ← HUMAN REVIEW GATE (was 08)

PHASE 3: Writing (10-18)
10 Headline ← HUMAN SELECTS  (was 08.5)
11 Lead                      (was 09)
12 Story                     (was 10)
13 Root Cause Narrative      (was 11)
14 Mechanism Narrative       (was 12)
15 Proof Weaving ← NEW SKILL
16 Product Introduction      (was 13)
17 Offer Copy               (was 14)
18 Close                    (was 15)

PHASE 4: Assembly & Review (19-20)
19 Assembly (AI-powered)    (was 16)
20 Editorial Review         (was 17)
```

---

## MIGRATION COMPLEXITY ANALYSIS

### Category 1: Folder Renames (HIGH IMPACT)

**18 folders must be renamed + 1 new folder created:**

| Current | New | Change Type |
|---------|-----|-------------|
| 01-research | 01-deep-research | +1 |
| 02-proof-inventory | 02-proof-inventory | +1 |
| 03-root-cause | 03-root-cause | +1 |
| 04-mechanism | 04-mechanism | +1 |
| 05-promise | 05-promise | +1 |
| 06-big-idea | 06-big-idea | +1 + singular |
| 07-offer | 07-offer | +1 |
| 08-structure | 08-structure | +1 |
| 09-campaign-brief | 09-campaign-brief | +1 |
| 10-headlines | 10-headline | normalize |
| 11-lead | 11-lead | +2 |
| 12-story | 12-story | +2 |
| 13-root-cause-narrative | 13-root-cause-narrative | +2 |
| 14-mechanism-narrative | 14-mechanism-narrative | +2 |
| (NEW) | 15-proof-weaving | INSERT |
| 15-product-introduction | 16-product-introduction | +3 |
| 16-offer-copy | 17-offer-copy | +3 |
| 17-close | 18-close | +3 |
| 19-campaign-assembly | 19-campaign-assembly | +3 |
| 20-editorial-review | 20-editorial-review | +3 |

### Category 2: Package Name Updates

Package names are skill-name based, NOT number-based. These would NOT require changes:
- `mechanism-package.json` → stays `mechanism-package.json`
- `promise-package.json` → stays `promise-package.json`

**Exception:** If folder paths are hardcoded (they are in some files):
- `04-mechanism/outputs/mechanism-package.json` → `04-mechanism/outputs/mechanism-package.json`

**Impact:** MEDIUM — ~200 path references need folder number updates

### Category 3: Cross-Skill References in AGENT Files

Example from 11-lead/skills/layer-0/0.1-upstream-loader.md:
```yaml
upstream_paths:
  mechanism_package: "04-mechanism/outputs/mechanism-package.json"
  structure_package: "08-structure/outputs/structure-package.json"
  promise_package: "05-promise/outputs/promise-package.json"
  root_cause_package: "03-root-cause/outputs/root-cause-package.json"
  proof_inventory: "02-proof-inventory/outputs/proof-inventory-output.json"
```

**Every upstream-loader file would need path updates.**

Files affected: 51 upstream-loader and related files

### Category 4: Documentation References

SKILL-SEQUENCE.md, ARCHITECTURE-EXTENSION.md files, and all AGENT.md files contain:
- Skill numbers in prose ("Skill 09", "09-campaign-brief")
- Dependency diagrams with numbered boxes
- Phase descriptions

**Impact:** HIGH — Manual review needed, cannot simple find/replace

### Category 5: Vault Intelligence Files

14 vault intelligence JSON files contain skill references:
- `offer-copy-vault-intelligence.json`
- `mechanism-vault-intelligence.json`
- etc.

**Impact:** MEDIUM — May need regeneration after restructure

---

## PROOF WEAVING SKILL ANALYSIS

### Rationale

**Current Gap:**
- 02-proof-inventory CATALOGUES proof (strategic)
- But no skill specifically WRITES proof into copy
- Proof gets scattered across mechanism-narrative, product-intro, offer-copy
- No systematic proof density optimization

**Proposed Function:**
1. Load proof inventory from 02-proof-inventory
2. Load drafted sections from skills 11-14 (lead through mechanism-narrative)
3. Create proof blocks for insertion:
   - Testimonial sequences
   - Before/after progressions
   - Study citations
   - Authority endorsements
4. Match proof to specific claims in each section
5. Output proof blocks with placement recommendations

**Position Rationale (after Mechanism Narrative, before Product Introduction):**
```
...
14 Mechanism Narrative - "Here's HOW it works"
15 Proof Weaving      - "Here's PROOF it works" ← NEW
16 Product Introduction - "Here's the PRODUCT that delivers it"
...
```

The narrative flow is natural:
- Mechanism explained → Proof of mechanism → Product that delivers mechanism

### Proof Weaving Output Structure

```json
{
  "proof_blocks": [
    {
      "block_id": "testimonial_cascade_01",
      "type": "testimonial_sequence",
      "content": "[Written testimonial prose]",
      "placement_recommendation": "after mechanism reveal",
      "proof_elements_used": ["testimonial_001", "testimonial_003"],
      "density_contribution": 3
    }
  ],
  "before_after_progressions": [...],
  "study_citations": [...],
  "credibility_anchors": [...],
  "density_map": {
    "lead": { "target": 2, "current": 1, "needed": 1 },
    "mechanism_narrative": { "target": 4, "current": 2, "needed": 2 },
    "proof_section": { "target": 8, "current": 0, "needed": 8 },
    "product_intro": { "target": 3, "current": 0, "needed": 3 },
    "offer_copy": { "target": 2, "current": 0, "needed": 2 },
    "close": { "target": 2, "current": 0, "needed": 2 }
  },
  "insertion_guide": {
    "mechanism_narrative_insertions": [...],
    "product_intro_insertions": [...],
    "offer_copy_insertions": [...]
  }
}
```

---

## RISK ASSESSMENT

### HIGH RISK Factors

1. **Scope:** 1,000+ individual string changes across 162+ files
2. **Interdependency:** Skills reference each other by number AND path
3. **Documentation:** Significant prose descriptions reference skill numbers
4. **Testing:** No automated tests to verify nothing broke
5. **Extraction Campaign:** Currently planning extraction — restructure would delay

### MEDIUM RISK Factors

1. **Package Names:** Most are skill-name based, not number-based
2. **Vault Intelligence:** Can be regenerated from extractions
3. **08.5 Normalization:** The .5 numbering is awkward, normalizing is clean

### LOW RISK Factors

1. **New Skill Addition:** Adding Proof Weaving is isolated development
2. **Phase Structure:** The 4-phase concept is already established
3. **Concept Validity:** The 20-skill sequence is logically sound

---

## RECOMMENDATIONS

### Option A: Full Restructure Now (NOT RECOMMENDED)

**Pros:**
- Clean 20-skill sequence
- Human-readable numbering (01-20)
- Proof Weaving integrated

**Cons:**
- HIGH breakage risk
- Delays extraction campaign by 1-2 days
- Manual review of all 162+ files required
- No automated verification

### Option B: Phased Approach (RECOMMENDED)

**Phase B1: Add Proof Weaving Only (NOW)**
- Create `18-proof-weaving` skill scaffold
- Minimal disruption to existing references
- Can proceed with extraction campaign
- Proof Weaving development can happen in parallel

**Phase B2: Complete Extraction Campaign (NEXT)**
- Use current numbering scheme
- Build vault intelligence with current structure
- All 245 files extracted and validated

**Phase B3: Full Migration Project (AFTER EXTRACTION)**
- Dedicated migration with:
  1. Full backup of Skills folder
  2. Automated find/replace script with verification
  3. Manual review of documentation
  4. Staged rollout (rename folders → update paths → update docs)
  5. Validation pass before committing

### Option C: Partial Restructure (ALTERNATIVE)

**Keep 00-based numbering, add Proof Weaving at 15.5:**
- Renumber 08.5 → 08.5 (keep)
- Add 18-proof-weaving
- Skip the 01-20 renumbering entirely
- Pros: Much less disruption
- Cons: Still has .5 skills, less clean

---

## DECISION FRAMEWORK

| If Priority Is... | Recommendation |
|-------------------|----------------|
| Clean architecture | Option A (full restructure now) |
| Extraction velocity | Option B (phased approach) |
| Minimal disruption | Option C (partial, keep .5 skills) |

---

## NEXT STEPS IF APPROVED

### For Option B (Recommended Phased Approach)

**Immediate (Today):**
1. Create `18-proof-weaving` skill folder
2. Scaffold AGENT.md for Proof Weaving
3. Update SKILL-SEQUENCE.md to include 15.5
4. Proceed with extraction campaign

**Post-Extraction (Future):**
1. Create migration script
2. Execute full renumbering
3. Validate all references
4. Update documentation

---

**Awaiting Decision:** Which approach do you want to proceed with?
