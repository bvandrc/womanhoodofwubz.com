import type { HTMLAttributes } from 'react'
import { faInstagram, faSoundcloud } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faCircleArrowDown,
  faEnvelope,
  faExternalLink,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { INSTAGRAM_USERNAME } from '@/constants'
import { useCopyEmail } from '@/hooks/useCopyEmail'
import { cn } from '@/utils'
import { CircleLink } from './primitives/CircleLink'
import { Dialog } from './primitives/Dialog'

// Wide enough to keep each label and its icon on one line. Hover swaps the one
// var the gradient keys off, so the edge and the fill turn yellow together.
const BUTTON_CLASSES =
  'w-40 whitespace-nowrap rounded-lg border-2 p-2 gradient-border shadow-glow-header hover:[--gradient-accent:var(--color-yellow-300)] hover:text-yellow-300 hover:shadow-glow-header-hover'

// One var drives both the edge gradient and the fill tint.
const BUTTON_ACCENTS = {
  DESIGNED_HATS: '[--gradient-accent:var(--color-cyan-300)] text-cyan-300',
  CUSTOM_HATS: '[--gradient-accent:var(--color-amber-500)] text-amber-500',
}

export const Header = ({
  scrollToGrid,
}: {
  scrollToGrid: HTMLAttributes<HTMLButtonElement>['onClick']
}) => {
  const copyEmail = useCopyEmail()

  return (
    <header className="relative">
      <div id="header-center">
        <h1>
          <img
            src="/Logo.png"
            alt="Womanhood of Wubz"
            width={422}
            height={423}
            className="mx-auto -mb-2 h-auto max-h-36 w-auto px-2.5 pt-1.25 filter-(--filter-logo) max-2xl:max-w-5/6"
          />
        </h1>
        <div className="my-2.5 flex flex-col items-center justify-center text-balance text-center font-outfit text-xl filter-(--filter-glow-header)">
          <p className="mb-1 -translate-x-1 text-sky-300">
            <FontAwesomeIcon icon={faLocationDot} size="sm" className="pr-2" />
            Denver, CO
          </p>
          <p className="text-fuchsia-400">
            Bringing you the accessories that celebrate the magic of good music
            and the power of connection
          </p>
        </div>
        <div className="flex items-center justify-center gap-2.5 pt-0.5 text-center">
          <button
            type="button"
            onClick={scrollToGrid}
            className={cn(BUTTON_CLASSES, BUTTON_ACCENTS.DESIGNED_HATS)}
            data-testid="header-designed-hats-btn">
            Designed Hats <FontAwesomeIcon icon={faCircleArrowDown} />
          </button>
          <Dialog
            target={
              <button
                type="button"
                className={cn(BUTTON_CLASSES, BUTTON_ACCENTS.CUSTOM_HATS)}
                data-testid="header-custom-hats-btn">
                Custom Hats <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </button>
            }
            title="Custom Designs"
            className="w-75 leading-loose"
            data-testid="custom-designs-dialog">
            Custom designs page is in the works! For now, see our{' '}
            <b>
              <a
                href="https://www.instagram.com/p/DDr601Wx6sF/?img_index=1"
                target="_blank"
                rel="noopener"
                className="rounded-2xl bg-purple-900 px-2 py-1 text-lime-400 hover:bg-fuchsia-900">
                Instagram post{' '}
                <FontAwesomeIcon icon={faExternalLink} size="xs" />
              </a>
            </b>{' '}
            for information on custom orders, including dimensions for each hat
            size. We have all sizes!
          </Dialog>
        </div>
      </div>
      <div className="absolute right-25 bottom-0 text-right max-2xl:relative max-2xl:right-auto max-2xl:mx-auto max-2xl:my-3 max-2xl:text-center max-2xl:leading-none">
        <section className="text-center" aria-label="links and social media">
          <span className="mb-1 inline-block text-emerald-200 italic max-2xl:absolute max-2xl:left-1/2 max-2xl:m-0 max-2xl:max-w-16 max-2xl:-translate-x-40 max-2xl:translate-y-3 max-2xl:text-right">
            <span className="flex items-center justify-center filter-(--filter-glow-header)">
              Connect with us!
            </span>
          </span>
          <div className="flex items-center justify-center gap-0.5">
            <CircleLink
              className="bg-instagram"
              title="Instagram"
              icon={faInstagram}
              href={`https://www.instagram.com/${INSTAGRAM_USERNAME}/`}
            />
            <CircleLink
              className="bg-sky-400"
              title="Email"
              icon={faEnvelope}
              onClick={copyEmail}
            />
            <CircleLink
              className="bg-soundcloud"
              title="SoundCloud"
              icon={faSoundcloud}
              href="https://soundcloud.com/marisa-kerstanski"
            />
          </div>
        </section>
      </div>
    </header>
  )
}
