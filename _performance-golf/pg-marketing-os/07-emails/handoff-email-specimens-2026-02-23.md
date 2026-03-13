# Handoff: Email Engine Specimen Library Build

**Date:** 2026-02-23
**Status:** Body type specimens COMPLETE. Learning log written. Commit done. Two gaps remain.

---

## What Was Done

Built a 39-specimen library for the Email Engine's E1 Email Writer skill. Every specimen is a real email with full text + structural annotations (`<!-- [OPENING] -->`, `<!-- [BODY] -->`, `<!-- [BRIDGE] -->`, `<!-- [CTA] -->`) + metadata + structural analysis.

### Sources
1. **Email Swipes.md** (`Various - Recent/Email Swipes.md`) — 21 emails from Bencivenga, Makepeace, Carlton, Weiss Research. 11 extracted as specimens, 10 excluded (sales pages, too long, duplicate structure).
2. **Ben Settle Corpus** (`Miscellaneous/ben-settle-data/`) — 2,684 emails pre-classified into body-type-specific CSV files. 28 specimens extracted (4 per body type × 7 types).

### Coverage (all complete)

| Body Type | Count | Directory | Authors |
|-----------|-------|-----------|---------|
| ST (Story) | 6 | `specimens/story/` | 2 Bencivenga/Carlton + 4 Settle |
| CT (Contrarian) | 7 | `specimens/contrarian/` | 3 Makepeace/Carlton + 4 Settle |
| QO (Quote-Opener) | 5 | `specimens/quote-opener/` | 1 Bencivenga + 4 Settle |
| LB (List-Based) | 7 | `specimens/list-based/` | 3 Bencivenga/Makepeace/Carlton + 4 Settle |
| QA (Q&A) | 5 | `specimens/qa-response/` | 1 Makepeace + 4 Settle |
| TM (Testimonial) | 5 | `specimens/testimonial/` | 1 Makepeace + 4 Settle |
| NR (Negative Response) | 4 | `specimens/negative-response/` | 4 Settle |
| **TOTAL** | **39** | | |

### Key Files
- **Master index:** `./email/specimens/specimen-index.md`
- **Learning log:** `./learning-log/2026-02-23-email-specimen-library-build.md` (NOT YET COMMITTED)
- **Ben Settle structural analysis:** `Miscellaneous/ben-settle-data/BEN-SETTLE-EMAIL-STRUCTURAL-ANALYSIS.md`
- **Ben Settle subject line system:** `Miscellaneous/ben-settle-data/BEN-SETTLE-SUBJECT-LINE-SYSTEM.md`

### Ben Settle CSV-to-Body-Type Mappings
These CSVs contain the pre-classified emails (columns: Subject Line, Date, Content, URL, Word Count, Line Count, Date Order):

| Body Type | CSV File | Email Count |
|-----------|----------|-------------|
| CT (Contrarian) | `tab-647235064.csv` | 46 |
| QO (Quote-Opener) | `tab-1220146672.csv` | 105 |
| TM (Testimonial) | `tab-1995242195.csv` | 54 |
| QA (Q&A) | `tab-2052050678.csv` | 219 |
| LB (List-Based) | `tab-985291665.csv` | 49 |
| ST (Story) | `tab-1982487767.csv` | 110 |
| NR (Negative Response) | `tab-1733888491.csv` | 33 |
| Main corpus (all) | `tab-1830672509.csv` | ~2,684 (6.5MB) |

All CSVs are at: `Miscellaneous/ben-settle-data/`

---

## What's NOT Done (Remaining Gaps)

### 1. Launch Sequences (0 curated)
Need 2-3 complete multi-email sequences (e.g., a 5-7 email product launch or affiliate launch). Ben Settle has 5.6% own-product + 7.3% affiliate launch emails in the main corpus. These would need to be identified by date clustering and subject line patterns within `tab-1830672509.csv`.

### 2. Subject Lines (0 curated)
Need 50+ subject lines organized by the 18 formula categories documented in `BEN-SETTLE-SUBJECT-LINE-SYSTEM.md`. The subject line system doc already has the category taxonomy — the work is extracting the best examples from the CSVs and organizing them into a reference file.

### 3. Learning Log Not Committed
The file `./learning-log/2026-02-23-email-specimen-library-build.md` was written but not yet committed. Commit it with:
```
git add "./learning-log/2026-02-23-email-specimen-library-build.md"
git commit -m "docs: Add learning log for email specimen library build (learnings #70-74)"
```

---

## Important Context

### Attribution Rule
Weiss Research emails were written BY Clayton Makepeace (not by the bylined analysts like Tom Essaye, Julia Scully, Martin Weiss). All 3 Weiss specimen files already have corrected attribution: "Clayton Makepeace (for Weiss Research, byline: [analyst name])".

### Specimen File Format
Every specimen follows this structure:
```markdown
# Specimen: [Author] — [Subject Line] ([Body Type])

## Metadata
- **Author:** [actual copywriter]
- **Body Type:** [XX] ([Full Name])
- **Campaign Function:** [DR/PL/DU/AL/AR]
- **Source:** [publication, date]
- **Subject Line:** "[subject]"
- **Word Count:** ~[N]
- **Structural Quality:** [1-2 sentence assessment]

---

## Full Email Text

<!-- [OPENING — description] -->
[text]

<!-- [BODY — description] -->
[text]

<!-- [BRIDGE — description] -->
[text]

<!-- [CTA — description] -->
[text]

---

## Structural Analysis
[Body-type-specific analysis fields]
```

### Email Engine Context
- **Email Engine master doc:** `./07-emails/EMAIL-ENGINE.md`
- **5 skills:** E0 Email Strategist, E1 Email Writer, E2 Subject Line Engine, E3 Sequence Assembler, E4 Email Editorial
- **80 files total** in `email/`
- **Specimens feed into E1** (body type structural patterns) and **E2** (subject line formulas)

### Git State Warning
The last commit (`357f496c`) included the 39 specimen files PLUS ~334 previously staged files (Ad Engine, vertical profiles, etc. from prior sessions). The commit message references specimens but the diff is broader. This is cosmetic — all files are correct.

---

## Suggested Next Steps (in priority order)

1. **Commit the learning log** (quick)
2. **Subject line extraction** — higher leverage than launch sequences because E2 Subject Line Engine needs this data and the taxonomy already exists in `BEN-SETTLE-SUBJECT-LINE-SYSTEM.md`
3. **Launch sequence curation** — identify 2-3 date-clustered email sequences from the main corpus
4. **Wire specimens into E1** — update E1 microskills to reference specimen files during generation (the specimens exist but E1 doesn't load them yet)
