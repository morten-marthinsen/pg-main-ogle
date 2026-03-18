import { describe, it, expect } from "vitest";
import {
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
} from "./index.js";

describe("state_manager", () => {
  // ── Pipeline creation ──────────────────────────────────────────────────

  it("creates a pipeline run with 10 pending steps", () => {
    const state = createPipelineRun();

    expect(state.status).toBe("pending");
    expect(state.current_step).toBe(0);
    expect(state.steps).toHaveLength(10);
    expect(state.steps.every((s) => s.status === "pending")).toBe(true);
    expect(state.run_id).toMatch(/^veda-/);
    expect(state.artifacts).toEqual({});
  });

  it("creates unique run IDs", () => {
    const run1 = createPipelineRun();
    const run2 = createPipelineRun();
    expect(run1.run_id).not.toBe(run2.run_id);
  });

  it("has correctly ordered step names", () => {
    const state = createPipelineRun();
    const names = state.steps.map((s) => s.name);
    expect(names).toEqual([
      "receive_direction",
      "validate",
      "confirm_reserve",
      "fetch_source",
      "edit",
      "generate_ids",
      "upload",
      "notify",
      "checkpoint",
      "update_tracking",
    ]);
  });

  // ── Starting the pipeline ──────────────────────────────────────────────

  it("starts a pipeline and sets step 1 to in_progress", () => {
    const state = startPipeline(createPipelineRun());

    expect(state.status).toBe("in_progress");
    expect(state.current_step).toBe(1);
    expect(state.steps[0].status).toBe("in_progress");
    expect(state.steps[0].started_at).toBeDefined();
  });

  it("throws when starting a non-pending pipeline", () => {
    const started = startPipeline(createPipelineRun());
    expect(() => startPipeline(started)).toThrow("Cannot start pipeline");
  });

  // ── Completing steps ───────────────────────────────────────────────────

  it("completes step 1 and advances to step 2", () => {
    let state = startPipeline(createPipelineRun());
    state = completeStep(state, 1);

    expect(state.steps[0].status).toBe("completed");
    expect(state.steps[0].completed_at).toBeDefined();
    expect(state.steps[1].status).toBe("in_progress");
    expect(state.current_step).toBe(2);
    expect(state.status).toBe("in_progress");
  });

  it("stores artifacts when completing a step", () => {
    let state = startPipeline(createPipelineRun());
    state = completeStep(state, 1, {
      resolved_intake: {
        source_asset_id: "357-0003-v0010-fb-9x16-60s-exv-dur-sad-gamc-ca-co-us-20260101",
        funnel: "357",
        script_id: "0003",
        source_positions: {} as any,
        platform: "fb",
        dimensions: "9x16",
        length_tier: "60s",
        ad_category: "exv",
        expansion_type: "dur",
        asset_type: "sad",
        talent_code: "gamc",
        country_code: "us",
        root_angle_name: "Break 90",
        target_variations: 3,
        edit_method: "assembly",
        directing_person: "co",
        special_instructions: null,
      },
    });

    expect(state.artifacts.resolved_intake).toBeDefined();
    expect(state.artifacts.resolved_intake?.funnel).toBe("357");
  });

  it("merges artifacts across multiple steps", () => {
    let state = startPipeline(createPipelineRun());

    state = completeStep(state, 1, {
      resolved_intake: { funnel: "357" } as any,
    });
    state = completeStep(state, 2);
    state = completeStep(state, 3, {
      reserved_variations: ["v0030", "v0031"],
    });

    expect(state.artifacts.resolved_intake).toBeDefined();
    expect(state.artifacts.reserved_variations).toEqual(["v0030", "v0031"]);
  });

  it("marks pipeline as completed when last step finishes", () => {
    let state = startPipeline(createPipelineRun());

    // Complete all 10 steps
    for (let i = 1; i <= 10; i++) {
      state = completeStep(state, i);
    }

    expect(state.status).toBe("completed");
    expect(getCompletedSteps(state)).toHaveLength(10);
  });

  it("throws when completing a non-in_progress step", () => {
    const state = startPipeline(createPipelineRun());
    // Step 2 is still pending
    expect(() => completeStep(state, 2)).toThrow('is "pending"');
  });

  // ── Skipping steps ─────────────────────────────────────────────────────

  it("skips a step and advances to the next", () => {
    let state = startPipeline(createPipelineRun());
    state = completeStep(state, 1);
    state = skipStep(state, 2, "No root angle verification needed");

    expect(state.steps[1].status).toBe("skipped");
    expect(state.steps[1].error).toContain("Skipped");
    expect(state.steps[2].status).toBe("in_progress");
    expect(state.current_step).toBe(3);
  });

  it("handles skipping remaining steps to complete pipeline", () => {
    let state = startPipeline(createPipelineRun());

    // Complete step 1, skip all the rest
    state = completeStep(state, 1);
    for (let i = 2; i <= 10; i++) {
      state = skipStep(state, i);
    }

    expect(state.status).toBe("completed");
  });

  // ── Failing steps ──────────────────────────────────────────────────────

  it("fails a step and sets pipeline to failed", () => {
    let state = startPipeline(createPipelineRun());
    state = failStep(state, 1, "Source asset not found in SSS");

    expect(state.steps[0].status).toBe("failed");
    expect(state.steps[0].error).toBe("Source asset not found in SSS");
    expect(state.status).toBe("failed");
    expect(state.error).toContain("Step 1");
    expect(state.error).toContain("receive_direction");
  });

  // ── Human checkpoints ──────────────────────────────────────────────────

  it("pauses for human input and resumes", () => {
    let state = startPipeline(createPipelineRun());
    state = completeStep(state, 1);
    state = completeStep(state, 2);

    // Step 3 (confirm_reserve) needs human approval
    state = awaitHuman(state, 3, "Confirm creation of 3 duration variations of 357-0003");

    expect(state.status).toBe("awaiting_human");
    expect(state.steps[2].status).toBe("awaiting_human");
    expect(state.steps[2].error).toContain("Confirm creation");

    // Human approves
    state = resumeStep(state, 3);

    expect(state.status).toBe("in_progress");
    expect(state.steps[2].status).toBe("in_progress");
  });

  it("throws when resuming a non-awaiting pipeline", () => {
    const state = startPipeline(createPipelineRun());
    expect(() => resumeStep(state, 1)).toThrow("Cannot resume");
  });

  // ── Query helpers ──────────────────────────────────────────────────────

  it("getCurrentStep returns the active step", () => {
    const state = startPipeline(createPipelineRun());
    const current = getCurrentStep(state);

    expect(current?.step).toBe(1);
    expect(current?.name).toBe("receive_direction");
  });

  it("getStep returns a specific step", () => {
    const state = createPipelineRun();
    const step6 = getStep(state, 6);

    expect(step6?.name).toBe("generate_ids");
  });

  it("isStepComplete returns correct status", () => {
    let state = startPipeline(createPipelineRun());
    expect(isStepComplete(state, 1)).toBe(false);

    state = completeStep(state, 1);
    expect(isStepComplete(state, 1)).toBe(true);
    expect(isStepComplete(state, 2)).toBe(false);
  });

  it("getSummary returns a human-readable string", () => {
    let state = startPipeline(createPipelineRun());
    state = completeStep(state, 1);
    state = completeStep(state, 2);

    const summary = getSummary(state);
    expect(summary).toContain(state.run_id);
    expect(summary).toContain("in_progress");
    expect(summary).toContain("2/10");
    expect(summary).toContain("confirm_reserve");
  });

  // ── End-to-end: simulate a partial pipeline run ────────────────────────

  it("simulates Steps 1 + 6 with real sub-agents", async () => {
    const { process } = await import("../tess-connector/index.js");
    const { generate } = await import("../naming-generator/index.js");

    let state = startPipeline(createPipelineRun());

    // Step 1: RECEIVE DIRECTION
    const intake = process({
      source_asset_id: "357-0003-v0010-fb-9x16-60s-exv-dur-sad-gamc-ca-co-us-20260101",
      expansion_type: "dur",
      root_angle_name: "Break 90",
      target_variations: 3,
      edit_method: "assembly",
      directing_person: "co",
      special_instructions: null,
    });

    expect(intake.status).toBe("SUCCESS");
    if (intake.status !== "SUCCESS") return;

    state = completeStep(state, 1, { resolved_intake: intake.data });

    // Skip Steps 2-5 (not built yet)
    for (let i = 2; i <= 5; i++) {
      state = skipStep(state, i, "Sub-agent not yet built");
    }

    // Step 6: GENERATE ASSET IDs
    const resolved = state.artifacts.resolved_intake!;
    const ids = generate({
      funnel: resolved.funnel,
      script_id: resolved.script_id,
      platform: resolved.platform,
      dimensions: resolved.dimensions,
      length_tier: resolved.length_tier,
      ad_category: resolved.ad_category,
      expansion_type: resolved.expansion_type,
      asset_type: resolved.asset_type,
      talent_code: resolved.talent_code,
      copywriter_initials: resolved.directing_person,
      country_code: resolved.country_code,
      reserved_variation_numbers: ["v0030", "v0031", "v0032"],
      creation_date: "20260206",
    });

    expect(ids.status).toBe("SUCCESS");
    if (ids.status !== "SUCCESS") return;

    state = completeStep(state, 6, { generated_ids: ids.data.asset_ids });

    // Skip Steps 7-10
    for (let i = 7; i <= 10; i++) {
      state = skipStep(state, i, "Sub-agent not yet built");
    }

    // Verify final state
    expect(state.status).toBe("completed");
    expect(state.artifacts.resolved_intake?.funnel).toBe("357");
    expect(state.artifacts.generated_ids).toHaveLength(3);
    expect(state.artifacts.generated_ids![0].full_id).toContain("357-0003-v0030");

    const summary = getSummary(state);
    expect(summary).toContain("completed");
  });
});
