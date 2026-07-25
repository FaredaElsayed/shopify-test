import type { ReviewCategory } from '@/types/bundle'

const CATEGORY_LABELS: Record<ReviewCategory, string> = {
  cameras: 'Cameras',
  sensors: 'Sensors',
  accessories: 'Accessories',
  plan: 'Plan',
}

const MOBILE_CATEGORY_LABELS: Record<ReviewCategory, string> = {
  cameras: 'Cameras',
  sensors: 'Sensors',
  accessories: 'Accessories',
  plan: 'Home Monitoring Plan',
}

export function CategoryHeading({ category }: { category: ReviewCategory }) {
  return (
    <h3 className="text-[12px] font-normal uppercase leading-4 tracking-[0.03em] text-[#A8B2BD]">
      <span className="md:hidden">{MOBILE_CATEGORY_LABELS[category]}</span>
      <span className="hidden md:inline">{CATEGORY_LABELS[category]}</span>
    </h3>
  )
}
