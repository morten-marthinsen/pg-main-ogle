/**
 * tess_connector sub-agent — Pipeline Step 1: RECEIVE DIRECTION
 *
 * The bridge between strategy and execution. Takes raw intake from Tess
 * recommendations or manual human input, parses the source asset ID,
 * auto-inherits fields, validates everything, and produces a ResolvedIntake
 * ready for downstream sub-agents.
 *
 * Auto-inheritance: platform, dimensions, length_tier, country_code,
 * talent_code, and asset_type are inherited from the source asset unless
 * explicitly overridden in the raw intake.
 *
 * Ad category derivation:
 *   - expansion_type == "xx" → ad_category = "nn" (net new)
 *   - expansion_type != "xx" → ad_category = "exv" (vertical expansion, default)
 *   - Can be overridden to "exh", "nnmu" via raw intake
 */

import type { RawIntake, ResolvedIntake } from "../../types/pipeline.js";
import type { SubAgentResult } from "../../types/sub-agent.js";
import { parseAssetId } from "../../utils/parse-asset-id.js";
import {
  VALID_PLATFORMS,
  VALID_LENGTH_TIERS,
  VALID_AD_CATEGORIES,
  VALID_EXPANSION_TYPES,
  VALID_ASSET_TYPES,
  VALID_COUNTRY_CODES,
  DIMENSIONS_PATTERN,
} from "../../tables/naming-codes.js";

/**
 * Derive ad_category from expansion_type when not explicitly provided.
 *
 * - "xx" → "nn" (net new assets have no expansion type)
 * - anything else → "exv" (default to vertical expansion)
 */
function deriveAdCategory(expansionType: string): string {
  return expansionType === "xx" ? "nn" : "exv";
}

/**
 * Process raw intake into a validated, resolved intake package.
 *
 * @param raw - Raw intake from Tess recommendation or manual human input
 * @returns SubAgentResult with ResolvedIntake or failure details
 */
export function process(
  raw: RawIntake,
): SubAgentResult<ResolvedIntake> {
  const errors: string[] = [];

  // ── Phase 1: Validate required fields are present ──────────────────────

  if (!raw.source_asset_id || raw.source_asset_id.trim().length === 0) {
    errors.push("source_asset_id is required");
  }

  if (!raw.expansion_type || raw.expansion_type.trim().length === 0) {
    errors.push("expansion_type is required");
  } else if (!VALID_EXPANSION_TYPES.has(raw.expansion_type)) {
    errors.push(`Invalid expansion_type: "${raw.expansion_type}"`);
  }

  if (!raw.root_angle_name || raw.root_angle_name.trim().length === 0) {
    errors.push("root_angle_name is required");
  }

  if (raw.target_variations == null || raw.target_variations < 1) {
    errors.push("target_variations must be at least 1");
  }

  if (!raw.edit_method) {
    errors.push("edit_method is required");
  } else if (!["assembly", "ai_enhanced", "hybrid"].includes(raw.edit_method)) {
    errors.push(`Invalid edit_method: "${raw.edit_method}"`);
  }

  if (!raw.directing_person || raw.directing_person.trim().length === 0) {
    errors.push("directing_person is required");
  } else if (raw.directing_person.length < 2 || raw.directing_person.length > 4) {
    errors.push(`directing_person must be 2-4 characters, got "${raw.directing_person}" (${raw.directing_person.length})`);
  }

  // Bail early if basic fields are missing — can't proceed without source ID
  if (errors.length > 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "critical",
      message: `Intake validation failed: ${errors.join("; ")}`,
      recovery_action: "halt",
      context: { step: "1" },
    };
  }

  // ── Phase 2: Parse source asset ID ─────────────────────────────────────

  const parseResult = parseAssetId(raw.source_asset_id);

  if (parseResult.status === "ERROR" || !parseResult.positions) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "critical",
      message: `Source asset ID parsing failed: ${parseResult.errors.join("; ")}`,
      recovery_action: "halt",
      context: {
        step: "1",
        asset_ids: [raw.source_asset_id],
      },
    };
  }

  const source = parseResult.positions;

  // ── Phase 3: Auto-inherit from source, apply overrides ─────────────────

  const platform = raw.platform ?? source.platform;
  const dimensions = raw.dimensions ?? source.dimensions;
  const lengthTier = raw.length_tier ?? source.length_tier;
  const countryCode = raw.country_code ?? source.country_code;
  const talentCode = raw.talent_code ?? source.talent_code;
  const assetType = raw.asset_type ?? source.asset_type;
  const adCategory = raw.ad_category ?? deriveAdCategory(raw.expansion_type);

  // ── Phase 4: Validate resolved fields ──────────────────────────────────

  if (!VALID_PLATFORMS.has(platform)) {
    errors.push(`Invalid resolved platform: "${platform}"`);
  }

  if (!DIMENSIONS_PATTERN.test(dimensions)) {
    errors.push(`Invalid resolved dimensions: "${dimensions}"`);
  }

  if (!VALID_LENGTH_TIERS.has(lengthTier)) {
    errors.push(`Invalid resolved length_tier: "${lengthTier}"`);
  }

  if (!VALID_AD_CATEGORIES.has(adCategory)) {
    errors.push(`Invalid resolved ad_category: "${adCategory}"`);
  }

  // Accept legacy "vd" (generic video) from old-format source asset IDs
  if (!VALID_ASSET_TYPES.has(assetType) && assetType !== "vd") {
    errors.push(`Invalid resolved asset_type: "${assetType}"`);
  }

  if (!VALID_COUNTRY_CODES.has(countryCode)) {
    errors.push(`Invalid resolved country_code: "${countryCode}"`);
  }

  if (talentCode.length !== 4) {
    errors.push(`Invalid resolved talent_code: "${talentCode}" (must be 4 characters)`);
  }

  // ── Phase 5: Cross-field validation ────────────────────────────────────

  // nn/nnmu require expansion_type == "xx"
  if ((adCategory === "nn" || adCategory === "nnmu") && raw.expansion_type !== "xx") {
    errors.push(`ad_category "${adCategory}" requires expansion_type "xx", got "${raw.expansion_type}"`);
  }

  // exv/exh require expansion_type != "xx"
  if ((adCategory === "exv" || adCategory === "exh") && raw.expansion_type === "xx") {
    errors.push(`ad_category "${adCategory}" requires a specific expansion_type, got "xx"`);
  }

  if (errors.length > 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "critical",
      message: `Resolved intake validation failed: ${errors.join("; ")}`,
      recovery_action: "halt",
      context: {
        step: "1",
        asset_ids: [raw.source_asset_id],
      },
    };
  }

  // ── Phase 6: Produce resolved intake ───────────────────────────────────

  return {
    status: "SUCCESS",
    data: {
      source_asset_id: raw.source_asset_id,
      funnel: source.funnel,
      script_id: source.script_id,
      source_positions: source,
      platform,
      dimensions,
      length_tier: lengthTier,
      ad_category: adCategory,
      expansion_type: raw.expansion_type,
      asset_type: assetType,
      talent_code: talentCode,
      country_code: countryCode,
      root_angle_name: raw.root_angle_name,
      target_variations: raw.target_variations,
      edit_method: raw.edit_method,
      directing_person: raw.directing_person,
      special_instructions: raw.special_instructions,
      ...(raw.promo_name ? { promo_name: raw.promo_name } : {}),
    },
  };
}
