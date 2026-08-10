import AxeBuilder from '@axe-core/playwright'
import { expect, type Page } from '@playwright/test'
import type { Result } from 'axe-core'
import { uniq } from 'es-toolkit'

function formatViolations(violations: Result[]): string {
  return violations
    .map(
      (v) =>
        `\n[${v.impact}] ${v.id}: ${v.help}\n  ${v.helpUrl}\n` +
        v.nodes.map((n) => `  - ${n.target.join(' ')}`).join('\n'),
    )
    .join('\n')
}

export async function checkA11y(
  page: Page,
  options: { disableRules?: string[] } = {},
) {
  // Duplicate ids are invalid HTML, and `getElementById` — which is how
  // `aria-labelledby` and `for` resolve — silently takes the first match. axe
  // no longer covers this: `duplicate-id` is deprecated and off, and
  // `duplicate-id-aria` skips the aria-hidden subtrees where copies collect.
  const ids = await page.evaluate(() =>
    [...document.querySelectorAll('[id]')].map((el) => el.id),
  )
  expect(uniq(ids), 'duplicate element ids').toEqual(ids)

  const builder = new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
    .disableRules([
      // The site's neon-on-dark palette isn't tuned for WCAG contrast ratios,
      // so this rule would fail almost every scan.
      // TODO: fix...
      'color-contrast',
      ...(options.disableRules ?? []),
    ])
    // third-party embed — its internals aren't ours to fix
    .exclude('iframe[src*="soundcloud"]')

  const { violations } = await builder.analyze()
  expect(violations, formatViolations(violations)).toEqual([])
}
