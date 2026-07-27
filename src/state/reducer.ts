import type { PersistedBundleState, Selection } from "@/types/bundle";
import { catalog } from "@/data/catalog";
import { findProduct, getInitialSelections } from "@/utils/pricing";
import {
  clampQuantity,
  resolveVariantId,
  upsertSelection,
} from "@/state/selectionHelpers";

export interface BundleState {
  selections: Selection[];
  activeVariantMap: Record<string, string>;
  activeStepIndex: number;
  lastSavedAt: string | null;
}

export type BundleAction =
  | { type: "SET_ACTIVE_STEP"; stepIndex: number }
  | { type: "TOGGLE_ACTIVE_STEP"; stepIndex: number }
  | { type: "SET_ACTIVE_VARIANT"; productId: string; variantId: string }
  | {
      type: "SET_QUANTITY";
      stepId: string;
      productId: string;
      variantId?: string | null;
      quantity: number;
    }
  | { type: "RESTORE_STATE"; payload: PersistedBundleState }
  | { type: "RESET_TO_SEED" }
  | { type: "MARK_SAVED"; savedAt: string }
  | { type: "CLEAR_SAVED" };

function clampStepIndex(stepIndex: number): number {
  const maxIndex = catalog.steps.length - 1;
  return Math.min(maxIndex, Math.max(-1, stepIndex));
}

export function createSeedState(): BundleState {
  return {
    selections: getInitialSelections(),
    activeVariantMap: { ...catalog.initialActiveVariants },
    activeStepIndex: catalog.initialActiveStepIndex,
    lastSavedAt: null,
  };
}

export function restoreFromPersisted(
  payload: PersistedBundleState,
): BundleState {
  return {
    selections: payload.selections.map((item) => ({ ...item })),
    activeVariantMap: { ...payload.activeVariantMap },
    activeStepIndex: clampStepIndex(payload.activeStepIndex),
    lastSavedAt: null,
  };
}

export function bundleReducer(
  state: BundleState,
  action: BundleAction,
): BundleState {
  switch (action.type) {
    case "SET_ACTIVE_STEP": {
      return { ...state, activeStepIndex: clampStepIndex(action.stepIndex) };
    }

    case "TOGGLE_ACTIVE_STEP": {
      const stepIndex = Math.min(
        catalog.steps.length - 1,
        Math.max(0, action.stepIndex),
      );

      if (state.activeStepIndex === stepIndex) {
        return { ...state, activeStepIndex: -1 };
      }

      return { ...state, activeStepIndex: stepIndex };
    }

    case "SET_ACTIVE_VARIANT": {
      return {
        ...state,
        activeVariantMap: {
          ...state.activeVariantMap,
          [action.productId]: action.variantId,
        },
      };
    }

    case "SET_QUANTITY": {
      const found = findProduct(action.stepId, action.productId);
      if (!found) return state;

      const { product } = found;
      const variantId = resolveVariantId(
        product,
        state.activeVariantMap,
        action.variantId,
      );
      const quantity = clampQuantity(product, action.quantity);

      return {
        ...state,
        selections: upsertSelection(state.selections, {
          stepId: action.stepId,
          productId: action.productId,
          variantId,
          quantity,
        }),
      };
    }

    case "RESTORE_STATE":
      return restoreFromPersisted(action.payload);

    case "RESET_TO_SEED":
      return createSeedState();

    case "MARK_SAVED":
      return { ...state, lastSavedAt: action.savedAt };

    case "CLEAR_SAVED":
      return { ...state, lastSavedAt: null };

    default:
      return state;
  }
}

export function toPersistedState(state: BundleState): PersistedBundleState {
  return {
    version: 1,
    selections: state.selections
      .filter((item) => item.quantity > 0)
      .map((item) => ({ ...item })),
    activeVariantMap: { ...state.activeVariantMap },
    activeStepIndex: state.activeStepIndex,
  };
}
