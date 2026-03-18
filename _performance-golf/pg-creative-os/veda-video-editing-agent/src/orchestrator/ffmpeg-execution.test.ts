/**
 * Real FFmpeg execution tests.
 *
 * These tests generate actual video files using FFmpeg, run edit operations
 * with a real CommandRunner, and validate output with real FFprobe.
 *
 * Proves that the FFmpeg filter_complex strings built by assembly_editor
 * produce valid output — not just syntactically correct args, but working
 * video files.
 *
 * Requires: FFmpeg + FFprobe installed (brew install ffmpeg).
 *
 * Note: Template renderer tests (drawtext-based) require FFmpeg compiled
 * with --enable-libfreetype. The default Homebrew formula does NOT include
 * this. Tests are conditionally skipped when drawtext is unavailable.
 * For production, install via: brew install ffmpeg --build-from-source
 * (with freetype2 dependency).
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mkdtemp, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { tmpdir } from "node:os";

import { createRealCommandRunner, createRealFileProber } from "../utils/real-runners.js";
import { assemble } from "../utils/ffmpeg-executor.js";
import { render as renderTemplate } from "../sub-agents/template-renderer/index.js";
import { validateExports, validateFile } from "../sub-agents/export-manager/index.js";
import type {
  EditOperation,
  ExportTargetSpec,
  TemplateParams,
} from "../types/pipeline.js";

// ── Setup ───────────────────────────────────────────────────────────────────

const runner = createRealCommandRunner();
const prober = createRealFileProber();

// Check drawtext at module level so it.skipIf evaluates correctly at collection time
const hasDrawtext = (() => {
  try {
    const output = execFileSync("ffmpeg", ["-filters"], { maxBuffer: 50 * 1024 * 1024 }).toString();
    return output.includes("drawtext");
  } catch {
    return false;
  }
})();

let tmpDir: string;
let sourceVideo: string;
let hookClip: string;
let openerClip: string;
let envClip: string;

/**
 * Generate a test video using FFmpeg's lavfi source generators.
 * Uses testsrc2 (no drawtext dependency) with colored backgrounds
 * and a sine wave audio track.
 */
async function generateTestVideo(
  outputPath: string,
  duration: number,
  width: number,
  height: number,
  color: string = "blue",
  audioFreq: number = 440,
): Promise<void> {
  const result = await runner.run("ffmpeg", [
    "-f", "lavfi",
    "-i", `color=c=${color}:s=${width}x${height}:d=${duration}:r=30`,
    "-f", "lavfi",
    "-i", `sine=frequency=${audioFreq}:duration=${duration}`,
    "-c:v", "libx264",
    "-preset", "ultrafast",
    "-c:a", "aac",
    "-shortest",
    "-y",
    outputPath,
  ]);

  if (result.exitCode !== 0) {
    throw new Error(`Failed to generate test video: ${result.stderr.slice(-500)}`);
  }
}

beforeAll(async () => {
  tmpDir = await mkdtemp(join(tmpdir(), "veda-ffmpeg-test-"));

  sourceVideo = join(tmpDir, "source.mp4");
  hookClip = join(tmpDir, "hook.mp4");
  openerClip = join(tmpDir, "opener.mp4");
  envClip = join(tmpDir, "environment.mp4");

  await Promise.all([
    generateTestVideo(sourceVideo, 10, 1080, 1920, "blue", 440),
    generateTestVideo(hookClip, 3, 1080, 1920, "red", 880),
    generateTestVideo(openerClip, 2, 1080, 1920, "green", 660),
    generateTestVideo(envClip, 10, 1080, 1920, "purple", 330),
  ]);
}, 120_000);

afterAll(async () => {
  if (tmpDir) {
    await rm(tmpDir, { recursive: true, force: true });
  }
});

// ── Helpers ─────────────────────────────────────────────────────────────────

const VERTICAL_SPEC: ExportTargetSpec = {
  format: "mp4",
  codec: "h264",
  width: 1080,
  height: 1920,
  target_duration_seconds: 10,
  duration_tolerance_seconds: 3,
  min_file_size_mb: 0.001, // Test videos (solid color) are tiny — relax min
};

// ── Source Video Verification ───────────────────────────────────────────────

describe("Real FFmpeg execution", () => {
  describe("source video generation", () => {
    it("generates valid source video", async () => {
      const probe = await prober.probe(sourceVideo);

      expect(probe.format).toBe("mp4");
      expect(probe.codec).toBe("h264");
      expect(probe.width).toBe(1080);
      expect(probe.height).toBe(1920);
      expect(probe.duration_seconds).toBeCloseTo(10, 0);
      expect(probe.file_size_bytes).toBeGreaterThan(0);
    }, 10_000);

    it("generates valid hook clip (3s, red)", async () => {
      const probe = await prober.probe(hookClip);

      expect(probe.codec).toBe("h264");
      expect(probe.width).toBe(1080);
      expect(probe.height).toBe(1920);
      expect(probe.duration_seconds).toBeCloseTo(3, 0);
    }, 10_000);

    it("generates valid opener clip (2s, green)", async () => {
      const probe = await prober.probe(openerClip);

      expect(probe.duration_seconds).toBeCloseTo(2, 0);
    }, 10_000);
  });

  // ── Assembly Editor — All 5 Operations ──────────────────────────────────

  describe("assembly_editor — hook_stack", () => {
    it("produces valid video with stacked hook (prepend, output longer)", async () => {
      const outputDir = join(tmpDir, "hook_stack");
      await runner.run("mkdir", ["-p", outputDir]);

      const result = await assemble(
        {
          source_file: sourceVideo,
          operation: {
            type: "hook_stack",
            hook_clip_path: hookClip,
            hook_duration_seconds: 3,
          },
          output_dir: outputDir,
          variation_count: 1,
          root_angle_name: "Test Angle",
        },
        runner,
      );

      expect(result.status).toBe("SUCCESS");
      if (result.status !== "SUCCESS") return;

      const outputFile = result.data.variations[0].file_path;
      const probe = await prober.probe(outputFile);

      expect(probe.format).toBe("mp4");
      expect(probe.codec).toBe("h264");
      expect(probe.width).toBe(1080);
      expect(probe.height).toBe(1920);
      // hook(3s) + FULL source(10s) = ~13s (output is LONGER than source)
      expect(probe.duration_seconds).toBeCloseTo(13, 0);
    }, 30_000);

    it("scales mismatched hook dims to source dims (16:9 hook + 9:16 source)", async () => {
      // Generate a 16:9 landscape hook clip (dimension mismatch with 9:16 source)
      const landscapeHook = join(tmpDir, "hook_landscape.mp4");
      await generateTestVideo(landscapeHook, 3, 1920, 1080, "yellow", 550);

      const outputDir = join(tmpDir, "hook_stack_mismatch");
      await runner.run("mkdir", ["-p", outputDir]);

      const result = await assemble(
        {
          source_file: sourceVideo,
          operation: {
            type: "hook_stack",
            hook_clip_path: landscapeHook,
            hook_duration_seconds: 3,
          },
          output_dir: outputDir,
          variation_count: 1,
          root_angle_name: "Test Angle",
          source_dims: { width: 1080, height: 1920 },
        },
        runner,
      );

      expect(result.status).toBe("SUCCESS");
      if (result.status !== "SUCCESS") return;

      const outputFile = result.data.variations[0].file_path;
      const probe = await prober.probe(outputFile);

      // Output must match SOURCE dimensions (9:16), not hook dims
      expect(probe.width).toBe(1080);
      expect(probe.height).toBe(1920);
      // hook(3s) + source(10s) = ~13s
      expect(probe.duration_seconds).toBeCloseTo(13, 0);
    }, 30_000);
  });

  describe("assembly_editor — duration_cutdown", () => {
    it("produces shorter video from selected segments", async () => {
      const outputDir = join(tmpDir, "duration_cutdown");
      await runner.run("mkdir", ["-p", outputDir]);

      const result = await assemble(
        {
          source_file: sourceVideo,
          operation: {
            type: "duration_cutdown",
            cut_plan: {
              target_duration: 6,
              actual_duration: 6,
              root_angle_preserved: true,
              duration_flag: false,
              segments: [
                { start_time: 0, end_time: 3, type: "hook", transcript_text: "Opening hook" },
                { start_time: 5, end_time: 8, type: "body", transcript_text: "Key content" },
              ],
            },
          },
          output_dir: outputDir,
          variation_count: 1,
          root_angle_name: "Test Angle",
        },
        runner,
      );

      expect(result.status).toBe("SUCCESS");
      if (result.status !== "SUCCESS") return;

      const probe = await prober.probe(result.data.variations[0].file_path);

      expect(probe.format).toBe("mp4");
      expect(probe.codec).toBe("h264");
      // 3s + 3s = ~6s
      expect(probe.duration_seconds).toBeCloseTo(6, 0);
    }, 30_000);
  });

  describe("assembly_editor — scroll_stopper", () => {
    it("replaces first 2s with opener clip", async () => {
      const outputDir = join(tmpDir, "scroll_stopper");
      await runner.run("mkdir", ["-p", outputDir]);

      const result = await assemble(
        {
          source_file: sourceVideo,
          operation: {
            type: "scroll_stopper",
            opener_clip_path: openerClip,
            opener_duration_seconds: 2,
          },
          output_dir: outputDir,
          variation_count: 1,
          root_angle_name: "Test Angle",
        },
        runner,
      );

      expect(result.status).toBe("SUCCESS");
      if (result.status !== "SUCCESS") return;

      const probe = await prober.probe(result.data.variations[0].file_path);

      expect(probe.format).toBe("mp4");
      expect(probe.codec).toBe("h264");
      // opener(2s) + body after 2s = ~10s
      expect(probe.duration_seconds).toBeCloseTo(10, 0);
    }, 30_000);
  });

  describe("assembly_editor — environment_swap", () => {
    it("overlays source on new environment background", async () => {
      const outputDir = join(tmpDir, "env_swap");
      await runner.run("mkdir", ["-p", outputDir]);

      const result = await assemble(
        {
          source_file: sourceVideo,
          operation: {
            type: "environment_swap",
            environment_clip_path: envClip,
          },
          output_dir: outputDir,
          variation_count: 1,
          root_angle_name: "Test Angle",
        },
        runner,
      );

      expect(result.status).toBe("SUCCESS");
      if (result.status !== "SUCCESS") return;

      const probe = await prober.probe(result.data.variations[0].file_path);

      expect(probe.format).toBe("mp4");
      expect(probe.codec).toBe("h264");
      expect(probe.width).toBe(1080);
      expect(probe.height).toBe(1920);
    }, 30_000);
  });

  describe("assembly_editor — ad_format", () => {
    it("rescales 9x16 → 16x9 and trims to 6s", async () => {
      const outputDir = join(tmpDir, "ad_format");
      await runner.run("mkdir", ["-p", outputDir]);

      const result = await assemble(
        {
          source_file: sourceVideo,
          operation: {
            type: "ad_format",
            target_dimensions: "16x9",
            target_duration_seconds: 6,
          },
          output_dir: outputDir,
          variation_count: 1,
          root_angle_name: "Test Angle",
        },
        runner,
      );

      expect(result.status).toBe("SUCCESS");
      if (result.status !== "SUCCESS") return;

      const probe = await prober.probe(result.data.variations[0].file_path);

      expect(probe.format).toBe("mp4");
      expect(probe.codec).toBe("h264");
      expect(probe.width).toBe(1920);
      expect(probe.height).toBe(1080);
      expect(probe.duration_seconds).toBeCloseTo(6, 0);
    }, 30_000);
  });

  // ── Multiple Variations ─────────────────────────────────────────────────

  describe("assembly_editor — multiple variations", () => {
    it("produces 3 separate valid output files", async () => {
      const outputDir = join(tmpDir, "multi_variation");
      await runner.run("mkdir", ["-p", outputDir]);

      const result = await assemble(
        {
          source_file: sourceVideo,
          operation: {
            type: "hook_stack",
            hook_clip_path: hookClip,
            hook_duration_seconds: 3,
          },
          output_dir: outputDir,
          variation_count: 3,
          root_angle_name: "Test Angle",
        },
        runner,
      );

      expect(result.status).toBe("SUCCESS");
      if (result.status !== "SUCCESS") return;

      expect(result.data.variations).toHaveLength(3);

      for (const variation of result.data.variations) {
        const probe = await prober.probe(variation.file_path);
        expect(probe.format).toBe("mp4");
        expect(probe.codec).toBe("h264");
        expect(probe.width).toBe(1080);
        expect(probe.height).toBe(1920);
      }
    }, 60_000);
  });

  // ── Export Manager — Real Validation ────────────────────────────────────

  describe("export_manager — real FFprobe validation", () => {
    it("validates hook_stack output passes VERTICAL_SPEC", async () => {
      const outputDir = join(tmpDir, "export_val");
      await runner.run("mkdir", ["-p", outputDir]);

      const assemblyResult = await assemble(
        {
          source_file: sourceVideo,
          operation: {
            type: "hook_stack",
            hook_clip_path: hookClip,
            hook_duration_seconds: 3,
          },
          output_dir: outputDir,
          variation_count: 1,
          root_angle_name: "Test Angle",
        },
        runner,
      );

      expect(assemblyResult.status).toBe("SUCCESS");
      if (assemblyResult.status !== "SUCCESS") return;

      // Hook stack output is LONGER: ~13s (3s hook + 10s source)
      const hookStackSpec = {
        ...VERTICAL_SPEC,
        target_duration_seconds: 13,
        duration_tolerance_seconds: 5,
      };

      const exportResult = await validateExports(
        {
          files: [assemblyResult.data.variations[0].file_path],
          target_spec: hookStackSpec,
        },
        prober,
      );

      expect(exportResult.status).toBe("SUCCESS");
      if (exportResult.status !== "SUCCESS") return;

      expect(exportResult.data.all_passed).toBe(true);
      const r = exportResult.data.file_results[0];
      expect(r.format_ok).toBe(true);
      expect(r.codec_ok).toBe(true);
      expect(r.resolution_ok).toBe(true);
      expect(r.duration_ok).toBe(true);
    }, 30_000);

    it("rejects file with wrong resolution spec", async () => {
      // Source video is 1080x1920 — spec expects 1920x1080
      const wrongSpec: ExportTargetSpec = {
        format: "mp4",
        codec: "h264",
        width: 1920,
        height: 1080,
      };

      const exportResult = await validateExports(
        { files: [sourceVideo], target_spec: wrongSpec },
        prober,
      );

      expect(exportResult.status).toBe("FAILED");
    }, 10_000);

    it("rejects file with wrong duration spec", async () => {
      const strictSpec: ExportTargetSpec = {
        ...VERTICAL_SPEC,
        target_duration_seconds: 30,
        duration_tolerance_seconds: 2,
      };

      const exportResult = await validateExports(
        { files: [sourceVideo], target_spec: strictSpec },
        prober,
      );

      expect(exportResult.status).toBe("FAILED");
    }, 10_000);
  });

  // ── Template Renderer (requires drawtext/libfreetype) ──────────────────

  describe("template_renderer (requires libfreetype)", () => {
    it.skipIf(!hasDrawtext)("lower_third — burns text overlay onto video", async () => {
      const outputFile = join(tmpDir, "lower_third_output.mp4");

      const result = await renderTemplate(
        {
          source_file: sourceVideo,
          templates: [{
            type: "lower_third",
            headline: "Limited Time Offer",
            duration_seconds: 4,
            show_at_seconds: 2,
          }],
          output_file: outputFile,
          resolution: { width: 1080, height: 1920 },
        },
        runner,
      );

      expect(result.status).toBe("SUCCESS");
      if (result.status !== "SUCCESS") return;

      const probe = await prober.probe(outputFile);
      expect(probe.format).toBe("mp4");
      expect(probe.duration_seconds).toBeCloseTo(10, 0);
    }, 30_000);

    it.skipIf(!hasDrawtext)("caption_overlay — burns timed captions", async () => {
      const outputFile = join(tmpDir, "caption_output.mp4");

      const result = await renderTemplate(
        {
          source_file: sourceVideo,
          templates: [{
            type: "caption_overlay",
            caption_style: "bold",
            transcript_segments: [
              { start_time: 0, end_time: 3, text: "The secret to longer drives" },
              { start_time: 3, end_time: 7, text: "is something most golfers miss" },
            ],
          }],
          output_file: outputFile,
          resolution: { width: 1080, height: 1920 },
        },
        runner,
      );

      expect(result.status).toBe("SUCCESS");
    }, 30_000);

    it.skipIf(!hasDrawtext)("cta_end_card — appends card extending duration", async () => {
      const outputFile = join(tmpDir, "cta_output.mp4");

      const result = await renderTemplate(
        {
          source_file: sourceVideo,
          templates: [{
            type: "cta_end_card",
            cta_text: "Take The Quiz Now",
            duration_seconds: 5,
          }],
          output_file: outputFile,
          resolution: { width: 1080, height: 1920 },
        },
        runner,
      );

      expect(result.status).toBe("SUCCESS");
      if (result.status !== "SUCCESS") return;

      const probe = await prober.probe(outputFile);
      // Source (10s) + CTA (5s) = ~15s
      expect(probe.duration_seconds).toBeCloseTo(15, 1);
    }, 30_000);

    it.skipIf(!hasDrawtext)("copy_framework — overlays text slides", async () => {
      const outputFile = join(tmpDir, "framework_output.mp4");

      const result = await renderTemplate(
        {
          source_file: sourceVideo,
          templates: [{
            type: "copy_framework",
            framework_text: ["Problem: Most golfers slice", "Solution: The Cheat Code Method"],
            display_duration_seconds: 3,
          }],
          output_file: outputFile,
          resolution: { width: 1080, height: 1920 },
        },
        runner,
      );

      expect(result.status).toBe("SUCCESS");
    }, 30_000);

    it.skipIf(!hasDrawtext)("full pipeline: edit → template → validate", async () => {
      const outputDir = join(tmpDir, "full_pipeline");
      await runner.run("mkdir", ["-p", outputDir]);

      // Assembly edit
      const assemblyResult = await assemble(
        {
          source_file: sourceVideo,
          operation: {
            type: "hook_stack",
            hook_clip_path: hookClip,
            hook_duration_seconds: 3,
          },
          output_dir: outputDir,
          variation_count: 1,
          root_angle_name: "Cheat Code",
        },
        runner,
      );
      expect(assemblyResult.status).toBe("SUCCESS");
      if (assemblyResult.status !== "SUCCESS") return;

      // Template rendering (lower third + CTA)
      const renderedFile = join(outputDir, "rendered.mp4");
      const renderResult = await renderTemplate(
        {
          source_file: assemblyResult.data.variations[0].file_path,
          templates: [
            { type: "lower_third", headline: "Cheat Code", duration_seconds: 4, show_at_seconds: 2 },
            { type: "cta_end_card", cta_text: "Take The Quiz", duration_seconds: 5 },
          ],
          output_file: renderedFile,
          resolution: { width: 1080, height: 1920 },
        },
        runner,
      );
      expect(renderResult.status).toBe("SUCCESS");
      if (renderResult.status !== "SUCCESS") return;

      // Export validation — hook stack(13s) + CTA end card(5s) = ~18s
      const exportResult = await validateExports(
        {
          files: [renderedFile],
          target_spec: {
            ...VERTICAL_SPEC,
            target_duration_seconds: 18,
            duration_tolerance_seconds: 5,
          },
        },
        prober,
      );

      expect(exportResult.status).toBe("SUCCESS");
      if (exportResult.status !== "SUCCESS") return;
      expect(exportResult.data.all_passed).toBe(true);
    }, 60_000);
  });
});
