import { expect, test } from '@playwright/test'

import { SELECTORS } from '~/pw/support/constants/selectors'
import { STUB_PRODUCTS, stubSanity } from '~/pw/support/sanity-stub'

const { HEADER, PRODUCT_GRID } = SELECTORS

test.describe('Product Grid', () => {
  test('a product without an image is left out rather than blanking the page', async ({
    page,
  }) => {
    const [IN_STOCK] = STUB_PRODUCTS
    await stubSanity(page, [
      ...STUB_PRODUCTS,
      { ...IN_STOCK, _id: 'stub-no-image', image: null },
    ])

    await page.goto('/')

    await expect(page.getByTestId(PRODUCT_GRID.IMAGE)).toHaveCount(
      STUB_PRODUCTS.length
    )
    await expect(page.getByTestId(HEADER.DESIGNED_HATS_BTN)).toBeVisible()
  })
})
