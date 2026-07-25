import type { Product, Selection } from '@/types/bundle'
import { selectionKey } from '@/types/bundle'

export const MAX_QUANTITY = 99

export function resolveVariantId(
  product: Product,
  activeVariantMap: Record<string, string>,
  explicitVariantId?: string | null,
): string | null {
  if (explicitVariantId !== undefined) {
    return explicitVariantId
  }

  if (!product.variants?.length) {
    return null
  }

  const active = activeVariantMap[product.id]
  if (active && product.variants.some((variant) => variant.id === active)) {
    return active
  }

  return product.defaultVariantId ?? product.variants[0]?.id ?? null
}

export function getSelectionQuantity(
  selections: Selection[],
  stepId: string,
  productId: string,
  variantId: string | null,
): number {
  const key = selectionKey({ stepId, productId, variantId, quantity: 0 })
  const match = selections.find((item) => selectionKey(item) === key)
  return match?.quantity ?? 0
}

export function clampQuantity(product: Product | undefined, quantity: number): number {
  const min = product?.minQuantity ?? 0
  const max = product?.maxQuantity ?? MAX_QUANTITY
  return Math.min(max, Math.max(min, quantity))
}

export function upsertSelection(
  selections: Selection[],
  nextSelection: Selection,
): Selection[] {
  const key = selectionKey(nextSelection)
  const without = selections.filter((item) => selectionKey(item) !== key)

  if (nextSelection.quantity <= 0) {
    return without
  }

  return [...without, nextSelection]
}
