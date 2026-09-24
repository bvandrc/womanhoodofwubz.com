import { render } from '@testing-library/react'

import { DoubleElement } from '../DoubleElement'

const ID = 'product-title'

/** The classes the component marks its two copies with. */
const CLASSES = {
  FRONT: '.el-front',
  BACK: '.el-back',
}

describe('DoubleElement', () => {
  it('strips the duplicated ids off the back copy', () => {
    const { container } = render(
      <DoubleElement>
        <span id={ID}>Wubz</span>
      </DoubleElement>
    )

    // Duplicate ids are invalid, and `getElementById` — how `aria-labelledby`
    // and `for` resolve — would match the decorative copy instead.
    expect(container.querySelectorAll(`#${ID}`)).toHaveLength(1)
    expect(container.querySelector(`${CLASSES.BACK} [id]`)).toBeNull()
  })

  it('strips an id off the back copy itself, not just its descendants', () => {
    const { container } = render(
      <DoubleElement id={ID}>
        <span>Wubz</span>
      </DoubleElement>
    )

    expect(container.querySelector(CLASSES.BACK)?.id).toBe('')
    expect(container.querySelector(CLASSES.FRONT)?.id).toBe(ID)
  })

  it('keeps stripping ids as the children change', () => {
    const { container, rerender } = render(
      <DoubleElement>
        <span>Wubz</span>
      </DoubleElement>
    )

    rerender(
      <DoubleElement>
        <span id={ID}>Wubz</span>
      </DoubleElement>
    )

    expect(container.querySelectorAll(`#${ID}`)).toHaveLength(1)
  })
})
