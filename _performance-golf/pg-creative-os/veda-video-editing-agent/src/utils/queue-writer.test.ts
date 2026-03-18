import { describe, it, expect, vi } from "vitest";
import { opportunityToRow, writeRecommendations, writeHooksToRow } from "./queue-writer.js";
import type { ExpansionOpportunity, SheetsWriter } from "../types/pipeline.js";

// ── Helpers ─────────────────────────────────────────────────────────────

function makeOpp(overrides: Partial<ExpansionOpportunity> = {}): ExpansionOpportunity {
  return {
    funnel: "357",
    script_id: "0033",
    source_asset_id: "357-0033-v0001-mt-vt-m-nn-xx-bvo-gamc-vv-co-us-20260101-none",
    root_angle_name: "The Move",
    recommended_expansion_type: "hs",
    score: 82,
    priority: "P0",
    confidence: "high",
    evidence: {
      source_spend: 17856.23,
      source_roas: 108,
      existing_expansions: ["xx"],
      unexploited_types: ["hs", "dur", "ssr", "cf", "env", "af"],
    },
    reasoning: "Winner with $17856 spend at 108% ROAS. 6 expansion types unexploited. hs recommended (safety: 10/10).",
    ...overrides,
  };
}

function mockWriter(existingRows: string[][] = []): SheetsWriter {
  return {
    getRows: vi.fn().mockResolvedValue(existingRows),
    appendRows: vi.fn().mockResolvedValue({ updatedRows: 1 }),
  };
}

// ── opportunityToRow ────────────────────────────────────────────────────

describe("opportunityToRow", () => {
  it("maps all 29 columns correctly", () => {
    const opp = makeOpp();
    const row = opportunityToRow(opp, "tess-analyst");

    expect(row).toHaveLength(29);
    expect(row[0]).toBe("PENDING");         // Status
    expect(row[1]).toBe("P0");              // Priority
    expect(row[2]).toBe("tess-analyst");    // Source
    expect(row[3]).toBeTruthy();            // Created At (ISO string)
    expect(row[4]).toBe("357-0033-v0001-mt-vt-m-nn-xx-bvo-gamc-vv-co-us-20260101-none"); // Source Asset ID
    expect(row[5]).toBe("hs");             // Expansion Type
    expect(row[6]).toBe("The Move");       // Root Angle Name
    expect(row[7]).toBe("3");              // Target Variations
    expect(row[8]).toBe("assembly");       // Edit Method
    expect(row[9]).toBe("co");             // Directing Person
    expect(row[10]).toBe("");              // Special Instructions
    expect(row[17]).toContain("$17856");   // Notes (reasoning)
  });

  it("sets PENDING status", () => {
    const row = opportunityToRow(makeOpp(), "tess-analyst");
    expect(row[0]).toBe("PENDING");
  });

  it("sets ISO timestamp in Created At", () => {
    const row = opportunityToRow(makeOpp(), "tess-analyst");
    expect(() => new Date(row[3])).not.toThrow();
    expect(new Date(row[3]).getFullYear()).toBeGreaterThanOrEqual(2026);
  });

  it("leaves optional override columns empty", () => {
    const row = opportunityToRow(makeOpp(), "tess-analyst");
    // Platform (11), Dimensions (12), Length Tier (13), Country Code (14), Talent Code (15), Asset Type (16)
    expect(row[11]).toBe("");
    expect(row[12]).toBe("");
    expect(row[13]).toBe("");
    expect(row[14]).toBe("");
    expect(row[15]).toBe("");
    expect(row[16]).toBe("");
  });

  it("leaves hook columns (T-AC) empty on initial write", () => {
    const row = opportunityToRow(makeOpp(), "tess-analyst");
    // Columns 19-28 (T-AC) should all be empty
    for (let i = 19; i <= 28; i++) {
      expect(row[i]).toBe("");
    }
  });
});

// ── writeHooksToRow ─────────────────────────────────────────────────────

describe("writeHooksToRow", () => {
  it("writes 3 hooks and rationale to T-AC range", () => {
    const hooks = [
      { source_asset_id: "dqfe-0012-v0001", start_seconds: 0, end_seconds: 3.2 },
      { source_asset_id: "dqfe-0015-v0001", start_seconds: 0, end_seconds: 4.5 },
      { source_asset_id: "dqfe-0018-v0001", start_seconds: 0, end_seconds: 2.8 },
    ];
    const result = writeHooksToRow(5, hooks, "3 diverse hooks");

    expect(result.range).toBe("T5:AC5");
    expect(result.values).toHaveLength(1);
    expect(result.values[0]).toHaveLength(10);
    expect(result.values[0][0]).toBe("dqfe-0012-v0001"); // T
    expect(result.values[0][1]).toBe("0");                // U
    expect(result.values[0][2]).toBe("3.2");              // V
    expect(result.values[0][3]).toBe("dqfe-0015-v0001"); // W
    expect(result.values[0][6]).toBe("dqfe-0018-v0001"); // Z
    expect(result.values[0][9]).toBe("3 diverse hooks");  // AC
  });

  it("handles fewer than 3 hooks", () => {
    const hooks = [
      { source_asset_id: "dqfe-0012-v0001", start_seconds: 0, end_seconds: 3.0 },
    ];
    const result = writeHooksToRow(10, hooks, "Single hook");

    expect(result.range).toBe("T10:AC10");
    expect(result.values[0][0]).toBe("dqfe-0012-v0001"); // T
    expect(result.values[0][3]).toBe("");                  // W (empty)
    expect(result.values[0][6]).toBe("");                  // Z (empty)
    expect(result.values[0][9]).toBe("Single hook");       // AC
  });
});

// ── writeRecommendations ────────────────────────────────────────────────

describe("writeRecommendations", () => {
  it("writes opportunities to queue", async () => {
    const writer = mockWriter();
    const result = await writeRecommendations(
      {
        spreadsheet_id: "test",
        opportunities: [makeOpp()],
        source: "tess-analyst",
        deduplicate: false,
      },
      writer,
    );

    expect(result.rows_written).toBe(1);
    expect(result.skipped_duplicates).toBe(0);
    expect(result.written_asset_ids).toHaveLength(1);
    expect(writer.appendRows).toHaveBeenCalledOnce();
  });

  it("skips duplicates when deduplicate=true", async () => {
    // Existing queue has a PENDING entry for 357-0033 + hs
    const existingRows = [
      ["PENDING", "P0", "tess-analyst", "2026-01-01", "357-0033-v0001-mt-vt-m-nn-xx-bvo-gamc-vv-co-us-20260101-none", "hs",
       "The Move", "3", "assembly", "co", "", "", "", "", "", "", "", ""],
    ];
    const writer = mockWriter(existingRows);

    const result = await writeRecommendations(
      {
        spreadsheet_id: "test",
        opportunities: [makeOpp()], // same source + hs
        source: "tess-analyst",
        deduplicate: true,
      },
      writer,
    );

    expect(result.rows_written).toBe(0);
    expect(result.skipped_duplicates).toBe(1);
    expect(writer.appendRows).not.toHaveBeenCalled();
  });

  it("does not skip COMPLETED entries as duplicates", async () => {
    const existingRows = [
      ["COMPLETED", "P0", "tess-analyst", "2026-01-01", "357-0033-v0001-mt-vt-m-nn-xx-bvo-gamc-vv-co-us-20260101-none", "hs",
       "The Move", "3", "assembly", "co", "", "", "", "", "", "", "", ""],
    ];
    const writer = mockWriter(existingRows);

    const result = await writeRecommendations(
      {
        spreadsheet_id: "test",
        opportunities: [makeOpp()],
        source: "tess-analyst",
        deduplicate: true,
      },
      writer,
    );

    expect(result.rows_written).toBe(1);
    expect(result.skipped_duplicates).toBe(0);
  });

  it("handles CLAIMED entries as duplicates", async () => {
    const existingRows = [
      ["CLAIMED", "P0", "tess-analyst", "2026-01-01", "357-0033-v0001-mt-vt-m-nn-xx-bvo-gamc-vv-co-us-20260101-none", "hs",
       "The Move", "3", "assembly", "co", "", "", "", "", "", "", "", ""],
    ];
    const writer = mockWriter(existingRows);

    const result = await writeRecommendations(
      {
        spreadsheet_id: "test",
        opportunities: [makeOpp()],
        source: "tess-analyst",
        deduplicate: true,
      },
      writer,
    );

    expect(result.rows_written).toBe(0);
    expect(result.skipped_duplicates).toBe(1);
  });

  it("handles empty opportunities", async () => {
    const writer = mockWriter();
    const result = await writeRecommendations(
      {
        spreadsheet_id: "test",
        opportunities: [],
        source: "tess-analyst",
        deduplicate: false,
      },
      writer,
    );

    expect(result.rows_written).toBe(0);
    expect(result.skipped_duplicates).toBe(0);
    expect(writer.appendRows).not.toHaveBeenCalled();
  });

  it("handles all-duplicates case", async () => {
    const existingRows = [
      ["PENDING", "P0", "tess-analyst", "2026-01-01", "asset-a", "hs",
       "Angle A", "3", "assembly", "co", "", "", "", "", "", "", "", ""],
      ["CLAIMED", "P1", "tess-analyst", "2026-01-01", "asset-b", "dur",
       "Angle B", "3", "assembly", "co", "", "", "", "", "", "", "", ""],
    ];
    const writer = mockWriter(existingRows);

    const result = await writeRecommendations(
      {
        spreadsheet_id: "test",
        opportunities: [
          makeOpp({ source_asset_id: "asset-a", recommended_expansion_type: "hs" }),
          makeOpp({ source_asset_id: "asset-b", recommended_expansion_type: "dur" }),
        ],
        source: "tess-analyst",
        deduplicate: true,
      },
      writer,
    );

    expect(result.rows_written).toBe(0);
    expect(result.skipped_duplicates).toBe(2);
    expect(writer.appendRows).not.toHaveBeenCalled();
  });

  it("writes multiple rows in a single append", async () => {
    const writer = mockWriter();
    (writer.appendRows as ReturnType<typeof vi.fn>).mockResolvedValue({ updatedRows: 3 });

    const result = await writeRecommendations(
      {
        spreadsheet_id: "test",
        opportunities: [
          makeOpp({ source_asset_id: "asset-a", recommended_expansion_type: "hs" }),
          makeOpp({ source_asset_id: "asset-b", recommended_expansion_type: "dur" }),
          makeOpp({ source_asset_id: "asset-c", recommended_expansion_type: "ssr" }),
        ],
        source: "tess-analyst",
        deduplicate: false,
      },
      writer,
    );

    expect(result.rows_written).toBe(3);
    expect(result.written_asset_ids).toHaveLength(3);
    const appendCall = (writer.appendRows as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(appendCall[2]).toHaveLength(3); // 3 rows in single call
  });

  it("skips deduplication when deduplicate=false", async () => {
    const existingRows = [
      ["PENDING", "P0", "tess-analyst", "2026-01-01", "357-0033-v0001-mt-vt-m-nn-xx-bvo-gamc-vv-co-us-20260101-none", "hs",
       "The Move", "3", "assembly", "co", "", "", "", "", "", "", "", ""],
    ];
    const writer = mockWriter(existingRows);

    const result = await writeRecommendations(
      {
        spreadsheet_id: "test",
        opportunities: [makeOpp()], // same entry, but deduplicate=false
        source: "tess-analyst",
        deduplicate: false,
      },
      writer,
    );

    expect(result.rows_written).toBe(1);
    expect(result.skipped_duplicates).toBe(0);
    expect(writer.getRows).not.toHaveBeenCalled(); // never reads queue
  });
});
