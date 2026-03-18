/**
 * sheets_updater — Veda's data custodian.
 *
 * Single point of contact between Veda and the SSS (Strategic Scaling System)
 * spreadsheet. Operates in two modes:
 *
 * READ (Step 3 — CONFIRM & RESERVE):
 *   Given a funnel + script_id, scans Ad Level Tracking for existing variation
 *   numbers and returns the next available sequential batch.
 *
 * WRITE (Step 10 — UPDATE TRACKING):
 *   After an asset is APPROVED AND LAUNCHED, records new entries to the
 *   Ad Level Tracking sheet. Never writes before approval. Append-only.
 *
 * Uses SheetsReader/SheetsWriter abstractions so core logic is testable
 * without real Google Sheets API calls.
 */

import type {
  SheetsReader,
  SheetsWriter,
  SheetsLookupInput,
  SheetsLookupOutput,
  SheetsWriteInput,
  SheetsWriteOutput,
  SheetsWriteEntry,
} from "../../types/pipeline.js";
import type { SubAgentResult } from "../../types/sub-agent.js";

const DEFAULT_SHEET = "Ad Level Tracking (Current State)";

// Column indices in Ad Level Tracking (0-based)
const COL = {
  FUNNEL: 0,        // A
  SCRIPT_ID: 1,     // B
  ROOT_ANGLE: 2,    // C
  ASSET_ID: 3,      // D
  PLATFORM: 4,      // E
  DIMENSIONS: 5,    // F
  LENGTH_TIER: 6,   // G
  AD_CATEGORY: 7,   // H
  EXPANSION_TYPE: 8, // I
  ASSET_TYPE: 9,    // J
  TALENT: 10,       // K
  EDITOR: 11,       // L
  COPYWRITER: 12,   // M
  COUNTRY_CODE: 13, // N
  CREATION_DATE: 14, // O
  STATUS: 15,       // P
  SPEND: 16,        // Q
  NET_REVENUE: 17,  // R
  ROAS: 18,         // S
  CLASSIFICATION: 19, // T
  FORMAT_TYPE: 20,  // U
} as const;

/**
 * Extract variation number from an Asset ID string.
 * Handles messy real-world IDs:
 *   - "357-0021-v0001-9x16-nnmu-vd-..." → "v0001"
 *   - "357-i023-v006-bfcm" → "v006"  (3-digit)
 *   - "sf1-0001-v0681-..." → "v0681"
 *   - IDs with " - copy 2" suffixes, ".mp4" extensions
 *
 * Returns null if no variation number found.
 */
export function extractVariationNumber(assetId: string): string | null {
  // Match v followed by 1-4 digits, as a hyphen-separated segment or at string boundary
  const match = assetId.match(/(?:^|-)(v\d{1,4})(?:-|$|\s|\.)/i);
  if (!match) return null;

  const raw = match[1].toLowerCase();
  // Normalize to v + 4 digits (e.g., v006 → v0006)
  const digits = raw.slice(1);
  return `v${digits.padStart(4, "0")}`;
}

/**
 * Find all existing variation numbers for a funnel + script_id combo.
 * Scans the Asset ID column for matching rows, extracts variation numbers.
 */
export function findExistingVariations(
  rows: string[][],
  funnel: string,
  scriptId: string,
): string[] {
  const normalizedFunnel = funnel.toLowerCase().trim();
  const normalizedScript = scriptId.toLowerCase().trim();

  const variations = new Set<string>();

  for (const row of rows) {
    const rowFunnel = (row[COL.FUNNEL] ?? "").toLowerCase().trim();
    const rowScript = (row[COL.SCRIPT_ID] ?? "").toLowerCase().trim();

    if (rowFunnel !== normalizedFunnel || rowScript !== normalizedScript) {
      continue;
    }

    const assetId = row[COL.ASSET_ID] ?? "";
    const variation = extractVariationNumber(assetId);
    if (variation) {
      variations.add(variation);
    }
  }

  return Array.from(variations).sort();
}

/**
 * Calculate the next N sequential variation numbers after the highest existing one.
 */
export function calculateNextVariations(
  existing: string[],
  count: number,
): string[] {
  let maxNum = 0;
  for (const v of existing) {
    const digits = v.slice(1);
    const num = parseInt(digits, 10);
    if (num > maxNum) maxNum = num;
  }

  const reserved: string[] = [];
  for (let i = 1; i <= count; i++) {
    const nextNum = maxNum + i;
    reserved.push(`v${String(nextNum).padStart(4, "0")}`);
  }
  return reserved;
}

/**
 * READ mode: Look up existing variations and reserve next available numbers.
 */
export async function lookupVariations(
  input: SheetsLookupInput,
  reader: SheetsReader,
): Promise<SubAgentResult<SheetsLookupOutput>> {
  // Validate inputs
  if (!input.funnel || !input.funnel.trim()) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "funnel is required for variation lookup",
      recovery_action: "halt",
      context: { step: "sheets_updater.read" },
    };
  }
  if (!input.script_id || !input.script_id.trim()) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "script_id is required for variation lookup",
      recovery_action: "halt",
      context: { step: "sheets_updater.read" },
    };
  }
  if (!input.target_count || input.target_count < 1) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "target_count must be >= 1",
      recovery_action: "halt",
      context: { step: "sheets_updater.read" },
    };
  }

  const sheet = input.sheet_name ?? DEFAULT_SHEET;

  let rows: string[][];
  try {
    // Fetch all data rows (skip header). Range A2:U covers all columns we need.
    rows = await reader.getRows(input.spreadsheet_id, sheet, "A2:U");
  } catch (err) {
    return {
      status: "FAILED",
      error_category: "SHEETS_ERROR",
      severity: "error",
      message: `Failed to read spreadsheet: ${err instanceof Error ? err.message : String(err)}`,
      recovery_action: "retry",
      context: { step: "sheets_updater.read" },
    };
  }

  const existing = findExistingVariations(rows, input.funnel, input.script_id);
  const reserved = calculateNextVariations(existing, input.target_count);

  return {
    status: "SUCCESS",
    data: {
      next_variation_number: reserved[0],
      existing_variations: existing,
      reserved_numbers: reserved,
      total_rows_scanned: rows.length,
    },
  };
}

/**
 * Convert a SheetsWriteEntry to a row array matching the Ad Level Tracking columns.
 */
function entryToRow(entry: SheetsWriteEntry): string[] {
  const row: string[] = new Array(21).fill("");
  row[COL.FUNNEL] = entry.funnel;
  row[COL.SCRIPT_ID] = entry.script_id;
  row[COL.ROOT_ANGLE] = entry.root_angle_name;
  row[COL.ASSET_ID] = entry.asset_id;
  row[COL.PLATFORM] = entry.platform;
  row[COL.DIMENSIONS] = entry.dimensions;
  row[COL.LENGTH_TIER] = entry.length_tier;
  row[COL.AD_CATEGORY] = entry.ad_category;
  row[COL.EXPANSION_TYPE] = entry.expansion_type;
  row[COL.ASSET_TYPE] = entry.asset_type;
  row[COL.TALENT] = entry.talent;
  row[COL.EDITOR] = entry.editor_name;
  row[COL.COPYWRITER] = entry.copywriter_name;
  row[COL.COUNTRY_CODE] = entry.country_code;
  row[COL.CREATION_DATE] = entry.creation_date;
  row[COL.STATUS] = entry.status;
  row[COL.CLASSIFICATION] = entry.classification;
  return row;
}

/**
 * WRITE mode: Append new asset entries to the Ad Level Tracking sheet.
 * Only call this AFTER an asset is APPROVED AND LAUNCHED (Step 10).
 */
export async function writeTracking(
  input: SheetsWriteInput,
  writer: SheetsWriter,
): Promise<SubAgentResult<SheetsWriteOutput>> {
  // Validate inputs
  if (!input.entries || input.entries.length === 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "No entries to write",
      recovery_action: "halt",
      context: { step: "sheets_updater.write" },
    };
  }

  for (const entry of input.entries) {
    if (!entry.asset_id) {
      return {
        status: "FAILED",
        error_category: "VALIDATION_ERROR",
        severity: "error",
        message: "Every entry must have an asset_id",
        recovery_action: "halt",
        context: { step: "sheets_updater.write" },
      };
    }
    if (!entry.root_angle_name) {
      return {
        status: "FAILED",
        error_category: "VALIDATION_ERROR",
        severity: "error",
        message: `Entry ${entry.asset_id} is missing root_angle_name`,
        recovery_action: "halt",
        context: { step: "sheets_updater.write", asset_ids: [entry.asset_id] },
      };
    }
  }

  const sheet = input.sheet_name ?? DEFAULT_SHEET;

  // Check for duplicate variation numbers before writing
  let existingRows: string[][];
  try {
    existingRows = await writer.getRows(input.spreadsheet_id, sheet, "A2:U");
  } catch (err) {
    return {
      status: "FAILED",
      error_category: "SHEETS_ERROR",
      severity: "error",
      message: `Failed to read spreadsheet for duplicate check: ${err instanceof Error ? err.message : String(err)}`,
      recovery_action: "retry",
      context: { step: "sheets_updater.write" },
    };
  }

  // Build set of all existing asset IDs for duplicate detection
  const existingAssetIds = new Set<string>();
  for (const row of existingRows) {
    const aid = (row[COL.ASSET_ID] ?? "").toLowerCase().trim();
    if (aid) existingAssetIds.add(aid);
  }

  // Check for duplicates
  for (const entry of input.entries) {
    if (existingAssetIds.has(entry.asset_id.toLowerCase().trim())) {
      return {
        status: "FAILED",
        error_category: "DUPLICATE_ERROR",
        severity: "critical",
        message: `Asset ID already exists in spreadsheet: ${entry.asset_id}`,
        recovery_action: "halt",
        context: { step: "sheets_updater.write", asset_ids: [entry.asset_id] },
      };
    }
  }

  // Convert entries to rows and append
  const rows = input.entries.map(entryToRow);

  let appendResult: { updatedRows: number };
  try {
    appendResult = await writer.appendRows(input.spreadsheet_id, sheet, rows);
  } catch (err) {
    return {
      status: "FAILED",
      error_category: "SHEETS_ERROR",
      severity: "error",
      message: `Failed to write to spreadsheet: ${err instanceof Error ? err.message : String(err)}`,
      recovery_action: "retry",
      context: {
        step: "sheets_updater.write",
        asset_ids: input.entries.map((e) => e.asset_id),
      },
    };
  }

  // Verify write succeeded
  const verification: "VERIFIED" | "UNVERIFIED" =
    appendResult.updatedRows === input.entries.length ? "VERIFIED" : "UNVERIFIED";

  return {
    status: "SUCCESS",
    data: {
      rows_written: appendResult.updatedRows,
      verification_status: verification,
      written_asset_ids: input.entries.map((e) => e.asset_id),
    },
  };
}
