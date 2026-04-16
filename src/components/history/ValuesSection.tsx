import { motion } from 'framer-motion'
import { Heart, Sparkles, BookMarked } from 'lucide-react'
import { ScrollCta } from './ScrollCta'

const values = [
  {
    icon: Heart,
    title: 'Hecho con amor',
    description: 'Cada kit es curado a mano pensando en quién lo va a recibir.',
  },
  {
    icon: Sparkles,
    title: 'Calidad única',
    description: 'Seleccionamos libros y productos que realmente valen la pena.',
  },
  {
    icon: BookMarked,
    title: 'Comunidad lectora',
    description: 'Más que una tienda, somos un espacio para quienes aman leer.',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function ValuesSection() {
  return (
    <section className="bg-background py-24 px-6">
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-14">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-body font-semibold uppercase tracking-widest text-accent">
            Lo que nos mueve
          </span>
          <h2 className="mt-3 font-sans text-4xl font-bold text-text-primary">
            Nuestros valores
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full"
        >
          {values.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={item}
              className="flex flex-col items-center text-center gap-4 rounded-2xl border border-border bg-surface p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                <Icon size={28} className="text-accent" />
              </div>
              <h3 className="font-sans text-lg font-semibold text-text-primary">{title}</h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        <ScrollCta />
      </div>
    </section>
  )
}
