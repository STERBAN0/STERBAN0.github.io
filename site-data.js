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
    lede:"From a ROS 2 TurtleBot running a supermarket on Nav2 and QR codes, to an FPGA-driven companion robot, to a planetary rover learning to cross Mars terrain in simulation: I've built and programmed robotic platforms across the stack, and spent 14 months in industry integrating one into a working prototype.",
    chips:["ROS 2","Nav2","State estimation","Isaac Sim","Closed-loop control","CAD (Fusion/SW)"],
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
    lede:"Control theory is where I started: a self-built rig that keeps a moving target pinned in frame, with two PID loops driving the mount and a Kalman filter estimating the target's velocity so it keeps leading when the target drops out of view. My thesis pairs a classical global planner with a learned local policy, which is GNC thinking applied to modern tools.",
    chips:["Advanced control","PID + Kalman","Signal filtering","State estimation","A* + RL policy","MATLAB"],
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
    lede:"My best software is running in production. Tradie Texts recovers missed calls for trades businesses with telephony, an LLM conversation engine, and Stripe billing. Conjure's render path went from 162 ms to 2.8 ms a frame after profiling, then became a pip-installable SDK with an event API. A client crowdfunding platform wires a real Stripe payment flow through a Flask + React stack. I profile before I optimise, test what's deterministic, and document what I build.",
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
    title:"Crowdfunding Platform", kind:"Client build · Full-stack web app",
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
    desc:"A camera on a two-axis motorised mount that keeps a moving hand or drone pinned inside an invisible bounding box at the centre of frame. A pretrained detection model finds the target, two PID loops — one per motor — drive the x and y axes to null the error, and a Kalman filter estimates the target's velocity so the rig keeps leading it through the moments it leaves the frame. Vision, filtering, and both control loops run on a Raspberry Pi. I designed, built, wired, and tuned the whole rig by hand.",
    metrics:[["2× PID","one per axis"],["Kalman","velocity estimate"]],
    tags:"PID control · Kalman filter · vision tracking",
    notes:{
      overview:"<b>Bench credibility:</b> designed, built, wired, and tuned by hand.",
      robotics:"<b>Robotics:</b> perception-to-actuation in a single loop. Detect, estimate, point, and keep pointing while the target moves.",
      embedded:"<b>Embedded:</b> built from the bench up — camera in, two motors out, the whole loop closed on a Raspberry Pi.",
      control:"<b>Control:</b> the purest control project on this page. Two PID loops and a Kalman filter, tuned until a moving target stays inside the box.",
      ai:"<b>AI:</b> a pretrained hand/drone detector feeds the loop, and the Kalman filter turns its noisy boxes into a velocity estimate the controller can lead with.",
      software:"<b>Software:</b> real-time code where a missed deadline is a missed target. Latency budgets over feature counts."
    }},
  fpga:{
    title:"Assistive Robot (FPGA)", kind:"University build · Verilog",
    link:null, linkNote:"University build · report on request",
    desc:"\"RoboDog\": a companion robot for people whose allergies or disabilities rule out a real dog, built on an Altera DE2-115 with the sensing and control written in Verilog rather than firmware. A camera subsystem runs edge detection for line-following and green-object tracking, a microphone subsystem runs an FFT to find the beat and dance to it, an ultrasonic sensor stops the chassis inside 20 cm, and an IR remote outranks all of it as a hardware emergency stop. Commands arrive over Bluetooth, a four-state FSM decides which subsystem owns the wheels, and drive values leave over UART. Five-person build, demonstrated on real hardware.",
    metrics:[["DE2-115","all in Verilog"],["5 subsystems","1 arbiter"]],
    tags:"Verilog · FPGA · real-time sensor arbitration",
    notes:{
      overview:"<b>Hardware range:</b> below the microcontroller — gateware, timing, and digital design.",
      robotics:"<b>Robotics:</b> a complete robot — camera, microphone, ultrasonic, IR, and drive commands — with every subsystem living in hardware description.",
      embedded:"<b>Embedded:</b> the deepest layer of the stack. Timing closure was the real lesson: a 32.763 ns critical-path violation on the BPM counter, fixed by pipelining the offending expression into 6.46 ns of positive slack.",
      control:"<b>Control:</b> the line-follower and object-tracker close their loops in gates and registers, and a four-state FSM arbitrates which one owns the wheels.",
      ai:"<b>AI:</b> the actuation substrate learned policies eventually have to live on — useful ground truth for sim-to-real thinking.",
      software:"<b>Software:</b> Verilog forces the concurrency discipline that makes multithreaded software feel easy afterwards."
    }},
  turtlebot:{
    title:"Autonomous TurtleBot (ROS2)", kind:"University build · ROS2",
    link:null, linkNote:"University build · report on request",
    desc:"A TurtleBot3 that runs a small supermarket on its own: a PID wall-follower on the laser scan maps the aisles, Nav2 drives it to a shelf, and a camera reads QR codes to pull each item's identity, price, and position into a central inventory server. I owned the operator side — an ImGui/ImPlot control panel with live battery plotting, cart and checkout, QR refresh, and a revenue/profit tab — plus the charging behaviour behind it, wired to the rest of the robot through ROS 2 action servers. Five-person team, real hardware.",
    metrics:[["ROS 2","action servers"],["QR","live inventory"]],
    tags:"ROS 2 · Nav2 · C++ · ImGui",
    notes:{
      overview:"<b>Platform fluency:</b> the industry-standard robotics middleware, used for a complete task pipeline.",
      robotics:"<b>Robotics:</b> ROS 2 nodes, topics, and long-running action servers — the middleware every robotics team expects you to already speak.",
      embedded:"<b>Embedded:</b> real hardware rather than a simulator. Laser scan, camera, and battery state on a physical TurtleBot3.",
      control:"<b>Control:</b> a PID wall-follower on raw laser scan mapped the aisles that Nav2 then planned through.",
      ai:"<b>AI:</b> perception-driven task logic — read a QR code, update the world model, decide where to go next. The classical autonomy loop RL policies aim to replace.",
      software:"<b>Software:</b> distributed pub/sub and long-running action servers, with a C++ GUI as the operator front end. Message contracts and debugging across process boundaries."
    }},
  ant61:{
    title:"Satellite Refueling Latch (ANT61)", kind:"Team hackathon · CAD",
    link:null, linkNote:"Two-day hackathon · CAD on request",
    desc:"A sliding latch for autonomous satellite refuelling: push the probe in and it clicks home, so a servicing spacecraft can capture its target with nobody in the loop to retry a bad approach. Designed in Fusion360 and presented to space-robotics company ANT61 as a full CAD assembly, built with a team over a two-day hackathon in 2024. It's a concept study, not a qualified flight part — no FEA sits behind it — but it's where the CAD work had to answer to a real company's problem instead of a marking rubric.",
    metrics:[["Fusion360","full CAD assembly"],["2 days","team hackathon"]],
    tags:"CAD · mechanism design · space",
    notes:{
      overview:"<b>Mechanical range:</b> proof the CAD skills reach past coursework into mechanism design.",
      robotics:"<b>Robotics:</b> end-effector-adjacent mechanism design — a passive capture that has to seat reliably first time, with no operator to retry it.",
      embedded:"<b>Embedded:</b> the mechanical half of electromechanical, what the firmware ultimately moves.",
      control:"<b>Control:</b> autonomous docking is a precision-alignment problem, so the latch geometry absorbs error the controller would otherwise have to.",
      ai:"<b>AI:</b> space robotics context that pairs with the rover thesis — autonomy where teleoperation isn't an option.",
      software:"<b>Software:</b> CAD-to-constraint thinking that keeps simulation models honest."
    }}
};

const SKILLS = [
  {id:"embedded", title:"Firmware & electronics", items:["C / C++ · Arduino","FPGA · Verilog / SystemVerilog","Raspberry Pi · microcontrollers","Sensor integration & calibration","Power wiring & junction boxes","Assembly"],
    details:{
      "C / C++ · Arduino":"C++ across the TurtleBot's ROS 2 nodes and its ImGui control panel; C on the Arduino Nano 33 IoT carrying the RoboDog's Bluetooth link, and on ALBON's prototype before it moved to a Raspberry Pi.",
      "FPGA · Verilog / SystemVerilog":"The RoboDog's logic on an Altera DE2-115: camera edge detection, an FFT beat detector, ultrasonic and IR safety interlocks, and the FSM arbitrating between them — all gates and registers, not firmware.",
      "Raspberry Pi · microcontrollers":"Migrated ALBON's prototype control system from a microcontroller to a Raspberry Pi for faster real-time data processing over a 14-month industry role, and run the tracking rig's vision, filtering, and both PID loops on one.",
      "Sensor integration & calibration":"Integrated sensor arrays into ALBON's prototype, and wired the RoboDog's camera, microphone, ultrasonic, and IR inputs into a single arbitrated control path on the FPGA.",
      "Power wiring & junction boxes":"Engineered ALBON's electrical junction box to cut power consumption and keep the prototype's hardware running reliably in the field.",
      "Assembly":"Coursework-level rather than a shipped project, but it's the layer that shapes how I reason about firmware close to the metal."
    }},
  {id:"robotics", title:"Robotics & simulation", items:["ROS2","Isaac Sim / Isaac Lab","State estimation & path planning","HIL simulation","CAD (Fusion/SW)","Mechanism design"],
    details:{
      "ROS2":"The TurtleBot's operator stack: I built its ImGui control panel and charging behaviour as ROS 2 nodes, talking to the team's navigation and inventory servers over topics and action servers.",
      "Isaac Sim / Isaac Lab":"The training environment for the whole rover thesis: PPO policies trained across 64 parallel simulated rovers on Mars terrain in NVIDIA Isaac Sim / Isaac Lab.",
      "State estimation & path planning":"The A* global planner that guides the rover thesis's learned policy, and the Kalman filter that fuses the tracking rig's noisy detections with a motion model so the mount keeps pointing when the target leaves frame.",
      "HIL simulation":"Coursework territory rather than a rig I've built; the closest I've come in practice is closing the loop on control logic inside the Isaac Sim pipeline.",
      "CAD (Fusion/SW)":"Designed the ANT61 satellite-refuelling latch in Fusion360 as a full assembly, built with a team over a two-day hackathon and presented to the company.",
      "Mechanism design":"The ANT61 latch: a sliding capture that clicks home when the probe is pushed in, so autonomous docking doesn't hinge on an operator getting the approach right."
    }},
  {id:"control", title:"Control & signals", items:["Advanced control systems","Signal processing & filtering","State estimation","GNC fundamentals","MATLAB","Radar & antenna coursework"],
    details:{
      "Advanced control systems":"Coursework applied directly on the tracking rig: two PID loops, one per axis, tuned against a Kalman velocity estimate until a moving target stays inside the box.",
      "Signal processing & filtering":"The FFT beat detector in the RoboDog's microphone subsystem, the Kalman filter on the tracking rig, and the two-stage One Euro + EMA filter that keeps Conjure's 60 Hz gesture pipeline stable.",
      "State estimation":"The Kalman filter on the tracking rig, estimating target velocity so the mount keeps leading a target that has left the frame; and in the thesis, the pose and progress terms the rover's reward and termination logic depend on.",
      "GNC fundamentals":"The guidance-navigation-control split shows up literally in the thesis: A* for guidance, a learned PPO policy for navigation, and low-level control evaluated end-to-end.",
      "MATLAB":"My modelling and analysis tool through control and signals coursework. Not tied to a repo on this page, but it's where a controller goes before it touches hardware.",
      "Radar & antenna coursework":"Covered at Sydney as coursework theory. I haven't applied it in a shipped project yet, so I list it as background rather than experience."
    }},
  {id:"ai", title:"AI & computer vision", items:["RL (PPO)","skrl · PyTorch","Computer vision · MediaPipe","LLM integration (OpenAI)","Evaluation pipelines","AI-native / agentic workflows"],
    details:{
      "RL (PPO)":"The algorithm behind the rover thesis: PPO policies trained via skrl across 64 parallel Isaac Sim rovers, chosen after VRAM limits ruled out SAC/TD3.",
      "skrl · PyTorch":"Wrote the skrl training configs and PyTorch reward/termination logic for the thesis, including the SAC/TD3 configs prepared alongside the PPO setup used for final results.",
      "Computer vision · MediaPipe":"MediaPipe hand/face landmark models wrapped in a tested inference pipeline: nine gestures classified with temporal hysteresis, running at 60 FPS.",
      "LLM integration (OpenAI)":"The GPT-4o-mini conversation engine behind Tradie Texts, which qualifies leads over SMS with moderation, structured extraction, and emergency detection.",
      "Evaluation pipelines":"Built the custom evaluation pipeline for the rover thesis: result CSVs across training distances, not just training-curve screenshots.",
      "AI-native / agentic workflows":"My repos ship with CI, deterministic tests, and CLAUDE.md context files, so agentic tools can work in them directly."
    }},
  {id:"software", title:"Software engineering", items:["Python / TS","React · Next.js · Flask","Postgres · Supabase · Redis","Stripe · Twilio integration","pytest · Vitest · Playwright · CI","git · GitHub · profiling"],
    details:{
      "Python / TS":"Python across the rover thesis and Conjure; TypeScript across Tradie Texts's Next.js codebase and the crowdfunding platform's React frontend.",
      "React · Next.js · Flask":"Next.js 15 powers Tradie Texts; a Flask REST API plus a React 19 + Vite frontend power the crowdfunding platform.",
      "Postgres · Supabase · Redis":"Supabase Postgres with row-level security plus Upstash Redis for idempotency and rate limiting on Tradie Texts; Supabase Postgres and image storage on the crowdfunding platform.",
      "Stripe · Twilio integration":"Twilio call handling and Stripe usage-based billing on Tradie Texts; an idempotent Stripe Elements payment flow (create, confirm, credit) on the crowdfunding platform.",
      "pytest · Vitest · Playwright · CI":"276 CI tests and Playwright e2e coverage on Tradie Texts; a pytest + Vitest CI pipeline across the crowdfunding platform's Flask and React halves.",
      "git · GitHub · profiling":"Git/GitHub workflow across the three public repos here (Conjure, conjure-sdk, the rover thesis); profiling took Conjure's render path from 162 ms down to 2.8 ms a frame."
    }},
  {id:"transfer", title:"Working style", items:["Test-driven & methodical","Documents thoroughly","Led teams to delivery","Client-facing comms","Self-taught: ROS2, FPGA, Isaac","Adaptable across the stack"],
    details:{
      "Test-driven & methodical":"Tradie Texts shipped with 276 CI tests, a threat model, and incident runbooks before launch; Conjure ships with a pytest suite and CI.",
      "Documents thoroughly":"Incident runbooks and security docs for Tradie Texts, a contributor guide for Conjure, and CLAUDE.md context files across my repos.",
      "Led teams to delivery":"Led the crowdfunding platform's engineering as a two-person build with Karim Tuikin, from spec through to a live Stripe payment flow.",
      "Client-facing comms":"Presented the satellite-latch design to ANT61 at the end of a two-day hackathon, and worked with Escape The Room's clients on delivered puzzle installations during an internship.",
      "Self-taught: ROS2, FPGA, Isaac":"I picked up each of these stacks because a project demanded it — ROS2 for the TurtleBot, Verilog for the assistive robot, Isaac Sim for the thesis — well past what the coursework covered.",
      "Adaptable across the stack":"I move from board-level firmware to control loops to a production SaaS stack without needing a specialist handoff at any layer."
    }}
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
  detail:"Graduated with First Class Honours"
};

return { MODES, PROJECTS, SKILLS, EXPERIENCE, EDUCATION };
});
