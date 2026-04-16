import { motion } from 'framer-motion'
import { ScrollCta } from './ScrollCta'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

export function StorySection() {
  return (
    <section className="bg-surface py-24 px-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* Imagen */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative order-2 md:order-1"
        >
          <img
            src="https://picsum.photos/seed/books2/600/500"
            alt="Historia de Los Libros de Ivonnet"
            loading="lazy"
            className="w-full rounded-2xl object-cover shadow-lg aspect-[6/5]"
          />
          <div className="absolute -bottom-5 -right-5 h-28 w-28 rounded-2xl border-4 border-background bg-accent/10 hidden md:block" />
        </motion.div>

        {/* Texto */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="order-1 md:order-2 flex flex-col gap-6"
        >
          <span className="text-xs font-body font-semibold uppercase tracking-widest text-accent">
            Nuestra historia
          </span>
          <h2 className="font-sans text-4xl font-bold text-text-primary leading-tight">
            Todo empezó con el amor por los libros
          </h2>
          <p className="font-body text-text-secondary leading-relaxed">
            Los Libros de Ivonnet nació del deseo de compartir esa magia que sientes cuando abres
            un libro nuevo. Ivonnet empezó curada kits de lectura para regalar a amigos y familia,
            y poco a poco ese gesto se convirtió en una pequeña comunidad de amantes de la
            literatura.
          </p>
          <p className="font-body text-text-secondary leading-relaxed">
            Hoy creamos productos que celebran la lectura: kits temáticos, libretas hechas para
            anotar ideas, y objetos diseñados con el lector en mente.
          </p>
          <ScrollCta />
        </motion.div>
      </div>
    </section>
  )
}
