import type { Variant } from '@/types/bundle'
import { tokens } from '@/styles/tokens'

interface VariantChipRowProps {
  variants: Variant[]
  activeVariantId: string
  productImageUrl: string
  onSelect: (variantId: string) => void
}

export function VariantChipRow({
  variants,
  activeVariantId,
  productImageUrl,
  onSelect,
}: VariantChipRowProps) {
  if (variants.length <= 1) return null

  return (
    <div className="flex h-[26px] flex-row items-end gap-[6px]">
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId

        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant.id)}
            style={{
              backgroundColor: isActive
                ? tokens.colors.chipActiveBg
                : tokens.colors.cardBg,
              borderColor: isActive
                ? tokens.colors.chipActiveBorder
                : tokens.colors.chipInactiveBorder,
            }}
            className="box-border flex h-[26px] items-center justify-center gap-0 rounded-[2px] border-[0.5px] px-[3px] py-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-wyze-purple"
            aria-pressed={isActive}
          >
            <img
              src={productImageUrl}
              alt=""
              className="h-[22px] w-[23px] shrink-0 rounded-[5px] object-contain"
              aria-hidden="true"
            />
            <span className="ml-[2px] flex items-center text-[10px] font-medium leading-none tracking-[0.6px] text-text-primary">
              {variant.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
