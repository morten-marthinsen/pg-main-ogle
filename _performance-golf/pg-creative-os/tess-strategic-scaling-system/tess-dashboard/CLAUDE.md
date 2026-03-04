# Tess Dashboard

> A read-only executive dashboard for the Strategic Scaling System (Tess).
> This is a **sub-project of Tess** — not a standalone system.

---

## Quick Reference

| | |
|---|---|
| **Parent project** | `tess-strategic-scaling-system/` |
| **Session tracking** | Parent `SESSION-LOG.md` (not here — dashboard is a Tess feature) |
| **Build plan** | `~/.claude/plans/snoopy-wandering-lantern.md` |
| **Spreadsheet** | `1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U` |
| **Runtime** | Next.js 14, TypeScript, Tailwind, Tremor, React Query |

---

## Commands

| Action | Command |
|--------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |

---

## Phase-Stop Discipline (MANDATORY)

Inherited from Tess. **One phase, one stop. No exceptions.**

1. State phases and what "done" looks like before starting
2. Complete one phase, report what changed, then **STOP**
3. Wait for user confirmation before the next phase
4. Never combine phases

---

## Build Phases

| Phase | What | Status |
|-------|------|--------|
| 1 | Scaffold + Google Sheets API connection | Done |
| 2 | Layout + navigation (sidebar, header, 4 page shells) | Done |
| 3 | Executive Summary (KPI cards, donut chart, top 10 table) | Not started |
| 4 | Asset Explorer (table, search, filters, pagination, sort) | Not started |
| 5 | Performance (tab selector, bar charts, leaderboard tables) | Not started |
| 6 | Creative Strategy (recommendation cards, priority badges) | Not started |
| 7 | Polish (loading skeletons, error states, responsive, refresh) | Not started |

---

## Architecture

```
Google Sheets (source of truth)
  ↓ googleapis (server-side only)
Next.js API Routes (/api/sheets/*)
  ↓ 15-min server cache
React Query (client)
  ↓ 10-min stale time
Dashboard Components
```

3 API routes: `/api/sheets/assets`, `/api/sheets/insights`, `/api/sheets/strategy`

---

## Non-Negotiables

1. **Read-only.** This dashboard never writes to Google Sheets.
2. **Credentials stay server-side.** Never expose API keys to the browser.
3. **Totals must match the spreadsheet.** KPIs, classification counts, recommendation counts — all must be verifiable against the source.
4. **No new dependencies without approval.**
