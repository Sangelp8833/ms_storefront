import { useState, useEffect, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Input } from '@/components/shared/Input'
import { Button } from '@/components/shared/Button'
import { Spinner } from '@/components/shared/Spinner'
import { formatPrice } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import api from '@/lib/api'

export function CheckoutPage() {
  const token = useAuthStore((s) => s.token)
  const { items, total, clearCart } = useCartStore()
  const navigate = useNavigate()

  const [address, setAddress] = useState('')
  const [addressError, setAddressError] = useState('')
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  // Pre-rellenar dirección del usuario
  useEffect(() => {
    if (!token) return
    api.get('/auth/me')
      .then((r) => { if (r.data.user?.address) setAddress(r.data.user.address) })
      .catch(() => {})
  }, [token])

  if (!token) return <Navigate to="/login?redirect=/checkout" replace />
  if (items.length === 0) return <Navigate to="/carrito" replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!address.trim()) { setAddressError('La dirección es requerida'); return }
    setAddressError('')
    setServerError('')
    setLoading(true)

    try {
      const payload = {
        items: items.map((i) => ({ product_id: i.productId, quantity: i.quantity })),
        address,
        payment_method: 'transfer',
      }
      const { data } = await api.post('/storefront/orders', payload)
      clearCart()
      navigate(`/orden/confirmacion?code=${data.order.tracking_code}`, { replace: true })
    } catch {
      setServerError('No se pudo procesar tu orden. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      <h1 className="font-sans text-3xl font-bold text-text-primary mb-8">Finalizar compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
          <div>
            <h2 className="font-sans text-lg font-semibold text-text-primary mb-4">Datos de entrega</h2>
            <Input
              label="Dirección de entrega"
              placeholder="Calle 123 #45-67, Bogotá"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={addressError}
              autoComplete="street-address"
            />
          </div>

          <div>
            <h2 className="font-sans text-lg font-semibold text-text-primary mb-3">Método de pago</h2>
            <div className="flex items-center gap-3 rounded-xl border-2 border-accent bg-accent/5 px-4 py-3">
              <div className="h-4 w-4 rounded-full border-2 border-accent bg-accent" />
              <span className="font-body text-sm font-medium text-text-primary">Transferencia bancaria</span>
            </div>
            <p className="mt-2 text-xs font-body text-text-muted">
              Los datos de la cuenta se enviarán a tu correo tras confirmar el pedido.
            </p>
          </div>

          {serverError && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm font-body text-red-600">
              {serverError}
            </div>
          )}

          <Button type="submit" loading={loading} size="lg" className="w-full">
            Confirmar pedido
          </Button>
        </form>

        {/* Resumen del pedido */}
        <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
          <h2 className="font-sans text-lg font-semibold text-text-primary">Tu pedido</h2>

          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between gap-2 text-sm font-body">
                <span className="text-text-secondary line-clamp-1 flex-1">
                  {item.name} × {item.quantity}
                </span>
                <span className="text-text-primary font-medium shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="h-px bg-border" />
          <div className="flex justify-between font-body">
            <span className="font-semibold text-text-primary">Total</span>
            <span className="font-bold text-accent text-lg">{formatPrice(total())}</span>
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  )
}
