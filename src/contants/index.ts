export const INSTAGRAM_USERNAME = 'womanhoodofwubz'

export const copyEmail = () => {
  const EMAIL = 'WomanhoodOfWubz1@gmail.com'
  navigator.clipboard.writeText(EMAIL)
  alert(`Copied to clipboard: ${EMAIL}\n\nTell us what you want!`)
}
