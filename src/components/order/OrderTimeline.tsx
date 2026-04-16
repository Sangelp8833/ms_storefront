import { Check, Package, Truck, PartyPopper, ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { OrderStatus } from '@/types'

interface Step {
  status: OrderStatus
  label: string
  description: string
  icon: React.ElementType
}

const STEPS: Step[] = [
  { status: 'received',  label: 'Pedido recibido',           description: 'Tu pago fue confirmado.',           icon: ClipboardList },
  { status: 'preparing', label: 'Preparando tu pedido',      description: 'Estamos armando tu kit.',           icon: Package },
  { status: 'shipped',   label: 'En camino',                 description: 'Tu pedido va en camino.',           icon: Truck },
  { status: 'delivered', label: 'Entregado',                 description: '¡Tu pedido llegó! Disfrútalo.',     icon: PartyPopper },
]

const ORDER: OrderStatus[] = ['received', 'preparing', 'shipped', 'delivered']

interface OrderTimelineProps {
  currentStatus: OrderStatus
}

export function OrderTimeline({ currentStatus }: OrderTimelineProps) {
  const currentIdx = ORDER.indexOf(currentStatus)

  return (
    <ol className="flex flex-col gap-0">
      {STEPS.map((step, idx) => {
        const completed = idx < currentIdx
        const active    = idx === currentIdx
        const pending   = idx > currentIdx
        const Icon      = step.icon
        const isLast    = idx === STEPS.length - 1

        return (
          <li key={step.status} className="flex gap-4">
            {/* Icono + línea */}
            <div className="flex flex-col items-center">
              <div className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                completed && 'border-success bg-success text-white',
                active    && 'border-accent bg-accent text-white animate-pulse',
                pending   && 'border-border bg-surface text-text-muted',
              )}>
                {completed ? <Check size={18} /> : <Icon size={18} />}
              </div>
              {!isLast && (
                <div className={cn(
                  'my-1 w-0.5 flex-1 min-h-[2rem] transition-colors',
                  completed ? 'bg-success' : 'bg-border',
                )} />
              )}
            </div>

            {/* Texto */}
            <div className={cn('pb-6', isLast && 'pb-0')}>
              <p className={cn(
                'font-body font-semibold text-sm',
                completed && 'text-success',
                active    && 'text-accent',
                pending   && 'text-text-muted',
              )}>
                {step.label}
              </p>
              <p className={cn(
                'text-xs font-body mt-0.5',
                active || completed ? 'text-text-secondary' : 'text-text-muted',
              )}>
                {step.description}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
