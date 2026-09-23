import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { render, screen } from '@testing-library/react'

import { CircleLink } from '../CircleLink'

describe('CircleLink', () => {
  it('renders a link when given an href', () => {
    render(
      <CircleLink
        icon={faInstagram}
        href="https://instagram.com/x"
        title="Instagram"
      />
    )

    expect(screen.getByRole('link')).toHaveProperty(
      'href',
      'https://instagram.com/x'
    )
  })

  it('opens an outbound link without handing it the opener', () => {
    render(
      <CircleLink
        icon={faInstagram}
        href="https://instagram.com/x"
        title="Instagram"
      />
    )

    expect(screen.getByRole('link').getAttribute('rel')).toBe('noopener')
    expect(screen.getByRole('link').getAttribute('target')).toBe('_blank')
  })

  it('renders a button when there is nowhere to go', () => {
    render(<CircleLink icon={faInstagram} title="Copy email" />)

    // Explicitly `type="button"`, so a future form wrapper cannot submit it.
    expect(screen.getByRole('button').getAttribute('type')).toBe('button')
  })

  it('names the icon from the title when no label is given', () => {
    const { container } = render(
      <CircleLink icon={faInstagram} title="Instagram" />
    )

    expect(
      container.querySelector('.el-front svg')?.getAttribute('aria-label')
    ).toBe('Instagram')
  })

  it('prefers an explicit label over the title', () => {
    const { container } = render(
      <CircleLink icon={faInstagram} title="Instagram" aria-label="Follow us" />
    )

    expect(
      container.querySelector('.el-front svg')?.getAttribute('aria-label')
    ).toBe('Follow us')
  })
})
