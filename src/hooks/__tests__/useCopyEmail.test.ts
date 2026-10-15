import { renderHook, waitFor } from '@testing-library/react'

import { useCopyEmail } from '../useCopyEmail'

/** The clipboard the `useCopyToClipboard` hook writes through. */
const mockClipboard = (writeText: () => Promise<void>) => {
  vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } })
}

/** The two halves of the alert's first line, which is the half that differs. */
const getAlertMessage = () => {
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
    mockClipboard(writeText)

    renderHook(() => useCopyEmail()).result.current()

    await waitFor(() =>
      expect(getAlertMessage().label).toBe('Copied to clipboard')
    )
    // The address it reports is the one it put on the clipboard.
    expect(writeText).toHaveBeenCalledWith(getAlertMessage().address)
  })

  it('shows the address to copy by hand when the write is refused', async () => {
    // Clipboard writes reject on an unfocused page or a denied permission.
    mockClipboard(vi.fn(async () => Promise.reject(new Error('denied'))))

    renderHook(() => useCopyEmail()).result.current()

    await waitFor(() => expect(getAlertMessage().label).toBe('Email us at'))
  })
})
