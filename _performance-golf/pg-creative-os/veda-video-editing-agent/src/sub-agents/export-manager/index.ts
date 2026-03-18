/**
 * export_manager — Veda's quality control inspector.
 *
 * Before any asset gets named, uploaded, or tracked, it passes through here.
 * Validates that rendered output meets every technical specification:
 *   - Correct format (MP4 video, PNG/JPG image)
 *   - Correct codec (H.264 for video)
 *   - Correct resolution (must match target exactly)
 *   - Duration within tolerance (±5s default)
 *   - File size reasonable (warn >500MB or <1MB for video)
 *
 * Pipeline Position: Between Step 5 and Step 6 (validates final output files)
 *
 * Strict by design. Would rather reject an asset and send it back to the
 * editor than let a technically flawed file enter the system.
 *
 * Uses FileProber abstraction so core logic is testable without FFprobe.
 */

import type {
  FileProber,
  FileProbeResult,
  ExportTargetSpec,
  ExportManagerInput,
  ExportManagerOutput,
  FileValidationResult,
} from "../../types/pipeline.js";
import type { SubAgentResult } from "../../types/sub-agent.js";

const DEFAULT_DURATION_TOLERANCE = 5; // seconds
const DEFAULT_MAX_FILE_SIZE_MB = 500;
const DEFAULT_MIN_FILE_SIZE_MB = 1;

const VIDEO_FORMATS = new Set(["mp4"]);
const IMAGE_FORMATS = new Set(["png", "jpg", "jpeg"]);

/**
 * Validate a single file against the target spec.
 */
export function validateFile(
  probe: FileProbeResult,
  spec: ExportTargetSpec,
): FileValidationResult {
  const warnings: string[] = [];
  const errors: string[] = [];

  // Format check
  const actualFormat = probe.format.toLowerCase();
  const targetFormat = spec.format.toLowerCase();
  const formatOk =
    actualFormat === targetFormat ||
    (targetFormat === "jpg" && actualFormat === "jpeg") ||
    (targetFormat === "jpeg" && actualFormat === "jpg");
  if (!formatOk) {
    errors.push(`Format mismatch: expected ${spec.format}, got ${probe.format}`);
  }

  // Codec check (video only)
  const isVideo = VIDEO_FORMATS.has(targetFormat);
  const expectedCodec = spec.codec ?? (isVideo ? "h264" : targetFormat);
  const actualCodec = probe.codec.toLowerCase();
  const codecOk = actualCodec === expectedCodec.toLowerCase();
  if (!codecOk) {
    errors.push(`Codec mismatch: expected ${expectedCodec}, got ${probe.codec}`);
  }

  // Resolution check
  const resolutionOk =
    probe.width === spec.width && probe.height === spec.height;
  if (!resolutionOk) {
    errors.push(
      `Resolution mismatch: expected ${spec.width}x${spec.height}, got ${probe.width}x${probe.height}`,
    );
  }

  // Duration check (video only)
  let durationOk = true;
  if (isVideo && spec.target_duration_seconds != null) {
    const tolerance =
      spec.duration_tolerance_seconds ?? DEFAULT_DURATION_TOLERANCE;
    const diff = Math.abs(probe.duration_seconds - spec.target_duration_seconds);
    durationOk = diff <= tolerance;
    if (!durationOk) {
      errors.push(
        `Duration out of tolerance: expected ${spec.target_duration_seconds}s ±${tolerance}s, got ${probe.duration_seconds}s (diff: ${diff.toFixed(1)}s)`,
      );
    }
  } else if (!isVideo) {
    // Images don't have duration — always ok
    durationOk = true;
  }

  // File size check
  const fileSizeMb = probe.file_size_bytes / (1024 * 1024);
  const maxMb = spec.max_file_size_mb ?? DEFAULT_MAX_FILE_SIZE_MB;
  const minMb = isVideo ? (spec.min_file_size_mb ?? DEFAULT_MIN_FILE_SIZE_MB) : 0;
  let fileSizeOk = true;

  if (fileSizeMb > maxMb) {
    warnings.push(
      `File size ${fileSizeMb.toFixed(1)}MB exceeds ${maxMb}MB threshold`,
    );
    // Over max is a warning, not a failure (per spec)
  }
  if (isVideo && fileSizeMb < minMb) {
    warnings.push(
      `File size ${fileSizeMb.toFixed(1)}MB is suspiciously small (< ${minMb}MB) — may be corrupt`,
    );
    fileSizeOk = false;
  }

  const passed = formatOk && codecOk && resolutionOk && durationOk && fileSizeOk;

  return {
    file_path: probe.file_path,
    passed,
    format_ok: formatOk,
    codec_ok: codecOk,
    resolution_ok: resolutionOk,
    duration_ok: durationOk,
    file_size_ok: fileSizeOk,
    actual: probe,
    warnings,
    errors,
  };
}

/**
 * Main export_manager entry point.
 * Validates all input files against the target spec.
 */
export async function validateExports(
  input: ExportManagerInput,
  prober: FileProber,
): Promise<SubAgentResult<ExportManagerOutput>> {
  if (!input.files || input.files.length === 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "No files to validate",
      recovery_action: "halt",
      context: { step: "export_manager" },
    };
  }

  if (!input.target_spec) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "target_spec is required",
      recovery_action: "halt",
      context: { step: "export_manager" },
    };
  }

  const results: FileValidationResult[] = [];
  const allWarnings: string[] = [];
  const allFailures: string[] = [];

  for (const filePath of input.files) {
    let probeResult: FileProbeResult;
    try {
      probeResult = await prober.probe(filePath);
    } catch (err) {
      // Probe failure = corrupt or missing file
      results.push({
        file_path: filePath,
        passed: false,
        format_ok: false,
        codec_ok: false,
        resolution_ok: false,
        duration_ok: false,
        file_size_ok: false,
        actual: {
          file_path: filePath,
          format: "unknown",
          codec: "unknown",
          width: 0,
          height: 0,
          duration_seconds: 0,
          file_size_bytes: 0,
        },
        warnings: [],
        errors: [
          `Failed to probe file: ${err instanceof Error ? err.message : String(err)}`,
        ],
      });
      allFailures.push(`${filePath}: probe failed`);
      continue;
    }

    const validation = validateFile(probeResult, input.target_spec);
    results.push(validation);

    if (!validation.passed) {
      allFailures.push(
        `${filePath}: ${validation.errors.join("; ")}`,
      );
    }
    allWarnings.push(...validation.warnings.map((w) => `${filePath}: ${w}`));
  }

  const allPassed = results.every((r) => r.passed);

  if (!allPassed) {
    return {
      status: "FAILED",
      error_category: "OUTPUT_VALIDATION_ERROR",
      severity: "error",
      message: `${allFailures.length} file(s) failed validation`,
      recovery_action: "halt",
      context: {
        step: "export_manager",
        asset_ids: allFailures,
      },
    };
  }

  return {
    status: "SUCCESS",
    data: {
      all_passed: true,
      file_results: results,
      warnings: allWarnings,
      failures: [],
    },
  };
}
