/*
 * Unit tests for js/core/store.js using small fixtures, independent of
 * the shipped content.
 */
const test = require("node:test");
const assert = require("node:assert/strict");
const { createStore, validate } = require("../js/core/store.js");

const site = {
  config: { showCustomerNames: false },
  lenses: [{ id: "engineering", name: "Eng" }, { id: "agentic", name: "Agentic" }, { id: "physical", name: "Phys" }],
  stages: [{ id: "design", name: "Design" }, { id: "validation", name: "Test" }],
  stats: [{ value: "auto:demos", label: "demos" }, { value: "auto:live", label: "live" }, { value: "60+", label: "clients" }],
  proofs: { items: [{ id: "p", customer: "ACME", customerAlias: "An OEM" }] }
};

const demo = (over) => Object.assign({
  id: "x", name: "X", tagline: "t", summary: "s", status: "live", lens: "engineering",
  stages: ["design"], published: true, contentStatus: "ready",
  problem: [], steps: [], kpis: [], features: [], media: {}, launch: { url: null, label: "Go" }
}, over);

const demos = [
  demo({ id: "soon-one", status: "soon", lens: "agentic", stages: ["validation"] }),
  demo({ id: "live-one", status: "live" }),
  demo({ id: "remote-one", status: "remote", launch: { url: "http://localhost:8000", label: "Open" } }),
  demo({ id: "hidden", published: false })
];

test("validate accepts a well-formed fixture", () => {
  assert.deepEqual(validate(site, demos), []);
});

test("validate reports duplicates, bad enums and unknown references", () => {
  const errs = validate(site, [
    demo({ id: "a" }),
    demo({ id: "a" }),
    demo({ id: "Bad_Id", status: "gone", lens: "nope", stages: ["mars"] }),
    demo({ id: "c", kpis: [{ value: "1" }], launch: { url: 5 } })
  ]);
  const text = errs.join("\n");
  assert.match(text, /duplicate id/);
  assert.match(text, /kebab-case/);
  assert.match(text, /status must be/);
  assert.match(text, /unknown lens 'nope'/);
  assert.match(text, /unknown stage 'mars'/);
  assert.match(text, /kpis\[0\] needs value and label/);
  assert.match(text, /launch.url must be/);
});

test("validate requires copy only for published demos", () => {
  assert.deepEqual(validate(site, [demo({ id: "p", published: false, name: "", tagline: "", summary: "", stages: [] })]), []);
  assert.ok(validate(site, [demo({ id: "p", name: "" })]).length > 0);
});

test("unpublished demos are invisible", () => {
  const s = createStore(site, demos);
  assert.equal(s.demos().length, 3);
  assert.equal(s.get("hidden"), null);
  assert.equal(s.get("live-one").id, "live-one");
});

test("demos are ordered live → remote → soon", () => {
  const s = createStore(site, demos);
  assert.deepEqual(s.demos().map((d) => d.status), ["live", "remote", "soon"]);
});

test("byLens groups in lens order and drops empty lenses", () => {
  const g = createStore(site, demos).byLens();
  assert.deepEqual(g.map((x) => x.lens.id), ["engineering", "agentic"]);
  assert.equal(g[0].demos.length, 2);
});

test("byStage keeps every stage, including empty ones", () => {
  const g = createStore(site, demos).byStage();
  assert.deepEqual(g.map((x) => [x.stage.id, x.demos.length]), [["design", 2], ["validation", 1]]);
});

test("auto stats are computed from published demos", () => {
  const st = createStore(site, demos).stats();
  assert.equal(st[0].value, "3");
  assert.equal(st[1].value, "1");
  assert.equal(st[2].value, "60+");
});

test("customerName respects the privacy flag", () => {
  const proof = site.proofs.items[0];
  assert.equal(createStore(site, demos).customerName(proof), "An OEM");
  const open = Object.assign({}, site, { config: { showCustomerNames: true } });
  assert.equal(createStore(open, demos).customerName(proof), "ACME");
  assert.equal(createStore(open, demos).customerName({ customer: null, customerAlias: "Alias" }), "Alias");
});

test("launchState is disabled until a url exists", () => {
  const s = createStore(site, demos);
  assert.deepEqual(s.launchState(s.get("live-one")), { enabled: false, url: null, label: "Ask your host to launch" });
  assert.deepEqual(s.launchState(s.get("remote-one")), { enabled: true, url: "http://localhost:8000", label: "Open" });
});
