/**
 * state_manager sub-agent — Orchestration Layer
 *
 * Pipeline state tracker and step coordinator. Manages the lifecycle of
 * pipeline runs: creation, step progression, artifact storage, failure
 * handling, and status queries.
 *
 * Sub-agents communicate through state objects passed by the orchestrator
 * (Decision #64). The state_manager is the single source of truth for
 * pipeline state — it never calls sub-agents directly, it only tracks
 * what the orchestrator tells it.
 *
 * Sequential pipeline orchestration (Decision #68): steps run in order,
 * each step's output feeds the next step's input via artifacts.
 */

import type {
  PipelineState,
  PipelineStatus,
  PipelineStepName,
  PipelineArtifacts,
  StepState,
  StepStatus,
  ResolvedIntake,
  GeneratedAssetId,
} from "../../types/pipeline.js";

/** The ordered pipeline steps. */
const PIPELINE_STEPS: { step: number; name: PipelineStepName }[] = [
  { step: 1, name: "receive_direction" },
  { step: 2, name: "validate" },
  { step: 3, name: "confirm_reserve" },
  { step: 4, name: "fetch_source" },
  { step: 5, name: "edit" },
  { step: 6, name: "generate_ids" },
  { step: 7, name: "upload" },
  { step: 8, name: "notify" },
  { step: 9, name: "checkpoint" },
  { step: 10, name: "update_tracking" },
];

function now(): string {
  return new Date().toISOString();
}

function generateRunId(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `veda-${ts}-${rand}`;
}

/**
 * Create a new pipeline run with all 10 steps in "pending" state.
 */
export function createPipelineRun(): PipelineState {
  const timestamp = now();
  return {
    run_id: generateRunId(),
    status: "pending",
    current_step: 0,
    steps: PIPELINE_STEPS.map(({ step, name }) => ({
      step,
      name,
      status: "pending" as StepStatus,
    })),
    artifacts: {},
    created_at: timestamp,
    updated_at: timestamp,
  };
}

/**
 * Start a pipeline run — sets status to in_progress and begins step 1.
 */
export function startPipeline(state: PipelineState): PipelineState {
  if (state.status !== "pending") {
    throw new Error(`Cannot start pipeline in "${state.status}" state`);
  }
  return {
    ...state,
    status: "in_progress",
    current_step: 1,
    steps: state.steps.map((s) =>
      s.step === 1
        ? { ...s, status: "in_progress" as StepStatus, started_at: now() }
        : s,
    ),
    updated_at: now(),
  };
}

/**
 * Mark a step as completed and advance to the next step.
 * If the completed step is the last one, marks the pipeline as completed.
 */
export function completeStep(
  state: PipelineState,
  stepNumber: number,
  artifacts?: Partial<PipelineArtifacts>,
): PipelineState {
  if (state.status !== "in_progress" && state.status !== "awaiting_human") {
    throw new Error(`Cannot complete step in "${state.status}" pipeline`);
  }

  const stepIndex = state.steps.findIndex((s) => s.step === stepNumber);
  if (stepIndex === -1) {
    throw new Error(`Step ${stepNumber} not found`);
  }

  const step = state.steps[stepIndex];
  if (step.status !== "in_progress" && step.status !== "awaiting_human") {
    throw new Error(`Step ${stepNumber} is "${step.status}", cannot complete`);
  }

  const updatedSteps = [...state.steps];
  updatedSteps[stepIndex] = {
    ...step,
    status: "completed",
    completed_at: now(),
  };

  // Merge artifacts
  const mergedArtifacts = {
    ...state.artifacts,
    ...artifacts,
  };

  // Find next pending step
  const nextStep = updatedSteps.find((s) => s.status === "pending");

  if (nextStep) {
    // Advance to next step
    const nextIndex = updatedSteps.indexOf(nextStep);
    updatedSteps[nextIndex] = {
      ...nextStep,
      status: "in_progress",
      started_at: now(),
    };

    return {
      ...state,
      status: "in_progress",
      current_step: nextStep.step,
      steps: updatedSteps,
      artifacts: mergedArtifacts,
      updated_at: now(),
    };
  }

  // All steps done
  return {
    ...state,
    status: "completed",
    current_step: stepNumber,
    steps: updatedSteps,
    artifacts: mergedArtifacts,
    updated_at: now(),
  };
}

/**
 * Skip a step (e.g., when a step doesn't apply to this pipeline run).
 * Advances to the next pending step.
 */
export function skipStep(
  state: PipelineState,
  stepNumber: number,
  reason?: string,
): PipelineState {
  const stepIndex = state.steps.findIndex((s) => s.step === stepNumber);
  if (stepIndex === -1) {
    throw new Error(`Step ${stepNumber} not found`);
  }

  const updatedSteps = [...state.steps];
  updatedSteps[stepIndex] = {
    ...updatedSteps[stepIndex],
    status: "skipped",
    completed_at: now(),
    ...(reason ? { error: `Skipped: ${reason}` } : {}),
  };

  // Find and start next pending step
  const nextStep = updatedSteps.find((s) => s.status === "pending");
  if (nextStep) {
    const nextIndex = updatedSteps.indexOf(nextStep);
    updatedSteps[nextIndex] = {
      ...nextStep,
      status: "in_progress",
      started_at: now(),
    };
    return {
      ...state,
      current_step: nextStep.step,
      steps: updatedSteps,
      updated_at: now(),
    };
  }

  // All steps done or skipped
  const anyFailed = updatedSteps.some((s) => s.status === "failed");
  return {
    ...state,
    status: anyFailed ? "failed" : "completed",
    steps: updatedSteps,
    updated_at: now(),
  };
}

/**
 * Mark a step as failed. Sets the pipeline to failed state.
 */
export function failStep(
  state: PipelineState,
  stepNumber: number,
  error: string,
): PipelineState {
  const stepIndex = state.steps.findIndex((s) => s.step === stepNumber);
  if (stepIndex === -1) {
    throw new Error(`Step ${stepNumber} not found`);
  }

  const updatedSteps = [...state.steps];
  updatedSteps[stepIndex] = {
    ...updatedSteps[stepIndex],
    status: "failed",
    completed_at: now(),
    error,
  };

  return {
    ...state,
    status: "failed",
    steps: updatedSteps,
    error: `Step ${stepNumber} (${updatedSteps[stepIndex].name}) failed: ${error}`,
    updated_at: now(),
  };
}

/**
 * Pause the pipeline at the current step for human input.
 */
export function awaitHuman(
  state: PipelineState,
  stepNumber: number,
  reason: string,
): PipelineState {
  const stepIndex = state.steps.findIndex((s) => s.step === stepNumber);
  if (stepIndex === -1) {
    throw new Error(`Step ${stepNumber} not found`);
  }

  const updatedSteps = [...state.steps];
  updatedSteps[stepIndex] = {
    ...updatedSteps[stepIndex],
    status: "awaiting_human",
    error: reason,
  };

  return {
    ...state,
    status: "awaiting_human",
    steps: updatedSteps,
    updated_at: now(),
  };
}

/**
 * Resume a paused pipeline step (after human provides input).
 */
export function resumeStep(
  state: PipelineState,
  stepNumber: number,
): PipelineState {
  if (state.status !== "awaiting_human") {
    throw new Error(`Cannot resume pipeline in "${state.status}" state`);
  }

  const stepIndex = state.steps.findIndex((s) => s.step === stepNumber);
  if (stepIndex === -1) {
    throw new Error(`Step ${stepNumber} not found`);
  }

  const updatedSteps = [...state.steps];
  updatedSteps[stepIndex] = {
    ...updatedSteps[stepIndex],
    status: "in_progress",
    error: undefined,
  };

  return {
    ...state,
    status: "in_progress",
    steps: updatedSteps,
    updated_at: now(),
  };
}

// ── Query helpers ────────────────────────────────────────────────────────────

/** Get the current step state. */
export function getCurrentStep(state: PipelineState): StepState | undefined {
  return state.steps.find((s) => s.step === state.current_step);
}

/** Get a specific step by number. */
export function getStep(state: PipelineState, stepNumber: number): StepState | undefined {
  return state.steps.find((s) => s.step === stepNumber);
}

/** Get all completed steps. */
export function getCompletedSteps(state: PipelineState): StepState[] {
  return state.steps.filter((s) => s.status === "completed");
}

/** Check if a specific step has been completed. */
export function isStepComplete(state: PipelineState, stepNumber: number): boolean {
  const step = getStep(state, stepNumber);
  return step?.status === "completed";
}

/** Get a summary string of the pipeline state. */
export function getSummary(state: PipelineState): string {
  const completed = state.steps.filter((s) => s.status === "completed").length;
  const total = state.steps.length;
  const current = getCurrentStep(state);
  const currentName = current ? `${current.name} (Step ${current.step})` : "none";
  return `[${state.run_id}] ${state.status} — ${completed}/${total} steps complete, current: ${currentName}`;
}
