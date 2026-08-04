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
import { GridImage } from './components/GridImage'
import { Header } from './components/Header'
import { Grid } from './components/primitives/Grid'
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

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_TOKEN } = process.env
if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
  console.error(process.env)
  throw new Error('need env file')
}

Modal.setAppElement('#root')

const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
  ...(SANITY_TOKEN ? { token: SANITY_TOKEN } : {}),
})

const builder = createImageUrlBuilder(sanityClient)
const urlFor = (source: SanityImageSource) => builder.image(source).url()

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
        <Grid id={GRID_ID}>
          {data?.map((item) => {
            const url = urlFor(item.image)
            if (!url) return null
            return (
              <GridImage key={`griditem-${item._id}`} {...item} src={url} />
            )
          })}
        </Grid>
      </main>
    </>
  )
}
