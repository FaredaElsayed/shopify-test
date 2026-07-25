import type { ReactNode } from 'react'

interface AppLayoutProps {
  builder: ReactNode
  review: ReactNode
}

export function AppLayout({ builder, review }: AppLayoutProps) {
  return (
    <div className="bg-[#FFFFFF] mx-auto max-w-page px-4 py-6 sm:px-5 sm:py-8 md:px-6 md:py-10 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[minmax(0,1fr)_399px] lg:items-start lg:gap-8 2xl:grid-cols-1 2xl:gap-[13px]">
        <div className="min-w-0">{builder}</div>
        <div className="min-w-0">{review}</div>
      </div>
    </div>
  )
}
