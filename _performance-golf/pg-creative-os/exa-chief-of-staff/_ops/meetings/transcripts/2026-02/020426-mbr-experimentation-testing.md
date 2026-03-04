# MBR: Experimentation & Testing - 02/04/2026

**Date:** February 04, 2026
**Source:** ClickUp AI Notetaker

---

**Attendees:** Christopher Ogle, Danielle Schwolow, Christopher Ogle, Gabe Medeiros
[https://t9014714949.p.clickup-attachments.com/t9014714949/00d303c2-25aa-4051-8b79-7cc5c4105016/00d303c2-25aa-4051-8b79-7cc5c4105016.mp4?view=open&filename=MBR%3A%20Experimentation%20%26%20Testing%20-%2002-04-2026.mp4](https://t9014714949.p.clickup-attachments.com/t9014714949/00d303c2-25aa-4051-8b79-7cc5c4105016/00d303c2-25aa-4051-8b79-7cc5c4105016.mp4?view=open&filename=MBR%3A%20Experimentation%20%26%20Testing%20-%2002-04-2026.mp4)
### Overview

The meeting served as a January business review and KPI alignment session where the team analyzed new performance metrics and reviewed the results of various tests and implementations. The discussion focused on refining KPI measurement, improving data filtering methods, and optimizing both digital and physical sales funnels through iterative testing and enhanced processes.

### Key Takeaways

*   The team agreed to evaluate performance based on net ROAS with a 100 target and use the campaign filter in the dashboard instead of the funnel filter.
*   The checkout page test showed that the variant emphasizing a simplified cart-like experience improved conversion rates and revenue, leading to plans for further testing with a new price point and split tests across Google (SP001) and Meta (SP003).
*   Process improvements were noted, with enhanced in-house capabilities reducing development dependency through streamlined QA and rapid implementations.
*   The group recognized the importance of integrating Vitalytics and AI for advanced tracking of engagement events to better assess creative performance and conversion metrics.
*   A year-over-year review highlighted a strategic shift toward physical sales channels, prompting a renewed focus on channels such as 357 and SF1.

### Next Steps

- [ ] **Danielle**: Re-run the acquisition dashboard exercise using the campaign filter and update the performance metrics.
- [ ] **Danielle**: Update the KPI documentation and process flows to reflect the new metric guidelines and implementation strategies.
- [ ] **To be Assigned**: Test the improved checkout page variant with the new price point and run split tests across Google (SP001) and Meta (SP003) channels.
- [ ] **Jeff**: Coordinate the integration of Vitalytics tracking events for video play rates and button click measurements.
- [ ] **Danielle**: Prepare and present the test performance report at the follow-up review meeting scheduled for next Tuesday.
### Key Topics
*   **KPI Measurement and Dashboard Filtering** Decision
    *   Danielle introduced new KPIs for January, including the test launch win rate and the shift from net loss per trial to net ROAS.
    *   The discussion focused on achieving 70% funnels within the KPI goal with a target of 100 net ROAS for on-target performance.
    *   Gabe clarified the correct method to filter data in the acquisition dashboard, recommending the use of the campaign filter (specifically for campaign 357) rather than the geo or funnel filter.
    *   Danielle agreed to redo the exercise using the campaign filter and the last 30 days data to ensure the blended view accurately reflects performance.
    
*   **Test Execution Results and Implementation Updates** Update
    *   Danielle provided a summary of January's tests: 10 tests prioritized, 7 launched, with multiple implementations across digital assets.
    *   She shared detailed outcomes, including wins and tests that were not run long enough, noting that certain implementations (e.g., hero redesign influenced by a successful Click Stick test) led to significant learnings.
    *   A checkout page test was highlighted where variant 2 (with a simplified, cart-like design) showed a 9% increase in conversion rate and a 2% increase in revenue per visitor.
    *   It was projected that full implementation of this variant could add an estimated $156k in monthly revenue, with plans to test the new price point and split the test between Google (SP001) and Meta (SP003).
    *   Discussion ensued over whether the improved performance was due to UI/UX changes (big bold call-outs) or improved messaging.
    
*   **Digital vs. Physical Funnel Performance** Update
    *   Year-over-year comparisons were reviewed, highlighting shifts in performance between digital and physical channels.
    *   In the digital space, last year's dominant channels (e.g., OSSF, SSTS, PSS) were contrasted with this year's trends where WPSS led and other channels like SSDP and SRSW maintained presence.
    *   For physical sales, there was a notable pivot: while previous top sellers were Click Stick and Square Set, the current top performer was 357, indicating a strategic shift toward physical channels.
    
*   **Process Improvements and Team Workflow** Update
    *   Danielle detailed enhancements in the workflow, where Vanessa now handles implementations using tools like Checkout Champ, WordPress, and GHL to reduce dependency on the development team.
    *   The process now involves a pre-QA and live QA system managed by Lauren, with Brandon available for rapid fixes, which has led to quicker resolution of several dozen tickets.
    *   Improved communication channels between marketing, QA, and development were emphasized as a key factor in accelerating implementations.
    
*   **Integration of Vitalytics and AI for Enhanced Tracking** Idea
    *   The team discussed leveraging Vitalytics and AI to set up tracking events for improved analysis of creative performance.
    *   Danielle mentioned working with Jeff to implement snippets to track events such as video play rates and CTA interactions.
    *   This integration was seen as a crucial step towards data-driven decisions that would support efforts to revive digital performance.
    
*   **Revenue Calculation Inquiry** Update
    *   Christopher raised questions regarding the revenue projections from the checkout page test, specifically the derivation of an estimated additional $156k per month.
    *   Danielle clarified the calculations: with an average of 7,000 sales per month, a 10% increase in conversion rate would yield an additional 630 sales at an average order value of $239, accounting for the additional revenue.
    *   This discussion underscored the importance of accurately extrapolating short-term test results to predict longer-term outcomes.
    
*   **Next Steps and Future Actions** Decision
    *   Danielle committed to updating KPI documentation and re-running the dashboard analysis using the clarified filtering approach.
    *   Further testing of the improved checkout page variant will be conducted with the new price point and separately for Google and Meta channels.
    *   A follow-up review is scheduled for the next Tuesday to report on the live tests (including hero redesign, results-focused CTA copy, and other ongoing tests).
    *   The team will also integrate Vitalytics tracking events to refine conversion analytics and support future digital strategy adjustments.
    

*   Transcript
    
    **Danielle Schwolow:** Glad to have you Gabe, because I do have a question for you. But welcome to our first business review of the new year. This is going to be for January. We launched new KPIs so our KPIs are more closely tied into your KPIs. So basically our first KPI is number of test, launch percentage win rate. So having a win rate higher than 30% funnels within KPI, which is the question I have for you Gabe and then rebuy AOV contribution and we can chat a little bit about like what this is and why it's something that we want to focus on. It's more to do with retention metric and ltv. But one of the things that I did right as I looked at your snapshot and then I tried to break down by digital and physical basically the blended net loss per trial and I looked at the geo board, I don't know if this is the best view for me to be understanding basically net loss per trial or just new customer roas in general. Okay,
    
    **Gabe Medeiros:** so what's. Sorry, what was your question?
    
    **Danielle Schwolow:** So basically for the month of January and again I don't know that makes sense to look like this. Basically how we're being measured is funnels within KPI. Our goal is to have 70% of funnels within whatever the goal is. So last month it was net loss per trial. And so I don't know if the best way to look at it is the geo funnel to have that blended view of basically everyone or how best I should be looking at it for a monthly view.
    
    **Gabe Medeiros:** Yeah. So did you see my announcement that all the funnels are now.
    
    **Danielle Schwolow:** Yes,
    
    **Gabe Medeiros:** roas,
    
    **Danielle Schwolow:** yes. But for January it was still net loss per trial, right?
    
    **Gabe Medeiros:** Yeah, that loss portrayal of $0 which it's still equal to 100 net roas.
    
    **Danielle Schwolow:** Okay.
    
    **Gabe Medeiros:** So that's, that's the goal for all the funnels. So any funnel that is hitting 100 net rows or above that is on target or at target.
    
    **Danielle Schwolow:** Okay.
    
    **Gabe Medeiros:** And then the best way to filter this is just by going to the acquisition domo dashboard and then the date range that you want and then you have to filter. So you.
    
    **Danielle Schwolow:** Because I'm trying to look at the blended metric too.
    
    **Gabe Medeiros:** What do you mean blended?
    
    **Danielle Schwolow:** So Google meta, everyone. Just us basically.
    
    **Gabe Medeiros:** But then I think we should look us. You
    
    **Danielle Schwolow:** think we should look U S isolated? Because what I did is I did geo. Well
    
    **Gabe Medeiros:** actually, actually like now that we have 100 that was. It doesn't really matter because you know if we're hitting the target after all costs which Is narrow as then we should be good to blend U. S versus international.
    
    **Danielle Schwolow:** Okay, so let's use like 357 as an example. So I'm just doing all 357. Would I need to exclude anything from this view?
    
    **Gabe Medeiros:** I would not. I don't use this report, so I. I'm not sure how accurate this is. Okay,
    
    **Danielle Schwolow:** so you prefer this, this guy, the ad performance.
    
    **Gabe Medeiros:** Yeah.
    
    **Danielle Schwolow:** And then should I exclude anything?
    
    **Gabe Medeiros:** Yeah. So do the last 30 days
    
    **Danielle Schwolow:** and then 357
    
    **Gabe Medeiros:** and then no, I wouldn't use the funnel filter.
    
    **Danielle Schwolow:** Okay.
    
    **Gabe Medeiros:** I would use the campaign filter. Okay, so just type 357 and include everything. That
    
    **Danielle Schwolow:** should
    
    **Gabe Medeiros:** give you everything blended.
    
    **Danielle Schwolow:** Okay. Yeah, I get way different numbers. Okay, so I'll go through and redo this exercise with this view and use campaign. And then for last month I'll do net loss per trial. And then moving forward, would you say it's net roas? Okay, cool. Thank you for that clarification.
    
    **Gabe Medeiros:** All
    
    **Danielle Schwolow:** right, hopping back into testing. So we prioritized 10 tests, launch seven. We also had a. I don't want to say a shit ton, but we had a shit ton of implementation. So we had 23. We prioritized 29. So we had two winners and then two that were basically not stat and didn't get to run long enough. So we'll chat through those. We also have tests that are live kind of TBD and we'll walk through what those tests are. And then as far as implementations, we implemented a bunch of different stuff and this was really like the month of Vanessa shining. That's one of my call outs for the things that we did. Well this month is taking a lot of work off dev to be able to do our own implementations on CoC funnels. She even learned how to do dual paths so that if you bought bump that you could do a different up one and a different downsell too. So she's really learning a lot. Some, I guess of the notable call outs would be, I don't know, we did so much stuff our funnel flows. So some of those big ones that we did. I know Christopher, we just launched that SSTS gold mine that we had been working on for a while. Did a lot with SSTS. We tried that 26 minute cut down. It didn't work. We revert it back. We launched a new vsl. We launched it on expand and delay. We launched it on the results pages. We launched a new price point for upsell one for wpss. See what else we got going on. We Also started using convert. We'll talk about that towards the end. And then we did a lot with 357Japan. I know we're kind of like hoping that this is going to go well, but basically with Dev, they had quoted us like 20 story points and we got it down to 11 story points. So GHL actually built the sales page and they're already done with it, which is really impressive because we just gave it to them on like Thursday. And so there's still quite a few pieces that need to be built. Check out one checkout to upsell one, upsell down, sell one. And there's also a thank you page that is coming out of Dove and that should all happen by the third week of February. All right, testing highlights. So I want to caveat these three tests with. We were hoping to launch these tests with ads that had the same messaging. So I know that we're all kind of aware we were in a weird place with Creative and we had our holiday messaging live through like most of January. So I think that that might have, you know, played a role in this. But basically these two tests were flat. So we ran a 3, 5, 7, New Year media sale where we did like three or four call outs where we basically said, hey, this is, you know, on sale. This is going to be your best year yet. We did some different call outs. You know, the biggest news New Year golf sale. And again, flat, not stat SIG. This was 52% stat SIG. This was 16 SAT SIG. But what's interesting is the one that did get stat sig was actually Click Stick. And Click Stick saw a 13 increase in conversion, a dip in AOV, but an increase in RPV. And this really had that like big, bold call out of the biggest New Year golf sale. And so actually we actually took this into a learning into a test that we have live now. And I'll just show you this guy with the final units remaining, low inventory. So this is a test that's live. This is our SF1 kind of hero redesign to try to mimic what worked with Click Stick. So we'll keep you posted on how that's going. But this guy was a winner and unfortunately not something we can necessarily carry through because we're not on sale of Clickstick anymore.
    
    **Christopher Ogle:** So, Danielle, I'm just curious though, because this test here for clickstick, the test name is CLST Media New Year Sale. And so what you're saying is that the Next one for FF1, you're taking the learnings into this one, but what are the learnings that you're taking into this one? Because this one was supposed to be a new year sale and the SF one is. No worries. The SF one is a different messaging. It's not a new year sale. So what are the learnings that are going?
    
    **Danielle Schwolow:** This
    
    **Christopher Ogle:** right
    
    **Danielle Schwolow:** here, you see this like hero section of the big bold call out.
    
    **Christopher Ogle:** That's
    
    **Danielle Schwolow:** what
    
    **Christopher Ogle:** we're
    
    **Danielle Schwolow:** doing here at the big bold call out. And that's was really the difference.
    
    **Christopher Ogle:** These
    
    **Danielle Schwolow:** had like, I'd say
    
    **Christopher Ogle:** like
    
    **Danielle Schwolow:** banner style call outs. Right where this one was like a text based big bold call out. And that's the learning that we're taking. Does
    
    **Christopher Ogle:** that make sense? It does it just for me it seems like they're big bold call out. Is that what we're testing or
    
    **Danielle Schwolow:** is
    
    **Christopher Ogle:** it, is that what's going to work or is it the messaging? Because the final units are selling fast. I would say that that's the test that we're trying to, to see if that works or not. Not just putting text above.
    
    **Danielle Schwolow:** It's
    
    **Christopher Ogle:** actually whether it's the final units. That's the reason why we're. That's just. Yeah, that's just my perspective on that. I think that that's what is going to move the needle more is the messaging.
    
    **Danielle Schwolow:** Yeah.
    
    **Christopher Ogle:** Does that make
    
    **Danielle Schwolow:** sense? I mean, even if we did that
    
    **Christopher Ogle:** here,
    
    **Danielle Schwolow:** right. It's still not the big bold call. So the learning that we're trying to take away from it is
    
    **Christopher Ogle:** what,
    
    **Danielle Schwolow:** what is the UI UX that's winning. Right? So like this fell
    
    **Christopher Ogle:** flat.
    
    **Danielle Schwolow:** This fell flat. This is a big winner. And we
    
    **Christopher Ogle:** tested this during
    
    **Danielle Schwolow:** the holiday
    
    **Christopher Ogle:** period
    
    **Danielle Schwolow:** and it was also a winner as well. And so that kind
    
    **Christopher Ogle:** of, you
    
    **Danielle Schwolow:** know, begs
    
    **Christopher Ogle:** like,
    
    **Danielle Schwolow:** is this call out
    
    **Christopher Ogle:** what's
    
    **Danielle Schwolow:** going to work? And then to your point,
    
    **Christopher Ogle:** like, is
    
    **Danielle Schwolow:** it the copy? So let's say
    
    **Christopher Ogle:** that this
    
    **Danielle Schwolow:** wins, then maybe the next test is actually the
    
    **Christopher Ogle:** copy. Yeah.
    
    **Danielle Schwolow:** Because
    
    **Christopher Ogle:** that's where. Yeah, that's where I would say like we don't really know what's working. Whether it's the fact that it's a big bold call out or if it's actually the messaging. I
    
    **Danielle Schwolow:** would
    
    **Christopher Ogle:** say that it's the
    
    **Danielle Schwolow:** messaging. We changed this whole thing up. So you see how we prioritize the image, the hero. What we did here is we scooched this all down and then we really just tried to copy exactly what was working for the clip stick the copy and the imagery. Hero redesign plus final units call out that we're testing. It's like, seems like
    
    **Christopher Ogle:** a lot.
    
    **Danielle Schwolow:** Yeah, it's not a straight A b. Well, with SF1, right. We're trying to sell it. So it's
    
    **Christopher Ogle:** less about
    
    **Danielle Schwolow:** like, hey, what is a hundred percent gonna work for this? It's like, how can we move the SF1? And so like, if we find out that this isn't working. Right. To move the SF1,
    
    **Christopher Ogle:** but this
    
    **Danielle Schwolow:** is,
    
    **Christopher Ogle:** how
    
    **Danielle Schwolow:** can
    
    **Christopher Ogle:** we continue
    
    **Danielle Schwolow:** to
    
    **Christopher Ogle:** move
    
    **Danielle Schwolow:** versus, like,
    
    **Christopher Ogle:** cool.
    
    **Danielle Schwolow:** This
    
    **Christopher Ogle:** is
    
    **Danielle Schwolow:** something that
    
    **Christopher Ogle:** we can
    
    **Danielle Schwolow:** bring into
    
    **Christopher Ogle:** the
    
    **Danielle Schwolow:** next
    
    **Christopher Ogle:** holiday
    
    **Danielle Schwolow:** period. Maybe.
    
    **Christopher Ogle:** Yeah. Okay. All right. That. That makes sense. Yeah, I just. There's just a couple of points I wanted to clarify there, so I appreciate
    
    **Danielle Schwolow:** spending
    
    **Christopher Ogle:** some time on that
    
    **Danielle Schwolow:** for sure. This next one is kind of a big deal and it's a little bit complicated. So this is basically us redoing checkout one and it's to make it look more like a cart, so to be more like other websites. And we did two variations. We did one variation where we basically still emphasize the image and then we did another variation where we didn't emphasize the image. What ended up trending or getting stat Sig was variant 2 at 98% Sat Sig with a 9% increase in CVR and a 2% increase in RPV. What we actually want to do with this before we call it at 100% because it does have potentially some pretty big ramifications as far as additional sales. Based on the math, it would bring in an additional 156k in revenue, 630 additional units. If we continued the pace at 7,000 sales a month. We. We moved the price point. Right. So we want to test it with the new price point just to make sure that it still works. And then I think we might want to test Google and Meta separately, just based on some of the feedback that we were getting from omer. And so SP003 is one that we're mostly using for meta and SP001 is one that we're mostly using for Google. So we want to break up the test and basically run it twice, SP01 and SP003 to see if there's any difference before we go and make a big change like this.
    
    **Christopher Ogle:** Sorry, I was on mute. Yeah, for sure. And that's great that we got a win here with this one. I'm curious how we got to estimated discovered monthly revenue of 156k per month. How did we get to that?
    
    **Danielle Schwolow:** Sure. So 7,000 sales a month. If you do a 10% increase in CVR, you get an additional 630 sales at 239, which equals 156. Yeah.
    
    **Christopher Ogle:** Okay,
    
    **Danielle Schwolow:** but
    
    **Christopher Ogle:** then what. What are the secondary metrics for revenue? We have
    
    **Danielle Schwolow:** the
    
    **Christopher Ogle:** control test one, variant one and then variant two. So if I'm just something in the maths doesn't add up.
    
    **Danielle Schwolow:** Which maths.
    
    **Christopher Ogle:** So for me anyway, so control is 199,000. The first variant has 196,000 and then the last one has 203,000. So they all ran at the same time.
    
    **Danielle Schwolow:** One
    
    **Christopher Ogle:** had a 10% increase in conversion rate.
    
    **Danielle Schwolow:** Yes. This
    
    **Christopher Ogle:** room during
    
    **Danielle Schwolow:** a very short period of time. What you're looking at here is if you implemented it, what could you could expect the next month? So you basically, you don't have a control, you don't have a variant, you have a hundred percent implementation. And so you could expect with 100 implementation, 630 additional sales a month based on top of 7,000 sales a month that you on average do.
    
    **Christopher Ogle:** Right. Okay, cool. All right. That
    
    **Danielle Schwolow:** makes
    
    **Christopher Ogle:** sense. Cool. Yeah, it does now. Yep.
    
    **Danielle Schwolow:** Like I said. Yeah, it's. It's cool. It's a big win. It's definitely like one of the changes they've been asking for. Like how can we do bigger, bolder things? This is bigger. This is bolder. It looks more like Shopify, I guess, in a sense. So before. Yeah,
    
    **Christopher Ogle:** I would say it's a simplified as well. It's just an easier experience because someone can see the value on the left in the image and the text on the right instead of having to read all the text and then see a picture. And
    
    **Danielle Schwolow:** the
    
    **Christopher Ogle:** picture is like they still have to do a calculation in the head of what the value is. So it's like doing it twice as opposed to doing it once when they just go through from top to bottom. So psychologically it makes a lot of sense why this would win. So that's awesome. Yeah,
    
    **Danielle Schwolow:** for sure. Cool. So some of the tests that we have live, we talked about the HERO redesign. We have a results focused CTA copy. So versus get my click stick versus Switch swing my or, sorry, fix my swing. We have the sales page action testimonials. This relaunched yesterday with the same checkout one, checkout two. So no, no variation there. And then the PGF Media VSL seek off. So these are all live and we'll be reporting on these next Tuesday. Any questions before we go to the next section?
    
    **Christopher Ogle:** Just real quick, can you just get.
    
    **Danielle Schwolow:** Which one? This one. Hello? Is Christopher still there? We lost them. It. Hello?
    
    **Christopher Ogle:** Hello. Sorry. No
    
    **Danielle Schwolow:** worries. They left. It's only you. Okay. Which slide did you want to see?
    
    **Christopher Ogle:** If you can just Go back to the. Okay, so this is the page. Okay. I never saw the finalized version with all those images on there. This is the desktop version or is this. Oh no, this is the mobile version. But you've taken two screenshots and put
    
    **Danielle Schwolow:** it next
    
    **Christopher Ogle:** to it.
    
    **Danielle Schwolow:** I
    
    **Christopher Ogle:** was like, oh my gosh. Who structured the.
    
    **Danielle Schwolow:** It's a mosaic.
    
    **Christopher Ogle:** Okay. It's a mosaic. Okay. I was like, oh my gosh. I didn't
    
    **Danielle Schwolow:** review that
    
    **Christopher Ogle:** page.
    
    **Danielle Schwolow:** Okay,
    
    **Christopher Ogle:** cool.
    
    **Danielle Schwolow:** Sorry.
    
    **Christopher Ogle:** This is nice. So looking forward to seeing how that one goes because we had two wins with that. So
    
    **Danielle Schwolow:** hopefully
    
    **Christopher Ogle:** this one
    
    **Danielle Schwolow:** I think it will. Yeah. Okay, cool. So this is year over year physical and digital sales comparison. So we grew 16 in total sales. And just want to look at Gabe's slide again. We did it more profitably, which is fun. So
    
    **Christopher Ogle:** we
    
    **Danielle Schwolow:** spent less, we made more, you know, gross revenue was good, all that fun stuff. So yeah, that's cool to see. As far as digital funnels. So as we all know, digital is suffering. So if we looked at this time last year, OSSF was king. OSSF made 49 of sales, SSTS was 35% of sales and PSS was 16% of sales. If we look at this year, we see a reduction by 66%. WPSS is currently king at 47% of sales, SSTS is 17% of sales. And then oddly enough, SSDP and SRSW, which appear to be run by mostly affiliate, still have life. And then OSSF seems like it's coming back to life a little bit. And then if we take a look at physical, last year, physical was our winner was Click Stick, which is interesting at 34 of sales, square set
    
    **Christopher Ogle:** at
    
    **Danielle Schwolow:** 33
    
    **Christopher Ogle:** and
    
    **Danielle Schwolow:** then SF1 at 23% of sales. Whereas this year our top seller is obviously 357 at 75% of sales. SF1 is second at 15 and Click Stick is 10% of sales. What's interesting is SQSC doesn't even make it in the top, whereas Click Stick is now the bottom and it used to be the top. And SF1 is still a force to be reckoned with if we look at that growth year over year. So we see 90 and that makes sense, right? We're heading towards a more physical than we are a digital company. What's next? So some of the things that we took away from January is just hitting our new KPIs, which is fun. TBD on funnels within KPI. I'm going to refill out the doc based on the direction from Gabe, Vanessa using checkout champ, WordPress and GHL to bypass dev, recreating pages, making live changes for implementation, split tests. We have this channel between us and dev and I feel like things are going really well. Vanessa post the updates, Lauren QA's it, then Brandon pushes it, and then we have Lauren QA it again. So we've been in this process of pre QA and then live qa and this seems to be helping us a lot as well as this channel. So we can kind of flag things to Brandon and he might just go in and fix it. So there's definitely been several dozen tickets that have not gone to dev because Vanessa is able to do it and we're able to kind of just like, hey, Brandon, here's this one quick thing that we don't know how to do. Can you help us? So
    
    **Christopher Ogle:** that's been
    
    **Danielle Schwolow:** really fun.
    
    **Christopher Ogle:** Yeah,
    
    **Danielle Schwolow:** that's been fun. Yesterday we pinged him on something. We're like, Brandon, could you tell me how to do this? He's like, done. So that was really cool. Tapping in the relationship with Vitalytics to understand use cases, tracking events and AI. So I feel like this is going to be a really powerful tool, especially for you and me as we move forward with trying to revive digital. Just some of the things that we can utilize and how we can talk to the AI. So like, hey AI, tell me, between these two videos, what was the difference in play rate? 1 minute, 4 minute CTA pop clicks on CTA. So we're working to get these events in the event that we want to get in that it seems like we can get in will be clicks on the button and then conversion is still kind of up in the air. We're pulling in Jeff to help us with that. There is like dev to be done, which we think we can have Vanessa do, but it's basically adding snippets and taking away snippets so that we can track things. But this feels like better, right, than not using vitalytics and AI.
    
    **Christopher Ogle:** So
    
    **Danielle Schwolow:** we're excited to have that as a use case, especially in the coming weeks. Hey
    
    **Christopher Ogle:** Daniel, real quick, I have to go to the pods. Call in a minute, but just before I know because there's other slides you normally have after this. So is this something like super high prior to like for me specifically before you wrap up or is there
    
    **Danielle Schwolow:** rebuy? But
    
    **Christopher Ogle:** I
    
    **Danielle Schwolow:** don't know that it's necessarily for you yet.
    
    **Christopher Ogle:** We
    
    **Danielle Schwolow:** basically have two things live with a launch, we'll launch two more things and then I think like after we get them live, we'll tap into you for, like, copywriting and stuff, but.
    
    **Christopher Ogle:** Okay. Yeah.
    
    **Danielle Schwolow:** Nothing too serious.
    
    **Christopher Ogle:** Nice.
    
    **Danielle Schwolow:** All
    
    **Christopher Ogle:** right. Awesome. Yeah. Sorry to cut you short. I have
    
    **Danielle Schwolow:** to make sure
    
    **Christopher Ogle:** I'm on that next call, so. All right, well, this is good. Few good wins, so well done.
    
    **Danielle Schwolow:** Yeah.
    
    **Christopher Ogle:** Super
    
    **Danielle Schwolow:** stoked
    
    **Christopher Ogle:** about Vanessa and everything there in particular. I think that's a huge step forward, so. For
    
    **Danielle Schwolow:** sure.
    
    **Christopher Ogle:** All right. Thanks, Daniel.
    
    **Danielle Schwolow:** Appreciate
    
    **Christopher Ogle:** you.