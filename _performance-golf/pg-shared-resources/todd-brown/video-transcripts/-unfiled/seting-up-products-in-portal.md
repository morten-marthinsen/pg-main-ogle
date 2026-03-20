---
title: "Seting Up Products In Portal"
date: 2025-02-10
duration: 22m
duration_seconds: 1320
vimeo_id: 1055277798
folder: "_unfiled"
source: vimeo
tags:
  - knowledge-base
  - video-transcript
  - vimeo
---

# Seting Up Products In Portal

**Date:** 2025-02-10 | **Duration:** 22m | **Folder:** _unfiled

---

Have 'em all this weekend. I gotta still button up a few things on them. Okay? Uh, all right, so let's walk through kind of, kind of the core basic stuff then, hang on a second here. Lemme share screen that work.

Uh, let's, Nope. All right. Uh, all right. So before we even go into the portal, let's go to Fusion one that had a, um, okay, cool. So here's, here's a perfect example, right?

So this was, so this was the customer campaign for hypergrowth method. Um, and so the thing is you gotta separate the purchase of the main offer and the bump because these, both, these both technically fired at the exact same time. So you can't have, like, did they purchase the main thing and then have another goal here of whether they purchased the bump. It's gotta be, it's gotta be separate out both of 'em as entry points. Um, so that both things fire if they buy both.

Um, and in fact, this is a good campaign 'cause this one's got some instructions of basically just change the product purchase goal, the correct product set the customer membership access tags for the correct and change the product name under the campaign merge field, and update the email copy, which basically means that this one's got a generic template, uh, that if you go under here under Emerge Fields, you could just change the name of the product and that would update the emails. So the trigger pretty straightforward, they purchase the product. Any, uh, you know, you typically it's any purchase option, right? Versus a, unless you want, only want this to trigger at a specific price point or a specific payment plan, uh, and include all the different payment types. And then typically what needs to happen to give somebody access is, uh, so tag 'em as a customer of, uh, of this product.

Uh, I'm not sure why I'm tagging them as both of these, but whatever. Uh, and then give them the membership tag that would give them access to the product. We'll talk about the setting up the membership tag in a minute. Um, and then basically apply this tag grant portal access. So anytime you need to send somebody, Hey, here's your login information, blah, blah, blah, blah.

This is all you gotta do is apply this tag. It'll go through another campaign that checks to see if they're already a member or not. If they're not a member or generates a password, if they are a member, sends them an email with their existing password, et cetera. Um, but that tag handles all of that. And, and then just a simple welcome email and, you know, the welcome email, like I said, it uses that merge field.

Hey, so glad you bought this thing very wise decision. In a couple minutes you'll get another email, blah, blah, blah, blah, blah. Like, just kind of all the instructions of what's gonna happen, right? Um, so that's quick, easy. Like you can just clone this and this is what'll happen the for the bump.

Um, sometimes there's an additional email that you wanna send for the bump. Sometimes you don't. It just depends. But basically all we're doing here is same thing, applying a customer tag that they bought that bump offer. And, uh, and again, just making sure that they grant this will only run once, even if you apply the tag twice.

So like, if they're already in it, it's not gonna send it to them twice. But, um, but that's just kind of a safety catch, right? So like, 'cause technically anybody that buys this product would, this would, this would trigger, right? So, um, because these, these are both starting goals for, for this campaign. Um, so that makes sense in terms of, Yeah, in terms of the email, um, the email that gets, that gets, uh, fired off.

You said I could just go in there and I don't really have to edit that much, right? 'cause it has like all those merge fields in it. Yeah. Email, all you really gotta do is if, if you were to copy this campaign, all you'd have to do is go to merge field and change the product name. You don't have to touch anything else in the email.

It's, it's a very generic email that that doesn't really matter. Alright? So that's the basic campaign for how to deliver something, right? Um, the, so then after that, what needs to happen is in the portal, right? So a couple things need to happen.

The first thing is you gotta create a membership. If, if it's not something we've sold before, if, or in general for, for any new offer, I'll typically create a membership level. So if you go to m barium and memberships, and this portal can be slow at times a lot, do what you said and just kind of record a video. But let me explain it to you anyways, so just so you're clear on part of it. So basically the, the way you create a membership level, you can do it inside the portal.

It's pretty, you just go to a page, you say, I want to create this membership level. Basically what it does is it creates a series of tags, uh, in the membership category, which will just be the name of the product, uh, along with a couple others. So basically every product has copy legends, copy legends, payoff, copy legends, canceled, copy legends suspended, right? So this, these are basically the, so tag gives them access and the payoff cancel and suspend tags prevent access, right? Like this is, if their on a payment plan and their payment fails, you would apply that payment failed tag, uh, which is something to consider, right?

So if you're gonna do a payment plan, uh, or it's a subscription or something like that, then in the campaign, like here, you may have something like this, like failed purchase, right? So they buy the thing and then if the purchase fails for that product, whatever it is, uh, hypergrowth, uh, and is it, you know, like for the subscription or whatever, which pay plan or any, any, if any payment fails on it, whatever, then, uh, then you would do this like, so payment failed purchase, so now we're gonna apply a tag that it failed. Um, so supply, hyper growth, payment failed, right? Uh, and then you can also do, I think you would just do the product purchased again after this, like, so that if the payment ended up going through, then you would remove that payment failed tag so that they, they could get access again, again, only matters for subscription stuff, but, um, got it. Okay.

That's basically the structure of these tags, right? Um, and so then also when you're in the portal, see if I can get somebody else's f*****g portal like Vincent's. Uh, alright, so under Memberium, you go to memberships, WordPress is f*****g running slow today. What the, all right, great. Um, so you come under memberships, you scroll down to the bottom and be like, Hey, I wanna create a new membership level, like name of product I wanna create in the membership category, and I wanna include the creation of the suspension and cancel tags, and then click create.

Okay? That'll create those tags in infusion. It'll also create the membership level inside of here so that when you are setting up a product, you can choose, uh, which membership level they gotta have to get access to it, right? So that's all you gotta do on the Mper side. Um, and then inside of Learn Dash, you know, you basically have, uh, ours is ours.

It says courses, modules, and lessons. John says courses, lessons, topics, same structure. So a course has modules, module, and a course could just have modules, right? Like on a complicated course, like most of ours are just the course and then the modules. Um, but sometimes you could have modules that then have other lessons in between them, right?

So even if you look at the way the, the top one course is top one is a, the top one thing is a one course, there's a module basically for each event, and then inside that module are all the presentations from that one. So it's just, you know, it's a folder hierarchy, basically. Um, alright, so inside of a course, Oh, Alright, so this is like the, the main description of the course. Uh, you've got this short description, which is what usually shows up, uh, underneath the image on the dashboard. Um, and there is typically a, Here's the, Uh, so usually you would set the featured image to be whatever you want the icon to be on the dashboard.

Sure. How that went There, okay? Uh, Yeah, the cover photo Somewhere in here is the featured image as well. Um, but that's how you set cover photo. Cover photo is different.

Cover photo is more like the banner across the top of the course. Um, typically you don't set that, it's usually just a featured image, but in terms of access to the thing, uh, yeah, there you go. So it's just right at the top. So this is the featured image, the image of the course, the descriptions. Alright?

Um, so first thing you gotta do is, is you gotta give access to it. Um, and basically it happens here, right? So where says learn dash barrier integration, you, this is the auto enroll tag. So basically what auto enroll means is that anybody that has this tag will be automatically enrolled in this course when they log in, which means that they can see it on their dashboard and they can go through it, et cetera, right? That's one step of, that's just making it kind of available to them.

The, the actual thing that controls whether they can access the content is, is basically this, right? So in general, the course itself in general, you auto-enroll somebody into the course, but the course itself doesn't have to be password protected. 'cause you want people to be able to click into the course and kind of see what it's about and see what it contains and maybe want to buy it, right? So you don't have to, you don't have to block anything here. What you end up blocking are the actual modules and lessons, right?

So mm-hmm. Within any of the modules or lessons, that's where you would check off, hey, they gotta have this membership in order to be able to access this thing. Does that make sense? Mm-hmm. Um, at the course level, you also have this builder, uh, inside of LearnDash and this is basically where you, uh, structure the, build the structure of the course.

Uh, f**k, it's not loading, But I, um, 'cause I actually use the same thing. The only difference is I use iMember 360, it's the same software but for active campaign. Um, but I don't actually do this. Like I have a guy that does it for me, but like, could I just, if if, if we already have like an existing course that has like similar s**t, could I just duplicate the course and then change all this tagging stuff? Like could I just duplicate like the E five book course, let's say, and then swap out the deliverables and change the tags?

Or do I have to build everyone from scratch? No, you could, uh, you should be able to cl it doesn't clone perfectly all the time. So you just gotta, you just gotta go through and check everything for sure. Okay. Um, but yeah, that's the only, that's the only downside.

Um, but yeah, technically you can clone it and, and just, I mean, re creating the structure is pretty, pretty quick and simple typically, right? But, um, and again, dude, like I've told you a million f*****g times, like if you just, if you just want to hand me the s**t and be like, dude, set this up, like, fine, I'm more, more than happy to help out. You know, we can, and if you want, if you just wanna get rid of all this tech s**t so you can work on what you do best, like we can work out a small retainer or something where I'm still building funnels and what I, you know, I still wanna have, I, I wanna have a plan B for Peter anyways. 'cause I don't know how, I don't know how much longer this lasts beyond May. So Yeah, I hear you man.

Um, and, and again, like, I don't want you f*****g dealing with this kind of b******t of like, well, what a f**k can I get into WordPress? And like, that's, that's gonna drive you bad s**t. Yeah, you, you're, you're right about that for sure. Um, so yeah, if it's, if it's simple, you know, if it's, as long as it's not a 30 f*****g, as long as it's not a new new E five with, you know, 30 modules and a bunch of f*****g PDFs and all this s**t, then it's a simple, simple course bump offer, which is probably gonna be a, you know, two videos and a, and some slides. It's not a big deal, but I just wanted to, but yeah, so, so if you have, if you've been using iem, it is exact, then barium an I member work exactly the same way.

Uh, LearnDash obviously works exactly the same way when it works. And, uh, challeng is having the same kind of like an issues. So do you think it's a WordPress thing? I mean, LearnDash has been, has been getting Flakier and Flakier, this just isn't showing there's a change the way, I don't know why this is not switching to the builder other than, again, this is John's site, so I don't know when the last time he updated anything was. Let's see.

Uh, So yeah, so now, so this is the builder, right? So again, these are all, these are all modules. Uh, in this case there's no lessons within any of the modules, it's just the modules. Um, so here you just kind of map out the structure of it. If you wanna create a new one, just create a new module.

If you wanted to create a lesson within the module, you open it up, click New lesson. Basically all that's doing is creating pages, right? Um, and then over here in the course content, you can see all, all the pages that are associated with it. Click on it. You can go to them basically on this page.

Um, um, are you gonna, all you typically need to do, especially if it's just a video, is go to settings, turn on this little video progression button, and you put in the Vimeo URL here. That's pretty much all you gotta do. Um, and then what if it's An S3 link? Then the S3 link would go there. All, all the videos go in Vimeo.

The only thing that goes in S3 are PDFs and slides and okay. And MP three, anything that's downloadable, uh, just goes in S3, but all, all of Vimeo. Um, and then, like I said, op for this page, you just set whatever permission is needed. This one doesn't f*****g have one for whatever reason. Uh, but yeah, typically you would say, okay, they gotta have hypergrowth method to, to access this page and that's it.

Got it. Okay. So trying to think if there's anything else. No, I mean that's pretty much it.
