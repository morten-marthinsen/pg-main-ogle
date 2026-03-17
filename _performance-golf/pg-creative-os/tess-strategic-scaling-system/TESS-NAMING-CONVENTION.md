# **Performance Golf Ad Naming Convention - Tess v3.10**

This document defines the **15-Position Asset ID** naming convention for all Performance Golf ad creatives. This system enables automated data flow from Facebook → DOMO → Tess (Strategic Scaling System Intelligence).

---

## **1. Asset ID Structure Overview**

### **Full 15-Position Format**

```
[Funnel]-[RootAngleID]-[VariationID]-[Platform]-[Dimensions]-[LengthTier]-[AdCategory]-[ExpansionType]-[AssetType]-[TalentCode]-[EditorInitials]-[CopywriterInitials]-[CountryCode]-[DeliveryDate]-[PromoName]
```

### **Positions by Index**

| Position | Field | Description |
|----------|-------|-------------|
| 1 | Funnel | Product/offer code (e.g., `357`, `sf1`, `dqfe`) |
| 2 | RootAngleID | Script identifier (see format rules below) |
| 3 | VariationID | Version number (e.g., `v0001`, `v0029`) |
| 4 | Platform | Launch platform: `fb`, `yt`, or `xx` for images |
| 5 | Dimensions | Aspect ratio or size (e.g., `9x16`, `1080x1350`, `1080x1920`) |
| 6 | LengthTier | Video duration tier or `xx` for images |
| 7 | AdCategory | Net New, Vertical, Horizontal, or Mashup |
| 8 | ExpansionType | Type of expansion or `xx` if N/A |
| 9 | AssetType | Type of creative asset |
| 10 | TalentCode | Talent/creator shortcode |
| 11 | EditorInitials | 2-3 letter editor code |
| 12 | CopywriterInitials | 2-letter copywriter code |
| 13 | CountryCode | 2-letter country code (e.g., `us`, `au`, `gb`) |
| 14 | DeliveryDate | YYYYMMDD format |
| 15 | PromoName | Optional promo code (bfcm, xmas, etc.) |

---

## **2. RootAngleID Format Rules**

The RootAngleID prefix determines the asset type:

| Prefix | Asset Type | Example |
|--------|-----------|---------|
| `0` or `1` (numeric) | Video | `0003`, `1042` |
| `i` | Image | `i074`, `i001` |
| `h` | HTML5 | `h200`, `h015` |

---

## **3. Field Definitions & Code Tables**

### **3.1 Funnel/Offer Codes (Position 1)**

The Funnel code identifies the product or offer being advertised. All funnel codes are **lowercase** in asset IDs.

**Active Physical Products (15):**

| Code | Offer Name |
|------|-----------|
| `357` | 357 Fairway Hybrid |
| `clst` | Click Stick |
| `df1` | DrawForce |
| `gbf` | General Black Friday Collections |
| `ghd` | General Holiday Collections |
| `pio` | iON+ Golf Ball |
| `pll` | Lil' Legends Toddler Set |
| `rs1` | RS1 Putter |
| `sf1` | SF1 Driver |
| `sf2` | SF2 Driver |
| `spd` | SpeedTrac |
| `ssp` | SwingSmooth PRO Supplement |
| `thr` | The Thriver |
| `wdg1` | ONE.1 Wedge |
| `wdgs` | ONE.S Wedge |

**Active Digital Products (11):**

| Code | Offer Name |
|------|-----------|
| `dqfe` | Digital Swing Circle Quiz for SSTS/WPSS |
| `dqfe1` | Digital General Golf Quiz for PG1 |
| `htkt` | High Ticket Golf School |
| `ossf` | One Shot Slice Fix |
| `pg1` | PG Mobile App |
| `pgb` | Beginners Program, One Swing System |
| `pgf` | Fitness Program, Off-Season Swing Saver |
| `srsw` | Smart Distance System |
| `ssdp` | Senior Swing Distance Program |
| `ssts` | Simple Strike Sequence |
| `wpss` | Women's Pendulum Swing Sequence |

**Retired Offers (5):**

| Code | Offer Name |
|------|-----------|
| `pgapp` | PG Mobile App |
| `pss` | Pendulum Swing Sequence |
| `sqse` | The Square Set |
| `sqp` | The SQ Putter |
| `tsst` | The Straight Stick |

### **3.2 Root Angle ID (Position 2)**

The Root Angle ID uniquely identifies each creative concept within a funnel. IDs are assigned **sequentially** per funnel. The prefix determines the asset type (see Section 2 for prefix rules):

- Numeric prefix (`0` or `1`): Video assets (e.g., `0003`, `1042`)
- `i` prefix: Image assets (e.g., `i074`, `i001`)
- `h` prefix: HTML5 assets (e.g., `h200`, `h015`)

**Registry:** The Root Angle ID registry is maintained in the Strategic Scaling System (SSS) spreadsheet.

### **3.3 Variation ID (Position 3)**

The Variation ID uses the format `v` + 4-digit zero-padded number (e.g., `v0001`, `v0029`). Numbering is sequential per Root Angle ID within a funnel. Each variation represents a distinct creative execution of the same script/angle.

### **3.4 Platform Codes (Position 4)**

| Code | Meaning | Allowed Dimensions |
|------|---------|-------------------|
| `fb` | Facebook/Meta | `9x16` ONLY (vertical video) |
| `yt` | YouTube | `9x16` (Shorts) OR `16x9` (standard) |
| `xx` | Not applicable (use for images and HTML5) | Image dimensions (1080x1350, 1080x1920, etc.) |

**Automation Rule:** Facebook does NOT support 16x9 video dimensions. All FB video assets MUST use 9x16. YouTube supports both orientations.

### **3.4.1 Dimension Codes (Position 5)**

| Code | Type | Description |
|------|------|-------------|
| `9x16` | Video | Vertical video (FB, YT Shorts) |
| `16x9` | Video | Horizontal video (YT only) |
| `1080x1350` | Image | Portrait image (4:5 ratio) |
| `1080x1920` | Image | Full vertical image (9:16 ratio) |
| `1200x628` | Image | Landscape image (1.91:1 ratio) |
| `600x600` | Image | Small square image |
| `800x800` | Image | Medium square image |
| `1000x1000` | Image | Large square image |
| `1200x1200` | Image | XL square image |
| `1440x1440` | Image | XXL square image |
| `336x280` | Image | Medium rectangle (display ad) |
| `300x250` | Image | Medium rectangle (display ad) |
| `320x50` | Image | Mobile leaderboard (display ad) |

### **3.5 Length Tier Codes (Position 6)**

| Code | Duration Range |
|------|---------------|
| `30s` | < 30 seconds |
| `60s` | 31-60 seconds (< 1 minute) |
| `180s` | 61-180 seconds (1-3 minutes) |
| `360s` | 181-360 seconds (3-6 minutes) |
| `360s+` | > 360 seconds (> 6 minutes) |
| `xx` | Not applicable (use for images and HTML5) |

### **3.6 Ad Category Codes (Position 7)**

| Code | Meaning | Description |
|------|---------|-------------|
| `nn` | Net New | Brand new creative, original concept |
| `exv` | Vertical Expansion | Vertical expansion of existing winner (i.e. Hook Stack, Scroll Stopper Refresh, Cutdown) |
| `exh` | Horizontal Expansion | Horizontal expansion of existing winner (i.e. Similar Presenter, Different Presenter, Environment Change (eg. Range to Simulator), Ad Format Change (i.e. Podcast), Copy Framework Change) |
| `nnmu` | Net New Mashup | New creative combining existing elements |
| `prm` | Promo | Winning asset modified to align with a specific promo (Position 15 promo code REQUIRED) |
| `evg` | Evergreen | Winning asset that launched with a promo, modified to remove the promo (Position 15 MUST be blank) |

> **Note:** Prior to February 2026, the codes `ver` (Vertical) and `hor` (Horizontal) were used. Assets with those codes in the system remain valid. All new assets going forward MUST use `exv` and `exh`.

**Automation Rule - Ad Category Code is the Primary Indicator:**
- The Ad Category code (Position 7) determines whether an asset is Net New, Expansion, Mashup, Promo, or Evergreen
- Do NOT rely on variation numbers to determine ad category
- Net News can have variations 1-5 (some launch with 3, some with 5)
- Expansions can start at any variation number depending on when the original net new was expanded
- Always check the Ad Category code (`nn`, `exv`, `exh`, `nnmu`, `prm`, `evg`) to determine the asset type

**Automation Rule - Promo / Evergreen Validation:**
- `prm` assets MUST have a promo code in Position 15 — a `prm` with no promo code is INVALID
- `evg` assets MUST NOT have a promo code in Position 15 — an `evg` with a promo code is INVALID
- `evg` can ONLY be created from a source asset that has a promo (NN+promo or PRM)
- `prm` can be created from any winning asset (NN, EXV, EXH, PRM, EVG)

### **3.7 Expansion Type Codes (Position 8)**

| Code | Meaning |
|------|---------|
| `hs` | Hook Stack |
| `ssr` | Scroll Stopper Refresh |
| `dur` | Duration |
| `env` | Environment |
| `sp` | Similar Presenter |
| `dp` | Different Presenter |
| `af` | Ad Format |
| `cf` | Copy Framework |
| `int` | International |
| `xx` | Not Applicable (use when AdCategory = `nn`, `nnmu`, `prm`, or `evg`) |

**Automation Rule:** When AdCategory is `nn`, `nnmu`, `prm`, or `evg`, ExpansionType MUST be `xx`. When AdCategory is `exv` or `exh`, ExpansionType MUST be a specific type (not `xx`).

**Expansion Type Operational Definitions:**

| Code | Definition | Assembly (v1) | AI (v2+) |
|------|-----------|---------------|----------|
| `hs` | **Hook Stack** — Replace the opening hook (3-15 seconds) with a different hook while keeping the body and CTA unchanged. Tests which hook drives the best view rate. | Swap with pre-existing hook clips from library | Generate new hooks from text prompts |
| `ssr` | **Scroll Stopper Refresh** — Replace the first 0-3 seconds (the scroll-stopping moment) with a different attention-grabbing opener. Aligned with Domo 3-second view rate metric. | Swap from clip library | AI-generate attention elements |
| `dur` | **Duration** — Reassemble the best segments of a source ad into a shorter or longer version. All duration variations share the EXACT same opening hook (isolation principle — only variable is LENGTH). Body content between hook and CTA is where cuts/reassembly happens. Veda can pull segments from anywhere in the source. CTA end cards 5-8s (usually 5s). Transcript Analyzer identifies optimal cut points while preserving root angle. | FFmpeg reassembly from source segments | N/A (pure editorial) |
| `env` | **Environment** — Change the visual environment/setting while keeping presenter and script unchanged. | Swap background from footage library | AI-generated environments |
| `sp` | **Similar Presenter** — Re-shoot or re-edit with a presenter who shares similar demographics as the original. | Re-edit with similar talent footage from library | Generate similar presenter via AI |
| `dp` | **Different Presenter** — Re-shoot or re-edit with a deliberately different presenter (different age, gender). | Re-edit with different talent footage from library | Generate different presenter via AI |
| `af` | **Ad Format** — Restructure the content from one format to another (e.g., Slice & Dice → Podcast style). Same root angle, different delivery format. | Restructure via editorial | Format-specific AI enhancements |
| `cf` | **Copy Framework** — Same visuals, different copy/CTA overlay using a proven copywriting framework. Tests which messaging approach resonates best. | Overlay new copy/CTA | Framework-guided copy generation |
| `int` | **International** — Adapt a winning source ad for a different geographic market. Tests whether the root angle resonates in a new market. May involve translation, cultural adaptation, or local talent. Country Code (Position 13) MUST differ from the source asset's country. | Re-edit with localized copy/talent from library | AI-assisted translation and cultural adaptation |

> **Note (Session 007)**: These operational definitions are the shared source of truth for both Tess (recommendation) and Veda (execution). Duration expansion uses the isolation principle — identical opening hooks ensure the only test variable is length. Copy Framework must use PROVEN frameworks (library to be built after API hookup).

### **3.8 Asset Type Codes (Position 9)**

| Code  | Meaning           | Description                     |
| ----- | ----------------- | ------------------------------- |
| `pod` | Podcast           | Podcast/interview format        |
| `tlr` | Tele/Ronin        | Teleprompter/professional setup |
| `sad` | Slice & Dice      | Lesson slice & dice             |
| `bvo` | Human VO + B-Roll  | Human voice over and b-roll     |
| `avo` | AIVO              | AI voice over                   |
| `img` | Image             | Static image asset              |
| `aip` | Actor/Influencer (Paid) | Paid actor or influencer talent |
| `aio` | Actor/Influencer (Organic) | Organic/unpaid influencer talent |
| `gru` | Guru              | Instructor/guru talent          |
| `cdn` | Cutdown           | Shorter edit from existing asset |

**Automation Rule:** When RootAngleID starts with `i` (image asset), Asset Type should be `img` (Image).

### **3.9 Talent Codes (Position 10)**

Talent codes use a **4-character format**: first 2 letters of first name + first 2 letters of last name.
- Example: Hank Haney = `haha`, Gary McCord = `gamc`, Christopher Ogle = `chog`
- Duplicates are resolved with a number suffix (e.g., `kgj1`, `kgj2`)
- **Multiple Talent:** Use `mult` when an asset features **3 or more talent actors** (3+). For assets with 1-2 talents, use the primary talent's code.

**Speaking Roles Only:** The Talent Code field refers to the on-camera **speaking** talent — not B-roll talent. If one person speaks, use their code. If 3+ talent speak, use `mult`. B-roll extras do not affect the talent code.

**Image Assets:** For image assets (Root Angle ID prefix `i`), default to `xxxx` (No Talent / Not Applicable) unless the image is specifically testing a talent's likeness.

**Full Talent Code Reference (45 active talents):**

| Code | Talent Name |
|------|-------------|
| `alla` | Allyson & Emme Lantis |
| `anri` | Andrew Rice |
| `avdo` | Averee Dovsek |
| `bral` | Brixton Albert |
| `brmo` | Briana Morris |
| `camc` | Cameron McCormik |
| `capi` | Carolin Pinegger |
| `casm` | Carter Smith (DOD) |
| `chbr` | Chris Branden |
| `chkr` | Chris Kromlidis |
| `chna` | Changyhun Nam |
| `chog` | Christopher Ogle |
| `coha` | Colin Harris |
| `crha` | Craig Hanson |
| `diwe` | Diana West |
| `dwai` | Diana West AI |
| `dofr` | Donnie French |
| `erco` | Eric Cogorno |
| `erla` | Erika Larkin |
| `frmo` | Frank Moretti |
| `gamc` | Gary McCord |
| `geca` | Gerry Carry |
| `grho` | Grant Horvat |
| `haha` | Hank Haney |
| `hegr` | Henry Grillo |
| `jacu` | Jasmin Cull |
| `jeri` | Jeff Ritter |
| `jotr` | Joey Tritsch |
| `jtth` | JT Thomas |
| `kero` | Kevin Roy |
| `mabo` | Martin Borgmeier |
| `mach` | Martin Chuck |
| `mame` | Marisa Messana |
| `neha` | Neil Hayne |
| `pebe` | Pete Beck |
| `pega` | Peter Galman |
| `pohi` | Portia Hill |
| `ribe` | Rich Beem |
| `rism` | Rick Smith |
| `roke` | Ross Ketner |
| `rome` | Rocco Mediate |
| `sali` | Sam Lion |
| `tobr` | Todd Brown |
| `trbi` | Dr. Troy Van Biezen |
| `mult` | Multiple Talent (3+ actors in asset) |
| `xxxx` | No Talent / Not Applicable (default for image assets) |


### **3.10 Editor Codes (Position 11)**

| Code | Editor Name |
|------|-------------|
| `ae` | Arvin Roy Edrosa |
| `ca` | Clevin Alcantara |
| `dr` | Daryl Reyes |
| `gl` | Gabriel Langain |
| `jo` | Jasper Jay Oliverio |
| `jr` | Jasper Rufino |
| `jm` | JD Miranda |
| `jk` | John Kent |
| `jj` | Judhel Joseph |
| `jb` | JV Boongaling |
| `kg` | Keenan Garrett |
| `kgj` | Kiwi Golf Japan (3-digit code to avoid conflict with `kg`) |
| `mm` | Morten Marthinsen |
| `nlc` | No Limit Creative (3-digit code) |
| `sl` | Serhii Lahutenko |
| `si` | Shane Sharry Ibanez |
| `ur` | Umer Rehman |
| `vv` | Veda (Video Editing Agent) |
| `vk` | Vlad Kostetskyi |

### **3.11 Copywriter Codes (Position 12)**

| Code | Copywriter Name |
|------|-----------------|
| `af` | Anthony Flores |
| `bm` | Ben Marcoux |
| `bmdf` | Ben Marcoux + Donnie French |
| `cf` | Chris Fleeks |
| `ch` | Chris Hibbert |
| `co` | Christopher Ogle |
| `df` | Donnie French |
| `rv` | Romeo Valois |

> **Note:** Prior to February 2026, the codes `bh` (Brian Halpin) and `kd` (Keith Dingler) were also active copywriter codes. Assets with those codes in the system remain valid.

**Note:** If the editor also wrote the script, use their initials in both positions.

### **3.12 Country Codes (Position 13)**

| Code | Country |
|------|---------|
| `us` | United States |
| `au` | Australia |
| `ca` | Canada |
| `de` | Germany |
| `gb` | United Kingdom |
| `ie` | Ireland |
| `jp` | Japan |
| `kr` | South Korea |
| `mx` | Mexico |
| `nl` | Netherlands |
| `nz` | New Zealand |
| `se` | Sweden |
| `th` | Thailand |

**Note:** The `us` code is available for domestic (United States) assets. All international assets MUST include the appropriate country code.

### **3.13 Delivery Date (Position 14)**

The Delivery Date — the day the asset is delivered to the Creative Ops team for processing — uses `YYYYMMDD` format (e.g., `20260115` for January 15, 2026).

### **3.14 Promo Codes (Position 15 - Optional)**

| Code      | Promo/Event                 |
| --------- | --------------------------- |
| `bfcm`    | Black Friday / Cyber Monday |
| `xmas`    | Christmas                   |
| *(blank)* | No promo - omit entirely    |

### **3.15 Offer-Guru Mapping**

Each offer has a primary guru (talent) who represents it. While other talent CAN appear in an offer's ads, these are the core pairings:

| Offer Code | Core Guru | Talent Code | Notes |
|------------|-----------|-------------|-------|
| `ossf` | Hank Haney | `haha` | |
| `ssts` | Martin Chuck | `mach` | |
| `dqfe` | Martin Chuck (male) | `mach` | Gender-specific offer |
| `dqfe` | Erika Larkin (female) | `erla` | Gender-specific offer |
| `srsw` | Andrew Rice | `anri` | |
| `ssdp` | Andrew Rice | `anri` | |
| `wpss` | Erika Larkin | `erla` | |
| `pgf` | Dr. Troy Van Biezen | `trbi` | |
| `pgb` | Martin Chuck | `mach` | |
| `sf1` | Hank Haney | `haha` | |
| `357` | Gary McCord | `gamc` | |
| `ssp` | Dr. Troy Van Biezen | `trbi` | Supplement offer |
| `clst` | No core guru | — | Multi-talent offer |
| `htkt` | No core guru | — | Multi-talent offer |

**Important:** This mapping applies to **video assets only**. Image assets default to `xxxx` (No Talent / Not Applicable) regardless of funnel, unless the image is specifically testing a talent's likeness. For video assets, any talent can appear in ads for any offer. The core guru is simply the primary talent associated with each offer. It is common for other actors to appear in an offer's ads. The only notable pattern is that core gurus rarely appear in OTHER offers' ads (e.g., Gary McCord rarely does OSSF ads because he's the 357 guru).

**Multiple Talent (`mult`):** Use the `mult` talent code when an asset features 3 or more talent actors (3+). For assets with 1-2 talents, use the primary talent's code. Multi-talent offers like `clst` and `htkt` are common candidates for the `mult` code.

**Note:** This mapping will be updated as new offers/talent are added.

---

## **4. Examples by Asset Type**

### **4.1 VIDEO Examples**

**Net New Video (US):**
```
357-0003-v0001-fb-9x16-180s-nn-xx-sad-gamc-ca-co-us-20251201
```
- Funnel: 357
- Script: 0003 (video)
- Variation: v0001
- Platform: fb (Facebook)
- Dimensions: 9x16 (vertical)
- Length: 180s (1-3 min)
- Category: nn (Net New) → Expansion: xx (N/A)
- Asset Type: sad (Slice & Dice)
- Talent: gamc (Gary McCord) ← 357's core guru
- Editor: ca (Clevin Alcantara)
- Copywriter: co (Christopher Ogle)
- Country: us (United States)
- Date: 20251201

**Vertical Expansion Video with Promo:**
```
ossf-0466-v0294-fb-9x16-180s-exv-hs-tlr-haha-jj-ch-us-20251208-bfcm
```
- Category: exv (Vertical Expansion) → Expansion: hs (Hook Stack)

**YouTube Net New Video:**
```
sf1-0021-v0001-yt-16x9-360s-nn-xx-pod-mach-mm-df-us-20260108
```

**Promo Version of a Winner:**
```
ossf-0466-v0295-fb-9x16-180s-prm-xx-tlr-haha-jj-ch-us-20261201-bfcm
```
- Source: ossf-0466 winner (any Ad Category)
- Category: prm (Promo) → Expansion: xx (N/A)
- Promo: bfcm (REQUIRED for prm)
- Same Root Angle ID, new variation number

**Evergreen Version (De-Promo):**
```
ossf-0466-v0296-fb-9x16-180s-evg-xx-tlr-haha-jj-ch-us-20260115
```
- Source: ossf-0466-v0295 (the bfcm promo winner above)
- Category: evg (Evergreen) → Expansion: xx (N/A)
- Promo: *(blank — REQUIRED to be blank for evg)*
- Same Root Angle ID, new variation number

**Multiple Talent Video (3+ actors):**
```
htkt-0012-v0001-fb-9x16-360s-nn-xx-pod-mult-mm-df-us-20260201
```
- Talent: mult (3+ talent actors in this asset)

### **4.2 IMAGE Examples**

**Net New Image (US):**
```
357-i074-v0001-xx-1080x1350-xx-nn-xx-img-xxxx-ca-co-us-20251201
```
- Platform: xx (N/A for images)
- Length: xx (N/A for images)
- Category: nn → Expansion: xx
- Asset Type: img (Image) ← Images must use `img`, not video types
- Talent: xxxx (No Talent / Not Applicable) ← Default for images. Use specific talent code only if testing that talent's likeness.

**Image with Promo (Talent Test):**
```
clst-i219-v0002-xx-1080x1350-xx-exv-cf-img-gamc-jb-bm-us-20251215-xmas
```
- Talent: gamc (Gary McCord) ← This image is specifically testing Gary McCord's likeness. Without a talent test, this would use `xxxx`.

### **4.3 HTML5 Examples**

**HTML5 Creative:**
```
dqfe-h200-v0001-xx-1080x1350-xx-nn-xx-img-mach-ae-co-us-20260110
```
- Talent: mach (Martin Chuck) ← dqfe's core guru for male-focused ads

---

## **5. Root Angle Principle**

### **5.1 The Foundational Rule**

Every Root Angle ID is anchored to a **Root Angle Name** — the central persuasive thesis that asset is testing in market. This binding is **permanent and immutable**.

| Principle | Rule |
|-----------|------|
| **Root Angle ID = Root Angle** | Every Root Angle ID tests exactly ONE root angle. This binding never changes. |
| **Expansions preserve root angle** | ALL expansions (`exv`, `exh`) of a Root Angle ID MUST keep the root angle as the unchanged constant. Only the production variable changes (hook, duration, environment, presenter, format, copy framework). |
| **New angles get new Root Angle IDs** | If a new angle is discovered within an existing asset, it MUST be separated into its own Net New (`nn` or `nnmu`) with a fresh Root Angle ID starting at `v0001`. |
| **Isolation testing** | The purpose of expansion testing is isolation: change ONE production variable while holding the root angle fixed. This determines which TYPE of expansion scales that specific angle best. |

### **5.2 Why This Matters**

If an expansion subtly shifts the root angle, the performance data for that Root Angle ID becomes meaningless — you cannot tell if the production change worked or if a different angle is performing differently. The entire scaling system's data integrity depends on **root angle purity within a Root Angle ID**.

### **5.3 Root Angle Name**

| Field | Details |
|-------|---------|
| **Location** | Column C of Ad Level Tracking tab (SSS spreadsheet) + ClickUp ad description |
| **Format** | 1-4 words maximum |
| **Source** | Must come from transcript language whenever possible |
| **Examples** | "Best Gift", "Beat The Boys", "Cheat Code For Seniors", "Power Coil" |
| **Generation** | Tess provides 1-5 suggestions, human confirms |
| **Scope** | Winners ONLY for automated mining. Manual override for other assets. |

### **5.4 Root Angle and Ad Categories**

| Ad Category | Root Angle Behavior |
|-------------|-------------------|
| `nn` (Net New) | Establishes a NEW root angle. Gets a fresh Root Angle ID at `v0001`. |
| `exv` (Vertical Expansion) | MUST preserve the root angle of the source Root Angle ID. Changes ONE production variable. |
| `exh` (Horizontal Expansion) | MUST preserve the root angle of the source Root Angle ID. Broader format/environment change. |
| `nnmu` (Net New Mashup) | Combines elements from multiple Root Angle IDs into a NEW root angle. Gets a fresh Root Angle ID at `v0001`. |
| `prm` (Promo) | PRESERVES the root angle of the source asset. Same Root Angle ID, new variation. Promotional creative changes only. |
| `evg` (Evergreen) | PRESERVES the root angle of the source asset. Same Root Angle ID, new variation. Promo removal only. |

---

## **6. Business Logic Rules**

### **6.1 Required Field Combinations**

| When... | Then... |
|---------|---------|
| AdCategory = `nn` | ExpansionType MUST = `xx` |
| AdCategory = `nnmu` | ExpansionType MUST = `xx` |
| AdCategory = `prm` | ExpansionType MUST = `xx`, PromoName (P15) REQUIRED |
| AdCategory = `evg` | ExpansionType MUST = `xx`, PromoName (P15) MUST be blank |
| AdCategory = `exv` or `exh` | ExpansionType MUST be a specific type (not `xx`) |
| RootAngleID starts with `i` or `h` | Platform = `xx`, LengthTier = `xx` |
| RootAngleID starts with `0` or `1` | Platform = `fb` or `yt`, LengthTier = duration code |

### **6.2 Asset Type Detection**

| RootAngleID Pattern | Asset Type |
|------------------|-----------|
| Starts with `0` or `1` | Video |
| Starts with `i` | Image |
| Starts with `h` | HTML5 |

---

## **7. Two-Step Naming Process**

### **STEP 1 – Editor Naming (Pre-launch)**

Editors own the **base naming convention** when a creative is finished:

- Apply the full 15-position naming string **once** when the asset is finalized
- This base name is what DOMO parses for all reporting logic
- **Do NOT** encode whitelisting, partnership contracts, or devices in the name
- Those metadata fields live in the **Strategic Scaling System / Creative Performance Sheets**

### **STEP 2 – Media Team Adjustments (Post-launch)**

Once ads are live, Media can:

- **Duplicate, scale, and segment** campaigns as needed
- **Change the platform code** when moving creative cross-platform (fb → yt)
- **Append `-sca` AFTER the date** when moving a creative from testing to scaling campaigns

**Scaling Tag:** When a creative graduates from initial testing to a scaling campaign, append `-sca` to differentiate it from the test version.

**Example:**
- Test version: `357-0003-v0029-fb-9x16-180s-nn-xx-sad-haha-ca-co-us-20251201`
- Scaling version: `357-0003-v0029-fb-9x16-180s-nn-xx-sad-haha-ca-co-us-20251201-sca`

**IMPORTANT:** Media must NOT change the core pattern before the date. The `-sca` tag comes AFTER the original naming string.

---

## **8. DOMO Parsing Structure**

DOMO should treat positions 1-14 as **structured fields**:

1. Funnel
2. RootAngleID
3. VariationID
4. Platform
5. Dimensions
6. LengthTier
7. AdCategory
8. ExpansionType
9. AssetType
10. TalentCode
11. EditorInitials
12. CopywriterInitials
13. CountryCode
14. DeliveryDate

Position 15 (PromoName) and anything after should be treated as **optional/free-form**.

---

## **9. Quick Reference: Old vs New**

### **OLD FORMAT (Deprecated)**
```
[OfferCode]-[ScriptID]-[Variation]-[Dimensions]-[AdType]-[AdFormat]-[AdLength]-[Talent]-[EditorInitials]-[CopywriterInitials]-[PromoName]-[DeliveryDate]
```
Example: `357-0003-V0029-9X16-EXP-VD-2MIN-GARYMC-JRFNO-CO-SUMMERSALE2025-08122025`

### **NEW FORMAT (Active)**
```
[Funnel]-[RootAngleID]-[VariationID]-[Platform]-[Dimensions]-[LengthTier]-[AdCategory]-[ExpansionType]-[AssetType]-[TalentCode]-[EditorInitials]-[CopywriterInitials]-[CountryCode]-[DeliveryDate]-[PromoName]
```
Example: `357-0003-v0029-fb-9x16-180s-nn-xx-sad-haha-ca-co-us-20251201-bfcm`

---

## **10. Strategic Scaling System - Column Structure**

The **Strategic Scaling System** spreadsheet columns are aligned with the naming convention positions for seamless data flow:

| Column | Field | Naming Position |
|--------|-------|-----------------|
| A | Funnel | Position 1 |
| B | Root Angle ID | Position 2 |
| C | Root Angle Name | — (Strategic field — see Section 5) |
| D | Asset ID | — (Full naming string) |
| E | Platform | Position 4 |
| F | Dimensions | Position 5 |
| G | Length Tier | Position 6 |
| H | Ad Category | Position 7 |
| I | Expansion Type | Position 8 |
| J | Asset Type | Position 9 |
| K | Talent | Position 10 |
| L | Editor Name | Position 11 |
| M | Copywriter Name | Position 12 |
| N | Country Code | Position 13 |
| O | Delivery Date | Position 14 |
| P | Status | — (Tracking field) |
| Q | Spend | — (Performance metric) |
| ... | ... | ... |
| U | Format Type | — (Parse classification) |

**Notes:**
- **Root Angle Name (C):** Reference field linking to the creative concept/angle
- **Asset ID (D):** Contains the complete naming convention string for each asset
- **Country Code (N):** 2-letter country code from Position 13
- **Status (P):** Active/Inactive status for campaign tracking
- **Spend (Q):** Performance data synced from ad platforms
- **Format Type (U):** Indicates naming convention format (see below)

### **10.1 Format Type Values (Column U)**

The Format Type column classifies each asset's naming convention format:

| Value | Meaning | What It Means |
|-------|---------|---------------|
| `NEW` | Valid 14-15 position format | All fields (Columns E-O) are available and populated |
| `OLD` | Legacy 12-position format | Only Funnel, Root Angle ID, Variation, and Dimensions are reliable; Columns H-M show "—" |
| `INCOMPLETE` | Partial NEW format | Asset ID has fewer than 14 positions; some fields missing |
| `MALFORMED` | Cannot be parsed | Asset ID structure is invalid; manual review needed |

**Usage:** Filter by Format Type to identify which assets have complete data for analysis vs. which need naming convention updates.

---

## **11. Related Resources**

- **Content Creators Roster:** Full talent code reference
- **New Ad ID Generator:** [Google Sheet](https://docs.google.com/spreadsheets/d/1bQTgH_nNef3eNCpheHOJjXpn09RM-x41MO5kM1vCDYo/edit?gid=2057203990#gid=2057203990)
- **Strategic Scaling System:** Ad Level Tracking for performance data
- **Country Codes:** See Cell J1 of New Ad ID Generator for international codes

### Non-Funnel Ad Filtering

The pipeline only includes ads with a valid Funnel code (Position 1) in Ad Level Tracking.
Non-funnel campaign types are excluded during Phase 3 (Generate):

| Excluded Type | Example | Reason |
|--------------|---------|--------|
| Performance Max | `pmax` | Google PMax — no funnel structure |
| Search Ads | `search ad` | Google Search — no funnel structure |
| Shopping Ads | `shopping ad` | Google Shopping — no funnel structure |
| Microsoft Ads | `microsoft ads (no ad name)` | Microsoft — no funnel structure |

These ads are preserved in Raw_Daily_Data but excluded from Ad Level Tracking.
Valid funnel codes: `tess_sub_agents/tables/naming_codes.py` → `FUNNEL_LOOKUP` (31 codes).

### Root Angle Name Resolution

Root angle names are resolved via a 2-tier fallback chain:

1. **ClickUp API** (primary) — fetches from "Ad Delivery" list, custom field "Ad Root Angle Name"
2. **Reference lookup** (fallback) — `_reference/root_angle_lookup_cleaned.json` (1,838 entries from historical data)

ClickUp values always take priority. The reference file fills gaps for root angle IDs
not yet in ClickUp. Only truly unknown root angle IDs will have blank root angle names.

---

*Document Version: 3.10*
*Last Updated: March 10, 2026*
*Changes v3.10: Added `dwai` (Diana West AI) talent code — AI-generated content using Diana West's likeness/voice. 45 active talents. Added `rv` (Romeo Valois) copywriter code — 8 active copywriters. Orion Session 075.*
*Changes v3.9: Renamed "Script ID" (Position 2) to "Root Angle ID" throughout — reflects that this identifier anchors to a root angle, not a script. Added `tobr` (Todd Brown) to talent codes (43 active). Added `xxxx` (No Talent / Not Applicable) as special talent code — default for image assets unless specifically testing talent. Added speaking-roles-only clarification for talent codes. Updated Offer-Guru Mapping to note video-only applicability. Tess Session 148.*
*Changes v3.8: Changed `mult` (Multiple Talent) threshold from 4+ actors to 3+ actors. With 3+ talents, performance attribution to any single talent is unreliable, so `mult` is the correct classification. Assets with 1-2 talents use the primary talent's code. Updated Sections 3.9, 3.15, 4.1. Tess Session TBD.*
*Changes v3.7: Added Section 3.2 Script ID (Position 2) — sequential per funnel, SSS registry. Renumbered sections 3.2–3.14 → 3.3–3.15. Added `int` (International) Expansion Type code with operational definition — horizontal expansion for geographic market adaptation. Renamed "Creation Date" to "Delivery Date" (Position 14) — the day the asset is delivered to Creative Ops. Updated Length Tier `xx` to include HTML5. Updated Expansion Type `xx` description to include `prm` and `evg`.*
*Changes v3.6: Added Ad Category codes `prm` (Promo) and `evg` (Evergreen) — promotional lifecycle categories for winning assets. PRM = add promo to winner (P15 required), EVG = remove promo from winner (P15 must be blank). Both preserve root angle, use same Script ID with new variation, ExpansionType = `xx`. Added `mult` talent code for assets with 4+ talent actors. Updated Sections 3.5, 3.6, 3.8, 5.4, 6.1 with new business rules. Added promo/evergreen/mult examples in Section 4.1. Tess Session TBD.*
*Changes v3.5: Added Section 3.1 Funnel/Offer Codes (Position 1) — 26 active offers (15 Physical, 11 Digital) + 5 Retired. Added Section 3.2 Variation ID (Position 3). Added Section 3.12 Creation Date (Position 14). All 15 positions now documented. Renumbered sections 3.1–3.11 → 3.3–3.14. Tess Session 096.*
*Changes v3.4: Added Expansion Type Operational Definitions table under Section 3.4 — shared source of truth for Tess and Veda. Documents assembly (v1) and AI (v2+) capabilities for each expansion type. Duration expansion = reassembly with isolation principle (same opening hook). Fixed talent code trvb→trbi (Dr. Troy Van Biezen). Added gamc (Gary McCord) to active talents (41 total). Veda Session 007.*
*Changes v3.3: Added Position 13 Country Code (13 codes incl. `us`), format expanded from 14→15 positions. Added 9 new dimension codes. Added 4 editors (`jk`, `jd`, `kgo`, `dr`). Removed 2 copywriters (`bh`, `kd`) — legacy note preserved. Renumbered sections 3.9→3.10, 3.10→3.11. Updated all examples with `us` country code. Updated column structure (N=Country Code, O=Creation Date shifted).*
*Changes v3.2: Added 4 Asset Type codes — `aip` (Actor/Influencer Paid), `aio` (Actor/Influencer Organic), `gru` (Guru), `cdn` (Cutdown). Veda Session 005.*
*Changes v3.1: Added Section 5 (Root Angle Principle) — Script ID = Root Angle binding, expansions must preserve root angle, new angles get new Script ID. Added Veda editor code (`vv`). Renumbered sections 5-10 → 6-11. Updated Column C description from "Tracking field" to "Strategic field."*
*Changes v3.0: Ad Category codes updated — `ver`→`exv` (Vertical Expansion), `hor`→`exh` (Horizontal Expansion). Legacy codes remain valid for existing assets.*
