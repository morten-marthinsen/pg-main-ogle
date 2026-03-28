/**
 * TESS Creative Strategy — Recommendation Engine
 *
 * Identifies Winners with unexploited expansion types and scores
 * each opportunity by ROAS, spend, coverage gap, and recency.
 *
 * Expansion priority order (within the same root angle):
 *   1. hs (Hook Stack) — lowest cost, highest signal
 *   2. ssr (Scroll Stopper Refresh)
 *   3. dur (Duration) — editorial only, no new footage
 *   4. hr (Hook Refresh)
 *   5. env (Environment)
 *   6. cf (Copy Framework)
 *   7. af (Ad Format)
 *   8. sp (Similar Presenter)
 *   9. dp (Different Presenter)
 *  10. int (International) — only for $15K+ spend
 */

import type { EnrichedAd } from "./types";

const ALL_EXPANSION_TYPES = ["hs", "ssr", "dur", "hr", "env", "cf", "af", "sp", "dp", "int"];

const EXPANSION_LABELS: Record<string, string> = {
  hs: "Hook Stack",
  ssr: "Scroll Stopper Refresh",
  dur: "Duration",
  hr: "Hook Refresh",
  env: "Environment Swap",
  cf: "Copy Framework",
  af: "Ad Format",
  sp: "Similar Presenter",
  dp: "Different Presenter",
  int: "International",
};

const EXPANSION_PRIORITY: Record<string, number> = {
  hs: 1, ssr: 2, dur: 3, hr: 4, env: 5, cf: 6, af: 7, sp: 8, dp: 9, int: 10,
};

const EXPANSION_DESCRIPTIONS: Record<string, string> = {
  hs: "Stack a new hook on the front of this winning asset. Lowest production cost, tests attention without changing the body.",
  ssr: "New 0-3s scroll-stopping opener. Tests the critical first impression moment.",
  dur: "Reassemble the best segments at a different length. Pure editorial — no new footage needed.",
  hr: "Reimagine the opening hook with a fresh creative concept.",
  env: "Change the visual setting/background while keeping the same presenter and script.",
  cf: "Apply a proven copywriting framework (PAS, AIDA, etc.) as overlay on the same visuals.",
  af: "Restructure the content format (e.g., podcast, slice-and-dice).",
  sp: "New talent with similar demographics delivering the same script.",
  dp: "Deliberately different talent — tests audience response to a new presenter type.",
  int: "Dub into a new language for international markets. Only for proven winners with significant spend.",
};

export interface Recommendation {
  /** Root angle key: funnel-scriptId */
  root_angle: string;
  /** Human-readable offer name */
  offer_name: string;
  /** The source winner ad (highest ROAS variation) */
  source_ad: string;
  /** Source ad Net ROAS */
  source_roas: number;
  /** Total spend across all variations of this root angle */
  total_spend: number;
  /** Number of existing variations */
  variation_count: number;
  /** Expansion types already in use */
  existing_expansions: string[];
  /** The recommended expansion type */
  expansion_type: string;
  /** Human label for expansion */
  expansion_label: string;
  /** Why this expansion */
  expansion_description: string;
  /** Composite score 0-100 */
  score: number;
  /** Priority: P0/P1/P2 */
  priority: "P0" | "P1" | "P2";
  /** 1-2 sentence data-driven reasoning */
  reasoning: string;
}

interface RootAngleGroup {
  key: string;
  funnel: string;
  script_id: string;
  offer_name: string;
  ads: EnrichedAd[];
  total_spend: number;
  best_roas: number;
  best_ad: string;
  existing_expansions: Set<string>;
}

function scoreRoas(roas: number): number {
  if (roas >= 3.0) return 100;
  if (roas >= 2.0) return 60;
  if (roas >= 1.5) return 45;
  if (roas >= 1.0) return 30;
  return 10;
}

function scoreSpend(spend: number): number {
  if (spend >= 25000) return 100;
  if (spend >= 10000) return 60;
  if (spend >= 5000) return 40;
  if (spend >= 2500) return 20;
  return 5;
}

function scoreCoverage(existingCount: number): number {
  if (existingCount === 0) return 100;
  if (existingCount === 1) return 80;
  if (existingCount === 2) return 60;
  if (existingCount <= 4) return 40;
  return 20;
}

function scoreRecency(ads: EnrichedAd[]): number {
  // Use variation_id as a proxy — higher variation numbers = more recent
  // This is imperfect but works without delivery dates in the data
  const maxVariation = Math.max(...ads.map((a) => {
    const v = a.variation_id.replace("v", "");
    return parseInt(v, 10) || 0;
  }));
  if (maxVariation >= 20) return 100; // Many variations = actively scaling
  if (maxVariation >= 10) return 70;
  if (maxVariation >= 5) return 50;
  return 30;
}

/**
 * Generate expansion recommendations from enriched ad data.
 * Returns scored, prioritized recommendations sorted by score descending.
 */
export function generateRecommendations(ads: EnrichedAd[]): Recommendation[] {
  // Step 1: Filter to winners only
  const winners = ads.filter((a) => a.classification === "winner");
  if (winners.length === 0) return [];

  // Step 2: Group by root angle (funnel + script_id)
  const groups = new Map<string, RootAngleGroup>();
  for (const ad of ads) {
    if (!ad.funnel || !ad.script_id) continue;
    const key = `${ad.funnel}-${ad.script_id}`;
    const existing = groups.get(key);
    if (existing) {
      existing.ads.push(ad);
      existing.total_spend += ad.spend;
      // Only use ROAS from classified ads (spend >= $2,500) to avoid inflated testing-class outliers
      if (ad.spend >= 2500 && !isNaN(ad.net_roas) && ad.net_roas > existing.best_roas) {
        existing.best_roas = ad.net_roas;
        existing.best_ad = ad.ad_name;
      }
      if (ad.expansion_type && ad.expansion_type !== "xx") {
        existing.existing_expansions.add(ad.expansion_type);
      }
    } else {
      const qualifiedRoas = ad.spend >= 2500 && !isNaN(ad.net_roas) ? ad.net_roas : 0;
      groups.set(key, {
        key,
        funnel: ad.funnel,
        script_id: ad.script_id,
        offer_name: ad.offer_name,
        ads: [ad],
        total_spend: ad.spend,
        best_roas: qualifiedRoas,
        best_ad: qualifiedRoas > 0 ? ad.ad_name : "",
        existing_expansions: new Set(
          ad.expansion_type && ad.expansion_type !== "xx" ? [ad.expansion_type] : []
        ),
      });
    }
  }

  // Step 3: Only keep groups that contain at least one winner
  const winnerKeys = new Set<string>();
  for (const ad of winners) {
    if (ad.funnel && ad.script_id) {
      winnerKeys.add(`${ad.funnel}-${ad.script_id}`);
    }
  }

  // Step 4: Generate recommendations for unexploited expansion types
  const recommendations: Recommendation[] = [];

  for (const [key, group] of Array.from(groups.entries())) {
    if (!winnerKeys.has(key)) continue;

    const unexploited = ALL_EXPANSION_TYPES.filter(
      (et) => !group.existing_expansions.has(et)
    );

    // Skip international unless spend is high enough
    const filteredExpansions = unexploited.filter(
      (et) => et !== "int" || group.total_spend >= 15000
    );

    // Pick the highest-priority unexploited expansion
    const sorted = filteredExpansions.sort(
      (a, b) => (EXPANSION_PRIORITY[a] ?? 99) - (EXPANSION_PRIORITY[b] ?? 99)
    );

    if (sorted.length === 0) continue;

    const bestExpansion = sorted[0];

    // Score
    const roasScore = scoreRoas(group.best_roas);
    const spendScore = scoreSpend(group.total_spend);
    const coverageScore = scoreCoverage(group.existing_expansions.size);
    const recencyScore = scoreRecency(group.ads);

    const score = Math.round(
      roasScore * 0.30 + spendScore * 0.25 + coverageScore * 0.25 + recencyScore * 0.20
    );

    let priority: "P0" | "P1" | "P2";
    if (score >= 75) priority = "P0";
    else if (score >= 50) priority = "P1";
    else priority = "P2";

    // Generate reasoning
    const roasPct = (group.best_roas * 100).toFixed(0);
    const expCount = group.existing_expansions.size;
    const totalExp = ALL_EXPANSION_TYPES.length;
    const reasoning = `${group.offer_name} angle ${group.script_id} is generating ${roasPct}% ROAS at ${fmt$(group.total_spend)} spend with ${expCount} of ${totalExp} expansion types explored. ${EXPANSION_LABELS[bestExpansion]} is the highest-priority untested expansion.`;

    recommendations.push({
      root_angle: key,
      offer_name: group.offer_name,
      source_ad: group.best_ad,
      source_roas: group.best_roas,
      total_spend: group.total_spend,
      variation_count: group.ads.length,
      existing_expansions: Array.from(group.existing_expansions),
      expansion_type: bestExpansion,
      expansion_label: EXPANSION_LABELS[bestExpansion] ?? bestExpansion,
      expansion_description: EXPANSION_DESCRIPTIONS[bestExpansion] ?? "",
      score,
      priority,
      reasoning,
    });
  }

  return recommendations.sort((a, b) => b.score - a.score);
}

function fmt$(v: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);
}
