import { describe, it, expect } from "vitest";
import { scrollStopperAgent } from "./index.js";
import type { ExpansionContext, ExpansionDeps } from "../types.js";
import type { CommandRunner, EditOperation, ResolvedIntake } from "../../types/pipeline.js";

// ── Helpers ──────────────────────────────────────────────────────────────────

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
  return { run: async () => ({ exitCode, stdout: "", stderr }) };
}

function createThrowingRunner(errorMsg: string): CommandRunner {
  return { run: async () => { throw new Error(errorMsg); } };
}

const BASE_INTAKE: ResolvedIntake = {
  script_id: "0073",
  funnel: "357",
  root_angle_name: "Vertical Circle Secret",
  platform: "fb",
  dimensions: "9x16",
  length_tier: "ls",
  ad_category: "exv",
  expansion_type: "ssr",
  asset_type: "vid",
  talent_code: "alexa",
  directing_person: "co",
  country_code: "us",
  target_variations: 2,
  edit_method: "assembly",
};

function makeCtx(overrides: Partial<ExpansionContext> = {}): ExpansionContext {
  return {
    sourceFile: "/src/video.mp4",
    outputDir: "/output",
    resolvedIntake: BASE_INTAKE,
    variationCount: 2,
    editOperation: {
      type: "scroll_stopper",
      opener_clip_path: "/openers/attention.mp4",
      opener_duration_seconds: 3,
    } as EditOperation,
    ...overrides,
  };
}

function makeDeps(runner?: CommandRunner): ExpansionDeps {
  return {
    commandRunner: runner ?? createMockRunner(),
    fileProber: { probe: async () => ({ width: 1080, height: 1920, duration: 120, codec: "h264", fps: 30 }) },
  };
}

// ── Identity ─────────────────────────────────────────────────────────────────

describe("scrollStopperAgent identity", () => {
  it("has correct typeCode and name", () => {
    expect(scrollStopperAgent.typeCode).toBe("ssr");
    expect(scrollStopperAgent.name).toBe("scroll-stopper");
  });
});

// ── Validation ──────────────────────────────────────────────────────────────

describe("scrollStopperAgent.validate", () => {
  it("passes with valid scroll_stopper context", () => {
    const result = scrollStopperAgent.validate(makeCtx());
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects wrong operation type", () => {
    const ctx = makeCtx({
      editOperation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 } as EditOperation,
    });
    const result = scrollStopperAgent.validate(ctx);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("scroll_stopper");
  });

  it("rejects missing opener_clip_path", () => {
    const ctx = makeCtx({
      editOperation: { type: "scroll_stopper", opener_clip_path: "", opener_duration_seconds: 3 } as EditOperation,
    });
    const result = scrollStopperAgent.validate(ctx);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("opener clip"))).toBe(true);
  });

  it("rejects opener_duration_seconds <= 0", () => {
    const ctx = makeCtx({
      editOperation: { type: "scroll_stopper", opener_clip_path: "/op.mp4", opener_duration_seconds: 0 } as EditOperation,
    });
    const result = scrollStopperAgent.validate(ctx);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("opener_duration_seconds"))).toBe(true);
  });

  it("rejects missing source_file", () => {
    const ctx = makeCtx({ sourceFile: "" });
    const result = scrollStopperAgent.validate(ctx);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("source_file"))).toBe(true);
  });

  it("rejects variationCount < 1", () => {
    const ctx = makeCtx({ variationCount: 0 });
    const result = scrollStopperAgent.validate(ctx);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("variation_count"))).toBe(true);
  });

  it("warns when opener exceeds 5s", () => {
    const ctx = makeCtx({
      editOperation: { type: "scroll_stopper", opener_clip_path: "/op.mp4", opener_duration_seconds: 8 } as EditOperation,
    });
    const result = scrollStopperAgent.validate(ctx);
    expect(result.valid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain("8s");
  });

  it("no warning for opener within range", () => {
    const ctx = makeCtx();
    const result = scrollStopperAgent.validate(ctx);
    expect(result.warnings).toHaveLength(0);
  });
});

// ── Execution ───────────────────────────────────────────────────────────────

describe("scrollStopperAgent.execute", () => {
  it("SUCCESS with correct number of variations", async () => {
    const runner = createMockRunner();
    const result = await scrollStopperAgent.execute(makeCtx(), makeDeps(runner));

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.variations).toHaveLength(2);
    expect(result.data.variations[0].variation_index).toBe(1);
    expect(result.data.variations[1].variation_index).toBe(2);
  });

  it("calls FFmpeg with buildScrollStopperArgs for each variation", async () => {
    const runner = createMockRunner();
    await scrollStopperAgent.execute(makeCtx(), makeDeps(runner));

    expect(runner.calls).toHaveLength(2);
    for (const call of runner.calls) {
      expect(call.command).toBe("ffmpeg");
      // Scroll stopper trims source from opener duration onward
      const filterIdx = call.args.indexOf("-filter_complex") + 1;
      expect(call.args[filterIdx]).toContain("trim=start=3");
    }
  });

  it("produces correct output file paths", async () => {
    const runner = createMockRunner();
    await scrollStopperAgent.execute(makeCtx(), makeDeps(runner));

    const outputPaths = runner.calls.map((c) => c.args[c.args.length - 1]);
    expect(outputPaths[0]).toContain("variation_1.mp4");
    expect(outputPaths[1]).toContain("variation_2.mp4");
  });

  it("edit_summary references opener and duration", async () => {
    const runner = createMockRunner();
    const result = await scrollStopperAgent.execute(makeCtx(), makeDeps(runner));

    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.variations[0].edit_summary).toContain("Scroll stopper");
    expect(result.data.variations[0].edit_summary).toContain("3s");
    expect(result.data.variations[0].edit_summary).toContain("attention.mp4");
  });

  it("returns empty durationFlags", async () => {
    const runner = createMockRunner();
    const result = await scrollStopperAgent.execute(makeCtx(), makeDeps(runner));

    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.durationFlags).toHaveLength(0);
  });

  it("root_angle_preserved is true for all variations", async () => {
    const runner = createMockRunner();
    const result = await scrollStopperAgent.execute(makeCtx(), makeDeps(runner));

    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    for (const v of result.data.variations) {
      expect(v.root_angle_preserved).toBe(true);
    }
  });

  it("FAILED when FFmpeg exits non-zero", async () => {
    const runner = createFailingRunner(1, "Error: codec not found");
    const result = await scrollStopperAgent.execute(makeCtx(), makeDeps(runner));

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.error_category).toBe("EDIT_ERROR");
    expect(result.message).toContain("exited with code 1");
  });

  it("FAILED when FFmpeg throws exception", async () => {
    const runner = createThrowingRunner("FFmpeg binary not found");
    const result = await scrollStopperAgent.execute(makeCtx(), makeDeps(runner));

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("FFmpeg binary not found");
  });

  it("FAILED when operation type is wrong", async () => {
    const ctx = makeCtx({
      editOperation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 } as EditOperation,
    });
    const result = await scrollStopperAgent.execute(ctx, makeDeps());

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("wrong operation type");
  });

  it("stops on first FFmpeg failure in batch", async () => {
    let callCount = 0;
    const runner: CommandRunner = {
      run: async () => {
        callCount++;
        if (callCount === 1) return { exitCode: 1, stdout: "", stderr: "Segfault" };
        return { exitCode: 0, stdout: "", stderr: "" };
      },
    };
    const result = await scrollStopperAgent.execute(makeCtx(), makeDeps(runner));

    expect(result.status).toBe("FAILED");
    expect(callCount).toBe(1);
  });
});
