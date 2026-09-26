/*
 * EI Center — shared UI components
 * ------------------------------------------------------------------
 * Small pure functions: (store, data) → DOM node. Used by both the
 * landing page and demo pages so the visual language stays identical.
 * Styles live in css/base.css (primitives) and css/components.css.
 */
(function (root) {
  "use strict";
  var h = root.EI.h;

  function demoUrl(id) {
    return "demo.html?id=" + encodeURIComponent(id);
  }

  function statusBadge(store, status) {
    return h("span", { class: "badge badge--" + status }, store.site.labels.status[status] || status);
  }

  function lensTag(store, lensId) {
    var lens = store.lens(lensId);
    return h("span", { class: "lens lens--" + lensId }, lens ? lens.name : lensId);
  }

  /* Eyebrow + headline + optional lead, used at the top of every section. */
  function sectionHead(block, opts) {
    var o = opts || {};
    return h("header", { class: "section-head" + (o.center ? " section-head--center" : "") },
      block.eyebrow && h("p", { class: "eyebrow reveal" }, block.eyebrow),
      h(o.level || "h2", { class: "section-head__title reveal" }, block.title),
      block.lead && h("p", { class: "section-head__lead reveal" }, block.lead)
    );
  }

  function kpiTile(kpi) {
    return h("div", { class: "kpi reveal" },
      h("div", { class: "kpi__value" }, kpi.value),
      h("div", { class: "kpi__label" }, kpi.label)
    );
  }

  function demoCard(store, demo) {
    return h("a", {
        class: "demo-card reveal",
        href: demoUrl(demo.id),
        dataset: { demo: demo.id, lens: demo.lens, status: demo.status }
      },
      h("div", { class: "demo-card__top" },
        lensTag(store, demo.lens),
        statusBadge(store, demo.status)
      ),
      h("h3", { class: "demo-card__name" }, demo.name),
      h("p", { class: "demo-card__tagline" }, demo.tagline),
      h("span", { class: "demo-card__go", "aria-hidden": "true" }, "→")
    );
  }

  /* Compact pill used on the lifecycle map. */
  function demoChip(store, demo) {
    return h("a", {
        class: "demo-chip demo-chip--" + demo.status + " lens--" + demo.lens,
        href: demoUrl(demo.id),
        dataset: { demo: demo.id }
      },
      h("span", { class: "demo-chip__dot", "aria-hidden": "true" }),
      h("span", { class: "demo-chip__name" }, demo.name)
    );
  }

  /*
   * Mark .reveal elements visible as they enter the viewport. Falls back
   * to showing everything when IntersectionObserver is unavailable.
   */
  function enableReveal(scope) {
    var els = (scope || document).querySelectorAll(".reveal");
    if (!("IntersectionObserver" in root)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
  }

  root.EI.ui = {
    demoUrl: demoUrl,
    statusBadge: statusBadge,
    lensTag: lensTag,
    sectionHead: sectionHead,
    kpiTile: kpiTile,
    demoCard: demoCard,
    demoChip: demoChip,
    enableReveal: enableReveal
  };
})(this);
