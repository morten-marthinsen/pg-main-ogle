# Shopify Section Creation Process

## Table of Contents
**ACTION: UPDATE TO MATCH NEW CONTENT OF THIS DOCUMENT**

-----------------------------------------------------------------------------

# PART 1: SETUP (One-Time)

- Login to Shopify store and verify Shopify with 2-Factor Authentication (2FA)
- Login to GitHub

## Install Shopify CLI Globally Using Homebrew

- (https://shopify.dev/docs/themes/tools/cli)
- NOTE: Shopify CLI install automatically installs required Node.js (https://nodejs.org/) (v18 or higher)**

## Clone Repo To Local Machine

- Get GitHub HTTPS URL
- https://github.com/Convertibles-dev/performance-golf-prod.git
- Cmd+Shift+N to open new Cursor window
- Select Clone Repo
- paste GitHub HTTPS URL
- choose location for folder
- **NOTE: If you get a popup about a Keychain password, it is your computer password. Click "Always Allow", not "Allow" to move onto the next step.**
- **NOTE: make sure your folder is the exact same name as the GitHub repo, using all lower case and "-" instead of spaces: performance-golf-prod**

## Sign Into Shopify

- in new Cursor window, press Cmd+J to open the terminal
- make sure you are in the right folder: performance-golf-prod
- if not, run command: cd [file path]
- example: cd /Users/BenjaminMarcoux/Documents/performance-golf/performance-golf-prod
- run shopify auth login
- complete Shopify 2FA login

## Claude Code Terminal

- if necessary, cd to correct sub-folder
- git branch --show-current
- git checkout performance-golf-prod
- git branch --show-current
- run Claude
- ask Claude: what GitHub branch am I on and what Shopify theme are you on?
- confirm you are in the correct GitHub repo & branch: Convertibles-dev --> performance-golf-prod --> pg-dev
- confirm you are in the correct Shopify theme: performance-golf-prod/pg-dev - 184298766657

- git branch --show-current --> should say pg-dev
- shopify theme list — look for which theme ID you're connected to

**NOTE: create gitignore if you have a DS.Store or other file like this that you don't want to show up as part of the Git commits. The GitIgnore will show up on your first commit.**

## Shopify Theme Dev Terminal

- if necessary, cd to correct sub-folder
- change to correct GitHub branch
- git branch --show-current
- git checkout pg-dev
- git branch --show-current
- shopify theme dev --store=example.myshopify.com --theme <THEME_ID>
- shopify theme dev --store=performancegolf.myshopify.com --theme 184298766657
    - this is for Shopify theme: performance-golf-prod/pg-dev
- Press "T" to Open Preview
- Press "E" to Open Server Customizer
- confirm you are in performance-golf-prod/pg-dev

## Update Memory

🚨Action🚨 - add Donnie continuous memory/improvement step here

- update memory with correct information by running the prompt:

remember the following:
1. we work only on GitHub repo: Convertibles-dev/performance-golf-prod
2. we work only on Git branch: pg-dev
3. we work only on the Shopify store: performancegolf.myshopify.com
4. we work only on Shopify performance-golf-prod/pg-dev, theme ID: 184298766657
5. We NEVER work on or modify the Shopify Live theme: performance-golf-prod/main — #184630640961
6. We NEVER work on or modify the main branch in GitHub

-----------------------------------------------------------------------------

# PART 2: DAILY WORKFLOW

- launch claude code terminal 
- run git status to check for uncommitted local changes
- commit or stash those changes before pulling (shows changes since the last commit)
- pull teammates' changes saved in Git with git pull origin pg-dev
- pull Shopify admin changes (customizer settings, etc.) with shopify theme pull --theme 184298766657
- run git status to check if Shopify changes brought in anything new
- if yes, commit those changes as well

- git branch --show-current --> should say pg-dev
- shopify theme list — look for which theme ID you're connected to

- launch claude

- tell claude: "confirm what GitHub branch I am working on and what Shopify theme I am working on"

- When claude code terminal is setup, then launch shopify theme dev terminal

---

- Work --> get work to approved state

---

- if approved work is just code changes, these should automatically be synced because shopify-theme-dev is active
- git status
- commit and push to stage changes then commit them
    - commit all the changes and push them to our branch in GitHub. before committing the changes, please confirm the branch you are working in. remove "Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>" from the commit message
- review commit message (explanation of changes)
- check GitHub repo branch to confirm changes
    - to see commit message in GitHub, click the ~6 character ID to the left of the update time.
- ask Claude to confirm GitHub and Shopify are in sync with local machine
    - NOTE: you should not have to do shopify theme push
- check changes are applied on the Shopify Store admin
    - online store (`https://admin.shopify.com/store/performancegolf`) --> themes --> performance-golf-prod/pg-dev --> "Edit Theme" --> select page ("pages" top middle) --> Go to correct page "Template" and confirm changes

---

- If approved work includes updates to settings (ie you went into your local customizer and toggled a setting on or off), these changes are stored in your template JSON files (e.g., templates/page.*.json)*, not in the section .liquid file, so they do not appear automatically in your local files OR the Shopify Admin. In which case you need to run `shopify-theme-pull` to pull those changes down from your local customizer into your local files before pushing.
- shopify theme pull --theme 184298766657 ask claude "pull the section settings from our current CLI customizer"
    - use only flags to pull down only the settings (if you don't want to pull down everything. This occurs when you have made changes to both .liquid AND the JSON template file and don't want to overwrite the .liquid changes when you pull down the updated template JSON file.)
        - shopify theme pull --only config/ --only templates/
        - OR
        - shopify theme pull --only templates/
    - CHECK FOR ERROR MESSAGES RELATED TO FILE PATHS OF ONLYS
- git status
- commit and push to pg-dev on GitHub
    - commit all the changes and push them to our branch in GitHub. before committing the changes, please confirm the branch you are working in. remove "Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>" from the commit message
    - review commit message (explanation of changes)
    - to check commit message in GitHub, click the ~6 character ID to the left of the update time
- shopify theme push --theme 184298766657 — push to Shopify dev theme so everything matches
    - confirm changes appear in Shopify
        - https://admin.shopify.com/store/performancegolf/themes --> Online Store --> Themes --> performance-golf/performance-golf-dev --> "Edit theme" --> "Home page" --> Pages --> [select page] --> change preview to page name --> preview
        - If the changes do not show up inside your Shopify Admin, push the changes to Shopify.
shopify theme push --theme 150335422601` OR `shopify theme push
- Stop the dev server with Ctrl+C

-----------------------------------------------------------------------------

# PART 3: CREATING & EDITING SECTIONS

**NOTE: Before creating a new section for a new page, have claude code reference the sections that already exist in Shopify. only create new sections that are truly unique.**

- have Claude Code analyze your copy doc
- Compare it to the Shopify section document as well as the sections folder within Shopify
- Only create new sections for sections that do not match an existing section

**NOTE: Create the most "extended" version of the section with all the possible settings, instead of creating lots of different sections to account for every change in settings.**

**NOTE: Work in the claude code terminal**

## Create Custom Command For Creating A Section

prompt Claude to create a custom command

**example:**

create a custom command called: /new-section

1. Gathers requirements - Always asks for a screenshot/design reference first, then section name, file name, content elements, blocks, and special behavior
2. Confirms a plan - Presents the section name, file name, layout, schema structure, and JS behavior for approval before writing code
3. Builds the section - Following all established patterns:
    - Correct naming convention (everything starts with pg-)
    - Standard file structure (Liquid > font faces > HTML > CSS > JS > schema)
    - CSS custom properties, conditional rendering, 989px breakpoint
    - Font picker handling, CTA scroll-to-section pattern, star SVGs
    - Schema validation rules (richtext tag restrictions, range step limits)
    - Reference PG-DESIGN-SYSTEM.md for design system colors, typography, spacing values
4. Verification checklist - Reminds you to test for schema errors and responsive behavior

**example response from Claude**

The custom command has been created at .claude/commands/new-section.md. You can now invoke it with /new-section in Claude Code.

## Run Custom Command To Create Section

- run /new-section and follow the process to complete the section

## View Section

- Open/Refresh Customizer
- Confirm Development (top left) is performance-golf-prod/pg-dev
- Find or create the destination page template & page in Shopify
    - Example: "test page"
- Open destination in Shopify
- Top left change page to name of destination page ie "pg-test-page"
- Add new section in Template
    - Hover between sections and click + sign to add a new section
    - Link is halfway down left-hand side of the customizer page
- **Note: Your new Section might Contain Blocks, which are like sub-sections**
- Save

## Editing Sections

- **NOTE: These types of edits typically consist of adding or removing settings, cosmetic or design changes, or updating copy.**

- navigate to the page you want to edit
    - Home page dropdown (top center of page) --> Pages --> select page
- click on a Section for the Settings to show up
- use natural language (Design/UX/UI notes) + screenshots to edit the section, improve visuals, add/remove settings, etc.
    - use "@" then tag the file name to give Claude very specific context (tab can auto-complete)
    - can also use Shopify inspect arrow

## Creating A Preview Link For Non-Live Theme Pages (⚠️)

Navigate to the theme you want to work on
Edit theme
Choose correct page template (top middle)
Top left, change Preview to the correct page template
Click the preview button
Click view

**OR copy the URL below into your browser and update the slug to the name of the page you want to preview.

https://shop.performancegolf.com/pages/`name-of-page`

Julian's video for alternate method:
https://www.loom.com/share/bacd5a187d9641e19b83dd9395fc6a04