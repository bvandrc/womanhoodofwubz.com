React website for the brand Womanhood of Wubz.

URL: https://womanhoodofwubz.pages.dev/, served by Cloudflare Pages.

## Deploys

- **Deploy**: once CI passes on `main`, `.github/workflows/deploy.yml` builds and publishes `dist` to Cloudflare Pages with Wrangler.
- **Preview**: on every PR, `.github/workflows/preview.yml` deploys the build as a Pages preview and links it from the PR's "View deployment" button, stable per PR at `pr-<number>.womanhoodofwubz.pages.dev`.

Both need the repo secrets `CLOUDFLARE_API_TOKEN` (with the Cloudflare Pages: Edit permission) and `CLOUDFLARE_ACCOUNT_ID`, and a Pages project named `womanhoodofwubz`, created once:

```bash
pnpm exec wrangler pages project create womanhoodofwubz --production-branch=main
```
