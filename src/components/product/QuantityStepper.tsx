import type { KeyboardEvent } from 'react'
import { tokens } from '@/styles/tokens'

interface QuantityStepperProps {
  value: number
  onDecrease: () => void
  onIncrease: () => void
  min?: number
  max?: number
  size?: 'sm' | 'md' | 'card' | 'review'
  label?: string
  locked?: boolean
}

export function QuantityStepper({
  value,
  onDecrease,
  onIncrease,
  min = 0,
  max = 99,
  size = 'md',
  label = 'item',
  locked = false,
}: QuantityStepperProps) {
  const decreaseDisabled = locked || value <= min
  const increaseDisabled = locked || value >= max

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (locked) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
      event.preventDefault()
      if (!decreaseDisabled) onDecrease()
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
      event.preventDefault()
      if (!increaseDisabled) onIncrease()
    }
  }

  if (size === 'card') {
    return (
      <div
        className="flex h-[35px] w-[80px] flex-row items-center justify-center gap-[10px] rounded py-1 lg:h-[28px] 2xl:h-[35px]"
        role="group"
        aria-label={`Quantity for ${label}`}
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          aria-label={`Decrease quantity of ${label}`}
          disabled={decreaseDisabled}
          onClick={onDecrease}
          className="relative box-border flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 bg-surface-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-wyze-purple disabled:cursor-not-allowed disabled:opacity-40"
          style={{ borderColor: tokens.colors.stepperBorder }}
        >
          <span
            className="block h-[2px] w-2 rounded-sm"
            style={{ backgroundColor: tokens.colors.stepperMinusIcon }}
          />
        </button>
        <span
          className="flex h-5 items-end text-[16px] font-medium leading-5"
          style={{ color: tokens.colors.qtyText }}
          aria-live="polite"
          aria-atomic="true"
        >
          {value}
        </span>
        <button
          type="button"
          aria-label={`Increase quantity of ${label}`}
          disabled={increaseDisabled}
          onClick={onIncrease}
          className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-wyze-purple disabled:cursor-not-allowed disabled:opacity-40"
          style={{ backgroundColor: tokens.colors.stepperPlusBg }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
            <path
              d="M0 3.5h8M3.5 0v8"
              stroke={tokens.colors.stepperPlusIcon}
              strokeWidth="1.2"
            />
          </svg>
        </button>
      </div>
    )
  }

  if (size === 'review') {
    const btnClass = locked
      ? 'flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border-divider bg-surface-muted'
      : 'flex h-5 w-5 shrink-0 items-center justify-center rounded bg-surface-card'

    return (
      <div
        className="flex h-7 w-[72px] flex-row items-center justify-between gap-2.5 rounded py-1"
        role="group"
        aria-label={`Quantity for ${label}`}
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          aria-label={`Decrease quantity of ${label}`}
          disabled={decreaseDisabled}
          onClick={onDecrease}
          className={`${btnClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-wyze-purple disabled:cursor-not-allowed`}
        >
          <span className="block h-[2px] w-2 rounded-sm bg-price-active" />
        </button>
        <span
          className="flex h-4 items-end text-[14px] font-semibold leading-4 text-stepper-qty"
          aria-live="polite"
          aria-atomic="true"
        >
          {value}
        </span>
        <button
          type="button"
          aria-label={`Increase quantity of ${label}`}
          disabled={increaseDisabled}
          onClick={onIncrease}
          className={`${btnClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-wyze-purple disabled:cursor-not-allowed`}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
            <path
              d="M0 3.5h8M3.5 0v8"
              stroke={tokens.colors.priceActive}
              strokeWidth="1.2"
            />
          </svg>
        </button>
      </div>
    )
  }

  const sizeClasses = {
    sm: {
      button: 'h-7 w-7 text-base',
      value: 'min-w-6 text-sm',
    },
    md: {
      button: 'h-11 w-11 text-lg md:h-8 md:w-8 md:text-lg',
      value: 'min-w-8 text-base',
    },
  } as const

  const { button: buttonSize, value: valueClass } = sizeClasses[size]

  return (
    <div
      className="inline-flex items-center gap-1"
      role="group"
      aria-label={`Quantity for ${label}`}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        aria-label={`Decrease quantity of ${label}`}
        className={`${buttonSize} rounded border border-border bg-surface-card text-text-primary transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-wyze-purple disabled:cursor-not-allowed disabled:opacity-40`}
        onClick={onDecrease}
        disabled={decreaseDisabled}
      >
        −
      </button>
      <span
        className={`${valueClass} text-center font-medium tabular-nums text-text-primary`}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label={`Increase quantity of ${label}`}
        className={`${buttonSize} rounded border border-border bg-surface-card text-text-primary transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-wyze-purple disabled:cursor-not-allowed disabled:opacity-40`}
        onClick={onIncrease}
        disabled={increaseDisabled}
      >
        +
      </button>
    </div>
  )
}
