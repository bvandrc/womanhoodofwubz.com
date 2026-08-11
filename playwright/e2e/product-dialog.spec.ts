import { expect, test } from '@playwright/test'
import { SELECTORS } from '../support/constants/selectors'
import { STUB_PRODUCTS, stubSanity } from '../support/sanity-stub'

const [IN_STOCK] = STUB_PRODUCTS

test.describe('Product Dialog', () => {
  test.beforeEach(async ({ page }) => {
    await stubSanity(page)
    await page.goto('/')
    await expect(page.locator(SELECTORS.PRODUCT_GRID.IMAGE)).toHaveCount(
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

        await page.keyboard.press('Escape')
        await expect(dialog).toBeHidden()
      })
    }
  })
})
