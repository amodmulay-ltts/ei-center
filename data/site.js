/*
 * EI Center — site-level content and configuration
 * ------------------------------------------------------------------
 * Everything shown on the landing page that is NOT a demo lives here.
 * Edit text freely; keep the keys. See docs/CONTENT-GUIDE.md.
 *
 * Loaded as a classic <script> (works from file:// in kiosk mode) and
 * via require() in Node tests.
 */
(function (root) {
  "use strict";

  var site = {
    config: {
      /*
       * When false, customer proof cards show `customerAlias` instead of
       * `customer`. Keep false until names are cleared for display to
       * other visiting customers.
       */
      showCustomerNames: false,

      /* Minutes of inactivity before the screen returns to attract mode. */
      idleTimeoutMinutes: 3,

      /* Seconds each landing section is shown while in attract mode. */
      attractSlideSeconds: 12,

      /*
       * Landing-page sections, top to bottom. Remove or reorder ids to
       * change the page. Each id needs a renderer in js/pages/landing.js
       * and a content block of the same name below.
       */
      sections: ["hero", "airgap", "discipline", "stack", "lifecycle", "gallery", "proofs", "engagement", "ai-models"]
    },

    labels: {
      status: {
        live:   "Live in Munich",
        remote: "Remote",
        soon:   "Coming soon"
      },
      nav: {
        hero:       "Overview",
        discipline: "The Discipline",
        stack:      "The Stack",
        airgap:     "AI Café",
        lifecycle:  "Lifecycle",
        gallery:    "Demos",
        proofs:     "Results",
        engagement: "Work with us",
        "ai-models": "AI Models"
      },
      allLenses: "All",
      explore: "Explore",
      back: "Back to overview"
    },

    brand: {
      company: "L&T Technology Services",
      short: "LTTS",
      center: "Engineering Intelligence Center",
      location: "Munich"
    },

    hero: {
      eyebrow: "L&T Technology Services · Munich",
      title: "Engineering Intelligence Center",
      subtitle: "Europe's first.",
      lead: "An air-gapped space where your engineers and ours build, test and explore applied AI across the product lifecycle, without your data ever leaving the room."
    },

    /*
     * Headline stats. `value: "auto:demos"` is computed at runtime from
     * the number of published demos, so it never goes stale.
     */
    stats: [
      { value: "60+",        label: "clients served across Europe" },
      { value: "1,500+",     label: "engineers in the region" },
      { value: "#1",         label: "largest LTTS design center in Europe" },
      { value: "auto:demos", label: "AI solutions on show" }
    ],

    /*
     * The four lenses of the discipline. `id` must be a lens id from
     * `lenses` below; the card takes its colour and demo count from it.
     */
    discipline: {
      eyebrow: "What is Engineering Intelligence",
      title: "Intelligence engineered in, not bolted on.",
      lead: "The discipline of building intelligence into everything we engineer, and everything we engineer with. One discipline, applied through four lenses.",
      lenses: [
        { id: "engineering", num: "01", name: "Engineering AI",
          headline: "Products designed with intelligence.",
          text: "AI inside the V-model, from requirement to verified design, with every output traced to its source." },
        { id: "agentic", num: "02", name: "Agentic AI",
          headline: "Work that runs itself, under governance.",
          text: "Agents that plan, act and hand off across engineering and manufacturing, with people approving what matters." },
        { id: "physical", num: "03", name: "Physical AI",
          headline: "Products that sense, think and learn.",
          text: "On-device intelligence at the edge, built for safety-critical, certified domains." },
        { id: "industrial", num: "04", name: "Industrial AI",
          headline: "Factories that improve themselves.",
          text: "AI anchored in the OT stack, from shop-floor quality to lights-out production." }
      ]
    },

    /* The Engineering Intelligence Stack, listed top (6) to bottom (1). */
    stack: {
      eyebrow: "The Engineering Intelligence Stack",
      title: "Six layers, from complexity to outcomes.",
      lead: "AI is only as good as what lies beneath it. We engineer every layer, so what works in this room holds up in production.",
      layers: [
        { num: 6, name: "Intelligent Outcomes", question: "What changes in the world",
          text: "Software-defined mobility, intelligent care, autonomous and sustainable plants, resilient energy." },
        { num: 5, name: "EI Assets", question: "How intelligence is put to work",
          text: "Proven platforms such as PLxAI, AiTest, AgenticIQ and SiMa.ai. The solutions you can try in this room." },
        { num: 4, name: "Intelligence Layer", question: "How systems learn, reason and act",
          text: "The four lenses: Engineering, Agentic, Physical and Industrial AI.", highlight: true },
        { num: 3, name: "Digital Foundations", question: "How complex systems become AI-ready",
          text: "Digital twins, platform modernisation and integration across OPC UA, AUTOSAR, SOME/IP, A2A and MCP." },
        { num: 2, name: "Engineering Data", question: "How knowledge is captured and governed",
          text: "Pipelines, curation, domain-specific labelling, governance and security that make engineering knowledge usable by AI." },
        { num: 1, name: "Environments", question: "Where the complexity lives",
          text: "Vehicles, medical devices, factory OT from L0 to L4, robots, industrial infrastructure, telecom, silicon and data centres." }
      ]
    },

    airgap: {
      eyebrow: "The AI Café",
      title: "No gatekeepers. No friction.",
      lead: "Where corporate red tape disappears. Explore fearlessly, experiment without approval loops, iterate quickly, and build something awesome — together, on your terms.",
      pillars: [
        { title: "Local LLMs",        text: "State-of-the-art open models running on hardware inside the center." },
        { title: "Air-gapped",        text: "No external API calls. Nothing leaves the network." },
        { title: "No lock-in",        text: "Your models, your environment. Around 90% pre-built, 10% tailored to you." },
        { title: "Explore. Fail. Build.",   text: "Your playground for AI. Where you experiment freely, iterate fast, and build something awesome." }
      ]
    },

    /*
     * Solution lenses. `id` must match the CSS lens class
     * (.lens--<id>) and the --c-lens-<id> token.
     */
    lenses: [
      { id: "engineering",    name: "Engineering AI",   text: "Design, requirements and test intelligence." },
      { id: "agentic",        name: "Agentic AI",       text: "Agents and workflows that execute at scale." },
      { id: "physical",       name: "Physical AI",      text: "Edge, vision, robotics and digital twins." },
      { id: "industrial",     name: "Industrial AI",    text: "Quality, traceability and factory operations." },
      { id: "sustainability", name: "Sustainable AI",   text: "Eco-design, LCA and substance compliance." }
    ],

    lifecycle: {
      eyebrow: "Across the lifecycle",
      title: "AI at every stage of engineering.",
      lead: "From the first RFQ to the service bay. Select any solution to explore it."
    },

    gallery: {
      eyebrow: "Solutions",
      title: "Explore the demos.",
      lead: "Every solution runs on the customer's own data, models and environment."
    },

    /* Product-development lifecycle stages, left to right. */
    stages: [
      { id: "concept",       name: "Concept & RFQ" },
      { id: "requirements",  name: "Requirements" },
      { id: "design",        name: "Design & CAD" },
      { id: "software",      name: "Software" },
      { id: "validation",    name: "Test & Safety" },
      { id: "manufacturing", name: "Manufacturing" },
      { id: "operations",    name: "Operations & Service" }
    ],

    proofs: {
      eyebrow: "Proven in production",
      title: "Documents in. Certified work out.",
      lead: "One pipeline, three standards: ingest the customer's own documents, let AI do the reading, and keep the engineer as the approver.",
      items: [
        {
          id: "hara",
          customer: null,
          customerAlias: "Industrial machinery OEM",
          title: "HARA from 2 weeks to 2 days",
          standard: "ISO 12100",
          kpis: [
            { value: "85%", label: "faster per HARA" },
            { value: "40%", label: "lower labour cost" },
            { value: "95%", label: "completeness accuracy" }
          ]
        },
        {
          id: "verification",
          customer: "BMW",
          customerAlias: "German premium OEM",
          demoId: "aitest",
          title: "Verification at scale",
          standard: "AiTest",
          kpis: [
            { value: "+72%", label: "test throughput" },
            { value: "86%",  label: "faster defect triage" },
            { value: "390",  label: "new assets in 12 weeks" }
          ]
        },
        {
          id: "fmea",
          customer: "CARIAD · Volkswagen Group",
          customerAlias: "European automotive software company",
          title: "FMEA authoring under audit",
          standard: "ISO 26262",
          kpis: [
            { value: "85%",   label: "faster FMEA authoring" },
            { value: "<90 s", label: "to index the full corpus" },
            { value: "100%",  label: "rows traced to source" }
          ]
        }
      ]
    },

    engagement: {
      eyebrow: "How we work together",
      title: "From first conversation to production.",
      steps: [
        { title: "Experience", text: "Live demos on your engineering problems, not ours." },
        { title: "Co-create",  text: "Design-thinking and discovery workshops to frame use cases." },
        { title: "Build",      text: "Innovation Garage: a working MVP in 2 to 6 weeks." },
        { title: "Scale",      text: "Pilot-to-program in your environment, on your models." }
      ],
      cta: "Start with a 2-day Engineering Intelligence workshop, here in Munich."
    },

    "ai-models": {
      eyebrow: "AI Model Strategy",
      title: "Match the model to the task.",
      lead: "Intelligence is a portfolio, not a single model. Choose by task complexity, cost, capability and governance needs. Prices reflect October 2026 market rates.",
      thesis: "Do not use a Formula 1 car to deliver a pizza.",
      models: [
        {
          level: 0,
          name: "No AI",
          capability: "Lowest cost",
          examples: "Transformation, validation, formatting, static analysis, build automation.",
          use: "Deterministic tasks with clear rules. No learning required.",
          costRange: "EUR 0 (rule-based processing)"
        },
        {
          level: 1,
          name: "Local & Small Models",
          capability: "Efficient & private",
          examples: "Ticket classification, code clustering, log summarisation, test-data generation.",
          use: "Routine work that doesn't need frontier capability. Runs on your hardware.",
          costRange: "USD 0.0002–0.40 per million tokens (Llama, Mistral, DeepSeek V4-Flash)"
        },
        {
          level: 2,
          name: "Enterprise Models",
          capability: "Balanced",
          examples: "Requirements analysis, code generation, unit tests, documentation, RAG, debugging, migration.",
          use: "Core engineering tasks. Accuracy, consistency and governance matter.",
          costRange: "USD 1.20–10 per million tokens (Claude 3.5, GPT-4o, Gemini 2.5)"
        },
        {
          level: 3,
          name: "Hybrid & Multi-Model",
          capability: "Flexible",
          examples: "Routing requests by task, complexity and cost. Combining small and frontier models.",
          use: "Intelligence as a portfolio. Route each request to the cheapest sufficient model.",
          costRange: "Blended: typically USD 2–6 per million tokens"
        },
        {
          level: 4,
          name: "Frontier Models",
          capability: "Highest capability",
          examples: "Complex architecture decisions, hard debugging, cross-system and security analysis.",
          use: "Novel problems, creativity, safety-critical decisions.",
          costRange: "USD 3–30 per million tokens (Claude 4 Opus, GPT-5 Turbo, Gemini 3.6)"
        }
      ],
      insight: "DeepSeek V3.5 offers frontier-class capability at USD 0.40/M tokens input. At Volkswagen's inference volumes, routing between cost tiers creates the largest margin. Context window penalties (2× for >64K tokens) reshape ROI on RAG pipelines.",
      footer: "Strategy → Capability → Cost. In that order."
    }
  };

  if (typeof module === "object" && module.exports) {
    module.exports = site;
  } else {
    root.EI_DATA = root.EI_DATA || {};
    root.EI_DATA.site = site;
  }
})(this);
