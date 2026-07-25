import type { Catalog } from '@/types/bundle'
import { resolveProductImageUrl } from '@/assets/productImages'
import catalogData from '@/data/catalog.json'

function withProductImages(data: Catalog): Catalog {
  return {
    ...data,
    steps: data.steps.map((step) => ({
      ...step,
      products: step.products.map((product) => ({
        ...product,
        imageUrl: resolveProductImageUrl(product.id, product.imageUrl),
      })),
    })),
  }
}

/** Hydrated catalog (JSON + Vite-resolved product images). */
export const catalog = withProductImages(catalogData as Catalog)
