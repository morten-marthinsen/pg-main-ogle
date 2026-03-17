# Autoresearch Loop Protocol — System Self-Improvement

**Version:** 1.0
**Created:** 2026-03-07
**Purpose:** Apply Karpathy's autoresearch pattern to systematic Marketing-OS skill improvement
**Sources:** Karpathy autoresearch pattern analysis, Self-Learning Promotion Protocol (1.6)

---

## Overview

The autoresearch loop is the engineering framework for the Self-Learning Promotion Protocol. Where the promotion protocol defines WHAT to test (J1/J2 learnings at L1-L2), the autoresearch loop defines HOW to test systematically.

**The pattern:** git branch → modify → test → evaluate → keep/discard → log → repeat

---

## Setup Phase

### 1. Select a Test Input

Choose a known product with known-good Foundation outputs. This becomes the benchmark:

- All Foundation packages exist and are human-approved
- Context reservoir exists
- At least one set of copy outputs exists for quality comparison
- The product is representative of typical campaign work (not an edge case)

### 2. Define the Experiment Set

From the learning log, select 3-5 learnings to test in this session:

```yaml
experiment_set:
  test_input: "[project-code]"
  date: "[ISO 8601]"
  learnings_to_test:
    - id: "L42"
      classification: "J1"
      hypothesis: "Shorter mechanism names produce more natural narrative prose"
      target_file: "skills/04-mechanism/microskills/4.2.3-naming-candidates.md"
    - id: "L43"
      classification: "J2"
      hypothesis: "Story sections opening with a scene outperform claim-based openings"
      target_file: "skills/12-story/microskills/2.1-story-draft.md"
```

---

## Loop Phase

For each learning in the experiment set:

### Step 1: Branch

```bash
git worktree add /tmp/autoresearch-[learning-id] -b learning/[learning-id]-[description]
```

### Step 2: Modify

Edit the target file in the worktree (NOT in the vault). Make the specific change the hypothesis predicts will improve output.

### Step 3: Test

Run the modified skill on the test input. Save the output to a test-specific directory.

### Step 4: Compare

Compare the test output against the baseline output from the same test input:

| Comparison | Method |
|-----------|--------|
| **J1 learning** | Check: does output quality maintain or improve? No regression on any dimension? |
| **J2 learning** | Human reviews both outputs side-by-side. Which is better? Why? |

### Step 5: Decide

```
IF improved or maintained (J1) OR human confirms improvement (J2):
  → KEEP
  → Merge branch to main
  → Log to promotion-results.tsv: KEEP + reason + commit hash
  → Update learning level to L3 (tested) or L4 (promoted)

IF not improved or human rejects:
  → DISCARD
  → Delete branch
  → Log to promotion-results.tsv: DISCARD + reason
  → Learning stays at current level
```

### Step 6: Clean Up

```bash
git worktree remove /tmp/autoresearch-[learning-id]
```

### Repeat

Move to next learning in the experiment set.

---

## Human Review Phase

After all experiments in the set complete:

1. Review `promotion-results.tsv` entries from this session
2. For KEEP results: read the diffs to understand what changed
3. Approve or reject for merge to main (final gate)
4. For rejected KEEP results: revert the merge, update log

---

## Session Cadence

- **Frequency:** After every 2-3 campaigns, or when learning log accumulates 5+ L2 learnings
- **Duration:** 1-2 hours per autoresearch session (3-5 experiments)
- **Model:** Opus for Foundation skill experiments, Sonnet for copy skill experiments

---

## Arena Integration (Future)

AutoResearch can serve as a **pre-screening layer** for the Arena:

1. AutoResearch generates 50-100 copy variants rapidly using LLM-as-judge scoring
2. Top 10 candidates are surfaced to the Arena for full multi-persona evaluation
3. Arena deep-reviews with diverse perspectives (Creative, Strategist, Editor, Customer)
4. Human approves final winner

This hybrid gives AutoResearch's speed (volume) combined with Arena's judgment (quality). The key constraint: the LLM-as-judge scoring rubric used in the AutoResearch loop must be **frozen and immutable** during a session to prevent metric drift. The rubric can be revised between sessions based on Arena feedback.

---

## What Is PARKED

**Automated scoring for the loop.** Karpathy's autoresearch uses `val_bpb` (validation bits-per-byte) as the automated metric. Marketing-OS has no equivalent automated quality metric for copywriting output. Until one is defined, the loop relies on human evaluation.

**Overnight autonomous runs.** Without automated scoring, the loop can't run autonomously. Each experiment requires human evaluation. This limits throughput but ensures quality.

---

## Forward Vision: Live Campaign Optimization Loops

### The Problem

Once a campaign goes live, massive amounts of real data flow in: ad metrics (CTR, CPC, ROAS), landing page metrics (heatmaps, scroll depth, conversion rate, AOV), funnel metrics (add-to-cart rate, checkout completion, upsell take rate). Today, optimizing against this data is manual and slow.

### The Vision

When marketing-os drives live campaigns, an always-on AutoResearch loop runs against **real metrics** — not LLM-as-judge proxies, but actual conversion data:

```
Campaign goes live
    → Data flows in (ads, landing pages, funnels)
    → AutoResearch loop activates:
        1. Read current performance metrics
        2. Identify lowest-performing element (headline, CTA, offer frame, page section)
        3. Generate variant using marketing-os copy skills
        4. Deploy variant to A/B test
        5. Wait for statistical significance
        6. Keep winner, discard loser
        7. Move to next lowest-performing element
        8. Repeat continuously
```

### Why This Is Different From Current State

- **Current:** Human reviews data → decides what to test → writes variant → deploys → waits → reviews. Days per cycle.
- **Future:** AutoResearch reads data → generates variant → deploys → evaluates → keeps/discards. Hours per cycle.
- **Key unlock:** Real scalar metrics (conversion rate, AOV, ROAS) replace subjective LLM scoring. The metric is not a proxy — it IS the business outcome.

### Requirements for Activation

This vision activates when:
1. Marketing-os has **live campaign infrastructure** (ad accounts, landing pages, tracking)
2. A/B testing tools are **API-accessible** (variant deployment can be automated)
3. Statistical significance can be **computed automatically** (sample size calculators)
4. **Human approval gates** exist for high-risk changes (brand voice, offer structure)

### What AutoResearch Handles vs. What It Doesn't

| AutoResearch Handles | Human/Arena Handles |
|---------------------|-------------------|
| Headline variant testing | Campaign strategy |
| CTA wording optimization | Brand voice direction |
| Ad creative angle testing | Offer structure |
| Subject line optimization | Audience targeting |
| Page section ordering | Budget allocation |
| Social proof placement | Channel selection |

The pattern: AutoResearch optimizes **tactical execution** within a locked strategy. Strategy remains human + Arena territory.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-07 | Initial creation — Karpathy autoresearch pattern applied to Marketing-OS skill improvement |
| 1.1 | 2026-03-12 | Added Arena integration concept and forward vision for live campaign optimization loops |
