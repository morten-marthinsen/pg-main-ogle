/**
 * All valid code tables for the 15-position naming convention.
 * Ported from Tess's naming_parser.py — aligned with TESS-NAMING-CONVENTION.md v3.5.
 *
 * KEY DIFFERENCE FROM TESS: The generator EXCLUDES legacy codes (ver, hor)
 * since all new assets use exv/exh. Tess's parser accepts them for backward
 * compatibility; Veda's generator never produces them.
 */

// ── Position 1: Funnel Codes ────────────────────────────────────────────────

/** Active physical product funnel codes (15). */
export const PHYSICAL_FUNNEL_CODES = new Set([
  "357",   // 357 Fairway Hybrid
  "clst",  // Click Stick
  "df1",   // DrawForce
  "gbf",   // General Black Friday Collections
  "ghd",   // General Holiday Collections
  "pio",   // iON+ Golf Ball
  "pll",   // Lil' Legends Toddler Set
  "rs1",   // RS1 Putter
  "sf1",   // SF1 Driver
  "sf2",   // SF2 Driver
  "spd",   // SpeedTrac
  "ssp",   // SwingSmooth PRO Supplement
  "thr",   // The Thriver
  "wdg1",  // ONE.1 Wedge
  "wdgs",  // ONE.S Wedge
]);

/** Active digital product funnel codes (11). */
export const DIGITAL_FUNNEL_CODES = new Set([
  "dqfe",  // Digital Swing Circle Quiz for SSTS/WPSS
  "dqfe1", // Digital General Golf Quiz for PG1
  "htkt",  // High Ticket Golf School
  "ossf",  // One Shot Slice Fix
  "pg1",   // PG Mobile App
  "pgb",   // Beginners Program, One Swing System
  "pgf",   // Fitness Program, Off-Season Swing Saver
  "srsw",  // Smart Distance System
  "ssdp",  // Senior Swing Distance Program
  "ssts",  // Simple Strike Sequence
  "wpss",  // Women's Pendulum Swing Sequence
]);

/** Retired funnel codes (5) — still valid for expansions of existing assets. */
export const RETIRED_FUNNEL_CODES = new Set([
  "pgapp", // PG Mobile App (retired)
  "pss",   // Pendulum Swing Sequence (retired)
  "sqse",  // The Square Set (retired)
  "sqp",   // The SQ Putter (retired)
  "tsst",  // The Straight Stick (retired)
]);

/** All valid funnel codes (31 total). */
export const VALID_FUNNEL_CODES = new Set([
  ...PHYSICAL_FUNNEL_CODES,
  ...DIGITAL_FUNNEL_CODES,
  ...RETIRED_FUNNEL_CODES,
]);

// ── Position 4: Platform Codes ──────────────────────────────────────────────

export const VALID_PLATFORMS = new Set(["fb", "yt", "xx"]);

// ── Position 5: Dimension Codes ─────────────────────────────────────────────

/** Video dimensions. */
export const VIDEO_DIMENSIONS = new Set(["9x16", "16x9"]);

/** Image dimensions. */
export const IMAGE_DIMENSIONS = new Set([
  "1080x1350",  // Portrait (4:5)
  "1080x1920",  // Full vertical (9:16)
  "1200x628",   // Landscape (1.91:1)
  "600x600",    // Small square
  "800x800",    // Medium square
  "1000x1000",  // Large square
  "1200x1200",  // XL square
  "1440x1440",  // XXL square
  "336x280",    // Medium rectangle (display)
  "300x250",    // Medium rectangle (display)
  "320x50",     // Mobile leaderboard (display)
]);

/** All valid dimensions (video + image). */
export const VALID_DIMENSIONS = new Set([
  ...VIDEO_DIMENSIONS,
  ...IMAGE_DIMENSIONS,
]);

// ── Position 6: Length Tier Codes ───────────────────────────────────────────

export const VALID_LENGTH_TIERS = new Set([
  "30s",
  "60s",
  "180s",
  "360s",
  "360s+",
  "xx",  // N/A (images)
]);

// ── Position 7: Ad Category Codes ───────────────────────────────────────────

/**
 * Generator-valid ad categories. No legacy ver/hor — new assets use exv/exh.
 * Position 7 is the SOLE indicator of Net New vs Expansion.
 */
export const VALID_AD_CATEGORIES = new Set([
  "nn",    // Net New
  "exv",   // Vertical Expansion
  "exh",   // Horizontal Expansion
  "nnmu",  // Mashup (Net New Mashup)
]);

// ── Position 8: Expansion Type Codes ────────────────────────────────────────

export const VALID_EXPANSION_TYPES = new Set([
  "hs",   // Hook Stack (3-15s)
  "ssr",  // Scroll Stopper Reel (0-3s)
  "dur",  // Duration (reassembly from best segments)
  "env",  // Environment (real footage or AI)
  "sp",   // Similar Presenter
  "dp",   // Different Presenter
  "af",   // Ad Format
  "cf",   // Copy Framework
  "int",  // International
  "xx",   // N/A (Net New / Mashup)
]);

// ── Position 9: Asset Type Codes ────────────────────────────────────────────

export const VALID_ASSET_TYPES = new Set([
  "pod",  // Podcast
  "tlr",  // Tele/Ronin (Teleprompter)
  "sad",  // Slice & Dice
  "bvo",  // Human VO + B-Roll
  "avo",  // AIVO (AI Voice Over)
  "img",  // Image
  "aip",  // Actor/Influencer (Paid)
  "aio",  // Actor/Influencer (Organic)
  "gru",  // Guru
  "cdn",  // Cutdown
  "vd",   // Legacy: generic video (pre-convention production assets)
]);

// ── Position 10: Talent Codes ───────────────────────────────────────────────

/** All 41 active talent codes. */
export const VALID_TALENT_CODES = new Set([
  "alla",  // Allyson & Emme Lantis
  "anri",  // Andrew Rice
  "avdo",  // Averee Dovsek
  "bral",  // Brixton Albert
  "brmo",  // Briana Morris
  "camc",  // Cameron McCormik
  "capi",  // Carolin Pinegger
  "casm",  // Carter Smith (DOD)
  "chbr",  // Chris Branden
  "chkr",  // Chris Kromlidis
  "chna",  // Changyhun Nam
  "chog",  // Christopher Ogle
  "crha",  // Craig Hanson
  "diwe",  // Diana West
  "dofr",  // Donnie French
  "erco",  // Eric Cogorno
  "erla",  // Erika Larkin
  "frmo",  // Frank Moretti
  "gamc",  // Gary McCord
  "geca",  // Gerry Carry
  "grho",  // Grant Horvat
  "haha",  // Hank Haney
  "hegr",  // Henry Grillo
  "jacu",  // Jasmin Cull
  "jeri",  // Jeff Ritter
  "jotr",  // Joey Tritsch
  "jtth",  // JT Thomas
  "kero",  // Kevin Roy
  "mabo",  // Martin Borgmeier
  "mach",  // Martin Chuck
  "mame",  // Marisa Messana
  "neha",  // Neil Hayne
  "pebe",  // Pete Beck
  "pega",  // Peter Galman
  "pohi",  // Portia Hill
  "ribe",  // Rich Beem
  "rism",  // Rick Smith
  "roke",  // Ross Ketner
  "rome",  // Rocco Mediate
  "sali",  // Sam Lion
  "trbi",  // Dr. Troy Van Biezen
]);

// ── Position 13: Country Codes ──────────────────────────────────────────────

export const VALID_COUNTRY_CODES = new Set([
  "us",  // United States
  "au",  // Australia
  "ca",  // Canada
  "de",  // Germany
  "gb",  // United Kingdom
  "ie",  // Ireland
  "jp",  // Japan
  "kr",  // South Korea
  "mx",  // Mexico
  "nl",  // Netherlands
  "nz",  // New Zealand
  "se",  // Sweden
  "th",  // Thailand
]);

// ── Ad Format → Asset Type Mapping ──────────────────────────────────────────

/**
 * Maps human-readable Ad Format names (from tickets) to Asset Type codes.
 * Keys are lowercase for case-insensitive matching.
 */
export const AD_FORMAT_TO_ASSET_TYPE = new Map<string, string>([
  ["podcast", "pod"],
  ["tele/ronin", "tlr"],
  ["teleprompter", "tlr"],
  ["slice & dice", "sad"],
  ["slice and dice", "sad"],
  ["human vo + b-roll", "bvo"],
  ["b-roll + vo", "bvo"],
  ["aivo", "avo"],
  ["ai voice over", "avo"],
  ["image", "img"],
  ["actor/influencer (paid)", "aip"],
  ["actor/influencer (organic)", "aio"],
  ["guru", "gru"],
  ["cutdown", "cdn"],
]);

// ── Regex Patterns ──────────────────────────────────────────────────────────

export const SCRIPT_ID_PATTERN = /^(\d{4}|i\d{3}|h\d{3,4})$/;
export const VARIATION_ID_PATTERN = /^v\d{4}$/;
export const DIMENSIONS_PATTERN = /^\d+x\d+$/;
export const CREATION_DATE_PATTERN = /^\d{8}$/;
