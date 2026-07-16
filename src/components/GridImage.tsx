import classNames from 'classnames'
import type { ReactNode } from 'react'
import { useId } from 'react'
import { OrderDialog } from './OrderDialog'
import { Dialog } from './primitives/Dialog'
import { DoubleElement } from './primitives/DoubleElement'

interface GridImageTargetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  src: string
  title?: ReactNode
  titleId: string
  type?: ReactNode
  subtitle?: ReactNode
  number?: ReactNode
  price?: ReactNode
  soldOut?: boolean
}

const GridImageTarget = ({
  src,
  titleId,
  number,
  title,
  type,
  subtitle,
  soldOut,
  price,
  className,
  ...rest
}: GridImageTargetProps) => (
  // biome-ignore lint/a11y/useSemanticElements: group is fine here
  <div
    role="group"
    className={classNames(
      'relative flex items-center justify-center overflow-hidden',
      className,
    )}
    aria-labelledby={titleId}
    {...rest}
  >
    <img
      src={src}
      aria-labelledby={titleId}
      className="max-h-full max-w-full"
    />
    <div className="absolute top-0 left-[0.3em] text-[11cqw]">
      <DoubleElement
        frontClassName="text-sky-300"
        backClassName="text-glow-grid"
      >
        #{number}
      </DoubleElement>
    </div>
    <div className="absolute bottom-0 left-[0.3em] ml-[0.3em] text-[10cqw]">
      <DoubleElement backClassName="text-glow-grid">
        {title && (
          <p className="font-bold text-fuchsia-400 leading-none" id={titleId}>
            {title}
            <br />
            <span className="font-normal text-[80%]" id={titleId}>
              {type}
            </span>
          </p>
        )}
        {subtitle && <p className="text-rose-200">{subtitle}</p>}
      </DoubleElement>
    </div>
    <div className="absolute right-[0.3em] bottom-[0.2em] text-[10cqw]">
      {soldOut ? (
        <DoubleElement
          className="italic"
          frontClassName="text-amber-500"
          backClassName="text-glow-grid"
        >
          Sold!
        </DoubleElement>
      ) : (
        price && (
          <DoubleElement
            frontClassName="text-sky-300"
            backClassName="text-glow-grid"
          >
            ${price}
          </DoubleElement>
        )
      )}
    </div>
  </div>
)

interface GridImageProps extends Omit<GridImageTargetProps, 'titleId'> {}

export const GridImage = (props: GridImageProps) => {
  const titleId = useId()

  return (
    <Dialog
      title={
        <>
          <span className="font-black text-3xl">{props.title}</span>
          <br />
          <span className="text-base">{props.type}</span>
          <span className="ml-2 text-neutral-500 text-sm italic">
            (#{props.number})
          </span>
        </>
      }
      target={<GridImageTarget {...props} titleId={titleId} />}
      className="w-75 text-xl"
      headerClassName="items-start"
    >
      <OrderDialog
        subtitle={props.subtitle}
        src={props.src}
        titleId={titleId}
      />
    </Dialog>
  )
}
