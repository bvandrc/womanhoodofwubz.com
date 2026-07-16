import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

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
  const sharedClassName = classNames(
    'group flex size-12 items-center justify-center rounded-full border-3 border-black shadow-glow-30 shadow-black transition-shadow duration-100 hover:shadow-glow-40 hover:shadow-yellow-300',
    className,
  )
  const inner = (
    <FontAwesomeIcon
      icon={icon}
      className="text-2xl group-hover:text-3xl"
      aria-label={props['aria-label'] ?? props.title}
    />
  )

  return href !== undefined ? (
    <a
      target="_blank"
      tabIndex={0}
      href={href}
      {...props}
      className={sharedClassName}
    >
      {inner}
    </a>
  ) : (
    <button type="button" {...props} className={sharedClassName}>
      {inner}
    </button>
  )
}
