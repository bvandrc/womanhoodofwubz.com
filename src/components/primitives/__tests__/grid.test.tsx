import { render } from '@testing-library/react'

import { Grid } from '../Grid'

describe('Grid', () => {
  it('hands the column floor to CSS as a custom property', () => {
    const { container } = render(<Grid minColumnWidth={220} />)

    expect(container.firstElementChild?.getAttribute('style')).toContain(
      '--grid-min-column: 220px'
    )
  })

  it("keeps a caller's own style alongside it", () => {
    const { container } = render(
      <Grid minColumnWidth={220} style={{ gap: '1rem' }} />
    )

    const style = container.firstElementChild?.getAttribute('style')
    expect(style).toContain('--grid-min-column: 220px')
    expect(style).toContain('gap: 1rem')
  })

  it('renders its children as-is, wrapping nothing', () => {
    const { container } = render(
      <Grid minColumnWidth={220}>
        <span>One</span>
        <span>Two</span>
      </Grid>
    )

    expect(container.firstElementChild?.children).toHaveLength(2)
  })

  it('passes the rest through to the element', () => {
    const { container } = render(
      <Grid
        minColumnWidth={220}
        data-testid="main-grid"
        aria-label="Products"
      />
    )

    expect(container.firstElementChild?.getAttribute('data-testid')).toBe(
      'main-grid'
    )
  })
})
