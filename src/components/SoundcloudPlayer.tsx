import { useId } from 'react'
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const SoundcloudPlayer = ({
  href,
  src,
  title,
}: {
  href: string
  src: string
  title: string
}) => {
  const titleId = useId()

  return (
    // biome-ignore lint/a11y/useSemanticElements: group is fine here
    <div
      className="group flex h-full flex-col bg-black"
      role="group"
      aria-label="soundcloud player">
      <a
        className="inline-flex px-4 pt-1 font-bold text-pink-400 italic group-hover:text-shadow-glow-blue"
        href={href}
        target="_blank"
        title="SoundCloud playlist"
        id={titleId}
        rel="noopener">
        <p>
          <FontAwesomeIcon
            icon={faSoundcloud}
            className="pr-1 pb-px align-middle"
          />
          {title}
        </p>
      </a>
      {/* Oversize the widget inside a clipping box: it draws a light border on
          its top edge and a SoundCloud footer bar at the bottom, both of which
          we'd rather crop than show. */}
      <div className="w-full min-h-0 flex-1 overflow-hidden">
        <iframe
          title="SoundCloud Player"
          width="100%"
          allow="autoplay; encrypted-media"
          src={src}
          aria-labelledby={titleId}
          className="relative -top-1.25 h-[calc(100%+65px)] border-0 invert hue-rotate-180"
        />
      </div>
    </div>
  )
}
