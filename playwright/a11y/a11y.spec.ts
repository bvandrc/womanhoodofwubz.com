import { expect, test } from '@playwright/test'
import { checkA11y } from '../support/accessibility'

// One "workflow" test: the page itself, plus every dialog reachable from it —
// scanned once each.
test('Home page', async ({ page }) => {
  await page.goto('/')

  await test.step('Page', async () => {
    // product grid populates from Contentful
    await expect(page.locator('#main-grid img').first()).toBeVisible({
      timeout: 15_000,
    })
    await checkA11y(page)
  })

  await test.step('Custom Hats Dialog', async () => {
    await page.getByRole('button', { name: 'Custom Hats' }).click()
    await page.getByRole('dialog', { name: 'Custom Designs' }).waitFor()
    await checkA11y(page)
    await page.keyboard.press('Escape')
  })

  await test.step('Order Dialog', async () => {
    await page.locator('#main-grid img').first().click()
    const dialog = page.getByRole('dialog')
    await dialog.waitFor()
    // dialog image loads from Contentful
    await expect(dialog.locator('img')).toBeVisible({ timeout: 15_000 })
    await checkA11y(page)
    await page.keyboard.press('Escape')
  })
})
