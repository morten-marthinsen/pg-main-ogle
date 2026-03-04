# AI WriterOps

*How to package your expertise into reusable Claude workflows without downloading a million files or dealing with complicated setup*

**Source:** https://alexmcfarland.substack.com/p/stop-wasting-time-on-claudes-web
**Date:** 2025-11-04T00:01:26.792Z

---

Two weeks ago, Anthropic dropped Claude Skills.

And I’m going to be honest with you: this is one of the most important things I’ve seen come out in a long time.

I’ve been obsessed with it. It’s going to dramatically change how I work with Claude, how I teach about it, and how I help clients build AI workflows.

Here’s the thing: most people are either overwhelmed by the technical setup or they’re not seeing the full potential. They’re trying to create skills through Claude’s web app and ending up with a mess of files, wasting their usage limits, and getting frustrated.

There’s a better way.

And I’m going to show you how to master this in less than 10 minutes.

### **Timestamps:**

  * [0:00](https://www.youtube.com/watch?v=p4fhg3ovL7E) Intro: Why Claude Skills is a game-changer 

  * [0:43](https://www.youtube.com/watch?v=p4fhg3ovL7E&t=43s) What are Claude Skills? 

  * [1:32](https://www.youtube.com/watch?v=p4fhg3ovL7E&t=92s) The problem with using Claude Web to create skills 

  * [2:12](https://www.youtube.com/watch?v=p4fhg3ovL7E&t=132s) Skills vs Projects: The critical difference 

  * [3:46](https://www.youtube.com/watch?v=p4fhg3ovL7E&t=226s) What we’re building today 

  * [4:20](https://www.youtube.com/watch?v=p4fhg3ovL7E&t=260s) Setting up your Claude Code workspace 

  * [5:29](https://www.youtube.com/watch?v=p4fhg3ovL7E&t=329s) Creating your master skill creator 

  * [7:31](https://www.youtube.com/watch?v=p4fhg3ovL7E&t=451s) How the skill structure works 

  * [9:03](https://www.youtube.com/watch?v=p4fhg3ovL7E&t=543s) Using the master creator to build custom skills 

  * [11:00](https://www.youtube.com/watch?v=p4fhg3ovL7E&t=660s) Real example: Turning my practical guides into a skill 

  * [13:02](https://www.youtube.com/watch?v=p4fhg3ovL7E&t=782s) Breaking down the skill structure 

  * [14:30](https://www.youtube.com/watch?v=p4fhg3ovL7E&t=870s) Packaging and uploading to Claude 

  * [15:07](https://www.youtube.com/watch?v=p4fhg3ovL7E&t=907s) Watching it work in real-time 

  * [16:09](https://www.youtube.com/watch?v=p4fhg3ovL7E&t=969s) Claude invokes your skill automatically 

  * [17:03](https://www.youtube.com/watch?v=p4fhg3ovL7E&t=1023s) What you can build with this 

  * [17:40](https://www.youtube.com/watch?v=p4fhg3ovL7E&t=1060s) Why you need to start building skills now




## If you’re not familiar with Claude Skills yet, here’s what you need to know:

You can package specific expertise, workflows, and instructions into a skill file. Then upload it to Claude. And from that moment on, Claude can invoke that skill autonomously across any chat, anytime you need it.

Think of it like giving Claude a specialized consultant on retainer.

You say “create my weekly newsletter” and Claude knows exactly how to do it—your voice, your structure, your examples. Every time.

### **But here’s what most people don’t realize:**

Claude Skills can carry their own context files. Voice profiles. Style guides. Templates. Examples.

Each skill becomes a self-contained package of expertise.

That’s the unlock.

## You’ve been doing it the hard way (and that ends today)

Now, maybe you’ve tried creating skills through Claude’s web interface.

If you have, you know what I’m talking about.

It’s messy. It downloads dozens of files. It eats through your usage limits before you even have a working skill. And the whole process just feels unnecessarily complicated.

Claude Web just doesn’t work well for creating skills.

But Claude Code does.

Claude Code handles all the file structure for you. It follows the documentation perfectly. It creates clean, working skills in minutes instead of hours.

And you don’t need to be technical to use it.

## We’re building two skills in the next 10 minutes

Let’s build your first Claude skill together. Actually, we’re going to build two:

  1. **A Master Skill Creator** \- This creates other skills for you (yes, meta)

  2. **Your Custom Skill** \- Whatever workflow you want to automate




I’m going to show you my process for creating a practical guide writer that turns my video transcripts into Substack posts. But you can adapt this for anything you do repeatedly:

  * Email sequences

  * Client proposals

  * Newsletter formats

  * Content briefs

  * Research reports

  * Whatever you need




The process is the same.

Simple.

Let’s go.

## First, create a folder and open Claude Code (takes 30 seconds)

**What you need:**

  * Cursor (the code editor)

  * Claude Code (the extension)




If you don’t have these set up yet, it’s super easy. There’s tons of resources out there. Reach out if you need help and I'll point you in the right direction.

**Now create your folder structure:**

  1. Create a new folder on your computer called “claude-skills”

  2. Open that folder in Cursor

  3. Activate Claude Code inside Cursor




That’s it.

You now have a clean workspace where we’ll store your master skill creator and every other skill you build.

Keep it simple. Keep it organized.

[![](https://substackcdn.com/image/fetch/$s_!FFZx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fef7a03cb-2099-4c95-bb95-8d483c2f89af_3024x1948.png)](https://substackcdn.com/image/fetch/$s_!FFZx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fef7a03cb-2099-4c95-bb95-8d483c2f89af_3024x1948.png)

## Now use Claude to build a skill that builds other skills (yes, meta)

Here’s the genius part: we’re going to use Claude to create a skill that creates other skills.

**Go to Claude’s documentation page[here](http://docs.claude.com/en/docs/claude-code/skills).**

**Now, in Claude Code, paste this:**
    
    
    Create a Claude master skill creator skill. Here is the documentation to help create skills: http://docs.claude.com/en/docs/claude-code/skills

Yes, my language there is filled with a bunch of "skill.” That’s okay. Claude understands.

That’s the best part about AI. You can just say what you mean and it figures it out 99% of the time.

Claude will fetch the documentation, read it, understand the exact structure and formatting requirements for skills, and then create your master skill creator.

You’ll see it processing... reading... building...

[![](https://substackcdn.com/image/fetch/$s_!ez_l!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff2ff1aa7-2358-4e17-a209-9516cf191d3a_1364x376.png)](https://substackcdn.com/image/fetch/$s_!ez_l!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff2ff1aa7-2358-4e17-a209-9516cf191d3a_1364x376.png)

And then it will ask for approval to create the files.

Approve it.

**Done.**

You now have a skill that can create other skills, properly formatted, following all of Anthropic’s specifications.

Look in your folder. You’ll see the Claude skill file.

[![](https://substackcdn.com/image/fetch/$s_!thhL!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa6dde39b-4d8f-4619-8025-06e26fa053dd_3024x1790.png)](https://substackcdn.com/image/fetch/$s_!thhL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa6dde39b-4d8f-4619-8025-06e26fa053dd_3024x1790.png)

## Turn your best work into a reusable skill (this is where it gets powerful)

Now comes the fun part.

Let’s say you want to create a skill for writing your weekly newsletter. Or creating client proposals. Or turning your video transcripts into blog posts.

**Find an example of your best work.**

For me, I grabbed one of my successful practical AI guides from Substack. The ones that got great engagement and feedback.

Copy that URL.

**Back in Claude Code, tell it:**
    
    
    Turn my practical AI guide into a Claude skill so I can create new ones in the future on new topics. We want to follow this structure, tone, etc. Use your Claude skill creator to create it. Here is the example guide: [paste URL]
    

**What Claude does next is magical:**

It analyzes your example. Extracts the structure. Identifies your voice patterns. Creates instructions. Builds templates. Generates reference files.

All automatically.

All following the exact specifications that Claude Web would accept.

In a few minutes, you’ll have a complete skill package ready to upload.

[![](https://substackcdn.com/image/fetch/$s_!_00h!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F22968dbf-cfc9-4a21-94f7-3bc8a6010347_3024x1798.png)](https://substackcdn.com/image/fetch/$s_!_00h!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F22968dbf-cfc9-4a21-94f7-3bc8a6010347_3024x1798.png)

## Zip it up and upload to Claude (takes 60 seconds)

**To use your skill in Claude Web:**

  1. Select all the files in your skill folder

  2. Compress them into a .zip file

  3. Open Claude Web

  4. Go to Settings > Capabilities

  5. Upload your .zip file




Claude Code structured everything correctly, so it will work perfectly.

**Toggle it on.**

Now that skill is available across all your Claude conversations.

[![](https://substackcdn.com/image/fetch/$s_!XXSL!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7183450b-8511-43b9-9281-3ce8b42befbc_3024x1722.png)](https://substackcdn.com/image/fetch/$s_!XXSL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7183450b-8511-43b9-9281-3ce8b42befbc_3024x1722.png)

## Watch Claude invoke your skill automatically (this moment is magic)

Here’s the test.

Open a new Claude chat. Or continue in an existing one—doesn’t matter.

**Paste your content and mention your skill:**

For my example, I would paste a video transcript and say:
    
    
    Create a practical AI guide out of my transcript.

**Watch what happens:**

Claude immediately recognizes the keywords. It invokes your skill. It reads the skill instructions. It pulls in all the supplemental documents—your voice profile, your style guide, your templates.

And it creates exactly what you wanted.

In my case, it generated a complete Substack guide in under 2 minutes. My voice. My structure. My examples.

**That’s a working Claude skill.**

**In under 10 minutes total.**

[![](https://substackcdn.com/image/fetch/$s_!WBHV!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F30e4345e-fafa-4e35-8522-e09e1921af1c_3024x1732.png)](https://substackcdn.com/image/fetch/$s_!WBHV!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F30e4345e-fafa-4e35-8522-e09e1921af1c_3024x1732.png)

## This is just the beginning of what you can build

This isn’t just a toy.

This is the foundation for how you’ll work with Claude going forward.

Each skill gets better because it has its own specialized context that doesn’t clutter up other conversations.

**You can build skills for:**

  * Content creation workflows

  * Client deliverables

  * Research and analysis

  * Writing in different styles or formats

  * Processing specific types of documents

  * Generating reports or summaries

  * Creating personalized communications




Whatever you do repeatedly, turn it into a skill.

## Most people are still using Claude like it’s 2023 (don’t be most people)

Here’s what I think:

We’re still unbelievably early in the AI adoption curve.

Most people are using Claude like the early days. They’re starting from scratch in every conversation. They’re re-explaining their context. They’re not building reusable systems.

Claude Skills changes that.

This is about creating persistent expertise. Packaging your knowledge. Building workflows that compound.

That’s the unlock.

## This is way more powerful than Claude Projects (important distinction)

Now, you might be thinking: “Isn’t this just like Claude Projects?”

I thought the same thing at first.

Here’s the difference:

**Claude Projects:**

  * Instructions apply to the entire conversation

  * You’re locked into those instructions

  * Context files live in that one project




**Claude Skills:**

  * Can be invoked dynamically across any chat

  * Only active when you need them

  * Portable across all your conversations

  * Can have their own specialized context that doesn’t pollute other chats




You can use multiple skills in the same conversation. You can invoke them at specific moments. They’re modular.

Much more powerful.

## Start with something you do every single week

Start with something you do every week.

Something that has a consistent structure but varies in content.

Something where you’ve already figured out what works.

Then package that into a skill.

Use Claude Code to make it clean and easy.

And watch your productivity multiply.

* * *

**Remember:** The best time to start was two weeks ago when this dropped. The second best time is right now.

Don’t wait until everyone else has their skills built and deployed.

You’re still early.

Build your first skill. Then build your second.

Trust me—this is one of those things you’ll look back on in six months and wish you’d started today.

So start today.

* * *

—Alex

 _Questions? Drop them in the comments. And let me know what skills you’re building—I want to see what you create._
