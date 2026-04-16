import { ProductCard } from './ProductCard'
import { SponsoredCard } from './SponsoredCard'
import { ProductSkeleton } from './ProductSkeleton'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  loading: boolean
  onAddToCart: (product: Product) => void
}

export function ProductGrid({ products, loading, onAddToCart }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-4xl mb-4">📚</p>
        <p className="font-sans text-lg font-semibold text-text-primary">
          No hay productos aquí todavía
        </p>
        <p className="mt-1 text-sm font-body text-text-secondary">
          Prueba con otra categoría o vuelve pronto.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product) =>
        product.type === 'sponsored' ? (
          <SponsoredCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ) : (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        )
      )}
    </div>
  )
}
