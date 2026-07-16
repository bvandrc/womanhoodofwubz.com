import '@fontsource/outfit'
import './styles/index.css'

import './api/soundcloudWidget'

import * as contentful from 'contentful'
import { isString } from 'es-toolkit'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { GridImage } from './components/GridImage'
import { Header } from './components/Header'
import { Grid } from './components/primitives/Grid'
import { SoundcloudPlayer } from './components/SoundcloudPlayer'

type Product = contentful.EntrySkeletonType<{
  image: contentful.EntryFieldTypes.AssetLink
  title?: contentful.EntryFieldTypes.Text
  subtitle?: contentful.EntryFieldTypes.Text
  number?: contentful.EntryFieldTypes.Integer
  price?: contentful.EntryFieldTypes.Number
  soldOut?: contentful.EntryFieldTypes.Boolean
  type?: contentful.EntryFieldTypes.Text
}>

const GRID_ID = 'main-grid'

const { CONTENTFUL_SPACE, CONTENTFUL_ACCESS_TOKEN } = process.env
if (!CONTENTFUL_SPACE || !CONTENTFUL_ACCESS_TOKEN) {
  console.error(process.env)
  throw new Error('need env file')
}

Modal.setAppElement('#root')

const contentfulClient = contentful.createClient({
  space: CONTENTFUL_SPACE,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
})

type ContentfulResponse = Awaited<
  ReturnType<typeof contentfulClient.getEntries<Product>>
>

export const App = () => {
  const [data, setData] = useState<ContentfulResponse>()

  useEffect(() => {
    contentfulClient
      .getEntries<Product>({
        content_type: 'product',
        order: ['-fields.number'],
      })
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
          {data?.items.map((item) => {
            const { image, title, subtitle, number, type, price, soldOut } =
              item.fields

            const url = (image as contentful.Asset)?.fields?.file?.url
            if (!url || !isString(url)) return null

            return (
              <GridImage
                key={`grid-image-${number}-title-${title}`}
                src={url.replace(/^\/\//, 'https://')} // Contentful asset URLs are protocol-relative; force https
                title={title}
                type={type}
                subtitle={subtitle}
                number={number}
                price={price}
                soldOut={soldOut}
              />
            )
          })}
        </Grid>
      </main>
    </>
  )
}
