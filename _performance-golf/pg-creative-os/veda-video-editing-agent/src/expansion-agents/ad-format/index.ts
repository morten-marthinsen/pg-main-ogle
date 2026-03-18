/**
 * Ad Format Expansion Agent — restructures content format (dimensions + duration).
 *
 * v1 (current): FFmpeg scale/crop to new aspect ratio + trim to target duration.
 * Future: internal skills registry for sub-types (podcast, dimension-convert, duration-adapt).
 *
 * Creative intelligence:
 * - Each format has different structural expectations (Podcast = longer, Slice & Dice = short cuts)
 * - Root angle must survive format translation
 * - Podcast skill (future): intro music, visual template, audio mastering
 *
 * Uses: ffmpeg-executor buildAdFormatArgs()
 */

import { join } from "node:path";
import { ensureICloudSafeDir } from "../../utils/icloud-safe-dir.js";
import { buildAdFormatArgs } from "../../utils/ffmpeg-executor.js";
import type {
  ExpansionAgent,
  ExpansionContext,
  ExpansionDeps,
  ExpansionResult,
  ExpansionValidationResult,
} from "../types.js";
import type { SubAgentResult } from "../../types/sub-agent.js";
import type { AssembledVariation } from "../../types/pipeline.js";

/** Known dimension codes and their pixel equivalents. */
const VALID_DIMENSIONS = new Set(["9x16", "16x9", "1080x1350", "1080x1920", "1920x1080"]);

// ── Validation ──────────────────────────────────────────────────────────────

function validate(ctx: ExpansionContext): ExpansionValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (ctx.editOperation.type !== "ad_format") {
    errors.push(`Expected edit operation type "ad_format", got "${ctx.editOperation.type}"`);
    return { valid: false, errors, warnings };
  }

  const op = ctx.editOperation;

  if (!op.target_dimensions) {
    errors.push("Ad format requires target_dimensions (e.g., '9x16', '16x9').");
  } else if (!VALID_DIMENSIONS.has(op.target_dimensions)) {
    warnings.push(
      `Unknown target_dimensions "${op.target_dimensions}" — will fall back to 1080x1920.`,
    );
  }

  if (!op.target_duration_seconds || op.target_duration_seconds <= 0) {
    errors.push("target_duration_seconds must be > 0.");
  }

  if (ctx.variationCount < 1) {
    errors.push("variation_count must be >= 1");
  }

  if (!ctx.sourceFile) {
    errors.push("source_file is required");
  }

  return { valid: errors.length === 0, errors, warnings };
}

// ── Execution ───────────────────────────────────────────────────────────────

async function execute(
  ctx: ExpansionContext,
  deps: ExpansionDeps,
): Promise<SubAgentResult<ExpansionResult>> {
  try { await ensureICloudSafeDir(ctx.outputDir); } catch { /* let FFmpeg surface error */ }

  if (ctx.editOperation.type !== "ad_format") {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: `ad-format agent received wrong operation type: ${ctx.editOperation.type}`,
      recovery_action: "halt",
      context: { step: "ad_format" },
    };
  }

  const op = ctx.editOperation;
  const variations: AssembledVariation[] = [];

  for (let i = 0; i < ctx.variationCount; i++) {
    const outputFile = join(ctx.outputDir, `variation_${i + 1}.mp4`);

    const args = buildAdFormatArgs(
      ctx.sourceFile,
      op.target_dimensions,
      op.target_duration_seconds,
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
        context: { step: "ad_format" },
      };
    }

    if (result.exitCode !== 0) {
      return {
        status: "FAILED",
        error_category: "EDIT_ERROR",
        severity: "error",
        message: `FFmpeg exited with code ${result.exitCode}: ${result.stderr.slice(0, 500)}`,
        recovery_action: "halt",
        context: { step: "ad_format" },
      };
    }

    variations.push({
      variation_index: i + 1,
      file_path: outputFile,
      duration_seconds: op.target_duration_seconds,
      resolution: op.target_dimensions,
      edit_summary: `Ad format: rescaled to ${op.target_dimensions}, duration ${op.target_duration_seconds}s`,
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

export const adFormatAgent: ExpansionAgent = {
  typeCode: "af",
  name: "ad-format",
  validate,
  execute,
};
