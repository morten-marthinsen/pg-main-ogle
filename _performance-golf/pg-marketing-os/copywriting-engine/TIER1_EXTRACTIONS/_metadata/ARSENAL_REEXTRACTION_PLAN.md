# ARSENAL RE-EXTRACTION PLAN

**Generated:** 2026-01-31
**Issue:** 98 Arsenal swipe files were extracted from abbreviated vault JSON files instead of original source markdown files
**Impact:** Missing verbatim copy content (leads, stories, proof elements, mechanisms)

---

## PROBLEM SUMMARY

The Tier 1 extraction processed Arsenal files from:
- **Wrong source:** `/CopywritingEngine/PremiumSwipeVault 2/Processed/arsenal_*.json` (metadata only)
- **Correct source:** `/Unused Copy Processes/BigIdeaEngine/Data/Cleaned_Swipe_File/107 GREATEST Ads in Alt-Health (Arsenal of Ads) Ranked 1 to 5 Stars 1981-2023/*.md`

### Evidence of Problem
- Vault JSON `lead.full_text` contains descriptions like "First-person narrative confession"
- Original source files contain actual copy: "For 40-Years, I was tortured with unbearable indigestion..."

---

## MAPPING ANALYSIS

| Metric | Count |
|--------|-------|
| Arsenal Vault JSON files | 98 |
| Original Source MD files | 100 |
| High-confidence matches (>=70%) | 33 |
| Medium-confidence matches (50-69%) | 46 |
| Low-confidence matches (<50%) | 19 |
| Source files with NO vault match | 28 |
| Duplicate vault entries (same source) | 24 pairs |

---

## RE-EXTRACTION APPROACH

### Option A: Full Re-extraction (Recommended)
Re-extract all 98 Arsenal files from their correct source markdown files.

**Pros:**
- Ensures complete v3 schema compliance
- Captures all verbatim content
- Maintains consistency

**Cons:**
- Higher token cost
- Requires source file mapping

### Option B: Selective Re-extraction
Only re-extract files where critical v3 fields are missing.

**Pros:**
- Lower token cost
- Faster execution

**Cons:**
- May miss subtle gaps
- Inconsistent data quality

---

## CORRECTED MAPPINGS

### Low-Confidence Corrections Required

| Vault JSON | Correct Source File |
|------------|---------------------|
| arsenal_strivectin_botox_magalog_001.json | Better Than Botox Color 2003-2009 (5 Stars) Metaphor Headline V2.md |
| arsenal_aloecure_confessions_firstperson_001.json | Confessions of an acid reflux victim. 2011-2017 (3 Stars) Blockbuster Product.md |
| arsenal_2016itlist_trendsetting_dps_001.json | 5 Of The Hottest Trendsetting Products For Spring 2016. (4 Stars) Product Line DPS Layout.md |
| arsenal_healthsource_nochiropay_leadgen_001.json | HealthSource No Chiro Insurance 2015-2016 (4 Stars) Professional Practice Lead Gen.md |
| arsenal_rodale_expertsbook_sshhh_001.json | Sshhh 1994-1996 Rodale Classic.md |
| arsenal_lifestylelift_howeasy_beforeafter_001.json | Lifestyle-Lift 2008-2012 (3 Stars) Co got in trouble for fake online reviews.md |
| arsenal_annmorgan_15fatburningfoods_infomarketing_001.json | 15-Fat-Burning-Foods-1992-2004 (4 Stars) Info Marketing Classic.md |
| arsenal_magnilife_kneegel_offer_001.json | Knee-Stiffness-Buy-2-Get-1-Free 2019-2023 (3.5 Stars) Killer Offer.md |
| arsenal_neuroflo_weirdherb_horselegend_001.json | Weird-Herb-Shocks-Doctors 2019-2023 (3 Stars).md |

### Vault Files Without Source Match

| Vault JSON | Issue |
|------------|-------|
| arsenal_jackedup_bigpharmafear_testosterone_001.json | No matching source in Arsenal collection |

---

## UNEXTRACTED SOURCE FILES (28 files)

These source files exist but have no corresponding vault extraction:

1. 5 Of The Hottest Trendsetting Products For Spring 2016. (4 Stars) Product Line DPS Layout.md
2. AloeCure Relief at Last 2012-2015 (3 Stars) Blockbuster Product Company at its apex.md
3. Amazing High-Speed Diet Pill Produces Extremely Fast Weight Loss 2000-2002 (Dangerous Ad written by Halbert).md
4. Amazing Story of Frozen Cosmetics 1981 (2 Stars) Great Concept Company never got off the ground.md
5. Amazing invention to relieve neck and shoulder tension 2012 (2 Stars) Great concept but company never got off the ground.md
6. Americas New Doctor of Digestion Reveals Her Number 1 Secret for 2015 (1 Star) Positioning.md
7. Americas Pharmacist Makes Memory Discovery of a Lifetime 2013-2014 (3 stars) Version 2 Positioning.md
8. Americas Top 5 Anti-Aging Super Solutions 2013-2014 (4 Stars) Product Line DPS.md
9. Better Than Botox Color 2003-2009 (5 Stars) Metaphor Headline V2.md
10. Better Than Botox Color 2003-2009 (5 Stars) Metaphor Headline pdf.md
11. Chiropractor turns pain busting material into Miracle Socks 2012-2014 (3 Stars) Pain Gadget.md
12. Drug Companies fear release 2014-2017 (2.5 Stars).md
13. Erase Age Spots Without Lasers 2008-2011 (3 Stars).md
14. Fibromyalgia 2001-2003 (3 Stars) Company later became MagniLife.md
15. For Dental Implant Treatment its a ClearChoice (3 Stars) Professional Practice Franchise and High Ticket.md
16. Former Dynasty Make-Up Artist Reveals Top Secret Anti-Aging Emollient.md
17. Former Dynasty Make-up Artist 1986-1990 (2 Stars) Proof element of Promoter.md
18. HealthSource No Chiro Insurance 2015-2016 (4 Stars) Professional Practice Lead Gen.md
19. Is Your Smile Hoding You Back 1981-1990 (3 Stars) Lead Gen and Headline.md
20. Knee-Stiffness-Buy-2-Get-1-Free 2019-2023 (3.5 Stars) Killer Offer.md
21. Lifestyle-Lift 2008-2012 (3 Stars) Co got in trouble for fake online reviews.md
22. Miracle Molecule Supercharges Circulation 2012-2015 (2 Stars).pdf.md
23. Naturopath Advertorial Fasting and Canker Sores 2013 (3 Stars) Naturopath Lead Gen.md
24. New FDA Approved Treatment Proven to Relieve Knee Pain 2011-2021 (3.5 Stars) Killer Layout.md
25. PreserVision 2014-2018 (3 Stars) Brilliant Power of Demonstration.md
26. RELIEVE PAIN WITHOUT DANGEROUS DRUGS 2002-2006 (4 Stars) Breakthrough Ad and Product.md
27. Recipes-For-Diabetics 1981-2001 (4 Stars) Breakthrough Ad and Product.md
28. Sshhh 1994-1996 Rodale Classic.md

---

## DUPLICATE VAULT ENTRIES (Same Source)

These vault files point to the same source - likely variations or versions:

| Source File | Vault Files (duplicates) |
|-------------|--------------------------|
| Sales are booming for clinical strength diet pill | arsenal_apatrim_clinicalstrength + arsenal_patenthealth_apatrim_salesbooming |
| Baby Boomers May Now Fear Memory Loss More Than Cancer | arsenal_procera_babyboomers_advertorial + arsenal_procera_babyboomers_memoryfear |
| Confessions of an acid reflux victim | arsenal_aloecure_acidreflux_advertorial + arsenal_aloecure_acidreflux_confessions |
| Product used in Japan for 71 years | arsenal_biotech_painnot_japanesepatch + arsenal_painnot_japan71years_advertorial |
| This New Bladder Control Pill | arsenal_innovus_urivarx_bladdercontrol + arsenal_urivarx_bladdercontrol_advertorial |
| And 19 more duplicate pairs... | (See full mapping JSON) |

**Recommendation:** Keep only one extraction per unique source file, choosing the one with higher confidence score.

---

## EXECUTION PLAN

### Phase 1: Validate Mapping
1. Review this document for accuracy
2. Confirm source file locations are accessible
3. Decide: re-extract all 98 or deduplicated ~74

### Phase 2: Prepare Source Files
1. Create extraction queue with corrected mappings
2. Generate `arsenal_reextraction_queue.txt` with source file paths

### Phase 3: Execute Re-extraction
1. Use V3 schema from `VAULT_V3_SCHEMA.md`
2. Extract from original markdown source files
3. Process in batches of 10-15 files

### Phase 4: Replace Vault Entries
1. Archive old Arsenal vault JSON files
2. Replace with new v3 extractions
3. Update tier1_revised_filelist.txt with new paths

### Phase 5: Regenerate Vault Intelligence
1. Re-run vault intelligence build for affected skills
2. Verify specimen counts and quality

---

## FILES GENERATED

| File | Purpose |
|------|---------|
| `arsenal_source_mapping.json` | Raw mapping with confidence scores |
| `ARSENAL_REEXTRACTION_PLAN.md` | This document |

---

## NEXT STEPS

1. **Review this plan** - Confirm approach and any edge cases
2. **Generate extraction queue** - Corrected source file paths
3. **Schedule re-extraction** - Batch processing with v3 schema
4. **Add RSF fields** - Include RSF dimensions during re-extraction

---

**Source Directory:**
`/Unused Copy Processes/BigIdeaEngine/Data/Cleaned_Swipe_File/107 GREATEST Ads in Alt-Health (Arsenal of Ads) Ranked 1 to 5 Stars 1981-2023/`

**Current Vault Directory:**
`/CopywritingEngine/PremiumSwipeVault 2/Processed/`

**V3 Schema Reference:**
`/CopywritingEngine/VAULT_V3_SCHEMA.md`
