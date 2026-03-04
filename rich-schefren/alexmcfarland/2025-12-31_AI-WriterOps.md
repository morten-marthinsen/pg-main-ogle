# AI WriterOps

*How to build an AI newsletter writer using subagents and skills*

**Source:** https://alexmcfarland.substack.com/p/claude-code-for-writers-building
**Date:** 2025-12-31T00:13:33.965Z

---

_🔓**Paid members:** All assets from my videos and guides—starter kits, prompts, skills, agents—are available for paid members._

_🚀**Want the full system?** [Join the waitlist for The Co-Writer System →](https://waitlist.writerops.ai/) Limited spots. Launching soon._

Subscribed

* * *

* * *

Subagents are one of the most powerful capabilities in Claude Code—but nobody’s showing you how to build them for writing operations.

Today’s edition walks you through building your first writing agent from scratch, giving it access to skills, and integrating it into a larger writing system.

By the end, you’ll have:

  * **A newsletter writing agent** — built step-by-step in Claude Code

  * **The orchestration approach** — why agents should coordinate, not do everything

  * **Skills integration** — how to give your agent access to writing skills

  * **Context profile loading** — making AI output sound like you

  * **A reusable system** — that you can expand with more agents and skills




* * *

## **Why writing agents?**

An agent is a specialist with a specific job. It already knows what to do. It loads your context. It finds the right skill. It delivers.

Stop prompting. Start delegating to specialists that understand your system.

* * *

## **What’s in the video**

[![](https://substackcdn.com/image/fetch/$s_!zSwq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa8d43bb5-1859-421d-a06e-cbef5fca8f04_1520x764.png)](https://substackcdn.com/image/fetch/$s_!zSwq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa8d43bb5-1859-421d-a06e-cbef5fca8f04_1520x764.png)

* * *

## **Orchestration agents vs. fat agents**

There are two ways people build agents.

**Fat agents** stuff everything into the agent itself—writing frameworks, templates, examples, rules. The agent becomes massive, hard to maintain, and duplicates knowledge across every agent you create.

**My orchestration agents** stay lean. They know the process: load context, gather info, find the right skill, execute. The actual writing expertise lives in skills, not the agent.

I build orchestration agents. 

**Here’s why:**

If you bake your writing frameworks INTO the agent, you need a new agent for every newsletter type. But if the agent just knows how to find and use skills, you add new capabilities by adding skills—not rebuilding agents.

### **The three-layer system**
    
    
    Agent → Knows the workflow
    Skill → Knows the craft
    Context → Knows you

Your agent doesn’t need to know HOW to write a newsletter. It needs to know how to FIND something that does.

Your skill contains the actual framework—subject lines, hooks, headers, structure.

Your context profiles ensure the output sounds like you, speaks to your audience, and reflects your business.

### **The agent system prompt**

My newsletter agent is simple because it orchestrates instead of doing everything:

  1. Load context profiles from `/context`

  2. Gather info from the user (topic, type, source material)

  3. Find the matching skill in `.claude/skills/`

  4. Execute with the skill

  5. Deliver the newsletter




That’s it. The agent coordinates. The skill does the writing work.

[![](https://substackcdn.com/image/fetch/$s_!mY8k!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0a47999e-5cd4-45f0-bc9c-d8b032d14d6c_2370x392.png)](https://substackcdn.com/image/fetch/$s_!mY8k!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0a47999e-5cd4-45f0-bc9c-d8b032d14d6c_2370x392.png)

* * *

## **Resources**

* * *

### **Agent + skill downloads**

Everything from this video, ready to use:

  * **Newsletter Writer Agent** — The orchestration agent we built

  * **Thought Leadership Skill** — The newsletter writing skill with frameworks for subject lines, introductions, headers, and section structure




Both are formatted correctly for Claude Code. Download, extract to your `.claude/` folder, and start using.

### **[Download from Paid Member Vault →]**

**💎[Writing Agent](https://chemical-clematis-3fe.notion.site/Newsletter-Writer-Agent-2d9aade8881481d0ad9fc18bb973ab77?source=copy_link)**

**💎[Thought Leadership Newsletter Skill](https://chemical-clematis-3fe.notion.site/Thought-Leadership-Newsletter-Skill-2d9aade888148167bccbc056cfd156af?source=copy_link)**

* * *

## **Start here**

  1. **Watch the video** — follow along with the step-by-step walkthrough

  2. **Get the starter kit** — if you don’t have it, grab it free from my Claude Code masterclass

  3. **Build your agent** — use `/agent` in Claude Code and follow the process

  4. **Add the skill** — download the thought leadership skill and drop it in your skills folder

  5. **Test it** — give your agent a transcript or notes and watch it work




This is just the beginning. Once you understand the pattern—orchestration agents that invoke skills—you can build agents for anything: social media, content repurposing, research, whatever your writing operation needs.

The pattern is always the same. 

Load context. Gather info. Find the skill. Execute.

_—Alex_
