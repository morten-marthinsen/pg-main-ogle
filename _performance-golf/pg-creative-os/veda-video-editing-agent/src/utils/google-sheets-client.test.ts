import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Hoisted mocks (vi.mock is hoisted above variable declarations) ──────────

const { mockGet, mockAppend } = vi.hoisted(() => ({
  mockGet: vi.fn(),
  mockAppend: vi.fn(),
}));

vi.mock("googleapis", () => ({
  google: {
    auth: {
      JWT: vi.fn().mockImplementation(() => ({})),
    },
    sheets: vi.fn().mockReturnValue({
      spreadsheets: {
        values: {
          get: mockGet,
          append: mockAppend,
        },
      },
    }),
  },
}));

// Mock fs/promises to avoid needing a real key file in unit tests
vi.mock("node:fs/promises", () => ({
  readFile: vi.fn().mockResolvedValue(
    JSON.stringify({
      client_email: "test@example.iam.gserviceaccount.com",
      private_key: "-----BEGIN RSA PRIVATE KEY-----\nfake\n-----END RSA PRIVATE KEY-----\n",
    }),
  ),
}));

import {
  createGoogleSheetsReader,
  createGoogleSheetsWriter,
} from "./google-sheets-client.js";

// ── SheetsReader Tests ──────────────────────────────────────────────────────

describe("createGoogleSheetsReader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns rows from the Sheets API", async () => {
    const fixture = [
      ["DQFE", "SC01", "The Move", "DQFE-SC01-v0001-yt-16x9-30s-nn-hs-vd-gamc-vv-co-us-20260206"],
      ["DQFE", "SC01", "The Move", "DQFE-SC01-v0002-yt-16x9-30s-nn-hs-vd-gamc-vv-co-us-20260206"],
    ];
    mockGet.mockResolvedValueOnce({ data: { values: fixture } });

    const reader = await createGoogleSheetsReader({ keyFilePath: "./fake-key.json" });
    const rows = await reader.getRows("spreadsheet-123", "Ad Level Tracking (Current State)", "A2:U");

    expect(rows).toEqual(fixture);
    expect(mockGet).toHaveBeenCalledWith({
      spreadsheetId: "spreadsheet-123",
      range: "'Ad Level Tracking (Current State)'!A2:U",
      valueRenderOption: "FORMATTED_VALUE",
    });
  });

  it("returns empty array for empty sheet", async () => {
    mockGet.mockResolvedValueOnce({ data: { values: undefined } });

    const reader = await createGoogleSheetsReader({ keyFilePath: "./fake-key.json" });
    const rows = await reader.getRows("spreadsheet-123", "Sheet1", "A2:U");

    expect(rows).toEqual([]);
  });

  it("propagates API errors", async () => {
    mockGet.mockRejectedValueOnce(new Error("403 Forbidden"));

    const reader = await createGoogleSheetsReader({ keyFilePath: "./fake-key.json" });

    await expect(
      reader.getRows("spreadsheet-123", "Sheet1", "A2:U"),
    ).rejects.toThrow("403 Forbidden");
  });
});

// ── SheetsWriter Tests ──────────────────────────────────────────────────────

describe("createGoogleSheetsWriter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("appends rows and returns updated count", async () => {
    mockAppend.mockResolvedValueOnce({
      data: { updates: { updatedRows: 3 } },
    });

    const writer = await createGoogleSheetsWriter({ keyFilePath: "./fake-key.json" });
    const result = await writer.appendRows("spreadsheet-123", "Sheet1", [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"],
    ]);

    expect(result.updatedRows).toBe(3);
    expect(mockAppend).toHaveBeenCalledWith({
      spreadsheetId: "spreadsheet-123",
      range: "'Sheet1'!A:U",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          ["a", "b", "c"],
          ["d", "e", "f"],
          ["g", "h", "i"],
        ],
      },
    });
  });

  it("returns 0 when API response has no updates", async () => {
    mockAppend.mockResolvedValueOnce({ data: { updates: {} } });

    const writer = await createGoogleSheetsWriter({ keyFilePath: "./fake-key.json" });
    const result = await writer.appendRows("spreadsheet-123", "Sheet1", [["x"]]);

    expect(result.updatedRows).toBe(0);
  });

  it("getRows works on writer too (for duplicate detection)", async () => {
    const fixture = [["DQFE", "SC01", "The Move", "DQFE-SC01-v0001"]];
    mockGet.mockResolvedValueOnce({ data: { values: fixture } });

    const writer = await createGoogleSheetsWriter({ keyFilePath: "./fake-key.json" });
    const rows = await writer.getRows("spreadsheet-123", "Sheet1", "A2:U");

    expect(rows).toEqual(fixture);
  });

  it("propagates append errors", async () => {
    mockAppend.mockRejectedValueOnce(new Error("500 Internal Server Error"));

    const writer = await createGoogleSheetsWriter({ keyFilePath: "./fake-key.json" });

    await expect(
      writer.appendRows("spreadsheet-123", "Sheet1", [["x"]]),
    ).rejects.toThrow("500 Internal Server Error");
  });
});

// Integration tests live in google-sheets-integration.test.ts (no mocks).
// Run with: VEDA_SHEETS_INTEGRATION=1 npx vitest run src/utils/google-sheets-integration.test.ts
