import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import { isNotNil } from 'es-toolkit'
import { z } from 'zod/mini'

import { SANITY_DATASET, SANITY_PROJECT_ID } from '../../sanity-constants'

// No token: published content is world-readable, and an untokened client is what
// lets `useCdn` actually serve from cache.
const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(sanityClient)

// GROQ projects a field the document lacks as `null`, so the optional fields
// take `null` as well as a missing key.
const productSchema = z.object({
  _id: z.string(),
  // Loose so the crop and hotspot reach the image builder rather than being
  // stripped; an image with no asset is what the builder can't resolve.
  image: z.looseObject({ asset: z.looseObject({ _ref: z.string() }) }),
  number: z.nullish(z.number()),
  title: z.nullish(z.string()),
  type: z.nullish(z.string()),
  subtitle: z.nullish(z.string()),
  price: z.nullish(z.number()),
  soldOut: z.boolean(),
})

export type Product = z.infer<typeof productSchema>

// A product that doesn't match is logged and dropped, rather than failing the
// whole list; a response that isn't a list still throws.
const productsSchema = z.pipe(
  z.array(
    z.catch(z.nullable(productSchema), (ctx) => {
      console.error(
        'Skipping a malformed product from Sanity:',
        ctx.value,
        // `ctx.issues` are still raw, without the messages `prettifyError`
        // prints; `ctx.error` carries them finalized.
        z.prettifyError(ctx.error)
      )
      return null
    })
  ),
  z.transform((products) => products.filter(isNotNil))
)

/**
 * The published products, newest first.
 *
 * A product that doesn't match the shape the grid renders is logged and left
 * out, so one bad document can't take down the page with it.
 */
export const getProducts = async (): Promise<Product[]> =>
  productsSchema.parse(
    await sanityClient.fetch(
      `*[_type == "product"] | order(number desc) {
          _id,
          image,
          number,
          title,
          type,
          subtitle,
          price,
          "soldOut": coalesce(soldOut, false)
        }`
    )
  )

/** Sized to the grid rather than shipping the originals at full camera resolution. */
export const productImage = ({
  image,
  size,
}: Pick<Product, 'image'> & {
  /** width and height */
  size: number
}) => ({
  src: builder.image(image).size(size, size).fit('max').auto('format').url(),
  width: size,
  height: size,
})
