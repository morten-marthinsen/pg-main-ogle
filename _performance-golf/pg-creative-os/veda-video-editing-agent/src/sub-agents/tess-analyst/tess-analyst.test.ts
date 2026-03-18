import { describe, it, expect, vi } from "vitest";
import {
  parseSpend,
  parseRoas,
  parseRow,
  groupByScript,
  scoreOpportunity,
  scoreOpportunities,
  analyze,
} from "./index.js";
import type { SssTrackingRow } from "../../types/pipeline.js";
import type { SheetsReader } from "../../types/pipeline.js";

// ── Helpers ─────────────────────────────────────────────────────────────

/** Build a 21-column SSS row from partial overrides. */
function makeSssRow(overrides: Partial<Record<string, string>> = {}): string[] {
  const defaults: Record<string, string> = {
    funnel: "357",
    script_id: "0033",
    root_angle: "The Move",
    asset_id: "357-0033-v0001-mt-vt-m-nn-xx-bvo-gamc-vv-co-us-20260101-none",
    platform: "mt",
    dimensions: "vt",
    length_tier: "m",
    ad_category: "nn",
    expansion_type: "xx",
    asset_type: "bvo",
    talent: "gamc",
    editor: "vv",
    copywriter: "co",
    country_code: "us",
    creation_date: "20260101",
    status: "Live",
    spend: "$17,856.23",
    net_revenue: "$19,204.72",
    roas: "108%",
    classification: "Winner",
    format_type: "NEW",
  };
  const merged = { ...defaults, ...overrides };
  return [
    merged.funnel, merged.script_id, merged.root_angle, merged.asset_id,
    merged.platform, merged.dimensions, merged.length_tier, merged.ad_category,
    merged.expansion_type, merged.asset_type, merged.talent, merged.editor,
    merged.copywriter, merged.country_code, merged.creation_date, merged.status,
    merged.spend, merged.net_revenue, merged.roas, merged.classification,
    merged.format_type,
  ];
}

function makeWinner(overrides: Partial<SssTrackingRow> = {}): SssTrackingRow {
  return {
    funnel: "357",
    script_id: "0033",
    root_angle_name: "The Move",
    asset_id: "357-0033-v0001-mt-vt-m-nn-xx-bvo-gamc-vv-co-us-20260101-none",
    platform: "mt",
    dimensions: "vt",
    length_tier: "m",
    ad_category: "nn",
    expansion_type: "xx",
    asset_type: "bvo",
    talent: "gamc",
    country_code: "us",
    spend: 17856.23,
    roas: 108,
    classification: "Winner",
    ...overrides,
  };
}

function mockReader(rows: string[][]): SheetsReader {
  return { getRows: vi.fn().mockResolvedValue(rows) };
}

// ── parseSpend ──────────────────────────────────────────────────────────

describe("parseSpend", () => {
  it("parses dollar amount with commas", () => {
    expect(parseSpend("$17,856.23")).toBe(17856.23);
  });

  it("parses plain number", () => {
    expect(parseSpend("1234.56")).toBe(1234.56);
  });

  it("parses dollar amount without commas", () => {
    expect(parseSpend("$500")).toBe(500);
  });

  it("returns 0 for empty string", () => {
    expect(parseSpend("")).toBe(0);
  });

  it("returns 0 for non-numeric", () => {
    expect(parseSpend("N/A")).toBe(0);
  });
});

// ── parseRoas ───────────────────────────────────────────────────────────

describe("parseRoas", () => {
  it("parses percentage string", () => {
    expect(parseRoas("108%")).toBe(108);
  });

  it("parses plain number", () => {
    expect(parseRoas("95.5")).toBe(95.5);
  });

  it("returns 0 for empty string", () => {
    expect(parseRoas("")).toBe(0);
  });

  it("returns 0 for non-numeric", () => {
    expect(parseRoas("N/A")).toBe(0);
  });
});

// ── parseRow ────────────────────────────────────────────────────────────

describe("parseRow", () => {
  it("parses a valid SSS row", () => {
    const row = makeSssRow();
    const parsed = parseRow(row);

    expect(parsed).not.toBeNull();
    expect(parsed!.funnel).toBe("357");
    expect(parsed!.script_id).toBe("0033");
    expect(parsed!.root_angle_name).toBe("The Move");
    expect(parsed!.spend).toBe(17856.23);
    expect(parsed!.roas).toBe(108);
    expect(parsed!.classification).toBe("Winner");
  });

  it("returns null for missing funnel", () => {
    const row = makeSssRow({ funnel: "" });
    expect(parseRow(row)).toBeNull();
  });

  it("returns null for missing script_id", () => {
    const row = makeSssRow({ script_id: "" });
    expect(parseRow(row)).toBeNull();
  });

  it("returns null for missing classification", () => {
    const row = makeSssRow({ classification: "" });
    expect(parseRow(row)).toBeNull();
  });

  it("handles messy spend values", () => {
    const row = makeSssRow({ spend: "$1,234,567.89" });
    const parsed = parseRow(row);
    expect(parsed!.spend).toBe(1234567.89);
  });

  it("handles short rows gracefully", () => {
    const row = ["357", "0033"];
    const parsed = parseRow(row);
    expect(parsed).toBeNull(); // missing classification
  });
});

// ── groupByScript ───────────────────────────────────────────────────────

describe("groupByScript", () => {
  it("groups Winners by funnel + script_id", () => {
    const winners = [
      makeWinner({ funnel: "357", script_id: "0033", spend: 5000 }),
      makeWinner({ funnel: "357", script_id: "0033", spend: 17000, expansion_type: "hs" }),
      makeWinner({ funnel: "dqfe", script_id: "0073", spend: 8000 }),
    ];

    const groups = groupByScript(winners);
    expect(groups).toHaveLength(2);
  });

  it("picks highest-spend Winner as primary source", () => {
    const winners = [
      makeWinner({ spend: 5000, asset_id: "low-spend" }),
      makeWinner({ spend: 17000, asset_id: "high-spend" }),
    ];

    const groups = groupByScript(winners);
    expect(groups[0].primary_source.asset_id).toBe("high-spend");
  });

  it("calculates total spend", () => {
    const winners = [
      makeWinner({ spend: 5000 }),
      makeWinner({ spend: 17000 }),
    ];

    const groups = groupByScript(winners);
    expect(groups[0].total_spend).toBe(22000);
  });

  it("calculates average ROAS", () => {
    const winners = [
      makeWinner({ roas: 100 }),
      makeWinner({ roas: 200 }),
    ];

    const groups = groupByScript(winners);
    expect(groups[0].avg_roas).toBe(150);
  });

  it("extracts existing expansion types", () => {
    const winners = [
      makeWinner({ expansion_type: "xx" }),
      makeWinner({ expansion_type: "hs" }),
      makeWinner({ expansion_type: "hs" }), // duplicate
    ];

    const groups = groupByScript(winners);
    expect(groups[0].existing_expansion_types).toContain("xx");
    expect(groups[0].existing_expansion_types).toContain("hs");
    expect(groups[0].existing_expansion_types).toHaveLength(2);
  });
});

// ── scoreOpportunity ────────────────────────────────────────────────────

describe("scoreOpportunity", () => {
  it("scores higher for more spend", () => {
    const low = scoreOpportunity(1000, 100, 6, 6, "hs");
    const high = scoreOpportunity(20000, 100, 6, 6, "hs");
    expect(high).toBeGreaterThan(low);
  });

  it("scores higher for better ROAS", () => {
    const low = scoreOpportunity(10000, 60, 6, 6, "hs");
    const high = scoreOpportunity(10000, 200, 6, 6, "hs");
    expect(high).toBeGreaterThan(low);
  });

  it("scores higher for more unexploited types", () => {
    const low = scoreOpportunity(10000, 100, 1, 6, "hs");
    const high = scoreOpportunity(10000, 100, 6, 6, "hs");
    expect(high).toBeGreaterThan(low);
  });

  it("hook stack (hs) scores higher than ad format (af)", () => {
    const hs = scoreOpportunity(10000, 100, 3, 6, "hs");
    const af = scoreOpportunity(10000, 100, 3, 6, "af");
    expect(hs).toBeGreaterThan(af);
  });

  it("returns 0 for zero spend", () => {
    const score = scoreOpportunity(0, 0, 0, 6, "hs");
    // Only safety score (10) + gap score (0) + roas (0) + spend (0)
    expect(score).toBe(10);
  });
});

// ── scoreOpportunities ──────────────────────────────────────────────────

describe("scoreOpportunities", () => {
  it("returns opportunities sorted by score descending", () => {
    const groups = [
      {
        funnel: "357", script_id: "0033",
        winners: [makeWinner({ spend: 17000, roas: 108 })],
        primary_source: makeWinner({ spend: 17000, roas: 108 }),
        total_spend: 17000, avg_roas: 108,
        existing_expansion_types: ["xx"],
      },
      {
        funnel: "dqfe", script_id: "0073",
        winners: [makeWinner({ funnel: "dqfe", script_id: "0073", spend: 2000, roas: 60 })],
        primary_source: makeWinner({ funnel: "dqfe", script_id: "0073", spend: 2000, roas: 60 }),
        total_spend: 2000, avg_roas: 60,
        existing_expansion_types: ["xx"],
      },
    ];

    const opps = scoreOpportunities(groups, 10);
    expect(opps).toHaveLength(2);
    expect(opps[0].score).toBeGreaterThanOrEqual(opps[1].score);
  });

  it("assigns P0 to top scorers", () => {
    // Create 5 groups with varying spend
    const groups = Array.from({ length: 5 }, (_, i) => ({
      funnel: "357", script_id: String(i).padStart(4, "0"),
      winners: [makeWinner({ script_id: String(i).padStart(4, "0"), spend: (5 - i) * 5000 })],
      primary_source: makeWinner({ script_id: String(i).padStart(4, "0"), spend: (5 - i) * 5000 }),
      total_spend: (5 - i) * 5000, avg_roas: 100,
      existing_expansion_types: ["xx"],
    }));

    const opps = scoreOpportunities(groups, 10);
    expect(opps[0].priority).toBe("P0");
  });

  it("skips scripts with all expansion types exploited", () => {
    const groups = [{
      funnel: "357", script_id: "0033",
      winners: [makeWinner()],
      primary_source: makeWinner(),
      total_spend: 17000, avg_roas: 108,
      existing_expansion_types: ["xx", "hs", "dur", "ssr", "cf", "env", "af"],
    }];

    const opps = scoreOpportunities(groups, 10);
    expect(opps).toHaveLength(0);
  });

  it("limits to max_recommendations", () => {
    const groups = Array.from({ length: 20 }, (_, i) => ({
      funnel: "357", script_id: String(i).padStart(4, "0"),
      winners: [makeWinner({ script_id: String(i).padStart(4, "0") })],
      primary_source: makeWinner({ script_id: String(i).padStart(4, "0") }),
      total_spend: 10000, avg_roas: 100,
      existing_expansion_types: ["xx"],
    }));

    const opps = scoreOpportunities(groups, 5);
    expect(opps).toHaveLength(5);
  });

  it("recommends safest unexploited type (hs first)", () => {
    const groups = [{
      funnel: "357", script_id: "0033",
      winners: [makeWinner()],
      primary_source: makeWinner(),
      total_spend: 17000, avg_roas: 108,
      existing_expansion_types: ["xx"], // no hs yet
    }];

    const opps = scoreOpportunities(groups, 10);
    expect(opps[0].recommended_expansion_type).toBe("hs");
  });

  it("skips to next type if safest is already exploited", () => {
    const groups = [{
      funnel: "357", script_id: "0033",
      winners: [makeWinner()],
      primary_source: makeWinner(),
      total_spend: 17000, avg_roas: 108,
      existing_expansion_types: ["xx", "hs"], // hs done, should recommend dur
    }];

    const opps = scoreOpportunities(groups, 10);
    expect(opps[0].recommended_expansion_type).toBe("dur");
  });

  it("assigns confidence based on score thresholds", () => {
    const groups = [
      {
        funnel: "357", script_id: "0001",
        winners: [makeWinner({ script_id: "0001", spend: 50000, roas: 200 })],
        primary_source: makeWinner({ script_id: "0001", spend: 50000, roas: 200 }),
        total_spend: 50000, avg_roas: 200,
        existing_expansion_types: ["xx"],
      },
    ];

    const opps = scoreOpportunities(groups, 10);
    // High spend + high ROAS + many gaps + safe type should score >= 75
    expect(opps[0].confidence).toBe("high");
  });

  it("includes evidence in each opportunity", () => {
    const groups = [{
      funnel: "357", script_id: "0033",
      winners: [makeWinner()],
      primary_source: makeWinner(),
      total_spend: 17000, avg_roas: 108,
      existing_expansion_types: ["xx", "hs"],
    }];

    const opps = scoreOpportunities(groups, 10);
    expect(opps[0].evidence.source_spend).toBe(17856.23);
    expect(opps[0].evidence.source_roas).toBe(108);
    expect(opps[0].evidence.existing_expansions).toContain("hs");
    expect(opps[0].evidence.unexploited_types).not.toContain("hs");
  });
});

// ── analyze ─────────────────────────────────────────────────────────────

describe("analyze", () => {
  it("returns SUCCESS with opportunities from SSS data", async () => {
    const rows = [
      makeSssRow({ spend: "$17,000", roas: "108%", classification: "Winner" }),
      makeSssRow({ funnel: "dqfe", script_id: "0073", spend: "$8,000", roas: "95%", classification: "Winner" }),
      makeSssRow({ funnel: "357", script_id: "0044", spend: "$2,000", classification: "Testing" }),
    ];

    const result = await analyze(
      { spreadsheet_id: "test", min_spend_threshold: 1000, max_recommendations: 10 },
      mockReader(rows),
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status === "SUCCESS") {
      expect(result.data.opportunities.length).toBeGreaterThan(0);
      expect(result.data.total_winners_analyzed).toBe(2);
      expect(result.data.total_rows_scanned).toBe(3);
    }
  });

  it("filters by min_spend_threshold", async () => {
    const rows = [
      makeSssRow({ spend: "$500", classification: "Winner" }),    // below threshold
      makeSssRow({ funnel: "dqfe", script_id: "0073", spend: "$5,000", classification: "Winner" }),
    ];

    const result = await analyze(
      { spreadsheet_id: "test", min_spend_threshold: 1000, max_recommendations: 10 },
      mockReader(rows),
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status === "SUCCESS") {
      expect(result.data.total_winners_analyzed).toBe(1);
      expect(result.data.opportunities[0].funnel).toBe("dqfe");
    }
  });

  it("returns FAILED when no Winners meet threshold", async () => {
    const rows = [
      makeSssRow({ spend: "$500", classification: "Winner" }),
      makeSssRow({ spend: "$200", classification: "Testing" }),
    ];

    const result = await analyze(
      { spreadsheet_id: "test", min_spend_threshold: 1000, max_recommendations: 10 },
      mockReader(rows),
    );

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.error_category).toBe("VALIDATION_ERROR");
      expect(result.message).toContain("No video Winners found");
    }
  });

  it("returns FAILED on Sheets read error", async () => {
    const reader: SheetsReader = {
      getRows: vi.fn().mockRejectedValue(new Error("API quota exceeded")),
    };

    const result = await analyze(
      { spreadsheet_id: "test", min_spend_threshold: 1000, max_recommendations: 10 },
      reader,
    );

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.error_category).toBe("SHEETS_ERROR");
      expect(result.message).toContain("API quota exceeded");
    }
  });

  it("validates min_spend_threshold >= 0", async () => {
    const result = await analyze(
      { spreadsheet_id: "test", min_spend_threshold: -1, max_recommendations: 10 },
      mockReader([]),
    );

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.message).toContain("min_spend_threshold");
    }
  });

  it("validates max_recommendations >= 1", async () => {
    const result = await analyze(
      { spreadsheet_id: "test", min_spend_threshold: 1000, max_recommendations: 0 },
      mockReader([]),
    );

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.message).toContain("max_recommendations");
    }
  });

  it("produces summary with correct counts", async () => {
    const rows = Array.from({ length: 10 }, (_, i) =>
      makeSssRow({
        script_id: String(i).padStart(4, "0"),
        spend: `$${(10 - i) * 3000}`,
        roas: `${80 + i * 10}%`,
        classification: "Winner",
      }),
    );

    const result = await analyze(
      { spreadsheet_id: "test", min_spend_threshold: 1000, max_recommendations: 10 },
      mockReader(rows),
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status === "SUCCESS") {
      const s = result.data.summary;
      expect(s.p0_count + s.p1_count + s.p2_count).toBe(result.data.opportunities.length);
      expect(s.top_funnel).toBe("357");
      expect(s.avg_score).toBeGreaterThan(0);
    }
  });

  it("filters out image assets via asset_type column", async () => {
    const rows = [
      makeSssRow({ asset_type: "img", spend: "$20,000", classification: "Winner" }),
      makeSssRow({ funnel: "dqfe", script_id: "0012", asset_type: "vd", spend: "$10,000", classification: "Winner" }),
    ];

    const result = await analyze(
      { spreadsheet_id: "test", min_spend_threshold: 1000, max_recommendations: 10 },
      mockReader(rows),
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status === "SUCCESS") {
      expect(result.data.total_winners_analyzed).toBe(1);
      expect(result.data.opportunities[0].funnel).toBe("dqfe");
    }
  });

  it("filters out image assets via asset ID fallback when column is dash", async () => {
    const rows = [
      makeSssRow({
        asset_type: "—",
        asset_id: "gbf-i001-v0004-1080x1350-nn-img-x-x-jdmr-cf-blackfriday2025-11072025",
        spend: "$20,000", classification: "Winner",
      }),
      makeSssRow({
        funnel: "dqfe", script_id: "0012", asset_type: "—",
        asset_id: "dqfe-0012-v0001-9x16-nn-vd-1min-mris-arvn-ch-blackfriday2025-11212025",
        spend: "$10,000", classification: "Winner",
      }),
    ];

    const result = await analyze(
      { spreadsheet_id: "test", min_spend_threshold: 1000, max_recommendations: 10 },
      mockReader(rows),
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status === "SUCCESS") {
      expect(result.data.total_winners_analyzed).toBe(1);
      expect(result.data.opportunities[0].funnel).toBe("dqfe");
    }
  });

  it("accepts all video asset types (vd, avo, bvo, tlr)", async () => {
    const videoTypes = ["vd", "avo", "bvo", "tlr"];
    const rows = videoTypes.map((type, i) =>
      makeSssRow({
        script_id: String(i).padStart(4, "0"),
        asset_type: type,
        spend: "$5,000",
        classification: "Winner",
      }),
    );

    const result = await analyze(
      { spreadsheet_id: "test", min_spend_threshold: 1000, max_recommendations: 10 },
      mockReader(rows),
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status === "SUCCESS") {
      expect(result.data.total_winners_analyzed).toBe(4);
    }
  });

  it("returns FAILED when only image Winners exist", async () => {
    const rows = [
      makeSssRow({ asset_type: "img", spend: "$20,000", classification: "Winner" }),
      makeSssRow({
        funnel: "gbf", script_id: "i003", asset_type: "—",
        asset_id: "gbf-i003-v0001-1080x1350-nn-img-x-x-ednlc-cwnlc-nlcad-blackfriday2025-11192025",
        spend: "$10,000", classification: "Winner",
      }),
    ];

    const result = await analyze(
      { spreadsheet_id: "test", min_spend_threshold: 1000, max_recommendations: 10 },
      mockReader(rows),
    );

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.message).toContain("image assets filtered out");
    }
  });

  it("returns FAILED when all scripts fully exploited", async () => {
    const rows = [
      makeSssRow({
        spend: "$17,000",
        classification: "Winner",
        expansion_type: "hs",
      }),
    ];
    // This Winner already has hs. But we need ALL types exploited.
    // Actually, it only has "hs". The others (dur, ssr, etc.) are unexploited.
    // To truly test full exploitation, we need multiple rows per script.
    // Let's create rows with all expansion types.
    const allTypes = ["xx", "hs", "dur", "ssr", "cf", "env", "af"];
    const fullRows = allTypes.map(et =>
      makeSssRow({ expansion_type: et, spend: "$17,000", classification: "Winner" }),
    );

    const result = await analyze(
      { spreadsheet_id: "test", min_spend_threshold: 1000, max_recommendations: 10 },
      mockReader(fullRows),
    );

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.message).toContain("fully exploited");
    }
  });
});
