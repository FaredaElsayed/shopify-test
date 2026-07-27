import type { ReviewLineItem } from '@/types/bundle'
import { formatMoney } from '@/utils/pricing'

export function ReviewLinePricing({ item }: { item: ReviewLineItem }) {
  const { product, lineActive, lineCompare } = item
  const pricing = product?.pricing
  const isMonthly = pricing?.isMonthly

  if (pricing?.isFree) {
    return (
      <div className="flex shrink-0 flex-col items-end text-right lg:flex-row lg:items-center lg:gap-2.5 2xl:flex-col 2xl:items-end 2xl:gap-0">
        {lineCompare > 0 && (
          <span className="text-[14px] font-medium leading-4 tracking-[0.005em] text-text-muted line-through lg:text-[16px] 2xl:text-[14px]">
            {formatMoney(lineCompare)}
          </span>
        )}
        <span className="text-[14px] font-semibold leading-4 tracking-[0.005em] text-wyze-purple lg:text-[16px] 2xl:text-[14px]">
          FREE
        </span>
      </div>
    )
  }

  return (
    <div className="flex shrink-0 flex-col items-end text-right lg:flex-row lg:items-center lg:gap-2.5 2xl:flex-col 2xl:items-end 2xl:gap-0">
      {lineCompare > lineActive && (
        <span className="text-[14px] font-medium leading-4 tracking-[0.005em] text-text-muted line-through lg:text-[16px] 2xl:text-[14px]">
          {formatMoney(lineCompare, { monthly: isMonthly })}
        </span>
      )}
      <span className="text-[14px] font-semibold leading-4 tracking-[0.005em] text-wyze-purple lg:text-[16px] 2xl:text-[14px]">
        {formatMoney(lineActive, { monthly: isMonthly })}
      </span>
    </div>
  )
}
