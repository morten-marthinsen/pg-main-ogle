/**
 * Live integration tests for Google Sheets adapter.
 * Gated behind VEDA_SHEETS_INTEGRATION=1 — skipped in normal test runs.
 *
 * Run with: VEDA_SHEETS_INTEGRATION=1 npx vitest run src/utils/google-sheets-integration.test.ts
 */

import { describe, it, expect } from "vitest";
import { config as loadEnv } from "dotenv";
import { createGoogleSheetsReader } from "./google-sheets-client.js";

loadEnv();

const INTEGRATION = process.env.VEDA_SHEETS_INTEGRATION === "1";

describe.skipIf(!INTEGRATION)("Google Sheets integration (live API)", () => {
  it("reads rows from the real SSS spreadsheet", async () => {
    const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH ?? "./veda-sheets-sa-key.json";
    const spreadsheetId = process.env.VEDA_SPREADSHEET_ID!;

    const reader = await createGoogleSheetsReader({ keyFilePath: keyPath });
    const rows = await reader.getRows(
      spreadsheetId,
      "Ad Level Tracking (Current State)",
      "A1:U5",
    );

    // Should get at least the header row
    expect(rows.length).toBeGreaterThanOrEqual(1);
    console.log(`[INTEGRATION] Read ${rows.length} rows from SSS`);
    console.log(`[INTEGRATION] Header: ${rows[0]?.slice(0, 5).join(" | ")}`);
    if (rows.length > 1) {
      console.log(`[INTEGRATION] First data row: ${rows[1]?.slice(0, 5).join(" | ")}`);
    }
  });

  it("reads a specific cell range", async () => {
    const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH ?? "./veda-sheets-sa-key.json";
    const spreadsheetId = process.env.VEDA_SPREADSHEET_ID!;

    const reader = await createGoogleSheetsReader({ keyFilePath: keyPath });
    const rows = await reader.getRows(
      spreadsheetId,
      "Ad Level Tracking (Current State)",
      "A1:A1",
    );

    // Header cell should be "Funnel"
    expect(rows.length).toBe(1);
    expect(rows[0][0]).toBe("Funnel");
  });
});
