import { describe, it, expect, vi } from "vitest";
import { internationalAgent, buildDubArgs } from "./index.js";
import type { ExpansionContext, ExpansionDeps } from "../types.js";
import type { ResolvedIntake, AiGenerationClient } from "../../types/pipeline.js";

// ── Fixtures ────────────────────────────────────────────────────────────────

const STUB_INTAKE: ResolvedIntake = {
  script_id: "0073",
  funnel_code: "357",
  source_asset_id: "357-0073-v0001-tkvl-0916-0030-exh-flv-aj01-vv-er-us-250210-pgs",
  root_angle_name: "Vertical Circle Secret",
  expansion_type: "int",
  target_variations: 1,
  platform_code: "tkvl",
  dimension_code: "0916",
  length_tier_code: "0030",
  hook_clip_references: [],
  country_code: "us",
  raw: {} as Record<string, string>,
};

function makeCtx(overrides: Partial<ExpansionContext> = {}): ExpansionContext {
  return {
    sourceFile: "/src/video.mp4",
    outputDir: "/output/int-test",
    resolvedIntake: STUB_INTAKE,
    variationCount: 1,
    editOperation: {
      type: "international",
      target_language: "es",
      country_code: "mx",
      script_translation: "¿Luchando con tu swing? Este ejercicio lo arregla en 5 minutos.",
    },
    sourceDims: { width: 1080, height: 1920 },
    sourceDuration: 30,
    ...overrides,
  };
}

function createMockRunner(exitCode = 0) {
  return {
    run: vi.fn().mockResolvedValue({ exitCode, stdout: "", stderr: exitCode !== 0 ? "FFmpeg error" : "" }),
  };
}

function createMockAiClient(overrides: Partial<Record<string, boolean>> = {}): AiGenerationClient {
  const availability: Record<string, boolean> = {
    audio: true,
    video: true,
    image: true,
    character: true,
    lipsync: true,
    segmentation: true,
    ...overrides,
  };

  let callCount = 0;
  return {
    isAvailable: vi.fn((type: string) => availability[type] ?? false),
    generate: vi.fn(async (_req, outputDir: string) => {
      callCount++;
      return {
        file_path: `${outputDir}/dubbed-${callCount}.mp3`,
        cost_usd: 0.01,
      };
    }),
  } as unknown as AiGenerationClient;
}

function makeDeps(overrides: Partial<ExpansionDeps> = {}): ExpansionDeps {
  return {
    commandRunner: createMockRunner(),
    fileProber: { probe: vi.fn().mockResolvedValue({ duration_seconds: 30, width: 1080, height: 1920 }) },
    aiClient: createMockAiClient(),
    ...overrides,
  };
}

// ── Identity ────────────────────────────────────────────────────────────────

describe("internationalAgent identity", () => {
  it("has correct typeCode and name", () => {
    expect(internationalAgent.typeCode).toBe("int");
    expect(internationalAgent.name).toBe("international");
  });
});

// ── Validation ──────────────────────────────────────────────────────────────

describe("internationalAgent.validate", () => {
  it("validates a well-formed international operation", () => {
    const result = internationalAgent.validate(makeCtx());
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects wrong operation type", () => {
    const result = internationalAgent.validate(
      makeCtx({ editOperation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 } }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("international");
  });

  it("rejects missing target_language", () => {
    const result = internationalAgent.validate(
      makeCtx({
        editOperation: {
          type: "international",
          target_language: "",
          country_code: "mx",
          script_translation: "test",
        },
      }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("target_language");
  });

  it("rejects missing country_code", () => {
    const result = internationalAgent.validate(
      makeCtx({
        editOperation: {
          type: "international",
          target_language: "es",
          country_code: "",
          script_translation: "test",
        },
      }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("country_code");
  });

  it("rejects same country as source", () => {
    const result = internationalAgent.validate(
      makeCtx({
        editOperation: {
          type: "international",
          target_language: "en",
          country_code: "us",
          script_translation: "Same language",
        },
      }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("matches source");
  });

  it("rejects missing script_translation", () => {
    const result = internationalAgent.validate(
      makeCtx({
        editOperation: {
          type: "international",
          target_language: "es",
          country_code: "mx",
          script_translation: "",
        },
      }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("script_translation");
  });

  it("warns on unknown target language", () => {
    const result = internationalAgent.validate(
      makeCtx({
        editOperation: {
          type: "international",
          target_language: "xx",
          country_code: "xx",
          script_translation: "test",
        },
      }),
    );
    expect(result.valid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain("Unknown target language");
  });

  it("warns on high variation count (>3)", () => {
    const result = internationalAgent.validate(makeCtx({ variationCount: 5 }));
    expect(result.valid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain("cost");
  });

  it("accepts known languages without warning", () => {
    for (const lang of ["es", "pt", "de", "ja", "ko"]) {
      const result = internationalAgent.validate(
        makeCtx({
          editOperation: {
            type: "international",
            target_language: lang,
            country_code: "xx",
            script_translation: "test",
          },
        }),
      );
      expect(result.valid).toBe(true);
      expect(result.warnings).toHaveLength(0);
    }
  });

  it("rejects variation_count < 1", () => {
    const result = internationalAgent.validate(makeCtx({ variationCount: 0 }));
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("variation_count");
  });

  it("rejects missing source file", () => {
    const result = internationalAgent.validate(makeCtx({ sourceFile: "" }));
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("source_file is required");
  });
});

// ── Execution ───────────────────────────────────────────────────────────────

describe("internationalAgent.execute", () => {
  it("SUCCESS for single variation", async () => {
    const deps = makeDeps();
    const result = await internationalAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations).toHaveLength(1);
    expect(result.data.variations[0].variation_index).toBe(1);
    expect(result.data.variations[0].file_path).toContain("variation_1.mp4");
  });

  it("calls 2-stage pipeline: ElevenLabs dubbing → FFmpeg audio replace", async () => {
    const deps = makeDeps();
    await internationalAgent.execute(makeCtx(), deps);

    const generateFn = deps.aiClient!.generate as ReturnType<typeof vi.fn>;
    expect(generateFn).toHaveBeenCalledTimes(1);

    // Stage 1: dubbing
    const dubCall = generateFn.mock.calls[0][0];
    expect(dubCall.type).toBe("audio");
    expect(dubCall.model).toBe("elevenlabs");
    expect(dubCall.prompt).toContain("swing");

    // Stage 2: FFmpeg audio replace
    expect(deps.commandRunner.run).toHaveBeenCalledTimes(1);
    const ffCall = (deps.commandRunner.run as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(ffCall[0]).toBe("ffmpeg");
    const ffArgs: string[] = ffCall[1];
    expect(ffArgs).toContain("0:v");
    expect(ffArgs).toContain("1:a");
  });

  it("produces correct number of variations", async () => {
    const deps = makeDeps();
    const result = await internationalAgent.execute(makeCtx({ variationCount: 2 }), deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations).toHaveLength(2);

    const generateFn = deps.aiClient!.generate as ReturnType<typeof vi.fn>;
    expect(generateFn).toHaveBeenCalledTimes(2);
    expect(deps.commandRunner.run).toHaveBeenCalledTimes(2);
  });

  it("includes language and country in edit_summary", async () => {
    const deps = makeDeps();
    const result = await internationalAgent.execute(makeCtx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].edit_summary).toContain("es");
    expect(result.data.variations[0].edit_summary).toContain("mx");
    expect(result.data.variations[0].edit_summary).toContain("International");
  });

  it("passes voice_id to ElevenLabs when provided", async () => {
    const deps = makeDeps();
    await internationalAgent.execute(
      makeCtx({
        editOperation: {
          type: "international",
          target_language: "es",
          country_code: "mx",
          script_translation: "test",
          voice_id: "custom-voice-123",
        },
      }),
      deps,
    );
    const generateFn = deps.aiClient!.generate as ReturnType<typeof vi.fn>;
    expect(generateFn.mock.calls[0][0].voice_id).toBe("custom-voice-123");
  });

  it("tracks cost and adds flag when threshold exceeded", async () => {
    const expensiveClient: AiGenerationClient = {
      isAvailable: vi.fn(() => true),
      generate: vi.fn(async (_req, outputDir: string) => ({
        file_path: `${outputDir}/dubbed.mp3`,
        cost_usd: 0.30,
      })),
    } as unknown as AiGenerationClient;

    const deps = makeDeps({ aiClient: expensiveClient });
    const result = await internationalAgent.execute(makeCtx({ variationCount: 2 }), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.durationFlags.length).toBeGreaterThan(0);
    expect(result.data.durationFlags[0]).toContain("budget");
  });

  // ── Credential checks ──────────────────────────────────────────────────

  it("FAILS when no aiClient provided", async () => {
    const deps = makeDeps({ aiClient: undefined });
    const result = await internationalAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.error_category).toBe("CREDENTIAL_ERROR");
    expect(result.message).toContain("aiClient");
  });

  it("FAILS when audio not available", async () => {
    const deps = makeDeps({ aiClient: createMockAiClient({ audio: false }) });
    const result = await internationalAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("ElevenLabs");
  });

  // ── Error handling ─────────────────────────────────────────────────────

  it("FAILS on AI dubbing error (batch stop)", async () => {
    const failingClient: AiGenerationClient = {
      isAvailable: vi.fn(() => true),
      generate: vi.fn().mockRejectedValue(new Error("ElevenLabs quota exceeded")),
    } as unknown as AiGenerationClient;

    const deps = makeDeps({ aiClient: failingClient });
    const result = await internationalAgent.execute(makeCtx({ variationCount: 2 }), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.error_category).toBe("AI_GENERATION_ERROR");
    expect(result.message).toContain("ElevenLabs quota");
    expect(result.message).toContain("0 of 2");
  });

  it("FAILS on FFmpeg audio replace error", async () => {
    const deps = makeDeps({ commandRunner: createMockRunner(1) });
    const result = await internationalAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("FFmpeg exited with code 1");
  });

  it("FAILS on FFmpeg throw", async () => {
    const throwRunner = { run: vi.fn().mockRejectedValue(new Error("audio replace failed")) };
    const deps = makeDeps({ commandRunner: throwRunner });
    const result = await internationalAgent.execute(makeCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("audio replace failed");
  });

  it("FAILS on wrong operation type", async () => {
    const deps = makeDeps();
    const ctx = makeCtx({
      editOperation: { type: "hook_stack", hook_clip_path: "/h.mp4", hook_duration_seconds: 5 },
    });
    const result = await internationalAgent.execute(ctx, deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("wrong operation type");
  });

  it("generates output paths in outputDir", async () => {
    const deps = makeDeps();
    const result = await internationalAgent.execute(
      makeCtx({ outputDir: "/custom/output", variationCount: 2 }),
      deps,
    );
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].file_path).toBe("/custom/output/variation_1.mp4");
    expect(result.data.variations[1].file_path).toBe("/custom/output/variation_2.mp4");
  });
});

// ── buildDubArgs ────────────────────────────────────────────────────────────

describe("buildDubArgs", () => {
  it("produces correct FFmpeg args structure", () => {
    const args = buildDubArgs("/src.mp4", "/dubbed.mp3", "/out.mp4");
    expect(args[0]).toBe("-y");
    expect(args).toContain("/src.mp4");
    expect(args).toContain("/dubbed.mp3");
    expect(args).toContain("0:v"); // map source video
    expect(args).toContain("1:a"); // map dubbed audio
    expect(args).toContain("-shortest");
    expect(args[args.length - 1]).toBe("/out.mp4");
  });
});
