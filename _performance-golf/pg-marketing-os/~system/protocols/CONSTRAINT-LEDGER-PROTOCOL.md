# Constraint Ledger Protocol — Decision + Constraint Tracking

**Version:** 1.0
**Created:** 2026-03-07
**Purpose:** Per-task constraint ledger tracking decisions, parameters, and their downstream implications across skills
**Sources:** Marc Stockman Quality Engine gap analysis (Tier 3 gap, partial coverage), Active Recitation Protocol synergy

---

## Why This Exists

Under context pressure, the model loses track of constraints established early in the pipeline. Skill 03 selects a mechanism with specific implications. Skill 06 selects a Big Idea with naming constraints. By the time Skill 14 (Mechanism Narrative) runs, those constraints have been buried under 100K+ of accumulated context. The Active Recitation Protocol addresses this for 5 strategic anchors, but many decisions create constraints that aren't covered by recitation.

The Constraint Ledger makes decision rationale and downstream implications EXPLICIT and TRACEABLE.

---

## What Gets Logged

Any decision in a Foundation or strategic skill (00-09) that constrains downstream execution:

| Decision Type | Example | Downstream Impact |
|---|---|---|
| **Mechanism selection** | "Selected: Fascia Rebound Pathway" | All downstream copy must reference fascia, not generic "tissue" |
| **Root cause framing** | "Root cause = chronic fascia adhesion from sitting" | Story, lead, proof must center this cause |
| **Naming/expression** | "Mechanism name: The Fascia Reset Protocol" | Exact phrase used everywhere, no paraphrasing |
| **Audience segmentation** | "Primary: golfer 55+, secondary: active 40+" | Copy calibrated to primary, secondary addressed in proof |
| **Promise structure** | "Promise = distance, not accuracy" | All benefit language centers distance gains |
| **Big Idea angle** | "Big Idea = 'The Muscle Everyone Ignores'" | Headline, lead, story all set up this reveal |
| **Offer architecture** | "3-tier: digital + physical + coaching" | Offer copy structures around 3 tiers |
| **Voice register** | "Soul.md: conversational authority, no hype" | Tone calibration for all generation skills |

---

## Ledger Format

```yaml
constraint_ledger:
  project: "[project-code]"
  created: "[ISO 8601]"
  last_updated: "[ISO 8601]"

  entries:
    - id: "CL-001"
      skill: "03-root-cause"
      decision: "Selected root cause: chronic fascia adhesion from prolonged sitting"
      rationale: "Highest Arena score (8.9), strongest research grounding (12 studies), audience quote alignment (87%)"
      constraints:
        - "All downstream copy must reference fascia adhesion, not generic 'tightness' or 'stiffness'"
        - "Proof sections must include fascia-specific studies, not general flexibility research"
        - "Story must feature a relatable fascia adhesion moment, not generic back pain"
      downstream_skills: ["04", "06", "11", "12", "13", "14", "15"]
      status: "active"

    - id: "CL-002"
      skill: "04-mechanism"
      decision: "Selected mechanism: Fascia Rebound Pathway"
      rationale: "Arena Round 2 (FINAL) winner (Clemens variant), 9.1 mechanism clarity, unique in market"
      constraints:
        - "Mechanism name 'Fascia Rebound Pathway' used VERBATIM — no paraphrasing, no abbreviation"
        - "Mechanism explanation must include the 3-phase sequence (release → rebound → stabilize)"
        - "Never reduce to 'stretching' or 'flexibility' — this is a PATHWAY, not an exercise"
      downstream_skills: ["06", "11", "12", "13", "14", "15", "16"]
      status: "active"

    # --- Superseded entry example ---
    - id: "CL-003"
      skill: "03-root-cause"
      decision: "McGinley credential: 30+ years"
      rationale: "User directive — credential updated based on direct knowledge"
      supersedes: "CL-001"          # ID of the entry this replaces
      supersedes_reason: "Human override — factual correction"
      fact_change_ref: "FC-001"     # Links to fact-changes.yaml entry
      constraints:
        - "All files must use '30+ years' — not '25+' or '35+'"
      downstream_skills: ["all"]
      status: "active"
```

---

## Lifecycle

### When Entries Are Created

| Trigger | Where |
|---|---|
| Arena winner selected | Skills 03, 04, 05, 06, 08 — the Arena selection IS a constraint decision |
| Concept checkpoint passed | Skills 03, 04, 06 — CONCEPT_APPROVED.yaml creates constraints |
| Human override/edit | Any skill — human changes establish new constraints |
| Voice register locked | Soul.md loading — voice decisions constrain all generation |

### When Entries Are Updated

| Trigger | Action |
|---|---|
| Human modifies decision | Update entry, add `modified_by: human` + `modification_reason` |
| Downstream conflict detected | Add `conflict_flag` with details |
| Active Recitation check | Cross-reference recitation anchors against ledger entries |

### When Entries Are Retired

Entries are NEVER deleted. They can be marked `status: "superseded"` with a reference to the replacing entry. When superseded, add `superseded_by` and `superseded_date` fields. The new entry uses the `supersedes` field to point back. See FACT-CHANGE-PROPAGATION-PROTOCOL.md for the full propagation workflow.

---

## How Downstream Skills Use the Ledger

### At Layer 0 (Pre-Execution)

When a downstream skill loads its upstream packages, it also loads the constraint ledger. Before executing:

1. **Identify relevant entries** — filter by `downstream_skills` containing this skill's number
2. **List active constraints** — extract all `constraints` from relevant entries
3. **Verify no conflicts** — check that upstream packages don't contradict ledger constraints

### During Execution

The constraint list is treated as additional mandatory requirements alongside the skill's own spec. If a microskill output would violate a ledger constraint:

1. **Flag the conflict** in the execution log
2. **Resolve by adhering to the constraint** (the upstream decision takes precedence)
3. If resolution is impossible, **HALT and surface to human**

### At Verification

The Foundation Integrity Check (VP-2) and Prose Quality Verification (VP-3) can reference the ledger to verify constraint adherence.

---

## Output Location

The constraint ledger lives in the project output folder:

```
~outputs/[project-code]/constraint-ledger.yaml
```

It is created at the first Foundation skill that produces a constraint decision (typically Skill 03) and grows as subsequent skills add entries.

---

## Relationship to Active Recitation

The Active Recitation Protocol restates 5 strategic anchors at midpoint/75%. The Constraint Ledger is broader:

| Feature | Active Recitation | Constraint Ledger |
|---|---|---|
| **What** | 5 fixed anchors | All constraint-creating decisions |
| **When** | Midpoint + 75% | Continuous — loaded at every skill |
| **Format** | Verbatim restatement file | Structured YAML with rationale |
| **Purpose** | Attention refresh | Decision traceability + downstream enforcement |

They complement each other. Recitation keeps the most critical anchors alive. The ledger provides full decision traceability.

---

## Tier Applicability

| Tier | Ledger Usage |
|---|---|
| **Full** | Mandatory — full ledger maintained, loaded at every skill, verified at checkpoints |
| **Standard** | Recommended — ledger maintained for Arena decisions and concept checkpoints |
| **Quick** | Optional — human tracks constraints manually if needed |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-07 | Initial creation — per-task constraint ledger with decision tracking, downstream enforcement, lifecycle management |
