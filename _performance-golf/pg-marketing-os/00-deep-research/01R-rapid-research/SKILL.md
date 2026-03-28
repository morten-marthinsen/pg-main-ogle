---
name: rapid-research
description: >-
  Lightweight research skill producing 150-250 verbatim quotes across 4 buckets
  (Pain, Hope, Root Cause, Solutions Tried) in ~60-90 minutes. Use when validating
  1-3 market hypotheses, scouting a niche for opportunity signals, generating ideas
  for deeper exploration, or building a lightweight brief for a branch engine.
  NOT a replacement for full deep research (Skill 01) — this is a targeted probe,
  not an exhaustive evidence base. Produces a Rapid Research Handoff with pattern
  summaries, hypothesis verdicts, language extraction, and opportunity signals.
  Trigger when users mention quick research, niche scouting, hypothesis validation,
  market scan, rapid research, or lightweight research. Does NOT require Soul.md.
skill_type: technique
persuasion_profile: commitment + moderate authority
---

# 01R: RAPID RESEARCH

## Targeted Market Probe — 150-250 Quotes, 60-90 Minutes

---

## PURPOSE

Produce a focused evidence snapshot of a market or niche using real verbatim language
from real people. This is NOT summary research and NOT a replacement for full deep
research. It is a targeted probe designed for speed and signal detection.

**Output:** Rapid Research Handoff (~30-50KB)
**Time:** ~60-90 minutes (vs. 4-6+ hours for full deep research)
**Token budget:** ~40-60K tokens (vs. 200-300K+ for full)

**Use when:**
- Validating 1-3 hypotheses about a market before committing to full research
- Scouting a niche for opportunity signals
- Generating ideas worth exploring in full deep research or a branch engine
- Building a lightweight brief for ads, emails, organic, or advertorials
- Pre-qualifying whether a full deep research run is worth the investment

**Do NOT use when:**
- Building the evidence base for a full VSL or long-form sales page
- The campaign requires a proof inventory and promise ceiling
- You need 1,000+ quotes for pattern exhaustion
- Multiple branch engines will consume the research output

**Upgrade path:** Rapid research output can serve as a head start for full deep research
(Skill 01). The full pipeline can consume the rapid output rather than starting from zero.

---

## ARCHITECTURE

This skill uses a single consolidated agent file + 13 microskills across 4 layers:

| File | Load When | Contains |
|------|-----------|----------|
| `RAPID-RESEARCH-AGENT.md` | Always | Orchestrator, pipeline, gates, constraints |
| `RAPID-ANTI-DEGRADATION.md` | Always | Condensed enforcement rules |
| `rapid-intake-template.md` | Phase 1 (Intake) | Simplified intake template |
| `rapid-output-template.md` | Phase 4 (Delivery) | Output document structure |

### Microskill Registry

| Layer | Skills | Purpose |
|-------|--------|---------|
| Layer 0 | 0.1, 0.2 | Tool discovery, market configuration |
| Layer 1 | 1.1–1.6 | Source discovery, scraping, extraction, validation |
| Layer 2 | 2.1–2.4 | Pattern analysis, hypothesis validation, language, opportunities |
| Layer 3 | 3.1 | Handoff assembly |

**Total: 13 microskills** (vs. 63 in full deep research + 31 in proof inventory)

---

## MCP TOOL DISCOVERY

This skill requires web scraping tools. At Layer 0, call:
- `ToolSearch("firecrawl")` for web scraping
- `ToolSearch("apify")` for platform-specific data collection

See `~system/MCP-TOOL-REGISTRY.md` for the complete tool-to-skill mapping.

---

## QUOTE THRESHOLDS

| Bucket | Minimum |
|--------|---------|
| Pain | 60 |
| Hope | 50 |
| Root Cause | 30 |
| Solutions Tried | 20 |
| **TOTAL** | **150** |

**Stretch target:** 250 total. Expansion round triggers if below 150 after initial scrape.

**Buckets NOT collected:** Competitor Mechanism and Villain are omitted. These require
deep competitive analysis that exceeds the rapid research scope. Flag in output.

---

## PIPELINE

```
Phase 1: Rapid Intake (~5 min)
  → Conversational intake, structured into 3-section template
  → No Soul.md required

Phase 2: Targeted Scraping (~30-45 min)
  → 3-5 sources, 150-250 quotes across 4 buckets
  → 1 expansion round if below minimum
  → Authenticity validation (no fabricated quotes)

Phase 3: Pattern Analysis (~15-20 min)
  → Pattern detection, hypothesis validation, language extraction
  → Opportunity signal identification

Phase 4: Rapid Handoff (~10 min)
  → Assemble structured output document (~30-50KB)
  → Flag upgrade path to full deep research
```

---

## GATES

| Gate | When | Checks | Action on Fail |
|------|------|--------|----------------|
| GATE 0 | Before Layer 1 | Intake complete, tools available, sources identified | HALT — complete intake |
| GATE 1 | Before Layer 2 | Quote minimums met (150+ total, per-bucket minimums) | Expand once, then proceed with flag |

**Gates are BINARY. PASS or FAIL. No conditional passes.**

**Key difference from full research:** Gate 1 failure triggers ONE expansion round. If still
below minimums after expansion, proceed with a quality flag in the output (do not loop
indefinitely). The rapid research contract is speed — if evidence is thin, flag it and
recommend full deep research.

---

## SUCCESS CRITERIA

- 150+ verbatim quotes across 4 buckets (stretch: 250+)
- 3+ sources scraped
- All per-bucket minimums met (or flagged with expansion attempt)
- Hypothesis verdicts delivered (VALIDATED / INVALIDATED / INCONCLUSIVE)
- Language arsenal extracted
- Opportunity signals identified
- Output document produced at 30KB+ minimum
- Explicit flags for what was NOT covered (competitor mechanism, villain, proof inventory)
