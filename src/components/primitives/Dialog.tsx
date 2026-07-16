import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import type { PropsWithChildren } from 'react'
import { cloneElement, useId, useState } from 'react'
import Modal from 'react-modal'

export const Dialog = ({
  children,
  title,
  target,
  className,
  headerClassName,
}: PropsWithChildren<
  {
    title: React.ReactNode
    target: React.ReactElement
    /** Overrides the header's default `items-center` alignment */
    headerClassName?: string
  } & Pick<React.HTMLAttributes<HTMLElement>, 'className'>
>) => {
  const [isOpen, setIsOpen] = useState(false)
  const dialogId = useId()
  const titleId = useId()

  return (
    <>
      {cloneElement(target, {
        onClick: () => setIsOpen(true),
        'aria-haspopup': 'dialog',
        role: 'button',
        tabIndex: 0,
      } satisfies React.HTMLAttributes<HTMLElement>)}
      {/* @ts-expect-error - react-modal's class type is incompatible with React 18's Component (refs) */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        overlayClassName="fixed inset-0 z-5 bg-neutral-700/70"
        className={classNames(
          'absolute top-1/2 left-1/2 mr-[-50%] max-w-[80%] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-[1em] border-2 border-purple-900 bg-amber-300 p-[1em] font-outfit outline-none',
          className,
        )}
        aria={{ labelledby: titleId }}
        id={dialogId}
      >
        <div
          className={classNames(
            'mb-[0.5em] flex justify-between gap-[1em]',
            headerClassName ?? 'items-center',
          )}
        >
          <h3 id={titleId} className="text-[1.17em] font-bold">
            {title}
          </h3>
          <button
            aria-label="close dialog"
            type="button"
            aria-controls={dialogId}
            onClick={() => setIsOpen(false)}
            className="rounded-[0.5em] border-2 bg-transparent p-[0.5em] hover:bg-black/15"
          >
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </button>
        </div>
        {children}
      </Modal>
    </>
  )
}
