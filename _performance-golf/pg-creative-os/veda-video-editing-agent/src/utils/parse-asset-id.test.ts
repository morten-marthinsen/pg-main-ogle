import { describe, it, expect } from "vitest";
import { parseAssetId } from "./parse-asset-id.js";

describe("parseAssetId", () => {
  // ── v3.3 format (with country code) ─────────────────────────────────────

  it("parses a valid v3.3 asset ID (14 positions, no promo)", () => {
    const result = parseAssetId(
      "357-0003-v0030-fb-9x16-60s-exv-dur-sad-gamc-vv-co-us-20260206",
    );

    expect(result.status).toBe("PARSED");
    expect(result.format_version).toBe("v3.3");
    expect(result.errors).toHaveLength(0);
    expect(result.positions).toEqual({
      funnel: "357",
      script_id: "0003",
      variation_id: "v0030",
      platform: "fb",
      dimensions: "9x16",
      length_tier: "60s",
      ad_category: "exv",
      expansion_type: "dur",
      asset_type: "sad",
      talent_code: "gamc",
      editor_initials: "vv",
      copywriter_initials: "co",
      country_code: "us",
      creation_date: "20260206",
    });
  });

  it("parses a valid v3.3 asset ID with promo (15 positions)", () => {
    const result = parseAssetId(
      "357-0003-v0030-fb-9x16-60s-exv-dur-sad-gamc-vv-co-us-20260206-bfcm",
    );

    expect(result.status).toBe("PARSED");
    expect(result.format_version).toBe("v3.3");
    expect(result.positions?.promo_name).toBe("bfcm");
  });

  it("parses a net new asset ID", () => {
    const result = parseAssetId(
      "dqfe-0026-v0001-fb-9x16-180s-nn-xx-bvo-haha-vv-ch-us-20260206",
    );

    expect(result.status).toBe("PARSED");
    expect(result.positions?.ad_category).toBe("nn");
    expect(result.positions?.expansion_type).toBe("xx");
    expect(result.positions?.funnel).toBe("dqfe");
  });

  it("parses an image asset ID with xx platform/length", () => {
    const result = parseAssetId(
      "357-i001-v0001-xx-1080x1350-xx-nn-xx-img-haha-vv-co-us-20260206",
    );

    expect(result.status).toBe("PARSED");
    expect(result.positions?.script_id).toBe("i001");
    expect(result.positions?.platform).toBe("xx");
    expect(result.positions?.length_tier).toBe("xx");
    expect(result.positions?.asset_type).toBe("img");
  });

  it("parses asset ID with non-US country code", () => {
    const result = parseAssetId(
      "357-0003-v0001-fb-9x16-60s-nn-xx-sad-haha-vv-co-au-20260206",
    );

    expect(result.status).toBe("PARSED");
    expect(result.positions?.country_code).toBe("au");
  });

  // ── v3.2 format (no country code) ──────────────────────────────────────

  it("parses a v3.2 asset ID (13 positions, no country code)", () => {
    const result = parseAssetId(
      "357-0003-v0010-fb-9x16-60s-exv-dur-sad-gamc-ca-co-20251115",
    );

    expect(result.status).toBe("PARSED");
    expect(result.format_version).toBe("v3.2");
    expect(result.positions?.country_code).toBe("us"); // defaulted
    expect(result.positions?.creation_date).toBe("20251115");
    expect(result.warnings).toContain(
      'v3.2 format detected (no country code) — defaulting to "us"',
    );
  });

  it("parses a v3.2 asset ID with promo (14 positions)", () => {
    const result = parseAssetId(
      "357-0003-v0010-fb-9x16-60s-exv-dur-sad-gamc-ca-co-20251115-bfcm",
    );

    expect(result.status).toBe("PARSED");
    expect(result.format_version).toBe("v3.2");
    expect(result.positions?.promo_name).toBe("bfcm");
    expect(result.positions?.creation_date).toBe("20251115");
  });

  // ── Legacy ad categories ───────────────────────────────────────────────

  it("parses legacy ver/hor ad categories with warning", () => {
    const result = parseAssetId(
      "357-0003-v0010-fb-9x16-60s-ver-dur-sad-gamc-vv-co-us-20250901",
    );

    expect(result.status).toBe("PARSED");
    expect(result.positions?.ad_category).toBe("ver");
    expect(result.warnings.some((w) => w.includes("Legacy AdCategory"))).toBe(true);
  });

  // ── Edge cases ─────────────────────────────────────────────────────────

  it("handles case-insensitive input", () => {
    const result = parseAssetId(
      "357-0003-V0030-FB-9X16-60S-EXV-DUR-SAD-GAMC-VV-CO-US-20260206",
    );

    expect(result.status).toBe("PARSED");
    expect(result.positions?.platform).toBe("fb");
    expect(result.positions?.variation_id).toBe("v0030");
  });

  it("strips .mp4 file extension", () => {
    const result = parseAssetId(
      "357-0033-v0001-9x16-nn-vd-1min-garymc-mrten-cmrten-x-07102025.mp4",
    );
    expect(result.status).not.toBe("ERROR");
    expect(result.warnings.some((w) => w.includes("file extension"))).toBe(true);
  });

  it("strips Google Sheets copy suffix", () => {
    const result = parseAssetId(
      "357-0059-v0004-9x16-nn-vd-0min-gcarry-clev-cclev-x-09192025 - copy 3",
    );
    expect(result.status).not.toBe("ERROR");
    expect(result.warnings.some((w) => w.includes("Sheets suffix"))).toBe(true);
  });

  it("strips Google Sheets short suffix (e.g. ' - ac')", () => {
    const result = parseAssetId(
      "dqfe-0012-v0001-9x16-nn-vd-1min-mris-arvn-ch-blackfriday2025-11212025 - ac",
    );
    expect(result.status).not.toBe("ERROR");
    expect(result.warnings.some((w) => w.includes("Sheets suffix"))).toBe(true);
  });

  it("strips .mp4 extension AND Google Sheets suffix together", () => {
    const result = parseAssetId(
      "357-0033-v0001-9x16-nn-vd-1min-garymc-mrten-cmrten-x-07102025.mp4 - copy 3",
    );
    expect(result.status).not.toBe("ERROR");
    expect(result.warnings.some((w) => w.includes("file extension"))).toBe(true);
    expect(result.warnings.some((w) => w.includes("Sheets suffix"))).toBe(true);
  });

  it("strips -sca scaling variant suffix", () => {
    const result = parseAssetId(
      "357-0003-v0030-fb-9x16-60s-exv-dur-sad-gamc-vv-co-us-20260206-sca",
    );

    expect(result.status).toBe("PARSED");
    expect(result.warnings.some((w) => w.includes("scaling variant"))).toBe(true);
    // Should NOT have promo_name of "sca"
    expect(result.positions?.promo_name).toBeUndefined();
  });

  it("handles unknown country code with warning (future-proofing)", () => {
    const result = parseAssetId(
      "357-0003-v0001-fb-9x16-60s-nn-xx-sad-haha-vv-co-zz-20260206",
    );

    expect(result.status).toBe("PARSED");
    expect(result.format_version).toBe("v3.3");
    expect(result.positions?.country_code).toBe("zz");
    expect(result.warnings.some((w) => w.includes("Unknown country code"))).toBe(true);
  });

  // ── Error cases ────────────────────────────────────────────────────────

  it("rejects empty string", () => {
    const result = parseAssetId("");
    expect(result.status).toBe("ERROR");
    expect(result.errors[0]).toContain("empty");
  });

  it("parses old-format IDs with heuristic fallback", () => {
    const result = parseAssetId("357-0003-v0001-9x16");
    expect(result.status).toBe("PARSED");
    expect(result.positions!.funnel).toBe("357");
    expect(result.positions!.script_id).toBe("0003");
    expect(result.positions!.variation_id).toBe("v0001");
    expect(result.positions!.dimensions).toBe("9x16");
    expect(result.warnings.some((w) => w.includes("Old-format"))).toBe(true);
  });

  it("parses real production old-format ID (dqfe-0012)", () => {
    const result = parseAssetId("dqfe-0012-v0001-9x16-nn-vd-1min-mris-arvn-ch-blackfriday2025-11212025");
    expect(result.status).toBe("PARSED");
    expect(result.positions!.funnel).toBe("dqfe");
    expect(result.positions!.script_id).toBe("0012");
    expect(result.positions!.variation_id).toBe("v0001");
    expect(result.positions!.dimensions).toBe("9x16");
    expect(result.positions!.ad_category).toBe("nn");
    expect(result.positions!.asset_type).toBe("vd");
    expect(result.positions!.length_tier).toBe("60s"); // "1min" mapped to v3.4 tier
    expect(result.positions!.creation_date).toBe("11212025");
    expect(result.warnings.some((w) => w.includes("Old-format"))).toBe(true);
  });

  it("rejects IDs with fewer than 3 positions", () => {
    const result = parseAssetId("357-0003");
    expect(result.status).toBe("ERROR");
    expect(result.errors[0]).toContain("need at least funnel-scriptId-variation");
  });

  it("rejects too many positions", () => {
    const result = parseAssetId(
      "357-0003-v0001-fb-9x16-60s-nn-xx-sad-haha-vv-co-us-20260206-bfcm-extra-stuff",
    );
    expect(result.status).toBe("ERROR");
    expect(result.errors[0]).toContain("Too many");
  });

  it("rejects invalid variation ID", () => {
    const result = parseAssetId(
      "357-0003-x0030-fb-9x16-60s-exv-dur-sad-gamc-vv-co-us-20260206",
    );
    expect(result.status).toBe("ERROR");
    expect(result.errors.some((e) => e.includes("VariationID"))).toBe(true);
  });

  it("rejects invalid platform", () => {
    const result = parseAssetId(
      "357-0003-v0030-ig-9x16-60s-exv-dur-sad-gamc-vv-co-us-20260206",
    );
    expect(result.status).toBe("ERROR");
    expect(result.errors.some((e) => e.includes("Platform"))).toBe(true);
  });

  it("rejects invalid creation date", () => {
    const result = parseAssetId(
      "357-0003-v0030-fb-9x16-60s-exv-dur-sad-gamc-vv-co-us-2026020",
    );
    expect(result.status).toBe("ERROR");
    expect(result.errors.some((e) => e.includes("CreationDate"))).toBe(true);
  });

  // ── Round-trip: generate → parse ───────────────────────────────────────

  it("round-trips with naming_generator output", async () => {
    const { generate } = await import(
      "../sub-agents/naming-generator/index.js"
    );

    const genResult = generate({
      funnel: "dqfe",
      script_id: "0026",
      platform: "fb",
      dimensions: "9x16",
      length_tier: "180s",
      ad_category: "exv",
      expansion_type: "hs",
      asset_type: "bvo",
      talent_code: "haha",
      copywriter_initials: "co",
      country_code: "us",
      reserved_variation_numbers: ["v0030"],
      creation_date: "20260206",
    });

    expect(genResult.status).toBe("SUCCESS");
    if (genResult.status !== "SUCCESS") return;

    const generatedId = genResult.data.asset_ids[0].full_id;
    const parseResult = parseAssetId(generatedId);

    expect(parseResult.status).toBe("PARSED");
    expect(parseResult.positions?.funnel).toBe("dqfe");
    expect(parseResult.positions?.script_id).toBe("0026");
    expect(parseResult.positions?.variation_id).toBe("v0030");
    expect(parseResult.positions?.editor_initials).toBe("vv");
    expect(parseResult.positions?.country_code).toBe("us");
  });
});
