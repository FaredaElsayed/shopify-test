import { useEffect, useRef } from 'react'

interface ToastProps {
  message: string
  onDismiss: () => void
}

export function Toast({ message, onDismiss }: ToastProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-6 z-50 flex justify-center md:inset-x-auto md:right-6 md:justify-end">
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className="pointer-events-auto max-w-sm rounded-card border border-border bg-text-navy px-4 py-3 text-sm font-medium text-white shadow-review"
      >
        <div className="flex items-start gap-3">
          <span className="flex-1">{message}</span>
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 text-white/80 underline-offset-2 hover:text-white hover:underline"
            aria-label="Dismiss notification"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
