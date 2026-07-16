import classNames from 'classnames'
import type { HTMLAttributes, PropsWithChildren } from 'react'
import { Children } from 'react'

export const Grid = ({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      {...props}
      className={classNames(
        'grid grid-cols-fit-280 justify-center gap-6 max-md:mx-2 max-md:gap-2',
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
