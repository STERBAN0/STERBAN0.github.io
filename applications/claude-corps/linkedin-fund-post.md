# LinkedIn post — FUN.D (client-approved 13 Jul 2026)

> Client approved: post about the build itself (stack + engineering). No business numbers,
> no launch details, no final name, no site link. "FUN.D" working title is fine (already
> public on the portfolio).
> Post midweek (Wed/Thu morning AEST), a few days after the Tradie Texts post.
> Both @mentions must be picked from the dropdown to become real tags.

---

A client asked for a crowdfunding platform. @Karim Tuikin and I built them the whole thing; I led the engineering.

Users create campaigns, other users fund them, admins moderate. Flask REST API with JWT auth and role-based admin, React 19 + Vite on the front, Supabase Postgres underneath, Stripe moving real money in the middle.

Making it work in a demo was the easy half. Making it ready for strangers' money looked like this:

• A payment flow that survives a double-click: create → confirm → credit, idempotent at every step
• Image uploads validated by magic bytes, because file extensions lie
• N+1 queries found and batched
• Proper database migrations instead of hand-edited schemas
• CI on both halves of the stack: pytest for the API, Vitest for the frontend

There's no AI in this one, on purpose. A CRUD-plus-payments product wants boring, proven tools, and knowing when that's true is part of the job.

The product belongs to the client, so no name or link yet. It's listed as FUN.D on my portfolio, and I'll share the real thing when they ship.

#softwareengineering #fullstack #webdevelopment #buildinpublic

---

**Options:**
- Image: none required. If you want one, a blurred/cropped screenshot with the URL bar cut off — nothing that identifies the client or the Vercel URL.
- Portfolio link goes in the first comment, not the post body.
- Before posting: confirm the Vercel deployment is behind Vercel Authentication so the URL can't be found or accessed.
