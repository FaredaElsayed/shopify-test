import { formatMoney } from '@/utils/pricing'
import type { DisplayTotals } from '@/state/selectors'
import { catalog } from '@/data/catalog'
import guaranteeBadgeUrl from '@/assets/products/certificate.png'

interface ReviewSummaryProps {
  totals: DisplayTotals
  lastSavedAt: string | null
  onCheckout: () => void
  onSave: () => void
}

export function ReviewSummary({
  totals,
  lastSavedAt,
  onCheckout,
  onSave,
}: ReviewSummaryProps) {
  const { reviewMeta } = catalog

  return (
    <div className="flex w-full flex-col gap-2 2xl:max-w-[486px]">
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2 2xl:justify-start 2xl:gap-[25px]">
            <img
              src={guaranteeBadgeUrl}
              alt={reviewMeta.guaranteeBadge.label}
              className="h-[78px] w-[78px] shrink-0 object-contain 2xl:h-[131px] 2xl:w-[131px]"
            />

            <p className="hidden min-w-0 flex-1 items-center text-[18px] font-semibold leading-[110%] tracking-[0.6px] text-text-primary 2xl:flex">
              {reviewMeta.returnPolicy.title}{' '}
              {reviewMeta.returnPolicy.description}
            </p>

            <div className="flex flex-col items-end justify-center gap-2 2xl:hidden">
              <span className="inline-flex h-[18px] items-center justify-center rounded-[3px] bg-wyze-purple px-2 py-[5px] text-[12px] font-medium leading-[15px] tracking-[-0.05em] text-white">
                {reviewMeta.financingLabel}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-[18px] font-medium leading-5 tracking-[0.0025em] text-text-muted line-through">
                  {formatMoney(totals.displayCompareTotal)}
                </span>
                <span className="text-[24px] font-bold leading-8 tracking-[-0.00125em] text-wyze-purple">
                  {formatMoney(totals.displayActiveTotal)}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden h-8 items-center justify-between 2xl:flex">
            <span className="inline-flex h-[27px] items-center justify-center rounded-[3px] bg-wyze-purple px-2 text-[16px] font-medium leading-[19px] tracking-[-0.05em] text-white">
              {reviewMeta.financingLabel}
            </span>
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-[22px] font-medium leading-5 tracking-[0.0025em] text-text-muted line-through">
                {formatMoney(totals.displayCompareTotal)}
              </span>
              <span className="text-[28px] font-bold leading-8 tracking-[-0.00125em] text-wyze-purple">
                {formatMoney(totals.displayActiveTotal)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-2.5">
          {totals.displaySavings > 0 && (
            <p className="text-center text-[12px] font-semibold leading-none tracking-[-0.056px] text-wyze-teal-savings 2xl:text-[14px]">
              Congrats! You&apos;re saving {formatMoney(totals.displaySavings)}{' '}
              on your security bundle!
            </p>
          )}

          <button
            type="button"
            className="flex h-12 w-full items-center justify-center rounded bg-wyze-purple px-4 py-[13px] text-[17px] font-bold leading-[22px] text-white transition hover:bg-wyze-purple-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wyze-purple"
            onClick={onCheckout}
          >
            Checkout
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onSave}
        className="w-full text-center text-[14px] font-normal italic leading-[120%] tracking-[-0.016px] text-[#484848] underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wyze-purple"
      >
        Save my system for later
      </button>

      {lastSavedAt && (
        <p className="text-center text-xs text-text-muted" aria-live="polite">
          Last saved {new Date(lastSavedAt).toLocaleString()}
        </p>
      )}
    </div>
  )
}
