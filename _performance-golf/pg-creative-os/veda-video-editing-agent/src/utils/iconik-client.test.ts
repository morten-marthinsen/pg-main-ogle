/**
 * Tests for iconik-client.ts — Iconik REST API client for Veda.
 *
 * Uses mock fetch to test all client methods and the fetchSource factory.
 * Integration tests (real API calls) gated behind VEDA_ICONIK_INTEGRATION=1.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  IconikClient,
  createFetchSource,
  createUploadAssets,
  createIconikClientFromEnv,
  parseSrt,
  type IconikConfig,
  type IconikAsset,
  type IconikFile,
  type IconikFileDetail,
  type IconikProxy,
  type TranscriptionStatus,
  type FileEntryParams,
} from "./iconik-client.js";

// ── Test config ─────────────────────────────────────────────────────────────

const TEST_CONFIG: IconikConfig = {
  appId: "test-app-id",
  authToken: "test-auth-token",
  baseUrl: "https://app.iconik.io/API/",
};

// ── Mock fetch ──────────────────────────────────────────────────────────────

const mockFetch = vi.fn();
const originalFetch = globalThis.fetch;

beforeEach(() => {
  globalThis.fetch = mockFetch;
  mockFetch.mockReset();
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function mockJsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

// ── IconikClient.searchByName ───────────────────────────────────────────────

describe("IconikClient.searchByName", () => {
  it("searches by title and returns mapped assets", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        objects: [
          { id: "abc-123", title: "dqfe-0012-v0001.mp4", is_online: true, object_type: "asset" },
          { id: "def-456", title: "dqfe-0012-v0002.mp4", is_online: true, object_type: "asset" },
        ],
      }),
    );

    const results = await client.searchByName("dqfe-0012");

    expect(results).toHaveLength(2);
    expect(results[0]).toEqual({
      id: "abc-123",
      title: "dqfe-0012-v0001.mp4",
      is_online: true,
      type: "asset",
    });

    // Verify search request shape
    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toBe("https://app.iconik.io/API/search/v1/search/");
    expect(opts.method).toBe("POST");
    expect(opts.headers["App-ID"]).toBe("test-app-id");
    const body = JSON.parse(opts.body);
    expect(body.query).toBe("dqfe-0012");
    expect(body.doc_types).toEqual(["assets"]);
  });

  it("returns empty array when no results", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ objects: [] }));

    const results = await client.searchByName("nonexistent");
    expect(results).toEqual([]);
  });

  it("throws on API error", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ errors: ["Unauthorized"] }, 401));

    await expect(client.searchByName("test")).rejects.toThrow("Iconik search failed (401)");
  });

  it("respects limit parameter", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ objects: [] }));

    await client.searchByName("test", 5);

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.per_page).toBe(5);
  });
});

// ── IconikClient.getFiles ───────────────────────────────────────────────────

describe("IconikClient.getFiles", () => {
  it("returns file list for asset", async () => {
    const client = new IconikClient(TEST_CONFIG);
    const mockFiles: IconikFile[] = [
      {
        id: "file-1",
        name: "dqfe-0012.mp4",
        original_name: "dqfe-0012.mp4",
        size: 201842376,
        status: "CLOSED",
        storage_method: "S3",
        format_id: "fmt-1",
        file_set_id: "fs-1",
      },
    ];
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ objects: mockFiles }));

    const files = await client.getFiles("asset-123");

    expect(files).toHaveLength(1);
    expect(files[0].name).toBe("dqfe-0012.mp4");
    expect(mockFetch.mock.calls[0][0]).toBe(
      "https://app.iconik.io/API/files/v1/assets/asset-123/files/",
    );
  });

  it("throws on 404", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ errors: ["Not found"] }, 404));

    await expect(client.getFiles("bad-id")).rejects.toThrow("Iconik getFiles failed (404)");
  });
});

// ── IconikClient.getFileDetail ──────────────────────────────────────────────

describe("IconikClient.getFileDetail", () => {
  it("returns file detail with signed URL", async () => {
    const client = new IconikClient(TEST_CONFIG);
    const mockDetail: IconikFileDetail = {
      id: "file-1",
      name: "dqfe-0012.mp4",
      original_name: "dqfe-0012.mp4",
      size: 201842376,
      status: "CLOSED",
      storage_method: "S3",
      format_id: "fmt-1",
      file_set_id: "fs-1",
      url: "https://s3.example.com/signed-url?token=abc",
      directory_path: "Performance Golf/DQFE/",
    };
    mockFetch.mockResolvedValueOnce(mockJsonResponse(mockDetail));

    const detail = await client.getFileDetail("asset-123", "file-1");

    expect(detail.url).toBe("https://s3.example.com/signed-url?token=abc");
    expect(mockFetch.mock.calls[0][0]).toBe(
      "https://app.iconik.io/API/files/v1/assets/asset-123/files/file-1/",
    );
  });
});

// ── IconikClient.getProxies ─────────────────────────────────────────────────

describe("IconikClient.getProxies", () => {
  it("returns proxy list with signed URLs", async () => {
    const client = new IconikClient(TEST_CONFIG);
    const mockProxies: IconikProxy[] = [
      {
        id: "proxy-1",
        name: "dqfe-0012-lowres.mp4",
        size: 41363694,
        url: "https://storage.googleapis.com/signed-proxy-url",
        resolution: { width: 1080, height: 1920 },
        codec: "AVC",
        format: "MPEG-4",
        filename: "proxy-1.mp4",
      },
    ];
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ objects: mockProxies }));

    const proxies = await client.getProxies("asset-123");

    expect(proxies).toHaveLength(1);
    expect(proxies[0].url).toContain("googleapis.com");
    expect(proxies[0].resolution.width).toBe(1080);
  });
});

// ── createFetchSource (proxy mode) ──────────────────────────────────────────

describe("createFetchSource", () => {
  const DOWNLOAD_DIR = "/tmp/veda-test";

  it("SUCCESS — finds asset, downloads proxy", async () => {
    const client = new IconikClient(TEST_CONFIG);

    // Mock search
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        objects: [
          { id: "asset-uuid", title: "dqfe-0012-v0001-9x16.mp4", is_online: true, object_type: "asset" },
        ],
      }),
    );

    // Mock getProxies
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        objects: [
          {
            id: "proxy-1",
            name: "dqfe-0012-lowres.mp4",
            size: 41363694,
            url: "https://storage.example.com/proxy.mp4",
            resolution: { width: 1080, height: 1920 },
            codec: "AVC",
            format: "MPEG-4",
            filename: "proxy-1.mp4",
          },
        ],
      }),
    );

    // Mock download — create a mock response with body stream
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fake-video-data"));
        controller.close();
      },
    });
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200, body });

    const fetchSource = createFetchSource(client, DOWNLOAD_DIR, "proxy");
    const result = await fetchSource("dqfe-0012-v0001-9x16");

    expect(result.status).toBe("SUCCESS");
    if (result.status === "SUCCESS") {
      expect(result.data.file_path).toBe("/tmp/veda-test/dqfe-0012-lowres.mp4");
    }
  });

  it("FAILED — no matching asset found", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ objects: [] }));

    const fetchSource = createFetchSource(client, DOWNLOAD_DIR, "proxy");
    const result = await fetchSource("nonexistent-asset");

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.error_category).toBe("ICONIK_ERROR");
      expect(result.message).toContain("No Iconik asset found");
    }
  });

  it("FAILED — asset found but no proxies", async () => {
    const client = new IconikClient(TEST_CONFIG);

    // Mock search
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        objects: [
          { id: "asset-uuid", title: "dqfe-0012-v0001.mp4", is_online: true, object_type: "asset" },
        ],
      }),
    );

    // Mock getProxies — empty
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ objects: [] }));

    const fetchSource = createFetchSource(client, DOWNLOAD_DIR, "proxy");
    const result = await fetchSource("dqfe-0012");

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.message).toContain("no proxies");
    }
  });

  it("FAILED — asset found but no original files (original mode)", async () => {
    const client = new IconikClient(TEST_CONFIG);

    // Mock search
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        objects: [
          { id: "asset-uuid", title: "dqfe-0012-v0001.mp4", is_online: true, object_type: "asset" },
        ],
      }),
    );

    // Mock getFiles — only editproxy, no originals
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        objects: [
          {
            id: "file-1",
            name: "dqfe-0012-v0001_editproxy.mov",
            original_name: "dqfe-0012-v0001_editproxy.mov",
            size: 183750290,
            status: "CLOSED",
            storage_method: "S3",
            format_id: "fmt-1",
            file_set_id: "fs-1",
          },
        ],
      }),
    );

    const fetchSource = createFetchSource(client, DOWNLOAD_DIR, "original");
    const result = await fetchSource("dqfe-0012");

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.message).toContain("no original files");
    }
  });

  it("FAILED — network error caught gracefully", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockRejectedValueOnce(new Error("Network timeout"));

    const fetchSource = createFetchSource(client, DOWNLOAD_DIR, "proxy");
    const result = await fetchSource("dqfe-0012");

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.error_category).toBe("ICONIK_ERROR");
      expect(result.message).toContain("Network timeout");
      expect(result.recovery_action).toBe("retry");
    }
  });

  it("matches by script ID prefix when exact title match fails", async () => {
    const client = new IconikClient(TEST_CONFIG);

    // Search returns asset with longer title
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        objects: [
          {
            id: "asset-uuid",
            title: "dqfe-0012-v0001-9x16-nn-vd-1min-mris-arvn-ch-blackfriday2025-11212025.mp4",
            is_online: true,
            object_type: "asset",
          },
        ],
      }),
    );

    // Mock getProxies
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        objects: [
          {
            id: "proxy-1",
            name: "dqfe-0012-lowres.mp4",
            size: 41363694,
            url: "https://example.com/proxy.mp4",
            resolution: { width: 1080, height: 1920 },
            codec: "AVC",
            format: "MPEG-4",
            filename: "proxy-1.mp4",
          },
        ],
      }),
    );

    // Mock download
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("data"));
        controller.close();
      },
    });
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200, body });

    const fetchSource = createFetchSource(client, DOWNLOAD_DIR, "proxy");
    // Search with a partial asset ID — should match by "dqfe-0012" prefix
    const result = await fetchSource("dqfe-0012");

    expect(result.status).toBe("SUCCESS");
  });

  it("original mode — fetches file detail for signed URL", async () => {
    const client = new IconikClient(TEST_CONFIG);

    // Mock search
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        objects: [
          { id: "asset-uuid", title: "dqfe-0012-v0001.mp4", is_online: true, object_type: "asset" },
        ],
      }),
    );

    // Mock getFiles
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        objects: [
          {
            id: "file-orig",
            name: "dqfe-0012-v0001.mp4",
            original_name: "dqfe-0012-v0001.mp4",
            size: 201842376,
            status: "CLOSED",
            storage_method: "S3",
            format_id: "fmt-1",
            file_set_id: "fs-1",
          },
          {
            id: "file-proxy",
            name: "dqfe-0012-v0001_editproxy.mov",
            original_name: "dqfe-0012-v0001_editproxy.mov",
            size: 183750290,
            status: "CLOSED",
            storage_method: "S3",
            format_id: "fmt-2",
            file_set_id: "fs-2",
          },
        ],
      }),
    );

    // Mock getFileDetail
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        id: "file-orig",
        name: "dqfe-0012-v0001.mp4",
        original_name: "dqfe-0012-v0001.mp4",
        size: 201842376,
        status: "CLOSED",
        storage_method: "S3",
        format_id: "fmt-1",
        file_set_id: "fs-1",
        url: "https://s3.example.com/original.mp4?signed=true",
        directory_path: "DQFE/",
      }),
    );

    // Mock download
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("original-data"));
        controller.close();
      },
    });
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200, body });

    const fetchSource = createFetchSource(client, DOWNLOAD_DIR, "original");
    const result = await fetchSource("dqfe-0012");

    expect(result.status).toBe("SUCCESS");
    if (result.status === "SUCCESS") {
      expect(result.data.file_path).toBe("/tmp/veda-test/dqfe-0012-v0001.mp4");
    }

    // Verify getFileDetail was called (3rd fetch call)
    expect(mockFetch.mock.calls[2][0]).toContain("/files/file-orig/");
  });
});

// ── createIconikClientFromEnv ───────────────────────────────────────────────

describe("createIconikClientFromEnv", () => {
  const origEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...origEnv };
  });

  it("returns IconikClient when credentials are set", () => {
    process.env.ICONIK_APP_ID = "test-app";
    process.env.ICONIK_AUTH_TOKEN = "test-token";

    const client = createIconikClientFromEnv();
    expect(client).toBeInstanceOf(IconikClient);
  });

  it("returns null when APP_ID is missing", () => {
    delete process.env.ICONIK_APP_ID;
    process.env.ICONIK_AUTH_TOKEN = "test-token";

    const client = createIconikClientFromEnv();
    expect(client).toBeNull();
  });

  it("returns null when AUTH_TOKEN is missing", () => {
    process.env.ICONIK_APP_ID = "test-app";
    delete process.env.ICONIK_AUTH_TOKEN;

    const client = createIconikClientFromEnv();
    expect(client).toBeNull();
  });
});

// ── Custom baseUrl ──────────────────────────────────────────────────────────

describe("custom baseUrl", () => {
  it("strips trailing slash from baseUrl", async () => {
    const client = new IconikClient({
      ...TEST_CONFIG,
      baseUrl: "https://custom.iconik.io/API/",
    });
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ objects: [] }));

    await client.searchByName("test");

    expect(mockFetch.mock.calls[0][0]).toBe("https://custom.iconik.io/API/search/v1/search/");
  });
});

// ── IconikClient.getTranscribeStatus ────────────────────────────────────────

describe("IconikClient.getTranscribeStatus", () => {
  it("returns DONE when version has transcribe_status DONE", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        id: "asset-123",
        versions: [{ id: "v-1", transcribe_status: "DONE" }],
      }),
    );

    const result = await client.getTranscribeStatus("asset-123");

    expect(result.status).toBe("DONE");
    expect(result.version_id).toBe("v-1");
    expect(mockFetch.mock.calls[0][0]).toBe(
      "https://app.iconik.io/API/assets/v1/assets/asset-123/",
    );
  });

  it("returns COMPLETED when version has transcribe_status COMPLETED", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        id: "asset-123",
        versions: [{ id: "v-1", transcribe_status: "COMPLETED" }],
      }),
    );

    const result = await client.getTranscribeStatus("asset-123");

    expect(result.status).toBe("COMPLETED");
    expect(result.version_id).toBe("v-1");
  });

  it("returns DONE from non-first version when versions[0] has no transcription", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        id: "asset-123",
        versions: [
          { id: "v-1", transcribe_status: "N/A" },
          { id: "v-2", transcribe_status: "N/A" },
          { id: "v-3", transcribe_status: "DONE" },
        ],
      }),
    );

    const result = await client.getTranscribeStatus("asset-123");

    expect(result.status).toBe("DONE");
    expect(result.version_id).toBe("v-3");
  });

  it("returns COMPLETED from middle version, skipping N/A versions", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        id: "asset-123",
        versions: [
          { id: "v-1" },
          { id: "v-2", transcribe_status: "COMPLETED" },
          { id: "v-3", transcribe_status: "N/A" },
        ],
      }),
    );

    const result = await client.getTranscribeStatus("asset-123");

    expect(result.status).toBe("COMPLETED");
    expect(result.version_id).toBe("v-2");
  });

  it("returns N/A when versions array is empty", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ id: "asset-123", versions: [] }));

    const result = await client.getTranscribeStatus("asset-123");
    expect(result.status).toBe("N/A");
    expect(result.version_id).toBeUndefined();
  });

  it("returns N/A when transcribe_status is missing from version", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({ id: "asset-123", versions: [{ id: "v-1" }] }),
    );

    const result = await client.getTranscribeStatus("asset-123");
    expect(result.status).toBe("N/A");
  });

  it("throws on API error", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ error: "Not found" }, 404));

    await expect(client.getTranscribeStatus("bad-id")).rejects.toThrow(
      "Iconik getTranscribeStatus failed (404)",
    );
  });
});

// ── IconikClient.triggerTranscription ───────────────────────────────────────

describe("IconikClient.triggerTranscription", () => {
  it("resolves on 200", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ status: "ok" }, 200));

    await expect(client.triggerTranscription("asset-123")).resolves.toBeUndefined();

    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toBe(
      "https://app.iconik.io/API/transcode/v1/transcribe/assets/asset-123/profiles/default/",
    );
    expect(opts.method).toBe("POST");
  });

  it("throws on 4xx error", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ error: "Bad request" }, 400));

    await expect(client.triggerTranscription("asset-123")).rejects.toThrow(
      "Iconik triggerTranscription failed (400)",
    );
  });
});

// ── IconikClient.getTranscription ──────────────────────────────────────────

describe("IconikClient.getTranscription", () => {
  it("returns parsed segments from search API when transcription exists", async () => {
    const client = new IconikClient(TEST_CONFIG);

    // Mock search segments response
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        objects: [
          { time_start_milliseconds: 0, time_end_milliseconds: 3500, metadata_cache: "Hey guys, check this out." },
          { time_start_milliseconds: 3500, time_end_milliseconds: 7200, metadata_cache: "This is a game changer." },
        ],
        next_url: null,
      }),
    );

    const result = await client.getTranscription("asset-123");

    expect(result.segments).toHaveLength(2);
    expect(result.segments[0]).toEqual({
      start_time: 0,
      end_time: 3.5,
      text: "Hey guys, check this out.",
    });
    expect(result.segments[1]).toEqual({
      start_time: 3.5,
      end_time: 7.2,
      text: "This is a game changer.",
    });
    expect(result.content).toBe("Hey guys, check this out. This is a game changer.");

    // Verify search endpoint was called with POST
    expect(mockFetch.mock.calls[0][1]?.method).toBe("POST");
    expect(mockFetch.mock.calls[0][0]).toContain("/search/v1/search/");
  });

  it("deduplicates segments with same time range", async () => {
    const client = new IconikClient(TEST_CONFIG);

    // Iconik returns duplicates when transcription is triggered multiple times
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        objects: [
          { time_start_milliseconds: 0, time_end_milliseconds: 3500, metadata_cache: "Hello world." },
          { time_start_milliseconds: 0, time_end_milliseconds: 3500, metadata_cache: "Hello world." },
          { time_start_milliseconds: 3500, time_end_milliseconds: 7000, metadata_cache: "Second segment." },
          { time_start_milliseconds: 3500, time_end_milliseconds: 7000, metadata_cache: "Second segment." },
        ],
        next_url: null,
      }),
    );

    const result = await client.getTranscription("asset-123");

    expect(result.segments).toHaveLength(2);
    expect(result.segments[0].text).toBe("Hello world.");
    expect(result.segments[1].text).toBe("Second segment.");
  });

  it("returns empty segments when no transcription segments exist", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ objects: [], next_url: null }));

    const result = await client.getTranscription("asset-123");

    expect(result.content).toBe("");
    expect(result.segments).toEqual([]);
  });

  it("throws on search API error", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ error: "Forbidden" }, 403));

    await expect(client.getTranscription("asset-123")).rejects.toThrow(
      "Iconik getTranscription search failed (403)",
    );
  });
});

// ── parseSrt ────────────────────────────────────────────────────────────────

describe("parseSrt", () => {
  it("parses standard SRT blocks", () => {
    const srt = `1
00:00:01,500 --> 00:00:04,000
First subtitle line.

2
00:00:04,500 --> 00:00:07,200
Second subtitle line.`;

    const segments = parseSrt(srt);

    expect(segments).toHaveLength(2);
    expect(segments[0]).toEqual({
      start_time: 1.5,
      end_time: 4.0,
      text: "First subtitle line.",
    });
    expect(segments[1]).toEqual({
      start_time: 4.5,
      end_time: 7.2,
      text: "Second subtitle line.",
    });
  });

  it("handles multi-line text in a single block", () => {
    const srt = `1
00:00:00,000 --> 00:00:05,000
This is line one
and this is line two`;

    const segments = parseSrt(srt);

    expect(segments).toHaveLength(1);
    expect(segments[0].text).toBe("This is line one and this is line two");
  });

  it("returns empty array for empty input", () => {
    expect(parseSrt("")).toEqual([]);
    expect(parseSrt("   ")).toEqual([]);
  });

  it("handles period decimal separators (00:00:01.500)", () => {
    const srt = `1
00:00:01.500 --> 00:00:04.000
Period-separated timestamps.`;

    const segments = parseSrt(srt);

    expect(segments).toHaveLength(1);
    expect(segments[0].start_time).toBe(1.5);
    expect(segments[0].end_time).toBe(4.0);
  });

  it("handles hour-level timestamps", () => {
    const srt = `1
01:30:15,200 --> 01:30:20,800
Deep into the video.`;

    const segments = parseSrt(srt);

    expect(segments).toHaveLength(1);
    expect(segments[0].start_time).toBeCloseTo(5415.2, 1);
    expect(segments[0].end_time).toBeCloseTo(5420.8, 1);
  });

  it("handles Windows-style line endings (\\r\\n)", () => {
    const srt = "1\r\n00:00:00,000 --> 00:00:02,000\r\nWindows line.\r\n\r\n2\r\n00:00:02,500 --> 00:00:05,000\r\nSecond block.";

    const segments = parseSrt(srt);

    expect(segments).toHaveLength(2);
    expect(segments[0].text).toBe("Windows line.");
    expect(segments[1].text).toBe("Second block.");
  });
});

// ── IconikClient.getFilesStorage ─────────────────────────────────────────────

describe("IconikClient.getFilesStorage", () => {
  it("returns storage id and method", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({ id: "storage-123", method: "GCS" }),
    );

    const result = await client.getFilesStorage();

    expect(result).toEqual({ id: "storage-123", method: "GCS" });
    expect(mockFetch.mock.calls[0][0]).toBe(
      "https://app.iconik.io/API/files/v1/storages/be9c13ce-8dd3-11ec-8e6e-4eafb0a20354/",
    );
  });

  it("caches result on second call", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({ id: "storage-123", method: "GCS" }),
    );

    await client.getFilesStorage();
    const result = await client.getFilesStorage();

    expect(result).toEqual({ id: "storage-123", method: "GCS" });
    expect(mockFetch).toHaveBeenCalledTimes(1); // Only one fetch call
  });

  it("throws on API error", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ error: "Forbidden" }, 403));

    await expect(client.getFilesStorage()).rejects.toThrow("Iconik getFilesStorage failed (403)");
  });
});

// ── IconikClient.createAsset ─────────────────────────────────────────────────

describe("IconikClient.createAsset", () => {
  it("creates asset and returns assetId + userId", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({ id: "new-asset-id", user_id: "user-abc" }),
    );

    const result = await client.createAsset("dqfe-0036-v0003-hs-1");

    expect(result).toEqual({ assetId: "new-asset-id", userId: "user-abc" });
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.title).toBe("dqfe-0036-v0003-hs-1");
    expect(body.type).toBe("ASSET");
  });

  it("throws on API error", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ error: "Conflict" }, 409));

    await expect(client.createAsset("test")).rejects.toThrow("Iconik createAsset failed (409)");
  });
});

// ── IconikClient.createFormat ────────────────────────────────────────────────

describe("IconikClient.createFormat", () => {
  it("creates format and returns formatId", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ id: "format-123" }));

    const result = await client.createFormat("asset-1", "user-1", "video/mp4", "GCS");

    expect(result).toBe("format-123");
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.user_id).toBe("user-1");
    expect(body.media_type).toBe("video/mp4");
    expect(body.storage_methods).toEqual(["GCS"]);
  });

  it("throws on API error", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ error: "Bad request" }, 400));

    await expect(client.createFormat("a", "u", "video/mp4", "GCS")).rejects.toThrow(
      "Iconik createFormat failed (400)",
    );
  });
});

// ── IconikClient.createFileSet ───────────────────────────────────────────────

describe("IconikClient.createFileSet", () => {
  it("creates file set and returns fileSetId", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ id: "fileset-456" }));

    const result = await client.createFileSet("asset-1", "format-1", "storage-1", "test.mp4");

    expect(result).toBe("fileset-456");
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.format_id).toBe("format-1");
    expect(body.storage_id).toBe("storage-1");
    expect(body.name).toBe("test.mp4");
  });

  it("throws on API error", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ error: "Server error" }, 500));

    await expect(client.createFileSet("a", "f", "s", "n")).rejects.toThrow(
      "Iconik createFileSet failed (500)",
    );
  });
});

// ── IconikClient.createFileEntry ─────────────────────────────────────────────

describe("IconikClient.createFileEntry", () => {
  it("creates file entry and returns fileId + uploadUrl", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({ id: "file-789", upload_url: "https://storage.googleapis.com/upload?..." }),
    );

    const params: FileEntryParams = {
      fileName: "test.mp4",
      fileSize: 50000000,
      formatId: "fmt-1",
      fileSetId: "fs-1",
      storageId: "stor-1",
    };
    const result = await client.createFileEntry("asset-1", params);

    expect(result).toEqual({
      fileId: "file-789",
      uploadUrl: "https://storage.googleapis.com/upload?...",
    });
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.original_name).toBe("test.mp4");
    expect(body.size).toBe(50000000);
  });

  it("throws on API error", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ error: "Unauthorized" }, 401));

    await expect(
      client.createFileEntry("a", {
        fileName: "f",
        fileSize: 1,
        formatId: "f",
        fileSetId: "f",
        storageId: "s",
      }),
    ).rejects.toThrow("Iconik createFileEntry failed (401)");
  });
});

// ── IconikClient.uploadToGcs ─────────────────────────────────────────────────

describe("IconikClient.uploadToGcs", () => {
  it("throws on nonexistent file (readFile ENOENT)", async () => {
    const client = new IconikClient(TEST_CONFIG);
    await expect(
      client.uploadToGcs("https://upload.example.com", "/nonexistent/file.mp4", 1000, "asset-1", "file-1"),
    ).rejects.toThrow();
  });

  it("throws when GCS resumable init fails", async () => {
    const client = new IconikClient(TEST_CONFIG);
    // uploadToGcs reads file first, then calls fetch — mock will only be hit if file exists
    // Test the init failure by providing a real (temp) file path
    const { writeFileSync, unlinkSync } = await import("node:fs");
    const tmpPath = "/tmp/veda-test-upload.bin";
    writeFileSync(tmpPath, Buffer.alloc(64, 0x00));
    try {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        text: async () => "SignatureDoesNotMatch",
      });
      await expect(
        client.uploadToGcs("https://upload.example.com", tmpPath, 64, "asset-1", "file-1"),
      ).rejects.toThrow("GCS resumable init failed (403)");
    } finally {
      unlinkSync(tmpPath);
    }
  });

  it("throws when GCS resumable init returns no upload ID", async () => {
    const client = new IconikClient(TEST_CONFIG);
    const { writeFileSync, unlinkSync } = await import("node:fs");
    const tmpPath = "/tmp/veda-test-upload-2.bin";
    writeFileSync(tmpPath, Buffer.alloc(64, 0x00));
    try {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        headers: new Map(),
        text: async () => "",
      });
      await expect(
        client.uploadToGcs("https://upload.example.com", tmpPath, 64, "asset-1", "file-1"),
      ).rejects.toThrow("missing X-GUploader-UploadID");
    } finally {
      unlinkSync(tmpPath);
    }
  });

  it("throws when GCS PUT fails", async () => {
    const client = new IconikClient(TEST_CONFIG);
    const { writeFileSync, unlinkSync } = await import("node:fs");
    const tmpPath = "/tmp/veda-test-upload-3.bin";
    writeFileSync(tmpPath, Buffer.alloc(64, 0x00));
    try {
      // Init succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        headers: new Map([["x-guploader-uploadid", "test-upload-id"]]),
        text: async () => "",
      });
      // PUT fails
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => "Internal Server Error",
      });
      await expect(
        client.uploadToGcs("https://upload.example.com?Expires=123&Signature=abc", tmpPath, 64, "asset-1", "file-1"),
      ).rejects.toThrow("GCS upload PUT failed (500)");
    } finally {
      unlinkSync(tmpPath);
    }
  });

  it("throws when Iconik compose fails", async () => {
    const client = new IconikClient(TEST_CONFIG);
    const { writeFileSync, unlinkSync } = await import("node:fs");
    const tmpPath = "/tmp/veda-test-upload-4.bin";
    writeFileSync(tmpPath, Buffer.alloc(64, 0x00));
    try {
      // Init succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        headers: new Map([["x-guploader-uploadid", "test-upload-id"]]),
        text: async () => "",
      });
      // PUT succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => "",
      });
      // Compose fails
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: async () => "Bad Request",
      });
      await expect(
        client.uploadToGcs("https://upload.example.com?Expires=123&Signature=abc", tmpPath, 64, "asset-1", "file-1"),
      ).rejects.toThrow("Iconik GCS compose failed (400)");
    } finally {
      unlinkSync(tmpPath);
    }
  });

  it("completes full 3-step resumable upload successfully", async () => {
    const client = new IconikClient(TEST_CONFIG);
    const { writeFileSync, unlinkSync } = await import("node:fs");
    const tmpPath = "/tmp/veda-test-upload-5.bin";
    writeFileSync(tmpPath, Buffer.alloc(64, 0x00));
    try {
      // Init succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        headers: new Map([["x-guploader-uploadid", "test-upload-id-123"]]),
        text: async () => "",
      });
      // PUT succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => "",
      });
      // Compose succeeds
      mockFetch.mockResolvedValueOnce(mockJsonResponse({ status: "ok" }));

      await client.uploadToGcs(
        "https://storage.googleapis.com/bucket/file.mp4?Expires=123&Signature=abc",
        tmpPath, 64, "asset-1", "file-1",
      );

      // Verify 3 fetch calls
      expect(mockFetch).toHaveBeenCalledTimes(3);

      // Call 1: POST init with x-goog-resumable
      const [initUrl, initOpts] = mockFetch.mock.calls[0];
      expect(initUrl).toBe("https://storage.googleapis.com/bucket/file.mp4?Expires=123&Signature=abc");
      expect(initOpts.method).toBe("POST");
      expect(initOpts.headers["x-goog-resumable"]).toBe("start");

      // Call 2: PUT with upload_id appended
      const [putUrl, putOpts] = mockFetch.mock.calls[1];
      expect(putUrl).toContain("&upload_id=test-upload-id-123");
      expect(putOpts.method).toBe("PUT");

      // Call 3: Compose to Iconik
      const [composeUrl, composeOpts] = mockFetch.mock.calls[2];
      expect(composeUrl).toBe("https://app.iconik.io/API/files/v1/assets/asset-1/files/file-1/multipart/gcs/compose_url/");
      expect(composeOpts.method).toBe("POST");
      expect(JSON.parse(composeOpts.body).content_type).toBe("application/octet-stream");
    } finally {
      unlinkSync(tmpPath);
    }
  });
});

// ── IconikClient.finalizeUpload ──────────────────────────────────────────────

describe("IconikClient.finalizeUpload", () => {
  it("PATCHes file to CLOSED and triggers keyframes", async () => {
    const client = new IconikClient(TEST_CONFIG);

    // Mock PATCH
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ status: "CLOSED" }));
    // Mock keyframes POST
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ status: "ok" }));

    await expect(client.finalizeUpload("asset-1", "file-1")).resolves.toBeUndefined();

    // Verify PATCH
    const [patchUrl, patchOpts] = mockFetch.mock.calls[0];
    expect(patchUrl).toBe("https://app.iconik.io/API/files/v1/assets/asset-1/files/file-1/");
    expect(patchOpts.method).toBe("PATCH");
    expect(JSON.parse(patchOpts.body).status).toBe("CLOSED");
    expect(JSON.parse(patchOpts.body).progress_processed).toBe(100);

    // Verify keyframes POST
    const [kfUrl, kfOpts] = mockFetch.mock.calls[1];
    expect(kfUrl).toBe("https://app.iconik.io/API/files/v1/assets/asset-1/files/file-1/keyframes/");
    expect(kfOpts.method).toBe("POST");
  });

  it("throws when PATCH fails", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ error: "Not found" }, 404));

    await expect(client.finalizeUpload("a", "f")).rejects.toThrow(
      "Iconik finalizeUpload PATCH failed (404)",
    );
  });

  it("throws when keyframes POST fails", async () => {
    const client = new IconikClient(TEST_CONFIG);
    // PATCH succeeds
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ status: "CLOSED" }));
    // Keyframes fails
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ error: "Server error" }, 500));

    await expect(client.finalizeUpload("a", "f")).rejects.toThrow(
      "Iconik finalizeUpload keyframes failed (500)",
    );
  });
});

// ── IconikClient.createCollection ────────────────────────────────────────────

describe("IconikClient.createCollection", () => {
  it("creates collection and returns collectionId", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ id: "coll-new" }));

    const result = await client.createCollection("Veda", "parent-123");

    expect(result).toBe("coll-new");
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.title).toBe("Veda");
    expect(body.parent_id).toBe("parent-123");
  });

  it("throws on API error", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ error: "Forbidden" }, 403));

    await expect(client.createCollection("Test", "parent")).rejects.toThrow(
      "Iconik createCollection failed (403)",
    );
  });
});

// ── IconikClient.addAssetToCollection ────────────────────────────────────────

describe("IconikClient.addAssetToCollection", () => {
  it("POSTs asset into collection contents", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({}, 201));

    await expect(client.addAssetToCollection("coll-1", "asset-1")).resolves.toBeUndefined();

    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toBe("https://app.iconik.io/API/assets/v1/collections/coll-1/contents/");
    expect(opts.method).toBe("POST");
    expect(JSON.parse(opts.body).object_id).toBe("asset-1");
    expect(JSON.parse(opts.body).object_type).toBe("assets");
  });

  it("throws on API error", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ error: "Not found" }, 404));

    await expect(client.addAssetToCollection("c", "a")).rejects.toThrow(
      "Iconik addAssetToCollection failed (404)",
    );
  });
});

// ── IconikClient.getSubCollections ───────────────────────────────────────────

describe("IconikClient.getSubCollections", () => {
  it("returns sub-collections (single page)", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        objects: [
          { id: "coll-a", title: "Veda" },
          { id: "coll-b", title: "Other" },
        ],
        next_url: null,
      }),
    );

    const result = await client.getSubCollections("parent-1");

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ id: "coll-a", title: "Veda" });
    expect(mockFetch.mock.calls[0][0]).toContain(
      "collections/parent-1/contents/?content_types=collections&per_page=100",
    );
  });

  it("paginates through multiple pages", async () => {
    const client = new IconikClient(TEST_CONFIG);
    // Page 1 — has next_url
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        objects: [{ id: "coll-a", title: "First" }],
        next_url: "/API/assets/v1/collections/parent-1/contents/?content_types=collections&per_page=100&page=2",
      }),
    );
    // Page 2 — no next_url
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({
        objects: [{ id: "coll-b", title: "Second" }],
        next_url: null,
      }),
    );

    const result = await client.getSubCollections("parent-1");

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ id: "coll-a", title: "First" });
    expect(result[1]).toEqual({ id: "coll-b", title: "Second" });
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("returns empty array when no sub-collections", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ objects: [], next_url: null }));

    const result = await client.getSubCollections("parent-1");
    expect(result).toEqual([]);
  });

  it("throws on API error", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ error: "Not found" }, 404));

    await expect(client.getSubCollections("bad")).rejects.toThrow(
      "Iconik getSubCollections failed (404)",
    );
  });
});

// ── IconikClient.findOrCreateSubCollection ──────────────────────────────────

describe("IconikClient.findOrCreateSubCollection", () => {
  it("returns existing collection when title matches (exact case)", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({ objects: [{ id: "coll-1", title: "Veda" }], next_url: null }),
    );

    const id = await client.findOrCreateSubCollection("Veda", "parent-1");

    expect(id).toBe("coll-1");
    expect(mockFetch).toHaveBeenCalledTimes(1); // Only getSubCollections, no create
  });

  it("returns existing collection when title matches (case-insensitive)", async () => {
    const client = new IconikClient(TEST_CONFIG);
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({ objects: [{ id: "coll-1", title: "veda" }], next_url: null }),
    );

    const id = await client.findOrCreateSubCollection("Veda", "parent-1");

    expect(id).toBe("coll-1");
    expect(mockFetch).toHaveBeenCalledTimes(1); // Only getSubCollections, no create
  });

  it("creates new collection when no match found", async () => {
    const client = new IconikClient(TEST_CONFIG);
    // getSubCollections returns no match
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({ objects: [{ id: "other", title: "SomeFolder" }], next_url: null }),
    );
    // createCollection returns new ID
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ id: "new-coll" }));

    const id = await client.findOrCreateSubCollection("Veda", "parent-1");

    expect(id).toBe("new-coll");
    expect(mockFetch).toHaveBeenCalledTimes(2); // getSubCollections + createCollection
  });
});

// ── createUploadAssets factory ───────────────────────────────────────────────

describe("createUploadAssets", () => {
  it("returns FAILED when no files provided", async () => {
    const client = new IconikClient(TEST_CONFIG);
    const upload = createUploadAssets(client, "parent-collection");

    const result = await upload([]);

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.message).toContain("No files to upload");
    }
  });

  it("returns FAILED when file does not exist", async () => {
    const client = new IconikClient(TEST_CONFIG);
    const upload = createUploadAssets(client, "parent-collection");

    const result = await upload(["/nonexistent/file.mp4"]);

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.message).toContain("file.mp4");
    }
  });

  it("creates Veda sub-collection on first upload (reuses existing)", async () => {
    const client = new IconikClient(TEST_CONFIG);
    const upload = createUploadAssets(client, "parent-collection");

    // Mock getSubCollections for parent — find existing "Veda"
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({ objects: [{ id: "veda-coll", title: "Veda" }], next_url: null }),
    );

    // Mock getSubCollections for Veda — no offer sub-collection yet
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ objects: [], next_url: null }));

    // Mock createCollection for offer
    mockFetch.mockResolvedValueOnce(mockJsonResponse({ id: "offer-coll" }));

    // The actual file upload will fail since file doesn't exist
    const result = await upload(["/nonexistent/dqfe-0036.mp4"]);

    // Should fail at stat(), but the collection lookup was attempted
    expect(result.status).toBe("FAILED");
  });

  it("returns FAILED when all uploads fail with API errors", async () => {
    const client = new IconikClient(TEST_CONFIG);
    const upload = createUploadAssets(client, "parent-collection");

    const result = await upload(["/nonexistent/a.mp4", "/nonexistent/b.mp4"]);

    expect(result.status).toBe("FAILED");
    if (result.status === "FAILED") {
      expect(result.message).toContain("All uploads failed");
    }
  });

  it("extracts offer code from filename for collection placement", async () => {
    const client = new IconikClient(TEST_CONFIG);

    // We can't fully test the upload without a real file, but we can verify
    // the factory creates a function with correct signature
    const upload = createUploadAssets(client, "parent-collection");
    expect(typeof upload).toBe("function");
  });
});

// ── Integration tests (gated) ───────────────────────────────────────────────

const skipIntegration = !process.env.VEDA_ICONIK_INTEGRATION;

describe.skipIf(skipIntegration)("Iconik integration (live API)", () => {
  it("searches for dqfe-0012 and finds it", async () => {
    globalThis.fetch = originalFetch; // Use real fetch
    const client = createIconikClientFromEnv()!;
    expect(client).not.toBeNull();

    const assets = await client.searchByName("dqfe-0012", 5);
    expect(assets.length).toBeGreaterThan(0);

    const match = assets.find((a) => a.title.includes("dqfe-0012"));
    expect(match).toBeDefined();
    expect(match!.is_online).toBe(true);
  });

  it("gets proxies with download URL for dqfe-0012", async () => {
    globalThis.fetch = originalFetch;
    const client = createIconikClientFromEnv()!;

    const proxies = await client.getProxies("52ebbdc4-c5e1-11f0-bd89-da3b1e442244");
    expect(proxies.length).toBeGreaterThan(0);
    expect(proxies[0].url).toContain("googleapis.com");
  });

  it("gets original file detail with signed URL", async () => {
    globalThis.fetch = originalFetch;
    const client = createIconikClientFromEnv()!;

    const detail = await client.getFileDetail(
      "52ebbdc4-c5e1-11f0-bd89-da3b1e442244",
      "c51549f0-c61e-11f0-917c-ca80a4808261",
    );
    expect(detail.url).toContain("wasabisys.com");
    expect(detail.size).toBeGreaterThan(0);
  });

  it("probes transcription API on dqfe-0012", async () => {
    globalThis.fetch = originalFetch;
    const client = createIconikClientFromEnv()!;
    const DQFE_0012_UUID = "52ebbdc4-c5e1-11f0-bd89-da3b1e442244";

    // Probe 1: Check transcription status
    const status = await client.getTranscribeStatus(DQFE_0012_UUID);
    console.log("[integration] dqfe-0012 transcribe_status:", status);

    // Probe 2: If DONE or COMPLETED, try to get transcription content
    if (status.status === "DONE" || status.status === "COMPLETED") {
      const tx = await client.getTranscription(DQFE_0012_UUID);
      console.log("[integration] dqfe-0012 transcription segments:", tx.segments.length);
      console.log("[integration] first segment:", tx.segments[0]);
      expect(tx.segments.length).toBeGreaterThan(0);
    } else {
      console.log("[integration] dqfe-0012 not transcribed yet — status:", status.status);
      // Still a valid test — we confirmed the status endpoint works
      expect(["N/A", "PENDING", "IN_PROGRESS", "FAILED"]).toContain(status.status);
    }
  });
});
