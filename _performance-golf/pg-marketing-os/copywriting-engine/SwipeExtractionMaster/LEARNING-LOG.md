# Extraction System Learning Log

A running record of incidents, discoveries, and improvements to the SwipeExtractionMaster system.

---

## Entry 001: Fabrication from Abbreviated Metadata

**Date:** 2026-01-28
**Severity:** HIGH
**Status:** RESOLVED

### Incident Summary

88 tier-1 extractions were generated from `arsenal_` prefix JSON files that contained abbreviated metadata (20-word descriptions) instead of actual sales copy (500-1000 words). The extractions claimed impossible metrics like "950 words extracted" and "95% confidence" from 22-word sources.

### Technical Cause

The validation rule checked for **file existence** but not **content validity**:

```markdown
# INSUFFICIENT RULE (before)
"Source must exist: Verify the file path is valid before saving extraction"
```

The arsenal_ JSON files existed and had populated fields — they just contained descriptions instead of actual copy.

### Why the LLM Fabricated

1. **Completion bias:** LLMs are trained to produce coherent outputs
2. **No HALT condition:** Rules said "don't create if source not found" — source WAS found
3. **No cross-validation:** Output claims were never compared to source reality
4. **Self-reported metrics:** Model generated 95% confidence without ground-truth anchor

### Resolution

Added to `EXTRACTION-AGENT-INSTRUCTIONS-V2.md`:

1. **PRE-EXTRACTION VALIDATION GATE**
   - Word count ≥500 required
   - Descriptor phrase detection (rejects metadata)
   - Prose structure check
   - arsenal_ prefix detection with redirect to markdown sources

2. **POST-EXTRACTION VALIDATION GATE**
   - Output cannot exceed source word count by >50%
   - Proof elements capped at source_words/40
   - Confidence anchored to source size

3. **PROVENANCE CHAIN**
   - Source word count recorded
   - All validation gates logged
   - Content hash for verification

### Key Learning

> **File existence ≠ Content validity**
>
> A validation rule that checks "does the file exist?" is fundamentally different from "does the file contain what we need?" When processing data through LLMs, the second check is mandatory because models will extrapolate from insufficient data rather than halt.

### Prevention Pattern

```
BEFORE processing ANY source:
1. Verify file exists (necessary but not sufficient)
2. Verify content meets minimum threshold (word count, structure)
3. Verify content type matches expected format (prose vs metadata)
4. Log all validation results in output provenance

IF any check fails → HALT + ALERT_USER
NEVER proceed with fabrication fallback
```

### References

- Session Log: `SESSION-LOGS/2026-01-28_fabrication-incident.md`
- Updated Instructions: `EXTRACTION-AGENT-INSTRUCTIONS-V2.md` (MANDATORY VALIDATION GATES section)
- Re-extraction Queue: `../TIER1_EXTRACTIONS/ARSENAL_REEXTRACTION_QUEUE.md`
- Actual Arsenal Sources: `/BigIdeaEngine/Data/Cleaned_Swipe_File/107 GREATEST Ads.../`

---

## Entry Template (for future entries)

```markdown
## Entry XXX: [Title]

**Date:** YYYY-MM-DD
**Severity:** LOW | MEDIUM | HIGH | CRITICAL
**Status:** OPEN | INVESTIGATING | RESOLVED

### Incident Summary
[What happened]

### Technical Cause
[Why it happened]

### Resolution
[What was done to fix it]

### Key Learning
[The generalizable lesson]

### Prevention Pattern
[Code/rules to prevent recurrence]

### References
[Links to related files]
```

---

**Log Maintainer:** CopywritingEngine System
**Last Updated:** 2026-01-28
