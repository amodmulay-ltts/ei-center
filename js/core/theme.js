/*
 * EI Center — theme management
 * ------------------------------------------------------------------
 * Handles dark/light theme switching with localStorage persistence.
 */
(function (root) {
  "use strict";

  var STORAGE_KEY = "ei-center-theme";
  var THEMES = ["dark", "light"];
  var DEFAULT_THEME = "dark";

  /* Get the current theme from DOM, storage, or system preference */
  function getCurrentTheme() {
    var stored = root.localStorage.getItem(STORAGE_KEY);
    if (stored && THEMES.indexOf(stored) !== -1) return stored;

    var html = document.documentElement;
    var attr = html.getAttribute("data-theme");
    if (attr && THEMES.indexOf(attr) !== -1) return attr;

    if (root.matchMedia && root.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }

    return DEFAULT_THEME;
  }

  /* Apply a theme to the DOM and save to localStorage */
  function applyTheme(theme) {
    if (THEMES.indexOf(theme) === -1) return;

    document.documentElement.setAttribute("data-theme", theme);
    root.localStorage.setItem(STORAGE_KEY, theme);
    root.EI.currentTheme = theme;

    /* Dispatch event for other components to listen to */
    var event = new root.CustomEvent("theme-changed", { detail: { theme: theme } });
    document.dispatchEvent(event);
  }

  /* Toggle between dark and light */
  function toggleTheme() {
    var current = getCurrentTheme();
    var next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    return next;
  }

  /* Create a theme toggle button */
  function createToggleButton() {
    var h = root.EI.h;
    var current = getCurrentTheme();

    return h("button", {
      class: "theme-toggle",
      type: "button",
      title: "Toggle dark/light theme",
      "aria-label": "Toggle dark/light theme",
      dataset: { theme: current },
      on: {
        click: function () {
          var next = toggleTheme();
          this.dataset.theme = next;
          this.setAttribute("aria-pressed", String(next === "light"));
        }
      }
    },
      h("span", { class: "theme-toggle__icon", "aria-hidden": "true" },
        current === "dark" ? "☀" : "☾"
      )
    );
  }

  /* Initialize theme on page load */
  function init() {
    var theme = getCurrentTheme();
    applyTheme(theme);
  }

  root.EI.theme = {
    getCurrentTheme: getCurrentTheme,
    applyTheme: applyTheme,
    toggleTheme: toggleTheme,
    createToggleButton: createToggleButton,
    init: init
  };

  /* Auto-init if EI exists */
  if (root.EI && document.readyState !== "loading") {
    init();
  } else if (root.EI) {
    document.addEventListener("DOMContentLoaded", init);
  }
})(this);
