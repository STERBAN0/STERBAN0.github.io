# Essay 1 — Community impact (limit: 350 words)

> Prompt: "Describe something you did that made a real difference for a community you're part of — problem, solution, and motivation."

A tradie under a sink or up a ladder cannot answer their phone. The customer calling doesn't wait. They ring the next plumber on Google, and the job is gone. For a one-person trades business a few of those a week is real money, and the tradies I know in Sydney lose them every week. They can't afford a receptionist, and voicemail is where callers go to hang up.

I built Tradie Texts to close that gap. When a call gets missed, Twilio catches it and texts the caller back within seconds. An AI conversation then qualifies the lead over SMS: what the job is, where, how urgent. The result lands on the tradie's dashboard, scored, so when they climb down the ladder they see "blocked drain, wants a quote this week" instead of a missed-call notification.

Building for this community shaped every technical decision. Moderation and emergency detection came first, because a caller with a pipe flooding the house should not chat with a bot; the system detects urgency and escalates. The dashboard had to be readable at a glance on a phone in a work van. I built and hardened it alone: 276 tests in CI, a threat model, incident runbooks, and multi-tenant data isolation, because a small business trusting me with their phone line deserves the same engineering a big one gets.

Tradie Texts is in production and piloting with its first trades businesses. I'm honest about that stage: the difference so far is first users onboarded, not a number I could inflate. The motivation is the same one that made me build it. The people who most need this technology are the least able to buy it. A plumber will never hire a developer or evaluate an LLM vendor. Someone has to sit with them, understand how their day works, and build the thing that fits it. Doing that for one community showed me I want to keep doing it for others.

---

**Personalize before submitting (makes it stronger, only if true):**
- If a specific tradie (family member, mate, first pilot user) sparked the idea, name the relationship in paragraph 1 ("my uncle the electrician...").
- If a pilot user has said anything about it or you've caught real missed calls, add one concrete detail to the second-to-last paragraph.
- Swap "blocked drain" for a real example from your pilot if you have one.
