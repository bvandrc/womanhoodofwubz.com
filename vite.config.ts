import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

import { SECURITY_HEADERS } from './site.config'

/** Writes `SECURITY_HEADERS` to `dist/_headers`, which Cloudflare applies to every path. */
const securityHeadersFile = (): Plugin => ({
  name: 'security-headers-file',
  apply: 'build',
  generateBundle() {
    const lines = Object.entries(SECURITY_HEADERS).map(
      ([name, value]) => `  ${name}: ${value}`
    )
    this.emitFile({
      type: 'asset',
      fileName: '_headers',
      source: ['/*', ...lines, ''].join('\n'),
    })
  },
})

export default defineConfig({
  base: '/',
  // Unknown paths 404 instead of falling back to index.html, as on Cloudflare
  // (whose fallback `public/404.html` turns off). Lighthouse probes
  // `/.well-known/` files and fails on an HTML 200.
  appType: 'mpa',
  plugins: [react(), tailwindcss(), securityHeadersFile()],
  resolve: {
    tsconfigPaths: true,
  },
  // Only preview: the dev server injects CSS as inline <style> tags, which the
  // CSP's `style-src 'self'` would block.
  preview: {
    headers: SECURITY_HEADERS,
  },
  build: {
    target: 'esnext',
    modulePreload: false,
  },
})
