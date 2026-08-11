const testId = <S extends string>(testid: S) =>
  `[data-testid="${testid}"]` as const

export const SELECTORS = {
  HEADER: {
    DESIGNED_HATS: testId('header-designed-hats'),
    CUSTOM_HATS: testId('header-custom-hats'),
  },
  PRODUCT_GRID: {
    SELF: testId('product-grid'),
    TILE: testId('product-grid-tile'),
    IMAGE: testId('product-grid-image'),
  },
  DIALOG: {
    SELF: testId('dialog'),
  },
} as const
