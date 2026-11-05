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
  "frame-ancestors 'none'",
].join('; ')

/**
 * Security headers sent with every response.
 *
 * The build writes them to `dist/_headers` for Cloudflare, and `vite preview`
 * sends them too, so CI's ZAP scan sees what production serves.
 */
export const SECURITY_HEADERS = {
  'Content-Security-Policy': CONTENT_SECURITY_POLICY,
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
} as const satisfies Record<string, string>
