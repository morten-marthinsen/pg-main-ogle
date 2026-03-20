---
title: "Infusionsoft - Basic Setup"
date: 2018-06-01
duration: 11m
duration_seconds: 686
vimeo_id: 273029087
folder: "VCTO"
source: vimeo
transcription: whisper-turbo
tags:
  - knowledge-base
  - video-transcript
  - vimeo
  - whisper
---

# Infusionsoft - Basic Setup

**Date:** 2018-06-01 | **Duration:** 11m | **Folder:** VCTO

---

Okay, so in this video I'm going to walk you through the basic things you need to set
up in a brand new Infusionsoft account. Just make sure you have all the settings set properly and all your information is populated. Now typically when you enter a brand new Infusionsoft account, when you've just signed up, there
is a wizard that will show up here that will walk you through a lot of the process. So you can certainly use that wizard and fill out the information that goes through there. But even if you're done with that wizard, you're just going to want to check these settings
to make sure everything is set properly.

So what we're going to start with is under the admin menu, you're going to go to settings. And then there's just a couple areas here that we're going to want to go through. So first of all is your company information. So in here put your name, your address, your city, your zip code, all your different contact
information. And also make sure you set the time zone to be the correct time zone that you're located
in.

Now here is also where you can create custom fields for your contact records. So if you know that there's certain information that you're going to want to store beyond
the default fields that come with Infusionsoft. So by default, so if I were to add a contact for instance, you can see that these are all
the fields that are included by default. You've got your first name, your last name, your company, their job title, what type of person
they are, who the owner is, what the lead source was, their billing address, their phone numbers,
their email, website, Twitter, Facebook, LinkedIn, the time zone they're in, additional address
like their shipping address. You have additional information such as their assistance name, social security number, birthday,
spouse, things of this nature, as well as username and password fields.

These are useful for storing their logins, you have a generic notes field. Some of these tabs were created by me. So the events field, the pipe drive field, and probably the sales rep fields. These were custom fields that I created on that previous page. So everything under general address, additional info, and person notes are default fields.

So if you need to create additional fields, then you come over here under contact. So you click go, and so this will show you all your existing fields, and then basically,
if you want to add a new field, you just click add. Now, there's also tabs and headers, right? So tabs were those tabs that I just showed you at the top of the contact record, and then
headers are kind of section dividers within each tab. So under demographics, I have a tab named demographics, and I have a header called list, and then underneath
those, I have custom fields to store these different pieces of information.

But there's different field types that you can add. So you can add a text field, which really the most common ones that you're going to use in
here are text fields, and probably date time fields, date or date time fields. I typically don't use the drill down or the drop downs or anything like that too much only
because they're not well supported in other systems. It's hard to get the data to populate into those fields properly. So usually you just store that data in a text field, but you do have different choices here
that you can choose from.

So you just select the type of field, and you just give it a name, and then if you've already
created the tabs and the header, then you can select under advanced options. You say, I want to put it under the demographics tab, I want to put it under the header named list. You can also add new tabs or headers from here. So that's how you create the fields. And you also have custom fields that you can create for other things.

Typically this is the only place I'll use them. Sometimes I'll create some custom fields for orders, but that's about it. So again, fill out the company information, your time zone, and you can add fields along
the way so you don't have to add them all now. The other main settings that you need to check are under marketing settings. So by default, these default thank you messages here typically aren't used where whenever
we create a form or something like that, we're going to redirect it to an actual landing page.

So typically you wouldn't use these, but if you wanted to customize these, you could by
just going into edit mode and you can customize this. But really the main thing you need to set up here are number one, your email defaults. So this is the address information that will appear at the bottom of your emails for CAN-SPAM
compliance and things like that. So this should contain your company name and your address and all that kind of stuff. And then how do you want it to show up at the bottom of an email?

Do you want it to show up as multi-line or single-line? System from address is pretty much going to stay the same. All these other settings are pretty much set for you by default, so you really don't have
to change anything there. And the only other things you might want to turn on, so automated list management. This is a feature of Injunisoft that will automatically tag contacts that haven't engaged with your
marketing in a while so that you can exclude them from broadcasts so you don't get spam complaints
or hit any spam traps or things like that.

So you can turn this on so that anybody that reaches 12 months without having clicked, opened,
purchased, or opted in, they will automatically be tagged as non-marketable and then you don't
have to worry about them. This is the threshold of when you... So there's two thresholds. There's unengaged marketable, meaning they haven't really done anything in whatever period
you set here. This would be four months, but you can still mark it to them.

Once they hit the 12-month mark and this is turned on, then you will not be able to mark
it to them unless they engage with something that you've already sent them. The other setting is the email authentication. This is where you kind of authorize your domain to be able to send emails from Infusionsoft. So this is a good step to do. What you end up doing here is click Add a Domain.

You select a domain. Now the domain that you select here is going to be dependent on the user account. So when you create a user account, whatever email address that user account is from, that's
the domain that's going to show up here. Once you select that domain, it'll give you a CNAME record. And you're going to go into Cloudflare and add a CNAME record as the same way you did when
you set up your hosting or ClickFunnels.

So you just add a new CNAME, use whatever name it gives you here. You put this as the target and then you hit verify. And usually it'll take 24 to 48 hours before it'll verify. But that'll help with your email deliverability. Okay.

And then under marketing settings, you're going to have your template defaults. So this is where you can set who the default user is going to be sending from, as well
as for contact records, credit cards, invoices, leads, you can set what the default text will
be. So for instance, if you run an opt-in page where you're only clicking the email address,
but you use, you know, dear first name in the email, then here you can control if, if there
is no first name populated, what's it going to say? In this case, it'll say friend. Uh, so you can change this to nothing, uh, or, you know, a comma or, uh, dear marketer,
dear, dear real estate agent, dear insurance agent, whatever.

Uh, in most cases, friend is fine. And so typically you don't have to change these. Um, but if you wanted to change the defaults, you can change them here. And then also under e-commerce settings, uh, in order to collect payments and things like
that, there's some settings you'll have to set here, such as your merchant accounts. Um, by default, most of the settings are fine.

Most, most people aren't going to track inventory unless you're an e-commerce business. Um, you're not going to track product, unit cost, things like that. Uh, under orders, the default country is going to be United States. The billing information is going to be that, uh, US dollars. Um, by default you actually do want to auto charge and whether you're going to charge sales
tax or not, um, which merchant account do you want to use for manual orders?

How many times do you want to retry an order? So again, these are all set by default. So for the most part, you don't have to change these. So really the most important thing here is going to be your merchant account. And you know, you can get started easily with Infusionsoft just to get something up, running
quickly.

Uh, you can use Infusionsoft payments. Uh, it's a great way to get started just real quick without any hassle, but, uh, long term,
it's not the best merchant account to use. Uh, so you can use different merchant, uh, providers, you can use PayPal, you can use
other credit card processors. Um, so typically I recommend a, using a, your own credit card processor, someone that's going
to, uh, have an authorized.net payment gateway. Uh, but these are the accepted credit card processors that you can use, FlexPay, Nexus
Merchants, First Data, authorized.CartConnect, E-Way, or Network Merchants.

But if, if you do get a merchant account, you can get it through anybody, you can get it through
your bank, whoever, uh, just search merchant accounts online, find the best deal. But ideally you want to get the authorized.net gateway because this is the gateway that's
going to work with, uh, as many other systems and platforms that you may use. Uh, online as well. So that's what I would recommend for that. And then certainly if you want to accept PayPal payments, you can set that up here as well.

So those are the basic settings that you're going to run through for Infusionsoft. Um, in another video, we're going to talk about setting up your tags, uh, which again, we're
under CRM settings, under tags. So we'll talk about the different tag categories and how to structure your tags, uh, um, and
how to, you know, proper naming conventions to use, things like that. But in terms of just getting your account up and running and doing all the basic setup work,
uh, is those are the main things you need to address. So those are the main things you need to address.

So those are the main things you need to address.
