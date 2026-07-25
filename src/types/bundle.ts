export type ReviewCategory = 'cameras' | 'sensors' | 'accessories' | 'plan'

export interface Pricing {
  active: number
  compareAt?: number
  isFree?: boolean
  isMonthly?: boolean
}

export interface Variant {
  id: string
  label: string
  swatchColor: string
}

export interface Product {
  id: string
  name: string
  subName?: string
  description: string
  learnMoreUrl: string
  imageUrl: string
  imageWhiteBg?: boolean
  badge?: string
  variants?: Variant[]
  defaultVariantId?: string
  pricing: Pricing
  reviewCategory: ReviewCategory
  required?: boolean
  minQuantity?: number
  maxQuantity?: number
}

export interface BundleStep {
  id: string
  stepNumber: number
  title: string
  icon: 'camera' | 'shield' | 'sensor' | 'protection'
  nextStepLabel: string
  products: Product[]
}

export interface ShippingOption {
  id: string
  name: string
  icon: 'truck'
  pricing: Pricing
}

export interface GuaranteeBadge {
  label: string
  imageUrl: string
}

export interface ReturnPolicy {
  title: string
  description: string
}

export interface ReviewMeta {
  title: string
  subtitle: string
  guaranteeBadge: GuaranteeBadge
  returnPolicy: ReturnPolicy
  financingLabel: string
  targetTotals: {
    activeTotal: number
    compareTotal: number
    savings: number
  }
}

export interface Selection {
  stepId: string
  productId: string
  variantId: string | null
  quantity: number
}

export interface Catalog {
  steps: BundleStep[]
  shipping: ShippingOption
  reviewMeta: ReviewMeta
  initialSelections: Selection[]
  initialActiveStepIndex: number
  initialActiveVariants: Record<string, string>
}

export interface PersistedBundleState {
  version: 1
  selections: Selection[]
  activeVariantMap: Record<string, string>
  activeStepIndex: number
}

export interface ProductLookup {
  step: BundleStep
  product: Product
}

export interface ReviewLineItem {
  selection: Selection
  product: Product
  variant?: Variant
  lineActive: number
  lineCompare: number
}

export interface BundleTotals {
  activeTotal: number
  compareTotal: number
  savings: number
  financingPerMonth: number
}

export function selectionKey(selection: Selection): string {
  return `${selection.stepId}:${selection.productId}:${selection.variantId ?? 'default'}`
}
