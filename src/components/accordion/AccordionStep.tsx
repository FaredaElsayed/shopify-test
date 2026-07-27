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
          ? 'border-b border-border-light last:border-b-0 lg:flex lg:flex-col lg:items-stretch lg:gap-[5px] lg:self-stretch lg:rounded-card lg:border-0 lg:bg-surface-review lg:pt-[15px] 2xl:rounded-none 2xl:bg-transparent 2xl:pt-0 2xl:gap-0 2xl:border-b 2xl:border-border-light'
          : 'border-b border-border-light last:border-b-0 lg:flex lg:flex-col lg:items-stretch lg:gap-[5px] lg:self-stretch lg:border-0 2xl:border-b 2xl:border-border-light 2xl:gap-0'
      }
      aria-labelledby={headerId}
    >
      <p className="hidden px-[15px] text-[12px] font-medium uppercase leading-none tracking-[1.6px] text-[#484848] lg:flex lg:items-center 2xl:hidden">
        Step {step.stepNumber} of {stepTotal}
      </p>

      <div
        className={
          isExpanded
            ? 'lg:flex lg:flex-col lg:items-center lg:gap-[15px] lg:self-stretch lg:border-t-[0.5px] lg:border-text-primary lg:px-[15px] lg:py-5 2xl:block 2xl:border-0 2xl:px-0 2xl:py-0 2xl:gap-0'
            : 'lg:flex lg:flex-col lg:self-stretch lg:border-y-[0.5px] lg:border-text-primary lg:px-[15px] lg:py-5 2xl:block 2xl:border-0 2xl:px-0 2xl:py-0'
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
              ? 'border-t border-border-light bg-surface-review px-4 pb-5 pt-4 md:px-5 lg:w-full lg:border-0 lg:bg-transparent lg:p-0 2xl:border-t 2xl:border-border-light 2xl:bg-surface-review 2xl:px-5 2xl:pb-5 2xl:pt-4'
              : undefined
          }
        >
          {isExpanded && (
            <div className="flex flex-col items-center gap-4 lg:gap-[15px] 2xl:gap-4">
              <div className="-mx-1 flex w-full snap-x snap-mandatory items-center justify-center gap-4 overflow-x-auto px-1 pb-2 lg:mx-0 lg:flex-nowrap lg:gap-[15px] lg:overflow-visible lg:px-0 lg:pb-0 2xl:flex-wrap 2xl:gap-4 2xl:overflow-visible">
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
                  className="min-h-11 rounded-button border-2 border-wyze-purple px-6 py-2.5 text-sm font-semibold text-wyze-purple transition hover:bg-wyze-purple/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wyze-purple lg:min-h-0 lg:rounded-[7px] lg:border lg:px-6 lg:py-[5px] lg:text-[18px] lg:leading-6 2xl:min-h-11 2xl:rounded-button 2xl:border-2 2xl:py-2.5 2xl:text-sm 2xl:leading-normal"
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
