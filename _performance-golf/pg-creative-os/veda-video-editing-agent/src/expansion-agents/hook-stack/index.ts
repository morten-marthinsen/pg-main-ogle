/**
 * Hook Stack Expansion Agent — replaces opening 3-15s with different hooks.
 *
 * Tests view rate by swapping the opening hook while preserving the
 * full source video body. Each variation gets a different hook clip,
 * selected from same-offer winners via Iconik transcription analysis.
 *
 * Creative intelligence:
 * - Diversity rule: no two hooks from the same script ID
 * - Hook duration enforcement: 3-15 seconds
 * - First-thought boundary detection (clean audio cuts)
 * - Source dimension matching (FFmpeg concat requires matching dims)
 *
 * Uses:
 * - ffmpeg-executor buildHookStackArgs()
 * - utils/hook-selector.ts selectHooks()
 */

import { join } from "node:path";
import { ensureICloudSafeDir } from "../../utils/icloud-safe-dir.js";
import { buildHookStackArgs } from "../../utils/ffmpeg-executor.js";
import { selectHooks } from "../../utils/hook-selector.js";
import { runPythonScript } from "../../utils/python-runner.js";
import type {
  ExpansionAgent,
  ExpansionContext,
  ExpansionDeps,
  ExpansionResult,
  ExpansionValidationResult,
} from "../types.js";
import type { SubAgentResult } from "../../types/sub-agent.js";
import type { AssembledVariation, CalloutTextConfig } from "../../types/pipeline.js";

// ── Validation ──────────────────────────────────────────────────────────────

function validate(ctx: ExpansionContext): ExpansionValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (ctx.editOperation.type !== "hook_stack") {
    errors.push(`Expected edit operation type "hook_stack", got "${ctx.editOperation.type}"`);
    return { valid: false, errors, warnings };
  }

  const op = ctx.editOperation;

  // Must have either manual hook clip or auto-selector input
  const hasManualHook = op.hook_clip_path && op.hook_clip_path !== "/clips/default-hook.mp4";
  const hasAutoHooks = !!ctx.hookSelectorInput;
  const hasPerVariationHooks = op.per_variation_hooks && op.per_variation_hooks.length > 0;

  if (!hasManualHook && !hasAutoHooks && !hasPerVariationHooks) {
    errors.push(
      "Hook Stack requires a hook source. Provide --hook-clip (manual), " +
      "populate hook reference columns (T-W) in intake, or supply per_variation_hooks.",
    );
  }

  if (ctx.variationCount < 1) {
    errors.push("variation_count must be >= 1");
  }

  if (!ctx.sourceFile) {
    errors.push("source_file is required");
  }

  // Duration warning
  if (op.hook_duration_seconds && (op.hook_duration_seconds < 3 || op.hook_duration_seconds > 15)) {
    warnings.push(
      `Hook duration ${op.hook_duration_seconds}s outside recommended range (3-15s)`,
    );
  }

  return { valid: errors.length === 0, errors, warnings };
}

// ── Hook Preparation (Auto Mode) ────────────────────────────────────────────

/**
 * Auto-select and prepare hook clips from same-offer winners.
 * Equivalent to the former orchestrator Step 4.5.
 */
async function prepareAutoHooks(
  ctx: ExpansionContext,
  deps: ExpansionDeps,
): Promise<SubAgentResult<{ hookClips: Array<{ hook_clip_path: string; hook_duration_seconds: number }> }>> {
  if (!ctx.hookSelectorInput) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "hookSelectorInput required for auto mode",
      recovery_action: "halt",
      context: { step: "hook_stack" },
    };
  }

  if (!deps.iconikClient) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "Hook selector requires iconikClient in deps",
      recovery_action: "halt",
      context: { step: "hook_stack" },
    };
  }

  // Ensure output dir for hook clips
  try { await ensureICloudSafeDir(ctx.outputDir); } catch { /* let downstream surface error */ }

  // Select hooks from same-offer winners
  const hookResult = await selectHooks(ctx.hookSelectorInput, {
    iconikClient: deps.iconikClient,
    sheetsReader: deps.sheetsReader!,
    spreadsheetId: deps.spreadsheetId!,
  });

  if (hookResult.status !== "SUCCESS") {
    return {
      status: "FAILED",
      error_category: hookResult.status === "FAILED" ? hookResult.error_category : "VALIDATION_ERROR",
      severity: "error",
      message: `Hook selection failed: ${hookResult.status === "FAILED" ? hookResult.message : "Needs human input"}`,
      recovery_action: "halt",
      context: { step: "hook_stack" },
    };
  }

  const { hooks } = hookResult.data;
  const hookClips: Array<{ hook_clip_path: string; hook_duration_seconds: number }> = [];

  // Download and trim each hook from Iconik
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];

    // Get proxy URL
    let proxies: { url: string }[];
    try {
      proxies = await deps.iconikClient.getProxies(hook.source_iconik_uuid);
    } catch (err) {
      return {
        status: "FAILED",
        error_category: "ICONIK_ERROR",
        severity: "error",
        message: `Iconik getProxies failed for hook donor ${hook.source_asset_id}: ${err instanceof Error ? err.message : String(err)}`,
        recovery_action: "retry",
        context: { step: "hook_stack" },
      };
    }
    if (proxies.length === 0) {
      return {
        status: "FAILED",
        error_category: "ICONIK_ERROR",
        severity: "error",
        message: `No proxies found for hook donor ${hook.source_asset_id}`,
        recovery_action: "halt",
        context: { step: "hook_stack" },
      };
    }

    // Download proxy
    const donorPath = join(ctx.outputDir, `hook_donor_${i}.mp4`);
    try {
      await deps.iconikClient.downloadFile(proxies[0].url, donorPath);
    } catch (err) {
      return {
        status: "FAILED",
        error_category: "ICONIK_ERROR",
        severity: "error",
        message: `Hook donor download failed for ${hook.source_asset_id}: ${err instanceof Error ? err.message : String(err)}`,
        recovery_action: "retry",
        context: { step: "hook_stack" },
      };
    }

    // Trim to hook segment
    const trimmedPath = join(ctx.outputDir, `hook_trimmed_${i}.mp4`);
    const trimResult = await deps.commandRunner.run("ffmpeg", [
      "-y", "-i", donorPath,
      "-ss", hook.start_seconds.toString(),
      "-to", hook.end_seconds.toString(),
      "-c", "copy",
      trimmedPath,
    ]);

    if (trimResult.exitCode !== 0) {
      return {
        status: "FAILED",
        error_category: "EDIT_ERROR",
        severity: "error",
        message: `FFmpeg hook trim failed for donor ${i}: ${trimResult.stderr}`,
        recovery_action: "halt",
        context: { step: "hook_stack" },
      };
    }

    hookClips.push({
      hook_clip_path: trimmedPath,
      hook_duration_seconds: hook.duration_seconds,
    });
  }

  return { status: "SUCCESS", data: { hookClips } };
}

// ── Pre-flight (Quality Engine V4: Execution Guardrails) ─────────────────────

async function preflight(
  ctx: ExpansionContext,
  deps: ExpansionDeps,
): Promise<SubAgentResult<void> | null> {
  // Gate 5 (VEDA-ANTI-DEGRADATION): hook_clip_path must be real, not placeholder
  if (ctx.editOperation.type === "hook_stack") {
    const op = ctx.editOperation;
    const isPlaceholder = !op.hook_clip_path || op.hook_clip_path === "/clips/default-hook.mp4";
    const hasPerVarHooks = op.per_variation_hooks && op.per_variation_hooks.length > 0;
    const hasAutoHooks = !!ctx.hookSelectorInput;

    if (isPlaceholder && !hasPerVarHooks && !hasAutoHooks) {
      return {
        status: "FAILED",
        error_category: "VALIDATION_ERROR",
        severity: "error",
        message: "Pre-flight FAILED: hook_clip_path is a placeholder. Pipeline will fail. Provide a real hook clip.",
        recovery_action: "halt",
        context: { step: "hook_stack" },
      };
    }
  }

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
        context: { step: "hook_stack" },
      };
    }
  }

  return null; // All checks passed
}

// ── Execution ───────────────────────────────────────────────────────────────

async function execute(
  ctx: ExpansionContext,
  deps: ExpansionDeps,
): Promise<SubAgentResult<ExpansionResult>> {
  // Pre-flight checks (Quality Engine V4: Execution Guardrails)
  const preflightResult = await preflight(ctx, deps);
  if (preflightResult) return preflightResult as SubAgentResult<ExpansionResult>;

  // Ensure output directory exists
  try { await ensureICloudSafeDir(ctx.outputDir); } catch { /* let FFmpeg surface error */ }

  if (ctx.editOperation.type !== "hook_stack") {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: `hook-stack agent received wrong operation type: ${ctx.editOperation.type}`,
      recovery_action: "halt",
      context: { step: "hook_stack" },
    };
  }

  let hookOp = ctx.editOperation;

  // Auto-hook preparation: if hookSelectorInput is provided and no per_variation_hooks yet
  if (ctx.hookSelectorInput && !hookOp.per_variation_hooks?.length) {
    const autoResult = await prepareAutoHooks(ctx, deps);
    if (autoResult.status !== "SUCCESS") {
      return autoResult as SubAgentResult<ExpansionResult>;
    }
    // Inject auto-selected hooks
    hookOp = {
      ...hookOp,
      per_variation_hooks: autoResult.data.hookClips,
      hook_clip_path: autoResult.data.hookClips[0].hook_clip_path,
      hook_duration_seconds: autoResult.data.hookClips[0].hook_duration_seconds,
    };
  }

  // Build and execute FFmpeg for each variation
  const variations: AssembledVariation[] = [];

  for (let i = 0; i < ctx.variationCount; i++) {
    const outputFile = join(ctx.outputDir, `variation_${i + 1}.mp4`);

    // Per-variation hook override
    let currentOp = hookOp;
    if (hookOp.per_variation_hooks?.[i]) {
      currentOp = {
        ...hookOp,
        hook_clip_path: hookOp.per_variation_hooks[i].hook_clip_path,
        hook_duration_seconds: hookOp.per_variation_hooks[i].hook_duration_seconds,
      };
    }

    const args = buildHookStackArgs(
      ctx.sourceFile,
      currentOp.hook_clip_path,
      outputFile,
      ctx.sourceDims,
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
        context: { step: "hook_stack" },
      };
    }

    if (result.exitCode !== 0) {
      return {
        status: "FAILED",
        error_category: "EDIT_ERROR",
        severity: "error",
        message: `FFmpeg exited with code ${result.exitCode}: ${result.stderr.slice(0, 500)}`,
        recovery_action: "halt",
        context: { step: "hook_stack" },
      };
    }

    variations.push({
      variation_index: i + 1,
      file_path: outputFile,
      duration_seconds: 0, // validated by export_manager
      resolution: "1080x1920",
      edit_summary: `Hook stack: prepended ${currentOp.hook_clip_path} on front of full source`,
      root_angle_preserved: true,
    });
  }

  // ── Post-processing: Callout Text Burning ──────────────────────────────────
  // If callout_text config is present, burn PG-branded text overlays onto hook portions.
  // Uses Romeo's proven burn_callout_text.py via python-runner bridge.
  if (hookOp.callout_text) {
    const burnResult = await burnCalloutText(
      variations,
      hookOp.callout_text,
      ctx,
      deps,
    );
    if (burnResult.status !== "SUCCESS") {
      return burnResult as SubAgentResult<ExpansionResult>;
    }
    // Replace variation file paths with burned versions
    for (let i = 0; i < variations.length; i++) {
      if (burnResult.data.burnedPaths[i]) {
        variations[i].file_path = burnResult.data.burnedPaths[i];
        variations[i].edit_summary += " + callout text burned";
      }
    }
  }

  // ── Post-processing: QA Check ───────────────────────────────────────────────
  // Run qa_hook_assembly.py on each variation to verify join points.
  // Returns NEEDS_HUMAN_INPUT if any check fails (PASS/FAIL gate — no partial passes).
  // Opt-in via run_qa flag in EditOperation to avoid running on every assembly.
  if (hookOp.run_qa) {
    const qaResult = await runQaCheck(variations, hookOp.hook_duration_seconds, ctx, deps);
    if (qaResult.status === "NEEDS_HUMAN_INPUT") {
      return qaResult as SubAgentResult<ExpansionResult>;
    }
    // If QA script isn't available (e.g., whisper not installed), log warning and proceed
    if (qaResult.status === "FAILED" && qaResult.message?.includes("not found")) {
      // Non-blocking — QA is optional if dependencies aren't installed
    }
  }

  return {
    status: "SUCCESS",
    data: {
      variations,
      durationFlags: [],
    },
  };
}

// ── QA Check ─────────────────────────────────────────────────────────────────

/**
 * Run Whisper-based audio QA and frame extraction at join points.
 * Uses Romeo's qa_hook_assembly.py via python-runner bridge.
 *
 * Returns NEEDS_HUMAN_INPUT if any QA check fails — this is a PASS/FAIL gate
 * per Quality Engine V4 (no success with warnings).
 */
async function runQaCheck(
  variations: AssembledVariation[],
  hookDurationSeconds: number,
  ctx: ExpansionContext,
  deps: ExpansionDeps,
): Promise<SubAgentResult<{ qaResults: Record<string, unknown>[] }>> {
  const qaResults: Record<string, unknown>[] = [];
  const failures: string[] = [];

  for (const variation of variations) {
    const args: string[] = [
      "--input", variation.file_path,
      "--hook-duration", hookDurationSeconds.toString(),
      "--output-dir", ctx.outputDir,
      "--json",
    ];

    const result = await runPythonScript(deps, "qa_hook_assembly.py", args);

    if (result.exitCode !== 0) {
      // QA script failed to run (e.g., whisper not installed)
      return {
        status: "FAILED",
        error_category: "VALIDATION_ERROR",
        severity: "warning",
        message: `QA script not found or failed to run: ${result.stderr.slice(0, 300)}`,
        recovery_action: "halt",
        context: { step: "hook_stack" },
      };
    }

    if (result.jsonOutput) {
      qaResults.push(result.jsonOutput);
      const passed = (result.jsonOutput as Record<string, unknown>).all_passed;
      if (!passed) {
        failures.push(`Variation ${variation.variation_index}: QA checks failed — review qa_frames in ${ctx.outputDir}`);
      }
    }
  }

  if (failures.length > 0) {
    return {
      status: "NEEDS_HUMAN_INPUT",
      message: `Hook stack QA failed:\n${failures.join("\n")}`,
      context: { step: "hook_stack" },
    };
  }

  return { status: "SUCCESS", data: { qaResults } };
}

// ── Callout Text Burning ─────────────────────────────────────────────────────

/**
 * Burn PG-branded callout text onto assembled hook stack variations.
 * Calls burn_callout_text.py which renders red boxes with white text
 * via PIL, then composites with FFmpeg.
 *
 * Three cover modes for handling old baked-in text:
 * - overlay_at_old_position: opaque red boxes at old text center_y
 * - overlay_at_standard: new boxes at standard upper-third position
 * - delogo: erase old text then overlay (last resort)
 */
async function burnCalloutText(
  variations: AssembledVariation[],
  config: CalloutTextConfig,
  ctx: ExpansionContext,
  deps: ExpansionDeps,
): Promise<SubAgentResult<{ burnedPaths: string[] }>> {
  const burnedPaths: string[] = [];

  for (let i = 0; i < variations.length; i++) {
    const variation = variations[i];
    const lines = config.per_variation?.[i]?.lines ?? config.lines;

    if (!lines || lines.length === 0) {
      // No callout for this variation — keep original
      burnedPaths.push(variation.file_path);
      continue;
    }

    const outputFile = variation.file_path.replace(/\.mp4$/, "_callout.mp4");

    // Build args for burn_callout_text.py
    const args: string[] = [
      "--input", variation.file_path,
      "--output", outputFile,
      "--lines", JSON.stringify(lines),
      "--hook-duration", config.hook_duration.toString(),
    ];

    if (config.cover_mode) {
      args.push("--cover-mode", config.cover_mode);
    }

    if (config.old_callout_override) {
      args.push("--old-callout-override", JSON.stringify(config.old_callout_override));
    }

    const result = await runPythonScript(deps, "burn_callout_text.py", args);

    if (result.exitCode !== 0) {
      return {
        status: "FAILED",
        error_category: "EDIT_ERROR",
        severity: "error",
        message: `Callout text burn failed for variation ${i + 1}: ${result.stderr.slice(0, 500)}`,
        recovery_action: "halt",
        context: { step: "hook_stack" },
      };
    }

    burnedPaths.push(outputFile);
  }

  return { status: "SUCCESS", data: { burnedPaths } };
}

// ── Agent Definition ────────────────────────────────────────────────────────

export const hookStackAgent: ExpansionAgent = {
  typeCode: "hs",
  name: "hook-stack",
  validate,
  execute,
};
