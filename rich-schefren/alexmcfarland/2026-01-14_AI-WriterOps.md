# AI WriterOps

*Anthropic's new feature brings Claude Code to everyone*

**Source:** https://alexmcfarland.substack.com/p/claude-cowork-in-30-minutes-free
**Date:** 2026-01-14T02:02:28.997Z

---

_🔓**Paid members:** All assets from my videos and guides—starter kits, prompts, skills, agents—are available for paid members._

Subscribed

* * *

Anthropic just released Claude Cowork, a brand new feature in the Claude desktop app that brings Claude Code capabilities to a way more user friendly interface. If you’ve ever looked at Claude Code and thought “that looks powerful but I’m not touching a terminal,” this is for you.

This is a full walkthrough of Cowork with three practical use cases for writers, creators, marketers, and other professional non-developers. No coding. No terminal. Just folders and skills.

By the end, you’ll have:

  * **Access to Cowork** \- Where to find it and how to set up folders

  * **Front-end design skill installed** \- Anthropic’s official skill for building landing pages

  * **A working landing page** \- Built from your own content (transcripts, docs, whatever)

  * **Content repurposing workflow** \- Using custom skills to extract ideas from your archive

  * **Chrome connector setup** \- For scraping analytics and automating browser tasks




If you’re a Claude Max subscriber, you can follow along right now. Pro users should get access soon.

* * *

[![Claude Code Can Now Control Your Browser \(Setup Guide\)](https://substackcdn.com/image/youtube/w_728,c_limit/ZewsZZ3_iQs)Claude Code Can Now Control Your Browser (Setup Guide)[Alex McFarland](https://substack.com/profile/2951923-alex-mcfarland)·December 19, 2025[Read full story](https://alexmcfarland.substack.com/p/claude-code-can-now-control-your)](https://alexmcfarland.substack.com/p/claude-code-can-now-control-your)

* * *

## **What Cowork means for non-developers**

A lot of people have been asking for a more user friendly interface for Claude Code. Vibe coders were even starting to build wrappers around it. Well, Anthropic just did it themselves.

Cowork lets you work locally inside folders on your system. That’s the whole point. Instead of chatting in a window that forgets everything, you’re pointing Claude at actual folders with actual files and telling it to do work.

[![](https://substackcdn.com/image/fetch/$s_!vHeR!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9e77d490-65c3-46c8-a7ea-36eb031b642d_3164x2036.png)](https://substackcdn.com/image/fetch/$s_!vHeR!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9e77d490-65c3-46c8-a7ea-36eb031b642d_3164x2036.png)

Is it as powerful as Claude Code? No. You can’t spin up custom agents. You can’t see your documents in the same view. But it’s a real middle ground. If the terminal intimidates you, this is where you start.

And honestly, some of what you can build here is insane. The landing page I made in this video from just five training transcripts? I almost replaced my actual landing page with it.

* * *

## **What’s in the video**

[![](https://substackcdn.com/image/fetch/$s_!OOZM!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd59d7b1e-d17d-49f3-b03a-3ca0d476464e_1514x774.png)](https://substackcdn.com/image/fetch/$s_!OOZM!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd59d7b1e-d17d-49f3-b03a-3ca0d476464e_1514x774.png)

* * *

## **Working in folders**

The fundamental shift with Cowork is that you’re not just chatting. You’re pointing Claude at a folder on your system and giving it access to read and write files.

In the bottom left of Cowork, you’ll see an option to open folders. Select a folder, allow Claude to change files (meaning full read/write access), and now Claude is working inside that context.

[![](https://substackcdn.com/image/fetch/$s_!nEEi!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3d335b18-a132-4a2c-b5f9-c037be3086c0_2122x1054.png)](https://substackcdn.com/image/fetch/$s_!nEEi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3d335b18-a132-4a2c-b5f9-c037be3086c0_2122x1054.png)

This is exactly how Claude Code works. The difference is you’re doing it through a GUI instead of a terminal.

One warning: Claude can delete stuff. It can mess with your files. Back up anything important before you give it access to a folder.

## **Claude skills in Cowork**

Skills are what make this actually powerful. A skill is basically packaged expertise that tells Claude how to do something specific.

You can find Anthropic’s official skills at [github.com/anthropics/skills](https://github.com/anthropics/skills). Download the zip, extract it, and you’ll have access to skills for front-end design, PDFs, spreadsheets, brand guidelines, and more.

To install a skill: Settings > Capabilities > scroll down to Skills > add your own > upload the SKILL.md file.

The front-end design skill is the one I use for landing pages. It creates distinctive, production-grade interfaces that don’t look like AI garbage. The difference between a landing page with this skill versus without is night and day.

[![](https://substackcdn.com/image/fetch/$s_!17Ib!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4399f402-1880-423e-84ef-48b55d896fdf_2422x1364.png)](https://substackcdn.com/image/fetch/$s_!17Ib!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4399f402-1880-423e-84ef-48b55d896fdf_2422x1364.png)

## **The Chrome connector**

This is where things get interesting. The Chrome connector gives Cowork the ability to control your browser.

Enable it in the connectors menu (the plus button at the bottom left). Once it’s enabled, you can tell Claude to navigate to a URL, look at the page, and extract information.

[![](https://substackcdn.com/image/fetch/$s_!oVo6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdec33242-a53c-47ca-980d-ede3d4f4d17b_2034x1006.png)](https://substackcdn.com/image/fetch/$s_!oVo6!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdec33242-a53c-47ca-980d-ede3d4f4d17b_2034x1006.png)

I use this for Substack analytics because Substack doesn’t have an API. I point Claude at my analytics page, tell it to capture the data, and it creates an Excel file in my working folder. Hands-free. I don’t touch anything.

You’ll see an orange glow around your browser tab when Claude is controlling it. It’s literally using its eyes through the Chrome connector to look at what’s on screen.

* * *

## **PAID MEMBER RESOURCES:**

* * *

### **Skill downloads and links**

  1. **[Anthropic’s official skills repository](http://github.com/anthropics/skills)**




Download the zip to get access to all official skills including front-end design, PDFs, spreadsheets, and more.

  2. **[Claude Cowork announcement](http://claude.com/blog/cowork-research-preview)**

  3. **[Content extraction skill](https://chemical-clematis-3fe.notion.site/Content-Extraction-Skill-2e7aade888148194a3a1d97be240671e?source=copy_link)**




The custom skill I used for repurposing newsletters is available for paid subscribers. It extracts content ideas from long-form content and organizes them into platform-specific tables.

* * *

Cowork is a real middle ground. If you master this, move on to Claude Code. That’s where you unlock custom agents and parallel workflows.

But if you’ve been too intimidated to touch the terminal, this is your starting point.

_—Alex_
