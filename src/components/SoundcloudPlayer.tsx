import { faSoundcloud } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useId, useRef } from 'react'

export const SoundcloudPlayer = ({
  href,
  src,
  title,
}: {
  href: string
  src: string
  title: string
}) => {
  const id = useId()
  const titleId = useId()
  const iFrameElement = useRef(null)

  return (
    // biome-ignore lint/a11y/useSemanticElements: group is fine here
    <div
      className="group -mt-3 mb-2.5 max-[1500px]:-mt-1.5"
      role="group"
      aria-label="soundcloud player"
    >
      <a
        className="inline-flex rounded-t-2xl bg-black px-4 pt-1 pb-0 font-bold text-pink-400 italic group-hover:[text-shadow:0_0_5px_var(--color-blue-700),0_0_10px_var(--color-blue-700),0_0_15px_var(--color-blue-700)]"
        href={href}
        target="_blank"
        title="SoundCloud playlist"
        id={titleId}
      >
        <p>
          <FontAwesomeIcon
            icon={faSoundcloud}
            className="pr-1 pb-px align-middle"
          />
          {title}
        </p>
      </a>
      <div className="h-73.75 w-full overflow-hidden rounded-2xl rounded-tl-none">
        <iframe
          title="SoundCloud Player"
          width="100%"
          height="350"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={src}
          id={id}
          ref={iFrameElement}
          aria-labelledby={titleId}
          className="relative -top-1.25 invert hue-rotate-180"
        />
      </div>
    </div>
  )
}
