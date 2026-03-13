# Context Budget Audit — Marketing-OS

**Generated:** 2026-03-07T17:26:51.131361
**Scope:** All 21 main pipeline skills (00-20)
**Method:** File size → token estimation (4 chars/token)

---

## Summary Table (Sorted by Total Load)

| Skill | Total KB | Est. Tokens | Universal KB | Skill KB | Zone |
|-------|---------|-------------|-------------|---------|------|
| 01-research | 2471.4 | 632,672 | 52.2 | 2419.1 | RED |
| 12-story | 1150.3 | 294,472 | 97.4 | 1052.9 | ORANGE |
| 06-big-idea | 794.3 | 203,351 | 91.3 | 703.1 | ORANGE |
| 04-mechanism | 771.3 | 197,441 | 91.3 | 680.0 | YELLOW |
| 17-close | 718.1 | 183,831 | 97.4 | 620.7 | YELLOW |
| 05-promise | 682.0 | 174,593 | 91.3 | 590.7 | YELLOW |
| 14-mechanism-narrative | 663.9 | 169,960 | 97.4 | 566.5 | YELLOW |
| 13-root-cause-narrative | 662.7 | 169,658 | 97.4 | 565.3 | YELLOW |
| 02-proof-inventory | 661.8 | 169,418 | 80.1 | 581.7 | YELLOW |
| 15-product-introduction | 643.7 | 164,791 | 97.4 | 546.3 | YELLOW |
| 16-offer-copy | 642.0 | 164,364 | 97.4 | 544.7 | YELLOW |
| 11-lead | 618.0 | 158,215 | 97.4 | 520.6 | YELLOW |
| 20-editorial | 603.1 | 154,392 | 97.4 | 505.7 | YELLOW |
| 03-root-cause | 570.7 | 146,094 | 91.3 | 479.4 | GREEN |
| 10-headlines | 491.5 | 125,826 | 97.4 | 394.1 | GREEN |
| 08-structure | 484.8 | 124,114 | 91.3 | 393.6 | GREEN |
| 07-offer | 471.8 | 120,784 | 91.3 | 380.5 | GREEN |
| 18-proof-weaving | 364.1 | 93,213 | 97.4 | 266.7 | GREEN |
| 19-campaign-assembly | 333.4 | 85,345 | 97.4 | 236.0 | GREEN |
| 09-campaign-brief | 259.1 | 66,324 | 91.3 | 167.8 | GREEN |
| 00-brief | 87.4 | 22,382 | 52.2 | 35.2 | GREEN |

---

## Universal Files Analysis

These files are loaded for EVERY skill execution:

| File | Size (KB) | Est. Tokens | Impact |
|------|----------|-------------|--------|
| CLAUDE-CORE.md | 25.3 | 6,466 | Per-skill overhead |
| ~~CLAUDE-SKILL-INDEX.md~~ → `skills/skill-index/[XX]-[name].md` | ~0.3-6.0 | ~75-1,500 | Per-skill (split — was 27.0KB / 6,904 tokens) |

## Conditional Files

| File | Size (KB) | Est. Tokens | Loaded By |
|------|----------|-------------|-----------|
| CLAUDE-ARENA.md | 11.2 | 2,857 | Arena skills (03-20) |
| CLAUDE-SPECIMENS.md | 6.1 | 1,564 | Generation skills (10-20) |
| pipeline-handoff-registry.md | 27.9 | 7,136 | Skills consuming upstream packages |

---

## Session-Level Totals

| Session | Skills | Combined Est. Tokens | Zone |
|---------|--------|---------------------|------|
| Session 1 | 01-research | 632,672 | RED |
| Session 2 | 02-proof-inventory, 03-root-cause, 04-mechanism, 05-promise | 687,546 | RED |
| Session 3 | 06-big-idea, 07-offer, 08-structure, 09-campaign-brief | 514,573 | RED |
| Session 4 | 10-headlines, 11-lead, 12-story, 13-root-cause-narrative | 748,171 | RED |
| Session 5 | 14-mechanism-narrative, 15-product-introduction, 16-offer-copy, 17-close | 682,946 | RED |
| Session 6 | 18-proof-weaving, 19-campaign-assembly, 20-editorial | 332,950 | ORANGE |

---

## Optimization Opportunities

### 1. CLAUDE-CORE.md Overhead
CLAUDE-CORE.md is 25.3KB (~6,466 tokens) and loaded for EVERY skill. This is 135,786 tokens of cumulative overhead across 21 skills. Consider conditional loading: skills 10-20 may not need the full foundation sections.

### 2. CLAUDE-SKILL-INDEX.md Loading
CLAUDE-SKILL-INDEX.md is 27.0KB (~6,904 tokens) but only the relevant skill's section is needed. If split into per-skill files, each skill would load only its own section (~328 tokens instead of 6,904).

### 3. Protocol Files
Multiple protocol files are loaded for every skill via EXECUTION-GUARDRAILS.md references. Consider which protocols are truly needed per skill vs. universally required.
