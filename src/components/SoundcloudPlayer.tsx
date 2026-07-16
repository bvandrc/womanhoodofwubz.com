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
      className="group mt-[-0.7em] mb-[0.6em] max-[1500px]:mt-[-0.4em]"
      role="group"
      aria-label="soundcloud player"
    >
      <a
        className="inline-flex rounded-t-[20px] bg-black px-[1em] pt-[0.3em] pb-0 font-bold text-[hotpink] italic group-hover:[text-shadow:0_0_5px_blue,0_0_10px_blue,0_0_15px_blue]"
        href={href}
        target="_blank"
        title="SoundCloud playlist"
        id={titleId}
      >
        <p>
          <FontAwesomeIcon
            icon={faSoundcloud}
            className="pr-[0.2em] pb-px align-middle"
          />
          {title}
        </p>
      </a>
      <div className="h-73.75 w-full overflow-hidden rounded-[20px] rounded-tl-none">
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
