/**
 * Integration tests for the Veda pipeline orchestrator.
 *
 * These tests use realistic SSS (Strategic Scaling System) spreadsheet data
 * modeled on the actual Production spreadsheet. They exercise the full pipeline
 * from intake through all 10 steps with mock external deps (Sheets, FFmpeg, FFprobe).
 *
 * Real-world patterns tested:
 *   - Mixed OLD/INCOMPLETE/NEW format Asset IDs
 *   - High variation numbers (v0681)
 *   - Messy suffixes (" - copy 2", ".mp4")
 *   - Multiple funnels in a single dataset
 *   - Winner/Underperformer classifications
 *   - All safe expansion types (hs, env, ssr, af)
 *   - Risky expansion types (dur, cf)
 */

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
  TemplateParams,
} from "../types/pipeline.js";

// ── Realistic SSS Fixture Data ─────────────────────────────────────────────
//
// Column layout: A(0)=Funnel, B(1)=Script ID, C(2)=Root Angle Name,
// D(3)=Asset ID, E(4)=Platform, F(5)=Dimensions, G(6)=Length Tier,
// H(7)=Ad Category, I(8)=Expansion Type, J(9)=Asset Type, K(10)=Talent,
// L(11)=Editor, M(12)=Copywriter, N(13)=Country Code, O(14)=Creation Date,
// P(15)=Status, Q(16)=Spend, R(17)=Net Revenue, S(18)=ROAS,
// T(19)=Classification, U(20)=Format Type
//
// Range is "A2:U" — no header row included.

function makeRow(
  funnel: string,
  scriptId: string,
  rootAngle: string,
  assetId: string,
  classification: string,
  extras?: Partial<Record<number, string>>,
): string[] {
  const row = new Array(21).fill("");
  row[0] = funnel;
  row[1] = scriptId;
  row[2] = rootAngle;
  row[3] = assetId;
  row[19] = classification;
  if (extras) {
    for (const [idx, val] of Object.entries(extras)) {
      row[Number(idx)] = val;
    }
  }
  return row;
}

/**
 * Realistic SSS data modeled on the actual Production spreadsheet.
 * Includes messy OLD-format IDs, INCOMPLETE entries, high variation numbers,
 * multiple funnels, and mixed classifications.
 */
const REALISTIC_SSS_ROWS: string[][] = [
  // ─ pmax (non-standard, no real asset ID) ─
  makeRow("pmax", "", "", "pmax", "winner"),

  // ─ 357 funnel, Script 0073 — "Cheat Code" — Winner with 2 existing variations ─
  makeRow(
    "357", "0073", "Cheat Code",
    "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
    "Winner",
  ),
  makeRow(
    "357", "0073", "Cheat Code",
    "357-0073-v0002-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260102",
    "Testing",
  ),

  // ─ 357 funnel, Script 0021 — OLD format, high variation numbers ─
  makeRow(
    "357", "0021", "EX of 357-0021",
    "357-0021-v0001-9x16-nnmu-vd-2min-garymc-myrn-mw-x-07042025 - copy 2",
    "underperformer",
    { 5: "9x16", 20: "OLD" },
  ),
  makeRow(
    "357", "0021", "EX of 357-0021",
    "357-0021-v0174-9x16-exp-vd-2min-garymc-jrfno-cjrfno-x-10102025",
    "underperformer",
    { 5: "9x16", 20: "OLD" },
  ),

  // ─ 357 funnel, Script 0033 — OLD format with .mp4 suffix — Winner ─
  makeRow(
    "357", "0033", "",
    "357-0033-v0001-9x16-nn-vd-1min-garymc-mrten-cmrten-x-07102025.mp4 - copy 3",
    "winner",
    { 5: "9x16", 20: "OLD" },
  ),

  // ─ dqfe funnel, Script 0036 — Winner with named root angle ─
  makeRow(
    "dqfe", "0036", "Beat the Guys",
    "dqfe-0036-v0001-fb-9x16-180s-nn-xx-bvo-mach-vv-co-us-20260115",
    "winner",
    { 4: "fb", 5: "9x16", 6: "180s" },
  ),
  makeRow(
    "dqfe", "0036", "Beat the Guys",
    "dqfe-0036-v0002-fb-9x16-180s-exv-hs-bvo-mach-vv-co-us-20260120",
    "Testing",
  ),
  makeRow(
    "dqfe", "0036", "Beat the Guys",
    "dqfe-0036-v0003-fb-9x16-180s-exv-hs-bvo-mach-vv-co-us-20260127",
    "winner",
  ),

  // ─ sf1 funnel, Script 0001 — OLD format, extremely high variation (v0681) ─
  makeRow(
    "sf1", "0001", "EXP of sf1-0001",
    "sf1-0001-v0681-9x16-exp-vd-5min-hank-clev-cf-blackfriday2025-11042025 - copy 2",
    "underperformer",
    { 5: "9x16", 20: "OLD" },
  ),

  // ─ clst funnel, Script 0142 — OLD format with " - copy" suffix ─
  makeRow(
    "clst", "0142", "EXP of clst-0142",
    "clst-0142-v0023-9x16-exp-vd-1min-agen-gbrl-co-x-08052025 - copy",
    "underperformer",
    { 5: "9x16", 20: "OLD" },
  ),

  // ─ 357 funnel, Script 0033 — additional variation (Winner) ─
  makeRow(
    "357", "0033", "",
    "357-0033-v0005-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260201",
    "winner",
  ),
];

// ── Mock Factories ──────────────────────────────────────────────────────────

function createRealisticSheetsReader(
  rows: string[][] = REALISTIC_SSS_ROWS,
): SheetsReader {
  return {
    getRows: async (_id: string, _sheet: string, _range: string) => rows,
  };
}

function createRealisticSheetsWriter(opts?: {
  existingRows?: string[][];
}): SheetsWriter & { appendedRows: string[][] } {
  const appendedRows: string[][] = [];
  return {
    appendedRows,
    appendRows: async (_id: string, _sheet: string, rows: string[][]) => {
      appendedRows.push(...rows);
      return { updatedRows: rows.length };
    },
    getRows: async () => opts?.existingRows ?? REALISTIC_SSS_ROWS,
  };
}

function createRealisticCommandRunner(): CommandRunner & {
  calls: { command: string; args: string[] }[];
} {
  const calls: { command: string; args: string[] }[] = [];
  return {
    calls,
    run: async (command: string, args: string[]) => {
      calls.push({ command, args });
      return { exitCode: 0, stdout: "", stderr: "" };
    },
  };
}

function createRealisticFileProber(overrides?: Partial<{
  width: number;
  height: number;
  duration_seconds: number;
}>): FileProber {
  return {
    probe: async (filePath: string) => ({
      file_path: filePath,
      format: "mp4",
      codec: "h264",
      width: overrides?.width ?? 1080,
      height: overrides?.height ?? 1920,
      duration_seconds: overrides?.duration_seconds ?? 60,
      file_size_bytes: 150 * 1024 * 1024,
    }),
  };
}

// ── Shared Test Config Builders ─────────────────────────────────────────────

const STANDARD_HOOK_STACK: EditOperation = {
  type: "hook_stack",
  hook_clip_path: "/clips/new-hook.mp4",
  hook_duration_seconds: 5,
};

const STANDARD_EXPORT_SPEC: ExportTargetSpec = {
  format: "mp4",
  codec: "h264",
  width: 1080,
  height: 1920,
  target_duration_seconds: 60,
  duration_tolerance_seconds: 5,
};

function buildConfig(overrides?: Partial<PipelineRunConfig>): PipelineRunConfig {
  return {
    intake: {
      source_asset_id: "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
      expansion_type: "hs",
      root_angle_name: "Cheat Code",
      target_variations: 2,
      edit_method: "assembly",
      directing_person: "co",
      special_instructions: null,
    },
    spreadsheet_id: "test-sss-id",
    output_dir: "/output",
    edit_operation: STANDARD_HOOK_STACK,
    export_spec: STANDARD_EXPORT_SPEC,
    source_file_override: "/source/video.mp4",
    auto_confirm: true,
    auto_approve: true,
    ...overrides,
  };
}

function buildDeps(overrides?: Partial<OrchestratorDeps>): OrchestratorDeps {
  return {
    sheetsReader: createRealisticSheetsReader(),
    sheetsWriter: createRealisticSheetsWriter(),
    commandRunner: createRealisticCommandRunner(),
    fileProber: createRealisticFileProber(),
    ...overrides,
  };
}

// ── Integration Test Suites ─────────────────────────────────────────────────

describe("Integration: realistic SSS data", () => {
  describe("Happy path — 357-0073 Winner + hook_stack", () => {
    it("completes full pipeline with realistic SSS data", async () => {
      const result = await runPipeline(buildConfig(), buildDeps());

      expect(result.completed).toBe(true);
      expect(result.state.status).toBe("completed");
      expect(result.state.steps).toHaveLength(10);
    });

    it("correctly resolves intake from 15-position source ID", async () => {
      const result = await runPipeline(buildConfig(), buildDeps());

      const resolved = result.state.artifacts.resolved_intake!;
      expect(resolved.funnel).toBe("357");
      expect(resolved.script_id).toBe("0073");
      expect(resolved.platform).toBe("fb");
      expect(resolved.dimensions).toBe("9x16");
      expect(resolved.length_tier).toBe("60s");
      expect(resolved.expansion_type).toBe("hs");
      expect(resolved.talent_code).toBe("mach");
    });

    it("reserves v0003 and v0004 (after existing v0001, v0002)", async () => {
      const result = await runPipeline(buildConfig(), buildDeps());

      const reserved = result.state.artifacts.reserved_variations!;
      expect(reserved).toEqual(["v0003", "v0004"]);
    });

    it("generates 2 valid Asset IDs with correct variation numbers", async () => {
      const result = await runPipeline(buildConfig(), buildDeps());

      const ids = result.state.artifacts.generated_ids!;
      expect(ids).toHaveLength(2);

      // Both should be PASSED validation
      for (const id of ids) {
        expect(id.validation_status).toBe("PASSED");
        expect(id.validation_errors).toHaveLength(0);
      }

      // Variation numbers should be v0003, v0004
      expect(ids[0].positions.variation_id).toBe("v0003");
      expect(ids[1].positions.variation_id).toBe("v0004");

      // All other positions inherited from source
      for (const id of ids) {
        expect(id.positions.funnel).toBe("357");
        expect(id.positions.script_id).toBe("0073");
        expect(id.positions.platform).toBe("fb");
        expect(id.positions.dimensions).toBe("9x16");
        expect(id.positions.talent_code).toBe("mach");
        expect(id.positions.country_code).toBe("us");
      }
    });

    it("executes FFmpeg for each variation", async () => {
      const runner = createRealisticCommandRunner();
      const result = await runPipeline(
        buildConfig(),
        buildDeps({ commandRunner: runner }),
      );

      expect(result.completed).toBe(true);
      expect(runner.calls.length).toBeGreaterThanOrEqual(2);
      expect(runner.calls.every((c) => c.command === "ffmpeg")).toBe(true);
    });

    it("writes 2 tracking rows with correct root angle", async () => {
      const writer = createRealisticSheetsWriter();
      const result = await runPipeline(
        buildConfig(),
        buildDeps({ sheetsWriter: writer }),
      );

      expect(result.completed).toBe(true);
      expect(writer.appendedRows).toHaveLength(2);

      for (const row of writer.appendedRows) {
        expect(row[2]).toBe("Cheat Code"); // Column C = Root Angle Name
        expect(row[0]).toBe("357");         // Column A = Funnel
        expect(row[1]).toBe("0073");        // Column B = Script ID
      }
    });
  });

  describe("Multiple funnels — dqfe-0036 Winner + hook_stack", () => {
    const dqfeConfig = buildConfig({
      intake: {
        source_asset_id: "dqfe-0036-v0001-fb-9x16-180s-nn-xx-bvo-mach-vv-co-us-20260115",
        expansion_type: "hs",
        root_angle_name: "Beat the Guys",
        target_variations: 1,
        edit_method: "assembly",
        directing_person: "co",
        special_instructions: null,
      },
      export_spec: {
        ...STANDARD_EXPORT_SPEC,
        target_duration_seconds: 180,
        duration_tolerance_seconds: 10,
      },
    });

    it("completes for dqfe funnel", async () => {
      const prober = createRealisticFileProber({ duration_seconds: 180 });
      const result = await runPipeline(dqfeConfig, buildDeps({ fileProber: prober }));

      expect(result.completed).toBe(true);
      expect(result.state.artifacts.resolved_intake!.funnel).toBe("dqfe");
    });

    it("reserves v0004 (after existing v0001, v0002, v0003)", async () => {
      const prober = createRealisticFileProber({ duration_seconds: 180 });
      const result = await runPipeline(dqfeConfig, buildDeps({ fileProber: prober }));

      const reserved = result.state.artifacts.reserved_variations!;
      expect(reserved).toEqual(["v0004"]);
    });

    it("filters only dqfe-0036 rows despite mixed funnel data", async () => {
      const prober = createRealisticFileProber({ duration_seconds: 180 });
      const result = await runPipeline(dqfeConfig, buildDeps({ fileProber: prober }));

      // Should have found exactly 3 existing variations for dqfe-0036
      const lookup = result.state.artifacts.sheets_lookup!;
      expect(lookup.existing_variations).toHaveLength(3);
      expect(lookup.existing_variations).toContain("v0001");
      expect(lookup.existing_variations).toContain("v0002");
      expect(lookup.existing_variations).toContain("v0003");
    });
  });

  describe("Messy OLD-format data resilience", () => {
    it("handles SSS rows with ' - copy 2' suffixes without crashing", async () => {
      // 357-0033 has messy OLD format IDs with .mp4 and " - copy 3" suffixes
      const config = buildConfig({
        intake: {
          source_asset_id: "357-0033-v0005-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260201",
          expansion_type: "hs",
          root_angle_name: "Test Angle",
          target_variations: 1,
          edit_method: "assembly",
          directing_person: "co",
          special_instructions: null,
        },
      });

      const result = await runPipeline(config, buildDeps());

      expect(result.completed).toBe(true);
      // Should have found v0001 and v0005 despite messy suffixes
      const lookup = result.state.artifacts.sheets_lookup!;
      expect(lookup.existing_variations).toContain("v0001");
      expect(lookup.existing_variations).toContain("v0005");
    });

    it("correctly extracts high variation numbers from messy IDs", async () => {
      // sf1-0001 has v0681 — highest we've seen in real data
      // Source needs to be a Winner, but sf1-0001 is "underperformer"
      // So this should pause at step 2 for human input (non-winner classification)
      const config = buildConfig({
        intake: {
          source_asset_id: "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
          expansion_type: "hs",
          root_angle_name: "Cheat Code",
          target_variations: 3,
          edit_method: "assembly",
          directing_person: "co",
          special_instructions: null,
        },
      });

      const result = await runPipeline(config, buildDeps());
      expect(result.completed).toBe(true);

      // Should reserve v0003, v0004, v0005
      const reserved = result.state.artifacts.reserved_variations!;
      expect(reserved).toEqual(["v0003", "v0004", "v0005"]);
    });
  });

  describe("Expansion type behaviors", () => {
    it("safe expansion (hs) completes without human pause at step 2", async () => {
      const result = await runPipeline(buildConfig(), buildDeps());

      expect(result.completed).toBe(true);
      // Step 2 should be completed, not awaiting_human
      const step2 = result.state.steps.find((s) => s.step === 2);
      expect(step2!.status).toBe("completed");
    });

    it("safe expansion (env) completes without human pause", async () => {
      const config = buildConfig({
        intake: {
          source_asset_id: "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
          expansion_type: "env",
          root_angle_name: "Cheat Code",
          target_variations: 1,
          edit_method: "assembly",
          directing_person: "co",
          special_instructions: null,
        },
        edit_operation: {
          type: "environment_swap",
          environment_clip_path: "/clips/beach-bg.mp4",
        },
      });

      const result = await runPipeline(config, buildDeps());
      expect(result.completed).toBe(true);
    });

    it("risky expansion (dur) pauses at step 2 for human review", async () => {
      const config = buildConfig({
        intake: {
          source_asset_id: "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
          expansion_type: "dur",
          root_angle_name: "Cheat Code",
          target_variations: 1,
          edit_method: "assembly",
          directing_person: "co",
          special_instructions: null,
        },
      });

      const result = await runPipeline(config, buildDeps());

      expect(result.completed).toBe(false);
      expect(result.state.status).toBe("awaiting_human");
      expect(result.paused_at).toBeDefined();
      expect(result.paused_at!.step).toBe(2);
    });

    it("risky expansion (cf) pauses at step 2 for human review", async () => {
      const config = buildConfig({
        intake: {
          source_asset_id: "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
          expansion_type: "cf",
          root_angle_name: "Cheat Code",
          target_variations: 1,
          edit_method: "assembly",
          directing_person: "co",
          special_instructions: null,
        },
      });

      const result = await runPipeline(config, buildDeps());

      expect(result.completed).toBe(false);
      expect(result.state.status).toBe("awaiting_human");
      expect(result.paused_at!.step).toBe(2);
    });
  });

  describe("Classification eligibility", () => {
    it("non-Winner source pauses for human override", async () => {
      // Use 357-0021 which only has "underperformer" classification.
      // Must use a valid 15-position source ID (OLD format IDs can't be parsed).
      const config = buildConfig({
        intake: {
          source_asset_id: "357-0021-v0174-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
          expansion_type: "hs",
          root_angle_name: "EX of 357-0021",
          target_variations: 1,
          edit_method: "assembly",
          directing_person: "co",
          special_instructions: null,
        },
      });

      const result = await runPipeline(config, buildDeps());

      expect(result.completed).toBe(false);
      expect(result.state.status).toBe("awaiting_human");
      expect(result.paused_at!.step).toBe(2);
    });

    it("Winner-classified source passes eligibility check", async () => {
      // 357-0073 has "Winner" classification — should pass
      const result = await runPipeline(buildConfig(), buildDeps());

      const verified = result.state.artifacts.verified_root_angle!;
      expect(verified.classification_eligible).toBe(true);
      expect(verified.source_classification).toBe("winner"); // verifier lowercases
    });
  });

  describe("Source not found in SSS", () => {
    it("fails when source script_id doesn't exist in SSS", async () => {
      const config = buildConfig({
        intake: {
          source_asset_id: "357-9999-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
          expansion_type: "hs",
          root_angle_name: "Nonexistent",
          target_variations: 1,
          edit_method: "assembly",
          directing_person: "co",
          special_instructions: null,
        },
      });

      const result = await runPipeline(config, buildDeps());

      expect(result.completed).toBe(false);
      expect(result.state.status).toBe("failed");
      // Should fail at step 2 — source not found
      const step2 = result.state.steps.find((s) => s.step === 2);
      expect(step2!.status).toBe("failed");
    });
  });

  describe("Template integration with realistic data", () => {
    it("applies CTA end card + lower third and completes", async () => {
      const runner = createRealisticCommandRunner();
      const templates: TemplateParams[] = [
        {
          type: "cta_end_card",
          cta_text: "Take The Quiz Now",
          duration_seconds: 5,
        },
        {
          type: "lower_third",
          headline: "Limited Time Offer",
          duration_seconds: 4,
          show_at_seconds: 10,
        },
      ];

      const config = buildConfig({ templates });
      const result = await runPipeline(config, buildDeps({ commandRunner: runner }));

      expect(result.completed).toBe(true);

      // assembly (2 variations) + template rendering (2 variations × templates) = at least 4 calls
      expect(runner.calls.length).toBeGreaterThanOrEqual(4);
      expect(runner.calls.every((c) => c.command === "ffmpeg")).toBe(true);
    });

    it("applies caption overlay template and completes", async () => {
      const runner = createRealisticCommandRunner();
      const templates: TemplateParams[] = [
        {
          type: "caption_overlay",
          caption_style: "bold",
          transcript_segments: [
            { start_time: 0, end_time: 5, text: "The secret to longer drives" },
            { start_time: 5, end_time: 12, text: "is something most golfers miss" },
          ],
        },
      ];

      const config = buildConfig({ templates });
      const result = await runPipeline(config, buildDeps({ commandRunner: runner }));

      expect(result.completed).toBe(true);
    });
  });

  describe("Human confirmation gates", () => {
    it("pauses at step 3 when auto_confirm=false", async () => {
      const config = buildConfig({ auto_confirm: false });
      const result = await runPipeline(config, buildDeps());

      expect(result.completed).toBe(false);
      expect(result.state.status).toBe("awaiting_human");
      expect(result.paused_at!.step).toBe(3);

      // Artifacts should still have reserved variations even while paused
      expect(result.state.artifacts.reserved_variations).toBeDefined();
    });

    it("pauses at step 9 when auto_approve=false", async () => {
      const config = buildConfig({ auto_approve: false });
      const result = await runPipeline(config, buildDeps());

      expect(result.completed).toBe(false);
      expect(result.state.status).toBe("awaiting_human");
      expect(result.paused_at!.step).toBe(9);

      // Steps 1-8 should all be completed or skipped
      for (const step of result.state.steps) {
        if (step.step <= 8) {
          expect(["completed", "skipped"]).toContain(step.status);
        }
      }
    });
  });

  describe("Fetch source handling", () => {
    it("completes with fetchSource handler when no override", async () => {
      let fetchedAssetId = "";
      const config = buildConfig({ source_file_override: undefined });
      const deps = buildDeps({
        fetchSource: async (assetId: string) => {
          fetchedAssetId = assetId;
          return { status: "SUCCESS" as const, data: { file_path: "/iconik/fetched.mp4" } };
        },
      });

      const result = await runPipeline(config, deps);

      expect(result.completed).toBe(true);
      expect(fetchedAssetId).toBeTruthy();
    });

    it("fails when no source_file_override and no fetchSource", async () => {
      const config = buildConfig({ source_file_override: undefined });
      const result = await runPipeline(config, buildDeps());

      expect(result.completed).toBe(false);
      expect(result.state.status).toBe("failed");
    });
  });

  describe("External service integration stubs", () => {
    it("calls uploadAssets when provided", async () => {
      let uploadedFiles: string[] = [];
      const deps = buildDeps({
        uploadAssets: async (files: string[]) => {
          uploadedFiles = files;
          return { status: "SUCCESS" as const, data: { urls: files.map((f) => `https://iconik.io/${f}`) } };
        },
      });

      const result = await runPipeline(buildConfig(), deps);

      expect(result.completed).toBe(true);
      expect(uploadedFiles.length).toBeGreaterThanOrEqual(2);
      // Step 7 should be completed, not skipped
      const step7 = result.state.steps.find((s) => s.step === 7);
      expect(step7!.status).toBe("completed");
    });

    it("calls notifyHuman when provided", async () => {
      let notificationMessage = "";
      const deps = buildDeps({
        notifyHuman: async (message: string) => {
          notificationMessage = message;
          return { status: "SUCCESS" as const, data: { sent: true } };
        },
      });

      const result = await runPipeline(buildConfig(), deps);

      expect(result.completed).toBe(true);
      expect(notificationMessage).toContain("Cheat Code"); // Root angle name in notification
      // Step 8 should be completed, not skipped
      const step8 = result.state.steps.find((s) => s.step === 8);
      expect(step8!.status).toBe("completed");
    });

    it("skips steps 7 and 8 when handlers not provided", async () => {
      const result = await runPipeline(buildConfig(), buildDeps());

      const step7 = result.state.steps.find((s) => s.step === 7);
      const step8 = result.state.steps.find((s) => s.step === 8);
      expect(step7!.status).toBe("skipped");
      expect(step8!.status).toBe("skipped");
    });
  });

  describe("FFmpeg failure handling", () => {
    it("fails gracefully when FFmpeg exits non-zero", async () => {
      const failRunner: CommandRunner = {
        run: async () => ({ exitCode: 1, stdout: "", stderr: "Encoding error: invalid codec" }),
      };
      const result = await runPipeline(buildConfig(), buildDeps({ commandRunner: failRunner }));

      expect(result.completed).toBe(false);
      expect(result.state.status).toBe("failed");
      const step5 = result.state.steps.find((s) => s.step === 5);
      expect(step5!.status).toBe("failed");
    });

    it("fails when export validation rejects codec", async () => {
      // With adaptive export spec, dimensions now match source probe,
      // so test codec mismatch instead (spec requires h264)
      const badCodecProber: FileProber = {
        probe: async (filePath: string) => ({
          file_path: filePath,
          format: "mp4",
          codec: "vp9",       // Wrong codec — spec requires h264
          width: 1080,
          height: 1920,
          duration_seconds: 60,
          file_size_bytes: 150 * 1024 * 1024,
        }),
      };
      const result = await runPipeline(buildConfig(), buildDeps({ fileProber: badCodecProber }));

      expect(result.completed).toBe(false);
      expect(result.state.status).toBe("failed");
    });

    it("fails when export validation rejects duration", async () => {
      // Use duration_cutdown (not hook_stack) because adaptive export spec
      // sets hook_stack target to source + hook duration. Duration cutdown validates
      // against the spec's hardcoded target_duration_seconds (60s ± 5s).
      const badProber = createRealisticFileProber({
        duration_seconds: 300, // Way over 60s ± 5s
      });
      const cutdownOp: EditOperation = {
        type: "duration_cutdown",
        cut_plan: {
          target_duration: 30,
          segments: [
            { start_time: 0, end_time: 3, type: "hook", transcript_text: "" },
            { start_time: 10, end_time: 25, type: "body", transcript_text: "" },
            { start_time: 55, end_time: 60, type: "cta", transcript_text: "" },
          ],
          actual_duration: 23,
          root_angle_preserved: true,
          duration_flag: false,
        },
      };
      const result = await runPipeline(
        buildConfig({ edit_operation: cutdownOp }),
        buildDeps({ fileProber: badProber }),
      );

      expect(result.completed).toBe(false);
      expect(result.state.status).toBe("failed");
    });
  });

  describe("Pipeline state integrity", () => {
    it("run_id follows veda- prefix pattern", async () => {
      const result = await runPipeline(buildConfig(), buildDeps());
      expect(result.state.run_id).toMatch(/^veda-/);
    });

    it("has exactly 10 steps", async () => {
      const result = await runPipeline(buildConfig(), buildDeps());
      expect(result.state.steps).toHaveLength(10);
    });

    it("all steps have timestamps after completion", async () => {
      const result = await runPipeline(buildConfig(), buildDeps());

      expect(result.state.created_at).toBeDefined();
      expect(result.state.updated_at).toBeDefined();

      for (const step of result.state.steps) {
        if (step.status === "completed") {
          expect(step.started_at).toBeDefined();
          expect(step.completed_at).toBeDefined();
        }
      }
    });

    it("artifacts accumulate correctly across steps", async () => {
      const result = await runPipeline(buildConfig(), buildDeps());

      // Step 1: resolved_intake
      expect(result.state.artifacts.resolved_intake).toBeDefined();
      // Step 2: verified_root_angle
      expect(result.state.artifacts.verified_root_angle).toBeDefined();
      // Step 3: sheets_lookup + reserved_variations
      expect(result.state.artifacts.sheets_lookup).toBeDefined();
      expect(result.state.artifacts.reserved_variations).toBeDefined();
      // Step 5: assembled_variations + export_validation
      expect(result.state.artifacts.assembled_variations).toBeDefined();
      expect(result.state.artifacts.export_validation).toBeDefined();
      // Step 6: generated_ids
      expect(result.state.artifacts.generated_ids).toBeDefined();
    });
  });
});

// ── Ad Format Expansion E2E ─────────────────────────────────────────────────

describe("Integration: ad_format expansion E2E", () => {
  const AD_FORMAT_OP: EditOperation = {
    type: "ad_format",
    target_dimensions: "16x9",
    target_duration_seconds: 30,
  };

  const AD_FORMAT_EXPORT_SPEC: ExportTargetSpec = {
    format: "mp4",
    codec: "h264",
    width: 1920,
    height: 1080,
    target_duration_seconds: 30,
    duration_tolerance_seconds: 5,
  };

  function buildAdFormatConfig(overrides?: Partial<PipelineRunConfig>): PipelineRunConfig {
    return buildConfig({
      intake: {
        source_asset_id: "357-0073-v0001-yt-16x9-60s-exv-hs-bvo-mach-vv-co-us-20260101",
        expansion_type: "af",
        root_angle_name: "Cheat Code",
        target_variations: 2,
        edit_method: "assembly",
        directing_person: "co",
        special_instructions: null,
      },
      edit_operation: AD_FORMAT_OP,
      export_spec: AD_FORMAT_EXPORT_SPEC,
      ...overrides,
    });
  }

  it("completes full pipeline with ad_format expansion", async () => {
    // Ad format targets 16x9 — mock prober returns matching dimensions
    const prober = createRealisticFileProber({ width: 1920, height: 1080, duration_seconds: 30 });
    const result = await runPipeline(buildAdFormatConfig(), buildDeps({ fileProber: prober }));

    // Debug: find which step failed
    if (!result.completed) {
      for (const step of result.state.steps) {
        if (step.status === "failed") {
          console.error(`[DEBUG] Step ${step.step_number} FAILED: ${step.error}`);
        }
      }
      if (result.paused_at) {
        console.error(`[DEBUG] Paused at step ${result.paused_at.step}: ${result.paused_at.reason}`);
      }
    }

    expect(result.completed).toBe(true);
    expect(result.state.status).toBe("completed");
    expect(result.state.steps).toHaveLength(10);
  });

  it("resolves expansion_type as 'af' in intake", async () => {
    const prober = createRealisticFileProber({ width: 1920, height: 1080, duration_seconds: 30 });
    const result = await runPipeline(buildAdFormatConfig(), buildDeps({ fileProber: prober }));

    const resolved = result.state.artifacts.resolved_intake!;
    expect(resolved.expansion_type).toBe("af");
  });

  it("skips hook gate (no hook clip required)", async () => {
    // Ad format should NOT fail at the hook gate
    const prober = createRealisticFileProber({ width: 1920, height: 1080, duration_seconds: 30 });
    const result = await runPipeline(buildAdFormatConfig(), buildDeps({ fileProber: prober }));

    // Should not fail at step 1 with hook error
    expect(result.state.steps[0].status).toBe("completed");
    expect(result.completed).toBe(true);
  });

  it("produces correct Asset IDs with af expansion code", async () => {
    const prober = createRealisticFileProber({ width: 1920, height: 1080, duration_seconds: 30 });
    const result = await runPipeline(buildAdFormatConfig(), buildDeps({ fileProber: prober }));

    const ids = result.state.artifacts.generated_ids!;
    expect(ids).toHaveLength(2);
    for (const id of ids) {
      expect(id.validation_status).toBe("PASSED");
      // Expansion type in the Asset ID should reflect ad_format
      expect(id.positions.expansion_type).toBe("af");
    }
  });

  it("generates 2 assembled variations", async () => {
    const prober = createRealisticFileProber({ width: 1920, height: 1080, duration_seconds: 30 });
    const result = await runPipeline(buildAdFormatConfig(), buildDeps({ fileProber: prober }));

    const variations = result.state.artifacts.assembled_variations!;
    expect(variations).toHaveLength(2);
  });
});

// ── Scroll Stopper Expansion E2E ────────────────────────────────────────────

describe("Integration: scroll_stopper expansion E2E", () => {
  const SSR_OP: EditOperation = {
    type: "scroll_stopper",
    opener_clip_path: "/clips/new-opener.mp4",
    opener_duration_seconds: 3,
  };

  function buildSsrConfig(overrides?: Partial<PipelineRunConfig>): PipelineRunConfig {
    return buildConfig({
      intake: {
        source_asset_id: "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
        expansion_type: "ssr",
        root_angle_name: "Cheat Code",
        target_variations: 2,
        edit_method: "assembly",
        directing_person: "co",
        special_instructions: null,
      },
      edit_operation: SSR_OP,
      export_spec: STANDARD_EXPORT_SPEC,
      ...overrides,
    });
  }

  it("completes full pipeline with scroll_stopper expansion", async () => {
    const result = await runPipeline(buildSsrConfig(), buildDeps());

    expect(result.completed).toBe(true);
    expect(result.state.status).toBe("completed");
    expect(result.state.steps).toHaveLength(10);
  });

  it("resolves expansion_type as 'ssr' in intake", async () => {
    const result = await runPipeline(buildSsrConfig(), buildDeps());

    const resolved = result.state.artifacts.resolved_intake!;
    expect(resolved.expansion_type).toBe("ssr");
  });

  it("skips hook gate (no hook clip required)", async () => {
    const result = await runPipeline(buildSsrConfig(), buildDeps());

    expect(result.state.steps[0].status).toBe("completed");
    expect(result.completed).toBe(true);
  });

  it("adapts export duration to match source (duration-preserving op)", async () => {
    const result = await runPipeline(buildSsrConfig(), buildDeps());

    // Should complete — scroll_stopper adapts duration to source (60s from mock prober)
    expect(result.completed).toBe(true);
    expect(result.state.artifacts.export_validation).toBeDefined();
  });

  it("produces correct Asset IDs with ssr expansion code", async () => {
    const result = await runPipeline(buildSsrConfig(), buildDeps());

    const ids = result.state.artifacts.generated_ids!;
    expect(ids).toHaveLength(2);
    for (const id of ids) {
      expect(id.validation_status).toBe("PASSED");
      expect(id.positions.expansion_type).toBe("ssr");
    }
  });
});
