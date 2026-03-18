/**
 * Real implementations of CommandRunner and FileProber.
 *
 * These wrap actual system binaries (ffmpeg, ffprobe) for production use
 * and real execution tests. In unit tests, use the mock factories instead.
 */

import { execFile } from "node:child_process";
import { stat } from "node:fs/promises";
import type { CommandRunner, FileProber, FileProbeResult } from "../types/pipeline.js";

/**
 * CommandRunner that executes real shell commands via child_process.
 */
export function createRealCommandRunner(): CommandRunner {
  return {
    run(command: string, args: string[]): Promise<{ exitCode: number; stdout: string; stderr: string }> {
      return new Promise((resolve) => {
        execFile(command, args, { maxBuffer: 50 * 1024 * 1024 }, (error, stdout, stderr) => {
          const exitCode = error ? (error as any).code ?? 1 : 0;
          resolve({ exitCode, stdout, stderr });
        });
      });
    },
  };
}

/**
 * FileProber that executes real ffprobe to inspect media files.
 *
 * Parses ffprobe JSON output into FileProbeResult.
 * Handles ffprobe's multi-format format_name (e.g., "mov,mp4,m4a,3gp,3g2,mj2" → "mp4").
 */
export function createRealFileProber(): FileProber {
  return {
    async probe(filePath: string): Promise<FileProbeResult> {
      const { stdout, exitCode } = await new Promise<{ stdout: string; exitCode: number }>((resolve) => {
        execFile(
          "ffprobe",
          [
            "-v", "quiet",
            "-print_format", "json",
            "-show_format",
            "-show_streams",
            filePath,
          ],
          { maxBuffer: 10 * 1024 * 1024 },
          (error, stdout) => {
            resolve({ stdout, exitCode: error ? 1 : 0 });
          },
        );
      });

      if (exitCode !== 0 || !stdout.trim()) {
        throw new Error(`ffprobe failed for ${filePath}`);
      }

      const data = JSON.parse(stdout);

      // Find video stream
      const videoStream = data.streams?.find((s: any) => s.codec_type === "video");

      // Parse format — ffprobe returns comma-separated list like "mov,mp4,m4a,3gp,3g2,mj2"
      const formatName: string = data.format?.format_name ?? "unknown";
      const format = parseFormatName(formatName);

      // Get file size from fs.stat (more reliable than ffprobe's format.size)
      const fileStat = await stat(filePath);

      return {
        file_path: filePath,
        format,
        codec: videoStream?.codec_name ?? "unknown",
        width: videoStream?.width ?? 0,
        height: videoStream?.height ?? 0,
        duration_seconds: parseFloat(data.format?.duration ?? "0"),
        file_size_bytes: fileStat.size,
      };
    },
  };
}

/**
 * Parse ffprobe's format_name into our simplified format string.
 * "mov,mp4,m4a,3gp,3g2,mj2" → "mp4"
 * "png_pipe" → "png"
 * "image2" → "jpg" (if the file extension is .jpg)
 */
function parseFormatName(formatName: string): string {
  const parts = formatName.split(",");

  // Check for known formats in priority order
  if (parts.includes("mp4")) return "mp4";
  if (parts.includes("png") || formatName.includes("png")) return "png";
  if (parts.includes("jpg") || parts.includes("jpeg")) return "jpg";

  // Fallback to first part
  return parts[0];
}
