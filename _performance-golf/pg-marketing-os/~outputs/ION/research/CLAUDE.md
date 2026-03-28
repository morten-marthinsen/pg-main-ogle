# iON+ Golf Ball — Research Project CLAUDE.md

## MANDATORY FIRST READS
1. READ: `_performance-golf/pg-marketing-os/00-deep-research/01-research/RESEARCH-ANTI-DEGRADATION.md`
2. READ: `_performance-golf/pg-marketing-os/00-deep-research/01-research/ENFORCEMENT-GATES.md`
3. READ: This file (project CLAUDE.md)
4. READ: `PROJECT-STATE.md` (current phase, decisions, next steps)

---

## GATE ENFORCEMENT

Gates are BINARY: PASS or FAIL. No other status exists.

- GATE_1_VERIFIED.yaml can ONLY be created when ALL bucket minimums are met.
- "PARTIAL_PASS", "conditional pass", "WARNING" — NONE of these exist.
- If a gate is CLOSED, you CANNOT proceed. Period.
- Gates cannot be overridden by subagents, by the orchestrator, or by "quality" arguments.

---

## QUOTE TARGETS (from PRD v3.0 Section 9.2)

| Bucket | Minimum | Status |
|--------|---------|--------|
| TOTAL | 1,000 | PENDING |
| Pain | 300 | PENDING |
| Hope | 250 | PENDING |
| Root Cause | 200 | PENDING |
| Solutions Tried | 150 | PENDING |
| Competitor Mechanism | 100 | PENDING |
| Villain | 75 | PENDING |

**After EVERY scraping session, produce the QUOTE VOLUME CHECK table (see ENFORCEMENT-GATES.md). If any bucket is below minimum, you MUST expand before proceeding.**

---

## FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)

If any of these phrases appear in your reasoning, STOP IMMEDIATELY:

- "quality over quantity"
- "partial pass" / "PARTIAL_PASS"
- "conditional pass"
- "sufficient for analysis"
- "close enough"
- "approximately X"
- "quality is HIGH so we can proceed"
- "we have N top-tier quotes"
- "proceed with what we have"
- "the quotes we have are very strong"
- "diminishing returns"

These phrases were used in TWO previous catastrophic failures (2026-02-05: 121 quotes delivered; 2026-02-11: 223 quotes delivered). Both times the entire research had to be redone. The minimum is 1,000. Not approximately 1,000. Not "close to" 1,000. Exactly 1,000 or more.

---

## KEY PROJECT DECISIONS

- **Project code:** ION
- **Swing speed:** 95mph (NOT 100mph — confirmed by Ben 2026-03-26. The production innovation deck's "100 mph" reference is incorrect.)
- **Price range:** $29.99-$34.99/dozen (in progress)
- **Mode B:** New product, no marketing history
- **iON+ and iON S are DIFFERENT products** — this project is iON+ ONLY
- **Soul.md voice:** Knowledgeable golf buddy, not tech-spec dumping, not discount-brand apologetic, not infomercial energy
- **Distance is the lead story.** Visual alignment tech is the differentiator. Feel and price are supporting.
- **Robot testing data (Golf Laboratories, 95mph)** is the credibility anchor — always cite as independent 3rd-party

---

## MODEL ASSIGNMENT TABLE (MANDATORY)

| Subagent Type | Skills | Model | Reason |
|---------------|--------|-------|--------|
| State management & infrastructure | 0.1-0.5 | haiku | Mechanical checks, no reasoning needed |
| Query generation | 1.0, 1.1 | sonnet | Structured output, moderate reasoning |
| Source discovery & validation | 1.2, 1.3 | sonnet | Search + evaluate, no deep analysis |
| ALL scrapers (parallel) | 1.4-A to 1.4-H | sonnet | Verbatim extraction is mechanical |
| Extraction, tagging, gate validation | 1.5, 1.6 | sonnet | Categorization + counting + threshold comparison |
| Intelligence analysis | 2.1-2.4 | opus | Deep pattern reasoning across 1000+ quotes |
| Synthesis | 2.5 | opus | Cross-cutting insight generation |
| RSF / Deep analysis | 2.8 | opus | Latent resonance field requires deep reasoning |
| Opportunity scoring & risk assessment | 3.1, 3.3 | opus | Strategic evaluation benefits from depth |
| Handoff assembly | 3.2 | sonnet | Structured assembly, not creative reasoning |

**Using a different model requires HUMAN APPROVAL with documented reason. "I thought it would be better" is NOT valid.**

---

## TOOL RESILIENCE CHAIN

| Platform | Primary Tool | Fallback 1 | Fallback 2 | Fallback 3 |
|----------|-------------|-----------|-----------|-----------|
| Reddit | Apify | Perplexity | Exa | WebFetch |
| GolfWRX Forums | Firecrawl | Apify | Perplexity | — |
| Amazon Reviews | Firecrawl | Apify | — | — |
| MyGolfSpy | Firecrawl | Apify | Perplexity | — |
| YouTube (comments) | Apify | — | — | — |
| Golf Digest / Golf.com | Firecrawl | Apify | Perplexity | — |
| Hackers Paradise | Firecrawl | Apify | Perplexity | — |
| Golf Monthly | Firecrawl | Apify | Perplexity | — |
| Facebook Golf Groups | Perplexity | Exa | — | — |

**NEVER halt because a single tool fails. Switch to fallback. ONLY halt if >50% of sources fail in a single step.**

**Blocked platforms:**
- Reddit via Firecrawl — use Apify
- Facebook direct scraping — use Perplexity for cached/indexed discussions

---

## SUBAGENT RULES

- Every scraping subagent MUST receive the Structured Subagent Context Template (below)
- Ad-hoc prompts like "scrape Reddit for quotes" are FORBIDDEN
- Each subagent must know: project name, bucket targets, platform, tool, query patterns
- The orchestrator MUST calculate each subagent's share based on parallel count, platform yield, and current deficit

### Structured Subagent Context Template (ALL 8 SECTIONS MANDATORY)

```
## TASK: [Skill Name] — [Platform/Source/Analysis Type]

### 1. MODEL (MANDATORY — from Model Selection Protocol)
model: [haiku | sonnet | opus] — looked up from Binding Model Assignment Table

### 2. PERSONA (MANDATORY — verbatim from Persona Library)
[Paste the FULL persona text from the Subagent Persona Library.
Do NOT summarize. Do NOT abbreviate. Copy the EXACT text.]

### 3. OBJECTIVE (MANDATORY)
[One sentence describing what this subagent must accomplish.]
Project context: This is part of a research pipeline targeting 1,000 total
verbatim quotes across 6 buckets.

### 4. QUOTE TARGETS (MANDATORY for Layer 1 subagents)
| Bucket | Project Target | Your Minimum Target | Current Project Count | Deficit |
|--------|---------------|--------------------|-----------------------|---------|
| Pain | 300 | [calculated share] | [current count] | [deficit] |
| Hope | 250 | [calculated share] | [current count] | [deficit] |
| Root Cause | 200 | [calculated share] | [current count] | [deficit] |
| Solutions Tried | 150 | [calculated share] | [current count] | [deficit] |
| Competitor Mechanism | 100 | [calculated share] | [current count] | [deficit] |
| Villain | 75 | [calculated share] | [current count] | [deficit] |
| TOTAL | 1,000 | [your share] | [current total] | [total deficit] |

### 5. INPUTS (MANDATORY)
- market_config.yaml path: ~outputs/ION/research/market_config.yaml
- research brief path: ~outputs/ION/research/ion-brief.md
- [any additional input files relevant to this specific task]

### 6. CONSTRAINTS (MANDATORY)
- ALL quotes must be VERBATIM with source attribution (URL, author, date)
- NEVER fabricate or paraphrase quotes
- If a platform blocks scraping, use fallback chain
- If target cannot be met, REPORT exact shortfall — do NOT claim targets met
- [any task-specific constraints]

### 7. EXPANSION PROTOCOL (MANDATORY for Layer 1 subagents)
If initial search yields < your assigned target:
- Generate 5+ additional targeted queries for deficit buckets
- Scrape 3+ additional sources per deficit bucket
- Report final counts with honest deficit assessment
- NEVER stop at "good enough" — meet the target or report exact shortfall

### 8. OUTPUT FORMAT (MANDATORY)
For each quote:
- quote: "[exact verbatim text]"
  source: "[URL]"
  author: "[username/name]"
  date: "[date if available]"
  bucket: "[PAIN/HOPE/ROOT_CAUSE/SOLUTIONS_TRIED/COMPETITOR_MECHANISM/VILLAIN]"
  scores:
    emotional_intensity: [1-10]
    specificity: [1-10]
    copy_usefulness: [1-10]
    composite: [average]
  top_tier: [true/false]

Final output MUST include:
- All extracted quotes in the format above
- Summary count table: actual vs target per bucket
- Deficit report for any bucket where target was not met
- List of additional URLs identified but not yet scraped (for expansion rounds)
```

**IF ANY OF THE 8 SECTIONS IS MISSING → DO NOT SPAWN. COMPLETE THE TEMPLATE FIRST.**

---

## MANDATORY 3-ROUND EXPANSION LOOP

When Gate 1 validation fails (total < 1,000 OR any bucket below minimum):

**Round 1:** Identify deficit buckets → Generate 10+ new queries per deficit → Target 3+ new sources per deficit → Scrape → Recount
**Round 2:** If still failing → Expand to tier_2 and tier_3 platforms → Generate lateral queries (synonyms, adjacent topics) → Scrape → Recount
**Round 3:** If still failing → Add unexplored source types (competitor review pages, older threads, adjacent subreddits) → Scrape → Recount

**All 3 rounds are REQUIRED before escalating to human. Not "up to 3." All 3.**

---

## BRAND COMPLIANCE

- "Conforms to the rules of golf" (NEVER "USGA approved")
- Hank Haney = "Tiger's FORMER coach"
- Jack Nicklaus = "Golfer of the Century Jack Nicklaus"
- Forbidden names: Golf Fanatic, Moe Norman, Dustin Johnson, Titleist, Sir Nick Faldo
- No overhype, no fabricated claims
- See WORKSPACE.md Tier 2 for full copy restrictions

---

## FILE PATHS (for subagent reference)

| File | Path |
|------|------|
| Research brief | `~outputs/ION/research/ion-brief.md` |
| Market config | `~outputs/ION/research/market_config.yaml` |
| Soul.md | `~outputs/ION/Soul.md` |
| Project state | `~outputs/ION/research/PROJECT-STATE.md` |
| Progress log | `~outputs/ION/research/PROGRESS-LOG.md` |
| This file | `~outputs/ION/research/CLAUDE.md` |
| Orchestrator | `00-deep-research/01-research/research-orchestrator.md` |
| PRD | `00-deep-research/01-research/RESEARCH-PRD.md` |
| Enforcement gates | `00-deep-research/01-research/ENFORCEMENT-GATES.md` |
| Anti-degradation | `00-deep-research/01-research/RESEARCH-ANTI-DEGRADATION.md` |
| Subagent templates | `00-deep-research/01-research/research-subagent-templates.md` |
| Layer specs | `00-deep-research/01-research/research-layer-specs.md` |

All paths relative to `_performance-golf/pg-marketing-os/`
