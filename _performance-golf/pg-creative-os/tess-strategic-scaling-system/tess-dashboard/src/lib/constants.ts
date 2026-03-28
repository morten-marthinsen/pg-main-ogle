/**
 * Funnel code → Offer name mapping.
 * Source: TESS-NAMING-CONVENTION.md + SSS Lookup Tables
 */
export const FUNNEL_TO_OFFER: Record<string, string> = {
  // Digital products
  "357": "357 Fairway Hybrid",
  "ossf": "One Shot Slice Fix",
  "ssts": "Simple Strike Sequence",
  "wpss": "WPSS",
  "dqfe": "DQFE Quiz (SSTS/WPSS)",
  "dqfe1": "DQFE1 Quiz (PG1)",
  "pgf": "PG Fitness",
  "clst": "Catalyst",
  "sf1": "SF1 Driver",
  "sf2": "SF2 Driver",
  "pg1": "PG1",
  "htkt": "Hot Ticket",
  "gbf": "GBF",
  "ghd": "GHD",
  "spd": "SpeedTrack",
  // Physical products
  "wdg1": "ONE.1 Wedge",
  "ssp": "SwingSmooth PRO",
  "rs1": "RS1 Putter",
  // Platform aggregates (not real funnels)
  "pmax": "PMax",
  "search": "Search",
  "shopping": "Shopping",
  "microsoft": "Microsoft Ads",
};

/**
 * Parse funnel code from an ad name.
 * The funnel is always the first segment before the first hyphen.
 * Falls back to the full ad name for platform aggregates.
 */
export function parseFunnelFromAdName(adName: string): string {
  if (!adName) return "";
  const parts = adName.split("-");
  if (parts.length >= 2) {
    return parts[0].trim();
  }
  // Platform aggregates: "pmax", "shopping ad", "search ad", "microsoft ads (no ad name)"
  const lower = adName.toLowerCase().trim();
  if (lower.startsWith("pmax")) return "pmax";
  if (lower.startsWith("shopping")) return "shopping";
  if (lower.startsWith("search")) return "search";
  if (lower.startsWith("microsoft")) return "microsoft";
  return "";
}

/**
 * Get the human-readable offer name for a funnel code.
 */
export function getOfferName(funnelCode: string): string {
  if (!funnelCode) return "Other";
  const offer = FUNNEL_TO_OFFER[funnelCode.toLowerCase()];
  return offer ?? funnelCode.toUpperCase();
}

/** Expansion type codes → human names */
export const EXPANSION_TYPES: Record<string, string> = {
  hs: "Hook Stack",
  hr: "Hook Refresh",
  ssr: "Scroll Stopper Refresh",
  dur: "Duration",
  env: "Environment",
  sp: "Similar Presenter",
  dp: "Different Presenter",
  af: "Ad Format",
  cf: "Copy Framework",
  int: "International",
  xx: "N/A",
};

/** Asset type codes → human names */
export const ASSET_TYPES: Record<string, string> = {
  pod: "Podcast",
  tlr: "Tele-Ronin",
  sad: "Slice & Dice",
  bvo: "Human VO + B-Roll",
  avo: "AI VO",
  img: "Image",
  aip: "Actor/Influencer Paid",
  aio: "Actor/Influencer Organic",
  gru: "Guru",
  cdn: "Cutdown",
};
