import { describe, it, expect, vi } from "vitest";
import { similarPresenterAgent, differentPresenterAgent } from "./index.js";
import type { ExpansionContext, ExpansionDeps } from "../types.js";
import type {
  ResolvedIntake,
  AiGenerationClient,
  AiGenerationType,
  GenerationRequest,
} from "../../types/pipeline.js";

// ── Fixtures ────────────────────────────────────────────────────────────────

const STUB_INTAKE: ResolvedIntake = {
  script_id: "0073",
  funnel_code: "357",
  source_asset_id: "357-0073-v0001-tkvl-0916-0030-exh-flv-aj01-vv-er-us-250210-pgs",
  root_angle_name: "Vertical Circle Secret",
  expansion_type: "sp",
  target_variations: 2,
  platform_code: "tkvl",
  dimension_code: "0916",
  length_tier_code: "0030",
  hook_clip_references: [],
  raw: {} as Record<string, string>,
};

function makeSpCtx(overrides: Partial<ExpansionContext> = {}): ExpansionContext {
  return {
    sourceFile: "/src/video.mp4",
    outputDir: "/output/presenter-test",
    resolvedIntake: { ...STUB_INTAKE, expansion_type: "sp" },
    variationCount: 1,
    editOperation: {
      type: "similar_presenter",
      presenter_image_url: "https://example.com/presenter.jpg",
      script_text: "Discover the secret to a perfect golf swing.",
    },
    sourceDuration: 60,
    sourceDims: { width: 1080, height: 1920 },
    ...overrides,
  };
}

function makeDpCtx(overrides: Partial<ExpansionContext> = {}): ExpansionContext {
  return {
    sourceFile: "/src/video.mp4",
    outputDir: "/output/presenter-test",
    resolvedIntake: { ...STUB_INTAKE, expansion_type: "dp" },
    variationCount: 1,
    editOperation: {
      type: "different_presenter",
      presenter_image_url: "https://example.com/presenter.jpg",
      script_text: "Discover the secret to a perfect golf swing.",
      target_demographics: { gender: "female", age_range: "30-40" },
    },
    sourceDuration: 60,
    sourceDims: { width: 1080, height: 1920 },
    ...overrides,
  };
}

function createMockAiClient(
  overrides: Partial<{
    availableTypes: AiGenerationType[];
    generateResult: { file_path: string; cost_usd: number };
    generateError: Error;
  }> = {},
): AiGenerationClient {
  const availableTypes = overrides.availableTypes ?? [
    "character",
    "audio",
    "lipsync",
    "video",
    "image",
  ];
  const defaultResult = { file_path: "/output/generated.mp4", cost_usd: 0.1 };

  return {
    isAvailable: vi.fn((type: AiGenerationType) => availableTypes.includes(type)),
    generate: overrides.generateError
      ? vi.fn().mockRejectedValue(overrides.generateError)
      : vi.fn().mockResolvedValue(overrides.generateResult ?? defaultResult),
  };
}

function makeDeps(overrides: Partial<ExpansionDeps> = {}): ExpansionDeps {
  return {
    commandRunner: {
      run: vi.fn().mockResolvedValue({ exitCode: 0, stdout: "", stderr: "" }),
    },
    fileProber: {
      probe: vi.fn().mockResolvedValue({ duration_seconds: 60, width: 1080, height: 1920 }),
    },
    aiClient: createMockAiClient(),
    ...overrides,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Similar Presenter (sp)
// ═══════════════════════════════════════════════════════════════════════════

describe("similarPresenterAgent identity", () => {
  it("has correct typeCode and name", () => {
    expect(similarPresenterAgent.typeCode).toBe("sp");
    expect(similarPresenterAgent.name).toBe("similar-presenter");
  });
});

// ── SP Validation ──────────────────────────────────────────────────────────

describe("similarPresenterAgent.validate", () => {
  it("validates a well-formed similar presenter request", () => {
    const result = similarPresenterAgent.validate(makeSpCtx());
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects wrong operation type", () => {
    const result = similarPresenterAgent.validate(
      makeSpCtx({
        editOperation: {
          type: "hook_stack",
          hook_clip_path: "/h.mp4",
          hook_duration_seconds: 5,
        },
      }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("similar_presenter");
  });

  it("rejects missing presenter_image_url", () => {
    const result = similarPresenterAgent.validate(
      makeSpCtx({
        editOperation: {
          type: "similar_presenter",
          presenter_image_url: "",
          script_text: "Some text",
        },
      }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("presenter_image_url");
  });

  it("rejects missing script_text", () => {
    const result = similarPresenterAgent.validate(
      makeSpCtx({
        editOperation: {
          type: "similar_presenter",
          presenter_image_url: "https://example.com/p.jpg",
          script_text: "",
        },
      }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("script_text");
  });

  it("rejects variation_count < 1", () => {
    const result = similarPresenterAgent.validate(makeSpCtx({ variationCount: 0 }));
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("variation_count");
  });

  it("warns on high variation count (> 5)", () => {
    const result = similarPresenterAgent.validate(makeSpCtx({ variationCount: 8 }));
    expect(result.valid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain("cost");
  });
});

// ── SP Execution ───────────────────────────────────────────────────────────

describe("similarPresenterAgent.execute", () => {
  it("SUCCESS for single variation — 3 AI calls (character + voice + lipsync)", async () => {
    const deps = makeDeps();
    const result = await similarPresenterAgent.execute(makeSpCtx(), deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations).toHaveLength(1);
    expect(result.data.variations[0].variation_index).toBe(1);
    expect((deps.aiClient!.generate as ReturnType<typeof vi.fn>)).toHaveBeenCalledTimes(3);
  });

  it("produces correct number of variations (N * 3 AI calls)", async () => {
    const deps = makeDeps();
    const result = await similarPresenterAgent.execute(makeSpCtx({ variationCount: 3 }), deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations).toHaveLength(3);
    expect((deps.aiClient!.generate as ReturnType<typeof vi.fn>)).toHaveBeenCalledTimes(9);
  });

  it("calls Higgsfield first with character type and style_reference", async () => {
    const deps = makeDeps();
    await similarPresenterAgent.execute(makeSpCtx(), deps);
    const firstCall = (deps.aiClient!.generate as ReturnType<typeof vi.fn>).mock.calls[0];
    const request: GenerationRequest = firstCall[0];
    expect(request.type).toBe("character");
    expect(request.model).toBe("higgsfield");
    expect(request.style_reference).toBe("https://example.com/presenter.jpg");
  });

  it("calls ElevenLabs second with script text", async () => {
    const deps = makeDeps();
    await similarPresenterAgent.execute(makeSpCtx(), deps);
    const secondCall = (deps.aiClient!.generate as ReturnType<typeof vi.fn>).mock.calls[1];
    const request: GenerationRequest = secondCall[0];
    expect(request.type).toBe("audio");
    expect(request.model).toBe("elevenlabs");
    expect(request.prompt).toBe("Discover the secret to a perfect golf swing.");
  });

  it("calls wav2lip third with character file as style_reference", async () => {
    const deps = makeDeps();
    await similarPresenterAgent.execute(makeSpCtx(), deps);
    const thirdCall = (deps.aiClient!.generate as ReturnType<typeof vi.fn>).mock.calls[2];
    const request: GenerationRequest = thirdCall[0];
    expect(request.type).toBe("lipsync");
    expect(request.model).toBe("wav2lip");
    expect(request.style_reference).toBe("/output/generated.mp4");
  });

  it("includes mode and cost in edit_summary", async () => {
    const deps = makeDeps();
    const result = await similarPresenterAgent.execute(makeSpCtx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].edit_summary).toContain("Similar presenter");
    expect(result.data.variations[0].edit_summary).toContain("Higgsfield");
    expect(result.data.variations[0].edit_summary).toContain("ElevenLabs");
    expect(result.data.variations[0].edit_summary).toContain("wav2lip");
  });

  it("marks root_angle_preserved true", async () => {
    const deps = makeDeps();
    const result = await similarPresenterAgent.execute(makeSpCtx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].root_angle_preserved).toBe(true);
  });

  it("flags high total cost (> $1)", async () => {
    const deps = makeDeps({
      aiClient: createMockAiClient({ generateResult: { file_path: "/out.mp4", cost_usd: 0.5 } }),
    });
    const result = await similarPresenterAgent.execute(makeSpCtx({ variationCount: 2 }), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.durationFlags.length).toBeGreaterThan(0);
    expect(result.data.durationFlags[0]).toContain("cost");
  });

  it("FAILS when aiClient not provided", async () => {
    const deps = makeDeps({ aiClient: undefined });
    const result = await similarPresenterAgent.execute(makeSpCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.error_category).toBe("CREDENTIAL_ERROR");
    expect(result.message).toContain("AI client");
  });

  it("FAILS when Higgsfield credentials missing", async () => {
    const deps = makeDeps({
      aiClient: createMockAiClient({ availableTypes: ["audio", "lipsync"] }),
    });
    const result = await similarPresenterAgent.execute(makeSpCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("Higgsfield");
  });

  it("FAILS when ElevenLabs credentials missing", async () => {
    const deps = makeDeps({
      aiClient: createMockAiClient({ availableTypes: ["character", "lipsync"] }),
    });
    const result = await similarPresenterAgent.execute(makeSpCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("ElevenLabs");
  });

  it("FAILS when FAL credentials missing (lipsync)", async () => {
    const deps = makeDeps({
      aiClient: createMockAiClient({ availableTypes: ["character", "audio"] }),
    });
    const result = await similarPresenterAgent.execute(makeSpCtx(), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("FAL");
  });

  it("FAILS on AI generation error — batch stops", async () => {
    const deps = makeDeps({
      aiClient: createMockAiClient({ generateError: new Error("API rate limited") }),
    });
    const result = await similarPresenterAgent.execute(makeSpCtx({ variationCount: 3 }), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.error_category).toBe("AI_GENERATION_ERROR");
    expect(result.message).toContain("rate limited");
    expect(result.message).toContain("0 of 3 completed");
  });

  it("reports partial completion on mid-batch failure", async () => {
    let callCount = 0;
    const failOnFourth: AiGenerationClient = {
      isAvailable: () => true,
      generate: vi.fn().mockImplementation(() => {
        callCount++;
        // First 3 calls succeed (variation 1: character+voice+lipsync),
        // 4th call fails (variation 2: character)
        if (callCount === 4) return Promise.reject(new Error("Higgsfield timeout"));
        return Promise.resolve({ file_path: `/out/${callCount}.mp4`, cost_usd: 0.1 });
      }),
    };
    const deps = makeDeps({ aiClient: failOnFourth });
    const result = await similarPresenterAgent.execute(makeSpCtx({ variationCount: 3 }), deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") return;
    expect(result.message).toContain("1 of 3 completed");
    expect(result.message).toContain("variation 2");
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Different Presenter (dp)
// ═══════════════════════════════════════════════════════════════════════════

describe("differentPresenterAgent identity", () => {
  it("has correct typeCode and name", () => {
    expect(differentPresenterAgent.typeCode).toBe("dp");
    expect(differentPresenterAgent.name).toBe("different-presenter");
  });
});

// ── DP Validation ──────────────────────────────────────────────────────────

describe("differentPresenterAgent.validate", () => {
  it("validates a well-formed different presenter request", () => {
    const result = differentPresenterAgent.validate(makeDpCtx());
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects wrong operation type", () => {
    const result = differentPresenterAgent.validate(
      makeDpCtx({
        editOperation: {
          type: "similar_presenter",
          presenter_image_url: "https://example.com/p.jpg",
          script_text: "text",
        },
      }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("different_presenter");
  });

  it("rejects missing presenter_image_url", () => {
    const result = differentPresenterAgent.validate(
      makeDpCtx({
        editOperation: {
          type: "different_presenter",
          presenter_image_url: "",
          script_text: "text",
        },
      }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("presenter_image_url");
  });

  it("rejects missing script_text", () => {
    const result = differentPresenterAgent.validate(
      makeDpCtx({
        editOperation: {
          type: "different_presenter",
          presenter_image_url: "https://example.com/p.jpg",
          script_text: "",
        },
      }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("script_text");
  });

  it("warns on empty target_demographics", () => {
    const result = differentPresenterAgent.validate(
      makeDpCtx({
        editOperation: {
          type: "different_presenter",
          presenter_image_url: "https://example.com/p.jpg",
          script_text: "text",
          target_demographics: {},
        },
      }),
    );
    expect(result.valid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain("target_demographics");
  });

  it("no warning when target_demographics has values", () => {
    const result = differentPresenterAgent.validate(makeDpCtx());
    expect(result.warnings).toHaveLength(0);
  });
});

// ── DP Execution ───────────────────────────────────────────────────────────

describe("differentPresenterAgent.execute", () => {
  it("SUCCESS for single variation", async () => {
    const deps = makeDeps();
    const result = await differentPresenterAgent.execute(makeDpCtx(), deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations).toHaveLength(1);
  });

  it("uses 'Different presenter' in edit_summary", async () => {
    const deps = makeDeps();
    const result = await differentPresenterAgent.execute(makeDpCtx(), deps);
    if (result.status !== "SUCCESS") return;
    expect(result.data.variations[0].edit_summary).toContain("Different presenter");
  });

  it("builds character prompt with target demographics", async () => {
    const deps = makeDeps();
    await differentPresenterAgent.execute(makeDpCtx(), deps);
    const firstCall = (deps.aiClient!.generate as ReturnType<typeof vi.fn>).mock.calls[0];
    const request: GenerationRequest = firstCall[0];
    expect(request.prompt).toContain("different");
    expect(request.prompt).toContain("female");
    expect(request.prompt).toContain("30-40");
  });

  it("passes voice_id to ElevenLabs when provided", async () => {
    const deps = makeDeps();
    const ctx = makeDpCtx({
      editOperation: {
        type: "different_presenter",
        presenter_image_url: "https://example.com/p.jpg",
        script_text: "text",
        voice_id: "custom-voice-123",
      },
    });
    await differentPresenterAgent.execute(ctx, deps);
    const voiceCall = (deps.aiClient!.generate as ReturnType<typeof vi.fn>).mock.calls[1];
    const request: GenerationRequest = voiceCall[0];
    expect(request.voice_id).toBe("custom-voice-123");
  });

  it("FAILS when aiClient not provided", async () => {
    const deps = makeDeps({ aiClient: undefined });
    const result = await differentPresenterAgent.execute(makeDpCtx(), deps);
    expect(result.status).toBe("FAILED");
  });
});
