# Anthropic / Claude Code — Official Resource Inventory

> Researched 2026-03-19. This is the complete list of everything Anthropic makes publicly available for Claude Code.

---

## Docs Sites

| Resource | URL | Description |
|----------|-----|-------------|
| Claude Code full docs (single file) | `https://code.claude.com/docs/llms-full.txt` | All 65 doc pages in one plain-text file (~50k+ words) |
| Claude Code docs index | `https://code.claude.com/docs/llms.txt` | Index of all 65 pages with descriptions and `.md` URLs |
| Platform/API docs index | `https://platform.claude.com/llms.txt` | Index of all 606 API/platform doc pages (English) |
| Claude Code docs site | `https://code.claude.com/docs/en/overview` | Web version, 65 pages, 12 languages |
| Platform docs site | `https://platform.claude.com/docs/en/home` | API, Agent SDK, models, tools — 606 English pages |
| Claude product llms.txt | `https://claude.com/llms.txt` | General Claude product overview |
| Sitemap | `https://code.claude.com/docs/sitemap.xml` | 1,968 URLs across 12 languages |

**Note:** `docs.anthropic.com` now 301-redirects to `platform.claude.com/docs`. The old domain is deprecated.

---

## GitHub Repos

### Core Claude Code

| Repo | Stars | Description |
|------|-------|-------------|
| [anthropics/claude-code](https://github.com/anthropics/claude-code) | 80k | Main repo — CHANGELOG.md (161KB), examples/hooks, examples/settings, plugins/ (13 example plugins), .claude/commands/ |
| [anthropics/claude-code-action](https://github.com/anthropics/claude-code-action) | 6.4k | GitHub Action for PR reviews, issue triage, CI/CD |
| [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) | 3.9k | GitHub Action for AI-powered security review |
| [anthropics/claude-code-monitoring-guide](https://github.com/anthropics/claude-code-monitoring-guide) | 218 | ROI measurement guide, Prometheus/Grafana/OpenTelemetry configs |

### Agent SDKs

| Repo | Stars | Description |
|------|-------|-------------|
| [anthropics/claude-agent-sdk-python](https://github.com/anthropics/claude-agent-sdk-python) | 5.6k | Python SDK — `pip install claude-agent-sdk`. query() API, custom tools via MCP, hooks, bundled CLI |
| [anthropics/claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) | 981 | TypeScript SDK — `@anthropic-ai/claude-agent-sdk` on npm. Node.js 18+ |
| [anthropics/claude-agent-sdk-demos](https://github.com/anthropics/claude-agent-sdk-demos) | 1.8k | 8 demo apps: Email Agent, Excel, Hello World (v1+v2), Research Agent, AskUserQuestion, Chat App, Resume Generator |

### Skills & Plugins

| Repo | Stars | Description |
|------|-------|-------------|
| [anthropics/skills](https://github.com/anthropics/skills) | 98k | Public skills repository — example skills (Creative, Development, Enterprise, Documents), skill spec, templates |
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | 13k | Official plugin directory — install via `/plugin install {name}@claude-plugins-official` |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | 10k | Plugins for knowledge workers (Claude Cowork) |
| [anthropics/financial-services-plugins](https://github.com/anthropics/financial-services-plugins) | 6.4k | Financial services plugin collection |

### API SDKs (broader ecosystem)

| Repo | Stars | Description |
|------|-------|-------------|
| [anthropics/anthropic-sdk-python](https://github.com/anthropics/anthropic-sdk-python) | 3k | Python SDK for Anthropic API |
| [anthropics/anthropic-sdk-typescript](https://github.com/anthropics/anthropic-sdk-typescript) | 1.7k | TypeScript SDK for Anthropic API |
| [anthropics/anthropic-sdk-go](https://github.com/anthropics/anthropic-sdk-go) | 915 | Go SDK |
| [anthropics/anthropic-sdk-java](https://github.com/anthropics/anthropic-sdk-java) | 259 | Java/Kotlin SDK |
| [anthropics/anthropic-sdk-ruby](https://github.com/anthropics/anthropic-sdk-ruby) | 308 | Ruby SDK |

### Learning & Examples

| Repo | Stars | Description |
|------|-------|-------------|
| [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks) | 35k | Recipes/notebooks: RAG, summarization, tool use, multimodal, embeddings, sub-agents, extended thinking, Agent SDK |
| [anthropics/claude-quickstarts](https://github.com/anthropics/claude-quickstarts) | 15k | 5 starter projects: Customer Support Agent, Financial Data Analyst, Computer Use, Browser Tools, Autonomous Coding Agent |
| [anthropics/courses](https://github.com/anthropics/courses) | 20k | Anthropic educational courses |
| [anthropics/prompt-eng-interactive-tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) | 34k | Interactive prompt engineering tutorial |

### Other

| Repo | Stars | Description |
|------|-------|-------------|
| [anthropics/devcontainer-features](https://github.com/anthropics/devcontainer-features) | 226 | Dev Container feature for Claude Code CLI |
| [anthropics/evals](https://github.com/anthropics/evals) | 335 | Evaluation framework |

---

## Feeds & Changelogs

| Resource | URL | Notes |
|----------|-----|-------|
| GitHub Releases Atom feed | `https://github.com/anthropics/claude-code/releases.atom` | Best machine-readable feed for tracking releases |
| Changelog (web) | `https://code.claude.com/docs/en/changelog` | Web version |
| CHANGELOG.md (repo) | In `anthropics/claude-code` repo | 161KB, very detailed |
| Claude Status feed | `https://status.claude.com/feed.atom` | Incident history |

**No official Anthropic blog RSS feed exists.** Blog is at `anthropic.com/news` but no RSS/Atom endpoints.

---

## Other Resources

| Resource | URL |
|----------|-----|
| Official whitepaper: "How Anthropic teams use Claude Code" | `https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf` (21+ pages, 5.9MB) |
| Community: awesome-claude-code | `https://github.com/hesreallyhim/awesome-claude-code` (29k stars, not official) |

---

## What Does NOT Exist

- `anthropic.com/llms.txt` — 404
- `platform.claude.com/docs/sitemap.xml` — 404
- Official RSS/Atom feed for Anthropic blog
- Separate docs repo on GitHub (docs hosted at code.claude.com directly)
- `docs.anthropic.com/llms.txt` — redirects to 404 on platform.claude.com
