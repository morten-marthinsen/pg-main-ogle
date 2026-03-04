# Jeff / Christopher | Quick Sync - 02/20/2026

**Date:** February 20, 2026
**Source:** ClickUp AI Notetaker

---

**Attendees:** Jeff Logue, Christopher Ogle
[https://t9014714949.p.clickup-attachments.com/t9014714949/e0c57098-abae-4b87-a946-6120f0b560d3/e0c57098-abae-4b87-a946-6120f0b560d3.mp4?view=open&filename=Jeff%20-%20Christopher%20%7C%20Quick%20Sync%20-%2002-20-2026.mp4](https://t9014714949.p.clickup-attachments.com/t9014714949/e0c57098-abae-4b87-a946-6120f0b560d3/e0c57098-abae-4b87-a946-6120f0b560d3.mp4?view=open&filename=Jeff%20-%20Christopher%20%7C%20Quick%20Sync%20-%2002-20-2026.mp4)
### Overview

The meeting focused on addressing the mapping issues between the golf quiz’s survey questions and the underlying data dictionary fields, ensuring alignment across platforms and data consistency for marketing and product insights. Participants discussed potential adjustments to standardize response values, improve survey wording for beginners, and outline technical integration requirements.

### Key Takeaways

*   The team agreed to review and validate the current mapping suggestions against the live data dictionary to decide if new standardized values or additional fields are necessary.
*   It was determined that survey question wording should be refined—such as adding follow-up questions and possibly merging similar fields—to enhance user experience and data accuracy.
*   The group emphasized the need to update API documentation and secure proper admin access to maintain seamless integration with the data lake when survey services change.
*   Collaboration with Brixton and the development team was highlighted to ensure timely implementation of the suggested modifications.

### Next Steps

- [ ] **Christopher Ogle**: Review the current mapping document against the live data dictionary and provide feedback on whether to add new standardized values or create new fields. _(Due: Monday)_
- [ ] **Christopher Ogle**: Add Jeff Logue to the Quiz Channel and coordinate with Brandon to secure an admin login for the quiz system.
- [ ] **Jeff Logue**: Collate the feedback from the mapping review and share updated notes with Brixton for further action.
- [ ] **Jeff Logue**: Confirm API documentation details with the development team and ensure that the survey remains properly linked to the data lake during system updates.
### Key Topics
*   **Survey Mapping and Data Dictionary Alignment** Problem
    *   Jeff Logue presented an overview of the survey questions and explained how some questions are inadvertently mapped to multiple data dictionary fields (e.g., combining primary focus and primary flaw).
    *   Jeff highlighted that while the current system uses a fixed set of values, the mappings may not fully align with how data is captured across the app and web, impacting the recommendation engine.
    *   He demonstrated the current flow using a shared document and screen share to show the live data dictionary and mapping examples.
    
*   **Standardization of Field Values and Flexibility in Data Collection** Idea
    *   Jeff explained that although existing fields have standardized values, there is flexibility to update them or add new values as business needs change.
    *   There was discussion on whether to adjust the current mapping by adding new values to existing fields or by creating completely new fields to better capture survey responses.
    *   This topic emphasised ensuring consistent data for LTV analysis and marketing recommendations.
    
*   **Survey Question Wording and Flow Adjustments** Idea
    *   Christopher suggested revising the survey to include a follow-up question immediately after choosing an area to improve, aimed at clarifying what might be hindering that improvement (e.g., asking about specific swing faults).
    *   The discussion addressed the need for simple, positive phrasing to ensure beginners can relate to the survey, reducing the potential confusion from technical terms.
    *   They compared questions about past learning experiences versus preferred future learning methods and discussed whether to maintain or combine these queries.
    
*   **Emerging Trends and Potential New Data Fields (Golfer Self Identity)** Idea
    *   The possibility of introducing new data fields, such as one capturing 'golfer self identity', was discussed to align with emerging trends in the golf industry (e.g., simulator golf, varying playing environments).
    *   Christopher mentioned the benefit of capturing data on how users view themselves as golfers rather than solely relying on traditional skill-level metrics.
    *   The discussion noted that such fields could provide more nuanced data, potentially improving targeted marketing and personalized recommendations.
    
*   **API Documentation, Service Integration, and Admin Access for the Survey Platform** Problem
    *   Jeff emphasized the need for proper API documentation to ensure that when new surveys or services are deployed, connections to the data lake are maintained without disruption.
    *   There was concern about potential issues when switching or duplicating survey services, which would require re-linking components (with Deb handling API integration).
    *   The need for an admin login and ensuring correct access (via Brandon or existing admin accounts) was discussed to facilitate smooth operation of the quiz platform.
    
*   **Next Steps and Follow-Up Actions** Decision
    *   Jeff requested Christopher to review his mapping suggestions using the live data dictionary and provide feedback on whether to amend existing fields or add new ones, with feedback expected by Monday or Tuesday.
    *   It was agreed that notes on recommended field adjustments or the decision not to capture certain data should be documented for future reference.
    *   Christopher agreed to join the Quiz Channel to address the admin login issue and ensure proper API linking, and he mentioned coordinating with Brandon and Brixton for further action.
    *   Jeff noted the need for rapid progress as Brixton is eager to see these changes implemented, underscoring the urgency of resolving the mapping and integration issues.
    

*   Transcript
    
    **Jeff Logue:** Or
    
    **Christopher Ogle:** going
    
    **Jeff Logue:** to be an issue long term. I think it's just something that, hey, it's. It's good to know moving forward and as we build new features. So I'm going to share all this with you. I put together a doc as well which will be hopefully very easy for you to follow along. Here, put that into Google chat for you. Oh, that's so weird.
    
    **Christopher Ogle:** Are
    
    **Jeff Logue:** you seeing my. Is there an onboarding doc that's showing as a part of the Google call?
    
    **Christopher Ogle:** Sorry, just trying to get my screen working there. You mean in the. There it is in the chat. No,
    
    **Jeff Logue:** yeah, just in the Google experience right now. Are you seeing like a Kevin onboarding document?
    
    **Christopher Ogle:** No, no, I'm going to be seeing the us
    
    **Jeff Logue:** and the
    
    **Christopher Ogle:** note takers.
    
    **Jeff Logue:** This is so bizarre. I'm going to share my screen and just show you. I've never seen this happen before.
    
    **Christopher Ogle:** Okay, now I can see.
    
    **Jeff Logue:** Yes.
    
    **Christopher Ogle:** Kevin on
    
    **Jeff Logue:** the right
    
    **Christopher Ogle:** and we're on the left.
    
    **Jeff Logue:** Yeah, I don't know how that snuck into the tab. That is the wildest thing I've ever. That's so crazy. Okay. Anyways, okay, so this is the dock. Pop it in here for you.
    
    **Christopher Ogle:** Okay.
    
    **Jeff Logue:** All right. And let me know when you're good and I'll kind of step through what I've seen so far and then you can
    
    **Christopher Ogle:** probably
    
    **Jeff Logue:** correct me on a couple things that maybe don't align with what you would expect.
    
    **Christopher Ogle:** Okay, cool. Yeah.
    
    **Jeff Logue:** So what we're looking at here is obviously your survey questions on the left hand side and then your
    
    **Christopher Ogle:** answers
    
    **Jeff Logue:** that are being used. Right. And then a screenshot which that'll be offered to Brixton and Todd as we kind of talk through some of these things. So they're, they're aligned as well. What I have here on the right hand side is what our data dictionary field is. What that means is our database, the field that most closely aligns with what you're trying to collect here that currently exists. And the current values that can be collected for that field doesn't mean we're limited to those. It's just that's where we were currently at. So
    
    **Christopher Ogle:** when
    
    **Jeff Logue:** you look at. Choose the first area you want to improve question. It's a good example where this is what I mean about we have a mapping issue. So your question is ironically hitting on two different fields. Whereas in like the app and the web, we would, we would break it out into two separate questions. You have your primary focus, you have your primary flop. Again, we're not like,
    
    **Christopher Ogle:** we
    
    **Jeff Logue:** are not stuck in using those, you know, for, like, we have flexibility to change what we're doing, and it just would. It would require for us to kind of update, make some updates on the app and the web, for example, to align with what we're doing as a business. So the definition may change, and that's okay. But currently, this is what we do. So you're saying, hit my target, stop slicing, short game, solid contact distance, mental game. So you can see where strength in my mental game would align with mental game course management, which is primary
    
    **Christopher Ogle:** focus.
    
    **Jeff Logue:** But then you say, stop slicing, which is primary flaw, slice. So then what I would be forced to do is say, okay, from Chris's survey question, I need to take from an API call, I'm going to grab the answers to those questions and then I'm going to map XYZ to primary focus and then ABC to primary flaw. That may not be what we're trying to do here, because what happens is you're asking one question, but in my world, it's actually two questions. Right. So that's one example. Now, we could add new values to any. To either of these fields. Where we run into issues is if one experience is pulling values in a certain way and one. One system is doing another. When it comes to offering recommendations, the reason we need standardization is when LTV team wants to send a recommendation for somebody who struggles with a slice, it knows exactly what it's referencing in the database, and then it pulls that information to say, this person struggles with slice, hook, green side, bunker, whatever. These may or may not be the best values. This is what we started with. Aaron kind of built these definitions. In the beginning, we never had a team call with multiple stakeholders which was like, hey, what does everyone want to do here? So again, there's going to be some flexibility in terms of if the definitions need to change. Brixton is probably going to push back and say, hey, I. I don't agree with xyz. I'd rather this.
    
    **Christopher Ogle:** Yep,
    
    **Jeff Logue:** that's gonna.
    
    **Christopher Ogle:** What's
    
    **Jeff Logue:** that? What's that? What it's going to do is create some waves across the experience where. Okay, now the app and web has to go back and rethink through some things, maybe change an answer to a question. When it comes to the recommendation engine, we'd have to just kind of shift a little bit to match. Okay, so that's
    
    **Christopher Ogle:** like, that's
    
    **Jeff Logue:** what the current problem that we're facing.
    
    **Christopher Ogle:** Okay, awesome. So thank you for the context. So would it resolve the problem if I added a question or we added a question directly after? Choose the first area you want to improve and the question was essentially, what's holding you back from that or what is your biggest swing floor? Something to that effect. I'm trying to keep the language as simple as I can
    
    **Jeff Logue:** because
    
    **Christopher Ogle:** like I mentioned in my message, I, I'm concerned that there are some beginners who might not even be at the point of thinking they have a swing floor. They're just so new to the game that their type of thinking is like, oh, I can't do this is holding me back or this is getting in my way type of thing. So if we ask the question directly after. So let's say for example, I change, stop slicing to hit the fairway or hit more fairways. Right. So all of those are positive things. My targets I'd have to figure out like hit my targets would be more like hit the greens or something like that. Hit more fairways, sharpen my short game, make solid contact, boost my distance, strengthen my mental game. They're all positive leaning things
    
    **Jeff Logue:** and
    
    **Christopher Ogle:** that would fit in with primary focus. And then the next question after that is like, well, what's holding you back from that? And then if they clicked hit my hit the fairway, then we would go into, okay, what's holding you back from that? A slice, a hook or this or that. And then they would choose their primary floor or reason why they're not hitting the fairway. And same thing for contact. It would be fat shots, thin shots, whatever. Short game would be chunks, blades, bunkers, whatever. And each one of those would have a swing floor for that respective primary focus. Would that help to. Totally
    
    **Jeff Logue:** would.
    
    **Christopher Ogle:** Nice.
    
    **Jeff Logue:** What we needed a line on is if you feel like there's a value in here that's not going to align with what hit my targets. For example, if you're like, well, that doesn't really align with one of the values, we can easily add a new value. I just need to know what that value is. Okay.
    
    **Christopher Ogle:** Yeah,
    
    **Jeff Logue:** and that's. We could work out of this sheet where you could just leave your notes and thoughts of, okay, this is what I'm doing. This is what we would need as far as values is concerned. And we just need to make sure they're, you know, like a standardized type of value like you see here, right in this list. And then I can go to Dev and say, let's add these values in when we capture it and somebody answers this. On Chris's survey, you are populating primary focus value
    
    **Christopher Ogle:** xyz.
    
    **Jeff Logue:** Okay, so that's,
    
    **Christopher Ogle:** that's
    
    **Jeff Logue:** how this
    
    **Christopher Ogle:** will
    
    **Jeff Logue:** work. Brixton will probably have feedback after I message him today. He's very enthusiastic about going after this right now. So
    
    **Christopher Ogle:** this
    
    **Jeff Logue:** will be a big focus of mine. But yeah, just want to make sure we're aligned as far as that goes. The next
    
    **Christopher Ogle:** thing over
    
    **Jeff Logue:** with you is
    
    **Christopher Ogle:** he
    
    **Jeff Logue:** didn't ask for these things. But since we're already doing the work, we should probably start thinking this way as a team. Like anytime we do a survey, if we're collecting somebody's email like you are, then we should take as much of that data as possible and put it into our data lake. Right. So that we can use it for the future. So
    
    **Christopher Ogle:** what's
    
    **Jeff Logue:** the best way to help you learn? All right, so that's as closely aligned to learning style. And you can see what we have here. A lot of things that kind of map probably some new values that need to be created. We just need to know what those are. How do you prefer to improve your game? This one's a little tricky because to me it's similar to this question above, except it seems like it's future thinking. Where are you trying to get to? So we could tie that into what's called golfer goal.
    
    **Christopher Ogle:** But
    
    **Jeff Logue:** when you look at golfer goal in our dictionary, it's not really aligned with what you're doing here. So you can see these are our values. And I'll share this again with you. This data dictionary, what you can do is if you just go to the live section. So at the very top, you just click live. You can see all the fields that we're collecting and what the values are. So you may not agree with my thoughts on. Okay, I think this aligns with this. But you may say, no, I think it's more. I'm trying to ask this question, let's just add values to that field. Or we might say, let's create a new field. This seems like something completely net new. Totally fine as well. So
    
    **Christopher Ogle:** again, on
    
    **Jeff Logue:** this one, I'm thinking, all right, this seems to be future thinking. If you look at golf or goal, golf or goal currently has these as values like breaking 100 consistently or improving short game or hitting irons. Pure Right. Those are the future thinking things that they're going after. Yours are a little different. Like, okay, I think I prefer to improve by connecting with one on one coach. So it's more like a learning habit. That may be a new field. Right. I
    
    **Christopher Ogle:** don't know.
    
    **Jeff Logue:** That's. That's kind of. That's what we need to kind of think through. Is it the right question to ask should we. Should we change the question or keep what you want to ask and then maybe evolve it into a new field? Okay, that's what we need to kind of decide there. Interesting.
    
    **Christopher Ogle:** There might even be an opportunity to fuse those into one. Now that I see them right next to each other,
    
    **Jeff Logue:** they.
    
    **Christopher Ogle:** They were separated out. I was basically swiping so, you know, context, a simply piano quiz. And
    
    **Jeff Logue:** the way
    
    **Christopher Ogle:** they had the questions structured was
    
    **Jeff Logue:** I
    
    **Christopher Ogle:** was trying to take them as close to their questions as possible. And I think it's. What I did was maybe they kind of had a duplicate and they didn't realize it, and I didn't realize it because they're separated from each other. There may be a way to even fuse those together, I think.
    
    **Jeff Logue:** Awesome. That's perfect. Again, I kind of think. What type of. Sorry, it wasn't this one. Have you. How have you learned so far? I think it's very similar to what's the best way to help you learn. Right. So it's kind of like a repeat of. Well, that's. It seems similar to this. Same exact field. Same exact values. Right? Yeah. So we might. We might want to reword that question or just kind of strip it. What type of golf are you most interested in playing? So
    
    **Christopher Ogle:** you're
    
    **Jeff Logue:** talking about consistency, like, you're talking about the experience of how they want to play with friends, with family. We don't really have that right now. Again, the closest thing would be golf or goal, and I don't think that really makes sense. This is more about, like, you're playing with your buddies versus trying to hit your irons. Pure. Right. Two
    
    **Christopher Ogle:** very
    
    **Jeff Logue:** different.
    
    **Christopher Ogle:** Yeah. The other thing with this, so that, you know, Jeff, my thinking here is that there are different types of golf that are emerging. So if
    
    **Jeff Logue:** you think
    
    **Christopher Ogle:** about, like, simulator golf and topgolf or whatever, there's these other types of golf that I think we're, as an industry, we're kind of moving towards. And this is where I wanted to leave this question as a way where I could. I could differentiate between someone who wants to play in a simulator versus someone who wants to play on a course. And keeping in mind they can choose. I think it's three options for this. So it would kind of help us to get more directional data on. Hey, shit. There's a lot more people who are playing, like, simulator golf, but they want to, like, hit long, long, accurate, you know, shots or whatever, but they just want to play simulator golf over time. If we see there's a lot more of those that would give us More of a confidence in being able to say, like, we've got an opportunity here for a simulator course, for example. So that was kind of the thinking there with
    
    **Jeff Logue:** that one. So that might. That's more closely aligned with practice environment. But you're talking about playing environment. So we could leverage the practice environment field, as you can see here. Simulator, home, golf course. We could add friends, family, or we just create a duplicate field of this. That's more in terms of their playing style. Right. Again, it could just be playing environment. We might just want to piggyback off a practice environment. So I'm going to make a note here to tie into
    
    **Christopher Ogle:** that.
    
    **Jeff Logue:** I'll kind of leave that up to. I think I'm gonna kind of leave it up to Brixton and allow you to collect your notes here because I. I think he has a very specific direction he's going to want to go. Yeah. So I'll share these notes with him just so he's aware of what's going on. What experience do you have playing golf? This is very aligned to skill level. Right. We just might need to either map these or add another couple values to. Because right now it's like, I play well on my own. Well, that doesn't tell us if they're intermediate, scratch or beginner.
    
    **Christopher Ogle:** It
    
    **Jeff Logue:** just means that's. That's how they like to play. Right. So just something to think about there. It's not entirely skill level,
    
    **Christopher Ogle:** but
    
    **Jeff Logue:** there is a little bit of skill level in there.
    
    **Christopher Ogle:** Yeah, I think that one there is also, and I hear what you're saying on beginner, novice, intermediate, but I think it's. For me, it's the way I positioned this was similar to what simply piano did, where I looked at it and I thought, like, if I put beginner or intermediate advanced, someone could be playing for two years and still consider themselves a beginner, whereas someone who hasn't even picked a club yet could also call themselves a beginner. So what's a beginner? Whereas I'm brand new to golf, is something where it's like, okay, that puts him in the first, like, couple of months, three months or whatever, which is still subjective, but it's easier to recognize when you're answering that question. And then the next phase is I've crossed over from simulator or range into playing, but I still don't feel confident. And then there's that sort of barrier that people get over where they're like, okay, I can play confidently on my own. I don't need to worry about, you know, that's where they kind of go from intermediate more to advanced, but they still kind of might fall in between one or the other. So,
    
    **Jeff Logue:** okay,
    
    **Christopher Ogle:** yeah, it's a tr. It's a trickier one. But like just. And I understand the importance of getting this for the data point of view, but for me I was just trying to
    
    **Jeff Logue:** make
    
    **Christopher Ogle:** it more of an easier experience that someone could resonate emotionally and feel like, oh, that's me. A lot easier than some of the other answers that's
    
    **Jeff Logue:** in that example. And that's a good point. We don't necessarily have to push this data into the database if it's more of it an emotional lever that you're trying to pull, for example.
    
    **Christopher Ogle:** So
    
    **Jeff Logue:** I think we collect data when it's going to be useful. If you think this is more of, you know what I'm saying, that's the kind of feedback I need to know, especially from like looking at it from a copywriting marketing perspective. If we could see this long term being used and referencing back to and LTV could use it,
    
    **Christopher Ogle:** then
    
    **Jeff Logue:** we should probably collect it even if it's a brand new field. If that
    
    **Christopher Ogle:** makes sense. Yep, absolutely. Because that's where like if I said, oh, we've got enough data to say there's a, there's an offer for intermediate golfers.
    
    **Jeff Logue:** Yep.
    
    **Christopher Ogle:** That might not resonate the same as if I said, oh, we've got an offer for golfers who are not very confident,
    
    **Jeff Logue:** like,
    
    **Christopher Ogle:** or they would, you know, or they play well on their own or they're brand new to golf. Like that's the sort of thing where I feel like it would resonate with the end user a little bit more. So
    
    **Jeff Logue:** I think
    
    **Christopher Ogle:** it's a case of like on some of these, maybe trying to find the middle ground a little bit as to how people are actually going to perceive themselves in their own, I guess, identity as a golfer. So yeah. Anyway, that's just some additional context there and I want to make sure I work as well with you guys as possible. But the last thing I'll say is that I looked very closely at simply piano who they're the number one scaling quiz right now. And so they're obviously very successful for a reason. And although piano is very different to golf in some ways, it's still very similar in how people feel about themselves and their perceptions towards playing a new instrument or learning a new skill or sport.
    
    **Jeff Logue:** Being
    
    **Christopher Ogle:** golf. So that's it. Yeah,
    
    **Jeff Logue:** that's cool. I never thought of it that way. Cool. So I just made a note here, like, could that be Like a golfer identity field or something like, you know
    
    **Christopher Ogle:** what I mean? Yeah.
    
    **Jeff Logue:** So, yeah,
    
    **Christopher Ogle:** go for identity, goal for perception, go for self. Self identity. So go for self identification or something like that could be it. Yeah. Because it's more about how they see themselves. Not so much how others see them, but how. How they see themselves. Yeah.
    
    **Jeff Logue:** Yeah. Okay.
    
    **Christopher Ogle:** There was one other quick one, Jeff. Sorry, just before
    
    **Jeff Logue:** I
    
    **Christopher Ogle:** get it. It was if you go to the.
    
    **Jeff Logue:** Yeah.
    
    **Christopher Ogle:** When you go to sack.
    
    **Jeff Logue:** Oh, you. Yeah, I'm good. I'm listening.
    
    **Christopher Ogle:** It's just to the left. I just want to go back
    
    **Jeff Logue:** to the
    
    **Christopher Ogle:** left a little bit.
    
    **Jeff Logue:** What
    
    **Christopher Ogle:** type of golf? You know, how have you learned so far? Yeah, so it was how have you learned so far versus the other one of how do you prefer to learn? These were different in a sense that one was what they'd done in the past to this point, and the other was what they intend to do. And again, this was one that simply Piano had. And I, I feel like if there's a strong reason for us to remove the how have you learned so far?
    
    **Jeff Logue:** Happy
    
    **Christopher Ogle:** to do it. Because I guess I'm not really like concrete on what's the reason for us having that there. In having both of them there, so to speak. I just figured that one was for where they've got to so far and one, they may change. They may say, look, I've done this to this point, but now I actually want to do this instead. Now that I see these options and that opens them up to PG1 solution where they're like, shit, you know what, I did this in the past, but now when I see that there's these features here. Well, shit, that sounds interesting. And I'm interested in maybe learning something new or different. I don't know if that makes sense.
    
    **Jeff Logue:** It totally
    
    **Christopher Ogle:** makes sense.
    
    **Jeff Logue:** Again, necessarily have to make it a field in the database. There's going to be some instances where it's, there's, there's a reason for. It's creating a paradigm shift, a mindset and some of that stuff just may not be useful and it's going to be repetitive. They'll probably choose.
    
    **Christopher Ogle:** A
    
    **Jeff Logue:** lot of people will end up choosing the same answer is probably what will happen. Right. But you'll have some
    
    **Christopher Ogle:** percentage
    
    **Jeff Logue:** of people that are like, oh, like you said, that could be something new for me to try. We just don't have data on that quite yet. So again, we can always create a new field and that could be like future learning style. Right. So
    
    **Christopher Ogle:** just that's
    
    **Jeff Logue:** kind of how we. We step into it. Nothing's off the table as far as that goes. It's just, it takes time to add new stuff to the data base. Right?
    
    **Christopher Ogle:** Yeah.
    
    **Jeff Logue:** I'm going to make a new field suggestions and then new new field value suggestions. So
    
    **Christopher Ogle:** this
    
    **Jeff Logue:** would be a brand new field and this would just be what currently is recommended to the left to add to what we already have in the list, if that makes sense. Okay,
    
    **Christopher Ogle:** so can you just explain then to me just so I'm super clear and I have this recorder in here for a reason, so I've got it on the transcription and whatever. So can you just let me know exactly what it is that you need me to do? So I'm just crystal clear on that.
    
    **Jeff Logue:** Yep. So what I would like for you to do is look at my current suggestions of what I think it matches. Okay. And let me know if you agree or disagree. And the best way to know if you disagree is to go through our data dictionary and just start at the top here in live and just see all the fields we're collecting. You'll name and then the values that are available for each. Okay. So you can just scroll through these,
    
    **Christopher Ogle:** see
    
    **Jeff Logue:** everything we're collecting. You might say, oh, you know what,
    
    **Christopher Ogle:** Jeff,
    
    **Jeff Logue:** this is more of what I was trying to ask. I would recommend we use this field and add new values to it instead of. Or you might say, I agree, Jeff, I'm not seeing anything that really matches. Let's, let's cue this up as a brand new field to collect data on. Here are the values I would recommend to go with it. So if you do a brand new field, you can include the field name. I'll change it if I need to. Right. You could just kind of make your best guess recommendation of we can call the field probably this,
    
    **Christopher Ogle:** here's
    
    **Jeff Logue:** the, here's the field value suggestions I would recommend as standardized values. That would be. These are standardized values. Right. If one of these aren't entered, that field won't be captured. In a sense we standardize so that we can use that across the board for knowing exactly how a person's answering, for retargeting, for recommendations for marketing, all of that stuff, if that makes sense. So that would be the biggest thing is do you agree on what I have here where you don't please offer a note of. I think we should make this a new field or just say, you know what? I, I don't think we really need a field here. So I'll just leave a note section as well where you're like, hey, this is more of like a mindset thing. I don't, I don't think this is a long term value for us to collect information on this or it parallels too closely to another question, really. It's just. I'm just trying to get them to move in a direction. Let's not capture that again. Right. That, that kind of thing. Does that all make sense or do I need to.
    
    **Christopher Ogle:** Yeah, it does. I just. I guess you just answered my question that I had in the last part where if there's an. If. If there is a desire for me to keep a question in there, then it's okay for me to keep that question in there and us not necessarily collect the data. We don't have to delete the question just for the sake of saying no. We need to collect data on every question. That's.
    
    **Jeff Logue:** That's 100% right.
    
    **Christopher Ogle:** Okay, cool. Got it.
    
    **Jeff Logue:** Whatever serves your purposes best. Go with that. Whatever serves the business long term. In terms of data collection for LTV and marketing. Let's also collect that. Yep,
    
    **Christopher Ogle:** perfect. Okay, awesome. Yeah, I think there's going to be a happy, definitely a happy medium there with, with a lot of them and then other ones. There might be like we said, new fields, golfer self identity or whatever, where it's like, hey, this is the evolution of where PG is going. Like we've collected this type of data so far and now as even just humans evolve and our consciousness and how we perceive things and whatever and go from the direction of where the game is going, there are these new types of fields. Like even if you think about Andromeda, the algorithm, Meta's advertising algorithm,
    
    **Jeff Logue:** it's
    
    **Christopher Ogle:** now built mainly to focus around Personas, not so much demographics. So
    
    **Jeff Logue:** it's
    
    **Christopher Ogle:** gone from being like 55 year old, you know, Caucasian male with this, you know, income bracket
    
    **Jeff Logue:** to
    
    **Christopher Ogle:** this type of person who is like someone who's interested in like getting a, getting a deal or they're a tech focused person or they're someone who's a. On the comeback or whatever. Like these types of Personas, they know how to match to those Personas. And so that's based on human values and
    
    **Jeff Logue:** how someone
    
    **Christopher Ogle:** sees themselves. And so that's where it's like, okay, a lot of what we starting to map could be very well aligned with that, where we're actually starting to get more into Personas and how people see themselves, identities and things like that.
    
    **Jeff Logue:** So
    
    **Christopher Ogle:** yeah, it's cool. Yeah.
    
    **Jeff Logue:** On that note, a couple last things. Thinking through this. So Brixon wants this done yesterday. So of
    
    **Christopher Ogle:** Course
    
    **Jeff Logue:** ltv. So the sooner you can get back to me on it, the better. When does the survey go live specifically?
    
    **Christopher Ogle:** Well, this is already. This quiz is already live, but we've had some data tracking issues on this, so we pulled spend right back. So it's still going, but it's not really generating as much as many, let's say, submissions as you would like. There's also a start page issue. There's a big drop off in the beginning. So point being, it's live, but we're still trying to dial in the start page so we can get more people to actually click and start the quiz so that answers that question. And then in terms of how early I'd be able to get back to you, I wish I could today, but I'm about to go into like three, four hours of calls. Yeah, but I will, I will get it done by. I would say Monday. I should be able to get it done Tuesday, absolute latest. And just let, just let Brixton know that you talked to me about it. I think he understands. Like, I literally just transitioned into the new interim VP of creative role starting today. So,
    
    **Jeff Logue:** like, I
    
    **Christopher Ogle:** got a lot of stuff I've got to just figure out. And so
    
    **Jeff Logue:** I think
    
    **Christopher Ogle:** he'll get it and he'll be like, all right, that's fine. I get Christopher's kind of work on some other stuff. But yeah, I'll just let him know Tuesday, absolute latest, but I'll aim for Monday. Cool.
    
    **Jeff Logue:** Then the last note. I'll need API documentation for this service. The one thing we need to be careful of is we switch services a lot recently. So anytime we get a new service, we got to run the API again. Deb has to go through that whole process to link it up to the data lake. Hopefully we can stay with what we're using. Right now. This survey looks pretty sharp, so it seems like that might be the case. The other thing to keep in mind is I need to talk to Dev on it. But if you create a new duplicate survey, we probably have to every single time link up to that new survey. Right. So we have to be mindful of. Okay,
    
    **Christopher Ogle:** let's
    
    **Jeff Logue:** get it reconnected. Unless this system makes it very easy where you're pulling from the same field into a survey. If we can do it that way, that's great because then it's just pulling from that base. Base field, essentially.
    
    **Christopher Ogle:** Sure. So this, so this is something where if you can do me a favor, I'll add you to the Quiz Channel. And I think that, yeah, Brandon is in this quiz channel, and I think he would be the best person to ask because he's kind of getting a bit involved in this platform. We have an external consultant who's helped us build out the quiz, and now we're really working hard on making sure we get all this tracking correct. So if I add you into that channel, would you mind. Mind putting a post there and putting.
    
    **Jeff Logue:** The biggest thing I need right now is a login, an admin login to the. To the system.
    
    **Christopher Ogle:** Oh, so you don't. Okay, so you just need an admin login.
    
    **Jeff Logue:** Okay. I'll check with Brandon individually because he's my direct, so we'll catch up and. Yeah, no worries there.
    
    **Christopher Ogle:** Okay, so do you need. Do you need the. You. You can get the login off. Off Brandon, or do you.
    
    **Jeff Logue:** Should I do that? Is that the easiest way? Just use his admin
    
    **Christopher Ogle:** login? Yeah, I just need to confirm if he's actually logged in there before or if it's Jed who's doing everything. So are you okay if I bring you into the channel or are you. Yeah,
    
    **Jeff Logue:** please bring me in. And then if I could just get someone to hook me up with that admin, I should be off and running in the
    
    **Christopher Ogle:** meantime. Okay, cool. All right, no worries. I'll do that right now
    
    **Jeff Logue:** and
    
    **Christopher Ogle:** tag Brandon to make sure you get everything you need.
    
    **Jeff Logue:** All right, Sounds great. Thanks, Christopher. I appreciate it.
    
    **Christopher Ogle:** Have
    
    **Jeff Logue:** a good
    
    **Christopher Ogle:** weekend.
    
    **Jeff Logue:** Cheers,
    
    **Christopher Ogle:** mate. You too. Bye.