---
name: ugly-vsl-slide-deck-creator
description: Transform a raw prose VSL script into a finished Keynote slide deck for "ugly VSL" videos. Converts prose to one-thought-per-slide format, applies emphasis (bold, red, underline), adds pattern interrupts, and outputs a styled Keynote presentation. Use when you have a VSL script file and need to create presentation slides.
---

# Ugly VSL Slide Deck Creator

Transform a raw prose VSL script into a polished Keynote slide deck optimized for "ugly VSL" style videos.

## Workflow

```
Input: File path to prose VSL script
                ↓
         [Phase I]
         Break prose into one-line-per-slide format
                ↓
         Save: {filename}-lines.txt
                ↓
         [Phase II]
         Generate Keynote with styling and emphasis
                ↓
         [Phase III]
         Disable auto-sizing for consistent font size
                ↓
         Opens Keynote with presentation
                ↓
         Present completion summary to user
```

## Phase I: Script to Lines

Transform the prose script into plain text where each line represents one slide.

### Rules for Line Breaks

1. **One complete thought per slide** - Each slide must convey a complete thought (not necessarily a complete sentence)
2. **No incomplete thoughts** - Never split a thought across two slides UNLESS using a deliberate two-beat split (see below)
3. **Fewer words is better** - Prefer more slides with less text over fewer slides with more text
4. **Use ellipses (...)** - Replace periods with ellipses to imply continuation and keep viewers engaged
5. **Capitalize after breaks** - When breaking mid-sentence, capitalize the first word of the new line
6. **Blank lines separate slides** - Each slide is separated by a blank line in the lines file

### Two-Beat Splits for Pacing

Dense slides that carry two distinct ideas should be split into two slides for better pacing. Use an em-dash ellipsis (…) to signal continuation between the two beats.

**When to split:**
- A slide has a setup + payoff that deserve separate beats
- A slide combines two distinct ideas joined by "and" or a comma
- A key phrase deserves its own moment for impact

**Examples:**

Before (one dense slide):
```
Add in my 365-day Demo Period Guarantee... and you risk nothing...
```

After (two-beat split):
```
Add in my 365-day Demo Period Guarantee...

You risk nothing...
```

Before:
```
Equipment that makes the game easier for you, so you have more fun every time you play...
```

After:
```
Equipment that makes the game easier for you…

…so you have more fun every time you play...
```

Use the … (em-dash ellipsis) at the end of the first slide and/or start of the second slide to signal the continuation.

### Lines File Format (Critical)

The lines file uses **blank lines as slide delimiters**:
- Each slide's content is separated from the next by a blank line
- Multiple consecutive non-blank lines become a **single slide with line breaks**
- This allows control over text wrapping within a slide

**Single-line slide:**
```
This is slide one...

This is slide two...

This is slide three...
```

**Multi-line slide (text with controlled line breaks):**
```
This is a longer thought
that spans two lines on the slide...

This is the next slide...
```

**IMPORTANT:** Always include a blank line between each slide. Without blank lines, all content will be combined into a single slide.

### Line Break Strategy: Let Keynote Handle Wrapping

**CRITICAL: Do NOT pre-break lines in the lines file.** Keep each slide's content on a single line and let Keynote handle text wrapping naturally. Pre-breaking lines with scripts or manual line breaks causes more orphan problems than it solves.

#### Why Single-Line Slides Work Better:

1. **Keynote's text wrapping is optimized** - Keynote's built-in text wrapping algorithm handles most cases well
2. **Pre-breaking creates orphans** - Attempting to predict where Keynote will wrap text and pre-breaking lines almost always creates orphans (1-2 words stranded on a line)
3. **Character width calculations are unreliable** - Font rendering varies, making width predictions inaccurate
4. **Simpler workflow** - One thought = one line = one slide

#### When to Use Multi-Line Slides:

Only use explicit line breaks (multiple lines for one slide) in these specific cases:

1. **Emphasis placement** - When you want an emphasized word to lead its own line:
   ```
   You've completely
   **eliminated** ALL your struggles from 30 to 70 yards...
   ```

2. **Very long slides that would benefit from visual grouping** - Rare cases where a thought is long but shouldn't be split into separate slides

3. **Intentional pacing** - When you want the viewer to see text appear in a specific visual arrangement

#### Guidelines for Single-Line Slides:

1. **Keep complete thoughts together** - Each slide should be one complete thought on one line
2. **Shorter is better** - Prefer more slides with less text over fewer slides with more text
3. **Trust Keynote** - Let Keynote wrap long lines naturally; it handles most cases well
4. **Emphasis placement exception** - The main reason to use multi-line slides is to ensure emphasized words lead their line

### Line Break Examples

**BEST - Single line, let Keynote wrap:**
```
Caused by a problematic protein that builds up in your joints starting around age 45...
```

**GOOD - Emphasis placement (only reason to use multi-line):**
```
You've completely
**eliminated** ALL your struggles from 30 to 70 yards...
```

**BAD - Pre-breaking creates orphans:**
```
Caused by a problematic protein
that builds up in your
joints starting around age 45...
```
This creates orphans because you can't reliably predict where Keynote will wrap.

**BAD - Overly aggressive line breaking:**
```
I've seen ONE thing
separate those who play consistently well...
```
Unless the emphasis requires it, keep this as a single line.

**GOOD - Single line slides:**
```
Slows your rotation...
```

```
Stairs seem steeper...
```

```
Triggering a chain reaction that locks down your flexibility...
```

### Example Transformation

**Before (prose):**
```
And the crazy thing is, most golfers have been taught completely wrong. They've been told to keep their head down and their arm straight. But that's actually causing more harm than good.
```

**After (lines file with blank line separators):**
```
And the crazy thing is...

Most golfers have been taught completely wrong...

They've been told to keep their head down...

And their arm straight...

But that's causing more harm than good...
```

Note: "completely wrong" stays plain text — it's a negative/problem, not a positive outcome. The word "actually" was removed as throat-clearing.

## Phase II: Lines to Keynote

Generate a styled Keynote presentation from the line-by-line text.

### Slide Styling

- **Background:** White
- **Text color:** Black
- **Font:** Montserrat Medium, 112pt
- **Text position:** Centered horizontally and vertically
- **Layout:** "Title - Center" master slide from "White" theme
- **Title text box geometry:**
  - Position: x=141pt, y=59pt (centered on 1920px slide)
  - Size: width=1638pt, height=962pt
  - Keynote handles text wrapping automatically within this box
- **Auto-sizing:** Disabled automatically via post-processing script for consistent 112pt text across all slides

### Emphasis Rules

Apply emphasis sparingly - not on every slide. Overuse diminishes impact.

**CRITICAL: Only emphasize the POSITIVE.** Bold, red, and all other emphasis go exclusively on benefits, outcomes, promises, and desirable results — the things prospects WANT. Never bold or emphasize negative, fear-based, or problem-focused words or phrases. The negatives do their job in plain text; the visual "highlight reel" of the deck should be 100% aspirational.

| Type | When to Use | Styling |
|------|-------------|---------|
| **Bold** | Benefits, promises, outcomes, desirable results, key numbers | Bold text |
| **Bold + Red** | High-impact positive moments — the biggest promises, transformation results, aspirational outcomes | Bold + #B11800 |
| **Underline** | Very rare - special positive terms that need extra pop | Underline (use sparingly) |

**What to emphasize:**
- Desirable outcomes: "**20-30 yards**", "**straight drives**", "**hit fairways consistently**"
- Positive transformations and benefits
- Key positive numbers (distance gains, prices/savings, results)
- Product names and unique mechanism names

**What NOT to emphasize (leave as plain text):**
- Pain points, problems, fears, negative qualities
- Words like "not," "never," "wrong," "broken," "failing," "struggling"
- Flawed solutions, bad outcomes, things they want to avoid
- Negative framing even when describing what the product fixes

**Guidelines:**
- Red text is ALWAYS also bolded
- Not every bold text is red — red is reserved for the BIGGEST positive moments
- Only emphasize when you want something to "pop"
- If every slide has emphasis, nothing stands out

### Pattern Interrupts

Every 12-20 slides, modify the slide text so it differs from the spoken script.

**Techniques:**
- Change a word
- Shorten a sentence significantly
- Show only a key word or phrase
- Use ALL CAPS for a single word (sparingly — see ALL CAPS rules below)

**Purpose:** Keep viewers visually engaged by making them notice the slides aren't just captions of the audio.

### ALL CAPS Usage

Reserve ALL CAPS for persuasion-critical moments only. Do NOT use ALL CAPS for general emphasis.

**Good uses (persuasion-critical):**
- NOT (when reframing: "NOT your swing," "NOT against it")
- YOUR / YOU (when making it personal: "YOUR game," "what would that do for YOU")
- ONLY (when framing the deal: "ONLY $249")
- NO (when removing objections: "NO payment plans or hidden fees")

**Bad uses (general emphasis — avoid):**
- THAT's → That's
- FORGE → forge
- AND → and
- OR → or
- JUMP → jump

### Copy Tightening

When converting prose to slides, tighten the copy:
- Remove throat-clearing phrases: "To be clear," "Obviously," "Again,"
- Remove unnecessary filler words: "actually," "really," "of mine"
- Use "…" (em-dash ellipsis) for natural continuation between split slides
- Use parentheses where appropriate instead of nested ellipses
- Fix grammar issues (e.g., "Chris and I's" → "our")
- Use American spellings (e.g., "aluminum" not "aluminium")

### Dollar Formatting

Format all dollar amounts with .00 for visual weight and credibility:
- $499 → $499.00
- $197 → $197.00
- $1,000+ → $1,000.00+

### Antagonist Labels

When the script references an antagonist entity (e.g., "Big Golf," "Big Pharma"), wrap it in quotation marks to frame it as a named villain:
- Big Golf → "Big Golf"

## Execution

When the user provides a file path:

1. Read the prose VSL script from the provided path
2. Execute Phase I: Transform to one-line-per-slide format
3. Save intermediate file as `{original-filename}-lines.txt` in the same directory
4. Execute Phase II: Generate Keynote with styling and emphasis
5. Run the `create_keynote.scpt` AppleScript to generate and save the Keynote presentation
6. Save as `{original-filename}-slides.key` in the same directory
7. Execute Phase III: Disable auto-sizing for consistent font size
8. Run the `disable_autosize.py` script to post-process the Keynote file
9. Present completion summary to user

### Running the Keynote Script

```bash
osascript {skill-path}/scripts/create_keynote.scpt "{lines-file-path}" "{output-keynote-path}"
```

The script reads the lines file and creates a styled Keynote presentation with:
- White background slides (using "White" theme)
- Black centered text (Montserrat Medium 112pt)
- Emphasis markers interpreted as formatting:
  - `**text**` → Bold (Montserrat-Bold)
  - `**{red}text{/red}**` → Bold + Red (#B11800)
  - `__text__` → Italic (Montserrat-MediumItalic) - AppleScript doesn't support underline directly

The presentation is automatically saved to the specified output path as a `.key` file.

### Disabling Auto-Sizing

After generating the Keynote presentation, run the post-processing script to disable auto-sizing:

```bash
python3 {skill-path}/scripts/disable_autosize.py "{output-keynote-path}"
```

This script:
- Unpacks the Keynote file (which is a ZIP archive containing protobuf data)
- Modifies the `shrinkToFit` property from `true` to `false` in the DocumentStylesheet
- Repacks the Keynote file

This ensures all slides display text at a consistent 112pt size, regardless of text length.

**Requirements:** The `keynote-parser` Python package must be installed (`pip3 install keynote-parser`).

## Resources

### scripts/
- `create_keynote.scpt` - AppleScript that generates the Keynote presentation from the lines text file
- `disable_autosize.py` - Python script that disables auto-sizing in the generated Keynote file (requires keynote-parser)
- `create_pptx.py` - Python script for PowerPoint generation (backup option, requires python-pptx)
- `reflow_lines.py` - **DEPRECATED** - Do not use. Pre-breaking lines causes more orphan problems than it solves. Keep slides as single lines.

### references/
- `emphasis-guidelines.md` - Detailed rules for applying emphasis

### examples/
Contains before/after examples:
- `Ugly-VSL-Script-Before-Example1.md` - Raw prose script (input example)
- `Ugly-VSL-Script-After-Example1.md` - Line-by-line format (Phase I output)
- `Ugly-VSL-Script-After-Example2.md` - Another Phase I output example
- `GSG VSL Slide Deck.md` - Completed slide deck example
- `Hank Haney VSLSlides.md` - Completed slide deck example
- `onewedge-vsl.md` - Completed slide deck example
