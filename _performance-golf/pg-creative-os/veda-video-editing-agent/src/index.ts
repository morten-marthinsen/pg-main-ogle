/**
 * Veda — Video Editing Agent
 * Entry point. Will become the orchestrator in future sessions.
 */

export { generate } from "./sub-agents/naming-generator/index.js";
export { process as processIntake } from "./sub-agents/tess-connector/index.js";
export { applyMetadata, buildMetadataValues } from "./sub-agents/metadata-manager/index.js";
export {
  createPipelineRun,
  startPipeline,
  completeStep,
  skipStep,
  failStep,
  awaitHuman,
  resumeStep,
  getCurrentStep,
  getStep,
  getCompletedSteps,
  isStepComplete,
  getSummary,
} from "./sub-agents/state-manager/index.js";
export {
  lookupVariations,
  writeTracking,
  extractVariationNumber,
  findExistingVariations,
  calculateNextVariations,
} from "./sub-agents/sheets-updater/index.js";
export {
  analyze as analyzeTranscript,
  suggestRootAngles,
  identifyCutPoints,
  parseTimestamp,
  formatTimestamp,
  scoreSegmentPersuasiveness,
} from "./sub-agents/transcript-analyzer/index.js";
export {
  verify as verifyRootAngle,
  findScriptInSSS,
  assessRootAnglePreservation,
  checkClassificationEligibility,
} from "./sub-agents/root-angle-verifier/index.js";
export {
  validateExports,
  validateFile,
} from "./sub-agents/export-manager/index.js";
export {
  assemble,
  buildEditArgs,
  buildDurationCutdownArgs,
  buildHookStackArgs,
  buildScrollStopperArgs,
  buildEnvironmentSwapArgs,
  buildAdFormatArgs,
} from "./utils/ffmpeg-executor.js";
export {
  render as renderTemplate,
  buildCtaEndCardArgs,
  buildCaptionOverlayArgs,
  buildLowerThirdArgs,
  buildCopyFrameworkArgs,
  validateTemplateParams,
  escapeFfmpegText,
  estimateAddedDuration,
} from "./sub-agents/template-renderer/index.js";
export {
  generate as aiGenerate,
  assessQuality,
} from "./sub-agents/ai-editor/index.js";
export { createAiClient } from "./utils/ai-client.js";
export type { AiClientConfig } from "./utils/ai-client.js";
export { runPipeline } from "./orchestrator/index.js";
export { resumePipeline } from "./orchestrator/resume.js";
export type {
  OrchestratorDeps,
  PipelineRunConfig,
  PipelineRunResult,
} from "./orchestrator/index.js";
export { parseAssetId } from "./utils/parse-asset-id.js";
export type { ParseResult } from "./utils/parse-asset-id.js";
export { createRealCommandRunner, createRealFileProber } from "./utils/real-runners.js";
export type {
  NamingGeneratorInput,
  NamingGeneratorOutput,
  GeneratedAssetId,
  AssetIdPositions,
  IntakeData,
  RawIntake,
  ResolvedIntake,
  PipelineState,
  PipelineStatus,
  PipelineStepName,
  PipelineArtifacts,
  StepState,
  StepStatus,
} from "./types/pipeline.js";
export type {
  SubAgentResult,
  FailureResult,
  SuccessResult,
  ErrorCategory,
} from "./types/sub-agent.js";
export type {
  SheetsReader,
  SheetsWriter,
  SheetsLookupInput,
  SheetsLookupOutput,
  SheetsWriteInput,
  SheetsWriteOutput,
  SheetsWriteEntry,
  TranscriptSegment,
  RootAngleSuggestionInput,
  RootAngleSuggestion,
  RootAngleSuggestionOutput,
  CutPointInput,
  CutSegment,
  CutPlan,
  CutPointOutput,
  TranscriptAnalyzerInput,
  TranscriptAnalyzerOutput,
  RootAngleVerifierInput,
  RootAngleVerifierOutput,
  TemplateType,
  CaptionStyle,
  TemplateParams,
  TemplateRendererInput,
  TemplateRendererOutput,
  RenderedFile,
  AiEditorInput,
  AiEditorOutput,
  AiGenerationClient,
  AiGenerationType,
  GeneratedFile,
  GenerationRequest,
  GenerationQuality,
} from "./types/pipeline.js";
