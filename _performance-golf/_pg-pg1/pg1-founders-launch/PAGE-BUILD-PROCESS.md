# PG1 Founders Launch — Page Build Process

## MANDATORY WORKFLOW (Every Single Page)

Follow this exact sequence every time. No exceptions. No skipping steps.

---

### Step 1: Explore Existing Patterns
- **Tool:** code-explorer subagent
- **Action:** Analyze any existing PG HTML pages for patterns, structure, and conventions to match
- **Why:** Every page must feel consistent with the PG ecosystem

### Step 2: Confirm Intent + Design Spec
- **Action:** Before writing a single line of code, present the user with:
  1. **Intent confirmation** — What the page does, what copy goes where, what's being swapped/changed from any reference screenshot
  2. **Full design spec** — Every element on the page listed with:
     - Exact hex codes (from PG palette)
     - Exact font family + weight + size + line-height + letter-spacing
     - Spacing/padding values
     - Border radius, shadows, transitions
     - Background colors and gradients
     - Logo variants being used (with filename)
     - @font-face files being loaded (with filename)
  3. **User approval** — Do NOT build until the user explicitly approves the spec
- **Why:** No guessing. No assumptions. No "close enough." The user sees exactly what they're getting before a single line of code is written.

### Step 3: Build the Page
- **Tool:** frontend-design skill
- **Action:** Generate production-grade HTML following the approved design spec
- **Requirements:**
  - PG brand fonts (Repro, GT Super Text, Repro Mono) — reference `/pg-skills/pg-brand-guidelines/assets/fonts/`
  - PG color palette (60/30/10 rule: neutrals/orange/accents)
  - PG CSS variables from PG-DESIGN-SYSTEM.md
  - BEM naming with `pg-` prefix
  - Mobile-first responsive
  - PG logos from `/pg-skills/pg-brand-guidelines/assets/logos/`
  - Pixel-perfect match to any reference screenshots provided

### Step 4: Automated Code Review
- **Tool:** code-reviewer subagent
- **Action:** Review for bugs, logic errors, security vulnerabilities, code quality
- **Action:** Fix EVERYTHING it flags before moving on

### Step 5: Browser QA
- **Tool:** Playwright (MCP)
- **Action:** Open the page in a real browser
  - Click every interactive element (buttons, links, toggles)
  - Screenshot desktop view
  - Screenshot mobile view
  - Verify all fonts load
  - Verify responsive behavior
  - Verify all links/buttons work

### Step 6: Final Code Review Pass
- **Tool:** code-review skill
- **Action:** Final quality pass before sending to user
- **Action:** Fix anything flagged

### Step 7: Deploy Staging Link
- **Tool:** Surge (via Bash)
- **Action:** Deploy the page to a live staging URL using `surge`
- **Pre-deploy:** Copy brand fonts into the page folder (`fonts/repro/`, `fonts/gt-super-text/`, `fonts/repro-mono/`) and update @font-face paths to `fonts/` instead of relative `../../` paths
- **Pre-deploy:** Copy the page HTML as `index.html` in the deploy folder (surge requires index.html for root URL)
- **Command:** `surge /path/to/page-folder https://pg1-pagename.surge.sh`
- **Deliver the live surge link to the user**

### Step 8: Send to User
- Only AFTER steps 1-7 are complete
- Include the live surge staging link
- Include screenshots of desktop + mobile views
- Note any decisions made or assumptions

---

## BRAND REFERENCES (Always Loaded)

| Reference | Path |
|---|---|
| Design System | `/pg-skills/pg-brand-guidelines/PG-DESIGN-SYSTEM.md` |
| Brand Guidelines | `/pg-skills/pg-brand-guidelines/brand-guidelines-skill.md` |
| Copy Voice | `/pg-skills/pg-brand-guidelines/pg-copy-voice.md` |
| Visual Identity | `/pg-skills/pg-brand-guidelines/references/visual-identity.md` |
| Font Files | `/pg-skills/pg-brand-guidelines/assets/fonts/` |
| Logo Files | `/pg-skills/pg-brand-guidelines/assets/logos/` |

## PROJECT FOLDER

All pages go in: `/Users/BenjaminMarcoux/Documents/The Sauce Vault/_performance-golf/_pg-pg1/_pg1-founders-launch/`

## PAGE DELIVERABLES (from keynote)

1. PG1 Personalized Improvement Platform (PG1-Pulse core)
2. SwingScan AI
3. Practice Mode (app speaks to you at the range)
4. 24/7 CoachChat Access (6 elite PGA coaches, in-app chat)
5. Post-Round Recap (tell PG1 how your round went, get analysis + drill plan)
6. PG1 Community (community feed, share videos, milestones)
7. PG1 Progress Tracking (dashboard tracking everything)

## PRICING

- Annual: $199/year
- Lifetime: $999 one-time
- Limited to 1,000 Founding Members
