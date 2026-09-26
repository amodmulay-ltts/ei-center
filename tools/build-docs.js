#!/usr/bin/env node
/*
 * Compile docs/<demo>.md into data/docs.js so demo pages can show the
 * long-form write-up. Generated as a plain <script> payload because the
 * display runs offline from file://, where fetch() is blocked.
 *
 *   npm run build:docs
 *
 * A demo's doc is matched case-insensitively as "<id>-about.md" or
 * "<id>-story.md". ALIASES covers ids whose file is named differently.
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "docs");
const OUT = path.join(ROOT, "data", "docs.js");

/* demo id → doc basename, for files that don't follow "<id>-about|story.md". */
const ALIASES = { plxai: "plx-ai" };

const demos = require("../data/demos.js");
const files = fs.readdirSync(DOCS).filter((f) => f.endsWith(".md"));

function findDoc(id) {
  const base = (ALIASES[id] || id).toLowerCase();
  return files.find((f) => {
    const n = f.toLowerCase();
    return n === base + "-about.md" || n === base + "-story.md";
  });
}

const entries = [];
const missing = [];

for (const demo of demos.filter((d) => d.published)) {
  const file = findDoc(demo.id);
  if (!file) { missing.push(demo.id); continue; }
  entries.push([demo.id, fs.readFileSync(path.join(DOCS, file), "utf8").trim()]);
}

const body = entries
  .map(([id, md]) => "    " + JSON.stringify(id) + ": " + JSON.stringify(md))
  .join(",\n");

fs.writeFileSync(OUT, `/*
 * EI Center — long-form demo write-ups
 * ------------------------------------------------------------------
 * GENERATED FILE — do not edit. Source: docs/<demo>-about|story.md
 * Regenerate with: npm run build:docs
 */
(function (root) {
  "use strict";

  var docs = {
${body}
  };

  if (typeof module === "object" && module.exports) {
    module.exports = docs;
  } else {
    root.EI_DATA = root.EI_DATA || {};
    root.EI_DATA.docs = docs;
  }
})(this);
`);

console.log(`✔ data/docs.js — ${entries.length} write-ups`);
if (missing.length) {
  console.log(`  no doc yet (About section is hidden for these): ${missing.join(", ")}`);
}
