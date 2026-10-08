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
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .pdf-export-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        border-radius: 0.5rem;
        padding: 0.5rem;
        background: var(--c-bg);
      }

      .pdf-export-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: var(--c-text);
        color: var(--c-bg);
        border: none;
        border-radius: 0.4rem;
        font-weight: 500;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .pdf-export-btn:hover {
        opacity: 0.85;
        transform: translateY(-2px);
      }

      .pdf-export-btn:active {
        opacity: 0.7;
        transform: translateY(0);
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
        .pdf-export-footer {
          background: var(--c-bg);
        }

        .pdf-export-btn {
          background: var(--c-text);
          color: var(--c-bg);
        }
      }

      @media print {
        .pdf-export-container {
          display: none !important;
        }

        /* Preserve theme colors in print output */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        body, html {
          background: var(--c-bg) !important;
          color: var(--c-text) !important;
        }
      }

      @media (max-width: 640px) {
        .pdf-export-container {
          bottom: 1rem;
        }

        .pdf-export-btn {
          padding: 0.65rem 1.25rem;
          font-size: 0.9rem;
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
    document.body.appendChild(container);
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
