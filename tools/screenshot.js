#!/usr/bin/env node
/*
 * Capture 4K screenshots of every landing section and every published
 * demo page into ./screenshots for visual review.
 *
 *   npm run screenshot                  # everything
 *   npm run screenshot -- landing       # landing sections only
 *   npm run screenshot -- demo plxai    # one demo page
 *   npm run screenshot -- --hd          # 1920×1080 instead of 4K
 */
const path = require("node:path");
const { ROOT, pageUrl, screenshot } = require("./browser.js");
const site = require("../data/site.js");
const demos = require("../data/demos.js");

const args = process.argv.slice(2);
const hd = args.includes("--hd");
const size = hd ? { width: 1920, height: 1080 } : { width: 3840, height: 2160 };
const what = args.filter((a) => !a.startsWith("--"));
const out = (name) => path.join(ROOT, "screenshots", name + ".png");

const jobs = [];
if (!what.length || what[0] === "landing") {
  site.config.sections.forEach((id, i) =>
    jobs.push([pageUrl("index.html", "#" + id), out(`landing-${String(i + 1).padStart(2, "0")}-${id}`)]));
}
if (!what.length || what[0] === "demo") {
  const ids = what[1] ? [what[1]] : demos.filter((d) => d.published).map((d) => d.id);
  ids.forEach((id) => jobs.push([pageUrl("demo.html", "?id=" + id), out(`demo-${id}`)]));
}

for (const [url, file] of jobs) {
  screenshot(url, file, size);
  console.log("✔", path.relative(ROOT, file));
}
