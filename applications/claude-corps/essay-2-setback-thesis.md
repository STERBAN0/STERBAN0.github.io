# Essay 2 — Setback / mistake (limit: 350 words)

> Prompt: "Share a setback or mistake and what you learned from it."
> Every fact below is documented in your thesis log books and final thesis.

My Honours thesis needed NVIDIA Isaac Sim on a cloud GPU. In February 2026, at the start of my final semester, AWS made me apply for a quota increase and left me waiting on customer service with no timeline. My laptop couldn't run Isaac Sim. I had a thesis on reinforcement learning for planetary rovers and no way to train a rover.

My first reaction was that the project was stalled until the infrastructure arrived. That framing was the real mistake. After days of refreshing the support ticket, I decided that if I couldn't run the real experiment, I could run a small one. I built a three-level PyBullet environment on my own machine and trained there. Each run took half a day, two runs a day, so every change had to count.

That side project punished me within a week. I kept adding terms to the reward function, and the rover kept exploiting them instead of navigating, farming reward instead of reaching the goal. The fix embarrassed me: revert to the simple reward and train longer. Level two went from failing to a 70% success rate without a single clever term.

When the quota cleared in March, I arrived at Isaac Sim already knowing how reward shaping fails. The "placeholder" PyBullet work ended up inside the thesis as a cross-simulator check on my results. The wall moved again in April: SAC and TD3 needed a 40 GB replay buffer my server couldn't hold. This time I didn't stall. I documented the constraint and built the study around PPO. The final system, an A* planner guiding a PPO policy, reached 99.5% success at the training distance and 90% at five times that range, and the thesis graded 78/100, a Distinction.

What I learned: blocked is a state of the infrastructure, not of the project. If I can't run, I can walk; if I can't walk, I can crawl toward the goal. The crawling taught me things the running would have hidden.

---

**Notes:**
- This is ~330 words as written; verify the count in the form's counter.
- Fact-checked against your log books: quota wait (16 Feb entry), PyBullet 3 levels + half-day runs (16 Feb), simple-reward fix + 70% level two (13 Mar), quota approved (2 Mar), SAC/TD3 40 GB VRAM wall (17 Apr), PPO decision (17 Apr), 99.5%/90% and 78/100 (thesis abstract + your note).
- "Farming reward" describes your reward-hacking answer. If the exploit had a specific funny shape (spinning in circles, camping the spawn), name it: those details read as lived experience.
