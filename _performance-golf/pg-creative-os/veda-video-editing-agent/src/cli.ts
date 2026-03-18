#!/usr/bin/env node
/**
 * Veda CLI — terminal entry point for the video editing pipeline.
 *
 * Usage:
 *   npx veda run --source DQFE-SC01-v0001 --expansion hook_stack --override-root-angle "The Move" [options]
 *   npx veda run --resume <run-id>
 *   npx veda --analyze [--dry-run]
 *
 * All external deps are injected: real FFmpeg/FFprobe, mock Sheets (until 2A.2),
 * optional AI client if credentials are in .env.
 */

import { parseArgs } from "node:util";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { mkdir, writeFile, readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { config as loadEnv } from "dotenv";

import { runPipeline } from "./orchestrator/index.js";
import { resumePipeline } from "./orchestrator/resume.js";
import type { OrchestratorDeps, PipelineRunConfig, PipelineRunResult } from "./orchestrator/index.js";
import type {
  PipelineState,
  RawIntake,
  EditOperation,
  ExportTargetSpec,
  EditMethod,
  SheetsReader,
  SheetsWriter,
} from "./types/pipeline.js";
import { createRealCommandRunner, createRealFileProber } from "./utils/real-runners.js";
import { createAiClient } from "./utils/ai-client.js";
import { createGoogleSheetsReader, createGoogleSheetsWriter, createGoogleSheetsUpdater } from "./utils/google-sheets-client.js";
import type { SheetsUpdater } from "./utils/google-sheets-client.js";
import { readNextPending, claimEntry, completeEntry, failEntry } from "./utils/intake-queue.js";
import { analyze } from "./sub-agents/tess-analyst/index.js";
import { writeRecommendations } from "./utils/queue-writer.js";
import { createIconikClientFromEnv, createFetchSource, createUploadAssets, type IconikClient } from "./utils/iconik-client.js";
import { ensureICloudSafeDir } from "./utils/icloud-safe-dir.js";
import { writeHooksToRow } from "./utils/queue-writer.js";
import type { SelectHooksInput } from "./utils/hook-selector.js";

// ── Version & Help ───────────────────────────────────────────────────────────

const VERSION = "0.2.0";

const USAGE = `
Veda — Video Editing Agent CLI

Usage:
  veda run [options]

Input (one of these):
  --source <id>          Source Asset ID (e.g., DQFE-SC01-v0001)
    --expansion <type>   Expansion type (hs, dur, ss, env, adf)
    --override-root-angle <name>  Root Angle Name (testing only — data source preferred)
  --from-sheets          Read next PENDING entry from Veda Intake Queue in SSS
  --resume <run-id>      Resume a paused pipeline run
  --analyze              Analyze SSS Winners and recommend expansions for intake queue

Optional:
  --variations <n>       Number of variations (default: 3)
  --editor <code>        Directing person code (default: "co")
  --method <type>        Edit method: assembly|ai_enhanced|hybrid (default: assembly)
  --output <dir>         Output directory (default: ./output)
  --source-file <path>   Local source file (skips Iconik fetch)
  --hook-clip <path>     Hook clip path (for hook_stack expansion)
  --hook-duration <sec>  Hook duration in seconds (default: 3)
  --dry-run              Skip external writes (Sheets, Iconik)
  --auto-confirm         Skip Step 3 confirmation pause
  --auto-approve         Skip Step 9 review pause

AI Expansion:
  --background-prompt <text>   Background description for AI environment swap (env)
  --presenter-image <url>      Reference image URL for presenter gen (sp/dp)
  --script-text <text>         Script text for TTS voice synthesis (sp/dp/int)
  --voice-id <id>              ElevenLabs voice ID (sp/dp/int)
  --target-language <lang>     Target language for international dub (int)

Display:
  --help                 Show this message
  --version              Show version
`.trim();

// ── Arg Parsing ──────────────────────────────────────────────────────────────

export interface CliArgs {
  source?: string;
  expansion?: string;
  overrideRootAngle?: string;
  variations: number;
  editor: string;
  method: EditMethod;
  output: string;
  sourceFile?: string;
  hookClip?: string;
  hookDuration: number;
  dryRun: boolean;
  autoConfirm: boolean;
  autoApprove: boolean;
  fromSheets: boolean;
  analyze: boolean;
  resume?: string;
  help: boolean;
  version: boolean;
  // AI expansion params
  backgroundPrompt?: string;
  presenterImage?: string;
  scriptText?: string;
  voiceId?: string;
  targetLanguage?: string;
}

export function parseCliArgs(argv: string[]): CliArgs {
  const { values } = parseArgs({
    args: argv,
    options: {
      source:         { type: "string" },
      expansion:      { type: "string" },
      "override-root-angle": { type: "string" },
      variations:     { type: "string" },
      editor:         { type: "string" },
      method:         { type: "string" },
      output:         { type: "string" },
      "source-file":  { type: "string" },
      "hook-clip":    { type: "string" },
      "hook-duration": { type: "string" },
      "dry-run":      { type: "boolean" },
      "auto-confirm": { type: "boolean" },
      "auto-approve": { type: "boolean" },
      "from-sheets":  { type: "boolean" },
      analyze:        { type: "boolean" },
      resume:         { type: "string" },
      "background-prompt": { type: "string" },
      "presenter-image":   { type: "string" },
      "script-text":       { type: "string" },
      "voice-id":          { type: "string" },
      "target-language":   { type: "string" },
      help:           { type: "boolean", short: "h" },
      version:        { type: "boolean", short: "v" },
    },
    strict: false,
    allowPositionals: true,
  });

  return {
    source:       values.source as string | undefined,
    expansion:    values.expansion as string | undefined,
    overrideRootAngle: values["override-root-angle"] as string | undefined,
    variations:   parseInt(values.variations as string, 10) || 3,
    editor:       (values.editor as string) || "co",
    method:       ((values.method as string) || "assembly") as EditMethod,
    output:       (values.output as string) || "./output",
    sourceFile:   values["source-file"] as string | undefined,
    hookClip:     values["hook-clip"] as string | undefined,
    hookDuration: parseFloat(values["hook-duration"] as string) || 3,
    dryRun:       values["dry-run"] === true,
    autoConfirm:  values["auto-confirm"] === true,
    autoApprove:  values["auto-approve"] === true,
    fromSheets:   values["from-sheets"] === true,
    analyze:      values.analyze === true,
    resume:       values.resume as string | undefined,
    help:         values.help === true,
    version:      values.version === true,
    // AI expansion params
    backgroundPrompt: values["background-prompt"] as string | undefined,
    presenterImage:   values["presenter-image"] as string | undefined,
    scriptText:       values["script-text"] as string | undefined,
    voiceId:          values["voice-id"] as string | undefined,
    targetLanguage:   values["target-language"] as string | undefined,
  };
}

// ── Config Building ──────────────────────────────────────────────────────────

export function buildEditOperation(args: CliArgs): EditOperation {
  switch (args.expansion) {
    case "hs":
    case "hook_stack":
      return {
        type: "hook_stack",
        hook_clip_path: args.hookClip ?? "/clips/default-hook.mp4",
        hook_duration_seconds: args.hookDuration,
      };
    case "ss":
    case "scroll_stopper":
      return {
        type: "scroll_stopper",
        opener_clip_path: args.hookClip ?? "/clips/default-opener.mp4",
        opener_duration_seconds: args.hookDuration,
      };
    case "env":
    case "environment_swap":
      // AI mode (v2) when background prompt is provided; FFmpeg clip mode (v1) otherwise
      if (args.backgroundPrompt) {
        return {
          type: "environment_swap_ai",
          background_prompt: args.backgroundPrompt,
        };
      }
      return {
        type: "environment_swap",
        environment_clip_path: args.hookClip ?? "/clips/default-env.mp4",
      };
    case "adf":
    case "ad_format":
      return {
        type: "ad_format",
        target_dimensions: "16x9",
        target_duration_seconds: 30,
      };
    case "dur":
    case "duration_cutdown":
      return {
        type: "duration_cutdown",
        cut_plan: {
          target_duration: 30,
          segments: [
            { start_time: 0, end_time: 3, type: "hook", transcript_text: "" },
            { start_time: 10, end_time: 25, type: "body", transcript_text: "" },
            { start_time: 55, end_time: 60, type: "cta", transcript_text: "" },
          ],
          actual_duration: 23,
          root_angle_preserved: true,
          duration_flag: false,
        },
      };
    case "sp":
    case "similar_presenter":
      return {
        type: "similar_presenter",
        presenter_image_url: args.presenterImage ?? args.hookClip ?? "",
        script_text: args.scriptText ?? "",
        ...(args.voiceId ? { voice_id: args.voiceId } : {}),
      };
    case "dp":
    case "different_presenter":
      return {
        type: "different_presenter",
        presenter_image_url: args.presenterImage ?? args.hookClip ?? "",
        script_text: args.scriptText ?? "",
        ...(args.voiceId ? { voice_id: args.voiceId } : {}),
      };
    case "cf":
    case "copy_framework":
      return {
        type: "copy_framework",
        framework_type: "PAS",
        copy_lines: [],
      };
    case "int":
    case "international":
      return {
        type: "international",
        target_language: args.targetLanguage ?? "",
        country_code: "",
        script_translation: args.scriptText ?? "",
        ...(args.voiceId ? { voice_id: args.voiceId } : {}),
      };
    default:
      throw new Error(`Unknown expansion type: "${args.expansion}". Valid types: hs, hook_stack, ss, scroll_stopper, env, environment_swap, adf, ad_format, dur, duration_cutdown, sp, similar_presenter, dp, different_presenter, cf, copy_framework, int, international`);
  }
}

export function buildConfig(args: CliArgs): PipelineRunConfig {
  if (args.overrideRootAngle) {
    console.warn("WARNING: Overriding root angle from data source. Only use for testing. Root angles should come from SSS Column C.");
  }

  const intake: RawIntake = {
    source_asset_id: args.source!,
    expansion_type: normalizeExpansionType(args.expansion!),
    root_angle_name: args.overrideRootAngle ?? "",
    target_variations: args.variations,
    edit_method: args.method,
    directing_person: args.editor,
    special_instructions: null,
  };

  const exportSpec: ExportTargetSpec = {
    format: "mp4",
    codec: "h264",
    width: 1080,
    height: 1920,
    target_duration_seconds: 60,
    duration_tolerance_seconds: 5,
    // In dry-run mode, test content is smaller than production content
    ...(args.dryRun ? { min_file_size_mb: 0 } : {}),
  };

  // Build meaningful output dir: output/{script_id}-{expansion_type}-{date}/
  const parts = args.source!.split("-");
  const scriptSlug = parts.length >= 2 ? `${parts[0]}-${parts[1]}`.toLowerCase() : parts[0]?.toLowerCase() ?? "unknown";
  const expCode = normalizeExpansionType(args.expansion!);
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const outputDir = resolve(args.output, `${scriptSlug}-${expCode}-${dateStr}`);

  return {
    intake,
    spreadsheet_id: process.env.VEDA_SPREADSHEET_ID || "dry-run-no-spreadsheet",
    output_dir: outputDir,
    edit_operation: buildEditOperation(args),
    export_spec: exportSpec,
    source_file_override: args.sourceFile ? resolve(args.sourceFile) : undefined,
    auto_confirm: args.autoConfirm,
    auto_approve: args.autoApprove,
    metadata_view_id: process.env.ICONIK_METADATA_VIEW_ID || undefined,
  };
}

function normalizeExpansionType(input: string): string {
  const map: Record<string, string> = {
    hook_stack: "hs",
    scroll_stopper: "ss",
    duration_cutdown: "dur",
    environment_swap: "env",
    ad_format: "adf",
    similar_presenter: "sp",
    different_presenter: "dp",
    copy_framework: "cf",
    international: "int",
  };
  return map[input] ?? input;
}

/**
 * Parse AI expansion params from the intake queue's special_instructions field.
 * Format: pipe-delimited key=value pairs, e.g.:
 *   "background_prompt=Upscale golf club with wood paneling"
 *   "presenter_image=https://...|script_text=Hello world|voice_id=abc123"
 *   "target_language=es|script_translation=Hola mundo"
 *
 * For env expansion with ai_enhanced edit method, a plain string (no key=) is
 * treated as the background_prompt for convenience.
 */
function parseAiParams(instructions: string | null, expansionType: string, editMethod: string): Partial<CliArgs> {
  if (!instructions) return {};

  // Simple case: env with ai_enhanced and plain text → treat as background prompt
  const normType = normalizeExpansionType(expansionType);
  if (normType === "env" && editMethod === "ai_enhanced" && !instructions.includes("=")) {
    return { backgroundPrompt: instructions };
  }

  // Parse key=value pairs separated by |
  const params: Record<string, string> = {};
  for (const pair of instructions.split("|")) {
    const eqIdx = pair.indexOf("=");
    if (eqIdx === -1) continue;
    const key = pair.slice(0, eqIdx).trim();
    const val = pair.slice(eqIdx + 1).trim();
    if (key && val) params[key] = val;
  }

  return {
    backgroundPrompt: params["background_prompt"] ?? undefined,
    presenterImage: params["presenter_image"] ?? undefined,
    scriptText: params["script_text"] ?? undefined,
    voiceId: params["voice_id"] ?? undefined,
    targetLanguage: params["target_language"] ?? undefined,
  };
}

/** Build pipeline config from a RawIntake (used by --from-sheets). */
export function buildConfigFromIntake(intake: RawIntake, args: CliArgs): PipelineRunConfig {
  // Merge AI params from special_instructions into args for buildEditOperation
  const aiParams = parseAiParams(intake.special_instructions, intake.expansion_type, intake.edit_method);
  const argsForOp: CliArgs = {
    ...args,
    expansion: intake.expansion_type,
    // AI params: CLI flags take precedence, then intake special_instructions
    backgroundPrompt: args.backgroundPrompt ?? aiParams.backgroundPrompt,
    presenterImage: args.presenterImage ?? aiParams.presenterImage,
    scriptText: args.scriptText ?? aiParams.scriptText,
    voiceId: args.voiceId ?? aiParams.voiceId,
    targetLanguage: args.targetLanguage ?? aiParams.targetLanguage,
  };

  const exportSpec: ExportTargetSpec = {
    format: "mp4",
    codec: "h264",
    width: 1080,
    height: 1920,
    target_duration_seconds: 60,
    duration_tolerance_seconds: 5,
    ...(args.dryRun ? { min_file_size_mb: 0 } : {}),
  };

  // Build meaningful output dir: output/{script_id}-{expansion_type}-{date}/
  const intakeParts = intake.source_asset_id.split("-");
  const intakeSlug = intakeParts.length >= 2 ? `${intakeParts[0]}-${intakeParts[1]}`.toLowerCase() : intakeParts[0]?.toLowerCase() ?? "unknown";
  const intakeExpCode = normalizeExpansionType(intake.expansion_type);
  const intakeDateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const intakeOutputDir = resolve(args.output, `${intakeSlug}-${intakeExpCode}-${intakeDateStr}`);

  return {
    intake,
    spreadsheet_id: process.env.VEDA_SPREADSHEET_ID || "dry-run-no-spreadsheet",
    output_dir: intakeOutputDir,
    edit_operation: buildEditOperation(argsForOp),
    export_spec: exportSpec,
    source_file_override: args.sourceFile ? resolve(args.sourceFile) : undefined,
    auto_confirm: args.autoConfirm,
    auto_approve: args.autoApprove,
    metadata_view_id: process.env.ICONIK_METADATA_VIEW_ID || undefined,
  };
}

// ── Dry-Run Sheets Stubs ─────────────────────────────────────────────────────

/**
 * Sheets reader that returns minimal fixture data for dry-run mode.
 * Returns one source row as a "Winner" so root_angle_verifier passes.
 */
export function createDryRunSheetsReader(intake: RawIntake): SheetsReader {
  // Parse funnel and script_id from the source asset ID
  const parts = intake.source_asset_id.split("-");
  const funnel = parts[0] ?? "UNKN";
  const scriptId = parts[1] ?? "0000";

  const rows: string[][] = [
    [
      funnel, scriptId, intake.root_angle_name,
      intake.source_asset_id,
      "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
      "Winner", "",
    ],
  ];

  return {
    getRows: async () => rows,
  };
}

/** Sheets writer that logs to console instead of writing to Google Sheets. */
export function createDryRunSheetsWriter(): SheetsWriter {
  return {
    appendRows: async (_id: string, _sheet: string, rows: string[][]) => {
      log("DRY-RUN", `Would write ${rows.length} rows to Google Sheets (skipped)`);
      return { updatedRows: rows.length };
    },
    getRows: async () => [],
  };
}

// ── State Persistence ────────────────────────────────────────────────────────

const RUNS_DIR = ".veda-runs";

interface SavedRun {
  state: PipelineState;
  config: PipelineRunConfig;
  saved_at: string;
}

async function saveRunState(state: PipelineState, config: PipelineRunConfig): Promise<string> {
  const dir = resolve(RUNS_DIR);
  await mkdir(dir, { recursive: true });

  const saved: SavedRun = {
    state,
    config,
    saved_at: new Date().toISOString(),
  };

  const filePath = join(dir, `${state.run_id}.json`);
  await writeFile(filePath, JSON.stringify(saved, null, 2));
  return filePath;
}

async function loadRunState(runId: string): Promise<SavedRun> {
  const filePath = join(resolve(RUNS_DIR), `${runId}.json`);
  const content = await readFile(filePath, "utf-8");
  return JSON.parse(content) as SavedRun;
}

export async function listSavedRuns(): Promise<string[]> {
  try {
    const dir = resolve(RUNS_DIR);
    const files = await readdir(dir);
    return files.filter((f) => f.endsWith(".json")).map((f) => f.replace(".json", ""));
  } catch {
    return [];
  }
}

// ── Console Output ───────────────────────────────────────────────────────────

const STEP_NAMES = [
  "",                    // 0 (unused)
  "Receive Direction",   // 1
  "Validate",            // 2
  "Confirm & Reserve",   // 3
  "Fetch Source",        // 4
  "Edit",                // 5
  "Generate Asset IDs",  // 6
  "Upload",              // 7
  "Notify",              // 8
  "Checkpoint",          // 9
  "Update Tracking",     // 10
];

function log(tag: string, message: string): void {
  console.log(`[${tag}] ${message}`);
}

function printStepProgress(state: PipelineState): void {
  for (const step of state.steps) {
    const name = STEP_NAMES[step.step] ?? `Step ${step.step}`;
    const pad = ".".repeat(Math.max(1, 28 - name.length));
    let status: string;
    switch (step.status) {
      case "completed":
        status = "OK";
        break;
      case "skipped":
        status = `SKIPPED${step.error ? ` (${step.error.replace("Skipped: ", "")})` : ""}`;
        break;
      case "failed":
        status = `FAILED: ${step.error ?? "unknown"}`;
        break;
      case "awaiting_human":
        status = "PAUSED";
        break;
      case "in_progress":
        status = "IN PROGRESS";
        break;
      default:
        status = step.status;
    }
    console.log(` [${step.step.toString().padStart(2, " ")}/10] ${name} ${pad} ${status}`);
  }
}

// ── Interactive Prompt ───────────────────────────────────────────────────────

async function promptUser(question: string): Promise<boolean> {
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    const answer = await rl.question(`  ${question} [Y/n] `);
    return answer.trim().toLowerCase() !== "n";
  } finally {
    rl.close();
  }
}

// ── Dep Wiring ───────────────────────────────────────────────────────────────

async function wireDeps(args: CliArgs, intake: RawIntake): Promise<OrchestratorDeps> {
  const commandRunner = createRealCommandRunner();
  const fileProber = createRealFileProber();

  // Sheets: dry-run stubs OR real Google Sheets adapter
  let sheetsReader: SheetsReader;
  let sheetsWriter: SheetsWriter;

  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
  if (args.dryRun || !keyPath) {
    sheetsReader = createDryRunSheetsReader(intake);
    sheetsWriter = createDryRunSheetsWriter();
    if (!args.dryRun && !keyPath) {
      log("WARN", "GOOGLE_SERVICE_ACCOUNT_KEY_PATH not set — falling back to dry-run Sheets stubs");
    }
  } else {
    log("veda", "Connecting to Google Sheets...");
    sheetsReader = await createGoogleSheetsReader({ keyFilePath: keyPath });
    sheetsWriter = await createGoogleSheetsWriter({ keyFilePath: keyPath });
    log("veda", "Google Sheets connected");
  }

  // AI client: only if credentials exist
  let aiClient = undefined;
  if (process.env.FAL_KEY) {
    aiClient = createAiClient({
      falKey: process.env.FAL_KEY,
      elevenLabsKey: process.env.ELEVENLABS_API_KEY,
      higgsFieldKey: process.env.HIGGSFIELD_API_KEY,
      higgsFieldSecret: process.env.HIGGSFIELD_SECRET,
    });
  }

  // Iconik: wire fetchSource + uploadAssets if credentials exist
  let fetchSource: OrchestratorDeps["fetchSource"] = undefined;
  let uploadAssets: OrchestratorDeps["uploadAssets"] = undefined;
  const iconikClient = createIconikClientFromEnv();
  if (iconikClient) {
    const downloadDir = resolve("source-videos");
    await ensureICloudSafeDir(downloadDir);
    fetchSource = createFetchSource(iconikClient, downloadDir, "proxy");
    log("veda", "Iconik client connected (proxy download mode)");

    if (!args.dryRun) {
      const VEDA_COLLECTION_PARENT = process.env.ICONIK_COLLECTION_ID || "";
      uploadAssets = createUploadAssets(iconikClient, VEDA_COLLECTION_PARENT);
      log("veda", "Iconik upload wired (Step 7 active)");
      if (process.env.ICONIK_METADATA_VIEW_ID) {
        log("veda", "Iconik metadata wired (Step 7.5 active)");
      }
    }
  } else {
    log("WARN", "ICONIK_APP_ID / ICONIK_AUTH_TOKEN not set — Step 4 will skip unless --source-file is provided");
  }

  return {
    sheetsReader,
    sheetsWriter,
    commandRunner,
    fileProber,
    aiClient,
    fetchSource,
    uploadAssets,
    iconikClient: iconikClient ?? undefined,
  };
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  // Load environment variables
  loadEnv();

  const args = parseCliArgs(process.argv.slice(2));

  if (args.help) {
    console.log(USAGE);
    process.exit(0);
  }

  if (args.version) {
    console.log(`veda v${VERSION}`);
    process.exit(0);
  }

  // Analyze mode: read SSS, recommend expansions
  if (args.analyze) {
    await handleAnalyze(args);
    return;
  }

  // Resume mode
  if (args.resume) {
    await handleResume(args);
    return;
  }

  // From-sheets mode: read from Veda Intake Queue
  if (args.fromSheets) {
    await handleFromSheets(args);
    return;
  }

  // Validate required args for manual mode
  const missing: string[] = [];
  if (!args.source) missing.push("--source");
  if (!args.expansion) missing.push("--expansion");

  if (missing.length > 0) {
    console.error(`Error: Missing required arguments: ${missing.join(", ")}`);
    console.error("Run 'veda --help' for usage.");
    process.exit(1);
  }

  const config = buildConfig(args);
  const deps = await wireDeps(args, config.intake);

  // Ensure output directory exists
  await mkdir(resolve(args.output), { recursive: true });

  log("veda", `Starting pipeline run`);
  if (args.dryRun) log("veda", "DRY-RUN mode — no external writes");
  console.log();

  let result = await runPipeline(config, deps);
  printStepProgress(result.state);

  // Interactive loop: handle pauses
  while (!result.completed && result.paused_at) {
    const reason = result.state.steps.find(
      (s) => s.step === result.paused_at!.step,
    )?.error ?? result.paused_at.reason;

    console.log();
    log("PAUSE", reason);

    const confirmed = await promptUser("Continue?");
    if (!confirmed) {
      const savedPath = await saveRunState(result.state, config);
      log("veda", `Pipeline paused. State saved to ${savedPath}`);
      log("veda", `Resume with: veda run --resume ${result.state.run_id}`);
      process.exit(0);
    }

    console.log();
    log("veda", "Resuming pipeline...");
    result = await resumePipeline(result.state, config, deps);
    printStepProgress(result.state);
  }

  // Final output
  console.log();
  if (result.completed) {
    const ids = result.state.artifacts.generated_ids?.map((g) => g.full_id) ?? [];
    log("DONE", `Pipeline completed successfully`);
    if (ids.length > 0) {
      log("DONE", `Asset IDs:`);
      for (const id of ids) {
        console.log(`       ${id}`);
      }
    }
    log("DONE", `Output directory: ${resolve(args.output)}`);
  } else {
    log("FAIL", `Pipeline failed at step ${result.state.current_step}`);
    log("FAIL", result.state.error ?? "Unknown error");
    process.exit(1);
  }
}

// ── Analyze Mode ──────────────────────────────────────────────────────────

async function handleAnalyze(args: CliArgs): Promise<void> {
  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
  const spreadsheetId = process.env.VEDA_SPREADSHEET_ID;

  if (!keyPath || !spreadsheetId) {
    console.error("Error: --analyze requires GOOGLE_SERVICE_ACCOUNT_KEY_PATH and VEDA_SPREADSHEET_ID in .env");
    process.exit(1);
  }

  log("tess-analyst", "Analyzing SSS performance data...");

  const reader = await createGoogleSheetsReader({ keyFilePath: keyPath });

  const result = await analyze(
    { spreadsheet_id: spreadsheetId, min_spend_threshold: 1000, max_recommendations: 10 },
    reader,
  );

  if (result.status !== "SUCCESS") {
    if (result.status === "FAILED") {
      log("FAIL", result.message);
    }
    process.exit(1);
  }

  const { opportunities, total_winners_analyzed, total_rows_scanned, summary } = result.data;

  // Display recommendations
  log("ANALYSIS", `Scanned ${total_rows_scanned} rows, found ${total_winners_analyzed} qualifying Winners`);
  log("ANALYSIS", `${opportunities.length} expansion opportunities:`);
  console.log();

  for (const opp of opportunities) {
    console.log(`  [${opp.priority}] ${opp.funnel}-${opp.script_id} → ${opp.recommended_expansion_type} (${opp.confidence})`);
    console.log(`       Source: ${opp.source_asset_id}`);
    console.log(`       Score:  ${opp.score.toFixed(1)}/100`);
    console.log(`       ${opp.reasoning}`);
    console.log();
  }

  log("ANALYSIS", `Summary: ${summary.p0_count} P0, ${summary.p1_count} P1, ${summary.p2_count} P2 | Avg score: ${summary.avg_score.toFixed(1)} | Top funnel: ${summary.top_funnel}`);

  // Dry-run: stop after display
  if (args.dryRun) {
    console.log();
    log("DRY-RUN", "Skipping write to intake queue");
    return;
  }

  // Prompt before writing
  console.log();
  const confirmed = await promptUser(`Write ${opportunities.length} recommendations to intake queue?`);
  if (!confirmed) {
    log("tess-analyst", "Skipped. No changes made.");
    process.exit(0);
  }

  const writer = await createGoogleSheetsWriter({ keyFilePath: keyPath });
  const writeResult = await writeRecommendations(
    {
      spreadsheet_id: spreadsheetId,
      opportunities,
      source: "tess-analyst",
      deduplicate: true,
    },
    writer,
  );

  log("DONE", `Wrote ${writeResult.rows_written} recommendations to intake queue`);
  if (writeResult.skipped_duplicates > 0) {
    log("INFO", `Skipped ${writeResult.skipped_duplicates} duplicates (already PENDING/CLAIMED)`);
  }
}

// ── From-Sheets Mode ──────────────────────────────────────────────────────

async function handleFromSheets(args: CliArgs): Promise<void> {
  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
  const spreadsheetId = process.env.VEDA_SPREADSHEET_ID;

  if (!keyPath || !spreadsheetId) {
    console.error("Error: --from-sheets requires GOOGLE_SERVICE_ACCOUNT_KEY_PATH and VEDA_SPREADSHEET_ID in .env");
    process.exit(1);
  }

  log("veda", "Reading from Veda Intake Queue...");
  const reader = await createGoogleSheetsReader({ keyFilePath: keyPath });
  const entry = await readNextPending(spreadsheetId, reader);

  if (!entry) {
    log("veda", "No PENDING entries in the intake queue. Nothing to do.");
    process.exit(0);
  }

  // Display the recommendation
  log("QUEUE", `Found ${entry.priority} entry from ${entry.source}:`);
  log("QUEUE", `  Source:    ${entry.intake.source_asset_id}`);
  log("QUEUE", `  Type:     ${entry.intake.expansion_type}`);
  log("QUEUE", `  Angle:    ${entry.intake.root_angle_name || "(to be resolved)"}`);
  log("QUEUE", `  Vars:     ${entry.intake.target_variations}`);
  log("QUEUE", `  Method:   ${entry.intake.edit_method}`);
  if (entry.notes) log("QUEUE", `  Notes:    ${entry.notes}`);
  console.log();

  const confirmed = await promptUser("Claim this entry and start pipeline?");
  if (!confirmed) {
    log("veda", "Skipped. Entry remains PENDING in the queue.");
    process.exit(0);
  }

  // Claim the entry
  const updater = await createGoogleSheetsUpdater({ keyFilePath: keyPath });
  const config = buildConfigFromIntake(entry.intake, args);

  // Auto-hook selection: when expansion_type is hs and no pre-populated hooks
  if (normalizeExpansionType(entry.intake.expansion_type) === "hs" && (!entry.hooks || entry.hooks.length === 0)) {
    const assetParts = entry.intake.source_asset_id.split("-");
    const offerPrefix = assetParts[0] ?? "";
    if (offerPrefix) {
      config.hook_selector_input = {
        target_asset_id: entry.intake.source_asset_id,
        offer_prefix: offerPrefix,
        target_variations: entry.intake.target_variations,
      };
      log("QUEUE", `Auto-hook selection enabled for offer "${offerPrefix}" (${entry.intake.target_variations} hooks needed)`);
    }
  }

  await claimEntry(spreadsheetId, updater, entry.rowIndex, config.intake.source_asset_id);
  log("QUEUE", "Entry claimed. Starting pipeline...");
  console.log();

  const deps = await wireDeps(args, config.intake);
  await mkdir(resolve(args.output), { recursive: true });

  if (args.dryRun) log("veda", "DRY-RUN mode — no external writes");

  let result = await runPipeline(config, deps);
  printStepProgress(result.state);

  // Interactive loop: handle pauses
  while (!result.completed && result.paused_at) {
    const reason = result.state.steps.find(
      (s) => s.step === result.paused_at!.step,
    )?.error ?? result.paused_at.reason;

    console.log();
    log("PAUSE", reason);

    const pauseConfirmed = await promptUser("Continue?");
    if (!pauseConfirmed) {
      const savedPath = await saveRunState(result.state, config);
      log("veda", `Pipeline paused. State saved to ${savedPath}`);
      log("veda", `Resume with: veda run --resume ${result.state.run_id}`);
      process.exit(0);
    }

    console.log();
    log("veda", "Resuming pipeline...");
    result = await resumePipeline(result.state, config, deps);
    printStepProgress(result.state);
  }

  // Update queue status based on outcome
  console.log();
  if (result.completed) {
    // Write hook selection data back to intake queue (if auto-hooks were used)
    const hookCandidates = result.state.artifacts.hook_candidates;
    const hookRationale = result.state.artifacts.hook_selection_rationale;
    if (hookCandidates && hookCandidates.length > 0 && hookRationale) {
      try {
        const hookData = writeHooksToRow(entry.rowIndex, hookCandidates, hookRationale);
        const writer = await createGoogleSheetsWriter({ keyFilePath: keyPath });
        await writer.appendRows(spreadsheetId, "Veda Intake Queue", [hookData.values[0]]);
        log("QUEUE", `Hook selection data written back to row ${entry.rowIndex}`);
      } catch (err) {
        log("WARN", `Failed to write hook data back to queue (non-fatal): ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    await completeEntry(spreadsheetId, updater, entry.rowIndex);
    const ids = result.state.artifacts.generated_ids?.map((g) => g.full_id) ?? [];
    log("DONE", "Pipeline completed successfully");
    log("DONE", "Queue entry marked COMPLETED");
    if (ids.length > 0) {
      log("DONE", "Asset IDs:");
      for (const id of ids) {
        console.log(`       ${id}`);
      }
    }
    log("DONE", `Output directory: ${resolve(args.output)}`);
  } else {
    await failEntry(spreadsheetId, updater, entry.rowIndex);
    log("FAIL", `Pipeline failed at step ${result.state.current_step}`);
    log("FAIL", result.state.error ?? "Unknown error");
    log("FAIL", "Queue entry marked FAILED");
    process.exit(1);
  }
}

async function handleResume(args: CliArgs): Promise<void> {
  const runId = args.resume!;
  log("veda", `Resuming pipeline run: ${runId}`);

  let saved: SavedRun;
  try {
    saved = await loadRunState(runId);
  } catch {
    console.error(`Error: Could not load saved run "${runId}"`);
    const available = await listSavedRuns();
    if (available.length > 0) {
      console.error(`Available runs: ${available.join(", ")}`);
    }
    process.exit(1);
  }

  const deps = await wireDeps(args, saved.config.intake);

  let result = await resumePipeline(saved.state, saved.config, deps);
  printStepProgress(result.state);

  // Handle additional pauses
  while (!result.completed && result.paused_at) {
    const reason = result.state.steps.find(
      (s) => s.step === result.paused_at!.step,
    )?.error ?? result.paused_at.reason;

    console.log();
    log("PAUSE", reason);

    const confirmed = await promptUser("Continue?");
    if (!confirmed) {
      const savedPath = await saveRunState(result.state, saved.config);
      log("veda", `Pipeline paused. State saved to ${savedPath}`);
      log("veda", `Resume with: veda run --resume ${result.state.run_id}`);
      process.exit(0);
    }

    console.log();
    log("veda", "Resuming pipeline...");
    result = await resumePipeline(result.state, saved.config, deps);
    printStepProgress(result.state);
  }

  console.log();
  if (result.completed) {
    const ids = result.state.artifacts.generated_ids?.map((g) => g.full_id) ?? [];
    log("DONE", `Pipeline completed successfully`);
    if (ids.length > 0) {
      log("DONE", `Asset IDs:`);
      for (const id of ids) {
        console.log(`       ${id}`);
      }
    }
  } else {
    log("FAIL", `Pipeline failed at step ${result.state.current_step}`);
    log("FAIL", result.state.error ?? "Unknown error");
    process.exit(1);
  }
}

// Only run main() when this file is the entry point (not when imported by tests)
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename || process.argv[1]?.endsWith("/cli.js")) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
