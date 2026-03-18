/**
 * Pipeline Orchestrator — Veda's brain.
 *
 * Coordinates all sub-agents through the 10-step pipeline.
 * Each step calls the appropriate sub-agent(s), stores artifacts
 * in PipelineState, and advances to the next step.
 *
 * External dependencies are injected so the orchestrator is fully
 * testable without real APIs, FFmpeg, or Google Sheets.
 *
 * Steps 4 (fetch_source), 7 (upload), and 8 (notify) require
 * external services (Iconik) and can be skipped via config.
 */

import { mkdir, rename } from "node:fs/promises";
import { ensureICloudSafeDir } from "../utils/icloud-safe-dir.js";
import { join, dirname, basename } from "node:path";

import type {
  PipelineState,
  PipelineArtifacts,
  RawIntake,
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

import {
  createPipelineRun,
  startPipeline,
  completeStep,
  skipStep,
  failStep,
  awaitHuman,
} from "../sub-agents/state-manager/index.js";
import { process as processIntake } from "../sub-agents/tess-connector/index.js";
import { verify as verifyRootAngle } from "../sub-agents/root-angle-verifier/index.js";
import { lookupVariations, writeTracking } from "../sub-agents/sheets-updater/index.js";
import { render as renderTemplate } from "../sub-agents/template-renderer/index.js";
import { getAgent } from "../expansion-agents/index.js";
import "../expansion-agents/init.js";
import type { ExpansionContext, ExpansionDeps } from "../expansion-agents/types.js";
import { validateExports } from "../sub-agents/export-manager/index.js";
import { generate as generateNames } from "../sub-agents/naming-generator/index.js";
import { generate as aiGenerate } from "../sub-agents/ai-editor/index.js";
import { selectHooks, type SelectHooksInput } from "../utils/hook-selector.js";
import type { IconikClient } from "../utils/iconik-client.js";
import { applyMetadata } from "../sub-agents/metadata-manager/index.js";
import type { MetadataManagerInput } from "../types/pipeline.js";

// ── Types ───────────────────────────────────────────────────────────────────

/** External dependencies injected into the orchestrator. */
export interface OrchestratorDeps {
  sheetsReader: SheetsReader;
  sheetsWriter: SheetsWriter;
  commandRunner: CommandRunner;
  fileProber: FileProber;
  /** Handler for fetching source assets (Step 4). Null = skip step. */
  fetchSource?: (assetId: string) => Promise<SubAgentResult<{ file_path: string }>>;
  /** Handler for uploading assets (Step 7). Null = skip step. */
  uploadAssets?: (files: string[]) => Promise<SubAgentResult<{ urls: string[] }>>;
  /** Handler for sending notifications (Step 8). Null = skip step. */
  notifyHuman?: (message: string) => Promise<SubAgentResult<{ sent: boolean }>>;
  /** AI generation client (Step 5, AI path). Undefined = ai_editor unavailable. */
  aiClient?: AiGenerationClient;
  /** Iconik client for hook donor transcription & download (Step 4.5). Optional. */
  iconikClient?: IconikClient;
}

/** Configuration for a pipeline run. */
export interface PipelineRunConfig {
  intake: RawIntake;
  spreadsheet_id: string;
  sheet_name?: string;
  source_file_override?: string;    // Skip fetch, use this local file directly
  output_dir: string;
  edit_operation: EditOperation;
  templates?: TemplateParams[];
  export_spec: ExportTargetSpec;
  /** If true, skip human confirmation at Step 3. */
  auto_confirm?: boolean;
  /** If true, skip human checkpoint at Step 9. */
  auto_approve?: boolean;
  /** Generation request for AI-enhanced editing. Required when edit_method="ai_enhanced". */
  ai_generation_request?: GenerationRequest;
  /** Auto-select hooks from same-offer winners via hook-selector (Step 4.5). */
  hook_selector_input?: SelectHooksInput;
  /** Iconik metadata view UUID. If set, Step 7.5 applies metadata after upload. */
  metadata_view_id?: string;
}

/** Result of a pipeline run. */
export interface PipelineRunResult {
  state: PipelineState;
  /** Whether the pipeline completed all steps. */
  completed: boolean;
  /** If paused for human input, which step and why. */
  paused_at?: { step: number; reason: string };
}

// ── Helpers ────────────────────────────────────────────────────────────────

/** Parse dimensions string (e.g. "9x16", "16x9") to width/height. */
function parseDimensionsToWidthHeight(dims: string): { width: number; height: number } | null {
  const dimMap: Record<string, { width: number; height: number }> = {
    "9x16": { width: 1080, height: 1920 },
    "16x9": { width: 1920, height: 1080 },
    "1x1":  { width: 1080, height: 1080 },
    "4x5":  { width: 1080, height: 1350 },
  };
  return dimMap[dims] ?? null;
}

// ── Step Executors ──────────────────────────────────────────────────────────

/**
 * Step 1: RECEIVE DIRECTION
 * Process intake data through tess_connector.
 */
function executeStep1(
  state: PipelineState,
  config: PipelineRunConfig,
): { state: PipelineState; resolved?: ResolvedIntake } {
  const result = processIntake(config.intake);

  if (result.status === "SUCCESS") {
    const newState = completeStep(state, 1, {
      resolved_intake: result.data,
    });
    return { state: newState, resolved: result.data };
  }

  return { state: failStep(state, 1, result.status === "FAILED" ? result.message : "Needs human input") };
}

/**
 * Step 2: VALIDATE
 * Verify root angle via root_angle_verifier.
 * Gate: root_angle_name must be present — never proceed without one.
 */
async function executeStep2(
  state: PipelineState,
  config: PipelineRunConfig,
  deps: OrchestratorDeps,
  resolved: ResolvedIntake,
): Promise<{ state: PipelineState }> {
  if (!resolved.root_angle_name || resolved.root_angle_name.trim() === "") {
    return {
      state: failStep(
        state,
        2,
        "Root angle name required. Check SSS Column C (Ad Level Tracking) for this Script ID. Never fabricate a root angle.",
      ),
    };
  }

  const result = await verifyRootAngle(
    {
      resolved_intake: resolved,
      spreadsheet_id: config.spreadsheet_id,
      sheet_name: config.sheet_name,
    },
    deps.sheetsReader,
  );

  if (result.status === "SUCCESS") {
    return {
      state: completeStep(state, 2, {
        verified_root_angle: result.data,
      }),
    };
  }

  if (result.status === "NEEDS_HUMAN_INPUT") {
    return {
      state: awaitHuman(state, 2, result.message),
    };
  }

  return { state: failStep(state, 2, result.message) };
}

/**
 * Step 3: CONFIRM & RESERVE
 * Look up next variation numbers and (optionally) await human confirmation.
 */
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
    // Pause for human confirmation
    const confirmState = completeStep(state, 3, {
      sheets_lookup: lookupResult.data,
      reserved_variations: reserved,
    });
    // Actually, we want to await human BEFORE completing. Let's adjust.
    const pausedState = awaitHuman(state, 3,
      `Creating ${resolved.target_variations} ${resolved.expansion_type} variations of ${resolved.script_id}. ` +
      `Reserved: ${reserved.join(", ")}. Confirm to proceed.`,
    );
    // Store the lookup data in artifacts even while paused
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

  // Auto-confirm
  return {
    state: completeStep(state, 3, {
      sheets_lookup: lookupResult.data,
      reserved_variations: reserved,
    }),
    reservedVariations: reserved,
  };
}

/**
 * Step 4: FETCH SOURCE
 * Download source asset from Iconik (or use override).
 * Post-download: validate aspect ratio matches source asset ID.
 */
async function executeStep4(
  state: PipelineState,
  config: PipelineRunConfig,
  deps: OrchestratorDeps,
  resolved: ResolvedIntake,
): Promise<{ state: PipelineState; sourceFile?: string }> {
  let sourceFile: string | undefined;

  if (config.source_file_override) {
    sourceFile = config.source_file_override;
  } else if (!deps.fetchSource) {
    return {
      state: skipStep(state, 4, "Iconik integration not configured"),
    };
  } else {
    const result = await deps.fetchSource(resolved.source_asset_id);
    if (result.status !== "SUCCESS") {
      const msg = result.status === "FAILED" ? result.message : "Needs human input";
      return { state: failStep(state, 4, msg) };
    }
    sourceFile = result.data.file_path;
  }

  // Post-download validation: probe file and check aspect ratio
  if (sourceFile && resolved.dimensions && deps.fileProber) {
    try {
      const probed = await deps.fileProber.probe(sourceFile);
      const expectedDims = parseDimensionsToWidthHeight(resolved.dimensions);
      if (expectedDims && probed.width && probed.height) {
        const expectedRatio = expectedDims.width / expectedDims.height;
        const actualRatio = probed.width / probed.height;
        // Allow 5% tolerance for rounding (e.g., 1080x1920 vs 1080x1918)
        if (Math.abs(expectedRatio - actualRatio) / expectedRatio > 0.05) {
          return {
            state: failStep(
              state,
              4,
              `Downloaded ${probed.width}x${probed.height} (${probed.width > probed.height ? "16x9" : "9x16"}) ` +
              `but source asset ID specifies ${resolved.dimensions}. Wrong asset variant.`,
            ),
          };
        }
      }
    } catch {
      // Probe failure is non-fatal at this stage — Step 5 will catch format issues
    }
  }

  return {
    state: completeStep(state, 4),
    sourceFile,
  };
}

/**
 * Step 4.5: SELECT & PREPARE HOOKS (auto mode)
 * When hook_selector_input is present and edit_operation is hook_stack,
 * finds same-offer winner hooks via transcription analysis, downloads
 * donor proxies from Iconik, trims to hook segments, and injects
 * per_variation_hooks onto the edit operation for assembly.
 *
 * Mutates config.edit_operation to inject hook clips.
 * Stores hook_candidates + hook_selection_rationale in artifacts.
 */
export async function executeStep4_5(
  state: PipelineState,
  config: PipelineRunConfig,
  deps: OrchestratorDeps,
): Promise<{ state: PipelineState }> {
  // Skip if no auto-hook input or not a hook_stack operation
  if (!config.hook_selector_input) return { state };
  if (config.edit_operation.type !== "hook_stack") return { state };

  if (!deps.iconikClient) {
    return { state: failStep(state, 4, "Hook selector requires iconikClient in deps") };
  }

  // Ensure output dir exists with iCloud-safe .nosync protection
  try { await ensureICloudSafeDir(config.output_dir); } catch { /* let downstream surface error */ }

  // 4.5a: Select hooks from same-offer winners
  const hookResult = await selectHooks(config.hook_selector_input, {
    iconikClient: deps.iconikClient,
    sheetsReader: deps.sheetsReader,
    spreadsheetId: config.spreadsheet_id,
  });

  if (hookResult.status !== "SUCCESS") {
    const msg = hookResult.status === "FAILED" ? hookResult.message : "Hook selection needs human input";
    return { state: failStep(state, 4, `Hook selection failed: ${msg}`) };
  }

  const { hooks, rationale } = hookResult.data;

  // 4.5b: Download and trim hook clips from Iconik
  const hookClips: Array<{ hook_clip_path: string; hook_duration_seconds: number }> = [];

  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];

    // Get proxy URL from Iconik
    let proxies: { url: string }[];
    try {
      proxies = await deps.iconikClient.getProxies(hook.source_iconik_uuid);
    } catch (err) {
      return { state: failStep(state, 4, `Iconik getProxies failed for hook donor ${hook.source_asset_id}: ${err instanceof Error ? err.message : String(err)}`) };
    }
    if (proxies.length === 0) {
      return { state: failStep(state, 4, `No proxies found for hook donor ${hook.source_asset_id}`) };
    }

    // Download proxy
    const proxyUrl = proxies[0].url;
    const donorPath = join(config.output_dir, `hook_donor_${i}.mp4`);
    try {
      await deps.iconikClient.downloadFile(proxyUrl, donorPath);
    } catch (err) {
      return { state: failStep(state, 4, `Hook donor download failed for ${hook.source_asset_id}: ${err instanceof Error ? err.message : String(err)}`) };
    }

    // Trim to hook segment with FFmpeg
    const trimmedPath = join(config.output_dir, `hook_trimmed_${i}.mp4`);
    const trimResult = await deps.commandRunner.run("ffmpeg", [
      "-y", "-i", donorPath,
      "-ss", hook.start_seconds.toString(),
      "-to", hook.end_seconds.toString(),
      "-c", "copy",
      trimmedPath,
    ]);

    if (trimResult.exitCode !== 0) {
      return { state: failStep(state, 4, `FFmpeg hook trim failed for donor ${i}: ${trimResult.stderr}`) };
    }

    hookClips.push({
      hook_clip_path: trimmedPath,
      hook_duration_seconds: hook.duration_seconds,
    });
  }

  // 4.5c: Inject hooks into edit operation (mutation)
  if (config.edit_operation.type === "hook_stack") {
    config.edit_operation.per_variation_hooks = hookClips;
    // Set first hook as default (fallback for assembly editor)
    config.edit_operation.hook_clip_path = hookClips[0].hook_clip_path;
    config.edit_operation.hook_duration_seconds = hookClips[0].hook_duration_seconds;
  }

  // 4.5d: Store artifacts
  const hookArtifacts = hooks.map(h => ({
    source_asset_id: h.source_asset_id,
    start_seconds: h.start_seconds,
    end_seconds: h.end_seconds,
    duration_seconds: h.duration_seconds,
    transcript_text: h.transcript_text,
  }));

  return {
    state: {
      ...state,
      artifacts: {
        ...state.artifacts,
        hook_candidates: hookArtifacts,
        hook_selection_rationale: rationale,
      },
    },
  };
}

/**
 * Step 5: EDIT
 * Assembly editing + template rendering + export validation.
 */
async function executeStep5(
  state: PipelineState,
  config: PipelineRunConfig,
  deps: OrchestratorDeps,
  resolved: ResolvedIntake,
  sourceFile: string,
): Promise<{ state: PipelineState; outputFiles?: string[] }> {
  // Ensure output directory exists with iCloud-safe .nosync protection
  try { await ensureICloudSafeDir(config.output_dir); } catch { /* let FFmpeg surface the error */ }

  // Probe source ONCE — used for both assembly (scale clips to match) and export validation
  let sourceProbe: { width: number; height: number; duration_seconds: number } | undefined;
  if (config.edit_operation.type !== "ad_format") {
    try {
      sourceProbe = await deps.fileProber.probe(sourceFile);
    } catch {
      // If probe fails, assembly proceeds without scaling (backward-compatible)
    }
  }

  // 5a: Expansion agent dispatch
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

  // 5b: Template rendering (if templates specified)
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

  // 5c: Export validation
  // Adapt export spec from source probe — for non-format-changing operations,
  // the output dimensions must match the source. Duration handling varies:
  // - hook_stack: output is LONGER (source + hook clip duration)
  // - scroll_stopper / env_swap: output matches source duration (replace ops)
  // - duration_cutdown: duration controlled by cut plan
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
        // Scroll stopper / env swap preserve source duration.
        // Duration cutdown changes duration (validated by cut plan tolerance).
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

/**
 * Step 5 (AI path): EDIT via ai_editor.
 * Used when edit_method = "ai_enhanced".
 * Returns awaiting_human so a human reviews AI output before proceeding.
 */
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
    return { state: failStep(state, 5, "AI generation request missing (ai_generation_request required for ai_enhanced edit_method)") };
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

  // Mandatory human checkpoint for AI-generated content
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

/**
 * Step 6: GENERATE ASSET IDs
 * Use naming_generator to create full 15-position Asset IDs.
 */
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

/**
 * Step 7: UPLOAD TO ICONIK
 */
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

/**
 * Extract Iconik asset UUIDs from upload URLs.
 * URLs are formatted as: https://app.iconik.io/asset/{uuid}
 */
function extractIconikUuids(urls: string[]): string[] {
  return urls.map((url) => {
    const match = url.match(/\/asset\/([0-9a-f-]+)/i);
    return match?.[1] ?? "";
  }).filter((uuid) => uuid !== "");
}

/**
 * Step 7.5: APPLY METADATA (runs only when metadata_view_id is configured)
 *
 * Uses upload URLs from Step 7 to extract Iconik UUIDs, then applies
 * metadata via the metadata_manager sub-agent.
 */
export async function executeStep7_5(
  state: PipelineState,
  config: PipelineRunConfig,
  deps: OrchestratorDeps,
): Promise<{ state: PipelineState }> {
  // Graceful skip if metadata_view_id not configured
  if (!config.metadata_view_id) {
    return { state };
  }

  if (!deps.iconikClient) {
    return { state };
  }

  const uploadUrls = state.artifacts.upload_urls;
  if (!uploadUrls || uploadUrls.length === 0) {
    return { state };
  }

  const generatedIds = state.artifacts.generated_ids;
  if (!generatedIds || generatedIds.length === 0) {
    return { state };
  }

  const iconikUuids = extractIconikUuids(uploadUrls);
  if (iconikUuids.length !== generatedIds.length) {
    // Mismatch — fail pipeline (correctness matters when metadata is configured)
    return {
      state: failStep(
        state,
        7,
        `Metadata: UUID count (${iconikUuids.length}) !== generated ID count (${generatedIds.length})`,
      ),
    };
  }

  const input: MetadataManagerInput = {
    asset_ids: generatedIds,
    iconik_asset_uuids: iconikUuids,
    metadata_view_id: config.metadata_view_id,
  };

  const result = await applyMetadata(input, deps.iconikClient);

  if (result.status === "SUCCESS") {
    state.artifacts.metadata_applied = result.data.metadata_applied;
    return { state };
  }

  // Fail on metadata error when metadata IS configured
  return {
    state: failStep(state, 7, `Metadata application failed: ${result.message}`),
  };
}

/**
 * Step 8: NOTIFY
 */
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

  // Notification failure is non-fatal — skip with warning
  return { state: skipStep(state, 8, "Notification failed (non-fatal)") };
}

/**
 * Step 9: CHECKPOINT
 * Human reviews. Auto-approve or pause.
 */
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

/**
 * Step 10: UPDATE TRACKING
 * Write new asset entries to SSS spreadsheet.
 */
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

// ── Main Orchestrator ───────────────────────────────────────────────────────

/**
 * Run the full Veda pipeline.
 *
 * Executes steps sequentially. If a step requires human input,
 * the pipeline pauses and returns the current state. Resume by
 * calling `resumePipeline()` with the updated state.
 */
export async function runPipeline(
  config: PipelineRunConfig,
  deps: OrchestratorDeps,
): Promise<PipelineRunResult> {
  let state = createPipelineRun();
  state = startPipeline(state);

  // Step 1: RECEIVE DIRECTION
  const step1 = executeStep1(state, config);
  state = step1.state;
  if (state.status === "failed") return { state, completed: false };
  const resolved = step1.resolved!;

  // Gate: Hook Stack requires hook reference data (manual clip OR auto-selector)
  if (config.edit_operation.type === "hook_stack") {
    const hasHookClip = config.edit_operation.hook_clip_path &&
      config.edit_operation.hook_clip_path !== "/clips/default-hook.mp4";
    const hasAutoHooks = !!config.hook_selector_input;
    if (!hasHookClip && !hasAutoHooks) {
      state = failStep(state, 1,
        "Hook Stack requires a hook clip source. Provide --hook-clip (manual) or populate hook reference columns (T-W) in the intake queue.");
      return { state, completed: false };
    }
  }

  // Step 2: VALIDATE
  const step2 = await executeStep2(state, config, deps, resolved);
  state = step2.state;
  if (state.status === "failed") return { state, completed: false };
  if (state.status === "awaiting_human") {
    return { state, completed: false, paused_at: { step: 2, reason: "Needs human review" } };
  }

  // Step 3: CONFIRM & RESERVE
  const step3 = await executeStep3(state, config, deps, resolved);
  state = step3.state;
  if (state.status === "failed") return { state, completed: false };
  if (state.status === "awaiting_human") {
    return { state, completed: false, paused_at: { step: 3, reason: "Awaiting confirmation" } };
  }
  const reservedVariations = step3.reservedVariations ?? state.artifacts.reserved_variations ?? [];

  // Step 4: FETCH SOURCE
  const step4 = await executeStep4(state, config, deps, resolved);
  state = step4.state;
  if (state.status === "failed") return { state, completed: false };
  const sourceFile = step4.sourceFile ?? config.source_file_override;
  if (!sourceFile) {
    state = failStep(state, 5, "No source file available (Step 4 skipped and no override)");
    return { state, completed: false };
  }

  // Step 4.5: SELECT & PREPARE HOOKS (auto mode — runs only when hook_selector_input provided)
  const step4_5 = await executeStep4_5(state, config, deps);
  state = step4_5.state;
  if (state.status === "failed") return { state, completed: false };

  // Step 5: EDIT — route by edit_method
  const editMethod = resolved.edit_method ?? "assembly";
  let step5: { state: PipelineState; outputFiles?: string[] };

  // Expansion agents that handle AI internally via deps.aiClient (bypass centralized AI editor)
  const expansionManagedAiOps = new Set(["environment_swap_ai"]);

  if (editMethod === "ai_enhanced" && !expansionManagedAiOps.has(config.edit_operation.type)) {
    step5 = await executeStep5Ai(state, config, deps, resolved);
  } else {
    // "assembly", "hybrid", and expansion-agent-managed AI ops (env v2, etc.)
    step5 = await executeStep5(state, config, deps, resolved, sourceFile);
  }

  state = step5.state;
  if (state.status === "failed") return { state, completed: false };
  if (state.status === "awaiting_human") {
    return { state, completed: false, paused_at: { step: 5, reason: "AI content awaiting human review" } };
  }
  const outputFiles = step5.outputFiles ?? [];

  // Step 6: GENERATE ASSET IDs
  const step6 = executeStep6(state, resolved, reservedVariations);
  state = step6.state;
  if (state.status === "failed") return { state, completed: false };

  // Step 6.5: RENAME OUTPUT FILES to Asset IDs
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
  // Use renamed files for upload
  const filesToUpload = renamedFiles.length > 0 ? renamedFiles : outputFiles;

  // Step 7: UPLOAD
  const step7 = await executeStep7(state, deps, filesToUpload);
  state = step7.state;
  if (state.status === "failed") return { state, completed: false };

  // Step 7.5: APPLY METADATA (after upload, before notify)
  const step7_5 = await executeStep7_5(state, config, deps);
  state = step7_5.state;
  if (state.status === "failed") return { state, completed: false };

  // Step 8: NOTIFY
  const step8 = await executeStep8(state, deps, resolved);
  state = step8.state;
  if (state.status === "failed") return { state, completed: false };

  // Step 9: CHECKPOINT
  const step9 = executeStep9(state, config);
  state = step9.state;
  if (state.status === "awaiting_human") {
    return { state, completed: false, paused_at: { step: 9, reason: "Awaiting human review" } };
  }

  // Step 10: UPDATE TRACKING
  const step10 = await executeStep10(state, config, deps, resolved);
  state = step10.state;

  return {
    state,
    completed: state.status === "completed",
  };
}
