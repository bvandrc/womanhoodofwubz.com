import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { cn } from '@/utils'
import { DoubleElement } from './DoubleElement'

type CircleLinkProps = Pick<FontAwesomeIconProps, 'icon'> &
  React.HTMLAttributes<HTMLElement> &
  Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

/** Renders a link when given an `href`, otherwise a button. */
export const CircleLink = ({
  icon,
  className,
  href,
  ...props
}: CircleLinkProps) => {
  const inner = (
    <DoubleElement
      className="flex size-12 items-center justify-center rounded-full border-3"
      frontClassName={cn(
        'border-black transition-[box-shadow,border-color] duration-100 group-hover:border-yellow-300 group-hover:shadow-glow-40 group-hover:shadow-yellow-300',
        className
      )}
      backClassName="shadow-glow-icon">
      <FontAwesomeIcon
        icon={icon}
        className="text-2xl group-hover:text-3xl"
        aria-label={props['aria-label'] ?? props.title}
      />
    </DoubleElement>
  )

  return href !== undefined ? (
    <a target="_blank" rel="noopener" href={href} {...props} className="group">
      {inner}
    </a>
  ) : (
    <button type="button" {...props} className="group">
      {inner}
    </button>
  )
}
