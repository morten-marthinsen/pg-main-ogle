/**
 * ffmpeg-executor — Shared FFmpeg command builders and execution loop.
 *
 * Pure utility functions that build FFmpeg filter_complex argument arrays
 * for each edit operation type, plus a variation-loop executor used by
 * integration tests.
 *
 * Expansion agents import individual build*Args functions.
 * The assemble() function orchestrates multi-variation FFmpeg execution.
 *
 * Uses CommandRunner abstraction so FFmpeg commands can be tested without
 * actually executing them.
 */

import type {
  CommandRunner,
  EditOperation,
  FfmpegExecutorInput,
  FfmpegExecutorOutput,
  AssembledVariation,
  CutPlan,
} from "../types/pipeline.js";
import type { SubAgentResult } from "../types/sub-agent.js";

import { join } from "node:path";

// ── FFmpeg Command Builders ─────────────────────────────────────────────────

/**
 * Build the FFmpeg filter_complex for a duration cutdown.
 * Concatenates: hook + selected body segments + CTA.
 *
 * Each segment becomes a trim+setpts filter, then all are concatenated.
 */
export function buildDurationCutdownArgs(
  sourceFile: string,
  cutPlan: CutPlan,
  outputFile: string,
): string[] {
  const segments = cutPlan.segments;
  const filterParts: string[] = [];
  const concatInputs: string[] = [];

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    // Trim video and audio for this segment
    filterParts.push(
      `[0:v]trim=start=${seg.start_time}:end=${seg.end_time},setpts=PTS-STARTPTS[v${i}]`,
    );
    filterParts.push(
      `[0:a]atrim=start=${seg.start_time}:end=${seg.end_time},asetpts=PTS-STARTPTS[a${i}]`,
    );
    concatInputs.push(`[v${i}][a${i}]`);
  }

  // Concatenate all segments
  const concatFilter = `${concatInputs.join("")}concat=n=${segments.length}:v=1:a=1[outv][outa]`;
  filterParts.push(concatFilter);

  return [
    "-i", sourceFile,
    "-filter_complex", filterParts.join(";"),
    "-map", "[outv]",
    "-map", "[outa]",
    "-c:v", "libx264",
    "-c:a", "aac",
    "-y",
    outputFile,
  ];
}

/**
 * Build FFmpeg args for a hook stack.
 * PREPENDS a new hook clip on the front of the FULL source video.
 * Nothing is removed. Output is LONGER than source (source + hook).
 *
 * When sourceDims is provided, the hook clip is scaled to match the source
 * dimensions before concat (FFmpeg concat requires matching dimensions).
 */
export function buildHookStackArgs(
  sourceFile: string,
  hookClipPath: string,
  outputFile: string,
  sourceDims?: { width: number; height: number },
): string[] {
  // If source dims provided, scale hook to match; otherwise pass through.
  // setsar=1 normalizes SAR after scale+pad so concat doesn't reject SAR mismatch.
  const hookVideoFilter = sourceDims
    ? `[0:v]scale=${sourceDims.width}:${sourceDims.height}:force_original_aspect_ratio=decrease,pad=${sourceDims.width}:${sourceDims.height}:(ow-iw)/2:(oh-ih)/2,setsar=1,setpts=PTS-STARTPTS[hookv]`
    : `[0:v]setpts=PTS-STARTPTS[hookv]`;

  return [
    "-i", hookClipPath,
    "-i", sourceFile,
    "-filter_complex",
    [
      // Hook clip (scaled to source dims if needed, full duration)
      hookVideoFilter,
      `[0:a]asetpts=PTS-STARTPTS[hooka]`,
      // Full source video (no trimming — entire video preserved)
      `[1:v]setpts=PTS-STARTPTS[srcv]`,
      `[1:a]asetpts=PTS-STARTPTS[srca]`,
      // Concatenate: hook first, then full source
      `[hookv][hooka][srcv][srca]concat=n=2:v=1:a=1[outv][outa]`,
    ].join(";"),
    "-map", "[outv]",
    "-map", "[outa]",
    "-c:v", "libx264",
    "-c:a", "aac",
    "-y",
    outputFile,
  ];
}

/**
 * Build FFmpeg args for a scroll stopper refresh.
 * REPLACES the first N seconds (typically 0-3s) with a new opener.
 * Output duration is the same as source (replace, not prepend).
 */
export function buildScrollStopperArgs(
  sourceFile: string,
  openerClipPath: string,
  openerDuration: number,
  outputFile: string,
): string[] {
  return [
    "-i", openerClipPath,
    "-i", sourceFile,
    "-filter_complex",
    [
      // New opener clip (full duration)
      `[0:v]setpts=PTS-STARTPTS[openerv]`,
      `[0:a]asetpts=PTS-STARTPTS[openera]`,
      // Source body (after the replaced opener segment)
      `[1:v]trim=start=${openerDuration},setpts=PTS-STARTPTS[bodyv]`,
      `[1:a]atrim=start=${openerDuration},asetpts=PTS-STARTPTS[bodya]`,
      // Concatenate: new opener + remaining source body
      `[openerv][openera][bodyv][bodya]concat=n=2:v=1:a=1[outv][outa]`,
    ].join(";"),
    "-map", "[outv]",
    "-map", "[outa]",
    "-c:v", "libx264",
    "-c:a", "aac",
    "-y",
    outputFile,
  ];
}

/**
 * Build FFmpeg args for an environment swap.
 * Overlays the source content on a new background.
 *
 * Note: Real environment swaps may require chroma key or AI segmentation.
 * This builds the basic overlay command structure.
 */
export function buildEnvironmentSwapArgs(
  sourceFile: string,
  environmentClipPath: string,
  outputFile: string,
): string[] {
  return [
    "-i", environmentClipPath,
    "-i", sourceFile,
    "-filter_complex",
    "[0:v][1:v]overlay=0:0:shortest=1[outv]",
    "-map", "[outv]",
    "-map", "1:a",
    "-c:v", "libx264",
    "-c:a", "aac",
    "-y",
    outputFile,
  ];
}

/**
 * Build FFmpeg args for an ad format restructure.
 * Scales/crops to new dimensions and trims to target duration.
 */
export function buildAdFormatArgs(
  sourceFile: string,
  targetDimensions: string,
  targetDuration: number,
  outputFile: string,
): string[] {
  // Parse dimensions (e.g., "9x16" → need actual pixel dimensions)
  const dimMap: Record<string, [number, number]> = {
    "9x16": [1080, 1920],
    "16x9": [1920, 1080],
    "1080x1350": [1080, 1350],
    "1080x1920": [1080, 1920],
    "1920x1080": [1920, 1080],
  };

  const [w, h] = dimMap[targetDimensions] ?? [1080, 1920];

  return [
    "-i", sourceFile,
    "-vf", `scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2`,
    "-t", String(targetDuration),
    "-c:v", "libx264",
    "-c:a", "aac",
    "-y",
    outputFile,
  ];
}

// ── Edit Operation Router ───────────────────────────────────────────────────

/**
 * Build FFmpeg args for a given edit operation.
 */
export function buildEditArgs(
  sourceFile: string,
  operation: EditOperation,
  outputFile: string,
  sourceDims?: { width: number; height: number },
): string[] {
  switch (operation.type) {
    case "duration_cutdown":
      return buildDurationCutdownArgs(sourceFile, operation.cut_plan, outputFile);
    case "hook_stack":
      return buildHookStackArgs(sourceFile, operation.hook_clip_path, outputFile, sourceDims);
    case "scroll_stopper":
      return buildScrollStopperArgs(sourceFile, operation.opener_clip_path, operation.opener_duration_seconds, outputFile);
    case "environment_swap":
      return buildEnvironmentSwapArgs(sourceFile, operation.environment_clip_path, outputFile);
    case "ad_format":
      return buildAdFormatArgs(sourceFile, operation.target_dimensions, operation.target_duration_seconds, outputFile);
    default:
      throw new Error(`Unknown edit operation type: ${(operation as any).type}`);
  }
}

// ── Main Entry Point ────────────────────────────────────────────────────────

/**
 * Execute FFmpeg editing operations across multiple variations.
 *
 * For each variation, builds the appropriate FFmpeg command and executes it
 * via the CommandRunner abstraction. Used by integration tests to validate
 * real FFmpeg output.
 */
export async function assemble(
  input: FfmpegExecutorInput,
  runner: CommandRunner,
): Promise<SubAgentResult<FfmpegExecutorOutput>> {
  // Validate inputs
  if (!input.source_file) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "source_file is required",
      recovery_action: "halt",
      context: { step: "ffmpeg_executor" },
    };
  }

  if (!input.operation) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "operation is required",
      recovery_action: "halt",
      context: { step: "ffmpeg_executor" },
    };
  }

  if (input.variation_count < 1) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "variation_count must be >= 1",
      recovery_action: "halt",
      context: { step: "ffmpeg_executor" },
    };
  }

  const variations: AssembledVariation[] = [];
  const durationFlags: string[] = [];

  for (let i = 0; i < input.variation_count; i++) {
    const outputFile = join(input.output_dir, `variation_${i + 1}.mp4`);

    // Per-variation hook override: use per_variation_hooks[i] if available
    let operation = input.operation;
    if (input.operation.type === "hook_stack" && input.operation.per_variation_hooks?.[i]) {
      operation = {
        ...input.operation,
        hook_clip_path: input.operation.per_variation_hooks[i].hook_clip_path,
        hook_duration_seconds: input.operation.per_variation_hooks[i].hook_duration_seconds,
      };
    }

    let args: string[];
    try {
      args = buildEditArgs(input.source_file, operation, outputFile, input.source_dims);
    } catch (err) {
      return {
        status: "FAILED",
        error_category: "EDIT_ERROR",
        severity: "error",
        message: `Failed to build edit command: ${err instanceof Error ? err.message : String(err)}`,
        recovery_action: "halt",
        context: { step: "ffmpeg_executor" },
      };
    }

    // Execute FFmpeg
    let result: { exitCode: number; stdout: string; stderr: string };
    try {
      result = await runner.run("ffmpeg", args);
    } catch (err) {
      return {
        status: "FAILED",
        error_category: "EDIT_ERROR",
        severity: "error",
        message: `FFmpeg execution failed: ${err instanceof Error ? err.message : String(err)}`,
        recovery_action: "halt",
        context: { step: "ffmpeg_executor" },
      };
    }

    if (result.exitCode !== 0) {
      return {
        status: "FAILED",
        error_category: "EDIT_ERROR",
        severity: "error",
        message: `FFmpeg exited with code ${result.exitCode}: ${result.stderr.slice(0, 500)}`,
        recovery_action: "halt",
        context: { step: "ffmpeg_executor" },
      };
    }

    // Calculate expected duration based on operation type
    let expectedDuration = 0;
    let editSummary = "";

    if (operation.type === "duration_cutdown") {
      expectedDuration = operation.cut_plan.actual_duration;
      const segDescs = operation.cut_plan.segments
        .map((s) => `${s.type}(${s.start_time}-${s.end_time}s)`)
        .join(" + ");
      editSummary = `Duration cutdown: ${segDescs}`;

      if (operation.cut_plan.duration_flag) {
        durationFlags.push(
          `variation_${i + 1}: ${operation.cut_plan.flag_reason}`,
        );
      }
    } else if (operation.type === "hook_stack") {
      editSummary = `Hook stack: prepended ${operation.hook_clip_path} on front of full source`;
    } else if (operation.type === "scroll_stopper") {
      editSummary = `Scroll stopper refresh: replaced first ${operation.opener_duration_seconds}s`;
    } else if (operation.type === "environment_swap") {
      editSummary = `Environment swap: new background from ${operation.environment_clip_path}`;
    } else if (operation.type === "ad_format") {
      expectedDuration = operation.target_duration_seconds;
      editSummary = `Ad format: rescaled to ${operation.target_dimensions}, duration ${operation.target_duration_seconds}s`;
    }

    variations.push({
      variation_index: i + 1,
      file_path: outputFile,
      duration_seconds: expectedDuration,
      resolution: "1080x1920", // Will be validated by export_manager
      edit_summary: editSummary,
      root_angle_preserved: true, // Self-assessment: assembly edits preserve root angle
    });
  }

  return {
    status: "SUCCESS",
    data: {
      variations,
      duration_flags: durationFlags,
    },
  };
}
