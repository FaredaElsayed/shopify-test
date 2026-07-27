import type { Product } from '@/types/bundle'
import { ProductImage } from '@/components/product/ProductImage'
import { ProductPricing } from '@/components/product/ProductPricing'
import { QuantityStepper } from '@/components/product/QuantityStepper'
import { VariantChipRow } from '@/components/product/VariantChipRow'
import { getQuantityBounds } from '@/utils/productRules'
import {
  getActiveVariantId,
  getCardQuantity,
  isProductCardSelected,
} from '@/state/selectors'
import { useBundle } from '@/state/useBundle'
import { tokens } from '@/styles/tokens'

interface ProductCardProps {
  stepId: string
  product: Product
}

export function ProductCard({ stepId, product }: ProductCardProps) {
  const { state, setActiveVariant, setQuantity } = useBundle()
  const selected = isProductCardSelected(stepId, product.id, state)
  const quantity = getCardQuantity(stepId, product.id, state)
  const activeVariantId =
    getActiveVariantId(product.id, state) ??
    product.defaultVariantId ??
    product.variants?.[0]?.id ??
    'default'

  const { min, max } = getQuantityBounds(product)
  const stepperLabel =
    product.variants && activeVariantId
      ? `${product.name} (${product.variants.find((v) => v.id === activeVariantId)?.label ?? activeVariantId})`
      : product.name

  return (
    <article
      data-selected={selected}
      style={{
        borderColor: selected
          ? tokens.colors.borderSelected
          : tokens.colors.border,
      }}
      className="box-border flex h-[224.6px] w-[331.1px] max-w-[331px] shrink-0 flex-col overflow-hidden rounded-card border-2 bg-surface-card p-4 transition lg:h-[331.1px] lg:w-[224.6px] lg:max-w-[331px] lg:flex-none lg:flex-col lg:items-center lg:justify-center lg:gap-[19px] lg:px-[11px] lg:py-[15px] 2xl:h-[159px] 2xl:w-[361.5px] 2xl:max-w-[361.5px] 2xl:flex-row 2xl:items-center 2xl:justify-start 2xl:gap-[19px] 2xl:p-[11px]"
    >
      <div className="relative mx-auto shrink-0 lg:h-[117.39px] lg:w-full lg:self-stretch 2xl:mx-0 2xl:h-[137px] 2xl:w-[101px] 2xl:self-auto">
        {product.badge && (
          <span className="absolute left-0 top-0 z-10 flex h-[19px] items-center justify-center rounded-[10px] bg-wyze-purple px-[6px] py-[2px] text-[12px] leading-[15px] text-white">
            {product.badge}
          </span>
        )}
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          className={`h-[100px] w-[101px] rounded-[5px] lg:h-[117.39px] lg:w-full 2xl:h-[137px] 2xl:w-[101px]${product.imageWhiteBg ? ' bg-white' : ''}`}
        />
      </div>

      <div className="mt-2 flex min-h-0 min-w-0 flex-1 flex-col gap-[10px] lg:mt-0 lg:h-[136px] lg:w-full lg:flex-none lg:self-stretch 2xl:h-[137px] 2xl:w-[219.5px] 2xl:self-auto">
        <div className="flex flex-col gap-2 self-stretch">
          <h3 className="flex items-center text-[16px] font-semibold leading-none tracking-[0.6px] text-text-primary lg:text-[18px] 2xl:text-[16px]">
            <span>
              {product.name}
              {product.subName && (
                <span className="text-wyze-blue-unlimited">{product.subName}</span>
              )}
            </span>
          </h3>
          <p className="line-clamp-2 text-[12px] font-medium leading-[130%] tracking-[0.6px] text-text-body lg:text-[14px] 2xl:text-[12px]">
            {product.description}{' '}
            <a
              href={product.learnMoreUrl}
              target="_blank"
              rel="noreferrer"
              className="text-wyze-purple hover:underline"
            >
              Learn More
            </a>
          </p>
        </div>

        {product.variants && product.variants.length > 0 && (
          <VariantChipRow
            variants={product.variants}
            activeVariantId={activeVariantId}
            productImageUrl={product.imageUrl}
            onSelect={(variantId) => setActiveVariant(product.id, variantId)}
          />
        )}

        <div className="mt-auto flex h-[35px] w-full items-end gap-[10px] self-stretch lg:h-[28px] 2xl:h-[35px]">
          <QuantityStepper
            value={quantity}
            min={min}
            max={max}
            size="card"
            label={stepperLabel}
            onDecrease={() =>
              setQuantity(stepId, product.id, quantity - 1, activeVariantId)
            }
            onIncrease={() =>
              setQuantity(stepId, product.id, quantity + 1, activeVariantId)
            }
          />
          <ProductPricing product={product} variant="card" />
        </div>
      </div>
    </article>
  )
}
