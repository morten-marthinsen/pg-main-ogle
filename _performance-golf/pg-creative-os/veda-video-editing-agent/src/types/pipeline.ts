/**
 * Pipeline state types for Veda's execution pipeline.
 */

export type EditMethod = "assembly" | "ai_enhanced" | "hybrid";

/** The 12 intake fields from the Tess Connector. */
export interface IntakeData {
  source_asset_id: string;
  expansion_type: string;
  root_angle_name: string;
  target_variations: number;
  platform: string;
  dimensions: string;
  country_code: string;
  talent_code: string;
  asset_type: string;
  edit_method: EditMethod;
  directing_person: string;
  special_instructions: string | null;
}

/** All 15 named positions of an Asset ID. */
export interface AssetIdPositions {
  funnel: string;               // Position 1
  script_id: string;            // Position 2
  variation_id: string;         // Position 3
  platform: string;             // Position 4
  dimensions: string;           // Position 5
  length_tier: string;          // Position 6
  ad_category: string;          // Position 7
  expansion_type: string;       // Position 8
  asset_type: string;           // Position 9
  talent_code: string;          // Position 10
  editor_initials: string;      // Position 11
  copywriter_initials: string;  // Position 12
  country_code: string;         // Position 13
  creation_date: string;        // Position 14
  promo_name?: string;          // Position 15 (optional)
}

/** A fully generated and validated Asset ID. */
export interface GeneratedAssetId {
  full_id: string;
  positions: AssetIdPositions;
  validation_status: "PASSED" | "FAILED";
  validation_errors: string[];
}

/** Input contract for the naming_generator sub-agent. */
export interface NamingGeneratorInput {
  funnel: string;
  script_id: string;
  platform: string;
  dimensions: string;
  length_tier: string;
  ad_category: string;
  expansion_type: string;
  asset_type: string;
  talent_code: string;
  copywriter_initials: string;
  country_code: string;
  reserved_variation_numbers: string[];
  creation_date?: string;   // defaults to today YYYYMMDD
  promo_name?: string;      // optional Position 15
}

/** Output contract for the naming_generator sub-agent. */
export interface NamingGeneratorOutput {
  asset_ids: GeneratedAssetId[];
}

// ── Metadata Manager Types ──────────────────────────────────────────────────

/** Input contract for the metadata_manager sub-agent. */
export interface MetadataManagerInput {
  /** Generated asset IDs with parsed positions (from naming_generator). */
  asset_ids: GeneratedAssetId[];
  /** Iconik asset UUIDs (from asset_uploader), parallel to asset_ids. */
  iconik_asset_uuids: string[];
  /** Iconik metadata view UUID. */
  metadata_view_id: string;
}

/** Result for a single asset's metadata application. */
export interface MetadataApplied {
  iconik_uuid: string;
  asset_id: string;
  fields_applied: number;
  verified: boolean;
}

/** Output contract for the metadata_manager sub-agent. */
export interface MetadataManagerOutput {
  metadata_applied: MetadataApplied[];
}

// ── Tess Connector Types ────────────────────────────────────────────────────

/**
 * Raw intake from Tess recommendations or manual human input.
 * Fields marked optional are auto-inherited from the source asset if not provided.
 */
export interface RawIntake {
  source_asset_id: string;
  expansion_type: string;
  root_angle_name: string;
  target_variations: number;
  edit_method: EditMethod;
  directing_person: string;           // 2-4 letter code → copywriter_initials (Position 12)
  special_instructions: string | null;

  // Optional overrides — if not provided, auto-inherited from source asset
  platform?: string;
  dimensions?: string;
  length_tier?: string;
  country_code?: string;
  talent_code?: string;
  asset_type?: string;
  ad_category?: string;               // if not provided, derived from expansion_type
  promo_name?: string;
}

/**
 * Resolved intake — all fields filled, validated, ready for downstream sub-agents.
 * Produced by the tess_connector after parsing source + auto-inheriting + validating.
 */
export interface ResolvedIntake {
  // From parsed source asset ID
  source_asset_id: string;            // original full source asset ID string
  funnel: string;
  script_id: string;
  source_positions: AssetIdPositions;

  // Resolved fields (inherited from source or overridden by intake)
  platform: string;
  dimensions: string;
  length_tier: string;
  ad_category: string;
  expansion_type: string;
  asset_type: string;
  talent_code: string;
  country_code: string;

  // From intake directly
  root_angle_name: string;
  target_variations: number;
  edit_method: EditMethod;
  directing_person: string;
  special_instructions: string | null;
  promo_name?: string;
}

// ── Pipeline State Types ────────────────────────────────────────────────────

export type PipelineStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "failed"
  | "awaiting_human";

export type StepStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "failed"
  | "skipped"
  | "awaiting_human";

/** The 10 pipeline steps from VEDA-MASTER-AGENT.md Section 2.4. */
export type PipelineStepName =
  | "receive_direction"   // Step 1
  | "validate"            // Step 2
  | "confirm_reserve"     // Step 3
  | "fetch_source"        // Step 4
  | "edit"                // Step 5
  | "generate_ids"        // Step 6
  | "upload"              // Step 7
  | "notify"              // Step 8
  | "checkpoint"          // Step 9
  | "update_tracking";    // Step 10

/** State of an individual pipeline step. */
export interface StepState {
  step: number;
  name: PipelineStepName;
  status: StepStatus;
  started_at?: string;
  completed_at?: string;
  error?: string;
}

// ── Sheets Updater Types ────────────────────────────────────────────────────

/**
 * Abstraction for reading Google Sheets data.
 * Injected into sheets_updater so core logic is testable without real API calls.
 */
export interface SheetsReader {
  getRows(
    spreadsheetId: string,
    sheet: string,
    range: string,
  ): Promise<string[][]>;
}

/**
 * Abstraction for writing Google Sheets data.
 * Injected into sheets_updater for write mode.
 */
export interface SheetsWriter {
  appendRows(
    spreadsheetId: string,
    sheet: string,
    rows: string[][],
  ): Promise<{ updatedRows: number }>;
  getRows(
    spreadsheetId: string,
    sheet: string,
    range: string,
  ): Promise<string[][]>;
}

/** Input for sheets_updater READ mode (variation lookup). */
export interface SheetsLookupInput {
  funnel: string;
  script_id: string;
  target_count: number;           // how many variation numbers to reserve
  spreadsheet_id: string;
  sheet_name?: string;            // defaults to "Ad Level Tracking (Current State)"
}

/** Output for sheets_updater READ mode. */
export interface SheetsLookupOutput {
  next_variation_number: string;  // e.g., "v0030"
  existing_variations: string[];  // all found v???? for this Script ID
  reserved_numbers: string[];     // e.g., ["v0030", "v0031", "v0032"]
  total_rows_scanned: number;
}

/** Input for sheets_updater WRITE mode (tracking update). */
export interface SheetsWriteInput {
  spreadsheet_id: string;
  sheet_name?: string;            // defaults to "Ad Level Tracking (Current State)"
  entries: SheetsWriteEntry[];
}

/** A single row to write to the Ad Level Tracking sheet. */
export interface SheetsWriteEntry {
  funnel: string;
  script_id: string;
  root_angle_name: string;
  asset_id: string;               // full 15-position Asset ID
  platform: string;
  dimensions: string;
  length_tier: string;
  ad_category: string;
  expansion_type: string;
  asset_type: string;
  talent: string;
  editor_name: string;
  copywriter_name: string;
  country_code: string;
  creation_date: string;
  status: string;                 // "Testing"
  classification: string;         // "Testing"
}

/** Output for sheets_updater WRITE mode. */
export interface SheetsWriteOutput {
  rows_written: number;
  verification_status: "VERIFIED" | "UNVERIFIED";
  written_asset_ids: string[];
}

// ── Transcript Analyzer Types ───────────────────────────────────────────────

export type TranscriptMode = "root_angle_suggestion" | "cut_point_identification";

/** A timestamped segment from a transcript. */
export interface TranscriptSegment {
  start_time: number;   // seconds
  end_time: number;     // seconds
  text: string;
}

/** Input for transcript_analyzer root angle suggestion mode. */
export interface RootAngleSuggestionInput {
  mode: "root_angle_suggestion";
  transcript_segments: TranscriptSegment[];
  script_id: string;
}

/** A single root angle suggestion. */
export interface RootAngleSuggestion {
  name: string;                             // 1-4 words
  confidence: "high" | "medium" | "low";
  transcript_evidence: string;              // exact quote
  reasoning: string;
}

/** Output for transcript_analyzer root angle suggestion mode. */
export interface RootAngleSuggestionOutput {
  suggestions: RootAngleSuggestion[];       // 3 ranked
}

/** Input for transcript_analyzer cut point identification mode. */
export interface CutPointInput {
  mode: "cut_point_identification";
  transcript_segments: TranscriptSegment[];
  root_angle_name: string;
  target_durations: number[];               // target durations in seconds
  hook_duration_seconds: number;            // duration of opening hook to preserve
  cta_duration_seconds: number;             // duration of CTA end card
  source_total_duration: number;            // total duration of source asset
}

/** A segment selected for inclusion in a cut plan. */
export interface CutSegment {
  start_time: number;
  end_time: number;
  type: "hook" | "body" | "cta";
  transcript_text: string;
}

/** A complete cut plan for one target duration. */
export interface CutPlan {
  target_duration: number;
  segments: CutSegment[];
  actual_duration: number;
  root_angle_preserved: boolean;
  duration_flag: boolean;                   // hook > 50% of target?
  flag_reason?: string;
}

/** Output for transcript_analyzer cut point identification mode. */
export interface CutPointOutput {
  cut_plans: CutPlan[];
}

/** Combined input type for transcript_analyzer. */
export type TranscriptAnalyzerInput =
  | RootAngleSuggestionInput
  | CutPointInput;

/** Combined output type for transcript_analyzer. */
export type TranscriptAnalyzerOutput =
  | RootAngleSuggestionOutput
  | CutPointOutput;

// ── Root Angle Verifier Types ───────────────────────────────────────────────

/** Input for root_angle_verifier (Step 2 — VALIDATE). */
export interface RootAngleVerifierInput {
  resolved_intake: ResolvedIntake;
  spreadsheet_id: string;
  sheet_name?: string;              // defaults to "Ad Level Tracking (Current State)"
}

/** Output for root_angle_verifier. */
export interface RootAngleVerifierOutput {
  root_angle_name: string;          // confirmed Root Angle Name
  root_angle_preserved: boolean;    // does the expansion preserve the root angle?
  source_exists_in_sss: boolean;
  classification_eligible: boolean; // is source a Winner (or overridden)?
  source_classification?: string;   // actual classification from SSS
  edit_method_confirmed: EditMethod;
  warnings: string[];
}

// ── Export Manager Types ────────────────────────────────────────────────────

/** File metadata returned by probing a media file (FFprobe abstraction). */
export interface FileProbeResult {
  file_path: string;
  format: string;              // "mp4", "png", "jpg", etc.
  codec: string;               // "h264", "png", "mjpeg", etc.
  width: number;
  height: number;
  duration_seconds: number;    // 0 for images
  file_size_bytes: number;
}

/**
 * Abstraction for probing media files.
 * In production: wraps FFprobe. In tests: returns mock results.
 */
export interface FileProber {
  probe(filePath: string): Promise<FileProbeResult>;
}

/** Target specs that an exported file must meet. */
export interface ExportTargetSpec {
  format: "mp4" | "png" | "jpg";
  codec?: string;              // default "h264" for video
  width: number;
  height: number;
  target_duration_seconds?: number;   // for video
  duration_tolerance_seconds?: number; // default 5
  max_file_size_mb?: number;          // default 500
  min_file_size_mb?: number;          // default 1 for video
}

/** Input for export_manager. */
export interface ExportManagerInput {
  files: string[];             // file paths to validate
  target_spec: ExportTargetSpec;
}

/** Validation result for a single file. */
export interface FileValidationResult {
  file_path: string;
  passed: boolean;
  format_ok: boolean;
  codec_ok: boolean;
  resolution_ok: boolean;
  duration_ok: boolean;       // true for images (not applicable)
  file_size_ok: boolean;
  actual: FileProbeResult;
  warnings: string[];
  errors: string[];
}

/** Output for export_manager. */
export interface ExportManagerOutput {
  all_passed: boolean;
  file_results: FileValidationResult[];
  warnings: string[];
  failures: string[];
}

// ── Assembly Editor Types ───────────────────────────────────────────────────

/** Expansion-specific edit instruction for assembly_editor. */
export type EditOperation =
  | { type: "duration_cutdown"; cut_plan: CutPlan }
  | { type: "hook_stack"; hook_clip_path: string; hook_duration_seconds: number; per_variation_hooks?: Array<{ hook_clip_path: string; hook_duration_seconds: number }> }
  | { type: "scroll_stopper"; opener_clip_path: string; opener_duration_seconds: number }
  | { type: "environment_swap"; environment_clip_path: string }
  | { type: "environment_swap_ai"; background_prompt: string; style_reference_url?: string }
  | { type: "ad_format"; target_dimensions: string; target_duration_seconds: number }
  | { type: "similar_presenter"; presenter_image_url: string; script_text: string; voice_id?: string }
  | { type: "different_presenter"; presenter_image_url: string; script_text: string; voice_id?: string; target_demographics?: { gender?: string; age_range?: string; ethnicity?: string } }
  | { type: "copy_framework"; framework_type: string; copy_lines: string[]; cta_text?: string; display_duration_seconds?: number }
  | { type: "international"; target_language: string; country_code: string; script_translation: string; voice_id?: string };

/** Input for ffmpeg-executor. */
export interface FfmpegExecutorInput {
  source_file: string;         // path to source video
  operation: EditOperation;
  output_dir: string;          // directory for output files
  variation_count: number;     // how many variations to produce
  root_angle_name: string;     // for self-verification
  source_dims?: { width: number; height: number }; // source dimensions for scaling clips to match
}

/** A single assembled output. */
export interface AssembledVariation {
  variation_index: number;
  file_path: string;
  duration_seconds: number;
  resolution: string;
  edit_summary: string;
  root_angle_preserved: boolean;
}

/** Output for ffmpeg-executor. */
export interface FfmpegExecutorOutput {
  variations: AssembledVariation[];
  duration_flags: string[];
}

/**
 * Abstraction for running shell commands (FFmpeg).
 * In production: executes child_process. In tests: records commands.
 */
export interface CommandRunner {
  run(command: string, args: string[]): Promise<{ exitCode: number; stdout: string; stderr: string }>;
}

// ── Template Renderer Types ────────────────────────────────────────────────

/** Template types the renderer supports. */
export type TemplateType =
  | "cta_end_card"
  | "caption_overlay"
  | "lower_third"
  | "copy_framework";

/** Caption style options (matches Varg SDK caption styles). */
export type CaptionStyle = "bold" | "karaoke" | "typewriter" | "bounce";

/** Parameters for CTA end card template. */
export interface CtaEndCardParams {
  cta_text: string;
  duration_seconds: number;           // 5-8s, usually 5
  background_color?: string;          // hex, default "#000000"
  text_color?: string;                // hex, default "#FFFFFF"
  font_size?: number;                 // default 48
}

/** Parameters for caption overlay template. */
export interface CaptionOverlayParams {
  caption_style: CaptionStyle;
  transcript_segments: TranscriptSegment[];
  font_size?: number;                 // default 36
  text_color?: string;                // default "#FFFFFF"
  outline_color?: string;             // default "#000000"
  position?: "bottom" | "center" | "top";  // default "bottom"
}

/** Parameters for lower third template. */
export interface LowerThirdParams {
  headline: string;
  subline?: string;
  duration_seconds: number;           // how long to show
  show_at_seconds: number;            // when to start showing
  background_color?: string;          // default semi-transparent black
  text_color?: string;                // default "#FFFFFF"
}

/** Parameters for copy framework overlay template. */
export interface CopyFrameworkParams {
  framework_text: string[];           // lines of framework copy
  display_duration_seconds: number;   // per slide/segment
  font_size?: number;                 // default 42
  text_color?: string;                // default "#FFFFFF"
  background_opacity?: number;        // 0-1, default 0.5
}

/** Discriminated union for template params. */
export type TemplateParams =
  | { type: "cta_end_card" } & CtaEndCardParams
  | { type: "caption_overlay" } & CaptionOverlayParams
  | { type: "lower_third" } & LowerThirdParams
  | { type: "copy_framework" } & CopyFrameworkParams;

/** Input for template_renderer. */
export interface TemplateRendererInput {
  source_file: string;               // edited video file
  templates: TemplateParams[];       // one or more templates to apply
  output_file: string;
  resolution: { width: number; height: number };
}

/** A single rendered file with templates applied. */
export interface RenderedFile {
  file_path: string;
  templates_applied: TemplateType[];
  duration_seconds: number;
}

/** Output for template_renderer. */
export interface TemplateRendererOutput {
  rendered_files: RenderedFile[];
  warnings: string[];
}

// ── AI Editor Types ─────────────────────────────────────────────────────

export type AiGenerationType = "video" | "image" | "audio" | "character" | "lipsync" | "segmentation";
export type GenerationQuality = "high" | "acceptable" | "low";

export interface GenerationRequest {
  type: AiGenerationType;
  prompt: string;
  model: string;                     // "kling_v2.5", "flux", "elevenlabs", "higgsfield", etc.
  duration_seconds?: number;         // For video/audio
  style_reference?: string;          // Path to style reference file
  width?: number;
  height?: number;
  voice_id?: string;                 // For ElevenLabs TTS
}

export interface AiEditorInput {
  generation_request: GenerationRequest;
  root_angle_name: string;
  output_dir: string;
  budget_limit?: number;             // Not enforced in v1
}

export interface GeneratedFile {
  file_path: string;
  generation_model: string;
  generation_cost_usd: number;
  quality_assessment: GenerationQuality;
  root_angle_preserved: boolean;
}

export interface AiEditorOutput {
  generated_files: GeneratedFile[];
  total_cost_usd: number;
}

/** DI abstraction for AI generation services. */
export interface AiGenerationClient {
  /** Check if a generation type is available (credentials configured). */
  isAvailable(type: AiGenerationType): boolean;
  /** Submit a generation request. Returns file path + cost. */
  generate(request: GenerationRequest, outputDir: string): Promise<{
    file_path: string;
    cost_usd: number;
  }>;
}

// ── Tess Analyst Types ─────────────────────────────────────────────────────

/** Input for tess_analyst sub-agent. */
export interface TessAnalystInput {
  spreadsheet_id: string;
  sheet_name?: string;              // defaults to "Ad Level Tracking (Current State)"
  min_spend_threshold: number;      // minimum spend to consider (default $1000)
  max_recommendations: number;      // how many recommendations to generate (default 10)
}

/** A parsed SSS tracking row for performance analysis. */
export interface SssTrackingRow {
  funnel: string;
  script_id: string;
  root_angle_name: string;
  asset_id: string;
  platform: string;
  dimensions: string;
  length_tier: string;
  ad_category: string;
  expansion_type: string;
  asset_type: string;
  talent: string;
  country_code: string;
  spend: number;
  roas: number;
  classification: string;
}

/** Evidence supporting an expansion recommendation. */
export interface RecommendationEvidence {
  source_spend: number;
  source_roas: number;
  existing_expansions: string[];
  unexploited_types: string[];
}

/** A scored expansion opportunity. */
export interface ExpansionOpportunity {
  funnel: string;
  script_id: string;
  source_asset_id: string;
  root_angle_name: string;
  recommended_expansion_type: string;
  score: number;                    // 0-100 composite
  priority: "P0" | "P1" | "P2";
  confidence: "high" | "medium" | "low";
  evidence: RecommendationEvidence;
  reasoning: string;
}

/** Output for tess_analyst sub-agent. */
export interface TessAnalystOutput {
  opportunities: ExpansionOpportunity[];
  total_winners_analyzed: number;
  total_rows_scanned: number;
  summary: {
    p0_count: number;
    p1_count: number;
    p2_count: number;
    avg_score: number;
    top_funnel: string;
  };
}

/** Intermediate artifacts produced by pipeline steps. */
export interface PipelineArtifacts {
  resolved_intake?: ResolvedIntake;
  reserved_variations?: string[];
  generated_ids?: GeneratedAssetId[];
  sheets_lookup?: SheetsLookupOutput;
  cut_plans?: CutPlan[];
  root_angle_suggestions?: RootAngleSuggestion[];
  verified_root_angle?: RootAngleVerifierOutput;
  export_validation?: ExportManagerOutput;
  assembled_variations?: AssembledVariation[];
  rendered_files?: RenderedFile[];
  ai_generated_files?: GeneratedFile[];
  hook_candidates?: Array<{
    source_asset_id: string;
    start_seconds: number;
    end_seconds: number;
    duration_seconds: number;
    transcript_text: string;
  }>;
  hook_selection_rationale?: string;
  /** Iconik asset URLs returned by asset_uploader (Step 7). */
  upload_urls?: string[];
  /** Metadata application results from metadata_manager (Step 7.5). */
  metadata_applied?: MetadataApplied[];
}

/** Full pipeline run state. */
export interface PipelineState {
  run_id: string;
  status: PipelineStatus;
  current_step: number;
  steps: StepState[];
  artifacts: PipelineArtifacts;
  created_at: string;
  updated_at: string;
  error?: string;
}
