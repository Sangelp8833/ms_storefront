import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/shared/Button'

export function CtaSection() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-accent py-28 px-6">
      {/* Decoración */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-white/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white/5 blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-2xl text-center flex flex-col items-center gap-7"
      >
        <h2 className="font-sans text-4xl sm:text-5xl font-bold text-white leading-tight">
          ¿Lista para tu próxima lectura?
        </h2>
        <p className="font-body text-lg text-white/80 leading-relaxed">
          Encuentra el kit perfecto para ti o para regalar. Cada producto está pensado con cariño para los amantes de los libros.
        </p>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate('/tienda')}
          className="bg-white text-accent hover:bg-white/90 border-0 shadow-lg font-semibold"
        >
          <ShoppingBag size={18} />
          Ir a la tienda
        </Button>
      </motion.div>
    </section>
  )
}
