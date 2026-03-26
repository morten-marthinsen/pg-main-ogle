/**
 * Environment Swap Expansion Agent — changes visual background of source video.
 *
 * Two modes:
 *   v1 ("environment_swap"): Basic FFmpeg overlay — places source on a new background clip.
 *   v2 ("environment_swap_ai"): Romeo's 5-step Gemini-based workflow with approval gates.
 *
 * v2 multi-step workflow (replaces Christopher's paused FAL BiRefNet approach):
 *   1. Analyze — Gemini video analysis of winning ad (visual blueprint)
 *   2. Brief — Generate expansion brief with environment templates
 *   3. Prompts — Provider-specific prompt generation (Kling O3 / Veo 3.1 rules)
 *   4. Generate — Avatar video generation with character consistency
 *   5. QA — Probe outputs, verify format
 *
 * Each step returns NEEDS_HUMAN_INPUT at approval gates.
 * Supports resume_from_step to re-enter at the correct step after human approval.
 *
 * Creative intelligence:
 * - Environment change must not shift emotional context of root angle
 * - Avatar consistency: same person across all environments (elements-based)
 * - Emotional tone MUST match script content
 * - No micro-choreography (kills naturalism) — direct overall energy instead
 *
 * Uses: ffmpeg-executor buildEnvironmentSwapArgs(), python-runner for Romeo's scripts
 */

import { join } from "node:path";
import { mkdir } from "node:fs/promises";
import { ensureICloudSafeDir } from "../../utils/icloud-safe-dir.js";
import { buildEnvironmentSwapArgs } from "../../utils/ffmpeg-executor.js";
import { runPythonScript } from "../../utils/python-runner.js";
import type {
  ExpansionAgent,
  ExpansionContext,
  ExpansionDeps,
  ExpansionResult,
  ExpansionValidationResult,
} from "../types.js";
import type { SubAgentResult } from "../../types/sub-agent.js";
import type { AssembledVariation, EnvironmentStep } from "../../types/pipeline.js";

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

// ── v2 Execution (Romeo's 5-step Gemini-based workflow) ──────────────────────

/** Step order for the multi-step workflow. */
const STEP_ORDER: EnvironmentStep[] = ["analyze", "brief", "prompts", "generate", "qa"];

async function executeV2(
  ctx: ExpansionContext,
  deps: ExpansionDeps,
): Promise<SubAgentResult<ExpansionResult>> {
  const op = ctx.editOperation as {
    type: "environment_swap_ai";
    background_prompt: string;
    style_reference_url?: string;
    resume_from_step?: EnvironmentStep;
    environments?: string[];
    avatar_reference_image?: string;
    hook_transcripts?: string[];
  };

  // Determine starting step (supports resume after human approval gates)
  const startStep = op.resume_from_step ?? "analyze";
  const startIndex = STEP_ORDER.indexOf(startStep);

  if (startIndex < 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: `Invalid resume_from_step: "${startStep}". Valid: ${STEP_ORDER.join(", ")}`,
      recovery_action: "halt",
      context: { step: "environment_swap_ai" },
    };
  }

  // ── Step 1: Analyze ─────────────────────────────────────────────────────
  // Gemini video analysis of winning ad — extracts visual blueprint.
  if (startIndex <= 0) {
    const analyzeArgs: string[] = [
      "--video", ctx.sourceFile,
      "--output-dir", ctx.outputDir,
    ];

    const result = await runPythonScript(deps, "analyze_winning_ad.py", analyzeArgs);

    if (result.exitCode !== 0) {
      return {
        status: "FAILED",
        error_category: "AI_GENERATION_ERROR",
        severity: "error",
        message: `Winning ad analysis failed: ${result.stderr.slice(0, 500)}`,
        recovery_action: "halt",
        context: { step: "environment_swap_ai" },
      };
    }
  }

  // ── Step 2: Brief ───────────────────────────────────────────────────────
  // Generate expansion brief with environment templates + naming convention.
  if (startIndex <= 1) {
    const briefArgs: string[] = [
      "--analysis", join(ctx.outputDir, "winning_ad_analysis.json"),
      "--output-dir", ctx.outputDir,
      "--background-prompt", op.background_prompt,
    ];

    if (op.environments?.length) {
      briefArgs.push("--environments", JSON.stringify(op.environments));
    }
    if (op.avatar_reference_image) {
      briefArgs.push("--avatar-image", op.avatar_reference_image);
    }
    if (op.hook_transcripts?.length) {
      briefArgs.push("--hook-transcripts", JSON.stringify(op.hook_transcripts));
    }

    const result = await runPythonScript(deps, "generate_expansion_brief.py", briefArgs);

    if (result.exitCode !== 0) {
      return {
        status: "FAILED",
        error_category: "AI_GENERATION_ERROR",
        severity: "error",
        message: `Brief generation failed: ${result.stderr.slice(0, 500)}`,
        recovery_action: "halt",
        context: { step: "environment_swap_ai" },
      };
    }

    // GATE: Human reviews brief before proceeding to prompt generation
    if (!op.resume_from_step || startIndex === 1) {
      return {
        status: "NEEDS_HUMAN_INPUT",
        message:
          `Brief generated at ${join(ctx.outputDir, "brief.md")}. ` +
          "Review the brief, then resume with resume_from_step: 'prompts'.",
        context: { step: "environment_swap_ai" },
      };
    }
  }

  // ── Step 3: Prompts ─────────────────────────────────────────────────────
  // Provider-specific prompt generation (Kling O3 600-char / Veo 3.1 800-char rules).
  if (startIndex <= 2) {
    const promptArgs: string[] = [
      "--brief", join(ctx.outputDir, "brief.md"),
      "--output-dir", ctx.outputDir,
    ];

    const analysisPath = join(ctx.outputDir, "winning_ad_analysis.json");
    promptArgs.push("--analysis", analysisPath);

    const result = await runPythonScript(deps, "generate_video_prompts.py", promptArgs);

    if (result.exitCode !== 0) {
      return {
        status: "FAILED",
        error_category: "AI_GENERATION_ERROR",
        severity: "error",
        message: `Prompt generation failed: ${result.stderr.slice(0, 500)}`,
        recovery_action: "halt",
        context: { step: "environment_swap_ai" },
      };
    }

    // GATE: Human reviews prompts in Airtable before generation
    if (!op.resume_from_step || startIndex === 2) {
      return {
        status: "NEEDS_HUMAN_INPUT",
        message:
          "Prompts generated and logged to Airtable. " +
          "Review prompts in Airtable, approve frames, then resume with resume_from_step: 'generate'.",
        context: { step: "environment_swap_ai" },
      };
    }
  }

  // ── Step 4: Generate ────────────────────────────────────────────────────
  // Avatar video generation via Kling O3 / Veo 3.1 with character consistency.
  if (startIndex <= 3) {
    const generateArgs: string[] = [
      "--output-dir", ctx.outputDir,
      "--mode", "video",
    ];

    if (op.avatar_reference_image) {
      generateArgs.push("--avatar-image", op.avatar_reference_image);
    }

    const result = await runPythonScript(deps, "generate_avatar_video.py", generateArgs);

    if (result.exitCode !== 0) {
      return {
        status: "FAILED",
        error_category: "AI_GENERATION_ERROR",
        severity: "error",
        message: `Video generation failed: ${result.stderr.slice(0, 500)}`,
        recovery_action: "halt",
        context: { step: "environment_swap_ai" },
      };
    }

    // GATE: Human reviews generated videos before QA
    if (!op.resume_from_step || startIndex === 3) {
      return {
        status: "NEEDS_HUMAN_INPUT",
        message:
          "Videos generated. Review output in Airtable (approve/reject per variation), " +
          "then resume with resume_from_step: 'qa'.",
        context: { step: "environment_swap_ai" },
      };
    }
  }

  // ── Step 5: QA ──────────────────────────────────────────────────────────
  // Probe output files, verify format, build variation list.
  const variations: AssembledVariation[] = [];

  // Scan output directory for generated video files
  for (let i = 0; i < ctx.variationCount; i++) {
    const varIndex = i + 1;
    const outputFile = join(ctx.outputDir, `variation_${varIndex}.mp4`);

    // Probe the output file if available
    let duration = ctx.sourceDuration ?? 0;
    let resolution = ctx.sourceDims
      ? `${ctx.sourceDims.width}x${ctx.sourceDims.height}`
      : "1080x1920";

    try {
      const probeResult = await deps.fileProber.probe(outputFile);
      duration = probeResult.duration_seconds;
      resolution = `${probeResult.width}x${probeResult.height}`;
    } catch {
      // File may not exist if fewer variations were generated than requested — skip
      continue;
    }

    variations.push({
      variation_index: varIndex,
      file_path: outputFile,
      duration_seconds: duration,
      resolution,
      edit_summary:
        `AI environment v2 (Romeo workflow): Gemini analysis → brief → prompts → ${op.background_prompt.slice(0, 40)}`,
      root_angle_preserved: true,
    });
  }

  if (variations.length === 0) {
    return {
      status: "FAILED",
      error_category: "OUTPUT_VALIDATION_ERROR",
      severity: "error",
      message: "No output files found after generation. Check output directory.",
      recovery_action: "halt",
      context: { step: "environment_swap_ai" },
    };
  }

  return {
    status: "SUCCESS",
    data: { variations, durationFlags: [] },
  };
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

// ── Pre-flight (Quality Engine V4: Execution Guardrails) ─────────────────────

async function preflight(
  ctx: ExpansionContext,
  deps: ExpansionDeps,
): Promise<SubAgentResult<void> | null> {
  // Verify source file is probed as valid video
  if (ctx.sourceFile && deps.fileProber) {
    try {
      await deps.fileProber.probe(ctx.sourceFile);
    } catch {
      return {
        status: "FAILED",
        error_category: "VALIDATION_ERROR",
        severity: "error",
        message: `Pre-flight FAILED: source file "${ctx.sourceFile}" could not be probed. File may not exist or is not a valid video.`,
        recovery_action: "halt",
        context: { step: "environment_swap" },
      };
    }
  }

  // For v2 AI workflow: verify Google API key is set before expensive Gemini calls
  if (ctx.editOperation.type === "environment_swap_ai") {
    const hasGoogleKey = !!process.env.GOOGLE_API_KEY;
    if (!hasGoogleKey) {
      return {
        status: "FAILED",
        error_category: "CREDENTIAL_ERROR",
        severity: "error",
        message: "Pre-flight FAILED: GOOGLE_API_KEY not set. Required for Gemini video analysis and prompt generation.",
        recovery_action: "halt",
        context: { step: "environment_swap_ai" },
      };
    }
  }

  return null; // All checks passed
}

// ── Execution Router ────────────────────────────────────────────────────────

async function execute(
  ctx: ExpansionContext,
  deps: ExpansionDeps,
): Promise<SubAgentResult<ExpansionResult>> {
  // Pre-flight checks (Quality Engine V4: Execution Guardrails)
  const preflightResult = await preflight(ctx, deps);
  if (preflightResult) return preflightResult as SubAgentResult<ExpansionResult>;

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
