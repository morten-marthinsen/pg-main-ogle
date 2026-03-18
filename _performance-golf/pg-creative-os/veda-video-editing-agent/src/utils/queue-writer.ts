/**
 * Queue Writer — writes tess-analyst recommendations to the Veda Intake Queue.
 *
 * Converts ExpansionOpportunity objects into intake queue rows and appends
 * them as PENDING entries. Deduplicates against existing PENDING/CLAIMED
 * entries to avoid double-recommendations.
 */

import type { SheetsWriter, ExpansionOpportunity } from "../types/pipeline.js";
import { QUEUE_SHEET } from "./intake-queue.js";

// ── Types ───────────────────────────────────────────────────────────────

export interface QueueWriterInput {
  spreadsheet_id: string;
  opportunities: ExpansionOpportunity[];
  source: string;                     // "tess-analyst" or "human"
  deduplicate: boolean;               // check for existing PENDING/CLAIMED entries
}

export interface QueueWriterOutput {
  rows_written: number;
  skipped_duplicates: number;
  written_asset_ids: string[];
}

// ── Helpers ─────────────────────────────────────────────────────────────

/** Queue column indices (matches QCOL in intake-queue.ts). */
const QCOL = {
  STATUS: 0,
  PRIORITY: 1,
  SOURCE: 2,
  CREATED_AT: 3,
  SOURCE_ASSET_ID: 4,
  EXPANSION_TYPE: 5,
  ROOT_ANGLE_NAME: 6,
  TARGET_VARIATIONS: 7,
  EDIT_METHOD: 8,
  DIRECTING_PERSON: 9,
  SPECIAL_INSTRUCTIONS: 10,
  PLATFORM: 11,
  DIMENSIONS: 12,
  LENGTH_TIER: 13,
  COUNTRY_CODE: 14,
  TALENT_CODE: 15,
  ASSET_TYPE: 16,
  NOTES: 17,
  ICONIK_ASSET_UUID: 18,
  HOOK_1_SOURCE: 19,
  HOOK_1_START: 20,
  HOOK_1_END: 21,
  HOOK_2_SOURCE: 22,
  HOOK_2_START: 23,
  HOOK_2_END: 24,
  HOOK_3_SOURCE: 25,
  HOOK_3_START: 26,
  HOOK_3_END: 27,
  HOOK_RATIONALE: 28,
} as const;

/**
 * Convert an ExpansionOpportunity to a 29-element intake queue row (A-AC).
 * Hook columns (T-AC) are left empty on initial write — populated after hook selection.
 */
export function opportunityToRow(opp: ExpansionOpportunity, source: string): string[] {
  const row = new Array(29).fill("");
  row[QCOL.STATUS] = "PENDING";
  row[QCOL.PRIORITY] = opp.priority;
  row[QCOL.SOURCE] = source;
  row[QCOL.CREATED_AT] = new Date().toISOString();
  row[QCOL.SOURCE_ASSET_ID] = opp.source_asset_id;
  row[QCOL.EXPANSION_TYPE] = opp.recommended_expansion_type;
  row[QCOL.ROOT_ANGLE_NAME] = opp.root_angle_name;
  row[QCOL.TARGET_VARIATIONS] = "3";
  row[QCOL.EDIT_METHOD] = "assembly";
  row[QCOL.DIRECTING_PERSON] = "co";
  row[QCOL.NOTES] = opp.reasoning;
  return row;
}

/**
 * Build cell update data for writing hook selection results back to a queue row.
 * Returns the range (T{row}:AC{row}) and values for columns T-AC.
 */
export interface HookWriteData {
  range: string;
  values: string[][];
}

export function writeHooksToRow(
  rowIndex: number,
  hooks: Array<{ source_asset_id: string; start_seconds: number; end_seconds: number }>,
  rationale: string,
): HookWriteData {
  // T-AB = 3 hook slots x 3 cols each, AC = rationale
  const cells = new Array(10).fill("");

  for (let i = 0; i < Math.min(hooks.length, 3); i++) {
    const offset = i * 3;
    cells[offset] = hooks[i].source_asset_id;
    cells[offset + 1] = hooks[i].start_seconds.toString();
    cells[offset + 2] = hooks[i].end_seconds.toString();
  }
  cells[9] = rationale;

  return {
    range: `T${rowIndex}:AC${rowIndex}`,
    values: [cells],
  };
}

/**
 * Find existing PENDING/CLAIMED entries in the queue that match
 * a given source_asset_id + expansion_type combo.
 */
async function findActiveDuplicates(
  spreadsheetId: string,
  writer: SheetsWriter,
): Promise<Set<string>> {
  const rows = await writer.getRows(spreadsheetId, QUEUE_SHEET, "A2:R");
  const active = new Set<string>();

  for (const row of rows) {
    const status = (row[QCOL.STATUS] ?? "").toUpperCase().trim();
    if (status !== "PENDING" && status !== "CLAIMED") continue;

    const assetId = (row[QCOL.SOURCE_ASSET_ID] ?? "").trim();
    const expType = (row[QCOL.EXPANSION_TYPE] ?? "").trim();
    if (assetId && expType) {
      active.add(`${assetId}::${expType}`);
    }
  }

  return active;
}

// ── Main ────────────────────────────────────────────────────────────────

/**
 * Write expansion opportunities to the Veda Intake Queue as PENDING rows.
 * Deduplicates against existing PENDING/CLAIMED entries when deduplicate=true.
 */
export async function writeRecommendations(
  input: QueueWriterInput,
  writer: SheetsWriter,
): Promise<QueueWriterOutput> {
  if (input.opportunities.length === 0) {
    return { rows_written: 0, skipped_duplicates: 0, written_asset_ids: [] };
  }

  let activeDuplicates = new Set<string>();
  if (input.deduplicate) {
    activeDuplicates = await findActiveDuplicates(input.spreadsheet_id, writer);
  }

  let skippedDuplicates = 0;
  const rowsToWrite: string[][] = [];
  const writtenAssetIds: string[] = [];

  for (const opp of input.opportunities) {
    const key = `${opp.source_asset_id}::${opp.recommended_expansion_type}`;

    if (input.deduplicate && activeDuplicates.has(key)) {
      skippedDuplicates++;
      continue;
    }

    rowsToWrite.push(opportunityToRow(opp, input.source));
    writtenAssetIds.push(opp.source_asset_id);
  }

  if (rowsToWrite.length === 0) {
    return { rows_written: 0, skipped_duplicates: skippedDuplicates, written_asset_ids: [] };
  }

  const result = await writer.appendRows(input.spreadsheet_id, QUEUE_SHEET, rowsToWrite);

  return {
    rows_written: result.updatedRows,
    skipped_duplicates: skippedDuplicates,
    written_asset_ids: writtenAssetIds,
  };
}
