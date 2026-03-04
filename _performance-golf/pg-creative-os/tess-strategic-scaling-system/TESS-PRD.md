# Tess - Strategic Scaling System Intelligence - Product Requirements Document

> **Document Version**: 1.4
> **Last Updated**: 2026-02-04
> **Owner**: Christopher Ogle
> **Status**: APPROVED
> **Identity**: I'm Tess — Version 3.0, the Black Merc EQS

---

## 1. Executive Summary

Tess is the intelligence within the Strategic Scaling System for Performance Golf's advertising operations. She aggregates ad performance data, parses the 14-position Asset ID naming convention, and surfaces actionable insights to guide creative expansion decisions.

**Primary Goal**: Enable data-driven decisions on which ads to expand and how, eliminating guesswork in the creative scaling process.

**Current Scope (v1)**: Decision support and data visualization. Humans make expansion decisions guided by Tess's insights.

**Future Scope (v2+)**: Automated recommendations based on historical performance patterns.

---

## 2. Success Criteria

### 2.1 Primary KPI: Net ROAS

| Metric | Definition | Target |
|--------|------------|--------|
| **Net ROAS** | Net Revenue / Ad Spend | ≥ 1.0 (Breakeven) |

**Note**: Previous target was -$34 net loss per trial. Current target is breakeven.

### 2.2 Asset Classification

| Classification | Criteria | Action |
|----------------|----------|--------|
| **Winner** | Net ROAS ≥ 1.0 AND Spend ≥ $2,500 | Eligible for expansion consideration |
| **Potential** | Net ROAS 0.8-0.99 AND Spend ≥ $2,500 | Nearly profitable, optimize or continue testing |
| **Underperformer** | Net ROAS ≤ 0.79 AND Spend ≥ $2,500 | Review for cut or pivot |
| **Testing** | Spend < $2,500 (any ROAS) | Insufficient data to classify |

> **Note (Session 081)**: The Potential classification was updated from "ROAS ≥ 1.0 AND Spend < $2,500" to "ROAS 0.8-0.99 AND Spend ≥ $2,500". This reflects the operational reality that Potential assets are those that are close to breakeven with significant spend, making them candidates for optimization.

### 2.3 Minimum Thresholds

| Threshold | Value | Rationale |
|-----------|-------|-----------|
| **Minimum Spend for Expansion Consideration** | $2,500 | Statistical confidence in ROAS signal |
| **Minimum Days Active** | 7 days | Allow for attribution window |

### 2.4 Data Validation Constraints

These constraints flag data that may indicate errors or require manual verification.

| Constraint | Value | On Violation |
|------------|-------|--------------|
| **Maximum Single-Asset Spend** | $500,000 | Flag with warning - verify aggregation is correct |
| **Maximum ROAS** | 10.0 (1000%) | Flag with warning - verify data integrity |
| **Valid Date Range (Start)** | 2024-01-01 | Reject - dates before Performance Golf ad tracking |
| **Valid Date Range (End)** | Today + 1 day | Reject - future dates indicate data error |
| **Maximum Daily Rows per Import** | 50,000 | Halt import - likely duplicate or incorrect file |
| **Minimum Spend per Row** | $0.00 | Reject negative spend - indicates data error |

**Note**: These constraints are sanity checks, not business rules. Values exceeding thresholds are flagged for review but may be legitimate (e.g., a viral ad could exceed $500K spend). The purpose is to catch data quality issues early.

---

## 3. Root Angle Principle

### 3.1 Core Requirement

The Root Angle Principle is the foundational strategic concept of the scaling system. Every Root Angle ID is permanently bound to one Root Angle — the central persuasive thesis being tested in market.

| Requirement | Description |
|-------------|-------------|
| **Root Angle ID = Root Angle binding** | Every Root Angle ID tests exactly one root angle. This binding is permanent. |
| **Expansions preserve root angle** | All expansions (`exv`, `exh`) and lifecycle categories (`prm`, `evg`) MUST keep the root angle unchanged. Only production variables change. |
| **New angles = new Root Angle IDs** | Discovered angles MUST get their own Net New (`nn` or `nnmu`) with a fresh Root Angle ID at `v0001`. |
| **Root Angle Name** | 1-4 words, stored in Column C of Ad Level Tracking. Must come from transcript language. |
| **Root Angle Mining** | Tess identifies potential angles from Iconik transcripts of **Winners ONLY** (unless human overrides). |

### 3.2 Why This Matters for Data Integrity

If an expansion subtly shifts the root angle, the performance data for that Root Angle ID becomes meaningless. You cannot determine if the production change worked or if a different angle is performing differently. The scaling system's ability to answer "which expansion type works best for this angle?" depends entirely on root angle purity.

### 3.3 Angle Mining Scope

| Scope | Rule |
|-------|------|
| **Automated mining** | Winners ONLY — market-validated assets |
| **Historical backfill** | Only assets with >$5,000 in spend |
| **Frequency (v1)** | Weekly with Domo CSV import cycle |
| **Frequency (v2)** | Automatic when Tess classifies an asset as Winner |
| **Mining source** | Iconik transcripts (built-in AI speech-to-text) |

---

## 4. Data Architecture

### 3.1 Data Source

| Layer | Source | Description |
|-------|--------|-------------|
| **Raw Data** | Domo CSV Export | Daily ad performance by Asset ID |
| **Aggregation** | SSS Spreadsheet | Sum of spend, revenue, trials by Asset ID |
| **Analysis** | SSS Spreadsheet | Parsed naming convention, performance metrics |

### 3.2 14-Position Naming Convention Parsing

The Asset ID follows a 14-position format. Each position must be parsed into a separate column:

| Position | Field | Column | Example Values |
|----------|-------|--------|----------------|
| 1 | Funnel | A | `357`, `sf1`, `dqfe`, `ossf` |
| 2 | RootAngleID | B | `0003`, `i074`, `h200` |
| 3 | VariationID | — | `v0001`, `v0029` |
| 4 | Platform | E | `fb`, `yt`, `xx` |
| 5 | Dimensions | F | `9x16`, `1080x1350` |
| 6 | LengthTier | G | `30s`, `60s`, `180s`, `360s`, `360s+`, `xx` |
| 7 | AdCategory | H | `nn`, `exv`, `exh`, `nnmu`, `prm`, `evg` (legacy: `ver`, `hor`) |
| 8 | ExpansionType | I | `hs`, `ssr`, `dur`, `env`, `sp`, `dp`, `af`, `cf`, `xx` |
| 9 | AssetType | J | `pod`, `tlr`, `sad`, `bvo`, `avo` |
| 10 | TalentCode | K | `haha`, `gamc`, `chog`, `mult` (4-letter codes; `mult` = 3+ talent actors) |
| 11 | EditorInitials | L | `ca`, `jj`, `mm` (2-letter codes) |
| 12 | CopywriterInitials | M | `co`, `ch`, `df` (2-letter codes) |
| 13 | CreationDate | N | `20251201` (YYYYMMDD) |
| 14 | PromoName | — | `bfcm`, `xmas`, or blank |

### 3.3 Aggregation Rules

**Problem**: Media buyers will inevitably duplicate ads into scaling campaigns, creating multiple rows for the same Asset ID. Scaling campaign assets are identified by the `-sca` suffix appended after the creation date (e.g., `357-0003-v0029-fb-9x16-180s-nn-xx-sad-haha-ca-co-20251201-sca`).

**Solution**: Aggregate by Asset ID (positions 1-13 of naming convention, ignoring the `-sca` suffix):
- Sum: Spend, Net Revenue, Trials, Impressions, Clicks
- Calculate: Net ROAS = Net Revenue / Spend

**Deduplication Key**: `[Funnel]-[RootAngleID]-[VariationID]-[Platform]-[Dimensions]-[LengthTier]-[AdCategory]-[ExpansionType]-[AssetType]-[TalentCode]-[EditorInitials]-[CopywriterInitials]-[CreationDate]`

---

## 5. Required Views

### 4.1 Ad Level Tracking (Primary View)

The main view showing individual asset performance with parsed naming convention fields.

| Column | Description |
|--------|-------------|
| Asset ID | Full 14-position naming string |
| Funnel | Parsed position 1 |
| RootAngleID | Parsed position 2 |
| Platform | Parsed position 4 |
| Dimensions | Parsed position 5 |
| LengthTier | Parsed position 6 |
| AdCategory | Parsed position 7 |
| ExpansionType | Parsed position 8 |
| AssetType | Parsed position 9 |
| Talent | Parsed position 10 (lookup to full name) |
| Editor | Parsed position 11 (lookup to full name) |
| Copywriter | Parsed position 12 (lookup to full name) |
| Creation Date | Parsed position 13 |
| Days Active | Count of unique dates with data |
| Total Spend | Aggregated spend |
| Net Revenue | Aggregated net revenue |
| Net ROAS | Net Revenue / Spend |
| Classification | Winner / Potential / Underperformer / Testing |
| Status | Active / Paused / ERROR |

### 4.2 Comparison Views (Aggregated Analytics)

#### 4.2.1 By Expansion Type

Shows total spend and average Net ROAS for each expansion type to answer: "Which expansion types perform best?"

| ExpansionType | Total Spend | Avg Net ROAS | Asset Count | Winners |
|---------------|-------------|--------------|-------------|---------|
| hs (Hook Stack) | $X | X.XX | X | X |
| ssr (Scroll Stopper) | $X | X.XX | X | X |
| dur (Duration) | $X | X.XX | X | X |
| etc. | | | | |

#### 4.2.2 By Asset Type

Shows performance by asset type to answer: "Which asset types perform best?"

| AssetType | Total Spend | Avg Net ROAS | Asset Count | Winners |
|-----------|-------------|--------------|-------------|---------|
| pod (Podcast) | $X | X.XX | X | X |
| tlr (Tele/Ronin) | $X | X.XX | X | X |
| sad (Slice & Dice) | $X | X.XX | X | X |
| etc. | | | | |

#### 4.2.3 By Ad Category

Shows Net New vs Expansion performance to answer: "Are expansions outperforming net new?"

| AdCategory | Total Spend | Avg Net ROAS | Asset Count | Winners |
|------------|-------------|--------------|-------------|---------|
| nn (Net New) | $X | X.XX | X | X |
| exv (Vertical Expansion) | $X | X.XX | X | X |
| exh (Horizontal Expansion) | $X | X.XX | X | X |
| nnmu (Mashup) | $X | X.XX | X | X |
| prm (Promo) | $X | X.XX | X | X |
| evg (Evergreen) | $X | X.XX | X | X |

#### 4.2.4 By Team Member

**Editors:**
| Editor | Total Spend | Avg Net ROAS | Asset Count | Winners |
|--------|-------------|--------------|-------------|---------|
| (Name) | $X | X.XX | X | X |

**Copywriters:**
| Copywriter | Total Spend | Avg Net ROAS | Asset Count | Winners |
|------------|-------------|--------------|-------------|---------|
| (Name) | $X | X.XX | X | X |

**Talent:**
| Talent | Total Spend | Avg Net ROAS | Asset Count | Winners |
|--------|-------------|--------------|-------------|---------|
| (Name) | $X | X.XX | X | X |

#### 4.2.5 By Funnel

Shows which products/offers are performing best:

| Funnel | Total Spend | Avg Net ROAS | Asset Count | Winners |
|--------|-------------|--------------|-------------|---------|
| 357 | $X | X.XX | X | X |
| sf1 | $X | X.XX | X | X |
| dqfe | $X | X.XX | X | X |

---

## 6. Error Handling

### 5.1 Malformed Naming Convention

When an Asset ID does not follow the 14-position format:

| Behavior | Description |
|----------|-------------|
| **Format Type Column (T)** | Set to `INCOMPLETE`, `OLD`, or `MALFORMED` as appropriate |
| **Status Column (O)** | Shows `Active` or `Inactive` only (not affected by format issues) |
| **Display** | Show the raw Asset ID in the Asset ID column |
| **Include in Totals** | Include spend in overall totals (don't exclude from aggregate views) |
| **Exclude from Parsed Views** | Don't include in comparison views (can't parse dimensions) |

> **Note (Session 034)**: The Status column (O) is reserved for ad running status (Active/Inactive). Format identification (NEW/OLD/INCOMPLETE/MALFORMED) is handled by the Format Type column (T).

### 5.2 Missing Data

| Field | If Missing | Default |
|-------|------------|---------|
| Net Revenue | Treat as $0 | ROAS = 0 |
| Spend | Skip row (critical field) | N/A |
| Any parsed field | Mark cell as `PARSE_ERROR` | Continue with other fields |

---

## 7. Data Pipeline

### 6.1 Weekly Append Process

| Step | Action | Frequency |
|------|--------|-----------|
| 1 | Export CSV from Domo (7-day lookback) | Weekly |
| 2 | Run deduplication script (Python) | Weekly |
| 3 | Import new rows to Raw_Daily_Data tab | Weekly |
| 4 | Aggregated_View auto-updates via QUERY formula | Automatic |
| 5 | Ad Level Tracking pulls from Aggregated_View | Automatic |

### 6.2 Data Freshness

| Metric | Target |
|--------|--------|
| **Update Frequency** | Weekly |
| **Data Latency** | 7 days (Domo attribution window) |
| **Historical Depth** | All-time (append-only) |

---

## 8. Acceptance Criteria

### 7.1 Minimum Viable Product (v1)

The SSS v1 is complete when:

- [ ] Raw_Daily_Data tab can receive weekly CSV imports (append, no duplicates)
- [ ] Aggregated_View correctly sums metrics by Asset ID
- [ ] Ad Level Tracking correctly parses all 14 naming convention positions
- [ ] Asset Classification is calculated correctly (Winner/Potential/Underperformer/Testing)
- [ ] Malformed names are flagged with ERROR but included in totals
- [ ] Comparison views exist for: Expansion Type, Asset Type, Ad Category, Team Members, Funnel
- [ ] All views are filterable by Funnel and Date Range

### 7.2 Quality Gates

| Gate | Requirement |
|------|-------------|
| **Data Integrity** | No duplicate Asset ID + Date combinations in Raw_Daily_Data |
| **Parse Accuracy** | 100% of valid naming conventions are parsed correctly |
| **Aggregation Accuracy** | Aggregated spend matches sum of raw spend |
| **Classification Accuracy** | All assets with Spend ≥$2,500 and ROAS ≥1.0 are marked Winner |

---

## 9. Future Enhancements (v2+)

### 8.1 Automated Recommendations

When sufficient data exists, the system could recommend:
- Which expansion type to test next (based on historical performance)
- Which assets are ready for expansion (hit thresholds)
- Which assets should be cut (consistently underperforming)

### 8.2 Domo Integration

- Direct API connection to Domo (eliminates manual CSV export)
- Real-time data sync
- Dashboard embedding

### 8.3 Alerts

- Notify when an asset crosses $2,500 spend threshold
- Notify when a winner's ROAS drops below breakeven
- Weekly summary of new winners

---

## 10. Code Tables Reference

### 10.1 Ad Category Codes

| Code | Meaning | Notes |
|------|---------|-------|
| `nn` | Net New | |
| `exv` | Vertical Expansion | Replaces legacy `ver` |
| `exh` | Horizontal Expansion | Replaces legacy `hor` |
| `nnmu` | Net New Mashup | |
| `prm` | Promo | Winning asset modified to align with a promo (P15 required) |
| `evg` | Evergreen | Winning asset de-promo'd to make evergreen (P15 must be blank) |

> Legacy codes `ver` and `hor` remain valid for existing assets in the system.

### 10.2 Expansion Type Codes

| Code | Meaning |
|------|---------|
| `hs` | Hook Stack |
| `ssr` | Scroll Stopper Refresh |
| `dur` | Duration |
| `env` | Environment |
| `sp` | Similar Presenter |
| `dp` | Different Presenter |
| `af` | Ad Format |
| `cf` | Copy Framework |
| `xx` | Not Applicable |

### 10.3 Asset Type Codes

| Code | Meaning |
|------|---------|
| `pod` | Podcast Style |
| `tlr` | Tele/Ronin |
| `sad` | Slice & Dice |
| `bvo` | Human VO + B-Roll |
| `avo` | Audio Video Only |
| `img` | Image |
| `aip` | Actor/Influencer (Paid) |
| `aio` | Actor/Influencer (Organic) |
| `gru` | Guru |
| `cdn` | Cutdown |

---

## 11. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-25 | Christopher Ogle + Claude | Initial PRD draft |
| 1.1 | 2026-01-25 | Christopher Ogle + Claude | Added Section 2.4 Data Validation Constraints (max spend, max ROAS, date range, import limits) |
| 1.2 | 2026-02-02 | Christopher Ogle + Claude | Updated Section 2.2 classification thresholds: Potential changed from "ROAS ≥ 1.0, Spend < $2,500" to "ROAS 0.8-0.99, Spend ≥ $2,500" per Session 081 confirmation |
| 1.3 | 2026-02-03 | Christopher Ogle + Claude (Veda Session 003) | Added Section 3 (Root Angle Principle) — Root Angle ID = Root Angle binding, angle mining scope (Winners only, >$5K backfill). Updated Ad Category codes: `ver`→`exv`, `hor`→`exh` in Section 10.1. Renumbered sections 3-11 → 4-12. |
| 1.4 | 2026-02-04 | Christopher Ogle + Claude (Veda Session 005) | Added Asset Type codes: `img` (Image), `aip` (Actor/Influencer Paid), `aio` (Actor/Influencer Organic), `gru` (Guru), `cdn` (Cutdown) to Section 10.3. |
| 1.5 | 2026-02-06 | Christopher Ogle + Claude | Added Ad Category codes `prm` (Promo) and `evg` (Evergreen). Added `mult` talent code (3+ actors). Updated Sections 3.1, 4.1, 4.2.3, 10.1. |

---

## 12. Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Owner | Christopher Ogle | PENDING | |
| Stakeholder | | PENDING | |

---

*This PRD defines "what success looks like" for the Strategic Scaling System. The companion MASTER-AGENT.md document will define "how we execute" the build.*
