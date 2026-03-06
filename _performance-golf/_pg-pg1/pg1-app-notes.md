Brixton’s observations of current app (3 minute video)
MAKING A CLEAR NEXT STEP IN THE App
–Broken down below by
Homescreen
Training Tab
Practicing Challenges
Play Mode (GPS/On course)

Other items I’d like us to add to our roadmap  
Here’s the demo I’m showing to celebs (4 mins)
Based on this doc below and making a CLEAR next step how SwingScan fits in
–how it integrates into onboarding as - optional but do this for smarter recommendations
–Where it lives in flow
–How it’s built into the practice mode loop and how we use swingscan to take someone from watching a video to going to the course in 2 days to use swingscan (just as outlined below we have this gap in time here - how do we make this simple/clear and part of the plan
Understanding their learning style (VISUAL, Mechanical/analytical, Feel, Not sure)  - and adopting video  path to this
Making a plan for them BASED ON HOW MUCH time they have - the path adapting
SwingScan phase 3 - analyzing body type to make better recommendations
Additional Notes (Brixton’s slack video Friday evening 1/30)
One internal rule to align everyone
You can share this verbatim:
PG should never ask users to figure out what to do next. It should recommend the smartest next step, then let them override it if they choose.
Why this works
Reduces cognitive load


Increases practice adoption


Prevents video binging


Makes coaching feel natural


Builds a habit, not just engagement


THE CORE FIX (big picture)
Right now the app feels like:
“Here are the things you can do.”
You want it to feel like:
“Here is what we’re doing together.”
That requires:
One active focus


One active plan


One recommended next action at all times


Everything else becomes secondary.



#1 HOMESCREEN
High-level verdict on your current Home
Your instincts were right:
The top nav (Practice | Play | My Journey) is good and should stay


The app already has everything it needs on Home


The problem is priority stacking, not feature sprawl


Right now, Home feels like:
“Here’s everything you can do.”
You want it to feel like:
“Here’s what we’re doing today.”
That’s solvable purely through hierarchy.

What absolutely stays (no debate)
Lock these in:
Top navigation pills
 Practice | Play | My Journey
 These are fine. They do not confuse users.


Focus concept
 “My Priority: Fairway Woods”
 This is good. It anchors intent.


Coach access exists on Home
 This is a differentiator. We just move it.


Game trends on Home
 Valuable, but informational, not directional.


Nothing here needs to be removed.

What needs to change (this is the key)
The problem area
Your current hero area is doing two jobs at once:
Showing what the focus is


Suggesting what to do next


That ambiguity is where confusion creeps in.

The fix: split “Focus” from “Next Step”
1. Keep Focus, but make it lighter
Current:
My Priority: Fairway Woods
 Large video card
Change to:
Your Focus
 Fairway Woods (with edit icon)
This should be a status indicator, not a CTA.

2. Insert a dominant “Your Next Step” block
This becomes the hero of the Home screen.
Immediately below Focus:
Your Next Step
 Step 1 of 3
 Watch: Fix Fat Fairway Woods
 4 minutes
Primary CTA (only strong CTA on the screen):
 Watch Now
This replaces the current “Up Next” video treatment as the dominant action.
Important rule:
 This block should visually overpower everything else on Home.

3. Demote the video carousel from “hero” to “queued”
The horizontal video card you have now should move into a Coming Up section.
Example:
Coming Up
Practice: Low Point Drill


Challenge: Putting Becoming Clutch


Short Game: Fat Chip Fix


These can stay tappable, but visually muted.
This tells the user:
 “These are coming, not required right now.”

Where everything else should live (this answers your question directly)
You asked:
Should some of this live at the bottom of the page?
Yes. And here’s exactly how.

4. Coach card moves lower and becomes contextual support
Your current:
 “Want to improve faster? Get started with your coach”
This is good copy, wrong position.
Move it below Coming Up and above Game Trends.
Rename section header to:
 Support
This reframes coaching as help, not a competing action.

5. Game Trends stay, but are informational only
Your trends block is solid.
It should:
Stay below coach


Never compete with “Next Step”


Act as reflection, not direction


The “Score a Round” button is fine because it maps to Play, not Training.

6. “Recently Viewed” and “Drive Your Game Forward”
These are the lowest priority on Home.
They should stay, but clearly be:
For returning users


For exploration


For power users


Think of these as “extras,” not flow drivers.

Final Phase 1 Home Layout (lock this)
Here’s the exact scroll order I’d recommend:
Top Nav: Practice | Play | My Journey


Your Focus: Fairway Woods (edit icon)


Your Next Step (dominant block)


Step X of Y


Watch video


Watch Now CTA


Coming Up (muted queue)


Practice


Challenge


Short game


Support


Chat with your coach


Your Game Trends


Recently Viewed


Drive Your Game Forward


Set Reminder



The rule that makes Phase 1 work
You can share this internally verbatim:
Home should only have one job: tell the golfer what to do next. Everything else exists to support that decision, not compete with it.
If you implement just this Phase 1 change, you’ll already:
Reduce cognitive load


Increase video starts


Increase practice adoption


Make the app feel coached, not crowded



Phase 1 status
I would call Phase 1 90 percent locked pending one thing:
Do you want the “Your Next Step” block to replace the large video card entirely, or sit above it?
Answer that, and we’ll lock Phase 1 and move cleanly into Phase 2: Video experience and diagnosis.








Something more like this (FROM A DESIGN PERSPECTIVE)

For the first VIDEO at the end of video moment (this is critical)
Timing
Do not wait until the video fully ends and goes to black.
 That feels abrupt.
Instead:
When the video hits the final 5–7 seconds


Fade in the question gently over the video


The coach is finishing their thought.
 The app is already preparing the next step.

How the end-of-video question appears (non-modal)
This is the biggest mistake most apps make.
 You do not want a hard modal.
The right pattern: soft bottom sheet
The video stays visible in the background, slightly dimmed.
A rounded bottom panel slides up about 25–30 percent of the screen.
It feels like the coach leaning in, not a system interrupting.

The exact question and layout
Copy (keep it simple and human)
Did this video help you feel the fix?
Two buttons only:
Yes, I felt it


Not really

What happens after they answer (transition logic)
If they tap “Yes, I felt it”
The bottom sheet morphs, it does not disappear and reappear.
New copy fades in:
Nice. What do you want to do next?
Options, stacked vertically:
Primary:
Go practice this now at the course
Subtext: I’ll show you the exact drill
Secondary:
Watch one more video on fixing X (MISS)
Subtext: Reinforce the feel
Tertiary:
Move to next opportunity in my game
Key detail:
No new screen yet
No jarring transition
Same panel, same context

If they tap “Not really”
Same panel, new copy:
No worries. Sometimes you just need a different way to feel it so it clicks.
Options:
Primary:
Watch a different feel to fix X issue
Subtext: Same fix, different feel
Secondary:
See your 2 minute practice drill
Subtext: Some things click in motion
Tertiary:
Chat with a coach
Subtext: Get personal help
Tone matters here. This feels supportive, not corrective.

How the transition happens after they choose
This is important for “modal fatigue”
When they tap any option:
The bottom sheet slides down
The screen transitions naturally into the chosen experience
Examples:
Practice opens immediately
Next video auto loads
Coach chat opens in context
No confirmation screens.
No “Are you sure?”
The decision is the confirmation.

Why this does not feel modal-heavy
Three reasons:
The video never fully disappears until a decision is made
The same panel adapts instead of stacking modals
The language is conversational, not system-driven
It feels like:
“The coach asking a question at the end of the lesson”
Not:
“The app interrupting your flow”

Design rules to give your team
You can share this internally verbatim:
Video opens immediately, full screen
No choices during playback
End-of-video uses a soft bottom panel, not a hard modal
The question is about confidence, not navigation
The panel adapts based on the answer
Transitions are morphs, not jumps

With this flow:
You eliminate dead ends
You personalize without complexity
You preserve momentum
You set up Phase 3 and 4 cleanly



TAKING GOLFERS FROM WATCHING VIDEOS TO KNOWING EXACTLY WHAT TO DO AT THE COURSE (SOLVING THIS DISCONNECT - since a golfer might watch videos then practice 2-3 days later)

Right now your system works well within a session, but golfers don’t improve in one session. They improve across days.
So I’m going to do three things:
Name the exact disconnect in plain language


Propose a time-aware bridge from video → course (this is the fix)


Lay out a clean sequential flow you can hand to the team for this phase


No redesign hand-waving. This is behavioral design.

The real disconnect (what’s actually happening)
Here’s the actual user reality, stripped down:
Day 1: User watches videos at home or on the couch


Day 2 or 3: User goes to the range or course


In between: Nothing is holding the intent in place


So when they arrive at the course:
They vaguely remember the video


They are not 100 percent sure what to do first


The challenge exists, but it doesn’t feel activated yet


That gap is where confidence leaks.
Your challenge flow itself is good. The handoff into it is what’s missing.

The fix: introduce a “Practice Intent” state
You need one conceptual layer between learning and doing.
Call it internally:
 “Practice Intent” or “Next Time You Play”
This is not a new feature. It’s a framing layer.

What should happen right after videos (Day 1)
When a user finishes videos and chooses “Yes, I felt it” or even “Not really”, the app should lock in intent for the future, not just the moment.
New explicit step after video
After the video decision tree, add a simple confirmation moment:
“Next time you’re at the course, here’s what we’ll work on.”
Show:
One drill


One challenge


One goal


Example:
Next time you play or practice
 Tee-First Contact Drill
 5 swings before your round
Primary CTA:
 Save this for my next session
Secondary:
 Practice now
This does two critical things:
It bridges time


It reduces cognitive load later


Now the app has permission to remind and resurface.

What happens between Day 1 and Day 2
This is where habit gets built.
Light-touch reinforcement (not spam)
Depending on your notification strategy:
“Your Fairway Woods drill is ready for your next round”


Or an in-app Home reminder


But the key is:
 The drill is already chosen. The decision is gone.

What Home should look like on Day 2 (this is huge)
When the user opens the app at the course or range, Home should not look the same as Day 1.
It should say:
Your Next Step
Ready to practice your Fairway Woods fix?
Primary CTA:
 Start your drill
Secondary:
 Review the video
This is how you collapse the gap between learning and execution.

The challenge flow itself (what you showed)
The flow you shared:
Click challenge


See challenge


Explanation screen


Simple tracker


This is good. Don’t overthink this part.
What’s missing is contextual framing around it.

How to frame the challenge once they start it
When they tap “Start Challenge”, add one line at the top:
This is the drill you saved for your next session
That one sentence reconnects:
The video


The intent


The action


Now the challenge feels purposeful, not random.

During the tracker phase (when they struggle or succeed)
You already have the tracker UI. Now layer intelligence on top.
While tracking
If they struggle (for example 0 or 1 of 5):
Surface a soft option:
“Want to quickly rewatch the key feel?”


Do not force it. Offer it.
If they do well (3 to 5 of 5):
Affirm and redirect:
“Nice. This is ready for the course.”


Then suggest:
Repeat once


Or move to short game challenge



After finishing the challenge (this is another gap today)
Right now, “Finish Session” ends the experience.
Instead, it should transition.
Post-challenge summary
Show:
Result


Meaning


Next suggestion


Example:
You went 3 for 5
 That’s solid contact control.
Primary CTA:
 Use this on the course
Secondary:
 Repeat drill
 Review video
This keeps the loop alive.

How this all fits together sequentially
Here’s the clean, human flow across days:
Day 1 (Learning)
Watch video


Answer “Did this help?”


Choose next step


Save drill for next session


Between sessions
App remembers the drill


Home and reminders reinforce intent


Day 2 (At course or range)
Home says “Ready to practice?”


Start challenge


Simple explanation


Track reps


During practice
Offer quick help if stuck


Reinforce if successful


After practice
Summarize


Suggest repeat, apply, or move on


Day 3+
Play


App reflects performance


Loop restarts with confidence



The single sentence to give your team
You can share this internally verbatim:
We’re not trying to get users to practice immediately. We’re trying to help them remember exactly what to do the next time they practice.
That’s the mindset shift.

TRANSITION CONTINUED - from someone watching videos at home to going to the course to practice

The pattern to use
After the video decision moment, show this as a dedicated screen or panel:
“Here’s your next step.”
Content:
One drill
One challenge
One clear goal
Example:
Next time you’re at the course
Tee First Contact Drill
5 swings before your round
Primary CTA:
Save this for my next session
Secondary option:
Change this
Optional tertiary:
Practice now
Why this works
It assumes progress without forcing it
It makes the plan explicit and memorable
It removes decision making later
It still respects autonomy
The key is that Save is the default recommendation, not a silent background action.

What happens if they do nothing
If they back out or swipe away:
The system still saves it
Home reflects it later
They can override at any time
This is coach behavior, not app behavior.

One internal rule for your team
You can give them this line:
The app should always set a plan, even if the golfer doesn’t explicitly choose one.
That solves the time gap you were worried about.

Part 2: How this ties into challenges as “games within the game”
Now let’s talk about challenges, because this is where habit and identity get built.
You’re right. Challenges are the core loop, not a side feature.

The structure you want
Every golfer should always have:
1 ball striking challenge
This is personalized based on their miss.
1 universal putting challenge
Same for everyone.
1 universal chipping challenge
Same for everyone.
That consistency is a feature, not a limitation.

How challenges should be framed mentally
Not:
“Here are some drills”
But:
“This is how you warm up”
“This is how you keep score against yourself”
“This is part of your routine”
You’re building rituals.

How to present challenges on course days
When the user opens the app at the course, Home should say something like:
Your Course Routine
Fairway Woods Challenge
Putting Challenge
Chipping Challenge
One of these is marked:
Primary focus today
That primary focus is the saved plan from the video.

How challenges become games, not tasks
Each challenge should have:
A clear target
A personal best
A streak or completion count
Example:
Best: 4 of 5
Today: 3 of 5
Streak: 2 sessions completed
Now the competition is internal and continuous.

How to avoid overwhelm
Important rule:
On a given day, only one challenge is framed as “must do.”
The others are:
“If you have time”
“Optional add ons”
“Part of your routine”
This keeps the core loop tight.

How to loop back into learning if they struggle
This is where your system gets smart.
If a golfer:
Fails the ball striking challenge repeatedly
Then after completion, surface this:
Want a different way to feel this?
Options:
Watch a quick clarifier video
Ask your coach
Try again next time
No punishment. Just adaptation.

The full loop, simplified
Here’s the behavior you’re training:
Learn the fix
Save the plan for next time
Execute one focused challenge
Compete against yourself
Add putting and chipping as rituals
Reflect
Adjust or advance
That’s the habit.

Final recommendation summary
Use a smart default save, not a hard requirement
Make the saved plan visible and explicit
Treat challenges as routines, not options
Personalize ball striking, standardize short game
Let struggle naturally route back to learning or coaching












PLAYING GOLF on COURSE MODE (SECTION OF THE APP)
 AS FEEDBACK, NOT JUST TRACKING
Play experience
Let them play. Do not coach mid round.
Post-round reflection
This is where the loop closes.
Example:
We noticed 5 shots today came from fat contact.
 This matches what you’re working on.
Primary CTA:
 Resume your current plan
Secondary:
 Change focus
The system connects dots for them.

COACH INTEGRATION (HUMAN LAYER)
The coach should feel available, not forced.
Coach touchpoints live in three places:
After “Not really” on a video


After stalled practice progress


As a proactive monthly invite


Coach actions
Send swing video


Chat question


Join monthly live


Coach feedback should feed back into:
Updated focus


Updated drills


Updated plan


The app and coach reinforce each other.





GETTING GOLFERS TO HAVE A clear plan each time they go to the course (WORKING SECTION)
1. Course Routine Screen (this is the bridge screen)
This screen answers one question only:
“What should I do today at the course?”
It should appear when:
They open the app near the course


They tap “Start Practice”


They’ve saved a plan from a video



Course Routine Screen: Structure
Header
Your Course Routine
 Today’s focus: Fairway Woods
Optional subtle line:
10–15 minutes total
This immediately frames it as doable.

Section 1: Primary Challenge (dominant)
This is the one thing that matters today.
Card (largest, first)
Fairway Woods Challenge
 Tee-First Contact Drill
 Target: 5 swings
Micro context line:
This is the drill you saved from your last lesson
Primary CTA:
 Start Challenge
Secondary text link:
 Review the video
Visual treatment:
Bold border or accent


“Primary” or “Focus” badge



Section 2: Short Game Routine (secondary)
These should feel like rituals, not homework.
Putting Challenge
 Becoming Clutch
 Target: 10 putts
Chipping Challenge
 Fat Chip Correction
 Target: 5 reps
Each has:
Small “Start” button


No urgency language


No bright accent color


Header copy:
Optional if you have time
This avoids overwhelm while still encouraging repetition.

Section 3: Progress Snapshot (very small)
At the bottom:
You’ve completed your routine 3 times this month
No charts. No fireworks.
Just quiet reinforcement.

2. How streaks and personal bests should show up
This is where most apps mess it up. You want identity reinforcement, not dopamine spam.

The rule for streaks
Streaks should:
Be personal


Be quiet


Never punish missed days


You are not Duolingo. Golf is weather, life, and weekends.

What a streak actually means in PG
A streak is:
“How often do you show up when you play?”
Not:
“Did you do this every day?”

How streaks appear on the challenge card
On each challenge card, show one line only:
Example for Fairway Woods:
Best: 4 / 5
 Last session: 3 / 5
That’s it.
No flames. No emojis. No streak shaming.
Optional small badge:
Completed 3 of last 4 sessions
This subtly encourages consistency without pressure.

Where streaks reset (important)
Streaks reset when:
The user changes focus


The drill changes


The coach updates the plan


This reinforces that streaks are tied to working on the right thing, not grinding.

How to use streaks to guide behavior
After a challenge:
If improving:
You’re trending up. Keep this in your routine.
If flat or struggling:
Want a different feel or a quick coach check?
Streaks become diagnostic, not competitive.

How this avoids “gamification cheese”
You avoid:
Leaderboards


Daily punishments


Arbitrary XP


You keep:
Personal benchmarks


Quiet progress signals


Routine identity


The golfer feels:
“This is my process.”
Not:
“I’m playing a game.”

How this ties cleanly back into the loop
Video sets the plan


Course Routine reminds them


Challenge executes it


Streaks reinforce identity


Struggle routes back to learning or coaching


Nothing feels bolted on.

One line you can give your team
You can paste this internally:
The Course Routine screen is not a menu. It’s a checklist for today, with one priority and two optional rituals.







SOME OUTSTANDING ITEMS
How to make the recommender clear - use this to talk to me to get led to the perfect place. This NEEDS to feel easy to access

My Journey tab a bit confusing




The Smart Entry Screen (Final UI Concept)
This is what the screen should look like structurally when they open the app.

SECTION 1 — Recommendation (Coach Voice)
Large. Clean. Dominant.

Your Smart Next Step
Improve Fairway Woods Contact (Challenge)
 5-Swing Low Point Drill
 2 minutes

ALT: Display Personal Program 
Primary Button:
 Start Now
Small secondary text:
 Change focus
That’s it.
No clutter. No alternatives yet.
This is what the system believes is the highest leverage action.

SECTION 2 — Context Question (User Voice)
Immediately below:

What are you doing right now?
ALT: What do you want to do today?
Three large buttons:
🎥 Learn
🎯 Practice
⛳ Play
 
No explanation. No paragraph.
Just action.

What Happens When They Tap Each Option
This is where intelligence kicks in.

If They Tap 🎯 Practice
The recommendation block updates instantly.
Instead of generic:
It becomes:
Today’s Practice Plan
Fairway Woods (Challenge)
 Tee-First Contact Drill 
 Target: 5 clean strikes
Primary CTA:
 Start Drill
Now the recommendation is tailored to practice context.

If They Tap ⛳ Play
The block changes to:
Today’s On-Course Focus
Key Feel: Low point forward
 Focus on 3 Fairway Wood shots today
ALT: Display Nearest Course or Entry to GPS
Primary CTA:
 Start Round (GPS)
Small line:
 Quick refresher video (optional)
Now it feels like preparation, not practice.

If They Tap 🎥 Learn
The block becomes:
Continue Your Lesson (Personal Program)
Watch: Fix Fat Fairway Woods
 4 minutes
Primary CTA:
 Watch Video
Now Learn becomes primary.

Why This Works
You are separating:
System priority
 From
 User situation
The recommendation flexes based on intent.
But it always stays singular.

Copy Upgrade (You Asked for Better Language)
Instead of:
“Suggested Next Step”
Use something stronger and coach-like.
Options that fit your brand:
• Your Smartest Move Today
 • Your Game Plan







The Secret
You’re not trying to get them to consume more.
You’re trying to get them to progress.
Content is the tool.
 Progression is the engine.
The Big Psychological Lever
People stay engaged when:
They feel forward motion.
Right now your app feels cyclical.
It needs to feel linear with checkpoints.

The Core Problem
Golfers say:
“I want more distance.”
 “I slice it.”
 “I chunk my irons.”
You give them:
A video.
But a video does not create habit.
The moment that determines retention is not the video.
It’s what happens in the 30 seconds after the video ends.
That’s where the bridge must be airtight.

The Bridge Must Do 3 Things
After a video ends, the app must:
Confirm understanding


Convert to action


Schedule the action


Not offer more content immediately.

The Clean Flow You Need
Let’s map the exact sequence.

Step 1 — Watch Video
They watch “Fix Your Slice.”
When the video ends:
Don’t say:
 “Watch another video.”
Instead ask:
Did that make sense?
Options:
Yes, I feel it


Not really


That’s it.

If they say “Yes, I feel it”
Now immediately convert to action.
Screen says:
Good. Let’s lock this in.
Next time you’re at the course, run this 2-minute warm-up.
Show:
2-Minute Face Control Drill
 5 swings
 Goal: Start ball slightly right
Primary CTA:
 Save for next session
Secondary:
 Do it now
This is the habit bridge.

If they say “Not really”
Don’t send them to content library.
Show:
Sometimes a different feel helps.
Options:
Watch alternative explanation


Ask coach


Try drill anyway


This keeps them in motion.

Step 2 — The Practice Moment
When they come back to the app at the course:
The entry screen says:
Your Next Move
 2-Minute Course Warm-Up
 Fix Your Slice
Primary:
 Start Warm-Up
This removes decision making.

Step 3 — After Practice
This is where the win must happen.
After they log reps:
Instead of just “Finish Session”:
Show:
You hit 4 of 5 clean.
 
Now improvement feels causal.
Primary:
 Apply this today
Secondary:
 Repeat

Step 4 — After Round
Now close the loop.
If they logged fewer slices:
You reduced right misses from 5 to 2.
 Estimated strokes saved: 1.1
Now they believe the system works.
This belief is the retention engine.

The Two Problems You Mentioned
Let’s isolate them clearly.

Problem 1: Getting them from video → practice
Solution:
 You must never let a video end without a drill attached.
Every video ends in:
Here’s your 2-minute version.
Not:
 Here are more videos.

Problem 2: Showing wins
Wins must be:
Immediate
 Measurable
 Connected to strokes
Types of wins:
• Drill improvement
 • Reduced miss count
 • Routine consistency
 • Stroke estimate reduction
You don’t need confetti.
 You need causality.

The Key UI Principle
Your homepage must not be a menu.
It must be a moving walkway.
Always one recommendation.
Always the next smallest step.
Never three equal options fighting.

The Habit Formula
Small action
 Clear result
 Visible progress
 Forward momentum
Repeated.

What You’re Actually Building
You’re building:
A structured improvement path.
Not a content app.
Not a drill library.
A guided system.

The Final Mental Model
Video teaches.
Drill locks it in.
Round tests it.
Score confirms it.
System advances it.
That’s the loop.

