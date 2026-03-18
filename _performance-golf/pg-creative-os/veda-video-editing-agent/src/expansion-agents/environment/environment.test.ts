import { describe, it, expect, vi } from "vitest";
import { environmentAgent, buildCompositeArgs } from "./index.js";
import type { ExpansionContext, ExpansionDeps } from "../types.js";
import type { ResolvedIntake, AiGenerationClient } from "../../types/pipeline.js";

// Mock mkdir — test paths like /output/env-ai-test don't exist on real filesystem
vi.mock("node:fs/promises", async () => {
  const actual = await vi.importActual<typeof import("node:fs/promises")>("node:fs/promises");
  return { ...actual, mkdir: vi.fn().mockResolvedValue(undefined) };
});

// ── Fixtures ────────────────────────────────────────────────────────────────

const STUB_INTAKE: ResolvedIntake = {
  script_id: "0073",
  funnel_code: "357",
  source_asset_id: "357-0073-v0001-tkvl-0916-0030-exh-flv-aj01-vv-er-us-250210-pgs",
  root_angle_name: "Vertical Circle Secret",
  expansion_type: "env",
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
    outputDir: "/output/env-test",
    resolvedIntake: STUB_INTAKE,
    variationCount: 1,
    editOperation: { type: "environment_swap", environment_clip_path: "/env/beach.mp4" },
    ...overrides,
  };
}

function makeV2Ctx(overrides: Partial<ExpansionContext> = {}): ExpansionContext {
  return {
    sourceFile: "/src/video.mp4",
    outputDir: "/output/env-ai-test",
    resolvedIntake: STUB_INTAKE,
    variationCount: 1,
    editOperation: { type: "environment_swap_ai", background_prompt: "sunny golf course with mountain backdrop" },
    sourceDims: { width: 1080, height: 1920 },
    sourceDuration: 30,
    ...overrides,
  };
}

function createMockRunner(exitCode = 0) {
  return {
    run: vi.fn().mockResolvedValue({ exitCode, stdout: "", stderr: exitCode !== 0 ? "FFmpeg error" : "" }),
  };
}

function createMockAiClient(overrides: Partial<Record<string, boolean>> = {}): AiGenerationClient {
  const availability: Record<string, boolean> = {
    segmentation: true,
    image: true,
    video: true,
    audio: true,
    character: true,
    lipsync: true,
    ...overrides,
  };

  let callCount = 0;
  return {
    isAvailable: vi.fn((type: string) => availability[type] ?? false),
    generate: vi.fn(async (_req, outputDir: string) => {
      callCount++;
      return {
        file_path: `${outputDir}/generated-${callCount}.png`,
        cost_usd: 0.01,
      };
    }),
  } as unknown as AiGenerationClient;
}

function makeDeps(overrides: Partial<ExpansionDeps> = {}): ExpansionDeps {
  return {
    commandRunner: createMockRunner(),
    fileProber: { probe: vi.fn().mockResolvedValue({ duration_seconds: 60, width: 1080, height: 1920 }) },
    ...overrides,
  };
}

function makeV2Deps(overrides: Partial<ExpansionDeps> = {}): ExpansionDeps {
  return {
    commandRunner: createMockRunner(),
    fileProber: { probe: vi.fn().mockResolvedValue({ duration_seconds: 30, width: 1080, height: 1920 }) },
    aiClient: createMockAiClient(),
    ...overrides,
  };
}

// ══════════════════════════════════════════════════════════════════════════════
// v1 — CLIP SWAP (existing tests preserved)
// ══════════════════════════════════════════════════════════════════════════════

// ── Identity ────────────────────────────────────────────────────────────────

describe("environmentAgent identity", () => {
  it("has correct typeCode and name", () => {
    expect(environmentAgent.typeCode).toBe("env");
    expect(environmentAgent.name).toBe("environment-swap");
  });
});

// ── v1 Validation ───────────────────────────────────────────────────────────

describe("environmentAgent.validate (v1 clip swap)", () => {
  it("validates a well-formed environment swap", () => {
    const result = environmentAgent.validate(makeCtx());
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects wrong operation type", () => {
    const result = environmentAgent.validate(
      makeCtx({ editOperation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 } }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("environment_swap");
  });

  it("rejects missing environment clip", () => {
    const result = environmentAgent.validate(
      makeCtx({ editOperation: { type: "environment_swap", environment_clip_path: "" } }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("environment clip");
  });

  it("rejects missing source file", () => {
    const result = environmentAgent.validate(makeCtx({ sourceFile: "" }));
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("source_file is required");
  });

  it("rejects variation_count < 1", () => {
    const result = environmentAgent.validate(makeCtx({ variationCount: 0 }));
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("variation_count");
  });
});

// ── v1 Execution ────────────────────────────────────────────────────────────

describe("environmentAgent.execute (v1 clip swap)", () => {
  it("SUCCESS for single variation", async () => {
    const deps = makeDeps();
    const result = await environmentAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations).toHaveLength(1);
    expect(result.data.variations[0].variation_index).toBe(1);
    expect(result.data.variations[0].file_path).toContain("variation_1.mp4");
  });

  it("produces correct number of variations", async () => {
    const deps = makeDeps();
    const result = await environmentAgent.execute(makeCtx({ variationCount: 3 }), deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations).toHaveLength(3);
    expect(deps.commandRunner.run).toHaveBeenCalledTimes(3);
  });

  it("passes correct FFmpeg args via buildEnvironmentSwapArgs", async () => {
    const deps = makeDeps();
    await environmentAgent.execute(makeCtx(), deps);
    const call = deps.commandRunner.run.mock.calls[0];
    expect(call[0]).toBe("ffmpeg");
    const args: string[] = call[1];
    // Environment clip is first input, source is second
    expect(args[1]).toBe("/env/beach.mp4");
    expect(args[3]).toBe("/src/video.mp4");
    const filterIdx = args.indexOf("-filter_complex");
    expect(args[filterIdx + 1]).toContain("overlay");
  });

  it("preserves source audio (maps 1:a)", async () => {
    const deps = makeDeps();
    await environmentAgent.execute(makeCtx(), deps);
    const args: string[] = deps.commandRunner.run.mock.calls[0][1];
    expect(args).toContain("1:a");
  });

  it("includes environment clip path in edit_summary", async () => {
    const deps = makeDeps();
    const result = await environmentAgent.execute(makeCtx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].edit_summary).toContain("/env/beach.mp4");
    expect(result.data.variations[0].edit_summary).toContain("Environment swap");
  });

  it("returns empty durationFlags", async () => {
    const deps = makeDeps();
    const result = await environmentAgent.execute(makeCtx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.durationFlags).toHaveLength(0);
  });

  it("FAILS on FFmpeg non-zero exit code", async () => {
    const deps = makeDeps({ commandRunner: createMockRunner(1) });
    const result = await environmentAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("FFmpeg exited with code 1");
  });

  it("FAILS on FFmpeg throw", async () => {
    const throwRunner = { run: vi.fn().mockRejectedValue(new Error("spawn error")) };
    const deps = makeDeps({ commandRunner: throwRunner });
    const result = await environmentAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("spawn error");
  });

  it("FAILS when given wrong operation type", async () => {
    const deps = makeDeps();
    const ctx = makeCtx({
      editOperation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 },
    });
    const result = await environmentAgent.execute(ctx, deps);
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
    const result = await environmentAgent.execute(makeCtx({ variationCount: 3 }), deps);
    expect(result.status).toBe("FAILED");
    expect(failSecondRunner.run).toHaveBeenCalledTimes(2);
  });

  it("generates output paths in outputDir", async () => {
    const deps = makeDeps();
    const result = await environmentAgent.execute(
      makeCtx({ outputDir: "/custom/output", variationCount: 2 }),
      deps,
    );
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].file_path).toBe("/custom/output/variation_1.mp4");
    expect(result.data.variations[1].file_path).toBe("/custom/output/variation_2.mp4");
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// v2 — AI-GENERATED BACKGROUNDS
// ══════════════════════════════════════════════════════════════════════════════

// ── v2 Validation ───────────────────────────────────────────────────────────

describe("environmentAgent.validate (v2 AI background)", () => {
  it("validates a well-formed AI environment swap", () => {
    const result = environmentAgent.validate(makeV2Ctx());
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects missing background_prompt", () => {
    const result = environmentAgent.validate(
      makeV2Ctx({ editOperation: { type: "environment_swap_ai", background_prompt: "" } }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("background_prompt");
  });

  it("rejects variation_count < 1 for v2", () => {
    const result = environmentAgent.validate(makeV2Ctx({ variationCount: 0 }));
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("variation_count");
  });

  it("rejects missing source file for v2", () => {
    const result = environmentAgent.validate(makeV2Ctx({ sourceFile: "" }));
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("source_file is required");
  });

  it("warns on high variation count (>5)", () => {
    const result = environmentAgent.validate(makeV2Ctx({ variationCount: 8 }));
    expect(result.valid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain("cost");
  });

  it("does not warn on <= 5 variations", () => {
    const result = environmentAgent.validate(makeV2Ctx({ variationCount: 3 }));
    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(0);
  });
});

// ── v2 Execution ────────────────────────────────────────────────────────────

describe("environmentAgent.execute (v2 AI background)", () => {
  it("SUCCESS for single AI variation", async () => {
    const deps = makeV2Deps();
    const result = await environmentAgent.execute(makeV2Ctx(), deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations).toHaveLength(1);
    expect(result.data.variations[0].variation_index).toBe(1);
    expect(result.data.variations[0].file_path).toContain("variation_1.mp4");
  });

  it("calls 3-stage pipeline: segmentation → image generation → FFmpeg", async () => {
    const deps = makeV2Deps();
    await environmentAgent.execute(makeV2Ctx(), deps);

    const aiClient = deps.aiClient!;
    const generateFn = aiClient.generate as ReturnType<typeof vi.fn>;
    expect(generateFn).toHaveBeenCalledTimes(2); // segmentation + image

    // Stage 1: segmentation (uses extracted key frame, not source video)
    const seg = generateFn.mock.calls[0][0];
    expect(seg.type).toBe("segmentation");
    expect(seg.model).toBe("birefnet");
    expect(seg.style_reference).toContain("keyframe_t1.png");

    // Stage 2: background generation
    const bg = generateFn.mock.calls[1][0];
    expect(bg.type).toBe("image");
    expect(bg.model).toBe("flux");
    expect(bg.prompt).toContain("golf course");

    // Stage 3: FFmpeg composite (+1 call for key frame extraction)
    expect(deps.commandRunner.run).toHaveBeenCalledTimes(2);
    const ffCall = (deps.commandRunner.run as ReturnType<typeof vi.fn>).mock.calls[1];
    expect(ffCall[0]).toBe("ffmpeg");
    const ffArgs: string[] = ffCall[1];
    expect(ffArgs).toContain("-filter_complex");
    expect(ffArgs.some((a: string) => a.includes("alphamerge"))).toBe(true);
  });

  it("produces correct number of AI variations", async () => {
    const deps = makeV2Deps();
    const result = await environmentAgent.execute(makeV2Ctx({ variationCount: 3 }), deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations).toHaveLength(3);

    // 2 AI calls per variation (seg + bg), 1 FFmpeg per variation + 1 frame extraction
    const generateFn = deps.aiClient!.generate as ReturnType<typeof vi.fn>;
    expect(generateFn).toHaveBeenCalledTimes(6);
    expect(deps.commandRunner.run).toHaveBeenCalledTimes(4);
  });

  it("includes background_prompt in edit_summary", async () => {
    const deps = makeV2Deps();
    const result = await environmentAgent.execute(makeV2Ctx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].edit_summary).toContain("golf course");
    expect(result.data.variations[0].edit_summary).toContain("AI environment");
  });

  it("passes source dimensions to Flux generation", async () => {
    const deps = makeV2Deps();
    await environmentAgent.execute(
      makeV2Ctx({ sourceDims: { width: 1920, height: 1080 } }),
      deps,
    );
    const generateFn = deps.aiClient!.generate as ReturnType<typeof vi.fn>;
    const bgCall = generateFn.mock.calls[1][0];
    expect(bgCall.width).toBe(1920);
    expect(bgCall.height).toBe(1080);
  });

  it("passes style_reference_url to Flux when provided", async () => {
    const deps = makeV2Deps();
    await environmentAgent.execute(
      makeV2Ctx({
        editOperation: {
          type: "environment_swap_ai",
          background_prompt: "indoor studio",
          style_reference_url: "https://example.com/ref.jpg",
        },
      }),
      deps,
    );
    const generateFn = deps.aiClient!.generate as ReturnType<typeof vi.fn>;
    const bgCall = generateFn.mock.calls[1][0];
    expect(bgCall.style_reference).toBe("https://example.com/ref.jpg");
  });

  it("tracks cost across AI calls", async () => {
    // Each mock call returns 0.01 cost — 2 calls per var × 3 vars = 0.06, > 0.05 threshold but < 0.5
    const deps = makeV2Deps();
    const result = await environmentAgent.execute(makeV2Ctx({ variationCount: 1 }), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].edit_summary).toContain("Cost: $0.02");
  });

  it("adds cost flag when total exceeds threshold", async () => {
    const expensiveClient: AiGenerationClient = {
      isAvailable: vi.fn(() => true),
      generate: vi.fn(async (_req, outputDir: string) => ({
        file_path: `${outputDir}/generated.png`,
        cost_usd: 0.30,
      })),
    } as unknown as AiGenerationClient;

    const deps = makeV2Deps({ aiClient: expensiveClient });
    const result = await environmentAgent.execute(makeV2Ctx({ variationCount: 1 }), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.durationFlags.length).toBeGreaterThan(0);
    expect(result.data.durationFlags[0]).toContain("budget");
  });

  // ── Credential checks ──────────────────────────────────────────────────

  it("FAILS when no aiClient provided", async () => {
    const deps = makeV2Deps({ aiClient: undefined });
    const result = await environmentAgent.execute(makeV2Ctx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.error_category).toBe("CREDENTIAL_ERROR");
    expect(result.message).toContain("aiClient");
  });

  it("FAILS when segmentation not available", async () => {
    const deps = makeV2Deps({ aiClient: createMockAiClient({ segmentation: false }) });
    const result = await environmentAgent.execute(makeV2Ctx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("segmentation");
  });

  it("FAILS when image generation not available", async () => {
    const deps = makeV2Deps({ aiClient: createMockAiClient({ image: false }) });
    const result = await environmentAgent.execute(makeV2Ctx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("background generation");
  });

  // ── Error handling ─────────────────────────────────────────────────────

  it("FAILS on AI generation error (batch stop)", async () => {
    const failingClient: AiGenerationClient = {
      isAvailable: vi.fn(() => true),
      generate: vi.fn().mockRejectedValue(new Error("FAL quota exceeded")),
    } as unknown as AiGenerationClient;

    const deps = makeV2Deps({ aiClient: failingClient });
    const result = await environmentAgent.execute(makeV2Ctx({ variationCount: 3 }), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.error_category).toBe("AI_GENERATION_ERROR");
    expect(result.message).toContain("FAL quota exceeded");
    expect(result.message).toContain("0 of 3");
  });

  it("FAILS on FFmpeg composite error", async () => {
    // Frame extraction succeeds (call 1), composite fails (call 2)
    let callCount = 0;
    const compositeFailRunner = {
      run: vi.fn().mockImplementation(() => {
        callCount++;
        if (callCount === 1) return Promise.resolve({ exitCode: 0, stdout: "", stderr: "" });
        return Promise.resolve({ exitCode: 1, stdout: "", stderr: "FFmpeg error" });
      }),
    };
    const deps = makeV2Deps({ commandRunner: compositeFailRunner });
    const result = await environmentAgent.execute(makeV2Ctx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("FFmpeg composite exited with code 1");
  });

  it("FAILS on FFmpeg composite throw", async () => {
    const throwRunner = { run: vi.fn().mockRejectedValue(new Error("composite spawn failed")) };
    const deps = makeV2Deps({ commandRunner: throwRunner });
    const result = await environmentAgent.execute(makeV2Ctx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("composite spawn failed");
  });

  it("batch-stops on second variation AI failure", async () => {
    let callIdx = 0;
    const failSecondVarClient: AiGenerationClient = {
      isAvailable: vi.fn(() => true),
      generate: vi.fn(async (_req, outputDir: string) => {
        callIdx++;
        if (callIdx > 2) throw new Error("quota hit"); // fails on var 2 stage 1
        return { file_path: `${outputDir}/gen-${callIdx}.png`, cost_usd: 0.01 };
      }),
    } as unknown as AiGenerationClient;

    const deps = makeV2Deps({ aiClient: failSecondVarClient });
    const result = await environmentAgent.execute(makeV2Ctx({ variationCount: 3 }), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("1 of 3 completed");
  });
});

// ── buildCompositeArgs ──────────────────────────────────────────────────────

describe("buildCompositeArgs", () => {
  it("produces correct FFmpeg args structure", () => {
    const args = buildCompositeArgs("/src.mp4", "/bg.png", "/mask.png", "/out.mp4");
    expect(args[0]).toBe("-y");
    expect(args[1]).toBe("-i");
    expect(args[2]).toBe("/src.mp4");
    expect(args[3]).toBe("-i");
    expect(args[4]).toBe("/bg.png");
    expect(args[5]).toBe("-i");
    expect(args[6]).toBe("/mask.png");
    expect(args).toContain("-filter_complex");
    expect(args.some(a => a.includes("alphamerge"))).toBe(true);
    expect(args.some(a => a.includes("overlay"))).toBe(true);
    expect(args).toContain("0:a"); // preserves source audio
    expect(args[args.length - 1]).toBe("/out.mp4");
  });

  it("scales background to source dimensions when provided", () => {
    const args = buildCompositeArgs("/src.mp4", "/bg.png", "/mask.png", "/out.mp4", { width: 1080, height: 1920 });
    const filterIdx = args.indexOf("-filter_complex");
    expect(args[filterIdx + 1]).toContain("scale=1080:1920");
  });
});
