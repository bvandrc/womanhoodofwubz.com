/**
 * Shared site config for the build (vite.config.ts), the test runner
 * (playwright.config.ts), and CI.
 */

/** Public URL of the deployed site. */
export const SITE_URL = 'https://womanhoodofwubz.pages.dev/'

// Product images come from Sanity's image CDN.
const SANITY_IMAGE_ORIGINS = 'https://*.sanity.io https://cdn.sanity.io'
// The product query goes to Sanity's API, live or cached.
const SANITY_API_ORIGINS = 'https://*.api.sanity.io https://*.apicdn.sanity.io'
// The mix player is SoundCloud's embed.
const SOUNDCLOUD_PLAYER_ORIGIN = 'https://w.soundcloud.com'
// bvandercar.dev shows this site as a live preview in an iframe, and so do its
// PR previews on workers.dev. No other site may frame it.
const FRAMING_ORIGINS = 'https://bvandercar.dev https://*.bvandrc.workers.dev'

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  `img-src 'self' data: ${SANITY_IMAGE_ORIGINS}`,
  `connect-src 'self' ${SANITY_API_ORIGINS}`,
  `frame-src ${SOUNDCLOUD_PLAYER_ORIGIN}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  `frame-ancestors ${FRAMING_ORIGINS}`,
].join('; ')

/**
 * Security headers sent with every response.
 *
 * The build writes them to `dist/_headers` for Cloudflare, and `vite preview`
 * sends them too, so CI's ZAP scan sees what production serves. There's no
 * X-Frame-Options: it can't name the origins `frame-ancestors` allows, and
 * would block them in browsers that honor it.
 */
export const SECURITY_HEADERS = {
  'Content-Security-Policy': CONTENT_SECURITY_POLICY,
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
} as const satisfies Record<string, string>
