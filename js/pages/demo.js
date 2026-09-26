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

  /* Load markdown content from docs folder */
  function loadMarkdownContent(demoId) {
    return fetch("docs/" + demoId + "-about.md")
      .then(function (resp) {
        if (!resp.ok) {
          return fetch("docs/" + demoId + "-story.md")
            .then(function (r) { return r.text(); });
        }
        return resp.text();
      })
      .catch(function () {
        return null;
      });
  }

  /* Convert markdown to basic HTML (minimal, production-ready) */
  function markdownToHtml(md) {
    if (!md) return "";

    return md
      /* Headers */
      .replace(/^### (.*?)$/gm, "<h3>$1</h3>")
      .replace(/^## (.*?)$/gm, "<h2>$1</h2>")
      .replace(/^# (.*?)$/gm, "<h1>$1</h1>")
      /* Bold and italic */
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      /* Lists */
      .replace(/^- (.*?)$/gm, "<li>$1</li>")
      .replace(/(<li>.*?<\/li>)/s, function (match) {
        return "<ul>" + match + "</ul>";
      })
      /* Line breaks for paragraphs */
      .replace(/\n\n+/g, "</p><p>")
      .replace(/^(?!<)/, "<p>")
      .replace(/$(?!<)/, "</p>");
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
      h("div", { class: "demo-content", innerHTML: markdownToHtml(content) })
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
    EI.mount(target, h("div", { class: "demo-page" },
      demoHeader(store, demo),
      h("main", { class: "demo-main" },
        demoHero(store, demo),
        h("div", { class: "demo-details" },
          demoProblems(demo),
          demoSteps(demo),
          demoKpis(demo),
          demoFeatures(demo),
          demoContent(content),
          h("div", { class: "demo-cta" },
            demoLaunchButton(store, demo)
          )
        )
      )
    ));
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

    loadMarkdownContent(demoId).then(function (content) {
      render(document.getElementById("app"), store, demo, content);
      document.documentElement.dataset.ready = "true";
      EI.demo = { store: store, demo: demo };
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})(this);
