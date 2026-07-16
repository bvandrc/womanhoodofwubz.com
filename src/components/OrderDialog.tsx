import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { copyEmail, INSTAGRAM_USERNAME } from '../contants'

const LINK_BUTTON_CLASSES =
  'box-border block w-[8em] min-w-0 rounded-[0.5em] border-4 border-black p-[0.3em] hover:border-[yellow] hover:shadow-[0_0_10px_indigo,0_0_40px_indigo]'

export const OrderDialog = ({
  subtitle,
  src,
  titleId,
}: {
  subtitle: React.ReactNode
  src: string
  titleId: string
}) => (
  <div className="text-center">
    {subtitle}
    <img
      src={src}
      aria-labelledby={titleId}
      className="max-w-full rounded-[1em]"
    />
    <div>
      <p>Order form is in the works! For now, send us a message to order:</p>

      {/** biome-ignore lint/a11y/useSemanticElements: group is fine here */}
      <div
        className="mt-[0.5em] grid justify-center gap-0.5 font-bold text-[1.2em]"
        role="group"
        aria-label="send links"
      >
        <a
          tabIndex={0}
          className={`bg-instagram ${LINK_BUTTON_CLASSES}`}
          href={`https://ig.me/m/${INSTAGRAM_USERNAME}`}
        >
          Instagram <FontAwesomeIcon icon={faInstagramSquare} size="xl" />
        </a>
        <button
          className={`bg-email ${LINK_BUTTON_CLASSES}`}
          type="button"
          onClick={copyEmail}
        >
          Email <FontAwesomeIcon icon={faEnvelope} size="xl" />
        </button>
      </div>
    </div>
  </div>
)
