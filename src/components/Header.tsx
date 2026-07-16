import { faInstagram, faSoundcloud } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faCircleArrowDown,
  faEnvelope,
  faExternalLink,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { HTMLAttributes } from 'react'
import { copyEmail, INSTAGRAM_USERNAME } from '../contants'
import { CircleLink } from './primitives/CircleLink'
import { Dialog } from './primitives/Dialog'
import { DoubleElement } from './primitives/DoubleElement'

const BUTTON_CLASSES = 'w-32 rounded-lg border-2 p-2'
const BUTTON_FRONT_CLASSES =
  'bg-black hover:border-yellow-300 hover:shadow-[0_0_40px] hover:shadow-yellow-300'

export const Header = ({
  scrollToGrid,
}: {
  scrollToGrid: HTMLAttributes<HTMLButtonElement>['onClick']
}) => {
  return (
    <header className="relative w-full">
      <div id="header-center">
        <img
          src="/Logo.png"
          alt="Womanhood of Wubz"
          className="mx-auto -mb-2 block max-h-45 max-w-[calc(100%-20px)] pt-1.25 filter-[drop-shadow(0_0_30px_var(--color-purple-950))_drop-shadow(0_0_50px_black)_drop-shadow(0_0_30px_black)] max-2xl:max-w-[85%]"
        />
        <div className="my-2.5 flex flex-col items-center justify-center text-balance text-center font-outfit text-xl">
          <DoubleElement backClassName="text-glow-header">
            <p className="mb-1 -translate-x-1 in-[.el-front]:text-sky-300">
              <span className="in-[.el-back]:rounded-full in-[.el-back]:bg-purple-950 in-[.el-back]:shadow-glow-icon">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size="sm"
                  className="pr-2"
                />
              </span>
              Denver, CO
            </p>
            <p className="in-[.el-front]:text-fuchsia-400">
              Bringing you the accessories that celebrate the magic of good
              music and the power of connection
            </p>
          </DoubleElement>
        </div>
        <div className="flex items-center justify-center gap-2.5 pt-0.5 text-center">
          <button type="button" onClick={scrollToGrid}>
            <DoubleElement
              className={BUTTON_CLASSES}
              frontClassName={`${BUTTON_FRONT_CLASSES} border-cyan-300 text-cyan-300`}
              backClassName="shadow-glow-header"
            >
              Designed Hats <FontAwesomeIcon icon={faCircleArrowDown} />
            </DoubleElement>
          </button>
          <Dialog
            target={
              <button type="button">
                <DoubleElement
                  className={BUTTON_CLASSES}
                  frontClassName={`${BUTTON_FRONT_CLASSES} border-amber-500 text-amber-500`}
                  backClassName="shadow-glow-header"
                >
                  Custom Hats{' '}
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </DoubleElement>
              </button>
            }
            title="Custom Designs"
            className="w-75 leading-loose"
          >
            Custom designs page is in the works! For now, see our{' '}
            <b>
              <a
                href="https://www.instagram.com/p/DDr601Wx6sF/?img_index=1"
                className="rounded-2xl bg-purple-900 px-2 py-1 text-lime-400 hover:bg-fuchsia-900"
              >
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
            <DoubleElement
              className="flex items-center justify-center"
              backClassName="text-glow-header"
            >
              Connect with us!
            </DoubleElement>
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
