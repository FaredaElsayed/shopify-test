import type { ReviewLineItem } from '@/types/bundle'

export function getReviewDisplayName(item: ReviewLineItem): string {
  const { product } = item
  const fullName = `${product.name}${product.subName ?? ''}`
  
  if (product.required) {
    return `${fullName} (Required)`
  }

  return fullName
}
