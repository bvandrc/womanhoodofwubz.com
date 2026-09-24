import { renderHook, waitFor } from '@testing-library/react'

import { useCopyEmail } from '../useCopyEmail'

/** The clipboard the `useCopyToClipboard` hook writes through. */
const stubClipboard = (writeText: () => Promise<void>) => {
  vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } })
}

/** The two halves of the alert's first line, which is the half that differs. */
const alerted = () => {
  const firstLine = vi.mocked(alert).mock.calls.at(-1)?.[0].split('\n')[0]
  const [label, address] = firstLine?.split(': ') ?? []

  return { label, address }
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

    await waitFor(() => expect(alerted().label).toBe('Copied to clipboard'))
    // The address it reports is the one it put on the clipboard.
    expect(writeText).toHaveBeenCalledWith(alerted().address)
  })

  it('shows the address to copy by hand when the write is refused', async () => {
    // Clipboard writes reject on an unfocused page or a denied permission.
    stubClipboard(vi.fn(async () => Promise.reject(new Error('denied'))))

    renderHook(() => useCopyEmail()).result.current()

    await waitFor(() => expect(alerted().label).toBe('Email us at'))
  })
})
