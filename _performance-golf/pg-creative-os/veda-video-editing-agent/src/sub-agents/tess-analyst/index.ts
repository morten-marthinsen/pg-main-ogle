/**
 * Tess Analyst — Veda's performance intelligence sub-agent.
 *
 * Reads the SSS "Ad Level Tracking" sheet, identifies Winner videos
 * eligible for expansion, scores opportunities, and returns ranked
 * recommendations ready for the Veda Intake Queue.
 *
 * Backstory: I'm the analyst who reads the numbers and translates them
 * into action. I look at every Winner in the SSS — what's spending,
 * what's returning, and what expansion types haven't been tried yet.
 * A $17K Winner with no hook stack variation is money left on the table.
 * I find those gaps and rank them so Veda knows exactly what to build next.
 */

import type {
  SheetsReader,
  TessAnalystInput,
  TessAnalystOutput,
  SssTrackingRow,
  ExpansionOpportunity,
  RecommendationEvidence,
} from "../../types/pipeline.js";
import type { SubAgentResult } from "../../types/sub-agent.js";

// ── Constants ───────────────────────────────────────────────────────────

const DEFAULT_SHEET = "Ad Level Tracking (Current State)";

/** Column indices for Ad Level Tracking (0-based, A-U). */
const SSS_COL = {
  FUNNEL: 0,          // A
  SCRIPT_ID: 1,       // B
  ROOT_ANGLE: 2,      // C
  ASSET_ID: 3,        // D
  PLATFORM: 4,        // E
  DIMENSIONS: 5,      // F
  LENGTH_TIER: 6,     // G
  AD_CATEGORY: 7,     // H
  EXPANSION_TYPE: 8,  // I
  ASSET_TYPE: 9,      // J
  TALENT: 10,         // K
  EDITOR: 11,         // L
  COPYWRITER: 12,     // M
  COUNTRY_CODE: 13,   // N
  CREATION_DATE: 14,  // O
  STATUS: 15,         // P
  SPEND: 16,          // Q
  NET_REVENUE: 17,    // R
  ROAS: 18,           // S
  CLASSIFICATION: 19, // T
  FORMAT_TYPE: 20,    // U
} as const;

/**
 * Canonical expansion types in priority order (safest first).
 *
 * hs  = Hook Stack (3-15s) — varies opening hook, preserves body
 * dur = Duration Cutdown — reassembles body segments, preserves hook
 * ssr = Scroll Stopper (0-3s) — pre-hook opener for social feeds
 * cf  = Caption Format — adds captions/subtitles
 * env = Environment Swap — changes background/setting
 * af  = Ad Format — aspect ratio change (9x16 → 16x9)
 */
const EXPANSION_TYPES = ["hs", "dur", "ssr", "cf", "env", "af"] as const;

/**
 * Video asset types — Veda only processes video, not static images.
 * Static images are handled by the NLC agency.
 */
const VIDEO_ASSET_TYPES = new Set(["vd", "avo", "bvo", "tlr"]);

/** Image asset types to exclude. */
const IMAGE_ASSET_TYPES = new Set(["img", "aip", "aio", "gru", "cdn"]);

/**
 * Determine if a row represents a video asset.
 *
 * Checks asset_type column first. If column is empty/dash (common in real SSS),
 * falls back to extracting the type from the asset ID string itself.
 * New-format IDs have the type at position 6: `...-nn-vd-1min-...`
 */
function isVideoAsset(row: SssTrackingRow): boolean {
  const colType = row.asset_type.toLowerCase();

  // If column has a real value, use it directly
  if (colType && colType !== "—" && colType !== "-") {
    return VIDEO_ASSET_TYPES.has(colType);
  }

  // Fall back: extract from asset ID. Segments are hyphen-separated.
  // Image IDs contain "-img-", video IDs contain "-vd-", "-avo-", "-bvo-", "-tlr-"
  const idLower = row.asset_id.toLowerCase();
  for (const imgType of IMAGE_ASSET_TYPES) {
    if (idLower.includes(`-${imgType}-`)) return false;
  }
  for (const vidType of VIDEO_ASSET_TYPES) {
    if (idLower.includes(`-${vidType}-`)) return true;
  }

  // No marker found (old format, pmax, search ads, etc.) — include by default.
  // Non-asset rows (pmax, search ad) typically won't qualify as Winners anyway.
  return true;
}

/** Safety score per expansion type (how likely it preserves root angle). */
const TYPE_SAFETY: Record<string, number> = {
  hs: 10,   // Hook stack: only changes opening hook
  dur: 8,   // Duration cutdown: reassembly preserves thesis
  ssr: 7,   // Scroll stopper: short pre-hook, core untouched
  cf: 6,    // Caption format: additive overlay
  env: 5,   // Environment swap: background changes, content same
  af: 3,    // Ad format: re-framing may affect composition
};

// ── Parsers ─────────────────────────────────────────────────────────────

/** Parse dollar amount string like "$17,856.23" → 17856.23 */
export function parseSpend(raw: string): number {
  const cleaned = raw.replace(/[$,]/g, "");
  const val = parseFloat(cleaned);
  return Number.isFinite(val) ? val : 0;
}

/** Parse percentage string like "108%" → 108 */
export function parseRoas(raw: string): number {
  const cleaned = raw.replace(/%/g, "");
  const val = parseFloat(cleaned);
  return Number.isFinite(val) ? val : 0;
}

/** Parse a single SSS row into SssTrackingRow. Returns null if invalid. */
export function parseRow(row: string[]): SssTrackingRow | null {
  const funnel = (row[SSS_COL.FUNNEL] ?? "").trim();
  const scriptId = (row[SSS_COL.SCRIPT_ID] ?? "").trim();
  const classification = (row[SSS_COL.CLASSIFICATION] ?? "").trim();

  if (!funnel || !scriptId || !classification) return null;

  return {
    funnel,
    script_id: scriptId,
    root_angle_name: (row[SSS_COL.ROOT_ANGLE] ?? "").trim(),
    asset_id: (row[SSS_COL.ASSET_ID] ?? "").trim(),
    platform: (row[SSS_COL.PLATFORM] ?? "").trim(),
    dimensions: (row[SSS_COL.DIMENSIONS] ?? "").trim(),
    length_tier: (row[SSS_COL.LENGTH_TIER] ?? "").trim(),
    ad_category: (row[SSS_COL.AD_CATEGORY] ?? "").trim(),
    expansion_type: (row[SSS_COL.EXPANSION_TYPE] ?? "").trim(),
    asset_type: (row[SSS_COL.ASSET_TYPE] ?? "").trim(),
    talent: (row[SSS_COL.TALENT] ?? "").trim(),
    country_code: (row[SSS_COL.COUNTRY_CODE] ?? "").trim(),
    spend: parseSpend(row[SSS_COL.SPEND] ?? ""),
    roas: parseRoas(row[SSS_COL.ROAS] ?? ""),
    classification,
  };
}

// ── Grouping ────────────────────────────────────────────────────────────

/** Metrics for a Script ID group of Winners. */
export interface ScriptGroup {
  funnel: string;
  script_id: string;
  winners: SssTrackingRow[];
  primary_source: SssTrackingRow;      // highest-spend Winner
  total_spend: number;
  avg_roas: number;
  existing_expansion_types: string[];  // expansion types already tried
}

/** Group Winners by funnel + script_id. */
export function groupByScript(winners: SssTrackingRow[]): ScriptGroup[] {
  const groups = new Map<string, SssTrackingRow[]>();

  for (const row of winners) {
    const key = `${row.funnel}-${row.script_id}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(row);
  }

  const result: ScriptGroup[] = [];

  for (const rows of groups.values()) {
    // Sort by spend descending — highest-spend Winner becomes primary source
    rows.sort((a, b) => b.spend - a.spend);
    const primary = rows[0];

    const totalSpend = rows.reduce((sum, r) => sum + r.spend, 0);
    const avgRoas = rows.length > 0
      ? rows.reduce((sum, r) => sum + r.roas, 0) / rows.length
      : 0;

    // Collect existing expansion types (including xx for net new)
    const expansionTypes = new Set(
      rows.map(r => r.expansion_type).filter(Boolean),
    );

    result.push({
      funnel: primary.funnel,
      script_id: primary.script_id,
      winners: rows,
      primary_source: primary,
      total_spend: totalSpend,
      avg_roas: avgRoas,
      existing_expansion_types: Array.from(expansionTypes),
    });
  }

  return result;
}

// ── Scoring ─────────────────────────────────────────────────────────────

/** Score a single expansion opportunity (0-100). */
export function scoreOpportunity(
  totalSpend: number,
  avgRoas: number,
  unexploitedCount: number,
  totalTypes: number,
  expansionType: string,
): number {
  // Spend factor (0-40): log scale — $1K≈10, $5K≈25, $20K≈40
  const spendScore = totalSpend > 0
    ? Math.min(40, Math.log10(totalSpend / 100) * 10)
    : 0;

  // ROAS factor (0-30): linear from 50%+ ROAS
  const roasScore = Math.min(30, Math.max(0, (avgRoas - 50) * 0.2));

  // Gap factor (0-20): more unexploited types = more upside
  const gapScore = totalTypes > 0
    ? (unexploitedCount / totalTypes) * 20
    : 0;

  // Type safety factor (0-10)
  const safetyScore = TYPE_SAFETY[expansionType] ?? 5;

  return spendScore + roasScore + gapScore + safetyScore;
}

/** Score and rank expansion opportunities across all script groups. */
export function scoreOpportunities(
  groups: ScriptGroup[],
  maxRecommendations: number,
): ExpansionOpportunity[] {
  const opportunities: ExpansionOpportunity[] = [];

  for (const group of groups) {
    // Find expansion types not yet tried for this script
    const unexploited = EXPANSION_TYPES.filter(
      type => !group.existing_expansion_types.includes(type),
    );

    if (unexploited.length === 0) continue;

    // Recommend the highest-priority (safest) unexploited type
    const recommendedType = unexploited[0];

    const score = scoreOpportunity(
      group.total_spend,
      group.avg_roas,
      unexploited.length,
      EXPANSION_TYPES.length,
      recommendedType,
    );

    const evidence: RecommendationEvidence = {
      source_spend: group.primary_source.spend,
      source_roas: group.primary_source.roas,
      existing_expansions: group.existing_expansion_types,
      unexploited_types: Array.from(unexploited),
    };

    const reasoning = [
      `Winner with $${group.total_spend.toFixed(0)} spend at ${group.avg_roas.toFixed(0)}% ROAS.`,
      `${unexploited.length} expansion types unexploited.`,
      `${recommendedType} recommended (safety: ${TYPE_SAFETY[recommendedType] ?? 5}/10).`,
    ].join(" ");

    opportunities.push({
      funnel: group.funnel,
      script_id: group.script_id,
      source_asset_id: group.primary_source.asset_id,
      root_angle_name: group.primary_source.root_angle_name,
      recommended_expansion_type: recommendedType,
      score,
      priority: "P2",        // assigned after sorting
      confidence: "low",     // assigned after sorting
      evidence,
      reasoning,
    });
  }

  // Sort by score descending
  opportunities.sort((a, b) => b.score - a.score);

  // Assign priorities: top 20% P0, next 50% P1, rest P2
  const p0Cutoff = Math.max(1, Math.ceil(opportunities.length * 0.2));
  const p1Cutoff = Math.ceil(opportunities.length * 0.7);

  for (let i = 0; i < opportunities.length; i++) {
    if (i < p0Cutoff) opportunities[i].priority = "P0";
    else if (i < p1Cutoff) opportunities[i].priority = "P1";
    // else stays P2

    opportunities[i].confidence =
      opportunities[i].score >= 75 ? "high" :
      opportunities[i].score >= 50 ? "medium" : "low";
  }

  return opportunities.slice(0, maxRecommendations);
}

// ── Main Entry Point ────────────────────────────────────────────────────

/**
 * Analyze SSS performance data and generate expansion recommendations.
 *
 * Reads the Ad Level Tracking sheet, filters for Winners with meaningful
 * spend, groups by script, scores expansion opportunities, and returns
 * ranked recommendations ready for the Veda Intake Queue.
 */
export async function analyze(
  input: TessAnalystInput,
  reader: SheetsReader,
): Promise<SubAgentResult<TessAnalystOutput>> {
  // Validate input
  if (input.min_spend_threshold < 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "min_spend_threshold must be >= 0",
      recovery_action: "halt",
      context: { step: "tess_analyst" },
    };
  }

  if (input.max_recommendations < 1) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "max_recommendations must be >= 1",
      recovery_action: "halt",
      context: { step: "tess_analyst" },
    };
  }

  const sheet = input.sheet_name ?? DEFAULT_SHEET;

  // Step 1: Read SSS data
  let rows: string[][];
  try {
    rows = await reader.getRows(input.spreadsheet_id, sheet, "A2:U");
  } catch (err) {
    return {
      status: "FAILED",
      error_category: "SHEETS_ERROR",
      severity: "error",
      message: `Failed to read spreadsheet: ${err instanceof Error ? err.message : String(err)}`,
      recovery_action: "retry",
      context: { step: "tess_analyst" },
    };
  }

  // Step 2: Parse and filter
  const parsed = rows
    .map(parseRow)
    .filter((r): r is SssTrackingRow => r !== null);

  const winners = parsed.filter(
    r => r.classification.toLowerCase() === "winner"
      && r.spend >= input.min_spend_threshold
      && isVideoAsset(r),
  );

  if (winners.length === 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "warning",
      message: `No video Winners found with spend >= $${input.min_spend_threshold} (image assets filtered out)`,
      recovery_action: "halt",
      context: { step: "tess_analyst" },
    };
  }

  // Step 3: Group by script
  const groups = groupByScript(winners);

  // Step 4: Score and rank
  const opportunities = scoreOpportunities(groups, input.max_recommendations);

  if (opportunities.length === 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "warning",
      message: "All Winner scripts have been fully exploited (no unexploited expansion types)",
      recovery_action: "halt",
      context: { step: "tess_analyst" },
    };
  }

  // Step 5: Build summary
  const p0Count = opportunities.filter(o => o.priority === "P0").length;
  const p1Count = opportunities.filter(o => o.priority === "P1").length;
  const p2Count = opportunities.filter(o => o.priority === "P2").length;
  const avgScore = opportunities.reduce((sum, o) => sum + o.score, 0) / opportunities.length;

  const funnelCounts = new Map<string, number>();
  for (const opp of opportunities) {
    funnelCounts.set(opp.funnel, (funnelCounts.get(opp.funnel) ?? 0) + 1);
  }
  const topFunnel = Array.from(funnelCounts.entries())
    .sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";

  return {
    status: "SUCCESS",
    data: {
      opportunities,
      total_winners_analyzed: winners.length,
      total_rows_scanned: rows.length,
      summary: {
        p0_count: p0Count,
        p1_count: p1Count,
        p2_count: p2Count,
        avg_score: avgScore,
        top_funnel: topFunnel,
      },
    },
  };
}
