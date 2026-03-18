/**
 * Copy Framework Expansion Agent — same visuals, different persuasive copy overlay.
 *
 * Takes the source video and overlays new copy text using a specified copywriting
 * framework (PAS, AIDA, BAB, etc.). The visual content stays identical — only the
 * text overlay changes. Root angle is preserved because the core thesis stays the
 * same; only the framing/presentation of the argument changes.
 *
 * Uses template-renderer's buildCopyFrameworkArgs for the FFmpeg text overlay.
 *
 * Neco integration: Currently accepts manual copy_lines in the intake brief.
 * Future: Neco generates framework-specific copy variations automatically.
 *
 * Absorbs: template-renderer copy_framework routing (for expansion-level orchestration)
 */

import { join } from "node:path";
import { ensureICloudSafeDir } from "../../utils/icloud-safe-dir.js";
import { buildCopyFrameworkArgs } from "../../sub-agents/template-renderer/index.js";
import type {
  ExpansionAgent,
  ExpansionContext,
  ExpansionDeps,
  ExpansionResult,
  ExpansionValidationResult,
} from "../types.js";
import type { SubAgentResult } from "../../types/sub-agent.js";
import type { AssembledVariation, TemplateParams } from "../../types/pipeline.js";

// ── Known Frameworks ────────────────────────────────────────────────────────

const KNOWN_FRAMEWORKS = new Set([
  "pas",   // Problem-Agitate-Solution
  "aida",  // Attention-Interest-Desire-Action
  "bab",   // Before-After-Bridge
  "fab",   // Features-Advantages-Benefits
  "4ps",   // Promise-Picture-Proof-Push
]);

// ── Validation ──────────────────────────────────────────────────────────────

function validate(ctx: ExpansionContext): ExpansionValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (ctx.editOperation.type !== "copy_framework") {
    errors.push(
      `Expected edit operation type "copy_framework", got "${ctx.editOperation.type}"`,
    );
    return { valid: false, errors, warnings };
  }

  const op = ctx.editOperation;

  if (!op.framework_type) {
    errors.push("Copy framework requires a framework_type (e.g., 'pas', 'aida', 'bab').");
  } else if (!KNOWN_FRAMEWORKS.has(op.framework_type.toLowerCase())) {
    warnings.push(
      `Unknown framework type "${op.framework_type}". Known: ${[...KNOWN_FRAMEWORKS].join(", ")}. ` +
        "Proceeding with custom framework — ensure copy_lines match the intended structure.",
    );
  }

  if (!op.copy_lines || op.copy_lines.length === 0) {
    errors.push(
      "Copy framework requires copy_lines (array of text strings for overlay). " +
        "Future: Neco will generate these automatically from framework_type.",
    );
  }

  if (op.copy_lines && op.copy_lines.some((line) => line.length > 80)) {
    warnings.push(
      "One or more copy_lines exceed 80 characters. Long lines may overflow on mobile formats.",
    );
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

  if (ctx.editOperation.type !== "copy_framework") {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: `copy-framework agent received wrong operation type: ${ctx.editOperation.type}`,
      recovery_action: "halt",
      context: { step: "copy_framework" },
    };
  }

  const op = ctx.editOperation;
  const displayDuration = op.display_duration_seconds ?? 4;
  const variations: AssembledVariation[] = [];
  const resolution = ctx.sourceDims ?? { width: 1080, height: 1920 };

  for (let i = 0; i < ctx.variationCount; i++) {
    const outputFile = join(ctx.outputDir, `variation_${i + 1}.mp4`);

    // Build template params for the copy framework overlay
    const templateParams: Extract<TemplateParams, { type: "copy_framework" }> = {
      type: "copy_framework",
      framework_text: op.cta_text
        ? [...op.copy_lines, op.cta_text]
        : op.copy_lines,
      display_duration_seconds: displayDuration,
    };

    const args = buildCopyFrameworkArgs(ctx.sourceFile, templateParams, resolution, outputFile);

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
        context: { step: "copy_framework" },
      };
    }

    if (result.exitCode !== 0) {
      return {
        status: "FAILED",
        error_category: "EDIT_ERROR",
        severity: "error",
        message: `FFmpeg exited with code ${result.exitCode}: ${result.stderr.slice(0, 500)}`,
        recovery_action: "halt",
        context: { step: "copy_framework" },
      };
    }

    variations.push({
      variation_index: i + 1,
      file_path: outputFile,
      duration_seconds: 0, // validated by export_manager
      resolution: `${resolution.width}x${resolution.height}`,
      edit_summary: `Copy framework (${op.framework_type}): ${op.copy_lines.length} lines overlaid` +
        (op.cta_text ? ` + CTA "${op.cta_text}"` : ""),
      root_angle_preserved: true,
    });
  }

  return {
    status: "SUCCESS",
    data: { variations, durationFlags: [] },
  };
}

// ── Agent Definition ────────────────────────────────────────────────────────

export const copyFrameworkAgent: ExpansionAgent = {
  typeCode: "cf",
  name: "copy-framework",
  validate,
  execute,
};
