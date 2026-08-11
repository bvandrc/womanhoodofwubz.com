import type { HTMLAttributes, PropsWithChildren } from 'react'
import { Children } from 'react'
import { cn } from '../utils/cn'
import { Grid } from './primitives/Grid'

const MIN_COLUMN_WIDTH = 280

/**
 * Product shots are square, and `auto-fit` adds columns rather than stretching
 * them, so cells stay near their minimum width — 2x covers retina. Request
 * images at this size and give the `img` these dimensions, so the grid doesn't
 * reflow as they arrive.
 */
export const PRODUCT_GRID_IMAGE_SIZE = MIN_COLUMN_WIDTH * 2

export const ProductGrid = ({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <Grid
    {...props}
    minColumnWidth={MIN_COLUMN_WIDTH}
    className={cn('justify-center gap-6 max-md:mx-2 max-md:gap-2', className)}
  >
    {Children.map(children, (child) => (
      <div className="@container z-1 aspect-square overflow-hidden rounded-3xl border-4 border-purple-900 hover:border-yellow-300 hover:shadow-glow-grid-item">
        {child}
      </div>
    ))}
  </Grid>
)
