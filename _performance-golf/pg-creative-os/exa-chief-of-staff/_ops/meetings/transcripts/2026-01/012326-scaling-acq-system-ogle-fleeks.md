# Scaling Acq System (Ogle/Fleeks) - 01/23/2026

**Date:** January 23, 2026
**Source:** ClickUp AI Notetaker

---

**Attendees:** Christopher Ogle, Chris Fleeks, Liv Galloway
[https://t9014714949.p.clickup-attachments.com/t9014714949/693d7b24-a251-4374-bf7d-4a0a642aa55d/693d7b24-a251-4374-bf7d-4a0a642aa55d.mp4?view=open&filename=Christopher%20-%20Chris%20-%2001-23-2026.mp4](https://t9014714949.p.clickup-attachments.com/t9014714949/693d7b24-a251-4374-bf7d-4a0a642aa55d/693d7b24-a251-4374-bf7d-4a0a642aa55d.mp4?view=open&filename=Christopher%20-%20Chris%20-%2001-23-2026.mp4)
### Overview

The meeting focused on developing an automated strategic scaling system to streamline ad and creative performance tracking. The team discussed updating naming conventions, reordering key spreadsheet columns, and integrating automation using CLAUDE code and ClickUp to centralize data management and reduce manual data entry.

### Key Takeaways

*   The team agreed to update the naming convention for ad assets, incorporating standardized codes for net new ads, expansion types, talent, editors, and copywriters.
*   Key spreadsheet columns (assignee, copywriter, editor, talent, date created, and date closed) were reordered to improve usability and efficiency.
*   A live demonstration confirmed that automation between the 2025 AD Scaling Framework and the Creative Performance spreadsheet is feasible via CSV uploads and CLAUDE code.
*   The group decided to centralize data management by transitioning from legacy creative performance spreadsheets to a single strategic scaling system.
*   Identified blockers included API access issues to Domo (necessitating CSV uploads), API connection errors, and permission challenges that require resolution.

### Next Steps

- [ ] **Christopher Ogle**: Finalize the updated naming convention and automation scripts using CLAUDE code.
- [x] **Liv Galloway**: Ensure view access is provided for both the strategic scaling and creative performance spreadsheets and update corresponding fields in ClickUp.
- [ ] **To be Assigned**: Verify and adjust Google Sheets permission settings to support seamless automated data transfers.
- [ ] **Team**: Schedule a follow-up meeting to review the new naming convention and confirm overall system alignment.
### Key Topics
*   **Reordering and Enhancing Spreadsheet Columns** Decision
    *   Liv Galloway initiated the discussion by asking if the 'copywriter' role should be added alongside the 'editor', and then worked on reordering key columns for better visibility.
    *   Columns such as assignee, copywriter, script doc, talent, date created, and date closed (date launched) were moved closer to the front to streamline workflow and improve ease of use.
    *   There was consensus to prioritize these fields, ensuring that essential information is visible upfront.
    
*   **Automation of Data Transfer Between Spreadsheets** Update
    *   Christopher Ogle demonstrated how entering a value in the 2025 AD Scaling Framework spreadsheet (specifically in column C) can trigger an automation to update the corresponding Creative Performance spreadsheet.
    *   The proof-of-concept showcased data flowing automatically between the two spreadsheets with minimal manual intervention, leveraging CLAUDE code to execute the automation.
    *   Challenges noted included slight delays and permission issues (e.g., editing access on shared sheets), but overall the system was able to transfer data as intended.
    
*   **Updated Naming Convention for Ad Assets** Decision
    *   A significant portion of the discussion focused on developing a new naming convention that standardizes ad asset labeling based on factors such as net new versus expansion types, talent, editor, copywriter, asset type, and creation date.
    *   Christopher Ogle explained the structure in detail, including prefix codes (e.g., 'NN' for net new, 'XX' for non-applicable expansion type) and differentiation between video and image ad IDs.
    *   The updated naming convention will drive automation, help in granular tracking of ad performance and will serve as the backbone for strategic decisions moving forward.
    
*   **Integration with ClickUp and AI Tools** Idea
    *   The team examined the potential of integrating ClickUp, ClickUp Brain, and other AI tools like CLAUDE code, ChatGPT, and Gemini to streamline various tasks such as copywriting and data updates.
    *   Liv Galloway highlighted that ClickUp Brain pulls in contextual data (from Google Drive, Slack, etc.), which may eventually reduce manual data entry across systems.
    *   There was discussion regarding the capabilities of CLAUDE code, including the potential to teach it specific skills (such as updating ad data) and its role in automating repetitive tasks.
    
*   **Centralization of Data Management** Decision
    *   Discussion centered around the strategic decision to consolidate data into a single, centrally managed Strategic Scaling System to replace or integrate with legacy creative performance spreadsheets.
    *   Liv Galloway expressed concern about duplication and the challenges of manually maintaining historical data across multiple spreadsheets.
    *   The integrated system was envisioned to serve as a single source of truth, automatically tracking ad performance, asset ids, and providing streamlined access for operations and media teams.
    
*   **Addressing Technical and Integration Challenges** Problem
    *   The team acknowledged several technical blockers, such as API access issues with Domo, necessitating the temporary reliance on CSV uploads for data integration.
    *   Additional challenges included occasional API connection errors, delays in automation due to context window limitations in CLAUDE code, and ensuring proper edit permissions on shared Google Sheets.
    *   These issues were noted as areas for future improvement as the system evolves.
    
*   **Next Steps and Timeline** Decision
    *   Christopher Ogle committed to finalizing the updated naming convention and associated automation scripts, aiming to have the work completed by the next call (approximately by the same time next week).
    *   Liv Galloway was to receive view access to both the Strategic Scaling System and the Creative Performance spreadsheets for field updates in ClickUp and data reconciliation.
    *   The team planned a follow-up meeting to review the new naming convention document and to secure alignment on the automation and data centralization strategies.
    

*   Transcript
    
    **Liv Galloway:** Okay,
    
    **Chris Fleeks:** that makes
    
    **Liv Galloway:** sense. I don't see copywriter on here, but I do see editor. Do you want copywriter and editor?
    
    **Chris Fleeks:** Yeah, that would be great.
    
    **Liv Galloway:** All right. The way that I'm gonna so order wise. Do you want to see the editor and the copywriter over here? Do you want to see that later down the road?
    
    **Chris Fleeks:** You know, I think probably push towards the. The front. So yeah, that I think that would be. That makes sense. Is like the first few.
    
    **Liv Galloway:** Let's put this closer over here. The assignee, the copywriter, the script doc, and then any talent. I'm going to drag these all the way over to the front for now. Date created and then date closed, which is date launched. And I'll add some language here at the top. No, I don't want to create a task. More options. Let's pin a description. Date closed equals date
    
    **Chris Fleeks:** launched
    
    **Liv Galloway:** by mediavira. And then assignee equals editor or agency
    
    **Chris Fleeks:** responsible.
    
    **Liv Galloway:** Agency partner. So yeah, date created, date closed. The assignee, The copywriter, the description and the doc.
    
    **Chris Fleeks:** This
    
    **Liv Galloway:** still needs to go over here. Net new, static,
    
    **Chris Fleeks:** physical.
    
    **Liv Galloway:** Okay, talent, promote number of assets you don't need for this view. This is the preview of the ad. So let's do that. Let's hide this column status. We've got date launched. We've got date created. We've got talent, we've got. This has got to be figured out. Root angle. Is every ad gonna have a root angle now?
    
    **Chris Fleeks:** Well, not. Well, not every ad, I think. What would it be? Net new. Net New ads probably won't have a root angle, but any expansions will.
    
    **Liv Galloway:** Okay, let's do. When is the root angle established during scripting?
    
    **Chris Fleeks:** Yes.
    
    **Liv Galloway:** Okay,
    
    **Chris Fleeks:** let's
    
    **Liv Galloway:** do text field, root angle.
    
    **Chris Fleeks:** Let's
    
    **Liv Galloway:** create that. I'm going to put that right next to the add description. And then those will just be able. You'll be able to just type in. Unless you want it to be a drop down, which we can definitely do that too. Better as a drop down, probably.
    
    **Chris Fleeks:** Yeah, I think so.
    
    **Liv Galloway:** Is there an easy way for me to copy these or so
    
    **Chris Fleeks:** and if I can definitely do that part. Yeah.
    
    **Liv Galloway:** Because even if I just have these.
    
    **Chris Fleeks:** Oh, actually, I'm sorry. If you go to copy of angle db, it's the third tab.
    
    **Liv Galloway:** Third tab. Perfect. All right, let's do a dropdown. Hey,
    
    **Chris Fleeks:** Chris.
    
    **Christopher Ogle:** Hey. Sorry.
    
    **Liv Galloway:** We're working on scaling system things PI.
    
    **Chris Fleeks:** I was just. I
    
    **Christopher Ogle:** was curious. My headphones on. Sorry. I had just had. The power went out like a minute before starting
    
    **Chris Fleeks:** call madness.
    
    **Christopher Ogle:** Absolute madness.
    
    **Chris Fleeks:** So
    
    **Christopher Ogle:** you guys were in a call before hey, you finishing up or. Or live. Are you joining us?
    
    **Liv Galloway:** I offered to join because Fleeks had sent me over his spreadsheet and I said you are going to
    
    **Christopher Ogle:** have to duplicate
    
    **Liv Galloway:** so much information manually and you can do this within ClickUp using the existing tasks. So let's do that. So I was trying to just build as quickly as humanly possible. So we're just kind of
    
    **Christopher Ogle:** working. Okay.
    
    **Chris Fleeks:** Yeah.
    
    **Christopher Ogle:** All right, cool. Okay.
    
    **Chris Fleeks:** Yeah.
    
    **Liv Galloway:** I was
    
    **Chris Fleeks:** just curious if. If we could automate that task name into our G sheet. Chris and Liv had
    
    **Christopher Ogle:** mentioned
    
    **Chris Fleeks:** this might be easier.
    
    **Christopher Ogle:** Yeah. Cool. So let me. Let me kick it off here first with. Okay, got a note taker in there. Sweet. Sounds good. Nice. So what I wanted to do in today's call was just go through before we go too much further with the strategic scaling
    
    **Chris Fleeks:** system too.
    
    **Christopher Ogle:** Just kind of give you some updates on what I've been working on on the AI side of things. Okay. Using claude code, I've managed to actually get it to start to pull in some of the data automatically. So I'm just going to go through and show you what I've done
    
    **Chris Fleeks:** and
    
    **Christopher Ogle:** then you'll see that there are still some elements that need to be automated and you know, leave. You mentioned ClickUp, that'd be great for being able to pull in the ad name and stuff. So I'd love to. To learn more about that. I was hoping to have this more progress than I have now, but there's still like major progress. I've just had, like I mentioned to you, just some major chaos the last couple of days. So it's just slow me down a little bit. But that being said, let me just pull up my screen here
    
    **Chris Fleeks:** and
    
    **Christopher Ogle:** we'll rip straight in entire screen. Okay, cool.
    
    **Liv Galloway:** Go
    
    **Christopher Ogle:** across to there.
    
    **Liv Galloway:** All
    
    **Christopher Ogle:** right, cool. And then we just pull up the strategic scaling system.
    
    **Chris Fleeks:** All
    
    **Christopher Ogle:** right, so that's the one that I'm at now. Then I have that connection error. Okay, so can you see
    
    **Chris Fleeks:** this
    
    **Christopher Ogle:** strategic scaling system one here?
    
    **Chris Fleeks:** Yes.
    
    **Christopher Ogle:** 2.2. Yep. Okay, cool. All right, so basically what I did was I went ahead and I updated some of the columns and I updated some of these down here and
    
    **Chris Fleeks:** I
    
    **Christopher Ogle:** updated. This is just a high level of what I've updated. And then I'm going to go through each one. The naming convention will need to have an update for this to work, but it's not a drastic update to the naming convention, but it's extremely important. But once you see how simple it actually is and you see how all of this is going to be tracked, you'll understand once this naming convention is this way, we're going to be able to track things very, very granularly, and it's going to be very, very helpful for us in the future. Okay, so first thing I wanted to mention is obviously you got funnel here. All of these are now starting to get labeled automatically when the data starts to
    
    **Chris Fleeks:** come
    
    **Christopher Ogle:** in. So how does the data actually come in? And by the way, I'm just jumping in here, so if you've got
    
    **Chris Fleeks:** any questions.
    
    **Christopher Ogle:** No,
    
    **Chris Fleeks:** no, go for
    
    **Christopher Ogle:** it.
    
    **Chris Fleeks:** Let's
    
    **Christopher Ogle:** see. So we basically got this file here. This is a raw data file, CSV file from Domo. I asked Patrick if we could get API access to Domo, and he's hesitant to do that for security reasons at the moment. So he's basically said for us to start with CSV uploads, which is totally fine. We can make it work with CSV uploads, and then once we start to get some momentum with it and we get the green light, we can then switch over to API and all of this will be lot more automated. Okay, so for now, we
    
    **Chris Fleeks:** have
    
    **Christopher Ogle:** a raw data sheet CSV file from AD Performance. Okay. So it's basically what I did was I looked at January 1 to January 21 worth of data just as an experiment. Okay? So this spreadsheet here, as you can see, hundreds and hundreds and hundreds of rows, a lot of data. And the issue with being able to track all of this data at the asset level is, of course, that we have multiple assets for one particular asset. I want to get my terms correct. So what I mean by that is if we have, let's say, DQFE1v1, it scales
    
    **Liv Galloway:** well,
    
    **Christopher Ogle:** what's JROD gonna do? He's gonna take that, he's gonna duplicate DQFE1v1 and he's going to create a copy of it, as you may have seen, inside Domo, where it has a dash copy at the end. Okay? But now we have two DQFE1V ones inside Domo, which means we've just doubled our rows. So what I've created as a workaround for that, I'm not a workaround, but it is. The way that it's going to function is an aggregated view. Okay, so what this is now is this is all of the DQFE ones v1's combined spend. Does that make sense? Does that
    
    **Chris Fleeks:** make sense?
    
    **Christopher Ogle:** The aggregated spend of all of those?
    
    **Chris Fleeks:** So
    
    **Christopher Ogle:** if we have one asset that starts out and it gets, you know, 404,000 in spend or whatever, or even before that, we probably get to about 1k in spend. Maybe 2jRod will then create a duplicate. If this one scales to 5k,
    
    **Liv Galloway:** well
    
    **Christopher Ogle:** then it's 5k plus 2k is 7k in spend. It's
    
    **Chris Fleeks:** going to pull
    
    **Christopher Ogle:** all that data together and it's going to get like an average. Okay. That average is what gets pulled into this ad tracking section here. Okay.
    
    **Chris Fleeks:** Okay.
    
    **Liv Galloway:** The
    
    **Christopher Ogle:** average. So what happens now, and this is automated through Claude code here, which I've been working on, is that if I say to it and I'll just do an example here. Actually no, I had an API error, so
    
    **Liv Galloway:** I
    
    **Christopher Ogle:** don't think I'm going to be able to do this. Let me see if I can show you an example of this on the fly. One second. Stuff here, here. Okay. I was trying to find some stuff here because it just whoops.
    
    **Liv Galloway:** And
    
    **Christopher Ogle:** I went to search and you can see why this ran
    
    **Chris Fleeks:** out of context
    
    **Christopher Ogle:** window. It just. I think it just ran out of context window and now it's like API error. It just doesn't want to admit it's actually just
    
    **Chris Fleeks:** can't
    
    **Christopher Ogle:** handle any more input on this window. So basically what I did. Are you familiar with Claude code, Chris? Have you been using it at
    
    **Chris Fleeks:** all? I haven't used Claude code yet, no.
    
    **Christopher Ogle:** Okay, cool. All right, awesome. So it's something that I highly suggest digging into. I hadn't really looked at it until probably about a week and a half ago and it's actually like a lot easier to use than you'd expect. But
    
    **Chris Fleeks:** there
    
    **Christopher Ogle:** are some videos that I could
    
    **Liv Galloway:** try
    
    **Christopher Ogle:** and get for you and you can watch those and get up to speed and get set up and everything in here because I think it's going to be pretty important for this strategic scaling system anyway. Okay, cool. So let me
    
    **Liv Galloway:** just actually both of you definitely spend some time with ClickUp Brain because it has Claude, Gemini, ChatGPT, all of the current models, and because of all of the interconnectivity we have our Slack connected, our Google Drive connected, everything connected to ClickUp. So ClickUp Brain is always pulling from that full context. So if you're using ClickUp, ChatGPT, Claude, everything else within ClickUp Brain, you're getting a lot more context that you don't have to manually feed the tool and
    
    **Christopher Ogle:** it's
    
    **Liv Galloway:** completely included with our plan. So it's free to us essentially. And the other thing is, I'm not expecting you guys to set this up. You're free to play, but there's ClickUp Agents now. So if we need to create an agent that writes copy, that updates scaling, acquisition things, that does whatever it is, we, we can make it happen.
    
    **Christopher Ogle:** So
    
    **Liv Galloway:** just throwing that out there.
    
    **Christopher Ogle:** Cool. Awesome. Yeah, so I'll definitely look into that. I think the difference between CLAUDE code and how it works is. And I don't know if
    
    **Liv Galloway:** ClickUp
    
    **Christopher Ogle:** has this, but I don't think so. There's the difference between the CLAUDE LLM, which is basically just the interface, the chat interface, and then CLAUDE Cursor, which is actually, you can see it now. It gets access to your files. So it can basically go in and actually manually start making tweaks to things. I can now give this an instruction to go in and update data in columns. You give it, give it permission at what's called the user level, so you can give it permission to access certain files. And I don't think that ClickUp Brain has that level of access and capabilities, but it may. So I'll look into that. So you can see for this here to work now it's moving around and it's actually doing stuff and this is how it's going to, to be able to function. I didn't think it was going to be able to do this again, so that's cool. All right, so. But I appreciate you bringing that up, Luke. I'll definitely look into it. Alright, so as I've said before, we have RAW daily, we have the RAW data which will update. So let me just go here.
    
    **Liv Galloway:** Okay,
    
    **Christopher Ogle:** just pause that out
    
    **Liv Galloway:** because,
    
    **Christopher Ogle:** yeah, I was having issues with that before and now it looks like it's working. So, okay, so RAW data, this will, when we update this data, okay. It will go through a process of
    
    **Liv Galloway:** adding
    
    **Christopher Ogle:** the data to what it's already had before. Okay. So
    
    **Liv Galloway:** that
    
    **Christopher Ogle:** will allow this to be a historical database of data, not just a weekly snapshot of data which we're making decisions from, which would be very unwise of us to
    
    **Chris Fleeks:** do.
    
    **Christopher Ogle:** This is supposed to be an ongoing data storage house in which we can see ongoing spend in,
    
    **Liv Galloway:** you
    
    **Christopher Ogle:** know, one month, two months, six months, you know, one year. Now, over time, obviously that's going to become, that's going to be a lot of data. It's enough. We have enough cells to be able to last two years. Okay. In this particular tab. But that's not going to happen because we're ideally going to be switching over to API where we don't have to even worry about doing manual CSV uploads. So aggregated view pulls in the ad tracking data here. Now I'm going to go through these columns one by one. Real quick. And then I'm going to talk about the naming convention and then we can talk about root angle name and how this would pull in from ClickUp. Okay, so we basically have category, add category, which is vertical expansion, horizontal expansion,
    
    **Chris Fleeks:** net
    
    **Christopher Ogle:** new, and net new mashup. Okay. The big four, which we've all aligned on and all agreed upon. And that's really the first step, the add category. Okay, Do I need to zoom in on this? Can you guys see this? Okay,
    
    **Chris Fleeks:** I'm okay. Yeah, I just.
    
    **Christopher Ogle:** Yep. Okay, nice. Then we have expansion type. Now expansion type is hook, stack, scroll, stopper, refresh, and duration. These are three vertical expansions. Okay. Then we have environment, similar presenter, different presenter, add format, copy framework. These are the horizontal expansions. Okay, so vertical expansions, you remember, are the ones where relatively low left
    
    **Chris Fleeks:** editors
    
    **Christopher Ogle:** could do them without copywriter input.
    
    **Chris Fleeks:** They
    
    **Christopher Ogle:** could probably end up looking at the data themselves eventually and being able to figure out how to do them, especially durations. They could probably look at an ad that's three minutes or
    
    **Chris Fleeks:** whatever,
    
    **Christopher Ogle:** five minutes, and be able to trim a shortened version down without the copywriters. But most of the time the copywriters are going to be involved in giving the directions for the tasks. But of course, not always. In an ideal world, we have editors who understand the data and they can go in and they can make these themselves. Then we have the horizontal expansions, which is changing the environment. Similar presents a different presenter, ad format, copy framework. And remember, of course, we talked about this, that everything always leads back to what?
    
    **Chris Fleeks:** Script id.
    
    **Christopher Ogle:** Script id. Yeah, which is that main core root angle, which is going to be this. Okay, so I want to stop off here for a second and just make an important point that there's a difference between how we're going to use this moving forwards and how we label things for this to function correctly and what we've done in the past. What we've done in the past. We'll still need a little bit of manual work
    
    **Chris Fleeks:** in
    
    **Christopher Ogle:** that, for example, live, you've seen this. Some of the names of the mashups, they don't have names, they're just labeled mashup, mashup, net new mashup. Something like. It doesn't have a name like best gift in
    
    **Chris Fleeks:** it.
    
    **Christopher Ogle:** So technically the mashup is a net new. It has a new id, but it doesn't have a name to the ad. It doesn't have a real core root angle in it. But moving forwards as part of our SOPs, every single ad that is a net new will have A root core
    
    **Chris Fleeks:** angle.
    
    **Christopher Ogle:** And it needs to be within one to four words maximum, ideally three words maximum. If you cannot communicate the one root idea core angle inside this ad, then in my opinion, it shouldn't even be tested because it's not going to be able to break through. Okay, so that's going to be in here, and that's where we can pull that in automatically from ClickUp. Okay, we'll circle back to that. So then we've got asset type, which is
    
    **Liv Galloway:** whether
    
    **Christopher Ogle:** it's a podcast, is it teleprompter or Ronin, is it slice and dice, is it B roll voiceover or is it a Ivo? Okay, these, this list will probably grow, likely grow and expand, but for now, this is essentially what we've, what we've got. Then we have talent. And all of this talent was pulled in automatically from the content creators roster roster. Content creators roster. And by the way, this, everything that I'm saying right now is documented inside a markdown file with instructions so that when this script runs automatically, it has full context of exactly what the strategic scaling system is, how it operates, how all of the different horizontal expansions, vertical expansions, the naming, the labels, all those different things, it's going to have full context to that. And once it's finished, then I'm going to give that across, obviously going to run a past. You guys will get full approval and alignment on it. And then we hand it over to the media buyers so that they understand the new naming convention updates, which are going to be minimal, but they are going to be extremely important. And then once we're all land on that, then Patrick can go ahead and update the filters inside DOMO so that, that can also get filtered correctly in domo. But that's, that's okay. That's like, not that important for me. What's more important is that it filters correctly here
    
    **Liv Galloway:** inside,
    
    **Christopher Ogle:** inside this triple S. Okay, so let me just click back to the right tab here. Okay, then we have creation date. So creation date is obviously at the end of the naming convention. The last thing in the naming convention status, inactive or active is
    
    **Liv Galloway:** automatically
    
    **Christopher Ogle:** updated once the. Basically everything is dependent upon when the asset ID gets entered into the cell. When the asset ID gets entered into the cell, there's going to be. This is what I'm still setting
    
    **Chris Fleeks:** up
    
    **Christopher Ogle:** the series of formulas. So right now if I remove this, you can see that it removed this data here, it removed the offer code, it removed the script ID and it removed whether it was inactive or active. But if I paste this in Oops. Broke. It was supposed to do that.
    
    **Chris Fleeks:** But
    
    **Christopher Ogle:** you can see that when this new data comes in here, this is automatically recognizing that it's GBF is the offer
    
    **Liv Galloway:** and
    
    **Christopher Ogle:** that the script ID is. This one here. Makes sense.
    
    **Chris Fleeks:** Yep. And
    
    **Christopher Ogle:** it's going to do the same thing with all the rest of this
    
    **Chris Fleeks:** naming
    
    **Christopher Ogle:** convention once it's updated. All right. And what the active or inactive is showing is whether those assets are still spending. Okay. Because it's going to be pulling in on this updated data. Now if an ad starts to fall off and gets turned off, well, this is automatically going to update. It's going to change from active to inactive to show that this asset
    
    **Chris Fleeks:** is
    
    **Christopher Ogle:** no longer spending anymore.
    
    **Chris Fleeks:** Okay?
    
    **Christopher Ogle:** But if it's active, it's going to be marked active. Okay? And then we have the platform, which is Facebook, Google or YouTube.
    
    **Chris Fleeks:** Then
    
    **Christopher Ogle:** we have the dimensions. So again, all of this is automatically going to be pulled in the length tier because we're going to want to eventually test the data on the length tiers too,
    
    **Chris Fleeks:** whether
    
    **Christopher Ogle:** 60 second ads spend more than 360 second ads. Okay. This is all going to be tracked as well. And then we have the editors names and the copywriter names, which will be the initials inside the naming convention. So that it will know that, for example, co, when it sees CO as a initial inside the naming convention, it'll update to Christopher Ogle. Okay. The editors, they'll all have their own initials as well. And that will automatically update inside the cell as well. And then we have the data spend. Net revenue. Net rowless. Okay, so I'll stop off there. Any, any questions on this
    
    **Liv Galloway:** so
    
    **Christopher Ogle:** far?
    
    **Liv Galloway:** This and the work that you and I have done on updating the creative performance spreadsheets, I think what makes a heck of a lot more sense is for all of this information to live directly within the creative performance spreadsheets. And if you've got all these automations, that saves Fatima having to do a lot of extra work. All that she would need to do is go in, put the ad id, not have to fill in any of this other stuff. Because once
    
    **Christopher Ogle:** we
    
    **Liv Galloway:** get the full naming convention back from the editor, it's going to auto fill everything. But right now we'd have
    
    **Chris Fleeks:** the
    
    **Liv Galloway:** creative performance spreadsheets, which have some of this information ClickUp,
    
    **Chris Fleeks:** which
    
    **Liv Galloway:** also has some of this information. But we need it all in one place. I totally understand the need to aggregate, but I
    
    **Christopher Ogle:** think
    
    **Liv Galloway:** if all of this can live directly in the creative performance spreadsheet, it's going to make everybody's lives a lot easier.
    
    **Christopher Ogle:** That's a great point. And I thought about this as I was going through it, that how are the creative performance spreadsheets going to feed into this or vice versa? I think that the idea of this is that it's going to replace the creative performance spreadsheets. The thing with this is that, Chris, you mentioned about splitting them into individual tabs per offer, and I think what we could actually do is just use filters where you can actually see that here. If I just go to here and I go 3, 5, 7 or DQFE and I hit. Okay, well now I can. These filters aren't set up properly yet, but you get the idea. Now I'm only seeing DQFE ads under that filter and I can focus in on just those. Okay. Or I can remove the filter or whatever. I think there's all these other offers that I didn't uncheck. So that's the only DQFE add in there right now. Okay. So in terms of the creative spreadsheets and how these fit in, I don't know for sure. I think that trying to get all of this data to go because the disconnect for me live between this and the performance created performance spreadsheets is that the data needs to be manually updated in the CSV file.
    
    **Liv Galloway:** And
    
    **Christopher Ogle:** I wouldn't want to have to go and add CSV files to every single creative performance spreadsheet for this to work.
    
    **Chris Fleeks:** I
    
    **Christopher Ogle:** would want it to live in one central strategic scanning spreadsheet. So my intention for this was that the creative performance spreadsheets over time could either
    
    **Chris Fleeks:** be
    
    **Christopher Ogle:** replaced by this and sunsetted, or if we did keep both of them, then the amount of data that would need to be inputted into the creative performance spreadsheets was significantly less.
    
    **Chris Fleeks:** But
    
    **Christopher Ogle:** I think that that's not. I don't think that's the best option. I think what's best is for us to put everything inside this. But it all needs to live in one place, not multiple spreadsheets.
    
    **Liv Galloway:** Yeah. This is going to take into account statics and videos, right?
    
    **Christopher Ogle:** Correct,
    
    **Liv Galloway:** correct. My fear is I have no idea how we would go about sunsetting the creative performance spreadsheets because we reference them
    
    **Christopher Ogle:** every
    
    **Liv Galloway:** single day, all day, every day. I don't know how those would go away unless we keep those super duper simple. No, that's still not gonna
    
    **Christopher Ogle:** work. Or we could just add all of the creative performance spreadsheet data into additional tabs here
    
    **Liv Galloway:** down
    
    **Christopher Ogle:** the bottom.
    
    **Liv Galloway:** That's
    
    **Chris Fleeks:** gonna
    
    **Liv Galloway:** be. That's
    
    **Chris Fleeks:** gonna
    
    **Liv Galloway:** be a lot of tabs. That's gonna be a lot of tabs. Even if we hide the inactive funnels, that's the tabs for inactive funnels. And of course, anything that is an inactive funnel, we don't need to like retroactively put it in here, I don't think. But I could be wrong. Because if all of a sudden we have a WPSS ad that's performing super well unless we turn it into a DQFE ad, there's just. I'm worried about the amount of duplication, even with Claude code helping out here, just because there's no reason to have the information in three places. It was, it was.
    
    **Christopher Ogle:** It's like
    
    **Liv Galloway:** the whole reason we. Sunset airtable. So I'm trying to noodle on this in real time. My brain is failing me.
    
    **Christopher Ogle:** What's. That's all right, what's the. So what is the. And I, and I know this is probably not something you could answer
    
    **Chris Fleeks:** straight
    
    **Christopher Ogle:** away, but what is the most important information that you need from the creative performance spreadsheets on a daily basis?
    
    **Liv Galloway:** Add IDs when we create expansions.
    
    **Christopher Ogle:** Add IDs when we create expansion. Okay, well, so that would all live in here.
    
    **Liv Galloway:** You're talking about taking every single creative performance spreadsheet and taking all of the historical data and putting it in here.
    
    **Christopher Ogle:** We could put all of the historical data in there. Yes,
    
    **Chris Fleeks:** but
    
    **Christopher Ogle:** I would say that that would be a step that we would do later. We would. Once this is done and this is built and we see that it's actually functioning and it's generating a return on investment and it's something extremely valuable, which I know it will be.
    
    **Liv Galloway:** Right.
    
    **Christopher Ogle:** That's when we start to say, okay, look, the creative performance spreadsheets are there for tracking purposes of data. The data, not spend data, but just
    
    **Chris Fleeks:** the
    
    **Christopher Ogle:** asset data, the URLs, those sorts of things. Okay, this is for us to make strategic decisions on which ads to test next. Okay, so one is for operations and the other one is for performance. And in the beginning, well, this one here is going to be fully automated from the get go. Like, there's going to be very, very little manual work required from this. It's literally going to be, okay, you download the CSV, you upload the CSV and you run the script and the strategic scanning system does its thing,
    
    **Liv Galloway:** all
    
    **Christopher Ogle:** automated. The creative performance spreadsheets are still manual. And once this is up and running and automated and functioning, then that's where I would say let's get together and let's talk about how we can use CLAUDE code to actually automate the creative performance Spreadsheets, So it's not manual. For example, if, if you have data that's being entered into ClickUp. Well, I asked this question before. Can that data just be housed within ClickUp? If not, it needs to be in a Google sheet, which I totally understand for. If we ever get off ClickUp and all those different
    
    **Chris Fleeks:** things,
    
    **Christopher Ogle:** then we would need to make sure that we set up an automation so that as soon as someone moved that ad from approved or whatever it was, it would trigger the automation into Facebook, the
    
    **Chris Fleeks:** creative
    
    **Christopher Ogle:** performance spreadsheet for that data to be entered into the Creative Performance spreadsheet with zero human interaction.
    
    **Liv Galloway:** Love that. I just popped into the chat. The template, do you mind opening that on your screen real quick?
    
    **Christopher Ogle:** Template. Yep, one second.
    
    **Liv Galloway:** Google Chat too.
    
    **Christopher Ogle:** Yeah, yeah, for sure. Because let me, let me tell you guys, like in, in two weeks, in the next two weeks to two months, every single human, like, action that we take, we're going to be questioning whether it's necessary anymore.
    
    **Liv Galloway:** And
    
    **Christopher Ogle:** I know that kind of sounds a bit crazy, but it's
    
    **Liv Galloway:** like,
    
    **Christopher Ogle:** and you're the queen of order. Like you've been doing this for a long time, Luke. Like, you get it, you understand it. The automations now are beyond us. Setting up an automation within a software automation is now us going into Claude code and saying, this is exactly what I want to do. Now you're going to tell me how to do it. And when you tell me how to do it, then you're actually going to go and do it and you're literally watching it on your screen go in and make changes and write scripts and everything for you. So that when you have the script, that's the language for the computer to say, okay, every time you want me to do something, I'm going to refer to this script and I'm going to run that task. And so the automation then kicks in whenever you switch it across to Approved or whatever it is that you do, that triggers not just the automation, but it triggers the script and then the machine goes in and enters the data for you as if it was a human.
    
    **Liv Galloway:** Yep,
    
    **Chris Fleeks:** it's
    
    **Christopher Ogle:** mind blowing. It's absolutely mind blowing. And it's here now and it's right around the corner for all of us. So that's where I don't see there being an issue with us having creative performance and strategic scaling. I think it's either going to live all in one place or if it's not going to live all in one place, then at least your issues of having to input data manually is going to be resolved
    
    **Chris Fleeks:** in
    
    **Christopher Ogle:** the long term anyway. So. Okay, Template up on the screen.
    
    **Liv Galloway:** Yeah. Because looking at this, what, what we are mostly using, I'm just. Bear with me because I'm just. My brain's moving faster than my mouth. So what Creative Ops needs these spreadsheets for is to keep track of our AD IDs and our parent IDs and then the name and the angle. But
    
    **Christopher Ogle:** in the
    
    **Liv Galloway:** end, because we do have that data in ClickUp and it would be in this creative, in this scaling spreadsheet,
    
    **Chris Fleeks:** I
    
    **Liv Galloway:** don't know why we'd need the ad type, the ad format, the talent name, the copywriter, the editor. I don't know why we,
    
    **Christopher Ogle:** we don't
    
    **Liv Galloway:** need any of that anymore. Of course
    
    **Christopher Ogle:** I can't
    
    **Liv Galloway:** delete it from the existing sheets because we need that information to be ported over. But in the meantime,
    
    **Chris Fleeks:** does
    
    **Liv Galloway:** it make sense for us to even continue putting all this information in here or do
    
    **Christopher Ogle:** we
    
    **Liv Galloway:** use it for creating AD IDs and
    
    **Christopher Ogle:** then link
    
    **Liv Galloway:** it to the ClickUp task?
    
    **Christopher Ogle:** Yeah, so that, so that's a good question. We would need to make the high level strategic decision. That's why I'm always asking like, what's the purpose? What's the purpose of this? And
    
    **Chris Fleeks:** if
    
    **Christopher Ogle:** the purpose is just because. See, for me, the purpose of maintaining the creative performance spreadsheets
    
    **Chris Fleeks:** was
    
    **Christopher Ogle:** because I knew that if we didn't maintain them, there was going to come a time where we're like, whoops, there's a massive dark ages of data that we, that we didn't put in and
    
    **Liv Galloway:** now
    
    **Christopher Ogle:** we're missing all of this information. So
    
    **Liv Galloway:** when Renee and Alexa. Yeah,
    
    **Christopher Ogle:** that's right, exactly. And so we have all of that information, which is like, great, thank you for going ahead and improving it. But we still have all of that information in there. So now it's a case of what's the purpose of the creative performance spreadsheet moving forwards.
    
    **Liv Galloway:** Well,
    
    **Christopher Ogle:** if it's just to track the video id, parent ID and those sorts of things. Well, do we need a creative performance spreadsheet anymore, moving forwards, or can everything be done from within the Strategic Scaling System spreadsheet? And that's what I think,
    
    **Liv Galloway:** I
    
    **Christopher Ogle:** think,
    
    **Chris Fleeks:** and
    
    **Liv Galloway:** I think what we could do, especially since I think we're down to about, let's call it 10 active funnels
    
    **Chris Fleeks:** that
    
    **Liv Galloway:** creates 10 additional tabs. Let's call it 20. Because we're going to have statics. I wish that we could have statics and videos in the same tab, but that's maybe
    
    **Christopher Ogle:** so. Why not? Because because they, they're sequentially. It's all marked up as in you have video add one and then you'd have add two, add three and then you'd have image AD1, add two and then video AD4 and it would just, it would mucked up that way. Is that
    
    **Chris Fleeks:** the
    
    **Christopher Ogle:** reason why they're separated into different tabs?
    
    **Liv Galloway:** I truly have no idea why they separated into different
    
    **Chris Fleeks:** tabs.
    
    **Liv Galloway:** It doesn't make a difference to me. And I'm not sure if on your scaling spreadsheet you have a column for video or static, which would solve that as well, which
    
    **Christopher Ogle:** we have
    
    **Liv Galloway:** that click up if it's a video, if it's a static, if it's a
    
    **Chris Fleeks:** HTML5.
    
    **Christopher Ogle:** So we wouldn't. We would have a. Everything would be inside the same column and then we'd use a filter. So I would filter out. I would filter out any offer that I wanted to see, or I would filter out whether I just want to see images. So if we created a tab for every offer, which I think is important,
    
    **Liv Galloway:** we
    
    **Christopher Ogle:** would have all of the entries for the data, which would be automated. Okay,
    
    **Liv Galloway:** I'm
    
    **Christopher Ogle:** thinking future state here. ClickUp crucial for obvious reasons. As soon as all the data is input inside ClickUp, which again, we should be able to automate in the future. But let's
    
    **Liv Galloway:** just
    
    **Christopher Ogle:** one step at a time. All that data is input into ClickUp. Okay?
    
    **Chris Fleeks:** The
    
    **Christopher Ogle:** data is stored within ClickUp and it's sitting there, potent energy, ready to go. We trigger it with the automation of it's the ads approved or it's live or whatever the hell
    
    **Liv Galloway:** that
    
    **Christopher Ogle:** that would then trigger
    
    **Chris Fleeks:** the
    
    **Christopher Ogle:** script CLAUDE code to run and input that data into the strategic scaling system to the respective tab form for that offer. Then
    
    **Chris Fleeks:** within
    
    **Christopher Ogle:** that tab for that offer, it would know that the next available rows is where it should start inputting the next available scripts. The naming convention for the image and for the video is virtually the same, especially inside the new naming convention and the updates that I've got. Therefore, the script ID is no different to the. The image script ID is no different to the video script id, except for one thing, the fact that it starts with an I.
    
    **Liv Galloway:** Yep.
    
    **Christopher Ogle:** Okay, so the. All you have to do is go into that offer, let's say it's 3, 5, 7 and go up to the top corner, which is what you already. Where am I here? Into the. Pretend we're in the tab for this offer and we would go here and I would go image or video?
    
    **Liv Galloway:** Yep, perfect. That's
    
    **Christopher Ogle:** all I do. And
    
    **Liv Galloway:** then do me A solid and pop open the dqfe, Create a performance spreadsheet.
    
    **Christopher Ogle:** Sure. I don't think I have that saved in my
    
    **Liv Galloway:** I
    
    **Chris Fleeks:** got
    
    **Liv Galloway:** it.
    
    **Christopher Ogle:** Cookies. No, that's all right. I don't have it saved in my cookies. So I have to go through the
    
    **Liv Galloway:** slightly
    
    **Christopher Ogle:** longer dqfe.
    
    **Chris Fleeks:** There
    
    **Liv Galloway:** we
    
    **Christopher Ogle:** go.
    
    **Liv Galloway:** So scroll on down to the bottom for me.
    
    **Chris Fleeks:** What
    
    **Liv Galloway:** I think is this will turn into. The only thing
    
    **Chris Fleeks:** that we
    
    **Liv Galloway:** need is the video ad id, the parent id, the notes in the description, and then one column that is the link to the ClickUp task. Because all of the other information is in the ClickUp task.
    
    **Christopher Ogle:** Then that would all be within the ClickUp task and automatically added into the Strategic Scaling system
    
    **Liv Galloway:** spreadsheet.
    
    **Christopher Ogle:** Yeah, and let me just see if I can. For API connection error. I wanted to show you maybe on the fly how you could actually do this. Do you have live, like the top level permission to open a dock up and make it public like
    
    **Liv Galloway:** share
    
    **Christopher Ogle:** with anybody. Anyone can view a document. Can you make this viewable for anyone?
    
    **Liv Galloway:** It says
    
    **Christopher Ogle:** anyone
    
    **Liv Galloway:** in this group can. Can view.
    
    **Christopher Ogle:** No, that's Performance Golf. If we want claude code to do it, it needs to
    
    **Liv Galloway:** be. Oh, I got you, I got you.
    
    **Christopher Ogle:** So it'll. It'll have a second row that says anyone with the link can view.
    
    **Chris Fleeks:** Yeah,
    
    **Liv Galloway:** let me go to the folder. Let me go directly
    
    **Chris Fleeks:** to
    
    **Liv Galloway:** the Creative Performance folder. One second. Google Creative Performance. Share. Share
    
    **Chris Fleeks:** Performance
    
    **Liv Galloway:** Golf. Anyone with the link can view.
    
    **Christopher Ogle:** Anyone
    
    **Liv Galloway:** Performance Golf can view. So that's done. So now anything within the Creative Performance folder, within the advertising folder should now have the proper.
    
    **Christopher Ogle:** Yep, it's got the globe. If it's got the globe symbol on it. Perfect. Which
    
    **Liv Galloway:** also means
    
    **Christopher Ogle:** that
    
    **Liv Galloway:** ClickUp Brain will be able to access it now too.
    
    **Christopher Ogle:** Correct? Exactly. Awesome. All right, so let me just. Let me just do one thing here and see if I can
    
    **Chris Fleeks:** show
    
    **Christopher Ogle:** you this. How long is we. How much longer we got? We had 20 minutes. We got 20 minutes. Okay, cool. All right, let me. Let me see if I can do this really quick on the fly.
    
    **Chris Fleeks:** Hi
    
    **Christopher Ogle:** there. I need your help creating an automation so that when I enter in
    
    **Chris Fleeks:** a
    
    **Christopher Ogle:** value inside column C
    
    **Chris Fleeks:** of
    
    **Christopher Ogle:** the 2025 AD Scaling Framework v2.2, I want you to automatically take that data and, and move that data across into the second file that I'm going to give you, which is the Creative Performance spreadsheet for dqfe. I'm going to give you the links to both of these files and then I want you to go ahead and tell me that you are. When you are connected to Both of these files. And then I'm going to enter a value into column C. And then I want you to then tell me. I want you to then automatically enter that value into the Creative Performance spreadsheet for dqfe just to show my two colleagues here on the call that these two documents can speak with each other.
    
    **Chris Fleeks:** And
    
    **Christopher Ogle:** I think that's all I need to say. This one, this one. So that's that one. And then I've got this one and this one. Okay,
    
    **Liv Galloway:** That's exciting.
    
    **Christopher Ogle:** To be clear, I'm going to enter a value into cell C10 of the 2025 AD scaling frame framework. To be clear, I'm going to add a value into cell C10 of the 2025 AD scaling framework and I want you to enter this value into cell A 361 of the Creative Performance DQFE spreadsheet. Tell me when you're connected and I'm ready to enter the value. Okay, so I'm not touching anything.
    
    **Chris Fleeks:** Oh, I was just about to ask. Is it doing. Not this. That's crazy. Yeah. Was this the. Is this like a monthly subscription, Chris? Is it pretty? Like, is it like 30 bucks a month or something?
    
    **Christopher Ogle:** That's a good question. I can't remember how much the subscription is because I just went through the instructional videos from
    
    **Chris Fleeks:** Ben
    
    **Christopher Ogle:** and Donnie.
    
    **Chris Fleeks:** Oh, okay.
    
    **Christopher Ogle:** Got. Got hooked up with it. So yeah,
    
    **Chris Fleeks:** yeah, if you could send me
    
    **Christopher Ogle:** some
    
    **Chris Fleeks:** videos or something on it, that would be awesome. I get. I've been getting ads for this Claude code from recently.
    
    **Christopher Ogle:** So let me. Because I want to split these into. I
    
    **Chris Fleeks:** want
    
    **Christopher Ogle:** to split these into two windows so you could see it in real time. But.
    
    **Chris Fleeks:** Okay, what
    
    **Christopher Ogle:** I'm going to do is I'm just going to enter this. Let's just say it's. What's the next available ad id? DQFE37. Right. DQFE-D37. Okay, now I'm going to click off here. And. Okay, I've now entered the value. Now what I'm going to do is I'm going to go over to here and it should add this value into a360 one without me doing anything I can. Okay, ready? I'm going to hit enter. And here are my hands.
    
    **Chris Fleeks:** Vibing.
    
    **Christopher Ogle:** Oh, I think I know why if I don't have. Oh, because it doesn't have editing access.
    
    **Liv Galloway:** So
    
    **Christopher Ogle:** make an edit to the spreadsheet. If it doesn't have editing access.
    
    **Liv Galloway:** Let me
    
    **Christopher Ogle:** think that would need to be opened up. So. One second. Let me give you editing. Oops. Access.
    
    **Liv Galloway:** With the link on The Internet can edit, but sign in is required.
    
    **Christopher Ogle:** That's fine because it's going from my account.
    
    **Liv Galloway:** Okay, perfect.
    
    **Christopher Ogle:** Let me try this again,
    
    **Liv Galloway:** see if that works.
    
    **Christopher Ogle:** So it does take a bit of time. Like sometimes I'll set it to do tasks and then I'll just go off and do something else. And it works along in the background. Because it has some thinking to do, and it's got to go in and
    
    **Chris Fleeks:** step
    
    **Christopher Ogle:** by step and go into the right cell and open up the right thing. So it does take some time, but that's why it's important when you're doing these tasks. In the beginning, it takes a little bit of time to get the structure set up. But then once you get the structure set up and all the formulas and everything are all done correctly, then you just run the automated script and it just sits in the background and it just does it while you're playing golf or. But this has been. It's been really good to create these, what are called skills,
    
    **Liv Galloway:** which
    
    **Christopher Ogle:** are essentially files that
    
    **Chris Fleeks:** teach.
    
    **Christopher Ogle:** They're like agents in that they. You teach them a certain skill and they have a master agent, like, okay, whatever, add copywriting bot. But then it's trained on specific frameworks of copywriting. So you get all that data and you upload it and then it just gets, you know, like Neo in the Matrix when
    
    **Chris Fleeks:** he
    
    **Christopher Ogle:** learns Kung Fu. Exactly. And so you start teaching it these different skills, and then
    
    **Chris Fleeks:** it
    
    **Christopher Ogle:** has this skill set and then you train it on what's called a PID file, which I'm still learning exactly how these work, but I don't get any connection error. Serious. Try this one more time. I have been having these Internet issues today because of these storms and power outages. It might have something to do with that,
    
    **Liv Galloway:** but
    
    **Christopher Ogle:** we'll see. Because all of these updates to the strategic scanning system that you see in here were all done by
    
    **Chris Fleeks:** this
    
    **Christopher Ogle:** Claude code. I didn't do these manually. It updated all these columns and
    
    **Chris Fleeks:** all
    
    **Christopher Ogle:** the values and everything while that's loading. Let me just show you quick. Actually, no, that's not necessary. But I wanted to just circle back on the naming convention. Go ahead and share the update permissions. Done. Proceed. Okay, so if I go to here. Go to here. So this is. This software is called Obsidian, and this is like a notes bi directional note taker. So
    
    **Chris Fleeks:** you
    
    **Christopher Ogle:** can
    
    **Chris Fleeks:** you
    
    **Christopher Ogle:** store all of your notes in here. And then we have what's called the Source Vault, which is Donny and Ben created. And it's all about shared bots and agents and notes and Everything. And this is kind of where it gets information from. So you can create a. For example, you see. Yeah, that's right. Let me just find what I'm looking for here. Strategic scaling system. Strange. I don't know what's going on here because I have my content creators roster, ad performance spreadsheets, creative performance spreadsheets,
    
    **Chris Fleeks:** ad
    
    **Christopher Ogle:** angle libraries. Some of this data is gone. Yeah, I'm gonna have to investigate that. Sorry. Some of my. My data's been removed because I asked it to. Yeah. With these API error connections. I think it's actually gone ahead and deleted some of my, my files, which I have to have to figure out.
    
    **Chris Fleeks:** Yeah,
    
    **Christopher Ogle:** I went through and created a markdown file with this PG naming convention, and I can't find it now. Well, I've got to ask Donny about that.
    
    **Chris Fleeks:** So it like removed it, you think, to make space to run this or something?
    
    **Christopher Ogle:** I. I don't think it removed it to make space. I think it just. It was in the middle of. Was in the middle of working on it. Like, it's here.
    
    **Liv Galloway:** It's
    
    **Christopher Ogle:** all here. Like you can see, this is like, this is markdown. So it's. It looks different to what it looks like here. Let me just put it into here one second. So you can see it a little bit better. So scanning acquisition system, Strategic scaling.
    
    **Chris Fleeks:** And
    
    **Christopher Ogle:** then grab this file from here. Naming convention updated. Now it's not finding it there. Okay, so that's it. And now it should find it. It's there. Here it is. Okay, so this, this is the naming convention update. Okay, so you can see this. Now
    
    **Chris Fleeks:** you
    
    **Liv Galloway:** can
    
    **Christopher Ogle:** see. Cool. So performance golf add naming Convention update updated v2. I think this is the one. Yeah. Because it's got talent. Talent. Create a short code. Yeah. Okay, so basically these are like,
    
    **Chris Fleeks:** we
    
    **Christopher Ogle:** just get the cameras back on here. Cool. So these are basically the rules, like how this works, how this functions, right. So the computer knows and when it runs these actions, these scripts that will live as like another markdown file so that when we tell it to do something, it'll always reference back these rules to make sure that it does things correctly, just like any human is supposed to. Anyway, so you've basically got. Okay, here are the positions by index. You've got funnel, script id, variation id, platform, dimensions, length, tier, ad category, all these different. All these things that we know, right? Script ID format rules. 0 or 1 numeric is a video. Okay, so 0003 is a video, 1042 is a video. But we haven't had up to 1000 ads yet. Right. So images and I for image and HTML, I was thinking live would be an H. Okay. So if it's a HTML ad, it would be H001, like an image.
    
    **Liv Galloway:** So I already updated the naming convention document a couple weeks ago with that. The one
    
    **Christopher Ogle:** thing I
    
    **Liv Galloway:** want to call out before we go any further is the naming convention document that was most recently updated does not have a talent code
    
    **Christopher Ogle:** or
    
    **Liv Galloway:** something else that I saw.
    
    **Christopher Ogle:** And that's because that's, that's what I've been doing this, this week, is updating a version to then show to you, to talk with you about
    
    **Liv Galloway:** it,
    
    **Christopher Ogle:** so that we get one centralized updated version, which is going to be this. But right now it's written in markdown.
    
    **Liv Galloway:** We
    
    **Christopher Ogle:** can create a nice pretty Google Doc and make it look nice and share it out with everybody but the. The P. Yeah, because this, this is the naming convention update. This is the Google Doc that we're all working off right now. This is all going to be updated with this. Okay? So
    
    **Liv Galloway:** you'll
    
    **Christopher Ogle:** see, yeah,
    
    **Liv Galloway:** you'll
    
    **Christopher Ogle:** see all the updates. So, net new, vertical, ver, H R. So, Chris, this is where we're talking about naming conventions. Okay?
    
    **Chris Fleeks:** So
    
    **Christopher Ogle:** nnmu, okay, These are going to be the codes. Scroll stopper, refresh, SSR duration, dur, environment, env, similar, presenter, sp, etc, etc. Okay? If it's not applicable, for example, a net new does not have an expansion type because it's a net new.
    
    **Chris Fleeks:** So
    
    **Christopher Ogle:** it's automatically going to label that with xx.
    
    **Chris Fleeks:** And
    
    **Christopher Ogle:** what that's going to do is that when the AD ID goes into the strategic scaling system, the XX automatically tells the spreadsheet to not enter the value in the dropdown, just to leave it blank. So then that's what I wrote here. So when the category is this, this net new or net new mashup expansion type must be xx. Okay, Then you've got podcast, telly slash, Ronin. And this was where I was up to slice. And this is supposed to be slice and dice. It made an error here, B roll or aivo. Okay, Then you've got the talent codes, which were taken from the content creators roster. So every single person who has talent, who's a talent right now already has a code that lives within this content creators roster over here in talent codes. See this? I didn't know that. So everyone's got a short code. So I basically trained it on all the short codes of all of the talent already. Okay. Instead of going and trying to create new codes for everybody, which we can do to make them shorter.
    
    **Chris Fleeks:** I
    
    **Christopher Ogle:** figured that it would just run on the one that we've already got. But if we do want to update them to make them shorter, for example, the first two letters and the first last letter, the first two letters of the first of the first name and the first two letters of the last name. We could do that. Okay. To make it short, then you've got the editor codes, then you've got the copywriter codes, then you've got the promo codes, and then you've got examples of what it's going to look like. You can see here, this would be a. This needs to work because it's pulling off old data. But this is where it's all going to. And this is where I have a conversation with it, where I talk with Claude code and I say, okay, this is incorrect. Please update that literally goes in and changes it in real time.
    
    **Liv Galloway:** But
    
    **Christopher Ogle:** what it will get is a version where it's like, okay, we have a net new that has a code that is like this. Okay. SF1V21.
    
    **Chris Fleeks:** Sorry,
    
    **Christopher Ogle:** SF121V1. YouTube 16x9 360s it's a horizontal. That should be Net news is where it's incorrect. It'd be nn, XX dash. And then it would go into the asset type and then the talent, and then the editor, and then the copywriter that would all live inside the naming convention. And then that asset ID would then be pulled from the data
    
    **Liv Galloway:** into
    
    **Christopher Ogle:** the cell and then it would automatically just put all the. The correct data in all those columns. Okay,
    
    **Chris Fleeks:** good question, Chris. That last number, I assume like that's the.
    
    **Liv Galloway:** The
    
    **Chris Fleeks:** date. Is that the date that it goes live or like it's post published?
    
    **Christopher Ogle:** That's the date created. Is that
    
    **Chris Fleeks:** correct? It created
    
    **Christopher Ogle:** the date the asset was created. That's what it said inside the naming convention. Update over here.
    
    **Chris Fleeks:** Okay.
    
    **Christopher Ogle:** Oops. Creation date.
    
    **Liv Galloway:** Date.
    
    **Christopher Ogle:** The asset is finalized and handed to Creative Ops. Not the launch date. Is that right? Liv,
    
    **Liv Galloway:** I'm so sorry.
    
    **Christopher Ogle:** Oh, did you. Were you doing something else?
    
    **Liv Galloway:** No, just. I've lost my video feed. Where did it go?
    
    **Chris Fleeks:** I
    
    **Liv Galloway:** can hear you guys and I can't see you. What
    
    **Christopher Ogle:** is
    
    **Chris Fleeks:** here?
    
    **Liv Galloway:** Oh, hi. Hello. Okay,
    
    **Chris Fleeks:** sorry.
    
    **Liv Galloway:** Yes, the date. The
    
    **Christopher Ogle:** asset
    
    **Liv Galloway:** should be finalized and handed to Creative Ops. Not the launch date. That is correct.
    
    **Christopher Ogle:** That's the creation date. Yep. Cool. So that would be the creation date. All right, so all of that information would then be. Would then be fed and then
    
    **Liv Galloway:** if
    
    **Christopher Ogle:** the media team made adjustments and this is another small detail, but let's say they did scaling asset where they duplicated the campaign and they made a scaling campaign. That asset would be labeled with an S at the end for scaling so that we can identify scaling assets apart from
    
    **Chris Fleeks:** the
    
    **Christopher Ogle:** testing.
    
    **Chris Fleeks:** Testing
    
    **Christopher Ogle:** assets.
    
    **Liv Galloway:** Yep.
    
    **Chris Fleeks:** And
    
    **Christopher Ogle:** that way. Yeah, so. So I think I'm going to stop off there because you can see there's still a little bit of work left to do. But it's.
    
    **Chris Fleeks:** There's
    
    **Christopher Ogle:** progress in the sense that I'm almost there. I've just got to get these, this markdown file correct and the instructions correct, get the formulas pulled into the strategic setting system spreadsheet
    
    **Chris Fleeks:** and
    
    **Christopher Ogle:** then once that's in there, then we're able to start up. We've got to make the changes to the naming convention. We've got to align on that. So pull you together to talk you guys through that. And then once we're all aligned on the naming convention, that's the single most important thing because that's the data that everything's going to run by and then we start upload, updating the naming convention for all the ads. Moving forwards. This is not a retroactive thing.
    
    **Liv Galloway:** If
    
    **Christopher Ogle:** we want to go back retroactively, it's just going to have to be manual for a little while, which is. We can do that. But this is about moving forwards. Then These new asset IDs are going to be inserted into the asset ID section here and then that's automatically going to update all of these and then that's going to start to be tied to spend and then we're going to be able to figure out that okay, this particular type of expansion is getting the most spent.
    
    **Chris Fleeks:** Okay,
    
    **Christopher Ogle:** in six months time that's all going to be tracked so that we know what the next best tests are to do. And even for each asset we'll be able to look and say, hey, DQFE Script 12 with Marissa. What haven't we done?
    
    **Chris Fleeks:** Well,
    
    **Christopher Ogle:** we haven't done a
    
    **Chris Fleeks:** horizontal environment
    
    **Christopher Ogle:** change. Can see on this.
    
    **Chris Fleeks:** It's
    
    **Christopher Ogle:** on the strategic scale. It says that we haven't done that type of test yet.
    
    **Chris Fleeks:** So
    
    **Christopher Ogle:** let's go and do that next. All that stuff's going to be in there.
    
    **Chris Fleeks:** So this is, this is incredible. Chris. I have to, I have to jump.
    
    **Christopher Ogle:** Yeah, I know you got
    
    **Chris Fleeks:** to jump, but I pre. Like, this is amazing. I look forward to that digging more into it, but
    
    **Christopher Ogle:** appreciate
    
    **Chris Fleeks:** you putting this together. Yeah. Chris,
    
    **Liv Galloway:** can
    
    **Christopher Ogle:** you share
    
    **Liv Galloway:** that spreadsheet with me just so that I have reference to update a couple of my fields in ClickUp?
    
    **Christopher Ogle:** Yes, sure. Let me.
    
    **Liv Galloway:** I won't edit Anything in there. I just need, like, view access.
    
    **Christopher Ogle:** Yeah, sure. Send that over to you. So, Yeah, so there's. There's this one that I'm working on. Just don't share that out with anyone else yet. So I'm still. Still working on that. And then you've got this content creators roster in here as well, which you asked for.
    
    **Liv Galloway:** Yes, thank you. I've
    
    **Christopher Ogle:** been asking
    
    **Liv Galloway:** for that. Oh, thank you, thank you, thank you, thank you.
    
    **Christopher Ogle:** Cool.
    
    **Liv Galloway:** Yeah. Because I feel like, well, I mean, technically, content creators should probably fall with our, like, influencer manager or something once we have that person, but in the meantime, it's vendors, and I am supposed to be managing vendors. I can never get out of marketing. No, but I echo fleeks. This is incredible.
    
    **Christopher Ogle:** Even
    
    **Liv Galloway:** the small updates that I can make to the creative performance spreadsheets today to save Fatima some time is gonna be a huge unlock. So once we're ready to start kind of porting things over, we can talk through that. But this is going to be incredible. Amazing work.
    
    **Christopher Ogle:** Awesome. Thank you. So just give me until this time next week and this will all be finished. I was aiming to have it finished by today, but it'll definitely be finished by this time next week. And when I say finish, I mean I'll be. The next call that we'll have, I'm hoping will be the call where we all look together at the new naming convention. I'll walk everyone through this and then. Sorry, just let me. I'll let you go and I'll
    
    **Liv Galloway:** sync
    
    **Christopher Ogle:** with you next week. That's my partner and daughter coming home.
    
    **Liv Galloway:** No worries.
    
    **Christopher Ogle:** So
    
    **Liv Galloway:** great
    
    **Christopher Ogle:** to have you on the call and I'll be in touch.
    
    **Liv Galloway:** All right, perfect. Have a great weekend.
    
    **Christopher Ogle:** Thanks, Liv. You too. See ya.