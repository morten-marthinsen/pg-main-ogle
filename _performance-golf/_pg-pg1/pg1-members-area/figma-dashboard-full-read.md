# PG1 Members Area — Full Figma Design Read

**Source:** Figma file `[Web] Dashboard` — `jvKJPiZQNUsU6hs5CbZT2e`
**Node:** `1299:6562` (Working canvas)
**Read date:** 2026-03-04

---

## Table of Contents

1. [Dashboard — PG1 Pulse Smart Path](#page-1-dashboard--pg1-pulse-smart-path)
2. [My Courses](#page-2-my-courses)
3. [Video Player](#page-3-video-player)
4. [My Favorites](#page-4-my-favorites)
5. [Settings — Golfer Profile](#page-5-settings--golfer-profile)
6. [Community](#page-6-community)
7. [Dashboard Minimal (Freemium)](#page-7-dashboard-minimal-freemium)
8. [Pulse Survey Modal](#page-8-pulse-survey-modal)
9. [Upsell Modal — Existing Users](#page-9-upsell-modal--existing-users)
10. [Upsell Modal — New Users](#page-10-upsell-modal--new-users)
11. [VIP Coaching — My Coach](#page-11-vip-coaching--my-coach)
12. [VIP Coaching — Swing Upload](#page-12-vip-coaching--swing-upload)
13. [Scratch Club — Practice](#page-13-scratch-club--practice)
14. [Scratch Club — Record & Track](#page-14-scratch-club--record--track)
15. [Video Player Expanded](#page-15-video-player-expanded)
16. [All Courses](#page-16-all-courses)
17. [Pulse Program Modal](#page-17-pulse-program-modal)
18. [Pulse Program Expanded](#page-18-pulse-program-expanded)
19. [User Preferences — Manage Profile](#page-19-user-preferences--manage-profile)
20. [User Preferences — Subscriptions](#page-20-user-preferences--subscriptions)
21. [Design Tokens](#design-tokens)

---

## Page 1: Dashboard — PG1 Pulse Smart Path

**Frame:** `3395:40313` — 1440 x 8352px

### Layout

- **Top nav bar** (109px): Promo banner + main nav (PG logo | nav links | search/help/cart/account icons)
- **Left sidebar** (320px): `Nav-Side-Expanded` component
- **Main content** (1076px container within 1120px body)
- **Footer** (51px)

The main content uses a **vertical timeline/progress tracker** running down the left edge (~51px column with numbered step indicators connected by vertical progress bars), with content sections (~961px) to the right.

### All Copy

#### Nav Bar

- `Get 10% discount until Jan 25, 2024` (promo banner)
- Nav links: `Docs`, `Products` (dropdown), `About`

#### Page Heading

- Breadcrumb: `/ PG1 Pulse (Smart Path)`
- H1: `pg1 Pulse Smart Path`

#### Section: Smart Path Overview

- `Need help? Take a quiz`
- `-PULSE` brand badge
- `25% Off` discount badge

#### Section: Course Videos (Learn)

- `Video #1: <Course> Recommended Video`
- `Video #2: <Course> Recommended Video`
- `Video #3: <Course> Recommended Video`

#### Section: Meet the PG1 Pulse Coach (Connect)

- `Meet the PG1 Pulse Coach`
- `Chat With Your Coach`
- `PG1 Certified Coach` — `Online now`

**Chat messages:**

> **User:** Hey Coach! I'm new to PG1 and just getting back into golf after a few years off. I'm struggling with consistency off the tee. Can you give me some tips or feedback?

> **Coach:** Hey Scott, welcome to PG! Definitely -- send over a video of your driver swing from both the down-the-line and face-on angles if possible. Once I review them, I'll give you a breakdown and a drill or two to work on. Looking forward to seeing your swing!

> **User:** Awesome, thanks! Just uploaded my latest clips from the range this morning.

> **Coach:** Got them -- nice work on the setup and keeping a steady rhythm. A couple things I noticed:

**Swing analysis overlay:**

- `Swing Flaw #1`
- `Spine Axial Rotation in Backswing`
- `Your shoulders need to turn more during the backswing.`

**Alternate coach chat:**

> **Coach:** Hey, Nikki, I just wanted to welcome you to VIP Coaching. We plan on reviewing your golf swing in the next 48 hours. I'll send you a custom video back with a plan to help you improve.

> **User:** Thanks PG, I'm glad to be here!

**Chat footer:**

- `Upload Swing Video`
- `*Please keep recordings under 1 minute for fastest upload time.`
- `Type your message here...`

#### Section: Ball-Striking Challenge (Practice)

- `Ball-Striking Challenge`
- `Full Wedge Contact Correction Drill: Fat & Thin Shots`
- Game Rule 1: `Pay close attention to where your club contacts the ground, and if this is in front of or behind the club. This drill helps you monitor your swing's consistency with the turf and low point control. Track your results to measure improvement.`
- Game Rule 2: `Make 10 practice swings hitting in front of the club, then 5 controlled swings with the ball even with the club shaft on the ground Keep track of your score out of 5.`
- `How many swings of the 5 contacted the proper spot on the ground?`
- `Completed Challenges` — `Full Wedge Contact Correction Drill: Fat & Thin Shots`
- `Chipping Challenge` (collapsed)
- `Putting Challenge` (collapsed)

#### Section: Download the Performance Golf App (Play)

- `Download the Performance Golf App`

#### Section: Scorecard / Round Entry

- `Victoria Park East Golf Club` — `Sarasota, FL`
- `Starting Tee` — `Blue - 7021 yrds` — `Slope 121 | Rating 72.2`
- `Round Settings` — `Number of Holes: 18 holes` — `Starting Hole: 1`
- `Round Score` — `Current Players: 1 Player` — `Add Player`
- `What did you shoot?` — `Detailed Round Entry` — `Submit Scorecard`
- Form fields: `Date`, `Course Name`, `Tee`, `Number of Holes` (`18 Holes` / `Front 9` / `Back 9`)
- `Total Score`, `How Many Greens in Regulation Did You Hit?`, `How Many Fairways Did You Hit?`, `Total Number of Putts`
- `Previous rounds` — `Need Help?`

**Scorecard table data:**

| | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | Out |
|---|---|---|---|---|---|---|---|---|---|---|
| Index | 17 | 5 | 1 | 13 | 9 | 15 | 11 | 3 | 6 | |
| Par | 4 | 5 | 3 | 5 | 4 | 5 | 3 | 3 | 4 | 35 |
| Player1 | 4 | 9 | 2 | 4 | 6 | 5 | 3 | 3 | 4 | 39 |
| Tee Club | 3W | Dr | 7i | Dr | 6i | 3w | 11 | 3 | 6 | |
| GIR | | | | | | | | | | 5 of 9 |
| Penalties | 1 | 2 | -- | -- | 1 | -- | -- | -- | -- | 3 |
| Putts | 2 | 3 | 1 | 3 | 2 | 2 | 2 | 2 | 2 | 24 |
| Distance | -- | 20ft | G | 3ft | -- | 1ft | 3ft | 2ft | 2ft | 30ft |

#### Section: Post-Round

- `Post-Round PG1 Pulse Check`
- `Update Your Focus To Get Your Next Big Win`

#### Footer

- `©2025 Performance Golf. All Rights Reserved. Terms | Privacy Policy`
- `Scratch Club Benefits | VIP Coaching Benefits | SwingFix AI Benefits | Contact Us`

---

## Page 2: My Courses

**Frame:** `5422:28707` — 1440 x 1994px

### Layout

- Top nav (73px) + Left sidebar (320px) + Main content (1076px) + Footer (51px)
- Content stacks: Banner → Featured course hero → Second featured section with course list → PG1 Assessment tracker → Recommended courses carousel

### All Copy

#### Header

- Breadcrumb: `/ My Courses`
- H1: `MY COURSES`

#### Banner

Component instance (text inside component)

#### Section: Where You Left Off (hidden title, visible content)

- `EXCLUSIVE OFFER!` — `25% Off`
- `When you subscribe to email & texts. You'll also be the first to hear about all our holiday sales!`

#### Featured Course List (right column)

- 3 course rows with placeholder titles

#### Section: PG1 Assessment

- Progress tracker with 5 circular avatar icons connected by progress bar lines

#### Section: Recommended Courses

- `True Swing Sequence` — `Category`
- `Simple Strike Sequence` — `Category`

#### Hidden Content (alternate states)

**Section titles:**
- `Where You Left Off`
- `Premium Courses`
- `Your Courses`
- `Available Courses`
- `Recommended Courses`
- `Your PG1 Pulse Assessment`
- `Your PG1 Pulse Recommended Training Program`
- `Start Your Smart Journey`
- `PG Courses`
- `Get the App`
- `Popular Training`

**Product cards:**
- `One Shot Slice Fix` ($128/$235, 4.2 stars)
- `Pain Free Distance` ($128/$35, 4.2 stars)
- `Square Strike System` ($128/$235)
- `True Swing Sequence` ($128/$235)

**Tags:** `Irons`, `Bunkers`, `Driving`, `Chipping/Pitching`

**Product descriptions:**
- Golf's #1 female coach reveals one-legged golfer's secret to "turn off your arms" and simplify the swing into an effortless true-swinging motion.
- Golf Digest Top-10 Coach Martin Chuck permanently fixes fat shots and thin shots in minutes using a 10-ball "perfect contact drill."
- See how golfers over 50 SWING SMARTER - not harder... to gain 30-50 yards without adding rotation, length, or even swing speed.
- Fix your contact AND accuracy in 2 minutes a week with the first "All-In-One" swing trainer that gives you instant auditory feedback on your release
- Golf Digest Top 10 coach Martin Chuck uncovers Ben Hogan's ball-striking secret & a proprietary training system that ensures you strike it square.
- Hall of fame coach who's fixed over 200,000 slices, engineers the world's first Slice Fix Driver with 7 features that square the face for you.
- Hall of Fame instructor Rick Smith reveals a simple "Y-to-Y" technique that dials in the 20% of your swing that produces 80% of flush contact.

---

## Page 3: Video Player

**Frame:** `3935:24199` — 1440 x ~1963px

### Layout

- Top nav + Left sidebar (320px) + Main content (1076px) + Footer
- Main content: Large video player (left) + Course outline sidebar (342px, right) + Below-fold sections

### All Copy

#### Header

- Breadcrumb: `/ My Courses / Simple Strike Sequence`
- H1: `Simple Strike Sequence`

#### Video Player Area

- Now playing: `Drill #2 - Pin High Approach Shots (00:35)`
- `Save time and get results faster!`
- `PG1 Pulse Recommended Training`
- `Autoplay Next Video`

#### Course Outline Sidebar

- `Simple Strike Sequence 21 Videos` — `0% Complete`

**Start Here** (5 Items):
- `Introduction 00:35`
- `Video #1 03:23`
- `Video #2 07:21`
- `Video #3 10:02`
- `Video #4 12:55`

**Module 1: Training Video Section** (12 Items):
- `Customized Feature Course pt 1` (3 Featured Items)
- `Start Here for Best Results` (3 Featured Items)
- `Your Stock Setup (02:39)`
- `The Shadow Drill (01:53)`
- `Drill: Best Contact Drill (07:30)`
- `Next Steps`
- `Endcard Wrap Up`
- `"No-Turn" Backswing`
- `Low Point Control Drill Continued`
- `Simple Strike Sequence Recap`
- `Shot Shaping Secrets`
- `Perfect Strike Wrist Conditions`

**Module 2: Training Video Section** (6 Items) — `0% Complete`

**Module 3: Training Video Section** (6 Items) — `0% Complete`

- `Customize Your PG1 Practice Program`
- `Course Survey` (5 Items)
- `Drill Scores` — `'0' scores submitted`

#### Hidden States

Full coach chat (same as Dashboard), challenges, scorecard, round tracking with all 9 holes with par/index/scores/GIR/putts/distance data.

**Additional drills (hidden):**
- `Training Drill: Ace In The Hole Drill`
- `Training Drill: Proximity Drill 50-100 yards`
- `Drills - Wedge Game` (5 videos) — `Let's Get Started!`
- `Drills - Putting Game` (1 video)
- `Training Drill: 10 Ball 30`
- `Training Drill: Games of 3`
- `Golf School with Martin Chuck` — `RSVP: VIP Golf Experience`
- `Error Correction (Fixing Your Exact Ball Flight) (09:59)`
- `<NAME>, Start Your Free Trial to Unlock All Courses`

#### Recommended Section

- `Your PG1 Pulse Recommended Training Program`
- `Recommended Courses`: `True Swing Sequence`, `Simple Strike Sequence`

---

## Page 4: My Favorites

**Frame:** `5422:55870` — 1440 x 1468px

### Layout

- Top nav + Left sidebar (320px) + Main content (1076px) + Footer
- Content: Header → Filter bar → Two-column layout (filter panel 331px | video grid 713px, 4 columns)

### All Copy

#### Header

- Breadcrumb: `/ My Favorites`
- H1: `My Favorites`

#### Filter Bar

- `Filter (92)` button + category pill chips

#### Filter Panel (left column)

**Course Type (6):**
- `Irons (53)`
- `Driving (39)` (checked)
- `Bunkers (4)`
- `Putting (5)`
- `Chipping (14)`
- `Mental Game (4)`

**Instructor (8):**
- `Erika Larkin (1)`
- `Martin Chuck (2)`
- `James Sieckmann (1)`
- `Hank Haney (2)`
- `Rocco Mediate (1)`
- `Rick Smith (1)`
- `David Leadbetter (1)`
- `Eric Cogorno (1)`

**Purchase Options (96):**
- `Purchased (64)`
- `Not Purchased (32)`

#### Video Grid

12 cards (3 rows x 4 cols), each with thumbnail + progress bar + title + category + "Play Video" button

#### Hidden Alternate States

**Tabs:** `PRACTICE`, `Record & Track`, `REWARDS`

**Alt headers:**
- `Training Programs (15 Purchased)`
- `What part of your game do you want to work on the most?`
- `Popular on Performance Golf`

**Drill checkboxes:**
- `Chips & Bunkers: 3 and 4 Game`
- `Chips & Bunkers: 4 Clubs Game`
- `Putting: 6 Foot PGA Tour Wheel Drill`
- `Putting: Total Feet of Putts Drill`
- `Putting: 42 Foot PGA Tour 2-Putt Drill`
- `Metal Game: Mental Score`
- `Wedge Game: Proximity Drill 50-100 Yards`
- `Wedge Game: Cone Games`
- `Driver: Fairway Finder Drill`

**Category cards:** `Chipping & Bunkers`, `Putting`, `Mental Game`, `Wedge Game`, `Ball Striking`, `Driving`

---

## Page 5: Settings — Golfer Profile

**Frame:** `2170:10773` — full code returned

### Layout

- Sidebar (280px) + Body (#f6f6f6 background) + Collapse chevron at sidebar edge
- Body: Page heading → Tabs → Form card

### All Copy

#### Sidebar Nav

- `PG1 Pulse (SMART PATH)`
- `My Courses`
- `My Favorites`
- `My Coach`
- `Scratch Club`
- (divider)
- `Settings`
- `Support`

#### Page Heading

`Settings`

#### Tabs

`General` | `Golfer Profile` (active, orange) | `Orders/Subscriptions` | `Support`

#### Form — "Your Golfer Profile"

- `Update your golfer details`
- `Offical Handicap (USGA)` → `+7.7`
- `Average to Par` → `+8.2`
- `Experience Level` → `Intermediate`
- `Home Course` → `Springfield Country Club`
- `Hand` → `Right-Handed`
- `Golf Goals` → `Break 80, Fix Slice, Reduce Putts`
- Buttons: `Save Changes` (orange #FD3300) | `Cancel` (gray #F6F6F6)

---

## Page 6: Community

**Frame:** `1503:8030` — 1440 x 2405px

### Layout

- Different sidebar than other pages: full nav with Dashboard, Courses, Video Player, My Game, Coaching, AI Swing Analysis, Community, Calendar, Notifications, Settings, Support
- 40% profile completion ring + "Setup Profile" CTA
- Light/Dark toggle + "Go Premium" button
- Three-column layout: Sidebar (280px) | Main feed | Right sidebar (335px)

### All Copy

#### Sidebar

- `Dashboard`
- `Courses`
- `Video Player`
- `My Game`
- `Coaching`
- `AI Swing Analysis`
- `Community`
- `Calendar`
- `Notifications`
- `Settings`
- `Support`
- `40%` — `Complete your profile` — `Complete your profile to dial in your training` — `Setup Profile`
- `Help Center` — `Answers here`
- Light / Dark toggle
- `Go Premium` button
- `Welcome back` — `Scottie`

#### Main Feed

**Header:**
- `Community` (page heading)
- `Performance Golf Community Highlights` — `The latest and greatest from the PG community`

**Story cards (horizontal scroll):**
- `Your Pin`
- `Ace on 18` (10229 Likes)
- `Bunker Shot` (10229 Likes)
- `Putt for PB` (10229 Likes)
- `Butt` (1022...)

**Post composer:**
- `How'd You Shoot, Scottie?` — `Post your latest swing or round highlight here`
- Placeholder: `How'd You Shoot?`
- Media attachment icons + `Save Draft` | `Post` buttons

**Feed posts:**

**Post 1:**
- `TigerWoodsfan21`
- `Insane Bunker Shot on the 17th - Par 3!`
- `Brookfield Golf & Country Club`
- `11:34 AM`

**Post 2:**
- Scorecard visual (holes 1-18 with scores)
- `@Vinx21`
- `+2 Stroke Play 18 Hole Round`
- `Victoria Valleys Golf & Country Club`
- `8:00 AM - 12:00 AM EST`

**Post 3:**
- `@kayPhoenixGo`
- `1hr Practice Session at the Driving Range`
- `Springfield Golf & Country Club`
- `8:00 AM - 11:00 AM EST`

**Post 4:**
- `Alex Summers`
- `Completed Martin Chucks Simple Strike Sequence`
- `Sarasota, Florida, USA`

**Post 5:**
- `Joe Smith`
- `1on1 Coaching Session with PGA Pro Evan Knight`
- `Toronto, Ontario, Canada`
- `8:55 PM`

#### Right Sidebar

**Stories row:** `Your story`, `Mathilde`, `Shanice`, `Amanda`, `An...`

**Referral card:**
- `Earn a month of PG1 Premium!`
- `Invite three friends via your unique referral link and enjoy free one month of premium.`
- `0 of 3 Friends`

**Badges/Leaderboard/Stats tabs:**
- `Badges` | `LeaderBoard` | `Stats`
- `21 Badges Unlocked`
- Badge names: `Break 80 First Time`, `Play 10 Rounds`, `Score A Round`

**Add/Invite Friends:**
- `Add/Invite Friends`
- `Share Link` button
- Search field

**You Might Know Them:**
- `Select from your area`
- Names: `Emma`, `Isabella`, `James`, `Jon`, `Luke`

**Your Next Badge:**
- `View All`
- `10 Day Streak` — Open the PG app for 10 days
- `Add 3 Friends` — Invite 3 Friends to PG

**Today / Calendar:**
- `Today` — `Happening near you`
- Calendar grid (S M T W T F S)
- `18 HOLE ROUND` — `JohnnyGolfer Has Foursome` — `2:30 PM - 3:00 PM` — `Springfield Golf & Country Club`
- `SIMULATOR TRAINING` — `Alex Summers Has 1hr at Golf Next` — `2:00 PM - 3:00 PM` — `Next Golf Simulators`

---

## Page 7: Dashboard Minimal (Freemium)

**Frame:** `2665:10179`

### Layout

- Sidebar (280px) with same nav structure + 40% profile card + Help Center + "Get started" upgrade CTA + user footer
- Main content with announcement banner + PG1 Pulse section + featured course + promotional cards + app download

### All Copy

#### Sidebar

- `40%` profile completion — `Complete your profile` — `Complete your profile to dial in your training`
- `Help Center` — `Answers here`
- `Get started` (upgrade CTA with crown icon)
- `Welcome back` — `Scottie`

#### Main Content

- `New feature!` — `Add product sections to your Gumroad profile` (placeholder)
- `#1 Bestselling Item`

**PG1 Pulse section:**
- Progress tracker with 5 circular avatar icons: Train, Practice, Play, Achieve, Accelerate
- `Your PG1 Pulse Recommendation is waiting!`
- `Complete onboarding to get your personalized path to faster improvement.`
- `Complete Your Golf Game Assessment` | `Dismiss`

**Your Program:**
- `Ball Backwards Blueprint`
- `Instructor: Cameron McCormick`
- `World's first ball striking training based on Trackman's raw data points, allowing you...`
- `Get Started` | `All Courses`

**Connect with Coach:**
- `Connect with Your PG Certified™ Coach`
- `Upload Swing`
- `Chat with Your Coach`

**App download:**
- `Download the PG App for 1on1 Coaching, Swing Analysis, Round Tracking`
- `Your Personalized Practice Plan is waiting for you in the app!`
- `Download Now` + App Store / Google Play badges

**PG1 Pulse Improvement:**
- `Your PG1 Pulse Improvement Program`
- `Follow your curated video and training series to get the fastest results.`
- `Up Next: Fat Contact Fix`

---

## Page 8: Pulse Survey Modal

**Frame:** `4542:65390` — 680 x 890px modal on dark overlay

### Layout

- Centered modal (680px) on dark overlay
- Close X → Question headline → 2x4 grid of option cards (each 292 x 100px with image + label + radio) → Helper text → Continue/Cancel buttons
- 40px internal padding

### All Copy

**Headline:**
- `What is the Primary Part of your Game you are Most Interested in Improving?`

**Option cards (2 columns x 4 rows):**

| Left Column | Right Column |
|---|---|
| Driver | Chipping, Pitching |
| Fairway Woods | Bunker Play |
| Irons | Putting |
| Wedges | Gain Distance |

Each card has a golf imagery thumbnail + radio button selector.

**Helper text:**
- `Please select one answer. Your choice will help prioritize improvement in that area first. Answers can be changed/updated anytime.`

**Buttons:**
- `Continue` (orange #FD3300)
- `Cancel` (outline/white)

---

## Page 9: Upsell Modal — Existing Users

**Frame:** `5053:5486` — 600 x 922px modal

### Layout

- Header bar → Headline/subheadline → Hero image with PG logo + 6 instructor thumbnail photos → 2-column benefits list with orange checkmarks → Pricing selectors (Yearly/Monthly/Lifetime radios) → CTA button → Legal text
- 40px internal padding

### All Copy

**Header bar:**
- `Limited Time Offer!` + close X

**Headline:**
- `UPGRADE your order to PG1 Premium and unlock full access to elite training, coaching tools, and performance tracking — over 90% less than buying separately.`

**Hero image:**
- `PERFORMANCE GOLF` logo (white on dark gradient) + row of 6 instructor photos

**Benefits (2 columns with orange checkmarks):**

| Left | Right |
|---|---|
| Unlimited Step-by-Step Training Videos | Instant Swing Analysis with Swing Scan |
| 1-on-1 Pro Coaching on Demand | Tiger Woods' Former Coach Hank Haney |
| Golf Digest Top-7 Instructor Martin Chuck | PG1™ Personalized Practice Plans |

**Pricing:**

| Plan | Price | Details |
|---|---|---|
| Yearly (selected) | ~~$468.00~~ $199.00 | `7-Day Free Trial` badge, `$24.92/month` |
| Monthly | $39.00/month | |
| Lifetime | $499.00 | |

**CTA:**
- `Start 7-Day Free Trial` (orange button)

**Legal:**
- `Terms of Use and Privacy Policy`
- `Totally free for 7 days, cancel anytime.`

---

## Page 10: Upsell Modal — New Users

**Frame:** `5053:10666` — 600 x 959px modal

### Layout

- Header bar → Hero image (golf course landscape) → Headline → Annual/Monthly toggle tabs → Single-column benefits list → Gradient CTA button with price → Legal text
- 40px internal padding

### All Copy

**Header bar:**
- Close X icon

**Hero image:**
- Golf course landscape photo

**Headline:**
- `GO ALL-IN WITH PG1 PREMIUM.`
- `Upgrade to PG1 Premium and get everything Performance Golf offers — training programs, Swing AI, Scratch Club, and VIP tools — for one unbeatable price.`

**Price toggle:**
- `Annually` with `SAVE 36%` badge (active/selected, orange)
- `Monthly`

**Benefits list:**

`PG1 Premium Includes:`
- Unlimited Step-by-Step Training Videos
- Instant Swing Analysis with Swing Scan
- 1-on-1 Pro Coaching on Demand
- Tiger Woods' Former Coach Hank Haney
- Golf Digest Top-7 Instructor Martin Chuck
- PG1™ Personalized Practice Plans

**CTA:**
- `$299.00 $199.00 / year SAVE 36%` (orange gradient button with strikethrough on $299)

**Legal:**
- `Terms of Use and Privacy Policy`
- `Totally free for 7 days, cancel anytime.`

---

## Page 11: VIP Coaching — My Coach

**Frame:** `5422:46553` — 1440 x 1469px

### Layout

- Top nav (109px) + Left sidebar (320px) + Main content (1076px) + Footer (51px)
- Content: Breadcrumb → Page heading → Tab bar → Onboarding progress stepper → Video instruction area + Upload CTA

### All Copy

#### Header

- Breadcrumb: `/ My Coach`
- H1: `MY Coach`

#### Tab Bar

- `Getting Started` (active)
- `Record & Track` (hidden)
- Hidden alternate tabs: `PRACTICE`, `Record & Track`, `REWARDS`

#### Help Link

- `Need Help Recording Your Swing?`

#### Onboarding Progress Stepper

Frame: `VIP Coaching / Onboarding / Progress Bar`

| Step | Label | State |
|---|---|---|
| 1 | `UPLOAD SWING` | Active (check icon) |
| 2 | `SUBMIT SWING` | Inactive |
| 3 | `About You` | Inactive |

#### Video Instruction Area

- Body copy: `Watch the video for important instructions about how to upload a video of your swing for your coach to review`
- CTA button: `Upload Swing Video`
- Video player: `Members Area / vimeo-player` component

#### Hidden / Alternate States

**Alternate page header:**
- Breadcrumb: `Home / Training / Popular on Performance Golf`
- H1: `Popular on Performance Golf`

**Hidden labels:**
- `Training Programs (15 Purchased)`
- `Filter`
- `What part of your game do you want to work on the most?`

**Hidden category tiles:**
- `Chipping & Bunkers`, `Putting`, `Mental Game`, `Wedge Game`, `Ball Striking`, `Driving`

**Hidden product/course cards (repeated across multiple row sets):**

| Title | Description |
|---|---|
| `How to Hit the Low Spinner (High, Medium, and Low Chips) - Chips & Bunkers` | Golf's #1 female coach reveals one-legged golfer's secret to "turn off your arms" and simplify the swing into an effortless true-swinging motion. |
| `Simple Strike Sequence` | Golf Digest Top-10 Coach Martin Chuck permanently fixes fat shots and thin shots in minutes using a 10-ball "perfect contact drill." |
| `Smart Distance System` | See how golfers over 50 SWING SMARTER - not harder... to gain 30-50 yards without adding rotation, length, or even swing speed. |
| `The Straight Stick` | Fix your contact AND accuracy in 2 minutes a week with the first "All-In-One" swing trainer that gives you instant auditory feedback on your release |
| `Square Strike System` | Golf Digest Top 10 coach Martin Chuck uncovers Ben Hogan's ball-striking secret & a proprietary training system that ensures you strike it square. |
| `Square-To-Path Sequence Pure Impact Program (Hank Haney & Rick Smith)` | Hall of fame coach who's fixed over 200,000 slices, engineers the world's first Slice Fix Driver with 7 features that square the face for you. |
| `Pure Impact Program` | Hall of Fame instructor Rick Smith reveals a simple "Y-to-Y" technique that dials in the 20% of your swing that produces 80% of flush contact. |
| `True Swing Sequence` | Golf's #1 female coach reveals one-legged golfer's secret... |

**Hidden drill cards:**
- `Chip & Bunkers: 3 and 4 Game`
- `Chips & Bunkers: 4 Clubs Game - Bunker`
- `Putting: 6 Foot PGA Tour Wheel Drill`
- `Putting: Total Feet of Putts Drill`
- `Driving: Fairway Finder Drill`
- `Ball Striking: Iron Adversity Training Drill`
- `Wedge Game: Proximity Drill 50-100 Yards`

**Hidden sidebar promo cards:**
- `PG Desktop Exclusive Deal`
- `PG Desktop Dashboard Scratch Club Card`
- `PG Desktop Dashboard VIP Card`
- `PG Desktop Dashboard SwingFix AI Card`

---

## Page 12: VIP Coaching — Swing Upload

**Frame:** `3973:80112` — 1440px

### Layout

- Top nav with promo banner + Left sidebar (320px) + Main content + Footer
- Content: Breadcrumb → Page heading → "Getting Started" section → 3-step progress indicator → Video player → Instruction text + Upload CTA

### All Copy

#### Promo Banner

- `Get 10% discount on PG1 Premium until Jan 25, 2026`

#### Top Nav

- `DASHBOARD` | `TRAINING AIDS` | `CLUBS` (dropdown) | `COACHING` | `TRANSFORMATION`

#### Sidebar Nav

- `PG1 PULSE (SMART PATH)` (highlighted)
- `MY COURSES`
- `MY COACH`
- `MY FAVORITES`
- `SCRATCH CLUB`
- CTA: `View PG1 Pulse Intro Video`
- `Welcome back 👋` — `Scottie`

#### Page Header

- Breadcrumb: `/ My Coach`
- H1: `MY COACH`

#### Getting Started Section

- Section heading: `GETTING STARTED`

**3-step progress indicator:**

| Step | Label | State |
|---|---|---|
| 1 | `UPLOAD SWING` | Active (orange, current) |
| 2 | `SUBMIT SWING` | Inactive (grey) |
| 3 | `ABOUT YOU` | Inactive (grey) |

#### Video Instruction Area

- Body copy: `Watch the video for important instructions about how to upload a video of your swing for your coach to review`
- CTA button: `Upload Swing Video` (orange, with upload icon)
- Video: Full-width player showing golfer swing (down-the-line angle)
- Side icons: heart/favorite, clock/watch later, share

#### Footer

- `©2025 Performance Golf. All Rights Reserved. Terms | Privacy Policy`
- `Scratch Club Benefits | VIP Coaching Benefits | SwingFix AI Benefits | Contact Us`

---

## Page 13: Scratch Club — Practice

**Frame:** `3973:52002` — 1440px

### Layout

- Top nav + Left sidebar (320px) + Main content + Footer
- Content: Breadcrumb → H1 → Tab bar (PRACTICE active, Record & Track) → Filter prompt → Category-based video carousels

### All Copy

#### Header

- Breadcrumb: `/ Scratch Club - Practice`
- H1: `SCRATCH CLUB`

#### Tab Bar

- `PRACTICE` (active)
- `RECORD & TRACK`
- `REWARDS` (hidden)

#### Filter Section

- `What part of your game do you want to work on the most?`
- `Filter (92)` button

#### Content Sections (carousels with Explore All links)

**ACCELERATORS** — `Explore All >`
- 3 video cards (placeholder titles: `Video Full Title` / `Golf Digest Top-10 Coach Martin Chuck permanently..`)

**DRILLS** — `Explore All >`
- 5 video cards (placeholder titles)

**POPULAR ON PERFORMANCE GOLF** — `Explore All >`
- 5 video cards with lock icons (indicating premium/unpurchased content)

#### Category Filter Tiles (hidden state)

- `Chipping & Bunkers`, `Putting`, `Mental Game`, `Wedge Game`, `Ball Striking`, `Driving`

#### Hidden Drill Listings

- `Chip & Bunkers: 3 and 4 Game`
- `Chips & Bunkers: 4 Clubs Game - Bunker`
- `Putting: 6 Foot PGA Tour Wheel Drill`
- `Putting: Total Feet of Putts Drill`
- `Driving: Fairway Finder Drill`
- `Ball Striking: Iron Adversity Training Drill`
- `Wedge Game: Proximity Drill 50-100 Yards`

#### Footer

- `©2025 Performance Golf. All Rights Reserved. Terms | Privacy Policy`
- `Scratch Club Benefits | VIP Coaching Benefits | SwingFix AI Benefits | Contact Us`

---

## Page 14: Scratch Club — Record & Track

**Frame:** `3973:59438` — 1440px (tall, scrolling page)

### Layout

- Top nav + Left sidebar (320px) + Main content + Footer
- Content: Breadcrumb → H1 → Tab bar (Record & Track active) → Headline → Scorecard overview → Performance charts → Training challenges

### All Copy

#### Header

- Breadcrumb: `/ Scratch Club - Track & Record`
- H1: `SCRATCH CLUB`

#### Tab Bar

- `PRACTICE`
- `RECORD & TRACK` (active)

#### Headline & Overview

- `How to train, practice and play like a scratch golfer`
- `SCRATCH CLUB AVERAGE SCORE` — `72`
- `Submit Scorecard` (orange CTA button)

#### Training Challenges — Scorecard Table

- `TRAINING CHALLENGES`
- Date Range: `Last 3 Months` (dropdown with calendar icon)

**Scorecard columns:**
- `Date` | `Course` | `Score` | `Chipping & Bunkers` (Up & Down %) | `Putting` (Putts) | `Mental Game` (Mental Score) | `Wedge Game` (Scores from 50-100) | `Driving` (Fairways Hit %) | `Ball Striking` (Green %)

**Sample data rows:**

| Date | Course | Score | C&B | Putting | Mental | Wedge | Driving | Ball Striking |
|---|---|---|---|---|---|---|---|---|
| Average | | 72 (orange) | 30 | 30 | 30 | 30 | 30 | 30 |
| 08/27/2022 | Springfield Country Club | 45 | 30 | 30 | 30 | 30 | 30 | 30 |
| 08/27/2022 | Velvet Vistas Golf Course | 66 | 30 | 30 | 30 | 30 | 30 | 30 |
| 08/27/2022 | Velvet Vistas Golf Course | 70 | 30 | 30 | 30 | 30 | 30 | 30 |
| 08/27/2022 | Velvet Vistas Golf Course | 72 | 30 | 30 | 30 | 30 | 30 | 30 |

#### Performance Charts (6 skill area charts)

Each chart shows trend lines with score data:

- `Chipping & Bunkers` (Up & Down %) — `Improve Chipping & Bunkers ↗`
- `Mental Game` (Mental Score) — `Improve Mental Game ↗`
- `Putting` (Putts) — `Improve Putting ↗`
- `Wedge Game` (Scores from 50-100) — `Improve Wedge Game ↗`
- `Driving` (Fairways Hit %) — `Improve Drive ↗`
- `Ball Striking` (Green %) — `Improve Ball Striking ↗`

Chart Y-axis values: 100, 75, 50, 25, 10 (or similar scale per chart)

#### Average Score Chart

- `Average Score` (line chart)
- Y-axis: 40, 50, 60, 70, 80, 90, 100
- Shows trend line across rounds

#### Training Challenges (Bottom Section)

**Challenge cards:**

- `#ChallengeName` — `WATCH VIDEO` | `RECORD RESULT` buttons
  - `Date` | `Number of Shots`
  - `Total Avg` | `7.28`
  - Sample entries: `06/30/2022` | `8` (with Edit/Delete icons)

(Pattern repeats for multiple challenge entries)

#### Footer

- `©2025 Performance Golf. All Rights Reserved. Terms | Privacy Policy`
- `Scratch Club Benefits | VIP Coaching Benefits | SwingFix AI Benefits | Contact Us`

---

## Page 15: Video Player Expanded

**Frame:** `5148:9272` — 1440 x 2109px

### Layout

- Top nav + Left sidebar (collapsed to icons) + Main content + Footer
- Content: Breadcrumb → H1 → Large video player (with right sidebar course outline) → PG1 Pulse Assessment → Recommended Courses carousel

### All Copy

#### Header

- Breadcrumb: `/ My Courses / Simple Strike Sequence`
- H1: `SIMPLE STRIKE SEQUENCE`

#### Video Player

- Currently playing: `"No-Turn" Backswing (4:32)`
- Course link: `Simple Strike Sequence`
- Stats: `21277 views • 22 Sep 2025`
- Tags: `#martinchuck #performancegolf #simplestrikes...`
- Actions: `4.4K` (likes) | `94K` (dislikes) | `Share` | `Download` | `Save`

#### Below Player Bar

- `Save time and get results faster!`
- `Set Swing Focus and Flaw`
- `Autoplay Next Video` (toggle ON)

#### Course Outline Sidebar (right)

- `SIMPLE STRIKE SEQUENCE 21 Videos` — `0% Complete`
- `Autoplay Next Video` (toggle ON)

**Start Here** (5 Items):
- `Introduction 00:35`
- `Video #1 03:23`
- `Video #2 07:21`
- `Video #3 10:02`
- `Video #4 12:55`

**CTA block between sections:**
- `Customize Your PG1 Practice Program`
- `Take Survey` (orange button)

**Module 1: Training Video Section** — `12 Items` (collapsed)
**Module 2: Training Video Section** — `6 Items` (collapsed)

#### PG1 Pulse Assessment Section

- Section heading: `PG1 Pulse Assessment.`
- Subheading: `Personalized to your game, giving you the right videos, in the right order, at the right time for fastest results.`

**Journey stages (5 icons):**
1. `LEARN` (active, orange)
2. `CONNECT`
3. `PRACTICE`
4. `PLAY`
5. `ACCELERATE`

- `Watch your recommended videos to transform your game today!`

**Focus/tendency tabs:**
- `UPDATE SWING FOCUS` | `+ FOCUS` | `DRIVER` | `TENDENCY` | `SLICE` | `ACCELERATOR` | `WEDGES`

**Recommended videos:**
- `PG1 Pulse Program Recommended Video #1`
- `PG1 Pulse Program Recommended Video #2`
- `PG1 Pulse Program Recommended Video #3`

- CTA: `Get Started` (orange button)

#### Recommended Courses Carousel

- Section heading: `Recommended Courses.`

**Card 1:**
- `True Swing Sequence`
- `Learn how to master your approach shots with this effective technique...`
- `UNLOCK COURSE →`

**Card 2:**
- `Simple Strike Sequence`
- `Golf Digest Top 10 Coach Martin Chuck permanently fixes fat and thin shots...`
- `UNLOCK COURSE →`

#### Footer

- `©2025 Performance Golf. All Rights Reserved. Terms | Privacy Policy`
- `Scratch Club Benefits | VIP Coaching Benefits | SwingFix AI Benefits | Contact Us`

---

## Page 16: All Courses

**Frame:** `4209:31617` — 1440px

### Layout

- Top nav + Left sidebar (320px, expanded) + Main content + Footer
- Content: Breadcrumb → H1 → Filter pill bar → Two-column layout (filter panel left | video card grid right)

### All Copy

#### Header

- Breadcrumb: `/ All Courses`
- H1: `ALL COURSES`

#### Filter Bar (pill chips)

- `FILTER (92)` | `IRONS` | `DRIVING` | `BUNKERS` | `PUTTING` | `CHIPPING` | `MENTAL GAME`

#### Filter Panel (left column)

- `Filter` | `Clear All`

**COURSE TYPE (6):**
- `Irons (53)`
- `Driving (39)` (checked)
- `Bunkers (4)`
- `Putting (5)`
- `Chipping (14)`
- `Mental Game (4)`

**INSTRUCTOR (8):**
- `Erika Larkin (1)`
- `Martin Chuck (2)`
- `James Sieckmann (1)`
- `Hank Haney (2)`
- `Rocco Mediate (1)`
- `Rick Smith (1)`
- `David Leadbetter (1)`
- `Eric Cogorno (1)`

#### Video Grid

- 12 cards (4 cols x 3 rows)
- Each card: thumbnail + orange progress bar + `Video Full Title` + `Golf Digest Top-10 Coach` + `Martin Chuck permanently..`

#### Sidebar Nav (expanded, with labels)

- `PG1 PULSE (SMART PATH)` (highlighted)
- `MY COURSES`
- `MY COACH`
- `MY FAVORITES`
- `SCRATCH CLUB`
- CTA: `View PG1 Pulse Intro Video`
- `Welcome back 👋` — `Scottie`

#### Footer

- `©2025 Performance Golf. All Rights Reserved. Terms | Privacy Policy`
- `Scratch Club Benefits | VIP Coaching Benefits | SwingFix AI Benefits | Contact Us`

---

## Page 17: Pulse Program Modal

**Frame:** `3761:2426` — 1440 x 1450px (modal on full page)

### Layout

- Full page behind with sidebar + modal overlay containing the PG1 Pulse Smart Path content
- This is the first-visit modal that appears over the dashboard

### All Copy

#### Page Context (behind modal)

- Breadcrumb: `My Game / PG1 Pulse(Smart Path)`
- H1: `pg1 Pulse Smart Path`

#### Journey Progress Module

- `Your Journey Progress`

**Journey steps (5-step progression):**
1. `Slice` (identified swing flaw)
2. `Learn the key concepts.`
3. `Practice the first swing adjustment.`
4. `Reinforce with the second drill.`
5. `Track on-course performance.`

#### Training Program Recommendation

- `Your PG1 Pulse Recommended Training Program`
- `View Program Content` (CTA)
- Module: `Getting Your Grip Right`
- `Video 1: Video Title` (placeholder)
- `Video 2: Video Title` (placeholder)
- `Upload Swing Video`
- Badge: `25% Off` / `-PULSE`

#### Video CTAs

- `Watch Video #1: Short Game Boot Camp: Fat Contact Fix`
- `Watch Video #1: Meet Your PG1 Certified Coaches`

**Recommended videos:**
- `Video #1: Simple Strike Sequence`
- `Video #2: Simple Strike Sequence`
- `Video #3: Simple Strike Sequence`

**Video player:**
- `Pg1 Pulse Program Recommended Video (1:32)`
- `Autoplay Next Video`
- `Watch Video #1: Simple Strike Sequence`

#### Meet the Coach

- `Meet the PG1 Pulse Coach`
- `PG Coach Introduction Video (2:21)`
- `Autoplay Next Video`
- `Chat With Your Coach - Evan Knight/Brian Mogg`
- `PG1 Certified Coach` — `Online now`

#### Coach Chat (same thread as Dashboard)

**User:** `Hey Coach! I'm new to PG1 and just getting back into golf after a few years off. I'm struggling with consistency off the tee. Can you give me some tips or feedback?`

**Coach:** `Hey Scott, welcome to PG! Definitely — send over a video of your driver swing from both the down-the-line and face-on angles if possible. Once I review them, I'll give you a breakdown and a drill or two to work on. Looking forward to seeing your swing!`

**User:** `Awesome, thanks! Just uploaded my latest clips from the range this morning.`

**Coach:** `Got them — nice work on the setup and keeping a steady rhythm. A couple things I noticed:`

**Swing analysis:** `Swing Flaw #1` — `Spine Axial Rotation in Backswing` — `Your shoulders need to turn more during the backswing.`

**Nikki thread:**
- **Coach:** `Hey, Nikki, I just wanted to welcome you to VIP Coaching. We plan on reviewing your golf swing in the next 48 hours. I'll send you a custom video back with a plan to help you improve.`
- **User:** `Thanks PG, I'm glad to be here!`

**Chat input:**
- `Upload Swing Video`
- `*Please keep recordings under 1 minute for fastest upload time.`
- `Type your message here...`

#### Alternate Chat Messages (variant states)

- `How is your Swing Focus? Driver`
- `What is your Swing Tendency? Slice`
- `Hey Coach! I'm new to the app and just getting back into golf after a few years off. I'm struggling with consistency off the tee. Can I send you a swing for feedback?`
- `Hey David, welcome to PG!...`
- `Start typing...` (alternate input placeholder)

#### Challenges

- `Ball-Striking Challenge`
- `Full Wedge Contact Correction Drill: Fat & Thin Shots`
- `Record Challenge Results`
- `50-100 Yard Proximity Drill`
- `Select a target between 50 and 100 yards away. Hit 5 wedge shots to the target. Aim to land each shot within 17 feet (PGA Tour average from inside 100 yards). After hitting all shots, pace off the distance from each ball to the hole.`
- `Add up the distances from the hole for all 5 shots and divide by 5 to get the average.`
- `What was your average distance from the hole over the 5 shots?`

#### Hidden Offer/Legal

- `No thanks, I'm only interested in The True Swing Sequence course at this time.`
- `Terms of Use and Privacy Policy`
- `Totally free for 7 days, cancel anytime.`
- `EXCLUSIVE OFFER!`
- `When you subscribe to email & texts. You'll also be the first to hear about all our holiday sales!`

---

## Page 18: Pulse Program Expanded

**Frame:** `3197:35554` — 1440 x 7115px

### Layout

- Full-height expanded dashboard view showing the complete PG1 Pulse Smart Path experience
- Left sidebar (320px) + Main content with all sections visible (not collapsed)

### All Copy

This is the full expanded version of the Dashboard Smart Path. It contains all the same sections as Pages 1 and 17, expanded to show every module:

#### Journey Progress

- `Your Journey Progress`
- Steps: `Slice` → `Learn the key concepts.` → `Practice the first swing adjustment.` → `Reinforce with the second drill.` → `Track on-course performance.`

#### Training Program

- `Your PG1 Pulse Recommended Training Program`
- `View Program Content`
- `Getting Your Grip Right`
- `Video 1: Video Title` / `Video 2: Video Title`
- `Upload Swing Video`
- `25% Off` / `-PULSE`

#### Video CTAs

- `Watch Video #1: Short Game Boot Camp: Fat Contact Fix`
- `Watch Video #1: Meet Your PG1 Certified Coaches`

#### Coach Section

Full coach chat + swing analysis (same as Dashboard Page 1)

#### Challenge Module

- `50-100 Yard Proximity Drill`
- Full game rules (3 accordion entries — same as Page 17)

#### Round Tracker

Full scorecard entry (same as Dashboard Page 1):
- `Victoria Park East Golf Club` — `Sarasota, FL`
- `Blue - 7021 yrds` — `Slope 121 | Rating 72.2`
- All 9 holes with scores, clubs, GIR, penalties, putts, distances

#### Post-Round

- `Post-Round PG1 Pulse Check`
- `Update Your Focus To Get Your Next Big Win`

#### Offer Block

- `EXCLUSIVE OFFER!`
- `When you subscribe to email & texts. You'll also be the first to hear about all our holiday sales!`

---

## Page 19: User Preferences — Manage Profile

**Frame:** `4209:75900` — 1440px

### Layout

- Top nav with promo banner + Left sidebar (icon-only, collapsed) + Main content + Footer
- Content: Breadcrumb → H1 → Settings sub-nav (Manage Profile active, Subscriptions) → Profile form + Change Password

### All Copy

#### Promo Banner

- `Get 10% discount on PG1 Premium until Jan 25, 2026`

#### Top Nav

- `DASHBOARD` | `TRAINING AIDS` | `CLUBS` (dropdown) | `COACHING` | `TRANSFORMATION`

#### Page Header

- Breadcrumb: `/ User Preferences`
- H1: `USER PREFERENCES`

#### Settings Sub-Nav

- `Manage Profile` (active) — with user icon
- `Subscriptions` — with checkbox icon

#### Profile Section

- Avatar: `JS` (initials circle)
- `John Smith`
- `Update Profile Picture` (orange link)

#### Email

- `Email Address:`
- `johnsmith@performancegolfzone.com` (locked icon)

#### Profile Form Fields

| Field Label | Value |
|---|---|
| `FIRST NAME` | `John` |
| `LAST NAME` | `Smith` |
| `HEIGHT` | `6' 2"` |
| `DATE OF BIRTH` | `1988-03-14` |
| `HAND` | `Right` (dropdown) |

- `Save` button

#### Change Password Section

- `Change Password`
- `NEW PASSWORD` (field)
- `CONFIRM NEW PASSWORD` (field)
- `Update Password` button

#### Footer

- `©2025 Performance Golf. All Rights Reserved. Terms | Privacy Policy`
- `Scratch Club Benefits | VIP Coaching Benefits | SwingFix AI Benefits | Contact Us`

---

## Page 20: User Preferences — Subscriptions

**Frame:** `4209:83172` — 1440px

### Layout

- Top nav with promo banner + Left sidebar (icon-only) + Main content + Footer
- Content: Breadcrumb → H1 → Settings sub-nav (Subscriptions active) → Active Subscriptions list → Inactive Subscriptions → Help/Contact card

### All Copy

#### Promo Banner

- `Get 10% discount on PG1 Premium until Jan 25, 2026`

#### Page Header

- Breadcrumb: `/ User Preferences`
- H1: `USER PREFERENCES`

#### Settings Sub-Nav

- `Manage Profile`
- `Subscriptions` (active, bold)
- `Password` (hidden)

#### Active Subscriptions

- Section heading: `Active Subscriptions`

| Subscription | Action |
|---|---|
| `Scratch Club` | `Manage Subscription` (orange link) |
| `VIP Coaching` | `Manage Subscription` |
| `Champions Pass` | `Manage Subscription` |
| `Player's Club` | `Manage Subscription` |

Hidden: `SwingFix AI` — `Cancel Subscription`

#### Inactive Subscriptions

- Section heading: `Inactive Subscriptions`
- `Inactive Subscription Placeholder`

Hidden rows: `VIP Coaching`, `Champions Pass`, `SwingFix AI` — with `Manage Subscription` or `Cancel Subscription` links

#### Help Section

- `NEED HELP WITH YOUR SUBSCRIPTION?`
- `Contact Us`
- `Phone: 1-800-523-5760`
- `Email: support@performancegolf.com`

#### Footer

- `©2025 Performance Golf. All Rights Reserved. Terms | Privacy Policy`
- `Scratch Club Benefits | VIP Coaching Benefits | SwingFix AI Benefits | Contact Us`

---

## Design Tokens

| Token | Value |
|---|---|
| **Primary font** | `ABC Repro` (Regular, Medium, Bold) + `ABC Repro Mono` |
| **Performance Orange** | `#FD3300` |
| **PG Black** | `#1D1A1A` |
| **Warm Gray 4** | `#F4F2F0` |
| **White** | `#FFFFFF` |
| **Canvas bg** | `white` |
| **Body bg** | `#F6F6F6` |
| **Border subtle** | `#E6E9EB` |
| **Border muted** | `#DADDDE` |
| **Text base** | `#131214` |
| **Text subtle** | `#898D8F` |
| **Text on black** | `#0A0A0A` |
| **Radius — cards/nav** | `16px` |
| **Radius — buttons/pills** | `9999px` (full round) |
| **Radius — inputs** | `8px` |
| **Shadow — elevation/low** | `0 0 1px rgba(20,20,20,0.12), 0 1px 8px rgba(20,20,20,0.08)` |
| **Sidebar width** | `280px` (expanded) |
| **Desktop width** | `1440px` |
| **Breakpoints** | `1440px`, `768px`, `390px` |
| **Nav item height** | `44px` with `4px` vertical gaps |
| **Video player aspect** | ~961 x 505px (16:9-ish) |
| **Card internal padding** | `24px` or `32px` |
| **Section spacing** | `~40px` between major sections |

---

## Notes

### Placeholder Text

The Figma file is built on a **Nucleus UI kit** template. Many text nodes contain placeholder copy that has NOT been replaced with final PG content:

- `All-in-one UI Kit and Design System for Figma` — appears as section titles
- `Supercharge your design workflow, kick-start your projects faster, and level up your process.` — appears as section descriptions
- `Today: Get instant access` — timeline step labels
- `Access all premium features: library, icons, Nucleus +AI, auto layout and more` — step descriptions
- `Food Title`, `Category`, `Label`, `Title`, `Description` — generic card/form placeholders
- `100`, `101`, `102` — numeric placeholders
- `Gilad`, `Aisha`, `Jon` — placeholder user names from UI kit
- `nucleus-ui.com/button-packs` — placeholder URLs
- `Launch 'Buy 1, Get 1 Free' to attract new` — promotional card placeholder
- `Add product sections to your Gumroad profile` — Gumroad-specific placeholder

### Real PG-Specific Copy

The actual golf-specific content that IS finalized includes:
- All chat messages and coach interactions
- Swing analysis copy (flaw names, descriptions)
- Game rules and drill instructions
- Scorecard data and round entry fields
- Course names and instructor names
- Product descriptions (in hidden states)
- Upsell modal headlines, benefits, and pricing
- Pulse survey question and options
- Community post content
- Settings form fields and golfer profile data
- VIP Coaching onboarding flow (3-step progress, swing upload instructions)
- Scratch Club performance tracking (scorecards, charts, training challenges)
- All Courses filter system (course type, instructor filters)
- User Preferences forms (profile, subscriptions, password)
- Pulse Program journey progression (5-step: Learn → Connect → Practice → Play → Accelerate)
- Video Player expanded view (PG1 Pulse Assessment, Recommended Courses)
- Footer links and legal text

### Subscription Tiers Referenced

- `Scratch Club`
- `VIP Coaching`
- `Champions Pass`
- `Player's Club`
- `SwingFix AI`

### Instructors/Coaches Referenced

- Martin Chuck (Golf Digest Top-10 Coach)
- Hank Haney (Tiger Woods' Former Coach)
- Rick Smith (Hall of Fame instructor)
- Erika Larkin
- James Sieckmann
- Rocco Mediate
- David Leadbetter
- Eric Cogorno
- Cameron McCormick
- Evan Knight / Brian Mogg (VIP Coaching coaches)

### Hidden/Variant States

Many screens contain **hidden layers** showing alternate states, future features, or different page configurations. These are documented above within each page's "Hidden" sections. Key hidden features include:
- Multiple tab structures (PRACTICE, Record & Track, REWARDS)
- Alternative page headers and breadcrumbs
- Collapsed/expanded sidebar variants
- Product cards with pricing
- Drill-specific filter checkboxes
- Category browse cards
- User Preferences overlay (profile, subscriptions, password tabs)
- Alternate coach chat threads (Scott vs David vs Nikki)
- Swing focus/tendency chat messages (Driver/Slice)

### Complete Page Coverage

This document covers all 20 unique page-level frames from the Figma file:

| # | Page | Section |
|---|---|---|
| 1 | Dashboard — PG1 Pulse Smart Path | DASHBOARD |
| 2 | My Courses | MY COURSES |
| 3 | Video Player | VIDEO PLAYER |
| 4 | My Favorites | MY COURSES |
| 5 | Settings — Golfer Profile | SETTINGS |
| 6 | Community | COMMUNITY |
| 7 | Dashboard Minimal (Freemium) | DASHBOARD |
| 8 | Pulse Survey Modal | MODALS |
| 9 | Upsell Modal — Existing Users | MODALS |
| 10 | Upsell Modal — New Users | MODALS |
| 11 | VIP Coaching — My Coach | VIP-COACHING |
| 12 | VIP Coaching — Swing Upload | VIP-COACHING |
| 13 | Scratch Club — Practice | SCRATCH CLUB |
| 14 | Scratch Club — Record & Track | SCRATCH CLUB |
| 15 | Video Player Expanded | VIDEO PLAYER (EXPANDED) |
| 16 | All Courses | MY COURSES |
| 17 | Pulse Program Modal | MODALS |
| 18 | Pulse Program Expanded | DASHBOARD |
| 19 | User Preferences — Manage Profile | SETTINGS |
| 20 | User Preferences — Subscriptions | SETTINGS |
