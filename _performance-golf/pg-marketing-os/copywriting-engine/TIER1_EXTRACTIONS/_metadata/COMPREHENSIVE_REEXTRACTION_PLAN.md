# COMPREHENSIVE TIER 1 RE-EXTRACTION PLAN

**Generated:** 2026-01-31 (Updated with Headline fields)
**Purpose:** Complete all Tier 1 extractions with full verbatim content + RSF fields + Enhanced Headline fields
**Goal:** Every Tier 1 swipe fully populated for optimal skill training, including new Headline Skill support

---

## EXECUTIVE SUMMARY

### Current State
| Category | Files | Issue | Action Required |
|----------|-------|-------|-----------------|
| **Arsenal (from abbreviated JSON)** | 98 | Missing verbatim content + RSF | FULL RE-EXTRACTION |
| **Non-Arsenal (existing)** | 167 | Have verbatim, missing RSF | RSF ENHANCEMENT |
| **Unextracted/Missing** | ~90 | Never processed | NEW EXTRACTION |
| **TOTAL** | ~255 | | |

### The Problem
1. **Arsenal files** were extracted from vault JSON containing descriptions instead of actual copy
2. **All files** are missing RSF fields (FSSIT, Schema Distance, Narrative Reorganization, Temporal)
3. **All files** are missing enhanced Headline fields for the new 08.5-headline skill
4. **Some files** from the Tier 1 list may not have been extracted at all

### New: Headline Skill Support
A new Headline Skill (08.5) has been added between Campaign Brief and Lead. This requires enhanced headline extraction fields to support:
- Pattern type and format classification
- Promise compression analysis
- Curiosity architecture mapping
- Schema distance calibration (RSF integration)
- VSL adaptation notes
- Headline-lead connection design

**See:** `HEADLINE_EXTRACTION_FIELDS.md` for complete field specification

---

## PART 1: WHAT NEEDS TO HAPPEN

### Track A: Arsenal Full Re-Extraction (98 → 75 deduplicated files)
- **Source:** Original markdown files in `/Unused Copy Processes/BigIdeaEngine/Data/Cleaned_Swipe_File/107 GREATEST Ads in Alt-Health (Arsenal of Ads)/`
- **Schema:** Full V3 schema + RSF fields
- **Output:** Replace existing Arsenal extractions with complete versions
- **Mapping:** Use `arsenal_extraction_queue.json` for vault-to-source matching

### Track B: Non-Arsenal RSF Enhancement (167 files)
- **Source:** Existing V3 extractions in `TIER1_EXTRACTIONS/batch_*/`
- **Action:** Add RSF overlay fields to existing extractions
- **Schema:** RSF fields only (FSSIT, Schema Analysis, Narrative Reorganization, Temporal)
- **Output:** Either merge into existing JSON or create RSF overlay files

### Track C: Missing File Extraction (if any remain)
- **Audit:** Compare tier1_revised_filelist.txt against existing extractions
- **Source:** Original source files for any missing entries
- **Schema:** Full V3 schema + RSF fields
- **Output:** New extraction files

---

## PART 2: RSF FIELD REQUIREMENTS

Every Tier 1 extraction must include these RSF sections:

### 2.1 FSSIT Analysis (Root Level)
```json
"rsf_analysis": {
  "fssit_candidates": [
    {
      "statement": "[VERBATIM statement from copy]",
      "location": "lead | body | mechanism_reveal | close",
      "narrative_reorganization_potential": 1-10,
      "past_explaining_power": "[How this explains audience's past]"
    }
  ],
  "fssit_density": "none | sparse | moderate | dense",
  "fssit_placement_pattern": "[Description of where FSSITs appear]"
}
```

**Identification Criteria:**
- Statements that make audience say "Finally someone said what I've been feeling"
- Often paired with root cause reveals
- Create "I'm not crazy/broken" recognition
- Express what audience felt but couldn't articulate

### 2.2 Schema Analysis (Headline + Lead Level)
```json
"schema_analysis": {
  "expectation_violated": "[What audience expectation this violates]",
  "schema_distance_estimate": 1-10,
  "resolution_speed": "instant | quick | moderate | slow",
  "whitespace_territory": "[Messaging territory competitors don't occupy]"
}
```

**Schema Distance Scale:**
- 1-3: Highly conventional
- 4-5: Moderate violation - "That's interesting..."
- 6-7: Strong violation - "Wait, what?"
- 8-9: Significant violation - "That's surprising..."
- 10: Extreme - may confuse

### 2.3 Narrative Reorganization (Root Cause Level)
```json
"narrative_reorganization": {
  "domain_scope": "[financial | health | golf | relationships | etc.]",
  "past_explaining_power": 1-10,
  "self_blame_removal": "[How this removes self-blame]",
  "coherence_creation": "[What disparate failures this connects]",
  "new_self_concept": "[New identity this installs]",
  "rich_formula_score": {
    "confirms": true | false,
    "amplifies": true | false,
    "names": true | false,
    "connects": true | false
  }
}
```

**Rich's Formula:**
- **CONFIRMS:** Validates their experiences as real/true
- **AMPLIFIES:** Shows problem is more significant than they thought
- **NAMES:** Gives the pattern a name they can use
- **CONNECTS:** Links disparate experiences into one coherent story

### 2.4 Temporal Analysis (If Present)
```json
"temporal_analysis": {
  "cultural_moment_reference": "[Current event/trend referenced]",
  "temporal_urgency_device": "[What creates time pressure]",
  "datedness_risk": "low | medium | high",
  "evergreen_elements": ["[Elements that remain timely]"]
}
```

---

## PART 3: VERBATIM CONTENT REQUIREMENTS

### Critical Verbatim Fields (Must Capture Full Text)

| Section | Field | Minimum Words | Purpose |
|---------|-------|---------------|---------|
| **Lead** | `full_text` | 100-500+ | Complete lead copy for pattern training |
| **Mechanism** | `explanation_text` | 200-1000+ | Full mechanism explanation |
| **Story** | `story_text` | 100-800+ | Complete narrative arc |
| **Proof** | `strongest_proof_element` | 50-300 | Verbatim proof passages |
| **Close** | `future_pacing_text` | 50-200 | Closing emotional imagery |

### V3 Schema Sections (Must Be Complete)

1. **Configuration** (7 elements, 9 drivers, 8 structures)
2. **Headline** (main, sub, deck, pattern, power words)
3. **Lead** (full_text, type, hook, opening_device, transition, progression)
4. **Promise Architecture** (primary, supporting, ceiling, floor, pairings)
5. **Root Cause Architecture** (3-part structure, villain, countersells)
6. **Mechanism** (name, type, explanation_text, 13-dimension scores)
7. **Proof Inventory** (elements array, category taxonomy, density)
8. **Story Architecture** (type, protagonist, beats, arc, lesson)
9. **Offer** (value stack, price psychology, urgency)
10. **Close** (sequence, escalation, future pacing)
11. **Narrative Flow** (section sequence, transitions, pacing)
12. **RSF Analysis** (NEW - all 4 sections above)

---

## PART 4: EXECUTION PLAN

### Phase 1: Preparation (Day 1)
1. **Validate Arsenal mapping** - Review `arsenal_extraction_queue.json`
2. **Audit non-Arsenal** - Confirm which files exist and their completeness
3. **Create source file list** - All original sources for Arsenal re-extraction
4. **Establish batch structure** - 15-20 files per batch

### Phase 2: Arsenal Full Re-Extraction (Days 2-4)
**75 unique files from original source markdown**

| Batch | Files | Source |
|-------|-------|--------|
| Arsenal_01 | 15 | Original markdown |
| Arsenal_02 | 15 | Original markdown |
| Arsenal_03 | 15 | Original markdown |
| Arsenal_04 | 15 | Original markdown |
| Arsenal_05 | 15 | Original markdown |

**Per-File Process:**
1. Read original markdown source
2. Extract full V3 schema with verbatim content
3. Add RSF analysis fields
4. Validate completeness
5. Output to new batch folder

### Phase 3: Non-Arsenal RSF Enhancement (Days 5-7)
**167 existing files need RSF fields added**

**Option A: RSF Overlay Files** (Recommended for speed)
- Create `rsf-enrichment-batch-XX.json` files
- Contains swipe_id + rsf_analysis + schema_analysis + narrative_reorganization
- Merge later or keep as overlay

**Option B: Full File Update**
- Read existing extraction
- Add RSF fields
- Write updated JSON
- More token-intensive but cleaner

| Batch | Files | Approach |
|-------|-------|----------|
| RSF_01 | 25 | Read + Analyze + Output |
| RSF_02 | 25 | Read + Analyze + Output |
| RSF_03 | 25 | Read + Analyze + Output |
| RSF_04 | 25 | Read + Analyze + Output |
| RSF_05 | 25 | Read + Analyze + Output |
| RSF_06 | 25 | Read + Analyze + Output |
| RSF_07 | 17 | Read + Analyze + Output |

### Phase 4: Audit & Missing Files (Day 8)
1. Compare tier1_revised_filelist.txt against all extractions
2. Identify any files never extracted
3. Process missing files with full V3 + RSF schema

### Phase 5: Vault Intelligence Rebuild (Day 9)
1. Merge RSF overlays if using Option A
2. Regenerate vault intelligence for all 14 skills
3. Validate specimen counts and RSF field coverage
4. Confirm verbatim content availability

---

## PART 5: PRIORITY QUEUE

### Highest Priority (Process First)
Files with high likelihood of strong RSF content:

**Arsenal High-Value (from mapping):**
- Better Than Botox (StriVectin) - Strong schema distance
- Confessions of Acid Reflux Victim - High FSSIT potential
- Baby Boomers Fear Memory Loss - Strong NR
- Obama's Brain Research - News hijack pattern
- Atlanta Housewife - Story selling master

**Non-Arsenal High-Value:**
- America 2020 (Stansberry) - Dense FSSIT, high NR
- End of America (Stansberry) - Prophecy + NR
- FDA Raided Cures - Conspiracy + schema distance
- Gary Halbert pieces - Master copywriting patterns

### Standard Priority
All other Tier 1 files processed in batch order

### Lower Priority (if time constrained)
- Proof-heavy / demonstration-heavy pieces
- Simple mechanism explanations
- Compilation/dossier structures

---

## PART 6: QUALITY CHECKPOINTS

### Per-Extraction Validation
- [ ] `lead.full_text` > 100 words (verbatim, not description)
- [ ] `mechanism.explanation_text` populated with actual copy
- [ ] `story_architecture.story_text` captured if story present
- [ ] `rsf_analysis.fssit_candidates` array populated
- [ ] `schema_analysis` present on headline AND lead
- [ ] `narrative_reorganization` present in root_cause_architecture
- [ ] All 13-dimension mechanism scores populated

### Per-Batch Validation
- [ ] All files in batch successfully extracted
- [ ] RSF field coverage > 90%
- [ ] Verbatim content density appropriate
- [ ] No placeholder or description-only fields

### Post-Completion Validation
- [ ] Total extraction count matches tier1 list
- [ ] Vault intelligence successfully regenerated
- [ ] Skill specimen counts match expectations
- [ ] RSF field distributions analyzed

---

## PART 7: OUTPUT STRUCTURE

### New Directory Structure
```
TIER1_EXTRACTIONS/
├── _metadata/
│   ├── COMPREHENSIVE_REEXTRACTION_PLAN.md (this file)
│   ├── arsenal_extraction_queue.json
│   ├── arsenal_source_filelist.txt
│   ├── rsf_coverage_report.json
│   └── extraction_audit.md
├── batch_01/ through batch_06/ (existing non-Arsenal)
├── arsenal_batch_01/ through arsenal_batch_05/ (new)
├── rsf_enrichment/ (if using overlay approach)
│   ├── rsf-enrichment-batch-01.json
│   └── ...
└── final_merged/ (post-processing)
    └── [all complete extractions]
```

---

## PART 8: ESTIMATED EFFORT

| Phase | Files | Est. Time | Notes |
|-------|-------|-----------|-------|
| Arsenal Re-Extraction | 75 | 8-12 hours | Full extraction from source |
| Non-Arsenal RSF | 167 | 6-10 hours | Analysis + RSF fields only |
| Audit & Missing | ~10 | 1-2 hours | Gap filling |
| Vault Intelligence | - | 1-2 hours | Rebuild process |
| **TOTAL** | ~252 | **16-26 hours** | Across multiple sessions |

---

## NEXT IMMEDIATE ACTIONS

1. **Review this plan** - Confirm approach and priorities
2. **Validate Arsenal mapping** - Spot-check source file matches
3. **Choose RSF approach** - Overlay vs. full file update
4. **Begin Arsenal batch 1** - Start with highest-priority files
5. **Track progress** - Use todo list and session logs

---

## FILES REFERENCED

| File | Location | Purpose |
|------|----------|---------|
| tier1_revised_filelist.txt | _metadata/ | Master list of 255 Tier 1 files |
| arsenal_extraction_queue.json | _metadata/ | 75 deduplicated Arsenal mappings |
| arsenal_source_filelist.txt | _metadata/ | Source paths for Arsenal |
| VAULT_V3_SCHEMA.md | /CopywritingEngine/ | Full V3 extraction schema |
| RSF-EXTRACTION-HANDOFF.md | /HANDOFFS/ | RSF field specifications |

---

**Document prepared:** 2026-01-31
**Status:** Ready for review and execution
