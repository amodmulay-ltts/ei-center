/*
 * EI Center — demo catalogue
 * ------------------------------------------------------------------
 * One entry per demo. The landing page and every demo detail page
 * are rendered from this list; adding a demo = adding an object here.
 * Full field reference: docs/CONTENT-GUIDE.md. Validated by
 * tests/data.test.js (run `npm test`).
 *
 * status        live   – running on hardware in the Munich center
 *               remote – hosted elsewhere; needs network access to launch
 *               soon   – being prepared for the center
 * published     false hides the entry everywhere (placeholder).
 * contentStatus draft marks entries whose copy still needs owner input.
 * launch.url    null until the demo link is provided; the Launch button
 *               then shows "Ask your host" instead.
 * contact       internal only, never rendered on screen.
 */
(function (root) {
  "use strict";

  var demos = [
    /* ------------------------------------------------------------ */
    {
      id: "plxai",
      name: "PLxAI",
      tagline: "Engineering intelligence across the product lifecycle.",
      summary: "An enterprise GenAI platform that turns fragmented specifications, drawings, DFMEA sheets and standards into grounded, governed engineering decisions.",
      status: "live",
      lens: "engineering",
      stages: ["design", "validation"],
      published: true,
      contentStatus: "ready",
      problem: [
        "Time-consuming manual checks",
        "Inconsistent application of standards",
        "Version-to-version comparison errors",
        "Tribal-knowledge bottlenecks"
      ],
      steps: [
        { title: "Ingest",    text: "Documents, tables and CAD drawings, multimodal." },
        { title: "Ground",    text: "Vector and graph retrieval over enterprise context." },
        { title: "Generate",  text: "Structured DFMEA and DVP artefacts." },
        { title: "Validate",  text: "Citations and human approval controls." },
        { title: "Integrate", text: "PLM and 3D ecosystems, cloud, private or on-prem." }
      ],
      kpis: [
        { value: "90%",    label: "less manual review in wire-harness clash analysis" },
        { value: "30–50%", label: "faster engineering cycle time" },
        { value: "25–30%", label: "quality improvement" },
        { value: "40 h",   label: "saved per project" }
      ],
      features: [
        { title: "Wire-harness clash analysis", text: "CV, ML and LLM reasoning classify clashes and rank severity, removing the ~90% false positives of rule-based checks." },
        { title: "Door-hinge clearance validation", text: "Automated verification of CAD sections against clearance rules." },
        { title: "DFMEA & DVP generation", text: "Draft artefacts grounded in your standards, with every row cited." },
        { title: "Secure and private", text: "Runs on local models inside your environment." }
      ],
      media: {},
      launch: { url: "https://ltts.plxai.tech/dashboard", label: "Launch PLxAI" },
      contact: "Mobility · Annapureddy Veera Reddy"
    },

    /* ------------------------------------------------------------ */
    {
      id: "aitest",
      name: "AiTest",
      tagline: "From requirement text to execution-ready test scripts.",
      summary: "An orchestrated AI test-engineering pipeline that ingests requirements, reasons about coverage, generates procedures and scripts, and runs them on HIL/SIL benches.",
      status: "remote",
      lens: "engineering",
      stages: ["requirements", "validation"],
      published: true,
      contentStatus: "ready",
      problem: [
        "Requirements scattered across Jira, DOORS and documents",
        "Manual, repetitive script authoring",
        "Execution feedback arrives too late to matter"
      ],
      steps: [
        { title: "Requirements", text: "Jira, DOORS and PDF into a traceable model." },
        { title: "Intelligence", text: "RAG + LLM map edge cases and safety conditions." },
        { title: "Procedures",   text: "Deterministic steps with pass/fail oracles." },
        { title: "Scripts",      text: "Python, CAPL and Robot, ready for CI." },
        { title: "Execution",    text: "HIL/SIL runs with telemetry feedback." }
      ],
      kpis: [
        { value: "+72%", label: "test throughput at a German premium OEM" },
        { value: "86%",  label: "faster defect triage (3.5 h → 0.5 h)" },
        { value: "90%",  label: "script conversion automated" },
        { value: "80%",  label: "requirements mapping automated" }
      ],
      features: [
        { title: "Safety-driven workflows", text: "Coverage aligned to ISO 26262 templates." },
        { title: "Multi-language scripts",  text: "Python, CAPL and Robot Framework output." },
        { title: "Log analysis & RCA",      text: "Verification logs read at machine scale, triaged to probable cause." },
        { title: "Engineer sign-off",       text: "Engineers validate and sign every release." }
      ],
      media: {},
      launch: { url: null, label: "Launch AiTest" },
      contact: "Mobility · Swapnil Tandel"
    },

    /* ------------------------------------------------------------ */
    {
      id: "agenticiq",
      name: "AgenticIQ",
      tagline: "Design, distribute and operate AI agents.",
      summary: "An agentic engineering platform where you state an intent and it assembles, orchestrates and governs the agents and workflows needed to deliver it.",
      status: "live",
      lens: "agentic",
      stages: ["concept", "software", "operations"],
      published: true,
      contentStatus: "ready",
      problem: [
        "Dozens of disconnected AI pilots that don't work together",
        "Engineering knowledge buried in documents and tickets",
        "Tool sprawl with flat adoption"
      ],
      steps: [
        { title: "Intent",       text: "Describe what you want: \"build an image-to-text agent\"." },
        { title: "Decompose",    text: "The platform breaks it into functional agents." },
        { title: "Assemble",     text: "Safety, interpretation, OCR and validation agents wired together." },
        { title: "Operate",      text: "Monitor, approve and control every agent live." }
      ],
      kpis: [],
      features: [
        { title: "Model Garden",   text: "Proprietary, open-source, fine-tuned and local GGUF models." },
        { title: "Agent Studio",   text: "Build agents from modular parts; publish with API, A2A and MCP." },
        { title: "Fine-tuning",    text: "LoRA, QLoRA and more, with evaluation built in." },
        { title: "Control Tower",  text: "Real-time status of every agent, with human-in-the-loop approval." },
        { title: "Build here, run anywhere", text: "Export workflows to your own infrastructure. No lock-in." },
        { title: "Model-agnostic", text: "Swap models as better, cheaper ones arrive, without rebuilding." }
      ],
      media: {},
      launch: { url: "https://agenticiq.ltts.com/", label: "Launch AgenticIQ" },
      contact: "CTO office · Roshan Manuel S R"
    },

    /* ------------------------------------------------------------ */
    {
      id: "reqspec",
      name: "ReqSpec",
      tagline: "From plain-language requirements to specs and UML.",
      summary: "Turns informal requirements into structured specifications and UML diagrams from one source, inside VS Code, running entirely on local models.",
      status: "live",
      lens: "engineering",
      stages: ["concept", "requirements", "design"],
      published: true,
      contentStatus: "ready",
      problem: [
        "70–80% of requirement effort spent writing and formatting",
        "Procurement and engineering working from different documents",
        "Endless review cycles over inconsistent specs"
      ],
      steps: [
        { title: "Describe",  text: "Write what to build in plain English." },
        { title: "Ground",    text: "Domain knowledge, interfaces and approved terminology." },
        { title: "Specify",   text: "User stories, acceptance criteria, NFRs and edge cases." },
        { title: "Model",     text: "Class, sequence, state and package diagrams." }
      ],
      kpis: [
        { value: "60–70%", label: "less requirement preparation time" },
        { value: "Minutes", label: "for a structured first draft, not hours" },
        { value: "0",       label: "external API calls: fully air-gapped" }
      ],
      features: [
        { title: "Dual audience",       text: "Specs for procurement and compliance, diagrams for engineers, from one input." },
        { title: "Domain-grounded",     text: "Works within your actual subsystems and naming." },
        { title: "Local-first",         text: "Runs on-prem with no network connection required." },
        { title: "Workflow-native",     text: "A VS Code plugin, where engineers already work." }
      ],
      media: {},
      launch: { url: null, label: "Launch ReqSpec" },
      contact: "Mobility · Amod Mulay"
    },

    /* ------------------------------------------------------------ */
    {
      id: "privsdlc",
      name: "privSDLC",
      tagline: "Agentic software delivery. Sensitive reasoning stays local.",
      summary: "A privacy-first pipeline of governed agents that turns a rough idea into a sharpened spec, INVEST-scored requirements, traceable issues, code and tests, with a human at every critical gate.",
      status: "live",
      lens: "agentic",
      stages: ["requirements", "software", "validation"],
      published: true,
      contentStatus: "ready",
      problem: [
        "Days of meetings and rewrites before a line of code exists",
        "Agentic AI blocked by data-protection concerns",
        "No proof of where data went"
      ],
      steps: [
        { title: "Input gate",   text: "Screens every idea for prompt injection." },
        { title: "Sharpen",      text: "A spec in at most three clarifying rounds." },
        { title: "Generate & judge", text: "Requirements scored on all six INVEST criteria." },
        { title: "Plan & code",  text: "Issues, code on a branch and traced tests." },
        { title: "Human review", text: "People approve before planning and before code." }
      ],
      kpis: [
        { value: "0",   label: "cloud calls out of the box" },
        { value: "6",   label: "INVEST criteria scored per requirement" },
        { value: "50%", label: "less preparation effort (illustrative)" }
      ],
      features: [
        { title: "Adversarial quality gates", text: "An independent judge model scores every requirement with evidence." },
        { title: "Need-to-know knowledge",    text: "Retrieval access enforced per agent type, not by prompt." },
        { title: "AI Bill of Materials",       text: "Per-agent record of model, location and passages retrieved." },
        { title: "Toolchain integration",      text: "GitHub, Jira, Confluence, Codebeamer and VS Code." }
      ],
      media: {},
      launch: { url: null, label: "Launch privSDLC" },
      contact: "Mobility · Luca Koecher / Amod Mulay"
    },

    /* ------------------------------------------------------------ */
    {
      id: "ticket-rca",
      name: "Ticket RCA",
      tagline: "AI pre-analysis for defect tickets, from hours to minutes.",
      summary: "Automates investigation and triage of defect tickets: classifies, retrieves logs, runs a structured root-cause workflow and writes the pre-analysis report, all on local AI.",
      status: "live",
      lens: "engineering",
      stages: ["software", "validation", "operations"],
      published: true,
      contentStatus: "ready",
      problem: [
        "Senior engineers spend hours on first-pass triage",
        "Inconsistent analysis quality across the team",
        "The same defects investigated again and again"
      ],
      steps: [
        { title: "Classify",    text: "Extract metadata and route by domain (display, stability, ADAS)." },
        { title: "Investigate", text: "Log retrieval, trace parsing and artefact identification." },
        { title: "Reason",      text: "Root-cause hypotheses with confidence and evidence." },
        { title: "Reuse",       text: "Similar historical tickets and proven fixes." },
        { title: "Report",      text: "Structured pre-analysis with recommended actions." }
      ],
      kpis: [
        { value: "Hours → min", label: "first-pass investigation time" },
        { value: "100%",        label: "tickets on the same structured method" }
      ],
      features: [
        { title: "Fishbone-based RCA",     text: "Replicates how experienced engineers investigate." },
        { title: "Similarity search",      text: "Reuses previous analyses to avoid duplicate work." },
        { title: "Local & secure",         text: "Sensitive logs never leave the enterprise." },
        { title: "Extensible",             text: "Adaptable to new domains, ECUs and techniques." }
      ],
      media: {},
      launch: { url: null, label: "Launch Ticket RCA" },
      contact: "Mobility · Luca Koecher / Amod Mulay"
    },

    /* ------------------------------------------------------------ */
    {
      id: "sima-ai",
      name: "Edge AI on SiMa.ai",
      tagline: "Physical AI at the edge, 50 TOPS in a module.",
      summary: "Engineering AI models deployed and running on a SiMa.ai Modalix system-on-module, showing low-power, on-device inference for vision and embedded use cases.",
      status: "live",
      lens: "physical",
      stages: ["software", "manufacturing", "operations"],
      published: true,
      contentStatus: "draft",
      problem: [],
      steps: [],
      kpis: [
        { value: "50 TOPS", label: "on-device AI compute" }
      ],
      features: [
        { title: "On-device inference", text: "No cloud round-trip; data stays on the device." },
        { title: "Embedded-ready",      text: "Model optimisation for edge deployment." }
      ],
      media: {},
      launch: { url: null, label: "Launch demo" },
      contact: "Mobility · Amod Mulay"
    },

    /* ------------------------------------------------------------ */
    {
      id: "ai-studio",
      name: "LTTS AI Studio",
      tagline: "Agentic workflows that execute at scale.",
      summary: "An agentic engineering platform for building and running AI workflows that integrate with Confluence, Jira, Codebeamer and more.",
      status: "remote",
      lens: "agentic",
      stages: ["requirements", "software"],
      published: true,
      contentStatus: "draft",
      problem: [],
      steps: [],
      kpis: [],
      features: [
        { title: "Documentation & specs", text: "Generates documentation and specifications." },
        { title: "Toolchain integration", text: "Confluence, Jira, Codebeamer and more." }
      ],
      media: {},
      launch: { url: null, label: "Launch AI Studio" },
      contact: "AI Practice · Srirma Mundra"
    },

    /* ------------------------------------------------------------ */
    {
      id: "qassure",
      name: "QAssure.ai",
      tagline: "AI-native quality and regulatory affairs for MedTech.",
      summary: "An enterprise platform that streamlines regulatory documentation, clinical evaluation, complaints handling, supplier quality and post-market surveillance.",
      status: "remote",
      lens: "industrial",
      stages: ["validation", "manufacturing", "operations"],
      published: true,
      contentStatus: "ready",
      problem: [
        "FDA QMSR and EU MDR raise compliance demands",
        "EUDAMED mandates digital regulatory reporting",
        "Paper-based QMS can't keep up"
      ],
      steps: [],
      kpis: [],
      features: [
        { title: "Clinical evaluation",     text: "Literature screening, CER and PSUR authoring." },
        { title: "Complaints management",   text: "Intake to closure with IMDRF coding." },
        { title: "Supplier quality",        text: "CoC/CoA certificate verification, including handwritten data." },
        { title: "Design History File",     text: "Template migration, remediation and audit-ready DHF." }
      ],
      media: {},
      launch: { url: null, label: "Launch QAssure" },
      contact: "Medical · Mukund"
    },

    /* ================ Coming to the center ================ */
    {
      id: "vision-inspection",
      name: "AI Vision Quality Inspection",
      tagline: "Real-time defect detection on medical-device lines.",
      summary: "Computer vision that detects defects in real time, improves first-pass yield and gives explainable defect analytics with full traceability.",
      status: "soon", lens: "industrial", stages: ["manufacturing"],
      published: true, contentStatus: "draft",
      problem: [], steps: [], kpis: [],
      features: [
        { title: "Explainable analytics", text: "Every defect decision traceable." },
        { title: "Higher first-pass yield", text: "Less manual inspection effort." }
      ],
      media: {}, launch: { url: null, label: "Launch demo" },
      contact: "Digital Manufacturing · Shankar Subramanian"
    },
    {
      id: "food-quality-inspection",
      name: "Food-Line AI Quality Inspection",
      tagline: "Replacing manual pull-and-check on a high-speed line.",
      summary: "Vision AI detects broken, chipped, misaligned, missing-filling and colour-variant products in real time, with continuous root-cause analysis back to the process.",
      status: "soon", lens: "industrial", stages: ["manufacturing"],
      published: true, contentStatus: "draft",
      problem: [], steps: [], kpis: [],
      features: [
        { title: "Real-time defect classes", text: "Broken, chipped, misaligned, missing filling, colour." },
        { title: "Closed-loop RCA", text: "Links defects back to process parameters." }
      ],
      media: {}, launch: { url: null, label: "Launch demo" },
      contact: "Digital Manufacturing · Shankar Subramanian"
    },
    {
      id: "supply-chain-tower",
      name: "Supply Chain Control Tower",
      tagline: "n-tier supplier visibility with AI risk signals.",
      summary: "End-to-end visibility from Tier-1 to Tier-n suppliers, inventory and logistics, with early disruption detection and predictive decisions.",
      status: "soon", lens: "industrial", stages: ["manufacturing", "operations"],
      published: true, contentStatus: "draft",
      problem: [], steps: [], kpis: [], features: [],
      media: {}, launch: { url: null, label: "Launch demo" },
      contact: "Digital Manufacturing · Shankar Subramanian"
    },
    {
      id: "test-bench-cockpit",
      name: "Test Bench Cockpit",
      tagline: "Equipment, test execution and product genealogy in one view.",
      summary: "Real-time monitoring of test benches and execution, automated result capture, full product traceability and compliance reporting.",
      status: "soon", lens: "industrial", stages: ["validation", "manufacturing"],
      published: true, contentStatus: "draft",
      problem: [], steps: [], kpis: [], features: [],
      media: {}, launch: { url: null, label: "Launch demo" },
      contact: "Digital Manufacturing · Shankar Subramanian"
    },
    {
      id: "oxygenator-twin",
      name: "Oxygenator Digital Twin",
      tagline: "Simulate and optimise a MedTech production line.",
      summary: "Combines manufacturing data, simulation and AI to monitor production in real time, find bottlenecks and improve quality.",
      status: "soon", lens: "physical", stages: ["manufacturing"],
      published: true, contentStatus: "draft",
      problem: [], steps: [], kpis: [], features: [],
      media: {}, launch: { url: null, label: "Launch demo" },
      contact: "Digital Manufacturing · Shankar Subramanian"
    },
    {
      id: "lights-out-factory",
      name: "Lights-Out Factory on NVIDIA",
      tagline: "Autonomous factory operations, simulated end to end.",
      summary: "A lights-out factory scenario built on NVIDIA hardware and simulation, shown as a recorded walkthrough in Munich.",
      status: "soon", lens: "physical", stages: ["manufacturing", "operations"],
      published: true, contentStatus: "draft",
      problem: [], steps: [], kpis: [], features: [],
      media: {}, launch: { url: null, label: "Watch walkthrough" },
      contact: "DMS · Shreeram / Umashankar"
    },
    {
      id: "aiinfonix",
      name: "AiInfonix",
      tagline: "Interactive AI and factory-simulation walkthroughs.",
      summary: "Live demos and factory-simulation walkthroughs showcasing AiInfonix capabilities.",
      status: "soon", lens: "industrial", stages: ["manufacturing"],
      published: true, contentStatus: "draft",
      problem: [], steps: [], kpis: [], features: [],
      media: {}, launch: { url: null, label: "Launch demo" },
      contact: "PE · Aswini Kapil"
    },
    {
      id: "sdv-middleware",
      name: "SDV Middleware & Test Framework",
      tagline: "Eclipse S-CORE middleware on production SoCs.",
      summary: "LTTS middleware based on Eclipse SDV S-CORE running on Qualcomm 8295 and Renesas Gen4, with an SDV middleware test suite developed in Munich.",
      status: "soon", lens: "engineering", stages: ["software", "validation"],
      published: true, contentStatus: "draft",
      problem: [], steps: [], kpis: [], features: [],
      media: {}, launch: { url: null, label: "Launch demo" },
      contact: "Mobility · Dr Guru Prasad AS"
    },
    {
      id: "lca-automation",
      name: "AI-Assisted Life Cycle Assessment",
      tagline: "Eco-design and EPD readiness in weeks, not months.",
      summary: "AI-assisted LCA covering water, carbon and energy footprint, designed for eco-design and EU taxonomy / EPD certification requirements.",
      status: "soon", lens: "sustainability", stages: ["concept", "design"],
      published: true, contentStatus: "draft",
      problem: [], steps: [],
      kpis: [
        { value: "3 mo → 5 wk", label: "life cycle assessment duration" }
      ],
      features: [],
      media: {}, launch: { url: null, label: "Launch demo" },
      contact: "Mahesh Kumar Nagrajan"
    },
    {
      id: "substance-compliance",
      name: "PFAS & RoHS Substance Tracking",
      tagline: "Material compliance ahead of the 2027 EU deadlines.",
      summary: "AI-assisted material verification and validation for product compliance, tracking substances of concern such as PFAS across the bill of materials.",
      status: "soon", lens: "sustainability", stages: ["design", "manufacturing"],
      published: true, contentStatus: "draft",
      problem: [], steps: [], kpis: [], features: [],
      media: {}, launch: { url: null, label: "Launch demo" },
      contact: "Mahesh Kumar Nagrajan"
    },

    /* ================ Placeholders (not shown) ================ */
    {
      id: "arc", name: "ARC", tagline: "", summary: "",
      status: "soon", lens: "industrial", stages: [],
      published: false, contentStatus: "draft",
      problem: [], steps: [], kpis: [], features: [],
      media: {}, launch: { url: null, label: "Launch demo" },
      contact: "DMS · SAI · Shreyans"
    }
  ];

  if (typeof module === "object" && module.exports) {
    module.exports = demos;
  } else {
    root.EI_DATA = root.EI_DATA || {};
    root.EI_DATA.demos = demos;
  }
})(this);
