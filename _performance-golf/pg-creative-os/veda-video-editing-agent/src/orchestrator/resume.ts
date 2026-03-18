/**
 * Pipeline Resume — continues a paused pipeline from a human checkpoint.
 *
 * When runPipeline() pauses at a human checkpoint (Steps 2, 3, 5, or 9),
 * it returns a PipelineState with status "awaiting_human". The CLI saves
 * this state to disk. After the human approves, resumePipeline() picks
 * up from the paused step and continues through the remaining steps.
 *
 * This file duplicates the step execution logic from orchestrator/index.ts
 * rather than refactoring those private functions — keeping the working
 * orchestrator untouched (Decision: separate file, shared sub-agent imports).
 */

import { rename } from "node:fs/promises";
import { dirname, join } from "node:path";

import type {
  PipelineState,
  PipelineArtifacts,
  ResolvedIntake,
  SheetsReader,
  SheetsWriter,
  CommandRunner,
  FileProber,
  EditOperation,
  TemplateParams,
  ExportTargetSpec,
  AiGenerationClient,
  GenerationRequest,
} from "../types/pipeline.js";
import type { SubAgentResult } from "../types/sub-agent.js";
import type { OrchestratorDeps, PipelineRunConfig, PipelineRunResult } from "./index.js";

import {
  resumeStep,
  completeStep,
  skipStep,
  failStep,
  awaitHuman,
} from "../sub-agents/state-manager/index.js";
import { lookupVariations, writeTracking } from "../sub-agents/sheets-updater/index.js";
import { render as renderTemplate } from "../sub-agents/template-renderer/index.js";
import { getAgent } from "../expansion-agents/index.js";
import type { ExpansionContext, ExpansionDeps } from "../expansion-agents/types.js";
import { validateExports } from "../sub-agents/export-manager/index.js";
import { generate as generateNames } from "../sub-agents/naming-generator/index.js";
import { generate as aiGenerate } from "../sub-agents/ai-editor/index.js";
import { executeStep4_5, executeStep7_5 } from "./index.js";

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Find the step number that is currently awaiting human input. */
function findPausedStep(state: PipelineState): number | undefined {
  const step = state.steps.find((s) => s.status === "awaiting_human");
  return step?.step;
}

// ── Step Executors (mirrored from orchestrator/index.ts) ─────────────────────
// These re-implement the step execution logic for steps that may need to run
// after a resume. Only steps 3–10 are needed (step 1 and 2 always complete
// before the first possible pause at step 2, and step 2's work is already done
// when it pauses for risky expansion review).

async function executeStep3(
  state: PipelineState,
  config: PipelineRunConfig,
  deps: OrchestratorDeps,
  resolved: ResolvedIntake,
): Promise<{ state: PipelineState; reservedVariations?: string[] }> {
  const lookupResult = await lookupVariations(
    {
      funnel: resolved.funnel,
      script_id: resolved.script_id,
      target_count: resolved.target_variations,
      spreadsheet_id: config.spreadsheet_id,
      sheet_name: config.sheet_name,
    },
    deps.sheetsReader,
  );

  if (lookupResult.status !== "SUCCESS") {
    const msg = lookupResult.status === "FAILED" ? lookupResult.message : "Needs human input";
    return { state: failStep(state, 3, msg) };
  }

  const reserved = lookupResult.data.reserved_numbers;

  if (!config.auto_confirm) {
    const pausedState = awaitHuman(state, 3,
      `Creating ${resolved.target_variations} ${resolved.expansion_type} variations of ${resolved.script_id}. ` +
      `Reserved: ${reserved.join(", ")}. Confirm to proceed.`,
    );
    return {
      state: {
        ...pausedState,
        artifacts: {
          ...pausedState.artifacts,
          sheets_lookup: lookupResult.data,
          reserved_variations: reserved,
        },
      },
      reservedVariations: reserved,
    };
  }

  return {
    state: completeStep(state, 3, {
      sheets_lookup: lookupResult.data,
      reserved_variations: reserved,
    }),
    reservedVariations: reserved,
  };
}

async function executeStep4(
  state: PipelineState,
  config: PipelineRunConfig,
  deps: OrchestratorDeps,
): Promise<{ state: PipelineState; sourceFile?: string }> {
  if (config.source_file_override) {
    return {
      state: completeStep(state, 4),
      sourceFile: config.source_file_override,
    };
  }

  if (!deps.fetchSource) {
    return {
      state: skipStep(state, 4, "Iconik integration not configured"),
    };
  }

  const result = await deps.fetchSource(state.artifacts.resolved_intake!.source_positions.funnel);
  if (result.status === "SUCCESS") {
    return {
      state: completeStep(state, 4),
      sourceFile: result.data.file_path,
    };
  }

  const msg = result.status === "FAILED" ? result.message : "Needs human input";
  return { state: failStep(state, 4, msg) };
}

async function executeStep5(
  state: PipelineState,
  config: PipelineRunConfig,
  deps: OrchestratorDeps,
  resolved: ResolvedIntake,
  sourceFile: string,
): Promise<{ state: PipelineState; outputFiles?: string[] }> {
  // Probe source for dimensions (needed for hook scaling) and duration (needed for spec adaptation)
  let sourceProbe: { width: number; height: number; duration_seconds: number } | undefined;
  try {
    sourceProbe = await deps.fileProber.probe(sourceFile);
  } catch {
    // If probe fails, assembly proceeds without scaling (backward-compatible)
  }

  // Expansion agent dispatch
  const agent = getAgent(resolved.expansion_type);
  if (!agent) {
    return { state: failStep(state, 5, `No expansion agent registered for type "${resolved.expansion_type}"`) };
  }

  const expansionCtx: ExpansionContext = {
    sourceFile,
    outputDir: config.output_dir,
    resolvedIntake: resolved,
    variationCount: resolved.target_variations,
    editOperation: config.edit_operation,
    sourceDims: sourceProbe ? { width: sourceProbe.width, height: sourceProbe.height } : undefined,
    sourceDuration: sourceProbe?.duration_seconds,
    hookSelectorInput: config.hook_selector_input,
  };

  const expansionDeps: ExpansionDeps = {
    commandRunner: deps.commandRunner,
    fileProber: deps.fileProber,
    iconikClient: deps.iconikClient,
    sheetsReader: deps.sheetsReader,
    aiClient: deps.aiClient,
    spreadsheetId: config.spreadsheet_id,
  };

  const validation = agent.validate(expansionCtx);
  if (!validation.valid) {
    return { state: failStep(state, 5, `Expansion validation failed: ${validation.errors.join(", ")}`) };
  }

  const expansionResult = await agent.execute(expansionCtx, expansionDeps);

  if (expansionResult.status !== "SUCCESS") {
    const msg = expansionResult.status === "FAILED" ? expansionResult.message : "Needs human input";
    return { state: failStep(state, 5, msg) };
  }

  let outputFiles = expansionResult.data.variations.map((v) => v.file_path);

  if (config.templates && config.templates.length > 0) {
    const renderedFiles: string[] = [];
    for (const filePath of outputFiles) {
      const renderedPath = filePath.replace(/\.mp4$/, "_rendered.mp4");
      const renderResult = await renderTemplate(
        {
          source_file: filePath,
          templates: config.templates,
          output_file: renderedPath,
          resolution: { width: config.export_spec.width, height: config.export_spec.height },
        },
        deps.commandRunner,
      );

      if (renderResult.status !== "SUCCESS") {
        const msg = renderResult.status === "FAILED" ? renderResult.message : "Needs human input";
        return { state: failStep(state, 5, `Template rendering failed: ${msg}`) };
      }
      renderedFiles.push(renderedPath);
    }
    outputFiles = renderedFiles;
  }

  // Adapt export spec from source probe (mirrors orchestrator/index.ts logic)
  let adaptedSpec: ExportTargetSpec = config.export_spec;
  if (sourceProbe) {
    const durationPreservingOps = new Set(["scroll_stopper", "environment_swap", "environment_swap_ai"]);

    if (config.edit_operation.type === "hook_stack") {
      // Hook stack: skip duration check — per_variation_hooks means each file has
      // a different expected duration, and FFmpeg re-encoding may shift timing.
      // Format, codec, resolution, and file size are still validated.
      adaptedSpec = {
        ...config.export_spec,
        width: sourceProbe.width,
        height: sourceProbe.height,
        target_duration_seconds: undefined,
      };
    } else {
      adaptedSpec = {
        ...config.export_spec,
        width: sourceProbe.width,
        height: sourceProbe.height,
        ...(durationPreservingOps.has(config.edit_operation.type)
          ? { target_duration_seconds: sourceProbe.duration_seconds }
          : {}),
      };
    }
  }

  const exportResult = await validateExports(
    { files: outputFiles, target_spec: adaptedSpec },
    deps.fileProber,
  );

  if (exportResult.status !== "SUCCESS") {
    const msg = exportResult.status === "FAILED" ? exportResult.message : "Needs human input";
    return { state: failStep(state, 5, `Export validation failed: ${msg}`) };
  }

  return {
    state: completeStep(state, 5, {
      assembled_variations: expansionResult.data.variations,
      rendered_files: config.templates?.length
        ? [{ file_path: outputFiles[0], templates_applied: config.templates.map((t) => t.type), duration_seconds: 0 }]
        : undefined,
      export_validation: exportResult.data,
    }),
    outputFiles,
  };
}

async function executeStep5Ai(
  state: PipelineState,
  config: PipelineRunConfig,
  deps: OrchestratorDeps,
  resolved: ResolvedIntake,
): Promise<{ state: PipelineState; outputFiles?: string[] }> {
  if (!deps.aiClient) {
    return { state: failStep(state, 5, "AI client not configured (no aiClient in deps)") };
  }

  if (!config.ai_generation_request) {
    return { state: failStep(state, 5, "AI generation request missing") };
  }

  const result = await aiGenerate(
    {
      generation_request: config.ai_generation_request,
      root_angle_name: resolved.root_angle_name,
      output_dir: config.output_dir,
    },
    deps.aiClient,
  );

  if (result.status !== "SUCCESS") {
    const msg = result.status === "FAILED" ? result.message : "Needs human input";
    return { state: failStep(state, 5, msg) };
  }

  const outputFiles = result.data.generated_files.map((f) => f.file_path);

  const pausedState = awaitHuman(
    state,
    5,
    `AI content generated. Model: ${config.ai_generation_request.model}. Cost: $${result.data.total_cost_usd.toFixed(2)}. Review before proceeding.`,
  );

  return {
    state: {
      ...pausedState,
      artifacts: {
        ...pausedState.artifacts,
        ai_generated_files: result.data.generated_files,
      },
    },
    outputFiles,
  };
}

function executeStep6(
  state: PipelineState,
  resolved: ResolvedIntake,
  reservedVariations: string[],
): { state: PipelineState } {
  const result = generateNames({
    funnel: resolved.funnel,
    script_id: resolved.script_id,
    platform: resolved.platform,
    dimensions: resolved.dimensions,
    length_tier: resolved.length_tier,
    ad_category: resolved.ad_category,
    expansion_type: resolved.expansion_type,
    asset_type: resolved.asset_type,
    talent_code: resolved.talent_code,
    copywriter_initials: resolved.directing_person,
    country_code: resolved.country_code,
    reserved_variation_numbers: reservedVariations,
    promo_name: resolved.promo_name,
  });

  if (result.status === "SUCCESS") {
    return {
      state: completeStep(state, 6, {
        generated_ids: result.data.asset_ids,
      }),
    };
  }

  const msg = result.status === "FAILED" ? result.message : "Needs human input";
  return { state: failStep(state, 6, msg) };
}

async function executeStep7(
  state: PipelineState,
  deps: OrchestratorDeps,
  outputFiles: string[],
): Promise<{ state: PipelineState }> {
  if (!deps.uploadAssets) {
    return { state: skipStep(state, 7, "Iconik integration not configured") };
  }

  const result = await deps.uploadAssets(outputFiles);
  if (result.status === "SUCCESS") {
    // Store upload URLs in artifacts for Step 7.5 (metadata) and downstream use
    const completed = completeStep(state, 7);
    completed.artifacts.upload_urls = result.data?.urls;
    return { state: completed };
  }

  const msg = result.status === "FAILED" ? result.message : "Needs human input";
  return { state: failStep(state, 7, msg) };
}

async function executeStep8(
  state: PipelineState,
  deps: OrchestratorDeps,
  resolved: ResolvedIntake,
): Promise<{ state: PipelineState }> {
  if (!deps.notifyHuman) {
    return { state: skipStep(state, 8, "Notification not configured") };
  }

  const ids = state.artifacts.generated_ids?.map((g) => g.full_id).join(", ") ?? "unknown";
  const message = `Veda has completed ${resolved.target_variations} ${resolved.expansion_type} variations. ` +
    `Asset IDs: ${ids}. Root Angle: ${resolved.root_angle_name}. Ready for review.`;

  const result = await deps.notifyHuman(message);
  if (result.status === "SUCCESS") {
    return { state: completeStep(state, 8) };
  }

  return { state: skipStep(state, 8, "Notification failed (non-fatal)") };
}

function executeStep9(
  state: PipelineState,
  config: PipelineRunConfig,
): { state: PipelineState } {
  if (config.auto_approve) {
    return { state: completeStep(state, 9) };
  }

  return {
    state: awaitHuman(state, 9, "Assets ready for review. Approve to proceed to tracking update."),
  };
}

async function executeStep10(
  state: PipelineState,
  config: PipelineRunConfig,
  deps: OrchestratorDeps,
  resolved: ResolvedIntake,
): Promise<{ state: PipelineState }> {
  const generatedIds = state.artifacts.generated_ids;
  if (!generatedIds || generatedIds.length === 0) {
    return { state: failStep(state, 10, "No generated Asset IDs to write") };
  }

  const entries = generatedIds.map((id) => ({
    funnel: resolved.funnel,
    script_id: resolved.script_id,
    root_angle_name: resolved.root_angle_name,
    asset_id: id.full_id,
    platform: resolved.platform,
    dimensions: resolved.dimensions,
    length_tier: resolved.length_tier,
    ad_category: resolved.ad_category,
    expansion_type: resolved.expansion_type,
    asset_type: resolved.asset_type,
    talent: resolved.talent_code,
    editor_name: "vv",
    copywriter_name: resolved.directing_person,
    country_code: resolved.country_code,
    creation_date: new Date().toISOString().slice(0, 10).replace(/-/g, ""),
    status: "Testing",
    classification: "Testing",
  }));

  const writeResult = await writeTracking(
    {
      spreadsheet_id: config.spreadsheet_id,
      sheet_name: config.sheet_name,
      entries,
    },
    deps.sheetsWriter,
  );

  if (writeResult.status === "SUCCESS") {
    return { state: completeStep(state, 10) };
  }

  const msg = writeResult.status === "FAILED" ? writeResult.message : "Needs human input";
  return { state: failStep(state, 10, msg) };
}

// ── Resume Orchestrator ─────────────────────────────────────────────────────

/**
 * Resume a paused pipeline from a human checkpoint.
 *
 * Takes a PipelineState that was saved when runPipeline() paused at a
 * human checkpoint, marks the paused step as complete, and continues
 * executing remaining steps.
 *
 * @throws Error if state is not in "awaiting_human" status
 * @throws Error if resolved_intake is missing from artifacts
 */
export async function resumePipeline(
  savedState: PipelineState,
  config: PipelineRunConfig,
  deps: OrchestratorDeps,
): Promise<PipelineRunResult> {
  if (savedState.status !== "awaiting_human") {
    throw new Error(`Cannot resume pipeline in "${savedState.status}" state — expected "awaiting_human"`);
  }

  const pausedStepNum = findPausedStep(savedState);
  if (pausedStepNum === undefined) {
    throw new Error("No step found in awaiting_human status");
  }

  const resolved = savedState.artifacts.resolved_intake;
  if (!resolved) {
    throw new Error("Cannot resume — resolved_intake missing from artifacts");
  }

  // Resume the paused step and complete it
  let state = resumeStep(savedState, pausedStepNum);
  state = completeStep(state, pausedStepNum);

  // Determine where to continue from
  const startFromStep = pausedStepNum + 1;

  // Reconstruct local variables from artifacts
  const reservedVariations = state.artifacts.reserved_variations ?? [];
  let outputFiles: string[] = [];

  // If we're past step 5, reconstruct output files from artifacts
  if (pausedStepNum >= 5) {
    if (state.artifacts.ai_generated_files) {
      outputFiles = state.artifacts.ai_generated_files.map((f) => f.file_path);
    } else if (state.artifacts.assembled_variations) {
      outputFiles = state.artifacts.assembled_variations.map((v) => v.file_path);
    }
  }

  // Execute remaining steps starting from startFromStep
  // Step 3
  if (startFromStep <= 3) {
    const step3 = await executeStep3(state, config, deps, resolved);
    state = step3.state;
    if (state.status === "failed") return { state, completed: false };
    if (state.status === "awaiting_human") {
      return { state, completed: false, paused_at: { step: 3, reason: "Awaiting confirmation" } };
    }
    if (step3.reservedVariations) {
      // Update reconstructed variable
      reservedVariations.length = 0;
      reservedVariations.push(...step3.reservedVariations);
    }
  }

  // Step 4
  let sourceFile = config.source_file_override;
  if (startFromStep <= 4) {
    const step4 = await executeStep4(state, config, deps);
    state = step4.state;
    if (state.status === "failed") return { state, completed: false };
    sourceFile = step4.sourceFile ?? config.source_file_override;
    if (!sourceFile) {
      state = failStep(state, 5, "No source file available (Step 4 skipped and no override)");
      return { state, completed: false };
    }
  }

  // Step 4.5: SELECT & PREPARE HOOKS (auto mode)
  if (startFromStep <= 5) {
    const step4_5 = await executeStep4_5(state, config, deps);
    state = step4_5.state;
    if (state.status === "failed") return { state, completed: false };
  }

  // Step 5
  if (startFromStep <= 5) {
    const editMethod = resolved.edit_method ?? "assembly";
    let step5: { state: PipelineState; outputFiles?: string[] };

    // Expansion agents that handle AI internally via deps.aiClient (bypass centralized AI editor)
    const expansionManagedAiOps = new Set(["environment_swap_ai"]);

    if (editMethod === "ai_enhanced" && !expansionManagedAiOps.has(config.edit_operation.type)) {
      step5 = await executeStep5Ai(state, config, deps, resolved);
    } else {
      // "assembly", "hybrid", and expansion-agent-managed AI ops (env v2, etc.)
      step5 = await executeStep5(state, config, deps, resolved, sourceFile!);
    }

    state = step5.state;
    if (state.status === "failed") return { state, completed: false };
    if (state.status === "awaiting_human") {
      return { state, completed: false, paused_at: { step: 5, reason: "AI content awaiting human review" } };
    }
    outputFiles = step5.outputFiles ?? [];
  }

  // Step 6
  if (startFromStep <= 6) {
    const effectiveReserved = state.artifacts.reserved_variations ?? reservedVariations;
    const step6 = executeStep6(state, resolved, effectiveReserved);
    state = step6.state;
    if (state.status === "failed") return { state, completed: false };
  }

  // Step 6.5: RENAME OUTPUT FILES to Asset IDs (mirrors orchestrator/index.ts)
  if (startFromStep <= 6) {
    const generatedIds = state.artifacts.generated_ids ?? [];
    const renamedFiles: string[] = [];
    for (let i = 0; i < outputFiles.length && i < generatedIds.length; i++) {
      const oldPath = outputFiles[i];
      const ext = oldPath.match(/\.[^.]+$/)?.[0] ?? ".mp4";
      const newPath = join(dirname(oldPath), `${generatedIds[i].full_id}${ext}`);
      try {
        await rename(oldPath, newPath);
        renamedFiles.push(newPath);
      } catch (err) {
        console.error(`[Step 6.5] rename failed: ${oldPath} → ${newPath}: ${err instanceof Error ? err.message : String(err)}`);
        renamedFiles.push(oldPath);
      }
    }
    if (renamedFiles.length > 0) {
      outputFiles = renamedFiles;
    }
  }

  // Step 7
  if (startFromStep <= 7) {
    const step7 = await executeStep7(state, deps, outputFiles);
    state = step7.state;
    if (state.status === "failed") return { state, completed: false };
  }

  // Step 7.5: APPLY METADATA (after upload, before notify)
  if (startFromStep <= 7) {
    const step7_5 = await executeStep7_5(state, config, deps);
    state = step7_5.state;
    if (state.status === "failed") return { state, completed: false };
  }

  // Step 8
  if (startFromStep <= 8) {
    const step8 = await executeStep8(state, deps, resolved);
    state = step8.state;
    if (state.status === "failed") return { state, completed: false };
  }

  // Step 9
  if (startFromStep <= 9) {
    const step9 = executeStep9(state, config);
    state = step9.state;
    if (state.status === "awaiting_human") {
      return { state, completed: false, paused_at: { step: 9, reason: "Awaiting human review" } };
    }
  }

  // Step 10
  if (startFromStep <= 10) {
    const step10 = await executeStep10(state, config, deps, resolved);
    state = step10.state;
  }

  return {
    state,
    completed: state.status === "completed",
  };
}
