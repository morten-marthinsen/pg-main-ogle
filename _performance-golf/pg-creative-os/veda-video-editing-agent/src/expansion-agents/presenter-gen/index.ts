/**
 * Presenter Generation Expansion Agent — AI-generated presenter variations.
 *
 * One module, two modes:
 *   - "sp" (Similar Presenter): Match original demographics, same script
 *   - "dp" (Different Presenter): Contrast demographics deliberately, same script
 *
 * 3-stage AI pipeline:
 *   1. Higgsfield — character generation (image-to-video from reference)
 *   2. ElevenLabs — voice synthesis (TTS from script text)
 *   3. FAL wav2lip — lip-sync (combine character video + voice audio)
 *
 * Both modes preserve the root angle: script content is IDENTICAL to source.
 * Only the visual presenter changes. Human checkpoint is mandatory for all
 * AI-generated presenters (enforced by orchestrator, not this agent).
 *
 * Absorbs: ai-editor generation flow for presenter-specific tasks
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

// ── Types ────────────────────────────────────────────────────────────────────

type PresenterMode = "similar" | "different";

// ── Validation ───────────────────────────────────────────────────────────────

function validate(
  ctx: ExpansionContext,
  mode: PresenterMode,
): ExpansionValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const expectedType =
    mode === "similar" ? "similar_presenter" : "different_presenter";
  if (ctx.editOperation.type !== expectedType) {
    errors.push(
      `Expected edit operation type "${expectedType}", got "${ctx.editOperation.type}"`,
    );
    return { valid: false, errors, warnings };
  }

  const op = ctx.editOperation;

  if (
    !("presenter_image_url" in op) ||
    !op.presenter_image_url
  ) {
    errors.push(
      "Presenter generation requires presenter_image_url (reference image of original presenter).",
    );
  }

  if (!("script_text" in op) || !op.script_text) {
    errors.push(
      "Presenter generation requires script_text (dialogue for TTS voice synthesis).",
    );
  }

  if (ctx.variationCount < 1) {
    errors.push("variation_count must be >= 1");
  }

  if (ctx.variationCount > 5) {
    warnings.push(
      `${ctx.variationCount} presenter variations requested — AI generation costs scale linearly. ` +
        "Consider 3 or fewer for cost efficiency.",
    );
  }

  if (
    mode === "different" &&
    "target_demographics" in op &&
    op.target_demographics
  ) {
    const demo = op.target_demographics;
    if (!demo.gender && !demo.age_range && !demo.ethnicity) {
      warnings.push(
        "Different Presenter mode has empty target_demographics. " +
          "Higgsfield will generate a random contrast — specify at least one field for control.",
      );
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

// ── Execution ────────────────────────────────────────────────────────────────

async function execute(
  ctx: ExpansionContext,
  deps: ExpansionDeps,
  mode: PresenterMode,
): Promise<SubAgentResult<ExpansionResult>> {
  // ── Prerequisite: aiClient must be available ────────────────────────────

  if (!deps.aiClient) {
    return {
      status: "FAILED",
      error_category: "CREDENTIAL_ERROR",
      severity: "error",
      message:
        "Presenter generation requires AI client (Higgsfield + ElevenLabs + FAL). " +
        "No aiClient provided in dependencies.",
      recovery_action: "halt",
      context: { step: `presenter-gen-${mode}` },
    };
  }

  const client = deps.aiClient;

  // Check all three services
  if (!client.isAvailable("character")) {
    return {
      status: "FAILED",
      error_category: "CREDENTIAL_ERROR",
      severity: "error",
      message:
        "Higgsfield credentials not configured. Required for character generation. " +
        "Set HIGGSFIELD_API_KEY and HIGGSFIELD_SECRET.",
      recovery_action: "halt",
      context: { step: `presenter-gen-${mode}` },
    };
  }

  if (!client.isAvailable("audio")) {
    return {
      status: "FAILED",
      error_category: "CREDENTIAL_ERROR",
      severity: "error",
      message:
        "ElevenLabs credentials not configured. Required for voice synthesis. " +
        "Set ELEVENLABS_API_KEY.",
      recovery_action: "halt",
      context: { step: `presenter-gen-${mode}` },
    };
  }

  if (!client.isAvailable("lipsync")) {
    return {
      status: "FAILED",
      error_category: "CREDENTIAL_ERROR",
      severity: "error",
      message:
        "FAL credentials not configured. Required for lip-sync (wav2lip). Set FAL_KEY.",
      recovery_action: "halt",
      context: { step: `presenter-gen-${mode}` },
    };
  }

  // ── Extract operation fields ────────────────────────────────────────────

  const op = ctx.editOperation as {
    type: string;
    presenter_image_url: string;
    script_text: string;
    voice_id?: string;
    target_demographics?: {
      gender?: string;
      age_range?: string;
      ethnicity?: string;
    };
  };

  try { await ensureICloudSafeDir(ctx.outputDir); } catch { /* test paths won't exist */ }
  const variations: AssembledVariation[] = [];
  const durationFlags: string[] = [];
  let totalCost = 0;

  // ── Generate variations ─────────────────────────────────────────────────

  for (let i = 0; i < ctx.variationCount; i++) {
    const varIndex = i + 1;
    const varDir = join(ctx.outputDir, `var_${varIndex}`);

    try {
      // Stage 1: Character generation via Higgsfield
      const characterPrompt = buildCharacterPrompt(mode, op, varIndex);
      const characterResult = await client.generate(
        {
          type: "character",
          prompt: characterPrompt,
          model: "higgsfield",
          style_reference: op.presenter_image_url,
          duration_seconds: ctx.sourceDuration ?? 60,
        },
        varDir,
      );
      totalCost += characterResult.cost_usd;

      // Stage 2: Voice synthesis via ElevenLabs
      const voiceResult = await client.generate(
        {
          type: "audio",
          prompt: op.script_text,
          model: "elevenlabs",
          voice_id: op.voice_id,
        },
        varDir,
      );
      totalCost += voiceResult.cost_usd;

      // Stage 3: Lip-sync via FAL wav2lip
      const lipsyncResult = await client.generate(
        {
          type: "lipsync",
          prompt: "lip-sync character video with voice audio",
          model: "wav2lip",
          style_reference: characterResult.file_path,
          voice_id: voiceResult.file_path, // wav2lip uses this as audio_path
        },
        varDir,
      );
      totalCost += lipsyncResult.cost_usd;

      variations.push({
        variation_index: varIndex,
        file_path: lipsyncResult.file_path,
        duration_seconds: ctx.sourceDuration ?? 0,
        resolution: ctx.sourceDims
          ? `${ctx.sourceDims.width}x${ctx.sourceDims.height}`
          : "unknown",
        edit_summary:
          `${mode === "similar" ? "Similar" : "Different"} presenter (v${varIndex}): ` +
          `Higgsfield character → ElevenLabs voice → wav2lip sync. ` +
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
          `Presenter generation failed at variation ${varIndex}: ${message.slice(0, 500)}. ` +
          `${variations.length} of ${ctx.variationCount} completed before failure.`,
        recovery_action: "halt",
        context: { step: `presenter-gen-${mode}` },
      };
    }
  }

  // ── Cost flag ───────────────────────────────────────────────────────────

  if (totalCost > 1.0) {
    durationFlags.push(
      `Total AI generation cost: $${totalCost.toFixed(2)} for ${ctx.variationCount} variations — review for budget alignment`,
    );
  }

  return {
    status: "SUCCESS",
    data: { variations, durationFlags },
  };
}

// ── Character Prompt Builder ─────────────────────────────────────────────────

function buildCharacterPrompt(
  mode: PresenterMode,
  op: {
    presenter_image_url: string;
    target_demographics?: {
      gender?: string;
      age_range?: string;
      ethnicity?: string;
    };
  },
  variationIndex: number,
): string {
  if (mode === "similar") {
    return (
      `Generate a presenter similar to the reference image. ` +
      `Match gender, approximate age range, energy level, and credibility signals. ` +
      `Variation ${variationIndex} — subtle differences in appearance while maintaining demographic match.`
    );
  }

  // Different presenter — use target demographics if provided
  const demo = op.target_demographics;
  const demoDesc = demo
    ? [
        demo.gender && `gender: ${demo.gender}`,
        demo.age_range && `age range: ${demo.age_range}`,
        demo.ethnicity && `ethnicity: ${demo.ethnicity}`,
      ]
        .filter(Boolean)
        .join(", ")
    : "contrasting demographics";

  return (
    `Generate a presenter deliberately different from the reference image. ` +
    `Target: ${demoDesc || "random contrast"}. ` +
    `Must still credibly deliver the same script/angle. ` +
    `Variation ${variationIndex}.`
  );
}

// ── Agent Factory ────────────────────────────────────────────────────────────

function createPresenterAgent(mode: PresenterMode): ExpansionAgent {
  const typeCode = mode === "similar" ? "sp" : "dp";
  const name =
    mode === "similar" ? "similar-presenter" : "different-presenter";

  return {
    typeCode,
    name,
    validate: (ctx) => validate(ctx, mode),
    execute: (ctx, deps) => execute(ctx, deps, mode),
  };
}

export const similarPresenterAgent = createPresenterAgent("similar");
export const differentPresenterAgent = createPresenterAgent("different");
