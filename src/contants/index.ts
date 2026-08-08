import { useCopyToClipboard } from 'usehooks-ts'

export const INSTAGRAM_USERNAME = 'womanhoodofwubz'

const EMAIL = 'WomanhoodOfWubz1@gmail.com'

/** Returns a click handler that copies our contact email. */
export const useCopyEmail = () => {
  const [, copy] = useCopyToClipboard()
  return () =>
    copy(EMAIL).then((copied) => {
      if (copied) {
        alert(`Copied to clipboard: ${EMAIL}\n\nTell us what you want!`)
      }
    })
}
