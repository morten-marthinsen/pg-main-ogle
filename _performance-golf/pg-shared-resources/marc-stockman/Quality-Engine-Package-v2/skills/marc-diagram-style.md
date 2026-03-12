---
name: marc-diagram-style
description: "Visual diagram rendering rules for matplotlib/PIL — fonts, layout, colors, self-audit checklist. 15 rules for technical diagrams."
---

# Marc's Technical Diagram Style Guide

**Version:** 1.2 | March 6, 2026

## When to Use This Skill

Use this skill whenever Marc asks for:
- Technical architecture diagrams
- System flow diagrams
- Layer-based infrastructure graphics
- Any visual diagram rendered programmatically (matplotlib, PIL, etc.)
- Updates or edits to existing technical diagrams

Load this skill BEFORE writing any diagram code. Every rule here exists because of a specific mistake that required multiple revision cycles.

---

## RULE 1: Graphics, Not Text

**Never** render diagrams as ASCII art, text boxes in markdown, or monospaced character layouts. Marc's standing instruction:

> "Include visual diagrams, not with text but with graphics where appropriate, making sure they're crisp, clear, with a large enough font to see."

Always produce `.png` image files using matplotlib, PIL, or equivalent graphical rendering.

---

## RULE 2: Font Sizing — Go Big or Go Home

This is the single most common failure. Marc has corrected undersized fonts in nearly every diagram session. Use these minimums:

| Element | Minimum Font Size | Weight |
|---------|-------------------|--------|
| Diagram title | 36–40px | Bold |
| Layer/section headers | 28–32px | Bold |
| Tool/component names (inside boxes) | 24–28px | Bold |
| Sub-labels / descriptions | 18–22px | Regular |
| Agent/role names | 20–24px | SemiBold |
| Layer labels (sidebar/banner) | 16–18px | Bold, UPPERCASE |
| Agent numbers / badges | 24–28px | Bold |
| Flow indicators / arrows | 16–18px | Regular |
| Footer / attribution | 14–16px | Regular |

**Test**: If you have to squint to read it at 100% zoom on a 1080p screen, it's too small.

**Layout-specific exception — dense card/comparison layouts:** When rendering multi-column comparison cards (3+ columns with multiple rows), the minimums above may cause text overflow. In these layouts, body text may drop to 14-17px and category labels to 12-14px while remaining compliant, provided: (a) the text passes the squint test at 100% zoom, (b) the Rule 12 self-audit confirms readability, and (c) no text is truncated or overflowing its container. This exception exists because the standard minimums are calibrated for layer-based architecture diagrams with wide horizontal space.

---

## RULE 3: Content Must Fit in One Viewport

Diagrams that are too tall or wide cause critical content to be cut off. This has happened repeatedly — bottom sections (Evolution layers, Application layers, Team sections, footers) were clipped.

**Constraints:**
- Maximum matplotlib figsize: `(28, 20)` at `dpi=150` — this is the absolute ceiling before OOM errors
- Preferred figsize: `(24, 16)` at `dpi=150` for most diagrams
- All content MUST be visible without scrolling
- After rendering, visually verify that the bottom 20% of the diagram is intact
- If content doesn't fit, reduce whitespace or restructure the layout — never just let it clip

---

## RULE 4: Strict Left Alignment

All layers, sections, and content blocks must share a consistent left margin. Elements floating at different horizontal offsets look like "afterthoughts."

**Rules:**
- Define a single `LEFT_MARGIN` constant (e.g., `x=0.03` in figure coordinates)
- Every layer block starts at the same x-position
- Cards/boxes within a layer can be offset for grouping, but the layer container itself must align
- Sidebar labels (if used) get their own consistent column width

---

## RULE 5: Spanning/Oversight Elements

When a component spans across or oversees multiple layers (e.g., a "Quality Shield," governance layer, or security wrapper), it MUST be rendered as a full-width banner — NOT as a peer-level card sitting next to other items.

**Rules:**
- Spanning elements get their own horizontal band stretching the full diagram width
- Use a distinct background color to visually separate them
- Place them at the correct z-order (above or wrapping the layers they govern)
- Never render a spanning concept as just another card in a grid

---

## RULE 6: Important Components Get Prominent Treatment

Key components must never be "buried" among peers. When something is architecturally significant:

**Rules:**
- Give it a larger box or its own dedicated section
- Use a distinct accent color (e.g., Terra `#A84B2F` for emphasis)
- Add an icon or visual badge if appropriate
- Consider a callout or spotlight treatment
- If Marc says something is "buried," it needs 2x the visual weight

---

## RULE 7: Brand Color Palette (Perplexity)

Use the Perplexity brand palette consistently:

| Name | Hex | Usage |
|------|-----|-------|
| Dark Navy | `#091717` | Darkest backgrounds |
| Dark Teal | `#13343B` | Body text, headers |
| Deep Teal | `#115058` | Deep accents |
| Muted Teal | `#20808D` | Primary accent, links |
| Light Teal | `#D6F5FA` | Light accents, highlights |
| Off-White | `#FCFAF6` | Primary background |
| Paper White | `#F3F3EE` | Alternate backgrounds |
| Warm Beige | `#E5E3D4` | Cards, containers |
| Terra/Rust | `#A84B2F` | Emphasis, warnings, key callouts |
| Mauve | `#944454` | Secondary accent |
| Gold | `#FFC553` | Highlights, badges |

**Layer backgrounds:** Use subtle tinted versions of these colors for layer grouping. Each layer should have a slightly different background tint so the visual hierarchy is immediately apparent.

---

## RULE 8: Layer Background Tinting

For multi-layer diagrams, each layer gets its own subtle background color:

```python
LAYER_COLORS = {
    'infrastructure': '#E8F4F6',   # lightest teal
    'data':           '#D6F5FA',   # light teal
    'intelligence':   '#F3F3EE',   # paper white
    'application':    '#FFF8E7',   # warm cream
    'oversight':      '#FCE4DE',   # light terra
    'evolution':      '#E5E3D4',   # warm beige
}
```

Ensure sufficient contrast between layer background and text. Dark text on light backgrounds only.

---

## RULE 9: Flow Indicators Between Layers

Include directional labels or arrows between layers showing the sequence and relationship. Don't just stack layers — show how data/control flows.

**Rules:**
- Use arrows (matplotlib `FancyArrowPatch` or equivalent)
- Label the flow (e.g., "feeds →", "governs ↓", "orchestrates →")
- Flow arrows should be a muted color, not competing with content
- Arrow labels: 14–16px, italic or lighter weight

---

## RULE 10: Self-Contained Storytelling

Every diagram must tell its full story without needing a separate reference table or legend page.

**Rules:**
- Include a title that states what the diagram shows
- Include brief descriptive labels on every component
- If acronyms are used, expand them on first use or in a small legend within the diagram
- A viewer should understand the architecture from the diagram alone

---

## RULE 11: No Feature Regressions

When updating an existing diagram, never drop features that existed in the previous version.

**Critical example:** Version 1.5 of a PDF had embedded images (31MB file). Version 1.6 accidentally replaced images with text placeholder boxes (158KB file). This was caught and flagged as a serious regression.

**Rules:**
- Before editing, read the existing diagram code/image to catalog all current features
- After editing, verify every feature from the previous version is preserved
- If the file size drops dramatically, that's a red flag — investigate
- Run a mental "diff" checklist before declaring the update complete

---

## RULE 12: Post-Render Self-Audit Checklist

After generating any diagram, run through this checklist before sharing:

- [ ] **Font sizes**: Are ALL text elements readable without zooming? Check against Rule 2 minimums.
- [ ] **Content fit**: Is anything cut off at the bottom, right, or edges? Scroll/pan to verify.
- [ ] **Alignment**: Do all layers share the same left margin? Any floating elements?
- [ ] **Spanning elements**: Are oversight/governance layers rendered as full-width banners?
- [ ] **Key components**: Is anything "buried"? Important items should visually pop.
- [ ] **Brand colors**: Are we using the Perplexity palette, not matplotlib defaults?
- [ ] **Layer backgrounds**: Does each layer have a distinct but subtle tint?
- [ ] **Flow indicators**: Are relationships between layers shown with arrows/labels?
- [ ] **Self-contained**: Can someone understand this without external context?
- [ ] **No regressions**: Does this version have everything the previous version had?
- [ ] **Text integrity**: Does every rendered text element match its source data? Check for LaTeX/math-mode artifacts, missing characters, encoding issues (especially currency symbols `$`, pipes `|`, special characters).
- [ ] **Text contrast**: Is every label readable against its background? No dark-on-dark or light-on-light.
- [ ] **Whitespace**: Is spacing consistent? No cramped areas next to huge gaps?

Marc's standing instruction: "When you're done with your update, run self audit and check as necessary to make sure everything is good."

---

## RULE 13: matplotlib Boilerplate Template

Use this as a starting skeleton for any new diagram:

```python
import matplotlib
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

# --- CRITICAL: Disable LaTeX math-mode parsing ---
# Without this, $ characters in text (pricing, currency) render as
# LaTeX delimiters, causing italic text, collapsed pipes, missing chars.
matplotlib.rcParams['text.parse_math'] = False

# --- CONSTANTS ---
FIG_WIDTH, FIG_HEIGHT = 24, 16  # Preferred size (max 28x20)
DPI = 150
LEFT_MARGIN = 0.04
RIGHT_MARGIN = 0.96
TOP_MARGIN = 0.95
BOTTOM_MARGIN = 0.03

# Brand Colors
DARK_TEAL = '#13343B'
MUTED_TEAL = '#20808D'
LIGHT_TEAL = '#D6F5FA'
OFF_WHITE = '#FCFAF6'
TERRA = '#A84B2F'
GOLD = '#FFC553'
WARM_BEIGE = '#E5E3D4'
PAPER_WHITE = '#F3F3EE'

# Font Sizes
TITLE_SIZE = 38
SECTION_HEADER_SIZE = 28
COMPONENT_NAME_SIZE = 24
LABEL_SIZE = 18
FLOW_LABEL_SIZE = 15
FOOTER_SIZE = 14

fig, ax = plt.subplots(1, 1, figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
ax.set_xlim(0, 1)
ax.set_ylim(0, 1)
ax.axis('off')
fig.patch.set_facecolor(OFF_WHITE)

# Title
ax.text(0.5, TOP_MARGIN, 'DIAGRAM TITLE HERE',
        fontsize=TITLE_SIZE, fontweight='bold',
        ha='center', va='top', color=DARK_TEAL)

# ... layers, components, arrows ...

plt.tight_layout(pad=0.5)
plt.savefig('/home/user/workspace/output-diagram.png',
            dpi=DPI, bbox_inches='tight',
            facecolor=fig.get_facecolor(), edgecolor='none')
plt.close()
```

---

## RULE 14: Content-First Layout Planning

Before writing any rendering code, plan the layout on paper (or in comments):

1. List all layers/sections and their components
2. Calculate vertical space needed per layer
3. Verify total height fits within figsize constraints
4. If it doesn't fit, restructure (side-by-side grouping, reduce padding) BEFORE coding
5. Never "hope it fits" — do the math first

---

## RULE 15: Ground-Then-Build Workflow

Before writing any diagram code, complete all research and content gathering first. This is the diagram-specific implementation of R-07 (Research-Before-Reasoning Gate).

**Workflow:**
1. **Ground** — Gather all data, verify all facts, finalize all content that will appear in the diagram
2. **Plan** — Apply Rule 14 (Content-First Layout Planning) with the verified content
3. **Build** — Only then write the rendering code

**Why this exists:** Multiple diagram sessions required rework because content was discovered or changed mid-render, causing layout recalculations and wasted cycles. The diagram is the visualization layer — it should never be the place where content is figured out.

**Rules:**
- Never start matplotlib code until all text content is finalized
- If Marc provides partial content, ask for the complete list before rendering
- If content requires web research (tool comparisons, feature lists, pricing), complete ALL research before any rendering
- If content changes after rendering begins, restart from Rule 14 (layout planning) — don't patch incrementally

---

## Summary of Most Common Mistakes (Ranked by Frequency)

1. **Fonts too small** — happens almost every time on first render
2. **Content cut off at bottom** — second most common, caused by optimistic height estimates
3. **Elements misaligned** — layers at different x-offsets
4. **Key components not prominent enough** — important items look like everything else
5. **Spanning elements rendered as cards** — governance/oversight layers treated as peers
6. **Feature regressions on updates** — dropping images, labels, or sections from prior version
7. **No self-audit** — sharing before checking the checklist
8. **Building before grounding** — starting diagram code before content is finalized

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Self Audit | NOT RUN | — | — | — |
| CHECK | NOT RUN | — | — | — |