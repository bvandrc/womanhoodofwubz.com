import { fileURLToPath } from 'node:url'
import type { Page } from '@playwright/test'

import type { Product } from '@/api/sanity'

/** Stands in for every Sanity image asset. */
const STUB_IMAGE = fileURLToPath(
  new URL('./constants/mock-product-image.png', import.meta.url)
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
] satisfies Product[]

/**
 * Serves fixed products in place of the live Sanity dataset, so tests that
 * exercise the grid don't depend on network or on what's currently for sale.
 */
export async function stubSanity(page: Page) {
  await page.route('**/*.sanity.io/**/data/query/**', (route) =>
    route.fulfill({ json: { result: STUB_PRODUCTS } })
  )
  await page.route('**/cdn.sanity.io/**', (route) =>
    route.fulfill({ path: STUB_IMAGE })
  )
}
