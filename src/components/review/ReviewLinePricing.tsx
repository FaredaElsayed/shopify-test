import type { ReviewLineItem } from '@/types/bundle'
import { formatMoney } from '@/utils/pricing'

export function ReviewLinePricing({ item }: { item: ReviewLineItem }) {
  const { product, lineActive, lineCompare } = item

  if (product?.pricing?.isFree) {
    return (
      <div className="flex shrink-0 flex-col items-end text-right 2xl:flex-row 2xl:items-center 2xl:gap-2.5">
        {lineCompare > 0 && (
          <span className="text-[14px] font-medium leading-4 tracking-[0.005em] text-text-muted line-through 2xl:text-[16px]">
            {formatMoney(lineCompare)}
          </span>
        )}
        <span className="text-[14px] font-semibold leading-4 tracking-[0.005em] text-wyze-purple 2xl:text-[16px]">
          FREE
        </span>
      </div>
    )
  }

  return (
    <div className="flex shrink-0 flex-col items-end text-right 2xl:flex-row 2xl:items-center 2xl:gap-2.5">
      {lineCompare > lineActive && (
        <span className="text-[14px] font-medium leading-4 tracking-[0.005em] text-text-muted line-through 2xl:text-[16px]">
          {formatMoney(lineCompare, { monthly: product.pricing.isMonthly })}
        </span>
      )}
      <span className="text-[14px] font-semibold leading-4 tracking-[0.005em] text-wyze-purple 2xl:text-[16px]">
        {formatMoney(lineActive, { monthly: product.pricing.isMonthly })}
      </span>
    </div>
  )
}
