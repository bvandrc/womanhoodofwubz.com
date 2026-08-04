import classNames from 'classnames'
import type { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react'

/**
 * Fits as many columns as will hold `minColumnWidth`, then shares the leftover
 * space between them. Children are laid out as-is — wrap them yourself if the
 * cells need chrome.
 */
export const Grid = ({
  children,
  className,
  style,
  minColumnWidth,
  ...props
}: PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & { minColumnWidth: number }
>) => (
  <div
    {...props}
    style={
      {
        '--grid-min-column': `${minColumnWidth}px`,
        ...style,
      } as CSSProperties
    }
    className={classNames('grid grid-cols-fit', className)}
  >
    {children}
  </div>
)
