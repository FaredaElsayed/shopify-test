import type { Product } from '@/types/bundle'
import { MAX_QUANTITY } from '@/state/selectionHelpers'

export function getQuantityBounds(product: Product): { min: number; max: number } {
  return {
    min: product.minQuantity ?? 0,
    max: product.maxQuantity ?? MAX_QUANTITY,
  }
}

export function isRequiredProduct(product: Product): boolean {
  return Boolean(product.required && (product.minQuantity ?? 0) >= 1)
}

export function isQuantityLocked(product: Product): boolean {
  const { min, max } = getQuantityBounds(product)
  return min === max
}

export function canDecreaseQuantity(product: Product, currentQuantity: number): boolean {
  const { min } = getQuantityBounds(product)
  return currentQuantity > min
}

export function canIncreaseQuantity(product: Product, currentQuantity: number): boolean {
  const { max } = getQuantityBounds(product)
  return currentQuantity < max
}
