import { expect, test } from '@playwright/test'
import { SELECTORS } from '../constants'

test('home page loads', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Womanhood of Wubz')
  await expect(
    page.getByRole('img', { name: 'Womanhood of Wubz' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Designed Hats' }),
  ).toBeVisible()

  // product grid populates from Sanity
  await expect(page.locator(SELECTORS.MAIN_GRID_IMAGES).first()).toBeVisible({
    timeout: 15_000,
  })
})
