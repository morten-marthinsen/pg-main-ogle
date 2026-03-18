/**
 * transcript_analyzer — Veda's language intelligence specialist.
 *
 * Reads transcripts like a copywriter reads ad copy: looking for persuasive
 * theses, emotional hooks, key phrases that sell. Serves two masters:
 *
 * ROOT ANGLE SUGGESTION (Step 2):
 *   Analyzes transcripts to identify distinct persuasive theses and suggest
 *   Root Angle Names grounded in the speaker's actual words. Never invents
 *   language — only uses what's in the transcript.
 *
 * CUT POINT IDENTIFICATION (Step 5):
 *   Identifies optimal cut points for duration expansions. Duration expansions
 *   are REASSEMBLIES, not linear trims. The opening hook stays identical
 *   (isolation principle). Best segments can come from ANYWHERE in the source.
 *
 * All suggestions are grounded in transcript evidence with exact quotes.
 */

import type {
  TranscriptSegment,
  RootAngleSuggestionInput,
  RootAngleSuggestionOutput,
  RootAngleSuggestion,
  CutPointInput,
  CutPointOutput,
  CutPlan,
  CutSegment,
} from "../../types/pipeline.js";
import type { SubAgentResult } from "../../types/sub-agent.js";

// ── Utilities ───────────────────────────────────────────────────────────────

/**
 * Parse a timestamp string like "0:45", "1:30", "12:05" into seconds.
 */
export function parseTimestamp(ts: string): number {
  const parts = ts.split(":").map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return NaN;
}

/**
 * Format seconds into "M:SS" or "H:MM:SS" string.
 */
export function formatTimestamp(seconds: number): string {
  if (seconds < 0) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Calculate the total duration of a transcript from its segments.
 */
export function getTranscriptDuration(segments: TranscriptSegment[]): number {
  if (segments.length === 0) return 0;
  return Math.max(...segments.map((s) => s.end_time));
}

/**
 * Score a segment for "persuasive density" — how much selling language it has.
 * Uses keyword matching as a heuristic. Higher = more persuasive.
 *
 * Categories:
 *   - Urgency/action words: "now", "today", "stop", "start", "try", "discover"
 *   - Benefit language: "secret", "proven", "guaranteed", "simple", "easy", "free"
 *   - Pain/problem language: "struggling", "frustrated", "tired", "pain", "problem"
 *   - Transformation language: "finally", "changed", "never again", "imagine", "transformed"
 *   - Authority language: "years", "expert", "research", "study", "coach", "professional"
 *   - Specificity (numbers increase credibility)
 */
export function scoreSegmentPersuasiveness(text: string): number {
  const lower = text.toLowerCase();
  let score = 0;

  const urgencyWords = ["now", "today", "stop", "start", "try", "discover", "don't wait", "right now", "immediately"];
  const benefitWords = ["secret", "proven", "guaranteed", "simple", "easy", "free", "powerful", "amazing", "incredible", "works"];
  const painWords = ["struggling", "frustrated", "tired", "pain", "problem", "stuck", "can't", "won't", "failing", "worse"];
  const transformWords = ["finally", "changed", "never again", "imagine", "transformed", "breakthrough", "different", "results"];
  const authorityWords = ["years", "expert", "research", "study", "coach", "professional", "science", "data", "tested"];

  for (const w of urgencyWords) if (lower.includes(w)) score += 3;
  for (const w of benefitWords) if (lower.includes(w)) score += 3;
  for (const w of painWords) if (lower.includes(w)) score += 2;
  for (const w of transformWords) if (lower.includes(w)) score += 4;
  for (const w of authorityWords) if (lower.includes(w)) score += 2;

  // Numbers add credibility/specificity
  const numberMatches = lower.match(/\d+/g);
  if (numberMatches) score += numberMatches.length * 2;

  // Longer text with substance scores higher (per-word normalization)
  const wordCount = text.split(/\s+/).length;
  if (wordCount > 0) {
    // Density bonus: score per 10 words, capped
    score += Math.min(wordCount / 5, 3);
  }

  return score;
}

/**
 * Extract the most persuasive phrase from a segment (up to ~4 words).
 * Looks for the highest-scoring sub-phrase.
 */
export function extractKeyPhrase(text: string): string {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= 4) return text.trim();

  let bestPhrase = words.slice(0, 4).join(" ");
  let bestScore = -1;

  // Slide a 3-4 word window across the text
  for (let len = 3; len <= 4; len++) {
    for (let i = 0; i <= words.length - len; i++) {
      const phrase = words.slice(i, i + len).join(" ");
      const score = scoreSegmentPersuasiveness(phrase);
      if (score > bestScore) {
        bestScore = score;
        bestPhrase = phrase;
      }
    }
  }

  return bestPhrase;
}

/**
 * Identify distinct persuasive theses in the transcript.
 * Groups segments by theme and returns top 3 with evidence.
 */
export function identifyPersuasiveTheses(
  segments: TranscriptSegment[],
): RootAngleSuggestion[] {
  if (segments.length === 0) return [];

  // Score each segment
  const scored = segments.map((seg) => ({
    segment: seg,
    score: scoreSegmentPersuasiveness(seg.text),
    keyPhrase: extractKeyPhrase(seg.text),
  }));

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Take top segments and deduplicate by key phrase similarity
  const suggestions: RootAngleSuggestion[] = [];
  const usedPhrases = new Set<string>();

  for (const item of scored) {
    if (suggestions.length >= 3) break;

    // Simple dedup: skip if key phrase is too similar to an existing one
    const phraseKey = item.keyPhrase.toLowerCase().replace(/[^a-z0-9\s]/g, "");
    const isDuplicate = Array.from(usedPhrases).some((used) => {
      // Check word overlap
      const usedWords = new Set(used.split(/\s+/));
      const currentWords = phraseKey.split(/\s+/);
      const overlap = currentWords.filter((w) => usedWords.has(w)).length;
      return overlap >= 2;
    });

    if (isDuplicate) continue;

    usedPhrases.add(phraseKey);

    // Truncate key phrase to 4 words max for the name
    const nameWords = item.keyPhrase.split(/\s+/).slice(0, 4);
    // Capitalize first letter of each word
    const name = nameWords
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

    // Determine confidence based on score
    let confidence: "high" | "medium" | "low" = "low";
    if (item.score >= 10) confidence = "high";
    else if (item.score >= 5) confidence = "medium";

    // Extract a short evidence quote (first ~15 words of the segment)
    const evidenceWords = item.segment.text.split(/\s+/).slice(0, 15);
    const evidence =
      evidenceWords.length < item.segment.text.split(/\s+/).length
        ? evidenceWords.join(" ") + "..."
        : item.segment.text;

    suggestions.push({
      name,
      confidence,
      transcript_evidence: evidence,
      reasoning: `Segment at ${formatTimestamp(item.segment.start_time)}-${formatTimestamp(item.segment.end_time)} scores ${item.score.toFixed(0)} for persuasive density. Key theme: ${item.keyPhrase}.`,
    });
  }

  return suggestions;
}

// ── Root Angle Suggestion Mode ──────────────────────────────────────────────

/**
 * Analyze transcript for persuasive theses and suggest Root Angle Names.
 * Returns 3 ranked suggestions grounded in transcript language.
 */
export function suggestRootAngles(
  input: RootAngleSuggestionInput,
): SubAgentResult<RootAngleSuggestionOutput> {
  if (!input.transcript_segments || input.transcript_segments.length === 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "No transcript segments provided",
      recovery_action: "halt",
      context: { step: "transcript_analyzer.root_angle" },
    };
  }

  const suggestions = identifyPersuasiveTheses(input.transcript_segments);

  if (suggestions.length === 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "warning",
      message: "Could not identify any persuasive theses in transcript",
      recovery_action: "halt",
      context: { step: "transcript_analyzer.root_angle" },
    };
  }

  return {
    status: "SUCCESS",
    data: { suggestions },
  };
}

// ── Cut Point Identification Mode ───────────────────────────────────────────

/**
 * Select the best body segments for a target duration.
 *
 * Segments are ranked by persuasive score and selected greedily until
 * the target body duration is filled. Prefers higher-scoring segments.
 * Segments are returned in chronological order (original timeline position).
 */
export function selectBodySegments(
  availableSegments: TranscriptSegment[],
  targetBodyDuration: number,
): CutSegment[] {
  if (targetBodyDuration <= 0 || availableSegments.length === 0) return [];

  // Score and sort by persuasive density
  const scored = availableSegments.map((seg) => ({
    segment: seg,
    score: scoreSegmentPersuasiveness(seg.text),
    duration: seg.end_time - seg.start_time,
  }));
  scored.sort((a, b) => b.score - a.score);

  // Greedily select segments until we fill the target duration
  const selected: typeof scored = [];
  let remainingDuration = targetBodyDuration;

  for (const item of scored) {
    if (remainingDuration <= 0) break;

    if (item.duration <= remainingDuration + 2) {
      // Allow ±2s tolerance
      selected.push(item);
      remainingDuration -= item.duration;
    }
  }

  // Sort selected by original timeline position (chronological order)
  selected.sort((a, b) => a.segment.start_time - b.segment.start_time);

  return selected.map((item) => ({
    start_time: item.segment.start_time,
    end_time: item.segment.end_time,
    type: "body" as const,
    transcript_text: item.segment.text,
  }));
}

/**
 * Build a cut plan for one target duration.
 * Structure: [hook (preserved)] + [best body segments] + [cta]
 */
export function buildCutPlan(
  segments: TranscriptSegment[],
  targetDuration: number,
  hookDuration: number,
  ctaDuration: number,
  sourceTotalDuration: number,
): CutPlan {
  const targetBodyDuration = targetDuration - hookDuration - ctaDuration;

  // Hook: first hookDuration seconds (preserved per isolation principle)
  const hookSegment: CutSegment = {
    start_time: 0,
    end_time: hookDuration,
    type: "hook",
    transcript_text: segments
      .filter((s) => s.start_time < hookDuration)
      .map((s) => s.text)
      .join(" "),
  };

  // CTA: last ctaDuration seconds of source
  const ctaStart = sourceTotalDuration - ctaDuration;
  const ctaSegment: CutSegment = {
    start_time: ctaStart,
    end_time: sourceTotalDuration,
    type: "cta",
    transcript_text: segments
      .filter((s) => s.start_time >= ctaStart)
      .map((s) => s.text)
      .join(" "),
  };

  // Body: segments between hook and CTA, ranked by persuasiveness
  const bodyPool = segments.filter(
    (s) => s.start_time >= hookDuration && s.end_time <= ctaStart,
  );

  const bodySegments = selectBodySegments(bodyPool, targetBodyDuration);

  const allSegments = [hookSegment, ...bodySegments, ctaSegment];
  const actualDuration =
    hookDuration +
    bodySegments.reduce((sum, s) => sum + (s.end_time - s.start_time), 0) +
    ctaDuration;

  // Duration flag: hook > 50% of target
  const hookRatio = hookDuration / targetDuration;
  const durationFlag = hookRatio > 0.5;

  return {
    target_duration: targetDuration,
    segments: allSegments,
    actual_duration: actualDuration,
    root_angle_preserved: true, // Hook preserved = root angle preserved
    duration_flag: durationFlag,
    flag_reason: durationFlag
      ? `Hook is ${(hookRatio * 100).toFixed(0)}% of target duration (${hookDuration}s of ${targetDuration}s)`
      : undefined,
  };
}

/**
 * Identify optimal cut points for duration expansions.
 * Creates cut plans for each target duration.
 */
export function identifyCutPoints(
  input: CutPointInput,
): SubAgentResult<CutPointOutput> {
  if (!input.transcript_segments || input.transcript_segments.length === 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "No transcript segments provided",
      recovery_action: "halt",
      context: { step: "transcript_analyzer.cut_points" },
    };
  }

  if (!input.target_durations || input.target_durations.length === 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "No target durations provided",
      recovery_action: "halt",
      context: { step: "transcript_analyzer.cut_points" },
    };
  }

  if (input.source_total_duration <= 0) {
    return {
      status: "FAILED",
      error_category: "VALIDATION_ERROR",
      severity: "error",
      message: "source_total_duration must be > 0",
      recovery_action: "halt",
      context: { step: "transcript_analyzer.cut_points" },
    };
  }

  // Validate: target durations must be shorter than source
  for (const target of input.target_durations) {
    if (target >= input.source_total_duration) {
      return {
        status: "FAILED",
        error_category: "VALIDATION_ERROR",
        severity: "warning",
        message: `Target duration ${target}s >= source duration ${input.source_total_duration}s — cannot cut down`,
        recovery_action: "halt",
        context: { step: "transcript_analyzer.cut_points" },
      };
    }
  }

  const cutPlans: CutPlan[] = input.target_durations.map((target) =>
    buildCutPlan(
      input.transcript_segments,
      target,
      input.hook_duration_seconds,
      input.cta_duration_seconds,
      input.source_total_duration,
    ),
  );

  return {
    status: "SUCCESS",
    data: { cut_plans: cutPlans },
  };
}

// ── Main Entry Point ────────────────────────────────────────────────────────

/**
 * Main transcript_analyzer entry point.
 * Routes to root angle suggestion or cut point identification based on mode.
 */
export function analyze(
  input: RootAngleSuggestionInput | CutPointInput,
): SubAgentResult<any> {
  if (input.mode === "root_angle_suggestion") {
    return suggestRootAngles(input);
  }
  if (input.mode === "cut_point_identification") {
    return identifyCutPoints(input);
  }
  return {
    status: "FAILED",
    error_category: "VALIDATION_ERROR",
    severity: "error",
    message: `Unknown mode: ${(input as any).mode}`,
    recovery_action: "halt",
    context: { step: "transcript_analyzer" },
  };
}
