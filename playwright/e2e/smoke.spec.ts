import { expect, test } from '@playwright/test'

test('home page loads', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Womanhood of Wubz')
  await expect(
    page.getByRole('img', { name: 'Womanhood of Wubz' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Designed Hats' }),
  ).toBeVisible()

  // product grid populates from Contentful
  const gridImages = page.locator('#main-grid img')
  await expect(gridImages.first()).toBeVisible({ timeout: 15_000 })
})
