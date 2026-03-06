# TIER1 Schema Compliance Report

**Generated:** 2026-02-21
**Reference Schema:** `tier1-extractions/VAULT_V3_SCHEMA.md`

---

## Required V3 Top-Level Sections

Per VAULT_V3_SCHEMA.md, every extraction MUST have:

1. `swipe_id` — standardized naming
2. `configuration` — 7 elements + 9 drivers + 8 structures (scored 0-10)
3. `rsf_framework` — R (relatable_problem), S (specific_solution), F (freedom_promise)
4. `components` — wrapper containing: headline, lead, promise_architecture, root_cause_architecture, mechanism, proof_inventory, story_architecture, narrative_flow, offer, close
5. `metadata` — source info, extraction metadata

### Additional RSF Analytical Fields

6. `rsf_analysis.fssit_candidates` — FSSIT statements
7. `schema_analysis` — schema distance, whitespace territory
8. `narrative_reorganization` — past-explaining power, rich formula score
9. `temporal_analysis` — cultural moment, datedness risk

---

## Compliance Matrix by Batch Group

### Group A: batch_01 through batch_06 (167 files)

| Field | batch_01 (20) | batch_02 (49) | batch_03 (50) | batch_04 (13) | batch_05 (12) | batch_06 (23) |
|-------|--------------|--------------|--------------|--------------|--------------|--------------|
| swipe_id | 20/20 | 49/49* | 50/50 | 13/13 | 12/12 | 23/23 |
| configuration | 20/20 | 48/49 | 50/50 | 12/13 | 12/12 | 23/23 |
| **rsf_framework** | **0/20** | **0/49** | **0/50** | **0/13** | **0/12** | **0/23** |
| rsf_analysis | 20/20 | 46/49 | 50/50 | 12/13 | 10/12 | 23/23 |
| components | 20/20 | 47/49 | 50/50 | 12/13 | 10/12 | 23/23 |
| metadata | 20/20 | 48/49 | 50/50 | 13/13 | 12/12 | 23/23 |
| schema_analysis | 20/20 | 46/49 | 50/50 | 12/13 | 10/12 | 23/23 |
| narrative_reorg | 20/20 | 46/49 | 50/50 | 12/13 | 10/12 | 23/23 |
| temporal_analysis | 20/20 | 46/49 | 50/50 | 12/13 | 10/12 | 23/23 |

**Key Issues:**
- `rsf_framework` MISSING from ALL 167 files — needs to be added
- Has `rsf_analysis` (old key) instead — content can be used to build `rsf_framework`
- ~5 files in batch_02 and ~3 in batch_04/05 use variant schemas (flattened, no components wrapper)
- Dominant pattern (153/167): `swipe_id|configuration|components|metadata|rsf_analysis|schema_analysis|narrative_reorganization|temporal_analysis`
- Avg file size 50-76 KB — content is rich, just needs rsf_framework added

**Remediation:** Add `rsf_framework` section (R-S-F structure) by extracting from existing `rsf_analysis`. ~8 outlier files need structural normalization (add `components` wrapper, standardize keys).

---

### Group B: batch_new_v3 (122 files)

| Field | Count | Percentage |
|-------|-------|-----------|
| swipe_id | 15/122* | 12% (107 files have NO swipe_id) |
| configuration | 63/122 | 52% |
| **rsf_framework** | **4/122** | **3%** |
| rsf_analysis | 46/122 | 38% |
| components | 98/122 | 80% |
| metadata | 94/122 | 77% |
| schema_analysis | 3/122 | 2% |
| narrative_reorg | 3/122 | 2% |
| temporal_analysis | 14/122 | 11% |

*Many files use `metadata.title` or filename as identifier instead of `swipe_id` field

**Key Issues:**
- **21 distinct key patterns** — highly inconsistent schema
- Only 4/122 have `rsf_framework` (the correct key)
- 107/122 missing `swipe_id` at top level
- 59/122 missing `configuration`
- 119/122 missing `schema_analysis`
- 119/122 missing `narrative_reorganization`
- Multiple sub-variants: some have `configuration_scores` instead of `configuration`, some have `rsf_analysis` under different names
- Avg file size only 22.5 KB — significantly thinner content than batch_01-06

**Remediation:** Most significant work required. Each file needs:
1. Add/standardize `swipe_id`
2. Add `configuration` (or normalize from `configuration_scores`)
3. Add `rsf_framework`
4. Add `components` wrapper where missing
5. Add `schema_analysis`, `narrative_reorganization`, `temporal_analysis`
6. Content enrichment where files are <15 KB

---

### Group C: arsenal_batch_01 and arsenal_batch_02 (27 files)

| Field | arsenal_01 (15) | arsenal_02 (12) |
|-------|----------------|----------------|
| swipe_id | 15/15 | 12/12 |
| configuration | 15/15 | 12/12 |
| **rsf_framework** | **0/15** | **0/12** |
| rsf_analysis | 15/15 | 12/12 |
| **components** | **0/15** | **0/12** |
| metadata | 15/15 | 12/12 |
| schema_analysis | 0/15 | 0/12 |
| narrative_reorg | 0/15 | 0/12 |
| temporal_analysis | 15/15 | 12/12 |

**Key Issues:**
- NO `components` wrapper — headline, lead, mechanism, etc. are at top level
- NO `rsf_framework`
- Has `rsf_analysis` (old key)
- Missing `schema_analysis` and `narrative_reorganization`
- Has unique keys: `copywriting_techniques`, `extraction_quality`, `copywriting_analysis`
- Avg file size 17-18 KB — moderate content

**Remediation:**
1. Wrap headline/lead/mechanism/etc into `components` object
2. Add `rsf_framework` from `rsf_analysis`
3. Add `schema_analysis`, `narrative_reorganization`
4. Preserve unique useful keys (`copywriting_techniques`)

---

### Group D: arsenal_batch_03 (77 files)

| Field | Count | Percentage |
|-------|-------|-----------|
| swipe_id | 77/77 | 100% |
| configuration | 0/77 | 0% |
| **rsf_framework** | **0/77** | **0%** |
| rsf_analysis | 0/77 | 0% |
| **rsf_fields** | **77/77** | **100% (WRONG KEY)** |
| components | 0/77 | 0% |
| metadata | 0/77 | 0% |
| schema_analysis | 0/77 | 0% |
| narrative_reorg | 0/77 | 0% |
| temporal_analysis | 0/77 | 0% |

**Key Issues:**
- **COMPLETELY DIFFERENT SCHEMA** — flat structure with `rsf_fields` (wrong key)
- Uses `classification`, `headline_analysis`, `lead_content`, `mechanism`, `body_content`
- Has `arsenal_rating` (unique)
- No `configuration`, no `components`, no `metadata`
- Avg file size only 9.3 KB — **LIGHTWEIGHT stubs**, not full extractions
- Missing most V3 required sections

**Remediation:** These files are too thin to remediate in-place. They need **full re-extraction** from source markdown files. However, the original Arsenal source files in `Unused Copy Processes/BigIdeaEngine/Data/Cleaned_Swipe_File/107 GREATEST Ads/` have been deleted (per git status). If source files are unrecoverable, these 77 files need maximum enrichment from their existing content.

---

## Remediation Summary

| Group | Files | Effort Level | Key Actions |
|-------|-------|-------------|-------------|
| **A** (batch_01-06) | 167 | Low | Add `rsf_framework`, normalize ~8 outliers |
| **B** (batch_new_v3) | 122 | High | Add swipe_id, configuration, rsf_framework, schema/narrative/temporal fields, enrich thin files |
| **C** (arsenal_01-02) | 27 | Medium | Wrap into `components`, add rsf_framework, add schema/narrative fields |
| **D** (arsenal_03) | 77 | High | Major enrichment needed — restructure, add all missing V3 sections |

### Priority Order
1. **Group A** first (167 files, lowest effort, highest ROI)
2. **Group C** second (27 files, moderate effort)
3. **Group B** third (122 files, high effort but many are salvageable)
4. **Group D** last (77 files, requires most work per file)

---

## V3 Canonical Target Structure

Every file after remediation MUST have this structure:

```json
{
  "swipe_id": "string",
  "configuration": {
    "elements": [...],    // 7 elements, scored 0-10
    "drivers": [...],     // 9 drivers, scored 0-10
    "structures": [...]   // 8 structures, scored 0-10
  },
  "rsf_framework": {
    "relatable_problem": {...},
    "specific_solution": {...},
    "freedom_promise": {...}
  },
  "components": {
    "headline": {...},
    "lead": {...},
    "promise_architecture": {...},
    "root_cause_architecture": {...},
    "mechanism": {...},
    "proof_inventory": {...},
    "story_architecture": {...},
    "narrative_flow": {...},
    "offer": {...},
    "close": {...}
  },
  "metadata": {...},
  "rsf_analysis": {...},
  "schema_analysis": {...},
  "narrative_reorganization": {...},
  "temporal_analysis": {...}
}
```
