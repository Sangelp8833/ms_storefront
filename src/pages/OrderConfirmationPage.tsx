import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, Copy, Check, ShoppingBag, MapPin } from 'lucide-react'
import { Button } from '@/components/shared/Button'

export function OrderConfirmationPage() {
  const [params] = useSearchParams()
  const code = params.get('code') ?? ''
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md text-center">

        {/* Check icon */}
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircle size={44} className="text-success" />
          </div>
        </div>

        <h1 className="font-sans text-3xl font-bold text-text-primary">
          ¡Pedido recibido!
        </h1>
        <p className="mt-3 font-body text-text-secondary">
          Gracias por tu compra. Tu pedido está en camino a ser preparado.
        </p>

        {/* Código de tracking */}
        <div className="mt-8 rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
          <p className="text-sm font-body text-text-secondary">Código de seguimiento</p>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-2xl font-bold text-text-primary tracking-widest">
              {code}
            </span>
            <button
              onClick={handleCopy}
              aria-label="Copiar código"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-accent hover:border-accent transition-colors"
            >
              {copied ? <Check size={15} className="text-success" /> : <Copy size={15} />}
            </button>
          </div>
          <p className="text-xs font-body text-text-muted">
            Te enviamos este código a tu correo. Úsalo para rastrear tu pedido en cualquier momento.
          </p>
        </div>

        {/* Acciones */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="secondary">
            <Link to={`/pedido/${code}`}>
              <MapPin size={16} />
              Rastrear pedido
            </Link>
          </Button>
          <Button asChild>
            <Link to="/tienda">
              <ShoppingBag size={16} />
              Seguir comprando
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
