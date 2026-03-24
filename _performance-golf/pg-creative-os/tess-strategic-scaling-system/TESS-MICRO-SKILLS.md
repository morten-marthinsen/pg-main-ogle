# Tess - Strategic Scaling System Intelligence - Micro-Skills Definition

> **Document Version**: 1.2
> **Last Updated**: 2026-02-03
> **Owner**: Christopher Ogle
> **Status**: APPROVED
> **Companion Document**: [TESS-PRD.md](./TESS-PRD.md)
> **Identity**: I'm Tess — Version 3.0, the Black Merc EQS

---

## Overview

This document defines the micro-skills (modular, single-purpose functions) that power Tess. Each skill is designed to be:
- **Atomic**: Does one thing well
- **Testable**: Clear inputs, outputs, and success criteria
- **Composable**: Can be chained together in the Master Agent workflow

### Skill Count by Layer

| Layer | Name | Skill Count | Scope |
|-------|------|-------------|-------|
| 0 | Core Infrastructure | 3 | State, parsing, error handling |
| 1 | Data Ingestion | 3 | CSV intake, deduplication, validation |
| 2 | Processing | 3 | Aggregation, classification, metrics |
| 3 | Views & Analysis | 2 | View generation, comparisons |
| 4 | Recommendations (v2+) | 2 | Suggestions, alerts |
| 5 | Angle Mining (v2+) | 2 | Transcript analysis, Iconik tagging |
| **Total** | | **15** | |

---

## Layer 0: Core Infrastructure

These skills provide foundational capabilities used by all other layers.

---

### Skill 0.1: `state-manager`

**Purpose**: Track processing state, enable checkpointing, and support resume capability.

**Inputs**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `action` | enum | Yes | `get`, `set`, `checkpoint`, `resume` |
| `key` | string | Conditional | State key (required for `get`/`set`) |
| `value` | any | Conditional | State value (required for `set`) |

**Outputs**:
```yaml
state:
  last_processed_row: 14885
  last_import_date: "2026-01-21"
  processing_status: "complete"
  errors: []
  checkpoint_id: "sss-20260125-001"
```

**Success Criteria**:
- [ ] State persists between sessions
- [ ] Checkpoint can be created after any skill completion
- [ ] Resume from checkpoint restores full processing state

**Error Handling**:
| Error | Behavior |
|-------|----------|
| State file not found | Create new state with defaults |
| Corrupted state file | Log error, create new state, preserve backup |

**Dependencies**: None (base skill)

---

### Skill 0.2: `naming-parser`

**Purpose**: Parse a 14-position Asset ID into its component fields.

**Inputs**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset_id` | string | Yes | Full Asset ID string |
| `strict_mode` | boolean | No | If true, fail on any parse error. Default: false |

**Outputs**:
```yaml
parsed:
  funnel: "357"
  root_angle_id: "0003"
  variation_id: "v0029"
  platform: "fb"
  dimensions: "9x16"
  length_tier: "180s"
  ad_category: "nn"
  expansion_type: "xx"
  asset_type: "sad"
  talent_code: "haha"
  editor_initials: "ca"
  copywriter_initials: "co"
  creation_date: "20251201"
  promo_name: null
  is_scaling: false  # true if -sca suffix detected
  parse_status: "SUCCESS"
  parse_errors: []
```

**Parsing Rules**:

1. **Delimiter**: Split by `-` (hyphen)
2. **Position Count**: Expect 13-14 positions (14th is optional promo)
3. **Scaling Detection**: If any segment after position 13 equals `sca`, set `is_scaling: true`
4. **Deduplication Key**: Positions 1-13 only (exclude promo and -sca suffix)

**Validation Rules** (from naming convention doc):

| Position | Field | Validation |
|----------|-------|------------|
| 1 | Funnel | Non-empty string |
| 2 | RootAngleID | Matches pattern: `\d{4}`, `i\d{3}`, or `h\d{3,4}` |
| 3 | VariationID | Matches pattern: `v\d{4}` |
| 4 | Platform | One of: `fb`, `yt`, `xx` |
| 5 | Dimensions | Matches pattern: `\d+x\d+` |
| 6 | LengthTier | One of: `30s`, `60s`, `180s`, `360s`, `360s+`, `xx` |
| 7 | AdCategory | One of: `nn`, `exv`, `exh`, `nnmu`, `prm`, `evg` (legacy accepted: `ver`, `hor`) |
| 8 | ExpansionType | One of: `hs`, `hr`, `ssr`, `dur`, `env`, `sp`, `dp`, `af`, `cf`, `xx` |
| 9 | AssetType | One of: `pod`, `tlr`, `sad`, `bvo`, `avo` |
| 10 | TalentCode | 4-character string (lookup against talent table; `mult` = 3+ talent actors) |
| 11 | EditorInitials | 2-character string (lookup against editor table) |
| 12 | CopywriterInitials | 2-character string (lookup against copywriter table) |
| 13 | CreationDate | Matches pattern: `\d{8}` (YYYYMMDD) |
| 14 | PromoName | Optional: `bfcm`, `xmas`, or empty |

**Business Logic Validation**:

| Rule | Condition | Action |
|------|-----------|--------|
| Net New requires xx expansion | AdCategory = `nn` AND ExpansionType != `xx` | Flag as `LOGIC_ERROR` |
| Mashup requires xx expansion | AdCategory = `nnmu` AND ExpansionType != `xx` | Flag as `LOGIC_ERROR` |
| Promo requires xx expansion | AdCategory = `prm` AND ExpansionType != `xx` | Flag as `LOGIC_ERROR` |
| Evergreen requires xx expansion | AdCategory = `evg` AND ExpansionType != `xx` | Flag as `LOGIC_ERROR` |
| Promo requires promo code | AdCategory = `prm` AND PromoName is empty | Flag as `LOGIC_ERROR` |
| Evergreen forbids promo code | AdCategory = `evg` AND PromoName is not empty | Flag as `LOGIC_ERROR` |
| Images use xx for platform/length | RootAngleID starts with `i` or `h` AND (Platform != `xx` OR LengthTier != `xx`) | Flag as `LOGIC_ERROR` |

**Success Criteria**:
- [ ] 100% of valid naming conventions parse correctly
- [ ] Malformed names return `parse_status: "ERROR"` with specific error messages
- [ ] `-sca` suffix is correctly detected and stripped from dedup key

**Error Handling**:
| Error | Behavior |
|-------|----------|
| Wrong segment count | Return `parse_status: "ERROR"`, populate `parse_errors` |
| Invalid code value | Return field as-is, add to `parse_errors`, continue parsing other fields |
| Missing required field | Return `parse_status: "ERROR"`, identify missing position |

**Dependencies**: None (base skill)

---

### Skill 0.3: `error-handler`

**Purpose**: Centralized error handling with consistent flagging and logging.

**Inputs**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `error_type` | enum | Yes | `PARSE_ERROR`, `DATA_ERROR`, `LOGIC_ERROR`, `SYSTEM_ERROR` |
| `source` | string | Yes | Which skill/row generated the error |
| `message` | string | Yes | Human-readable error description |
| `context` | object | No | Additional context (row data, asset_id, etc.) |
| `severity` | enum | No | `warning`, `error`, `critical`. Default: `error` |

**Outputs**:
```yaml
error_logged:
  id: "err-20260125-0001"
  timestamp: "2026-01-25T14:30:00Z"
  type: "PARSE_ERROR"
  source: "naming-parser"
  message: "Invalid AdCategory code 'abc'"
  context:
    asset_id: "357-0003-v0029-fb-9x16-180s-abc-xx-sad-haha-ca-co-20251201"
    row_number: 1042
  severity: "error"
  action_taken: "Flagged row with ERROR status"
```

**Error Aggregation**:
- Errors are collected throughout processing
- Summary provided at end of each run
- Error patterns identified (e.g., "23 rows have invalid AdCategory")

**Success Criteria**:
- [ ] All errors are logged with consistent structure
- [ ] Errors are queryable by type, source, and severity
- [ ] Error summary is generated after each processing run

**Dependencies**: `state-manager` (for persistence)

---

## Layer 1: Data Ingestion

These skills handle the intake of raw data from CSV exports.

---

### Skill 1.1: `csv-ingester`

**Purpose**: Read and validate weekly CSV exports from Domo.

**Inputs**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_path` | string | Yes | Path to CSV file |
| `expected_columns` | array | No | Column names to validate against |
| `skip_header` | boolean | No | Skip first row. Default: true |

**Expected CSV Structure**:
| Column | Description | Required |
|--------|-------------|----------|
| `Ad Name` | Full Asset ID string | Yes |
| `Spend` | Total spend in USD | Yes |
| `Net Revenue` | Net revenue in USD | Yes |
| `Trials` | Trial count | No |
| `Impressions` | Impression count | No |
| `Clicks` | Click count | No |
| `Date` | Date of data (for daily rows) | Yes |

**Outputs**:
```yaml
ingestion_result:
  rows_read: 1500
  rows_valid: 1487
  rows_invalid: 13
  columns_found: ["Ad Name", "Spend", "Net Revenue", "Trials", "Date"]
  columns_missing: []
  data: [...]  # Array of row objects
  invalid_rows: [...]  # Array of problematic rows with error details
```

**Success Criteria**:
- [ ] CSV file is read without encoding errors
- [ ] Required columns are present
- [ ] Numeric fields are correctly typed
- [ ] Invalid rows are flagged but do not halt processing

**Error Handling**:
| Error | Behavior |
|-------|----------|
| File not found | Return error, halt processing |
| Missing required column | Return error, halt processing |
| Malformed row | Log error, skip row, continue |
| Non-numeric in numeric field | Treat as 0, log warning |

**Dependencies**: `error-handler`

---

### Skill 1.2: `deduplicator`

**Purpose**: Identify and merge duplicate Asset IDs from scaling campaigns.

**Inputs**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | array | Yes | Array of row objects from `csv-ingester` |
| `key_field` | string | No | Field to use for deduplication. Default: `Ad Name` |

**Deduplication Logic**:

1. **Parse each Asset ID** using `naming-parser`
2. **Extract dedup key**: Positions 1-13 only (ignore `-sca` and promo)
3. **Group rows** by dedup key
4. **Aggregate metrics** for each group

**Aggregation Rules** (from PRD Section 3.3):
| Metric | Aggregation |
|--------|-------------|
| Spend | SUM |
| Net Revenue | SUM |
| Trials | SUM |
| Impressions | SUM |
| Clicks | SUM |
| Days Active | COUNT DISTINCT dates |

**Outputs**:
```yaml
dedup_result:
  original_row_count: 1500
  deduplicated_row_count: 1200
  duplicates_merged: 300
  scaling_variants_found: 150
  data: [...]  # Array of deduplicated row objects
```

**Success Criteria**:
- [ ] Same Asset ID with and without `-sca` merges correctly
- [ ] Aggregated spend matches sum of raw spend
- [ ] No data loss during deduplication

**Dependencies**: `naming-parser`, `error-handler`

---

### Skill 1.3: `data-validator`

**Purpose**: Ensure data integrity before processing.

**Inputs**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | array | Yes | Array of row objects |
| `existing_data` | array | No | Existing data in system (for duplicate detection) |

**Validation Checks**:

| Check | Description | Action on Fail |
|-------|-------------|----------------|
| **No duplicate Asset ID + Date** | Same asset can't have two rows for same date | Flag second occurrence |
| **Spend is non-negative** | Spend >= 0 | Flag row as ERROR |
| **Date is valid** | Date follows expected format | Flag row as ERROR |
| **Asset ID is parseable** | Asset ID follows naming convention | Flag but include in totals |

**Outputs**:
```yaml
validation_result:
  total_rows: 1200
  valid_rows: 1195
  flagged_rows: 5
  flags:
    - row_id: 1042
      asset_id: "..."
      issue: "Duplicate Asset ID + Date"
      severity: "error"
    - row_id: 1087
      asset_id: "..."
      issue: "Negative spend value"
      severity: "error"
  data: [...]  # Rows with validation status added
```

**Success Criteria**:
- [ ] No duplicate Asset ID + Date combinations pass validation
- [ ] All flagged rows have clear error descriptions
- [ ] Valid rows proceed to processing unchanged

**Dependencies**: `error-handler`

---

## Layer 2: Processing

These skills transform validated data into analyzed output.

---

### Skill 2.1: `aggregator`

**Purpose**: Sum metrics by Asset ID across all time.

**Inputs**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `new_data` | array | Yes | New data to aggregate |
| `existing_aggregates` | array | No | Existing aggregated data to update |

**Aggregation Logic**:

1. **For each unique Asset ID** (dedup key):
   - Sum: Spend, Net Revenue, Trials, Impressions, Clicks
   - Count: Unique dates (Days Active)
   - Calculate: Net ROAS = Net Revenue / Spend

2. **Update existing aggregates**:
   - Add new metrics to existing totals
   - Recalculate derived metrics

**Outputs**:
```yaml
aggregation_result:
  assets_processed: 1200
  assets_new: 200
  assets_updated: 1000
  data:
    - asset_id: "357-0003-v0029-fb-9x16-180s-nn-xx-sad-haha-ca-co-20251201"
      total_spend: 5432.50
      net_revenue: 6520.00
      net_roas: 1.20
      trials: 42
      days_active: 14
      first_seen: "2026-01-07"
      last_seen: "2026-01-21"
```

**Success Criteria**:
- [ ] Aggregated spend matches sum of raw daily spend
- [ ] Net ROAS is calculated correctly (handles $0 spend edge case)
- [ ] Historical aggregates are preserved when adding new data

**Error Handling**:
| Error | Behavior |
|-------|----------|
| Spend = 0 | Set ROAS to 0, log warning |
| Negative spend after aggregation | Flag as ERROR, investigate source |

**Dependencies**: `error-handler`, `state-manager`

---

### Skill 2.2: `classifier`

**Purpose**: Apply Winner/Potential/Underperformer/Testing classification.

**Inputs**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | array | Yes | Aggregated data with ROAS and spend |
| `min_spend` | number | No | Minimum spend threshold. Default: 2500 |
| `min_roas` | number | No | Minimum ROAS for Winner. Default: 1.0 |

**Classification Rules** (from PRD Section 2.2, updated Session 081):

| Classification | Criteria | Color Code |
|----------------|----------|------------|
| **Winner** | Net ROAS >= 1.0 AND Spend >= $2,500 | Green |
| **Potential** | Net ROAS 0.8-0.99 AND Spend >= $2,500 | Blue |
| **Underperformer** | Net ROAS <= 0.79 AND Spend >= $2,500 | Red |
| **Testing** | Spend < $2,500 (any ROAS) | Gray |

**Outputs**:
```yaml
classification_result:
  total_assets: 1200
  breakdown:
    winner: 145
    potential: 320
    underperformer: 185
    testing: 550
  data:
    - asset_id: "..."
      classification: "winner"
      roas: 1.20
      spend: 5432.50
      eligible_for_expansion: true
```

**Success Criteria**:
- [ ] 100% of assets are classified
- [ ] Classification matches PRD rules exactly
- [ ] Winners are flagged as eligible for expansion consideration

**Error Handling**:
| Error | Behavior |
|-------|----------|
| Missing ROAS value | Classify as "Testing" (insufficient data), log warning |
| Missing Spend value | Flag as ERROR, skip classification, log error |
| ROAS is negative | Flag as DATA_ERROR, classify as "Underperformer", log error |
| ROAS exceeds sanity limit (>10.0) | Flag as DATA_ERROR with warning "Unusually high ROAS - verify data", proceed with classification |
| Spend exceeds sanity limit (>$500,000) | Flag with warning "Unusually high spend - verify aggregation", proceed with classification |

**Dependencies**: None

---

### Skill 2.3: `metric-calculator`

**Purpose**: Calculate derived metrics beyond basic aggregation.

**Inputs**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | array | Yes | Aggregated data |

**Calculated Metrics**:

| Metric | Formula | Description |
|--------|---------|-------------|
| Net ROAS | Net Revenue / Spend | Primary KPI |
| CPA | Spend / Trials | Cost per acquisition |
| CTR | Clicks / Impressions | Click-through rate |
| CPM | (Spend / Impressions) * 1000 | Cost per 1000 impressions |
| Days Active | Count of unique dates | Testing duration |
| Avg Daily Spend | Total Spend / Days Active | Spend velocity |

**Outputs**:
```yaml
metrics_result:
  assets_calculated: 1200
  data:
    - asset_id: "..."
      net_roas: 1.20
      cpa: 129.35
      ctr: 0.023
      cpm: 18.50
      days_active: 14
      avg_daily_spend: 388.04
```

**Edge Case Handling**:
| Condition | Behavior |
|-----------|----------|
| Spend = 0 | ROAS = 0, CPA = null |
| Impressions = 0 | CTR = null, CPM = null |
| Trials = 0 | CPA = null |
| Days Active = 0 | Avg Daily Spend = null |

**Success Criteria**:
- [ ] All metrics calculate without divide-by-zero errors
- [ ] Null values are used for undefined metrics (not 0)
- [ ] Metrics match manual calculations on sample data

**Dependencies**: None

---

## Layer 3: Views & Analysis

These skills generate the output views defined in the PRD.

---

### Skill 3.1: `view-generator`

**Purpose**: Generate the Ad Level Tracking view with all parsed fields.

**Inputs**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | array | Yes | Fully processed data |
| `lookups` | object | No | Lookup tables for talent, editor, copywriter names |

**Output Columns** (from PRD Section 4.1):

| Column | Source |
|--------|--------|
| Asset ID | Full naming string |
| Funnel | Parsed position 1 |
| RootAngleID | Parsed position 2 |
| Platform | Parsed position 4 |
| Dimensions | Parsed position 5 |
| LengthTier | Parsed position 6 |
| AdCategory | Parsed position 7 |
| ExpansionType | Parsed position 8 |
| AssetType | Parsed position 9 |
| Talent | Parsed position 10 → lookup to full name |
| Editor | Parsed position 11 → lookup to full name |
| Copywriter | Parsed position 12 → lookup to full name |
| Creation Date | Parsed position 13 |
| Days Active | Calculated |
| Total Spend | Aggregated |
| Net Revenue | Aggregated |
| Net ROAS | Calculated |
| Classification | From classifier |
| Status | Active / Paused / ERROR |

**Lookup Tables**:

| Code | Full Name | Table |
|------|-----------|-------|
| `haha` | Hank Haney | Talent (333 entries) |
| `ca` | Clevin Alcantara | Editors (13 entries) |
| `co` | Christopher Ogle | Copywriters (6 entries) |

**Outputs**:
```yaml
view_result:
  view_name: "Ad Level Tracking"
  row_count: 1200
  columns: [...]
  data: [...]
  errors:
    - asset_id: "..."
      status: "ERROR"
      reason: "Unparseable naming convention"
```

**Success Criteria**:
- [ ] All 18 columns are populated
- [ ] Lookup codes resolve to full names
- [ ] ERROR status rows are included but flagged
- [ ] View is sortable by any column

**Dependencies**: `naming-parser`, `classifier`, `metric-calculator`

---

### Skill 3.2: `comparison-analyzer`

**Purpose**: Generate aggregated comparison views by dimension.

**Inputs**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | array | Yes | Fully processed data |
| `dimension` | enum | Yes | `expansion_type`, `asset_type`, `ad_category`, `editor`, `copywriter`, `talent`, `funnel` |
| `min_spend` | number | No | Minimum spend for inclusion. Default: 0 |

**Comparison Views** (from PRD Section 4.2):

#### By Expansion Type
| ExpansionType | Total Spend | Avg Net ROAS | Asset Count | Winners |
|---------------|-------------|--------------|-------------|---------|

#### By Asset Type
| AssetType | Total Spend | Avg Net ROAS | Asset Count | Winners |
|-----------|-------------|--------------|-------------|---------|

#### By Ad Category
| AdCategory | Total Spend | Avg Net ROAS | Asset Count | Winners |
|------------|-------------|--------------|-------------|---------|

#### By Team Member (Editor, Copywriter, Talent)
| Name | Total Spend | Avg Net ROAS | Asset Count | Winners |
|------|-------------|--------------|-------------|---------|

#### By Funnel
| Funnel | Total Spend | Avg Net ROAS | Asset Count | Winners |
|--------|-------------|--------------|-------------|---------|

**Aggregation Logic**:

1. Group data by selected dimension
2. For each group:
   - Sum: Total Spend
   - Average: Net ROAS (**weighted by spend**)
     - Formula: `Σ(Spend × ROAS) / Σ(Spend)` for each group
     - Rationale: Weighted average gives more importance to high-spend assets, better reflecting actual portfolio performance. An asset with $100K spend at 1.2 ROAS has more business impact than an asset with $100 spend at 0.8 ROAS.
   - Count: Total assets
   - Count: Winners (classification = "winner")
   - Calculate: Win Rate = Winners / Total Assets

**Outputs**:
```yaml
comparison_result:
  dimension: "expansion_type"
  groups:
    - value: "hs"
      display_name: "Hook Stack"
      total_spend: 125000.00
      avg_roas: 1.15
      asset_count: 145
      winner_count: 42
      winner_rate: 0.29
    - value: "ssr"
      display_name: "Scroll Stopper Refresh"
      total_spend: 98000.00
      avg_roas: 0.95
      asset_count: 120
      winner_count: 28
      winner_rate: 0.23
```

**Success Criteria**:
- [ ] All dimensions generate valid comparison views
- [ ] Totals match Ad Level Tracking when summed
- [ ] Winner counts match classification results

**Error Handling**:
| Error | Behavior |
|-------|----------|
| Unknown dimension value (e.g., unrecognized expansion type code) | Create "[UNKNOWN: xx]" group, log warning, continue processing |
| Empty group (dimension has no assets) | Exclude from view, log info message |
| Division by zero in Win Rate calculation | Set Win Rate to 0, log warning |
| Total spend mismatch with source data | Log as LOGIC_ERROR, halt generation, require investigation |
| Winner count exceeds asset count | Log as LOGIC_ERROR, halt generation (indicates bug in classifier) |
| Missing classification on input asset | Skip asset in comparison views, log error, include spend in "Unclassified" row |

**Dependencies**: `classifier`

---

## Layer 4: Recommendations (v2+)

These skills are planned for v2 after proving v1 concept.

---

### Skill 4.1: `recommendation-engine` (v2)

**Purpose**: Suggest next tests based on historical performance patterns.

**Inputs**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `performance_data` | array | Yes | Historical comparison data |
| `asset` | object | Yes | Asset to recommend expansion for |

**Recommendation Logic**:

1. Identify which expansion types have highest winner rate for this asset type
2. Check which expansion types this asset has NOT tried yet
3. Rank untried expansions by historical success rate
4. Return top 3 recommendations

**Example Output**:
```yaml
recommendations:
  asset_id: "357-0003-v0029-fb-9x16-180s-nn-xx-sad-haha-ca-co-20251201"
  current_classification: "winner"
  suggested_expansions:
    - type: "hs"
      reason: "Hook Stack has 42% winner rate for Slice & Dice assets"
      historical_roas: 1.25
      confidence: "high"
    - type: "dur"
      reason: "Duration tests have 35% winner rate for 180s assets"
      historical_roas: 1.18
      confidence: "medium"
```

**Status**: NOT_STARTED (v2 scope)

---

### Skill 4.2: `threshold-alerter` (v2)

**Purpose**: Generate alerts when assets cross key thresholds.

**Alert Types**:

| Alert | Trigger | Action |
|-------|---------|--------|
| **Spend Threshold** | Asset crosses $2,500 spend | Notify for classification review |
| **Winner Decay** | Winner's ROAS drops below 1.0 | Flag for review |
| **New Winner** | Asset classified as Winner for first time | Add to weekly summary |
| **High Velocity** | Asset spending >$500/day | Flag for monitoring |

**Status**: NOT_STARTED (v2 scope)

---

## Layer 5: Angle Mining (v2+)

These skills support the Root Angle Principle by identifying new angles from winning ad transcripts.

---

### Skill 5.1: `angle-miner`

**Purpose**: Identify potential new root angles from Iconik transcripts of Winner-classified assets.

**Inputs**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset_id` | string | Yes | Asset ID of the Winner to analyze |
| `transcript` | string | Yes | Full transcript text from Iconik |
| `root_angle` | string | No | Existing Root Angle Name for this Root Angle ID (from Column C) |
| `mode` | enum | No | `discover` (find new angles) or `validate` (check if expansion preserves root angle). Default: `discover` |

**Process**:

1. **Transcript Acquisition**:
   - Verify asset is classified as Winner (or >$5K spend for backfill)
   - Check if Iconik transcript exists
   - If no transcript → trigger transcription job via Iconik API, wait for completion
   - Retrieve raw transcript with speaker labels + timestamps

2. **Root Angle Lookup**:
   - Read Column C for this Root Angle ID
   - If Root Angle exists → use as comparison baseline
   - If missing (legacy) → flag for operator to assign first

3. **Angle Identification**:
   - Read full transcript
   - Identify distinct persuasive theses in actual language
   - Map against Root Angle Name
   - CRITICAL: Every angle must be traceable to specific transcript text
   - Angles MUST come from the actual words — never invented

4. **Naming**:
   - Generate 1-5 Root Angle Name suggestions per angle
   - Each suggestion: 1-4 words
   - Drawn from transcript language whenever possible

**Outputs**:
```yaml
angle_mining_result:
  asset_id: "357-0003-v0029-fb-9x16-180s-nn-xx-sad-gamc-ca-co-20251201"
  classification: "winner"
  root_angle: "Power Coil"
  transcript_length: 2847  # characters
  angles_found:
    - angle: "cheat code for seniors"
      source_phrases:
        - "this is a cheat code for the senior golfer"
        - "it's like having an unfair advantage"
      timestamp_range: "01:23 - 01:45"
      reasoning: "Distinct persuasive thesis — framing the technique as an unfair advantage for a specific demographic, separate from the root angle of 'Power Coil' which focuses on the mechanics"
      name_suggestions:
        - "Cheat Code For Seniors"
        - "Senior Cheat Code"
        - "Unfair Advantage"
      relationship_to_root: "distinct"  # distinct | supporting | same
    - angle: "3 swing types"
      source_phrases:
        - "there's really only three types of swings"
      timestamp_range: "02:10 - 02:25"
      reasoning: "Supporting detail for the root angle, not a standalone thesis"
      name_suggestions: []
      relationship_to_root: "supporting"
  operator_action_required: true
  presentation: |
    Identified 1 potential new angle in 357-0003-v0029:

    1. "Cheat Code For Seniors"
       Source: "this is a cheat code for the senior golfer" (01:23-01:45)
       Why: Distinct thesis — unfair advantage framing for specific demographic
       Suggested names: Cheat Code For Seniors, Senior Cheat Code, Unfair Advantage
```

**Success Criteria**:
- [ ] Only processes Winner-classified assets (or >$5K spend for backfill)
- [ ] Every identified angle traces to specific transcript phrases
- [ ] Root Angle Name suggestions are 1-4 words each
- [ ] Distinguishes between distinct angles, supporting details, and root angle restatements
- [ ] Never invents angles not present in transcript language

**Error Handling**:
| Error | Behavior |
|-------|----------|
| No transcript available | Trigger transcription job, wait, retry |
| Transcript too short (<100 chars) | Log warning, skip — insufficient content |
| No root angle in Column C | Flag for operator to assign root angle first |
| No new angles found | Report "Root angle consistent — no new angles identified" |

**Dependencies**: `classifier` (to verify Winner status), Iconik API (transcript retrieval)

**Status**: NOT_STARTED (v2 scope)

---

### Skill 5.2: `angle-tagger` (Phase 2)

**Purpose**: Write identified angles as time-based comments on Iconik assets for searchable mashup indexing.

**Inputs**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset_id` | string | Yes | Iconik asset ID |
| `angles` | array | Yes | Array of angles with timestamps |
| `tag_type` | enum | No | `new_angle`, `existing_angle`, `not_pursuing`. Default: `new_angle` |

**Process**:
1. For each angle:
   - Write time-based comment at the angle's timestamp in Iconik
   - Include: angle name, source phrase, tag type
   - Apply color coding: green (new confirmed), blue (existing), gray (not pursuing)
2. Comments become searchable across entire Iconik domain

**Use Case**: When building a mashup (`nnmu`) around angle "cheat code", search Iconik → find Tess's comment at the timestamp where a presenter says "this is a cheat code for seniors" → use that specific clip.

**Status**: NOT_STARTED (Phase 2 scope)

**Dependencies**: `angle-miner`, Iconik API (time-based comments)

---

## Skill Dependency Graph

```
Layer 5 (v2+)
  angle-miner ───────────────┐ (reads Iconik transcripts for Winners)
  angle-tagger ──────────────┤ (writes time-based comments to Iconik)
                             │
Layer 4 (v2+)                │
  recommendation-engine ─────┤
  threshold-alerter ─────────┤
                             ▼
Layer 3                 comparison-analyzer
  view-generator ◄───────────┤
       │                     │
       ▼                     │
Layer 2                      │
  classifier ◄───────────────┤
  metric-calculator ◄────────┤
  aggregator ◄───────────────┤
       │                     │
       ▼                     │
Layer 1                      │
  data-validator ◄───────────┤
  deduplicator ◄─────────────┤
  csv-ingester ◄─────────────┘
       │
       ▼
Layer 0
  naming-parser
  error-handler
  state-manager
```

---

## Master Agent Workflow

The Master Agent orchestrates these skills in sequence:

```
1. INGEST
   csv-ingester → deduplicator → data-validator

2. PROCESS
   aggregator → classifier → metric-calculator

3. GENERATE
   view-generator → comparison-analyzer

4. RECOMMEND (v2+)
   recommendation-engine → threshold-alerter

5. MINE ANGLES (v2+)
   angle-miner → angle-tagger (Phase 2)

6. PERSIST
   state-manager (checkpoint)
```

---

## Acceptance Criteria

Each skill must pass before integration:

| Skill | Test | Pass Criteria |
|-------|------|---------------|
| `naming-parser` | Parse 100 sample Asset IDs | 100% accuracy on valid IDs, correct error flagging on invalid |
| `csv-ingester` | Load sample CSV | All rows read, no data loss |
| `deduplicator` | Merge test data with -sca variants | Aggregated spend matches sum of raw |
| `aggregator` | Sum weekly data | Totals match manual calculation |
| `classifier` | Classify sample assets | 100% match to PRD rules |
| `view-generator` | Generate Ad Level Tracking | All 18 columns populated |
| `comparison-analyzer` | Generate all 5 comparison views | Totals match sum of Ad Level Tracking |

---

## Next Steps

1. [ ] Review and approve this micro-skills definition
2. [ ] Build MASTER-AGENT.md (orchestration layer)
3. [ ] Implement skills in priority order (Layer 0 → 1 → 2 → 3)
4. [ ] Run Nate Jones Prompt Architecture Audit on each skill
5. [ ] Integration testing with sample data

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-25 | Christopher Ogle + Claude | Initial micro-skills definition |
| 1.1 | 2026-01-25 | Christopher Ogle + Claude | Added error handling to classifier and comparison-analyzer skills; Resolved TBD on weighted ROAS average (weighted by spend); Added Win Rate to aggregation logic |
| 1.2 | 2026-02-03 | Christopher Ogle + Claude (Veda Session 003) | Added Layer 5: Angle Mining — `angle-miner` (transcript analysis for Winners) and `angle-tagger` (Iconik time-based comments, Phase 2). Updated naming-parser AdCategory validation to accept `exv`/`exh` (with legacy `ver`/`hor`). Fixed classifier thresholds: Potential changed to ROAS 0.8-0.99 AND Spend ≥$2,500 per PRD v1.2. Total skills: 13→15. |

---

*This document defines "what each skill does" for the Strategic Scaling System. The companion MASTER-AGENT.md document will define "how they work together."*
