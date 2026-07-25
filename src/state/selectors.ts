import type {
  BundleTotals,
  ReviewCategory,
  ReviewLineItem,
  Selection,
} from '@/types/bundle'
import { catalog } from '@/data/catalog'
import {
  buildReviewLineItems,
  computeBundleTotals,
  findProduct,
  getInitialSelections,
  getStepSelectedProductCount,
} from '@/utils/pricing'
import type { BundleState } from '@/state/reducer'
import { getSelectionQuantity, resolveVariantId } from '@/state/selectionHelpers'

const REVIEW_CATEGORY_ORDER: ReviewCategory[] = [
  'cameras',
  'sensors',
  'accessories',
  'plan',
]

export interface GroupedReviewLineItems {
  category: ReviewCategory
  label: string
  items: ReviewLineItem[]
}

export interface DisplayTotals extends BundleTotals {
  /** Footer values from design mockups */
  displayActiveTotal: number
  displayCompareTotal: number
  displaySavings: number
}

const CATEGORY_LABELS: Record<ReviewCategory, string> = {
  cameras: 'Cameras',
  sensors: 'Sensors',
  accessories: 'Accessories',
  plan: 'Plan',
}

export function getStepSelectedCount(stepId: string, state: BundleState): number {
  return getStepSelectedProductCount(stepId, state.selections)
}

export function getReviewLineItems(state: BundleState): ReviewLineItem[] {
  return buildReviewLineItems(state.selections)
}

export function getGroupedReviewLineItems(state: BundleState): GroupedReviewLineItems[] {
  const lineItems = getReviewLineItems(state)

  return REVIEW_CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    items: lineItems.filter((item) => item.product.reviewCategory === category),
  })).filter((group) => group.items.length > 0)
}

export function getTotals(state: BundleState): DisplayTotals {
  const computed = computeBundleTotals(state.selections)
  const target = catalog.reviewMeta.targetTotals
  const atSeed = isSeedSelections(state)

  return {
    ...computed,
    displayActiveTotal: computed.activeTotal,
    displayCompareTotal: atSeed ? target.compareTotal : computed.compareTotal,
    displaySavings: atSeed ? target.savings : computed.savings,
  }
}

function isSeedSelections(state: BundleState): boolean {
  const seed = getInitialSelections()

  if (state.selections.length !== seed.length) return false

  return seed.every((seedItem) => {
    const qty = getSelectionQuantity(
      state.selections,
      seedItem.stepId,
      seedItem.productId,
      seedItem.variantId,
    )
    return qty === seedItem.quantity
  })
}

export function isProductCardSelected(
  stepId: string,
  productId: string,
  state: BundleState,
): boolean {
  return state.selections.some(
    (selection) =>
      selection.stepId === stepId &&
      selection.productId === productId &&
      selection.quantity > 0,
  )
}

export function getActiveVariantId(productId: string, state: BundleState): string | null {
  const product = catalog.steps
    .flatMap((step) => step.products)
    .find((item) => item.id === productId)

  if (!product) return null

  return resolveVariantId(product, state.activeVariantMap)
}

export function getCardQuantity(
  stepId: string,
  productId: string,
  state: BundleState,
): number {
  const found = findProduct(stepId, productId)
  if (!found) return 0

  const variantId = resolveVariantId(found.product, state.activeVariantMap)
  return getSelectionQuantity(state.selections, stepId, productId, variantId)
}

export function getReviewQuantity(
  selection: Selection,
  state: BundleState,
): number {
  return getSelectionQuantity(
    state.selections,
    selection.stepId,
    selection.productId,
    selection.variantId,
  )
}

export function formatReviewLineName(item: ReviewLineItem): string {
  if (!item.variant) return item.product.name
  return `${item.product.name} (${item.variant.label})`
}
