import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Lets the dev server's injected `<style>` tags past the CSP.
 *
 * Neocities can't set response headers, so the CSP ships as a meta tag in
 * `index.html` — which the dev server serves too.
 *
 * A build links its CSS as a file, but the dev server injects it as <style>
 * tags, which `style-src 'self'` blocks, leaving the dev site unstyled. Keep
 * this in sync with that meta tag.
 */
const relaxCspForDev = (): Plugin => ({
  name: 'relax-csp-for-dev',
  apply: 'serve',
  transformIndexHtml: (html) =>
    html.replace("style-src 'self'", "style-src 'self' 'unsafe-inline'"),
})

/**
 * Has `vite preview` answer a `/.well-known/` path with no file behind it with
 * a 404, as Neocities does.
 *
 * The preview server's SPA fallback otherwise serves `index.html` with a 200,
 * which Lighthouse's `ai-catalog.json` audit reads as a broken manifest.
 */
const notFoundForWellKnown = (): Plugin => ({
  name: 'not-found-for-well-known',
  configurePreviewServer: (server) => {
    const { outDir } = server.config.build
    server.middlewares.use('/.well-known/', (req, res, next) => {
      // `req.url` is relative to the mount path here.
      const file = path.join(outDir, '.well-known', req.url ?? '')
      if (fs.existsSync(file)) return next()
      res.statusCode = 404
      res.end()
    })
  },
})

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), relaxCspForDev(), notFoundForWellKnown()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    target: 'esnext',
    modulePreload: false,
  },
})
