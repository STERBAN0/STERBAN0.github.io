#!/usr/bin/env node
/* Generates tailored, ATS-friendly PDF résumés from the shared site data
   (site-data.js) plus the résumé-specific content below (summaries, bullet
   phrasing, and per-variant project/skill selection -- these use a résumé
   register, not the site's marketing-voice copy). Single source of truth
   for facts/metrics; run with `npm run resumes`. */
"use strict";
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const { PROJECTS, EXPERIENCE, EDUCATION, SKILLS } = require("../site-data.js");

const NAME = "Rakan Eyad";
const CONTACT = "rakan132546@gmail.com  ·  github.com/STERBAN0  ·  linkedin.com/in/rakan-abdulla";
const OUT_DIR = path.join(__dirname, "..", "resumes");

/* Résumé-register bullets per project, grounded in the same facts/metrics
   as site-data.js's PROJECTS.desc, but written as concise action-verb
   bullets rather than narrative prose. */
const PROJECT_BULLETS = {
  conjure: [
    "Built a real-time computer-vision engine classifying 9 hand/face gestures via MediaPipe landmarks, rendering effects at 60 FPS with unit tests and CI.",
    "Profiled and optimized the render pipeline from 162 ms to 2.8 ms per frame (58x speed-up) through allocation discipline."
  ],
  sdk: [
    "Extracted the engine into a pip-installable SDK with an event-driven API, enabling downstream game, overlay, and hardware integrations.",
    "Designed two install tiers (numpy-only and full webcam) with deterministic, webcam-free tests."
  ],
  rover: [
    "Developed an Honours thesis on autonomous rover navigation, pairing an A* global planner with a deep-RL local policy trained in NVIDIA Isaac Sim on Mars terrain.",
    "Implemented a fast A* command term and terrain importer for hybrid planning; tuned SAC training configs and reward/termination logic across 1000s of parallel environments; built a custom evaluation pipeline."
  ],
  tradie: [
    "Designed and shipped a production micro-SaaS recovering missed calls for trades businesses via Twilio telephony and an AI (GPT-4o-mini) SMS conversation engine.",
    "Built multi-tenant infrastructure end-to-end: Next.js 15 + TypeScript, Supabase Postgres with row-level security, Redis-backed idempotency/rate limiting, and Stripe usage-based billing.",
    "Hardened the system solo with 276 CI tests, Playwright e2e coverage, a threat model, and incident runbooks."
  ],
  fund: [
    "Built a full-stack crowdfunding platform: a Flask REST API (JWT auth, role-based admin) and a React 19 + Vite frontend.",
    "Implemented an idempotent Stripe Elements payment flow end-to-end and resolved N+1 queries, upload validation, and CI across both stacks."
  ],
  tracking: [
    "Designed and built a self-contained laser targeting system that autonomously locks onto and tracks moving targets in real time.",
    "Tuned sensor calibration and signal filtering for precise, low-latency actuation; extended the system toward predictive targeting from target velocity and trajectory."
  ],
  fpga: [
    "Designed a Bluetooth-controlled assistive robot on an FPGA in Verilog, integrating multiple sensors into closed-loop control for autonomous operation."
  ],
  turtlebot: [
    "Programmed an autonomous TurtleBot in ROS2 to identify, count, and interact with items via QR codes, combining sensor fusion with path planning."
  ],
  ant61: [
    "Designed a prototype satellite-refuelling latch mechanism in Fusion360 for space-robotics company ANT61."
  ]
};

const PROFILES = [
  {
    file: "Rakan_Eyad_Resume.pdf",
    title: "Mechatronic Engineer",
    summary: "Mechatronic engineering graduate (Honours, University of Sydney) with 14 months of industry experience shipping a prototype control system, plus two production web applications built solo. Works across the full stack: hardware, firmware, control systems, and modern AI/software tooling.",
    projectKeys: ["conjure", "rover", "tradie", "fund"],
    skillGroups: ["embedded", "robotics", "control", "ai", "software"]
  },
  {
    file: "Rakan_Eyad_Resume_Hardware.pdf",
    title: "Robotics & Embedded Systems Engineer",
    summary: "Mechatronic engineering graduate with hands-on experience across robotics, embedded systems, and control theory: from an FPGA-driven assistive robot and a ROS2 TurtleBot, to a self-built closed-loop tracking system, to migrating an industry prototype's architecture onto a Raspberry Pi.",
    projectKeys: ["tracking", "fpga", "turtlebot", "rover"],
    skillGroups: ["embedded", "robotics", "control"]
  },
  {
    file: "Rakan_Eyad_Resume_AI.pdf",
    title: "AI / Autonomy Engineer",
    summary: "Mechatronic engineering graduate specialising in reinforcement learning, computer vision, and applied AI: training RL agents in NVIDIA Isaac Sim for planetary-rover navigation, building real-time computer vision pipelines, and shipping an LLM-powered conversation engine into production.",
    projectKeys: ["rover", "conjure", "tradie", "sdk"],
    skillGroups: ["ai", "software"]
  },
  {
    file: "Rakan_Eyad_Resume_Software.pdf",
    title: "Software Engineer",
    summary: "Mechatronic engineering graduate with full-stack software engineering experience: a production micro-SaaS with telephony, AI, and billing; a full-stack payments platform; and an open-source Python engine profiled to a 58x speed-up and shipped as an installable SDK.",
    projectKeys: ["tradie", "fund", "conjure", "sdk"],
    skillGroups: ["software", "transfer"]
  }
];

const PAGE_MARGIN = 46;
const RULE_COLOR = "#999999";
const DIM_COLOR = "#444444";

function bulletLine(doc, str) {
  const startX = doc.page.margins.left;
  const bulletW = 12;
  const textX = startX + bulletW;
  const textWidth = doc.page.width - doc.page.margins.right - textX;
  const y = doc.y;
  doc.text("-", startX, y, { width: bulletW });
  doc.text(str, textX, y, { width: textWidth });
  doc.moveDown(0.15);
}

function sectionHeader(doc, label) {
  doc.moveDown(0.4);
  doc
    .font("Helvetica-Bold")
    .fontSize(11.5)
    .fillColor("#000000")
    .text(label.toUpperCase(), { characterSpacing: 0.6 });
  const y = doc.y + 1;
  doc
    .moveTo(doc.page.margins.left, y)
    .lineTo(doc.page.width - doc.page.margins.right, y)
    .strokeColor(RULE_COLOR)
    .lineWidth(0.75)
    .stroke();
  doc.moveDown(0.35);
}

function renderResume(profile) {
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: PAGE_MARGIN, bottom: PAGE_MARGIN, left: PAGE_MARGIN, right: PAGE_MARGIN }
  });
  const outPath = path.join(OUT_DIR, profile.file);
  doc.pipe(fs.createWriteStream(outPath));

  doc.font("Helvetica-Bold").fontSize(20).fillColor("#000000").text(NAME);
  doc.font("Helvetica").fontSize(12).fillColor(DIM_COLOR).text(profile.title);
  doc.moveDown(0.2);
  doc.font("Helvetica").fontSize(9.5).fillColor(DIM_COLOR).text(CONTACT);

  sectionHeader(doc, "Summary");
  doc.font("Helvetica").fontSize(10).fillColor("#000000").text(profile.summary, {
    width: doc.page.width - doc.page.margins.left - doc.page.margins.right
  });

  sectionHeader(doc, "Experience");
  EXPERIENCE.forEach((x, i) => {
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#000000").text(`${x.role} — ${x.org}`, { continued: true });
    doc.font("Helvetica").fontSize(9.5).fillColor(DIM_COLOR).text(`   ${x.when}`, { align: "left" });
    doc.moveDown(0.1);
    doc.font("Helvetica").fontSize(10).fillColor("#000000");
    bulletLine(doc, x.body);
    if (i < EXPERIENCE.length - 1) doc.moveDown(0.1);
  });

  sectionHeader(doc, "Featured Projects");
  profile.projectKeys.forEach((key, i) => {
    const p = PROJECTS[key];
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#000000").text(`${p.title}`, { continued: true });
    doc.font("Helvetica").fontSize(9.5).fillColor(DIM_COLOR).text(`  —  ${p.kind}`);
    doc.moveDown(0.1);
    doc.font("Helvetica").fontSize(10).fillColor("#000000");
    (PROJECT_BULLETS[key] || []).forEach(b => bulletLine(doc, b));
    if (i < profile.projectKeys.length - 1) doc.moveDown(0.1);
  });

  sectionHeader(doc, "Skills");
  profile.skillGroups.forEach(gid => {
    const g = SKILLS.find(s => s.id === gid);
    if (!g) return;
    doc.font("Helvetica-Bold").fontSize(10).fillColor("#000000").text(`${g.title}: `, { continued: true });
    doc.font("Helvetica").fontSize(10).fillColor("#000000").text(g.items.join(", "));
    doc.moveDown(0.12);
  });

  sectionHeader(doc, "Education");
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#000000").text(EDUCATION.degree);
  doc.font("Helvetica").fontSize(10).fillColor("#000000").text(`${EDUCATION.school} · ${EDUCATION.when}`);
  doc.font("Helvetica").fontSize(9.5).fillColor(DIM_COLOR).text(EDUCATION.detail);

  doc.end();
  return outPath;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const written = PROFILES.map(renderResume);
written.forEach(p => console.log("wrote", path.relative(process.cwd(), p)));
