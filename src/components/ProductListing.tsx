import type { ReactNode } from 'react'
import { useId } from 'react'
import { pick } from 'es-toolkit'

import { cn } from '@/utils'
import { OrderDialog } from './OrderDialog'
import { Dialog } from './primitives/Dialog'
import { DoubleElement } from './primitives/DoubleElement'

export interface ProductImageLabeledProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    Required<
      Pick<
        React.ImgHTMLAttributes<HTMLImageElement>,
        'src' | 'width' | 'height'
      >
    > {
  title?: ReactNode
  type?: ReactNode
  subtitle?: ReactNode
  number?: ReactNode
  price?: ReactNode
  soldOut?: boolean
}

const ProductImageLabeled = ({
  src,
  width,
  height,
  titleId,
  number,
  title,
  type,
  subtitle,
  soldOut,
  price,
  className,
  ...rest
}: ProductImageLabeledProps & { titleId: string }) => (
  // Opens the order dialog: this is a Dialog target, which supplies the
  // click/key handlers to go with the role.
  // biome-ignore lint/a11y/useSemanticElements: a real button would restyle the tile
  <div
    role="button"
    tabIndex={0}
    className={cn(
      'relative flex items-center justify-center overflow-hidden',
      className
    )}
    aria-labelledby={titleId}
    data-testid="product-grid-tile"
    {...rest}>
    <img
      src={src}
      width={width}
      height={height}
      aria-labelledby={titleId}
      className="max-h-full"
      data-testid="product-grid-image"
    />
    <div className="absolute top-0 left-3 text-[11cqw]">
      <DoubleElement
        frontClassName="text-sky-300"
        backClassName="text-glow-grid">
        #{number}
      </DoubleElement>
    </div>
    <div className="absolute left-0 bottom-1 ml-2.5 text-[10cqw]">
      <DoubleElement backClassName="text-glow-grid">
        {title && (
          <p className="font-bold text-fuchsia-400 leading-none" id={titleId}>
            {title}
            <br />
            <span className="font-normal text-[80%]">{type}</span>
          </p>
        )}
        {subtitle && <p className="text-rose-200">{subtitle}</p>}
      </DoubleElement>
    </div>
    <div className="absolute right-3 bottom-2 text-[10cqw]">
      {soldOut ? (
        <DoubleElement
          className="italic"
          frontClassName="text-amber-500"
          backClassName="text-glow-grid">
          Sold!
        </DoubleElement>
      ) : (
        price && (
          <DoubleElement
            frontClassName="text-sky-300"
            backClassName="text-glow-grid">
            ${price}
          </DoubleElement>
        )
      )}
    </div>
  </div>
)

export const ProductListing = (props: ProductImageLabeledProps) => {
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
      target={<ProductImageLabeled {...props} titleId={titleId} />}
      className="w-75 text-xl"
      headerClassName="items-start"
      data-testid="product-dialog">
      <OrderDialog
        imgProps={pick(props, ['src', 'width', 'height'])}
        titleId={titleId}
      />
    </Dialog>
  )
}
