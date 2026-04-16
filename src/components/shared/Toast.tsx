import * as ToastPrimitive from '@radix-ui/react-toast'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { create } from 'zustand'

// ── store interno ──────────────────────────────────────────────
interface ToastItem {
  id: string
  message: string
  type?: 'success' | 'error' | 'info'
}

interface ToastStore {
  toasts: ToastItem[]
  add: (message: string, type?: ToastItem['type']) => void
  remove: (id: string) => void
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  add: (message, type = 'success') =>
    set((s) => ({
      toasts: [...s.toasts, { id: crypto.randomUUID(), message, type }],
    })),
  remove: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

// ── colores ────────────────────────────────────────────────────
const typeStyles: Record<NonNullable<ToastItem['type']>, string> = {
  success: 'border-l-4 border-success bg-surface',
  error:   'border-l-4 border-red-500 bg-surface',
  info:    'border-l-4 border-accent bg-surface',
}

// ── provider (montar en App.tsx) ──────────────────────────────
export function ToastProvider() {
  const { toasts, remove } = useToast()

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {toasts.map((t) => (
        <ToastPrimitive.Root
          key={t.id}
          open
          onOpenChange={(open) => { if (!open) remove(t.id) }}
          duration={3000}
          className={cn(
            'flex items-start justify-between gap-3 rounded-lg p-4 shadow-lg',
            'data-[state=open]:animate-slide-up data-[state=closed]:opacity-0',
            'transition-opacity w-80',
            typeStyles[t.type ?? 'success'],
          )}
        >
          <ToastPrimitive.Description className="text-sm text-text-primary font-body">
            {t.message}
          </ToastPrimitive.Description>
          <ToastPrimitive.Close
            className="text-text-secondary hover:text-text-primary shrink-0"
            aria-label="Cerrar"
          >
            <X size={16} />
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}

      <ToastPrimitive.Viewport className="fixed bottom-6 right-6 flex flex-col gap-2 z-50" />
    </ToastPrimitive.Provider>
  )
}
