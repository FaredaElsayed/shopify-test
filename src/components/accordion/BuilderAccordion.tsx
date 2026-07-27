import { catalog } from '@/data/catalog'
import { AccordionStep } from '@/components/accordion/AccordionStep'
import { useBundle } from '@/state/useBundle'

export function BuilderAccordion() {
  const { state, setActiveStep, toggleActiveStep } = useBundle()

  return (
    <div
      className="overflow-hidden rounded-card border border-border bg-surface-card shadow-card lg:flex lg:flex-col lg:items-stretch lg:gap-[13px] lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none 2xl:rounded-card 2xl:border 2xl:bg-surface-card 2xl:shadow-card 2xl:overflow-hidden 2xl:gap-0"
      aria-label="Bundle builder steps"
    >
      {catalog.steps.map((step, index) => (
        <AccordionStep
          key={step.id}
          step={step}
          isExpanded={state.activeStepIndex === index}
          onToggle={() => toggleActiveStep(index)}
          onNext={() => setActiveStep(index + 1)}
          isLastStep={index === catalog.steps.length - 1}
        />
      ))}
    </div>
  )
}
