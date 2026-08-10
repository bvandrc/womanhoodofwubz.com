import { expect, test } from '@playwright/test'
import { uniq } from 'es-toolkit'
import { SELECTORS } from '../constants'
import { STUB_PRODUCTS, stubSanity } from '../support/sanity-stub'

// axe won't catch this: its `duplicate-id-aria` rule skips aria-hidden
// subtrees, which is exactly where DoubleElement's duplicated copy lives.
test('renders no duplicate element ids', async ({ page }) => {
  await stubSanity(page)
  await page.goto('/')
  await expect(page.locator(SELECTORS.MAIN_GRID_IMAGES)).toHaveCount(
    STUB_PRODUCTS.length,
  )

  const ids = await page.evaluate(() =>
    [...document.querySelectorAll('[id]')].map((el) => el.id),
  )

  expect(uniq(ids)).toEqual(ids)
})
