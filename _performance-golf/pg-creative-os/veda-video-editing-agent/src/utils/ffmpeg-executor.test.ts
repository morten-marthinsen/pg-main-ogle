import { describe, it, expect } from "vitest";
import {
  buildDurationCutdownArgs,
  buildHookStackArgs,
  buildScrollStopperArgs,
  buildEnvironmentSwapArgs,
  buildAdFormatArgs,
  buildEditArgs,
  assemble,
} from "./ffmpeg-executor.js";
import type { CommandRunner, CutPlan, CutSegment } from "../types/pipeline.js";

// ── Mock CommandRunner ──────────────────────────────────────────────────────

function createMockRunner(): CommandRunner & { calls: Array<{ command: string; args: string[] }> } {
  const runner = {
    calls: [] as Array<{ command: string; args: string[] }>,
    run: async (command: string, args: string[]) => {
      runner.calls.push({ command, args });
      return { exitCode: 0, stdout: "", stderr: "" };
    },
  };
  return runner;
}

function createFailingRunner(exitCode: number, stderr: string): CommandRunner {
  return {
    run: async () => ({ exitCode, stdout: "", stderr }),
  };
}

function createThrowingRunner(errorMsg: string): CommandRunner {
  return {
    run: async () => { throw new Error(errorMsg); },
  };
}

// ── Test data ───────────────────────────────────────────────────────────────

const SAMPLE_CUT_PLAN: CutPlan = {
  target_duration: 60,
  segments: [
    { start_time: 0, end_time: 5, type: "hook", transcript_text: "Stop struggling" },
    { start_time: 30, end_time: 55, type: "body", transcript_text: "Vertical Circle method" },
    { start_time: 130, end_time: 150, type: "body", transcript_text: "My student Tom" },
    { start_time: 355, end_time: 360, type: "cta", transcript_text: "Take the quiz" },
  ],
  actual_duration: 55,
  root_angle_preserved: true,
  duration_flag: false,
};

const FLAGGED_CUT_PLAN: CutPlan = {
  target_duration: 15,
  segments: [
    { start_time: 0, end_time: 10, type: "hook", transcript_text: "Stop" },
    { start_time: 355, end_time: 360, type: "cta", transcript_text: "Quiz" },
  ],
  actual_duration: 15,
  root_angle_preserved: true,
  duration_flag: true,
  flag_reason: "Hook is 67% of target duration (10s of 15s)",
};

// ── buildDurationCutdownArgs ────────────────────────────────────────────────

describe("buildDurationCutdownArgs", () => {
  it("produces correct FFmpeg filter_complex for 4 segments", () => {
    const args = buildDurationCutdownArgs("/src/video.mp4", SAMPLE_CUT_PLAN, "/out/v1.mp4");

    expect(args).toContain("-i");
    expect(args).toContain("/src/video.mp4");
    expect(args).toContain("-filter_complex");
    expect(args).toContain("-y");
    expect(args[args.length - 1]).toBe("/out/v1.mp4");

    // Check filter contains all segments
    const filterIdx = args.indexOf("-filter_complex") + 1;
    const filter = args[filterIdx];
    expect(filter).toContain("trim=start=0:end=5");
    expect(filter).toContain("trim=start=30:end=55");
    expect(filter).toContain("trim=start=130:end=150");
    expect(filter).toContain("trim=start=355:end=360");
    expect(filter).toContain("concat=n=4:v=1:a=1");
  });

  it("uses libx264 and aac codecs", () => {
    const args = buildDurationCutdownArgs("/src/video.mp4", SAMPLE_CUT_PLAN, "/out/v1.mp4");
    expect(args).toContain("libx264");
    expect(args).toContain("aac");
  });
});

// ── buildHookStackArgs ──────────────────────────────────────────────────────

describe("buildHookStackArgs", () => {
  it("takes hook clip as first input and source as second", () => {
    const args = buildHookStackArgs("/src/video.mp4", "/hooks/hook1.mp4", "/out/v1.mp4");
    expect(args[1]).toBe("/hooks/hook1.mp4");
    expect(args[3]).toBe("/src/video.mp4");
  });

  it("prepends hook on full source (no trimming)", () => {
    const args = buildHookStackArgs("/src/video.mp4", "/hooks/hook1.mp4", "/out/v1.mp4");
    const filterIdx = args.indexOf("-filter_complex") + 1;
    const filter = args[filterIdx];
    // No trim on source — full video preserved
    expect(filter).not.toContain("trim=start=");
    expect(filter).toContain("concat=n=2:v=1:a=1");
    // Source video gets setpts normalization only
    expect(filter).toContain("[1:v]setpts=PTS-STARTPTS[srcv]");
  });

  it("does not accept hookDuration param (output is always source + full hook)", () => {
    // buildHookStackArgs takes 3-4 args (no hookDuration) — signature enforces prepend
    const args = buildHookStackArgs("/src/video.mp4", "/hooks/hook1.mp4", "/out/v1.mp4");
    const filterIdx = args.indexOf("-filter_complex") + 1;
    expect(args[filterIdx]).not.toContain("trim=start=");
  });

  it("scales hook to source dims when sourceDims provided", () => {
    const args = buildHookStackArgs("/src/video.mp4", "/hooks/hook1.mp4", "/out/v1.mp4", { width: 1080, height: 1920 });
    const filterIdx = args.indexOf("-filter_complex") + 1;
    const filter = args[filterIdx];
    // Hook video scaled to match source before concat
    expect(filter).toContain("scale=1080:1920");
    expect(filter).toContain("pad=1080:1920");
    expect(filter).toContain("setpts=PTS-STARTPTS[hookv]");
    // Source remains untouched
    expect(filter).toContain("[1:v]setpts=PTS-STARTPTS[srcv]");
  });

  it("no scale filter when sourceDims omitted (backward compatible)", () => {
    const args = buildHookStackArgs("/src/video.mp4", "/hooks/hook1.mp4", "/out/v1.mp4");
    const filterIdx = args.indexOf("-filter_complex") + 1;
    const filter = args[filterIdx];
    expect(filter).not.toContain("scale=");
    expect(filter).toContain("[0:v]setpts=PTS-STARTPTS[hookv]");
  });
});

// ── buildScrollStopperArgs ──────────────────────────────────────────────────

describe("buildScrollStopperArgs", () => {
  it("replaces first N seconds (different from hook stack which prepends)", () => {
    const ssrArgs = buildScrollStopperArgs("/src/video.mp4", "/openers/op1.mp4", 3, "/out/v1.mp4");
    // Scroll stopper REPLACES: trims source from openerDuration onwards
    const filterIdx = ssrArgs.indexOf("-filter_complex") + 1;
    expect(ssrArgs[filterIdx]).toContain("trim=start=3");
    // Hook stack PREPENDS: no trimming, full source preserved
    const hsArgs = buildHookStackArgs("/src/video.mp4", "/openers/op1.mp4", "/out/v1.mp4");
    const hsFilterIdx = hsArgs.indexOf("-filter_complex") + 1;
    expect(hsArgs[hsFilterIdx]).not.toContain("trim=start=");
  });
});

// ── buildEnvironmentSwapArgs ────────────────────────────────────────────────

describe("buildEnvironmentSwapArgs", () => {
  it("overlays source on environment", () => {
    const args = buildEnvironmentSwapArgs("/src/video.mp4", "/env/beach.mp4", "/out/v1.mp4");
    expect(args[1]).toBe("/env/beach.mp4");
    expect(args[3]).toBe("/src/video.mp4");
    const filterIdx = args.indexOf("-filter_complex") + 1;
    expect(args[filterIdx]).toContain("overlay");
  });

  it("preserves source audio", () => {
    const args = buildEnvironmentSwapArgs("/src/video.mp4", "/env/beach.mp4", "/out/v1.mp4");
    expect(args).toContain("1:a");
  });
});

// ── buildAdFormatArgs ───────────────────────────────────────────────────────

describe("buildAdFormatArgs", () => {
  it("scales to 9x16 dimensions", () => {
    const args = buildAdFormatArgs("/src/video.mp4", "9x16", 60, "/out/v1.mp4");
    expect(args.some((a) => a.includes("1080:1920"))).toBe(true);
  });

  it("scales to 16x9 dimensions", () => {
    const args = buildAdFormatArgs("/src/video.mp4", "16x9", 60, "/out/v1.mp4");
    expect(args.some((a) => a.includes("1920:1080"))).toBe(true);
  });

  it("trims to target duration", () => {
    const args = buildAdFormatArgs("/src/video.mp4", "9x16", 45, "/out/v1.mp4");
    expect(args).toContain("-t");
    const tIdx = args.indexOf("-t") + 1;
    expect(args[tIdx]).toBe("45");
  });

  it("falls back to 1080x1920 for unknown dimensions", () => {
    const args = buildAdFormatArgs("/src/video.mp4", "4x3", 60, "/out/v1.mp4");
    expect(args.some((a) => a.includes("1080:1920"))).toBe(true);
  });
});

// ── buildEditArgs (router) ──────────────────────────────────────────────────

describe("buildEditArgs", () => {
  it("routes duration_cutdown correctly", () => {
    const args = buildEditArgs("/src.mp4", { type: "duration_cutdown", cut_plan: SAMPLE_CUT_PLAN }, "/out.mp4");
    expect(args.some((a) => typeof a === "string" && a.includes("concat"))).toBe(true);
  });

  it("routes hook_stack correctly", () => {
    const args = buildEditArgs("/src.mp4", { type: "hook_stack", hook_clip_path: "/hook.mp4", hook_duration_seconds: 5 }, "/out.mp4");
    expect(args).toContain("/hook.mp4");
  });

  it("routes scroll_stopper correctly", () => {
    const args = buildEditArgs("/src.mp4", { type: "scroll_stopper", opener_clip_path: "/opener.mp4", opener_duration_seconds: 3 }, "/out.mp4");
    expect(args).toContain("/opener.mp4");
  });

  it("routes environment_swap correctly", () => {
    const args = buildEditArgs("/src.mp4", { type: "environment_swap", environment_clip_path: "/env.mp4" }, "/out.mp4");
    expect(args).toContain("/env.mp4");
  });

  it("routes ad_format correctly", () => {
    const args = buildEditArgs("/src.mp4", { type: "ad_format", target_dimensions: "9x16", target_duration_seconds: 60 }, "/out.mp4");
    expect(args).toContain("-t");
  });

  it("throws on unknown operation type", () => {
    expect(() =>
      buildEditArgs("/src.mp4", { type: "unknown" } as any, "/out.mp4"),
    ).toThrow("Unknown edit operation");
  });
});

// ── assemble (main entry point) ─────────────────────────────────────────────

describe("assemble", () => {
  it("SUCCESS for single duration cutdown variation", async () => {
    const runner = createMockRunner();
    const result = await assemble(
      {
        source_file: "/src/video.mp4",
        operation: { type: "duration_cutdown", cut_plan: SAMPLE_CUT_PLAN },
        output_dir: "/output",
        variation_count: 1,
        root_angle_name: "Vertical Circle Secret",
      },
      runner,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.variations).toHaveLength(1);
    expect(result.data.variations[0].variation_index).toBe(1);
    expect(result.data.variations[0].edit_summary).toContain("Duration cutdown");
    expect(result.data.variations[0].root_angle_preserved).toBe(true);
  });

  it("produces correct number of variations", async () => {
    const runner = createMockRunner();
    const result = await assemble(
      {
        source_file: "/src/video.mp4",
        operation: { type: "hook_stack", hook_clip_path: "/hook.mp4", hook_duration_seconds: 5 },
        output_dir: "/output",
        variation_count: 3,
        root_angle_name: "Test",
      },
      runner,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.variations).toHaveLength(3);
    expect(runner.calls).toHaveLength(3);
    expect(result.data.variations[0].variation_index).toBe(1);
    expect(result.data.variations[2].variation_index).toBe(3);
  });

  it("passes correct output paths per variation", async () => {
    const runner = createMockRunner();
    await assemble(
      {
        source_file: "/src/video.mp4",
        operation: { type: "hook_stack", hook_clip_path: "/hook.mp4", hook_duration_seconds: 5 },
        output_dir: "/output",
        variation_count: 2,
        root_angle_name: "Test",
      },
      runner,
    );
    // Check output file paths
    const outputPaths = runner.calls.map((c) => c.args[c.args.length - 1]);
    expect(outputPaths[0]).toContain("variation_1.mp4");
    expect(outputPaths[1]).toContain("variation_2.mp4");
  });

  it("propagates duration flags from cut plan", async () => {
    const runner = createMockRunner();
    const result = await assemble(
      {
        source_file: "/src/video.mp4",
        operation: { type: "duration_cutdown", cut_plan: FLAGGED_CUT_PLAN },
        output_dir: "/output",
        variation_count: 1,
        root_angle_name: "Test",
      },
      runner,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.duration_flags).toHaveLength(1);
    expect(result.data.duration_flags[0]).toContain("67%");
  });

  it("generates edit summary for each operation type", async () => {
    const runner = createMockRunner();

    // Hook stack
    const hs = await assemble(
      { source_file: "/src.mp4", operation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 }, output_dir: "/out", variation_count: 1, root_angle_name: "X" },
      runner,
    );
    if (hs.status === "SUCCESS") expect(hs.data.variations[0].edit_summary).toContain("Hook stack");

    // Environment swap
    const env = await assemble(
      { source_file: "/src.mp4", operation: { type: "environment_swap", environment_clip_path: "/e.mp4" }, output_dir: "/out", variation_count: 1, root_angle_name: "X" },
      runner,
    );
    if (env.status === "SUCCESS") expect(env.data.variations[0].edit_summary).toContain("Environment swap");

    // Ad format
    const af = await assemble(
      { source_file: "/src.mp4", operation: { type: "ad_format", target_dimensions: "16x9", target_duration_seconds: 30 }, output_dir: "/out", variation_count: 1, root_angle_name: "X" },
      runner,
    );
    if (af.status === "SUCCESS") expect(af.data.variations[0].edit_summary).toContain("Ad format");
  });

  it("FAILED when FFmpeg exits non-zero", async () => {
    const runner = createFailingRunner(1, "Error: codec not found");
    const result = await assemble(
      {
        source_file: "/src/video.mp4",
        operation: { type: "hook_stack", hook_clip_path: "/hook.mp4", hook_duration_seconds: 5 },
        output_dir: "/output",
        variation_count: 1,
        root_angle_name: "Test",
      },
      runner,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.error_category).toBe("EDIT_ERROR");
    expect(result.message).toContain("exited with code 1");
  });

  it("FAILED when FFmpeg throws exception", async () => {
    const runner = createThrowingRunner("FFmpeg binary not found");
    const result = await assemble(
      {
        source_file: "/src/video.mp4",
        operation: { type: "hook_stack", hook_clip_path: "/hook.mp4", hook_duration_seconds: 5 },
        output_dir: "/output",
        variation_count: 1,
        root_angle_name: "Test",
      },
      runner,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("FFmpeg binary not found");
  });

  it("rejects missing source_file", async () => {
    const runner = createMockRunner();
    const result = await assemble(
      { source_file: "", operation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 }, output_dir: "/out", variation_count: 1, root_angle_name: "X" },
      runner,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("source_file");
  });

  it("rejects missing operation", async () => {
    const runner = createMockRunner();
    const result = await assemble(
      { source_file: "/src.mp4", operation: null as any, output_dir: "/out", variation_count: 1, root_angle_name: "X" },
      runner,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("operation");
  });

  it("rejects variation_count < 1", async () => {
    const runner = createMockRunner();
    const result = await assemble(
      { source_file: "/src.mp4", operation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 }, output_dir: "/out", variation_count: 0, root_angle_name: "X" },
      runner,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("variation_count");
  });

  it("calls ffmpeg for each variation", async () => {
    const runner = createMockRunner();
    await assemble(
      {
        source_file: "/src.mp4",
        operation: { type: "duration_cutdown", cut_plan: SAMPLE_CUT_PLAN },
        output_dir: "/out",
        variation_count: 3,
        root_angle_name: "Test",
      },
      runner,
    );
    expect(runner.calls).toHaveLength(3);
    for (const call of runner.calls) {
      expect(call.command).toBe("ffmpeg");
    }
  });
});

// ── Per-Variation Hooks ─────────────────────────────────────────────────────

describe("per_variation_hooks", () => {
  it("uses per_variation_hooks[i] override for each variation", async () => {
    const runner = createMockRunner();
    const result = await assemble(
      {
        source_file: "/src/video.mp4",
        operation: {
          type: "hook_stack",
          hook_clip_path: "/hooks/default.mp4",
          hook_duration_seconds: 3,
          per_variation_hooks: [
            { hook_clip_path: "/hooks/hook_a.mp4", hook_duration_seconds: 4 },
            { hook_clip_path: "/hooks/hook_b.mp4", hook_duration_seconds: 5 },
            { hook_clip_path: "/hooks/hook_c.mp4", hook_duration_seconds: 6 },
          ],
        },
        output_dir: "/output",
        variation_count: 3,
        root_angle_name: "Test",
      },
      runner,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");

    // Each variation should use its own hook
    expect(runner.calls[0].args).toContain("/hooks/hook_a.mp4");
    expect(runner.calls[1].args).toContain("/hooks/hook_b.mp4");
    expect(runner.calls[2].args).toContain("/hooks/hook_c.mp4");

    // Edit summaries reference per-variation hook paths
    expect(result.data.variations[0].edit_summary).toContain("hook_a.mp4");
    expect(result.data.variations[1].edit_summary).toContain("hook_b.mp4");
    expect(result.data.variations[2].edit_summary).toContain("hook_c.mp4");
  });

  it("falls back to single hook_clip_path when per_variation_hooks is undefined", async () => {
    const runner = createMockRunner();
    const result = await assemble(
      {
        source_file: "/src/video.mp4",
        operation: {
          type: "hook_stack",
          hook_clip_path: "/hooks/single.mp4",
          hook_duration_seconds: 3,
        },
        output_dir: "/output",
        variation_count: 2,
        root_angle_name: "Test",
      },
      runner,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");

    // Both variations use the single hook
    expect(runner.calls[0].args).toContain("/hooks/single.mp4");
    expect(runner.calls[1].args).toContain("/hooks/single.mp4");
  });

  it("falls back to single hook for variations beyond per_variation_hooks length", async () => {
    const runner = createMockRunner();
    const result = await assemble(
      {
        source_file: "/src/video.mp4",
        operation: {
          type: "hook_stack",
          hook_clip_path: "/hooks/default.mp4",
          hook_duration_seconds: 3,
          per_variation_hooks: [
            { hook_clip_path: "/hooks/hook_a.mp4", hook_duration_seconds: 4 },
          ],
        },
        output_dir: "/output",
        variation_count: 3,
        root_angle_name: "Test",
      },
      runner,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");

    // First variation uses per-variation hook, rest fall back to default
    expect(runner.calls[0].args).toContain("/hooks/hook_a.mp4");
    expect(runner.calls[1].args).toContain("/hooks/default.mp4");
    expect(runner.calls[2].args).toContain("/hooks/default.mp4");
  });
});

// ── Integration ─────────────────────────────────────────────────────────────

describe("integration", () => {
  it("full assembly flow: cut plan → FFmpeg args → execution → output", async () => {
    const runner = createMockRunner();
    const result = await assemble(
      {
        source_file: "/assets/357-0073-v0003.mp4",
        operation: { type: "duration_cutdown", cut_plan: SAMPLE_CUT_PLAN },
        output_dir: "/output/357-0073",
        variation_count: 3,
        root_angle_name: "The Emotional Relief",
      },
      runner,
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");

    // 3 variations produced
    expect(result.data.variations).toHaveLength(3);

    // Each has correct metadata
    for (let i = 0; i < 3; i++) {
      const v = result.data.variations[i];
      expect(v.variation_index).toBe(i + 1);
      expect(v.file_path).toContain("variation_");
      expect(v.edit_summary).toContain("Duration cutdown");
      expect(v.root_angle_preserved).toBe(true);
    }

    // FFmpeg was called 3 times with correct source
    expect(runner.calls).toHaveLength(3);
    for (const call of runner.calls) {
      expect(call.args).toContain("/assets/357-0073-v0003.mp4");
    }

    // No duration flags (SAMPLE_CUT_PLAN has no flag)
    expect(result.data.duration_flags).toHaveLength(0);
  });

  it("assembly stops on first FFmpeg failure in batch", async () => {
    let callCount = 0;
    const runner: CommandRunner = {
      run: async () => {
        callCount++;
        if (callCount === 2) return { exitCode: 1, stdout: "", stderr: "Segfault" };
        return { exitCode: 0, stdout: "", stderr: "" };
      },
    };

    const result = await assemble(
      {
        source_file: "/src.mp4",
        operation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 },
        output_dir: "/out",
        variation_count: 3,
        root_angle_name: "Test",
      },
      runner,
    );

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(callCount).toBe(2); // Stopped after failure, didn't attempt 3rd
  });
});
