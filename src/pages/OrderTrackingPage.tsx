import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, ShoppingBag } from 'lucide-react'
import { OrderTimeline } from '@/components/order/OrderTimeline'
import { Spinner } from '@/components/shared/Spinner'
import { Button } from '@/components/shared/Button'
import { formatDate } from '@/lib/utils'
import api from '@/lib/api'
import type { OrderStatus } from '@/types'

interface TrackingData {
  trackingCode: string
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

export function OrderTrackingPage() {
  const { code } = useParams<{ code: string }>()
  const [data, setData] = useState<TrackingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!code) return
    api.get(`/storefront/orders/${code}`)
      .then((r) => {
        const o = r.data.order
        setData({
          trackingCode: o.tracking_code,
          status:       o.status,
          createdAt:    o.created_at,
          updatedAt:    o.updated_at,
        })
      })
      .catch((err) => {
        if (err.response?.status === 404) setNotFound(true)
      })
      .finally(() => setLoading(false))
  }, [code])

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (notFound || !data) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-64px)] items-center justify-center gap-5 px-4 text-center">
        <MapPin size={48} className="text-border" />
        <div>
          <h1 className="font-sans text-2xl font-bold text-text-primary">Código no encontrado</h1>
          <p className="mt-2 font-body text-text-secondary">
            El código <span className="font-mono font-bold">{code}</span> no existe o expiró.
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link to="/tienda">
            <ShoppingBag size={16} />
            Ir a la tienda
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="mb-8 text-center">
        <p className="text-xs font-body font-semibold uppercase tracking-widest text-accent mb-1">
          Seguimiento de pedido
        </p>
        <h1 className="font-sans text-3xl font-bold text-text-primary font-mono tracking-wide">
          {data.trackingCode}
        </h1>
        <p className="mt-2 text-sm font-body text-text-secondary">
          Pedido el {formatDate(data.createdAt)} · Última actualización: {formatDate(data.updatedAt)}
        </p>
      </div>

      {/* Timeline */}
      <div className="rounded-2xl border border-border bg-surface p-6">
        <OrderTimeline currentStatus={data.status} />
      </div>

      <div className="mt-6 text-center">
        <Button asChild variant="ghost">
          <Link to="/tienda">
            <ShoppingBag size={16} />
            Seguir comprando
          </Link>
        </Button>
      </div>
    </div>
  )
}
