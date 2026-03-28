/**
 * Ad performance enrichment — TypeScript port of pg-data-service/enrichments/ad_performance.py.
 *
 * Takes raw rows from Domo, splits into spend/order rows, aggregates,
 * joins, and computes all Beast Mode metrics.
 *
 * Formulas sourced from Domo Beast Mode definitions (2026-03-16).
 * Validated at 0.00% difference vs Domo CSV exports.
 */

import type { EnrichedAd, Classification } from "./types";
import { parseFunnelFromAdName, getOfferName } from "./constants";

// --- Domo column names ---
const COL_AD = "Ad";
const COL_SPEND = "Spend";
const COL_CLICKS = "Clicks";
const COL_IMPRESSIONS = "Impressions";
const COL_PLATFORM = "Ad Platform";
const COL_TOTAL_AMOUNT = "totalAmount";
const COL_ORDER_ID = "orderId";
const COL_PHYSICAL_COGS = "Physical COGS Per Order";
const COL_REFUNDED_REVENUE = "Refunded Revenue";
const COL_AGENCY_FEES = "Agency Fees";
const COL_CC_FEES = "CC Fees";
const COL_EMAIL = "emailAddress";
const COL_NEW_CUSTOMERS = "New Customers";
const COL_SC_TRIAL_PURCHASE_IDS = "SC Trial Start PurchaseIDs";
const COL_STATUS = "Status";

// Pre-parsed 15-position columns
const COL_FUNNEL = "[Funnel]";
const COL_SCRIPT_ID = "[ScriptID]";
const COL_VARIATION_ID = "[VariationID]";
const COL_AD_CATEGORY = "[AdCategory]";
const COL_EXPANSION_TYPE = "[ExpansionType]";
const COL_ASSET_TYPE = "[AssetType]";
const COL_TALENT_CODE = "[TalentCode]";
const COL_EDITOR = "[EditorInitials]";
const COL_COPYWRITER = "[CopywriterInitials]";

// Human-readable lookups
const COL_TALENT_NAME = "Talent Name";
const COL_EDITOR_NAME = "Editor Name";
const COL_COPYWRITER_NAME = "Copywriter Name";
const COL_OFFER_NAME = "Offer Name";
const COL_EXPANSION_TYPE_NAME = "Expansion Type";
const COL_ASSET_TYPE_NAME = "Asset Type";

type Row = Record<string, string>;

// --- Helpers ---

function num(val: string | undefined): number {
  if (!val || val === "" || val === "nan" || val === "NaN") return 0;
  const n = Number(val);
  return isNaN(n) ? 0 : n;
}

function safeDiv(numerator: number, denominator: number): number {
  if (denominator === 0 || isNaN(denominator)) return NaN;
  return numerator / denominator;
}

function countDistinct(values: string[]): number {
  const clean = values.filter((v) => v && v !== "" && v !== "nan");
  return new Set(clean).size;
}

// --- Aggregation ---

interface SpendAgg {
  spend: number;
  clicks: number;
  impressions: number;
}

interface OrderAgg {
  gross_revenue: number;
  total_orders: number;
  total_cogs: number;
  total_refunds: number;
  total_agency_fees: number;
  total_cc_fees: number;
  total_customers: number;
  new_customers: number;
  nc_gross_revenue: number;
  nc_total_cogs: number;
  nc_total_refunds: number;
  nc_total_agency_fees: number;
  nc_total_cc_fees: number;
  sc_trials: number;
}

interface AdInfo {
  ad_name: string;
  status: string;
  funnel: string;
  script_id: string;
  variation_id: string;
  ad_category: string;
  expansion_type: string;
  expansion_type_name: string;
  asset_type: string;
  asset_type_name: string;
  talent_code: string;
  talent_name: string;
  editor_initials: string;
  editor_name: string;
  copywriter_initials: string;
  copywriter_name: string;
  platform: string;
  offer_name: string;
}

function extractAdList(rows: Row[]): Map<string, AdInfo> {
  const adMap = new Map<string, AdInfo>();
  for (const row of rows) {
    const name = (row[COL_AD] ?? "").toLowerCase().trim();
    if (!name || adMap.has(name)) continue;
    // Use Domo's parsed fields when available, fall back to parsing from ad name
    const domoFunnel = row[COL_FUNNEL] ?? "";
    const funnel = domoFunnel || parseFunnelFromAdName(name);
    const domoOffer = row[COL_OFFER_NAME] ?? "";
    const offer_name = domoOffer || getOfferName(funnel);

    adMap.set(name, {
      ad_name: name,
      status: row[COL_STATUS] ?? "",
      funnel,
      script_id: row[COL_SCRIPT_ID] ?? "",
      variation_id: row[COL_VARIATION_ID] ?? "",
      ad_category: row[COL_AD_CATEGORY] ?? "",
      expansion_type: row[COL_EXPANSION_TYPE] ?? "",
      expansion_type_name: row[COL_EXPANSION_TYPE_NAME] ?? "",
      asset_type: row[COL_ASSET_TYPE] ?? "",
      asset_type_name: row[COL_ASSET_TYPE_NAME] ?? "",
      talent_code: row[COL_TALENT_CODE] ?? "",
      talent_name: row[COL_TALENT_NAME] ?? "",
      editor_initials: row[COL_EDITOR] ?? "",
      editor_name: row[COL_EDITOR_NAME] ?? "",
      copywriter_initials: row[COL_COPYWRITER] ?? "",
      copywriter_name: row[COL_COPYWRITER_NAME] ?? "",
      platform: row[COL_PLATFORM] ?? "",
      offer_name,
    });
  }
  return adMap;
}

function aggregateSpend(spendRows: Row[]): Map<string, SpendAgg> {
  const grouped = new Map<string, SpendAgg>();
  for (const row of spendRows) {
    const name = (row[COL_AD] ?? "").toLowerCase().trim();
    if (!name) continue;
    const existing = grouped.get(name) ?? { spend: 0, clicks: 0, impressions: 0 };
    existing.spend += num(row[COL_SPEND]);
    existing.clicks += num(row[COL_CLICKS]);
    existing.impressions += num(row[COL_IMPRESSIONS]);
    grouped.set(name, existing);
  }
  return grouped;
}

function aggregateOrders(orderRows: Row[]): Map<string, OrderAgg> {
  // Group rows by ad name first, then compute aggregates
  const byAd = new Map<string, Row[]>();
  for (const row of orderRows) {
    const name = (row[COL_AD] ?? "").toLowerCase().trim();
    if (!name) continue;
    const existing = byAd.get(name) ?? [];
    existing.push(row);
    byAd.set(name, existing);
  }

  const result = new Map<string, OrderAgg>();
  byAd.forEach((rows, name) => {
    const gross_revenue = rows.reduce((sum, r) => sum + num(r[COL_TOTAL_AMOUNT]), 0);
    const total_orders = countDistinct(rows.map((r) => r[COL_ORDER_ID] ?? ""));
    const total_cogs = rows.reduce((sum, r) => sum + num(r[COL_PHYSICAL_COGS]), 0);
    const total_refunds = rows.reduce((sum, r) => sum + num(r[COL_REFUNDED_REVENUE]), 0);
    const total_agency_fees = rows.reduce((sum, r) => sum + num(r[COL_AGENCY_FEES]), 0);
    const total_cc_fees = rows.reduce((sum, r) => sum + num(r[COL_CC_FEES]), 0);
    const total_customers = countDistinct(rows.map((r) => r[COL_EMAIL] ?? ""));

    // SC trials = count distinct non-empty SC Trial Start PurchaseIDs
    const scIds = rows
      .map((r) => (r[COL_SC_TRIAL_PURCHASE_IDS] ?? "").trim())
      .filter((v) => v && v !== "nan");
    const sc_trials = new Set(scIds).size;

    // New customers: rows where New Customers != "" and != "0"
    const ncRows = rows.filter((r) => {
      const val = (r[COL_NEW_CUSTOMERS] ?? "").trim();
      return val !== "" && val !== "0" && val !== "nan";
    });
    const new_customers = countDistinct(ncRows.map((r) => r[COL_EMAIL] ?? ""));
    const nc_gross_revenue = ncRows.reduce((sum, r) => sum + num(r[COL_TOTAL_AMOUNT]), 0);
    const nc_total_cogs = ncRows.reduce((sum, r) => sum + num(r[COL_PHYSICAL_COGS]), 0);
    const nc_total_refunds = ncRows.reduce((sum, r) => sum + num(r[COL_REFUNDED_REVENUE]), 0);
    const nc_total_agency_fees = ncRows.reduce((sum, r) => sum + num(r[COL_AGENCY_FEES]), 0);
    const nc_total_cc_fees = ncRows.reduce((sum, r) => sum + num(r[COL_CC_FEES]), 0);

    result.set(name, {
      gross_revenue,
      total_orders,
      total_cogs,
      total_refunds,
      total_agency_fees,
      total_cc_fees,
      total_customers,
      new_customers,
      nc_gross_revenue,
      nc_total_cogs,
      nc_total_refunds,
      nc_total_agency_fees,
      nc_total_cc_fees,
      sc_trials,
    });
  });
  return result;
}

// --- Beast Mode Computation ---

function classify(netRoas: number, spend: number): Classification {
  if (spend < 2500) return "testing";
  if (isNaN(netRoas)) return "testing";
  if (netRoas >= 1.0) return "winner";
  if (netRoas >= 0.8) return "potential";
  return "underperformer";
}

/**
 * Enrich raw Domo rows into fully computed ad performance data.
 *
 * This is the main entry point — equivalent to Python's enrich() function.
 * Takes raw rows from fetchAdPerformance(), returns enriched ads with all
 * Beast Mode metrics computed and classification assigned.
 */
export function enrich(rawRows: Row[]): EnrichedAd[] {
  if (rawRows.length === 0) return [];

  // 1. Extract ad list (distinct ads with position fields)
  const adList = extractAdList(rawRows);

  // 2. Split into spend rows and order rows
  const spendRows = rawRows.filter((r) => num(r[COL_SPEND]) > 0);
  const orderRows = rawRows.filter((r) => num(r[COL_TOTAL_AMOUNT]) > 0);

  // 3. Aggregate
  const spendAgg = aggregateSpend(spendRows);
  const orderAgg = aggregateOrders(orderRows);

  // 4. Join and compute Beast Modes
  const results: EnrichedAd[] = [];
  adList.forEach((info, name) => {
    const s = spendAgg.get(name) ?? { spend: 0, clicks: 0, impressions: 0 };
    const o = orderAgg.get(name) ?? {
      gross_revenue: 0, total_orders: 0, total_cogs: 0,
      total_refunds: 0, total_agency_fees: 0, total_cc_fees: 0,
      total_customers: 0, new_customers: 0, nc_gross_revenue: 0,
      nc_total_cogs: 0, nc_total_refunds: 0, nc_total_agency_fees: 0,
      nc_total_cc_fees: 0, sc_trials: 0,
    };

    const spend = s.spend;
    const clicks = s.clicks;
    const impressions = s.impressions;
    const gr = o.gross_revenue;
    const cogs = o.total_cogs;
    const refunds = o.total_refunds; // Already negative from Domo
    const agency = o.total_agency_fees;
    const cc = o.total_cc_fees;
    const customers = o.total_customers;
    const newCust = o.new_customers;
    const scTrials = o.sc_trials;

    const ncGr = o.nc_gross_revenue;
    const ncCogs = o.nc_total_cogs;
    const ncRefunds = o.nc_total_refunds;
    const ncAgency = o.nc_total_agency_fees;
    const ncCc = o.nc_total_cc_fees;

    // Beast Mode formulas — exact match to Python enrichment
    const net_revenue = gr - cogs + refunds - agency - cc - spend;
    const net_roas = safeDiv(net_revenue, spend) + 1;
    const nc_net_rev = ncGr - ncCogs + ncRefunds - ncAgency - ncCc - spend;
    const nc_net_roas = safeDiv(nc_net_rev, spend) + 1;
    const gross_roas = safeDiv(gr, spend);
    const cpa = safeDiv(spend, customers);
    const nc_cpa = safeDiv(spend, newCust);
    const nlpt = safeDiv(net_revenue, scTrials);
    const nc_pct = safeDiv(newCust, customers);
    const cvr_pct = safeDiv(customers, clicks);
    const nc_cvr_pct = safeDiv(newCust, clicks);
    const rc_customers = Math.max(0, customers - newCust);
    const rc_cvr_pct = safeDiv(rc_customers, clicks);
    const fixed_refund = gr * 0.08;
    const fixed_refund_net_revenue = gr - cogs - fixed_refund - agency - cc - spend;
    const cpc = safeDiv(spend, clicks);
    const ctr = safeDiv(clicks, impressions);
    const cpm = safeDiv(spend, impressions) * 1000;
    const aov = safeDiv(gr, o.total_orders);
    const nc_aov = safeDiv(ncGr, newCust);
    const rc_aov = safeDiv(gr - ncGr, rc_customers);
    const cost_per_sc_trial = safeDiv(spend, scTrials);
    const fixed_refund_nlpt = safeDiv(fixed_refund_net_revenue, scTrials);

    results.push({
      ...info,
      spend,
      clicks,
      impressions,
      gross_revenue: gr,
      total_orders: o.total_orders,
      total_customers: customers,
      new_customers: newCust,
      sc_trials: scTrials,
      net_revenue,
      net_roas,
      nc_net_roas,
      gross_roas,
      cpa,
      nc_cpa,
      nlpt,
      fixed_refund_nlpt,
      nc_pct,
      cvr_pct,
      nc_cvr_pct,
      rc_cvr_pct,
      aov,
      nc_aov,
      rc_aov,
      cpc,
      ctr,
      cpm,
      cost_per_sc_trial,
      fixed_refund_net_revenue,
      classification: classify(net_roas, spend),
    });
  });

  return results;
}
