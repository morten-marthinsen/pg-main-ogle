---
title: "GoogleTagManager"
date: 2018-08-28
duration: 13m
duration_seconds: 799
vimeo_id: 286985410
folder: "_unfiled"
source: vimeo
transcription: whisper-turbo
tags:
  - knowledge-base
  - video-transcript
  - vimeo
  - whisper
---

# GoogleTagManager

**Date:** 2018-08-28 | **Duration:** 13m | **Folder:** _unfiled

---

In this video we're going to talk about Google Tag Manager. So Google Tag Manager is essentially a user interface for all of your various marketing tracking pixels, analytics pixels, JavaScript codes, things like that that you commonly need to install on your site so that you get proper tracking. Now the issue is that a lot of times you'll have to install each of these little pieces of JavaScript on your site in order for tracking to work. And that may require a web developer depending on what platform you're using. And also every time you add a new script to your site there's a chance of something breaking or the script slowing down the page from loading, etc.

So Google Tag Manager basically eliminates all that. It's one central place where you can manage all your tracking pixels in one place and add one snippet of code for Google Tag Manager to your site just once and then from there you can control what pixels are loaded, which pages they fire on, things like that. So the easiest way to talk about it is to just go in and dive in and show you some examples. So you can have multiple different containers, right? So you can set up as many as you want for different sites that you have, things like that.

I like to create a core tracking container. So this contains the core scripts that I will use on any site that I build. And then you can either add this container as well as another container that's specific to the site. Or you can use this container as a template and export it and export it and import it to any new sites you set up. So before we start talking about that, let's go through the basic setup and structure of this.

So essentially Google Tag Manager has three primary things. Number one are tags. So tags are the actual JavaScript analytics codes, etc. that you will be using on your site. So whenever you need to add a new site, a new tag to your site, you just come in here, you can select new.

I'll open up some of these existing ones. So some of them are predefined, especially the Google related ones. There's predefined ones for Google AdWords or marketing tags and Google Analytics tags, things like that. But a lot of them will be custom. So in fact, like Infusionsoft just gives you this snippet of JavaScript that you need to include on your pages.

So you just paste the actual script that the platform or software tool that you're trying to add gives you. You paste it in here and then you determine where you want this to fire. In this case, basically all of these are firing on all pages where this Google Tag Manager code is installed. So those are tags. And again, you can put pretty much anything you want in these custom HTML tags.

But typically it's some form of JavaScript. Now triggers are the rules where they're going to fire. So this particular one, again, because everything's firing on all pages, doesn't have anything. So let me go to a different one here. And so if I go to E5 method, which was our E5 launch funnel, you'll see we have lots of different triggers here.

And the triggers pretty much correspond to key events that we want to track, right? So did somebody viewed an opt-in page? Somebody actually opted in? Somebody viewed the video related to that opt-in? Things like that.

As well as, you know, did they view the order form? Did they purchase the full pay or the pay plan? Did they buy the upsell and view the upsell? Things like that. So these are all defined primarily through a page path.

So when you set up the rule, you just define, you know, what URL should this thing fire on? In some cases, you'll have additional variables. Something's like this, like an opt-in. We want to make sure that it's not just somebody visiting the video page, but also that the email address is in the URL. And that tells us that it was an opt-in, not somebody just returning to the video to watch it through an email or something like that.

So that's where variables come into play. So variables are kind of predefined values that you can track. Usually the core one that everybody's going to have is the Google Analytics settings. So when you set up Google Analytics, the first thing you do is you set up the Google Analytics variable. And in here, you're going to put in your Google Analytics tracking ID, as well as you can configure some of the other settings for Google Analytics,
such as custom dimensions, whether to turn on advertising, whether you want to e-commerce, cross-domain tracking, et cetera.

In most cases, all you've got to do is put in the tracking ID. But your unique specific needs might require you to set some of these other variables as well. But then there's other things, like, for instance, like I said, I want to know whether the email value is in the URL on certain pages. So I will create a variable for email. This is a type query.

And you can see there's other different types here that you can look for. Query means this is a query string parameter in the URL. And so I'm searching for this value in the URL. So if the query key of infusion field email is in the URL, Google Tag Manager is going to grab me the value of that. And then I can use it later, not only as part of my rules for page triggers,
but I can also use it essentially as a merge field in certain tags.

So if I go and look at a tag here, such as the KISSmetrics stuff,
you can see here that that merge field is being used in this tag to send the email address of somebody who just opted in over to KISSmetrics
so that I know exactly who that person is versus just some generic random identifier. So that's really, you know, at the end of the day, that's really the basic structure. You put in the tags from the different softwares that you're using. It could be Bing, it could be ConversionFly, Facebook, FullStory, FunnelDash, Graphly, Heat. You know, there's lots of different things that we use depending on the funnel and how complicated it is and what we want to track.

But we just put in all those codes into here, and then we simply define where those codes should fire. And in some cases, you can also set some other rules in terms of what needs to fire first. So, for instance, the KISSmetrics code, this is the core KISSmetrics code, and then these are specific event codes. So, if you'll notice, you'll see here under the tag sequencing, so I'm saying here that before this tag can fire,
I want to make sure that the core KISSmetrics tag is already fired. Otherwise, this script would fail because it doesn't have the actual KISSmetrics code on the page yet.

So, you can kind of set those rules, what needs to fire before or after as well. A little bit more advanced, but just be aware that you can do that. And then to actually add the code, what happens is, so when you first set up your container, you'll get a snippet of code that goes,
one snippet goes in the head of the site, the other goes in the body of the site. So, if you're using ClickFunnels, for instance, you would go into your funnel, you would go under settings,
and then you'll see here that this is the head tracking code, and this is the body tracking code. So, this is where you put it.

You hit save and update settings. That will then add that code to all the pages inside this funnel. So, now every page on there has the Google Tag Manager script. That doesn't, again, doesn't mean that everything is firing on every page because you control that by rules. And the other thing that you can do is you can actually test this out.

So, whenever you create a new tag, you can test it to see how it works. So, I'm going to take this site here, Smoking Funnel Tips. So, if I click the Preview button, so now this would be a scenario where I've added a couple scripts. I want to test everything before I fully launch it to make sure it's working right,
to make sure it's not causing any problems with the site, and also, you know, just to check and see,
did I get all the rules right, et cetera. So, when I'm in Preview mode, when I go to the site, you'll notice, and again,
this is something that only you see because you're logged in to Google Tag Manager.

So, visitors could still be coming to the site. They're not going to see this. But what you'll see is this window shows up here. And now it's telling me, all right, here's all the tags that fired on this page. So, these are the tags that have rules related to this page.

Here's all the stuff that didn't fire on this page because they don't meet the proper criteria for whatever reason. And, you know, if you need to debug this at all, for instance, if you want, you know,
there's a tag that should be firing on a specific page but it's not, you can look at the variables for the page. So, if you click on the page view and you click on variables, right here, it'll show you, all right,
this is the URL, this is the page path. So, if you were defining a rule based on page path, this would be the rule, you know,
it would just be forward slash. If I went to a different page, such as the blog, and now I go to the variables,
you'll see that the path for this should be marketing-funnel-blog.

And you can see that, right, you know, the infusion field email is not defined. So, that was the custom variable that I set up for the email. Now, if it was in the URL, so if I just type something in here. Maybe you can't see that, so let me, so you can see here,
I'm just adding this value into the URL and reloading the page. Now, when I go to page view and variables, you'll see that it has now picked up the value
that I put in the URL, so that now I can capture that and use that in, again,
as the merge fields, et cetera.

So, that's, at the end, you know, at the end of the day, that's pretty much it. The benefits of using Google Tag Manager, one is simplicity. It's one line of code that you add to your sites,
and then you don't have to keep messing with your site whenever you need to add new codes. And two is control. You can be much more specific about how and when, which tags fire,
what order they fire in, things like that.

All of which helps to speed up your site,
so you don't have a bunch of different scripts trying to load simultaneously. Google Tag Manager kind of controls the loading,
so it doesn't affect the load time of the site. And, you know, there's lots of other advanced uses of Google Tag Manager. For instance, you can have it, you can have a tag fire
when somebody clicks a particular button, right, or things like that. In most cases, like I said, I usually only use the triggers that are related to it,
somebody viewing a specific page.

But just so you know, you can set this up for lots of different elements. So somebody clicks on something, somebody clicks on a link,
somebody submits a form, somebody watches a video to a certain amount,
different things like that. But again, most of the time, you're just going to use the page view element here. And like I said, I would recommend having a core container set of tags,
the things that you're going to need to apply to all sites. And again, you can, so in ClickFunnels, you can include more than one of these, right?

So this is the container for this. So you might have the core tracking container first,
and then the site-specific container second,
or you can just export and import into a different container. So if I wanted to use this setup somewhere else,
I could just export container, choose a version or a workspace. So by default, it creates different versions as you save and add new tags,
but you're typically just going to select the default workspace. It'll give you this JSON code that you can export to a file.

And then when you're ready to import it into a new container,
you just come back here and say import container. It'll import all those settings, and then you just tweak what you need. You can also control who can publish and who can't. So under user management, you can set different permissions for who's an admin,
who's a user, and what that different user can do
in terms of whether they can publish things or they can just add a tag,
but somebody else has to publish it, things like that. So that's pretty much it.

It's completely free to use, and I highly recommend you use it.
