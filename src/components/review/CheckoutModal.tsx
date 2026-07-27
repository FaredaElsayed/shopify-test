import { useEffect, useId, useRef } from 'react'

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  totalLabel: string
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function CheckoutModal({
  open,
  onClose,
  onConfirm,
  totalLabel,
}: CheckoutModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusFirst = () => {
      const dialog = dialogRef.current
      if (!dialog) return

      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1)

      ;(focusables[0] ?? closeButtonRef.current ?? dialog).focus()
    }

    focusFirst()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1)

      if (focusables.length === 0) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocusedRef.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80"
        aria-label="Close checkout confirmation"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-md rounded-card border border-border bg-surface-card p-6 shadow-review outline-none"
      >
        <h2 id={titleId} className="text-xl font-bold text-text-primary">
          Checkout confirmation
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          Confirm your security system order totaling{' '}
          <span className="font-semibold text-text-primary">{totalLabel}</span>.
        </p>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onConfirm}
          className="mt-6 flex h-12 w-full items-center justify-center rounded bg-wyze-purple px-4 py-[13px] text-[17px] font-bold leading-[22px] text-white transition hover:bg-wyze-purple-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wyze-purple"
        >
          Confirm
        </button>
      </div>
    </div>
  )
}
