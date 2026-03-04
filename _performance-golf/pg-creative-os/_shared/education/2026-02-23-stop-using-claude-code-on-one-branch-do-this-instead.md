---
type: education
source: youtube
video_id: "6nFRJftouI0"
url: "https://www.youtube.com/watch?v=6nFRJftouI0"
title: "Stop Using Claude Code on One Branch (Do This Instead)"
channel: "Leon van Zyl"
publish_date: "2026-02-20"
duration_seconds: 930
duration_human: "15m 30s"
view_count: 11278
transcript_type: "auto-generated"
transcript_words: 2823
ingested: "2026-02-23"
ingested_by: "ingest-video v1.0"
tags: [claude-code, git-worktrees, parallel-agents, ai-workflow, developer-tools]
consumers: [tess, neco]
---

# Stop Using Claude Code on One Branch (Do This Instead)

> **Source**: [Leon van Zyl](https://www.youtube.com/watch?v=6nFRJftouI0) | 15m 30s | Published 2026-02-20
> **Ingested**: 2026-02-23 | Transcript: 2823 words (auto-generated)

---

## Executive Summary

This video solves a fundamental inefficiency in Claude Code workflows: the serial, back-and-forth approach of making a change, reviewing it, backing it out, and retrying. Leon van Zyl demonstrates Git Worktrees as the fix — a native Git feature that lets you create multiple independent filesystem copies of the same project, each pointing to its own branch, each with its own Claude Code session running in parallel.

The core insight is that instead of treating Claude Code as a single agent you negotiate with sequentially, you should run multiple agents simultaneously on different "universes" of the same codebase, then compare and merge the winner. The demo involves three parallel worktrees with different approaches (a frontend design skill, a reference image / design system, and Gemini 3.1 Pro) all building UI variants of the same fitness tracker app — resulting in four comparable designs in roughly the same time one would have taken.

The ONE most actionable takeaway: when facing any decision with multiple viable approaches (design directions, copy angles, feature implementations), don't debate — spin up parallel worktrees and let the agents race. Pick the winner, merge, delete the rest. This eliminates the iterative cost of "try → back out → retry" and replaces it with "try everything at once → compare → keep best."

---

## Key Tactical Takeaways

1. **Use Git Worktrees instead of branch-switching**: Each worktree is a real folder on the filesystem — not a virtual branch. You can have 3+ active project copies running simultaneously, each with an independent Claude Code session, without affecting the others.

2. **Spin up worktrees in seconds via Claude**: You don't need Git expertise. Just tell Claude Code: "Please create three git worktrees: one-skills, two-design-system, and three-gemini." Claude generates the folders and wires the Git relationships automatically.

3. **Assign different capabilities to each worktree**: Worktree 1 got a frontend design skill installed before launching Claude. Worktree 2 got a reference image pasted in with a design system prompt. Worktree 3 used a completely different model (Gemini 3.1 Pro via Google's IDE). Each agent operated with different context and tools.

4. **Run different AI models in parallel on the same codebase**: Because each worktree is an independent folder, you can open it in any IDE/CLI. Point one at Claude Code, another at Gemini, another at GPT — all working the same project simultaneously.

5. **Git tracks all worktrees automatically**: Source control shows all worktrees, their branches, and changes per tree. You can see the full picture without switching contexts. No manual tracking required.

6. **Merge the winner back to main with a single instruction**: Tell your main Claude Code instance: "I prefer the design-system worktree. Merge it into main and delete the others." Git handles the merge, conflict resolution, and cleanup.

7. **Use worktrees beyond UI testing — for parallel feature development**: One agent builds a feature in worktree A; another fixes a bug in worktree B. When the bug fix is done, merge it to main. The feature agent continues uninterrupted. Two Claude sessions delivering work simultaneously.

8. **Never copy-paste project folders manually**: Git must manage worktrees. Manual folder copies break Git's tracking. Always create worktrees via `git worktree add` (or via Claude). "If you simply copy and paste the folders yourself, you will be in big trouble."

9. **Close terminal sessions before merging**: Before merging a worktree into main, close the Claude Code / terminal session pointing at that worktree to avoid file-lock issues during deletion.

10. **Worktrees enable permanent design systems alongside variants**: Even if you discard a worktree's UI, any documentation or design systems it generated (e.g., `/docs/design/`) can be extracted before deletion — persistent value from discarded experiments.

---

## Scaling & Performance Intelligence
<!-- PRIMARY CONSUMER: Tess -->

### Scaling Tactics

- **Parallel agent architecture**: The foundational scaling insight is that Claude Code capacity is not a bottleneck when you run multiple instances. Three agents completing work in ~15 minutes vs. three sequential attempts would have taken 3x that time.
- **Cost structure**: Community membership (Agentic Labs) referenced at $7/month for first 1,000 members — signals this workflow is accessible to small teams, not enterprise-only.
- **Worktree creation is instant**: Claude Code generates all three worktree folders in a single command. Setup overhead is near-zero.

### Format & Platform Intelligence

- **Platform**: Claude Code CLI (terminal-based), compatible with any IDE. Gemini 3.1 Pro used via Google's "anti-gravity IDE" (likely Google IDX or a similar Gemini-native editor).
- **Git Worktrees**: Native Git feature, no plugins required. Works with any Git repository.
- **Skill installation**: Frontend design skills installed via `skills.sh` script before launching Claude in the worktree folder.

### Testing Frameworks

**Parallel Variant Testing Framework**:
1. Identify the decision point (e.g., "which UI direction?")
2. Define N approaches (N=3 in demo: skill, reference image, different model)
3. Create N worktrees via Claude: `"Please create three git worktrees: [name1], [name2], [name3]"`
4. CD into each worktree folder; configure each agent's context (install skills, paste reference images, set model)
5. Launch Claude Code (or alternative model) in each
6. Give each agent its variant-specific prompt
7. Let all agents run simultaneously
8. Review results side by side (run dev servers on different ports: 3000, 3001, 3002…)
9. Pick winner
10. Return to main Claude instance; instruct merge + cleanup

### Performance Benchmarks

- Three parallel worktree sessions completed in roughly the same wall-clock time as a single sequential session would take for one approach
- Dev servers run on sequential ports (3000, 3001, 3002, 3003) enabling simultaneous browser comparison
- One worktree (design system) took longer because it first generated documentation artifacts — accepted trade-off for reusable output

---

## Creative & Copy Intelligence
<!-- PRIMARY CONSUMER: Neco -->

### Audience Language Bank

This is a developer/AI-practitioner video. The audience language reveals the pain and desire of power users hitting Claude Code's sequential ceiling.

- **Pain quotes**:
  - "You'll ask Claude to make a change and if you don't like it, you ask Claude to back out everything and then try a different approach"
  - "Sometimes you actually lose a lot of valuable work along the way"
  - "This is slow, frustrating and quite honestly, you're leaving a lot of Claude Code's power on the table"
  - "You can only have one active branch at any point in time"
  - "We have to manually switch between them, and that's really not ideal"
  - "This looks like the kind of AI slop that we've all come to love" (ironic — describing generic AI output)
  - "It's very, very hard to decide"

- **Desire quotes**:
  - "What if I told you you could create multiple versions of your project"
  - "Let these agents run in parallel — completely independent"
  - "Compare the different results and simply pick your favorite"
  - "It's kind of like having multiple universes, where each has a very different take on the exact same project"
  - "Running multiple Claude Code instances in parallel like nothing"
  - "Git just knows exactly what's going on"

- **Their words** (vocabulary of this audience):
  - "work trees" / "worktrees"
  - "Claude Code instance"
  - "vibe coding"
  - "AI slop" / "AI sloppish"
  - "agent" / "agents running in parallel"
  - "merge back into main"
  - "skill" (as in Claude Code skill/plugin)
  - "design system"
  - "dev server"
  - "source control"

### Hook Structures & Pattern Interrupts

**Opening hook structure** (verbatim pattern):
> "Let me know if this sounds like you. [Pain scenario]. This is slow, frustrating and honestly, you're leaving a lot of [tool]'s power on the table. Instead, what if I told you you could [desired outcome]?"

This is a textbook "mirror pain → agitate → contrast" hook. The "let me know if this sounds like you" opener is a pattern interrupt that establishes empathy before pitching the solution. Strong model for ad hooks targeting an audience with a specific recurring frustration.

**Secondary hook** (for a different context):
> "I know the moment I said [scary word], a lot of you tensed up. But don't worry, you don't have to be an expert in [topic] to [use solution] right away."

Objection pre-emption baked directly into the hook. Acknowledges the fear, dismisses the barrier, restores confidence — all in two sentences.

### Creative Frameworks

**The "Multiple Universes" Frame**:
- Concept: Each worktree is a parallel universe where a different version of your project exists
- Application: Useful for any creative decision with multiple valid paths — instead of committing to one direction, branch all options, compare outcomes, merge the winner
- Direct creative application: Run parallel copy tests, visual concept tests, or angle explorations simultaneously rather than iterating sequentially

**The "Race the Agents" Framework**:
1. Define the creative decision
2. Assign each option to an agent with different context/constraints
3. Let all agents work simultaneously
4. Review side-by-side
5. Pick winner, discard rest

### Proof & Credibility Patterns

- Live demo with real output shown (no mock-ups) — actual app renders from each approach
- Side-by-side comparison of 4 designs visible on screen
- Community CTA ($7/month, 1,000 member cap) implies scarcity and validated demand
- Transparency about failures: design system agent "struggled to remove folder" due to untracked files — not edited out, builds trust

### Competitive Intelligence

- **Model comparison used as a feature**: Explicitly pits Claude Code vs Gemini 3.1 Pro in the same workflow. Signals that multi-model strategies are becoming standard practice.
- **Gemini 3.1 Pro** noted for animation strength: "lean into your strength of creating animations and SVGs" — shows practitioners are developing model-specific creative briefs.
- The framing that Claude produces "AI slop" by default (without skills/design systems) is a market pain point that Claude Code plugin/skill products directly address.

---

## Detailed Notes

### The Core Problem (0:00–1:30)

Sequential Claude Code usage creates a painful iteration loop:
- Ask → review → dislike → back out → retry
- Each back-out risks losing valuable work
- Only one branch active at a time = no parallel comparison possible
- "You're leaving a lot of Claude Code's power on the table"

### Git Worktrees Explained (1:30–4:00)

**Normal state**: One main branch → one Claude Code session → one active project.

**With worktrees**:
- Main branch + Worktree 1 + Worktree 2 + Worktree 3
- Each worktree is a real filesystem copy of the project at the same directory level
- Main branch is "aware" of all linked worktrees
- Each worktree can have its own independent Claude Code instance
- Changes in any worktree do not affect other worktrees

**Key distinction from manual folder copy**: Git manages the relationship. Branching, merging, and conflict resolution all work natively. Manual copy-paste breaks this.

**Non-UI use case**: Feature development in one worktree + bug fix in another → merge bug fix to main → feature agent continues → merge feature when ready. True parallel delivery.

### Demo Setup (4:00–6:30)

Starting point: vanilla Claude Code-generated fitness tracker app ("Claude Fit"). Generic AI aesthetic — functional but undifferentiated.

Goal: Three worktrees, three different design approaches:
1. **Skills worktree**: Frontend design skill installed → Claude redesigns using skill
2. **Design system worktree**: Reference image from Dribbble (fitness website) → Claude builds design system in `/docs/design/`, then implements
3. **Gemini worktree**: Same project folder opened in Google's IDE → Gemini 3.1 Pro given same brief with instruction to "lean into animations and SVGs"

**Worktree creation command**: `"Please create three git worktrees: one-skills, two-design-system, and three-gemini-3.1-pro"`
→ Claude creates three folders instantly at the same directory level as the main project.

### Running the Agents (6:30–10:00)

**Skills worktree**:
- CD into folder, install skill: `skills.sh` → frontend design skill
- Launch Claude Code
- Prompt: "I need you to redesign this fitness tracker app using your front end design skill. Carefully consider colors and font choices, and even stock images that fit the theme of a fitness tracker app."
- Claude confirms skill will be used → runs

**Design system worktree**:
- Open Dribbble, find fitness website design reference
- Copy reference image, paste into Claude chat
- Create `/docs/design/` subfolder in project
- Prompt: "Please create a complete design system based on the attached image. I need you to match the fonts, the color schemes, the layout, the design, the vibe. Then create a complete design system and store it in the docs/design folder."
- Took longer (design system generation first) but produces reusable artifact

**Gemini worktree**:
- Open worktree folder in Google's IDE (not Claude Code)
- Prompt: "I need you to redesign this fitness tracker app as it's very bland and very AI sloppish. I want you to do your best to correct the font and the colors and the style and the vibe to work with a fitness tracker app. Also lean into your strength of creating animations and SVGs."
- Gemini 3.1 Pro runs independently

### Results Comparison (10:00–13:00)

Dev servers run on different ports: main (3000), skills (also 3000 in its own session), Gemini (3003).

**Skills result**: Bold design, strong fonts, colors, even added stock background image. "Really, really cool looking."

**Gemini result**: Animated heartbeat SVG, hover animations on cards, modern UI. "Really impressive." Host seems most surprised by this output.

**Design system result**: Successfully matched reference image's font and color scheme. Failed to load a hero image (noted as easily fixable). Produced reusable `/docs/design/` system artifact — "really useful" for maintaining design consistency going forward.

**Vanilla** (original Claude output): Compared as baseline. "The kind of AI slop we've all come to love. Not bad, but definitely very generic."

### Merging and Cleanup (13:00–15:30)

**Merging instruction to main Claude instance**:
"Thank you for that. We managed to try out the different approaches and I prefer the work tree with the design system. Please can you merge that into our main project and you can actually delete the other work trees."

**Before merging**: Close all terminal sessions pointing to worktrees being deleted.

**Issue encountered**: Design system worktree had untracked files that blocked deletion. Resolution: "ask Claude just to force remove that folder — that's fine."

**Final state**: Main project now running the design-system variant. Original worktree folders removed. Git history clean.

---

## Notable Quotes

> "Let me know if this sounds like you. You'll ask Claude to make a change and if you don't like it, you ask Claude to back out everything and then try a different approach. And sometimes you actually lose a lot of valuable work along the way. This is slow, frustrating and quite honestly, you're leaving a lot of Claude Code's power on the table." — Leon van Zyl

> "What if I told you you could create multiple versions of your project. You can then point a Claude Code instance to each one and let these agents run in parallel. And they were completely independent. And by the end of the process, you can compare the different results and simply pick your favorite." — Leon van Zyl

> "I know the moment I said Git, a lot of you tensed up. But don't worry, you don't have to be an expert in Git to use Git work trees right away." — Leon van Zyl

> "It's kind of like having multiple universes, where each has a very different take on the exact same project." — Leon van Zyl

> "If you simply copy and paste the folders yourself, you will be in big trouble. Because Git knows exactly what's going on." — Leon van Zyl

> "This looks like the kind of AI slop that we've all come to love. Like it's not bad, but it definitely looks very generic. And like everything else that these AI agents seem to produce." — Leon van Zyl

> "Git work trees is just an absolute must, especially to do side by side comparisons between all these different models." — Leon van Zyl

---

## Application Notes

This video is a developer workflow tutorial, not a direct marketing video. Its primary relevance to the creative OS is **how we orchestrate AI agents** — a meta-layer improvement that multiplies output quality and throughput across Tess, Neco, and any Claude-based creative pipelines.

### For Tess (Scaling)
- **Parallel creative testing infrastructure**: When generating multiple scaling concepts (Thread 1 vs Thread 2 variants, different offer angles), use Git Worktrees to run multiple Claude agents simultaneously rather than iterating sequentially. This is directly applicable to any Tess session generating creative variants.
- **Model comparison workflow**: For high-stakes creative decisions (e.g., VSL structure, landing page design), consider spinning a Gemini worktree alongside Claude to compare outputs before committing to a direction.
- **Scaling hypothesis testing**: When Tess identifies multiple scaling hypotheses simultaneously, worktrees let each hypothesis be developed in parallel — compare outcomes, merge winner into main creative pipeline.
- **Reusable design system output**: The design system worktree produces `/docs/design/` artifacts even if that specific variant isn't chosen — valuable documentation for consistent creative system-building.

### For Neco (Copy)
- **Angle exploration at scale**: When developing copy for multiple creative angles simultaneously (e.g., the SPD 32-angle library), Git Worktrees let separate Claude instances develop each angle independently, then compare for consistency and quality before merging to master.
- **Hook testing without losing work**: Instead of backing out hooks to try alternatives, each hook variation lives in its own worktree. No work is lost; you review all options together.
- **Multi-agent brief generation**: For large brief batches (CLST influencer personas, SF2 variants), distribute across parallel Claude instances in separate worktrees — potentially 3–5x throughput on generation tasks.
- **The "AI slop" problem and its solution**: The video validates that default Claude output is generic. Skills and reference images are the differentiators — this reinforces the value of Neco's context-gathering, audience language, and reference system.

---

## Raw Transcript

<details>
<summary>Full transcript (2823 words) — click to expand</summary>

Let me know if this sounds like you.
You'll ask Tor to make a
change and if you don't like it,
you ask Tor to back out everything and
then try a different
approach. And sometimes you
actually lose a lot of valuable work
along the way. This is slow,
frustrating and quite honestly,
you're leaving a lot of Claude Code's
power on the table. Instead,
what if I told you you could
create multiple versions of your project.
You can then point a
Claude Code instance to each one
and let these agents run in parallel. And
they were completely
independent. And by the end of
the process, you can compare the
different results and simply pick your
favorite. This is exactly
what Git work trees with Claude Code
allow you to do. And I know the moment I
said Git, a lot of you
tensed up. But don't worry, you don't
have to be an expert in Git to use Git
work trees right away.
And by the end of this video, you'll be
running multiple Claude
Code instances in parallel like
nothing. So to demonstrate how this
works, I'm going to ask Claude Code to
create a landing page
for a fitness tracker app. Now I haven't
provided any MCP servers or
skills or nothing special.
I'm simply asking Claude to create a very
simple fitness tracker app.
And that's it. And the app
is called Claude Fit. And it can come up
with its own copy, you stock images,
whatever it wants. So
in this instance, we're simply relying on
the training data on
Claude to produce this output.
Alright, so while Claude is cooking,
let's actually try and
explain what's happening here.
Alright, so by default, we have our main
branch in our project. And
then we have a Claude Code
session that's connected to this main
project folder. Now what if
we wanted to create different
variants of a solution to kind of see
which one would work best for our
business requirements.
As a simple example, let's say we wanted
to redesign the
application, the UI, but we don't
really know which type of design we want
to go with. We want to see the
application or we want
to see the design in action, and maybe
even compare them side by side before
making a choice. Now that
is impossible with a solution like this,
because we can only have one
project active at any point
in time. So yes, we could ask Claude to
change the UI on main, but in order for
us to try a different
look and feel, we'll have to back out
these changes, and then
get Claude to change the UI
to a different style, review the changes,
back it out, etc. Of
course, we could simply create
different branches. So we could have a
main branch, or we could
create a second branch for,
so this one could be, I don't know,
purple, we could create a different
branch with a color like
red, I don't know, so we could try
different styles. But the
problem is, you can only have
one active branch at any point in time.
So you kind of have to
tell Claude, all right,
you should no longer point to main, you
now need to point to
purple, or now need to point to
red. So Claude can only work on a single
branch at any point in
time, and we will not be able to
compare these side by side. We have to
manually switch between them,
and that's really not ideal.
Where work trees is very different. So
yes, we'll have a Claude
instance that's pointing at our
main project. But what we can also do is
create work trees. So
let's call this work tree one.
And this is actually a replica of our
project folder. So this
really is a copy of the project
folder on our file system. But there's a
lot more to it than simply
copying and pasting the folder.
This main branch is aware of all of the
work trees that it's
linked to. So we could have work
tree one, we could have work tree two,
and maybe even a third variant. And our
main branch is linked
to all three of these. Now because each
of these work trees are
independent project folders,
each of these can have their very own
Claude code instance running.
So each of these Claude code
instances can be working on a work tree
without affecting any of
the other work trees. In our
example, to be able to really visualize
this, we're going to ask Claude to
implement a different UI
pattern for each of the different work
trees. But in reality, you can do a lot
more with work trees
than simply comparing different variants.
Let's say that you want
Claude to work on a massive
feature in one work tree. And maybe
Claude can work on a bug in another work
tree. So once Claude
has implemented the bug fix in this work
tree, we can simply merge
these changes back into main.
And this work tree is unaffected. And
this agent continues working. Anyway,
let's dive into it. I
think it will make a lot of sense once we
start playing with this. So
at the moment, we've got a
super vanilla design for our fitness
tracker app. This looks like the kind of
AI slot that we've all
come to love. Like it's not bad, but it
definitely looks very generic. And like
everything else that
these AI agents seem to produce. So let's
say we wanted to try out different
techniques to see if
we can get an even better design. So what
we're going to do is create
separate work trees for work
tree one, we're going to assign a skill.
So we'll assign a front end
design skill to Claude code to
see how it improves this design for work
tree two, we'll create a
design system instead. So we will
not rely on the skill will provide a
reference image to see if we can match
that reference design.
And of course, we can get as creative and
experimental as we
want. But for work tree
three, I think we should get really
creative. Let's not use Claude for this
one. And let's use Gemini
3.1 Pro, which was just released today.
So that way we can compare
different designs, different
techniques, and even different models.
I'm telling you now get
work trees is an absolute must,
especially to do side by side comparisons
between all these different
models. So with that said,
I'm just going to clear our conversation.
And at the moment, you will
notice I only have one sub
folder. And this is for this fitness
tracker app. And this is our main
project. In Claude code,
I'm going to say the following, please
create three get work trees
one skills to design system,
and three Gemini 3.1 Pro. Let's run this.
If you're a developer, you
can definitely just run the get
commands. But I really wanted to show the
easiest way to get this
going. Now watch this, Claude just
created three new folders, and they are
at the same level as the
main project. And if I zoom in
a bit, you can see the names. So we've
got fitness tracker skills, fitness
tracker Gemini, and fitness
tracker design system. These are full
replicas of the original
project. And you can see this in the
file system as well. So this really means
you can treat each of these
folders like a separate project,
or you can open up your terminal in those
folders and run Claude
code. So let's start with the
first one with skills. Since this is a
separate project folder,
I'm actually going to CD into
fitness tracker and skills, I'm actually
just going to rename this
one to skills. Cool. In this
folder, I'm going to run Claude code. But
now this Claude code instance
is pointing to the skills work
tree. In fact, before I run Claude code,
let's install the front in
design skill. So let's go
to skills.sh, then let's go to front end
design skill. Let's copy
this command. Let's run it in
the terminal in the skills folder, by the
way, also like Claude code.
And that should be it. Cool.
Now let's start Claude. If we have a look
at our skills, this agent
has access to the front end
design skill. Perfect. So let's say, Hey,
I need you to redesign
this fitness tracker app using
your front end design skill carefully,
consider colors and font
choices, and even stock images
that fit the theme of a fitness tracker
app. And let's send this. I
just want to make sure that
it is going to use the skill, which it
does. All right, cool. So this
variant is currently running.
I'm going to open up another session.
This one I'll rename to
design system, then it's also CD
into the correct folder design system.
And we can just bring up
Claude code. Now this Claude code
instance does not have any skills
assigned to it, just the fine skills
skill, which we will not use.
And instead, what we'll do is we'll go to
a website like dribble, and let's look
for fitness website.
And let's look for something that we
like. So maybe we can go
with something like this. Then
this is a really clean design. So I'm
actually going to copy this
image, I'll paste it into the
chat. And it's a actually in this design
system folder, I'm just
going to create a new subfolder
called docs. And in that I'll just create
another folder called
design. And I'll put it into this
conversation. And it's a please create a
complete design system based on the
attached image. So I
need you to match the fonts, the color
schemes, the layout, the
design, the vibe, then create a
complete design system and store it in
the docs slash design
folder. And then while these are
running, let's actually look at the
Gemini 3.1 Pro example. So for that,
we're not going to use
Claude code. And instead, I'm going to
use Google's anti gravity IDE. So I'm
just going to open up that
specific work tree folder. Awesome. And
then let's see how good
Gemini 3.1 Pro is with UI designs.
Hey, I need you to redesign this fitness
tracker app, as it's very
bland and very AI sloppish.
I want you to do your best to correct the
font and the colors and the
style and the vibe to work
with a fitness tracker app. Also lean
into your strength of creating
animations and SVGs. And nice,
that seems to be cooking. So now we have
three agents working in
parallel on the same code base.
It's kind of like having multiple
universes, where each has a very
different take on the
exact same project. And by the end of
this, we'll select our favorite design
and merge it back into
our main project. Git knows exactly what
work trees exist, and what the
relationship between the main
branch and those work trees are. In fact,
if I go to source control, we
can see all of our work trees
in here, along with the changes per work
tree. And if you simply
copy it and paste it to folders
yourself, you will be in big trouble.
Because Git knows exactly what's going
on, we can simply tell
Git that we prefer the changes in this
work tree. So please merge the changes
into our master branch,
and we'll be able to deal with conflicts
and everything else. It
just works. And here we go.
So the agents just completed their work.
So let's start with the
skills agent. I'm just going to
ask it, please can you run the dev server
for me. And if I go to this
background job, you can see
that our app is running on port 3000. And
this is what code code with
the design skill produced.
And I must say, I think this looks really
cool. I do like the
font, I do like the colors,
everything is like bold and in your face.
It's just really, really
cool looking. It even added
a bit of a stock image in the background.
So definitely not a bad
start to a fitness tracker
application. But the design system is
still busy, as it took a bit longer
because it first had to
create the actual design system. So in
the folder, I could just show you in the
docs folder, we have
a proper design system that we can use
going forward. So this is
really useful. As we're working
on the app, we can just ask the agent to
reference this design folder
to ensure that the design and
everything is consistent. But it seems
like the agent is almost
done. So it's not that bad. And
I can see that Gemini 3.1 Pro is done as
well. It's actually
running the app on port 3003. So
let's actually have a look at that so
long. And this is what
Gemini came up with. I really like
this animation on the side. This looks
awesome with a little heartbeat and the
animations. This is so,
so cool. And look at these little
animations when I hover over
these texts. These cards look
really cool as well. I'm actually
impressed. This is really, really cool.
And now the design system
agent is done as well. So let's have a
look at this one. And just
as a reminder, we asked the
agent to try and replicate this kind of
design. So this look and feel. And I
think for the most part,
it kind of achieved it. It looks like the
same fonts. It's the same
kind of color scheme. So not
bad at all. It did fail to upload a Euro
image, but I mean, we can
resolve that easily enough.
So yes, this is also not bad at all. It's
very, very hard to decide.
So which one would you go for?
I would be really curious to know. Just
let me know in the comments,
which out of these four would
you prefer? This was Claude Cote's
Vanilla design. This was with the front
end design skill. Then we
have this design from Gemini 3.1 Pro. And
finally, this was Claude Cote with a
reference image and a
design system. So for argument's sake,
let's say that I actually
preferred this version. So how
did we now tell our project that this is
the design we want to go with? And it can
actually just discard
the rest of the results. Well, what we
can do is just go back to
our initial Claude instance.
So this one knows exactly what all the
work trees were. So now we
can tell it, thank you for that.
We managed to try out the different
approaches and I prefer the work tree
with the design system.
Please can you merge that into our main
project and you can actually
delete the other work trees.
What I do recommend you do at this point
is to simply close out all those
terminals referencing
those work trees. So I'll remove this one
as well, as well as the
design system. All we really care
about now is our main branch. Let's send
this. And what we'll notice in a second
is that all of these
new folders, these work tree folders,
will be removed and the new
design will be merged into
our main project. All right, so let's
remove some of these folders, but it's
struggled to remove the
design system folder. And I think that's
because there are these
untracked files in there. But we
can definitely ask Claude just to force
remove that folder. That's
fine as well. The important thing
is that we go into our main fitness
tracker app, we can run dev and now our
main app running on port
3000 has that new design. How cool is
that? Good work trees is just one of the
many advanced topics
that we discuss in my community called
Agenteclabs. This is a vibrant community
of people who like to
build solutions using Claude code, NADN
and many other AI solutions. We've got
classrooms with
structured videos to help you take your
Agente coding or vibe
coding skills to the next level.
So consider joining it's only $7 a month
for the first 1000
members. I hope to see you there.
Then YouTube things will enjoy this other
video. So click on
the card on the screen.
I'll see you in the next one. Bye bye.

</details>
