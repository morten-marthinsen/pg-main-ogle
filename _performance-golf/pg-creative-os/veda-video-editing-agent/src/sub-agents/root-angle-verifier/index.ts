/**
 * root_angle_verifier — Veda's integrity guardian.
 *
 * The Root Angle Principle is the single most important rule in the entire
 * system: every Script ID tests exactly ONE root angle, and that binding
 * is permanent and immutable. This sub-agent verifies that every expansion
 * preserves the root angle BEFORE any editing begins.
 *
 * Pipeline Position: Step 2 — VALIDATE (core quality gate)
 *
 * Key behaviors:
 *   - Verifies source asset exists in SSS (Ad Level Tracking)
 *   - Reads Root Angle Name from Column C for the source Script ID
 *   - Checks classification eligibility (Winner only, or human override)
 *   - Validates ad_category / expansion_type compatibility
 *   - Deliberately conservative: flags ANY ambiguity for human review
 *   - When Root Angle Name is missing, HALTS (transcript-based suggestions
 *     provided by transcript_analyzer separately)
 *
 * Uses SheetsReader abstraction for SSS access (same as sheets_updater).
 */

import type {
  SheetsReader,
  ResolvedIntake,
  RootAngleVerifierInput,
  RootAngleVerifierOutput,
} from "../../types/pipeline.js";
import type { SubAgentResult } from "../../types/sub-agent.js";

const DEFAULT_SHEET = "Ad Level Tracking (Current State)";

// Column indices matching Ad Level Tracking
const COL = {
  FUNNEL: 0,
  SCRIPT_ID: 1,
  ROOT_ANGLE: 2,
  ASSET_ID: 3,
  CLASSIFICATION: 19,
} as const;

// Classifications that are eligible for expansion without override
const ELIGIBLE_CLASSIFICATIONS = new Set(["winner"]);

// Expansion types that inherently preserve the root angle
// (they only change presentation, not the persuasive thesis)
const SAFE_EXPANSION_TYPES = new Set([
  "hs",   // Hook Stack — changes first 3-15s only, body unchanged
  "ssr",  // Scroll Stopper Refresh — changes first 0-3s, body unchanged
  "env",  // Environment — changes background only, content unchanged
  "sp",   // Static Poster — image version of existing video
  "dp",   // Dynamic Poster — animated version of existing video
  "af",   // Ad Format — restructured format of same content
]);

// These expansion types COULD shift the root angle and need careful assessment
const RISKY_EXPANSION_TYPES = new Set([
  "dur",  // Duration — reassembly could omit key persuasive elements
  "cf",   // Copy Framework — new copy overlays could shift the thesis
]);

/**
 * Look up a Script ID in the SSS spreadsheet.
 * Returns all matching rows (there may be multiple assets per Script ID).
 */
export function findScriptInSSS(
  rows: string[][],
  funnel: string,
  scriptId: string,
): {
  found: boolean;
  root_angle_name: string | null;
  classifications: string[];
  asset_count: number;
} {
  const normalizedFunnel = funnel.toLowerCase().trim();
  const normalizedScript = scriptId.toLowerCase().trim();

  let rootAngleName: string | null = null;
  const classifications: string[] = [];
  let assetCount = 0;

  for (const row of rows) {
    const rowFunnel = (row[COL.FUNNEL] ?? "").toLowerCase().trim();
    const rowScript = (row[COL.SCRIPT_ID] ?? "").toLowerCase().trim();

    if (rowFunnel !== normalizedFunnel || rowScript !== normalizedScript) {
      continue;
    }

    assetCount++;

    // Take the first non-empty Root Angle Name we find
    const angle = (row[COL.ROOT_ANGLE] ?? "").trim();
    if (angle && !rootAngleName) {
      rootAngleName = angle;
    }

    const classification = (row[COL.CLASSIFICATION] ?? "").toLowerCase().trim();
    if (classification) {
      classifications.push(classification);
    }
  }

  return {
    found: assetCount > 0,
    root_angle_name: rootAngleName,
    classifications,
    asset_count: assetCount,
  };
}

/**
 * Assess whether an expansion type preserves the root angle.
 * Returns a verdict with reasoning.
 */
export function assessRootAnglePreservation(
  expansionType: string,
  adCategory: string,
): {
  preserved: boolean;
  confidence: "high" | "medium" | "uncertain";
  reasoning: string;
} {
  const et = expansionType.toLowerCase();
  const ac = adCategory.toLowerCase();

  // Net new assets don't have a root angle to preserve — they CREATE one
  if (ac === "nn" || ac === "nnmu") {
    return {
      preserved: true,
      confidence: "high",
      reasoning: "Net new asset creates its own root angle — no preservation needed.",
    };
  }

  // Safe expansion types: structurally cannot shift the root angle
  if (SAFE_EXPANSION_TYPES.has(et)) {
    return {
      preserved: true,
      confidence: "high",
      reasoning: `Expansion type "${et}" modifies presentation only, not persuasive content.`,
    };
  }

  // Risky expansion types: COULD shift the root angle
  if (RISKY_EXPANSION_TYPES.has(et)) {
    return {
      preserved: true,
      confidence: "uncertain",
      reasoning: `Expansion type "${et}" modifies content structure — root angle preservation depends on execution. Flagging for human review.`,
    };
  }

  // Unknown expansion type — flag
  return {
    preserved: true,
    confidence: "uncertain",
    reasoning: `Expansion type "${et}" is unrecognized — cannot assess root angle impact.`,
  };
}

/**
 * Check if the source asset's classification is eligible for expansion.
 * By default only Winners are eligible, but human can override.
 */
export function checkClassificationEligibility(
  classifications: string[],
): {
  eligible: boolean;
  best_classification: string | null;
  reasoning: string;
} {
  if (classifications.length === 0) {
    return {
      eligible: false,
      best_classification: null,
      reasoning: "No classification data found in SSS for this Script ID.",
    };
  }

  // Check if ANY asset in this Script ID is a Winner
  const hasWinner = classifications.some((c) =>
    ELIGIBLE_CLASSIFICATIONS.has(c.toLowerCase()),
  );

  const best =
    classifications.find((c) => c.toLowerCase() === "winner") ??
    classifications[0];

  if (hasWinner) {
    return {
      eligible: true,
      best_classification: best,
      reasoning: "Source Script ID has Winner-classified assets — eligible for expansion.",
    };
  }

  return {
    eligible: false,
    best_classification: best,
    reasoning: `Source Script ID classification is "${best}" — only Winners are eligible for expansion. Human override required.`,
  };
}

/**
 * Main verify function — the Step 2 quality gate.
 */
export async function verify(
  input: RootAngleVerifierInput,
  reader: SheetsReader,
): Promise<SubAgentResult<RootAngleVerifierOutput>> {
  const { resolved_intake } = input;

  // Validate resolved_intake exists
  if (!resolved_intake) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "resolved_intake is required",
      recovery_action: "halt",
      context: { step: "root_angle_verifier" },
    };
  }

  const sheet = input.sheet_name ?? DEFAULT_SHEET;

  // Step 1: Look up source Script ID in SSS
  let rows: string[][];
  try {
    rows = await reader.getRows(input.spreadsheet_id, sheet, "A2:U");
  } catch (err) {
    return {
      status: "FAILED",
      error_category: "SHEETS_ERROR",
      severity: "error",
      message: `Failed to read SSS spreadsheet: ${err instanceof Error ? err.message : String(err)}`,
      recovery_action: "retry",
      context: { step: "root_angle_verifier" },
    };
  }

  const sssLookup = findScriptInSSS(
    rows,
    resolved_intake.funnel,
    resolved_intake.script_id,
  );

  const warnings: string[] = [];

  // Step 2: Check if source exists in SSS
  if (!sssLookup.found) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: `Source Script ID ${resolved_intake.funnel}-${resolved_intake.script_id} not found in SSS spreadsheet`,
      recovery_action: "halt",
      context: { step: "root_angle_verifier" },
    };
  }

  // Step 3: Validate Root Angle Name
  const intakeAngle = resolved_intake.root_angle_name?.trim();

  if (!intakeAngle) {
    // Root Angle Name is missing — HALT and request human input
    // If SSS has one, suggest it
    if (sssLookup.root_angle_name) {
      return {
        status: "NEEDS_HUMAN_INPUT",
        message: `Root Angle Name missing from intake. SSS has "${sssLookup.root_angle_name}" for ${resolved_intake.funnel}-${resolved_intake.script_id}. Confirm or provide the correct Root Angle Name.`,
        options: [sssLookup.root_angle_name, "Enter different name"],
        context: { step: "root_angle_verifier" },
      };
    }
    // SSS doesn't have one either — need transcript analysis
    return {
      status: "NEEDS_HUMAN_INPUT",
      message: `Root Angle Name missing from both intake and SSS for ${resolved_intake.funnel}-${resolved_intake.script_id}. Run transcript_analyzer to generate suggestions, then human must assign.`,
      options: ["Run transcript analysis", "Manually assign"],
      context: { step: "root_angle_verifier" },
    };
  }

  // Step 4: Cross-check Root Angle Name with SSS
  if (sssLookup.root_angle_name && sssLookup.root_angle_name !== intakeAngle) {
    // Mismatch between intake and SSS — this is suspicious
    warnings.push(
      `Root Angle Name mismatch: intake says "${intakeAngle}" but SSS has "${sssLookup.root_angle_name}" for ${resolved_intake.funnel}-${resolved_intake.script_id}. Using intake value — verify this is intentional.`,
    );
  }

  // Step 5: Assess root angle preservation
  const preservation = assessRootAnglePreservation(
    resolved_intake.expansion_type,
    resolved_intake.ad_category,
  );

  if (preservation.confidence === "uncertain") {
    return {
      status: "NEEDS_HUMAN_INPUT",
      message: `Root angle preservation uncertain for ${resolved_intake.expansion_type} expansion. ${preservation.reasoning}`,
      options: ["Approve — root angle is preserved", "Reject — root angle would shift"],
      context: { step: "root_angle_verifier" },
    };
  }

  // Step 6: Check classification eligibility
  const eligibility = checkClassificationEligibility(sssLookup.classifications);

  if (!eligibility.eligible) {
    return {
      status: "NEEDS_HUMAN_INPUT",
      message: eligibility.reasoning,
      options: ["Override — proceed anyway", "Cancel — choose a different source"],
      context: { step: "root_angle_verifier" },
    };
  }

  return {
    status: "SUCCESS",
    data: {
      root_angle_name: intakeAngle,
      root_angle_preserved: preservation.preserved,
      source_exists_in_sss: true,
      classification_eligible: eligibility.eligible,
      source_classification: eligibility.best_classification ?? undefined,
      edit_method_confirmed: resolved_intake.edit_method,
      warnings,
    },
  };
}
