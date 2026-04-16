import * as Dialog from '@radix-ui/react-dialog'
import { useNavigate } from 'react-router-dom'
import { LogIn, UserPlus, X } from 'lucide-react'
import { Button } from '@/components/shared/Button'

interface RequireAuthModalProps {
  open: boolean
  onClose: () => void
}

export function RequireAuthModal({ open, onClose }: RequireAuthModalProps) {
  const navigate = useNavigate()

  const goTo = (path: string) => {
    onClose()
    navigate(path)
  }

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { if (!v) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-fade-in" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface p-8 shadow-xl data-[state=open]:animate-slide-up">

          <div className="flex flex-col items-center text-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
              <LogIn size={24} className="text-accent" />
            </div>

            <div>
              <Dialog.Title className="font-sans text-xl font-bold text-text-primary">
                Necesitas iniciar sesión
              </Dialog.Title>
              <Dialog.Description className="mt-2 font-body text-sm text-text-secondary">
                Para proceder al pago debes tener una cuenta. Es rápido y gratis.
              </Dialog.Description>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Button
                onClick={() => goTo('/login?redirect=/checkout')}
                className="w-full"
              >
                <LogIn size={16} />
                Iniciar sesión
              </Button>
              <Button
                variant="secondary"
                onClick={() => goTo('/registro')}
                className="w-full"
              >
                <UserPlus size={16} />
                Crear cuenta gratis
              </Button>
            </div>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
