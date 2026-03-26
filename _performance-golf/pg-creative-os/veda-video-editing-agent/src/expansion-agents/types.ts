/**
 * Expansion Agent types — the interface contract for type-based expansion modules.
 *
 * Each expansion type (hs, ssr, dur, env, sp, dp, af, cf, int) implements
 * the ExpansionAgent interface. The orchestrator dispatches to the correct
 * agent via the registry.
 *
 * Shared pipeline infrastructure (naming, upload, sheets, validation) is
 * untouched — expansion agents produce video files and return them.
 */

import type {
  ResolvedIntake,
  EditOperation,
  AssembledVariation,
  CommandRunner,
  FileProber,
  SheetsReader,
  AiGenerationClient,
} from "../types/pipeline.js";
import type { SubAgentResult } from "../types/sub-agent.js";
import type { IconikClient } from "../utils/iconik-client.js";
import type { AirtableClient } from "../utils/airtable-client.js";
import type { SelectHooksInput } from "../utils/hook-selector.js";

// ── Context ─────────────────────────────────────────────────────────────────

/** Everything an expansion agent needs to do its work. */
export interface ExpansionContext {
  /** Path to the downloaded source video. */
  sourceFile: string;
  /** Directory for output files (iCloud-safe .nosync). */
  outputDir: string;
  /** Resolved intake data from tess-connector. */
  resolvedIntake: ResolvedIntake;
  /** How many variations to produce. */
  variationCount: number;
  /** Legacy EditOperation from CLI/config — used during migration. */
  editOperation: EditOperation;
  /** Source video dimensions (from probe). */
  sourceDims?: { width: number; height: number };
  /** Source video duration in seconds (from probe). */
  sourceDuration?: number;
  /** Hook selector input (auto mode) — only relevant for hook-stack. */
  hookSelectorInput?: SelectHooksInput;
}

// ── Dependencies ────────────────────────────────────────────────────────────

/** External services injected into expansion agents. */
export interface ExpansionDeps {
  commandRunner: CommandRunner;
  fileProber: FileProber;
  iconikClient?: IconikClient;
  sheetsReader?: SheetsReader;
  aiClient?: AiGenerationClient;
  airtableClient?: AirtableClient;
  spreadsheetId?: string;
}

// ── Result ──────────────────────────────────────────────────────────────────

/** Output of an expansion agent execution. */
export interface ExpansionResult {
  /** Produced variation files with metadata. */
  variations: AssembledVariation[];
  /** Duration warnings (e.g., hook > 50% of target). */
  durationFlags: string[];
}

// ── Validation ──────────────────────────────────────────────────────────────

export interface ExpansionValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

// ── Agent Interface ─────────────────────────────────────────────────────────

/** The contract every expansion type module implements. */
export interface ExpansionAgent {
  /** Short code from naming convention (e.g., "hs", "ssr", "dur"). */
  readonly typeCode: string;
  /** Human-readable name (e.g., "hook-stack", "scroll-stopper"). */
  readonly name: string;

  /** Check that the intake has everything this type needs. */
  validate(ctx: ExpansionContext): ExpansionValidationResult;

  /** Run the expansion — produce variation video files. */
  execute(
    ctx: ExpansionContext,
    deps: ExpansionDeps,
  ): Promise<SubAgentResult<ExpansionResult>>;
}
