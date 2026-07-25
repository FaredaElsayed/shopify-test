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

/**
 * Figma card specs:
 * - xl (1280–1535): row layout, 361.5×159, padding 11, gap 19, image 101×137
 * - 2xl+: column layout, 224.6×331.1, padding 15px 11px, gap 19, image 202.6×117.39
 */
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
      className="box-border flex h-[224.6px] w-[331.1px] max-w-[331px] shrink-0 flex-col overflow-hidden rounded-card border-2 bg-surface-card p-4 transition xl:h-[159px] xl:w-[361.5px] xl:max-w-[361.5px] xl:flex-row xl:items-center xl:gap-[19px] xl:p-[11px] 2xl:h-[331.1px] 2xl:w-[224.6px] 2xl:max-w-[331px] 2xl:flex-none 2xl:flex-col 2xl:items-center 2xl:justify-center 2xl:gap-[19px] 2xl:px-[11px] 2xl:py-[15px]"
    >
      <div className="relative mx-auto shrink-0 xl:mx-0 xl:h-[137px] xl:w-[101px] 2xl:h-[117.39px] 2xl:w-full 2xl:self-stretch">
        {product.badge && (
          <span className="absolute left-0 top-0 z-10 flex h-[19px] items-center justify-center rounded-[10px] bg-wyze-purple px-[6px] py-[2px] text-[12px] leading-[15px] text-white">
            {product.badge}
          </span>
        )}
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          className={`h-[100px] w-[101px] rounded-[5px] xl:h-[137px] xl:w-[101px] 2xl:h-[117.39px] 2xl:w-full${product.imageWhiteBg ? ' bg-white' : ''}`}
        />
      </div>

      <div className="mt-2 flex min-h-0 min-w-0 flex-1 flex-col gap-[10px] xl:mt-0 xl:h-[137px] xl:w-[219.5px] xl:flex-none 2xl:h-[136px] 2xl:w-full 2xl:flex-none 2xl:self-stretch">
        <div className="flex flex-col gap-2 self-stretch">
          <h3 className="flex items-center text-[16px] font-semibold leading-none tracking-[0.6px] text-text-primary 2xl:text-[18px]">
            <span>
              {product.name}
              {product.subName && (
                <span className="text-wyze-blue-unlimited">{product.subName}</span>
              )}
            </span>
          </h3>
          <p className="line-clamp-2 text-[12px] font-medium leading-[130%] tracking-[0.6px] text-text-body 2xl:text-[14px]">
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

        {/* Variant chips: gap 6, height 26 */}
        {product.variants && product.variants.length > 0 && (
          <VariantChipRow
            variants={product.variants}
            activeVariantId={activeVariantId}
            productImageUrl={product.imageUrl}
            onSelect={(variantId) => setActiveVariant(product.id, variantId)}
          />
        )}

        {/* Stepper + price: xl h-35 | 2xl h-28, row, gap 10 */}
        <div className="mt-auto flex h-[35px] w-full items-end gap-[10px] self-stretch 2xl:h-[28px]">
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
