import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { PropsWithChildren } from 'react'
import { cloneElement, useId, useState } from 'react'
import Modal from 'react-modal'
import { cn } from '@/utils'

export const Dialog = ({
  children,
  title,
  target,
  className,
  headerClassName = 'items-center',
  'data-testid': dataTestId,
}: PropsWithChildren<
  {
    title: React.ReactNode
    target: React.ReactElement
    /**
     * @default 'items-center'
     */
    headerClassName?: string
    'data-testid'?: string
  } & Pick<React.HTMLAttributes<HTMLElement>, 'className'>
>) => {
  const [isOpen, setIsOpen] = useState(false)
  const dialogId = useId()
  const titleId = useId()

  return (
    <>
      {cloneElement(target, {
        onClick: () => setIsOpen(true),
        // The target may be a non-button element carrying role="button", which
        // browsers don't activate from the keyboard on its own.
        onKeyDown: (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setIsOpen(true)
          }
        },
        'aria-haspopup': 'dialog',
        'aria-expanded': isOpen,
        role: 'button',
        tabIndex: 0,
      } satisfies React.HTMLAttributes<HTMLElement>)}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        overlayClassName="fixed inset-0 z-5 bg-neutral-700/70"
        className={cn(
          'absolute top-1/2 left-1/2 mr-[-50%] max-w-[80%] -translate-1/2 overflow-auto rounded-2xl border-2 border-purple-900 bg-amber-300 p-4 font-outfit outline-none',
          className
        )}
        aria={{ labelledby: titleId }}
        id={dialogId}
        testId={dataTestId}>
        <div className={cn('mb-2 flex justify-between gap-4', headerClassName)}>
          <h3 id={titleId} className="text-lg font-bold">
            {title}
          </h3>
          <button
            aria-label="close dialog"
            type="button"
            aria-controls={dialogId}
            onClick={() => setIsOpen(false)}
            className="rounded-lg border-2 bg-transparent p-2 hover:bg-black/15">
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </button>
        </div>
        {children}
      </Modal>
    </>
  )
}
