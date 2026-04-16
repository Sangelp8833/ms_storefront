import { Minus, Plus, Trash2, ImageOff } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { CartItem as CartItemType } from '@/types'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (productId: string, qty: number) => void
  onRemove: (productId: string) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 py-5 border-b border-border last:border-0">
      {/* Imagen */}
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-hover-row border border-border">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-muted">
            <ImageOff size={20} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <p className="font-body font-medium text-text-primary text-sm leading-snug line-clamp-2">
          {item.name}
        </p>
        <p className="font-body text-xs text-text-secondary">
          {formatPrice(item.price)} c/u
        </p>

        {/* Cantidad y eliminar */}
        <div className="flex items-center gap-3 mt-auto">
          <div className="flex items-center gap-1 rounded-lg border border-border bg-background">
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
              aria-label="Reducir cantidad"
              className="flex h-7 w-7 items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
            >
              <Minus size={13} />
            </button>
            <span className="w-6 text-center text-sm font-body font-medium text-text-primary">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
              aria-label="Aumentar cantidad"
              className="flex h-7 w-7 items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
            >
              <Plus size={13} />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.productId)}
            aria-label={`Eliminar ${item.name} del carrito`}
            className="text-text-muted hover:text-red-500 transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Total item */}
      <div className="shrink-0 text-right">
        <p className="font-body font-bold text-text-primary text-sm">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>
    </div>
  )
}
