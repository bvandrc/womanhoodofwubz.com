import { render, screen } from '@testing-library/react'

import { DoubleElement } from '../DoubleElement'

/** The decorative copy, which carries no accessible content. */
const backCopy = (container: HTMLElement) =>
  container.querySelector('.el-back') as HTMLElement

const frontCopy = (container: HTMLElement) =>
  container.querySelector('.el-front') as HTMLElement

describe('DoubleElement', () => {
  it('renders the children twice, stacked in one grid cell', () => {
    const { container } = render(
      <DoubleElement>
        <em>Wubz</em>
      </DoubleElement>
    )

    expect(container.querySelectorAll('em')).toHaveLength(2)
    for (const copy of [backCopy(container), frontCopy(container)]) {
      expect(copy.className).toContain('col-start-1 row-start-1')
    }
  })

  it('hides the back copy from assistive tech, so the text is read once', () => {
    const { container } = render(
      <DoubleElement>
        <span>Wubz</span>
      </DoubleElement>
    )

    expect(backCopy(container).getAttribute('aria-hidden')).toBe('true')
    expect(frontCopy(container).hasAttribute('aria-hidden')).toBe(false)
    // Both copies are in the DOM; only the front one is in the a11y tree.
    expect(
      screen.getByText('Wubz', {
        ignore: '[aria-hidden="true"], [aria-hidden="true"] *',
      })
    ).toBe(frontCopy(container).firstElementChild)
  })

  it('strips the duplicated ids off the back copy', () => {
    const { container } = render(
      <DoubleElement>
        <span id="product-title">Wubz</span>
      </DoubleElement>
    )

    // Duplicate ids are invalid, and `getElementById` — how `aria-labelledby`
    // and `for` resolve — would match the decorative copy instead.
    expect(container.querySelectorAll('#product-title')).toHaveLength(1)
    expect(backCopy(container).querySelector('[id]')).toBeNull()
  })

  it('strips an id off the back copy itself, not just its descendants', () => {
    const { container } = render(
      <DoubleElement id="labelled">
        <span>Wubz</span>
      </DoubleElement>
    )

    expect(backCopy(container).id).toBe('')
    expect(frontCopy(container).id).toBe('labelled')
  })

  it('keeps stripping ids as the children change', () => {
    const { container, rerender } = render(
      <DoubleElement>
        <span>Wubz</span>
      </DoubleElement>
    )

    rerender(
      <DoubleElement>
        <span id="added-later">Wubz</span>
      </DoubleElement>
    )

    expect(container.querySelectorAll('#added-later')).toHaveLength(1)
  })

  it('marks each copy so children can style per-copy', () => {
    const { container } = render(
      <DoubleElement>
        <span>Wubz</span>
      </DoubleElement>
    )

    // The `in-[.el-back]:` / `in-[.el-front]:` variants resolve against these.
    expect(backCopy(container)).not.toBeNull()
    expect(frontCopy(container)).not.toBeNull()
  })

  it('applies the shared class to both copies and the per-copy ones to one', () => {
    const { container } = render(
      <DoubleElement
        className="shared"
        backClassName="only-back"
        frontClassName="only-front">
        <span>Wubz</span>
      </DoubleElement>
    )

    expect(backCopy(container).className).toContain('shared')
    expect(backCopy(container).className).toContain('only-back')
    expect(backCopy(container).className).not.toContain('only-front')
    expect(frontCopy(container).className).toContain('only-front')
  })
})
