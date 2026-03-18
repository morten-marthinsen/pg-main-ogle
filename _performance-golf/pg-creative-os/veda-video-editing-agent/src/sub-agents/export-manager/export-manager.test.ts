import { describe, it, expect } from "vitest";
import { validateFile, validateExports } from "./index.js";
import type {
  FileProber,
  FileProbeResult,
  ExportTargetSpec,
} from "../../types/pipeline.js";

// ── Mock FileProber ─────────────────────────────────────────────────────────

function createMockProber(
  results: Record<string, FileProbeResult>,
): FileProber {
  return {
    probe: async (filePath: string) => {
      const result = results[filePath];
      if (!result) throw new Error(`File not found: ${filePath}`);
      return result;
    },
  };
}

// ── Standard probe results ──────────────────────────────────────────────────

const VALID_VIDEO: FileProbeResult = {
  file_path: "/output/variation_1.mp4",
  format: "mp4",
  codec: "h264",
  width: 1080,
  height: 1920,
  duration_seconds: 62,
  file_size_bytes: 180 * 1024 * 1024, // 180MB
};

const VALID_IMAGE: FileProbeResult = {
  file_path: "/output/variation_1.png",
  format: "png",
  codec: "png",
  width: 1080,
  height: 1350,
  duration_seconds: 0,
  file_size_bytes: 2 * 1024 * 1024, // 2MB
};

const VIDEO_SPEC: ExportTargetSpec = {
  format: "mp4",
  codec: "h264",
  width: 1080,
  height: 1920,
  target_duration_seconds: 60,
  duration_tolerance_seconds: 5,
};

const IMAGE_SPEC: ExportTargetSpec = {
  format: "png",
  width: 1080,
  height: 1350,
};

// ── validateFile ────────────────────────────────────────────────────────────

describe("validateFile", () => {
  it("passes valid video file", () => {
    const result = validateFile(VALID_VIDEO, VIDEO_SPEC);
    expect(result.passed).toBe(true);
    expect(result.format_ok).toBe(true);
    expect(result.codec_ok).toBe(true);
    expect(result.resolution_ok).toBe(true);
    expect(result.duration_ok).toBe(true);
    expect(result.file_size_ok).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("passes valid image file", () => {
    const result = validateFile(VALID_IMAGE, IMAGE_SPEC);
    expect(result.passed).toBe(true);
    expect(result.duration_ok).toBe(true); // n/a for images
  });

  it("fails on wrong format", () => {
    const badFormat = { ...VALID_VIDEO, format: "webm" };
    const result = validateFile(badFormat, VIDEO_SPEC);
    expect(result.passed).toBe(false);
    expect(result.format_ok).toBe(false);
    expect(result.errors[0]).toContain("Format mismatch");
  });

  it("fails on wrong codec", () => {
    const badCodec = { ...VALID_VIDEO, codec: "vp9" };
    const result = validateFile(badCodec, VIDEO_SPEC);
    expect(result.passed).toBe(false);
    expect(result.codec_ok).toBe(false);
    expect(result.errors[0]).toContain("Codec mismatch");
  });

  it("fails on wrong resolution", () => {
    const badRes = { ...VALID_VIDEO, width: 1920, height: 1080 };
    const result = validateFile(badRes, VIDEO_SPEC);
    expect(result.passed).toBe(false);
    expect(result.resolution_ok).toBe(false);
    expect(result.errors[0]).toContain("Resolution mismatch");
  });

  it("fails when duration outside tolerance", () => {
    const badDuration = { ...VALID_VIDEO, duration_seconds: 70 };
    const result = validateFile(badDuration, VIDEO_SPEC);
    expect(result.passed).toBe(false);
    expect(result.duration_ok).toBe(false);
    expect(result.errors[0]).toContain("Duration out of tolerance");
  });

  it("passes when duration within tolerance boundary", () => {
    const edgeDuration = { ...VALID_VIDEO, duration_seconds: 65 };
    const result = validateFile(edgeDuration, VIDEO_SPEC);
    expect(result.passed).toBe(true);
    expect(result.duration_ok).toBe(true);
  });

  it("passes when duration exactly on tolerance boundary", () => {
    const exactEdge = { ...VALID_VIDEO, duration_seconds: 55 };
    const result = validateFile(exactEdge, VIDEO_SPEC);
    expect(result.passed).toBe(true);
    expect(result.duration_ok).toBe(true);
  });

  it("warns on large file size", () => {
    const bigFile = {
      ...VALID_VIDEO,
      file_size_bytes: 600 * 1024 * 1024, // 600MB
    };
    const result = validateFile(bigFile, VIDEO_SPEC);
    expect(result.passed).toBe(true); // Warning, not failure
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain("exceeds");
  });

  it("warns and fails on suspiciously small video", () => {
    const tinyFile = {
      ...VALID_VIDEO,
      file_size_bytes: 500 * 1024, // 0.5MB
    };
    const result = validateFile(tinyFile, VIDEO_SPEC);
    expect(result.passed).toBe(false);
    expect(result.file_size_ok).toBe(false);
    expect(result.warnings[0]).toContain("suspiciously small");
  });

  it("does not flag small image size", () => {
    const smallImage = {
      ...VALID_IMAGE,
      file_size_bytes: 50 * 1024, // 50KB — fine for images
    };
    const result = validateFile(smallImage, IMAGE_SPEC);
    expect(result.passed).toBe(true);
    expect(result.file_size_ok).toBe(true);
  });

  it("handles jpg/jpeg equivalence", () => {
    const jpgProbe = { ...VALID_IMAGE, format: "jpeg" };
    const jpgSpec: ExportTargetSpec = { ...IMAGE_SPEC, format: "jpg" };
    const result = validateFile(jpgProbe, jpgSpec);
    expect(result.format_ok).toBe(true);
  });

  it("uses default h264 codec for video when not specified", () => {
    const specNoCodec: ExportTargetSpec = {
      format: "mp4",
      width: 1080,
      height: 1920,
      target_duration_seconds: 60,
    };
    const result = validateFile(VALID_VIDEO, specNoCodec);
    expect(result.codec_ok).toBe(true);
  });

  it("skips duration check for video when no target specified", () => {
    const specNoDuration: ExportTargetSpec = {
      format: "mp4",
      codec: "h264",
      width: 1080,
      height: 1920,
    };
    const result = validateFile(VALID_VIDEO, specNoDuration);
    expect(result.duration_ok).toBe(true);
  });

  it("collects multiple errors for multi-failure file", () => {
    const badEverything: FileProbeResult = {
      file_path: "/bad.webm",
      format: "webm",
      codec: "vp9",
      width: 640,
      height: 480,
      duration_seconds: 200,
      file_size_bytes: 100,
    };
    const result = validateFile(badEverything, VIDEO_SPEC);
    expect(result.passed).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(4);
  });
});

// ── validateExports ─────────────────────────────────────────────────────────

describe("validateExports", () => {
  it("SUCCESS when all files pass", async () => {
    const prober = createMockProber({
      "/output/v1.mp4": VALID_VIDEO,
      "/output/v2.mp4": {
        ...VALID_VIDEO,
        file_path: "/output/v2.mp4",
        duration_seconds: 58,
      },
    });
    const result = await validateExports(
      { files: ["/output/v1.mp4", "/output/v2.mp4"], target_spec: VIDEO_SPEC },
      prober,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.all_passed).toBe(true);
    expect(result.data.file_results).toHaveLength(2);
    expect(result.data.failures).toHaveLength(0);
  });

  it("FAILED when any file fails validation", async () => {
    const prober = createMockProber({
      "/output/v1.mp4": VALID_VIDEO,
      "/output/v2.mp4": {
        ...VALID_VIDEO,
        file_path: "/output/v2.mp4",
        width: 640, // Wrong resolution
      },
    });
    const result = await validateExports(
      { files: ["/output/v1.mp4", "/output/v2.mp4"], target_spec: VIDEO_SPEC },
      prober,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.error_category).toBe("OUTPUT_VALIDATION_ERROR");
    expect(result.message).toContain("1 file(s) failed");
  });

  it("handles probe failure gracefully", async () => {
    const prober = createMockProber({}); // No files → probe throws
    const result = await validateExports(
      { files: ["/nonexistent.mp4"], target_spec: VIDEO_SPEC },
      prober,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.error_category).toBe("OUTPUT_VALIDATION_ERROR");
  });

  it("rejects empty files array", async () => {
    const prober = createMockProber({});
    const result = await validateExports(
      { files: [], target_spec: VIDEO_SPEC },
      prober,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.error_category).toBe("VALIDATION_ERROR");
    expect(result.message).toContain("No files");
  });

  it("rejects missing target_spec", async () => {
    const prober = createMockProber({});
    const result = await validateExports(
      { files: ["/test.mp4"], target_spec: null as any },
      prober,
    );
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("target_spec");
  });

  it("collects warnings across all files", async () => {
    const prober = createMockProber({
      "/output/v1.mp4": {
        ...VALID_VIDEO,
        file_size_bytes: 510 * 1024 * 1024, // 510MB — warning
      },
      "/output/v2.mp4": {
        ...VALID_VIDEO,
        file_path: "/output/v2.mp4",
        file_size_bytes: 520 * 1024 * 1024, // 520MB — warning
      },
    });
    const result = await validateExports(
      { files: ["/output/v1.mp4", "/output/v2.mp4"], target_spec: VIDEO_SPEC },
      prober,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.warnings.length).toBe(2);
  });

  it("validates image batch", async () => {
    const prober = createMockProber({
      "/output/img1.png": VALID_IMAGE,
      "/output/img2.png": {
        ...VALID_IMAGE,
        file_path: "/output/img2.png",
      },
    });
    const result = await validateExports(
      { files: ["/output/img1.png", "/output/img2.png"], target_spec: IMAGE_SPEC },
      prober,
    );
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.all_passed).toBe(true);
  });
});

// ── Integration ─────────────────────────────────────────────────────────────

describe("integration", () => {
  it("validates a realistic 3-variation video batch", async () => {
    const prober = createMockProber({
      "/output/357-0073-v0006.mp4": {
        ...VALID_VIDEO,
        file_path: "/output/357-0073-v0006.mp4",
        duration_seconds: 61,
        file_size_bytes: 150 * 1024 * 1024,
      },
      "/output/357-0073-v0007.mp4": {
        ...VALID_VIDEO,
        file_path: "/output/357-0073-v0007.mp4",
        duration_seconds: 59,
        file_size_bytes: 155 * 1024 * 1024,
      },
      "/output/357-0073-v0008.mp4": {
        ...VALID_VIDEO,
        file_path: "/output/357-0073-v0008.mp4",
        duration_seconds: 63,
        file_size_bytes: 160 * 1024 * 1024,
      },
    });

    const result = await validateExports(
      {
        files: [
          "/output/357-0073-v0006.mp4",
          "/output/357-0073-v0007.mp4",
          "/output/357-0073-v0008.mp4",
        ],
        target_spec: {
          format: "mp4",
          codec: "h264",
          width: 1080,
          height: 1920,
          target_duration_seconds: 60,
          duration_tolerance_seconds: 5,
        },
      },
      prober,
    );

    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.all_passed).toBe(true);
    expect(result.data.file_results).toHaveLength(3);
    for (const r of result.data.file_results) {
      expect(r.passed).toBe(true);
    }
  });

  it("mixed pass/fail batch reports correctly", async () => {
    const prober = createMockProber({
      "/output/good.mp4": VALID_VIDEO,
      "/output/bad_res.mp4": {
        ...VALID_VIDEO,
        file_path: "/output/bad_res.mp4",
        width: 1920,
        height: 1080, // Wrong orientation
      },
      "/output/bad_dur.mp4": {
        ...VALID_VIDEO,
        file_path: "/output/bad_dur.mp4",
        duration_seconds: 120, // Way over
      },
    });

    const result = await validateExports(
      {
        files: ["/output/good.mp4", "/output/bad_res.mp4", "/output/bad_dur.mp4"],
        target_spec: VIDEO_SPEC,
      },
      prober,
    );

    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("2 file(s) failed");
  });
});
