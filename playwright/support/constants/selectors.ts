const testId = <S extends string>(testid: S) =>
  `[data-testid="${testid}"]` as const

export const SELECTORS = {
  HEADER: {
    DESIGNED_HATS_BTN: testId('header-designed-hats-btn'),
    CUSTOM_HATS_BTN: testId('header-custom-hats-btn'),
  },
  PRODUCT_GRID: {
    SELF: testId('product-grid'),
    TILE: testId('product-grid-tile'),
    IMAGE: testId('product-grid-image'),
  },
  CUSTOM_DESIGNS_DIALOG: testId('custom-designs-dialog'),
  PRODUCT_DIALOG: testId('product-dialog'),
} as const
