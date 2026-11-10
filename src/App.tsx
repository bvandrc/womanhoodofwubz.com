import '@fontsource/outfit'
// Sizing/layout styles for the inline SVGs FontAwesomeIcon renders. Without
// this, icons fall back to their intrinsic viewBox size and blow up the page.
// FontAwesome would otherwise inject these itself, into a <style> tag our CSP
// (`style-src 'self'`) refuses — hence the import, and autoAddCss off below so
// it stops trying.
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './styles/index.css'

config.autoAddCss = false

import { useEffect } from 'react'
import { createLazyLoad } from '@bvandrc/react-toolkit'
import Modal from 'react-modal'

import { getProducts, productImage } from './api/sanity'
import { Header } from './components/Header'
import {
  MAIN_GRID_IMAGE_SIZE,
  MainGrid,
  MainGridCell,
} from './components/MainGrid'
import { ProductListing } from './components/ProductListing'
import { SoundcloudPlayer } from './components/SoundcloudPlayer'

const GRID_ID = 'main-grid'

Modal.setAppElement('#root')

const useProducts = createLazyLoad(getProducts)

export const App = () => {
  const { value: data, isFailed: failed, prefetch } = useProducts()

  useEffect(prefetch, [prefetch])

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
        <MainGrid
          id={GRID_ID}
          className="mt-4 max-md:mt-2"
          data-testid="product-grid">
          <MainGridCell span={2}>
            <SoundcloudPlayer
              href="https://soundcloud.com/marisa-kerstanski/sets/womanhood-of-wubz-vol-3"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1922773207&color=%23FF69B4&auto_play=true&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false"
              title="Womanhood Of Wubz - Volume 3"
            />
          </MainGridCell>
          {!failed &&
            data?.map((item) => (
              <MainGridCell key={item._id}>
                <ProductListing
                  {...item}
                  {...productImage({
                    image: item.image,
                    size: MAIN_GRID_IMAGE_SIZE,
                  })}
                />
              </MainGridCell>
            ))}
        </MainGrid>
        {failed && (
          <p className="my-8 text-center font-outfit text-lg text-rose-200">
            Couldn't load the products right now — please try again later, or
            reach us on Instagram.
          </p>
        )}
      </main>
    </>
  )
}
