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

const BUTTON_CLASSES = 'w-[8em] rounded-[0.5em] border-2 p-[0.5em]'
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
          className="mx-auto -mb-2 block max-h-45 max-w-[calc(100%-20px)] pt-1.25 filter-[drop-shadow(0_0_30px_var(--color-purple-950))_drop-shadow(0_0_50px_black)_drop-shadow(0_0_30px_black)] max-[1500px]:max-w-[85%]"
        />
        <div className="my-[0.5em] flex flex-col items-center justify-center text-balance text-center font-outfit text-[1.2em]">
          <DoubleElement backClassName="text-glow-header">
            <p className="mb-[0.2em] translate-x-[-0.25em] text-[1em] in-[.el-front]:text-sky-300">
              <span className="in-[.el-back]:rounded-[20px] in-[.el-back]:bg-purple-950 in-[.el-back]:shadow-glow-icon">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size="sm"
                  className="pr-[0.4em]"
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
        <div className="flex items-center justify-center gap-2.5 pt-[0.1em] text-center">
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
            className="w-75 leading-[2em]"
          >
            Custom designs page is in the works! For now, see our{' '}
            <b>
              <a
                href="https://www.instagram.com/p/DDr601Wx6sF/?img_index=1"
                className="rounded-[1em] bg-purple-900 px-[0.5em] py-[0.2em] text-lime-400 hover:bg-fuchsia-900"
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
      <div className="absolute right-25 bottom-0 text-right max-[1500px]:relative max-[1500px]:right-auto max-[1500px]:mx-auto max-[1500px]:my-[0.7em] max-[1500px]:text-center max-[1500px]:leading-[1em]">
        <section className="text-center" aria-label="links and social media">
          <span className="mb-[0.3em] inline-block text-emerald-200 italic max-[1500px]:absolute max-[1500px]:left-1/2 max-[1500px]:m-0 max-[1500px]:max-w-[4em] max-[1500px]:translate-x-[-10.1em] max-[1500px]:translate-y-[0.75em] max-[1500px]:text-right">
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
