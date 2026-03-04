
## SECTION 4: ACTIONABLE FILE PATHS

Two output files have been generated in the CopywritingEngine directory:

### 1. tier1_base_246_filelist.txt
- **Count:** 246 files
- **Contents:** Line-separated full paths to all Tier 1 base files
- **Collections:** Crème de la Crème (136) + 107 GREATEST Arsenal (98) + Performance Golf (12)
- **Usage:** Direct input for v3 extraction pipeline

### 2. tier1_gapfills_recommended.txt
- **Count:** 46 files (deduplicated)
- **Contents:** Line-separated full paths to recommended gap fill candidates
- **Categories:**
  - VSL x health: 4 files
  - VSL x financial: 10 files
  - SPEED_PROMISE: 10 files
  - Modern era 2015+: 12 files
  - self_help niche: 15 files
- **Usage:** Review and approve before adding to extraction pipeline

### Combined Tier 1 Total
- **Base Files:** 246
- **Gap Fills:** 46
- **TOTAL TIER 1:** 292 files

### Next Steps
1. Review `tier1_base_246_filelist.txt` - these are already approved
2. Review `tier1_gapfills_recommended.txt` - validate gap fill selections
3. Merge both lists for complete Tier 1 extraction queue
4. Run v3 extraction protocol on final combined list
5. Analyze extraction results to validate gap coverage
