import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/shared/Button'

interface CartSummaryProps {
  total: number
  onCheckout: () => void
}

export function CartSummary({ total, onCheckout }: CartSummaryProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-5">
      <h2 className="font-sans text-lg font-semibold text-text-primary">Resumen</h2>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm font-body">
          <span className="text-text-secondary">Subtotal</span>
          <span className="text-text-primary font-medium">{formatPrice(total)}</span>
        </div>
        <div className="flex items-center justify-between text-sm font-body">
          <span className="text-text-secondary">Envío</span>
          <span className="text-text-muted italic">Se calcula al pagar</span>
        </div>
        <div className="my-1 h-px bg-border" />
        <div className="flex items-center justify-between font-body">
          <span className="text-text-primary font-semibold">Total</span>
          <span className="text-accent font-bold text-lg">{formatPrice(total)}</span>
        </div>
      </div>

      <Button onClick={onCheckout} className="w-full" size="lg">
        Proceder al pago
      </Button>

      <p className="text-center text-xs font-body text-text-muted">
        El pago se realiza por transferencia bancaria.
      </p>
    </div>
  )
}
