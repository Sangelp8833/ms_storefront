import { motion } from 'framer-motion'
import { ScrollCta } from './ScrollCta'

const previews = [
  { seed: 'kit1', label: 'Kit Otoño Literario' },
  { seed: 'kit2', label: 'Libreta de Viaje' },
  { seed: 'kit3', label: 'Kit Café & Lectura' },
  { seed: 'kit4', label: 'Set Marcadores' },
]

export function ProductsPreviewSection() {
  return (
    <section className="bg-surface py-24 px-6">
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-body font-semibold uppercase tracking-widest text-accent">
            Lo que encontrarás
          </span>
          <h2 className="mt-3 font-sans text-4xl font-bold text-text-primary">
            Una muestra de nuestros productos
          </h2>
          <p className="mt-3 font-body text-text-secondary max-w-lg mx-auto">
            Kits curados, libretas artesanales y objetos para lectores que quieren más que solo leer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full"
        >
          {previews.map(({ seed, label }) => (
            <div key={seed} className="group flex flex-col gap-2">
              <div className="overflow-hidden rounded-xl aspect-square bg-hover-row">
                <img
                  src={`https://picsum.photos/seed/${seed}/300/300`}
                  alt={label}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-xs font-body text-text-secondary text-center">{label}</p>
            </div>
          ))}
        </motion.div>

        <ScrollCta label="Ver todos los productos" />
      </div>
    </section>
  )
}
