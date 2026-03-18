import { describe, it, expect } from "vitest";
import { parseCliArgs, buildEditOperation, buildConfig, createDryRunSheetsReader, createDryRunSheetsWriter } from "./cli.js";

// ── parseCliArgs ─────────────────────────────────────────────────────────────

describe("parseCliArgs", () => {
  it("parses all required args", () => {
    const args = parseCliArgs([
      "run",
      "--source", "DQFE-SC01-v0001",
      "--expansion", "hs",
      "--override-root-angle", "The Move",
    ]);

    expect(args.source).toBe("DQFE-SC01-v0001");
    expect(args.expansion).toBe("hs");
    expect(args.overrideRootAngle).toBe("The Move");
  });

  it("applies default values for optional args", () => {
    const args = parseCliArgs([
      "run",
      "--source", "X",
      "--expansion", "hs",
      "--override-root-angle", "Y",
    ]);

    expect(args.variations).toBe(3);
    expect(args.editor).toBe("co");
    expect(args.method).toBe("assembly");
    expect(args.output).toBe("./output");
    expect(args.hookDuration).toBe(3);
    expect(args.dryRun).toBe(false);
    expect(args.autoConfirm).toBe(false);
    expect(args.autoApprove).toBe(false);
  });

  it("parses optional override args", () => {
    const args = parseCliArgs([
      "run",
      "--source", "X",
      "--expansion", "hs",
      "--override-root-angle", "Y",
      "--variations", "5",
      "--editor", "jb",
      "--method", "ai_enhanced",
      "--output", "/custom/output",
      "--source-file", "/path/to/video.mp4",
      "--hook-clip", "/path/to/hook.mp4",
      "--hook-duration", "7",
    ]);

    expect(args.variations).toBe(5);
    expect(args.editor).toBe("jb");
    expect(args.method).toBe("ai_enhanced");
    expect(args.output).toBe("/custom/output");
    expect(args.sourceFile).toBe("/path/to/video.mp4");
    expect(args.hookClip).toBe("/path/to/hook.mp4");
    expect(args.hookDuration).toBe(7);
  });

  it("parses boolean flags", () => {
    const args = parseCliArgs([
      "run",
      "--source", "X",
      "--expansion", "hs",
      "--override-root-angle", "Y",
      "--dry-run",
      "--auto-confirm",
      "--auto-approve",
    ]);

    expect(args.dryRun).toBe(true);
    expect(args.autoConfirm).toBe(true);
    expect(args.autoApprove).toBe(true);
  });

  it("parses --resume flag", () => {
    const args = parseCliArgs([
      "run",
      "--resume", "veda-abc123-xyz",
    ]);

    expect(args.resume).toBe("veda-abc123-xyz");
  });

  it("parses --help flag", () => {
    const args = parseCliArgs(["--help"]);
    expect(args.help).toBe(true);
  });

  it("parses -h shorthand", () => {
    const args = parseCliArgs(["-h"]);
    expect(args.help).toBe(true);
  });

  it("parses --version flag", () => {
    const args = parseCliArgs(["--version"]);
    expect(args.version).toBe(true);
  });

  it("handles missing source/expansion/override-root-angle gracefully (undefined)", () => {
    const args = parseCliArgs(["run"]);

    expect(args.source).toBeUndefined();
    expect(args.expansion).toBeUndefined();
    expect(args.overrideRootAngle).toBeUndefined();
  });
});

// ── buildEditOperation ───────────────────────────────────────────────────────

describe("buildEditOperation", () => {
  it("builds hook_stack operation for 'hs' expansion", () => {
    const args = parseCliArgs([
      "run", "--source", "X", "--expansion", "hs", "--override-root-angle", "Y",
      "--hook-clip", "/clips/hook.mp4", "--hook-duration", "5",
    ]);

    const op = buildEditOperation(args);
    expect(op.type).toBe("hook_stack");
    if (op.type === "hook_stack") {
      expect(op.hook_clip_path).toBe("/clips/hook.mp4");
      expect(op.hook_duration_seconds).toBe(5);
    }
  });

  it("builds hook_stack operation for 'hook_stack' expansion (long name)", () => {
    const args = parseCliArgs([
      "run", "--source", "X", "--expansion", "hook_stack", "--override-root-angle", "Y",
    ]);

    const op = buildEditOperation(args);
    expect(op.type).toBe("hook_stack");
  });

  it("builds scroll_stopper operation for 'ss' expansion", () => {
    const args = parseCliArgs([
      "run", "--source", "X", "--expansion", "ss", "--override-root-angle", "Y",
    ]);

    const op = buildEditOperation(args);
    expect(op.type).toBe("scroll_stopper");
  });

  it("builds environment_swap operation for 'env' expansion", () => {
    const args = parseCliArgs([
      "run", "--source", "X", "--expansion", "env", "--override-root-angle", "Y",
    ]);

    const op = buildEditOperation(args);
    expect(op.type).toBe("environment_swap");
  });

  it("builds ad_format operation for 'adf' expansion", () => {
    const args = parseCliArgs([
      "run", "--source", "X", "--expansion", "adf", "--override-root-angle", "Y",
    ]);

    const op = buildEditOperation(args);
    expect(op.type).toBe("ad_format");
  });

  it("builds duration_cutdown operation for 'dur' expansion", () => {
    const args = parseCliArgs([
      "run", "--source", "X", "--expansion", "dur", "--override-root-angle", "Y",
    ]);

    const op = buildEditOperation(args);
    expect(op.type).toBe("duration_cutdown");
  });

  it("builds similar_presenter operation for 'sp' expansion", () => {
    const args = parseCliArgs([
      "run", "--source", "X", "--expansion", "sp", "--override-root-angle", "Y",
    ]);

    const op = buildEditOperation(args);
    expect(op.type).toBe("similar_presenter");
  });

  it("builds different_presenter operation for 'dp' expansion", () => {
    const args = parseCliArgs([
      "run", "--source", "X", "--expansion", "dp", "--override-root-angle", "Y",
    ]);

    const op = buildEditOperation(args);
    expect(op.type).toBe("different_presenter");
  });

  it("builds copy_framework operation for 'cf' expansion", () => {
    const args = parseCliArgs([
      "run", "--source", "X", "--expansion", "cf", "--override-root-angle", "Y",
    ]);

    const op = buildEditOperation(args);
    expect(op.type).toBe("copy_framework");
  });

  it("builds international operation for 'int' expansion", () => {
    const args = parseCliArgs([
      "run", "--source", "X", "--expansion", "int", "--override-root-angle", "Y",
    ]);

    const op = buildEditOperation(args);
    expect(op.type).toBe("international");
  });

  it("throws for unknown expansion type", () => {
    const args = parseCliArgs([
      "run", "--source", "X", "--expansion", "unknown_type", "--override-root-angle", "Y",
    ]);

    expect(() => buildEditOperation(args)).toThrow("Unknown expansion type");
  });
});

// ── buildConfig ──────────────────────────────────────────────────────────────

describe("buildConfig", () => {
  it("builds valid PipelineRunConfig from args", () => {
    const args = parseCliArgs([
      "run",
      "--source", "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
      "--expansion", "hs",
      "--override-root-angle", "Cheat Code",
      "--variations", "2",
      "--source-file", "/source/video.mp4",
      "--auto-confirm",
      "--auto-approve",
    ]);

    const config = buildConfig(args);

    expect(config.intake.source_asset_id).toBe(
      "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
    );
    expect(config.intake.expansion_type).toBe("hs");
    expect(config.intake.root_angle_name).toBe("Cheat Code");
    expect(config.intake.target_variations).toBe(2);
    expect(config.intake.edit_method).toBe("assembly");
    expect(config.intake.directing_person).toBe("co");
    expect(config.auto_confirm).toBe(true);
    expect(config.auto_approve).toBe(true);
    expect(config.source_file_override).toContain("video.mp4");
  });

  it("normalizes long expansion names to codes", () => {
    const args = parseCliArgs([
      "run",
      "--source", "X-Y-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
      "--expansion", "hook_stack",
      "--override-root-angle", "Test",
    ]);

    const config = buildConfig(args);
    expect(config.intake.expansion_type).toBe("hs");
  });

  it("sets dry-run spreadsheet_id when env var not set", () => {
    const args = parseCliArgs([
      "run",
      "--source", "X-Y-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
      "--expansion", "hs",
      "--override-root-angle", "Test",
      "--dry-run",
    ]);

    // Don't set env var
    const originalEnv = process.env.VEDA_SPREADSHEET_ID;
    delete process.env.VEDA_SPREADSHEET_ID;

    const config = buildConfig(args);
    expect(config.spreadsheet_id).toBe("dry-run-no-spreadsheet");

    // Restore
    if (originalEnv) process.env.VEDA_SPREADSHEET_ID = originalEnv;
  });
});

// ── Dry-Run Sheets Stubs ─────────────────────────────────────────────────────

describe("createDryRunSheetsReader", () => {
  it("returns fixture data based on intake source_asset_id", async () => {
    const reader = createDryRunSheetsReader({
      source_asset_id: "357-0073-v0001-fb-9x16-60s-exv-hs-bvo-mach-vv-co-us-20260101",
      expansion_type: "hs",
      root_angle_name: "Cheat Code",
      target_variations: 2,
      edit_method: "assembly",
      directing_person: "co",
      special_instructions: null,
    });

    const rows = await reader.getRows("any", "any", "A2:U");

    expect(rows.length).toBe(1);
    expect(rows[0][0]).toBe("357");         // funnel
    expect(rows[0][1]).toBe("0073");        // script_id
    expect(rows[0][2]).toBe("Cheat Code");  // root angle name
    expect(rows[0][19]).toBe("Winner");     // classification
  });
});

describe("createDryRunSheetsWriter", () => {
  it("returns success without throwing", async () => {
    const writer = createDryRunSheetsWriter();
    const result = await writer.appendRows("id", "sheet", [["row1"], ["row2"]]);

    expect(result.updatedRows).toBe(2);
  });
});
