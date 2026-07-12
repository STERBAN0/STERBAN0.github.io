#!/usr/bin/env node
/* Generates tailored, ATS-friendly PDF resumes from the shared site data
   (site-data.js) plus the resume-specific content below (summaries, bullet
   phrasing, and per-variant project/skill selection -- these use a resume
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

/* Resume-register bullets per project, grounded in the same facts/metrics
   as site-data.js's PROJECTS.desc, but written as concise action-verb
   bullets rather than narrative prose. */
const PROJECT_BULLETS = {
  conjure: [
    "Built a real-time computer-vision engine classifying 9 hand/face gestures via MediaPipe landmarks, rendering effects at 60 FPS with unit tests and CI.",
    "Profiled and optimized the render pipeline from 162 ms to 2.8 ms per frame (58x speed-up) through allocation discipline."
  ],
  sdk: [
    "Extracted the engine into a pip-installable SDK with an event-driven API for driving games, overlays, or hardware from gesture events.",
    "Designed two install tiers (numpy-only and full webcam) with deterministic, webcam-free tests."
  ],
  rover: [
    "Developed an Honours thesis (78/100, Distinction) on autonomous rover navigation: an A* global planner coupled to a PPO local policy, trained in NVIDIA Isaac Sim with 64 parallel rovers on Martian terrain.",
    "Hybrid achieved 99.5% success at 10 m (vs 79.5% standalone-PPO) and 90% vs 2% at 50 m; built the A* command term, terrain importer, reward tuning, and a custom evaluation pipeline."
  ],
  tradie: [
    "Built a production micro-SaaS that recovers missed calls for trades businesses using Twilio telephony and a GPT-4o-mini SMS conversation engine.",
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
    summary: "Mechatronic engineering graduate (Honours, University of Sydney) with 14 months of industry experience on a prototype control system, plus two production web applications built solo.",
    projectKeys: ["conjure", "rover", "tradie", "fund"],
    skillGroups: ["embedded", "robotics", "control", "ai", "software"]
  },
  {
    file: "Rakan_Eyad_Resume_Hardware.pdf",
    title: "Robotics & Embedded Systems Engineer",
    summary: "Mechatronic engineering graduate with hands-on experience in robotics, embedded systems, and control. Built an FPGA-driven assistive robot, programmed a ROS2 TurtleBot, built a self-contained laser tracking system, and migrated an industrial prototype from a microcontroller to a Raspberry Pi.",
    projectKeys: ["tracking", "fpga", "turtlebot", "rover"],
    skillGroups: ["embedded", "robotics", "control"]
  },
  {
    file: "Rakan_Eyad_Resume_AI_Software.pdf",
    title: "AI & Software Engineer",
    summary: "Mechatronic engineering graduate with software engineering and applied AI experience. Trained reinforcement-learning agents in NVIDIA Isaac Sim for planetary rover navigation, built a real-time computer vision engine and shipped it as an installable SDK, and built a production micro-SaaS with an LLM-based conversation engine, telephony, and billing.",
    projectKeys: ["rover", "conjure", "tradie", "sdk", "fund"],
    skillGroups: ["ai", "software", "transfer"]
  },
  {
    file: "Rakan_Eyad_Resume_Claude_Corps.pdf",
    title: "AI & Full-Stack Engineer",
    summary: "Mechatronic engineering graduate (Honours, University of Sydney) who builds end-to-end and ships solo: Tradie Texts, a production missed-call recovery SaaS for trades businesses (LLM conversation engine, telephony, billing), now piloting with first users; an open-source real-time computer-vision engine and SDK; and an Honours thesis training RL agents in NVIDIA Isaac Sim. Works AI-natively: repos ship with CLAUDE.md context files, CI, and deterministic tests. Completed Anthropic's AI Fluency and Claude 101 courses.",
    projectKeys: ["tradie", "conjure", "fund", "rover"],
    skillGroups: ["ai", "software", "transfer"]
  }
];

const PAGE_MARGIN = 46;
const ACCENT_COLOR = "#1F4E79";
const TEXT_COLOR = "#1A1A1A";
const DIM_COLOR = "#444444";

/* Bullet lines position text at an explicit x, which leaves pdfkit's
   internal cursor (doc.x) sitting at that indent -- reset it afterward so
   the next default-flow text() call (e.g. the following entry's title)
   starts back at the page margin instead of inheriting the indent. */
function bulletLine(doc, str) {
  const startX = doc.page.margins.left;
  const bulletW = 12;
  const textX = startX + bulletW;
  const textWidth = doc.page.width - doc.page.margins.right - textX;
  const y = doc.y;
  doc.text("•", startX, y, { width: bulletW });
  doc.text(str, textX, y, { width: textWidth });
  doc.x = startX;
  doc.moveDown(0.1);
}

function sectionHeader(doc, label) {
  doc.moveDown(0.35);
  doc.x = doc.page.margins.left;
  doc.font("Helvetica-Bold").fontSize(12.5).fillColor(ACCENT_COLOR).text(label);
  doc.moveDown(0.18);
}

function renderResume(profile) {
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: PAGE_MARGIN, bottom: PAGE_MARGIN, left: PAGE_MARGIN, right: PAGE_MARGIN }
  });
  const outPath = path.join(OUT_DIR, profile.file);
  doc.pipe(fs.createWriteStream(outPath));

  doc.font("Helvetica-Bold").fontSize(22).fillColor(ACCENT_COLOR).text(NAME, { align: "center" });
  doc.moveDown(0.2);
  doc
    .moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
    .strokeColor(ACCENT_COLOR)
    .lineWidth(1.3)
    .stroke();
  doc.moveDown(0.22);
  doc.font("Helvetica").fontSize(11).fillColor(TEXT_COLOR).text(profile.title, { align: "center" });
  doc.moveDown(0.1);
  doc.font("Helvetica").fontSize(9.5).fillColor(DIM_COLOR).text(CONTACT, { align: "center" });
  doc.x = doc.page.margins.left;

  sectionHeader(doc, "Summary");
  doc.font("Helvetica").fontSize(10).fillColor(TEXT_COLOR).text(profile.summary, {
    width: doc.page.width - doc.page.margins.left - doc.page.margins.right
  });

  sectionHeader(doc, "Experience");
  EXPERIENCE.forEach((x, i) => {
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(TEXT_COLOR).text(`${x.role} — ${x.org}`, { continued: true });
    doc.font("Helvetica").fontSize(9.5).fillColor(DIM_COLOR).text(`   ${x.when}`);
    doc.moveDown(0.1);
    doc.font("Helvetica").fontSize(10).fillColor(TEXT_COLOR);
    bulletLine(doc, x.body);
    if (i < EXPERIENCE.length - 1) doc.moveDown(0.1);
  });

  sectionHeader(doc, "Featured Projects");
  profile.projectKeys.forEach((key, i) => {
    const p = PROJECTS[key];
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(TEXT_COLOR).text(`${p.title}`, { continued: true, underline: true });
    doc.font("Helvetica").fontSize(9.5).fillColor(DIM_COLOR).text(`  —  ${p.kind}`);
    doc.moveDown(0.1);
    doc.font("Helvetica").fontSize(10).fillColor(TEXT_COLOR);
    (PROJECT_BULLETS[key] || []).forEach(b => bulletLine(doc, b));
    if (i < profile.projectKeys.length - 1) doc.moveDown(0.1);
  });

  sectionHeader(doc, "Skills");
  profile.skillGroups.forEach(gid => {
    const g = SKILLS.find(s => s.id === gid);
    if (!g) return;
    doc.font("Helvetica-Bold").fontSize(10).fillColor(TEXT_COLOR).text(`${g.title}: `, { continued: true });
    doc.font("Helvetica").fontSize(10).fillColor(TEXT_COLOR).text(g.items.join(", "));
    doc.moveDown(0.12);
  });

  sectionHeader(doc, "Education");
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(TEXT_COLOR).text(EDUCATION.degree);
  doc.font("Helvetica").fontSize(10).fillColor(TEXT_COLOR).text(`${EDUCATION.school} · ${EDUCATION.when}`);
  doc.font("Helvetica").fontSize(9.5).fillColor(DIM_COLOR).text(EDUCATION.detail);

  doc.end();
  return outPath;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const written = PROFILES.map(renderResume);
written.forEach(p => console.log("wrote", path.relative(process.cwd(), p)));
