/**
 * Duration Cutdown Expansion Agent — reassembles source into shorter/longer versions.
 *
 * Takes a CutPlan (segments with time ranges) and concatenates them via FFmpeg
 * filter_complex. Each segment is trimmed independently and rejoined, allowing
 * non-chronological reassembly (body segments can come from anywhere in source).
 *
 * Creative intelligence:
 * - Isolation principle: opening hook IDENTICAL across all variations — only body length varies
 * - Segments selected by persuasive weight relative to root angle, NOT chronological order
 * - CTA end card preserved (typically 5-8s)
 * - Duration flag: warns when hook > 50% of target duration
 *
 * Uses: ffmpeg-executor buildDurationCutdownArgs()
 */

import { join } from "node:path";
import { ensureICloudSafeDir } from "../../utils/icloud-safe-dir.js";
import { buildDurationCutdownArgs } from "../../utils/ffmpeg-executor.js";
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

  if (ctx.editOperation.type !== "duration_cutdown") {
    errors.push(`Expected edit operation type "duration_cutdown", got "${ctx.editOperation.type}"`);
    return { valid: false, errors, warnings };
  }

  const op = ctx.editOperation;

  if (!op.cut_plan) {
    errors.push("Duration cutdown requires a cut_plan.");
    return { valid: false, errors, warnings };
  }

  const plan = op.cut_plan;

  if (!plan.segments || plan.segments.length === 0) {
    errors.push("cut_plan must contain at least one segment.");
  }

  // Validate each segment has valid time ranges
  for (let i = 0; i < (plan.segments?.length ?? 0); i++) {
    const seg = plan.segments[i];
    if (seg.start_time < 0) {
      errors.push(`Segment ${i}: start_time cannot be negative (${seg.start_time}).`);
    }
    if (seg.end_time <= seg.start_time) {
      errors.push(`Segment ${i}: end_time (${seg.end_time}) must be > start_time (${seg.start_time}).`);
    }
  }

  if (plan.target_duration <= 0) {
    errors.push("cut_plan.target_duration must be > 0.");
  }

  if (ctx.variationCount < 1) {
    errors.push("variation_count must be >= 1");
  }

  if (!ctx.sourceFile) {
    errors.push("source_file is required");
  }

  // Duration flag warning: hook segment occupies > 50% of target duration
  if (plan.duration_flag) {
    warnings.push(
      plan.flag_reason ??
        `Duration flag: hook may dominate the target duration (${plan.target_duration}s).`,
    );
  }

  // Isolation principle check: verify hook segment exists
  const hasHook = plan.segments?.some((s) => s.type === "hook");
  if (!hasHook && plan.segments?.length > 0) {
    warnings.push(
      "No hook segment in cut plan. Isolation principle requires identical hooks across variations.",
    );
  }

  return { valid: errors.length === 0, errors, warnings };
}

// ── Execution ───────────────────────────────────────────────────────────────

async function execute(
  ctx: ExpansionContext,
  deps: ExpansionDeps,
): Promise<SubAgentResult<ExpansionResult>> {
  try { await ensureICloudSafeDir(ctx.outputDir); } catch { /* let FFmpeg surface error */ }

  if (ctx.editOperation.type !== "duration_cutdown") {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: `duration agent received wrong operation type: ${ctx.editOperation.type}`,
      recovery_action: "halt",
      context: { step: "duration_cutdown" },
    };
  }

  const op = ctx.editOperation;
  const plan = op.cut_plan;
  const variations: AssembledVariation[] = [];
  const durationFlags: string[] = [];

  // Propagate duration flag
  if (plan.duration_flag) {
    durationFlags.push(plan.flag_reason ?? "Hook exceeds 50% of target duration");
  }

  // Build edit summary from segment descriptions
  const segDescs = plan.segments
    .map((s) => `${s.type}(${s.start_time}-${s.end_time}s)`)
    .join(" + ");

  for (let i = 0; i < ctx.variationCount; i++) {
    const outputFile = join(ctx.outputDir, `variation_${i + 1}.mp4`);

    const args = buildDurationCutdownArgs(ctx.sourceFile, plan, outputFile);

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
        context: { step: "duration_cutdown" },
      };
    }

    if (result.exitCode !== 0) {
      return {
        status: "FAILED",
        error_category: "EDIT_ERROR",
        severity: "error",
        message: `FFmpeg exited with code ${result.exitCode}: ${result.stderr.slice(0, 500)}`,
        recovery_action: "halt",
        context: { step: "duration_cutdown" },
      };
    }

    variations.push({
      variation_index: i + 1,
      file_path: outputFile,
      duration_seconds: plan.actual_duration,
      resolution: "1080x1920",
      edit_summary: `Duration cutdown: ${segDescs}`,
      root_angle_preserved: plan.root_angle_preserved,
    });
  }

  return {
    status: "SUCCESS",
    data: {
      variations,
      durationFlags,
    },
  };
}

// ── Agent Definition ────────────────────────────────────────────────────────

export const durationAgent: ExpansionAgent = {
  typeCode: "dur",
  name: "duration-cutdown",
  validate,
  execute,
};
