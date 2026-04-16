import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface ScrollCtaProps {
  label?: string
  className?: string
}

export function ScrollCta({ label = 'Ver la tienda', className = '' }: ScrollCtaProps) {
  const navigate = useNavigate()

  return (
    <motion.button
      onClick={() => navigate('/tienda')}
      animate={{ x: [0, 6, 0] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 rounded-full border border-accent bg-accent/10 px-5 py-2.5 text-sm font-body font-semibold text-accent hover:bg-accent hover:text-white transition-colors ${className}`}
    >
      {label}
      <ArrowRight size={16} />
    </motion.button>
  )
}
