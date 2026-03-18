/**
 * Multi-service AI generation client.
 *
 * Routes generation requests to the appropriate service:
 *   - video / image / lipsync → FAL.ai
 *   - audio (TTS)             → ElevenLabs
 *   - character               → Higgsfield
 *
 * Implements AiGenerationClient interface (same DI pattern as real-runners.ts).
 * Uses native fetch (Node 22+).
 */

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type {
  AiGenerationClient,
  AiGenerationType,
  GenerationRequest,
} from "../types/pipeline.js";

export interface AiClientConfig {
  falKey?: string;
  elevenLabsKey?: string;
  higgsFieldKey?: string;
  higgsFieldSecret?: string;
}

// ── Service Routing ─────────────────────────────────────────────────────

const SERVICE_MAP: Record<AiGenerationType, "fal" | "elevenlabs" | "higgsfield"> = {
  video: "fal",
  image: "fal",
  lipsync: "fal",
  segmentation: "fal",
  audio: "elevenlabs",
  character: "higgsfield",
};

// ── FAL Model ID Mapping ────────────────────────────────────────────────

const FAL_MODELS: Record<string, string> = {
  "kling_v2.5": "fal-ai/kling-video/v2.5/standard",
  "kling_v2": "fal-ai/kling-video/v2/standard",
  flux: "fal-ai/flux/schnell",
  flux_pro: "fal-ai/flux-pro",
  wav2lip: "fal-ai/wav2lip",
  birefnet: "fal-ai/birefnet",
};

// ── Cost Estimates (v1 placeholders) ────────────────────────────────────

const COST_ESTIMATES: Record<string, number> = {
  "kling_v2.5": 0.10,
  "kling_v2": 0.08,
  flux: 0.003,
  flux_pro: 0.05,
  wav2lip: 0.05,
  birefnet: 0.01,
  elevenlabs: 0.01,
  higgsfield: 0.10,
};

function estimateCost(model: string): number {
  return COST_ESTIMATES[model] ?? 0.05;
}

// ── Factory ─────────────────────────────────────────────────────────────

export function createAiClient(config: AiClientConfig): AiGenerationClient {
  return {
    isAvailable(type: AiGenerationType): boolean {
      const service = SERVICE_MAP[type];
      switch (service) {
        case "fal":
          return !!config.falKey;
        case "elevenlabs":
          return !!config.elevenLabsKey;
        case "higgsfield":
          return !!config.higgsFieldKey && !!config.higgsFieldSecret;
        default:
          return false;
      }
    },

    async generate(
      request: GenerationRequest,
      outputDir: string,
    ): Promise<{ file_path: string; cost_usd: number }> {
      const service = SERVICE_MAP[request.type];

      switch (service) {
        case "fal":
          return generateWithFal(config.falKey!, request, outputDir);
        case "elevenlabs":
          return generateWithElevenLabs(config.elevenLabsKey!, request, outputDir);
        case "higgsfield":
          return generateWithHiggsfield(
            config.higgsFieldKey!,
            config.higgsFieldSecret!,
            request,
            outputDir,
          );
        default:
          throw new Error(`Unknown service for type "${request.type}"`);
      }
    },
  };
}

// ── FAL.ai ──────────────────────────────────────────────────────────────

async function generateWithFal(
  apiKey: string,
  request: GenerationRequest,
  outputDir: string,
): Promise<{ file_path: string; cost_usd: number }> {
  const modelId = FAL_MODELS[request.model] ?? request.model;

  // Build request body based on type
  const body: Record<string, unknown> = { prompt: request.prompt };
  if (request.duration_seconds) body.duration = request.duration_seconds;
  if (request.width) body.image_size = { width: request.width, height: request.height };

  // Handle style_reference: local file paths → base64 data URI, URLs pass through
  if (request.style_reference) {
    const ref = request.style_reference;
    if (ref.startsWith("/") || ref.startsWith("C:") || ref.startsWith("\\")) {
      body.image_url = await localFileToDataUri(ref);
    } else {
      body.image_url = ref;
    }
  }

  // Submit to queue
  const submitRes = await fetch(`https://queue.fal.run/${modelId}`, {
    method: "POST",
    headers: {
      Authorization: `Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!submitRes.ok) {
    const errText = await submitRes.text();
    throw new Error(`FAL submit failed (${submitRes.status}): ${errText}`);
  }

  // FAL returns status_url and response_url — use these instead of constructing manually,
  // because the model path in URLs may differ from the submit endpoint (e.g. "flux" vs "flux/schnell")
  const submitData = (await submitRes.json()) as {
    request_id: string;
    status_url: string;
    response_url: string;
  };
  const { request_id } = submitData;

  // Poll for completion
  const MAX_POLLS = 120;
  const POLL_INTERVAL = 5000;

  for (let i = 0; i < MAX_POLLS; i++) {
    await sleep(POLL_INTERVAL);

    const statusRes = await fetch(submitData.status_url, {
      headers: { Authorization: `Key ${apiKey}` },
    });
    const status = (await statusRes.json()) as {
      status: string;
    };

    if (status.status === "COMPLETED") {
      // Fetch the result using the response_url from the submit
      const resultRes = await fetch(submitData.response_url, {
        headers: { Authorization: `Key ${apiKey}` },
      });
      const result = (await resultRes.json()) as {
        video?: { url: string };
        image?: { url: string };
        images?: Array<{ url: string }>;
        audio?: { url: string };
      };

      // Download the generated file (handle singular "image" for BiRefNet, plural "images" for Flux, etc.)
      const fileUrl = result.video?.url ?? result.image?.url ?? result.images?.[0]?.url ?? result.audio?.url;
      if (!fileUrl) throw new Error("FAL result missing output URL");

      const ext = request.type === "image" || request.type === "segmentation" ? "png" : request.type === "audio" ? "mp3" : "mp4";
      const outputPath = join(outputDir, `fal-${request_id}.${ext}`);
      await downloadFile(fileUrl, outputPath);

      return { file_path: outputPath, cost_usd: estimateCost(request.model) };
    }

    if (status.status === "ERROR") {
      throw new Error(`FAL generation failed for request ${request_id}`);
    }
  }

  throw new Error(`FAL generation timed out after ${MAX_POLLS * POLL_INTERVAL / 1000}s`);
}

// ── ElevenLabs ──────────────────────────────────────────────────────────

const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // "Rachel" — ElevenLabs default

async function generateWithElevenLabs(
  apiKey: string,
  request: GenerationRequest,
  outputDir: string,
): Promise<{ file_path: string; cost_usd: number }> {
  const voiceId = request.voice_id ?? DEFAULT_VOICE_ID;

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: request.prompt,
        model_id: "eleven_multilingual_v2",
      }),
    },
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`ElevenLabs TTS failed (${res.status}): ${errText}`);
  }

  const audioBuffer = await res.arrayBuffer();
  const outputPath = join(outputDir, `elevenlabs-${Date.now()}.mp3`);
  await writeFile(outputPath, Buffer.from(audioBuffer));

  return { file_path: outputPath, cost_usd: estimateCost("elevenlabs") };
}

// ── Higgsfield ──────────────────────────────────────────────────────────

async function generateWithHiggsfield(
  apiKey: string,
  apiSecret: string,
  request: GenerationRequest,
  outputDir: string,
): Promise<{ file_path: string; cost_usd: number }> {
  const body: Record<string, unknown> = { prompt: request.prompt };
  // Higgsfield requires image_url — their endpoint does image-to-video transformation
  if (!request.style_reference) {
    throw new Error("Higgsfield requires style_reference (image_url) for character generation");
  }
  body.image_url = request.style_reference;
  if (request.duration_seconds) body.duration = request.duration_seconds;

  // Submit to queue
  const submitRes = await fetch(
    "https://platform.higgsfield.ai/higgsfield-ai/dop/standard",
    {
      method: "POST",
      headers: {
        Authorization: `Key ${apiKey}:${apiSecret}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!submitRes.ok) {
    const errText = await submitRes.text();
    throw new Error(`Higgsfield submit failed (${submitRes.status}): ${errText}`);
  }

  const { request_id, status_url } = (await submitRes.json()) as {
    request_id: string;
    status_url: string;
  };

  // Poll for completion
  const MAX_POLLS = 120;
  const POLL_INTERVAL = 5000;

  for (let i = 0; i < MAX_POLLS; i++) {
    await sleep(POLL_INTERVAL);

    const statusRes = await fetch(status_url, {
      headers: {
        Authorization: `Key ${apiKey}:${apiSecret}`,
        Accept: "application/json",
      },
    });
    const status = (await statusRes.json()) as {
      status: string;
      videos?: Array<{ url: string }>;
      images?: Array<{ url: string }>;
      error?: { message: string };
    };

    if (status.status === "completed") {
      const fileUrl = status.videos?.[0]?.url ?? status.images?.[0]?.url;
      if (!fileUrl) throw new Error("Higgsfield result missing output URL");

      const ext = status.videos?.[0] ? "mp4" : "png";
      const outputPath = join(outputDir, `higgsfield-${request_id}.${ext}`);
      await downloadFile(fileUrl, outputPath);

      return { file_path: outputPath, cost_usd: estimateCost("higgsfield") };
    }

    if (status.status === "error" || status.status === "nsfw") {
      throw new Error(
        `Higgsfield generation failed: ${status.error?.message ?? status.status}`,
      );
    }
  }

  throw new Error(`Higgsfield generation timed out after ${MAX_POLLS * POLL_INTERVAL / 1000}s`);
}

// ── Shared Helpers ──────────────────────────────────────────────────────

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".mp3": "audio/mpeg",
};

/** Convert a local file to a base64 data URI for FAL API input. */
async function localFileToDataUri(filePath: string): Promise<string> {
  const ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
  const mime = MIME_TYPES[ext] ?? "application/octet-stream";
  const data = await readFile(filePath);
  return `data:${mime};base64,${data.toString("base64")}`;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function downloadFile(url: string, outputPath: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`);
  const buffer = await res.arrayBuffer();
  await writeFile(outputPath, Buffer.from(buffer));
}
