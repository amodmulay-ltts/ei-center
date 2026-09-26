#!/usr/bin/env node
/*
 * Debug helper: load a page headlessly and print what the browser saw.
 *   node tools/probe.js "index.html#lifecycle"
 * The page may expose window.EI_PROBE() returning a string; its output
 * is written into <html data-probe> after load so --dump-dom captures it.
 */
const { pageUrl, load } = require("./browser.js");
const target = process.argv[2] || "index.html";
const [file, ...rest] = target.split(/(?=[#?])/);
const { dom, console: logs } = load(pageUrl(file, rest.join("")) + "", { width: 3840, height: 2160 });
const probe = (dom.match(/data-probe="([^"]*)"/) || [])[1];
console.log("probe:", probe ? probe.replace(/&quot;/g, '"') : "(none)");
console.log("console:", logs.length ? "\n  " + logs.join("\n  ") : "(clean)");
console.log("dom bytes:", dom.length);
