import { expect, test } from '@playwright/test'
import { SELECTORS } from '../support/constants/selectors'
import { checkA11y } from './accessibility'

// One "workflow" test: the page itself, plus every dialog reachable from it —
// scanned once each.
test('Home page', async ({ page }) => {
  await page.goto('/')

  await checkA11y(page)

  // product grid populates from Sanity
  await expect(page.locator(SELECTORS.PRODUCT_GRID.IMAGE).first()).toBeVisible({
    timeout: 15_000,
  })
  await checkA11y(page)

  await test.step('Custom Hats Dialog', async () => {
    await page.locator(SELECTORS.HEADER.CUSTOM_HATS).click()
    await page.locator(SELECTORS.DIALOG.SELF).waitFor()
    await checkA11y(page)
    await page.keyboard.press('Escape')
  })

  await test.step('Order Dialog', async () => {
    await page.locator(SELECTORS.PRODUCT_GRID.IMAGE).first().click()
    const dialog = page.locator(SELECTORS.DIALOG.SELF)
    await dialog.waitFor()
    // dialog image loads from Sanity
    await expect(dialog.locator('img')).toBeVisible({ timeout: 15_000 })
    await checkA11y(page)
    await page.keyboard.press('Escape')
  })
})
