import { describe, it, expect, vi } from "vitest";
import { adFormatAgent } from "./index.js";
import type { ExpansionContext, ExpansionDeps } from "../types.js";
import type { ResolvedIntake } from "../../types/pipeline.js";

// ── Fixtures ────────────────────────────────────────────────────────────────

const STUB_INTAKE: ResolvedIntake = {
  script_id: "0073",
  funnel_code: "357",
  source_asset_id: "357-0073-v0001-tkvl-0916-0030-exh-flv-aj01-vv-er-us-250210-pgs",
  root_angle_name: "Vertical Circle Secret",
  expansion_type: "af",
  target_variations: 2,
  platform_code: "tkvl",
  dimension_code: "0916",
  length_tier_code: "0030",
  hook_clip_references: [],
  raw: {} as Record<string, string>,
};

function makeCtx(overrides: Partial<ExpansionContext> = {}): ExpansionContext {
  return {
    sourceFile: "/src/video.mp4",
    outputDir: "/output/af-test",
    resolvedIntake: STUB_INTAKE,
    variationCount: 1,
    editOperation: { type: "ad_format", target_dimensions: "16x9", target_duration_seconds: 30 },
    ...overrides,
  };
}

function createMockRunner(exitCode = 0) {
  return {
    run: vi.fn().mockResolvedValue({ exitCode, stdout: "", stderr: exitCode !== 0 ? "FFmpeg error" : "" }),
  };
}

function makeDeps(overrides: Partial<ExpansionDeps> = {}): ExpansionDeps {
  return {
    commandRunner: createMockRunner(),
    fileProber: { probe: vi.fn().mockResolvedValue({ duration_seconds: 60, width: 1080, height: 1920 }) },
    ...overrides,
  };
}

// ── Identity ────────────────────────────────────────────────────────────────

describe("adFormatAgent identity", () => {
  it("has correct typeCode and name", () => {
    expect(adFormatAgent.typeCode).toBe("af");
    expect(adFormatAgent.name).toBe("ad-format");
  });
});

// ── Validation ──────────────────────────────────────────────────────────────

describe("adFormatAgent.validate", () => {
  it("validates a well-formed ad format operation", () => {
    const result = adFormatAgent.validate(makeCtx());
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects wrong operation type", () => {
    const result = adFormatAgent.validate(
      makeCtx({ editOperation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 } }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("ad_format");
  });

  it("rejects missing target_dimensions", () => {
    const result = adFormatAgent.validate(
      makeCtx({ editOperation: { type: "ad_format", target_dimensions: "", target_duration_seconds: 30 } }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("target_dimensions");
  });

  it("rejects target_duration_seconds <= 0", () => {
    const result = adFormatAgent.validate(
      makeCtx({ editOperation: { type: "ad_format", target_dimensions: "16x9", target_duration_seconds: 0 } }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("target_duration_seconds");
  });

  it("warns on unknown dimensions (falls back to 1080x1920)", () => {
    const result = adFormatAgent.validate(
      makeCtx({ editOperation: { type: "ad_format", target_dimensions: "4x3", target_duration_seconds: 30 } }),
    );
    expect(result.valid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain("4x3");
  });

  it("rejects missing source file", () => {
    const result = adFormatAgent.validate(makeCtx({ sourceFile: "" }));
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("source_file is required");
  });

  it("rejects variation_count < 1", () => {
    const result = adFormatAgent.validate(makeCtx({ variationCount: 0 }));
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("variation_count");
  });
});

// ── Execution ───────────────────────────────────────────────────────────────

describe("adFormatAgent.execute", () => {
  it("SUCCESS for single variation", async () => {
    const deps = makeDeps();
    const result = await adFormatAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations).toHaveLength(1);
    expect(result.data.variations[0].variation_index).toBe(1);
  });

  it("produces correct number of variations", async () => {
    const deps = makeDeps();
    const result = await adFormatAgent.execute(makeCtx({ variationCount: 3 }), deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations).toHaveLength(3);
    expect(deps.commandRunner.run).toHaveBeenCalledTimes(3);
  });

  it("passes correct FFmpeg args — scale + duration trim", async () => {
    const deps = makeDeps();
    await adFormatAgent.execute(makeCtx(), deps);
    const args: string[] = deps.commandRunner.run.mock.calls[0][1];
    expect(args).toContain("/src/video.mp4");
    // Should scale to 16x9 = 1920x1080
    expect(args.some((a) => a.includes("1920:1080"))).toBe(true);
    // Should trim to 30s
    expect(args).toContain("-t");
    const tIdx = args.indexOf("-t");
    expect(args[tIdx + 1]).toBe("30");
  });

  it("sets duration_seconds from target_duration_seconds", async () => {
    const deps = makeDeps();
    const result = await adFormatAgent.execute(makeCtx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].duration_seconds).toBe(30);
  });

  it("sets resolution from target_dimensions", async () => {
    const deps = makeDeps();
    const result = await adFormatAgent.execute(makeCtx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].resolution).toBe("16x9");
  });

  it("includes dimensions and duration in edit_summary", async () => {
    const deps = makeDeps();
    const result = await adFormatAgent.execute(makeCtx(), deps);
    if (result.status !== "SUCCESS") return;
    const summary = result.data.variations[0].edit_summary;
    expect(summary).toContain("Ad format");
    expect(summary).toContain("16x9");
    expect(summary).toContain("30s");
  });

  it("returns empty durationFlags", async () => {
    const deps = makeDeps();
    const result = await adFormatAgent.execute(makeCtx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.durationFlags).toHaveLength(0);
  });

  it("FAILS on FFmpeg non-zero exit code", async () => {
    const deps = makeDeps({ commandRunner: createMockRunner(1) });
    const result = await adFormatAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("FFmpeg exited with code 1");
  });

  it("FAILS on FFmpeg throw", async () => {
    const throwRunner = { run: vi.fn().mockRejectedValue(new Error("spawn error")) };
    const deps = makeDeps({ commandRunner: throwRunner });
    const result = await adFormatAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("spawn error");
  });

  it("FAILS when given wrong operation type", async () => {
    const deps = makeDeps();
    const ctx = makeCtx({
      editOperation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 },
    });
    const result = await adFormatAgent.execute(ctx, deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("wrong operation type");
  });

  it("stops on first FFmpeg failure in batch", async () => {
    let callCount = 0;
    const failSecondRunner = {
      run: vi.fn().mockImplementation(() => {
        callCount++;
        if (callCount === 2) return Promise.resolve({ exitCode: 1, stdout: "", stderr: "fail" });
        return Promise.resolve({ exitCode: 0, stdout: "", stderr: "" });
      }),
    };
    const deps = makeDeps({ commandRunner: failSecondRunner });
    const result = await adFormatAgent.execute(makeCtx({ variationCount: 3 }), deps);
    expect(result.status).toBe("FAILED");
    expect(failSecondRunner.run).toHaveBeenCalledTimes(2);
  });

  it("generates output paths in outputDir", async () => {
    const deps = makeDeps();
    const result = await adFormatAgent.execute(
      makeCtx({ outputDir: "/custom/output", variationCount: 2 }),
      deps,
    );
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].file_path).toBe("/custom/output/variation_1.mp4");
    expect(result.data.variations[1].file_path).toBe("/custom/output/variation_2.mp4");
  });
});
