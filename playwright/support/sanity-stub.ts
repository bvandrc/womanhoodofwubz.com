import type { Page } from '@playwright/test'

/** 1x1 transparent PNG, stood in for every Sanity image asset. */
const PIXEL_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
)

export const STUB_PRODUCTS = [
  {
    _id: 'stub-in-stock',
    image: {
      _type: 'image',
      asset: { _ref: 'image-abc-100x100-png', _type: 'reference' },
    },
    number: 7,
    title: 'Sunrise Bucket',
    type: 'Bucket Hat',
    subtitle: 'one of one',
    price: 60,
    soldOut: false,
  },
  {
    _id: 'stub-sold-out',
    image: {
      _type: 'image',
      asset: { _ref: 'image-def-100x100-png', _type: 'reference' },
    },
    number: 6,
    title: 'Midnight Cap',
    type: 'Dad Hat',
    soldOut: true,
  },
]

/**
 * Serves fixed products in place of the live Sanity dataset, so tests that
 * exercise the grid don't depend on network or on what's currently for sale.
 */
export async function stubSanity(page: Page) {
  await page.route('**/*.sanity.io/**/data/query/**', (route) =>
    route.fulfill({ json: { result: STUB_PRODUCTS } }),
  )
  await page.route('**/cdn.sanity.io/**', (route) =>
    route.fulfill({ contentType: 'image/png', body: PIXEL_PNG }),
  )
}
