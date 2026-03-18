import { describe, it, expect } from "vitest";
import { process } from "./index.js";
import type { RawIntake } from "../../types/pipeline.js";

/** Valid v3.3 source asset ID for testing. */
const VALID_SOURCE = "357-0003-v0010-fb-9x16-60s-exv-dur-sad-gamc-ca-co-us-20260101";

/** Base valid expansion intake. */
function validExpansionIntake(overrides: Partial<RawIntake> = {}): RawIntake {
  return {
    source_asset_id: VALID_SOURCE,
    expansion_type: "dur",
    root_angle_name: "Break 90",
    target_variations: 3,
    edit_method: "assembly",
    directing_person: "co",
    special_instructions: null,
    ...overrides,
  };
}

/** Base valid net new intake. */
function validNetNewIntake(overrides: Partial<RawIntake> = {}): RawIntake {
  return {
    source_asset_id: "dqfe-0026-v0001-fb-9x16-180s-nn-xx-bvo-haha-vv-ch-us-20260101",
    expansion_type: "xx",
    root_angle_name: "Swing Circle",
    target_variations: 1,
    edit_method: "assembly",
    directing_person: "co",
    special_instructions: null,
    ...overrides,
  };
}

describe("tess_connector", () => {
  // ── Auto-inheritance ───────────────────────────────────────────────────

  it("auto-inherits platform, dimensions, length_tier, country_code, talent_code, asset_type from source", () => {
    const result = process(validExpansionIntake());

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    expect(result.data.platform).toBe("fb");
    expect(result.data.dimensions).toBe("9x16");
    expect(result.data.length_tier).toBe("60s");
    expect(result.data.country_code).toBe("us");
    expect(result.data.talent_code).toBe("gamc");
    expect(result.data.asset_type).toBe("sad");
  });

  it("extracts funnel and script_id from source", () => {
    const result = process(validExpansionIntake());

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    expect(result.data.funnel).toBe("357");
    expect(result.data.script_id).toBe("0003");
  });

  it("preserves source_positions from parsed source", () => {
    const result = process(validExpansionIntake());

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    expect(result.data.source_positions.variation_id).toBe("v0010");
    expect(result.data.source_positions.editor_initials).toBe("ca");
  });

  // ── Override behavior ──────────────────────────────────────────────────

  it("allows overriding inherited fields", () => {
    const result = process(
      validExpansionIntake({
        platform: "yt",
        dimensions: "16x9",
        country_code: "au",
      }),
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    expect(result.data.platform).toBe("yt");
    expect(result.data.dimensions).toBe("16x9");
    expect(result.data.country_code).toBe("au");
    // Non-overridden fields still inherited
    expect(result.data.talent_code).toBe("gamc");
  });

  // ── Ad category derivation ─────────────────────────────────────────────

  it("derives ad_category = nn when expansion_type is xx", () => {
    const result = process(validNetNewIntake());

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    expect(result.data.ad_category).toBe("nn");
  });

  it("derives ad_category = exv when expansion_type is not xx", () => {
    const result = process(validExpansionIntake());

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    expect(result.data.ad_category).toBe("exv");
  });

  it("allows explicit ad_category override to exh", () => {
    const result = process(
      validExpansionIntake({ ad_category: "exh" }),
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    expect(result.data.ad_category).toBe("exh");
  });

  it("allows explicit ad_category override to nnmu", () => {
    const result = process(
      validNetNewIntake({ ad_category: "nnmu" }),
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    expect(result.data.ad_category).toBe("nnmu");
  });

  // ── Pass-through fields ────────────────────────────────────────────────

  it("passes through root_angle_name, target_variations, edit_method, directing_person, special_instructions", () => {
    const result = process(
      validExpansionIntake({
        special_instructions: "Use the opening hook from 0:45",
      }),
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    expect(result.data.root_angle_name).toBe("Break 90");
    expect(result.data.target_variations).toBe(3);
    expect(result.data.edit_method).toBe("assembly");
    expect(result.data.directing_person).toBe("co");
    expect(result.data.special_instructions).toBe("Use the opening hook from 0:45");
  });

  it("passes through promo_name when provided", () => {
    const result = process(
      validExpansionIntake({ promo_name: "bfcm" }),
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    expect(result.data.promo_name).toBe("bfcm");
  });

  // ── Validation: missing required fields ────────────────────────────────

  it("rejects empty source_asset_id", () => {
    const result = process(validExpansionIntake({ source_asset_id: "" }));

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.error_category).toBe("VALIDATION_ERROR");
    expect(result.message).toContain("source_asset_id");
  });

  it("rejects missing root_angle_name", () => {
    const result = process(validExpansionIntake({ root_angle_name: "" }));

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("root_angle_name");
  });

  it("rejects target_variations < 1", () => {
    const result = process(validExpansionIntake({ target_variations: 0 }));

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("target_variations");
  });

  it("rejects missing directing_person", () => {
    const result = process(validExpansionIntake({ directing_person: "" }));

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("directing_person");
  });

  it("rejects directing_person with wrong length", () => {
    const result = process(validExpansionIntake({ directing_person: "a" }));

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("2-4 characters");
  });

  it("accepts 4-character directing_person (bmdf)", () => {
    const result = process(validExpansionIntake({ directing_person: "bmdf" }));

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.directing_person).toBe("bmdf");
  });

  // ── Validation: invalid source asset ID ────────────────────────────────

  it("rejects malformed source asset ID", () => {
    const result = process(
      validExpansionIntake({ source_asset_id: "not-a-valid-id" }),
    );

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("parsing failed");
  });

  // ── Cross-field validation ─────────────────────────────────────────────

  it("rejects nn ad_category with non-xx expansion_type", () => {
    const result = process(
      validExpansionIntake({ ad_category: "nn" }),
    );

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain('requires expansion_type "xx"');
  });

  it("rejects exv ad_category with xx expansion_type", () => {
    const result = process(
      validNetNewIntake({ ad_category: "exv" }),
    );

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("requires a specific expansion_type");
  });

  // ── Invalid override values ────────────────────────────────────────────

  it("rejects invalid platform override", () => {
    const result = process(
      validExpansionIntake({ platform: "ig" }),
    );

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("platform");
  });

  it("rejects invalid country_code override", () => {
    const result = process(
      validExpansionIntake({ country_code: "zz" }),
    );

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("country_code");
  });

  // ── End-to-end: tess_connector → naming_generator ──────────────────────

  it("produces output compatible with naming_generator input", async () => {
    const { generate } = await import("../naming-generator/index.js");

    const connResult = process(validExpansionIntake());
    expect(connResult.status).toBe("SUCCESS");
    if (connResult.status !== "SUCCESS") return;

    const resolved = connResult.data;

    // Build NamingGeneratorInput from ResolvedIntake
    const genResult = generate({
      funnel: resolved.funnel,
      script_id: resolved.script_id,
      platform: resolved.platform,
      dimensions: resolved.dimensions,
      length_tier: resolved.length_tier,
      ad_category: resolved.ad_category,
      expansion_type: resolved.expansion_type,
      asset_type: resolved.asset_type,
      talent_code: resolved.talent_code,
      copywriter_initials: resolved.directing_person,
      country_code: resolved.country_code,
      reserved_variation_numbers: ["v0030", "v0031", "v0032"],
      creation_date: "20260206",
      ...(resolved.promo_name ? { promo_name: resolved.promo_name } : {}),
    });

    expect(genResult.status).toBe("SUCCESS");
    if (genResult.status !== "SUCCESS") return;

    expect(genResult.data.asset_ids).toHaveLength(3);
    expect(genResult.data.asset_ids[0].validation_status).toBe("PASSED");
    expect(genResult.data.asset_ids[0].full_id).toContain("357-0003-v0030");
  });
});
