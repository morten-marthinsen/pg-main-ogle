import { describe, it, expect, vi } from "vitest";
import { durationAgent } from "./index.js";
import type { ExpansionContext, ExpansionDeps } from "../types.js";
import type { CutPlan, ResolvedIntake } from "../../types/pipeline.js";

// ── Fixtures ────────────────────────────────────────────────────────────────

const SAMPLE_CUT_PLAN: CutPlan = {
  target_duration: 30,
  segments: [
    { start_time: 0, end_time: 3, type: "hook", transcript_text: "Attention opener" },
    { start_time: 10, end_time: 20, type: "body", transcript_text: "Main content segment" },
    { start_time: 50, end_time: 55, type: "body", transcript_text: "Supporting evidence" },
    { start_time: 355, end_time: 360, type: "cta", transcript_text: "Call to action" },
  ],
  actual_duration: 23,
  root_angle_preserved: true,
  duration_flag: false,
};

const FLAGGED_CUT_PLAN: CutPlan = {
  target_duration: 15,
  segments: [
    { start_time: 0, end_time: 10, type: "hook", transcript_text: "Long hook" },
    { start_time: 55, end_time: 60, type: "cta", transcript_text: "CTA" },
  ],
  actual_duration: 15,
  root_angle_preserved: true,
  duration_flag: true,
  flag_reason: "Hook is 67% of target duration (10s of 15s)",
};

const STUB_INTAKE: ResolvedIntake = {
  script_id: "0073",
  funnel_code: "357",
  source_asset_id: "357-0073-v0001-tkvl-0916-0030-exv-flv-aj01-vv-er-us-250210-pgs",
  root_angle_name: "Vertical Circle Secret",
  expansion_type: "dur",
  target_variations: 3,
  platform_code: "tkvl",
  dimension_code: "0916",
  length_tier_code: "0030",
  hook_clip_references: [],
  raw: {} as Record<string, string>,
};

function makeCtx(overrides: Partial<ExpansionContext> = {}): ExpansionContext {
  return {
    sourceFile: "/src/video.mp4",
    outputDir: "/output/dur-test",
    resolvedIntake: STUB_INTAKE,
    variationCount: 1,
    editOperation: { type: "duration_cutdown", cut_plan: SAMPLE_CUT_PLAN },
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
    fileProber: { probe: vi.fn().mockResolvedValue({ duration_seconds: 23, width: 1080, height: 1920 }) },
    ...overrides,
  };
}

// ── Identity ────────────────────────────────────────────────────────────────

describe("durationAgent identity", () => {
  it("has correct typeCode and name", () => {
    expect(durationAgent.typeCode).toBe("dur");
    expect(durationAgent.name).toBe("duration-cutdown");
  });
});

// ── Validation ──────────────────────────────────────────────────────────────

describe("durationAgent.validate", () => {
  it("validates a well-formed duration cutdown", () => {
    const result = durationAgent.validate(makeCtx());
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects wrong operation type", () => {
    const result = durationAgent.validate(
      makeCtx({ editOperation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 } }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("duration_cutdown");
  });

  it("rejects empty segments", () => {
    const emptyCut: CutPlan = { ...SAMPLE_CUT_PLAN, segments: [] };
    const result = durationAgent.validate(
      makeCtx({ editOperation: { type: "duration_cutdown", cut_plan: emptyCut } }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("at least one segment");
  });

  it("rejects negative start_time", () => {
    const badCut: CutPlan = {
      ...SAMPLE_CUT_PLAN,
      segments: [{ start_time: -1, end_time: 3, type: "hook", transcript_text: "" }],
    };
    const result = durationAgent.validate(
      makeCtx({ editOperation: { type: "duration_cutdown", cut_plan: badCut } }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("negative");
  });

  it("rejects end_time <= start_time", () => {
    const badCut: CutPlan = {
      ...SAMPLE_CUT_PLAN,
      segments: [{ start_time: 10, end_time: 5, type: "body", transcript_text: "" }],
    };
    const result = durationAgent.validate(
      makeCtx({ editOperation: { type: "duration_cutdown", cut_plan: badCut } }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("end_time");
  });

  it("rejects target_duration <= 0", () => {
    const badCut: CutPlan = { ...SAMPLE_CUT_PLAN, target_duration: 0 };
    const result = durationAgent.validate(
      makeCtx({ editOperation: { type: "duration_cutdown", cut_plan: badCut } }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("target_duration");
  });

  it("rejects missing source file", () => {
    const result = durationAgent.validate(makeCtx({ sourceFile: "" }));
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("source_file is required");
  });

  it("rejects variation_count < 1", () => {
    const result = durationAgent.validate(makeCtx({ variationCount: 0 }));
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("variation_count");
  });

  it("warns on duration flag", () => {
    const result = durationAgent.validate(
      makeCtx({ editOperation: { type: "duration_cutdown", cut_plan: FLAGGED_CUT_PLAN } }),
    );
    expect(result.valid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain("67%");
  });

  it("warns when no hook segment present (isolation principle)", () => {
    const noHookCut: CutPlan = {
      ...SAMPLE_CUT_PLAN,
      segments: [
        { start_time: 10, end_time: 20, type: "body", transcript_text: "Body only" },
        { start_time: 55, end_time: 60, type: "cta", transcript_text: "CTA" },
      ],
    };
    const result = durationAgent.validate(
      makeCtx({ editOperation: { type: "duration_cutdown", cut_plan: noHookCut } }),
    );
    expect(result.valid).toBe(true);
    expect(result.warnings.some((w) => w.includes("Isolation principle"))).toBe(true);
  });
});

// ── Execution ───────────────────────────────────────────────────────────────

describe("durationAgent.execute", () => {
  it("SUCCESS for single variation", async () => {
    const deps = makeDeps();
    const result = await durationAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations).toHaveLength(1);
    expect(result.data.variations[0].variation_index).toBe(1);
    expect(result.data.variations[0].file_path).toContain("variation_1.mp4");
  });

  it("produces correct number of variations", async () => {
    const deps = makeDeps();
    const result = await durationAgent.execute(makeCtx({ variationCount: 3 }), deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations).toHaveLength(3);
    expect(deps.commandRunner.run).toHaveBeenCalledTimes(3);
  });

  it("passes correct FFmpeg args via buildDurationCutdownArgs", async () => {
    const deps = makeDeps();
    await durationAgent.execute(makeCtx(), deps);
    const call = deps.commandRunner.run.mock.calls[0];
    expect(call[0]).toBe("ffmpeg");
    const args: string[] = call[1];
    expect(args).toContain("/src/video.mp4");
    expect(args).toContain("-filter_complex");
    // Should contain concat for 4 segments
    const filterIdx = args.indexOf("-filter_complex");
    expect(args[filterIdx + 1]).toContain("concat=n=4:v=1:a=1");
  });

  it("sets duration_seconds from cut plan actual_duration", async () => {
    const deps = makeDeps();
    const result = await durationAgent.execute(makeCtx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].duration_seconds).toBe(23);
  });

  it("includes segment descriptions in edit_summary", async () => {
    const deps = makeDeps();
    const result = await durationAgent.execute(makeCtx(), deps);
    if (result.status !== "SUCCESS") return;
    const summary = result.data.variations[0].edit_summary;
    expect(summary).toContain("Duration cutdown:");
    expect(summary).toContain("hook(0-3s)");
    expect(summary).toContain("body(10-20s)");
    expect(summary).toContain("cta(355-360s)");
  });

  it("propagates duration flags", async () => {
    const deps = makeDeps();
    const result = await durationAgent.execute(
      makeCtx({ editOperation: { type: "duration_cutdown", cut_plan: FLAGGED_CUT_PLAN } }),
      deps,
    );
    if (result.status !== "SUCCESS") return;
    expect(result.data.durationFlags).toHaveLength(1);
    expect(result.data.durationFlags[0]).toContain("67%");
  });

  it("returns empty durationFlags when no flag", async () => {
    const deps = makeDeps();
    const result = await durationAgent.execute(makeCtx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.durationFlags).toHaveLength(0);
  });

  it("preserves root_angle_preserved from cut plan", async () => {
    const deps = makeDeps();
    const result = await durationAgent.execute(makeCtx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].root_angle_preserved).toBe(true);
  });

  it("FAILS on FFmpeg non-zero exit code", async () => {
    const deps = makeDeps({ commandRunner: createMockRunner(1) });
    const result = await durationAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("FFmpeg exited with code 1");
  });

  it("FAILS on FFmpeg throw", async () => {
    const throwRunner = { run: vi.fn().mockRejectedValue(new Error("spawn error")) };
    const deps = makeDeps({ commandRunner: throwRunner });
    const result = await durationAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("spawn error");
  });

  it("FAILS when given wrong operation type", async () => {
    const deps = makeDeps();
    const ctx = makeCtx({
      editOperation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 },
    });
    const result = await durationAgent.execute(ctx, deps);
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
    const result = await durationAgent.execute(makeCtx({ variationCount: 3 }), deps);
    expect(result.status).toBe("FAILED");
    expect(failSecondRunner.run).toHaveBeenCalledTimes(2); // stopped after 2nd
  });

  it("generates output paths in outputDir", async () => {
    const deps = makeDeps();
    const result = await durationAgent.execute(
      makeCtx({ outputDir: "/custom/output", variationCount: 2 }),
      deps,
    );
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].file_path).toBe("/custom/output/variation_1.mp4");
    expect(result.data.variations[1].file_path).toBe("/custom/output/variation_2.mp4");
  });
});
