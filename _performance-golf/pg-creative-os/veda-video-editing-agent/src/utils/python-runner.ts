/**
 * Python Script Runner — bridge utility for calling Romeo's Python scripts
 * through Veda's CommandRunner abstraction.
 *
 * Same pattern as FFmpeg invocation: TypeScript orchestrates, Python executes.
 * Scripts live in scripts/romeo/ and communicate via JSON stdout.
 */

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { CommandRunner } from "../types/pipeline.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Root of the veda-video-editing-agent project. */
const PROJECT_ROOT = resolve(__dirname, "..", "..");

/** Default scripts directory. */
const SCRIPTS_DIR = resolve(PROJECT_ROOT, "scripts", "romeo");

export interface PythonScriptResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  /** Parsed JSON from stdout, if stdout is valid JSON. */
  jsonOutput?: Record<string, unknown>;
}

/**
 * Run a Python script via CommandRunner.
 *
 * @param deps - Must include commandRunner
 * @param scriptName - Filename within scripts/romeo/ (e.g., "burn_callout_text.py")
 * @param args - CLI arguments to pass to the script
 * @param options - Optional overrides
 */
export async function runPythonScript(
  deps: { commandRunner: CommandRunner },
  scriptName: string,
  args: string[],
  options?: { scriptsDir?: string },
): Promise<PythonScriptResult> {
  const scriptsDir = options?.scriptsDir ?? SCRIPTS_DIR;
  const scriptPath = resolve(scriptsDir, scriptName);

  const result = await deps.commandRunner.run("python3", [scriptPath, ...args]);

  let jsonOutput: Record<string, unknown> | undefined;
  const trimmedStdout = result.stdout.trim();
  if (trimmedStdout.startsWith("{") || trimmedStdout.startsWith("[")) {
    try {
      jsonOutput = JSON.parse(trimmedStdout);
    } catch {
      // stdout wasn't valid JSON — that's fine, not all scripts return JSON
    }
  }

  return {
    exitCode: result.exitCode,
    stdout: result.stdout,
    stderr: result.stderr,
    jsonOutput,
  };
}
