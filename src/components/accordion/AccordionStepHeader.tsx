import type { BundleStep } from '@/types/bundle'
import { ChevronIcon, StepIcon } from '@/components/icons/StepIcon'
import { getStepSelectedCount } from '@/state/selectors'
import { useBundle } from '@/state/useBundle'
import { catalog } from '@/data/catalog'

interface AccordionStepHeaderProps {
  step: BundleStep
  headerId: string
  panelId: string
  isExpanded: boolean
  onToggle: () => void
}

export function AccordionStepHeader({
  step,
  headerId,
  panelId,
  isExpanded,
  onToggle,
}: AccordionStepHeaderProps) {
  const { state } = useBundle()
  const selectedCount = getStepSelectedCount(step.id, state)
  const stepTotal = catalog.steps.length

  return (
    <button
      id={headerId}
      type="button"
      className={`flex w-full items-center gap-3 px-4 py-4 text-left sm:px-5 md:min-h-[72px] md:px-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-wyze-purple 2xl:min-h-0 2xl:gap-[3px] 2xl:px-0 2xl:py-0${isExpanded ? ' bg-surface-review 2xl:bg-transparent' : ''}`}
      onClick={onToggle}
      aria-expanded={isExpanded}
      aria-controls={panelId}
    >
      <div className="min-w-0 flex-1">
        <p className="text-step-label uppercase text-text-muted 2xl:hidden">
          Step {step.stepNumber} of {stepTotal}
        </p>
        <div className="mt-1 flex items-center gap-2 2xl:mt-0 2xl:gap-2">
          <StepIcon name={step.icon} />
          <span className="text-base font-bold text-text-primary md:text-lg 2xl:text-[28px] 2xl:font-semibold 2xl:leading-none 2xl:text-stepper-qty">
            {step.title}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {selectedCount > 0 && (
          <span
            className="text-sm font-medium leading-4 text-wyze-purple"
            aria-live="polite"
          >
            {selectedCount} selected
          </span>
        )}
        <ChevronIcon up={isExpanded} />
      </div>
    </button>
  )
}
