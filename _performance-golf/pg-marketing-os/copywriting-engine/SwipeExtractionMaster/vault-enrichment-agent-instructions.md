# Vault Enrichment Agent — Mechanism Field Classification

**Version:** 1.0
**Type:** Batch Classification
**Input:** 1,341 JSON files in `CopywritingEngine/PremiumSwipeVault/Processed/`
**Output:** `vault-mechanism-enrichment.json` (overlay file, does NOT modify originals)

---

## Purpose

The vault extraction captured raw mechanism names and lead text but left classification fields empty. This agent reads each file's existing data and classifies:
1. `mechanism_type` — What TYPE of mechanism is this?
2. `naming_pattern` — What NAMING STRATEGY does the name use?
3. `root_cause_reframe` — Extract the root cause argument from the copy
4. `emphasis_calibration` — Where does the copy spend most of its mechanism bandwidth?

**This is a CLASSIFICATION task, not a creative task.** You are reading existing copy and categorizing what's already there.

---

## File Location

```
VAULT ROOT:   /Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/
Source files: /Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/CopywritingEngine/PremiumSwipeVault/Processed/*.json
Output file:  /Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/CopywritingEngine/PremiumSwipeVault/vault-mechanism-enrichment.json

Total files:  1,341 JSON files
```

**WARNING:** There are deprecated vault copies at `BigIdeaMaster/PremiumSwipeVault/` (21 old files) and `BigIdeaEngine/PremiumSwipeVault/` (empty). IGNORE THESE. Only use the CopywritingEngine path above.

---

## Vault File Structure (What You're Reading)

Each JSON has this relevant structure:
```json
{
  "swipe_id": "string",
  "components": {
    "mechanism": {
      "name": "string or null",
      "type": "string or null",
      "naming_pattern": "string or null",
      "explanation_text": "string or null",
      "root_cause": {
        "what_they_think_problem_is": "string or null",
        "what_real_problem_is": "string or null",
        "why_nothing_worked": "string or null",
        "emphasis_level": "string",
        "reframe_technique": "string"
      }
    },
    "lead": {
      "full_text": "string (the actual copy — often 1000-3000 words)"
    },
    "headline": {
      "main_headline": "string"
    }
  },
  "configuration": {
    "elements": { "MECHANISM": integer_score }
  }
}
```

---

## Classification Taxonomies

### Mechanism Types (7 categories)

These types classify the SOURCE OF POWER — where the mechanism derives its persuasive authority.

Assign a PRIMARY type. If a clear second source of power is present, assign a SECONDARY type (e.g., "Simple Strike Sequence" = BEHAVIORAL primary + SEQUENCE secondary).

```
SCIENTIFIC — Power comes from research, studies, biological/chemical processes
  Source of power: Clinical/academic credibility, peer-reviewed evidence
  Indicators: References studies, uses medical/scientific terminology,
  mentions compounds/molecules, cites researchers or institutions
  Examples: "Cortisol Reset Protocol", "EDTA Chelation", "Sirtuin Gene Activation",
  "Gut-Brain Axis Reset", "NF-kB Master Switch"

TECHNICAL — Power comes from specialized expertise, precision, proprietary analysis
  Source of power: Expert-level precision, insider knowledge, analytical frameworks
  Indicators: Charts, patterns, algorithms, proprietary scoring systems,
  specialized vocabulary from a technical discipline (finance, golf, engineering)
  Examples: "The X Pattern", "Weiss Rating System", "Neural Trading Protocol",
  "Power Plane", "The Dines Tripod Method", "Triple Coil"

NATURAL — Power comes from nature, organic processes, ancestral/traditional wisdom
  Source of power: Natural authority — what nature/tradition already provides
  Indicators: References plants, ancient practices, traditional medicine,
  geographic origin, organic/non-synthetic, longevity cultures
  Examples: "Okinawan Longevity Secret", "Ancient Seed Activation",
  "Firming Flavonoids", "Caveman Diet"

COMPOUND — Power comes from a specific combination, blend, or synergistic formula
  Source of power: The unique COMBINATION is the innovation (parts alone don't work)
  Indicators: Ingredient lists, ratios, multi-component blends, synergy claims,
  "together they create...", specific numbered combinations
  Examples: "The 4-3-1 Formula", "7 Forms of Magnesium", "Budwig Formula",
  "Triple-Action Formula", "7 MAX Breakthroughs"

BEHAVIORAL — Power comes from a specific action, movement, drill, or habit change
  Source of power: Something YOU DO differently (physical or behavioral)
  Indicators: Specific actions, movements, drills, exercises, body mechanics,
  habit modifications, "do this one thing"
  Examples: "Simple Strike", "Counter-Slice Sequence", "The Compression Method",
  "6-Second Stretch", "The Turn"

SEQUENCE — Power comes from a chain reaction or cascade effect
  Source of power: Automatic sequential response — one trigger starts a domino chain
  Indicators: "triggers", "cascade", "chain reaction", "domino effect",
  "once X happens, Y automatically follows", "activates a sequence"
  Examples: "Metabolic Cascade", "The Domino Effect", "Neural Pathway Cascade",
  "Cortisol Cascade Reset", "Sleep Switch" (one action triggers automatic chain)

SYSTEM — Power comes from a structured multi-component methodology
  Source of power: The organized STRUCTURE provides the authority (steps, phases, rules)
  Indicators: Numbered steps, phases, modules, multi-part processes,
  compliance requirements, prescribed sequences, "follow the system"
  Examples: "3-Phase Swing System", "5 Superstar System", "Ask Method",
  "Product Launch Formula", "StoryBrand Framework"
```

### Naming Patterns (7 categories)

These patterns classify the NAMING STRATEGY — what the name DOES to the reader's perception.

Assign a PRIMARY pattern. If a clear second strategy is present, assign a SECONDARY pattern.

```
CLINICAL — Name uses medical, scientific, or academic language to create credibility
  Strategy: Borrow clinical authority through vocabulary choice
  Indicators: Latin/Greek roots, medical terminology, biological language,
  research-sounding phrasing
  Examples: "Sirtuin Gene Activation", "Metabolic Shortcut Activation",
  "Neural Pathway Reset", "Parasympathetic Override", "Fascial Release Protocol"

BRANDED_FORMAT — Name uses a proprietary format structure ([Name] + System/Method/Formula/Protocol)
  Strategy: Create ownability through format — the structure implies proprietary IP
  Indicators: [Proper noun/Name] + [Framework term], [Branded modifier] + [System word]
  Examples: "Weiss Rating System", "Ask Method", "Product Launch Formula",
  "StoryBrand Framework", "E5 Method", "Pauling Therapy Protocol",
  "The Dines Tripod Method"

METAPHOR — Name borrows imagery from another domain to create understanding
  Strategy: Import a familiar image that explains the mechanism's action
  Indicators: Figurative comparison, cross-domain imagery, visual language
  that doesn't literally describe the process
  Examples: "Sleep Switch", "Cellular Furnace", "Muscle Confusion",
  "Thermal Burn", "Dividend Snowball", "The Domino Effect", "Power Plane"

ORIGIN — Name references a geographic location, historical era, or person of authority
  Strategy: Borrow credibility from a place, time, or authority figure
  Indicators: Geographic names, historical dates/eras, person names,
  cultural references, expedition/discovery framing
  Examples: "Okinawan Longevity Secret", "The Pauling Protocol",
  "Budwig Formula", "The 4,000-Year Paradox", "Ancient Seed Activation"

NUMBERED — Name includes a specific number to create precision and structure
  Strategy: Numbers create specificity, memorability, and implied precision
  Indicators: Any specific number in the name (steps, components, days, elements)
  Examples: "4th Dimension Turning Point", "7 Forms of Magnesium",
  "5 Superstar System", "The 4-3-1 Formula", "Triple Coil"

EXPERIENTIAL — Name describes what you FEEL or DO (action/sensation language)
  Strategy: Put the reader in the experience — they can feel the mechanism working
  Indicators: Action verbs, sensation words, kinesthetic language,
  movement descriptions, body-feeling terms
  Examples: "Simple Strike", "Counter-Slice Sequence", "The Turn",
  "6-Second Stretch", "The Compression Method", "Primal Override"

INVENTED — Name is a coined word, portmanteau, or branded ingredient term
  Strategy: Create a completely ownable term that can't be copied
  Indicators: Made-up words, Latin/Greek root combinations forming new terms,
  branded ingredient names, neologisms
  Examples: "BioPerine", "KSM-66", "Cognizin", "Bergamonte",
  "Synaptogenix", "Chrono-Release"
```

### Root Cause Extraction

From the lead text, identify:

```
what_they_think_problem_is:
  The surface-level problem the prospect believes causes their pain.
  Usually stated early in the lead. Look for: "you think...", "they told you...",
  "everyone says...", "the common belief is..."

what_real_problem_is:
  The reframed root cause the copy reveals as the TRUE problem.
  Usually comes after a story or revelation. Look for: "but the REAL reason...",
  "what's actually happening is...", "the truth is...", "what nobody told you..."

why_nothing_worked:
  The explanation for why previous solutions failed.
  Look for: "that's why...", "this is exactly why...", "the reason [solutions] don't work...",
  "it's not your fault because..."
```

### Emphasis Calibration

Assess where the copy spends most of its "mechanism bandwidth":

```
ROOT_CAUSE_HEAVY — 50%+ of mechanism copy explains the problem/root cause
  The copy goes DEEP on why the problem exists, whose fault it is,
  why nothing worked before. The solution/delivery is mentioned briefly.
  Typical in Stage 5 (Most Aware) markets.

SCIENCE_HEAVY — 50%+ of mechanism copy explains HOW the solution works
  The copy goes DEEP on the scientific/logical explanation of the mechanism.
  Root cause is touched briefly, delivery is mentioned briefly.
  Typical in Stage 3 (Solution Aware) markets.

DELIVERY_HEAVY — 50%+ of mechanism copy shows the product/method in action
  The copy goes DEEP on demonstrating the tangible innovation.
  Root cause and science are touched briefly.
  Typical in Stage 4 (Product Aware) markets.

BALANCED — Roughly equal across all three (20-40% each)
  No single element dominates. Less common but exists.

MECHANISM_LIGHT — The copy doesn't spend much time on mechanism at all
  Promise/identity/proof dominate. Mechanism is mentioned but not developed.
```

---

## Processing Instructions

### Batch Strategy

Process files in batches of 20-30 at a time. For each file:

1. **Read** the file's `components.mechanism.name`, `components.lead.full_text`, and `components.headline.main_headline`

2. **Classify mechanism_type** based on:
   - The SOURCE OF POWER — where does the mechanism derive its authority?
   - The explanation_text if available
   - The lead text context (how is the mechanism positioned?)
   - Assign primary type; assign secondary only if a clear second power source is present
   - If the name is null/empty, classify based on lead text or mark "NO_MECHANISM"

3. **Classify naming_pattern** based on:
   - The STRATEGY the name uses on the reader's perception
   - Apply the 7-category taxonomy above
   - Assign primary pattern; assign secondary only if a clear second strategy is present
   - If name is null/empty, mark "NO_NAME"

4. **Extract root_cause** from lead text:
   - Scan the full_text for root cause language patterns
   - Extract concise versions of what_they_think / what_real_problem_is / why_nothing_worked
   - If the lead doesn't contain root cause reframing, leave as null

5. **Classify emphasis_calibration**:
   - Read the lead text and assess where the "mechanism bandwidth" goes
   - Is most of the persuasion energy on the problem? The science? The delivery?
   - Classify into the 5 categories above

---

## Output Schema

```json
{
  "enrichment_metadata": {
    "version": "1.0",
    "date": "ISO timestamp",
    "files_processed": integer,
    "files_with_mechanism": integer,
    "files_without_mechanism": integer
  },
  "enrichments": [
    {
      "swipe_id": "string",
      "mechanism_type_primary": "SCIENTIFIC|TECHNICAL|NATURAL|COMPOUND|BEHAVIORAL|SEQUENCE|SYSTEM|NO_MECHANISM",
      "mechanism_type_secondary": "SCIENTIFIC|TECHNICAL|NATURAL|COMPOUND|BEHAVIORAL|SEQUENCE|SYSTEM|null",
      "mechanism_type_confidence": "high|medium|low",
      "mechanism_type_rationale": "brief reason",

      "naming_pattern_primary": "CLINICAL|BRANDED_FORMAT|METAPHOR|ORIGIN|NUMBERED|EXPERIENTIAL|INVENTED|NO_NAME",
      "naming_pattern_secondary": "CLINICAL|BRANDED_FORMAT|METAPHOR|ORIGIN|NUMBERED|EXPERIENTIAL|INVENTED|null",
      "naming_pattern_confidence": "high|medium|low",

      "root_cause_extracted": {
        "what_they_think": "string or null",
        "what_real_problem_is": "string or null",
        "why_nothing_worked": "string or null",
        "extraction_confidence": "high|medium|low|not_present"
      },

      "emphasis_calibration": "ROOT_CAUSE_HEAVY|SCIENCE_HEAVY|DELIVERY_HEAVY|BALANCED|MECHANISM_LIGHT",
      "emphasis_confidence": "high|medium|low",

      "e5_type": "ACTUAL|UNSPOKEN|TRANSSUBSTANTIATED|UNCLEAR",
      "e5_rationale": "brief reason"
    }
  ],
  "distribution_summary": {
    "mechanism_types": {},
    "naming_patterns": {},
    "emphasis_calibrations": {},
    "e5_types": {},
    "root_cause_extraction_rate": float
  }
}
```

---

## E5 Type Classification (Bonus Field)

In addition to the operational 7-type taxonomy, classify each mechanism into Todd Brown's E5 framework:

```
ACTUAL — A genuinely unique mechanism the creator invented/developed
  The mechanism IS different. It's their own framework, process, or discovery.
  Examples: P90X's "Muscle Confusion", Ask Method, Product Launch Formula

UNSPOKEN — An existing process articulated in a new way (Schlitz/Hopkins principle)
  The mechanism is what everyone does, but nobody has SAID IT before.
  By naming what's already happening, you own it.
  Examples: "We wash our bottles with live steam" (all breweries did this)

TRANSSUBSTANTIATED — An ordinary concept renamed to feel extraordinary
  Takes a common idea and gives it a scientific/powerful name.
  Examples: "Trip wire" = low ticket offer, "Erection Muscle" = PC muscle

UNCLEAR — Cannot determine from available copy
```

---

## Quality Rules

1. **Never guess when you can't tell.** Use "low" confidence and explain why.
2. **Read the actual copy.** Don't classify based on name alone — the lead text provides context.
3. **Be precise on root cause extraction.** Only extract if the copy actually makes the argument. Don't infer what's not stated.
4. **If mechanism name is null AND lead has no mechanism language**, classify as NO_MECHANISM.
5. **Emphasis calibration should be based on WORD COUNT proportion**, not just presence/absence.

---

## Execution Notes

- Start with a 10-file test batch to calibrate your classifications
- After test batch, check: are your type distributions reasonable? (expect SCIENTIFIC and COMPOUND to be common in health, BEHAVIORAL and TECHNICAL in golf, SYSTEM in biz-opp/finance)
- Process remaining files in batches of 20-30
- Save progress incrementally (append to enrichments array)
- Final output goes to: `/Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/CopywritingEngine/PremiumSwipeVault/vault-mechanism-enrichment.json`

---

## What This Enables

Once complete, the mechanism-vault-intelligence.json can be regenerated with:
- Accurate type distributions (not 991 "unspecified")
- Accurate naming pattern distributions (not 1153 "unspecified")
- Rich root cause data for emphasis calibration
- E5 type insights for creative strategy
- Correlation data between types, patterns, emphasis, and quality scores
