/*
 * Headless Chrome/Edge helpers for screenshots and end-to-end tests.
 * No npm dependencies: drives the locally installed browser via CLI.
 */
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const ROOT = path.resolve(__dirname, "..");

const CANDIDATES = [
  process.env.EI_BROWSER,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
].filter(Boolean);

function findBrowser() {
  const found = CANDIDATES.find((p) => fs.existsSync(p));
  if (!found) throw new Error("No Chrome/Edge found. Set EI_BROWSER to the browser executable.");
  return found;
}

/* file:// URL for a page in the project, e.g. pageUrl("index.html", "#lifecycle"). */
function pageUrl(file, suffix = "") {
  return pathToFileURL(path.join(ROOT, file)).href + suffix;
}

function baseArgs(width, height, budgetMs) {
  return [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--allow-file-access-from-files",
    `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), "ei-chrome-"))}`,
    `--window-size=${width},${height}`,
    `--virtual-time-budget=${budgetMs}`
  ];
}

/* Render url and write a PNG. Default: 4K, the 85" display resolution. */
function screenshot(url, outFile, { width = 3840, height = 2160, budgetMs = 4000 } = {}) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  execFileSync(findBrowser(), [...baseArgs(width, height, budgetMs), `--screenshot=${outFile}`, url], { stdio: "pipe" });
  return outFile;
}

/*
 * Load url, run scripts, return { dom, console } where console is the
 * list of messages the page logged (warnings, errors).
 */
function load(url, { width = 1920, height = 1080, budgetMs = 3000 } = {}) {
  const args = [...baseArgs(width, height, budgetMs), "--enable-logging=stderr", "--v=0", "--dump-dom", url];
  let stdout = "", stderr = "";
  try {
    const r = require("node:child_process").spawnSync(findBrowser(), args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    stdout = r.stdout || "";
    stderr = r.stderr || "";
  } catch (e) {
    throw new Error("Browser failed to start: " + e.message);
  }
  const consoleLines = stderr.split(/\r?\n/)
    .filter((l) => /CONSOLE|Uncaught/.test(l))
    .map((l) => l.replace(/^.*?"(.*)", source.*$/, "$1"));
  return { dom: stdout, console: consoleLines };
}

module.exports = { ROOT, findBrowser, pageUrl, screenshot, load };
