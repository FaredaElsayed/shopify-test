import type { BundleStep } from '@/types/bundle'
import { AccordionStepHeader } from '@/components/accordion/AccordionStepHeader'
import { ProductCard } from '@/components/product/ProductCard'
import { catalog } from '@/data/catalog'

interface AccordionStepProps {
  step: BundleStep
  isExpanded: boolean
  onToggle: () => void
  onNext: () => void
  isLastStep: boolean
}

export function AccordionStep({
  step,
  isExpanded,
  onToggle,
  onNext,
  isLastStep,
}: AccordionStepProps) {
  const panelId = `accordion-panel-${step.id}`
  const headerId = `accordion-header-${step.id}`
  const stepTotal = catalog.steps.length

  return (
    <section
      className={
        isExpanded
          ? 'border-b border-border-light last:border-b-0 2xl:flex 2xl:flex-col 2xl:items-stretch 2xl:gap-[5px] 2xl:self-stretch 2xl:rounded-card 2xl:border-0 2xl:bg-surface-review 2xl:pt-[15px]'
          : 'border-b border-border-light last:border-b-0 2xl:flex 2xl:flex-col 2xl:items-stretch 2xl:gap-[5px] 2xl:self-stretch 2xl:border-0'
      }
      aria-labelledby={headerId}
    >
      <p className="hidden px-[15px] text-[12px] font-medium uppercase leading-none tracking-[1.6px] text-[#484848] 2xl:flex 2xl:items-center">
        Step {step.stepNumber} of {stepTotal}
      </p>

      <div
        className={
          isExpanded
            ? '2xl:flex 2xl:flex-col 2xl:items-center 2xl:gap-[15px] 2xl:self-stretch 2xl:border-t-[0.5px] 2xl:border-text-primary 2xl:px-[15px] 2xl:py-5'
            : '2xl:flex 2xl:flex-col 2xl:self-stretch 2xl:border-y-[0.5px] 2xl:border-text-primary 2xl:px-[15px] 2xl:py-5'
        }
      >
        <AccordionStepHeader
          step={step}
          headerId={headerId}
          panelId={panelId}
          isExpanded={isExpanded}
          onToggle={onToggle}
        />

        <div
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          hidden={!isExpanded}
          className={
            isExpanded
              ? 'border-t border-border-light bg-surface-review px-4 pb-5 pt-4 md:px-5 2xl:w-full 2xl:border-0 2xl:bg-transparent 2xl:p-0'
              : undefined
          }
        >
          {isExpanded && (
            <div className="flex flex-col items-center gap-4 2xl:gap-[15px]">
              <div className="-mx-1 flex w-full snap-x snap-mandatory items-center justify-center gap-4 overflow-x-auto px-1 pb-2 xl:mx-0 xl:flex-wrap xl:overflow-visible xl:px-0 xl:pb-0 2xl:flex-nowrap 2xl:gap-[15px] 2xl:overflow-visible">
                {step.products.map((product) => (
                  <div key={product.id} className="snap-start shrink-0">
                    <ProductCard stepId={step.id} product={product} />
                  </div>
                ))}
              </div>

              {!isLastStep && (
                <button
                  type="button"
                  onClick={onNext}
                  className="min-h-11 rounded-button border-2 border-wyze-purple px-6 py-2.5 text-sm font-semibold text-wyze-purple transition hover:bg-wyze-purple/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wyze-purple 2xl:min-h-0 2xl:rounded-[7px] 2xl:border 2xl:px-6 2xl:py-[5px] 2xl:text-[18px] 2xl:leading-6"
                >
                  {step.nextStepLabel}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
