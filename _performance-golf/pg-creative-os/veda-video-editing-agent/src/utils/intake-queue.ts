/**
 * Intake Queue — bridge between Tess and Veda.
 *
 * Reads expansion recommendations from the "Veda Intake Queue" tab in SSS.
 * Tess (or a human) writes PENDING rows. Veda claims and processes them.
 *
 * Queue lifecycle: PENDING → CLAIMED → COMPLETED | FAILED
 */

import type { RawIntake, EditMethod, SheetsReader } from "../types/pipeline.js";
import type { SheetsUpdater } from "./google-sheets-client.js";

export const QUEUE_SHEET = "Veda Intake Queue";

/** Column indices in the Veda Intake Queue tab (0-based). */
const QCOL = {
  STATUS: 0,              // A — Queue Status
  PRIORITY: 1,            // B — Priority (P0, P1, P2)
  SOURCE: 2,              // C — Source (tess, human)
  CREATED_AT: 3,          // D — Created At
  SOURCE_ASSET_ID: 4,     // E — Source Asset ID
  EXPANSION_TYPE: 5,      // F — Expansion Type
  ROOT_ANGLE_NAME: 6,     // G — Root Angle Name
  TARGET_VARIATIONS: 7,   // H — Target Variations
  EDIT_METHOD: 8,         // I — Edit Method
  DIRECTING_PERSON: 9,    // J — Directing Person
  SPECIAL_INSTRUCTIONS: 10, // K — Special Instructions
  PLATFORM: 11,           // L — Platform (optional override)
  DIMENSIONS: 12,         // M — Dimensions (optional override)
  LENGTH_TIER: 13,        // N — Length Tier (optional override)
  COUNTRY_CODE: 14,       // O — Country Code (optional override)
  TALENT_CODE: 15,        // P — Talent Code (optional override)
  ASSET_TYPE: 16,         // Q — Asset Type (optional override)
  NOTES: 17,              // R — Notes
  ICONIK_ASSET_UUID: 18,  // S — Iconik Asset UUID (optional — skips search if provided)
  HOOK_1_SOURCE: 19,      // T — Hook 1 source asset ID
  HOOK_1_START: 20,       // U — Hook 1 start timestamp
  HOOK_1_END: 21,         // V — Hook 1 end timestamp
  HOOK_2_SOURCE: 22,      // W — Hook 2 source asset ID
  HOOK_2_START: 23,       // X — Hook 2 start timestamp
  HOOK_2_END: 24,         // Y — Hook 2 end timestamp
  HOOK_3_SOURCE: 25,      // Z — Hook 3 source asset ID
  HOOK_3_START: 26,       // AA — Hook 3 start timestamp
  HOOK_3_END: 27,         // AB — Hook 3 end timestamp
  HOOK_RATIONALE: 28,     // AC — Shared hook selection rationale
} as const;

/** A parsed queue entry ready for Veda's pipeline. */
export interface QueueEntry {
  /** 1-based row number in the sheet (row 1 = header, row 2 = first data row). */
  rowIndex: number;
  intake: RawIntake;
  priority: string;
  source: string;
  notes: string;
  /** Iconik asset UUID — if provided, skips search and fetches directly. */
  iconik_asset_uuid?: string;
  /** Pre-selected hooks (0-3 items). Populated by hook-selector or manually in the sheet. */
  hooks?: Array<{
    source_asset_id: string;
    start_seconds: number;
    end_seconds: number;
  }>;
  /** Shared hook selection rationale (data evidence). */
  hook_rationale?: string;
}

/**
 * Parse a hook timestamp string into seconds.
 * Supports: "3.5" (raw seconds), "00:03.5" (MM:SS), "0:03" (M:SS), "00:00:03.5" (HH:MM:SS).
 */
export function parseHookTimestamp(raw: string): number {
  const trimmed = raw.trim();
  if (!trimmed) return 0;

  // Try raw number first (e.g., "3.5")
  const asNumber = parseFloat(trimmed);
  if (!trimmed.includes(":") && Number.isFinite(asNumber)) return asNumber;

  // Split by colon: could be M:SS, MM:SS, or HH:MM:SS
  const parts = trimmed.split(":");
  if (parts.length === 2) {
    const mins = parseInt(parts[0], 10) || 0;
    const secs = parseFloat(parts[1]) || 0;
    return mins * 60 + secs;
  }
  if (parts.length === 3) {
    const hrs = parseInt(parts[0], 10) || 0;
    const mins = parseInt(parts[1], 10) || 0;
    const secs = parseFloat(parts[2]) || 0;
    return hrs * 3600 + mins * 60 + secs;
  }

  return asNumber || 0;
}

/**
 * Parse a single spreadsheet row into a QueueEntry.
 * Returns null if the row is missing required fields.
 */
export function parseQueueRow(row: string[], rowIndex: number): QueueEntry | null {
  const sourceAssetId = (row[QCOL.SOURCE_ASSET_ID] ?? "").trim();
  const expansionType = (row[QCOL.EXPANSION_TYPE] ?? "").trim();

  if (!sourceAssetId || !expansionType) return null;

  const intake: RawIntake = {
    source_asset_id: sourceAssetId,
    expansion_type: expansionType,
    root_angle_name: (row[QCOL.ROOT_ANGLE_NAME] ?? "").trim(),
    target_variations: parseInt(row[QCOL.TARGET_VARIATIONS] ?? "3", 10) || 3,
    edit_method: ((row[QCOL.EDIT_METHOD] ?? "assembly").trim() || "assembly") as EditMethod,
    directing_person: (row[QCOL.DIRECTING_PERSON] ?? "co").trim() || "co",
    special_instructions: row[QCOL.SPECIAL_INSTRUCTIONS]?.trim() || null,
  };

  // Optional overrides — only set if non-empty
  const optionalField = (col: number): string | undefined => {
    const val = (row[col] ?? "").trim();
    return val || undefined;
  };

  if (optionalField(QCOL.PLATFORM)) intake.platform = optionalField(QCOL.PLATFORM);
  if (optionalField(QCOL.DIMENSIONS)) intake.dimensions = optionalField(QCOL.DIMENSIONS);
  if (optionalField(QCOL.LENGTH_TIER)) intake.length_tier = optionalField(QCOL.LENGTH_TIER);
  if (optionalField(QCOL.COUNTRY_CODE)) intake.country_code = optionalField(QCOL.COUNTRY_CODE);
  if (optionalField(QCOL.TALENT_CODE)) intake.talent_code = optionalField(QCOL.TALENT_CODE);
  if (optionalField(QCOL.ASSET_TYPE)) intake.asset_type = optionalField(QCOL.ASSET_TYPE);

  const iconikUuid = (row[QCOL.ICONIK_ASSET_UUID] ?? "").trim() || undefined;
  const hookRationale = (row[QCOL.HOOK_RATIONALE] ?? "").trim() || undefined;

  // Parse up to 3 hooks from columns T-AB
  const hooks: Array<{ source_asset_id: string; start_seconds: number; end_seconds: number }> = [];
  const hookSlots = [
    { src: QCOL.HOOK_1_SOURCE, start: QCOL.HOOK_1_START, end: QCOL.HOOK_1_END },
    { src: QCOL.HOOK_2_SOURCE, start: QCOL.HOOK_2_START, end: QCOL.HOOK_2_END },
    { src: QCOL.HOOK_3_SOURCE, start: QCOL.HOOK_3_START, end: QCOL.HOOK_3_END },
  ];
  for (const slot of hookSlots) {
    const srcId = (row[slot.src] ?? "").trim();
    if (!srcId) continue;
    hooks.push({
      source_asset_id: srcId,
      start_seconds: parseHookTimestamp(row[slot.start] ?? ""),
      end_seconds: parseHookTimestamp(row[slot.end] ?? ""),
    });
  }

  return {
    rowIndex,
    intake,
    priority: (row[QCOL.PRIORITY] ?? "").trim(),
    source: (row[QCOL.SOURCE] ?? "").trim(),
    notes: (row[QCOL.NOTES] ?? "").trim(),
    iconik_asset_uuid: iconikUuid,
    hooks: hooks.length > 0 ? hooks : undefined,
    hook_rationale: hookRationale,
  };
}

/**
 * Read the first PENDING entry from the intake queue.
 * Returns null if no PENDING entries exist.
 */
export async function readNextPending(
  spreadsheetId: string,
  reader: SheetsReader,
): Promise<QueueEntry | null> {
  const rows = await reader.getRows(spreadsheetId, QUEUE_SHEET, "A2:AC");

  for (let i = 0; i < rows.length; i++) {
    const status = (rows[i][QCOL.STATUS] ?? "").toUpperCase().trim();
    if (status !== "PENDING") continue;

    const entry = parseQueueRow(rows[i], i + 2); // +2: skip header, 1-based
    if (entry) return entry;
  }

  return null;
}

/**
 * Mark a queue entry as CLAIMED by a specific pipeline run.
 */
export async function claimEntry(
  spreadsheetId: string,
  updater: SheetsUpdater,
  rowIndex: number,
  runId: string,
): Promise<void> {
  await updater.updateCells(spreadsheetId, QUEUE_SHEET, `A${rowIndex}`, [["CLAIMED"]]);
}

/**
 * Mark a queue entry as COMPLETED after successful pipeline run.
 */
export async function completeEntry(
  spreadsheetId: string,
  updater: SheetsUpdater,
  rowIndex: number,
): Promise<void> {
  await updater.updateCells(spreadsheetId, QUEUE_SHEET, `A${rowIndex}`, [["COMPLETED"]]);
}

/**
 * Mark a queue entry as FAILED after pipeline failure.
 */
export async function failEntry(
  spreadsheetId: string,
  updater: SheetsUpdater,
  rowIndex: number,
): Promise<void> {
  await updater.updateCells(spreadsheetId, QUEUE_SHEET, `A${rowIndex}`, [["FAILED"]]);
}
