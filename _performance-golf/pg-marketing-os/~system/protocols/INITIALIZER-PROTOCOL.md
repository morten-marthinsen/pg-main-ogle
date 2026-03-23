# Initializer Protocol

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** First-session project setup — creates output directory structure, initializes project-progress.json from pipeline-dag.json, and prepares the project for Skill 00 execution
**Authority:** Referenced by STARTUP-SEQUENCE.md (Step 2: "If file doesn't exist, run Initializer Protocol")

---

## WHEN THIS RUNS

Once per project. The Initializer runs when:
1. The Startup Sequence detects no `project-progress.json` for the current project, OR
2. The human explicitly requests a new project initialization

After the Initializer completes, the Startup Sequence resumes from Step 3.

**This protocol is NOT re-run on existing projects.** If a progress file is corrupted, the Startup Sequence handles reconstruction.

---

## THE 6 STEPS

### Step 1: Gather Project Inputs

Collect from the human (ask for anything not provided):

| Input | Required | Example |
|-------|----------|---------|
| **Project code** | YES | `rsf-promo`, `pg-ta-2026`, `nrg-launch` |
| **Project name** | YES | "RSF Golf Promotion", "Transformation Academy 2026" |
| **Client** | YES | "Performance Golf", "Acme Health", "BrightPath" |
| **Tier** | YES | Full / Standard / Quick |
| **Active engines** | YES | Which branch engines this project uses (see Step 2) |
| **Vertical** | NO | golf, health, finance, personal-dev, technology, or null |
| **Brief document** | NO | Path to client-provided brief, research inputs, etc. |

**Project code rules:**
- Lowercase, hyphenated, no spaces: `client-product` or `client-campaign`
- Must be unique across `~outputs/` directory
- Will be used as directory name and git commit tag prefix

**HALT if:** Project code conflicts with an existing directory in `~outputs/`.

---

### Step 2: Select Active Engines

Present the engine menu. The human selects which engines this project needs:

| Engine | ID | When to Include |
|--------|----|-----------------|
| Main Pipeline | `main_pipeline` | **ALWAYS** — foundation + campaign brief |
| Long-Form VSL | `long_form_vsl` | Video sales letter or long-form written promo |
| E-Commerce | `e_comm` | Product page, e-commerce landing page |
| Page Builder | `page_builder` | Landing page implementation |
| Upsells | `upsells` | Order bump + upsell/downsell sequence |
| Checkout | `checkout` | Checkout page copy |
| Emails | `emails` | Email launch sequence or nurture campaign |
| Ads | `ads` | Paid advertising (Meta, TikTok, YouTube, Google) |
| Advertorials | `advertorials` | Native ad / advertorial content |
| Organic | `organic` | Organic social content (can run Mode A or Mode B) |

**Common configurations:**
- **Full campaign:** main_pipeline + long_form_vsl + upsells + checkout + emails + ads
- **VSL only:** main_pipeline + long_form_vsl
- **E-comm launch:** main_pipeline + e_comm + page_builder + upsells + checkout + emails + ads
- **Organic standalone:** organic (Mode B — no main pipeline)

**Note:** Inactive engines have all their skills set to `skipped` in the progress file. They can be activated later by changing status to `pending`.

---

### Step 3: Create Output Directory Structure

Create the project output directory at `marketing-os/~outputs/[project-code]/`:

```
~outputs/[project-code]/
├── project-progress.json          ← Created in Step 4
├── constraint-ledger.yaml         ← Created empty, populated by foundation skills
├── 00-brief/                      ← Skill 00 outputs
├── 01-research/                   ← Skill 01 outputs (FINAL_HANDOFF.md, etc.)
├── 02-proof-inventory/            ← Skill 02 outputs
├── 03-root-cause/                 ← Skill 03 outputs
├── 04-mechanism/                  ← Skill 04 outputs
├── 05-promise/                    ← Skill 05 outputs
├── 06-big-idea/                   ← Skill 06 outputs
├── 07-offer/                      ← Skill 07 outputs
├── 08-structure/                  ← Skill 08 outputs
├── 09-campaign-brief/             ← Skill 09 outputs
├── [engine subdirs — only for active engines:]
├── 10-headlines/                  ← If long_form_vsl active
├── 11-lead/
├── 12-story/
├── 13-root-cause-narrative/
├── 14-mechanism-narrative/
├── 15-product-introduction/
├── 16-offer-copy/
├── 17-close/
├── 18-proof-weaving/
├── 19-campaign-assembly/
├── 20-editorial/
├── e-comm/                        ← If e_comm active
├── page-builder/                  ← If page_builder active
├── upsells/                       ← If upsells active
├── checkout/                      ← If checkout active
├── emails/                        ← If emails active
├── ads/                           ← If ads active
├── advertorials/                  ← If advertorials active
└── organic/                       ← If organic active
```

**Only create subdirectories for active engines.** Do not pre-create directories for engines the project won't use.

**Also create:** An empty `constraint-ledger.yaml` with header:
```yaml
# Constraint Ledger — [project-code]
# Created: [ISO 8601]
# Purpose: Track decisions that constrain downstream execution
decisions: []
```

---

### Step 4: Generate project-progress.json

Read `~system/pipeline-dag.json` and `~system/templates/project-progress-template.json`.

Generate `~outputs/[project-code]/project-progress.json` by:

1. **Copy the template structure** — engines, skills, gates, human_checkpoints
2. **Fill in project metadata:**
   ```json
   {
     "project_code": "[from Step 1]",
     "project_name": "[from Step 1]",
     "client": "[from Step 1]",
     "tier": "[from Step 1]",
     "created": "[ISO 8601 now]",
     "last_updated": "[ISO 8601 now]",
     "current_session": 1
   }
   ```
3. **Set engine statuses based on active engines:**
   - Active engines: `"status": "pending"`
   - Inactive engines: `"status": "skipped"`
4. **Set skill statuses within inactive engines:**
   - All skills in skipped engines: `"status": "skipped"`
5. **Initialize session log with initialization entry:**
   ```json
   {
     "session_log": [
       {
         "session": 0,
         "started": "[ISO 8601]",
         "ended": "[ISO 8601]",
         "startup_status": "initialization",
         "skills_completed": [],
         "notes": "Project initialized via Initializer Protocol. Active engines: [list]. Tier: [tier]."
       }
     ]
   }
   ```
6. **Populate active_engines array:**
   ```json
   {
     "active_engines": ["main_pipeline", "long_form_vsl", "emails", ...]
   }
   ```

**Validation:** After generating, verify:
- All skill IDs in the progress file match `pipeline-dag.json` node IDs
- Active engine skills are all `pending`
- Skipped engine skills are all `skipped`
- Session 0 entry exists in session_log
- `tier` is one of: `full`, `standard`, `quick`

---

### Step 5: Initial Git Commit

Stage and commit the initialization:

```bash
git add marketing-os/~outputs/[project-code]/
git commit -m "init: [project-code] — project initialized

Client: [client]
Tier: [tier]
Active engines: [list]
Initialized via Initializer Protocol v1.0

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

**Do NOT push.** The human controls sync timing via /vault-sync.

---

### Step 6: Begin Skill 00

After initialization is committed:

1. Load Skill 00 (`project-brief`) SKILL.md
2. Present the initialization summary (see output format below)
3. If the human provided a brief document in Step 1, begin Skill 00 execution immediately
4. If no brief was provided, prompt the human: "Project initialized. Please provide the client brief or project inputs to begin Skill 00 (Project Brief)."

---

## INITIALIZATION OUTPUT

After completing all 6 steps, present:

```
PROJECT INITIALIZED
Project: [project-code] ([project-name])
Client: [client]
Tier: [Full/Standard/Quick]
Active engines: [list]
Vertical: [vertical or "not set"]
Total active skills: [count]
Output directory: marketing-os/~outputs/[project-code]/

Session 1 begins at: Skill 00 (project-brief)
First human gate: After Skill 03 (root cause review)

Ready to execute.
```

---

## ENGINE ACTIVATION AFTER INITIALIZATION

If the human wants to activate an engine that was initially skipped:

1. In `project-progress.json`, change the engine's `"status"` from `"skipped"` to `"pending"`
2. Change all skills within that engine from `"skipped"` to `"pending"`
3. Create the engine's output subdirectory in `~outputs/[project-code]/`
4. Verify the engine's entry dependency is met (usually Skill 09 for branch engines)
5. Commit the change: `git commit -m "activate: [engine-name] engine for [project-code]"`

**Do NOT re-run the full Initializer.** Just update the progress file and create the directory.

---

## ORGANIC MODE B INITIALIZATION

When the organic engine runs standalone (Mode B — no main pipeline):

1. Active engines: `["organic"]` only
2. Skip main pipeline directory creation (no `00-brief/` through `09-campaign-brief/`)
3. Create `organic/` output directory only
4. In the progress file, set `main_pipeline` status to `"skipped"` and all main pipeline skills to `"skipped"`
5. First skill is `S01` (audience-intelligence), not `00` (project-brief)
6. Present initialization output with "Session 1 begins at: Skill S01 (audience-intelligence)"

---

## FAILURE MODES

| Condition | Action |
|-----------|--------|
| Project code conflicts with existing directory | HALT — ask human to choose a different code |
| Human doesn't specify tier | Default to Standard, confirm with human |
| Human doesn't specify active engines | Default to "Full campaign" config, confirm |
| Progress file generation fails validation | Report specific validation errors, regenerate |
| Git commit fails | Report error, do not proceed to Skill 00 |

---

## CRITICAL RULES

1. **NEVER skip the Initializer for a new project.** Even if the human says "just start writing" — initialize first. It takes <60 seconds and prevents hours of downstream confusion.
2. **NEVER create output directories for inactive engines.** This prevents confusion about which engines are active.
3. **ALWAYS commit the initialization before starting Skill 00.** The progress file must be under version control from the very first session.
4. **ALWAYS confirm active engines with the human.** Don't assume — ask.
5. **Project code is immutable after initialization.** It's used in git commits, directory paths, and cross-references. Renaming breaks everything.
6. **Session numbering starts at 1.** Session 0 is the initialization entry (logged but not a real session).

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation as part of Harness Architecture Phase 3. |
