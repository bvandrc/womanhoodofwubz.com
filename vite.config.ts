import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Neocities can't set response headers, so the CSP ships as a meta tag in
 * `index.html` — which the dev server serves too. A build links its CSS as a
 * file, but the dev server injects it as <style> tags, which `style-src 'self'`
 * blocks, leaving the dev site unstyled. Keep this in sync with that meta tag.
 */
const relaxCspForDev = (): Plugin => ({
  name: 'relax-csp-for-dev',
  apply: 'serve',
  transformIndexHtml: (html) =>
    html.replace("style-src 'self'", "style-src 'self' 'unsafe-inline'"),
})

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), relaxCspForDev()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    target: 'esnext',
    modulePreload: false,
  },
})
