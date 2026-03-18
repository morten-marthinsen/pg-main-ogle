/**
 * International Expansion Agent — adapts content for different geographic markets.
 *
 * 2-stage pipeline:
 *   1. ElevenLabs — voice dubbing in target language (TTS from translated script)
 *   2. FFmpeg — replace original audio with dubbed audio
 *
 * Root angle preservation: The translated script must convey the same persuasive
 * thesis in the target language. Country Code (Position 13 in naming convention)
 * MUST differ from source.
 *
 * Neco integration: Currently accepts manual script_translation in the intake brief.
 * Future: Neco generates culturally-adapted translations automatically.
 *
 * Subtitle generation is a future enhancement (requires caption_overlay template).
 */

import { join } from "node:path";
import { ensureICloudSafeDir } from "../../utils/icloud-safe-dir.js";
import type {
  ExpansionAgent,
  ExpansionContext,
  ExpansionDeps,
  ExpansionResult,
  ExpansionValidationResult,
} from "../types.js";
import type { SubAgentResult } from "../../types/sub-agent.js";
import type { AssembledVariation } from "../../types/pipeline.js";

// ── Known Languages ─────────────────────────────────────────────────────────

const KNOWN_LANGUAGES = new Set([
  "es", "pt", "fr", "de", "it", "ja", "ko", "zh", "nl", "sv", "no", "da", "fi", "pl",
]);

// ── Validation ──────────────────────────────────────────────────────────────

function validate(ctx: ExpansionContext): ExpansionValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (ctx.editOperation.type !== "international") {
    errors.push(
      `Expected edit operation type "international", got "${ctx.editOperation.type}"`,
    );
    return { valid: false, errors, warnings };
  }

  const op = ctx.editOperation;

  if (!op.target_language) {
    errors.push("International expansion requires target_language (ISO 639-1 code, e.g., 'es', 'pt', 'de').");
  } else if (!KNOWN_LANGUAGES.has(op.target_language.toLowerCase())) {
    warnings.push(
      `Unknown target language "${op.target_language}". Known: ${[...KNOWN_LANGUAGES].slice(0, 8).join(", ")}... ` +
        "ElevenLabs may not support this language — check availability.",
    );
  }

  if (!op.country_code) {
    errors.push("International expansion requires country_code (ISO 3166-1 alpha-2, e.g., 'mx', 'br', 'de').");
  }

  if (op.country_code && ctx.resolvedIntake.country_code === op.country_code) {
    errors.push(
      `Target country_code "${op.country_code}" matches source. ` +
        "International expansion must target a different market (Position 13 must differ).",
    );
  }

  if (!op.script_translation) {
    errors.push(
      "International expansion requires script_translation (translated script text for dubbing). " +
        "Future: Neco will generate translations automatically.",
    );
  }

  if (ctx.variationCount < 1) {
    errors.push("variation_count must be >= 1");
  }

  if (ctx.variationCount > 3) {
    warnings.push(
      `${ctx.variationCount} international variations requested. ` +
        "Dubbing costs scale linearly — consider 1-2 per target market.",
    );
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
  try { await ensureICloudSafeDir(ctx.outputDir); } catch { /* let downstream surface error */ }

  if (ctx.editOperation.type !== "international") {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: `international agent received wrong operation type: ${ctx.editOperation.type}`,
      recovery_action: "halt",
      context: { step: "international" },
    };
  }

  // ── Prerequisite: aiClient must be available for dubbing ────────────────

  if (!deps.aiClient) {
    return {
      status: "FAILED",
      error_category: "CREDENTIAL_ERROR",
      severity: "error",
      message:
        "International expansion requires AI client (ElevenLabs for voice dubbing). " +
        "No aiClient provided in dependencies.",
      recovery_action: "halt",
      context: { step: "international" },
    };
  }

  const client = deps.aiClient;

  if (!client.isAvailable("audio")) {
    return {
      status: "FAILED",
      error_category: "CREDENTIAL_ERROR",
      severity: "error",
      message:
        "ElevenLabs credentials not configured. Required for voice dubbing. Set ELEVENLABS_API_KEY.",
      recovery_action: "halt",
      context: { step: "international" },
    };
  }

  // ── Extract operation fields ────────────────────────────────────────────

  const op = ctx.editOperation;
  const variations: AssembledVariation[] = [];
  const durationFlags: string[] = [];
  let totalCost = 0;

  // ── Generate variations ─────────────────────────────────────────────────

  for (let i = 0; i < ctx.variationCount; i++) {
    const varIndex = i + 1;
    const varDir = join(ctx.outputDir, `var_${varIndex}`);
    const outputFile = join(ctx.outputDir, `variation_${varIndex}.mp4`);

    try {
      // Stage 1: Voice dubbing via ElevenLabs
      const dubResult = await client.generate(
        {
          type: "audio",
          prompt: op.script_translation,
          model: "elevenlabs",
          voice_id: op.voice_id,
        },
        varDir,
      );
      totalCost += dubResult.cost_usd;

      // Stage 2: FFmpeg — replace audio track with dubbed audio
      const args = buildDubArgs(ctx.sourceFile, dubResult.file_path, outputFile);

      let ffResult: { exitCode: number; stdout: string; stderr: string };
      try {
        ffResult = await deps.commandRunner.run("ffmpeg", args);
      } catch (err) {
        return {
          status: "FAILED",
          error_category: "EDIT_ERROR",
          severity: "error",
          message: `FFmpeg audio replacement failed: ${err instanceof Error ? err.message : String(err)}`,
          recovery_action: "halt",
          context: { step: "international" },
        };
      }

      if (ffResult.exitCode !== 0) {
        return {
          status: "FAILED",
          error_category: "EDIT_ERROR",
          severity: "error",
          message: `FFmpeg exited with code ${ffResult.exitCode}: ${ffResult.stderr.slice(0, 500)}`,
          recovery_action: "halt",
          context: { step: "international" },
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
          `International (${op.target_language}/${op.country_code}, v${varIndex}): ` +
          `ElevenLabs dubbing → FFmpeg audio replace. Cost: $${totalCost.toFixed(2)}`,
        root_angle_preserved: true,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);

      // Batch stop on first failure
      return {
        status: "FAILED",
        error_category: "AI_GENERATION_ERROR",
        severity: "error",
        message:
          `International dubbing failed at variation ${varIndex}: ${message.slice(0, 500)}. ` +
          `${variations.length} of ${ctx.variationCount} completed before failure.`,
        recovery_action: "halt",
        context: { step: "international" },
      };
    }
  }

  // ── Cost flag ───────────────────────────────────────────────────────────

  if (totalCost > 0.5) {
    durationFlags.push(
      `Total dubbing cost: $${totalCost.toFixed(2)} for ${ctx.variationCount} variations — review for budget alignment`,
    );
  }

  return {
    status: "SUCCESS",
    data: { variations, durationFlags },
  };
}

// ── FFmpeg Dub Args ─────────────────────────────────────────────────────────

/**
 * Build FFmpeg args to replace source audio with dubbed audio.
 * Preserves original video, replaces audio track entirely.
 */
export function buildDubArgs(
  sourceVideo: string,
  dubbedAudio: string,
  outputFile: string,
): string[] {
  return [
    "-y",
    "-i", sourceVideo,
    "-i", dubbedAudio,
    "-map", "0:v",
    "-map", "1:a",
    "-c:v", "copy",
    "-c:a", "aac",
    "-shortest",
    outputFile,
  ];
}

// ── Agent Definition ────────────────────────────────────────────────────────

export const internationalAgent: ExpansionAgent = {
  typeCode: "int",
  name: "international",
  validate,
  execute,
};
