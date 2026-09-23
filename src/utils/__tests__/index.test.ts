import { cn } from '../index'

describe('cn', () => {
  it('joins the classes it is given', () => {
    expect(cn('grid', 'z-1')).toBe('grid z-1')
  })

  it('drops the falsy ones a conditional leaves behind', () => {
    // What an unmet `cond && 'class'` and an unset prop each leave behind.
    expect(cn('grid', false, undefined, 'z-1')).toBe('grid z-1')
  })

  it('lets the later of two conflicting utilities win', () => {
    // What separates this from a plain join: a caller's override has to beat
    // the class the component already set, whichever order they are written in.
    expect(cn('z-1', 'z-2')).toBe('z-2')
  })

  it('keeps utilities that only look like they conflict', () => {
    expect(cn('col-start-1', 'row-start-1')).toBe('col-start-1 row-start-1')
  })

  it('flattens the arrays and objects clsx accepts', () => {
    expect(cn(['grid', { 'z-1': true, hidden: false }])).toBe('grid z-1')
  })
})
