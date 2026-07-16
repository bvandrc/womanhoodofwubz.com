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
      'group flex size-[3em] items-center justify-center rounded-full border-[5px] border-black shadow-[0_0_30px] shadow-black transition-all duration-100 hover:shadow-[0_0_40px] hover:shadow-yellow-300',
      className,
    )}
  >
    <FontAwesomeIcon
      icon={icon}
      className="text-[2em] group-hover:text-[2.2em]"
      aria-label={props['aria-label'] ?? props.title}
    />
  </a>
)
