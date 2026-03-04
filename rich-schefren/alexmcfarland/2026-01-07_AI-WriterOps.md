# AI WriterOps

*Your co-writer system just got a research team*

**Source:** https://alexmcfarland.substack.com/p/i-built-a-team-of-research-subagents
**Date:** 2026-01-07T02:24:52.647Z

---

_🔓**Paid members:** All assets from my videos and guides—starter kits, prompts, skills, agents—are available for paid members._

_🚀**Want the full system?** [Join the waitlist for The Co-Writer System →](https://waitlist.writerops.ai/) Limited spots. Launching soon._

Subscribed

* * *

* * *

This video shows you how to add a research agent to your Claude Code co-writer system using Perplexity’s MCP server.

The research agent reads your context profiles (ICP, voice DNA, business profile) and runs personalized research queries—so the output is actually relevant to your business, not generic internet summaries.

By the end, you’ll have:

  * **A working Perplexity MCP integration** — installed and configured in Claude Code

  * **A custom research agent** — that reads your context profiles before researching

  * **Access to three research tools** — quick search, reasoning, and deep research

  * **Professional PDF reports** — with executive summaries on top of raw research

  * **A workflow for parallel research** — run multiple queries at once and come back later




If you haven’t set up your context profiles yet, do that first. The research agent needs your ICP, voice DNA, and business profile to personalize results.

* * *

[![Claude Code for Writing \[Masterclass\]](https://substackcdn.com/image/youtube/w_728,c_limit/Ip566JVP_30)Claude Code for Writing [Masterclass][Alex McFarland](https://substack.com/profile/2951923-alex-mcfarland)·December 10, 2025[Read full story](https://alexmcfarland.substack.com/p/claude-code-for-writing-masterclass)](https://alexmcfarland.substack.com/p/claude-code-for-writing-masterclass)

* * *

## Why a research agent?

You want to validate your niche. Analyze content gaps. Understand what your audience is searching for. But generic research tools give generic results. They don’t know your business context.

The shift here is building research into your co-writer system. The agent reads your context first, then runs queries through Perplexity. So when you ask “validate my niche” or “find content gaps for my ICP,” the research is actually personalized.

The other piece: unlike N8N and other workflow tools, Claude Code doesn’t time out on long deep research sessions. You can kick off multiple research queries in parallel, go do something else, and come back to professional reports waiting for you.

* * *

## **What’s in the video**

[![](https://substackcdn.com/image/fetch/$s_!KaQT!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa520cd86-401c-4e38-b0ae-9a407dc77208_1616x574.png)](https://substackcdn.com/image/fetch/$s_!KaQT!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa520cd86-401c-4e38-b0ae-9a407dc77208_1616x574.png)

[ Share](https://alexmcfarland.substack.com/p/i-built-a-team-of-research-subagents?utm_source=substack&utm_medium=email&utm_content=share&action=share&token=eyJ1c2VyX2lkIjo0MTMxNDI1LCJwb3N0X2lkIjoxODM3NDM4MDYsImlhdCI6MTc2ODQyOTEyNSwiZXhwIjoxNzcxMDIxMTI1LCJpc3MiOiJwdWItMTgxNTUyMyIsInN1YiI6InBvc3QtcmVhY3Rpb24ifQ.LGXjryF-6j4QFG2V7TA6D07fN-9N3_Wu25wmWOr8y9I)

* * *

## Key concepts

### The three Perplexity tools

The **[Perplexity MCP server](https://docs.perplexity.ai/guides/mcp-server)** gives you access to three different research tools:

**Search** is for quick queries. Simple questions that need fast answers. Use this when you need a quick fact check or surface-level information.

**Reason** is for complex, multi-step questions. When you need the AI to think through something that requires connecting multiple pieces of information, use reason.

**Deep research** is the heavy-duty option. This runs detailed, comprehensive research and takes longer—but produces thorough reports. Perfect for market analysis, niche validation, and competitive research.

[![](https://substackcdn.com/image/fetch/$s_!O7Rb!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F18656833-f04d-4cc6-80f2-bceac15ff94a_640x280.png)](https://substackcdn.com/image/fetch/$s_!O7Rb!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F18656833-f04d-4cc6-80f2-bceac15ff94a_640x280.png)

The research agent knows which tool to use based on your query. You don’t have to specify.

### Context-aware research

This is where everything connects.

The research agent’s system prompt tells it to read your context profiles before running any queries. So when you ask “analyze content gaps for my ICP,” the agent first loads your ICP profile, understands who your audience is, what they struggle with, what they’re searching for—then runs research with that context baked in.

The result: research that’s actually relevant to your business. Not generic summaries that could apply to anyone.

The more context you have in your system, the better the research output. Your voice DNA, ICP, business profile, even past content—all of it makes the research more personalized.

[![](https://substackcdn.com/image/fetch/$s_!3M72!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe4bcb4de-20cf-46e4-b1a0-dd2abb649506_1474x1106.png)](https://substackcdn.com/image/fetch/$s_!3M72!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe4bcb4de-20cf-46e4-b1a0-dd2abb649506_1474x1106.png)

### Storing research for future context

All research output can be stored in your knowledge folders.

This matters because that research becomes context for future conversations. When you’re writing content later and need to reference market data or audience insights, it’s already in your system. The co-writer can pull from it.

This is the compounding effect of building systems. Every piece of research you run becomes an asset you can reference later.

* * *

## Resources

### →Research agent system prompt

The complete system prompt for the research agent is below—ready to copy into your `.claude/agents/` folder.

This prompt:

  * **Instructs the agent to read context profiles first** — ICP, voice DNA, business profile

  * **Defines how to select the right Perplexity tool** — search vs. reason vs. deep_research

  * **Sets up the output structure** — including executive summaries and storage location

  * **Chains with the PDF skill** — for professional report generation




Drop this into your agents folder, update the paths to your context profiles, and you have a working research agent.

[![](https://substackcdn.com/image/fetch/$s_!iYn3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F735e72ea-ddcf-4b47-8257-ee1acc743b86_1630x1210.png)](https://substackcdn.com/image/fetch/$s_!iYn3!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F735e72ea-ddcf-4b47-8257-ee1acc743b86_1630x1210.png)

### → [Click here to grab the agent!](https://chemical-clematis-3fe.notion.site/Researcher-Agent-2e0aade888148125ae40c7e4b81057ee?source=copy_link)

* * *

Every research query builds your knowledge base. The more you use it, the more context your system has to work with.

_—Alex_
