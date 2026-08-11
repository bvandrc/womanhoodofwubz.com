import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

// biome-ignore lint/style/noNonNullAssertion: root is always present in our index.html
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
