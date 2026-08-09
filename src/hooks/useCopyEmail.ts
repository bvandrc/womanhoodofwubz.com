import { useCopyToClipboard } from 'usehooks-ts'

const EMAIL = 'WomanhoodOfWubz1@gmail.com'

/** Returns a click handler that copies our contact email. */
export const useCopyEmail = () => {
  const [, copy] = useCopyToClipboard()

  return () => {
    // Clipboard writes reject when the page isn't focused or permission is
    // denied; fall back to showing the address so it can be copied by hand.
    void copy(EMAIL)
      .catch(() => false)
      .then((copied) => {
        alert(
          copied
            ? `Copied to clipboard: ${EMAIL}\n\nTell us what you want!`
            : `Email us at: ${EMAIL}\n\nTell us what you want!`,
        )
      })
  }
}
