import { catalog } from "@/data/catalog";
import {
  computeBundleTotals,
  getInitialSelections,
} from "@/utils/pricing";

const TARGET = catalog.reviewMeta.targetTotals;

export function validateSeedState(): void {
  const selections = getInitialSelections();
  const totals = computeBundleTotals(selections);

  const matches = {
    activeTotal: totals.activeTotal === TARGET.activeTotal,
    compareTotal: totals.compareTotal === TARGET.compareTotal,
    savings: totals.savings === TARGET.savings,
  };

  if (!matches.activeTotal) {
    console.warn("[bundle] Active total does not match design target.");
  }

  if (!matches.compareTotal) {
    console.info(
      `[bundle] Compare total differs by $${Math.abs(totals.compareTotal - TARGET.compareTotal).toFixed(2)} — footer will use targetTotals from catalog in Phase 3+.`,
    );
  }
}
