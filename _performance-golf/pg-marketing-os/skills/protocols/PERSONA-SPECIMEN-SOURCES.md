# Persona Specimen Sources — System 2 Voice Loading

**Version:** 1.0
**Created:** 2026-02-10
**Purpose:** Map verbatim copy specimens to their correct author/persona for System 2 persona voice loading
**Status:** IN PROGRESS — Halbert, Makepeace, Clemens, Schwartz, Ogilvy, Bencivenga scraped. Google Drive access + OCR pending.

---

## CRITICAL RULE

**ANY time verbatim specimens or source links are provided in a session, they MUST be written to THIS FILE immediately. Do NOT hold specimen attributions in conversation context only. Conversation history is lost between sessions.**

---

## How to Use This File

For each persona below:
1. Paste the URL or file path to the verbatim copy source
2. Note what type of copy it is (headline, lead, body, close, full control, etc.)
3. Note which skill(s) it's most relevant to (10-headlines, 11-lead, 12-story, etc.)

Once populated, Claude will extract the verbatim copy into persona-specific specimen files for System 2 loading.

---

## Persona 1: Clayton Makepeace

### Known Materials Already in Vault
- `skills/long-form/10-headlines/source-teachings/Makepeace/` — 17 files (headline formulas, voice patterns, templates)
- `Various - Recent/Makepeace on Headlines.md` (13KB) — 3 headline techniques + 30 examples
- `Various - Recent/Makepeace on Big Idea Themes.md` (57KB) — Theme selection interview
- `Various - Recent/Makepeace Speed Profits Control.md` (49KB) — Control copy
- `skills/long-form/17-close/source-teachings/Makepeace Closing.md` — Closing copy

### Verbatim Sources to Add (from Anthony 2026-02-14)
| Source (URL or File Path) | Copy Type | Status | Notes |
|---------------------------|-----------|--------|-------|
| `Various - Recent/Makepeace Speed Profits Control.md` (49KB) | Full control | LOCAL | Already in vault |
| `Legacy Swipe File (Raw)/Direct Mail FiINANCIAL Motherlode/Shameless_Sobs.pdf` | Full control | NEEDS PDF→MD | Existing MD conversion is trash per Anthony |
| `Cleaned_Swipe_File/Crème de la Crème Controls/Alt-Health Controls/17-Cent-Life-Saver-2020.md` | Full control | LOCAL | Cleaned MD exists |
| `Cleaned_Swipe_File/Direct Mail FiINANCIAL Motherlode/StockMarketLambs.md` | Full control | LOCAL | Cleaned MD exists |

---

## Persona 2: Gary Halbert

### Known Materials Already in Vault
- `skills/source-teachings/Gary-Halbert-Copy-Principles.md` (13KB) — Principles only, NOT verbatim copy
- `skills/long-form/20-editorial/source-teachings/02-Gary-Halbert-Research.md` — Editorial research

### Verbatim Sources to Add (from Anthony 2026-02-14)
| Source (URL or File Path) | Copy Type | Status | Notes |
|---------------------------|-----------|--------|-------|
| https://www.thegaryhalbertletter.com/Boron/ | The Boron Letters (25 chapters) | SCRAPED 2026-02-15 | ALL 25 chapters scraped via curl (content filter blocks subagents). ~230KB total. |
| https://www.thegaryhalbertletter.com/Newletter-archives-protected/newsletter-archives.htm | Newsletters + ads mixed | PARTIAL (2/many) | 2 newsletters scraped. Extensive archive remains — content filter blocks subagent scraping. |

### Scraped Specimen Files (2026-02-15)
| File | Content | Verbatim? |
|------|---------|-----------|
| `persona-specimens/02-gary-halbert/halbert-boron-ch01.md` through `ch25.md` | 25 Boron Letters chapters (June-July 1984) | YES |
| `persona-specimens/02-gary-halbert/halbert-newsletter-starving-crowd.md` | Newsletter on "starving crowd" concept | YES |
| `persona-specimens/02-gary-halbert/halbert-newsletter-killer-headlines.md` | Newsletter on headline techniques | YES |
| `persona-specimens/02-gary-halbert/MANIFEST.md` | Index of all files | N/A |

### Quality Assessment
- **Boron Letters (25 chapters):** EXCELLENT for voice loading. Halbert's most personal, conversational writing. Direct father-to-son instruction. Covers direct marketing fundamentals, copywriting technique, and life philosophy.
- **Newsletters (2 files):** Good for expanded voice range — more polished, teaching-mode Halbert.
- **Gap:** No actual Halbert AD COPY (sales letters, DM pieces) collected yet. The Boron Letters + newsletters capture his INSTRUCTIONAL voice. His SELLING voice would require scraping additional newsletter archive pages or finding his control ads.

---

## Persona 3: Eugene Schwartz

### Known Materials Already in Vault
- `skills/source-teachings/Eugene-Schwartz-Copy-Principles.md` (18KB) — Principles only, NOT verbatim copy
- `skills/long-form/20-editorial/source-teachings/01-Eugene-Schwartz-Breakthrough-Advertising.md` — Principles

### Verbatim Sources to Add (from Anthony 2026-02-14)
| Source (URL or File Path) | Copy Type | Status | Notes |
|---------------------------|-----------|--------|-------|
| https://swiped.co/person/eugene-schwartz/ | Ads/copy (10 ads) | SCRAPED 2026-02-14 | All 10 ad pages scraped. Body copy is IMAGE-ONLY (scanned print ads). Headlines, context, and Schwartz commentary extracted as text. See persona-specimens/03-eugene-schwartz/ |
| https://infomarketingblog.com/i-write-with-my-ears-schwartz/ | Essay (Schwartz process) | SCRAPED 2026-02-14 | COMPLETE verbatim "I Write With My Ears" essay by Schwartz. Saved to schwartz-i-write-with-my-ears.md |
| https://www.scientificadvertising.com/gsads/ | 204 headline list | SCRAPED 2026-02-14 | All 204 Schwartz headlines extracted and categorized. Saved to schwartz-204-headline-compendium.md |
| https://drive.google.com/drive/folders/1piNRDk4zol3VWIlt8RH1cv3SaqcX0hsS | Ads/copy | NEEDS GDRIVE | Decent length files available |

### Scraped Specimen Files (2026-02-14)
| File | Content | Verbatim? |
|------|---------|-----------|
| `persona-specimens/03-eugene-schwartz/schwartz-i-write-with-my-ears.md` | Complete Schwartz process essay | YES |
| `persona-specimens/03-eugene-schwartz/schwartz-204-headline-compendium.md` | 204 headlines + pattern analysis | YES (headlines) |
| `persona-specimens/03-eugene-schwartz/schwartz-burn-disease.md` | Ad + Schwartz interview quotes | PARTIAL |
| `persona-specimens/03-eugene-schwartz/schwartz-boardroom-reports.md` | Ad headline + context | HEADLINE ONLY |
| `persona-specimens/03-eugene-schwartz/schwartz-over-thirty.md` | Ad headline + context | HEADLINE ONLY |
| `persona-specimens/03-eugene-schwartz/schwartz-miracle-diet-arthritis.md` | Ad headline + context | HEADLINE ONLY |
| `persona-specimens/03-eugene-schwartz/schwartz-swedish-miracle-formula.md` | Ad headline + context | HEADLINE ONLY |
| `persona-specimens/03-eugene-schwartz/schwartz-british-miracle-super-plants.md` | Ad headline + context | HEADLINE ONLY |
| `persona-specimens/03-eugene-schwartz/schwartz-miracle-drug-reverses-aging.md` | Ad headline + context | HEADLINE ONLY |
| `persona-specimens/03-eugene-schwartz/schwartz-models-stay-young.md` | Ad headline + context | HEADLINE ONLY |
| `persona-specimens/03-eugene-schwartz/schwartz-half-a-million.md` | Ad headline + context | HEADLINE ONLY |
| `persona-specimens/03-eugene-schwartz/schwartz-food-best-medicine.md` | Ad headline + context | HEADLINE ONLY |
| `persona-specimens/03-eugene-schwartz/MANIFEST.md` | Index of all files | N/A |

### Scraped Specimen Quality Audit (2026-02-15)

**Overall:** Most Schwartz swiped.co files are THIN (700B-1.5KB) — headlines + context metadata only. Body copy is in IMAGE SCANS requiring OCR.

**Files with meaningful text content (3 of 15):**
| File | Content Quality | Size |
|------|----------------|------|
| `schwartz-how-to-use-your-hands.md` | Complete sales letter verbatim (~2000 words) | 8.9KB |
| `schwartz-i-write-with-my-ears.md` | FULL Schwartz process essay (verbatim) | 4.6KB |
| `schwartz-burn-disease.md` | Interview quotes + commentary | 3.0KB |

**Also useful:**
| File | Content Quality | Size |
|------|----------------|------|
| `schwartz-204-headline-compendium.md` | 204 headlines categorized — excellent for pattern analysis | 14KB |

**Remaining ~10 files:** Headlines + context only (no body copy text).

### Next Steps for Full Verbatim
- OCR the swiped.co image scans (URLs in each file) for full body copy
- Access Google Drive folder for additional text-based specimens
- Consider Scientific Advertising package ($297) for 204 cleaned ad scans as JPGs

---

## Persona 4: David Ogilvy

### Known Materials Already in Vault
- `skills/source-teachings/Ogilvy-Advertising-Principles.md` (12KB) — Principles only, NOT verbatim copy

### Verbatim Sources to Add (from Anthony 2026-02-14)
| Source (URL or File Path) | Copy Type | Status | Notes |
|---------------------------|-----------|--------|-------|
| https://swiped.co/person/david-ogilvy/ | Ads/copy | SCRAPED 2026-02-14 | 27 files created. **QUALITY WARNING:** Only 4 of 27 files contain substantive text content (~15%). Body copy is locked in IMAGE SCANS (PNG) — requires OCR for extraction. |
| https://swipefile.com/ogilvy-print-ads | Print ads (PDFs) | NEEDS SCRAPING + PDF→MD | Must scrape PDFs and convert to markdown |

### Scraped Specimen Quality Audit (2026-02-15)

**Overall:** Most Ogilvy swiped.co files are THIN (700B-1.5KB) — they contain only headlines + brief context metadata. The actual body copy exists as scanned print ad images (PNG) on swiped.co and cannot be extracted as text without OCR.

**Files with meaningful text content (4 of 27):**
| File | Content Quality | Size |
|------|----------------|------|
| `ogilvy-rolls-royce-60mph.md` | BEST specimen — 26-headline testing strategy, 3 weeks research methodology | 5.8KB |
| `ogilvy-dove-darling.md` | Research-first approach, consumer testing methodology | 2.7KB |
| `ogilvy-guinness-guide.md` | Campaign strategy analysis | ~2KB |
| `ogilvy-hathaway-man.md` | Campaign concept analysis | ~2KB |

**Remaining 23 files:** Headlines + context only (no body copy text). Useful for headline patterns but NOT for voice/body copy loading.

**Recommendation:** OCR of swiped.co image scans would unlock full body copy. Alternatively, find text-based Ogilvy ad transcriptions elsewhere.

---

## Persona 5: Craig Clemens

### Known Materials Already in Vault
- `skills/source-teachings/Craig-Clemens-Copy-Principles.md` (15KB) — Principles only, NOT verbatim copy
- `Various - Recent/Craig Clemens Interview.md` (34KB) — Interview material

### Verbatim Sources to Add (from Anthony 2026-02-14)
| Source (URL or File Path) | Copy Type | Status | Notes |
|---------------------------|-----------|--------|-------|
| https://drive.google.com/drive/folders/1kQmKy3cs20ghVDbZ1bEsHifn5-7t7t0J | Ads/copy | NEEDS GDRIVE | |
| `Unused Copy Processes/BigIdeaEngine/Data/SuperMasterSwipeFile/Raw-Originals/VSLs/Gundry_Bio_Complete_3_VSL.md` (41KB) | VSL | LOCAL | |
| `Unused Copy Processes/BigIdeaEngine/Data/SuperMasterSwipeFile/Raw-Originals/VSLs/Gundry_Total_Restore_VSL_1_Short.md` (3.4KB) | VSL | LOCAL | |
| `Unused Copy Processes/BigIdeaEngine/Data/SuperMasterSwipeFile/Raw-Originals/VSLs/Gundry_Vital_Reds_VSL_1.md` (18.7KB) | VSL | LOCAL | |
| `Documents/The Sauce Vault/.../research-library/01-Examples/Gundry-Leaky-Gut-Lectins.md` (9.6KB) | Mechanism analysis | LOCAL | Mechanism example, has copy samples |

---

## Persona 6: Gary Bencivenga

### Known Materials Already in Vault
- `skills/source-teachings/Bencivenga-Marketing-Maxims.md` (10KB) — Principles only, NOT verbatim copy

### Verbatim Sources to Add (from Anthony 2026-02-14)
| Source (URL or File Path) | Copy Type | Status | Notes |
|---------------------------|-----------|--------|-------|
| https://drive.google.com/drive/folders/1nbchlPJWlNRVOeWBHkpOhn4lyS96zKjq | Ads/copy | NEEDS GDRIVE | Not a ton but a few good swipes |
| https://marketingmaxims.com/maxims/list | Marketing content | NEEDS SCRAPING | Good content for style/voice. Click and download. |

---

## Persona 7: The Architect

No external specimens needed — this persona synthesizes from the other 6.

---

## Integration Checklist

Once sources are populated:

- [ ] Extract verbatim copy from each source into persona-specific files
- [ ] Create `System-2-[PersonaName]-specimens.md` for each persona
- [ ] Update ARENA-PERSONA-PANEL.md to reference System 2 files
- [ ] Update CLAUDE.md to change System 2 status from "FUTURE" to "ACTIVE"
- [ ] Update ROADMAP.md Phase 1C status
- [ ] Add loading protocol to each skill's Layer 0

---

## File Metadata

```yaml
type: specimen_source_map
system: System_2_persona_voice_loading
owner: Anthony
last_updated: 2026-02-15
status: in_progress_scraping_complete
```
