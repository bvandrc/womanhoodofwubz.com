import { SANITY_DATASET, SANITY_PROJECT_ID } from '../../../sanity-constants'
import { productImage } from '../sanity'

const IMAGE = {
  _type: 'image',
  asset: {
    _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
    _type: 'reference',
  },
}

describe('productImage', () => {
  it('requests a square of the grid size, in the format the browser prefers', () => {
    expect(productImage({ image: IMAGE, size: 400 })).toEqual({
      // `rect` squares off the 2000x3000 original, `fit=max` holds the result
      // inside the box rather than scaling up to it, and `auto=format` lets
      // the CDN serve whatever the browser takes. The reported width and
      // height are what let the `img` reserve the space before it loads.
      src: `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000.jpg?rect=0,500,2000,2000&w=400&h=400&fit=max&auto=format`,
      width: 400,
      height: 400,
    })
  })

  it('varies the request with the size, rather than serving one crop for all', () => {
    const sizes = [200, 800]
    const urls = sizes.map((size) => productImage({ image: IMAGE, size }).src)

    expect(new Set(urls).size).toBe(sizes.length)
  })
})
