/**
 * Hook Selector — finds diverse hooks from same-offer winners using Iconik transcriptions.
 *
 * Given a target asset (e.g., dqfe-0036), this module:
 * 1. Finds other Winner videos in the same offer (funnel prefix)
 * 2. Gets their Iconik transcriptions
 * 3. Detects "first complete thought" boundaries as natural hook endpoints
 * 4. Returns N diverse hook candidates (no two from the same script)
 *
 * Hooks = opening segments of OTHER winners in SAME offer.
 * Cross-offer hooks are FORBIDDEN.
 */

import type { TranscriptSegment, SheetsReader, SssTrackingRow } from "../types/pipeline.js";
import type { SubAgentResult } from "../types/sub-agent.js";
import type { IconikClient } from "./iconik-client.js";
import { parseRow } from "../sub-agents/tess-analyst/index.js";

// ── Types ────────────────────────────────────────────────────────────────

export interface HookCandidate {
  source_asset_id: string;
  source_iconik_uuid: string;
  start_seconds: number;       // always 0 (hook = opening)
  end_seconds: number;         // first-thought boundary
  duration_seconds: number;    // end - start
  transcript_text: string;     // spoken text in hook segment
  spend: number;               // donor's spend (for ranking)
  roas: number;                // donor's ROAS
}

export interface HookSelectionResult {
  hooks: HookCandidate[];
  rationale: string;
  winners_scanned: number;
  transcriptions_available: number;
}

export interface HookSelectorDeps {
  iconikClient: IconikClient;
  sheetsReader: SheetsReader;
  spreadsheetId: string;
}

export interface SelectHooksInput {
  target_asset_id: string;
  offer_prefix: string;
  target_variations: number;      // how many hooks to select (typically 3)
  min_hook_seconds?: number;      // default 2
  max_hook_seconds?: number;      // default 8
  fallback_hook_seconds?: number; // default 4
}

export interface ThoughtBoundary {
  end_seconds: number;
  text: string;
}

// ── Constants ────────────────────────────────────────────────────────────

const DEFAULT_SHEET = "Ad Level Tracking (Current State)";
const SENTENCE_ENDERS = /[.?!]$/;
const MAX_DONORS_TO_SCAN = 10;

/** Video asset types — matches tess-analyst. */
const VIDEO_ASSET_TYPES = new Set(["vd", "avo", "bvo", "tlr"]);
const IMAGE_ASSET_TYPES = new Set(["img", "aip", "aio", "gru", "cdn"]);

// ── Core Functions ───────────────────────────────────────────────────────

/**
 * Find the first complete thought boundary in transcript segments.
 *
 * Scans segments from t=0, looking for a sentence-ending punctuation mark
 * (. ? !) within the [min, max] range. If the first boundary falls below
 * min, continues scanning. If above max, clamps to max and snaps to the
 * nearest segment end. If no boundary found, uses fallback and snaps.
 */
export function findFirstThoughtBoundary(
  segments: TranscriptSegment[],
  minSeconds = 2,
  maxSeconds = 8,
  fallbackSeconds = 4,
): ThoughtBoundary {
  if (segments.length === 0) {
    return { end_seconds: fallbackSeconds, text: "" };
  }

  let accumulatedText = "";

  for (const seg of segments) {
    accumulatedText += (accumulatedText ? " " : "") + seg.text.trim();

    // Check if this segment's text ends with a sentence boundary
    if (SENTENCE_ENDERS.test(seg.text.trim())) {
      if (seg.end_time >= minSeconds && seg.end_time <= maxSeconds) {
        return { end_seconds: seg.end_time, text: accumulatedText };
      }
      if (seg.end_time > maxSeconds) {
        // Above max — clamp to max, snap to nearest segment end
        const snapped = snapToNearestSegmentEnd(segments, maxSeconds);
        const snappedText = collectTextUpTo(segments, snapped);
        return { end_seconds: snapped, text: snappedText };
      }
      // Below min — continue scanning for the next boundary
    }
  }

  // No sentence boundary found within range — use fallback, snap to nearest segment end
  const snapped = snapToNearestSegmentEnd(segments, fallbackSeconds);
  const snappedText = collectTextUpTo(segments, snapped);
  return { end_seconds: snapped, text: snappedText };
}

/** Snap a target time to the nearest segment end_time. */
function snapToNearestSegmentEnd(segments: TranscriptSegment[], targetSeconds: number): number {
  if (segments.length === 0) return targetSeconds;

  let closest = segments[0].end_time;
  let minDiff = Math.abs(closest - targetSeconds);

  for (const seg of segments) {
    const diff = Math.abs(seg.end_time - targetSeconds);
    if (diff < minDiff) {
      closest = seg.end_time;
      minDiff = diff;
    }
  }

  return closest;
}

/** Collect concatenated text from segments whose end_time is <= the boundary. */
function collectTextUpTo(segments: TranscriptSegment[], endSeconds: number): string {
  const parts: string[] = [];
  for (const seg of segments) {
    if (seg.end_time > endSeconds) break;
    parts.push(seg.text.trim());
  }
  return parts.join(" ");
}

/**
 * Extract script_id from an asset ID string.
 * Format: {funnel}-{script}-{version}-... → script is position 1 (0-indexed).
 * For old-format IDs, takes the second segment.
 */
export function extractScriptId(assetId: string): string {
  const parts = assetId.split("-");
  return parts[1] ?? "";
}

/**
 * Find same-offer Winners from the SSS Ad Level Tracking sheet.
 *
 * Filters for:
 * - Same funnel (offer prefix)
 * - Classification = "Winner"
 * - Video asset (not image)
 * - Different script_id from target (hooks come from OTHER scripts)
 *
 * Sorted by spend descending.
 */
export async function findSameOfferWinners(
  offerPrefix: string,
  targetAssetId: string,
  deps: Pick<HookSelectorDeps, "sheetsReader" | "spreadsheetId">,
): Promise<SssTrackingRow[]> {
  const rows = await deps.sheetsReader.getRows(
    deps.spreadsheetId,
    DEFAULT_SHEET,
    "A2:U",
  );

  const targetScriptId = extractScriptId(targetAssetId);

  return rows
    .map(parseRow)
    .filter((r): r is SssTrackingRow => r !== null)
    .filter(r => {
      // Same funnel (offer)
      if (r.funnel.toLowerCase() !== offerPrefix.toLowerCase()) return false;
      // Must be a Winner
      if (r.classification.toLowerCase() !== "winner") return false;
      // Must be video (not image)
      if (!isVideoAsset(r)) return false;
      // Must be from a different script
      if (extractScriptId(r.asset_id) === targetScriptId) return false;
      return true;
    })
    .sort((a, b) => b.spend - a.spend);
}

/** Check if a tracking row represents a video asset. Mirrors tess-analyst logic. */
function isVideoAsset(row: SssTrackingRow): boolean {
  const colType = row.asset_type.toLowerCase();
  if (colType && colType !== "—" && colType !== "-") {
    if (VIDEO_ASSET_TYPES.has(colType)) return true;
    if (IMAGE_ASSET_TYPES.has(colType)) return false;
    // Unrecognized type (e.g. dates like "20251212") — fall through to ID-based check
  }
  const idLower = row.asset_id.toLowerCase();
  for (const imgType of IMAGE_ASSET_TYPES) {
    if (idLower.includes(`-${imgType}-`)) return false;
  }
  for (const vidType of VIDEO_ASSET_TYPES) {
    if (idLower.includes(`-${vidType}-`)) return true;
  }
  return true;
}

/**
 * Select N diverse hooks from same-offer winners using Iconik transcriptions.
 *
 * Diversity rule: no two hooks from the same script_id.
 */
export async function selectHooks(
  input: SelectHooksInput,
  deps: HookSelectorDeps,
): Promise<SubAgentResult<HookSelectionResult>> {
  const minSec = input.min_hook_seconds ?? 2;
  const maxSec = input.max_hook_seconds ?? 8;
  const fallbackSec = input.fallback_hook_seconds ?? 4;
  const needed = input.target_variations;

  // Step 1: Find same-offer winners
  let winners: SssTrackingRow[];
  try {
    winners = await findSameOfferWinners(input.offer_prefix, input.target_asset_id, deps);
  } catch (err) {
    return {
      status: "FAILED",
      error_category: "SHEETS_ERROR",
      severity: "error",
      message: `Failed to read SSS for same-offer winners: ${err instanceof Error ? err.message : String(err)}`,
      recovery_action: "retry",
      context: { step: "hook_selector" },
    };
  }

  if (winners.length === 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: `No same-offer Winners found for prefix "${input.offer_prefix}" (excluding target script)`,
      recovery_action: "halt",
      context: { step: "hook_selector", asset_ids: [input.target_asset_id] },
    };
  }

  // Step 2: Scan donors for transcriptions and extract hooks
  const candidates: HookCandidate[] = [];
  const usedScriptIds = new Set<string>();
  let transcriptionsAvailable = 0;

  const donorsToScan = winners.slice(0, MAX_DONORS_TO_SCAN);

  for (const donor of donorsToScan) {
    const donorScriptId = extractScriptId(donor.asset_id);

    // Diversity: skip if we already have a hook from this script
    if (usedScriptIds.has(donorScriptId)) continue;

    // Search Iconik for the donor asset
    let iconikUuid: string;
    try {
      const assetName = donor.asset_id;
      const results = await deps.iconikClient.searchByName(assetName, 5);
      if (results.length === 0) continue; // not found in Iconik, skip
      iconikUuid = results[0].id;
    } catch {
      continue; // Iconik search failed, skip this donor
    }

    // Check transcription status
    try {
      const status = await deps.iconikClient.getTranscribeStatus(iconikUuid);
      if (status.status !== "DONE" && status.status !== "COMPLETED") continue; // not transcribed, skip
    } catch {
      continue;
    }

    // Get transcription
    let segments: TranscriptSegment[];
    try {
      const result = await deps.iconikClient.getTranscription(iconikUuid);
      segments = result.segments;
      if (segments.length === 0) continue; // empty transcription
      transcriptionsAvailable++;
    } catch {
      continue;
    }

    // Find first-thought boundary
    const boundary = findFirstThoughtBoundary(segments, minSec, maxSec, fallbackSec);

    candidates.push({
      source_asset_id: donor.asset_id,
      source_iconik_uuid: iconikUuid,
      start_seconds: 0,
      end_seconds: boundary.end_seconds,
      duration_seconds: boundary.end_seconds,
      transcript_text: boundary.text,
      spend: donor.spend,
      roas: donor.roas,
    });

    usedScriptIds.add(donorScriptId);

    // Stop early if we have enough
    if (candidates.length >= needed) break;
  }

  // Step 3: Check if we have enough hooks
  if (candidates.length < needed) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: `Only found ${candidates.length} diverse hooks from ${donorsToScan.length} donors (need ${needed}). ${transcriptionsAvailable} had transcriptions. Ensure same-offer winners are transcribed in Iconik.`,
      recovery_action: "halt",
      context: { step: "hook_selector", asset_ids: [input.target_asset_id] },
    };
  }

  // Build rationale
  const hookSummaries = candidates.map((h, i) =>
    `Hook ${i + 1}: ${h.source_asset_id} (${h.duration_seconds.toFixed(1)}s, $${h.spend.toFixed(0)} spend) — "${h.transcript_text.slice(0, 60)}${h.transcript_text.length > 60 ? "..." : ""}"`,
  );

  const rationale = [
    `Selected ${candidates.length} hooks from ${winners.length} same-offer winners (${input.offer_prefix}).`,
    `Scanned ${donorsToScan.length} donors, ${transcriptionsAvailable} had transcriptions.`,
    ...hookSummaries,
  ].join("\n");

  return {
    status: "SUCCESS",
    data: {
      hooks: candidates,
      rationale,
      winners_scanned: donorsToScan.length,
      transcriptions_available: transcriptionsAvailable,
    },
  };
}
