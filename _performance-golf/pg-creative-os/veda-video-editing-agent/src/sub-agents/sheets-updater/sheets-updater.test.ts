import { describe, it, expect } from "vitest";
import {
  extractVariationNumber,
  findExistingVariations,
  calculateNextVariations,
  lookupVariations,
  writeTracking,
} from "./index.js";
import type { SheetsReader, SheetsWriter, SheetsWriteEntry } from "../../types/pipeline.js";

// ── Mock data matching real SSS Ad Level Tracking structure ──────────────────
// Columns: Funnel, Script ID, Root Angle Name, Asset ID, Platform, Dimensions,
//          Length Tier, Ad Category, Expansion Type, Asset Type, Talent,
//          Editor Name, Copywriter Name, Country Code, Creation Date, Status,
//          Spend, Net Revenue, ROAS, Classification, Format Type

const MOCK_ROWS: string[][] = [
  // Row 1: OLD format (no proper naming convention)
  ["357", "0021", "EX of 357-0021", "357-0021-v0001-9x16-nnmu-vd-2min-garymc-myrn-mw-x-07042025 - copy 2", "", "9x16", "", "", "", "", "", "", "", "", "", "Active", "$26,963.62", "-$5,428.28", "80.0%", "underperformer", "OLD"],
  // Row 2: Another 357-0021 variation
  ["357", "0021", "EX of 357-0021", "357-0021-v0174-9x16-exp-vd-2min-garymc-jrfno-cjrfno-x-10102025", "", "9x16", "", "", "", "", "", "", "", "", "", "Active", "$4,355.22", "-$307.79", "93.0%", "underperformer", "OLD"],
  // Row 3: Different script ID for 357
  ["357", "0033", "", "357-0033-v0001-9x16-nn-vd-1min-garymc-mrten-cmrten-x-07102025.mp4 - copy 3", "", "9x16", "", "", "", "", "", "", "", "", "", "Active", "$17,886.54", "$1,360.73", "108.0%", "winner", "OLD"],
  // Row 4: Image asset with short variation number
  ["357", "i023", "XMAS EX of 357-i023", "357-i023-v006-bfcm", "—", "", "", "", "", "", "", "", "", "", "", "Active", "$17,002.99", "-$8,200.11", "52.0%", "underperformer", "INCOMPLETE"],
  // Row 5: Another i023 variation
  ["357", "i023", "XMAS EX of 357-i023", "357-i023-v008-bfcm", "—", "", "", "", "", "", "", "", "", "", "", "Active", "$7,129.00", "-$3,570.29", "50.0%", "underperformer", "INCOMPLETE"],
  // Row 6: Proper v3.3 format
  ["357", "i023", "XMAS EX of 357-i023", "357-i023-v0002-1080x1350-nn-img-x-x-ednlc-cwnlc-nclad-07312025.png - copy 2", "", "1080x1350", "", "", "", "", "", "", "", "", "", "Active", "$4,951.20", "$3,433.66", "169.0%", "winner", "OLD"],
  // Row 7: Different funnel
  ["dqfe", "0012", "EX of dqfe-0012", "dqfe-0012-v0001-9x16-nn-vd-1min-mris-arvn-ch-blackfriday2025-11212025 - ac", "", "9x16", "", "", "", "", "", "", "", "", "", "Active", "$14,175.62", "$23.88", "100.0%", "winner", "OLD"],
  // Row 8: dqfe-0012 another variation
  ["dqfe", "0012", "EX of dqfe-0012", "dqfe-0012-v0014-fb-9x16-180s-ae-ch-20251212", "fb", "9x16", "180s", "—", "—", "—", "", "", "", "", "", "Active", "$8,238.82", "-$590.89", "93.0%", "underperformer", "INCOMPLETE"],
  // Row 9: dqfe-0012 highest variation
  ["dqfe", "0012", "EX of dqfe-0012", "dqfe-0012-v0017-fb-9x16-180s-mm-ch-20251212", "fb", "9x16", "180s", "—", "—", "—", "", "", "", "", "", "Active", "$5,610.35", "$665.65", "112.0%", "winner", "INCOMPLETE"],
  // Row 10: sf1 with high variation number
  ["sf1", "0001", "EXP of sf1-0001", "sf1-0001-v0681-9x16-exp-vd-5min-hank-clev-cf-blackfriday2025-11042025 - copy 2", "", "9x16", "", "", "", "", "", "", "", "", "", "Active", "$10,901.54", "-$2,228.84", "80.0%", "underperformer", "OLD"],
  // Row 11: Non-standard entry (no proper Asset ID)
  ["pmax", "", "", "pmax", "", "", "", "", "", "", "", "", "", "", "", "Active", "$150,352.34", "$37,590.76", "125.0%", "winner", "INCOMPLETE"],
  // Row 12: sf1-0001 another variation
  ["sf1", "0001", "EXP of sf1-0001", "sf1-0001-v0541-9x16-exp-vd-5min-hank-hinsch-co-x-08072025 - copy 2", "", "9x16", "", "", "", "", "", "", "", "", "", "Active", "$9,136.47", "$775.43", "108.0%", "winner", "OLD"],
  // Row 13: sf1-0001 yet another
  ["sf1", "0001", "EXP of sf1-0001", "sf1-0001-v0483-9x16-exp-vd-5min-hank-shne-cshne-06112025 - copy 2", "", "9x16", "", "", "", "", "", "", "", "", "", "Active", "$4,562.14", "-$758.72", "83.0%", "underperformer", "OLD"],
];

const SPREADSHEET_ID = "1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U";

// ── Mock SheetsReader ───────────────────────────────────────────────────────

function createMockReader(rows: string[][] = MOCK_ROWS): SheetsReader {
  return {
    getRows: async () => rows,
  };
}

function createFailingReader(errorMsg: string): SheetsReader {
  return {
    getRows: async () => {
      throw new Error(errorMsg);
    },
  };
}

// ── Mock SheetsWriter ───────────────────────────────────────────────────────

function createMockWriter(
  existingRows: string[][] = MOCK_ROWS,
): SheetsWriter & { appendedRows: string[][] } {
  const writer = {
    appendedRows: [] as string[][],
    getRows: async () => existingRows,
    appendRows: async (_sid: string, _sheet: string, rows: string[][]) => {
      writer.appendedRows.push(...rows);
      return { updatedRows: rows.length };
    },
  };
  return writer;
}

// ── extractVariationNumber ──────────────────────────────────────────────────

describe("extractVariationNumber", () => {
  it("extracts v0001 from standard ID", () => {
    expect(extractVariationNumber("357-0021-v0001-9x16-nnmu-vd-2min")).toBe("v0001");
  });

  it("extracts and normalizes 3-digit variation (v006 → v0006)", () => {
    expect(extractVariationNumber("357-i023-v006-bfcm")).toBe("v0006");
  });

  it("extracts high variation number", () => {
    expect(extractVariationNumber("sf1-0001-v0681-9x16-exp")).toBe("v0681");
  });

  it("handles IDs with .mp4 suffix", () => {
    expect(extractVariationNumber("357-0033-v0001-9x16-nn.mp4")).toBe("v0001");
  });

  it("handles IDs with ' - copy' suffix", () => {
    expect(extractVariationNumber("357-0021-v0001-9x16 - copy 2")).toBe("v0001");
  });

  it("returns null for IDs without variation number", () => {
    expect(extractVariationNumber("pmax")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(extractVariationNumber("")).toBeNull();
  });

  it("handles single-digit variation (v1 → v0001)", () => {
    expect(extractVariationNumber("357-0001-v1-9x16")).toBe("v0001");
  });

  it("is case-insensitive", () => {
    expect(extractVariationNumber("357-0021-V0005-9x16")).toBe("v0005");
  });
});

// ── findExistingVariations ──────────────────────────────────────────────────

describe("findExistingVariations", () => {
  it("finds all variations for 357-0021", () => {
    const result = findExistingVariations(MOCK_ROWS, "357", "0021");
    expect(result).toEqual(["v0001", "v0174"]);
  });

  it("finds variations for 357-i023 (mixed formats)", () => {
    const result = findExistingVariations(MOCK_ROWS, "357", "i023");
    expect(result).toEqual(["v0002", "v0006", "v0008"]);
  });

  it("finds variations for dqfe-0012", () => {
    const result = findExistingVariations(MOCK_ROWS, "dqfe", "0012");
    expect(result).toEqual(["v0001", "v0014", "v0017"]);
  });

  it("finds variations for sf1-0001 (high numbers)", () => {
    const result = findExistingVariations(MOCK_ROWS, "sf1", "0001");
    expect(result).toEqual(["v0483", "v0541", "v0681"]);
  });

  it("returns empty array for non-existent script", () => {
    const result = findExistingVariations(MOCK_ROWS, "357", "9999");
    expect(result).toEqual([]);
  });

  it("returns empty array for non-existent funnel", () => {
    const result = findExistingVariations(MOCK_ROWS, "xyz", "0001");
    expect(result).toEqual([]);
  });

  it("is case-insensitive on funnel/script matching", () => {
    const result = findExistingVariations(MOCK_ROWS, "DQFE", "0012");
    expect(result).toEqual(["v0001", "v0014", "v0017"]);
  });

  it("deduplicates variation numbers", () => {
    const rowsWithDupes = [
      ...MOCK_ROWS,
      ["357", "0021", "", "357-0021-v0001-another-entry", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ];
    const result = findExistingVariations(rowsWithDupes, "357", "0021");
    expect(result).toEqual(["v0001", "v0174"]);
  });

  it("skips rows where no variation number found", () => {
    const result = findExistingVariations(MOCK_ROWS, "pmax", "");
    expect(result).toEqual([]);
  });
});

// ── calculateNextVariations ─────────────────────────────────────────────────

describe("calculateNextVariations", () => {
  it("calculates next 3 after v0174", () => {
    const result = calculateNextVariations(["v0001", "v0174"], 3);
    expect(result).toEqual(["v0175", "v0176", "v0177"]);
  });

  it("calculates next 1 after v0681", () => {
    const result = calculateNextVariations(["v0483", "v0541", "v0681"], 1);
    expect(result).toEqual(["v0682"]);
  });

  it("starts at v0001 when no existing variations", () => {
    const result = calculateNextVariations([], 3);
    expect(result).toEqual(["v0001", "v0002", "v0003"]);
  });

  it("handles single existing variation", () => {
    const result = calculateNextVariations(["v0001"], 2);
    expect(result).toEqual(["v0002", "v0003"]);
  });

  it("handles large batch request", () => {
    const result = calculateNextVariations(["v0010"], 5);
    expect(result).toEqual(["v0011", "v0012", "v0013", "v0014", "v0015"]);
  });
});

// ── lookupVariations (READ mode) ────────────────────────────────────────────

describe("lookupVariations", () => {
  it("returns next variation numbers for 357-0021", async () => {
    const reader = createMockReader();
    const result = await lookupVariations(
      { funnel: "357", script_id: "0021", target_count: 3, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.existing_variations).toEqual(["v0001", "v0174"]);
    expect(result.data.next_variation_number).toBe("v0175");
    expect(result.data.reserved_numbers).toEqual(["v0175", "v0176", "v0177"]);
    expect(result.data.total_rows_scanned).toBe(MOCK_ROWS.length);
  });

  it("returns v0001 for script with no existing variations", async () => {
    const reader = createMockReader();
    const result = await lookupVariations(
      { funnel: "357", script_id: "9999", target_count: 2, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.existing_variations).toEqual([]);
    expect(result.data.next_variation_number).toBe("v0001");
    expect(result.data.reserved_numbers).toEqual(["v0001", "v0002"]);
  });

  it("handles sf1-0001 with high variation numbers", async () => {
    const reader = createMockReader();
    const result = await lookupVariations(
      { funnel: "sf1", script_id: "0001", target_count: 3, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.next_variation_number).toBe("v0682");
    expect(result.data.reserved_numbers).toEqual(["v0682", "v0683", "v0684"]);
  });

  it("rejects missing funnel", async () => {
    const reader = createMockReader();
    const result = await lookupVariations(
      { funnel: "", script_id: "0021", target_count: 3, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.error_category).toBe("VALIDATION_ERROR");
    expect(result.message).toContain("funnel");
  });

  it("rejects missing script_id", async () => {
    const reader = createMockReader();
    const result = await lookupVariations(
      { funnel: "357", script_id: "", target_count: 3, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.error_category).toBe("VALIDATION_ERROR");
    expect(result.message).toContain("script_id");
  });

  it("rejects target_count < 1", async () => {
    const reader = createMockReader();
    const result = await lookupVariations(
      { funnel: "357", script_id: "0021", target_count: 0, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("target_count");
  });

  it("handles sheets API failure gracefully", async () => {
    const reader = createFailingReader("Network timeout");
    const result = await lookupVariations(
      { funnel: "357", script_id: "0021", target_count: 3, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.error_category).toBe("SHEETS_ERROR");
    expect(result.recovery_action).toBe("retry");
    expect(result.message).toContain("Network timeout");
  });

  it("uses custom sheet name when provided", async () => {
    let requestedSheet = "";
    const reader: SheetsReader = {
      getRows: async (_sid, sheet) => {
        requestedSheet = sheet;
        return MOCK_ROWS;
      },
    };
    await lookupVariations(
      { funnel: "357", script_id: "0021", target_count: 1, spreadsheet_id: SPREADSHEET_ID, sheet_name: "Ad Level Tracking (Future State)" },
      reader,
    );
    expect(requestedSheet).toBe("Ad Level Tracking (Future State)");
  });
});

// ── writeTracking (WRITE mode) ──────────────────────────────────────────────

const SAMPLE_ENTRY: SheetsWriteEntry = {
  funnel: "357",
  script_id: "0073",
  root_angle_name: "The Emotional Relief",
  asset_id: "357-0073-v0006-fb-9x16-60s-exv-dur-sad-chog-vv-co-us-20260206",
  platform: "fb",
  dimensions: "9x16",
  length_tier: "60s",
  ad_category: "exv",
  expansion_type: "dur",
  asset_type: "sad",
  talent: "chog",
  editor_name: "vv",
  copywriter_name: "co",
  country_code: "us",
  creation_date: "20260206",
  status: "Testing",
  classification: "Testing",
};

describe("writeTracking", () => {
  it("successfully writes a single entry", async () => {
    const writer = createMockWriter();
    const result = await writeTracking(
      { spreadsheet_id: SPREADSHEET_ID, entries: [SAMPLE_ENTRY] },
      writer,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.rows_written).toBe(1);
    expect(result.data.verification_status).toBe("VERIFIED");
    expect(result.data.written_asset_ids).toEqual([SAMPLE_ENTRY.asset_id]);
    expect(writer.appendedRows).toHaveLength(1);
  });

  it("writes multiple entries", async () => {
    const writer = createMockWriter();
    const entry2: SheetsWriteEntry = {
      ...SAMPLE_ENTRY,
      asset_id: "357-0073-v0007-fb-9x16-60s-exv-dur-sad-chog-vv-co-us-20260206",
    };
    const result = await writeTracking(
      { spreadsheet_id: SPREADSHEET_ID, entries: [SAMPLE_ENTRY, entry2] },
      writer,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.rows_written).toBe(2);
    expect(writer.appendedRows).toHaveLength(2);
  });

  it("maps entry fields to correct column positions", async () => {
    const writer = createMockWriter();
    await writeTracking(
      { spreadsheet_id: SPREADSHEET_ID, entries: [SAMPLE_ENTRY] },
      writer,
    );
    const row = writer.appendedRows[0];
    expect(row[0]).toBe("357");                     // Funnel
    expect(row[1]).toBe("0073");                    // Script ID
    expect(row[2]).toBe("The Emotional Relief");    // Root Angle Name
    expect(row[3]).toContain("357-0073-v0006");     // Asset ID
    expect(row[4]).toBe("fb");                      // Platform
    expect(row[5]).toBe("9x16");                    // Dimensions
    expect(row[6]).toBe("60s");                     // Length Tier
    expect(row[7]).toBe("exv");                     // Ad Category
    expect(row[8]).toBe("dur");                     // Expansion Type
    expect(row[9]).toBe("sad");                     // Asset Type
    expect(row[10]).toBe("chog");                   // Talent
    expect(row[11]).toBe("vv");                     // Editor Name
    expect(row[12]).toBe("co");                     // Copywriter Name
    expect(row[13]).toBe("us");                     // Country Code
    expect(row[14]).toBe("20260206");               // Creation Date
    expect(row[15]).toBe("Testing");                // Status
    expect(row[19]).toBe("Testing");                // Classification
  });

  it("detects duplicate asset IDs", async () => {
    const writer = createMockWriter();
    // Use an asset ID that already exists in MOCK_ROWS
    const dupeEntry: SheetsWriteEntry = {
      ...SAMPLE_ENTRY,
      asset_id: "357-0021-v0001-9x16-nnmu-vd-2min-garymc-myrn-mw-x-07042025 - copy 2",
    };
    const result = await writeTracking(
      { spreadsheet_id: SPREADSHEET_ID, entries: [dupeEntry] },
      writer,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.error_category).toBe("DUPLICATE_ERROR");
    expect(result.severity).toBe("critical");
  });

  it("rejects empty entries array", async () => {
    const writer = createMockWriter();
    const result = await writeTracking(
      { spreadsheet_id: SPREADSHEET_ID, entries: [] },
      writer,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.error_category).toBe("VALIDATION_ERROR");
    expect(result.message).toContain("No entries");
  });

  it("rejects entry without asset_id", async () => {
    const writer = createMockWriter();
    const badEntry = { ...SAMPLE_ENTRY, asset_id: "" };
    const result = await writeTracking(
      { spreadsheet_id: SPREADSHEET_ID, entries: [badEntry] },
      writer,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("asset_id");
  });

  it("rejects entry without root_angle_name", async () => {
    const writer = createMockWriter();
    const badEntry = { ...SAMPLE_ENTRY, root_angle_name: "" };
    const result = await writeTracking(
      { spreadsheet_id: SPREADSHEET_ID, entries: [badEntry] },
      writer,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("root_angle_name");
  });

  it("handles sheets API write failure", async () => {
    const writer: SheetsWriter = {
      getRows: async () => [],
      appendRows: async () => {
        throw new Error("Quota exceeded");
      },
    };
    const result = await writeTracking(
      { spreadsheet_id: SPREADSHEET_ID, entries: [SAMPLE_ENTRY] },
      writer,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.error_category).toBe("SHEETS_ERROR");
    expect(result.recovery_action).toBe("retry");
    expect(result.message).toContain("Quota exceeded");
  });

  it("returns UNVERIFIED when row count mismatch", async () => {
    const writer: SheetsWriter = {
      getRows: async () => [],
      appendRows: async () => ({ updatedRows: 0 }),  // wrote 0 instead of 1
    };
    const result = await writeTracking(
      { spreadsheet_id: SPREADSHEET_ID, entries: [SAMPLE_ENTRY] },
      writer,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.verification_status).toBe("UNVERIFIED");
  });
});

// ── Integration: lookupVariations → full pipeline flow ──────────────────────

describe("integration", () => {
  it("lookup → reserve → verify no overlap with existing", async () => {
    const reader = createMockReader();

    // Step 1: Look up existing variations for 357-0021
    const lookup = await lookupVariations(
      { funnel: "357", script_id: "0021", target_count: 3, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(lookup.status).toBe("SUCCESS");
    if (lookup.status !== "SUCCESS") throw new Error("Expected SUCCESS");

    // Step 2: Verify reserved numbers don't overlap with existing
    const { existing_variations, reserved_numbers } = lookup.data;
    for (const reserved of reserved_numbers) {
      expect(existing_variations).not.toContain(reserved);
    }

    // Step 3: Verify sequential ordering
    const reservedNums = reserved_numbers.map((v) => parseInt(v.slice(1), 10));
    for (let i = 1; i < reservedNums.length; i++) {
      expect(reservedNums[i]).toBe(reservedNums[i - 1] + 1);
    }
  });

  it("lookup with empty sheet returns v0001", async () => {
    const reader = createMockReader([]);
    const result = await lookupVariations(
      { funnel: "357", script_id: "0001", target_count: 3, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.reserved_numbers).toEqual(["v0001", "v0002", "v0003"]);
  });
});
