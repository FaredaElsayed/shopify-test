import { useState } from 'react'
import { CheckoutModal } from '@/components/review/CheckoutModal'
import { ReviewLineItemRow } from '@/components/review/ReviewLineItemRow'
import { ReviewSummary } from '@/components/review/ReviewSummary'
import { TruckIcon } from '@/components/icons/StepIcon'
import { getGroupedReviewLineItems, getTotals } from '@/state/selectors'
import { useBundle } from '@/state/useBundle'
import { CategoryHeading } from '@/components/review/CategoryHeading'
import { catalog } from '@/data/catalog'
import { formatMoney } from '@/utils/pricing'

export function ReviewPanel() {
  const { state, saveForLater, clearSavedState } = useBundle()
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const groupedItems = getGroupedReviewLineItems(state)
  const totals = getTotals(state)
  const { reviewMeta, shipping } = catalog

  return (
    <>
      <aside className="rounded-card border-0 bg-surface-review p-0 pt-[15px] shadow-none lg:static lg:rounded-card lg:border-0 lg:shadow-none 2xl:sticky 2xl:top-6 2xl:rounded-card 2xl:border 2xl:border-border 2xl:shadow-review">
        <p className="flex items-center px-[15px] text-[12px] font-medium uppercase leading-none tracking-[1.6px] text-[#484848] lg:hidden 2xl:flex">
          Review
        </p>

        <div className="flex flex-col items-stretch gap-2.5 px-5 pb-[31px] pt-5 lg:items-center 2xl:items-stretch">
          <div className="flex w-full flex-col gap-2.5 lg:grid lg:grid-cols-2 lg:items-start lg:justify-center lg:gap-[52px] 2xl:flex 2xl:flex-col 2xl:gap-2.5">
            <div className="flex min-w-0 flex-col gap-2.5 lg:max-w-[552px] 2xl:max-w-none">
              <div className="flex flex-col gap-[5px]">
                <h2 className="flex items-center text-[22px] font-semibold leading-none tracking-[0.6px] text-text-primary lg:text-[28px] 2xl:text-[22px]">
                  {reviewMeta.title}
                </h2>
                <p className="flex items-center text-[14px] font-medium leading-[130%] tracking-[0.6px] text-text-body lg:text-[16px] 2xl:text-[14px]">
                  {reviewMeta.subtitle}
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                {groupedItems.map((group) => (
                  <div
                    key={group.category}
                    className="flex flex-col gap-2 border-t border-border-divider pt-[15px]"
                  >
                    <CategoryHeading category={group.category} />
                    <div className="flex flex-col gap-3">
                      {group.items.map((item) => (
                        <ReviewLineItemRow
                          key={`${item.selection.stepId}-${item.selection.productId}-${item.selection.variantId ?? 'default'}`}
                          item={item}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex flex-col gap-2 border-t border-border-divider pt-[15px]">
                  <div className="flex items-center gap-4">
                    <TruckIcon />
                    <p className="min-w-0 flex-1 text-[14px] font-medium leading-4 tracking-[0.005em] text-stepper-qty lg:text-[18px] 2xl:text-[14px]">
                      {shipping.name}
                    </p>
                    <div className="flex shrink-0 flex-col items-end text-right lg:flex-row lg:items-center lg:gap-2.5 2xl:flex-col 2xl:items-end 2xl:gap-0">
                      {shipping.pricing.compareAt !== undefined && (
                        <p className="text-[14px] font-medium leading-4 tracking-[0.005em] text-text-muted line-through lg:text-[16px] 2xl:text-[14px]">
                          {formatMoney(shipping.pricing.compareAt)}
                        </p>
                      )}
                      <p className="text-[14px] font-semibold leading-4 tracking-[0.005em] text-wyze-purple lg:text-[16px] 2xl:text-[14px]">
                        FREE
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ReviewSummary
              totals={totals}
              lastSavedAt={state.lastSavedAt}
              onCheckout={() => setCheckoutOpen(true)}
              onSave={saveForLater}
            />
          </div>
        </div>
      </aside>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onConfirm={() => {
          clearSavedState()
          setCheckoutOpen(false)
        }}
        totalLabel={formatMoney(totals.displayActiveTotal)}
      />
    </>
  )
}
