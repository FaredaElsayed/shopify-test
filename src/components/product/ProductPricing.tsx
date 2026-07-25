import type { Product } from '@/types/bundle'
import { formatMoney } from '@/utils/pricing'
import { tokens } from '@/styles/tokens'

interface ProductPricingProps {
  product: Product
  align?: 'left' | 'right'
  variant?: 'default' | 'card'
}

export function ProductPricing({
  product,
  align = 'right',
  variant = 'default',
}: ProductPricingProps) {
  const { pricing } = product

  if (variant === 'card') {
    if (pricing.isFree) {
      return (
        <div className="flex flex-1 flex-col items-end justify-center gap-[3px] self-stretch 2xl:flex-row 2xl:items-center 2xl:justify-end">
          <span className="text-[16px] font-normal leading-none tracking-[0.6px] text-wyze-purple">
            FREE
          </span>
        </div>
      )
    }

    return (
      <div className="flex flex-1 flex-col items-end justify-center gap-[3px] self-stretch 2xl:flex-row 2xl:items-center 2xl:justify-end">
        {pricing.compareAt !== undefined &&
          pricing.compareAt !== pricing.active && (
            <span
              className="text-right text-[16px] font-normal leading-none tracking-[0.6px] line-through"
              style={{ color: tokens.colors.compareRed }}
            >
              {formatMoney(pricing.compareAt, { monthly: pricing.isMonthly })}
            </span>
          )}
        <span
          className="text-right text-[16px] font-normal leading-none tracking-[0.6px]"
          style={{ color: tokens.colors.priceActive }}
        >
          {formatMoney(pricing.active, { monthly: pricing.isMonthly })}
        </span>
      </div>
    )
  }

  const alignment = align === 'right' ? 'items-end text-right' : 'items-start text-left'

  if (pricing.isFree) {
    return (
      <div className={`flex flex-col ${alignment}`}>
        <span className="text-sm font-semibold text-wyze-purple">FREE</span>
        {pricing.compareAt !== undefined && (
          <span className="text-xs text-text-compare line-through">
            {formatMoney(pricing.compareAt)}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`flex flex-col ${alignment}`}>
      {pricing.compareAt !== undefined && pricing.compareAt !== pricing.active && (
        <span className="text-xs text-text-compare line-through">
          {formatMoney(pricing.compareAt, { monthly: pricing.isMonthly })}
        </span>
      )}
      <span className="text-sm font-bold text-text-primary">
        {formatMoney(pricing.active, { monthly: pricing.isMonthly })}
      </span>
    </div>
  )
}
