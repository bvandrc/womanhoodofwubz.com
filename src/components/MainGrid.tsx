import type { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '@/utils'
import { Grid as GridBase } from './primitives/Grid'

const MIN_COLUMN_WIDTH = 280

/**
 * Product shots are square, and `auto-fit` adds columns rather than stretching
 * them, so cells stay near their minimum width — 2x covers retina. Request
 * images at this size and give the `img` these dimensions, so the grid doesn't
 * reflow as they arrive.
 */
export const MAIN_GRID_IMAGE_SIZE = MIN_COLUMN_WIDTH * 2

export const MainGrid = ({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <GridBase
    {...props}
    minColumnWidth={MIN_COLUMN_WIDTH}
    className={cn('justify-center gap-6 max-md:mx-2 max-md:gap-2', className)}>
    {children}
  </GridBase>
)

/** Cells keep one square per column they span, so rows stay a uniform height. */
const SPAN_CLASSES = {
  1: 'aspect-square',
  2: 'col-span-2 aspect-2/1',
} satisfies Record<number, string>

/** A grid cell with the tile chrome. Every `ProductGrid` child should be one. */
export const MainGridCell = ({
  span = 1,
  children,
  className,
  ...props
}: PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & { span?: keyof typeof SPAN_CLASSES }
>) => (
  <div
    {...props}
    className={cn(
      '@container z-1 overflow-hidden rounded-3xl border-4 border-purple-900 hover:border-yellow-300 hover:shadow-glow-grid-item',
      SPAN_CLASSES[span],
      className
    )}>
    {children}
  </div>
)
