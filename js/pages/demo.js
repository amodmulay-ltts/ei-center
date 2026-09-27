/*
 * EI Center — demo detail page
 * ------------------------------------------------------------------
 * Renders a single demo with full details, structured data, and markdown content.
 */
(function (root) {
  "use strict";
  var EI = root.EI;
  var h = EI.h;
  var ui = EI.ui;

  /* Get demo ID from URL query parameter (?id=...) */
  function getDemoIdFromUrl() {
    var params = new URLSearchParams(root.location.search);
    return params.get("id");
  }

  /*
   * Markdown → DOM nodes. Builds elements rather than setting innerHTML
   * so a write-up can never inject markup — same rule as EI.h. Covers
   * the subset the docs use: #/##/### headings, "- " bullets,
   * blank-line paragraphs, **bold**, *italic*.
   */
  function inline(text) {
    var out = [];
    var re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
    var last = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) out.push(text.slice(last, m.index));
      out.push(m[1] ? h("strong", null, m[1]) : h("em", null, m[2]));
      last = re.lastIndex;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
  }

  function renderMarkdown(md) {
    var blocks = [];
    var para = [];
    var bullets = [];

    function flushPara() {
      if (!para.length) return;
      blocks.push(h("p", null, inline(para.join(" "))));
      para = [];
    }
    function flushList() {
      if (!bullets.length) return;
      blocks.push(h("ul", null, bullets.map(function (b) {
        return h("li", null, inline(b));
      })));
      bullets = [];
    }

    md.split(/\r?\n/).forEach(function (line) {
      var t = line.trim();
      if (!t) { flushPara(); flushList(); return; }

      var head = /^(#{1,3})\s+(.*)$/.exec(t);
      if (head) {
        flushPara(); flushList();
        blocks.push(h("h" + head[1].length, null, inline(head[2])));
        return;
      }

      var bullet = /^[-*]\s+(.*)$/.exec(t);
      if (bullet) { flushPara(); bullets.push(bullet[1]); return; }

      flushList();
      para.push(t);
    });

    flushPara();
    flushList();
    return blocks;
  }

  /* Render header with back link and theme toggle */
  function demoHeader(store, demo) {
    return h("nav", { class: "demo-nav" },
      h("a", { class: "demo-nav__back", href: "index.html#gallery" },
        "← Back to all demos"
      ),
      h("div", { class: "demo-nav__brand" },
        h("span", { class: "demo-nav__mark" }, store.site.brand.short),
        h("span", { class: "demo-nav__center" }, store.site.brand.center)
      ),
      h("div", { class: "demo-nav__actions" },
        EI.theme.createToggleButton()
      )
    );
  }

  /* Render hero section with demo title and status */
  function demoHero(store, demo) {
    return h("div", { class: "demo-hero" },
      h("div", { class: "demo-hero__head" },
        h("h1", { class: "demo-hero__title" }, demo.name),
        h("p", { class: "demo-hero__tagline" }, demo.tagline),
        ui.statusBadge(store, demo.status)
      ),
      h("p", { class: "demo-hero__summary" }, demo.summary)
    );
  }

  /* Render problem section */
  function demoProblems(demo) {
    if (!demo.problem || !demo.problem.length) return null;
    return h("section", { class: "demo-section" },
      h("h2", null, "The challenge"),
      h("ul", { class: "demo-list" },
        demo.problem.map(function (p) {
          return h("li", null, p);
        })
      )
    );
  }

  /* Render steps section */
  function demoSteps(demo) {
    if (!demo.steps || !demo.steps.length) return null;
    return h("section", { class: "demo-section" },
      h("h2", null, "How it works"),
      h("ol", { class: "demo-steps" },
        demo.steps.map(function (s, i) {
          return h("li", { class: "demo-step" },
            h("span", { class: "demo-step__num" }, String(i + 1).padStart(2, "0")),
            h("div", null,
              h("h3", null, s.title),
              h("p", null, s.text)
            )
          );
        })
      )
    );
  }

  /* Render KPIs section */
  function demoKpis(demo) {
    if (!demo.kpis || !demo.kpis.length) return null;
    return h("section", { class: "demo-section" },
      h("h2", null, "Results"),
      h("div", { class: "demo-kpis" },
        demo.kpis.map(ui.kpiTile)
      )
    );
  }

  /* Render features section */
  function demoFeatures(demo) {
    if (!demo.features || !demo.features.length) return null;
    return h("section", { class: "demo-section" },
      h("h2", null, "Features"),
      h("ul", { class: "demo-features" },
        demo.features.map(function (f) {
          return h("li", { class: "demo-feature" },
            h("h3", null, f.title),
            h("p", null, f.text)
          );
        })
      )
    );
  }

  /* Render markdown content section */
  function demoContent(content) {
    if (!content) return null;
    return h("section", { class: "demo-section demo-section--content" },
      h("h2", null, "About"),
      h("div", { class: "demo-content" }, renderMarkdown(content))
    );
  }

  /* Render launch button */
  function demoLaunchButton(store, demo) {
    var launch = demo.launch || {};
    var url = launch.url;
    var label = launch.label || "Launch";

    if (url) {
      return h("a", { class: "demo-launch", href: url, target: "_blank" }, label);
    } else {
      return h("p", { class: "demo-launch demo-launch--unavailable" },
        "Ask your host to launch this demo"
      );
    }
  }

  /* Main render function */
  function render(target, store, demo, content) {
    EI.mount(target, h("div", { class: "demo-page demo-page--dashboard" },
      demoHeader(store, demo),
      h("main", { class: "demo-main" },
        h("section", { class: "demo-dashboard-hero" },
          demoHero(store, demo),
          h("div", { class: "demo-dashboard-actions" },
            demoLaunchButton(store, demo)
          )
        ),
        demoKpis(demo),
        h("div", { class: "demo-dashboard-grid" },
          h("div", { class: "demo-dashboard-col" },
            demoProblems(demo)
          ),
          h("div", { class: "demo-dashboard-col" },
            demoSteps(demo)
          ),
          h("div", { class: "demo-dashboard-col" },
            demoFeatures(demo)
          )
        ),
        demoContent(content)
      )
    ));

    ui.enableReveal(target);
  }

  /* Bootstrap the demo page */
  function boot() {
    var demoId = getDemoIdFromUrl();

    if (!demoId) {
      document.getElementById("app").textContent = "No demo specified. Use ?id=demo-name";
      return;
    }

    var data = root.EI_DATA;
    var store = EI.createStore(data.site, data.demos);
    var demo = store.get(demoId);

    if (!demo) {
      document.getElementById("app").textContent = "Demo not found: " + demoId;
      return;
    }

    var content = (data.docs || {})[demoId] || null;
    render(document.getElementById("app"), store, demo, content);
    document.documentElement.dataset.ready = "true";
    EI.demo = { store: store, demo: demo };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})(this);
