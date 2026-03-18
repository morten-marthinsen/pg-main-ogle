import { describe, it, expect } from "vitest";
import { generate } from "./index.js";
import type { NamingGeneratorInput } from "../../types/pipeline.js";

/** Base valid expansion input — 357 sad duration expansion. */
function validExpansionInput(
  overrides: Partial<NamingGeneratorInput> = {},
): NamingGeneratorInput {
  return {
    funnel: "357",
    script_id: "0003",
    platform: "fb",
    dimensions: "9x16",
    length_tier: "60s",
    ad_category: "exv",
    expansion_type: "dur",
    asset_type: "sad",
    talent_code: "gamc",
    copywriter_initials: "co",
    country_code: "us",
    reserved_variation_numbers: ["v0030"],
    creation_date: "20260206",
    ...overrides,
  };
}

/** Base valid net new input. */
function validNetNewInput(
  overrides: Partial<NamingGeneratorInput> = {},
): NamingGeneratorInput {
  return {
    funnel: "dqfe",
    script_id: "0026",
    platform: "fb",
    dimensions: "9x16",
    length_tier: "180s",
    ad_category: "nn",
    expansion_type: "xx",
    asset_type: "bvo",
    talent_code: "haha",
    copywriter_initials: "ch",
    country_code: "us",
    reserved_variation_numbers: ["v0001"],
    creation_date: "20260206",
    ...overrides,
  };
}

describe("naming_generator", () => {
  // Test 1: Generate valid expansion ID
  it("generates a valid expansion ID (357 sad duration expansion)", () => {
    const result = generate(validExpansionInput());

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    expect(result.data.asset_ids).toHaveLength(1);
    const id = result.data.asset_ids[0];
    expect(id.full_id).toBe(
      "357-0003-v0030-fb-9x16-60s-exv-dur-sad-gamc-vv-co-us-20260206",
    );
    expect(id.validation_status).toBe("PASSED");
    expect(id.validation_errors).toHaveLength(0);
  });

  // Test 2: Generate valid net new ID
  it("generates a valid net new ID (nn with xx expansion)", () => {
    const result = generate(validNetNewInput());

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    const id = result.data.asset_ids[0];
    expect(id.full_id).toBe(
      "dqfe-0026-v0001-fb-9x16-180s-nn-xx-bvo-haha-vv-ch-us-20260206",
    );
    expect(id.validation_status).toBe("PASSED");
  });

  // Test 3: Reject nn with non-xx expansion (business rule 1)
  it("rejects nn with non-xx expansion type", () => {
    const result = generate(
      validNetNewInput({ expansion_type: "dur" }),
    );

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.error_category).toBe("NAMING_ERROR");
    expect(result.message).toContain('requires ExpansionType "xx"');
  });

  // Test 4: Reject exv with xx expansion (business rule 2)
  it("rejects exv with xx expansion type", () => {
    const result = generate(
      validExpansionInput({ expansion_type: "xx" }),
    );

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.error_category).toBe("NAMING_ERROR");
    expect(result.message).toContain("requires a specific ExpansionType");
  });

  // Test 5: Generate image ID with xx platform/length
  it("generates a valid image ID with xx platform and length", () => {
    const result = generate({
      funnel: "357",
      script_id: "i001",
      platform: "xx",
      dimensions: "1080x1350",
      length_tier: "xx",
      ad_category: "nn",
      expansion_type: "xx",
      asset_type: "img",
      talent_code: "haha",
      copywriter_initials: "co",
      country_code: "us",
      reserved_variation_numbers: ["v0001"],
      creation_date: "20260206",
    });

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    const id = result.data.asset_ids[0];
    expect(id.full_id).toBe(
      "357-i001-v0001-xx-1080x1350-xx-nn-xx-img-haha-vv-co-us-20260206",
    );
    expect(id.positions.script_id).toBe("i001");
    expect(id.positions.platform).toBe("xx");
    expect(id.positions.length_tier).toBe("xx");
  });

  // Test 6: Reject fb with 16x9 (business rule 4)
  it("rejects fb platform with 16x9 dimensions", () => {
    const result = generate(
      validExpansionInput({ dimensions: "16x9" }),
    );

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.error_category).toBe("NAMING_ERROR");
    expect(result.message).toContain('Facebook requires dimensions "9x16"');
  });

  // Test 7: Generate multiple variations (batch)
  it("generates multiple variation IDs in a batch", () => {
    const result = generate(
      validExpansionInput({
        reserved_variation_numbers: ["v0030", "v0031", "v0032"],
      }),
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    expect(result.data.asset_ids).toHaveLength(3);
    expect(result.data.asset_ids[0].positions.variation_id).toBe("v0030");
    expect(result.data.asset_ids[1].positions.variation_id).toBe("v0031");
    expect(result.data.asset_ids[2].positions.variation_id).toBe("v0032");

    // All should have the same base but different variation IDs
    const ids = result.data.asset_ids.map((a) => a.full_id);
    expect(ids[0]).toContain("v0030");
    expect(ids[1]).toContain("v0031");
    expect(ids[2]).toContain("v0032");
  });

  // Test 8: Generate ID with promo code (bfcm)
  it("generates an ID with promo code appended", () => {
    const result = generate(
      validExpansionInput({ promo_name: "bfcm" }),
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    const id = result.data.asset_ids[0];
    expect(id.full_id).toBe(
      "357-0003-v0030-fb-9x16-60s-exv-dur-sad-gamc-vv-co-us-20260206-bfcm",
    );
    expect(id.positions.promo_name).toBe("bfcm");
  });

  // Test 9: Verify editor is always "vv"
  it("always sets editor initials to vv (Veda)", () => {
    const result = generate(validExpansionInput());

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    const id = result.data.asset_ids[0];
    expect(id.positions.editor_initials).toBe("vv");
    // Confirm it appears in the full ID at the right position
    const parts = id.full_id.split("-");
    expect(parts[10]).toBe("vv"); // Position 11 (0-indexed = 10)
  });

  // Test 10: Verify creation date defaults to today
  it("defaults creation date to today when not provided", () => {
    const input = validExpansionInput();
    delete input.creation_date;

    const result = generate(input);

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    const id = result.data.asset_ids[0];
    // Should be today's date in YYYYMMDD format
    const today = new Date();
    const expected =
      `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
    expect(id.positions.creation_date).toBe(expected);
  });

  // Test 11: Reject image ScriptID with non-xx platform (business rule 3)
  it("rejects image ScriptID with non-xx platform", () => {
    const result = generate({
      funnel: "357",
      script_id: "i001",
      platform: "fb",
      dimensions: "9x16",
      length_tier: "xx",
      ad_category: "nn",
      expansion_type: "xx",
      asset_type: "img",
      talent_code: "haha",
      copywriter_initials: "co",
      country_code: "us",
      reserved_variation_numbers: ["v0001"],
      creation_date: "20260206",
    });

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("image/HTML ScriptID");
  });

  // Test 12: Reject invalid variation ID format
  it("rejects invalid variation ID format", () => {
    const result = generate(
      validExpansionInput({ reserved_variation_numbers: ["v30"] }),
    );

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("Invalid VariationID format");
  });

  // Test 13: Reject nnmu with non-xx expansion (business rule 1 — mashup)
  it("rejects nnmu with non-xx expansion type", () => {
    const result = generate(
      validNetNewInput({
        ad_category: "nnmu",
        expansion_type: "hs",
      }),
    );

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain('"nnmu" requires ExpansionType "xx"');
  });

  // Test 14: Verify position breakdown matches full_id
  it("position breakdown matches the full_id when reassembled", () => {
    const result = generate(validExpansionInput());

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;

    const id = result.data.asset_ids[0];
    const parts = id.full_id.split("-");

    expect(parts[0]).toBe(id.positions.funnel);
    expect(parts[1]).toBe(id.positions.script_id);
    expect(parts[2]).toBe(id.positions.variation_id);
    expect(parts[3]).toBe(id.positions.platform);
    expect(parts[4]).toBe(id.positions.dimensions);
    expect(parts[5]).toBe(id.positions.length_tier);
    expect(parts[6]).toBe(id.positions.ad_category);
    expect(parts[7]).toBe(id.positions.expansion_type);
    expect(parts[8]).toBe(id.positions.asset_type);
    expect(parts[9]).toBe(id.positions.talent_code);
    expect(parts[10]).toBe(id.positions.editor_initials);
    expect(parts[11]).toBe(id.positions.copywriter_initials);
    expect(parts[12]).toBe(id.positions.country_code);
    expect(parts[13]).toBe(id.positions.creation_date);
  });

  // Test 15: Reject empty variation numbers array
  it("rejects empty variation numbers array", () => {
    const result = generate(
      validExpansionInput({ reserved_variation_numbers: [] }),
    );

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("No reserved variation numbers");
  });

  // Test 16: Support 2-4 character copywriter codes
  it("accepts 4-character copywriter code (bmdf)", () => {
    const result = generate(
      validExpansionInput({ copywriter_initials: "bmdf" }),
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.asset_ids[0].positions.copywriter_initials).toBe("bmdf");
  });

  // Test 17: YouTube supports 16x9
  it("allows yt platform with 16x9 dimensions", () => {
    const result = generate(
      validExpansionInput({
        platform: "yt",
        dimensions: "16x9",
      }),
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.asset_ids[0].positions.platform).toBe("yt");
    expect(result.data.asset_ids[0].positions.dimensions).toBe("16x9");
  });
});
