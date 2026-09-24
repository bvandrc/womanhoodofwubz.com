import { render } from '@testing-library/react'

import { DoubleElement } from '../DoubleElement'

/** The decorative copy, whose ids the component strips. */
const backCopy = (container: HTMLElement) =>
  container.querySelector('.el-back') as HTMLElement

const frontCopy = (container: HTMLElement) =>
  container.querySelector('.el-front') as HTMLElement

describe('DoubleElement', () => {
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
})
