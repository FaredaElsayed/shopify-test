import type { ReviewLineItem } from '@/types/bundle'
import { ProductImage } from '@/components/product/ProductImage'
import { QuantityStepper } from '@/components/product/QuantityStepper'
import { ReviewLinePricing } from '@/components/review/ReviewLinePricing'
import { getReviewDisplayName } from '@/utils/reviewDisplay'
import { getQuantityBounds, isQuantityLocked } from '@/utils/productRules'
import { useBundle } from '@/state/useBundle'

interface ReviewLineItemRowProps {
  item: ReviewLineItem
}

export function ReviewLineItemRow({ item }: ReviewLineItemRowProps) {
  const { setQuantity } = useBundle()
  const { product, selection } = item
  const { min, max } = getQuantityBounds(product)
  const locked = isQuantityLocked(product)
  const lineLabel = getReviewDisplayName(item)

  return (
    <div className="flex w-full items-start gap-4 2xl:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          className={`h-[41px] w-[41px] shrink-0 rounded-[5px]${product.imageWhiteBg ? ' bg-white' : ''}`}
        />
        <p className="min-w-0 flex-1 text-[14px] font-medium leading-4 tracking-[0.005em] text-stepper-qty 2xl:text-[18px]">
          {product.name}
          {product.subName && (
            <span className="text-wyze-blue-unlimited">{product.subName}</span>
          )}
          {product.required && ' (Required)'}
        </p>
        <QuantityStepper
          size="review"
          value={selection.quantity}
          min={min}
          max={max}
          locked={locked}
          label={lineLabel}
          onDecrease={() =>
            setQuantity(
              selection.stepId,
              selection.productId,
              selection.quantity - 1,
              selection.variantId,
            )
          }
          onIncrease={() =>
            setQuantity(
              selection.stepId,
              selection.productId,
              selection.quantity + 1,
              selection.variantId,
            )
          }
        />
      </div>
      <ReviewLinePricing item={item} />
    </div>
  )
}
