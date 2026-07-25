import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BundleProvider } from '@/state/BundleProvider'
import { validateSeedState } from '@/data/validateSeed'
import './index.css'
import App from './App.tsx'

if (import.meta.env.DEV) {
  validateSeedState()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BundleProvider>
      <App />
    </BundleProvider>
  </StrictMode>,
)
