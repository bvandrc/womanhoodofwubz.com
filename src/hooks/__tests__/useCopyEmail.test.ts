import { renderHook, waitFor } from '@testing-library/react'

import { useCopyEmail } from '../useCopyEmail'

const EMAIL = 'WomanhoodOfWubz1@gmail.com'

/** The clipboard the `useCopyToClipboard` hook writes through. */
const stubClipboard = (writeText: () => Promise<void>) => {
  vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } })
}

/** The alert's first line, which is the half that differs between the two. */
const alertedLine = () => vi.mocked(alert).mock.calls.at(-1)?.[0].split('\n')[0]

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
      expect(alertedLine()).toBe(`Copied to clipboard: ${EMAIL}`)
    )
  })

  it('shows the address to copy by hand when the write is refused', async () => {
    // Clipboard writes reject on an unfocused page or a denied permission.
    stubClipboard(vi.fn(async () => Promise.reject(new Error('denied'))))

    renderHook(() => useCopyEmail()).result.current()

    await waitFor(() => expect(alertedLine()).toBe(`Email us at: ${EMAIL}`))
  })
})
