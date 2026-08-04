import { createClient } from '@sanity/client'
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url'
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

export interface Product {
  _id: string
  image: SanityImageSource
  number?: number
  title?: string
  type?: string
  subtitle?: string
  price?: number
  soldOut?: boolean
}

export const getProducts = (): Promise<Product[]> =>
  sanityClient.fetch<Product[]>(
    `*[_type == "product"] | order(number desc) {
          _id,
          image,
          number,
          title,
          type,
          subtitle,
          price,
          soldOut
        }`,
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
