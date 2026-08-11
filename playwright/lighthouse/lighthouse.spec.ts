import { expect } from '@playwright/test'
import { desktopConfig } from 'lighthouse'

import { SELECTORS } from '~/pw/support/constants/selectors'
import { lighthouseTest as test } from './fixtures'

test('Home page', async ({ page, runAudit }) => {
  await page.goto('/')

  await test.step('initial', async () => {
    await runAudit({
      name: 'initial-desktop',
      lighthouseArgs: { config: desktopConfig },
    })
    await runAudit({
      name: 'initial-mobile',
      thresholds: {
        'agentic-browsing': 85, // TODO: improve (is 100 on desktop)
      },
    })
  })

  // product grid populates from Sanity
  await expect(page.locator(SELECTORS.PRODUCT_GRID.IMAGE).first()).toBeVisible({
    timeout: 15_000,
  })

  await test.step('loaded', async () => {
    await runAudit({
      name: 'loaded-desktop',
      lighthouseArgs: { config: desktopConfig },
    })
    await runAudit({
      name: 'loaded-mobile',
      thresholds: {
        'agentic-browsing': 85, // TODO: improve (is 100 on desktop)
      },
    })
  })
})
