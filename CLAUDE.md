## Project

React site for the brand Womanhood of Wubz, deployed to Neocities
(https://womanhoodofwubz.neocities.org/) by `.github/workflows/deploy.yml`.

- **Stack**: React 18 + Vite + TypeScript, Tailwind v4, Sanity for product
  content, Playwright for e2e/a11y/Lighthouse.
- **Layout**: `src/` is the site; `playwright/` is all tests, with shared
  helpers under `playwright/support/` (e.g. `stubSanity`, which serves fixed
  products so grid tests don't depend on the live dataset); `studio/` is the
  Sanity Studio, a **separate pnpm package** with its own eslint/prettier and
  excluded from this repo's Biome config — don't lint or reformat it from the
  root.
- **Sanity coordinates** live in `sanity-constants.ts` at the repo root, shared
  by the site and the studio. They're public IDs, not secrets; keep the single
  copy rather than adding env vars.

## Code conventions

Conventions live outside this file, synced from
https://github.com/bvandrc/bvandrc-conventions — follow all of them:

@conventions/typescript.md — language-level TypeScript/JavaScript rules
@conventions/react.md — component, JSX, and accessibility rules
@conventions/playwright.md — test layout, test IDs, and accessibility scans
@conventions/all.md — practice for every repo: branches, formatting, markdown, PR reviews

They cover `src/` and `playwright/`. `studio/` is a separate package with its
own tooling — leave it alone.

## Commands

- `pnpm dev` — dev server. `pnpm build`, `pnpm preview`.
- `pnpm format` — Biome check/fix. `pnpm check` — the full gate, and what CI
  runs: Biome without `--fix` (so problems fail rather than being repaired in
  place) plus `tsc` for the app and for `playwright/tsconfig.json`. Run before
  every commit.
- `pnpm preview:ci` — build and serve on port 4173, which is what the
  Playwright suites expect.
- `pnpm test:e2e`, `pnpm test:a11y`, `pnpm test:lighthouse` — the Playwright
  projects, all against a running preview server. `pnpm pw:open` for the UI
  runner.

## Conventions

- **Package manager**: pnpm. `npm install` writes a competing `package-lock.json` that CI ignores.
- **Styling**: Tailwind v4 is configured **in CSS** — `@theme`, `@custom-variant`
  and friends in `src/styles/index.css`. There is no `tailwind.config.js` and
  none should be added. New design tokens (colors, shadows, fonts) go in
  `@theme`.
- **Conditional classes**: Use `cn` from `src/utils/cn.ts` (clsx +
  tailwind-merge), not template-literal concatenation. Don't import `clsx` or
  `classnames` directly.
- **Icons**: FontAwesome, deliberately. Treat a swap as a layout change, not a
  dependency change.
  - The four `@fortawesome/*` entries are one vendor sharing one transitive
    package, and they tree-shake — only the icons actually imported reach the
    bundle.
  - Other icon sets don't ship the brand logos we need (Instagram and
    SoundCloud), so a swap would mean adding a second package anyway.
  - The FA wiring in `src/App.tsx` is load-bearing, not cruft — importing FA's
    stylesheet is what keeps it from injecting a `<style>` tag that
    `style-src 'self'` blocks.
  - Its sizing model (icons are `1em` tall in a `1.25em` box; `size` props are
    multipliers that compound with the parent font-size) is what every icon
    call site is tuned against.
- **Convention files**: `conventions/` is synced from
  https://github.com/bvandrc/bvandrc-conventions and overwritten on every
  sync. Edit a rule upstream, never in that directory.
