const testId = <S extends string>(testid: S) =>
  `[data-testid="${testid}"]` as const

export const SELECTORS = {
  PRODUCT_GRID: {
    SELF: testId('product-grid'),
    IMAGE: testId('product-grid-image'),
  },
} as const
