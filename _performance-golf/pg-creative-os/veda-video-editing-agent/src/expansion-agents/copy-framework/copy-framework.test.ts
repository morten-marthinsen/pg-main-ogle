import { describe, it, expect, vi } from "vitest";
import { copyFrameworkAgent } from "./index.js";
import type { ExpansionContext, ExpansionDeps } from "../types.js";
import type { ResolvedIntake } from "../../types/pipeline.js";

// ── Fixtures ────────────────────────────────────────────────────────────────

const STUB_INTAKE: ResolvedIntake = {
  script_id: "0073",
  funnel_code: "357",
  source_asset_id: "357-0073-v0001-tkvl-0916-0030-exh-flv-aj01-vv-er-us-250210-pgs",
  root_angle_name: "Vertical Circle Secret",
  expansion_type: "cf",
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
    outputDir: "/output/cf-test",
    resolvedIntake: STUB_INTAKE,
    variationCount: 1,
    editOperation: {
      type: "copy_framework",
      framework_type: "pas",
      copy_lines: ["Struggling with your swing?", "It gets worse on the course.", "This drill fixes it in 5 minutes."],
    },
    sourceDims: { width: 1080, height: 1920 },
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
    fileProber: { probe: vi.fn().mockResolvedValue({ duration_seconds: 30, width: 1080, height: 1920 }) },
    ...overrides,
  };
}

// ── Identity ────────────────────────────────────────────────────────────────

describe("copyFrameworkAgent identity", () => {
  it("has correct typeCode and name", () => {
    expect(copyFrameworkAgent.typeCode).toBe("cf");
    expect(copyFrameworkAgent.name).toBe("copy-framework");
  });
});

// ── Validation ──────────────────────────────────────────────────────────────

describe("copyFrameworkAgent.validate", () => {
  it("validates a well-formed copy framework operation", () => {
    const result = copyFrameworkAgent.validate(makeCtx());
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects wrong operation type", () => {
    const result = copyFrameworkAgent.validate(
      makeCtx({ editOperation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 } }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("copy_framework");
  });

  it("rejects missing framework_type", () => {
    const result = copyFrameworkAgent.validate(
      makeCtx({
        editOperation: {
          type: "copy_framework",
          framework_type: "",
          copy_lines: ["test"],
        },
      }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("framework_type");
  });

  it("rejects missing copy_lines", () => {
    const result = copyFrameworkAgent.validate(
      makeCtx({
        editOperation: {
          type: "copy_framework",
          framework_type: "pas",
          copy_lines: [],
        },
      }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("copy_lines");
  });

  it("warns on unknown framework type", () => {
    const result = copyFrameworkAgent.validate(
      makeCtx({
        editOperation: {
          type: "copy_framework",
          framework_type: "custom_framework",
          copy_lines: ["test line"],
        },
      }),
    );
    expect(result.valid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain("Unknown framework");
  });

  it("warns on long copy lines (>80 chars)", () => {
    const result = copyFrameworkAgent.validate(
      makeCtx({
        editOperation: {
          type: "copy_framework",
          framework_type: "pas",
          copy_lines: ["X".repeat(81)],
        },
      }),
    );
    expect(result.valid).toBe(true);
    expect(result.warnings[0]).toContain("80 characters");
  });

  it("accepts known frameworks without warning", () => {
    for (const fw of ["pas", "aida", "bab", "fab", "4ps"]) {
      const result = copyFrameworkAgent.validate(
        makeCtx({
          editOperation: {
            type: "copy_framework",
            framework_type: fw,
            copy_lines: ["test"],
          },
        }),
      );
      expect(result.valid).toBe(true);
      expect(result.warnings).toHaveLength(0);
    }
  });

  it("rejects variation_count < 1", () => {
    const result = copyFrameworkAgent.validate(makeCtx({ variationCount: 0 }));
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("variation_count");
  });

  it("rejects missing source file", () => {
    const result = copyFrameworkAgent.validate(makeCtx({ sourceFile: "" }));
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("source_file is required");
  });
});

// ── Execution ───────────────────────────────────────────────────────────────

describe("copyFrameworkAgent.execute", () => {
  it("SUCCESS for single variation", async () => {
    const deps = makeDeps();
    const result = await copyFrameworkAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations).toHaveLength(1);
    expect(result.data.variations[0].variation_index).toBe(1);
    expect(result.data.variations[0].file_path).toContain("variation_1.mp4");
  });

  it("produces correct number of variations", async () => {
    const deps = makeDeps();
    const result = await copyFrameworkAgent.execute(makeCtx({ variationCount: 3 }), deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations).toHaveLength(3);
    expect(deps.commandRunner.run).toHaveBeenCalledTimes(3);
  });

  it("passes FFmpeg args via buildCopyFrameworkArgs", async () => {
    const deps = makeDeps();
    await copyFrameworkAgent.execute(makeCtx(), deps);
    const call = deps.commandRunner.run.mock.calls[0];
    expect(call[0]).toBe("ffmpeg");
    const args: string[] = call[1];
    expect(args).toContain("-vf");
    // Should contain drawtext filter from copy framework args
    const vfIdx = args.indexOf("-vf");
    expect(args[vfIdx + 1]).toContain("drawtext");
  });

  it("includes framework_type in edit_summary", async () => {
    const deps = makeDeps();
    const result = await copyFrameworkAgent.execute(makeCtx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].edit_summary).toContain("pas");
    expect(result.data.variations[0].edit_summary).toContain("3 lines");
  });

  it("appends cta_text to copy lines when provided", async () => {
    const deps = makeDeps();
    const ctx = makeCtx({
      editOperation: {
        type: "copy_framework",
        framework_type: "aida",
        copy_lines: ["Attention", "Interest"],
        cta_text: "Shop Now",
      },
    });
    const result = await copyFrameworkAgent.execute(ctx, deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].edit_summary).toContain("CTA");
    expect(result.data.variations[0].edit_summary).toContain("Shop Now");
  });

  it("uses source dimensions for overlay positioning", async () => {
    const deps = makeDeps();
    await copyFrameworkAgent.execute(
      makeCtx({ sourceDims: { width: 1920, height: 1080 } }),
      deps,
    );
    const args: string[] = deps.commandRunner.run.mock.calls[0][1];
    const vfIdx = args.indexOf("-vf");
    // Drawbox should reference dimensions
    expect(args[vfIdx + 1]).toContain("drawbox");
  });

  it("preserves root angle (always true)", async () => {
    const deps = makeDeps();
    const result = await copyFrameworkAgent.execute(makeCtx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].root_angle_preserved).toBe(true);
  });

  it("returns empty durationFlags", async () => {
    const deps = makeDeps();
    const result = await copyFrameworkAgent.execute(makeCtx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.durationFlags).toHaveLength(0);
  });

  it("FAILS on FFmpeg non-zero exit code", async () => {
    const deps = makeDeps({ commandRunner: createMockRunner(1) });
    const result = await copyFrameworkAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("FFmpeg exited with code 1");
  });

  it("FAILS on FFmpeg throw", async () => {
    const throwRunner = { run: vi.fn().mockRejectedValue(new Error("spawn error")) };
    const deps = makeDeps({ commandRunner: throwRunner });
    const result = await copyFrameworkAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("spawn error");
  });

  it("FAILS on wrong operation type", async () => {
    const deps = makeDeps();
    const ctx = makeCtx({
      editOperation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 },
    });
    const result = await copyFrameworkAgent.execute(ctx, deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("wrong operation type");
  });

  it("generates output paths in outputDir", async () => {
    const deps = makeDeps();
    const result = await copyFrameworkAgent.execute(
      makeCtx({ outputDir: "/custom/output", variationCount: 2 }),
      deps,
    );
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].file_path).toBe("/custom/output/variation_1.mp4");
    expect(result.data.variations[1].file_path).toBe("/custom/output/variation_2.mp4");
  });
});
