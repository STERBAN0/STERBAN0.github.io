# Claude Corps Fellow — application status

> **SUBMITTED — before the 17 July 2026 deadline.** Confirmed by Rakan 27 July 2026.
> Phone number, `Rakan_Eyad_Resume_Claude_Corps.pdf`, and the merged `Certificates.pdf`
> all went in with the form. Both certificates are also on his LinkedIn profile, and the
> Tradie Texts and crowdfunding-build posts are published.
>
> Everything below the "Form status" section is now **interview prep**, not pre-submit work.

**Posting:** https://job-boards.greenhouse.io/claudecorps/jobs/4250200009
**Program:** CodePath × Anthropic. $85k + benefits, 1 year, in-person at a host org in the US, cohort starts 19 Oct 2026.
**Next stages:** take-home assessment → 25-min conversation → Super Day.

## Eligibility (all confirmed ✓)

- [x] Under 2 years full-time professional experience
- [x] U.S. work authorization, no sponsorship needed
- [x] AI Fluency certificate
- [x] Claude 101 certificate
- [x] 18+ by 19 Oct 2026
- [x] Built something end-to-end solo (Tradie Texts)
- [x] Willing to relocate + commit 1 year

## What was submitted (for reference in later stages)

Name (Rakan Abdulla / preferred Rakan), email, country +61, location Sydney NSW, education Bachelor's, phone, LinkedIn, portfolio+GitHub, work auth **Yes**, sponsorship **No**, <2yrs **Yes**, full-time **Yes**, relocate **Yes**, 18+ **Yes**, both courses **Yes**, start date "October 19, 2026", both essays, language checkboxes (Python/JS-TS/SQL/HTML-CSS), built-things checkboxes (6), optional link → Conjure repo, resume `Rakan_Eyad_Resume_Claude_Corps.pdf`, certificates `Certificates.pdf` (Claude 101 + AI Fluency, merged).

Keep the essays (`essay-1-community-tradie-text.md`, `essay-2-setback-thesis.md`) handy — interviewers work from what you wrote, so re-read them before any call rather than improvising a different version of the same story.

## Supporting work — done

- [x] Tradie Texts post published on LinkedIn (`linkedin-tradie-text-post.md`)
- [x] Crowdfunding build post published (`linkedin-fund-post.md`) — build-focused per client constraints
- [x] Both certificates on the LinkedIn profile
- [x] Client permission message sent (`fund-client-permission-message.md`)

## Your strongest cards (use in every stage)

1. **Tradie Texts = the fellowship in miniature.** They want someone who scopes a real org's problem, builds an AI solution non-technical people use, and hardens it responsibly. You did that solo for trades businesses: discovery → LLM conversation engine with moderation/emergency escalation → production hardening (276 CI tests, RLS, threat model, runbooks) → piloting with real users. Say this mapping out loud in interviews.
2. **Utility player, provably.** Same person shipped: firmware/FPGA, control systems, an RL thesis, computer vision, a production SaaS, and paid client work (FUN.D). The posting literally asks for "people who can build, teach, scope, and translate." **Say ANT61 accurately**: a two-day team hackathon where you designed a satellite-refuelling latch in Fusion360 and presented it to the company — not a client engagement.
3. **Honesty as a feature.** Thesis credits RLRoverLab. Portfolio says "piloting with first users," not "hundreds of customers." The must-have is "ability to discuss it honestly" — you can, with log books.
4. **AI-native workflow.** Repos ship CLAUDE.md context files; you build with Claude Code daily.

## Questions to have answers for (25-min conversation + Super Day)

- **"Tradie Texts uses GPT-4o-mini, not Claude — why?"** Honest answer: cost-per-message decision for an SMS product at build time; the architecture is provider-agnostic (moderation, structured extraction, cost telemetry are all yours); your development workflow is Claude Code end-to-end; swapping the model is a config change, and you'd reach for Claude for anything needing longer context or tool use. Do not dodge this one.
- **"Walk me through something you built end-to-end."** Tradie Texts, 3 minutes, problem-first: missed call = lost job → catch, converse, qualify, escalate → what hardening a solo production system taught you. Practice it timed.
- **"Tell me about teaching or translating for non-technical people."** Prepare 1–2 true stories: onboarding pilot tradies counts; explaining engineering decisions to the FUN.D client counts; ALBON cross-discipline work counts. Pick the ones with the most real detail.
- **"What would you do in your first month at a host org?"** Their own posting answers it: spend real time understanding what the org actually needs before building. Say how you'd do discovery (shadow people, map the workflow, find the missed-call-equivalent).
- **Setback question** — you have Essay 2 as a spoken story. Practice it without reading.

## Take-home assessment prep — this is the live next stage (~2 evenings)

The take-home will almost certainly be "build/scope something with Claude for a realistic org scenario."
- [ ] Build one small end-to-end thing with the Claude API so it's fresh when the brief lands: e.g. a triage bot that reads a nonprofit's contact-form emails, classifies + drafts replies, with an eval script. Tool use + structured output + a simple eval = exactly the fellowship's stack.
- [ ] Skim Anthropic's docs on tool use, prompt caching, and evals so vocabulary is current.
- [ ] Re-read your AI Fluency / Claude 101 notes; assessments often echo course framing.

## File map

| File | Purpose |
|---|---|
| `essay-1-community-tradie-text.md` | Essay 1 draft (~330 words) + personalization notes |
| `essay-2-setback-thesis.md` | Essay 2 draft (~330 words), fact-checked vs log books |
| `linkedin-tradie-text-post.md` | Coming-soon post, ready to paste |
| `linkedin-profile-updates.md` | Headline/Projects/certs updates |
| `fund-client-permission-message.md` | Client ask before any FUN.D publicity |
| `../../resumes/Rakan_Eyad_Resume_Claude_Corps.pdf` | Tailored resume — upload this one |
