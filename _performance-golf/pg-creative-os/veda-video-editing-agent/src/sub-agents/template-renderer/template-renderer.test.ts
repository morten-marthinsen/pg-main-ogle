import { describe, it, expect } from "vitest";
import {
  render,
  buildCtaEndCardArgs,
  buildCaptionOverlayArgs,
  buildLowerThirdArgs,
  buildCopyFrameworkArgs,
  validateTemplateParams,
  escapeFfmpegText,
  estimateAddedDuration,
} from "./index.js";
import type {
  CommandRunner,
  TemplateParams,
  TemplateRendererInput,
} from "../../types/pipeline.js";

// ── Mock CommandRunner ──────────────────────────────────────────────────────

function createMockRunner(
  exitCode = 0,
  stderr = "",
): CommandRunner & { calls: { command: string; args: string[] }[] } {
  const calls: { command: string; args: string[] }[] = [];
  return {
    calls,
    run: async (command: string, args: string[]) => {
      calls.push({ command, args });
      return { exitCode, stdout: "", stderr };
    },
  };
}

function throwingRunner(errorMessage: string): CommandRunner {
  return {
    run: async () => {
      throw new Error(errorMessage);
    },
  };
}

// ── Standard test data ──────────────────────────────────────────────────────

const RESOLUTION = { width: 1080, height: 1920 };

const CTA_TEMPLATE: Extract<TemplateParams, { type: "cta_end_card" }> = {
  type: "cta_end_card",
  cta_text: "Take The 1-Min Quiz Now",
  duration_seconds: 5,
};

const CAPTION_TEMPLATE: Extract<TemplateParams, { type: "caption_overlay" }> = {
  type: "caption_overlay",
  caption_style: "bold",
  transcript_segments: [
    { start_time: 0, end_time: 3, text: "Welcome to the lesson" },
    { start_time: 3, end_time: 7, text: "Today we learn the secret" },
  ],
};

const LOWER_THIRD_TEMPLATE: Extract<TemplateParams, { type: "lower_third" }> = {
  type: "lower_third",
  headline: "Mike Malaska",
  subline: "PGA Tour Coach",
  duration_seconds: 5,
  show_at_seconds: 2,
};

const COPY_FRAMEWORK_TEMPLATE: Extract<TemplateParams, { type: "copy_framework" }> = {
  type: "copy_framework",
  framework_text: ["Problem: Slicing off the tee", "Solution: The Cheat Code Drill"],
  display_duration_seconds: 4,
};

// ── escapeFfmpegText ────────────────────────────────────────────────────────

describe("escapeFfmpegText", () => {
  it("escapes single quotes", () => {
    const result = escapeFfmpegText("it's great");
    expect(result).toBe("it\\'s great");
  });

  it("escapes colons", () => {
    const result = escapeFfmpegText("time: 5:00");
    expect(result).toBe("time\\: 5\\:00");
  });

  it("escapes semicolons", () => {
    const result = escapeFfmpegText("a;b");
    expect(result).toBe("a\\;b");
  });

  it("escapes backslashes", () => {
    const result = escapeFfmpegText("back\\slash");
    expect(result).toBe("back\\\\slash");
  });

  it("returns plain text unchanged", () => {
    const result = escapeFfmpegText("Hello World");
    expect(result).toBe("Hello World");
  });
});

// ── estimateAddedDuration ───────────────────────────────────────────────────

describe("estimateAddedDuration", () => {
  it("returns 0 for overlay-only templates", () => {
    expect(estimateAddedDuration([CAPTION_TEMPLATE, LOWER_THIRD_TEMPLATE])).toBe(0);
  });

  it("returns CTA duration for CTA end card", () => {
    expect(estimateAddedDuration([CTA_TEMPLATE])).toBe(5);
  });

  it("sums multiple CTA durations", () => {
    const cta2 = { ...CTA_TEMPLATE, duration_seconds: 8 };
    expect(estimateAddedDuration([CTA_TEMPLATE, cta2])).toBe(13);
  });

  it("ignores non-CTA templates in sum", () => {
    expect(estimateAddedDuration([CAPTION_TEMPLATE, CTA_TEMPLATE, LOWER_THIRD_TEMPLATE])).toBe(5);
  });
});

// ── validateTemplateParams ──────────────────────────────────────────────────

describe("validateTemplateParams", () => {
  describe("cta_end_card", () => {
    it("passes valid CTA", () => {
      expect(validateTemplateParams(CTA_TEMPLATE)).toHaveLength(0);
    });

    it("fails on empty CTA text", () => {
      const bad = { ...CTA_TEMPLATE, cta_text: "" };
      const errs = validateTemplateParams(bad);
      expect(errs.length).toBeGreaterThan(0);
      expect(errs[0]).toContain("required");
    });

    it("fails on whitespace-only CTA text", () => {
      const bad = { ...CTA_TEMPLATE, cta_text: "   " };
      const errs = validateTemplateParams(bad);
      expect(errs[0]).toContain("required");
    });

    it("fails on too-long CTA text", () => {
      const bad = { ...CTA_TEMPLATE, cta_text: "A".repeat(61) };
      const errs = validateTemplateParams(bad);
      expect(errs[0]).toContain("exceeds");
    });

    it("fails on duration too short", () => {
      const bad = { ...CTA_TEMPLATE, duration_seconds: 2 };
      const errs = validateTemplateParams(bad);
      expect(errs[0]).toContain("outside valid range");
    });

    it("fails on duration too long", () => {
      const bad = { ...CTA_TEMPLATE, duration_seconds: 11 };
      const errs = validateTemplateParams(bad);
      expect(errs[0]).toContain("outside valid range");
    });

    it("passes at boundary durations (3s and 10s)", () => {
      expect(validateTemplateParams({ ...CTA_TEMPLATE, duration_seconds: 3 })).toHaveLength(0);
      expect(validateTemplateParams({ ...CTA_TEMPLATE, duration_seconds: 10 })).toHaveLength(0);
    });
  });

  describe("caption_overlay", () => {
    it("passes valid captions", () => {
      expect(validateTemplateParams(CAPTION_TEMPLATE)).toHaveLength(0);
    });

    it("fails with no segments", () => {
      const bad = { ...CAPTION_TEMPLATE, transcript_segments: [] };
      const errs = validateTemplateParams(bad);
      expect(errs[0]).toContain("at least one");
    });
  });

  describe("lower_third", () => {
    it("passes valid lower third", () => {
      expect(validateTemplateParams(LOWER_THIRD_TEMPLATE)).toHaveLength(0);
    });

    it("fails on empty headline", () => {
      const bad = { ...LOWER_THIRD_TEMPLATE, headline: "" };
      const errs = validateTemplateParams(bad);
      expect(errs[0]).toContain("required");
    });

    it("fails on too-long headline", () => {
      const bad = { ...LOWER_THIRD_TEMPLATE, headline: "A".repeat(41) };
      const errs = validateTemplateParams(bad);
      expect(errs[0]).toContain("exceeds");
    });

    it("fails on too-long subline", () => {
      const bad = { ...LOWER_THIRD_TEMPLATE, subline: "B".repeat(61) };
      const errs = validateTemplateParams(bad);
      expect(errs[0]).toContain("exceeds");
    });

    it("fails on zero duration", () => {
      const bad = { ...LOWER_THIRD_TEMPLATE, duration_seconds: 0 };
      const errs = validateTemplateParams(bad);
      expect(errs[0]).toContain("duration must be > 0");
    });

    it("fails on negative show_at", () => {
      const bad = { ...LOWER_THIRD_TEMPLATE, show_at_seconds: -1 };
      const errs = validateTemplateParams(bad);
      expect(errs[0]).toContain("must be >= 0");
    });
  });

  describe("copy_framework", () => {
    it("passes valid copy framework", () => {
      expect(validateTemplateParams(COPY_FRAMEWORK_TEMPLATE)).toHaveLength(0);
    });

    it("fails with no text lines", () => {
      const bad = { ...COPY_FRAMEWORK_TEMPLATE, framework_text: [] };
      const errs = validateTemplateParams(bad);
      expect(errs[0]).toContain("at least one");
    });

    it("fails on too-long line", () => {
      const bad = { ...COPY_FRAMEWORK_TEMPLATE, framework_text: ["X".repeat(81)] };
      const errs = validateTemplateParams(bad);
      expect(errs[0]).toContain("exceeds");
    });

    it("fails on zero display duration", () => {
      const bad = { ...COPY_FRAMEWORK_TEMPLATE, display_duration_seconds: 0 };
      const errs = validateTemplateParams(bad);
      expect(errs[0]).toContain("must be > 0");
    });
  });
});

// ── buildCtaEndCardArgs ─────────────────────────────────────────────────────

describe("buildCtaEndCardArgs", () => {
  it("generates valid FFmpeg args", () => {
    const args = buildCtaEndCardArgs("/input.mp4", CTA_TEMPLATE, RESOLUTION, "/output.mp4");
    expect(args).toContain("-i");
    expect(args).toContain("/input.mp4");
    expect(args).toContain("-filter_complex");
    expect(args).toContain("/output.mp4");
    expect(args).toContain("-y");
  });

  it("includes CTA text in filter", () => {
    const args = buildCtaEndCardArgs("/input.mp4", CTA_TEMPLATE, RESOLUTION, "/output.mp4");
    const filterIdx = args.indexOf("-filter_complex");
    const filter = args[filterIdx + 1];
    expect(filter).toContain("drawtext");
    expect(filter).toContain("concat=n=2");
  });

  it("uses custom colors when provided", () => {
    const custom = { ...CTA_TEMPLATE, background_color: "#FF0000", text_color: "#00FF00" };
    const args = buildCtaEndCardArgs("/input.mp4", custom, RESOLUTION, "/output.mp4");
    const filter = args[args.indexOf("-filter_complex") + 1];
    expect(filter).toContain("#FF0000");
    expect(filter).toContain("#00FF00");
  });

  it("uses custom font size", () => {
    const custom = { ...CTA_TEMPLATE, font_size: 64 };
    const args = buildCtaEndCardArgs("/input.mp4", custom, RESOLUTION, "/output.mp4");
    const filter = args[args.indexOf("-filter_complex") + 1];
    expect(filter).toContain("fontsize=64");
  });
});

// ── buildCaptionOverlayArgs ─────────────────────────────────────────────────

describe("buildCaptionOverlayArgs", () => {
  it("generates drawtext filters for each segment", () => {
    const args = buildCaptionOverlayArgs("/input.mp4", CAPTION_TEMPLATE, RESOLUTION, "/output.mp4");
    const filterIdx = args.indexOf("-vf");
    const filter = args[filterIdx + 1];
    expect(filter).toContain("drawtext");
    expect(filter).toContain("enable='between(t,0,3)'");
    expect(filter).toContain("enable='between(t,3,7)'");
  });

  it("positions at bottom by default", () => {
    const args = buildCaptionOverlayArgs("/input.mp4", CAPTION_TEMPLATE, RESOLUTION, "/output.mp4");
    const filter = args[args.indexOf("-vf") + 1];
    expect(filter).toContain("h-text_h-");
  });

  it("positions at top when specified", () => {
    const top = { ...CAPTION_TEMPLATE, position: "top" as const };
    const args = buildCaptionOverlayArgs("/input.mp4", top, RESOLUTION, "/output.mp4");
    const filter = args[args.indexOf("-vf") + 1];
    // Top position uses just the font size as y value
    expect(filter).toContain("y=36");
  });

  it("positions at center when specified", () => {
    const center = { ...CAPTION_TEMPLATE, position: "center" as const };
    const args = buildCaptionOverlayArgs("/input.mp4", center, RESOLUTION, "/output.mp4");
    const filter = args[args.indexOf("-vf") + 1];
    expect(filter).toContain("(h-text_h)/2");
  });
});

// ── buildLowerThirdArgs ─────────────────────────────────────────────────────

describe("buildLowerThirdArgs", () => {
  it("generates drawbox and drawtext filters", () => {
    const args = buildLowerThirdArgs("/input.mp4", LOWER_THIRD_TEMPLATE, RESOLUTION, "/output.mp4");
    const filter = args[args.indexOf("-vf") + 1];
    expect(filter).toContain("drawbox");
    expect(filter).toContain("drawtext");
  });

  it("includes headline text", () => {
    const args = buildLowerThirdArgs("/input.mp4", LOWER_THIRD_TEMPLATE, RESOLUTION, "/output.mp4");
    const filter = args[args.indexOf("-vf") + 1];
    expect(filter).toContain("Mike Malaska");
  });

  it("includes subline when provided", () => {
    const args = buildLowerThirdArgs("/input.mp4", LOWER_THIRD_TEMPLATE, RESOLUTION, "/output.mp4");
    const filter = args[args.indexOf("-vf") + 1];
    expect(filter).toContain("PGA Tour Coach");
  });

  it("omits subline drawtext when no subline", () => {
    const noSub = { ...LOWER_THIRD_TEMPLATE, subline: undefined };
    const args = buildLowerThirdArgs("/input.mp4", noSub, RESOLUTION, "/output.mp4");
    const filter = args[args.indexOf("-vf") + 1];
    // Should have drawbox + 1 drawtext (headline only)
    const drawCount = (filter.match(/drawtext/g) || []).length;
    expect(drawCount).toBe(1);
  });

  it("uses correct enable timing", () => {
    const args = buildLowerThirdArgs("/input.mp4", LOWER_THIRD_TEMPLATE, RESOLUTION, "/output.mp4");
    const filter = args[args.indexOf("-vf") + 1];
    expect(filter).toContain("between(t,2,7)");
  });
});

// ── buildCopyFrameworkArgs ──────────────────────────────────────────────────

describe("buildCopyFrameworkArgs", () => {
  it("generates drawbox + drawtext for each line", () => {
    const args = buildCopyFrameworkArgs("/input.mp4", COPY_FRAMEWORK_TEMPLATE, RESOLUTION, "/output.mp4");
    const filter = args[args.indexOf("-vf") + 1];
    const drawboxCount = (filter.match(/drawbox/g) || []).length;
    const drawtextCount = (filter.match(/drawtext/g) || []).length;
    expect(drawboxCount).toBe(2); // 2 lines = 2 backgrounds
    expect(drawtextCount).toBe(2); // 2 lines = 2 text overlays
  });

  it("times slides sequentially", () => {
    const args = buildCopyFrameworkArgs("/input.mp4", COPY_FRAMEWORK_TEMPLATE, RESOLUTION, "/output.mp4");
    const filter = args[args.indexOf("-vf") + 1];
    expect(filter).toContain("between(t,0,4)"); // First slide: 0-4s
    expect(filter).toContain("between(t,4,8)"); // Second slide: 4-8s
  });

  it("uses custom font size", () => {
    const custom = { ...COPY_FRAMEWORK_TEMPLATE, font_size: 56 };
    const args = buildCopyFrameworkArgs("/input.mp4", custom, RESOLUTION, "/output.mp4");
    const filter = args[args.indexOf("-vf") + 1];
    expect(filter).toContain("fontsize=56");
  });
});

// ── render (main entry point) ───────────────────────────────────────────────

describe("render", () => {
  const baseInput: TemplateRendererInput = {
    source_file: "/input/video.mp4",
    templates: [CTA_TEMPLATE],
    output_file: "/output/rendered.mp4",
    resolution: RESOLUTION,
  };

  it("SUCCESS with single CTA template", async () => {
    const runner = createMockRunner();
    const result = await render(baseInput, runner);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.rendered_files).toHaveLength(1);
    expect(result.data.rendered_files[0].templates_applied).toEqual(["cta_end_card"]);
    expect(result.data.rendered_files[0].file_path).toBe("/output/rendered.mp4");
  });

  it("SUCCESS with single caption overlay", async () => {
    const runner = createMockRunner();
    const input = { ...baseInput, templates: [CAPTION_TEMPLATE] };
    const result = await render(input, runner);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.rendered_files[0].templates_applied).toEqual(["caption_overlay"]);
  });

  it("executes FFmpeg via runner", async () => {
    const runner = createMockRunner();
    await render(baseInput, runner);
    expect(runner.calls).toHaveLength(1);
    expect(runner.calls[0].command).toBe("ffmpeg");
  });

  it("applies multiple templates sequentially", async () => {
    const runner = createMockRunner();
    const input = {
      ...baseInput,
      templates: [CAPTION_TEMPLATE, LOWER_THIRD_TEMPLATE, CTA_TEMPLATE],
    };
    const result = await render(input, runner);
    expect(result.status).toBe("SUCCESS");
    expect(runner.calls).toHaveLength(3);
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    // CTA should be applied last (sorted)
    expect(result.data.rendered_files[0].templates_applied).toEqual([
      "caption_overlay",
      "lower_third",
      "cta_end_card",
    ]);
  });

  it("sorts CTA end card to last position", async () => {
    const runner = createMockRunner();
    const input = {
      ...baseInput,
      templates: [CTA_TEMPLATE, CAPTION_TEMPLATE],
    };
    const result = await render(input, runner);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.rendered_files[0].templates_applied).toEqual([
      "caption_overlay",
      "cta_end_card",
    ]);
  });

  it("reports added duration from CTA", async () => {
    const runner = createMockRunner();
    const result = await render(baseInput, runner);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.rendered_files[0].duration_seconds).toBe(5);
  });

  it("reports zero added duration for overlays only", async () => {
    const runner = createMockRunner();
    const input = { ...baseInput, templates: [CAPTION_TEMPLATE] };
    const result = await render(input, runner);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.rendered_files[0].duration_seconds).toBe(0);
  });

  // ── Validation errors ──────────────────────────────────────────────────

  it("FAILED on missing source_file", async () => {
    const runner = createMockRunner();
    const input = { ...baseInput, source_file: "" };
    const result = await render(input, runner);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("source_file");
  });

  it("FAILED on empty templates array", async () => {
    const runner = createMockRunner();
    const input = { ...baseInput, templates: [] };
    const result = await render(input, runner);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("template");
  });

  it("FAILED on missing output_file", async () => {
    const runner = createMockRunner();
    const input = { ...baseInput, output_file: "" };
    const result = await render(input, runner);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("output_file");
  });

  it("FAILED on invalid resolution", async () => {
    const runner = createMockRunner();
    const input = { ...baseInput, resolution: { width: 0, height: 1920 } };
    const result = await render(input, runner);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("resolution");
  });

  it("FAILED on invalid template params", async () => {
    const runner = createMockRunner();
    const badCta = { ...CTA_TEMPLATE, cta_text: "", duration_seconds: 0 };
    const input = { ...baseInput, templates: [badCta] };
    const result = await render(input, runner);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.error_category).toBe("EDIT_ERROR");
  });

  // ── FFmpeg errors ─────────────────────────────────────────────────────

  it("FAILED when FFmpeg throws", async () => {
    const runner = throwingRunner("FFmpeg not found");
    const result = await render(baseInput, runner);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("FFmpeg not found");
  });

  it("FAILED when FFmpeg exits non-zero", async () => {
    const runner = createMockRunner(1, "Error: invalid filter");
    const result = await render(baseInput, runner);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("exited with code 1");
  });

  // ── Copy framework ────────────────────────────────────────────────────

  it("SUCCESS with copy framework template", async () => {
    const runner = createMockRunner();
    const input = { ...baseInput, templates: [COPY_FRAMEWORK_TEMPLATE] };
    const result = await render(input, runner);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.rendered_files[0].templates_applied).toEqual(["copy_framework"]);
  });

  // ── Lower third ───────────────────────────────────────────────────────

  it("SUCCESS with lower third template", async () => {
    const runner = createMockRunner();
    const input = { ...baseInput, templates: [LOWER_THIRD_TEMPLATE] };
    const result = await render(input, runner);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.rendered_files[0].templates_applied).toEqual(["lower_third"]);
  });
});

// ── Integration ─────────────────────────────────────────────────────────────

describe("integration", () => {
  it("full pipeline: captions + lower third + CTA", async () => {
    const runner = createMockRunner();
    const input: TemplateRendererInput = {
      source_file: "/output/357-0073-v0006.mp4",
      templates: [
        CAPTION_TEMPLATE,
        LOWER_THIRD_TEMPLATE,
        CTA_TEMPLATE,
      ],
      output_file: "/output/357-0073-v0006-rendered.mp4",
      resolution: RESOLUTION,
    };

    const result = await render(input, runner);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");

    // 3 FFmpeg calls (one per template)
    expect(runner.calls).toHaveLength(3);

    // All templates applied
    expect(result.data.rendered_files[0].templates_applied).toEqual([
      "caption_overlay",
      "lower_third",
      "cta_end_card",
    ]);

    // Duration includes CTA addition
    expect(result.data.rendered_files[0].duration_seconds).toBe(5);
  });

  it("copy framework + CTA pipeline", async () => {
    const runner = createMockRunner();
    const input: TemplateRendererInput = {
      source_file: "/output/variation.mp4",
      templates: [
        COPY_FRAMEWORK_TEMPLATE,
        { ...CTA_TEMPLATE, duration_seconds: 8 },
      ],
      output_file: "/output/variation-rendered.mp4",
      resolution: { width: 1080, height: 1350 },
    };

    const result = await render(input, runner);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.rendered_files[0].duration_seconds).toBe(8);
    expect(result.data.rendered_files[0].templates_applied).toEqual([
      "copy_framework",
      "cta_end_card",
    ]);
  });
});
