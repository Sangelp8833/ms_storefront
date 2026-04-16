import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, User, LogOut, Package, BookOpen, ChevronDown } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { token, name, clearAuth } = useAuthStore()
  const count = useCartStore((s) => s.count())
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuth()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors"
        >
          <BookOpen size={22} className="text-accent" />
          <span className="font-sans font-semibold text-lg tracking-tight leading-tight hidden sm:block">
            Los Libros de Ivonnet
          </span>
          <span className="font-sans font-semibold text-lg tracking-tight sm:hidden">
            LBI
          </span>
        </Link>

        {/* Nav links + actions */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/tienda"
            className="text-sm font-body font-medium text-text-secondary hover:text-text-primary transition-colors px-1"
          >
            Tienda
          </Link>

          {/* Carrito */}
          <Link
            to="/carrito"
            aria-label="Ver carrito"
            className="relative flex items-center justify-center h-9 w-9 rounded-full hover:bg-hover-row transition-colors text-text-secondary hover:text-text-primary"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className={cn(
                'absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center',
                'rounded-full bg-accent text-white text-[10px] font-bold font-body',
              )}>
                {count > 99 ? '99+' : count}
              </span>
            )}
          </Link>

          {/* Usuario */}
          {token ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  className="flex items-center gap-1.5 text-sm font-body font-medium text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
                  aria-label="Menú de usuario"
                >
                  <User size={18} />
                  <span className="hidden sm:block max-w-[100px] truncate">{name}</span>
                  <ChevronDown size={14} />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  sideOffset={8}
                  className="z-50 min-w-[160px] rounded-xl border border-border bg-surface shadow-lg py-1 animate-fade-in"
                >
                  <DropdownMenu.Item asChild>
                    <Link
                      to="/mis-pedidos"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-body text-text-primary hover:bg-hover-row cursor-pointer outline-none"
                    >
                      <Package size={15} />
                      Mis pedidos
                    </Link>
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="h-px bg-border my-1" />

                  <DropdownMenu.Item
                    onSelect={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-body text-red-500 hover:bg-hover-row cursor-pointer outline-none"
                  >
                    <LogOut size={15} />
                    Cerrar sesión
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-sm font-body font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              <User size={18} />
              <span className="hidden sm:block">Ingresar</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
