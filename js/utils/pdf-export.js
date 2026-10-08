/*
 * PDF Export utility
 * ------------------------------------------------------------------
 * Adds a PDF export button at the bottom of the page that captures
 * the rendered content with full design and color preservation.
 */
(function (root) {
  "use strict";

  function initPDFExport() {
    addStyles();
    waitForDOM(insertExportButton);
  }

  function addStyles() {
    var style = document.createElement("style");
    style.textContent = `
      .pdf-export-container {
        padding: 2rem 0;
        display: flex;
        justify-content: center;
      }

      .pdf-export-footer {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .pdf-export-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: var(--c-text);
        color: var(--c-bg);
        border: none;
        border-radius: 0.5rem;
        font-weight: 500;
        font-size: 0.95rem;
        cursor: pointer;
        transition: opacity 0.2s ease;
      }

      .pdf-export-btn:hover {
        opacity: 0.85;
      }

      .pdf-export-btn:active {
        opacity: 0.7;
      }

      .pdf-export-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .pdf-export-btn svg {
        margin-right: 0.25rem;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @media (prefers-color-scheme: dark) {
        .pdf-export-btn {
          background: var(--c-text);
          color: var(--c-bg);
        }
      }

      @media print {
        .pdf-export-container {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function waitForDOM(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function insertExportButton() {
    var app = document.getElementById("app");
    if (!app) return;

    var container = document.createElement("div");
    container.className = "pdf-export-container";

    var footer = document.createElement("div");
    footer.className = "pdf-export-footer";

    var btn = document.createElement("button");
    btn.id = "exportPdfBtn";
    btn.className = "pdf-export-btn";
    btn.title = "Export page as PDF";
    btn.type = "button";

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("fill", "currentColor");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z");
    svg.appendChild(path);

    var label = document.createTextNode("Export as PDF");

    btn.appendChild(svg);
    btn.appendChild(label);
    btn.addEventListener("click", exportToPDF);

    footer.appendChild(btn);
    container.appendChild(footer);
    app.parentNode.insertBefore(container, app.nextSibling);
  }

  function exportToPDF() {
    var btn = document.getElementById("exportPdfBtn");
    var originalBtn = btn.cloneNode(true);
    btn.disabled = true;

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("fill", "currentColor");
    svg.style.animation = "spin 1s linear infinite";
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "12");
    circle.setAttribute("cy", "12");
    circle.setAttribute("r", "10");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "currentColor");
    circle.setAttribute("stroke-width", "2");
    svg.appendChild(circle);

    btn.textContent = "";
    btn.appendChild(svg);
    btn.appendChild(document.createTextNode(" Generating..."));

    // Trigger print dialog
    setTimeout(function () {
      window.print();
      restoreButton(btn, originalBtn);
    }, 100);
  }

  function restoreButton(btn, originalBtn) {
    setTimeout(function () {
      btn.disabled = false;
      btn.textContent = "";
      var newSvg = originalBtn.querySelector("svg");
      var label = originalBtn.textContent;
      if (newSvg) {
        btn.appendChild(newSvg.cloneNode(true));
      }
      btn.appendChild(document.createTextNode(label));
    }, 1500);
  }

  // Initialize when the script loads
  initPDFExport();
})(window);
