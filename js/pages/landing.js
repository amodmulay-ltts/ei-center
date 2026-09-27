/*
 * EI Center — landing page
 * ------------------------------------------------------------------
 * Renders the sections listed in site.config.sections, in order.
 * To add a section: add a content block to data/site.js, a renderer
 * to SECTIONS below, its id to config.sections, and a nav label.
 */
(function (root) {
  "use strict";
  var EI = root.EI;
  var h = EI.h;
  var ui = EI.ui;

  /* ---------------- Section renderers ---------------- */

  var SECTIONS = {

    hero: function (store) {
      var c = store.site.hero;
      return [
        h("div", { class: "hero__body" },
          h("p", { class: "eyebrow reveal" }, c.eyebrow),
          h("h1", { class: "hero__title reveal" }, c.title),
          h("p", { class: "hero__subtitle reveal" }, c.subtitle),
          h("p", { class: "hero__lead reveal" }, c.lead)
        ),
        h("ul", { class: "stats" },
          store.stats().map(function (s) {
            return h("li", { class: "stat reveal" },
              h("span", { class: "stat__value" }, s.value),
              h("span", { class: "stat__label" }, s.label)
            );
          })
        )
      ];
    },

    discipline: function (store) {
      var c = store.site.discipline;
      return [
        h("p", { class: "eyebrow" }, c.eyebrow),
        h("p", { class: "lead" }, c.lead),
        h("div", { class: "discipline__grid" },
          c.lenses.map(function (lens, i) {
            return h("div", { class: "discipline__lens lens lens--" + lens.id + " reveal", style: { "--i": i } },
              h("span", { class: "discipline__num" }, lens.num),
              h("span", { class: "discipline__lens-name" }, lens.name)
            );
          })
        )
      ];
    },

    thesis: function (store) {
      var c = store.site.thesis;
      return [
        ui.sectionHead(c),
        h("ul", { class: "capabilities" },
          c.capabilities.map(function (cap, i) {
            return h("li", { class: "capability reveal", style: { "--i": i } },
              h("span", { class: "capability__index" }, String(i + 1).padStart(2, "0")),
              h("span", { class: "capability__name" }, cap)
            );
          })
        )
      ];
    },

    airgap: function (store) {
      var c = store.site.airgap;
      return [
        ui.sectionHead(c),
        h("ul", { class: "pillars" },
          c.pillars.map(function (p, i) {
            return h("li", { class: "pillar reveal", style: { "--i": i } },
              h("h3", { class: "pillar__title" }, p.title),
              h("p", { class: "pillar__text" }, p.text)
            );
          })
        )
      ];
    },

    lifecycle: function (store) {
      return [
        ui.sectionHead(store.site.lifecycle),
        h("ol", { class: "lifecycle" },
          store.byStage().map(function (g, i) {
            return h("li", { class: "lifecycle__stage reveal", style: { "--i": i }, dataset: { stage: g.stage.id } },
              h("div", { class: "lifecycle__head" },
                h("span", { class: "lifecycle__node", "aria-hidden": "true" }),
                h("span", { class: "lifecycle__name" }, g.stage.name)
              ),
              h("div", { class: "lifecycle__demos" },
                g.demos.map(function (d) { return ui.demoChip(store, d); })
              )
            );
          })
        ),
        h("div", { class: "legend" },
          ["live", "remote", "soon"].map(function (s) { return ui.statusBadge(store, s); })
        )
      ];
    },

    gallery: function (store) {
      var grid = h("div", { class: "gallery__grid" },
        store.demos().map(function (d) { return ui.demoCard(store, d); })
      );

      function applyFilter(lensId, btn) {
        grid.querySelectorAll(".demo-card").forEach(function (card) {
          card.hidden = lensId !== "all" && card.dataset.lens !== lensId;
        });
        btn.parentNode.querySelectorAll(".filter").forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
      }

      function filterButton(id, label) {
        return h("button", {
          class: "filter" + (id === "all" ? "" : " lens lens--" + id),
          type: "button",
          "aria-pressed": String(id === "all"),
          dataset: { filter: id },
          on: { click: function (e) { applyFilter(id, e.currentTarget); } }
        }, label);
      }

      return [
        h("div", { class: "gallery__head" },
          ui.sectionHead(store.site.gallery),
          h("div", { class: "filters", role: "group", "aria-label": "Filter by lens" },
            filterButton("all", store.site.labels.allLenses),
            store.byLens().map(function (g) { return filterButton(g.lens.id, g.lens.name); })
          )
        ),
        grid
      ];
    },

    proofs: function (store) {
      var c = store.site.proofs;
      return [
        ui.sectionHead(c),
        h("div", { class: "proofs" },
          c.items.map(function (p) {
            var linked = p.demoId && store.get(p.demoId);
            return h(linked ? "a" : "article", {
                class: "proof reveal",
                href: linked ? ui.demoUrl(p.demoId) : null,
                dataset: { proof: p.id }
              },
              h("p", { class: "proof__customer" }, store.customerName(p)),
              h("h3", { class: "proof__title" }, p.title),
              h("p", { class: "proof__standard" }, p.standard),
              h("div", { class: "proof__kpis" }, p.kpis.map(ui.kpiTile))
            );
          })
        )
      ];
    },

    engagement: function (store) {
      var c = store.site.engagement;
      return [
        ui.sectionHead(c),
        h("ol", { class: "journey" },
          c.steps.map(function (s, i) {
            return h("li", { class: "journey__step reveal", style: { "--i": i } },
              h("span", { class: "journey__index" }, String(i + 1).padStart(2, "0")),
              h("h3", { class: "journey__title" }, s.title),
              h("p", { class: "journey__text" }, s.text)
            );
          })
        ),
        h("p", { class: "journey__cta reveal" }, c.cta)
      ];
    }
  };

  /* ---------------- Page chrome ---------------- */

  function navBar(store, ids) {
    var b = store.site.brand;
    return h("nav", { class: "topnav", "aria-label": "Sections" },
      h("a", { class: "topnav__brand", href: "#hero" },
        h("span", { class: "topnav__mark" }, b.short),
        h("span", { class: "topnav__center" }, b.center + " · " + b.location)
      ),
      h("ul", { class: "topnav__links" },
        ids.map(function (id) {
          return h("li", null, h("a", { href: "#" + id, dataset: { nav: id } }, store.site.labels.nav[id] || id));
        })
      ),
      h("div", { class: "topnav__actions" },
        EI.theme.createToggleButton()
      )
    );
  }

  /* Highlight the nav link of the section currently in view. */
  function trackActiveSection() {
    if (!("IntersectionObserver" in root)) return;
    var links = {};
    document.querySelectorAll("[data-nav]").forEach(function (a) { links[a.dataset.nav] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
        var a = links[e.target.id];
        if (a) a.setAttribute("aria-current", "true");
      });
    }, { threshold: 0.5 });
    document.querySelectorAll(".section").forEach(function (s) { io.observe(s); });
  }

  function render(target, store) {
    var ids = store.site.config.sections.filter(function (id) {
      if (SECTIONS[id]) return true;
      root.console && root.console.warn("[EI Center] no renderer for section '" + id + "'");
      return false;
    });

    EI.mount(target, [
      navBar(store, ids),
      h("main", { class: "sections" },
        ids.map(function (id) {
          return h("section", { id: id, class: "section section--" + id, "aria-label": store.site.labels.nav[id] || id },
            h("div", { class: "section__inner" }, SECTIONS[id](store))
          );
        })
      )
    ]);

    ui.enableReveal(target);
    trackActiveSection();

    /* Content is rendered after load, so honour #hash manually. */
    if (root.location.hash) {
      var el = document.getElementById(root.location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    }
    return ids;
  }

  function boot() {
    var data = root.EI_DATA;
    EI.reportDataErrors(data.site, data.demos);
    var store = EI.createStore(data.site, data.demos);
    var ids = render(document.getElementById("app"), store);
    document.documentElement.dataset.ready = "true";
    EI.landing.store = store;
    EI.landing.sections = ids;
  }

  EI.landing = { SECTIONS: SECTIONS, render: render, boot: boot };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})(this);
