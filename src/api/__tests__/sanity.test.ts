import { SANITY_DATASET, SANITY_PROJECT_ID } from '../../../sanity-constants'
import { getProducts, type Product, productImage } from '../sanity'

const sanityFetch = vi.hoisted(() => vi.fn())

// The real client, so the image builder still reads its project and dataset;
// only the query goes to the mock.
vi.mock('@sanity/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@sanity/client')>()
  return {
    ...actual,
    createClient: (...args: Parameters<typeof actual.createClient>) =>
      Object.assign(actual.createClient(...args), { fetch: sanityFetch }),
  }
})

/** The same id the CDN path carries, spelled the way a `_ref` spells it. */
const ASSET_ID = 'Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000'

const IMAGE = {
  _type: 'image',
  asset: {
    _ref: `image-${ASSET_ID}-jpg`,
    _type: 'reference',
  },
} satisfies Product['image']

describe('productImage', () => {
  it('requests a square of the grid size, in the format the browser prefers', () => {
    expect(productImage({ image: IMAGE, size: 400 })).toEqual({
      src:
        `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${ASSET_ID}.jpg` +
        // Squares off the 2000x3000 original.
        '?rect=0,500,2000,2000' +
        '&w=400&h=400' +
        // Holds the result inside that box rather than scaling up to it.
        '&fit=max' +
        // Lets the CDN serve whatever the browser takes.
        '&auto=format',
      // What lets the `img` reserve the space before it loads.
      width: 400,
      height: 400,
    })
  })

  it('varies the request with the size, rather than serving one crop for all', () => {
    const SIZES = [200, 800]
    const urls = SIZES.map((size) => productImage({ image: IMAGE, size }).src)

    expect(new Set(urls).size).toBe(SIZES.length)
  })
})

/** A product as the GROQ projection returns it, with every field filled. */
const buildProduct = (overrides: Partial<Product> = {}) =>
  ({
    _id: 'product-1',
    image: IMAGE,
    number: 7,
    title: 'Sunrise Bucket',
    type: 'Bucket Hat',
    subtitle: 'one of one',
    price: 60,
    soldOut: false,
    ...overrides,
  }) satisfies Product

const mockSanityResponse = (result: unknown) => {
  sanityFetch.mockResolvedValue(result)
}

describe('getProducts', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  it('hands back the products Sanity returns, in its order', async () => {
    const PRODUCTS = [
      buildProduct({ _id: 'newer', number: 8 }),
      // GROQ spells a field the document lacks as null.
      buildProduct({ _id: 'older', number: 7, subtitle: null, price: null }),
    ]
    mockSanityResponse(PRODUCTS)

    expect(await getProducts()).toEqual(PRODUCTS)
  })

  it('keeps the crop and hotspot, which the image builder squares off by', async () => {
    const IMAGE_WITH_CROP = {
      ...IMAGE,
      crop: { top: 0.1, bottom: 0, left: 0, right: 0 },
      hotspot: { x: 0.5, y: 0.4, width: 0.5, height: 0.5 },
    }
    mockSanityResponse([buildProduct({ image: IMAGE_WITH_CROP })])

    const [product] = await getProducts()

    expect(product?.image).toEqual(IMAGE_WITH_CROP)
  })

  it('leaves out a malformed product and keeps the rest', async () => {
    const VALID = buildProduct({ _id: 'valid' })
    const MALFORMED = [
      // `productImage` throws on each of these images while the page renders.
      { ...VALID, _id: 'no-image', image: null },
      { ...VALID, _id: 'no-asset', image: { _type: 'image' } },
      { ...VALID, _id: 'null-asset', image: { _type: 'image', asset: null } },
      // The React key.
      { ...VALID, _id: undefined },
      // Would print as a price on the tile.
      { ...VALID, _id: 'string-price', price: '60' },
    ]

    for (const product of MALFORMED) {
      mockSanityResponse([product, VALID])

      expect(await getProducts(), product._id).toEqual([VALID])
      expect(console.error, product._id).toHaveBeenCalledWith(
        expect.any(String),
        product,
        expect.any(String)
      )
    }
  })

  it('throws when the response is not a list, so the page can say so', async () => {
    mockSanityResponse({ error: 'unexpected' })

    await expect(getProducts()).rejects.toThrow()
  })
})
