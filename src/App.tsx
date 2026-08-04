import '@fontsource/outfit'
import './styles/index.css'

import './api/soundcloudWidget'

import { createClient } from '@sanity/client'
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { SANITY_DATASET, SANITY_PROJECT_ID } from '../sanity-constants'
import { Header } from './components/Header'
import { PRODUCT_IMAGE_SIZE, ProductGrid } from './components/ProductGrid'
import { ProductListing } from './components/ProductListing'
import { SoundcloudPlayer } from './components/SoundcloudPlayer'

interface Product {
  _id: string
  image: SanityImageSource
  number?: number
  title?: string
  type?: string
  subtitle?: string
  price?: number
  soldOut?: boolean
}

const GRID_ID = 'main-grid'

Modal.setAppElement('#root')

// No token: published content is world-readable, and an untokened client is what
// lets `useCdn` actually serve from cache.
const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(sanityClient)

/** Sized to the grid rather than shipping the originals at full camera resolution. */
const gridImage = ({ image }: Product) => ({
  src: builder
    .image(image)
    .size(PRODUCT_IMAGE_SIZE, PRODUCT_IMAGE_SIZE)
    .fit('max')
    .auto('format')
    .url(),
  width: PRODUCT_IMAGE_SIZE,
  height: PRODUCT_IMAGE_SIZE,
})

const getProducts = (): Promise<Product[]> =>
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

export const App = () => {
  const [data, setData] = useState<Product[]>()

  useEffect(() => {
    getProducts()
      .then((d) => {
        setData(d)
      })
      .catch((error) => alert(error))
  }, [])

  return (
    <>
      <Header
        scrollToGrid={() =>
          document
            .getElementById(GRID_ID)
            ?.scrollIntoView({ behavior: 'smooth' })
        }
      />
      <main>
        <SoundcloudPlayer
          href="https://soundcloud.com/marisa-kerstanski/sets/womanhood-of-wubz-vol-3"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1922773207&color=%23FF69B4&auto_play=true&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false"
          title="Womanhood Of Wubz - Volume 3"
        />
        <ProductGrid id={GRID_ID}>
          {data?.map((item) => (
            <ProductListing
              key={`griditem-${item._id}`}
              {...item}
              {...gridImage(item)}
            />
          ))}
        </ProductGrid>
      </main>
    </>
  )
}
