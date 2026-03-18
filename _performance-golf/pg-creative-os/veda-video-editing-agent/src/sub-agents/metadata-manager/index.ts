/**
 * metadata_manager sub-agent — Pipeline Step 7: APPLY METADATA
 *
 * Maps 15-position Asset ID fields to Iconik metadata fields, applies them
 * via the Iconik API, and verifies via read-back. Also sets asset title to
 * the full Asset ID string.
 *
 * Uses: ffmpeg_executor (none — metadata only)
 * Depends on: naming_generator (asset IDs), asset_uploader (Iconik UUIDs)
 */

import type {
  AssetIdPositions,
  GeneratedAssetId,
  MetadataManagerInput,
  MetadataManagerOutput,
  MetadataApplied,
} from "../../types/pipeline.js";
import type { SubAgentResult } from "../../types/sub-agent.js";
import type { IconikClient } from "../../utils/iconik-client.js";

// ── Field Mapping ────────────────────────────────────────────────────────────

/**
 * Default mapping from AssetIdPositions keys to Iconik metadata field names.
 * These follow a `veda_` prefix convention. The actual field names in your
 * Iconik metadata view must match these (or override via ICONIK_FIELD_MAP env).
 */
const DEFAULT_FIELD_MAP: Record<keyof AssetIdPositions, string> = {
  funnel: "veda_funnel",
  script_id: "veda_script_id",
  variation_id: "veda_variation_id",
  platform: "veda_platform",
  dimensions: "veda_dimensions",
  length_tier: "veda_length_tier",
  ad_category: "veda_ad_category",
  expansion_type: "veda_expansion_type",
  asset_type: "veda_asset_type",
  talent_code: "veda_talent_code",
  editor_initials: "veda_editor_initials",
  copywriter_initials: "veda_copywriter_initials",
  country_code: "veda_country_code",
  creation_date: "veda_creation_date",
  promo_name: "veda_promo_name",
};

/**
 * Build Iconik metadata values from parsed Asset ID positions.
 * Only includes fields that have non-empty values.
 */
export function buildMetadataValues(
  positions: AssetIdPositions,
  fieldMap: Record<string, string> = DEFAULT_FIELD_MAP,
): Record<string, string> {
  const values: Record<string, string> = {};

  for (const [posKey, iconikField] of Object.entries(fieldMap)) {
    const val = positions[posKey as keyof AssetIdPositions];
    if (val != null && val !== "") {
      values[iconikField] = val;
    }
  }

  return values;
}

// ── Sub-Agent Entry Point ────────────────────────────────────────────────────

const MAX_RETRIES = 3;

/**
 * Apply metadata to Iconik assets for each generated Asset ID.
 *
 * For each asset: set title → apply metadata → verify via read-back.
 * Retries API calls up to 3 times before failing.
 */
export async function applyMetadata(
  input: MetadataManagerInput,
  client: IconikClient,
): Promise<SubAgentResult<MetadataManagerOutput>> {
  // Validate input lengths match
  if (input.asset_ids.length !== input.iconik_asset_uuids.length) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "critical",
      message: `asset_ids count (${input.asset_ids.length}) !== iconik_asset_uuids count (${input.iconik_asset_uuids.length})`,
      recovery_action: "halt",
      context: { step: "7" },
    };
  }

  if (input.asset_ids.length === 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "critical",
      message: "No asset IDs provided",
      recovery_action: "halt",
      context: { step: "7" },
    };
  }

  if (!input.metadata_view_id) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "critical",
      message: "metadata_view_id is required",
      recovery_action: "halt",
      context: { step: "7" },
    };
  }

  const results: MetadataApplied[] = [];

  for (let i = 0; i < input.asset_ids.length; i++) {
    const assetId = input.asset_ids[i]!;
    const iconikUuid = input.iconik_asset_uuids[i]!;

    const metadataValues = buildMetadataValues(assetId.positions);
    const fieldCount = Object.keys(metadataValues).length;

    // Step 1: Set asset title to full Asset ID
    const titleErr = await retryOperation(
      () => client.setAssetTitle(iconikUuid, assetId.full_id),
      MAX_RETRIES,
    );
    if (titleErr) {
      return {
        status: "FAILED",
        error_category: "ICONIK_ERROR",
        severity: "critical",
        message: `Failed to set title for ${assetId.full_id}: ${titleErr}`,
        recovery_action: "halt",
        context: { step: "7", asset_ids: [assetId.full_id] },
      };
    }

    // Step 2: Apply metadata values
    const setErr = await retryOperation(
      () => client.setMetadata(iconikUuid, input.metadata_view_id, metadataValues),
      MAX_RETRIES,
    );
    if (setErr) {
      return {
        status: "FAILED",
        error_category: "ICONIK_ERROR",
        severity: "critical",
        message: `Failed to set metadata for ${assetId.full_id}: ${setErr}`,
        recovery_action: "halt",
        context: { step: "7", asset_ids: [assetId.full_id] },
      };
    }

    // Step 3: Read-back verification
    let verified = false;
    const readbackResult = await retryOperation(
      () => client.getMetadata(iconikUuid, input.metadata_view_id),
      MAX_RETRIES,
    );

    if (typeof readbackResult === "string") {
      // Retry failed — log warning but don't halt (metadata was set, just can't verify)
      console.warn(`[metadata_manager] Read-back verification failed for ${assetId.full_id}: ${readbackResult}`);
    } else {
      // Verify that all written values match read-back values
      verified = verifyReadback(metadataValues, readbackResult);
      if (!verified) {
        return {
          status: "FAILED",
          error_category: "ICONIK_ERROR",
          severity: "critical",
          message: `Metadata read-back mismatch for ${assetId.full_id}`,
          recovery_action: "halt",
          context: { step: "7", asset_ids: [assetId.full_id] },
        };
      }
    }

    results.push({
      iconik_uuid: iconikUuid,
      asset_id: assetId.full_id,
      fields_applied: fieldCount,
      verified,
    });
  }

  return {
    status: "SUCCESS",
    data: { metadata_applied: results },
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Retry an async operation up to maxRetries times.
 * Returns null on success, or error message string on failure.
 * For operations that return a value, returns the value on success.
 */
async function retryOperation(
  fn: () => Promise<void>,
  maxRetries: number,
): Promise<string | null>;
async function retryOperation<T>(
  fn: () => Promise<T>,
  maxRetries: number,
): Promise<T | string>;
async function retryOperation<T>(
  fn: () => Promise<T>,
  maxRetries: number,
): Promise<T | string | null> {
  let lastError = "";
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await fn();
      return result === undefined ? null : result;
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      if (attempt < maxRetries) {
        // Brief delay before retry (100ms * attempt)
        await new Promise((r) => setTimeout(r, 100 * attempt));
      }
    }
  }
  return lastError;
}

/**
 * Verify that all written metadata values match the read-back values.
 */
function verifyReadback(
  written: Record<string, string>,
  readback: Record<string, string>,
): boolean {
  for (const [field, value] of Object.entries(written)) {
    if (readback[field] !== value) {
      console.warn(`[metadata_manager] Mismatch: field "${field}" — wrote "${value}", read "${readback[field]}"`);
      return false;
    }
  }
  return true;
}
