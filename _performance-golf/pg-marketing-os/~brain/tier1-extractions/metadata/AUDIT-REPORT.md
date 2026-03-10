# TIER1 Extraction Audit Report

**Generated:** 2026-02-21
**Purpose:** Definitive inventory of all TIER1 extraction files with deduplication analysis

---

## Executive Summary

| Metric | Count |
|--------|-------|
| **Total JSON files across all batches** | 394 |
| **Unique filenames** | 393 |
| **Cross-batch file duplicates** | 1 |
| **Internal ID duplicates (same ad, diff files)** | 1 |
| **Total unique extractions** | 392 |
| **Gap to 400 target** | 8 |

---

## Per-Batch Inventory

| Batch | Files | Avg Size | Min Size | Max Size | Schema Type |
|-------|-------|----------|----------|----------|-------------|
| batch_01 | 20 | 48.3 KB | 30.8 KB | 69.1 KB | Canonical V3 (rsf_analysis) |
| batch_02 | 49 | 44.3 KB | 23.3 KB | 96.0 KB | Canonical V3 (rsf_analysis) |
| batch_03 | 50 | 61.5 KB | 50.5 KB | 97.4 KB | Canonical V3 (rsf_analysis) |
| batch_04 | 13 | 60.3 KB | 48.5 KB | 74.6 KB | Canonical V3 (rsf_analysis) |
| batch_05 | 12 | 58.3 KB | 40.1 KB | 76.3 KB | Canonical V3 (rsf_analysis) |
| batch_06 | 23 | 75.8 KB | 46.0 KB | 96.5 KB | Canonical V3 (rsf_analysis) |
| batch_07 | 0 | — | — | — | Empty (1 .md report only) |
| batch_new_v3 | 122 | 22.5 KB | 7.4 KB | 63.4 KB | Mixed (21 distinct key patterns) |
| arsenal_batch_01 | 15 | 17.4 KB | 13.3 KB | 19.8 KB | Near-Canonical (no components wrapper) |
| arsenal_batch_02 | 12 | 18.0 KB | 14.3 KB | 21.5 KB | Near-Canonical (no components wrapper) |
| arsenal_batch_03 | 77 | 9.3 KB | 6.9 KB | 12.9 KB | Lightweight (rsf_fields, flat) |
| **TOTAL** | **394** | **34.0 KB** | **6.9 KB** | **97.4 KB** | **3+ schema variants** |

---

## Duplicates

### Cross-Batch File Duplicate (1)
| Filename | Locations | Resolution |
|----------|-----------|------------|
| `arsenal_urivarx_bladdercontrol_diapers_001.json` | arsenal_batch_02 (17.3KB), arsenal_batch_03 (9.5KB) | **Keep arsenal_batch_02 version** (larger, better schema) |

### Internal ID Duplicate (1)
| Internal swipe_id | Files | Resolution |
|-------------------|-------|------------|
| `creme_bottomline_nursinghomeescape_garynull_001` | batch_03/nursinghomeescape_garynull_v3.json (58.2KB), batch_03/nursinghomeescape_magalog_v3.json (57.1KB) | **Keep garynull version** (larger, more specific name) |

---

## File Size Distribution

| Range | Count | Notes |
|-------|-------|-------|
| < 10 KB | 62 | Almost all from arsenal_batch_03 — need full re-extraction |
| 10–20 KB | 94 | arsenal_batch_01-02 + some batch_new_v3 |
| 20–30 KB | 37 | Mostly batch_new_v3 |
| 30–40 KB | 37 | Mixed |
| 40–50 KB | 51 | batch_01-04 |
| > 50 KB | 112 | batch_03-06 (highest quality) |

---

## Source List Cross-Reference

### Revised File List (256 entries)
- **Source file location:** `_metadata/tier1_revised_filelist.txt`
- **Status:** References **deleted** source files (PremiumSwipeVault 2/Processed/ — removed from git)
- All 18 .md source files (Missing Swipes) are deleted from disk
- All 113 unmatched .json source files are deleted from disk
- **Conclusion:** The revised file list is OUTDATED. The extraction batches ARE the current source of truth.

### Naming Mismatch Analysis
The revised list and extraction batches use different naming conventions:
- Revised: `creme_wright_fdaraidedcures_magalog_001` → Extraction: `wright_fdaraidedcures_v3`
- Revised: `arsenal_aloecure_acidreflux_advertorial_001` → Extraction: `arsenal_aloecure_confessions_acidreflux_001`
- Many internal `swipe_id` fields DO match revised list entries (125/256 confirmed)

---

## Gap to 400

**Current unique: 392 | Target: 400 | Gap: 8**

### Sources for 8 New Extractions
The vault contains 4,292+ raw markdown files. Priority sources:
1. High-quality ads from `PremiumSwipeVault 2/` that weren't re-extracted
2. Golf VSL transcripts (if source .md files can be located elsewhere)
3. Additional health/finance controls from the vault's raw collections
4. Golden Hippo VSLs (4 already extracted, more exist)

### Note on Revised List Gaps
The 131 "gaps" between the revised list and extraction batches are primarily:
- **Naming mismatches** (same ad, different filename convention)
- **Deleted source files** (original processed JSONs removed)
- NOT truly missing extractions in most cases

---

## Recommendations

1. **Remove 2 duplicates** → reduces from 394 to 392 unique files
2. **Extract 8 new files** from vault raw markdown → reaches 400
3. **Standardize all 400 to V3 schema** (see SCHEMA-COMPLIANCE-REPORT.md)
4. **Add vertical classification** to all files
5. **Merge into final_merged/** with standardized filenames
6. **Update revised file list** to reflect actual extraction inventory
