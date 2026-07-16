import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { copyEmail, INSTAGRAM_USERNAME } from '../contants'

const LINK_BUTTON_CLASSES =
  'box-border block w-48 min-w-0 rounded-xl border-4 border-black p-2 hover:border-yellow-300 hover:shadow-[0_0_10px,0_0_40px] hover:shadow-purple-900'

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
      className="max-w-full rounded-2xl"
    />
    <div>
      <p>Order form is in the works! For now, send us a message to order:</p>

      {/** biome-ignore lint/a11y/useSemanticElements: group is fine here */}
      <div
        className="mt-3 grid justify-center gap-0.5 font-bold text-2xl"
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
          className={`bg-sky-400 ${LINK_BUTTON_CLASSES}`}
          type="button"
          onClick={copyEmail}
        >
          Email <FontAwesomeIcon icon={faEnvelope} size="xl" />
        </button>
      </div>
    </div>
  </div>
)
