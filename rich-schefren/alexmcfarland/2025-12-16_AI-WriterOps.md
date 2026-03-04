# AI WriterOps

*How to install Anthropic's official skill library in your co-writer*

**Source:** https://alexmcfarland.substack.com/p/add-16-professional-skills-to-your
**Date:** 2025-12-16T21:46:21.108Z

---

_🔓**Paid members:** All assets from my videos and guides—starter kits, prompts, skills—are available for paid members._

_🚀**Want the full system?** [Join the waitlist for The Co-Writer System →](https://waitlist.writerops.ai/) Limited spots. Launching soon._

Subscribed

* * *

* * *

Last week I showed you how to build a co-writing system inside Claude Code. This week we’re upgrading it.

Anthropic released an official repository of Claude skills. 16 packaged instructions you can install with one command—no manual setup, no copying files.

In this video, I’ll show you exactly how to add them to your system and when to use them.

By the end, you’ll have:

  * **Anthropic’s official skills installed** in your co-writer

  * **Understanding of skill structures** — basic vs. advanced

  * **Access to front-end design, PDF, and spreadsheet skills** for creating visuals and lead magnets

  * **The skill creator** — a skill that builds other skills

  * **Real examples** of turning newsletter content into presentations and PDFs




This builds directly on the Claude Code Masterclass. If you haven’t set up your system yet, start there.

* * *

[![Claude Code for Writing \[Masterclass\]](https://substackcdn.com/image/youtube/w_728,c_limit/Ip566JVP_30)Claude Code for Writing [Masterclass][Alex McFarland](https://substack.com/profile/2951923-alex-mcfarland)·December 10, 2025[Read full story](https://alexmcfarland.substack.com/p/claude-code-for-writing-masterclass)](https://alexmcfarland.substack.com/p/claude-code-for-writing-masterclass)

* * *

## Why skills?

Skills are packaged instructions. Write once, use forever.

Instead of re-explaining how to create a PDF every time, you give Claude the instructions once. Then it activates them automatically whenever the task comes up.

**Here’s how it works:** you ask Claude to do something, it scans all available skills, finds a match, and loads up that context without you doing anything.

That’s the shift. From explaining what you want every session to building assets that compound.

* * *

## What’s in the video

[![](https://substackcdn.com/image/fetch/$s_!LxJe!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd1d30fa1-3cfa-4370-957a-1f3ac823de5c_1590x668.png)](https://substackcdn.com/image/fetch/$s_!LxJe!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd1d30fa1-3cfa-4370-957a-1f3ac823de5c_1590x668.png)

* * *

### There are two skill structures

Basic skills are a single markdown file inside your `.claude/skills/` folder. That’s it. One file with all the instructions.

Advanced skills add subfolders—templates and references. For example, my ICP creator skill includes a 20+ question interview guide that Claude follows. The main markdown file tells Claude what to do, the templates folder gives it the resources.

[![](https://substackcdn.com/image/fetch/$s_!vT78!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a27a5f3-b79e-4bb5-b38b-102a7b8e07fe_2204x1138.png)](https://substackcdn.com/image/fetch/$s_!vT78!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a27a5f3-b79e-4bb5-b38b-102a7b8e07fe_2204x1138.png)

Both work. Start basic, add complexity when you need it.

### Installing official skills

This is the easy part.

  1. Open your co-writer folder in Claude Code

  2. Open the terminal (required for the plugin command)

  3. Type `/plugin`

  4. Tab to “Marketplaces”

  5. Click “Add Marketplace”

  6. Enter: `anthropics/skills`

  7. Install the skills you want




Done. They’re now registered in your system and activate automatically.

[![](https://substackcdn.com/image/fetch/$s_!xqLU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7c35052f-7600-4d55-b0e4-0893fb062e3b_1046x582.png)](https://substackcdn.com/image/fetch/$s_!xqLU!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7c35052f-7600-4d55-b0e4-0893fb062e3b_1046x582.png)

### Skills worth knowing

From the 16 official skills, these matter most for co-writers:

**Front-end design** — Creates presentations, landing pages, and visual content. This is what I use for my YouTube slide decks.

**PDF** — Generates professional PDF documents. Lead magnets, downloadable guides, reports.

**Spreadsheets** — Creates formatted spreadsheets for tracking, planning, analysis.

**Skill creator** — A skill that helps you build custom skills. When you want to package your own workflows, this guides you through it.

[![](https://substackcdn.com/image/fetch/$s_!8FD1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2b6af985-626b-43ae-b926-5c2bfa288094_2544x1660.png)](https://substackcdn.com/image/fetch/$s_!8FD1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2b6af985-626b-43ae-b926-5c2bfa288094_2544x1660.png)

### The magic: skills + context

Skills alone are useful. Skills combined with context profiles are powerful.

When I asked Claude to create a presentation from my newsletter, it didn’t just follow the front-end design skill. It read my voice DNA, my brand colors, my business profile. The output started closer to what I actually wanted.

Same with the PDF lead magnet. Claude pulled from the newsletter content, applied the PDF skill, and used my context to shape the design direction.

This is what separates “using a skill” from “having a system.”

* * *

### Recommended readings

Everything you need to understand and install Claude skills:

  * **[What are skills? — Claude Support](https://support.claude.com/en/articles/12512176-what-are-skills)** — Official explanation of skills and how they work

  * **[Skills documentation — Claude Code Docs](https://code.claude.com/docs/en/skills)** — Technical documentation for building and using skills

  * **[Anthropic’s official skill repository — GitHub](https://github.com/anthropics/skills)** — The 16 skills covered in this video, plus installation instructions




[Share](https://alexmcfarland.substack.com/p/add-16-professional-skills-to-your?utm_source=substack&utm_medium=email&utm_content=share&action=share&token=eyJ1c2VyX2lkIjo0MTMxNDI1LCJwb3N0X2lkIjoxODE4MjkzNjQsImlhdCI6MTc2ODQyOTEzMywiZXhwIjoxNzcxMDIxMTMzLCJpc3MiOiJwdWItMTgxNTUyMyIsInN1YiI6InBvc3QtcmVhY3Rpb24ifQ.yjfZn1cecqgnZCtCOKVnbdy7Mzl9pvPWvaNfoOfLRes)

* * *

## Start here

  1. **Watch the video** — Follow along with the installation and demos

  2. **Install the plugin** — Use `/plugin` to add the Anthropic marketplace

  3. **Test with your content** — Try creating a presentation or PDF from something you’ve written

  4. **Iterate** — Use natural language to refine the output until it matches your brand




This is how you build a system that gets better over time. Skills compound. Context compounds. The more you add, the less you explain.

Go upgrade your co-writer.

_—Alex_
