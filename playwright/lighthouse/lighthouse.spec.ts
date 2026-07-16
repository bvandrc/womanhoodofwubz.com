import { expect } from '@playwright/test'
import { lighthouseTest as test } from './fixtures'

test('Home page', async ({ page, runAudit }) => {
  await page.goto('/')

  await runAudit({ name: 'initial' })

  // product grid populates from Contentful
  await expect(page.locator('#main-grid img').first()).toBeVisible({
    timeout: 15_000,
  })

  await runAudit({ name: 'loaded' })
})
