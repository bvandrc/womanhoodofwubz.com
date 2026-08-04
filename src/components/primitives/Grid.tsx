import classNames from 'classnames'
import type { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react'
import { Children } from 'react'
import { GRID_MIN_COLUMN_WIDTH } from '../../contants'

export const Grid = ({
  children,
  className,
  style,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      {...props}
      style={
        {
          '--grid-min-column': `${GRID_MIN_COLUMN_WIDTH}px`,
          ...style,
        } as CSSProperties
      }
      className={classNames(
        'grid grid-cols-fit justify-center gap-6 max-md:mx-2 max-md:gap-2',
        className,
      )}
    >
      {Children.map(children, (child) => (
        <div className="@container z-1 aspect-square overflow-hidden rounded-3xl border-4 border-purple-900 hover:border-yellow-300 hover:shadow-glow-grid-item">
          {child}
        </div>
      ))}
    </div>
  )
}
