import { describe, it, expect } from "vitest";
import {
  findScriptInSSS,
  assessRootAnglePreservation,
  checkClassificationEligibility,
  verify,
} from "./index.js";
import type { SheetsReader, ResolvedIntake, AssetIdPositions } from "../../types/pipeline.js";

// ── Mock SSS data ───────────────────────────────────────────────────────────

const MOCK_ROWS: string[][] = [
  // Columns: Funnel(0), ScriptID(1), RootAngle(2), AssetID(3), ...Classification(19)
  // Row 1: Winner with root angle
  ["357", "0073", "The Emotional Relief", "357-0073-v0003-fb-9x16-60s-mm-mm-20260105", "fb", "9x16", "60s", "", "", "", "", "", "", "", "", "Active", "$5,784.16", "-$2,939.34", "49.0%", "winner", "INCOMPLETE"],
  // Row 2: Another 357-0073 (winner)
  ["357", "0073", "The Emotional Relief", "357-0073-v0005-fb-9x16-60s-mm-mm-20260114", "fb", "9x16", "60s", "", "", "", "", "", "", "", "", "Active", "$7,918.69", "-$1,592.98", "80.0%", "winner", "INCOMPLETE"],
  // Row 3: Underperformer
  ["357", "0021", "EX of 357-0021", "357-0021-v0001-9x16-nnmu", "", "9x16", "", "", "", "", "", "", "", "", "", "Active", "$26,963.62", "-$5,428.28", "80.0%", "underperformer", "OLD"],
  // Row 4: No root angle name
  ["357", "0033", "", "357-0033-v0001-9x16-nn", "", "9x16", "", "", "", "", "", "", "", "", "", "Active", "$17,886.54", "$1,360.73", "108.0%", "winner", "OLD"],
  // Row 5: dqfe winner
  ["dqfe", "0036", "Beat the Guys", "dqfe-0036-v0003-fb-9x16-180s-jo-ch-20260127", "fb", "9x16", "180s", "", "", "", "", "", "", "", "", "Active", "$4,271.01", "$1,214.40", "128.0%", "winner", "INCOMPLETE"],
  // Row 6: Mixed classifications for sf1-0001
  ["sf1", "0001", "EXP of sf1-0001", "sf1-0001-v0681-9x16", "", "9x16", "", "", "", "", "", "", "", "", "", "Active", "$10,901.54", "-$2,228.84", "80.0%", "underperformer", "OLD"],
  ["sf1", "0001", "EXP of sf1-0001", "sf1-0001-v0541-9x16", "", "9x16", "", "", "", "", "", "", "", "", "", "Active", "$9,136.47", "$775.43", "108.0%", "winner", "OLD"],
];

const SPREADSHEET_ID = "test-spreadsheet-id";

function createMockReader(rows: string[][] = MOCK_ROWS): SheetsReader {
  return { getRows: async () => rows };
}

function createFailingReader(): SheetsReader {
  return { getRows: async () => { throw new Error("API down"); } };
}

// ── Helper: build a ResolvedIntake ──────────────────────────────────────────

function makeResolvedIntake(overrides: Partial<ResolvedIntake> = {}): ResolvedIntake {
  const sourcePositions: AssetIdPositions = {
    funnel: "357", script_id: "0073", variation_id: "v0003",
    platform: "fb", dimensions: "9x16", length_tier: "60s",
    ad_category: "nn", expansion_type: "xx", asset_type: "sad",
    talent_code: "chog", editor_initials: "mm", copywriter_initials: "mm",
    country_code: "us", creation_date: "20260105",
  };
  return {
    source_asset_id: "357-0073-v0003-fb-9x16-60s-nn-xx-sad-chog-mm-mm-us-20260105",
    funnel: "357",
    script_id: "0073",
    source_positions: sourcePositions,
    platform: "fb",
    dimensions: "9x16",
    length_tier: "60s",
    ad_category: "exv",
    expansion_type: "hs",
    asset_type: "sad",
    talent_code: "chog",
    country_code: "us",
    root_angle_name: "The Emotional Relief",
    target_variations: 3,
    edit_method: "assembly",
    directing_person: "co",
    special_instructions: null,
    ...overrides,
  };
}

// ── findScriptInSSS ─────────────────────────────────────────────────────────

describe("findScriptInSSS", () => {
  it("finds script with root angle and classification", () => {
    const result = findScriptInSSS(MOCK_ROWS, "357", "0073");
    expect(result.found).toBe(true);
    expect(result.root_angle_name).toBe("The Emotional Relief");
    expect(result.classifications).toContain("winner");
    expect(result.asset_count).toBe(2);
  });

  it("finds script without root angle name", () => {
    const result = findScriptInSSS(MOCK_ROWS, "357", "0033");
    expect(result.found).toBe(true);
    expect(result.root_angle_name).toBeNull();
  });

  it("returns false for non-existent script", () => {
    const result = findScriptInSSS(MOCK_ROWS, "357", "9999");
    expect(result.found).toBe(false);
    expect(result.asset_count).toBe(0);
  });

  it("is case-insensitive", () => {
    const result = findScriptInSSS(MOCK_ROWS, "DQFE", "0036");
    expect(result.found).toBe(true);
    expect(result.root_angle_name).toBe("Beat the Guys");
  });

  it("collects all classifications for multi-asset script", () => {
    const result = findScriptInSSS(MOCK_ROWS, "sf1", "0001");
    expect(result.found).toBe(true);
    expect(result.classifications).toContain("underperformer");
    expect(result.classifications).toContain("winner");
    expect(result.asset_count).toBe(2);
  });
});

// ── assessRootAnglePreservation ─────────────────────────────────────────────

describe("assessRootAnglePreservation", () => {
  it("high confidence for net new (nn)", () => {
    const result = assessRootAnglePreservation("xx", "nn");
    expect(result.preserved).toBe(true);
    expect(result.confidence).toBe("high");
  });

  it("high confidence for net new multi-use (nnmu)", () => {
    const result = assessRootAnglePreservation("xx", "nnmu");
    expect(result.preserved).toBe(true);
    expect(result.confidence).toBe("high");
  });

  it("high confidence for safe expansion types", () => {
    for (const et of ["hs", "ssr", "env", "sp", "dp", "af"]) {
      const result = assessRootAnglePreservation(et, "exv");
      expect(result.confidence).toBe("high");
      expect(result.reasoning).toContain("presentation only");
    }
  });

  it("uncertain for duration expansion (dur)", () => {
    const result = assessRootAnglePreservation("dur", "exv");
    expect(result.confidence).toBe("uncertain");
    expect(result.reasoning).toContain("content structure");
  });

  it("uncertain for copy framework (cf)", () => {
    const result = assessRootAnglePreservation("cf", "exv");
    expect(result.confidence).toBe("uncertain");
    expect(result.reasoning).toContain("content structure");
  });
});

// ── checkClassificationEligibility ──────────────────────────────────────────

describe("checkClassificationEligibility", () => {
  it("eligible when winner present", () => {
    const result = checkClassificationEligibility(["winner"]);
    expect(result.eligible).toBe(true);
    expect(result.best_classification).toBe("winner");
  });

  it("eligible when mixed classifications include winner", () => {
    const result = checkClassificationEligibility(["underperformer", "winner"]);
    expect(result.eligible).toBe(true);
    expect(result.best_classification).toBe("winner");
  });

  it("not eligible for underperformer only", () => {
    const result = checkClassificationEligibility(["underperformer"]);
    expect(result.eligible).toBe(false);
    expect(result.reasoning).toContain("only Winners");
  });

  it("not eligible for empty classifications", () => {
    const result = checkClassificationEligibility([]);
    expect(result.eligible).toBe(false);
    expect(result.reasoning).toContain("No classification data");
  });
});

// ── verify (main entry point) ───────────────────────────────────────────────

describe("verify", () => {
  it("SUCCESS for valid Winner expansion with safe type", async () => {
    const reader = createMockReader();
    const result = await verify(
      { resolved_intake: makeResolvedIntake(), spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.root_angle_name).toBe("The Emotional Relief");
    expect(result.data.root_angle_preserved).toBe(true);
    expect(result.data.source_exists_in_sss).toBe(true);
    expect(result.data.classification_eligible).toBe(true);
    expect(result.data.source_classification).toBe("winner");
    expect(result.data.edit_method_confirmed).toBe("assembly");
  });

  it("NEEDS_HUMAN_INPUT when root angle missing from intake but exists in SSS", async () => {
    const reader = createMockReader();
    const intake = makeResolvedIntake({ root_angle_name: "" });
    const result = await verify(
      { resolved_intake: intake, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("NEEDS_HUMAN_INPUT");
    if (result.status !== "NEEDS_HUMAN_INPUT") throw new Error("Expected NEEDS_HUMAN_INPUT");
    expect(result.message).toContain("The Emotional Relief");
    expect(result.options).toContain("The Emotional Relief");
  });

  it("NEEDS_HUMAN_INPUT when root angle missing from both intake and SSS", async () => {
    const reader = createMockReader();
    const intake = makeResolvedIntake({
      funnel: "357",
      script_id: "0033",
      root_angle_name: "",
    });
    const result = await verify(
      { resolved_intake: intake, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("NEEDS_HUMAN_INPUT");
    if (result.status !== "NEEDS_HUMAN_INPUT") throw new Error("Expected NEEDS_HUMAN_INPUT");
    expect(result.message).toContain("transcript_analyzer");
  });

  it("FAILED when source Script ID not found in SSS", async () => {
    const reader = createMockReader();
    const intake = makeResolvedIntake({ funnel: "xyz", script_id: "9999" });
    const result = await verify(
      { resolved_intake: intake, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.error_category).toBe("VALIDATION_ERROR");
    expect(result.message).toContain("not found in SSS");
  });

  it("NEEDS_HUMAN_INPUT for risky expansion type (dur)", async () => {
    const reader = createMockReader();
    const intake = makeResolvedIntake({ expansion_type: "dur" });
    const result = await verify(
      { resolved_intake: intake, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("NEEDS_HUMAN_INPUT");
    if (result.status !== "NEEDS_HUMAN_INPUT") throw new Error("Expected NEEDS_HUMAN_INPUT");
    expect(result.message).toContain("uncertain");
  });

  it("NEEDS_HUMAN_INPUT for non-Winner source", async () => {
    const reader = createMockReader();
    const intake = makeResolvedIntake({
      funnel: "357",
      script_id: "0021",
      root_angle_name: "EX of 357-0021",
    });
    const result = await verify(
      { resolved_intake: intake, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("NEEDS_HUMAN_INPUT");
    if (result.status !== "NEEDS_HUMAN_INPUT") throw new Error("Expected NEEDS_HUMAN_INPUT");
    expect(result.message).toContain("only Winners");
  });

  it("SUCCESS with warning when root angle name differs from SSS", async () => {
    const reader = createMockReader();
    const intake = makeResolvedIntake({ root_angle_name: "Different Name" });
    const result = await verify(
      { resolved_intake: intake, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.warnings.length).toBeGreaterThan(0);
    expect(result.data.warnings[0]).toContain("mismatch");
  });

  it("SUCCESS for net new asset (no preservation needed)", async () => {
    const reader = createMockReader();
    // Use 357-0033 which is a winner with no root angle in SSS
    const intake = makeResolvedIntake({
      funnel: "357",
      script_id: "0033",
      ad_category: "nn",
      expansion_type: "xx",
      root_angle_name: "Brand New Angle",
    });
    // 0033 doesn't have root angle in SSS, but we provide it in intake
    // and it's nn so preservation check is automatically high confidence
    const result = await verify(
      { resolved_intake: intake, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    // 0033 is a winner, nn is high confidence — should succeed
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.root_angle_preserved).toBe(true);
  });

  it("handles sheets API failure", async () => {
    const reader = createFailingReader();
    const result = await verify(
      { resolved_intake: makeResolvedIntake(), spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.error_category).toBe("SHEETS_ERROR");
    expect(result.recovery_action).toBe("retry");
  });

  it("FAILED when resolved_intake is null", async () => {
    const reader = createMockReader();
    const result = await verify(
      { resolved_intake: null as any, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("resolved_intake");
  });

  it("SUCCESS for mixed classification script (has at least one winner)", async () => {
    const reader = createMockReader();
    const intake = makeResolvedIntake({
      funnel: "sf1",
      script_id: "0001",
      root_angle_name: "EXP of sf1-0001",
    });
    const result = await verify(
      { resolved_intake: intake, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.classification_eligible).toBe(true);
  });
});

// ── Integration: full pipeline Step 2 flow ──────────────────────────────────

describe("integration", () => {
  it("full verify flow: Winner + safe expansion + matching root angle = SUCCESS", async () => {
    const reader = createMockReader();
    const intake = makeResolvedIntake({
      expansion_type: "hs",
      root_angle_name: "The Emotional Relief",
    });
    const result = await verify(
      { resolved_intake: intake, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.root_angle_preserved).toBe(true);
    expect(result.data.source_exists_in_sss).toBe(true);
    expect(result.data.classification_eligible).toBe(true);
    expect(result.data.warnings).toHaveLength(0);
  });

  it("multiple checkpoints: dur expansion triggers human review BEFORE classification check", async () => {
    // Even though the source is a Winner, dur expansion should flag for review first
    const reader = createMockReader();
    const intake = makeResolvedIntake({ expansion_type: "dur" });
    const result = await verify(
      { resolved_intake: intake, spreadsheet_id: SPREADSHEET_ID },
      reader,
    );
    expect(result.status).toBe("NEEDS_HUMAN_INPUT");
    if (result.status !== "NEEDS_HUMAN_INPUT") throw new Error("Expected NEEDS_HUMAN_INPUT");
    // The message should be about root angle preservation, not classification
    expect(result.message).toContain("uncertain");
  });
});
