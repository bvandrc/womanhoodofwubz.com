import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export const CircleLink = ({
  icon,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> &
  Pick<FontAwesomeIconProps, 'icon'>) => (
  <a
    target="_blank"
    tabIndex={0}
    {...props}
    className={classNames(
      'group flex size-12 items-center justify-center rounded-full border-3 border-black shadow-glow-30 shadow-black transition-shadow duration-100 hover:shadow-glow-40 hover:shadow-yellow-300',
      className,
    )}
  >
    <FontAwesomeIcon
      icon={icon}
      className="text-3xl group-hover:text-4xl"
      aria-label={props['aria-label'] ?? props.title}
    />
  </a>
)
