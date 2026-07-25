import type {
  BundleTotals,
  Product,
  ReviewLineItem,
  Selection,
} from '@/types/bundle'
import { catalog } from '@/data/catalog'

export { catalog }

export function findProduct(
  stepId: string,
  productId: string,
): { step: (typeof catalog.steps)[number]; product: Product } | undefined {
  const step = catalog.steps.find((s) => s.id === stepId)
  if (!step) return undefined
  const product = step.products.find((p) => p.id === productId)
  if (!product) return undefined
  return { step, product }
}

export function getUnitActivePrice(product: Product): number {
  if (product.pricing?.isFree) return 0
  return product.pricing?.active ?? 0
}

export function getUnitComparePrice(product: Product): number {
  if (product.pricing?.isFree) {
    return product.pricing.compareAt ?? 0
  }
  return product.pricing?.compareAt ?? product.pricing?.active ?? 0
}

export function getLineTotals(
  product: Product,
  quantity: number,
): {
  lineActive: number
  lineCompare: number
} {
  return {
    lineActive: getUnitActivePrice(product) * quantity,
    lineCompare: getUnitComparePrice(product) * quantity,
  }
}

export function buildReviewLineItems(selections: Selection[]): ReviewLineItem[] {
  const items: ReviewLineItem[] = []

  for (const selection of selections) {
    if (selection.quantity <= 0) continue

    const found = findProduct(selection.stepId, selection.productId)
    if (!found) continue

    const { product } = found
    const variant = product.variants?.find((v) => v.id === selection.variantId)
    const { lineActive, lineCompare } = getLineTotals(product, selection.quantity)

    items.push({ selection, product, variant, lineActive, lineCompare })
  }

  return items
}

export function computeBundleTotals(
  selections: Selection[],
  includeShippingCompareInTotal = false,
): BundleTotals {
  const lineItems = buildReviewLineItems(selections)

  const activeTotal =
    lineItems.reduce((sum, item) => sum + item.lineActive, 0) +
    (catalog.shipping.pricing.isFree ? 0 : catalog.shipping.pricing.active)

  // Shipping compare-at is shown struck-through but excluded from bundle compare total in the design.
  const shippingCompare = includeShippingCompareInTotal
    ? (catalog.shipping.pricing.compareAt ?? 0)
    : 0

  const compareTotal =
    lineItems.reduce((sum, item) => sum + item.lineCompare, 0) + shippingCompare

  const savings = Math.max(0, compareTotal - activeTotal)
  const financingPerMonth = Math.round((activeTotal / 11) * 100) / 100

  return {
    activeTotal: roundMoney(activeTotal),
    compareTotal: roundMoney(compareTotal),
    savings: roundMoney(savings),
    financingPerMonth,
  }
}

export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100
}

export function getInitialSelections(): Selection[] {
  return catalog.initialSelections.map((selection) => ({ ...selection }))
}

export function getStepSelectedProductCount(
  stepId: string,
  selections: Selection[],
): number {
  const productIds = new Set<string>()

  for (const selection of selections) {
    if (selection.stepId !== stepId || selection.quantity <= 0) continue
    productIds.add(selection.productId)
  }

  return productIds.size
}

export function formatMoney(
  amount: number,
  options?: { monthly?: boolean; freeLabel?: string },
): string {
  if (options?.freeLabel && amount === 0) return options.freeLabel

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)

  return options?.monthly ? `${formatted}/mo` : formatted
}
