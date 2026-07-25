import { useContext } from 'react'
import { BundleContext, type BundleContextValue } from '@/state/BundleProvider'

export function useBundle(): BundleContextValue {
  const context = useContext(BundleContext)

  if (!context) {
    throw new Error('useBundle must be used within a BundleProvider')
  }

  return context
}
