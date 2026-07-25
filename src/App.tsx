import { BuilderAccordion } from '@/components/accordion/BuilderAccordion'
import { AppLayout } from '@/components/layout/AppLayout'
import { PageHeader } from '@/components/layout/PageHeader'
import { ReviewPanel } from '@/components/review/ReviewPanel'
import { Toast } from '@/components/ui/Toast'
import { useBundle } from '@/state/useBundle'

function App() {
  const { toastMessage, dismissToast } = useBundle()

  return (
    <div className="min-h-screen bg-surface-page">
      <AppLayout
        builder={
          <>
            <PageHeader />
            <BuilderAccordion />
          </>
        }
        review={<ReviewPanel />}
      />
      {toastMessage && (
        <Toast message={toastMessage} onDismiss={dismissToast} />
      )}
    </div>
  )
}

export default App
