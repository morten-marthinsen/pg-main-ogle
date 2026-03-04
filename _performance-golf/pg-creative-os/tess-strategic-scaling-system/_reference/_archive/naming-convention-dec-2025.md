# **Final Update – New Ad Naming Convention (Editors, Media, Data)**

Thanks again for all the input on the new naming convention. This message is the **final alignment** across Creative, Media, and Data, so we’re all playing the same game going forward.

---

## **1️⃣ Two-Step Naming Process**

There are **two distinct stages** in the lifecycle of an ad name:

### **STEP 1 – Editor Naming (Pre-launch – *source of truth*)**

Editors own the **base naming convention** when a creative is finished and approved.

* They apply the full naming string **once**, at the point the asset is finalized and handed to Live Creative Ops.  
* This base name is what DOMO parses and what the data team will use for all reporting logic.  
* Editors **do not** try to encode whitelisting, partnership contracts, channels, devices, etc. Those live in the **Strategic Scaling System / Creative Performance Sheets**.

### **STEP 2 – Media Team Adjustments (Post-launch – *scaling & segmentation*)**

Once ads are live, Media can:

* **Duplicate, scale, and segment** campaigns/ad sets as needed.  
* For videos, **change the platform code** when moving an existing creative from FB → YT (or vice versa).  
* Optionally **append extra tags *after the date*** (e.g., `-mob`, `-desk`, `-shorts`, `-pc`) to clarify device, placement, or test conditions.

IMPORTANT:  Media **must not change** the core pattern **before the date**. Anything added for their own tracking comes **after** the original naming string so it doesn’t break DOMO parsing.

---

## 

## **2️⃣ What’s Included in the Naming Convention**

### **A) IMAGE CREATIVES**

**Format (Editor-applied):**  
 `[OfferCode]-[ScriptID]-[Variation]-[Dimensions]-[EditorInitials]-[CopywriterInitials]-[CountryCode]-[CreationDate]-[PromoName]`

**US Example:**  
 `357-i074-v001-1080x1350-ca-co-20251201`

**US Example w/Promo:**  
 `357-i074-v001-1080x1350-ca-co-20251201-bfcm` 

**INTL Example for Australia:**  
 `357-i074-v001-1080x1350-ca-co-au-20251201`

**Field definitions**

* **OfferCode** – Product/offer code (e.g. `357`)  
* **ScriptID** – `i###` for images (e.g. `i074`)  
* **Variation** – `v####` (e.g. `v0001`)  
* **Dimensions** – e.g., `1080x1350`, `1200x1200`, etc.  
* **EditorInitials** – Editor who created the asset (e.g., `wm`)  
* **CopywriterInitials** – Script writer (e.g., `co`)  
* **CountryCode** – Used for NON-US ads ONLY (e.g., `jp`)  
  * See full list of countries in Cell J1 of this sheet: [New Ad ID Generator (Naming Conventions)](https://docs.google.com/spreadsheets/d/1bQTgH_nNef3eNCpheHOJjXpn09RM-x41MO5kM1vCDYo/edit?gid=2057203990#gid=2057203990)  
* **CreationDate** – Date the asset is **finalized and handed to Creative Ops,** not the launch date (YYYYMMDD).  
* **PromoName** – Sale/holiday codes like `bfcm`, `ftty`, `xmas`, etc., will be standardized and used as needed.

Notes:

* **No platform code is required for images.** For Google/YouTube, the media buyer will handle any platform-specific labelling at upload.  
* Whitelisting, creator page, etc., are managed via the **Creative Performance Sheets**, not inside the creative name.

---

### **B) VIDEO CREATIVES**

**Format (Editor-applied):**  
 `[OfferCode]-[ScriptID]-[Variation]-[Platform]-[Dimensions]-[LengthTier]-[EditorInitials]-[CopywriterInitials]-[CountryCode] -[CreationDate]-[PromoName]`

**US Example:**  
 `357-0003-v0029-fb-9x16-180s-wm-co-20251201`

**US Example w/Promo:**  
 `357-i074-v001-1080x1350-ca-co-20251201-xmas` 

**INTL Example for Japan:**  
 `357-0003-v0029-fb-9x16-180s-wm-co-jp-20251201`

**Field Definitions:** 

* **OfferCode** – Product/offer code (e.g. `357`)  
* **ScriptID** – `####` for videos (e.g. `0003`)  
* **Variation** – `v####` (e.g. `V0029`)  
* **Platform** – Initial launch platform: `fb` or `yt`  
  * Editors default to the **first platform** the asset is being created for.  
  * When Media moves a winning creative cross-platform, they duplicate and update this code (fb → yt, etc.).  
* **Dimensions** – e.g., `9x16`, `16x9`  
* **LengthTier** – Based on total runtime:  
  * `< 60 seconds/1 minute` → `60s`  
  * `61–180 seconds/1-3 minutes` → `180s`  
  * `181–360 seconds/3-6 minutes` → `360s`  
  * `> 360 seconds/6 minutes` → `360s`  
* **Editor Initials** – Video editor  
* **Copywriter Initials** – Script writer  
  * NOTE: This could also be an editor's initials AGAIN if the editor created the asset themselves.   
* **CountryCode** – Used for NON-US ads ONLY (e.g., `jp`)  
  * See full list of countries in Cell J1 of this sheet: [New Ad ID Generator (Naming Conventions)](https://docs.google.com/spreadsheets/d/1bQTgH_nNef3eNCpheHOJjXpn09RM-x41MO5kM1vCDYo/edit?gid=2057203990#gid=2057203990)  
* **CreationDate** – Date the asset is **finalized and handed to Creative Ops,** not the launch date (YYYYMMDD).  
* **PromoName** – Sale/holiday codes like `bfcm`, `ftty`, `xmas`, etc., will be standardized and used as needed.

**Notes:**

* Whitelisting, creator, partnership details, etc., live in the **Strategic Scaling System / Creative Performance Sheets** and must be filled out accurately.

---

### **C) HTML5 CREATIVES**

**Format (Editor-applied):**  
 `[OfferCode]-[ScriptID]-[Variation]-[Dimensions]-[EditorInitials]-[CopywriterInitials]-[CountryCode]-[CreationDate]-[PromoName]`

**US Example:**  
 `357-h074-v001-1080x1350-ca-co-20251201`

**US Example w/Promo:**  
 `357-h074-v001-1080x1350-ca-co-20251201-bfcm` 

**INTL Example for Australia:**  
 `357-h074-v001-1080x1350-ca-co-au-20251201`

**Field definitions**

* **OfferCode** – Product/offer code (e.g. `357`)  
* **ScriptID** – `h###` for HTML5 (e.g. `i074`)  
* **Variation** – `v####` (e.g. `v0001`)  
* **Dimensions** – e.g., `1080x1350`, `1200x1200`, etc.  
* **EditorInitials** – Editor who created the asset (e.g., `wm`)  
* **CopywriterInitials** – Script writer (e.g., `co`)  
* **CountryCode** – Used for NON-US ads ONLY (e.g., `jp`)  
  * See full list of countries in Cell J1 of this sheet: [New Ad ID Generator (Naming Conventions)](https://docs.google.com/spreadsheets/d/1bQTgH_nNef3eNCpheHOJjXpn09RM-x41MO5kM1vCDYo/edit?gid=2057203990#gid=2057203990)  
* **CreationDate** – Date the asset is **finalized and handed to Creative Ops,** not the launch date (YYYYMMDD).  
* **PromoName** – Sale/holiday codes like `bfcm`, `ftty`, `xmas`, etc., will be standardized and used as needed.

Notes:

* **No platform code is required for images.** For Google/YouTube, the media buyer will handle any platform-specific labelling at upload.  
* Whitelisting, creator page, etc., are managed via the **Creative Performance Sheets**, not inside the creative name.

---

## **3️⃣ Other Important Callouts**

* **Actors/Gurus, whitelisting, and creator page names** are **no longer in the naming convention.**

  * Samuel’s requirement (e.g., turning off all Gary ads at once) will be handled by filtering the **Strategic Scaling System / Creative Performance Sheets** (fields for creator, whitelist, etc.), not by creative filenames.

* Editors are responsible for **completing those sheets in full** so Media can filter by creator, whitelist status, sale period, etc.

* There will be a follow-up **SOP** that clearly separates:

  * Editor responsibilities (Step 1: naming \+ sheet fields)  
    * [Ad Naming Loom](https://www.loom.com/share/a2c7bc03bbb24ea19c5cfc2083108667) \+ [New Ad ID Generator (Naming Conventions)](https://docs.google.com/spreadsheets/d/1bQTgH_nNef3eNCpheHOJjXpn09RM-x41MO5kM1vCDYo/edit?gid=2057203990#gid=2057203990)  
  * Media responsibilities (Step 2: duplication/scaling naming \+ channel/device tags)

---

## **4️⃣ Data / Patrick – DOMO Logic & Filters**

This change means that **DOMO tables and filters that currently rely on the old naming structure will need to be updated.**

Specifically:

* DOMO should treat everything **up to the CreationDate** as **structured fields**:

  * OfferCode  
  * ScriptID  
  * Variation  
  * (Platform for video)  
  * Dimensions  
  * (LengthTier for video)  
  * EditorInitials  
  * CopywriterInitials  
  * CreationDate

* Anything **after the date** should be treated as **free-form media-buyer notes** (e.g. `-mob`, `-shorts`, etc.) and not required for core logic.

* Once we start uploading ads under this new convention, any existing logic that parses the old format will begin misclassifying or showing as “uncategorized” until adjusted.

Action items for Data:

1. **Update parsing rules** in DOMO to align with the new field order above.

2. Ensure both the **Strategic Scaling System** and **Creative Performance Sheets** are wired into the dashboards as the source of truth for:

   * Creator/guru  
   * Whitelisting status  
   * Sale period (BFCM, FTTY, etc.)

3. Confirm with Media that filters for platform, length, and dimensions are returning the expected subsets (FB vs. YT, 9x16 vs. 16x9, 60s vs. 180s, etc.).

I’ll tag you, Patrick, on this message so we can coordinate any tweaks required to keep DOMO clean once the new names start coming through.

---

If anyone sees a blocker with this structure, shout in the ad-collab channel. Otherwise, editors will immediately adopt this naming convention for all new assets, and Media/Data can begin adjusting workflows accordingly.

## **❌  OLD NAMING CONVENTION (VIDEO)**

**Format:**  
 `[OfferCode]-[ScriptID]-[Variation]-[Dimensions]-[AdType]-[AdFormat]-[AdLength]-[Talent]-[EditorInitials]-[CopywriterInitials]-[PromoNam e]-[CreationDate]`

**Example:**  
`357-0003-V0029-9X16-EXP-VD-2MIN-GARYMC-JRFNO-CO-SUMMERSALE2025-08122025`

## **❌ OLD NAMING CONVENTION (IMAGE)**

**Format:**  
`[OfferCode]-[ScriptID]-[Variation]-[Dimensions]-[AdType]-[AdFormat]-[AdLength]-[Talent]-[EditorInitials]-[CopywriterInitials]-[PromoNam e]-[CreationDate]`

**Example:**

`357-I023-V0006-1080X1350-EXP-IMG-X-X-JDMR-CF-BLACKFRIDAY2025-10312025` 

## **✅  NEW NAMING CONVENTION (VIDEO)**

**Format:**  
 `[OfferCode]-[ScriptID]-[Variation]-[Platform]-[Dimensions]-[LengthTier]-[EditorInitials]-[CopywriterInitials]-[CreationDate]-[PromoName]`

**Example:**  
`357-0003-v0029-fb-9x16-180s-ca-co-20251201-bfcm`

## **✅ NEW NAMING CONVENTION (IMAGE)**

**Format:**  
 `[OfferCode]-[ScriptID]-[Variation]-[Dimensions]-[EditorInitials]-[CopywriterInitials]-[CreationDate]-[PromoName]`

**Example:**  
 `357-i074-v0001-1080x1350-ca-co-20251201-xmas`