/**
 * naming_generator sub-agent — Pipeline Step 6: GENERATE ASSET IDs
 *
 * Assembles valid 15-position Asset IDs from intake data + reserved variation
 * numbers. This is the INVERSE of Tess's NamingParser: Tess parses existing
 * IDs, Veda generates new ones. Both share the same validation tables and
 * business rules.
 *
 * EditorInitials is always "vv" (Veda's code).
 * CreationDate defaults to today (YYYYMMDD).
 */

import type {
  AssetIdPositions,
  GeneratedAssetId,
  NamingGeneratorInput,
  NamingGeneratorOutput,
} from "../../types/pipeline.js";
import type { SubAgentResult } from "../../types/sub-agent.js";
import {
  VALID_PLATFORMS,
  VALID_LENGTH_TIERS,
  VALID_AD_CATEGORIES,
  VALID_EXPANSION_TYPES,
  VALID_ASSET_TYPES,
  VALID_COUNTRY_CODES,
  VALID_DIMENSIONS,
  SCRIPT_ID_PATTERN,
  VARIATION_ID_PATTERN,
  CREATION_DATE_PATTERN,
  DIMENSIONS_PATTERN,
} from "../../tables/naming-codes.js";
import { validateAllRules } from "./validator.js";

const VEDA_EDITOR_CODE = "vv";

/** Format today's date as YYYYMMDD. */
function todayYYYYMMDD(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

/** Validate that a single input field value is in its allowed set. */
function validateField(
  fieldName: string,
  value: string,
  validSet: Set<string>,
): string | null {
  if (!validSet.has(value)) {
    return `Invalid ${fieldName}: "${value}"`;
  }
  return null;
}

/** Validate all input fields against their code tables. */
function validateInputFields(input: NamingGeneratorInput): string[] {
  const errors: string[] = [];

  // ScriptID format
  if (!SCRIPT_ID_PATTERN.test(input.script_id)) {
    errors.push(`Invalid ScriptID format: "${input.script_id}" (expected 4 digits, i + 3 digits, or h + 3-4 digits)`);
  }

  // Platform
  const platformErr = validateField("Platform", input.platform, VALID_PLATFORMS);
  if (platformErr) errors.push(platformErr);

  // Dimensions format
  if (!DIMENSIONS_PATTERN.test(input.dimensions)) {
    errors.push(`Invalid Dimensions format: "${input.dimensions}" (expected NxN)`);
  } else if (!VALID_DIMENSIONS.has(input.dimensions)) {
    errors.push(`Unknown Dimensions: "${input.dimensions}" — not in known dimension codes`);
  }

  // Length tier
  const lengthErr = validateField("LengthTier", input.length_tier, VALID_LENGTH_TIERS);
  if (lengthErr) errors.push(lengthErr);

  // Ad category
  const catErr = validateField("AdCategory", input.ad_category, VALID_AD_CATEGORIES);
  if (catErr) errors.push(catErr);

  // Expansion type
  const expErr = validateField("ExpansionType", input.expansion_type, VALID_EXPANSION_TYPES);
  if (expErr) errors.push(expErr);

  // Asset type
  const assetErr = validateField("AssetType", input.asset_type, VALID_ASSET_TYPES);
  if (assetErr) errors.push(assetErr);

  // Talent code: must be exactly 4 characters
  if (input.talent_code.length !== 4) {
    errors.push(`TalentCode must be exactly 4 characters, got "${input.talent_code}" (${input.talent_code.length})`);
  }

  // Copywriter initials: must be 2-4 characters
  if (input.copywriter_initials.length < 2 || input.copywriter_initials.length > 4) {
    errors.push(`CopywriterInitials must be 2-4 characters, got "${input.copywriter_initials}" (${input.copywriter_initials.length})`);
  }

  // Country code
  const countryErr = validateField("CountryCode", input.country_code, VALID_COUNTRY_CODES);
  if (countryErr) errors.push(countryErr);

  // Variation numbers format
  for (const vn of input.reserved_variation_numbers) {
    if (!VARIATION_ID_PATTERN.test(vn)) {
      errors.push(`Invalid VariationID format: "${vn}" (expected v + 4 digits)`);
    }
  }

  // Creation date format (if provided)
  if (input.creation_date && !CREATION_DATE_PATTERN.test(input.creation_date)) {
    errors.push(`Invalid CreationDate format: "${input.creation_date}" (expected YYYYMMDD)`);
  }

  // Funnel: must be non-empty
  if (!input.funnel || input.funnel.trim().length === 0) {
    errors.push("Funnel cannot be empty");
  }

  return errors;
}

/**
 * Assemble positions into a hyphen-joined Asset ID string.
 * 14 positions without promo, 15 with promo.
 */
function assembleFullId(positions: AssetIdPositions): string {
  const parts = [
    positions.funnel,
    positions.script_id,
    positions.variation_id,
    positions.platform,
    positions.dimensions,
    positions.length_tier,
    positions.ad_category,
    positions.expansion_type,
    positions.asset_type,
    positions.talent_code,
    positions.editor_initials,
    positions.copywriter_initials,
    positions.country_code,
    positions.creation_date,
  ];

  if (positions.promo_name) {
    parts.push(positions.promo_name);
  }

  return parts.join("-");
}

/**
 * Generate valid 15-position Asset IDs from intake data + reserved variation numbers.
 *
 * @param input - All position values + reserved variation numbers
 * @returns SubAgentResult with generated IDs or failure details
 */
export function generate(
  input: NamingGeneratorInput,
): SubAgentResult<NamingGeneratorOutput> {
  // Phase 1: Validate input fields against code tables
  const inputErrors = validateInputFields(input);
  if (inputErrors.length > 0) {
    return {
      status: "FAILED",
      error_category: "NAMING_ERROR",
      severity: "critical",
      message: `Input validation failed: ${inputErrors.join("; ")}`,
      recovery_action: "halt",
      context: {
        step: "6",
        asset_ids: [],
      },
    };
  }

  // Phase 2: Must have at least one variation number
  if (input.reserved_variation_numbers.length === 0) {
    return {
      status: "FAILED",
      error_category: "NAMING_ERROR",
      severity: "critical",
      message: "No reserved variation numbers provided",
      recovery_action: "halt",
      context: {
        step: "6",
        asset_ids: [],
      },
    };
  }

  const creationDate = input.creation_date ?? todayYYYYMMDD();
  const generatedIds: GeneratedAssetId[] = [];

  // Phase 3: Assemble and validate each variation
  for (const variationId of input.reserved_variation_numbers) {
    const positions: AssetIdPositions = {
      funnel: input.funnel,
      script_id: input.script_id,
      variation_id: variationId,
      platform: input.platform,
      dimensions: input.dimensions,
      length_tier: input.length_tier,
      ad_category: input.ad_category,
      expansion_type: input.expansion_type,
      asset_type: input.asset_type,
      talent_code: input.talent_code,
      editor_initials: VEDA_EDITOR_CODE,
      copywriter_initials: input.copywriter_initials,
      country_code: input.country_code,
      creation_date: creationDate,
      ...(input.promo_name ? { promo_name: input.promo_name } : {}),
    };

    // Run the 4 business rules
    const businessErrors = validateAllRules(positions);

    const fullId = assembleFullId(positions);
    const passed = businessErrors.length === 0;

    // Verify position count (14 without promo, 15 with promo)
    const expectedCount = positions.promo_name ? 15 : 14;
    const actualCount = fullId.split("-").length;
    if (actualCount !== expectedCount) {
      businessErrors.push(
        `Position count mismatch: expected ${expectedCount}, got ${actualCount}`,
      );
    }

    generatedIds.push({
      full_id: fullId,
      positions,
      validation_status: passed && actualCount === expectedCount ? "PASSED" : "FAILED",
      validation_errors: businessErrors,
    });
  }

  // Phase 4: Check if any IDs failed validation
  const failedIds = generatedIds.filter((id) => id.validation_status === "FAILED");
  if (failedIds.length > 0) {
    const allErrors = failedIds.flatMap((id) =>
      id.validation_errors.map((e) => `${id.full_id}: ${e}`),
    );
    return {
      status: "FAILED",
      error_category: "NAMING_ERROR",
      severity: "critical",
      message: `Business rule validation failed: ${allErrors.join("; ")}`,
      recovery_action: "halt",
      context: {
        step: "6",
        asset_ids: failedIds.map((id) => id.full_id),
      },
    };
  }

  return {
    status: "SUCCESS",
    data: {
      asset_ids: generatedIds,
    },
  };
}
