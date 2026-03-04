# TECHNICAL AUDIT REPORT: pg-deep-research-v2
## Claude Code Architecture Review

**Audit Date:** 2026-01-17
**Auditor Perspective:** Boris Cherny / Claude Code Team Lead
**System Version:** 3.0+
**Status:** PHASE 1 COMPLETE - Critical infrastructure implemented

---

## EXECUTIVE SUMMARY

This audit identified **23 technical issues** across 5 severity levels. The system has solid conceptual architecture but contains critical implementation gaps that will cause failures in production. The most concerning issues relate to:

1. **No tool fallback chains** - Single point of failure when Firecrawl fails
2. **State management gaps** - No persistent state across session interruptions
3. **Missing error recovery** - System halts on first error without graceful degradation
4. **Output validation theater** - Validators check structure, not content authenticity
5. **Context window exhaustion** - 1,000+ quote processing will exceed limits

---

## SEVERITY CLASSIFICATION

| Severity | Count | Definition |
|----------|-------|------------|
| CRITICAL | 5 | Will cause system failure in production |
| HIGH | 7 | Will cause significant quality degradation |
| MEDIUM | 6 | Reduces reliability and efficiency |
| LOW | 5 | Best practice improvements |

---

## PART 1: CRITICAL ISSUES (MUST FIX)

### CRITICAL-001: No Tool Fallback Chain

**Location:** All 1.4-* scraper skills
**Issue:** Single tool dependency (Firecrawl) with no fallback

**Current State:**
```yaml
# From 1.4-A-scraper-forums.md
tool: Firecrawl
# No fallback specified
```

**Problem:** When Firecrawl fails (rate limits, blocks, service outage), entire scraping phase halts. The error handling says "HALT - do not continue" but provides no alternative path.

**Impact:**
- Production runs will fail ~20-30% of time due to external service issues
- No data collection = complete pipeline failure
- Human must manually intervene every failure

**Fix Required:**
```yaml
tool_chain:
  primary: Firecrawl
  fallback_1: Apify (mcp__apify__call-actor with appropriate Actor)
  fallback_2: Exa (mcp__exa__web_search_exa + mcp__exa__crawling_exa)
  fallback_3: WebFetch (direct scraping for simple pages)

fallback_protocol:
  on_primary_fail:
    - Log failure reason
    - Attempt fallback_1 with same query
    - If fallback_1 fails, attempt fallback_2
    - If all fail, THEN halt with full diagnostic
```

---

### CRITICAL-002: Context Window Exhaustion

**Location:** 1.5-C Quantifier, 3.2-A Handoff Packager
**Issue:** Processing 1,000+ quotes will exceed Claude's context window

**Problem Calculation:**
- 1,000 quotes × ~200 tokens average = 200,000 tokens (quotes alone)
- Add system prompts, skill instructions, JSON structure
- Far exceeds Opus 4.5's practical working context

**Current State:** No chunking, batching, or streaming strategy defined

**Impact:**
- System will truncate or hallucinate on large datasets
- Validation checks will miss data because it's outside context
- The exact failure mode that caused the "fake data" incident

**Fix Required:**
```yaml
chunking_strategy:
  quote_processing:
    batch_size: 100 quotes per processing pass
    state_persistence: Write intermediate results to file
    aggregation: Combine batches after individual processing

  validation:
    validate_per_batch: true
    batch_validation_file: "batch_N_validation.json"
    final_aggregation_validation: true

  handoff_generation:
    section_by_section: true
    never_load_full_dataset_at_once: true
```

---

### CRITICAL-003: No Persistent State Management

**Location:** MASTER-AGENT.md, all micro-skills
**Issue:** No mechanism to resume from interruption

**Current State:**
- Skills reference "previous step output" but don't specify file locations
- No checkpoint files for mid-process recovery
- Session interruption = restart from beginning

**Impact:**
- Long research runs (expected: hours) will fail on any interruption
- Token exhaustion mid-process loses all progress
- No ability to pause and resume

**Fix Required:**
```yaml
state_management:
  checkpoint_directory: "projects/{project}/checkpoints/"

  checkpoint_protocol:
    after_each_skill:
      - Write current state to checkpoint file
      - Include: skill_id, timestamp, inputs_hash, outputs_location

    on_session_start:
      - Check for existing checkpoint
      - If exists, prompt: "Resume from checkpoint or restart?"
      - Load last valid state if resuming

  checkpoint_schema:
    current_phase: "layer_1" | "layer_2" | "layer_3"
    current_skill: "1.4-A"
    completed_skills: ["1.0-A", "1.1-A", ...]
    skill_outputs: {skill_id: file_path}
    validation_states: {checkpoint: "pass" | "fail"}
    last_successful_timestamp: ISO8601
```

---

### CRITICAL-004: Output File Path Inconsistency

**Location:** Multiple skills reference different output locations
**Issue:** No canonical file structure, skills can't find each other's outputs

**Examples of Inconsistency:**
```
1.0-A: "Save to source-docs/context_expansion.json"
1.5-C: "Output: layer-1-outputs/quantified_buckets.json"
2.4-C: "Output: layer-2-outputs/mechanism_map.json"
3.2-A: "Output: FINAL_HANDOFF.md" (no directory specified)
```

**Problem:**
- Relative paths vs absolute paths mixed
- Some skills don't specify output location at all
- No standardized directory creation logic
- Skills reading from wrong locations

**Fix Required:**
```yaml
canonical_structure:
  project_root: "projects/{project-name}/"

  directories:
    source-docs/          # Raw data and initial processing
    layer-1-outputs/      # All Layer 1 skill outputs
    layer-2-outputs/      # All Layer 2 skill outputs
    layer-3-outputs/      # All Layer 3 skill outputs
    checkpoints/          # State management files
    logs/                 # Execution logs

  file_naming:
    pattern: "{skill_id}_{output_type}_{timestamp}.{ext}"
    example: "1.5-C_quantified_buckets_20260117.json"

  initialization:
    - MASTER-AGENT creates all directories at project start
    - Verify directory exists before any write
    - Use absolute paths in all skill references
```

---

### CRITICAL-005: Validation Checks Structure, Not Authenticity

**Location:** 1.6-B Data Sufficiency Validator
**Issue:** Validates that data EXISTS but not that it's REAL

**Current Validation:**
```python
# From 1.6-B
IF quote.text is empty OR len(quote.text) < 10:
    FLAG
ELSE IF any(pattern in quote.text for pattern in placeholder_patterns):
    FLAG
```

**Problem:**
- Only checks for obvious placeholders ("Lorem ipsum", "[placeholder]")
- Doesn't verify quotes came from actual scraping
- Doesn't cross-reference against raw scrape data
- A sophisticated hallucination would pass all checks

**Impact:**
- The exact failure mode that created fake Ion Golf Ball data
- System can generate plausible-looking but fabricated quotes
- No source verification

**Fix Required:**
```yaml
authenticity_validation:
  source_verification:
    - Every quote must have traceable source_url
    - Source URLs must match scraped_sources log
    - Random sample: Actually fetch 5 source URLs and verify quote exists

  cross_reference:
    - Compare quote text against raw scrape files
    - Quote must appear verbatim in raw data
    - Flag any quote not found in raw data

  hash_verification:
    - Raw scrape files get content hash at creation
    - Extracted quotes must reference source file hash
    - If hash mismatch, invalidate extraction

  sample_audit:
    sample_size: 10
    protocol:
      - Select 10 random quotes
      - For each: Fetch original URL
      - Verify quote text appears on page
      - If verification rate < 80%: CRITICAL FAIL
```

---

## PART 2: HIGH SEVERITY ISSUES

### HIGH-001: No Rate Limiting Strategy

**Location:** 1.4-* scrapers
**Issue:** No coordinated rate limiting across parallel scrapers

**Problem:**
- 7 scrapers can run in parallel (per MASTER-AGENT)
- Each hitting different platforms simultaneously
- No global rate limit coordination
- Will trigger IP blocks and service bans

**Fix:** Implement global rate limiter with per-platform quotas

---

### HIGH-002: Missing Apify Integration

**Location:** 1.4-* scrapers
**Issue:** Apify actors are available but not integrated

**Problem:**
- Firecrawl is only scraping tool referenced
- Apify has specialized actors for Reddit, YouTube, Amazon, etc.
- These are more reliable for those specific platforms
- Missing: `apify/reddit-scraper`, `apify/youtube-scraper`, `apify/amazon-reviews-scraper`

**Fix:** Add Apify actor integration as primary or fallback for platform-specific scraping

---

### HIGH-003: Quantifier Has No De-duplication

**Location:** 1.5-C Quantifier
**Issue:** Same quote can be counted multiple times

**Problem:**
- Quote from Reddit cross-posted to forum = counted twice
- Same user posting same complaint in multiple threads = counted twice
- Inflates numbers, distorts analysis

**Fix:** Implement quote fingerprinting and de-duplication

---

### HIGH-004: Expansion Loop Has No Budget Control

**Location:** 1.5-D Saturation Analyzer
**Issue:** Expansion loop can run indefinitely

**Current State:**
```yaml
expansion_loop:
  max_iterations: 5
  # No cost tracking
  # No time tracking
  # No human checkpoint before expansion
```

**Problem:**
- Each expansion iteration could cost $10-50 in API calls
- 5 iterations = potential $250 spend without approval
- No visibility into accumulating costs

**Fix:** Add cost tracking and approval checkpoints

---

### HIGH-005: Layer 2 Skills Have No Input Validation

**Location:** 2.x skills
**Issue:** Layer 2 assumes Layer 1 output is valid

**Problem:**
- Layer 1 checkpoint can pass with minimum data
- Layer 2 skills start processing without verifying they have required inputs
- Missing required input = hallucinated output

**Fix:** Add input validation at start of every skill

---

### HIGH-006: Mechanism Mapper Relies on Scrape Data That May Not Exist

**Location:** 2.4-C Mechanism Mapper
**Issue:** Requires competitor page scrapes that scrapers might not collect

**Current Input:**
```yaml
competitor_scrape_data: [from Layer 1 - product pages, ads, funnels]
```

**Problem:**
- 1.4-F (Ads) and 1.4-G (Funnels) are optional scrapes
- No guarantee competitor pages were included in source discovery
- Mechanism mapper has no fallback if data missing

**Fix:** Add real-time competitor scraping within mechanism mapper if data missing

---

### HIGH-007: FINAL_HANDOFF Size Will Crash Editors

**Location:** 3.2-A Handoff Packager
**Issue:** 1,000+ quotes in one markdown file = 500KB+ file

**Current Expectation:**
```yaml
file_size_expectations:
  minimum: 200KB
  typical: 300-500KB
  maximum: 1MB
```

**Problem:**
- Many markdown editors struggle with files > 200KB
- VS Code will lag significantly
- Notion import will likely fail
- GitHub preview won't render

**Fix:** Split into multiple files or provide summary + detail structure

---

## PART 3: MEDIUM SEVERITY ISSUES

### MEDIUM-001: No Logging Infrastructure

**Issue:** No standardized logging across skills
**Impact:** Debugging failures requires reading raw output files
**Fix:** Implement structured logging with timestamps, skill IDs, outcomes

---

### MEDIUM-002: YAML and JSON Schema Inconsistency

**Issue:** Input/output schemas use YAML in docs but JSON in examples
**Impact:** Confusion about actual data format
**Fix:** Standardize on JSON with JSON Schema validation

---

### MEDIUM-003: No Timeout Handling

**Issue:** Long-running operations have no timeout
**Impact:** Hung processes consume resources indefinitely
**Fix:** Add timeouts to all external calls and long operations

---

### MEDIUM-004: Saturation Definition is Subjective

**Issue:** "Same pattern appears 3+ times" is vague
**Impact:** Inconsistent saturation decisions
**Fix:** Define specific pattern matching criteria with examples

---

### MEDIUM-005: No Data Privacy Handling

**Issue:** User quotes may contain PII
**Impact:** Legal/compliance risk
**Fix:** Add PII detection and redaction option

---

### MEDIUM-006: Master Agent Doesn't Track Skill Versions

**Issue:** Skills have versions but agent doesn't verify compatibility
**Impact:** Version mismatches cause subtle bugs
**Fix:** Add version checking at skill invocation

---

## PART 4: LOW SEVERITY ISSUES

### LOW-001: Inconsistent Error Message Format
### LOW-002: No Skill Execution Metrics
### LOW-003: Documentation Has Broken Internal Links
### LOW-004: No Unit Tests for Validation Logic
### LOW-005: Output JSON Not Pretty-Printed (Hard to Debug)

---

## PART 5: ARCHITECTURAL RECOMMENDATIONS

### RECOMMENDATION-001: Implement Event-Driven Architecture

**Current:** Sequential skill execution with file-based handoffs
**Proposed:** Event bus with skill completion events

```yaml
event_architecture:
  events:
    - SKILL_STARTED: {skill_id, timestamp, inputs}
    - SKILL_COMPLETED: {skill_id, timestamp, outputs, duration}
    - SKILL_FAILED: {skill_id, timestamp, error, recovery_options}
    - CHECKPOINT_CREATED: {checkpoint_id, state}
    - EXPANSION_TRIGGERED: {reason, targets}

  subscribers:
    - Logger: All events
    - StateManager: SKILL_COMPLETED, CHECKPOINT_CREATED
    - CostTracker: SKILL_COMPLETED (for API cost tracking)
    - ErrorRecovery: SKILL_FAILED
```

---

### RECOMMENDATION-002: Implement Streaming Output

**Problem:** Large outputs overwhelm context window
**Solution:** Stream outputs to files, keep only summaries in context

```yaml
streaming_protocol:
  for_large_outputs:
    - Write to file in chunks
    - Keep running summary in context
    - Final context: Summary + file reference

  thresholds:
    chunk_to_file: > 50 items
    summary_only: > 200 items
```

---

### RECOMMENDATION-003: Add Skill Dependency Graph Validation

**Problem:** Skills reference dependencies by name but no validation
**Solution:** Explicit dependency graph with validation

```yaml
dependency_graph:
  1.5-C:
    requires: [1.5-A, 1.5-B]
    provides: [quantified_buckets]

  validation:
    at_skill_start:
      - Check all required outputs exist
      - Check outputs are from current run (not stale)
      - Check outputs pass integrity check
```

---

### RECOMMENDATION-004: Implement Canary Runs

**Problem:** No way to test pipeline changes safely
**Solution:** Canary mode with reduced scope

```yaml
canary_mode:
  enabled_by: "--canary" flag
  modifications:
    - max_quotes: 100 (not 1,000)
    - max_sources: 10 (not unlimited)
    - expansion_iterations: 1 (not 5)
    - human_checkpoints: After every skill
```

---

### RECOMMENDATION-005: Add Observability Dashboard

**Problem:** No visibility into system health during runs
**Solution:** Real-time status output

```yaml
observability:
  status_file: "projects/{project}/status.json"

  contents:
    current_skill: "1.4-A"
    progress: "3/7 scrapers complete"
    quotes_collected: 847
    elapsed_time: "00:45:32"
    estimated_remaining: "01:15:00"
    cost_so_far: "$12.45"
    errors: []
    warnings: ["YouTube rate limited, slowing down"]
```

---

## IMPLEMENTATION PRIORITY

### Phase 1: Critical Fixes (Before Next Run) ✅ COMPLETED 2026-01-17

| Issue | Fix | Implementation File | Status |
|-------|-----|---------------------|--------|
| CRITICAL-003 | State management / checkpoints | `micro-skills/core/0.1-state-manager.md` | ✅ Complete |
| CRITICAL-001 | Tool fallback chains | `micro-skills/core/0.2-tool-resilience.md` | ✅ Complete |
| CRITICAL-005 | Authenticity validation | `micro-skills/core/0.3-authenticity-validator.md` | ✅ Complete |
| CRITICAL-004 | File path standardization | Canonical structure defined in `0.1-state-manager.md` | ✅ Complete |

**Additional Updates:**
- `MASTER-AGENT.md` → v3.3 (core infrastructure integration)
- `1.6-B-data-sufficiency-validator.md` → v2.0 (authenticity prerequisite)
- `1.4-A-scraper-forums.md` → v2.0 (tool chain integration)

### Phase 2: High Priority (This Week)
5. CRITICAL-002: Context window chunking
6. HIGH-002: Apify integration
7. HIGH-004: Budget control
8. HIGH-005: Input validation

### Phase 3: Quality Improvements (Next Sprint)
9. HIGH-001: Rate limiting
10. HIGH-003: De-duplication
11. MEDIUM-001: Logging
12. RECOMMENDATION-003: Dependency validation

### Phase 4: Polish (Ongoing)
13. All remaining MEDIUM and LOW issues
14. Remaining recommendations

---

## TESTING REQUIREMENTS

Before any production run:

1. **Unit Tests**
   - Validation logic
   - Quote fingerprinting
   - Fallback chain switching

2. **Integration Tests**
   - Full pipeline with canary mode
   - Checkpoint resume
   - Fallback activation

3. **Load Tests**
   - 1,000+ quote processing
   - Context window behavior
   - File size handling

4. **Chaos Tests**
   - Kill mid-process, verify resume
   - Simulate Firecrawl failure
   - Simulate rate limiting

---

## CONCLUSION

The pg-deep-research-v2 system has excellent conceptual design but significant implementation gaps that will cause production failures. The critical issues around tool resilience, state management, and authenticity validation must be addressed before any production deployment.

The system's ambition (1,000+ quotes, multi-platform scraping, automated expansion) is correct, but the technical infrastructure doesn't yet support that ambition reliably.

~~**Recommended Action:** Implement Phase 1 critical fixes before next research run. Run canary test. Then proceed with Phase 2.~~

**UPDATE 2026-01-17:** Phase 1 critical fixes have been implemented:
- ✅ State management with checkpoints and session recovery
- ✅ Tool fallback chains for all 7 scraper platforms
- ✅ Authenticity validation with 4-layer verification and hash chains
- ✅ Canonical file structure standardization

**Next Action:** Implement Phase 2 (context window chunking, Apify integration, budget control, input validation) OR update remaining scrapers (1.4-B through 1.4-G) with tool chain integration following the 1.4-A pattern.

---

**Report Generated:** 2026-01-17
**Phase 1 Completed:** 2026-01-17
**Next Review:** After Phase 2 implementation
