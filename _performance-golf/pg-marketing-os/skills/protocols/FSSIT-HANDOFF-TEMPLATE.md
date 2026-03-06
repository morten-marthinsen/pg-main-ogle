# FSSIT Candidate Handoff Template

**Version:** 1.0
**Created:** 2026-02-15
**Purpose:** Standardized format for FSSIT candidates flowing from Research (Skill 01, Layer 2.8-RSF) to downstream strategic skills (03-08)
**Source:** Layer 2.8-RSF outputs (expectation_schema.json + latent_resonance_field.json)

---

## Usage

After Research Layer 2.8-RSF completes, the orchestrator creates this handoff document at:

```
[project]/01-research/FSSIT-RANKING.md
```

Downstream skills load this file during their Layer 0 (Foundation). If this file does not exist and `RSF_SKIP_ACKNOWLEDGED.yaml` does not exist, skills should WARN that RSF data is unavailable.

---

## Template

Copy this template and fill in project-specific data:

```markdown
# FSSIT Candidates — [Project Name]

**Generated:** [Date]
**Source Skill:** 01-Research, Layer 2.8-RSF
**RSF Status:** Executed | Skipped (if skipped, this file should not exist)

---

## Top 5 Ranked by Momentum-Adjusted Strength

| Rank | ID | Statement | Recognition Strength | NR Potential | Temporal Relevance | Momentum-Adjusted Score |
|------|-----|-----------|---------------------|--------------|-------------------|------------------------|
| 1 | FSSIT-001 | [The statement as audience would express it] | [0-10] | [0-10] | [0-10] | [weighted composite] |
| 2 | FSSIT-002 | [Statement] | [0-10] | [0-10] | [0-10] | [composite] |
| 3 | FSSIT-003 | [Statement] | [0-10] | [0-10] | [0-10] | [composite] |
| 4 | FSSIT-004 | [Statement] | [0-10] | [0-10] | [0-10] | [composite] |
| 5 | FSSIT-005 | [Statement] | [0-10] | [0-10] | [0-10] | [composite] |

### Scoring Dimensions

- **Recognition Strength (RS):** How strongly the audience would nod and say "YES, that's exactly right." Measures immediate resonance with lived experience.
- **Narrative Reorganization Potential (NR):** How much the statement can reorganize the audience's understanding when reframed. High NR = the audience believes this BUT the deeper truth is different/bigger than they realize.
- **Temporal Relevance (TR):** How much current events, cultural moment, or market timing amplify this statement's power. High TR = "this is happening RIGHT NOW."
- **Momentum-Adjusted Score:** Weighted composite: (RS × 0.3) + (NR × 0.4) + (TR × 0.3). NR weighted highest because narrative reorganization is the core Big Idea mechanism.

---

## FSSIT Candidate Details

### FSSIT-001: [Short Label]

**Full Statement:** [The complete statement as the audience would express it]

**Why It Resonates:** [1-2 sentences on why the audience feels this strongly]

**Reorganization Opportunity:** [How this statement can be reframed — what the audience believes is true but incomplete, and what the deeper/bigger truth is]

**Source Evidence:** [Quote IDs from research that support this FSSIT — e.g., P-042, H-118, RC-067]

**Expectation Schema Context:** [Which expectation schema this sits within — what the audience expects, what would surprise them]

**Downstream Anchoring:**
- Big Idea potential: [How this could anchor a Big Idea — 1 sentence]
- Root Cause connection: [How this connects to villain/root cause — 1 sentence]
- Mechanism connection: [How this creates space for mechanism reveal — 1 sentence]
- Promise alignment: [How this shapes the promise — 1 sentence]

---

### FSSIT-002: [Short Label]

[Same structure as above]

---

### FSSIT-003: [Short Label]

[Same structure as above]

---

### FSSIT-004: [Short Label]

[Same structure as above]

---

### FSSIT-005: [Short Label]

[Same structure as above]

---

## Recommended Anchors for Downstream Skills

These recommendations prioritize different FSSIT candidates for each downstream skill based on the candidate's strengths.

### Big Idea Anchor (Skill 06)
- **Primary:** FSSIT-[XXX] — [Why: highest NR potential, strongest reorganization opportunity]
- **Secondary:** FSSIT-[XXX] — [Why: complementary angle, different schema]

### Root Cause Anchor (Skill 03)
- **Primary:** FSSIT-[XXX] — [Why: strongest villain connection, clearest blame externalization path]
- **Secondary:** FSSIT-[XXX] — [Why: identity tension that supports "not your fault" framing]

### Mechanism Anchor (Skill 04)
- **Primary:** FSSIT-[XXX] — [Why: strongest expectation violation, clearest whitespace for naming]
- **Secondary:** FSSIT-[XXX] — [Why: audience already primed for this reframe]

### Promise Anchor (Skill 05)
- **Primary:** FSSIT-[XXX] — [Why: highest recognition strength, promise will feel "already true"]
- **Secondary:** FSSIT-[XXX] — [Why: temporal relevance makes this promise urgent NOW]

---

## Identity Tensions (from Layer 2.8-B)

Identity tensions are the gaps between who the audience IS and who they want to BE. These feed Root Cause (villain exploits the tension) and Big Idea (reframe resolves the tension).

| ID | Tension | Current Identity | Desired Identity | Strength |
|----|---------|-----------------|-----------------|----------|
| IT-001 | [Label] | [Who they are now] | [Who they want to be] | [0-10] |
| IT-002 | [Label] | [Current] | [Desired] | [0-10] |
| IT-003 | [Label] | [Current] | [Desired] | [0-10] |

---

## Expectation Whitespace Zones (from Layer 2.8-A)

Whitespace zones are areas where audience expectations create opportunity for surprise, reframe, or mechanism naming. These feed Mechanism (name something they didn't know existed) and Big Idea (reframe sits in the whitespace).

| ID | Zone | What Audience Expects | What's Actually True | Surprise Potential |
|----|------|----------------------|---------------------|-------------------|
| EW-001 | [Label] | [Expected] | [Actual] | [0-10] |
| EW-002 | [Label] | [Expected] | [Actual] | [0-10] |
| EW-003 | [Label] | [Expected] | [Actual] | [0-10] |

---

## RSF Skip Impact Assessment

**IF RSF WAS NOT EXECUTED**, this section documents the downstream quality implications.

Without FSSIT candidates:
- **Big Idea (06):** Must generate FSSIT-equivalents from research data using Degradation Protocol. Quality ceiling lowered from A to B+. No pre-validated reorganization opportunities.
- **Root Cause (03):** No identity tension data. Villain construction relies solely on research quotes. Missing the "who they want to be" dimension.
- **Mechanism (04):** No expectation whitespace mapping. Naming must rely on intuition rather than validated schema gaps.
- **Promise (05):** No recognition strength scores. Promise calibration is less precise.

---
```

---

## Validation Checklist

Before this handoff is considered complete:

```
[ ] Minimum 5 FSSIT candidates ranked
[ ] All candidates have Recognition Strength >= 6
[ ] At least 2 candidates have NR Potential >= 7
[ ] All candidates have source evidence (research quote IDs)
[ ] All candidates have downstream anchoring notes
[ ] Recommended anchors assigned for all 4 downstream skills
[ ] Identity tensions documented (minimum 3)
[ ] Expectation whitespace zones documented (minimum 3)
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-15 | Initial template creation |
