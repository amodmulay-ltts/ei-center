/*
 * EI Center — minimal DOM builder
 * ------------------------------------------------------------------
 *   EI.h("a", { class: "card", href: "#x", on: { click: fn } }, "text", child, [more])
 *
 * - Strings become text nodes (never parsed as HTML → content can't
 *   inject markup).
 * - null / undefined / false children are skipped, arrays are flattened,
 *   so conditional rendering is just `cond && h(...)`.
 * - attrs: `class`, `dataset: {}`, `on: { event: handler }`, `style: {}`,
 *   booleans set/omit the attribute, everything else → setAttribute.
 */
(function (root) {
  "use strict";

  function append(el, child) {
    if (child === null || child === undefined || child === false) return;
    if (Array.isArray(child)) { child.forEach(function (c) { append(el, c); }); return; }
    el.appendChild(typeof child === "object" ? child : document.createTextNode(String(child)));
  }

  function h(tag, attrs) {
    var el = document.createElement(tag);
    var a = attrs || {};
    Object.keys(a).forEach(function (k) {
      var v = a[k];
      if (v === null || v === undefined || v === false) return;
      if (k === "class") el.className = v;
      else if (k === "dataset") Object.keys(v).forEach(function (d) { el.dataset[d] = v[d]; });
      else if (k === "style") Object.keys(v).forEach(function (s) { el.style.setProperty(s, v[s]); });
      else if (k === "on") Object.keys(v).forEach(function (e) { el.addEventListener(e, v[e]); });
      else if (v === true) el.setAttribute(k, "");
      else el.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }

  function mount(target, node) {
    while (target.firstChild) target.removeChild(target.firstChild);
    append(target, node);
    return target;
  }

  /* Run page validation and log problems without blocking render. */
  function reportDataErrors(site, demos) {
    if (!root.EI.validate) return [];
    var errors = root.EI.validate(site, demos);
    if (errors.length && root.console) {
      root.console.warn("[EI Center] content problems (" + errors.length + "). See docs/CONTENT-GUIDE.md");
      errors.forEach(function (e) { root.console.warn("  • " + e); });
    }
    return errors;
  }

  root.EI = root.EI || {};
  root.EI.h = h;
  root.EI.mount = mount;
  root.EI.reportDataErrors = reportDataErrors;
})(this);
