import { describe, it, expect } from "vitest";
import { runPipeline } from "./index.js";
import type {
  OrchestratorDeps,
  PipelineRunConfig,
} from "./index.js";
import type {
  SheetsReader,
  SheetsWriter,
  CommandRunner,
  FileProber,
  RawIntake,
  EditOperation,
  ExportTargetSpec,
  AiGenerationClient,
  AiGenerationType,
  GenerationRequest,
} from "../types/pipeline.js";

// ── Mock Factories ──────────────────────────────────────────────────────────

/** Creates a SheetsReader that returns predefined rows. */
function createMockSheetsReader(
  rows: Record<string, string[][]>,
): SheetsReader {
  return {
    getRows: async (_id: string, _sheet: string, range: string) => {
      return rows[range] ?? rows["default"] ?? [];
    },
  };
}

/** Creates a SheetsWriter that records writes. */
function createMockSheetsWriter(opts?: {
  existingRows?: string[][];
}): SheetsWriter & { appendedRows: string[][] } {
  const appendedRows: string[][] = [];
  return {
    appendedRows,
    appendRows: async (_id: string, _sheet: string, rows: string[][]) => {
      appendedRows.push(...rows);
      return { updatedRows: rows.length };
    },
    getRows: async () => opts?.existingRows ?? [],
  };
}

/** Creates a CommandRunner that always succeeds. */
function createMockCommandRunner(): CommandRunner & { calls: { command: string; args: string[] }[] } {
  const calls: { command: string; args: string[] }[] = [];
  return {
    calls,
    run: async (command: string, args: string[]) => {
      calls.push({ command, args });
      return { exitCode: 0, stdout: "", stderr: "" };
    },
  };
}

/** Creates a FileProber that returns valid video probes. */
function createMockFileProber(): FileProber {
  return {
    probe: async (filePath: string) => ({
      file_path: filePath,
      format: "mp4",
      codec: "h264",
      width: 1080,
      height: 1920,
      duration_seconds: 60,
      file_size_bytes: 150 * 1024 * 1024,
    }),
  };
}

// ── Standard Test Data ──────────────────────────────────────────────────────

/**
 * SSS rows that simulate the Ad Level Tracking tab.
 * Column layout (A-U, indices 0-20):
 *   A(0)=Funnel, B(1)=Script ID, C(2)=Root Angle Name, D(3)=Asset ID,
 *   E-S(4-18)=other fields, T(19)=Classification, U(20)=spare
 *
 * NOTE: getRows("A2:U") skips header — these rows start from data row 1.
 */
const SSS_ROWS: string[][] = [
  // Source asset row (Winner)
  [
    "357",   // A: Funnel
    "0073",  // B: Script ID
    "Cheat Code", // C: Root Angle Name
    "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101", // D: Asset ID
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "Winner", // T: Classification (index 19)
    "",       // U: spare
  ],
  // Existing variation
  [
    "357",
    "0073",
    "Cheat Code",
    "357-0073-v0002-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260102",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "Testing",
    "",
  ],
];

const VALID_INTAKE: RawIntake = {
  source_asset_id: "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
  expansion_type: "hs",
  root_angle_name: "Cheat Code",
  target_variations: 2,
  edit_method: "assembly",
  directing_person: "co",
  special_instructions: null,
};

const HOOK_STACK_OP: EditOperation = {
  type: "hook_stack",
  hook_clip_path: "/clips/new-hook.mp4",
  hook_duration_seconds: 5,
};

const VIDEO_SPEC: ExportTargetSpec = {
  format: "mp4",
  codec: "h264",
  width: 1080,
  height: 1920,
  target_duration_seconds: 60,
  duration_tolerance_seconds: 5,
};

function createStandardConfig(overrides?: Partial<PipelineRunConfig>): PipelineRunConfig {
  return {
    intake: VALID_INTAKE,
    spreadsheet_id: "test-spreadsheet-id",
    output_dir: "/output",
    edit_operation: HOOK_STACK_OP,
    export_spec: VIDEO_SPEC,
    source_file_override: "/source/video.mp4",
    auto_confirm: true,
    auto_approve: true,
    ...overrides,
  };
}

function createStandardDeps(overrides?: Partial<OrchestratorDeps>): OrchestratorDeps {
  return {
    sheetsReader: createMockSheetsReader({ default: SSS_ROWS }),
    sheetsWriter: createMockSheetsWriter(),
    commandRunner: createMockCommandRunner(),
    fileProber: createMockFileProber(),
    ...overrides,
  };
}

// ── Full Pipeline Tests ─────────────────────────────────────────────────────

describe("runPipeline", () => {
  it("completes full pipeline with auto-confirm and auto-approve", async () => {
    const config = createStandardConfig();
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);

    expect(result.completed).toBe(true);
    expect(result.state.status).toBe("completed");

    // All steps should be completed or skipped
    for (const step of result.state.steps) {
      expect(["completed", "skipped"]).toContain(step.status);
    }
  });

  it("stores resolved_intake artifact from Step 1", async () => {
    const config = createStandardConfig();
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    expect(result.state.artifacts.resolved_intake).toBeDefined();
    expect(result.state.artifacts.resolved_intake!.script_id).toBe("0073");
    expect(result.state.artifacts.resolved_intake!.funnel).toBe("357");
  });

  it("stores verified_root_angle artifact from Step 2", async () => {
    const config = createStandardConfig();
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    expect(result.state.artifacts.verified_root_angle).toBeDefined();
    expect(result.state.artifacts.verified_root_angle!.root_angle_name).toBe("Cheat Code");
  });

  it("fails when root_angle_name is empty (caught at Step 1 by tess_connector)", async () => {
    const config = createStandardConfig({
      intake: { ...VALID_INTAKE, root_angle_name: "" },
    });
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("failed");
    expect(result.state.current_step).toBe(1);
    expect(result.state.error).toContain("root_angle_name");
  });

  it("fails when root_angle_name is whitespace-only (caught at Step 1 by tess_connector)", async () => {
    const config = createStandardConfig({
      intake: { ...VALID_INTAKE, root_angle_name: "   " },
    });
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("failed");
    expect(result.state.current_step).toBe(1);
  });

  it("stores reserved_variations artifact from Step 3", async () => {
    const config = createStandardConfig();
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    expect(result.state.artifacts.reserved_variations).toBeDefined();
    expect(result.state.artifacts.reserved_variations).toHaveLength(2);
  });

  it("stores generated_ids artifact from Step 6", async () => {
    const config = createStandardConfig();
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    expect(result.state.artifacts.generated_ids).toBeDefined();
    expect(result.state.artifacts.generated_ids!.length).toBe(2);
  });

  it("skips Steps 7 and 8 when deps not provided", async () => {
    const config = createStandardConfig();
    const deps = createStandardDeps();
    // No fetchSource, uploadAssets, or notifyHuman = skipped

    const result = await runPipeline(config, deps);
    const step7 = result.state.steps.find((s) => s.step === 7);
    const step8 = result.state.steps.find((s) => s.step === 8);
    expect(step7!.status).toBe("skipped");
    expect(step8!.status).toBe("skipped");
  });

  it("uses source_file_override to skip Step 4 fetch", async () => {
    const config = createStandardConfig({ source_file_override: "/local/source.mp4" });
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    const step4 = result.state.steps.find((s) => s.step === 4);
    expect(step4!.status).toBe("completed");
  });

  it("runs FFmpeg via CommandRunner for assembly", async () => {
    const runner = createMockCommandRunner();
    const config = createStandardConfig();
    const deps = createStandardDeps({ commandRunner: runner });

    await runPipeline(config, deps);

    // assembly_editor calls ffmpeg for each variation
    expect(runner.calls.length).toBeGreaterThanOrEqual(2);
    expect(runner.calls[0].command).toBe("ffmpeg");
  });

  it("writes tracking entries at Step 10", async () => {
    const writer = createMockSheetsWriter();
    const config = createStandardConfig();
    const deps = createStandardDeps({ sheetsWriter: writer });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(true);
    // Writer should have received 2 rows (2 variations)
    expect(writer.appendedRows.length).toBe(2);
  });
});

// ── Step 1 Failures ─────────────────────────────────────────────────────────

describe("Step 1 failures", () => {
  it("fails on invalid intake (missing source_asset_id)", async () => {
    const badIntake: RawIntake = {
      ...VALID_INTAKE,
      source_asset_id: "",
    };
    const config = createStandardConfig({ intake: badIntake });
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("failed");
    const step1 = result.state.steps.find((s) => s.step === 1);
    expect(step1!.status).toBe("failed");
  });
});

// ── Hook Stack Gate ────────────────────────────────────────────────────────

describe("hook_stack requires hook clip", () => {
  it("fails when hook_stack has no real hook clip (default path)", async () => {
    const config = createStandardConfig({
      edit_operation: {
        type: "hook_stack",
        hook_clip_path: "/clips/default-hook.mp4",
        hook_duration_seconds: 3,
      },
    });
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("failed");
    expect(result.state.error).toContain("Hook Stack requires a hook clip source");
  });

  it("passes when hook_stack has a real hook clip path", async () => {
    const config = createStandardConfig({
      edit_operation: {
        type: "hook_stack",
        hook_clip_path: "/real/hook.mp4",
        hook_duration_seconds: 3,
      },
    });
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(true);
  });
});

// ── Step 2 Pausing ──────────────────────────────────────────────────────────

describe("Step 2 human input", () => {
  it("pauses when root angle verifier needs human input (risky expansion)", async () => {
    const riskyIntake: RawIntake = {
      ...VALID_INTAKE,
      expansion_type: "dur", // Duration = risky
    };
    const config = createStandardConfig({ intake: riskyIntake });
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("awaiting_human");
    expect(result.paused_at).toBeDefined();
    expect(result.paused_at!.step).toBe(2);
  });
});

// ── Step 3 Confirmation ─────────────────────────────────────────────────────

describe("Step 3 confirmation", () => {
  it("pauses for human confirmation when auto_confirm is false", async () => {
    const config = createStandardConfig({ auto_confirm: false });
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("awaiting_human");
    expect(result.paused_at).toBeDefined();
    expect(result.paused_at!.step).toBe(3);
  });
});

// ── Step 4 Fetch ────────────────────────────────────────────────────────────

describe("Step 4 fetch source", () => {
  it("skips fetch when no fetchSource dep and no override", async () => {
    const config = createStandardConfig({ source_file_override: undefined });
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    // Should fail at step 5 because no source file available
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("failed");
  });

  it("uses fetchSource handler when provided", async () => {
    let fetchCalled = false;
    const config = createStandardConfig({ source_file_override: undefined });
    const deps = createStandardDeps({
      fetchSource: async () => {
        fetchCalled = true;
        return { status: "SUCCESS" as const, data: { file_path: "/fetched/source.mp4" } };
      },
    });

    const result = await runPipeline(config, deps);
    expect(fetchCalled).toBe(true);
    expect(result.completed).toBe(true);
  });
});

// ── Step 5 Edit Failures ────────────────────────────────────────────────────

describe("Step 5 edit failures", () => {
  it("fails when FFmpeg exits non-zero", async () => {
    const failRunner: CommandRunner = {
      run: async () => ({ exitCode: 1, stdout: "", stderr: "encode error" }),
    };
    const config = createStandardConfig();
    const deps = createStandardDeps({ commandRunner: failRunner });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("failed");
    const step5 = result.state.steps.find((s) => s.step === 5);
    expect(step5!.status).toBe("failed");
  });

  it("fails when export validation rejects files", async () => {
    // Prober returns bad codec — export spec requires h264
    const badProber: FileProber = {
      probe: async (filePath: string) => ({
        file_path: filePath,
        format: "mp4",
        codec: "vp9",       // Wrong codec!
        width: 1080,
        height: 1920,
        duration_seconds: 60,
        file_size_bytes: 150 * 1024 * 1024,
      }),
    };
    const config = createStandardConfig();
    const deps = createStandardDeps({ fileProber: badProber });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("failed");
  });
});

// ── Step 9 Checkpoint ───────────────────────────────────────────────────────

describe("Step 9 checkpoint", () => {
  it("pauses at checkpoint when auto_approve is false", async () => {
    const config = createStandardConfig({ auto_approve: false });
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("awaiting_human");
    expect(result.paused_at).toBeDefined();
    expect(result.paused_at!.step).toBe(9);
  });
});

// ── Step 10 Tracking ────────────────────────────────────────────────────────

describe("Step 10 tracking", () => {
  it("writes correct number of entries", async () => {
    const writer = createMockSheetsWriter();
    const config = createStandardConfig();
    const deps = createStandardDeps({ sheetsWriter: writer });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(true);
    expect(writer.appendedRows.length).toBe(2); // 2 variations
  });

  it("entries contain root angle name", async () => {
    const writer = createMockSheetsWriter();
    const config = createStandardConfig();
    const deps = createStandardDeps({ sheetsWriter: writer });

    await runPipeline(config, deps);
    // Root angle should be in each row's Column C position (index 2)
    for (const row of writer.appendedRows) {
      expect(row[2]).toBe("Cheat Code");
    }
  });
});

// ── Templates Integration ───────────────────────────────────────────────────

describe("with templates", () => {
  it("applies templates and still completes", async () => {
    const runner = createMockCommandRunner();
    const config = createStandardConfig({
      templates: [
        {
          type: "cta_end_card",
          cta_text: "Take The Quiz Now",
          duration_seconds: 5,
        },
      ],
    });
    const deps = createStandardDeps({ commandRunner: runner });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(true);

    // assembly (2 variations) + template rendering (2 files) = at least 4 calls
    expect(runner.calls.length).toBeGreaterThanOrEqual(4);
  });
});

// ── Pipeline State Queries ──────────────────────────────────────────────────

describe("pipeline state", () => {
  it("has valid run_id", async () => {
    const config = createStandardConfig();
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    expect(result.state.run_id).toMatch(/^veda-/);
  });

  it("has 10 steps", async () => {
    const config = createStandardConfig();
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    expect(result.state.steps).toHaveLength(10);
  });

  it("tracks timestamps", async () => {
    const config = createStandardConfig();
    const deps = createStandardDeps();

    const result = await runPipeline(config, deps);
    expect(result.state.created_at).toBeDefined();
    expect(result.state.updated_at).toBeDefined();
  });
});

// ── Step 5 AI Routing ──────────────────────────────────────────────────────

function createMockAiClient(): AiGenerationClient {
  return {
    isAvailable: () => true,
    generate: async (_req: GenerationRequest, outputDir: string) => ({
      file_path: `${outputDir}/ai-output.mp4`,
      cost_usd: 0.10,
    }),
  };
}

const AI_INTAKE: RawIntake = {
  ...VALID_INTAKE,
  edit_method: "ai_enhanced",
};

const AI_GENERATION_REQUEST: GenerationRequest = {
  type: "video",
  prompt: "Golfer performing a perfect swing",
  model: "kling_v2.5",
};

describe("Step 5 AI routing", () => {
  it("routes edit_method=assembly to assembly path (existing behavior)", async () => {
    const runner = createMockCommandRunner();
    const config = createStandardConfig();
    const deps = createStandardDeps({ commandRunner: runner });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(true);
    // Assembly path calls ffmpeg
    expect(runner.calls.length).toBeGreaterThan(0);
    expect(runner.calls[0].command).toBe("ffmpeg");
  });

  it("routes edit_method=ai_enhanced to AI path", async () => {
    const config = createStandardConfig({
      intake: AI_INTAKE,
      ai_generation_request: AI_GENERATION_REQUEST,
    });
    const deps = createStandardDeps({
      aiClient: createMockAiClient(),
    });

    const result = await runPipeline(config, deps);
    // AI path pauses for human review
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("awaiting_human");
    expect(result.paused_at).toBeDefined();
    expect(result.paused_at!.step).toBe(5);
    expect(result.paused_at!.reason).toContain("AI");
  });

  it("fails AI path when aiClient not provided", async () => {
    const config = createStandardConfig({
      intake: AI_INTAKE,
      ai_generation_request: AI_GENERATION_REQUEST,
    });
    const deps = createStandardDeps(); // No aiClient

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("failed");
    const step5 = result.state.steps.find((s) => s.step === 5);
    expect(step5!.status).toBe("failed");
  });

  it("fails AI path when ai_generation_request not provided", async () => {
    const config = createStandardConfig({
      intake: AI_INTAKE,
      // No ai_generation_request
    });
    const deps = createStandardDeps({
      aiClient: createMockAiClient(),
    });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("failed");
  });

  it("stores ai_generated_files artifact on success", async () => {
    const config = createStandardConfig({
      intake: AI_INTAKE,
      ai_generation_request: AI_GENERATION_REQUEST,
    });
    const deps = createStandardDeps({
      aiClient: createMockAiClient(),
    });

    const result = await runPipeline(config, deps);
    expect(result.state.artifacts.ai_generated_files).toBeDefined();
    expect(result.state.artifacts.ai_generated_files!).toHaveLength(1);
    expect(result.state.artifacts.ai_generated_files![0].generation_model).toBe("kling_v2.5");
  });
});

// ── Step 4.5 Auto Hook Selection ─────────────────────────────────────────

/**
 * Mock IconikClient for hook selector tests.
 * Provides searchByName, getTranscribeStatus, getTranscription, getProxies, downloadFile.
 */
function createMockIconikClient() {
  return {
    searchByName: async () => [{ id: "uuid-donor-1", title: "donor", is_online: true, type: "ASSET" }],
    getTranscribeStatus: async () => ({ status: "DONE" as const, version_id: "v1" }),
    getTranscription: async () => ({
      segments: [
        { start_time: 0, end_time: 2, text: "What if I told you." },
        { start_time: 2, end_time: 4, text: "This changes everything." },
        { start_time: 4, end_time: 8, text: "You're about to see why." },
      ],
    }),
    getProxies: async () => [{ id: "proxy-1", name: "proxy", size: 1000, url: "https://cdn.iconik.io/proxy.mp4", resolution: { width: 1080, height: 1920 }, codec: "h264", format: "mp4", filename: "proxy.mp4" }],
    downloadFile: async () => ({ bytes: 5000 }),
    triggerTranscription: async () => ({ job_id: "job-1" }),
  } as any;
}

/** SSS rows with multiple same-offer winners for hook selection. */
const HOOK_SSS_ROWS: string[][] = [
  // Target asset (script 0073)
  ["357", "0073", "Cheat Code", "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101", "", "", "", "", "", "bvo", "", "", "", "", "", "", "", "", "", "Winner", ""],
  // Donor 1 (script 0050) — Winner
  ["357", "0050", "Big Drive", "357-0050-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101", "", "", "", "", "", "bvo", "", "", "", "", "5000", "1.5", "", "", "", "Winner", ""],
  // Donor 2 (script 0060) — Winner
  ["357", "0060", "Secret Tip", "357-0060-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101", "", "", "", "", "", "bvo", "", "", "", "", "3000", "1.2", "", "", "", "Winner", ""],
  // Donor 3 (script 0070 — same as target!) — should be excluded
  ["357", "0073", "Cheat Code", "357-0073-v0005-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101", "", "", "", "", "", "bvo", "", "", "", "", "2000", "1.1", "", "", "", "Winner", ""],
];

const AUTO_HOOK_INPUT: import("../utils/hook-selector.js").SelectHooksInput = {
  target_asset_id: "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
  offer_prefix: "357",
  target_variations: 2,
};

describe("Step 4.5 auto hook selection", () => {
  it("hook gate passes when hook_selector_input is provided (no manual hook clip needed)", async () => {
    const config = createStandardConfig({
      edit_operation: {
        type: "hook_stack",
        hook_clip_path: "/clips/default-hook.mp4", // Would normally fail the gate
        hook_duration_seconds: 3,
      },
      hook_selector_input: AUTO_HOOK_INPUT,
    });
    const deps = createStandardDeps({
      sheetsReader: createMockSheetsReader({ default: HOOK_SSS_ROWS }),
      iconikClient: createMockIconikClient(),
    });

    const result = await runPipeline(config, deps);
    // Should NOT fail at hook gate — hasAutoHooks = true
    expect(result.state.error ?? "").not.toContain("Hook Stack requires a hook clip source");
    // Should reach Step 5+ (may complete or fail later, but passed the gate + Step 4.5)
    expect(result.state.current_step).toBeGreaterThanOrEqual(5);
  });

  it("completes full pipeline with auto-hook selection and stores hook artifacts", async () => {
    const config = createStandardConfig({
      edit_operation: {
        type: "hook_stack",
        hook_clip_path: "/clips/default-hook.mp4",
        hook_duration_seconds: 3,
      },
      hook_selector_input: AUTO_HOOK_INPUT,
    });
    const deps = createStandardDeps({
      sheetsReader: createMockSheetsReader({ default: HOOK_SSS_ROWS }),
      iconikClient: createMockIconikClient(),
    });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(true);

    // Hook artifacts stored
    expect(result.state.artifacts.hook_candidates).toBeDefined();
    expect(result.state.artifacts.hook_candidates!.length).toBe(2);
    expect(result.state.artifacts.hook_selection_rationale).toBeDefined();
    expect(result.state.artifacts.hook_selection_rationale).toContain("357");
  });

  it("fails when hook_selector_input provided but no iconikClient in deps", async () => {
    const config = createStandardConfig({
      edit_operation: {
        type: "hook_stack",
        hook_clip_path: "/clips/default-hook.mp4",
        hook_duration_seconds: 3,
      },
      hook_selector_input: AUTO_HOOK_INPUT,
    });
    const deps = createStandardDeps({
      sheetsReader: createMockSheetsReader({ default: HOOK_SSS_ROWS }),
      // No iconikClient!
    });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("failed");
    expect(result.state.error).toContain("iconikClient");
  });

  it("skips Step 4.5 when expansion type is not hook_stack", async () => {
    const config = createStandardConfig({
      intake: { ...VALID_INTAKE, expansion_type: "ssr" },
      edit_operation: {
        type: "scroll_stopper",
        opener_clip_path: "/clips/opener.mp4",
        opener_duration_seconds: 3,
      },
      hook_selector_input: AUTO_HOOK_INPUT, // Provided but irrelevant
    });
    const deps = createStandardDeps({
      iconikClient: createMockIconikClient(),
    });

    const result = await runPipeline(config, deps);
    // Should complete without hook artifacts
    expect(result.completed).toBe(true);
    expect(result.state.artifacts.hook_candidates).toBeUndefined();
  });

  it("fails when hook selector finds insufficient hooks", async () => {
    // Only one donor in SSS (not enough for 2 variations)
    const sparseRows: string[][] = [
      ["357", "0073", "Cheat Code", "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101", "", "", "", "", "", "bvo", "", "", "", "", "", "", "", "", "", "Winner", ""],
      ["357", "0050", "Big Drive", "357-0050-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101", "", "", "", "", "", "bvo", "", "", "", "", "5000", "1.5", "", "", "", "Winner", ""],
    ];

    const config = createStandardConfig({
      edit_operation: {
        type: "hook_stack",
        hook_clip_path: "/clips/default-hook.mp4",
        hook_duration_seconds: 3,
      },
      hook_selector_input: AUTO_HOOK_INPUT, // needs 2 hooks
    });
    const deps = createStandardDeps({
      sheetsReader: createMockSheetsReader({ default: sparseRows }),
      iconikClient: createMockIconikClient(),
    });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("failed");
    expect(result.state.error).toContain("Hook selection failed");
  });
});

// ── Step 7.5 Metadata Application ────────────────────────────────────────

/**
 * Mock IconikClient with metadata methods for Step 7.5 tests.
 */
function createMetadataIconikClient(overrides?: {
  setMetadata?: () => Promise<void>;
  getMetadata?: () => Promise<Record<string, string>>;
  setAssetTitle?: () => Promise<void>;
}) {
  // Store written metadata per asset so getMetadata returns what was set
  const storedMetadata = new Map<string, Record<string, string>>();

  return {
    // Hook selector methods (needed for standard pipeline flow)
    searchByName: async () => [],
    getTranscribeStatus: async () => ({ status: "DONE" as const, version_id: "v1" }),
    getTranscription: async () => ({ segments: [] }),
    getProxies: async () => [],
    downloadFile: async () => ({ bytes: 0 }),
    triggerTranscription: async () => ({ job_id: "job-1" }),
    // Metadata methods
    setAssetTitle: overrides?.setAssetTitle ?? (async () => {}),
    setMetadata: overrides?.setMetadata ?? (async (assetId: string, _viewId: string, values: Record<string, string>) => {
      storedMetadata.set(assetId, { ...(storedMetadata.get(assetId) ?? {}), ...values });
    }),
    getMetadata: overrides?.getMetadata ?? (async (assetId: string, _viewId: string) => {
      return storedMetadata.get(assetId) ?? {};
    }),
  } as any;
}

describe("Step 7.5 metadata application", () => {
  it("stores upload_urls in artifacts when uploadAssets returns URLs", async () => {
    const config = createStandardConfig();
    const deps = createStandardDeps({
      uploadAssets: async (files: string[]) => ({
        status: "SUCCESS" as const,
        data: { urls: files.map((_, i) => `https://app.iconik.io/asset/aa00bb${i + 1}1-ccdd-eeff-0011-223344556677`) },
      }),
    });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(true);
    expect(result.state.artifacts.upload_urls).toBeDefined();
    expect(result.state.artifacts.upload_urls!.length).toBe(2);
    expect(result.state.artifacts.upload_urls![0]).toContain("app.iconik.io/asset/");
  });

  it("skips metadata when metadata_view_id not configured", async () => {
    const config = createStandardConfig(); // No metadata_view_id
    const deps = createStandardDeps({
      uploadAssets: async (files: string[]) => ({
        status: "SUCCESS" as const,
        data: { urls: files.map((_, i) => `https://app.iconik.io/asset/aa00bb${i + 1}1-ccdd-eeff-0011-223344556677`) },
      }),
      iconikClient: createMetadataIconikClient(),
    });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(true);
    // metadata_applied should NOT be populated
    expect(result.state.artifacts.metadata_applied).toBeUndefined();
  });

  it("applies metadata and stores metadata_applied in artifacts", async () => {
    const config = createStandardConfig({
      metadata_view_id: "view-abc-123",
    });
    const deps = createStandardDeps({
      uploadAssets: async (files: string[]) => ({
        status: "SUCCESS" as const,
        data: { urls: files.map((_, i) => `https://app.iconik.io/asset/aa00bb${i + 1}1-ccdd-eeff-0011-223344556677`) },
      }),
      iconikClient: createMetadataIconikClient(),
    });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(true);
    expect(result.state.artifacts.metadata_applied).toBeDefined();
    expect(result.state.artifacts.metadata_applied!.length).toBe(2);
    expect(result.state.artifacts.metadata_applied![0].verified).toBe(true);
    expect(result.state.artifacts.metadata_applied![0].fields_applied).toBeGreaterThan(0);
  });

  it("fails pipeline when metadata is configured but setMetadata throws", async () => {
    const config = createStandardConfig({
      metadata_view_id: "view-abc-123",
    });
    const deps = createStandardDeps({
      uploadAssets: async (files: string[]) => ({
        status: "SUCCESS" as const,
        data: { urls: files.map((_, i) => `https://app.iconik.io/asset/aa00bb${i + 1}1-ccdd-eeff-0011-223344556677`) },
      }),
      iconikClient: createMetadataIconikClient({
        setMetadata: async () => { throw new Error("Iconik 500 Internal Server Error"); },
      }),
    });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("failed");
    expect(result.state.error).toContain("Metadata");
  });

  it("fails pipeline when metadata is configured but read-back mismatches", async () => {
    const config = createStandardConfig({
      metadata_view_id: "view-abc-123",
    });
    const deps = createStandardDeps({
      uploadAssets: async (files: string[]) => ({
        status: "SUCCESS" as const,
        data: { urls: files.map((_, i) => `https://app.iconik.io/asset/aa00bb${i + 1}1-ccdd-eeff-0011-223344556677`) },
      }),
      iconikClient: createMetadataIconikClient({
        getMetadata: async () => ({ veda_funnel: "WRONG_VALUE" }), // Mismatch
      }),
    });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(false);
    expect(result.state.status).toBe("failed");
    expect(result.state.error).toContain("Metadata");
  });

  it("skips metadata when upload was skipped (no upload_urls)", async () => {
    const config = createStandardConfig({
      metadata_view_id: "view-abc-123",
    });
    const deps = createStandardDeps({
      // No uploadAssets — Step 7 skips, no URLs available
      iconikClient: createMetadataIconikClient(),
    });

    const result = await runPipeline(config, deps);
    expect(result.completed).toBe(true);
    // Step 7 skipped → no upload_urls → Step 7.5 skips gracefully
    expect(result.state.artifacts.metadata_applied).toBeUndefined();
  });
});
