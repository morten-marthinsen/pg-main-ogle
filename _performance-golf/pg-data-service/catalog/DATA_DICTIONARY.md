# PG Data Service — Data Dictionary

> **Any agent consuming PG data service output MUST read this file before performing calculations.**
>
> **Rule: If a metric has a `do-not-derive` tag, use `get_enriched()` — do NOT recalculate it from raw columns.**

Machine-readable version: `catalog/data_dictionary.yaml` (mirrors OpenMetadata Glossary schema for Phase 5 import).

---

## Structure

This dictionary is organized per-dataset. Each Domo dataset has its own Beast Mode calculations with different formulas. Shared terms (identity, classification) apply across all datasets.

When a new dataset is added to `datasets.yaml`, its definitions should be added to `data_dictionary.yaml` too.

---

## Shared (All Datasets)

See: [Identity & Cohort Tracking](#identity--cohort-tracking), [Classification Rules](#classification-rules)

---

## Dataset: ad_performance

Facebook ad performance joined with CheckoutChamp order data.

### How Data Flows

```
Domo Dataset → Adapter (fetch + Beast Modes) → API (strip PII) → Consumer
```

- **Raw data** (`get_raw("ad_performance", ...)`): Source rows with PII stripped. `email_address_hash` available for customer counts.
- **Enriched data** (`get_enriched(...)`): One row per ad with all metrics computed. PII stripped. Classification is consumer-side (not applied by the service).

**Two row types exist in this dataset:**
- Ad-metric rows (`Spend > 0`) — impressions, clicks, spend
- Order rows (`totalAmount > 0`) — revenue, COGS, refunds, customer info

These are aggregated separately and joined by ad name. Never mix them.

### Computed Metrics (Beast Modes)

These are computed in the adapter layer. They **MUST** come from `get_enriched()`. Do not recalculate from raw data — the formulas have nuances that will produce wrong numbers if reimplemented.

### Revenue & Profit

| Metric | Formula | Gotchas |
|--------|---------|---------|
| **gross_revenue** | `SUM(totalAmount)` grouped by Ad | Aggregated from order rows only |
| **net_revenue** | `gross_revenue - total_cogs + total_refunds - total_agency_fees - total_cc_fees - spend` | Refunds already negative — adding subtracts |
| **gross_profit** | `gross_revenue - total_cogs - total_refunds` | **BUG**: Subtracting negative refunds inflates this. Matches Domo — do not "fix". |
| **fixed_refund_net_revenue** | Same as net_revenue but `gross_revenue * 0.08` replaces actual refunds | 8% is a flat assumption |

### ROAS

| Metric | Formula | Interpretation |
|--------|---------|----------------|
| **gross_roas** | `gross_revenue / spend` | Raw revenue return, no cost deductions |
| **net_roas** | `(net_revenue / spend) + 1` | **1.0 = 100% = breakeven**. Primary profitability metric. |
| **nc_net_roas** | Same formula, revenue filtered to new customers, spend is TOTAL | Always <= net_roas |

> **The +1 offset matters.** Net ROAS of 1.5 = 150% = profitable. 0.8 = 80% = losing money. Do not compare against 0.

### CPA

| Metric | Formula | Note |
|--------|---------|------|
| **cpa** | `spend / total_customers` | Pre-computed. `total_customers` is the distinct count. |
| **nc_cpa** | `spend / new_customers` | Total spend / new customer count only |

### AOV (Gross-Based)

| Metric | Formula | Note |
|--------|---------|------|
| **aov** | `gross_revenue / total_orders` | Gross AOV — distinct from net_aov |
| **nc_aov** | `nc_gross_revenue / new_customers` | |
| **rc_aov** | `(gross_revenue - nc_gross_revenue) / (total_customers - new_customers)` | |

### Other Computed

| Metric | Formula |
|--------|---------|
| **net_aov** | `cpa * net_roas` |
| **nlpt** | `net_revenue / sc_trials` |
| **fixed_refund_nlpt** | `fixed_refund_net_revenue / sc_trials` |
| **cost_per_sc_trial** | `spend / sc_trials` |
| **nc_pct** | `new_customers / total_customers` |
| **cvr_pct** | `total_customers / clicks` |
| **nc_cvr_pct** | `new_customers / clicks` |
| **rc_cvr_pct** | `(total_customers - new_customers) / clicks` |
| **cpc** | `spend / clicks` |
| **ctr** | `clicks / impressions` |
| **cpm** | `(spend / impressions) * 1000` |

---

## Classification Rules (Reference — Not Applied by the Service)

The data service provides the metrics. Classification is a consumer-side business rule. These thresholds from Tess PRD v1.4 are documented here for consumers who want to implement them:

| Class | Condition |
|-------|-----------|
| **Winner** | `net_roas >= 1.0` AND `spend >= $2,500` |
| **Potential** | `net_roas >= 0.80` AND `net_roas < 1.0` |
| **Underperformer** | `net_roas < 0.80` |
| **Testing** | `spend < $2,500` (regardless of ROAS) |

- Source: Tess PRD v1.4 — may need alignment on Potential definition

---

## Identity & Cohort Tracking

| Field | What It Is | How To Use |
|-------|-----------|------------|
| **email_address_hash** | SHA-256 hash of full email, hexdigest truncated to 16 chars | Same person = same hash across all time periods. Use for unique counts, cohort analysis, repeat purchase tracking. |

- Available in **raw data only** (enriched has pre-aggregated counts)
- Not reversible — cannot recover email from hash
- Lowercased and trimmed before hashing for consistency

---

### Key Raw Columns (ad_performance)

| Column | Raw Name | Watch Out |
|--------|----------|-----------|
| **funnel** | `[Funnel]` | Use this, NOT the campaign-level `Funnel` column |
| **script_id** | `[ScriptID]` | Root angle — groups variations of same creative concept |
| **valid_15_position** | `Valid 15-Position Ad Name?` | 1 = follows 15-position naming. Service returns all ads — consumers filter as needed. |
| **New Customers** | `New Customers` | STRING field. `'0'` = returning. Do not cast to int. |
| **Refunded Revenue** | `Refunded Revenue` | Already negative from Domo. Do not negate. |

### What NOT To Do (ad_performance)

1. **Do not recalculate Net ROAS, CPA, or any Beast Mode metric from raw columns.** The formulas have sign bugs, aggregation quirks, and NC filtering logic that will produce wrong numbers.
2. **Do not treat Net ROAS as a simple ratio.** The `+1` offset means 1.0 = breakeven, not 0.0.
3. **Do not mix ad-metric rows and order rows.** They are different row types in the same dataset.
4. **Do not use `Funnel` (campaign-level).** Use `[Funnel]` (15-position parsed).
5. **Do not assume Refunded Revenue is positive.** It's already negative.
6. **Do not "fix" the gross_profit sign bug.** It matches Domo. Fix Domo first.

---

## Future Datasets

When a new dataset is onboarded (added to `datasets.yaml`), add a section here with:
- Dataset description and row structure
- Beast Mode definitions (formulas, gotchas, do-not-derive flags)
- Key raw columns consumers should know about

Datasets on the roadmap:
- **facebook_raw** — Direct Facebook Ads API data (campaigns, adsets, ads). No order joins. Different Beast Modes than ad_performance.
- **checkout_champ** — CheckoutChamp transaction log. Heavy PII. Order-centric Beast Modes (LTV, refund rates, upsell conversion).
