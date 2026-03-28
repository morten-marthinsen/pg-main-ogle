/** Raw row from Domo API — all values are strings from the SQL query result. */
export interface DomoRawRow {
  [key: string]: string;
}

/** Enriched ad with all Beast Mode metrics + parsed naming convention fields. */
export interface EnrichedAd {
  // Identity
  ad_name: string;
  status: string;

  // Parsed 15-position fields
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

  // Base metrics
  spend: number;
  clicks: number;
  impressions: number;
  gross_revenue: number;
  total_orders: number;
  total_customers: number;
  new_customers: number;
  sc_trials: number;

  // Beast Mode metrics
  net_revenue: number;
  net_roas: number;
  nc_net_roas: number;
  gross_roas: number;
  cpa: number;
  nc_cpa: number;
  nlpt: number;
  fixed_refund_nlpt: number;
  nc_pct: number;
  cvr_pct: number;
  nc_cvr_pct: number;
  rc_cvr_pct: number;
  aov: number;
  nc_aov: number;
  rc_aov: number;
  cpc: number;
  ctr: number;
  cpm: number;
  cost_per_sc_trial: number;
  fixed_refund_net_revenue: number;

  // Classification
  classification: Classification;
}

export type Classification = "winner" | "potential" | "underperformer" | "testing";

/** Summary response from the /api/domo/summary endpoint. */
export interface AdSummaryResponse {
  ads: EnrichedAd[];
  meta: {
    date_from: string;
    date_to: string;
    total_ads: number;
    cached_at: string;
  };
}

/** Comparison group for performance views. */
export interface ComparisonGroup {
  name: string;
  total_spend: number;
  avg_net_roas: number;
  asset_count: number;
  winners: number;
  win_rate: number;
}
