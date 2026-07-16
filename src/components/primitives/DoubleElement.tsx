import classNames from 'classnames'
import type { HTMLAttributes, PropsWithChildren } from 'react'

/**
 * Renders children twice, stacked: a back copy (usually carrying a glow
 * shadow) behind a front copy. `el-back`/`el-front` are marker classes so
 * children can style per-copy via `in-[.el-back]:` / `in-[.el-front]:`.
 */
export const DoubleElement = ({
  children,
  className,
  frontClassName,
  backClassName,
  ...props
}: PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    frontClassName?: string
    backClassName?: string
  }
>) => (
  <div className="grid">
    <span
      {...props}
      className={classNames(
        'el-back col-start-1 row-start-1 z-1 text-transparent border-transparent bg-transparent',
        className,
        backClassName,
      )}
      aria-hidden
    >
      {children}
    </span>
    <span
      {...props}
      className={classNames(
        'el-front col-start-1 row-start-1 z-2',
        className,
        frontClassName,
      )}
    >
      {children}
    </span>
  </div>
)
