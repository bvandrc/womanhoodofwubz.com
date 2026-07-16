import { expect } from '@playwright/test'
import { lighthouseTest as test } from './fixtures'

// The SoundCloud widget's scripting dominates mobile Total Blocking Time
// (desktop scores 100); not ours to fix.
const thresholdOverrides = { performance: 70 }

test('Home page', async ({ page, runAudit }) => {
  await page.goto('/')

  await runAudit({ name: 'initial', thresholdOverrides })

  // product grid populates from Contentful
  await expect(page.locator('#main-grid img').first()).toBeVisible({
    timeout: 15_000,
  })

  await runAudit({ name: 'loaded', thresholdOverrides })
})
