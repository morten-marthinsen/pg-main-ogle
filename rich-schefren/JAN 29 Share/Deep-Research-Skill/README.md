# Deep Research Skill v1.0

**Multi-source research orchestrator that queries up to 9 different research sources -- 4 API engines in parallel, 3 browser-based deep research platforms, and 2 built-in Claude tools -- for the most comprehensive research coverage possible.**

---

## What This Does

When you ask Claude Code to do "deep research" on any topic, this skill dispatches your query across multiple tiers:

### Tier 1: API Sources (Fast, Automated)
1. **Perplexity Sonar Deep Research** - Multi-step retrieval and synthesis
2. **Gemini API** - Google's AI with web grounding
3. **Tavily** - AI-native search API with structured results
4. **Exa.ai** - Semantic/neural search for conceptually related content

All 4 run simultaneously and complete in 2-3 minutes total.

### Tier 2: Browser Deep Research (Thorough, 5-15 min each)
5. **Claude Deep Research** - Via claude.ai (requires Max plan)
6. **Gemini Deep Research** - Via gemini.google.com (requires Advanced plan)
7. **Manus** - Via manus.im (per plan)

These use browser automation to access the deep research features of each platform, providing much more thorough analysis than API calls alone.

### Tier 3: Native Claude Tools (Always Available)
8. **WebSearch** - Built-in web search (no setup needed)
9. **WebFetch** - Direct URL fetching and analysis (no setup needed)

Results are saved as both JSON (for programmatic use) and Markdown (for reading) to a staging folder in your home directory.

---

## What You'll Get

- **Comprehensive coverage** - Up to 9 different perspectives on any research topic
- **Time savings** - Parallel API execution completes in 2-3 minutes
- **Depth on demand** - Add browser deep research for topics needing more analysis
- **Source diversity** - Each engine has different strengths and data sources
- **Organized output** - All results saved to a staging folder automatically

---

## Requirements

Before installing, you'll need:

1. **Claude Code** installed and working
2. **Python 3.8+** installed
3. **API Keys** from each service (see API Setup section below)
4. **Claude in Chrome MCP** (optional, for browser-based deep research -- see Browser Setup below)

---

## Installation

### Mac (Terminal)

```bash
cd ~/Downloads/Deep-Research-Skill
chmod +x install.sh
./install.sh
```

### Windows (PowerShell)

```powershell
cd ~/Downloads/Deep-Research-Skill
.\install.ps1
```

The installer will prompt you to enter your API keys during setup.

---

## API Setup

You'll need to get your own API keys from each service. Here's how:

### 1. Perplexity (Required - Best Results)

1. Go to https://www.perplexity.ai/settings/api
2. Create an API key
3. Note: Sonar Deep Research costs ~$0.15-0.50 per query

### 2. Gemini (Free Tier Available)

1. Go to https://aistudio.google.com/apikey
2. Create an API key
3. Free tier includes generous limits

### 3. Tavily (Free Credits)

1. Go to https://tavily.com/
2. Sign up and get API key
3. Free tier includes credits

### 4. Exa (Free Credits)

1. Go to https://exa.ai/
2. Sign up and get API key
3. Free tier includes credits

After getting your keys, edit `~/.claude/skills/deep-research/references/api-keys.json`:

```json
{
  "perplexity": {
    "api_key": "YOUR_PERPLEXITY_KEY",
    "base_url": "https://api.perplexity.ai",
    "model": "sonar-deep-research"
  },
  "gemini": {
    "api_key": "YOUR_GEMINI_KEY",
    "base_url": "https://generativelanguage.googleapis.com",
    "model": "gemini-2.0-flash"
  },
  "tavily": {
    "api_key": "YOUR_TAVILY_KEY",
    "base_url": "https://api.tavily.com"
  },
  "exa": {
    "api_key": "YOUR_EXA_KEY",
    "base_url": "https://api.exa.ai"
  }
}
```

---

## Browser Deep Research Setup (Optional)

To unlock Tier 2 sources (Claude Deep Research, Gemini Deep Research, Manus), you need the "Claude in Chrome" MCP server. This lets Claude Code control a Chrome browser to interact with these platforms.

### What You Need
- **Claude in Chrome MCP server** - Search for "Claude in Chrome MCP" for the latest installation instructions
- **Active accounts** on the platforms you want to use:
  - Claude Max plan (for Claude Deep Research)
  - Gemini Advanced plan (for Gemini Deep Research)
  - Manus account (for Manus)

### How It Works
Once Claude in Chrome is configured as an MCP server in your Claude Code settings, the deep research skill will automatically be able to navigate to these platforms, submit your research query, wait for results, and extract the findings.

See `references/browser-automation.md` for detailed step-by-step instructions for each platform.

> **Note:** The 4 API sources and 2 native tools work without browser automation. Browser sources are an optional power-up for when you need maximum research depth.

---

## How to Use

After installation, simply tell Claude Code:

```
Deep research on "AI agent architectures for autonomous task completion"
```

Or use the command directly:

**Mac/Linux:**
```bash
source ~/.claude/skills/deep-research/venv/bin/activate && python3 ~/.claude/skills/deep-research/references/scripts/orchestrator.py "your research query"
```

**Windows (PowerShell):**
```powershell
& "$env:USERPROFILE\.claude\skills\deep-research\venv\Scripts\Activate.ps1"
python "$env:USERPROFILE\.claude\skills\deep-research\references\scripts\orchestrator.py" "your research query"
```

### Options

Run specific sources only:
```bash
# Mac/Linux
orchestrator.py "your query" perplexity,gemini

# Windows
python orchestrator.py "your query" perplexity,gemini
```

Run sequentially instead of parallel:
```bash
orchestrator.py "your query" --sequential
```

---

## Output Location

Results are saved to your home directory:
```
~/research-staging/
```

On Windows:
```
C:\Users\YourName\research-staging\
```

Files created:
- `{timestamp}_ORCHESTRATOR_{query}.json` - Raw combined data
- `{timestamp}_ORCHESTRATOR_{query}.md` - Readable markdown summary
- Individual source files for each API
- Browser research results (when using Tier 2)

---

## Cost Estimates

| Source | Cost per Query | Time |
|--------|---------------|------|
| Perplexity Deep | ~$0.15-0.50 | 2-3 min |
| Gemini API | Free tier | 10-20 sec |
| Tavily Advanced | ~$0.016 | 2-5 sec |
| Exa.ai | ~$0.005 | 2-5 sec |
| **Full API Orchestration** | **~$0.20-0.55** | **2-3 min** |
| Claude Deep Research | Included with Max plan | 5-15 min |
| Gemini Deep Research | Included with Advanced plan | 5-15 min |
| Manus | Per plan | 5-15 min |

Prices as of January 2026. Check each provider's pricing page for current rates.

---

## Troubleshooting

**"Module not found" error:**
Make sure you activated the virtual environment:

Mac/Linux:
```bash
source ~/.claude/skills/deep-research/venv/bin/activate
```

Windows (PowerShell):
```powershell
& "$env:USERPROFILE\.claude\skills\deep-research\venv\Scripts\Activate.ps1"
```

**API key errors:**
Check that your `api-keys.json` file has valid keys for each service. If you see auth errors, your key may be expired or incorrect.

**Permission denied (Mac):**
Run `chmod +x install.sh` first.

**"Execution policy" error (Windows):**
Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**"source not recognized" error (Windows):**
You're using Mac commands on Windows. Use the PowerShell commands shown above instead.

**Browser automation not working:**
Make sure Claude in Chrome MCP is properly configured in your Claude Code settings. See `references/browser-automation.md` for setup help.

**Model name errors (Perplexity/Gemini):**
API providers update model names periodically. If you get model-not-found errors, check the provider's documentation for the current model name and update your `api-keys.json`.

---

## What's Installed

```
~/.claude/skills/deep-research/
├── SKILL.md                 # Skill definition for Claude
├── references/
│   ├── api-keys.json        # Your API keys (you fill in)
│   ├── browser-automation.md # Instructions for browser-based research
│   └── scripts/
│       ├── orchestrator.py   # Main parallel runner
│       ├── perplexity_research.py
│       ├── gemini_research.py
│       ├── tavily_research.py
│       └── exa_research.py
└── venv/                    # Python virtual environment
```

---

*Packaged by Rich Schefren - Strategic Profits*
