/**
 * ai_editor — Veda's AI content generator.
 *
 * Handles all AI-powered content generation: video, image, audio (TTS),
 * character creation, and lip-sync. Routes to the appropriate service
 * (FAL.ai, ElevenLabs, Higgsfield) via the AiGenerationClient abstraction.
 *
 * Returns SUCCESS on generation — the orchestrator enforces a mandatory
 * human checkpoint before any AI-generated content enters the pipeline.
 *
 * Pipeline Position: Step 5 — EDIT (ai_enhanced path)
 *
 * Uses AiGenerationClient abstraction so generation services can be
 * swapped or tested without real API calls.
 */

import type {
  AiEditorInput,
  AiEditorOutput,
  AiGenerationClient,
  GeneratedFile,
  GenerationQuality,
} from "../../types/pipeline.js";
import type { SubAgentResult } from "../../types/sub-agent.js";

// ── Quality Assessment ──────────────────────────────────────────────────

/**
 * Assess quality of a generated file.
 * v1: all successful generations = "acceptable", missing files = "low".
 * v2+: perceptual quality metrics.
 */
export function assessQuality(
  _type: string,
  fileExists: boolean,
): GenerationQuality {
  return fileExists ? "acceptable" : "low";
}

// ── Main Generate Function ──────────────────────────────────────────────

/**
 * Generate AI content based on a generation request.
 *
 * Flow:
 * 1. Validate inputs
 * 2. Check credentials via client.isAvailable()
 * 3. Call client.generate()
 * 4. Build GeneratedFile with cost + quality
 * 5. Return SUCCESS (orchestrator handles human checkpoint)
 */
export async function generate(
  input: AiEditorInput,
  client: AiGenerationClient,
): Promise<SubAgentResult<AiEditorOutput>> {
  // ── Input validation ────────────────────────────────────────────────

  if (!input.generation_request) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "Missing generation_request",
      recovery_action: "halt",
      context: { step: "ai_editor" },
    };
  }

  const { type, prompt, model } = input.generation_request;

  if (!type) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "Missing generation_request.type",
      recovery_action: "halt",
      context: { step: "ai_editor" },
    };
  }

  if (!prompt) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "Missing generation_request.prompt",
      recovery_action: "halt",
      context: { step: "ai_editor" },
    };
  }

  if (!input.root_angle_name) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "Missing root_angle_name",
      recovery_action: "halt",
      context: { step: "ai_editor" },
    };
  }

  if (!input.output_dir) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "Missing output_dir",
      recovery_action: "halt",
      context: { step: "ai_editor" },
    };
  }

  // ── Credential check ────────────────────────────────────────────────

  if (!client.isAvailable(type)) {
    const serviceMap: Record<string, string> = {
      video: "FAL.ai (FAL_KEY)",
      image: "FAL.ai (FAL_KEY)",
      audio: "ElevenLabs (ELEVENLABS_API_KEY)",
      character: "Higgsfield (HIGGSFIELD_API_KEY + HIGGSFIELD_SECRET)",
      lipsync: "FAL.ai (FAL_KEY)",
    };

    return {
      status: "FAILED",
      error_category: "CREDENTIAL_ERROR",
      severity: "error",
      message: `Credentials not configured for "${type}" generation. Required: ${serviceMap[type] ?? "unknown service"}`,
      recovery_action: "halt",
      context: { step: "ai_editor" },
    };
  }

  // ── Generate ────────────────────────────────────────────────────────

  try {
    const result = await client.generate(input.generation_request, input.output_dir);

    const generatedFile: GeneratedFile = {
      file_path: result.file_path,
      generation_model: model,
      generation_cost_usd: result.cost_usd,
      quality_assessment: assessQuality(type, true),
      root_angle_preserved: true,
    };

    const output: AiEditorOutput = {
      generated_files: [generatedFile],
      total_cost_usd: result.cost_usd,
    };

    return {
      status: "SUCCESS",
      data: output,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    return {
      status: "FAILED",
      error_category: "AI_GENERATION_ERROR",
      severity: "error",
      message: `AI generation failed: ${message.slice(0, 500)}`,
      recovery_action: "halt",
      context: { step: "ai_editor" },
    };
  }
}
