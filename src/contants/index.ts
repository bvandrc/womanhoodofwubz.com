export const INSTAGRAM_USERNAME = 'womanhoodofwubz'

/**
 * Narrowest a product grid column gets, in px. Feeds both the grid's
 * `--grid-min-column` and the size images are requested at, so the two can't
 * drift.
 */
export const GRID_MIN_COLUMN_WIDTH = 280

export const copyEmail = () => {
  const EMAIL = 'WomanhoodOfWubz1@gmail.com'
  navigator.clipboard.writeText(EMAIL)
  alert(`Copied to clipboard: ${EMAIL}\n\nTell us what you want!`)
}
