import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { CartItem } from '@/components/cart/CartItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { RequireAuthModal } from '@/components/auth/RequireAuthModal'
import { Button } from '@/components/shared/Button'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'

export function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCartStore()
  const token = useAuthStore((s) => s.token)
  const navigate = useNavigate()
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const handleCheckout = () => {
    if (!token) {
      setAuthModalOpen(true)
    } else {
      navigate('/checkout')
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-5 px-4 text-center">
        <ShoppingBag size={56} className="text-border" />
        <div>
          <h1 className="font-sans text-2xl font-bold text-text-primary">Tu carrito está vacío</h1>
          <p className="mt-2 font-body text-text-secondary">
            ¿Qué esperas? Hay libros esperándote.
          </p>
        </div>
        <Button asChild>
          <Link to="/tienda">Explorar la tienda</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <h1 className="font-sans text-3xl font-bold text-text-primary mb-8">
        Mi carrito <span className="text-text-secondary font-normal text-lg">({items.length} {items.length === 1 ? 'producto' : 'productos'})</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Lista */}
        <div className="rounded-2xl border border-border bg-surface px-6">
          {items.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Resumen */}
        <CartSummary total={total()} onCheckout={handleCheckout} />
      </div>

      <RequireAuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  )
}
