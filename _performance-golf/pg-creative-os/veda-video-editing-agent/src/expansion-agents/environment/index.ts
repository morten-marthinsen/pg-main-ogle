/**
 * Environment Swap Expansion Agent — changes visual background of source video.
 *
 * Two modes:
 *   v1 ("environment_swap"): Basic FFmpeg overlay — places source on a new background clip.
 *   v2 ("environment_swap_ai"): AI-generated environments via FAL segmentation + generation.
 *
 * v2 3-stage AI pipeline:
 *   1. FAL BiRefNet — background segmentation (extract foreground from key frame)
 *   2. FAL Flux — generate background image from background_prompt
 *   3. FFmpeg composite — layer source video on generated background
 *
 * Creative intelligence:
 * - Environment change must not shift emotional context of root angle
 * - A "credibility" angle in a studio looks different in a casual setting — assess compatibility
 * - v1 is limited to clip library; v2 uses AI segmentation + generation
 *
 * Uses: ffmpeg-executor buildEnvironmentSwapArgs()
 */

import { join } from "node:path";
import { mkdir } from "node:fs/promises";
import { ensureICloudSafeDir } from "../../utils/icloud-safe-dir.js";
import { buildEnvironmentSwapArgs } from "../../utils/ffmpeg-executor.js";
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

  const isV1 = ctx.editOperation.type === "environment_swap";
  const isV2 = ctx.editOperation.type === "environment_swap_ai";

  if (!isV1 && !isV2) {
    errors.push(
      `Expected edit operation type "environment_swap" or "environment_swap_ai", got "${ctx.editOperation.type}"`,
    );
    return { valid: false, errors, warnings };
  }

  if (isV1) {
    const op = ctx.editOperation;
    if (!("environment_clip_path" in op) || !op.environment_clip_path) {
      errors.push("Environment swap requires an environment clip (environment_clip_path).");
    }
  }

  if (isV2) {
    const op = ctx.editOperation;
    if (!("background_prompt" in op) || !op.background_prompt) {
      errors.push(
        "AI environment swap requires a background_prompt describing the desired background.",
      );
    }

    if (ctx.variationCount > 5) {
      warnings.push(
        `${ctx.variationCount} AI environment variations requested — generation costs scale linearly. ` +
          "Consider 3 or fewer for cost efficiency.",
      );
    }
  }

  if (ctx.variationCount < 1) {
    errors.push("variation_count must be >= 1");
  }

  if (!ctx.sourceFile) {
    errors.push("source_file is required");
  }

  return { valid: errors.length === 0, errors, warnings };
}

// ── v1 Execution (FFmpeg clip overlay) ──────────────────────────────────────

async function executeV1(
  ctx: ExpansionContext,
  deps: ExpansionDeps,
): Promise<SubAgentResult<ExpansionResult>> {
  const op = ctx.editOperation as { type: "environment_swap"; environment_clip_path: string };
  const variations: AssembledVariation[] = [];

  for (let i = 0; i < ctx.variationCount; i++) {
    const outputFile = join(ctx.outputDir, `variation_${i + 1}.mp4`);

    const args = buildEnvironmentSwapArgs(ctx.sourceFile, op.environment_clip_path, outputFile);

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
        context: { step: "environment_swap" },
      };
    }

    if (result.exitCode !== 0) {
      return {
        status: "FAILED",
        error_category: "EDIT_ERROR",
        severity: "error",
        message: `FFmpeg exited with code ${result.exitCode}: ${result.stderr.slice(0, 500)}`,
        recovery_action: "halt",
        context: { step: "environment_swap" },
      };
    }

    variations.push({
      variation_index: i + 1,
      file_path: outputFile,
      duration_seconds: 0, // validated by export_manager
      resolution: "1080x1920",
      edit_summary: `Environment swap: new background from ${op.environment_clip_path}`,
      root_angle_preserved: true,
    });
  }

  return {
    status: "SUCCESS",
    data: { variations, durationFlags: [] },
  };
}

// ── v2 Execution (AI-generated background) ──────────────────────────────────

async function executeV2(
  ctx: ExpansionContext,
  deps: ExpansionDeps,
): Promise<SubAgentResult<ExpansionResult>> {
  // ── Prerequisite: aiClient must be available ────────────────────────────

  if (!deps.aiClient) {
    return {
      status: "FAILED",
      error_category: "CREDENTIAL_ERROR",
      severity: "error",
      message:
        "AI environment swap requires AI client (FAL for segmentation + image generation). " +
        "No aiClient provided in dependencies.",
      recovery_action: "halt",
      context: { step: "environment_swap_ai" },
    };
  }

  const client = deps.aiClient;

  if (!client.isAvailable("segmentation")) {
    return {
      status: "FAILED",
      error_category: "CREDENTIAL_ERROR",
      severity: "error",
      message:
        "FAL credentials not configured. Required for background segmentation (BiRefNet). Set FAL_KEY.",
      recovery_action: "halt",
      context: { step: "environment_swap_ai" },
    };
  }

  if (!client.isAvailable("image")) {
    return {
      status: "FAILED",
      error_category: "CREDENTIAL_ERROR",
      severity: "error",
      message:
        "FAL credentials not configured. Required for background generation (Flux). Set FAL_KEY.",
      recovery_action: "halt",
      context: { step: "environment_swap_ai" },
    };
  }

  // ── Extract operation fields ────────────────────────────────────────────

  const op = ctx.editOperation as {
    type: "environment_swap_ai";
    background_prompt: string;
    style_reference_url?: string;
  };

  const variations: AssembledVariation[] = [];
  const durationFlags: string[] = [];
  let totalCost = 0;

  // ── Generate variations ─────────────────────────────────────────────────

  // Extract a key frame from the source video for BiRefNet (processes images, not video)
  const keyFramePath = join(ctx.outputDir, "keyframe_t1.png");
  try {
    const extractArgs = [
      "-y", "-i", ctx.sourceFile,
      "-ss", "1",          // 1 second in (skip black intro frames)
      "-frames:v", "1",
      "-q:v", "2",
      keyFramePath,
    ];
    const extractResult = await deps.commandRunner.run("ffmpeg", extractArgs);
    if (extractResult.exitCode !== 0) {
      return {
        status: "FAILED",
        error_category: "EDIT_ERROR",
        severity: "error",
        message: `Key frame extraction failed: ${extractResult.stderr.slice(0, 500)}`,
        recovery_action: "halt",
        context: { step: "environment_swap_ai" },
      };
    }
  } catch (err) {
    return {
      status: "FAILED",
      error_category: "EDIT_ERROR",
      severity: "error",
      message: `Key frame extraction failed: ${err instanceof Error ? err.message : String(err)}`,
      recovery_action: "halt",
      context: { step: "environment_swap_ai" },
    };
  }

  for (let i = 0; i < ctx.variationCount; i++) {
    const varIndex = i + 1;
    const varDir = join(ctx.outputDir, `var_${varIndex}`);
    const outputFile = join(ctx.outputDir, `variation_${varIndex}.mp4`);

    try {
      // Ensure variation subdirectory exists for AI client file downloads
      await mkdir(varDir, { recursive: true });

      // Stage 1: Background segmentation via FAL BiRefNet
      // Extracts foreground mask from key frame (extracted above)
      const segResult = await client.generate(
        {
          type: "segmentation",
          prompt: "Extract foreground subject from video frame",
          model: "birefnet",
          style_reference: keyFramePath,
        },
        varDir,
      );
      totalCost += segResult.cost_usd;

      // Stage 2: Background generation via FAL Flux
      const bgPrompt = buildBackgroundPrompt(op.background_prompt, varIndex);
      const bgResult = await client.generate(
        {
          type: "image",
          prompt: bgPrompt,
          model: "flux",
          width: ctx.sourceDims?.width ?? 1080,
          height: ctx.sourceDims?.height ?? 1920,
          ...(op.style_reference_url
            ? { style_reference: op.style_reference_url }
            : {}),
        },
        varDir,
      );
      totalCost += bgResult.cost_usd;

      // Stage 3: FFmpeg composite — layer source on generated background using mask
      const compositeArgs = buildCompositeArgs(
        ctx.sourceFile,
        bgResult.file_path,
        segResult.file_path,
        outputFile,
        ctx.sourceDims,
      );

      let ffResult: { exitCode: number; stdout: string; stderr: string };
      try {
        ffResult = await deps.commandRunner.run("ffmpeg", compositeArgs);
      } catch (err) {
        return {
          status: "FAILED",
          error_category: "EDIT_ERROR",
          severity: "error",
          message: `FFmpeg composite failed: ${err instanceof Error ? err.message : String(err)}`,
          recovery_action: "halt",
          context: { step: "environment_swap_ai" },
        };
      }

      if (ffResult.exitCode !== 0) {
        return {
          status: "FAILED",
          error_category: "EDIT_ERROR",
          severity: "error",
          message: `FFmpeg composite exited with code ${ffResult.exitCode}: ${ffResult.stderr.slice(0, 500)}`,
          recovery_action: "halt",
          context: { step: "environment_swap_ai" },
        };
      }

      variations.push({
        variation_index: varIndex,
        file_path: outputFile,
        duration_seconds: ctx.sourceDuration ?? 0,
        resolution: ctx.sourceDims
          ? `${ctx.sourceDims.width}x${ctx.sourceDims.height}`
          : "1080x1920",
        edit_summary:
          `AI environment (v${varIndex}): BiRefNet segmentation → Flux background "${op.background_prompt.slice(0, 60)}" → FFmpeg composite. ` +
          `Cost: $${totalCost.toFixed(2)}`,
        root_angle_preserved: true,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);

      // Batch stop on first failure — AI generation is expensive
      return {
        status: "FAILED",
        error_category: "AI_GENERATION_ERROR",
        severity: "error",
        message:
          `AI environment generation failed at variation ${varIndex}: ${message.slice(0, 500)}. ` +
          `${variations.length} of ${ctx.variationCount} completed before failure.`,
        recovery_action: "halt",
        context: { step: "environment_swap_ai" },
      };
    }
  }

  // ── Cost flag ───────────────────────────────────────────────────────────

  if (totalCost > 0.5) {
    durationFlags.push(
      `Total AI environment cost: $${totalCost.toFixed(2)} for ${ctx.variationCount} variations — review for budget alignment`,
    );
  }

  return {
    status: "SUCCESS",
    data: { variations, durationFlags },
  };
}

// ── Background Prompt Builder ───────────────────────────────────────────────

function buildBackgroundPrompt(basePrompt: string, variationIndex: number): string {
  return (
    `Generate a photorealistic background environment: ${basePrompt}. ` +
    `Suitable for compositing a person in foreground. ` +
    `Well-lit, consistent perspective, no people. ` +
    `Variation ${variationIndex}.`
  );
}

// ── FFmpeg Composite Args ───────────────────────────────────────────────────

/**
 * Build FFmpeg args to composite source video on generated background using a mask.
 *
 * Uses alphamerge + overlay:
 *   - Input 0: source video (foreground)
 *   - Input 1: generated background image (looped to match video duration)
 *   - Input 2: segmentation mask (alpha channel)
 *   - Output: foreground composited on generated background, preserving source audio
 */
export function buildCompositeArgs(
  sourceVideo: string,
  backgroundImage: string,
  maskImage: string,
  outputFile: string,
  sourceDims?: { width: number; height: number },
): string[] {
  // Scale background to match source dimensions (Flux may generate slightly different sizes)
  const filter = sourceDims
    ? `[1:v]scale=${sourceDims.width}:${sourceDims.height}[bg];[0:v][2:v]alphamerge[fg];[bg][fg]overlay=0:0[out]`
    : "[0:v][2:v]alphamerge[fg];[1:v][fg]overlay=0:0[out]";

  return [
    "-y",
    "-i", sourceVideo,
    "-i", backgroundImage,
    "-i", maskImage,
    "-filter_complex",
    filter,
    "-map", "[out]",
    "-map", "0:a",
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "18",
    "-c:a", "copy",
    outputFile,
  ];
}

// ── Execution Router ────────────────────────────────────────────────────────

async function execute(
  ctx: ExpansionContext,
  deps: ExpansionDeps,
): Promise<SubAgentResult<ExpansionResult>> {
  try { await ensureICloudSafeDir(ctx.outputDir); } catch { /* let downstream surface error */ }

  if (ctx.editOperation.type === "environment_swap") {
    return executeV1(ctx, deps);
  }

  if (ctx.editOperation.type === "environment_swap_ai") {
    return executeV2(ctx, deps);
  }

  return {
    status: "FAILED",
    error_category: "VALIDATION_ERROR",
    severity: "error",
    message: `environment agent received wrong operation type: ${ctx.editOperation.type}`,
    recovery_action: "halt",
    context: { step: "environment_swap" },
  };
}

// ── Agent Definition ────────────────────────────────────────────────────────

export const environmentAgent: ExpansionAgent = {
  typeCode: "env",
  name: "environment-swap",
  validate,
  execute,
};
