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
  const { state, saveForLater } = useBundle()
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const groupedItems = getGroupedReviewLineItems(state)
  const totals = getTotals(state)
  const { reviewMeta, shipping } = catalog

  return (
    <>
      <aside className="rounded-card border border-border bg-surface-review p-0 pt-[15px] shadow-review lg:sticky lg:top-6 2xl:static 2xl:border-0 2xl:shadow-none">
        <p className="flex items-center px-[15px] text-[12px] font-medium uppercase leading-none tracking-[1.6px] text-[#484848] 2xl:hidden">
          Review
        </p>

        <div className="flex flex-col items-stretch gap-2.5 px-5 pb-[31px] pt-5 2xl:items-center">
          <div className="flex w-full flex-col gap-2.5 2xl:grid 2xl:grid-cols-2 2xl:items-start 2xl:justify-center 2xl:gap-[52px]">
            <div className="flex min-w-0 flex-col gap-2.5 2xl:max-w-[552px]">
              <div className="flex flex-col gap-[5px]">
                <h2 className="flex items-center text-[22px] font-semibold leading-none tracking-[0.6px] text-text-primary 2xl:text-[28px]">
                  {reviewMeta.title}
                </h2>
                <p className="flex items-center text-[14px] font-medium leading-[130%] tracking-[0.6px] text-text-body 2xl:text-[16px]">
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
                    <p className="min-w-0 flex-1 text-[14px] font-medium leading-4 tracking-[0.005em] text-stepper-qty 2xl:text-[18px]">
                      {shipping.name}
                    </p>
                    <div className="flex shrink-0 flex-col items-end text-right 2xl:flex-row 2xl:items-center 2xl:gap-2.5">
                      {shipping.pricing.compareAt !== undefined && (
                        <p className="text-[14px] font-medium leading-4 tracking-[0.005em] text-text-muted line-through 2xl:text-[16px]">
                          {formatMoney(shipping.pricing.compareAt)}
                        </p>
                      )}
                      <p className="text-[14px] font-semibold leading-4 tracking-[0.005em] text-wyze-purple 2xl:text-[16px]">
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
        totalLabel={formatMoney(totals.displayActiveTotal)}
      />
    </>
  )
}
