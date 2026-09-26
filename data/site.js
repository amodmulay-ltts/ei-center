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
      sections: ["hero", "thesis", "airgap", "lifecycle", "gallery", "proofs", "engagement"]
    },

    labels: {
      status: {
        live:   "Live in Munich",
        remote: "Remote",
        soon:   "Coming soon"
      },
      nav: {
        hero:       "Overview",
        thesis:     "Our approach",
        airgap:     "AI Café",
        lifecycle:  "Lifecycle",
        gallery:    "Demos",
        proofs:     "Results",
        engagement: "Work with us"
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

    thesis: {
      eyebrow: "What is Engineering Intelligence",
      title: "AI built into the V-model, not bolted on.",
      lead: "We are an engineering company applying AI to engineering work: design, requirements, test, safety and manufacturing. Cost, speed and quality on real engineering problems.",
      capabilities: ["Generative AI", "Agentic AI", "Multimodal AI", "Physical AI", "Edge Intelligence"]
    },

    airgap: {
      eyebrow: "The AI Café",
      title: "Your data stays in the room.",
      lead: "The center runs on an air-gapped network with local models, so teams can work with real engineering data without navigating corporate or customer data-protection approvals first.",
      pillars: [
        { title: "Local LLMs",        text: "State-of-the-art open models running on hardware inside the center." },
        { title: "Air-gapped",        text: "No external API calls. Nothing leaves the network." },
        { title: "EU AI Act ready",   text: "Human approval, traceability and audit-ready evidence by design." },
        { title: "No lock-in",        text: "Your models, your environment. Around 90% pre-built, 10% tailored to you." }
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
    }
  };

  if (typeof module === "object" && module.exports) {
    module.exports = site;
  } else {
    root.EI_DATA = root.EI_DATA || {};
    root.EI_DATA.site = site;
  }
})(this);
