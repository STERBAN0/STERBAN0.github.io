/* ---------- shared site data ----------
   Single source of truth for both the website (index.html, loaded as a
   plain <script> global) and the resume generator (scripts/generate-resumes.js,
   loaded via require()). Keep this file pure data -- no DOM, no rendering. */
(function(root, factory){
  const data = factory();
  if(typeof module !== "undefined" && module.exports){
    module.exports = data;
  } else {
    Object.assign(root, data);
  }
})(typeof window !== "undefined" ? window : globalThis, function(){

const MODES = {
  overview:{ n:"01", label:"Overview", eyebrow:"General configuration",
    headline:"One engineer. Six operating modes.",
    lede:"I build electromechanical systems end-to-end: the board, the firmware, the control loop, and increasingly the learning system on top. Mechatronic engineering graduate (Honours) from the University of Sydney, with 14 months in industry shipping a prototype control system and two production web apps (one solo, one a client build I led). Pick a mode above and the page re-configures for the role you're hiring for.",
    chips:["Hands-on builds","Embedded C/C++","Python / TS","ROS2","Isaac Sim / RL","Full-stack SaaS","Test-driven"],
    note:"Sorted by overall signal",
    order:["tradie","rover","conjure","tracking","sdk","fund","fpga","turtlebot","ant61"],
    skills:[]},
  robotics:{ n:"02", label:"Robotics", eyebrow:"Mode 02 — Robotics & mechatronics",
    headline:"Robots that hold up outside the lab.",
    lede:"From a ROS2 TurtleBot navigating by sensor fusion, to an FPGA-driven assistive robot, to a planetary rover learning to cross Mars terrain in simulation: I've built and programmed robotic platforms across the stack, and spent 14 months in industry integrating one into a working prototype.",
    chips:["ROS2","Sensor fusion","Path planning","Isaac Sim","Closed-loop control","CAD (Fusion/SW)"],
    note:"Sorted for robotics roles",
    order:["rover","turtlebot","tracking","fpga","conjure","ant61","sdk"],
    skills:["robotics"]},
  embedded:{ n:"03", label:"Embedded / Electronics", eyebrow:"Mode 03 — Embedded systems & electronics",
    headline:"From board bring-up to firmware that holds.",
    lede:"I'm comfortable at the bench: microcontrollers and FPGAs, sensor buses, power wiring, and the firmware that ties them together. At ALBON I moved a prototype's architecture from a microcontroller to a Raspberry Pi and built its electrical junction box. My own projects run C/C++, Verilog, and real-time pipelines on tight budgets.",
    chips:["C/C++","Arduino","FPGA / Verilog","Raspberry Pi","Sensor arrays","Power & wiring","Bench debugging"],
    note:"Sorted for embedded roles",
    order:["fpga","tracking","turtlebot","conjure","rover","sdk","ant61"],
    skills:["embedded"]},
  control:{ n:"04", label:"Control / GNC", eyebrow:"Mode 04 — Control systems & GNC",
    headline:"Loops closed. Targets tracked.",
    lede:"Control theory is where I started: a self-built laser rig that locks onto and tracks moving targets, filtering noisy signals into fast, precise actuation. I'm now extending it to predict where a target will be from its velocity and trajectory. My thesis pairs a classical global planner with a learned local policy, which is GNC thinking applied to modern tools.",
    chips:["Advanced control","Signal filtering","Sensor calibration","State estimation","A* + RL policy","MATLAB"],
    note:"Sorted for control & GNC roles",
    order:["tracking","rover","turtlebot","fpga","conjure","sdk","ant61"],
    skills:["control"]},
  ai:{ n:"05", label:"AI / Autonomy", eyebrow:"Mode 05 — AI, RL & autonomy",
    headline:"Learning systems, with an engineer's ground truth.",
    lede:"I train and evaluate reinforcement-learning agents in NVIDIA Isaac Sim for my thesis on planetary-rover navigation, and I build real-time computer vision that runs at 60 FPS on a webcam. I've also put an LLM into production: the Tradie Texts conversation engine qualifies real customer leads over SMS, with moderation, structured extraction, and cost telemetry. I come to AI from hardware, so I judge a policy by what it does on a physical system rather than by its reward curve. My repos ship with CI, deterministic tests, and CLAUDE.md context files: I work with agentic tools in the loop.",
    chips:["RL","Isaac Sim / Isaac Lab","PPO (skrl)","Computer vision","LLMs in production","Evaluation pipelines","AI-native workflow"],
    note:"Sorted for AI & autonomy roles",
    order:["rover","tradie","conjure","sdk","turtlebot","tracking","fpga"],
    skills:["ai"]},
  software:{ n:"06", label:"Software", eyebrow:"Mode 06 — Software engineering",
    headline:"Shipped code: tested, profiled, documented.",
    lede:"My best software is running in production. Tradie Texts recovers missed calls for trades businesses with telephony, an LLM conversation engine, and Stripe billing. Conjure's render path went from 162 ms to 2.8 ms a frame after profiling, then became a pip-installable SDK with an event API. FUN.D wires a real Stripe payment flow through a Flask + React stack. I profile before I optimise, test what's deterministic, and document what I build.",
    chips:["Python","TypeScript","React · Next.js","Flask","Postgres · Supabase","pytest · Vitest · CI","Performance profiling"],
    note:"Sorted for software roles",
    order:["tradie","conjure","sdk","fund","rover","turtlebot"],
    skills:["software"]}
};

const PROJECTS = {
  conjure:{
    title:"Conjure", kind:"Open source · Python",
    link:"https://github.com/STERBAN0/Conjure",
    desc:"A real-time engine that watches your hands and face through a webcam and fires anime-style abilities: nine gestures classified with temporal hysteresis, landmarks smoothed with One Euro filters, effects rendered at 60 FPS in a modular pipeline with unit tests and CI.",
    metrics:[["60","FPS pipeline"],["58×","render speed-up"],["9","gesture abilities"]],
    tags:"MediaPipe · OpenCV · pygame · pytest",
    notes:{
      overview:"<b>Breadth in one build:</b> vision, signal processing, state machines, and performance work in one shipped project.",
      robotics:"<b>Robotics:</b> the perception → classification → action pipeline of a robot stack (tracker, gesture engine, router, actuator), under real-time constraints.",
      embedded:"<b>Embedded:</b> a hard real-time budget on commodity hardware. The 58× speed-up came from allocation discipline, the same instinct firmware demands.",
      control:"<b>Control:</b> two-stage One Euro + EMA filtering with hysteresis thresholds — classical signal conditioning that keeps a noisy 60 Hz loop stable.",
      ai:"<b>AI:</b> production computer vision. MediaPipe landmark models wrapped in a tested inference pipeline that degrades gracefully.",
      software:"<b>Software:</b> profiled a 162 ms/frame render path down to 2.8 ms (58×), verified with a headless smoke-test suite. CI, docs, and a contributor guide included."
    }},
  sdk:{
    title:"Conjure SDK", kind:"Open source · Python",
    link:"https://github.com/STERBAN0/conjure-sdk",
    desc:"The Conjure engine extracted into a pip-installable SDK: rendering stripped out, an event-driven API in its place, so anyone can drive a game, stream overlay, or hardware trigger from gestures. Two install tiers (numpy-only or full webcam), webcam-free deterministic tests.",
    metrics:[["2","install tiers"],["6","lifecycle events"],["0","renderer imports"]],
    tags:"API design · packaging · event systems",
    notes:{
      overview:"<b>Architecture signal:</b> turning a working app into a clean, documented library is a different skill from writing the app.",
      robotics:"<b>Robotics:</b> the event API (`ability_release` → your code) is exactly how gesture input would drive a physical actuator or robot behaviour.",
      embedded:"<b>Embedded:</b> the pure tier needs only numpy — the separation you'd want to port the engine's logic to constrained targets.",
      control:"<b>Control:</b> exposes the continuous signal layer (span, expansion, motion energy) directly, a clean sensor-signal interface for downstream loops.",
      ai:"<b>AI:</b> an ML system packaged for reuse. Model download scripts, graceful degradation without the face model, deterministic tests around stochastic input.",
      software:"<b>Software:</b> one-directional data flow, no renderer imports in the engine, semantic events over polling. Deliberate API design, documented."
    }},
  rover:{
    title:"Planetary Rover RL Navigation", kind:"Thesis · Isaac Sim",
    link:"https://github.com/STERBAN0/RL_for_Rover_Nav_Thesis",
    desc:"Honours thesis (graded 78/100, Distinction): autonomous navigation for a planetary rover, coupling an A* global planner to a PPO local policy through a pure-pursuit waypoint interface, trained in NVIDIA Isaac Sim with 64 parallel rovers on Martian terrain. The hybrid reached 99.5% success at the 10 m training distance against a standalone PPO baseline's 79.5%, and held 90% at 50 m where the standalone collapsed to 2%. My contributions: the fast A* command term and terrain importer for hybrid planning, matched skrl configs (PPO/SAC/TD3), reward/termination tuning, and a custom evaluation pipeline.<span class='credit'>Built on RLRoverLab (Mortensen &amp; Bøgh, iSpaRo 2024) — extending a large existing research codebase rather than a toy repo.</span>",
    metrics:[["99.5%","success @ 10 m (vs 79.5%)"],["90%","success @ 50 m (vs 2%)"],["64","parallel rovers"]],
    tags:"Isaac Sim · Isaac Lab · skrl · PyTorch",
    notes:{
      overview:"<b>Research depth:</b> classical planning fused with learned control, in a high-fidelity physics simulator.",
      robotics:"<b>Robotics:</b> a full autonomy stack — terrain analysis, global planning, learned local control, and evaluation on a simulated rover platform.",
      embedded:"<b>Embedded:</b> simulation-side today, but designed around a real rover's sensors and actuation limits, the constraints an embedded target imposes.",
      control:"<b>Control & GNC:</b> the guidance-navigation-control decomposition itself. A* guidance, learned navigation policy, low-level control, evaluated end-to-end.",
      ai:"<b>AI:</b> deep RL done honestly. PPO via skrl in vectorised Isaac Lab training (SAC/TD3 configs prepared, infeasible on available VRAM), reward shaping at the planner-to-policy interface, and a custom eval pipeline producing result CSVs rather than just training curves.",
      software:"<b>Software:</b> contributing cleanly inside a large external research codebase: new command terms, refactored models, reproducible experiment configs."
    }},
  tradie:{
    title:"Tradie Texts", kind:"Micro-SaaS · in production",
    link:null, linkNote:"Private repo · walkthrough on request",
    desc:"A missed-call recovery service for trades businesses. Twilio catches the call a tradie can't answer, an AI SMS conversation qualifies the lead (GPT-4o-mini with moderation and emergency detection), and the result lands on a realtime dashboard with lead scoring. Next.js 15 + TypeScript, Supabase Postgres with row-level security for tenant isolation, Upstash Redis for idempotency and rate limiting, Stripe subscriptions with usage-based billing. Built and hardened solo: CI, Playwright e2e, a threat model, and incident runbooks.",
    metrics:[["Live","in production"],["276","tests in CI"],["RLS","multi-tenant"]],
    tags:"Next.js · Supabase · Twilio · OpenAI · Stripe",
    notes:{
      overview:"<b>Product range:</b> a complete commercial SaaS (telephony, AI, billing, multi-tenant data) designed, built, and hardened by one person.",
      ai:"<b>AI:</b> an LLM doing real work — conversation engine with structured lead extraction, moderation, emergency detection, and per-message cost telemetry.",
      software:"<b>Software:</b> production engineering end-to-end. Webhook signature verification, idempotent queues, rate limits, RLS, CI gates, security docs, runbooks."
    }},
  fund:{
    title:"FUN.D", kind:"Full-stack web app",
    link:null, linkNote:"Private repo · walkthrough on request",
    desc:"A crowdfunding platform where users create and fund campaigns. Flask REST API with JWT auth and role-based admin, React 19 + Vite frontend, Stripe Elements payment flow (create → confirm → credit, idempotent), Supabase Postgres and image storage, deployed on Vercel. Taking it to release meant wiring the real payment flow end-to-end, adding migrations, fixing N+1 queries, validating uploads by magic bytes, and standing up a pytest + Vitest CI pipeline. A two-person build with Karim Tuikin; I led the engineering.",
    metrics:[["JWT","auth + roles"],["Stripe","payments"],["2","CI test suites"]],
    tags:"Flask · React · Stripe · Supabase",
    notes:{
      overview:"<b>Full-stack range:</b> the web counterpart to the hardware work — API design, auth, payments, deployment.",
      ai:"<b>AI:</b> none in the product, and that's the point: knowing when a plain CRUD + payments stack is the right tool.",
      software:"<b>Software:</b> the unglamorous release work — payment idempotency, migrations, query batching, upload validation, CI on both the Flask and React halves."
    }},
  tracking:{
    title:"Autonomous Target Tracking System", kind:"Personal build · hardware",
    link:null, linkNote:"Hardware build · demo on request",
    desc:"A compact, self-built system that uses a laser to autonomously lock onto and track moving targets: control theory, sensor calibration, and signal filtering tuned for rapid actuation and precise pointing. I'm extending it to predictive targeting from target velocity and trajectory.",
    metrics:[["Live","target lock"],["Predictive","targeting (WIP)"]],
    tags:"Control theory · actuation · filtering",
    notes:{
      overview:"<b>Bench credibility:</b> designed, built, wired, and tuned by hand.",
      robotics:"<b>Robotics:</b> perception-to-actuation latency is the whole game here. Track, predict, point, in real time on physical hardware.",
      embedded:"<b>Embedded:</b> built from the bench up — sensors calibrated, signals conditioned, actuators driven on a microcontroller-class budget.",
      control:"<b>Control:</b> the purest control project on this page. A live tracking loop where filter tuning and loop rate decide whether the target stays locked.",
      ai:"<b>AI:</b> the predictive-targeting extension is an estimation problem — modelling target motion to lead the actuator.",
      software:"<b>Software:</b> real-time code where a missed deadline is a missed target. Latency budgets over feature counts."
    }},
  fpga:{
    title:"Assistive Robot (FPGA)", kind:"University build · Verilog",
    link:null, linkNote:"University build · report on request",
    desc:"A Bluetooth-controlled assistive robot built on an FPGA in Verilog, following and responding to dynamic commands, with multiple sensors integrated into closed-loop control for autonomous operation.",
    metrics:[["FPGA","Verilog logic"],["BT","command link"]],
    tags:"Verilog · FPGA · closed-loop control",
    notes:{
      overview:"<b>Hardware range:</b> below the microcontroller — gateware, timing, and digital design.",
      robotics:"<b>Robotics:</b> a complete robot (comms, sensing, control, actuation) implemented at the hardware-description level.",
      embedded:"<b>Embedded:</b> the deepest layer of the stack. HDL, sensor interfacing, and control logic in fabric rather than firmware.",
      control:"<b>Control:</b> closed-loop control implemented in hardware, where the loop is gates and registers rather than a scheduler.",
      ai:"<b>AI:</b> the actuation substrate learned policies eventually have to live on — useful ground truth for sim-to-real thinking.",
      software:"<b>Software:</b> Verilog forces the concurrency discipline that makes multithreaded software feel easy afterwards."
    }},
  turtlebot:{
    title:"Autonomous TurtleBot (ROS2)", kind:"University build · ROS2",
    link:null, linkNote:"University build · report on request",
    desc:"An autonomous TurtleBot programmed in ROS2 to identify, count, and interact with items via QR codes: sensor fusion and path-finding on a standard research platform.",
    metrics:[["ROS2","nav stack"],["QR","task logic"]],
    tags:"ROS2 · sensor fusion · path planning",
    notes:{
      overview:"<b>Platform fluency:</b> the industry-standard robotics middleware, used for a complete task pipeline.",
      robotics:"<b>Robotics:</b> ROS2 nodes, topics, and the fusion/planning stack every robotics team expects you to already speak.",
      embedded:"<b>Embedded:</b> working against real sensors and actuators through ROS2's hardware interfaces.",
      control:"<b>Control:</b> path-finding and motion built on fused, imperfect sensor data — planning under uncertainty.",
      ai:"<b>AI:</b> perception-driven task logic (detect, decide, act), the classical autonomy loop RL policies aim to replace.",
      software:"<b>Software:</b> distributed pub/sub architecture in practice. Nodes, message contracts, and debugging across process boundaries."
    }},
  ant61:{
    title:"Satellite Refueling Latch (ANT61)", kind:"Industry project · CAD",
    link:null, linkNote:"Client project · details on request",
    desc:"A prototype latching mechanism for mechanical autonomous satellite refueling, designed in Fusion360 for space-robotics company ANT61.",
    metrics:[["Fusion360","mechanism design"]],
    tags:"CAD · mechanism design · space",
    notes:{
      overview:"<b>Mechanical range:</b> proof the CAD skills extend to real client mechanism design.",
      robotics:"<b>Robotics:</b> end-effector-adjacent mechanism design under space constraints — tolerance, actuation, and reliability with no service calls.",
      embedded:"<b>Embedded:</b> the mechanical half of electromechanical, what the firmware ultimately moves.",
      control:"<b>Control:</b> autonomous docking and latching is a precision alignment problem, so the mechanism design is shaped by control feasibility.",
      ai:"<b>AI:</b> space robotics context that pairs with the rover thesis — autonomy where teleoperation isn't an option.",
      software:"<b>Software:</b> CAD-to-constraint thinking that keeps simulation models honest."
    }}
};

const SKILLS = [
  {id:"embedded", title:"Firmware & electronics", items:["C / C++ · Arduino","FPGA · Verilog / SystemVerilog","Raspberry Pi · microcontrollers","Sensor integration & calibration","Power wiring & junction boxes","Assembly"]},
  {id:"robotics", title:"Robotics & simulation", items:["ROS2","Isaac Sim / Isaac Lab","Sensor fusion & path planning","HIL simulation","CAD (Fusion/SW)","Mechanism design"]},
  {id:"control", title:"Control & signals", items:["Advanced control systems","Signal processing & filtering","State estimation","GNC fundamentals","MATLAB","Radar & antenna coursework"]},
  {id:"ai", title:"AI & computer vision", items:["RL (PPO)","skrl · PyTorch","Computer vision · MediaPipe","LLM integration (OpenAI)","Evaluation pipelines","AI-native / agentic workflows"]},
  {id:"software", title:"Software engineering", items:["Python / TS","React · Next.js · Flask","Postgres · Supabase · Redis","Stripe · Twilio integration","pytest · Vitest · Playwright · CI","git · GitHub · profiling"]},
  {id:"transfer", title:"Working style", items:["Test-driven & methodical","Documents thoroughly","Led teams to delivery","Client-facing comms","Self-taught: ROS2, FPGA, Isaac","Adaptable across the stack"]}
];

const EXPERIENCE = [
  { when:"Nov 2024 — Jan 2026", role:"System Engineer", org:"ALBON",
    body:"Developed and integrated hardware, software, and mechanical components for a prototype control system: migrated the architecture from a microcontroller to a Raspberry Pi for real-time data processing, integrated sensor arrays, and engineered the system's electrical junction box to cut power consumption and keep the hardware reliable." },
  { when:"Sep 2021 — Nov 2021", role:"Engineering Intern", org:"Escape The Room",
    body:"Designed mechanical puzzles and implemented engineering concepts in real-world, client-facing products." },
  { when:"May 2021 — Aug 2021", role:"Testing Technician Intern", org:"CloudAk",
    body:"Supported server system testing and maintenance in data-centre environments." }
];

const EDUCATION = {
  degree:"B.E. (Honours), Mechatronic Engineering",
  school:"University of Sydney",
  when:"2022 — 2026",
  detail:"EWAM (Engineering Weighted Average Mark) 76% — Distinction"
};

return { MODES, PROJECTS, SKILLS, EXPERIENCE, EDUCATION };
});
