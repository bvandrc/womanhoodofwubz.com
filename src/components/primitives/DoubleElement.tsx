import type { HTMLAttributes, PropsWithChildren } from 'react'
import { useLayoutEffect, useRef } from 'react'
import { cn } from '../../utils/cn'

/**
 * Renders children twice, stacked: a back copy (usually carrying a glow
 * shadow) behind a front copy. `el-back`/`el-front` are marker classes so
 * children can style per-copy via `in-[.el-back]:` / `in-[.el-front]:`.
 *
 * Children keep their own `id` props on the front copy only — see below.
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
>) => {
  const backRef = useRef<HTMLSpanElement>(null)

  // Duplicating the children duplicates their ids, which is invalid HTML and
  // makes `getElementById` — how `aria-labelledby` and `for` resolve — match
  // the decorative copy. Strip them so the front copy keeps the only set.
  useLayoutEffect(() => {
    const back = backRef.current
    if (!back) return

    for (const element of [back, ...back.querySelectorAll('[id]')]) {
      element.removeAttribute('id')
    }
  })

  return (
    <div className="grid">
      <span
        {...props}
        ref={backRef}
        className={cn(
          'el-back col-start-1 row-start-1 z-1 text-transparent border-transparent bg-transparent',
          className,
          backClassName
        )}
        aria-hidden={true}>
        {children}
      </span>
      <span
        {...props}
        className={cn(
          'el-front col-start-1 row-start-1 z-2',
          className,
          frontClassName
        )}>
        {children}
      </span>
    </div>
  )
}
