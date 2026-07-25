import { catalog } from '@/data/catalog'
import { AccordionStep } from '@/components/accordion/AccordionStep'
import { useBundle } from '@/state/useBundle'

export function BuilderAccordion() {
  const { state, setActiveStep, toggleActiveStep } = useBundle()

  return (
    <div
      className="overflow-hidden rounded-card border border-border bg-surface-card shadow-card 2xl:flex 2xl:flex-col 2xl:items-stretch 2xl:gap-[13px] 2xl:overflow-visible 2xl:rounded-none 2xl:border-0 2xl:bg-transparent 2xl:shadow-none"
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
