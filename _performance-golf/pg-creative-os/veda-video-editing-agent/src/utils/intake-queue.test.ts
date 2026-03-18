import { describe, it, expect, vi } from "vitest";
import type { SheetsReader } from "../types/pipeline.js";
import type { SheetsUpdater } from "./google-sheets-client.js";
import {
  parseQueueRow,
  parseHookTimestamp,
  readNextPending,
  claimEntry,
  completeEntry,
  failEntry,
  QUEUE_SHEET,
} from "./intake-queue.js";

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Build a valid queue row with overrides. */
function makeRow(overrides: Partial<Record<string, string>> = {}): string[] {
  const defaults: Record<string, string> = {
    status: "PENDING",
    priority: "P0",
    source: "tess",
    created_at: "2026-02-07T09:30:00Z",
    source_asset_id: "357-0033-v0001-9x16-nn-vd-1min-garymc-mrten-cmrten-x-07102025",
    expansion_type: "hs",
    root_angle_name: "The Move",
    target_variations: "3",
    edit_method: "assembly",
    directing_person: "co",
    special_instructions: "",
    platform: "",
    dimensions: "",
    length_tier: "",
    country_code: "",
    talent_code: "",
    asset_type: "",
    notes: "Hook stack recommended",
  };
  const merged = { ...defaults, ...overrides };
  return [
    merged.status, merged.priority, merged.source, merged.created_at,
    merged.source_asset_id, merged.expansion_type, merged.root_angle_name,
    merged.target_variations, merged.edit_method, merged.directing_person,
    merged.special_instructions, merged.platform, merged.dimensions,
    merged.length_tier, merged.country_code, merged.talent_code,
    merged.asset_type, merged.notes,
  ];
}

function mockReader(rows: string[][]): SheetsReader {
  return { getRows: vi.fn().mockResolvedValue(rows) };
}

function mockUpdater(): SheetsUpdater & { updateCells: ReturnType<typeof vi.fn> } {
  return { updateCells: vi.fn().mockResolvedValue(undefined) };
}

// ── parseQueueRow ────────────────────────────────────────────────────────────

describe("parseQueueRow", () => {
  it("parses a valid row into a QueueEntry", () => {
    const row = makeRow();
    const entry = parseQueueRow(row, 2);

    expect(entry).not.toBeNull();
    expect(entry!.rowIndex).toBe(2);
    expect(entry!.priority).toBe("P0");
    expect(entry!.source).toBe("tess");
    expect(entry!.notes).toBe("Hook stack recommended");
    expect(entry!.intake.source_asset_id).toBe("357-0033-v0001-9x16-nn-vd-1min-garymc-mrten-cmrten-x-07102025");
    expect(entry!.intake.expansion_type).toBe("hs");
    expect(entry!.intake.root_angle_name).toBe("The Move");
    expect(entry!.intake.target_variations).toBe(3);
    expect(entry!.intake.edit_method).toBe("assembly");
    expect(entry!.intake.directing_person).toBe("co");
    expect(entry!.intake.special_instructions).toBeNull();
  });

  it("returns null if source_asset_id is missing", () => {
    const row = makeRow({ source_asset_id: "" });
    expect(parseQueueRow(row, 2)).toBeNull();
  });

  it("returns null if expansion_type is missing", () => {
    const row = makeRow({ expansion_type: "" });
    expect(parseQueueRow(row, 2)).toBeNull();
  });

  it("defaults target_variations to 3 if unparseable", () => {
    const row = makeRow({ target_variations: "abc" });
    const entry = parseQueueRow(row, 2);
    expect(entry!.intake.target_variations).toBe(3);
  });

  it("defaults edit_method to assembly if empty", () => {
    const row = makeRow({ edit_method: "" });
    const entry = parseQueueRow(row, 2);
    expect(entry!.intake.edit_method).toBe("assembly");
  });

  it("defaults directing_person to co if empty", () => {
    const row = makeRow({ directing_person: "" });
    const entry = parseQueueRow(row, 2);
    expect(entry!.intake.directing_person).toBe("co");
  });

  it("sets optional overrides only when non-empty", () => {
    const row = makeRow({ platform: "fb", country_code: "us" });
    const entry = parseQueueRow(row, 2);
    expect(entry!.intake.platform).toBe("fb");
    expect(entry!.intake.country_code).toBe("us");
    expect(entry!.intake.dimensions).toBeUndefined();
    expect(entry!.intake.talent_code).toBeUndefined();
  });

  it("converts special_instructions empty string to null", () => {
    const row = makeRow({ special_instructions: "  " });
    const entry = parseQueueRow(row, 2);
    expect(entry!.intake.special_instructions).toBeNull();
  });

  it("parses single hook in slot 1 (T-V) with rationale (AC)", () => {
    const row = makeRow();
    row[18] = "";                          // S — iconik_asset_uuid
    row[19] = "dqfe-0012-v0005";           // T — hook 1 source
    row[20] = "0";                         // U — hook 1 start
    row[21] = "3.5";                       // V — hook 1 end
    row[28] = "Top hook from winner";      // AC — rationale

    const entry = parseQueueRow(row, 2);
    expect(entry!.hooks).toHaveLength(1);
    expect(entry!.hooks![0].source_asset_id).toBe("dqfe-0012-v0005");
    expect(entry!.hooks![0].start_seconds).toBe(0);
    expect(entry!.hooks![0].end_seconds).toBe(3.5);
    expect(entry!.hook_rationale).toBe("Top hook from winner");
  });

  it("parses 3 hooks across T-AB with rationale AC", () => {
    const row = makeRow();
    row[19] = "dqfe-0012-v0001"; row[20] = "0"; row[21] = "3.2";    // Hook 1
    row[22] = "dqfe-0015-v0001"; row[23] = "0"; row[24] = "4.5";    // Hook 2
    row[25] = "dqfe-0018-v0001"; row[26] = "0"; row[27] = "2.8";    // Hook 3
    row[28] = "3 diverse hooks from DQFE winners";                    // Rationale

    const entry = parseQueueRow(row, 2);
    expect(entry!.hooks).toHaveLength(3);
    expect(entry!.hooks![0].source_asset_id).toBe("dqfe-0012-v0001");
    expect(entry!.hooks![1].source_asset_id).toBe("dqfe-0015-v0001");
    expect(entry!.hooks![2].source_asset_id).toBe("dqfe-0018-v0001");
    expect(entry!.hooks![0].end_seconds).toBe(3.2);
    expect(entry!.hooks![1].end_seconds).toBe(4.5);
    expect(entry!.hooks![2].end_seconds).toBe(2.8);
  });

  it("skips hook slots with empty source_asset_id", () => {
    const row = makeRow();
    row[19] = "dqfe-0012-v0001"; row[20] = "0"; row[21] = "3.0";    // Hook 1 filled
    // Hook 2 empty (W-Y all empty)
    row[25] = "dqfe-0018-v0001"; row[26] = "0"; row[27] = "4.0";    // Hook 3 filled

    const entry = parseQueueRow(row, 2);
    expect(entry!.hooks).toHaveLength(2);
    expect(entry!.hooks![0].source_asset_id).toBe("dqfe-0012-v0001");
    expect(entry!.hooks![1].source_asset_id).toBe("dqfe-0018-v0001");
  });

  it("leaves hooks undefined when all hook columns are empty", () => {
    const row = makeRow();
    const entry = parseQueueRow(row, 2);
    expect(entry!.hooks).toBeUndefined();
    expect(entry!.hook_rationale).toBeUndefined();
  });
});

// ── readNextPending ──────────────────────────────────────────────────────────

describe("readNextPending", () => {
  it("returns the first PENDING row", async () => {
    const rows = [
      makeRow({ status: "COMPLETED" }),
      makeRow({ status: "CLAIMED" }),
      makeRow({ status: "PENDING", source_asset_id: "dqfe-0012-v0001" }),
      makeRow({ status: "PENDING", source_asset_id: "357-0061-v0005" }),
    ];
    const reader = mockReader(rows);
    const entry = await readNextPending("spreadsheet-123", reader);

    expect(entry).not.toBeNull();
    expect(entry!.intake.source_asset_id).toBe("dqfe-0012-v0001");
    expect(entry!.rowIndex).toBe(4); // row 4 in sheet (header=1, data rows start at 2)
  });

  it("returns null when no PENDING rows exist", async () => {
    const rows = [
      makeRow({ status: "COMPLETED" }),
      makeRow({ status: "CLAIMED" }),
    ];
    const entry = await readNextPending("spreadsheet-123", mockReader(rows));
    expect(entry).toBeNull();
  });

  it("returns null for empty queue", async () => {
    const entry = await readNextPending("spreadsheet-123", mockReader([]));
    expect(entry).toBeNull();
  });

  it("skips PENDING rows with missing required fields", async () => {
    const rows = [
      makeRow({ status: "PENDING", source_asset_id: "" }), // invalid
      makeRow({ status: "PENDING", source_asset_id: "good-id" }), // valid
    ];
    const entry = await readNextPending("spreadsheet-123", mockReader(rows));
    expect(entry!.intake.source_asset_id).toBe("good-id");
  });

  it("reads from the correct sheet", async () => {
    const reader = mockReader([]);
    await readNextPending("spreadsheet-123", reader);
    expect(reader.getRows).toHaveBeenCalledWith("spreadsheet-123", QUEUE_SHEET, "A2:AC");
  });

  it("is case-insensitive for status matching", async () => {
    const rows = [makeRow({ status: "pending" })];
    const entry = await readNextPending("spreadsheet-123", mockReader(rows));
    expect(entry).not.toBeNull();
  });
});

// ── claimEntry / completeEntry / failEntry ───────────────────────────────────

describe("claimEntry", () => {
  it("updates status cell to CLAIMED", async () => {
    const updater = mockUpdater();
    await claimEntry("spreadsheet-123", updater, 5, "run-abc");

    expect(updater.updateCells).toHaveBeenCalledWith(
      "spreadsheet-123", QUEUE_SHEET, "A5", [["CLAIMED"]],
    );
  });
});

describe("completeEntry", () => {
  it("updates status cell to COMPLETED", async () => {
    const updater = mockUpdater();
    await completeEntry("spreadsheet-123", updater, 3);

    expect(updater.updateCells).toHaveBeenCalledWith(
      "spreadsheet-123", QUEUE_SHEET, "A3", [["COMPLETED"]],
    );
  });
});

describe("failEntry", () => {
  it("updates status cell to FAILED", async () => {
    const updater = mockUpdater();
    await failEntry("spreadsheet-123", updater, 7);

    expect(updater.updateCells).toHaveBeenCalledWith(
      "spreadsheet-123", QUEUE_SHEET, "A7", [["FAILED"]],
    );
  });
});

// ── parseHookTimestamp ────────────────────────────────────────────────────────

describe("parseHookTimestamp", () => {
  it("parses raw seconds", () => {
    expect(parseHookTimestamp("3.5")).toBe(3.5);
  });

  it("parses MM:SS format", () => {
    expect(parseHookTimestamp("00:05")).toBe(5);
  });

  it("parses M:SS.d format", () => {
    expect(parseHookTimestamp("0:03.5")).toBe(3.5);
  });

  it("parses HH:MM:SS format", () => {
    expect(parseHookTimestamp("00:01:30")).toBe(90);
  });

  it("returns 0 for empty string", () => {
    expect(parseHookTimestamp("")).toBe(0);
  });

  it("returns 0 for whitespace", () => {
    expect(parseHookTimestamp("  ")).toBe(0);
  });
});
