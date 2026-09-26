/*
 * EI Center — data store
 * ------------------------------------------------------------------
 * Pure, DOM-free query layer over data/site.js and data/demos.js.
 * Pages never read EI_DATA directly; they go through a store so that
 * visibility rules (published, customer-name privacy, launch state)
 * live in one place and are unit-tested.
 *
 *   var store = EI.createStore(EI_DATA.site, EI_DATA.demos);
 */
(function (root, factory) {
  "use strict";
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.EI = root.EI || {};
    var api = factory();
    root.EI.createStore = api.createStore;
    root.EI.validate = api.validate;
  }
})(this, function () {
  "use strict";

  var STATUSES = ["live", "remote", "soon"];
  var CONTENT_STATUSES = ["ready", "draft"];
  var ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

  /* Validate site + demo data. Returns an array of human-readable errors. */
  function validate(site, demos) {
    var errors = [];
    var lensIds = (site.lenses || []).map(function (l) { return l.id; });
    var stageIds = (site.stages || []).map(function (s) { return s.id; });
    var seen = {};

    if (!Array.isArray(demos)) {
      return ["demos must be an array"];
    }

    demos.forEach(function (d, i) {
      var where = "demos[" + i + "]" + (d && d.id ? " (" + d.id + ")" : "");
      if (!d || typeof d !== "object") { errors.push(where + ": not an object"); return; }

      if (!d.id || !ID_PATTERN.test(d.id)) errors.push(where + ": id must be kebab-case");
      if (seen[d.id]) errors.push(where + ": duplicate id");
      seen[d.id] = true;

      if (typeof d.published !== "boolean") errors.push(where + ": published must be true/false");
      if (STATUSES.indexOf(d.status) < 0) errors.push(where + ": status must be one of " + STATUSES.join("/"));
      if (CONTENT_STATUSES.indexOf(d.contentStatus) < 0) errors.push(where + ": contentStatus must be ready/draft");
      if (lensIds.indexOf(d.lens) < 0) errors.push(where + ": unknown lens '" + d.lens + "'");

      ["stages", "problem", "steps", "kpis", "features"].forEach(function (k) {
        if (!Array.isArray(d[k])) errors.push(where + ": " + k + " must be an array");
      });
      (d.stages || []).forEach(function (s) {
        if (stageIds.indexOf(s) < 0) errors.push(where + ": unknown stage '" + s + "'");
      });
      (d.kpis || []).forEach(function (k, j) {
        if (!k || !k.value || !k.label) errors.push(where + ": kpis[" + j + "] needs value and label");
      });
      (d.steps || []).concat(d.features || []).forEach(function (s, j) {
        if (!s || !s.title) errors.push(where + ": step/feature " + j + " needs a title");
      });

      if (!d.launch || typeof d.launch !== "object") {
        errors.push(where + ": launch must be an object");
      } else if (d.launch.url !== null && typeof d.launch.url !== "string") {
        errors.push(where + ": launch.url must be a string or null");
      }

      if (d.published) {
        ["name", "tagline", "summary"].forEach(function (k) {
          if (!d[k] || typeof d[k] !== "string") errors.push(where + ": published demo needs " + k);
        });
        if (!d.stages || d.stages.length === 0) errors.push(where + ": published demo needs at least one stage");
      }
    });

    ((site.proofs && site.proofs.items) || []).forEach(function (p, i) {
      if (!p.customerAlias) errors.push("proofs[" + i + "]: customerAlias is required");
      if (p.demoId && !seen[p.demoId]) errors.push("proofs[" + i + "]: unknown demoId '" + p.demoId + "'");
    });

    return errors;
  }

  function createStore(site, demos) {
    var published = demos.filter(function (d) { return d.published; });
    var statusOrder = { live: 0, remote: 1, soon: 2 };

    function sortByStatus(list) {
      return list.slice().sort(function (a, b) {
        return statusOrder[a.status] - statusOrder[b.status];
      });
    }

    return {
      site: site,

      /* All visible demos, live first. */
      demos: function () { return sortByStatus(published); },

      /* A single visible demo by id, or null. Unpublished ids return null. */
      get: function (id) {
        for (var i = 0; i < published.length; i++) {
          if (published[i].id === id) return published[i];
        }
        return null;
      },

      lens: function (id) {
        return (site.lenses || []).filter(function (l) { return l.id === id; })[0] || null;
      },

      stage: function (id) {
        return (site.stages || []).filter(function (s) { return s.id === id; })[0] || null;
      },

      /* [{ lens, demos: [...] }] in site.lenses order, empty lenses dropped. */
      byLens: function () {
        return (site.lenses || []).map(function (l) {
          return { lens: l, demos: sortByStatus(published.filter(function (d) { return d.lens === l.id; })) };
        }).filter(function (g) { return g.demos.length > 0; });
      },

      /* [{ stage, demos: [...] }] in lifecycle order, including empty stages. */
      byStage: function () {
        return (site.stages || []).map(function (s) {
          return { stage: s, demos: sortByStatus(published.filter(function (d) { return d.stages.indexOf(s.id) >= 0; })) };
        });
      },

      /* Headline stats with "auto:*" values resolved. */
      stats: function () {
        return (site.stats || []).map(function (s) {
          if (s.value === "auto:demos") return { value: String(published.length), label: s.label };
          if (s.value === "auto:live") {
            return { value: String(published.filter(function (d) { return d.status === "live"; }).length), label: s.label };
          }
          return s;
        });
      },

      /* Customer label respecting config.showCustomerNames. */
      customerName: function (proof) {
        var show = site.config && site.config.showCustomerNames;
        return (show && proof.customer) ? proof.customer : proof.customerAlias;
      },

      /*
       * What the Launch button should do.
       *   { enabled: true,  url, label }                 – link available
       *   { enabled: false, label: "Ask your host" }     – link pending
       */
      launchState: function (demo) {
        var l = demo.launch || {};
        if (l.url) return { enabled: true, url: l.url, label: l.label || "Launch demo" };
        return { enabled: false, url: null, label: "Ask your host to launch" };
      }
    };
  }

  return { createStore: createStore, validate: validate };
});
