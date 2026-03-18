/**
 * Real Google Sheets client — production SheetsReader + SheetsWriter.
 *
 * Uses a Google Cloud service account for headless authentication.
 * Wraps the googleapis v4 Sheets API behind Veda's DI interfaces
 * (SheetsReader and SheetsWriter from src/types/pipeline.ts).
 *
 * Credentials:
 *   - GOOGLE_SERVICE_ACCOUNT_KEY_PATH → path to SA JSON key file
 *   - Spreadsheet must be shared with the SA email as Editor
 */

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { google } from "googleapis";
import type { sheets_v4 } from "googleapis";
import type { SheetsReader, SheetsWriter } from "../types/pipeline.js";

/** Abstraction for updating specific cells. Used by intake queue for status changes. */
export interface SheetsUpdater {
  updateCells(
    spreadsheetId: string,
    sheet: string,
    range: string,
    values: string[][],
  ): Promise<void>;
}

/** Options for creating a Google Sheets client. */
export interface GoogleSheetsClientOptions {
  /** Absolute or relative path to the service account JSON key file. */
  keyFilePath: string;
}

/** Load and parse the service account key file. */
async function loadServiceAccountKey(
  keyFilePath: string,
): Promise<{ client_email: string; private_key: string }> {
  const absPath = resolve(keyFilePath);
  const raw = await readFile(absPath, "utf-8");
  const key = JSON.parse(raw);

  if (!key.client_email || !key.private_key) {
    throw new Error(
      `Invalid service account key at ${absPath}: missing client_email or private_key`,
    );
  }

  return { client_email: key.client_email, private_key: key.private_key };
}

/** Create an authenticated Google Sheets API client. */
async function createSheetsApi(
  keyFilePath: string,
): Promise<sheets_v4.Sheets> {
  const { client_email, private_key } = await loadServiceAccountKey(keyFilePath);

  const auth = new google.auth.JWT({
    email: client_email,
    key: private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    // Node.js 25 native fetch — bypasses broken node-fetch@3 ESM import in gaxios
    transporterOptions: { fetchImplementation: fetch },
  });

  return google.sheets({ version: "v4", auth });
}

/**
 * Create a production SheetsReader backed by Google Sheets API.
 *
 * Usage:
 *   const reader = await createGoogleSheetsReader({ keyFilePath: "./sa-key.json" });
 *   const rows = await reader.getRows(spreadsheetId, "Sheet1", "A2:U");
 */
export async function createGoogleSheetsReader(
  options: GoogleSheetsClientOptions,
): Promise<SheetsReader> {
  const sheets = await createSheetsApi(options.keyFilePath);

  return {
    async getRows(
      spreadsheetId: string,
      sheet: string,
      range: string,
    ): Promise<string[][]> {
      const fullRange = `'${sheet}'!${range}`;
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: fullRange,
        valueRenderOption: "FORMATTED_VALUE",
      });

      // API returns undefined for empty sheets
      return (response.data.values as string[][] | undefined) ?? [];
    },
  };
}

/**
 * Create a production SheetsWriter backed by Google Sheets API.
 *
 * Usage:
 *   const writer = await createGoogleSheetsWriter({ keyFilePath: "./sa-key.json" });
 *   const result = await writer.appendRows(spreadsheetId, "Sheet1", [["a","b"]]);
 */
export async function createGoogleSheetsWriter(
  options: GoogleSheetsClientOptions,
): Promise<SheetsWriter> {
  const sheets = await createSheetsApi(options.keyFilePath);

  return {
    async appendRows(
      spreadsheetId: string,
      sheet: string,
      rows: string[][],
    ): Promise<{ updatedRows: number }> {
      const fullRange = `'${sheet}'!A:U`;
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: fullRange,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: rows,
        },
      });

      const updatedRows = response.data.updates?.updatedRows ?? 0;
      return { updatedRows };
    },

    async getRows(
      spreadsheetId: string,
      sheet: string,
      range: string,
    ): Promise<string[][]> {
      const fullRange = `'${sheet}'!${range}`;
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: fullRange,
        valueRenderOption: "FORMATTED_VALUE",
      });

      return (response.data.values as string[][] | undefined) ?? [];
    },
  };
}

/**
 * Create a production SheetsUpdater for updating specific cells.
 * Used by the intake queue to mark rows as CLAIMED/COMPLETED.
 */
export async function createGoogleSheetsUpdater(
  options: GoogleSheetsClientOptions,
): Promise<SheetsUpdater> {
  const sheets = await createSheetsApi(options.keyFilePath);

  return {
    async updateCells(
      spreadsheetId: string,
      sheet: string,
      range: string,
      values: string[][],
    ): Promise<void> {
      const fullRange = `'${sheet}'!${range}`;
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: fullRange,
        valueInputOption: "RAW",
        requestBody: { values },
      });
    },
  };
}
