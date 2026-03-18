/**
 * Iconik REST API client for Veda.
 *
 * Handles: asset search, file listing, proxy listing, file download.
 * Auth: App-ID + Auth-Token headers (Application Token).
 *
 * API base: https://app.iconik.io/API/
 */

import { createWriteStream } from "node:fs";
import { mkdir, stat, readFile } from "node:fs/promises";
import { basename, dirname } from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import type { SubAgentResult } from "../types/sub-agent.js";
import type { TranscriptSegment } from "../types/pipeline.js";

// ── Types ───────────────────────────────────────────────────────────────────

export interface IconikConfig {
  appId: string;
  authToken: string;
  baseUrl?: string; // defaults to "https://app.iconik.io/API/"
}

export interface IconikAsset {
  id: string;
  title: string;
  is_online: boolean;
  type: string;
}

export interface IconikFile {
  id: string;
  name: string;
  original_name: string;
  size: number;
  status: string;
  storage_method: string;
  format_id: string;
  file_set_id: string;
}

export interface IconikFileDetail extends IconikFile {
  url: string; // signed download URL (only from individual file GET)
  directory_path: string;
}

export interface IconikProxy {
  id: string;
  name: string;
  size: number;
  url: string; // signed download URL (always present)
  resolution: { width: number; height: number };
  codec: string;
  format: string;
  filename: string;
}

export interface TranscriptionStatus {
  status: "N/A" | "PENDING" | "IN_PROGRESS" | "DONE" | "COMPLETED" | "FAILED";
  version_id?: string;
}

export interface FileEntryParams {
  fileName: string;
  fileSize: number;
  formatId: string;
  fileSetId: string;
  storageId: string;
}

export interface IconikCollection {
  id: string;
  title: string;
}

// ── Client ──────────────────────────────────────────────────────────────────

export class IconikClient {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(config: IconikConfig) {
    this.baseUrl = (config.baseUrl ?? "https://app.iconik.io/API/").replace(/\/$/, "");
    this.headers = {
      "App-ID": config.appId,
      "Auth-Token": config.authToken,
      "Content-Type": "application/json",
    };
  }

  /** Get a single asset by UUID (skips search). */
  async getAssetById(assetId: string): Promise<IconikAsset | null> {
    const resp = await fetch(`${this.baseUrl}/assets/v1/assets/${assetId}/`, {
      headers: this.headers,
    });

    if (resp.status === 404) return null;
    if (!resp.ok) {
      throw new Error(`Iconik getAssetById failed (${resp.status}): ${await resp.text()}`);
    }

    const o = await resp.json() as { id: string; title: string; is_online: boolean; object_type: string };
    return { id: o.id, title: o.title, is_online: o.is_online, type: o.object_type };
  }

  /** Get files for an asset — used for post-upload verification. */
  async getAssetFiles(assetId: string): Promise<Array<{ id: string; status: string; size: number }>> {
    const resp = await fetch(`${this.baseUrl}/files/v1/assets/${assetId}/files/`, {
      headers: this.headers,
    });

    if (!resp.ok) {
      throw new Error(`Iconik getAssetFiles failed (${resp.status}): ${await resp.text()}`);
    }

    const data = await resp.json() as { objects?: Array<{ id: string; status: string; size: number }> };
    return data.objects ?? [];
  }

  /** Search Iconik assets by title query. */
  async searchByName(query: string, limit = 20): Promise<IconikAsset[]> {
    const body = {
      doc_types: ["assets"],
      query: query,
      filter: {
        operator: "AND",
        terms: [
          { name: "status", value: "ACTIVE" },
          { name: "is_online", value: "true" },
        ],
      },
      sort: [{ name: "date_modified", order: "desc" }],
      per_page: limit,
    };

    const resp = await fetch(`${this.baseUrl}/search/v1/search/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      throw new Error(`Iconik search failed (${resp.status}): ${await resp.text()}`);
    }

    const data = await resp.json() as { objects?: Array<{ id: string; title: string; is_online: boolean; object_type: string }> };
    return (data.objects ?? []).map((o) => ({
      id: o.id,
      title: o.title,
      is_online: o.is_online,
      type: o.object_type,
    }));
  }

  /** Get the list of files for an Iconik asset. */
  async getFiles(assetId: string): Promise<IconikFile[]> {
    const resp = await fetch(`${this.baseUrl}/files/v1/assets/${assetId}/files/`, {
      headers: this.headers,
    });

    if (!resp.ok) {
      throw new Error(`Iconik getFiles failed (${resp.status}): ${await resp.text()}`);
    }

    const data = await resp.json() as { objects?: IconikFile[] };
    return data.objects ?? [];
  }

  /**
   * Get a single file's detail including signed download URL.
   * The list endpoint returns placeholder URLs — this individual endpoint
   * returns the real signed URL.
   */
  async getFileDetail(assetId: string, fileId: string): Promise<IconikFileDetail> {
    const resp = await fetch(`${this.baseUrl}/files/v1/assets/${assetId}/files/${fileId}/`, {
      headers: this.headers,
    });

    if (!resp.ok) {
      throw new Error(`Iconik getFileDetail failed (${resp.status}): ${await resp.text()}`);
    }

    return await resp.json() as IconikFileDetail;
  }

  /** Get proxies for an Iconik asset (includes signed URLs). */
  async getProxies(assetId: string): Promise<IconikProxy[]> {
    const resp = await fetch(`${this.baseUrl}/files/v1/assets/${assetId}/proxies/`, {
      headers: this.headers,
    });

    if (!resp.ok) {
      throw new Error(`Iconik getProxies failed (${resp.status}): ${await resp.text()}`);
    }

    const data = await resp.json() as { objects?: IconikProxy[] };
    return data.objects ?? [];
  }

  /**
   * Get transcription status for an asset by scanning ALL versions.
   * Iconik assets often have multiple versions, and transcription may be on any version (not just [0]).
   * Returns DONE/COMPLETED if ANY version has that status, with that version's ID.
   * Falls back to first version's status if none are DONE/COMPLETED.
   */
  async getTranscribeStatus(assetId: string): Promise<TranscriptionStatus> {
    const resp = await fetch(`${this.baseUrl}/assets/v1/assets/${assetId}/`, {
      headers: this.headers,
    });

    if (!resp.ok) {
      throw new Error(`Iconik getTranscribeStatus failed (${resp.status}): ${await resp.text()}`);
    }

    const data = await resp.json() as { versions?: Array<{ id: string; transcribe_status?: string }> };
    const versions = data.versions ?? [];
    if (versions.length === 0) {
      return { status: "N/A" };
    }

    const valid = ["N/A", "PENDING", "IN_PROGRESS", "DONE", "COMPLETED", "FAILED"] as const;

    // Scan ALL versions — transcription is often on a non-first version
    for (const ver of versions) {
      const raw = ver.transcribe_status ?? "N/A";
      if (raw === "DONE" || raw === "COMPLETED") {
        return { status: raw as TranscriptionStatus["status"], version_id: ver.id };
      }
    }

    // No DONE/COMPLETED found — return first version's status as fallback
    const raw = versions[0].transcribe_status ?? "N/A";
    const status = valid.includes(raw as typeof valid[number])
      ? (raw as TranscriptionStatus["status"])
      : "N/A";

    return { status, version_id: versions[0].id };
  }

  /**
   * Trigger transcription for an asset.
   * POST /API/transcode/v1/transcribe/assets/{assetId}/profiles/default/
   */
  async triggerTranscription(assetId: string): Promise<void> {
    const resp = await fetch(
      `${this.baseUrl}/transcode/v1/transcribe/assets/${assetId}/profiles/default/`,
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({}),
      },
    );

    if (!resp.ok) {
      throw new Error(`Iconik triggerTranscription failed (${resp.status}): ${await resp.text()}`);
    }
  }

  /**
   * Get transcription content for an asset via search segments API.
   * Iconik stores transcriptions as segments (type=TRANSCRIPTION) accessible via search.
   * Returns text content + parsed TranscriptSegment[].
   * Deduplicates segments by time range (Iconik may store duplicates from multiple trigger calls).
   */
  async getTranscription(assetId: string): Promise<{ content: string; segments: TranscriptSegment[] }> {
    const allSegments: TranscriptSegment[] = [];
    let page = 1;
    const perPage = 50;

    // Paginate through all transcription segments
    while (true) {
      const resp = await fetch(`${this.baseUrl}/search/v1/search/?page=${page}&per_page=${perPage}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          doc_types: ["segments"],
          filter: {
            operator: "AND",
            terms: [
              { name: "asset_id", value: assetId },
              { name: "segment_type", value: "TRANSCRIPTION" },
            ],
          },
          sort: [{ name: "time_start_milliseconds", order: "asc" }],
          per_page: perPage,
        }),
      });

      if (!resp.ok) {
        throw new Error(`Iconik getTranscription search failed (${resp.status}): ${await resp.text()}`);
      }

      const data = await resp.json() as {
        objects?: Array<{
          time_start_milliseconds: number;
          time_end_milliseconds: number;
          metadata_cache: string;
        }>;
        next_url?: string | null;
      };

      const objects = data.objects ?? [];
      if (objects.length === 0) break;

      for (const seg of objects) {
        allSegments.push({
          start_time: seg.time_start_milliseconds / 1000,
          end_time: seg.time_end_milliseconds / 1000,
          text: seg.metadata_cache ?? "",
        });
      }

      if (!data.next_url) break;
      page++;
    }

    // Deduplicate by time range (Iconik creates duplicates when transcription is triggered multiple times)
    const seen = new Set<string>();
    const unique: TranscriptSegment[] = [];
    for (const seg of allSegments) {
      const key = `${seg.start_time}-${seg.end_time}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(seg);
      }
    }

    // Sort by start_time
    unique.sort((a, b) => a.start_time - b.start_time);

    const content = unique.map((s) => s.text).join(" ");
    return { content, segments: unique };
  }

  // ── Upload Methods ────────────────────────────────────────────────────────

  private _cachedStorageId: string | null = null;
  private _cachedStorageMethod: string | null = null;

  /**
   * Get the GCS FILES storage. Uses specific storage ID to avoid Wasabi default.
   * GET /files/v1/storages/{storageId}/
   */
  async getFilesStorage(): Promise<{ id: string; method: string }> {
    if (this._cachedStorageId && this._cachedStorageMethod) {
      return { id: this._cachedStorageId, method: this._cachedStorageMethod };
    }

    // Target GCS storage specifically (iconik-files-gcs)
    const gcsStorageId = process.env.ICONIK_STORAGE_ID || "";
    if (!gcsStorageId) {
      throw new Error("ICONIK_STORAGE_ID not set. Add it to .env.");
    }
    const resp = await fetch(`${this.baseUrl}/files/v1/storages/${gcsStorageId}/`, {
      headers: this.headers,
    });

    if (!resp.ok) {
      throw new Error(`Iconik getFilesStorage failed (${resp.status}): ${await resp.text()}`);
    }

    const data = await resp.json() as { id: string; method: string };
    this._cachedStorageId = data.id;
    this._cachedStorageMethod = data.method;
    return { id: data.id, method: data.method };
  }

  /**
   * Create a new asset in Iconik. CREATE only — no delete, no overwrite.
   * POST /assets/v1/assets/
   */
  async createAsset(title: string): Promise<{ assetId: string; userId: string }> {
    const resp = await fetch(`${this.baseUrl}/assets/v1/assets/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ title, type: "ASSET" }),
    });

    if (!resp.ok) {
      throw new Error(`Iconik createAsset failed (${resp.status}): ${await resp.text()}`);
    }

    const data = await resp.json() as { id: string; user_id: string };
    return { assetId: data.id, userId: data.user_id };
  }

  /**
   * Create a format entry for an asset.
   * POST /files/v1/assets/{assetId}/formats/
   */
  async createFormat(
    assetId: string,
    userId: string,
    mediaType: string,
    storageMethod: string,
  ): Promise<string> {
    const resp = await fetch(`${this.baseUrl}/files/v1/assets/${assetId}/formats/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: "ORIGINAL",
        user_id: userId,
        media_type: mediaType,
        storage_methods: [storageMethod],
      }),
    });

    if (!resp.ok) {
      throw new Error(`Iconik createFormat failed (${resp.status}): ${await resp.text()}`);
    }

    const data = await resp.json() as { id: string };
    return data.id;
  }

  /**
   * Create a file set for an asset format.
   * POST /files/v1/assets/{assetId}/file_sets/
   */
  async createFileSet(
    assetId: string,
    formatId: string,
    storageId: string,
    fileName: string,
  ): Promise<string> {
    const resp = await fetch(`${this.baseUrl}/files/v1/assets/${assetId}/file_sets/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        format_id: formatId,
        storage_id: storageId,
        name: fileName,
        base_dir: "",
        component_ids: [],
      }),
    });

    if (!resp.ok) {
      throw new Error(`Iconik createFileSet failed (${resp.status}): ${await resp.text()}`);
    }

    const data = await resp.json() as { id: string };
    return data.id;
  }

  /**
   * Create a file entry and get the GCS upload URL.
   * POST /files/v1/assets/{assetId}/files/
   */
  async createFileEntry(
    assetId: string,
    params: FileEntryParams,
  ): Promise<{ fileId: string; uploadUrl: string }> {
    const resp = await fetch(`${this.baseUrl}/files/v1/assets/${assetId}/files/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        original_name: params.fileName,
        file_name: params.fileName,
        size: params.fileSize,
        type: "FILE",
        directory_path: "",
        metadata: {},
        format_id: params.formatId,
        file_set_id: params.fileSetId,
        storage_id: params.storageId,
        file_date_created: new Date().toISOString(),
        file_date_modified: new Date().toISOString(),
      }),
    });

    if (!resp.ok) {
      throw new Error(`Iconik createFileEntry failed (${resp.status}): ${await resp.text()}`);
    }

    const data = await resp.json() as { id: string; upload_url: string };
    return { fileId: data.id, uploadUrl: data.upload_url };
  }

  /**
   * Upload a file to GCS via Iconik's resumable upload protocol:
   * 1. POST signed URL with x-goog-resumable: start → get upload ID
   * 2. PUT file data to signed URL + &upload_id=<id>
   * 3. POST to Iconik compose endpoint to finalize the GCS object
   */
  async uploadToGcs(
    uploadUrl: string,
    filePath: string,
    fileSize: number,
    assetId: string,
    fileId: string,
  ): Promise<void> {
    // Step 1: Initiate resumable upload
    const initResp = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "content-length": "0",
        "x-goog-resumable": "start",
      },
    });

    if (initResp.status !== 200 && initResp.status !== 201) {
      throw new Error(`GCS resumable init failed (${initResp.status}): ${await initResp.text()}`);
    }

    const uploadId = initResp.headers.get("x-guploader-uploadid");
    if (!uploadId) {
      throw new Error("GCS resumable init: missing X-GUploader-UploadID header");
    }

    // Step 2: PUT file data
    const fileBuffer = await readFile(filePath);
    const putUrl = uploadUrl + "&upload_id=" + uploadId;
    const putResp = await fetch(putUrl, {
      method: "PUT",
      headers: {
        "content-length": String(fileSize),
        "content-type": "application/octet-stream",
      },
      body: fileBuffer,
    });

    if (!putResp.ok) {
      throw new Error(`GCS upload PUT failed (${putResp.status}): ${await putResp.text()}`);
    }

    // Step 3: Call Iconik compose endpoint to finalize GCS object
    const composeUrl = `${this.baseUrl}/files/v1/assets/${assetId}/files/${fileId}/multipart/gcs/compose_url/`;
    const composeResp = await fetch(composeUrl, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ parts_group: null, content_type: "application/octet-stream" }),
    });

    if (!composeResp.ok) {
      throw new Error(`Iconik GCS compose failed (${composeResp.status}): ${await composeResp.text()}`);
    }
  }

  /**
   * Finalize upload: close the file record and trigger keyframe generation.
   * ONLY touches the file ID created in the same pipeline run (safety constraint).
   * PATCH /files/v1/assets/{assetId}/files/{fileId}/ + POST keyframes
   */
  async finalizeUpload(assetId: string, fileId: string): Promise<void> {
    // Close the file record
    const patchResp = await fetch(`${this.baseUrl}/files/v1/assets/${assetId}/files/${fileId}/`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ status: "CLOSED", progress_processed: 100 }),
    });

    if (!patchResp.ok) {
      throw new Error(`Iconik finalizeUpload PATCH failed (${patchResp.status}): ${await patchResp.text()}`);
    }

    // Trigger keyframe generation
    const keyframeResp = await fetch(
      `${this.baseUrl}/files/v1/assets/${assetId}/files/${fileId}/keyframes/`,
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({}),
      },
    );

    if (!keyframeResp.ok) {
      throw new Error(`Iconik finalizeUpload keyframes failed (${keyframeResp.status}): ${await keyframeResp.text()}`);
    }
  }

  // ── Collection Methods ──────────────────────────────────────────────────

  /**
   * Create a sub-collection inside a parent collection.
   * POST /assets/v1/collections/
   */
  async createCollection(title: string, parentId: string): Promise<string> {
    const resp = await fetch(`${this.baseUrl}/assets/v1/collections/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ title, parent_id: parentId }),
    });

    if (!resp.ok) {
      throw new Error(`Iconik createCollection failed (${resp.status}): ${await resp.text()}`);
    }

    const data = await resp.json() as { id: string };
    return data.id;
  }

  /**
   * Find an existing sub-collection by title (case-insensitive) or create one.
   * Searches all sub-collections of parentId via paginated getSubCollections,
   * returns the first match, or creates a new sub-collection if none found.
   */
  async findOrCreateSubCollection(title: string, parentId: string): Promise<string> {
    const subs = await this.getSubCollections(parentId);
    const existing = subs.find((c) => c.title.toLowerCase() === title.toLowerCase());
    if (existing) {
      return existing.id;
    }

    console.log(`[Iconik] Creating sub-collection "${title}" under parent ${parentId}`);
    return this.createCollection(title, parentId);
  }

  /**
   * Add an asset to a collection. Additive only — does not remove from other collections.
   * PUT /assets/v1/collections/{collectionId}/assets/{assetId}/
   */
  async addAssetToCollection(collectionId: string, assetId: string): Promise<void> {
    const resp = await fetch(
      `${this.baseUrl}/assets/v1/collections/${collectionId}/contents/`,
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ object_id: assetId, object_type: "assets" }),
      },
    );

    if (!resp.ok) {
      throw new Error(`Iconik addAssetToCollection failed (${resp.status}): ${await resp.text()}`);
    }
  }

  /**
   * List sub-collections inside a parent collection.
   * Paginates to retrieve ALL sub-collections (per_page=100, follows next_url).
   * GET /assets/v1/collections/{parentId}/contents/?content_types=collections&per_page=100
   */
  async getSubCollections(parentId: string): Promise<IconikCollection[]> {
    const all: IconikCollection[] = [];
    let url: string | null =
      `${this.baseUrl}/assets/v1/collections/${parentId}/contents/?content_types=collections&per_page=100`;

    while (url) {
      const resp = await fetch(url, { headers: this.headers });

      if (!resp.ok) {
        throw new Error(`Iconik getSubCollections failed (${resp.status}): ${await resp.text()}`);
      }

      const data = await resp.json() as {
        objects?: Array<{ id: string; title: string }>;
        next_url?: string | null;
      };
      for (const o of data.objects ?? []) {
        all.push({ id: o.id, title: o.title });
      }
      url = data.next_url ? `${this.baseUrl}${data.next_url}` : null;
    }

    return all;
  }

  /**
   * List assets inside a collection. Paginates to retrieve all.
   * GET /assets/v1/collections/{collectionId}/contents/?content_types=assets&per_page=100
   */
  async getCollectionAssets(collectionId: string): Promise<Array<{ id: string; title: string }>> {
    const all: Array<{ id: string; title: string }> = [];
    let url: string | null =
      `${this.baseUrl}/assets/v1/collections/${collectionId}/contents/?content_types=assets&per_page=100`;

    while (url) {
      const resp = await fetch(url, { headers: this.headers });

      if (!resp.ok) {
        throw new Error(`Iconik getCollectionAssets failed (${resp.status}): ${await resp.text()}`);
      }

      const data = await resp.json() as {
        objects?: Array<{ id: string; title: string }>;
        next_url?: string | null;
      };
      for (const o of data.objects ?? []) {
        all.push({ id: o.id, title: o.title });
      }
      url = data.next_url ? `${this.baseUrl}${data.next_url}` : null;
    }

    return all;
  }

  // ── Metadata Methods ─────────────────────────────────────────────────────

  /**
   * Set metadata values on an asset for a specific metadata view.
   * PUT /metadata/v1/assets/{assetId}/views/{viewId}/
   *
   * Iconik requires values in `{ field_values: [{ value }] }` format.
   * This method accepts flat key-value pairs and wraps them automatically.
   */
  async setMetadata(
    assetId: string,
    viewId: string,
    values: Record<string, string>,
  ): Promise<void> {
    // Wrap flat values into Iconik's required { field_values: [{ value }] } structure
    const wrapped: Record<string, { field_values: Array<{ value: string }> }> = {};
    for (const [key, val] of Object.entries(values)) {
      wrapped[key] = { field_values: [{ value: val }] };
    }

    const resp = await fetch(
      `${this.baseUrl}/metadata/v1/assets/${assetId}/views/${viewId}/`,
      {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify({ metadata_values: wrapped }),
      },
    );

    if (!resp.ok) {
      throw new Error(`Iconik setMetadata failed (${resp.status}): ${await resp.text()}`);
    }
  }

  /**
   * Read metadata values from an asset for a specific metadata view.
   * GET /metadata/v1/assets/{assetId}/views/{viewId}/
   *
   * Iconik returns values in `{ field_values: [{ value }] }` format.
   * This method unwraps them into flat key-value pairs.
   */
  async getMetadata(
    assetId: string,
    viewId: string,
  ): Promise<Record<string, string>> {
    const resp = await fetch(
      `${this.baseUrl}/metadata/v1/assets/${assetId}/views/${viewId}/`,
      { headers: this.headers },
    );

    if (!resp.ok) {
      throw new Error(`Iconik getMetadata failed (${resp.status}): ${await resp.text()}`);
    }

    const data = await resp.json() as {
      metadata_values?: Record<string, { field_values?: Array<{ value: string }> }>;
    };

    // Unwrap Iconik's { field_values: [{ value }] } structure into flat values
    const flat: Record<string, string> = {};
    for (const [key, fieldObj] of Object.entries(data.metadata_values ?? {})) {
      const val = fieldObj?.field_values?.[0]?.value;
      if (val != null) {
        flat[key] = val;
      }
    }
    return flat;
  }

  /**
   * Set the title of an asset.
   * PATCH /assets/v1/assets/{assetId}/
   */
  async setAssetTitle(assetId: string, title: string): Promise<void> {
    const resp = await fetch(
      `${this.baseUrl}/assets/v1/assets/${assetId}/`,
      {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({ title }),
      },
    );

    if (!resp.ok) {
      throw new Error(`Iconik setAssetTitle failed (${resp.status}): ${await resp.text()}`);
    }
  }

  // ── Download Methods ──────────────────────────────────────────────────────

  /**
   * Download a file from a signed URL to a local path.
   * Creates parent directories as needed.
   * Returns the number of bytes written.
   */
  async downloadFile(url: string, destPath: string): Promise<{ bytes: number }> {
    await mkdir(dirname(destPath), { recursive: true });

    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(`Download failed (${resp.status}): ${url.substring(0, 120)}...`);
    }

    if (!resp.body) {
      throw new Error("Download response has no body");
    }

    const writer = createWriteStream(destPath);
    // Convert web ReadableStream to Node stream
    const nodeStream = Readable.fromWeb(resp.body as any);
    await pipeline(nodeStream, writer);

    const fileStat = await stat(destPath);
    return { bytes: fileStat.size };
  }
}

// ── Factory: create fetchSource for orchestrator ────────────────────────────

/**
 * Preferred download mode:
 * - "proxy": Download low-res proxy (~41 MB). Fast, good for testing.
 * - "original": Download original file (~192 MB). Needed for production edits.
 */
export type DownloadMode = "proxy" | "original";

/**
 * Create the `fetchSource` function for OrchestratorDeps.
 *
 * The function searches Iconik for the source_asset_id, finds the
 * matching asset, and downloads the file (proxy or original) to downloadDir.
 */
export function createFetchSource(
  client: IconikClient,
  downloadDir: string,
  mode: DownloadMode = "proxy",
): (sourceAssetId: string) => Promise<SubAgentResult<{ file_path: string }>> {
  return async (sourceAssetId: string) => {
    try {
      // Step 1: Search Iconik for the asset by name
      // Strategy: full ID match first, then version+aspect ratio, then prefix with aspect ratio filter
      const assets = await client.searchByName(sourceAssetId, 20);

      // Extract aspect ratio from source asset ID (e.g., "dqfe-0012-v0001-fb-9x16-..." → "9x16")
      const idParts = sourceAssetId.split("-");
      const aspectRatio = idParts.length >= 5 ? idParts[4] : null; // Position 5: dimensions

      // Tier 1: exact full ID match
      let match = assets.find((a) => a.title.includes(sourceAssetId));

      // Tier 2: match by version + aspect ratio (e.g., "dqfe-0012-v0001-...-9x16")
      if (!match && idParts.length >= 3 && aspectRatio) {
        const versionPrefix = `${idParts[0]}-${idParts[1]}-${idParts[2]}`; // e.g. "dqfe-0012-v0001"
        match = assets.find((a) =>
          a.title.includes(versionPrefix) && a.title.includes(aspectRatio),
        );
      }

      // Tier 3: match by script ID + aspect ratio
      if (!match && aspectRatio) {
        const scriptPrefix = idParts.length >= 2 ? `${idParts[0]}-${idParts[1]}` : sourceAssetId;
        match = assets.find((a) =>
          a.title.includes(scriptPrefix) && a.title.includes(aspectRatio),
        );
      }

      // Tier 4 (last resort): match by script ID prefix only — warn about no aspect ratio filtering
      if (!match) {
        const scriptPrefix = idParts.length >= 2 ? `${idParts[0]}-${idParts[1]}` : sourceAssetId;
        match = assets.find((a) => a.title.includes(scriptPrefix));
      }

      if (!match) {
        return {
          status: "FAILED",
          error_category: "ICONIK_ERROR",
          severity: "error",
          message: `No Iconik asset found matching "${sourceAssetId}" (${assets.length} results checked)`,
          recovery_action: "halt",
          context: { step: "4" },
        };
      }

      // Step 2: Get download URL based on mode
      let downloadUrl: string;
      let fileName: string;

      if (mode === "proxy") {
        const proxies = await client.getProxies(match.id);
        if (proxies.length === 0) {
          return {
            status: "FAILED",
            error_category: "ICONIK_ERROR",
            severity: "error",
            message: `Asset "${match.title}" has no proxies available`,
            recovery_action: "halt",
            context: { step: "4", asset_ids: [sourceAssetId] },
          };
        }
        downloadUrl = proxies[0].url;
        fileName = proxies[0].name || proxies[0].filename;
      } else {
        // Original: get file list, then get detail for signed URL
        const files = await client.getFiles(match.id);
        // Filter to CLOSED (ready) files that are actual files (not edit proxies)
        const originals = files.filter(
          (f) => f.status === "CLOSED" && !f.name.includes("editproxy"),
        );
        if (originals.length === 0) {
          return {
            status: "FAILED",
            error_category: "ICONIK_ERROR",
            severity: "error",
            message: `Asset "${match.title}" has no original files available`,
            recovery_action: "halt",
            context: { step: "4", asset_ids: [sourceAssetId] },
          };
        }
        const detail = await client.getFileDetail(match.id, originals[0].id);
        downloadUrl = detail.url;
        fileName = detail.name;
      }

      // Step 3: Download to local disk
      const destPath = `${downloadDir}/${fileName}`;
      const { bytes } = await client.downloadFile(downloadUrl, destPath);

      if (bytes === 0) {
        return {
          status: "FAILED",
          error_category: "ICONIK_ERROR",
          severity: "error",
          message: `Downloaded file is empty: ${destPath}`,
          recovery_action: "retry",
          context: { step: "4", asset_ids: [sourceAssetId] },
        };
      }

      return {
        status: "SUCCESS",
        data: { file_path: destPath },
      };
    } catch (err) {
      return {
        status: "FAILED",
        error_category: "ICONIK_ERROR",
        severity: "error",
        message: `Iconik fetch failed: ${err instanceof Error ? err.message : String(err)}`,
        recovery_action: "retry",
        context: { step: "4" },
      };
    }
  };
}

/**
 * Create an IconikClient from environment variables.
 * Reads ICONIK_APP_ID and ICONIK_AUTH_TOKEN from process.env.
 * Returns null if credentials are not configured.
 */
export function createIconikClientFromEnv(): IconikClient | null {
  const appId = process.env.ICONIK_APP_ID;
  const authToken = process.env.ICONIK_AUTH_TOKEN;

  if (!appId || !authToken) {
    return null;
  }

  return new IconikClient({ appId, authToken });
}

// ── Upload Factory ──────────────────────────────────────────────────────────

/**
 * Create the `uploadAssets` function for OrchestratorDeps.
 *
 * Uploads finished .mp4 files to Iconik, placed in:
 *   Ad Editing Team → Veda → {offer}/
 *
 * Safety: NO delete, NO overwrite, ONLY PATCH own files, Veda collection only.
 */
export function createUploadAssets(
  client: IconikClient,
  parentCollectionId: string,
): (files: string[]) => Promise<SubAgentResult<{ urls: string[] }>> {
  // Collection cache — created once, reused for session
  let vedaCollectionId: string | null = null;
  const offerCollectionCache = new Map<string, string>();

  async function ensureVedaCollection(): Promise<string> {
    if (vedaCollectionId) return vedaCollectionId;
    vedaCollectionId = await client.findOrCreateSubCollection("Veda", parentCollectionId);
    return vedaCollectionId;
  }

  async function ensureOfferCollection(offerCode: string): Promise<string> {
    const cached = offerCollectionCache.get(offerCode);
    if (cached) return cached;
    const vedaId = await ensureVedaCollection();
    const id = await client.findOrCreateSubCollection(offerCode, vedaId);
    offerCollectionCache.set(offerCode, id);
    return id;
  }

  return async (files: string[]): Promise<SubAgentResult<{ urls: string[] }>> => {
    if (files.length === 0) {
      return {
        status: "FAILED",
        error_category: "VALIDATION_ERROR",
        severity: "error",
        message: "No files to upload",
        recovery_action: "halt",
        context: { step: "7" },
      };
    }

    const urls: string[] = [];
    const errors: string[] = [];
    // Collection asset cache for dedup (populated per-offer lazily)
    const collectionAssetsCache = new Map<string, Set<string>>();

    for (const filePath of files) {
      try {
        // Validate file exists and is not empty
        const fileStat = await stat(filePath);
        if (fileStat.size === 0) {
          errors.push(`${basename(filePath)}: empty file (0 bytes)`);
          continue;
        }

        const fileName = basename(filePath);
        // Extract offer code from asset ID filename (e.g., "dqfe-0036-v0003-..." → "dqfe")
        const offerCode = fileName.split("-")[0] ?? "unknown";
        const assetTitle = fileName.replace(/\.mp4$/, "");

        // Dedup check: skip if asset with same title already exists in target collection
        const collectionId = await ensureOfferCollection(offerCode);
        if (!collectionAssetsCache.has(collectionId)) {
          const existing = await client.getCollectionAssets(collectionId);
          collectionAssetsCache.set(collectionId, new Set(existing.map((a) => a.title)));
        }
        const existingTitles = collectionAssetsCache.get(collectionId)!;
        if (existingTitles.has(assetTitle)) {
          console.log(`[Upload] Skipping duplicate: "${assetTitle}" already exists in collection`);
          // Find the existing asset's Iconik URL
          const existingAssets = await client.getCollectionAssets(collectionId);
          const match = existingAssets.find((a) => a.title === assetTitle);
          if (match) {
            urls.push(`https://app.iconik.io/asset/${match.id}`);
          }
          continue;
        }

        // 1. Get storage info
        const storage = await client.getFilesStorage();

        // 2. Create asset
        const { assetId, userId } = await client.createAsset(fileName.replace(/\.mp4$/, ""));

        // 3. Create format
        const formatId = await client.createFormat(assetId, userId, "video/mp4", storage.method);

        // 4. Create file set
        const fileSetId = await client.createFileSet(assetId, formatId, storage.id, fileName);

        // 5. Create file entry → get upload URL
        const { fileId, uploadUrl } = await client.createFileEntry(assetId, {
          fileName,
          fileSize: fileStat.size,
          formatId,
          fileSetId,
          storageId: storage.id,
        });

        // 6. Upload binary to GCS (resumable protocol)
        await client.uploadToGcs(uploadUrl, filePath, fileStat.size, assetId, fileId);

        // 7. Finalize (PATCH file to CLOSED + trigger keyframes)
        await client.finalizeUpload(assetId, fileId);

        // 7.5. Post-upload verification — confirm asset has files
        const files = await client.getAssetFiles(assetId);
        if (files.length === 0) {
          throw new Error(`Post-upload verification failed: asset ${assetId} has 0 files after upload`);
        }
        const uploadedFile = files.find((f) => f.id === fileId);
        if (uploadedFile && uploadedFile.status !== "CLOSED") {
          throw new Error(`Post-upload verification failed: file ${fileId} status is "${uploadedFile.status}", expected "CLOSED"`);
        }

        // 8. Place in collection hierarchy (collectionId already resolved from dedup check)
        await client.addAssetToCollection(collectionId, assetId);
        // Update dedup cache with the new asset
        existingTitles.add(assetTitle);

        urls.push(`https://app.iconik.io/asset/${assetId}`);
      } catch (err) {
        errors.push(`${basename(filePath)}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    // Partial or full success
    if (urls.length > 0) {
      return { status: "SUCCESS", data: { urls } };
    }

    return {
      status: "FAILED",
      error_category: "ICONIK_ERROR",
      severity: "error",
      message: `All uploads failed: ${errors.join("; ")}`,
      recovery_action: "retry",
      context: { step: "7" },
    };
  };
}

// ── SRT Parser ──────────────────────────────────────────────────────────────

/**
 * Parse SRT subtitle content into TranscriptSegment[].
 *
 * SRT format:
 * ```
 * 1
 * 00:00:01,500 --> 00:00:04,000
 * First line of text
 *
 * 2
 * 00:00:04,500 --> 00:00:07,200
 * Second line of text
 * that spans multiple lines
 * ```
 */
export function parseSrt(srtContent: string): TranscriptSegment[] {
  if (!srtContent.trim()) return [];

  const segments: TranscriptSegment[] = [];
  // Split by blank lines (handles \r\n and \n)
  const blocks = srtContent.trim().replace(/\r\n/g, "\n").split(/\n\n+/);

  for (const block of blocks) {
    const lines = block.trim().split("\n");
    if (lines.length < 3) continue;

    // Line 0: index (ignored)
    // Line 1: timestamps  "HH:MM:SS,mmm --> HH:MM:SS,mmm"
    const tsLine = lines[1];
    const tsMatch = tsLine.match(
      /(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})\s*-->\s*(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})/,
    );
    if (!tsMatch) continue;

    const start_time =
      parseInt(tsMatch[1]) * 3600 +
      parseInt(tsMatch[2]) * 60 +
      parseInt(tsMatch[3]) +
      parseInt(tsMatch[4].padEnd(3, "0")) / 1000;

    const end_time =
      parseInt(tsMatch[5]) * 3600 +
      parseInt(tsMatch[6]) * 60 +
      parseInt(tsMatch[7]) +
      parseInt(tsMatch[8].padEnd(3, "0")) / 1000;

    // Lines 2+: text content (may span multiple lines)
    const text = lines.slice(2).join(" ").trim();

    segments.push({ start_time, end_time, text });
  }

  return segments;
}
