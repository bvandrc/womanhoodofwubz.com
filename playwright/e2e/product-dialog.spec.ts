import { expect, test } from '@playwright/test'
import { uniq } from 'es-toolkit'
import { checkA11y } from '../a11y/accessibility'
import { SELECTORS } from '../constants'
import { STUB_PRODUCTS, stubSanity } from '../support/sanity-stub'

const [IN_STOCK] = STUB_PRODUCTS

test.beforeEach(async ({ page }) => {
  await stubSanity(page)
  await page.goto('/')
  await expect(page.locator(SELECTORS.MAIN_GRID_IMAGES)).toHaveCount(
    STUB_PRODUCTS.length,
  )
})

test('product tile opens its dialog from the keyboard', async ({ page }) => {
  const tile = page.getByRole('button', { name: new RegExp(IN_STOCK.title) })
  await expect(tile).toHaveAttribute('aria-expanded', 'false')

  for (const key of ['Enter', ' ']) {
    await test.step(`opens with ${key === ' ' ? 'Space' : key}`, async () => {
      await tile.focus()
      await page.keyboard.press(key)

      const dialog = page.getByRole('dialog')
      await expect(dialog).toBeVisible()
      await expect(dialog).toContainText(IN_STOCK.title)
      await checkA11y(page)

      await page.keyboard.press('Escape')
      await expect(dialog).toBeHidden()
    })
  }
})

// DoubleElement renders its children twice, so it's easy to duplicate an id
// into the DOM and break the aria-labelledby wiring that names each tile.
test('renders no duplicate element ids', async ({ page }) => {
  // page.evaluate runs in the browser, where es-toolkit isn't in scope — so
  // collect the ids there and work them out here.
  const ids = await page.evaluate(() =>
    [...document.querySelectorAll('[id]')].map((el) => el.id),
  )
  const duplicated = ids.filter((id, index) => ids.indexOf(id) !== index)

  expect(uniq(duplicated)).toEqual([])
})
