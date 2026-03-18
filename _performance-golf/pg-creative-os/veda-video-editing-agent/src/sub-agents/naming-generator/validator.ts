/**
 * Business rule validation for the 15-position naming convention.
 * 4 cross-field rules that enforce logical consistency between positions.
 */

import type { AssetIdPositions } from "../../types/pipeline.js";

/**
 * Rule 1: Net New (nn) and Mashup (nnmu) require ExpansionType = "xx".
 * Rationale: Net new assets have no expansion — they ARE the original.
 */
export function validateNnRequiresXx(
  adCategory: string,
  expansionType: string,
): string | null {
  if (
    (adCategory === "nn" || adCategory === "nnmu") &&
    expansionType !== "xx"
  ) {
    return `AdCategory "${adCategory}" requires ExpansionType "xx", got "${expansionType}"`;
  }
  return null;
}

/**
 * Rule 2: Expansion categories (exv/exh) require a specific expansion type, NOT "xx".
 * Rationale: If you're expanding, you must specify HOW.
 */
export function validateExpansionRequiresSpecific(
  adCategory: string,
  expansionType: string,
): string | null {
  if (
    (adCategory === "exv" || adCategory === "exh") &&
    expansionType === "xx"
  ) {
    return `AdCategory "${adCategory}" requires a specific ExpansionType (hs, ssr, dur, env, sp, dp, af, cf), got "xx"`;
  }
  return null;
}

/**
 * Rule 3: Image/HTML ScriptIDs (i-prefix or h-prefix) require Platform = "xx"
 * and LengthTier = "xx".
 * Rationale: Images don't have a video platform or duration.
 */
export function validateImagePlatformLength(
  scriptId: string,
  platform: string,
  lengthTier: string,
): string | null {
  if (scriptId.startsWith("i") || scriptId.startsWith("h")) {
    const errors: string[] = [];
    if (platform !== "xx") {
      errors.push(`Platform must be "xx" for image/HTML ScriptID "${scriptId}", got "${platform}"`);
    }
    if (lengthTier !== "xx") {
      errors.push(`LengthTier must be "xx" for image/HTML ScriptID "${scriptId}", got "${lengthTier}"`);
    }
    if (errors.length > 0) {
      return errors.join("; ");
    }
  }
  return null;
}

/**
 * Rule 4: Facebook (fb) only supports 9x16 video dimensions.
 * Rationale: FB does not support 16x9 video. YouTube supports both.
 */
export function validateFbDimensions(
  platform: string,
  dimensions: string,
): string | null {
  if (platform === "fb" && dimensions !== "9x16") {
    return `Facebook requires dimensions "9x16", got "${dimensions}"`;
  }
  return null;
}

/**
 * Runs all 4 business rules against a complete set of positions.
 * Returns an array of error messages. Empty array = all rules passed.
 */
export function validateAllRules(positions: AssetIdPositions): string[] {
  const errors: string[] = [];

  const r1 = validateNnRequiresXx(positions.ad_category, positions.expansion_type);
  if (r1) errors.push(r1);

  const r2 = validateExpansionRequiresSpecific(positions.ad_category, positions.expansion_type);
  if (r2) errors.push(r2);

  const r3 = validateImagePlatformLength(positions.script_id, positions.platform, positions.length_tier);
  if (r3) errors.push(r3);

  const r4 = validateFbDimensions(positions.platform, positions.dimensions);
  if (r4) errors.push(r4);

  return errors;
}
