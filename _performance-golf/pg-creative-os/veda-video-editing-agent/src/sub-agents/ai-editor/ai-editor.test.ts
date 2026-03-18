import { describe, it, expect, vi } from "vitest";
import { generate, assessQuality } from "./index.js";
import type {
  AiEditorInput,
  AiGenerationClient,
  AiGenerationType,
  GenerationRequest,
} from "../../types/pipeline.js";

// ── Mock Factories ──────────────────────────────────────────────────────

function createMockAiClient(overrides?: {
  availableTypes?: AiGenerationType[];
  filePath?: string;
  costUsd?: number;
}): AiGenerationClient & { calls: GenerationRequest[] } {
  const available = overrides?.availableTypes ?? ["video", "image", "audio", "character", "lipsync"];
  const calls: GenerationRequest[] = [];

  return {
    calls,
    isAvailable(type: AiGenerationType) {
      return available.includes(type);
    },
    async generate(request: GenerationRequest, outputDir: string) {
      calls.push(request);
      return {
        file_path: overrides?.filePath ?? `${outputDir}/generated-output.mp4`,
        cost_usd: overrides?.costUsd ?? 0.05,
      };
    },
  };
}

function createFailingAiClient(errorMessage: string): AiGenerationClient {
  return {
    isAvailable() {
      return true;
    },
    async generate() {
      throw new Error(errorMessage);
    },
  };
}

function createUnavailableAiClient(): AiGenerationClient {
  return {
    isAvailable() {
      return false;
    },
    async generate() {
      throw new Error("Should not be called");
    },
  };
}

function validInput(overrides?: Partial<AiEditorInput>): AiEditorInput {
  return {
    generation_request: {
      type: "video",
      prompt: "A golfer performing a perfect swing on a sunny day",
      model: "kling_v2.5",
    },
    root_angle_name: "The 3 Swing Circles",
    output_dir: "/tmp/veda-test-output",
    ...overrides,
  };
}

// ── Tests ───────────────────────────────────────────────────────────────

describe("ai_editor", () => {
  // ── Input Validation ──────────────────────────────────────────────

  describe("input validation", () => {
    const client = createMockAiClient();

    it("rejects missing generation_request", async () => {
      const result = await generate(
        { generation_request: undefined as any, root_angle_name: "test", output_dir: "/tmp" },
        client,
      );
      expect(result.status).toBe("FAILED");
      if (result.status === "FAILED") {
        expect(result.error_category).toBe("VALIDATION_ERROR");
        expect(result.message).toContain("generation_request");
      }
    });

    it("rejects missing prompt", async () => {
      const result = await generate(
        validInput({
          generation_request: { type: "video", prompt: "", model: "kling_v2.5" },
        }),
        client,
      );
      expect(result.status).toBe("FAILED");
      if (result.status === "FAILED") {
        expect(result.error_category).toBe("VALIDATION_ERROR");
        expect(result.message).toContain("prompt");
      }
    });

    it("rejects missing type", async () => {
      const result = await generate(
        validInput({
          generation_request: { type: "" as any, prompt: "test", model: "flux" },
        }),
        client,
      );
      expect(result.status).toBe("FAILED");
      if (result.status === "FAILED") {
        expect(result.error_category).toBe("VALIDATION_ERROR");
        expect(result.message).toContain("type");
      }
    });

    it("rejects missing root_angle_name", async () => {
      const result = await generate(
        validInput({ root_angle_name: "" }),
        client,
      );
      expect(result.status).toBe("FAILED");
      if (result.status === "FAILED") {
        expect(result.error_category).toBe("VALIDATION_ERROR");
        expect(result.message).toContain("root_angle_name");
      }
    });

    it("rejects missing output_dir", async () => {
      const result = await generate(
        validInput({ output_dir: "" }),
        client,
      );
      expect(result.status).toBe("FAILED");
      if (result.status === "FAILED") {
        expect(result.error_category).toBe("VALIDATION_ERROR");
        expect(result.message).toContain("output_dir");
      }
    });
  });

  // ── Credential Checks ─────────────────────────────────────────────

  describe("credential checks", () => {
    const unavailable = createUnavailableAiClient();
    const allAvailable = createMockAiClient();

    it("succeeds when video credentials are available", async () => {
      const result = await generate(validInput(), allAvailable);
      expect(result.status).toBe("SUCCESS");
    });

    it("succeeds when image credentials are available", async () => {
      const result = await generate(
        validInput({
          generation_request: { type: "image", prompt: "test", model: "flux" },
        }),
        allAvailable,
      );
      expect(result.status).toBe("SUCCESS");
    });

    it("succeeds when audio credentials are available", async () => {
      const result = await generate(
        validInput({
          generation_request: { type: "audio", prompt: "test", model: "elevenlabs" },
        }),
        allAvailable,
      );
      expect(result.status).toBe("SUCCESS");
    });

    it("succeeds when character credentials are available", async () => {
      const result = await generate(
        validInput({
          generation_request: { type: "character", prompt: "test", model: "higgsfield" },
        }),
        allAvailable,
      );
      expect(result.status).toBe("SUCCESS");
    });

    it("succeeds when lipsync credentials are available", async () => {
      const result = await generate(
        validInput({
          generation_request: { type: "lipsync", prompt: "test", model: "wav2lip" },
        }),
        allAvailable,
      );
      expect(result.status).toBe("SUCCESS");
    });

    it("fails with CREDENTIAL_ERROR when type is unavailable", async () => {
      const result = await generate(validInput(), unavailable);
      expect(result.status).toBe("FAILED");
      if (result.status === "FAILED") {
        expect(result.error_category).toBe("CREDENTIAL_ERROR");
        expect(result.message).toContain("FAL.ai");
      }
    });
  });

  // ── Success Paths ─────────────────────────────────────────────────

  describe("success paths", () => {
    it("returns generated file for video", async () => {
      const client = createMockAiClient({ costUsd: 0.12 });
      const result = await generate(validInput(), client);
      expect(result.status).toBe("SUCCESS");
      if (result.status === "SUCCESS") {
        expect(result.data.generated_files).toHaveLength(1);
        expect(result.data.generated_files[0].generation_model).toBe("kling_v2.5");
        expect(result.data.generated_files[0].generation_cost_usd).toBe(0.12);
        expect(result.data.generated_files[0].root_angle_preserved).toBe(true);
      }
    });

    it("returns generated file for image", async () => {
      const client = createMockAiClient({ filePath: "/tmp/test/image.png" });
      const result = await generate(
        validInput({
          generation_request: { type: "image", prompt: "golf scene", model: "flux" },
        }),
        client,
      );
      expect(result.status).toBe("SUCCESS");
      if (result.status === "SUCCESS") {
        expect(result.data.generated_files[0].file_path).toBe("/tmp/test/image.png");
        expect(result.data.generated_files[0].generation_model).toBe("flux");
      }
    });

    it("returns generated file for audio", async () => {
      const client = createMockAiClient({ costUsd: 0.02 });
      const result = await generate(
        validInput({
          generation_request: { type: "audio", prompt: "voiceover", model: "elevenlabs", voice_id: "abc123" },
        }),
        client,
      );
      expect(result.status).toBe("SUCCESS");
      if (result.status === "SUCCESS") {
        expect(result.data.total_cost_usd).toBe(0.02);
      }
    });

    it("tracks total cost correctly", async () => {
      const client = createMockAiClient({ costUsd: 0.25 });
      const result = await generate(validInput(), client);
      expect(result.status).toBe("SUCCESS");
      if (result.status === "SUCCESS") {
        expect(result.data.total_cost_usd).toBe(0.25);
        expect(result.data.generated_files[0].generation_cost_usd).toBe(0.25);
      }
    });

    it("sets quality_assessment to acceptable for successful generation", async () => {
      const client = createMockAiClient();
      const result = await generate(validInput(), client);
      expect(result.status).toBe("SUCCESS");
      if (result.status === "SUCCESS") {
        expect(result.data.generated_files[0].quality_assessment).toBe("acceptable");
      }
    });

    it("passes model name through to output", async () => {
      const client = createMockAiClient();
      const result = await generate(
        validInput({
          generation_request: { type: "video", prompt: "test", model: "custom_model_v3" },
        }),
        client,
      );
      expect(result.status).toBe("SUCCESS");
      if (result.status === "SUCCESS") {
        expect(result.data.generated_files[0].generation_model).toBe("custom_model_v3");
      }
    });
  });

  // ── Error Handling ────────────────────────────────────────────────

  describe("error handling", () => {
    it("returns AI_GENERATION_ERROR when client throws", async () => {
      const client = createFailingAiClient("Service unavailable: rate limited");
      const result = await generate(validInput(), client);
      expect(result.status).toBe("FAILED");
      if (result.status === "FAILED") {
        expect(result.error_category).toBe("AI_GENERATION_ERROR");
        expect(result.message).toContain("rate limited");
      }
    });

    it("truncates long error messages to 500 chars", async () => {
      const longMsg = "x".repeat(1000);
      const client = createFailingAiClient(longMsg);
      const result = await generate(validInput(), client);
      expect(result.status).toBe("FAILED");
      if (result.status === "FAILED") {
        // "AI generation failed: " + 500 chars
        expect(result.message.length).toBeLessThanOrEqual(524);
      }
    });
  });

  // ── assessQuality ─────────────────────────────────────────────────

  describe("assessQuality", () => {
    it("returns acceptable when file exists", () => {
      expect(assessQuality("video", true)).toBe("acceptable");
    });

    it("returns low when file does not exist", () => {
      expect(assessQuality("video", false)).toBe("low");
    });
  });

  // ── Integration ───────────────────────────────────────────────────

  describe("integration", () => {
    it("full video generation flow", async () => {
      const client = createMockAiClient({ costUsd: 0.15, filePath: "/out/video.mp4" });
      const result = await generate(
        {
          generation_request: {
            type: "video",
            prompt: "Golfer demonstrating the proper grip technique",
            model: "kling_v2.5",
            duration_seconds: 10,
            width: 1080,
            height: 1920,
          },
          root_angle_name: "The Grip Fix",
          output_dir: "/out",
        },
        client,
      );

      expect(result.status).toBe("SUCCESS");
      if (result.status === "SUCCESS") {
        expect(result.data.generated_files[0].file_path).toBe("/out/video.mp4");
        expect(result.data.total_cost_usd).toBe(0.15);
      }
    });

    it("full audio generation flow", async () => {
      const client = createMockAiClient({ costUsd: 0.03, filePath: "/out/voiceover.mp3" });
      const result = await generate(
        {
          generation_request: {
            type: "audio",
            prompt: "Are you making this common grip mistake?",
            model: "elevenlabs",
            voice_id: "voice_abc",
          },
          root_angle_name: "The Grip Fix",
          output_dir: "/out",
        },
        client,
      );

      expect(result.status).toBe("SUCCESS");
      if (result.status === "SUCCESS") {
        expect(result.data.generated_files[0].file_path).toBe("/out/voiceover.mp3");
        expect(result.data.generated_files[0].generation_model).toBe("elevenlabs");
      }
    });

    it("unavailable type returns clear CREDENTIAL_ERROR", async () => {
      const client = createMockAiClient({ availableTypes: ["video", "image"] });
      const result = await generate(
        validInput({
          generation_request: { type: "audio", prompt: "test", model: "elevenlabs" },
        }),
        client,
      );
      expect(result.status).toBe("FAILED");
      if (result.status === "FAILED") {
        expect(result.error_category).toBe("CREDENTIAL_ERROR");
        expect(result.message).toContain("ElevenLabs");
      }
    });

    it("records generation request in client calls", async () => {
      const client = createMockAiClient();
      const request: GenerationRequest = {
        type: "character",
        prompt: "Golf instructor character",
        model: "higgsfield",
      };
      await generate(validInput({ generation_request: request }), client);
      expect(client.calls).toHaveLength(1);
      expect(client.calls[0]).toEqual(request);
    });
  });
});
