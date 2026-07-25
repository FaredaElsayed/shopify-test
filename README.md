# Wyze Bundle Builder

Frontend take-home: a multi-step security bundle builder with a live review panel.

## Run instructions

```bash
cd shopify-test
npm install
npm run dev
```

Open http://localhost:5173

### Build for production

```bash
npm run build
npm run preview
```

## Phase 6 status

Responsive layouts for mobile, tablet, and desktop:

| Viewport | Layout |
|----------|--------|
| **≥1024px (lg)** | Builder left + sticky review right (single-column review) |
| **768–1023px (md)** | Stacked builder + review; review uses 2-column grid (items / summary) |
| **<768px** | Full vertical stack; compact review rows; 44px touch targets on steppers |

- Camera step uses horizontal scroll on tablet when there are 3+ products
- Plan category shows as **Home Monitoring Plan** on mobile

## Phase 5 status

- Accordion headers **toggle** expand/collapse (one step open at a time; re-click collapses)
- **Next** button advances and expands the following step
- Card ↔ review steppers stay in sync; **N selected** counts update live
- **Checkout** opens an accessible placeholder modal (Esc to close)
- **Save** writes to localStorage and shows a confirmation toast
- **Wyze Sense Hub** quantity locked at minimum 1 (required item)
- Keyboard support on quantity steppers (arrow keys); focus-visible styles

## Phase 4 status

- `AppLayout` — two-column desktop grid, sticky review panel
- `BuilderAccordion` + `AccordionStep` + `ProductCard` — builder with live state
- `ReviewPanel` — grouped line items, shipping, totals, checkout/save CTAs
- Shared: `QuantityStepper`, `VariantChipRow`, `ProductPricing`, icons

Run `npm run dev` at ≥1024px width for the desktop layout. Steppers in cards and review stay in sync.

## Phase 3 status

- `src/state/reducer.ts` — `BundleState`, actions, seed/restore/reset
- `src/state/selectors.ts` — step counts, review lines, totals, card/review qty helpers
- `src/state/persistence.ts` — `localStorage` key `wyze-bundle-config-v1`
- `src/state/BundleProvider.tsx` + `useBundle.ts` — intent-based context API (no raw `dispatch`)
- `src/styles/tokens.ts` — single design-token source; `tailwind.config.ts` derives theme from it
- `src/data/catalog.ts` — hydrated catalog (JSON + Vite product images)

**Persistence:** Saves on explicit **Save my system for later** click. Restores selections, variants, and accordion step on page load if saved data exists.

**Variant model:** `{ stepId, productId, variantId, quantity }` — card stepper binds to active variant; review lists every variant with qty &gt; 0.

## Phase 2 status

- `src/types/bundle.ts` — Product, Variant, BundleStep, Catalog, Selection, etc.
- `src/data/catalog.json` — 4 steps, 9 products, shipping, review meta, seed selections
- `src/utils/pricing.ts` — line-item totals, step counts, money formatting
- `src/data/validateSeed.ts` — dev console validation on load

**Seed state:** Wyze Cam v4 ×1, Cam Pan v3 ×2, Cam Unlimited, Motion Sensor ×2, Sense Hub (free), MicroSD ×2.

**Totals:** Active **$187.89** matches design. Compare sums to **$238.87** from line items; design footer shows **$238.81** (stored in `reviewMeta.targetTotals` for display in Phase 3).

## Phase 1 status

- Vite + React 19 + TypeScript + Tailwind CSS scaffold
- Design tokens in `tailwind.config.ts` and `src/styles/tokens.ts` (screenshot-derived)
- `@/` path alias configured in `vite.config.ts` and `tsconfig.app.json`
- Reference mockups: `public/reference/` (desktop, tablet, mobile)

## Design reference

- [Figma file](https://www.figma.com/design/JYf61etQVqeseX7oY5alGz/Frontend-Test-Figma?node-id=68-8088)
- Local screenshots in `public/reference/`

## Decisions (in progress)

- **Persistence:** localStorage on explicit "Save my system for later" click
- **Variant model:** per-variant quantities tracked separately; card stepper binds to active variant
- **Data:** local JSON (`src/data/catalog.json` — Phase 2)
