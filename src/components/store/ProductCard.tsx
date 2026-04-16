import { ShoppingCart, ImageOff } from 'lucide-react'
import { Button } from '@/components/shared/Button'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const image = product.imageUrls[0]

  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-surface overflow-hidden hover:border-accent/40 hover:shadow-md transition-all duration-200">

      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden bg-hover-row">
        {image ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-muted">
            <ImageOff size={32} />
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <span className="rounded-full bg-surface px-3 py-1 text-xs font-body font-medium text-text-secondary border border-border">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <h3 className="font-sans font-semibold text-base text-text-primary leading-snug line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-body text-text-secondary line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="font-body font-bold text-accent text-lg">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            aria-label={`Agregar ${product.name} al carrito`}
            className="shrink-0"
          >
            <ShoppingCart size={15} />
            Agregar
          </Button>
        </div>
      </div>
    </article>
  )
}
