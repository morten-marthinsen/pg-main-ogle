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

// ── Execution ───────────────────────────────────────────────────────────────

async function execute(
  ctx: ExpansionContext,
  deps: ExpansionDeps,
): Promise<SubAgentResult<ExpansionResult>> {
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

  return {
    status: "SUCCESS",
    data: {
      variations,
      durationFlags: [],
    },
  };
}

// ── Agent Definition ────────────────────────────────────────────────────────

export const hookStackAgent: ExpansionAgent = {
  typeCode: "hs",
  name: "hook-stack",
  validate,
  execute,
};
