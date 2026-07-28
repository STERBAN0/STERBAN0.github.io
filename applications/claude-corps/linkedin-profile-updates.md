# LinkedIn profile updates (linkedin.com/in/rakan-abdulla)

Reviewers open your LinkedIn within a minute of reading the application. Make it agree with your resume and portfolio, and make the fellowship-relevant signal visible without scrolling.

**Profile audited 12 Jul 2026 (live, in-browser).** What the audit found:

| Section | Current state | Action |
|---|---|---|
| Headline | Robotics/embedded only, no Tradie Texts, ~150 of 220 chars used | Replace (Section 1) |
| About | **Missing entirely** | Add (Section 2) |
| Featured | **Missing entirely** | Add after posting (Section 3) |
| Projects | **Empty** ("Nothing to see for now") | Add 2 projects (Section 4) |
| Licenses & certifications | ✅ Done — AI Fluency, Claude 101, Claude Code 101, all with credential IDs | Nothing |
| Experience | ALBON only, dated **Dec 2024 – Dec 2025** | Fix dates + optionally add Tradie Texts (Section 5) |
| Education | USyd BE Mechatronics 2022 – Jun 2026 | Add Honours + EWAM detail (Section 6) |
| Skills | 25 listed | Optional top-up (Section 6) |

## 1. Headline — use the full 220 characters

Your instinct was right: the earlier suggestion (~140 chars) read smaller than your current headline because it threw away the robotics/embedded keywords recruiters search for. Don't trade signal, add to it. LinkedIn gives you 220 characters; the current headline uses ~150.

Paste this (200 chars — verified against the limit):

> Mechatronic Engineer (Honours, USyd 2026) | Building Tradie Texts: AI missed-call recovery for trades, live in production | RL · Computer Vision · LLMs · Full-Stack | Embedded C/C++ · ROS2 · Isaac Sim

Why this shape: the first segment says who you are, the second is the one thing Claude Corps reviewers must see (you shipped an AI product to production), the third covers AI-role keywords, the fourth keeps every robotics keyword from your current headline. Nothing lost, Tradie Texts gained.

Note it drops "Graduate": "Mechatronic Engineer (Honours, USyd 2026)" says the same thing with more authority, and matches the portfolio masthead.

**Exact steps:**
1. Go to linkedin.com/in/rakan-abdulla and click the pencil icon on the top card (right of your banner photo).
2. In the "Headline" field, select all and paste the line above.
3. Click Save.
4. Check it renders fully on your public profile (log-out view or incognito): linkedin.com/in/rakan-abdulla

## 2. About section — add one (currently missing)

This is the biggest gap the audit found. A reviewer who opens your profile sees a headline, then promos, then posts. There is no paragraph anywhere that says what you do. The plan previously missed this.

Paste this (fits well inside the 2,600-char limit; edit anything that doesn't sound like you):

> I build electromechanical systems end to end: the board, the firmware, the control loop, and increasingly the AI on top.
>
> Right now that means Tradie Texts, a missed-call recovery service for trades businesses that I designed, built, and hardened solo. Twilio catches the call a tradie can't answer, an AI SMS conversation qualifies the lead (with moderation and emergency detection), and a scored lead lands on a realtime dashboard. It's live in production and piloting with first users: 276 tests in CI, row-level security for tenant isolation, a threat model, and incident runbooks.
>
> Before that: an Honours thesis coupling an A* global planner to a PPO local policy across 64 parallel simulated Mars rovers in NVIDIA Isaac Sim (99.5% vs 79.5% success at the 10 m training distance; 90% vs 2% at 50 m), built on the open-source RLRoverLab. Fourteen months at ALBON integrating a prototype control system. Real-time computer vision at 60 FPS (Conjure). A client crowdfunding platform, and a satellite-refuelling latch designed in Fusion360 and presented to space-robotics company ANT61 at a two-day hackathon.
>
> I work AI-natively: my repos ship with CI, deterministic tests, and CLAUDE.md context files.
>
> Portfolio: https://sterban0.github.io · GitHub: https://github.com/STERBAN0 · rakan132546@gmail.com

**Exact steps:**
1. On your profile, click **Add profile section** (button under your headline).
2. Under **Core**, click **Add about**.
3. Paste the text, Save.

## 3. Featured section — create it (currently missing)

Do this AFTER posting the Tradie Texts coming-soon post (`linkedin-tradie-text-post.md`), because that post is item #1.

Pin, in order:
1. The Tradie Texts "coming soon" post
2. Portfolio link: https://sterban0.github.io (title it "Portfolio — sterban0.github.io")
3. Your thesis post (already up, 51 reactions)

**Exact steps:**
1. Publish the Tradie Texts post first.
2. On the published post, click the **⋯** menu (top right of the post) → **Feature on top of profile**. This also creates the Featured section if it doesn't exist.
3. On your profile, scroll to the new **Featured** section → click **+** → **Add a link** → paste `https://sterban0.github.io` → Save.
4. Find your thesis post (Activity → Posts, 3 weeks back) → **⋯** → **Feature on top of profile**.
5. To reorder: Featured section → pencil icon → drag so Tradie Texts is first.

## 4. Projects section — add BOTH projects (section is empty)

The audit found the Projects section completely empty, so the thesis entry the plan wanted to "update with real numbers" doesn't exist. Create both entries fresh.

**Exact steps (first project):**
1. Profile → **Add profile section** → **Additional** → **Add projects**.
2. Fill in as below, Save, then click **+** on the Projects section to add the second.

**Project 1 — Tradie Texts**
- Project name: `Tradie Texts — AI missed-call recovery for trades businesses`
- Description:
  > Solo-built micro-SaaS, live in production and piloting with first users. Twilio catches the missed call, an AI SMS conversation qualifies the lead (moderation + emergency detection), and a scored lead lands on a realtime dashboard. Next.js 15, TypeScript, Supabase Postgres with row-level security, Redis idempotency and rate limiting, Stripe usage-based billing. 276 tests in CI, Playwright e2e, threat model, incident runbooks.
- Skills: add Next.js, TypeScript, PostgreSQL, Stripe, LLM Integration (or closest available)
- Media: upload `applications/claude-corps/linkedin-post-images/hero-with-nav.png`
- Dates: start when you started building; tick "I am currently working on this project"

**Project 2 — Planetary Rover RL Navigation (Honours thesis)**
- Project name: `Reinforcement Learning for Planetary Rover Navigation — Honours thesis`
- Description:
  > A* global planner coupled to a PPO local policy in NVIDIA Isaac Sim, trained across 64 parallel rovers on Martian terrain. The hybrid reached 99.5% success at the 10 m training distance vs 79.5% for standalone PPO, and 90% vs 2% at 50 m. Graded 78/100 (Distinction). Built on the open-source RLRoverLab (Mortensen & Bøgh, iSpaRo 2024).
- Link: `https://github.com/STERBAN0/RL_for_Rover_Nav_Thesis`
- Skills: Reinforcement Learning, PyTorch, NVIDIA Isaac Sim

Do NOT use any "SAC" or "1000s of environments" phrasing anywhere on LinkedIn. The thesis says PPO and 64 rovers; the portfolio and resume now say the same. Crediting RLRoverLab is deliberate: reviewers check, and honesty is one of your cards.

## 5. Experience — fix ALBON dates (+ optional Tradie Texts entry)

**Date mismatch found:** LinkedIn says ALBON `Dec 2024 – Dec 2025`. Your portfolio and resume say `Nov 2024 – Jan 2026`. A reviewer cross-checking will notice. Set LinkedIn to whichever is actually true and make the other two match.

Steps: Experience section → pencil → pencil on the ALBON entry → fix start/end dates → Save.

**Optional but strong:** add Tradie Texts as an Experience entry (Title: `Founder / Engineer`, Company: `Tradie Texts`, type: Self-employed, tick "I am currently working in this role"). Experience sits high on the profile; Projects sits near the bottom. This is standard practice for a live product and makes your top card read "ALBON + Tradie Texts" instead of internship-only. Reuse the Project description, shortened.

## 6. Small stuff (10 minutes)

- **Education:** pencil-edit the USyd entry → Degree field: add Honours so it reads `Bachelor of Engineering (Honours) - Mechatronics Engineering`. In Grade or Description: `EWAM 76% — Distinction`. End date already says 2026 ✓.
- **Skills top-up:** the 25 skills skew hardware. Add: Next.js, Supabase, Reinforcement Learning, Computer Vision, LLM Integration if missing (Skills section → **+**).
- **Certifications:** ✅ already done, all three Anthropic certs live with credential links. Nothing to do.
- **Email:** Contact info → verify rakan132546@gmail.com is shown (not the uni address).
- **Name check:** LinkedIn says "Rakan Abdulla", portfolio and resume say "Rakan Eyad". If both names are yours, fine, but reviewers cross-reference: consider adding the other name in one place (e.g. LinkedIn "Additional name" field) so the trail connects.
- **FUN.D:** client approved the build-focused post on 13 Jul (stack + engineering only; no business numbers, launch details, name, or link). Draft in `linkedin-fund-post.md` — post midweek. Credit Karim Tuikin (two-person build, Rakan led).

## Recommended order of operations

1. Headline (2 min)
2. About (3 min)
3. ALBON dates + Education Honours (3 min)
4. Projects, both entries (10 min)
5. Publish Tradie Texts post → build Featured section (5 min)
6. Skills top-up + consistency sweep (5 min)
7. View your profile logged out and confirm: headline → About → Featured → Experience all tell the same story as the resume.
