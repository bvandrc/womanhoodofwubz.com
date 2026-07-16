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
        'grid grid-cols-[repeat(auto-fit,minmax(min(280px,40%),1fr))] justify-center gap-[1.5em] max-[800px]:mx-[0.5em] max-[800px]:gap-[0.5em]',
        className,
      )}
    >
      {Children.map(children, (child) => (
        <div className="@container z-1 aspect-square overflow-hidden rounded-[1.5em] border-[5px] border-purple-900 hover:border-yellow-300 hover:shadow-glow-grid-item">
          {child}
        </div>
      ))}
    </div>
  )
}
