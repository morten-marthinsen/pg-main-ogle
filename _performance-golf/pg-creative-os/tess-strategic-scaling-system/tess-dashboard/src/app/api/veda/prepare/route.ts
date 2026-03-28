/**
 * POST /api/veda/prepare
 *
 * Called when "Start in Veda" is clicked on a recommendation card.
 * Looks up root angle name and next available variation IDs from the
 * creative performance spreadsheet, then generates a ready-to-run CLI command.
 *
 * Request body: { funnel, script_id, source_ad, expansion_type, variations }
 * Response: { root_angle_name, next_variation_start, cli_command, spreadsheet_name }
 */

import { NextRequest, NextResponse } from "next/server";
import { FUNNEL_TO_SPREADSHEET } from "@/lib/spreadsheet-registry";

// Google Sheets API v4 — direct REST call (no SDK needed)
async function readSheetRange(spreadsheetId: string, range: string): Promise<string[][]> {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_SHEETS_API_KEY not set — needed for spreadsheet lookups");
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Sheets API error (${resp.status}): ${text}`);
  }
  const data = await resp.json();
  return data.values || [];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { funnel, script_id, source_ad, expansion_type, variations = 5 } = body;

    if (!funnel || !script_id) {
      return NextResponse.json({ error: "funnel and script_id are required" }, { status: 400 });
    }

    // Map funnel → spreadsheet
    const sheet = FUNNEL_TO_SPREADSHEET[funnel.toLowerCase()];
    if (!sheet) {
      // If no spreadsheet mapping, still generate CLI command with manual root angle
      return NextResponse.json({
        root_angle_name: null,
        next_variation_start: null,
        spreadsheet_name: null,
        warning: `No creative performance spreadsheet found for funnel "${funnel}". Root angle name must be provided manually.`,
        cli_command: buildCliCommand({ source_ad, expansion_type, variations }),
      });
    }

    // Read Column A (variation IDs) and Column B-C (root angle ID + name) from Video Ads tab
    const rows = await readSheetRange(sheet.id, "Video Ads!A:C");

    // Find root angle name (first row matching this script_id)
    const rootAngleId = `${funnel}-${script_id}`.toLowerCase();
    let rootAngleName = "";
    let maxVariation = 0;

    for (const row of rows.slice(1)) { // skip header
      const variationId = (row[0] || "").toLowerCase();
      const rowRootAngle = (row[1] || "").toLowerCase();
      const rowName = row[2] || "";

      if (rowRootAngle === rootAngleId) {
        // Get root angle name from first variation (v0001)
        if (!rootAngleName && rowName) {
          // Strip " - V1", " - V2" etc. from the name
          rootAngleName = rowName.replace(/\s*-\s*V\d+$/i, "").trim();
        }

        // Track max variation number
        const match = variationId.match(/v(\d+)$/);
        if (match) {
          const vNum = parseInt(match[1], 10);
          if (vNum > maxVariation) maxVariation = vNum;
        }
      }
    }

    const nextVariationStart = maxVariation + 1;

    return NextResponse.json({
      root_angle_name: rootAngleName || null,
      root_angle_id: rootAngleId,
      next_variation_start: nextVariationStart,
      next_variation_ids: Array.from({ length: variations }, (_, i) =>
        `v${String(nextVariationStart + i).padStart(4, "0")}`
      ),
      max_existing_variation: maxVariation,
      spreadsheet_name: sheet.name,
      cli_command: buildCliCommand({
        source_ad,
        expansion_type,
        variations,
        root_angle_name: rootAngleName,
      }),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[/api/veda/prepare]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function buildCliCommand(params: {
  source_ad: string;
  expansion_type: string;
  variations: number;
  root_angle_name?: string;
}): string {
  const parts = [
    "cd ~/pg-main-ogle/_performance-golf/pg-creative-os/veda-video-editing-agent",
    "&&",
    "npx veda run",
    `--source "${params.source_ad}"`,
    `--expansion ${params.expansion_type}`,
    `--variations ${params.variations}`,
    "--auto-confirm",
  ];

  return parts.join(" ");
}
