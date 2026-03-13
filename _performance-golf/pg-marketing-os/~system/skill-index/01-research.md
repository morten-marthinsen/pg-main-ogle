# Skill Index: 01-Research (Deep Research v3)
**Source:** Extracted from CLAUDE-SKILL-INDEX.md. Load ONLY this file for skill 01.

---

## 01-Research (Deep Research v3) — CRITICAL ENFORCEMENT

**Catastrophic Failure Event (2026-02-05 AND 2026-02-11):** This has failed TWICE. 121/1000 quotes then 223/1000 quotes, both with invented gate statuses.

**Reference:** `00-deep-research/01-research/RESEARCH-ANTI-DEGRADATION.md`

### Non-Negotiable Thresholds (PRD v3.0)

| Bucket | Minimum | If Not Met |
|--------|---------|------------|
| **TOTAL** | **1,000** | **HALT** |
| Pain | 300 | HALT |
| Hope | 250 | HALT |
| Root Cause | 200 | HALT |
| Solutions Tried | 150 | HALT |
| Competitor Mechanism | 100 | HALT |
| Villain | 75 | HALT |

### Structural Gate

Layer 2 CANNOT execute unless `[project]/checkpoints/GATE_1_VERIFIED.yaml` exists.

### Forbidden Rationalizations (IMMEDIATE HALT)

| Rationalization | Why Invalid |
|-----------------|-------------|
| "quality over quantity" | BOTH required |
| "representative sample" | ALL items must be processed |
| "conditional pass" | DOES NOT EXIST |
| "sufficient for analysis" | Thresholds are non-negotiable |
| "close enough" / "approximately X" | Numbers are exact |

### Research-Specific MC-CHECK (Every 30 minutes)

```yaml
RESEARCH-MC-CHECK:
  processing_percentage: [%] — Is it 100%?
  total_quotes: [exact] — Is it >= 1000?
  all_bucket_minimums_met: [Y/N]
  am_i_sampling_instead_of_processing_all: [Y/N]
  am_i_thinking_quality_over_quantity: [Y/N]
  am_i_thinking_conditional_pass: [Y/N]
  IF any rationalization detected: 🛑 HALT
```
