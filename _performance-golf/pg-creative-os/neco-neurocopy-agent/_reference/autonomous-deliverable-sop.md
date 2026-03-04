# Neco Autonomous Deliverable SOP

Standard operating procedure for all autonomous Neco deliverables (angle libraries, hook stacks, briefs produced without phase-stop human checkpoints).

---

## Phase Order (MANDATORY)

1. **Persona Mapping** (FIRST — before any creative work)
   - Check `_reference/buyer-personas.md` for existing PG-wide personas
   - Create product-specific persona mapping: `_projects/{product}/{product}-persona-mapping.md`
   - Map personas to product value drivers (Persona x Value Driver Matrix)
   - Identify top 3-5 target segments with FATE profiling

2. **Angle Ideation** (uses persona mapping as input)
   - All angles must reference specific persona segments
   - Score angles on persona-relevance, not just generic appeal

3. **Hook Development** (uses personas + angles)
   - Each hook targets a specific persona's psychological trigger
   - Tag hooks with persona codes (P1, P2, etc.)

4. **Script Writing** (Sub-Agent #5, if applicable)
   - Scripts inherit persona targeting from approved angles

---

## File Structure

All deliverables go in `_projects/{product-code}/`:
- `{product}-persona-mapping.md` — Phase 1 output
- `{product}-video-ad-angles.md` — Phase 2 output
- `{product}-hooks.md` — Phase 3 output (if separate)

After Gate 3 delivery, archive to `_output/{type}/` with metadata template.

---

## project-state.yaml Update

MANDATORY at session end: update `project-state.yaml` with `status`, `version`, `last_session`, `next_step`, `blocked_by`, and `deliverables` list.

---

## Checkpoint Documentation

For autonomous runs (no phase-stop), document checkpoints inline with `[CHECKPOINT N]` tags:
- Checkpoint 1: Audience/segment list confirmation
- Checkpoint 2: Core angle confirmation
- Checkpoint 3: Verification review (claims, sources)

These are logged for post-run review, not blocking during autonomous execution.
