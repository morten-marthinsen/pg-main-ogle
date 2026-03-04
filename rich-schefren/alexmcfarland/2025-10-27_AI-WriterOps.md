# AI WriterOps

*Claude Skills turn one-time prompts into permanent AI workflows*

**Source:** https://alexmcfarland.substack.com/p/your-saved-prompts-are-useless-now
**Date:** 2025-10-27T12:21:26.921Z

---

* * *

_Claude Skills was all the talk last week. Now that the initial hype calmed down, we'll be covering everything you need to know to begin building customized instructions and workflows as an AI operator._

Subscribed

* * *

What’s the biggest frustration you’ve probably experienced with AI tools?

You find an incredible prompt that works perfectly. You save it somewhere, like a Google Doc, maybe a Notion page, maybe just buried in your chat history. Then when you need it again, you can’t find it. Or you find it but have to copy-paste it manually. Or you paste it and it doesn’t quite work the same way because you’re missing some context. Sound familiar?

Well, Anthropic just released Claude Skills, and it helps solves this problem while opening up something even bigger: the ability to create reusable, on-demand AI workflows that work consistently every single time.

So today, I’m going to break down exactly what Claude Skills are, why they’re a game-changer for anyone using AI regularly, and how you can start building your own skills library in just a few minutes.

### **Claude Skills are reusable AI workflows that solve the “prompt graveyard” problem**

Here’s what Claude Skills actually are: specialized instruction sets packaged as markdown files that Claude can call on-demand to perform specific tasks.

These skills live in a folder on your computer or uploaded to Claude’s web interface. Each skill contains detailed instructions, examples, templates, and even executable Python scripts—all wrapped up in a single, reusable package.

The brilliance here is that unlike Claude Projects or custom GPTs (which apply their context to every conversation in that project), Skills are invoked only when needed. You can have dozens of skills available, and Claude intelligently determines which one to use based on what you’re asking for.

For example, you could have separate skills for:

  * Turning technical changelogs into user-facing newsletters

  * Converting customer demo notes into personalized follow-up emails

  * Analyzing data in a specific format you use repeatedly

  * Writing PRDs that follow your company’s exact template

  * Creating social media content in your brand voice




Each skill gets called precisely when you need it instead of cluttering every conversation with unnecessary context.

### **A Claude Skill is literally just a folder with a markdown file (and some optional extras)**

Let’s demystify what these actually are, because they sound more complicated than they really are.

A Claude Skill is:

  * A folder on your computer

  * With a file named `skill.md` inside it

  * And optionally, additional files that the skill references (templates, examples, Python scripts)




That’s it. That’s the whole technical structure.

To use the skill in Claude Code, you just work in a directory that contains your skills folders. To use it in the Claude web app or desktop app, you zip up the folder and upload it.

Inside that `skill.md` file, there are a few structured elements:

  * **Metadata** at the top (name and description in YAML format)

  * **Instructions** in the body (your actual prompt, written in markdown)

  * **Resource links** to other files in the folder (examples, templates, scripts)




The metadata helps Claude know when to invoke the skill. The instructions tell Claude exactly what to do. And the resource links provide additional context without bloating the main instructions.

[![](https://substackcdn.com/image/fetch/$s_!h3b5!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F57eb6fe3-77a7-411b-adee-e987ebd00193_1650x929.avif)](https://substackcdn.com/image/fetch/$s_!h3b5!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F57eb6fe3-77a7-411b-adee-e987ebd00193_1650x929.avif)

### **The best way to create skills? Use Cursor (or another AI coding tool) instead of Claude’s web interface**

Here’s something interesting: Anthropic released a “create skill” skill within Claude that you can use to generate new skills. But in practice, it’s slower and more cumbersome than just using Cursor or another AI coding tool.

[![](https://substackcdn.com/image/fetch/$s_!0TzF!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a498fc8-5778-40df-a920-ad6ad9ba5c83_2244x300.png)](https://substackcdn.com/image/fetch/$s_!0TzF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a498fc8-5778-40df-a920-ad6ad9ba5c83_2244x300.png)

The workflow that works better:

  1. Create an empty folder on your computer called “Claude Skills”

  2. Open that folder in Cursor

  3. Start a chat: “Create me a skill for [specific task]. Here are the docs: [link to Anthropic’s skill documentation]”

  4. Cursor generates the skill structure, the markdown file, any templates, and even a Python validation script—all in about 3 minutes

  5. Your skill folder is now ready to use




This approach is dramatically faster than using Claude’s web interface, where you’d have to download 12+ files individually and reorganize them into a folder structure.

Once you have one skill created, you can use that skill to create more skills. This is the meta-skill approach: your first skill should literally be a “skill creator” that knows how to format and structure new skills properly.

## **Skills work best when they’re highly specific to repetitive tasks you do regularly**

The real power of Claude Skills is in codifying the specific workflows you repeat over and over.

Think about the tasks where you currently:

  * Copy-paste the same prompt with minor variations

  * Manually adjust AI output to match your preferred format

  * Spend time re-explaining context that hasn’t changed

  * Follow a multi-step process that could be automated




These are perfect candidates for skills.

For example, if you write weekly newsletters or SEO articles, that’s a perfect skill. The input is always similar (writing briefs), the output format is consistent (newsletter style or listicle), and you do it repeatedly.

The pattern to look for: any task where the instructions stay the same but the specific content changes. That’s where skills shine.

## **You can invoke skills naturally—no magic commands required**

One of the most elegant aspects of Claude Skills is how they’re activated. You don’t need to type “invoke skill” or use special syntax.

You just start working, and Claude intelligently determines which skill to use based on context.

This natural invocation means your AI assistant truly feels like it understands your workflows, not just following rigid commands.

And because skills include keywords in their metadata, Claude gets better at knowing when to use each one. You can have a library of 20+ skills, and Claude will pull the right one for the job without you having to remember the exact name or structure of each.

## **The future of AI work is building your own skills library**

We’re moving into an era of “workflow engineering.”

Instead of crafting the perfect one-off prompt, you’re now building a library of reusable AI capabilities that compound over time. Each skill you create becomes a permanent asset in your AI toolkit—something you can use again and again, refine over time, and even share with team members.

This is how professionals will use AI: not as a chatbot they prompt from scratch each time, but as a customized assistant loaded with organization-specific skills that handle recurring tasks automatically.

The opportunity right now is to be early to this shift. Most people are still copying and pasting prompts. You can be building a sophisticated skills library that makes you 10x more productive with AI.

Start with 2-3 skills for tasks you do weekly. Refine them until they produce exactly the output you need. Then gradually expand your library as you identify more workflow opportunities.

Within a few months, you’ll have a custom AI system that’s tailored precisely to your work. Something no generic AI tool could ever provide out of the box.

## **Here’s your action plan: create your first skill this week**

Don’t overcomplicate this. Here’s exactly what to do:

  1. Create a “Claude Skills” folder on your computer

  2. Open Cursor (or your preferred AI coding tool) in that folder

  3. Ask it to create a “create skill” skill using Anthropic’s documentation

  4. Then use that meta-skill to create 1-2 skills for tasks you do regularly

  5. Test them in Claude Code by invoking them naturally in your work

  6. Refine the instructions until the output is consistently excellent




If you want to use the skills in Claude’s web or desktop app, just zip up the skill folder and upload it through the interface.

You can also follow the similar process in Claude's web interface if oyu don't want to use a coding tool. Just enable the skill creator in your settings.

This is another one of those moments where a new AI capability is genuinely transformative but still early enough that most people haven’t adopted it yet. The people who start building today will have the most sophisticated, refined systems.

Start building.

— Alex
