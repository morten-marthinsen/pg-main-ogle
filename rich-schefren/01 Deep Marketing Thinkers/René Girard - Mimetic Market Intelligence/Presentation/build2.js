/**
 * Mimetic Market Intelligence — ZenithPro
 * REBUILT: Garr Reynolds / Presentation Zen
 *
 * Rules applied:
 * - One idea per slide, period
 * - Helvetica Neue, large, clean
 * - Full-bleed images, text in natural dark zones (NO full overlays)
 * - Max 7 words per slide
 * - No boxes, no panels, no borders, no bullets
 * - Billboard test: readable at 65mph
 * - Standalone test: virtually meaningless without narration (correct)
 */

const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

const PDIR = __dirname;
const IDIR = path.join(PDIR, "images");
const OUT  = path.join(PDIR, "Mimetic-Market-Intelligence-v2.pptx");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title  = "Mimetic Market Intelligence";
pres.author = "Rich Schefren";

const W = 10, H = 5.625;
const FONT = "Helvetica Neue";

const WHITE  = "F5F2E8";
const GOLD   = "D4A843";
const MUTED  = "8B9BB4";
const DARK   = "0A0D1A";
const RED    = "E05555";
const GREEN  = "4CAF7D";

function img(name) {
  const p = path.join(IDIR, name);
  return fs.existsSync(p) ? p : null;
}

// Full-bleed image, NO overlay — text goes in the dark zone the image provides
function bgFull(slide, imgName) {
  const p = img(imgName);
  if (p) slide.addImage({ path: p, x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H } });
  else slide.background = { color: DARK };
}

// Pure dark background
function bgDark(slide) {
  slide.background = { color: DARK };
}

// ── SLIDE 1 ─────────────────────────────────────────────────────────────────
// Full-bleed network image, subject right → text in dark left zone
{
  const s = pres.addSlide();
  bgFull(s, "bg-01.jpg");

  // Text sits in natural dark left zone
  s.addText("I spent\n$12,500", {
    x: 0.4, y: 1.0, w: 5.5, h: 3.0,
    fontFace: FONT, fontSize: 72, bold: true, color: WHITE,
    align: "left", valign: "middle", margin: 0,
  });

  s.addText("The minute I saw this first report.", {
    x: 0.4, y: 4.3, w: 5.5, h: 0.7,
    fontFace: FONT, fontSize: 22, color: GOLD,
    align: "left", margin: 0,
  });

  s.addNotes(`OPEN with energy. Don't explain. Just say it.

"I bought a domain for twelve thousand five hundred dollars the day I saw this first report. I want to show you what it showed me — and then hand it to you."`);
}

// ── SLIDE 2 ─────────────────────────────────────────────────────────────────
// Pure dark — one sentence
{
  const s = pres.addSlide();
  bgDark(s);

  s.addText("Your market\nis mimetic.", {
    x: 0.6, y: 1.2, w: 8.8, h: 3.2,
    fontFace: FONT, fontSize: 80, bold: true, color: WHITE,
    align: "left", valign: "middle", margin: 0,
  });

  s.addText("René Girard: we don't decide what we want. We copy.", {
    x: 0.6, y: 4.6, w: 9, h: 0.7,
    fontFace: FONT, fontSize: 18, color: MUTED,
    align: "left", italic: true, margin: 0,
  });

  s.addNotes(`"René Girard spent his career proving that human desire isn't original. We copy what we see others wanting. That's mimesis."

"What does that mean for a market? It means your competitors are unconsciously copying each other's promises, language, and enemies — until the entire space is saying the same thing in slightly different words."

"That's what this skill maps."`);
}

// ── SLIDE 3 ─────────────────────────────────────────────────────────────────
// Clean dark — the skill overview
{
  const s = pres.addSlide();
  bgDark(s);

  s.addText("One prompt.", {
    x: 0.6, y: 0.9, w: 9, h: 1.2,
    fontFace: FONT, fontSize: 72, bold: true, color: WHITE,
    align: "left", margin: 0,
  });

  s.addText("Six documents.", {
    x: 0.6, y: 2.3, w: 9, h: 1.2,
    fontFace: FONT, fontSize: 72, bold: true, color: GOLD,
    align: "left", margin: 0,
  });

  s.addNotes(`"When you run this on your market, it produces six documents. I'm going to walk you through the first three — the ones I ran on the 'AI for Business Owners' space. My space."

"Let's start with the one that required the most honesty."`);
}

// ── SLIDE 4 ─────────────────────────────────────────────────────────────────
// Report 01 section label — dark, minimal
{
  const s = pres.addSlide();
  bgDark(s);

  s.addText("01", {
    x: 0.6, y: 0.6, w: 2, h: 1.0,
    fontFace: FONT, fontSize: 18, bold: true, color: GOLD,
    align: "left", charSpacing: 4, margin: 0,
  });

  s.addText("Anti-Mimetic\nDifferentiator", {
    x: 0.6, y: 1.4, w: 9, h: 3.2,
    fontFace: FONT, fontSize: 76, bold: true, color: WHITE,
    align: "left", margin: 0,
  });

  s.addNotes(`Section intro. Let the slide breathe. Just say:

"The first document is called the Anti-Mimetic Differentiator."

Pause. Then proceed.`);
}

// ── SLIDE 5 ─────────────────────────────────────────────────────────────────
// Crowd image — text in dark sky zone at top
{
  const s = pres.addSlide();
  bgFull(s, "bg-05.jpg");

  s.addText("Everyone is saying\nthe same 4 things.", {
    x: 0.5, y: 0.4, w: 8, h: 2.0,
    fontFace: FONT, fontSize: 56, bold: true, color: WHITE,
    align: "left", margin: 0,
  });

  s.addText("Jasper. Brunson. Kern. Ottley. Martell. Hormozi.", {
    x: 0.5, y: 2.5, w: 7, h: 0.6,
    fontFace: FONT, fontSize: 18, color: GOLD,
    align: "left", margin: 0,
  });

  s.addNotes(`"The skill analyzed 15 competitors in my space. It found the market has collapsed into 4 promise clusters."

"Save time. Make money with AI. Don't get left behind. AI is easy, anyone can do it."

"Jasper, Brunson, Kern, Ottley, Martell, Hormozi — all making some version of these 4 promises. In different words. With different personalities. But the same underlying claim."

"And then I got to Section 2."`);
}

// ── SLIDE 6 ─────────────────────────────────────────────────────────────────
// The brutal honest one — pure dark, maximum impact
{
  const s = pres.addSlide();
  bgDark(s);

  s.addText("So am I.", {
    x: 0.6, y: 1.3, w: 9, h: 3.0,
    fontFace: FONT, fontSize: 100, bold: true, color: WHITE,
    align: "left", valign: "middle", margin: 0,
  });

  s.addNotes(`Let this land. Don't rush it.

"Section 2 is called 'Where Rich Has Already Converged.'"

"'Force Multiplier' sits in the Save Time cluster — same as everyone. My 'less than 1% figured out' narrative is the same discovery arc as Kern, Brunson, Ottley. My language — 'AI-powered,' 'operating system,' 'scale' — all converged."

"The skill doesn't let you hide."`);
}

// ── SLIDE 7 ─────────────────────────────────────────────────────────────────
// Open space — vast landscape, text in dark sky
{
  const s = pres.addSlide();
  bgFull(s, "bg-07.jpg");

  s.addText("But nobody\nis standing here.", {
    x: 0.4, y: 0.5, w: 6.5, h: 2.2,
    fontFace: FONT, fontSize: 60, bold: true, color: WHITE,
    align: "left", margin: 0,
  });

  s.addNotes(`"Section 3 maps the open territory — positions no competitor occupies."

List them briefly:
"AI for judgment, not just execution."
"The anti-FOMO position — nobody is saying 'slow down and think.'"
"AI as a competitive moat, not a productivity hack."
"The post-prompt paradigm."
"AI for established businesses, not aspiring ones."

"Five open positions. Nobody standing in any of them."

"And one in particular was the reason I bought that domain."`);
}

// ── SLIDE 8 ─────────────────────────────────────────────────────────────────
// Report 02 section label
{
  const s = pres.addSlide();
  bgDark(s);

  s.addText("02", {
    x: 0.6, y: 0.6, w: 2, h: 1.0,
    fontFace: FONT, fontSize: 18, bold: true, color: GOLD,
    align: "left", charSpacing: 4, margin: 0,
  });

  s.addText("Competitor\nDesire Theft", {
    x: 0.6, y: 1.4, w: 9, h: 3.2,
    fontFace: FONT, fontSize: 76, bold: true, color: WHITE,
    align: "left", margin: 0,
  });

  s.addNotes(`"Report 2 goes deeper. Instead of analyzing promises, it maps what each competitor is actually selling — not the product, but the identity."

"Girard's insight: the buyer doesn't just want the product. They want to become the person who has it."

"So what person is each competitor offering to make you?"`);
}

// ── SLIDE 9 ─────────────────────────────────────────────────────────────────
// Image with text in dark zone — the identity insight
{
  const s = pres.addSlide();
  bgFull(s, "bg-09.jpg");

  s.addText("They don't sell products.", {
    x: 0.4, y: 1.0, w: 5.5, h: 1.0,
    fontFace: FONT, fontSize: 44, bold: true, color: WHITE,
    align: "left", margin: 0,
  });

  s.addText("They sell identities.", {
    x: 0.4, y: 2.2, w: 5.5, h: 1.0,
    fontFace: FONT, fontSize: 44, bold: true, color: GOLD,
    align: "left", margin: 0,
  });

  s.addNotes(`Walk through the desire map from memory — you don't need it on the slide:

"Hormozi sells the identity of the ruthlessly competent operator."
"Brunson sells the marketing genius who cracked the code."
"Codie Sanchez sells the wise contrarian who sees what others miss."
"Dan Martell sells the free CEO who bought back his time."

"Each one is a specific person you want to become. Not a product you want to own."

"Now here's where the report found the biggest gap."`);
}

// ── SLIDE 10 ────────────────────────────────────────────────────────────────
// The gap — dark, setup slide
{
  const s = pres.addSlide();
  bgDark(s);

  s.addText("The biggest uncontested\ndesire in this market:", {
    x: 0.6, y: 0.8, w: 9, h: 2.0,
    fontFace: FONT, fontSize: 52, bold: false, color: MUTED,
    align: "left", margin: 0,
  });

  s.addText("Nobody owns it.", {
    x: 0.6, y: 3.2, w: 9, h: 1.2,
    fontFace: FONT, fontSize: 52, bold: true, color: WHITE,
    align: "left", margin: 0,
  });

  s.addNotes(`Build the tension. Then flip to the next slide to reveal the answer.`);
}

// ── SLIDE 11 ────────────────────────────────────────────────────────────────
// The answer — the single most important slide in the deck
{
  const s = pres.addSlide();
  bgDark(s);

  s.addText("Knowing WHAT\nto do with AI.", {
    x: 0.5, y: 0.6, w: 9.2, h: 2.4,
    fontFace: FONT, fontSize: 72, bold: true, color: GOLD,
    align: "left", margin: 0,
  });

  s.addText("Not HOW.", {
    x: 0.5, y: 3.2, w: 9, h: 1.4,
    fontFace: FONT, fontSize: 72, bold: true, color: WHITE,
    align: "left", margin: 0,
  });

  s.addNotes(`Read this slow.

"The single largest uncontested desire in the AI-for-business market is knowing WHAT to do with AI. Not how. Not which tool. Not what prompt."

"WHAT. STRATEGY. PURPOSE."

"Every competitor teaches how. Nobody teaches what."

"AI anxiety is now the #1 business risk among mid-market executives — ahead of economic concerns. People have the tools. They don't have the thinking."

Pause.

"And the report said one more thing."`);
}

// ── SLIDE 12 ────────────────────────────────────────────────────────────────
// Report 03 section label
{
  const s = pres.addSlide();
  bgDark(s);

  s.addText("03", {
    x: 0.6, y: 0.6, w: 2, h: 1.0,
    fontFace: FONT, fontSize: 18, bold: true, color: GOLD,
    align: "left", charSpacing: 4, margin: 0,
  });

  s.addText("Your\nDesire Profile", {
    x: 0.6, y: 1.4, w: 9, h: 3.2,
    fontFace: FONT, fontSize: 76, bold: true, color: WHITE,
    align: "left", margin: 0,
  });

  s.addNotes(`"Report 3 applies the exact same framework. To me."

Pause.

"Same rigor. No mercy."`);
}

// ── SLIDE 13 ────────────────────────────────────────────────────────────────
// Pioneer image — text in dark left zone
{
  const s = pres.addSlide();
  bgFull(s, "bg-13.jpg");

  s.addText("He taught\nthe gurus.", {
    x: 0.4, y: 0.8, w: 5.5, h: 2.4,
    fontFace: FONT, fontSize: 64, bold: true, color: WHITE,
    align: "left", margin: 0,
  });

  s.addNotes(`"The report said I am the originator of concepts my competitors now use to mediate desire."

"The automated webinar — Brunson's bread and butter."
"The VSL — industry standard now."
"The lead magnet — so ubiquitous nobody remembers who invented it."
"The 'opportunity seeker vs. entrepreneur' distinction — implicit in Hormozi's entire brand."

"I taught them. They run ten times my audience."

"The report called it the Paradox of the Pioneer."

"Three critical gaps: model visibility too low, no named identity for buyers, desire fragmented across five products."

Then flip.`);
}

// ── SLIDE 14 ────────────────────────────────────────────────────────────────
// The brutal truth — max impact
{
  const s = pres.addSlide();
  bgDark(s);

  s.addText("And their marketing\nhas surpassed his.", {
    x: 0.5, y: 1.0, w: 9.2, h: 3.0,
    fontFace: FONT, fontSize: 64, bold: true, color: WHITE,
    align: "left", margin: 0, italic: true,
  });

  s.addText("— The report, on Rich Schefren", {
    x: 0.5, y: 4.4, w: 9, h: 0.7,
    fontFace: FONT, fontSize: 16, color: MUTED,
    align: "left", margin: 0,
  });

  s.addNotes(`Read it out loud. From the report. About yourself.

Let it breathe.

"Then it kept going. Docs 4, 5, 6 are strategic blueprints. The Manifesto play. How to unify all five products under one desire arc. How to fix the social proof ratio. All of it."

"And then I hit the one sentence that made me close the laptop and open a browser."`);
}

// ── SLIDE 15 ────────────────────────────────────────────────────────────────
// The domain purchase — image with text in dark zone
{
  const s = pres.addSlide();
  bgFull(s, "bg-16.jpg");

  s.addText("AIStrategist.com", {
    x: 0.4, y: 1.0, w: 6, h: 1.1,
    fontFace: FONT, fontSize: 48, bold: true, color: WHITE,
    align: "left", margin: 0,
  });

  s.addText("$12,500.", {
    x: 0.4, y: 2.3, w: 6, h: 1.3,
    fontFace: FONT, fontSize: 72, bold: true, color: GOLD,
    align: "left", margin: 0,
  });

  s.addText("Same day.", {
    x: 0.4, y: 3.8, w: 6, h: 0.8,
    fontFace: FONT, fontSize: 36, color: WHITE,
    align: "left", margin: 0,
  });

  s.addNotes(`"AIStrategist.com. Twelve thousand five hundred dollars. Same day I read the report."

"Because the report proved the territory is real and unoccupied. And 'AI Tactician vs. AI Strategist' is the 2026 version of 'Opportunity Seeker vs. Strategic Entrepreneur.' The same wedge. The same uncontested ground. I wrote the original in 2006 and it built this company."

"The report didn't tell me to buy the domain. It proved the domain was worth it."

Pause.

"That's what this skill does."`);
}

// ── SLIDE 16 ────────────────────────────────────────────────────────────────
// The distinction — clean, two words
{
  const s = pres.addSlide();
  bgDark(s);

  // Thin gold divider
  s.addShape(pres.ShapeType.rect, {
    x: 4.97, y: 0.5, w: 0.05, h: 4.7,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 },
  });

  s.addText("AI\nTactician", {
    x: 0.3, y: 0.8, w: 4.5, h: 3.5,
    fontFace: FONT, fontSize: 64, bold: true, color: RED,
    align: "center", valign: "middle", margin: 0,
  });

  s.addText("AI\nStrategist", {
    x: 5.2, y: 0.8, w: 4.5, h: 3.5,
    fontFace: FONT, fontSize: 64, bold: true, color: GREEN,
    align: "center", valign: "middle", margin: 0,
  });

  s.addText("Chases tools.", {
    x: 0.3, y: 4.5, w: 4.5, h: 0.6,
    fontFace: FONT, fontSize: 18, color: RED,
    align: "center", margin: 0,
  });

  s.addText("Builds thinking.", {
    x: 5.2, y: 4.5, w: 4.5, h: 0.6,
    fontFace: FONT, fontSize: 18, color: GREEN,
    align: "center", margin: 0,
  });

  s.addNotes(`"This is the distinction the skill crystallized. AI Tactician vs. AI Strategist. The 2026 version."

"You're in ZenithPro. You're not a tactician. But you now have a tool that will show you exactly where in your market the AI Strategist position is open and unoccupied."

Then flip to close.`);
}

// ── SLIDE 17 ────────────────────────────────────────────────────────────────
// Close — clean
{
  const s = pres.addSlide();
  bgDark(s);

  s.addText("Now it's\nyours.", {
    x: 0.5, y: 0.8, w: 9, h: 3.2,
    fontFace: FONT, fontSize: 92, bold: true, color: WHITE,
    align: "left", valign: "middle", margin: 0,
  });

  s.addText("Mimetic Market Intelligence — packaged for ZenithPro today.", {
    x: 0.5, y: 4.4, w: 9, h: 0.7,
    fontFace: FONT, fontSize: 18, color: MUTED,
    align: "left", margin: 0,
  });

  s.addNotes(`"The Mimetic Market Intelligence skill is being packaged for ZenithPro today."

"You run this on your market. It produces the same six documents. You'll see where your competitors have converged, where the open territory is, and what it would take to own it."

"For some of you that will be a $12,000 insight. For others it confirms what you already sensed. Either way — you'll have the data."

"Let me show you how to install it."`);
}

// ── BUILD ─────────────────────────────────────────────────────────────────
pres.writeFile({ fileName: OUT })
  .then(() => console.log("Built:", OUT))
  .catch(err => { console.error(err); process.exit(1); });
