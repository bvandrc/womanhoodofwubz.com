import { productImage } from '../sanity'

const IMAGE = {
  _type: 'image',
  asset: {
    _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
    _type: 'reference',
  },
}

describe('productImage', () => {
  it('reports the size it asked for, so the img reserves that box', () => {
    expect(productImage({ image: IMAGE, size: 400 })).toMatchObject({
      width: 400,
      height: 400,
    })
  })

  it('asks the CDN for the grid size rather than the original', () => {
    const { src } = productImage({ image: IMAGE, size: 400 })

    expect(src).toContain('w=400')
    expect(src).toContain('h=400')
  })

  it('fits within the box instead of cropping to it', () => {
    // `max` keeps the whole product in frame; `crop` would cut it to a square.
    expect(productImage({ image: IMAGE, size: 400 }).src).toContain('fit=max')
  })

  it('lets the CDN pick the format the browser prefers', () => {
    expect(productImage({ image: IMAGE, size: 400 }).src).toContain(
      'auto=format'
    )
  })

  it('builds a URL against the project the site reads from', () => {
    expect(productImage({ image: IMAGE, size: 400 }).src).toMatch(
      /^https:\/\/cdn\.sanity\.io\/images\//
    )
  })

  it('varies the request with the size', () => {
    const sizes = [200, 800]
    const urls = sizes.map((size) => productImage({ image: IMAGE, size }).src)

    expect(new Set(urls).size).toBe(sizes.length)
  })
})
