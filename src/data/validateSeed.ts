import { catalog } from '@/data/catalog'
import {
  computeBundleTotals,
  getInitialSelections,
  getStepSelectedProductCount,
} from '@/utils/pricing'

const TARGET = catalog.reviewMeta.targetTotals

export function validateSeedState(): void {
  const selections = getInitialSelections()
  const totals = computeBundleTotals(selections)

  const stepCounts = catalog.steps.map((step) => ({
    stepId: step.id,
    title: step.title,
    selected: getStepSelectedProductCount(step.id, selections),
  }))

  const matches = {
    activeTotal: totals.activeTotal === TARGET.activeTotal,
    compareTotal: totals.compareTotal === TARGET.compareTotal,
    savings: totals.savings === TARGET.savings,
  }

  console.group('[bundle] Seed state validation')
  console.table(stepCounts)
  console.log('Computed totals:', totals)
  console.log('Design target totals:', TARGET)
  console.log('Exact match:', matches)

  if (!matches.activeTotal) {
    console.warn('[bundle] Active total does not match design target.')
  }

  if (!matches.compareTotal) {
    console.info(
      `[bundle] Compare total differs by $${Math.abs(totals.compareTotal - TARGET.compareTotal).toFixed(2)} — footer will use targetTotals from catalog in Phase 3+.`,
    )
  }

  console.groupEnd()
}
