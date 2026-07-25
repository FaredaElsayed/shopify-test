import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import {
  bundleReducer,
  createSeedState,
  restoreFromPersisted,
  toPersistedState,
  type BundleState,
} from '@/state/reducer'
import {
  clearPersistedState,
  loadPersistedState,
  savePersistedState,
} from '@/state/persistence'

export interface BundleContextValue {
  state: BundleState
  toastMessage: string | null
  dismissToast: () => void
  setActiveStep: (stepIndex: number) => void
  toggleActiveStep: (stepIndex: number) => void
  setActiveVariant: (productId: string, variantId: string) => void
  setQuantity: (
    stepId: string,
    productId: string,
    quantity: number,
    variantId?: string | null,
  ) => void
  saveForLater: () => void
  resetToSeed: () => void
  clearSavedState: () => void
}

export const BundleContext = createContext<BundleContextValue | null>(null)

const SAVE_TOAST_MESSAGE =
  'Your system has been saved. Reload the page to restore it anytime.'

function getInitialState(): BundleState {
  const persisted = loadPersistedState()
  if (persisted) {
    return restoreFromPersisted(persisted)
  }

  return createSeedState()
}

export function BundleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bundleReducer, undefined, getInitialState)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!toastMessage) return

    const timer = window.setTimeout(() => setToastMessage(null), 4000)
    return () => window.clearTimeout(timer)
  }, [toastMessage])

  const dismissToast = useCallback(() => {
    setToastMessage(null)
  }, [])

  const setActiveStep = useCallback((stepIndex: number) => {
    dispatch({ type: 'SET_ACTIVE_STEP', stepIndex })
  }, [])

  const toggleActiveStep = useCallback((stepIndex: number) => {
    dispatch({ type: 'TOGGLE_ACTIVE_STEP', stepIndex })
  }, [])

  const setActiveVariant = useCallback((productId: string, variantId: string) => {
    dispatch({ type: 'SET_ACTIVE_VARIANT', productId, variantId })
  }, [])

  const setQuantity = useCallback(
    (
      stepId: string,
      productId: string,
      quantity: number,
      variantId?: string | null,
    ) => {
      dispatch({ type: 'SET_QUANTITY', stepId, productId, quantity, variantId })
    },
    [],
  )

  const saveForLater = useCallback(() => {
    const persisted = toPersistedState(state)
    try {
      savePersistedState(persisted)
      dispatch({ type: 'MARK_SAVED', savedAt: new Date().toISOString() })
      setToastMessage(SAVE_TOAST_MESSAGE)
    } catch {
      setToastMessage('Could not save your system. Storage may be full.')
    }
  }, [state])

  const resetToSeed = useCallback(() => {
    clearPersistedState()
    dispatch({ type: 'RESET_TO_SEED' })
    setToastMessage(null)
  }, [])

  const clearSavedState = useCallback(() => {
    clearPersistedState()
  }, [])

  const value = useMemo<BundleContextValue>(
    () => ({
      state,
      toastMessage,
      dismissToast,
      setActiveStep,
      toggleActiveStep,
      setActiveVariant,
      setQuantity,
      saveForLater,
      resetToSeed,
      clearSavedState,
    }),
    [
      state,
      toastMessage,
      dismissToast,
      setActiveStep,
      toggleActiveStep,
      setActiveVariant,
      setQuantity,
      saveForLater,
      resetToSeed,
      clearSavedState,
    ],
  )

  return <BundleContext.Provider value={value}>{children}</BundleContext.Provider>
}
