import type { PersistedBundleState } from '@/types/bundle'

export const STORAGE_KEY = 'wyze-bundle-config-v1'

function isPersistedBundleState(value: unknown): value is PersistedBundleState {
  if (!value || typeof value !== 'object') return false

  const candidate = value as PersistedBundleState

  return (
    candidate.version === 1 &&
    Array.isArray(candidate.selections) &&
    typeof candidate.activeVariantMap === 'object' &&
    candidate.activeVariantMap !== null &&
    typeof candidate.activeStepIndex === 'number' &&
    candidate.activeStepIndex >= -1
  )
}

export function loadPersistedState(): PersistedBundleState | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)
    if (!isPersistedBundleState(parsed)) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function savePersistedState(state: PersistedBundleState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearPersistedState(): void {
  localStorage.removeItem(STORAGE_KEY)
}
