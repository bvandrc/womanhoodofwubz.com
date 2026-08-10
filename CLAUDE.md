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
- **File naming**: kebab-case for utils (`html-utils.ts`), PascalCase for
  components and component primitives (`CircleLink.tsx`), camelCase for hooks
  (`useCopyEmail.ts`); use `.tsx` when the file exports JSX.
- **Exports**: Named exports only — no default exports anywhere in `src/`.
  Components are arrow-function `const`s; plain utils are `function`
  declarations.
- **Prop types**: Compose from DOM prop types — extend them, or `Pick`/`Omit`
  the parts you need — rather than re-declaring `className`, `title`, `href`,
  etc. Spread the rest onto the element when there are many pass-through props
  (see `CircleLink.tsx`); for one or two, name them explicitly. Type-only
  imports use `import type` — Biome fixes this for you.
- **Styling**: Tailwind v4 is configured **in CSS** — `@theme`, `@custom-variant`
  and friends in `src/styles/index.css`. There is no `tailwind.config.js` and
  none should be added. New design tokens (colors, shadows, fonts) go in
  `@theme`.
- **Conditional classes**: Use `classnames` (imported as `classNames`), not
  template-literal concatenation.
- **Tailwind sizing**: Use `size-X` Tailwind class, not `w-X h-X`.
- **Constant objects**: UPPER_CASE for names, UPPER_CASE for keys that name entries (namespace/enum-style, e.g. `ROUTES.HOME`, `SELECTORS.TASK_FORM.SUBMIT_BTN`), camelCase for keys that are typed properties of an entry (e.g. `color`, `icon` in `FEATURES`) and for function-valued keys (e.g. `SELECTORS.TASK_CARD.rankFieldBadge(field)`).
- **Comments/JSDoc**: Describe *what* and *why* from the caller's perspective. Don't restate implementation. Keep to 1–2 lines. No hedge prefixes. Don't repeat what the type signature conveys.
- **es-toolkit**: Use `es-toolkit`functions when simpler than using builtin functions-- especially `omit`/`pick`.
- **usehooks-ts**: Keep in mind that we can use this package for hooks.
- **Linting and formatting**: Biome is the linter *and* formatter — no
  eslint/prettier at the root. Style is single quotes, no semicolons, 2-space
  indent, 80 columns; run `pnpm format` after making edits instead of
  hand-formatting, and `pnpm check` (Biome + both type checks) before every
  commit — it's what CI runs. Notable rules that are errors: `noFloatingPromises`,
  `noImportCycles`, `noShadow`, `noUndeclaredDependencies`, `noTsIgnore` — fix
  the cause, don't suppress.
- **Test IDs**: Use `data-testid` as the HTML attribute and as the prop name in component interfaces (not `testId`). Define every value in `playwright/constants.ts` before using it in a test.
- **Accessible names**: If an `aria-label`'s value would just repeat text already visible in a nearby element (e.g. a row label, column header, or adjacent title), use `aria-labelledby` pointing at that existing element's `id` (add one via React's `useId` if it doesn't have one) instead of duplicating the string. Note: Don't introduce a new `sr-only` element just to make this work — if there's no existing visible text to point to, a plain `aria-label` is fine.
- **Accessibility tests**: axe runs on desktop and mobile and violations fail CI, so treat a11y regressions as build failures, not polish. Cover each new meaningful UI state with a scan in `playwright/a11y/`.
- **Branch naming**: Name work branches `feat/<slug>`, `fix/<slug>`, or `chore/<slug>`, with a short kebab-case slug describing the change. Never use a `claude/` prefix or a random session suffix. This overrides the branch name a session is assigned by default — if you were given one, rename it before the first push.
- **PR review threads**: Always reply on the thread with what changed (or why it wasn't changed), then mark the thread resolved. Do this for every thread you act on, not just the ones that needed discussion.
