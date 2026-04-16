import { Link } from 'react-router-dom'
import { BookOpen, Instagram, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Marca */}
          <div className="flex items-center gap-2 text-text-primary">
            <BookOpen size={20} className="text-accent" />
            <span className="font-sans font-semibold text-base">Los Libros de Ivonnet</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm font-body text-text-secondary">
            <Link to="/tienda" className="hover:text-text-primary transition-colors">Tienda</Link>
            <Link to="/" className="hover:text-text-primary transition-colors">Nuestra historia</Link>
          </nav>

          {/* Social */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-text-secondary hover:text-accent transition-colors"
          >
            <Instagram size={20} />
          </a>
        </div>

        <p className="mt-8 text-center text-xs font-body text-text-muted flex items-center justify-center gap-1">
          Hecho con <Heart size={11} className="text-accent fill-accent" /> por Los Libros de Ivonnet © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
