/**
 * template_renderer — Veda's finishing specialist.
 *
 * After the editors create the core video, applies the final layers:
 * text overlays, captions, CTA end cards, lower thirds, branding elements,
 * and copy framework overlays.
 *
 * Knows Performance Golf's visual language. CTA end cards: 5-8s standard.
 * Caption styles: bold, readable, positioned for mobile-first viewing.
 * Overlays must not obscure talent's face or key visual elements.
 *
 * Pipeline Position: Between Step 5 and Step 6 (post-edit, pre-export)
 *
 * Uses CommandRunner abstraction so FFmpeg overlay commands can be tested
 * without actually executing them.
 */

import type {
  CommandRunner,
  TemplateRendererInput,
  TemplateRendererOutput,
  TemplateParams,
  RenderedFile,
  TemplateType,
} from "../../types/pipeline.js";
import type { SubAgentResult } from "../../types/sub-agent.js";

// ── Constants ───────────────────────────────────────────────────────────────

const MAX_CTA_TEXT_LENGTH = 60;
const MAX_HEADLINE_LENGTH = 40;
const MAX_SUBLINE_LENGTH = 60;
const MAX_FRAMEWORK_LINE_LENGTH = 80;
const MIN_CTA_DURATION = 3;
const MAX_CTA_DURATION = 10;

// ── FFmpeg Command Builders ─────────────────────────────────────────────────

/**
 * Build FFmpeg args for a CTA end card.
 * Appends a solid-color card with centered text at the end of the video.
 */
export function buildCtaEndCardArgs(
  sourceFile: string,
  params: Extract<TemplateParams, { type: "cta_end_card" }>,
  resolution: { width: number; height: number },
  outputFile: string,
): string[] {
  const bgColor = params.background_color ?? "#000000";
  const textColor = params.text_color ?? "#FFFFFF";
  const fontSize = params.font_size ?? 48;
  const duration = params.duration_seconds;

  // Generate a solid color video for the CTA card, draw text, concat with source
  const filterComplex = [
    // CTA card: solid color with centered text
    `color=c=${bgColor}:s=${resolution.width}x${resolution.height}:d=${duration}:r=30,` +
      `drawtext=text='${escapeFfmpegText(params.cta_text)}':` +
      `fontsize=${fontSize}:fontcolor=${textColor}:` +
      `x=(w-text_w)/2:y=(h-text_h)/2[cta]`,
    // Generate silence for CTA duration
    `anullsrc=r=44100:cl=stereo,atrim=duration=${duration}[ctaa]`,
    // Concat source + CTA
    `[0:v][0:a][cta][ctaa]concat=n=2:v=1:a=1[outv][outa]`,
  ].join(";");

  return [
    "-i", sourceFile,
    "-filter_complex", filterComplex,
    "-map", "[outv]",
    "-map", "[outa]",
    "-c:v", "libx264",
    "-c:a", "aac",
    "-y",
    outputFile,
  ];
}

/**
 * Build FFmpeg args for caption overlays.
 * Uses drawtext filter to burn captions into the video at timed intervals.
 */
export function buildCaptionOverlayArgs(
  sourceFile: string,
  params: Extract<TemplateParams, { type: "caption_overlay" }>,
  resolution: { width: number; height: number },
  outputFile: string,
): string[] {
  const fontSize = params.font_size ?? 36;
  const textColor = params.text_color ?? "#FFFFFF";
  const outlineColor = params.outline_color ?? "#000000";

  // Position mapping
  const yExpr =
    params.position === "top" ? `${fontSize}` :
    params.position === "center" ? "(h-text_h)/2" :
    `h-text_h-${fontSize}`; // default: bottom

  // Build drawtext filter for each segment
  const drawFilters = params.transcript_segments.map((seg) => {
    const escaped = escapeFfmpegText(seg.text);
    return `drawtext=text='${escaped}':` +
      `fontsize=${fontSize}:fontcolor=${textColor}:` +
      `borderw=2:bordercolor=${outlineColor}:` +
      `x=(w-text_w)/2:y=${yExpr}:` +
      `enable='between(t,${seg.start_time},${seg.end_time})'`;
  });

  return [
    "-i", sourceFile,
    "-vf", drawFilters.join(","),
    "-c:v", "libx264",
    "-c:a", "aac",
    "-y",
    outputFile,
  ];
}

/**
 * Build FFmpeg args for a lower third overlay.
 * Semi-transparent background bar with headline (+ optional subline).
 */
export function buildLowerThirdArgs(
  sourceFile: string,
  params: Extract<TemplateParams, { type: "lower_third" }>,
  resolution: { width: number; height: number },
  outputFile: string,
): string[] {
  const textColor = params.text_color ?? "#FFFFFF";
  const barHeight = params.subline ? 100 : 60;
  const barY = resolution.height - barHeight - 40;
  const endTime = params.show_at_seconds + params.duration_seconds;

  const filters: string[] = [];

  // Semi-transparent background bar
  filters.push(
    `drawbox=x=0:y=${barY}:w=${resolution.width}:h=${barHeight}:` +
    `color=black@0.6:t=fill:` +
    `enable='between(t,${params.show_at_seconds},${endTime})'`,
  );

  // Headline text
  filters.push(
    `drawtext=text='${escapeFfmpegText(params.headline)}':` +
    `fontsize=32:fontcolor=${textColor}:` +
    `x=40:y=${barY + 10}:` +
    `enable='between(t,${params.show_at_seconds},${endTime})'`,
  );

  // Optional subline
  if (params.subline) {
    filters.push(
      `drawtext=text='${escapeFfmpegText(params.subline)}':` +
      `fontsize=24:fontcolor=${textColor}@0.8:` +
      `x=40:y=${barY + 50}:` +
      `enable='between(t,${params.show_at_seconds},${endTime})'`,
    );
  }

  return [
    "-i", sourceFile,
    "-vf", filters.join(","),
    "-c:v", "libx264",
    "-c:a", "aac",
    "-y",
    outputFile,
  ];
}

/**
 * Build FFmpeg args for a copy framework overlay.
 * Displays framework text lines over a semi-transparent background.
 */
export function buildCopyFrameworkArgs(
  sourceFile: string,
  params: Extract<TemplateParams, { type: "copy_framework" }>,
  resolution: { width: number; height: number },
  outputFile: string,
): string[] {
  const fontSize = params.font_size ?? 42;
  const textColor = params.text_color ?? "#FFFFFF";
  const opacity = params.background_opacity ?? 0.5;
  const durationPerSlide = params.display_duration_seconds;

  const filters: string[] = [];

  for (let i = 0; i < params.framework_text.length; i++) {
    const startTime = i * durationPerSlide;
    const endTime = startTime + durationPerSlide;
    const text = escapeFfmpegText(params.framework_text[i]);

    // Semi-transparent background for readability
    filters.push(
      `drawbox=x=0:y=${resolution.height / 2 - fontSize}:` +
      `w=${resolution.width}:h=${fontSize * 2 + 20}:` +
      `color=black@${opacity}:t=fill:` +
      `enable='between(t,${startTime},${endTime})'`,
    );

    // Text line
    filters.push(
      `drawtext=text='${text}':` +
      `fontsize=${fontSize}:fontcolor=${textColor}:` +
      `x=(w-text_w)/2:y=(h-text_h)/2:` +
      `enable='between(t,${startTime},${endTime})'`,
    );
  }

  return [
    "-i", sourceFile,
    "-vf", filters.join(","),
    "-c:v", "libx264",
    "-c:a", "aac",
    "-y",
    outputFile,
  ];
}

// ── Validation ──────────────────────────────────────────────────────────────

/**
 * Validate template parameters before rendering.
 * Returns an array of error messages (empty = valid).
 */
export function validateTemplateParams(params: TemplateParams): string[] {
  const errors: string[] = [];

  switch (params.type) {
    case "cta_end_card":
      if (!params.cta_text || params.cta_text.trim().length === 0) {
        errors.push("CTA text is required");
      } else if (params.cta_text.length > MAX_CTA_TEXT_LENGTH) {
        errors.push(
          `CTA text exceeds ${MAX_CTA_TEXT_LENGTH} chars (${params.cta_text.length}) — may overflow template`,
        );
      }
      if (params.duration_seconds < MIN_CTA_DURATION || params.duration_seconds > MAX_CTA_DURATION) {
        errors.push(
          `CTA duration ${params.duration_seconds}s outside valid range (${MIN_CTA_DURATION}-${MAX_CTA_DURATION}s)`,
        );
      }
      break;

    case "caption_overlay":
      if (!params.transcript_segments || params.transcript_segments.length === 0) {
        errors.push("Caption overlay requires at least one transcript segment");
      }
      break;

    case "lower_third":
      if (!params.headline || params.headline.trim().length === 0) {
        errors.push("Lower third headline is required");
      } else if (params.headline.length > MAX_HEADLINE_LENGTH) {
        errors.push(
          `Headline exceeds ${MAX_HEADLINE_LENGTH} chars (${params.headline.length}) — may overflow`,
        );
      }
      if (params.subline && params.subline.length > MAX_SUBLINE_LENGTH) {
        errors.push(
          `Subline exceeds ${MAX_SUBLINE_LENGTH} chars (${params.subline.length}) — may overflow`,
        );
      }
      if (params.duration_seconds <= 0) {
        errors.push("Lower third duration must be > 0");
      }
      if (params.show_at_seconds < 0) {
        errors.push("Lower third show_at_seconds must be >= 0");
      }
      break;

    case "copy_framework":
      if (!params.framework_text || params.framework_text.length === 0) {
        errors.push("Copy framework requires at least one text line");
      } else {
        for (let i = 0; i < params.framework_text.length; i++) {
          if (params.framework_text[i].length > MAX_FRAMEWORK_LINE_LENGTH) {
            errors.push(
              `Framework line ${i + 1} exceeds ${MAX_FRAMEWORK_LINE_LENGTH} chars (${params.framework_text[i].length})`,
            );
          }
        }
      }
      if (params.display_duration_seconds <= 0) {
        errors.push("Copy framework display_duration_seconds must be > 0");
      }
      break;
  }

  return errors;
}

// ── Utilities ───────────────────────────────────────────────────────────────

/**
 * Escape text for FFmpeg drawtext filter.
 * Single quotes, colons, backslashes, and semicolons need escaping.
 */
export function escapeFfmpegText(text: string): string {
  // Single-level escaping for FFmpeg filter parser via execFile (no shell).
  // Within drawtext text='...': \\ = literal \, \: = literal :, \; = literal ;, \' = literal '
  return text
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/:/g, "\\:")
    .replace(/;/g, "\\;");
}

/**
 * Estimate the additional duration that templates will add to the video.
 * Only CTA end cards add duration (appended); others are overlays.
 */
export function estimateAddedDuration(templates: TemplateParams[]): number {
  let added = 0;
  for (const t of templates) {
    if (t.type === "cta_end_card") {
      added += t.duration_seconds;
    }
  }
  return added;
}

// ── Main Entry Point ────────────────────────────────────────────────────────

/**
 * Render templates onto a video file.
 *
 * Applies templates sequentially — each template's output becomes the
 * next template's input. CTA end cards are applied last (they add duration).
 */
export async function render(
  input: TemplateRendererInput,
  runner: CommandRunner,
): Promise<SubAgentResult<TemplateRendererOutput>> {
  // Validate inputs
  if (!input.source_file) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "source_file is required",
      recovery_action: "halt",
      context: { step: "template_renderer" },
    };
  }

  if (!input.templates || input.templates.length === 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "At least one template is required",
      recovery_action: "halt",
      context: { step: "template_renderer" },
    };
  }

  if (!input.output_file) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "output_file is required",
      recovery_action: "halt",
      context: { step: "template_renderer" },
    };
  }

  if (!input.resolution || input.resolution.width <= 0 || input.resolution.height <= 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "Valid resolution is required (width and height > 0)",
      recovery_action: "halt",
      context: { step: "template_renderer" },
    };
  }

  // Validate all template params upfront
  const allErrors: string[] = [];
  for (const t of input.templates) {
    const errs = validateTemplateParams(t);
    allErrors.push(...errs.map((e) => `[${t.type}] ${e}`));
  }

  if (allErrors.length > 0) {
    return {
      status: "FAILED",
      error_category: "EDIT_ERROR",
      severity: "error",
      message: `Template validation failed: ${allErrors.join("; ")}`,
      recovery_action: "halt",
      context: { step: "template_renderer" },
    };
  }

  // Sort templates: overlays first, CTA end card last (it adds duration)
  const sorted = [...input.templates].sort((a, b) => {
    if (a.type === "cta_end_card") return 1;
    if (b.type === "cta_end_card") return -1;
    return 0;
  });

  const warnings: string[] = [];
  const appliedTypes: TemplateType[] = [];
  let currentInput = input.source_file;
  let baseDuration = 0; // Will be set after we know it

  // Apply templates sequentially
  for (let i = 0; i < sorted.length; i++) {
    const template = sorted[i];
    const isLast = i === sorted.length - 1;
    const currentOutput = isLast
      ? input.output_file
      : input.output_file.replace(/\.mp4$/, `_temp_${i}.mp4`);

    let args: string[];

    switch (template.type) {
      case "cta_end_card":
        args = buildCtaEndCardArgs(currentInput, template, input.resolution, currentOutput);
        break;
      case "caption_overlay":
        args = buildCaptionOverlayArgs(currentInput, template, input.resolution, currentOutput);
        break;
      case "lower_third":
        args = buildLowerThirdArgs(currentInput, template, input.resolution, currentOutput);
        break;
      case "copy_framework":
        args = buildCopyFrameworkArgs(currentInput, template, input.resolution, currentOutput);
        break;
    }

    // Execute FFmpeg
    let result: { exitCode: number; stdout: string; stderr: string };
    try {
      result = await runner.run("ffmpeg", args);
    } catch (err) {
      return {
        status: "FAILED",
        error_category: "EDIT_ERROR",
        severity: "error",
        message: `FFmpeg execution failed for ${template.type}: ${err instanceof Error ? err.message : String(err)}`,
        recovery_action: "halt",
        context: { step: "template_renderer" },
      };
    }

    if (result.exitCode !== 0) {
      return {
        status: "FAILED",
        error_category: "EDIT_ERROR",
        severity: "error",
        message: `FFmpeg exited with code ${result.exitCode} for ${template.type}: ${result.stderr.slice(0, 500)}`,
        recovery_action: "halt",
        context: { step: "template_renderer" },
      };
    }

    appliedTypes.push(template.type);
    currentInput = currentOutput;
  }

  // Estimate final duration
  const addedDuration = estimateAddedDuration(input.templates);

  return {
    status: "SUCCESS",
    data: {
      rendered_files: [
        {
          file_path: input.output_file,
          templates_applied: appliedTypes,
          duration_seconds: addedDuration, // added duration; base is unknown without probing
        },
      ],
      warnings,
    },
  };
}
