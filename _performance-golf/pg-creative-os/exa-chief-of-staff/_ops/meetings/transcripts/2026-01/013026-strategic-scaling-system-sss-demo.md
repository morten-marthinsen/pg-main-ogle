# Strategic Scaling System (SSS) Demo - 01/30/2026

**Date:** January 30, 2026
**Source:** ClickUp AI Notetaker

---

**Attendees:** Sam Mercado, Donnie French, Russell Der, Gabe Medeiros, Fatima Cantos, Liv Galloway, Chris Hibbert, Morten Marthinsen, John Hardesty, Christopher Ogle
*   \+ 2 more
    
    Chris Fleeks, Jessie Rodriguez
    

[https://t9014714949.p.clickup-attachments.com/t9014714949/9d42d553-9a91-4049-8b59-b28ea3115323/9d42d553-9a91-4049-8b59-b28ea3115323.mp4?view=open&filename=Strategic%20Scaling%20System%20%5BSSS%5D%20Demo%20-%2001-30-2026.mp4](https://t9014714949.p.clickup-attachments.com/t9014714949/9d42d553-9a91-4049-8b59-b28ea3115323/9d42d553-9a91-4049-8b59-b28ea3115323.mp4?view=open&filename=Strategic%20Scaling%20System%20%5BSSS%5D%20Demo%20-%2001-30-2026.mp4)
### Overview

The meeting focused on demonstrating and discussing the future state of the Strategic Scaling System and the improvements enabled by a new naming convention. The discussion highlighted how aligning on updated ad naming standards will enhance data insights, streamline integrations, and support more effective media buying decisions.

### Key Takeaways

*   The team decided to adopt a new naming convention that adds ad category, expansion type, and asset type to improve data accuracy.
*   They agreed to hold a follow-up call early next week to align on the updated naming convention and ensure all parties are informed.
*   The group decided to update documentation and internal spreadsheets to incorporate new ad performance classification metrics.
*   It was agreed that resolving API integration issues—especially for pulling accurate revenue data from Facebook—is a priority.
*   The team planned to consolidate data storage by integrating data flows into ClickUp and phasing out redundant spreadsheets.
*   A plan was discussed to refine funnel-specific performance thresholds to ensure accurate ad categorization across different products.

### Next Steps

- [ ] [@Christopher Ogle](#user_mention#88456385): Host a follow-up call on the new naming convention to align the team.
- [ ] [@Christopher Ogle](#user_mention#88456385): Update internal documentation and the naming convention spreadsheet with the new ad performance metrics.
- [ ] **To be Assigned**: Resolve the Facebook API integration issues to correctly import revenue data.
- [ ] [@Christopher Ogle](#user_mention#88456385): Coordinate with Fatima + Fleeks + Liv to consolidate data storage and phase out redundant spreadsheets.
- [ ] **To be Assigned**: Finalize and update funnel-specific performance thresholds in the Strategic Scaling System.
### Key Topics
*   **Future State Demonstration & New Naming Convention** Update
    *   Christopher Ogle presented a demonstration of the future state of the Strategic Scaling System using demo data that operates on a new naming convention.
    *   He contrasted the current state (with the old naming convention) and the future state, highlighting how the new naming convention would allow Tess (the data agent) to pull in more detailed asset information.
    *   It was explained that the new naming convention includes additional details such as ad category, expansion type, and asset type, which are missing in the current naming convention.
    *   Participants were informed that alignment on the new naming convention is critical for the system’s success and will be discussed in a dedicated call next week.
    
*   **Data Flow and Integration Challenges** Problem
    *   The demonstration showed how data is currently being pulled using Domo CSV sheets and Facebook's API, although only limited data (like spend data) is correctly integrated.
    *   Christopher noted that while the system can pull certain metrics, issues such as pulling the correct revenue data from Facebook remain unresolved.
    *   Donnie French provided insights on potential full automation through API integration, emphasizing that proper API access could enable daily automated data syncing.
    *   The discussion included integration with ClickUp and Iconic, explaining the workflow where editors generate asset data that flows through Iconic to ClickUp for media buyers.
    
*   **Ad Performance Classification Metrics** Idea
    *   Christopher explained the classification system that determines ad performance categories (e.g., winner, emerging winner, potential, underperformer, testing) using dummy thresholds for demo purposes.
    *   It was highlighted that while thresholds were defined for product 357, these metrics might vary by funnel (e.g., between product 357 and a quiz funnel), and adjustments will be needed.
    *   The team was advised to update documentation accordingly and await further details on specific performance metrics to be provided in upcoming discussions with Gabe and the media buying team.
    
*   **Workflow Automation and AI Integration** Update
    *   The system demonstrated Tess’s capability to leverage historical ad data to suggest next opportunity tests based on previous successful performance.
    *   Donnie French emphasized that once proper API connections are in place, the process could be fully automated, reducing reliance on manual interventions.
    *   The potential for integrating AI across different workflows was discussed, including future possibilities like agentic video editing connected to Iconic, which could analyze and generate optimized video drafts.
    *   The conversation noted that the high-level integration of AI into media strategy could also enable daily audits of media performance.
    
*   **Next Steps and Action Items** Decision
    *   A dedicated call will be scheduled next week for the media buying team to align on the new naming convention and its implementation.
    *   Attendees were urged to update internal documentation to reflect the new ad performance classification metrics and to provide feedback on any unclear points.
    *   Technical follow-ups include resolving API revenue data issues, consolidating different data storage methods, and refining file path integrations as demonstrated during the demo.
    *   The integration with ClickUp and the phasing out of redundant creative performance spreadsheets was discussed to streamline workflows for asset management.
    

*   Transcript
    
    **Christopher Ogle:** I haven't had time to sort mine out and
    
    **Liv Galloway:** cream.
    
    **Christopher Ogle:** So we'll go ahead, we'll go ahead and get started. I'm going to pull up a screen share here and then I'm just going to preface this with a couple of, couple of main points. Okay. So first one here is that this is a, this is still work in progress. It's going to be ready to actually start getting insights as of next week. The reason why it's still a work in progress is because the, the data that I'm going to be sharing with everyone today is demo data. Okay. And why I say demo data is because this functions on the new naming convention, which is a topic of conversation that I'm going to talk about at the end. So this works when we have the new naming convention because the naming convention is what tess, which is the new name for the Strategic Scaling System. Triple S so T triple S tess. And TESS is going to. TESS is an agent. So I'm going to show you like a demonstration of Tess on the left hand side. She operates with the new naming convention and she's going to be able to pull in all of this information here and this information is then how we're going to be able to get insights into what's a winner, what's an emerging winner, what's active, how to spend revenue, all these different things. Okay. This is a future state demonstration of data and then we have the current state, which
    
    **John Hardesty:** is where
    
    **Christopher Ogle:** we're at now. So I just want to contrast this really quickly so that you can see without old naming convention, Tess does not have the ability to pull in all of the information that she needs because the naming convention does not have all of the expansion types that we have for ads. It does not have the asset types within the naming convention. So it's impossible for her to be able to see from the old naming convention what is within the ad. Okay. So I just wanted to preface that so everyone understands that this is still going to be a work in progress for back dating all of the data that we have. However, the data that we have, like the ads that are working, we can still glean insights from the angles and test into those. But moving forwards, this is going to be a future state that once we all align on the new naming convention, which I put into the where is it Here. Updated naming convention document. As you'll see here, we have the current naming convention and then we have the pending naming convention. So everything is in here. And as long as we're all aligned on this media Buying team, you guys are going to go through this with a fine tooth comb and ask any questions. There are some points in here, some updates, things like, for example, when you guys create a campaign and you scale it, you create a duplicate. We want to put a dash SCA at the end of it. Okay. So we know it's a scaling campaign because right now there's like dash copy or whatever it is. We want to make sure that we have like scaling SCA at the end, little things like that. Okay? So I don't want to get too much into the weeds. Naming convention is going to be probably another call next week. But just laying the groundwork here with some context so everyone understands and then coming back here to the actual purpose of this. All right, so the purpose of this, as we all know, is to. And in fact, let me just. Yeah, I'm not going to get sidetracked with the test conversation right now. I'll do that at the end. The purpose of this is for us to be able to gain insight on the ads that we've tested, the net news and also the expansions to see what is working and what we need to dig into further. Okay, so here is an example with some demo data of say 357 script ID 8, 2, 3 with an angle slow trajectory lesson or solid stance tip or whatever it is. Here's the naming convention that will be pulled in. Now where does it get pulled in from? Ideal state is Domo API. I do not have access to Domo's API right now for just security reasons or whatever. But I'm working on that and I'll get it eventually. The second level is Facebook's API, which I've been experimenting with. So it pulls Facebook data directly into here through test the agent. I'm close to getting that. It's just having a hard time pulling the revenue, the correct revenue. It can pull spend, but it can't pull revenue. So I've just got to figure that part out. The way that this is going to pull the data right now is through Domo CSV sheets. We download a CSV from Domo and we upload the CSV to here. Here would be an example where you see demo data. It's got Domo for January. It's got all this data in here and then it can feed this data into what we have here and then it pulls into the Asset ID column and once it reads the Asset ID column, it starts to push all of that data into these different cells in here. Okay. So everything from whether it's a vertical expansion, Is it a net new? Is it a horizontal expansion? Is it a copy framework, test duration, environment, similar presenter, different presenter, all those different things it's going to be able to track. Is it a teleprompter, Ronin podcast, B roll plus vo Aivo? All those things will be tracked in the naming convention. And then we have talent, so we have Gary McCord and all the other different talent that we had from that talent spreadsheet. Everyone has a four digit code which will be tracked inside the naming convention as well. Okay, and then of course we have editor name, we have copywriter name, and then we have the creation date and then we have the status. Whether it's active or inactive. Tests will be able to identify if the ad is still spending or if it's not spending. If it's not spending, it'll be turned to inactive. If it's still spending, it will remain active. Okay, so by the way, if anyone has any questions or spots, anything that is not clear or you have feedback on, please write it down. And we can look at at the end if we have time. But I would love feedback. I just want to keep moving through this as quickly as I can. High level. Okay, so then we have the spend data, then the net revenue data and of course our new North Star which is net price. Okay, so net roas, what defines a winner and what defines potential and what defines emerging winner and what's an underperformer? Well, right now all I did was basically went ahead and thought and this is what I'll work on with Gabe and you guys. Media buying team Samuel JRod in this lookup table tab here, we basically have winner being something that is spent over 2 1/2 k and has a row as of above 1.1x. Okay, so again these are just my dummy data numbers. We can work on these to make sure it's exactly what you guys are aligned with. Okay, Emerging winner, something that's spent between 1.5k to just under 2500 and the ROAS is above 1.1x. So the purpose of that is for us to be able to identify something that's an emerging winner. It's moving quickly. It's. It's above the ROAS target, but it hasn't had that threshold of two and a half K. Okay, so we'd be able to see that then we have things like potential where it's above the spend threshold, but it's ROAS is not meeting KPI. It's still got some potential, but it's not priority underperformers. And then things that are testing haven't had enough spend, can't make any decisions on them. It's too early. So again, these numbers will likely change. I need to align with you guys on it. But that's basically what this classification will be for. Okay, so that's the main dashboard and then we start to get to where it really gets into the insights. Okay, this is how I've got it structured so far. We have a buy content where we start to look at things like okay, offer. So for ssp We've launched 62 assets. This was how much spend we've had. And this is the average roas per per asset across the board. Here's our win rate, here's how many winners we found. Okay. That's where we can look at it from an offer basis. Then we have ad category net new mashups. This is how many assets we've launched. This is our win rate. This is how many winners we've got. This is our average roas. Okay, so that's that category. Then we have by creative where we start to look at expansion types. Well, we do duration tests. This is how many duration tests we've done. This is a spend average net roas win rate winners. Okay, so we can start to actually break down and see what types of expansions and what types of assets are actually the best performance for us. Okay, Then we have by team which is of course copywriters, editors, talent, that sort of thing. This talent list will obviously be extended. It was just pulling the gurus right now. But you will be able to see by editors production of assets, copywriters talent that can also feed into a lot of other things. Okay, but then we have really what this is all about. And that's this one here which is the root angle tracker. This here is when and this is just an example for 357. This is where tests will be able to identify. Let me just get rid of that. So it's a little bit cleaner. Will be able to identify what are the top angles that we have and what types of tests that we've done so far on that script ID on that angle. So let's say for example we have slow trajectory lesson. It's this script number. We obviously did a net new on it. This was the asset that scaled the one that showed potential. Now here are all of the opportunities that we have left. These are all the tests that we haven't done yet. So now what will happen is because of all of the historical Data of spend tied to creative type and content type. Tess will be able to identify what the next opportunities are for us. So she would be able to say, well, the next best test for slow trajectory lesson is a hook stack. Why? Well, because this is, it's traditionally won for us. This is the test that happened last time. And, you know, we've done this before. It really worked well, whatever that is. Okay. She would be able to start giving those insights. So why is that important? Well, that's important for, say, you know, Chris flicks when you're putting together, you know, briefs for the week or, you know, I'm talking with Chris Hibbert about what ads to do for this week. We'd be able to come in here and we'd be able to look at what exactly we want to work on for that week. Okay. So that is a high level of how it's all structured and the purpose of everything. And like I said, this is future state, how it's going to look once we all align on the naming convention and we start using it. We'll be able to start getting insights as of next week. Okay. Right now we have this current state data and we're doing the best that we, that we can with that. All right, so I'm going to stop off there. I've gone through the high level. Does anybody have any questions that they want to ask on this? So far, No.
    
    **Gabe Medeiros:** So, Chris, this, you said this data is, is feeding from the data that we currently have on the name convention from Domo. So you're using this data, you're just organizing it in a different way.
    
    **Christopher Ogle:** What, this data that you're looking at here?
    
    **Gabe Medeiros:** Yeah,
    
    **Christopher Ogle:** no, this data is just made up data. This is future state. This is perfect, clean data, as if every single asset that we have
    
    **Gabe Medeiros:** is
    
    **Christopher Ogle:** named correctly. So that's why I had the 823 and 1,000 and so it's like future state stuff, right? This is where we're going to be in the future.
    
    **Gabe Medeiros:** This
    
    **Christopher Ogle:** is the current state.
    
    **Gabe Medeiros:** These
    
    **Christopher Ogle:** are our naming conventions that we currently have. And because of the naming conventions that we currently have, Tess cannot pull
    
    **Gabe Medeiros:** the
    
    **Christopher Ogle:** data correctly because she doesn't know, based on this naming convention,
    
    **Gabe Medeiros:** if
    
    **Christopher Ogle:** it is a podcast or if it's a teleprompter ad or whatever because it's not
    
    **Gabe Medeiros:** written
    
    **Christopher Ogle:** inside the naming convention. Some of the information she can, she can see if it's 4 by 5 or if it's an expansion, but she doesn't know if it's a vertical or a horizontal expansion. You see?
    
    **Gabe Medeiros:** Got it.
    
    **Christopher Ogle:** So.
    
    **Gabe Medeiros:** So we need
    
    **Christopher Ogle:** to go
    
    **Gabe Medeiros:** through a. A rename convention
    
    **Christopher Ogle:** project
    
    **Gabe Medeiros:** to
    
    **Christopher Ogle:** make this
    
    **Gabe Medeiros:** work,
    
    **Christopher Ogle:** which I. Exactly. To make this work at full capacity, we need to make an another update to the naming convention, which I wasn't ready for before, but
    
    **Gabe Medeiros:** it's
    
    **Christopher Ogle:** all here. And I'm going to have a separate conversation with you guys about that naming convention early next week to make sure we're all aligned. It's not that much of a change. It's really just three new sections of the naming convention that's added in that represent these three sections, which is the ad category, the expansion type, and the asset type. They're pretty much the only three editions. The rest still there. Facebook dimensions. The length tier is in there already, the talents in there. It's just got to be the right code, the editors in there, the copyright is in there, and the creation dates in there. So it's just three new additions.
    
    **Gabe Medeiros:** Okay, that's not bad. And it
    
    **Christopher Ogle:** sounds
    
    **Gabe Medeiros:** like the editors would add this to the name once they finish producing the assets.
    
    **Christopher Ogle:** Correct. And Liv has done a brilliant job of creating a spreadsheet that essentially almost forces people to create a proper naming convention. There are still some errors that I'm seeing. Not many, but a couple of errors. But it's gotten the editors to the point where, yes, they can create the naming convention correctly. There's the spreadsheet, if you wanted. Anyone wanted to look at that, I can pull that up real quick. One second. But yes, in answer to your question, editors are the ones who do the naming convention. So they put all the information in there and it turns out a naming convention for them to copy and paste into Iconic. So we would just add these new columns into this naming convention generator or naming asset ID generator, and they would then copy and paste this into Iconic. And then the iconic naming convention would make its way to. Where would it go, Liv? To ClickUp.
    
    **Gabe Medeiros:** This
    
    **Christopher Ogle:** is the part I'm. It would definitely make its way to the media buying team,
    
    **Gabe Medeiros:** that's for
    
    **Christopher Ogle:** sure.
    
    **Liv Galloway:** So, yeah,
    
    **Christopher Ogle:** put it that way.
    
    **Liv Galloway:** As soon as the editors finalize everything in Iconic, they put that final iconic link on the matching ClickUp task or ClickUp ticket, whichever your flavor. And then Fatima just does kind of quick eyeballs on that to make sure everything looks great, great. And then marks it from delivered to. From approved to delivered. And that's how it gets to the media buyers and their automation set up so
    
    **Christopher Ogle:** that each
    
    **Liv Galloway:** media buyer is tagged appropriately and then they can launch those assets.
    
    **Gabe Medeiros:** Got it. The last comment I have regarding your Structure is the rule based that you showed us to determine like what is a winner, what's a
    
    **Christopher Ogle:** upcoming
    
    **Gabe Medeiros:** or I don't know how you name those, but I think this will vary by funnel and we probably will
    
    **Christopher Ogle:** have
    
    **Gabe Medeiros:** to. You know,357 is definitely scaling more than any other product. I think these numbers would be different for between 357 and the quiz funnel, for example. And we just need to tweak this maybe a little bit by funnel, but I think this looks really good.
    
    **Christopher Ogle:** Cool. So here is where I would say test, just to let you know, each of the offers that we have are going to have different metrics that determine whether it's a winner, an emerging winner, a potential or an underperformer or testing. So I want you to just go ahead and update your documentation and your understanding here so that you, you are aware of this. And then next, next week I'm going to circle back with you and tell you exactly what those metrics are. And so now this is where all of this information is saved in, in here. So now this. So she would have this knowledge entered into her understanding of that. And then once we had those specific pieces of, of data that would then go into the knowledge bank so that she would know what those are and then that would be fed back into, into these, into the spreadsheet in a way that this is not run by formulas. This is run by code. So I'm not going to get in the weeds on this even I'm learning a lot about this. And Donnie knows I'm still got catching up to do. But this is run by code. So she has all the code written so that when the data gets pulled, that basically is what feeds that data incorrectly. So all of this stuff would be updated so she would know that 357 has its specific targets and OSSF has different targets and all of that stuff would live within, within this strategic scaling documentation, if you will.
    
    **Gabe Medeiros:** Very cool.
    
    **Christopher Ogle:** All right, anyone else got any other questions? No.
    
    **Russell Der:** This is awesome. Really. I know we've been talking about this for a while, so it's really cool seeing it kind of come to life like this. Really nice work.
    
    **Christopher Ogle:** Nice. Thanks, man. I appreciate that. Yeah, I got to, honestly, I got to give a huge shout out to, to Ben and Donnie for the way that they've just. What they've done with AI has just blown me away
    
    **Russell Der:** and
    
    **Christopher Ogle:** I spent. No, like, I mean, honestly, like, I appreciate that, but it's, but no, it's. It. I would never have been able to do this with, without the, the assistance of, of the AI and what these guys have been sharing with me. So it's, it's really exciting. And it's only going to. When you're selling the AI. Yeah. So it's, it's, it's going to help us in a lot of different ways as well, not just the strategic scaling system. So obviously I don't want to turn this into an AI call, but it's just what the potential that we have for being able to do a lot of what we want to do is. It's really exciting. So, see, I just wanted to give credit where credit's due.
    
    **Russell Der:** I
    
    **Christopher Ogle:** can build you a click. Yeah. And that's ClickUp will pull in. That's where the, that's a good point. Actually, real quick, let me just share that. That was part of the demo, but I forgot about it. And then so here in the current ad level tracking
    
    **Donnie French:** in
    
    **Christopher Ogle:** the root angle name that's pulling from ClickUp. Okay,
    
    **Donnie French:** so
    
    **Christopher Ogle:** ClickUp is connected. So Liv, you and I'll have a conversation with Fatima around how we phase out the creative performance spreadsheets ideally, so we have like one data storage warehouse, not multiple different spreadsheets all over the place. So this will be connected to ClickUp. And I did a test and it's pulled in all of these ad names here. The ones that it didn't pull in were basically asana tasks that were, that were no longer there. So it pulled in everything from ClickUp successfully. And so that was also positive sign that that's working correctly as well. So that'll be super helpful. Christopher,
    
    **Donnie French:** did you run the demo on it? Did I miss that? Sorry, I walked away for a second.
    
    **Christopher Ogle:** No, I, Let me. So this is where, for example, it would just start reading the files.
    
    **Donnie French:** We can only see your spreadsheet right now.
    
    **Christopher Ogle:** Oh, you can only see a spreadsheet. My bad,
    
    **Donnie French:** sorry.
    
    **Christopher Ogle:** So
    
    **Donnie French:** by the way, Google changed their settings today. You don't have to share a tab for people to hear the audio.
    
    **Christopher Ogle:** Oh really? You
    
    **Donnie French:** can share any window now and just there's a little toggle. You just toggle it on and people can hear your audio automatically.
    
    **Christopher Ogle:** Cool.
    
    **Donnie French:** I, I, I feel like I, they got my emails because I emailed them about that probably 40 times.
    
    **Christopher Ogle:** Wow. This is. Now this is pulling from a different. It's pulling from the, from the wrong file. So let
    
    **Donnie French:** me know
    
    **Christopher Ogle:** because
    
    **Donnie French:** in your bottom go down.
    
    **Christopher Ogle:** Yeah, I know. I got it. I got it. Yeah, I got it. Yeah, so I said it's pulling from that file. So
    
    **Donnie French:** let me see.
    
    **Christopher Ogle:** Just
    
    **Donnie French:** Close out that CSV on the top and it. And then you'll have. No, no. Yeah,
    
    **Christopher Ogle:** I tried that. It doesn't. It's still. It's still there. It's still there. Let
    
    **Donnie French:** me
    
    **Christopher Ogle:** just pull up demo. I think it's future state demo that I'm going from.
    
    **Donnie French:** As long as you have the eye off, it's fine. It's not going to read it. Oh,
    
    **Christopher Ogle:** there you go. That's the file path. Let me see if it pulls the right path. If it finds the right path. No, it's not pulling the right path.
    
    **Donnie French:** Ideally you would only have one path, though. You wouldn't have any demo data in there, it would only be real data and then you wouldn't have to give it the path. You would just give it the path of the, of the folder and then it should
    
    **Christopher Ogle:** read the
    
    **Donnie French:** prd. It would read the.
    
    **Christopher Ogle:** It
    
    **Donnie French:** would read the skill doc and then run it. Yeah,
    
    **Christopher Ogle:** for sure.
    
    **Donnie French:** Yeah. And the beauty is that like that root folder strategic scaling system, you can share that root folder with anybody as a zip, as long as they can download that, that zip onto their computer. They don't even have to have Obsidian. They can just share
    
    **Christopher Ogle:** the
    
    **Donnie French:** file route directly in their computer and run it in cloud code and anyone can run the exact same system. It'll work. It doesn't have to be just yours.
    
    **Christopher Ogle:** Nice. Yeah. So. So anyway, I don't want to go too far down this path, but this is, this is basically. You can just picture that when you give it this demo data here of like this one. If I were to put this in there and say, okay, I want you to. Yeah, here you go. Hey, team, I'm Tess. The intelligence layer within the strategic scaling system. Today, Chris was going to walk you through why we built the system and what, and what becomes possible once we adopt the new naming convention. I'll be here throughout to help you answer any questions. Blah, blah, blah, blah, blah. Right. So now I could basically say, you know, hey, hey, Tess, please upload this CSV into the AD level tracking tab. Right? And then, you know, it would basically take this CSV file of all the Domo data and it would start uploading into, you know, this, this window here.
    
    **Donnie French:** And Gabe, obviously if we had just like, even if we just had a view only API access to Domo, we could set up
    
    **Christopher Ogle:** agents
    
    **Donnie French:** that run this every single day for us with like sub agents that monitor it so we don't have to run it. It'll just continuously run every day and give recomm.
    
    **Christopher Ogle:** Like
    
    **Donnie French:** this doesn't need any human at all. The way that it's set up right now is, is like three months old. Basically, like this workflow three months ago was
    
    **Christopher Ogle:** like,
    
    **Donnie French:** blew my mind.
    
    **Christopher Ogle:** But
    
    **Donnie French:** now the new workflow that if you can get the proper API connections, it can run on its own and you don't need it to optimize. And then ideally this can like connect into eventually, like an agentic video editor that's actually spitting out drafts of the edited videos with our footage connected to Iconic, because John Hardesty Iconic just added an API. So you can now plug straight into that. They did that last week and I tested it yesterday. It works. And it'll like sort through all the Iconic footage and find all the best clips
    
    **Christopher Ogle:** that
    
    **Donnie French:** match the same angles. That worked. So, like, I gave it five winning ads and I told it to go on Iconic and find the clips that match these exact clips. Same types of angles, different, different users though, and it nailed it. So, like,
    
    **Christopher Ogle:** that's
    
    **Donnie French:** where this is heading. And then, Gabe, if you want to get crazy, you can also tie it into your media strategy and it can like audit the media strategy on a daily basis for you.
    
    **Gabe Medeiros:** That's. Yeah, that's very impressive.
    
    **Donnie French:** Yeah. Click thinking, Christopher, drop. Click
    
    **Christopher Ogle:** the carrot
    
    **Donnie French:** next to thinking. Can you.
    
    **Christopher Ogle:** Yeah, yeah,
    
    **Donnie French:** just click the carrot. I just want to see what the outputs are. Click the one up above. Just a little. There we go.
    
    **Christopher Ogle:** I think. Yeah, this is all right.
    
    **Gabe Medeiros:** Yeah,
    
    **Christopher Ogle:** I can access the spreadsheet.
    
    **Donnie French:** I mean, just the sheer volume that it can review. Like, just to give you guys context, like, I, I fed it 3,600
    
    **Christopher Ogle:** different
    
    **Donnie French:** swipes of promotions over the last probably 35 or 40 years that we have in our swipe files.
    
    **Christopher Ogle:** And
    
    **Donnie French:** it analyzed every big idea, every mechanism, every offer structure,
    
    **Christopher Ogle:** the
    
    **Donnie French:** whole entire thing, and built out all these frameworks based on different markets, different mechanisms, different big ideas. And it's just like the shit sheer amount of data that it can analyze and, and quantify for you and build into frameworks at rapid speed is absolutely insane. And this is still using Claude code, like the extension. Not. Not in the terminal. You go into the terminal, you can do five times more data.
    
    **Christopher Ogle:** I didn't know you could do more data in the terminal.
    
    **Donnie French:** Yeah, you have more con when you're using cloud code. Cli, not cloud code extension, because this is still using a wrapper. If you're using the CLI direct, it has a. You have more context window and more tokens. And you
    
    **Christopher Ogle:** can also,
    
    **Donnie French:** you can also set up like the, the collapse setting where it'll save the context from one chat, put it into a file for you and then continue in the same. In the same terminal and then reference that file rather than having to use tokens to continue working.
    
    **Christopher Ogle:** Yeah. Nice. Cool. All right, awesome. Well. Well, yeah, I think normally I would just feed it this, feed it the right file name and I don't have that connected. So it's trying to search through a whole bunch of different files to find the right ones. That's why it's taken time. So anyway, I'll. I'll wrap it there. I think everyone's kind of got an understanding, a high level now. That was really the purpose of this call, not to get too far into the. Into the weeds. So action steps from here live. I know naming convention, that was a big one. And media team, I'm going to get with you guys early next week and just talk about the naming convention and just make sure we're all aligned on that. And then we can start. Once we're all aligned, we can then start getting the assets named that way so we can make some adjustments to the generator that you've got there. And then all the editors can start naming their assets that way. And then we can start getting those assets uploaded into Meta and Google and different places. And then from there we're going to start to be able to get these insights straight into here and be able to make decisions on the, you know, future, towards the future state. Okay. So, yeah, I'll keep everyone posted on that and if anyone's got any other questions, just feel free to reach out to me and slack more to
    
    **Sam Mercado:** come.
    
    **Liv Galloway:** Also,
    
    **Sam Mercado:** like, it's Gabe's your birthday this weekend. Happy birthday.
    
    **Gabe Medeiros:** Thanks, man.
    
    **Christopher Ogle:** Yeah,
    
    **Donnie French:** well done, Christopher. This is great.
    
    **Christopher Ogle:** Happy birthday. Cool. All right, thanks, everyone. Appreciate it.
    
    **Sam Mercado:** Enjoy
    
    **Christopher Ogle:** your weekends.
    
    **Russell Der:** Great work.
    
    **Christopher Ogle:** Yes. Bye. Thanks.