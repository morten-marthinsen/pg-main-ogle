# Constraint Ledger Protocol
**Quality Engine v4** | Component: Protocol
**Purpose:** YAML-based decision tracking — make decision rationale and downstream implications explicit and traceable across pipeline stages
**System-Agnostic:** Works with any AI model or agent framework

---

## WHY THIS EXISTS

Under context pressure, the model loses track of constraints established early in the pipeline. Stage 3 selects a strategy with specific implications. Stage 6 selects a concept with naming constraints. By the time Stage 14 runs, those constraints have been buried under 100K+ of accumulated context.

The Constraint Ledger makes decision rationale and downstream implications EXPLICIT and TRACEABLE. Entries are created, updated, or superseded — never deleted.

---

## WHAT GETS LOGGED

Any decision in a foundation or strategic stage that constrains downstream execution:

| Decision Type | Example | Downstream Impact |
|---|---|---|
| **Strategy selection** | "Selected: Inflammation Cascade Pathway" | All downstream copy must reference this specific pathway |
| **Problem framing** | "Root cause = chronic inflammation from processed diet" | Story, lead, proof must center this cause |
| **Naming/expression** | "Mechanism name: The Reset Protocol" | Exact phrase used everywhere, no paraphrasing |
| **Audience segmentation** | "Primary: health-conscious 55+, secondary: active 40+" | Copy calibrated to primary, secondary addressed in proof |
| **Promise structure** | "Promise = energy restoration, not weight loss" | All benefit language centers energy gains |
| **Concept angle** | "Concept = 'The Enzyme Everyone Ignores'" | Headline, lead, story all set up this reveal |
| **Offer architecture** | "3-tier: digital + physical + coaching" | Offer copy structures around 3 tiers |
| **Voice register** | "Conversational authority, no hype" | Tone calibration for all generation stages |

---

## LEDGER FORMAT

```yaml
constraint_ledger:
  project: "[project-code]"
  created: "[ISO 8601]"
  last_updated: "[ISO 8601]"

  entries:
    - id: "CL-001"
      stage: "03-strategy"
      decision: "Selected root cause: chronic inflammation from processed diet"
      rationale: "Highest competition score (8.9), strongest research grounding (12 studies), audience language alignment (87%)"
      constraints:
        - "All downstream copy must reference inflammation, not generic 'discomfort' or 'fatigue'"
        - "Proof sections must include inflammation-specific studies, not general wellness research"
        - "Story must feature a relatable inflammation moment, not generic health decline"
      downstream_stages: ["04", "06", "11", "12", "13", "14", "15"]
      status: "active"

    - id: "CL-002"
      stage: "04-mechanism"
      decision: "Selected mechanism: Inflammation Cascade Pathway"
      rationale: "Arena Round 3 winner, 9.1 clarity score, unique in market"
      constraints:
        - "Mechanism name 'Inflammation Cascade Pathway' used VERBATIM — no paraphrasing, no abbreviation"
        - "Mechanism explanation must include the 3-phase sequence (detect, neutralize, restore)"
        - "Never reduce to 'supplement' or 'vitamin' — this is a PATHWAY, not a pill"
      downstream_stages: ["06", "11", "12", "13", "14", "15", "16"]
      status: "active"

    # --- Superseded entry example ---
    - id: "CL-003"
      stage: "03-strategy"
      decision: "Expert credential: 30+ years clinical practice"
      rationale: "Human directive — credential updated based on verified information"
      supersedes: "CL-001"          # ID of the entry this replaces
      supersedes_reason: "Human override — factual correction"
      fact_change_ref: "FC-001"     # Links to fact-changes.yaml entry
      constraints:
        - "All files must use '30+ years' — not '25+' or '35+'"
      downstream_stages: ["all"]
      status: "active"
```

---

## LIFECYCLE

### When Entries Are Created

| Trigger | Where |
|---|---|
| Competition winner selected | Strategic stages — the selection IS a constraint decision |
| Concept checkpoint passed | Concept approval creates constraints |
| Human override/edit | Any stage — human changes establish new constraints |
| Voice register locked | Voice/soul file loading — voice decisions constrain all generation |

### When Entries Are Updated

| Trigger | Action |
|---|---|
| Human modifies decision | Update entry, add `modified_by: human` + `modification_reason` |
| Downstream conflict detected | Add `conflict_flag` with details |
| Recitation check | Cross-reference recitation anchors against ledger entries |

### When Entries Are Retired

Entries are NEVER deleted. They can be marked `status: "superseded"` with a reference to the replacing entry. When superseded:
- Add `superseded_by` and `superseded_date` fields to the old entry
- The new entry uses the `supersedes` field to point back
- See FACT-CHANGE-PROPAGATION-PROTOCOL.md for the full propagation workflow

---

## HOW DOWNSTREAM STAGES USE THE LEDGER

### At Input Validation (Pre-Execution)

When a downstream stage loads its upstream packages, it also loads the constraint ledger. Before executing:

1. **Identify relevant entries** — filter by `downstream_stages` containing this stage's identifier
2. **List active constraints** — extract all `constraints` from relevant entries
3. **Verify no conflicts** — check that upstream packages don't contradict ledger constraints

### During Execution

The constraint list is treated as additional mandatory requirements alongside the stage's own specification. If output would violate a ledger constraint:

1. **Flag the conflict** in the execution log
2. **Resolve by adhering to the constraint** (the upstream decision takes precedence)
3. If resolution is impossible, **HALT and surface to human**

### At Verification

Verification checkpoints can reference the ledger to verify constraint adherence across the pipeline.

---

## OUTPUT LOCATION

The constraint ledger lives in the project output folder:

```
outputs/[project-code]/constraint-ledger.yaml
```

It is created at the first foundation stage that produces a constraint decision and grows as subsequent stages add entries.

---

## RELATIONSHIP TO ACTIVE RECITATION

The Active Recitation Protocol restates strategic anchors at midpoints. The Constraint Ledger is broader:

| Feature | Active Recitation | Constraint Ledger |
|---|---|---|
| **What** | Fixed strategic anchors | All constraint-creating decisions |
| **When** | Midpoint + 75% | Continuous — loaded at every stage |
| **Format** | Verbatim restatement file | Structured YAML with rationale |
| **Purpose** | Attention refresh | Decision traceability + downstream enforcement |

They complement each other. Recitation keeps the most critical anchors alive. The ledger provides full decision traceability.

---

## TIER APPLICABILITY

| Tier | Ledger Usage |
|---|---|
| **Full** | Mandatory — full ledger maintained, loaded at every stage, verified at checkpoints |
| **Standard** | Recommended — ledger maintained for competition decisions and concept checkpoints |
| **Quick** | Optional — human tracks constraints manually if needed |
