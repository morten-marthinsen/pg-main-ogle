import { describe, it, expect } from "vitest";
import { resumePipeline } from "./resume.js";
import { runPipeline } from "./index.js";
import type { OrchestratorDeps, PipelineRunConfig } from "./index.js";
import type {
  PipelineState,
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

// ── Mock Factories (same pattern as orchestrator.test.ts) ────────────────────

function createMockSheetsReader(
  rows: Record<string, string[][]>,
): SheetsReader {
  return {
    getRows: async (_id: string, _sheet: string, range: string) => {
      return rows[range] ?? rows["default"] ?? [];
    },
  };
}

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

function createMockAiClient(): AiGenerationClient {
  return {
    isAvailable: (_type: AiGenerationType) => true,
    generate: async (_request: GenerationRequest, outputDir: string) => ({
      file_path: `${outputDir}/ai_generated.mp4`,
      cost_usd: 0.05,
    }),
  };
}

// ── Standard Test Data ───────────────────────────────────────────────────────

const SSS_ROWS: string[][] = [
  [
    "357", "0073", "Cheat Code",
    "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "Winner", "",
  ],
  [
    "357", "0073", "Cheat Code",
    "357-0073-v0002-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260102",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "Testing", "",
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

// ── Helper: run pipeline until it pauses, then return paused state ──────────

async function runUntilPause(
  configOverrides?: Partial<PipelineRunConfig>,
  depsOverrides?: Partial<OrchestratorDeps>,
): Promise<{ state: PipelineState; config: PipelineRunConfig; deps: OrchestratorDeps; pausedAt: number }> {
  const config = createStandardConfig(configOverrides);
  const deps = createStandardDeps(depsOverrides);
  const result = await runPipeline(config, deps);

  if (result.completed || !result.paused_at) {
    throw new Error(`Expected pipeline to pause, but it ${result.completed ? "completed" : "failed"}`);
  }

  return { state: result.state, config, deps, pausedAt: result.paused_at.step };
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("resumePipeline", () => {
  describe("error handling", () => {
    it("throws when state is not awaiting_human", async () => {
      const config = createStandardConfig();
      const deps = createStandardDeps();
      const result = await runPipeline(config, deps);

      // Pipeline completed — state.status is "completed"
      await expect(
        resumePipeline(result.state, config, deps),
      ).rejects.toThrow('Cannot resume pipeline in "completed" state');
    });

    it("throws when state is failed", async () => {
      const failedState: PipelineState = {
        run_id: "test-failed",
        status: "failed",
        current_step: 1,
        steps: [],
        artifacts: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        error: "Some failure",
      };

      const config = createStandardConfig();
      const deps = createStandardDeps();

      await expect(
        resumePipeline(failedState, config, deps),
      ).rejects.toThrow('Cannot resume pipeline in "failed" state');
    });
  });

  describe("resume from Step 3 (confirmation)", () => {
    it("completes remaining steps after confirmation", async () => {
      // Run until Step 3 pause (auto_confirm: false)
      const { state, config, deps } = await runUntilPause({ auto_confirm: false });

      expect(state.status).toBe("awaiting_human");
      const step3 = state.steps.find((s) => s.step === 3);
      expect(step3?.status).toBe("awaiting_human");

      // Resume with auto_approve so it doesn't pause at Step 9
      const resumeResult = await resumePipeline(state, config, deps);

      expect(resumeResult.completed).toBe(true);
      expect(resumeResult.state.status).toBe("completed");
    });

    it("preserves artifacts from before the pause", async () => {
      const { state, config, deps } = await runUntilPause({ auto_confirm: false });

      // Artifacts from Steps 1-2 should exist
      expect(state.artifacts.resolved_intake).toBeDefined();
      expect(state.artifacts.verified_root_angle).toBeDefined();
      // Artifacts from Step 3 should also exist (stored while paused)
      expect(state.artifacts.reserved_variations).toBeDefined();

      const resumeResult = await resumePipeline(state, config, deps);

      // All artifacts preserved and new ones added
      expect(resumeResult.state.artifacts.resolved_intake).toBeDefined();
      expect(resumeResult.state.artifacts.verified_root_angle).toBeDefined();
      expect(resumeResult.state.artifacts.generated_ids).toBeDefined();
    });

    it("continues to Steps 4-10 after Step 3 resume", async () => {
      const writer = createMockSheetsWriter();
      const { state, config } = await runUntilPause({ auto_confirm: false });

      const deps = createStandardDeps({ sheetsWriter: writer });
      const resumeResult = await resumePipeline(state, config, deps);

      // Step 10 ran — check that sheets were written
      expect(writer.appendedRows.length).toBeGreaterThan(0);
      expect(resumeResult.completed).toBe(true);
    });
  });

  describe("resume from Step 9 (checkpoint)", () => {
    it("completes Step 10 after approval", async () => {
      // Run with auto_confirm but NOT auto_approve → pauses at Step 9
      const { state, config, deps } = await runUntilPause({
        auto_confirm: true,
        auto_approve: false,
      });

      expect(state.status).toBe("awaiting_human");
      const step9 = state.steps.find((s) => s.step === 9);
      expect(step9?.status).toBe("awaiting_human");

      // Resume
      const resumeResult = await resumePipeline(state, config, deps);

      expect(resumeResult.completed).toBe(true);
      expect(resumeResult.state.status).toBe("completed");

      // Step 10 should be completed
      const step10 = resumeResult.state.steps.find((s) => s.step === 10);
      expect(step10?.status).toBe("completed");
    });

    it("preserves all artifacts accumulated through Steps 1-8", async () => {
      const { state, config, deps } = await runUntilPause({
        auto_confirm: true,
        auto_approve: false,
      });

      // Steps 1-8 already ran, artifacts should be present
      expect(state.artifacts.resolved_intake).toBeDefined();
      expect(state.artifacts.verified_root_angle).toBeDefined();
      expect(state.artifacts.reserved_variations).toBeDefined();
      expect(state.artifacts.generated_ids).toBeDefined();

      const resumeResult = await resumePipeline(state, config, deps);

      // All artifacts still present after resume
      expect(resumeResult.state.artifacts.resolved_intake).toBeDefined();
      expect(resumeResult.state.artifacts.generated_ids).toBeDefined();
    });
  });

  describe("resume can pause again", () => {
    it("resumes from Step 3, then pauses at Step 9", async () => {
      // Pause at Step 3
      const { state, config, deps } = await runUntilPause({
        auto_confirm: false,
        auto_approve: false,
      });

      expect(state.status).toBe("awaiting_human");
      const step3 = state.steps.find((s) => s.step === 3);
      expect(step3?.status).toBe("awaiting_human");

      // Resume — should pause again at Step 9
      const resumeResult = await resumePipeline(state, config, deps);

      expect(resumeResult.completed).toBe(false);
      expect(resumeResult.paused_at).toBeDefined();
      expect(resumeResult.paused_at!.step).toBe(9);

      // Resume again — should complete
      const finalResult = await resumePipeline(resumeResult.state, config, deps);

      expect(finalResult.completed).toBe(true);
      expect(finalResult.state.status).toBe("completed");
    });
  });

  describe("resume from Step 5 (AI content review)", () => {
    it("completes remaining steps after AI review approval", async () => {
      const aiClient = createMockAiClient();

      // Run with AI edit method, auto_confirm, auto_approve
      const config = createStandardConfig({
        auto_confirm: true,
        auto_approve: true,
        intake: {
          ...VALID_INTAKE,
          edit_method: "ai_enhanced",
        },
        ai_generation_request: {
          type: "video",
          prompt: "Generate a test video",
          model: "flux",
        },
      });
      const deps = createStandardDeps({ aiClient });

      const result = await runPipeline(config, deps);

      // AI path always pauses for human review at Step 5
      expect(result.completed).toBe(false);
      expect(result.paused_at?.step).toBe(5);
      expect(result.state.artifacts.ai_generated_files).toBeDefined();

      // Resume — should complete Steps 6-10
      const resumeResult = await resumePipeline(result.state, config, deps);

      expect(resumeResult.completed).toBe(true);
      expect(resumeResult.state.artifacts.generated_ids).toBeDefined();
    });
  });

  describe("state serialization roundtrip", () => {
    it("works after JSON serialize/deserialize (simulating disk save)", async () => {
      const { state, config, deps } = await runUntilPause({ auto_confirm: false });

      // Simulate saving to disk and loading back
      const serialized = JSON.stringify({ state, config });
      const loaded = JSON.parse(serialized) as { state: PipelineState; config: PipelineRunConfig };

      // Resume with deserialized state
      const resumeResult = await resumePipeline(loaded.state, loaded.config, deps);

      expect(resumeResult.completed).toBe(true);
      expect(resumeResult.state.status).toBe("completed");
    });
  });
});
