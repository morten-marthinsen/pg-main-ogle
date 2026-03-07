/**
 * Mimetic Market Intelligence — ZenithPro Presentation
 * "Why I Bought AIStrategist.com for $12,500"
 *
 * Garr Reynolds / Presentation Zen design philosophy
 * Dark navy palette, gold accents, one idea per slide
 */

const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

const PDIR = __dirname;
const IDIR = path.join(PDIR, "images");
const OUTPUT = path.join(PDIR, "Mimetic-Market-Intelligence-ZenithPro.pptx");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Mimetic Market Intelligence — ZenithPro";
pres.author = "Rich Schefren";

// ─── Color Palette ─────────────────────────────────────────────────────────
const C = {
  bg:         "0A0D1A",   // deep navy-black
  text:       "F5F2E8",   // warm off-white
  gold:       "D4A843",   // warm gold
  goldBright: "F0C254",   // bright gold for emphasis
  muted:      "6B7A99",   // blue-gray for secondary text
  overlay:    "050810",   // near-black overlay
  red:        "C0392B",
  green:      "27AE60",
  redLight:   "E88080",
  greenLight: "80E880",
  redBg:      "1A0A0A",
  greenBg:    "0A1A0A",
  redBorder:  "4A1A1A",
  greenBorder:"1A4A1A",
  panelBg:    "0D1A2E",
  panelBorder:"1E3050",
};

const W = 10, H = 5.625; // 16:9 inches

// ─── Helpers ───────────────────────────────────────────────────────────────

function img(name) {
  const p = path.join(IDIR, name);
  return fs.existsSync(p) ? p : null;
}

function addOverlay(slide, alpha = 0.55) {
  // alpha = 0..1 where 1 = fully opaque
  // pptxgenjs transparency: 0=opaque, 100=invisible
  const trans = Math.round((1 - alpha) * 100);
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: W, h: H,
    fill: { color: C.overlay, transparency: trans },
    line: { color: C.overlay, width: 0 },
  });
}

function addBg(slide, imgName, overlayAlpha = 0.55) {
  const p = imgName ? img(imgName) : null;
  if (p) {
    slide.addImage({ path: p, x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H } });
    addOverlay(slide, overlayAlpha);
  } else {
    slide.background = { color: C.bg };
  }
}

function hrule(slide, y, color = C.gold, x = 3.5, w = 3) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h: 0.04,
    fill: { color }, line: { color, width: 0 },
  });
}

function vbar(slide, x = 0.5, color = C.gold, y = 0.8, h = 4.0) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w: 0.055, h,
    fill: { color }, line: { color, width: 0 },
  });
}

function panel(slide, x, y, w, h, bgColor = C.panelBg, borderColor = C.panelBorder) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h,
    fill: { color: bgColor },
    line: { color: borderColor, width: 1 },
  });
}

function label(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontSize: 11, bold: true, color: C.gold,
    align: "left", margin: 0, charSpacing: 3,
    ...opts,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 1: TITLE
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  addBg(s, "slide-01-title.jpg", 0.48);

  // Eyebrow
  s.addText("MIMETIC MARKET INTELLIGENCE", {
    x: 0.5, y: 0.4, w: 9, h: 0.4,
    fontSize: 11, bold: true, color: C.gold,
    align: "center", charSpacing: 5, margin: 0,
  });

  // Main headline
  s.addText([
    { text: "I Bought a Domain", options: { breakLine: true } },
    { text: "for $12,500", options: {} },
  ], {
    x: 0.8, y: 1.2, w: 8.4, h: 2.4,
    fontSize: 64, bold: true, color: C.text,
    align: "center", margin: 0, valign: "middle",
  });

  // Subhead
  s.addText("The minute I saw this first report.", {
    x: 1, y: 3.75, w: 8, h: 0.6,
    fontSize: 22, color: C.muted, align: "center", italic: true, margin: 0,
  });

  // Footer
  s.addText("ZENITHPRO  ·  FEBRUARY 2026", {
    x: 0.5, y: 5.1, w: 9, h: 0.3,
    fontSize: 10, color: C.muted, align: "center", charSpacing: 3, margin: 0,
  });

  s.addNotes(`OPENING — energy up.

"Today I want to show you something that changed how I see my entire market. The first document this skill produced — I read it, and immediately went out and spent $12,500."

Pause.

"The domain was AIStrategist.com. And I'll tell you exactly why at the end."

"But first — let me show you what this skill does, and what it showed me about my competitors, my market, and the position nobody in my space is standing in."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 2: THE GIRARDIAN INSIGHT
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  hrule(s, 1.5);

  s.addText("René Girard discovered something about\nhuman desire that marketers have missed\nfor 40 years.", {
    x: 0.8, y: 1.8, w: 8.4, h: 2.1,
    fontSize: 34, color: C.text, align: "center", margin: 0,
  });

  panel(s, 1.2, 4.05, 7.6, 0.95, "0D1A2E", C.gold);
  s.addText("Desire is mimetic. We want what others want — because they want it.", {
    x: 1.4, y: 4.1, w: 7.2, h: 0.85,
    fontSize: 20, color: C.goldBright, align: "center", italic: true, margin: 0, valign: "middle",
  });

  s.addNotes(`"René Girard was a French philosopher who discovered that human desire is not original. We don't decide what we want. We copy what we see others wanting."

"His insight completely reframes how you look at a market. Instead of asking 'what do customers want?' you ask 'what are competitors promising — and is that promise already crowded?'"

"This skill maps the desire landscape of your entire competitive market through Girard's lens. And what it showed me about my own market was both humbling and clarifying."

"Let me show you the six documents it produces."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 3: SIX DOCUMENTS
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText([
    { text: "One skill prompt.", options: { breakLine: true } },
    { text: "Six documents.", options: {} },
  ], {
    x: 0.5, y: 0.5, w: 9, h: 1.8,
    fontSize: 48, bold: true, color: C.text, align: "center", margin: 0,
  });

  const docs = [
    ["01", "Anti-Mimetic Differentiator"],
    ["02", "Competitor Desire Theft"],
    ["03", "Your Desire Profile"],
    ["04", "Visibility & Model Strategy"],
    ["05", "Desire Unification Strategy"],
    ["06", "Internal Mediator Deployment"],
  ];

  docs.forEach(([num, title], i) => {
    const col = i < 3 ? 0 : 1;
    const row = i % 3;
    const x = col === 0 ? 0.8 : 5.4;
    const y = 2.55 + row * 0.82;

    // Number badge
    panel(s, x, y + 0.05, 0.52, 0.52, C.panelBg, C.gold);
    s.addText(num, { x, y: y + 0.05, w: 0.52, h: 0.52, fontSize: 17, bold: true, color: C.gold, align: "center", margin: 0, valign: "middle" });

    // Title
    s.addText(title, { x: x + 0.65, y, w: 3.8, h: 0.62, fontSize: 19, color: C.text, align: "left", margin: 0, valign: "middle" });
  });

  s.addNotes(`"When you run this skill on your market, it produces six documents."

"Today I'm going to walk you through the ones I ran on my market — the 'AI for Business Owners' space."

"I want to show you actual output. Not a description of what it might do. The actual report — what it found, what it said about my competition, and what it said about me."

"Let's start with the first one. This one requires an honest look in the mirror."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 4: REPORT 01 INTRO
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  addBg(s, "slide-04-convergence.jpg", 0.62);

  label(s, "REPORT  01", 0.5, 0.5, 9, 0.4, { align: "center", charSpacing: 6 });

  s.addText([
    { text: "Anti-Mimetic", options: { breakLine: true } },
    { text: "Differentiator", options: {} },
  ], {
    x: 0.5, y: 1.1, w: 9, h: 2.4,
    fontSize: 60, bold: true, color: C.text, align: "center", margin: 0,
  });

  s.addText("15 competitors. One question:\nwhere has the market converged into sameness?", {
    x: 1, y: 3.7, w: 8, h: 1.0,
    fontSize: 21, color: C.muted, align: "center", margin: 0,
  });

  s.addNotes(`"The first document: the Anti-Mimetic Differentiator. It analyzes 15 competitors through Girard's lens."

"The core question: where has the market unconsciously converged? Same promises, same language, same enemy, same packaging."

"Here's what it found."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 5: THE 4 PROMISE CLUSTERS
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("The market collapsed into 4 promise clusters.", {
    x: 0.5, y: 0.35, w: 9, h: 0.65,
    fontSize: 28, color: C.text, align: "center", margin: 0,
  });

  s.addText("Jasper. Frank Kern. Brunson. Hormozi. Dan Martell. Ottley. Amy Porterfield. Copy.ai. And yes — me.", {
    x: 0.5, y: 0.95, w: 9, h: 0.55,
    fontSize: 16, color: C.muted, align: "center", italic: true, margin: 0,
  });

  const clusters = [
    { num: "01", line1: "Save Time", line2: "Do More With Less", x: 0.3, y: 1.7 },
    { num: "02", line1: "Build a Business", line2: "Make Money With AI", x: 5.2, y: 1.7 },
    { num: "03", line1: "Future-Proof Yourself", line2: "Don't Get Left Behind", x: 0.3, y: 3.35 },
    { num: "04", line1: "AI is Easy", line2: "Anyone Can Do It", x: 5.2, y: 3.35 },
  ];

  clusters.forEach(({ num, line1, line2, x, y }) => {
    panel(s, x, y, 4.4, 1.45, C.panelBg, C.panelBorder);
    s.addText(num, { x: x + 0.18, y: y + 0.1, w: 0.55, h: 0.45, fontSize: 14, bold: true, color: C.gold, margin: 0 });
    s.addText([
      { text: line1, options: { breakLine: true, bold: true } },
      { text: line2, options: { color: C.muted } },
    ], { x: x + 0.85, y: y + 0.1, w: 3.4, h: 1.25, fontSize: 20, color: C.text, margin: 0, valign: "middle" });
  });

  s.addNotes(`"The skill identified 4 promise clusters — the categories that the entire market competes inside."

"Cluster 1: Save time, do more with less. Jasper, Kern, Martell, ClickFunnels, Porterfield — and me with 'six-person team operating like six thousand.'"

"Cluster 2: Build a business, make money with AI. Ottley, Sam Woods, Gadzhi, Hormozi."

"Cluster 3: Future-proof yourself, don't get left behind. DigitalMarketer, Jasper, Matt Wolfe."

"Cluster 4: AI is easy, anyone can do it. ClickFunnels, Copy.ai, Jasper, Porterfield."

"Now — here's the section that was hardest to read."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 6: THE HONEST MIRROR
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  vbar(s, 0.5, C.gold, 0.75, 4.2);

  s.addText("Section 2 of the report is titled:", {
    x: 0.8, y: 0.8, w: 8.5, h: 0.45,
    fontSize: 16, color: C.gold, align: "left", margin: 0,
  });

  s.addText('\u201cWhere Rich Has\nAlready Converged.\u201d', {
    x: 0.8, y: 1.3, w: 8, h: 1.7,
    fontSize: 46, bold: true, color: C.text, align: "left", margin: 0,
  });

  s.addText("This is the section that required honesty.", {
    x: 0.8, y: 3.1, w: 8, h: 0.5,
    fontSize: 19, color: C.muted, align: "left", italic: true, margin: 0,
  });

  const convergences = [
    "\"Force Multiplier\" sits in Cluster A — Save Time, Do More With Less",
    "\"Less than 1% figured out\" = same narrative arc as Kern, Brunson, Ottley",
    "Revenue screenshots ($2.24M, $1.3M) = same proof TYPE as the whole market",
    "\"AI-powered,\" \"OS,\" \"scale,\" \"force multiplier\" = converged language",
  ];

  convergences.forEach((line, i) => {
    s.addText("↳  " + line, {
      x: 0.85, y: 3.75 + i * 0.43, w: 8.8, h: 0.38,
      fontSize: 14, color: C.muted, margin: 0, align: "left",
    });
  });

  s.addNotes(`"This is where the report held up a mirror."

"My 'Force Multiplier' positioning — Cluster A. Save time, do more with less. Same as everyone."

"The '6,000x' claim is dramatic. But the CATEGORY is identical to what every competitor promises."

"My 'less than 1% figured out' narrative is the same discovery arc as Kern, Brunson, and Ottley."

"My language — 'AI-powered,' 'operating system,' 'scale' — all converged. The word 'force multiplier' itself — Hormozi uses it too."

"The skill doesn't let you hide. It shows you where you've been mimetically pulled into the gravity of your competitors."

Pause.

"And then comes Section 3. Which is where the $12,500 comes in."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 7: THE OPEN SPACE
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  addBg(s, "slide-07-open-space.jpg", 0.45);

  s.addText("Section 3:", {
    x: 0.5, y: 0.45, w: 5, h: 0.4,
    fontSize: 15, color: C.gold, align: "left", margin: 0, bold: true,
  });

  s.addText("Open Space.", {
    x: 0.5, y: 0.9, w: 6, h: 1.5,
    fontSize: 72, bold: true, color: C.text, align: "left", margin: 0,
  });

  s.addText([
    { text: "Positions that NO competitor\n", options: {} },
    { text: "currently occupies.", options: {} },
  ], {
    x: 0.5, y: 2.5, w: 5.5, h: 1.1,
    fontSize: 22, color: C.text, align: "left", margin: 0,
  });

  const positions = [
    "AI for judgment, not just execution",
    "The anti-FOMO position",
    "AI as competitive moat",
    "The post-prompt paradigm",
    "AI for established businesses",
  ];

  positions.forEach((p, i) => {
    s.addText("→  " + p, {
      x: 6.0, y: 1.85 + i * 0.67, w: 3.7, h: 0.55,
      fontSize: 16, color: C.text, margin: 0, align: "left",
    });
  });

  s.addNotes(`"Section 3 maps the open territory — positions that NO competitor currently occupies."

Walk through each:

"AI for judgment, not execution — every competitor positions AI as a DOING tool. Nobody positions it as a thinking tool, a judgment tool."

"The anti-FOMO position — everyone sells urgency and fear of being left behind. Nobody is saying 'slow down and think first.'"

"AI as competitive moat — everyone sells AI as a productivity hack. Nobody teaches how to use AI to build something competitors can't replicate."

"The post-prompt paradigm — my Mode 1 vs. Mode 2 distinction IS this position. It's just not being marketed that way."

"AI for established businesses — the entire market talks to aspiring entrepreneurs. Almost nobody specifically serves the established business owner."

"I read these five."

Pause.

"One in particular hit me. And I'll tell you which one in a moment. But first — Report 2."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 8: REPORT 02 INTRO
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  addBg(s, "slide-08-desire.jpg", 0.62);

  label(s, "REPORT  02", 0.5, 0.5, 9, 0.4, { align: "center", charSpacing: 6 });

  s.addText([
    { text: "Competitor", options: { breakLine: true } },
    { text: "Desire Theft", options: {} },
  ], {
    x: 0.5, y: 1.1, w: 9, h: 2.4,
    fontSize: 60, bold: true, color: C.text, align: "center", margin: 0,
  });

  s.addText([
    { text: "They don't sell products.", options: { breakLine: true } },
    { text: "They sell identities.", options: { bold: true, color: C.goldBright } },
  ], {
    x: 1, y: 3.75, w: 8, h: 0.9,
    fontSize: 24, color: C.muted, align: "center", margin: 0,
  });

  s.addNotes(`"Report 2 goes deeper. Instead of analyzing promises, it maps the DESIRE each competitor mediates."

"Girard's insight: competitors don't compete on features. They compete on identities. The buyer doesn't just want the product — they want to BECOME the person who has it."

"So what identity does each competitor sell? Let me show you what the skill found."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 9: THE DESIRE MAP
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("What each competitor is actually selling.", {
    x: 0.5, y: 0.3, w: 9, h: 0.55,
    fontSize: 24, color: C.text, align: "center", margin: 0,
  });

  const desires = [
    { name: "Hormozi",     desire: "The ruthlessly competent operator who has \"figured out the game\"" },
    { name: "Brunson",     desire: "The marketing genius who cracked the code and has the system" },
    { name: "Codie Sanchez", desire: "The wise contrarian who sees what others miss" },
    { name: "Dan Martell", desire: "The free CEO who bought back his time" },
    { name: "Liam Ottley", desire: "The young entrepreneur who caught the wave first" },
    { name: "Frank Kern",  desire: "The effortlessly successful marketer with the lifestyle" },
  ];

  desires.forEach(({ name, desire }, i) => {
    const y = 1.05 + i * 0.73;
    panel(s, 0.3, y, 9.4, 0.63, i % 2 === 0 ? C.panelBg : "0A1525", C.panelBorder);
    s.addText(name, { x: 0.45, y, w: 2.1, h: 0.63, fontSize: 16, bold: true, color: C.gold, margin: 0, valign: "middle" });
    s.addText(desire, { x: 2.6, y, w: 7.0, h: 0.63, fontSize: 15, color: C.text, margin: 0, valign: "middle" });
  });

  s.addNotes(`Walk through each one. Let the pattern become visible.

"Notice: each competitor offers a specific identity. Hormozi's buyer wants to BECOME the ruthlessly competent operator. Brunson's buyer wants to BE the marketing genius who cracked the code."

"These aren't random differences. They're distinct desire territories. And the skill maps all of them so you can see where you're competing and where you're alone."

"Now — here's what the skill found about the contested zones versus the uncontested zones."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 10: CONTESTED VS UNDERSERVED
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("5 Saturated Desire Zones                    5 Empty Desire Zones", {
    x: 0.3, y: 0.2, w: 9.4, h: 0.5,
    fontSize: 18, bold: true, color: C.text, align: "center", margin: 0,
  });

  // Left panel — Contested
  panel(s, 0.3, 0.85, 4.4, 4.55, C.redBg, C.redBorder);
  s.addText("CONTESTED", {
    x: 0.4, y: 0.95, w: 4.2, h: 0.45,
    fontSize: 13, bold: true, color: C.red, align: "center", charSpacing: 4, margin: 0,
  });

  const contested = [
    "Escape the grind / get freedom",
    "Catch the AI wave in time",
    "Proven system / framework",
    "Be cutting-edge / ahead",
    "Specific income target ($10K/mo)",
  ];
  contested.forEach((c, i) => {
    s.addText("×  " + c, {
      x: 0.5, y: 1.58 + i * 0.68, w: 4.0, h: 0.55,
      fontSize: 15, color: C.redLight, margin: 0, align: "left",
    });
  });

  s.addText("5+ competitors fighting\nover each of these.", {
    x: 0.5, y: 4.95, w: 4.0, h: 0.38,
    fontSize: 12, color: "804040", italic: true, margin: 0, align: "center",
  });

  // Right panel — Underserved
  panel(s, 5.3, 0.85, 4.4, 4.55, C.greenBg, C.greenBorder);
  s.addText("UNDERSERVED", {
    x: 5.4, y: 0.95, w: 4.2, h: 0.45,
    fontSize: 13, bold: true, color: C.green, align: "center", charSpacing: 4, margin: 0,
  });

  const underserved = [
    "WHAT to do with AI, not HOW",
    "Stop feeling stupid about AI",
    "Think strategically, not tactically",
    "Build something that lasts",
    "AI amplifies MY unique genius",
  ];
  underserved.forEach((u, i) => {
    s.addText("✓  " + u, {
      x: 5.45, y: 1.58 + i * 0.68, w: 4.15, h: 0.55,
      fontSize: 15, color: C.greenLight, margin: 0, align: "left",
    });
  });

  s.addText("Almost nobody\nserving these.", {
    x: 5.45, y: 4.95, w: 4.1, h: 0.38,
    fontSize: 12, color: "408040", italic: true, margin: 0, align: "center",
  });

  s.addNotes(`"Here's the visual that hit hardest."

"Left side: 5 desire zones where 5+ competitors are all fighting. The market has heard these promises so many times they've gone numb."

"Right side: 5 desire zones that are almost completely unoccupied."

"The biggest one — the one at the top of the right column — is THE finding of this report."

"The desire to know WHAT to do with AI, not HOW to use it."

"The report cites real data: AI anxiety now outranks economic concerns as the #1 business risk among mid-market executives. 46% say they'd maintain AI investments during a market correction — decisions driven by fear, not understanding."

"People have the tools. They lack the THINKING to deploy them."

"And almost nobody is serving that desire. Nobody is saying: you're not behind, you don't lack tools — you lack the strategic framework to know what to DO."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 11: REPORT 03 INTRO
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  addBg(s, "slide-11-pioneer.jpg", 0.58);

  label(s, "REPORT  03", 0.5, 0.5, 9, 0.4, { align: "center", charSpacing: 6 });

  s.addText([
    { text: "Rich Schefren", options: { breakLine: true } },
    { text: "Desire Profile", options: {} },
  ], {
    x: 0.5, y: 1.1, w: 9, h: 2.4,
    fontSize: 56, bold: true, color: C.text, align: "center", margin: 0,
  });

  s.addText("The same rigor. Applied to himself.", {
    x: 1, y: 3.8, w: 8, h: 0.7,
    fontSize: 22, color: C.goldBright, align: "center", italic: true, margin: 0,
  });

  s.addNotes(`"Report 3 applies the exact same framework to my own marketing."

"This is the part that requires courage to read. It doesn't just show you where you're winning. It shows you exactly where you're losing — in mimetic terms."

"And what it found was both humbling and — ultimately — the clearest strategic picture I've had in years."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 12: THE PARADOX OF THE PIONEER
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  hrule(s, 0.75, C.gold, 1.5, 7);

  s.addText(
    "\u201cHe taught the people who are now his competition.\nAnd their marketing has surpassed his.\u201d",
    {
      x: 0.8, y: 1.0, w: 8.4, h: 2.8,
      fontSize: 38, color: C.text, align: "center", italic: true, margin: 0,
    }
  );

  hrule(s, 4.05, C.gold, 1.5, 7);

  s.addText("— Mimetic Market Intelligence Report, analyzing Rich Schefren", {
    x: 1, y: 4.2, w: 8, h: 0.55,
    fontSize: 15, color: C.muted, align: "center", margin: 0,
  });

  s.addNotes(`Read this slide aloud.

"This is what the report called 'The Paradox of the Pioneer.'"

"The automated webinar? Brunson's bread and butter now."
"The VSL? Industry standard."
"The lead magnet? So ubiquitous nobody remembers who invented it."
"The 'opportunity seeker vs. strategic entrepreneur' distinction? Implicit in Hormozi's entire brand."

"I originated these concepts. And the people I taught them to now reach ten times my audience."

Long pause. Let it land.

"The report found three critical gaps: model visibility is too low, the identity destination for buyers is unnamed, and desire clarity is fragmented across five products."

"And then — the key insight that triggered the domain purchase."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 13: THE KEY INSIGHT
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("The single largest uncontested\ndesire in the market:", {
    x: 0.5, y: 0.5, w: 9, h: 1.2,
    fontSize: 28, color: C.muted, align: "center", margin: 0,
  });

  panel(s, 0.4, 1.9, 9.2, 1.95, "0A1830", C.gold);

  s.addText([
    { text: "The desire to know WHAT to do\n", options: {} },
    { text: "with AI — not HOW to use it.", options: {} },
  ], {
    x: 0.6, y: 2.05, w: 8.8, h: 1.65,
    fontSize: 38, bold: true, color: C.goldBright, align: "center", margin: 0,
  });

  s.addText([
    { text: "Nobody in the market owns this.\n", options: { breakLine: true } },
    { text: "Rich Schefren is the natural occupant.", options: { bold: true, color: C.text } },
  ], {
    x: 0.5, y: 4.1, w: 9, h: 0.9,
    fontSize: 22, color: C.muted, align: "center", margin: 0,
  });

  s.addNotes(`"This is the line that stopped me."

Read it slowly.

"The single largest uncontested desire in the AI-for-business market is the desire to know WHAT to do with AI — not HOW to use it."

"Every competitor teaches tools. Nobody teaches thinking."

"The report said: Rich is the natural occupant of this territory. Because he's been teaching strategic thinking since before most of these competitors started their businesses. Because he taught the gurus who dominate the market. Because 'Connect the Dots' — the name of a product I've been running — literally IS this territory."

"I read that paragraph."

"I closed my laptop."

"I opened a browser."

"And I bought AIStrategist.com for twelve thousand five hundred dollars."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 14: THE STRATEGY DOCS
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("Then it kept going.", {
    x: 0.5, y: 0.3, w: 9, h: 0.65,
    fontSize: 32, bold: true, color: C.text, align: "center", margin: 0,
  });

  s.addText("Docs 4, 5, and 6 are full strategic blueprints.", {
    x: 0.5, y: 0.95, w: 9, h: 0.5,
    fontSize: 20, color: C.gold, align: "center", margin: 0,
  });

  const docs = [
    {
      num: "04",
      title: "Visibility & Model Strategy",
      desc: "The AI Strategist Manifesto · AIStrategist.com · The Distinctions Play to seed the brand",
    },
    {
      num: "05",
      title: "Desire Unification Strategy",
      desc: "One desire arc across all five products · \"AI Tactician vs. AI Strategist\" as the named identity",
    },
    {
      num: "06",
      title: "Internal Mediator Deployment",
      desc: "Fix the 90/10 proof ratio · Deploy peer success stories to activate desire, not just authority",
    },
  ];

  docs.forEach(({ num, title, desc }, i) => {
    const y = 1.65 + i * 1.28;
    panel(s, 0.4, y, 9.2, 1.15, C.panelBg, C.panelBorder);
    s.addText("DOC " + num, { x: 0.6, y: y + 0.1, w: 1.1, h: 0.38, fontSize: 13, bold: true, color: C.gold, margin: 0 });
    s.addText(title, { x: 1.8, y: y + 0.08, w: 7.5, h: 0.42, fontSize: 19, bold: true, color: C.text, margin: 0 });
    s.addText(desc, { x: 1.8, y: y + 0.58, w: 7.5, h: 0.5, fontSize: 14, color: C.muted, margin: 0 });
  });

  s.addNotes(`"The skill doesn't stop at analysis. It produces blueprints."

"Doc 4 — Visibility:"
"It proposed 'The Manifesto Play' — an updated Internet Business Manifesto for the AI era. Published on AIStrategist.com. The 'AI Tactician vs. AI Strategist' distinction — the 2026 version of 'Opportunity Seeker vs. Strategic Entrepreneur.'"
"It also proposed the Distinctions Play — 10 mind-blowing AI distinctions released free, 90 more behind an opt-in. Same viral mechanic as the original Manifesto."

"Doc 5 — Desire Unification:"
"One desire running through all five products: 'I want to think at a level that makes everything simple.' From ZenithMind OS to ZenithPro to Force Multiplier to Connect the Dots to the Flagship. One escalating arc. One named identity: AI Strategist."

"Doc 6 — Internal Mediators:"
"My social proof is 90/10 in the wrong direction. External mediators — Brunson, Kern, Agora — create authority. But peer success stories — people like YOU — create desire. The report proposed a concrete plan to flip the ratio."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 15: THE $12,500 MOMENT
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  addBg(s, "slide-17-domain.jpg", 0.52);

  s.addText("AIStrategist.com", {
    x: 0.5, y: 0.7, w: 9, h: 1.3,
    fontSize: 66, bold: true, color: C.text, align: "center", margin: 0,
  });

  s.addText("$12,500.", {
    x: 0.5, y: 2.05, w: 9, h: 1.1,
    fontSize: 60, bold: true, color: C.goldBright, align: "center", margin: 0,
  });

  s.addText([
    { text: "Bought it the same day I read the report.", options: { breakLine: true } },
    { text: "The report proved the territory was real. And unoccupied.", options: {} },
  ], {
    x: 0.8, y: 3.3, w: 8.4, h: 1.3,
    fontSize: 22, color: C.text, align: "center", margin: 0,
  });

  s.addNotes(`"AIStrategist.com. Twelve thousand five hundred dollars. Same day."

"Why that much? Because the report was that clear. The territory was real. The data was there. And the domain was the physical manifestation of a decision that had been building for twenty years."

"'AI Tactician vs. AI Strategist.' The 2026 version of 'Opportunity Seeker vs. Strategic Entrepreneur.'"

"I wrote that original distinction in 2006. It built Strategic Profits. The same wedge — updated for the AI era — with the same uncontested territory. And I have more credibility to own it now than I did then."

"The report didn't tell me to buy the domain. The report PROVED the domain was worth it."

Pause.

"That's what this skill does."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 16: THE DISTINCTION
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("The distinction the skill crystallized:", {
    x: 0.5, y: 0.25, w: 9, h: 0.5,
    fontSize: 20, color: C.muted, align: "center", margin: 0,
  });

  // Divider
  s.addShape(pres.ShapeType.rect, {
    x: 4.94, y: 0.8, w: 0.055, h: 4.45,
    fill: { color: C.gold }, line: { color: C.gold, width: 0 },
  });

  s.addText("AI Tactician", {
    x: 0, y: 0.9, w: 4.8, h: 0.9,
    fontSize: 40, bold: true, color: C.red, align: "center", margin: 0,
  });

  s.addText("AI Strategist", {
    x: 5.2, y: 0.9, w: 4.8, h: 0.9,
    fontSize: 40, bold: true, color: C.green, align: "center", margin: 0,
  });

  const leftItems = [
    "Chases every new tool announcement",
    "Measures by workflows automated",
    "Panics when models change",
    "Gets generic output like everyone else",
    "3 AI courses. Still no clear strategy.",
  ];

  const rightItems = [
    "Starts with strategy, fits tools to it",
    "Measures by business outcomes",
    "Builds on principles that survive change",
    "AI amplifies what's uniquely theirs",
    "Knows WHAT to build and WHY",
  ];

  leftItems.forEach((item, i) => {
    s.addText(item, {
      x: 0.2, y: 2.05 + i * 0.62, w: 4.6, h: 0.55,
      fontSize: 15, color: C.redLight, align: "center", margin: 0,
    });
  });

  rightItems.forEach((item, i) => {
    s.addText(item, {
      x: 5.2, y: 2.05 + i * 0.62, w: 4.6, h: 0.55,
      fontSize: 15, color: C.greenLight, align: "center", margin: 0,
    });
  });

  s.addNotes(`"This is the distinction the skill helped me see clearly."

"AI Tactician vs. AI Strategist. The 2026 version of Opportunity Seeker vs. Strategic Entrepreneur."

"You're in ZenithPro. You're not a tactician. But you now have a tool that will show you exactly where in YOUR market the AI Strategist position is open — and what it would take to own it."`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 17: YOUR TURN
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("Now it's your turn.", {
    x: 0.5, y: 0.65, w: 9, h: 1.0,
    fontSize: 52, bold: true, color: C.text, align: "center", margin: 0,
  });

  hrule(s, 1.8, C.gold, 2.5, 5);

  s.addText("The Mimetic Market Intelligence skill\nis being packaged for ZenithPro today.", {
    x: 0.5, y: 2.0, w: 9, h: 1.3,
    fontSize: 28, color: C.text, align: "center", margin: 0,
  });

  s.addText("You leave with the same analysis I ran on my own market —\nready to run on yours.", {
    x: 0.8, y: 3.5, w: 8.4, h: 1.1,
    fontSize: 20, color: C.muted, align: "center", italic: true, margin: 0,
  });

  s.addNotes(`"This skill is yours. Being packaged for ZenithPro today."

"What you're getting:"
"— The complete Mimetic Market Intelligence skill"
"— Installation instructions"
"— The six output documents I showed you today, as reference examples"

"You run this on your market. It analyzes your competitors through Girard's lens. Maps the converged desire zones. Finds the open territory. Produces strategic blueprints for claiming it."

"For some of you this will be a $12,000 insight. For some it'll be a pivot. For some it'll confirm what you already sensed — but now you'll have the data."

"Let me show you how to install it, and then we'll open up for questions."

— Thank them — open Q&A —`);
}

// ═══════════════════════════════════════════════════════════════════════════
// BUILD
// ═══════════════════════════════════════════════════════════════════════════
pres.writeFile({ fileName: OUTPUT })
  .then(() => console.log("✅  Built:", OUTPUT))
  .catch(err => { console.error("❌  Error:", err); process.exit(1); });
