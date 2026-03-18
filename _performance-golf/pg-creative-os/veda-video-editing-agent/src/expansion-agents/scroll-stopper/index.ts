/**
 * Scroll Stopper Refresh Expansion Agent — replaces first 0-3s with a new opener.
 *
 * Tests 3-second view rate by swapping the attention opener while preserving
 * the full source video body from the splice point onward. Output duration
 * is approximately the same as source (replace, not prepend).
 *
 * Creative intelligence:
 * - 3-second view rate alignment — opener must grab within the feed scroll
 * - Audio transition at splice point must be seamless
 * - Replacement must not set up different expectations than the body
 *
 * Uses: ffmpeg-executor buildScrollStopperArgs()
 */

import { join } from "node:path";
import { ensureICloudSafeDir } from "../../utils/icloud-safe-dir.js";
import { buildScrollStopperArgs } from "../../utils/ffmpeg-executor.js";
import type {
  ExpansionAgent,
  ExpansionContext,
  ExpansionDeps,
  ExpansionResult,
  ExpansionValidationResult,
} from "../types.js";
import type { SubAgentResult } from "../../types/sub-agent.js";
import type { AssembledVariation } from "../../types/pipeline.js";

// ── Validation ──────────────────────────────────────────────────────────────

function validate(ctx: ExpansionContext): ExpansionValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (ctx.editOperation.type !== "scroll_stopper") {
    errors.push(`Expected edit operation type "scroll_stopper", got "${ctx.editOperation.type}"`);
    return { valid: false, errors, warnings };
  }

  const op = ctx.editOperation;

  if (!op.opener_clip_path) {
    errors.push("Scroll Stopper requires an opener clip (opener_clip_path).");
  }

  if (!op.opener_duration_seconds || op.opener_duration_seconds <= 0) {
    errors.push("opener_duration_seconds must be > 0");
  }

  if (ctx.variationCount < 1) {
    errors.push("variation_count must be >= 1");
  }

  if (!ctx.sourceFile) {
    errors.push("source_file is required");
  }

  // Duration warning: opener outside typical 0-3s scroll stopper range
  if (op.opener_duration_seconds && op.opener_duration_seconds > 5) {
    warnings.push(
      `Opener duration ${op.opener_duration_seconds}s exceeds typical scroll stopper range (0-3s). ` +
      `This may replace too much of the original opening.`,
    );
  }

  return { valid: errors.length === 0, errors, warnings };
}

// ── Execution ───────────────────────────────────────────────────────────────

async function execute(
  ctx: ExpansionContext,
  deps: ExpansionDeps,
): Promise<SubAgentResult<ExpansionResult>> {
  // Ensure output directory exists
  try { await ensureICloudSafeDir(ctx.outputDir); } catch { /* let FFmpeg surface error */ }

  if (ctx.editOperation.type !== "scroll_stopper") {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: `scroll-stopper agent received wrong operation type: ${ctx.editOperation.type}`,
      recovery_action: "halt",
      context: { step: "scroll_stopper" },
    };
  }

  const op = ctx.editOperation;
  const variations: AssembledVariation[] = [];

  for (let i = 0; i < ctx.variationCount; i++) {
    const outputFile = join(ctx.outputDir, `variation_${i + 1}.mp4`);

    const args = buildScrollStopperArgs(
      ctx.sourceFile,
      op.opener_clip_path,
      op.opener_duration_seconds,
      outputFile,
    );

    let result: { exitCode: number; stdout: string; stderr: string };
    try {
      result = await deps.commandRunner.run("ffmpeg", args);
    } catch (err) {
      return {
        status: "FAILED",
        error_category: "EDIT_ERROR",
        severity: "error",
        message: `FFmpeg execution failed: ${err instanceof Error ? err.message : String(err)}`,
        recovery_action: "halt",
        context: { step: "scroll_stopper" },
      };
    }

    if (result.exitCode !== 0) {
      return {
        status: "FAILED",
        error_category: "EDIT_ERROR",
        severity: "error",
        message: `FFmpeg exited with code ${result.exitCode}: ${result.stderr.slice(0, 500)}`,
        recovery_action: "halt",
        context: { step: "scroll_stopper" },
      };
    }

    variations.push({
      variation_index: i + 1,
      file_path: outputFile,
      duration_seconds: 0, // validated by export_manager
      resolution: "1080x1920",
      edit_summary: `Scroll stopper refresh: replaced first ${op.opener_duration_seconds}s with ${op.opener_clip_path}`,
      root_angle_preserved: true,
    });
  }

  return {
    status: "SUCCESS",
    data: {
      variations,
      durationFlags: [],
    },
  };
}

// ── Agent Definition ────────────────────────────────────────────────────────

export const scrollStopperAgent: ExpansionAgent = {
  typeCode: "ssr",
  name: "scroll-stopper",
  validate,
  execute,
};
