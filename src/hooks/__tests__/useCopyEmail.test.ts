import { renderHook, waitFor } from '@testing-library/react'

import { useCopyEmail } from '../useCopyEmail'

const EMAIL = 'WomanhoodOfWubz1@gmail.com'

/** The clipboard the `useCopyToClipboard` hook writes through. */
const stubClipboard = (writeText: () => Promise<void>) => {
  vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } })
}

describe('useCopyEmail', () => {
  beforeEach(() => {
    vi.stubGlobal('alert', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('copies the address and says so', async () => {
    const writeText = vi.fn(async () => undefined)
    stubClipboard(writeText)

    renderHook(() => useCopyEmail()).result.current()

    await waitFor(() => expect(writeText).toHaveBeenCalledWith(EMAIL))
    await waitFor(() =>
      expect(alert).toHaveBeenCalledWith(
        `Copied to clipboard: ${EMAIL}\n\nTell us what you want!`
      )
    )
  })

  it('shows the address to copy by hand when the write is refused', async () => {
    // Clipboard writes reject on an unfocused page or a denied permission.
    stubClipboard(vi.fn(async () => Promise.reject(new Error('denied'))))

    renderHook(() => useCopyEmail()).result.current()

    await waitFor(() =>
      expect(alert).toHaveBeenCalledWith(
        `Email us at: ${EMAIL}\n\nTell us what you want!`
      )
    )
  })

  it('tells the visitor either way, so a click is never silent', async () => {
    stubClipboard(vi.fn(async () => Promise.reject(new Error('denied'))))

    renderHook(() => useCopyEmail()).result.current()

    await waitFor(() => expect(alert).toHaveBeenCalledOnce())
  })
})
