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
@conventions/git.md — branch naming and PR review practice

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
- **package.json**: Linted in CI by `bvandrc/lint-package-json`, which covers
  `studio/package.json` too. It enforces top-level key order, required fields
  (`name`/`version`/`license`), name and exact-semver version formats, and
  alphabetically sorted `dependencies`/`devDependencies` — so adding a field in
  the wrong place, or a dep out of order, fails the lint job.
- **Exports**: No default exports anywhere in `src/`, not even the exceptions
  `conventions/typescript.md` allows. Plain utils are `function` declarations.
- **Styling**: Tailwind v4 is configured **in CSS** — `@theme`, `@custom-variant`
  and friends in `src/styles/index.css`. There is no `tailwind.config.js` and
  none should be added. New design tokens (colors, shadows, fonts) go in
  `@theme`.
- **Conditional classes**: Use `classnames` (imported as `classNames`), not
  template-literal concatenation.
- **Linting and formatting**: Biome is the linter *and* formatter — no
  eslint/prettier at the root. Style is single quotes, no semicolons, 2-space
  indent, 80 columns; run `pnpm format` after making edits instead of
  hand-formatting, and `pnpm check` (Biome + both type checks) before every
  commit — it's what CI runs. Notable rules that are errors: `noFloatingPromises`,
  `noImportCycles`, `noShadow`, `noUndeclaredDependencies`, `noTsIgnore` — fix
  the cause, don't suppress.
- **Test IDs**: This repo's registry is a flat `playwright/constants.ts`, not
  the nested `support/constants/selectors.ts` that
  `conventions/playwright.md` describes.
- **Convention files**: `conventions/` is synced from
  https://github.com/bvandrc/bvandrc-conventions and overwritten on every
  sync. Edit a rule upstream, never in that directory.
