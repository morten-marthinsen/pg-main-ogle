import { describe, it, expect, vi } from "vitest";
import { applyMetadata, buildMetadataValues } from "./index.js";
import type { MetadataManagerInput, AssetIdPositions, GeneratedAssetId } from "../../types/pipeline.js";

// ── Test Helpers ─────────────────────────────────────────────────────────────

function makePositions(overrides?: Partial<AssetIdPositions>): AssetIdPositions {
  return {
    funnel: "tof",
    script_id: "0003",
    variation_id: "v0031",
    platform: "me",
    dimensions: "9x16",
    length_tier: "60s",
    ad_category: "exv",
    expansion_type: "hs",
    asset_type: "ugc",
    talent_code: "mjkr",
    editor_initials: "vv",
    copywriter_initials: "co",
    country_code: "us",
    creation_date: "20260212",
    ...overrides,
  };
}

function makeAssetId(overrides?: Partial<AssetIdPositions>): GeneratedAssetId {
  const positions = makePositions(overrides);
  const parts = [
    positions.funnel, positions.script_id, positions.variation_id,
    positions.platform, positions.dimensions, positions.length_tier,
    positions.ad_category, positions.expansion_type, positions.asset_type,
    positions.talent_code, positions.editor_initials, positions.copywriter_initials,
    positions.country_code, positions.creation_date,
  ];
  if (positions.promo_name) parts.push(positions.promo_name);
  return {
    full_id: parts.join("-"),
    positions,
    validation_status: "PASSED",
    validation_errors: [],
  };
}

function makeInput(count = 1): MetadataManagerInput {
  const asset_ids: GeneratedAssetId[] = [];
  const iconik_asset_uuids: string[] = [];
  for (let i = 0; i < count; i++) {
    asset_ids.push(makeAssetId({ variation_id: `v003${i + 1}` }));
    iconik_asset_uuids.push(`uuid-${i + 1}`);
  }
  return {
    asset_ids,
    iconik_asset_uuids,
    metadata_view_id: "view-abc-123",
  };
}

function mockClient(overrides?: {
  setMetadata?: () => Promise<void>;
  getMetadata?: () => Promise<Record<string, string>>;
  setAssetTitle?: () => Promise<void>;
}) {
  return {
    setMetadata: overrides?.setMetadata ?? vi.fn().mockResolvedValue(undefined),
    getMetadata: overrides?.getMetadata ?? vi.fn().mockImplementation(
      (_assetId: string, _viewId: string) => Promise.resolve({
        veda_funnel: "tof",
        veda_script_id: "0003",
        veda_variation_id: "v0031",
        veda_platform: "me",
        veda_dimensions: "9x16",
        veda_length_tier: "60s",
        veda_ad_category: "exv",
        veda_expansion_type: "hs",
        veda_asset_type: "ugc",
        veda_talent_code: "mjkr",
        veda_editor_initials: "vv",
        veda_copywriter_initials: "co",
        veda_country_code: "us",
        veda_creation_date: "20260212",
      }),
    ),
    setAssetTitle: overrides?.setAssetTitle ?? vi.fn().mockResolvedValue(undefined),
  } as any;
}

// ── buildMetadataValues ──────────────────────────────────────────────────────

describe("buildMetadataValues", () => {
  it("maps all 14 required positions to veda_ prefixed fields", () => {
    const positions = makePositions();
    const values = buildMetadataValues(positions);

    expect(values.veda_funnel).toBe("tof");
    expect(values.veda_script_id).toBe("0003");
    expect(values.veda_variation_id).toBe("v0031");
    expect(values.veda_platform).toBe("me");
    expect(values.veda_dimensions).toBe("9x16");
    expect(values.veda_length_tier).toBe("60s");
    expect(values.veda_ad_category).toBe("exv");
    expect(values.veda_expansion_type).toBe("hs");
    expect(values.veda_asset_type).toBe("ugc");
    expect(values.veda_talent_code).toBe("mjkr");
    expect(values.veda_editor_initials).toBe("vv");
    expect(values.veda_copywriter_initials).toBe("co");
    expect(values.veda_country_code).toBe("us");
    expect(values.veda_creation_date).toBe("20260212");
    expect(Object.keys(values)).toHaveLength(14);
  });

  it("includes promo_name when present", () => {
    const positions = makePositions({ promo_name: "bfcm24" });
    const values = buildMetadataValues(positions);

    expect(values.veda_promo_name).toBe("bfcm24");
    expect(Object.keys(values)).toHaveLength(15);
  });

  it("excludes promo_name when undefined", () => {
    const positions = makePositions();
    const values = buildMetadataValues(positions);

    expect(values.veda_promo_name).toBeUndefined();
  });
});

// ── applyMetadata ────────────────────────────────────────────────────────────

describe("applyMetadata", () => {
  it("succeeds for a single asset", async () => {
    const input = makeInput(1);
    const client = mockClient();

    const result = await applyMetadata(input, client);

    expect(result.status).toBe("SUCCESS");
    if (result.status === "SUCCESS") {
      expect(result.data.metadata_applied).toHaveLength(1);
      expect(result.data.metadata_applied[0]!.iconik_uuid).toBe("uuid-1");
      expect(result.data.metadata_applied[0]!.fields_applied).toBe(14);
      expect(result.data.metadata_applied[0]!.verified).toBe(true);
    }
  });

  it("succeeds for multiple assets", async () => {
    const input = makeInput(3);
    // Mock getMetadata to return matching values for each variation
    const client = mockClient({
      getMetadata: vi.fn().mockImplementation(() =>
        Promise.resolve({
          veda_funnel: "tof",
          veda_script_id: "0003",
          veda_variation_id: expect.any(String), // varies per asset
          veda_platform: "me",
          veda_dimensions: "9x16",
          veda_length_tier: "60s",
          veda_ad_category: "exv",
          veda_expansion_type: "hs",
          veda_asset_type: "ugc",
          veda_talent_code: "mjkr",
          veda_editor_initials: "vv",
          veda_copywriter_initials: "co",
          veda_country_code: "us",
          veda_creation_date: "20260212",
        }),
      ),
    });

    // Need to override getMetadata to return correct variation_id per call
    let callIdx = 0;
    (client.getMetadata as any).mockImplementation(() => {
      callIdx++;
      return Promise.resolve({
        veda_funnel: "tof",
        veda_script_id: "0003",
        veda_variation_id: `v003${callIdx}`,
        veda_platform: "me",
        veda_dimensions: "9x16",
        veda_length_tier: "60s",
        veda_ad_category: "exv",
        veda_expansion_type: "hs",
        veda_asset_type: "ugc",
        veda_talent_code: "mjkr",
        veda_editor_initials: "vv",
        veda_copywriter_initials: "co",
        veda_country_code: "us",
        veda_creation_date: "20260212",
      });
    });

    const result = await applyMetadata(input, client);

    expect(result.status).toBe("SUCCESS");
    if (result.status === "SUCCESS") {
      expect(result.data.metadata_applied).toHaveLength(3);
    }
  });

  it("calls setAssetTitle with full Asset ID", async () => {
    const input = makeInput(1);
    const client = mockClient();

    await applyMetadata(input, client);

    expect(client.setAssetTitle).toHaveBeenCalledWith(
      "uuid-1",
      input.asset_ids[0]!.full_id,
    );
  });

  it("calls setMetadata with correct view ID and values", async () => {
    const input = makeInput(1);
    const client = mockClient();

    await applyMetadata(input, client);

    expect(client.setMetadata).toHaveBeenCalledWith(
      "uuid-1",
      "view-abc-123",
      expect.objectContaining({
        veda_funnel: "tof",
        veda_script_id: "0003",
      }),
    );
  });

  it("calls getMetadata for read-back verification", async () => {
    const input = makeInput(1);
    const client = mockClient();

    await applyMetadata(input, client);

    expect(client.getMetadata).toHaveBeenCalledWith("uuid-1", "view-abc-123");
  });

  // ── Validation failures ────────────────────────────────────────────────

  it("fails when asset_ids and iconik_uuids counts mismatch", async () => {
    const input = makeInput(2);
    input.iconik_asset_uuids = ["uuid-1"]; // only 1 uuid for 2 asset_ids
    const client = mockClient();

    const result = await applyMetadata(input, client);

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.error_category).toBe("VALIDATION_ERROR");
      expect(result.message).toContain("asset_ids count");
    }
  });

  it("fails when no asset IDs provided", async () => {
    const input: MetadataManagerInput = {
      asset_ids: [],
      iconik_asset_uuids: [],
      metadata_view_id: "view-abc-123",
    };
    const client = mockClient();

    const result = await applyMetadata(input, client);

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.message).toContain("No asset IDs");
    }
  });

  it("fails when metadata_view_id is empty", async () => {
    const input = makeInput(1);
    input.metadata_view_id = "";
    const client = mockClient();

    const result = await applyMetadata(input, client);

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.message).toContain("metadata_view_id");
    }
  });

  // ── API failures ───────────────────────────────────────────────────────

  it("fails when setAssetTitle throws after retries", async () => {
    const input = makeInput(1);
    const client = mockClient({
      setAssetTitle: vi.fn().mockRejectedValue(new Error("API timeout")),
    });

    const result = await applyMetadata(input, client);

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.error_category).toBe("ICONIK_ERROR");
      expect(result.message).toContain("set title");
    }
  });

  it("fails when setMetadata throws after retries", async () => {
    const input = makeInput(1);
    const client = mockClient({
      setMetadata: vi.fn().mockRejectedValue(new Error("403 Forbidden")),
    });

    const result = await applyMetadata(input, client);

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.error_category).toBe("ICONIK_ERROR");
      expect(result.message).toContain("set metadata");
    }
  });

  it("fails when read-back values mismatch", async () => {
    const input = makeInput(1);
    const client = mockClient({
      getMetadata: vi.fn().mockResolvedValue({
        veda_funnel: "WRONG_VALUE", // mismatch
      }),
    });

    const result = await applyMetadata(input, client);

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.message).toContain("read-back mismatch");
    }
  });

  it("retries setAssetTitle on transient failure then succeeds", async () => {
    const input = makeInput(1);
    let callCount = 0;
    const client = mockClient({
      setAssetTitle: vi.fn().mockImplementation(() => {
        callCount++;
        if (callCount === 1) return Promise.reject(new Error("transient"));
        return Promise.resolve();
      }),
    });

    const result = await applyMetadata(input, client);

    expect(result.status).toBe("SUCCESS");
    expect(client.setAssetTitle).toHaveBeenCalledTimes(2);
  });
});
