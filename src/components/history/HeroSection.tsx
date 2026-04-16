import { motion } from 'framer-motion'
import { ScrollCta } from './ScrollCta'

export function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">

      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-accent/5 blur-2xl" />
      </div>

      {/* Imagen hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mb-8 h-44 w-44 overflow-hidden rounded-full border-4 border-accent/20 shadow-xl"
      >
        <img
          src="https://picsum.photos/seed/books1/400/400"
          alt="Los Libros de Ivonnet"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Texto */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="font-sans text-5xl sm:text-6xl font-bold text-text-primary leading-tight max-w-2xl"
      >
        Los Libros de{' '}
        <span className="text-accent italic">Ivonnet</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="mt-5 text-lg sm:text-xl font-body text-text-secondary max-w-xl leading-relaxed"
      >
        Kits literarios, libretas y productos únicos para los que aman los libros tanto como nosotros.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="mt-10"
      >
        <ScrollCta label="Explorar la tienda" />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-body">Conoce nuestra historia</span>
          <div className="h-6 w-px bg-text-muted/40" />
          <div className="h-1.5 w-1.5 rounded-full bg-text-muted/60" />
        </div>
      </motion.div>
    </section>
  )
}
