/*
 * Data integrity tests: the shipped content in data/*.js must pass
 * the same validator the pages run at startup.
 */
const test = require("node:test");
const assert = require("node:assert/strict");

const site = require("../data/site.js");
const demos = require("../data/demos.js");
const { validate } = require("../js/core/store.js");

test("shipped data has no validation errors", () => {
  assert.deepEqual(validate(site, demos), []);
});

test("every lens has a matching CSS token and class", () => {
  const fs = require("node:fs");
  const path = require("node:path");
  const tokens = fs.readFileSync(path.join(__dirname, "../css/tokens.css"), "utf8");
  const base = fs.readFileSync(path.join(__dirname, "../css/base.css"), "utf8");
  for (const l of site.lenses) {
    assert.ok(tokens.includes(`--c-lens-${l.id}:`), `missing token --c-lens-${l.id}`);
    assert.ok(base.includes(`.lens--${l.id}`), `missing class .lens--${l.id}`);
  }
});

test("no credentials or internal hosts leak into content", () => {
  const blob = JSON.stringify({ site, demos });
  assert.doesNotMatch(blob, /password|passwort|@123|Stag@/i);
  assert.doesNotMatch(blob, /cloudapp\.azure\.com/i);
});

test("customer names never appear in always-visible fields", () => {
  const names = site.proofs.items.map((p) => p.customer).filter(Boolean);
  const visible = JSON.stringify(demos.map((d) => [d.name, d.tagline, d.summary, d.kpis, d.features]));
  for (const n of names) {
    for (const part of n.split(/\s*·\s*/)) {
      assert.ok(!visible.includes(part), `customer "${part}" appears in demo copy; use an alias`);
    }
  }
});

test("customer proof config defaults to anonymised", () => {
  assert.equal(site.config.showCustomerNames, false);
});
