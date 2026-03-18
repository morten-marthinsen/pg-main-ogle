import { describe, it, expect, vi } from "vitest";
import type { TranscriptSegment, SheetsReader, SssTrackingRow } from "../types/pipeline.js";
import type { IconikClient } from "./iconik-client.js";
import {
  findFirstThoughtBoundary,
  findSameOfferWinners,
  selectHooks,
  extractScriptId,
  type HookSelectorDeps,
  type SelectHooksInput,
} from "./hook-selector.js";

// ── Fixtures ─────────────────────────────────────────────────────────────

function seg(start: number, end: number, text: string): TranscriptSegment {
  return { start_time: start, end_time: end, text };
}

/** Build a minimal SSS row as string[] (21 columns A-U). */
function sssRow(overrides: {
  funnel?: string;
  script_id?: string;
  asset_id?: string;
  asset_type?: string;
  spend?: string;
  roas?: string;
  classification?: string;
}): string[] {
  const row = new Array(21).fill("");
  row[0] = overrides.funnel ?? "dqfe";         // A: funnel
  row[1] = overrides.script_id ?? "0012";       // B: script_id
  row[2] = "Test Angle";                        // C: root_angle
  row[3] = overrides.asset_id ?? "dqfe-0012-v0001-fb-9x16-30s-nn-vd-1min-jd-us"; // D: asset_id
  row[4] = "fb";                                // E: platform
  row[5] = "9x16";                              // F: dimensions
  row[6] = "30s";                               // G: length_tier
  row[7] = "nn";                                // H: ad_category
  row[8] = "xx";                                // I: expansion_type
  row[9] = overrides.asset_type ?? "vd";        // J: asset_type
  row[10] = "jd";                               // K: talent
  row[11] = "";                                 // L: editor
  row[12] = "";                                 // M: copywriter
  row[13] = "us";                               // N: country
  row[14] = "";                                 // O: creation date
  row[15] = "active";                           // P: status
  row[16] = overrides.spend ?? "$5,000";        // Q: spend
  row[17] = "$10,000";                          // R: net revenue
  row[18] = overrides.roas ?? "200%";           // S: roas
  row[19] = overrides.classification ?? "Winner"; // T: classification
  row[20] = "video";                            // U: format_type
  return row;
}

// ── findFirstThoughtBoundary ─────────────────────────────────────────────

describe("findFirstThoughtBoundary", () => {
  it("finds sentence ending with period within range", () => {
    const segments = [
      seg(0, 1.5, "Hey guys"),
      seg(1.5, 3.2, "check this out."),
      seg(3.2, 5.0, "It's amazing."),
    ];
    const result = findFirstThoughtBoundary(segments, 2, 8, 4);
    expect(result.end_seconds).toBe(3.2);
    expect(result.text).toBe("Hey guys check this out.");
  });

  it("finds sentence ending with question mark", () => {
    const segments = [
      seg(0, 2.0, "Want to hit it"),
      seg(2.0, 4.5, "further than ever?"),
      seg(4.5, 6.0, "I thought so."),
    ];
    const result = findFirstThoughtBoundary(segments, 2, 8, 4);
    expect(result.end_seconds).toBe(4.5);
    expect(result.text).toBe("Want to hit it further than ever?");
  });

  it("skips boundary below min and continues to next", () => {
    const segments = [
      seg(0, 1.0, "Hi."),          // boundary at 1.0 — below min=2
      seg(1.0, 3.5, "Check this."), // boundary at 3.5 — within range
      seg(3.5, 5.0, "More talk."),
    ];
    const result = findFirstThoughtBoundary(segments, 2, 8, 4);
    expect(result.end_seconds).toBe(3.5);
    expect(result.text).toBe("Hi. Check this.");
  });

  it("clamps to max when boundary exceeds max", () => {
    const segments = [
      seg(0, 4.0, "Long sentence that"),
      seg(4.0, 7.0, "keeps going and"),
      seg(7.0, 10.0, "finally ends here."),  // 10.0 > max=8
    ];
    // Boundary at 10.0 exceeds max=8 → snap to nearest segment end to 8
    // Nearest segment end to 8 is 7.0
    const result = findFirstThoughtBoundary(segments, 2, 8, 4);
    expect(result.end_seconds).toBe(7.0);
  });

  it("uses fallback and snaps when no sentence boundary found", () => {
    const segments = [
      seg(0, 2.0, "No punctuation here"),
      seg(2.0, 4.0, "still no ending"),
      seg(4.0, 6.0, "nope none at all"),
    ];
    // fallback=4, snap to nearest segment end → 4.0
    const result = findFirstThoughtBoundary(segments, 2, 8, 4);
    expect(result.end_seconds).toBe(4.0);
    expect(result.text).toBe("No punctuation here still no ending");
  });

  it("returns fallback for empty segments", () => {
    const result = findFirstThoughtBoundary([], 2, 8, 4);
    expect(result.end_seconds).toBe(4);
    expect(result.text).toBe("");
  });

  it("handles exclamation mark boundary", () => {
    const segments = [
      seg(0, 1.5, "Oh my god"),
      seg(1.5, 3.0, "this is insane!"),
    ];
    const result = findFirstThoughtBoundary(segments, 2, 8, 4);
    expect(result.end_seconds).toBe(3.0);
    expect(result.text).toBe("Oh my god this is insane!");
  });
});

// ── extractScriptId ─────────────────────────────────────────────────────

describe("extractScriptId", () => {
  it("extracts script_id from standard asset ID", () => {
    expect(extractScriptId("dqfe-0012-v0001-fb-9x16")).toBe("0012");
  });

  it("extracts script_id from short ID", () => {
    expect(extractScriptId("dqfe-0036")).toBe("0036");
  });

  it("returns empty for single-segment ID", () => {
    expect(extractScriptId("standalone")).toBe("");
  });
});

// ── findSameOfferWinners ─────────────────────────────────────────────────

describe("findSameOfferWinners", () => {
  function mockReader(rows: string[][]): SheetsReader {
    return {
      getRows: vi.fn().mockResolvedValue(rows),
    };
  }

  it("returns same-funnel Winners only", async () => {
    const rows = [
      sssRow({ funnel: "dqfe", script_id: "0012", asset_id: "dqfe-0012-v0001", spend: "$5,000" }),
      sssRow({ funnel: "dqfe", script_id: "0015", asset_id: "dqfe-0015-v0001", spend: "$3,000" }),
      sssRow({ funnel: "ggfe", script_id: "0020", asset_id: "ggfe-0020-v0001", spend: "$8,000" }), // different funnel
    ];
    const reader = mockReader(rows);
    const result = await findSameOfferWinners("dqfe", "dqfe-0036-v0001", { sheetsReader: reader, spreadsheetId: "test" });
    expect(result).toHaveLength(2);
    expect(result.every(r => r.funnel === "dqfe")).toBe(true);
  });

  it("excludes target script_id", async () => {
    const rows = [
      sssRow({ funnel: "dqfe", script_id: "0036", asset_id: "dqfe-0036-v0002", spend: "$10,000" }), // same script as target
      sssRow({ funnel: "dqfe", script_id: "0012", asset_id: "dqfe-0012-v0001", spend: "$5,000" }),
    ];
    const reader = mockReader(rows);
    const result = await findSameOfferWinners("dqfe", "dqfe-0036-v0001", { sheetsReader: reader, spreadsheetId: "test" });
    expect(result).toHaveLength(1);
    expect(result[0].script_id).toBe("0012");
  });

  it("excludes image assets", async () => {
    const rows = [
      sssRow({ funnel: "dqfe", script_id: "0012", asset_id: "dqfe-0012-v0001", asset_type: "vd", spend: "$5,000" }),
      sssRow({ funnel: "dqfe", script_id: "0015", asset_id: "dqfe-0015-v0001", asset_type: "img", spend: "$3,000" }),
    ];
    const reader = mockReader(rows);
    const result = await findSameOfferWinners("dqfe", "dqfe-0036-v0001", { sheetsReader: reader, spreadsheetId: "test" });
    expect(result).toHaveLength(1);
    expect(result[0].script_id).toBe("0012");
  });

  it("sorts by spend descending", async () => {
    const rows = [
      sssRow({ funnel: "dqfe", script_id: "0012", asset_id: "dqfe-0012-v0001", spend: "$3,000" }),
      sssRow({ funnel: "dqfe", script_id: "0015", asset_id: "dqfe-0015-v0001", spend: "$8,000" }),
      sssRow({ funnel: "dqfe", script_id: "0020", asset_id: "dqfe-0020-v0001", spend: "$1,000" }),
    ];
    const reader = mockReader(rows);
    const result = await findSameOfferWinners("dqfe", "dqfe-0036-v0001", { sheetsReader: reader, spreadsheetId: "test" });
    expect(result[0].spend).toBe(8000);
    expect(result[1].spend).toBe(3000);
    expect(result[2].spend).toBe(1000);
  });

  it("excludes non-Winner rows", async () => {
    const rows = [
      sssRow({ funnel: "dqfe", script_id: "0012", asset_id: "dqfe-0012-v0001", classification: "Winner" }),
      sssRow({ funnel: "dqfe", script_id: "0015", asset_id: "dqfe-0015-v0001", classification: "Loser" }),
      sssRow({ funnel: "dqfe", script_id: "0020", asset_id: "dqfe-0020-v0001", classification: "Testing" }),
    ];
    const reader = mockReader(rows);
    const result = await findSameOfferWinners("dqfe", "dqfe-0036-v0001", { sheetsReader: reader, spreadsheetId: "test" });
    expect(result).toHaveLength(1);
    expect(result[0].script_id).toBe("0012");
  });
});

// ── selectHooks ──────────────────────────────────────────────────────────

describe("selectHooks", () => {
  function makeDeps(options: {
    sssRows: string[][];
    iconikResults?: Record<string, { id: string }[]>;
    transcribeStatus?: Record<string, string>;
    transcriptions?: Record<string, TranscriptSegment[]>;
  }): HookSelectorDeps {
    const sheetsReader: SheetsReader = {
      getRows: vi.fn().mockResolvedValue(options.sssRows),
    };

    const iconikResults = options.iconikResults ?? {};
    const transcribeStatus = options.transcribeStatus ?? {};
    const transcriptions = options.transcriptions ?? {};

    const iconikClient = {
      searchByName: vi.fn().mockImplementation(async (name: string) => {
        return iconikResults[name] ?? [];
      }),
      getTranscribeStatus: vi.fn().mockImplementation(async (uuid: string) => {
        const status = transcribeStatus[uuid] ?? "N/A";
        return { status };
      }),
      getTranscription: vi.fn().mockImplementation(async (uuid: string) => {
        const segments = transcriptions[uuid] ?? [];
        return { content: "", segments };
      }),
    } as unknown as IconikClient;

    return {
      iconikClient,
      sheetsReader,
      spreadsheetId: "test-spreadsheet",
    };
  }

  const baseInput: SelectHooksInput = {
    target_asset_id: "dqfe-0036-v0001",
    offer_prefix: "dqfe",
    target_variations: 3,
    min_hook_seconds: 2,
    max_hook_seconds: 8,
    fallback_hook_seconds: 4,
  };

  it("selects 3 diverse hooks from 5 winners", async () => {
    const sssRows = [
      sssRow({ funnel: "dqfe", script_id: "0012", asset_id: "dqfe-0012-v0001", spend: "$10,000", roas: "200%" }),
      sssRow({ funnel: "dqfe", script_id: "0015", asset_id: "dqfe-0015-v0001", spend: "$8,000", roas: "150%" }),
      sssRow({ funnel: "dqfe", script_id: "0018", asset_id: "dqfe-0018-v0001", spend: "$6,000", roas: "180%" }),
      sssRow({ funnel: "dqfe", script_id: "0020", asset_id: "dqfe-0020-v0001", spend: "$4,000", roas: "120%" }),
      sssRow({ funnel: "dqfe", script_id: "0025", asset_id: "dqfe-0025-v0001", spend: "$2,000", roas: "100%" }),
    ];

    const deps = makeDeps({
      sssRows,
      iconikResults: {
        "dqfe-0012-v0001": [{ id: "uuid-0012" }],
        "dqfe-0015-v0001": [{ id: "uuid-0015" }],
        "dqfe-0018-v0001": [{ id: "uuid-0018" }],
        "dqfe-0020-v0001": [{ id: "uuid-0020" }],
        "dqfe-0025-v0001": [{ id: "uuid-0025" }],
      },
      transcribeStatus: {
        "uuid-0012": "DONE",
        "uuid-0015": "DONE",
        "uuid-0018": "DONE",
        "uuid-0020": "DONE",
        "uuid-0025": "DONE",
      },
      transcriptions: {
        "uuid-0012": [seg(0, 1.5, "Hey golfers"), seg(1.5, 3.5, "check this out.")],
        "uuid-0015": [seg(0, 2.0, "Want to hit it"), seg(2.0, 4.0, "longer?")],
        "uuid-0018": [seg(0, 1.0, "This drill"), seg(1.0, 3.0, "changed my game!")],
      },
    });

    const result = await selectHooks(baseInput, deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.hooks).toHaveLength(3);
    // All from different scripts
    const scriptIds = result.data.hooks.map(h => extractScriptId(h.source_asset_id));
    expect(new Set(scriptIds).size).toBe(3);
  });

  it("enforces diversity — skips duplicate script_ids", async () => {
    const sssRows = [
      sssRow({ funnel: "dqfe", script_id: "0012", asset_id: "dqfe-0012-v0001", spend: "$10,000" }),
      sssRow({ funnel: "dqfe", script_id: "0012", asset_id: "dqfe-0012-v0002", spend: "$8,000" }), // same script
      sssRow({ funnel: "dqfe", script_id: "0015", asset_id: "dqfe-0015-v0001", spend: "$6,000" }),
      sssRow({ funnel: "dqfe", script_id: "0018", asset_id: "dqfe-0018-v0001", spend: "$4,000" }),
    ];

    const deps = makeDeps({
      sssRows,
      iconikResults: {
        "dqfe-0012-v0001": [{ id: "uuid-a" }],
        "dqfe-0015-v0001": [{ id: "uuid-b" }],
        "dqfe-0018-v0001": [{ id: "uuid-c" }],
      },
      transcribeStatus: {
        "uuid-a": "COMPLETED",
        "uuid-b": "COMPLETED",
        "uuid-c": "COMPLETED",
      },
      transcriptions: {
        "uuid-a": [seg(0, 3.0, "First hook here.")],
        "uuid-b": [seg(0, 2.5, "Second hook here.")],
        "uuid-c": [seg(0, 4.0, "Third hook here.")],
      },
    });

    const result = await selectHooks(baseInput, deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.hooks).toHaveLength(3);
    const scriptIds = result.data.hooks.map(h => extractScriptId(h.source_asset_id));
    expect(new Set(scriptIds).size).toBe(3);
  });

  it("fails when fewer than N hooks available", async () => {
    const sssRows = [
      sssRow({ funnel: "dqfe", script_id: "0012", asset_id: "dqfe-0012-v0001", spend: "$10,000" }),
    ];

    const deps = makeDeps({
      sssRows,
      iconikResults: { "dqfe-0012-v0001": [{ id: "uuid-a" }] },
      transcribeStatus: { "uuid-a": "COMPLETED" },
      transcriptions: { "uuid-a": [seg(0, 3.0, "Only one hook.")] },
    });

    const result = await selectHooks(baseInput, deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("Only found 1");
    expect(result.message).toContain("need 3");
  });

  it("fails when no same-offer winners exist", async () => {
    const sssRows = [
      sssRow({ funnel: "ggfe", script_id: "0012", asset_id: "ggfe-0012-v0001" }), // wrong funnel
    ];
    const deps = makeDeps({ sssRows });
    const result = await selectHooks(baseInput, deps);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("No same-offer Winners");
  });

  it("skips untranscribed winners gracefully", async () => {
    const sssRows = [
      sssRow({ funnel: "dqfe", script_id: "0012", asset_id: "dqfe-0012-v0001", spend: "$10,000" }),
      sssRow({ funnel: "dqfe", script_id: "0015", asset_id: "dqfe-0015-v0001", spend: "$8,000" }),
      sssRow({ funnel: "dqfe", script_id: "0018", asset_id: "dqfe-0018-v0001", spend: "$6,000" }),
      sssRow({ funnel: "dqfe", script_id: "0020", asset_id: "dqfe-0020-v0001", spend: "$4,000" }),
    ];

    const deps = makeDeps({
      sssRows,
      iconikResults: {
        "dqfe-0012-v0001": [{ id: "uuid-a" }],
        "dqfe-0015-v0001": [{ id: "uuid-b" }],
        "dqfe-0018-v0001": [{ id: "uuid-c" }],
        "dqfe-0020-v0001": [{ id: "uuid-d" }],
      },
      transcribeStatus: {
        "uuid-a": "COMPLETED",
        "uuid-b": "PENDING",     // not ready
        "uuid-c": "COMPLETED",
        "uuid-d": "COMPLETED",
      },
      transcriptions: {
        "uuid-a": [seg(0, 3.0, "First hook.")],
        "uuid-c": [seg(0, 2.5, "Third hook!")],
        "uuid-d": [seg(0, 4.0, "Fourth hook?")],
      },
    });

    const result = await selectHooks(baseInput, deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.hooks).toHaveLength(3);
    // Confirm the PENDING one (uuid-b / 0015) was skipped
    const ids = result.data.hooks.map(h => h.source_asset_id);
    expect(ids).not.toContain("dqfe-0015-v0001");
  });

  it("includes spend and roas in hook candidates", async () => {
    const sssRows = [
      sssRow({ funnel: "dqfe", script_id: "0012", asset_id: "dqfe-0012-v0001", spend: "$17,856", roas: "128%" }),
      sssRow({ funnel: "dqfe", script_id: "0015", asset_id: "dqfe-0015-v0001", spend: "$5,000", roas: "180%" }),
      sssRow({ funnel: "dqfe", script_id: "0018", asset_id: "dqfe-0018-v0001", spend: "$3,000", roas: "200%" }),
    ];

    const deps = makeDeps({
      sssRows,
      iconikResults: {
        "dqfe-0012-v0001": [{ id: "uuid-a" }],
        "dqfe-0015-v0001": [{ id: "uuid-b" }],
        "dqfe-0018-v0001": [{ id: "uuid-c" }],
      },
      transcribeStatus: {
        "uuid-a": "COMPLETED",
        "uuid-b": "COMPLETED",
        "uuid-c": "COMPLETED",
      },
      transcriptions: {
        "uuid-a": [seg(0, 3.0, "First hook.")],
        "uuid-b": [seg(0, 2.5, "Second hook!")],
        "uuid-c": [seg(0, 4.0, "Third hook?")],
      },
    });

    const result = await selectHooks(baseInput, deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.hooks[0].spend).toBe(17856);
    expect(result.data.hooks[0].roas).toBe(128);
  });

  it("generates meaningful rationale string", async () => {
    const sssRows = [
      sssRow({ funnel: "dqfe", script_id: "0012", asset_id: "dqfe-0012-v0001", spend: "$5,000" }),
      sssRow({ funnel: "dqfe", script_id: "0015", asset_id: "dqfe-0015-v0001", spend: "$3,000" }),
      sssRow({ funnel: "dqfe", script_id: "0018", asset_id: "dqfe-0018-v0001", spend: "$2,000" }),
    ];

    const deps = makeDeps({
      sssRows,
      iconikResults: {
        "dqfe-0012-v0001": [{ id: "uuid-a" }],
        "dqfe-0015-v0001": [{ id: "uuid-b" }],
        "dqfe-0018-v0001": [{ id: "uuid-c" }],
      },
      transcribeStatus: {
        "uuid-a": "COMPLETED",
        "uuid-b": "COMPLETED",
        "uuid-c": "COMPLETED",
      },
      transcriptions: {
        "uuid-a": [seg(0, 3.0, "Hook one.")],
        "uuid-b": [seg(0, 2.5, "Hook two!")],
        "uuid-c": [seg(0, 4.0, "Hook three?")],
      },
    });

    const result = await selectHooks(baseInput, deps);
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.rationale).toContain("dqfe");
    expect(result.data.rationale).toContain("Hook 1:");
    expect(result.data.rationale).toContain("Hook 2:");
    expect(result.data.rationale).toContain("Hook 3:");
  });
});
