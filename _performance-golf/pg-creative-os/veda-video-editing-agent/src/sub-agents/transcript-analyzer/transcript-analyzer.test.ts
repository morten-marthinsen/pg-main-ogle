import { describe, it, expect } from "vitest";
import {
  parseTimestamp,
  formatTimestamp,
  getTranscriptDuration,
  scoreSegmentPersuasiveness,
  extractKeyPhrase,
  identifyPersuasiveTheses,
  suggestRootAngles,
  selectBodySegments,
  buildCutPlan,
  identifyCutPoints,
  analyze,
} from "./index.js";
import type { TranscriptSegment } from "../../types/pipeline.js";

// ── Sample transcripts for testing ──────────────────────────────────────────

/** A 360s (6 minute) golf ad transcript with clear persuasive structure. */
const GOLF_TRANSCRIPT: TranscriptSegment[] = [
  { start_time: 0, end_time: 5, text: "Stop struggling with your driver right now" },
  { start_time: 5, end_time: 15, text: "I'm Gary McAllister and after 30 years of coaching I've finally discovered the secret" },
  { start_time: 15, end_time: 30, text: "Most golfers are making the same simple mistake with their swing plane" },
  { start_time: 30, end_time: 50, text: "I call it the Vertical Circle and it's the proven method that changed everything for my students" },
  { start_time: 50, end_time: 75, text: "You see there are three types of swing circles and only one gives you that effortless power" },
  { start_time: 75, end_time: 100, text: "The Incline Circle is what most amateurs use and it causes that frustrating slice every time" },
  { start_time: 100, end_time: 130, text: "But when you switch to the Vertical Circle your club naturally finds the perfect path" },
  { start_time: 130, end_time: 160, text: "My student Tom was struggling for years and added 40 yards in just 2 weeks" },
  { start_time: 160, end_time: 190, text: "It's so simple you'll wonder why nobody told you this before" },
  { start_time: 190, end_time: 220, text: "The research shows that 87 percent of amateur golfers have the wrong swing circle" },
  { start_time: 220, end_time: 250, text: "But here's the best part this works regardless of your age or fitness level" },
  { start_time: 250, end_time: 280, text: "Imagine finally hitting it straight and long every single time on the course" },
  { start_time: 280, end_time: 310, text: "I put together a free video showing exactly how to make the switch today" },
  { start_time: 310, end_time: 340, text: "Thousands of golfers have already transformed their game with this one change" },
  { start_time: 340, end_time: 355, text: "Click the link below to watch the free training right now" },
  { start_time: 355, end_time: 360, text: "Take the one minute quiz now" },
];

/** A short, low-persuasion transcript. */
const BLAND_TRANSCRIPT: TranscriptSegment[] = [
  { start_time: 0, end_time: 10, text: "Hello welcome to this video" },
  { start_time: 10, end_time: 20, text: "Today we are going to talk about golf" },
  { start_time: 20, end_time: 30, text: "Golf is a sport that many people enjoy" },
];

// ── parseTimestamp ───────────────────────────────────────────────────────────

describe("parseTimestamp", () => {
  it("parses M:SS format", () => {
    expect(parseTimestamp("1:30")).toBe(90);
  });

  it("parses 0:SS format", () => {
    expect(parseTimestamp("0:45")).toBe(45);
  });

  it("parses H:MM:SS format", () => {
    expect(parseTimestamp("1:05:30")).toBe(3930);
  });

  it("parses 0:00", () => {
    expect(parseTimestamp("0:00")).toBe(0);
  });

  it("parses 12:05", () => {
    expect(parseTimestamp("12:05")).toBe(725);
  });
});

// ── formatTimestamp ─────────────────────────────────────────────────────────

describe("formatTimestamp", () => {
  it("formats seconds < 60", () => {
    expect(formatTimestamp(45)).toBe("0:45");
  });

  it("formats exactly 60 seconds", () => {
    expect(formatTimestamp(60)).toBe("1:00");
  });

  it("formats minutes + seconds", () => {
    expect(formatTimestamp(90)).toBe("1:30");
  });

  it("formats hours", () => {
    expect(formatTimestamp(3930)).toBe("1:05:30");
  });

  it("handles negative values", () => {
    expect(formatTimestamp(-5)).toBe("0:00");
  });

  it("formats zero", () => {
    expect(formatTimestamp(0)).toBe("0:00");
  });
});

// ── getTranscriptDuration ───────────────────────────────────────────────────

describe("getTranscriptDuration", () => {
  it("returns max end_time from segments", () => {
    expect(getTranscriptDuration(GOLF_TRANSCRIPT)).toBe(360);
  });

  it("returns 0 for empty segments", () => {
    expect(getTranscriptDuration([])).toBe(0);
  });
});

// ── scoreSegmentPersuasiveness ──────────────────────────────────────────────

describe("scoreSegmentPersuasiveness", () => {
  it("scores high for urgency + benefit language", () => {
    const score = scoreSegmentPersuasiveness("Stop struggling with your driver right now");
    expect(score).toBeGreaterThan(5);
  });

  it("scores high for transformation language with specifics", () => {
    const score = scoreSegmentPersuasiveness("My student added 40 yards in just 2 weeks and finally transformed his game");
    expect(score).toBeGreaterThan(10);
  });

  it("scores low for bland language", () => {
    const score = scoreSegmentPersuasiveness("Hello welcome to this video");
    expect(score).toBeLessThan(3);
  });

  it("boosts score for numbers (specificity)", () => {
    const withNumbers = scoreSegmentPersuasiveness("87 percent of golfers");
    const withoutNumbers = scoreSegmentPersuasiveness("most golfers");
    expect(withNumbers).toBeGreaterThan(withoutNumbers);
  });

  it("scores authority language", () => {
    const score = scoreSegmentPersuasiveness("After 30 years of coaching and research");
    expect(score).toBeGreaterThan(5);
  });
});

// ── extractKeyPhrase ────────────────────────────────────────────────────────

describe("extractKeyPhrase", () => {
  it("returns full text for short segments", () => {
    expect(extractKeyPhrase("Stop now")).toBe("Stop now");
  });

  it("extracts most persuasive phrase from longer text", () => {
    const phrase = extractKeyPhrase("Hello there I finally discovered the secret to golf");
    // Should pick something around "finally discovered the secret"
    expect(phrase.split(/\s+/).length).toBeLessThanOrEqual(4);
  });
});

// ── identifyPersuasiveTheses ────────────────────────────────────────────────

describe("identifyPersuasiveTheses", () => {
  it("returns up to 3 suggestions from golf transcript", () => {
    const suggestions = identifyPersuasiveTheses(GOLF_TRANSCRIPT);
    expect(suggestions.length).toBeLessThanOrEqual(3);
    expect(suggestions.length).toBeGreaterThan(0);
  });

  it("each suggestion has required fields", () => {
    const suggestions = identifyPersuasiveTheses(GOLF_TRANSCRIPT);
    for (const s of suggestions) {
      expect(s.name).toBeTruthy();
      expect(s.name.split(/\s+/).length).toBeLessThanOrEqual(4);
      expect(["high", "medium", "low"]).toContain(s.confidence);
      expect(s.transcript_evidence).toBeTruthy();
      expect(s.reasoning).toBeTruthy();
    }
  });

  it("capitalizes suggestion names", () => {
    const suggestions = identifyPersuasiveTheses(GOLF_TRANSCRIPT);
    for (const s of suggestions) {
      // First letter of first word should be uppercase
      expect(s.name[0]).toBe(s.name[0].toUpperCase());
    }
  });

  it("returns empty array for empty segments", () => {
    expect(identifyPersuasiveTheses([])).toEqual([]);
  });

  it("returns low-confidence for bland transcript", () => {
    const suggestions = identifyPersuasiveTheses(BLAND_TRANSCRIPT);
    if (suggestions.length > 0) {
      // All should be low or medium confidence
      for (const s of suggestions) {
        expect(["low", "medium"]).toContain(s.confidence);
      }
    }
  });
});

// ── suggestRootAngles ───────────────────────────────────────────────────────

describe("suggestRootAngles", () => {
  it("returns SUCCESS with 3 suggestions for rich transcript", () => {
    const result = suggestRootAngles({
      mode: "root_angle_suggestion",
      transcript_segments: GOLF_TRANSCRIPT,
      script_id: "0003",
    });
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.suggestions.length).toBe(3);
  });

  it("rejects empty transcript", () => {
    const result = suggestRootAngles({
      mode: "root_angle_suggestion",
      transcript_segments: [],
      script_id: "0003",
    });
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.error_category).toBe("VALIDATION_ERROR");
    expect(result.message).toContain("No transcript");
  });

  it("includes transcript evidence in suggestions", () => {
    const result = suggestRootAngles({
      mode: "root_angle_suggestion",
      transcript_segments: GOLF_TRANSCRIPT,
      script_id: "0003",
    });
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    for (const s of result.data.suggestions) {
      expect(s.transcript_evidence.length).toBeGreaterThan(0);
    }
  });
});

// ── selectBodySegments ──────────────────────────────────────────────────────

describe("selectBodySegments", () => {
  // Body pool: segments between hook (0-5s) and CTA (355-360s)
  const bodyPool = GOLF_TRANSCRIPT.filter(
    (s) => s.start_time >= 5 && s.end_time <= 355,
  );

  it("selects segments fitting target body duration", () => {
    const segments = selectBodySegments(bodyPool, 50);
    const totalDuration = segments.reduce(
      (sum, s) => sum + (s.end_time - s.start_time),
      0,
    );
    // Should be close to 50s (within tolerance)
    expect(totalDuration).toBeLessThanOrEqual(52);
    expect(totalDuration).toBeGreaterThan(0);
  });

  it("returns segments in chronological order", () => {
    const segments = selectBodySegments(bodyPool, 100);
    for (let i = 1; i < segments.length; i++) {
      expect(segments[i].start_time).toBeGreaterThanOrEqual(
        segments[i - 1].start_time,
      );
    }
  });

  it("marks all segments as 'body' type", () => {
    const segments = selectBodySegments(bodyPool, 50);
    for (const s of segments) {
      expect(s.type).toBe("body");
    }
  });

  it("returns empty for 0 target duration", () => {
    expect(selectBodySegments(bodyPool, 0)).toEqual([]);
  });

  it("returns empty for empty pool", () => {
    expect(selectBodySegments([], 50)).toEqual([]);
  });

  it("prefers higher-scoring segments", () => {
    // Create two segments: one boring, one persuasive, both same length
    const pool: TranscriptSegment[] = [
      { start_time: 10, end_time: 20, text: "Hello this is just some filler content" },
      { start_time: 30, end_time: 40, text: "I finally discovered the proven secret that transformed everything" },
    ];
    // Only room for one 10s segment
    const segments = selectBodySegments(pool, 10);
    expect(segments).toHaveLength(1);
    expect(segments[0].transcript_text).toContain("finally discovered");
  });
});

// ── buildCutPlan ────────────────────────────────────────────────────────────

describe("buildCutPlan", () => {
  it("builds a 60s cut plan from 360s source", () => {
    const plan = buildCutPlan(GOLF_TRANSCRIPT, 60, 5, 5, 360);
    expect(plan.target_duration).toBe(60);
    expect(plan.segments[0].type).toBe("hook");
    expect(plan.segments[plan.segments.length - 1].type).toBe("cta");
    expect(plan.root_angle_preserved).toBe(true);
  });

  it("preserves hook as first 5 seconds", () => {
    const plan = buildCutPlan(GOLF_TRANSCRIPT, 60, 5, 5, 360);
    const hook = plan.segments[0];
    expect(hook.start_time).toBe(0);
    expect(hook.end_time).toBe(5);
    expect(hook.type).toBe("hook");
  });

  it("preserves CTA at end of source", () => {
    const plan = buildCutPlan(GOLF_TRANSCRIPT, 60, 5, 5, 360);
    const cta = plan.segments[plan.segments.length - 1];
    expect(cta.start_time).toBe(355);
    expect(cta.end_time).toBe(360);
    expect(cta.type).toBe("cta");
  });

  it("flags when hook > 50% of target duration", () => {
    // 10s hook in a 15s target = 66.7%
    const plan = buildCutPlan(GOLF_TRANSCRIPT, 15, 10, 5, 360);
    expect(plan.duration_flag).toBe(true);
    expect(plan.flag_reason).toContain("67");
  });

  it("does not flag when hook < 50% of target", () => {
    const plan = buildCutPlan(GOLF_TRANSCRIPT, 60, 5, 5, 360);
    expect(plan.duration_flag).toBe(false);
    expect(plan.flag_reason).toBeUndefined();
  });

  it("actual duration accounts for hook + body + cta", () => {
    const plan = buildCutPlan(GOLF_TRANSCRIPT, 60, 5, 5, 360);
    const bodyDuration = plan.segments
      .filter((s) => s.type === "body")
      .reduce((sum, s) => sum + (s.end_time - s.start_time), 0);
    expect(plan.actual_duration).toBe(5 + bodyDuration + 5);
  });
});

// ── identifyCutPoints ───────────────────────────────────────────────────────

describe("identifyCutPoints", () => {
  it("returns cut plans for multiple target durations", () => {
    const result = identifyCutPoints({
      mode: "cut_point_identification",
      transcript_segments: GOLF_TRANSCRIPT,
      root_angle_name: "Vertical Circle Secret",
      target_durations: [30, 60, 180],
      hook_duration_seconds: 5,
      cta_duration_seconds: 5,
      source_total_duration: 360,
    });
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.cut_plans).toHaveLength(3);
    expect(result.data.cut_plans[0].target_duration).toBe(30);
    expect(result.data.cut_plans[1].target_duration).toBe(60);
    expect(result.data.cut_plans[2].target_duration).toBe(180);
  });

  it("rejects empty transcript", () => {
    const result = identifyCutPoints({
      mode: "cut_point_identification",
      transcript_segments: [],
      root_angle_name: "Test",
      target_durations: [60],
      hook_duration_seconds: 5,
      cta_duration_seconds: 5,
      source_total_duration: 360,
    });
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("No transcript");
  });

  it("rejects empty target durations", () => {
    const result = identifyCutPoints({
      mode: "cut_point_identification",
      transcript_segments: GOLF_TRANSCRIPT,
      root_angle_name: "Test",
      target_durations: [],
      hook_duration_seconds: 5,
      cta_duration_seconds: 5,
      source_total_duration: 360,
    });
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("No target durations");
  });

  it("rejects target duration >= source duration", () => {
    const result = identifyCutPoints({
      mode: "cut_point_identification",
      transcript_segments: GOLF_TRANSCRIPT,
      root_angle_name: "Test",
      target_durations: [400],
      hook_duration_seconds: 5,
      cta_duration_seconds: 5,
      source_total_duration: 360,
    });
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("cannot cut down");
  });

  it("rejects invalid source_total_duration", () => {
    const result = identifyCutPoints({
      mode: "cut_point_identification",
      transcript_segments: GOLF_TRANSCRIPT,
      root_angle_name: "Test",
      target_durations: [60],
      hook_duration_seconds: 5,
      cta_duration_seconds: 5,
      source_total_duration: 0,
    });
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("source_total_duration");
  });
});

// ── analyze (main entry point) ──────────────────────────────────────────────

describe("analyze", () => {
  it("routes to root_angle_suggestion mode", () => {
    const result = analyze({
      mode: "root_angle_suggestion",
      transcript_segments: GOLF_TRANSCRIPT,
      script_id: "0003",
    });
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.suggestions).toBeDefined();
  });

  it("routes to cut_point_identification mode", () => {
    const result = analyze({
      mode: "cut_point_identification",
      transcript_segments: GOLF_TRANSCRIPT,
      root_angle_name: "Vertical Circle Secret",
      target_durations: [60],
      hook_duration_seconds: 5,
      cta_duration_seconds: 5,
      source_total_duration: 360,
    });
    expect(result.status).toBe("SUCCESS");
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");
    expect(result.data.cut_plans).toBeDefined();
  });

  it("rejects unknown mode", () => {
    const result = analyze({ mode: "unknown" as any, transcript_segments: [] } as any);
    expect(result.status).toBe("FAILED");
    if (result.status !== "FAILED") throw new Error("Expected FAILED");
    expect(result.message).toContain("Unknown mode");
  });
});

// ── Integration: cut plan quality checks ────────────────────────────────────

describe("integration", () => {
  it("60s cut plan preserves isolation principle (hook identical)", () => {
    const result = identifyCutPoints({
      mode: "cut_point_identification",
      transcript_segments: GOLF_TRANSCRIPT,
      root_angle_name: "Vertical Circle Secret",
      target_durations: [60],
      hook_duration_seconds: 5,
      cta_duration_seconds: 5,
      source_total_duration: 360,
    });
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");

    const plan = result.data.cut_plans[0];
    // Hook must start at 0 and end at hook_duration
    expect(plan.segments[0].start_time).toBe(0);
    expect(plan.segments[0].end_time).toBe(5);
    expect(plan.segments[0].type).toBe("hook");
  });

  it("body segments come from between hook and CTA (not from hook or CTA range)", () => {
    const result = identifyCutPoints({
      mode: "cut_point_identification",
      transcript_segments: GOLF_TRANSCRIPT,
      root_angle_name: "Test",
      target_durations: [60],
      hook_duration_seconds: 5,
      cta_duration_seconds: 5,
      source_total_duration: 360,
    });
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");

    const plan = result.data.cut_plans[0];
    const bodySegments = plan.segments.filter((s) => s.type === "body");
    for (const s of bodySegments) {
      expect(s.start_time).toBeGreaterThanOrEqual(5);   // After hook
      expect(s.end_time).toBeLessThanOrEqual(355);       // Before CTA
    }
  });

  it("multiple target durations produce progressively shorter actual durations", () => {
    const result = identifyCutPoints({
      mode: "cut_point_identification",
      transcript_segments: GOLF_TRANSCRIPT,
      root_angle_name: "Test",
      target_durations: [180, 60, 30],
      hook_duration_seconds: 5,
      cta_duration_seconds: 5,
      source_total_duration: 360,
    });
    if (result.status !== "SUCCESS") throw new Error("Expected SUCCESS");

    const [plan180, plan60, plan30] = result.data.cut_plans;
    expect(plan180.actual_duration).toBeGreaterThan(plan60.actual_duration);
    expect(plan60.actual_duration).toBeGreaterThan(plan30.actual_duration);
  });
});
