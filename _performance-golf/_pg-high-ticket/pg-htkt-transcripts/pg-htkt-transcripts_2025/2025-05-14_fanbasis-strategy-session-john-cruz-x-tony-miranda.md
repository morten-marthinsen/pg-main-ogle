# FanBasis Strategy Session: John Cruz X Tony Miranda

**Date:** 2025-05-14T17:30:00Z
**Duration:** 740.736 seconds
**Organizer:** tony@fanbasis.com

**Attendees:**
- David Testawich (david@performancegolfzone.com)
- Tony (tony@fanbasis.com)
- John Cruz (john@performancegolfzone.com)
- Assal Moradian (assal@performancegolfzone.com)

---

## Transcript


**Speaker 0** `[00:55]`

John, how are you doing?


**Speaker 1** `[00:57]`

Hey, Dave. Good morning.


**Speaker 0** `[00:58]`

Good morning.

David, good to see you again. Yeah. How's it going? All good. Can't complain. Sunny Miami here. So. Nice.

Okay. Cool. I saw that Sydney was able to start getting that data migration going. Nice. That's good. Also checked out your guys' accounts, saw that started creating some products on there, which is good to see.


**Speaker 2** `[01:29]`

Yeah. John, how are you feeling with everything so far with everything you've been sent?


**Speaker 1** `[01:33]`

Yeah. I've been starting to make some payment links, and I'm just waiting for how will we integrate the access here in fan bases to our website. I think it's on Wordpress.


**Speaker 0** `[01:47]`

Yeah. Yeah. Let's go over that right now. So. I assume you guys use Zapier a lot from based off our conversations, you guys are probably running 1,000,000 Zaps. Correct? Yeah. Okay. Perfect. Do you do you prefer me to kind of show how to how the Zaps work on our end, or do you wanna, like, show your current Zaps and how we can kind of change them?


**Speaker 2** `[02:10]`

I mean, we have no Zaps between Checkout Champ and us. Checkout Champ is pretty limited with what we can and cannot change in in Zap and API. So this is where we're gonna be setting things up from scratch. Awesome. But, yeah, we can set those up, and then I can work with my tech contractor to make sure that anything else that we want kind of in between as tasks, we can add in there.


**Speaker 0** `[02:32]`

Okay. Awesome. So I'll just give the quick breakdown. So let me know if you guys can see my screen. Yep. So pretty much this is a fresh Zapier account. Pretty simple. All we have to do is create and select the trigger. So the trigger for, for fan basis, all you have to do is set up the fan basis. It'll be the first one that shows up. Trigger events, you guys have a host of different options. Pretty much for this one, what we'll be doing is new sale. As well, I saw that you guys also have some subscription products. If you want to revoke access when a subscription cancels, that's also something that we can set up with subscription canceled.

But for this example, let's just do new sale. So when you connect your Fanbase's account to Zapier, it's so important to make sure you sign in with the master email. By by master email, I mean the admin email on your guys' accounts. Let me check real quick of what it is just so I can. I believe it's Fraz.


**Speaker 2** `[03:35]`

Apps?


**Speaker 0** `[03:36]`

Yes. It is. 4 minutes ago. Perfect. So make sure you're connecting with Fraz's account, then you click continue. You could test trigger. Obviously, there's no there's no transactions that have gone through yet, so we would just skip it. Perfect. Now pretty much what this is telling us right now is whenever any sale comes through your fan basis, this will go through. So there's two ways that we can filter that. We can use filter or path. Personally, I like using path. So what this pretty much means is whenever a new sale comes from a certain product, it will follow this path, and when a new sale comes from another product, it will follow this path. The best way to basically filter it out is using the product IDs. So when we choose a field, we would choose the product ID. The condition will be text exactly matches, and then we'll just choose j t tenancy IP experience, for example. Okay.

We'd input that. Click continue. Now I'm not sure exactly how you guys run the the transactions on your end. I know some people that obviously, these are these links don't necessarily work like invoices even though you can use them like that. Meaning, like, that you use them for one time or use the same link for several different individuals. If you are using them for several different individuals, instead of using product ID, you can use product title.


**Speaker 2** `[05:16]`

Got it. Can you add my fathom in here, by the way? I know that we have There's a note here.


**Speaker 0** `[05:20]`

Oh, yes. I see it. Yeah. So those are pretty much the two options. If you're using these links more as invoices, a % suggest using the product title. This way, you could keep consistent, and this will actually run regardless of the user you're using it for. If you're using the links the same link multiple times, definitely use product ID. Okay? Now for action, this I do not have a Hubspot account, so we're gonna be kind of limited on the configuration. However, it's very simple. There are several different actions you can create on Hubspot.


**Speaker 2** `[05:56]`

Yeah. This, feel like, is relatively simple for our end. We'll probably just be on our own processes, but it would more so be updating from custom object or updating deal.


**Speaker 0** `[06:08]`

Yes. Exactly. So create contact, create products, ticket, however you want to do it, and then on Hubspot, you can now trigger the automations on there with whatever deliverables you're giving out, and then once you choose an action event, like I said, I don't have a I have a an account, so we're not able to proceed to the next step. However, you'll be able to map all of the fields together. Yep, and this is, you know, the total amount, the payment method, the click ID, and as well, there's an ID with the in with the individual's purchase as well. So that's pretty much what you can do on Pathwise. You can also do even though it says new sale, this also includes 4 subscriptions. You can also do the same when a subscription is canceled.

And then you would choose that event the same way. So, honestly, it's fairly simple. Do you have any questions on this?


**Speaker 2** `[07:11]`

I don't know if this is for you or Assal. Do we have, like, split pays outside of a buy now pay later happening? Like, if we did, like, a two pay 2,500 now, 2,500 next month, is that gonna be happening in outside of a buy now pay later, or is that just gonna be deferred to a buy now pay later?


**Speaker 3** `[07:30]`

No. It does it does happen outside of buy now pay later. Okay.


**Speaker 2** `[07:35]`

So within a certain purchase, are we're gonna be able to link both of those transactions then to the same ID, or how do they link? Is it just on the product ID?


**Speaker 0** `[07:48]`

Yeah. So you can link it with the customer's email. You can also link it with the with the product ID and the individual product as well. K, and will you will you guys be using the card on file feature? Yes. Right? Yes. Yes. I believe so. So, yeah, that'll be with the with the product ID. That's created when a user purchases that. They'll create a unique. Yeah. Even if we're using.


**Speaker 2** `[08:13]`

Like, the same product name or whatever you called it, I think product title. Yeah. Product ID would be different per every transaction or per every person purchases?


**Speaker 0** `[08:23]`

It'd be different for each transactions. So there's, like, a product ID, and then there's a transaction ID. Okay.


**Speaker 2** `[08:31]`

Got it.


**Speaker 0** `[08:34]`

Does that make sense?


**Speaker 2** `[08:38]`

Transaction. Yeah. It makes sense. I'll set it up, and if I have any questions, I'll just let you know. Yeah.


**Speaker 0** `[08:44]`

Awesome Any questions on Zapier? All makes sense. It's honestly fairly simple once you, like, get into it.


**Speaker 2** `[08:53]`

Yeah, and again, we have a variety of different Zaps, so this is relatively simple compared to what we Yeah.


**Speaker 0** `[09:00]`

We have. Yeah. Okay. Awesome. Okay. So outside of the Zaps, I know, obviously, John, you went in. You came in here, created the payment to subscriptions. Any questions on the subscriptions? I know sometimes the wording of some of these can be a little bit difficult or confusing.

Oh, you're muted.


**Speaker 1** `[09:32]`

Yeah. I think I'm good most part. I'm just checking in if we're gonna do the actual access of the clients in Hubspot, or is it on Zap? For example, if they're able to access the features in our website, how are we gonna enable the access? Is it gonna be through the Zaps or Hubspot?


**Speaker 2** `[09:56]`

I think it'll be through Zaps. So what we'll do I'd rather not have Hubspot be the in between here. I just like to have it go straight from fan basis to Wordpress and base it off of the trigger of either a subscription made or a purchase or whatever we're we're calling it. As soon as that trigger and that filter gets created and we we create that path, John, we'll just add in the trigger or the action to be create account or update account on Wordpress, and we'll go from there. So it'll probably be something we'll have to loop in branded. Oh, okay.


**Speaker 1** `[10:32]`

Yep. Okay. Cool. Thank you. Okay.


**Speaker 0** `[10:35]`

Awesome Any questions what you guys have in here?


**Speaker 2** `[10:43]`

I don't have anything crazy. Again, I think a lot of it's just gonna come down to what we do for actions in Hubspot. So.


**Speaker 3** `[10:50]`

I do have one. Yeah. So we were talking to Donnie yesterday, and he was just letting us know that you have a feature where you can actually pull people's credit or pull their income or something like that, and he wanted to know how we could how we could implement that. How do we do that? Okay.


**Speaker 0** `[11:04]`

Awesome. So that's actually our lead IQ feature. It's coming out in the next week or two. I had to talk with the with our chief of product to see exactly the ETA on that. It we haven't made it live yet. I could see if they started rolling it out to a few people because I'm pretty sure it's already built out. We just need to put on, like, select accounts. But, yeah, I can definitely, I'll check in with her first, and then we can schedule a meeting or send you over some a few things breaking it all down. But, yes, you'll be able to see the customers, pretty much all of their information. If they're married, what's their credit score, how much debt they have, what's their income, where do they live, you know, what type of cars do they drive. It's it's really good. But, yeah, I can set that up for you guys once I have a clear answer. I'll go straight.


**Speaker 3** `[11:53]`

Yeah. Let us know when you have that. We would love to use that feature. Yeah. A %. Alright. Cool. That's all I had.


**Speaker 0** `[11:59]`

Okay. Sounds good. I know we're right now, we're working on the data migration. If there's anything that comes up within that, we're setting we're doing all of that. Just shoot a message on Slack. Also, anything else, you can also message us on there. Okay? K. Thank you. Okay. No problem, guys. It was great seeing you again. Bye. Cheers.


---

## Metadata

- **Meeting UUID:** `f581da71-7d22-42f7-b7fb-0c2579b35541`
- **Transcription UUID:** `5890d3d8-5dbb-4c02-a12b-d3d91f6c2780`
- **Recording UUID:** `9e39dde9-ea03-42da-a35b-23c9c90094a8`
- **Processing Status:** notes_available
- **Avoma URL:** https://app.avoma.com/meetings/f581da71-7d22-42f7-b7fb-0c2579b35541