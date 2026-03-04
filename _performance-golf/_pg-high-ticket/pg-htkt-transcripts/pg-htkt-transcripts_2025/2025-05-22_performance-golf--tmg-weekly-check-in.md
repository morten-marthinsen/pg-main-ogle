# Performance Golf <> TMG Weekly Check In

**Date:** 2025-05-22T19:00:00Z
**Duration:** 2961.753167 seconds
**Organizer:** margarita@themoderategenius.com

**Attendees:**
- John Cruz (john@performancegolfzone.com)
- Assal Moradian (assal@performancegolfzone.com)
- test (margarita@themoderategenius.com)
- David Testawich (david@performancegolfzone.com)
- Euclidcruz (euclidcruz@gmail.com)

---

## Transcript


**Speaker 0** `[00:00]`

For what we do have for payments?


**Speaker 1** `[00:02]`

Are you starting using it?


**Speaker 0** `[00:03]`

Yeah. We just started using it yesterday or the day before.


**Speaker 2** `[00:07]`

So It was yesterday.


**Speaker 0** `[00:08]`

Yeah. Well, obviously, you need to upload the transactions. But yeah, John, just so you know, I'm I'm working with Firaz probably and then Mackenzie to hopefully get a Zap set up where every payment also pushes into Spot or Shopify, and then Shopify will then push the payments into Checkout Champ, and then Checkout Champ will push the payments to Domo. I don't know how long that's gonna take, so we might have to do some fun, addition work with Praxis and what we've done up until the 21st and then 21st onward for commissions, but hopefully not.


**Speaker 2** `[00:48]`

Is there there any way we can spit skip Shopify and go straight to checkout Chime from Hubspot or fan fan basis?


**Speaker 0** `[00:56]`

That is a whole no. We can't actually. Because they don't allow API or webhook on Fanbase, everything is done through Zapier, and Zapier does not connect to Checkout Champ in any way or form. So, it's has to be Shopify.


**Speaker 2** `[01:12]`

Okay. Yeah.


**Speaker 0** `[01:13]`

Unfortunately. Fan basis is kinda limiting in that standpoint. But, yeah, I'd love to see again, Margarita, maybe I give you. I don't know if there is a login. The other side of it, John, just so you know, is we don't wanna have any subscriptions on fan basis. We for us, we want all subscriptions to be done through Shopify. So I would just say best practice is let's do VIP coaching through Checkout Champ, which I believe is the way we're doing things now.


**Speaker 2** `[01:47]`

Yeah.


**Speaker 0** `[01:48]`

And then we'll do VIP experience sales through Fanbasis, and then Margarita, what we'll need to do for now is kinda have a dual process going. Any VIP coaching sales or those $99 a month ones will push through. Checkout Champ, but then the VIP experience sales will have to push from fan basis to Hubspot.

Is that where Sean, what are your thoughts on that?

Sean? Sorry? What are your thoughts on that? That's how things.


**Speaker 2** `[02:23]`

Actually, that's really possible as of now since we've been charging. VIP coaching in Checkout Champ. The only downside is for new accounts. There's double time to create an account in Checkout Champ, then do it the add the charge in fan bases. There are also there's also an issue with the existing clients where we don't have the full credit card since Checkout Champ does not record the full card details or card info. So we need to get that card again, but it's it's it's manageable. We we'll just get it from the closer.


**Speaker 0** `[02:54]`

Yeah. Okay. I guess moving forward, I just wanna make sure that we have the right process in place. So you're okay. With charging checkout champ payments as VIP coaching, fan bases as golf schools?


**Speaker 2** `[03:11]`

Yes. Yes. Should be good. Yeah. Okay.


**Speaker 1** `[03:14]`

So with fan bases, we're going to push the data to Hubspot instantly as the purchase is made. Is there anything else we need to do with this app? Because I can see that Shopify is connected to the same app to to fan bases. So do we need to push the customer in there as you guys have it just to share? We know Not.


**Speaker 0** `[03:36]`

Yet. I I haven't where was it? I haven't actually added our Shopify account in there. I need to chat with our engineering team before I do that because I need to understand, like, what needs to be created and and everything. So right now, all I need is a Zap that Zaps fan base has purchased to a purchase or payment made in. Hubspot.


**Speaker 1** `[04:03]`

Okay, and now, John, now that we have you, what kind of data do you wanna see from front bases? Like, we can do refunds. We can do, like, all of these things in here. Field payments. Like, do you want to see any specific data from this app?


**Speaker 2** `[04:22]`

Actually, we want all transactions that happens in fan bases be reflected in Hubspot, charges, disputes, or.


**Speaker 1** `[04:31]`

Brief.


**Speaker 2** `[04:33]`

Yes. Because they may also file for a chargeback in fan bases, so we need to see that as well.


**Speaker 1** `[04:41]`

Okay. So disputes, field payments, manual transaction. What should that this mean? Do we need this? Yes.


**Speaker 2** `[04:52]`

We need that as well. That's for emergency cases where we need to charge immediately a client using an existing card that's not through a link. I don't know if that makes sense to you, but that's a different process than we are using right now. So that's for, a different part of charging.


**Speaker 1** `[05:11]`

Okay, then we have, new CL, and that's pretty much it and refund issue. Everything else, the subscription part is not something we'll do.


**Speaker 2** `[05:24]`

Actually, we we are using subscription, but not for VIP coaching. That's for payment plans. So currently, the process for fan bases is divided into two, the onetime charges, the full amount, and for payment plans, we are using subscriptions.


**Speaker 1** `[05:41]`

Yeah. So do we want so we probably will need subscription canceled.


**Speaker 0** `[05:47]`

Extended. Do you need to have this information? We'll probably know that it was extended. Yeah. Probably no.


**Speaker 2** `[05:55]`

Renewal. I think yes.


**Speaker 0** `[05:57]`

If they're going through a second school, I think we got that. So practically, everything that we're seeing in here except for the referral commission.


**Speaker 1** `[06:06]`

Joined Discord, dispute lost and dispute won. Only not sending those, everything else.


**Speaker 2** `[06:14]`

Yeah. Will be.


**Speaker 1** `[06:15]`

Yeah. Okay. Cool. We can do that. We'll push it in there in Hubspot, and now for the those subscriptions that are going to happen still in Checkout Champ, do you guys still want to do the manual process? Do you think it's worthy to have those in there in Hubspot?


**Speaker 2** `[06:41]`

Revenue wise, David, what do you think? Because for us, that doesn't mean anything to us.


**Speaker 0** `[06:50]`

Like, are you guys still manually charging any subscriptions in Checkout Chat moving forward? Like, if someone purchased in April and they had a 3 pay, they paid $2,000 in April, '2 thousand dollars in May, '2 thousand dollars in June, are you guys still processing that last payment through Checkout Champ, or are you processing that last payment through Fanbasis moving forward?


**Speaker 2** `[07:11]`

We had one case earlier where the first charge was on Checkout Champ. Supposed to be it's for Fanbasis, but since we don't have the card info, Assal allowed it to be charged in Checkout Champ. But she said that's only for a onetime case, So I'm not sure if the succeeding ones. Let's just do this.


**Speaker 0** `[07:30]`

Let's keep in touch. If you have to manually process any more payments, you need to just let us know, and we'll make sure that it's in there, and I don't know what steps need to be taken, Margarita, to make sure it's in, Hubspot, but we'll just make sure. But if if it's just a one off case, then we won't, we won't need to check out Champ process moving forward.


**Speaker 2** `[07:54]`

I think there'll be more since we have open tickets and deposits already for the past few weeks. So we're gonna update that and charge them again maybe on checkout champ.


**Speaker 1** `[08:04]`

Depends. Maybe I can share with you the form.

Where we are pushing that is triggering everything practically in Hubspot, and maybe you guys can fill that out instead of exporting, importing, triggering zaps, and all of that. If it's not a lot. If it's, like, a lot on a daily basis, then doing it manually might not be the case.


**Speaker 0** `[08:34]`

Okay. Payments.


**Speaker 1** `[08:36]`

But this is the practically, this is the form that we are filling out, and based on this form, then we are pushing the payments as payments in here.


**Speaker 0** `[08:51]`

Got it. Yeah. I mean, let's keep everything as the same for now, and we'll just kinda double up on it, and then if we can have a differentiator, Margarita, between a payment from fan basis and a payment from Checkout Champ, so, like, payment origin or something as a as a field, that would be great because. I need to know exactly cash collected from fan basis payments so that we can pay out commissions on that, essentially.


**Speaker 1** `[09:17]`

Yeah. That's yeah. We will have that.


**Speaker 0** `[09:20]`

Okay. Cool.


**Speaker 1** `[09:22]`

So, yeah, we'll set up these apps. We will see how the data is coming in, and since you start using it, that will be great because we will be able to see it, and we can separate them based on two, like, is it coming from Checkout Champ? Is it coming from.


**Speaker 0** `[09:38]`

Awesome. So, John, what we can do is we'll have, I'm assuming initial billing date rather than you guys having to manually fill that out. As soon as the payment goes through, we can just have it automatically fill out total amount planned, cash collected so far, and initial billing date, and maybe even add Guru if we want. I don't know. But I think the Guru and adding the schools will have to always be manual since we don't.


**Speaker 1** `[10:03]`

I will will keep what you guys are doing just because sometimes people, if they pay with a different email than than what we have with the deal, we don't want to have some kind of discrepancy in there, and we don't want someone to, like, be missed.


**Speaker 0** `[10:19]`

Got it.


**Speaker 1** `[10:20]`

So I I think they should still keep an eye on everything like they're doing right now so they can have control of the dates, of the payments. It's it's still yes. We can automate it, but I think it's a little bit sensitive. Yep. Yeah. Okay.


**Speaker 2** `[10:40]`

That works for me.


**Speaker 1** `[10:43]`

Cool.

Awesome. So just so I understand how now the process works. So with Foundbases, are you going to send links to the client to the lead so they can make the payment? How is that going to work?


**Speaker 2** `[11:01]`

So, basically, if we're charging them through a credit card, we are the ones charging the clients. We are using an incognito tab in our browsers, then we get the info, the card, and everything, then we process the payment. But if a client opt opts for a buy now pay layer like Klarna, the client fills out the the link or the closers do it for them.


**Speaker 1** `[11:28]`

So if you need to charge someone, how are you going to know the credit card? Is that still going to be passed through Slack and.


**Speaker 2** `[11:36]`

Yes. Slack. Yeah.


**Speaker 1** `[11:37]`

Okay. So that process stays the same. Correct?


**Speaker 2** `[11:40]`

Yeah. Okay.


**Speaker 0** `[11:43]`

Oh, are they not charging them on the call?


**Speaker 2** `[11:46]`

They are if the closer is up to do them to do it themselves or if the client wants to do it himself.


**Speaker 0** `[11:54]`

So then why do we need to grab a credit card and send it through Slack still?


**Speaker 2** `[11:59]`

That's only for PIFs. So for example, that the card is in full amount, then we're the ones doing it. Esther, Jackie, and I were doing it, then we're just gonna tell them it's already billed. Like, we used do it in Checkoutchem.


**Speaker 0** `[12:19]`

If so if they pay in full, we're collecting their credit card. But if it's we're not collecting their credit card. But if there's a payment plan, we do collect it on the call? I'm not really following here.


**Speaker 2** `[12:36]`

So if it's a buy now, pay later, we're not collecting the card since the card is being filled out, by the client on their own using the link. But if it's a payment plan or payment in full, it's either the closer or us doing it. So we need the card so it's sent out in Slack.


**Speaker 0** `[12:58]`

Okay, and do their like, their card details are getting stored in. Yes. In fan bases? Okay. I'm just, like, curious why we need to have Slack in the mix. Like, why do we need to have their credit card number in Slack? I'm fine with the last 4 digits, but the credit card number itself, is there a way to avoid that?


**Speaker 2** `[13:19]`

Actually, let me check this transaction. We are getting it through Slack, we can process it. So we need the card info. But on fan basis, I think the full card info is not saved, just the last 4.


**Speaker 1** `[13:37]`

Question. While the closes on on the sales call, can you guys have, like, $1 link so that on the call, if it's closed deal, like, make that $1 so you can have the credit card in the app, and that way, after that, you can, like, charge them for the full price. So you don't need to send the credit card details around.


**Speaker 0** `[14:04]`

Yeah. It's just a huge compliance issue and like, a data issue is if we keep and store all credit cards on Slack. If for any reason there is ever a data breach, then that falls on us, not on Yeah. Slack. Right? But if it's the payment processor that has the data leak, it's on the payment processor because that's the payment processor's job, but it's not Slack's job to hold credit card information. Yeah. So III was hoping Assal would be here by now, but I'll bring that up with Assal as well. Is it best that we can do it? If we can have a $1 payment link, then like, then we can just store the credit card information there. But having it on Slack is, like, a no no. Like, we're not supposed to be doing that.


**Speaker 2** `[14:48]`

Yeah. It's actually Asal who wants it to be processed here on our end. So by doing that, we're gonna need the card info. So there's no way to get the card info done on Slack. So as of now, if we're gonna send the $1 link, why not send the full amount?


**Speaker 0** `[15:08]`

You at least have a quick charge on it. Right? Because there's gonna be the, like, a do not honor, like, certain things with larger transactions that will happen with banks, but a $1 transaction will probably always go through. But I just wanna make sure that we can avoid having credit card numbers on Slack. So if we can quickly get the credit card and input it into a $1 link regardless and it stores the number and fan basis, then we can just auto charge the card on file versus having to type out all of the information from a Slack message.


**Speaker 2** `[15:42]`

Yeah. That's where the manual rebill process comes in, the one you showed earlier in fan bases options there.


**Speaker 0** `[15:51]`

Yeah. So I guess, Nicole, you're here now. Is there a reason or is there anything that, like if we can find a way around having credit card numbers being in a Slack channel, like, full credit card details, are we open to having the closers put in the credit card information in the fan bases?


**Speaker 3** `[16:11]`

Yeah. I don't wanna do that. I don't wanna do that because they're just not equipped to do that. I want the billing team to be in charge of putting in the credit card information. But what's your what's the issue with Slack? I mean, we could have we could have Slack delete information after a certain period of time if you're worried about the storage. But just as of right now, I don't wanna do that, but that doesn't mean that that won't change later on. It's.


**Speaker 0** `[16:37]`

It's yeah, definitely, like, a data security issue.


**Speaker 3** `[16:47]`

I mean, we could just have Slack clear the data after a certain period of time in that channel.


**Speaker 2** `[16:56]`

But.


**Speaker 0** `[16:56]`

Yeah. I guess it's just like a like, I just don't know if we like, do we trust Slack? Because here's thing. It's the liability would end up on us. If there's ever a data leak of Slack for any reason for anything and there's credit card information that has been passed through it at any point, then it falls on us as a company versus if it was, for some reason, leaked on fan basis. It's not on us because they're a payment processor. They're supposed to manage the data storage. Even if it's a $1 payment link, and that's what Margarita just proposed is why don't the closers just do a $1 payment link they put in the credit card information?

So rather than filling it out into a message in Slack, it just fills out into fan basis, and then it gets stored there, and then John can go and process the card on file for 5,000 or 6,000, but that just eliminates Slack from being the middle piece here.


**Speaker 3** `[17:48]`

Okay. Let me think about that just a little bit, but I get where you're coming from.


**Speaker 0** `[17:53]`

Yep.


**Speaker 3** `[17:57]`

And so then if they do the $11 link, then the billing team will have to go in and.


**Speaker 0** `[18:02]`

Do the same on file. Like, you could still do the same thing, and you could message John on Slack or in the billing channel and say, hey. Charge card on file that ends in 3100. Like, that can still happen because it's just the card ending in. But just having the full card number details is where the risk comes in.


**Speaker 3** `[18:20]`

Yeah. I understand.


**Speaker 0** `[18:21]`

Yeah. I think that would be a better way to go about it. But, yeah, we can chat further about that. Sure, and test it.

On the other end, just to keep you in the loop as well, what we're gonna do is, basically, anything from a subscription to a refund to a dispute to a payment to a manual charge, all of that's now gonna get input into Hubspot, and we're gonna differentiate between a Hubspot transaction and a Checkout Champ transaction just in case we still have to charge anything one off on Checkout Champ. So we'll be able to know, and then we'll be able to count cash collected versus total amount planned in Hubspot as well, so that we can track payment plans and those types of things. But if for any reason we don't get into Domo by end of month with all the fan basis transactions, we'll still be able to track revenue per closer and calculate commissions even if it's manually.


**Speaker 3** `[19:16]`

K. Good to know. And.


**Speaker 0** `[19:21]`

Then I do have a conversation next week with Mackenzie and Sarah to figure out how we can push fan basis payments. Because they don't do API or webhook, so I don't even know if we're gonna be able to collect fan basis payments in Domo specifically. I think what we're gonna have to do is push fan basis payments to Shopify. Shopify pushes it to Checkout Champ, and then Checkout Champ collects the data, and cross references with Hubspot for, like, commissions, who closed it, all that kind of stuff. So I have a conversation next week with them to get that sorted just so you're aware as well.


**Speaker 3** `[20:00]`

Guys, I have a I am I have an emergency. I gotta jump off. I'm I'm having issues with fan bases. I'm so sorry. I'll watch the recording. Okay?


**Speaker 0** `[20:06]`

No stress. K.


**Speaker 1** `[20:11]`

Okay.


**Speaker 2** `[20:12]`

Issue with 10 basis.


**Speaker 0** `[20:15]`

John, is there anything else that you think would be needed, or Margaret, any other questions for John?


**Speaker 1** `[20:20]`

No. I think that's it. Just wanted to see about this. John, you haven't wrote me for a while. Just wanted to check in if everything is okay. I was about to do it today, but then I saw you coming to the meeting. I was like, I was asking on a meeting.


**Speaker 2** `[20:37]`

Yeah. Everything is working as intended. I think the only issue I had is for Zoho, the automation we had for reflecting data from Hubspot to Zoho. But since we're leaving Zoho, I think, yeah, we're just gonna we're just gonna leave it at that.


**Speaker 0** `[20:52]`

Yeah. We should be moving everything in Praxis to Hubspot connection this week. Hopefully, by end of day Monday, it's all done, and then we should be able to turn off all Zaps that process anything or any data to, zoho, which should save us a lot of space of Zaps and tasks that we have running. So, yeah, it's kinda a wrap.


**Speaker 1** `[21:14]`

Did you guys connect to Houseplug to Domo?


**Speaker 0** `[21:17]`

Not well, kind of, I I think there is it's it's a work in progress, but by Monday, it should be done.


**Speaker 1** `[21:22]`

Okay. Cool.


**Speaker 0** `[21:25]`

Awesome. Yeah. John, just make sure that all of the data in Hubspot is good, and even if things are a little inaccurate, we can always manually export and import the data back into Zoho at the end. Even if things are slightly missing, just keep track of what is missing. But I wouldn't worry about the Zaps that are moving everything back to have real time data. For us, it's also wanting to eliminate as many Zaps as we can. So yeah.


**Speaker 1** `[21:53]`

Yeah. Awesome. Perfect. Yeah. We can do that. Awesome, John. If something pops up, let me know. Of course. Yeah. But yeah. Cool.


**Speaker 0** `[22:06]`

K. So.

I have some issues. I'll let you know these, Margherita, eventually. I just haven't had time to make a Loom, but I'll send you over a doc with some other, like, small things that keep popping up randomly.


**Speaker 1** `[22:28]`

Is the power dialer okay. Now? What is happening with that?


**Speaker 0** `[22:31]`

I think the power dialer is good. I think we're just getting some random leads that are not populating as a deal or as a contact in Hubspot, which is weird. I'll have to find I think here's one. I'll I'll throw this one email. I'll have to go back. I have, like, 40 saved for later messages in my Slack right now, and I've been back to back all day. So I haven't been able to go through it all, but here's one that we I think we had to manually create a contact and task for this person, but they did book through, like, an email link.


**Speaker 1** `[23:05]`

Oh, so place a new link. We don't have it. Okay. I will check. Okay. Someone with that, but we will see. Okay. It's not in here. We will check to see what happened with this person.


**Speaker 2** `[23:24]`

Yeah. I think I have one question with you. It's for, I think, Alex and Chris, the ones doing the alumni.


**Speaker 1** `[23:36]`

So as of now.


**Speaker 2** `[23:36]`

We're the ones creating the deals for them since it's not on their calendar. What do you think should we have as a process, or should we just keep doing that for them?


**Speaker 1** `[23:49]`

So. I don't know why you're creating deals, but we have we have this pipeline that that is backend sales, and what this pipeline is doing, whenever there is an alumni call booked, is creating a deal in here in this stage, alumni booked. So, practically, the idea is all the alumni's calls to be in here into this call you, and then they have this end of day link that they need to fill out, and after this is filled out, the deal will be moved to field closed, and based on that, we will know that the deal was, for example, field closed, like, showed up on the call or so on and so forth. If the deal was open ticket or deposit or closed, they just need to move and drag it to there or just when they have the deal open, they will need to change the status to be either open ticket, deposit, or closed one, and if when they will move the deal to that, they have all the same questions popping up as for the sales. So to field close end of day, if it's open ticket deposit or closed one, is the same process as for the sales, but we just want it to be in different pipelines so we can track the data.


**Speaker 2** `[25:18]`

Actually, for them, they have a separate list where they're getting the data from or the contact from. They asked me, I think, a month ago to get the names of the clients who participated for last year, then I think that's where the list are coming from. So they're calling it alumni. It's not Yeah. Booked anywhere. They're just dialing it random. So whoever answers the call gets ideal, then they talk through another school to book, then what we do is just create a new deal for that guy. So.


**Speaker 1** `[25:57]`

It's process that I didn't didn't know about. Like, we had a top in here that with all those people who attended the school one day ago. So if they're the end date is one day ago, then that person will pop up in here, or maybe we can do, like, more time slot, and they can work with these people in here. So, practically, these people attended some like, sometime in the past, some of the schools.


**Speaker 2** `[26:27]`

Now k. So maybe I think we need a loom from that page. So we search the client, then what's the next step? What how to create a deal then So forth and so forth.


**Speaker 1** `[26:40]`

So, practically, the deal is created based when the alumni call is booked. But if you're creating it manually.

I will need to think about it. Maybe I can give you, but still.


**Speaker 0** `[27:02]`

We're really, a Hubspot form. Just fills out name, phone number, email. Yeah. Who attended or something, closer who reached out or who booked, setter if applicable, and then it just creates deal based on that.


**Speaker 1** `[27:18]`

Are you using setters for the alumni calls as well?


**Speaker 0** `[27:21]`

No. No. No. We aren't. I was just, like, just in case. But you could have, like, a form that does that, and they could just fill it out. We.


**Speaker 1** `[27:29]`

Yeah. We already have that form just for alumni calls. But those call the that form is actually representing calls booked. So now it looks like there could be two ways, like book calls and random calls, which is fine.

Here it is. We we already have a form for that. So this form then triggers, but I will need to add, like, who called the person. Yeah. Now the process for that. Okay. I will need to recreate it.


**Speaker 2** `[28:14]`

So, basically, using that form, that's gonna create a deal. Right?


**Speaker 1** `[28:18]`

Yeah. That form will create a deal in here, but it's not going to assign it to anyone because the assignments of the deal is going through the Zap and is assigning to the booking owner. Now since in here, we don't have a form scheduled, it will just create a deal, and then I will have in there, like, a field for you so you can fill it out who the deal owner is, and based on that, we can create we can assign the deal to the specific person that you will choose.


**Speaker 2** `[28:53]`

Okay.


**Speaker 1** `[28:56]`

But, yeah, there is a pipeline for that, and one more thing, David, now that you're in here as well. I think Asan said that for those who are no show, cancel, that you guys need to update those. Is that the case? Is that the process that currently is happening for the alumni calls? Is that what we want to do? Because, like, this pipeline is not used at all.


**Speaker 0** `[29:23]`

Yeah. But That's that's on us all. I don't really have any oversight over Alex and Chris who deal with the alumni side of things. So, ideally, like, yeah, I think we would wanna use it. I have no idea what she's training them on. Again, that would be why I would want her on this call. Okay. Cool. So maybe we just send her a message after this and just double check.


**Speaker 1** `[29:48]`

Okay. Cool. So so I'll send you the the forms so you can create deals, and then the process is pretty much the same. Once the deal is closed, you can attach golf schools in here. Like, everything is the same. It's just a different pipeline because then based on that, we can present the dashboard in here, retention, where we can see, okay. Yesterday, how many meetings, how many per closer, how many showed up, how many closed, like, all those details, we can kinda see them in a dashboard.


**Speaker 2** `[30:24]`

Okay. So, basically, every time they dial someone, they need to submit a form. Right? So?


**Speaker 1** `[30:31]`

Well, no. Not dialing. Oh, is that considered as a.


**Speaker 0** `[30:35]`

No. I'm not dialing. Every time they complete a conversation, they'd have to submit a form, which would then create a deal.


**Speaker 2** `[30:42]`

Okay.


**Speaker 0** `[30:43]`

So that conversation to say, hey. Like, this is a cancel or they don't wanna move forward or whatever. Honestly, it depends on the process that Assal wants and how much data she wants. But Yeah. I would say anytime they close someone or they anytime we would have felt to create a deal or any way that we're manually creating a deal now, let us know why we need to create that deal, and then we can reverse engineer and say, hey. Here's the form we need to fill out for this, or here's what we need to do here. Here's how we build this up. But we just need to know, like, what are the use cases that create or that cause us to need to create a manual form right now or manual.


**Speaker 1** `[31:22]`

Because if it's just for dialing, we can get the data they're calling from all over. Right?


**Speaker 0** `[31:27]`

Yeah.


**Speaker 1** `[31:28]`

So we can we can have how many dials they're doing. Like, we can have something like this, how many outbound calls created. Yep. For each specific person. We don't need to have a deal for that. But if we want to track it as a sales call practically, then we need a deal.


**Speaker 2** `[31:48]`

Okay.


**Speaker 1** `[31:53]`

Okay. Cool. Awesome. David sent me all those, issues that you guys have, and we will go from there. Okay, and yeah.


**Speaker 0** `[32:10]`

And, David else that you need? If not, you're good to jump.


**Speaker 1** `[32:15]`

Yeah. John?


**Speaker 2** `[32:17]`

I think I'm good. I'll just wait for the form, Margarita. And.


**Speaker 1** `[32:21]`

Yeah. I'll send you the form. I'll create I will add some new fields, and I will send you, and we'll record you how to create how to fill it out.


**Speaker 2** `[32:30]`

Okay. Thanks, guys.


**Speaker 1** `[32:32]`

Thanks, Thank you so much. Bye bye. Now for. I had something on my mind.

No. I don't remember. Oh, yeah. We so by tomorrow, we we will have the setup for the dialer, and from Monday, I would like to start testing it out. Yep. Now I just need to see how the training process is going to go. I don't know who will train the team and how that's that's what happened.


**Speaker 0** `[33:16]`

Edward did message me. I need to go through this. Matt said he thinks the automation didn't fire properly, dialer onboarding. Here's the link to get started. So I actually have to book a a call with them.


**Speaker 1** `[33:26]`

Oh, okay.


**Speaker 0** `[33:27]`

So I think that Because I.


**Speaker 1** `[33:28]`

Didn't know who's going to do the training. Are they going to do the training? Are we going to do the training?


**Speaker 0** `[33:33]`

Yeah. Let me let me book my onboarding call. I'll do that for oh my god. I am literally won't be able to do that until Wednesday, unfortunately.


**Speaker 1** `[33:43]`

That's fine. Like, we can have everything set up ready to go for them, and then when when you will onboard do the onboard, then if if there is, like, a training part, I don't know, and after that, we will start testing it out together. That's fine. I just want to have the tech side of it prepared so that we can be ready.


**Speaker 0** `[34:11]`

11:30.


**Speaker 1** `[34:12]`

That's one part of it.

The other part of it is it creates some dashboards, but yours are still in progress. You'll have it by tomorrow. I can see that you were doing something in here. You are adding something some things here and there.


**Speaker 0** `[34:35]`

Yeah. I just wanted some general knowledge, so I just quickly kind of added to what you'd built or maybe, I mean, I built it. I can't remember. I know you put some stuff in here. But.


**Speaker 1** `[34:46]`

You you built some of these in here. I built I I add you I added you like, I gave you some only 5 reports in here.


**Speaker 0** `[34:53]`

No. I just yeah. I needed some stuff for Brixton, and then I wanted some stuff for me, and then.


**Speaker 1** `[34:59]`

Yeah. Totally understand that. Okay. So question. For the apps and the scores, are we okay. Of how the the scoring is going? Is it okay?


**Speaker 0** `[35:08]`

Yeah. The instant form, I might need to change it. It looks like everything's just kind of compiling to a 3. I need to see the data between what is graded 3 and what has how many have booked from the grade threes? So, like, there's a grade zero, grade one, grade two, grade 3, grade 4, then if I could have, like, kind of layered down how many booked at each. So we have a number of contacts, then we have number of booked, number of shows, number of closed, number of confirmed and qualified, all of that data. So I can say, hey. This grouping of 3 grades have a lot of no shows. Maybe we need to figure out how to group some of those into a a two grade, or hey.

Maybe all of the threes are showing, but none of the fours are. What are, like I need to be able to look at that data. So that would be the only thing I need to do. Also sorry. There's a lot of moving pieces here. Our media buyer is creating a ton of new pages or new quizzes on Typeform. So.


**Speaker 1** `[36:11]`

Need to connect all of them.


**Speaker 0** `[36:13]`

Do that. So I might need a process for this, But here is what we have, and you can check out some of them, and you'll see why she's creating them if she wants to split test a bunch. Here. I'll I'll share my screen real quickly and show you what some of them are.


**Speaker 1** `[36:28]`

Yeah.


**Speaker 0** `[36:30]`

So let me share my full full screen, actually. Let's do this. Just because a lot of them are gonna be a little bit, like, better visually, so they're gonna be instead of just, like, a ****** type form, they have, you know, some actual visuals. We're gonna start testing, you know, visuals. Can we So it's just gonna look a lot better from a and it should hopefully have higher performance, then we're gonna have a medium quiz, so, like, a quiz that's only 14 questions instead of 19, some different type of videos. So we're just gonna make it look better visually, but we're gonna have to do a lot of split testing on these. So I'd love to have a process or like, an SOP of what exactly needs to happen every time we create a new type form, every time we create a new booking page, every time we like, what's the most streamlined way to do this, especially as we're transferring from you guys to the new account manager? Also, I thought she was supposed to join this call today.


**Speaker 1** `[37:30]`

Yeah. She was supposed to join. He sent me. I was like, for the day. So yeah. No worries. Yeah. So next week. But yeah. After next week and I think for the next next month as well, I will be joining the calls as well until we are completely smooth. Now another question for this. Are the questions going to stay the same? It's just the visuals?


**Speaker 0** `[37:59]`

Or. So the visuals, partially, the questions, we're gonna just make sure that the questions we're gonna keep our grading questions the same, so the same questions we're already asking. Yes. We're gonna remove and add questions. We might change questions in the future. So that's where things might get a little bit messy because we might need to create new fields in Hubspot for the actual answers.

So yeah.


**Speaker 1** `[38:25]`

Every new question, if it doesn't exist already in Hubspot as a field, needs to be created as a field in Hubspot and then connected to the Typeform. If the if it's an existing one, it's easy. You're just going in there, connecting everything, and then just need to make sure that we are adding them into the specific workflows for tracking purposes. But everything else is good. Now do we want to do grading on these ones as well? Okay. So they need to be included into the grading one. If we need to, like, change if there are new questions, those questions needs to be included as well. So yeah.


**Speaker 0** `[39:02]`

For sure to be honest.


**Speaker 1** `[39:03]`

Because it's a new kind of if if the Typeform has new questions, everything is new, the process is new, maybe the grading is new, there is no, like, easy way in, hey. Just click here two times and bomb. It will require a little bit of building stuff, but that's fine.


**Speaker 0** `[39:23]`

Cool. Yeah. We can just submit a ticket even if it's just, like, understanding what details are needed every time we do this because and I can help build this out too. I can do that. I just wanna make sure because we have on our actual, like, internal dev team side like, I haven't even looked at this yet, but I have, like, a task assigned to me to overview.

Like.

Like, certain things, like UTMs passing through and like, new upsell modules and new assessment survey forms. So we're copying some stuff from vShred. Like, there's all these types of things, and they just kinda pass it on to me, and they're like, hey. Let's make sure that everything's working. I'm like, okay. Well, like, here's all the steps that also need to happen on my end before we launch this, and you're giving me, like, a day before launch time. So I've extended a few things out, but I just wanna make sure I understand, like, based on our process, what all is needed so I can have basically a a ticket template every time that we create a type form, a ticket template every time this happens.

So then let's say I'm out for a week and this needs to happen, my dev team can do it, and they can submit a ticket, or I can make someone else because, like, if Assal is busy, I can give one of my other setters or my team leads this task, and they just kinda have a template to say, hey. New type form or new booking page. Here's what needs to happen.


**Speaker 1** `[40:52]`

Okay. Yeah. Yeah. I will. I will kinda let you know the steps that we do when for example, if there is, like just the visuals are different, but everything else stays the same. It's just a new type form. It's like a new type form. That's it. We just practically, we just need to know, hey. There's this is the new type form we'll we'll start using, and we'll start using it tomorrow. We need to know when you're going to launch it. It's important. So we so we give some priority, and we need to know the type form, then when we open the type form, we'll see if it's the same, if the questions are different, blah blah, and if you need specific grading for that type form, we will need to know that so that we can implement it.


**Speaker 0** `[41:37]`

Cool. That works for me.


**Speaker 1** `[41:39]`

Okay. Cool. Awesome. Yeah. That's pretty much it, though. Yeah. I just want to ask this. Like, how is everything going? Are we okay. With using Hubspot? Is the team feeling better in terms of.


**Speaker 0** `[41:53]`

Yeah.


**Speaker 1** `[41:53]`

Quicker due dates to that? Like.


**Speaker 0** `[41:56]`

A lot of people are loving Hubspot.

I there's just a lot of quick changes and certain decisions that happen. We're gonna start phasing out Aloware in the next couple of months and moving to Attentive. So.

Yeah, I wish I would have known this 3 months ago. But, yeah, they wanna stop using Attentive. But, also, it might also leave room for us to only use Dialer.io as setters, and then we use Attentive as our texting platform. So it might kind of work out. But Yeah. Yeah. It's just that might happen. The other side is just from an operational standpoint for us is, like, as many zaps as we can consolidate or get rid of or anything like that. Can we do an audit? Like, we don't need to have 250,000 tasks going every single month. So, ideally, we can whether it's leveraging operations hub or whatever whatever that we can do to build out in Hubspot workflows is best, and then obviously, by next Monday, hopefully, eliminating all of the Zoho. Zoho and Listtrack. Anything that goes into Zoho and anything that goes into Listtrack, if we can eliminate those, that would also be another task that we need to start auditing and eliminating.


**Speaker 1** `[43:22]`

So. Yeah. This this is, like, more now cleaning after the mess. So yeah. So, yeah, we'll come to that point. But I was thinking more of a of process wise for the setters, for the closers. Are they fast?


**Speaker 0** `[43:38]`

Yeah. Closers are good. Setters. I think there's still a little bit of, like I haven't been able to audit some of the stuff, so I don't fully know. But I everyone's taken positively to Hubspot. Now I just wanna find, again, where can we clean things up, or where did we have intentions at the beginning that we never really, you know, aren't actually fully being taken advantage of, and how can we take advantage of them and that type of stuff.


**Speaker 1** `[44:04]`

Right, and with the the new process, some of the automations that we implemented, do you feel that some of the things are speed up for them? Do you think that they are getting percent.


**Speaker 0** `[44:14]`

Yes. Like, the the tasks created the yeah. There's a time that they they're definitely able to do more. So, like, they feel good about it. They love Hubspot. No issues there.


**Speaker 1** `[44:27]`

Okay. Just want to recheck to recheck how the team is feeling because that's that's for us is very important. Okay. Awesome. So, yeah, cleaning up everything, updating some, like, reusing now the operation hub as much as we can, and shutting down some of those apps will be priority as well, and yeah, testing to dialer.


**Speaker 0** `[44:52]`

Awesome, and then did we have, like, a conclusion with Klaviyo on how we're gonna do things and everything is smooth?


**Speaker 1** `[44:59]`

Well, based on what the person from Klaviyo said, I'm bad with names.


**Speaker 0** `[45:05]`

Eric.


**Speaker 1** `[45:06]`

The face in front of me. Okay, Eric. Based on what he said, it looks like that is it.


**Speaker 0** `[45:13]`

Cool. So, yeah, what I'll do is I'll give you some instructions or I'll give Robert some instructions on, like, what that field thing needs to get updated to and when, and then we can create our triggers based on that.


**Speaker 1** `[45:25]`

Yeah. Okay. That's fine. That works as well. But looks like that is it. Like, that is the field that they can use.


**Speaker 0** `[45:32]`

Because I I don't want it just to be deal stage. Sometimes it'll be deal it'll be a mix of deal stage and then certain fields being updated. So there might be a little bit of conditional logic there.


**Speaker 1** `[45:43]`

That's fine. Like, since we can do it, we can push the data through to a field. Like, we can push whatever you guys want.


**Speaker 0** `[45:49]`

Awesome So I'll get some instructions on that for next week.


**Speaker 1** `[45:52]`

Yeah. Define the process, and we can talk about it later. Cool. Do you have anything else?


**Speaker 0** `[46:00]`

Nope. I think that's everything. I have, like, 60 unread messages on Slack I need to go through. So.


**Speaker 3** `[46:09]`

Okay.


**Speaker 0** `[46:10]`

I. I finished that up, and then I'm done for the weekend. So we're good.


**Speaker 1** `[46:17]`

Okay. Well, it's it was a good week. It was a great week. So perfect. Have a great weekend in front of you. Send me all the issues here and there, and send me the oh, the lead scoring. The why I asked about the lead scoring was are we going to do the transition to setters to closers? Are you going to go with Saleskick? Like, what is the idea in here? What are we planning in here?


**Speaker 0** `[46:48]`

I might just need to see some more data on this real quick. Like, once I see the. Yeah. Kind of how the greeting is working, then we.

Can I would like to start using Saleskick. I just have a little bit too much on my plate before I wanna implement that.


**Speaker 1** `[47:08]`

Yes. Too much apps. Too much testing.


**Speaker 0** `[47:11]`

Too many things going on at once, so I'm probably gonna hold off a couple weeks on that. That might end up just being a thing that I do with the newer account manager in the future. Yeah. Yeah. I we'll we'll figure that out. Right now, things are working. We're getting more profitable with ads, so I'm I'm happy. But we'll continue to improve things as time goes on.


**Speaker 1** `[47:36]`

Okay. Cool. Awesome.


**Speaker 0** `[47:38]`

Yeah. As long as I can get some of that visual for, like, how many bookings per grade and how many shows per grade, how many closes per grade and that type of stuff, I just wanna make sure that the grading logic is good, and as soon as I understand the grading logic is good, then I can say, okay. Let's start moving forward and taking the closures or taking the setters out of the process here, only closures here, and start to make decisions.


**Speaker 1** `[48:01]`

Okay. Perfect.


**Speaker 0** `[48:02]`

We're waiting for some backend tracking as well with Meta. So I'm waiting on a few action items from our dev team before we, like, fully launch the greeting. So that's also another kind of.


**Speaker 1** `[48:18]`

So many things are happening. I love when there are so many things happening. Okay. Perfect. But we just wanted to, like whatever we're doing, just reflect back and see how everything we have set up so far is helping or not helping. Because if something is not helping, we would like to remove it. If something is helping, we'd like to know about that so we can break around with our team. So.


**Speaker 0** `[48:38]`

I just wanna make sure that the grading logic is good. Once I understand if the grading logic is fine or if it isn't, I'll make some tweaks there, and then we can start to roll out the actual conditional logic based on grading.


**Speaker 1** `[48:50]`

Perfect. Works for me. Whatever works for you guys works for us as well. Awesome. Awesome. So, yeah, we'll update that, deliver those dashboards, and there are things to do. Yeah. For sure. You are keeping us busy. Okay.


**Speaker 0** `[49:06]`

And I appreciate you guys a lot. I know that you guys are are working really hard, and we give you ton of tasks. So Yeah. It's all good.


**Speaker 1** `[49:13]`

It's all good. So far, so good. Perfect. Have a great weekend ahead, and we'll talk in Slack.


**Speaker 0** `[49:19]`

Sounds good. Have a great weekend. Bye bye.


---

## Metadata

- **Meeting UUID:** `551eb513-1ca7-456a-948b-dc14ff191b83`
- **Transcription UUID:** `17b7308d-3fde-4c18-913d-0b2799549bc1`
- **Recording UUID:** `f8e8a53a-b2a6-4c9e-b83c-98c96a4fa767`
- **Processing Status:** notes_available
- **Avoma URL:** https://app.avoma.com/meetings/551eb513-1ca7-456a-948b-dc14ff191b83