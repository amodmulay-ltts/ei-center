# Content guide

How to change what appears on the EI Center screen. No coding required: you only edit two data files.

| What you want to change | File |
|---|---|
| Hero text, stats, lenses, lifecycle stages, customer proof, engagement model, settings | [`data/site.js`](../data/site.js) |
| Anything about a demo: add, remove, reword, KPIs, launch link | [`data/demos.js`](../data/demos.js) |

After editing, run `npm test`. It checks your changes and tells you exactly what's wrong if something doesn't fit. If you don't have Node, open the page and press **F12**; validation errors are printed to the console and the page still loads.

---

## Add a demo

Copy an existing entry in `data/demos.js` and change the fields. The smallest valid published demo:

```js
{
  id: "my-demo",                 // kebab-case, unique; becomes demo.html?id=my-demo
  name: "My Demo",
  tagline: "One line, under ~70 characters.",
  summary: "Two sentences on what it is and why it matters.",
  status: "live",                // live | remote | soon
  lens: "engineering",           // an id from site.lenses
  stages: ["design"],            // one or more ids from site.stages
  published: true,
  contentStatus: "ready",        // ready | draft
  problem: [], steps: [], kpis: [], features: [],
  media: {},
  launch: { url: null, label: "Launch My Demo" },
  contact: "BU · Owner name"     // internal, never shown
}
```

Empty lists are fine: the demo page hides any section that has no content.

## Field reference (demos)

| Field | Shown where | Notes |
|---|---|---|
| `id` | URL | Lowercase letters, digits and hyphens. Don't change once links are shared. |
| `name` | Card, demo page title | |
| `tagline` | Card, demo page subtitle | Keep short; it's read from across the room. |
| `summary` | Demo page intro | |
| `status` | Badge on card and page | `live` = running in Munich · `remote` = hosted elsewhere, needs network · `soon` = coming |
| `lens` | Grouping and colour dot | Must exist in `site.lenses`. |
| `stages` | Lifecycle map | Must exist in `site.stages`. |
| `published` | Everywhere | `false` hides the demo completely (use for placeholders). |
| `contentStatus` | Nowhere on screen | `draft` flags copy that still needs owner input. Search for `"draft"` to find them. |
| `problem` | "The challenge" list | Array of short strings. |
| `steps` | "How it works" pipeline | `[{ title, text }]`. 3 to 5 steps reads best. |
| `kpis` | Big-number tiles | `[{ value, label }]`. Only use numbers the demo owner has confirmed. |
| `features` | Feature grid | `[{ title, text }]`. |
| `media` | Video / screenshots | See *Media* below. |
| `launch.url` | Launch button | `null` shows "Ask your host to launch". Set to the demo URL when available. |
| `launch.label` | Launch button text | |
| `contact` | Nowhere | Owner, for maintainers. |

## Settings (`site.config`)

| Setting | Default | Effect |
|---|---|---|
| `showCustomerNames` | `false` | `false` shows `customerAlias` ("German premium OEM") on proof cards. Set `true` only once names are cleared for display to other customers. |
| `idleTimeoutMinutes` | `3` | Inactivity before the screen returns to attract mode. |
| `attractSlideSeconds` | `12` | How long each section shows in attract mode. |

## Stats

`site.stats` values are shown as-is, except `"auto:demos"` (number of published demos) and `"auto:live"` (number of live demos), which are counted automatically.

## Rules the tests enforce

- Every demo references a real lens and stage.
- No duplicate ids.
- Every published demo has a name, tagline, summary and at least one stage.
- Every KPI has a value and a label.
- No passwords or internal Azure hostnames anywhere in the content.
- Customer names from `site.proofs` must not appear in demo copy (use an alias).
- `showCustomerNames` ships as `false`.

## Adding a lens or stage

1. Add `{ id, name, text }` to `site.lenses` (or `{ id, name }` to `site.stages`).
2. For a lens, also add a colour token `--c-lens-<id>` in `css/tokens.css` and a class `.lens--<id>` in `css/base.css`. The tests check that all three exist.
