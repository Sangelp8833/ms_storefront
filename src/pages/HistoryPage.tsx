import { HeroSection } from '@/components/history/HeroSection'
import { StorySection } from '@/components/history/StorySection'
import { ValuesSection } from '@/components/history/ValuesSection'
import { ProductsPreviewSection } from '@/components/history/ProductsPreviewSection'
import { CtaSection } from '@/components/history/CtaSection'

export function HistoryPage() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <ValuesSection />
      <ProductsPreviewSection />
      <CtaSection />
    </>
  )
}
